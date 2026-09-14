import { Controller, Get, Param, Query } from '@nestjs/common';

import { ListarUbigeosDto } from '../../application/dto/listar-ubigeos.dto';
import {
  ListarUbigeosUseCase,
  ObtenerUbigeoUseCase,
} from '../../application/use-cases/ubigeos.use-cases';

@Controller('ubigeos')
export class UbigeosController {
  constructor(
    private readonly obtener: ObtenerUbigeoUseCase,
    private readonly listar: ListarUbigeosUseCase,
  ) {}

  @Get()
  async listarUbigeos(@Query() query: ListarUbigeosDto) {
    return {
      mensaje: 'Ubigeos obtenidos correctamente.',
      data: await this.listar.execute(query),
    };
  }

  @Get(':id')
  async obtenerUbigeo(@Param('id') id: string) {
    return {
      mensaje: 'Ubigeo obtenido correctamente.',
      data: await this.obtener.execute(id),
    };
  }
}
