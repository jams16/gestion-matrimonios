import { Module } from '@nestjs/common';

import { AutenticacionModule } from '../autenticacion/autenticacion.module';
import { AlertasCronogramaService } from './application/services/alertas-cronograma.service';
import {
  ConsultarNotificacionesCronogramaUseCase,
  GenerarAlertasCronogramaUseCase,
  NotificacionesCronogramaService,
} from './application/use-cases/notificaciones-cronograma.use-cases';
import { NotificacionesCronogramaPort } from './domain/ports/notificaciones-cronograma.port';
import { NotificacionesRepository } from './domain/repositories/notificaciones.repository';
import { PrismaNotificacionesRepository } from './infrastructure/persistence/repositories/prisma-notificaciones.repository';
import { NotificacionesCronogramaController } from './presentation/controllers/notificaciones-cronograma.controller';

@Module({
  imports: [AutenticacionModule],
  controllers: [NotificacionesCronogramaController],
  providers: [
    AlertasCronogramaService,
    GenerarAlertasCronogramaUseCase,
    ConsultarNotificacionesCronogramaUseCase,
    NotificacionesCronogramaService,
    {
      provide: NotificacionesRepository,
      useClass: PrismaNotificacionesRepository,
    },
    {
      provide: NotificacionesCronogramaPort,
      useExisting: NotificacionesCronogramaService,
    },
  ],
  exports: [NotificacionesCronogramaPort],
})
export class NotificacionesModule {}
