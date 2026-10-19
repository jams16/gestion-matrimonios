import { BadRequestException, NotFoundException } from '@nestjs/common';

import {
  CronogramaCrudRepository,
  FiltrosCronograma,
} from '../../domain/repositories/cronograma-crud.repository';
import {
  ConsultarCronogramaUseCase,
  GestionarActividadesUseCase,
  GestionarDependenciasUseCase,
} from './gestionar-cronograma.use-cases';

const proyecto = '11111111-1111-4111-8111-111111111111';
const otroProyecto = '22222222-2222-4222-8222-222222222222';
const actividadA = '33333333-3333-4333-8333-333333333333';
const actividadB = '44444444-4444-4444-8444-444444444444';

class RepositorioMemoria extends CronogramaCrudRepository {
  actividades: Record<string, unknown>[] = [];
  dependencias: Record<string, unknown>[] = [];
  actualizaciones: Record<string, unknown>[] = [];
  async obtenerProyecto(id: string) {
    return id === proyecto || id === otroProyecto
      ? { idProyecto: id, idPm: 10, nombre: 'Proyecto' }
      : null;
  }
  async listarHitos(idProyecto: string, filtros: FiltrosCronograma) {
    void idProyecto;
    void filtros;
    return [];
  }
  async obtenerHito(idHito: string) {
    void idHito;
    return null;
  }
  async crearHitoManual(data: Record<string, unknown>) {
    return data;
  }
  async actualizarHito(_: string, data: Record<string, unknown>) {
    return data;
  }
  async listarActividades(idProyecto: string, filtros: FiltrosCronograma) {
    return this.actividades.filter(
      (a) =>
        a.idProyecto === idProyecto &&
        (filtros.activo === undefined || a.activo === filtros.activo),
    );
  }
  async obtenerActividad(id: string) {
    return this.actividades.find((a) => a.idActividad === id) ?? null;
  }
  async crearActividadManual(data: Record<string, unknown>) {
    this.actividades.push({ idActividad: actividadA, ...data });
    return this.actividades.at(-1)!;
  }
  async actualizarActividad(id: string, data: Record<string, unknown>) {
    this.actualizaciones.push({ id, ...data });
    return { idActividad: id, ...data };
  }
  async listarDependencias(idProyecto: string) {
    return this.dependencias.filter((d) => d.idProyecto === idProyecto);
  }
  async obtenerDependencia(idDependencia: string) {
    void idDependencia;
    return null;
  }
  async crearDependenciaManual(data: Record<string, unknown>) {
    const creada = {
      idDependencia: '55555555-5555-4555-8555-555555555555',
      idProyecto: proyecto,
      ...data,
    };
    this.dependencias.push(creada);
    return creada;
  }
  async eliminarDependencia(idDependencia: string) {
    void idDependencia;
    return;
  }
  async listarTiming(idProyecto: string, filtros: FiltrosCronograma) {
    void idProyecto;
    void filtros;
    return [];
  }
  async obtenerTiming(idTiming: string) {
    void idTiming;
    return null;
  }
  async crearTimingManual(data: Record<string, unknown>) {
    return data;
  }
  async actualizarTiming(_: string, data: Record<string, unknown>) {
    return data;
  }
}

describe('Gestionar cronograma', () => {
  let repository: RepositorioMemoria;
  let actividades: GestionarActividadesUseCase;
  let dependencias: GestionarDependenciasUseCase;

  beforeEach(() => {
    repository = new RepositorioMemoria();
    repository.actividades = [
      {
        idActividad: actividadA,
        idProyecto: proyecto,
        fechaFin: new Date('2020-01-01'),
        estado: 'PENDIENTE',
        activo: true,
      },
      {
        idActividad: actividadB,
        idProyecto: proyecto,
        fechaFin: new Date('2030-01-01'),
        estado: 'COMPLETADA',
        activo: true,
      },
    ];
    actividades = new GestionarActividadesUseCase(repository);
    dependencias = new GestionarDependenciasUseCase(repository);
  });

  it('crea una actividad manual', async () => {
    await actividades.crear(
      proyecto,
      { nombre: 'Actividad', fechaFin: '2027-01-02T00:00:00.000Z' },
      10,
    );
    expect(repository.actividades.at(-1)).toMatchObject({
      activo: true,
      modificadoManualmente: true,
      estado: 'PENDIENTE',
    });
  });

  it('cambia el estado de una actividad', async () => {
    await actividades.cambiarEstado(
      proyecto,
      actividadA,
      { estado: 'EN_PROCESO' },
      10,
    );
    expect(repository.actualizaciones.at(-1)).toMatchObject({
      estado: 'EN_PROCESO',
    });
  });

  it('realiza borrado lógico de actividad', async () => {
    await actividades.eliminar(proyecto, actividadA, 10);
    expect(repository.actualizaciones.at(-1)).toMatchObject({ activo: false });
  });

  it('rechaza una dependencia consigo misma', async () => {
    await expect(
      dependencias.crear(
        proyecto,
        { idActividadPredecesora: actividadA, idActividadSucesora: actividadA },
        10,
      ),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('rechaza una dependencia entre proyectos distintos', async () => {
    repository.actividades.push({
      idActividad: '66666666-6666-4666-8666-666666666666',
      idProyecto: otroProyecto,
      activo: true,
    });
    await expect(
      dependencias.crear(
        proyecto,
        {
          idActividadPredecesora: actividadA,
          idActividadSucesora: '66666666-6666-4666-8666-666666666666',
        },
        10,
      ),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('calcula el resumen de cronograma', async () => {
    const resumen = await new ConsultarCronogramaUseCase(repository).resumen(
      proyecto,
      10,
    );
    expect(resumen).toMatchObject({
      total_actividades: 2,
      pendientes: 1,
      completadas: 1,
      retrasadas: 1,
      total_hitos: 0,
    });
  });
});
