# Flujo Flutter de planificación del cronograma

## Flujo implementado

1. El cuarto paso de **Crear matrimonio** llama al endpoint real de onboarding
   `POST /matrimonios/onboarding/comenzar`.
2. El backend persiste el matrimonio/proyecto e invoca su caso de uso de
   generación desde plantillas. Flutter no vuelve a generar hitos,
   actividades, dependencias ni timing.
3. Al recibir `idProyecto`, Flutter muestra durante cinco segundos la pantalla
   **Planificar matrimonio** con progreso visual y abre `/plan`.
4. La vista de cronograma consulta simultáneamente el cronograma operativo y
   el contexto del matrimonio con `GET /proyectos/:id/cronograma` y
   `GET /matrimonios/onboarding/proyecto/:id`.
5. Al confirmar, usa `POST /proyectos/:id/cronograma/confirmar-planificacion`.
   La fase real del backend es `PLANIFICACION`; la acción visible es
   **PLANIFICADO**. Las modificaciones posteriores no quedan bloqueadas.

## Endpoints conectados

- Cronograma integral: `GET /proyectos/:idProyecto/cronograma`.
- Hitos: `POST`, `PATCH`, `DELETE /hitos` (la eliminación es lógica en el
  backend).
- Actividades: `POST`, `PATCH`, `DELETE /actividades`, y los endpoints de
  cambio de estado, previsualización/confirmación de reprogramación.
- Dependencias: `POST` y `DELETE /dependencias` (el backend realiza la
  eliminación física de la relación y valida ciclos/precedencia).
- Timing: `POST`, `PATCH`, `DELETE /timing` (la eliminación es lógica) y
  cambio de orden con `PATCH`.
- Plantillas disponibles: `GET` y `POST
  /sugerencias/actividades`. La pantalla excluye las plantillas cuya instancia
  ya está incorporada en el proyecto.

## Edición, conflictos y preservación

- En actividades existentes, los cambios textuales válidos se guardan con
  debounce de 700 ms y confirman el resultado mediante feedback. Los campos de
  fecha se guardan explícitamente: así nunca se evita el preview obligatorio
  de reprogramación ni se envían fechas incompletas.
- Al cambiar fechas de una actividad se usa primero el preview real de
  reprogramación. Si existen sucesoras afectadas, la persona decide si aplica
  la propagación propuesta; el backend conserva la autoridad sobre fechas,
  `FINISH_TO_START`, desfases y ciclos.
- Los errores de conflicto/validación del API se muestran como feedback en la
  pantalla, sin modificar plantillas `cr_plantilla_*`.

## Navegación condicionada

Mientras el proyecto activo no llegue a fase `PLANIFICACION`, las secciones
**Home**, **Gestión** y **Proveedores** se ven bloqueadas en sidebar,
navigation rail y bottom navigation. **Plan** permanece disponible para el
cronograma. La selección directa de una sección bloqueada vuelve a `/plan`.
Tras confirmar, se habilitan en el acto para la sesión.

## Límite real del API actual

El backend actual expone sugerencias incorporables de **actividades** y
dependencias sugeridas, pero no una operación de incorporación directa desde
plantillas para hitos ni timing. Por ello la UI permite crear hitos y timing
operativos con sus endpoints reales, y solo incorpora desde plantilla aquello
que el contrato actual permite: actividades. No se simula esa capacidad ni se
modifican las plantillas.
