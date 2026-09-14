import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../../infrastructure/database/prisma/prisma.service';
import { CrearPersonaDto } from '../../../application/dto/crear-persona.dto';
import { ListarPersonasDto } from '../../../application/dto/listar-personas.dto';
import { ListarUbigeosDto } from '../../../application/dto/listar-ubigeos.dto';
import { PersonaNatural } from '../../../domain/entities/persona-natural.entity';
import { Ubigeo } from '../../../domain/entities/ubigeo.entity';
import {
  InvolucradosRepository,
  ResultadoPaginado,
} from '../../../domain/repositories/involucrados.repository';

@Injectable()
export class PrismaInvolucradosRepository implements InvolucradosRepository {
  constructor(private readonly prisma: PrismaService) {}

  async crearPersona(data: CrearPersonaDto): Promise<PersonaNatural> {
    return this.prisma.client.orm.public.PersonaNatural.create({
      ...data,
      apellidoMaterno: data.apellidoMaterno ?? null,
      telefono: data.telefono ?? null,
      dni: data.dni ?? null,
      direccion: data.direccion ?? null,
      codigoUbigeo: data.codigoUbigeo ?? null,
    } as never) as Promise<PersonaNatural>;
  }

  async actualizarPersona(
    id: number,
    data: Partial<CrearPersonaDto>,
  ): Promise<PersonaNatural | null> {
    const actual = await this.obtenerPersona(id);
    if (!actual) return null;
    return this.prisma.client.orm.public.PersonaNatural.where({
      idPersonaNatural: id,
    }).update(data as never) as Promise<PersonaNatural>;
  }

  obtenerPersona(id: number): Promise<PersonaNatural | null> {
    return this.prisma.client.orm.public.PersonaNatural.first({
      idPersonaNatural: id,
    }) as Promise<PersonaNatural | null>;
  }

  async existeDni(dni: string, excluirId?: number): Promise<boolean> {
    const personas = (await this.prisma.client.orm.public.PersonaNatural.where(
      (p) => p.dni.eq(dni as never),
    ).all()) as PersonaNatural[];
    return personas.some((persona) => persona.idPersonaNatural !== excluirId);
  }

  obtenerUbigeo(id: string): Promise<Ubigeo | null> {
    return this.prisma.client.orm.public.Ubigeo.first({
      idUbigeo: id as never,
    }) as Promise<Ubigeo | null>;
  }

  async listarPersonas(
    query: ListarPersonasDto,
  ): Promise<ResultadoPaginado<PersonaNatural>> {
    let items =
      (await this.prisma.client.orm.public.PersonaNatural.all()) as PersonaNatural[];
    const texto = (value: unknown) =>
      String(value ?? '').toLocaleLowerCase('es-PE');
    const contiene = (value: unknown, filtro?: string) =>
      !filtro || texto(value).includes(texto(filtro));
    const estado = query.esActivo ?? true;

    items = items.filter(
      (p) =>
        p.esActivo === estado &&
        (!query.id || p.idPersonaNatural === query.id) &&
        contiene(p.nombres, query.nombres) &&
        contiene(p.apellidoPaterno, query.apellidoPaterno) &&
        contiene(p.apellidoMaterno, query.apellidoMaterno) &&
        contiene(p.correoElectronico, query.correoElectronico) &&
        contiene(p.dni, query.dni) &&
        contiene(p.telefono, query.telefono) &&
        contiene(p.codigoUbigeo, query.codigoUbigeo) &&
        (!query.buscar ||
          [
            p.nombres,
            p.apellidoPaterno,
            p.apellidoMaterno,
            p.correoElectronico,
            p.dni,
            p.telefono,
          ].some((v) => contiene(v, query.buscar))),
    );

    if (query.departamento || query.provincia || query.distrito) {
      const permitidos = new Set(
        (
          await this.listarUbigeos({
            ...new ListarUbigeosDto(),
            mostrarTodos: true,
            departamento: query.departamento,
            provincia: query.provincia,
            distrito: query.distrito,
          })
        ).items.map((u) => u.idUbigeo),
      );
      items = items.filter(
        (p) => p.codigoUbigeo && permitidos.has(p.codigoUbigeo),
      );
    }
    return this.paginarYOrdenar(items, query);
  }

  async listarUbigeos(
    query: ListarUbigeosDto,
  ): Promise<ResultadoPaginado<Ubigeo>> {
    let items = (await this.prisma.client.orm.public.Ubigeo.all()) as Ubigeo[];
    const texto = (value: unknown) =>
      String(value ?? '').toLocaleLowerCase('es-PE');
    const contiene = (value: unknown, filtro?: string) =>
      !filtro || texto(value).includes(texto(filtro));
    items = items.filter(
      (u) =>
        (!query.idUbigeo || u.idUbigeo === query.idUbigeo) &&
        contiene(u.departamento, query.departamento) &&
        contiene(u.provincia, query.provincia) &&
        contiene(u.distrito, query.distrito) &&
        (!query.buscar ||
          [u.idUbigeo, u.departamento, u.provincia, u.distrito].some((v) =>
            contiene(v, query.buscar),
          )),
    );
    return this.paginarYOrdenar(items, query);
  }

  private paginarYOrdenar<T extends object>(
    items: T[],
    query: {
      pagina: number;
      limite: number;
      mostrarTodos: boolean;
      ordenarPor: string;
      orden: 'asc' | 'desc';
    },
  ): ResultadoPaginado<T> {
    const total = items.length;
    items.sort((a, b) => {
      const left = (a as Record<string, unknown>)[query.ordenarPor];
      const right = (b as Record<string, unknown>)[query.ordenarPor];
      const resultado = String(left ?? '').localeCompare(
        String(right ?? ''),
        'es',
        { numeric: true, sensitivity: 'base' },
      );
      return query.orden === 'asc' ? resultado : -resultado;
    });
    const pagina = query.mostrarTodos ? 1 : query.pagina;
    const limite = query.mostrarTodos ? total : query.limite;
    const totalPaginas = query.mostrarTodos
      ? total
        ? 1
        : 0
      : Math.ceil(total / query.limite);
    const paginados = query.mostrarTodos
      ? items
      : items.slice((pagina - 1) * query.limite, pagina * query.limite);
    return {
      items: paginados,
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
