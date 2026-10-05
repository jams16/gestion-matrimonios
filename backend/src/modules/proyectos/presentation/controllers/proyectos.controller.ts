import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { ActualizarProyectoDto } from '../../application/dto/actualizar-proyecto.dto';
import { CrearProyectoDto } from '../../application/dto/crear-proyecto.dto';
import { ListarProyectosDto } from '../../application/dto/listar-proyectos.dto';
import {
  ActualizarProyectoUseCase,
  CrearProyectoUseCase,
  ListarProyectosUseCase,
  ObtenerProyectoUseCase,
} from '../../application/use-cases/proyectos.use-cases';

@ApiTags('Proyectos')
@Controller('proyectos')
export class ProyectosController {
  constructor(
    private readonly crear: CrearProyectoUseCase,
    private readonly obtener: ObtenerProyectoUseCase,
    private readonly listar: ListarProyectosUseCase,
    private readonly actualizar: ActualizarProyectoUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un proyecto' })
  @ApiCreatedResponse({ description: 'Proyecto creado correctamente.' })
  async crearProyecto(@Body() dto: CrearProyectoDto) {
    return {
      mensaje: 'Proyecto creado correctamente.',
      data: await this.crear.execute(dto),
    };
  }

  @Get()
  @ApiOperation({ summary: 'Listar proyectos' })
  @ApiOkResponse({ description: 'Proyectos obtenidos correctamente.' })
  async listarProyectos(@Query() query: ListarProyectosDto) {
    return {
      mensaje: 'Proyectos obtenidos correctamente.',
      data: await this.listar.execute(query),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un proyecto por ID' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiNotFoundResponse({ description: 'Proyecto no encontrado.' })
  async obtenerProyecto(@Param('id', ParseUUIDPipe) id: string) {
    return {
      mensaje: 'Proyecto obtenido correctamente.',
      data: await this.obtener.execute(id),
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar parcialmente un proyecto' })
  @ApiParam({ name: 'id', format: 'uuid' })
  async actualizarProyecto(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: ActualizarProyectoDto,
  ) {
    return {
      mensaje: 'Proyecto actualizado correctamente.',
      data: await this.actualizar.execute(id, dto),
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un proyecto' })
  @ApiParam({ name: 'id', format: 'uuid' })
  async reemplazarProyecto(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: ActualizarProyectoDto,
  ) {
    return {
      mensaje: 'Proyecto actualizado correctamente.',
      data: await this.actualizar.execute(id, dto),
    };
  }
}
