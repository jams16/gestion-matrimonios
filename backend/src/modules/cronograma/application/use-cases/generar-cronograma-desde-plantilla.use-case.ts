import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  CronogramaRepository,
  PlantillaActividadCronograma,
  PlantillaTimingCronograma,
  ResumenGeneracionCronograma,
} from '../../domain/repositories/cronograma.repository';
import { CronogramaDateService } from '../services/cronograma-date.service';

@Injectable()
export class GenerarCronogramaDesdePlantillaUseCase {
  constructor(
    private readonly repository: CronogramaRepository,
    private readonly fechas: CronogramaDateService,
  ) {}

  execute(idProyecto: string): Promise<ResumenGeneracionCronograma> {
    return this.repository.ejecutarEnTransaccion((repositorio) =>
      this.generar(repositorio, idProyecto),
    );
  }

  private async generar(
    repositorio: CronogramaRepository,
    idProyecto: string,
  ): Promise<ResumenGeneracionCronograma> {
    const contexto = await repositorio.obtenerContextoProyecto(idProyecto);
    if (!contexto) throw new NotFoundException('Proyecto no encontrado.');
    if (!contexto.matrimonioExiste) {
      throw new NotFoundException(
        'El proyecto no tiene un matrimonio asociado.',
      );
    }
    if (!contexto.fechaMatrimonio) {
      throw new BadRequestException('El matrimonio no tiene fecha de boda.');
    }
    if (!contexto.fechaInicio) {
      throw new BadRequestException('El proyecto no tiene fecha de inicio.');
    }
    if (contexto.fechaInicio >= contexto.fechaMatrimonio) {
      throw new BadRequestException(
        'La fecha de inicio debe ser anterior a la fecha del matrimonio.',
      );
    }
    if (await repositorio.existeCronogramaGenerado(idProyecto)) {
      throw new ConflictException(
        'El proyecto ya tiene un cronograma generado.',
      );
    }

    const plantillas = await repositorio.obtenerPlantillasActivas();
    const hitosPorPlantilla = new Map<number, string>();
    const actividadesPorPlantilla = new Map<number, string>();
    let hitosCreados = 0;
    let actividadesCreadas = 0;
    let dependenciasCreadas = 0;
    let timingsCreados = 0;

    for (const plantilla of plantillas.hitos) {
      const fechaObjetivo = this.fechas.calcularFechaObjetivo(
        contexto.fechaInicio,
        contexto.fechaMatrimonio,
        plantilla.tipoTemporal,
        plantilla.diasAntesBase ?? 0,
        plantilla.diasAntesMinimo,
      );
      const hito = await repositorio.crearHito({
        idProyecto,
        idPlantillaHito: plantilla.idPlantillaHito,
        nombre: plantilla.nombre,
        criterioAceptacion: plantilla.criterioAceptacion,
        fechaObjetivo,
        estado: 'PENDIENTE',
        orden: plantilla.orden,
      });
      hitosPorPlantilla.set(plantilla.idPlantillaHito, hito.idHito);
      hitosCreados += 1;
    }

    for (const plantilla of plantillas.actividades) {
      if (
        !this.aplicaTipoCeremonia(
          plantilla,
          plantillas.actividadesPorTipoCeremonia,
          contexto.idTipoCeremonia,
        )
      )
        continue;

      const fechaFin = this.fechas.calcularFechaObjetivo(
        contexto.fechaInicio,
        contexto.fechaMatrimonio,
        plantilla.tipoTemporal,
        plantilla.diasAntesBase ?? 0,
        plantilla.diasAntesMinimo,
      );
      const periodo = this.fechas.calcularPeriodoActividad(
        contexto.fechaInicio,
        fechaFin,
        plantilla.duracionEstimadaDias ?? 0,
      );
      const actividad = await repositorio.crearActividad({
        idProyecto,
        idHito: plantilla.idPlantillaHito
          ? (hitosPorPlantilla.get(plantilla.idPlantillaHito) ?? null)
          : null,
        idPlantillaActividad: plantilla.idPlantillaActividad,
        nombre: plantilla.nombre,
        listaVerificacion: plantilla.listaVerificacion,
        entregable: plantilla.entregable,
        fechaInicio: periodo.fechaInicio,
        fechaFin: periodo.fechaFin,
        prioridad: plantilla.prioridad,
        responsableTexto: plantilla.responsableSugerido,
        estado: 'PENDIENTE',
        orden: plantilla.orden,
      });
      actividadesPorPlantilla.set(
        plantilla.idPlantillaActividad,
        actividad.idActividad,
      );
      actividadesCreadas += 1;
    }

    for (const plantilla of plantillas.dependencias) {
      const predecesora = actividadesPorPlantilla.get(
        plantilla.idActividadPredecesora,
      );
      const sucesora = actividadesPorPlantilla.get(
        plantilla.idActividadSucesora,
      );
      if (!predecesora || !sucesora) continue;
      await repositorio.crearDependencia({
        idActividadPredecesora: predecesora,
        idActividadSucesora: sucesora,
        tipoDependencia: plantilla.tipoDependencia,
        diasDesfase: plantilla.diasDesfase,
      });
      dependenciasCreadas += 1;
    }

    for (const plantilla of plantillas.timings) {
      if (
        !this.aplicaTipoCeremonia(
          plantilla,
          plantillas.timingsPorTipoCeremonia,
          contexto.idTipoCeremonia,
        )
      )
        continue;
      const fechaHoraInicio = this.combinarFechaYHora(
        contexto.fechaMatrimonio,
        plantilla.horaInicio,
      );
      const fechaHoraFin = new Date(
        fechaHoraInicio.getTime() + plantilla.duracionMinutos * 60_000,
      );
      await repositorio.crearTiming({
        idProyecto,
        idPlantillaTiming: plantilla.idPlantillaTiming,
        actividad: plantilla.actividad,
        fechaHoraInicio,
        fechaHoraFin,
        duracionMinutos: plantilla.duracionMinutos,
        responsableTexto: plantilla.responsableSugerido,
        listaVerificacion: plantilla.listaVerificacion,
        estado: 'PENDIENTE',
        orden: plantilla.orden,
      });
      timingsCreados += 1;
    }

    return {
      hitos_creados: hitosCreados,
      actividades_creadas: actividadesCreadas,
      dependencias_creadas: dependenciasCreadas,
      elementos_timing_creados: timingsCreados,
    };
  }

  private aplicaTipoCeremonia(
    plantilla: PlantillaActividadCronograma | PlantillaTimingCronograma,
    relaciones: Map<number, number[]>,
    idTipoCeremonia: number | null,
  ): boolean {
    const tipos = relaciones.get(
      'idPlantillaActividad' in plantilla
        ? plantilla.idPlantillaActividad
        : plantilla.idPlantillaTiming,
    );
    return (
      !tipos?.length ||
      (idTipoCeremonia !== null && tipos.includes(idTipoCeremonia))
    );
  }

  private combinarFechaYHora(fecha: Date, hora: string): Date {
    const [horas = '0', minutos = '0', segundos = '0'] = hora.split(':');
    return new Date(
      Date.UTC(
        fecha.getUTCFullYear(),
        fecha.getUTCMonth(),
        fecha.getUTCDate(),
        Number(horas),
        Number(minutos),
        Number(segundos.split('.')[0]),
      ),
    );
  }
}
