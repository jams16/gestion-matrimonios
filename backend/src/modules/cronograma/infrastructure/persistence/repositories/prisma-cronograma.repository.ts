import { Injectable, Optional } from '@nestjs/common';
import * as pg from 'pg';
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
  query(sql: string, valores?: unknown[]): Promise<{ rows: FilaSql[] }>;
};
type ConstructorClientePlantillasSql = new (opciones: {
  connectionString: string | undefined;
}) => ClientePlantillasSql;

// `pg` ya forma parte de las dependencias del backend. Se usa solo para leer
// plantillas con JSON escalar legado, que el codec JSON de Prisma 8 no decodifica.
const clientePg = pg as unknown as {
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
      idMatrimonio: string;
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
      idMatrimonio: matrimonio?.idMatrimonio ?? null,
      fechaInicio: this.aFecha(proyecto.fechaInicio),
      fechaMatrimonio: this.aFecha(matrimonio?.fechaMatrimonio),
      idTipoCeremonia: matrimonio?.idTipoCeremonia ?? null,
    };
  }

  async existeCronogramaGenerado(idProyecto: string): Promise<boolean> {
    const [hitos, actividades] = await Promise.all([
      this.db.orm.public.Hito.all(),
      this.leerActividadesOperativas(),
    ]);
    return [hitos, actividades].some((items) =>
      (items as Array<{ idProyecto: string }>).some(
        (item) => item.idProyecto === idProyecto,
      ),
    );
  }

  async existeTimingGenerado(idProyecto: string): Promise<boolean> {
    const timings = await this.leerTimingOperativo();
    return timings.some((item) => item.idProyecto === idProyecto && item.activo !== false);
  }

  async obtenerPlantillasActivas(): Promise<PlantillasCronograma> {
    const {
      hitos,
      actividades,
      dependencias,
      timings,
      actividadTipos,
      timingTipos,
      checklist,
      hitosActividades,
      actividadesEdt,
      timingDependencias,
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
          tipoHorario: String(item.tipo_horario ?? 'FLEXIBLE') as 'FIJO' | 'FLEXIBLE',
          tiempoExtraMinutos: Number(item.tiempo_extra_minutos ?? 0),
          offsetInicioMinutos: this.aNumeroONulo(item.offset_inicio_minutos),
          duracionMinutos: Number(item.duracion_minutos),
          actividad: String(item.actividad),
          responsableSugerido: this.aTextoONulo(item.responsable_sugerido),
          listaVerificacion: this.aListaTexto(item.lista_verificacion),
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
      checklist: checklist.filter((item) => item.activo !== false).map((item) => ({
        idPlantillaChecklist: Number(item.id_plantilla_checklist),
        idPlantillaActividad: Number(item.id_plantilla_actividad),
        descripcion: String(item.descripcion),
        orden: Number(item.orden ?? 0),
        obligatorio: item.obligatorio !== false,
      })),
      hitosActividades: (hitosActividades.length
        ? hitosActividades
        : actividades
            .filter((item) => item.id_plantilla_hito != null)
            .map((item) => ({
              id_plantilla_hito: item.id_plantilla_hito,
              id_plantilla_actividad: item.id_plantilla_actividad,
            }))).map((item) => ({
        idPlantillaHito: Number(item.id_plantilla_hito),
        idPlantillaActividad: Number(item.id_plantilla_actividad),
      })),
      actividadesEdt: actividadesEdt.map((item) => ({
        idPlantillaActividad: Number(item.id_plantilla_actividad),
        idElementoEdt: String(item.id_elemento_edt),
      })),
      timingDependencias: timingDependencias.map((item) => ({
        idTimingPredecesor: Number(item.id_timing_predecesor),
        idTimingSucesor: Number(item.id_timing_sucesor),
        tipoDependencia: String(item.tipo_dependencia ?? 'FINISH_TO_START') as 'FINISH_TO_START',
        minutosDesfase: Number(item.minutos_desfase ?? 0),
      })),
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

  async crearChecklistActividad(data: {
    idActividad: string;
    idPlantillaChecklist: number | null;
    descripcion: string;
    orden: number;
    obligatorio: boolean;
  }): Promise<void> {
    await this.db.orm.public.ActividadChecklist.create({
      ...data,
      completado: false,
      modificadoManualmente: false,
      activo: true,
    } as never);
  }

  async crearHitoActividad(data: {
    idHito: string;
    idActividad: string;
  }): Promise<void> {
    await this.db.orm.public.HitoActividad.create(data as never);
  }

  async obtenerElementosEdtActivos(idMatrimonio: string): Promise<string[]> {
    const filas = await this.consultarSql(
      `SELECT eme.id_edt_elemento_origen
       FROM public.gp_edt_matrimonio em
       JOIN public.gp_edt_matrimonio_elemento eme
         ON eme.id_edt_matrimonio = em.id_edt_matrimonio
       WHERE em.id_matrimonio = $1 AND em.estado = true AND eme.activo = true
         AND eme.id_edt_elemento_origen IS NOT NULL`,
      [idMatrimonio],
    );
    return filas.map((fila) => String(fila.id_edt_elemento_origen));
  }

  async crearTiming(data: CrearTimingCronograma): Promise<{ idTiming: string }> {
    const { listaVerificacion, ...timing } = data;
    const creado = (await this.db.orm.public.Timing.create({
      ...timing,
      listaVerificacionLegacy: listaVerificacion,
      fechaHoraInicio: this.aInstant(data.fechaHoraInicio),
      fechaHoraFin: this.aInstant(data.fechaHoraFin),
      modificadoManualmente: false,
      activo: true,
    } as never)) as { idTiming: string };
    return { idTiming: creado.idTiming };
  }

  async crearTimingDependencia(data: {
    idTimingPredecesor: string;
    idTimingSucesor: string;
    tipoDependencia: 'FINISH_TO_START';
    minutosDesfase: number;
  }): Promise<void> {
    await this.db.orm.public.TimingDependencia.create(data as never);
  }

  async obtenerProyecto(idProyecto: string) {
    const proyecto = (await this.db.orm.public.Proyecto.first({
      idProyecto: idProyecto as never,
    })) as {
      idProyecto: string;
      idPm: number | null;
      nombre: string | null;
      idFaseProyecto: number | null;
      estado: boolean;
    } | null;
    return proyecto;
  }

  async listarFasesProyecto(): Promise<
    Array<{ idFaseProyecto: number; codigo: string; activo: boolean }>
  > {
    return (await this.db.orm.public.FaseProyecto.all()) as Array<{
      idFaseProyecto: number;
      codigo: string;
      activo: boolean;
    }>;
  }

  async actualizarProyectoFase(
    idProyecto: string,
    idFaseProyecto: number,
  ): Promise<void> {
    await this.db.orm.public.Proyecto.where({
      idProyecto: idProyecto as never,
    }).update({ idFaseProyecto } as never);
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

  async listarHitoActividades(idProyecto: string): Promise<Record<string, unknown>[]> {
    const [relaciones, hitos] = await Promise.all([
      this.db.orm.public.HitoActividad.all(),
      this.db.orm.public.Hito.all(),
    ]);
    const idsHitos = new Set((hitos as Array<Record<string, unknown>>)
      .filter((hito) => hito.idProyecto === idProyecto)
      .map((hito) => String(hito.idHito)));
    const actuales = (relaciones as Array<Record<string, unknown>>).filter((relacion) => idsHitos.has(String(relacion.idHito)));
    if (actuales.length) return actuales;
    // Compatibilidad de datos pre-refactor: la columna se conserva sin FK hasta
    // que el proceso de migración de instancias haya materializado el puente.
    const actividades = await this.leerActividadesOperativas();
    return actividades
      .filter((actividad) => actividad.idProyecto === idProyecto && actividad.idHitoLegacy)
      .map((actividad) => ({ idHito: actividad.idHitoLegacy, idActividad: actividad.idActividad }));
  }

  async crearHitoActividadManual(idHito: string, idActividad: string): Promise<void> {
    await this.db.orm.public.HitoActividad.create({ idHito, idActividad } as never);
  }

  async listarActividades(
    idProyecto: string,
    filtros: FiltrosCronograma,
  ): Promise<Record<string, unknown>[]> {
    const actividades = await this.leerActividadesOperativas();
    return actividades
      .filter(
        (actividad) =>
          this.perteneceYCoincide(actividad, idProyecto, filtros) &&
          (!filtros.idUsuarioResponsable ||
            actividad.idUsuarioResponsable === filtros.idUsuarioResponsable),
      )
      .sort((a, b) => Number(a.orden) - Number(b.orden));
  }

  async obtenerActividad(
    idActividad: string,
  ): Promise<Record<string, unknown> | null> {
    return (await this.leerActividadesOperativas()).find(
      (actividad) => actividad.idActividad === idActividad,
    ) ?? null;
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
    await this.actualizarOperativo(
      'cr_actividad',
      'id_actividad',
      idActividad,
      data,
      {
        idPlantillaActividad: 'id_plantilla_actividad',
        nombre: 'nombre', categoria: 'categoria', descripcion: 'descripcion',
        entregable: 'entregable', fechaInicio: 'fecha_inicio', fechaFin: 'fecha_fin',
        prioridad: 'prioridad', estado: 'estado', idUsuarioResponsable: 'id_usuario_responsable',
        responsableTexto: 'responsable_texto', orden: 'orden', modificadoManualmente: 'modificado_manualmente', activo: 'activo',
      },
    );
    return { idActividad, ...data };
  }

  async listarChecklistActividad(idActividad: string): Promise<Record<string, unknown>[]> {
    const items = await this.db.orm.public.ActividadChecklist.all();
    return (items as Array<Record<string, unknown>>)
      .filter(
        (item) =>
          String(item.idActividad) === idActividad && item.activo !== false,
      )
      .sort((a, b) => Number(a.orden) - Number(b.orden));
  }

  async crearChecklistActividadManual(data: Record<string, unknown>): Promise<Record<string, unknown>> {
    return (await this.db.orm.public.ActividadChecklist.create({
      ...data, activo: true, completado: false, modificadoManualmente: true,
    } as never)) as Record<string, unknown>;
  }

  async actualizarChecklistActividad(idChecklist: string, data: Record<string, unknown>): Promise<Record<string, unknown>> {
    return (await this.db.orm.public.ActividadChecklist.where({ idChecklist: idChecklist as never }).update(data as never)) as Record<string, unknown>;
  }

  async listarDependencias(
    idProyecto: string,
  ): Promise<Record<string, unknown>[]> {
    const [dependencias, actividades] = await Promise.all([
      this.db.orm.public.Dependencia.all(),
      this.leerActividadesOperativas(),
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
    const timing = await this.leerTimingOperativo();
    return timing
      .filter(
        (item) =>
          this.perteneceYCoincide(item, idProyecto, filtros) &&
          (!filtros.idUsuarioResponsable ||
            item.idUsuarioResponsable === filtros.idUsuarioResponsable),
      )
      .sort(
        (a, b) =>
          (Number(a.orden ?? 0) - Number(b.orden ?? 0)) ||
          (this.aFecha(a.fechaHoraInicio)!.getTime() -
            this.aFecha(b.fechaHoraInicio)!.getTime()),
      );
  }

  async obtenerTiming(
    idTiming: string,
  ): Promise<Record<string, unknown> | null> {
    return (await this.leerTimingOperativo()).find(
      (timing) => timing.idTiming === idTiming,
    ) ?? null;
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
    await this.actualizarOperativo(
      'cr_timing',
      'id_timing',
      idTiming,
      data,
      {
        idPlantillaTiming: 'id_plantilla_timing', actividad: 'actividad', ubicacion: 'ubicacion',
        fechaHoraInicio: 'fecha_hora_inicio', fechaHoraFin: 'fecha_hora_fin',
        duracionMinutos: 'duracion_minutos', idUsuarioResponsable: 'id_usuario_responsable',
        responsableTexto: 'responsable_texto', listaVerificacion: 'lista_verificacion',
        estado: 'estado', orden: 'orden', modificadoManualmente: 'modificado_manualmente', activo: 'activo',
      },
    );
    return { idTiming, ...data };
  }

  async listarPlantillasActividad(): Promise<Record<string, unknown>[]> {
    return (await this.db.orm.public.PlantillaActividad.all()) as Array<Record<string, unknown>>;
  }

  async listarPlantillasHito(): Promise<Record<string, unknown>[]> {
    return (await this.db.orm.public.PlantillaHito.all()) as Array<Record<string, unknown>>;
  }

  async listarPlantillasTiming(): Promise<Record<string, unknown>[]> {
    return (await this.db.orm.public.PlantillaTiming.all()) as Array<Record<string, unknown>>;
  }

  async listarPlantillasDependencia(): Promise<Record<string, unknown>[]> {
    return (await this.db.orm.public.PlantillaDependencia.all()) as Array<Record<string, unknown>>;
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

  /**
   * Algunas filas legadas guardan JSON escalar. Prisma 8 no las decodifica,
   * aunque PostgreSQL las conserva correctamente; se leen por pg y se exponen
   * con la misma forma camelCase del cliente Prisma.
   */
  private async leerActividadesOperativas(): Promise<Record<string, unknown>[]> {
    const filas = await this.consultarSql('SELECT * FROM public.cr_actividad');
    return filas.map((fila) => this.mapearFilaOperativa(fila));
  }

  private async leerTimingOperativo(): Promise<Record<string, unknown>[]> {
    const filas = await this.consultarSql('SELECT * FROM public.cr_timing');
    return filas.map((fila) => this.mapearFilaOperativa(fila));
  }

  private async consultarSql(sql: string, valores?: unknown[]): Promise<FilaSql[]> {
    clientePg.types.setTypeParser(114, (valor: string) => valor);
    clientePg.types.setTypeParser(3802, (valor: string) => valor);
    const cliente = new clientePg.Client({ connectionString: process.env.DATABASE_URL });
    await cliente.connect();
    try {
      return (await cliente.query(sql, valores)).rows;
    } finally {
      await cliente.end();
    }
  }

  private mapearFilaOperativa(fila: FilaSql): Record<string, unknown> {
    const mapa: Record<string, string> = {
      id_actividad: 'idActividad', id_proyecto: 'idProyecto', id_hito: 'idHitoLegacy',
      id_plantilla_actividad: 'idPlantillaActividad',
      fecha_inicio: 'fechaInicio', fecha_fin: 'fechaFin', id_usuario_responsable: 'idUsuarioResponsable',
      responsable_texto: 'responsableTexto', modificado_manualmente: 'modificadoManualmente',
      lista_verificacion: 'listaVerificacion',
      id_timing: 'idTiming', id_plantilla_timing: 'idPlantillaTiming',
      fecha_hora_inicio: 'fechaHoraInicio', fecha_hora_fin: 'fechaHoraFin',
      duracion_minutos: 'duracionMinutos', created_at: 'createdAt', updated_at: 'updatedAt',
    };
    return Object.fromEntries(Object.entries(fila).map(([clave, valor]) => {
      if (clave === 'lista_verificacion' && typeof valor === 'string') {
        try {
          return [mapa[clave], JSON.parse(valor)];
        } catch (_) {
          // Las instalaciones antiguas conservaron texto separado por punto y
          // coma: se expone sin perderlo para que Flutter lo presente como lista.
          return [mapa[clave], valor];
        }
      }
      return [mapa[clave] ?? clave, valor];
    }));
  }

  private async actualizarOperativo(
    tabla: 'cr_actividad' | 'cr_timing',
    columnaId: string,
    id: string,
    datos: Record<string, unknown>,
    columnas: Record<string, string>,
  ): Promise<void> {
    const asignaciones: string[] = [];
    const valores: unknown[] = [];
    for (const [campo, valor] of Object.entries(datos)) {
      const columna = columnas[campo];
      if (!columna) continue;
      valores.push(
        campo === 'listaVerificacion' && valor !== null && typeof valor !== 'string'
          ? JSON.stringify(valor)
          : valor instanceof Date ? valor.toISOString() : valor,
      );
      asignaciones.push(`"${columna}" = $${valores.length}`);
    }
    if (!asignaciones.length) return;
    asignaciones.push('updated_at = CURRENT_TIMESTAMP');
    valores.push(id);
    await this.consultarSql(
      `UPDATE public.${tabla} SET ${asignaciones.join(', ')} WHERE "${columnaId}" = $${valores.length}`,
      valores,
    );
  }

  private async leerPlantillasCompatibles(): Promise<{
    hitos: FilaSql[];
    actividades: FilaSql[];
    dependencias: FilaSql[];
    timings: FilaSql[];
    actividadTipos: FilaSql[];
    timingTipos: FilaSql[];
    checklist: FilaSql[];
    hitosActividades: FilaSql[];
    actividadesEdt: FilaSql[];
    timingDependencias: FilaSql[];
  }> {
    clientePg.types.setTypeParser(114, (valor: string) => valor);
    clientePg.types.setTypeParser(3802, (valor: string) => valor);
    const cliente = new clientePg.Client({ connectionString: process.env.DATABASE_URL });
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
      const checklist = await cliente.query(
        'SELECT * FROM public.cr_plantilla_actividad_checklist',
      );
      const hitosActividades = await cliente.query(
        'SELECT * FROM public.cr_plantilla_hito_actividad',
      );
      const actividadesEdt = await cliente.query(
        'SELECT * FROM public.cr_plantilla_actividad_edt',
      );
      const timingDependencias = await cliente.query(
        'SELECT * FROM public.cr_plantilla_timing_dependencia',
      );
      return {
        hitos: hitos.rows,
        actividades: actividades.rows,
        dependencias: dependencias.rows,
        timings: timings.rows,
        actividadTipos: actividadTipos.rows,
        timingTipos: timingTipos.rows,
        checklist: checklist.rows,
        hitosActividades: hitosActividades.rows,
        actividadesEdt: actividadesEdt.rows,
        timingDependencias: timingDependencias.rows,
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

  private aListaTexto(valor: unknown): string[] {
    const json = this.aJsonONulo(valor);
    if (Array.isArray(json)) {
      return json.map(String).map((item) => item.trim()).filter(Boolean);
    }
    return String(json ?? '')
      .split(';')
      .map((item) => item.trim())
      .filter(Boolean);
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
