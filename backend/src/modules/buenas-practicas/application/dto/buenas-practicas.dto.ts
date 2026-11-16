import { PartialType } from '@nestjs/mapped-types';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

const booleano = ({ value }: { value: unknown }) => value === 'true' ? true : value === 'false' ? false : value;

export class CrearBuenaPracticaDto {
  @IsString() @MaxLength(10) codigo!: string;
  @IsString() @MaxLength(200) nombre!: string;
  @IsString() descripcion!: string;
  @IsString() aplicacionMatrimonios!: string;
  @IsString() @MaxLength(150) areaGestion!: string;
  @IsOptional() @IsString() @MaxLength(250) fuenteMetodologica?: string;
  @IsOptional() @IsString() @MaxLength(100) anioFuente?: string;
  @IsOptional() @IsString() referenciaEspecifica?: string;
  @IsOptional() @Transform(({ value }) => value === undefined || value === null || value === '' ? undefined : BigInt(value)) idFaseProyecto?: bigint;
  @IsOptional() @IsString() ejemploPractico?: string;
  @IsOptional() @IsString() recomendaciones?: string;
  @IsOptional() @Transform(booleano) @IsBoolean() estado?: boolean;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) version?: number;
}

export class ActualizarBuenaPracticaDto extends PartialType(CrearBuenaPracticaDto) {}

export class ListarBuenasPracticasDto {
  @IsOptional() @IsString() buscar?: string;
  @IsOptional() @IsString() @MaxLength(150) areaGestion?: string;
  @IsOptional() @Transform(({ value }) => value === undefined || value === null || value === '' ? undefined : BigInt(value)) idFaseProyecto?: bigint;
  @IsOptional() @Transform(booleano) @IsBoolean() estado?: boolean;
  @IsOptional() @Transform(booleano) @IsBoolean() mostrarTodos?: boolean;
}
