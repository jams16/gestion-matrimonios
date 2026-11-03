import { Module } from '@nestjs/common';

import { AutenticacionModule } from '../autenticacion/autenticacion.module';
import { PresupuestoService } from './application/presupuesto.service';
import { PresupuestoController } from './presentation/presupuesto.controller';

@Module({
  imports: [AutenticacionModule],
  controllers: [PresupuestoController],
  providers: [PresupuestoService],
  exports: [PresupuestoService],
})
export class PresupuestoModule {}
