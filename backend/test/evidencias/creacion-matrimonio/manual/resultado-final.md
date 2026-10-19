# Resultado final

## Resumen

| Métrica | Resultado |
|---|---|
| Casos ejecutados | 1 |
| PASS | 0 |
| FAIL | 1 |
| Resultado global | FAIL |

## Casos de prueba

| ID | Caso | Tipo | Resultado esperado | Resultado obtenido | Estado |
|---|---|---|---|---|---|
| CP-MAN-01 | Ejecución | FUNCIONAL | Según regla | Failed to decode column cr_plantilla_actividad.lista_verificacion with codec 'pg/json@1': Unexpected token 'F', "Fecha defi"... is not valid JSON | FAIL |

## Evidencias principales

| Evidencia | Archivo |
|---|---|
| Entradas | datos-prueba.json |
| Registros | registros-creados.json |
| Cronograma | cronograma-generado.json |
| Casos negativos | casos-negativos.json |

## Resultado funcional
El runner ejecutó el flujo real sin limpieza de datos.

## Limitaciones
Las cantidades dependen de las plantillas activas en la BD.

## Reproducción
`pnpm.cmd test:manual:creacion-matrimonio -- --tipo=RELIGIOSO_CIVIL`

## Conclusión
Resultado FAIL conforme a las evidencias listadas.
