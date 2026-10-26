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
    'backup',
    'legacy',
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
  await guardarJson(carpetaEjecucion, 'casos-prueba.json', [
    {
      id: 'CP-MAN-01',
      nombre: 'Registro y verificación reproducible',
      tipo: 'FUNCIONAL',
      objetivo:
        'Crear/verificar la cuenta fija o rechazar correctamente el duplicado.',
      resultado_esperado: 'Escenario A o B válido.',
    },
  ]);

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
      '# Resultado de ejecución',
      '',
      '## 1. Identificación de la prueba',
      '- Nombre: registro manual Wedding Planner.',
      `- ID de ejecución: \`${idEjecucion}\`.`,
      `- Fecha/hora: ${fecha.toISOString()}.`,
      '- Tipo: funcional.',
      '- Entorno: configuración normal del backend y BD configurada.',
      '- Objetivo: registrar, verificar y persistir una cuenta Wedding Planner.',
      '',
      '## 2. Precondiciones',
      '- Configuración normal de autenticación y cuenta de datos fijos disponible.',
      '',
      '## 3. Datos de entrada',
      '- Ver `datos-prueba.json` y `casos-prueba.json`.',
      '',
      '## 4. Ejecución paso a paso',
      '',
      '| Acción | Método/servicio | Esperado | Obtenido | HTTP | Comprobación BD | Evidencia | Estado |',
      '| --- | --- | --- | --- | --- | --- | --- | --- |',
      ...pasos.map(
        (paso) =>
          `| ${paso.nombre} | Endpoint real / correo capturado | Según escenario | ${paso.detalle} | ${paso.statusHttp ?? '—'} | registros-creados.json | requests/responses JSON | ${paso.estado} |`,
      ),
      '',
      '## 5. Registros creados/modificados',
      '| Modelo/tabla | ID | Acción | Campos relevantes | Evidencia |',
      '| --- | --- | --- | --- | --- |',
      '| au_registro_pendiente / in_persona_natural / in_entidad / au_usuario | Ver JSON | Crear/verificar o rechazar duplicado | correo y perfil | registros-creados.json |',
      '',
      '## 6. Validaciones realizadas',
      `- ${escenario === 'A' ? 'Registro, correo, verificación y perfil.' : 'Detección de duplicado sin envío de correo.'}`,
      '',
      '## 7. Incidencias o warnings',
      errores.length
        ? errores.map((error) => `- ${error}`).join('\n')
        : '- Ninguno.',
      '',
      '## 8. Reproducción',
      '- Comando: `pnpm.cmd test:manual:registro-wedding-planner`.',
      '- La carpeta manual se sobrescribe; el runner no elimina registros de la BD.',
    ];
    await writeFile(
      join(carpetaEjecucion, 'resultado.md'),
      `${lineas.join('\n')}\n`,
      'utf8',
    );
    await writeFile(
      join(carpetaEjecucion, 'resultado-final.md'),
      `# Resultado final\n\n## Resumen\n\n| Métrica | Resultado |\n|---|---|\n| Casos ejecutados | ${pasos.length} |\n| PASS | ${pasos.filter((paso) => paso.estado === 'PASS').length} |\n| FAIL | ${pasos.filter((paso) => paso.estado === 'FAIL').length} |\n| Resultado global | ${global} |\n\n## Casos de prueba\n\n| ID | Caso | Tipo | Resultado esperado | Resultado obtenido | Estado |\n|---|---|---|---|---|---|\n${pasos.map((paso, indice) => `| CP-MAN-${String(indice + 1).padStart(2, '0')} | ${paso.nombre} | FUNCIONAL | Según escenario | ${paso.detalle} | ${paso.estado} |`).join('\n')}\n\n## Evidencias principales\n\n| Evidencia | Archivo |\n|---|---|\n| Datos/casos | datos-prueba.json, casos-prueba.json |\n| Requests/responses | requests.json, responses.json |\n| Registros | registros-creados.json |\n| Verificación | correo-verificacion.json |\n\n## Resultado funcional\nSe documentó el flujo real sin falsear el escenario A o B.\n\n## Limitaciones\nEl resultado depende de que la cuenta fija exista o no en la BD.\n\n## Reproducción\n\`pnpm.cmd test:manual:registro-wedding-planner\`\n\n## Conclusión\nResultado ${global}.\n`,
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
