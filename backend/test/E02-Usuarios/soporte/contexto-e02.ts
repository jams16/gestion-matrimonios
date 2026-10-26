import 'dotenv/config';
import { mkdir, writeFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';

import { AppModule } from '../../../src/app.module';
import { ApiExceptionFilter } from '../../../src/common/filters/api-exception.filter';
import { ApiResponseInterceptor } from '../../../src/common/interceptors/api-response.interceptor';

export type ResultadoCasoE02 = {
  id: string;
  estado: 'PASS' | 'FAIL';
  detalle: string;
  variante?: string;
};

export const datosFicticiosE02 = {
  weddingPlanner: { nombre: 'Daniela Ramírez Torres', correo: 'daniela.ramirez.e02@example.com' },
  weddingPlannerAlterna: { nombre: 'Alejandra Castro Montalvo', correo: 'alejandra.castro.e02@example.com' },
  colaborador: { nombre: 'Jorge Medina Salas', correo: 'jorge.medina.e02@example.com' },
  pareja: { nombre: 'Lucía Paredes Rojas', correo: 'lucia.paredes.e02@example.com' },
  matrimonios: ['Boda de Lucía Paredes y Andrés Flores', 'Boda de Renata Silva y Diego Campos'],
};

export async function crearContextoE02(): Promise<INestApplication<App>> {
  const url = process.env.DATABASE_URL ?? '';
  if (!/(?:_test|test_)/i.test(url)) {
    throw new Error('DATABASE_URL no identifica una base de datos de pruebas.');
  }
  const modulo = await Test.createTestingModule({ imports: [AppModule] }).compile();
  const app = modulo.createNestApplication<INestApplication<App>>();
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
  app.useGlobalFilters(new ApiExceptionFilter());
  app.useGlobalInterceptors(new ApiResponseInterceptor());
  await app.init();
  return app;
}

export const clienteE02 = (app: INestApplication<App>) => request(app.getHttpServer());

/** Comprueba el contrato real antes de marcar la ausencia funcional de E02. */
export function comprobarAusenciaModuloMiembros() {
  const contrato = readFileSync(join(process.cwd(), 'prisma', 'contract.prisma'), 'utf8');
  expect(contrato).toContain('model Proyecto');
  expect(contrato).not.toMatch(/model\s+(MiembroProyecto|RolOperativo|PermisoProyecto)\b/);
  throw new Error('La auditoría del contrato y módulos actuales no encontró entidades ni API para miembros, roles operativos o permisos por proyecto.');
}

export async function ejecutarCasoE02(
  resultados: ResultadoCasoE02[], id: string, accion: () => Promise<void>, variante?: string,
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

export async function guardarEvidenciaHuE02(hu: string, resultados: ResultadoCasoE02[]) {
  const ruta = join(process.cwd(), 'test', 'E02-Usuarios', hu, 'evidencias');
  await mkdir(ruta, { recursive: true });
  await writeFile(join(ruta, 'resultados-automaticos.json'), `${JSON.stringify(resultados, null, 2)}\n`);
  const filas = resultados.map((r) => `| ${r.id}${r.variante ? ` – ${r.variante}` : ''} | ${r.estado} | ${r.detalle.replace(/\|/g, '\\|')} |`).join('\n');
  await writeFile(join(ruta, 'resultado-automatico.md'), `# Resultado automático ${hu}\n\n| Caso | Estado | Resultado obtenido |\n|---|---|---|\n${filas}\n`);
}
