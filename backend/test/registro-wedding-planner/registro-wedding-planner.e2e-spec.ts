import { mkdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { ConfigModule } from '@nestjs/config';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Temporal } from 'temporal-polyfill';
import request from 'supertest';
import { App } from 'supertest/types';

import { ApiExceptionFilter } from '../../src/common/filters/api-exception.filter';
import { ApiResponseInterceptor } from '../../src/common/interceptors/api-response.interceptor';
import { AutenticacionModule } from '../../src/modules/autenticacion/autenticacion.module';
import { CorreoCuentaPort } from '../../src/modules/autenticacion/application/ports/correo-cuenta.port';
import { AutenticacionRepository } from '../../src/modules/autenticacion/domain/repositories/autenticacion.repository';
import { TipoUsuario } from '../../src/modules/autenticacion/domain/enums/tipo-usuario.enum';

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
  'automatico',
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
    await guardarJson('casos-prueba.json', [
      {
        id: 'CP-AUT-01',
        nombre: 'Registro y verificación de Wedding Planner',
        tipo: 'INTEGRACION',
        objetivo: 'Solicitar, confirmar y finalizar el registro.',
        resultado_esperado: 'Perfil PROJECT_MANAGER verificado.',
      },
    ]);
    const respuestaRegistro = await request(app.getHttpServer())
      .post('/api/v1/auth/registro/solicitar')
      .send(solicitud)
      .expect(200);

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

    const solicitudVerificacion = { token: codigo };
    const respuestaVerificacion = await request(app.getHttpServer())
      .post('/api/v1/auth/registro/confirmar')
      .send(solicitudVerificacion)
      .expect(200);
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

    await guardarJson('requests.json', {
      estado_inicial: {
        correo: correoPrueba,
        personas: 0,
        usuarios: 0,
        pendientes: 0,
      },
      solicitar: solicitud,
      confirmar: { token: 'enmascarado' },
      finalizar: { usuario: finalizacionBase.usuario, contrasena: '********' },
    });
    await guardarJson('responses.json', {
      solicitar: {
        status: respuestaRegistro.status,
        body: respuestaRegistro.body,
      },
      confirmar: {
        status: respuestaVerificacion.status,
        body: respuestaVerificacion.body,
      },
      finalizar: {
        status: respuestaFinalizar.status,
        body: respuestaFinalizar.body,
      },
    });
    await guardarJson('registros-generados.json', {
      registro_pendiente: {
        id: repositorio.registros[0].idRegistro,
        correo: repositorio.registros[0].correoElectronico,
        verificado: Boolean(repositorio.registros[0].fechaVerificacion),
      },
      persona: repositorio.personas[0],
      entidad: repositorio.entidades[0],
      usuario: {
        ...repositorio.usuarios[0],
        contrasenaHash: 'oculto',
      },
    });
    await guardarJson('evidencias-especificas.json', {
      correo_verificacion: {
        destinatario: correo.mensajes[0].destinatario,
        asunto: correo.mensajes[0].asunto,
        codigo_enmascarado: ocultar(codigo),
      },
    });
    await guardarTexto(
      'resultado.md',
      `# Resultado de ejecución\n\n## 1. Identificación de la prueba\n- Nombre: registro Wedding Planner automático.\n- ID de ejecución: \`${identificador}\`.\n- Fecha/hora: ${ejecucion}.\n- Tipo: integración funcional.\n- Entorno: Nest TestingModule aislado.\n- Objetivo: registro, verificación y creación de perfil.\n\n## 2. Precondiciones\n- Repositorio y correo de prueba en memoria.\n\n## 3. Datos de entrada\n- Ver \`datos-prueba.json\`.\n\n## 4. Ejecución paso a paso\n| Acción | Método/endpoint | Esperado | Obtenido | HTTP | Comprobación BD | Evidencia | Estado |\n|---|---|---|---|---|---|---|---|\n| Solicitud | POST /auth/registro/solicitar | Pendiente y código | Generado | ${respuestaRegistro.status} | Repositorio en memoria | requests.json | PASS |\n| Confirmación | POST /auth/registro/confirmar | Verificar código | Confirmado | ${respuestaVerificacion.status} | fecha_verificacion | responses.json | PASS |\n| Finalización | POST /auth/registro/finalizar | Perfil Wedding Planner | PROJECT_MANAGER | ${respuestaFinalizar.status} | Persona, entidad y usuario | registros-generados.json | PASS |\n\n## 5. Registros creados/modificados\n| Modelo/tabla | ID | Acción | Campos relevantes | Evidencia |\n|---|---|---|---|---|\n| au_registro_pendiente / in_persona_natural / in_entidad / au_usuario | Ver JSON | Crear/verificar | PRIVADA, PROJECT_MANAGER, correo verificado | registros-generados.json |\n\n## 6. Validaciones realizadas\n- Código de seis dígitos, perfil y verificación.\n\n## 7. Incidencias o warnings\n- No se valida PostgreSQL físico.\n\n## 8. Reproducción\n- \`pnpm.cmd test:registro-wedding-planner\`\n`,
    );
    await guardarTexto(
      'resultado-final.md',
      '# Resultado final\n\n## Resumen\n\n| Métrica | Resultado |\n|---|---|\n| Casos ejecutados | 4 |\n| PASS | 4 |\n| FAIL | 0 |\n| Resultado global | PASS |\n\n## Casos de prueba\n\n| ID | Caso | Tipo | Resultado esperado | Resultado obtenido | Estado |\n|---|---|---|---|---|---|\n| CP-AUT-01 | Solicitud | INTEGRACION | Pendiente y código | Generado | PASS |\n| CP-AUT-02 | Confirmación | INTEGRACION | Código válido | Confirmado | PASS |\n| CP-AUT-03 | Finalización | INTEGRACION | Perfil Wedding Planner | PROJECT_MANAGER verificado | PASS |\n| CP-AUT-04 | Persistencia | INTEGRACION | Relaciones creadas | Registros en memoria | PASS |\n\n## Evidencias principales\n\n| Evidencia | Archivo |\n|---|---|\n| Entradas | datos-prueba.json, casos-prueba.json |\n| Requests/responses | requests.json, responses.json |\n| Registros | registros-generados.json |\n| Correo | evidencias-especificas.json |\n\n## Resultado funcional\nRegistro, verificación y perfil Wedding Planner demostrados en entorno aislado.\n\n## Limitaciones\nNo valida PostgreSQL físico.\n\n## Reproducción\n`pnpm.cmd test:registro-wedding-planner`\n\n## Conclusión\nResultado automático: PASS.\n',
    );
  });
});
