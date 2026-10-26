import {
  ContextoE01,
  ResultadoCaso,
  cliente,
  crearUsuarioPendiente,
  crearContextoE01,
  ejecutarCaso,
  guardarEvidenciaHu,
  iniciarSesion,
  registrarYVerificar,
} from '../../soporte/contexto-e01';

describe('HU03 - Iniciar sesión', () => {
  let contexto: ContextoE01;
  const resultados: ResultadoCaso[] = [];
  beforeAll(async () => { contexto = await crearContextoE01(); });
  afterAll(async () => { await guardarEvidenciaHu('HU03-Inicio-sesion', resultados); await contexto.app.close(); });

  it('CP-E01-HU03-01 - inicia sesión con cuenta verificada y entrega sesión/rol', async () => {
    await ejecutarCaso(resultados, 'CP-E01-HU03-01', async () => {
      const cuenta = await registrarYVerificar(contexto, 'e01hu03ok');
      const respuesta = await iniciarSesion(contexto, cuenta.correo, cuenta.contrasena);
      expect(respuesta.status).toBe(200);
      expect(respuesta.body.data.accessToken).toEqual(expect.any(String));
      expect(respuesta.body.data.refreshToken).toEqual(expect.any(String));
      expect(respuesta.body.data.usuario.tipoUsuario).toBe('PROJECT_MANAGER');
    });
  });

  it('CP-E01-HU03-02 - devuelve el mismo mensaje genérico para credenciales inválidas', async () => {
    await ejecutarCaso(resultados, 'CP-E01-HU03-02', async () => {
      const cuenta = await registrarYVerificar(contexto, 'e01hu03bad');
      const [incorrecta, inexistente] = await Promise.all([
        iniciarSesion(contexto, cuenta.correo, 'Incorrecta#2026'),
        iniciarSesion(contexto, 'no-existe@example.test', 'Incorrecta#2026'),
      ]);
      expect(incorrecta.status).toBe(401);
      expect(inexistente.status).toBe(401);
      expect(incorrecta.body.mensaje).toBe(inexistente.body.mensaje);
    });
  });

  it('CP-E01-HU03-03 - bloquea login de una cuenta pendiente de verificación', async () => {
    await ejecutarCaso(resultados, 'CP-E01-HU03-03', async () => {
      const cuenta = await crearUsuarioPendiente(contexto, 'e01hu03pendiente');
      const respuesta = await iniciarSesion(contexto, cuenta.correo, cuenta.contrasena);
      expect(respuesta.status).toBe(403);
      expect(respuesta.body.mensaje).toMatch(/verificar/i);
    });
  });

  it('CP-E01-HU03-04 - rota refresh token mientras la sesión sigue vigente', async () => {
    await ejecutarCaso(resultados, 'CP-E01-HU03-04', async () => {
      const cuenta = await registrarYVerificar(contexto, 'e01hu03refresh');
      const login = await iniciarSesion(contexto, cuenta.usuario.usuario, cuenta.contrasena);
      expect(login.status).toBe(200);
      const refresh = await cliente(contexto).post('/api/v1/auth/refresh').send({ refreshToken: login.body.data.refreshToken });
      expect(refresh.status).toBe(200);
      expect(refresh.body.data.refreshToken).not.toBe(login.body.data.refreshToken);
    });
  });
});
