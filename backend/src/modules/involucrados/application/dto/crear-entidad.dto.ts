import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { TipoEntidad } from '../../domain/enums/tipo-entidad.enum';

const trim = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;
const emptyToNull = ({ value }: { value: unknown }) => {
  const trimmed = trim({ value });
  return trimmed === '' ? null : trimmed;
};

export class CrearEntidadDto {
  @ApiProperty({ example: 'Salón Los Jardines', maxLength: 200 })
  @Transform(trim)
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  nombreComercial: string;

  @ApiProperty({ enum: TipoEntidad, example: TipoEntidad.PRIVADA })
  @IsEnum(TipoEntidad)
  tipoEntidad: TipoEntidad;

  @ApiPropertyOptional({ example: '20123456789', maxLength: 11 })
  @Transform(emptyToNull)
  @IsOptional()
  @IsString()
  @Matches(/^\d{11}$/, { message: 'El RUC debe tener exactamente 11 dígitos.' })
  ruc?: string | null;

  @ApiPropertyOptional({ example: 'Eventos del Perú S.A.C.', maxLength: 200 })
  @Transform(emptyToNull)
  @IsOptional()
  @IsString()
  @MaxLength(200)
  razonSocial?: string | null;

  @ApiPropertyOptional({ example: '999888777', maxLength: 15 })
  @Transform(emptyToNull)
  @IsOptional()
  @IsString()
  @MaxLength(15)
  telefono?: string | null;

  @ApiPropertyOptional({ example: 'contacto@ejemplo.com', maxLength: 150 })
  @Transform(emptyToNull)
  @IsOptional()
  @IsEmail()
  @MaxLength(150)
  correoElectronico?: string | null;

  @ApiPropertyOptional({ example: '@salonlosjardines', maxLength: 250 })
  @Transform(emptyToNull)
  @IsOptional()
  @IsString()
  @MaxLength(250)
  redesSociales?: string | null;

  @ApiPropertyOptional({ example: 'Av. Principal 123', maxLength: 250 })
  @Transform(emptyToNull)
  @IsOptional()
  @IsString()
  @MaxLength(250)
  direccion?: string | null;

  @ApiPropertyOptional({ example: '150101', minLength: 6, maxLength: 6 })
  @Transform(emptyToNull)
  @IsOptional()
  @IsString()
  @Length(6, 6)
  codigoUbigeo?: string | null;
}
