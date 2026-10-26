import 'dotenv/config';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as argon2 from 'argon2';
import request from 'supertest';
import { App } from 'supertest/types';
import { Temporal } from 'temporal-polyfill';

import { AppModule } from '../../../src/app.module';
import { ApiExceptionFilter } from '../../../src/common/filters/api-exception.filter';
import { ApiResponseInterceptor } from '../../../src/common/interceptors/api-response.interceptor';
import { PrismaService } from '../../../src/infrastructure/database/prisma/prisma.service';
import { CorreoCuentaPort } from '../../../src/modules/autenticacion/application/ports/correo-cuenta.port';

export class CorreoE01Capturado extends CorreoCuentaPort {
  readonly registros: Array<{ destinatario: string; nombre: string; token: string }> = [];
  readonly verificaciones: Array<{ destinatario: string; nombre: string; token: string }> = [];

  async enviarRegistro(destinatario: string, nombre: string, token: string) {
    this.registros.push({ destinatario, nombre, token });
  }
  async enviarVerificacion(destinatario: string, nombre: string, token: string) {
    this.verificaciones.push({ destinatario, nombre, token });
  }
  async enviarRecuperacion(): Promise<void> {}
}

export type ContextoE01 = {
  app: INestApplication<App>;
  correo: CorreoE01Capturado;
};

export type ResultadoCaso = {
  id: string;
  estado: 'PASS' | 'FAIL';
  detalle: string;
};

export const verificarBasePruebas = () => {
  const url = process.env.DATABASE_URL ?? '';
  if (!/(?:_test|test_)/i.test(url)) {
    throw new Error('DATABASE_URL no identifica una base de datos de pruebas.');
  }
};

export async function crearContextoE01(): Promise<ContextoE01> {
  verificarBasePruebas();
  const correo = new CorreoE01Capturado();
  const moduleRef = await Test.createTestingModule({ imports: [AppModule] })
    .overrideProvider(CorreoCuentaPort)
    .useValue(correo)
    .compile();
  const app = moduleRef.createNestApplication<INestApplication<App>>();
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
  );
  app.useGlobalFilters(new ApiExceptionFilter());
  app.useGlobalInterceptors(new ApiResponseInterceptor());
  await app.init();
  return { app, correo };
}

export const cliente = (contexto: ContextoE01) => request(contexto.app.getHttpServer());

let secuencia = 0;
export const datosUnicos = (prefijo: string) => {
  secuencia += 1;
  const sufijo = `${Date.now()}${secuencia}`;
  return {
    correo: `${prefijo}.${sufijo}@example.test`,
    usuario: `${prefijo}${sufijo}`.slice(0, 40),
    contrasena: 'Prueba#2026',
    nombreComercial: `Empresa ${prefijo} ${sufijo}`,
  };
};

export async function registrarYVerificar(
  contexto: ContextoE01,
  prefijo: string,
) {
  const datos = datosUnicos(prefijo);
  const api = cliente(contexto);
  const solicitud = await api.post('/api/v1/auth/registro/solicitar').send({
    nombres: 'Prueba',
    apellidoPaterno: 'E01',
    apellidoMaterno: 'Automatica',
    correoElectronico: datos.correo,
  });
  if (solicitud.status !== 200) throw new Error(`Solicitud de registro: HTTP ${solicitud.status}`);
  const token = contexto.correo.registros.at(-1)?.token;
  if (!token) throw new Error('No se capturó el código de registro.');
  const confirmacion = await api.post('/api/v1/auth/registro/confirmar').send({ token });
  if (confirmacion.status !== 200) throw new Error(`Confirmación: HTTP ${confirmacion.status}`);
  const finalizacion = await api.post('/api/v1/auth/registro/finalizar').send({
    token,
    usuario: datos.usuario,
    contrasena: datos.contrasena,
    nombreComercial: datos.nombreComercial,
  });
  if (finalizacion.status !== 201) throw new Error(`Finalización: HTTP ${finalizacion.status}`);
  return { ...datos, token, usuario: finalizacion.body.data };
}

export async function iniciarSesion(
  contexto: ContextoE01,
  usuarioOCorreo: string,
  contrasena: string,
) {
  return cliente(contexto).post('/api/v1/auth/login').send({ usuarioOCorreo, contrasena });
}

export async function crearUsuarioPendiente(
  contexto: ContextoE01,
  prefijo: string,
) {
  const datos = datosUnicos(prefijo);
  const prisma = contexto.app.get(PrismaService).client.orm.public;
  const persona = await prisma.PersonaNatural.create({
    nombres: 'Pendiente',
    apellidoPaterno: 'E01',
    apellidoMaterno: 'Automatica',
    correoElectronico: datos.correo,
    telefono: null,
    dni: null,
    direccion: null,
    codigoUbigeo: null,
  } as never) as unknown as { idPersonaNatural: number };
  const usuario = await prisma.Usuario.create({
    idPersonaNatural: persona.idPersonaNatural,
    idEntidad: null,
    usuario: datos.usuario,
    tipoUsuario: 'PROJECT_MANAGER',
    contrasenaHash: await argon2.hash(datos.contrasena),
    ultimoAcceso: Temporal.Now.instant(),
    correoVerificado: false,
    esActivo: true,
  } as never) as unknown as { idUsuario: number };
  return { ...datos, usuario };
}

export async function expirarRegistroPendiente(
  contexto: ContextoE01,
  correoElectronico: string,
) {
  const registros = await contexto.app.get(PrismaService).client.orm.public.RegistroPendiente.all() as unknown as Array<{
    idRegistro: number;
    correoElectronico: string;
  }>;
  const registro = registros.find(
    (item) => item.correoElectronico.toLowerCase() === correoElectronico.toLowerCase(),
  );
  if (!registro) throw new Error('No se encontró el registro pendiente que debe expirar.');
  await contexto.app.get(PrismaService).client.orm.public.RegistroPendiente.where({
    idRegistro: registro.idRegistro,
  }).update({ fechaExpiracion: Temporal.Instant.from('2000-01-01T00:00:00Z') } as never);
}

export async function ejecutarCaso(
  resultados: ResultadoCaso[],
  id: string,
  accion: () => Promise<void>,
) {
  try {
    await accion();
    resultados.push({ id, estado: 'PASS', detalle: 'El comportamiento observado cumplió el resultado esperado.' });
  } catch (error) {
    const detalle = error instanceof Error ? error.message : String(error);
    resultados.push({ id, estado: 'FAIL', detalle });
    throw error;
  }
}

export async function guardarEvidenciaHu(hu: string, resultados: ResultadoCaso[]) {
  const ruta = join(process.cwd(), 'test', 'E01-Acceso', hu, 'evidencias');
  await mkdir(ruta, { recursive: true });
  await writeFile(join(ruta, 'resultados-automaticos.json'), `${JSON.stringify(resultados, null, 2)}\n`);
  const filas = resultados.map((resultado) => `| ${resultado.id} | ${resultado.estado} | ${resultado.detalle.replace(/\|/g, '\\|')} |`).join('\n');
  await writeFile(
    join(ruta, 'resultado-automatico.md'),
    `# Resultado automático ${hu}\n\n| Caso | Estado | Resultado obtenido |\n|---|---|---|\n${filas}\n`,
  );
}
