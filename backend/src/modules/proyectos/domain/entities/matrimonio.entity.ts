import { Temporal } from 'temporal-polyfill';

import { TipoCeremonia } from '../enums/tipo-ceremonia.enum';

export interface Matrimonio {
  idMatrimonio: string;
  idProyecto: string;
  idNovio1: number | null;
  idNovio2: number | null;
  fechaMatrimonio: Temporal.Instant | null;
  cantidadInvitados: number | null;
  tipoCeremonia: TipoCeremonia | null;
  ciudadUbicacion: string | null;
  ideasMoonboard: string | null;
  estado: boolean | null;
  fechaCreacion: Temporal.Instant;
  fechaModificacion: Temporal.Instant | null;
}
