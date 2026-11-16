#!/usr/bin/env -S node
import { readFileSync } from 'node:fs';

import type { Contract as Start } from '../../snapshots/34caed996da6433e1e4abeb70e489d15a6691b10c934d439e56edc12fc6183e5/contract';
import startContract from '../../snapshots/34caed996da6433e1e4abeb70e489d15a6691b10c934d439e56edc12fc6183e5/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/4dbdb1ff7d66f5b07f7d54ef8970368d4f1223bd6015f10b1818b3a71fc4b510/contract';
import endContract from '../../snapshots/4dbdb1ff7d66f5b07f7d54ef8970368d4f1223bd6015f10b1818b3a71fc4b510/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, rawSql } from '@prisma/orm-postgres/migration';

const statements = readFileSync(new URL('./migration.sql', import.meta.url), 'utf8')
  .split(/;\s*(?:\r?\n|$)/)
  .map((statement) => statement.trim())
  .filter(Boolean);

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return statements.map((sql, index) => rawSql({
      id: `raw.alter-gp-buena-practica-catalogo.${index + 1}`,
      label: `Adapt gp_buena_practica catalog statement ${index + 1}`,
      operationClass: 'destructive',
      target: { id: 'postgres', details: { schema: 'public', objectType: 'migration', name: 'alter_gp_buena_practica_catalogo' } },
      precheck: [],
      execute: [{ description: `execute statement ${index + 1}`, sql: `${sql};`, params: [] }],
      postcheck: [],
    }));
  }
}

MigrationCLI.run(import.meta.url, M);
