import { CronogramaCrudRepository } from '../../../src/modules/cronograma/domain/repositories/cronograma-crud.repository';

export const idProyectoE04 = '11111111-1111-4111-8111-111111111111';
export const idUsuarioE04 = 7001;

export class RepositorioCronogramaMemoria extends CronogramaCrudRepository {
  actividades: Record<string, unknown>[] = [];
  hitos: Record<string, unknown>[] = [];
  checklist: Record<string, unknown>[] = [];
  dependencias: Record<string, unknown>[] = [];
  relacionesHitoActividad: Record<string, unknown>[] = [];
  timing: Record<string, unknown>[] = [];
  private secuencia = 1;

  async ejecutarEnTransaccionCrud<T>(
    operacion: (repositorio: CronogramaCrudRepository) => Promise<T>,
  ): Promise<T> {
    return operacion(this);
  }
  async obtenerProyecto(idProyecto: string) {
    return idProyecto === idProyectoE04
      ? {
          idProyecto,
          idPm: idUsuarioE04,
          nombre: 'Boda de prueba',
          idFaseProyecto: 3,
          estado: true,
        }
      : null;
  }
  async listarFasesProyecto() {
    return [];
  }
  async actualizarProyectoFase() {
    return;
  }
  async obtenerVentanaProyecto() {
    return {
      fechaInicio: new Date('2027-01-01'),
      fechaMatrimonio: new Date('2027-12-31'),
    };
  }

  async listarHitos(idProyecto: string) {
    return this.hitos.filter((item) => item.idProyecto === idProyecto);
  }
  async obtenerHito(idHito: string) {
    return this.hitos.find((item) => item.idHito === idHito) ?? null;
  }
  async crearHitoManual(data: Record<string, unknown>) {
    const creado = { idHito: `hito-${this.secuencia++}`, ...data };
    this.hitos.push(creado);
    return creado;
  }
  async actualizarHito(idHito: string, data: Record<string, unknown>) {
    const actual = await this.obtenerHito(idHito);
    if (!actual) throw new Error('Hito no encontrado.');
    Object.assign(actual, data);
    return actual;
  }
  async listarHitoActividades(idProyecto: string) {
    return this.relacionesHitoActividad.filter(
      (item) => item.idProyecto === idProyecto,
    );
  }
  async crearHitoActividadManual(idHito: string, idActividad: string) {
    this.relacionesHitoActividad.push({
      idProyecto: idProyectoE04,
      idHito,
      idActividad,
    });
  }
  async eliminarHitoActividadManual(idHito: string, idActividad: string) {
    this.relacionesHitoActividad = this.relacionesHitoActividad.filter(
      (item) => item.idHito !== idHito || item.idActividad !== idActividad,
    );
  }
  async reemplazarHitoActividades(
    idProyecto: string,
    relaciones: Array<{ idHito: string; idActividad: string }>,
  ) {
    this.relacionesHitoActividad = relaciones.map((item) => ({
      idProyecto,
      ...item,
    }));
  }

  async listarActividades(idProyecto: string) {
    return this.actividades.filter((item) => item.idProyecto === idProyecto);
  }
  async obtenerActividad(idActividad: string) {
    return (
      this.actividades.find((item) => item.idActividad === idActividad) ?? null
    );
  }
  async crearActividadManual(data: Record<string, unknown>) {
    const creada = { idActividad: `actividad-${this.secuencia++}`, ...data };
    this.actividades.push(creada);
    return creada;
  }
  async actualizarActividad(
    idActividad: string,
    data: Record<string, unknown>,
  ) {
    const actual = await this.obtenerActividad(idActividad);
    if (!actual) throw new Error('Actividad no encontrada.');
    Object.assign(actual, data);
    return actual;
  }
  async listarChecklistActividad(idActividad: string) {
    return this.checklist.filter((item) => item.idActividad === idActividad);
  }
  async crearChecklistActividadManual(data: Record<string, unknown>) {
    const creado = {
      idChecklist: `checklist-${this.secuencia++}`,
      activo: true,
      completado: false,
      ...data,
    };
    this.checklist.push(creado);
    return creado;
  }
  async actualizarChecklistActividad(
    idChecklist: string,
    data: Record<string, unknown>,
  ) {
    const actual = this.checklist.find(
      (item) => item.idChecklist === idChecklist,
    );
    if (!actual) throw new Error('Checklist no encontrado.');
    Object.assign(actual, data);
    return actual;
  }

  async listarDependencias(idProyecto: string) {
    return this.dependencias.filter((item) => item.idProyecto === idProyecto);
  }
  async obtenerDependencia(idDependencia: string) {
    return (
      this.dependencias.find((item) => item.idDependencia === idDependencia) ??
      null
    );
  }
  async crearDependenciaManual(data: Record<string, unknown>) {
    const creada = {
      idDependencia: `dependencia-${this.secuencia++}`,
      idProyecto: idProyectoE04,
      ...data,
    };
    this.dependencias.push(creada);
    return creada;
  }
  async eliminarDependencia(idDependencia: string) {
    this.dependencias = this.dependencias.filter(
      (item) => item.idDependencia !== idDependencia,
    );
  }

  async listarTiming(idProyecto: string) {
    return this.timing.filter((item) => item.idProyecto === idProyecto);
  }
  async obtenerTiming(idTiming: string) {
    return this.timing.find((item) => item.idTiming === idTiming) ?? null;
  }
  async crearTimingManual(data: Record<string, unknown>) {
    const creado = { idTiming: `timing-${this.secuencia++}`, ...data };
    this.timing.push(creado);
    return creado;
  }
  async actualizarTiming(idTiming: string, data: Record<string, unknown>) {
    const actual = await this.obtenerTiming(idTiming);
    if (!actual) throw new Error('Timing no encontrado.');
    Object.assign(actual, data);
    return actual;
  }
  async listarPlantillasActividad() {
    return [];
  }
  async listarPlantillasHito() {
    return [];
  }
  async listarPlantillasTiming() {
    return [];
  }
  async listarPlantillasDependencia() {
    return [];
  }
}
