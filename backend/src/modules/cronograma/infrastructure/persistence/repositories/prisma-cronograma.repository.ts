import { Injectable } from '@nestjs/common';
import { Temporal } from 'temporal-polyfill';

import { PrismaService } from '../../../../../infrastructure/database/prisma/prisma.service';
import {
  ContextoCronogramaProyecto,
  CrearActividadCronograma,
  CrearDependenciaCronograma,
  CrearHitoCronograma,
  CrearTimingCronograma,
  CronogramaRepository,
  PlantillasCronograma,
  TipoTemporalCronograma,
} from '../../../domain/repositories/cronograma.repository';

type ClienteCronograma = typeof PrismaService.prototype.client;

@Injectable()
export class PrismaCronogramaRepository extends CronogramaRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly db: ClienteCronograma = prisma.client,
  ) {
    super();
  }

  ejecutarEnTransaccion<T>(
    operacion: (repositorio: CronogramaRepository) => Promise<T>,
  ): Promise<T> {
    return this.prisma.client.transaction((tx) =>
      operacion(
        new PrismaCronogramaRepository(
          this.prisma,
          tx as unknown as ClienteCronograma,
        ),
      ),
    );
  }

  async obtenerContextoProyecto(
    idProyecto: string,
  ): Promise<ContextoCronogramaProyecto | null> {
    const proyecto = (await this.db.orm.public.Proyecto.first({
      idProyecto: idProyecto as never,
    })) as {
      idProyecto: string;
      fechaInicio: unknown;
    } | null;
    if (!proyecto) return null;

    const matrimonios = (await this.db.orm.public.Matrimonio.all()) as Array<{
      idProyecto: string;
      fechaMatrimonio: unknown;
      idTipoCeremonia: number | null;
    }>;
    const matrimonio = matrimonios.find(
      (item) => item.idProyecto === idProyecto,
    );

    return {
      idProyecto: proyecto.idProyecto,
      matrimonioExiste: !!matrimonio,
      fechaInicio: this.aFecha(proyecto.fechaInicio),
      fechaMatrimonio: this.aFecha(matrimonio?.fechaMatrimonio),
      idTipoCeremonia: matrimonio?.idTipoCeremonia ?? null,
    };
  }

  async existeCronogramaGenerado(idProyecto: string): Promise<boolean> {
    const [hitos, actividades, timings] = await Promise.all([
      this.db.orm.public.Hito.all(),
      this.db.orm.public.Actividad.all(),
      this.db.orm.public.Timing.all(),
    ]);
    return [hitos, actividades, timings].some((items) =>
      (items as Array<{ idProyecto: string }>).some(
        (item) => item.idProyecto === idProyecto,
      ),
    );
  }

  async obtenerPlantillasActivas(): Promise<PlantillasCronograma> {
    const [
      hitos,
      actividades,
      dependencias,
      timings,
      actividadTipos,
      timingTipos,
    ] = await Promise.all([
      this.db.orm.public.PlantillaHito.all(),
      this.db.orm.public.PlantillaActividad.all(),
      this.db.orm.public.PlantillaDependencia.all(),
      this.db.orm.public.PlantillaTiming.all(),
      this.db.orm.public.PlantillaActividadTipoCeremonia.all(),
      this.db.orm.public.PlantillaTimingTipoCeremonia.all(),
    ]);

    return {
      hitos: (hitos as Array<Record<string, unknown>>)
        .filter((item) => item.activo !== false)
        .map((item) => ({
          idPlantillaHito: Number(item.idPlantillaHito),
          nombre: String(item.nombre),
          criterioAceptacion: String(item.criterioAceptacion),
          tipoTemporal: item.tipoTemporal as TipoTemporalCronograma,
          diasAntesBase: this.aNumeroONulo(item.diasAntesBase),
          diasAntesMinimo: this.aNumeroONulo(item.diasAntesMinimo),
          orden: Number(item.orden),
        })),
      actividades: (actividades as Array<Record<string, unknown>>)
        .filter((item) => item.activo !== false)
        .map((item) => ({
          idPlantillaActividad: Number(item.idPlantillaActividad),
          idPlantillaHito: this.aNumeroONulo(item.idPlantillaHito),
          nombre: String(item.nombre),
          listaVerificacion: item.listaVerificacion ?? null,
          responsableSugerido: this.aTextoONulo(item.responsableSugerido),
          entregable: this.aTextoONulo(item.entregable),
          tipoTemporal: item.tipoTemporal as TipoTemporalCronograma,
          diasAntesBase: this.aNumeroONulo(item.diasAntesBase),
          diasAntesMinimo: this.aNumeroONulo(item.diasAntesMinimo),
          duracionEstimadaDias: this.aNumeroONulo(item.duracionEstimadaDias),
          prioridad: this.aTextoONulo(item.prioridad),
          orden: Number(item.orden),
        })),
      dependencias: (dependencias as Array<Record<string, unknown>>).map(
        (item) => ({
          idActividadPredecesora: Number(item.idActividadPredecesora),
          idActividadSucesora: Number(item.idActividadSucesora),
          tipoDependencia: 'FINISH_TO_START',
          diasDesfase: Number(item.diasDesfase ?? 0),
        }),
      ),
      timings: (timings as Array<Record<string, unknown>>)
        .filter((item) => item.activo !== false)
        .map((item) => ({
          idPlantillaTiming: Number(item.idPlantillaTiming),
          horaInicio: String(item.horaInicio),
          duracionMinutos: Number(item.duracionMinutos),
          actividad: String(item.actividad),
          responsableSugerido: this.aTextoONulo(item.responsableSugerido),
          listaVerificacion: item.listaVerificacion ?? null,
          orden: Number(item.orden),
        })),
      actividadesPorTipoCeremonia: this.agruparTiposCeremonia(
        actividadTipos as Array<Record<string, unknown>>,
        'idPlantillaActividad',
      ),
      timingsPorTipoCeremonia: this.agruparTiposCeremonia(
        timingTipos as Array<Record<string, unknown>>,
        'idPlantillaTiming',
      ),
    };
  }

  async crearHito(data: CrearHitoCronograma): Promise<{ idHito: string }> {
    const creado = (await this.db.orm.public.Hito.create({
      ...data,
      fechaObjetivo: this.aInstant(data.fechaObjetivo),
      modificadoManualmente: false,
      activo: true,
    } as never)) as { idHito: string };
    return { idHito: creado.idHito };
  }

  async crearActividad(
    data: CrearActividadCronograma,
  ): Promise<{ idActividad: string }> {
    const creada = (await this.db.orm.public.Actividad.create({
      ...data,
      fechaInicio: this.aInstant(data.fechaInicio),
      fechaFin: this.aInstant(data.fechaFin),
      modificadoManualmente: false,
      activo: true,
    } as never)) as { idActividad: string };
    return { idActividad: creada.idActividad };
  }

  async crearDependencia(data: CrearDependenciaCronograma): Promise<void> {
    await this.db.orm.public.Dependencia.create(data as never);
  }

  async crearTiming(data: CrearTimingCronograma): Promise<void> {
    await this.db.orm.public.Timing.create({
      ...data,
      fechaHoraInicio: this.aInstant(data.fechaHoraInicio),
      fechaHoraFin: this.aInstant(data.fechaHoraFin),
      modificadoManualmente: false,
      activo: true,
    } as never);
  }

  private agruparTiposCeremonia(
    relaciones: Array<Record<string, unknown>>,
    campoPlantilla: 'idPlantillaActividad' | 'idPlantillaTiming',
  ): Map<number, number[]> {
    return relaciones.reduce((mapa, relacion) => {
      const idPlantilla = Number(relacion[campoPlantilla]);
      const tipos = mapa.get(idPlantilla) ?? [];
      tipos.push(Number(relacion.idTipoCeremonia));
      mapa.set(idPlantilla, tipos);
      return mapa;
    }, new Map<number, number[]>());
  }

  private aFecha(valor: unknown): Date | null {
    if (!valor) return null;
    if (valor instanceof Date) return new Date(valor);
    if (typeof valor === 'object' && 'epochMilliseconds' in valor) {
      return new Date(Number(valor.epochMilliseconds));
    }
    const fecha = new Date(String(valor));
    return Number.isNaN(fecha.getTime()) ? null : fecha;
  }

  private aInstant(fecha: Date): Temporal.Instant {
    return Temporal.Instant.from(fecha.toISOString());
  }

  private aNumeroONulo(valor: unknown): number | null {
    return valor === null || valor === undefined ? null : Number(valor);
  }

  private aTextoONulo(valor: unknown): string | null {
    return valor === null || valor === undefined ? null : String(valor);
  }
}
