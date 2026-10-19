import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsISO8601,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

import { booleano, emptyToNull } from './dto-utils';

export class CrearProyectoDto {
  @ApiPropertyOptional({ maxLength: 150 })
  @Transform(emptyToNull)
  @IsOptional()
  @IsString()
  @MaxLength(150)
  nombre?: string | null;

  @ApiPropertyOptional({ minimum: 1 })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  idPm?: number | null;

  @ApiPropertyOptional({ example: '2026-10-05T00:00:00Z' })
  @Transform(emptyToNull)
  @IsOptional()
  @IsISO8601()
  fechaInicio?: string | null;

  @ApiPropertyOptional({ example: '2027-01-10T00:00:00Z' })
  @Transform(emptyToNull)
  @IsOptional()
  @IsISO8601()
  fechaFin?: string | null;

  @ApiPropertyOptional({ example: 15000 })
  @Type(() => Number)
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  presupuesto?: number | null;

  @ApiPropertyOptional({ maxLength: 1000 })
  @Transform(emptyToNull)
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  objetivos?: string | null;

  @ApiPropertyOptional({ maxLength: 1000 })
  @Transform(emptyToNull)
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  necesidades?: string | null;

  @ApiPropertyOptional({ maxLength: 1000 })
  @Transform(emptyToNull)
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  supuestos?: string | null;

  @ApiPropertyOptional({ maxLength: 1000 })
  @Transform(emptyToNull)
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  restricciones?: string | null;

  @ApiPropertyOptional({ maxLength: 1000 })
  @Transform(emptyToNull)
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  alcance?: string | null;

  @ApiPropertyOptional({ minimum: 1, description: 'ID de gp_fase_proyecto.' })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  idFaseProyecto?: number | null;

  @ApiPropertyOptional({ default: true })
  @Transform(booleano)
  @IsOptional()
  @IsBoolean()
  estado?: boolean;
}
