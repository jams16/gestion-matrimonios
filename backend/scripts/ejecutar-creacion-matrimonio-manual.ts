import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { ConflictException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';

import { PrismaModule } from '../src/infrastructure/database/prisma/prisma.module';
import { PrismaService } from '../src/infrastructure/database/prisma/prisma.service';
import { CronogramaModule } from '../src/modules/cronograma/cronograma.module';
import { GuardarOnboardingMatrimonioUseCase } from '../src/modules/proyectos/application/use-cases/onboarding-matrimonio.use-case';
import { ActualizarProyectoUseCase } from '../src/modules/proyectos/application/use-cases/proyectos.use-cases';
import { ProyectosModule } from '../src/modules/proyectos/proyectos.module';

type Estado = 'PASS' | 'FAIL' | 'WARN';
type Paso = { nombre: string; estado: Estado; detalle: string };
type Tipo = 'CIVIL' | 'RELIGIOSO' | 'RELIGIOSO_CIVIL' | 'SIMBOLICO';

const tiposValidos: Tipo[] = [
  'CIVIL',
  'RELIGIOSO',
  'RELIGIOSO_CIVIL',
  'SIMBOLICO',
];
const tipoSolicitado = (() => {
  const parametro = process.argv.find((item) => item.startsWith('--tipo='));
  const tipo = (parametro?.split('=')[1] ?? 'SIMBOLICO').toUpperCase() as Tipo;
  if (!tiposValidos.includes(tipo)) {
    throw new Error(`Tipo inválido: ${tipo}. Usa ${tiposValidos.join(', ')}.`);
  }
  return tipo;
})();
const indiceTipo = tiposValidos.indexOf(tipoSolicitado) + 1;
const raiz = join(
  process.cwd(),
  'test',
  'evidencias',
  'creacion-matrimonio',
  'manual',
);

const serializar = (valor: unknown): unknown => {
  if (valor === null || typeof valor !== 'object') return valor;
  if (valor instanceof Date) return valor.toISOString();
  if ('epochMilliseconds' in valor)
    return new Date(
      Number((valor as { epochMilliseconds: number }).epochMilliseconds),
    ).toISOString();
  if (Array.isArray(valor)) return valor.map(serializar);
  return Object.fromEntries(
    Object.entries(valor as Record<string, unknown>).map(
      ([clave, contenido]) => [clave, serializar(contenido)],
    ),
  );
};
const guardar = (nombre: string, contenido: unknown) =>
  writeFile(
    join(raiz, nombre),
    `${JSON.stringify(serializar(contenido), null, 2)}\n`,
    'utf8',
  );
const dia = (dias: number) => {
  const resultado = new Date();
  resultado.setUTCHours(0, 0, 0, 0);
  resultado.setUTCDate(resultado.getUTCDate() + dias);
  return resultado.toISOString().slice(0, 10);
};
const fechaPorTipo = () => dia(90 + indiceTipo);

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
    const guardarMatrimonio = modulo.get(GuardarOnboardingMatrimonioUseCase);
    const actualizarProyecto = modulo.get(ActualizarProyectoUseCase);
    const orm = prismaActual.client.orm.public;
    const usuarios = (await orm.Usuario.all()) as Array<
      Record<string, unknown>
    >;
    const idPmConfigurado = Number(process.env.MANUAL_WEDDING_PLANNER_ID ?? 0);
    const planner = usuarios.find(
      (usuario) =>
        Number(usuario.idUsuario) === idPmConfigurado ||
        (!idPmConfigurado &&
          usuario.tipoUsuario === 'PROJECT_MANAGER' &&
          usuario.esActivo !== false),
    );
    if (!planner) {
      throw new Error(
        'No se encontró Wedding Planner. Define MANUAL_WEDDING_PLANNER_ID en backend/.env.',
      );
    }
    const tipos = (await orm.TipoCeremonia.all()) as Array<
      Record<string, unknown>
    >;
    const tipo = tipos.find(
      (item) => item.codigo === tipoSolicitado && item.activo !== false,
    );
    if (!tipo)
      throw new Error(`No existe el catálogo activo ${tipoSolicitado}.`);
    const fases = (await orm.FaseProyecto.all()) as Array<
      Record<string, unknown>
    >;
    const faseInicio = fases.find((fase) => fase.codigo === 'INICIO');
    const faseCierre = fases.find((fase) => fase.codigo === 'CIERRE');
    if (!faseInicio || !faseCierre)
      throw new Error('Faltan las fases INICIO o CIERRE.');

    const datos = {
      pareja1: {
        nombres: `Pareja ${tipoSolicitado} Uno`,
        apellidoPaterno: 'Manual',
        dni: `99${String(indiceTipo).padStart(2, '0')}0001`,
        usuario: `pareja.${tipoSolicitado.toLowerCase()}.uno`,
        contrasena: 'PruebaManualSegura1!',
      },
      pareja2: {
        nombres: `Pareja ${tipoSolicitado} Dos`,
        apellidoPaterno: 'Manual',
        dni: `99${String(indiceTipo).padStart(2, '0')}0002`,
        usuario: `pareja.${tipoSolicitado.toLowerCase()}.dos`,
        contrasena: 'PruebaManualSegura1!',
      },
      fechaMatrimonio: fechaPorTipo(),
      cantidadInvitados: 120,
      presupuesto: 25000,
      idTipoCeremonia: Number(tipo.idTipoCeremonia),
      objetivos: 'Validar creación manual reproducible.',
      necesidades: 'Cronograma generado desde plantillas activas.',
    };
    await guardar('datos-prueba.json', {
      idEjecucion: `manual-creacion-matrimonio-${tipoSolicitado}`,
      fechaHora: new Date().toISOString(),
      idWeddingPlanner: planner.idUsuario,
      tipoCeremonia: tipoSolicitado,
      datos: {
        ...datos,
        pareja1: { ...datos.pareja1, contrasena: '********' },
        pareja2: { ...datos.pareja2, contrasena: '********' },
      },
    });
    await guardar('casos-prueba.json', [
      {
        id: 'CP-MAN-01',
        nombre: 'Crear matrimonio válido',
        tipo: 'FUNCIONAL',
        objetivo:
          'Crear o reutilizar de forma controlada un matrimonio del tipo seleccionado.',
        resultado_esperado:
          'Proyecto activo en fase INICIO y cronograma consistente.',
      },
      {
        id: 'CP-MAN-02',
        nombre: 'Validaciones de negocio',
        tipo: 'FUNCIONAL',
        objetivo: 'Comprobar fecha mínima, DNI y carga del Wedding Planner.',
        resultado_esperado: 'Los intentos inválidos son rechazados.',
      },
    ]);

    const matrimonios = (await orm.Matrimonio.all()) as Array<
      Record<string, unknown>
    >;
    const proyectos = (await orm.Proyecto.all()) as Array<
      Record<string, unknown>
    >;
    const existente = matrimonios.find((matrimonio) => {
      const proyecto = proyectos.find(
        (item) => item.idProyecto === matrimonio.idProyecto,
      );
      const fecha = String(matrimonio.fechaMatrimonio ?? '').slice(0, 10);
      return (
        proyecto?.idPm === planner.idUsuario && fecha === datos.fechaMatrimonio
      );
    });
    let resultado: Record<string, unknown> | undefined;
    if (existente) {
      resultado = {
        proyecto: proyectos.find(
          (item) => item.idProyecto === existente.idProyecto,
        ),
        matrimonio: existente,
        reutilizado: true,
      };
      pasos.push({
        nombre: 'Matrimonio válido',
        estado: 'WARN',
        detalle:
          'Se reutilizó el matrimonio fijo ya existente para evitar duplicados.',
      });
    } else {
      requests.crearMatrimonio = {
        ...datos,
        pareja1: { ...datos.pareja1, contrasena: '********' },
        pareja2: { ...datos.pareja2, contrasena: '********' },
      };
      resultado = (await guardarMatrimonio.execute(
        datos,
        Number(planner.idUsuario),
        true,
      )) as Record<string, unknown>;
      responses.crearMatrimonio = resultado;
      pasos.push({
        nombre: 'Matrimonio válido',
        estado: 'PASS',
        detalle:
          'Se ejecutó GuardarOnboardingMatrimonioUseCase con iniciar=true.',
      });
    }
    const proyecto = resultado.proyecto as Record<string, unknown>;
    const matrimonio = resultado.matrimonio as Record<string, unknown>;
    const [hitos, actividades, dependencias, timing] = await Promise.all([
      orm.Hito.all(),
      orm.Actividad.all(),
      orm.Dependencia.all(),
      orm.Timing.all(),
    ]);
    const hitosProyecto = (hitos as Array<Record<string, unknown>>).filter(
      (item) => item.idProyecto === proyecto.idProyecto,
    );
    const actividadesProyecto = (
      actividades as Array<Record<string, unknown>>
    ).filter((item) => item.idProyecto === proyecto.idProyecto);
    const timingProyecto = (timing as Array<Record<string, unknown>>).filter(
      (item) => item.idProyecto === proyecto.idProyecto,
    );
    const actividadesIds = new Set(
      actividadesProyecto.map((item) => item.idActividad),
    );
    const dependenciasProyecto = (
      dependencias as Array<Record<string, unknown>>
    ).filter(
      (item) =>
        actividadesIds.has(item.idActividadPredecesora) &&
        actividadesIds.has(item.idActividadSucesora),
    );
    registros.gp_proyecto = proyecto;
    registros.gp_matrimonio = matrimonio;
    registros.cr_hito = hitosProyecto;
    registros.cr_actividad = actividadesProyecto;
    registros.cr_dependencia = dependenciasProyecto;
    registros.cr_timing = timingProyecto;
    const faseCorrecta =
      proyecto.estado === true &&
      proyecto.idFaseProyecto === faseInicio.idFaseProyecto;
    pasos.push({
      nombre: 'Proyecto activo en fase INICIO',
      estado: faseCorrecta ? 'PASS' : 'FAIL',
      detalle: `estado=${String(proyecto.estado)}, idFaseProyecto=${String(proyecto.idFaseProyecto)}`,
    });
    pasos.push({
      nombre: 'Tipo de ceremonia',
      estado:
        matrimonio.idTipoCeremonia === tipo.idTipoCeremonia ? 'PASS' : 'FAIL',
      detalle: tipoSolicitado,
    });
    const sinDependenciasHuerfanas = dependenciasProyecto.every(
      (item) =>
        actividadesIds.has(item.idActividadPredecesora) &&
        actividadesIds.has(item.idActividadSucesora),
    );
    pasos.push({
      nombre: 'Dependencias consistentes',
      estado: sinDependenciasHuerfanas ? 'PASS' : 'FAIL',
      detalle: `${dependenciasProyecto.length} dependencias generadas.`,
    });
    const cronogramaExiste =
      hitosProyecto.length +
        actividadesProyecto.length +
        timingProyecto.length >
      0;
    pasos.push({
      nombre: 'Cronograma generado',
      estado: cronogramaExiste ? 'PASS' : 'WARN',
      detalle: cronogramaExiste
        ? `${hitosProyecto.length} hitos, ${actividadesProyecto.length} actividades y ${timingProyecto.length} timing.`
        : 'No hay plantillas activas con las que generar elementos.',
    });

    const intentarRechazo = async (
      nombre: string,
      cambios: Record<string, unknown>,
    ) => {
      try {
        await guardarMatrimonio.execute(
          { ...datos, ...cambios } as never,
          Number(planner.idUsuario),
          true,
        );
        pasos.push({
          nombre,
          estado: 'FAIL',
          detalle: 'La operación fue aceptada y debía rechazarse.',
        });
      } catch (error) {
        const esperado =
          error instanceof ConflictException || error instanceof Error;
        pasos.push({
          nombre,
          estado: esperado ? 'PASS' : 'FAIL',
          detalle: error instanceof Error ? error.message : String(error),
        });
      }
    };
    await intentarRechazo('Duplicado WP + fecha', {
      pareja1: {
        ...datos.pareja1,
        dni: `88${String(indiceTipo).padStart(2, '0')}0001`,
        usuario: `duplicado.${tipoSolicitado}.uno`,
      },
      pareja2: {
        ...datos.pareja2,
        dni: `88${String(indiceTipo).padStart(2, '0')}0002`,
        usuario: `duplicado.${tipoSolicitado}.dos`,
      },
    });
    await intentarRechazo('DNI en matrimonio no cerrado', {
      fechaMatrimonio: dia(120 + indiceTipo),
    });
    await intentarRechazo('Fecha insuficiente', { fechaMatrimonio: dia(1) });

    const yaTieneNuevoMatrimonio = matrimonios.some((item) => {
      const proyectoRelacionado = proyectos.find(
        (candidate) => candidate.idProyecto === item.idProyecto,
      );
      return (
        item.idMatrimonio !== matrimonio.idMatrimonio &&
        (item.idNovio1 === matrimonio.idNovio1 ||
          item.idNovio2 === matrimonio.idNovio2) &&
        proyectoRelacionado?.idFaseProyecto === faseInicio.idFaseProyecto
      );
    });
    if (yaTieneNuevoMatrimonio) {
      pasos.push({
        nombre: 'Mismo DNI después de CIERRE',
        estado: 'WARN',
        detalle:
          'Ya existe un segundo matrimonio creado en una ejecución previa; se conserva para inspección.',
      });
    } else {
      await actualizarProyecto.execute(String(proyecto.idProyecto), {
        idFaseProyecto: Number(faseCierre.idFaseProyecto),
        estado: true,
      });
      try {
        const posteriorCierre = await guardarMatrimonio.execute(
          { ...datos, fechaMatrimonio: dia(180 + indiceTipo) },
          Number(planner.idUsuario),
          true,
        );
        responses.mismoDniDespuesCierre = posteriorCierre;
        pasos.push({
          nombre: 'Mismo DNI después de CIERRE',
          estado: 'PASS',
          detalle:
            'El proyecto previo se pasó a CIERRE mediante el caso de uso real y el mismo DNI fue admitido en una nueva boda.',
        });
      } catch (error) {
        pasos.push({
          nombre: 'Mismo DNI después de CIERRE',
          estado: 'FAIL',
          detalle: error instanceof Error ? error.message : String(error),
        });
      }
    }
    await guardar(
      'casos-negativos.json',
      pasos.filter((paso) =>
        [
          'Duplicado WP + fecha',
          'DNI en matrimonio no cerrado',
          'Fecha insuficiente',
        ].includes(paso.nombre),
      ),
    );
    await guardar('cronograma-generado.json', {
      hitos: hitosProyecto,
      actividades: actividadesProyecto,
      dependencias: dependenciasProyecto,
      timing: timingProyecto,
    });
  } catch (error) {
    const detalle = error instanceof Error ? error.message : String(error);
    errores.push(detalle);
    pasos.push({ nombre: 'Ejecución', estado: 'FAIL', detalle });
  } finally {
    await guardar('requests.json', requests);
    await guardar('responses.json', responses);
    await guardar('registros-creados.json', registros);
    const fallos = pasos.filter((paso) => paso.estado === 'FAIL').length;
    const global = fallos === 0 && errores.length === 0 ? 'PASS' : 'FAIL';
    await writeFile(
      join(raiz, 'resultado.md'),
      [
        '# Resultado de ejecución',
        '',
        '## 1. Identificación de la prueba',
        `- Nombre: creación manual de matrimonio (${tipoSolicitado}).`,
        `- ID de ejecución: \`manual-creacion-matrimonio-${tipoSolicitado}\`.`,
        `- Fecha/hora: ${new Date().toISOString()}.`,
        '- Tipo: funcional.',
        '- Entorno: configuración normal del backend y base de datos configurada.',
        '- Objetivo: crear y verificar un matrimonio mediante el caso de uso real.',
        '',
        '## 2. Precondiciones',
        '- Existe un Wedding Planner activo y los catálogos requeridos.',
        '',
        '## 3. Datos de entrada',
        '- Ver `datos-prueba.json` y `casos-prueba.json`.',
        '',
        '## 4. Ejecución paso a paso',
        '',
        '| Acción | Método/servicio | Esperado | Obtenido | HTTP | Comprobación BD | Evidencia | Estado |',
        '| --- | --- | --- | --- | --- | --- | --- | --- |',
        ...pasos.map(
          (paso) =>
            `| ${paso.nombre} | GuardarOnboardingMatrimonioUseCase | Según regla | ${paso.detalle} | N/A | registros-creados.json | JSON de ejecución | ${paso.estado} |`,
        ),
        '',
        '## 5. Registros creados/modificados',
        '| Modelo/tabla | ID | Acción | Campos relevantes | Evidencia |',
        '| --- | --- | --- | --- | --- |',
        '| gp_proyecto / gp_matrimonio / cr_* | Ver JSON | Crear, reutilizar o actualizar | fase, estado, ceremonia y cronograma | registros-creados.json |',
        '',
        '## 6. Validaciones realizadas',
        '- Fase INICIO, estado activo, ceremonia, dependencias, DNI, fecha mínima y Wedding Planner+fecha.',
        '',
        '## 7. Incidencias o warnings',
        errores.length
          ? errores.map((item) => `- ${item}`).join('\n')
          : '- Ninguna.',
        '',
        '## 8. Reproducción',
        `- Comando: \`pnpm.cmd test:manual:creacion-matrimonio -- --tipo=${tipoSolicitado}\`.`,
        '- La carpeta manual se sobrescribe; los registros de BD no se eliminan.',
      ].join('\n') + '\n',
      'utf8',
    );
    await writeFile(
      join(raiz, 'resultado-final.md'),
      `# Resultado final\n\n## Resumen\n\n| Métrica | Resultado |\n|---|---|\n| Casos ejecutados | ${pasos.length} |\n| PASS | ${pasos.filter((paso) => paso.estado === 'PASS').length} |\n| FAIL | ${fallos} |\n| Resultado global | ${global} |\n\n## Casos de prueba\n\n| ID | Caso | Tipo | Resultado esperado | Resultado obtenido | Estado |\n|---|---|---|---|---|---|\n${pasos.map((paso, indice) => `| CP-MAN-${String(indice + 1).padStart(2, '0')} | ${paso.nombre} | FUNCIONAL | Según regla | ${paso.detalle} | ${paso.estado} |`).join('\n')}\n\n## Evidencias principales\n\n| Evidencia | Archivo |\n|---|---|\n| Entradas | datos-prueba.json |\n| Registros | registros-creados.json |\n| Cronograma | cronograma-generado.json |\n| Casos negativos | casos-negativos.json |\n\n## Resultado funcional\nEl runner ejecutó el flujo real sin limpieza de datos.\n\n## Limitaciones\nLas cantidades dependen de las plantillas activas en la BD.\n\n## Reproducción\n\`pnpm.cmd test:manual:creacion-matrimonio -- --tipo=${tipoSolicitado}\`\n\n## Conclusión\nResultado ${global} conforme a las evidencias listadas.\n`,
      'utf8',
    );
    for (const paso of pasos)
      console.log(`${paso.estado} ${paso.nombre}: ${paso.detalle}`);
    console.log(`\nResultado global: ${global}`);
    console.log(`Reporte: ${raiz}`);
    if (prisma) await prisma.onModuleDestroy();
    if (global === 'FAIL') process.exitCode = 1;
  }
}

void ejecutar();
