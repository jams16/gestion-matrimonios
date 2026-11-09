import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Temporal } from 'temporal-polyfill';

import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
import { GestionarActividadesUseCase } from '../../cronograma/application/use-cases/gestionar-cronograma.use-cases';
import * as D from './dto/presupuesto.dto';

type Db = any;

@Injectable()
export class PresupuestoService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly actividades: GestionarActividadesUseCase,
  ) {}
  private get db(): Db {
    return this.prisma.client.orm.public;
  }
  private instant(value = new Date()) {
    return Temporal.Instant.from(value.toISOString());
  }
  private numero(value: unknown) {
    return Number(value ?? 0);
  }
  private fecha(value: string) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime()))
      throw new BadRequestException('Fecha inválida.');
    return this.instant(date);
  }

  private async contexto(
    idMatrimonio: string,
    idUsuario: number,
    db = this.db,
  ) {
    const matrimonio = await db.Matrimonio.first({
      idMatrimonio: idMatrimonio as never,
    });
    if (!matrimonio) throw new NotFoundException('Matrimonio no encontrado.');
    const proyecto = await db.Proyecto.first({
      idProyecto: matrimonio.idProyecto as never,
    });
    if (!proyecto)
      throw new NotFoundException('Proyecto del matrimonio no encontrado.');
    if (
      ![proyecto.idPm, matrimonio.idNovio1, matrimonio.idNovio2].includes(
        idUsuario,
      )
    ) {
      throw new ForbiddenException(
        'No tienes acceso al presupuesto de este matrimonio.',
      );
    }
    return { matrimonio, proyecto };
  }

  private async presupuesto(idMatrimonio: string, db = this.db) {
    const presupuesto = await db.Presupuesto.first({
      idMatrimonio: idMatrimonio as never,
    });
    if (!presupuesto || !presupuesto.activo)
      throw new NotFoundException('Presupuesto no encontrado.');
    return presupuesto;
  }
  private async costo(idCosto: string, idPresupuesto: string, db = this.db) {
    const costo = await db.CostoProveedor.first({ idCosto: idCosto as never });
    if (!costo || costo.idPresupuesto !== idPresupuesto)
      throw new NotFoundException('Costo no encontrado.');
    return costo;
  }
  private async categoria(
    idCategoria: number,
    idPresupuesto: string,
    db = this.db,
  ) {
    const categoria = await db.CategoriaPresupuesto.first({
      idCategoriaPresupuesto: idCategoria as never,
    });
    if (!categoria || categoria.idPresupuesto !== idPresupuesto)
      throw new NotFoundException('Categoría presupuestaria no encontrada.');
    return categoria;
  }
  private async pago(idPago: string, idCosto: string, db = this.db) {
    const pago = await db.PagoPresupuesto.first({ idPago: idPago as never });
    if (!pago || pago.idCosto !== idCosto)
      throw new NotFoundException('Pago no encontrado.');
    return pago;
  }

  async obtenerOCrear(idMatrimonio: string, idUsuario: number) {
    const { proyecto } = await this.contexto(idMatrimonio, idUsuario);
    const existente = await this.db.Presupuesto.first({
      idMatrimonio: idMatrimonio as never,
    });
    if (existente) return this.detallePresupuesto(existente);
    const creado = await this.db.Presupuesto.create({
      idMatrimonio,
      montoTotal: this.numero(proyecto.presupuesto),
      moneda: 'PEN',
      activo: true,
    } as never);
    return this.detallePresupuesto(creado);
  }

  async crear(
    idMatrimonio: string,
    dto: D.CrearPresupuestoDto,
    idUsuario: number,
  ) {
    await this.contexto(idMatrimonio, idUsuario);
    const existente = await this.db.Presupuesto.first({
      idMatrimonio: idMatrimonio as never,
    });
    if (existente?.activo)
      throw new ConflictException(
        'El matrimonio ya tiene un presupuesto activo.',
      );
    const datos = {
      idMatrimonio,
      montoTotal: dto.montoTotal,
      moneda: dto.moneda ?? 'PEN',
      activo: true,
    };
    const presupuesto = existente
      ? await this.db.Presupuesto.where({
          idPresupuesto: existente.idPresupuesto as never,
        }).update(datos as never)
      : await this.db.Presupuesto.create(datos as never);
    return this.detallePresupuesto(presupuesto);
  }

  async actualizar(
    idMatrimonio: string,
    dto: D.ActualizarPresupuestoDto,
    idUsuario: number,
  ) {
    await this.contexto(idMatrimonio, idUsuario);
    const presupuesto = await this.presupuesto(idMatrimonio);
    const actualizado = await this.db.Presupuesto.where({
      idPresupuesto: presupuesto.idPresupuesto as never,
    }).update(dto as never);
    await this.actualizarAlertas(idMatrimonio, idUsuario);
    return this.detallePresupuesto(actualizado);
  }

  async listarCategorias(idMatrimonio: string, idUsuario: number) {
    await this.contexto(idMatrimonio, idUsuario);
    const presupuesto = await this.presupuesto(idMatrimonio);
    return (await this.db.CategoriaPresupuesto.all())
      .filter(
        (x: any) => x.idPresupuesto === presupuesto.idPresupuesto && x.activo,
      )
      .sort((a: any, b: any) => a.nombre.localeCompare(b.nombre, 'es'));
  }
  async crearCategoria(
    idMatrimonio: string,
    dto: D.CrearCategoriaPresupuestoDto,
    idUsuario: number,
  ) {
    await this.contexto(idMatrimonio, idUsuario);
    const presupuesto = await this.presupuesto(idMatrimonio);
    const duplicada = (await this.db.CategoriaPresupuesto.all()).some(
      (x: any) =>
        x.idPresupuesto === presupuesto.idPresupuesto &&
        x.codigo.toUpperCase() === dto.codigo.trim().toUpperCase() &&
        x.activo,
    );
    if (duplicada)
      throw new ConflictException('Ya existe una categoría con ese código.');
    if (dto.idCategoriaServicio) {
      const servicio = await this.db.CategoriaServicio.first({
        idCategoriaServicio: dto.idCategoriaServicio as never,
      });
      if (!servicio?.activo)
        throw new NotFoundException('Categoría de servicio no encontrada.');
    }
    const creada = await this.db.CategoriaPresupuesto.create({
      ...dto,
      codigo: dto.codigo.trim().toUpperCase(),
      idPresupuesto: presupuesto.idPresupuesto,
      activo: true,
    } as never);
    await this.actualizarAlertas(idMatrimonio, idUsuario);
    return creada;
  }
  async actualizarCategoria(
    idMatrimonio: string,
    idCategoria: number,
    dto: D.ActualizarCategoriaPresupuestoDto,
    idUsuario: number,
  ) {
    await this.contexto(idMatrimonio, idUsuario);
    const presupuesto = await this.presupuesto(idMatrimonio);
    await this.categoria(idCategoria, presupuesto.idPresupuesto);
    const actualizada = await this.db.CategoriaPresupuesto.where({
      idCategoriaPresupuesto: idCategoria as never,
    }).update(dto as never);
    await this.actualizarAlertas(idMatrimonio, idUsuario);
    return actualizada;
  }
  async desactivarCategoria(
    idMatrimonio: string,
    idCategoria: number,
    idUsuario: number,
  ) {
    await this.contexto(idMatrimonio, idUsuario);
    const presupuesto = await this.presupuesto(idMatrimonio);
    const categoria = await this.categoria(
      idCategoria,
      presupuesto.idPresupuesto,
    );
    const tieneCostos = (await this.db.CostoProveedor.all()).some(
      (x: any) =>
        x.idCategoriaPresupuesto === categoria.idCategoriaPresupuesto &&
        x.activo,
    );
    if (tieneCostos)
      throw new BadRequestException(
        'No se puede eliminar una categoría con costos activos.',
      );
    return this.db.CategoriaPresupuesto.where({
      idCategoriaPresupuesto: idCategoria as never,
    }).update({ activo: false } as never);
  }

  async listarCostos(
    idMatrimonio: string,
    filtros: D.ListarCostosDto,
    idUsuario: number,
  ) {
    await this.contexto(idMatrimonio, idUsuario);
    const presupuesto = await this.presupuesto(idMatrimonio);
    return this.detallesCostos(presupuesto.idPresupuesto, filtros);
  }
  async obtenerCosto(idMatrimonio: string, idCosto: string, idUsuario: number) {
    await this.contexto(idMatrimonio, idUsuario);
    const presupuesto = await this.presupuesto(idMatrimonio);
    const costo = await this.costo(idCosto, presupuesto.idPresupuesto);
    return this.detalleCosto(costo);
  }
  async crearCosto(
    idMatrimonio: string,
    dto: D.CrearCostoProveedorDto,
    idUsuario: number,
  ) {
    return this.prisma.client
      .transaction(async (tx: any) => {
        const db = tx.orm.public;
        await this.contexto(idMatrimonio, idUsuario, db);
        const presupuesto = await this.presupuesto(idMatrimonio, db);
        await this.categoria(
          dto.idCategoriaPresupuesto,
          presupuesto.idPresupuesto,
          db,
        );
        await this.validarVinculoProveedor(dto, idMatrimonio, db);
        const costo = await db.CostoProveedor.create({
          ...dto,
          idPresupuesto: presupuesto.idPresupuesto,
          estado: dto.estado ?? 'PLANIFICADO',
          activo: true,
        } as never);
        return this.detalleCosto(costo, db);
      })
      .then(async (resultado: any) => {
        await this.actualizarAlertas(idMatrimonio, idUsuario);
        return resultado;
      });
  }
  async actualizarCosto(
    idMatrimonio: string,
    idCosto: string,
    dto: D.ActualizarCostoProveedorDto,
    idUsuario: number,
  ) {
    return this.prisma.client
      .transaction(async (tx: any) => {
        const db = tx.orm.public;
        await this.contexto(idMatrimonio, idUsuario, db);
        const presupuesto = await this.presupuesto(idMatrimonio, db);
        const actual = await this.costo(idCosto, presupuesto.idPresupuesto, db);
        if (dto.idCategoriaPresupuesto)
          await this.categoria(
            dto.idCategoriaPresupuesto,
            presupuesto.idPresupuesto,
            db,
          );
        await this.validarVinculoProveedor(
          { ...actual, ...dto },
          idMatrimonio,
          db,
        );
        const pagos = await this.pagosCosto(idCosto, db);
        const nuevoMonto = dto.montoReal ?? actual.montoReal;
        const montoObjetivo =
          this.numero(nuevoMonto) > 0
            ? this.numero(nuevoMonto)
            : this.numero(dto.montoEstimado ?? actual.montoEstimado);
        if (this.suma(pagos) > montoObjetivo)
          throw new BadRequestException(
            'El monto del costo no puede ser menor que los pagos ya registrados.',
          );
        const actualizado = await db.CostoProveedor.where({
          idCosto: idCosto as never,
        }).update(dto as never);
        return this.detalleCosto(actualizado, db);
      })
      .then(async (resultado: any) => {
        await this.actualizarAlertas(idMatrimonio, idUsuario);
        return resultado;
      });
  }
  async desactivarCosto(
    idMatrimonio: string,
    idCosto: string,
    idUsuario: number,
  ) {
    await this.contexto(idMatrimonio, idUsuario);
    const presupuesto = await this.presupuesto(idMatrimonio);
    await this.costo(idCosto, presupuesto.idPresupuesto);
    const resultado = await this.db.CostoProveedor.where({
      idCosto: idCosto as never,
    }).update({ activo: false } as never);
    await this.actualizarAlertas(idMatrimonio, idUsuario);
    return resultado;
  }

  async listarPagos(idMatrimonio: string, idCosto: string, idUsuario: number) {
    await this.contexto(idMatrimonio, idUsuario);
    const presupuesto = await this.presupuesto(idMatrimonio);
    await this.costo(idCosto, presupuesto.idPresupuesto);
    return this.pagosCosto(idCosto);
  }
  async crearPago(
    idMatrimonio: string,
    idCosto: string,
    dto: D.CrearPagoDto,
    idUsuario: number,
  ) {
    return this.prisma.client
      .transaction(async (tx: any) => {
        const db = tx.orm.public;
        await this.contexto(idMatrimonio, idUsuario, db);
        const presupuesto = await this.presupuesto(idMatrimonio, db);
        const costo = await this.costo(idCosto, presupuesto.idPresupuesto, db);
        const saldo = await this.saldoCosto(costo, db);
        if (dto.monto <= 0 || dto.monto > saldo)
          throw new BadRequestException(
            `El pago debe ser mayor a cero y no superar el saldo pendiente de ${saldo.toFixed(2)}.`,
          );
        const pago = await db.PagoPresupuesto.create({
          ...dto,
          fechaPago: this.fecha(dto.fechaPago),
          idCosto,
          tipo: dto.tipo ?? 'CUOTA',
          activo: true,
        } as never);
        await this.actualizarEstadoCosto(costo, db);
        return pago;
      })
      .then(async (resultado: any) => {
        await this.actualizarAlertas(idMatrimonio, idUsuario);
        return resultado;
      });
  }
  async actualizarPago(
    idMatrimonio: string,
    idCosto: string,
    idPago: string,
    dto: D.ActualizarPagoDto,
    idUsuario: number,
  ) {
    return this.prisma.client
      .transaction(async (tx: any) => {
        const db = tx.orm.public;
        await this.contexto(idMatrimonio, idUsuario, db);
        const presupuesto = await this.presupuesto(idMatrimonio, db);
        const costo = await this.costo(idCosto, presupuesto.idPresupuesto, db);
        const pago = await this.pago(idPago, idCosto, db);
        const otros = (await this.pagosCosto(idCosto, db)).filter(
          (x: any) => x.idPago !== idPago,
        );
        const maximo = this.montoObjetivo(costo) - this.suma(otros);
        if (dto.monto !== undefined && (dto.monto <= 0 || dto.monto > maximo))
          throw new BadRequestException(
            'El pago excede el saldo pendiente del costo.',
          );
        const datos: any = { ...dto };
        if (dto.fechaPago) datos.fechaPago = this.fecha(dto.fechaPago);
        const actualizado = await db.PagoPresupuesto.where({
          idPago: pago.idPago as never,
        }).update(datos as never);
        await this.actualizarEstadoCosto(costo, db);
        return actualizado;
      })
      .then(async (resultado: any) => {
        await this.actualizarAlertas(idMatrimonio, idUsuario);
        return resultado;
      });
  }
  async desactivarPago(
    idMatrimonio: string,
    idCosto: string,
    idPago: string,
    idUsuario: number,
  ) {
    await this.contexto(idMatrimonio, idUsuario);
    const presupuesto = await this.presupuesto(idMatrimonio);
    const costo = await this.costo(idCosto, presupuesto.idPresupuesto);
    await this.pago(idPago, idCosto);
    const resultado = await this.db.PagoPresupuesto.where({
      idPago: idPago as never,
    }).update({ activo: false } as never);
    await this.actualizarEstadoCosto(costo);
    await this.actualizarAlertas(idMatrimonio, idUsuario);
    return resultado;
  }
  async crearDocumento(
    idMatrimonio: string,
    idCosto: string,
    idPago: string,
    dto: D.CrearDocumentoPagoDto,
    idUsuario: number,
  ) {
    await this.contexto(idMatrimonio, idUsuario);
    const presupuesto = await this.presupuesto(idMatrimonio);
    await this.costo(idCosto, presupuesto.idPresupuesto);
    await this.pago(idPago, idCosto);
    return this.db.DocumentoPago.create({
      ...dto,
      idPago,
      activo: true,
    } as never);
  }
  async crearSeguimiento(
    idMatrimonio: string,
    idCosto: string,
    idPago: string,
    dto: D.CrearSeguimientoPagoDto,
    idUsuario: number,
  ) {
    await this.contexto(idMatrimonio, idUsuario);
    const presupuesto = await this.presupuesto(idMatrimonio);
    await this.costo(idCosto, presupuesto.idPresupuesto);
    await this.pago(idPago, idCosto);
    return this.db.SeguimientoPago.create({
      ...dto,
      idPago,
      activo: true,
    } as never);
  }
  async seguimientos(
    idMatrimonio: string,
    idCosto: string,
    idPago: string,
    idUsuario: number,
  ) {
    await this.contexto(idMatrimonio, idUsuario);
    const presupuesto = await this.presupuesto(idMatrimonio);
    await this.costo(idCosto, presupuesto.idPresupuesto);
    await this.pago(idPago, idCosto);
    return (await this.db.SeguimientoPago.all()).filter(
      (x: any) => x.idPago === idPago && x.activo,
    );
  }
  async documentos(
    idMatrimonio: string,
    idCosto: string,
    idPago: string,
    idUsuario: number,
  ) {
    await this.contexto(idMatrimonio, idUsuario);
    const presupuesto = await this.presupuesto(idMatrimonio);
    await this.costo(idCosto, presupuesto.idPresupuesto);
    await this.pago(idPago, idCosto);
    return (await this.db.DocumentoPago.all()).filter(
      (x: any) => x.idPago === idPago && x.activo,
    );
  }
  async crearCompromiso(
    idMatrimonio: string,
    idCosto: string,
    dto: D.CrearCompromisoPagoDto,
    idUsuario: number,
  ) {
    const { proyecto } = await this.contexto(idMatrimonio, idUsuario);
    const presupuesto = await this.presupuesto(idMatrimonio);
    await this.costo(idCosto, presupuesto.idPresupuesto);
    const compromiso = await this.db.CompromisoPago.create({
      ...dto,
      fechaVencimiento: this.fecha(dto.fechaVencimiento),
      idCosto,
      activo: true,
    } as never);
    // Un vencimiento financiero es una actividad operativa del proyecto, sin
    // requerir un hito. El cronograma conserva su propia instancia editable.
    await this.actividades.crear(
      proyecto.idProyecto,
      {
        nombre: `Pago: ${dto.concepto}`,
        categoria: 'PRESUPUESTO',
        descripcion: `Compromiso de pago ${compromiso.idCompromiso}.`,
        fechaInicio: dto.fechaVencimiento,
        fechaFin: dto.fechaVencimiento,
        prioridad: 'MEDIA' as never,
        estado: 'PENDIENTE' as never,
        orden: 0,
      },
      idUsuario,
    );
    return compromiso;
  }
  async compromisos(
    idMatrimonio: string,
    idCosto: string | undefined,
    idUsuario: number,
  ) {
    await this.contexto(idMatrimonio, idUsuario);
    const presupuesto = await this.presupuesto(idMatrimonio);
    const costos = await this.detallesCostos(presupuesto.idPresupuesto, {
      activo: true,
    });
    const ids = new Set(
      (idCosto ? costos.filter((x: any) => x.idCosto === idCosto) : costos).map(
        (x: any) => x.idCosto,
      ),
    );
    const ahora = Date.now();
    return (await this.db.CompromisoPago.all())
      .filter((x: any) => ids.has(x.idCosto) && x.activo)
      .map((x: any) => ({
        ...x,
        estado:
          new Date(String(x.fechaVencimiento)).getTime() < ahora
            ? 'VENCIDO'
            : 'PENDIENTE',
      }));
  }

  async resumen(idMatrimonio: string, idUsuario: number) {
    await this.contexto(idMatrimonio, idUsuario);
    const presupuesto = await this.presupuesto(idMatrimonio);
    const costos = await this.detallesCostos(presupuesto.idPresupuesto, {
      activo: true,
    });
    const estimado = costos.reduce(
      (n: number, x: any) => n + this.numero(x.montoEstimado),
      0,
    );
    const real = costos.reduce(
      (n: number, x: any) => n + this.numero(x.montoReal),
      0,
    );
    const comprometido = costos.reduce(
      (n: number, x: any) => n + this.montoObjetivo(x),
      0,
    );
    const pagado = costos.reduce(
      (n: number, x: any) => n + this.numero(x.totalPagado),
      0,
    );
    const total = this.numero(presupuesto.montoTotal);
    return {
      presupuesto,
      monto_total: total,
      monto_estimado: estimado,
      monto_real: real,
      monto_comprometido: comprometido,
      monto_pagado: pagado,
      saldo_pendiente: Math.max(0, comprometido - pagado),
      disponible: total - comprometido,
      desviacion: comprometido - total,
      moneda: presupuesto.moneda,
    };
  }
  async desglose(idMatrimonio: string, idUsuario: number) {
    const resumen = await this.resumen(idMatrimonio, idUsuario);
    const categorias = await this.listarCategorias(idMatrimonio, idUsuario);
    const costos = await this.listarCostos(
      idMatrimonio,
      { activo: true },
      idUsuario,
    );
    const total = this.numero(resumen.monto_total);
    return categorias.map((categoria: any) => {
      const items = costos.filter(
        (x: any) =>
          x.idCategoriaPresupuesto === categoria.idCategoriaPresupuesto,
      );
      const comprometido = items.reduce(
        (n: number, x: any) => n + this.montoObjetivo(x),
        0,
      );
      return {
        ...categoria,
        monto_comprometido: comprometido,
        porcentaje: total
          ? Number(
              ((this.numero(categoria.montoAsignado) * 100) / total).toFixed(2),
            )
          : 0,
        desviacion: comprometido - this.numero(categoria.montoAsignado),
      };
    });
  }
  async reporte(
    idMatrimonio: string,
    filtros: D.ListarReporteDto,
    idUsuario: number,
  ) {
    const resumen = await this.resumen(idMatrimonio, idUsuario);
    let costos = await this.listarCostos(
      idMatrimonio,
      { activo: true, idCategoriaPresupuesto: filtros.idCategoriaPresupuesto },
      idUsuario,
    );
    if (filtros.fechaDesde || filtros.fechaHasta) {
      costos = costos.filter((x: any) =>
        (x.pagos as any[]).some(
          (p) =>
            (!filtros.fechaDesde ||
              String(p.fechaPago).slice(0, 10) >= filtros.fechaDesde!) &&
            (!filtros.fechaHasta ||
              String(p.fechaPago).slice(0, 10) <= filtros.fechaHasta!),
        ),
      );
    }
    if (!costos.length)
      throw new NotFoundException(
        'No hay información disponible para generar el reporte con los filtros indicados.',
      );
    return {
      idMatrimonio,
      fecha_generacion: new Date().toISOString(),
      moneda: resumen.moneda,
      resumen,
      costos,
      desglose: await this.desglose(idMatrimonio, idUsuario),
    };
  }
  async exportarReporte(
    idMatrimonio: string,
    filtros: D.ListarReporteDto,
    formato: D.FormatoReporteDto,
    idUsuario: number,
  ) {
    const reporte = await this.reporte(idMatrimonio, filtros, idUsuario);
    const filas = reporte.costos.map((x: any) => [
      x.concepto,
      x.categoria?.nombre ?? '',
      x.montoEstimado,
      x.montoReal,
      x.totalPagado,
      x.saldoPendiente,
    ]);
    const csv = [
      'Concepto,Categoría,Estimado,Real,Pagado,Saldo',
      ...filas.map((x: any[]) =>
        x.map((v) => `"${String(v ?? '').replaceAll('"', '""')}"`).join(','),
      ),
    ].join('\n');
    if (formato === D.FormatoReporteDto.CSV)
      return { formato: 'CSV', contenido: csv, reporte };
    const texto = `Reporte financiero\nMatrimonio: ${idMatrimonio}\nMoneda: ${reporte.moneda}\n\n${csv.replaceAll(',', ' | ')}`;
    return {
      formato: 'PDF',
      contenido: Buffer.from(texto, 'utf8').toString('base64'),
      codificacion: 'base64',
      reporte,
    };
  }

  async notificaciones(idMatrimonio: string, idUsuario: number) {
    await this.contexto(idMatrimonio, idUsuario);
    const presupuesto = await this.presupuesto(idMatrimonio);
    const [notificaciones, detalles] = await Promise.all([
      this.db.Notificacion.all(),
      this.db.NotificacionPresupuesto.all(),
    ]);
    const porId = new Map(
      (detalles as any[]).map((x) => [String(x.idNotificacion), x]),
    );
    return (notificaciones as any[])
      .filter(
        (x) =>
          x.idUsuarioDestino === idUsuario &&
          x.activo &&
          porId.has(String(x.idNotificacion)) &&
          porId.get(String(x.idNotificacion))?.idPresupuesto ===
            presupuesto.idPresupuesto,
      )
      .map((x) => ({ ...x, ...porId.get(String(x.idNotificacion)) }));
  }
  async marcarNotificacionLeida(
    idMatrimonio: string,
    idNotificacion: string,
    idUsuario: number,
  ) {
    const items = await this.notificaciones(idMatrimonio, idUsuario);
    if (!items.some((x: any) => x.idNotificacion === idNotificacion))
      throw new NotFoundException('Notificación presupuestaria no encontrada.');
    return this.db.Notificacion.where({
      idNotificacion: idNotificacion as never,
    }).update({ leida: true } as never);
  }

  async sincronizarContratacion(
    idMatrimonio: string,
    idProveedor: string,
    idUsuario: number,
  ) {
    const { proyecto } = await this.contexto(idMatrimonio, idUsuario);
    const relacion = (await this.db.MatrimonioProveedor.all()).find(
      (x: any) =>
        x.idMatrimonio === idMatrimonio &&
        x.idProveedor === idProveedor &&
        x.activo,
    );
    if (!relacion || relacion.estadoSeleccion !== 'SELECCIONADO') return [];
    const presupuesto = await this.obtenerOCrear(idMatrimonio, idUsuario);
    const db = this.db;
    const servicios = (await db.ProveedorServicio.all()).filter(
      (x: any) => x.idProveedor === idProveedor && x.activo,
    );
    const creados: any[] = [];
    for (const servicio of servicios) {
      let categoria = (await db.CategoriaPresupuesto.all()).find(
        (x: any) =>
          x.idPresupuesto === presupuesto.idPresupuesto &&
          x.idCategoriaServicio === servicio.idCategoriaServicio &&
          x.activo,
      );
      if (!categoria) {
        const fuente = await db.CategoriaServicio.first({
          idCategoriaServicio: servicio.idCategoriaServicio as never,
        });
        categoria = await db.CategoriaPresupuesto.create({
          idPresupuesto: presupuesto.idPresupuesto,
          idCategoriaServicio: servicio.idCategoriaServicio,
          codigo: `PV_${servicio.idCategoriaServicio}`,
          nombre: fuente?.nombre ?? 'Sin categoría',
          montoAsignado: 0,
          activo: true,
        } as never);
      }
      const previo = (await db.CostoProveedor.all()).find(
        (x: any) =>
          x.idMatrimonioProveedor === relacion.idMatrimonioProveedor &&
          x.idProveedorServicio === servicio.idProveedorServicio &&
          x.activo,
      );
      const datos = {
        idCategoriaPresupuesto: categoria.idCategoriaPresupuesto,
        concepto: servicio.nombre,
        montoEstimado: servicio.costoReferencial,
        montoReal: servicio.costoReferencial,
        estado: 'CONTRATADO',
      };
      const costo = previo
        ? await db.CostoProveedor.where({
            idCosto: previo.idCosto as never,
          }).update(datos as never)
        : await db.CostoProveedor.create({
            ...datos,
            idPresupuesto: presupuesto.idPresupuesto,
            idMatrimonioProveedor: relacion.idMatrimonioProveedor,
            idProveedorServicio: servicio.idProveedorServicio,
            activo: true,
          } as never);
      creados.push(costo);
    }
    await this.actualizarAlertas(idMatrimonio, proyecto.idPm ?? idUsuario);
    return creados;
  }
  async sincronizarServiciosProveedor(idProveedor: string) {
    const relaciones = (await this.db.MatrimonioProveedor.all()).filter(
      (x: any) =>
        x.idProveedor === idProveedor &&
        x.activo &&
        x.estadoSeleccion === 'SELECCIONADO',
    );
    const resultados: any[] = [];
    for (const relacion of relaciones) {
      const matrimonio = await this.db.Matrimonio.first({
        idMatrimonio: relacion.idMatrimonio as never,
      });
      const proyecto = matrimonio
        ? await this.db.Proyecto.first({
            idProyecto: matrimonio.idProyecto as never,
          })
        : null;
      if (proyecto?.idPm)
        resultados.push(
          ...(await this.sincronizarContratacion(
            relacion.idMatrimonio,
            idProveedor,
            proyecto.idPm,
          )),
        );
    }
    return resultados;
  }

  private async validarVinculoProveedor(
    dto: Partial<D.CrearCostoProveedorDto>,
    idMatrimonio: string,
    db: Db,
  ) {
    if (dto.idMatrimonioProveedor) {
      const relacion = await db.MatrimonioProveedor.first({
        idMatrimonioProveedor: dto.idMatrimonioProveedor as never,
      });
      if (!relacion || relacion.idMatrimonio !== idMatrimonio)
        throw new BadRequestException(
          'El proveedor no pertenece al matrimonio indicado.',
        );
      if (dto.idProveedorServicio) {
        const servicio = await db.ProveedorServicio.first({
          idProveedorServicio: dto.idProveedorServicio as never,
        });
        if (!servicio || servicio.idProveedor !== relacion.idProveedor)
          throw new BadRequestException(
            'El servicio no pertenece al proveedor seleccionado.',
          );
      }
    }
  }
  private montoObjetivo(costo: any) {
    return this.numero(costo.montoReal) > 0
      ? this.numero(costo.montoReal)
      : this.numero(costo.montoEstimado);
  }
  private suma(items: any[]) {
    return items
      .filter((x: any) => x.activo !== false)
      .reduce((n: number, x: any) => n + this.numero(x.monto), 0);
  }
  private async pagosCosto(idCosto: string, db = this.db) {
    return (await db.PagoPresupuesto.all()).filter(
      (x: any) => x.idCosto === idCosto && x.activo,
    );
  }
  private async saldoCosto(costo: any, db = this.db) {
    return Math.max(
      0,
      this.montoObjetivo(costo) -
        this.suma(await this.pagosCosto(costo.idCosto, db)),
    );
  }
  private async actualizarEstadoCosto(costo: any, db = this.db) {
    const saldo = await this.saldoCosto(costo, db);
    return db.CostoProveedor.where({ idCosto: costo.idCosto as never }).update({
      estado:
        saldo <= 0 && this.montoObjetivo(costo) > 0
          ? 'PAGADO'
          : costo.estado === 'PAGADO'
            ? 'CONTRATADO'
            : costo.estado,
    } as never);
  }
  private async detalleCosto(costo: any, db = this.db) {
    const [categorias, pagos, proveedores, servicios] = await Promise.all([
      db.CategoriaPresupuesto.all(),
      this.pagosCosto(costo.idCosto, db),
      db.MatrimonioProveedor.all(),
      db.ProveedorServicio.all(),
    ]);
    const objetivo = this.montoObjetivo(costo);
    const totalPagado = this.suma(pagos);
    return {
      ...costo,
      categoria:
        (categorias as any[]).find(
          (x) => x.idCategoriaPresupuesto === costo.idCategoriaPresupuesto,
        ) ?? null,
      matrimonioProveedor:
        (proveedores as any[]).find(
          (x) => x.idMatrimonioProveedor === costo.idMatrimonioProveedor,
        ) ?? null,
      proveedorServicio:
        (servicios as any[]).find(
          (x) => x.idProveedorServicio === costo.idProveedorServicio,
        ) ?? null,
      pagos,
      totalPagado,
      saldoPendiente: Math.max(0, objetivo - totalPagado),
      desviacion:
        this.numero(costo.montoReal) - this.numero(costo.montoEstimado),
    };
  }
  private async detallesCostos(
    idPresupuesto: string,
    filtros: D.ListarCostosDto,
    db = this.db,
  ) {
    const costos = (await db.CostoProveedor.all()).filter(
      (x: any) =>
        x.idPresupuesto === idPresupuesto &&
        (filtros.activo === undefined || x.activo === filtros.activo) &&
        (!filtros.idCategoriaPresupuesto ||
          x.idCategoriaPresupuesto === filtros.idCategoriaPresupuesto) &&
        (!filtros.estado || x.estado === filtros.estado),
    );
    return Promise.all(costos.map((x: any) => this.detalleCosto(x, db)));
  }
  private async detallePresupuesto(presupuesto: any) {
    return {
      ...presupuesto,
      categorias: (await this.db.CategoriaPresupuesto.all()).filter(
        (x: any) => x.idPresupuesto === presupuesto.idPresupuesto && x.activo,
      ),
    };
  }
  private async actualizarAlertas(idMatrimonio: string, idUsuario: number) {
    const presupuesto = await this.presupuesto(idMatrimonio);
    const resumen = await this.resumenInterno(presupuesto);
    const categorias = (await this.db.CategoriaPresupuesto.all()).filter(
      (x: any) => x.idPresupuesto === presupuesto.idPresupuesto && x.activo,
    );
    const costos = await this.detallesCostos(presupuesto.idPresupuesto, {
      activo: true,
    });
    const { proyecto, matrimonio } = await this.contexto(
      idMatrimonio,
      idUsuario,
    );
    const usuarios = [
      ...new Set(
        [proyecto.idPm, matrimonio.idNovio1, matrimonio.idNovio2].filter(
          (x): x is number => typeof x === 'number',
        ),
      ),
    ];
    for (const categoria of categorias) {
      const actual = costos
        .filter(
          (x: any) =>
            x.idCategoriaPresupuesto === categoria.idCategoriaPresupuesto,
        )
        .reduce((n: number, x: any) => n + this.montoObjetivo(x), 0);
      await this.notificarSiCorresponde(
        usuarios,
        proyecto.idProyecto,
        presupuesto,
        'SOBREPRESUPUESTO_CATEGORIA',
        actual > this.numero(categoria.montoAsignado),
        {
          categoria,
          montoPlanificado: this.numero(categoria.montoAsignado),
          montoActual: actual,
          diferencia: actual - this.numero(categoria.montoAsignado),
          titulo: `Sobrepresupuesto en ${categoria.nombre}`,
          mensaje: `La categoría ${categoria.nombre} excede lo asignado en ${Math.abs(actual - this.numero(categoria.montoAsignado)).toFixed(2)} ${presupuesto.moneda}.`,
        },
      );
    }
    await this.notificarSiCorresponde(
      usuarios,
      proyecto.idProyecto,
      presupuesto,
      'DESBALANCE_GENERAL',
      resumen.comprometido > resumen.total,
      {
        montoPlanificado: resumen.total,
        montoActual: resumen.comprometido,
        diferencia: resumen.comprometido - resumen.total,
        titulo: 'Desbalance general del presupuesto',
        mensaje: `El monto comprometido excede el presupuesto disponible en ${(resumen.comprometido - resumen.total).toFixed(2)} ${presupuesto.moneda}.`,
      },
    );
  }
  private async resumenInterno(presupuesto: any) {
    const costos = await this.detallesCostos(presupuesto.idPresupuesto, {
      activo: true,
    });
    return {
      total: this.numero(presupuesto.montoTotal),
      comprometido: costos.reduce(
        (n: number, x: any) => n + this.montoObjetivo(x),
        0,
      ),
    };
  }
  private async notificarSiCorresponde(
    usuarios: number[],
    idProyecto: string,
    presupuesto: any,
    tipo: string,
    vigente: boolean,
    datos: any,
  ) {
    const [notificaciones, detalles] = await Promise.all([
      this.db.Notificacion.all(),
      this.db.NotificacionPresupuesto.all(),
    ]);
    for (const idUsuarioDestino of usuarios) {
      const previas = (notificaciones as any[])
        .filter(
          (n) =>
            n.idUsuarioDestino === idUsuarioDestino &&
            n.idProyecto === idProyecto &&
            n.activo,
        )
        .filter((n) =>
          (detalles as any[]).some(
            (d) =>
              d.idNotificacion === n.idNotificacion &&
              d.idPresupuesto === presupuesto.idPresupuesto &&
              d.tipoEventoPresupuesto === tipo &&
              d.idCategoriaPresupuesto ===
                (datos.categoria?.idCategoriaPresupuesto ?? null),
          ),
        );
      if (!vigente) {
        for (const previa of previas)
          await this.db.Notificacion.where({
            idNotificacion: previa.idNotificacion as never,
          }).update({ activo: false } as never);
        continue;
      }
      if (previas.length) {
        // La alerta representa el estado vigente, no un historial congelado.
        // Si el monto cambia, se actualiza la misma alerta activa.
        for (const previa of previas) {
          await this.db.Notificacion.where({
            idNotificacion: previa.idNotificacion as never,
          }).update({
            titulo: datos.titulo,
            mensaje: datos.mensaje,
            leida: false,
          } as never);
          await this.db.NotificacionPresupuesto.where({
            idNotificacion: previa.idNotificacion as never,
          }).update({
            montoPlanificado: datos.montoPlanificado,
            montoActual: datos.montoActual,
            diferencia: datos.diferencia,
          } as never);
        }
        continue;
      }
      const n = await this.db.Notificacion.create({
        idUsuarioDestino,
        idProyecto,
        tipo: 'PRESUPUESTO',
        titulo: datos.titulo,
        mensaje: datos.mensaje,
        leida: false,
        enviadaPush: false,
        activo: true,
      } as never);
      await this.db.NotificacionPresupuesto.create({
        idNotificacion: n.idNotificacion,
        idPresupuesto: presupuesto.idPresupuesto,
        idCategoriaPresupuesto: datos.categoria?.idCategoriaPresupuesto ?? null,
        idCosto: null,
        tipoEventoPresupuesto: tipo,
        montoPlanificado: datos.montoPlanificado,
        montoActual: datos.montoActual,
        diferencia: datos.diferencia,
      } as never);
    }
  }
}
