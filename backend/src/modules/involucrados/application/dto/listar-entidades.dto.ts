import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { TipoEntidad } from '../../domain/enums/tipo-entidad.enum';

const booleano = ({ value }: { value: unknown }) =>
  value === true || value === 'true'
    ? true
    : value === false || value === 'false'
      ? false
      : value;

export class ListarEntidadesDto {
  @ApiPropertyOptional({ default: 1, minimum: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  pagina = 1;
  @ApiPropertyOptional({ default: 20, minimum: 1, maximum: 100 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  limite = 20;
  @ApiPropertyOptional({
    enum: [
      'idEntidad',
      'ruc',
      'razonSocial',
      'nombreComercial',
      'tipoEntidad',
      'correoElectronico',
      'codigoUbigeo',
      'esActivo',
      'fechaCreacion',
    ],
  })
  @IsOptional()
  @IsIn([
    'idEntidad',
    'ruc',
    'razonSocial',
    'nombreComercial',
    'tipoEntidad',
    'correoElectronico',
    'codigoUbigeo',
    'esActivo',
    'fechaCreacion',
  ])
  ordenarPor = 'idEntidad';
  @ApiPropertyOptional({ enum: ['asc', 'desc'], default: 'asc' })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  orden: 'asc' | 'desc' = 'asc';
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  buscar?: string;
  @ApiPropertyOptional({ default: false })
  @Transform(booleano)
  @IsBoolean()
  @IsOptional()
  mostrarTodos = false;
  @ApiPropertyOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  idEntidad?: number;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Matches(/^\d{11}$/)
  ruc?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() razonSocial?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() nombreComercial?: string;
  @ApiPropertyOptional({ enum: TipoEntidad })
  @IsOptional()
  @IsEnum(TipoEntidad)
  tipoEntidad?: TipoEntidad;
  @ApiPropertyOptional() @IsOptional() @IsEmail() correoElectronico?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(6, 6)
  codigoUbigeo?: string;
  @ApiPropertyOptional()
  @Transform(booleano)
  @IsBoolean()
  @IsOptional()
  esActivo?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsString() departamento?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() provincia?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() distrito?: string;
}
