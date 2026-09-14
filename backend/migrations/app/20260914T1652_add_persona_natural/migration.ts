#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/5dc8eba0327a0d53287bd1649382dcba066b078c1396ac64018c42f3603ec3a4/contract';
import startContract from '../../snapshots/5dc8eba0327a0d53287bd1649382dcba066b078c1396ac64018c42f3603ec3a4/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/eeb03939a028ef1681a7e9fa00f9898259be814ecd0a0fee7c946253566fb638/contract';
import endContract from '../../snapshots/eeb03939a028ef1681a7e9fa00f9898259be814ecd0a0fee7c946253566fb638/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, lit, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'in_persona_natural',
        columns: [
          col('apellido_materno', 'character varying(100)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
          col('apellido_paterno', 'character varying(100)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
          col('codigo_ubigeo', 'character varying(6)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 6 } },
          }),
          col('correo_electronico', 'character varying(150)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 150 } },
          }),
          col('direccion', 'character varying(250)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 250 } },
          }),
          col('dni', 'character varying(8)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 8 } },
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
          col('id_persona_natural', 'SERIAL', {
            notNull: true,
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('nombres', 'character varying(100)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
          col('telefono', 'character varying(15)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 15 } },
          }),
        ],
        constraints: [primaryKey(['id_persona_natural'], { name: 'in_persona_natural_pkey' })],
      }),
      this.createTable({
        schema: 'public',
        table: 'in_ubigeo',
        columns: [
          col('departamento', 'character varying(100)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
          col('distrito', 'character varying(100)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
          col('id_ubigeo', 'character varying(6)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 6 } },
          }),
          col('provincia', 'character varying(100)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
        ],
        constraints: [primaryKey(['id_ubigeo'], { name: 'in_ubigeo_pkey' })],
      }),
      this.addUnique({
        schema: 'public',
        table: 'in_persona_natural',
        constraint: 'in_persona_natural_dni_key',
        columns: ['dni'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'in_persona_natural',
        index: 'in_persona_natural_codigo_ubigeo_idx',
        columns: ['codigo_ubigeo'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'in_persona_natural',
        foreignKey: {
          name: 'in_persona_natural_codigo_ubigeo_fkey',
          columns: ['codigo_ubigeo'],
          references: { schema: 'public', table: 'in_ubigeo', columns: ['id_ubigeo'] },
          onDelete: 'restrict',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
