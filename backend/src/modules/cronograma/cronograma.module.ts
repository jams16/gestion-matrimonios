import { Module } from '@nestjs/common';
import { AutenticacionModule } from '../autenticacion/autenticacion.module';
import { GenerarCronogramaDesdePlantillaUseCase } from './application/use-cases/generar-cronograma-desde-plantilla.use-case';
import {
  ConsultarCronogramaUseCase,
  GestionarActividadesUseCase,
  GestionarDependenciasUseCase,
  GestionarHitosUseCase,
  GestionarTimingUseCase,
} from './application/use-cases/gestionar-cronograma.use-cases';
import { CronogramaDateService } from './application/services/cronograma-date.service';
import { CronogramaRepository } from './domain/repositories/cronograma.repository';
import { CronogramaCrudRepository } from './domain/repositories/cronograma-crud.repository';
import { PrismaCronogramaRepository } from './infrastructure/persistence/repositories/prisma-cronograma.repository';
import { CronogramaController } from './presentation/controllers/cronograma.controller';

@Module({
  imports: [AutenticacionModule],
  controllers: [CronogramaController],
  providers: [
    CronogramaDateService,
    GenerarCronogramaDesdePlantillaUseCase,
    { provide: CronogramaRepository, useClass: PrismaCronogramaRepository },
    { provide: CronogramaCrudRepository, useExisting: CronogramaRepository },
    GestionarHitosUseCase,
    GestionarActividadesUseCase,
    GestionarDependenciasUseCase,
    GestionarTimingUseCase,
    ConsultarCronogramaUseCase,
  ],
  exports: [CronogramaDateService, GenerarCronogramaDesdePlantillaUseCase],
})
export class CronogramaModule {}
