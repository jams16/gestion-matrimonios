import { QueryUsuarioDto } from '../../application/dto/autenticacion.dto';
import { Sesion, TokenCuenta, Usuario } from '../entities/usuario.entity';
import { TipoTokenCuenta } from '../enums/tipo-token-cuenta.enum';

export interface ResultadoPaginadoUsuario {
  items: Usuario[];
  paginacion: {
    pagina: number;
    limite: number;
    total: number;
    totalPaginas: number;
    tieneAnterior: boolean;
    tieneSiguiente: boolean;
  };
}

export abstract class AutenticacionRepository {
  abstract crearUsuario(
    data: Omit<
      Usuario,
      | 'idUsuario'
      | 'correoVerificado'
      | 'esActivo'
      | 'fechaCreacion'
      | 'fechaModificacion'
    >,
  ): Promise<Usuario>;
  abstract obtenerUsuario(id: number): Promise<Usuario | null>;
  abstract buscarUsuario(identificador: string): Promise<Usuario | null>;
  abstract usuarioExiste(usuario: string, excluirId?: number): Promise<boolean>;
  abstract actualizarUsuario(
    id: number,
    data: Partial<Usuario>,
  ): Promise<Usuario | null>;
  abstract listarUsuarios(
    query: QueryUsuarioDto,
  ): Promise<ResultadoPaginadoUsuario>;
  abstract personaExiste(id: number): Promise<{
    correoElectronico: string;
    nombres: string;
    apellidoPaterno: string;
  } | null>;
  abstract entidadExiste(id: number): Promise<boolean>;
  abstract crearSesion(
    data: Omit<Sesion, 'idSesion' | 'fechaCreacion' | 'fechaRevocacion'>,
  ): Promise<Sesion>;
  abstract obtenerSesion(id: number): Promise<Sesion | null>;
  abstract revocarSesion(id: number, fecha: Date): Promise<void>;
  abstract revocarSesionesUsuario(
    idUsuario: number,
    fecha: Date,
  ): Promise<void>;
  abstract crearTokenCuenta(
    data: Omit<TokenCuenta, 'idToken' | 'fechaCreacion' | 'fechaUtilizacion'>,
  ): Promise<TokenCuenta>;
  abstract buscarTokenCuenta(
    hash: string,
    tipo: TipoTokenCuenta,
  ): Promise<TokenCuenta | null>;
  abstract usarTokenCuenta(id: number, fecha: Date): Promise<void>;
}
