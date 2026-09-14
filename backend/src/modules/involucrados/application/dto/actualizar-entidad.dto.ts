import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

import { TipoEntidad } from '../../domain/enums/tipo-entidad.enum';
import { CrearEntidadDto } from './crear-entidad.dto';

export class ActualizarEntidadDto extends PartialType(CrearEntidadDto) {
  @ApiPropertyOptional({ enum: TipoEntidad })
  @IsOptional()
  @IsEnum(TipoEntidad)
  tipoEntidad?: TipoEntidad;
}
