import {
  GestionarActividadesUseCase,
  GestionarHitosUseCase,
} from '../../../../src/modules/cronograma/application/use-cases/gestionar-cronograma.use-cases';
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

describe('HU17 - Hitos', () => {
  const resultados: ResultadoE04[] = [];
  let repositorio: RepositorioCronogramaMemoria;
  let hitos: GestionarHitosUseCase;
  let actividades: GestionarActividadesUseCase;

  beforeEach(() => {
    repositorio = new RepositorioCronogramaMemoria();
    hitos = new GestionarHitosUseCase(repositorio);
    actividades = new GestionarActividadesUseCase(repositorio);
  });
  afterAll(() => guardarEvidenciaE04('HU17-Hitos', resultados));

  async function crearHito() {
    return hitos.crear(
      idProyectoE04,
      { nombre: 'Ceremonia lista', fechaObjetivo: '2027-07-01T00:00:00.000Z' },
      idUsuarioE04,
    );
  }

  it('CP-E04-HU17-01 - CA081 y CA082 registra y consulta hitos', async () => {
    await ejecutarE04(resultados, 'CP-E04-HU17-01', async () => {
      const creado = await crearHito();
      expect(await hitos.listar(idProyectoE04, idUsuarioE04, {})).toEqual([
        expect.objectContaining({
          idHito: creado.idHito,
          nombre: 'Ceremonia lista',
        }),
      ]);
    });
  });

  it('CP-E04-HU17-02 - CA083 edita un hito existente', async () => {
    await ejecutarE04(resultados, 'CP-E04-HU17-02', async () => {
      const creado = await crearHito();
      await hitos.actualizar(
        idProyectoE04,
        String(creado.idHito),
        {
          nombre: 'Ceremonia confirmada',
          fechaObjetivo: '2027-07-02T00:00:00.000Z',
        },
        idUsuarioE04,
      );
      expect(
        await repositorio.obtenerHito(String(creado.idHito)),
      ).toMatchObject({ nombre: 'Ceremonia confirmada' });
    });
  });

  it('CP-E04-HU17-03 - CA084 y CA085 vincula y muestra actividades del hito', async () => {
    await ejecutarE04(resultados, 'CP-E04-HU17-03', async () => {
      const hito = await crearHito();
      const actividad = await actividades.crear(
        idProyectoE04,
        {
          nombre: 'Confirmar musica',
          fechaFin: '2027-06-30T00:00:00.000Z',
          prioridad: 'MEDIA',
        },
        idUsuarioE04,
      );
      await hitos.asociarActividad(
        idProyectoE04,
        String(hito.idHito),
        String(actividad.idActividad),
        idUsuarioE04,
      );
      const listado = await hitos.listar(idProyectoE04, idUsuarioE04, {
        incluirActividades: true,
      });
      expect(listado[0]).toMatchObject({
        actividades: [
          expect.objectContaining({ idActividad: actividad.idActividad }),
        ],
      });
    });
  });
});
