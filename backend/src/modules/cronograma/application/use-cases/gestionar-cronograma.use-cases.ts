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
import { ReprogramacionActividadesService } from '../services/reprogramacion-actividades.service';

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
    const relaciones = await this.repository.listarHitoActividades(idProyecto);
    return hitos.map((hito) => ({
      ...hito,
      actividades: actividades.filter(
        (actividad) => relaciones.some(
          (relacion) => String(relacion.idHito) === String(hito.idHito) &&
            String(relacion.idActividad) === String(actividad.idActividad),
        ),
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

  async asociarActividad(
    idProyecto: string,
    idHito: string,
    idActividad: string,
    idUsuario: number,
  ) {
    await validarProyecto(this.repository, idProyecto, idUsuario);
    validarRegistro(await this.repository.obtenerHito(idHito), idProyecto, 'Hito');
    validarRegistro(
      await this.repository.obtenerActividad(idActividad),
      idProyecto,
      'Actividad',
    );
    const existe = (await this.repository.listarHitoActividades(idProyecto)).some(
      (relacion) =>
        String(relacion.idHito) === idHito &&
        String(relacion.idActividad) === idActividad,
    );
    if (existe) {
      throw new ConflictException('La actividad ya está asociada a este hito.');
    }
    await this.repository.crearHitoActividadManual(idHito, idActividad);
    return { idHito, idActividad };
  }

  async quitarActividad(
    idProyecto: string,
    idHito: string,
    idActividad: string,
    idUsuario: number,
  ) {
    await validarProyecto(this.repository, idProyecto, idUsuario);
    validarRegistro(await this.repository.obtenerHito(idHito), idProyecto, 'Hito');
    validarRegistro(await this.repository.obtenerActividad(idActividad), idProyecto, 'Actividad');
    await this.repository.eliminarHitoActividadManual(idHito, idActividad);
    return { idHito, idActividad };
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
    const data = {
      ...normalizarFechas(dto as Record<string, unknown>, ['fechaObjetivo'], true),
      ...(dto.orden !== undefined ? { modificadoManualmente: true } : {}),
    };
    if (dto.orden === undefined) return this.repository.actualizarHito(idHito, data);
    return this.repository.ejecutarEnTransaccionCrud(async (repositorio) => {
      const actualizado = await repositorio.actualizarHito(idHito, data);
      await this.recalcularActividadesNecesarias(repositorio, idProyecto);
      return actualizado;
    });
  }

  private async recalcularActividadesNecesarias(
    repositorio: CronogramaCrudRepository,
    idProyecto: string,
  ): Promise<void> {
    const [hitos, actividades] = await Promise.all([
      repositorio.listarHitos(idProyecto, { activo: true }),
      repositorio.listarActividades(idProyecto, { activo: true }),
    ]);
    const actividadesOrdenadas = [...actividades].sort(
      (a, b) => fechaComoDate(a.fechaFin)!.getTime() - fechaComoDate(b.fechaFin)!.getTime(),
    );
    const posicion = (hito: Record<string, unknown>) => {
      const orden = Number(hito.orden);
      if (hito.modificadoManualmente === true && Number.isInteger(orden))
        return Math.max(0, Math.min(orden, actividadesOrdenadas.length));
      const fecha = fechaComoDate(hito.fechaObjetivo);
      return fecha
        ? actividadesOrdenadas.filter((actividad) => fechaComoDate(actividad.fechaFin)! <= fecha).length
        : actividadesOrdenadas.length;
    };
    const hitosOrdenados = [...hitos]
      .map((hito) => ({ hito, posicion: posicion(hito) }))
      .sort((a, b) => a.posicion - b.posicion || Number(a.hito.orden) - Number(b.hito.orden));
    const relaciones: Array<{ idHito: string; idActividad: string }> = [];
    let inicio = 0;
    for (const actual of hitosOrdenados) {
      const bloque = actividadesOrdenadas.slice(inicio, actual.posicion);
      for (const actividad of bloque) {
        relaciones.push({ idHito: String(actual.hito.idHito), idActividad: String(actividad.idActividad) });
      }
      const ultima = bloque.at(-1);
      if (ultima?.fechaFin) {
        await repositorio.actualizarHito(String(actual.hito.idHito), {
          fechaObjetivo: fechaComoDate(ultima.fechaFin),
        });
      }
      inicio = actual.posicion;
    }
    await repositorio.reemplazarHitoActividades(idProyecto, relaciones);
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
  constructor(
    private readonly repository: CronogramaCrudRepository,
    private readonly reprogramacion: ReprogramacionActividadesService =
      new ReprogramacionActividadesService(),
  ) {}

  async listar(
    idProyecto: string,
    idUsuario: number,
    filtros: ListarActividadesDto,
  ) {
    await validarProyecto(this.repository, idProyecto, idUsuario);
    const actividades = await this.repository.listarActividades(idProyecto, filtros);
    if (!filtros.idHito) return actividades;
    const relaciones = await this.repository.listarHitoActividades(idProyecto);
    return actividades.filter((actividad) => relaciones.some(
      (relacion) => String(relacion.idHito) === filtros.idHito &&
        String(relacion.idActividad) === String(actividad.idActividad),
    ));
  }

  async obtener(idProyecto: string, idActividad: string, idUsuario: number) {
    await validarProyecto(this.repository, idProyecto, idUsuario);
    return validarRegistro(
      await this.repository.obtenerActividad(idActividad),
      idProyecto,
      'Actividad',
    );
  }

  async listarChecklist(idProyecto: string, idActividad: string, idUsuario: number) {
    await validarProyecto(this.repository, idProyecto, idUsuario);
    validarRegistro(await this.repository.obtenerActividad(idActividad), idProyecto, 'Actividad');
    return this.repository.listarChecklistActividad(idActividad);
  }

  async crearChecklist(idProyecto: string, idActividad: string, dto: { descripcion: string; orden?: number; obligatorio?: boolean }, idUsuario: number) {
    await validarProyectoOResponsable(this.repository, idProyecto, idActividad, idUsuario);
    validarRegistro(await this.repository.obtenerActividad(idActividad), idProyecto, 'Actividad');
    return this.repository.crearChecklistActividadManual({
      idActividad,
      idPlantillaChecklist: null,
      descripcion: dto.descripcion,
      orden: dto.orden ?? 0,
      obligatorio: dto.obligatorio ?? true,
    });
  }

  async actualizarChecklist(idProyecto: string, idActividad: string, idChecklist: string, dto: { completado?: boolean; descripcion?: string; orden?: number; obligatorio?: boolean; activo?: boolean }, idUsuario: number) {
    await validarProyectoOResponsable(this.repository, idProyecto, idActividad, idUsuario);
    const items = await this.repository.listarChecklistActividad(idActividad);
    if (!items.some((item) => String(item.idChecklist) === idChecklist)) throw new NotFoundException('Ítem del checklist no encontrado.');
    const data: Record<string, unknown> = { ...dto, modificadoManualmente: true };
    if (dto.completado !== undefined) {
      data.fechaCompletado = dto.completado ? new Date() : null;
      data.idUsuarioCompleto = dto.completado ? idUsuario : null;
    }
    return this.repository.actualizarChecklistActividad(idChecklist, data);
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
    const { idHito, listaVerificacion: _listaVerificacion, ...actividadDto } = dto;
    const creada = await this.repository.crearActividadManual({
      idProyecto,
      ...actividadDto,
      fechaInicio: dto.fechaInicio ? new Date(dto.fechaInicio) : null,
      fechaFin: new Date(dto.fechaFin),
      estado: dto.estado ?? 'PENDIENTE',
      orden: dto.orden ?? 0,
      modificadoManualmente: true,
      activo: true,
    });
    if (idHito) await this.repository.crearHitoActividadManual(idHito, String(creada.idActividad));
    return creada;
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
    const [actividades, dependencias] = await Promise.all([
      this.repository.listarActividades(idProyecto, { activo: true }),
      this.repository.listarDependencias(idProyecto),
    ]);
    const inicioPropuesto = dto.fechaInicio === undefined
      ? fechaComoDate(actual.fechaInicio)
      : dto.fechaInicio ? new Date(dto.fechaInicio) : null;
    this.reprogramacion.validarDependencias(
      idActividad,
      inicioPropuesto,
      actividades.map((actividad) =>
        String(actividad.idActividad) === idActividad
          ? {
              ...actividad,
              fechaInicio: inicioPropuesto,
              fechaFin: dto.fechaFin ? new Date(dto.fechaFin) : actividad.fechaFin,
            }
          : actividad,
      ) as never,
      dependencias as never,
    );
    const { idHito: _idHito, listaVerificacion: _listaVerificacion, ...actividadDto } = dto;
    return this.repository.actualizarActividad(
      idActividad,
      normalizarFechas(
        actividadDto as Record<string, unknown>,
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
      const checklistPendiente = (await this.repository.listarChecklistActividad(idActividad)).filter(
        (item) => item.activo !== false && item.obligatorio !== false && item.completado !== true,
      );
      if (checklistPendiente.length)
        throw new ConflictException('No se puede completar la actividad mientras existan ítems obligatorios del checklist pendientes.');
      const pendientes = (await this.repository.listarDependencias(idProyecto)).filter((dependencia) =>
        dependencia.idActividadSucesora === idActividad,
      ).map((dependencia) => String(dependencia.idActividadPredecesora));
      const predecesoras = await Promise.all(pendientes.map((id) => this.repository.obtenerActividad(id)));
      if (predecesoras.some((item) => item?.estado !== 'COMPLETADA')) throw new ConflictException('No se puede completar la actividad mientras tenga dependencias pendientes.');
    }
    const actualizada = await this.repository.actualizarActividad(idActividad, {
      estado: dto.estado,
    });
    if (dto.estado === 'COMPLETADA') await actualizarHitosRelacionados(this.repository, idProyecto, idActividad);
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
  constructor(
    private readonly repository: CronogramaCrudRepository,
    private readonly reprogramacion: ReprogramacionActividadesService =
      new ReprogramacionActividadesService(),
  ) {}

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
    const sucesoraValidada = validarRegistro(
      sucesora,
      idProyecto,
      'Actividad sucesora',
    );
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
    const inicioSucesora = fechaComoDate(sucesoraValidada.fechaInicio);
    if (inicioSucesora) {
      const actividades = await this.repository.listarActividades(idProyecto, {
        activo: true,
      });
      this.reprogramacion.validarDependencias(
        String(sucesoraValidada.idActividad),
        inicioSucesora,
        actividades as never,
        [
          ...dependencias,
          {
            idActividadPredecesora: dto.idActividadPredecesora,
            idActividadSucesora: dto.idActividadSucesora,
            tipoDependencia: dto.tipoDependencia ?? 'FINISH_TO_START',
            diasDesfase: dto.diasDesfase ?? 0,
          },
        ] as never,
      );
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
      const momentos = await repositorio.listarTiming(idProyecto, { activo: true });
      const ordenados = [...momentos].sort((a, b) => Number(a.orden ?? 0) - Number(b.orden ?? 0));
      const indiceActual = ordenados.findIndex((item) => String(item.idTiming) === String(actual.idTiming));
      const indiceVecino = ordenados.findIndex((item) => String(item.idTiming) === String(vecino.idTiming));
      [ordenados[indiceActual], ordenados[indiceVecino]] = [ordenados[indiceVecino], ordenados[indiceActual]];
      const primerCambio = Math.min(indiceActual, indiceVecino);
      const ultimoCambio = Math.max(indiceActual, indiceVecino);
      const anclaAnterior = [...ordenados.entries()]
        .slice(0, primerCambio + 1)
        .reverse()
        .find(([, momento]) => momento.tipoHorario === 'FIJO');
      const desde = anclaAnterior ? anclaAnterior[0] + 1 : 0;
      const siguienteFijo = ordenados.findIndex(
        (momento, indice) => indice > ultimoCambio && momento.tipoHorario === 'FIJO',
      );
      const hasta = siguienteFijo < 0 ? ordenados.length : siguienteFijo;
      const inicioBloque = anclaAnterior
        ? this.finConExtra(anclaAnterior[1])
        : fechaComoDate(ordenados[desde]?.fechaHoraInicio);
      const cursorFinal = await this.recalcularHorario(
        repositorio,
        ordenados.slice(desde, hasta),
        String(actual.idTiming),
        inicioBloque,
        desde,
      );
      if (siguienteFijo >= 0) {
        const inicioSiguienteFijo = fechaComoDate(ordenados[siguienteFijo].fechaHoraInicio);
        if (inicioSiguienteFijo && cursorFinal > inicioSiguienteFijo) {
          throw new ConflictException('El cambio invade el horario fijo siguiente. Reduce duraciones o reubica los elementos antes de ese horario.');
        }
      }
      return { idTiming: dto.idTiming, idTimingVecino: dto.idTimingVecino };
    });
  }

  /** Reencadena momentos flexibles; un fijo que no se mueve conserva su hora. */
  private async recalcularHorario(
    repositorio: CronogramaCrudRepository,
    momentos: Record<string, unknown>[],
    idFijoReubicado: string | null,
    inicioBloque: Date | null,
    ordenInicial: number,
  ): Promise<Date> {
    let cursor = inicioBloque;
    if (!cursor) throw new BadRequestException('El timing no tiene una hora inicial válida.');
    for (let indice = 0; indice < momentos.length; indice += 1) {
      const momento = momentos[indice];
      const esFijo = momento.tipoHorario === 'FIJO';
      const esFijoReubicado = esFijo && String(momento.idTiming) === idFijoReubicado;
      const inicioGuardado = fechaComoDate(momento.fechaHoraInicio);
      const inicio: Date | null =
        esFijo && !esFijoReubicado ? inicioGuardado : cursor;
      if (!inicio) throw new BadRequestException('El timing contiene una hora inválida.');
      if (esFijo && !esFijoReubicado && inicio < cursor) {
        throw new ConflictException('El cambio genera un choque con un momento de horario fijo. Reubica el momento fijo o ajusta los elementos vecinos.');
      }
      const duracion = Number(momento.duracionMinutos ?? 0);
      const fin: Date = new Date(inicio.getTime() + duracion * 60_000);
      await repositorio.actualizarTiming(String(momento.idTiming), {
        fechaHoraInicio: inicio,
        fechaHoraFin: fin,
        orden: ordenInicial + indice + 1,
        modificadoManualmente: true,
      });
      cursor = new Date(fin.getTime() + Number(momento.tiempoExtraMinutos ?? 0) * 60_000);
    }
    return cursor;
  }

  private finConExtra(momento: Record<string, unknown>): Date | null {
    const fin = fechaComoDate(momento.fechaHoraFin);
    return fin
      ? new Date(fin.getTime() + Number(momento.tiempoExtraMinutos ?? 0) * 60_000)
      : null;
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
    const [hitos, actividades, dependencias, timing, fases, hitoActividades] = await Promise.all([
      this.repository.listarHitos(idProyecto, filtros),
      this.repository.listarActividades(idProyecto, filtros),
      this.repository.listarDependencias(idProyecto),
      this.repository.listarTiming(idProyecto, filtros),
      this.repository.listarFasesProyecto(),
      this.repository.listarHitoActividades(idProyecto),
    ]);
    const faseProyecto = fases.find(
      (fase) => fase.idFaseProyecto === proyecto.idFaseProyecto,
    );
    const actividadesActivas = new Set(
      actividades.map((actividad) => String(actividad.idActividad)),
    );
    // La fecha efectiva de un hito es el mayor vencimiento de sus actividades
    // requeridas. Un hito sin actividades conserva su fecha objetivo manual.
    const fechaObjetivoPorHito = new Map<string, Date>();
    for (const relacion of hitoActividades) {
      const actividad = actividades.find(
        (item) => String(item.idActividad) === String(relacion.idActividad),
      );
      const fecha = actividad?.fechaFin
        ? fechaComoDate(actividad.fechaFin)
        : null;
      if (!fecha) continue;
      const idHito = String(relacion.idHito);
      const actual = fechaObjetivoPorHito.get(idHito);
      if (!actual || fecha > actual) fechaObjetivoPorHito.set(idHito, fecha);
    }
    const hitosConFechaEfectiva: Record<string, unknown>[] = hitos.map((hito) => {
      const fechaCalculada = fechaObjetivoPorHito.get(String(hito.idHito));
      const fechaManual = fechaComoDate(hito.fechaObjetivo);
      // Normalizar a ISO evita que un valor Temporal del ORM llegue como un
      // objeto no interpretable por Flutter. Sin actividades se expone la
      // fecha manual guardada; con actividades se expone la calculada.
      const fechaEfectiva = fechaCalculada ?? fechaManual;
      return {
        ...hito,
        fechaObjetivo: fechaEfectiva?.toISOString() ?? null,
      };
    });
    return {
      proyecto: {
        ...proyecto,
        faseProyecto: faseProyecto ?? null,
        faseProyectoCodigo: faseProyecto?.codigo ?? null,
      },
      hitos: hitosConFechaEfectiva,
      actividades,
      // El puente permite que una actividad contribuya a más de un hito sin
      // duplicar la actividad ni depender de la relación heredada id_hito.
      hitoActividades: hitoActividades.filter(
        (relacion) =>
          !activo ||
          (actividadesActivas.has(String(relacion.idActividad)) &&
            hitosConFechaEfectiva.some(
              (hito) => String(hito.idHito) === String(relacion.idHito),
            )),
      ),
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
async function actualizarHitosRelacionados(
  repository: CronogramaCrudRepository,
  idProyecto: string,
  idActividad: string,
) {
  const [relaciones, actividades, hitos] = await Promise.all([
    repository.listarHitoActividades(idProyecto),
    repository.listarActividades(idProyecto, { activo: true }),
    repository.listarHitos(idProyecto, { activo: true }),
  ]);
  for (const relacion of relaciones.filter(
    (item) => String(item.idActividad) === idActividad,
  )) {
    const idHito = String(relacion.idHito);
    const hito = hitos.find((item) => String(item.idHito) === idHito);
    // Un criterio de aceptación textual requiere revisión humana; no se fuerza.
    if (hito?.criterioAceptacion) continue;
    const asociadas = relaciones
      .filter((item) => String(item.idHito) === idHito)
      .map((item) => String(item.idActividad));
    const activas = actividades.filter((item) => asociadas.includes(String(item.idActividad)));
    if (activas.length && activas.every((item) => item.estado === 'COMPLETADA'))
      await repository.actualizarHito(idHito, { estado: 'COMPLETADO' });
  }
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
