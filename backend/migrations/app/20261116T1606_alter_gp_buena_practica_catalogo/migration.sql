-- Recreate only the good-practices catalog, preserving every previous row by code/content.
-- The previous UUID primary key had no inbound foreign keys; BIGSERIAL is required by the new contract.
CREATE TABLE "public"."gp_buena_practica_nueva" (
  "id_buena_practica" BIGSERIAL PRIMARY KEY,
  "codigo" character varying(10) NOT NULL UNIQUE,
  "nombre" character varying(200) NOT NULL,
  "descripcion" text NOT NULL,
  "aplicacion_matrimonios" text NOT NULL,
  "area_gestion" character varying(150) NOT NULL,
  "fuente_metodologica" character varying(250),
  "anio_fuente" character varying(100),
  "referencia_especifica" text,
  "id_fase_proyecto" bigint,
  "ejemplo_practico" text,
  "recomendaciones" text,
  "estado" boolean NOT NULL DEFAULT true,
  "version" integer NOT NULL DEFAULT 1,
  "fecha_creacion" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "fecha_modificacion" timestamptz,
  "id_usuario_creacion" bigint,
  "id_usuario_modificacion" bigint
)

INSERT INTO "public"."gp_buena_practica_nueva" (
  "codigo", "nombre", "descripcion", "aplicacion_matrimonios", "area_gestion",
  "fuente_metodologica", "anio_fuente", "referencia_especifica", "id_fase_proyecto",
  "ejemplo_practico", "recomendaciones", "estado", "version", "fecha_creacion",
  "fecha_modificacion", "id_usuario_creacion", "id_usuario_modificacion"
)
SELECT
  "codigo"::character varying(10),
  "nombre",
  "descripcion_resumida"::text,
  "aplicacion_matrimonios"::text,
  "area_gestion"::character varying(150),
  "fuente_metodologica",
  "anio_fuente"::text,
  "referencia_especifica"::text,
  "id_fase_proyecto"::bigint,
  "ejemplo_practico"::text,
  "recomendaciones"::text,
  "estado",
  CASE WHEN "version" ~ '^[0-9]+$' THEN "version"::integer ELSE 1 END,
  "fecha_creacion",
  "fecha_modificacion",
  "id_usuario_creacion"::bigint,
  "id_usuario_modificacion"::bigint
FROM "public"."gp_buena_practica"

DROP TABLE "public"."gp_buena_practica"

ALTER TABLE "public"."gp_buena_practica_nueva" RENAME TO "gp_buena_practica"

CREATE INDEX "gp_buena_practica_area_gestion_idx_7f56ec55" ON "public"."gp_buena_practica" ("area_gestion")

CREATE INDEX "gp_buena_practica_id_fase_proyecto_idx_0ca9d564" ON "public"."gp_buena_practica" ("id_fase_proyecto")

CREATE INDEX "gp_buena_practica_estado_idx_c74e5888" ON "public"."gp_buena_practica" ("estado")
