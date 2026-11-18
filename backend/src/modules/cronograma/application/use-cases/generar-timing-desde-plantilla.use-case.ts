import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CronogramaRepository, PlantillaTimingCronograma } from '../../domain/repositories/cronograma.repository';

export interface ResumenGeneracionTiming {
  elementos_timing_creados: number;
  dependencias_timing_creadas: number;
}

/** Genera el timing de forma independiente, tomando la hora inicial indicada por la WP. */
@Injectable()
export class GenerarTimingDesdePlantillaUseCase {
  constructor(private readonly repository: CronogramaRepository) {}

  execute(idProyecto: string, horaInicio: string): Promise<ResumenGeneracionTiming> {
    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(horaInicio))
      throw new BadRequestException('La hora de inicio debe tener formato HH:mm.');
    return this.repository.ejecutarEnTransaccion((repositorio) => this.generar(repositorio, idProyecto, horaInicio));
  }

  private async generar(repositorio: CronogramaRepository, idProyecto: string, horaInicio: string): Promise<ResumenGeneracionTiming> {
    const contexto = await repositorio.obtenerContextoProyecto(idProyecto);
    if (!contexto) throw new NotFoundException('Proyecto no encontrado.');
    if (!contexto.matrimonioExiste || !contexto.fechaMatrimonio)
      throw new BadRequestException('El proyecto no tiene un matrimonio con fecha de boda.');
    if (!(await repositorio.existeCronogramaGenerado(idProyecto)))
      throw new BadRequestException('Genera primero el cronograma y los hitos.');
    if (await repositorio.existeTimingGenerado(idProyecto))
      throw new ConflictException('El proyecto ya tiene un timing generado.');

    const plantillas = await repositorio.obtenerPlantillasActivas();
    const aplicables = plantillas.timings.filter((timing) => this.aplicaCeremonia(timing, plantillas.timingsPorTipoCeremonia, contexto.idTipoCeremonia));
    const pendientes = new Map(aplicables.map((item) => [item.idPlantillaTiming, item]));
    const creados = new Map<number, { id: string; inicio: Date; fin: Date }>();
    const inicioBase = this.combinar(contexto.fechaMatrimonio, horaInicio);

    // Topological scheduling: una iteración crea cualquier nodo cuyas predecesoras
    // aplicables ya existan. Así se soportan ramas paralelas y se detectan ciclos.
    while (pendientes.size) {
      let avanzo = false;
      for (const [id, plantilla] of [...pendientes]) {
        const deps = plantillas.timingDependencias.filter(
          (dep) => dep.idTimingSucesor === id,
        );
        const predecesorasAplicables = deps.filter((dep) => aplicables.some((item) => item.idPlantillaTiming === dep.idTimingPredecesor));
        if (predecesorasAplicables.some((dep) => !creados.has(dep.idTimingPredecesor))) continue;
        let inicio = new Date(inicioBase);
        if (!predecesorasAplicables.length && plantilla.offsetInicioMinutos != null)
          inicio = this.sumarMinutos(inicioBase, plantilla.offsetInicioMinutos);
        for (const dep of predecesorasAplicables) {
          const predecesora = creados.get(dep.idTimingPredecesor)!;
          const plantillaPredecesora = pendientes.get(dep.idTimingPredecesor) ?? aplicables.find((item) => item.idPlantillaTiming === dep.idTimingPredecesor)!;
          const minimo = this.sumarMinutos(predecesora.fin, (plantillaPredecesora.tiempoExtraMinutos ?? 0) + dep.minutosDesfase);
          if (minimo > inicio) inicio = minimo;
        }
        const fin = this.sumarMinutos(inicio, plantilla.duracionMinutos);
        const registro = await repositorio.crearTiming({
          idProyecto, idPlantillaTiming: plantilla.idPlantillaTiming, actividad: plantilla.actividad,
          fechaHoraInicio: inicio, fechaHoraFin: fin, duracionMinutos: plantilla.duracionMinutos,
          tipoHorario: plantilla.tipoHorario, tiempoExtraMinutos: plantilla.tiempoExtraMinutos,
          responsableTexto: plantilla.responsableSugerido,
          listaVerificacion: plantilla.listaVerificacion,
          estado: 'PENDIENTE', orden: plantilla.orden,
        });
        creados.set(id, { id: registro.idTiming, inicio, fin });
        pendientes.delete(id);
        avanzo = true;
      }
      if (!avanzo) throw new BadRequestException('Las dependencias de timing contienen un ciclo.');
    }

    let dependencias = 0;
    for (const dependencia of plantillas.timingDependencias) {
      const predecesora = creados.get(dependencia.idTimingPredecesor);
      const sucesora = creados.get(dependencia.idTimingSucesor);
      if (!predecesora || !sucesora) continue;
      await repositorio.crearTimingDependencia({ idTimingPredecesor: predecesora.id, idTimingSucesor: sucesora.id, tipoDependencia: dependencia.tipoDependencia, minutosDesfase: dependencia.minutosDesfase });
      dependencias += 1;
    }
    return { elementos_timing_creados: creados.size, dependencias_timing_creadas: dependencias };
  }

  private aplicaCeremonia(plantilla: PlantillaTimingCronograma, relaciones: Map<number, number[]>, idTipo: number | null) {
    const tipos = relaciones.get(plantilla.idPlantillaTiming);
    return !tipos?.length || (idTipo !== null && tipos.includes(idTipo));
  }
  private combinar(fecha: Date, hora: string) {
    const [horas, minutos] = hora.split(':').map(Number);
    return new Date(Date.UTC(fecha.getUTCFullYear(), fecha.getUTCMonth(), fecha.getUTCDate(), horas, minutos));
  }
  private sumarMinutos(fecha: Date, minutos: number) { return new Date(fecha.getTime() + minutos * 60_000); }
}
