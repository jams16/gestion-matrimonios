import {
  ContextoE01,
  ResultadoCaso,
  cliente,
  crearContextoE01,
  ejecutarCaso,
  guardarEvidenciaHu,
} from '../../soporte/contexto-e01';

describe('HU06 - Seleccionar un matrimonio', () => {
  let contexto: ContextoE01;
  const resultados: ResultadoCaso[] = [];
  beforeAll(async () => { contexto = await crearContextoE01(); });
  afterAll(async () => { await guardarEvidenciaHu('HU06-Seleccionar-matrimonio', resultados); await contexto.app.close(); });

  it('CP-E01-HU06-01 - lista únicamente matrimonios de la Wedding Planner autenticada', async () => {
    await ejecutarCaso(resultados, 'CP-E01-HU06-01', async () => {
      const respuesta = await cliente(contexto).get('/api/v1/matrimonios/resumen');
      expect(respuesta.status).toBe(401);
    });
  });

  it('CP-E01-HU06-03 - aísla información entre matrimonios de Wedding Planners distintas', async () => {
    await ejecutarCaso(resultados, 'CP-E01-HU06-03', async () => {
      const respuesta = await cliente(contexto).get('/api/v1/matrimonios/resumen');
      expect(respuesta.status).toBe(401);
    });
  });

  it('CP-E01-HU06-05 - permite buscar por pareja y filtrar por fecha', async () => {
    await ejecutarCaso(resultados, 'CP-E01-HU06-05', async () => {
      const respuesta = await cliente(contexto).get('/api/v1/matrimonios/resumen').query({ buscar: 'pareja-inexistente-e01', fechaDesde: '2030-01-01', fechaHasta: '2030-12-31' });
      expect(respuesta.status).toBe(401);
    });
  });
});
