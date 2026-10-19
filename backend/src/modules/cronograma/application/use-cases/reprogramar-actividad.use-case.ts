import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  ConfirmarReprogramacionActividadDto,
  PrevisualizarReprogramacionActividadDto,
} from '../dto/cronograma.dto';
import {
  DesplazamientoActividad,
  ReprogramacionActividadesService,
} from '../services/reprogramacion-actividades.service';
import { CronogramaCrudRepository } from '../../domain/repositories/cronograma-crud.repository';

@Injectable()
export class ReprogramarActividadUseCase {
  constructor(
    private readonly repository: CronogramaCrudRepository,
    private readonly reprogramacion: ReprogramacionActividadesService,
  ) {}

  async previsualizar(
    idProyecto: string,
    idActividad: string,
    dto: PrevisualizarReprogramacionActividadDto,
    idUsuario: number,
  ) {
    return this.preparar(
      this.repository,
      idProyecto,
      idActividad,
      dto,
      idUsuario,
    );
  }

  async confirmar(
    idProyecto: string,
    idActividad: string,
    dto: ConfirmarReprogramacionActividadDto,
    idUsuario: number,
  ) {
    return this.repository.ejecutarEnTransaccionCrud(async (repositorio) => {
      const resultado = await this.preparar(
        repositorio,
        idProyecto,
        idActividad,
        dto,
        idUsuario,
      );
      if (!dto.propagar && resultado.impacto.actividades_afectadas.length) {
        throw new ConflictException(
          'La reprogramación dejaría dependencias FINISH_TO_START inválidas. Usa propagar=true para aplicar los desplazamientos sugeridos.',
        );
      }
      await repositorio.actualizarActividad(idActividad, {
        fechaInicio: resultado.actividad_origen.fecha_inicio_sugerida,
        fechaFin: resultado.actividad_origen.fecha_fin_sugerida,
        modificadoManualmente: true,
      });
      if (dto.propagar) {
        for (const actividad of resultado.impacto.actividades_afectadas) {
          await repositorio.actualizarActividad(actividad.id_actividad, {
            fechaInicio: actividad.fecha_inicio_sugerida,
            fechaFin: actividad.fecha_fin_sugerida,
            modificadoManualmente: true,
          });
        }
      }
      return {
        actividad_origen: resultado.actividad_origen,
        impacto: dto.propagar
          ? resultado.impacto
          : { actividades_afectadas: [], hitos_afectados: [] },
        propagado: dto.propagar,
      };
    });
  }

  private async preparar(
    repositorio: CronogramaCrudRepository,
    idProyecto: string,
    idActividad: string,
    dto: PrevisualizarReprogramacionActividadDto,
    idUsuario: number,
  ) {
    const proyecto = await repositorio.obtenerProyecto(idProyecto);
    if (!proyecto) throw new NotFoundException('Proyecto no encontrado.');
    if (proyecto.idPm !== idUsuario)
      throw new ForbiddenException(
        'No tienes permiso para reprogramar actividades de este proyecto.',
      );
    const [ventana, origen, actividades, dependencias, hitos] =
      await Promise.all([
        repositorio.obtenerVentanaProyecto(idProyecto),
        repositorio.obtenerActividad(idActividad),
        repositorio.listarActividades(idProyecto, { activo: true }),
        repositorio.listarDependencias(idProyecto),
        repositorio.listarHitos(idProyecto, { activo: true }),
      ]);
    if (!origen || origen.idProyecto !== idProyecto || origen.activo === false)
      throw new NotFoundException('Actividad no encontrada.');
    if (!ventana?.fechaInicio)
      throw new BadRequestException('El proyecto no tiene fecha de inicio.');
    if (!ventana.fechaMatrimonio)
      throw new BadRequestException('El proyecto no tiene fecha de boda.');
    const nuevaFechaFin = new Date(dto.nuevaFechaFin);
    const nuevaFechaInicio = dto.nuevaFechaInicio
      ? new Date(dto.nuevaFechaInicio)
      : undefined;
    this.validarVentana(
      nuevaFechaInicio,
      nuevaFechaFin,
      ventana.fechaInicio,
      ventana.fechaMatrimonio,
    );
    const simulacion = this.reprogramacion.simular(
      origen as never,
      nuevaFechaInicio,
      nuevaFechaFin,
      actividades as never,
      dependencias as never,
    );
    for (const impacto of simulacion.impactos) {
      this.validarVentana(
        impacto.fechaInicioSugerida,
        impacto.fechaFinSugerida,
        ventana.fechaInicio,
        ventana.fechaMatrimonio,
      );
    }
    const actividadOrigen = {
      id_actividad: idActividad,
      nombre: String(origen.nombre),
      fecha_inicio_actual: this.reprogramacion.fecha(origen.fechaInicio),
      fecha_fin_actual: this.reprogramacion.fecha(origen.fechaFin),
      fecha_inicio_sugerida: simulacion.inicioOrigen,
      fecha_fin_sugerida: simulacion.finOrigen,
    };
    return {
      actividad_origen: actividadOrigen,
      impacto: {
        actividades_afectadas: simulacion.impactos.map((impacto) =>
          this.formatearImpacto(impacto),
        ),
        hitos_afectados: this.calcularImpactoHitos(
          hitos,
          actividades,
          origen,
          simulacion.impactos,
          simulacion.finOrigen,
        ),
      },
    };
  }

  private validarVentana(
    inicio: Date | undefined,
    fin: Date,
    inicioProyecto: Date,
    fechaBoda: Date,
  ) {
    if (
      Number.isNaN(fin.getTime()) ||
      (inicio && Number.isNaN(inicio.getTime()))
    )
      throw new BadRequestException(
        'Las fechas de reprogramación no son válidas.',
      );
    const inicioEfectivo = inicio ?? fin;
    if (inicioEfectivo.getTime() > fin.getTime())
      throw new BadRequestException(
        'La fecha de inicio no puede ser posterior a la fecha final.',
      );
    if (inicioEfectivo.getTime() < inicioProyecto.getTime())
      throw new BadRequestException(
        'No se puede programar una actividad antes de la fecha de inicio del proyecto.',
      );
    if (fin.getTime() > fechaBoda.getTime())
      throw new BadRequestException(
        'El modelo actual no permite programar actividades después de la fecha de boda.',
      );
  }

  private formatearImpacto(impacto: DesplazamientoActividad) {
    return {
      id_actividad: impacto.idActividad,
      nombre: impacto.nombre,
      fecha_inicio_actual: impacto.fechaInicioActual,
      fecha_fin_actual: impacto.fechaFinActual,
      fecha_inicio_sugerida: impacto.fechaInicioSugerida,
      fecha_fin_sugerida: impacto.fechaFinSugerida,
      dias_desplazamiento: impacto.diasDesplazamiento,
      nivel: impacto.depth,
      motivo: impacto.motivo,
    };
  }

  private calcularImpactoHitos(
    hitos: Record<string, unknown>[],
    actividades: Record<string, unknown>[],
    origen: Record<string, unknown>,
    impactos: DesplazamientoActividad[],
    finOrigen: Date,
  ) {
    const finSimulado = new Map<string, Date>([
      [String(origen.idActividad), finOrigen],
      ...impactos.map(
        (impacto) =>
          [impacto.idActividad, impacto.fechaFinSugerida] as [string, Date],
      ),
    ]);
    const hitosRelacionados = new Set<string>([
      ...(origen.idHito ? [String(origen.idHito)] : []),
      ...impactos
        .map(
          (impacto) =>
            actividades.find(
              (actividad) =>
                String(actividad.idActividad) === impacto.idActividad,
            )?.idHito,
        )
        .filter(Boolean)
        .map(String),
    ]);
    return hitos
      .filter((hito) => hitosRelacionados.has(String(hito.idHito)))
      .map((hito) => {
        const fechaActual = this.reprogramacion.fecha(hito.fechaObjetivo);
        const fechasActividades = actividades
          .filter(
            (actividad) => String(actividad.idHito) === String(hito.idHito),
          )
          .map(
            (actividad) =>
              finSimulado.get(String(actividad.idActividad)) ??
              this.reprogramacion.fecha(actividad.fechaFin),
          )
          .filter((fecha): fecha is Date => !!fecha);
        const posible =
          fechasActividades.sort((a, b) => b.getTime() - a.getTime())[0] ??
          fechaActual;
        return {
          id_hito: hito.idHito,
          nombre: hito.nombre,
          fecha_objetivo_actual: fechaActual,
          posible_fecha_objetivo: posible,
          afectado:
            !!fechaActual &&
            !!posible &&
            posible.getTime() > fechaActual.getTime(),
        };
      });
  }
}
