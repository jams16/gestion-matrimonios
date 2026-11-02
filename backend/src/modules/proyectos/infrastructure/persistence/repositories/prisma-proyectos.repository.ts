import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import * as argon2 from 'argon2';
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
        (query.estado === undefined || proyecto.estado === query.estado) &&
        (!query.idFaseProyecto ||
          proyecto.idFaseProyecto === query.idFaseProyecto) &&
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
    idPm?: number,
  ): Promise<ResultadoPaginado<Matrimonio>> {
    let items =
      (await this.prisma.client.orm.public.Matrimonio.all()) as Matrimonio[];
    const proyectos =
      (await this.prisma.client.orm.public.Proyecto.all()) as Proyecto[];
    const usuarios =
      (await this.prisma.client.orm.public.Usuario.all()) as Array<{
        idUsuario: number;
        idPersonaNatural: number;
      }>;
    const personas =
      (await this.prisma.client.orm.public.PersonaNatural.all()) as Array<{
        idPersonaNatural: number;
        nombres: string;
        apellidoPaterno: string;
        apellidoMaterno: string | null;
      }>;
    const contiene = this.contiene;
    const proyectoPorId = new Map(
      proyectos.map((proyecto) => [proyecto.idProyecto, proyecto]),
    );
    const nombrePareja = (idUsuario: number | null) => {
      const usuario = usuarios.find((item) => item.idUsuario === idUsuario);
      const persona = usuarios
        ? personas.find(
            (item) => item.idPersonaNatural === usuario?.idPersonaNatural,
          )
        : undefined;
      return [
        persona?.nombres,
        persona?.apellidoPaterno,
        persona?.apellidoMaterno,
      ]
        .filter(Boolean)
        .join(' ');
    };
    items = items.filter(
      (matrimonio) =>
        (idPm === undefined ||
          proyectoPorId.get(matrimonio.idProyecto)?.idPm === idPm) &&
        (!query.idMatrimonio ||
          matrimonio.idMatrimonio === query.idMatrimonio) &&
        (!query.idProyecto || matrimonio.idProyecto === query.idProyecto) &&
        (!query.idNovio1 || matrimonio.idNovio1 === query.idNovio1) &&
        (!query.idNovio2 || matrimonio.idNovio2 === query.idNovio2) &&
        (!query.idTipoCeremonia ||
          matrimonio.idTipoCeremonia === query.idTipoCeremonia) &&
        contiene(matrimonio.ciudadUbicacion, query.ciudadUbicacion) &&
        (query.estado === undefined || matrimonio.estado === query.estado) &&
        (!query.fechaDesde ||
          !matrimonio.fechaMatrimonio ||
          matrimonio.fechaMatrimonio.toString().slice(0, 10) >= query.fechaDesde) &&
        (!query.fechaHasta ||
          !matrimonio.fechaMatrimonio ||
          matrimonio.fechaMatrimonio.toString().slice(0, 10) <= query.fechaHasta) &&
        (!query.buscar ||
          [
            matrimonio.idMatrimonio,
            matrimonio.idProyecto,
            matrimonio.ciudadUbicacion,
            matrimonio.ideasMoonboard,
            proyectoPorId.get(matrimonio.idProyecto)?.nombre,
            nombrePareja(matrimonio.idNovio1),
            nombrePareja(matrimonio.idNovio2),
          ].some((valor) => contiene(valor, query.buscar))),
    );
    return this.paginarYOrdenar(items, query);
  }

  async listarResumenMatrimonios(
    query: ListarMatrimoniosDto = new ListarMatrimoniosDto(),
    idPm?: number,
  ): Promise<MatrimonioResumen[]> {
    const matrimonios =
      (await this.prisma.client.orm.public.Matrimonio.all()) as Matrimonio[];
    const proyectos =
      (await this.prisma.client.orm.public.Proyecto.all()) as Proyecto[];
    const fases =
      (await this.prisma.client.orm.public.FaseProyecto.all()) as Array<{
        idFaseProyecto: number;
        codigo: string;
        nombre: string;
      }>;
    const ubigeos =
      (await this.prisma.client.orm.public.Ubigeo.all()) as Array<{
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
    const fasesPorId = new Map(
      fases.map((fase) => [fase.idFaseProyecto, fase]),
    );

    const usuarios =
      (await this.prisma.client.orm.public.Usuario.all()) as Array<{
        idUsuario: number;
        idPersonaNatural: number;
      }>;
    const personas =
      (await this.prisma.client.orm.public.PersonaNatural.all()) as Array<{
        idPersonaNatural: number;
        nombres: string;
        apellidoPaterno: string;
        apellidoMaterno: string | null;
      }>;
    const nombrePareja = (idUsuario: number | null) => {
      const usuario = usuarios.find((item) => item.idUsuario === idUsuario);
      const persona = personas.find(
        (item) => item.idPersonaNatural === usuario?.idPersonaNatural,
      );
      return [persona?.nombres, persona?.apellidoPaterno, persona?.apellidoMaterno]
        .filter(Boolean)
        .join(' ');
    };
    return matrimonios
      .filter((matrimonio) => {
        const proyecto = proyectosPorId.get(matrimonio.idProyecto);
        const fecha = matrimonio.fechaMatrimonio?.toString().slice(0, 10);
        return (
          matrimonio.estado !== false &&
          (idPm === undefined || proyecto?.idPm === idPm) &&
          (!query.buscar ||
            [
              proyecto?.nombre,
              nombrePareja(matrimonio.idNovio1),
              nombrePareja(matrimonio.idNovio2),
              matrimonio.ciudadUbicacion,
            ].some((valor) => this.contiene(valor, query.buscar))) &&
          (!query.fechaDesde || !fecha || fecha >= query.fechaDesde) &&
          (!query.fechaHasta || !fecha || fecha <= query.fechaHasta)
        );
      })
      .map((matrimonio) => {
        const proyecto = proyectosPorId.get(matrimonio.idProyecto);
        const ubigeo = matrimonio.ciudadUbicacion
          ? ubigeosPorId.get(matrimonio.ciudadUbicacion)
          : null;
        const fase = proyecto?.idFaseProyecto
          ? fasesPorId.get(proyecto.idFaseProyecto)
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
          estado: proyecto?.estado ?? true,
          idFaseProyecto: proyecto?.idFaseProyecto ?? null,
          faseProyecto: fase
            ? { codigo: fase.codigo, nombre: fase.nombre }
            : null,
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

  async listarTiposCeremoniaActivos(): Promise<
    Array<{ idTipoCeremonia: number; codigo: string; nombre: string }>
  > {
    const tipos =
      (await this.prisma.client.orm.public.TipoCeremonia.all()) as Array<{
        idTipoCeremonia: number;
        codigo: string;
        nombre: string;
        activo: boolean;
      }>;
    return tipos
      .filter((tipo) => tipo.activo !== false)
      .map(({ idTipoCeremonia, codigo, nombre }) => ({
        idTipoCeremonia,
        codigo,
        nombre,
      }));
  }

  async guardarOnboardingMatrimonio(
    data: GuardarOnboardingMatrimonioDto,
    idPm: number,
    iniciar: boolean,
  ): Promise<{ proyecto: Proyecto; matrimonio: Matrimonio }> {
    const ahora = Temporal.Now.instant();
    const fechaMatrimonio = data.fechaMatrimonio
      ? Temporal.Instant.from(`${data.fechaMatrimonio}T00:00:00Z`)
      : null;
    const [tiposCeremonia, fases] = await Promise.all([
      this.prisma.client.orm.public.TipoCeremonia.all(),
      this.prisma.client.orm.public.FaseProyecto.all(),
    ]);
    const tipoCeremonia = (
      tiposCeremonia as Array<{ idTipoCeremonia: number; activo: boolean }>
    ).find(
      (tipo) =>
        tipo.idTipoCeremonia === data.idTipoCeremonia && tipo.activo !== false,
    );
    if (data.idTipoCeremonia !== undefined && !tipoCeremonia) {
      throw new BadRequestException(
        'El tipo de ceremonia indicado no existe o está inactivo.',
      );
    }
    const fase = (
      fases as Array<{
        idFaseProyecto: number;
        codigo: string;
        activo: boolean;
      }>
    ).find(
      (item) =>
        item.codigo === (iniciar ? 'INICIO' : 'BORRADOR') &&
        item.activo !== false,
    );
    if (!fase) {
      throw new BadRequestException('No existe la fase de proyecto requerida.');
    }
    if (data.idProyecto) {
      const proyectoActual = await this.obtenerProyecto(data.idProyecto);
      const matrimonioActual = await this.obtenerMatrimonioPorProyecto(
        data.idProyecto,
      );
      if (!proyectoActual || proyectoActual.idPm !== idPm || !matrimonioActual) {
        throw new BadRequestException(
          'El borrador indicado no existe o no te pertenece.',
        );
      }

      const proyecto = (await this.prisma.client.orm.public.Proyecto.where({
        idProyecto: data.idProyecto as never,
      }).update(this.omitirIndefinidos({
        presupuesto: data.presupuesto,
        objetivos: data.objetivos,
        necesidades: data.necesidades,
        supuestos: data.supuestos,
        restricciones: data.restricciones,
        idFaseProyecto: fase.idFaseProyecto,
        estado: true,
        fechaModificacion: ahora,
      }) as never)) as unknown as Proyecto;
      const matrimonio = (await this.prisma.client.orm.public.Matrimonio.where({
        idMatrimonio: matrimonioActual.idMatrimonio as never,
      }).update(this.omitirIndefinidos({
        fechaMatrimonio: data.fechaMatrimonio ? fechaMatrimonio : undefined,
        cantidadInvitados: data.cantidadInvitados,
        idTipoCeremonia: data.idTipoCeremonia,
        ciudadUbicacion: data.ciudadUbicacion ?? undefined,
        ideasMoonboard: data.ideasMoonboard,
        estado: true,
        fechaModificacion: ahora,
      }) as never)) as unknown as Matrimonio;
      return { proyecto, matrimonio };
    }
    if (iniciar && !data.idProyecto) {
      const personas =
        (await this.prisma.client.orm.public.PersonaNatural.all()) as Array<{
          idPersonaNatural: number;
          dni: string | null;
        }>;
      const persona1 = personas.find(
        (persona) => persona.dni === data.pareja1.dni,
      );
      const persona2 = personas.find(
        (persona) => persona.dni === data.pareja2.dni,
      );
      if (persona1 && persona2) {
        const usuarios =
          (await this.prisma.client.orm.public.Usuario.all()) as Array<{
            idUsuario: number;
            idPersonaNatural: number;
          }>;
        const usuario1 = usuarios.find(
          (usuario) => usuario.idPersonaNatural === persona1.idPersonaNatural,
        );
        const usuario2 = usuarios.find(
          (usuario) => usuario.idPersonaNatural === persona2.idPersonaNatural,
        );
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
              { idFaseProyecto: fase.idFaseProyecto, estado: true },
            );
            return { proyecto: actualizado!, matrimonio };
          }
        }
      }
    }
    const matrimoniosActuales =
      (await this.prisma.client.orm.public.Matrimonio.all()) as Matrimonio[];
    const proyectosActuales =
      (await this.prisma.client.orm.public.Proyecto.all()) as unknown as Proyecto[];
    const personasActuales =
      (await this.prisma.client.orm.public.PersonaNatural.all()) as Array<{
        idPersonaNatural: number;
        dni: string | null;
      }>;
    const usuariosActuales =
      (await this.prisma.client.orm.public.Usuario.all()) as Array<{
        idUsuario: number;
        idPersonaNatural: number;
      }>;
    const fasesQueBloqueanDni = new Set([
      'INICIO',
      'PLANIFICACION',
      'MONITOREO_Y_CONTROL',
      'EJECUCION',
    ]);
    const dniEnMatrimonioAbierto = (dni: string) => {
      const persona = personasActuales.find((item) => item.dni === dni);
      const usuario = persona
        ? usuariosActuales.find(
            (item) => item.idPersonaNatural === persona.idPersonaNatural,
          )
        : undefined;
      if (!usuario) return false;
      return matrimoniosActuales.some((item) => {
        if (
          item.estado === false ||
          (item.idNovio1 !== usuario.idUsuario &&
            item.idNovio2 !== usuario.idUsuario)
        ) {
          return false;
        }
        const proyecto = proyectosActuales.find(
          (candidate) => candidate.idProyecto === item.idProyecto,
        );
        const faseProyecto = (fases as Array<{
          idFaseProyecto: number;
          codigo: string;
        }>).find(
          (faseActual) =>
            faseActual.idFaseProyecto === proyecto?.idFaseProyecto,
        );
        return !!faseProyecto && fasesQueBloqueanDni.has(faseProyecto.codigo);
      });
    };
    if (
      dniEnMatrimonioAbierto(data.pareja1.dni) ||
      dniEnMatrimonioAbierto(data.pareja2.dni)
    ) {
      throw new ConflictException(
        'Una persona de la pareja ya participa en un matrimonio que no está en cierre.',
      );
    }
    const mismaFechaActiva = matrimoniosActuales.some((item) => {
      if (
        !fechaMatrimonio ||
        item.estado === false ||
        !item.fechaMatrimonio
      )
        return false;
      const proyecto = proyectosActuales.find(
        (candidate) => candidate.idProyecto === item.idProyecto,
      );
      return (
        proyecto?.idPm === idPm &&
        this.mismoDia(item.fechaMatrimonio, fechaMatrimonio)
      );
    });
    if (mismaFechaActiva) {
      throw new ConflictException(
        'Ya tienes un matrimonio activo para la misma fecha.',
      );
    }
    const crearPersonaUsuario = async (
      pareja: GuardarOnboardingMatrimonioDto['pareja1'],
    ) => {
      const personaExistente = personasActuales.find(
        (persona) => persona.dni === pareja.dni,
      );
      if (personaExistente) {
        const usuarioExistente = usuariosActuales.find(
          (usuario) =>
            usuario.idPersonaNatural === personaExistente.idPersonaNatural,
        );
        if (!usuarioExistente) {
          throw new ConflictException(
            'La persona identificada por DNI no tiene un usuario asociado.',
          );
        }
        return usuarioExistente;
      }
      const persona = await this.prisma.client.orm.public.PersonaNatural.create(
        {
          nombres: pareja.nombres,
          apellidoPaterno: pareja.apellidoPaterno,
          correoElectronico: `pareja-${pareja.dni}@matrimonio.local`,
          dni: pareja.dni,
        } as never,
      );
      return this.prisma.client.orm.public.Usuario.create({
        idPersonaNatural: (persona as { idPersonaNatural: number })
          .idPersonaNatural,
        usuario: pareja.usuario,
        tipoUsuario: 'OTROS',
        contrasenaHash: await argon2.hash(pareja.contrasena),
        correoVerificado: true,
        ultimoAcceso: ahora,
      } as never) as Promise<{ idUsuario: number }>;
    };
    const novio1 = await crearPersonaUsuario(data.pareja1);
    const novio2 = await crearPersonaUsuario(data.pareja2);
    const proyecto = (await this.prisma.client.orm.public.Proyecto.create({
      nombre: `Matrimonio de ${data.pareja1.nombres} & ${data.pareja2.nombres}`,
      idPm,
      presupuesto: data.presupuesto,
      objetivos: data.objetivos ?? null,
      necesidades: data.necesidades ?? null,
      supuestos: data.supuestos ?? null,
      restricciones: data.restricciones ?? null,
      fechaInicio: ahora,
      idFaseProyecto: fase.idFaseProyecto,
      estado: true,
    } as never)) as unknown as Proyecto;
    const matrimonio = (await this.prisma.client.orm.public.Matrimonio.create({
      idProyecto: proyecto.idProyecto as never,
      idNovio1: novio1.idUsuario,
      idNovio2: novio2.idUsuario,
      fechaMatrimonio,
      cantidadInvitados: data.cantidadInvitados,
      idTipoCeremonia: data.idTipoCeremonia,
      ciudadUbicacion: data.ciudadUbicacion ?? null,
      ideasMoonboard: data.ideasMoonboard ?? null,
      estado: true,
    } as never)) as unknown as Matrimonio;
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
    const usuario1 = (await this.prisma.client.orm.public.Usuario.first({
      idUsuario: matrimonio.idNovio1 ?? -1,
    })) as { usuario: string; idPersonaNatural: number } | null;
    const usuario2 = (await this.prisma.client.orm.public.Usuario.first({
      idUsuario: matrimonio.idNovio2 ?? -1,
    })) as { usuario: string; idPersonaNatural: number } | null;
    const persona1 = usuario1
      ? ((await this.prisma.client.orm.public.PersonaNatural.first({
          idPersonaNatural: usuario1.idPersonaNatural,
        })) as {
          nombres: string;
          apellidoPaterno: string;
          dni: string | null;
        } | null)
      : null;
    const persona2 = usuario2
      ? ((await this.prisma.client.orm.public.PersonaNatural.first({
          idPersonaNatural: usuario2.idPersonaNatural,
        })) as {
          nombres: string;
          apellidoPaterno: string;
          dni: string | null;
        } | null)
      : null;
    const usuarioPm = (await this.prisma.client.orm.public.Usuario.first({
      idUsuario: proyecto.idPm as never,
    })) as { idUsuario: number; idPersonaNatural: number } | null;
    const personaPm = usuarioPm
      ? ((await this.prisma.client.orm.public.PersonaNatural.first({
          idPersonaNatural: usuarioPm.idPersonaNatural,
        })) as {
          nombres: string;
          apellidoPaterno: string;
          apellidoMaterno: string | null;
        } | null)
      : null;
    const nombreCompleto = (persona: {
      nombres: string;
      apellidoPaterno: string;
      apellidoMaterno?: string | null;
    }) =>
      [persona.nombres, persona.apellidoPaterno, persona.apellidoMaterno]
        .filter(Boolean)
        .join(' ');
    const responsables = [
      usuarioPm && personaPm
        ? {
            idUsuario: usuarioPm.idUsuario,
            nombreCompleto: nombreCompleto(personaPm),
            rol: 'PROJECT_MANAGER',
          }
        : null,
      usuario1 && persona1
        ? {
            idUsuario: matrimonio.idNovio1,
            nombreCompleto: nombreCompleto(persona1),
            rol: 'PAREJA',
          }
        : null,
      usuario2 && persona2
        ? {
            idUsuario: matrimonio.idNovio2,
            nombreCompleto: nombreCompleto(persona2),
            rol: 'PAREJA',
          }
        : null,
    ].filter((responsable) => responsable !== null);
    return {
      proyecto,
      matrimonio,
      pareja1:
        persona1 && usuario1
          ? { ...persona1, usuario: usuario1.usuario }
          : null,
      pareja2:
        persona2 && usuario2
          ? { ...persona2, usuario: usuario2.usuario }
          : null,
      responsables,
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
      idFaseProyecto: data.idFaseProyecto ?? (parcial ? undefined : null),
      estado: data.estado ?? (parcial ? undefined : true),
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
      idTipoCeremonia: data.idTipoCeremonia ?? (parcial ? undefined : null),
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

  private mismoDia(left: Temporal.Instant, right: Temporal.Instant) {
    return left.toString().slice(0, 10) === right.toString().slice(0, 10);
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
