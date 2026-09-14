import {
  Body,
  Controller,
  Delete,
  Get,
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
  ApiTags,
} from '@nestjs/swagger';

import { ActualizarPersonaDto } from '../../application/dto/actualizar-persona.dto';
import { CrearPersonaDto } from '../../application/dto/crear-persona.dto';
import { ListarPersonasDto } from '../../application/dto/listar-personas.dto';
import {
  ActualizarPersonaUseCase,
  CrearPersonaUseCase,
  EliminarPersonaUseCase,
  ImportarPersonasUseCase,
  ListarPersonasUseCase,
  ObtenerPersonaUseCase,
} from '../../application/use-cases/personas.use-cases';
import type { ArchivoImportacion } from '../../application/use-cases/personas.use-cases';

@ApiTags('Personas')
@Controller('personas')
export class PersonasController {
  constructor(
    private readonly crear: CrearPersonaUseCase,
    private readonly obtener: ObtenerPersonaUseCase,
    private readonly listar: ListarPersonasUseCase,
    private readonly actualizar: ActualizarPersonaUseCase,
    private readonly eliminar: EliminarPersonaUseCase,
    private readonly importar: ImportarPersonasUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear una persona natural' })
  @ApiCreatedResponse({ description: 'Persona creada correctamente.' })
  async crearPersona(@Body() dto: CrearPersonaDto) {
    return {
      mensaje: 'Persona creada correctamente.',
      data: await this.crear.execute(dto),
    };
  }

  @Post('importar')
  @ApiOperation({ summary: 'Importar personas desde CSV o XLSX' })
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
  async importarPersonas(@UploadedFile() file: ArchivoImportacion) {
    return {
      mensaje: 'Importación finalizada.',
      data: await this.importar.execute(file),
    };
  }

  @Get()
  @ApiOperation({
    summary: 'Listar personas',
    description:
      'Permite búsqueda parcial, filtros, orden y paginación. mostrarTodos=true ignora pagina y limite.',
  })
  @ApiOkResponse({ description: 'Personas obtenidas correctamente.' })
  async listarPersonas(@Query() query: ListarPersonasDto) {
    return {
      mensaje: 'Personas obtenidas correctamente.',
      data: await this.listar.execute(query),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una persona por ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID interno de la persona.',
  })
  @ApiNotFoundResponse({ description: 'Persona no encontrada.' })
  async obtenerPersona(@Param('id', ParseIntPipe) id: number) {
    return {
      mensaje: 'Persona obtenida correctamente.',
      data: await this.obtener.execute(id),
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una persona' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID interno de la persona.',
  })
  @ApiOkResponse({ description: 'Persona actualizada correctamente.' })
  async reemplazarPersona(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ActualizarPersonaDto,
  ) {
    return {
      mensaje: 'Persona actualizada correctamente.',
      data: await this.actualizar.execute(id, dto),
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar parcialmente una persona' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID interno de la persona.',
  })
  @ApiOkResponse({ description: 'Persona actualizada correctamente.' })
  async actualizarPersona(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ActualizarPersonaDto,
  ) {
    return {
      mensaje: 'Persona actualizada correctamente.',
      data: await this.actualizar.execute(id, dto),
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Desactivar lógicamente una persona' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID interno de la persona.',
  })
  @ApiOkResponse({ description: 'Persona desactivada correctamente.' })
  @ApiNotFoundResponse({ description: 'Persona no encontrada.' })
  async eliminarPersona(@Param('id', ParseIntPipe) id: number) {
    return {
      mensaje: 'Persona desactivada correctamente.',
      data: await this.eliminar.execute(id),
    };
  }
}
