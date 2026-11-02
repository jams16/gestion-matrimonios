import { PartialType } from '@nestjs/mapped-types';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsDateString, IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

const booleano = ({ value }: { value: unknown }) => value === 'true' ? true : value === 'false' ? false : value;

export class CrearBuenaPracticaDto {
  @IsString() @MaxLength(50) codigo!: string;
  @IsString() @MaxLength(200) nombre!: string;
  @IsString() @MaxLength(100) categoria!: string;
  @IsString() @MaxLength(100) areaGestion!: string;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) idFaseProyecto?: number;
  @IsString() @MaxLength(1000) descripcionResumida!: string;
  @IsString() @MaxLength(2000) aplicacionMatrimonios!: string;
  @IsString() @MaxLength(2000) ejemploPractico!: string;
  @IsOptional() @IsString() @MaxLength(2000) recomendaciones?: string;
  @IsString() @MaxLength(250) fuenteMetodologica!: string;
  @IsOptional() @IsString() @MaxLength(500) referenciaEspecifica?: string;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) anioFuente?: number;
  @IsOptional() @IsString() @MaxLength(50) version?: string;
  @IsOptional() @IsDateString() fechaVigencia?: string;
  @IsOptional() @IsDateString() fechaFinVigencia?: string;
  @IsOptional() @Transform(booleano) @IsBoolean() estado?: boolean;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) ordenVisualizacion?: number;
}

export class ActualizarBuenaPracticaDto extends PartialType(CrearBuenaPracticaDto) {}

export class ListarBuenasPracticasDto {
  @IsOptional() @IsString() buscar?: string;
  @IsOptional() @IsString() @MaxLength(100) categoria?: string;
  @IsOptional() @IsString() @MaxLength(100) areaGestion?: string;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) idFaseProyecto?: number;
  @IsOptional() @Transform(booleano) @IsBoolean() estado?: boolean;
  @IsOptional() @Transform(booleano) @IsBoolean() mostrarTodos?: boolean;
}
