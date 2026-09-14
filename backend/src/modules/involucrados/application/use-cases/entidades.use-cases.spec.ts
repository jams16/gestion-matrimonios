import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import ExcelJS from 'exceljs';

import { CrearEntidadDto } from '../dto/crear-entidad.dto';
import { ListarEntidadesDto } from '../dto/listar-entidades.dto';
import {
  ActualizarEntidadUseCase,
  CrearEntidadUseCase,
  EliminarEntidadUseCase,
  ImportarEntidadesUseCase,
  ListarEntidadesUseCase,
  ObtenerEntidadUseCase,
} from './entidades.use-cases';
import { Entidad } from '../../domain/entities/entidad.entity';
import { TipoEntidad } from '../../domain/enums/tipo-entidad.enum';
import { InvolucradosRepository } from '../../domain/repositories/involucrados.repository';

class RepositorioEntidadesMemoria {
  entidades: Entidad[] = [];
  siguienteId = 1000;
  readonly ubigeos = new Set(['150101']);

  async crearEntidad(data: CrearEntidadDto): Promise<Entidad> {
    const ahora = new Date();
    const entidad: Entidad = {
      idEntidad: this.siguienteId++,
      ruc: data.ruc ?? null,
      razonSocial: data.razonSocial ?? null,
      nombreComercial: data.nombreComercial,
      tipoEntidad: data.tipoEntidad,
      telefono: data.telefono ?? null,
      correoElectronico: data.correoElectronico ?? null,
      redesSociales: data.redesSociales ?? null,
      direccion: data.direccion ?? null,
      codigoUbigeo: data.codigoUbigeo ?? null,
      esActivo: true,
      fechaCreacion: ahora,
      fechaModificacion: ahora,
    };
    this.entidades.push(entidad);
    return entidad;
  }

  async actualizarEntidad(
    id: number,
    data: Partial<CrearEntidadDto> & { esActivo?: boolean },
  ) {
    const entidad = this.entidades.find((item) => item.idEntidad === id);
    if (!entidad) return null;
    Object.assign(entidad, data);
    return entidad;
  }

  async obtenerEntidad(id: number) {
    return this.entidades.find((item) => item.idEntidad === id) ?? null;
  }

  async existeRuc(ruc: string, excluirId?: number) {
    return this.entidades.some(
      (entidad) => entidad.ruc === ruc && entidad.idEntidad !== excluirId,
    );
  }

  async obtenerUbigeo(id: string) {
    return this.ubigeos.has(id)
      ? {
          idUbigeo: id,
          departamento: 'Lima',
          provincia: 'Lima',
          distrito: 'Lima',
        }
      : null;
  }

  async listarEntidades(query: ListarEntidadesDto) {
    let items = this.entidades.filter(
      (entidad) => entidad.esActivo === (query.esActivo ?? true),
    );
    if (query.buscar) {
      const termino = query.buscar.toLowerCase();
      items = items.filter((entidad) =>
        [
          entidad.ruc,
          entidad.razonSocial,
          entidad.nombreComercial,
          entidad.correoElectronico,
          entidad.telefono,
          entidad.direccion,
        ].some((valor) =>
          String(valor ?? '')
            .toLowerCase()
            .includes(termino),
        ),
      );
    }
    if (query.ruc) items = items.filter((entidad) => entidad.ruc === query.ruc);
    if (query.tipoEntidad) {
      items = items.filter(
        (entidad) => entidad.tipoEntidad === query.tipoEntidad,
      );
    }
    const total = items.length;
    const pagina = query.mostrarTodos ? 1 : query.pagina;
    const limite = query.mostrarTodos ? total : query.limite;
    const totalPaginas = query.mostrarTodos
      ? total
        ? 1
        : 0
      : Math.ceil(total / query.limite);
    return {
      items: query.mostrarTodos
        ? items
        : items.slice((pagina - 1) * query.limite, pagina * query.limite),
      paginacion: {
        pagina,
        limite,
        total,
        totalPaginas,
        tieneAnterior: pagina > 1,
        tieneSiguiente: pagina < totalPaginas,
      },
    };
  }
}

describe('Casos de uso de Entidad', () => {
  let memoria: RepositorioEntidadesMemoria;
  let repository: InvolucradosRepository;
  let crear: CrearEntidadUseCase;
  let base: CrearEntidadDto;

  beforeEach(() => {
    memoria = new RepositorioEntidadesMemoria();
    repository = memoria as unknown as InvolucradosRepository;
    crear = new CrearEntidadUseCase(repository);
    base = {
      nombreComercial: 'Salón Los Jardines',
      tipoEntidad: TipoEntidad.PRIVADA,
      ruc: '20123456789',
      correoElectronico: 'contacto@jardines.pe',
      codigoUbigeo: '150101',
    };
  });

  it('debe crear una entidad desde el ID 1000', async () => {
    await expect(crear.execute(base)).resolves.toMatchObject({
      idEntidad: 1000,
    });
  });

  it('debe exigir nombreComercial y tipoEntidad', async () => {
    const errores = await validate(plainToInstance(CrearEntidadDto, {}));
    expect(errores.map((error) => error.property)).toEqual(
      expect.arrayContaining(['nombreComercial', 'tipoEntidad']),
    );
  });

  it('debe rechazar tipoEntidad inválido, RUC y correo inválidos', async () => {
    const errores = await validate(
      plainToInstance(CrearEntidadDto, {
        ...base,
        tipoEntidad: 'OTRA',
        ruc: '123',
        correoElectronico: 'correo-invalido',
      }),
    );
    expect(errores.map((error) => error.property)).toEqual(
      expect.arrayContaining(['tipoEntidad', 'ruc', 'correoElectronico']),
    );
  });

  it('debe rechazar RUC duplicado y ubigeo inexistente', async () => {
    await crear.execute(base);
    await expect(
      crear.execute({ ...base, nombreComercial: 'Otro salón' }),
    ).rejects.toBeInstanceOf(ConflictException);
    await expect(
      crear.execute({ ...base, ruc: '20999999999', codigoUbigeo: '999999' }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('debe obtener, editar y desactivar lógicamente', async () => {
    const entidad = await crear.execute(base);
    await expect(
      new ObtenerEntidadUseCase(repository).execute(entidad.idEntidad),
    ).resolves.toEqual(entidad);
    await expect(
      new ActualizarEntidadUseCase(repository, crear).execute(
        entidad.idEntidad,
        {
          nombreComercial: 'Jardines Premium',
        },
      ),
    ).resolves.toMatchObject({ nombreComercial: 'Jardines Premium' });
    await expect(
      new EliminarEntidadUseCase(repository).execute(entidad.idEntidad),
    ).resolves.toMatchObject({ esActivo: false });
    await expect(
      new ObtenerEntidadUseCase(repository).execute(9999),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('debe paginar, buscar, filtrar y mostrarTodos', async () => {
    await crear.execute(base);
    await crear.execute({
      ...base,
      ruc: '20987654321',
      nombreComercial: 'Casa de Eventos',
      tipoEntidad: TipoEntidad.RELIGIOSA,
    });
    const listar = new ListarEntidadesUseCase(repository);
    const paginado = await listar.execute(
      Object.assign(new ListarEntidadesDto(), { limite: 1 }),
    );
    const todos = await listar.execute(
      Object.assign(new ListarEntidadesDto(), {
        mostrarTodos: true,
        buscar: 'eventos',
        tipoEntidad: TipoEntidad.RELIGIOSA,
      }),
    );
    expect(paginado.paginacion).toMatchObject({
      total: 2,
      totalPaginas: 2,
      tieneSiguiente: true,
    });
    expect(todos.items).toHaveLength(1);
  });

  it('debe importar CSV continuando ante filas inválidas', async () => {
    const csv =
      'ruc,razon_social,nombre_comercial,tipo_entidad,telefono,correo_electronico,redes_sociales,direccion,codigo_ubigeo\n20123456789,,Salón,PUBLICA,,contacto@salon.pe,,,150101\n123,,Inválida,NO_VALIDO,,mal,,,150101';
    const resultado = await new ImportarEntidadesUseCase(crear).execute({
      originalname: 'entidades.csv',
      buffer: Buffer.from(csv),
    });
    expect(resultado).toMatchObject({
      totalFilas: 2,
      importadas: 1,
      errores: 1,
    });
  });

  it('debe importar XLSX', async () => {
    const workbook = new ExcelJS.Workbook();
    const hoja = workbook.addWorksheet('entidades');
    hoja.addRow([
      'ruc',
      'razon_social',
      'nombre_comercial',
      'tipo_entidad',
      'telefono',
      'correo_electronico',
      'redes_sociales',
      'direccion',
      'codigo_ubigeo',
    ]);
    hoja.addRow([
      '20123456789',
      '',
      'Salón',
      'PRIVADA',
      '',
      'contacto@salon.pe',
      '',
      '',
      '150101',
    ]);
    const resultado = await new ImportarEntidadesUseCase(crear).execute({
      originalname: 'entidades.xlsx',
      buffer: Buffer.from(await workbook.xlsx.writeBuffer()),
    });
    expect(resultado.importadas).toBe(1);
  });
});
