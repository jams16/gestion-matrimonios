#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/5dc8eba0327a0d53287bd1649382dcba066b078c1396ac64018c42f3603ec3a4/contract';
import endContract from '../../snapshots/5dc8eba0327a0d53287bd1649382dcba066b078c1396ac64018c42f3603ec3a4/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'gp_proyecto',
        columns: [col('idProyecto', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } })],
        constraints: [primaryKey(['idProyecto'])],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
