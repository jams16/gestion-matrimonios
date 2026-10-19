import { Temporal } from 'temporal-polyfill';

export interface Matrimonio {
  idMatrimonio: string;
  idProyecto: string;
  idNovio1: number | null;
  idNovio2: number | null;
  fechaMatrimonio: Temporal.Instant | null;
  cantidadInvitados: number | null;
  idTipoCeremonia: number | null;
  ciudadUbicacion: string | null;
  ideasMoonboard: string | null;
  estado: boolean | null;
  fechaCreacion: Temporal.Instant;
  fechaModificacion: Temporal.Instant | null;
}
