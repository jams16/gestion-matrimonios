# Matriz de pruebas detallada — E03 Proyecto

Este documento define los casos de prueba de la épica E03. Los resultados de
una ejecución se guardan por separado en `evidencias/`; por ello el estado de
un caso en este diseño es **No ejecutado** hasta contar con evidencia fechada,
salida automática o evidencia manual verificable.

La redefinición de HU10 se encuentra desarrollada campo por campo en
[`HU10-Parametros-base/manual/casos-manuales.md`](HU10-Parametros-base/manual/casos-manuales.md).

## HU11 — Visualizar avance general

### CP-E03-HU11-01

| Campo | Detalle |
|---|---|
| ID del caso de prueba | CP-E03-HU11-01 |
| Historia de usuario | HU11 — Visualizar avance general del matrimonio. |
| Criterio de aceptación | CA051, CA052. |
| Tipo de prueba | Integración API y funcional responsive. |
| Objetivo | Verificar el cálculo y la presentación del avance de actividades e hitos del matrimonio activo. |
| Precondiciones | Proyecto en planificación con actividades e hitos activos, algunos en estado completado. |
| Datos de prueba | 10 actividades, 4 completadas; 3 hitos, 1 completado. |
| Componente / endpoint | Resumen de Plan; consulta de cronograma y resumen operativo. |
| Pasos de ejecución | 1. Abrir el proyecto. 2. Registrar estados indicados. 3. Recargar Plan. 4. Comparar contadores y porcentajes. |
| Resultado esperado | Se muestran los totales y progreso del matrimonio activo, sin incluir registros de otro proyecto. |
| Resultado obtenido | No ejecutado. |
| Estado | No ejecutado. |
| Observaciones | Comprobar el cambio inmediato después de actualizar una actividad. |

### CP-E03-HU11-02

| Campo | Detalle |
|---|---|
| ID del caso de prueba | CP-E03-HU11-02 |
| Historia de usuario | HU11 — Visualizar avance general del matrimonio. |
| Criterio de aceptación | CA053. |
| Tipo de prueba | Integración API y funcional. |
| Objetivo | Validar el indicador invitados confirmados / total y su actualización al modificar RSVP o pases. |
| Precondiciones | Matrimonio activo con invitados principales y pases. |
| Datos de prueba | 8 invitados; 3 confirmaciones iniciales y 2 confirmaciones finales. |
| Componente / endpoint | Gestión e Invitados; endpoints de invitados, RSVP y pases. |
| Pasos de ejecución | 1. Consultar métrica. 2. Confirmar un invitado. 3. Agregar un pase. 4. Cancelar una confirmación. 5. Verificar el indicador tras cada cambio. |
| Resultado esperado | Numerador y denominador usan datos del matrimonio activo y se recalculan sin mezclar invitados externos. |
| Resultado obtenido | No ejecutado. |
| Estado | No ejecutado. |
| Observaciones | Ejecutar con confirmación inicial y segunda confirmación. |

### CP-E03-HU11-03

| Campo | Detalle |
|---|---|
| ID del caso de prueba | CP-E03-HU11-03 |
| Historia de usuario | HU11 — Visualizar avance general del matrimonio. |
| Criterio de aceptación | CA054. |
| Tipo de prueba | Integración API y funcional. |
| Objetivo | Verificar el resumen de presupuesto y la advertencia por sobrepresupuesto. |
| Precondiciones | Presupuesto base definido y categorías/costos activos. |
| Datos de prueba | Presupuesto `S/ 10,000`; costos estimados `S/ 9,000` y luego `S/ 10,500`. |
| Componente / endpoint | Presupuesto; endpoints de categorías, costos y alertas de presupuesto. |
| Pasos de ejecución | 1. Registrar costo dentro del límite. 2. Consultar resumen. 3. Aumentar costo sobre el límite. 4. Verificar importe restante y nueva alerta. |
| Resultado esperado | El resumen utiliza valores reales y la alerta refleja el exceso actualizado. |
| Resultado obtenido | No ejecutado. |
| Estado | No ejecutado. |
| Observaciones | Repetir con moneda del proyecto configurada en dólares. |

### CP-E03-HU11-04

| Campo | Detalle |
|---|---|
| ID del caso de prueba | CP-E03-HU11-04 |
| Historia de usuario | HU11 — Visualizar avance general del matrimonio. |
| Criterio de aceptación | CA055. |
| Tipo de prueba | Funcional, autorización y regresión. |
| Objetivo | Confirmar actualización de indicadores y restricción de datos a usuarios autorizados. |
| Precondiciones | Project Manager y usuario no asociado; matrimonio con datos operativos. |
| Datos de prueba | Credenciales de ambos usuarios; una modificación de actividad, RSVP y costo. |
| Componente / endpoint | Navegación principal, endpoints protegidos de proyecto y módulos relacionados. |
| Pasos de ejecución | 1. Modificar cada dato como usuario autorizado. 2. Refrescar indicadores. 3. Repetir la consulta con usuario no asociado. |
| Resultado esperado | Indicadores se actualizan para el usuario autorizado; el no asociado recibe denegación y no ve datos. |
| Resultado obtenido | No ejecutado. |
| Estado | No ejecutado. |
| Observaciones | Adjuntar capturas y respuestas HTTP sin datos sensibles. |

## HU12 — Metodologías y buenas prácticas

### CP-E03-HU12-01

| Campo | Detalle |
|---|---|
| ID del caso de prueba | CP-E03-HU12-01 |
| Historia de usuario | HU12 — Consultar buenas prácticas aplicables. |
| Criterio de aceptación | CA056, CA060. |
| Tipo de prueba | API, integración y seguridad. |
| Objetivo | Consultar el catálogo vigente y comprobar paginación, búsqueda y acceso autenticado. |
| Precondiciones | Datos base GP01–GP78 restaurados; token válido. |
| Datos de prueba | Búsquedas `GP01`, `GP20` y texto parcial; solicitud sin token. |
| Componente / endpoint | `GET /buenas-practicas`; `gp_buena_practica`. |
| Pasos de ejecución | 1. Listar catálogo. 2. Buscar por código. 3. Verificar campos. 4. Intentar consulta sin autenticación. |
| Resultado esperado | Se retornan únicamente registros activos y serializables; la consulta sin token es rechazada. |
| Resultado obtenido | No ejecutado. |
| Estado | No ejecutado. |
| Observaciones | Verificar que IDs BigInt se serializan correctamente. |

### CP-E03-HU12-02

| Campo | Detalle |
|---|---|
| ID del caso de prueba | CP-E03-HU12-02 |
| Historia de usuario | HU12 — Consultar buenas prácticas aplicables. |
| Criterio de aceptación | CA057, CA058. |
| Tipo de prueba | API y funcional. |
| Objetivo | Verificar texto de aplicación al matrimonio y trazabilidad metodológica. |
| Precondiciones | Registro GP existente con fuente y referencia. |
| Datos de prueba | GP01, GP03, GP24 y GP28. |
| Componente / endpoint | Buenas prácticas y cards informativas de la aplicación. |
| Pasos de ejecución | 1. Consultar registros. 2. Abrir el detalle desde una card. 3. Comparar campos devueltos con lo mostrado. |
| Resultado esperado | Se conservan descripción, aplicación, fuente, año y referencia sin truncar el detalle. |
| Resultado obtenido | No ejecutado. |
| Estado | No ejecutado. |
| Observaciones | El resumen visual puede truncarse; el modal debe mostrar el texto íntegro. |

### CP-E03-HU12-03

| Campo | Detalle |
|---|---|
| ID del caso de prueba | CP-E03-HU12-03 |
| Historia de usuario | HU12 — Consultar buenas prácticas aplicables. |
| Criterio de aceptación | CA059. |
| Tipo de prueba | Funcional y responsive. |
| Objetivo | Verificar que la recomendación contextual aparece en el paso o sección correspondiente. |
| Precondiciones | Buenas prácticas restauradas y proyecto activo. |
| Datos de prueba | GP01–GP09 en Crear matrimonio; GP20/25/26/27/28 en Plan. |
| Componente / endpoint | Crear matrimonio, Plan y `GET /buenas-practicas?buscar=<codigo>`. |
| Pasos de ejecución | 1. Entrar a cada paso/pestaña. 2. Comprobar la recomendación. 3. Abrir el detalle. 4. Repetir en móvil. |
| Resultado esperado | Cada zona muestra solo la recomendación trazada a su código y puede abrir el contenido completo. |
| Resultado obtenido | No ejecutado. |
| Estado | No ejecutado. |
| Observaciones | No se considera una edición de la buena práctica. |

## HU13 — Información centralizada del matrimonio

### CP-E03-HU13-01

| Campo | Detalle |
|---|---|
| ID del caso de prueba | CP-E03-HU13-01 |
| Historia de usuario | HU13 — Consultar información centralizada del matrimonio. |
| Criterio de aceptación | CA061, CA062. |
| Tipo de prueba | Funcional, sesión y navegación. |
| Objetivo | Mantener el matrimonio seleccionado entre Plan, Gestión, Proveedores y recarga. |
| Precondiciones | Dos matrimonios accesibles para el mismo Project Manager. |
| Datos de prueba | Matrimonio A y B con nombres y datos distinguibles. |
| Componente / endpoint | Selector de matrimonios, `AuthSession` y rutas principales. |
| Pasos de ejecución | 1. Seleccionar A. 2. Navegar por módulos. 3. Recargar. 4. Seleccionar B. 5. Repetir. |
| Resultado esperado | El contexto permanece en la sesión y cada ruta muestra solamente información del matrimonio elegido. |
| Resultado obtenido | No ejecutado. |
| Estado | No ejecutado. |
| Observaciones | Probar restauración de sesión y de matrimonio seleccionado. |

### CP-E03-HU13-02

| Campo | Detalle |
|---|---|
| ID del caso de prueba | CP-E03-HU13-02 |
| Historia de usuario | HU13 — Consultar información centralizada del matrimonio. |
| Criterio de aceptación | CA063. |
| Tipo de prueba | Integración. |
| Objetivo | Verificar que cambios en módulos actualizan sus indicadores relacionados. |
| Precondiciones | Matrimonio con cronograma, invitados, proveedores y presupuesto. |
| Datos de prueba | Cambio de RSVP, proveedor contratado y costo estimado. |
| Componente / endpoint | Providers de cada módulo y resúmenes de Gestión/Plan/Proveedores. |
| Pasos de ejecución | 1. Cambiar un dato en cada módulo. 2. Volver al resumen. 3. Actualizar vista. |
| Resultado esperado | Solo los indicadores afectados se recalculan con el matrimonio activo. |
| Resultado obtenido | No ejecutado. |
| Estado | No ejecutado. |
| Observaciones | Registrar número de solicitudes para detectar recargas innecesarias. |

### CP-E03-HU13-03

| Campo | Detalle |
|---|---|
| ID del caso de prueba | CP-E03-HU13-03 |
| Historia de usuario | HU13 — Consultar información centralizada del matrimonio. |
| Criterio de aceptación | CA064. |
| Tipo de prueba | Integración de datos. |
| Objetivo | Confirmar que datos comunes del matrimonio son reutilizados como fuente única. |
| Precondiciones | Matrimonio creado con fecha, ceremonia, alcance y responsables. |
| Datos de prueba | Fecha futura, ceremonia civil, alcance con dos categorías. |
| Componente / endpoint | Proyecto/matrimonio, EDT, cronograma, timing y proveedores. |
| Pasos de ejecución | 1. Consultar datos en cada módulo. 2. Cambiar un dato base permitido. 3. Verificar consumidores afectados. |
| Resultado esperado | Los módulos usan los mismos IDs y contexto, sin duplicar ni mezclar datos. |
| Resultado obtenido | No ejecutado. |
| Estado | No ejecutado. |
| Observaciones | No debe modificar plantillas reutilizables. |

### CP-E03-HU13-04

| Campo | Detalle |
|---|---|
| ID del caso de prueba | CP-E03-HU13-04 |
| Historia de usuario | HU13 — Consultar información centralizada del matrimonio. |
| Criterio de aceptación | CA065. |
| Tipo de prueba | API, autorización e integración. |
| Objetivo | Verificar aislamiento de datos y permisos por proyecto. |
| Precondiciones | Dos usuarios y dos proyectos no compartidos. |
| Datos de prueba | ID de proyecto ajeno y token de usuario no asociado. |
| Componente / endpoint | Endpoints de proyecto/matrimonio y módulos contextuales. |
| Pasos de ejecución | 1. Consultar proyecto propio. 2. Intentar el proyecto ajeno. 3. Intentar modificar datos ajenos. |
| Resultado esperado | El acceso ajeno es rechazado y no se filtran registros, totales ni relaciones. |
| Resultado obtenido | No ejecutado. |
| Estado | No ejecutado. |
| Observaciones | Registrar HTTP 401/403 según contrato. |

## HU14 — Flujo guiado de planificación

### CP-E03-HU14-01

| Campo | Detalle |
|---|---|
| ID del caso de prueba | CP-E03-HU14-01 |
| Historia de usuario | HU14 — Guiar el avance de planificación. |
| Criterio de aceptación | CA066. |
| Tipo de prueba | Integración API y funcional. |
| Objetivo | Mostrar la fase real del proyecto y su estado de planificación. |
| Precondiciones | Proyecto en fase `PLANIFICACION`. |
| Datos de prueba | Proyecto creado y cronograma generado. |
| Componente / endpoint | Fases de proyecto, Plan y navegación condicionada. |
| Pasos de ejecución | 1. Consultar proyecto. 2. Abrir Plan. 3. Comparar código de fase, etiquetas y rutas habilitadas. |
| Resultado esperado | La interfaz refleja la fase real, no un código inventado; las rutas se habilitan según confirmación soportada. |
| Resultado obtenido | No ejecutado. |
| Estado | No ejecutado. |
| Observaciones | Verificar transición posterior a confirmar planificación. |

### CP-E03-HU14-02

| Campo | Detalle |
|---|---|
| ID del caso de prueba | CP-E03-HU14-02 |
| Historia de usuario | HU14 — Guiar el avance de planificación. |
| Criterio de aceptación | CA067, CA068. |
| Tipo de prueba | Funcional e integración. |
| Objetivo | Verificar orden, dependencias y advertencias que guían próximas acciones. |
| Precondiciones | Cronograma con actividades dependientes y fechas distintas. |
| Datos de prueba | A predecesora de B; B pendiente; fecha de B próxima. |
| Componente / endpoint | Cronograma, dependencias y validación de estados. |
| Pasos de ejecución | 1. Intentar completar B antes de A. 2. Abrir advertencia. 3. Completar A. 4. Revisar B. |
| Resultado esperado | El sistema explica los pendientes que bloquean la acción y actualiza la disponibilidad posterior. |
| Resultado obtenido | No ejecutado. |
| Estado | No ejecutado. |
| Observaciones | Aplicar el mismo criterio a dependencias múltiples. |

### CP-E03-HU14-03

| Campo | Detalle |
|---|---|
| ID del caso de prueba | CP-E03-HU14-03 |
| Historia de usuario | HU14 — Guiar el avance de planificación. |
| Criterio de aceptación | CA069. |
| Tipo de prueba | Integración y regresión. |
| Objetivo | Verificar que el flujo se recalcula al completar o modificar una acción. |
| Precondiciones | Actividades e hitos asociados; Plan abierto. |
| Datos de prueba | Hito con dos actividades; completar ambas en secuencia. |
| Componente / endpoint | Actividades, relaciones hito-actividad y resumen de cronograma. |
| Pasos de ejecución | 1. Completar primera actividad. 2. Consultar hito. 3. Completar segunda. 4. Refrescar Plan. |
| Resultado esperado | El hito se actualiza únicamente cuando se cumplen sus actividades y los contadores se recalculan. |
| Resultado obtenido | No ejecutado. |
| Estado | No ejecutado. |
| Observaciones | Un criterio de aceptación textual requiere revisión humana adicional. |

### CP-E03-HU14-04

| Campo | Detalle |
|---|---|
| ID del caso de prueba | CP-E03-HU14-04 |
| Historia de usuario | HU14 — Guiar el avance de planificación. |
| Criterio de aceptación | CA070. |
| Tipo de prueba | Funcional y regresión. |
| Objetivo | Confirmar que la planificación puede modificarse sin alterar plantillas y con validaciones de conflicto. |
| Precondiciones | Cronograma, EDT y timing generados desde plantillas. |
| Datos de prueba | Edición de actividad, hito, elemento EDT y momento de timing. |
| Componente / endpoint | CRUD de EDT y cronograma; reprogramación y validación de conflictos. |
| Pasos de ejecución | 1. Editar y reordenar instancias. 2. Provocar dependencia inválida o conflicto fijo. 3. Revisar advertencia. 4. Consultar plantilla original. |
| Resultado esperado | Los cambios afectan solo instancias del matrimonio; conflictos se rechazan o advierten con explicación clara. |
| Resultado obtenido | No ejecutado. |
| Estado | No ejecutado. |
| Observaciones | Probar en móvil y escritorio. |
