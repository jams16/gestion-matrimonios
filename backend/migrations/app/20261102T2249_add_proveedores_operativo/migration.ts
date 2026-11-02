#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/89f76cc6cfbd48930a151dcb6b8be89e921191172d5e8ac00692a5be7b237c8c/contract';
import startContract from '../../snapshots/89f76cc6cfbd48930a151dcb6b8be89e921191172d5e8ac00692a5be7b237c8c/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/e1522deea1d0b78547ff8331bf9e3cfe3736c787d6a60900f952faff87450d09/contract';
import endContract from '../../snapshots/e1522deea1d0b78547ff8331bf9e3cfe3736c787d6a60900f952faff87450d09/contract.json' with { type: 'json' };
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
        table: 'pv_documento_proveedor',
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
          col('id_documento_proveedor', 'uuid', {
            notNull: true,
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('id_matrimonio_proveedor', 'uuid', {
            notNull: true,
            codecRef: { codecId: 'pg/uuid@1' },
          }),
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
        constraints: [primaryKey(['id_documento_proveedor'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'pv_enlace_externo_proveedor',
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
          col('fecha_expiracion', 'timestamptz', {
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id_enlace_externo_proveedor', 'uuid', {
            notNull: true,
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('id_proveedor', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('token', 'character varying(100)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id_enlace_externo_proveedor'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'pv_evaluacion_proveedor',
        columns: [
          col('activo', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('calificacion', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id_evaluacion_proveedor', 'uuid', {
            notNull: true,
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('id_matrimonio_proveedor', 'uuid', {
            notNull: true,
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('resena', 'character varying(1000)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 1000 } },
          }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id_evaluacion_proveedor'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'pv_interaccion_proveedor',
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
          col('fecha_envio', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('fecha_respuesta', 'timestamptz', {
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id_interaccion_proveedor', 'uuid', {
            notNull: true,
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('id_matrimonio_proveedor', 'uuid', {
            notNull: true,
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('observacion', 'character varying(1000)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 1000 } },
          }),
          col('tipo', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id_interaccion_proveedor']),
          checkExpression(
            'pv_interaccion_proveedor_tipo_check_d16a620a',
            "\"tipo\" IN ('CONSULTA', 'RESPUESTA')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'pv_reserva_proveedor',
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
          col('estado', 'text', {
            notNull: true,
            default: lit('SOLICITADA'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('fecha', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id_matrimonio_proveedor', 'uuid', {
            notNull: true,
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('id_proveedor_servicio', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('id_reserva_proveedor', 'uuid', {
            notNull: true,
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('observacion', 'character varying(1000)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 1000 } },
          }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id_reserva_proveedor']),
          checkExpression(
            'pv_reserva_proveedor_estado_check_7ebb22f9',
            "\"estado\" IN ('SOLICITADA', 'CONFIRMADA', 'CANCELADA')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'pv_seguimiento_proveedor',
        columns: [
          col('activo', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('completado', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('descripcion', 'character varying(1000)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 1000 } },
          }),
          col('id_matrimonio_proveedor', 'uuid', {
            notNull: true,
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('id_seguimiento_proveedor', 'uuid', {
            notNull: true,
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('id_usuario', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('tipo', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('titulo', 'character varying(200)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 200 } },
          }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id_seguimiento_proveedor']),
          checkExpression(
            'pv_seguimiento_proveedor_tipo_check_b5f160d3',
            "\"tipo\" IN ('CHECKLIST', 'INCIDENCIA')",
          ),
        ],
      }),
      this.addUnique({
        schema: 'public',
        table: 'pv_enlace_externo_proveedor',
        constraint: 'pv_enlace_externo_proveedor_token_key',
        columns: ['token'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'pv_evaluacion_proveedor',
        constraint: 'pv_evaluacion_proveedor_id_matrimonio_proveedor_key',
        columns: ['id_matrimonio_proveedor'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'pv_documento_proveedor',
        index: 'pv_documento_proveedor_id_matrimonio_proveedor_idx_f776101f',
        columns: ['id_matrimonio_proveedor'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'pv_enlace_externo_proveedor',
        index: 'pv_enlace_externo_proveedor_id_proveedor_idx_4edef4d1',
        columns: ['id_proveedor'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'pv_interaccion_proveedor',
        index: 'pv_interaccion_proveedor_id_matrimonio_proveedor_idx_f776101f',
        columns: ['id_matrimonio_proveedor'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'pv_reserva_proveedor',
        index: 'pv_reserva_proveedor_fecha_idx_04cb6962',
        columns: ['fecha'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'pv_reserva_proveedor',
        index: 'pv_reserva_proveedor_id_matrimonio_proveedor_idx_f776101f',
        columns: ['id_matrimonio_proveedor'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'pv_reserva_proveedor',
        index: 'pv_reserva_proveedor_id_proveedor_servicio_idx_00ef1a5c',
        columns: ['id_proveedor_servicio'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'pv_seguimiento_proveedor',
        index: 'pv_seguimiento_proveedor_id_matrimonio_proveedor_idx_f776101f',
        columns: ['id_matrimonio_proveedor'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'pv_seguimiento_proveedor',
        index: 'pv_seguimiento_proveedor_tipo_idx_2cc2d1f4',
        columns: ['tipo'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'pv_documento_proveedor',
        foreignKey: {
          name: 'pv_documento_proveedor_id_matrimonio_proveedor_fkey',
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
        table: 'pv_enlace_externo_proveedor',
        foreignKey: {
          name: 'pv_enlace_externo_proveedor_id_proveedor_fkey',
          columns: ['id_proveedor'],
          references: { schema: 'public', table: 'pv_proveedor', columns: ['id_proveedor'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'pv_evaluacion_proveedor',
        foreignKey: {
          name: 'pv_evaluacion_proveedor_id_matrimonio_proveedor_fkey',
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
        table: 'pv_interaccion_proveedor',
        foreignKey: {
          name: 'pv_interaccion_proveedor_id_matrimonio_proveedor_fkey',
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
        table: 'pv_reserva_proveedor',
        foreignKey: {
          name: 'pv_reserva_proveedor_id_matrimonio_proveedor_fkey',
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
        table: 'pv_reserva_proveedor',
        foreignKey: {
          name: 'pv_reserva_proveedor_id_proveedor_servicio_fkey',
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
        table: 'pv_seguimiento_proveedor',
        foreignKey: {
          name: 'pv_seguimiento_proveedor_id_matrimonio_proveedor_fkey',
          columns: ['id_matrimonio_proveedor'],
          references: {
            schema: 'public',
            table: 'pv_matrimonio_proveedor',
            columns: ['id_matrimonio_proveedor'],
          },
          onDelete: 'restrict',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
