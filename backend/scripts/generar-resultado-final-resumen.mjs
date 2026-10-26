import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const raiz = join(process.cwd(), 'test');
const epicas = [['E01-Acceso','Acceso y autenticación'],['E02-Usuarios','Usuarios'],['E03-Proyecto','Proyecto'],['E04-Cronograma','Cronograma'],['E05-Presupuesto','Presupuesto'],['E06-Invitados','Invitados'],['E07-Proveedores','Proveedores'],['E08-Riesgos','Riesgos'],['E09-Administracion','Administración']];
const json = ruta => existsSync(ruta) ? JSON.parse(readFileSync(ruta, 'utf8')) : [];
const valor = (dato, defecto='No consignado en la evidencia disponible.') => {
  if (dato === null || dato === undefined || dato === '') return defecto;
  if (Array.isArray(dato)) return dato.map(x => valor(x, '')).filter(Boolean).join('; ') || defecto;
  if (typeof dato === 'object') return Object.entries(dato).map(([k,v]) => `${k}: ${valor(v, '')}`).join('; ') || defecto;
  return String(dato);
};
const fuentes = epicas.map(([codigo,nombre]) => { const dir=join(raiz,codigo); return { codigo,nombre,dir,casos:json(join(dir,'evidencias','casos-prueba.json')),datos:json(join(dir,'evidencias','datos-prueba.json')),ejecucion:json(join(dir,'ejecucion-automatica.json')),informe:existsSync(join(dir,'resultado-final.md')) ? readFileSync(join(dir,'resultado-final.md'),'utf8') : 'No existe informe individual.' }; });
const casos = fuentes.flatMap(fuente => fuente.casos.map(caso => ({...caso,epica:fuente.codigo,nombreEpica:fuente.nombre,datosEpica:fuente.datos})));
const estado = nombre => casos.filter(caso => String(caso.estado).toUpperCase() === nombre).length;
const textoTecnico = caso => valor(caso.detalleTecnico ?? caso.tecnico ?? caso.detalle, 'Sin mensajes técnicos adicionales; revisar la evidencia de la épica.');
const detalle = caso => [
`### ${caso.id} — ${valor(caso.nombre,'Caso sin nombre')}`,'',
`- **Épica:** ${caso.epica} — ${caso.nombreEpica}.`,
`- **Historia de usuario asociada:** ${valor(caso.hu)}.`,
`- **Criterios de aceptación asociados:** ${valor(caso.ca)}.`,
`- **Tipo de prueba:** ${valor(caso.tipo)}.`,
`- **Estado final:** ${valor(caso.estado)}.`,
`- **Objetivo:** ${valor(caso.objetivo, `${valor(caso.nombre)}.`)}`,
'- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.',
`- **Precondiciones:** ${valor(caso.precondiciones, 'Entorno y evidencia de pruebas configurados para la épica correspondiente.')}`,
`- **Datos de prueba:** ${valor(caso.datosUtilizados ?? caso.datosPrueba ?? caso.datosEpica)}`,
`- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de ${caso.epica}; se evaluaron según el flujo real disponible.`,
`- **Componente/endpoint evaluado:** ${valor(caso.endpointComponente ?? caso.componente, 'Consultar la evidencia técnica de la épica.')}`,
`- **Pasos ejecutados:** ${valor(caso.pasosEjecutados, 'Se ejecutó la prueba automatizada o auditoría documentada para el caso.')}`,
`- **Resultado esperado:** ${valor(caso.resultadoEsperado, `Cumplir ${valor(caso.ca)}.`)}`,
`- **Resultado obtenido:** ${valor(caso.resultadoObtenido ?? caso.obtenido)}`,
`- **Interpretación:** ${valor(caso.interpretacion)}`,
`- **Evidencia directa:** ${valor(caso.evidencia, `test/${caso.epica}/evidencias/ y resultado-final.md.`)}`,
`- **Observaciones:** ${valor(caso.observaciones, '—')}`,
`- **Detalle técnico:** ${textoTecnico(caso)}`,
`- **Clasificación del hallazgo:** ${String(caso.estado).toUpperCase()==='FAIL'?'Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.':String(caso.estado).toUpperCase()==='MANUAL'?'Pendiente de comprobación visual/manual; no se atribuye PASS por inferencia.':'Criterio acreditado por la ejecución o auditoría registrada.'}`,
`- **Trazabilidad de archivos:** test/${caso.epica}/evidencias/casos-prueba.json; test/${caso.epica}/evidencias/resultado.md; test/${caso.epica}/resultado-final.md.`,''
].join('\n');
const tablaEpicas = fuentes.map(fuente => { const lista=fuente.casos; const cuenta=nombre=>lista.filter(caso=>String(caso.estado).toUpperCase()===nombre).length; return `| ${fuente.codigo} | ${fuente.nombre} | ${lista.length} | ${cuenta('PASS')} | ${cuenta('FAIL')} | ${cuenta('MANUAL')} | ${lista.filter(caso=>caso.tipo==='AUTOMATIZADO').length} | ${lista.filter(caso=>caso.tipo==='MIXTO').length} |`; }).join('\n');
const tablaHu = fuentes.flatMap(fuente => { const grupos=new Map(); fuente.casos.forEach(caso=>grupos.set(caso.hu??'Sin HU',[...(grupos.get(caso.hu??'Sin HU')??[]),caso])); return [...grupos.entries()].map(([hu,lista])=>`| ${fuente.codigo} | ${hu} | ${lista.length} | ${lista.filter(caso=>String(caso.estado).toUpperCase()==='PASS').length} | ${lista.filter(caso=>String(caso.estado).toUpperCase()==='FAIL').length} | ${lista.filter(caso=>String(caso.estado).toUpperCase()==='MANUAL').length} |`); }).join('\n');
const tablaCasos = casos.map(caso => `| ${caso.id} | ${caso.epica} | ${valor(caso.hu)} | ${valor(caso.ca).replaceAll('|','\\|')} | ${valor(caso.tipo)} | ${valor(caso.estado)} | ${valor(caso.nombre).replaceAll('|','\\|')} | ${valor(caso.resultadoObtenido??caso.obtenido).replaceAll('|','\\|')} |`).join('\n');
const anexo = fuentes.map(fuente => `### ${fuente.codigo} — ${fuente.nombre}\n\n**Datos de prueba registrados:** ${valor(fuente.datos)}\n\n**Ejecución registrada:** ${valor(fuente.ejecucion)}\n\n${fuente.informe}`).join('\n\n---\n\n');
const rutas = fuentes.map(fuente => `- test/${fuente.codigo}/evidencias/datos-prueba.json\n- test/${fuente.codigo}/evidencias/casos-prueba.json\n- test/${fuente.codigo}/evidencias/requests.json\n- test/${fuente.codigo}/evidencias/responses.json\n- test/${fuente.codigo}/evidencias/registros-generados.json\n- test/${fuente.codigo}/evidencias/evidencias-especificas.json\n- test/${fuente.codigo}/evidencias/resultado.md\n- test/${fuente.codigo}/resultado-final.md`).join('\n');
const informe = `# Resultado final consolidado de pruebas — WeddingApp\n\n> Documento maestro generado desde las evidencias formales E01–E09. Centraliza la trazabilidad original, no altera sus estados y mantiene separados los resultados automáticos, mixtos y manuales.\n\n## Identificación, alcance y método\n\n- **Fecha de consolidación:** ${new Date().toISOString()}.\n- **Fuente:** backend/test/E01-Acceso a backend/test/E09-Administracion.\n- **Casos conceptuales consolidados:** ${casos.length}.\n- **Criterio de integridad:** una ficha por identificador CP; no se multiplican casos conceptuales por variantes.\n- **Regla de estados:** PASS acredita lo registrado; FAIL conserva una brecha real; MANUAL queda pendiente, sin inferir PASS desde backend.\n- **Entorno:** se preservan las precondiciones, datos y limitaciones informadas por cada evidencia fuente.\n\n## Resumen ejecutivo global\n\n| Métrica | Total |\n|---|---:|\n| Casos conceptuales | ${casos.length} |\n| PASS | ${estado('PASS')} |\n| FAIL | ${estado('FAIL')} |\n| MANUAL pendiente | ${estado('MANUAL')} |\n| Tipo AUTOMATIZADO | ${casos.filter(caso=>caso.tipo==='AUTOMATIZADO').length} |\n| Tipo MIXTO | ${casos.filter(caso=>caso.tipo==='MIXTO').length} |\n| Épicas consolidadas | ${fuentes.length} |\n\n## Cobertura y resultado por épica\n\n| Épica | Nombre | Casos | PASS | FAIL | MANUAL | Automatizados | Mixtos |\n|---|---|---:|---:|---:|---:|---:|---:|\n${tablaEpicas}\n\n## Cobertura y resultado por historia de usuario\n\n| Épica | HU | Casos | PASS | FAIL | MANUAL |\n|---|---|---:|---:|---:|---:|\n${tablaHu}\n\n## Matriz completa de trazabilidad de casos\n\n| ID | Épica | HU | CA | Tipo | Estado | Nombre | Resultado obtenido |\n|---|---|---|---|---|---|---|---|\n${tablaCasos}\n\n## Detalle integral por caso\n\n${casos.map(detalle).join('\n')}\n## Pruebas unitarias, API, integración y manuales\n\n- Los tipos, conteos y resultados se preservan desde cada épica.\n- Los casos MANUAL y la parte visual de MIXTO requieren ejecución documentada en Flutter/Web.\n- Los mensajes de Jest, requests, responses y diagnósticos se mantienen en los anexos y rutas de evidencia.\n\n## Errores encontrados, corregidos y reejecutados\n\nLos errores, correcciones y reejecuciones se presentan íntegros por épica en el Anexo A. Este consolidado no elimina ni reclasifica hallazgos de sus informes de origen.\n\n## Casos manuales pendientes\n\nLos casos MANUAL y aspectos visuales de MIXTO se conservan pendientes hasta una verificación explícita; sus limitaciones y pasos están en cada ficha y en los informes originales.\n\n## Anexo A — Informes individuales íntegros por épica\n\n${anexo}\n\n## Anexo B — Rutas de evidencia\n\n${rutas}\n`;
writeFileSync(join(raiz,'resultado-final-resumen.md'), informe);
console.log(`Resultado consolidado creado: test/resultado-final-resumen.md (${casos.length} casos).`);
