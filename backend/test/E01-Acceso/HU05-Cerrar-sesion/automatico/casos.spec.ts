import {
  ContextoE01,
  ResultadoCaso,
  cliente,
  crearContextoE01,
  ejecutarCaso,
  guardarEvidenciaHu,
  iniciarSesion,
  registrarYVerificar,
} from '../../soporte/contexto-e01';

describe('HU05 - Cerrar sesión de forma segura', () => {
  let contexto: ContextoE01;
  const resultados: ResultadoCaso[] = [];
  beforeAll(async () => { contexto = await crearContextoE01(); });
  afterAll(async () => { await guardarEvidenciaHu('HU05-Cerrar-sesion', resultados); await contexto.app.close(); });

  it('CP-E01-HU05-02 - revoca refresh token e impide reutilizar el access token previo', async () => {
    await ejecutarCaso(resultados, 'CP-E01-HU05-02', async () => {
      const cuenta = await registrarYVerificar(contexto, 'e01hu05logout');
      const login = await iniciarSesion(contexto, cuenta.correo, cuenta.contrasena);
      const { accessToken, refreshToken } = login.body.data;
      await cliente(contexto).post('/api/v1/auth/logout').send({ refreshToken }).expect(200);
      await cliente(contexto).post('/api/v1/auth/refresh').send({ refreshToken }).expect(401);
      const accesoPosterior = await cliente(contexto).get(`/api/v1/usuarios/${cuenta.usuario.idUsuario}`).set('Authorization', `Bearer ${accessToken}`);
      expect(accesoPosterior.status).toBe(401);
    });
  });

  it('CP-E01-HU05-03 - invalida la sesión por inactividad configurada', async () => {
    await ejecutarCaso(resultados, 'CP-E01-HU05-03', async () => {
      expect(process.env.SESSION_INACTIVITY_TIMEOUT).toMatch(/^\d+[smhd]$/);
    });
  });
});
