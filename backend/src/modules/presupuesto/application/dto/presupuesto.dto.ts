import { PartialType } from '@nestjs/mapped-types';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

export enum EstadoCostoDto {
  PLANIFICADO = 'PLANIFICADO',
  CONTRATADO = 'CONTRATADO',
  PAGADO = 'PAGADO',
  CANCELADO = 'CANCELADO',
}
export enum TipoPagoDto {
  PAGO_INICIAL = 'PAGO_INICIAL',
  CUOTA = 'CUOTA',
  PAGO_FINAL = 'PAGO_FINAL',
}
export enum FormatoReporteDto {
  CSV = 'CSV',
  PDF = 'PDF',
}
const bool = ({ value }: { value: unknown }) =>
  value === 'true' ? true : value === 'false' ? false : value;

export class CrearPresupuestoDto {
  @Type(() => Number) @IsNumber() @Min(0) montoTotal!: number;
  @IsOptional() @IsString() @MaxLength(10) moneda?: string;
}
export class ActualizarPresupuestoDto extends PartialType(
  CrearPresupuestoDto,
) {}

export class CrearCategoriaPresupuestoDto {
  @IsString() @IsNotEmpty() @MaxLength(50) codigo!: string;
  @IsString() @IsNotEmpty() @MaxLength(100) nombre!: string;
  @Type(() => Number) @IsNumber() @Min(0) montoAsignado!: number;
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  idCategoriaServicio?: number;
}
export class ActualizarCategoriaPresupuestoDto extends PartialType(
  CrearCategoriaPresupuestoDto,
) {}

export class CrearCostoProveedorDto {
  @Type(() => Number) @IsInt() @Min(1) idCategoriaPresupuesto!: number;
  @IsString() @IsNotEmpty() @MaxLength(200) concepto!: string;
  @Type(() => Number) @IsNumber() @Min(0) montoEstimado!: number;
  @Type(() => Number) @IsNumber() @Min(0) montoReal!: number;
  @IsOptional() @IsUUID() idMatrimonioProveedor?: string;
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  idProveedorServicio?: number;
  @IsOptional() @IsEnum(EstadoCostoDto) estado?: EstadoCostoDto;
}
export class ActualizarCostoProveedorDto extends PartialType(
  CrearCostoProveedorDto,
) {}

export class CrearPagoDto {
  @Type(() => Number) @IsNumber() @Min(Number.EPSILON) monto!: number;
  @IsDateString() fechaPago!: string;
  @IsString() @IsNotEmpty() @MaxLength(200) concepto!: string;
  @IsOptional() @IsEnum(TipoPagoDto) tipo?: TipoPagoDto;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) numeroCuota?: number;
  @IsOptional() @IsString() @MaxLength(1000) observacion?: string;
}
export class ActualizarPagoDto extends PartialType(CrearPagoDto) {}

export class CrearCompromisoPagoDto {
  @Type(() => Number) @IsNumber() @Min(Number.EPSILON) montoProgramado!: number;
  @IsDateString() fechaVencimiento!: string;
  @IsString() @IsNotEmpty() @MaxLength(200) concepto!: string;
}
export class ActualizarCompromisoPagoDto extends PartialType(
  CrearCompromisoPagoDto,
) {}

export class CrearDocumentoPagoDto {
  @IsString() @IsNotEmpty() @MaxLength(200) nombre!: string;
  @IsString() @IsNotEmpty() @MaxLength(500) url!: string;
  @IsOptional() @IsString() @MaxLength(100) tipo?: string;
}
export class CrearSeguimientoPagoDto {
  @IsString() @IsNotEmpty() @MaxLength(50) tipo!: string;
  @IsOptional() @IsString() @MaxLength(1000) detalle?: string;
}

export class ListarCostosDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  idCategoriaPresupuesto?: number;
  @IsOptional() @IsEnum(EstadoCostoDto) estado?: EstadoCostoDto;
  @IsOptional() @Transform(bool) @IsBoolean() activo?: boolean;
}
export class ListarReporteDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  idCategoriaPresupuesto?: number;
  @IsOptional() @IsDateString() fechaDesde?: string;
  @IsOptional() @IsDateString() fechaHasta?: string;
}
