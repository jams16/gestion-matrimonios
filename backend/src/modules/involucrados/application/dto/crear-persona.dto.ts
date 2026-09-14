import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

const trim = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;
const emptyToNull = ({ value }: { value: unknown }) => {
  const trimmed = trim({ value });
  return trimmed === '' ? null : trimmed;
};

export class CrearPersonaDto {
  @Transform(trim)
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  nombres: string;

  @Transform(trim)
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  apellidoPaterno: string;

  @Transform(emptyToNull)
  @IsOptional()
  @IsString()
  @MaxLength(100)
  apellidoMaterno?: string | null;

  @Transform(emptyToNull)
  @IsOptional()
  @IsString()
  @MaxLength(15)
  telefono?: string | null;

  @Transform(trim)
  @IsEmail()
  @MaxLength(150)
  correoElectronico: string;

  @Transform(emptyToNull)
  @IsOptional()
  @IsString()
  @Length(8, 8)
  dni?: string | null;

  @Transform(emptyToNull)
  @IsOptional()
  @IsString()
  @MaxLength(250)
  direccion?: string | null;

  @Transform(emptyToNull)
  @IsOptional()
  @IsString()
  @Length(6, 6)
  codigoUbigeo?: string | null;
}
