import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  QueryUsuarioDto,
  UpdateUsuarioDto,
} from '../../../autenticacion/application/dto/autenticacion.dto';
import { GestionarUsuariosUseCase } from '../../../autenticacion/application/use-cases/autenticacion.use-cases';
import { JwtAccessGuard } from '../../../autenticacion/presentation/guards/jwt-access.guard';

@ApiTags('Usuarios')
@ApiBearerAuth()
@UseGuards(JwtAccessGuard)
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuarios: GestionarUsuariosUseCase) {}
  @Get()
  @ApiOperation({ summary: 'Listar usuarios' })
  @ApiOkResponse({ description: 'Usuarios obtenidos correctamente.' })
  async listar(@Query() query: QueryUsuarioDto) {
    return {
      mensaje: 'Usuarios obtenidos correctamente.',
      data: await this.usuarios.listar(query),
    };
  }
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario sin datos sensibles' })
  @ApiParam({ name: 'id', type: Number })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado.' })
  async obtener(@Param('id', ParseIntPipe) id: number) {
    return {
      mensaje: 'Usuario obtenido correctamente.',
      data: await this.usuarios.obtener(id),
    };
  }
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar campos permitidos de un usuario' })
  @ApiParam({ name: 'id', type: Number })
  async actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUsuarioDto,
  ) {
    return {
      mensaje: 'Usuario actualizado correctamente.',
      data: await this.usuarios.actualizar(id, dto),
    };
  }
  @Delete(':id')
  @ApiOperation({ summary: 'Desactivar usuario y revocar sesiones activas' })
  @ApiParam({ name: 'id', type: Number })
  async eliminar(@Param('id', ParseIntPipe) id: number) {
    return {
      mensaje: 'Usuario desactivado correctamente.',
      data: await this.usuarios.eliminar(id),
    };
  }
}
