import { Injectable } from '@nestjs/common';
import { Temporal } from 'temporal-polyfill';

import { PrismaService } from '../../../../../infrastructure/database/prisma/prisma.service';
import {
  NotificacionCronogramaCrear,
  NotificacionesRepository,
  FiltrosNotificacion,
} from '../../../domain/repositories/notificaciones.repository';

@Injectable()
export class PrismaNotificacionesRepository extends NotificacionesRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async obtenerProyecto(idProyecto: string) {
    return (await this.prisma.client.orm.public.Proyecto.first({
      idProyecto: idProyecto as never,
    })) as { idProyecto: string; idPm: number | null } | null;
  }

  async usuariosDestinatariosActividad(
    idProyecto: string,
    idActividad: string,
  ) {
    const [proyecto, actividad] = await Promise.all([
      this.obtenerProyecto(idProyecto),
      this.prisma.client.orm.public.Actividad.first({
        idActividad: idActividad as never,
      }),
    ]);
    return [
      ...new Set(
        [
          proyecto?.idPm,
          (actividad as { idUsuarioResponsable?: number | null } | null)
            ?.idUsuarioResponsable,
        ].filter((id): id is number => typeof id === 'number'),
      ),
    ];
  }

  async usuariosDestinatariosHito(idProyecto: string) {
    const proyecto = await this.obtenerProyecto(idProyecto);
    return proyecto?.idPm ? [proyecto.idPm] : [];
  }

  async listarActividadesAlertables() {
    return (await this.prisma.client.orm.public.Actividad.all()) as Array<
      Record<string, unknown>
    >;
  }
  async listarHitosAlertables() {
    return (await this.prisma.client.orm.public.Hito.all()) as Array<
      Record<string, unknown>
    >;
  }

  async existeNotificacionEquivalente(data: NotificacionCronogramaCrear) {
    const [notificaciones, detalles] = await Promise.all([
      this.prisma.client.orm.public.Notificacion.all(),
      this.prisma.client.orm.public.NotificacionCronograma.all(),
    ]);
    const detallePorId = new Map(
      (detalles as Array<Record<string, unknown>>).map((detalle) => [
        String(detalle.idNotificacion),
        detalle,
      ]),
    );
    return (notificaciones as Array<Record<string, unknown>>).some(
      (notificacion) => {
        const detalle = detallePorId.get(String(notificacion.idNotificacion));
        return (
          notificacion.activo !== false &&
          notificacion.idUsuarioDestino === data.idUsuarioDestino &&
          notificacion.idProyecto === data.idProyecto &&
          detalle?.tipoEventoCronograma === data.tipoEvento &&
          detalle?.idActividad === (data.idActividad ?? null) &&
          detalle?.idHito === (data.idHito ?? null) &&
          this.mismaFecha(
            detalle?.fechaReferencia,
            data.fechaReferencia ?? null,
          )
        );
      },
    );
  }

  async crearNotificacionCronograma(data: NotificacionCronogramaCrear) {
    return this.prisma.client.transaction(async (tx) => {
      const notificacion = (await tx.orm.public.Notificacion.create({
        idUsuarioDestino: data.idUsuarioDestino,
        idProyecto: data.idProyecto as never,
        tipo: 'CRONOGRAMA',
        titulo: data.titulo,
        mensaje: data.mensaje,
        leida: false,
        enviadaPush: false,
        activo: true,
        fechaProgramada: null,
      } as never)) as Record<string, unknown>;
      await tx.orm.public.NotificacionCronograma.create({
        idNotificacion: notificacion.idNotificacion as never,
        idActividad: (data.idActividad ?? null) as never,
        idHito: (data.idHito ?? null) as never,
        tipoEventoCronograma: data.tipoEvento,
        fechaReferencia: data.fechaReferencia
          ? Temporal.Instant.from(data.fechaReferencia.toISOString())
          : null,
      } as never);
      return notificacion;
    });
  }

  async listarNotificaciones(
    idProyecto: string,
    idUsuario: number,
    filtros: FiltrosNotificacion,
  ) {
    const [notificaciones, detalles] = await Promise.all([
      this.prisma.client.orm.public.Notificacion.all(),
      this.prisma.client.orm.public.NotificacionCronograma.all(),
    ]);
    const detallePorId = new Map(
      (detalles as Array<Record<string, unknown>>).map((detalle) => [
        String(detalle.idNotificacion),
        detalle,
      ]),
    );
    return (notificaciones as Array<Record<string, unknown>>)
      .filter(
        (item) =>
          item.idProyecto === idProyecto &&
          item.idUsuarioDestino === idUsuario &&
          (filtros.leida === undefined || item.leida === filtros.leida) &&
          (filtros.activo === undefined || item.activo === filtros.activo),
      )
      .map((item) => ({
        ...item,
        ...detallePorId.get(String(item.idNotificacion)),
      }))
      .filter(
        (item) =>
          !filtros.tipoEvento ||
          item.tipoEventoCronograma === filtros.tipoEvento,
      )
      .sort(
        (a, b) =>
          (this.fecha(b.fechaGeneracion)?.getTime() ?? 0) -
          (this.fecha(a.fechaGeneracion)?.getTime() ?? 0),
      );
  }

  async obtenerNotificacion(idNotificacion: string) {
    return (await this.prisma.client.orm.public.Notificacion.first({
      idNotificacion: idNotificacion as never,
    })) as Record<string, unknown> | null;
  }
  async actualizarNotificacion(
    idNotificacion: string,
    data: Record<string, unknown>,
  ) {
    return (await this.prisma.client.orm.public.Notificacion.where({
      idNotificacion: idNotificacion as never,
    }).update(data as never)) as Record<string, unknown>;
  }
  async usuarioTieneAccesoProyecto(idProyecto: string, idUsuario: number) {
    const [proyecto, actividades] = await Promise.all([
      this.obtenerProyecto(idProyecto),
      this.prisma.client.orm.public.Actividad.all(),
    ]);
    return (
      proyecto?.idPm === idUsuario ||
      (actividades as Array<Record<string, unknown>>).some(
        (actividad) =>
          actividad.idProyecto === idProyecto &&
          actividad.idUsuarioResponsable === idUsuario &&
          actividad.activo !== false,
      )
    );
  }
  private fecha(valor: unknown): Date | null {
    if (!valor) return null;
    if (valor instanceof Date) return valor;
    if (typeof valor === 'object' && 'epochMilliseconds' in valor)
      return new Date(
        Number((valor as { epochMilliseconds: unknown }).epochMilliseconds),
      );
    const fecha = new Date(String(valor));
    return Number.isNaN(fecha.getTime()) ? null : fecha;
  }
  private mismaFecha(izquierda: unknown, derecha: Date | null) {
    const fechaIzquierda = this.fecha(izquierda);
    return (
      !!fechaIzquierda === !!derecha &&
      (!fechaIzquierda || fechaIzquierda.getTime() === derecha!.getTime())
    );
  }
}
