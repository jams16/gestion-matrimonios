import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsISO8601,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  MaxLength,
  Min,
} from 'class-validator';

import { TipoCeremonia } from '../../domain/enums/tipo-ceremonia.enum';
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

  @ApiPropertyOptional({ enum: TipoCeremonia })
  @IsOptional()
  @IsEnum(TipoCeremonia)
  tipoCeremonia?: TipoCeremonia | null;

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
