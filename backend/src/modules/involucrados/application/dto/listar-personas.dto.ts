import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

const booleano = ({ value }: { value: unknown }) =>
  value === true || value === 'true'
    ? true
    : value === false || value === 'false'
      ? false
      : value;

export class ListarPersonasDto {
  @Type(() => Number) @IsInt() @Min(1) @IsOptional() pagina = 1;
  @Type(() => Number) @IsInt() @Min(1) @Max(100) @IsOptional() limite = 20;
  @IsOptional()
  @IsIn([
    'idPersonaNatural',
    'nombres',
    'apellidoPaterno',
    'apellidoMaterno',
    'correoElectronico',
    'dni',
    'telefono',
    'codigoUbigeo',
    'esActivo',
    'fechaCreacion',
  ])
  ordenarPor = 'idPersonaNatural';
  @IsOptional() @IsIn(['asc', 'desc']) orden: 'asc' | 'desc' = 'asc';
  @IsOptional() @IsString() buscar?: string;
  @Transform(booleano) @IsBoolean() @IsOptional() mostrarTodos = false;
  @Type(() => Number) @IsInt() @Min(1) @IsOptional() id?: number;
  @IsOptional() @IsString() nombres?: string;
  @IsOptional() @IsString() apellidoPaterno?: string;
  @IsOptional() @IsString() apellidoMaterno?: string;
  @IsOptional() @IsEmail() correoElectronico?: string;
  @IsOptional() @IsString() @Length(8, 8) dni?: string;
  @IsOptional() @IsString() telefono?: string;
  @IsOptional() @IsString() @Length(6, 6) codigoUbigeo?: string;
  @Transform(booleano) @IsBoolean() @IsOptional() esActivo?: boolean;
  @IsOptional() @IsString() departamento?: string;
  @IsOptional() @IsString() provincia?: string;
  @IsOptional() @IsString() distrito?: string;
}
