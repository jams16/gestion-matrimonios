#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/1901f3c566c7c41e94ac93605244604a644ac7216af4d4636540865a662d21b0/contract';
import endContract from '../../snapshots/1901f3c566c7c41e94ac93605244604a644ac7216af4d4636540865a662d21b0/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/eeb03939a028ef1681a7e9fa00f9898259be814ecd0a0fee7c946253566fb638/contract';
import startContract from '../../snapshots/eeb03939a028ef1681a7e9fa00f9898259be814ecd0a0fee7c946253566fb638/contract.json' with { type: 'json' };
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
        table: 'in_entidad',
        columns: [
          col('codigo_ubigeo', 'character varying(6)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 6 } },
          }),
          col('correo_electronico', 'character varying(150)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 150 } },
          }),
          col('direccion', 'character varying(250)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 250 } },
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
          col('id_entidad', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('nombre_comercial', 'character varying(200)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 200 } },
          }),
          col('razon_social', 'character varying(200)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 200 } },
          }),
          col('redes_sociales', 'character varying(250)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 250 } },
          }),
          col('ruc', 'character varying(11)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 11 } },
          }),
          col('telefono', 'character varying(15)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 15 } },
          }),
          col('tipo_entidad', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [
          primaryKey(['id_entidad']),
          checkExpression(
            'in_entidad_tipo_entidad_check_babc8d43',
            "\"tipo_entidad\" IN ('PUBLICA', 'PRIVADA', 'RELIGIOSA', 'OTROS')",
          ),
        ],
      }),
      this.addUnique({
        schema: 'public',
        table: 'in_entidad',
        constraint: 'in_entidad_ruc_key',
        columns: ['ruc'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'in_entidad',
        index: 'in_entidad_codigo_ubigeo_idx_1bf1466f',
        columns: ['codigo_ubigeo'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'in_entidad',
        foreignKey: {
          name: 'in_entidad_codigo_ubigeo_fkey',
          columns: ['codigo_ubigeo'],
          references: { schema: 'public', table: 'in_ubigeo', columns: ['id_ubigeo'] },
          onDelete: 'restrict',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
