import { Module } from '@nestjs/common';

import {
  ActualizarPersonaUseCase,
  CrearPersonaUseCase,
  EliminarPersonaUseCase,
  ImportarPersonasUseCase,
  ListarPersonasUseCase,
  ObtenerPersonaUseCase,
} from './application/use-cases/personas.use-cases';
import {
  ListarUbigeosUseCase,
  ObtenerUbigeoUseCase,
} from './application/use-cases/ubigeos.use-cases';
import { InvolucradosRepository } from './domain/repositories/involucrados.repository';
import { PrismaInvolucradosRepository } from './infrastructure/persistence/repositories/prisma-involucrados.repository';
import { PersonasController } from './presentation/controllers/personas.controller';
import { UbigeosController } from './presentation/controllers/ubigeos.controller';

@Module({
  controllers: [PersonasController, UbigeosController],
  providers: [
    CrearPersonaUseCase,
    ObtenerPersonaUseCase,
    ListarPersonasUseCase,
    ActualizarPersonaUseCase,
    EliminarPersonaUseCase,
    ImportarPersonasUseCase,
    ObtenerUbigeoUseCase,
    ListarUbigeosUseCase,
    { provide: InvolucradosRepository, useClass: PrismaInvolucradosRepository },
  ],
})
export class InvolucradosModule {}
