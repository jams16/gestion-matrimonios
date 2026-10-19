#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/114444530efb2738e08f10e17776b84fe6addca0fd9db0bf7cc2f8cf937b6fea/contract';
import startContract from '../../snapshots/114444530efb2738e08f10e17776b84fe6addca0fd9db0bf7cc2f8cf937b6fea/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/672c4927d44b7df966c870f87dca0504cb0659c67d5e16d79b08f159d568798e/contract';
import endContract from '../../snapshots/672c4927d44b7df966c870f87dca0504cb0659c67d5e16d79b08f159d568798e/contract.json' with { type: 'json' };
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
        table: 'iv_categoria_relacion',
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
          col('id_categoria_relacion', 'SERIAL', {
            notNull: true,
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('nombre', 'character varying(100)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
          col('orden', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id_categoria_relacion'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'iv_invitado',
        columns: [
          col('activo', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('cantidad_pases', 'int4', {
            notNull: true,
            default: lit(1),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('es_titular', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('id_categoria_relacion', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('id_invitado', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_invitado_titular', 'uuid', { codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_matrimonio', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_persona_natural', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('lado_relacion', 'text', {
            notNull: true,
            default: lit('AMBOS'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('observaciones', 'character varying(1000)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 1000 } },
          }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [
          primaryKey(['id_invitado']),
          checkExpression(
            'iv_invitado_lado_relacion_check_97f471a8',
            "\"lado_relacion\" IN ('NOVIA', 'NOVIO', 'AMBOS', 'OTRO')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'iv_invitado_requerimiento_alimentario',
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
          col('detalle', 'character varying(500)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 500 } },
          }),
          col('id_invitado', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_invitado_requerimiento_alimentario', 'uuid', {
            notNull: true,
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('id_requerimiento_alimentario', 'int4', {
            notNull: true,
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id_invitado_requerimiento_alimentario'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'iv_mesa',
        columns: [
          col('activo', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('capacidad', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id_matrimonio', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_mesa', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('nombre', 'character varying(100)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 100 } },
          }),
          col('numero', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('observaciones', 'character varying(1000)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 1000 } },
          }),
          col('ubicacion', 'character varying(250)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 250 } },
          }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id_mesa'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'iv_mesa_invitado',
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
          col('id_invitado', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_mesa', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_mesa_invitado', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('numero_asiento', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('observacion', 'character varying(500)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 500 } },
          }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['id_mesa_invitado'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'iv_requerimiento_alimentario',
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
          col('id_requerimiento_alimentario', 'SERIAL', {
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
        constraints: [primaryKey(['id_requerimiento_alimentario'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'iv_rsvp',
        columns: [
          col('cantidad_asistentes_confirmados', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('confirmacion_digital', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('estado_rsvp', 'text', {
            notNull: true,
            default: lit('PENDIENTE'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('fecha_confirmacion_digital', 'timestamptz', {
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('fecha_respuesta', 'timestamptz', {
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('fecha_verificacion_manual_1', 'timestamptz', {
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('fecha_verificacion_manual_2', 'timestamptz', {
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id_invitado', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_rsvp', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_usuario_verificacion_manual_1', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('id_usuario_verificacion_manual_2', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('updated_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('verificacion_manual_1', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('verificacion_manual_2', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
        ],
        constraints: [
          primaryKey(['id_rsvp']),
          checkExpression(
            'iv_rsvp_estado_rsvp_check_7c306183',
            "\"estado_rsvp\" IN ('PENDIENTE', 'CONFIRMADO', 'NO_ASISTE')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'iv_rsvp_historial',
        columns: [
          col('canal', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('estado_anterior', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('estado_nuevo', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('fecha_cambio', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id_rsvp', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_rsvp_historial', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id_usuario', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('observacion', 'character varying(1000)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 1000 } },
          }),
        ],
        constraints: [
          primaryKey(['id_rsvp_historial']),
          checkExpression(
            'iv_rsvp_historial_canal_check_d6e88a8a',
            "\"canal\" IN ('MANUAL', 'DIGITAL', 'SISTEMA')",
          ),
          checkExpression(
            'iv_rsvp_historial_estado_anterior_check_87ee2fda',
            "\"estado_anterior\" IN ('PENDIENTE', 'CONFIRMADO', 'NO_ASISTE')",
          ),
          checkExpression(
            'iv_rsvp_historial_estado_nuevo_check_37200580',
            "\"estado_nuevo\" IN ('PENDIENTE', 'CONFIRMADO', 'NO_ASISTE')",
          ),
        ],
      }),
      this.addUnique({
        schema: 'public',
        table: 'iv_categoria_relacion',
        constraint: 'iv_categoria_relacion_codigo_key',
        columns: ['codigo'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'iv_invitado',
        constraint: 'iv_invitado_id_matrimonio_id_persona_natural_key',
        columns: ['id_matrimonio', 'id_persona_natural'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'iv_invitado_requerimiento_alimentario',
        constraint:
          'iv_invitado_requerimiento_alimentario_id_invitado_id_requerimiento_alimentario_key',
        columns: ['id_invitado', 'id_requerimiento_alimentario'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'iv_mesa_invitado',
        constraint: 'iv_mesa_invitado_id_mesa_id_invitado_key',
        columns: ['id_mesa', 'id_invitado'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'iv_requerimiento_alimentario',
        constraint: 'iv_requerimiento_alimentario_codigo_key',
        columns: ['codigo'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'iv_rsvp',
        constraint: 'iv_rsvp_id_invitado_key',
        columns: ['id_invitado'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'iv_invitado',
        index: 'iv_invitado_activo_idx_4c0f2ecc',
        columns: ['activo'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'iv_invitado',
        index: 'iv_invitado_id_categoria_relacion_idx_8ba92f0d',
        columns: ['id_categoria_relacion'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'iv_invitado',
        index: 'iv_invitado_id_invitado_titular_idx_55b89b45',
        columns: ['id_invitado_titular'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'iv_invitado',
        index: 'iv_invitado_id_matrimonio_idx_97ab526e',
        columns: ['id_matrimonio'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'iv_invitado',
        index: 'iv_invitado_id_persona_natural_idx_2ece1570',
        columns: ['id_persona_natural'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'iv_invitado_requerimiento_alimentario',
        index: 'iv_inv_req_alim_inv_idx',
        columns: ['id_invitado'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'iv_invitado_requerimiento_alimentario',
        index: 'iv_inv_req_alim_req_idx',
        columns: ['id_requerimiento_alimentario'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'iv_mesa',
        index: 'iv_mesa_id_matrimonio_idx_97ab526e',
        columns: ['id_matrimonio'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'iv_mesa_invitado',
        index: 'iv_mesa_invitado_id_invitado_idx_da2f6d21',
        columns: ['id_invitado'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'iv_mesa_invitado',
        index: 'iv_mesa_invitado_id_mesa_idx_6d74982c',
        columns: ['id_mesa'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'iv_rsvp',
        index: 'iv_rsvp_estado_rsvp_idx_7f4af6a0',
        columns: ['estado_rsvp'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'iv_rsvp',
        index: 'iv_rsvp_id_usuario_verificacion_manual_1_idx_c73f53d9',
        columns: ['id_usuario_verificacion_manual_1'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'iv_rsvp',
        index: 'iv_rsvp_id_usuario_verificacion_manual_2_idx_f4c986df',
        columns: ['id_usuario_verificacion_manual_2'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'iv_rsvp_historial',
        index: 'iv_rsvp_historial_fecha_cambio_idx_0c50a538',
        columns: ['fecha_cambio'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'iv_rsvp_historial',
        index: 'iv_rsvp_historial_id_rsvp_idx_edb653fc',
        columns: ['id_rsvp'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'iv_rsvp_historial',
        index: 'iv_rsvp_historial_id_usuario_idx_00d592a0',
        columns: ['id_usuario'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'iv_invitado',
        foreignKey: {
          name: 'iv_invitado_id_matrimonio_fkey',
          columns: ['id_matrimonio'],
          references: { schema: 'public', table: 'gp_matrimonio', columns: ['id_matrimonio'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'iv_invitado',
        foreignKey: {
          name: 'iv_invitado_id_persona_natural_fkey',
          columns: ['id_persona_natural'],
          references: {
            schema: 'public',
            table: 'in_persona_natural',
            columns: ['id_persona_natural'],
          },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'iv_invitado',
        foreignKey: {
          name: 'iv_invitado_id_categoria_relacion_fkey',
          columns: ['id_categoria_relacion'],
          references: {
            schema: 'public',
            table: 'iv_categoria_relacion',
            columns: ['id_categoria_relacion'],
          },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'iv_invitado',
        foreignKey: {
          name: 'iv_invitado_id_invitado_titular_fkey',
          columns: ['id_invitado_titular'],
          references: { schema: 'public', table: 'iv_invitado', columns: ['id_invitado'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'iv_invitado_requerimiento_alimentario',
        foreignKey: {
          name: 'iv_invitado_requerimiento_alimentario_id_invitado_fkey',
          columns: ['id_invitado'],
          references: { schema: 'public', table: 'iv_invitado', columns: ['id_invitado'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'iv_invitado_requerimiento_alimentario',
        foreignKey: {
          name: 'iv_invitado_requerimiento_alimentario_id_requerimiento_alimentario_fkey',
          columns: ['id_requerimiento_alimentario'],
          references: {
            schema: 'public',
            table: 'iv_requerimiento_alimentario',
            columns: ['id_requerimiento_alimentario'],
          },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'iv_mesa',
        foreignKey: {
          name: 'iv_mesa_id_matrimonio_fkey',
          columns: ['id_matrimonio'],
          references: { schema: 'public', table: 'gp_matrimonio', columns: ['id_matrimonio'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'iv_mesa_invitado',
        foreignKey: {
          name: 'iv_mesa_invitado_id_mesa_fkey',
          columns: ['id_mesa'],
          references: { schema: 'public', table: 'iv_mesa', columns: ['id_mesa'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'iv_mesa_invitado',
        foreignKey: {
          name: 'iv_mesa_invitado_id_invitado_fkey',
          columns: ['id_invitado'],
          references: { schema: 'public', table: 'iv_invitado', columns: ['id_invitado'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'iv_rsvp',
        foreignKey: {
          name: 'iv_rsvp_id_invitado_fkey',
          columns: ['id_invitado'],
          references: { schema: 'public', table: 'iv_invitado', columns: ['id_invitado'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'iv_rsvp',
        foreignKey: {
          name: 'iv_rsvp_id_usuario_verificacion_manual_1_fkey',
          columns: ['id_usuario_verificacion_manual_1'],
          references: { schema: 'public', table: 'au_usuario', columns: ['id_usuario'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'iv_rsvp',
        foreignKey: {
          name: 'iv_rsvp_id_usuario_verificacion_manual_2_fkey',
          columns: ['id_usuario_verificacion_manual_2'],
          references: { schema: 'public', table: 'au_usuario', columns: ['id_usuario'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'iv_rsvp_historial',
        foreignKey: {
          name: 'iv_rsvp_historial_id_rsvp_fkey',
          columns: ['id_rsvp'],
          references: { schema: 'public', table: 'iv_rsvp', columns: ['id_rsvp'] },
          onDelete: 'restrict',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'iv_rsvp_historial',
        foreignKey: {
          name: 'iv_rsvp_historial_id_usuario_fkey',
          columns: ['id_usuario'],
          references: { schema: 'public', table: 'au_usuario', columns: ['id_usuario'] },
          onDelete: 'restrict',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
