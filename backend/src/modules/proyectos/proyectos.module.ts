import { Module } from '@nestjs/common';

import {
  ActualizarMatrimonioUseCase,
  CrearMatrimonioUseCase,
  EliminarMatrimonioUseCase,
  ListarMatrimoniosUseCase,
  ObtenerMatrimonioUseCase,
} from './application/use-cases/matrimonios.use-cases';
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
    ActualizarMatrimonioUseCase,
    EliminarMatrimonioUseCase,
    { provide: ProyectosRepository, useClass: PrismaProyectosRepository },
  ],
})
export class ProyectosModule {}
