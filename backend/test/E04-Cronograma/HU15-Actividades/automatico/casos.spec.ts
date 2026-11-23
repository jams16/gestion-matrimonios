import { GestionarActividadesUseCase } from '../../../../src/modules/cronograma/application/use-cases/gestionar-cronograma.use-cases';
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

describe('HU15 - Actividades y checklist', () => {
  const resultados: ResultadoE04[] = [];
  let repositorio: RepositorioCronogramaMemoria;
  let caso: GestionarActividadesUseCase;

  beforeEach(() => {
    repositorio = new RepositorioCronogramaMemoria();
    caso = new GestionarActividadesUseCase(repositorio);
  });
  afterAll(() => guardarEvidenciaE04('HU15-Actividades', resultados));

  async function crearActividad(nombre = 'Confirmar flores') {
    return caso.crear(
      idProyectoE04,
      {
        nombre,
        fechaInicio: '2027-06-01T09:00:00.000Z',
        fechaFin: '2027-06-03T18:00:00.000Z',
        prioridad: 'ALTA',
        idUsuarioResponsable: idUsuarioE04,
      },
      idUsuarioE04,
    );
  }

  it('CP-E04-HU15-01 - CA071 y CA072 registra y lista una actividad del matrimonio', async () => {
    await ejecutarE04(resultados, 'CP-E04-HU15-01', async () => {
      const creada = await crearActividad();
      const actividades = await caso.listar(idProyectoE04, idUsuarioE04, {});
      expect(creada).toMatchObject({
        idProyecto: idProyectoE04,
        nombre: 'Confirmar flores',
        estado: 'PENDIENTE',
      });
      expect(actividades).toEqual([
        expect.objectContaining({ idActividad: creada.idActividad }),
      ]);
    });
  });

  it('CP-E04-HU15-02 - CA073 agrega checklist a una actividad', async () => {
    await ejecutarE04(resultados, 'CP-E04-HU15-02', async () => {
      const actividad = await crearActividad();
      const item = await caso.crearChecklist(
        idProyectoE04,
        String(actividad.idActividad),
        { descripcion: 'Solicitar cotizacion', obligatorio: true },
        idUsuarioE04,
      );
      expect(item).toMatchObject({
        idActividad: actividad.idActividad,
        descripcion: 'Solicitar cotizacion',
        obligatorio: true,
      });
    });
  });

  it('CP-E04-HU15-03 - CA074 edita actividad y elemento de checklist', async () => {
    await ejecutarE04(resultados, 'CP-E04-HU15-03', async () => {
      const actividad = await crearActividad();
      const item = await caso.crearChecklist(
        idProyectoE04,
        String(actividad.idActividad),
        { descripcion: 'Revisar propuesta' },
        idUsuarioE04,
      );
      await caso.actualizar(
        idProyectoE04,
        String(actividad.idActividad),
        { nombre: 'Confirmar arreglo floral' },
        idUsuarioE04,
      );
      await caso.actualizarChecklist(
        idProyectoE04,
        String(actividad.idActividad),
        String(item.idChecklist),
        { descripcion: 'Aprobar propuesta', completado: true },
        idUsuarioE04,
      );
      expect(
        await repositorio.obtenerActividad(String(actividad.idActividad)),
      ).toMatchObject({ nombre: 'Confirmar arreglo floral' });
      expect(
        (
          await caso.listarChecklist(
            idProyectoE04,
            String(actividad.idActividad),
            idUsuarioE04,
          )
        )[0],
      ).toMatchObject({ descripcion: 'Aprobar propuesta', completado: true });
    });
  });

  it('CP-E04-HU15-04 - CA075 conserva separados los checklist de cada actividad', async () => {
    await ejecutarE04(resultados, 'CP-E04-HU15-04', async () => {
      const primera = await crearActividad('Actividad A');
      const segunda = await crearActividad('Actividad B');
      await caso.crearChecklist(
        idProyectoE04,
        String(primera.idActividad),
        { descripcion: 'Item A' },
        idUsuarioE04,
      );
      await caso.crearChecklist(
        idProyectoE04,
        String(segunda.idActividad),
        { descripcion: 'Item B' },
        idUsuarioE04,
      );
      expect(
        await caso.listarChecklist(
          idProyectoE04,
          String(primera.idActividad),
          idUsuarioE04,
        ),
      ).toEqual([expect.objectContaining({ descripcion: 'Item A' })]);
      expect(
        await caso.listarChecklist(
          idProyectoE04,
          String(segunda.idActividad),
          idUsuarioE04,
        ),
      ).toEqual([expect.objectContaining({ descripcion: 'Item B' })]);
    });
  });
});
