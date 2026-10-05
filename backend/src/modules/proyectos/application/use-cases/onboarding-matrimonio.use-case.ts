import * as argon2 from 'argon2';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Temporal } from 'temporal-polyfill';
import { GuardarOnboardingMatrimonioDto } from '../dto/guardar-onboarding-matrimonio.dto';
import { ProyectosRepository } from '../../domain/repositories/proyectos.repository';

@Injectable()
export class GuardarOnboardingMatrimonioUseCase {
  constructor(private readonly repository: ProyectosRepository) {}
  async execute(dto: GuardarOnboardingMatrimonioDto, idPm: number, iniciar = false) {
    if (iniciar && dto.idProyecto) {
      const proyecto = await this.repository.obtenerProyecto(dto.idProyecto);
      const matrimonio = await this.repository.obtenerMatrimonioPorProyecto(dto.idProyecto);
      if (!proyecto || proyecto.idPm !== idPm || !matrimonio) {
        throw new BadRequestException('El borrador indicado no existe o no te pertenece.');
      }
      const actualizado = await this.repository.actualizarProyecto(dto.idProyecto, {
        estado: 'INICIO' as never,
      });
      return { proyecto: actualizado!, matrimonio };
    }
    if (dto.pareja1.dni === dto.pareja2.dni) throw new BadRequestException('Los DNI de la pareja deben ser diferentes.');
    if (dto.pareja1.usuario === dto.pareja2.usuario) throw new BadRequestException('Los usuarios de la pareja deben ser diferentes.');
    if (dto.ciudadUbicacion && !(await this.repository.ubigeoExiste(dto.ciudadUbicacion))) throw new BadRequestException('La ubicación indicada no existe.');
    return this.repository.guardarOnboardingMatrimonio(dto, idPm, iniciar);
  }
}

@Injectable()
export class ObtenerOnboardingMatrimonioUseCase {
  constructor(private readonly repository: ProyectosRepository) {}
  execute(idProyecto: string, idPm: number) {
    return this.repository.obtenerOnboardingMatrimonio(idProyecto, idPm);
  }
}
