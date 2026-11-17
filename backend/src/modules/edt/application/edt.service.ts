import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import * as D from './dto/edt.dto';

type Nodo = Record<string, any> & { hijos?: Nodo[] };

@Injectable()
export class EdtService {
  constructor(private readonly prisma: PrismaService) {}
  private get db(): any { return this.prisma.client.orm.public; }

  private fechaIso(valor: any) {
    return valor == null ? null : String(valor);
  }

  private serializarPlantilla(plantilla: any) {
    return {
      ...plantilla,
      createdAt: this.fechaIso(plantilla.createdAt),
      updatedAt: this.fechaIso(plantilla.updatedAt),
    };
  }

  private async tocarPlantilla(idPlantilla: string, db = this.db) {
    await db.EdtPlantilla.where({ idEdtPlantilla: idPlantilla as never }).update({ activo: true } as never);
  }

  private arbol(items: any[], idCampo: string, padreCampo: string): Nodo[] {
    const porId = new Map<string, Nodo>();
    for (const item of items) porId.set(String(item[idCampo]), { ...item, hijos: [] });
    const raices: Nodo[] = [];
    for (const item of items) {
      const nodo = porId.get(String(item[idCampo]))!;
      const padre = item[padreCampo] ? porId.get(String(item[padreCampo])) : undefined;
      if (padre && padre !== nodo) padre.hijos!.push(nodo); else raices.push(nodo);
    }
    const ordenar = (nodos: Nodo[]) => { nodos.sort((a, b) => a.orden - b.orden); nodos.forEach((n) => ordenar(n.hijos!)); };
    ordenar(raices);
    return raices;
  }

  private async usuarioExiste(idUsuario: number, db = this.db) {
    const usuario = await db.Usuario.first({ idUsuario });
    if (!usuario?.esActivo) throw new NotFoundException('Usuario no encontrado.');
    return usuario;
  }

  private async categoria(idCategoriaServicio: number | undefined, db = this.db) {
    if (!idCategoriaServicio) return;
    const categoria = await db.CategoriaServicio.first({ idCategoriaServicio });
    if (!categoria?.activo) throw new NotFoundException('Categoría de servicio no encontrada.');
  }

  private async plantillaLectura(idPlantilla: string, usuario: number, db = this.db) {
    const plantilla = await db.EdtPlantilla.first({ idEdtPlantilla: idPlantilla as never });
    if (!plantilla?.activo) throw new NotFoundException('Plantilla EDT no encontrada.');
    if (plantilla.tipo !== 'GLOBAL' && plantilla.idUsuario !== usuario) throw new ForbiddenException('No tienes acceso a esta plantilla EDT.');
    return plantilla;
  }

  private async plantillaEditable(idPlantilla: string, usuario: number, db = this.db) {
    const plantilla = await this.plantillaLectura(idPlantilla, usuario, db);
    if (plantilla.tipo === 'GLOBAL') throw new ForbiddenException('La plantilla GLOBAL es de solo lectura.');
    if (plantilla.idUsuario !== usuario) throw new ForbiddenException('Solo puedes modificar tus propias plantillas EDT.');
    return plantilla;
  }

  private async matrimonioAccesible(idMatrimonio: string, usuario: number, db = this.db) {
    const matrimonio = await db.Matrimonio.first({ idMatrimonio: idMatrimonio as never });
    if (!matrimonio) throw new NotFoundException('Matrimonio no encontrado.');
    const proyecto = await db.Proyecto.first({ idProyecto: matrimonio.idProyecto });
    if (!proyecto || ![proyecto.idPm, matrimonio.idNovio1, matrimonio.idNovio2].includes(usuario)) throw new ForbiddenException('No tienes acceso a la EDT de este matrimonio.');
    return { matrimonio, proyecto };
  }

  private async validarPadre(items: any[], id: string, padre: string | null | undefined, idCampo: string, padreCampo: string, scopeCampo: string, scope: string) {
    if (!padre) return;
    if (padre === id) throw new BadRequestException('Un elemento no puede ser su propio padre.');
    const porId = new Map(items.map((x) => [String(x[idCampo]), x]));
    let actual = porId.get(String(padre));
    if (!actual || actual[scopeCampo] !== scope) throw new BadRequestException('El elemento padre debe pertenecer a la misma EDT.');
    const visitados = new Set<string>();
    while (actual) {
      const actualId = String(actual[idCampo]);
      if (actualId === id || visitados.has(actualId)) throw new BadRequestException('El movimiento generaría un ciclo en el árbol EDT.');
      visitados.add(actualId);
      actual = actual[padreCampo] ? porId.get(String(actual[padreCampo])) : undefined;
    }
  }

  private descendientes(items: any[], id: string, idCampo: string, padreCampo: string): string[] {
    const hijos = new Map<string, string[]>();
    for (const item of items) if (item[padreCampo]) hijos.set(String(item[padreCampo]), [...(hijos.get(String(item[padreCampo])) ?? []), String(item[idCampo])]);
    const resultado: string[] = []; const pendientes = [id];
    while (pendientes.length) { const actual = pendientes.pop()!; if (resultado.includes(actual)) continue; resultado.push(actual); pendientes.push(...(hijos.get(actual) ?? [])); }
    return resultado;
  }

  async listarElementos() { return (await this.db.EdtElemento.all()).filter((x: any) => x.activo).sort((a: any, b: any) => a.nombre.localeCompare(b.nombre)); }
  async crearElemento(dto: D.CrearElementoEdtDto) { await this.categoria(dto.idCategoriaServicio); return this.db.EdtElemento.create({ ...dto, activo: true } as never); }
  async actualizarElemento(id: string, dto: D.ActualizarElementoEdtDto) { const actual = await this.db.EdtElemento.first({ idEdtElemento: id as never }); if (!actual) throw new NotFoundException('Elemento EDT no encontrado.'); await this.categoria(dto.idCategoriaServicio); return this.db.EdtElemento.where({ idEdtElemento: id as never }).update(dto as never); }
  async desactivarElemento(id: string) { const actual = await this.db.EdtElemento.first({ idEdtElemento: id as never }); if (!actual) throw new NotFoundException('Elemento EDT no encontrado.'); return this.db.EdtElemento.where({ idEdtElemento: id as never }).update({ activo: false } as never); }

  async listarPlantillas(usuario: number) {
    return (await this.db.EdtPlantilla.all())
      .filter((x: any) => x.activo && (x.tipo === 'GLOBAL' || x.idUsuario === usuario))
      .sort((a: any, b: any) => (a.tipo === 'GLOBAL' ? -1 : 1) || a.nombre.localeCompare(b.nombre))
      .map((plantilla: any) => this.serializarPlantilla(plantilla));
  }
  async crearPlantilla(dto: D.CrearPlantillaEdtDto, usuario: number) { await this.usuarioExiste(usuario); return this.db.EdtPlantilla.create({ ...dto, tipo: 'WP', idUsuario: usuario, activo: true } as never); }
  async actualizarPlantilla(id: string, dto: D.ActualizarPlantillaEdtDto, usuario: number) { await this.plantillaEditable(id, usuario); return this.db.EdtPlantilla.where({ idEdtPlantilla: id as never }).update(dto as never); }
  async eliminarPlantilla(id: string, usuario: number) { await this.plantillaEditable(id, usuario); return this.db.EdtPlantilla.where({ idEdtPlantilla: id as never }).update({ activo: false } as never); }

  async arbolPlantilla(id: string, usuario: number) {
    const plantilla = await this.plantillaLectura(id, usuario);
    const [items, elementos] = await Promise.all([this.db.EdtPlantillaElemento.all(), this.db.EdtElemento.all()]);
    const catalogo = new Map(elementos.map((x: any) => [String(x.idEdtElemento), x]));
    const nodos = items.filter((x: any) => x.idEdtPlantilla === id && x.activo).map((x: any) => ({ ...x, elemento: catalogo.get(String(x.idEdtElemento)) }));
    return { plantilla, elementos: this.arbol(nodos, 'idEdtPlantillaElemento', 'idEdtPlantillaElementoPadre') };
  }

  async duplicarPlantilla(id: string, usuario: number, nombre?: string) {
    return this.prisma.client.transaction(async (tx: any) => {
      const db = tx.orm.public; const origen = await this.plantillaLectura(id, usuario, db);
      const copia = await db.EdtPlantilla.create({ nombre: nombre?.trim() || `Copia de ${origen.nombre}`, descripcion: origen.descripcion, tipo: 'WP', idUsuario: usuario, activo: true } as never);
      const originales = (await db.EdtPlantillaElemento.all()).filter((x: any) => x.idEdtPlantilla === id && x.activo).sort((a: any, b: any) => a.orden - b.orden);
      const mapa = new Map<string, string>();
      for (const item of originales) { const nuevo = await db.EdtPlantillaElemento.create({ idEdtPlantilla: copia.idEdtPlantilla, idEdtElemento: item.idEdtElemento, orden: item.orden, activo: true } as never); mapa.set(String(item.idEdtPlantillaElemento), String(nuevo.idEdtPlantillaElemento)); }
      for (const item of originales) if (item.idEdtPlantillaElementoPadre) await db.EdtPlantillaElemento.where({ idEdtPlantillaElemento: mapa.get(String(item.idEdtPlantillaElemento)) as never }).update({ idEdtPlantillaElementoPadre: mapa.get(String(item.idEdtPlantillaElementoPadre)) } as never);
      return copia;
    });
  }

  async agregarElementoPlantilla(id: string, dto: D.AgregarElementoPlantillaEdtDto, usuario: number) {
    await this.plantillaEditable(id, usuario); const elemento = await this.db.EdtElemento.first({ idEdtElemento: dto.idElemento as never }); if (!elemento?.activo) throw new NotFoundException('Elemento EDT no encontrado.');
    const items = await this.db.EdtPlantillaElemento.all(); await this.validarPadre(items, '__nuevo__', dto.idPlantillaElementoPadre, 'idEdtPlantillaElemento', 'idEdtPlantillaElementoPadre', 'idEdtPlantilla', id);
    const creado = await this.db.EdtPlantillaElemento.create({ idEdtPlantilla: id, idEdtElemento: dto.idElemento, idEdtPlantillaElementoPadre: dto.idPlantillaElementoPadre, orden: dto.orden ?? 0, activo: true } as never);
    await this.tocarPlantilla(id);
    return creado;
  }
  async actualizarElementoPlantilla(id: string, idElemento: string, dto: D.ActualizarElementoPlantillaEdtDto, usuario: number) {
    await this.plantillaEditable(id, usuario);
    const items = await this.db.EdtPlantillaElemento.all();
    const actual = items.find((x: any) => x.idEdtPlantillaElemento === idElemento && x.idEdtPlantilla === id);
    if (!actual) throw new NotFoundException('Elemento de plantilla no encontrado.');
    if (Object.prototype.hasOwnProperty.call(dto, 'idPlantillaElementoPadre')) {
      await this.validarPadre(items, idElemento, dto.idPlantillaElementoPadre, 'idEdtPlantillaElemento', 'idEdtPlantillaElementoPadre', 'idEdtPlantilla', id);
    }

    const editarContenido = ['nombre', 'descripcion', 'idCategoriaServicio'].some((campo) => Object.prototype.hasOwnProperty.call(dto, campo));
    const actualizacion: Record<string, unknown> = {
      idPlantillaElementoPadre: dto.idPlantillaElementoPadre,
      orden: dto.orden,
      activo: dto.activo,
    };
    Object.keys(actualizacion).forEach((campo) => actualizacion[campo] === undefined && delete actualizacion[campo]);

    if (editarContenido) {
      const origen = await this.db.EdtElemento.first({ idEdtElemento: actual.idEdtElemento });
      if (!origen) throw new NotFoundException('Elemento EDT no encontrado.');
      await this.categoria(dto.idCategoriaServicio ?? undefined);
      const copia = await this.db.EdtElemento.create({
        nombre: dto.nombre?.trim() || origen.nombre,
        descripcion: Object.prototype.hasOwnProperty.call(dto, 'descripcion') ? dto.descripcion : origen.descripcion,
        idCategoriaServicio: Object.prototype.hasOwnProperty.call(dto, 'idCategoriaServicio') ? dto.idCategoriaServicio : origen.idCategoriaServicio,
        activo: true,
      } as never);
      actualizacion.idEdtElemento = copia.idEdtElemento;
    }

    const actualizado = await this.db.EdtPlantillaElemento.where({ idEdtPlantillaElemento: idElemento as never }).update(actualizacion as never);
    await this.tocarPlantilla(id);
    return actualizado;
  }

  async reordenarElementosPlantilla(id: string, dto: D.ReordenarElementosPlantillaEdtDto, usuario: number) {
    await this.plantillaEditable(id, usuario);
    const ids = dto.ordenes.map((item) => item.idElementoPlantilla);
    if (ids.length < 2 || new Set(ids).size !== ids.length) {
      throw new BadRequestException('Debes indicar al menos dos elementos diferentes para reordenar.');
    }
    const items = await this.db.EdtPlantillaElemento.all();
    const elementos = items.filter((item: any) => item.idEdtPlantilla === id && item.activo && ids.includes(String(item.idEdtPlantillaElemento)));
    if (elementos.length !== ids.length) {
      throw new NotFoundException('Uno o más elementos no pertenecen a esta plantilla.');
    }
    const padres = new Set(elementos.map((item: any) => String(item.idEdtPlantillaElementoPadre ?? '')));
    if (padres.size !== 1) {
      throw new BadRequestException('Solo puedes reordenar secciones del mismo nivel.');
    }
    await this.prisma.client.transaction(async (tx: any) => {
      const db = tx.orm.public;
      for (const item of dto.ordenes) {
        await db.EdtPlantillaElemento.where({ idEdtPlantillaElemento: item.idElementoPlantilla as never }).update({ orden: item.orden } as never);
      }
      await this.tocarPlantilla(id, db);
    });
    return { actualizados: dto.ordenes.length };
  }
  async eliminarElementoPlantilla(id: string, idElemento: string, usuario: number) {
    await this.plantillaEditable(id, usuario); const items = await this.db.EdtPlantillaElemento.all(); const actual = items.find((x: any) => x.idEdtPlantillaElemento === idElemento && x.idEdtPlantilla === id); if (!actual) throw new NotFoundException('Elemento de plantilla no encontrado.');
    const ids = this.descendientes(items, idElemento, 'idEdtPlantillaElemento', 'idEdtPlantillaElementoPadre'); for (const itemId of ids) await this.db.EdtPlantillaElemento.where({ idEdtPlantillaElemento: itemId as never }).update({ activo: false } as never); await this.tocarPlantilla(id); return { eliminados: ids.length };
  }

  async crearEdtMatrimonio(idMatrimonio: string, dto: D.CrearEdtMatrimonioDto, usuario: number) {
    return this.prisma.client.transaction(async (tx: any) => {
      const db = tx.orm.public; const { matrimonio } = await this.matrimonioAccesible(idMatrimonio, usuario, db); const plantilla = await this.plantillaLectura(dto.idPlantilla, usuario, db);
      const existente = (await db.EdtMatrimonio.all()).find((x: any) => x.idMatrimonio === idMatrimonio && x.estado);
      if (existente) throw new ConflictException('El matrimonio ya tiene una EDT activa.');
      const edt = await db.EdtMatrimonio.create({ idMatrimonio, idPlantillaOrigen: plantilla.idEdtPlantilla, nombre: dto.nombre?.trim() || `EDT de ${matrimonio.idMatrimonio}`, estado: true } as never);
      const [relaciones, catalogo] = await Promise.all([db.EdtPlantillaElemento.all(), db.EdtElemento.all()]); const elementos = new Map<string, any>(catalogo.map((x: any) => [String(x.idEdtElemento), x]));
      const origenes = relaciones.filter((x: any) => x.idEdtPlantilla === plantilla.idEdtPlantilla && x.activo).sort((a: any, b: any) => a.orden - b.orden); const mapa = new Map<string, string>();
      for (const origen of origenes) { const base = elementos.get(String(origen.idEdtElemento)); if (!base) continue; const nuevo = await db.EdtMatrimonioElemento.create({ idEdtMatrimonio: edt.idEdtMatrimonio, idEdtElementoOrigen: origen.idEdtElemento, nombre: base.nombre, descripcion: base.descripcion, idCategoriaServicio: base.idCategoriaServicio, orden: origen.orden, activo: true } as never); mapa.set(String(origen.idEdtPlantillaElemento), String(nuevo.idEdtMatrimonioElemento)); }
      for (const origen of origenes) if (origen.idEdtPlantillaElementoPadre && mapa.has(String(origen.idEdtPlantillaElemento))) await db.EdtMatrimonioElemento.where({ idEdtMatrimonioElemento: mapa.get(String(origen.idEdtPlantillaElemento)) as never }).update({ idEdtMatrimonioElementoPadre: mapa.get(String(origen.idEdtPlantillaElementoPadre)) } as never);
      return edt;
    });
  }

  async obtenerEdtMatrimonio(idMatrimonio: string, usuario: number) {
    await this.matrimonioAccesible(idMatrimonio, usuario); const edt = (await this.db.EdtMatrimonio.all()).find((x: any) => x.idMatrimonio === idMatrimonio && x.estado); if (!edt) throw new NotFoundException('El matrimonio no tiene una EDT activa.');
    const items = (await this.db.EdtMatrimonioElemento.all()).filter((x: any) => x.idEdtMatrimonio === edt.idEdtMatrimonio && x.activo); return { edt, elementos: this.arbol(items, 'idEdtMatrimonioElemento', 'idEdtMatrimonioElementoPadre') };
  }
  private async edtEditable(idMatrimonio: string, usuario: number) { return this.obtenerEdtMatrimonio(idMatrimonio, usuario); }
  async agregarElementoMatrimonio(idMatrimonio: string, dto: D.CrearElementoEdtMatrimonioDto, usuario: number) {
    const { edt } = await this.edtEditable(idMatrimonio, usuario); await this.categoria(dto.idCategoriaServicio); if (dto.idElementoOrigen) { const origen = await this.db.EdtElemento.first({ idEdtElemento: dto.idElementoOrigen as never }); if (!origen) throw new NotFoundException('Elemento EDT de origen no encontrado.'); }
    const items = await this.db.EdtMatrimonioElemento.all(); await this.validarPadre(items, '__nuevo__', dto.idEdtMatrimonioElementoPadre, 'idEdtMatrimonioElemento', 'idEdtMatrimonioElementoPadre', 'idEdtMatrimonio', edt.idEdtMatrimonio);
    return this.db.EdtMatrimonioElemento.create({ ...dto, idEdtMatrimonio: edt.idEdtMatrimonio, orden: dto.orden ?? 0, activo: true } as never);
  }
  async actualizarElementoMatrimonio(idMatrimonio: string, idElemento: string, dto: D.ActualizarElementoEdtMatrimonioDto, usuario: number) {
    const { edt } = await this.edtEditable(idMatrimonio, usuario); const items = await this.db.EdtMatrimonioElemento.all(); const actual = items.find((x: any) => x.idEdtMatrimonioElemento === idElemento && x.idEdtMatrimonio === edt.idEdtMatrimonio); if (!actual) throw new NotFoundException('Elemento de EDT no encontrado.'); await this.categoria(dto.idCategoriaServicio);
    if (Object.prototype.hasOwnProperty.call(dto, 'idEdtMatrimonioElementoPadre')) await this.validarPadre(items, idElemento, dto.idEdtMatrimonioElementoPadre, 'idEdtMatrimonioElemento', 'idEdtMatrimonioElementoPadre', 'idEdtMatrimonio', edt.idEdtMatrimonio);
    return this.db.EdtMatrimonioElemento.where({ idEdtMatrimonioElemento: idElemento as never }).update(dto as never);
  }
  async eliminarElementoMatrimonio(idMatrimonio: string, idElemento: string, usuario: number) {
    const { edt } = await this.edtEditable(idMatrimonio, usuario); const items = await this.db.EdtMatrimonioElemento.all(); const actual = items.find((x: any) => x.idEdtMatrimonioElemento === idElemento && x.idEdtMatrimonio === edt.idEdtMatrimonio); if (!actual) throw new NotFoundException('Elemento de EDT no encontrado.'); const ids = this.descendientes(items, idElemento, 'idEdtMatrimonioElemento', 'idEdtMatrimonioElementoPadre'); for (const itemId of ids) await this.db.EdtMatrimonioElemento.where({ idEdtMatrimonioElemento: itemId as never }).update({ activo: false } as never); return { eliminados: ids.length };
  }
}
