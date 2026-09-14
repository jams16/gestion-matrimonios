import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

const trim = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;
const emptyToNull = ({ value }: { value: unknown }) => {
  const trimmed = trim({ value });
  return trimmed === '' ? null : trimmed;
};

export class CrearPersonaDto {
  @ApiProperty({ example: 'María', maxLength: 100 })
  @Transform(trim)
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  nombres: string;

  @ApiProperty({ example: 'Pérez', maxLength: 100 })
  @Transform(trim)
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  apellidoPaterno: string;

  @ApiPropertyOptional({ example: 'Gómez', maxLength: 100 })
  @Transform(emptyToNull)
  @IsOptional()
  @IsString()
  @MaxLength(100)
  apellidoMaterno?: string | null;

  @ApiPropertyOptional({ example: '999888777', maxLength: 15 })
  @Transform(emptyToNull)
  @IsOptional()
  @IsString()
  @MaxLength(15)
  telefono?: string | null;

  @ApiProperty({ example: 'maria.perez@ejemplo.com', maxLength: 150 })
  @Transform(trim)
  @IsEmail()
  @MaxLength(150)
  correoElectronico: string;

  @ApiPropertyOptional({ example: '12345678', minLength: 8, maxLength: 8 })
  @Transform(emptyToNull)
  @IsOptional()
  @IsString()
  @Length(8, 8)
  dni?: string | null;

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
