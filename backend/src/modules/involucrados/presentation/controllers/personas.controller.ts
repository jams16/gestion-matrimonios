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
  async crearPersona(@Body() dto: CrearPersonaDto) {
    return {
      mensaje: 'Persona creada correctamente.',
      data: await this.crear.execute(dto),
    };
  }

  @Post('importar')
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
  async listarPersonas(@Query() query: ListarPersonasDto) {
    return {
      mensaje: 'Personas obtenidas correctamente.',
      data: await this.listar.execute(query),
    };
  }

  @Get(':id')
  async obtenerPersona(@Param('id', ParseIntPipe) id: number) {
    return {
      mensaje: 'Persona obtenida correctamente.',
      data: await this.obtener.execute(id),
    };
  }

  @Put(':id')
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
  async eliminarPersona(@Param('id', ParseIntPipe) id: number) {
    return {
      mensaje: 'Persona desactivada correctamente.',
      data: await this.eliminar.execute(id),
    };
  }
}
