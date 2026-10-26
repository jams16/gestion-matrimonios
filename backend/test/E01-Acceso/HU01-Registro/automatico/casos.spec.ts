import {
  ContextoE01,
  ResultadoCaso,
  cliente,
  crearContextoE01,
  datosUnicos,
  ejecutarCaso,
  guardarEvidenciaHu,
  registrarYVerificar,
} from '../../soporte/contexto-e01';

describe('HU01 - Registrar una nueva cuenta', () => {
  let contexto: ContextoE01;
  const resultados: ResultadoCaso[] = [];

  beforeAll(async () => { contexto = await crearContextoE01(); });
  afterAll(async () => {
    await guardarEvidenciaHu('HU01-Registro', resultados);
    await contexto.app.close();
  });

  it('CP-E01-HU01-01 - registra correctamente una nueva cuenta Wedding Planner', async () => {
    await ejecutarCaso(resultados, 'CP-E01-HU01-01', async () => {
      const cuenta = await registrarYVerificar(contexto, 'e01hu01ok');
      expect(cuenta.usuario.tipoUsuario).toBe('PROJECT_MANAGER');
      expect(cuenta.usuario.correoVerificado).toBe(true);
      const acceso = await cliente(contexto)
        .get(`/api/v1/usuarios/${cuenta.usuario.idUsuario}`)
        .set('Authorization', `Bearer ${(await cliente(contexto).post('/api/v1/auth/login').send({ usuarioOCorreo: cuenta.correo, contrasena: cuenta.contrasena })).body.data.accessToken}`);
      expect(acceso.status).toBe(200);
    });
  });

  it.each([
    ['nombres vacío', { nombres: '', apellidoPaterno: 'E01', correoElectronico: 'campo@example.test' }],
    ['apellido vacío', { nombres: 'Prueba', apellidoPaterno: '', correoElectronico: 'campo@example.test' }],
    ['correo vacío', { nombres: 'Prueba', apellidoPaterno: 'E01', correoElectronico: '' }],
    ['correo inválido', { nombres: 'Prueba', apellidoPaterno: 'E01', correoElectronico: 'correo-invalido' }],
  ])('CP-E01-HU01-02 - rechaza %s', async (_nombre, cuerpo) => {
    await ejecutarCaso(resultados, 'CP-E01-HU01-02', async () => {
      const respuesta = await cliente(contexto).post('/api/v1/auth/registro/solicitar').send(cuerpo);
      expect(respuesta.status).toBe(400);
      expect(respuesta.body.data).toBeNull();
    });
  });

  it('CP-E01-HU01-03 - aplica política de contraseña y exige confirmación', async () => {
    await ejecutarCaso(resultados, 'CP-E01-HU01-03', async () => {
      const datos = datosUnicos('e01hu01pass');
      const api = cliente(contexto);
      await api.post('/api/v1/auth/registro/solicitar').send({ nombres: 'Prueba', apellidoPaterno: 'E01', correoElectronico: datos.correo }).expect(200);
      const token = contexto.correo.registros.at(-1)?.token;
      await api.post('/api/v1/auth/registro/confirmar').send({ token }).expect(200);
      for (const contrasena of ['Ab1#', 'abcdef1#', 'ABCDEF1#', 'Abcdefgh#']) {
        const respuesta = await api.post('/api/v1/auth/registro/finalizar').send({ token, usuario: `${datos.usuario}${contrasena.length}`, contrasena, nombreComercial: datos.nombreComercial });
        expect(respuesta.status).toBe(400);
      }
      const confirmacion = await api.post('/api/v1/auth/registro/finalizar').send({ token, usuario: datos.usuario, contrasena: datos.contrasena, confirmacionContrasena: 'Distinta#2026', nombreComercial: datos.nombreComercial });
      expect(confirmacion.status).toBe(400);
      throw new Error('La API no implementa un campo de confirmación de contraseña; el rechazo proviene de forbidNonWhitelisted y no de la regla CA002.');
    });
  });

  it('CP-E01-HU01-04 - rechaza correo ya registrado sin crear una segunda cuenta', async () => {
    await ejecutarCaso(resultados, 'CP-E01-HU01-04', async () => {
      const cuenta = await registrarYVerificar(contexto, 'e01hu01dup');
      const respuesta = await cliente(contexto).post('/api/v1/auth/registro/solicitar').send({ nombres: 'Otra', apellidoPaterno: 'Cuenta', correoElectronico: cuenta.correo });
      expect(respuesta.status).toBe(409);
      expect(respuesta.body.mensaje).toContain('correo');
    });
  });
});
