import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
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

export class ListarUbigeosDto {
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
    enum: ['idUbigeo', 'departamento', 'provincia', 'distrito'],
    default: 'idUbigeo',
    description: 'Campo por el que se ordena el resultado.',
  })
  @IsOptional()
  @IsIn(['idUbigeo', 'departamento', 'provincia', 'distrito'])
  ordenarPor: string = 'idUbigeo';
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
      'Texto parcial, sin distinción de mayúsculas, buscado en código y ubicación.',
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
    minLength: 6,
    maxLength: 6,
    description: 'Código de ubigeo exacto.',
  })
  @IsOptional()
  @IsString()
  @Length(6, 6)
  idUbigeo?: string;
  @ApiPropertyOptional({ description: 'Filtro parcial por departamento.' })
  @IsOptional()
  @IsString()
  departamento?: string;
  @ApiPropertyOptional({ description: 'Filtro parcial por provincia.' })
  @IsOptional()
  @IsString()
  provincia?: string;
  @ApiPropertyOptional({ description: 'Filtro parcial por distrito.' })
  @IsOptional()
  @IsString()
  distrito?: string;
}
