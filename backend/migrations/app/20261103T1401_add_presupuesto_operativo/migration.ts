#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/d040238efa33e640ecad81edb12a0f5e57d2c422daef0a141c8ed171ed394143/contract';
import endContract from '../../snapshots/d040238efa33e640ecad81edb12a0f5e57d2c422daef0a141c8ed171ed394143/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/e1522deea1d0b78547ff8331bf9e3cfe3736c787d6a60900f952faff87450d09/contract';
import startContract from '../../snapshots/e1522deea1d0b78547ff8331bf9e3cfe3736c787d6a60900f952faff87450d09/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  fn,
  lit,
  primaryKey,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'nt_notificacion_presupuesto',
        columns: [
          col('diferencia', 'numeric(12,2)', {
            codecRef: { codecId: 'pg/numeric@1', typeParams: { precision: 12, scale: 2 } },
          }),
          col('id_categoria_presupuesto', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('id_costo', 'uuid', { codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_notificacion', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_presupuesto', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('monto_actual', 'numeric(12,2)', {
            codecRef: { codecId: 'pg/numeric@1', typeParams: { precision: 12, scale: 2 } },
          }),
          col('monto_planificado', 'numeric(12,2)', {
            codecRef: { codecId: 'pg/numeric@1', typeParams: { precision: 12, scale: 2 } },
          }),
          col('tipo_evento_presupuesto', 'text', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1' },
          }),
        ],
        constraints: [
          primaryKey(['id_notificacion']),
          checkExpression(
            'nt_notificacion_presupuesto_tipo_evento_presupuesto_ch_2246bebc',
            "\"tipo_evento_presupuesto\" IN ('SOBREPRESUPUESTO_CATEGORIA', 'DESBALANCE_GENERAL', 'PAGO_PROXIMO_VENCER', 'PAGO_VENCIDO')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'pr_categoria_presupuesto',
        columns: [
          col('activo', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('codigo', 'character varying(50)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 50 } },
          }),
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id_categoria_presupuesto', 'SERIAL', {
            notNull: true,
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('id_categoria_servicio', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('id_presupuesto', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('monto_asignado', 'numeric(12,2)', {
            notNull: true,
            codecRef: { codecId: 'pg/numeric@1', typeParams: { precision: 12, scale: 2 } },
          }),
          col('nombre', 'character varying(100)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id_categoria_presupuesto'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'pr_compromiso_pago',
        columns: [
          col('activo', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('concepto', 'character varying(200)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 200 } },
          }),
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('fecha_vencimiento', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id_compromiso', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_costo', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('monto_programado', 'numeric(12,2)', {
            notNull: true,
            codecRef: { codecId: 'pg/numeric@1', typeParams: { precision: 12, scale: 2 } },
          }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id_compromiso'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'pr_costo_proveedor',
        columns: [
          col('activo', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('concepto', 'character varying(200)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 200 } },
          }),
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('estado', 'text', {
            notNull: true,
            default: lit('PLANIFICADO'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('id_categoria_presupuesto', 'int4', {
            notNull: true,
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('id_costo', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_matrimonio_proveedor', 'uuid', { codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_presupuesto', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_proveedor_servicio', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('monto_estimado', 'numeric(12,2)', {
            notNull: true,
            codecRef: { codecId: 'pg/numeric@1', typeParams: { precision: 12, scale: 2 } },
          }),
          col('monto_real', 'numeric(12,2)', {
            notNull: true,
            codecRef: { codecId: 'pg/numeric@1', typeParams: { precision: 12, scale: 2 } },
          }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id_costo']),
          checkExpression(
            'pr_costo_proveedor_estado_check_dca93239',
            "\"estado\" IN ('PLANIFICADO', 'CONTRATADO', 'PAGADO', 'CANCELADO')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'pr_documento_pago',
        columns: [
          col('activo', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id_documento_pago', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_pago', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('nombre', 'character varying(200)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 200 } },
          }),
          col('tipo', 'character varying(100)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('url', 'character varying(500)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 500 } },
          }),
        ],
        constraints: [primaryKey(['id_documento_pago'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'pr_pago',
        columns: [
          col('activo', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('concepto', 'character varying(200)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 200 } },
          }),
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('fecha_pago', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id_costo', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_pago', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('monto', 'numeric(12,2)', {
            notNull: true,
            codecRef: { codecId: 'pg/numeric@1', typeParams: { precision: 12, scale: 2 } },
          }),
          col('numero_cuota', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('observacion', 'character varying(1000)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 1000 } },
          }),
          col('tipo', 'text', {
            notNull: true,
            default: lit('CUOTA'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id_pago']),
          checkExpression(
            'pr_pago_tipo_check_fdf46176',
            "\"tipo\" IN ('PAGO_INICIAL', 'CUOTA', 'PAGO_FINAL')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'pr_presupuesto',
        columns: [
          col('activo', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id_matrimonio', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_presupuesto', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('moneda', 'text', {
            notNull: true,
            default: lit('PEN'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('monto_total', 'numeric(12,2)', {
            notNull: true,
            codecRef: { codecId: 'pg/numeric@1', typeParams: { precision: 12, scale: 2 } },
          }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id_presupuesto']),
          checkExpression('pr_presupuesto_moneda_check_5b6558d3', "\"moneda\" IN ('PEN', 'USD')"),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'pr_seguimiento_pago',
        columns: [
          col('activo', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('detalle', 'character varying(1000)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 1000 } },
          }),
          col('id_pago', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_seguimiento_pago', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('tipo', 'character varying(50)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 50 } },
          }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id_seguimiento_pago'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'pr_categoria_presupuesto',
        constraint: 'pr_categoria_presupuesto_id_presupuesto_codigo_key',
        columns: ['id_presupuesto', 'codigo'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'pr_presupuesto',
        constraint: 'pr_presupuesto_id_matrimonio_key',
        columns: ['id_matrimonio'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'nt_notificacion_presupuesto',
        index: 'nt_notif_pres_categoria_idx',
        columns: ['id_categoria_presupuesto'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'nt_notificacion_presupuesto',
        index: 'nt_notif_pres_evento_idx',
        columns: ['tipo_evento_presupuesto'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'nt_notificacion_presupuesto',
        index: 'nt_notificacion_presupuesto_id_costo_idx_731f3b2c',
        columns: ['id_costo'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'nt_notificacion_presupuesto',
        index: 'nt_notificacion_presupuesto_id_presupuesto_idx_c44c4c50',
        columns: ['id_presupuesto'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'pr_categoria_presupuesto',
        index: 'pr_categoria_presupuesto_id_categoria_servicio_idx_1a4a76bb',
        columns: ['id_categoria_servicio'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'pr_categoria_presupuesto',
        index: 'pr_categoria_presupuesto_id_presupuesto_idx_c44c4c50',
        columns: ['id_presupuesto'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'pr_compromiso_pago',
        index: 'pr_compromiso_pago_fecha_vencimiento_idx_e6b83cdf',
        columns: ['fecha_vencimiento'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'pr_compromiso_pago',
        index: 'pr_compromiso_pago_id_costo_idx_731f3b2c',
        columns: ['id_costo'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'pr_costo_proveedor',
        index: 'pr_costo_categoria_idx',
        columns: ['id_categoria_presupuesto'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'pr_costo_proveedor',
        index: 'pr_costo_proveedor_id_matrimonio_proveedor_idx_f776101f',
        columns: ['id_matrimonio_proveedor'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'pr_costo_proveedor',
        index: 'pr_costo_proveedor_id_presupuesto_idx_c44c4c50',
        columns: ['id_presupuesto'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'pr_costo_proveedor',
        index: 'pr_costo_proveedor_id_proveedor_servicio_idx_00ef1a5c',
        columns: ['id_proveedor_servicio'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'pr_documento_pago',
        index: 'pr_documento_pago_id_pago_idx_b7132fb9',
        columns: ['id_pago'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'pr_pago',
        index: 'pr_pago_fecha_pago_idx_469590e1',
        columns: ['fecha_pago'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'pr_pago',
        index: 'pr_pago_id_costo_idx_731f3b2c',
        columns: ['id_costo'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'pr_presupuesto',
        index: 'pr_presupuesto_id_matrimonio_idx_97ab526e',
        columns: ['id_matrimonio'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'pr_seguimiento_pago',
        index: 'pr_seguimiento_pago_id_pago_idx_b7132fb9',
        columns: ['id_pago'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'nt_notificacion_presupuesto',
        foreignKey: {
          name: 'nt_notificacion_presupuesto_id_notificacion_fkey',
          columns: ['id_notificacion'],
          references: { schema: 'public', table: 'nt_notificacion', columns: ['id_notificacion'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'nt_notificacion_presupuesto',
        foreignKey: {
          name: 'nt_notificacion_presupuesto_id_presupuesto_fkey',
          columns: ['id_presupuesto'],
          references: { schema: 'public', table: 'pr_presupuesto', columns: ['id_presupuesto'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'nt_notificacion_presupuesto',
        foreignKey: {
          name: 'nt_notificacion_presupuesto_id_categoria_presupuesto_fkey',
          columns: ['id_categoria_presupuesto'],
          references: {
            schema: 'public',
            table: 'pr_categoria_presupuesto',
            columns: ['id_categoria_presupuesto'],
          },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'nt_notificacion_presupuesto',
        foreignKey: {
          name: 'nt_notificacion_presupuesto_id_costo_fkey',
          columns: ['id_costo'],
          references: { schema: 'public', table: 'pr_costo_proveedor', columns: ['id_costo'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'pr_categoria_presupuesto',
        foreignKey: {
          name: 'pr_categoria_presupuesto_id_presupuesto_fkey',
          columns: ['id_presupuesto'],
          references: { schema: 'public', table: 'pr_presupuesto', columns: ['id_presupuesto'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'pr_categoria_presupuesto',
        foreignKey: {
          name: 'pr_categoria_presupuesto_id_categoria_servicio_fkey',
          columns: ['id_categoria_servicio'],
          references: {
            schema: 'public',
            table: 'pv_categoria_servicio',
            columns: ['id_categoria_servicio'],
          },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'pr_compromiso_pago',
        foreignKey: {
          name: 'pr_compromiso_pago_id_costo_fkey',
          columns: ['id_costo'],
          references: { schema: 'public', table: 'pr_costo_proveedor', columns: ['id_costo'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'pr_costo_proveedor',
        foreignKey: {
          name: 'pr_costo_proveedor_id_presupuesto_fkey',
          columns: ['id_presupuesto'],
          references: { schema: 'public', table: 'pr_presupuesto', columns: ['id_presupuesto'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'pr_costo_proveedor',
        foreignKey: {
          name: 'pr_costo_proveedor_id_categoria_presupuesto_fkey',
          columns: ['id_categoria_presupuesto'],
          references: {
            schema: 'public',
            table: 'pr_categoria_presupuesto',
            columns: ['id_categoria_presupuesto'],
          },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'pr_costo_proveedor',
        foreignKey: {
          name: 'pr_costo_proveedor_id_matrimonio_proveedor_fkey',
          columns: ['id_matrimonio_proveedor'],
          references: {
            schema: 'public',
            table: 'pv_matrimonio_proveedor',
            columns: ['id_matrimonio_proveedor'],
          },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'pr_costo_proveedor',
        foreignKey: {
          name: 'pr_costo_proveedor_id_proveedor_servicio_fkey',
          columns: ['id_proveedor_servicio'],
          references: {
            schema: 'public',
            table: 'pv_proveedor_servicio',
            columns: ['id_proveedor_servicio'],
          },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'pr_documento_pago',
        foreignKey: {
          name: 'pr_documento_pago_id_pago_fkey',
          columns: ['id_pago'],
          references: { schema: 'public', table: 'pr_pago', columns: ['id_pago'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'pr_pago',
        foreignKey: {
          name: 'pr_pago_id_costo_fkey',
          columns: ['id_costo'],
          references: { schema: 'public', table: 'pr_costo_proveedor', columns: ['id_costo'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'pr_presupuesto',
        foreignKey: {
          name: 'pr_presupuesto_id_matrimonio_fkey',
          columns: ['id_matrimonio'],
          references: { schema: 'public', table: 'gp_matrimonio', columns: ['id_matrimonio'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'pr_seguimiento_pago',
        foreignKey: {
          name: 'pr_seguimiento_pago_id_pago_fkey',
          columns: ['id_pago'],
          references: { schema: 'public', table: 'pr_pago', columns: ['id_pago'] },
          onDelete: 'restrict',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
