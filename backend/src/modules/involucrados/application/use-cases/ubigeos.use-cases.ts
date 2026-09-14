import { Injectable, NotFoundException } from '@nestjs/common';

import { ListarUbigeosDto } from '../dto/listar-ubigeos.dto';
import { InvolucradosRepository } from '../../domain/repositories/involucrados.repository';

@Injectable()
export class ObtenerUbigeoUseCase {
  constructor(private readonly repository: InvolucradosRepository) {}
  async execute(id: string) {
    const ubigeo = await this.repository.obtenerUbigeo(id);
    if (!ubigeo) throw new NotFoundException('Ubigeo no encontrado.');
    return ubigeo;
  }
}

@Injectable()
export class ListarUbigeosUseCase {
  constructor(private readonly repository: InvolucradosRepository) {}
  execute(query: ListarUbigeosDto) {
    return this.repository.listarUbigeos(query);
  }
}
