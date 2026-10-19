import { ConflictException, NotFoundException } from '@nestjs/common';

import {
  CronogramaCrudRepository,
  FiltrosCronograma,
} from '../../domain/repositories/cronograma-crud.repository';
import { ReprogramacionActividadesService } from '../services/reprogramacion-actividades.service';
import { ReprogramarActividadUseCase } from './reprogramar-actividad.use-case';

const proyecto = '11111111-1111-4111-8111-111111111111';
const otro = '22222222-2222-4222-8222-222222222222';
const A = '33333333-3333-4333-8333-333333333333';
const B = '44444444-4444-4444-8444-444444444444';
const C = '55555555-5555-4555-8555-555555555555';

class RepositorioReprogramacion extends CronogramaCrudRepository {
  actualizaciones: Record<string, unknown>[] = [];
  actividades: Record<string, unknown>[] = [
    {
      idActividad: A,
      idProyecto: proyecto,
      nombre: 'A',
      fechaInicio: new Date('2027-01-01'),
      fechaFin: new Date('2027-01-02'),
      activo: true,
    },
    {
      idActividad: B,
      idProyecto: proyecto,
      nombre: 'B',
      fechaInicio: new Date('2027-01-03'),
      fechaFin: new Date('2027-01-04'),
      activo: true,
    },
    {
      idActividad: C,
      idProyecto: proyecto,
      nombre: 'C',
      fechaInicio: new Date('2027-01-05'),
      fechaFin: new Date('2027-01-06'),
      activo: true,
    },
  ];
  dependencias: Record<string, unknown>[] = [
    {
      idDependencia: '66666666-6666-4666-8666-666666666666',
      idProyecto: proyecto,
      idActividadPredecesora: A,
      idActividadSucesora: B,
      tipoDependencia: 'FINISH_TO_START',
      diasDesfase: 0,
    },
  ];
  async ejecutarEnTransaccionCrud<T>(
    op: (repo: CronogramaCrudRepository) => Promise<T>,
  ): Promise<T> {
    return op(this);
  }
  async obtenerProyecto(id: string) {
    return id === proyecto || id === otro
      ? {
          idProyecto: id,
          idPm: 10,
          nombre: 'Proyecto',
          idFaseProyecto: 2,
          estado: true,
        }
      : null;
  }
  async listarFasesProyecto() {
    return [
      { idFaseProyecto: 2, codigo: 'INICIO', activo: true },
      { idFaseProyecto: 3, codigo: 'PLANIFICACION', activo: true },
    ];
  }
  async actualizarProyectoFase() {
    return;
  }
  async obtenerVentanaProyecto() {
    return {
      fechaInicio: new Date('2026-01-01'),
      fechaMatrimonio: new Date('2027-12-31'),
    };
  }
  async listarHitos() {
    return [];
  }
  async obtenerHito() {
    return null;
  }
  async crearHitoManual(data: Record<string, unknown>) {
    return data;
  }
  async actualizarHito(_: string, data: Record<string, unknown>) {
    return data;
  }
  async listarActividades(id: string, filtros: FiltrosCronograma) {
    return this.actividades.filter(
      (a) =>
        a.idProyecto === id &&
        (filtros.activo === undefined || a.activo === filtros.activo),
    );
  }
  async obtenerActividad(id: string) {
    return this.actividades.find((a) => a.idActividad === id) ?? null;
  }
  async crearActividadManual(data: Record<string, unknown>) {
    return data;
  }
  async actualizarActividad(id: string, data: Record<string, unknown>) {
    this.actualizaciones.push({ id, ...data });
    return { idActividad: id, ...data };
  }
  async listarDependencias(id: string) {
    return this.dependencias.filter((d) => d.idProyecto === id);
  }
  async obtenerDependencia() {
    return null;
  }
  async crearDependenciaManual(data: Record<string, unknown>) {
    return data;
  }
  async eliminarDependencia() {
    return;
  }
  async listarTiming() {
    return [];
  }
  async obtenerTiming() {
    return null;
  }
  async crearTimingManual(data: Record<string, unknown>) {
    return data;
  }
  async actualizarTiming(_: string, data: Record<string, unknown>) {
    return data;
  }
}

describe('Reprogramar actividad', () => {
  const servicio = new ReprogramacionActividadesService();
  let repository: RepositorioReprogramacion;
  let useCase: ReprogramarActividadUseCase;
  beforeEach(() => {
    repository = new RepositorioReprogramacion();
    useCase = new ReprogramarActividadUseCase(repository, servicio);
  });
  const fecha = (dia: number) =>
    new Date(`2027-01-${String(dia).padStart(2, '0')}T00:00:00.000Z`);

  it('no produce impacto para una actividad sin sucesoras', () => {
    const resultado = servicio.simular(
      repository.actividades[2] as never,
      undefined,
      fecha(7),
      repository.actividades as never,
      repository.dependencias as never,
    );
    expect(resultado.impactos).toHaveLength(0);
  });
  it('calcula una sucesora directa', () => {
    const resultado = servicio.simular(
      repository.actividades[0] as never,
      undefined,
      fecha(5),
      repository.actividades as never,
      repository.dependencias as never,
    );
    expect(resultado.impactos[0]).toMatchObject({
      idActividad: B,
      fechaInicioSugerida: fecha(5),
      fechaFinSugerida: fecha(6),
      depth: 1,
    });
  });
  it('propaga una cadena A→B→C', () => {
    repository.dependencias.push({
      idProyecto: proyecto,
      idActividadPredecesora: B,
      idActividadSucesora: C,
      tipoDependencia: 'FINISH_TO_START',
      diasDesfase: 0,
    });
    const resultado = servicio.simular(
      repository.actividades[0] as never,
      undefined,
      fecha(5),
      repository.actividades as never,
      repository.dependencias as never,
    );
    expect(resultado.impactos.map((i) => i.idActividad)).toEqual([B, C]);
  });
  it('respeta días de desfase', () => {
    repository.dependencias[0].diasDesfase = 2;
    const resultado = servicio.simular(
      repository.actividades[0] as never,
      undefined,
      fecha(5),
      repository.actividades as never,
      repository.dependencias as never,
    );
    expect(resultado.impactos[0].fechaInicioSugerida).toEqual(fecha(7));
  });
  it('no genera impacto si se conserva la dependencia válida', () => {
    const resultado = servicio.simular(
      repository.actividades[0] as never,
      undefined,
      fecha(2),
      repository.actividades as never,
      repository.dependencias as never,
    );
    expect(resultado.impactos).toHaveLength(0);
  });
  it('el preview no modifica registros', async () => {
    await useCase.previsualizar(
      proyecto,
      A,
      { nuevaFechaFin: fecha(5).toISOString() },
      10,
    );
    expect(repository.actualizaciones).toHaveLength(0);
  });
  it('confirma sin propagación cuando no hay impacto', async () => {
    await useCase.confirmar(
      proyecto,
      A,
      { nuevaFechaFin: fecha(2).toISOString(), propagar: false },
      10,
    );
    expect(repository.actualizaciones).toHaveLength(1);
  });
  it('confirma con propagación y actualiza sucesoras', async () => {
    await useCase.confirmar(
      proyecto,
      A,
      { nuevaFechaFin: fecha(5).toISOString(), propagar: true },
      10,
    );
    expect(repository.actualizaciones.map((item) => item.id)).toEqual([A, B]);
  });
  it('rechaza actividad de otro proyecto', async () => {
    repository.actividades.push({
      idActividad: '77777777-7777-4777-8777-777777777777',
      idProyecto: otro,
      nombre: 'Otra',
      fechaFin: fecha(3),
      activo: true,
    });
    await expect(
      useCase.previsualizar(
        proyecto,
        '77777777-7777-4777-8777-777777777777',
        { nuevaFechaFin: fecha(4).toISOString() },
        10,
      ),
    ).rejects.toBeInstanceOf(NotFoundException);
  });
  it('se protege ante un ciclo durante el recorrido', () => {
    repository.dependencias.push({
      idProyecto: proyecto,
      idActividadPredecesora: B,
      idActividadSucesora: A,
      tipoDependencia: 'FINISH_TO_START',
      diasDesfase: 0,
    });
    const resultado = servicio.simular(
      repository.actividades[0] as never,
      undefined,
      fecha(5),
      repository.actividades as never,
      repository.dependencias as never,
    );
    expect(resultado.impactos.map((i) => i.idActividad)).toEqual([B]);
  });
  it('rechaza confirmar sin propagación si hay impacto', async () => {
    await expect(
      useCase.confirmar(
        proyecto,
        A,
        { nuevaFechaFin: fecha(5).toISOString(), propagar: false },
        10,
      ),
    ).rejects.toBeInstanceOf(ConflictException);
  });
});
