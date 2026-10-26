import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

export type ResultadoE03 = { id: string; estado: 'PASS' | 'FAIL'; detalle: string; variante?: string };
export async function ejecutarE03(resultados: ResultadoE03[], id: string, accion: () => Promise<void>, variante?: string) {
  try { await accion(); resultados.push({ id, estado: 'PASS', detalle: 'La capacidad evaluada está disponible en la implementación actual.', variante }); }
  catch (e) { const detalle = e instanceof Error ? e.message : String(e); resultados.push({ id, estado: 'FAIL', detalle, variante }); throw e; }
}
export async function requiereCapacidad(capacidad: string) {
  const cronograma = await readFile(join(process.cwd(), 'src/modules/cronograma/application/services/cronograma-date.service.ts'), 'utf8');
  const contrato = await readFile(join(process.cwd(), 'prisma/contract.prisma'), 'utf8');
  const disponibles = ['cronograma-plantilla', 'fases-proyecto', 'cronograma-editable'];
  if (disponibles.includes(capacidad) && cronograma.includes('calcularFechaObjetivo') && contrato.includes('model FaseProyecto')) return;
  throw new Error(`Funcionalidad no implementada: ${capacidad}. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.`);
}
export async function guardarEvidenciaE03(hu: string, resultados: ResultadoE03[]) {
  const ruta = join(process.cwd(), 'test', 'E03-Proyecto', hu, 'evidencias'); await mkdir(ruta, { recursive: true });
  await writeFile(join(ruta, 'resultados-automaticos.json'), `${JSON.stringify(resultados, null, 2)}\n`);
  await writeFile(join(ruta, 'resultado-automatico.md'), `# Resultado automático ${hu}\n\n| Caso | Estado | Resultado |\n|---|---|---|\n${resultados.map((r) => `| ${r.id}${r.variante ? ` – ${r.variante}` : ''} | ${r.estado} | ${r.detalle} |`).join('\n')}\n`);
}
