# Resultado de ejecución

## 1. Identificación de la prueba
- ID de ejecución: `manual-gestion-cronograma-2026-10-19T22:46:21.848Z`
- Fecha/hora: 2026-10-19T22:46:24.643Z
- Tipo: manual contra BD configurada.
- Comando: `pnpm.cmd test:manual:gestion-cronograma`

## 2. Precondiciones
- Proyecto: `eb03491c-9ca4-4cbb-996d-ef9c1cb245f4`.
- Fase inicial: `INICIO`.
- No se creó ningún matrimonio.

## 3. Ejecución paso a paso
| ID | Caso | Resultado esperado | Resultado obtenido | Estado |
|---|---|---|---|---|
| CRON-LIST-01 | Listado general | Hitos, actividades, dependencias y timing del proyecto. | Listado obtenido. | PASS |
| HIT-02 | Crear hito | Hito manual activo. | Hito creado. | PASS |
| HIT-03 | Editar hito de plantilla | Se conserva trazabilidad y se permite editar. | Actualización aplicada. | PASS |
| HIT-04/05 | Editar/cambiar estado hito manual | Cambios persistidos. | Actualización aplicada. | PASS |
| ACT-01/02 | Listar y filtrar actividades | Listado activo del proyecto. | 15 actividades activas. | PASS |
| ACT-03 | Crear actividad | Actividad manual activa. | Actividad creada. | PASS |
| HIT-06 | Desactivar hito manual | El hito queda con activo=false. | Desactivación lógica aplicada. | PASS |
| ACT-04/PLAN-07 | Editar actividad de plantilla cerca de boda | Guardar sin bloqueo por plantilla. | Actualización permitida. | PASS |
| ACT-05/07 | Editar y desactivar actividad manual | activo=false. | Actividad desactivada. | PASS |
| DEP-02/03 | Crear dependencia manual | Dependencia válida entre instancias operativas. | Dependencia creada. | PASS |
| DEP-04 | Dependencia duplicada | La dependencia ya existe. | La dependencia ya existe. | PASS |
| DEP-05 | Autodependencia | Una actividad no puede depender de sí misma. | Una actividad no puede depender de sí misma. | PASS |
| DEP-06 | Ciclo | La dependencia generaría un ciclo. | La dependencia generaría un ciclo. | PASS |
| DEP-08 | Eliminar dependencia | Eliminación física según diseño actual. | Dependencia eliminada. | PASS |
| TIM-02 | Crear timing | Timing manual activo. | Timing creado. | PASS |
| TIM-03/04/06 | Editar plantilla/manual y desactivar | Plantilla no bloquea; manual queda inactivo. | Operaciones aplicadas. | PASS |
| FASE-01 | INICIO a PLANIFICACION | Cambio persistido. | INICIO → PLANIFICACION. | PASS |
| PLAN-01..06 | Edición posterior en PLANIFICACION | Cronograma continúa editable. | Actividad e hito editados; actividad nueva creada. | PASS |
| CRON-LIST-FINAL | Listado final | Cambios visibles y registros inactivos excluidos. | Listado final obtenido. | PASS |

## 4. Registros creados/modificados
Ver `registros-creados.json`; los registros no se eliminan al finalizar.

## Resultado global: PASS

PASS: 19. FAIL: 0.
