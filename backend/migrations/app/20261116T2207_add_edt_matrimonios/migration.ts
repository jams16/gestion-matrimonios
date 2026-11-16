#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/1a724624771bf0631e79ada564a249236ceeb1f558042ce767cf535a8bacbd80/contract';
import endContract from '../../snapshots/1a724624771bf0631e79ada564a249236ceeb1f558042ce767cf535a8bacbd80/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/7812dac0ea90013ba36bf72a60eed3ee3644e08293753b570b2d545cbbacc8e1/contract';
import startContract from '../../snapshots/7812dac0ea90013ba36bf72a60eed3ee3644e08293753b570b2d545cbbacc8e1/contract.json' with { type: 'json' };
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
        table: 'gp_edt_elemento',
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
          col('descripcion', 'character varying(1000)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 1000 } },
          }),
          col('id_categoria_servicio', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('id_edt_elemento', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('nombre', 'character varying(200)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 200 } },
          }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id_edt_elemento'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'gp_edt_matrimonio',
        columns: [
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('estado', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('id_edt_matrimonio', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_matrimonio', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_plantilla_origen', 'uuid', { codecRef: { codecId: 'pg/uuid@1' } }),
          col('nombre', 'character varying(200)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 200 } },
          }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id_edt_matrimonio'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'gp_edt_matrimonio_elemento',
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
          col('descripcion', 'character varying(1000)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 1000 } },
          }),
          col('id_categoria_servicio', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('id_edt_elemento_origen', 'uuid', { codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_edt_matrimonio', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_edt_matrimonio_elemento', 'uuid', {
            notNull: true,
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('id_edt_matrimonio_elemento_padre', 'uuid', { codecRef: { codecId: 'pg/uuid@1' } }),
          col('nombre', 'character varying(200)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 200 } },
          }),
          col('orden', 'int4', {
            notNull: true,
            default: lit(0),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id_edt_matrimonio_elemento'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'gp_edt_plantilla',
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
          col('descripcion', 'character varying(1000)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 1000 } },
          }),
          col('id_edt_plantilla', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_usuario', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('nombre', 'character varying(200)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 200 } },
          }),
          col('tipo', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id_edt_plantilla']),
          checkExpression('gp_edt_plantilla_tipo_check_25efc272', "\"tipo\" IN ('GLOBAL', 'WP')"),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'gp_edt_plantilla_elemento',
        columns: [
          col('activo', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('id_edt_elemento', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_edt_plantilla', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_edt_plantilla_elemento', 'uuid', {
            notNull: true,
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('id_edt_plantilla_elemento_padre', 'uuid', { codecRef: { codecId: 'pg/uuid@1' } }),
          col('orden', 'int4', {
            notNull: true,
            default: lit(0),
            codecRef: { codecId: 'pg/int4@1' },
          }),
        ],
        constraints: [primaryKey(['id_edt_plantilla_elemento'])],
      }),
      this.createIndex({
        schema: 'public',
        table: 'gp_edt_elemento',
        index: 'gp_edt_elemento_activo_idx_4c0f2ecc',
        columns: ['activo'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'gp_edt_elemento',
        index: 'gp_edt_elemento_id_categoria_servicio_idx_1a4a76bb',
        columns: ['id_categoria_servicio'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'gp_edt_matrimonio',
        index: 'gp_edt_matrimonio_id_matrimonio_estado_idx_26a97345',
        columns: ['id_matrimonio', 'estado'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'gp_edt_matrimonio',
        index: 'gp_edt_matrimonio_id_matrimonio_idx_97ab526e',
        columns: ['id_matrimonio'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'gp_edt_matrimonio',
        index: 'gp_edt_matrimonio_id_plantilla_origen_idx_e4cc0c49',
        columns: ['id_plantilla_origen'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'gp_edt_matrimonio_elemento',
        index: 'gp_edt_matrimonio_elemento_id_edt_matrimonio_idx_ab0ec48b',
        columns: ['id_edt_matrimonio'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'gp_edt_matrimonio_elemento',
        index: 'gp_edt_me_categoria_idx',
        columns: ['id_categoria_servicio'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'gp_edt_matrimonio_elemento',
        index: 'gp_edt_me_matrimonio_orden_idx',
        columns: ['id_edt_matrimonio', 'orden'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'gp_edt_matrimonio_elemento',
        index: 'gp_edt_me_origen_idx',
        columns: ['id_edt_elemento_origen'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'gp_edt_matrimonio_elemento',
        index: 'gp_edt_me_padre_idx',
        columns: ['id_edt_matrimonio_elemento_padre'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'gp_edt_plantilla',
        index: 'gp_edt_plantilla_id_usuario_idx_00d592a0',
        columns: ['id_usuario'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'gp_edt_plantilla',
        index: 'gp_edt_plantilla_tipo_activo_idx_5ba56ff7',
        columns: ['tipo', 'activo'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'gp_edt_plantilla_elemento',
        index: 'gp_edt_pe_elemento_idx',
        columns: ['id_edt_elemento'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'gp_edt_plantilla_elemento',
        index: 'gp_edt_pe_padre_idx',
        columns: ['id_edt_plantilla_elemento_padre'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'gp_edt_plantilla_elemento',
        index: 'gp_edt_pe_plantilla_orden_idx',
        columns: ['id_edt_plantilla', 'orden'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'gp_edt_plantilla_elemento',
        index: 'gp_edt_plantilla_elemento_id_edt_plantilla_idx_986c3286',
        columns: ['id_edt_plantilla'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'gp_edt_elemento',
        foreignKey: {
          name: 'gp_edt_elemento_categoria_fk',
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
        table: 'gp_edt_matrimonio',
        foreignKey: {
          name: 'gp_edt_matrimonio_fk',
          columns: ['id_matrimonio'],
          references: { schema: 'public', table: 'gp_matrimonio', columns: ['id_matrimonio'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'gp_edt_matrimonio',
        foreignKey: {
          name: 'gp_edt_matrimonio_plantilla_fk',
          columns: ['id_plantilla_origen'],
          references: {
            schema: 'public',
            table: 'gp_edt_plantilla',
            columns: ['id_edt_plantilla'],
          },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'gp_edt_matrimonio_elemento',
        foreignKey: {
          name: 'gp_edt_me_matrimonio_fk',
          columns: ['id_edt_matrimonio'],
          references: {
            schema: 'public',
            table: 'gp_edt_matrimonio',
            columns: ['id_edt_matrimonio'],
          },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'gp_edt_matrimonio_elemento',
        foreignKey: {
          name: 'gp_edt_me_origen_fk',
          columns: ['id_edt_elemento_origen'],
          references: { schema: 'public', table: 'gp_edt_elemento', columns: ['id_edt_elemento'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'gp_edt_matrimonio_elemento',
        foreignKey: {
          name: 'gp_edt_me_categoria_fk',
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
        table: 'gp_edt_matrimonio_elemento',
        foreignKey: {
          name: 'gp_edt_me_padre_fk',
          columns: ['id_edt_matrimonio_elemento_padre'],
          references: {
            schema: 'public',
            table: 'gp_edt_matrimonio_elemento',
            columns: ['id_edt_matrimonio_elemento'],
          },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'gp_edt_plantilla',
        foreignKey: {
          name: 'gp_edt_plantilla_usuario_fk',
          columns: ['id_usuario'],
          references: { schema: 'public', table: 'au_usuario', columns: ['id_usuario'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'gp_edt_plantilla_elemento',
        foreignKey: {
          name: 'gp_edt_pe_plantilla_fk',
          columns: ['id_edt_plantilla'],
          references: {
            schema: 'public',
            table: 'gp_edt_plantilla',
            columns: ['id_edt_plantilla'],
          },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'gp_edt_plantilla_elemento',
        foreignKey: {
          name: 'gp_edt_pe_elemento_fk',
          columns: ['id_edt_elemento'],
          references: { schema: 'public', table: 'gp_edt_elemento', columns: ['id_edt_elemento'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'gp_edt_plantilla_elemento',
        foreignKey: {
          name: 'gp_edt_pe_padre_fk',
          columns: ['id_edt_plantilla_elemento_padre'],
          references: {
            schema: 'public',
            table: 'gp_edt_plantilla_elemento',
            columns: ['id_edt_plantilla_elemento'],
          },
          onDelete: 'cascade',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
