import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AlertasCronogramaService } from '../services/alertas-cronograma.service';
import { ListarNotificacionesCronogramaDto } from '../dto/notificaciones.dto';
import {
  NotificacionCronogramaCrear,
  NotificacionesRepository,
} from '../../domain/repositories/notificaciones.repository';
import {
  NotificacionesCronogramaPort,
  TipoEventoCronograma,
} from '../../domain/ports/notificaciones-cronograma.port';

@Injectable()
export class GenerarAlertasCronogramaUseCase {
  constructor(
    private readonly repository: NotificacionesRepository,
    private readonly alertas: AlertasCronogramaService,
  ) {}
  async execute(hoy = new Date()) {
    const [actividades, hitos] = await Promise.all([
      this.repository.listarActividadesAlertables(),
      this.repository.listarHitosAlertables(),
    ]);
    let generadas = 0;
    for (const actividad of actividades) {
      if (actividad.activo === false || actividad.estado === 'COMPLETADA')
        continue;
      const fecha = fechaComoDate(actividad.fechaFin);
      if (!fecha) continue;
      const clasificacion = this.alertas.clasificar(fecha, hoy);
      if (!clasificacion) continue;
      const tipo: TipoEventoCronograma =
        clasificacion === 'VENCIDA'
          ? 'ACTIVIDAD_VENCIDA'
          : 'ACTIVIDAD_PROXIMA_VENCER';
      for (const idUsuarioDestino of await this.repository.usuariosDestinatariosActividad(
        String(actividad.idProyecto),
        String(actividad.idActividad),
      )) {
        if (
          await this.crearSiNoExiste({
            idUsuarioDestino,
            idProyecto: String(actividad.idProyecto),
            idActividad: String(actividad.idActividad),
            tipoEvento: tipo,
            fechaReferencia: fecha,
            titulo:
              tipo === 'ACTIVIDAD_VENCIDA'
                ? 'Actividad vencida'
                : 'Actividad próxima a vencer',
            mensaje: `La actividad “${String(actividad.nombre)}” ${tipo === 'ACTIVIDAD_VENCIDA' ? 'se encuentra vencida.' : 'vence en los próximos 3 días.'}`,
          })
        )
          generadas++;
      }
    }
    for (const hito of hitos) {
      if (hito.activo === false || hito.estado === 'COMPLETADO') continue;
      const fecha = fechaComoDate(hito.fechaObjetivo);
      if (!fecha) continue;
      const clasificacion = this.alertas.clasificar(fecha, hoy);
      if (!clasificacion) continue;
      const tipo: TipoEventoCronograma =
        clasificacion === 'VENCIDA' ? 'HITO_VENCIDO' : 'HITO_PROXIMO';
      for (const idUsuarioDestino of await this.repository.usuariosDestinatariosHito(
        String(hito.idProyecto),
      )) {
        if (
          await this.crearSiNoExiste({
            idUsuarioDestino,
            idProyecto: String(hito.idProyecto),
            idHito: String(hito.idHito),
            tipoEvento: tipo,
            fechaReferencia: fecha,
            titulo: tipo === 'HITO_VENCIDO' ? 'Hito vencido' : 'Hito próximo',
            mensaje: `El hito “${String(hito.nombre)}” ${tipo === 'HITO_VENCIDO' ? 'se encuentra vencido.' : 'vence en los próximos 3 días.'}`,
          })
        )
          generadas++;
      }
    }
    return { notificaciones_generadas: generadas };
  }
  private async crearSiNoExiste(data: NotificacionCronogramaCrear) {
    if (await this.repository.existeNotificacionEquivalente(data)) return false;
    await this.repository.crearNotificacionCronograma(data);
    return true;
  }
}

@Injectable()
export class NotificacionesCronogramaService extends NotificacionesCronogramaPort {
  constructor(private readonly repository: NotificacionesRepository) {
    super();
  }
  async notificarActividadReprogramada(
    idProyecto: string,
    idActividad: string,
    fechaReferencia: Date,
  ) {
    for (const idUsuarioDestino of await this.repository.usuariosDestinatariosActividad(
      idProyecto,
      idActividad,
    )) {
      const data: NotificacionCronogramaCrear = {
        idUsuarioDestino,
        idProyecto,
        idActividad,
        tipoEvento: 'ACTIVIDAD_REPROGRAMADA',
        fechaReferencia,
        titulo: 'Actividad reprogramada',
        mensaje: 'Se modificaron las fechas de una actividad del cronograma.',
      };
      if (!(await this.repository.existeNotificacionEquivalente(data)))
        await this.repository.crearNotificacionCronograma(data);
    }
  }
}

@Injectable()
export class ConsultarNotificacionesCronogramaUseCase {
  constructor(private readonly repository: NotificacionesRepository) {}
  async listar(
    idProyecto: string,
    idUsuario: number,
    filtros: ListarNotificacionesCronogramaDto,
  ) {
    await this.validarAcceso(idProyecto, idUsuario);
    return this.repository.listarNotificaciones(idProyecto, idUsuario, filtros);
  }
  async resumen(idProyecto: string, idUsuario: number) {
    await this.validarAcceso(idProyecto, idUsuario);
    const items = await this.repository.listarNotificaciones(
      idProyecto,
      idUsuario,
      { activo: true },
    );
    const contar = (tipo: TipoEventoCronograma) =>
      items.filter((item) => item.tipoEventoCronograma === tipo).length;
    return {
      total_no_leidas: items.filter((item) => item.leida === false).length,
      actividades_proximas: contar('ACTIVIDAD_PROXIMA_VENCER'),
      actividades_vencidas: contar('ACTIVIDAD_VENCIDA'),
      hitos_proximos: contar('HITO_PROXIMO'),
      hitos_vencidos: contar('HITO_VENCIDO'),
    };
  }
  async marcarLeida(
    idProyecto: string,
    idNotificacion: string,
    idUsuario: number,
  ) {
    await this.validarAcceso(idProyecto, idUsuario);
    const item = await this.repository.obtenerNotificacion(idNotificacion);
    if (
      !item ||
      item.idProyecto !== idProyecto ||
      item.idUsuarioDestino !== idUsuario
    )
      throw new NotFoundException('Notificación no encontrada.');
    return this.repository.actualizarNotificacion(idNotificacion, {
      leida: true,
    });
  }
  async marcarTodasLeidas(idProyecto: string, idUsuario: number) {
    await this.validarAcceso(idProyecto, idUsuario);
    const items = await this.repository.listarNotificaciones(
      idProyecto,
      idUsuario,
      { activo: true, leida: false },
    );
    await Promise.all(
      items.map((item) =>
        this.repository.actualizarNotificacion(String(item.idNotificacion), {
          leida: true,
        }),
      ),
    );
    return { actualizadas: items.length };
  }
  private async validarAcceso(idProyecto: string, idUsuario: number) {
    if (
      !(await this.repository.usuarioTieneAccesoProyecto(idProyecto, idUsuario))
    )
      throw new ForbiddenException(
        'No tienes acceso a las notificaciones de este proyecto.',
      );
  }
}
function fechaComoDate(valor: unknown): Date | null {
  if (!valor) return null;
  if (valor instanceof Date) return valor;
  if (typeof valor === 'object' && 'epochMilliseconds' in valor)
    return new Date(
      Number((valor as { epochMilliseconds: unknown }).epochMilliseconds),
    );
  const fecha = new Date(String(valor));
  return Number.isNaN(fecha.getTime()) ? null : fecha;
}
