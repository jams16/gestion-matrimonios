#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/4dbdb1ff7d66f5b07f7d54ef8970368d4f1223bd6015f10b1818b3a71fc4b510/contract';
import startContract from '../../snapshots/4dbdb1ff7d66f5b07f7d54ef8970368d4f1223bd6015f10b1818b3a71fc4b510/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/7812dac0ea90013ba36bf72a60eed3ee3644e08293753b570b2d545cbbacc8e1/contract';
import endContract from '../../snapshots/7812dac0ea90013ba36bf72a60eed3ee3644e08293753b570b2d545cbbacc8e1/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, lit } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'gp_proyecto',
        column: col('moneda', 'text', {
          notNull: true,
          default: lit('SOLES'),
          codecRef: { codecId: 'pg/text@1' },
        }),
      }),
      this.addCheckConstraint({
        schema: 'public',
        table: 'gp_proyecto',
        constraint: 'gp_proyecto_moneda_check_ecffa0f2',
        expression: "\"moneda\" IN ('SOLES', 'DOLARES')",
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
