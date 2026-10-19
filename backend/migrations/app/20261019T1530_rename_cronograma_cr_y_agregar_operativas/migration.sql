-- El cronograma conserva los catálogos gp_* y migra solo sus tablas al prefijo cr_*.
-- No se eliminan ni se recrean las plantillas: ALTER TABLE RENAME preserva sus datos.

ALTER TABLE "public"."gp_plantilla_hito" RENAME TO "cr_plantilla_hito";
ALTER TABLE "public"."gp_plantilla_actividad" RENAME TO "cr_plantilla_actividad";
ALTER TABLE "public"."gp_plantilla_actividad_tipo_ceremonia" RENAME TO "cr_plantilla_actividad_tipo_ceremonia";
ALTER TABLE "public"."gp_plantilla_dependencia" RENAME TO "cr_plantilla_dependencia";
ALTER TABLE "public"."gp_plantilla_timing" RENAME TO "cr_plantilla_timing";
ALTER TABLE "public"."gp_plantilla_timing_tipo_ceremonia" RENAME TO "cr_plantilla_timing_tipo_ceremonia";

ALTER TABLE "public"."cr_plantilla_hito" RENAME CONSTRAINT "gp_plantilla_hito_pkey" TO "cr_plantilla_hito_pkey";
ALTER TABLE "public"."cr_plantilla_hito" RENAME CONSTRAINT "gp_plantilla_hito_codigo_key" TO "cr_plantilla_hito_codigo_key";
ALTER TABLE "public"."cr_plantilla_hito" RENAME CONSTRAINT "gp_plantilla_hito_tipo_temporal_check_77c07874" TO "cr_plantilla_hito_tipo_temporal_check_77c07874";

ALTER TABLE "public"."cr_plantilla_actividad" RENAME CONSTRAINT "gp_plantilla_actividad_pkey" TO "cr_plantilla_actividad_pkey";
ALTER TABLE "public"."cr_plantilla_actividad" RENAME CONSTRAINT "gp_plantilla_actividad_codigo_key" TO "cr_plantilla_actividad_codigo_key";
ALTER TABLE "public"."cr_plantilla_actividad" RENAME CONSTRAINT "gp_plantilla_actividad_tipo_temporal_check_77c07874" TO "cr_plantilla_actividad_tipo_temporal_check_77c07874";
ALTER TABLE "public"."cr_plantilla_actividad" RENAME CONSTRAINT "gp_plantilla_actividad_prioridad_check_a1f6ee2f" TO "cr_plantilla_actividad_prioridad_check_a1f6ee2f";
ALTER TABLE "public"."cr_plantilla_actividad" RENAME CONSTRAINT "gp_plantilla_actividad_id_plantilla_hito_fkey" TO "cr_plantilla_actividad_id_plantilla_hito_fkey";
ALTER TABLE "public"."cr_plantilla_actividad" RENAME CONSTRAINT "gp_plantilla_actividad_id_fase_proyecto_fkey" TO "cr_plantilla_actividad_id_fase_proyecto_fkey";

ALTER TABLE "public"."cr_plantilla_actividad_tipo_ceremonia" RENAME CONSTRAINT "gp_plantilla_actividad_tipo_ceremonia_pkey" TO "cr_plantilla_actividad_tipo_ceremonia_pkey";
ALTER TABLE "public"."cr_plantilla_actividad_tipo_ceremonia" RENAME CONSTRAINT "gp_plantilla_actividad_tipo_ceremonia_id_plantilla_actividad_id_tipo_ceremonia_key" TO "cr_plantilla_actividad_tipo_ceremonia_id_plantilla_actividad_id_tipo_ceremonia_key";
ALTER TABLE "public"."cr_plantilla_actividad_tipo_ceremonia" RENAME CONSTRAINT "gp_plantilla_actividad_tipo_ceremonia_id_plantilla_actividad_fkey" TO "cr_plantilla_actividad_tipo_ceremonia_id_plantilla_actividad_fkey";
ALTER TABLE "public"."cr_plantilla_actividad_tipo_ceremonia" RENAME CONSTRAINT "gp_plantilla_actividad_tipo_ceremonia_id_tipo_ceremonia_fkey" TO "cr_plantilla_actividad_tipo_ceremonia_id_tipo_ceremonia_fkey";

ALTER TABLE "public"."cr_plantilla_dependencia" RENAME CONSTRAINT "gp_plantilla_dependencia_pkey" TO "cr_plantilla_dependencia_pkey";
ALTER TABLE "public"."cr_plantilla_dependencia" RENAME CONSTRAINT "gp_plantilla_dependencia_id_actividad_predecesora_id_actividad_sucesora_key" TO "cr_plantilla_dependencia_id_actividad_predecesora_id_actividad_sucesora_key";
ALTER TABLE "public"."cr_plantilla_dependencia" RENAME CONSTRAINT "gp_plantilla_dependencia_tipo_dependencia_check_d4c2b17a" TO "cr_plantilla_dependencia_tipo_dependencia_check_d4c2b17a";
ALTER TABLE "public"."cr_plantilla_dependencia" RENAME CONSTRAINT "gp_plantilla_dependencia_predecesora_fkey" TO "cr_plantilla_dependencia_id_actividad_predecesora_fkey";
ALTER TABLE "public"."cr_plantilla_dependencia" RENAME CONSTRAINT "gp_plantilla_dependencia_sucesora_fkey" TO "cr_plantilla_dependencia_id_actividad_sucesora_fkey";

ALTER TABLE "public"."cr_plantilla_timing" RENAME CONSTRAINT "gp_plantilla_timing_pkey" TO "cr_plantilla_timing_pkey";
ALTER TABLE "public"."cr_plantilla_timing" RENAME CONSTRAINT "gp_plantilla_timing_codigo_key" TO "cr_plantilla_timing_codigo_key";

ALTER TABLE "public"."cr_plantilla_timing_tipo_ceremonia" RENAME CONSTRAINT "gp_plantilla_timing_tipo_ceremonia_pkey" TO "cr_plantilla_timing_tipo_ceremonia_pkey";
ALTER TABLE "public"."cr_plantilla_timing_tipo_ceremonia" RENAME CONSTRAINT "gp_plantilla_timing_tipo_ceremonia_id_plantilla_timing_id_tipo_ceremonia_key" TO "cr_plantilla_timing_tipo_ceremonia_id_plantilla_timing_id_tipo_ceremonia_key";
ALTER TABLE "public"."cr_plantilla_timing_tipo_ceremonia" RENAME CONSTRAINT "gp_plantilla_timing_tipo_ceremonia_id_plantilla_timing_fkey" TO "cr_plantilla_timing_tipo_ceremonia_id_plantilla_timing_fkey";
ALTER TABLE "public"."cr_plantilla_timing_tipo_ceremonia" RENAME CONSTRAINT "gp_plantilla_timing_tipo_ceremonia_id_tipo_ceremonia_fkey" TO "cr_plantilla_timing_tipo_ceremonia_id_tipo_ceremonia_fkey";

ALTER INDEX "public"."gp_plantilla_actividad_id_plantilla_hito_idx_99ae877f" RENAME TO "cr_plantilla_actividad_id_plantilla_hito_idx_99ae877f";
ALTER INDEX "public"."gp_plantilla_actividad_id_fase_proyecto_idx_0ca9d564" RENAME TO "cr_plantilla_actividad_id_fase_proyecto_idx_0ca9d564";
ALTER INDEX "public"."gp_plantilla_actividad_tipo_ceremonia_id_plantilla_act_396101d8" RENAME TO "cr_plantilla_actividad_tipo_ceremonia_id_plantilla_act_396101d8";
ALTER INDEX "public"."gp_plantilla_actividad_tipo_ceremonia_id_tipo_ceremoni_c038373a" RENAME TO "cr_plantilla_actividad_tipo_ceremonia_id_tipo_ceremoni_c038373a";
ALTER INDEX "public"."gp_plantilla_dependencia_id_actividad_predecesora_idx_26ea0d79" RENAME TO "cr_plantilla_dependencia_id_actividad_predecesora_idx_26ea0d79";
ALTER INDEX "public"."gp_plantilla_dependencia_id_actividad_sucesora_idx_9be5e6fb" RENAME TO "cr_plantilla_dependencia_id_actividad_sucesora_idx_9be5e6fb";
ALTER INDEX "public"."gp_plantilla_timing_tipo_ceremonia_id_plantilla_timing_a11bed11" RENAME TO "cr_plantilla_timing_tipo_ceremonia_id_plantilla_timing_a11bed11";
ALTER INDEX "public"."gp_plantilla_timing_tipo_ceremonia_id_tipo_ceremonia_i_c038373a" RENAME TO "cr_plantilla_timing_tipo_ceremonia_id_tipo_ceremonia_i_c038373a";

CREATE TABLE "public"."cr_hito" (
  "id_hito" uuid NOT NULL,
  "id_proyecto" uuid NOT NULL,
  "id_plantilla_hito" integer,
  "nombre" character varying(200) NOT NULL,
  "criterio_aceptacion" character varying(1000),
  "fecha_objetivo" timestamptz NOT NULL,
  "estado" text NOT NULL DEFAULT 'PENDIENTE',
  "orden" integer NOT NULL,
  "modificado_manualmente" boolean NOT NULL DEFAULT false,
  "activo" boolean NOT NULL DEFAULT true,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL,
  CONSTRAINT "cr_hito_pkey" PRIMARY KEY ("id_hito"),
  CONSTRAINT "cr_hito_estado_check_3a2187cf" CHECK ("estado" IN ('PENDIENTE', 'EN_PROGRESO', 'COMPLETADO', 'NO_APLICA'))
);

CREATE TABLE "public"."cr_actividad" (
  "id_actividad" uuid NOT NULL,
  "id_proyecto" uuid NOT NULL,
  "id_hito" uuid,
  "id_plantilla_actividad" integer,
  "nombre" character varying(200) NOT NULL,
  "descripcion" character varying(1000),
  "lista_verificacion" json,
  "entregable" character varying(500),
  "fecha_inicio" timestamptz,
  "fecha_fin" timestamptz NOT NULL,
  "prioridad" text,
  "estado" text NOT NULL DEFAULT 'PENDIENTE',
  "id_usuario_responsable" integer,
  "responsable_texto" character varying(150),
  "orden" integer NOT NULL,
  "modificado_manualmente" boolean NOT NULL DEFAULT false,
  "activo" boolean NOT NULL DEFAULT true,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL,
  CONSTRAINT "cr_actividad_pkey" PRIMARY KEY ("id_actividad"),
  CONSTRAINT "cr_actividad_prioridad_check_a1f6ee2f" CHECK ("prioridad" IN ('BAJA', 'MEDIA', 'ALTA', 'CRITICA')),
  CONSTRAINT "cr_actividad_estado_check_15ec3bb7" CHECK ("estado" IN ('PENDIENTE', 'EN_PROCESO', 'COMPLETADA', 'CANCELADA', 'NO_APLICA'))
);

CREATE TABLE "public"."cr_dependencia" (
  "id_dependencia" uuid NOT NULL,
  "id_actividad_predecesora" uuid NOT NULL,
  "id_actividad_sucesora" uuid NOT NULL,
  "tipo_dependencia" text NOT NULL DEFAULT 'FINISH_TO_START',
  "dias_desfase" integer NOT NULL DEFAULT 0,
  CONSTRAINT "cr_dependencia_pkey" PRIMARY KEY ("id_dependencia"),
  CONSTRAINT "cr_dependencia_tipo_dependencia_check_d4c2b17a" CHECK ("tipo_dependencia" IN ('FINISH_TO_START')),
  CONSTRAINT "cr_dependencia_id_actividad_predecesora_id_actividad_sucesora_key" UNIQUE ("id_actividad_predecesora", "id_actividad_sucesora")
);

CREATE TABLE "public"."cr_timing" (
  "id_timing" uuid NOT NULL,
  "id_proyecto" uuid NOT NULL,
  "id_plantilla_timing" integer,
  "actividad" character varying(200) NOT NULL,
  "fecha_hora_inicio" timestamptz NOT NULL,
  "fecha_hora_fin" timestamptz NOT NULL,
  "duracion_minutos" integer NOT NULL,
  "id_usuario_responsable" integer,
  "responsable_texto" character varying(150),
  "lista_verificacion" json,
  "estado" text NOT NULL DEFAULT 'PENDIENTE',
  "orden" integer NOT NULL,
  "modificado_manualmente" boolean NOT NULL DEFAULT false,
  "activo" boolean NOT NULL DEFAULT true,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL,
  CONSTRAINT "cr_timing_pkey" PRIMARY KEY ("id_timing"),
  CONSTRAINT "cr_timing_estado_check_15ec3bb7" CHECK ("estado" IN ('PENDIENTE', 'EN_PROCESO', 'COMPLETADA', 'CANCELADA', 'NO_APLICA'))
);

ALTER TABLE "public"."cr_hito" ADD CONSTRAINT "cr_hito_id_proyecto_fkey" FOREIGN KEY ("id_proyecto") REFERENCES "public"."gp_proyecto" ("idProyecto") ON DELETE RESTRICT;
ALTER TABLE "public"."cr_hito" ADD CONSTRAINT "cr_hito_id_plantilla_hito_fkey" FOREIGN KEY ("id_plantilla_hito") REFERENCES "public"."cr_plantilla_hito" ("id_plantilla_hito") ON DELETE RESTRICT;
ALTER TABLE "public"."cr_actividad" ADD CONSTRAINT "cr_actividad_id_proyecto_fkey" FOREIGN KEY ("id_proyecto") REFERENCES "public"."gp_proyecto" ("idProyecto") ON DELETE RESTRICT;
ALTER TABLE "public"."cr_actividad" ADD CONSTRAINT "cr_actividad_id_hito_fkey" FOREIGN KEY ("id_hito") REFERENCES "public"."cr_hito" ("id_hito") ON DELETE RESTRICT;
ALTER TABLE "public"."cr_actividad" ADD CONSTRAINT "cr_actividad_id_plantilla_actividad_fkey" FOREIGN KEY ("id_plantilla_actividad") REFERENCES "public"."cr_plantilla_actividad" ("id_plantilla_actividad") ON DELETE RESTRICT;
ALTER TABLE "public"."cr_actividad" ADD CONSTRAINT "cr_actividad_id_usuario_responsable_fkey" FOREIGN KEY ("id_usuario_responsable") REFERENCES "public"."au_usuario" ("id_usuario") ON DELETE RESTRICT;
ALTER TABLE "public"."cr_dependencia" ADD CONSTRAINT "cr_dependencia_id_actividad_predecesora_fkey" FOREIGN KEY ("id_actividad_predecesora") REFERENCES "public"."cr_actividad" ("id_actividad") ON DELETE RESTRICT;
ALTER TABLE "public"."cr_dependencia" ADD CONSTRAINT "cr_dependencia_id_actividad_sucesora_fkey" FOREIGN KEY ("id_actividad_sucesora") REFERENCES "public"."cr_actividad" ("id_actividad") ON DELETE RESTRICT;
ALTER TABLE "public"."cr_timing" ADD CONSTRAINT "cr_timing_id_proyecto_fkey" FOREIGN KEY ("id_proyecto") REFERENCES "public"."gp_proyecto" ("idProyecto") ON DELETE RESTRICT;
ALTER TABLE "public"."cr_timing" ADD CONSTRAINT "cr_timing_id_plantilla_timing_fkey" FOREIGN KEY ("id_plantilla_timing") REFERENCES "public"."cr_plantilla_timing" ("id_plantilla_timing") ON DELETE RESTRICT;
ALTER TABLE "public"."cr_timing" ADD CONSTRAINT "cr_timing_id_usuario_responsable_fkey" FOREIGN KEY ("id_usuario_responsable") REFERENCES "public"."au_usuario" ("id_usuario") ON DELETE RESTRICT;

CREATE INDEX "cr_hito_id_proyecto_idx_4279b0d1" ON "public"."cr_hito" ("id_proyecto");
CREATE INDEX "cr_hito_id_plantilla_hito_idx_99ae877f" ON "public"."cr_hito" ("id_plantilla_hito");
CREATE INDEX "cr_hito_estado_idx_c74e5888" ON "public"."cr_hito" ("estado");
CREATE INDEX "cr_actividad_id_proyecto_idx_4279b0d1" ON "public"."cr_actividad" ("id_proyecto");
CREATE INDEX "cr_actividad_id_hito_idx_0a1cccf3" ON "public"."cr_actividad" ("id_hito");
CREATE INDEX "cr_actividad_id_plantilla_actividad_idx_396101d8" ON "public"."cr_actividad" ("id_plantilla_actividad");
CREATE INDEX "cr_actividad_id_usuario_responsable_idx_de19d98e" ON "public"."cr_actividad" ("id_usuario_responsable");
CREATE INDEX "cr_actividad_estado_idx_c74e5888" ON "public"."cr_actividad" ("estado");
CREATE INDEX "cr_actividad_fecha_inicio_idx_e66684fd" ON "public"."cr_actividad" ("fecha_inicio");
CREATE INDEX "cr_actividad_fecha_fin_idx_c0d5b891" ON "public"."cr_actividad" ("fecha_fin");
CREATE INDEX "cr_dependencia_id_actividad_predecesora_idx_26ea0d79" ON "public"."cr_dependencia" ("id_actividad_predecesora");
CREATE INDEX "cr_dependencia_id_actividad_sucesora_idx_9be5e6fb" ON "public"."cr_dependencia" ("id_actividad_sucesora");
CREATE INDEX "cr_timing_id_proyecto_idx_4279b0d1" ON "public"."cr_timing" ("id_proyecto");
CREATE INDEX "cr_timing_id_plantilla_timing_idx_a11bed11" ON "public"."cr_timing" ("id_plantilla_timing");
CREATE INDEX "cr_timing_id_usuario_responsable_idx_de19d98e" ON "public"."cr_timing" ("id_usuario_responsable");
CREATE INDEX "cr_timing_estado_idx_c74e5888" ON "public"."cr_timing" ("estado");
CREATE INDEX "cr_timing_fecha_hora_inicio_idx_f5d1f8b0" ON "public"."cr_timing" ("fecha_hora_inicio");
CREATE INDEX "cr_timing_fecha_hora_fin_idx_d419ee2f" ON "public"."cr_timing" ("fecha_hora_fin");
