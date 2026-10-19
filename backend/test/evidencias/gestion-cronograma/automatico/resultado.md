# Resultado de ejecución

## 1. Identificación de la prueba

- Nombre: gestión y reprogramación de cronograma.
- Fecha/hora: 2026-10-19.
- Tipo: unitaria/funcional con repositorios en memoria aislados.
- Comando: `pnpm.cmd test:gestion-cronograma`.

## 2. Ejecución paso a paso

| Acción | Método/servicio | Esperado | Obtenido | Estado |
|---|---|---|---|---|
| CRUD de actividad | GestionarActividadesUseCase | Crear, estado y desactivación | Validado | PASS |
| Dependencias | GestionarDependenciasUseCase | Rechaza duplicada, autodependencia y proyecto distinto | Validado | PASS |
| Resumen | ConsultarCronogramaUseCase | Conteos y retrasadas | Validado | PASS |
| Reprogramación | ReprogramarActividadUseCase | Preview, cadena, desfase y confirmación | Validado | PASS |
| Fase | ConfirmarPlanificacionCronogramaUseCase | INICIO a PLANIFICACION | Validado | PASS |

## 3. Resultado

18 pruebas ejecutadas: 18 PASS, 0 FAIL.

Los fixtures son aislados; no se modificó PostgreSQL ni ninguna plantilla.
