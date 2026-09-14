import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { ActualizarEntidadDto } from '../../application/dto/actualizar-entidad.dto';
import { CrearEntidadDto } from '../../application/dto/crear-entidad.dto';
import { ListarEntidadesDto } from '../../application/dto/listar-entidades.dto';
import {
  ActualizarEntidadUseCase,
  CrearEntidadUseCase,
  EliminarEntidadUseCase,
  ImportarEntidadesUseCase,
  ListarEntidadesUseCase,
  ObtenerEntidadUseCase,
} from '../../application/use-cases/entidades.use-cases';
import type { ArchivoImportacionEntidad } from '../../application/use-cases/entidades.use-cases';

@ApiTags('Entidades')
@Controller('entidades')
export class EntidadesController {
  constructor(
    private readonly crear: CrearEntidadUseCase,
    private readonly obtener: ObtenerEntidadUseCase,
    private readonly listar: ListarEntidadesUseCase,
    private readonly actualizar: ActualizarEntidadUseCase,
    private readonly eliminar: EliminarEntidadUseCase,
    private readonly importar: ImportarEntidadesUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear una entidad' })
  @ApiCreatedResponse({ description: 'Entidad creada correctamente.' })
  async crearEntidad(@Body() dto: CrearEntidadDto) {
    return {
      mensaje: 'Entidad creada correctamente.',
      data: await this.crear.execute(dto),
    };
  }

  @Post('importar')
  @ApiOperation({ summary: 'Importar entidades desde CSV o XLSX' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { archivo: { type: 'string', format: 'binary' } },
    },
  })
  @ApiOkResponse({ description: 'Importación finalizada.' })
  @UseInterceptors(
    FileInterceptor('archivo', { limits: { fileSize: 10 * 1024 * 1024 } }),
  )
  async importarEntidades(@UploadedFile() file: ArchivoImportacionEntidad) {
    return {
      mensaje: 'Importación finalizada.',
      data: await this.importar.execute(file),
    };
  }

  @Get()
  @ApiOperation({ summary: 'Listar entidades' })
  @ApiQuery({ name: 'pagina', required: false, type: Number })
  @ApiQuery({ name: 'limite', required: false, type: Number })
  @ApiQuery({ name: 'mostrarTodos', required: false, type: Boolean })
  @ApiOkResponse({ description: 'Entidades obtenidas correctamente.' })
  async listarEntidades(@Query() query: ListarEntidadesDto) {
    return {
      mensaje: 'Entidades obtenidas correctamente.',
      data: await this.listar.execute(query),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una entidad por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiNotFoundResponse({ description: 'Entidad no encontrada.' })
  async obtenerEntidad(@Param('id', ParseIntPipe) id: number) {
    return {
      mensaje: 'Entidad obtenida correctamente.',
      data: await this.obtener.execute(id),
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar parcialmente una entidad' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ description: 'Entidad actualizada correctamente.' })
  async actualizarEntidad(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ActualizarEntidadDto,
  ) {
    return {
      mensaje: 'Entidad actualizada correctamente.',
      data: await this.actualizar.execute(id, dto),
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una entidad' })
  @ApiParam({ name: 'id', type: Number })
  async reemplazarEntidad(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ActualizarEntidadDto,
  ) {
    return {
      mensaje: 'Entidad actualizada correctamente.',
      data: await this.actualizar.execute(id, dto),
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Desactivar lógicamente una entidad' })
  @ApiParam({ name: 'id', type: Number })
  async eliminarEntidad(@Param('id', ParseIntPipe) id: number) {
    return {
      mensaje: 'Entidad desactivada correctamente.',
      data: await this.eliminar.execute(id),
    };
  }
}
