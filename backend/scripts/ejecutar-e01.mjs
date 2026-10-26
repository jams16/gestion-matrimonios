import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const raiz = join(process.cwd(), 'test', 'E01-Acceso');
const jest = spawnSync(
  process.execPath,
  ['--experimental-vm-modules', 'node_modules/jest/bin/jest.js', '--config', './jest.config.ts', '--runInBand', 'test/E01-Acceso'],
  { stdio: 'inherit', cwd: process.cwd() },
);
const resultados = [];
for (const entrada of readdirSync(raiz, { withFileTypes: true })) {
  if (!entrada.isDirectory() || !/^HU\d\d-/.test(entrada.name)) continue;
  const archivo = join(raiz, entrada.name, 'evidencias', 'resultados-automaticos.json');
  if (existsSync(archivo)) resultados.push(...JSON.parse(readFileSync(archivo, 'utf8')));
}
const pass = resultados.filter((r) => r.estado === 'PASS').length;
const fail = resultados.filter((r) => r.estado === 'FAIL').length;
const contenido = `# Resultado final E01-Acceso\n\n| Métrica | Resultado |\n|---|---:|\n| Casos automáticos ejecutados | ${resultados.length} |\n| PASS | ${pass} |\n| FAIL | ${fail} |\n| Resultado global | ${jest.status === 0 && fail === 0 ? 'PASS' : 'FAIL'} |\n\n## Resultados por caso\n\n| Caso | Estado | Resultado obtenido |\n|---|---|---|\n${resultados.map((r) => `| ${r.id} | ${r.estado} | ${r.detalle.replace(/\|/g, '\\|')} |`).join('\n')}\n`;
writeFileSync(join(raiz, 'resultado-final.md'), contenido, 'utf8');
process.exit(jest.status ?? 1);
