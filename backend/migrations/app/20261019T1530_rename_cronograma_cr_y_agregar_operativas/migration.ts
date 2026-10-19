#!/usr/bin/env -S node
import { readFileSync } from 'node:fs';

import type { Contract as Start } from '../../snapshots/f45bb72600f96380a16d9dee58c79e85e97cec1b1d8fb7e1cb4fa506b8f91e06/contract';
import startContract from '../../snapshots/f45bb72600f96380a16d9dee58c79e85e97cec1b1d8fb7e1cb4fa506b8f91e06/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/0f018d43e41118bb6f1b804a8f6bf95dc88251e92f69a2f1d127ea65aa8a2471/contract';
import endContract from '../../snapshots/0f018d43e41118bb6f1b804a8f6bf95dc88251e92f69a2f1d127ea65aa8a2471/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, rawSql } from '@prisma/orm-postgres/migration';

const statements = readFileSync(new URL('./migration.sql', import.meta.url), 'utf8')
  .split(/;\s*(?:\r?\n|$)/)
  .map((statement) => statement.trim())
  .filter((statement) => statement.length > 0);

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return statements.map((sql, index) => rawSql({
      id: `raw.rename-cronograma-y-operativas.${index + 1}`,
      label: `Execute cronograma migration statement ${index + 1}`,
      operationClass: 'destructive',
      target: {
        id: 'postgres',
        details: { schema: 'public', objectType: 'migration', name: 'rename_cronograma_cr_y_agregar_operativas' },
      },
      precheck: [],
      execute: [{ description: `execute statement ${index + 1}`, sql: `${sql};`, params: [] }],
      postcheck: [],
    }));
  }
}

MigrationCLI.run(import.meta.url, M);
