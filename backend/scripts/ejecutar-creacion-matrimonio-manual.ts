import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import {
  BadRequestException,
  ConflictException,
  HttpException,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';

import { PrismaModule } from '../src/infrastructure/database/prisma/prisma.module';
import { PrismaService } from '../src/infrastructure/database/prisma/prisma.service';
import { CronogramaModule } from '../src/modules/cronograma/cronograma.module';
import { GuardarOnboardingMatrimonioUseCase } from '../src/modules/proyectos/application/use-cases/onboarding-matrimonio.use-case';
import { ActualizarProyectoUseCase } from '../src/modules/proyectos/application/use-cases/proyectos.use-cases';
import { ProyectosModule } from '../src/modules/proyectos/proyectos.module';

type Estado = 'PASS' | 'FAIL';
type Paso = {
  nombre: string;
  estado: Estado;
  esperado: string;
  obtenido: string;
  regla: string;
  origen?: Record<string, unknown>;
  intento?: Record<string, unknown>;
};
type Tipo = 'CIVIL' | 'RELIGIOSO' | 'RELIGIOSO_CIVIL' | 'SIMBOLICO';
type Pareja = {
  nombres: string;
  apellidoPaterno: string;
  dni: string;
  usuario: string;
  contrasena: string;
};
type DatosMatrimonio = {
  pareja1: Pareja;
  pareja2: Pareja;
  fechaMatrimonio: string;
  cantidadInvitados: number;
  presupuesto: number;
  idTipoCeremonia: number;
  objetivos: string;
  necesidades: string;
};

const tiposValidos: Tipo[] = ['CIVIL', 'RELIGIOSO', 'RELIGIOSO_CIVIL', 'SIMBOLICO'];
const tipoSolicitado = (() => {
  const argumento = process.argv.find((item) => item.startsWith('--tipo='));
  const tipo = (argumento?.split('=')[1] ?? 'SIMBOLICO').toUpperCase() as Tipo;
  if (!tiposValidos.includes(tipo)) throw new Error(`Tipo inválido: ${tipo}.`);
  return tipo;
})();
const raiz = join(process.cwd(), 'test', 'backup', 'legacy', 'evidencias', 'creacion-matrimonio', 'manual');
const idEjecucion = `manual-creacion-matrimonio-${tipoSolicitado}-${Date.now()}`;

const serializar = (valor: unknown): unknown => {
  if (valor === null || typeof valor !== 'object') return valor;
  if (valor instanceof Date) return valor.toISOString();
  if ('epochMilliseconds' in valor)
    return new Date(Number((valor as { epochMilliseconds: number }).epochMilliseconds)).toISOString();
  if (Array.isArray(valor)) return valor.map(serializar);
  return Object.fromEntries(Object.entries(valor as Record<string, unknown>).map(([clave, dato]) => [clave, serializar(dato)]));
};
const guardar = (nombre: string, contenido: unknown) =>
  writeFile(join(raiz, nombre), `${JSON.stringify(serializar(contenido), null, 2)}\n`, 'utf8');
const dia = (dias: number) => {
  const fecha = new Date();
  fecha.setUTCHours(0, 0, 0, 0);
  fecha.setUTCDate(fecha.getUTCDate() + dias);
  return fecha.toISOString().slice(0, 10);
};
const mensaje = (error: unknown) => error instanceof Error ? error.message : String(error);

async function ejecutar() {
  const pasos: Paso[] = [];
  const errores: string[] = [];
  const requests: Record<string, unknown> = {};
  const responses: Record<string, unknown> = {};
  const registros: Record<string, unknown> = {};
  let prisma: PrismaService | undefined;

  try {
    await mkdir(raiz, { recursive: true });
    const modulo = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
        PrismaModule,
        CronogramaModule,
        ProyectosModule,
      ],
    }).compile();
    const prismaActual = modulo.get(PrismaService);
    prisma = prismaActual;
    const onboarding = modulo.get(GuardarOnboardingMatrimonioUseCase);
    const actualizarProyecto = modulo.get(ActualizarProyectoUseCase);
    const orm = prismaActual.client.orm.public;
    const [usuarios, tipos, fases, personas, matrimonios, proyectos] = await Promise.all([
      orm.Usuario.all(), orm.TipoCeremonia.all(), orm.FaseProyecto.all(), orm.PersonaNatural.all(), orm.Matrimonio.all(), orm.Proyecto.all(),
    ]) as Array<Array<Record<string, unknown>>>;
    const idPmConfigurado = Number(process.env.MANUAL_WEDDING_PLANNER_ID ?? 0);
    const planner = usuarios.find((u) => Number(u.idUsuario) === idPmConfigurado || (!idPmConfigurado && u.tipoUsuario === 'PROJECT_MANAGER' && u.esActivo !== false));
    const tipo = tipos.find((t) => t.codigo === tipoSolicitado && t.activo !== false);
    const faseInicio = fases.find((f) => f.codigo === 'INICIO' && f.activo !== false);
    const faseCierre = fases.find((f) => f.codigo === 'CIERRE' && f.activo !== false);
    if (!planner) {
      throw new Error(
        'No existe un Wedding Planner (PROJECT_MANAGER) activo. Registra uno antes de ejecutar esta prueba o configura MANUAL_WEDDING_PLANNER_ID.',
      );
    }
    if (!tipo || !faseInicio || !faseCierre) {
      throw new Error('Faltan catálogos base requeridos para la prueba.');
    }

    const dnisExistentes = new Set(personas.map((p) => String(p.dni ?? '')).filter(Boolean));
    let cursorDni = Number(String(Date.now()).slice(-7));
    const nuevoDni = () => {
      do { cursorDni = (cursorDni + 1) % 10_000_000; } while (dnisExistentes.has(`9${String(cursorDni).padStart(7, '0')}`));
      const dni = `9${String(cursorDni).padStart(7, '0')}`;
      dnisExistentes.add(dni);
      return dni;
    };
    const fechasOcupadas = new Set(
      matrimonios.filter((m) => proyectos.find((p) => p.idProyecto === m.idProyecto)?.idPm === planner.idUsuario)
        .map((m) => String(m.fechaMatrimonio ?? '').slice(0, 10)),
    );
    let desplazamientoFecha = 365;
    const fechaLibre = () => {
      let fecha: string;
      do { fecha = dia(desplazamientoFecha++); } while (fechasOcupadas.has(fecha));
      fechasOcupadas.add(fecha);
      return fecha;
    };
    const token = String(Date.now());
    const pareja = (prefijo: string, dni: string): Pareja => ({
      nombres: `${prefijo} ${tipoSolicitado}`,
      apellidoPaterno: 'Prueba',
      dni,
      usuario: `manual.${token}.${prefijo.toLowerCase()}`,
      contrasena: 'PruebaManualSegura1!',
    });
    const crearDatos = (pareja1: Pareja, pareja2: Pareja, fechaMatrimonio: string): DatosMatrimonio => ({
      pareja1, pareja2, fechaMatrimonio, cantidadInvitados: 120, presupuesto: 25000,
      idTipoCeremonia: Number(tipo.idTipoCeremonia), objetivos: 'Validación manual aislada.', necesidades: 'Cronograma desde plantillas activas.',
    });
    const dniX = nuevoDni();
    const datosA = crearDatos(pareja('A1', dniX), pareja('A2', nuevoDni()), fechaLibre());
    const datosD = crearDatos(pareja('D1', nuevoDni()), pareja('D2', nuevoDni()), datosA.fechaMatrimonio);
    const datosB = crearDatos(pareja('B1', dniX), pareja('B2', nuevoDni()), fechaLibre());
    const datosC = crearDatos(pareja('C1', dniX), pareja('C2', nuevoDni()), fechaLibre());
    const datosFechaInsuficiente = crearDatos(pareja('F1', nuevoDni()), pareja('F2', nuevoDni()), dia(1));
    await guardar('datos-prueba.json', { idEjecucion, tipoCeremonia: tipoSolicitado, weddingPlanner: planner.idUsuario, matrimonioA: ocultar(datosA), intentoB: ocultar(datosB), intentoC: ocultar(datosC), intentoD: ocultar(datosD), intentoFechaInsuficiente: ocultar(datosFechaInsuficiente) });

    requests.matrimonioA = ocultar(datosA);
    const resultadoA = await onboarding.execute(datosA, Number(planner.idUsuario), true) as Record<string, unknown>;
    const proyectoA = resultadoA.proyecto as Record<string, unknown>;
    const matrimonioA = resultadoA.matrimonio as Record<string, unknown>;
    responses.matrimonioA = resultadoA;
    registros.matrimonioOrigenA = { proyecto: proyectoA, matrimonio: matrimonioA, dniX, cronograma: resultadoA.cronograma };
    const cronogramaA = resultadoA.cronograma as Record<string, unknown> | undefined;
    const baseCorrecta = proyectoA.estado === true && proyectoA.idFaseProyecto === faseInicio.idFaseProyecto && matrimonioA.idTipoCeremonia === tipo.idTipoCeremonia && !!cronogramaA;
    pasos.push({ nombre: 'Matrimonio A válido', estado: baseCorrecta ? 'PASS' : 'FAIL', esperado: 'A crea proyecto INICIO, ceremonia solicitada y cronograma.', obtenido: baseCorrecta ? 'A creado correctamente.' : 'A no cumple fase, ceremonia o cronograma.', regla: 'Caso base', origen: resumenOrigen(proyectoA, matrimonioA, dniX) });

    await esperarRechazo({ nombre: 'Duplicado WP + fecha', onboarding, datos: datosD, idPm: Number(planner.idUsuario), tipo: ConflictException, texto: 'Ya tienes un matrimonio activo para la misma fecha.', regla: 'Wedding Planner + fecha', origen: resumenOrigen(proyectoA, matrimonioA, null), intento: { fecha: datosD.fechaMatrimonio, dni1: datosD.pareja1.dni, dni2: datosD.pareja2.dni }, pasos, requests, responses });
    await esperarRechazo({ nombre: 'DNI en matrimonio no cerrado', onboarding, datos: datosB, idPm: Number(planner.idUsuario), tipo: ConflictException, texto: 'Una persona de la pareja ya participa en un matrimonio que no está en cierre.', regla: 'DNI en proyecto no CIERRE', origen: resumenOrigen(proyectoA, matrimonioA, dniX), intento: { fecha: datosB.fechaMatrimonio, dniReutilizado: dniX, dniNuevo: datosB.pareja2.dni }, pasos, requests, responses });
    await esperarRechazo({ nombre: 'Fecha insuficiente', onboarding, datos: datosFechaInsuficiente, idPm: Number(planner.idUsuario), tipo: BadRequestException, texto: 'La fecha del matrimonio debe estar al menos a 30 días de hoy.', regla: 'Fecha mínima', origen: undefined, intento: { fecha: datosFechaInsuficiente.fechaMatrimonio, dni1: datosFechaInsuficiente.pareja1.dni, dni2: datosFechaInsuficiente.pareja2.dni }, pasos, requests, responses });

    await actualizarProyecto.execute(String(proyectoA.idProyecto), { idFaseProyecto: Number(faseCierre.idFaseProyecto), estado: true });
    const proyectoACerrado = await orm.Proyecto.first({ idProyecto: String(proyectoA.idProyecto) as never }) as Record<string, unknown>;
    const cierreCorrecto = proyectoACerrado.idFaseProyecto === faseCierre.idFaseProyecto;
    try {
      requests.mismoDniDespuesCierre = ocultar(datosC);
      const resultadoC = await onboarding.execute(datosC, Number(planner.idUsuario), true) as Record<string, unknown>;
      responses.mismoDniDespuesCierre = resultadoC;
      const proyectoC = resultadoC.proyecto as Record<string, unknown>;
      const matrimonioC = resultadoC.matrimonio as Record<string, unknown>;
      const cronogramaC = resultadoC.cronograma as Record<string, unknown> | undefined;
      const creadoCorrectamente = cierreCorrecto && proyectoC.idProyecto !== proyectoA.idProyecto && proyectoC.idFaseProyecto === faseInicio.idFaseProyecto && !!cronogramaC;
      registros.matrimonioNuevoC = { proyecto: proyectoC, matrimonio: matrimonioC, dniReutilizado: dniX, cronograma: cronogramaC };
      pasos.push({ nombre: 'Mismo DNI después de CIERRE', estado: creadoCorrectamente ? 'PASS' : 'FAIL', esperado: 'C crea proyecto nuevo INICIO y cronograma propio.', obtenido: creadoCorrectamente ? 'C creado con proyecto distinto después del cierre de A.' : 'C no creó un proyecto nuevo válido.', regla: 'DNI permitido tras CIERRE', origen: resumenOrigen(proyectoACerrado, matrimonioA, dniX), intento: resumenOrigen(proyectoC, matrimonioC, dniX) });
    } catch (error) {
      pasos.push({ nombre: 'Mismo DNI después de CIERRE', estado: 'FAIL', esperado: 'Crear C luego de cerrar A.', obtenido: mensaje(error), regla: 'DNI permitido tras CIERRE', origen: resumenOrigen(proyectoACerrado, matrimonioA, dniX), intento: { fecha: datosC.fechaMatrimonio, dniReutilizado: dniX } });
    }
    await guardar('casos-negativos.json', pasos.filter((p) => ['Duplicado WP + fecha', 'DNI en matrimonio no cerrado', 'Fecha insuficiente'].includes(p.nombre)));
  } catch (error) {
    const detalle = mensaje(error); errores.push(detalle);
    pasos.push({ nombre: 'Ejecución', estado: 'FAIL', esperado: 'Runner ejecutable.', obtenido: detalle, regla: 'Infraestructura' });
  } finally {
    await guardar('requests.json', requests); await guardar('responses.json', responses); await guardar('registros-creados.json', registros);
    const fallos = pasos.filter((p) => p.estado === 'FAIL').length;
    const global = fallos || errores.length ? 'FAIL' : 'PASS';
    const filas = pasos.map((p) => `| ${p.nombre} | ${p.esperado} | ${p.obtenido} | ${p.regla} | ${JSON.stringify(p.origen ?? {})} | ${JSON.stringify(p.intento ?? {})} | ${p.estado} |`);
    const encabezado = ['# Resultado de ejecución', '', `- ID de ejecución: \`${idEjecucion}\``, `- Fecha/hora: ${new Date().toISOString()}`, `- Comando: \`pnpm.cmd test:manual:creacion-matrimonio -- --tipo=${tipoSolicitado}\``, '', '| Caso | Resultado esperado | Resultado real | Regla | Origen | Intento | Estado |', '| --- | --- | --- | --- | --- | --- | --- |', ...filas, '', `## Resultado global: ${global}`, '', 'Ver `datos-prueba.json`, `requests.json`, `responses.json` y `registros-creados.json`.'].join('\n');
    await writeFile(join(raiz, 'resultado.md'), `${encabezado}\n`, 'utf8');
    await writeFile(join(raiz, 'resultado-final.md'), `${encabezado}\n`, 'utf8');
    for (const paso of pasos) console.log(`${paso.estado} ${paso.nombre}: ${paso.obtenido}`);
    console.log(`\nResultado global: ${global}`); console.log(`Reporte: ${raiz}`);
    if (prisma) await prisma.onModuleDestroy();
    if (global === 'FAIL') process.exitCode = 1;
  }
}

function ocultar(datos: DatosMatrimonio) {
  return { ...datos, pareja1: { ...datos.pareja1, contrasena: '********' }, pareja2: { ...datos.pareja2, contrasena: '********' } };
}
function resumenOrigen(proyecto: Record<string, unknown>, matrimonio: Record<string, unknown>, dni: string | null) {
  return { idProyecto: proyecto.idProyecto, idMatrimonio: matrimonio.idMatrimonio, fase: proyecto.idFaseProyecto, dni };
}
async function esperarRechazo(opciones: {
  nombre: string; onboarding: GuardarOnboardingMatrimonioUseCase; datos: DatosMatrimonio; idPm: number; tipo: typeof ConflictException | typeof BadRequestException; texto: string; regla: string; origen?: Record<string, unknown>; intento: Record<string, unknown>; pasos: Paso[]; requests: Record<string, unknown>; responses: Record<string, unknown>;
}) {
  opciones.requests[opciones.nombre] = ocultar(opciones.datos);
  try {
    await opciones.onboarding.execute(opciones.datos, opciones.idPm, true);
    opciones.pasos.push({ nombre: opciones.nombre, estado: 'FAIL', esperado: opciones.texto, obtenido: 'La operación fue aceptada.', regla: opciones.regla, origen: opciones.origen, intento: opciones.intento });
  } catch (error) {
    const textoReal = mensaje(error); const claseCorrecta = error instanceof opciones.tipo; const mensajeCorrecto = textoReal.includes(opciones.texto);
    opciones.responses[opciones.nombre] = { tipo: error instanceof HttpException ? error.constructor.name : typeof error, mensaje: textoReal, status: error instanceof HttpException ? error.getStatus() : null };
    opciones.pasos.push({ nombre: opciones.nombre, estado: claseCorrecta && mensajeCorrecto ? 'PASS' : 'FAIL', esperado: opciones.texto, obtenido: textoReal, regla: opciones.regla, origen: opciones.origen, intento: opciones.intento });
  }
}

void ejecutar();
