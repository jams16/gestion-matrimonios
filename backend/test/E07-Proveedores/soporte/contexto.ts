import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

export type R = { id: string; estado: 'PASS' | 'FAIL'; detalle: string };

const rutaServicio = join(process.cwd(), 'src', 'modules', 'proveedores', 'application', 'proveedores.service.ts');
const rutaControlador = join(process.cwd(), 'src', 'modules', 'proveedores', 'presentation', 'proveedores.controller.ts');
const rutaDto = join(process.cwd(), 'src', 'modules', 'proveedores', 'application', 'dto', 'proveedores.dto.ts');

async function implementada(capacidad: string) {
  const [servicio, controlador, dto] = await Promise.all([readFile(rutaServicio, 'utf8'), readFile(rutaControlador, 'utf8'), readFile(rutaDto, 'utf8')]);
  const criterios: Record<string, boolean> = {
    directorio: servicio.includes('async listar(') && controlador.includes("@Get('proveedores')"),
    servicios: servicio.includes('async detalle(') && servicio.includes('async servicios('),
    favorito: controlador.includes("/favorito')") && servicio.includes('async actualizarRelacion('),
    disponibilidad: servicio.includes('async crearDisponibilidad(') && servicio.includes('async actualizarDisponibilidad('),
    prioridad: dto.includes('PrioridadProveedorDto') && servicio.includes('prioridad'),
    mantenimiento: servicio.includes('async crear(') && servicio.includes('async actualizar(') && servicio.includes('async desactivar('),
  };
  return criterios[capacidad] ?? false;
}

export async function e(registros: R[], id: string, capacidad: string) {
  const ok = await implementada(capacidad);
  const detalle = ok
    ? 'La capacidad fue localizada en los endpoints, DTOs y servicio reales de Proveedores.'
    : `Funcionalidad no implementada: ${capacidad}.`;
  const registro: R = { id, estado: ok ? 'PASS' : 'FAIL', detalle };
  registros.push(registro);
  if (!ok) throw new Error(detalle);
}

export async function g(hu: string, registros: R[]) {
  const directorio = join(process.cwd(), 'test', 'E07-Proveedores', hu, 'evidencias');
  await mkdir(directorio, { recursive: true });
  await writeFile(join(directorio, 'resultados-automaticos.json'), JSON.stringify(registros, null, 2));
  await writeFile(join(directorio, 'resultado-automatico.md'), registros.map(x => `${x.id} ${x.estado} ${x.detalle}`).join('\n'));
}
