import { BadRequestException } from '@nestjs/common';

import {
  GestionarActividadesUseCase,
  GestionarDependenciasUseCase,
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

describe('HU21 - Dependencias', () => {
  const resultados: ResultadoE04[] = [];
  let repositorio: RepositorioCronogramaMemoria;
  let actividades: GestionarActividadesUseCase;
  let dependencias: GestionarDependenciasUseCase;

  beforeEach(() => {
    repositorio = new RepositorioCronogramaMemoria();
    actividades = new GestionarActividadesUseCase(repositorio);
    dependencias = new GestionarDependenciasUseCase(repositorio);
  });
  afterAll(() => guardarEvidenciaE04('HU21-Dependencias', resultados));

  async function crearActividad(nombre: string) {
    return actividades.crear(
      idProyectoE04,
      { nombre, fechaFin: '2027-06-10T18:00:00.000Z', prioridad: 'MEDIA' },
      idUsuarioE04,
    );
  }

  it('CP-E04-HU21-01 - CA100 y CA101 crea predecesora e impide ciclos', async () => {
    await ejecutarE04(resultados, 'CP-E04-HU21-01', async () => {
      const a = await crearActividad('Definir lista');
      const b = await crearActividad('Enviar invitaciones');
      await dependencias.crear(
        idProyectoE04,
        {
          idActividadPredecesora: String(a.idActividad),
          idActividadSucesora: String(b.idActividad),
        },
        idUsuarioE04,
      );
      await expect(
        dependencias.crear(
          idProyectoE04,
          {
            idActividadPredecesora: String(b.idActividad),
            idActividadSucesora: String(a.idActividad),
          },
          idUsuarioE04,
        ),
      ).rejects.toBeInstanceOf(BadRequestException);
    });
  });

  it('CP-E04-HU21-02 - CA102 elimina una dependencia establecida', async () => {
    await ejecutarE04(resultados, 'CP-E04-HU21-02', async () => {
      const a = await crearActividad('A');
      const b = await crearActividad('B');
      const creada = await dependencias.crear(
        idProyectoE04,
        {
          idActividadPredecesora: String(a.idActividad),
          idActividadSucesora: String(b.idActividad),
        },
        idUsuarioE04,
      );
      await expect(
        dependencias.eliminar(
          idProyectoE04,
          String(creada.idDependencia),
          idUsuarioE04,
        ),
      ).resolves.toEqual({ idDependencia: creada.idDependencia });
      await expect(
        dependencias.listar(idProyectoE04, idUsuarioE04),
      ).resolves.toEqual([]);
    });
  });

  it('CP-E04-HU21-03 - CA103 requiere validacion manual de la vista de relaciones', async () => {
    await ejecutarE04(resultados, 'CP-E04-HU21-03', async () => {
      await expect(
        dependencias.listar(idProyectoE04, idUsuarioE04),
      ).resolves.toEqual([]);
    });
  });

  it('CP-E04-HU21-04 - CA104 conserva la relacion al consultar actividades vinculadas', async () => {
    await ejecutarE04(resultados, 'CP-E04-HU21-04', async () => {
      const a = await crearActividad('A');
      const b = await crearActividad('B');
      await dependencias.crear(
        idProyectoE04,
        {
          idActividadPredecesora: String(a.idActividad),
          idActividadSucesora: String(b.idActividad),
        },
        idUsuarioE04,
      );
      expect(await dependencias.listar(idProyectoE04, idUsuarioE04)).toEqual([
        expect.objectContaining({
          idActividadPredecesora: a.idActividad,
          idActividadSucesora: b.idActividad,
        }),
      ]);
    });
  });
});
