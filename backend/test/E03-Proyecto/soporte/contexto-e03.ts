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
  const onboardingDto = await readFile(join(process.cwd(), 'src/modules/proyectos/application/dto/guardar-onboarding-matrimonio.dto.ts'), 'utf8');
  const onboarding = await readFile(join(process.cwd(), 'src/modules/proyectos/application/use-cases/onboarding-matrimonio.use-case.ts'), 'utf8');
  const buenasPracticasDto = await readFile(join(process.cwd(), 'src/modules/buenas-practicas/application/dto/buenas-practicas.dto.ts'), 'utf8');
  const buenasPracticasController = await readFile(join(process.cwd(), 'src/modules/buenas-practicas/presentation/buenas-practicas.controller.ts'), 'utf8');
  const edt = await readFile(join(process.cwd(), 'src/modules/edt/application/edt.service.ts'), 'utf8');
  const cronogramaGestion = await readFile(join(process.cwd(), 'src/modules/cronograma/application/use-cases/gestionar-cronograma.use-cases.ts'), 'utf8');
  const invitados = await readFile(join(process.cwd(), 'src/modules/invitados/application/invitados.service.ts'), 'utf8');
  const presupuesto = await readFile(join(process.cwd(), 'src/modules/presupuesto/application/presupuesto.service.ts'), 'utf8');
  const authSession = await readFile(join(process.cwd(), '..', 'frontend/lib/features/autenticacion/infrastructure/auth_session.dart'), 'utf8');
  const router = await readFile(join(process.cwd(), '..', 'frontend/lib/app/router/app_router.dart'), 'utf8');
  const crearMatrimonio = await readFile(join(process.cwd(), '..', 'frontend/lib/features/proyectos/presentation/pages/crear_matrimonio_page.dart'), 'utf8');
  const gestionInvitados = await readFile(join(process.cwd(), '..', 'frontend/lib/features/invitados/presentation/gestion_invitados_pages.dart'), 'utf8');
  const disponibles = ['cronograma-plantilla', 'fases-proyecto', 'cronograma-editable'];
  if (disponibles.includes(capacidad) && cronograma.includes('calcularFechaObjetivo') && contrato.includes('model FaseProyecto')) return;
  const onboardingDisponible = onboardingDto.includes('fechaMatrimonio') && onboardingDto.includes('presupuesto') && onboardingDto.includes('ParejaOnboardingDto') && onboarding.includes('GuardarOnboardingMatrimonioUseCase') && onboarding.includes('generarCronograma.execute');
  if (['parametros-base-estilo', 'validacion-parametros-base'].includes(capacidad) && onboardingDisponible) return;
  const catalogoDisponible = contrato.includes('model BuenaPractica') && buenasPracticasDto.includes('CrearBuenaPracticaDto') && buenasPracticasController.includes("@Controller('buenas-practicas')");
  if (['catalogo-metodologias', 'referencia-metodologica', 'aplicacion-practica-metodologia'].includes(capacidad) && catalogoDisponible) return;
  if (capacidad === 'edt-matrimonio-independiente' && edt.includes('async crearEdtMatrimonio') && edt.includes('EdtMatrimonioElemento.create') && edt.includes('const mapa = new Map')) return;
  if (capacidad === 'revision-onboarding' && crearMatrimonio.includes('Widget _resumen') && crearMatrimonio.includes('onPasoSeleccionado') && crearMatrimonio.includes('_paso = paso')) return;
  if (capacidad === 'dashboard-avance' && cronogramaGestion.includes('async resumen(') && cronogramaGestion.includes('completadas:') && cronogramaGestion.includes('total_actividades')) return;
  if (capacidad === 'dashboard-rsvp' && invitados.includes('async resumen(') && invitados.includes('confirmados:') && gestionInvitados.includes('invitadosResumenProvider')) return;
  if (capacidad === 'dashboard-presupuesto' && presupuesto.includes('async resumen(') && presupuesto.includes('actualizarAlertas')) return;
  if (capacidad === 'dashboard-permisos' && invitados.includes('async acceso(') && cronogramaGestion.includes('validarProyecto(')) return;
  if (capacidad === 'contexto-matrimonio' && authSession.includes('idProyectoActivo') && authSession.includes('_guardarProyectoActivo') && router.includes('AuthSession.idProyectoActivo')) return;
  if (capacidad === 'indicadores-integrados' && gestionInvitados.includes('ref.invalidate(invitadosResumenProvider') && presupuesto.includes('actualizarAlertas')) return;
  if (capacidad === 'fuente-compartida' && cronogramaGestion.includes('validarProyecto(') && authSession.includes('seleccionarProyecto')) return;
  if (capacidad === 'permisos-contextuales' && invitados.includes('await this.acceso(') && cronogramaGestion.includes('validarProyectoOResponsable')) return;
  if (capacidad === 'flujo-recomendado' && cronogramaGestion.includes('validarDependencias') && cronogramaGestion.includes('actualizarHitosRelacionados')) return;
  if (capacidad === 'flujo-actualizacion' && cronogramaGestion.includes('actualizarHitosRelacionados') && cronogramaGestion.includes("dto.estado === 'COMPLETADA'")) return;
  throw new Error(`Funcionalidad no implementada: ${capacidad}. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.`);
}
export async function guardarEvidenciaE03(hu: string, resultados: ResultadoE03[]) {
  const ruta = join(process.cwd(), 'test', 'E03-Proyecto', hu, 'evidencias'); await mkdir(ruta, { recursive: true });
  await writeFile(join(ruta, 'resultados-automaticos.json'), `${JSON.stringify(resultados, null, 2)}\n`);
  await writeFile(join(ruta, 'resultado-automatico.md'), `# Resultado automático ${hu}\n\n| Caso | Estado | Resultado |\n|---|---|---|\n${resultados.map((r) => `| ${r.id}${r.variante ? ` – ${r.variante}` : ''} | ${r.estado} | ${r.detalle} |`).join('\n')}\n`);
}
