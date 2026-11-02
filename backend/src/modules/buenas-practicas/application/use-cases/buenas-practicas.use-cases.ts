import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import type { ActualizarBuenaPracticaDto, CrearBuenaPracticaDto, ListarBuenasPracticasDto } from '../dto/buenas-practicas.dto';
import { BuenasPracticasRepository } from '../../domain/repositories/buenas-practicas.repository';

const fecha = (valor?: string) => valor ? new Date(`${valor}T00:00:00.000Z`) : undefined;

@Injectable()
export class CrearBuenaPracticaUseCase {
  constructor(private readonly repositorio: BuenasPracticasRepository) {}
  async ejecutar(dto: CrearBuenaPracticaDto, idUsuario: number) {
    await validar(dto, this.repositorio);
    try { return await this.repositorio.crear({ ...normalizar(dto), idUsuarioCreacion: idUsuario }); }
    catch (error: any) { if (String(error?.message ?? '').toLowerCase().includes('unique')) throw new ConflictException('El código de buena práctica ya existe.'); throw error; }
  }
}

@Injectable()
export class ListarBuenasPracticasUseCase {
  constructor(private readonly repositorio: BuenasPracticasRepository) {}
  ejecutar(q: ListarBuenasPracticasDto) {
    const where: Record<string, unknown> = {};
    if (!q.mostrarTodos) where.estado = q.estado ?? true;
    else if (q.estado !== undefined) where.estado = q.estado;
    if (q.categoria) where.categoria = q.categoria;
    if (q.areaGestion) where.areaGestion = q.areaGestion;
    if (q.idFaseProyecto) where.idFaseProyecto = q.idFaseProyecto;
    if (q.buscar) where.OR = ['codigo', 'nombre', 'categoria', 'areaGestion', 'descripcionResumida', 'fuenteMetodologica'].map((campo) => ({ [campo]: { contains: q.buscar, mode: 'insensitive' } }));
    return this.repositorio.listar(where);
  }
}

@Injectable()
export class ObtenerBuenaPracticaUseCase {
  constructor(private readonly repositorio: BuenasPracticasRepository) {}
  async ejecutar(id: string) { const valor = await this.repositorio.obtener(id); if (!valor) throw new NotFoundException('La buena práctica no existe.'); return valor; }
}

@Injectable()
export class ActualizarBuenaPracticaUseCase {
  constructor(private readonly repositorio: BuenasPracticasRepository) {}
  async ejecutar(id: string, dto: ActualizarBuenaPracticaDto, idUsuario: number) {
    await new ObtenerBuenaPracticaUseCase(this.repositorio).ejecutar(id);
    await validar(dto, this.repositorio);
    try { return await this.repositorio.actualizar(id, { ...normalizar(dto), idUsuarioModificacion: idUsuario }); }
    catch (error: any) { if (String(error?.message ?? '').toLowerCase().includes('unique')) throw new ConflictException('El código de buena práctica ya existe.'); throw error; }
  }
}

@Injectable()
export class DesactivarBuenaPracticaUseCase {
  constructor(private readonly repositorio: BuenasPracticasRepository) {}
  async ejecutar(id: string, idUsuario: number) { await new ObtenerBuenaPracticaUseCase(this.repositorio).ejecutar(id); return this.repositorio.actualizar(id, { estado: false, idUsuarioModificacion: idUsuario }); }
}

async function validar(dto: Partial<CrearBuenaPracticaDto>, repositorio: BuenasPracticasRepository) {
  if (dto.idFaseProyecto && !(await repositorio.existeFase(dto.idFaseProyecto))) throw new BadRequestException('La fase de proyecto indicada no existe.');
  if (dto.fechaVigencia && dto.fechaFinVigencia && fecha(dto.fechaVigencia)! > fecha(dto.fechaFinVigencia)!) throw new BadRequestException('La fecha de fin de vigencia no puede ser anterior a la fecha de vigencia.');
}
function normalizar(dto: Partial<CrearBuenaPracticaDto>): Record<string, unknown> {
  const resultado: Record<string, unknown> = { ...dto };
  if (dto.fechaVigencia) resultado.fechaVigencia = fecha(dto.fechaVigencia);
  if (dto.fechaFinVigencia) resultado.fechaFinVigencia = fecha(dto.fechaFinVigencia);
  return resultado;
}
