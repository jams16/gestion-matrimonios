import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import ExcelJS from 'exceljs';

import { ActualizarPersonaDto } from '../dto/actualizar-persona.dto';
import { CrearPersonaDto } from '../dto/crear-persona.dto';
import { ListarPersonasDto } from '../dto/listar-personas.dto';
import { InvolucradosRepository } from '../../domain/repositories/involucrados.repository';

@Injectable()
export class CrearPersonaUseCase {
  constructor(private readonly repository: InvolucradosRepository) {}

  async execute(data: CrearPersonaDto) {
    await this.validarReferencias(data);
    return this.repository.crearPersona(data);
  }

  async validarReferencias(
    data: Partial<CrearPersonaDto>,
    excluirId?: number,
  ): Promise<void> {
    if (data.dni && (await this.repository.existeDni(data.dni, excluirId))) {
      throw new ConflictException('El DNI ya está registrado.');
    }
    if (
      data.codigoUbigeo &&
      !(await this.repository.obtenerUbigeo(data.codigoUbigeo))
    ) {
      throw new BadRequestException('El ubigeo indicado no existe.');
    }
  }
}

@Injectable()
export class ObtenerPersonaUseCase {
  constructor(private readonly repository: InvolucradosRepository) {}
  async execute(id: number) {
    const persona = await this.repository.obtenerPersona(id);
    if (!persona) throw new NotFoundException('Persona no encontrada.');
    return persona;
  }
}

@Injectable()
export class ListarPersonasUseCase {
  constructor(private readonly repository: InvolucradosRepository) {}
  execute(query: ListarPersonasDto) {
    return this.repository.listarPersonas(query);
  }
}

@Injectable()
export class ActualizarPersonaUseCase {
  constructor(
    private readonly repository: InvolucradosRepository,
    private readonly crearPersona: CrearPersonaUseCase,
  ) {}
  async execute(id: number, data: ActualizarPersonaDto) {
    if (!(await this.repository.obtenerPersona(id))) {
      throw new NotFoundException('Persona no encontrada.');
    }
    await this.crearPersona.validarReferencias(data, id);
    return this.repository.actualizarPersona(id, data);
  }
}

@Injectable()
export class EliminarPersonaUseCase {
  constructor(private readonly repository: InvolucradosRepository) {}
  async execute(id: number) {
    const persona = await this.repository.actualizarPersona(id, {
      esActivo: false,
    } as never);
    if (!persona) throw new NotFoundException('Persona no encontrada.');
    return persona;
  }
}

export interface ErrorImportacion {
  fila: number;
  errores: string[];
}

export interface ArchivoImportacion {
  originalname: string;
  buffer: Buffer;
}

@Injectable()
export class ImportarPersonasUseCase {
  constructor(private readonly crearPersona: CrearPersonaUseCase) {}

  async execute(file: ArchivoImportacion) {
    if (!file)
      throw new BadRequestException('Debe adjuntar un archivo XLSX o CSV.');
    const extension = file.originalname.split('.').pop()?.toLowerCase();
    if (!extension || !['csv', 'xlsx'].includes(extension)) {
      throw new BadRequestException('Solo se permiten archivos XLSX o CSV.');
    }
    const filas =
      extension === 'csv'
        ? this.leerCsv(file.buffer)
        : await this.leerXlsx(file.buffer);
    let importadas = 0;
    const detalleErrores: ErrorImportacion[] = [];

    for (const [indice, fila] of filas.entries()) {
      const dto = plainToInstance(CrearPersonaDto, {
        nombres: fila.nombres,
        apellidoPaterno: fila.apellido_paterno,
        apellidoMaterno: fila.apellido_materno,
        telefono: fila.telefono,
        correoElectronico: fila.correo_electronico,
        dni: fila.dni,
        direccion: fila.direccion,
        codigoUbigeo: fila.codigo_ubigeo,
      });
      const errores = await validate(dto, {
        whitelist: true,
        forbidNonWhitelisted: true,
      });
      if (errores.length) {
        detalleErrores.push({
          fila: indice + 2,
          errores: errores.flatMap((error) =>
            Object.values(error.constraints ?? {}),
          ),
        });
        continue;
      }
      try {
        await this.crearPersona.execute(dto);
        importadas++;
      } catch (error) {
        detalleErrores.push({
          fila: indice + 2,
          errores: [
            error instanceof Error
              ? error.message
              : 'Error al importar la fila.',
          ],
        });
      }
    }
    return {
      totalFilas: filas.length,
      importadas,
      errores: detalleErrores.length,
      detalleErrores,
    };
  }

  private leerCsv(buffer: Buffer): Record<string, string>[] {
    const texto = buffer.toString('utf8').replace(/^\uFEFF/, '');
    const lineas: string[][] = [];
    let fila: string[] = [];
    let campo = '';
    let entreComillas = false;
    for (let i = 0; i < texto.length; i++) {
      const caracter = texto[i];
      if (caracter === '"' && entreComillas && texto[i + 1] === '"') {
        campo += '"';
        i++;
      } else if (caracter === '"') entreComillas = !entreComillas;
      else if (caracter === ',' && !entreComillas) {
        fila.push(campo.trim());
        campo = '';
      } else if ((caracter === '\n' || caracter === '\r') && !entreComillas) {
        if (caracter === '\r' && texto[i + 1] === '\n') i++;
        fila.push(campo.trim());
        if (fila.some(Boolean)) lineas.push(fila);
        fila = [];
        campo = '';
      } else campo += caracter;
    }
    fila.push(campo.trim());
    if (fila.some(Boolean)) lineas.push(fila);
    if (!lineas.length) return [];
    const encabezados = lineas[0].map((value) => value.toLowerCase());
    this.validarColumnas(encabezados);
    return lineas
      .slice(1)
      .map((valores) =>
        Object.fromEntries(
          encabezados.map((encabezado, i) => [encabezado, valores[i] ?? '']),
        ),
      );
  }

  private async leerXlsx(buffer: Buffer): Promise<Record<string, string>[]> {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer as unknown as ExcelJS.Buffer);
    const sheet = workbook.worksheets[0];
    if (!sheet) return [];
    const encabezados = (sheet.getRow(1).values as unknown[])
      .slice(1)
      .map((value) =>
        String(value ?? '')
          .trim()
          .toLowerCase(),
      );
    this.validarColumnas(encabezados);
    const filas: Record<string, string>[] = [];
    sheet.eachRow((row, numero) => {
      if (numero === 1) return;
      const valores = (row.values as unknown[]).slice(1);
      if (!valores.some((value) => String(value ?? '').trim())) return;
      filas.push(
        Object.fromEntries(
          encabezados.map((encabezado, i) => [
            encabezado,
            String(valores[i] ?? '').trim(),
          ]),
        ),
      );
    });
    return filas;
  }

  private validarColumnas(encabezados: string[]): void {
    const requeridas = [
      'nombres',
      'apellido_paterno',
      'apellido_materno',
      'telefono',
      'correo_electronico',
      'dni',
      'direccion',
      'codigo_ubigeo',
    ];
    const faltantes = requeridas.filter(
      (columna) => !encabezados.includes(columna),
    );
    if (faltantes.length)
      throw new BadRequestException(
        `Faltan columnas: ${faltantes.join(', ')}.`,
      );
  }
}
