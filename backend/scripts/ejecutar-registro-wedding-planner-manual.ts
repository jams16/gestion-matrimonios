import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';

import { ApiExceptionFilter } from '../src/common/filters/api-exception.filter';
import { ApiResponseInterceptor } from '../src/common/interceptors/api-response.interceptor';
import { PrismaModule } from '../src/infrastructure/database/prisma/prisma.module';
import { PrismaService } from '../src/infrastructure/database/prisma/prisma.service';
import { AutenticacionModule } from '../src/modules/autenticacion/autenticacion.module';
import { CorreoCuentaPort } from '../src/modules/autenticacion/application/ports/correo-cuenta.port';

type MensajeCapturado = {
  destinatario: string;
  asunto: string;
  contenido: string;
  codigo: string;
};

class CorreoCapturadorManual extends CorreoCuentaPort {
  readonly mensajes: MensajeCapturado[] = [];

  async enviarRegistro(destinatario: string, nombre: string, token: string) {
    this.mensajes.push({
      destinatario,
      asunto: 'Código de verificación para WeddingApp',
      contenido: `Hola ${nombre}. Código de verificación: ${token}`,
      codigo: token,
    });
  }

  async enviarVerificacion() {}
  async enviarRecuperacion() {}
}

type Paso = {
  nombre: string;
  estado: 'PASS' | 'FAIL';
  detalle: string;
  statusHttp?: number;
};

const ocultar = (valor: string) =>
  valor.length <= 4 ? '****' : `${valor.slice(0, 2)}****${valor.slice(-2)}`;

const serializar = (valor: unknown): unknown => {
  if (valor === null || typeof valor !== 'object') return valor;
  if (valor instanceof Date) return valor.toISOString();
  if ('toString' in valor && valor.constructor?.name === 'Instant')
    return String(valor);
  if (Array.isArray(valor)) return valor.map(serializar);
  return Object.fromEntries(
    Object.entries(valor as Record<string, unknown>).map(
      ([clave, contenido]) => [clave, serializar(contenido)],
    ),
  );
};

const guardarJson = async (raiz: string, nombre: string, contenido: unknown) =>
  writeFile(
    join(raiz, nombre),
    `${JSON.stringify(serializar(contenido), null, 2)}\n`,
    'utf8',
  );

const agregarPaso = (
  pasos: Paso[],
  nombre: string,
  detalle: string,
  statusHttp?: number,
) => pasos.push({ nombre, estado: 'PASS', detalle, statusHttp });

async function ejecutar() {
  const fecha = new Date();
  const idEjecucion = 'manual-registro-wedding-planner';
  const carpetaEjecucion = join(
    process.cwd(),
    'test',
    'evidencias',
    'registro-wedding-planner',
    'manual',
  );
  const pasos: Paso[] = [];
  const errores: string[] = [];
  const correoPrueba = 'weddingplanner.prueba@example.test';
  const solicitud = {
    nombres: 'Wedding Planner Prueba',
    apellidoPaterno: 'Manual',
    apellidoMaterno: 'Reproducible',
    correoElectronico: correoPrueba,
  };
  const finalizacion = {
    usuario: 'weddingplanner.prueba',
    contrasena: 'PruebaManualSegura1!',
    nombreComercial: 'Wedding Planner Prueba Manual SAC',
    ruc: '',
    telefono: '',
    correoCorporativo: '',
  };

  await mkdir(carpetaEjecucion, { recursive: true });
  await guardarJson(carpetaEjecucion, 'datos-prueba.json', {
    idEjecucion,
    fechaHora: fecha.toISOString(),
    solicitud,
    finalizacion: { ...finalizacion, contrasena: '********' },
  });

  let app: INestApplication<App> | undefined;
  let correo: CorreoCapturadorManual | undefined;
  let respuestas: Record<string, unknown> = {};
  let registros: Record<string, unknown> = {};
  let escenario: 'A' | 'B' | 'NO_DETERMINADO' = 'NO_DETERMINADO';

  try {
    correo = new CorreoCapturadorManual();
    const modulo = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
        PrismaModule,
        AutenticacionModule,
      ],
    })
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
    const prisma = app.get(PrismaService);
    const orm = prisma.client.orm.public;
    const personasIniciales = (
      (await orm.PersonaNatural.all()) as Array<Record<string, unknown>>
    ).filter(
      (persona) =>
        String(persona.correoElectronico).toLowerCase() ===
        correoPrueba.toLowerCase(),
    );
    const pendientesIniciales = (
      (await orm.RegistroPendiente.all()) as Array<Record<string, unknown>>
    ).filter(
      (registro) =>
        String(registro.correoElectronico).toLowerCase() ===
        correoPrueba.toLowerCase(),
    );
    const usuariosIniciales = (
      (await orm.Usuario.all()) as Array<Record<string, unknown>>
    ).filter(
      (usuario) =>
        String(usuario.usuario).toLowerCase() ===
        finalizacion.usuario.toLowerCase(),
    );
    const existeCuenta =
      personasIniciales.length > 0 || usuariosIniciales.length > 0;
    registros.estadoInicial = {
      personasCoincidentes: personasIniciales,
      usuariosCoincidentes: usuariosIniciales.map((usuario) => ({
        ...usuario,
        contrasenaHash: 'oculto',
      })),
      registrosPendientesCoincidentes: pendientesIniciales,
    };
    agregarPaso(
      pasos,
      'Estado inicial',
      existeCuenta
        ? 'Existe una cuenta previa con los datos fijos de prueba.'
        : 'No existe aún una cuenta con los datos fijos de prueba.',
    );

    const respuestaSolicitud = await request(app.getHttpServer())
      .post('/api/v1/auth/registro/solicitar')
      .send(solicitud);
    respuestas.solicitarRegistro = {
      status: respuestaSolicitud.status,
      body: respuestaSolicitud.body,
    };
    if (existeCuenta) {
      escenario = 'B';
      const mensajeDuplicado = String(
        respuestaSolicitud.body?.mensaje ?? '',
      ).toLowerCase();
      if (
        respuestaSolicitud.status !== 409 ||
        !mensajeDuplicado.includes('correo') ||
        correo.mensajes.length !== 0
      )
        throw new Error(
          'El registro duplicado no fue rechazado como se esperaba.',
        );
      agregarPaso(
        pasos,
        'ESCENARIO B: intento de registro duplicado correctamente rechazado',
        'El backend rechazó el correo fijo ya registrado y no generó correo.',
        respuestaSolicitud.status,
      );
    } else {
      escenario = 'A';
      if (respuestaSolicitud.status !== 200)
        throw new Error(
          `Solicitud de registro respondió HTTP ${respuestaSolicitud.status}.`,
        );

      const pendientesDespuesSolicitud = (
        (await orm.RegistroPendiente.all()) as Array<Record<string, unknown>>
      ).filter(
        (registro) =>
          String(registro.correoElectronico).toLowerCase() ===
          correoPrueba.toLowerCase(),
      );
      registros.au_registro_pendiente = pendientesDespuesSolicitud.map(
        (registro) => ({ ...registro, tokenHash: 'oculto' }),
      );
      if (pendientesDespuesSolicitud.length !== pendientesIniciales.length + 1)
        throw new Error('No se creó un nuevo registro pendiente en la BD.');
      const registroNuevo = pendientesDespuesSolicitud.at(-1);
      if (!registroNuevo)
        throw new Error('No se pudo identificar el registro pendiente creado.');
      agregarPaso(
        pasos,
        'Registro de Wedding Planner',
        'Se creó au_registro_pendiente en la BD.',
        respuestaSolicitud.status,
      );

      const mensaje = correo.mensajes[0];
      if (!mensaje || mensaje.destinatario !== correoPrueba)
        throw new Error('No se capturó el correo de verificación esperado.');
      if (!/^\d{6}$/.test(mensaje.codigo))
        throw new Error('El código capturado no tiene seis dígitos.');
      await guardarJson(carpetaEjecucion, 'correo-verificacion.json', {
        destinatario: mensaje.destinatario,
        asunto: mensaje.asunto,
        contieneCodigo: mensaje.contenido.includes(mensaje.codigo),
        codigoEnmascarado: ocultar(mensaje.codigo),
      });
      agregarPaso(
        pasos,
        'Correo de verificación generado',
        'Se capturó un único correo con código de seis dígitos.',
      );

      const respuestaConfirmacion = await request(app.getHttpServer())
        .post('/api/v1/auth/registro/confirmar')
        .send({ token: mensaje.codigo });
      respuestas.confirmarRegistro = {
        status: respuestaConfirmacion.status,
        body: respuestaConfirmacion.body,
      };
      if (respuestaConfirmacion.status !== 200)
        throw new Error(
          `Confirmación de registro respondió HTTP ${respuestaConfirmacion.status}.`,
        );
      const pendienteVerificado = (
        (await orm.RegistroPendiente.all()) as Array<Record<string, unknown>>
      ).find((registro) => registro.idRegistro === registroNuevo.idRegistro);
      if (!pendienteVerificado?.fechaVerificacion)
        throw new Error(
          'La BD no registra fecha_verificacion para el código usado.',
        );
      registros.au_registro_pendiente_verificado = {
        ...pendienteVerificado,
        tokenHash: 'oculto',
      };
      agregarPaso(
        pasos,
        'Verificación de cuenta',
        'El registro pendiente quedó confirmado en la BD.',
        respuestaConfirmacion.status,
      );

      const respuestaFinalizar = await request(app.getHttpServer())
        .post('/api/v1/auth/registro/finalizar')
        .send({ ...finalizacion, token: mensaje.codigo });
      respuestas.finalizarRegistro = {
        status: respuestaFinalizar.status,
        body: respuestaFinalizar.body,
      };
      if (respuestaFinalizar.status !== 201)
        throw new Error(
          `Finalización de registro respondió HTTP ${respuestaFinalizar.status}.`,
        );

      const resultado = respuestaFinalizar.body?.data as {
        idPersonaNatural?: number;
        idEntidad?: number;
        idUsuario?: number;
      };
      if (
        !resultado?.idPersonaNatural ||
        !resultado.idEntidad ||
        !resultado.idUsuario
      )
        throw new Error(
          'La respuesta de finalización no contiene los IDs creados.',
        );
      const [persona, entidad, usuario] = await Promise.all([
        orm.PersonaNatural.first({
          idPersonaNatural: resultado.idPersonaNatural,
        }),
        orm.Entidad.first({ idEntidad: resultado.idEntidad }),
        orm.Usuario.first({ idUsuario: resultado.idUsuario }),
      ]);
      registros.in_persona_natural = persona;
      registros.in_entidad = entidad;
      registros.au_usuario = usuario
        ? { ...usuario, contrasenaHash: 'oculto' }
        : null;
      if (
        !persona ||
        !entidad ||
        !usuario ||
        usuario.tipoUsuario !== 'PROJECT_MANAGER' ||
        !usuario.correoVerificado ||
        !usuario.esActivo ||
        entidad.tipoEntidad !== 'PRIVADA' ||
        usuario.idPersonaNatural !== resultado.idPersonaNatural ||
        usuario.idEntidad !== resultado.idEntidad
      )
        throw new Error(
          'Los registros finales no cumplen el perfil Wedding Planner esperado.',
        );
      agregarPaso(
        pasos,
        'ESCENARIO A: creación nueva y verificación',
        `Se crearon Persona ${resultado.idPersonaNatural}, Entidad ${resultado.idEntidad} y Usuario ${resultado.idUsuario} PROJECT_MANAGER verificado.`,
        respuestaFinalizar.status,
      );
    }
  } catch (error) {
    const detalle = error instanceof Error ? error.message : String(error);
    errores.push(detalle);
    pasos.push({ nombre: 'Ejecución', estado: 'FAIL', detalle });
  } finally {
    registros.escenario = escenario;
    if (!correo?.mensajes[0]) {
      await guardarJson(carpetaEjecucion, 'correo-verificacion.json', {
        generado: false,
        motivo:
          escenario === 'B'
            ? 'El correo fijo ya estaba registrado; el backend rechazó el duplicado antes de enviar correo.'
            : 'No se alcanzó la etapa de generación de correo.',
      });
    }
    await guardarJson(carpetaEjecucion, 'requests.json', {
      escenario,
      solicitarRegistro: solicitud,
      confirmarRegistro: correo?.mensajes[0]
        ? { token: ocultar(correo.mensajes[0].codigo) }
        : null,
      finalizarRegistro: {
        ejecutada: escenario === 'A',
        ...finalizacion,
        contrasena: '********',
        token: correo?.mensajes[0] ? ocultar(correo.mensajes[0].codigo) : null,
      },
    });
    await guardarJson(carpetaEjecucion, 'responses.json', respuestas);
    await guardarJson(carpetaEjecucion, 'registros-creados.json', registros);

    const global = errores.length === 0 ? 'PASS' : 'FAIL';
    const lineas = [
      '# Resultado del runner manual: registro Wedding Planner',
      '',
      `- ID de ejecución: \`${idEjecucion}\``,
      `- Fecha/hora: ${fecha.toISOString()}`,
      `- Escenario: ${escenario === 'A' ? 'ESCENARIO A: creación nueva y verificación' : escenario === 'B' ? 'ESCENARIO B: intento de registro duplicado correctamente rechazado' : 'NO DETERMINADO'}`,
      '- Objetivo: registrar, verificar y persistir una cuenta Wedding Planner en la BD configurada.',
      '- Comando: `pnpm.cmd test:manual:registro-wedding-planner`',
      `- Reportes JSON: datos-prueba.json, requests.json, responses.json, registros-creados.json, correo-verificacion.json`,
      '',
      '| Paso | Método/servicio | Esperado | Obtenido | HTTP | BD | Estado |',
      '| --- | --- | --- | --- | --- | --- | --- |',
      ...pasos.map(
        (paso) =>
          `| ${paso.nombre} | Endpoint real / servicio de correo capturado | ${paso.estado === 'PASS' ? 'Correcto' : 'Correcto sin errores'} | ${paso.detalle} | ${paso.statusHttp ?? '—'} | Ver registros-creados.json | ${paso.estado} |`,
      ),
      '',
      `## Resultado global: ${global}`,
      '',
      errores.length
        ? `## Errores/warnings\n${errores.map((error) => `- ${error}`).join('\n')}`
        : '## Errores/warnings\n- Ninguno.',
      '',
      'Los registros creados se conservan deliberadamente para su inspección; el runner no ejecuta limpieza ni rollback.',
    ];
    await writeFile(
      join(carpetaEjecucion, 'resultado.md'),
      `${lineas.join('\n')}\n`,
      'utf8',
    );
    await app?.close();

    for (const paso of pasos) console.log(`${paso.estado} ${paso.nombre}`);
    console.log(`\nResultado global: ${global}`);
    console.log(`Reporte: ${carpetaEjecucion}`);
    if (global === 'FAIL') process.exitCode = 1;
  }
}

void ejecutar();
