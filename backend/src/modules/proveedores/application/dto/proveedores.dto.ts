import { PartialType } from '@nestjs/mapped-types';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export enum TipoProveedorDto {
  PERSONA_NATURAL = 'PERSONA_NATURAL',
  EMPRESA = 'EMPRESA',
}
export enum MonedaDto {
  PEN = 'PEN',
  USD = 'USD',
}
export enum EstadoSeleccionDto {
  CONSIDERADO = 'CONSIDERADO',
  SELECCIONADO = 'SELECCIONADO',
  DESCARTADO = 'DESCARTADO',
}
export enum PrioridadProveedorDto {
  ALTA = 'ALTA',
  MEDIA = 'MEDIA',
  BAJA = 'BAJA',
}
export enum EstadoReservaProveedorDto {
  SOLICITADA = 'SOLICITADA',
  CONFIRMADA = 'CONFIRMADA',
  CANCELADA = 'CANCELADA',
}
export enum TipoSeguimientoProveedorDto {
  CHECKLIST = 'CHECKLIST',
  INCIDENCIA = 'INCIDENCIA',
}
export enum TipoInteraccionProveedorDto {
  CONSULTA = 'CONSULTA',
  RESPUESTA = 'RESPUESTA',
}
const bool = ({ value }: { value: unknown }) =>
  value === 'true' ? true : value === 'false' ? false : value;

export class CrearProveedorDto {
  @IsEnum(TipoProveedorDto) tipoProveedor!: TipoProveedorDto;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) idPersonaNatural?: number;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) idEntidad?: number;
  @IsString() @MaxLength(200) nombreComercial!: string;
  @IsOptional() @IsString() @MaxLength(1000) descripcion?: string;
  @IsOptional() @IsString() @MaxLength(15) telefonoContacto?: string;
  @IsOptional() @IsString() @MaxLength(15) whatsapp?: string;
  @IsOptional() @IsString() @MaxLength(150) correoContacto?: string;
  @IsOptional() @IsString() @MaxLength(250) sitioWeb?: string;
  @IsOptional() @IsString() @MaxLength(150) instagram?: string;
  @IsOptional() @IsString() @MaxLength(250) direccion?: string;
  @IsOptional() @IsString() @MaxLength(1000) observaciones?: string;
}
export class ActualizarProveedorDto extends PartialType(CrearProveedorDto) {}
export class ListarProveedoresDto {
  @IsOptional() @IsString() buscar?: string;
  @IsOptional() @Type(() => Number) @IsInt() idCategoriaServicio?: number;
  @IsOptional() @IsString() servicio?: string;
  @IsOptional() @Transform(bool) @IsBoolean() activo?: boolean;
  @IsOptional() @IsDateString() disponibleEnFecha?: string;
  @IsOptional() @Type(() => Number) @IsNumber() @Min(0) costoMinimo?: number;
  @IsOptional() @Type(() => Number) @IsNumber() @Min(0) costoMaximo?: number;
  @IsOptional() @IsString() ubicacion?: string;
}
export class CrearServicioProveedorDto {
  @Type(() => Number) @IsInt() @Min(1) idCategoriaServicio!: number;
  @IsString() @MaxLength(200) nombre!: string;
  @IsOptional() @IsString() @MaxLength(1000) descripcion?: string;
  @Type(() => Number) @IsNumber() @Min(0) costoReferencial!: number;
  @IsOptional() @IsEnum(MonedaDto) moneda?: MonedaDto;
  @IsOptional() @IsString() @MaxLength(50) unidadPrecio?: string;
}
export class ActualizarServicioProveedorDto extends PartialType(
  CrearServicioProveedorDto,
) {}
export class CrearDisponibilidadProveedorDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  idProveedorServicio?: number;
  @IsDateString() fecha!: string;
  @Transform(bool) @IsBoolean() disponible!: boolean;
  @IsOptional() @IsString() horaInicio?: string;
  @IsOptional() @IsString() horaFin?: string;
  @IsOptional() @IsString() @MaxLength(1000) observacion?: string;
}
export class ActualizarDisponibilidadProveedorDto extends PartialType(
  CrearDisponibilidadProveedorDto,
) {}
export class ListarDisponibilidadesDto {
  @IsOptional() @IsDateString() fechaDesde?: string;
  @IsOptional() @IsDateString() fechaHasta?: string;
  @IsOptional() @Type(() => Number) @IsInt() idProveedorServicio?: number;
  @IsOptional() @Transform(bool) @IsBoolean() disponible?: boolean;
}
export class AsociarProveedorMatrimonioDto {
  @IsOptional() @Transform(bool) @IsBoolean() favorito?: boolean;
  @IsOptional()
  @IsEnum(EstadoSeleccionDto)
  estadoSeleccion?: EstadoSeleccionDto;
  @IsOptional()
  @IsEnum(PrioridadProveedorDto)
  prioridad?: PrioridadProveedorDto;
  @IsOptional() @IsString() @MaxLength(1000) observaciones?: string;
}
export class ActualizarMatrimonioProveedorDto extends PartialType(
  AsociarProveedorMatrimonioDto,
) {}
export class ListarMatrimonioProveedorDto {
  @IsOptional() @Transform(bool) @IsBoolean() favorito?: boolean;
  @IsOptional()
  @IsEnum(PrioridadProveedorDto)
  prioridad?: PrioridadProveedorDto;
  @IsOptional()
  @IsEnum(EstadoSeleccionDto)
  estadoSeleccion?: EstadoSeleccionDto;
  @IsOptional() @Type(() => Number) @IsInt() idCategoriaServicio?: number;
  @IsOptional() @Transform(bool) @IsBoolean() activo?: boolean;
}
export class CrearSeguimientoProveedorDto {
  @IsEnum(TipoSeguimientoProveedorDto) tipo!: TipoSeguimientoProveedorDto;
  @IsString() @MaxLength(200) titulo!: string;
  @IsOptional() @IsString() @MaxLength(1000) descripcion?: string;
}
export class ActualizarSeguimientoProveedorDto extends PartialType(
  CrearSeguimientoProveedorDto,
) {
  @IsOptional() @Transform(bool) @IsBoolean() completado?: boolean;
}
export class CrearReservaProveedorDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  idProveedorServicio?: number;
  @IsDateString() fecha!: string;
  @IsOptional() @IsString() @MaxLength(1000) observacion?: string;
}
export class ActualizarReservaProveedorDto extends PartialType(
  CrearReservaProveedorDto,
) {
  @IsOptional()
  @IsEnum(EstadoReservaProveedorDto)
  estado?: EstadoReservaProveedorDto;
}
export class GuardarEvaluacionProveedorDto {
  @Type(() => Number) @IsInt() @Min(1) @Max(5) calificacion!: number;
  @IsOptional() @IsString() @MaxLength(1000) resena?: string;
}
export class CrearEnlaceExternoProveedorDto {
  @IsOptional() @IsDateString() fechaExpiracion?: string;
}
export class CrearDocumentoProveedorDto {
  @IsString() @MaxLength(200) nombre!: string;
  @IsString() @MaxLength(500) url!: string;
  @IsOptional() @IsString() @MaxLength(100) tipo?: string;
}
export class CrearInteraccionProveedorDto {
  @IsEnum(TipoInteraccionProveedorDto) tipo!: TipoInteraccionProveedorDto;
  @IsDateString() fechaEnvio!: string;
  @IsOptional() @IsDateString() fechaRespuesta?: string;
  @IsOptional() @IsString() @MaxLength(1000) observacion?: string;
}
export class ActualizarInteraccionProveedorDto extends PartialType(
  CrearInteraccionProveedorDto,
) {}
