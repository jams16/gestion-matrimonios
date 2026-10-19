#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/0f018d43e41118bb6f1b804a8f6bf95dc88251e92f69a2f1d127ea65aa8a2471/contract';
import startContract from '../../snapshots/0f018d43e41118bb6f1b804a8f6bf95dc88251e92f69a2f1d127ea65aa8a2471/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/114444530efb2738e08f10e17776b84fe6addca0fd9db0bf7cc2f8cf937b6fea/contract';
import endContract from '../../snapshots/114444530efb2738e08f10e17776b84fe6addca0fd9db0bf7cc2f8cf937b6fea/contract.json' with { type: 'json' };
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
        table: 'nt_notificacion',
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
          col('enviada_push', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('fecha_generacion', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('fecha_programada', 'timestamptz', {
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id_notificacion', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_proyecto', 'uuid', { codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_usuario_destino', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('leida', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('mensaje', 'character varying(1000)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 1000 } },
          }),
          col('tipo', 'character varying(50)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 50 } },
          }),
          col('titulo', 'character varying(200)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 200 } },
          }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id_notificacion'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'nt_notificacion_cronograma',
        columns: [
          col('fecha_referencia', 'timestamptz', {
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id_actividad', 'uuid', { codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_hito', 'uuid', { codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_notificacion', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('tipo_evento_cronograma', 'text', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1' },
          }),
        ],
        constraints: [
          primaryKey(['id_notificacion']),
          checkExpression(
            'nt_notificacion_cronograma_tipo_evento_cronograma_chec_f9892b6f',
            "\"tipo_evento_cronograma\" IN ('ACTIVIDAD_PROXIMA_VENCER', 'ACTIVIDAD_VENCIDA', 'ACTIVIDAD_REPROGRAMADA', 'HITO_PROXIMO', 'HITO_VENCIDO')",
          ),
        ],
      }),
      this.createIndex({
        schema: 'public',
        table: 'nt_notificacion',
        index: 'nt_notificacion_activo_idx_4c0f2ecc',
        columns: ['activo'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'nt_notificacion',
        index: 'nt_notificacion_id_proyecto_idx_4279b0d1',
        columns: ['id_proyecto'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'nt_notificacion',
        index: 'nt_notificacion_id_usuario_destino_idx_5d5aa4a9',
        columns: ['id_usuario_destino'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'nt_notificacion',
        index: 'nt_notificacion_leida_idx_7c47c0b3',
        columns: ['leida'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'nt_notificacion_cronograma',
        index: 'nt_notificacion_cronograma_id_actividad_idx_e1ffad2c',
        columns: ['id_actividad'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'nt_notificacion_cronograma',
        index: 'nt_notificacion_cronograma_id_hito_idx_0a1cccf3',
        columns: ['id_hito'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'nt_notificacion_cronograma',
        index: 'nt_notificacion_cronograma_tipo_evento_cronograma_idx_43547b14',
        columns: ['tipo_evento_cronograma'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'nt_notificacion',
        foreignKey: {
          name: 'nt_notificacion_id_usuario_destino_fkey',
          columns: ['id_usuario_destino'],
          references: { schema: 'public', table: 'au_usuario', columns: ['id_usuario'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'nt_notificacion',
        foreignKey: {
          name: 'nt_notificacion_id_proyecto_fkey',
          columns: ['id_proyecto'],
          references: { schema: 'public', table: 'gp_proyecto', columns: ['idProyecto'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'nt_notificacion_cronograma',
        foreignKey: {
          name: 'nt_notificacion_cronograma_id_notificacion_fkey',
          columns: ['id_notificacion'],
          references: { schema: 'public', table: 'nt_notificacion', columns: ['id_notificacion'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'nt_notificacion_cronograma',
        foreignKey: {
          name: 'nt_notificacion_cronograma_id_actividad_fkey',
          columns: ['id_actividad'],
          references: { schema: 'public', table: 'cr_actividad', columns: ['id_actividad'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'nt_notificacion_cronograma',
        foreignKey: {
          name: 'nt_notificacion_cronograma_id_hito_fkey',
          columns: ['id_hito'],
          references: { schema: 'public', table: 'cr_hito', columns: ['id_hito'] },
          onDelete: 'restrict',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
