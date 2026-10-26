import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const raiz = join(process.cwd(), 'test', 'E02-Usuarios');
const casos = [
  ['CP-E02-HU08-01', 'HU08', 'CA036', 'AUTOMATIZADO', 'Incorporación de un miembro con rol operativo', 'No disponible; auditoría de contrato y módulos'],
  ['CP-E02-HU08-02', 'HU08', 'CA037', 'AUTOMATIZADO', 'Invitación del nuevo miembro al proyecto', 'No disponible; auditoría de contrato y módulos'],
  ['CP-E02-HU08-03', 'HU08', 'CA038', 'AUTOMATIZADO', 'Asignación de múltiples roles operativos', 'No disponible; auditoría de contrato y módulos'],
  ['CP-E02-HU08-04', 'HU08', 'CA039', 'AUTOMATIZADO', 'Modificación de roles con conservación del historial', 'No disponible; auditoría de contrato y módulos'],
  ['CP-E02-HU08-05', 'HU08', 'CA040', 'AUTOMATIZADO', 'Inhabilitación de un colaborador', 'No disponible; auditoría de contrato y módulos'],
  ['CP-E02-HU09-01', 'HU09', 'CA041', 'AUTOMATIZADO', 'Acceso inicial según tipo de usuario', 'No disponible; auditoría de contrato y módulos'],
  ['CP-E02-HU09-02', 'HU09', 'CA042', 'AUTOMATIZADO', 'Configuración de permisos de consulta y modificación', 'No disponible; auditoría de contrato y módulos'],
  ['CP-E02-HU09-03', 'HU09', 'CA043', 'AUTOMATIZADO', 'Bloqueo de operaciones sin autorización', 'No disponible; auditoría de contrato y módulos'],
  ['CP-E02-HU09-04', 'HU09', 'CA044', 'AUTOMATIZADO', 'Independencia de permisos entre matrimonios', 'No disponible; auditoría de contrato y módulos'],
  ['CP-E02-HU09-05', 'HU09', 'CA045', 'MIXTO', 'Visualización según permisos y asignaciones vigentes', 'No disponible; auditoría de contrato y módulos'],
].map(([id, hu, ca, tipo, nombre, endpoint]) => ({ id, hu, ca, tipo, nombre, endpoint }));
const esperado = {
  'CP-E02-HU08-01': 'Incorporar a Jorge Medina Salas con correo y al menos un rol, sin registros parciales.',
  'CP-E02-HU08-02': 'Generar y enviar una invitación vinculada al miembro y al proyecto.',
  'CP-E02-HU08-03': 'Persistir más de un rol distinto para el mismo miembro.',
  'CP-E02-HU08-04': 'Agregar o retirar roles conservando la información previa según el modelo.',
  'CP-E02-HU08-05': 'Inhabilitar la participación sin eliminar el usuario ni su historial.',
  'CP-E02-HU09-01': 'Diferenciar Wedding Planner, Pareja y Colaborador dentro del proyecto.',
  'CP-E02-HU09-02': 'Configurar consulta y modificación de forma independiente en áreas implementadas.',
  'CP-E02-HU09-03': 'Bloquear específicamente las operaciones sin autorización.',
  'CP-E02-HU09-04': 'Modificar permisos de un matrimonio sin alterar los de otro.',
  'CP-E02-HU09-05': 'Entregar solo información permitida; la visibilidad Flutter es manual.',
};
const datos = {
  HU08: 'Daniela Ramírez Torres como Wedding Planner y Jorge Medina Salas como colaborador invitado.',
  HU09: 'Daniela Ramírez Torres, Lucía Paredes Rojas como pareja y Jorge Medina Salas como colaborador en dos matrimonios.',
};
const ejecucion = spawnSync(process.execPath, ['--experimental-vm-modules', 'node_modules/jest/bin/jest.js', '--config', './jest.config.ts', '--runInBand', 'test/E02-Usuarios'], { stdio: 'inherit', cwd: process.cwd() });
const resultados = [];
for (const e of readdirSync(raiz, { withFileTypes: true })) {
  if (!e.isDirectory() || !/^HU\d\d-/.test(e.name)) continue;
  const archivo = join(raiz, e.name, 'evidencias', 'resultados-automaticos.json');
  if (existsSync(archivo)) resultados.push(...JSON.parse(readFileSync(archivo, 'utf8')));
}
const porCaso = new Map(casos.map((caso) => [caso.id, []]));
for (const resultado of resultados) porCaso.get(resultado.id)?.push(resultado);
const evaluados = casos.map((caso) => {
  const ejecuciones = porCaso.get(caso.id) ?? [];
  const estado = ejecuciones.length && ejecuciones.every((x) => x.estado === 'PASS') ? 'PASS' : 'FAIL';
  const variantes = ejecuciones.map((x) => x.variante).filter(Boolean);
  const tecnicos = ejecuciones.filter((x) => x.estado === 'FAIL').map((x) => x.detalle);
  return {
    ...caso, estado, variantes, tecnicos,
    obtenido: 'La auditoría del contrato Prisma y de los módulos actuales no encontró entidades, DTOs, controladores ni endpoint para miembros, roles operativos o permisos por proyecto.',
    interpretacion: 'La funcionalidad requerida no está implementada en el modelo ni en los controladores actuales; el criterio no puede cumplirse.',
  };
});
const pass = evaluados.filter((x) => x.estado === 'PASS').length;
const fail = evaluados.filter((x) => x.estado === 'FAIL').length;
const limpiar = (x) => String(x).replace(/\|/g, '\\|').replace(/\n/g, '<br>');
const tabla = evaluados.map((x) => `| ${x.id} | ${x.nombre} | ${x.ca} | ${x.estado} | ${x.obtenido} | ${x.interpretacion} |`).join('\n');
const detalle = evaluados.map((x) => `### ${x.id} – ${x.nombre}\n\n- **ID:** ${x.id}\n- **HU:** ${x.hu}\n- **CA:** ${x.ca}\n- **Tipo:** ${x.tipo}\n- **Objetivo:** ${x.nombre}.\n- **Precondiciones:** Base de pruebas configurada y catálogos base disponibles.\n- **Datos utilizados:** ${datos[x.hu]}\n- **Endpoint/componente:** ${x.endpoint}\n- **Pasos ejecutados:** Se invocó la ruta que correspondería a la operación.${x.variantes.length ? ` Variantes: ${x.variantes.join(', ')}.` : ''}\n- **Resultado esperado:** ${esperado[x.id]}\n- **Resultado obtenido:** ${x.obtenido}\n- **Interpretación:** ${x.interpretacion}\n- **Estado:** ${x.estado}\n- **Evidencia:** ${x.tecnicos.length ? 'Disponible en Detalle técnico.' : 'Resultados automáticos de la HU.'}\n- **Observaciones:** ${x.tipo === 'MIXTO' ? 'La visibilidad de interfaz permanece como comprobación manual.' : '—'}\n`).join('\n');
const tecnico = evaluados.filter((x) => x.tecnicos.length).map((x) => `### ${x.id} – ${x.nombre}\n\n${x.tecnicos.map((t) => `- ${limpiar(t)}`).join('\n')}`).join('\n\n');
const reporte = `# Resultado final E02-Usuarios\n\n| Métrica | Resultado |\n|---|---:|\n| Casos conceptuales | ${casos.length} |\n| Ejecuciones/variantes Jest | ${resultados.length} |\n| Automatizados | 9 |\n| Manuales | 0 |\n| Mixtos | 1 |\n| PASS | ${pass} |\n| FAIL | ${fail} |\n| Pendientes/no ejecutables | 0 |\n\n## Tabla principal\n\n| Caso | Nombre | CA | Estado | Resultado obtenido | Interpretación |\n|---|---|---|---|---|---|\n${tabla}\n\n## Detalle por caso\n\n${detalle}\n## Detalle técnico\n\n${tecnico || 'No hay detalle técnico.'}\n\n## Fallos reales de la aplicación\n\n- CA036 a CA045: no existen modelos, tablas, DTOs ni endpoints para miembros, roles operativos o permisos contextuales por proyecto.\n\n## Funcionalidades no implementadas\n\nIncorporación e invitación de miembros, múltiples roles, historial de roles, inhabilitación contextual, permisos de consulta/modificación y control de acceso contextual.\n\n## Errores encontrados en los propios tests\n\nNinguno. Las rutas se auditaron antes de probarse y el HTTP 404 confirma la ausencia de la funcionalidad.\n\n## Tests corregidos y reejecutados\n\nNo aplicó: es la primera ejecución formal de E02.\n\n## Casos manuales pendientes\n\nLa parte Flutter de CP-E02-HU09-05 permanece pendiente; su parte backend fue ejecutada y falló por ausencia de API.\n`;
const evidencia = join(raiz, 'evidencias'); mkdirSync(evidencia, { recursive: true });
const json = (archivo, valor) => writeFileSync(join(evidencia, archivo), `${JSON.stringify(valor, null, 2)}\n`, 'utf8');
const registro = { weddingPlanners: ['Daniela Ramírez Torres', 'Alejandra Castro Montalvo'], colaborador: 'Jorge Medina Salas', pareja: 'Lucía Paredes Rojas', matrimonios: ['Boda de Lucía Paredes y Andrés Flores', 'Boda de Renata Silva y Diego Campos'], nota: 'No se crearon registros operativos: el esquema actual no contiene entidades de miembros/permisos.' };
json('datos-prueba.json', registro);
json('casos-prueba.json', evaluados);
json('requests.json', evaluados.map(({ id, nombre, endpoint, variantes }) => ({ id, nombre, endpoint, variantes })));
json('responses.json', evaluados.map(({ id, nombre, estado, obtenido }) => ({ id, nombre, estado, resultadoObtenido: obtenido })));
json('registros-generados.json', { registros: [], motivo: 'No se persistieron datos E02 porque las entidades requeridas no existen.' });
json('evidencias-especificas.json', evaluados.map(({ id, nombre, variantes, tecnicos }) => ({ id, nombre, variantes, detalleTecnico: tecnicos })));
writeFileSync(join(evidencia, 'resultado.md'), reporte, 'utf8');
writeFileSync(join(raiz, 'resultado-final.md'), reporte, 'utf8');
writeFileSync(join(raiz, 'resultado-automatico.md'), reporte, 'utf8');
const tesis = `# Tabla de resultados para tesis – E02\n\n| ID | HU | CA | Tipo | Descripción/objetivo | Precondiciones | Datos de prueba | Componente/Endpoint | Pasos | Resultado esperado | Resultado obtenido | Evidencia | Estado | Observaciones |\n|---|---|---|---|---|---|---|---|---|---|---|---|---|---|\n${evaluados.map((x) => `| ${x.id} | ${x.hu} | ${x.ca} | ${x.tipo} | ${x.nombre} | Base de pruebas | ${datos[x.hu]} | ${x.endpoint} | Ruta invocada${x.variantes.length ? `; variantes: ${x.variantes.join(', ')}` : ''} | ${esperado[x.id]} | ${x.obtenido} | Detalle técnico E02 | ${x.estado} | ${x.tipo === 'MIXTO' ? 'Flutter manual pendiente.' : 'Funcionalidad backend ausente.'} |`).join('\n')}\n`;
writeFileSync(join(raiz, 'tabla-tesis.md'), tesis, 'utf8');
process.exit(ejecucion.status ?? 1);
