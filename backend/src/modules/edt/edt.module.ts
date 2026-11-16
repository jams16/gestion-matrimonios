import { Module } from '@nestjs/common';
import { AutenticacionModule } from '../autenticacion/autenticacion.module';
import { EdtService } from './application/edt.service';
import { EdtController, EdtMatrimoniosController } from './presentation/edt.controller';

@Module({ imports: [AutenticacionModule], controllers: [EdtController, EdtMatrimoniosController], providers: [EdtService], exports: [EdtService] })
export class EdtModule {}
