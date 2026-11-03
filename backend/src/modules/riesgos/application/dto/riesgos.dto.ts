import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Max, MaxLength, Min } from 'class-validator';

export enum SeveridadRiesgoDto { BAJO = 'BAJO', MEDIO = 'MEDIO', ALTO = 'ALTO' }
export enum EstadoRiesgoDto { IDENTIFICADO = 'IDENTIFICADO', EN_TRATAMIENTO = 'EN_TRATAMIENTO', ACTIVO = 'ACTIVO', CERRADO = 'CERRADO' }
export enum AlternativaPlanDto { PLAN_A = 'PLAN_A', PLAN_B = 'PLAN_B', PLAN_C = 'PLAN_C' }
export enum EstadoMitigacionDto { SUGERIDA = 'SUGERIDA', APLICADA = 'APLICADA', DESCARTADA = 'DESCARTADA' }

export class CrearCategoriaRiesgoDto { @IsString() @IsNotEmpty() @MaxLength(50) codigo!: string; @IsString() @IsNotEmpty() @MaxLength(100) nombre!: string; @IsOptional() @IsString() @MaxLength(500) descripcion?: string; }
export class CrearRiesgoDto { @Type(() => Number) @IsInt() @Min(1) idCategoriaRiesgo!: number; @IsString() @IsNotEmpty() @MaxLength(200) nombre!: string; @IsOptional() @IsString() @MaxLength(1000) descripcion?: string; @IsOptional() @IsString() @MaxLength(1000) causaProbable?: string; @IsOptional() @IsString() @MaxLength(1000) efectoPotencial?: string; @Type(() => Number) @IsInt() @Min(1) @Max(5) probabilidad!: number; @Type(() => Number) @IsInt() @Min(1) @Max(5) impacto!: number; @IsOptional() @IsUUID() idMatrimonio?: string; @IsOptional() @Type(() => Number) @IsInt() @Min(1) idUsuarioResponsable?: number; @IsOptional() @Type(() => Number) @IsNumber() @Min(0) costoAsociado?: number; }
export class ActualizarRiesgoDto extends PartialType(CrearRiesgoDto) { @IsOptional() @IsEnum(EstadoRiesgoDto) estado?: EstadoRiesgoDto; }
export class CrearPlanContingenciaDto { @IsEnum(AlternativaPlanDto) alternativa!: AlternativaPlanDto; @IsString() @IsNotEmpty() @MaxLength(1000) accion!: string; @IsOptional() @Type(() => Number) @IsInt() @Min(1) idUsuarioResponsable?: number; }
export class CrearIncidenciaDto { @IsString() @IsNotEmpty() @MaxLength(1000) descripcion!: string; @IsOptional() @IsBoolean() critica?: boolean; }
export class CrearCostoRiesgoDto { @IsString() @IsNotEmpty() @MaxLength(200) concepto!: string; @Type(() => Number) @IsNumber() @Min(0.01) monto!: number; @IsOptional() @IsUUID() idIncidencia?: string; }
export class CrearDocumentoCostoRiesgoDto { @IsString() @IsNotEmpty() @MaxLength(200) nombre!: string; @IsString() @IsNotEmpty() @MaxLength(500) url!: string; @IsEnum(['PDF','JPG','PNG'] as const) tipo!: 'PDF'|'JPG'|'PNG'; }
export class ActualizarMitigacionDto { @IsEnum(EstadoMitigacionDto) estado!: EstadoMitigacionDto; }
