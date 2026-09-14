#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/4eadc66f0cd0f9855b471a2ebb6fc12c7a996288addae3c9edb399cbff2f02e3/contract';
import startContract from '../../snapshots/4eadc66f0cd0f9855b471a2ebb6fc12c7a996288addae3c9edb399cbff2f02e3/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/9dc9fc3869141b3c54143bf9d9d2d0f190e376f544ddd26200d34149baa1f32f/contract';
import endContract from '../../snapshots/9dc9fc3869141b3c54143bf9d9d2d0f190e376f544ddd26200d34149baa1f32f/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'au_registro_pendiente',
        columns: [
          col('apellido_materno', 'character varying(100)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
          col('apellido_paterno', 'character varying(100)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
          col('correo_electronico', 'character varying(150)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 150 } },
          }),
          col('fecha_creacion', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('fecha_expiracion', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('fecha_verificacion', 'timestamptz', {
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id_registro', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('nombres', 'character varying(100)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
          col('token_hash', 'character varying(255)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 255 } },
          }),
        ],
        constraints: [primaryKey(['id_registro'])],
      }),
      this.createIndex({
        schema: 'public',
        table: 'au_registro_pendiente',
        index: 'au_registro_pendiente_correo_electronico_idx_b3ece6ad',
        columns: ['correo_electronico'],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
