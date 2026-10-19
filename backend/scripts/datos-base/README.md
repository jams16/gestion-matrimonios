# Datos base restaurables

Este directorio contiene exclusivamente fuentes de datos maestros. No contiene
ni genera usuarios, personas, matrimonios, proyectos, cronogramas operativos ni
notificaciones.

| Datos | Fuente exacta |
| --- | --- |
| `in_ubigeo` | `ubigeos-base.json`: instantánea literal de los 43 registros encontrados en la BD configurada durante la auditoría del 19/10/2026. |
| `gp_tipo_ceremonia`, `gp_fase_proyecto` y `cr_plantilla_*` | `catalogos-y-plantillas-base.json`: instantánea literal de la BD configurada, capturada el 19/10/2026. |

El restaurador inserta únicamente claves naturales ausentes (`id_ubigeo` o
`codigo`). Las FK de plantillas se reconstruyen mediante los IDs reales de
esas claves, por lo que no dependen de que un autoincremental conserve el
mismo valor. No actualiza ni elimina registros existentes.
