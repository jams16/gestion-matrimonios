#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/2fcc7f5b53183e49386cf6d5af5200f04e1da662a34999689ba726bed81f2c00/contract';
import endContract from '../../snapshots/2fcc7f5b53183e49386cf6d5af5200f04e1da662a34999689ba726bed81f2c00/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/a6db803d40d8f5a34f99afa2d2b798d41ee3c71637d6df3e0af554e898b906c2/contract';
import startContract from '../../snapshots/a6db803d40d8f5a34f99afa2d2b798d41ee3c71637d6df3e0af554e898b906c2/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, lit, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'gp_buena_practica',
        columns: [
          col('anio_fuente', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('aplicacion_matrimonios', 'character varying(2000)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 2000 } },
          }),
          col('area_gestion', 'character varying(100)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
          col('categoria', 'character varying(100)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
          col('codigo', 'character varying(50)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 50 } },
          }),
          col('descripcion_resumida', 'character varying(1000)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 1000 } },
          }),
          col('ejemplo_practico', 'character varying(2000)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 2000 } },
          }),
          col('estado', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('fecha_creacion', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('fecha_fin_vigencia', 'timestamptz', {
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('fecha_modificacion', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('fecha_vigencia', 'timestamptz', {
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('fuente_metodologica', 'character varying(250)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 250 } },
          }),
          col('id_buena_practica', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_fase_proyecto', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('id_usuario_creacion', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id_usuario_modificacion', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('nombre', 'character varying(200)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 200 } },
          }),
          col('orden_visualizacion', 'int4', {
            notNull: true,
            default: lit(0),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('recomendaciones', 'character varying(2000)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 2000 } },
          }),
          col('referencia_especifica', 'character varying(500)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 500 } },
          }),
          col('version', 'character varying(50)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 50 } },
          }),
        ],
        constraints: [primaryKey(['id_buena_practica'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'gp_buena_practica',
        constraint: 'gp_buena_practica_codigo_key',
        columns: ['codigo'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'gp_buena_practica',
        index: 'gp_buena_practica_area_gestion_idx_7f56ec55',
        columns: ['area_gestion'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'gp_buena_practica',
        index: 'gp_buena_practica_categoria_idx_06236822',
        columns: ['categoria'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'gp_buena_practica',
        index: 'gp_buena_practica_estado_idx_c74e5888',
        columns: ['estado'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'gp_buena_practica',
        index: 'gp_buena_practica_id_fase_proyecto_idx_0ca9d564',
        columns: ['id_fase_proyecto'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'gp_buena_practica',
        index: 'gp_buena_practica_id_usuario_creacion_idx_b50e345c',
        columns: ['id_usuario_creacion'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'gp_buena_practica',
        index: 'gp_buena_practica_id_usuario_modificacion_idx_38fa3453',
        columns: ['id_usuario_modificacion'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'gp_buena_practica',
        foreignKey: {
          name: 'gp_buena_practica_id_fase_proyecto_fkey',
          columns: ['id_fase_proyecto'],
          references: {
            schema: 'public',
            table: 'gp_fase_proyecto',
            columns: ['id_fase_proyecto'],
          },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'gp_buena_practica',
        foreignKey: {
          name: 'gp_buena_practica_id_usuario_creacion_fkey',
          columns: ['id_usuario_creacion'],
          references: { schema: 'public', table: 'au_usuario', columns: ['id_usuario'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'gp_buena_practica',
        foreignKey: {
          name: 'gp_buena_practica_id_usuario_modificacion_fkey',
          columns: ['id_usuario_modificacion'],
          references: { schema: 'public', table: 'au_usuario', columns: ['id_usuario'] },
          onDelete: 'restrict',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
