import { Injectable, Optional } from '@nestjs/common';
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
import {
  CronogramaCrudRepository,
  FiltrosCronograma,
} from '../../../domain/repositories/cronograma-crud.repository';

type ClienteCronograma = typeof PrismaService.prototype.client;
type FilaSql = Record<string, unknown>;
type ClientePlantillasSql = {
  connect(): Promise<void>;
  end(): Promise<void>;
  query(sql: string): Promise<{ rows: FilaSql[] }>;
};
type ConstructorClientePlantillasSql = new (opciones: {
  connectionString: string | undefined;
}) => ClientePlantillasSql;

// `pg` ya forma parte de las dependencias del backend. Se usa solo para leer
// plantillas con JSON escalar legado, que el codec JSON de Prisma 8 no decodifica.
const pg = require('pg') as {
  Client: ConstructorClientePlantillasSql;
  types: { setTypeParser(oid: number, parser: (valor: string) => string): void };
};

@Injectable()
export class PrismaCronogramaRepository
  extends CronogramaRepository
  implements CronogramaCrudRepository
{
  private readonly db: ClienteCronograma;

  constructor(
    private readonly prisma: PrismaService,
    @Optional() db?: ClienteCronograma,
  ) {
    super();
    // El segundo argumento se usa únicamente para el cliente transaccional
    // construido manualmente en ejecutarEnTransaccion; no es un provider Nest.
    this.db = db ?? prisma.client;
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

  ejecutarEnTransaccionCrud<T>(
    operacion: (repositorio: CronogramaCrudRepository) => Promise<T>,
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
    const {
      hitos,
      actividades,
      dependencias,
      timings,
      actividadTipos,
      timingTipos,
    } = await this.leerPlantillasCompatibles();

    return {
      hitos: hitos
        .filter((item) => item.activo !== false)
        .map((item) => ({
          idPlantillaHito: Number(item.id_plantilla_hito),
          nombre: String(item.nombre),
          criterioAceptacion: String(item.criterio_aceptacion),
          tipoTemporal: item.tipo_temporal as TipoTemporalCronograma,
          diasAntesBase: this.aNumeroONulo(item.dias_antes_base),
          diasAntesMinimo: this.aNumeroONulo(item.dias_antes_minimo),
          orden: Number(item.orden),
        })),
      actividades: actividades
        .filter((item) => item.activo !== false)
        .map((item) => ({
          idPlantillaActividad: Number(item.id_plantilla_actividad),
          idPlantillaHito: this.aNumeroONulo(item.id_plantilla_hito),
          nombre: String(item.nombre),
          listaVerificacion: this.aJsonONulo(item.lista_verificacion),
          responsableSugerido: this.aTextoONulo(item.responsable_sugerido),
          entregable: this.aTextoONulo(item.entregable),
          tipoTemporal: item.tipo_temporal as TipoTemporalCronograma,
          diasAntesBase: this.aNumeroONulo(item.dias_antes_base),
          diasAntesMinimo: this.aNumeroONulo(item.dias_antes_minimo),
          duracionEstimadaDias: this.aNumeroONulo(item.duracion_estimada_dias),
          prioridad: this.aTextoONulo(item.prioridad),
          orden: Number(item.orden),
        })),
      dependencias: dependencias.map((item) => ({
          idActividadPredecesora: Number(item.id_actividad_predecesora),
          idActividadSucesora: Number(item.id_actividad_sucesora),
          tipoDependencia: 'FINISH_TO_START',
          diasDesfase: Number(item.dias_desfase ?? 0),
        })),
      timings: timings
        .filter((item) => item.activo !== false)
        .map((item) => ({
          idPlantillaTiming: Number(item.id_plantilla_timing),
          horaInicio: String(item.hora_inicio),
          duracionMinutos: Number(item.duracion_minutos),
          actividad: String(item.actividad),
          responsableSugerido: this.aTextoONulo(item.responsable_sugerido),
          listaVerificacion: this.aJsonONulo(item.lista_verificacion),
          orden: Number(item.orden),
        })),
      actividadesPorTipoCeremonia: this.agruparTiposCeremonia(
        actividadTipos.map((item) => ({
          idPlantillaActividad: item.id_plantilla_actividad,
          idTipoCeremonia: item.id_tipo_ceremonia,
        })),
        'idPlantillaActividad',
      ),
      timingsPorTipoCeremonia: this.agruparTiposCeremonia(
        timingTipos.map((item) => ({
          idPlantillaTiming: item.id_plantilla_timing,
          idTipoCeremonia: item.id_tipo_ceremonia,
        })),
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

  async obtenerProyecto(idProyecto: string) {
    const proyecto = (await this.db.orm.public.Proyecto.first({
      idProyecto: idProyecto as never,
    })) as {
      idProyecto: string;
      idPm: number | null;
      nombre: string | null;
    } | null;
    return proyecto;
  }

  async obtenerVentanaProyecto(idProyecto: string) {
    const contexto = await this.obtenerContextoProyecto(idProyecto);
    if (!contexto) return null;
    return {
      fechaInicio: contexto.fechaInicio,
      fechaMatrimonio: contexto.fechaMatrimonio,
    };
  }

  async listarHitos(
    idProyecto: string,
    filtros: FiltrosCronograma,
  ): Promise<Record<string, unknown>[]> {
    const hitos = (await this.db.orm.public.Hito.all()) as Array<
      Record<string, unknown>
    >;
    return hitos
      .filter((hito) => this.perteneceYCoincide(hito, idProyecto, filtros))
      .sort((a, b) => Number(a.orden) - Number(b.orden));
  }

  async obtenerHito(idHito: string): Promise<Record<string, unknown> | null> {
    return (await this.db.orm.public.Hito.first({
      idHito: idHito as never,
    })) as Record<string, unknown> | null;
  }

  async crearHitoManual(
    data: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    return (await this.db.orm.public.Hito.create(
      this.normalizarFechas(data, ['fechaObjetivo']) as never,
    )) as Record<string, unknown>;
  }

  async actualizarHito(
    idHito: string,
    data: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    return (await this.db.orm.public.Hito.where({
      idHito: idHito as never,
    }).update(
      this.normalizarFechas(data, ['fechaObjetivo']) as never,
    )) as Record<string, unknown>;
  }

  async listarActividades(
    idProyecto: string,
    filtros: FiltrosCronograma,
  ): Promise<Record<string, unknown>[]> {
    const actividades = (await this.db.orm.public.Actividad.all()) as Array<
      Record<string, unknown>
    >;
    return actividades
      .filter(
        (actividad) =>
          this.perteneceYCoincide(actividad, idProyecto, filtros) &&
          (!filtros.idHito || actividad.idHito === filtros.idHito) &&
          (!filtros.idUsuarioResponsable ||
            actividad.idUsuarioResponsable === filtros.idUsuarioResponsable),
      )
      .sort((a, b) => Number(a.orden) - Number(b.orden));
  }

  async obtenerActividad(
    idActividad: string,
  ): Promise<Record<string, unknown> | null> {
    return (await this.db.orm.public.Actividad.first({
      idActividad: idActividad as never,
    })) as Record<string, unknown> | null;
  }

  async crearActividadManual(
    data: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    return (await this.db.orm.public.Actividad.create(
      this.normalizarFechas(data, ['fechaInicio', 'fechaFin']) as never,
    )) as Record<string, unknown>;
  }

  async actualizarActividad(
    idActividad: string,
    data: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    return (await this.db.orm.public.Actividad.where({
      idActividad: idActividad as never,
    }).update(
      this.normalizarFechas(data, ['fechaInicio', 'fechaFin']) as never,
    )) as Record<string, unknown>;
  }

  async listarDependencias(
    idProyecto: string,
  ): Promise<Record<string, unknown>[]> {
    const [dependencias, actividades] = await Promise.all([
      this.db.orm.public.Dependencia.all(),
      this.db.orm.public.Actividad.all(),
    ]);
    const porId = new Map(
      (actividades as Array<Record<string, unknown>>).map((actividad) => [
        String(actividad.idActividad),
        actividad,
      ]),
    );
    return (dependencias as Array<Record<string, unknown>>)
      .map((dependencia) => {
        const predecesora = porId.get(
          String(dependencia.idActividadPredecesora),
        );
        const sucesora = porId.get(String(dependencia.idActividadSucesora));
        return {
          ...dependencia,
          idProyecto: predecesora?.idProyecto,
          nombreActividadPredecesora: predecesora?.nombre ?? null,
          nombreActividadSucesora: sucesora?.nombre ?? null,
        };
      })
      .filter((dependencia) => dependencia.idProyecto === idProyecto);
  }

  async obtenerDependencia(
    idDependencia: string,
  ): Promise<Record<string, unknown> | null> {
    return (await this.db.orm.public.Dependencia.first({
      idDependencia: idDependencia as never,
    })) as Record<string, unknown> | null;
  }

  async crearDependenciaManual(
    data: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    return (await this.db.orm.public.Dependencia.create(
      data as never,
    )) as Record<string, unknown>;
  }

  async eliminarDependencia(idDependencia: string): Promise<void> {
    await this.db.orm.public.Dependencia.where({
      idDependencia: idDependencia as never,
    }).delete();
  }

  async listarTiming(
    idProyecto: string,
    filtros: FiltrosCronograma,
  ): Promise<Record<string, unknown>[]> {
    const timing = (await this.db.orm.public.Timing.all()) as Array<
      Record<string, unknown>
    >;
    return timing
      .filter(
        (item) =>
          this.perteneceYCoincide(item, idProyecto, filtros) &&
          (!filtros.idUsuarioResponsable ||
            item.idUsuarioResponsable === filtros.idUsuarioResponsable),
      )
      .sort(
        (a, b) =>
          this.aFecha(a.fechaHoraInicio)!.getTime() -
          this.aFecha(b.fechaHoraInicio)!.getTime(),
      );
  }

  async obtenerTiming(
    idTiming: string,
  ): Promise<Record<string, unknown> | null> {
    return (await this.db.orm.public.Timing.first({
      idTiming: idTiming as never,
    })) as Record<string, unknown> | null;
  }

  async crearTimingManual(
    data: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    return (await this.db.orm.public.Timing.create(
      this.normalizarFechas(data, ['fechaHoraInicio', 'fechaHoraFin']) as never,
    )) as Record<string, unknown>;
  }

  async actualizarTiming(
    idTiming: string,
    data: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    return (await this.db.orm.public.Timing.where({
      idTiming: idTiming as never,
    }).update(
      this.normalizarFechas(data, ['fechaHoraInicio', 'fechaHoraFin']) as never,
    )) as Record<string, unknown>;
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

  private async leerPlantillasCompatibles(): Promise<{
    hitos: FilaSql[];
    actividades: FilaSql[];
    dependencias: FilaSql[];
    timings: FilaSql[];
    actividadTipos: FilaSql[];
    timingTipos: FilaSql[];
  }> {
    pg.types.setTypeParser(114, (valor) => valor);
    pg.types.setTypeParser(3802, (valor) => valor);
    const cliente = new pg.Client({ connectionString: process.env.DATABASE_URL });
    await cliente.connect();
    try {
      // Un cliente pg procesa una consulta por vez; ejecutar en secuencia evita
      // advertencias y mantiene esta lectura compatible con pg 9.
      const hitos = await cliente.query('SELECT * FROM public.cr_plantilla_hito');
      const actividades = await cliente.query(
        'SELECT * FROM public.cr_plantilla_actividad',
      );
      const dependencias = await cliente.query(
        'SELECT * FROM public.cr_plantilla_dependencia',
      );
      const timings = await cliente.query('SELECT * FROM public.cr_plantilla_timing');
      const actividadTipos = await cliente.query(
        'SELECT * FROM public.cr_plantilla_actividad_tipo_ceremonia',
      );
      const timingTipos = await cliente.query(
        'SELECT * FROM public.cr_plantilla_timing_tipo_ceremonia',
      );
      return {
        hitos: hitos.rows,
        actividades: actividades.rows,
        dependencias: dependencias.rows,
        timings: timings.rows,
        actividadTipos: actividadTipos.rows,
        timingTipos: timingTipos.rows,
      };
    } finally {
      await cliente.end();
    }
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

  private aJsonONulo(valor: unknown): unknown {
    if (valor === null || valor === undefined) return null;
    if (typeof valor !== 'string') return valor;
    try {
      return JSON.parse(valor);
    } catch {
      return valor;
    }
  }

  private perteneceYCoincide(
    registro: Record<string, unknown>,
    idProyecto: string,
    filtros: FiltrosCronograma,
  ): boolean {
    return (
      registro.idProyecto === idProyecto &&
      (!filtros.estado || registro.estado === filtros.estado) &&
      (filtros.activo === undefined || registro.activo === filtros.activo)
    );
  }

  private normalizarFechas(
    data: Record<string, unknown>,
    campos: string[],
  ): Record<string, unknown> {
    const normalizado = { ...data };
    for (const campo of campos) {
      if (normalizado[campo] instanceof Date) {
        normalizado[campo] = this.aInstant(normalizado[campo] as Date);
      }
    }
    return normalizado;
  }
}
