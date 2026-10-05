import { Module } from '@nestjs/common';
import { AutenticacionModule } from '../autenticacion/autenticacion.module';

import {
  ActualizarMatrimonioUseCase,
  CrearMatrimonioUseCase,
  EliminarMatrimonioUseCase,
  ListarMatrimoniosUseCase,
  ListarResumenMatrimoniosUseCase,
  ObtenerMatrimonioUseCase,
} from './application/use-cases/matrimonios.use-cases';
import { GuardarOnboardingMatrimonioUseCase, ObtenerOnboardingMatrimonioUseCase } from './application/use-cases/onboarding-matrimonio.use-case';
import {
  ActualizarProyectoUseCase,
  CrearProyectoUseCase,
  ListarProyectosUseCase,
  ObtenerProyectoUseCase,
  ValidarProyectoSinMatrimonioUseCase,
} from './application/use-cases/proyectos.use-cases';
import { ProyectosRepository } from './domain/repositories/proyectos.repository';
import { PrismaProyectosRepository } from './infrastructure/persistence/repositories/prisma-proyectos.repository';
import { MatrimoniosController } from './presentation/controllers/matrimonios.controller';
import { ProyectosController } from './presentation/controllers/proyectos.controller';

@Module({
  imports: [AutenticacionModule],
  controllers: [ProyectosController, MatrimoniosController],
  providers: [
    CrearProyectoUseCase,
    ObtenerProyectoUseCase,
    ListarProyectosUseCase,
    ActualizarProyectoUseCase,
    ValidarProyectoSinMatrimonioUseCase,
    CrearMatrimonioUseCase,
    ObtenerMatrimonioUseCase,
    ListarMatrimoniosUseCase,
    ListarResumenMatrimoniosUseCase,
    ActualizarMatrimonioUseCase,
    EliminarMatrimonioUseCase,
    GuardarOnboardingMatrimonioUseCase,
    ObtenerOnboardingMatrimonioUseCase,
    { provide: ProyectosRepository, useClass: PrismaProyectosRepository },
  ],
})
export class ProyectosModule {}
