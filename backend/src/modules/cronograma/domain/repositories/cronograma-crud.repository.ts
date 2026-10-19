export interface FiltrosCronograma {
  estado?: string;
  activo?: boolean;
  idHito?: string;
  idUsuarioResponsable?: number;
  incluirActividades?: boolean;
}

export abstract class CronogramaCrudRepository {
  abstract ejecutarEnTransaccionCrud<T>(
    operacion: (repositorio: CronogramaCrudRepository) => Promise<T>,
  ): Promise<T>;
  abstract obtenerProyecto(idProyecto: string): Promise<{
    idProyecto: string;
    idPm: number | null;
    nombre: string | null;
  } | null>;
  abstract obtenerVentanaProyecto(idProyecto: string): Promise<{
    fechaInicio: Date | null;
    fechaMatrimonio: Date | null;
  } | null>;
  abstract listarHitos(
    idProyecto: string,
    filtros: FiltrosCronograma,
  ): Promise<Record<string, unknown>[]>;
  abstract obtenerHito(idHito: string): Promise<Record<string, unknown> | null>;
  abstract crearHitoManual(
    data: Record<string, unknown>,
  ): Promise<Record<string, unknown>>;
  abstract actualizarHito(
    idHito: string,
    data: Record<string, unknown>,
  ): Promise<Record<string, unknown>>;
  abstract listarActividades(
    idProyecto: string,
    filtros: FiltrosCronograma,
  ): Promise<Record<string, unknown>[]>;
  abstract obtenerActividad(
    idActividad: string,
  ): Promise<Record<string, unknown> | null>;
  abstract crearActividadManual(
    data: Record<string, unknown>,
  ): Promise<Record<string, unknown>>;
  abstract actualizarActividad(
    idActividad: string,
    data: Record<string, unknown>,
  ): Promise<Record<string, unknown>>;
  abstract listarDependencias(
    idProyecto: string,
  ): Promise<Record<string, unknown>[]>;
  abstract obtenerDependencia(
    idDependencia: string,
  ): Promise<Record<string, unknown> | null>;
  abstract crearDependenciaManual(
    data: Record<string, unknown>,
  ): Promise<Record<string, unknown>>;
  abstract eliminarDependencia(idDependencia: string): Promise<void>;
  abstract listarTiming(
    idProyecto: string,
    filtros: FiltrosCronograma,
  ): Promise<Record<string, unknown>[]>;
  abstract obtenerTiming(
    idTiming: string,
  ): Promise<Record<string, unknown> | null>;
  abstract crearTimingManual(
    data: Record<string, unknown>,
  ): Promise<Record<string, unknown>>;
  abstract actualizarTiming(
    idTiming: string,
    data: Record<string, unknown>,
  ): Promise<Record<string, unknown>>;
}
