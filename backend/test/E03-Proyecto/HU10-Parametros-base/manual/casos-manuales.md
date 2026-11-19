# Casos manuales — HU10: parámetros base, alcance y EDT

Esta guía complementa las pruebas unitarias del backend. Las verificaciones
visuales se ejecutan con una sesión de Wedding Planner autenticada y una base
con las plantillas EDT, cronograma e hitos restauradas.

## CP-E03-HU10-01 — Registrar parámetros base obligatorios

| Campo | Detalle |
|---|---|
| Historia de usuario | HU10 — Configurar los parámetros base y el alcance del matrimonio. |
| Criterio de aceptación | CA046. |
| Tipo de prueba | Funcional, validación de formulario y API. |
| Objetivo | Confirmar que el asistente exige fecha, moneda, presupuesto, cantidad de invitados y tipo de ceremonia; además registra ambas parejas, ubicación, alcance y campos de planificación. |
| Precondiciones | Wedding Planner autenticada; catálogos de ubigeos, ceremonias y categorías de servicio activos. |
| Datos de prueba | Fecha futura a más de 30 días; moneda `SOLES`; presupuesto `50000`; 120 invitados; ceremonia `CIVIL`; alcance `CATERING;FOTOGRAFIA`; objetivos, necesidades, supuestos y restricciones separados por `;`. |
| Componente / endpoint | Asistente Crear matrimonio; `POST /matrimonios/onboarding`. |
| Pasos de ejecución | 1. Completar ambas parejas con DNI distintos. 2. Completar los campos obligatorios. 3. Seleccionar dos categorías de alcance. 4. Intentar continuar sin cada campo obligatorio, uno por uno. 5. Completarlo y continuar. |
| Resultado esperado | Los campos obligatorios muestran validación y bloquean el avance si faltan. Con datos válidos se conserva todo el contenido sin alterar códigos, moneda ni listas delimitadas. |
| Resultado obtenido | No ejecutado en esta matriz; registrar evidencia visual y respuesta del endpoint al ejecutarlo. |
| Estado | No ejecutado. |
| Observaciones | Los DNI y usuarios de ambas parejas deben ser diferentes. La fecha debe cumplir el mínimo de 30 días antes de iniciar el proyecto. |

## CP-E03-HU10-02 — Persistir configuración base y usarla como referencia

| Campo | Detalle |
|---|---|
| Historia de usuario | HU10 — Configurar los parámetros base y el alcance del matrimonio. |
| Criterio de aceptación | CA047. |
| Tipo de prueba | Integración API y funcional. |
| Objetivo | Verificar que un borrador y un matrimonio confirmado recuperan fecha, presupuesto, moneda, invitados, ceremonia, alcance y textos de planificación exactamente como fueron guardados. |
| Precondiciones | Existe un proyecto borrador creado con los datos de CP-E03-HU10-01. |
| Datos de prueba | Los mismos de CP-E03-HU10-01, incluyendo `alcance = CATERING;FOTOGRAFIA`. |
| Componente / endpoint | `GET /matrimonios/onboarding/proyecto/:idProyecto`; tablas `gp_proyecto` y `gp_matrimonio`. |
| Pasos de ejecución | 1. Guardar borrador. 2. Salir del asistente. 3. Reabrir el mismo borrador. 4. Comparar cada campo con el valor ingresado. 5. Confirmar el matrimonio y consultar el proyecto activo. |
| Resultado esperado | La fecha procede de `gp_matrimonio.fecha_matrimonio`; presupuesto, moneda, invitados, ceremonia, alcance y textos proceden del proyecto sin pérdida ni sustitución. Estos valores quedan disponibles como contexto para la planificación. |
| Resultado obtenido | No ejecutado en esta matriz. |
| Estado | No ejecutado. |
| Observaciones | Verificar especialmente que la fecha se muestra como fecha local y no cambia por zona horaria. |

## CP-E03-HU10-03 — Configurar una EDT propia desde una plantilla

| Campo | Detalle |
|---|---|
| Historia de usuario | HU10 — Configurar los parámetros base y el alcance del matrimonio. |
| Criterio de aceptación | CA048. |
| Tipo de prueba | Integración API y funcional. |
| Objetivo | Confirmar que la Wedding Planner puede seleccionar una plantilla, excluir o incluir nodos, añadir nodos propios y modificar el árbol de la EDT del matrimonio sin modificar la plantilla de origen. |
| Precondiciones | Existe una plantilla EDT GLOBAL activa y el usuario tiene acceso al matrimonio en creación. |
| Datos de prueba | Plantilla `EDT general de matrimonio`; excluir un nodo de servicio, conservar uno general y agregar `Coordinación de transporte` como nodo propio. |
| Componente / endpoint | `POST /matrimonios/:idMatrimonio/edt`, `GET /matrimonios/:idMatrimonio/edt`, endpoints de elementos EDT; tablas `gp_edt_*`. |
| Pasos de ejecución | 1. Elegir la plantilla. 2. Marcar y desmarcar elementos. 3. Agregar un nodo bajo un padre. 4. Reordenar nodos del mismo nivel. 5. Guardar. 6. Consultar la EDT del matrimonio y luego la plantilla original. |
| Resultado esperado | Se crea una EDT activa propia. Su árbol conserva padres y orden válidos; los nodos no seleccionados no se instancian; los nuevos no alteran `gp_edt_plantilla*`; la plantilla de origen permanece idéntica. |
| Resultado obtenido | No ejecutado en esta matriz. |
| Estado | No ejecutado. |
| Observaciones | Validar que el backend impide ciclos, autorreferencias y padres de otra EDT. |

## CP-E03-HU10-04 — Revisar y corregir antes de confirmar

| Campo | Detalle |
|---|---|
| Historia de usuario | HU10 — Configurar los parámetros base y el alcance del matrimonio. |
| Criterio de aceptación | CA049. |
| Tipo de prueba | Funcional, navegación y regresión móvil. |
| Objetivo | Verificar que el paso Resumen muestra datos base, alcance y EDT; permite volver a cualquier paso para corregirlos antes de confirmar. |
| Precondiciones | Asistente completado hasta el resumen, sin haber confirmado el matrimonio. |
| Datos de prueba | Datos de CP-E03-HU10-01 y una EDT configurada. |
| Componente / endpoint | Paso 5 del asistente Crear matrimonio; estado local de borrador y `GET /matrimonios/onboarding/proyecto/:idProyecto`. |
| Pasos de ejecución | 1. Llegar al resumen. 2. Verificar parejas, fecha, presupuesto/moneda, alcance, textos y EDT. 3. Volver a pasos 2, 3 y 4. 4. Editar presupuesto, alcance y un nodo EDT. 5. Retornar al resumen. |
| Resultado esperado | El resumen refleja los últimos cambios, no se pierde información al navegar y la confirmación solo se realiza al pulsar el botón final. |
| Resultado obtenido | No ejecutado en esta matriz. |
| Estado | No ejecutado. |
| Observaciones | Ejecutar en ancho móvil y web; tomar captura del resumen antes y después de editar. |

## CP-E03-HU10-05 — Instanciar EDT y generar cronograma e hitos

| Campo | Detalle |
|---|---|
| Historia de usuario | HU10 — Configurar los parámetros base y el alcance del matrimonio. |
| Criterio de aceptación | CA050. |
| Tipo de prueba | Integración, API y regresión. |
| Objetivo | Verificar que confirmar el matrimonio utiliza su EDT activa para crear actividades aplicables, dependencias y hitos operativos independientes de las plantillas. |
| Precondiciones | Datos base válidos, EDT activa con elementos seleccionados y plantillas cronograma/hitos restauradas. |
| Datos de prueba | Ceremonia civil, alcance `CATERING;FOTOGRAFIA`, fecha futura y EDT con un elemento de catering activo. |
| Componente / endpoint | Finalización de onboarding; `GenerarCronogramaDesdePlantillaUseCase`; tablas `cr_actividad`, `cr_dependencia`, `cr_hito`, `cr_hito_actividad` y checklists. |
| Pasos de ejecución | 1. Confirmar el matrimonio. 2. Consultar Plan. 3. Verificar actividades compatibles con ceremonia y EDT. 4. Verificar dependencias y checklists copiados. 5. Editar una actividad y un nodo EDT operativo. 6. Consultar sus plantillas de origen. |
| Resultado esperado | Se genera una sola instancia operativa de cronograma e hitos. Se copian las dependencias y checklists aplicables. Editar instancias del matrimonio no modifica plantillas `cr_plantilla_*` ni `gp_edt_plantilla*`. |
| Resultado obtenido | No ejecutado en esta matriz. |
| Estado | No ejecutado. |
| Observaciones | El timing no se genera en este paso: se crea después de que la Wedding Planner indique la hora inicial del día de boda. |
