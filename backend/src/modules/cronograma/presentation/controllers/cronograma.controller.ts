import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAccessGuard } from '../../../autenticacion/presentation/guards/jwt-access.guard';
import {
  ActualizarActividadDto,
  ActualizarHitoDto,
  ActualizarTimingDto,
  CambiarEstadoActividadDto,
  CambiarEstadoHitoDto,
  CambiarEstadoTimingDto,
  CrearActividadDto,
  CrearDependenciaDto,
  CrearHitoDto,
  CrearTimingDto,
  ListarActividadesDto,
  ListarCronogramaDto,
  ListarHitosDto,
  ListarTimingDto,
  ConfirmarReprogramacionActividadDto,
  PrevisualizarReprogramacionActividadDto,
} from '../../application/dto/cronograma.dto';
import {
  ConsultarCronogramaUseCase,
  GestionarActividadesUseCase,
  GestionarDependenciasUseCase,
  GestionarHitosUseCase,
  GestionarTimingUseCase,
} from '../../application/use-cases/gestionar-cronograma.use-cases';
import { ReprogramarActividadUseCase } from '../../application/use-cases/reprogramar-actividad.use-case';

type SolicitudAutenticada = { usuarioAutenticado: { sub: number } };

@ApiTags('Cronograma')
@ApiBearerAuth()
@UseGuards(JwtAccessGuard)
@Controller('proyectos/:idProyecto/cronograma')
export class CronogramaController {
  constructor(
    private readonly consulta: ConsultarCronogramaUseCase,
    private readonly hitos: GestionarHitosUseCase,
    private readonly actividades: GestionarActividadesUseCase,
    private readonly dependencias: GestionarDependenciasUseCase,
    private readonly timing: GestionarTimingUseCase,
    private readonly reprogramarActividad: ReprogramarActividadUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener el cronograma completo de un proyecto' })
  @ApiParam({ name: 'idProyecto', format: 'uuid' })
  @ApiOkResponse({ description: 'Cronograma obtenido correctamente.' })
  async obtenerCronograma(
    @Param('idProyecto', ParseUUIDPipe) idProyecto: string,
    @Query() query: ListarCronogramaDto,
    @Req() request: SolicitudAutenticada,
  ) {
    return {
      mensaje: 'Cronograma obtenido correctamente.',
      data: await this.consulta.obtener(
        idProyecto,
        request.usuarioAutenticado.sub,
        query.activo ?? true,
      ),
    };
  }

  @Get('resumen')
  @ApiOperation({ summary: 'Obtener el resumen del cronograma de un proyecto' })
  async resumen(
    @Param('idProyecto', ParseUUIDPipe) idProyecto: string,
    @Req() request: SolicitudAutenticada,
  ) {
    return {
      mensaje: 'Resumen del cronograma obtenido correctamente.',
      data: await this.consulta.resumen(
        idProyecto,
        request.usuarioAutenticado.sub,
      ),
    };
  }

  @Get('hitos')
  @ApiOperation({ summary: 'Listar hitos de un proyecto' })
  async listarHitos(
    @Param('idProyecto', ParseUUIDPipe) idProyecto: string,
    @Query() query: ListarHitosDto,
    @Req() request: SolicitudAutenticada,
  ) {
    return {
      mensaje: 'Hitos obtenidos correctamente.',
      data: await this.hitos.listar(
        idProyecto,
        request.usuarioAutenticado.sub,
        query,
      ),
    };
  }
  @Post('hitos')
  @ApiOperation({ summary: 'Crear un hito manual' })
  @ApiCreatedResponse({ description: 'Hito creado correctamente.' })
  async crearHito(
    @Param('idProyecto', ParseUUIDPipe) idProyecto: string,
    @Body() dto: CrearHitoDto,
    @Req() request: SolicitudAutenticada,
  ) {
    return {
      mensaje: 'Hito creado correctamente.',
      data: await this.hitos.crear(
        idProyecto,
        dto,
        request.usuarioAutenticado.sub,
      ),
    };
  }
  @Get('hitos/:idHito')
  @ApiOperation({ summary: 'Obtener un hito por ID' })
  async obtenerHito(
    @Param('idProyecto', ParseUUIDPipe) idProyecto: string,
    @Param('idHito', ParseUUIDPipe) idHito: string,
    @Req() request: SolicitudAutenticada,
  ) {
    return {
      mensaje: 'Hito obtenido correctamente.',
      data: await this.hitos.obtener(
        idProyecto,
        idHito,
        request.usuarioAutenticado.sub,
      ),
    };
  }
  @Patch('hitos/:idHito')
  @ApiOperation({ summary: 'Editar un hito' })
  async actualizarHito(
    @Param('idProyecto', ParseUUIDPipe) idProyecto: string,
    @Param('idHito', ParseUUIDPipe) idHito: string,
    @Body() dto: ActualizarHitoDto,
    @Req() request: SolicitudAutenticada,
  ) {
    return {
      mensaje: 'Hito actualizado correctamente.',
      data: await this.hitos.actualizar(
        idProyecto,
        idHito,
        dto,
        request.usuarioAutenticado.sub,
      ),
    };
  }
  @Patch('hitos/:idHito/estado')
  @ApiOperation({ summary: 'Cambiar el estado de un hito' })
  async cambiarEstadoHito(
    @Param('idProyecto', ParseUUIDPipe) idProyecto: string,
    @Param('idHito', ParseUUIDPipe) idHito: string,
    @Body() dto: CambiarEstadoHitoDto,
    @Req() request: SolicitudAutenticada,
  ) {
    return {
      mensaje: 'Estado del hito actualizado correctamente.',
      data: await this.hitos.cambiarEstado(
        idProyecto,
        idHito,
        dto,
        request.usuarioAutenticado.sub,
      ),
    };
  }
  @Delete('hitos/:idHito')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Desactivar lógicamente un hito' })
  async eliminarHito(
    @Param('idProyecto', ParseUUIDPipe) idProyecto: string,
    @Param('idHito', ParseUUIDPipe) idHito: string,
    @Req() request: SolicitudAutenticada,
  ) {
    return {
      mensaje: 'Hito desactivado correctamente.',
      data: await this.hitos.eliminar(
        idProyecto,
        idHito,
        request.usuarioAutenticado.sub,
      ),
    };
  }

  @Get('actividades')
  @ApiOperation({ summary: 'Listar actividades de un proyecto' })
  async listarActividades(
    @Param('idProyecto', ParseUUIDPipe) idProyecto: string,
    @Query() query: ListarActividadesDto,
    @Req() request: SolicitudAutenticada,
  ) {
    return {
      mensaje: 'Actividades obtenidas correctamente.',
      data: await this.actividades.listar(
        idProyecto,
        request.usuarioAutenticado.sub,
        query,
      ),
    };
  }
  @Post('actividades')
  @ApiOperation({ summary: 'Crear una actividad manual' })
  async crearActividad(
    @Param('idProyecto', ParseUUIDPipe) idProyecto: string,
    @Body() dto: CrearActividadDto,
    @Req() request: SolicitudAutenticada,
  ) {
    return {
      mensaje: 'Actividad creada correctamente.',
      data: await this.actividades.crear(
        idProyecto,
        dto,
        request.usuarioAutenticado.sub,
      ),
    };
  }
  @Get('actividades/:idActividad')
  @ApiOperation({ summary: 'Obtener una actividad por ID' })
  async obtenerActividad(
    @Param('idProyecto', ParseUUIDPipe) idProyecto: string,
    @Param('idActividad', ParseUUIDPipe) idActividad: string,
    @Req() request: SolicitudAutenticada,
  ) {
    return {
      mensaje: 'Actividad obtenida correctamente.',
      data: await this.actividades.obtener(
        idProyecto,
        idActividad,
        request.usuarioAutenticado.sub,
      ),
    };
  }
  @Post('actividades/:idActividad/reprogramacion/preview')
  @ApiOperation({
    summary: 'Previsualizar el impacto de reprogramar una actividad',
  })
  async previsualizarReprogramacion(
    @Param('idProyecto', ParseUUIDPipe) idProyecto: string,
    @Param('idActividad', ParseUUIDPipe) idActividad: string,
    @Body() dto: PrevisualizarReprogramacionActividadDto,
    @Req() request: SolicitudAutenticada,
  ) {
    return {
      mensaje: 'Impacto de reprogramación obtenido correctamente.',
      data: await this.reprogramarActividad.previsualizar(
        idProyecto,
        idActividad,
        dto,
        request.usuarioAutenticado.sub,
      ),
    };
  }
  @Post('actividades/:idActividad/reprogramacion/confirmar')
  @ApiOperation({ summary: 'Confirmar la reprogramación de una actividad' })
  async confirmarReprogramacion(
    @Param('idProyecto', ParseUUIDPipe) idProyecto: string,
    @Param('idActividad', ParseUUIDPipe) idActividad: string,
    @Body() dto: ConfirmarReprogramacionActividadDto,
    @Req() request: SolicitudAutenticada,
  ) {
    return {
      mensaje: 'Actividad reprogramada correctamente.',
      data: await this.reprogramarActividad.confirmar(
        idProyecto,
        idActividad,
        dto,
        request.usuarioAutenticado.sub,
      ),
    };
  }
  @Patch('actividades/:idActividad')
  @ApiOperation({ summary: 'Editar una actividad' })
  async actualizarActividad(
    @Param('idProyecto', ParseUUIDPipe) idProyecto: string,
    @Param('idActividad', ParseUUIDPipe) idActividad: string,
    @Body() dto: ActualizarActividadDto,
    @Req() request: SolicitudAutenticada,
  ) {
    return {
      mensaje: 'Actividad actualizada correctamente.',
      data: await this.actividades.actualizar(
        idProyecto,
        idActividad,
        dto,
        request.usuarioAutenticado.sub,
      ),
    };
  }
  @Patch('actividades/:idActividad/estado')
  @ApiOperation({ summary: 'Cambiar el estado de una actividad' })
  async cambiarEstadoActividad(
    @Param('idProyecto', ParseUUIDPipe) idProyecto: string,
    @Param('idActividad', ParseUUIDPipe) idActividad: string,
    @Body() dto: CambiarEstadoActividadDto,
    @Req() request: SolicitudAutenticada,
  ) {
    return {
      mensaje: 'Estado de la actividad actualizado correctamente.',
      data: await this.actividades.cambiarEstado(
        idProyecto,
        idActividad,
        dto,
        request.usuarioAutenticado.sub,
      ),
    };
  }
  @Delete('actividades/:idActividad')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Desactivar lógicamente una actividad' })
  async eliminarActividad(
    @Param('idProyecto', ParseUUIDPipe) idProyecto: string,
    @Param('idActividad', ParseUUIDPipe) idActividad: string,
    @Req() request: SolicitudAutenticada,
  ) {
    return {
      mensaje: 'Actividad desactivada correctamente.',
      data: await this.actividades.eliminar(
        idProyecto,
        idActividad,
        request.usuarioAutenticado.sub,
      ),
    };
  }

  @Get('dependencias')
  @ApiOperation({ summary: 'Listar dependencias de actividades' })
  async listarDependencias(
    @Param('idProyecto', ParseUUIDPipe) idProyecto: string,
    @Req() request: SolicitudAutenticada,
  ) {
    return {
      mensaje: 'Dependencias obtenidas correctamente.',
      data: await this.dependencias.listar(
        idProyecto,
        request.usuarioAutenticado.sub,
      ),
    };
  }
  @Post('dependencias')
  @ApiOperation({ summary: 'Crear una dependencia entre actividades' })
  async crearDependencia(
    @Param('idProyecto', ParseUUIDPipe) idProyecto: string,
    @Body() dto: CrearDependenciaDto,
    @Req() request: SolicitudAutenticada,
  ) {
    return {
      mensaje: 'Dependencia creada correctamente.',
      data: await this.dependencias.crear(
        idProyecto,
        dto,
        request.usuarioAutenticado.sub,
      ),
    };
  }
  @Delete('dependencias/:idDependencia')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar una dependencia' })
  async eliminarDependencia(
    @Param('idProyecto', ParseUUIDPipe) idProyecto: string,
    @Param('idDependencia', ParseUUIDPipe) idDependencia: string,
    @Req() request: SolicitudAutenticada,
  ) {
    return {
      mensaje: 'Dependencia eliminada correctamente.',
      data: await this.dependencias.eliminar(
        idProyecto,
        idDependencia,
        request.usuarioAutenticado.sub,
      ),
    };
  }

  @Get('timing')
  @ApiOperation({ summary: 'Listar timing del día del evento' })
  async listarTiming(
    @Param('idProyecto', ParseUUIDPipe) idProyecto: string,
    @Query() query: ListarTimingDto,
    @Req() request: SolicitudAutenticada,
  ) {
    return {
      mensaje: 'Timing obtenido correctamente.',
      data: await this.timing.listar(
        idProyecto,
        request.usuarioAutenticado.sub,
        query,
      ),
    };
  }
  @Post('timing')
  @ApiOperation({ summary: 'Crear un elemento de timing' })
  async crearTiming(
    @Param('idProyecto', ParseUUIDPipe) idProyecto: string,
    @Body() dto: CrearTimingDto,
    @Req() request: SolicitudAutenticada,
  ) {
    return {
      mensaje: 'Elemento de timing creado correctamente.',
      data: await this.timing.crear(
        idProyecto,
        dto,
        request.usuarioAutenticado.sub,
      ),
    };
  }
  @Get('timing/:idTiming')
  @ApiOperation({ summary: 'Obtener un elemento de timing por ID' })
  async obtenerTiming(
    @Param('idProyecto', ParseUUIDPipe) idProyecto: string,
    @Param('idTiming', ParseUUIDPipe) idTiming: string,
    @Req() request: SolicitudAutenticada,
  ) {
    return {
      mensaje: 'Elemento de timing obtenido correctamente.',
      data: await this.timing.obtener(
        idProyecto,
        idTiming,
        request.usuarioAutenticado.sub,
      ),
    };
  }
  @Patch('timing/:idTiming')
  @ApiOperation({ summary: 'Editar un elemento de timing' })
  async actualizarTiming(
    @Param('idProyecto', ParseUUIDPipe) idProyecto: string,
    @Param('idTiming', ParseUUIDPipe) idTiming: string,
    @Body() dto: ActualizarTimingDto,
    @Req() request: SolicitudAutenticada,
  ) {
    return {
      mensaje: 'Elemento de timing actualizado correctamente.',
      data: await this.timing.actualizar(
        idProyecto,
        idTiming,
        dto,
        request.usuarioAutenticado.sub,
      ),
    };
  }
  @Patch('timing/:idTiming/estado')
  @ApiOperation({ summary: 'Cambiar el estado de un elemento de timing' })
  async cambiarEstadoTiming(
    @Param('idProyecto', ParseUUIDPipe) idProyecto: string,
    @Param('idTiming', ParseUUIDPipe) idTiming: string,
    @Body() dto: CambiarEstadoTimingDto,
    @Req() request: SolicitudAutenticada,
  ) {
    return {
      mensaje: 'Estado del timing actualizado correctamente.',
      data: await this.timing.cambiarEstado(
        idProyecto,
        idTiming,
        dto,
        request.usuarioAutenticado.sub,
      ),
    };
  }
  @Delete('timing/:idTiming')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Desactivar lógicamente un elemento de timing' })
  async eliminarTiming(
    @Param('idProyecto', ParseUUIDPipe) idProyecto: string,
    @Param('idTiming', ParseUUIDPipe) idTiming: string,
    @Req() request: SolicitudAutenticada,
  ) {
    return {
      mensaje: 'Elemento de timing desactivado correctamente.',
      data: await this.timing.eliminar(
        idProyecto,
        idTiming,
        request.usuarioAutenticado.sub,
      ),
    };
  }
}
