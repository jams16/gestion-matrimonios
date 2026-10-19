import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { booleano } from '../../../proyectos/application/dto/dto-utils';
import type { TipoEventoCronograma } from '../../domain/ports/notificaciones-cronograma.port';

const eventos: TipoEventoCronograma[] = [
  'ACTIVIDAD_PROXIMA_VENCER',
  'ACTIVIDAD_VENCIDA',
  'ACTIVIDAD_REPROGRAMADA',
  'HITO_PROXIMO',
  'HITO_VENCIDO',
];
export class ListarNotificacionesCronogramaDto {
  @ApiPropertyOptional()
  @Transform(booleano)
  @IsOptional()
  @IsBoolean()
  leida?: boolean;
  @ApiPropertyOptional()
  @Transform(booleano)
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
  @ApiPropertyOptional({ enum: eventos })
  @IsOptional()
  @IsEnum(eventos)
  tipoEvento?: TipoEventoCronograma;
}
