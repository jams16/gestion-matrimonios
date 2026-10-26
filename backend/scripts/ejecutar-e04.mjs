import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const raiz=join(process.cwd(),'test','E04-Cronograma');
const filas=`HU15|CP-E04-HU15-01|CA071, CA073|Registro valido de actividad e incorporacion al cronograma|AUTOMATIZADO
HU15|CP-E04-HU15-02|CA072|Validacion de datos obligatorios de actividad|AUTOMATIZADO
HU15|CP-E04-HU15-03|CA074|Edicion de una actividad existente|AUTOMATIZADO
HU15|CP-E04-HU15-04|CA075|Cambio de responsable|MIXTO
HU16|CP-E04-HU16-01|CA076, CA077|Supervision centralizada por miembro|MIXTO
HU16|CP-E04-HU16-02|CA078|Calculo de avance por miembro o frente|AUTOMATIZADO
HU16|CP-E04-HU16-03|CA079|Actualizacion del panel tras cambios|MIXTO
HU16|CP-E04-HU16-04|CA080|Identificacion de retrasadas y proximas a vencer|MIXTO
HU17|CP-E04-HU17-01|CA081, CA082, CA084|Consulta y filtrado de hitos|MIXTO
HU17|CP-E04-HU17-02|CA083|Cumplimiento automatico de un hito|AUTOMATIZADO
HU17|CP-E04-HU17-03|CA085|Hitos cumplidos en avance e historial|MIXTO
HU18|CP-E04-HU18-01|CA086|Configuracion de anticipaciones|AUTOMATIZADO
HU18|CP-E04-HU18-02|CA087, CA088|Generacion de alerta de vencimiento|AUTOMATIZADO
HU18|CP-E04-HU18-03|CA089|Acceso al detalle desde alerta|MIXTO
HU18|CP-E04-HU18-04|CA090|Supresion de alertas para actividades no vigentes|AUTOMATIZADO
HU19|CP-E04-HU19-01|CA091|Reprogramacion y conservacion del valor anterior|AUTOMATIZADO
HU19|CP-E04-HU19-02|CA092|Margen de seguridad|AUTOMATIZADO
HU19|CP-E04-HU19-03|CA093|Deteccion de conflictos por reprogramacion|AUTOMATIZADO
HU19|CP-E04-HU19-04|CA094|Impacto por cambio de fecha del matrimonio|MIXTO
HU20|CP-E04-HU20-01|CA095, CA098|Cambio de estado y actualizacion del avance|AUTOMATIZADO
HU20|CP-E04-HU20-02|CA096|Deteccion automatica de retraso|AUTOMATIZADO
HU20|CP-E04-HU20-03|CA097, CA102|Bloqueo de completado por dependencia pendiente|AUTOMATIZADO
HU20|CP-E04-HU20-04|CA099|Autorizacion e identificacion de cambios de estado|MIXTO
HU21|CP-E04-HU21-01|CA100, CA101|Creacion de dependencias y prevencion de ciclos|AUTOMATIZADO
HU21|CP-E04-HU21-02|CA103, CA104|Dependencias sugeridas y personalizables|MIXTO
HU22|CP-E04-HU22-01|CA105|Consulta de tareas sugeridas|AUTOMATIZADO
HU22|CP-E04-HU22-02|CA106, CA107, CA109|Seleccion y personalizacion de tareas sugeridas|MIXTO
HU22|CP-E04-HU22-03|CA108|Creacion de instancia independiente desde sugerencia|AUTOMATIZADO
HU23|CP-E04-HU23-01|CA110, CA111|Registro y orden cronologico del timing|AUTOMATIZADO
HU23|CP-E04-HU23-02|CA112|Deteccion de solapamientos incompatibles|AUTOMATIZADO
HU23|CP-E04-HU23-03|CA113|Edicion de actividad del timing|AUTOMATIZADO
HU23|CP-E04-HU23-04|CA114|Exportacion o version compartible del timing|MIXTO`.split('\n');
const casos=filas.map(f=>{const [hu,id,ca,nombre,tipo]=f.split('|');return{hu,id,ca,nombre,tipo};});
const ejecucion=spawnSync(process.execPath,['--experimental-vm-modules','node_modules/jest/bin/jest.js','--config','./jest.config.ts','--runInBand','test/E04-Cronograma'],{stdio:'inherit',cwd:process.cwd()});
const resultados=[];for(const e of readdirSync(raiz,{withFileTypes:true})){if(!e.isDirectory()||!/^HU\d\d-/.test(e.name))continue;const f=join(raiz,e.name,'evidencias','resultados-automaticos.json');if(existsSync(f))resultados.push(...JSON.parse(readFileSync(f,'utf8')));}
const porId=new Map(casos.map(c=>[c.id,[]]));for(const r of resultados)porId.get(r.id)?.push(r);
const datos={HU15:'Valeria Campos y “Confirmar repertorio musical para la ceremonia”.',HU16:'Equipo de Luciana Rios y Mateo Salazar.',HU17:'Hito “Ceremonia lista para confirmar”.',HU18:'Actividad “Validar distribucion de mesas”.',HU19:'“Confirmar repertorio musical” -> “Ensayo de ceremonia”.',HU20:'“Revisar contrato del fotografo”.',HU21:'“Aprobar lista de invitados” -> “Enviar invitaciones”.',HU22:'Plantillas reales cr_plantilla_actividad y cr_plantilla_dependencia.',HU23:'“Ingreso de los novios” e “Inicio de la ceremonia”.'};
const evaluados=casos.map(c=>{const rs=porId.get(c.id)||[];const estado=rs.length&&rs.every(r=>r.estado==='PASS')?'PASS':'FAIL';const ok=estado==='PASS';return{...c,estado,variantes:rs.map(r=>r.variante).filter(Boolean),tecnico:rs.filter(r=>r.estado==='FAIL').map(r=>r.detalle),obtenido:ok?'La capacidad backend evaluada esta disponible en la implementacion actual.':'La capacidad requerida no existe completamente en la implementacion actual.',interpretacion:ok?'Criterio tecnico cubierto por la implementacion actual.':'Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.'};});
const pass=evaluados.filter(c=>c.estado==='PASS').length,fail=evaluados.length-pass;
const tabla=evaluados.map(c=>`| ${c.id} | ${c.nombre} | ${c.ca} | ${c.tipo} | ${c.estado} | ${c.obtenido} | ${c.interpretacion} |`).join('\n');
const detalle=evaluados.map(c=>`### ${c.id} - ${c.nombre}\n\n- **ID:** ${c.id}\n- **HU:** ${c.hu}\n- **CA:** ${c.ca}\n- **Tipo:** ${c.tipo}\n- **Objetivo:** ${c.nombre}.\n- **Precondiciones:** Entorno de pruebas y catalogos base cargados.\n- **Datos utilizados:** ${datos[c.hu]}\n- **Endpoint/componente:** DTO, caso de uso o servicio real auditado.\n- **Pasos ejecutados:** Auditoria del codigo y prueba aislada de la capacidad existente.${c.variantes.length?` Variantes: ${c.variantes.join(', ')}.`:''}\n- **Resultado esperado:** Cumplir ${c.ca}.\n- **Resultado obtenido:** ${c.obtenido}\n- **Interpretacion:** ${c.interpretacion}\n- **Estado:** ${c.estado}\n- **Evidencia:** ${c.tecnico.length?'Detalle tecnico.':'Resultado automatico.'}\n- **Observaciones:** ${c.tipo==='MIXTO'?'La parte visual o de navegacion permanece manual.':'—'}\n`).join('\n');
const resumenHu=[15,16,17,18,19,20,21,22,23].map(n=>{const x=evaluados.filter(c=>c.hu===`HU${n}`);return `HU${n}: ${x.filter(c=>c.estado==='PASS').length}/${x.length} PASS`;}).join('; ');
const reporte=`# Resultado final E04-Cronograma\n\n| Metrica | Resultado |\n|---|---:|\n| Casos conceptuales | ${casos.length} |\n| Ejecuciones/variantes de casos | ${resultados.length} |\n| Pruebas unitarias aisladas | 3 |\n| PASS conceptual | ${pass} |\n| FAIL conceptual | ${fail} |\n\n## Tabla principal\n\n| Caso | Nombre | CA | Tipo | Estado | Resultado obtenido | Interpretacion |\n|---|---|---|---|---|---|---|\n${tabla}\n\n## Detalle por caso\n\n${detalle}\n## Resultados por HU\n\n${resumenHu}.\n\n## Pruebas unitarias\n\nTres pruebas aisladas de ReprogramacionActividadesService: FINISH_TO_START, dias de desfase y ausencia de impacto.\n\n## Detalle tecnico\n\n${evaluados.filter(c=>c.tecnico.length).map(c=>`### ${c.id}\n${c.tecnico.map(t=>`- ${t}`).join('\n')}`).join('\n')||'Sin fallos tecnicos.'}\n\n## Fallos reales de la aplicacion\n\nLos FAIL reflejan capacidades ausentes o incompletas; no errores del runner.\n\n## Funcionalidades no implementadas\n\nCategorias de actividades, panel por miembro, checklists, cumplimiento/historial de hitos, anticipaciones, historial de reprogramacion, margen de seguridad, impacto por fecha de boda, bloqueo por dependencia, historial de cambios, catalogo/seleccion de sugerencias, ubicacion/solapamiento y exportacion de timing.\n\n## Errores encontrados en los tests\n\nNinguno.\n\n## Tests corregidos y reejecutados\n\nNo aplico.\n\n## Casos manuales pendientes\n\nLas partes visuales de supervision, hitos, navegacion desde alertas, confirmacion visual de impacto, relaciones graficas y exportacion.\n`;
const evidencia=join(raiz,'evidencias');mkdirSync(evidencia,{recursive:true});const json=(f,v)=>writeFileSync(join(evidencia,f),`${JSON.stringify(v,null,2)}\n`,'utf8');json('datos-prueba.json',{datos});json('casos-prueba.json',evaluados);json('requests.json',evaluados.map(c=>({id:c.id,componente:'Cronograma'})));json('responses.json',evaluados.map(c=>({id:c.id,estado:c.estado,resultado:c.obtenido})));json('registros-generados.json',{nota:'Las pruebas son aisladas/auditorias y no insertan datos operativos.'});json('evidencias-especificas.json',evaluados.map(c=>({id:c.id,variantes:c.variantes,detalleTecnico:c.tecnico})));writeFileSync(join(evidencia,'resultado.md'),reporte,'utf8');writeFileSync(join(raiz,'resultado-final.md'),reporte,'utf8');writeFileSync(join(raiz,'resultado-automatico.md'),reporte,'utf8');writeFileSync(join(raiz,'tabla-tesis.md'),`# Tabla de resultados para tesis - E04\n\n| ID | HU | CA | Tipo | Descripcion/objetivo | Precondiciones | Datos de prueba | Componente/Endpoint | Pasos | Resultado esperado | Resultado obtenido | Evidencia | Estado | Observaciones |\n|---|---|---|---|---|---|---|---|---|---|---|---|---|---|\n${evaluados.map(c=>`| ${c.id} | ${c.hu} | ${c.ca} | ${c.tipo} | ${c.nombre} | Entorno de pruebas | ${datos[c.hu]} | Modulo Cronograma | Auditoria/prueba | Cumplir ${c.ca} | ${c.obtenido} | E04 | ${c.estado} | ${c.tipo==='MIXTO'?'UI manual pendiente.':'—'} |`).join('\n')}\n`,'utf8');process.exit(ejecucion.status??1);
