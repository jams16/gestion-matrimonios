import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import type { ActualizarBuenaPracticaDto, CrearBuenaPracticaDto, ListarBuenasPracticasDto } from '../dto/buenas-practicas.dto';
import { BuenasPracticasRepository } from '../../domain/repositories/buenas-practicas.repository';

@Injectable()
export class CrearBuenaPracticaUseCase {
  constructor(private readonly repositorio: BuenasPracticasRepository) {}

  async ejecutar(dto: CrearBuenaPracticaDto, idUsuario: number) {
    await validar(dto, this.repositorio);
    try {
      return await this.repositorio.crear({ ...dto, idUsuarioCreacion: BigInt(idUsuario) });
    } catch (error: any) {
      if (String(error?.message ?? '').toLowerCase().includes('unique')) throw new ConflictException('El código de buena práctica ya existe.');
      throw error;
    }
  }
}

@Injectable()
export class ListarBuenasPracticasUseCase {
  constructor(private readonly repositorio: BuenasPracticasRepository) {}

  ejecutar(q: ListarBuenasPracticasDto) {
    const where: Record<string, unknown> = {};
    if (!q.mostrarTodos) where.estado = q.estado ?? true;
    else if (q.estado !== undefined) where.estado = q.estado;
    if (q.areaGestion) where.areaGestion = q.areaGestion;
    if (q.idFaseProyecto !== undefined) where.idFaseProyecto = q.idFaseProyecto;
    if (q.buscar) where.buscar = q.buscar;
    return this.repositorio.listar(where);
  }
}

@Injectable()
export class ObtenerBuenaPracticaUseCase {
  constructor(private readonly repositorio: BuenasPracticasRepository) {}

  async ejecutar(id: string) {
    const valor = await this.repositorio.obtener(idSeguro(id));
    if (!valor) throw new NotFoundException('La buena práctica no existe.');
    return valor;
  }
}

@Injectable()
export class ActualizarBuenaPracticaUseCase {
  constructor(private readonly repositorio: BuenasPracticasRepository) {}

  async ejecutar(id: string, dto: ActualizarBuenaPracticaDto, idUsuario: number) {
    const idSeguroValor = idSeguro(id);
    await new ObtenerBuenaPracticaUseCase(this.repositorio).ejecutar(id);
    await validar(dto, this.repositorio);
    try {
      return await this.repositorio.actualizar(idSeguroValor, {
        ...dto,
        idUsuarioModificacion: BigInt(idUsuario),
        fechaModificacion: new Date(),
      });
    } catch (error: any) {
      if (String(error?.message ?? '').toLowerCase().includes('unique')) throw new ConflictException('El código de buena práctica ya existe.');
      throw error;
    }
  }
}

@Injectable()
export class DesactivarBuenaPracticaUseCase {
  constructor(private readonly repositorio: BuenasPracticasRepository) {}

  async ejecutar(id: string, idUsuario: number) {
    const idSeguroValor = idSeguro(id);
    await new ObtenerBuenaPracticaUseCase(this.repositorio).ejecutar(id);
    return this.repositorio.actualizar(idSeguroValor, {
      estado: false,
      idUsuarioModificacion: BigInt(idUsuario),
      fechaModificacion: new Date(),
    });
  }
}

async function validar(dto: Partial<CrearBuenaPracticaDto>, repositorio: BuenasPracticasRepository) {
  if (dto.idFaseProyecto !== undefined && !(await repositorio.existeFase(dto.idFaseProyecto))) {
    throw new BadRequestException('La fase de proyecto indicada no existe.');
  }
}

function idSeguro(valor: string): bigint {
  try {
    const id = BigInt(valor);
    if (id < 1n) throw new Error();
    return id;
  } catch {
    throw new BadRequestException('El identificador de buena práctica no es válido.');
  }
}
