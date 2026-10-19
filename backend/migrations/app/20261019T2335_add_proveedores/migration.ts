#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/672c4927d44b7df966c870f87dca0504cb0659c67d5e16d79b08f159d568798e/contract';
import startContract from '../../snapshots/672c4927d44b7df966c870f87dca0504cb0659c67d5e16d79b08f159d568798e/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/a6db803d40d8f5a34f99afa2d2b798d41ee3c71637d6df3e0af554e898b906c2/contract';
import endContract from '../../snapshots/a6db803d40d8f5a34f99afa2d2b798d41ee3c71637d6df3e0af554e898b906c2/contract.json' with { type: 'json' };
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
        table: 'pv_categoria_servicio',
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
          col('descripcion', 'character varying(500)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 500 } },
          }),
          col('id_categoria_servicio', 'SERIAL', {
            notNull: true,
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('nombre', 'character varying(100)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
          col('orden', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id_categoria_servicio'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'pv_disponibilidad_proveedor',
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
          col('disponible', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('fecha', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('hora_fin', 'time', { codecRef: { codecId: 'pg/time-temporal@1' } }),
          col('hora_inicio', 'time', { codecRef: { codecId: 'pg/time-temporal@1' } }),
          col('id_disponibilidad_proveedor', 'uuid', {
            notNull: true,
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('id_proveedor', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_proveedor_servicio', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('observacion', 'character varying(1000)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 1000 } },
          }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id_disponibilidad_proveedor'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'pv_matrimonio_proveedor',
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
          col('estado_seleccion', 'text', {
            notNull: true,
            default: lit('CONSIDERADO'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('favorito', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('id_matrimonio', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_matrimonio_proveedor', 'uuid', {
            notNull: true,
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('id_proveedor', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('observaciones', 'character varying(1000)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 1000 } },
          }),
          col('prioridad', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id_matrimonio_proveedor']),
          checkExpression(
            'pv_matrimonio_proveedor_estado_seleccion_check_4a0eb630',
            "\"estado_seleccion\" IN ('CONSIDERADO', 'SELECCIONADO', 'DESCARTADO')",
          ),
          checkExpression(
            'pv_matrimonio_proveedor_prioridad_check_7fdb94e2',
            "\"prioridad\" IN ('ALTA', 'MEDIA', 'BAJA')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'pv_proveedor',
        columns: [
          col('activo', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('correo_contacto', 'character varying(150)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 150 } },
          }),
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('descripcion', 'character varying(1000)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 1000 } },
          }),
          col('direccion', 'character varying(250)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 250 } },
          }),
          col('id_entidad', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('id_persona_natural', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('id_proveedor', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('instagram', 'character varying(150)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 150 } },
          }),
          col('nombre_comercial', 'character varying(200)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 200 } },
          }),
          col('observaciones', 'character varying(1000)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 1000 } },
          }),
          col('sitio_web', 'character varying(250)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 250 } },
          }),
          col('telefono_contacto', 'character varying(15)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 15 } },
          }),
          col('tipo_proveedor', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('whatsapp', 'character varying(15)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 15 } },
          }),
        ],
        constraints: [
          primaryKey(['id_proveedor']),
          checkExpression(
            'pv_proveedor_tipo_proveedor_check_f441b683',
            "\"tipo_proveedor\" IN ('PERSONA_NATURAL', 'EMPRESA')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'pv_proveedor_servicio',
        columns: [
          col('activo', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('costo_referencial', 'numeric(12,2)', {
            notNull: true,
            codecRef: { codecId: 'pg/numeric@1', typeParams: { precision: 12, scale: 2 } },
          }),
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('descripcion', 'character varying(1000)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 1000 } },
          }),
          col('id_categoria_servicio', 'int4', {
            notNull: true,
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('id_proveedor', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_proveedor_servicio', 'SERIAL', {
            notNull: true,
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('moneda', 'text', {
            notNull: true,
            default: lit('PEN'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('nombre', 'character varying(200)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 200 } },
          }),
          col('unidad_precio', 'character varying(50)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 50 } },
          }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id_proveedor_servicio']),
          checkExpression(
            'pv_proveedor_servicio_moneda_check_5b6558d3',
            "\"moneda\" IN ('PEN', 'USD')",
          ),
        ],
      }),
      this.addUnique({
        schema: 'public',
        table: 'pv_categoria_servicio',
        constraint: 'pv_categoria_servicio_codigo_key',
        columns: ['codigo'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'pv_matrimonio_proveedor',
        constraint: 'pv_matrimonio_proveedor_id_matrimonio_id_proveedor_key',
        columns: ['id_matrimonio', 'id_proveedor'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'pv_proveedor',
        constraint: 'pv_proveedor_id_persona_natural_key',
        columns: ['id_persona_natural'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'pv_proveedor',
        constraint: 'pv_proveedor_id_entidad_key',
        columns: ['id_entidad'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'pv_proveedor_servicio',
        constraint: 'pv_proveedor_servicio_id_proveedor_id_categoria_servicio_nombre_key',
        columns: ['id_proveedor', 'id_categoria_servicio', 'nombre'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'pv_categoria_servicio',
        index: 'pv_categoria_servicio_activo_idx_4c0f2ecc',
        columns: ['activo'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'pv_disponibilidad_proveedor',
        index: 'pv_disp_serv_fecha_idx',
        columns: ['id_proveedor_servicio', 'fecha'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'pv_disponibilidad_proveedor',
        index: 'pv_disponibilidad_proveedor_id_proveedor_fecha_idx_2e6fc2d1',
        columns: ['id_proveedor', 'fecha'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'pv_disponibilidad_proveedor',
        index: 'pv_disponibilidad_proveedor_id_proveedor_idx_4edef4d1',
        columns: ['id_proveedor'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'pv_disponibilidad_proveedor',
        index: 'pv_disponibilidad_proveedor_id_proveedor_servicio_idx_00ef1a5c',
        columns: ['id_proveedor_servicio'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'pv_matrimonio_proveedor',
        index: 'pv_matrimonio_proveedor_estado_seleccion_idx_2e2e8d0f',
        columns: ['estado_seleccion'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'pv_matrimonio_proveedor',
        index: 'pv_matrimonio_proveedor_favorito_idx_84883da0',
        columns: ['favorito'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'pv_matrimonio_proveedor',
        index: 'pv_matrimonio_proveedor_id_matrimonio_idx_97ab526e',
        columns: ['id_matrimonio'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'pv_matrimonio_proveedor',
        index: 'pv_matrimonio_proveedor_id_proveedor_idx_4edef4d1',
        columns: ['id_proveedor'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'pv_proveedor',
        index: 'pv_proveedor_activo_idx_4c0f2ecc',
        columns: ['activo'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'pv_proveedor',
        index: 'pv_proveedor_nombre_comercial_idx_2a60b865',
        columns: ['nombre_comercial'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'pv_proveedor_servicio',
        index: 'pv_proveedor_servicio_id_categoria_servicio_idx_1a4a76bb',
        columns: ['id_categoria_servicio'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'pv_proveedor_servicio',
        index: 'pv_proveedor_servicio_id_proveedor_idx_4edef4d1',
        columns: ['id_proveedor'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'pv_disponibilidad_proveedor',
        foreignKey: {
          name: 'pv_disponibilidad_proveedor_id_proveedor_fkey',
          columns: ['id_proveedor'],
          references: { schema: 'public', table: 'pv_proveedor', columns: ['id_proveedor'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'pv_disponibilidad_proveedor',
        foreignKey: {
          name: 'pv_disponibilidad_proveedor_id_proveedor_servicio_fkey',
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
        table: 'pv_matrimonio_proveedor',
        foreignKey: {
          name: 'pv_matrimonio_proveedor_id_matrimonio_fkey',
          columns: ['id_matrimonio'],
          references: { schema: 'public', table: 'gp_matrimonio', columns: ['id_matrimonio'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'pv_matrimonio_proveedor',
        foreignKey: {
          name: 'pv_matrimonio_proveedor_id_proveedor_fkey',
          columns: ['id_proveedor'],
          references: { schema: 'public', table: 'pv_proveedor', columns: ['id_proveedor'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'pv_proveedor',
        foreignKey: {
          name: 'pv_proveedor_id_persona_natural_fkey',
          columns: ['id_persona_natural'],
          references: {
            schema: 'public',
            table: 'in_persona_natural',
            columns: ['id_persona_natural'],
          },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'pv_proveedor',
        foreignKey: {
          name: 'pv_proveedor_id_entidad_fkey',
          columns: ['id_entidad'],
          references: { schema: 'public', table: 'in_entidad', columns: ['id_entidad'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'pv_proveedor_servicio',
        foreignKey: {
          name: 'pv_proveedor_servicio_id_proveedor_fkey',
          columns: ['id_proveedor'],
          references: { schema: 'public', table: 'pv_proveedor', columns: ['id_proveedor'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'pv_proveedor_servicio',
        foreignKey: {
          name: 'pv_proveedor_servicio_id_categoria_servicio_fkey',
          columns: ['id_categoria_servicio'],
          references: {
            schema: 'public',
            table: 'pv_categoria_servicio',
            columns: ['id_categoria_servicio'],
          },
          onDelete: 'restrict',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
