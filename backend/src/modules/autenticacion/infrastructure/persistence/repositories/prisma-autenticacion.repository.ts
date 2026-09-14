import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../../infrastructure/database/prisma/prisma.service';
import { QueryUsuarioDto } from '../../../application/dto/autenticacion.dto';
import {
  ResultadoPaginadoUsuario,
  AutenticacionRepository,
} from '../../../domain/repositories/autenticacion.repository';
import {
  Sesion,
  TokenCuenta,
  Usuario,
} from '../../../domain/entities/usuario.entity';
import { TipoTokenCuenta } from '../../../domain/enums/tipo-token-cuenta.enum';

@Injectable()
export class PrismaAutenticacionRepository implements AutenticacionRepository {
  constructor(private readonly prisma: PrismaService) {}

  crearUsuario(
    data: Omit<
      Usuario,
      | 'idUsuario'
      | 'correoVerificado'
      | 'esActivo'
      | 'fechaCreacion'
      | 'fechaModificacion'
    >,
  ): Promise<Usuario> {
    return this.prisma.client.orm.public.Usuario.create(
      data as never,
    ) as Promise<Usuario>;
  }
  obtenerUsuario(id: number): Promise<Usuario | null> {
    return this.prisma.client.orm.public.Usuario.first({
      idUsuario: id,
    }) as Promise<Usuario | null>;
  }
  async buscarUsuario(identificador: string): Promise<Usuario | null> {
    const usuarios =
      (await this.prisma.client.orm.public.Usuario.all()) as Usuario[];
    const clave = identificador.toLocaleLowerCase('es-PE');
    const porUsuario = usuarios.find(
      (u) => u.usuario.toLocaleLowerCase('es-PE') === clave,
    );
    if (porUsuario) return porUsuario;
    const personas =
      (await this.prisma.client.orm.public.PersonaNatural.all()) as Array<{
        idPersonaNatural: number;
        correoElectronico: string;
      }>;
    const persona = personas.find(
      (p) => p.correoElectronico.toLocaleLowerCase('es-PE') === clave,
    );
    return persona
      ? (usuarios.find(
          (u) => u.idPersonaNatural === persona.idPersonaNatural,
        ) ?? null)
      : null;
  }
  async usuarioExiste(usuario: string, excluirId?: number): Promise<boolean> {
    const encontrado = await this.buscarUsuario(usuario);
    return !!encontrado && encontrado.idUsuario !== excluirId;
  }
  async actualizarUsuario(
    id: number,
    data: Partial<Usuario>,
  ): Promise<Usuario | null> {
    if (!(await this.obtenerUsuario(id))) return null;
    return this.prisma.client.orm.public.Usuario.where({
      idUsuario: id,
    }).update(data as never) as Promise<Usuario>;
  }
  async listarUsuarios(
    query: QueryUsuarioDto,
  ): Promise<ResultadoPaginadoUsuario> {
    const usuarios =
      (await this.prisma.client.orm.public.Usuario.all()) as Usuario[];
    const personas =
      (await this.prisma.client.orm.public.PersonaNatural.all()) as Array<{
        idPersonaNatural: number;
        nombres: string;
        apellidoPaterno: string;
        apellidoMaterno: string | null;
        correoElectronico: string;
      }>;
    const texto = (v: unknown) => String(v ?? '').toLocaleLowerCase('es-PE');
    const contiene = (v: unknown, f?: string) =>
      !f || texto(v).includes(texto(f));
    let items = usuarios.filter((u) => {
      const p = personas.find(
        (persona) => persona.idPersonaNatural === u.idPersonaNatural,
      );
      return (
        (!query.idUsuario || u.idUsuario === query.idUsuario) &&
        (!query.idPersonaNatural ||
          u.idPersonaNatural === query.idPersonaNatural) &&
        (!query.idEntidad || u.idEntidad === query.idEntidad) &&
        (!query.tipoUsuario || u.tipoUsuario === query.tipoUsuario) &&
        (query.correoVerificado === undefined ||
          u.correoVerificado === query.correoVerificado) &&
        (query.esActivo === undefined || u.esActivo === query.esActivo) &&
        (!query.buscar ||
          [
            u.usuario,
            p?.nombres,
            p?.apellidoPaterno,
            p?.apellidoMaterno,
            p?.correoElectronico,
          ].some((v) => contiene(v, query.buscar)))
      );
    });
    items = items.sort((a, b) => {
      const x = String(
        (a as unknown as Record<string, unknown>)[query.ordenarPor] ?? '',
      );
      const y = String(
        (b as unknown as Record<string, unknown>)[query.ordenarPor] ?? '',
      );
      const result = x.localeCompare(y, 'es', {
        numeric: true,
        sensitivity: 'base',
      });
      return query.orden === 'asc' ? result : -result;
    });
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
  async personaExiste(id: number) {
    const p = (await this.prisma.client.orm.public.PersonaNatural.first({
      idPersonaNatural: id,
    })) as {
      correoElectronico: string;
      nombres: string;
      apellidoPaterno: string;
    } | null;
    return p;
  }
  async entidadExiste(id: number): Promise<boolean> {
    return !!(await this.prisma.client.orm.public.Entidad.first({
      idEntidad: id,
    }));
  }
  crearSesion(
    data: Omit<Sesion, 'idSesion' | 'fechaCreacion' | 'fechaRevocacion'>,
  ): Promise<Sesion> {
    return this.prisma.client.orm.public.Sesion.create(
      data as never,
    ) as Promise<Sesion>;
  }
  obtenerSesion(id: number): Promise<Sesion | null> {
    return this.prisma.client.orm.public.Sesion.first({
      idSesion: id,
    }) as Promise<Sesion | null>;
  }
  async revocarSesion(id: number, fecha: Date): Promise<void> {
    await this.prisma.client.orm.public.Sesion.where({ idSesion: id }).update({
      fechaRevocacion: fecha,
    } as never);
  }
  async revocarSesionesUsuario(idUsuario: number, fecha: Date): Promise<void> {
    const sesiones = (await this.prisma.client.orm.public.Sesion.where({
      idUsuario,
    }).all()) as Sesion[];
    await Promise.all(
      sesiones
        .filter((s) => !s.fechaRevocacion)
        .map((s) => this.revocarSesion(s.idSesion, fecha)),
    );
  }
  crearTokenCuenta(
    data: Omit<TokenCuenta, 'idToken' | 'fechaCreacion' | 'fechaUtilizacion'>,
  ): Promise<TokenCuenta> {
    return this.prisma.client.orm.public.TokenCuenta.create(
      data as never,
    ) as Promise<TokenCuenta>;
  }
  async buscarTokenCuenta(
    hash: string,
    tipo: TipoTokenCuenta,
  ): Promise<TokenCuenta | null> {
    const tokens =
      (await this.prisma.client.orm.public.TokenCuenta.all()) as TokenCuenta[];
    return (
      tokens.find(
        (t) =>
          t.tokenHash === hash && t.tipoToken === tipo && !t.fechaUtilizacion,
      ) ?? null
    );
  }
  async usarTokenCuenta(id: number, fecha: Date): Promise<void> {
    await this.prisma.client.orm.public.TokenCuenta.where({
      idToken: id,
    }).update({ fechaUtilizacion: fecha } as never);
  }
}
