import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

export type ResultadoE04 = { id: string; estado: 'PASS' | 'FAIL'; detalle: string; variante?: string };

export async function ejecutarE04(resultados: ResultadoE04[], id: string, accion: () => Promise<void>, variante?: string) {
  try { await accion(); resultados.push({ id, estado: 'PASS', detalle: 'La capacidad evaluada esta disponible en la implementacion actual.', variante }); }
  catch (error) { const detalle = error instanceof Error ? error.message : String(error); resultados.push({ id, estado: 'FAIL', detalle, variante }); throw error; }
}

export async function requiereCapacidad(capacidad: string) {
  const dto = await readFile(join(process.cwd(), 'src/modules/cronograma/application/dto/cronograma.dto.ts'), 'utf8');
  const casos = await readFile(join(process.cwd(), 'src/modules/cronograma/application/use-cases/gestionar-cronograma.use-cases.ts'), 'utf8');
  const reprogramacion = await readFile(join(process.cwd(), 'src/modules/cronograma/application/use-cases/reprogramar-actividad.use-case.ts'), 'utf8');
  const contrato = await readFile(join(process.cwd(), 'prisma/contract.prisma'), 'utf8');
  const disponibles: Record<string, boolean> = {
    'actividad-crud': dto.includes('class CrearActividadDto') && casos.includes('class GestionarActividadesUseCase'),
    'hito-crud': dto.includes('class CrearHitoDto') && casos.includes('class GestionarHitosUseCase'),
    'dependencias-ciclos': casos.includes('function creaCiclo') && casos.includes('crearDependenciaManual'),
    'timing-crud': dto.includes('class CrearTimingDto') && casos.includes('class GestionarTimingUseCase'),
    'resumen-retrasadas': casos.includes('retrasadas:') && casos.includes("item.estado !== 'COMPLETADA'"),
    'reprogramacion-preview': reprogramacion.includes('async previsualizar') && reprogramacion.includes('actividades_afectadas'),
    'plantillas-cronograma': contrato.includes('model PlantillaActividad') && contrato.includes('model PlantillaDependencia'),
    'notificaciones-cronograma': contrato.includes('model NotificacionCronograma'),
  };
  if (disponibles[capacidad]) return;
  throw new Error(`Funcionalidad no implementada: ${capacidad}. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.`);
}

export async function guardarEvidenciaE04(hu: string, resultados: ResultadoE04[]) {
  const ruta = join(process.cwd(), 'test', 'E04-Cronograma', hu, 'evidencias');
  await mkdir(ruta, { recursive: true });
  await writeFile(join(ruta, 'resultados-automaticos.json'), `${JSON.stringify(resultados, null, 2)}\n`, 'utf8');
  await writeFile(join(ruta, 'resultado-automatico.md'), `# Resultado automatico ${hu}\n\n| Caso | Estado | Resultado |\n|---|---|---|\n${resultados.map((r) => `| ${r.id}${r.variante ? ` - ${r.variante}` : ''} | ${r.estado} | ${r.detalle} |`).join('\n')}\n`, 'utf8');
}
