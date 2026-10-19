#!/usr/bin/env -S node
import { readFileSync } from 'node:fs';

import type { Contract as Start } from '../../snapshots/1ff57f93f03da3985a78b7eef6739d2c5ce6aa1270f687f755a496a38289dde1/contract';
import startContract from '../../snapshots/1ff57f93f03da3985a78b7eef6739d2c5ce6aa1270f687f755a496a38289dde1/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/f45bb72600f96380a16d9dee58c79e85e97cec1b1d8fb7e1cb4fa506b8f91e06/contract';
import endContract from '../../snapshots/f45bb72600f96380a16d9dee58c79e85e97cec1b1d8fb7e1cb4fa506b8f91e06/contract.json' with { type: 'json' };
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
      id: `raw.replace-catalogos-fases-y-plantillas.${index + 1}`,
      label: `Execute migration statement ${index + 1}`,
      operationClass: 'destructive',
      target: {
        id: 'postgres',
        details: { schema: 'public', objectType: 'migration', name: 'replace_ceremonia_fase_plantillas' },
      },
      precheck: [],
      execute: [{ description: `execute statement ${index + 1}`, sql: `${sql};`, params: [] }],
      postcheck: [],
    }));
  }
}

MigrationCLI.run(import.meta.url, M);
