import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { ListarUbigeosDto } from '../../application/dto/listar-ubigeos.dto';
import {
  ListarUbigeosUseCase,
  ObtenerUbigeoUseCase,
} from '../../application/use-cases/ubigeos.use-cases';

@ApiTags('Ubigeos')
@Controller('ubigeos')
export class UbigeosController {
  constructor(
    private readonly obtener: ObtenerUbigeoUseCase,
    private readonly listar: ListarUbigeosUseCase,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Listar ubigeos',
    description:
      'Permite búsqueda parcial, filtros, orden y paginación. mostrarTodos=true ignora pagina y limite.',
  })
  @ApiOkResponse({ description: 'Ubigeos obtenidos correctamente.' })
  async listarUbigeos(@Query() query: ListarUbigeosDto) {
    return {
      mensaje: 'Ubigeos obtenidos correctamente.',
      data: await this.listar.execute(query),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un ubigeo por código' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Código de ubigeo exacto de seis caracteres.',
  })
  @ApiOkResponse({ description: 'Ubigeo obtenido correctamente.' })
  @ApiNotFoundResponse({ description: 'Ubigeo no encontrado.' })
  async obtenerUbigeo(@Param('id') id: string) {
    return {
      mensaje: 'Ubigeo obtenido correctamente.',
      data: await this.obtener.execute(id),
    };
  }
}
