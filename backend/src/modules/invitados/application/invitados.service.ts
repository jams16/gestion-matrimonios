import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Temporal } from 'temporal-polyfill';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { ActualizarInvitadoDto, ActualizarMesaDto, ActualizarRsvpDto, CrearInvitadoDto, CrearMesaDto, ListarInvitadosDto, RequerimientoDto } from './dto/invitados.dto';

@Injectable()
export class InvitadosService {
  constructor(private readonly prisma: PrismaService) {}
  private get db(): any { return this.prisma.client.orm.public; }
  private ahora() { return Temporal.Instant.from(new Date().toISOString()); }

  private async acceso(idMatrimonio: string, idUsuario: number, db = this.db) {
    const matrimonio = await db.Matrimonio.first({ idMatrimonio: idMatrimonio as never });
    if (!matrimonio) throw new NotFoundException('Matrimonio no encontrado.');
    const proyecto = await db.Proyecto.first({ idProyecto: matrimonio.idProyecto as never });
    if (!proyecto) throw new NotFoundException('Proyecto del matrimonio no encontrado.');
    if (proyecto.idPm !== idUsuario) throw new ForbiddenException('No tienes permiso para administrar los invitados de este matrimonio.');
    return matrimonio;
  }
  private async invitado(m: string, i: string, db = this.db) {
    const x = await db.Invitado.first({ idInvitado: i as never });
    if (!x || x.idMatrimonio !== m) throw new NotFoundException('Invitado no encontrado.');
    return x;
  }
  private async mesa(m: string, i: string, db = this.db) {
    const x = await db.Mesa.first({ idMesa: i as never });
    if (!x || x.idMatrimonio !== m) throw new NotFoundException('Mesa no encontrada.');
    return x;
  }
  private async relaciones(db = this.db) {
    const [personas, categorias, rsvps, historial, mesas, asignaciones, requerimientos, catalogo] = await Promise.all([
      db.PersonaNatural.all(), db.CategoriaRelacion.all(), db.Rsvp.all(), db.RsvpHistorial.all(), db.Mesa.all(), db.MesaInvitado.all(), db.InvitadoRequerimientoAlimentario.all(), db.RequerimientoAlimentario.all(),
    ]);
    return { personas, categorias, rsvps, historial, mesas, asignaciones, requerimientos, catalogo };
  }
  private detalle(x: any, r: any) {
    const asignacion = r.asignaciones.find((a: any) => a.idInvitado === x.idInvitado && a.activo);
    return {
      ...x,
      personaNatural: r.personas.find((p: any) => p.idPersonaNatural === x.idPersonaNatural) ?? null,
      categoriaRelacion: r.categorias.find((c: any) => c.idCategoriaRelacion === x.idCategoriaRelacion) ?? null,
      rsvp: r.rsvps.find((v: any) => v.idInvitado === x.idInvitado) ?? null,
      mesa: asignacion ? r.mesas.find((v: any) => v.idMesa === asignacion.idMesa && v.activo) ?? null : null,
      requerimientosAlimentarios: r.requerimientos.filter((v: any) => v.idInvitado === x.idInvitado && v.activo).map((v: any) => ({ ...v, requerimiento: r.catalogo.find((c: any) => c.idRequerimientoAlimentario === v.idRequerimientoAlimentario) ?? null })),
    };
  }

  async listar(m: string, f: ListarInvitadosDto, u: number) {
    await this.acceso(m, u); const r = await this.relaciones();
    return (await this.db.Invitado.all()).filter((x: any) => x.idMatrimonio === m).map((x: any) => this.detalle(x, r)).filter((x: any) => {
      const nombre = `${x.personaNatural?.nombres ?? ''} ${x.personaNatural?.apellidoPaterno ?? ''} ${x.personaNatural?.apellidoMaterno ?? ''}`.toLowerCase();
      return (f.activo === undefined || x.activo === f.activo) && (!f.buscar || nombre.includes(f.buscar.toLowerCase())) && (!f.idCategoriaRelacion || x.idCategoriaRelacion === f.idCategoriaRelacion) && (!f.ladoRelacion || x.ladoRelacion === f.ladoRelacion) && (!f.estadoRsvp || x.rsvp?.estadoRsvp === f.estadoRsvp) && (!f.idMesa || x.mesa?.idMesa === f.idMesa) && (f.esTitular === undefined || x.esTitular === f.esTitular) && (f.conRequerimiento === undefined || Boolean(x.requerimientosAlimentarios.length) === f.conRequerimiento);
    }).sort((a: any, b: any) => `${a.personaNatural?.apellidoPaterno ?? ''} ${a.personaNatural?.apellidoMaterno ?? ''} ${a.personaNatural?.nombres ?? ''}`.localeCompare(`${b.personaNatural?.apellidoPaterno ?? ''} ${b.personaNatural?.apellidoMaterno ?? ''} ${b.personaNatural?.nombres ?? ''}`, 'es'));
  }
  async obtener(m: string, i: string, u: number) { await this.acceso(m, u); return this.detalle(await this.invitado(m, i), await this.relaciones()); }

  async crear(m: string, dto: CrearInvitadoDto, u: number, titularId?: string) {
    return this.prisma.client.transaction(async (tx: any) => {
      const db = tx.orm.public; await this.acceso(m, u, db);
      let persona = dto.persona.dni ? await db.PersonaNatural.first({ dni: dto.persona.dni as never }) : null;
      if (!persona) persona = await db.PersonaNatural.create({ ...dto.persona, esActivo: true } as never);
      const invitados = await db.Invitado.all();
      const existente = invitados.find((x: any) => x.idMatrimonio === m && x.idPersonaNatural === persona.idPersonaNatural);
      if (existente?.activo) throw new ConflictException('La persona ya es invitada activa de este matrimonio.');
      if (titularId) {
        const titular = await this.invitado(m, titularId, db);
        if (!titular.esTitular || !titular.activo) throw new BadRequestException('El titular indicado no es válido.');
        if (invitados.filter((x: any) => x.idInvitadoTitular === titularId && x.activo).length + 1 >= titular.cantidadPases) throw new BadRequestException('Se superó la cantidad de pases del titular.');
      }
      const invitado = existente
        ? await db.Invitado.where({ idInvitado: existente.idInvitado as never }).update({ idCategoriaRelacion: dto.idCategoriaRelacion ?? null, ladoRelacion: dto.ladoRelacion ?? 'AMBOS', cantidadPases: dto.cantidadPases ?? 1, observaciones: dto.observaciones ?? null, esTitular: !titularId, idInvitadoTitular: titularId ?? null, activo: true } as never)
        : await db.Invitado.create({ idMatrimonio: m, idPersonaNatural: persona.idPersonaNatural, idCategoriaRelacion: dto.idCategoriaRelacion ?? null, ladoRelacion: dto.ladoRelacion ?? 'AMBOS', cantidadPases: dto.cantidadPases ?? 1, observaciones: dto.observaciones ?? null, esTitular: !titularId, idInvitadoTitular: titularId ?? null, activo: true } as never);
      let rsvp = await db.Rsvp.first({ idInvitado: invitado.idInvitado as never });
      if (!rsvp) rsvp = await db.Rsvp.create({ idInvitado: invitado.idInvitado, estadoRsvp: 'PENDIENTE', confirmacionDigital: false, verificacionManual1: false, verificacionManual2: false } as never);
      return { invitado, personaNatural: persona, rsvp };
    });
  }
  async actualizar(m: string, i: string, dto: ActualizarInvitadoDto, u: number) {
    await this.acceso(m, u); const actual = await this.invitado(m, i);
    if (dto.cantidadPases !== undefined && actual.esTitular && dto.cantidadPases < (await this.db.Invitado.all()).filter((x: any) => x.idInvitadoTitular === i && x.activo).length + 1) throw new BadRequestException('La cantidad de pases no puede ser menor que titular y acompañantes activos.');
    const datos: any = {}; for (const key of ['idCategoriaRelacion', 'ladoRelacion', 'cantidadPases', 'observaciones']) if ((dto as any)[key] !== undefined) datos[key] = (dto as any)[key];
    const invitado = await this.db.Invitado.where({ idInvitado: i as never }).update(datos);
    if (dto.persona) { const persona: any = {}; for (const key of ['nombres', 'apellidoPaterno', 'apellidoMaterno', 'telefono', 'correoElectronico']) if ((dto.persona as any)[key] !== undefined) persona[key] = (dto.persona as any)[key]; if (Object.keys(persona).length) await this.db.PersonaNatural.where({ idPersonaNatural: actual.idPersonaNatural as never }).update(persona); }
    return invitado;
  }
  async desactivar(m: string, i: string, u: number) { await this.acceso(m, u); await this.invitado(m, i); return this.prisma.client.transaction(async (tx: any) => { const db = tx.orm.public; const asignaciones = (await db.MesaInvitado.all()).filter((x: any) => x.idInvitado === i && x.activo); for (const x of asignaciones) await db.MesaInvitado.where({ idMesaInvitado: x.idMesaInvitado as never }).update({ activo: false } as never); return db.Invitado.where({ idInvitado: i as never }).update({ activo: false } as never); }); }
  async acompanantes(m: string, titular: string, u: number) { await this.acceso(m, u); await this.invitado(m, titular); const r = await this.relaciones(); return (await this.db.Invitado.all()).filter((x: any) => x.idInvitadoTitular === titular).map((x: any) => this.detalle(x, r)); }

  async obtenerRsvp(m: string, i: string, u: number) { await this.acceso(m, u); await this.invitado(m, i); const rsvp = await this.db.Rsvp.first({ idInvitado: i as never }); if (!rsvp) throw new NotFoundException('RSVP no encontrado.'); return { ...rsvp, historial: (await this.db.RsvpHistorial.all()).filter((x: any) => x.idRsvp === rsvp.idRsvp) }; }
  async rsvp(m: string, i: string, dto: ActualizarRsvpDto, u: number) { return this.prisma.client.transaction(async (tx: any) => { const db = tx.orm.public; await this.acceso(m, u, db); const inv = await this.invitado(m, i, db); const actual = await db.Rsvp.first({ idInvitado: i as never }); if (!actual) throw new NotFoundException('RSVP no encontrado.'); if (dto.cantidadAsistentesConfirmados !== undefined && dto.cantidadAsistentesConfirmados > inv.cantidadPases) throw new BadRequestException('La cantidad confirmada no puede superar los pases.'); const cambio = dto.estadoRsvp !== undefined && dto.estadoRsvp !== actual.estadoRsvp; const datos: any = {}; if (dto.estadoRsvp !== undefined) datos.estadoRsvp = dto.estadoRsvp; if (dto.cantidadAsistentesConfirmados !== undefined) datos.cantidadAsistentesConfirmados = dto.cantidadAsistentesConfirmados; if (cambio) datos.fechaRespuesta = this.ahora(); const nuevo = await db.Rsvp.where({ idRsvp: actual.idRsvp as never }).update(datos); if (cambio) await db.RsvpHistorial.create({ idRsvp: actual.idRsvp, estadoAnterior: actual.estadoRsvp, estadoNuevo: dto.estadoRsvp, canal: 'MANUAL', idUsuario: u, observacion: dto.observacion ?? null } as never); return nuevo; }); }
  async verificar(m: string, i: string, u: number, n: 1 | 2) { return this.prisma.client.transaction(async (tx: any) => { const db = tx.orm.public; await this.acceso(m, u, db); await this.invitado(m, i, db); const actual = await db.Rsvp.first({ idInvitado: i as never }); if (!actual) throw new NotFoundException('RSVP no encontrado.'); const datos = n === 1 ? { verificacionManual1: true, fechaVerificacionManual1: this.ahora(), idUsuarioVerificacionManual1: u } : { verificacionManual2: true, fechaVerificacionManual2: this.ahora(), idUsuarioVerificacionManual2: u }; const nuevo = await db.Rsvp.where({ idRsvp: actual.idRsvp as never }).update(datos as never); await db.RsvpHistorial.create({ idRsvp: actual.idRsvp, estadoNuevo: actual.estadoRsvp, canal: 'MANUAL', idUsuario: u, observacion: `Verificación manual ${n}` } as never); return nuevo; }); }

  async requerimientos(m: string, i: string, u: number) { await this.acceso(m, u); await this.invitado(m, i); const cat = await this.db.RequerimientoAlimentario.all(); return (await this.db.InvitadoRequerimientoAlimentario.all()).filter((x: any) => x.idInvitado === i && x.activo).map((x: any) => ({ ...x, requerimiento: cat.find((c: any) => c.idRequerimientoAlimentario === x.idRequerimientoAlimentario) ?? null })); }
  async agregarReq(m: string, i: string, dto: RequerimientoDto, u: number) { await this.acceso(m, u); await this.invitado(m, i); const req = await this.db.RequerimientoAlimentario.first({ idRequerimientoAlimentario: dto.idRequerimientoAlimentario as never }); if (!req || !req.activo) throw new NotFoundException('Requerimiento alimentario no encontrado.'); const previo = (await this.db.InvitadoRequerimientoAlimentario.all()).find((x: any) => x.idInvitado === i && x.idRequerimientoAlimentario === dto.idRequerimientoAlimentario); if (previo?.activo) throw new ConflictException('El requerimiento ya está asociado al invitado.'); if (previo) return this.db.InvitadoRequerimientoAlimentario.where({ idInvitadoRequerimientoAlimentario: previo.idInvitadoRequerimientoAlimentario as never }).update({ activo: true, detalle: dto.detalle ?? null } as never); return this.db.InvitadoRequerimientoAlimentario.create({ idInvitado: i, idRequerimientoAlimentario: dto.idRequerimientoAlimentario, detalle: dto.detalle ?? null, activo: true } as never); }
  async retirarReq(m: string, i: string, rel: string, u: number) { await this.acceso(m, u); await this.invitado(m, i); const x = await this.db.InvitadoRequerimientoAlimentario.first({ idInvitadoRequerimientoAlimentario: rel as never }); if (!x || x.idInvitado !== i) throw new NotFoundException('Requerimiento del invitado no encontrado.'); return this.db.InvitadoRequerimientoAlimentario.where({ idInvitadoRequerimientoAlimentario: rel as never }).update({ activo: false } as never); }

  async mesas(m: string, u: number) { await this.acceso(m, u); return (await this.db.Mesa.all()).filter((x: any) => x.idMatrimonio === m && x.activo); }
  async obtenerMesa(m: string, i: string, u: number) { await this.acceso(m, u); const mesa = await this.mesa(m, i); return { ...mesa, invitados: await this.invitadosMesa(m, i, u) }; }
  async crearMesa(m: string, dto: CrearMesaDto, u: number) { await this.acceso(m, u); return this.db.Mesa.create({ idMatrimonio: m, ...dto, activo: true } as never); }
  async actualizarMesa(m: string, i: string, dto: ActualizarMesaDto, u: number) { await this.acceso(m, u); await this.mesa(m, i); const usados = (await this.db.MesaInvitado.all()).filter((x: any) => x.idMesa === i && x.activo).length; if (dto.capacidad !== undefined && dto.capacidad < usados) throw new BadRequestException('La capacidad no puede ser menor que los invitados asignados.'); return this.db.Mesa.where({ idMesa: i as never }).update(dto as never); }
  async desactivarMesa(m: string, i: string, u: number) { await this.acceso(m, u); await this.mesa(m, i); if ((await this.db.MesaInvitado.all()).some((x: any) => x.idMesa === i && x.activo)) throw new BadRequestException('No se puede desactivar una mesa con invitados asignados. Retira las asignaciones primero.'); return this.db.Mesa.where({ idMesa: i as never }).update({ activo: false } as never); }
  async invitadosMesa(m: string, mesaId: string, u: number) { await this.acceso(m, u); await this.mesa(m, mesaId); const r = await this.relaciones(); const invs = await this.db.Invitado.all(); return (await this.db.MesaInvitado.all()).filter((x: any) => x.idMesa === mesaId && x.activo).map((x: any) => ({ ...x, invitado: this.detalle(invs.find((v: any) => v.idInvitado === x.idInvitado), r) })); }
  async asignar(m: string, mesaId: string, invId: string, u: number) { return this.prisma.client.transaction(async (tx: any) => { const db = tx.orm.public; await this.acceso(m, u, db); const mesa = await this.mesa(m, mesaId, db); const inv = await this.invitado(m, invId, db); if (!mesa.activo || !inv.activo) throw new BadRequestException('La mesa y el invitado deben estar activos.'); const todas = await db.MesaInvitado.all(); if (todas.some((x: any) => x.idInvitado === invId && x.activo)) throw new ConflictException('El invitado ya tiene una mesa activa.'); if (todas.filter((x: any) => x.idMesa === mesaId && x.activo).length >= mesa.capacidad) throw new BadRequestException('La mesa alcanzó su capacidad.'); const previa = todas.find((x: any) => x.idMesa === mesaId && x.idInvitado === invId); return previa ? db.MesaInvitado.where({ idMesaInvitado: previa.idMesaInvitado as never }).update({ activo: true } as never) : db.MesaInvitado.create({ idMesa: mesaId, idInvitado: invId, activo: true } as never); }); }
  async retirarAsignacion(m: string, mesaId: string, invId: string, u: number) { await this.acceso(m, u); await this.mesa(m, mesaId); await this.invitado(m, invId); const x = (await this.db.MesaInvitado.all()).find((a: any) => a.idMesa === mesaId && a.idInvitado === invId && a.activo); if (!x) throw new NotFoundException('Asignación de mesa no encontrada.'); return this.db.MesaInvitado.where({ idMesaInvitado: x.idMesaInvitado as never }).update({ activo: false } as never); }
  async categorias() { return (await this.db.CategoriaRelacion.all()).filter((x: any) => x.activo).sort((a: any, b: any) => a.orden - b.orden); }
  async catalogoRequerimientos() { return (await this.db.RequerimientoAlimentario.all()).filter((x: any) => x.activo).sort((a: any, b: any) => a.nombre.localeCompare(b.nombre, 'es')); }
}
