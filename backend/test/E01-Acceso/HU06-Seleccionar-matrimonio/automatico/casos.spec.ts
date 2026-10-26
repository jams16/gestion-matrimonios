import {
  ContextoE01,
  ResultadoCaso,
  cliente,
  crearBorradorMatrimonio,
  crearContextoE01,
  ejecutarCaso,
  guardarEvidenciaHu,
  iniciarSesion,
  registrarYVerificar,
} from '../../soporte/contexto-e01';

describe('HU06 - Seleccionar un matrimonio', () => {
  let contexto: ContextoE01;
  const resultados: ResultadoCaso[] = [];
  beforeAll(async () => { contexto = await crearContextoE01(); });
  afterAll(async () => { await guardarEvidenciaHu('HU06-Seleccionar-matrimonio', resultados); await contexto.app.close(); });

  it('CP-E01-HU06-01 - lista únicamente matrimonios de la Wedding Planner autenticada', async () => {
    await ejecutarCaso(resultados, 'CP-E01-HU06-01', async () => {
      const wpA = await registrarYVerificar(contexto, 'e01hu06listaA');
      const wpB = await registrarYVerificar(contexto, 'e01hu06listaB');
      const loginA = await iniciarSesion(contexto, wpA.correo, wpA.contrasena);
      const loginB = await iniciarSesion(contexto, wpB.correo, wpB.contrasena);
      const bodaA = await crearBorradorMatrimonio(contexto, loginA.body.data.accessToken, 'e01hu06listaA');
      const bodaB = await crearBorradorMatrimonio(contexto, loginB.body.data.accessToken, 'e01hu06listaB');
      const respuesta = await cliente(contexto).get('/api/v1/matrimonios/resumen').set('Authorization', `Bearer ${loginA.body.data.accessToken}`);
      expect(respuesta.status).toBe(200);
      const proyectos = respuesta.body.data.map((item: { idProyecto: string }) => item.idProyecto);
      expect(proyectos).toContain(bodaA.proyecto.idProyecto);
      expect(proyectos).not.toContain(bodaB.proyecto.idProyecto);
    });
  });

  it('CP-E01-HU06-03 - aísla información entre matrimonios de Wedding Planners distintas', async () => {
    await ejecutarCaso(resultados, 'CP-E01-HU06-03', async () => {
      const wpA = await registrarYVerificar(contexto, 'e01hu06aislaA');
      const wpB = await registrarYVerificar(contexto, 'e01hu06aislaB');
      const loginA = await iniciarSesion(contexto, wpA.correo, wpA.contrasena);
      const loginB = await iniciarSesion(contexto, wpB.correo, wpB.contrasena);
      const bodaA = await crearBorradorMatrimonio(contexto, loginA.body.data.accessToken, 'e01hu06aislaA');
      const bodaB = await crearBorradorMatrimonio(contexto, loginB.body.data.accessToken, 'e01hu06aislaB');
      const respuesta = await cliente(contexto).get('/api/v1/matrimonios/resumen').set('Authorization', `Bearer ${loginA.body.data.accessToken}`);
      expect(respuesta.status).toBe(200);
      const proyectos = respuesta.body.data.map((item: { idProyecto: string }) => item.idProyecto);
      expect(proyectos).toContain(bodaA.proyecto.idProyecto);
      expect(proyectos).not.toContain(bodaB.proyecto.idProyecto);
    });
  });

  it('CP-E01-HU06-05 - permite buscar por pareja y filtrar por fecha', async () => {
    await ejecutarCaso(resultados, 'CP-E01-HU06-05', async () => {
      const wpA = await registrarYVerificar(contexto, 'e01hu06filtroA');
      const wpB = await registrarYVerificar(contexto, 'e01hu06filtroB');
      const loginA = await iniciarSesion(contexto, wpA.correo, wpA.contrasena);
      const loginB = await iniciarSesion(contexto, wpB.correo, wpB.contrasena);
      const bodaA = await crearBorradorMatrimonio(contexto, loginA.body.data.accessToken, 'e01hu06filtroA');
      const bodaB = await crearBorradorMatrimonio(contexto, loginB.body.data.accessToken, 'e01hu06filtroB');
      const respuesta = await cliente(contexto).get('/api/v1/matrimonios/resumen').set('Authorization', `Bearer ${loginA.body.data.accessToken}`).query({ buscar: 'e01hu06filtroA', fechaDesde: '2030-01-01', fechaHasta: '2030-12-31' });
      expect(respuesta.status).toBe(200);
      const proyectos = respuesta.body.data.map((item: { idProyecto: string }) => item.idProyecto);
      expect(proyectos).toContain(bodaA.proyecto.idProyecto);
      expect(proyectos).not.toContain(bodaB.proyecto.idProyecto);
    });
  });
});
