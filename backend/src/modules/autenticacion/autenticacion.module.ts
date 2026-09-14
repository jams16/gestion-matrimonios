import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { CorreoCuentaPort } from './application/ports/correo-cuenta.port';
import {
  CerrarSesionUseCase,
  ConfirmarCorreoUseCase,
  GestionarUsuariosUseCase,
  IniciarSesionUseCase,
  RecuperarContrasenaUseCase,
  RefrescarSesionUseCase,
  RegistrarUsuarioUseCase,
  SolicitarVerificacionCorreoUseCase,
} from './application/use-cases/autenticacion.use-cases';
import { AutenticacionRepository } from './domain/repositories/autenticacion.repository';
import { PrismaAutenticacionRepository } from './infrastructure/persistence/repositories/prisma-autenticacion.repository';
import { SmtpCorreoCuentaService } from './infrastructure/services/smtp-correo-cuenta.service';
import { AutenticacionController } from './presentation/controllers/autenticacion.controller';
import { JwtAccessGuard } from './presentation/guards/jwt-access.guard';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_ACCESS_SECRET'),
        signOptions: {
          expiresIn: (config.get<string>('JWT_ACCESS_EXPIRATION') ??
            '15m') as never,
        },
      }),
    }),
  ],
  controllers: [AutenticacionController],
  providers: [
    {
      provide: AutenticacionRepository,
      useClass: PrismaAutenticacionRepository,
    },
    { provide: CorreoCuentaPort, useClass: SmtpCorreoCuentaService },
    RegistrarUsuarioUseCase,
    IniciarSesionUseCase,
    RefrescarSesionUseCase,
    CerrarSesionUseCase,
    SolicitarVerificacionCorreoUseCase,
    ConfirmarCorreoUseCase,
    RecuperarContrasenaUseCase,
    GestionarUsuariosUseCase,
    JwtAccessGuard,
  ],
  exports: [GestionarUsuariosUseCase, JwtAccessGuard],
})
export class AutenticacionModule {}
