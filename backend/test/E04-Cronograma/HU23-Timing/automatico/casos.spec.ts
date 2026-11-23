import { GenerarTimingDesdePlantillaUseCase } from '../../../../src/modules/cronograma/application/use-cases/generar-timing-desde-plantilla.use-case';
import { GestionarTimingUseCase } from '../../../../src/modules/cronograma/application/use-cases/gestionar-cronograma.use-cases';
import { CronogramaRepository } from '../../../../src/modules/cronograma/domain/repositories/cronograma.repository';
import {
  ResultadoE04,
  ejecutarE04,
  guardarEvidenciaE04,
} from '../../soporte/contexto-e04';
import {
  idProyectoE04,
  idUsuarioE04,
  RepositorioCronogramaMemoria,
} from '../../soporte/repositorio-cronograma-memoria';

describe('HU23 - Timing', () => {
  const resultados: ResultadoE04[] = [];
  let repositorio: RepositorioCronogramaMemoria;
  let timing: GestionarTimingUseCase;
  beforeEach(() => {
    repositorio = new RepositorioCronogramaMemoria();
    timing = new GestionarTimingUseCase(repositorio);
  });
  afterAll(() => guardarEvidenciaE04('HU23-Timing', resultados));

  it('CP-E04-HU23-01 - CA110 y CA111 genera horarios en secuencia desde una hora inicial', async () => {
    await ejecutarE04(resultados, 'CP-E04-HU23-01', async () => {
      const creados: Record<string, unknown>[] = [];
      const repositorioGenerador = {
        ejecutarEnTransaccion: async (
          operacion: (repo: CronogramaRepository) => Promise<unknown>,
        ) => operacion(repositorioGenerador as unknown as CronogramaRepository),
        obtenerContextoProyecto: async () => ({
          idProyecto: idProyectoE04,
          matrimonioExiste: true,
          idMatrimonio: 'matrimonio-1',
          fechaInicio: new Date('2027-01-01'),
          fechaMatrimonio: new Date('2027-12-31T00:00:00.000Z'),
          idTipoCeremonia: 1,
        }),
        existeCronogramaGenerado: async () => true,
        existeTimingGenerado: async () => false,
        obtenerPlantillasActivas: async () => ({
          hitos: [],
          actividades: [],
          dependencias: [],
          checklist: [],
          hitosActividades: [],
          actividadesEdt: [],
          actividadesPorTipoCeremonia: new Map(),
          timingsPorTipoCeremonia: new Map(),
          timings: [
            {
              idPlantillaTiming: 1,
              actividad: 'Preparacion',
              tipoHorario: 'FLEXIBLE',
              tiempoExtraMinutos: 0,
              offsetInicioMinutos: 0,
              duracionMinutos: 30,
              responsableSugerido: null,
              listaVerificacion: [],
              orden: 1,
            },
            {
              idPlantillaTiming: 2,
              actividad: 'Ceremonia',
              tipoHorario: 'FLEXIBLE',
              tiempoExtraMinutos: 0,
              offsetInicioMinutos: null,
              duracionMinutos: 45,
              responsableSugerido: null,
              listaVerificacion: [],
              orden: 2,
            },
          ],
          timingDependencias: [
            {
              idTimingPredecesor: 1,
              idTimingSucesor: 2,
              tipoDependencia: 'FINISH_TO_START',
              minutosDesfase: 0,
            },
          ],
        }),
        crearTiming: async (data: Record<string, unknown>) => {
          const creado = { idTiming: `timing-${creados.length + 1}`, ...data };
          creados.push(creado);
          return creado;
        },
        crearTimingDependencia: async () => undefined,
      };
      const resumen = await new GenerarTimingDesdePlantillaUseCase(
        repositorioGenerador as unknown as CronogramaRepository,
      ).execute(idProyectoE04, '10:00');
      expect(resumen).toEqual({
        elementos_timing_creados: 2,
        dependencias_timing_creadas: 1,
      });
      expect(creados[1].fechaHoraInicio).toEqual(creados[0].fechaHoraFin);
    });
  });

  it('CP-E04-HU23-02 - CA112 agrega una actividad manual al timing', async () => {
    await ejecutarE04(resultados, 'CP-E04-HU23-02', async () => {
      const creado = await timing.crear(
        idProyectoE04,
        {
          actividad: 'Fotos familiares',
          fechaHoraInicio: '2027-12-31T16:00:00.000Z',
          fechaHoraFin: '2027-12-31T16:30:00.000Z',
          duracionMinutos: 30,
        },
        idUsuarioE04,
      );
      expect(creado).toMatchObject({
        actividad: 'Fotos familiares',
        duracionMinutos: 30,
      });
    });
  });

  it('CP-E04-HU23-03 - CA113 actualiza inicio y duracion de una actividad', async () => {
    await ejecutarE04(resultados, 'CP-E04-HU23-03', async () => {
      const creado = await timing.crear(
        idProyectoE04,
        {
          actividad: 'Brindis',
          fechaHoraInicio: '2027-12-31T18:00:00.000Z',
          fechaHoraFin: '2027-12-31T18:15:00.000Z',
          duracionMinutos: 15,
        },
        idUsuarioE04,
      );
      await timing.actualizar(
        idProyectoE04,
        String(creado.idTiming),
        {
          fechaHoraInicio: '2027-12-31T18:30:00.000Z',
          fechaHoraFin: '2027-12-31T18:50:00.000Z',
          duracionMinutos: 20,
        },
        idUsuarioE04,
      );
      expect(
        await repositorio.obtenerTiming(String(creado.idTiming)),
      ).toMatchObject({ duracionMinutos: 20 });
    });
  });

  it('CP-E04-HU23-04 - CA114 consulta el timing actualizado', async () => {
    await ejecutarE04(resultados, 'CP-E04-HU23-04', async () => {
      await timing.crear(
        idProyectoE04,
        {
          actividad: 'Inicio ceremonia',
          fechaHoraInicio: '2027-12-31T17:00:00.000Z',
          fechaHoraFin: '2027-12-31T17:30:00.000Z',
          duracionMinutos: 30,
        },
        idUsuarioE04,
      );
      await expect(
        timing.listar(idProyectoE04, idUsuarioE04, {}),
      ).resolves.toEqual([
        expect.objectContaining({
          actividad: 'Inicio ceremonia',
          duracionMinutos: 30,
        }),
      ]);
    });
  });
});
