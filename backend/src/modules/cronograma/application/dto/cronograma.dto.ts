import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';
import {
  booleano,
  emptyToNull,
} from '../../../proyectos/application/dto/dto-utils';

export enum EstadoHitoDto {
  PENDIENTE = 'PENDIENTE',
  EN_PROGRESO = 'EN_PROGRESO',
  COMPLETADO = 'COMPLETADO',
  NO_APLICA = 'NO_APLICA',
}
export enum EstadoActividadDto {
  PENDIENTE = 'PENDIENTE',
  EN_PROCESO = 'EN_PROCESO',
  COMPLETADA = 'COMPLETADA',
  CANCELADA = 'CANCELADA',
  NO_APLICA = 'NO_APLICA',
}
export enum PrioridadActividadDto {
  BAJA = 'BAJA',
  MEDIA = 'MEDIA',
  ALTA = 'ALTA',
  CRITICA = 'CRITICA',
}

class FiltroBaseDto {
  @ApiPropertyOptional({ enum: EstadoActividadDto })
  @IsOptional()
  @IsString()
  estado?: string;
  @ApiPropertyOptional()
  @Transform(booleano)
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
export class ListarHitosDto extends FiltroBaseDto {
  @ApiPropertyOptional()
  @Transform(booleano)
  @IsOptional()
  @IsBoolean()
  incluirActividades?: boolean;
}
export class ListarActividadesDto extends FiltroBaseDto {
  @ApiPropertyOptional({ format: 'uuid' })
  @IsOptional()
  @IsUUID()
  idHito?: string;
  @ApiPropertyOptional()
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  idUsuarioResponsable?: number;
}
export class ListarTimingDto extends FiltroBaseDto {
  @ApiPropertyOptional()
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  idUsuarioResponsable?: number;
}
export class ListarCronogramaDto {
  @ApiPropertyOptional({ default: true })
  @Transform(booleano)
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}

export class CrearHitoDto {
  @ApiProperty({ maxLength: 200 })
  @Transform(emptyToNull)
  @IsString()
  @MaxLength(200)
  nombre!: string;
  @ApiProperty({ example: '2027-01-10T00:00:00.000Z' })
  @IsDateString()
  fechaObjetivo!: string;
  @ApiPropertyOptional({ maxLength: 1000 })
  @Transform(emptyToNull)
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  criterioAceptacion?: string | null;
  @ApiPropertyOptional({ enum: EstadoHitoDto })
  @IsOptional()
  @IsEnum(EstadoHitoDto)
  estado?: EstadoHitoDto;
  @ApiPropertyOptional({ minimum: 0 })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(0)
  orden?: number;
}
export class ActualizarHitoDto extends PartialType(CrearHitoDto) {}
export class CambiarEstadoHitoDto {
  @ApiProperty({ enum: EstadoHitoDto })
  @IsEnum(EstadoHitoDto)
  estado!: EstadoHitoDto;
}

export class CrearActividadDto {
  @ApiProperty({ maxLength: 200 })
  @Transform(emptyToNull)
  @IsString()
  @MaxLength(200)
  nombre!: string;
  @ApiProperty({ example: '2027-01-10T00:00:00.000Z' })
  @IsDateString()
  fechaFin!: string;
  @ApiPropertyOptional({ format: 'uuid' }) @IsOptional() @IsUUID() idHito?:
    string | null;
  @ApiPropertyOptional({ maxLength: 1000 })
  @Transform(emptyToNull)
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  descripcion?: string | null;
  @ApiPropertyOptional({ type: 'object', additionalProperties: true })
  @IsOptional()
  @IsObject()
  listaVerificacion?: Record<string, unknown> | null;
  @ApiPropertyOptional({ maxLength: 500 })
  @Transform(emptyToNull)
  @IsOptional()
  @IsString()
  @MaxLength(500)
  entregable?: string | null;
  @ApiPropertyOptional() @IsOptional() @IsDateString() fechaInicio?:
    string | null;
  @ApiPropertyOptional({ enum: PrioridadActividadDto })
  @IsOptional()
  @IsEnum(PrioridadActividadDto)
  prioridad?: PrioridadActividadDto | null;
  @ApiPropertyOptional({ enum: EstadoActividadDto })
  @IsOptional()
  @IsEnum(EstadoActividadDto)
  estado?: EstadoActividadDto;
  @ApiPropertyOptional()
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  idUsuarioResponsable?: number | null;
  @ApiPropertyOptional({ maxLength: 150 })
  @Transform(emptyToNull)
  @IsOptional()
  @IsString()
  @MaxLength(150)
  responsableTexto?: string | null;
  @ApiPropertyOptional({ minimum: 0 })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(0)
  orden?: number;
}
export class ActualizarActividadDto extends PartialType(CrearActividadDto) {}
export class CambiarEstadoActividadDto {
  @ApiProperty({ enum: EstadoActividadDto })
  @IsEnum(EstadoActividadDto)
  estado!: EstadoActividadDto;
}

export class CrearDependenciaDto {
  @ApiProperty({ format: 'uuid' }) @IsUUID() idActividadPredecesora!: string;
  @ApiProperty({ format: 'uuid' }) @IsUUID() idActividadSucesora!: string;
  @ApiPropertyOptional({
    default: 'FINISH_TO_START',
    enum: ['FINISH_TO_START'],
  })
  @IsOptional()
  @IsEnum(['FINISH_TO_START'])
  tipoDependencia?: 'FINISH_TO_START';
  @ApiPropertyOptional({ default: 0 })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  diasDesfase?: number;
}

export class CrearTimingDto {
  @ApiProperty({ maxLength: 200 })
  @Transform(emptyToNull)
  @IsString()
  @MaxLength(200)
  actividad!: string;
  @ApiProperty() @IsDateString() fechaHoraInicio!: string;
  @ApiProperty() @IsDateString() fechaHoraFin!: string;
  @ApiProperty({ minimum: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  duracionMinutos!: number;
  @ApiPropertyOptional({ type: 'object', additionalProperties: true })
  @IsOptional()
  @IsObject()
  listaVerificacion?: Record<string, unknown> | null;
  @ApiPropertyOptional({ enum: EstadoActividadDto })
  @IsOptional()
  @IsEnum(EstadoActividadDto)
  estado?: EstadoActividadDto;
  @ApiPropertyOptional()
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  idUsuarioResponsable?: number | null;
  @ApiPropertyOptional({ maxLength: 150 })
  @Transform(emptyToNull)
  @IsOptional()
  @IsString()
  @MaxLength(150)
  responsableTexto?: string | null;
  @ApiPropertyOptional({ minimum: 0 })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(0)
  orden?: number;
}
export class ActualizarTimingDto extends PartialType(CrearTimingDto) {}
export class CambiarEstadoTimingDto {
  @ApiProperty({ enum: EstadoActividadDto })
  @IsEnum(EstadoActividadDto)
  estado!: EstadoActividadDto;
}

export class PrevisualizarReprogramacionActividadDto {
  @ApiPropertyOptional({ example: '2027-01-10T09:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  nuevaFechaInicio?: string;

  @ApiProperty({ example: '2027-01-12T18:00:00.000Z' })
  @IsDateString()
  nuevaFechaFin!: string;
}

export class ConfirmarReprogramacionActividadDto extends PrevisualizarReprogramacionActividadDto {
  @ApiProperty({
    description: 'Indica si se aplican también los desplazamientos sugeridos.',
  })
  @Transform(booleano)
  @IsBoolean()
  propagar!: boolean;
}
