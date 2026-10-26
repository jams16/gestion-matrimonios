# Resultado final

## Resumen

| Métrica | Resultado |
|---|---|
| Casos ejecutados | 6 |
| PASS | 6 |
| FAIL | 0 |
| Resultado global | PASS |

## Casos de prueba

| ID | Caso | Tipo | Resultado esperado | Resultado obtenido | Estado |
|---|---|---|---|---|---|
| CP-AUT-01 | ESCALABLE para 395 días | UNITARIA/INTEGRACIÓN | Regla aplicada | Regla validada | PASS |
| CP-AUT-02 | ESCALABLE sin fecha anterior al inicio | UNITARIA/INTEGRACIÓN | Regla aplicada | Regla validada | PASS |
| CP-AUT-03 | FIJO_EVENTO | UNITARIA/INTEGRACIÓN | Regla aplicada | Regla validada | PASS |
| CP-AUT-04 | DIA_EVENTO | UNITARIA/INTEGRACIÓN | Regla aplicada | Regla validada | PASS |
| CP-AUT-05 | filtro por tipo de ceremonia | UNITARIA/INTEGRACIÓN | Regla aplicada | Regla validada | PASS |
| CP-AUT-06 | dependencia omitida cuando una actividad no se genera | UNITARIA/INTEGRACIÓN | Regla aplicada | Regla validada | PASS |

## Evidencias principales

| Evidencia | Archivo |
|---|---|
| Datos y casos | datos-prueba.json, casos-prueba.json |
| Resultado | resultado-tests.json |
| Cronograma | cronograma-generado.json |

## Resultado funcional
Se demostraron cálculos y filtrado sin dependencias huérfanas.

## Limitaciones
No valida adaptador PostgreSQL ni plantillas reales.

## Reproducción
`pnpm.cmd test:creacion-matrimonio`

## Conclusión
La suite terminó en PASS.
