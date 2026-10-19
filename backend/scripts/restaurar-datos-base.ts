import 'dotenv/config';

import datosBase from './datos-base/catalogos-y-plantillas-base.json';
import ubigeosBase from './datos-base/ubigeos-base.json';

type Fila = Record<string, unknown>;
type Resumen = { existentes: number; restaurados: number; errores: string[] };
type Datos = Record<string, Fila[]>;
type ResultadoSql = { rows: Fila[]; rowCount: number | null };
type ClienteSql = {
  connect(): Promise<void>;
  end(): Promise<void>;
  query(sql: string, valores?: unknown[]): Promise<ResultadoSql>;
};
type ConstructorClienteSql = new (opciones: {
  connectionString: string | undefined;
}) => ClienteSql;

// `pg` es una dependencia de ejecución del backend, pero no expone tipos en
// este repositorio. Esta interfaz evita añadir una dependencia solo para este
// script y mantiene las consultas parametrizadas.
const { Client } = require('pg') as { Client: ConstructorClienteSql };

const datos = datosBase as Datos;
const vacio = (): Resumen => ({ existentes: 0, restaurados: 0, errores: [] });
const errorTexto = (error: unknown) => error instanceof Error ? error.message : String(error);

async function contar(c: ClienteSql, tabla: string) {
  return Number((await c.query(`SELECT count(*)::int AS total FROM public.${tabla}`)).rows[0].total);
}

async function insertarConId(
  c: ClienteSql, conId: string, sinId: string, valoresConId: unknown[], valoresSinId: unknown[],
) {
  try { await c.query(conId, valoresConId); }
  catch (error) {
    if ((error as { code?: string }).code !== '23505') throw error;
    await c.query(sinId, valoresSinId);
  }
}

async function ubigeos(c: ClienteSql, r: Resumen) {
  r.existentes = await contar(c, 'in_ubigeo');
  const ids = new Set((await c.query('SELECT id_ubigeo FROM public.in_ubigeo')).rows.map((x) => x.id_ubigeo));
  for (const x of ubigeosBase) {
    if (ids.has(x.idUbigeo)) continue;
    try {
      await c.query('INSERT INTO public.in_ubigeo (id_ubigeo, departamento, provincia, distrito) VALUES ($1, $2, $3, $4)', [x.idUbigeo, x.departamento, x.provincia, x.distrito]);
      r.restaurados += 1;
    } catch (error) { r.errores.push(`${x.idUbigeo}: ${errorTexto(error)}`); }
  }
}

async function catalogo(
  c: ClienteSql, r: Resumen, tabla: 'gp_tipo_ceremonia' | 'gp_fase_proyecto', filas: Fila[],
) {
  const columna = tabla === 'gp_tipo_ceremonia' ? 'id_tipo_ceremonia' : 'id_fase_proyecto';
  r.existentes = await contar(c, tabla);
  const actuales = new Map<string, number>((await c.query(`SELECT ${columna}, codigo FROM public.${tabla}`)).rows.map((x) => [String(x.codigo), Number(x[columna])]));
  const mapeo = new Map<number, number>();
  for (const x of filas) {
    const codigo = String(x.codigo); let id = actuales.get(codigo);
    if (!id) try {
      const extras = tabla === 'gp_tipo_ceremonia' ? [x.nombre, x.descripcion, x.activo] : [x.nombre, x.descripcion, x.orden, x.activo];
      const columnas = tabla === 'gp_tipo_ceremonia' ? 'codigo, nombre, descripcion, activo' : 'codigo, nombre, descripcion, orden, activo';
      const marcas = tabla === 'gp_tipo_ceremonia' ? '$2, $3, $4, $5' : '$2, $3, $4, $5, $6';
      const marcasSin = tabla === 'gp_tipo_ceremonia' ? '$1, $2, $3, $4' : '$1, $2, $3, $4, $5';
      await insertarConId(c,
        `INSERT INTO public.${tabla} (${columna}, ${columnas}) VALUES ($1, ${marcas})`,
        `INSERT INTO public.${tabla} (${columnas}) VALUES (${marcasSin}) ON CONFLICT (codigo) DO NOTHING`,
        [x[columna], codigo, ...extras], [codigo, ...extras]);
      id = Number((await c.query(`SELECT ${columna} FROM public.${tabla} WHERE codigo = $1`, [codigo])).rows[0][columna]);
      actuales.set(codigo, id); r.restaurados += 1;
    } catch (error) { r.errores.push(`${codigo}: ${errorTexto(error)}`); continue; }
    mapeo.set(Number(x[columna]), id);
  }
  return mapeo;
}

async function hitos(c: ClienteSql, r: Resumen) {
  r.existentes = await contar(c, 'cr_plantilla_hito');
  const actuales = new Map<string, number>((await c.query('SELECT id_plantilla_hito, codigo FROM public.cr_plantilla_hito')).rows.map((x) => [String(x.codigo), Number(x.id_plantilla_hito)]));
  const mapeo = new Map<number, number>();
  for (const x of datos.cr_plantilla_hito) {
    const codigo = String(x.codigo); let id = actuales.get(codigo);
    if (!id) try {
      const v = [codigo, x.nombre, x.criterio_aceptacion, x.tipo_temporal, x.dias_antes_base, x.dias_antes_minimo, x.orden, x.activo, x.created_at, x.updated_at];
      await insertarConId(c,
        'INSERT INTO public.cr_plantilla_hito (id_plantilla_hito, codigo, nombre, criterio_aceptacion, tipo_temporal, dias_antes_base, dias_antes_minimo, orden, activo, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
        'INSERT INTO public.cr_plantilla_hito (codigo, nombre, criterio_aceptacion, tipo_temporal, dias_antes_base, dias_antes_minimo, orden, activo, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) ON CONFLICT (codigo) DO NOTHING', [x.id_plantilla_hito, ...v], v);
      id = Number((await c.query('SELECT id_plantilla_hito FROM public.cr_plantilla_hito WHERE codigo = $1', [codigo])).rows[0].id_plantilla_hito);
      actuales.set(codigo, id); r.restaurados += 1;
    } catch (error) { r.errores.push(`${codigo}: ${errorTexto(error)}`); continue; }
    mapeo.set(Number(x.id_plantilla_hito), id);
  }
  return mapeo;
}

async function actividades(c: ClienteSql, r: Resumen, hitosReales: Map<number, number>, fasesReales: Map<number, number>) {
  r.existentes = await contar(c, 'cr_plantilla_actividad');
  const actuales = new Map<string, number>((await c.query('SELECT id_plantilla_actividad, codigo FROM public.cr_plantilla_actividad')).rows.map((x) => [String(x.codigo), Number(x.id_plantilla_actividad)]));
  const mapeo = new Map<number, number>();
  for (const x of datos.cr_plantilla_actividad) {
    const codigo = String(x.codigo); let id = actuales.get(codigo);
    if (!id) try {
      const v = [hitosReales.get(Number(x.id_plantilla_hito)) ?? null, fasesReales.get(Number(x.id_fase_proyecto)), codigo, x.nombre, x.lista_verificacion, x.responsable_sugerido, x.entregable, x.tipo_temporal, x.dias_antes_base, x.dias_antes_minimo, x.duracion_estimada_dias, x.prioridad, x.orden, x.activo, x.created_at, x.updated_at];
      await insertarConId(c,
        'INSERT INTO public.cr_plantilla_actividad (id_plantilla_actividad, id_plantilla_hito, id_fase_proyecto, codigo, nombre, lista_verificacion, responsable_sugerido, entregable, tipo_temporal, dias_antes_base, dias_antes_minimo, duracion_estimada_dias, prioridad, orden, activo, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6::json, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)',
        'INSERT INTO public.cr_plantilla_actividad (id_plantilla_hito, id_fase_proyecto, codigo, nombre, lista_verificacion, responsable_sugerido, entregable, tipo_temporal, dias_antes_base, dias_antes_minimo, duracion_estimada_dias, prioridad, orden, activo, created_at, updated_at) VALUES ($1, $2, $3, $4, $5::json, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) ON CONFLICT (codigo) DO NOTHING', [x.id_plantilla_actividad, ...v], v);
      id = Number((await c.query('SELECT id_plantilla_actividad FROM public.cr_plantilla_actividad WHERE codigo = $1', [codigo])).rows[0].id_plantilla_actividad);
      actuales.set(codigo, id); r.restaurados += 1;
    } catch (error) { r.errores.push(`${codigo}: ${errorTexto(error)}`); continue; }
    mapeo.set(Number(x.id_plantilla_actividad), id);
  }
  return mapeo;
}

async function timings(c: ClienteSql, r: Resumen) {
  r.existentes = await contar(c, 'cr_plantilla_timing');
  const actuales = new Map<string, number>((await c.query('SELECT id_plantilla_timing, codigo FROM public.cr_plantilla_timing')).rows.map((x) => [String(x.codigo), Number(x.id_plantilla_timing)]));
  const mapeo = new Map<number, number>();
  for (const x of datos.cr_plantilla_timing) {
    const codigo = String(x.codigo); let id = actuales.get(codigo);
    if (!id) try {
      const v = [codigo, x.hora_inicio, x.duracion_minutos, x.actividad, x.responsable_sugerido, x.lista_verificacion, x.orden, x.activo, x.created_at, x.updated_at];
      await insertarConId(c,
        'INSERT INTO public.cr_plantilla_timing (id_plantilla_timing, codigo, hora_inicio, duracion_minutos, actividad, responsable_sugerido, lista_verificacion, orden, activo, created_at, updated_at) VALUES ($1, $2, $3::time, $4, $5, $6, $7::json, $8, $9, $10, $11)',
        'INSERT INTO public.cr_plantilla_timing (codigo, hora_inicio, duracion_minutos, actividad, responsable_sugerido, lista_verificacion, orden, activo, created_at, updated_at) VALUES ($1, $2::time, $3, $4, $5, $6::json, $7, $8, $9, $10) ON CONFLICT (codigo) DO NOTHING', [x.id_plantilla_timing, ...v], v);
      id = Number((await c.query('SELECT id_plantilla_timing FROM public.cr_plantilla_timing WHERE codigo = $1', [codigo])).rows[0].id_plantilla_timing);
      actuales.set(codigo, id); r.restaurados += 1;
    } catch (error) { r.errores.push(`${codigo}: ${errorTexto(error)}`); continue; }
    mapeo.set(Number(x.id_plantilla_timing), id);
  }
  return mapeo;
}

async function relaciones(c: ClienteSql, r: Resumen, tabla: 'cr_plantilla_actividad_tipo_ceremonia' | 'cr_plantilla_timing_tipo_ceremonia', filas: Fila[], principal: Map<number, number>, tipos: Map<number, number>) {
  const col = tabla.includes('actividad') ? 'id_plantilla_actividad' : 'id_plantilla_timing';
  const id = tabla.includes('actividad') ? 'id_plantilla_actividad_tipo_ceremonia' : 'id_plantilla_timing_tipo_ceremonia';
  r.existentes = await contar(c, tabla);
  for (const x of filas) {
    const relacionado = principal.get(Number(x[col])); const tipo = tipos.get(Number(x.id_tipo_ceremonia));
    if (!relacionado || !tipo) { r.errores.push(`Relación ${x[id]}: referencia ausente.`); continue; }
    if ((await c.query(`SELECT 1 FROM public.${tabla} WHERE ${col} = $1 AND id_tipo_ceremonia = $2`, [relacionado, tipo])).rowCount) continue;
    try {
      await insertarConId(c, `INSERT INTO public.${tabla} (${id}, ${col}, id_tipo_ceremonia) VALUES ($1, $2, $3)`, `INSERT INTO public.${tabla} (${col}, id_tipo_ceremonia) VALUES ($1, $2) ON CONFLICT (${col}, id_tipo_ceremonia) DO NOTHING`, [x[id], relacionado, tipo], [relacionado, tipo]);
      r.restaurados += 1;
    } catch (error) { r.errores.push(`Relación ${x[id]}: ${errorTexto(error)}`); }
  }
}

async function dependencias(c: ClienteSql, r: Resumen, actividadesReales: Map<number, number>) {
  r.existentes = await contar(c, 'cr_plantilla_dependencia');
  for (const x of datos.cr_plantilla_dependencia) {
    const pre = actividadesReales.get(Number(x.id_actividad_predecesora)); const suc = actividadesReales.get(Number(x.id_actividad_sucesora));
    if (!pre || !suc) { r.errores.push(`Dependencia ${x.id_plantilla_dependencia}: actividad ausente.`); continue; }
    if ((await c.query('SELECT 1 FROM public.cr_plantilla_dependencia WHERE id_actividad_predecesora = $1 AND id_actividad_sucesora = $2', [pre, suc])).rowCount) continue;
    try {
      await insertarConId(c, 'INSERT INTO public.cr_plantilla_dependencia (id_plantilla_dependencia, id_actividad_predecesora, id_actividad_sucesora, tipo_dependencia, dias_desfase) VALUES ($1, $2, $3, $4, $5)', 'INSERT INTO public.cr_plantilla_dependencia (id_actividad_predecesora, id_actividad_sucesora, tipo_dependencia, dias_desfase) VALUES ($1, $2, $3, $4) ON CONFLICT (id_actividad_predecesora, id_actividad_sucesora) DO NOTHING', [x.id_plantilla_dependencia, pre, suc, x.tipo_dependencia, x.dias_desfase], [pre, suc, x.tipo_dependencia, x.dias_desfase]);
      r.restaurados += 1;
    } catch (error) { r.errores.push(`Dependencia ${x.id_plantilla_dependencia}: ${errorTexto(error)}`); }
  }
}

async function secuencias(c: ClienteSql) {
  const pares = [['gp_tipo_ceremonia', 'id_tipo_ceremonia'], ['gp_fase_proyecto', 'id_fase_proyecto'], ['cr_plantilla_hito', 'id_plantilla_hito'], ['cr_plantilla_actividad', 'id_plantilla_actividad'], ['cr_plantilla_actividad_tipo_ceremonia', 'id_plantilla_actividad_tipo_ceremonia'], ['cr_plantilla_dependencia', 'id_plantilla_dependencia'], ['cr_plantilla_timing', 'id_plantilla_timing'], ['cr_plantilla_timing_tipo_ceremonia', 'id_plantilla_timing_tipo_ceremonia']];
  for (const [tabla, columna] of pares) await c.query(`SELECT setval(pg_get_serial_sequence('public.${tabla}', '${columna}'), COALESCE((SELECT MAX(${columna}) FROM public.${tabla}), 1), true)`);
}

async function ejecutar() {
  const c = new Client({ connectionString: process.env.DATABASE_URL });
  const r = { ubigeos: vacio(), tipos: vacio(), fases: vacio(), hitos: vacio(), actividades: vacio(), dependencias: vacio(), timing: vacio(), actividadTipo: vacio(), timingTipo: vacio() };
  await c.connect();
  try {
    await ubigeos(c, r.ubigeos); const tipos = await catalogo(c, r.tipos, 'gp_tipo_ceremonia', datos.gp_tipo_ceremonia); const fases = await catalogo(c, r.fases, 'gp_fase_proyecto', datos.gp_fase_proyecto); const hitosReales = await hitos(c, r.hitos); const actividadesReales = await actividades(c, r.actividades, hitosReales, fases); await dependencias(c, r.dependencias, actividadesReales); const timingsReales = await timings(c, r.timing); await relaciones(c, r.actividadTipo, 'cr_plantilla_actividad_tipo_ceremonia', datos.cr_plantilla_actividad_tipo_ceremonia, actividadesReales, tipos); await relaciones(c, r.timingTipo, 'cr_plantilla_timing_tipo_ceremonia', datos.cr_plantilla_timing_tipo_ceremonia, timingsReales, tipos); await secuencias(c);
  } finally { await c.end(); }
  console.log('Restauración de datos base');
  const etiquetas: Array<[string, Resumen]> = [['Ubigeos', r.ubigeos], ['Tipos de ceremonia', r.tipos], ['Fases de proyecto', r.fases], ['Hitos de plantilla', r.hitos], ['Actividades de plantilla', r.actividades], ['Dependencias de plantilla', r.dependencias], ['Timing de plantilla', r.timing], ['Relaciones actividad/tipo de ceremonia', r.actividadTipo], ['Relaciones timing/tipo de ceremonia', r.timingTipo]];
  etiquetas.forEach(([nombre, resumen]) => console.log(`${nombre}: ${resumen.restaurados} restaurados | ${resumen.existentes} ya existentes | ${resumen.errores.length} errores`));
  const tablas = etiquetas.map(([, resumen]) => resumen); const totalNuevos = tablas.reduce((n, x) => n + x.restaurados, 0); const totalExistentes = tablas.reduce((n, x) => n + x.existentes, 0); const errores = tablas.flatMap((x) => x.errores);
  console.log(`Total: ${totalNuevos} restaurados | ${totalExistentes} ya existentes | ${errores.length} errores`);
  if (errores.length) process.exitCode = 1;
}

void ejecutar().catch((error) => { console.error(`Error fatal al restaurar datos base: ${errorTexto(error)}`); process.exitCode = 1; });
