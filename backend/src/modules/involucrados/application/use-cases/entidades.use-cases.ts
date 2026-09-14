import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import ExcelJS from 'exceljs';

import { ActualizarEntidadDto } from '../dto/actualizar-entidad.dto';
import { CrearEntidadDto } from '../dto/crear-entidad.dto';
import { ListarEntidadesDto } from '../dto/listar-entidades.dto';
import { InvolucradosRepository } from '../../domain/repositories/involucrados.repository';

@Injectable()
export class CrearEntidadUseCase {
  constructor(private readonly repository: InvolucradosRepository) {}

  async execute(data: CrearEntidadDto) {
    await this.validarReferencias(data);
    return this.repository.crearEntidad(data);
  }

  async validarReferencias(
    data: Partial<CrearEntidadDto>,
    excluirId?: number,
  ): Promise<void> {
    if (data.ruc && (await this.repository.existeRuc(data.ruc, excluirId))) {
      throw new ConflictException('El RUC ya está registrado.');
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
export class ObtenerEntidadUseCase {
  constructor(private readonly repository: InvolucradosRepository) {}

  async execute(id: number) {
    const entidad = await this.repository.obtenerEntidad(id);
    if (!entidad) throw new NotFoundException('Entidad no encontrada.');
    return entidad;
  }
}

@Injectable()
export class ListarEntidadesUseCase {
  constructor(private readonly repository: InvolucradosRepository) {}

  execute(query: ListarEntidadesDto) {
    return this.repository.listarEntidades(query);
  }
}

@Injectable()
export class ActualizarEntidadUseCase {
  constructor(
    private readonly repository: InvolucradosRepository,
    private readonly crearEntidad: CrearEntidadUseCase,
  ) {}

  async execute(id: number, data: ActualizarEntidadDto) {
    if (!(await this.repository.obtenerEntidad(id))) {
      throw new NotFoundException('Entidad no encontrada.');
    }
    await this.crearEntidad.validarReferencias(data, id);
    return this.repository.actualizarEntidad(id, data);
  }
}

@Injectable()
export class EliminarEntidadUseCase {
  constructor(private readonly repository: InvolucradosRepository) {}

  async execute(id: number) {
    const entidad = await this.repository.actualizarEntidad(id, {
      esActivo: false,
    });
    if (!entidad) throw new NotFoundException('Entidad no encontrada.');
    return entidad;
  }
}

export interface ArchivoImportacionEntidad {
  originalname: string;
  buffer: Buffer;
}

@Injectable()
export class ImportarEntidadesUseCase {
  constructor(private readonly crearEntidad: CrearEntidadUseCase) {}

  async execute(file: ArchivoImportacionEntidad) {
    if (!file) {
      throw new BadRequestException('Debe adjuntar un archivo XLSX o CSV.');
    }
    const extension = file.originalname.split('.').pop()?.toLowerCase();
    if (!extension || !['csv', 'xlsx'].includes(extension)) {
      throw new BadRequestException('Solo se permiten archivos XLSX o CSV.');
    }
    const filas =
      extension === 'csv'
        ? this.leerCsv(file.buffer)
        : await this.leerXlsx(file.buffer);
    let importadas = 0;
    const detalleErrores: { fila: number; errores: string[] }[] = [];

    for (const [indice, fila] of filas.entries()) {
      const dto = plainToInstance(CrearEntidadDto, {
        ruc: fila.ruc,
        razonSocial: fila.razon_social,
        nombreComercial: fila.nombre_comercial,
        tipoEntidad: fila.tipo_entidad,
        telefono: fila.telefono,
        correoElectronico: fila.correo_electronico,
        redesSociales: fila.redes_sociales,
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
        await this.crearEntidad.execute(dto);
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
    const encabezados = lineas[0].map((valor) => valor.toLowerCase());
    this.validarColumnas(encabezados);
    return lineas
      .slice(1)
      .map((valores) =>
        Object.fromEntries(
          encabezados.map((encabezado, indice) => [
            encabezado,
            valores[indice] ?? '',
          ]),
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
      .map((valor) =>
        String(valor ?? '')
          .trim()
          .toLowerCase(),
      );
    this.validarColumnas(encabezados);
    const filas: Record<string, string>[] = [];
    sheet.eachRow((row, numero) => {
      if (numero === 1) return;
      const valores = (row.values as unknown[]).slice(1);
      if (!valores.some((valor) => String(valor ?? '').trim())) return;
      filas.push(
        Object.fromEntries(
          encabezados.map((encabezado, indice) => [
            encabezado,
            String(valores[indice] ?? '').trim(),
          ]),
        ),
      );
    });
    return filas;
  }

  private validarColumnas(encabezados: string[]): void {
    const requeridas = [
      'ruc',
      'razon_social',
      'nombre_comercial',
      'tipo_entidad',
      'telefono',
      'correo_electronico',
      'redes_sociales',
      'direccion',
      'codigo_ubigeo',
    ];
    const faltantes = requeridas.filter(
      (columna) => !encabezados.includes(columna),
    );
    if (faltantes.length) {
      throw new BadRequestException(
        'Faltan columnas: ' + faltantes.join(', ') + '.',
      );
    }
  }
}
