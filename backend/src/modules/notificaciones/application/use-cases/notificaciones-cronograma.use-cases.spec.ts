import { AlertasCronogramaService } from '../services/alertas-cronograma.service';
import {
  ConsultarNotificacionesCronogramaUseCase,
  GenerarAlertasCronogramaUseCase,
  NotificacionesCronogramaService,
} from './notificaciones-cronograma.use-cases';
import {
  NotificacionesRepository,
  NotificacionCronogramaCrear,
  FiltrosNotificacion,
} from '../../domain/repositories/notificaciones.repository';

const proyecto = '11111111-1111-4111-8111-111111111111';
class RepositorioNotificaciones extends NotificacionesRepository {
  actividades: Record<string, unknown>[] = [];
  hitos: Record<string, unknown>[] = [];
  items: Record<string, unknown>[] = [];
  async obtenerProyecto() {
    return { idProyecto: proyecto, idPm: 1 };
  }
  async usuariosDestinatariosActividad(_: string, actividad: string) {
    return actividad === 'a2' ? [1, 2] : [1];
  }
  async usuariosDestinatariosHito() {
    return [1];
  }
  async listarActividadesAlertables() {
    return this.actividades;
  }
  async listarHitosAlertables() {
    return this.hitos;
  }
  async existeNotificacionEquivalente(data: NotificacionCronogramaCrear) {
    return this.items.some(
      (item) =>
        item.idUsuarioDestino === data.idUsuarioDestino &&
        item.idProyecto === data.idProyecto &&
        item.tipoEventoCronograma === data.tipoEvento &&
        (item.idActividad ?? null) === (data.idActividad ?? null) &&
        (item.idHito ?? null) === (data.idHito ?? null) &&
        new Date(String(item.fechaReferencia)).getTime() ===
          (data.fechaReferencia?.getTime() ?? 0) &&
        item.activo !== false,
    );
  }
  async crearNotificacionCronograma(data: NotificacionCronogramaCrear) {
    const item = {
      idNotificacion: `n${this.items.length + 1}`,
      ...data,
      tipoEventoCronograma: data.tipoEvento,
      leida: false,
      activo: true,
      fechaGeneracion: new Date(),
    };
    this.items.push(item);
    return item;
  }
  async listarNotificaciones(
    idProyecto: string,
    idUsuario: number,
    filtros: FiltrosNotificacion,
  ) {
    return this.items.filter(
      (item) =>
        item.idProyecto === idProyecto &&
        item.idUsuarioDestino === idUsuario &&
        (filtros.leida === undefined || item.leida === filtros.leida) &&
        (filtros.activo === undefined || item.activo === filtros.activo) &&
        (!filtros.tipoEvento ||
          item.tipoEventoCronograma === filtros.tipoEvento),
    );
  }
  async obtenerNotificacion(id: string) {
    return this.items.find((item) => item.idNotificacion === id) ?? null;
  }
  async actualizarNotificacion(id: string, data: Record<string, unknown>) {
    const item = (await this.obtenerNotificacion(id))!;
    Object.assign(item, data);
    return item;
  }
  async usuarioTieneAccesoProyecto(_: string, idUsuario: number) {
    return idUsuario === 1 || idUsuario === 2;
  }
}
describe('Alertas de cronograma', () => {
  let repo: RepositorioNotificaciones;
  let alertas: GenerarAlertasCronogramaUseCase;
  const hoy = new Date('2027-01-10T12:00:00Z');
  beforeEach(() => {
    repo = new RepositorioNotificaciones();
    alertas = new GenerarAlertasCronogramaUseCase(
      repo,
      new AlertasCronogramaService(),
    );
  });
  it('genera alerta próxima a vencer', async () => {
    repo.actividades = [
      {
        idActividad: 'a1',
        idProyecto: proyecto,
        nombre: 'Actividad',
        fechaFin: new Date('2027-01-12'),
        estado: 'PENDIENTE',
        activo: true,
      },
    ];
    await alertas.execute(hoy);
    expect(repo.items[0].tipoEvento).toBe('ACTIVIDAD_PROXIMA_VENCER');
  });
  it('genera alerta vencida e ignora completada', async () => {
    repo.actividades = [
      {
        idActividad: 'a1',
        idProyecto: proyecto,
        nombre: 'Vencida',
        fechaFin: new Date('2027-01-09'),
        estado: 'PENDIENTE',
        activo: true,
      },
      {
        idActividad: 'a2',
        idProyecto: proyecto,
        nombre: 'Lista',
        fechaFin: new Date('2027-01-09'),
        estado: 'COMPLETADA',
        activo: true,
      },
    ];
    await alertas.execute(hoy);
    expect(repo.items).toHaveLength(1);
    expect(repo.items[0].tipoEvento).toBe('ACTIVIDAD_VENCIDA');
  });
  it('no duplica alertas equivalentes', async () => {
    repo.actividades = [
      {
        idActividad: 'a1',
        idProyecto: proyecto,
        nombre: 'Actividad',
        fechaFin: new Date('2027-01-12'),
        estado: 'PENDIENTE',
        activo: true,
      },
    ];
    await alertas.execute(hoy);
    await alertas.execute(hoy);
    expect(repo.items).toHaveLength(1);
  });
  it('genera alertas de hito próximo y vencido', async () => {
    repo.hitos = [
      {
        idHito: 'h1',
        idProyecto: proyecto,
        nombre: 'Próximo',
        fechaObjetivo: new Date('2027-01-11'),
        estado: 'PENDIENTE',
        activo: true,
      },
      {
        idHito: 'h2',
        idProyecto: proyecto,
        nombre: 'Vencido',
        fechaObjetivo: new Date('2027-01-09'),
        estado: 'PENDIENTE',
        activo: true,
      },
    ];
    await alertas.execute(hoy);
    expect(repo.items.map((i) => i.tipoEvento)).toEqual([
      'HITO_PROXIMO',
      'HITO_VENCIDO',
    ]);
  });
  it('notifica la reprogramación a planner y responsable', async () => {
    await new NotificacionesCronogramaService(
      repo,
    ).notificarActividadReprogramada(proyecto, 'a2', hoy);
    expect(repo.items).toHaveLength(2);
  });
  it('marca una y todas las notificaciones como leídas aisladas por usuario', async () => {
    await repo.crearNotificacionCronograma({
      idUsuarioDestino: 1,
      idProyecto: proyecto,
      idActividad: 'a1',
      tipoEvento: 'ACTIVIDAD_VENCIDA',
      fechaReferencia: hoy,
      titulo: 'x',
      mensaje: 'x',
    });
    await repo.crearNotificacionCronograma({
      idUsuarioDestino: 2,
      idProyecto: proyecto,
      idActividad: 'a2',
      tipoEvento: 'ACTIVIDAD_VENCIDA',
      fechaReferencia: hoy,
      titulo: 'x',
      mensaje: 'x',
    });
    const consulta = new ConsultarNotificacionesCronogramaUseCase(repo);
    await consulta.marcarLeida(proyecto, 'n1', 1);
    await consulta.marcarTodasLeidas(proyecto, 1);
    expect(repo.items[0].leida).toBe(true);
    expect(repo.items[1].leida).toBe(false);
  });
});
