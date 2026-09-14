import { TipoEntidad } from '../enums/tipo-entidad.enum';

export interface Entidad {
  idEntidad: number;
  ruc: string | null;
  razonSocial: string | null;
  nombreComercial: string;
  tipoEntidad: TipoEntidad;
  telefono: string | null;
  correoElectronico: string | null;
  redesSociales: string | null;
  direccion: string | null;
  codigoUbigeo: string | null;
  esActivo: boolean;
  fechaCreacion: unknown;
  fechaModificacion: unknown;
}
