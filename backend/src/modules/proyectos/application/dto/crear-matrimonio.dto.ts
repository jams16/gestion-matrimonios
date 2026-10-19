import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsISO8601,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  MaxLength,
  Min,
} from 'class-validator';

import { booleano, emptyToNull } from './dto-utils';

export class CrearMatrimonioDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  idProyecto: string;

  @ApiPropertyOptional({ minimum: 1 })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  idNovio1?: number | null;

  @ApiPropertyOptional({ minimum: 1 })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  idNovio2?: number | null;

  @ApiPropertyOptional({ example: '2027-01-10T18:00:00Z' })
  @Transform(emptyToNull)
  @IsOptional()
  @IsISO8601()
  fechaMatrimonio?: string | null;

  @ApiPropertyOptional({ minimum: 0 })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(0)
  cantidadInvitados?: number | null;

  @ApiPropertyOptional({
    minimum: 1,
    description: 'ID del catálogo gp_tipo_ceremonia.',
  })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  idTipoCeremonia?: number | null;

  @ApiPropertyOptional({ minLength: 6, maxLength: 6 })
  @Transform(emptyToNull)
  @IsOptional()
  @IsString()
  @Length(6, 6)
  ciudadUbicacion?: string | null;

  @ApiPropertyOptional({ maxLength: 1000 })
  @Transform(emptyToNull)
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  ideasMoonboard?: string | null;

  @ApiPropertyOptional({ default: true })
  @Transform(booleano)
  @IsOptional()
  @IsBoolean()
  estado?: boolean | null;
}
