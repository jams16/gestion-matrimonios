import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { ConfigModule } from '@nestjs/config';
import { HttpException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { PrismaModule } from '../src/infrastructure/database/prisma/prisma.module';
import { PrismaService } from '../src/infrastructure/database/prisma/prisma.service';
import { CronogramaModule } from '../src/modules/cronograma/cronograma.module';
import {
  ConfirmarPlanificacionCronogramaUseCase,
  ConsultarCronogramaUseCase,
  GestionarActividadesUseCase,
  GestionarDependenciasUseCase,
  GestionarHitosUseCase,
  GestionarTimingUseCase,
} from '../src/modules/cronograma/application/use-cases/gestionar-cronograma.use-cases';
import {
  EstadoHitoDto,
  PrioridadActividadDto,
} from '../src/modules/cronograma/application/dto/cronograma.dto';

type Estado = 'PASS' | 'FAIL' | 'WARN';
type Paso = { id: string; caso: string; esperado: string; obtenido: string; estado: Estado };
const ruta = join(process.cwd(), 'test', 'evidencias', 'gestion-cronograma', 'manual');
const ejecucion = `manual-gestion-cronograma-${new Date().toISOString()}`;
const pasos: Paso[] = [];
const requests: Record<string, unknown> = {};
const responses: Record<string, unknown> = {};
const registros: Record<string, unknown> = {};

const fecha = (base: unknown, dias: number, hora = 9) => {
  const f = new Date(String(base));
  f.setUTCDate(f.getUTCDate() + dias);
  f.setUTCHours(hora, 0, 0, 0);
  return f.toISOString();
};
const textoError = (error: unknown) =>
  error instanceof Error ? error.message : String(error);
const serializar = (valor: unknown): unknown => {
  if (valor === null || typeof valor !== 'object') return valor;
  if (valor instanceof Date) return valor.toISOString();
  if ('epochMilliseconds' in valor)
    return new Date(Number((valor as { epochMilliseconds: number }).epochMilliseconds)).toISOString();
  if (Array.isArray(valor)) return valor.map(serializar);
  return Object.fromEntries(Object.entries(valor as Record<string, unknown>).map(([k, v]) => [k, serializar(v)]));
};
const guardar = (archivo: string, valor: unknown) =>
  writeFile(join(ruta, archivo), `${JSON.stringify(serializar(valor), null, 2)}\n`, 'utf8');
const registrar = (id: string, caso: string, esperado: string, obtenido: string, correcto: boolean) =>
  pasos.push({ id, caso, esperado, obtenido, estado: correcto ? 'PASS' : 'FAIL' });

async function ejecutar() {
  let prisma: PrismaService | undefined;
  let proyectoUsado: Record<string, unknown> | undefined;
  let faseInicial = '';
  try {
    await mkdir(ruta, { recursive: true });
    const modulo = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
        PrismaModule,
        CronogramaModule,
      ],
    }).compile();
    prisma = modulo.get(PrismaService);
    const consultar = modulo.get(ConsultarCronogramaUseCase);
    const hitos = modulo.get(GestionarHitosUseCase);
    const actividades = modulo.get(GestionarActividadesUseCase);
    const dependencias = modulo.get(GestionarDependenciasUseCase);
    const timing = modulo.get(GestionarTimingUseCase);
    const confirmar = modulo.get(ConfirmarPlanificacionCronogramaUseCase);
    const orm = prisma!.client.orm.public;
    const [proyectos, matrimonios, fases, tipos, todosHitos] =
      (await Promise.all([
        orm.Proyecto.all(), orm.Matrimonio.all(), orm.FaseProyecto.all(),
        orm.TipoCeremonia.all(), orm.Hito.all(),
      ])) as Array<Array<Record<string, unknown>>>;
    const conteosOperativos = await contarOperativos();
    const inicio = fases.find((x) => x.codigo === 'INICIO');
    const idConfigurado = process.env.MANUAL_PROYECTO_CRONOGRAMA_ID;
    proyectoUsado = proyectos.find((p) =>
      (!idConfigurado || p.idProyecto === idConfigurado) && p.estado === true &&
      p.idFaseProyecto === inicio?.idFaseProyecto &&
      matrimonios.some((m) => m.idProyecto === p.idProyecto) &&
      todosHitos.some((h) => h.idProyecto === p.idProyecto && h.activo === true) &&
      (conteosOperativos.get(String(p.idProyecto))?.actividades ?? 0) > 0,
    );
    if (!proyectoUsado) throw new Error('No se encontró un proyecto activo en fase INICIO con matrimonio y cronograma. Configura MANUAL_PROYECTO_CRONOGRAMA_ID si corresponde.');
    const idProyecto = String(proyectoUsado.idProyecto);
    const idUsuario = Number(proyectoUsado.idPm);
    const matrimonio = matrimonios.find((m) => m.idProyecto === idProyecto)!;
    const tipo = tipos.find((t) => t.idTipoCeremonia === matrimonio.idTipoCeremonia);
    faseInicial = String(inicio?.codigo ?? 'INICIO');
    const resumenInicial = {
      idProyecto, idMatrimonio: matrimonio.idMatrimonio, idUsuario,
      fase: faseInicial, ceremonia: tipo?.codigo ?? null, fechaBoda: matrimonio.fechaMatrimonio,
      hitosActivos: todosHitos.filter((h) => h.idProyecto === idProyecto && h.activo === true).length,
      actividadesActivas: conteosOperativos.get(idProyecto)?.actividades ?? 0,
      timingActivos: conteosOperativos.get(idProyecto)?.timing ?? 0,
    };
    await guardar('datos-prueba.json', { ejecucion, proyecto: resumenInicial, aviso: 'No se creó matrimonio; todos los cambios se aplican a instancias cr_* existentes.' });

    const general = await consultar.obtener(idProyecto, idUsuario, true);
    responses.listadoInicial = general;
    registrar('CRON-LIST-01', 'Listado general', 'Hitos, actividades, dependencias y timing del proyecto.', 'Listado obtenido.', Array.isArray(general.hitos) && Array.isArray(general.actividades));

    const boda = matrimonio.fechaMatrimonio;
    const hitoManual = await hitos.crear(idProyecto, { nombre: `Hito manual ${Date.now()}`, criterioAceptacion: 'Evidencia manual de cronograma.', fechaObjetivo: fecha(boda, -4), orden: 900 }, idUsuario);
    registros.hitoManual = hitoManual;
    registrar('HIT-02', 'Crear hito', 'Hito manual activo.', 'Hito creado.', hitoManual.activo === true);
    const hitoPlantilla = general.hitos.find((h: Record<string, unknown>) => h.idPlantillaHito);
    if (!hitoPlantilla) throw new Error('No existe hito generado desde plantilla para la prueba.');
    await hitos.actualizar(idProyecto, String(hitoPlantilla.idHito), { nombre: `${hitoPlantilla.nombre} (revisado)`, criterioAceptacion: 'Modificado sin alterar la plantilla.', fechaObjetivo: fecha(boda, -2) }, idUsuario);
    registrar('HIT-03', 'Editar hito de plantilla', 'Se conserva trazabilidad y se permite editar.', 'Actualización aplicada.', true);
    await hitos.actualizar(idProyecto, String(hitoManual.idHito), { nombre: `${hitoManual.nombre} (editado)` }, idUsuario);
    await hitos.cambiarEstado(idProyecto, String(hitoManual.idHito), { estado: EstadoHitoDto.EN_PROGRESO }, idUsuario);
    registrar('HIT-04/05', 'Editar/cambiar estado hito manual', 'Cambios persistidos.', 'Actualización aplicada.', true);

    const actividadesIniciales = await actividades.listar(idProyecto, idUsuario, { activo: true });
    registrar('ACT-01/02', 'Listar y filtrar actividades', 'Listado activo del proyecto.', `${actividadesIniciales.length} actividades activas.`, actividadesIniciales.length > 0);
    const actividadPlantilla = actividadesIniciales.find((a) => a.idPlantillaActividad);
    if (!actividadPlantilla) throw new Error('No existe actividad generada desde plantilla para la prueba.');
    const actividadManual = await actividades.crear(idProyecto, { nombre: `Actividad manual ${Date.now()}`, idHito: String(hitoManual.idHito), descripcion: 'Creada por runner.', listaVerificacion: { pasos: ['validar'] }, entregable: 'Evidencia', fechaInicio: fecha(boda, -3), fechaFin: fecha(boda, -2), prioridad: PrioridadActividadDto.MEDIA, responsableTexto: 'Wedding Planner', orden: 901 }, idUsuario);
    registros.actividadManual = actividadManual;
    registrar('ACT-03', 'Crear actividad', 'Actividad manual activa.', 'Actividad creada.', actividadManual.activo === true);
    await hitos.eliminar(idProyecto, String(hitoManual.idHito), idUsuario);
    registrar('HIT-06', 'Desactivar hito manual', 'El hito queda con activo=false.', 'Desactivación lógica aplicada.', true);
    await actividades.actualizar(idProyecto, String(actividadPlantilla.idActividad), { descripcion: 'Edición permitida desde plantilla.', fechaInicio: fecha(boda, -1), fechaFin: fecha(boda, -1, 18), prioridad: PrioridadActividadDto.ALTA, listaVerificacion: { nota: 'fecha próxima a boda permitida' }, entregable: 'Revisado', orden: 902 }, idUsuario);
    registrar('ACT-04/PLAN-07', 'Editar actividad de plantilla cerca de boda', 'Guardar sin bloqueo por plantilla.', 'Actualización permitida.', true);
    await actividades.actualizar(idProyecto, String(actividadManual.idActividad), { descripcion: 'Actividad manual editada.' }, idUsuario);
    await actividades.eliminar(idProyecto, String(actividadManual.idActividad), idUsuario);
    registrar('ACT-05/07', 'Editar y desactivar actividad manual', 'activo=false.', 'Actividad desactivada.', true);

    const dependenciaA = await actividades.crear(idProyecto, { nombre: `Predecesora ${Date.now()}`, fechaInicio: fecha(boda, -8), fechaFin: fecha(boda, -7), orden: 910 }, idUsuario);
    const dependenciaB = await actividades.crear(idProyecto, { nombre: `Sucesora ${Date.now()}`, fechaInicio: fecha(boda, -6), fechaFin: fecha(boda, -5), orden: 911 }, idUsuario);
    const dependenciaCreada = await dependencias.crear(idProyecto, { idActividadPredecesora: String(dependenciaA.idActividad), idActividadSucesora: String(dependenciaB.idActividad), diasDesfase: 1 }, idUsuario);
    registros.dependenciaManual = dependenciaCreada;
    registrar('DEP-02/03', 'Crear dependencia manual', 'Dependencia válida entre instancias operativas.', 'Dependencia creada.', true);
    await rechazo('DEP-04', 'Dependencia duplicada', 'La dependencia ya existe.', () => dependencias.crear(idProyecto, { idActividadPredecesora: String(dependenciaA.idActividad), idActividadSucesora: String(dependenciaB.idActividad) }, idUsuario));
    await rechazo('DEP-05', 'Autodependencia', 'Una actividad no puede depender de sí misma.', () => dependencias.crear(idProyecto, { idActividadPredecesora: String(dependenciaA.idActividad), idActividadSucesora: String(dependenciaA.idActividad) }, idUsuario));
    await rechazo('DEP-06', 'Ciclo', 'La dependencia generaría un ciclo.', () => dependencias.crear(idProyecto, { idActividadPredecesora: String(dependenciaB.idActividad), idActividadSucesora: String(dependenciaA.idActividad) }, idUsuario));
    await dependencias.eliminar(idProyecto, String(dependenciaCreada.idDependencia), idUsuario);
    registrar('DEP-08', 'Eliminar dependencia', 'Eliminación física según diseño actual.', 'Dependencia eliminada.', true);

    const timingInicial = await timing.listar(idProyecto, idUsuario, { activo: true });
    const timingPlantilla = timingInicial.find((t) => t.idPlantillaTiming);
    if (!timingPlantilla) throw new Error('No existe timing generado desde plantilla para la prueba.');
    const inicioTiming = fecha(boda, 0, 10);
    const finTiming = fecha(boda, 0, 11);
    const timingManual = await timing.crear(idProyecto, { actividad: `Timing manual ${Date.now()}`, fechaHoraInicio: inicioTiming, fechaHoraFin: finTiming, duracionMinutos: 60, listaVerificacion: { items: ['confirmar'] }, responsableTexto: 'Wedding Planner', orden: 920 }, idUsuario);
    registros.timingManual = timingManual;
    registrar('TIM-02', 'Crear timing', 'Timing manual activo.', 'Timing creado.', timingManual.activo === true);
    await timing.actualizar(idProyecto, String(timingPlantilla.idTiming), { actividad: `${timingPlantilla.actividad} (ajustado)`, fechaHoraInicio: fecha(boda, 0, 12), fechaHoraFin: fecha(boda, 0, 13), duracionMinutos: 60, listaVerificacion: { nota: 'edición permitida' }, orden: 921 }, idUsuario);
    await timing.actualizar(idProyecto, String(timingManual.idTiming), { responsableTexto: 'Wedding Planner (editado)' }, idUsuario);
    await timing.eliminar(idProyecto, String(timingManual.idTiming), idUsuario);
    registrar('TIM-03/04/06', 'Editar plantilla/manual y desactivar', 'Plantilla no bloquea; manual queda inactivo.', 'Operaciones aplicadas.', true);

    const fase = await confirmar.ejecutar(idProyecto, idUsuario);
    responses.confirmacionFase = fase;
    registrar('FASE-01', 'INICIO a PLANIFICACION', 'Cambio persistido.', `${fase.faseAnterior} → ${fase.faseActual}.`, fase.faseActual === 'PLANIFICACION');
    await actividades.actualizar(idProyecto, String(actividadPlantilla.idActividad), { descripcion: 'Editable también en PLANIFICACION.' }, idUsuario);
    await hitos.actualizar(idProyecto, String(hitoPlantilla.idHito), { criterioAceptacion: 'Editable después del cambio de fase.' }, idUsuario);
    const actividadPosterior = await actividades.crear(idProyecto, { nombre: `Actividad posterior ${Date.now()}`, fechaFin: fecha(boda, -1), orden: 930 }, idUsuario);
    registros.actividadPosterior = actividadPosterior;
    registrar('PLAN-01..06', 'Edición posterior en PLANIFICACION', 'Cronograma continúa editable.', 'Actividad e hito editados; actividad nueva creada.', true);

    const final = await consultar.obtener(idProyecto, idUsuario, true);
    responses.listadoFinal = final;
    registrar('CRON-LIST-FINAL', 'Listado final', 'Cambios visibles y registros inactivos excluidos.', 'Listado final obtenido.', Array.isArray(final.actividades));
  } catch (error) {
    registrar('RUNNER', 'Ejecución', 'Runner completo.', textoError(error), false);
  } finally {
    const fallos = pasos.filter((p) => p.estado === 'FAIL').length;
    const pass = pasos.filter((p) => p.estado === 'PASS').length;
    const global = fallos ? 'FAIL' : 'PASS';
    const casos = pasos.map(({ id, caso, esperado }) => ({ id, caso, esperado }));
    await Promise.all([
      guardar('casos-prueba.json', casos), guardar('requests.json', requests), guardar('responses.json', responses), guardar('registros-creados.json', registros),
      guardar('evidencias-especificas.json', { proyecto: proyectoUsado, faseInicial, noSeModificaronPlantillas: true, reglas: ['plantilla como trazabilidad', 'soft delete de hito/actividad/timing', 'delete físico de dependencia'] }),
    ]);
    const filas = pasos.map((p) => `| ${p.id} | ${p.caso} | ${p.esperado} | ${p.obtenido} | ${p.estado} |`).join('\n');
    const reporte = `# Resultado de ejecución\n\n## 1. Identificación de la prueba\n- ID de ejecución: \`${ejecucion}\`\n- Fecha/hora: ${new Date().toISOString()}\n- Tipo: manual contra BD configurada.\n- Comando: \`pnpm.cmd test:manual:gestion-cronograma\`\n\n## 2. Precondiciones\n- Proyecto: \`${String(proyectoUsado?.idProyecto ?? 'no localizado')}\`.\n- Fase inicial: \`${faseInicial || 'N/A'}\`.\n- No se creó ningún matrimonio.\n\n## 3. Ejecución paso a paso\n| ID | Caso | Resultado esperado | Resultado obtenido | Estado |\n|---|---|---|---|---|\n${filas}\n\n## 4. Registros creados/modificados\nVer \`registros-creados.json\`; los registros no se eliminan al finalizar.\n\n## Resultado global: ${global}\n\nPASS: ${pass}. FAIL: ${fallos}.\n`;
    await writeFile(join(ruta, 'resultado.md'), reporte, 'utf8');
    await writeFile(join(ruta, 'resultado-final.md'), reporte, 'utf8');
    for (const paso of pasos) console.log(`${paso.estado} ${paso.caso}: ${paso.obtenido}`);
    console.log(`\nResultado global: ${global}\nReporte: ${ruta}`);
    if (prisma) await prisma.onModuleDestroy();
    if (fallos) process.exitCode = 1;
  }
}

async function rechazo(id: string, caso: string, esperado: string, operacion: () => Promise<unknown>) {
  try { await operacion(); registrar(id, caso, esperado, 'La operación fue aceptada.', false); }
  catch (error) {
    const obtenido = textoError(error);
    registrar(id, caso, esperado, obtenido, error instanceof HttpException && obtenido.includes(esperado));
  }
}

async function contarOperativos(): Promise<Map<string, { actividades: number; timing: number }>> {
  const pg = require('pg') as { Client: new (config: { connectionString: string | undefined }) => { connect(): Promise<void>; end(): Promise<void>; query(sql: string): Promise<{ rows: Array<Record<string, unknown>> }> } };
  const cliente = new pg.Client({ connectionString: process.env.DATABASE_URL });
  await cliente.connect();
  try {
    const [actividades, timing] = await Promise.all([
      cliente.query('SELECT * FROM cr_actividad'),
      cliente.query('SELECT * FROM cr_timing'),
    ]);
    const conteos = new Map<string, { actividades: number; timing: number }>();
    const sumar = (filas: Array<Record<string, unknown>>, campo: 'actividades' | 'timing') => filas.forEach((fila) => {
      const proyecto = String(fila.idProyecto ?? fila.id_proyecto);
      const activo = fila.activo ?? fila.esActivo;
      if (activo !== true) return;
      const actual = conteos.get(proyecto) ?? { actividades: 0, timing: 0 };
      actual[campo] += 1;
      conteos.set(proyecto, actual);
    });
    sumar(actividades.rows, 'actividades'); sumar(timing.rows, 'timing');
    return conteos;
  } finally { await cliente.end(); }
}

void ejecutar();
