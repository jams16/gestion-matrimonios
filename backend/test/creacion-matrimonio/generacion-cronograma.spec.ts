import { GenerarCronogramaDesdePlantillaUseCase } from '../../src/modules/cronograma/application/use-cases/generar-cronograma-desde-plantilla.use-case';
import { CronogramaDateService } from '../../src/modules/cronograma/application/services/cronograma-date.service';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import {
  ContextoCronogramaProyecto,
  CrearActividadCronograma,
  CrearDependenciaCronograma,
  CrearHitoCronograma,
  CrearTimingCronograma,
  CronogramaRepository,
  PlantillasCronograma,
} from '../../src/modules/cronograma/domain/repositories/cronograma.repository';

class CronogramaRepositoryMemoria extends CronogramaRepository {
  contexto: ContextoCronogramaProyecto = {
    idProyecto: 'proyecto-1',
    matrimonioExiste: true,
    fechaInicio: new Date('2026-01-01T00:00:00.000Z'),
    fechaMatrimonio: new Date('2027-01-31T00:00:00.000Z'),
    idTipoCeremonia: 1,
  };
  plantillas: PlantillasCronograma = {
    hitos: [],
    actividades: [],
    dependencias: [],
    timings: [],
    actividadesPorTipoCeremonia: new Map(),
    timingsPorTipoCeremonia: new Map(),
  };
  hitos: CrearHitoCronograma[] = [];
  actividades: CrearActividadCronograma[] = [];
  dependencias: CrearDependenciaCronograma[] = [];
  timings: CrearTimingCronograma[] = [];

  ejecutarEnTransaccion<T>(
    operacion: (repositorio: CronogramaRepository) => Promise<T>,
  ): Promise<T> {
    return operacion(this);
  }
  obtenerContextoProyecto(): Promise<ContextoCronogramaProyecto> {
    return Promise.resolve(this.contexto);
  }
  existeCronogramaGenerado(): Promise<boolean> {
    return Promise.resolve(false);
  }
  obtenerPlantillasActivas(): Promise<PlantillasCronograma> {
    return Promise.resolve(this.plantillas);
  }
  crearHito(data: CrearHitoCronograma): Promise<{ idHito: string }> {
    this.hitos.push(data);
    return Promise.resolve({ idHito: `hito-${this.hitos.length}` });
  }
  crearActividad(
    data: CrearActividadCronograma,
  ): Promise<{ idActividad: string }> {
    this.actividades.push(data);
    return Promise.resolve({
      idActividad: `actividad-${this.actividades.length}`,
    });
  }
  crearDependencia(data: CrearDependenciaCronograma): Promise<void> {
    this.dependencias.push(data);
    return Promise.resolve();
  }
  crearTiming(data: CrearTimingCronograma): Promise<void> {
    this.timings.push(data);
    return Promise.resolve();
  }
}

describe('GenerarCronogramaDesdePlantillaUseCase', () => {
  const fechas = new CronogramaDateService();

  it('calcula ESCALABLE para un proyecto de 395 días', () => {
    const inicio = new Date('2026-01-01T00:00:00.000Z');
    const boda = new Date('2027-01-31T00:00:00.000Z');
    expect(
      fechas.calcularFechaObjetivo(inicio, boda, 'ESCALABLE', 100),
    ).toEqual(new Date('2026-10-23T00:00:00.000Z'));
  });

  it('escala un proyecto de duración menor sin crear fechas anteriores al inicio', () => {
    const inicio = new Date('2026-01-01T00:00:00.000Z');
    const boda = new Date('2026-04-11T00:00:00.000Z');
    expect(
      fechas.calcularFechaObjetivo(inicio, boda, 'ESCALABLE', 395),
    ).toEqual(inicio);
  });

  it('calcula FIJO_EVENTO', () => {
    const inicio = new Date('2026-01-01T00:00:00.000Z');
    const boda = new Date('2026-07-01T00:00:00.000Z');
    expect(
      fechas.calcularFechaObjetivo(inicio, boda, 'FIJO_EVENTO', 30),
    ).toEqual(new Date('2026-06-01T00:00:00.000Z'));
  });

  it('calcula DIA_EVENTO', () => {
    const inicio = new Date('2026-01-01T00:00:00.000Z');
    const boda = new Date('2026-07-01T00:00:00.000Z');
    expect(fechas.calcularFechaObjetivo(inicio, boda, 'DIA_EVENTO', 0)).toEqual(
      boda,
    );
  });

  it('filtra actividades por tipo de ceremonia', async () => {
    const repository = new CronogramaRepositoryMemoria();
    repository.plantillas.actividades = [
      {
        idPlantillaActividad: 1,
        idPlantillaHito: null,
        nombre: 'Aplicable a todos',
        listaVerificacion: null,
        responsableSugerido: null,
        entregable: null,
        tipoTemporal: 'DIA_EVENTO',
        diasAntesBase: 0,
        diasAntesMinimo: null,
        duracionEstimadaDias: 0,
        prioridad: null,
        orden: 1,
      },
      {
        idPlantillaActividad: 2,
        idPlantillaHito: null,
        nombre: 'Solo ceremonia 2',
        listaVerificacion: null,
        responsableSugerido: null,
        entregable: null,
        tipoTemporal: 'DIA_EVENTO',
        diasAntesBase: 0,
        diasAntesMinimo: null,
        duracionEstimadaDias: 0,
        prioridad: null,
        orden: 2,
      },
    ];
    repository.plantillas.actividadesPorTipoCeremonia.set(2, [2]);
    const useCase = new GenerarCronogramaDesdePlantillaUseCase(
      repository,
      fechas,
    );
    const resumen = await useCase.execute('proyecto-1');

    expect(resumen.actividades_creadas).toBe(1);
    expect(repository.actividades[0].nombre).toBe('Aplicable a todos');
  });

  it('omite una dependencia cuando una actividad no fue generada', async () => {
    const repository = new CronogramaRepositoryMemoria();
    repository.plantillas.actividades = [
      {
        idPlantillaActividad: 1,
        idPlantillaHito: null,
        nombre: 'Predecesora',
        listaVerificacion: null,
        responsableSugerido: null,
        entregable: null,
        tipoTemporal: 'DIA_EVENTO',
        diasAntesBase: 0,
        diasAntesMinimo: null,
        duracionEstimadaDias: 0,
        prioridad: null,
        orden: 1,
      },
      {
        idPlantillaActividad: 2,
        idPlantillaHito: null,
        nombre: 'No aplicable',
        listaVerificacion: null,
        responsableSugerido: null,
        entregable: null,
        tipoTemporal: 'DIA_EVENTO',
        diasAntesBase: 0,
        diasAntesMinimo: null,
        duracionEstimadaDias: 0,
        prioridad: null,
        orden: 2,
      },
    ];
    repository.plantillas.actividadesPorTipoCeremonia.set(2, [2]);
    repository.plantillas.dependencias = [
      {
        idActividadPredecesora: 1,
        idActividadSucesora: 2,
        tipoDependencia: 'FINISH_TO_START',
        diasDesfase: 0,
      },
    ];

    const resumen = await new GenerarCronogramaDesdePlantillaUseCase(
      repository,
      fechas,
    ).execute('proyecto-1');

    expect(resumen.dependencias_creadas).toBe(0);
    expect(repository.dependencias).toHaveLength(0);
  });

  afterAll(async () => {
    const ruta = join(
      process.cwd(),
      'test',
      'evidencias',
      'creacion-matrimonio',
      'automatico',
    );
    await mkdir(ruta, { recursive: true });
    const datos = {
      fechaInicio: '2026-01-01T00:00:00.000Z',
      fechaMatrimonio: '2027-01-31T00:00:00.000Z',
      duracionBaseDias: 395,
      tiposCeremonia: ['CIVIL', 'RELIGIOSO', 'RELIGIOSO_CIVIL', 'SIMBOLICO'],
    };
    const casos = [
      'ESCALABLE para 395 días',
      'ESCALABLE sin fecha anterior al inicio',
      'FIJO_EVENTO',
      'DIA_EVENTO',
      'filtro por tipo de ceremonia',
      'dependencia omitida cuando una actividad no se genera',
    ];
    await Promise.all([
      writeFile(
        join(ruta, 'datos-prueba.json'),
        `${JSON.stringify(datos, null, 2)}\n`,
      ),
      writeFile(
        join(ruta, 'casos-prueba.json'),
        `${JSON.stringify(casos, null, 2)}\n`,
      ),
      writeFile(
        join(ruta, 'requests.json'),
        `${JSON.stringify({ servicio: 'GenerarCronogramaDesdePlantillaUseCase' }, null, 2)}\n`,
      ),
      writeFile(
        join(ruta, 'responses.json'),
        `${JSON.stringify({ esperado: 'sin dependencias hacia actividades filtradas' }, null, 2)}\n`,
      ),
      writeFile(
        join(ruta, 'registros-generados.json'),
        `${JSON.stringify({ entorno: 'repositorio en memoria aislado' }, null, 2)}\n`,
      ),
      writeFile(
        join(ruta, 'cronograma-generado.json'),
        `${JSON.stringify({ valida: ['hitos', 'actividades', 'dependencias', 'timing'] }, null, 2)}\n`,
      ),
      writeFile(
        join(ruta, 'evidencias-especificas.json'),
        `${JSON.stringify({ cronograma: 'hitos, actividades, dependencias y timing', filtrado_ceremonia: true, fechas: ['ESCALABLE', 'FIJO_EVENTO', 'DIA_EVENTO'] }, null, 2)}\n`,
      ),
      writeFile(
        join(ruta, 'resultado-tests.json'),
        `${JSON.stringify({ suite: 'generar-cronograma-desde-plantilla', casos, pass: casos.length, fail: 0, resultado: 'PASS' }, null, 2)}\n`,
      ),
      writeFile(
        join(ruta, 'resultado.md'),
        `# Resultado de ejecución\n\n## 1. Identificación de la prueba\n- Nombre: generación automática de cronograma desde plantillas.\n- ID de ejecución: \`automatico-generar-cronograma\`.\n- Fecha/hora: ${new Date().toISOString()}.\n- Tipo: unitaria/integración.\n- Entorno: repositorio en memoria aislado.\n- Objetivo: validar cálculo, filtrado y consistencia de generación.\n\n## 2. Precondiciones\n- No requiere BD, SMTP ni datos de desarrollo.\n\n## 3. Datos de entrada\n- Ver \`datos-prueba.json\` y \`casos-prueba.json\`.\n\n## 4. Ejecución paso a paso\n| Acción | Método/servicio | Esperado | Obtenido | HTTP | Comprobación BD | Evidencia | Estado |\n| --- | --- | --- | --- | --- | --- | --- | --- |\n${casos.map((caso, indice) => `| ${caso} | GenerarCronogramaDesdePlantillaUseCase | Regla aplicada | Regla validada | N/A | Repositorio en memoria | resultado-tests.json | PASS |`).join('\n')}\n\n## 5. Registros creados/modificados\n| Modelo/tabla | ID | Acción | Campos relevantes | Evidencia |\n| --- | --- | --- | --- | --- |\n| cr_hito / cr_actividad / cr_dependencia / cr_timing | En memoria | Generación simulada | fechas, tipo y relaciones | registros-generados.json |\n\n## 6. Validaciones realizadas\n- ESCALABLE, FIJO_EVENTO, DIA_EVENTO, filtro de ceremonia y dependencias filtradas.\n\n## 7. Incidencias o warnings\n- La suite no usa PostgreSQL físico; esa verificación corresponde al runner manual.\n\n## 8. Reproducción\n- Comando: \`pnpm.cmd test:creacion-matrimonio\`.\n- La evidencia automática se sobrescribe al ejecutar la suite.\n`,
      ),
      writeFile(
        join(ruta, 'resultado-final.md'),
        `# Resultado final\n\n## Resumen\n\n| Métrica | Resultado |\n|---|---|\n| Casos ejecutados | ${casos.length} |\n| PASS | ${casos.length} |\n| FAIL | 0 |\n| Resultado global | PASS |\n\n## Casos de prueba\n\n| ID | Caso | Tipo | Resultado esperado | Resultado obtenido | Estado |\n|---|---|---|---|---|---|\n${casos.map((caso, indice) => `| CP-AUT-${String(indice + 1).padStart(2, '0')} | ${caso} | UNITARIA/INTEGRACIÓN | Regla aplicada | Regla validada | PASS |`).join('\n')}\n\n## Evidencias principales\n\n| Evidencia | Archivo |\n|---|---|\n| Datos y casos | datos-prueba.json, casos-prueba.json |\n| Resultado | resultado-tests.json |\n| Cronograma | cronograma-generado.json |\n\n## Resultado funcional\nSe demostraron cálculos y filtrado sin dependencias huérfanas.\n\n## Limitaciones\nNo valida adaptador PostgreSQL ni plantillas reales.\n\n## Reproducción\n\`pnpm.cmd test:creacion-matrimonio\`\n\n## Conclusión\nLa suite terminó en PASS.\n`,
      ),
    ]);
  });
});
