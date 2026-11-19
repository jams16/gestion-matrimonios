import 'dotenv/config';

import datosBase from './datos-base/catalogos-y-plantillas-base.json';
import ubigeosBase from './datos-base/ubigeos-base.json';
import riesgosComunesBase from './datos-base/riesgos-comunes-base';
import { valoresBuenasPracticasBase } from './datos-base/buenas-practicas-base';
import { edtGlobalBase } from './datos-base/edt-global-base';
import {
  cronogramaOficial,
  validarChecklistsActividad,
} from './datos-base/cronograma-plantillas-oficiales';
import { randomUUID } from 'node:crypto';

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
// Las plantillas CG/H/DB se mantienen separadas para que esta fuente oficial
// no dependa de snapshots históricos con textos y relaciones obsoletos.
datos.cr_plantilla_hito = cronogramaOficial.hitos;
datos.cr_plantilla_actividad = cronogramaOficial.actividades;
datos.cr_plantilla_dependencia = [];
datos.cr_plantilla_timing = cronogramaOficial.timing;
datos.cr_plantilla_actividad_tipo_ceremonia = [];
datos.cr_plantilla_timing_tipo_ceremonia = [];
const categoriasProveedorBase = ['LOCAL', 'CATERING', 'FOTOGRAFIA', 'VIDEO', 'MUSICA', 'DJ', 'ORQUESTA', 'DECORACION', 'FLORES', 'MAQUILLAJE', 'PEINADO', 'VESTIDO', 'TRAJE', 'TRANSPORTE', 'AUTO_NUPCIAL', 'HOTEL', 'INVITACIONES', 'TORTA', 'POSTRES', 'BAR', 'SEGURIDAD', 'LIMPIEZA', 'PHOTOBOOTH', 'ENTRETENIMIENTO', 'CORO', 'CEREMONIA', 'MOBILIARIO', 'ILUMINACION', 'SONIDO', 'RECUERDOS', 'OTROS'];
const vacio = (): Resumen => ({ existentes: 0, restaurados: 0, errores: [] });
const errorTexto = (error: unknown) => {
  if (!(error instanceof Error)) return String(error);
  const pg = error as Error & { detail?: string; hint?: string; position?: string };
  return [pg.message, pg.detail, pg.hint, pg.position ? `posicion ${pg.position}` : null]
    .filter(Boolean)
    .join(' | ');
};

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

async function categoriasProveedor(c: ClienteSql, r: Resumen) {
  r.existentes = await contar(c, 'pv_categoria_servicio');
  const existentes = new Set((await c.query('SELECT codigo FROM public.pv_categoria_servicio')).rows.map((x) => String(x.codigo)));
  for (const [indice, codigo] of categoriasProveedorBase.entries()) {
    if (existentes.has(codigo)) continue;
    const nombre = codigo.toLowerCase().replaceAll('_', ' ').replace(/\b\w/g, (letra) => letra.toUpperCase());
    try { await c.query('INSERT INTO public.pv_categoria_servicio (codigo, nombre, orden, activo, updated_at) VALUES ($1, $2, $3, true, now()) ON CONFLICT (codigo) DO NOTHING', [codigo, nombre, indice + 1]); r.restaurados += 1; }
    catch (error) { r.errores.push(`${codigo}: ${errorTexto(error)}`); }
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

/** Materializa el puente N:M a partir de las asociaciones históricas de plantilla. */
async function hitosActividadesPlantilla(c: ClienteSql, r: Resumen) {
  r.existentes = await contar(c, 'cr_plantilla_hito_actividad');
  const filas = await c.query('SELECT id_plantilla_hito, id_plantilla_actividad FROM public.cr_plantilla_actividad WHERE id_plantilla_hito IS NOT NULL');
  for (const fila of filas.rows) try {
    const resultado = await c.query(
      'INSERT INTO public.cr_plantilla_hito_actividad (id_plantilla_hito, id_plantilla_actividad) VALUES ($1, $2) ON CONFLICT (id_plantilla_hito, id_plantilla_actividad) DO NOTHING',
      [fila.id_plantilla_hito, fila.id_plantilla_actividad],
    );
    r.restaurados += Number(resultado.rowCount ?? 0);
  } catch (error) { r.errores.push(errorTexto(error)); }
}

/** Convierte listas JSON heredadas en ítems operativos de plantilla. */
async function checklistPlantilla(c: ClienteSql, r: Resumen) {
  r.existentes = await contar(c, 'cr_plantilla_actividad_checklist');
  const filas = await c.query('SELECT id_plantilla_actividad, lista_verificacion FROM public.cr_plantilla_actividad WHERE lista_verificacion IS NOT NULL');
  for (const fila of filas.rows) {
    // Sin borrados: los registros de plantilla sobrantes quedan inactivos.
    // Este restaurador solo altera plantillas base, nunca instancias de
    // actividades que pertenezcan a un matrimonio ya creado.
    await c.query(
      'UPDATE public.cr_plantilla_actividad_checklist SET activo=false, updated_at=now() WHERE id_plantilla_actividad=$1',
      [fila.id_plantilla_actividad],
    );
    const bruto = fila.lista_verificacion;
    const valores = Array.isArray(bruto) ? bruto : [bruto];
    const textos = valores.flatMap((valor) => typeof valor === 'string'
      ? valor.split(/[-\n]/)
      : Object.values((valor ?? {}) as Fila).map(String))
      .map((valor) => String(valor).trim()).filter(Boolean);
    for (const [indice, descripcion] of textos.entries()) try {
      const existente = await c.query(
        'SELECT id_plantilla_checklist FROM public.cr_plantilla_actividad_checklist WHERE id_plantilla_actividad=$1 ORDER BY id_plantilla_checklist LIMIT 1 OFFSET $2',
        [fila.id_plantilla_actividad, indice],
      );
      if (existente.rowCount) {
        await c.query(
          'UPDATE public.cr_plantilla_actividad_checklist SET descripcion=$1, orden=$2, obligatorio=true, activo=true, updated_at=now() WHERE id_plantilla_checklist=$3',
          [descripcion, indice, existente.rows[0].id_plantilla_checklist],
        );
      } else {
        await c.query('INSERT INTO public.cr_plantilla_actividad_checklist (id_plantilla_actividad, descripcion, orden, obligatorio, activo, created_at, updated_at) VALUES ($1, $2, $3, true, true, now(), now())', [fila.id_plantilla_actividad, descripcion, indice]);
        r.restaurados += 1;
      }
    } catch (error) { r.errores.push(errorTexto(error)); }
  }
}

/** Sincroniza por código las plantillas oficiales sin depender de sus IDs. */
async function sincronizarCronogramaOficial(c: ClienteSql, relaciones: Resumen, dependenciasTiming: Resumen, tiposActividad: Resumen, tiposTiming: Resumen) {
  const fase = new Map((await c.query('SELECT id_fase_proyecto, codigo FROM public.gp_fase_proyecto')).rows.map((x) => [String(x.codigo), x.id_fase_proyecto]));
  const tipo = new Map((await c.query('SELECT id_tipo_ceremonia, codigo FROM public.gp_tipo_ceremonia')).rows.map((x) => [String(x.codigo), x.id_tipo_ceremonia]));
  for (const item of cronogramaOficial.actividades) {
    const codigo = String(item.codigo); const faseCodigo = Number(item.id_fase_proyecto) === 2 ? 'INICIO' : Number(item.id_fase_proyecto) === 3 ? 'PLANIFICACION' : Number(item.id_fase_proyecto) === 4 ? 'MONITOREO_Y_CONTROL' : Number(item.id_fase_proyecto) === 5 ? 'EJECUCION' : 'CIERRE';
    await c.query('UPDATE public.cr_plantilla_actividad SET id_fase_proyecto=$1,nombre=$2,lista_verificacion=$3::json,responsable_sugerido=$4,entregable=$5,tipo_temporal=$6,dias_antes_base=$7,orden=$8,activo=true,updated_at=now() WHERE codigo=$9', [fase.get(faseCodigo), item.nombre, item.lista_verificacion, item.responsable_sugerido, item.entregable, item.tipo_temporal, item.dias_antes_base, item.orden, codigo]);
  }
  for (const item of cronogramaOficial.hitos) await c.query('UPDATE public.cr_plantilla_hito SET nombre=$1,criterio_aceptacion=$2,tipo_temporal=$3,dias_antes_base=$4,orden=$5,activo=true,updated_at=now() WHERE codigo=$6', [item.nombre, item.criterio_aceptacion, item.tipo_temporal, item.dias_antes_base, item.orden, item.codigo]);
  for (const item of cronogramaOficial.timing) await c.query('UPDATE public.cr_plantilla_timing SET actividad=$1,duracion_minutos=$2,tipo_horario=$3,tiempo_extra_minutos=$4,offset_inicio_minutos=$5,responsable_sugerido=$6,lista_verificacion=$7::json,orden=$8,activo=true,updated_at=now() WHERE codigo=$9', [item.actividad, item.duracion_minutos, item.tipo_horario, item.tiempo_extra_minutos, item.offset_inicio_minutos, item.responsable_sugerido, item.lista_verificacion, item.orden, item.codigo]);
  const actividades = new Map((await c.query('SELECT id_plantilla_actividad,codigo FROM public.cr_plantilla_actividad')).rows.map((x) => [String(x.codigo), x.id_plantilla_actividad]));
  const hitos = new Map((await c.query('SELECT id_plantilla_hito,codigo FROM public.cr_plantilla_hito')).rows.map((x) => [String(x.codigo), x.id_plantilla_hito]));
  const timings = new Map((await c.query('SELECT id_plantilla_timing,codigo FROM public.cr_plantilla_timing')).rows.map((x) => [String(x.codigo), x.id_plantilla_timing]));

  // Las listas oficiales se mantienen como ítems, no como una sola oración.
  // Se actualizan por orden para conservar las FK de los checklists ya
  // generados en matrimonios y se propaga el texto corregido a esas instancias.
  relaciones.existentes = await contar(c, 'cr_plantilla_hito_actividad');
  for (const [codigoHito, codigosActividad] of cronogramaOficial.relacionesHitoActividad) for (const codigoActividad of codigosActividad) {
    const resultado = await c.query('INSERT INTO public.cr_plantilla_hito_actividad (id_plantilla_hito,id_plantilla_actividad) VALUES ($1,$2) ON CONFLICT (id_plantilla_hito,id_plantilla_actividad) DO NOTHING', [hitos.get(codigoHito), actividades.get(codigoActividad)]); relaciones.restaurados += Number(resultado.rowCount ?? 0);
  }
  for (const [pre, suc] of cronogramaOficial.dependencias) await c.query('INSERT INTO public.cr_plantilla_dependencia (id_actividad_predecesora,id_actividad_sucesora,tipo_dependencia,dias_desfase) VALUES ($1,$2,$3,0) ON CONFLICT (id_actividad_predecesora,id_actividad_sucesora) DO NOTHING', [actividades.get(pre), actividades.get(suc), 'FINISH_TO_START']);
  dependenciasTiming.existentes = await contar(c, 'cr_plantilla_timing_dependencia');
  for (const [pre, suc] of cronogramaOficial.dependenciasTiming) { const resultado = await c.query('INSERT INTO public.cr_plantilla_timing_dependencia (id_timing_predecesor,id_timing_sucesor,tipo_dependencia,minutos_desfase) VALUES ($1,$2,$3,0) ON CONFLICT (id_timing_predecesor,id_timing_sucesor) DO NOTHING', [timings.get(pre), timings.get(suc), 'FINISH_TO_START']); dependenciasTiming.restaurados += Number(resultado.rowCount ?? 0); }
  tiposActividad.existentes = await contar(c, 'cr_plantilla_actividad_tipo_ceremonia');
  for (const [codigo, codigos] of cronogramaOficial.ceremoniaActividad) for (const codigoTipo of codigos) { const resultado = await c.query('INSERT INTO public.cr_plantilla_actividad_tipo_ceremonia (id_plantilla_actividad,id_tipo_ceremonia) VALUES ($1,$2) ON CONFLICT (id_plantilla_actividad,id_tipo_ceremonia) DO NOTHING', [actividades.get(codigo), tipo.get(codigoTipo)]); tiposActividad.restaurados += Number(resultado.rowCount ?? 0); }
  tiposTiming.existentes = await contar(c, 'cr_plantilla_timing_tipo_ceremonia');
  for (const [codigo, codigos] of cronogramaOficial.ceremoniaTiming) for (const codigoTipo of codigos) { const resultado = await c.query('INSERT INTO public.cr_plantilla_timing_tipo_ceremonia (id_plantilla_timing,id_tipo_ceremonia) VALUES ($1,$2) ON CONFLICT (id_plantilla_timing,id_tipo_ceremonia) DO NOTHING', [timings.get(codigo), tipo.get(codigoTipo)]); tiposTiming.restaurados += Number(resultado.rowCount ?? 0); }
}

async function catalogoRiesgos(c: ClienteSql, categorias: Resumen, plantillas: Resumen, mitigaciones: Resumen, planes: Resumen) {
  categorias.existentes = await contar(c, 'rg_categoria_riesgo');
  plantillas.existentes = await contar(c, 'rg_plantilla_riesgo');
  mitigaciones.existentes = await contar(c, 'rg_plantilla_mitigacion');
  planes.existentes = await contar(c, 'rg_plantilla_plan');
  const categoriasActuales = new Map<string, number>((await c.query('SELECT id_categoria_riesgo, codigo FROM public.rg_categoria_riesgo')).rows.map((x) => [String(x.codigo), Number(x.id_categoria_riesgo)]));
  const riesgosActuales = new Map<string, number>((await c.query('SELECT id_plantilla_riesgo, codigo FROM public.rg_plantilla_riesgo')).rows.map((x) => [String(x.codigo), Number(x.id_plantilla_riesgo)]));
  for (const riesgo of riesgosComunesBase) {
    const codigoCategoria = riesgo.categoria.toUpperCase().replaceAll(/[^A-Z0-9]+/g, '_').replace(/^_|_$/g, '');
    try {
      let idCategoria = categoriasActuales.get(codigoCategoria);
      if (!idCategoria) {
        await c.query('INSERT INTO public.rg_categoria_riesgo (codigo, nombre, activo, updated_at) VALUES ($1, $2, true, now()) ON CONFLICT (codigo) DO NOTHING', [codigoCategoria, riesgo.categoria]);
        idCategoria = Number((await c.query('SELECT id_categoria_riesgo FROM public.rg_categoria_riesgo WHERE codigo = $1', [codigoCategoria])).rows[0].id_categoria_riesgo);
        categoriasActuales.set(codigoCategoria, idCategoria);
        categorias.restaurados += 1;
      }
      let idRiesgo = riesgosActuales.get(riesgo.codigo);
      if (!idRiesgo) {
        await c.query('INSERT INTO public.rg_plantilla_riesgo (id_categoria_riesgo, codigo, nombre, descripcion, causa_probable, efecto_potencial, activo, updated_at) VALUES ($1, $2, $3, $4, $5, $6, true, now()) ON CONFLICT (codigo) DO NOTHING', [idCategoria, riesgo.codigo, riesgo.nombre, riesgo.nombre, riesgo.causa, riesgo.efecto]);
        idRiesgo = Number((await c.query('SELECT id_plantilla_riesgo FROM public.rg_plantilla_riesgo WHERE codigo = $1', [riesgo.codigo])).rows[0].id_plantilla_riesgo);
        riesgosActuales.set(riesgo.codigo, idRiesgo);
        plantillas.restaurados += 1;
      }
      if (!(await c.query('SELECT 1 FROM public.rg_plantilla_mitigacion WHERE id_plantilla_riesgo = $1 AND descripcion = $2', [idRiesgo, riesgo.mitigacion])).rowCount) {
        await c.query('INSERT INTO public.rg_plantilla_mitigacion (id_plantilla_riesgo, descripcion, activo, updated_at) VALUES ($1, $2, true, now())', [idRiesgo, riesgo.mitigacion]);
        mitigaciones.restaurados += 1;
      }
      const alternativas: Array<[string, string]> = [['PLAN_A', riesgo.planA], ...(riesgo.planB ? [['PLAN_B', riesgo.planB] as [string, string]] : [])];
      for (const [alternativa, accion] of alternativas) {
        if ((await c.query('SELECT 1 FROM public.rg_plantilla_plan WHERE id_plantilla_riesgo = $1 AND alternativa = $2', [idRiesgo, alternativa])).rowCount) continue;
        await c.query('INSERT INTO public.rg_plantilla_plan (id_plantilla_riesgo, alternativa, accion, activo, updated_at) VALUES ($1, $2, $3, true, now())', [idRiesgo, alternativa, accion]);
        planes.restaurados += 1;
      }
    } catch (error) {
      // En una ejecucion parcial las plantillas pueden existir y fallar solo
      // sus planes. El error se informa en la seccion que corresponde.
      planes.errores.push(`${riesgo.codigo}: ${errorTexto(error)}`);
    }
  }
}

async function buenasPracticas(c: ClienteSql, r: Resumen) {
  r.existentes = await contar(c, 'gp_buena_practica');
  try {
    const resultado = await c.query(`
      INSERT INTO public.gp_buena_practica (
        codigo, nombre, descripcion, aplicacion_matrimonios, area_gestion,
        fuente_metodologica, anio_fuente, referencia_especifica,
        id_fase_proyecto, ejemplo_practico, recomendaciones, estado, version
      )
      SELECT
        v.codigo, v.nombre, v.descripcion, v.aplicacion_matrimonios,
        v.area_gestion, v.fuente_metodologica, v.anio_fuente,
        v.referencia_especifica, NULL, NULL, NULL, TRUE, 1
      FROM (VALUES ${valoresBuenasPracticasBase()}) AS v(
        codigo, nombre, descripcion, aplicacion_matrimonios, area_gestion,
        fuente_metodologica, anio_fuente, referencia_especifica
      )
      ON CONFLICT (codigo) DO UPDATE SET
        nombre = EXCLUDED.nombre,
        descripcion = EXCLUDED.descripcion,
        aplicacion_matrimonios = EXCLUDED.aplicacion_matrimonios,
        area_gestion = EXCLUDED.area_gestion,
        fuente_metodologica = EXCLUDED.fuente_metodologica,
        anio_fuente = EXCLUDED.anio_fuente,
        referencia_especifica = EXCLUDED.referencia_especifica,
        id_fase_proyecto = NULL,
        ejemplo_practico = NULL,
        recomendaciones = NULL,
        estado = TRUE,
        version = 1,
        fecha_modificacion = CURRENT_TIMESTAMP
      RETURNING (xmax = 0) AS insertado;
    `);
    for (const fila of resultado.rows) {
      if (fila.insertado) {
        r.restaurados += 1;
      }
    }
  } catch (error) {
    r.errores.push(errorTexto(error));
  }
}

async function edtGlobal(c: ClienteSql, r: Resumen) {
  r.existentes = Number((await c.query(`
    SELECT count(*)::int AS total
    FROM public.gp_edt_plantilla_elemento relacion
    JOIN public.gp_edt_plantilla plantilla
      ON plantilla.id_edt_plantilla = relacion.id_edt_plantilla
    WHERE plantilla.tipo = 'GLOBAL' AND relacion.activo = true
  `)).rows[0].total);
  try {
    const globales = (await c.query("SELECT id_edt_plantilla FROM public.gp_edt_plantilla WHERE tipo = 'GLOBAL' ORDER BY created_at")).rows;
    if (globales.length > 1) {
      r.errores.push('Existe más de una plantilla EDT GLOBAL. Corrige ese dato antes de restaurar.');
      return;
    }
    let idPlantilla = globales[0]?.id_edt_plantilla as string | undefined;
    if (!idPlantilla) {
      idPlantilla = randomUUID();
      await c.query('INSERT INTO public.gp_edt_plantilla (id_edt_plantilla, nombre, descripcion, tipo, activo, created_at, updated_at) VALUES ($1, $2, $3, $4, true, now(), now())', [idPlantilla, 'EDT general de matrimonio', 'Plantilla base proporcionada por el sistema para organizar un matrimonio.', 'GLOBAL']);
      r.restaurados += 1;
    }
    await c.query('UPDATE public.gp_edt_plantilla SET nombre = $1, descripcion = $2, activo = true, updated_at = now() WHERE id_edt_plantilla = $3', [
      'EDT general de matrimonio',
      'Plantilla base proporcionada por el sistema para organizar un matrimonio.',
      idPlantilla,
    ]);
    const categorias = new Map<string, number>((await c.query('SELECT id_categoria_servicio, codigo FROM public.pv_categoria_servicio')).rows.map((x) => [String(x.codigo), Number(x.id_categoria_servicio)]));
    const actuales = new Map<string, string>((await c.query('SELECT id_edt_elemento, nombre FROM public.gp_edt_elemento')).rows.map((x) => [String(x.nombre), String(x.id_edt_elemento)]));
    const elementos = new Map<string, string>();
    for (const item of edtGlobalBase) {
      let idElemento = actuales.get(item.nombre);
      const idCategoria = item.categoria ? categorias.get(item.categoria) : null;
      if (item.categoria && !idCategoria) { r.errores.push(`${item.codigo}: no existe la categoría ${item.categoria}.`); continue; }
      if (!idElemento) {
        idElemento = randomUUID();
        await c.query('INSERT INTO public.gp_edt_elemento (id_edt_elemento, nombre, descripcion, id_categoria_servicio, activo, created_at, updated_at) VALUES ($1, $2, $3, $4, true, now(), now())', [idElemento, item.nombre, item.descripcion, idCategoria]);
        actuales.set(item.nombre, idElemento!); r.restaurados += 1;
      } else {
        await c.query('UPDATE public.gp_edt_elemento SET descripcion = $1, id_categoria_servicio = $2, activo = true, updated_at = now() WHERE id_edt_elemento = $3', [item.descripcion, idCategoria, idElemento]);
      }
      elementos.set(item.nombre, idElemento!);
    }
    const relacionesActuales = new Map<string, string>((await c.query('SELECT id_edt_plantilla_elemento, id_edt_elemento FROM public.gp_edt_plantilla_elemento WHERE id_edt_plantilla = $1', [idPlantilla])).rows.map((x) => [String(x.id_edt_elemento), String(x.id_edt_plantilla_elemento)]));
    // La tabla de elementos es reutilizable; al cambiar la plantilla GLOBAL solo
    // se desactivan sus vínculos obsoletos, nunca se eliminan elementos catálogo.
    await c.query('UPDATE public.gp_edt_plantilla_elemento SET activo = false WHERE id_edt_plantilla = $1', [idPlantilla]);
    const relaciones = new Map<string, string>();
    for (const item of edtGlobalBase) {
      const idElemento = elementos.get(item.nombre); if (!idElemento) continue;
      const idPadre = item.padre ? relaciones.get(item.padre) : null;
      if (item.padre && !idPadre) { r.errores.push(`${item.codigo}: no se pudo resolver el padre ${item.padre}.`); continue; }
      let idRelacion = relacionesActuales.get(idElemento);
      if (!idRelacion) {
        idRelacion = randomUUID();
        await c.query('INSERT INTO public.gp_edt_plantilla_elemento (id_edt_plantilla_elemento, id_edt_plantilla, id_edt_elemento, id_edt_plantilla_elemento_padre, orden, activo) VALUES ($1, $2, $3, $4, $5, true)', [idRelacion, idPlantilla, idElemento, idPadre, item.orden]);
        relacionesActuales.set(idElemento, idRelacion!); r.restaurados += 1;
      } else {
        await c.query('UPDATE public.gp_edt_plantilla_elemento SET id_edt_plantilla_elemento_padre = $1, orden = $2, activo = true WHERE id_edt_plantilla_elemento = $3', [idPadre, item.orden, idRelacion]);
      }
      relaciones.set(item.nombre, idRelacion!);
    }
  } catch (error) { r.errores.push(errorTexto(error)); }
}

async function secuencias(c: ClienteSql) {
  const pares = [['gp_tipo_ceremonia', 'id_tipo_ceremonia'], ['gp_fase_proyecto', 'id_fase_proyecto'], ['gp_buena_practica', 'id_buena_practica'], ['cr_plantilla_hito', 'id_plantilla_hito'], ['cr_plantilla_actividad', 'id_plantilla_actividad'], ['cr_plantilla_actividad_tipo_ceremonia', 'id_plantilla_actividad_tipo_ceremonia'], ['cr_plantilla_dependencia', 'id_plantilla_dependencia'], ['cr_plantilla_timing', 'id_plantilla_timing'], ['cr_plantilla_timing_tipo_ceremonia', 'id_plantilla_timing_tipo_ceremonia']];
  for (const [tabla, columna] of pares) await c.query(`SELECT setval(pg_get_serial_sequence('public.${tabla}', '${columna}'), COALESCE((SELECT MAX(${columna}) FROM public.${tabla}), 1), true)`);
}

async function ejecutar() {
  // Se valida antes de abrir la conexión: un separador o texto alterado nunca llega a la BD.
  validarChecklistsActividad();
  const c = new Client({ connectionString: process.env.DATABASE_URL });
  const r = { ubigeos: vacio(), categoriasProveedor: vacio(), tipos: vacio(), fases: vacio(), buenasPracticas: vacio(), edtGlobal: vacio(), hitos: vacio(), actividades: vacio(), dependencias: vacio(), hitosActividades: vacio(), checklist: vacio(), timing: vacio(), timingDependencias: vacio(), actividadTipo: vacio(), timingTipo: vacio(), categoriasRiesgo: vacio(), plantillasRiesgo: vacio(), mitigacionesRiesgo: vacio(), planesRiesgo: vacio() };
  await c.connect();
  try {
    await ubigeos(c, r.ubigeos); await categoriasProveedor(c, r.categoriasProveedor); await catalogo(c, r.tipos, 'gp_tipo_ceremonia', datos.gp_tipo_ceremonia); const fases = await catalogo(c, r.fases, 'gp_fase_proyecto', datos.gp_fase_proyecto); await buenasPracticas(c, r.buenasPracticas); await edtGlobal(c, r.edtGlobal); const hitosReales = await hitos(c, r.hitos); await actividades(c, r.actividades, hitosReales, fases); await timings(c, r.timing); await sincronizarCronogramaOficial(c, r.hitosActividades, r.timingDependencias, r.actividadTipo, r.timingTipo); await checklistPlantilla(c, r.checklist); await catalogoRiesgos(c, r.categoriasRiesgo, r.plantillasRiesgo, r.mitigacionesRiesgo, r.planesRiesgo); await secuencias(c);
  } finally { await c.end(); }
  console.log('Restauración de datos base');
  const etiquetas: Array<[string, Resumen]> = [['Ubigeos', r.ubigeos], ['Categorías de proveedor', r.categoriasProveedor], ['Tipos de ceremonia', r.tipos], ['Fases de proyecto', r.fases], ['Buenas prácticas', r.buenasPracticas], ['Hitos de plantilla', r.hitos], ['Actividades de plantilla', r.actividades], ['Dependencias de plantilla', r.dependencias], ['Timing de plantilla', r.timing], ['Relaciones actividad/tipo de ceremonia', r.actividadTipo], ['Relaciones timing/tipo de ceremonia', r.timingTipo], ['Categorías de riesgo', r.categoriasRiesgo], ['Plantillas de riesgo', r.plantillasRiesgo], ['Mitigaciones de riesgo', r.mitigacionesRiesgo], ['Planes de riesgo', r.planesRiesgo]];
  etiquetas.splice(9, 0, ['Relaciones hito/actividad', r.hitosActividades], ['Checklists de actividad', r.checklist], ['Dependencias de timing', r.timingDependencias]);
  etiquetas.unshift(['EDT global', r.edtGlobal]);
  etiquetas.forEach(([nombre, resumen]) => console.log(`${nombre}: ${resumen.restaurados} restaurados | ${resumen.existentes} ya existentes | ${resumen.errores.length} errores`));
  const tablas = etiquetas.map(([, resumen]) => resumen); const totalNuevos = tablas.reduce((n, x) => n + x.restaurados, 0); const totalExistentes = tablas.reduce((n, x) => n + x.existentes, 0); const errores = tablas.flatMap((x) => x.errores);
  console.log(`Total: ${totalNuevos} restaurados | ${totalExistentes} ya existentes | ${errores.length} errores`);
  if (errores.length) {
    console.error('Detalle de errores:');
    for (const error of errores) console.error(`- ${error}`);
  }
  if (errores.length) process.exitCode = 1;
}

void ejecutar().catch((error) => { console.error(`Error fatal al restaurar datos base: ${errorTexto(error)}`); process.exitCode = 1; });
