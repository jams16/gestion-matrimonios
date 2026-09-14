import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import ExcelJS from 'exceljs';

import { CrearPersonaDto } from '../dto/crear-persona.dto';
import { ListarPersonasDto } from '../dto/listar-personas.dto';
import { ListarUbigeosDto } from '../dto/listar-ubigeos.dto';
import {
  ActualizarPersonaUseCase,
  CrearPersonaUseCase,
  EliminarPersonaUseCase,
  ImportarPersonasUseCase,
  ListarPersonasUseCase,
  ObtenerPersonaUseCase,
} from './personas.use-cases';
import {
  ListarUbigeosUseCase,
  ObtenerUbigeoUseCase,
} from './ubigeos.use-cases';
import { PersonaNatural } from '../../domain/entities/persona-natural.entity';
import { Ubigeo } from '../../domain/entities/ubigeo.entity';
import {
  InvolucradosRepository,
  ResultadoPaginado,
} from '../../domain/repositories/involucrados.repository';

class RepositorioMemoria implements InvolucradosRepository {
  personas: PersonaNatural[] = [];
  ubigeos: Ubigeo[] = [
    {
      idUbigeo: '150101',
      departamento: 'Lima',
      provincia: 'Lima',
      distrito: 'Lima',
    },
  ];
  siguienteId = 1000;

  async crearPersona(data: CrearPersonaDto): Promise<PersonaNatural> {
    const now = new Date();
    const persona: PersonaNatural = {
      idPersonaNatural: this.siguienteId++,
      nombres: data.nombres,
      apellidoPaterno: data.apellidoPaterno,
      apellidoMaterno: data.apellidoMaterno ?? null,
      telefono: data.telefono ?? null,
      correoElectronico: data.correoElectronico,
      dni: data.dni ?? null,
      direccion: data.direccion ?? null,
      codigoUbigeo: data.codigoUbigeo ?? null,
      esActivo: true,
      fechaCreacion: now,
      fechaModificacion: now,
    };
    this.personas.push(persona);
    return persona;
  }
  async actualizarPersona(
    id: number,
    data: Partial<CrearPersonaDto> & { esActivo?: boolean },
  ) {
    const persona = this.personas.find((item) => item.idPersonaNatural === id);
    if (!persona) return null;
    Object.assign(persona, data);
    return persona;
  }
  async obtenerPersona(id: number) {
    return this.personas.find((item) => item.idPersonaNatural === id) ?? null;
  }
  async listarPersonas(
    query: ListarPersonasDto,
  ): Promise<ResultadoPaginado<PersonaNatural>> {
    let items = this.personas.filter(
      (p) => p.esActivo === (query.esActivo ?? true),
    );
    if (query.buscar) {
      const term = query.buscar.toLowerCase();
      items = items.filter((p) =>
        [
          p.nombres,
          p.apellidoPaterno,
          p.correoElectronico,
          p.dni,
          p.telefono,
        ].some((v) =>
          String(v ?? '')
            .toLowerCase()
            .includes(term),
        ),
      );
    }
    if (query.dni) items = items.filter((p) => p.dni === query.dni);
    const total = items.length;
    const visible = query.mostrarTodos
      ? items
      : items.slice(
          (query.pagina - 1) * query.limite,
          query.pagina * query.limite,
        );
    const totalPaginas = query.mostrarTodos
      ? total
        ? 1
        : 0
      : Math.ceil(total / query.limite);
    return {
      items: visible,
      paginacion: {
        pagina: query.mostrarTodos ? 1 : query.pagina,
        limite: query.mostrarTodos ? total : query.limite,
        total,
        totalPaginas,
        tieneAnterior: query.pagina > 1,
        tieneSiguiente: query.pagina < totalPaginas,
      },
    };
  }
  async existeDni(dni: string, excluirId?: number) {
    return this.personas.some(
      (p) => p.dni === dni && p.idPersonaNatural !== excluirId,
    );
  }
  async obtenerUbigeo(id: string) {
    return this.ubigeos.find((item) => item.idUbigeo === id) ?? null;
  }
  async listarUbigeos(
    query: ListarUbigeosDto,
  ): Promise<ResultadoPaginado<Ubigeo>> {
    let items = this.ubigeos.filter(
      (u) =>
        !query.buscar ||
        Object.values(u).some((v) =>
          v.toLowerCase().includes(query.buscar!.toLowerCase()),
        ),
    );
    if (query.departamento)
      items = items.filter((u) => u.departamento.includes(query.departamento!));
    const total = items.length;
    const visible = query.mostrarTodos
      ? items
      : items.slice(
          (query.pagina - 1) * query.limite,
          query.pagina * query.limite,
        );
    return {
      items: visible,
      paginacion: {
        pagina: 1,
        limite: query.mostrarTodos ? total : query.limite,
        total,
        totalPaginas: query.mostrarTodos ? 1 : Math.ceil(total / query.limite),
        tieneAnterior: false,
        tieneSiguiente: false,
      },
    };
  }
}

describe('Casos de uso de Persona Natural', () => {
  let repository: RepositorioMemoria;
  let crear: CrearPersonaUseCase;
  let base: CrearPersonaDto;

  beforeEach(() => {
    repository = new RepositorioMemoria();
    crear = new CrearPersonaUseCase(repository);
    base = {
      nombres: 'Ana',
      apellidoPaterno: 'Pérez',
      correoElectronico: 'ana@example.com',
      dni: '12345678',
      codigoUbigeo: '150101',
    };
  });

  it('debe crear una persona con ID desde 1000', async () => {
    await expect(crear.execute(base)).resolves.toMatchObject({
      idPersonaNatural: 1000,
      esActivo: true,
    });
  });

  it('debe rechazar campos obligatorios ausentes', async () => {
    const errors = await validate(plainToInstance(CrearPersonaDto, {}));
    expect(errors.map((e) => e.property)).toEqual(
      expect.arrayContaining([
        'nombres',
        'apellidoPaterno',
        'correoElectronico',
      ]),
    );
  });

  it('debe rechazar un correo inválido', async () => {
    const errors = await validate(
      plainToInstance(CrearPersonaDto, {
        ...base,
        correoElectronico: 'invalido',
      }),
    );
    expect(errors.some((e) => e.property === 'correoElectronico')).toBe(true);
  });

  it('debe rechazar un DNI duplicado', async () => {
    await crear.execute(base);
    await expect(
      crear.execute({ ...base, correoElectronico: 'otra@example.com' }),
    ).rejects.toBeInstanceOf(ConflictException);
  });

  it('debe rechazar un ubigeo inexistente', async () => {
    await expect(
      crear.execute({ ...base, codigoUbigeo: '999999' }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('debe obtener una persona y responder 404 si no existe', async () => {
    const obtener = new ObtenerPersonaUseCase(repository);
    const persona = await crear.execute(base);
    await expect(obtener.execute(persona.idPersonaNatural)).resolves.toEqual(
      persona,
    );
    await expect(obtener.execute(9999)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('debe editar una persona', async () => {
    const persona = await crear.execute(base);
    const actualizar = new ActualizarPersonaUseCase(repository, crear);
    await expect(
      actualizar.execute(persona.idPersonaNatural, { nombres: 'Elena' }),
    ).resolves.toMatchObject({ nombres: 'Elena' });
  });

  it('debe realizar eliminación lógica', async () => {
    const persona = await crear.execute(base);
    const eliminar = new EliminarPersonaUseCase(repository);
    await expect(
      eliminar.execute(persona.idPersonaNatural),
    ).resolves.toMatchObject({ esActivo: false });
  });

  it('debe paginar el listado', async () => {
    await crear.execute(base);
    await crear.execute({
      ...base,
      correoElectronico: 'b@example.com',
      dni: '87654321',
    });
    const query = Object.assign(new ListarPersonasDto(), { limite: 1 });
    const result = await new ListarPersonasUseCase(repository).execute(query);
    expect(result.paginacion).toMatchObject({
      total: 2,
      totalPaginas: 2,
      tieneSiguiente: true,
    });
  });

  it('debe ignorar página y límite con mostrarTodos', async () => {
    await crear.execute(base);
    await crear.execute({
      ...base,
      correoElectronico: 'b@example.com',
      dni: '87654321',
    });
    const query = Object.assign(new ListarPersonasDto(), {
      limite: 1,
      mostrarTodos: true,
    });
    expect(
      (await new ListarPersonasUseCase(repository).execute(query)).items,
    ).toHaveLength(2);
  });

  it('debe buscar parcialmente y filtrar', async () => {
    await crear.execute(base);
    const buscar = Object.assign(new ListarPersonasDto(), { buscar: 'péR' });
    const filtrar = Object.assign(new ListarPersonasDto(), { dni: '12345678' });
    expect(
      (await new ListarPersonasUseCase(repository).execute(buscar)).items,
    ).toHaveLength(1);
    expect(
      (await new ListarPersonasUseCase(repository).execute(filtrar)).items,
    ).toHaveLength(1);
  });

  it('debe importar CSV conservando los errores por fila', async () => {
    const csv =
      'nombres,apellido_paterno,apellido_materno,telefono,correo_electronico,dni,direccion,codigo_ubigeo\nAna,Pérez,,,ana@example.com,12345678,,150101\nSin,Correo,,,mal,87654321,,150101';
    const result = await new ImportarPersonasUseCase(crear).execute({
      originalname: 'personas.csv',
      buffer: Buffer.from(csv),
    });
    expect(result).toMatchObject({ totalFilas: 2, importadas: 1, errores: 1 });
  });

  it('debe importar XLSX', async () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('personas');
    sheet.addRow([
      'nombres',
      'apellido_paterno',
      'apellido_materno',
      'telefono',
      'correo_electronico',
      'dni',
      'direccion',
      'codigo_ubigeo',
    ]);
    sheet.addRow([
      'Ana',
      'Pérez',
      '',
      '',
      'ana@example.com',
      '12345678',
      '',
      '150101',
    ]);
    const buffer = Buffer.from(await workbook.xlsx.writeBuffer());
    const result = await new ImportarPersonasUseCase(crear).execute({
      originalname: 'personas.xlsx',
      buffer,
    });
    expect(result.importadas).toBe(1);
  });
});

describe('Casos de uso de Ubigeo', () => {
  const repository = new RepositorioMemoria();

  it('debe obtener un ubigeo', async () => {
    await expect(
      new ObtenerUbigeoUseCase(repository).execute('150101'),
    ).resolves.toMatchObject({ distrito: 'Lima' });
  });

  it('debe listar paginado, buscar, filtrar y mostrar todos', async () => {
    const useCase = new ListarUbigeosUseCase(repository);
    const paginado = await useCase.execute(new ListarUbigeosDto());
    const todos = await useCase.execute(
      Object.assign(new ListarUbigeosDto(), {
        mostrarTodos: true,
        buscar: 'lima',
        departamento: 'Lim',
      }),
    );
    expect(paginado.paginacion.total).toBe(1);
    expect(todos.items).toHaveLength(1);
  });
});
