import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './infrastructure/database/prisma/prisma.module';
import { InvolucradosModule } from './modules/involucrados/involucrados.module';
import { AutenticacionModule } from './modules/autenticacion/autenticacion.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { ProyectosModule } from './modules/proyectos/proyectos.module';
import { CronogramaModule } from './modules/cronograma/cronograma.module';
import { NotificacionesModule } from './modules/notificaciones/notificaciones.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    InvolucradosModule,
    AutenticacionModule,
    UsuariosModule,
    ProyectosModule,
    CronogramaModule,
    NotificacionesModule,
  ],
})
export class AppModule {}
