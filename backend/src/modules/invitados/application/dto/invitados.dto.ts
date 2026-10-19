import { PartialType } from '@nestjs/mapped-types';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsEmail, IsEnum, IsInt, IsOptional, IsString, IsUUID, MaxLength, Min, ValidateNested } from 'class-validator';

export enum LadoRelacionDto { NOVIA='NOVIA', NOVIO='NOVIO', AMBOS='AMBOS', OTRO='OTRO' }
export enum EstadoRsvpDto { PENDIENTE='PENDIENTE', CONFIRMADO='CONFIRMADO', NO_ASISTE='NO_ASISTE' }
const bool = ({ value }: { value: unknown }) => value === 'true' ? true : value === 'false' ? false : value;

export class PersonaInvitadoDto {
  @IsOptional() @IsString() @MaxLength(8) dni?: string;
  @IsString() @MaxLength(100) nombres!: string;
  @IsString() @MaxLength(100) apellidoPaterno!: string;
  @IsOptional() @IsString() @MaxLength(100) apellidoMaterno?: string;
  @IsOptional() @IsString() @MaxLength(15) telefono?: string;
  @IsOptional() @IsEmail() @MaxLength(150) correoElectronico?: string;
}
export class CrearInvitadoDto {
  @ValidateNested() @Type(() => PersonaInvitadoDto) persona!: PersonaInvitadoDto;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) idCategoriaRelacion?: number;
  @IsOptional() @IsEnum(LadoRelacionDto) ladoRelacion?: LadoRelacionDto;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) cantidadPases?: number;
  @IsOptional() @IsString() @MaxLength(1000) observaciones?: string;
}
export class ActualizarInvitadoDto extends PartialType(CrearInvitadoDto) {}
export class ListarInvitadosDto {
  @IsOptional() @IsString() buscar?: string;
  @IsOptional() @Type(() => Number) @IsInt() idCategoriaRelacion?: number;
  @IsOptional() @IsEnum(LadoRelacionDto) ladoRelacion?: LadoRelacionDto;
  @IsOptional() @IsEnum(EstadoRsvpDto) estadoRsvp?: EstadoRsvpDto;
  @IsOptional() @IsUUID() idMesa?: string;
  @IsOptional() @Transform(bool) @IsBoolean() conRequerimiento?: boolean;
  @IsOptional() @Transform(bool) @IsBoolean() esTitular?: boolean;
  @IsOptional() @Transform(bool) @IsBoolean() activo?: boolean;
  @IsOptional() @IsString() orden?: string;
}
export class ActualizarRsvpDto {
  @IsOptional() @IsEnum(EstadoRsvpDto) estadoRsvp?: EstadoRsvpDto;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) cantidadAsistentesConfirmados?: number;
  @IsOptional() @IsString() @MaxLength(1000) observacion?: string;
}
export class RequerimientoDto { @Type(() => Number) @IsInt() @Min(1) idRequerimientoAlimentario!: number; @IsOptional() @IsString() @MaxLength(500) detalle?: string; }
export class CrearMesaDto { @IsString() @MaxLength(100) nombre!: string; @Type(() => Number) @IsInt() @Min(1) capacidad!: number; @IsOptional() @Type(() => Number) @IsInt() numero?: number; @IsOptional() @IsString() @MaxLength(250) ubicacion?: string; @IsOptional() @IsString() @MaxLength(1000) observaciones?: string; }
export class ActualizarMesaDto extends PartialType(CrearMesaDto) {}
