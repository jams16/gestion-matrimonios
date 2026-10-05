import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { ActualizarProyectoDto } from '../dto/actualizar-proyecto.dto';
import { CrearProyectoDto } from '../dto/crear-proyecto.dto';
import { ListarProyectosDto } from '../dto/listar-proyectos.dto';
import { ProyectosRepository } from '../../domain/repositories/proyectos.repository';

@Injectable()
export class CrearProyectoUseCase {
  constructor(private readonly repository: ProyectosRepository) {}

  async execute(data: CrearProyectoDto) {
    await this.validarReferencias(data);
    return this.repository.crearProyecto(data);
  }

  async validarReferencias(data: Partial<CrearProyectoDto>): Promise<void> {
    if (data.idPm && !(await this.repository.usuarioExiste(data.idPm))) {
      throw new BadRequestException('El project manager indicado no existe.');
    }
  }
}

@Injectable()
export class ObtenerProyectoUseCase {
  constructor(private readonly repository: ProyectosRepository) {}

  async execute(id: string) {
    const proyecto = await this.repository.obtenerProyecto(id);
    if (!proyecto) throw new NotFoundException('Proyecto no encontrado.');
    return proyecto;
  }
}

@Injectable()
export class ListarProyectosUseCase {
  constructor(private readonly repository: ProyectosRepository) {}

  execute(query: ListarProyectosDto) {
    return this.repository.listarProyectos(query);
  }
}

@Injectable()
export class ActualizarProyectoUseCase {
  constructor(
    private readonly repository: ProyectosRepository,
    private readonly crearProyecto: CrearProyectoUseCase,
  ) {}

  async execute(id: string, data: ActualizarProyectoDto) {
    if (!(await this.repository.obtenerProyecto(id))) {
      throw new NotFoundException('Proyecto no encontrado.');
    }
    await this.crearProyecto.validarReferencias(data);
    return this.repository.actualizarProyecto(id, data);
  }
}

@Injectable()
export class ValidarProyectoSinMatrimonioUseCase {
  constructor(private readonly repository: ProyectosRepository) {}

  async execute(idProyecto: string): Promise<void> {
    if (!(await this.repository.obtenerProyecto(idProyecto))) {
      throw new BadRequestException('El proyecto indicado no existe.');
    }
    if (await this.repository.obtenerMatrimonioPorProyecto(idProyecto)) {
      throw new ConflictException(
        'El proyecto ya tiene un matrimonio asociado.',
      );
    }
  }
}
