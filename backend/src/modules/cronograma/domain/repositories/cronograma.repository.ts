export type TipoTemporalCronograma =
  'INICIO' | 'ESCALABLE' | 'FIJO_EVENTO' | 'DIA_EVENTO' | 'POST_EVENTO';

export interface ContextoCronogramaProyecto {
  idProyecto: string;
  matrimonioExiste: boolean;
  idMatrimonio: string | null;
  fechaInicio: Date | null;
  fechaMatrimonio: Date | null;
  idTipoCeremonia: number | null;
}

export interface PlantillaHitoCronograma {
  idPlantillaHito: number;
  nombre: string;
  criterioAceptacion: string;
  tipoTemporal: TipoTemporalCronograma;
  diasAntesBase: number | null;
  diasAntesMinimo: number | null;
  orden: number;
}

export interface PlantillaActividadCronograma {
  idPlantillaActividad: number;
  /** Relación heredada; se usa como respaldo si no existe puente N:M explícito. */
  idPlantillaHito: number | null;
  nombre: string;
  responsableSugerido: string | null;
  entregable: string | null;
  tipoTemporal: TipoTemporalCronograma;
  diasAntesBase: number | null;
  diasAntesMinimo: number | null;
  duracionEstimadaDias: number | null;
  prioridad: string | null;
  orden: number;
}

export interface PlantillaChecklistCronograma {
  idPlantillaChecklist: number;
  idPlantillaActividad: number;
  descripcion: string;
  orden: number;
  obligatorio: boolean;
}

export interface PlantillaHitoActividadCronograma {
  idPlantillaHito: number;
  idPlantillaActividad: number;
}

export interface PlantillaActividadEdtCronograma {
  idPlantillaActividad: number;
  idElementoEdt: string;
}

export interface PlantillaDependenciaCronograma {
  idActividadPredecesora: number;
  idActividadSucesora: number;
  tipoDependencia: 'FINISH_TO_START';
  diasDesfase: number;
}

export interface PlantillaTimingCronograma {
  idPlantillaTiming: number;
  tipoHorario: 'FIJO' | 'FLEXIBLE';
  tiempoExtraMinutos: number;
  offsetInicioMinutos: number | null;
  duracionMinutos: number;
  actividad: string;
  responsableSugerido: string | null;
  listaVerificacion: string[];
  orden: number;
}

export interface PlantillaTimingDependenciaCronograma {
  idTimingPredecesor: number;
  idTimingSucesor: number;
  tipoDependencia: 'FINISH_TO_START';
  minutosDesfase: number;
}

export interface PlantillasCronograma {
  hitos: PlantillaHitoCronograma[];
  actividades: PlantillaActividadCronograma[];
  dependencias: PlantillaDependenciaCronograma[];
  timings: PlantillaTimingCronograma[];
  actividadesPorTipoCeremonia: Map<number, number[]>;
  timingsPorTipoCeremonia: Map<number, number[]>;
  checklist: PlantillaChecklistCronograma[];
  hitosActividades: PlantillaHitoActividadCronograma[];
  actividadesEdt: PlantillaActividadEdtCronograma[];
  timingDependencias: PlantillaTimingDependenciaCronograma[];
}

export interface CrearHitoCronograma {
  idProyecto: string;
  idPlantillaHito: number;
  nombre: string;
  criterioAceptacion: string;
  fechaObjetivo: Date;
  estado: 'PENDIENTE';
  orden: number;
}

export interface CrearActividadCronograma {
  idProyecto: string;
  idPlantillaActividad: number;
  nombre: string;
  entregable: string | null;
  fechaInicio: Date;
  fechaFin: Date;
  prioridad: string | null;
  responsableTexto: string | null;
  estado: 'PENDIENTE';
  orden: number;
}

export interface CrearChecklistActividadCronograma {
  idActividad: string;
  idPlantillaChecklist: number | null;
  descripcion: string;
  orden: number;
  obligatorio: boolean;
}

export interface CrearHitoActividadCronograma {
  idHito: string;
  idActividad: string;
}

export interface CrearDependenciaCronograma {
  idActividadPredecesora: string;
  idActividadSucesora: string;
  tipoDependencia: 'FINISH_TO_START';
  diasDesfase: number;
}

export interface CrearTimingCronograma {
  idProyecto: string;
  idPlantillaTiming: number;
  actividad: string;
  fechaHoraInicio: Date;
  fechaHoraFin: Date;
  duracionMinutos: number;
  responsableTexto: string | null;
  listaVerificacion: string[];
  tipoHorario: 'FIJO' | 'FLEXIBLE';
  tiempoExtraMinutos: number;
  estado: 'PENDIENTE';
  orden: number;
}

export interface ResumenGeneracionCronograma {
  hitos_creados: number;
  actividades_creadas: number;
  dependencias_creadas: number;
  elementos_timing_creados: number;
}

export abstract class CronogramaRepository {
  abstract ejecutarEnTransaccion<T>(
    operacion: (repositorio: CronogramaRepository) => Promise<T>,
  ): Promise<T>;
  abstract obtenerContextoProyecto(
    idProyecto: string,
  ): Promise<ContextoCronogramaProyecto | null>;
  abstract existeCronogramaGenerado(idProyecto: string): Promise<boolean>;
  abstract obtenerPlantillasActivas(): Promise<PlantillasCronograma>;
  abstract crearHito(data: CrearHitoCronograma): Promise<{ idHito: string }>;
  abstract crearActividad(
    data: CrearActividadCronograma,
  ): Promise<{ idActividad: string }>;
  abstract crearDependencia(data: CrearDependenciaCronograma): Promise<void>;
  abstract crearTiming(data: CrearTimingCronograma): Promise<{ idTiming: string }>;
  abstract crearTimingDependencia(data: {
    idTimingPredecesor: string;
    idTimingSucesor: string;
    tipoDependencia: 'FINISH_TO_START';
    minutosDesfase: number;
  }): Promise<void>;
  abstract existeTimingGenerado(idProyecto: string): Promise<boolean>;
  abstract crearChecklistActividad(data: CrearChecklistActividadCronograma): Promise<void>;
  abstract crearHitoActividad(data: CrearHitoActividadCronograma): Promise<void>;
  abstract obtenerElementosEdtActivos(idMatrimonio: string): Promise<string[]>;
}
