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
  variante?: string;
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
const perfiles: Record<string, { nombres: string; apellidoPaterno: string; apellidoMaterno: string; correo: string; usuario: string; empresa: string }> = {
  e01hu01ok: { nombres: 'Daniela', apellidoPaterno: 'Ramírez', apellidoMaterno: 'Torres', correo: 'daniela.ramirez.e01', usuario: 'daniela.ramirez', empresa: 'Ramírez Eventos' },
  e01hu01pass: { nombres: 'Valeria', apellidoPaterno: 'Salazar', apellidoMaterno: 'Mendoza', correo: 'valeria.salazar.e01', usuario: 'valeria.salazar', empresa: 'Salazar Bodas' },
  e01hu01dup: { nombres: 'Camila', apellidoPaterno: 'Rojas', apellidoMaterno: 'Paredes', correo: 'camila.rojas.e01', usuario: 'camila.rojas', empresa: 'Rojas Celebraciones' },
  e01hu02pendiente: { nombres: 'Andrea', apellidoPaterno: 'Vega', apellidoMaterno: 'Castillo', correo: 'andrea.vega.e01', usuario: 'andrea.vega', empresa: 'Vega Eventos' },
  e01hu02valido: { nombres: 'Luciana', apellidoPaterno: 'Morales', apellidoMaterno: 'Silva', correo: 'luciana.morales.e01', usuario: 'luciana.morales', empresa: 'Morales Wedding Studio' },
  e01hu02usado: { nombres: 'Mariana', apellidoPaterno: 'Delgado', apellidoMaterno: 'Ríos', correo: 'mariana.delgado.e01', usuario: 'mariana.delgado', empresa: 'Delgado Bodas' },
  e01hu02expirado: { nombres: 'Paola', apellidoPaterno: 'Navarro', apellidoMaterno: 'León', correo: 'paola.navarro.e01', usuario: 'paola.navarro', empresa: 'Navarro Eventos' },
  e01hu02pendientelogin: { nombres: 'Sofía', apellidoPaterno: 'Cárdenas', apellidoMaterno: 'Ruiz', correo: 'sofia.cardenas.e01', usuario: 'sofia.cardenas', empresa: 'Cárdenas Bodas' },
  e01hu02reenvio: { nombres: 'Elena', apellidoPaterno: 'Fuentes', apellidoMaterno: 'Vargas', correo: 'elena.fuentes.e01', usuario: 'elena.fuentes', empresa: 'Fuentes Eventos' },
  e01hu03ok: { nombres: 'Natalia', apellidoPaterno: 'Herrera', apellidoMaterno: 'Luna', correo: 'natalia.herrera.e01', usuario: 'natalia.herrera', empresa: 'Herrera Wedding Planner' },
  e01hu03bad: { nombres: 'Carolina', apellidoPaterno: 'Mejía', apellidoMaterno: 'Soto', correo: 'carolina.mejia.e01', usuario: 'carolina.mejia', empresa: 'Mejía Bodas' },
  e01hu03pendiente: { nombres: 'Rosa', apellidoPaterno: 'Arias', apellidoMaterno: 'Núñez', correo: 'rosa.arias.e01', usuario: 'rosa.arias', empresa: 'Arias Eventos' },
  e01hu03refresh: { nombres: 'Gabriela', apellidoPaterno: 'Ponce', apellidoMaterno: 'Vera', correo: 'gabriela.ponce.e01', usuario: 'gabriela.ponce', empresa: 'Ponce Celebraciones' },
  e01hu04read: { nombres: 'Claudia', apellidoPaterno: 'Benites', apellidoMaterno: 'Flores', correo: 'claudia.benites.e01', usuario: 'claudia.benites', empresa: 'Benites Eventos' },
  e01hu04edit: { nombres: 'Mónica', apellidoPaterno: 'Quispe', apellidoMaterno: 'Guzmán', correo: 'monica.quispe.e01', usuario: 'monica.quispe', empresa: 'Quispe Bodas' },
  e01hu04invalid: { nombres: 'Verónica', apellidoPaterno: 'Cabrera', apellidoMaterno: 'Peña', correo: 'veronica.cabrera.e01', usuario: 'veronica.cabrera', empresa: 'Cabrera Eventos' },
  e01hu05logout: { nombres: 'Patricia', apellidoPaterno: 'Espinoza', apellidoMaterno: 'Mora', correo: 'patricia.espinoza.e01', usuario: 'patricia.espinoza', empresa: 'Espinoza Bodas' },
  e01hu06listaA: { nombres: 'Daniela', apellidoPaterno: 'Ramírez', apellidoMaterno: 'Torres', correo: 'daniela.ramirez.lista', usuario: 'daniela.ramirez.lista', empresa: 'Ramírez Eventos' },
  e01hu06listaB: { nombres: 'Alejandra', apellidoPaterno: 'Castro', apellidoMaterno: 'Montalvo', correo: 'alejandra.castro.lista', usuario: 'alejandra.castro.lista', empresa: 'Castro Eventos' },
  e01hu06aislaA: { nombres: 'Daniela', apellidoPaterno: 'Ramírez', apellidoMaterno: 'Torres', correo: 'daniela.ramirez.aislamiento', usuario: 'daniela.ramirez.aislamiento', empresa: 'Ramírez Eventos' },
  e01hu06aislaB: { nombres: 'Alejandra', apellidoPaterno: 'Castro', apellidoMaterno: 'Montalvo', correo: 'alejandra.castro.aislamiento', usuario: 'alejandra.castro.aislamiento', empresa: 'Castro Eventos' },
  e01hu06filtroA: { nombres: 'Daniela', apellidoPaterno: 'Ramírez', apellidoMaterno: 'Torres', correo: 'daniela.ramirez.filtros', usuario: 'daniela.ramirez.filtros', empresa: 'Ramírez Eventos' },
  e01hu06filtroB: { nombres: 'Alejandra', apellidoPaterno: 'Castro', apellidoMaterno: 'Montalvo', correo: 'alejandra.castro.filtros', usuario: 'alejandra.castro.filtros', empresa: 'Castro Eventos' },
};

export const datosUnicos = (prefijo: string) => {
  secuencia += 1;
  const perfil = perfiles[prefijo] ?? { nombres: 'María', apellidoPaterno: 'Campos', apellidoMaterno: 'Ortiz', correo: 'maria.campos.e01', usuario: 'maria.campos', empresa: 'Campos Eventos' };
  const ejecucion = process.env.E01_RUN_ID ?? 'local';
  const sufijo = `${ejecucion}.${secuencia}`;
  return {
    ...perfil,
    correo: `${perfil.correo}+${sufijo}@example.com`,
    usuario: `${perfil.usuario}.${secuencia}`.slice(0, 40),
    contrasena: 'Prueba#2026',
    nombreComercial: perfil.empresa,
  };
};

export async function registrarYVerificar(
  contexto: ContextoE01,
  prefijo: string,
) {
  const datos = datosUnicos(prefijo);
  const api = cliente(contexto);
  const solicitud = await api.post('/api/v1/auth/registro/solicitar').send({
    nombres: datos.nombres,
    apellidoPaterno: datos.apellidoPaterno,
    apellidoMaterno: datos.apellidoMaterno,
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
    nombres: datos.nombres,
    apellidoPaterno: datos.apellidoPaterno,
    apellidoMaterno: datos.apellidoMaterno,
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

export async function crearBorradorMatrimonio(
  contexto: ContextoE01,
  accessToken: string,
  prefijo: string,
) {
  const datos = datosUnicos(prefijo);
  const tipos = await contexto.app.get(PrismaService).client.orm.public.TipoCeremonia.all() as unknown as Array<{
    idTipoCeremonia: number;
    activo: boolean;
  }>;
  const tipo = tipos.find((item) => item.activo !== false);
  if (!tipo) throw new Error('No existe un tipo de ceremonia activo en la base de prueba.');
  // Los datos de prueba persisten entre ejecuciones. La semilla temporal evita
  // reutilizar DNI de borradores de una corrida anterior y enmascarar HU06.
  const semillaDni = (Date.now() % 80_000_000) + (secuencia * 2);
  const baseDni = String(10_000_000 + (semillaDni % 80_000_000)).padStart(8, '0');
  const segundoDni = String(10_000_000 + ((semillaDni + 1) % 80_000_000)).padStart(8, '0');
  const fecha = new Date();
  fecha.setUTCDate(fecha.getUTCDate() + 90);
  const fechaMatrimonio = fecha.toISOString().slice(0, 10);
  const respuesta = await cliente(contexto)
    .post('/api/v1/matrimonios/onboarding/borrador')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      pareja1: { nombres: 'Mateo', apellidoPaterno: 'Salinas', dni: baseDni, usuario: `mateo.salinas.${secuencia}`, contrasena: 'Pareja#2026' },
      pareja2: { nombres: 'Isabella', apellidoPaterno: 'Cárdenas', dni: segundoDni, usuario: `isabella.cardenas.${secuencia}`, contrasena: 'Pareja#2026' },
      fechaMatrimonio,
      cantidadInvitados: 50,
      presupuesto: 10000,
      idTipoCeremonia: tipo.idTipoCeremonia,
    });
  if (respuesta.status !== 201) throw new Error(`No se creó el borrador: HTTP ${respuesta.status}; ${respuesta.body.mensaje ?? ''}`);
  return respuesta.body.data as { proyecto: { idProyecto: string }; matrimonio: { idMatrimonio: string } };
}

export async function ejecutarCaso(
  resultados: ResultadoCaso[],
  id: string,
  accion: () => Promise<void>,
  variante?: string,
) {
  try {
    await accion();
    resultados.push({ id, estado: 'PASS', detalle: 'El comportamiento observado cumplió el resultado esperado.', variante });
  } catch (error) {
    const detalle = error instanceof Error ? error.message : String(error);
    resultados.push({ id, estado: 'FAIL', detalle, variante });
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
