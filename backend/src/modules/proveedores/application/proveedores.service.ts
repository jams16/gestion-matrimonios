import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Temporal } from 'temporal-polyfill';
import { ProveedoresRepository } from '../domain/repositories/proveedores.repository';
import {
  ActualizarDisponibilidadProveedorDto,
  ActualizarInteraccionProveedorDto,
  ActualizarMatrimonioProveedorDto,
  ActualizarProveedorDto,
  ActualizarReservaProveedorDto,
  ActualizarSeguimientoProveedorDto,
  ActualizarServicioProveedorDto,
  AsociarProveedorMatrimonioDto,
  CrearDisponibilidadProveedorDto,
  CrearDocumentoProveedorDto,
  CrearEnlaceExternoProveedorDto,
  CrearInteraccionProveedorDto,
  CrearProveedorDto,
  CrearReservaProveedorDto,
  CrearSeguimientoProveedorDto,
  CrearServicioProveedorDto,
  GuardarEvaluacionProveedorDto,
  ListarDisponibilidadesDto,
  ListarMatrimonioProveedorDto,
  ListarProveedoresDto,
} from './dto/proveedores.dto';

@Injectable()
export class ProveedoresService {
  constructor(private readonly repository: ProveedoresRepository) {}
  private get db(): any {
    return this.repository.orm();
  }
  // Compatibilidad temporal con las operaciones transaccionales existentes:
  // la transacción real pertenece al puerto, no a Prisma en application.
  private get prisma(): any {
    return {
      client: {
        transaction: (accion: (tx: any) => Promise<unknown>) =>
          this.repository.transaccion((db) => accion({ orm: { public: db } })),
      },
    };
  }
  private fecha(s: string) {
    return Temporal.Instant.from(new Date(s).toISOString());
  }
  private async proveedor(id: string, db = this.db) {
    const x = await db.Proveedor.first({ idProveedor: id as never });
    if (!x) throw new NotFoundException('Proveedor no encontrado.');
    return x;
  }
  private async servicio(p: string, id: string | number, db = this.db) {
    const x = await db.ProveedorServicio.first({
      idProveedorServicio: Number(id) as never,
    });
    if (!x || x.idProveedor !== p)
      throw new NotFoundException('Servicio de proveedor no encontrado.');
    return x;
  }
  private async acceso(m: string, u: number, db = this.db) {
    const matrimonio = await db.Matrimonio.first({ idMatrimonio: m as never });
    if (!matrimonio) throw new NotFoundException('Matrimonio no encontrado.');
    const proyecto = await db.Proyecto.first({
      idProyecto: matrimonio.idProyecto as never,
    });
    if (!proyecto || proyecto.idPm !== u)
      throw new ForbiddenException(
        'No tienes permiso para administrar proveedores de este matrimonio.',
      );
    return matrimonio;
  }
  private async relacion(m: string, p: string, u: number, db = this.db) {
    await this.acceso(m, u, db);
    const x = (await db.MatrimonioProveedor.all()).find(
      (v: any) => v.idMatrimonio === m && v.idProveedor === p && v.activo,
    );
    if (!x) throw new NotFoundException('Proveedor no asociado al matrimonio.');
    return x;
  }
  private async detalle(p: any, db = this.db) {
    const [servicios, categorias] = await Promise.all([
      db.ProveedorServicio.all(),
      db.CategoriaServicio.all(),
    ]);
    return {
      ...p,
      contacto: {
        telefono: p.telefonoContacto,
        whatsapp: p.whatsapp,
        correo: p.correoContacto,
      },
      servicios: servicios
        .filter((s: any) => s.idProveedor === p.idProveedor)
        .map((s: any) => ({
          ...s,
          categoria:
            categorias.find(
              (c: any) => c.idCategoriaServicio === s.idCategoriaServicio,
            ) ?? null,
        })),
    };
  }

  async listar(f: ListarProveedoresDto) {
    const [todos, servicios, disponibilidades] = await Promise.all([
      this.db.Proveedor.all(),
      this.db.ProveedorServicio.all(),
      this.db.DisponibilidadProveedor.all(),
    ]);
    return (
      await Promise.all(
        todos
          .filter(
            (p: any) =>
              (f.activo === undefined || p.activo === f.activo) &&
              (!f.buscar ||
                p.nombreComercial
                  .toLowerCase()
                  .includes(f.buscar.toLowerCase())) &&
              (!f.ubicacion ||
                `${p.direccion ?? ''}`
                  .toLowerCase()
                  .includes(f.ubicacion.toLowerCase())) &&
              (f.idCategoriaServicio === undefined ||
                servicios.some(
                  (s: any) =>
                    s.idProveedor === p.idProveedor &&
                    s.idCategoriaServicio === f.idCategoriaServicio &&
                    s.activo,
                )) &&
              (!f.servicio ||
                servicios.some(
                  (s: any) =>
                    s.idProveedor === p.idProveedor &&
                    s.nombre
                      .toLowerCase()
                      .includes(f.servicio!.toLowerCase()) &&
                    s.activo,
                )) &&
              (f.costoMinimo === undefined ||
                servicios.some(
                  (s: any) =>
                    s.idProveedor === p.idProveedor &&
                    Number(s.costoReferencial) >= f.costoMinimo! &&
                    s.activo,
                )) &&
              (f.costoMaximo === undefined ||
                servicios.some(
                  (s: any) =>
                    s.idProveedor === p.idProveedor &&
                    Number(s.costoReferencial) <= f.costoMaximo! &&
                    s.activo,
                )) &&
              (!f.disponibleEnFecha ||
                disponibilidades.some(
                  (d: any) =>
                    d.idProveedor === p.idProveedor &&
                    String(d.fecha).slice(0, 10) === f.disponibleEnFecha &&
                    d.disponible &&
                    d.activo,
                )),
          )
          .map((p: any) => this.detalle(p)),
      )
    ).sort((a: any, b: any) =>
      a.nombreComercial.localeCompare(b.nombreComercial, 'es'),
    );
  }
  async obtener(id: string) {
    return this.detalle(await this.proveedor(id));
  }
  async crear(d: CrearProveedorDto) {
    return this.prisma.client.transaction(async (tx: any) => {
      const db = tx.orm.public;
      // El directorio puede registrar proveedores independientes. Vincularlos
      // a PersonaNatural/Entidad es opcional y se conserva cuando ya existe.
      if (
        d.idPersonaNatural &&
        !(await db.PersonaNatural.first({
          idPersonaNatural: d.idPersonaNatural as never,
        }))
      )
        throw new NotFoundException('Persona natural no encontrada.');
      if (
        d.idEntidad &&
        !(await db.Entidad.first({ idEntidad: d.idEntidad as never }))
      )
        throw new NotFoundException('Entidad no encontrada.');
      if (
        (d.idPersonaNatural &&
          (await db.Proveedor.first({
            idPersonaNatural: d.idPersonaNatural as never,
          }))) ||
        (d.idEntidad &&
          (await db.Proveedor.first({ idEntidad: d.idEntidad as never })))
      )
        throw new ConflictException(
          'Ya existe un proveedor con la identificación indicada.',
        );
      return db.Proveedor.create({ ...d, activo: true } as never);
    });
  }
  async actualizar(id: string, d: ActualizarProveedorDto) {
    await this.proveedor(id);
    const datos: any = { ...d };
    delete datos.tipoProveedor;
    delete datos.idPersonaNatural;
    delete datos.idEntidad;
    return this.db.Proveedor.where({ idProveedor: id as never }).update(datos);
  }
  async desactivar(id: string) {
    await this.proveedor(id);
    return this.db.Proveedor.where({ idProveedor: id as never }).update({
      activo: false,
    } as never);
  }

  async servicios(id: string) {
    await this.proveedor(id);
    const [servicios, categorias] = await Promise.all([
      this.db.ProveedorServicio.all(),
      this.db.CategoriaServicio.all(),
    ]);
    return servicios
      .filter((x: any) => x.idProveedor === id && x.activo)
      .map((x: any) => ({
        ...x,
        categoria:
          categorias.find(
            (c: any) => c.idCategoriaServicio === x.idCategoriaServicio,
          ) ?? null,
      }));
  }
  async obtenerServicio(p: string, s: string) {
    return this.servicio(p, s);
  }
  async crearServicio(p: string, d: CrearServicioProveedorDto) {
    await this.proveedor(p);
    const categoria = await this.db.CategoriaServicio.first({
      idCategoriaServicio: d.idCategoriaServicio as never,
    });
    if (!categoria || !categoria.activo)
      throw new NotFoundException('Categoría de servicio no encontrada.');
    const existe = (await this.db.ProveedorServicio.all()).some(
      (x: any) =>
        x.idProveedor === p &&
        x.idCategoriaServicio === d.idCategoriaServicio &&
        x.nombre.toLowerCase() === d.nombre.toLowerCase() &&
        x.activo,
    );
    if (existe)
      throw new ConflictException('El servicio ya existe para este proveedor.');
    return this.db.ProveedorServicio.create({
      ...d,
      idProveedor: p,
      moneda: d.moneda ?? 'PEN',
      activo: true,
    } as never);
  }
  async actualizarServicio(
    p: string,
    s: string,
    d: ActualizarServicioProveedorDto,
  ) {
    await this.servicio(p, s);
    if (
      d.idCategoriaServicio &&
      !(await this.db.CategoriaServicio.first({
        idCategoriaServicio: d.idCategoriaServicio as never,
      }))
    )
      throw new NotFoundException('Categoría de servicio no encontrada.');
    return this.db.ProveedorServicio.where({
      idProveedorServicio: Number(s) as never,
    }).update(d as never);
  }
  async desactivarServicio(p: string, s: string) {
    await this.servicio(p, s);
    return this.db.ProveedorServicio.where({
      idProveedorServicio: Number(s) as never,
    }).update({ activo: false } as never);
  }

  async disponibilidades(p: string, f: ListarDisponibilidadesDto) {
    await this.proveedor(p);
    return (await this.db.DisponibilidadProveedor.all()).filter(
      (x: any) =>
        x.idProveedor === p &&
        x.activo &&
        (!f.idProveedorServicio ||
          x.idProveedorServicio === f.idProveedorServicio) &&
        (f.disponible === undefined || x.disponible === f.disponible) &&
        (!f.fechaDesde || String(x.fecha).slice(0, 10) >= f.fechaDesde) &&
        (!f.fechaHasta || String(x.fecha).slice(0, 10) <= f.fechaHasta),
    );
  }
  private async validarDisponibilidad(
    p: string,
    d: CrearDisponibilidadProveedorDto,
    db = this.db,
  ) {
    if (d.idProveedorServicio)
      await this.servicio(p, d.idProveedorServicio, db);
    if (d.horaInicio && d.horaFin && d.horaFin <= d.horaInicio)
      throw new BadRequestException(
        'La hora fin debe ser posterior a la hora inicio.',
      );
  }
  async crearDisponibilidad(p: string, d: CrearDisponibilidadProveedorDto) {
    await this.proveedor(p);
    await this.validarDisponibilidad(p, d);
    return this.db.DisponibilidadProveedor.create({
      ...d,
      idProveedor: p,
      fecha: this.fecha(d.fecha),
      activo: true,
    } as never);
  }
  async actualizarDisponibilidad(
    p: string,
    id: string,
    d: ActualizarDisponibilidadProveedorDto,
  ) {
    const x = await this.db.DisponibilidadProveedor.first({
      idDisponibilidadProveedor: id as never,
    });
    if (!x || x.idProveedor !== p)
      throw new NotFoundException('Disponibilidad no encontrada.');
    await this.validarDisponibilidad(p, {
      ...x,
      ...d,
      fecha: d.fecha ?? String(x.fecha),
    });
    const datos: any = { ...d };
    if (d.fecha) datos.fecha = this.fecha(d.fecha);
    return this.db.DisponibilidadProveedor.where({
      idDisponibilidadProveedor: id as never,
    }).update(datos);
  }
  async desactivarDisponibilidad(p: string, id: string) {
    const x = await this.db.DisponibilidadProveedor.first({
      idDisponibilidadProveedor: id as never,
    });
    if (!x || x.idProveedor !== p)
      throw new NotFoundException('Disponibilidad no encontrada.');
    return this.db.DisponibilidadProveedor.where({
      idDisponibilidadProveedor: id as never,
    }).update({ activo: false } as never);
  }

  async proveedoresMatrimonio(
    m: string,
    f: ListarMatrimonioProveedorDto,
    u: number,
  ) {
    const mat = await this.acceso(m, u);
    const [rels, proveedores, disponibilidades] = await Promise.all([
      this.db.MatrimonioProveedor.all(),
      this.db.Proveedor.all(),
      this.db.DisponibilidadProveedor.all(),
    ]);
    return (
      await Promise.all(
        rels
          .filter(
            (x: any) =>
              x.idMatrimonio === m &&
              (f.activo === undefined || x.activo === f.activo) &&
              (f.favorito === undefined || x.favorito === f.favorito) &&
              (!f.prioridad || x.prioridad === f.prioridad) &&
              (!f.estadoSeleccion || x.estadoSeleccion === f.estadoSeleccion),
          )
          .map(async (r: any) => {
            const proveedor = proveedores.find(
              (p: any) => p.idProveedor === r.idProveedor,
            );
            const detalle = proveedor ? await this.detalle(proveedor) : null;
            const registros = disponibilidades.filter(
              (d: any) =>
                d.idProveedor === r.idProveedor &&
                d.activo &&
                String(d.fecha).slice(0, 10) ===
                  String(mat.fechaMatrimonio).slice(0, 10),
            );
            return {
              ...r,
              proveedor: detalle,
              disponibilidadBoda: !registros.length
                ? 'SIN_INFORMACION'
                : registros.some((d: any) => d.disponible)
                  ? 'DISPONIBLE'
                  : 'NO_DISPONIBLE',
            };
          }),
      )
    ).filter(
      (x: any) =>
        !f.idCategoriaServicio ||
        x.proveedor?.servicios.some(
          (s: any) => s.idCategoriaServicio === f.idCategoriaServicio,
        ),
    );
  }
  async asociar(
    m: string,
    p: string,
    d: AsociarProveedorMatrimonioDto,
    u: number,
  ) {
    return this.prisma.client.transaction(async (tx: any) => {
      const db = tx.orm.public;
      await this.acceso(m, u, db);
      const proveedor = await this.proveedor(p, db);
      if (!proveedor.activo)
        throw new BadRequestException('El proveedor está inactivo.');
      const previa = (await db.MatrimonioProveedor.all()).find(
        (x: any) => x.idMatrimonio === m && x.idProveedor === p,
      );
      if (previa?.activo)
        throw new ConflictException(
          'El proveedor ya está asociado a este matrimonio.',
        );
      return previa
        ? db.MatrimonioProveedor.where({
            idMatrimonioProveedor: previa.idMatrimonioProveedor as never,
          }).update({ ...d, activo: true } as never)
        : db.MatrimonioProveedor.create({
            idMatrimonio: m,
            idProveedor: p,
            favorito: d.favorito ?? false,
            estadoSeleccion: d.estadoSeleccion ?? 'CONSIDERADO',
            prioridad: d.prioridad ?? null,
            observaciones: d.observaciones ?? null,
            activo: true,
          } as never);
    });
  }
  async actualizarRelacion(
    m: string,
    p: string,
    d: ActualizarMatrimonioProveedorDto,
    u: number,
  ) {
    await this.acceso(m, u);
    const x = (await this.db.MatrimonioProveedor.all()).find(
      (v: any) => v.idMatrimonio === m && v.idProveedor === p && v.activo,
    );
    if (!x) throw new NotFoundException('Proveedor no asociado al matrimonio.');
    if (d.favorito === true && !x.favorito) {
      const servicios = (await this.db.ProveedorServicio.all()).filter(
        (s: any) => s.idProveedor === p && s.activo,
      );
      const categorias = new Set(
        servicios.map((s: any) => s.idCategoriaServicio),
      );
      const favoritos = (await this.db.MatrimonioProveedor.all()).filter(
        (r: any) =>
          r.idMatrimonio === m && r.favorito && r.activo && r.idProveedor !== p,
      );
      const proveedores = await this.db.ProveedorServicio.all();
      for (const categoria of categorias)
        if (
          favoritos.filter((r: any) =>
            proveedores.some(
              (s: any) =>
                s.idProveedor === r.idProveedor &&
                s.idCategoriaServicio === categoria &&
                s.activo,
            ),
          ).length >= 3
        )
          throw new BadRequestException(
            'Solo se permiten hasta 3 proveedores favoritos por categoría.',
          );
    }
    return this.db.MatrimonioProveedor.where({
      idMatrimonioProveedor: x.idMatrimonioProveedor as never,
    }).update(d as never);
  }
  async retirar(m: string, p: string, u: number) {
    await this.acceso(m, u);
    const x = (await this.db.MatrimonioProveedor.all()).find(
      (v: any) => v.idMatrimonio === m && v.idProveedor === p && v.activo,
    );
    if (!x) throw new NotFoundException('Proveedor no asociado al matrimonio.');
    return this.db.MatrimonioProveedor.where({
      idMatrimonioProveedor: x.idMatrimonioProveedor as never,
    }).update({ activo: false } as never);
  }
  async disponibilidadMatrimonio(m: string, p: string, u: number) {
    const matrimonio = await this.acceso(m, u);
    await this.proveedor(p);
    const registros = (await this.db.DisponibilidadProveedor.all()).filter(
      (x: any) =>
        x.idProveedor === p &&
        x.activo &&
        String(x.fecha).slice(0, 10) ===
          String(matrimonio.fechaMatrimonio).slice(0, 10),
    );
    return {
      fechaMatrimonio: matrimonio.fechaMatrimonio,
      disponibilidadEncontrada: registros,
      estado: !registros.length
        ? 'SIN_INFORMACION'
        : registros.some((x: any) => x.disponible)
          ? 'DISPONIBLE'
          : 'NO_DISPONIBLE',
    };
  }
  async compararFavoritos(m: string, u: number) {
    const relaciones = await this.proveedoresMatrimonio(
      m,
      { favorito: true },
      u,
    );
    return relaciones.map((x: any) => ({
      idProveedor: x.idProveedor,
      nombre: x.proveedor?.nombreComercial,
      prioridad: x.prioridad,
      estadoSeleccion: x.estadoSeleccion,
      servicios: x.proveedor?.servicios?.map((s: any) => ({
        nombre: s.nombre,
        costoReferencial: s.costoReferencial,
        moneda: s.moneda,
      })),
      disponibilidadBoda: x.disponibilidadBoda,
    }));
  }
  async crearSeguimiento(
    m: string,
    p: string,
    d: CrearSeguimientoProveedorDto,
    u: number,
  ) {
    const r = await this.relacion(m, p, u);
    return this.db.SeguimientoProveedor.create({
      ...d,
      idMatrimonioProveedor: r.idMatrimonioProveedor,
      idUsuario: u,
      completado: false,
      activo: true,
    } as never);
  }
  async seguimientos(m: string, p: string, u: number) {
    const r = await this.relacion(m, p, u);
    return (await this.db.SeguimientoProveedor.all()).filter(
      (x: any) =>
        x.idMatrimonioProveedor === r.idMatrimonioProveedor && x.activo,
    );
  }
  async actualizarSeguimiento(
    m: string,
    p: string,
    id: string,
    d: ActualizarSeguimientoProveedorDto,
    u: number,
  ) {
    const r = await this.relacion(m, p, u);
    const x = await this.db.SeguimientoProveedor.first({
      idSeguimientoProveedor: id as never,
    });
    if (!x || x.idMatrimonioProveedor !== r.idMatrimonioProveedor)
      throw new NotFoundException('Seguimiento no encontrado.');
    return this.db.SeguimientoProveedor.where({
      idSeguimientoProveedor: id as never,
    }).update(d as never);
  }
  async desactivarSeguimiento(m: string, p: string, id: string, u: number) {
    return this.actualizarSeguimiento(m, p, id, { activo: false } as never, u);
  }
  async crearReserva(
    m: string,
    p: string,
    d: CrearReservaProveedorDto,
    u: number,
  ) {
    const r = await this.relacion(m, p, u);
    const disponibilidad = await this.disponibilidadMatrimonio(m, p, u);
    if (
      String(d.fecha).slice(0, 10) ===
        String(disponibilidad.fechaMatrimonio).slice(0, 10) &&
      disponibilidad.estado === 'NO_DISPONIBLE'
    )
      throw new ConflictException(
        'El proveedor no está disponible para la fecha solicitada.',
      );
    if (d.idProveedorServicio) await this.servicio(p, d.idProveedorServicio);
    return this.db.ReservaProveedor.create({
      ...d,
      fecha: this.fecha(d.fecha),
      idMatrimonioProveedor: r.idMatrimonioProveedor,
      estado: 'SOLICITADA',
      activo: true,
    } as never);
  }
  async reservas(m: string, p: string, u: number) {
    const r = await this.relacion(m, p, u);
    return (await this.db.ReservaProveedor.all()).filter(
      (x: any) =>
        x.idMatrimonioProveedor === r.idMatrimonioProveedor && x.activo,
    );
  }
  async actualizarReserva(
    m: string,
    p: string,
    id: string,
    d: ActualizarReservaProveedorDto,
    u: number,
  ) {
    const r = await this.relacion(m, p, u);
    const x = await this.db.ReservaProveedor.first({
      idReservaProveedor: id as never,
    });
    if (!x || x.idMatrimonioProveedor !== r.idMatrimonioProveedor)
      throw new NotFoundException('Reserva no encontrada.');
    const datos: any = { ...d };
    if (d.fecha) datos.fecha = this.fecha(d.fecha);
    return this.db.ReservaProveedor.where({
      idReservaProveedor: id as never,
    }).update(datos);
  }
  async guardarEvaluacion(
    m: string,
    p: string,
    d: GuardarEvaluacionProveedorDto,
    u: number,
  ) {
    const r = await this.relacion(m, p, u);
    const previa = await this.db.EvaluacionProveedor.first({
      idMatrimonioProveedor: r.idMatrimonioProveedor as never,
    });
    return previa
      ? this.db.EvaluacionProveedor.where({
          idEvaluacionProveedor: previa.idEvaluacionProveedor as never,
        }).update({ ...d, activo: true } as never)
      : this.db.EvaluacionProveedor.create({
          ...d,
          idMatrimonioProveedor: r.idMatrimonioProveedor,
          activo: true,
        } as never);
  }
  async evaluaciones(p: string) {
    await this.proveedor(p);
    const relaciones = (await this.db.MatrimonioProveedor.all()).filter(
      (r: any) => r.idProveedor === p,
    );
    const items = (await this.db.EvaluacionProveedor.all()).filter(
      (x: any) =>
        x.activo &&
        relaciones.some(
          (r: any) => r.idMatrimonioProveedor === x.idMatrimonioProveedor,
        ),
    );
    const promedio = items.length
      ? items.reduce((n: number, x: any) => n + x.calificacion, 0) /
        items.length
      : 0;
    return {
      promedio: Number(promedio.toFixed(2)),
      cantidad: items.length,
      evaluaciones: items,
    };
  }
  async crearEnlace(p: string, d: CrearEnlaceExternoProveedorDto) {
    await this.proveedor(p);
    const token = crypto.randomUUID().replaceAll('-', '');
    return this.db.EnlaceExternoProveedor.create({
      idProveedor: p,
      token,
      fechaExpiracion: d.fechaExpiracion ? this.fecha(d.fechaExpiracion) : null,
      activo: true,
    } as never);
  }
  async actualizarDisponibilidadExterna(
    token: string,
    d: CrearDisponibilidadProveedorDto,
  ) {
    const enlace = await this.db.EnlaceExternoProveedor.first({
      token: token as never,
    });
    if (!enlace || !enlace.activo)
      throw new NotFoundException('El enlace externo no es válido.');
    if (
      enlace.fechaExpiracion &&
      new Date(String(enlace.fechaExpiracion)).getTime() < Date.now()
    ) {
      throw new BadRequestException('El enlace externo ha expirado.');
    }
    await this.validarDisponibilidad(enlace.idProveedor, d);
    const existente = (await this.db.DisponibilidadProveedor.all()).find(
      (x: any) =>
        x.idProveedor === enlace.idProveedor &&
        x.idProveedorServicio === (d.idProveedorServicio ?? null) &&
        String(x.fecha).slice(0, 10) === String(d.fecha).slice(0, 10) &&
        x.activo,
    );
    const datos: any = { ...d, fecha: this.fecha(d.fecha) };
    return existente
      ? this.db.DisponibilidadProveedor.where({
          idDisponibilidadProveedor:
            existente.idDisponibilidadProveedor as never,
        }).update(datos)
      : this.db.DisponibilidadProveedor.create({
          ...datos,
          idProveedor: enlace.idProveedor,
          activo: true,
        } as never);
  }
  async documentos(m: string, p: string, u: number) {
    const r = await this.relacion(m, p, u);
    return (await this.db.DocumentoProveedor.all()).filter(
      (x: any) =>
        x.idMatrimonioProveedor === r.idMatrimonioProveedor && x.activo,
    );
  }
  async crearDocumento(
    m: string,
    p: string,
    d: CrearDocumentoProveedorDto,
    u: number,
  ) {
    const r = await this.relacion(m, p, u);
    return this.db.DocumentoProveedor.create({
      ...d,
      idMatrimonioProveedor: r.idMatrimonioProveedor,
      activo: true,
    } as never);
  }
  async desactivarDocumento(m: string, p: string, id: string, u: number) {
    const r = await this.relacion(m, p, u);
    const x = await this.db.DocumentoProveedor.first({
      idDocumentoProveedor: id as never,
    });
    if (!x || x.idMatrimonioProveedor !== r.idMatrimonioProveedor)
      throw new NotFoundException('Documento no encontrado.');
    return this.db.DocumentoProveedor.where({
      idDocumentoProveedor: id as never,
    }).update({ activo: false } as never);
  }
  async crearInteraccion(
    m: string,
    p: string,
    d: CrearInteraccionProveedorDto,
    u: number,
  ) {
    const r = await this.relacion(m, p, u);
    return this.db.InteraccionProveedor.create({
      ...d,
      fechaEnvio: this.fecha(d.fechaEnvio),
      fechaRespuesta: d.fechaRespuesta ? this.fecha(d.fechaRespuesta) : null,
      idMatrimonioProveedor: r.idMatrimonioProveedor,
      activo: true,
    } as never);
  }
  async actualizarInteraccion(
    m: string,
    p: string,
    id: string,
    d: ActualizarInteraccionProveedorDto,
    u: number,
  ) {
    const r = await this.relacion(m, p, u);
    const x = await this.db.InteraccionProveedor.first({
      idInteraccionProveedor: id as never,
    });
    if (!x || x.idMatrimonioProveedor !== r.idMatrimonioProveedor)
      throw new NotFoundException('Interacción no encontrada.');
    const datos: any = { ...d };
    if (d.fechaEnvio) datos.fechaEnvio = this.fecha(d.fechaEnvio);
    if (d.fechaRespuesta) datos.fechaRespuesta = this.fecha(d.fechaRespuesta);
    return this.db.InteraccionProveedor.where({
      idInteraccionProveedor: id as never,
    }).update(datos);
  }
  async tiempoRespuesta(m: string, p: string, u: number) {
    const r = await this.relacion(m, p, u);
    const items = (await this.db.InteraccionProveedor.all()).filter(
      (x: any) =>
        x.idMatrimonioProveedor === r.idMatrimonioProveedor &&
        x.activo &&
        x.fechaRespuesta,
    );
    const horas = items
      .map(
        (x: any) =>
          (new Date(String(x.fechaRespuesta)).getTime() -
            new Date(String(x.fechaEnvio)).getTime()) /
          3600000,
      )
      .filter((x: number) => x >= 0);
    return {
      interacciones: items,
      promedioHoras: horas.length
        ? Number(
            (
              horas.reduce((a: number, b: number) => a + b, 0) / horas.length
            ).toFixed(2),
          )
        : null,
    };
  }
  async recomendaciones(m: string, u: number) {
    const relaciones = await this.proveedoresMatrimonio(m, {}, u);
    const ordenPrioridad: Record<string, number> = {
      ALTA: 0,
      MEDIA: 1,
      BAJA: 2,
    };
    return relaciones
      .filter((x: any) => x.estadoSeleccion !== 'SELECCIONADO')
      .sort(
        (a: any, b: any) =>
          (ordenPrioridad[a.prioridad ?? 'BAJA'] ?? ordenPrioridad.BAJA) -
          (ordenPrioridad[b.prioridad ?? 'BAJA'] ?? ordenPrioridad.BAJA),
      );
  }
  async categorias() {
    return (await this.db.CategoriaServicio.all())
      .filter((x: any) => x.activo)
      .sort((a: any, b: any) => a.orden - b.orden);
  }
}
