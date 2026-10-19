import { Module } from '@nestjs/common';
import { AutenticacionModule } from '../autenticacion/autenticacion.module';
import { GenerarCronogramaDesdePlantillaUseCase } from './application/use-cases/generar-cronograma-desde-plantilla.use-case';
import { ReprogramarActividadUseCase } from './application/use-cases/reprogramar-actividad.use-case';
import {
  ConsultarCronogramaUseCase,
  GestionarActividadesUseCase,
  GestionarDependenciasUseCase,
  GestionarHitosUseCase,
  GestionarTimingUseCase,
} from './application/use-cases/gestionar-cronograma.use-cases';
import { CronogramaDateService } from './application/services/cronograma-date.service';
import { ReprogramacionActividadesService } from './application/services/reprogramacion-actividades.service';
import { CronogramaRepository } from './domain/repositories/cronograma.repository';
import { CronogramaCrudRepository } from './domain/repositories/cronograma-crud.repository';
import { PrismaCronogramaRepository } from './infrastructure/persistence/repositories/prisma-cronograma.repository';
import { CronogramaController } from './presentation/controllers/cronograma.controller';

@Module({
  imports: [AutenticacionModule],
  controllers: [CronogramaController],
  providers: [
    CronogramaDateService,
    ReprogramacionActividadesService,
    GenerarCronogramaDesdePlantillaUseCase,
    { provide: CronogramaRepository, useClass: PrismaCronogramaRepository },
    { provide: CronogramaCrudRepository, useExisting: CronogramaRepository },
    GestionarHitosUseCase,
    GestionarActividadesUseCase,
    GestionarDependenciasUseCase,
    GestionarTimingUseCase,
    ConsultarCronogramaUseCase,
    ReprogramarActividadUseCase,
  ],
  exports: [CronogramaDateService, GenerarCronogramaDesdePlantillaUseCase],
})
export class CronogramaModule {}
