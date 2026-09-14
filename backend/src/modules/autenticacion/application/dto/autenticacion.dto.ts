import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { TipoUsuario } from '../../domain/enums/tipo-usuario.enum';

const trim = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;
const vacioComoIndefinido = ({ value }: { value: unknown }) => {
  const texto = typeof value === 'string' ? value.trim() : value;
  return texto === '' ? undefined : texto;
};
const booleano = ({ value }: { value: unknown }) =>
  value === true || value === 'true'
    ? true
    : value === false || value === 'false'
      ? false
      : value;

export class RegisterDto {
  @ApiProperty({ example: 1000 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  idPersonaNatural: number;

  @ApiPropertyOptional({ example: 1000, nullable: true })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  idEntidad?: number | null;

  @ApiProperty({ example: 'maria.perez', maxLength: 150 })
  @Transform(trim)
  @IsString()
  @MinLength(3)
  @MaxLength(150)
  usuario: string;

  @ApiProperty({ enum: TipoUsuario, example: TipoUsuario.OTROS })
  @IsEnum(TipoUsuario)
  tipoUsuario: TipoUsuario;

  @ApiProperty({
    minLength: 8,
    format: 'password',
    description:
      'Mínimo 8 caracteres, con mayúscula, minúscula, número y símbolo.',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  contrasena: string;
}

export class SolicitarRegistroDto {
  @ApiProperty()
  @Transform(trim)
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  nombres: string;
  @ApiProperty()
  @Transform(trim)
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  apellidoPaterno: string;
  @ApiPropertyOptional()
  @Transform(trim)
  @IsString()
  @MaxLength(100)
  @IsOptional()
  apellidoMaterno?: string;
  @ApiProperty({ format: 'email' })
  @Transform(trim)
  @IsString()
  @IsEmail()
  @MaxLength(150)
  correoElectronico: string;
}

export class FinalizarRegistroDto {
  @ApiProperty({ example: '482913', description: 'Código de seis dígitos recibido por correo.' })
  @IsString() @Matches(/^\d{6}$/) token: string;
  @IsString() @MinLength(3) @MaxLength(150) usuario: string;
  @IsString() @MinLength(8) @MaxLength(128) contrasena: string;
  @IsString() @MinLength(1) @MaxLength(200) nombreComercial: string;
  @Transform(vacioComoIndefinido)
  @IsString() @Matches(/^\d{11}$/) @IsOptional() ruc?: string;
  @Transform(vacioComoIndefinido)
  @IsString() @MaxLength(15) @IsOptional() telefono?: string;
  @Transform(vacioComoIndefinido)
  @IsString() @IsEmail() @MaxLength(150) @IsOptional() correoCorporativo?: string;
}

export class ConfirmarRegistroPendienteDto {
  @ApiProperty({ example: '482913', description: 'Código de seis dígitos recibido por correo.' })
  @IsString()
  @Matches(/^\d{6}$/)
  token: string;
}

export class LoginDto {
  @ApiProperty({
    example: 'maria.perez',
    description: 'Usuario o correo de la persona asociada.',
  })
  @Transform(trim)
  @IsString()
  @MinLength(3)
  @MaxLength(150)
  usuarioOCorreo: string;

  @ApiProperty({ format: 'password' })
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  contrasena: string;
}

export class RefreshTokenDto {
  @ApiProperty({
    format: 'password',
    description: 'Refresh token entregado al iniciar sesión.',
  })
  @IsString()
  @MinLength(20)
  refreshToken: string;
}

export class TokenCuentaDto {
  @ApiProperty({ description: 'Token recibido desde el enlace del correo.' })
  @IsString()
  @MinLength(20)
  token: string;
}

export class SolicitarTokenDto {
  @ApiProperty({
    example: 'maria.perez',
    description: 'Usuario o correo asociado. La respuesta no revela si existe.',
  })
  @Transform(trim)
  @IsString()
  @MinLength(3)
  @MaxLength(150)
  usuarioOCorreo: string;
}

export class ResetPasswordDto extends TokenCuentaDto {
  @ApiProperty({ format: 'password', minLength: 8 })
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  nuevaContrasena: string;
}

export class QueryUsuarioDto {
  @ApiPropertyOptional({ default: 1, minimum: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  pagina: number = 1;
  @ApiPropertyOptional({ default: 20, minimum: 1, maximum: 100 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  limite: number = 20;
  @ApiPropertyOptional({
    enum: [
      'idUsuario',
      'usuario',
      'tipoUsuario',
      'correoVerificado',
      'esActivo',
      'fechaCreacion',
    ],
    default: 'idUsuario',
  })
  @IsString()
  @IsOptional()
  ordenarPor: string = 'idUsuario';
  @ApiPropertyOptional({ enum: ['asc', 'desc'], default: 'asc' })
  @IsOptional()
  @IsEnum(['asc', 'desc'] as const)
  orden: 'asc' | 'desc' = 'asc';
  @ApiPropertyOptional({
    description:
      'Búsqueda parcial por usuario, nombres, apellidos o correo asociado.',
  })
  @Transform(trim)
  @IsString()
  @IsOptional()
  buscar?: string;
  @ApiPropertyOptional({
    default: false,
    description: 'Si es true, omite pagina y limite.',
  })
  @Transform(booleano)
  @IsBoolean()
  @IsOptional()
  mostrarTodos: boolean = false;
  @ApiPropertyOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  idUsuario?: number;
  @ApiPropertyOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  idPersonaNatural?: number;
  @ApiPropertyOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  idEntidad?: number;
  @ApiPropertyOptional({ enum: TipoUsuario })
  @IsEnum(TipoUsuario)
  @IsOptional()
  tipoUsuario?: TipoUsuario;
  @ApiPropertyOptional()
  @Transform(booleano)
  @IsBoolean()
  @IsOptional()
  correoVerificado?: boolean;
  @ApiPropertyOptional()
  @Transform(booleano)
  @IsBoolean()
  @IsOptional()
  esActivo?: boolean;
}

export class UpdateUsuarioDto {
  @ApiPropertyOptional({ enum: TipoUsuario })
  @IsEnum(TipoUsuario)
  @IsOptional()
  tipoUsuario?: TipoUsuario;
  @ApiPropertyOptional({ maxLength: 150 })
  @Transform(trim)
  @IsString()
  @MinLength(3)
  @MaxLength(150)
  @IsOptional()
  usuario?: string;
  @ApiPropertyOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  idEntidad?: number | null;
}
