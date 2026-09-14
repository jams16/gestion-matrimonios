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

const booleano = ({ value }: { value: unknown }) =>
  value === true || value === 'true'
    ? true
    : value === false || value === 'false'
      ? false
      : value;

export class ListarUbigeosDto {
  @Type(() => Number) @IsInt() @Min(1) @IsOptional() pagina = 1;
  @Type(() => Number) @IsInt() @Min(1) @Max(100) @IsOptional() limite = 20;
  @IsOptional()
  @IsIn(['idUbigeo', 'departamento', 'provincia', 'distrito'])
  ordenarPor = 'idUbigeo';
  @IsOptional() @IsIn(['asc', 'desc']) orden: 'asc' | 'desc' = 'asc';
  @IsOptional() @IsString() buscar?: string;
  @Transform(booleano) @IsBoolean() @IsOptional() mostrarTodos = false;
  @IsOptional() @IsString() @Length(6, 6) idUbigeo?: string;
  @IsOptional() @IsString() departamento?: string;
  @IsOptional() @IsString() provincia?: string;
  @IsOptional() @IsString() distrito?: string;
}
