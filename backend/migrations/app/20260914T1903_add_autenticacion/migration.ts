#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/1901f3c566c7c41e94ac93605244604a644ac7216af4d4636540865a662d21b0/contract';
import startContract from '../../snapshots/1901f3c566c7c41e94ac93605244604a644ac7216af4d4636540865a662d21b0/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/4eadc66f0cd0f9855b471a2ebb6fc12c7a996288addae3c9edb399cbff2f02e3/contract';
import endContract from '../../snapshots/4eadc66f0cd0f9855b471a2ebb6fc12c7a996288addae3c9edb399cbff2f02e3/contract.json' with { type: 'json' };
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
        table: 'au_sesion',
        columns: [
          col('fecha_creacion', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('fecha_expiracion', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('fecha_revocacion', 'timestamptz', {
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id_sesion', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id_usuario', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('refresh_token_hash', 'character varying(255)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
        ],
        constraints: [primaryKey(['id_sesion'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'au_token_cuenta',
        columns: [
          col('fecha_creacion', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('fecha_expiracion', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('fecha_utilizacion', 'timestamptz', {
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id_token', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id_usuario', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('tipo_token', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('token_hash', 'character varying(255)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
        ],
        constraints: [
          primaryKey(['id_token']),
          checkExpression(
            'au_token_cuenta_tipo_token_check_00cff9e2',
            "\"tipo_token\" IN ('VERIFICACION_CORREO', 'RECUPERACION_CONTRASENA')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'au_usuario',
        columns: [
          col('contrasena_hash', 'character varying(255)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
          col('correo_verificado', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('es_activo', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('fecha_creacion', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('fecha_modificacion', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id_entidad', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('id_persona_natural', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id_usuario', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('tipo_usuario', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('ultimo_acceso', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('usuario', 'character varying(150)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 150 } },
          }),
        ],
        constraints: [
          primaryKey(['id_usuario']),
          checkExpression(
            'au_usuario_tipo_usuario_check_b015ba47',
            "\"tipo_usuario\" IN ('PROJECT_MANAGER', 'OTROS')",
          ),
        ],
      }),
      this.addUnique({
        schema: 'public',
        table: 'au_usuario',
        constraint: 'au_usuario_usuario_key',
        columns: ['usuario'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'au_sesion',
        index: 'au_sesion_id_usuario_idx_00d592a0',
        columns: ['id_usuario'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'au_token_cuenta',
        index: 'au_token_cuenta_id_usuario_idx_00d592a0',
        columns: ['id_usuario'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'au_token_cuenta',
        index: 'au_token_cuenta_id_usuario_tipo_token_idx_b9e74dee',
        columns: ['id_usuario', 'tipo_token'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'au_usuario',
        index: 'au_usuario_id_entidad_idx_bb9cb049',
        columns: ['id_entidad'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'au_usuario',
        index: 'au_usuario_id_persona_natural_idx_2ece1570',
        columns: ['id_persona_natural'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'au_sesion',
        foreignKey: {
          name: 'au_sesion_id_usuario_fkey',
          columns: ['id_usuario'],
          references: { schema: 'public', table: 'au_usuario', columns: ['id_usuario'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'au_token_cuenta',
        foreignKey: {
          name: 'au_token_cuenta_id_usuario_fkey',
          columns: ['id_usuario'],
          references: { schema: 'public', table: 'au_usuario', columns: ['id_usuario'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'au_usuario',
        foreignKey: {
          name: 'au_usuario_id_persona_natural_fkey',
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
        table: 'au_usuario',
        foreignKey: {
          name: 'au_usuario_id_entidad_fkey',
          columns: ['id_entidad'],
          references: { schema: 'public', table: 'in_entidad', columns: ['id_entidad'] },
          onDelete: 'restrict',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
