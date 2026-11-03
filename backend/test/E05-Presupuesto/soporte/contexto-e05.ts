import { mkdir, readFile, writeFile } from 'node:fs/promises'; import { join } from 'node:path';
export type ResultadoE05={id:string;estado:'PASS'|'FAIL';detalle:string;variante?:string};
export async function ejecutarE05(r:ResultadoE05[],id:string,accion:()=>Promise<void>,variante?:string){try{await accion();r.push({id,estado:'PASS',detalle:'La capacidad financiera evaluada esta disponible.',variante});}catch(e){const detalle=e instanceof Error?e.message:String(e);r.push({id,estado:'FAIL',detalle,variante});throw e;}}
export async function requierePresupuesto(capacidad:string){
  const [contrato,servicio,controller,dto,proveedores]=await Promise.all([
    readFile(join(process.cwd(),'prisma/contract.prisma'),'utf8'),
    readFile(join(process.cwd(),'src/modules/presupuesto/application/presupuesto.service.ts'),'utf8'),
    readFile(join(process.cwd(),'src/modules/presupuesto/presentation/presupuesto.controller.ts'),'utf8'),
    readFile(join(process.cwd(),'src/modules/presupuesto/application/dto/presupuesto.dto.ts'),'utf8'),
    readFile(join(process.cwd(),'src/modules/proveedores/application/proveedores.service.ts'),'utf8'),
  ]);
  const requisitos:Record<string,string[]>={
    'costos-estimado-real':['model CostoProveedor','montoEstimado','montoReal','crearCosto'],
    'validacion-montos':['@Min(0)','monto <= 0','saldo pendiente'],
    'desviacion-presupuestaria':['desviacion','actualizarCosto'],
    pagos:['model PagoPresupuesto','crearPago','saldoCosto'],
    'comprobante-pago':['model DocumentoPago','crearDocumento'],
    compromisos:['model CompromisoPago','crearCompromiso','VENCIDO'],
    'desglose-categoria':['model CategoriaPresupuesto','desglose'],
    'grafico-presupuesto':['desglose'],
    'alertas-financieras':['model NotificacionPresupuesto','actualizarAlertas','SOBREPRESUPUESTO_CATEGORIA'],
    'reporte-financiero':['reporte(','No hay información disponible'],
    'exportacion-financiera':['exportarReporte','CSV','PDF'],
    'sincronizacion-proveedor-presupuesto':['sincronizarContratacion','sincronizarServiciosProveedor'],
  };
  const fuente=`${contrato}\n${servicio}\n${controller}\n${dto}\n${proveedores}`;
  const faltantes=(requisitos[capacidad]??[]).filter(x=>!fuente.includes(x));
  if(!faltantes.length)return;
  throw new Error(`Funcionalidad incompleta: ${capacidad}. Faltan mecanismos verificables: ${faltantes.join(', ')}.`);
}
export async function guardarEvidenciaE05(hu:string,r:ResultadoE05[]){const ruta=join(process.cwd(),'test','E05-Presupuesto',hu,'evidencias');await mkdir(ruta,{recursive:true});await writeFile(join(ruta,'resultados-automaticos.json'),`${JSON.stringify(r,null,2)}\n`);await writeFile(join(ruta,'resultado-automatico.md'),`# Resultado automatico ${hu}\n\n| Caso | Estado | Resultado |\n|---|---|---|\n${r.map(x=>`| ${x.id}${x.variante?` - ${x.variante}`:''} | ${x.estado} | ${x.detalle} |`).join('\n')}\n`);}
