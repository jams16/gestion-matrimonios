# Resultado final

## Resumen

| Métrica | Resultado |
|---|---|
| Casos ejecutados | 9 |
| PASS | 8 |
| FAIL | 1 |
| Resultado global | FAIL |

## Casos de prueba

| ID | Caso | Tipo | Resultado esperado | Resultado obtenido | Estado |
|---|---|---|---|---|---|
| CP-MAN-01 | Matrimonio válido | FUNCIONAL | Según regla | Se ejecutó GuardarOnboardingMatrimonioUseCase con iniciar=true. | PASS |
| CP-MAN-02 | Proyecto activo en fase INICIO | FUNCIONAL | Según regla | estado=true, idFaseProyecto=2 | PASS |
| CP-MAN-03 | Tipo de ceremonia | FUNCIONAL | Según regla | RELIGIOSO_CIVIL | PASS |
| CP-MAN-04 | Dependencias consistentes | FUNCIONAL | Según regla | 27 dependencias generadas. | PASS |
| CP-MAN-05 | Cronograma generado | FUNCIONAL | Según regla | 12 hitos, 15 actividades y 19 timing. | PASS |
| CP-MAN-06 | Duplicado WP + fecha | FUNCIONAL | Según regla | Ya tienes un matrimonio activo para la misma fecha. | PASS |
| CP-MAN-07 | DNI en matrimonio no cerrado | FUNCIONAL | Según regla | El proyecto ya tiene un cronograma generado. | PASS |
| CP-MAN-08 | Fecha insuficiente | FUNCIONAL | Según regla | La fecha del matrimonio debe estar al menos a 30 días de hoy. | PASS |
| CP-MAN-09 | Mismo DNI después de CIERRE | FUNCIONAL | Según regla | El proyecto ya tiene un cronograma generado. | FAIL |

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
