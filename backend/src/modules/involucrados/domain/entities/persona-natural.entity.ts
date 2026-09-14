export interface PersonaNatural {
  idPersonaNatural: number;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string | null;
  telefono: string | null;
  correoElectronico: string;
  dni: string | null;
  direccion: string | null;
  codigoUbigeo: string | null;
  esActivo: boolean;
  fechaCreacion: unknown;
  fechaModificacion: unknown;
}
