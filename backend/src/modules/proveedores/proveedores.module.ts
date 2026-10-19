import { Module } from '@nestjs/common';
import { AutenticacionModule } from '../autenticacion/autenticacion.module';
import { ProveedoresService } from './application/proveedores.service';
import { ProveedoresController } from './presentation/proveedores.controller';
import { ProveedoresRepository } from './domain/repositories/proveedores.repository';
import { PrismaProveedoresRepository } from './infrastructure/persistence/repositories/prisma-proveedores.repository';
import * as UseCases from './application/use-cases/proveedores.use-cases';

@Module({ imports: [AutenticacionModule], controllers: [ProveedoresController], providers: [ProveedoresService, { provide: ProveedoresRepository, useClass: PrismaProveedoresRepository }, ...Object.values(UseCases)] })
export class ProveedoresModule {}
