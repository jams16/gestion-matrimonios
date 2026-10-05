import { Injectable } from '@nestjs/common';
import { Temporal } from 'temporal-polyfill';

import { PrismaService } from '../../../../../infrastructure/database/prisma/prisma.service';
import { ActualizarMatrimonioDto } from '../../../application/dto/actualizar-matrimonio.dto';
import { ActualizarProyectoDto } from '../../../application/dto/actualizar-proyecto.dto';
import { CrearMatrimonioDto } from '../../../application/dto/crear-matrimonio.dto';
import { CrearProyectoDto } from '../../../application/dto/crear-proyecto.dto';
import { ListarMatrimoniosDto } from '../../../application/dto/listar-matrimonios.dto';
import { ListarProyectosDto } from '../../../application/dto/listar-proyectos.dto';
import { GuardarOnboardingMatrimonioDto } from '../../../application/dto/guardar-onboarding-matrimonio.dto';
import { Matrimonio } from '../../../domain/entities/matrimonio.entity';
import { MatrimonioResumen } from '../../../domain/entities/matrimonio-resumen.entity';
import { Proyecto } from '../../../domain/entities/proyecto.entity';
import {
  ProyectosRepository,
  ResultadoPaginado,
} from '../../../domain/repositories/proyectos.repository';

@Injectable()
export class PrismaProyectosRepository implements ProyectosRepository {
  constructor(private readonly prisma: PrismaService) {}

  crearProyecto(data: CrearProyectoDto): Promise<Proyecto> {
    return this.prisma.client.orm.public.Proyecto.create(
      this.normalizarProyecto(data) as never,
    ) as Promise<Proyecto>;
  }

  async actualizarProyecto(
    id: string,
    data: ActualizarProyectoDto,
  ): Promise<Proyecto | null> {
    if (!(await this.obtenerProyecto(id))) return null;
    return this.prisma.client.orm.public.Proyecto.where({
      idProyecto: id as never,
    }).update(
      this.normalizarProyecto(data, true) as never,
    ) as Promise<Proyecto>;
  }

  obtenerProyecto(id: string): Promise<Proyecto | null> {
    return this.prisma.client.orm.public.Proyecto.first({
      idProyecto: id as never,
    }) as Promise<Proyecto | null>;
  }

  async listarProyectos(
    query: ListarProyectosDto,
  ): Promise<ResultadoPaginado<Proyecto>> {
    let items =
      (await this.prisma.client.orm.public.Proyecto.all()) as Proyecto[];
    const contiene = this.contiene;
    items = items.filter(
      (proyecto) =>
        (!query.idProyecto || proyecto.idProyecto === query.idProyecto) &&
        (!query.idPm || proyecto.idPm === query.idPm) &&
        (!query.estado || proyecto.estado === query.estado) &&
        contiene(proyecto.nombre, query.nombre) &&
        (!query.buscar ||
          [
            proyecto.idProyecto,
            proyecto.nombre,
            proyecto.objetivos,
            proyecto.necesidades,
            proyecto.alcance,
          ].some((valor) => contiene(valor, query.buscar))),
    );
    return this.paginarYOrdenar(items, query);
  }

  crearMatrimonio(data: CrearMatrimonioDto): Promise<Matrimonio> {
    return this.prisma.client.orm.public.Matrimonio.create(
      this.normalizarMatrimonio({ estado: true, ...data }) as never,
    ) as Promise<Matrimonio>;
  }

  async actualizarMatrimonio(
    id: string,
    data: ActualizarMatrimonioDto,
  ): Promise<Matrimonio | null> {
    if (!(await this.obtenerMatrimonio(id))) return null;
    return this.prisma.client.orm.public.Matrimonio.where({
      idMatrimonio: id as never,
    }).update(
      this.normalizarMatrimonio(data, true) as never,
    ) as Promise<Matrimonio>;
  }

  obtenerMatrimonio(id: string): Promise<Matrimonio | null> {
    return this.prisma.client.orm.public.Matrimonio.first({
      idMatrimonio: id as never,
    }) as Promise<Matrimonio | null>;
  }

  async obtenerMatrimonioPorProyecto(
    idProyecto: string,
  ): Promise<Matrimonio | null> {
    const matrimonios =
      (await this.prisma.client.orm.public.Matrimonio.all()) as Matrimonio[];
    return (
      matrimonios.find((matrimonio) => matrimonio.idProyecto === idProyecto) ??
      null
    );
  }

  async listarMatrimonios(
    query: ListarMatrimoniosDto,
  ): Promise<ResultadoPaginado<Matrimonio>> {
    let items =
      (await this.prisma.client.orm.public.Matrimonio.all()) as Matrimonio[];
    const contiene = this.contiene;
    items = items.filter(
      (matrimonio) =>
        (!query.idMatrimonio ||
          matrimonio.idMatrimonio === query.idMatrimonio) &&
        (!query.idProyecto || matrimonio.idProyecto === query.idProyecto) &&
        (!query.idNovio1 || matrimonio.idNovio1 === query.idNovio1) &&
        (!query.idNovio2 || matrimonio.idNovio2 === query.idNovio2) &&
        (!query.tipoCeremonia ||
          matrimonio.tipoCeremonia === query.tipoCeremonia) &&
        contiene(matrimonio.ciudadUbicacion, query.ciudadUbicacion) &&
        (query.estado === undefined || matrimonio.estado === query.estado) &&
        (!query.buscar ||
          [
            matrimonio.idMatrimonio,
            matrimonio.idProyecto,
            matrimonio.ciudadUbicacion,
            matrimonio.ideasMoonboard,
          ].some((valor) => contiene(valor, query.buscar))),
    );
    return this.paginarYOrdenar(items, query);
  }

  async listarResumenMatrimonios(): Promise<MatrimonioResumen[]> {
    const matrimonios =
      (await this.prisma.client.orm.public.Matrimonio.all()) as Matrimonio[];
    const proyectos =
      (await this.prisma.client.orm.public.Proyecto.all()) as Proyecto[];
    const ubigeos = (await this.prisma.client.orm.public.Ubigeo.all()) as Array<{
      idUbigeo: string;
      departamento: string | null;
      provincia: string | null;
      distrito: string | null;
    }>;

    const proyectosPorId = new Map(
      proyectos.map((proyecto) => [proyecto.idProyecto, proyecto]),
    );
    const ubigeosPorId = new Map(
      ubigeos.map((ubigeo) => [ubigeo.idUbigeo, ubigeo]),
    );

    return matrimonios
      .filter((matrimonio) => matrimonio.estado !== false)
      .map((matrimonio) => {
        const proyecto = proyectosPorId.get(matrimonio.idProyecto);
        const ubigeo = matrimonio.ciudadUbicacion
          ? ubigeosPorId.get(matrimonio.ciudadUbicacion)
          : null;

        return {
          idMatrimonio: matrimonio.idMatrimonio,
          idProyecto: matrimonio.idProyecto,
          nombreProyecto: proyecto?.nombre ?? null,
          fechaMatrimonio: matrimonio.fechaMatrimonio,
          ciudadUbicacion: this.descripcionUbigeo(
            ubigeo,
            matrimonio.ciudadUbicacion,
          ),
          estadoProyecto: proyecto?.estado ?? null,
        };
      })
      .sort((a, b) =>
        this.compararFechas(a.fechaMatrimonio, b.fechaMatrimonio),
      );
  }

  async usuarioExiste(id: number): Promise<boolean> {
    return !!(await this.prisma.client.orm.public.Usuario.first({
      idUsuario: id,
    }));
  }

  async ubigeoExiste(id: string): Promise<boolean> {
    return !!(await this.prisma.client.orm.public.Ubigeo.first({
      idUbigeo: id as never,
    }));
  }

  async guardarOnboardingMatrimonio(
    data: GuardarOnboardingMatrimonioDto,
    idPm: number,
    iniciar: boolean,
  ): Promise<{ proyecto: Proyecto; matrimonio: Matrimonio }> {
    const ahora = Temporal.Now.instant();
    if (iniciar && !data.idProyecto) {
      const personas =
        (await this.prisma.client.orm.public.PersonaNatural.all()) as Array<{
          idPersonaNatural: number;
          dni: string | null;
        }>;
      const persona1 = personas.find((persona) => persona.dni === data.pareja1.dni);
      const persona2 = personas.find((persona) => persona.dni === data.pareja2.dni);
      if (persona1 && persona2) {
        const usuarios =
          (await this.prisma.client.orm.public.Usuario.all()) as Array<{
            idUsuario: number;
            idPersonaNatural: number;
          }>;
        const usuario1 = usuarios.find((usuario) => usuario.idPersonaNatural === persona1.idPersonaNatural);
        const usuario2 = usuarios.find((usuario) => usuario.idPersonaNatural === persona2.idPersonaNatural);
        const matrimonios =
          (await this.prisma.client.orm.public.Matrimonio.all()) as Matrimonio[];
        const matrimonio = matrimonios.find(
          (item) =>
            item.idNovio1 === usuario1?.idUsuario &&
            item.idNovio2 === usuario2?.idUsuario,
        );
        if (matrimonio) {
          const proyecto = await this.obtenerProyecto(matrimonio.idProyecto);
          if (proyecto?.idPm === idPm) {
            const actualizado = await this.actualizarProyecto(
              matrimonio.idProyecto,
              { estado: 'INICIO' as never },
            );
            return { proyecto: actualizado!, matrimonio };
          }
        }
      }
    }
    const crearPersonaUsuario = async (
      pareja: GuardarOnboardingMatrimonioDto['pareja1'],
    ) => {
      const persona = await this.prisma.client.orm.public.PersonaNatural.create({
        nombres: pareja.nombres,
        apellidoPaterno: pareja.apellidoPaterno,
        correoElectronico: `pareja-${pareja.dni}@matrimonio.local`,
        dni: pareja.dni,
      } as never);
      return this.prisma.client.orm.public.Usuario.create({
        idPersonaNatural: (persona as { idPersonaNatural: number }).idPersonaNatural,
        usuario: pareja.usuario,
        tipoUsuario: 'OTROS',
        contrasenaHash: await require('argon2').hash(pareja.contrasena),
        correoVerificado: true,
        ultimoAcceso: ahora,
      } as never) as Promise<{ idUsuario: number }>;
    };
    const novio1 = await crearPersonaUsuario(data.pareja1);
    const novio2 = await crearPersonaUsuario(data.pareja2);
    const proyecto = await this.prisma.client.orm.public.Proyecto.create({
      nombre: `Matrimonio de ${data.pareja1.nombres} & ${data.pareja2.nombres}`,
      idPm,
      presupuesto: data.presupuesto,
      objetivos: data.objetivos ?? null,
      necesidades: data.necesidades ?? null,
      supuestos: data.supuestos ?? null,
      restricciones: data.restricciones ?? null,
      estado: iniciar ? 'INICIO' : 'BORRADOR',
    } as never) as Proyecto;
    const matrimonio = await this.prisma.client.orm.public.Matrimonio.create({
      idProyecto: proyecto.idProyecto as never,
      idNovio1: novio1.idUsuario,
      idNovio2: novio2.idUsuario,
      fechaMatrimonio: Temporal.Instant.from(`${data.fechaMatrimonio}T00:00:00Z`),
      cantidadInvitados: data.cantidadInvitados,
      tipoCeremonia: data.tipoCeremonia,
      ciudadUbicacion: data.ciudadUbicacion ?? null,
      ideasMoonboard: data.ideasMoonboard ?? null,
      estado: true,
    } as never) as Matrimonio;
    return { proyecto, matrimonio };
  }

  async obtenerOnboardingMatrimonio(
    idProyecto: string,
    idPm: number,
  ): Promise<Record<string, unknown> | null> {
    const proyecto = (await this.prisma.client.orm.public.Proyecto.first({
      idProyecto: idProyecto as never,
    })) as Proyecto | null;
    if (!proyecto || proyecto.idPm !== idPm) return null;
    const matrimonio = await this.obtenerMatrimonioPorProyecto(idProyecto);
    if (!matrimonio) return null;
    const usuario1 = await this.prisma.client.orm.public.Usuario.first({ idUsuario: matrimonio.idNovio1 ?? -1 }) as { usuario: string; idPersonaNatural: number } | null;
    const usuario2 = await this.prisma.client.orm.public.Usuario.first({ idUsuario: matrimonio.idNovio2 ?? -1 }) as { usuario: string; idPersonaNatural: number } | null;
    const persona1 = usuario1 ? await this.prisma.client.orm.public.PersonaNatural.first({ idPersonaNatural: usuario1.idPersonaNatural }) as { nombres: string; apellidoPaterno: string; dni: string | null } | null : null;
    const persona2 = usuario2 ? await this.prisma.client.orm.public.PersonaNatural.first({ idPersonaNatural: usuario2.idPersonaNatural }) as { nombres: string; apellidoPaterno: string; dni: string | null } | null : null;
    return {
      proyecto,
      matrimonio,
      pareja1: persona1 && usuario1 ? { ...persona1, usuario: usuario1.usuario } : null,
      pareja2: persona2 && usuario2 ? { ...persona2, usuario: usuario2.usuario } : null,
    };
  }

  private normalizarProyecto(
    data: Partial<CrearProyectoDto>,
    parcial = false,
  ): Record<string, unknown> {
    return this.omitirIndefinidos({
      nombre: data.nombre ?? (parcial ? undefined : null),
      idPm: data.idPm ?? (parcial ? undefined : null),
      fechaInicio: this.instantONulo(data.fechaInicio, parcial),
      fechaFin: this.instantONulo(data.fechaFin, parcial),
      presupuesto: data.presupuesto ?? (parcial ? undefined : null),
      objetivos: data.objetivos ?? (parcial ? undefined : null),
      necesidades: data.necesidades ?? (parcial ? undefined : null),
      supuestos: data.supuestos ?? (parcial ? undefined : null),
      restricciones: data.restricciones ?? (parcial ? undefined : null),
      alcance: data.alcance ?? (parcial ? undefined : null),
      estado: data.estado ?? (parcial ? undefined : null),
      fechaModificacion: Temporal.Now.instant(),
    });
  }

  private normalizarMatrimonio(
    data: Partial<CrearMatrimonioDto>,
    parcial = false,
  ): Record<string, unknown> {
    return this.omitirIndefinidos({
      idProyecto: data.idProyecto ?? (parcial ? undefined : null),
      idNovio1: data.idNovio1 ?? (parcial ? undefined : null),
      idNovio2: data.idNovio2 ?? (parcial ? undefined : null),
      fechaMatrimonio: this.instantONulo(data.fechaMatrimonio, parcial),
      cantidadInvitados: data.cantidadInvitados ?? (parcial ? undefined : null),
      tipoCeremonia: data.tipoCeremonia ?? (parcial ? undefined : null),
      ciudadUbicacion: data.ciudadUbicacion ?? (parcial ? undefined : null),
      ideasMoonboard: data.ideasMoonboard ?? (parcial ? undefined : null),
      estado: data.estado ?? (parcial ? undefined : null),
      fechaModificacion: Temporal.Now.instant(),
    });
  }

  private instantONulo(
    value: string | null | undefined,
    parcial: boolean,
  ): Temporal.Instant | null | undefined {
    if (value === undefined) return parcial ? undefined : null;
    if (value === null) return null;
    return Temporal.Instant.from(value);
  }

  private omitirIndefinidos(data: Record<string, unknown>) {
    return Object.fromEntries(
      Object.entries(data).filter(([, value]) => value !== undefined),
    );
  }

  private texto(value: unknown) {
    return String(value ?? '').toLocaleLowerCase('es-PE');
  }

  private contiene = (value: unknown, filtro?: string) =>
    !filtro || this.texto(value).includes(this.texto(filtro));

  private descripcionUbigeo(
    ubigeo:
      | {
          departamento: string | null;
          provincia: string | null;
          distrito: string | null;
        }
      | null
      | undefined,
    codigo: string | null,
  ) {
    const descripcion = [
      ubigeo?.distrito,
      ubigeo?.provincia,
      ubigeo?.departamento,
    ]
      .filter((valor): valor is string => !!valor?.trim())
      .join(', ');
    return descripcion || codigo || null;
  }

  private compararFechas(
    left: Temporal.Instant | null,
    right: Temporal.Instant | null,
  ) {
    if (!left && !right) return 0;
    if (!left) return 1;
    if (!right) return -1;
    return Temporal.Instant.compare(left, right);
  }

  private paginarYOrdenar<T extends object>(
    items: T[],
    query: {
      pagina: number;
      limite: number;
      mostrarTodos: boolean;
      ordenarPor: string;
      orden: 'asc' | 'desc';
    },
  ): ResultadoPaginado<T> {
    const total = items.length;
    items.sort((a, b) => {
      const left = (a as Record<string, unknown>)[query.ordenarPor];
      const right = (b as Record<string, unknown>)[query.ordenarPor];
      const resultado = String(left ?? '').localeCompare(
        String(right ?? ''),
        'es',
        { numeric: true, sensitivity: 'base' },
      );
      return query.orden === 'asc' ? resultado : -resultado;
    });
    const pagina = query.mostrarTodos ? 1 : query.pagina;
    const limite = query.mostrarTodos ? total : query.limite;
    const totalPaginas = query.mostrarTodos
      ? total
        ? 1
        : 0
      : Math.ceil(total / query.limite);
    const paginados = query.mostrarTodos
      ? items
      : items.slice((pagina - 1) * query.limite, pagina * query.limite);
    return {
      items: paginados,
      paginacion: {
        pagina,
        limite,
        total,
        totalPaginas,
        tieneAnterior: pagina > 1,
        tieneSiguiente: pagina < totalPaginas,
      },
    };
  }
}
