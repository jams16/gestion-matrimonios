import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  ActualizarActividadDto,
  ActualizarHitoDto,
  ActualizarTimingDto,
  CambiarEstadoActividadDto,
  CambiarEstadoHitoDto,
  CambiarEstadoTimingDto,
  CrearActividadDto,
  CrearActividadDesdeSugerenciaDto,
  CrearDependenciaDto,
  CrearHitoDto,
  CrearTimingDto,
  IntercambiarTimingDto,
  ListarActividadesDto,
  ListarHitosDto,
  ListarTimingDto,
} from '../dto/cronograma.dto';
import { CronogramaCrudRepository } from '../../domain/repositories/cronograma-crud.repository';

@Injectable()
export class GestionarHitosUseCase {
  constructor(private readonly repository: CronogramaCrudRepository) {}

  async listar(idProyecto: string, idUsuario: number, filtros: ListarHitosDto) {
    await validarProyecto(this.repository, idProyecto, idUsuario);
    const hitos = await this.repository.listarHitos(idProyecto, filtros);
    if (!filtros.incluirActividades) return hitos;
    const actividades = await this.repository.listarActividades(idProyecto, {
      activo: filtros.activo,
    });
    return hitos.map((hito) => ({
      ...hito,
      actividades: actividades.filter(
        (actividad) => actividad.idHito === hito.idHito,
      ),
    }));
  }

  async obtener(idProyecto: string, idHito: string, idUsuario: number) {
    await validarProyecto(this.repository, idProyecto, idUsuario);
    return validarRegistro(
      await this.repository.obtenerHito(idHito),
      idProyecto,
      'Hito',
    );
  }

  async crear(idProyecto: string, dto: CrearHitoDto, idUsuario: number) {
    await validarProyecto(this.repository, idProyecto, idUsuario);
    return this.repository.crearHitoManual({
      idProyecto,
      ...dto,
      fechaObjetivo: new Date(dto.fechaObjetivo),
      estado: dto.estado ?? 'PENDIENTE',
      orden: dto.orden ?? 0,
      modificadoManualmente: true,
      activo: true,
    });
  }

  async actualizar(
    idProyecto: string,
    idHito: string,
    dto: ActualizarHitoDto,
    idUsuario: number,
  ) {
    await validarProyecto(this.repository, idProyecto, idUsuario);
    validarRegistro(
      await this.repository.obtenerHito(idHito),
      idProyecto,
      'Hito',
    );
    return this.repository.actualizarHito(
      idHito,
      normalizarFechas(dto as Record<string, unknown>, ['fechaObjetivo'], true),
    );
  }

  async cambiarEstado(
    idProyecto: string,
    idHito: string,
    dto: CambiarEstadoHitoDto,
    idUsuario: number,
  ) {
    await validarProyecto(this.repository, idProyecto, idUsuario);
    validarRegistro(
      await this.repository.obtenerHito(idHito),
      idProyecto,
      'Hito',
    );
    return this.repository.actualizarHito(idHito, { estado: dto.estado });
  }

  async eliminar(idProyecto: string, idHito: string, idUsuario: number) {
    await validarProyecto(this.repository, idProyecto, idUsuario);
    validarRegistro(
      await this.repository.obtenerHito(idHito),
      idProyecto,
      'Hito',
    );
    return this.repository.actualizarHito(idHito, { activo: false });
  }
}

@Injectable()
export class GestionarActividadesUseCase {
  constructor(private readonly repository: CronogramaCrudRepository) {}

  async listar(
    idProyecto: string,
    idUsuario: number,
    filtros: ListarActividadesDto,
  ) {
    await validarProyecto(this.repository, idProyecto, idUsuario);
    return this.repository.listarActividades(idProyecto, filtros);
  }

  async obtener(idProyecto: string, idActividad: string, idUsuario: number) {
    await validarProyecto(this.repository, idProyecto, idUsuario);
    return validarRegistro(
      await this.repository.obtenerActividad(idActividad),
      idProyecto,
      'Actividad',
    );
  }

  async crear(idProyecto: string, dto: CrearActividadDto, idUsuario: number) {
    await validarProyecto(this.repository, idProyecto, idUsuario);
    if (dto.idHito)
      validarRegistro(
        await this.repository.obtenerHito(dto.idHito),
        idProyecto,
        'Hito',
      );
    validarRango(dto.fechaInicio, dto.fechaFin);
    return this.repository.crearActividadManual({
      idProyecto,
      ...dto,
      fechaInicio: dto.fechaInicio ? new Date(dto.fechaInicio) : null,
      fechaFin: new Date(dto.fechaFin),
      estado: dto.estado ?? 'PENDIENTE',
      orden: dto.orden ?? 0,
      modificadoManualmente: true,
      activo: true,
    });
  }

  async actualizar(
    idProyecto: string,
    idActividad: string,
    dto: ActualizarActividadDto,
    idUsuario: number,
  ) {
    await validarProyecto(this.repository, idProyecto, idUsuario);
    const actual = validarRegistro(
      await this.repository.obtenerActividad(idActividad),
      idProyecto,
      'Actividad',
    );
    if (dto.idHito)
      validarRegistro(
        await this.repository.obtenerHito(dto.idHito),
        idProyecto,
        'Hito',
      );
    validarRango(
      dto.fechaInicio ?? fechaIso(actual.fechaInicio),
      dto.fechaFin ?? fechaIso(actual.fechaFin),
    );
    return this.repository.actualizarActividad(
      idActividad,
      normalizarFechas(
        dto as Record<string, unknown>,
        ['fechaInicio', 'fechaFin'],
        true,
      ),
    );
  }

  async cambiarEstado(
    idProyecto: string,
    idActividad: string,
    dto: CambiarEstadoActividadDto,
    idUsuario: number,
  ) {
    const proyecto = await validarProyectoOResponsable(this.repository, idProyecto, idActividad, idUsuario);
    const actividad = validarRegistro(
      await this.repository.obtenerActividad(idActividad),
      idProyecto,
      'Actividad',
    );
    if (dto.estado === 'COMPLETADA') {
      const pendientes = (await this.repository.listarDependencias(idProyecto)).filter((dependencia) =>
        dependencia.idActividadSucesora === idActividad,
      ).map((dependencia) => String(dependencia.idActividadPredecesora));
      const predecesoras = await Promise.all(pendientes.map((id) => this.repository.obtenerActividad(id)));
      if (predecesoras.some((item) => item?.estado !== 'COMPLETADA')) throw new ConflictException('No se puede completar la actividad mientras tenga dependencias pendientes.');
    }
    const actualizada = await this.repository.actualizarActividad(idActividad, {
      estado: dto.estado,
    });
    if (dto.estado === 'COMPLETADA' && actividad.idHito) await actualizarHitoAutomatico(this.repository, idProyecto, String(actividad.idHito));
    return { ...actualizada, autorizadoComo: proyecto.idPm === idUsuario ? 'PROJECT_MANAGER' : 'RESPONSABLE' };
  }

  async eliminar(idProyecto: string, idActividad: string, idUsuario: number) {
    await validarProyecto(this.repository, idProyecto, idUsuario);
    validarRegistro(
      await this.repository.obtenerActividad(idActividad),
      idProyecto,
      'Actividad',
    );
    return this.repository.actualizarActividad(idActividad, { activo: false });
  }

  async misActividades(idProyecto: string, idUsuario: number, filtros: ListarActividadesDto) {
    const proyecto = await this.repository.obtenerProyecto(idProyecto);
    if (!proyecto) throw new NotFoundException('Proyecto no encontrado.');
    return this.repository.listarActividades(idProyecto, { ...filtros, idUsuarioResponsable: idUsuario, activo: filtros.activo ?? true });
  }

  async resumenPorResponsable(idProyecto: string, idUsuario: number) {
    await validarProyecto(this.repository, idProyecto, idUsuario);
    const hoy = new Date();
    const actividades = await this.repository.listarActividades(idProyecto, { activo: true });
    const resumen = new Map<number, Record<string, unknown>>();
    for (const actividad of actividades) {
      const responsable = Number(actividad.idUsuarioResponsable);
      if (!Number.isInteger(responsable)) continue;
      const item = resumen.get(responsable) ?? { idUsuarioResponsable: responsable, total: 0, completadas: 0, pendientes: 0, retrasadas: 0, proximasAVencer: 0 };
      item.total = Number(item.total) + 1;
      if (actividad.estado === 'COMPLETADA') item.completadas = Number(item.completadas) + 1;
      else {
        item.pendientes = Number(item.pendientes) + 1;
        const fecha = fechaComoDate(actividad.fechaFin);
        if (fecha && fecha < hoy) item.retrasadas = Number(item.retrasadas) + 1;
        if (fecha && fecha >= hoy && fecha.getTime() <= hoy.getTime() + 3 * 86_400_000) item.proximasAVencer = Number(item.proximasAVencer) + 1;
      }
      resumen.set(responsable, item);
    }
    return [...resumen.values()];
  }
}

@Injectable()
export class GestionarDependenciasUseCase {
  constructor(private readonly repository: CronogramaCrudRepository) {}

  async listar(idProyecto: string, idUsuario: number) {
    await validarProyecto(this.repository, idProyecto, idUsuario);
    return this.repository.listarDependencias(idProyecto);
  }

  async crear(idProyecto: string, dto: CrearDependenciaDto, idUsuario: number) {
    await validarProyecto(this.repository, idProyecto, idUsuario);
    if (dto.idActividadPredecesora === dto.idActividadSucesora) {
      throw new BadRequestException(
        'Una actividad no puede depender de sí misma.',
      );
    }
    const [predecesora, sucesora, dependencias] = await Promise.all([
      this.repository.obtenerActividad(dto.idActividadPredecesora),
      this.repository.obtenerActividad(dto.idActividadSucesora),
      this.repository.listarDependencias(idProyecto),
    ]);
    validarRegistro(predecesora, idProyecto, 'Actividad predecesora');
    validarRegistro(sucesora, idProyecto, 'Actividad sucesora');
    if (
      dependencias.some(
        (item) =>
          item.idActividadPredecesora === dto.idActividadPredecesora &&
          item.idActividadSucesora === dto.idActividadSucesora,
      )
    ) {
      throw new ConflictException('La dependencia ya existe.');
    }
    if (
      creaCiclo(
        dependencias,
        dto.idActividadPredecesora,
        dto.idActividadSucesora,
      )
    ) {
      throw new BadRequestException('La dependencia generaría un ciclo.');
    }
    return this.repository.crearDependenciaManual({
      ...dto,
      tipoDependencia: dto.tipoDependencia ?? 'FINISH_TO_START',
      diasDesfase: dto.diasDesfase ?? 0,
    });
  }

  async eliminar(idProyecto: string, idDependencia: string, idUsuario: number) {
    await validarProyecto(this.repository, idProyecto, idUsuario);
    const dependencia = await this.repository.obtenerDependencia(idDependencia);
    if (!dependencia) throw new NotFoundException('Dependencia no encontrada.');
    const actividades = await this.repository.listarActividades(idProyecto, {});
    if (
      !actividades.some(
        (actividad) =>
          actividad.idActividad === dependencia.idActividadPredecesora,
      )
    ) {
      throw new NotFoundException('Dependencia no encontrada en el proyecto.');
    }
    await this.repository.eliminarDependencia(idDependencia);
    return { idDependencia };
  }
}

@Injectable()
export class GestionarTimingUseCase {
  constructor(private readonly repository: CronogramaCrudRepository) {}

  async listar(
    idProyecto: string,
    idUsuario: number,
    filtros: ListarTimingDto,
  ) {
    await validarProyecto(this.repository, idProyecto, idUsuario);
    return this.repository.listarTiming(idProyecto, filtros);
  }
  async obtener(idProyecto: string, idTiming: string, idUsuario: number) {
    await validarProyecto(this.repository, idProyecto, idUsuario);
    return validarRegistro(
      await this.repository.obtenerTiming(idTiming),
      idProyecto,
      'Elemento de timing',
    );
  }
  async crear(idProyecto: string, dto: CrearTimingDto, idUsuario: number) {
    await validarProyecto(this.repository, idProyecto, idUsuario);
    validarRango(dto.fechaHoraInicio, dto.fechaHoraFin);
    await validarSolapamientoTiming(this.repository, idProyecto, dto);
    return this.repository.crearTimingManual({
      idProyecto,
      ...dto,
      fechaHoraInicio: new Date(dto.fechaHoraInicio),
      fechaHoraFin: new Date(dto.fechaHoraFin),
      estado: dto.estado ?? 'PENDIENTE',
      orden: dto.orden ?? 0,
      modificadoManualmente: true,
      activo: true,
    });
  }
  async intercambiar(idProyecto: string, dto: IntercambiarTimingDto, idUsuario: number) {
    if (dto.idTiming === dto.idTimingVecino) throw new BadRequestException('Selecciona dos momentos distintos.');
    await validarProyecto(this.repository, idProyecto, idUsuario);
    return this.repository.ejecutarEnTransaccionCrud(async (repositorio) => {
      const actual = validarRegistro(await repositorio.obtenerTiming(dto.idTiming), idProyecto, 'Elemento de timing');
      const vecino = validarRegistro(await repositorio.obtenerTiming(dto.idTimingVecino), idProyecto, 'Elemento de timing');
      await repositorio.actualizarTiming(dto.idTiming, {
        fechaHoraInicio: vecino.fechaHoraInicio,
        fechaHoraFin: vecino.fechaHoraFin,
        duracionMinutos: vecino.duracionMinutos,
        orden: vecino.orden,
        modificadoManualmente: true,
      });
      await repositorio.actualizarTiming(dto.idTimingVecino, {
        fechaHoraInicio: actual.fechaHoraInicio,
        fechaHoraFin: actual.fechaHoraFin,
        duracionMinutos: actual.duracionMinutos,
        orden: actual.orden,
        modificadoManualmente: true,
      });
      return { idTiming: dto.idTiming, idTimingVecino: dto.idTimingVecino };
    });
  }
  async actualizar(
    idProyecto: string,
    idTiming: string,
    dto: ActualizarTimingDto,
    idUsuario: number,
  ) {
    await validarProyecto(this.repository, idProyecto, idUsuario);
    const actual = validarRegistro(
      await this.repository.obtenerTiming(idTiming),
      idProyecto,
      'Elemento de timing',
    );
    validarRango(
      dto.fechaHoraInicio ?? fechaIso(actual.fechaHoraInicio),
      dto.fechaHoraFin ?? fechaIso(actual.fechaHoraFin),
    );
    await validarSolapamientoTiming(this.repository, idProyecto, { ...actual, ...dto } as CrearTimingDto, idTiming);
    return this.repository.actualizarTiming(
      idTiming,
      normalizarFechas(
        dto as Record<string, unknown>,
        ['fechaHoraInicio', 'fechaHoraFin'],
        true,
      ),
    );
  }
  async cambiarEstado(
    idProyecto: string,
    idTiming: string,
    dto: CambiarEstadoTimingDto,
    idUsuario: number,
  ) {
    await validarProyecto(this.repository, idProyecto, idUsuario);
    validarRegistro(
      await this.repository.obtenerTiming(idTiming),
      idProyecto,
      'Elemento de timing',
    );
    return this.repository.actualizarTiming(idTiming, { estado: dto.estado });
  }
  async eliminar(idProyecto: string, idTiming: string, idUsuario: number) {
    await validarProyecto(this.repository, idProyecto, idUsuario);
    validarRegistro(
      await this.repository.obtenerTiming(idTiming),
      idProyecto,
      'Elemento de timing',
    );
    return this.repository.actualizarTiming(idTiming, { activo: false });
  }
}

@Injectable()
export class GestionarSugerenciasCronogramaUseCase {
  constructor(private readonly repository: CronogramaCrudRepository) {}
  async listar(idProyecto: string, idUsuario: number) {
    await validarProyecto(this.repository, idProyecto, idUsuario);
    return this.repository.listarPlantillasActividad();
  }
  async dependencias(idProyecto: string, idUsuario: number) {
    await validarProyecto(this.repository, idProyecto, idUsuario);
    return this.repository.listarPlantillasDependencia();
  }
  async hitos(idProyecto: string, idUsuario: number) {
    await validarProyecto(this.repository, idProyecto, idUsuario);
    return this.repository.listarPlantillasHito();
  }
  async timing(idProyecto: string, idUsuario: number) {
    await validarProyecto(this.repository, idProyecto, idUsuario);
    return this.repository.listarPlantillasTiming();
  }
  async crearDesdeSugerencia(idProyecto: string, dto: CrearActividadDesdeSugerenciaDto, idUsuario: number) {
    await validarProyecto(this.repository, idProyecto, idUsuario);
    const plantilla = (await this.repository.listarPlantillasActividad()).find((item) => Number(item.idPlantillaActividad) === dto.idPlantillaActividad && item.activo !== false);
    if (!plantilla) throw new NotFoundException('La actividad sugerida no existe o está inactiva.');
    validarRango(dto.fechaInicio, dto.fechaFin);
    if (dto.idHito) validarRegistro(await this.repository.obtenerHito(dto.idHito), idProyecto, 'Hito');
    return this.repository.crearActividadManual({ idProyecto, idPlantillaActividad: dto.idPlantillaActividad, idHito: dto.idHito ?? null, nombre: dto.nombre ?? plantilla.nombre, descripcion: null, listaVerificacion: plantilla.listaVerificacion ?? null, entregable: plantilla.entregable ?? null, fechaInicio: dto.fechaInicio ? new Date(dto.fechaInicio) : null, fechaFin: new Date(dto.fechaFin), prioridad: plantilla.prioridad ?? null, estado: 'PENDIENTE', idUsuarioResponsable: dto.idUsuarioResponsable ?? null, responsableTexto: dto.responsableTexto ?? plantilla.responsableSugerido ?? null, orden: Number(plantilla.orden ?? 0), modificadoManualmente: true, activo: true });
  }
}

@Injectable()
export class ConsultarCronogramaUseCase {
  constructor(private readonly repository: CronogramaCrudRepository) {}
  async obtener(idProyecto: string, idUsuario: number, activo = true) {
    const proyecto = await validarProyecto(
      this.repository,
      idProyecto,
      idUsuario,
    );
    const filtros = { activo };
    const [hitos, actividades, dependencias, timing] = await Promise.all([
      this.repository.listarHitos(idProyecto, filtros),
      this.repository.listarActividades(idProyecto, filtros),
      this.repository.listarDependencias(idProyecto),
      this.repository.listarTiming(idProyecto, filtros),
    ]);
    const actividadesActivas = new Set(
      actividades.map((actividad) => String(actividad.idActividad)),
    );
    return {
      proyecto,
      hitos,
      actividades,
      dependencias: dependencias.filter(
        (dependencia) =>
          !activo ||
          (actividadesActivas.has(String(dependencia.idActividadPredecesora)) &&
            actividadesActivas.has(String(dependencia.idActividadSucesora))),
      ),
      timing,
    };
  }
  async resumen(idProyecto: string, idUsuario: number) {
    await validarProyecto(this.repository, idProyecto, idUsuario);
    const [actividades, hitos] = await Promise.all([
      this.repository.listarActividades(idProyecto, { activo: true }),
      this.repository.listarHitos(idProyecto, { activo: true }),
    ]);
    const hoy = new Date();
    return {
      total_actividades: actividades.length,
      pendientes: actividades.filter((item) => item.estado === 'PENDIENTE')
        .length,
      en_proceso: actividades.filter((item) => item.estado === 'EN_PROCESO')
        .length,
      completadas: actividades.filter((item) => item.estado === 'COMPLETADA')
        .length,
      retrasadas: actividades.filter((item) => {
        const fechaFin = fechaComoDate(item.fechaFin);
        return (
          item.estado !== 'COMPLETADA' &&
          !!fechaFin &&
          fechaFin.getTime() < hoy.getTime()
        );
      }).length,
      total_hitos: hitos.length,
      hitos_completados: hitos.filter((item) => item.estado === 'COMPLETADO')
        .length,
    };
  }
}

/** Confirma la revisión inicial, sin convertir el cronograma en inmutable. */
@Injectable()
export class ConfirmarPlanificacionCronogramaUseCase {
  constructor(private readonly repository: CronogramaCrudRepository) {}

  async ejecutar(idProyecto: string, idUsuario: number) {
    return this.repository.ejecutarEnTransaccionCrud(async (repositorio) => {
      const proyecto = await validarProyecto(repositorio, idProyecto, idUsuario);
      if (!proyecto.estado)
        throw new BadRequestException('El proyecto no está activo.');

      const [contexto, fases, hitos, actividades] = await Promise.all([
        repositorio.obtenerVentanaProyecto(idProyecto),
        repositorio.listarFasesProyecto(),
        repositorio.listarHitos(idProyecto, { activo: true }),
        repositorio.listarActividades(idProyecto, { activo: true }),
      ]);
      if (!contexto?.fechaMatrimonio)
        throw new BadRequestException('El proyecto no tiene un matrimonio asociado.');
      if (!hitos.length || !actividades.length)
        throw new BadRequestException('El proyecto no tiene un cronograma generado.');

      const faseInicio = fases.find(
        (fase) => fase.codigo === 'INICIO' && fase.activo,
      );
      const fasePlanificacion = fases.find(
        (fase) => fase.codigo === 'PLANIFICACION' && fase.activo,
      );
      if (!faseInicio || !fasePlanificacion)
        throw new BadRequestException('No se encontraron las fases requeridas.');
      if (proyecto.idFaseProyecto !== faseInicio.idFaseProyecto)
        throw new ConflictException(
          'El proyecto debe estar en la fase INICIO para confirmar la planificación.',
        );

      await repositorio.actualizarProyectoFase(
        idProyecto,
        fasePlanificacion.idFaseProyecto,
      );
      return {
        idProyecto,
        faseAnterior: faseInicio.codigo,
        faseActual: fasePlanificacion.codigo,
        mensaje:
          'Cronograma confirmado. El proyecto pasó a la fase de planificación.',
      };
    });
  }
}

async function validarProyecto(
  repository: CronogramaCrudRepository,
  idProyecto: string,
  idUsuario: number,
) {
  const proyecto = await repository.obtenerProyecto(idProyecto);
  if (!proyecto) throw new NotFoundException('Proyecto no encontrado.');
  if (proyecto.idPm !== idUsuario)
    throw new ForbiddenException(
      'No tienes permiso para administrar el cronograma de este proyecto.',
    );
  return proyecto;
}
async function validarProyectoOResponsable(
  repository: CronogramaCrudRepository,
  idProyecto: string,
  idActividad: string,
  idUsuario: number,
) {
  const proyecto = await repository.obtenerProyecto(idProyecto);
  if (!proyecto) throw new NotFoundException('Proyecto no encontrado.');
  if (proyecto.idPm === idUsuario) return proyecto;
  const actividad = await repository.obtenerActividad(idActividad);
  if (actividad?.idProyecto === idProyecto && Number(actividad.idUsuarioResponsable) === idUsuario) return proyecto;
  throw new ForbiddenException('Solo el Wedding Planner o el responsable asignado puede cambiar este estado.');
}
async function actualizarHitoAutomatico(repository: CronogramaCrudRepository, idProyecto: string, idHito: string) {
  const actividades = await repository.listarActividades(idProyecto, { idHito, activo: true });
  if (actividades.length && actividades.every((actividad) => actividad.estado === 'COMPLETADA')) await repository.actualizarHito(idHito, { estado: 'COMPLETADO' });
}
async function validarSolapamientoTiming(
  repository: CronogramaCrudRepository,
  idProyecto: string,
  candidato: CrearTimingDto,
  excluirId?: string,
) {
  const inicio = new Date(candidato.fechaHoraInicio);
  const fin = new Date(candidato.fechaHoraFin);
  const existentes = await repository.listarTiming(idProyecto, { activo: true });
  const conflicto = existentes.some((item) => {
    if (String(item.idTiming) === excluirId) return false;
    if (!candidato.idUsuarioResponsable || Number(item.idUsuarioResponsable) !== candidato.idUsuarioResponsable) return false;
    const inicioExistente = fechaComoDate(item.fechaHoraInicio);
    const finExistente = fechaComoDate(item.fechaHoraFin);
    return !!inicioExistente && !!finExistente && inicio < finExistente && fin > inicioExistente;
  });
  if (conflicto) throw new ConflictException('El responsable ya tiene un elemento de timing que se solapa en ese horario.');
}
function validarRegistro(
  registro: Record<string, unknown> | null,
  idProyecto: string,
  nombre: string,
) {
  if (!registro || registro.idProyecto !== idProyecto)
    throw new NotFoundException(`${nombre} no encontrado.`);
  return registro;
}
function validarRango(inicio?: string | null, fin?: string | null) {
  if (inicio && fin && new Date(inicio).getTime() > new Date(fin).getTime())
    throw new BadRequestException(
      'La fecha de inicio no puede ser posterior a la fecha final.',
    );
}
function normalizarFechas(
  dto: Record<string, unknown>,
  campos: string[],
  manual: boolean,
) {
  const data: Record<string, unknown> = { ...dto };
  for (const campo of campos)
    if (typeof data[campo] === 'string')
      data[campo] = new Date(data[campo] as string);
  if (manual && Object.keys(dto).length) data.modificadoManualmente = true;
  return data;
}
function fechaComoDate(valor: unknown): Date | null {
  if (!valor) return null;
  if (valor instanceof Date) return valor;
  if (typeof valor === 'object' && valor && 'epochMilliseconds' in valor)
    return new Date(
      Number((valor as { epochMilliseconds: unknown }).epochMilliseconds),
    );
  const fecha = new Date(String(valor));
  return Number.isNaN(fecha.getTime()) ? null : fecha;
}
function fechaIso(valor: unknown): string | undefined {
  return fechaComoDate(valor)?.toISOString();
}
function creaCiclo(
  dependencias: Record<string, unknown>[],
  predecesora: string,
  sucesora: string,
): boolean {
  const conexiones = new Map<string, string[]>();
  for (const item of dependencias) {
    const origen = String(item.idActividadPredecesora);
    conexiones.set(origen, [
      ...(conexiones.get(origen) ?? []),
      String(item.idActividadSucesora),
    ]);
  }
  const visitar = (actual: string, visitados = new Set<string>()): boolean => {
    if (actual === predecesora) return true;
    if (visitados.has(actual)) return false;
    visitados.add(actual);
    return (conexiones.get(actual) ?? []).some((siguiente) =>
      visitar(siguiente, visitados),
    );
  };
  return visitar(sucesora);
}
