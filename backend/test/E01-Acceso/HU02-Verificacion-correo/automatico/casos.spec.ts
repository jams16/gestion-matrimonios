import {
  ContextoE01,
  ResultadoCaso,
  cliente,
  crearUsuarioPendiente,
  crearContextoE01,
  datosUnicos,
  ejecutarCaso,
  expirarRegistroPendiente,
  guardarEvidenciaHu,
  registrarYVerificar,
} from '../../soporte/contexto-e01';

describe('HU02 - Verificar correo electrónico', () => {
  let contexto: ContextoE01;
  const resultados: ResultadoCaso[] = [];
  beforeAll(async () => { contexto = await crearContextoE01(); });
  afterAll(async () => { await guardarEvidenciaHu('HU02-Verificacion-correo', resultados); await contexto.app.close(); });

  it('CP-E01-HU02-01 - genera mecanismo de verificación para una cuenta pendiente', async () => {
    await ejecutarCaso(resultados, 'CP-E01-HU02-01', async () => {
      const datos = datosUnicos('e01hu02pendiente');
      const respuesta = await cliente(contexto).post('/api/v1/auth/registro/solicitar').send({ nombres: 'Pendiente', apellidoPaterno: 'E01', correoElectronico: datos.correo });
      expect(respuesta.status).toBe(200);
      const mensaje = contexto.correo.registros.at(-1);
      expect(mensaje?.destinatario).toBe(datos.correo);
      expect(mensaje?.token).toMatch(/^\d{6}$/);
      throw new Error('El mecanismo real es un código de seis dígitos; CA006 exige un enlace único en el correo.');
    });
  });

  it('CP-E01-HU02-02 - confirma un código válido y crea la cuenta verificada', async () => {
    await ejecutarCaso(resultados, 'CP-E01-HU02-02', async () => {
      const cuenta = await registrarYVerificar(contexto, 'e01hu02valido');
      expect(cuenta.usuario.correoVerificado).toBe(true);
    });
  });

  it('CP-E01-HU02-03 - rechaza código inexistente y código ya utilizado', async () => {
    await ejecutarCaso(resultados, 'CP-E01-HU02-03', async () => {
      const api = cliente(contexto);
      await api.post('/api/v1/auth/registro/confirmar').send({ token: '000000' }).expect(400);
      const datos = datosUnicos('e01hu02usado');
      await api.post('/api/v1/auth/registro/solicitar').send({ nombres: 'Uso', apellidoPaterno: 'E01', correoElectronico: datos.correo }).expect(200);
      const token = contexto.correo.registros.at(-1)?.token;
      await api.post('/api/v1/auth/registro/confirmar').send({ token }).expect(200);
      await api.post('/api/v1/auth/registro/confirmar').send({ token }).expect(400);
      const expirado = datosUnicos('e01hu02expirado');
      await api.post('/api/v1/auth/registro/solicitar').send({ nombres: 'Expira', apellidoPaterno: 'E01', correoElectronico: expirado.correo }).expect(200);
      const tokenExpirado = contexto.correo.registros.at(-1)?.token;
      await expirarRegistroPendiente(contexto, expirado.correo);
      await api.post('/api/v1/auth/registro/confirmar').send({ token: tokenExpirado }).expect(400);
    });
  });

  it('CP-E01-HU02-04 - impide iniciar sesión a una cuenta sin correo verificado', async () => {
    await ejecutarCaso(resultados, 'CP-E01-HU02-04', async () => {
      const cuenta = await crearUsuarioPendiente(contexto, 'e01hu02pendientelogin');
      const respuesta = await cliente(contexto).post('/api/v1/auth/login').send({ usuarioOCorreo: cuenta.correo, contrasena: cuenta.contrasena });
      expect(respuesta.status).toBe(403);
      expect(respuesta.body.mensaje).toMatch(/verificar/i);
    });
  });

  it('CP-E01-HU02-05 - limita reenvíos consecutivos de verificación', async () => {
    await ejecutarCaso(resultados, 'CP-E01-HU02-05', async () => {
      const cuenta = await crearUsuarioPendiente(contexto, 'e01hu02reenvio');
      const antes = contexto.correo.verificaciones.length;
      await cliente(contexto).post('/api/v1/auth/verificar-correo/solicitar').send({ usuarioOCorreo: cuenta.correo }).expect(200);
      await cliente(contexto).post('/api/v1/auth/verificar-correo/solicitar').send({ usuarioOCorreo: cuenta.correo }).expect(200);
      expect(contexto.correo.verificaciones.length).toBeLessThanOrEqual(antes + 1);
    });
  });
});
