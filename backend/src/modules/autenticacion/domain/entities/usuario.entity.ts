import { TipoUsuario } from '../enums/tipo-usuario.enum';
import { Temporal } from 'temporal-polyfill';

export interface Usuario {
  idUsuario: number;
  idPersonaNatural: number;
  idEntidad: number | null;
  usuario: string;
  tipoUsuario: TipoUsuario;
  contrasenaHash: string;
  correoVerificado: boolean;
  esActivo: boolean;
  ultimoAcceso: Temporal.Instant;
  fechaCreacion: Temporal.Instant;
  fechaModificacion: Temporal.Instant;
}

export interface Sesion {
  idSesion: number;
  idUsuario: number;
  refreshTokenHash: string;
  fechaCreacion: Temporal.Instant;
  fechaExpiracion: Temporal.Instant;
  fechaRevocacion: Temporal.Instant | null;
}

export interface TokenCuenta {
  idToken: number;
  idUsuario: number;
  tipoToken: string;
  tokenHash: string;
  fechaCreacion: Temporal.Instant;
  fechaExpiracion: Temporal.Instant;
  fechaUtilizacion: Temporal.Instant | null;
}
