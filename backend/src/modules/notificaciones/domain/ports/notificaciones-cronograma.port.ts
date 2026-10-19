export type TipoEventoCronograma =
  | 'ACTIVIDAD_PROXIMA_VENCER'
  | 'ACTIVIDAD_VENCIDA'
  | 'ACTIVIDAD_REPROGRAMADA'
  | 'HITO_PROXIMO'
  | 'HITO_VENCIDO';

export abstract class NotificacionesCronogramaPort {
  abstract notificarActividadReprogramada(
    idProyecto: string,
    idActividad: string,
    fechaReferencia: Date,
  ): Promise<void>;
}
