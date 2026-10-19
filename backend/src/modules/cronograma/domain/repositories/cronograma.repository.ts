export type TipoTemporalCronograma =
  'INICIO' | 'ESCALABLE' | 'FIJO_EVENTO' | 'DIA_EVENTO' | 'POST_EVENTO';

export interface ContextoCronogramaProyecto {
  idProyecto: string;
  matrimonioExiste: boolean;
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
  idPlantillaHito: number | null;
  nombre: string;
  listaVerificacion: unknown;
  responsableSugerido: string | null;
  entregable: string | null;
  tipoTemporal: TipoTemporalCronograma;
  diasAntesBase: number | null;
  diasAntesMinimo: number | null;
  duracionEstimadaDias: number | null;
  prioridad: string | null;
  orden: number;
}

export interface PlantillaDependenciaCronograma {
  idActividadPredecesora: number;
  idActividadSucesora: number;
  tipoDependencia: 'FINISH_TO_START';
  diasDesfase: number;
}

export interface PlantillaTimingCronograma {
  idPlantillaTiming: number;
  horaInicio: string;
  duracionMinutos: number;
  actividad: string;
  responsableSugerido: string | null;
  listaVerificacion: unknown;
  orden: number;
}

export interface PlantillasCronograma {
  hitos: PlantillaHitoCronograma[];
  actividades: PlantillaActividadCronograma[];
  dependencias: PlantillaDependenciaCronograma[];
  timings: PlantillaTimingCronograma[];
  actividadesPorTipoCeremonia: Map<number, number[]>;
  timingsPorTipoCeremonia: Map<number, number[]>;
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
  idHito: string | null;
  idPlantillaActividad: number;
  nombre: string;
  listaVerificacion: unknown;
  entregable: string | null;
  fechaInicio: Date;
  fechaFin: Date;
  prioridad: string | null;
  responsableTexto: string | null;
  estado: 'PENDIENTE';
  orden: number;
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
  listaVerificacion: unknown;
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
  abstract crearTiming(data: CrearTimingCronograma): Promise<void>;
}
