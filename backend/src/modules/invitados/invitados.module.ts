import { Module } from '@nestjs/common';
import { AutenticacionModule } from '../autenticacion/autenticacion.module';
import { InvitadosService } from './application/invitados.service';
import { InvitadosController } from './presentation/invitados.controller';

@Module({ imports: [AutenticacionModule], controllers: [InvitadosController], providers: [InvitadosService] })
export class InvitadosModule {}
