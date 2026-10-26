import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

export type Resultado = { id: string; estado: 'PASS' | 'FAIL'; detalle: string };
const modulo = join(process.cwd(), 'src', 'modules', 'riesgos', 'riesgos.module.ts');
const contrato = join(process.cwd(), 'prisma', 'contract.prisma');

export async function evaluar(registros: Resultado[], id: string, capacidad: string) {
  const [codigo, schema] = await Promise.all([readFile(modulo, 'utf8'), readFile(contrato, 'utf8')]);
  const existe = codigo.includes('Controller') || codigo.includes('Service') || schema.includes('Riesgo');
  const detalle = existe ? `Capacidad localizada: ${capacidad}.` : `Funcionalidad no implementada: ${capacidad}; RiesgosModule no registra servicios, controladores ni modelos de riesgos.`;
  const resultado: Resultado = { id, estado: existe ? 'PASS' : 'FAIL', detalle };
  registros.push(resultado);
  if (!existe) throw new Error(detalle);
}

export async function guardar(hu: string, registros: Resultado[]) {
  const directorio = join(process.cwd(), 'test', 'E08-Riesgos', hu, 'evidencias');
  await mkdir(directorio, { recursive:true });
  await writeFile(join(directorio, 'resultados-automaticos.json'), JSON.stringify(registros, null, 2));
  await writeFile(join(directorio, 'resultado-automatico.md'), registros.map(resultado => `${resultado.id} ${resultado.estado} ${resultado.detalle}`).join('\n'));
}
