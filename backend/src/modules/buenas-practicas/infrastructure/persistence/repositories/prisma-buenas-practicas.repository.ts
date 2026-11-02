import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../infrastructure/database/prisma/prisma.service';
import { BuenasPracticasRepository } from '../../../domain/repositories/buenas-practicas.repository';

@Injectable()
export class PrismaBuenasPracticasRepository extends BuenasPracticasRepository {
  constructor(private readonly prisma: PrismaService) { super(); }
  private get orm(): any { return this.prisma.client.orm.public; }
  crear(data: Record<string, unknown>): Promise<any> { return this.orm.BuenaPractica.create(data as any); }
  obtener(id: string): Promise<any | null> { return this.orm.BuenaPractica.first({ idBuenaPractica: id as never }); }
  async listar(filtros: Record<string, any>): Promise<any[]> {
    const datos = await this.orm.BuenaPractica.all();
    const texto = filtros.OR?.[0]?.codigo?.contains?.toLowerCase();
    return datos.filter((item: any) =>
      (filtros.estado === undefined || item.estado === filtros.estado) &&
      (!filtros.categoria || item.categoria === filtros.categoria) &&
      (!filtros.areaGestion || item.areaGestion === filtros.areaGestion) &&
      (!filtros.idFaseProyecto || item.idFaseProyecto === filtros.idFaseProyecto) &&
      (!texto || [item.codigo, item.nombre, item.categoria, item.areaGestion, item.descripcionResumida, item.fuenteMetodologica].some((valor) => String(valor ?? '').toLowerCase().includes(texto))),
    ).sort((a: any, b: any) => a.ordenVisualizacion - b.ordenVisualizacion || a.nombre.localeCompare(b.nombre));
  }
  actualizar(id: string, data: Record<string, unknown>): Promise<any> { return this.orm.BuenaPractica.where({ idBuenaPractica: id as never }).update(data as never); }
  async existeFase(idFaseProyecto: number): Promise<boolean> { return !!await this.orm.FaseProyecto.first({ idFaseProyecto: idFaseProyecto as never }); }
}
