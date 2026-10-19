# Resultado de ejecución

## 1. Identificación de la prueba
- Nombre: generación automática de cronograma desde plantillas.
- ID de ejecución: `automatico-generar-cronograma`.
- Fecha/hora: 2026-10-19T21:13:05.692Z.
- Tipo: unitaria/integración.
- Entorno: repositorio en memoria aislado.
- Objetivo: validar cálculo, filtrado y consistencia de generación.

## 2. Precondiciones
- No requiere BD, SMTP ni datos de desarrollo.

## 3. Datos de entrada
- Ver `datos-prueba.json` y `casos-prueba.json`.

## 4. Ejecución paso a paso
| Acción | Método/servicio | Esperado | Obtenido | HTTP | Comprobación BD | Evidencia | Estado |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ESCALABLE para 395 días | GenerarCronogramaDesdePlantillaUseCase | Regla aplicada | Regla validada | N/A | Repositorio en memoria | resultado-tests.json | PASS |
| ESCALABLE sin fecha anterior al inicio | GenerarCronogramaDesdePlantillaUseCase | Regla aplicada | Regla validada | N/A | Repositorio en memoria | resultado-tests.json | PASS |
| FIJO_EVENTO | GenerarCronogramaDesdePlantillaUseCase | Regla aplicada | Regla validada | N/A | Repositorio en memoria | resultado-tests.json | PASS |
| DIA_EVENTO | GenerarCronogramaDesdePlantillaUseCase | Regla aplicada | Regla validada | N/A | Repositorio en memoria | resultado-tests.json | PASS |
| filtro por tipo de ceremonia | GenerarCronogramaDesdePlantillaUseCase | Regla aplicada | Regla validada | N/A | Repositorio en memoria | resultado-tests.json | PASS |
| dependencia omitida cuando una actividad no se genera | GenerarCronogramaDesdePlantillaUseCase | Regla aplicada | Regla validada | N/A | Repositorio en memoria | resultado-tests.json | PASS |

## 5. Registros creados/modificados
| Modelo/tabla | ID | Acción | Campos relevantes | Evidencia |
| --- | --- | --- | --- | --- |
| cr_hito / cr_actividad / cr_dependencia / cr_timing | En memoria | Generación simulada | fechas, tipo y relaciones | registros-generados.json |

## 6. Validaciones realizadas
- ESCALABLE, FIJO_EVENTO, DIA_EVENTO, filtro de ceremonia y dependencias filtradas.

## 7. Incidencias o warnings
- La suite no usa PostgreSQL físico; esa verificación corresponde al runner manual.

## 8. Reproducción
- Comando: `pnpm.cmd test:creacion-matrimonio`.
- La evidencia automática se sobrescribe al ejecutar la suite.
