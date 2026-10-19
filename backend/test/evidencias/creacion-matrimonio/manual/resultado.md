# Resultado de ejecución

## 1. Identificación de la prueba
- Nombre: creación manual de matrimonio (RELIGIOSO_CIVIL).
- ID de ejecución: `manual-creacion-matrimonio-RELIGIOSO_CIVIL`.
- Fecha/hora: 2026-10-19T21:46:07.439Z.
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
| Ejecución | GuardarOnboardingMatrimonioUseCase | Según regla | Failed to decode column cr_plantilla_actividad.lista_verificacion with codec 'pg/json@1': Unexpected token 'F', "Fecha defi"... is not valid JSON | N/A | registros-creados.json | JSON de ejecución | FAIL |

## 5. Registros creados/modificados
| Modelo/tabla | ID | Acción | Campos relevantes | Evidencia |
| --- | --- | --- | --- | --- |
| gp_proyecto / gp_matrimonio / cr_* | Ver JSON | Crear, reutilizar o actualizar | fase, estado, ceremonia y cronograma | registros-creados.json |

## 6. Validaciones realizadas
- Fase INICIO, estado activo, ceremonia, dependencias, DNI, fecha mínima y Wedding Planner+fecha.

## 7. Incidencias o warnings
- Failed to decode column cr_plantilla_actividad.lista_verificacion with codec 'pg/json@1': Unexpected token 'F', "Fecha defi"... is not valid JSON

## 8. Reproducción
- Comando: `pnpm.cmd test:manual:creacion-matrimonio -- --tipo=RELIGIOSO_CIVIL`.
- La carpeta manual se sobrescribe; los registros de BD no se eliminan.
