import { Temporal } from 'temporal-polyfill';

export interface MatrimonioResumen {
  idMatrimonio: string;
  idProyecto: string;
  nombreProyecto: string | null;
  fechaMatrimonio: Temporal.Instant | null;
  ciudadUbicacion: string | null;
  estado: boolean;
  idFaseProyecto: number | null;
  faseProyecto: {
    codigo: string;
    nombre: string;
  } | null;
}
