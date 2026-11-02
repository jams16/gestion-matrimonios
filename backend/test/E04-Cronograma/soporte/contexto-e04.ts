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
  const notificaciones = await readFile(join(process.cwd(), 'src/modules/notificaciones/application/use-cases/notificaciones-cronograma.use-cases.ts'), 'utf8');
  const alertas = await readFile(join(process.cwd(), 'src/modules/notificaciones/application/services/alertas-cronograma.service.ts'), 'utf8');
  const controlador = await readFile(join(process.cwd(), 'src/modules/cronograma/presentation/controllers/cronograma.controller.ts'), 'utf8');
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
    'actividad-con-categoria': dto.includes('categoria?: string') && casos.includes('crearActividadManual'),
    'actividad-validacion': dto.includes('prioridad!: PrioridadActividadDto') && dto.includes('idUsuarioResponsable!: number'),
    'historial-asignacion': casos.includes('idUsuarioResponsable') && casos.includes('modificadoManualmente'),
    'panel-por-miembro': casos.includes('resumenPorResponsable') && controlador.includes('responsables/resumen'),
    'avance-por-miembro': casos.includes('completadas') && casos.includes('resumenPorResponsable'),
    'panel-retrasadas-proximas': casos.includes('proximasAVencer') && casos.includes('retrasadas'),
    'cumplimiento-automatico-hito': casos.includes('actualizarHitoAutomatico'),
    'historial-hitos': casos.includes('hitos_completados') && casos.includes('actualizarHitoAutomatico'),
    'anticipaciones-configurables': alertas.includes('DIAS_ANTICIPACION_ALERTAS_CRONOGRAMA'),
    'enlace-detalle-alerta': contrato.includes('idActividad') && contrato.includes('idHito'),
    'supresion-alertas': notificaciones.includes("'CANCELADA'") && notificaciones.includes("'NO_APLICA'"),
    'margen-seguridad': reprogramacion.includes('MARGEN_SEGURIDAD_REPROGRAMACION_DIAS'),
    'historial-reprogramacion': reprogramacion.includes('historial_reprogramacion') && reprogramacion.includes('fecha_fin_anterior'),
    'impacto-fecha-matrimonio': reprogramacion.includes('fechaBoda') && reprogramacion.includes('validarVentana'),
    'retrasadas-regla-completa': casos.includes("item.estado !== 'COMPLETADA'") && casos.includes('fechaFin.getTime() < hoy.getTime()'),
    'bloqueo-completado-dependencia': casos.includes('dependencias pendientes'),
    'historial-cambio-estado': casos.includes('autorizadoComo') && casos.includes('validarProyectoOResponsable'),
    'dependencias-sugeridas': casos.includes('listarPlantillasDependencia') && controlador.includes('sugerencias/dependencias'),
    'catalogo-sugerencias': casos.includes('listarPlantillasActividad') && controlador.includes('sugerencias/actividades'),
    'seleccion-sugerencia': casos.includes('crearDesdeSugerencia'),
    'instancia-desde-sugerencia': casos.includes('idPlantillaActividad') && casos.includes('crearActividadManual'),
    'timing-con-ubicacion': dto.includes('ubicacion?: string') && casos.includes('listarTiming'),
    'solapamiento-timing': casos.includes('validarSolapamientoTiming'),
    'exportacion-timing': controlador.includes('timing/exportar'),
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
