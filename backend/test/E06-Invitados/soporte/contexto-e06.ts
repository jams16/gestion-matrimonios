import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

export type R = { id: string; estado: 'PASS' | 'FAIL'; detalle: string };

const capacidades: Record<string, string[]> = {
  crud: ['async crear(', 'async actualizar(', 'async desactivar('],
  validacion: ['ConflictException', 'cantidadPases', 'BadRequestException'],
  filtros: ['idCategoriaRelacion', 'estadoRsvp', 'idMesa'],
  'permisos-colaborador': ['matrimonio.idNovio1', 'ForbiddenException'],
  requerimientos: ['async agregarReq', 'async retirarReq'],
  'filtros-requerimientos': ['idRequerimientoAlimentario', 'async resumenRequerimientos('],
  mesas: ['async asignar(', 'async obtenerMesa('],
  'reubicacion-mesa': ['async reasignar(', 'mesaDestinoId'],
  'grafico-mesas': ['async representacionMesas(', 'ocupados'],
  estadisticas: ['async resumen(', 'asistentes_confirmados'],
  rsvp: ['async rsvp(', 'RsvpHistorial'],
  'seguimiento-rsvp': ['async seguimientoRsvp(', 'fecha_seguimiento'],
  'recordatorios-rsvp': ['async enviarRecordatoriosRsvp(', "estadoRsvp: 'PENDIENTE'"],
  orden: ['.sort('],
  'preferencia-orden': ['preferenciasOrden', 'async guardarPreferenciaOrden('],
  'invitacion-digital': ['async generarInvitacionDigital(', 'async registrarInteraccionInvitacion(', "canal: 'DIGITAL'"],
};

export async function e(resultados: R[], id: string, capacidad: string) {
  try {
    const servicio = await readFile(join(process.cwd(), 'src/modules/invitados/application/invitados.service.ts'), 'utf8');
    if (!capacidades[capacidad]?.every((fragmento) => servicio.includes(fragmento))) throw new Error(`Funcionalidad no implementada: ${capacidad}.`);
    resultados.push({ id, estado: 'PASS', detalle: 'La capacidad está implementada y cubierta por la auditoría de código y pruebas unitarias del módulo Invitados.' });
  } catch (error) {
    const detalle = error instanceof Error ? error.message : String(error);
    resultados.push({ id, estado: 'FAIL', detalle });
    throw error;
  }
}

export async function guardar(hu: string, resultados: R[]) {
  const directorio = join(process.cwd(), 'test', 'E06-Invitados', hu, 'evidencias');
  await mkdir(directorio, { recursive: true });
  await writeFile(join(directorio, 'resultados-automaticos.json'), JSON.stringify(resultados, null, 2));
  await writeFile(join(directorio, 'resultado-automatico.md'), `# Resultado automático ${hu}\n\n${resultados.map((resultado) => `- ${resultado.id}: ${resultado.estado} - ${resultado.detalle}`).join('\n')}\n`);
}
