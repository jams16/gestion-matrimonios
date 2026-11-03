#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/34caed996da6433e1e4abeb70e489d15a6691b10c934d439e56edc12fc6183e5/contract';
import endContract from '../../snapshots/34caed996da6433e1e4abeb70e489d15a6691b10c934d439e56edc12fc6183e5/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/d040238efa33e640ecad81edb12a0f5e57d2c422daef0a141c8ed171ed394143/contract';
import startContract from '../../snapshots/d040238efa33e640ecad81edb12a0f5e57d2c422daef0a141c8ed171ed394143/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  fn,
  lit,
  primaryKey,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'nt_notificacion_riesgo',
        columns: [
          col('atendida', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('id_incidencia', 'uuid', { codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_notificacion', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_riesgo', 'uuid', { codecRef: { codecId: 'pg/uuid@1' } }),
          col('severidad', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('tipo_evento_riesgo', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [
          primaryKey(['id_notificacion']),
          checkExpression(
            'nt_notificacion_riesgo_severidad_check_1ba7cc40',
            "\"severidad\" IN ('BAJO', 'MEDIO', 'ALTO')",
          ),
          checkExpression(
            'nt_notificacion_riesgo_tipo_evento_riesgo_check_ee6896fe',
            "\"tipo_evento_riesgo\" IN ('RIESGO_CRITICO', 'INCIDENCIA_REGISTRADA', 'PLAN_ACTIVADO')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'rg_activacion_plan',
        columns: [
          col('fecha_activacion', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id_activacion_plan', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_incidencia', 'uuid', { codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_plan_contingencia', 'uuid', {
            notNull: true,
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('id_usuario_registro', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('observacion', 'character varying(1000)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 1000 } },
          }),
        ],
        constraints: [primaryKey(['id_activacion_plan'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'rg_categoria_riesgo',
        columns: [
          col('activo', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('codigo', 'character varying(50)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 50 } },
          }),
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('descripcion', 'character varying(500)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 500 } },
          }),
          col('id_categoria_riesgo', 'SERIAL', {
            notNull: true,
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('nombre', 'character varying(100)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id_categoria_riesgo'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'rg_costo_riesgo',
        columns: [
          col('activo', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('concepto', 'character varying(200)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 200 } },
          }),
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id_costo_presupuesto', 'uuid', { codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_costo_riesgo', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_incidencia', 'uuid', { codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_riesgo', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('monto', 'numeric(12,2)', {
            notNull: true,
            codecRef: { codecId: 'pg/numeric@1', typeParams: { precision: 12, scale: 2 } },
          }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id_costo_riesgo'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'rg_documento_costo',
        columns: [
          col('activo', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id_costo_riesgo', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_documento_costo_riesgo', 'uuid', {
            notNull: true,
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('nombre', 'character varying(200)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 200 } },
          }),
          col('tipo', 'character varying(20)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 20 } },
          }),
          col('url', 'character varying(500)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 500 } },
          }),
        ],
        constraints: [primaryKey(['id_documento_costo_riesgo'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'rg_incidencia',
        columns: [
          col('atendida', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('critica', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('descripcion', 'character varying(1000)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 1000 } },
          }),
          col('fecha_incidencia', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id_incidencia', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_riesgo', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id_incidencia'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'rg_mitigacion_riesgo',
        columns: [
          col('activo', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('descripcion', 'character varying(1000)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 1000 } },
          }),
          col('estado', 'text', {
            notNull: true,
            default: lit('SUGERIDA'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('id_mitigacion_riesgo', 'uuid', {
            notNull: true,
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('id_plantilla_mitigacion', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('id_riesgo', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id_mitigacion_riesgo']),
          checkExpression(
            'rg_mitigacion_riesgo_estado_check_0f5ae68f',
            "\"estado\" IN ('SUGERIDA', 'APLICADA', 'DESCARTADA')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'rg_plan_contingencia',
        columns: [
          col('accion', 'character varying(1000)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 1000 } },
          }),
          col('activo', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('alternativa', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id_plan_contingencia', 'uuid', {
            notNull: true,
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('id_riesgo', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_usuario_responsable', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('version', 'int4', {
            notNull: true,
            default: lit(1),
            codecRef: { codecId: 'pg/int4@1' },
          }),
        ],
        constraints: [
          primaryKey(['id_plan_contingencia']),
          checkExpression(
            'rg_plan_contingencia_alternativa_check_7fad8842',
            "\"alternativa\" IN ('PLAN_A', 'PLAN_B', 'PLAN_C')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'rg_plantilla_mitigacion',
        columns: [
          col('activo', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('descripcion', 'character varying(1000)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 1000 } },
          }),
          col('id_plantilla_mitigacion', 'SERIAL', {
            notNull: true,
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('id_plantilla_riesgo', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('severidadMinima', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id_plantilla_mitigacion']),
          checkExpression(
            'rg_plantilla_mitigacion_severidadMinima_check_8d5c1920',
            "\"severidadMinima\" IN ('BAJO', 'MEDIO', 'ALTO')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'rg_plantilla_plan',
        columns: [
          col('accion', 'character varying(1000)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 1000 } },
          }),
          col('activo', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('alternativa', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id_plantilla_plan', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id_plantilla_riesgo', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id_plantilla_plan']),
          checkExpression(
            'rg_plantilla_plan_alternativa_check_7fad8842',
            "\"alternativa\" IN ('PLAN_A', 'PLAN_B', 'PLAN_C')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'rg_plantilla_riesgo',
        columns: [
          col('activo', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('causa_probable', 'character varying(1000)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 1000 } },
          }),
          col('codigo', 'character varying(50)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 50 } },
          }),
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('descripcion', 'character varying(1000)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 1000 } },
          }),
          col('efecto_potencial', 'character varying(1000)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 1000 } },
          }),
          col('id_categoria_riesgo', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id_plantilla_riesgo', 'SERIAL', {
            notNull: true,
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('nombre', 'character varying(200)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 200 } },
          }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id_plantilla_riesgo'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'rg_riesgo',
        columns: [
          col('activo', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('causa_probable', 'character varying(1000)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 1000 } },
          }),
          col('costo_asociado', 'numeric(12,2)', {
            codecRef: { codecId: 'pg/numeric@1', typeParams: { precision: 12, scale: 2 } },
          }),
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('descripcion', 'character varying(1000)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 1000 } },
          }),
          col('efecto_potencial', 'character varying(1000)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 1000 } },
          }),
          col('estado', 'text', {
            notNull: true,
            default: lit('IDENTIFICADO'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('id_categoria_riesgo', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id_matrimonio', 'uuid', { codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_plantilla_riesgo', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('id_proyecto', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_riesgo', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_usuario_responsable', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('impacto', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('nombre', 'character varying(200)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 200 } },
          }),
          col('probabilidad', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('severidad', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id_riesgo']),
          checkExpression(
            'rg_riesgo_estado_check_95b90dd1',
            "\"estado\" IN ('IDENTIFICADO', 'EN_TRATAMIENTO', 'ACTIVO', 'CERRADO')",
          ),
          checkExpression(
            'rg_riesgo_severidad_check_1ba7cc40',
            "\"severidad\" IN ('BAJO', 'MEDIO', 'ALTO')",
          ),
        ],
      }),
      this.addUnique({
        schema: 'public',
        table: 'rg_categoria_riesgo',
        constraint: 'rg_categoria_riesgo_codigo_key',
        columns: ['codigo'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'rg_plan_contingencia',
        constraint: 'rg_plan_contingencia_id_riesgo_alternativa_version_key',
        columns: ['id_riesgo', 'alternativa', 'version'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'rg_plantilla_riesgo',
        constraint: 'rg_plantilla_riesgo_codigo_key',
        columns: ['codigo'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'nt_notificacion_riesgo',
        index: 'nt_notificacion_riesgo_id_incidencia_idx_dc23a618',
        columns: ['id_incidencia'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'nt_notificacion_riesgo',
        index: 'nt_notificacion_riesgo_id_riesgo_idx_59be24f5',
        columns: ['id_riesgo'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'rg_activacion_plan',
        index: 'rg_activacion_plan_id_incidencia_idx_dc23a618',
        columns: ['id_incidencia'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'rg_activacion_plan',
        index: 'rg_activacion_plan_id_plan_contingencia_idx_81e0a5c9',
        columns: ['id_plan_contingencia'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'rg_activacion_plan',
        index: 'rg_activacion_plan_id_usuario_registro_idx_14d2f264',
        columns: ['id_usuario_registro'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'rg_costo_riesgo',
        index: 'rg_costo_riesgo_id_costo_presupuesto_idx_997bf6ae',
        columns: ['id_costo_presupuesto'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'rg_costo_riesgo',
        index: 'rg_costo_riesgo_id_incidencia_idx_dc23a618',
        columns: ['id_incidencia'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'rg_costo_riesgo',
        index: 'rg_costo_riesgo_id_riesgo_idx_59be24f5',
        columns: ['id_riesgo'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'rg_documento_costo',
        index: 'rg_documento_costo_id_costo_riesgo_idx_b9d12fb0',
        columns: ['id_costo_riesgo'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'rg_incidencia',
        index: 'rg_incidencia_id_riesgo_idx_59be24f5',
        columns: ['id_riesgo'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'rg_mitigacion_riesgo',
        index: 'rg_mitigacion_riesgo_id_plantilla_mitigacion_idx_5bee1967',
        columns: ['id_plantilla_mitigacion'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'rg_mitigacion_riesgo',
        index: 'rg_mitigacion_riesgo_id_riesgo_idx_59be24f5',
        columns: ['id_riesgo'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'rg_plan_contingencia',
        index: 'rg_plan_contingencia_id_riesgo_idx_59be24f5',
        columns: ['id_riesgo'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'rg_plan_contingencia',
        index: 'rg_plan_contingencia_id_usuario_responsable_idx_de19d98e',
        columns: ['id_usuario_responsable'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'rg_plantilla_mitigacion',
        index: 'rg_plantilla_mitigacion_id_plantilla_riesgo_idx_684a00af',
        columns: ['id_plantilla_riesgo'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'rg_plantilla_plan',
        index: 'rg_plantilla_plan_id_plantilla_riesgo_idx_684a00af',
        columns: ['id_plantilla_riesgo'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'rg_plantilla_riesgo',
        index: 'rg_plantilla_riesgo_id_categoria_riesgo_idx_fa2eda0b',
        columns: ['id_categoria_riesgo'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'rg_riesgo',
        index: 'rg_riesgo_id_categoria_riesgo_idx_fa2eda0b',
        columns: ['id_categoria_riesgo'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'rg_riesgo',
        index: 'rg_riesgo_id_matrimonio_idx_97ab526e',
        columns: ['id_matrimonio'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'rg_riesgo',
        index: 'rg_riesgo_id_plantilla_riesgo_idx_684a00af',
        columns: ['id_plantilla_riesgo'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'rg_riesgo',
        index: 'rg_riesgo_id_proyecto_idx_4279b0d1',
        columns: ['id_proyecto'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'rg_riesgo',
        index: 'rg_riesgo_id_usuario_responsable_idx_de19d98e',
        columns: ['id_usuario_responsable'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'rg_riesgo',
        index: 'rg_riesgo_severidad_idx_b0040f3e',
        columns: ['severidad'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'nt_notificacion_riesgo',
        foreignKey: {
          name: 'nt_notificacion_riesgo_id_notificacion_fkey',
          columns: ['id_notificacion'],
          references: { schema: 'public', table: 'nt_notificacion', columns: ['id_notificacion'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'nt_notificacion_riesgo',
        foreignKey: {
          name: 'nt_notificacion_riesgo_id_riesgo_fkey',
          columns: ['id_riesgo'],
          references: { schema: 'public', table: 'rg_riesgo', columns: ['id_riesgo'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'nt_notificacion_riesgo',
        foreignKey: {
          name: 'nt_notificacion_riesgo_id_incidencia_fkey',
          columns: ['id_incidencia'],
          references: { schema: 'public', table: 'rg_incidencia', columns: ['id_incidencia'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'rg_activacion_plan',
        foreignKey: {
          name: 'rg_activacion_plan_id_plan_contingencia_fkey',
          columns: ['id_plan_contingencia'],
          references: {
            schema: 'public',
            table: 'rg_plan_contingencia',
            columns: ['id_plan_contingencia'],
          },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'rg_activacion_plan',
        foreignKey: {
          name: 'rg_activacion_plan_id_incidencia_fkey',
          columns: ['id_incidencia'],
          references: { schema: 'public', table: 'rg_incidencia', columns: ['id_incidencia'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'rg_activacion_plan',
        foreignKey: {
          name: 'rg_activacion_plan_id_usuario_registro_fkey',
          columns: ['id_usuario_registro'],
          references: { schema: 'public', table: 'au_usuario', columns: ['id_usuario'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'rg_costo_riesgo',
        foreignKey: {
          name: 'rg_costo_riesgo_id_riesgo_fkey',
          columns: ['id_riesgo'],
          references: { schema: 'public', table: 'rg_riesgo', columns: ['id_riesgo'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'rg_costo_riesgo',
        foreignKey: {
          name: 'rg_costo_riesgo_id_incidencia_fkey',
          columns: ['id_incidencia'],
          references: { schema: 'public', table: 'rg_incidencia', columns: ['id_incidencia'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'rg_costo_riesgo',
        foreignKey: {
          name: 'rg_costo_riesgo_id_costo_presupuesto_fkey',
          columns: ['id_costo_presupuesto'],
          references: { schema: 'public', table: 'pr_costo_proveedor', columns: ['id_costo'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'rg_documento_costo',
        foreignKey: {
          name: 'rg_documento_costo_id_costo_riesgo_fkey',
          columns: ['id_costo_riesgo'],
          references: { schema: 'public', table: 'rg_costo_riesgo', columns: ['id_costo_riesgo'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'rg_incidencia',
        foreignKey: {
          name: 'rg_incidencia_id_riesgo_fkey',
          columns: ['id_riesgo'],
          references: { schema: 'public', table: 'rg_riesgo', columns: ['id_riesgo'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'rg_mitigacion_riesgo',
        foreignKey: {
          name: 'rg_mitigacion_riesgo_id_riesgo_fkey',
          columns: ['id_riesgo'],
          references: { schema: 'public', table: 'rg_riesgo', columns: ['id_riesgo'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'rg_mitigacion_riesgo',
        foreignKey: {
          name: 'rg_mitigacion_riesgo_id_plantilla_mitigacion_fkey',
          columns: ['id_plantilla_mitigacion'],
          references: {
            schema: 'public',
            table: 'rg_plantilla_mitigacion',
            columns: ['id_plantilla_mitigacion'],
          },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'rg_plan_contingencia',
        foreignKey: {
          name: 'rg_plan_contingencia_id_riesgo_fkey',
          columns: ['id_riesgo'],
          references: { schema: 'public', table: 'rg_riesgo', columns: ['id_riesgo'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'rg_plan_contingencia',
        foreignKey: {
          name: 'rg_plan_contingencia_id_usuario_responsable_fkey',
          columns: ['id_usuario_responsable'],
          references: { schema: 'public', table: 'au_usuario', columns: ['id_usuario'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'rg_plantilla_mitigacion',
        foreignKey: {
          name: 'rg_plantilla_mitigacion_id_plantilla_riesgo_fkey',
          columns: ['id_plantilla_riesgo'],
          references: {
            schema: 'public',
            table: 'rg_plantilla_riesgo',
            columns: ['id_plantilla_riesgo'],
          },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'rg_plantilla_plan',
        foreignKey: {
          name: 'rg_plantilla_plan_id_plantilla_riesgo_fkey',
          columns: ['id_plantilla_riesgo'],
          references: {
            schema: 'public',
            table: 'rg_plantilla_riesgo',
            columns: ['id_plantilla_riesgo'],
          },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'rg_plantilla_riesgo',
        foreignKey: {
          name: 'rg_plantilla_riesgo_id_categoria_riesgo_fkey',
          columns: ['id_categoria_riesgo'],
          references: {
            schema: 'public',
            table: 'rg_categoria_riesgo',
            columns: ['id_categoria_riesgo'],
          },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'rg_riesgo',
        foreignKey: {
          name: 'rg_riesgo_id_proyecto_fkey',
          columns: ['id_proyecto'],
          references: { schema: 'public', table: 'gp_proyecto', columns: ['idProyecto'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'rg_riesgo',
        foreignKey: {
          name: 'rg_riesgo_id_matrimonio_fkey',
          columns: ['id_matrimonio'],
          references: { schema: 'public', table: 'gp_matrimonio', columns: ['id_matrimonio'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'rg_riesgo',
        foreignKey: {
          name: 'rg_riesgo_id_plantilla_riesgo_fkey',
          columns: ['id_plantilla_riesgo'],
          references: {
            schema: 'public',
            table: 'rg_plantilla_riesgo',
            columns: ['id_plantilla_riesgo'],
          },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'rg_riesgo',
        foreignKey: {
          name: 'rg_riesgo_id_categoria_riesgo_fkey',
          columns: ['id_categoria_riesgo'],
          references: {
            schema: 'public',
            table: 'rg_categoria_riesgo',
            columns: ['id_categoria_riesgo'],
          },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'rg_riesgo',
        foreignKey: {
          name: 'rg_riesgo_id_usuario_responsable_fkey',
          columns: ['id_usuario_responsable'],
          references: { schema: 'public', table: 'au_usuario', columns: ['id_usuario'] },
          onDelete: 'restrict',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
