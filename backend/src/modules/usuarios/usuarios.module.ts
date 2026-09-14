import { Module } from '@nestjs/common';

import { AutenticacionModule } from '../autenticacion/autenticacion.module';
import { UsuariosController } from './presentation/controllers/usuarios.controller';

@Module({
  imports: [AutenticacionModule],
  controllers: [UsuariosController],
})
export class UsuariosModule {}
