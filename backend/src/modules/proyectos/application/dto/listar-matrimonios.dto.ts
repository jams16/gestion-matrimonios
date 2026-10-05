import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Max,
  Min,
} from 'class-validator';

import { TipoCeremonia } from '../../domain/enums/tipo-ceremonia.enum';
import { booleano } from './dto-utils';

export class ListarMatrimoniosDto {
  @ApiPropertyOptional({ default: 1, minimum: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  pagina: number = 1;

  @ApiPropertyOptional({ default: 20, minimum: 1, maximum: 100 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  limite: number = 20;

  @ApiPropertyOptional({ default: false })
  @Transform(booleano)
  @IsOptional()
  mostrarTodos: boolean = false;

  @ApiPropertyOptional({
    enum: [
      'idMatrimonio',
      'idProyecto',
      'fechaMatrimonio',
      'cantidadInvitados',
      'estado',
      'fechaCreacion',
    ],
  })
  @IsOptional()
  @IsIn([
    'idMatrimonio',
    'idProyecto',
    'fechaMatrimonio',
    'cantidadInvitados',
    'estado',
    'fechaCreacion',
  ])
  ordenarPor: string = 'fechaCreacion';

  @ApiPropertyOptional({ enum: ['asc', 'desc'], default: 'desc' })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  orden: 'asc' | 'desc' = 'desc';

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  buscar?: string;

  @ApiPropertyOptional({ format: 'uuid' })
  @IsOptional()
  @IsUUID()
  idMatrimonio?: string;

  @ApiPropertyOptional({ format: 'uuid' })
  @IsOptional()
  @IsUUID()
  idProyecto?: string;

  @ApiPropertyOptional({ minimum: 1 })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  idNovio1?: number;

  @ApiPropertyOptional({ minimum: 1 })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  idNovio2?: number;

  @ApiPropertyOptional({ enum: TipoCeremonia })
  @IsOptional()
  @IsEnum(TipoCeremonia)
  tipoCeremonia?: TipoCeremonia;

  @ApiPropertyOptional({ minLength: 6, maxLength: 6 })
  @IsOptional()
  @IsString()
  @Length(6, 6)
  ciudadUbicacion?: string;

  @ApiPropertyOptional()
  @Transform(booleano)
  @IsOptional()
  @IsBoolean()
  estado?: boolean;
}
