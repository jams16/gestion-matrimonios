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

import { ActualizarMatrimonioDto } from '../../application/dto/actualizar-matrimonio.dto';
import { CrearMatrimonioDto } from '../../application/dto/crear-matrimonio.dto';
import { ListarMatrimoniosDto } from '../../application/dto/listar-matrimonios.dto';
import {
  ActualizarMatrimonioUseCase,
  CrearMatrimonioUseCase,
  EliminarMatrimonioUseCase,
  ListarMatrimoniosUseCase,
  ListarResumenMatrimoniosUseCase,
  ObtenerMatrimonioUseCase,
} from '../../application/use-cases/matrimonios.use-cases';

@ApiTags('Matrimonios')
@Controller('matrimonios')
export class MatrimoniosController {
  constructor(
    private readonly crear: CrearMatrimonioUseCase,
    private readonly obtener: ObtenerMatrimonioUseCase,
    private readonly listar: ListarMatrimoniosUseCase,
    private readonly listarResumen: ListarResumenMatrimoniosUseCase,
    private readonly actualizar: ActualizarMatrimonioUseCase,
    private readonly eliminar: EliminarMatrimonioUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un matrimonio' })
  @ApiCreatedResponse({ description: 'Matrimonio creado correctamente.' })
  async crearMatrimonio(@Body() dto: CrearMatrimonioDto) {
    return {
      mensaje: 'Matrimonio creado correctamente.',
      data: await this.crear.execute(dto),
    };
  }

  @Get()
  @ApiOperation({ summary: 'Listar matrimonios' })
  @ApiOkResponse({ description: 'Matrimonios obtenidos correctamente.' })
  async listarMatrimonios(@Query() query: ListarMatrimoniosDto) {
    return {
      mensaje: 'Matrimonios obtenidos correctamente.',
      data: await this.listar.execute(query),
    };
  }

  @Get('resumen')
  @ApiOperation({
    summary: 'Listar matrimonios para seleccion',
    description:
      'Devuelve solo los datos necesarios para seleccionar un matrimonio, ordenados por fecha de matrimonio ascendente.',
  })
  @ApiOkResponse({
    description: 'Resumenes de matrimonios obtenidos correctamente.',
  })
  async listarResumenMatrimonios() {
    return {
      mensaje: 'Resumenes de matrimonios obtenidos correctamente.',
      data: await this.listarResumen.execute(),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un matrimonio por ID' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiNotFoundResponse({ description: 'Matrimonio no encontrado.' })
  async obtenerMatrimonio(@Param('id', ParseUUIDPipe) id: string) {
    return {
      mensaje: 'Matrimonio obtenido correctamente.',
      data: await this.obtener.execute(id),
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar parcialmente un matrimonio' })
  @ApiParam({ name: 'id', format: 'uuid' })
  async actualizarMatrimonio(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: ActualizarMatrimonioDto,
  ) {
    return {
      mensaje: 'Matrimonio actualizado correctamente.',
      data: await this.actualizar.execute(id, dto),
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un matrimonio' })
  @ApiParam({ name: 'id', format: 'uuid' })
  async reemplazarMatrimonio(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: ActualizarMatrimonioDto,
  ) {
    return {
      mensaje: 'Matrimonio actualizado correctamente.',
      data: await this.actualizar.execute(id, dto),
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Desactivar logicamente un matrimonio' })
  @ApiParam({ name: 'id', format: 'uuid' })
  async eliminarMatrimonio(@Param('id', ParseUUIDPipe) id: string) {
    return {
      mensaje: 'Matrimonio desactivado correctamente.',
      data: await this.eliminar.execute(id),
    };
  }
}
