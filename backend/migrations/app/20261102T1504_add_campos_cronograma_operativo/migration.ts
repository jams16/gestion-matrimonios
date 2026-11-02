#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/2fcc7f5b53183e49386cf6d5af5200f04e1da662a34999689ba726bed81f2c00/contract';
import startContract from '../../snapshots/2fcc7f5b53183e49386cf6d5af5200f04e1da662a34999689ba726bed81f2c00/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/89f76cc6cfbd48930a151dcb6b8be89e921191172d5e8ac00692a5be7b237c8c/contract';
import endContract from '../../snapshots/89f76cc6cfbd48930a151dcb6b8be89e921191172d5e8ac00692a5be7b237c8c/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'cr_actividad',
        column: col('categoria', 'character varying(100)', {
          codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
        }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'cr_timing',
        column: col('ubicacion', 'character varying(250)', {
          codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 250 } },
        }),
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
