import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { ActualizarMatrimonioDto } from '../dto/actualizar-matrimonio.dto';
import { CrearMatrimonioDto } from '../dto/crear-matrimonio.dto';
import { ListarMatrimoniosDto } from '../dto/listar-matrimonios.dto';
import { ProyectosRepository } from '../../domain/repositories/proyectos.repository';
import { ValidarProyectoSinMatrimonioUseCase } from './proyectos.use-cases';

@Injectable()
export class CrearMatrimonioUseCase {
  constructor(
    private readonly repository: ProyectosRepository,
    private readonly validarProyectoSinMatrimonio: ValidarProyectoSinMatrimonioUseCase,
  ) {}

  async execute(data: CrearMatrimonioDto) {
    await this.validarProyectoSinMatrimonio.execute(data.idProyecto);
    await this.validarReferencias(data);
    return this.repository.crearMatrimonio(data);
  }

  async validarReferencias(
    data: Partial<CrearMatrimonioDto>,
    idActual?: string,
  ): Promise<void> {
    if (data.idProyecto) {
      if (!(await this.repository.obtenerProyecto(data.idProyecto))) {
        throw new BadRequestException('El proyecto indicado no existe.');
      }
      const matrimonio = await this.repository.obtenerMatrimonioPorProyecto(
        data.idProyecto,
      );
      if (matrimonio && matrimonio.idMatrimonio !== idActual) {
        throw new BadRequestException(
          'El proyecto ya tiene un matrimonio asociado.',
        );
      }
    }
    if (
      data.idNovio1 &&
      !(await this.repository.usuarioExiste(data.idNovio1))
    ) {
      throw new BadRequestException('El primer novio indicado no existe.');
    }
    if (
      data.idNovio2 &&
      !(await this.repository.usuarioExiste(data.idNovio2))
    ) {
      throw new BadRequestException('El segundo novio indicado no existe.');
    }
    if (
      data.ciudadUbicacion &&
      !(await this.repository.ubigeoExiste(data.ciudadUbicacion))
    ) {
      throw new BadRequestException(
        'La ciudad de ubicacion indicada no existe.',
      );
    }
  }
}

@Injectable()
export class ObtenerMatrimonioUseCase {
  constructor(private readonly repository: ProyectosRepository) {}

  async execute(id: string) {
    const matrimonio = await this.repository.obtenerMatrimonio(id);
    if (!matrimonio) throw new NotFoundException('Matrimonio no encontrado.');
    return matrimonio;
  }
}

@Injectable()
export class ListarMatrimoniosUseCase {
  constructor(private readonly repository: ProyectosRepository) {}

  execute(query: ListarMatrimoniosDto) {
    return this.repository.listarMatrimonios(query);
  }
}

@Injectable()
export class ListarResumenMatrimoniosUseCase {
  constructor(private readonly repository: ProyectosRepository) {}

  execute() {
    return this.repository.listarResumenMatrimonios();
  }
}

@Injectable()
export class ActualizarMatrimonioUseCase {
  constructor(
    private readonly repository: ProyectosRepository,
    private readonly crearMatrimonio: CrearMatrimonioUseCase,
  ) {}

  async execute(id: string, data: ActualizarMatrimonioDto) {
    if (!(await this.repository.obtenerMatrimonio(id))) {
      throw new NotFoundException('Matrimonio no encontrado.');
    }
    await this.crearMatrimonio.validarReferencias(data, id);
    return this.repository.actualizarMatrimonio(id, data);
  }
}

@Injectable()
export class EliminarMatrimonioUseCase {
  constructor(private readonly repository: ProyectosRepository) {}

  async execute(id: string) {
    const matrimonio = await this.repository.actualizarMatrimonio(id, {
      estado: false,
    });
    if (!matrimonio) throw new NotFoundException('Matrimonio no encontrado.');
    return matrimonio;
  }
}
