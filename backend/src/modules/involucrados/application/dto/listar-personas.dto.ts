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
import { ApiPropertyOptional } from '@nestjs/swagger';

const booleano = ({ value }: { value: unknown }) =>
  value === true || value === 'true'
    ? true
    : value === false || value === 'false'
      ? false
      : value;

export class ListarPersonasDto {
  @ApiPropertyOptional({
    default: 1,
    minimum: 1,
    description: 'Página solicitada.',
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  pagina: number = 1;
  @ApiPropertyOptional({
    default: 20,
    minimum: 1,
    maximum: 100,
    description: 'Registros por página.',
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  limite: number = 20;
  @ApiPropertyOptional({
    enum: [
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
    ],
    default: 'idPersonaNatural',
    description: 'Campo por el que se ordena el resultado.',
  })
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
  ordenarPor: string = 'idPersonaNatural';
  @ApiPropertyOptional({
    enum: ['asc', 'desc'],
    default: 'asc',
    description: 'Dirección del orden.',
  })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  orden: 'asc' | 'desc' = 'asc';
  @ApiPropertyOptional({
    description:
      'Texto parcial, sin distinción de mayúsculas, buscado en nombres, apellidos, correo, DNI y teléfono.',
  })
  @IsOptional()
  @IsString()
  buscar?: string;
  @ApiPropertyOptional({
    default: false,
    description: 'Si es true, omite pagina y limite.',
  })
  @Transform(booleano)
  @IsBoolean()
  @IsOptional()
  mostrarTodos: boolean = false;
  @ApiPropertyOptional({
    minimum: 1,
    description: 'ID interno exacto de la persona.',
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  id?: number;
  @ApiPropertyOptional({ description: 'Filtro parcial por nombres.' })
  @IsOptional()
  @IsString()
  nombres?: string;
  @ApiPropertyOptional({ description: 'Filtro parcial por apellido paterno.' })
  @IsOptional()
  @IsString()
  apellidoPaterno?: string;
  @ApiPropertyOptional({ description: 'Filtro parcial por apellido materno.' })
  @IsOptional()
  @IsString()
  apellidoMaterno?: string;
  @ApiPropertyOptional({
    format: 'email',
    description: 'Filtro por correo electrónico.',
  })
  @IsOptional()
  @IsEmail()
  correoElectronico?: string;
  @ApiPropertyOptional({
    minLength: 8,
    maxLength: 8,
    description: 'DNI exacto.',
  })
  @IsOptional()
  @IsString()
  @Length(8, 8)
  dni?: string;
  @ApiPropertyOptional({ description: 'Filtro parcial por teléfono.' })
  @IsOptional()
  @IsString()
  telefono?: string;
  @ApiPropertyOptional({
    minLength: 6,
    maxLength: 6,
    description: 'Código de ubigeo exacto.',
  })
  @IsOptional()
  @IsString()
  @Length(6, 6)
  codigoUbigeo?: string;
  @ApiPropertyOptional({
    description:
      'Estado lógico; por defecto solo se devuelven registros activos.',
  })
  @Transform(booleano)
  @IsBoolean()
  @IsOptional()
  esActivo?: boolean;
  @ApiPropertyOptional({
    description: 'Filtro parcial por departamento asociado al ubigeo.',
  })
  @IsOptional()
  @IsString()
  departamento?: string;
  @ApiPropertyOptional({
    description: 'Filtro parcial por provincia asociada al ubigeo.',
  })
  @IsOptional()
  @IsString()
  provincia?: string;
  @ApiPropertyOptional({
    description: 'Filtro parcial por distrito asociado al ubigeo.',
  })
  @IsOptional()
  @IsString()
  distrito?: string;
}
