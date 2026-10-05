import { Temporal } from 'temporal-polyfill';

import { EstadoProyecto } from '../enums/estado-proyecto.enum';

export interface Proyecto {
  idProyecto: string;
  nombre: string | null;
  idPm: number | null;
  fechaInicio: Temporal.Instant | null;
  fechaFin: Temporal.Instant | null;
  presupuesto: unknown;
  objetivos: string | null;
  necesidades: string | null;
  supuestos: string | null;
  restricciones: string | null;
  alcance: string | null;
  estado: EstadoProyecto | null;
  fechaCreacion: Temporal.Instant;
  fechaModificacion: Temporal.Instant | null;
}
