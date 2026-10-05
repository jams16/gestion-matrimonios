#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/1ff57f93f03da3985a78b7eef6739d2c5ce6aa1270f687f755a496a38289dde1/contract';
import endContract from '../../snapshots/1ff57f93f03da3985a78b7eef6739d2c5ce6aa1270f687f755a496a38289dde1/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/9dc9fc3869141b3c54143bf9d9d2d0f190e376f544ddd26200d34149baa1f32f/contract';
import startContract from '../../snapshots/9dc9fc3869141b3c54143bf9d9d2d0f190e376f544ddd26200d34149baa1f32f/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  fn,
  primaryKey,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'gp_matrimonio',
        columns: [
          col('cantidad_invitados', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('ciudad_ubicacion', 'character varying(6)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 6 } },
          }),
          col('estado', 'bool', { codecRef: { codecId: 'pg/bool@1' } }),
          col('fecha_creacion', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('fecha_matrimonio', 'timestamptz', {
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('fecha_modificacion', 'timestamptz', {
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id_matrimonio', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_novio1', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('id_novio2', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('id_proyecto', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('ideas_moonboard', 'character varying(1000)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 1000 } },
          }),
          col('tipo_ceremonia', 'text', { codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [
          primaryKey(['id_matrimonio']),
          checkExpression(
            'gp_matrimonio_tipo_ceremonia_check_8c419e2d',
            "\"tipo_ceremonia\" IN ('RELIGIOSO', 'CIVIL', 'RELIGIOSO_Y_CIVIL', 'SIMBOLICO')",
          ),
        ],
      }),
      this.addColumn({
        schema: 'public',
        table: 'gp_proyecto',
        column: col('alcance', 'character varying(1000)', {
          codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 1000 } },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'gp_proyecto',
        column: col('estado', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'gp_proyecto',
        column: col('fecha_creacion', 'timestamptz', {
          notNull: true,
          default: fn('now()'),
          codecRef: { codecId: 'pg/timestamptz-temporal@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'gp_proyecto',
        column: col('fecha_fin', 'timestamptz', {
          codecRef: { codecId: 'pg/timestamptz-temporal@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'gp_proyecto',
        column: col('fecha_inicio', 'timestamptz', {
          codecRef: { codecId: 'pg/timestamptz-temporal@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'gp_proyecto',
        column: col('fecha_modificacion', 'timestamptz', {
          codecRef: { codecId: 'pg/timestamptz-temporal@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'gp_proyecto',
        column: col('id_pm', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'gp_proyecto',
        column: col('necesidades', 'character varying(1000)', {
          codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 1000 } },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'gp_proyecto',
        column: col('nombre', 'character varying(150)', {
          codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 150 } },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'gp_proyecto',
        column: col('objetivos', 'character varying(1000)', {
          codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 1000 } },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'gp_proyecto',
        column: col('presupuesto', 'numeric(12,2)', {
          codecRef: { codecId: 'pg/numeric@1', typeParams: { precision: 12, scale: 2 } },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'gp_proyecto',
        column: col('restricciones', 'character varying(1000)', {
          codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 1000 } },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'gp_proyecto',
        column: col('supuestos', 'character varying(1000)', {
          codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 1000 } },
        }),
      }),
      this.addUnique({
        schema: 'public',
        table: 'gp_matrimonio',
        constraint: 'gp_matrimonio_id_proyecto_key',
        columns: ['id_proyecto'],
      }),
      this.addCheckConstraint({
        schema: 'public',
        table: 'gp_proyecto',
        constraint: 'gp_proyecto_estado_check_8f4f8f4a',
        expression: "\"estado\" IN ('BORRADOR', 'INICIO', 'PLANIFICACION', 'EJECUCION', 'CIERRE')",
      }),
      this.createIndex({
        schema: 'public',
        table: 'gp_matrimonio',
        index: 'gp_matrimonio_ciudad_ubicacion_idx_b934bf8c',
        columns: ['ciudad_ubicacion'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'gp_matrimonio',
        index: 'gp_matrimonio_id_novio1_idx_83924686',
        columns: ['id_novio1'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'gp_matrimonio',
        index: 'gp_matrimonio_id_novio2_idx_8e50726e',
        columns: ['id_novio2'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'gp_proyecto',
        index: 'gp_proyecto_id_pm_idx_fbea8e1d',
        columns: ['id_pm'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'gp_matrimonio',
        foreignKey: {
          name: 'gp_matrimonio_id_proyecto_fkey',
          columns: ['id_proyecto'],
          references: { schema: 'public', table: 'gp_proyecto', columns: ['idProyecto'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'gp_matrimonio',
        foreignKey: {
          name: 'gp_matrimonio_id_novio1_fkey',
          columns: ['id_novio1'],
          references: { schema: 'public', table: 'au_usuario', columns: ['id_usuario'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'gp_matrimonio',
        foreignKey: {
          name: 'gp_matrimonio_id_novio2_fkey',
          columns: ['id_novio2'],
          references: { schema: 'public', table: 'au_usuario', columns: ['id_usuario'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'gp_matrimonio',
        foreignKey: {
          name: 'gp_matrimonio_ciudad_ubicacion_fkey',
          columns: ['ciudad_ubicacion'],
          references: { schema: 'public', table: 'in_ubigeo', columns: ['id_ubigeo'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'gp_proyecto',
        foreignKey: {
          name: 'gp_proyecto_id_pm_fkey',
          columns: ['id_pm'],
          references: { schema: 'public', table: 'au_usuario', columns: ['id_usuario'] },
          onDelete: 'restrict',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
