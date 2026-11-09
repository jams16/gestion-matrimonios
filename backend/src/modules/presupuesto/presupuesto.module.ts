import { Module } from '@nestjs/common';

import { AutenticacionModule } from '../autenticacion/autenticacion.module';
import { CronogramaModule } from '../cronograma/cronograma.module';
import { PresupuestoService } from './application/presupuesto.service';
import { PresupuestoController } from './presentation/presupuesto.controller';

@Module({
  imports: [AutenticacionModule, CronogramaModule],
  controllers: [PresupuestoController],
  providers: [PresupuestoService],
  exports: [PresupuestoService],
})
export class PresupuestoModule {}
