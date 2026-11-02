import { Module } from '@nestjs/common';
import { AutenticacionModule } from '../autenticacion/autenticacion.module';
import { BuenasPracticasController } from './presentation/buenas-practicas.controller';
import { BuenasPracticasRepository } from './domain/repositories/buenas-practicas.repository';
import { PrismaBuenasPracticasRepository } from './infrastructure/persistence/repositories/prisma-buenas-practicas.repository';
import * as UseCases from './application/use-cases/buenas-practicas.use-cases';

@Module({ imports: [AutenticacionModule], controllers: [BuenasPracticasController], providers: [{ provide: BuenasPracticasRepository, useClass: PrismaBuenasPracticasRepository }, ...Object.values(UseCases)] })
export class BuenasPracticasModule {}
