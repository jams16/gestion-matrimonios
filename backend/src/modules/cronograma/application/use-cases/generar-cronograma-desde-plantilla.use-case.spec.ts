import { GenerarCronogramaDesdePlantillaUseCase } from './generar-cronograma-desde-plantilla.use-case';
import { CronogramaDateService } from '../services/cronograma-date.service';
import {
  ContextoCronogramaProyecto,
  CrearActividadCronograma,
  CrearDependenciaCronograma,
  CrearHitoCronograma,
  CrearTimingCronograma,
  CronogramaRepository,
  PlantillasCronograma,
} from '../../domain/repositories/cronograma.repository';

class CronogramaRepositoryMemoria extends CronogramaRepository {
  contexto: ContextoCronogramaProyecto = {
    idProyecto: 'proyecto-1',
    matrimonioExiste: true,
    fechaInicio: new Date('2026-01-01T00:00:00.000Z'),
    fechaMatrimonio: new Date('2027-01-31T00:00:00.000Z'),
    idTipoCeremonia: 1,
  };
  plantillas: PlantillasCronograma = {
    hitos: [],
    actividades: [],
    dependencias: [],
    timings: [],
    actividadesPorTipoCeremonia: new Map(),
    timingsPorTipoCeremonia: new Map(),
  };
  hitos: CrearHitoCronograma[] = [];
  actividades: CrearActividadCronograma[] = [];
  dependencias: CrearDependenciaCronograma[] = [];
  timings: CrearTimingCronograma[] = [];

  ejecutarEnTransaccion<T>(
    operacion: (repositorio: CronogramaRepository) => Promise<T>,
  ): Promise<T> {
    return operacion(this);
  }
  obtenerContextoProyecto(): Promise<ContextoCronogramaProyecto> {
    return Promise.resolve(this.contexto);
  }
  existeCronogramaGenerado(): Promise<boolean> {
    return Promise.resolve(false);
  }
  obtenerPlantillasActivas(): Promise<PlantillasCronograma> {
    return Promise.resolve(this.plantillas);
  }
  crearHito(data: CrearHitoCronograma): Promise<{ idHito: string }> {
    this.hitos.push(data);
    return Promise.resolve({ idHito: `hito-${this.hitos.length}` });
  }
  crearActividad(
    data: CrearActividadCronograma,
  ): Promise<{ idActividad: string }> {
    this.actividades.push(data);
    return Promise.resolve({
      idActividad: `actividad-${this.actividades.length}`,
    });
  }
  crearDependencia(data: CrearDependenciaCronograma): Promise<void> {
    this.dependencias.push(data);
    return Promise.resolve();
  }
  crearTiming(data: CrearTimingCronograma): Promise<void> {
    this.timings.push(data);
    return Promise.resolve();
  }
}

describe('GenerarCronogramaDesdePlantillaUseCase', () => {
  const fechas = new CronogramaDateService();

  it('calcula ESCALABLE para un proyecto de 395 días', () => {
    const inicio = new Date('2026-01-01T00:00:00.000Z');
    const boda = new Date('2027-01-31T00:00:00.000Z');
    expect(
      fechas.calcularFechaObjetivo(inicio, boda, 'ESCALABLE', 100),
    ).toEqual(new Date('2026-10-23T00:00:00.000Z'));
  });

  it('escala un proyecto de duración menor sin crear fechas anteriores al inicio', () => {
    const inicio = new Date('2026-01-01T00:00:00.000Z');
    const boda = new Date('2026-04-11T00:00:00.000Z');
    expect(
      fechas.calcularFechaObjetivo(inicio, boda, 'ESCALABLE', 395),
    ).toEqual(inicio);
  });

  it('calcula FIJO_EVENTO', () => {
    const inicio = new Date('2026-01-01T00:00:00.000Z');
    const boda = new Date('2026-07-01T00:00:00.000Z');
    expect(
      fechas.calcularFechaObjetivo(inicio, boda, 'FIJO_EVENTO', 30),
    ).toEqual(new Date('2026-06-01T00:00:00.000Z'));
  });

  it('calcula DIA_EVENTO', () => {
    const inicio = new Date('2026-01-01T00:00:00.000Z');
    const boda = new Date('2026-07-01T00:00:00.000Z');
    expect(fechas.calcularFechaObjetivo(inicio, boda, 'DIA_EVENTO', 0)).toEqual(
      boda,
    );
  });

  it('filtra actividades por tipo de ceremonia', async () => {
    const repository = new CronogramaRepositoryMemoria();
    repository.plantillas.actividades = [
      {
        idPlantillaActividad: 1,
        idPlantillaHito: null,
        nombre: 'Aplicable a todos',
        listaVerificacion: null,
        responsableSugerido: null,
        entregable: null,
        tipoTemporal: 'DIA_EVENTO',
        diasAntesBase: 0,
        diasAntesMinimo: null,
        duracionEstimadaDias: 0,
        prioridad: null,
        orden: 1,
      },
      {
        idPlantillaActividad: 2,
        idPlantillaHito: null,
        nombre: 'Solo ceremonia 2',
        listaVerificacion: null,
        responsableSugerido: null,
        entregable: null,
        tipoTemporal: 'DIA_EVENTO',
        diasAntesBase: 0,
        diasAntesMinimo: null,
        duracionEstimadaDias: 0,
        prioridad: null,
        orden: 2,
      },
    ];
    repository.plantillas.actividadesPorTipoCeremonia.set(2, [2]);
    const useCase = new GenerarCronogramaDesdePlantillaUseCase(
      repository,
      fechas,
    );
    const resumen = await useCase.execute('proyecto-1');

    expect(resumen.actividades_creadas).toBe(1);
    expect(repository.actividades[0].nombre).toBe('Aplicable a todos');
  });

  it('omite una dependencia cuando una actividad no fue generada', async () => {
    const repository = new CronogramaRepositoryMemoria();
    repository.plantillas.actividades = [
      {
        idPlantillaActividad: 1,
        idPlantillaHito: null,
        nombre: 'Predecesora',
        listaVerificacion: null,
        responsableSugerido: null,
        entregable: null,
        tipoTemporal: 'DIA_EVENTO',
        diasAntesBase: 0,
        diasAntesMinimo: null,
        duracionEstimadaDias: 0,
        prioridad: null,
        orden: 1,
      },
      {
        idPlantillaActividad: 2,
        idPlantillaHito: null,
        nombre: 'No aplicable',
        listaVerificacion: null,
        responsableSugerido: null,
        entregable: null,
        tipoTemporal: 'DIA_EVENTO',
        diasAntesBase: 0,
        diasAntesMinimo: null,
        duracionEstimadaDias: 0,
        prioridad: null,
        orden: 2,
      },
    ];
    repository.plantillas.actividadesPorTipoCeremonia.set(2, [2]);
    repository.plantillas.dependencias = [
      {
        idActividadPredecesora: 1,
        idActividadSucesora: 2,
        tipoDependencia: 'FINISH_TO_START',
        diasDesfase: 0,
      },
    ];

    const resumen = await new GenerarCronogramaDesdePlantillaUseCase(
      repository,
      fechas,
    ).execute('proyecto-1');

    expect(resumen.dependencias_creadas).toBe(0);
    expect(repository.dependencias).toHaveLength(0);
  });
});
