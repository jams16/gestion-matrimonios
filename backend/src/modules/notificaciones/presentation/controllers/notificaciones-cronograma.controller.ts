import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAccessGuard } from '../../../autenticacion/presentation/guards/jwt-access.guard';
import { ListarNotificacionesCronogramaDto } from '../../application/dto/notificaciones.dto';
import { ConsultarNotificacionesCronogramaUseCase } from '../../application/use-cases/notificaciones-cronograma.use-cases';

@ApiTags('Notificaciones de cronograma')
@ApiBearerAuth()
@UseGuards(JwtAccessGuard)
@Controller('proyectos/:idProyecto/cronograma/notificaciones')
export class NotificacionesCronogramaController {
  constructor(
    private readonly notificaciones: ConsultarNotificacionesCronogramaUseCase,
  ) {}
  @Get()
  @ApiOperation({
    summary: 'Listar notificaciones del cronograma para el usuario autenticado',
  })
  async listar(
    @Param('idProyecto', ParseUUIDPipe) idProyecto: string,
    @Query() query: ListarNotificacionesCronogramaDto,
    @Req() request: { usuarioAutenticado: { sub: number } },
  ) {
    return {
      mensaje: 'Notificaciones obtenidas correctamente.',
      data: await this.notificaciones.listar(
        idProyecto,
        request.usuarioAutenticado.sub,
        query,
      ),
    };
  }
  @Get('resumen')
  @ApiOperation({
    summary: 'Obtener el resumen de notificaciones del cronograma',
  })
  async resumen(
    @Param('idProyecto', ParseUUIDPipe) idProyecto: string,
    @Req() request: { usuarioAutenticado: { sub: number } },
  ) {
    return {
      mensaje: 'Resumen de notificaciones obtenido correctamente.',
      data: await this.notificaciones.resumen(
        idProyecto,
        request.usuarioAutenticado.sub,
      ),
    };
  }
  @Patch('marcar-todas-leidas')
  @ApiOperation({
    summary: 'Marcar todas las notificaciones activas como leídas',
  })
  async marcarTodas(
    @Param('idProyecto', ParseUUIDPipe) idProyecto: string,
    @Req() request: { usuarioAutenticado: { sub: number } },
  ) {
    return {
      mensaje: 'Notificaciones marcadas como leídas.',
      data: await this.notificaciones.marcarTodasLeidas(
        idProyecto,
        request.usuarioAutenticado.sub,
      ),
    };
  }
  @Patch(':idNotificacion/leida')
  @ApiOperation({ summary: 'Marcar una notificación como leída' })
  async marcarLeida(
    @Param('idProyecto', ParseUUIDPipe) idProyecto: string,
    @Param('idNotificacion', ParseUUIDPipe) idNotificacion: string,
    @Req() request: { usuarioAutenticado: { sub: number } },
  ) {
    return {
      mensaje: 'Notificación marcada como leída.',
      data: await this.notificaciones.marcarLeida(
        idProyecto,
        idNotificacion,
        request.usuarioAutenticado.sub,
      ),
    };
  }
}
