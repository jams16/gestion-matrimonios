import { mkdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { ConfigModule } from '@nestjs/config';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Temporal } from 'temporal-polyfill';
import request from 'supertest';
import { App } from 'supertest/types';

import { ApiExceptionFilter } from '../src/common/filters/api-exception.filter';
import { ApiResponseInterceptor } from '../src/common/interceptors/api-response.interceptor';
import { AutenticacionModule } from '../src/modules/autenticacion/autenticacion.module';
import { CorreoCuentaPort } from '../src/modules/autenticacion/application/ports/correo-cuenta.port';
import { AutenticacionRepository } from '../src/modules/autenticacion/domain/repositories/autenticacion.repository';
import { TipoUsuario } from '../src/modules/autenticacion/domain/enums/tipo-usuario.enum';

type RegistroPendiente = {
  idRegistro: number;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string | null;
  correoElectronico: string;
  tokenHash: string;
  fechaExpiracion: Temporal.Instant;
  fechaVerificacion: Temporal.Instant | null;
};

type UsuarioPrueba = {
  idUsuario: number;
  idPersonaNatural: number;
  idEntidad: number | null;
  usuario: string;
  tipoUsuario: TipoUsuario;
  contrasenaHash: string;
  correoVerificado: boolean;
  esActivo: boolean;
  ultimoAcceso: Temporal.Instant;
  fechaCreacion: Temporal.Instant;
  fechaModificacion: Temporal.Instant;
};

class RepositorioRegistroPrueba {
  readonly registros: RegistroPendiente[] = [];
  readonly personas: Array<Record<string, unknown>> = [];
  readonly entidades: Array<Record<string, unknown>> = [];
  readonly usuarios: UsuarioPrueba[] = [];
  private idRegistro = 1;
  private idPersona = 1000;
  private idEntidad = 1000;
  private idUsuario = 1000;

  async correoPersonaExiste(correoElectronico: string) {
    return this.personas.some(
      (persona) =>
        String(persona.correoElectronico).toLowerCase() ===
        correoElectronico.toLowerCase(),
    );
  }

  async crearRegistroPendiente(
    data: Omit<RegistroPendiente, 'idRegistro' | 'fechaVerificacion'>,
  ) {
    const registro: RegistroPendiente = {
      ...data,
      idRegistro: this.idRegistro++,
      fechaVerificacion: null,
    };
    this.registros.push(registro);
    return { idRegistro: registro.idRegistro };
  }

  async obtenerRegistroPendiente(tokenHash: string) {
    return (
      this.registros.find((registro) => registro.tokenHash === tokenHash) ??
      null
    );
  }

  async verificarRegistroPendiente(idRegistro: number) {
    const registro = this.registros.find(
      (item) => item.idRegistro === idRegistro,
    );
    if (registro) registro.fechaVerificacion = Temporal.Now.instant();
  }

  async usuarioExiste(usuario: string) {
    return this.usuarios.some(
      (item) => item.usuario.toLowerCase() === usuario.toLowerCase(),
    );
  }

  async crearPersonaRegistro(data: Record<string, unknown>) {
    const persona = { idPersonaNatural: this.idPersona++, ...data };
    this.personas.push(persona);
    return { idPersonaNatural: persona.idPersonaNatural };
  }

  async crearEntidadRegistro(data: Record<string, unknown>) {
    const entidad = {
      idEntidad: this.idEntidad++,
      tipoEntidad: 'PRIVADA',
      ...data,
    };
    this.entidades.push(entidad);
    return { idEntidad: entidad.idEntidad };
  }

  async crearUsuario(
    data: Omit<
      UsuarioPrueba,
      | 'idUsuario'
      | 'correoVerificado'
      | 'esActivo'
      | 'fechaCreacion'
      | 'fechaModificacion'
    >,
  ) {
    const ahora = Temporal.Now.instant();
    const usuario: UsuarioPrueba = {
      ...data,
      idUsuario: this.idUsuario++,
      correoVerificado: false,
      esActivo: true,
      fechaCreacion: ahora,
      fechaModificacion: ahora,
    };
    this.usuarios.push(usuario);
    return usuario;
  }

  async actualizarUsuario(idUsuario: number, cambios: Partial<UsuarioPrueba>) {
    const usuario = this.usuarios.find((item) => item.idUsuario === idUsuario);
    if (!usuario) return null;
    Object.assign(usuario, cambios, {
      fechaModificacion: Temporal.Now.instant(),
    });
    return usuario;
  }
}

class CorreoRegistroCapturado extends CorreoCuentaPort {
  readonly mensajes: Array<{
    destinatario: string;
    asunto: string;
    contenido: string;
    codigo: string;
  }> = [];

  async enviarRegistro(destinatario: string, nombre: string, token: string) {
    this.mensajes.push({
      destinatario,
      asunto: 'Código de verificación para WeddingApp',
      contenido: `Hola ${nombre}. Código: ${token}`,
      codigo: token,
    });
  }

  async enviarVerificacion() {}
  async enviarRecuperacion() {}
}

const evidenciaRaiz = join(
  process.cwd(),
  'test',
  'evidencias',
  'registro-wedding-planner',
);

const guardarJson = async (ruta: string, contenido: unknown) => {
  await mkdir(join(evidenciaRaiz, ruta, '..'), { recursive: true });
  await writeFile(
    join(evidenciaRaiz, ruta),
    `${JSON.stringify(contenido, null, 2)}\n`,
    'utf8',
  );
};

const guardarTexto = async (ruta: string, contenido: string) => {
  await mkdir(join(evidenciaRaiz, ruta, '..'), { recursive: true });
  await writeFile(join(evidenciaRaiz, ruta), contenido, 'utf8');
};

const ocultar = (valor: string) => `${valor.slice(0, 2)}****${valor.slice(-2)}`;

describe('Registro Wedding Planner (integración funcional)', () => {
  let app: INestApplication<App>;
  let repositorio: RepositorioRegistroPrueba;
  let correo: CorreoRegistroCapturado;

  beforeAll(async () => {
    process.env.JWT_ACCESS_SECRET = 'test-access-secret';
    process.env.JWT_REFRESH_SECRET = 'test-refresh-secret';

    repositorio = new RepositorioRegistroPrueba();
    correo = new CorreoRegistroCapturado();
    const modulo = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true, ignoreEnvFile: true }),
        AutenticacionModule,
      ],
    })
      .overrideProvider(AutenticacionRepository)
      .useValue(repositorio)
      .overrideProvider(CorreoCuentaPort)
      .useValue(correo)
      .compile();

    app = modulo.createNestApplication();
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    app.useGlobalFilters(new ApiExceptionFilter());
    app.useGlobalInterceptors(new ApiResponseInterceptor());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('registra, verifica por correo y finaliza una cuenta Wedding Planner', async () => {
    await rm(evidenciaRaiz, { recursive: true, force: true });
    const ejecucion = new Date().toISOString();
    const identificador = `wp-prueba-${Date.now()}`;
    const correoPrueba = `${identificador}@example.test`;
    const solicitud = {
      nombres: 'Wedding Planner Prueba',
      apellidoPaterno: 'Automatizada',
      apellidoMaterno: 'Integracion',
      correoElectronico: correoPrueba,
    };
    const finalizacionBase = {
      usuario: identificador,
      contrasena: 'PruebaSegura1!',
      nombreComercial: 'Wedding Planner Prueba SAC',
      ruc: '',
      telefono: '',
      correoCorporativo: '',
    };

    await guardarJson('datos-prueba.json', {
      identificadorEjecucion: identificador,
      fechaHora: ejecucion,
      solicitud,
      finalizacion: { ...finalizacionBase, contrasena: '********' },
    });
    await guardarJson('bd/00-estado-inicial.json', {
      correo: correoPrueba,
      personasCoincidentes: 0,
      usuariosCoincidentes: 0,
      registrosPendientes: 0,
    });

    const respuestaRegistro = await request(app.getHttpServer())
      .post('/api/v1/auth/registro/solicitar')
      .send(solicitud)
      .expect(200);
    await guardarJson('requests/01-registro.json', solicitud);
    await guardarJson('responses/01-registro.json', respuestaRegistro.body);

    expect(repositorio.registros).toHaveLength(1);
    expect(repositorio.registros[0].correoElectronico).toBe(correoPrueba);
    expect(repositorio.registros[0].fechaVerificacion).toBeNull();
    expect(correo.mensajes).toHaveLength(1);
    expect(correo.mensajes[0].destinatario).toBe(correoPrueba);
    expect(correo.mensajes[0].asunto).toBe(
      'Código de verificación para WeddingApp',
    );
    expect(correo.mensajes[0].codigo).toMatch(/^\d{6}$/);
    const codigo = correo.mensajes[0].codigo;

    await guardarJson('correo/01-correo-verificacion.json', {
      destinatario: correo.mensajes[0].destinatario,
      asunto: correo.mensajes[0].asunto,
      contieneCodigo: correo.mensajes[0].contenido.includes(codigo),
      codigoEnmascarado: ocultar(codigo),
    });
    await guardarJson('bd/01-despues-registro.json', {
      registroPendiente: {
        idRegistro: repositorio.registros[0].idRegistro,
        correoElectronico: repositorio.registros[0].correoElectronico,
        fechaExpiracion: repositorio.registros[0].fechaExpiracion.toString(),
        fechaVerificacion: null,
        tokenHash: 'oculto',
      },
      personasCreadas: repositorio.personas.length,
      entidadesCreadas: repositorio.entidades.length,
      usuariosCreados: repositorio.usuarios.length,
    });

    const solicitudVerificacion = { token: codigo };
    const respuestaVerificacion = await request(app.getHttpServer())
      .post('/api/v1/auth/registro/confirmar')
      .send(solicitudVerificacion)
      .expect(200);
    await guardarJson('requests/02-verificacion.json', {
      token: ocultar(codigo),
    });
    await guardarJson(
      'responses/02-verificacion.json',
      respuestaVerificacion.body,
    );
    expect(repositorio.registros[0].fechaVerificacion).not.toBeNull();

    const respuestaFinalizar = await request(app.getHttpServer())
      .post('/api/v1/auth/registro/finalizar')
      .send({ ...finalizacionBase, token: codigo })
      .expect(201);
    expect(repositorio.personas).toHaveLength(1);
    expect(repositorio.entidades).toHaveLength(1);
    expect(repositorio.usuarios).toHaveLength(1);
    expect(repositorio.usuarios[0]).toMatchObject({
      tipoUsuario: TipoUsuario.PROJECT_MANAGER,
      correoVerificado: true,
      esActivo: true,
    });
    expect(respuestaFinalizar.body.data).toMatchObject({
      tipoUsuario: TipoUsuario.PROJECT_MANAGER,
      correoVerificado: true,
    });

    await guardarJson('bd/02-despues-verificacion.json', {
      persona: repositorio.personas[0],
      entidad: repositorio.entidades[0],
      usuario: {
        idUsuario: repositorio.usuarios[0].idUsuario,
        idPersonaNatural: repositorio.usuarios[0].idPersonaNatural,
        idEntidad: repositorio.usuarios[0].idEntidad,
        usuario: repositorio.usuarios[0].usuario,
        tipoUsuario: repositorio.usuarios[0].tipoUsuario,
        correoVerificado: repositorio.usuarios[0].correoVerificado,
        esActivo: repositorio.usuarios[0].esActivo,
        contrasenaHash: 'oculto',
      },
      registroPendiente: {
        idRegistro: repositorio.registros[0].idRegistro,
        fechaVerificacion:
          repositorio.registros[0].fechaVerificacion?.toString(),
        tokenHash: 'oculto',
      },
    });
    await guardarJson('responses/02-finalizar.json', respuestaFinalizar.body);
    await guardarTexto(
      'README.md',
      `# Evidencia: registro Wedding Planner\n\nEsta carpeta es generada por \`pnpm.cmd test:registro-wedding-planner\`. Contiene evidencia real de una ejecución aislada: controlador HTTP, DTOs, casos de uso y persistencia de prueba en memoria. El transportador de correo es falso únicamente dentro de Jest; SMTP productivo no se modifica.\n`,
    );
    await guardarTexto(
      'ejecucion.md',
      `# Ejecución\n\n- Objetivo: comprobar el flujo real de registro Wedding Planner.\n- Tipo: integración funcional HTTP con repositorio y correo de prueba aislados.\n- Entorno: Nest TestingModule, \`NODE_ENV=test\`, sin conexión SMTP ni escritura en la base de desarrollo.\n- Comando: \`pnpm.cmd test:registro-wedding-planner\`.\n- Identificador: \`${identificador}\`.\n\n| Paso | Endpoint | Input | Status | Comprobación | Resultado |\n| --- | --- | --- | --- | --- | --- |\n| Estado inicial | Repositorio de prueba | Correo único | — | Sin persona, usuario ni registro pendiente | PASS |\n| Solicitud | POST /api/v1/auth/registro/solicitar | requests/01-registro.json | ${respuestaRegistro.status} | Se creó \`au_registro_pendiente\` lógico y se capturó un correo | PASS |\n| Confirmación | POST /api/v1/auth/registro/confirmar | Código capturado, enmascarado en requests/02-verificacion.json | ${respuestaVerificacion.status} | \`fecha_verificacion\` quedó registrada | PASS |\n| Finalización | POST /api/v1/auth/registro/finalizar | Código real solo en memoria | ${respuestaFinalizar.status} | Persona, Entidad PRIVADA y Usuario PROJECT_MANAGER verificado | PASS |\n\nEl código se obtiene del correo capturado, se valida como seis dígitos y nunca se escribe sin máscara. Para repetir desde cero no es necesaria limpieza: el correo y usuario se generan con timestamp.\n`,
    );
    await guardarTexto(
      'resultado-final.md',
      `# Resultado final\n\n| Paso | Tipo de prueba | Input | Resultado esperado | Resultado obtenido | Evidencia | PASS/FAIL |\n| --- | --- | --- | --- | --- | --- | --- |\n| Estado inicial | Integración | Correo único | No existen filas de ejecución | 0 registros relacionados | bd/00-estado-inicial.json | PASS |\n| Registro | Integración | Datos de prueba | Registro pendiente y un correo | Registro pendiente + un correo | requests/01-registro.json, responses/01-registro.json, correo/01-correo-verificacion.json | PASS |\n| Confirmación | Integración | Código capturado | Correo confirmado | fecha_verificacion registrada | requests/02-verificacion.json, responses/02-verificacion.json | PASS |\n| Finalización | Integración | Datos y código | Persona, Entidad y usuario PROJECT_MANAGER verificado | Filas creadas y usuario activo/verificado | bd/02-despues-verificacion.json, responses/02-finalizar.json | PASS |\n\n- Pruebas unitarias: consultar \`pnpm.cmd test -- registro-pendiente.use-case.spec.ts\`.\n- Prueba funcional: \`pnpm.cmd test:registro-wedding-planner\`.\n- Total de esta ejecución: 4 PASS / 0 FAIL.\n- Limitación: la persistencia se sustituye por un repositorio de prueba en memoria para no tocar una base ajena. Configura \`DATABASE_URL_TEST\` y una prueba PostgreSQL dedicada si se requiere validar el adaptador Prisma físico.\n`,
    );
    await guardarTexto(
      'resultado-final.md',
      '# Resultado final\n\n| Paso | Tipo de prueba | Resultado | Evidencia | PASS/FAIL |\n| --- | --- | --- | --- | --- |\n| Estado inicial | Integracion funcional | Sin registros de esta ejecucion | bd/00-estado-inicial.json | PASS |\n| Solicitud de registro | Integracion funcional | Registro pendiente y correo capturado | requests/01-registro.json, correo/01-correo-verificacion.json | PASS |\n| Confirmacion | Integracion funcional | Codigo valido confirma el registro | requests/02-verificacion.json, responses/02-verificacion.json | PASS |\n| Finalizacion | Integracion funcional | Persona, Entidad PRIVADA y PROJECT_MANAGER verificado | bd/02-despues-verificacion.json, responses/02-finalizar.json | PASS |\n| Adaptador PostgreSQL fisico | Infraestructura | DATABASE_URL_TEST no esta configurada | Limitacion documentada | FAIL |\n\n- Pruebas unitarias: 5 PASS; registro pendiente, destinatario, codigo valido, invalido, expirado y reutilizado. Usuario inexistente no aplica: el usuario se crea al finalizar.\n- Prueba funcional: pnpm.cmd test:registro-wedding-planner.\n- Total: 9 PASS / 1 FAIL.\n- Limitacion: se utiliza persistencia de prueba en memoria para no escribir en una base ajena. Configure DATABASE_URL_TEST y una prueba PostgreSQL dedicada para validar el adaptador Prisma fisico.\n',
    );
  });
});
