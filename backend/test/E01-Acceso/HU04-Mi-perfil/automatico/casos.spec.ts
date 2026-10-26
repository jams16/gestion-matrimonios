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

describe('HU04 - Editar información del perfil', () => {
  let contexto: ContextoE01;
  const resultados: ResultadoCaso[] = [];
  beforeAll(async () => { contexto = await crearContextoE01(); });
  afterAll(async () => { await guardarEvidenciaHu('HU04-Mi-perfil', resultados); await contexto.app.close(); });

  it('CP-E01-HU04-01 - consulta los datos personales del perfil autenticado', async () => {
    await ejecutarCaso(resultados, 'CP-E01-HU04-01', async () => {
      const cuenta = await registrarYVerificar(contexto, 'e01hu04read');
      const login = await iniciarSesion(contexto, cuenta.correo, cuenta.contrasena);
      const respuesta = await cliente(contexto).get(`/api/v1/usuarios/${cuenta.usuario.idUsuario}`).set('Authorization', `Bearer ${login.body.data.accessToken}`);
      expect(respuesta.status).toBe(200);
      expect(respuesta.body.data).toHaveProperty('nombres');
    });
  });

  it('CP-E01-HU04-02 - actualiza nombres, apellidos, correo y teléfono del perfil', async () => {
    await ejecutarCaso(resultados, 'CP-E01-HU04-02', async () => {
      const cuenta = await registrarYVerificar(contexto, 'e01hu04edit');
      const login = await iniciarSesion(contexto, cuenta.correo, cuenta.contrasena);
      const respuesta = await cliente(contexto).patch(`/api/v1/usuarios/${cuenta.usuario.idUsuario}`).set('Authorization', `Bearer ${login.body.data.accessToken}`).send({ nombres: 'Editado', apellidoPaterno: 'Perfil', correoElectronico: 'perfil.editado@example.test', telefono: '999999999' });
      expect(respuesta.status).toBe(200);
    });
  });

  it('CP-E01-HU04-03 - rechaza datos personales obligatorios inválidos', async () => {
    await ejecutarCaso(resultados, 'CP-E01-HU04-03', async () => {
      const cuenta = await registrarYVerificar(contexto, 'e01hu04invalid');
      const login = await iniciarSesion(contexto, cuenta.correo, cuenta.contrasena);
      const respuesta = await cliente(contexto).patch(`/api/v1/usuarios/${cuenta.usuario.idUsuario}`).set('Authorization', `Bearer ${login.body.data.accessToken}`).send({ correoElectronico: 'correo-invalido' });
      expect(respuesta.status).toBe(400);
      expect(respuesta.body.mensaje).toMatch(/email/i);
    });
  });
});
