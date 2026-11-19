import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CronogramaRepository,
  PlantillaActividadCronograma,
  ResumenGeneracionCronograma,
} from '../../domain/repositories/cronograma.repository';
import { CronogramaDateService } from '../services/cronograma-date.service';

/** Materializa solo cronograma e hitos desde la EDT confirmada. El timing es independiente. */
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
    if (!contexto.matrimonioExiste || !contexto.idMatrimonio)
      throw new NotFoundException('El proyecto no tiene un matrimonio asociado.');
    if (!contexto.fechaMatrimonio)
      throw new BadRequestException('El matrimonio no tiene fecha de boda.');
    if (!contexto.fechaInicio)
      throw new BadRequestException('El proyecto no tiene fecha de inicio.');
    if (contexto.fechaInicio >= contexto.fechaMatrimonio)
      throw new BadRequestException('La fecha de inicio debe ser anterior a la fecha del matrimonio.');
    if (await repositorio.existeCronogramaGenerado(idProyecto))
      throw new ConflictException('El proyecto ya tiene un cronograma generado.');

    const elementosEdt = await repositorio.obtenerElementosEdtActivos(contexto.idMatrimonio);
    if (!elementosEdt.length)
      throw new BadRequestException('Confirma una EDT con elementos activos antes de generar el cronograma.');

    const plantillas = await repositorio.obtenerPlantillasActivas();
    const edtActivos = new Set(elementosEdt);
    const actividadesPorPlantilla = new Map<number, string>();
    let actividadesCreadas = 0;
    let dependenciasCreadas = 0;
    let hitosCreados = 0;

    for (const plantilla of plantillas.actividades) {
      if (!this.aplicaTipoCeremonia(plantilla, plantillas.actividadesPorTipoCeremonia, contexto.idTipoCeremonia)) continue;
      if (!this.aplicaEdt(plantilla.idPlantillaActividad, plantillas.actividadesEdt, edtActivos)) continue;
      const fechaFin = this.fechas.calcularFechaObjetivo(contexto.fechaInicio, contexto.fechaMatrimonio, plantilla.tipoTemporal, plantilla.diasAntesBase ?? 0, plantilla.diasAntesMinimo);
      const periodo = this.fechas.calcularPeriodoActividad(contexto.fechaInicio, fechaFin, plantilla.duracionEstimadaDias ?? 0);
      const creada = await repositorio.crearActividad({
        idProyecto,
        idPlantillaActividad: plantilla.idPlantillaActividad,
        nombre: plantilla.nombre,
        entregable: plantilla.entregable,
        fechaInicio: periodo.fechaInicio,
        fechaFin: periodo.fechaFin,
        prioridad: plantilla.prioridad,
        responsableTexto: plantilla.responsableSugerido,
        estado: 'PENDIENTE',
        orden: plantilla.orden,
      });
      actividadesPorPlantilla.set(plantilla.idPlantillaActividad, creada.idActividad);
      actividadesCreadas += 1;
      for (const item of plantillas.checklist.filter((checklist) => checklist.idPlantillaActividad === plantilla.idPlantillaActividad)) {
        await repositorio.crearChecklistActividad({ idActividad: creada.idActividad, idPlantillaChecklist: item.idPlantillaChecklist, descripcion: item.descripcion, orden: item.orden, obligatorio: item.obligatorio });
      }
    }

    for (const dependencia of plantillas.dependencias) {
      const predecesora = actividadesPorPlantilla.get(dependencia.idActividadPredecesora);
      const sucesora = actividadesPorPlantilla.get(dependencia.idActividadSucesora);
      if (!predecesora || !sucesora) continue;
      await repositorio.crearDependencia({ idActividadPredecesora: predecesora, idActividadSucesora: sucesora, tipoDependencia: dependencia.tipoDependencia, diasDesfase: dependencia.diasDesfase });
      dependenciasCreadas += 1;
    }

    for (const plantilla of plantillas.hitos) {
      // El puente N:M es la fuente principal. La FK heredada protege cronogramas
      // restaurados desde catálogos antiguos que aún no tengan el puente completo.
      const asociacionesExplicitas = plantillas.hitosActividades.filter((relacion) => relacion.idPlantillaHito === plantilla.idPlantillaHito);
      const asociaciones = asociacionesExplicitas.length > 0
        ? asociacionesExplicitas
        : plantillas.actividades
            .filter((actividad) => actividad.idPlantillaHito === plantilla.idPlantillaHito)
            .map((actividad) => ({ idPlantillaHito: plantilla.idPlantillaHito, idPlantillaActividad: actividad.idPlantillaActividad }));
      const actividades = asociaciones.map((relacion) => actividadesPorPlantilla.get(relacion.idPlantillaActividad)).filter((id): id is string => !!id);
      if (asociaciones.length && !actividades.length) continue;
      const hito = await repositorio.crearHito({
        idProyecto, idPlantillaHito: plantilla.idPlantillaHito, nombre: plantilla.nombre,
        criterioAceptacion: plantilla.criterioAceptacion,
        fechaObjetivo: this.fechas.calcularFechaObjetivo(contexto.fechaInicio, contexto.fechaMatrimonio, plantilla.tipoTemporal, plantilla.diasAntesBase ?? 0, plantilla.diasAntesMinimo),
        estado: 'PENDIENTE', orden: plantilla.orden,
      });
      for (const idActividad of actividades) await repositorio.crearHitoActividad({ idHito: hito.idHito, idActividad });
      hitosCreados += 1;
    }
    return { hitos_creados: hitosCreados, actividades_creadas: actividadesCreadas, dependencias_creadas: dependenciasCreadas, elementos_timing_creados: 0 };
  }

  private aplicaTipoCeremonia(plantilla: PlantillaActividadCronograma, relaciones: Map<number, number[]>, idTipoCeremonia: number | null): boolean {
    const tipos = relaciones.get(plantilla.idPlantillaActividad);
    return !tipos?.length || (idTipoCeremonia !== null && tipos.includes(idTipoCeremonia));
  }

  private aplicaEdt(idActividad: number, relaciones: Array<{ idPlantillaActividad: number; idElementoEdt: string }>, edtActivos: Set<string>): boolean {
    const elementos = relaciones.filter((relacion) => relacion.idPlantillaActividad === idActividad);
    return !elementos.length || elementos.some((relacion) => edtActivos.has(relacion.idElementoEdt));
  }
}
