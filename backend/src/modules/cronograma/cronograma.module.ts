import { Module } from '@nestjs/common';
import { GenerarCronogramaDesdePlantillaUseCase } from './application/use-cases/generar-cronograma-desde-plantilla.use-case';
import { CronogramaDateService } from './application/services/cronograma-date.service';
import { CronogramaRepository } from './domain/repositories/cronograma.repository';
import { PrismaCronogramaRepository } from './infrastructure/persistence/repositories/prisma-cronograma.repository';

@Module({
  providers: [
    CronogramaDateService,
    GenerarCronogramaDesdePlantillaUseCase,
    { provide: CronogramaRepository, useClass: PrismaCronogramaRepository },
  ],
  exports: [CronogramaDateService, GenerarCronogramaDesdePlantillaUseCase],
})
export class CronogramaModule {}
