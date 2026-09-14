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
  ActualizarEntidadUseCase,
  CrearEntidadUseCase,
  EliminarEntidadUseCase,
  ImportarEntidadesUseCase,
  ListarEntidadesUseCase,
  ObtenerEntidadUseCase,
} from './application/use-cases/entidades.use-cases';
import {
  ListarUbigeosUseCase,
  ObtenerUbigeoUseCase,
} from './application/use-cases/ubigeos.use-cases';
import { InvolucradosRepository } from './domain/repositories/involucrados.repository';
import { PrismaInvolucradosRepository } from './infrastructure/persistence/repositories/prisma-involucrados.repository';
import { PersonasController } from './presentation/controllers/personas.controller';
import { EntidadesController } from './presentation/controllers/entidades.controller';
import { UbigeosController } from './presentation/controllers/ubigeos.controller';

@Module({
  controllers: [PersonasController, UbigeosController, EntidadesController],
  providers: [
    CrearPersonaUseCase,
    ObtenerPersonaUseCase,
    ListarPersonasUseCase,
    ActualizarPersonaUseCase,
    EliminarPersonaUseCase,
    ImportarPersonasUseCase,
    CrearEntidadUseCase,
    ObtenerEntidadUseCase,
    ListarEntidadesUseCase,
    ActualizarEntidadUseCase,
    EliminarEntidadUseCase,
    ImportarEntidadesUseCase,
    ObtenerUbigeoUseCase,
    ListarUbigeosUseCase,
    { provide: InvolucradosRepository, useClass: PrismaInvolucradosRepository },
  ],
})
export class InvolucradosModule {}
