# Resultado de ejecución

## 1. Identificación de la prueba
- Nombre: creación manual de matrimonio (RELIGIOSO_CIVIL).
- ID de ejecución: `manual-creacion-matrimonio-RELIGIOSO_CIVIL`.
- Fecha/hora: 2026-10-19T21:54:04.769Z.
- Tipo: funcional.
- Entorno: configuración normal del backend y base de datos configurada.
- Objetivo: crear y verificar un matrimonio mediante el caso de uso real.

## 2. Precondiciones
- Existe un Wedding Planner activo y los catálogos requeridos.

## 3. Datos de entrada
- Ver `datos-prueba.json` y `casos-prueba.json`.

## 4. Ejecución paso a paso

| Acción | Método/servicio | Esperado | Obtenido | HTTP | Comprobación BD | Evidencia | Estado |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Matrimonio válido | GuardarOnboardingMatrimonioUseCase | Según regla | Se ejecutó GuardarOnboardingMatrimonioUseCase con iniciar=true. | N/A | registros-creados.json | JSON de ejecución | PASS |
| Proyecto activo en fase INICIO | GuardarOnboardingMatrimonioUseCase | Según regla | estado=true, idFaseProyecto=2 | N/A | registros-creados.json | JSON de ejecución | PASS |
| Tipo de ceremonia | GuardarOnboardingMatrimonioUseCase | Según regla | RELIGIOSO_CIVIL | N/A | registros-creados.json | JSON de ejecución | PASS |
| Dependencias consistentes | GuardarOnboardingMatrimonioUseCase | Según regla | 27 dependencias generadas. | N/A | registros-creados.json | JSON de ejecución | PASS |
| Cronograma generado | GuardarOnboardingMatrimonioUseCase | Según regla | 12 hitos, 15 actividades y 19 timing. | N/A | registros-creados.json | JSON de ejecución | PASS |
| Duplicado WP + fecha | GuardarOnboardingMatrimonioUseCase | Según regla | Ya tienes un matrimonio activo para la misma fecha. | N/A | registros-creados.json | JSON de ejecución | PASS |
| DNI en matrimonio no cerrado | GuardarOnboardingMatrimonioUseCase | Según regla | El proyecto ya tiene un cronograma generado. | N/A | registros-creados.json | JSON de ejecución | PASS |
| Fecha insuficiente | GuardarOnboardingMatrimonioUseCase | Según regla | La fecha del matrimonio debe estar al menos a 30 días de hoy. | N/A | registros-creados.json | JSON de ejecución | PASS |
| Mismo DNI después de CIERRE | GuardarOnboardingMatrimonioUseCase | Según regla | El proyecto ya tiene un cronograma generado. | N/A | registros-creados.json | JSON de ejecución | FAIL |

## 5. Registros creados/modificados
| Modelo/tabla | ID | Acción | Campos relevantes | Evidencia |
| --- | --- | --- | --- | --- |
| gp_proyecto / gp_matrimonio / cr_* | Ver JSON | Crear, reutilizar o actualizar | fase, estado, ceremonia y cronograma | registros-creados.json |

## 6. Validaciones realizadas
- Fase INICIO, estado activo, ceremonia, dependencias, DNI, fecha mínima y Wedding Planner+fecha.

## 7. Incidencias o warnings
- Ninguna.

## 8. Reproducción
- Comando: `pnpm.cmd test:manual:creacion-matrimonio -- --tipo=RELIGIOSO_CIVIL`.
- La carpeta manual se sobrescribe; los registros de BD no se eliminan.
