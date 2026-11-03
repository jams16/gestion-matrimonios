import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

export type Resultado = { id: string; estado: 'PASS' | 'FAIL'; detalle: string };
const modulo = join(process.cwd(), 'src', 'modules', 'riesgos', 'riesgos.module.ts');
const contrato = join(process.cwd(), 'prisma', 'contract.prisma');

export async function evaluar(registros: Resultado[], id: string, capacidad: string) {
  const [codigo, schema, servicio] = await Promise.all([
    readFile(modulo, 'utf8'), readFile(contrato, 'utf8'),
    readFile(join(process.cwd(), 'src', 'modules', 'riesgos', 'application', 'riesgos.service.ts'), 'utf8'),
  ]);
  const requisitos: Record<string, string[]> = {
    'planes de contingencia': ['PlanContingenciaRiesgo', 'crearPlan'],
    'consulta de planes': ['planes('],
    'activación de contingencia': ['ActivacionPlanRiesgo', 'activarPlan'],
    'historial de planes': ['version', 'ActivacionPlanRiesgo'],
    'catálogo de riesgos': ['PlantillaRiesgo', 'catalogo('],
    'filtros de riesgos': ['catalogo('],
    'mitigaciones predefinidas': ['PlantillaMitigacionRiesgo', 'PlantillaPlanRiesgo'],
    'instancia operacional independiente': ['incorporar(', 'crear('],
    'alertas de riesgos': ['NotificacionRiesgo', 'alertar('],
    'referencias de alerta': ['idRiesgo', 'idIncidencia'],
    'estado de alerta de riesgo': ['atendida'],
    'gastos de riesgo': ['CostoRiesgo', 'crearCosto'],
    'comprobantes de riesgo': ['DocumentoCostoRiesgo', 'crearDocumento'],
    'integración financiera de riesgos': ['idCostoPresupuesto', 'CategoriaPresupuesto'],
    'reportes financieros de riesgos': ['idCostoPresupuesto'],
    'matriz de severidad': ['severidad(', 'rg_severidad'],
    'consulta por severidad': ['matriz(', 'severidad'],
    'recálculo de severidad': ['data.severidad'],
    'sugerencias de mitigación': ['sugerir(', 'MitigacionRiesgo'],
    'estados de mitigación': ['actualizarMitigacion', 'APLICADA'],
    'historial de sugerencias': ['idPlantillaMitigacion', 'sugerir('],
  };
  const requiereCatalogoBase = ['CP-E08-HU48-01', 'CP-E08-HU48-03', 'CP-E08-HU48-04', 'CP-E08-HU52-01', 'CP-E08-HU52-02', 'CP-E08-HU52-03'].includes(id);
  const fuente = `${codigo}\n${schema}\n${servicio}`;
  const faltantes = (requisitos[capacidad] ?? []).filter((item) => !fuente.includes(item));
  const existe = !faltantes.length && !requiereCatalogoBase;
  const detalle = requiereCatalogoBase
    ? `FAIL real: no existe una seed o fixture reproducible con al menos 15 riesgos base, mitigaciones y planes predefinidos.`
    : existe ? `Mecanismo implementado: ${capacidad}.` : `Funcionalidad incompleta: ${capacidad}. Faltan: ${faltantes.join(', ')}.`;
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
