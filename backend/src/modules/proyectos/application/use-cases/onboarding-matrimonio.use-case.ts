import { BadRequestException, Injectable } from '@nestjs/common';
import { GenerarCronogramaDesdePlantillaUseCase } from '../../../cronograma/application/use-cases/generar-cronograma-desde-plantilla.use-case';
import { GuardarOnboardingMatrimonioDto } from '../dto/guardar-onboarding-matrimonio.dto';
import { ProyectosRepository } from '../../domain/repositories/proyectos.repository';

@Injectable()
export class GuardarOnboardingMatrimonioUseCase {
  constructor(
    private readonly repository: ProyectosRepository,
    private readonly generarCronograma: GenerarCronogramaDesdePlantillaUseCase,
  ) {}
  async execute(
    dto: GuardarOnboardingMatrimonioDto,
    idPm: number,
    iniciar = false,
  ) {
    this.validarFechaMatrimonio(dto.fechaMatrimonio);
    if (iniciar && dto.idProyecto) {
      const proyecto = await this.repository.obtenerProyecto(dto.idProyecto);
      const matrimonio = await this.repository.obtenerMatrimonioPorProyecto(
        dto.idProyecto,
      );
      if (!proyecto || proyecto.idPm !== idPm || !matrimonio) {
        throw new BadRequestException(
          'El borrador indicado no existe o no te pertenece.',
        );
      }
      const resultado = await this.repository.guardarOnboardingMatrimonio(
        dto,
        idPm,
        true,
      );
      const cronograma = await this.generarCronograma.execute(
        resultado.proyecto.idProyecto,
      );
      return { ...resultado, cronograma };
    }
    if (dto.pareja1.dni === dto.pareja2.dni)
      throw new BadRequestException(
        'Los DNI de la pareja deben ser diferentes.',
      );
    if (dto.pareja1.usuario === dto.pareja2.usuario)
      throw new BadRequestException(
        'Los usuarios de la pareja deben ser diferentes.',
      );
    if (
      dto.ciudadUbicacion &&
      !(await this.repository.ubigeoExiste(dto.ciudadUbicacion))
    )
      throw new BadRequestException('La ubicación indicada no existe.');
    const resultado = await this.repository.guardarOnboardingMatrimonio(
      dto,
      idPm,
      iniciar,
    );
    if (!iniciar) return resultado;
    const cronograma = await this.generarCronograma.execute(
      resultado.proyecto.idProyecto,
    );
    return { ...resultado, cronograma };
  }

  private validarFechaMatrimonio(valor: string) {
    const fecha = new Date(`${valor}T00:00:00.000Z`);
    if (Number.isNaN(fecha.getTime())) {
      throw new BadRequestException('La fecha de matrimonio no es válida.');
    }
    const hoy = new Date();
    hoy.setUTCHours(0, 0, 0, 0);
    const dias = Math.round((fecha.getTime() - hoy.getTime()) / 86_400_000);
    if (dias < 30) {
      throw new BadRequestException(
        'La fecha del matrimonio debe estar al menos a 30 días de hoy.',
      );
    }
  }
}

@Injectable()
export class ObtenerOnboardingMatrimonioUseCase {
  constructor(private readonly repository: ProyectosRepository) {}
  execute(idProyecto: string, idPm: number) {
    return this.repository.obtenerOnboardingMatrimonio(idProyecto, idPm);
  }
}
