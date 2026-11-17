import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, Min, ValidateNested } from 'class-validator';

export class CrearElementoEdtDto {
  @IsString() @IsNotEmpty() @MaxLength(200) nombre!: string;
  @IsOptional() @IsString() @MaxLength(1000) descripcion?: string;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) idCategoriaServicio?: number;
}
export class ActualizarElementoEdtDto extends PartialType(CrearElementoEdtDto) { @IsOptional() @IsBoolean() activo?: boolean; }

export class CrearPlantillaEdtDto {
  @IsString() @IsNotEmpty() @MaxLength(200) nombre!: string;
  @IsOptional() @IsString() @MaxLength(1000) descripcion?: string;
}
export class ActualizarPlantillaEdtDto extends PartialType(CrearPlantillaEdtDto) { @IsOptional() @IsBoolean() activo?: boolean; }

export class AgregarElementoPlantillaEdtDto {
  @IsUUID() idElemento!: string;
  @IsOptional() @IsUUID() idPlantillaElementoPadre?: string;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) orden?: number;
}
export class ActualizarElementoPlantillaEdtDto {
  @IsOptional() @IsString() @IsNotEmpty() @MaxLength(200) nombre?: string;
  @IsOptional() @IsString() @MaxLength(1000) descripcion?: string;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) idCategoriaServicio?: number | null;
  @IsOptional() @IsUUID() idPlantillaElementoPadre?: string | null;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) orden?: number;
  @IsOptional() @IsBoolean() activo?: boolean;
}

class OrdenElementoPlantillaEdtDto {
  @IsUUID() idElementoPlantilla!: string;
  @Type(() => Number) @IsInt() @Min(0) orden!: number;
}

export class ReordenarElementosPlantillaEdtDto {
  @IsArray() @ValidateNested({ each: true }) @Type(() => OrdenElementoPlantillaEdtDto)
  ordenes!: OrdenElementoPlantillaEdtDto[];
}

export class CrearEdtMatrimonioDto {
  @IsUUID() idPlantilla!: string;
  @IsOptional() @IsString() @MaxLength(200) nombre?: string;
  @IsOptional() @IsArray() @IsUUID('4', { each: true })
  elementosSeleccionados?: string[];
}
export class CrearElementoEdtMatrimonioDto {
  @IsString() @IsNotEmpty() @MaxLength(200) nombre!: string;
  @IsOptional() @IsString() @MaxLength(1000) descripcion?: string;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) idCategoriaServicio?: number;
  @IsOptional() @IsUUID() idElementoOrigen?: string;
  @IsOptional() @IsUUID() idEdtMatrimonioElementoPadre?: string;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) orden?: number;
}
export class ActualizarElementoEdtMatrimonioDto extends PartialType(CrearElementoEdtMatrimonioDto) { @IsOptional() @IsBoolean() activo?: boolean; }
