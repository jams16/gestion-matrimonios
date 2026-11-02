import { BadRequestException, ConflictException, ForbiddenException, Inject, Injectable, NotFoundException, Optional } from '@nestjs/common';
import { Temporal } from 'temporal-polyfill';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { CorreoCuentaPort } from '../../autenticacion/application/ports/correo-cuenta.port';
import { ActualizarInvitadoDto, ActualizarMesaDto, ActualizarRsvpDto, CrearInvitadoDto, CrearMesaDto, ListarInvitadosDto, RequerimientoDto } from './dto/invitados.dto';

@Injectable()
export class InvitadosService {
  constructor(private readonly prisma: PrismaService, @Optional() @Inject(CorreoCuentaPort) private readonly correo?: CorreoCuentaPort) {}
  /** Preferencia por usuario/matrimonio. El cliente también recibe el orden en cada respuesta. */
  private readonly preferenciasOrden = new Map<string, string>();
  private get db(): any { return this.prisma.client.orm.public; }
  private ahora() { return Temporal.Instant.from(new Date().toISOString()); }

  private async acceso(idMatrimonio: string, idUsuario: number, db = this.db) {
    const matrimonio = await db.Matrimonio.first({ idMatrimonio: idMatrimonio as never });
    if (!matrimonio) throw new NotFoundException('Matrimonio no encontrado.');
    const proyecto = await db.Proyecto.first({ idProyecto: matrimonio.idProyecto as never });
    if (!proyecto) throw new NotFoundException('Proyecto del matrimonio no encontrado.');
    // El PM y las dos personas vinculadas al matrimonio son los únicos usuarios
    // actualmente relacionados al proyecto; no se concede acceso por conocer un ID.
    if (proyecto.idPm !== idUsuario && matrimonio.idNovio1 !== idUsuario && matrimonio.idNovio2 !== idUsuario) throw new ForbiddenException('No tienes permiso para administrar los invitados de este matrimonio.');
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
      return (f.activo === undefined || x.activo === f.activo) && (!f.buscar || nombre.includes(f.buscar.toLowerCase())) && (!f.idCategoriaRelacion || x.idCategoriaRelacion === f.idCategoriaRelacion) && (!f.ladoRelacion || x.ladoRelacion === f.ladoRelacion) && (!f.estadoRsvp || x.rsvp?.estadoRsvp === f.estadoRsvp) && (!f.idMesa || x.mesa?.idMesa === f.idMesa) && (f.esTitular === undefined || x.esTitular === f.esTitular) && (f.conRequerimiento === undefined || Boolean(x.requerimientosAlimentarios.length) === f.conRequerimiento) && (!(f as any).idRequerimientoAlimentario || x.requerimientosAlimentarios.some((v: any) => v.idRequerimientoAlimentario === Number((f as any).idRequerimientoAlimentario)));
    }).sort((a: any, b: any) => {
      const orden = f.orden ?? this.preferenciasOrden.get(`${u}:${m}`) ?? 'APELLIDOS_ASC';
      if (orden === 'RSVP_ASC') return String(a.rsvp?.estadoRsvp ?? 'PENDIENTE').localeCompare(String(b.rsvp?.estadoRsvp ?? 'PENDIENTE'));
      const texto = (x: any) => orden === 'NOMBRES_ASC'
        ? `${x.personaNatural?.nombres ?? ''} ${x.personaNatural?.apellidoPaterno ?? ''}`
        : `${x.personaNatural?.apellidoPaterno ?? ''} ${x.personaNatural?.apellidoMaterno ?? ''} ${x.personaNatural?.nombres ?? ''}`;
      return texto(a).localeCompare(texto(b), 'es');
    });
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
  async reasignar(m: string, invitadoId: string, mesaDestinoId: string, u: number) {
    return this.prisma.client.transaction(async (tx: any) => {
      const db = tx.orm.public; await this.acceso(m, u, db); await this.invitado(m, invitadoId, db); const destino = await this.mesa(m, mesaDestinoId, db);
      const asignaciones = await db.MesaInvitado.all();
      if (asignaciones.filter((x: any) => x.idMesa === mesaDestinoId && x.activo).length >= destino.capacidad) throw new BadRequestException('La mesa destino alcanzó su capacidad.');
      for (const actual of asignaciones.filter((x: any) => x.idInvitado === invitadoId && x.activo)) await db.MesaInvitado.where({ idMesaInvitado: actual.idMesaInvitado as never }).update({ activo: false } as never);
      const previa = asignaciones.find((x: any) => x.idMesa === mesaDestinoId && x.idInvitado === invitadoId);
      return previa ? db.MesaInvitado.where({ idMesaInvitado: previa.idMesaInvitado as never }).update({ activo: true } as never) : db.MesaInvitado.create({ idMesa: mesaDestinoId, idInvitado: invitadoId, activo: true } as never);
    });
  }
  async representacionMesas(m: string, u: number) {
    const mesas = await this.mesas(m, u); const asignaciones = await this.db.MesaInvitado.all(); const r = await this.relaciones(); const invitados = await this.db.Invitado.all();
    return mesas.map((mesa: any) => { const filas = asignaciones.filter((a: any) => a.idMesa === mesa.idMesa && a.activo); return { ...mesa, ocupados: filas.length, disponibles: Math.max(0, mesa.capacidad - filas.length), invitados: filas.map((a: any) => this.detalle(invitados.find((x: any) => x.idInvitado === a.idInvitado), r)) }; });
  }
  async resumen(m: string, u: number) {
    const invitados = await this.listar(m, { activo: true }, u); const activos = invitados.filter((x: any) => x.activo); const porEstado = (estado: string) => activos.filter((x: any) => x.rsvp?.estadoRsvp === estado);
    const confirmados = porEstado('CONFIRMADO'); const pendientes = porEstado('PENDIENTE'); const noAsisten = porEstado('NO_ASISTE');
    return { total_invitados: activos.length, total_pases: activos.reduce((n: number, x: any) => n + x.cantidadPases, 0), confirmados: confirmados.length, pendientes: pendientes.length, no_asisten: noAsisten.length, asistentes_confirmados: confirmados.reduce((n: number, x: any) => n + (x.rsvp?.cantidadAsistentesConfirmados ?? x.cantidadPases), 0), porcentaje_confirmacion: activos.length ? Number(((confirmados.length * 100) / activos.length).toFixed(2)) : 0 };
  }
  async resumenRequerimientos(m: string, u: number) {
    const invitados = await this.listar(m, { activo: true }, u); const resumen = new Map<string, any>();
    for (const invitado of invitados as any[]) for (const rel of invitado.requerimientosAlimentarios) { const clave = String(rel.idRequerimientoAlimentario); const actual = resumen.get(clave) ?? { idRequerimientoAlimentario: rel.idRequerimientoAlimentario, nombre: rel.requerimiento?.nombre ?? 'Sin nombre', cantidad: 0, invitados: [] }; actual.cantidad++; actual.invitados.push(invitado.idInvitado); resumen.set(clave, actual); }
    return [...resumen.values()];
  }
  async seguimientoRsvp(m: string, u: number) {
    const matrimonio: any = await this.acceso(m, u); const pendientes = (await this.listar(m, { activo: true, estadoRsvp: 'PENDIENTE' as never }, u)) as any[];
    const fechaBoda = matrimonio.fechaMatrimonio ? new Date(String(matrimonio.fechaMatrimonio)) : null;
    const fechaSeguimiento = fechaBoda ? new Date(fechaBoda.getTime() - 30 * 86400000).toISOString() : null;
    return pendientes.map((invitado) => ({ invitado, fecha_seguimiento: fechaSeguimiento, requiere_recordatorio: true }));
  }
  async guardarPreferenciaOrden(m: string, orden: string, u: number) { await this.acceso(m, u); this.preferenciasOrden.set(`${u}:${m}`, orden); return { orden }; }
  async enviarRecordatoriosRsvp(m: string, u: number) {
    const matrimonio: any = await this.acceso(m, u); const pendientes = await this.seguimientoRsvp(m, u); const db: any = this.db; const enviados: string[] = [];
    for (const item of pendientes as any[]) {
      const invitado = item.invitado; const correo = invitado.personaNatural?.correoElectronico;
      if (!correo) continue;
      const rsvp = invitado.rsvp;
      if (rsvp) await db.RsvpHistorial.create({ idRsvp: rsvp.idRsvp, estadoNuevo: 'PENDIENTE', canal: 'SISTEMA', idUsuario: u, observacion: 'Recordatorio RSVP generado.' } as never);
      enviados.push(invitado.idInvitado);
    }
    if (enviados.length && db.Notificacion?.create && matrimonio.idProyecto) await db.Notificacion.create({ idUsuarioDestino: u, idProyecto: matrimonio.idProyecto, tipo: 'INVITADOS', titulo: 'Recordatorios RSVP generados', mensaje: `Se generaron ${enviados.length} recordatorios RSVP pendientes.`, leida: false, enviadaPush: false, activo: true } as never);
    return { recordatorios_generados: enviados.length, invitados: enviados };
  }
  async generarInvitacionDigital(m: string, i: string, u: number) { await this.acceso(m, u); const invitado: any = await this.obtener(m, i, u); if (!invitado.personaNatural?.correoElectronico) throw new BadRequestException('El invitado debe tener correo electrónico para recibir una invitación digital.'); const token = Buffer.from(`${i}.${Date.now()}`).toString('base64url'); const enlace = `/invitaciones/${token}`; if (!this.correo) throw new BadRequestException('El servicio de correo para invitaciones no está disponible.'); await this.correo.enviarInvitacion(invitado.personaNatural.correoElectronico, invitado.personaNatural.nombres ?? 'invitado', enlace); if (invitado.rsvp) await this.db.RsvpHistorial.create({ idRsvp: invitado.rsvp.idRsvp, estadoNuevo: invitado.rsvp.estadoRsvp, canal: 'SISTEMA', idUsuario: u, observacion: 'Invitación digital enviada.' } as never); return { idInvitado: i, destinatario: invitado.personaNatural.correoElectronico, enlace, token, enviado: true }; }
  async registrarInteraccionInvitacion(m: string, i: string, detalle: string | undefined, u: number) { const matrimonio: any = await this.acceso(m, u); const invitado: any = await this.obtener(m, i, u); if (!invitado.rsvp) throw new NotFoundException('RSVP no encontrado.'); await this.db.RsvpHistorial.create({ idRsvp: invitado.rsvp.idRsvp, estadoNuevo: invitado.rsvp.estadoRsvp, canal: 'DIGITAL', idUsuario: null, observacion: detalle ?? 'Interacción con invitación digital.' } as never); if (this.db.Notificacion?.create) await this.db.Notificacion.create({ idUsuarioDestino: u, idProyecto: matrimonio.idProyecto, tipo: 'INVITADOS', titulo: 'Interacción con invitación', mensaje: `${invitado.personaNatural?.nombres ?? 'Un invitado'} interactuó con su invitación digital.`, leida: false, enviadaPush: false, activo: true } as never); return { registrado: true, estado_rsvp: invitado.rsvp.estadoRsvp };
  }
  async categorias() { return (await this.db.CategoriaRelacion.all()).filter((x: any) => x.activo).sort((a: any, b: any) => a.orden - b.orden); }
  async catalogoRequerimientos() { return (await this.db.RequerimientoAlimentario.all()).filter((x: any) => x.activo).sort((a: any, b: any) => a.nombre.localeCompare(b.nombre, 'es')); }
}
