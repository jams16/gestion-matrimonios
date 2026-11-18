#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/065e248d944b4fbb64c3c452f6bba4496deec97a869cff66baf453d0f774cc37/contract';
import endContract from '../../snapshots/065e248d944b4fbb64c3c452f6bba4496deec97a869cff66baf453d0f774cc37/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/1a724624771bf0631e79ada564a249236ceeb1f558042ce767cf535a8bacbd80/contract';
import startContract from '../../snapshots/1a724624771bf0631e79ada564a249236ceeb1f558042ce767cf535a8bacbd80/contract.json' with { type: 'json' };
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
      this.dropConstraint({
        schema: 'public',
        table: 'cr_actividad',
        constraint: 'cr_actividad_id_hito_fkey',
        kind: 'foreignKey',
      }),
      this.dropIndex({
        schema: 'public',
        table: 'cr_actividad',
        index: 'cr_actividad_id_hito_idx_0a1cccf3',
      }),
      this.dropConstraint({
        schema: 'public',
        table: 'cr_plantilla_actividad',
        constraint: 'cr_plantilla_actividad_id_plantilla_hito_fkey',
        kind: 'foreignKey',
      }),
      this.dropIndex({
        schema: 'public',
        table: 'cr_plantilla_actividad',
        index: 'cr_plantilla_actividad_id_plantilla_hito_idx_99ae877f',
      }),
      this.createTable({
        schema: 'public',
        table: 'cr_actividad_checklist',
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
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 1000 } },
          }),
          col('fecha_completado', 'timestamptz', {
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id_actividad', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_actividad_checklist', 'uuid', {
            notNull: true,
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('id_plantilla_checklist', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('id_usuario_completo', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('modificado_manualmente', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('obligatorio', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
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
        constraints: [primaryKey(['id_actividad_checklist'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'cr_hito_actividad',
        columns: [
          col('id_actividad', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_hito', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_hito_actividad', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id_hito_actividad'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'cr_plantilla_actividad_checklist',
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
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 1000 } },
          }),
          col('id_plantilla_actividad', 'int4', {
            notNull: true,
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('id_plantilla_checklist', 'SERIAL', {
            notNull: true,
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('obligatorio', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
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
        constraints: [primaryKey(['id_plantilla_checklist'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'cr_plantilla_actividad_edt',
        columns: [
          col('id_elemento_edt', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_plantilla_actividad', 'int4', {
            notNull: true,
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('id_plantilla_actividad_edt', 'SERIAL', {
            notNull: true,
            codecRef: { codecId: 'pg/int4@1' },
          }),
        ],
        constraints: [primaryKey(['id_plantilla_actividad_edt'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'cr_plantilla_hito_actividad',
        columns: [
          col('id_plantilla_actividad', 'int4', {
            notNull: true,
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('id_plantilla_hito', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id_plantilla_hito_actividad', 'SERIAL', {
            notNull: true,
            codecRef: { codecId: 'pg/int4@1' },
          }),
        ],
        constraints: [primaryKey(['id_plantilla_hito_actividad'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'cr_plantilla_timing_dependencia',
        columns: [
          col('id_plantilla_timing_dependencia', 'SERIAL', {
            notNull: true,
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('id_timing_predecesor', 'int4', {
            notNull: true,
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('id_timing_sucesor', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('minutos_desfase', 'int4', {
            notNull: true,
            default: lit(0),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('tipo_dependencia', 'text', {
            notNull: true,
            default: lit('FINISH_TO_START'),
            codecRef: { codecId: 'pg/text@1' },
          }),
        ],
        constraints: [
          primaryKey(['id_plantilla_timing_dependencia']),
          checkExpression(
            'cr_plantilla_timing_dependencia_tipo_dependencia_check_d4c2b17a',
            '"tipo_dependencia" IN (\'FINISH_TO_START\')',
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'cr_timing_dependencia',
        columns: [
          col('id_timing_dependencia', 'SERIAL', {
            notNull: true,
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('id_timing_predecesor', 'uuid', {
            notNull: true,
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('id_timing_sucesor', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('minutos_desfase', 'int4', {
            notNull: true,
            default: lit(0),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('tipo_dependencia', 'text', {
            notNull: true,
            default: lit('FINISH_TO_START'),
            codecRef: { codecId: 'pg/text@1' },
          }),
        ],
        constraints: [
          primaryKey(['id_timing_dependencia']),
          checkExpression(
            'cr_timing_dependencia_tipo_dependencia_check_d4c2b17a',
            '"tipo_dependencia" IN (\'FINISH_TO_START\')',
          ),
        ],
      }),
      this.addColumn({
        schema: 'public',
        table: 'cr_plantilla_timing',
        column: col('offset_inicio_minutos', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'cr_plantilla_timing',
        column: col('tiempo_extra_minutos', 'int4', {
          notNull: true,
          default: lit(0),
          codecRef: { codecId: 'pg/int4@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'cr_plantilla_timing',
        column: col('tipo_horario', 'text', {
          notNull: true,
          default: lit('FLEXIBLE'),
          codecRef: { codecId: 'pg/text@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'cr_timing',
        column: col('tiempo_extra_minutos', 'int4', {
          notNull: true,
          default: lit(0),
          codecRef: { codecId: 'pg/int4@1' },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'cr_timing',
        column: col('tipo_horario', 'text', {
          notNull: true,
          default: lit('FLEXIBLE'),
          codecRef: { codecId: 'pg/text@1' },
        }),
      }),
      this.dropNotNull({ schema: 'public', table: 'cr_plantilla_timing', column: 'hora_inicio' }),
      this.addUnique({
        schema: 'public',
        table: 'cr_hito_actividad',
        constraint: 'cr_hito_actividad_id_hito_id_actividad_key',
        columns: ['id_hito', 'id_actividad'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'cr_plantilla_actividad_edt',
        constraint: 'cr_plantilla_actividad_edt_id_plantilla_actividad_id_elemento_edt_key',
        columns: ['id_plantilla_actividad', 'id_elemento_edt'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'cr_plantilla_hito_actividad',
        constraint: 'cr_plantilla_hito_actividad_id_plantilla_hito_id_plantilla_actividad_key',
        columns: ['id_plantilla_hito', 'id_plantilla_actividad'],
      }),
      this.addCheckConstraint({
        schema: 'public',
        table: 'cr_plantilla_timing',
        constraint: 'cr_plantilla_timing_tipo_horario_check_1d53f427',
        expression: "\"tipo_horario\" IN ('FIJO', 'FLEXIBLE')",
      }),
      this.addUnique({
        schema: 'public',
        table: 'cr_plantilla_timing_dependencia',
        constraint: 'cr_plantilla_timing_dependencia_id_timing_predecesor_id_timing_sucesor_key',
        columns: ['id_timing_predecesor', 'id_timing_sucesor'],
      }),
      this.addCheckConstraint({
        schema: 'public',
        table: 'cr_timing',
        constraint: 'cr_timing_tipo_horario_check_1d53f427',
        expression: "\"tipo_horario\" IN ('FIJO', 'FLEXIBLE')",
      }),
      this.addUnique({
        schema: 'public',
        table: 'cr_timing_dependencia',
        constraint: 'cr_timing_dependencia_id_timing_predecesor_id_timing_sucesor_key',
        columns: ['id_timing_predecesor', 'id_timing_sucesor'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'cr_actividad_checklist',
        index: 'cr_actividad_checklist_id_actividad_idx_e1ffad2c',
        columns: ['id_actividad'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'cr_actividad_checklist',
        index: 'cr_actividad_checklist_id_actividad_orden_idx_9f887c8d',
        columns: ['id_actividad', 'orden'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'cr_actividad_checklist',
        index: 'cr_actividad_checklist_id_plantilla_checklist_idx_e8822b3e',
        columns: ['id_plantilla_checklist'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'cr_actividad_checklist',
        index: 'cr_actividad_checklist_id_usuario_completo_idx_e4050dba',
        columns: ['id_usuario_completo'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'cr_hito_actividad',
        index: 'cr_hito_actividad_id_actividad_idx_e1ffad2c',
        columns: ['id_actividad'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'cr_hito_actividad',
        index: 'cr_hito_actividad_id_hito_idx_0a1cccf3',
        columns: ['id_hito'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'cr_plantilla_actividad_checklist',
        index: 'cr_pac_actividad_orden_idx',
        columns: ['id_plantilla_actividad', 'orden'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'cr_plantilla_actividad_checklist',
        index: 'cr_plantilla_actividad_checklist_id_plantilla_activida_396101d8',
        columns: ['id_plantilla_actividad'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'cr_plantilla_actividad_edt',
        index: 'cr_plantilla_actividad_edt_id_elemento_edt_idx_7bdeb067',
        columns: ['id_elemento_edt'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'cr_plantilla_actividad_edt',
        index: 'cr_plantilla_actividad_edt_id_plantilla_actividad_idx_396101d8',
        columns: ['id_plantilla_actividad'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'cr_plantilla_hito_actividad',
        index: 'cr_plantilla_hito_actividad_id_plantilla_actividad_idx_396101d8',
        columns: ['id_plantilla_actividad'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'cr_plantilla_hito_actividad',
        index: 'cr_plantilla_hito_actividad_id_plantilla_hito_idx_99ae877f',
        columns: ['id_plantilla_hito'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'cr_plantilla_timing_dependencia',
        index: 'cr_plantilla_timing_dependencia_id_timing_predecesor_i_1f9f34b6',
        columns: ['id_timing_predecesor'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'cr_plantilla_timing_dependencia',
        index: 'cr_plantilla_timing_dependencia_id_timing_sucesor_idx_5da66682',
        columns: ['id_timing_sucesor'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'cr_timing_dependencia',
        index: 'cr_timing_dependencia_id_timing_predecesor_idx_1f9f34b6',
        columns: ['id_timing_predecesor'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'cr_timing_dependencia',
        index: 'cr_timing_dependencia_id_timing_sucesor_idx_5da66682',
        columns: ['id_timing_sucesor'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'cr_actividad_checklist',
        foreignKey: {
          name: 'cr_actividad_checklist_id_actividad_fkey',
          columns: ['id_actividad'],
          references: { schema: 'public', table: 'cr_actividad', columns: ['id_actividad'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'cr_actividad_checklist',
        foreignKey: {
          name: 'cr_actividad_checklist_id_plantilla_checklist_fkey',
          columns: ['id_plantilla_checklist'],
          references: {
            schema: 'public',
            table: 'cr_plantilla_actividad_checklist',
            columns: ['id_plantilla_checklist'],
          },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'cr_actividad_checklist',
        foreignKey: {
          name: 'cr_actividad_checklist_id_usuario_completo_fkey',
          columns: ['id_usuario_completo'],
          references: { schema: 'public', table: 'au_usuario', columns: ['id_usuario'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'cr_hito_actividad',
        foreignKey: {
          name: 'cr_hito_actividad_id_hito_fkey',
          columns: ['id_hito'],
          references: { schema: 'public', table: 'cr_hito', columns: ['id_hito'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'cr_hito_actividad',
        foreignKey: {
          name: 'cr_hito_actividad_id_actividad_fkey',
          columns: ['id_actividad'],
          references: { schema: 'public', table: 'cr_actividad', columns: ['id_actividad'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'cr_plantilla_actividad_checklist',
        foreignKey: {
          name: 'cr_plantilla_actividad_checklist_id_plantilla_actividad_fkey',
          columns: ['id_plantilla_actividad'],
          references: {
            schema: 'public',
            table: 'cr_plantilla_actividad',
            columns: ['id_plantilla_actividad'],
          },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'cr_plantilla_actividad_edt',
        foreignKey: {
          name: 'cr_plantilla_actividad_edt_id_plantilla_actividad_fkey',
          columns: ['id_plantilla_actividad'],
          references: {
            schema: 'public',
            table: 'cr_plantilla_actividad',
            columns: ['id_plantilla_actividad'],
          },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'cr_plantilla_actividad_edt',
        foreignKey: {
          name: 'cr_plantilla_actividad_edt_id_elemento_edt_fkey',
          columns: ['id_elemento_edt'],
          references: { schema: 'public', table: 'gp_edt_elemento', columns: ['id_edt_elemento'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'cr_plantilla_hito_actividad',
        foreignKey: {
          name: 'cr_plantilla_hito_actividad_id_plantilla_hito_fkey',
          columns: ['id_plantilla_hito'],
          references: {
            schema: 'public',
            table: 'cr_plantilla_hito',
            columns: ['id_plantilla_hito'],
          },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'cr_plantilla_hito_actividad',
        foreignKey: {
          name: 'cr_plantilla_hito_actividad_id_plantilla_actividad_fkey',
          columns: ['id_plantilla_actividad'],
          references: {
            schema: 'public',
            table: 'cr_plantilla_actividad',
            columns: ['id_plantilla_actividad'],
          },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'cr_plantilla_timing_dependencia',
        foreignKey: {
          name: 'cr_plantilla_timing_dependencia_id_timing_predecesor_fkey',
          columns: ['id_timing_predecesor'],
          references: {
            schema: 'public',
            table: 'cr_plantilla_timing',
            columns: ['id_plantilla_timing'],
          },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'cr_plantilla_timing_dependencia',
        foreignKey: {
          name: 'cr_plantilla_timing_dependencia_id_timing_sucesor_fkey',
          columns: ['id_timing_sucesor'],
          references: {
            schema: 'public',
            table: 'cr_plantilla_timing',
            columns: ['id_plantilla_timing'],
          },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'cr_timing_dependencia',
        foreignKey: {
          name: 'cr_timing_dependencia_id_timing_predecesor_fkey',
          columns: ['id_timing_predecesor'],
          references: { schema: 'public', table: 'cr_timing', columns: ['id_timing'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'cr_timing_dependencia',
        foreignKey: {
          name: 'cr_timing_dependencia_id_timing_sucesor_fkey',
          columns: ['id_timing_sucesor'],
          references: { schema: 'public', table: 'cr_timing', columns: ['id_timing'] },
          onDelete: 'cascade',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
