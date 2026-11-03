import { Module } from '@nestjs/common';

import { AutenticacionModule } from '../autenticacion/autenticacion.module';
import { PresupuestoModule } from '../presupuesto/presupuesto.module';
import { RiesgosService } from './application/riesgos.service';
import { RiesgosController } from './presentation/riesgos.controller';

@Module({ imports: [AutenticacionModule, PresupuestoModule], controllers: [RiesgosController], providers: [RiesgosService] })
export class RiesgosModule {}
