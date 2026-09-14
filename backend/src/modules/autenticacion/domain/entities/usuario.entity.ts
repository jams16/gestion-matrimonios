import { TipoUsuario } from '../enums/tipo-usuario.enum';

export interface Usuario {
  idUsuario: number;
  idPersonaNatural: number;
  idEntidad: number | null;
  usuario: string;
  tipoUsuario: TipoUsuario;
  contrasenaHash: string;
  correoVerificado: boolean;
  esActivo: boolean;
  ultimoAcceso: Date;
  fechaCreacion: Date;
  fechaModificacion: Date;
}

export interface Sesion {
  idSesion: number;
  idUsuario: number;
  refreshTokenHash: string;
  fechaCreacion: Date;
  fechaExpiracion: Date;
  fechaRevocacion: Date | null;
}

export interface TokenCuenta {
  idToken: number;
  idUsuario: number;
  tipoToken: string;
  tokenHash: string;
  fechaCreacion: Date;
  fechaExpiracion: Date;
  fechaUtilizacion: Date | null;
}
