import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../infrastructure/database/prisma/prisma.service';
import { ProveedoresRepository } from '../../../domain/repositories/proveedores.repository';

@Injectable()
export class PrismaProveedoresRepository extends ProveedoresRepository {
  constructor(private readonly prisma: PrismaService) { super(); }
  orm(): any { return this.prisma.client.orm.public; }
  transaccion<T>(accion: (orm: any) => Promise<T>): Promise<T> {
    return this.prisma.client.transaction(async (tx: any) => accion(tx.orm.public));
  }
}
