import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Length, MaxLength, Min, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TipoCeremonia } from '../../domain/enums/tipo-ceremonia.enum';

export class ParejaOnboardingDto {
  @ApiProperty() @IsString() @IsNotEmpty() @MaxLength(100) nombres: string;
  @ApiProperty() @IsString() @IsNotEmpty() @MaxLength(100) apellidoPaterno: string;
  @ApiProperty() @IsString() @Length(8, 8) dni: string;
  @ApiProperty() @IsString() @IsNotEmpty() @MaxLength(150) usuario: string;
  @ApiProperty() @IsString() @IsNotEmpty() @MaxLength(100) contrasena: string;
}

export class GuardarOnboardingMatrimonioDto {
  @ApiPropertyOptional({ format: 'uuid' }) @IsOptional() @IsUUID() idProyecto?: string;
  @ApiProperty({ type: ParejaOnboardingDto }) @ValidateNested() @Type(() => ParejaOnboardingDto) pareja1: ParejaOnboardingDto;
  @ApiProperty({ type: ParejaOnboardingDto }) @ValidateNested() @Type(() => ParejaOnboardingDto) pareja2: ParejaOnboardingDto;
  @ApiProperty() @IsString() fechaMatrimonio: string;
  @ApiProperty() @Type(() => Number) @IsInt() @Min(1) cantidadInvitados: number;
  @ApiProperty() @Type(() => Number) @Min(0) presupuesto: number;
  @ApiProperty({ enum: TipoCeremonia }) @IsEnum(TipoCeremonia) tipoCeremonia: TipoCeremonia;
  @ApiPropertyOptional() @IsOptional() @IsString() @Length(6, 6) ciudadUbicacion?: string | null;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(1000) objetivos?: string | null;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(1000) necesidades?: string | null;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(1000) supuestos?: string | null;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(1000) restricciones?: string | null;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(1000) ideasMoonboard?: string | null;
}
