import { TipoEventoCronograma } from '../ports/notificaciones-cronograma.port';

export interface FiltrosNotificacion {
  leida?: boolean;
  activo?: boolean;
  tipoEvento?: TipoEventoCronograma;
}
export interface NotificacionCronogramaCrear {
  idUsuarioDestino: number;
  idProyecto: string;
  tipoEvento: TipoEventoCronograma;
  idActividad?: string | null;
  idHito?: string | null;
  fechaReferencia?: Date | null;
  titulo: string;
  mensaje: string;
}
export abstract class NotificacionesRepository {
  abstract obtenerProyecto(
    idProyecto: string,
  ): Promise<{ idProyecto: string; idPm: number | null } | null>;
  abstract usuariosDestinatariosActividad(
    idProyecto: string,
    idActividad: string,
  ): Promise<number[]>;
  abstract usuariosDestinatariosHito(idProyecto: string): Promise<number[]>;
  abstract listarActividadesAlertables(): Promise<Record<string, unknown>[]>;
  abstract listarHitosAlertables(): Promise<Record<string, unknown>[]>;
  abstract existeNotificacionEquivalente(
    data: NotificacionCronogramaCrear,
  ): Promise<boolean>;
  abstract crearNotificacionCronograma(
    data: NotificacionCronogramaCrear,
  ): Promise<Record<string, unknown>>;
  abstract listarNotificaciones(
    idProyecto: string,
    idUsuario: number,
    filtros: FiltrosNotificacion,
  ): Promise<Record<string, unknown>[]>;
  abstract obtenerNotificacion(
    idNotificacion: string,
  ): Promise<Record<string, unknown> | null>;
  abstract actualizarNotificacion(
    idNotificacion: string,
    data: Record<string, unknown>,
  ): Promise<Record<string, unknown>>;
  abstract usuarioTieneAccesoProyecto(
    idProyecto: string,
    idUsuario: number,
  ): Promise<boolean>;
}
