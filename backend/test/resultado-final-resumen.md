# Resultado final consolidado de pruebas — WeddingApp

> Documento maestro generado desde las evidencias formales E01–E09. Centraliza la trazabilidad original, no altera sus estados y mantiene separados los resultados automáticos, mixtos y manuales.

## Identificación, alcance y método

- **Fecha de consolidación:** 2026-10-26T22:33:47.159Z.
- **Fuente:** backend/test/E01-Acceso a backend/test/E09-Administracion.
- **Casos conceptuales consolidados:** 198.
- **Criterio de integridad:** una ficha por identificador CP; no se multiplican casos conceptuales por variantes.
- **Regla de estados:** PASS acredita lo registrado; FAIL conserva una brecha real; MANUAL queda pendiente, sin inferir PASS desde backend.
- **Entorno:** se preservan las precondiciones, datos y limitaciones informadas por cada evidencia fuente.

## Resumen ejecutivo global

| Métrica | Total |
|---|---:|
| Casos conceptuales | 198 |
| PASS | 34 |
| FAIL | 161 |
| MANUAL pendiente | 3 |
| Tipo AUTOMATIZADO | 161 |
| Tipo MIXTO | 32 |
| Épicas consolidadas | 9 |

## Cobertura y resultado por épica

| Épica | Nombre | Casos | PASS | FAIL | MANUAL | Automatizados | Mixtos |
|---|---|---:|---:|---:|---:|---:|---:|
| E01-Acceso | Acceso y autenticación | 24 | 10 | 11 | 3 | 19 | 2 |
| E02-Usuarios | Usuarios | 10 | 0 | 10 | 0 | 9 | 1 |
| E03-Proyecto | Proyecto | 20 | 3 | 17 | 0 | 17 | 3 |
| E04-Cronograma | Cronograma | 32 | 7 | 25 | 0 | 20 | 12 |
| E05-Presupuesto | Presupuesto | 22 | 0 | 22 | 0 | 19 | 2 |
| E06-Invitados | Invitados | 24 | 8 | 16 | 0 | 20 | 3 |
| E07-Proveedores | Proveedores | 27 | 6 | 21 | 0 | 24 | 3 |
| E08-Riesgos | Riesgos | 21 | 0 | 21 | 0 | 18 | 3 |
| E09-Administracion | Administración | 18 | 0 | 18 | 0 | 15 | 3 |

## Cobertura y resultado por historia de usuario

| Épica | HU | Casos | PASS | FAIL | MANUAL |
|---|---|---:|---:|---:|---:|
| E01-Acceso | HU01 | 4 | 3 | 1 | 0 |
| E01-Acceso | HU02 | 5 | 3 | 2 | 0 |
| E01-Acceso | HU03 | 4 | 4 | 0 | 0 |
| E01-Acceso | HU04 | 3 | 0 | 3 | 0 |
| E01-Acceso | HU05 | 3 | 0 | 2 | 1 |
| E01-Acceso | HU06 | 5 | 0 | 3 | 2 |
| E02-Usuarios | HU08 | 5 | 0 | 5 | 0 |
| E02-Usuarios | HU09 | 5 | 0 | 5 | 0 |
| E03-Proyecto | HU10 | 5 | 1 | 4 | 0 |
| E03-Proyecto | HU11 | 4 | 0 | 4 | 0 |
| E03-Proyecto | HU12 | 3 | 0 | 3 | 0 |
| E03-Proyecto | HU13 | 4 | 0 | 4 | 0 |
| E03-Proyecto | HU14 | 4 | 2 | 2 | 0 |
| E04-Cronograma | HU15 | 4 | 1 | 3 | 0 |
| E04-Cronograma | HU16 | 4 | 0 | 4 | 0 |
| E04-Cronograma | HU17 | 3 | 1 | 2 | 0 |
| E04-Cronograma | HU18 | 4 | 1 | 3 | 0 |
| E04-Cronograma | HU19 | 4 | 1 | 3 | 0 |
| E04-Cronograma | HU20 | 4 | 1 | 3 | 0 |
| E04-Cronograma | HU21 | 2 | 1 | 1 | 0 |
| E04-Cronograma | HU22 | 3 | 0 | 3 | 0 |
| E04-Cronograma | HU23 | 4 | 1 | 3 | 0 |
| E05-Presupuesto | HU24 | 3 | 0 | 3 | 0 |
| E05-Presupuesto | HU25 | 4 | 0 | 4 | 0 |
| E05-Presupuesto | HU26 | 3 | 0 | 3 | 0 |
| E05-Presupuesto | HU27 | 4 | 0 | 4 | 0 |
| E05-Presupuesto | HU28 | 4 | 0 | 4 | 0 |
| E05-Presupuesto | HU29 | 4 | 0 | 4 | 0 |
| E06-Invitados | HU30 | 4 | 3 | 1 | 0 |
| E06-Invitados | HU31 | 3 | 2 | 1 | 0 |
| E06-Invitados | HU32 | 3 | 1 | 2 | 0 |
| E06-Invitados | HU33 | 3 | 0 | 3 | 0 |
| E06-Invitados | HU34 | 3 | 0 | 3 | 0 |
| E06-Invitados | HU35 | 3 | 1 | 2 | 0 |
| E06-Invitados | HU36 | 2 | 1 | 1 | 0 |
| E06-Invitados | HU37 | 3 | 0 | 3 | 0 |
| E07-Proveedores | HU38 | 3 | 2 | 1 | 0 |
| E07-Proveedores | HU39 | 3 | 1 | 2 | 0 |
| E07-Proveedores | HU40 | 3 | 0 | 3 | 0 |
| E07-Proveedores | HU41 | 3 | 1 | 2 | 0 |
| E07-Proveedores | HU42 | 3 | 0 | 3 | 0 |
| E07-Proveedores | HU43 | 3 | 0 | 3 | 0 |
| E07-Proveedores | HU44 | 3 | 1 | 2 | 0 |
| E07-Proveedores | HU45 | 3 | 1 | 2 | 0 |
| E07-Proveedores | HU46 | 3 | 0 | 3 | 0 |
| E08-Riesgos | HU47 | 4 | 0 | 4 | 0 |
| E08-Riesgos | HU48 | 4 | 0 | 4 | 0 |
| E08-Riesgos | HU49 | 3 | 0 | 3 | 0 |
| E08-Riesgos | HU50 | 4 | 0 | 4 | 0 |
| E08-Riesgos | HU51 | 3 | 0 | 3 | 0 |
| E08-Riesgos | HU52 | 3 | 0 | 3 | 0 |
| E09-Administracion | HU53 | 4 | 0 | 4 | 0 |
| E09-Administracion | HU54 | 4 | 0 | 4 | 0 |
| E09-Administracion | HU55 | 3 | 0 | 3 | 0 |
| E09-Administracion | HU56 | 3 | 0 | 3 | 0 |
| E09-Administracion | HU57 | 4 | 0 | 4 | 0 |

## Matriz completa de trazabilidad de casos

| ID | Épica | HU | CA | Tipo | Estado | Nombre | Resultado obtenido |
|---|---|---|---|---|---|---|---|
| CP-E01-HU01-01 | E01-Acceso | HU01 | CA001, CA004, CA005 | AUTOMATIZADO | PASS | Registro exitoso de una nueva cuenta Wedding Planner | Se enviaron datos válidos de persona, empresa, usuario y contraseña. El flujo creó una cuenta PROJECT_MANAGER con correo verificado. |
| CP-E01-HU01-02 | E01-Acceso | HU01 | CA001 | AUTOMATIZADO | PASS | Validación de campos obligatorios y correo | Las cuatro variantes —nombres vacíos, apellido vacío, correo vacío y correo inválido— respondieron HTTP 400. |
| CP-E01-HU01-03 | E01-Acceso | HU01 | CA002 | AUTOMATIZADO | FAIL | Política y confirmación de contraseña | El DTO no contempla confirmación de contraseña. NestJS rechazó el campo como propiedad no permitida antes de comparar ambos valores. |
| CP-E01-HU01-04 | E01-Acceso | HU01 | CA003 | AUTOMATIZADO | PASS | Rechazo de correo previamente registrado | Tras crear la primera cuenta, una nueva solicitud con el mismo correo respondió HTTP 409. |
| CP-E01-HU02-01 | E01-Acceso | HU02 | CA006 | AUTOMATIZADO | FAIL | Generación de correo de verificación | Se capturó un correo de prueba con código numérico único de seis dígitos; no contiene enlace de verificación. |
| CP-E01-HU02-02 | E01-Acceso | HU02 | CA007 | AUTOMATIZADO | PASS | Confirmación de correo vigente | El código vigente fue confirmado y la cuenta quedó con correo verificado. |
| CP-E01-HU02-03 | E01-Acceso | HU02 | CA008 | AUTOMATIZADO | PASS | Rechazo de token inválido, usado o expirado | Los tokens inexistente, usado y expirado fueron rechazados con HTTP 400. |
| CP-E01-HU02-04 | E01-Acceso | HU02 | CA009 | AUTOMATIZADO | PASS | Bloqueo de acceso sin correo verificado | Una cuenta pendiente recibió HTTP 403 al intentar iniciar sesión. |
| CP-E01-HU02-05 | E01-Acceso | HU02 | CA010 | AUTOMATIZADO | FAIL | Control de reenvíos de verificación | Dos solicitudes consecutivas de reenvío fueron aceptadas y generaron dos mecanismos. |
| CP-E01-HU03-01 | E01-Acceso | HU03 | CA011, CA014 | AUTOMATIZADO | PASS | Inicio de sesión válido | La cuenta verificada recibió access token, refresh token y tipo PROJECT_MANAGER. |
| CP-E01-HU03-02 | E01-Acceso | HU03 | CA012 | AUTOMATIZADO | PASS | Rechazo genérico de credenciales inválidas | Contraseña incorrecta y correo inexistente devolvieron HTTP 401 con el mismo mensaje. |
| CP-E01-HU03-03 | E01-Acceso | HU03 | CA013 | AUTOMATIZADO | PASS | Bloqueo de cuenta no verificada | La cuenta pendiente recibió HTTP 403 al iniciar sesión. |
| CP-E01-HU03-04 | E01-Acceso | HU03 | CA015 | MIXTO | PASS | Renovación de sesión con refresh token | El refresh token vigente fue aceptado y se entregó un nuevo par de tokens. |
| CP-E01-HU04-01 | E01-Acceso | HU04 | CA016 | AUTOMATIZADO | FAIL | Consulta de información personal del perfil | GET /usuarios/:id devolvió datos de cuenta, pero no nombres, apellidos, correo ni teléfono. |
| CP-E01-HU04-02 | E01-Acceso | HU04 | CA017, CA019, CA020 | AUTOMATIZADO | FAIL | Actualización de datos personales y contacto | PATCH /usuarios/:id recibió los campos personales y respondió HTTP 400 porque no pertenecen al DTO. |
| CP-E01-HU04-03 | E01-Acceso | HU04 | CA018 | AUTOMATIZADO | FAIL | Validación de correo en el perfil | correoElectronico fue rechazado como propiedad no permitida antes de evaluar el formato. |
| CP-E01-HU05-01 | E01-Acceso | HU05 | CA021, CA022 | MANUAL | MANUAL | Botón y confirmación de cerrar sesión | Pendiente de ejecutar visualmente en Flutter. |
| CP-E01-HU05-02 | E01-Acceso | HU05 | CA023, CA024 | MIXTO | FAIL | Revocación de sesión al cerrar sesión | El refresh token fue revocado, pero el access token previo permitió GET /usuarios/:id con HTTP 200. |
| CP-E01-HU05-03 | E01-Acceso | HU05 | CA025 | AUTOMATIZADO | FAIL | Expiración de sesión por inactividad | No existe SESSION_INACTIVITY_TIMEOUT ni política backend de inactividad. |
| CP-E01-HU06-01 | E01-Acceso | HU06 | CA026 | AUTOMATIZADO | FAIL | Listado aislado por Wedding Planner | Con sesión WP-A se crearon borradores de WP-A y WP-B; el resumen HTTP 200 devolvió ambos. |
| CP-E01-HU06-02 | E01-Acceso | HU06 | CA027 | MANUAL | MANUAL | Selección de matrimonio activo | Pendiente de ejecutar en Flutter. |
| CP-E01-HU06-03 | E01-Acceso | HU06 | CA028 | AUTOMATIZADO | FAIL | Aislamiento de información entre Wedding Planners | La consulta autenticada como WP-A incluyó un proyecto creado por WP-B. |
| CP-E01-HU06-04 | E01-Acceso | HU06 | CA029 | MANUAL | MANUAL | Cambio de matrimonio activo | Pendiente de ejecutar en Flutter. |
| CP-E01-HU06-05 | E01-Acceso | HU06 | CA030 | AUTOMATIZADO | FAIL | Búsqueda y filtros de matrimonios | Aun enviando búsqueda y fechas, la respuesta incluyó el borrador de WP-B. |
| CP-E02-HU08-01 | E02-Usuarios | HU08 | CA036 | AUTOMATIZADO | FAIL | Incorporación de un miembro con rol operativo | La auditoría del contrato Prisma y de los módulos actuales no encontró entidades, DTOs, controladores ni endpoint para miembros, roles operativos o permisos por proyecto. |
| CP-E02-HU08-02 | E02-Usuarios | HU08 | CA037 | AUTOMATIZADO | FAIL | Invitación del nuevo miembro al proyecto | La auditoría del contrato Prisma y de los módulos actuales no encontró entidades, DTOs, controladores ni endpoint para miembros, roles operativos o permisos por proyecto. |
| CP-E02-HU08-03 | E02-Usuarios | HU08 | CA038 | AUTOMATIZADO | FAIL | Asignación de múltiples roles operativos | La auditoría del contrato Prisma y de los módulos actuales no encontró entidades, DTOs, controladores ni endpoint para miembros, roles operativos o permisos por proyecto. |
| CP-E02-HU08-04 | E02-Usuarios | HU08 | CA039 | AUTOMATIZADO | FAIL | Modificación de roles con conservación del historial | La auditoría del contrato Prisma y de los módulos actuales no encontró entidades, DTOs, controladores ni endpoint para miembros, roles operativos o permisos por proyecto. |
| CP-E02-HU08-05 | E02-Usuarios | HU08 | CA040 | AUTOMATIZADO | FAIL | Inhabilitación de un colaborador | La auditoría del contrato Prisma y de los módulos actuales no encontró entidades, DTOs, controladores ni endpoint para miembros, roles operativos o permisos por proyecto. |
| CP-E02-HU09-01 | E02-Usuarios | HU09 | CA041 | AUTOMATIZADO | FAIL | Acceso inicial según tipo de usuario | La auditoría del contrato Prisma y de los módulos actuales no encontró entidades, DTOs, controladores ni endpoint para miembros, roles operativos o permisos por proyecto. |
| CP-E02-HU09-02 | E02-Usuarios | HU09 | CA042 | AUTOMATIZADO | FAIL | Configuración de permisos de consulta y modificación | La auditoría del contrato Prisma y de los módulos actuales no encontró entidades, DTOs, controladores ni endpoint para miembros, roles operativos o permisos por proyecto. |
| CP-E02-HU09-03 | E02-Usuarios | HU09 | CA043 | AUTOMATIZADO | FAIL | Bloqueo de operaciones sin autorización | La auditoría del contrato Prisma y de los módulos actuales no encontró entidades, DTOs, controladores ni endpoint para miembros, roles operativos o permisos por proyecto. |
| CP-E02-HU09-04 | E02-Usuarios | HU09 | CA044 | AUTOMATIZADO | FAIL | Independencia de permisos entre matrimonios | La auditoría del contrato Prisma y de los módulos actuales no encontró entidades, DTOs, controladores ni endpoint para miembros, roles operativos o permisos por proyecto. |
| CP-E02-HU09-05 | E02-Usuarios | HU09 | CA045 | MIXTO | FAIL | Visualización según permisos y asignaciones vigentes | La auditoría del contrato Prisma y de los módulos actuales no encontró entidades, DTOs, controladores ni endpoint para miembros, roles operativos o permisos por proyecto. |
| CP-E03-HU10-01 | E03-Proyecto | HU10 | CA046, CA047 | AUTOMATIZADO | FAIL | Registro válido de parámetros base y preparación temporal | La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado. |
| CP-E03-HU10-02 | E03-Proyecto | HU10 | CA046 | AUTOMATIZADO | FAIL | Validación de parámetros base obligatorios | La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado. |
| CP-E03-HU10-03 | E03-Proyecto | HU10 | CA048 | AUTOMATIZADO | PASS | Generación del cronograma desde plantilla | La lógica existente respondió conforme al criterio técnico evaluado. |
| CP-E03-HU10-04 | E03-Proyecto | HU10 | CA049 | AUTOMATIZADO | FAIL | Asociación del estilo al matrimonio | La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado. |
| CP-E03-HU10-05 | E03-Proyecto | HU10 | CA050 | MIXTO | FAIL | Confirmación previa para cambios sensibles | La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado. |
| CP-E03-HU11-01 | E03-Proyecto | HU11 | CA051, CA052 | AUTOMATIZADO | FAIL | Cálculo del avance y resumen de actividades | La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado. |
| CP-E03-HU11-02 | E03-Proyecto | HU11 | CA053 | AUTOMATIZADO | FAIL | Indicadores de confirmación de invitados | La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado. |
| CP-E03-HU11-03 | E03-Proyecto | HU11 | CA054 | AUTOMATIZADO | FAIL | Resumen financiero y detección de excedente | La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado. |
| CP-E03-HU11-04 | E03-Proyecto | HU11 | CA055 | MIXTO | FAIL | Actualización y permisos del dashboard | La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado. |
| CP-E03-HU12-01 | E03-Proyecto | HU12 | CA056, CA060 | AUTOMATIZADO | FAIL | Consulta del catálogo vigente de buenas prácticas | La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado. |
| CP-E03-HU12-02 | E03-Proyecto | HU12 | CA057, CA058 | AUTOMATIZADO | FAIL | Contenido contextual y referencia metodológica | La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado. |
| CP-E03-HU12-03 | E03-Proyecto | HU12 | CA059 | AUTOMATIZADO | FAIL | Aplicación práctica de una buena práctica | La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado. |
| CP-E03-HU13-01 | E03-Proyecto | HU13 | CA061, CA062 | MIXTO | FAIL | Navegación manteniendo el contexto del matrimonio | La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado. |
| CP-E03-HU13-02 | E03-Proyecto | HU13 | CA063 | AUTOMATIZADO | FAIL | Actualización de indicadores por cambios en módulos | La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado. |
| CP-E03-HU13-03 | E03-Proyecto | HU13 | CA064 | AUTOMATIZADO | FAIL | Reutilización de información compartida | La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado. |
| CP-E03-HU13-04 | E03-Proyecto | HU13 | CA065 | AUTOMATIZADO | FAIL | Permisos sobre módulos e información integrada | La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado. |
| CP-E03-HU14-01 | E03-Proyecto | HU14 | CA066 | AUTOMATIZADO | PASS | Identificación de la etapa actual | La lógica existente respondió conforme al criterio técnico evaluado. |
| CP-E03-HU14-02 | E03-Proyecto | HU14 | CA067, CA068 | AUTOMATIZADO | FAIL | Acciones de la etapa y próxima acción recomendada | La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado. |
| CP-E03-HU14-03 | E03-Proyecto | HU14 | CA069 | AUTOMATIZADO | FAIL | Actualización del flujo al completar una acción | La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado. |
| CP-E03-HU14-04 | E03-Proyecto | HU14 | CA070 | AUTOMATIZADO | PASS | Flexibilidad del flujo de planificación | La lógica existente respondió conforme al criterio técnico evaluado. |
| CP-E04-HU15-01 | E04-Cronograma | HU15 | CA071, CA073 | AUTOMATIZADO | FAIL | Registro valido de actividad e incorporacion al cronograma | La capacidad requerida no existe completamente en la implementacion actual. |
| CP-E04-HU15-02 | E04-Cronograma | HU15 | CA072 | AUTOMATIZADO | FAIL | Validacion de datos obligatorios de actividad | La capacidad requerida no existe completamente en la implementacion actual. |
| CP-E04-HU15-03 | E04-Cronograma | HU15 | CA074 | AUTOMATIZADO | PASS | Edicion de una actividad existente | La capacidad backend evaluada esta disponible en la implementacion actual. |
| CP-E04-HU15-04 | E04-Cronograma | HU15 | CA075 | MIXTO | FAIL | Cambio de responsable | La capacidad requerida no existe completamente en la implementacion actual. |
| CP-E04-HU16-01 | E04-Cronograma | HU16 | CA076, CA077 | MIXTO | FAIL | Supervision centralizada por miembro | La capacidad requerida no existe completamente en la implementacion actual. |
| CP-E04-HU16-02 | E04-Cronograma | HU16 | CA078 | AUTOMATIZADO | FAIL | Calculo de avance por miembro o frente | La capacidad requerida no existe completamente en la implementacion actual. |
| CP-E04-HU16-03 | E04-Cronograma | HU16 | CA079 | MIXTO | FAIL | Actualizacion del panel tras cambios | La capacidad requerida no existe completamente en la implementacion actual. |
| CP-E04-HU16-04 | E04-Cronograma | HU16 | CA080 | MIXTO | FAIL | Identificacion de retrasadas y proximas a vencer | La capacidad requerida no existe completamente en la implementacion actual. |
| CP-E04-HU17-01 | E04-Cronograma | HU17 | CA081, CA082, CA084 | MIXTO | PASS | Consulta y filtrado de hitos | La capacidad backend evaluada esta disponible en la implementacion actual. |
| CP-E04-HU17-02 | E04-Cronograma | HU17 | CA083 | AUTOMATIZADO | FAIL | Cumplimiento automatico de un hito | La capacidad requerida no existe completamente en la implementacion actual. |
| CP-E04-HU17-03 | E04-Cronograma | HU17 | CA085 | MIXTO | FAIL | Hitos cumplidos en avance e historial | La capacidad requerida no existe completamente en la implementacion actual. |
| CP-E04-HU18-01 | E04-Cronograma | HU18 | CA086 | AUTOMATIZADO | FAIL | Configuracion de anticipaciones | La capacidad requerida no existe completamente en la implementacion actual. |
| CP-E04-HU18-02 | E04-Cronograma | HU18 | CA087, CA088 | AUTOMATIZADO | PASS | Generacion de alerta de vencimiento | La capacidad backend evaluada esta disponible en la implementacion actual. |
| CP-E04-HU18-03 | E04-Cronograma | HU18 | CA089 | MIXTO | FAIL | Acceso al detalle desde alerta | La capacidad requerida no existe completamente en la implementacion actual. |
| CP-E04-HU18-04 | E04-Cronograma | HU18 | CA090 | AUTOMATIZADO | FAIL | Supresion de alertas para actividades no vigentes | La capacidad requerida no existe completamente en la implementacion actual. |
| CP-E04-HU19-01 | E04-Cronograma | HU19 | CA091 | AUTOMATIZADO | FAIL | Reprogramacion y conservacion del valor anterior | La capacidad requerida no existe completamente en la implementacion actual. |
| CP-E04-HU19-02 | E04-Cronograma | HU19 | CA092 | AUTOMATIZADO | FAIL | Margen de seguridad | La capacidad requerida no existe completamente en la implementacion actual. |
| CP-E04-HU19-03 | E04-Cronograma | HU19 | CA093 | AUTOMATIZADO | PASS | Deteccion de conflictos por reprogramacion | La capacidad backend evaluada esta disponible en la implementacion actual. |
| CP-E04-HU19-04 | E04-Cronograma | HU19 | CA094 | MIXTO | FAIL | Impacto por cambio de fecha del matrimonio | La capacidad requerida no existe completamente en la implementacion actual. |
| CP-E04-HU20-01 | E04-Cronograma | HU20 | CA095, CA098 | AUTOMATIZADO | PASS | Cambio de estado y actualizacion del avance | La capacidad backend evaluada esta disponible en la implementacion actual. |
| CP-E04-HU20-02 | E04-Cronograma | HU20 | CA096 | AUTOMATIZADO | FAIL | Deteccion automatica de retraso | La capacidad requerida no existe completamente en la implementacion actual. |
| CP-E04-HU20-03 | E04-Cronograma | HU20 | CA097, CA102 | AUTOMATIZADO | FAIL | Bloqueo de completado por dependencia pendiente | La capacidad requerida no existe completamente en la implementacion actual. |
| CP-E04-HU20-04 | E04-Cronograma | HU20 | CA099 | MIXTO | FAIL | Autorizacion e identificacion de cambios de estado | La capacidad requerida no existe completamente en la implementacion actual. |
| CP-E04-HU21-01 | E04-Cronograma | HU21 | CA100, CA101 | AUTOMATIZADO | PASS | Creacion de dependencias y prevencion de ciclos | La capacidad backend evaluada esta disponible en la implementacion actual. |
| CP-E04-HU21-02 | E04-Cronograma | HU21 | CA103, CA104 | MIXTO | FAIL | Dependencias sugeridas y personalizables | La capacidad requerida no existe completamente en la implementacion actual. |
| CP-E04-HU22-01 | E04-Cronograma | HU22 | CA105 | AUTOMATIZADO | FAIL | Consulta de tareas sugeridas | La capacidad requerida no existe completamente en la implementacion actual. |
| CP-E04-HU22-02 | E04-Cronograma | HU22 | CA106, CA107, CA109 | MIXTO | FAIL | Seleccion y personalizacion de tareas sugeridas | La capacidad requerida no existe completamente en la implementacion actual. |
| CP-E04-HU22-03 | E04-Cronograma | HU22 | CA108 | AUTOMATIZADO | FAIL | Creacion de instancia independiente desde sugerencia | La capacidad requerida no existe completamente en la implementacion actual. |
| CP-E04-HU23-01 | E04-Cronograma | HU23 | CA110, CA111 | AUTOMATIZADO | FAIL | Registro y orden cronologico del timing | La capacidad requerida no existe completamente en la implementacion actual. |
| CP-E04-HU23-02 | E04-Cronograma | HU23 | CA112 | AUTOMATIZADO | FAIL | Deteccion de solapamientos incompatibles | La capacidad requerida no existe completamente en la implementacion actual. |
| CP-E04-HU23-03 | E04-Cronograma | HU23 | CA113 | AUTOMATIZADO | PASS | Edicion de actividad del timing | La capacidad backend evaluada esta disponible en la implementacion actual. |
| CP-E04-HU23-04 | E04-Cronograma | HU23 | CA114 | MIXTO | FAIL | Exportacion o version compartible del timing | La capacidad requerida no existe completamente en la implementacion actual. |
| CP-E05-HU24-01 | E05-Presupuesto | HU24 | CA115, CA116 | AUTOMATIZADO | FAIL | Registro de costos estimado y real con categoria financiera | No existe un modulo financiero que cubra el criterio. |
| CP-E05-HU24-02 | E05-Presupuesto | HU24 | CA117 | AUTOMATIZADO | FAIL | Validacion de montos de costo | No existe un modulo financiero que cubra el criterio. |
| CP-E05-HU24-03 | E05-Presupuesto | HU24 | CA118, CA119 | AUTOMATIZADO | FAIL | Actualizacion de costos y desviacion presupuestaria | No existe un modulo financiero que cubra el criterio. |
| CP-E05-HU25-01 | E05-Presupuesto | HU25 | CA120, CA121 | AUTOMATIZADO | FAIL | Registro de pago y recalculo de saldo pendiente | No existe un modulo financiero que cubra el criterio. |
| CP-E05-HU25-02 | E05-Presupuesto | HU25 | CA122 | AUTOMATIZADO | FAIL | Validacion del monto de pago | No existe un modulo financiero que cubra el criterio. |
| CP-E05-HU25-03 | E05-Presupuesto | HU25 | CA123 | AUTOMATIZADO | FAIL | Comprobante asociado al pago | No existe un modulo financiero que cubra el criterio. |
| CP-E05-HU25-04 | E05-Presupuesto | HU25 | CA124 | AUTOMATIZADO | FAIL | Seguimiento de compromisos pendientes y vencidos | No existe un modulo financiero que cubra el criterio. |
| CP-E05-HU26-01 | E05-Presupuesto | HU26 | CA125, CA126 | AUTOMATIZADO | FAIL | Calculo del desglose porcentual por categoria | No existe un modulo financiero que cubra el criterio. |
| CP-E05-HU26-02 | E05-Presupuesto | HU26 | CA127 | AUTOMATIZADO | FAIL | Actualizacion del desglose porcentual | No existe un modulo financiero que cubra el criterio. |
| CP-E05-HU26-03 | E05-Presupuesto | HU26 | CA128 | MANUAL | FAIL | Representacion visual del desglose presupuestario | No existe un modulo financiero que cubra el criterio. |
| CP-E05-HU27-01 | E05-Presupuesto | HU27 | CA129, CA130 | AUTOMATIZADO | FAIL | Alerta de sobrepresupuesto por categoria | No existe un modulo financiero que cubra el criterio. |
| CP-E05-HU27-02 | E05-Presupuesto | HU27 | CA131 | AUTOMATIZADO | FAIL | Alerta de desbalance global | No existe un modulo financiero que cubra el criterio. |
| CP-E05-HU27-03 | E05-Presupuesto | HU27 | CA132 | AUTOMATIZADO | FAIL | Actualizacion de alertas financieras | No existe un modulo financiero que cubra el criterio. |
| CP-E05-HU27-04 | E05-Presupuesto | HU27 | CA133 | MIXTO | FAIL | Acceso desde alerta al detalle financiero | No existe un modulo financiero que cubra el criterio. |
| CP-E05-HU28-01 | E05-Presupuesto | HU28 | CA134, CA137 | AUTOMATIZADO | FAIL | Generacion de reporte financiero consolidado | No existe un modulo financiero que cubra el criterio. |
| CP-E05-HU28-02 | E05-Presupuesto | HU28 | CA135 | AUTOMATIZADO | FAIL | Filtrado del reporte financiero | No existe un modulo financiero que cubra el criterio. |
| CP-E05-HU28-03 | E05-Presupuesto | HU28 | CA136 | MIXTO | FAIL | Exportacion consistente en PDF y CSV | No existe un modulo financiero que cubra el criterio. |
| CP-E05-HU28-04 | E05-Presupuesto | HU28 | CA138 | AUTOMATIZADO | FAIL | Reporte sin datos coincidentes | No existe un modulo financiero que cubra el criterio. |
| CP-E05-HU29-01 | E05-Presupuesto | HU29 | CA139, CA140 | AUTOMATIZADO | FAIL | Incorporacion automatica de contratacion al presupuesto | No existe un modulo financiero que cubra el criterio. |
| CP-E05-HU29-02 | E05-Presupuesto | HU29 | CA141 | AUTOMATIZADO | FAIL | Vinculacion contratacion-gasto sin duplicidad | No existe un modulo financiero que cubra el criterio. |
| CP-E05-HU29-03 | E05-Presupuesto | HU29 | CA142 | AUTOMATIZADO | FAIL | Sincronizacion al modificar monto contratado | No existe un modulo financiero que cubra el criterio. |
| CP-E05-HU29-04 | E05-Presupuesto | HU29 | CA143 | AUTOMATIZADO | FAIL | Recalculo financiero posterior a contratacion | No existe un modulo financiero que cubra el criterio. |
| CP-E06-HU30-01 | E06-Invitados | HU30 | CA144 | AUTOMATIZADO | PASS | Registro y consulta de invitado | La capacidad evaluada existe en Invitados. |
| CP-E06-HU30-02 | E06-Invitados | HU30 | CA145 | AUTOMATIZADO | FAIL | Validación de datos del invitado | La capacidad no está implementada completamente. |
| CP-E06-HU30-03 | E06-Invitados | HU30 | CA146 | AUTOMATIZADO | PASS | Edición de invitado | La capacidad evaluada existe en Invitados. |
| CP-E06-HU30-04 | E06-Invitados | HU30 | CA147 | AUTOMATIZADO | PASS | Retiro del invitado y actualización del total | La capacidad evaluada existe en Invitados. |
| CP-E06-HU31-01 | E06-Invitados | HU31 | CA148 | AUTOMATIZADO | PASS | Clasificación y filtrado por relación | La capacidad evaluada existe en Invitados. |
| CP-E06-HU31-02 | E06-Invitados | HU31 | CA149 | AUTOMATIZADO | PASS | Cambio y retiro del filtro | La capacidad evaluada existe en Invitados. |
| CP-E06-HU31-03 | E06-Invitados | HU31 | CA150 | AUTOMATIZADO | FAIL | Filtrado por colaborador autorizado | La capacidad no está implementada completamente. |
| CP-E06-HU32-01 | E06-Invitados | HU32 | CA151 | AUTOMATIZADO | PASS | Gestión de requerimientos alimentarios | La capacidad evaluada existe en Invitados. |
| CP-E06-HU32-02 | E06-Invitados | HU32 | CA152 | AUTOMATIZADO | FAIL | Filtro y resumen por requerimiento alimentario | La capacidad no está implementada completamente. |
| CP-E06-HU32-03 | E06-Invitados | HU32 | CA153 | AUTOMATIZADO | FAIL | Exportación del listado alimentario | La capacidad no está implementada completamente. |
| CP-E06-HU33-01 | E06-Invitados | HU33 | CA154 | AUTOMATIZADO | FAIL | Asignación y consulta por mesa | La capacidad no está implementada completamente. |
| CP-E06-HU33-02 | E06-Invitados | HU33 | CA155 | AUTOMATIZADO | FAIL | Reasignación de mesa sin duplicidad | La capacidad no está implementada completamente. |
| CP-E06-HU33-03 | E06-Invitados | HU33 | CA156 | MANUAL | FAIL | Representación gráfica de mesas | La capacidad no está implementada completamente. |
| CP-E06-HU34-01 | E06-Invitados | HU34 | CA157 | AUTOMATIZADO | FAIL | Cálculo de asistencia confirmada | La capacidad no está implementada completamente. |
| CP-E06-HU34-02 | E06-Invitados | HU34 | CA158 | AUTOMATIZADO | FAIL | Pendientes de respuesta y actualización estadística | La capacidad no está implementada completamente. |
| CP-E06-HU34-03 | E06-Invitados | HU34 | CA159 | AUTOMATIZADO | FAIL | Permisos sobre estadísticas de invitados | La capacidad no está implementada completamente. |
| CP-E06-HU35-01 | E06-Invitados | HU35 | CA160 | AUTOMATIZADO | PASS | Gestión y actualización del RSVP | La capacidad evaluada existe en Invitados. |
| CP-E06-HU35-02 | E06-Invitados | HU35 | CA161 | AUTOMATIZADO | FAIL | Fechas de seguimiento RSVP | La capacidad no está implementada completamente. |
| CP-E06-HU35-03 | E06-Invitados | HU35 | CA162 | AUTOMATIZADO | FAIL | Recordatorios únicamente para RSVP pendientes | La capacidad no está implementada completamente. |
| CP-E06-HU36-01 | E06-Invitados | HU36 | CA163 | AUTOMATIZADO | PASS | Ordenamiento alfabético combinado con filtros | La capacidad evaluada existe en Invitados. |
| CP-E06-HU36-02 | E06-Invitados | HU36 | CA164 | AUTOMATIZADO | FAIL | Persistencia de la preferencia de ordenamiento | La capacidad no está implementada completamente. |
| CP-E06-HU37-01 | E06-Invitados | HU37 | CA165 | MIXTO | FAIL | Generación y envío de invitación digital | La capacidad no está implementada completamente. |
| CP-E06-HU37-02 | E06-Invitados | HU37 | CA166 | MIXTO | FAIL | Registro de interacción sin alterar automáticamente RSVP | La capacidad no está implementada completamente. |
| CP-E06-HU37-03 | E06-Invitados | HU37 | CA167 | MIXTO | FAIL | Notificación a Wedding Planner por interacción | La capacidad no está implementada completamente. |
| CP-E07-HU38-01 | E07-Proveedores | HU38 | CA182, CA183 | AUTOMATIZADO | FAIL | Búsqueda y filtrado de proveedores | Funcionalidad no implementada: filtros-precio-ubicacion. |
| CP-E07-HU38-02 | E07-Proveedores | HU38 | CA184, CA185 | AUTOMATIZADO | PASS | Consulta resumida y perfil del proveedor | La capacidad existe en el módulo Proveedores. |
| CP-E07-HU38-03 | E07-Proveedores | HU38 | CA186 | AUTOMATIZADO | PASS | Consulta de proveedores contratados del matrimonio | La capacidad existe en el módulo Proveedores. |
| CP-E07-HU39-01 | E07-Proveedores | HU39 | CA187, CA188 | AUTOMATIZADO | FAIL | Gestión del límite de favoritos por categoría | Funcionalidad no implementada: limite-favoritos. |
| CP-E07-HU39-02 | E07-Proveedores | HU39 | CA189, CA191 | AUTOMATIZADO | PASS | Retiro y reemplazo de favoritos | La capacidad existe en el módulo Proveedores. |
| CP-E07-HU39-03 | E07-Proveedores | HU39 | CA190 | MIXTO | FAIL | Comparación de proveedores favoritos | Funcionalidad no implementada: comparacion. |
| CP-E07-HU40-01 | E07-Proveedores | HU40 | CA192, CA193 | AUTOMATIZADO | FAIL | Checklist operativo por proveedor | Funcionalidad no implementada: checklist-proveedor. |
| CP-E07-HU40-02 | E07-Proveedores | HU40 | CA194, CA195 | AUTOMATIZADO | FAIL | Registro de incidencia del proveedor | Funcionalidad no implementada: checklist-proveedor. |
| CP-E07-HU40-03 | E07-Proveedores | HU40 | CA196 | AUTOMATIZADO | FAIL | Actualización compartida del seguimiento | Funcionalidad no implementada: checklist-proveedor. |
| CP-E07-HU41-01 | E07-Proveedores | HU41 | CA197, CA198 | AUTOMATIZADO | PASS | Consulta de disponibilidad del proveedor | La capacidad existe en el módulo Proveedores. |
| CP-E07-HU41-02 | E07-Proveedores | HU41 | CA199 | AUTOMATIZADO | FAIL | Solicitud de reserva | Funcionalidad no implementada: reserva. |
| CP-E07-HU41-03 | E07-Proveedores | HU41 | CA200, CA201 | MIXTO | FAIL | Actualización de disponibilidad y acceso externo | Funcionalidad no implementada: acceso-externo. |
| CP-E07-HU42-01 | E07-Proveedores | HU42 | CA202, CA203 | AUTOMATIZADO | FAIL | Registro de calificación y reseña | Funcionalidad no implementada: evaluaciones. |
| CP-E07-HU42-02 | E07-Proveedores | HU42 | CA204 | AUTOMATIZADO | FAIL | Modificación de evaluación vigente | Funcionalidad no implementada: evaluaciones. |
| CP-E07-HU42-03 | E07-Proveedores | HU42 | CA205, CA206 | AUTOMATIZADO | FAIL | Promedio de calificaciones | Funcionalidad no implementada: evaluaciones. |
| CP-E07-HU43-01 | E07-Proveedores | HU43 | CA207, CA208 | AUTOMATIZADO | FAIL | Plan de pagos y agenda cronológica | Funcionalidad no implementada: pagos-proveedor. |
| CP-E07-HU43-02 | E07-Proveedores | HU43 | CA209 | AUTOMATIZADO | FAIL | Recordatorios de cuotas | Funcionalidad no implementada: pagos-proveedor. |
| CP-E07-HU43-03 | E07-Proveedores | HU43 | CA210, CA211 | AUTOMATIZADO | FAIL | Pago de cuota y vencimiento | Funcionalidad no implementada: pagos-proveedor. |
| CP-E07-HU44-01 | E07-Proveedores | HU44 | CA212, CA213 | AUTOMATIZADO | PASS | Registro y actualización manual de proveedor | La capacidad existe en el módulo Proveedores. |
| CP-E07-HU44-02 | E07-Proveedores | HU44 | CA214, CA215 | AUTOMATIZADO | FAIL | Enlace externo para completar información | Funcionalidad no implementada: enlace-externo. |
| CP-E07-HU44-03 | E07-Proveedores | HU44 | CA216 | MIXTO | FAIL | Documentos y retiro conservando historial | Funcionalidad no implementada: documentos. |
| CP-E07-HU45-01 | E07-Proveedores | HU45 | CA217, CA218 | AUTOMATIZADO | PASS | Asignación y modificación de prioridad | La capacidad existe en el módulo Proveedores. |
| CP-E07-HU45-02 | E07-Proveedores | HU45 | CA219, CA220 | AUTOMATIZADO | FAIL | Ordenamiento y sugerencias por prioridad | Funcionalidad no implementada: recomendaciones. |
| CP-E07-HU45-03 | E07-Proveedores | HU45 | CA221 | AUTOMATIZADO | FAIL | Actualización de recomendaciones al contratar | Funcionalidad no implementada: recomendaciones. |
| CP-E07-HU46-01 | E07-Proveedores | HU46 | CA222, CA223 | AUTOMATIZADO | FAIL | Registro de interacción y cálculo del tiempo de respuesta | Funcionalidad no implementada: tiempo-respuesta. |
| CP-E07-HU46-02 | E07-Proveedores | HU46 | CA224, CA225 | AUTOMATIZADO | FAIL | Historial y promedio de respuesta | Funcionalidad no implementada: tiempo-respuesta. |
| CP-E07-HU46-03 | E07-Proveedores | HU46 | CA226 | AUTOMATIZADO | FAIL | Consulta y comparación por tiempo de respuesta | Funcionalidad no implementada: tiempo-respuesta. |
| CP-E08-HU47-01 | E08-Riesgos | HU47 | CA227, CA228 | AUTOMATIZADO | FAIL | Registro de planes de contingencia con alternativas | Funcionalidad no implementada: planes de contingencia; RiesgosModule no registra servicios, controladores ni modelos de riesgos. |
| CP-E08-HU47-02 | E08-Riesgos | HU47 | CA229 | MIXTO | FAIL | Consulta de planes desde el riesgo | Funcionalidad no implementada: consulta de planes; RiesgosModule no registra servicios, controladores ni modelos de riesgos. |
| CP-E08-HU47-03 | E08-Riesgos | HU47 | CA230 | AUTOMATIZADO | FAIL | Activación de plan de contingencia | Funcionalidad no implementada: activación de contingencia; RiesgosModule no registra servicios, controladores ni modelos de riesgos. |
| CP-E08-HU47-04 | E08-Riesgos | HU47 | CA231 | AUTOMATIZADO | FAIL | Historial y versionado de planes | Funcionalidad no implementada: historial de planes; RiesgosModule no registra servicios, controladores ni modelos de riesgos. |
| CP-E08-HU48-01 | E08-Riesgos | HU48 | CA232, CA233 | AUTOMATIZADO | FAIL | Consulta del catálogo base de riesgos | Funcionalidad no implementada: catálogo de riesgos; RiesgosModule no registra servicios, controladores ni modelos de riesgos. |
| CP-E08-HU48-02 | E08-Riesgos | HU48 | CA234 | AUTOMATIZADO | FAIL | Búsqueda y filtrado de riesgos | Funcionalidad no implementada: filtros de riesgos; RiesgosModule no registra servicios, controladores ni modelos de riesgos. |
| CP-E08-HU48-03 | E08-Riesgos | HU48 | CA235 | AUTOMATIZADO | FAIL | Consulta de mitigaciones y planes predefinidos | Funcionalidad no implementada: mitigaciones predefinidas; RiesgosModule no registra servicios, controladores ni modelos de riesgos. |
| CP-E08-HU48-04 | E08-Riesgos | HU48 | CA236 | AUTOMATIZADO | FAIL | Incorporación de riesgo desde catálogo | Funcionalidad no implementada: instancia operacional independiente; RiesgosModule no registra servicios, controladores ni modelos de riesgos. |
| CP-E08-HU49-01 | E08-Riesgos | HU49 | CA237, CA238 | AUTOMATIZADO | FAIL | Generación de alerta por riesgo crítico o incidencia | Funcionalidad no implementada: alertas de riesgos; RiesgosModule no registra servicios, controladores ni modelos de riesgos. |
| CP-E08-HU49-02 | E08-Riesgos | HU49 | CA239, CA240 | MIXTO | FAIL | Acceso desde alerta a riesgo y acciones de respuesta | Funcionalidad no implementada: referencias de alerta; RiesgosModule no registra servicios, controladores ni modelos de riesgos. |
| CP-E08-HU49-03 | E08-Riesgos | HU49 | CA241 | AUTOMATIZADO | FAIL | Estado de atención de la alerta | Funcionalidad no implementada: estado de alerta de riesgo; RiesgosModule no registra servicios, controladores ni modelos de riesgos. |
| CP-E08-HU50-01 | E08-Riesgos | HU50 | CA242 | AUTOMATIZADO | FAIL | Registro de gasto extraordinario | Funcionalidad no implementada: gastos de riesgo; RiesgosModule no registra servicios, controladores ni modelos de riesgos. |
| CP-E08-HU50-02 | E08-Riesgos | HU50 | CA243 | AUTOMATIZADO | FAIL | Comprobante asociado a gasto de riesgo | Funcionalidad no implementada: comprobantes de riesgo; RiesgosModule no registra servicios, controladores ni modelos de riesgos. |
| CP-E08-HU50-03 | E08-Riesgos | HU50 | CA244, CA245 | AUTOMATIZADO | FAIL | Impacto financiero de los gastos de riesgo | Funcionalidad no implementada: integración financiera de riesgos; RiesgosModule no registra servicios, controladores ni modelos de riesgos. |
| CP-E08-HU50-04 | E08-Riesgos | HU50 | CA246 | AUTOMATIZADO | FAIL | Inclusión de gastos de riesgo en reportes | Funcionalidad no implementada: reportes financieros de riesgos; RiesgosModule no registra servicios, controladores ni modelos de riesgos. |
| CP-E08-HU51-01 | E08-Riesgos | HU51 | CA247, CA248 | AUTOMATIZADO | FAIL | Evaluación y cálculo automático de severidad | Funcionalidad no implementada: matriz de severidad; RiesgosModule no registra servicios, controladores ni modelos de riesgos. |
| CP-E08-HU51-02 | E08-Riesgos | HU51 | CA249, CA250 | MIXTO | FAIL | Matriz y consulta por severidad | Funcionalidad no implementada: consulta por severidad; RiesgosModule no registra servicios, controladores ni modelos de riesgos. |
| CP-E08-HU51-03 | E08-Riesgos | HU51 | CA251 | AUTOMATIZADO | FAIL | Recálculo de severidad | Funcionalidad no implementada: recálculo de severidad; RiesgosModule no registra servicios, controladores ni modelos de riesgos. |
| CP-E08-HU52-01 | E08-Riesgos | HU52 | CA252, CA253 | AUTOMATIZADO | FAIL | Sugerencia automática de medidas de mitigación | Funcionalidad no implementada: sugerencias de mitigación; RiesgosModule no registra servicios, controladores ni modelos de riesgos. |
| CP-E08-HU52-02 | E08-Riesgos | HU52 | CA254, CA255 | AUTOMATIZADO | FAIL | Vinculación y estado de medidas/protocolos | Funcionalidad no implementada: estados de mitigación; RiesgosModule no registra servicios, controladores ni modelos de riesgos. |
| CP-E08-HU52-03 | E08-Riesgos | HU52 | CA256 | AUTOMATIZADO | FAIL | Recálculo de sugerencias conservando historial | Funcionalidad no implementada: historial de sugerencias; RiesgosModule no registra servicios, controladores ni modelos de riesgos. |
| CP-E09-HU53-01 | E09-Administracion | HU53 | CA257, CA259 | AUTOMATIZADO | FAIL | Consulta, búsqueda y filtrado de Wedding Planners | Funcionalidad no implementada: gestión administrativa de Wedding Planners; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo. |
| CP-E09-HU53-02 | E09-Administracion | HU53 | CA258 | AUTOMATIZADO | FAIL | Creación y actualización administrativa de Wedding Planner | Funcionalidad no implementada: alta administrativa de Wedding Planner; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo. |
| CP-E09-HU53-03 | E09-Administracion | HU53 | CA260 | AUTOMATIZADO | FAIL | Métricas de uso de Wedding Planner | Funcionalidad no implementada: métricas administrativas; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo. |
| CP-E09-HU53-04 | E09-Administracion | HU53 | CA261 | MIXTO | FAIL | Eliminación condicionada por historial | Funcionalidad no implementada: eliminación condicionada; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo. |
| CP-E09-HU54-01 | E09-Administracion | HU54 | CA262 | AUTOMATIZADO | FAIL | Registro y cálculo de inactividad | Funcionalidad no implementada: política de inactividad; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo. |
| CP-E09-HU54-02 | E09-Administracion | HU54 | CA263 | AUTOMATIZADO | FAIL | Alerta previa por inactividad | Funcionalidad no implementada: alerta previa de inactividad; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo. |
| CP-E09-HU54-03 | E09-Administracion | HU54 | CA264 | AUTOMATIZADO | FAIL | Desactivación automática por inactividad | Funcionalidad no implementada: scheduler de inactividad; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo. |
| CP-E09-HU54-04 | E09-Administracion | HU54 | CA265, CA266 | MIXTO | FAIL | Desactivación manual conservando historial | Funcionalidad no implementada: suspensión administrativa auditada; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo. |
| CP-E09-HU55-01 | E09-Administracion | HU55 | CA267 | AUTOMATIZADO | FAIL | Consulta de cuentas desactivadas | Funcionalidad no implementada: listado administrativo de suspendidas; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo. |
| CP-E09-HU55-02 | E09-Administracion | HU55 | CA268, CA269 | MIXTO | FAIL | Reactivación y recuperación de acceso | Funcionalidad no implementada: reactivación administrativa; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo. |
| CP-E09-HU55-03 | E09-Administracion | HU55 | CA270 | AUTOMATIZADO | FAIL | Conservación y auditoría de reactivación | Funcionalidad no implementada: auditoría de reactivación; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo. |
| CP-E09-HU56-01 | E09-Administracion | HU56 | CA271, CA272 | AUTOMATIZADO | FAIL | Registro y actualización de elemento del catálogo | Funcionalidad no implementada: catálogo global administrativo; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo. |
| CP-E09-HU56-02 | E09-Administracion | HU56 | CA273 | AUTOMATIZADO | FAIL | Desactivación sin afectar proyectos existentes | Funcionalidad no implementada: desactivación de catálogo; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo. |
| CP-E09-HU56-03 | E09-Administracion | HU56 | CA274 | AUTOMATIZADO | FAIL | Versionado del catálogo global | Funcionalidad no implementada: versionado de catálogo; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo. |
| CP-E09-HU57-01 | E09-Administracion | HU57 | CA275 | AUTOMATIZADO | FAIL | Registro de reporte de soporte | Funcionalidad no implementada: reportes de soporte; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo. |
| CP-E09-HU57-02 | E09-Administracion | HU57 | CA276 | AUTOMATIZADO | FAIL | Consulta y filtrado de reportes | Funcionalidad no implementada: bandeja de soporte; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo. |
| CP-E09-HU57-03 | E09-Administracion | HU57 | CA277 | AUTOMATIZADO | FAIL | Actualización del estado de soporte | Funcionalidad no implementada: estados de soporte; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo. |
| CP-E09-HU57-04 | E09-Administracion | HU57 | CA278, CA279 | AUTOMATIZADO | FAIL | Respuesta, notificación e historial de soporte | Funcionalidad no implementada: respuesta e historial de soporte; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo. |

## Detalle integral por caso

### CP-E01-HU01-01 — Registro exitoso de una nueva cuenta Wedding Planner

- **Épica:** E01-Acceso — Acceso y autenticación.
- **Historia de usuario asociada:** HU01.
- **Criterios de aceptación asociados:** CA001, CA004, CA005.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** PASS.
- **Objetivo:** Registrar cuenta Wedding Planner válida.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Base de pruebas vacía y catálogos base cargados.
- **Datos de prueba:** Solicitudes sintéticas de registro; CP02 usa nombre, apellido y correo vacíos, y correo inválido
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E01-Acceso; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** POST /api/v1/auth/registro/*
- **Pasos ejecutados:** Se ejecutaron las acciones del caso.
- **Resultado esperado:** Crear la cuenta Wedding Planner, asociarla a su persona y permitir continuar al acceso.
- **Resultado obtenido:** Se enviaron datos válidos de persona, empresa, usuario y contraseña. El flujo creó una cuenta PROJECT_MANAGER con correo verificado.
- **Interpretación:** La cuenta Wedding Planner quedó disponible para autenticación.
- **Evidencia directa:** Ver resultados automáticos de la HU.
- **Observaciones:** —
- **Detalle técnico:** Sin mensajes técnicos adicionales; revisar la evidencia de la épica.
- **Clasificación del hallazgo:** Criterio acreditado por la ejecución o auditoría registrada.
- **Trazabilidad de archivos:** test/E01-Acceso/evidencias/casos-prueba.json; test/E01-Acceso/evidencias/resultado.md; test/E01-Acceso/resultado-final.md.

### CP-E01-HU01-02 — Validación de campos obligatorios y correo

- **Épica:** E01-Acceso — Acceso y autenticación.
- **Historia de usuario asociada:** HU01.
- **Criterios de aceptación asociados:** CA001.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** PASS.
- **Objetivo:** Rechazar obligatorios o correo inválido.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Base de pruebas vacía y catálogos base cargados.
- **Datos de prueba:** Solicitudes sintéticas de registro; CP02 usa nombre, apellido y correo vacíos, y correo inválido
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E01-Acceso; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** POST /api/v1/auth/registro/solicitar
- **Pasos ejecutados:** Se ejecutaron las acciones del caso. Variantes: nombres vacío, apellido vacío, correo vacío, correo inválido.
- **Resultado esperado:** Rechazar cada campo obligatorio vacío y un correo con formato inválido.
- **Resultado obtenido:** Las cuatro variantes —nombres vacíos, apellido vacío, correo vacío y correo inválido— respondieron HTTP 400.
- **Interpretación:** La API aplicó las validaciones requeridas.
- **Evidencia directa:** Ver resultados automáticos de la HU.
- **Observaciones:** —
- **Detalle técnico:** Sin mensajes técnicos adicionales; revisar la evidencia de la épica.
- **Clasificación del hallazgo:** Criterio acreditado por la ejecución o auditoría registrada.
- **Trazabilidad de archivos:** test/E01-Acceso/evidencias/casos-prueba.json; test/E01-Acceso/evidencias/resultado.md; test/E01-Acceso/resultado-final.md.

### CP-E01-HU01-03 — Política y confirmación de contraseña

- **Épica:** E01-Acceso — Acceso y autenticación.
- **Historia de usuario asociada:** HU01.
- **Criterios de aceptación asociados:** CA002.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Validar política y confirmación de contraseña.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Base de pruebas vacía y catálogos base cargados.
- **Datos de prueba:** Solicitudes sintéticas de registro; CP02 usa nombre, apellido y correo vacíos, y correo inválido
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E01-Acceso; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** POST /api/v1/auth/registro/finalizar
- **Pasos ejecutados:** Se ejecutaron las acciones del caso.
- **Resultado esperado:** Comprobar política de contraseña y que contraseña y confirmación coincidan.
- **Resultado obtenido:** El DTO no contempla confirmación de contraseña. NestJS rechazó el campo como propiedad no permitida antes de comparar ambos valores.
- **Interpretación:** Hay rechazo HTTP, pero no por la regla CA002 de coincidencia.
- **Evidencia directa:** Ver detalle técnico de fallos.
- **Observaciones:** —
- **Detalle técnico:** Sin mensajes técnicos adicionales; revisar la evidencia de la épica.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E01-Acceso/evidencias/casos-prueba.json; test/E01-Acceso/evidencias/resultado.md; test/E01-Acceso/resultado-final.md.

### CP-E01-HU01-04 — Rechazo de correo previamente registrado

- **Épica:** E01-Acceso — Acceso y autenticación.
- **Historia de usuario asociada:** HU01.
- **Criterios de aceptación asociados:** CA003.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** PASS.
- **Objetivo:** Rechazar correo duplicado.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Base de pruebas vacía y catálogos base cargados.
- **Datos de prueba:** Solicitudes sintéticas de registro; CP02 usa nombre, apellido y correo vacíos, y correo inválido
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E01-Acceso; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** POST /api/v1/auth/registro/solicitar
- **Pasos ejecutados:** Se ejecutaron las acciones del caso.
- **Resultado esperado:** No crear una segunda cuenta con el mismo correo.
- **Resultado obtenido:** Tras crear la primera cuenta, una nueva solicitud con el mismo correo respondió HTTP 409.
- **Interpretación:** El correo no pudo reutilizarse.
- **Evidencia directa:** Ver resultados automáticos de la HU.
- **Observaciones:** —
- **Detalle técnico:** Sin mensajes técnicos adicionales; revisar la evidencia de la épica.
- **Clasificación del hallazgo:** Criterio acreditado por la ejecución o auditoría registrada.
- **Trazabilidad de archivos:** test/E01-Acceso/evidencias/casos-prueba.json; test/E01-Acceso/evidencias/resultado.md; test/E01-Acceso/resultado-final.md.

### CP-E01-HU02-01 — Generación de correo de verificación

- **Épica:** E01-Acceso — Acceso y autenticación.
- **Historia de usuario asociada:** HU02.
- **Criterios de aceptación asociados:** CA006.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Generar verificación de correo.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Base de pruebas vacía y catálogos base cargados.
- **Datos de prueba:** Cuenta pendiente sintética, token/código capturado y solicitudes de verificación
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E01-Acceso; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** POST /api/v1/auth/registro/solicitar
- **Pasos ejecutados:** Se ejecutaron las acciones del caso.
- **Resultado esperado:** Enviar un correo que contenga un enlace único de verificación.
- **Resultado obtenido:** Se capturó un correo de prueba con código numérico único de seis dígitos; no contiene enlace de verificación.
- **Interpretación:** CA006 exige enlace único; el mecanismo actual no lo cumple literalmente.
- **Evidencia directa:** Ver detalle técnico de fallos.
- **Observaciones:** —
- **Detalle técnico:** Sin mensajes técnicos adicionales; revisar la evidencia de la épica.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E01-Acceso/evidencias/casos-prueba.json; test/E01-Acceso/evidencias/resultado.md; test/E01-Acceso/resultado-final.md.

### CP-E01-HU02-02 — Confirmación de correo vigente

- **Épica:** E01-Acceso — Acceso y autenticación.
- **Historia de usuario asociada:** HU02.
- **Criterios de aceptación asociados:** CA007.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** PASS.
- **Objetivo:** Confirmar verificación vigente.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Base de pruebas vacía y catálogos base cargados.
- **Datos de prueba:** Cuenta pendiente sintética, token/código capturado y solicitudes de verificación
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E01-Acceso; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** POST /api/v1/auth/registro/confirmar
- **Pasos ejecutados:** Se ejecutaron las acciones del caso.
- **Resultado esperado:** Confirmar una cuenta mediante un mecanismo vigente.
- **Resultado obtenido:** El código vigente fue confirmado y la cuenta quedó con correo verificado.
- **Interpretación:** La verificación mediante el mecanismo actual funciona.
- **Evidencia directa:** Ver resultados automáticos de la HU.
- **Observaciones:** —
- **Detalle técnico:** Sin mensajes técnicos adicionales; revisar la evidencia de la épica.
- **Clasificación del hallazgo:** Criterio acreditado por la ejecución o auditoría registrada.
- **Trazabilidad de archivos:** test/E01-Acceso/evidencias/casos-prueba.json; test/E01-Acceso/evidencias/resultado.md; test/E01-Acceso/resultado-final.md.

### CP-E01-HU02-03 — Rechazo de token inválido, usado o expirado

- **Épica:** E01-Acceso — Acceso y autenticación.
- **Historia de usuario asociada:** HU02.
- **Criterios de aceptación asociados:** CA008.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** PASS.
- **Objetivo:** Rechazar token inválido, usado o expirado.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Base de pruebas vacía y catálogos base cargados.
- **Datos de prueba:** Cuenta pendiente sintética, token/código capturado y solicitudes de verificación
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E01-Acceso; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** POST /api/v1/auth/registro/confirmar
- **Pasos ejecutados:** Se ejecutaron las acciones del caso.
- **Resultado esperado:** Rechazar tokens inexistentes, usados o expirados.
- **Resultado obtenido:** Los tokens inexistente, usado y expirado fueron rechazados con HTTP 400.
- **Interpretación:** La validación de invalidez, uso y expiración funciona.
- **Evidencia directa:** Ver resultados automáticos de la HU.
- **Observaciones:** —
- **Detalle técnico:** Sin mensajes técnicos adicionales; revisar la evidencia de la épica.
- **Clasificación del hallazgo:** Criterio acreditado por la ejecución o auditoría registrada.
- **Trazabilidad de archivos:** test/E01-Acceso/evidencias/casos-prueba.json; test/E01-Acceso/evidencias/resultado.md; test/E01-Acceso/resultado-final.md.

### CP-E01-HU02-04 — Bloqueo de acceso sin correo verificado

- **Épica:** E01-Acceso — Acceso y autenticación.
- **Historia de usuario asociada:** HU02.
- **Criterios de aceptación asociados:** CA009.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** PASS.
- **Objetivo:** Bloquear login pendiente.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Base de pruebas vacía y catálogos base cargados.
- **Datos de prueba:** Cuenta pendiente sintética, token/código capturado y solicitudes de verificación
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E01-Acceso; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** POST /api/v1/auth/login
- **Pasos ejecutados:** Se ejecutaron las acciones del caso.
- **Resultado esperado:** Impedir que una cuenta pendiente acceda.
- **Resultado obtenido:** Una cuenta pendiente recibió HTTP 403 al intentar iniciar sesión.
- **Interpretación:** El backend bloquea el acceso antes de verificar el correo.
- **Evidencia directa:** Ver resultados automáticos de la HU.
- **Observaciones:** —
- **Detalle técnico:** Sin mensajes técnicos adicionales; revisar la evidencia de la épica.
- **Clasificación del hallazgo:** Criterio acreditado por la ejecución o auditoría registrada.
- **Trazabilidad de archivos:** test/E01-Acceso/evidencias/casos-prueba.json; test/E01-Acceso/evidencias/resultado.md; test/E01-Acceso/resultado-final.md.

### CP-E01-HU02-05 — Control de reenvíos de verificación

- **Épica:** E01-Acceso — Acceso y autenticación.
- **Historia de usuario asociada:** HU02.
- **Criterios de aceptación asociados:** CA010.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Limitar reenvíos frecuentes.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Base de pruebas vacía y catálogos base cargados.
- **Datos de prueba:** Cuenta pendiente sintética, token/código capturado y solicitudes de verificación
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E01-Acceso; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** POST /api/v1/auth/verificar-correo/solicitar
- **Pasos ejecutados:** Se ejecutaron las acciones del caso.
- **Resultado esperado:** Evitar reenvíos repetidos dentro de un intervalo corto.
- **Resultado obtenido:** Dos solicitudes consecutivas de reenvío fueron aceptadas y generaron dos mecanismos.
- **Interpretación:** No se observó limitación temporal; CA010 no se cumple.
- **Evidencia directa:** Ver detalle técnico de fallos.
- **Observaciones:** —
- **Detalle técnico:** Sin mensajes técnicos adicionales; revisar la evidencia de la épica.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E01-Acceso/evidencias/casos-prueba.json; test/E01-Acceso/evidencias/resultado.md; test/E01-Acceso/resultado-final.md.

### CP-E01-HU03-01 — Inicio de sesión válido

- **Épica:** E01-Acceso — Acceso y autenticación.
- **Historia de usuario asociada:** HU03.
- **Criterios de aceptación asociados:** CA011, CA014.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** PASS.
- **Objetivo:** Iniciar sesión verificada.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Base de pruebas vacía y catálogos base cargados.
- **Datos de prueba:** Credenciales válidas, inválidas y pendientes; refresh token emitido por el backend
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E01-Acceso; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** POST /api/v1/auth/login
- **Pasos ejecutados:** Se ejecutaron las acciones del caso.
- **Resultado esperado:** Aceptar credenciales válidas de una cuenta verificada y aplicar PROJECT_MANAGER.
- **Resultado obtenido:** La cuenta verificada recibió access token, refresh token y tipo PROJECT_MANAGER.
- **Interpretación:** La autenticación y el tipo de usuario funcionaron.
- **Evidencia directa:** Ver resultados automáticos de la HU.
- **Observaciones:** —
- **Detalle técnico:** Sin mensajes técnicos adicionales; revisar la evidencia de la épica.
- **Clasificación del hallazgo:** Criterio acreditado por la ejecución o auditoría registrada.
- **Trazabilidad de archivos:** test/E01-Acceso/evidencias/casos-prueba.json; test/E01-Acceso/evidencias/resultado.md; test/E01-Acceso/resultado-final.md.

### CP-E01-HU03-02 — Rechazo genérico de credenciales inválidas

- **Épica:** E01-Acceso — Acceso y autenticación.
- **Historia de usuario asociada:** HU03.
- **Criterios de aceptación asociados:** CA012.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** PASS.
- **Objetivo:** Rechazar credenciales sin revelar el campo erróneo.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Base de pruebas vacía y catálogos base cargados.
- **Datos de prueba:** Credenciales válidas, inválidas y pendientes; refresh token emitido por el backend
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E01-Acceso; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** POST /api/v1/auth/login
- **Pasos ejecutados:** Se ejecutaron las acciones del caso.
- **Resultado esperado:** Rechazar credenciales inválidas sin revelar cuál campo falló.
- **Resultado obtenido:** Contraseña incorrecta y correo inexistente devolvieron HTTP 401 con el mismo mensaje.
- **Interpretación:** No se reveló cuál credencial era incorrecta.
- **Evidencia directa:** Ver resultados automáticos de la HU.
- **Observaciones:** —
- **Detalle técnico:** Sin mensajes técnicos adicionales; revisar la evidencia de la épica.
- **Clasificación del hallazgo:** Criterio acreditado por la ejecución o auditoría registrada.
- **Trazabilidad de archivos:** test/E01-Acceso/evidencias/casos-prueba.json; test/E01-Acceso/evidencias/resultado.md; test/E01-Acceso/resultado-final.md.

### CP-E01-HU03-03 — Bloqueo de cuenta no verificada

- **Épica:** E01-Acceso — Acceso y autenticación.
- **Historia de usuario asociada:** HU03.
- **Criterios de aceptación asociados:** CA013.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** PASS.
- **Objetivo:** Bloquear cuenta pendiente.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Base de pruebas vacía y catálogos base cargados.
- **Datos de prueba:** Credenciales válidas, inválidas y pendientes; refresh token emitido por el backend
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E01-Acceso; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** POST /api/v1/auth/login
- **Pasos ejecutados:** Se ejecutaron las acciones del caso.
- **Resultado esperado:** Rechazar el acceso de una cuenta aún no verificada.
- **Resultado obtenido:** La cuenta pendiente recibió HTTP 403 al iniciar sesión.
- **Interpretación:** Se aplica la restricción de verificación.
- **Evidencia directa:** Ver resultados automáticos de la HU.
- **Observaciones:** —
- **Detalle técnico:** Sin mensajes técnicos adicionales; revisar la evidencia de la épica.
- **Clasificación del hallazgo:** Criterio acreditado por la ejecución o auditoría registrada.
- **Trazabilidad de archivos:** test/E01-Acceso/evidencias/casos-prueba.json; test/E01-Acceso/evidencias/resultado.md; test/E01-Acceso/resultado-final.md.

### CP-E01-HU03-04 — Renovación de sesión con refresh token

- **Épica:** E01-Acceso — Acceso y autenticación.
- **Historia de usuario asociada:** HU03.
- **Criterios de aceptación asociados:** CA015.
- **Tipo de prueba:** MIXTO.
- **Estado final:** PASS.
- **Objetivo:** Mantener sesión vigente y rotar refresh.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Base de pruebas vacía y catálogos base cargados.
- **Datos de prueba:** Credenciales válidas, inválidas y pendientes; refresh token emitido por el backend
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E01-Acceso; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** POST /api/v1/auth/refresh
- **Pasos ejecutados:** Se ejecutaron las acciones del caso.
- **Resultado esperado:** Renovar una sesión vigente sin pedir credenciales otra vez.
- **Resultado obtenido:** El refresh token vigente fue aceptado y se entregó un nuevo par de tokens.
- **Interpretación:** La reapertura de Flutter queda como verificación manual.
- **Evidencia directa:** Ver resultados automáticos de la HU.
- **Observaciones:** La parte visual queda manual.
- **Detalle técnico:** Sin mensajes técnicos adicionales; revisar la evidencia de la épica.
- **Clasificación del hallazgo:** Criterio acreditado por la ejecución o auditoría registrada.
- **Trazabilidad de archivos:** test/E01-Acceso/evidencias/casos-prueba.json; test/E01-Acceso/evidencias/resultado.md; test/E01-Acceso/resultado-final.md.

### CP-E01-HU04-01 — Consulta de información personal del perfil

- **Épica:** E01-Acceso — Acceso y autenticación.
- **Historia de usuario asociada:** HU04.
- **Criterios de aceptación asociados:** CA016.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Consultar perfil autenticado.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Base de pruebas vacía y catálogos base cargados.
- **Datos de prueba:** Cuenta autenticada y payload con datos personales y de contacto
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E01-Acceso; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** GET /api/v1/usuarios/:id
- **Pasos ejecutados:** Se ejecutaron las acciones del caso.
- **Resultado esperado:** Devolver los datos personales y de contacto del perfil autenticado.
- **Resultado obtenido:** GET /usuarios/:id devolvió datos de cuenta, pero no nombres, apellidos, correo ni teléfono.
- **Interpretación:** No existe API de perfil con los datos CA016.
- **Evidencia directa:** Ver detalle técnico de fallos.
- **Observaciones:** —
- **Detalle técnico:** Sin mensajes técnicos adicionales; revisar la evidencia de la épica.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E01-Acceso/evidencias/casos-prueba.json; test/E01-Acceso/evidencias/resultado.md; test/E01-Acceso/resultado-final.md.

### CP-E01-HU04-02 — Actualización de datos personales y contacto

- **Épica:** E01-Acceso — Acceso y autenticación.
- **Historia de usuario asociada:** HU04.
- **Criterios de aceptación asociados:** CA017, CA019, CA020.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Actualizar datos personales/contacto.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Base de pruebas vacía y catálogos base cargados.
- **Datos de prueba:** Cuenta autenticada y payload con datos personales y de contacto
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E01-Acceso; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** PATCH /api/v1/usuarios/:id
- **Pasos ejecutados:** Se ejecutaron las acciones del caso.
- **Resultado esperado:** Actualizar nombres, apellidos, correo y teléfono permitidos.
- **Resultado obtenido:** PATCH /usuarios/:id recibió los campos personales y respondió HTTP 400 porque no pertenecen al DTO.
- **Interpretación:** El endpoint no permite la actualización exigida.
- **Evidencia directa:** Ver detalle técnico de fallos.
- **Observaciones:** —
- **Detalle técnico:** Sin mensajes técnicos adicionales; revisar la evidencia de la épica.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E01-Acceso/evidencias/casos-prueba.json; test/E01-Acceso/evidencias/resultado.md; test/E01-Acceso/resultado-final.md.

### CP-E01-HU04-03 — Validación de correo en el perfil

- **Épica:** E01-Acceso — Acceso y autenticación.
- **Historia de usuario asociada:** HU04.
- **Criterios de aceptación asociados:** CA018.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Validar perfil inválido.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Base de pruebas vacía y catálogos base cargados.
- **Datos de prueba:** Cuenta autenticada y payload con datos personales y de contacto
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E01-Acceso; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** PATCH /api/v1/usuarios/:id
- **Pasos ejecutados:** Se ejecutaron las acciones del caso.
- **Resultado esperado:** Informar una validación de correo cuando su formato sea inválido.
- **Resultado obtenido:** correoElectronico fue rechazado como propiedad no permitida antes de evaluar el formato.
- **Interpretación:** La validación específica de formato CA018 no se ejecuta.
- **Evidencia directa:** Ver detalle técnico de fallos.
- **Observaciones:** —
- **Detalle técnico:** Sin mensajes técnicos adicionales; revisar la evidencia de la épica.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E01-Acceso/evidencias/casos-prueba.json; test/E01-Acceso/evidencias/resultado.md; test/E01-Acceso/resultado-final.md.

### CP-E01-HU05-01 — Botón y confirmación de cerrar sesión

- **Épica:** E01-Acceso — Acceso y autenticación.
- **Historia de usuario asociada:** HU05.
- **Criterios de aceptación asociados:** CA021, CA022.
- **Tipo de prueba:** MANUAL.
- **Estado final:** MANUAL.
- **Objetivo:** Comprobar botón y confirmación Flutter.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Base de pruebas vacía y catálogos base cargados.
- **Datos de prueba:** Access token y refresh token de una sesión sintética autenticada
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E01-Acceso; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Componente Flutter de perfil
- **Pasos ejecutados:** Se ejecutaron las acciones del caso.
- **Resultado esperado:** Mostrar botón de cierre de sesión y confirmación en Flutter.
- **Resultado obtenido:** Pendiente de ejecutar visualmente en Flutter.
- **Interpretación:** Una prueba API no acredita botón ni diálogo visual.
- **Evidencia directa:** Ver resultados automáticos de la HU.
- **Observaciones:** —
- **Detalle técnico:** Sin mensajes técnicos adicionales; revisar la evidencia de la épica.
- **Clasificación del hallazgo:** Pendiente de comprobación visual/manual; no se atribuye PASS por inferencia.
- **Trazabilidad de archivos:** test/E01-Acceso/evidencias/casos-prueba.json; test/E01-Acceso/evidencias/resultado.md; test/E01-Acceso/resultado-final.md.

### CP-E01-HU05-02 — Revocación de sesión al cerrar sesión

- **Épica:** E01-Acceso — Acceso y autenticación.
- **Historia de usuario asociada:** HU05.
- **Criterios de aceptación asociados:** CA023, CA024.
- **Tipo de prueba:** MIXTO.
- **Estado final:** FAIL.
- **Objetivo:** Cerrar sesión y bloquear acceso posterior.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Base de pruebas vacía y catálogos base cargados.
- **Datos de prueba:** Access token y refresh token de una sesión sintética autenticada
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E01-Acceso; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** POST logout y GET usuarios/:id
- **Pasos ejecutados:** Se ejecutaron las acciones del caso.
- **Resultado esperado:** Revocar la sesión y rechazar sus tokens posteriores.
- **Resultado obtenido:** El refresh token fue revocado, pero el access token previo permitió GET /usuarios/:id con HTTP 200.
- **Interpretación:** El access token vigente no se invalida; CA024 falla.
- **Evidencia directa:** Ver detalle técnico de fallos.
- **Observaciones:** La parte visual queda manual.
- **Detalle técnico:** Sin mensajes técnicos adicionales; revisar la evidencia de la épica.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E01-Acceso/evidencias/casos-prueba.json; test/E01-Acceso/evidencias/resultado.md; test/E01-Acceso/resultado-final.md.

### CP-E01-HU05-03 — Expiración de sesión por inactividad

- **Épica:** E01-Acceso — Acceso y autenticación.
- **Historia de usuario asociada:** HU05.
- **Criterios de aceptación asociados:** CA025.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Aplicar inactividad.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Base de pruebas vacía y catálogos base cargados.
- **Datos de prueba:** Access token y refresh token de una sesión sintética autenticada
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E01-Acceso; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Configuración de sesión y guard JWT
- **Pasos ejecutados:** Se ejecutaron las acciones del caso.
- **Resultado esperado:** Invalidar la sesión tras el periodo de inactividad configurado.
- **Resultado obtenido:** No existe SESSION_INACTIVITY_TIMEOUT ni política backend de inactividad.
- **Interpretación:** No existe soporte verificable para CA025.
- **Evidencia directa:** Ver detalle técnico de fallos.
- **Observaciones:** —
- **Detalle técnico:** Sin mensajes técnicos adicionales; revisar la evidencia de la épica.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E01-Acceso/evidencias/casos-prueba.json; test/E01-Acceso/evidencias/resultado.md; test/E01-Acceso/resultado-final.md.

### CP-E01-HU06-01 — Listado aislado por Wedding Planner

- **Épica:** E01-Acceso — Acceso y autenticación.
- **Historia de usuario asociada:** HU06.
- **Criterios de aceptación asociados:** CA026.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Listar solo matrimonios de WP-A.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Base de pruebas vacía y catálogos base cargados.
- **Datos de prueba:** Dos Wedding Planners autenticadas (WP-A/WP-B), con borradores y DNI únicos
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E01-Acceso; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** GET /api/v1/matrimonios/resumen
- **Pasos ejecutados:** Se ejecutaron las acciones del caso.
- **Resultado esperado:** Devolver únicamente matrimonios pertenecientes a la WP autenticada.
- **Resultado obtenido:** Con sesión WP-A se crearon borradores de WP-A y WP-B; el resumen HTTP 200 devolvió ambos.
- **Interpretación:** El endpoint no filtra por Wedding Planner.
- **Evidencia directa:** Ver detalle técnico de fallos.
- **Observaciones:** —
- **Detalle técnico:** Sin mensajes técnicos adicionales; revisar la evidencia de la épica.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E01-Acceso/evidencias/casos-prueba.json; test/E01-Acceso/evidencias/resultado.md; test/E01-Acceso/resultado-final.md.

### CP-E01-HU06-02 — Selección de matrimonio activo

- **Épica:** E01-Acceso — Acceso y autenticación.
- **Historia de usuario asociada:** HU06.
- **Criterios de aceptación asociados:** CA027.
- **Tipo de prueba:** MANUAL.
- **Estado final:** MANUAL.
- **Objetivo:** Seleccionar matrimonio activo.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Base de pruebas vacía y catálogos base cargados.
- **Datos de prueba:** Dos Wedding Planners autenticadas (WP-A/WP-B), con borradores y DNI únicos
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E01-Acceso; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Selector Flutter
- **Pasos ejecutados:** Se ejecutaron las acciones del caso.
- **Resultado esperado:** Permitir seleccionar el matrimonio activo desde Flutter.
- **Resultado obtenido:** Pendiente de ejecutar en Flutter.
- **Interpretación:** No existe endpoint backend para matrimonio activo.
- **Evidencia directa:** Ver resultados automáticos de la HU.
- **Observaciones:** —
- **Detalle técnico:** Sin mensajes técnicos adicionales; revisar la evidencia de la épica.
- **Clasificación del hallazgo:** Pendiente de comprobación visual/manual; no se atribuye PASS por inferencia.
- **Trazabilidad de archivos:** test/E01-Acceso/evidencias/casos-prueba.json; test/E01-Acceso/evidencias/resultado.md; test/E01-Acceso/resultado-final.md.

### CP-E01-HU06-03 — Aislamiento de información entre Wedding Planners

- **Épica:** E01-Acceso — Acceso y autenticación.
- **Historia de usuario asociada:** HU06.
- **Criterios de aceptación asociados:** CA028.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Aislar información entre matrimonios.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Base de pruebas vacía y catálogos base cargados.
- **Datos de prueba:** Dos Wedding Planners autenticadas (WP-A/WP-B), con borradores y DNI únicos
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E01-Acceso; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** GET /api/v1/matrimonios/resumen
- **Pasos ejecutados:** Se ejecutaron las acciones del caso.
- **Resultado esperado:** No exponer proyectos de otra Wedding Planner.
- **Resultado obtenido:** La consulta autenticada como WP-A incluyó un proyecto creado por WP-B.
- **Interpretación:** Se confirmó filtración entre matrimonios.
- **Evidencia directa:** Ver detalle técnico de fallos.
- **Observaciones:** —
- **Detalle técnico:** Sin mensajes técnicos adicionales; revisar la evidencia de la épica.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E01-Acceso/evidencias/casos-prueba.json; test/E01-Acceso/evidencias/resultado.md; test/E01-Acceso/resultado-final.md.

### CP-E01-HU06-04 — Cambio de matrimonio activo

- **Épica:** E01-Acceso — Acceso y autenticación.
- **Historia de usuario asociada:** HU06.
- **Criterios de aceptación asociados:** CA029.
- **Tipo de prueba:** MANUAL.
- **Estado final:** MANUAL.
- **Objetivo:** Cambiar matrimonio activo.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Base de pruebas vacía y catálogos base cargados.
- **Datos de prueba:** Dos Wedding Planners autenticadas (WP-A/WP-B), con borradores y DNI únicos
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E01-Acceso; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Selector Flutter
- **Pasos ejecutados:** Se ejecutaron las acciones del caso.
- **Resultado esperado:** Permitir cambiar el matrimonio activo desde Flutter.
- **Resultado obtenido:** Pendiente de ejecutar en Flutter.
- **Interpretación:** El cambio de contexto es una interacción frontend.
- **Evidencia directa:** Ver resultados automáticos de la HU.
- **Observaciones:** —
- **Detalle técnico:** Sin mensajes técnicos adicionales; revisar la evidencia de la épica.
- **Clasificación del hallazgo:** Pendiente de comprobación visual/manual; no se atribuye PASS por inferencia.
- **Trazabilidad de archivos:** test/E01-Acceso/evidencias/casos-prueba.json; test/E01-Acceso/evidencias/resultado.md; test/E01-Acceso/resultado-final.md.

### CP-E01-HU06-05 — Búsqueda y filtros de matrimonios

- **Épica:** E01-Acceso — Acceso y autenticación.
- **Historia de usuario asociada:** HU06.
- **Criterios de aceptación asociados:** CA030.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Buscar y filtrar matrimonios.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Base de pruebas vacía y catálogos base cargados.
- **Datos de prueba:** Dos Wedding Planners autenticadas (WP-A/WP-B), con borradores y DNI únicos
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E01-Acceso; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** GET /api/v1/matrimonios/resumen
- **Pasos ejecutados:** Se ejecutaron las acciones del caso.
- **Resultado esperado:** Aplicar búsqueda por pareja y filtros de fecha sin mostrar datos ajenos.
- **Resultado obtenido:** Aun enviando búsqueda y fechas, la respuesta incluyó el borrador de WP-B.
- **Interpretación:** El resumen ignora parámetros y no implementa búsqueda/filtros.
- **Evidencia directa:** Ver detalle técnico de fallos.
- **Observaciones:** —
- **Detalle técnico:** Sin mensajes técnicos adicionales; revisar la evidencia de la épica.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E01-Acceso/evidencias/casos-prueba.json; test/E01-Acceso/evidencias/resultado.md; test/E01-Acceso/resultado-final.md.

### CP-E02-HU08-01 — Incorporación de un miembro con rol operativo

- **Épica:** E02-Usuarios — Usuarios.
- **Historia de usuario asociada:** HU08.
- **Criterios de aceptación asociados:** CA036.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Incorporación de un miembro con rol operativo.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** weddingPlanners: Daniela Ramírez Torres; Alejandra Castro Montalvo; colaborador: Jorge Medina Salas; pareja: Lucía Paredes Rojas; matrimonios: Boda de Lucía Paredes y Andrés Flores; Boda de Renata Silva y Diego Campos; nota: No se crearon registros operativos: el esquema actual no contiene entidades de miembros/permisos.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E02-Usuarios; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA036.
- **Resultado obtenido:** La auditoría del contrato Prisma y de los módulos actuales no encontró entidades, DTOs, controladores ni endpoint para miembros, roles operativos o permisos por proyecto.
- **Interpretación:** La funcionalidad requerida no está implementada en el modelo ni en los controladores actuales; el criterio no puede cumplirse.
- **Evidencia directa:** test/E02-Usuarios/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Sin mensajes técnicos adicionales; revisar la evidencia de la épica.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E02-Usuarios/evidencias/casos-prueba.json; test/E02-Usuarios/evidencias/resultado.md; test/E02-Usuarios/resultado-final.md.

### CP-E02-HU08-02 — Invitación del nuevo miembro al proyecto

- **Épica:** E02-Usuarios — Usuarios.
- **Historia de usuario asociada:** HU08.
- **Criterios de aceptación asociados:** CA037.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Invitación del nuevo miembro al proyecto.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** weddingPlanners: Daniela Ramírez Torres; Alejandra Castro Montalvo; colaborador: Jorge Medina Salas; pareja: Lucía Paredes Rojas; matrimonios: Boda de Lucía Paredes y Andrés Flores; Boda de Renata Silva y Diego Campos; nota: No se crearon registros operativos: el esquema actual no contiene entidades de miembros/permisos.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E02-Usuarios; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA037.
- **Resultado obtenido:** La auditoría del contrato Prisma y de los módulos actuales no encontró entidades, DTOs, controladores ni endpoint para miembros, roles operativos o permisos por proyecto.
- **Interpretación:** La funcionalidad requerida no está implementada en el modelo ni en los controladores actuales; el criterio no puede cumplirse.
- **Evidencia directa:** test/E02-Usuarios/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Sin mensajes técnicos adicionales; revisar la evidencia de la épica.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E02-Usuarios/evidencias/casos-prueba.json; test/E02-Usuarios/evidencias/resultado.md; test/E02-Usuarios/resultado-final.md.

### CP-E02-HU08-03 — Asignación de múltiples roles operativos

- **Épica:** E02-Usuarios — Usuarios.
- **Historia de usuario asociada:** HU08.
- **Criterios de aceptación asociados:** CA038.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Asignación de múltiples roles operativos.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** weddingPlanners: Daniela Ramírez Torres; Alejandra Castro Montalvo; colaborador: Jorge Medina Salas; pareja: Lucía Paredes Rojas; matrimonios: Boda de Lucía Paredes y Andrés Flores; Boda de Renata Silva y Diego Campos; nota: No se crearon registros operativos: el esquema actual no contiene entidades de miembros/permisos.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E02-Usuarios; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA038.
- **Resultado obtenido:** La auditoría del contrato Prisma y de los módulos actuales no encontró entidades, DTOs, controladores ni endpoint para miembros, roles operativos o permisos por proyecto.
- **Interpretación:** La funcionalidad requerida no está implementada en el modelo ni en los controladores actuales; el criterio no puede cumplirse.
- **Evidencia directa:** test/E02-Usuarios/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Sin mensajes técnicos adicionales; revisar la evidencia de la épica.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E02-Usuarios/evidencias/casos-prueba.json; test/E02-Usuarios/evidencias/resultado.md; test/E02-Usuarios/resultado-final.md.

### CP-E02-HU08-04 — Modificación de roles con conservación del historial

- **Épica:** E02-Usuarios — Usuarios.
- **Historia de usuario asociada:** HU08.
- **Criterios de aceptación asociados:** CA039.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Modificación de roles con conservación del historial.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** weddingPlanners: Daniela Ramírez Torres; Alejandra Castro Montalvo; colaborador: Jorge Medina Salas; pareja: Lucía Paredes Rojas; matrimonios: Boda de Lucía Paredes y Andrés Flores; Boda de Renata Silva y Diego Campos; nota: No se crearon registros operativos: el esquema actual no contiene entidades de miembros/permisos.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E02-Usuarios; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA039.
- **Resultado obtenido:** La auditoría del contrato Prisma y de los módulos actuales no encontró entidades, DTOs, controladores ni endpoint para miembros, roles operativos o permisos por proyecto.
- **Interpretación:** La funcionalidad requerida no está implementada en el modelo ni en los controladores actuales; el criterio no puede cumplirse.
- **Evidencia directa:** test/E02-Usuarios/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Sin mensajes técnicos adicionales; revisar la evidencia de la épica.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E02-Usuarios/evidencias/casos-prueba.json; test/E02-Usuarios/evidencias/resultado.md; test/E02-Usuarios/resultado-final.md.

### CP-E02-HU08-05 — Inhabilitación de un colaborador

- **Épica:** E02-Usuarios — Usuarios.
- **Historia de usuario asociada:** HU08.
- **Criterios de aceptación asociados:** CA040.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Inhabilitación de un colaborador.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** weddingPlanners: Daniela Ramírez Torres; Alejandra Castro Montalvo; colaborador: Jorge Medina Salas; pareja: Lucía Paredes Rojas; matrimonios: Boda de Lucía Paredes y Andrés Flores; Boda de Renata Silva y Diego Campos; nota: No se crearon registros operativos: el esquema actual no contiene entidades de miembros/permisos.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E02-Usuarios; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA040.
- **Resultado obtenido:** La auditoría del contrato Prisma y de los módulos actuales no encontró entidades, DTOs, controladores ni endpoint para miembros, roles operativos o permisos por proyecto.
- **Interpretación:** La funcionalidad requerida no está implementada en el modelo ni en los controladores actuales; el criterio no puede cumplirse.
- **Evidencia directa:** test/E02-Usuarios/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Sin mensajes técnicos adicionales; revisar la evidencia de la épica.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E02-Usuarios/evidencias/casos-prueba.json; test/E02-Usuarios/evidencias/resultado.md; test/E02-Usuarios/resultado-final.md.

### CP-E02-HU09-01 — Acceso inicial según tipo de usuario

- **Épica:** E02-Usuarios — Usuarios.
- **Historia de usuario asociada:** HU09.
- **Criterios de aceptación asociados:** CA041.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Acceso inicial según tipo de usuario.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** weddingPlanners: Daniela Ramírez Torres; Alejandra Castro Montalvo; colaborador: Jorge Medina Salas; pareja: Lucía Paredes Rojas; matrimonios: Boda de Lucía Paredes y Andrés Flores; Boda de Renata Silva y Diego Campos; nota: No se crearon registros operativos: el esquema actual no contiene entidades de miembros/permisos.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E02-Usuarios; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA041.
- **Resultado obtenido:** La auditoría del contrato Prisma y de los módulos actuales no encontró entidades, DTOs, controladores ni endpoint para miembros, roles operativos o permisos por proyecto.
- **Interpretación:** La funcionalidad requerida no está implementada en el modelo ni en los controladores actuales; el criterio no puede cumplirse.
- **Evidencia directa:** test/E02-Usuarios/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Sin mensajes técnicos adicionales; revisar la evidencia de la épica.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E02-Usuarios/evidencias/casos-prueba.json; test/E02-Usuarios/evidencias/resultado.md; test/E02-Usuarios/resultado-final.md.

### CP-E02-HU09-02 — Configuración de permisos de consulta y modificación

- **Épica:** E02-Usuarios — Usuarios.
- **Historia de usuario asociada:** HU09.
- **Criterios de aceptación asociados:** CA042.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Configuración de permisos de consulta y modificación.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** weddingPlanners: Daniela Ramírez Torres; Alejandra Castro Montalvo; colaborador: Jorge Medina Salas; pareja: Lucía Paredes Rojas; matrimonios: Boda de Lucía Paredes y Andrés Flores; Boda de Renata Silva y Diego Campos; nota: No se crearon registros operativos: el esquema actual no contiene entidades de miembros/permisos.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E02-Usuarios; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA042.
- **Resultado obtenido:** La auditoría del contrato Prisma y de los módulos actuales no encontró entidades, DTOs, controladores ni endpoint para miembros, roles operativos o permisos por proyecto.
- **Interpretación:** La funcionalidad requerida no está implementada en el modelo ni en los controladores actuales; el criterio no puede cumplirse.
- **Evidencia directa:** test/E02-Usuarios/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Sin mensajes técnicos adicionales; revisar la evidencia de la épica.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E02-Usuarios/evidencias/casos-prueba.json; test/E02-Usuarios/evidencias/resultado.md; test/E02-Usuarios/resultado-final.md.

### CP-E02-HU09-03 — Bloqueo de operaciones sin autorización

- **Épica:** E02-Usuarios — Usuarios.
- **Historia de usuario asociada:** HU09.
- **Criterios de aceptación asociados:** CA043.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Bloqueo de operaciones sin autorización.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** weddingPlanners: Daniela Ramírez Torres; Alejandra Castro Montalvo; colaborador: Jorge Medina Salas; pareja: Lucía Paredes Rojas; matrimonios: Boda de Lucía Paredes y Andrés Flores; Boda de Renata Silva y Diego Campos; nota: No se crearon registros operativos: el esquema actual no contiene entidades de miembros/permisos.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E02-Usuarios; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA043.
- **Resultado obtenido:** La auditoría del contrato Prisma y de los módulos actuales no encontró entidades, DTOs, controladores ni endpoint para miembros, roles operativos o permisos por proyecto.
- **Interpretación:** La funcionalidad requerida no está implementada en el modelo ni en los controladores actuales; el criterio no puede cumplirse.
- **Evidencia directa:** test/E02-Usuarios/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Sin mensajes técnicos adicionales; revisar la evidencia de la épica.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E02-Usuarios/evidencias/casos-prueba.json; test/E02-Usuarios/evidencias/resultado.md; test/E02-Usuarios/resultado-final.md.

### CP-E02-HU09-04 — Independencia de permisos entre matrimonios

- **Épica:** E02-Usuarios — Usuarios.
- **Historia de usuario asociada:** HU09.
- **Criterios de aceptación asociados:** CA044.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Independencia de permisos entre matrimonios.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** weddingPlanners: Daniela Ramírez Torres; Alejandra Castro Montalvo; colaborador: Jorge Medina Salas; pareja: Lucía Paredes Rojas; matrimonios: Boda de Lucía Paredes y Andrés Flores; Boda de Renata Silva y Diego Campos; nota: No se crearon registros operativos: el esquema actual no contiene entidades de miembros/permisos.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E02-Usuarios; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA044.
- **Resultado obtenido:** La auditoría del contrato Prisma y de los módulos actuales no encontró entidades, DTOs, controladores ni endpoint para miembros, roles operativos o permisos por proyecto.
- **Interpretación:** La funcionalidad requerida no está implementada en el modelo ni en los controladores actuales; el criterio no puede cumplirse.
- **Evidencia directa:** test/E02-Usuarios/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Sin mensajes técnicos adicionales; revisar la evidencia de la épica.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E02-Usuarios/evidencias/casos-prueba.json; test/E02-Usuarios/evidencias/resultado.md; test/E02-Usuarios/resultado-final.md.

### CP-E02-HU09-05 — Visualización según permisos y asignaciones vigentes

- **Épica:** E02-Usuarios — Usuarios.
- **Historia de usuario asociada:** HU09.
- **Criterios de aceptación asociados:** CA045.
- **Tipo de prueba:** MIXTO.
- **Estado final:** FAIL.
- **Objetivo:** Visualización según permisos y asignaciones vigentes.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** weddingPlanners: Daniela Ramírez Torres; Alejandra Castro Montalvo; colaborador: Jorge Medina Salas; pareja: Lucía Paredes Rojas; matrimonios: Boda de Lucía Paredes y Andrés Flores; Boda de Renata Silva y Diego Campos; nota: No se crearon registros operativos: el esquema actual no contiene entidades de miembros/permisos.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E02-Usuarios; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA045.
- **Resultado obtenido:** La auditoría del contrato Prisma y de los módulos actuales no encontró entidades, DTOs, controladores ni endpoint para miembros, roles operativos o permisos por proyecto.
- **Interpretación:** La funcionalidad requerida no está implementada en el modelo ni en los controladores actuales; el criterio no puede cumplirse.
- **Evidencia directa:** test/E02-Usuarios/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Sin mensajes técnicos adicionales; revisar la evidencia de la épica.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E02-Usuarios/evidencias/casos-prueba.json; test/E02-Usuarios/evidencias/resultado.md; test/E02-Usuarios/resultado-final.md.

### CP-E03-HU10-01 — Registro válido de parámetros base y preparación temporal

- **Épica:** E03-Proyecto — Proyecto.
- **Historia de usuario asociada:** HU10.
- **Criterios de aceptación asociados:** CA046, CA047.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Registro válido de parámetros base y preparación temporal.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU10: Daniela Ramírez Torres y la boda de Sofía Navarro y Martín León.; HU11: Boda de Sofía Navarro y Martín León, cronograma e invitados existentes.; HU12: Catálogo metodológico: no existe en el contrato actual.; HU13: Proyecto de la boda de Sofía Navarro y Martín León.; HU14: Proyecto en fase PLANIFICACION y actividades operativas.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E03-Proyecto; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA046, CA047.
- **Resultado obtenido:** La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado.
- **Interpretación:** Funcionalidad no implementada; el criterio no puede cumplirse todavía.
- **Evidencia directa:** test/E03-Proyecto/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: parametros-base-estilo. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E03-Proyecto/evidencias/casos-prueba.json; test/E03-Proyecto/evidencias/resultado.md; test/E03-Proyecto/resultado-final.md.

### CP-E03-HU10-02 — Validación de parámetros base obligatorios

- **Épica:** E03-Proyecto — Proyecto.
- **Historia de usuario asociada:** HU10.
- **Criterios de aceptación asociados:** CA046.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Validación de parámetros base obligatorios.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU10: Daniela Ramírez Torres y la boda de Sofía Navarro y Martín León.; HU11: Boda de Sofía Navarro y Martín León, cronograma e invitados existentes.; HU12: Catálogo metodológico: no existe en el contrato actual.; HU13: Proyecto de la boda de Sofía Navarro y Martín León.; HU14: Proyecto en fase PLANIFICACION y actividades operativas.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E03-Proyecto; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA046.
- **Resultado obtenido:** La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado.
- **Interpretación:** Funcionalidad no implementada; el criterio no puede cumplirse todavía.
- **Evidencia directa:** test/E03-Proyecto/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: validacion-parametros-base. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.; Funcionalidad no implementada: validacion-parametros-base. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.; Funcionalidad no implementada: validacion-parametros-base. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.; Funcionalidad no implementada: validacion-parametros-base. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E03-Proyecto/evidencias/casos-prueba.json; test/E03-Proyecto/evidencias/resultado.md; test/E03-Proyecto/resultado-final.md.

### CP-E03-HU10-03 — Generación del cronograma desde plantilla

- **Épica:** E03-Proyecto — Proyecto.
- **Historia de usuario asociada:** HU10.
- **Criterios de aceptación asociados:** CA048.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** PASS.
- **Objetivo:** Generación del cronograma desde plantilla.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU10: Daniela Ramírez Torres y la boda de Sofía Navarro y Martín León.; HU11: Boda de Sofía Navarro y Martín León, cronograma e invitados existentes.; HU12: Catálogo metodológico: no existe en el contrato actual.; HU13: Proyecto de la boda de Sofía Navarro y Martín León.; HU14: Proyecto en fase PLANIFICACION y actividades operativas.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E03-Proyecto; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA048.
- **Resultado obtenido:** La lógica existente respondió conforme al criterio técnico evaluado.
- **Interpretación:** El criterio evaluado cuenta con soporte backend actual.
- **Evidencia directa:** test/E03-Proyecto/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Sin mensajes técnicos adicionales; revisar la evidencia de la épica.
- **Clasificación del hallazgo:** Criterio acreditado por la ejecución o auditoría registrada.
- **Trazabilidad de archivos:** test/E03-Proyecto/evidencias/casos-prueba.json; test/E03-Proyecto/evidencias/resultado.md; test/E03-Proyecto/resultado-final.md.

### CP-E03-HU10-04 — Asociación del estilo al matrimonio

- **Épica:** E03-Proyecto — Proyecto.
- **Historia de usuario asociada:** HU10.
- **Criterios de aceptación asociados:** CA049.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Asociación del estilo al matrimonio.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU10: Daniela Ramírez Torres y la boda de Sofía Navarro y Martín León.; HU11: Boda de Sofía Navarro y Martín León, cronograma e invitados existentes.; HU12: Catálogo metodológico: no existe en el contrato actual.; HU13: Proyecto de la boda de Sofía Navarro y Martín León.; HU14: Proyecto en fase PLANIFICACION y actividades operativas.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E03-Proyecto; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA049.
- **Resultado obtenido:** La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado.
- **Interpretación:** Funcionalidad no implementada; el criterio no puede cumplirse todavía.
- **Evidencia directa:** test/E03-Proyecto/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: estilo-evento. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E03-Proyecto/evidencias/casos-prueba.json; test/E03-Proyecto/evidencias/resultado.md; test/E03-Proyecto/resultado-final.md.

### CP-E03-HU10-05 — Confirmación previa para cambios sensibles

- **Épica:** E03-Proyecto — Proyecto.
- **Historia de usuario asociada:** HU10.
- **Criterios de aceptación asociados:** CA050.
- **Tipo de prueba:** MIXTO.
- **Estado final:** FAIL.
- **Objetivo:** Confirmación previa para cambios sensibles.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU10: Daniela Ramírez Torres y la boda de Sofía Navarro y Martín León.; HU11: Boda de Sofía Navarro y Martín León, cronograma e invitados existentes.; HU12: Catálogo metodológico: no existe en el contrato actual.; HU13: Proyecto de la boda de Sofía Navarro y Martín León.; HU14: Proyecto en fase PLANIFICACION y actividades operativas.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E03-Proyecto; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA050.
- **Resultado obtenido:** La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado.
- **Interpretación:** Funcionalidad no implementada; el criterio no puede cumplirse todavía.
- **Evidencia directa:** test/E03-Proyecto/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: confirmacion-cambios-sensibles. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.; Funcionalidad no implementada: confirmacion-cambios-sensibles. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E03-Proyecto/evidencias/casos-prueba.json; test/E03-Proyecto/evidencias/resultado.md; test/E03-Proyecto/resultado-final.md.

### CP-E03-HU11-01 — Cálculo del avance y resumen de actividades

- **Épica:** E03-Proyecto — Proyecto.
- **Historia de usuario asociada:** HU11.
- **Criterios de aceptación asociados:** CA051, CA052.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Cálculo del avance y resumen de actividades.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU10: Daniela Ramírez Torres y la boda de Sofía Navarro y Martín León.; HU11: Boda de Sofía Navarro y Martín León, cronograma e invitados existentes.; HU12: Catálogo metodológico: no existe en el contrato actual.; HU13: Proyecto de la boda de Sofía Navarro y Martín León.; HU14: Proyecto en fase PLANIFICACION y actividades operativas.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E03-Proyecto; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA051, CA052.
- **Resultado obtenido:** La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado.
- **Interpretación:** Funcionalidad no implementada; el criterio no puede cumplirse todavía.
- **Evidencia directa:** test/E03-Proyecto/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: dashboard-avance. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E03-Proyecto/evidencias/casos-prueba.json; test/E03-Proyecto/evidencias/resultado.md; test/E03-Proyecto/resultado-final.md.

### CP-E03-HU11-02 — Indicadores de confirmación de invitados

- **Épica:** E03-Proyecto — Proyecto.
- **Historia de usuario asociada:** HU11.
- **Criterios de aceptación asociados:** CA053.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Indicadores de confirmación de invitados.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU10: Daniela Ramírez Torres y la boda de Sofía Navarro y Martín León.; HU11: Boda de Sofía Navarro y Martín León, cronograma e invitados existentes.; HU12: Catálogo metodológico: no existe en el contrato actual.; HU13: Proyecto de la boda de Sofía Navarro y Martín León.; HU14: Proyecto en fase PLANIFICACION y actividades operativas.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E03-Proyecto; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA053.
- **Resultado obtenido:** La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado.
- **Interpretación:** Funcionalidad no implementada; el criterio no puede cumplirse todavía.
- **Evidencia directa:** test/E03-Proyecto/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: dashboard-rsvp. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E03-Proyecto/evidencias/casos-prueba.json; test/E03-Proyecto/evidencias/resultado.md; test/E03-Proyecto/resultado-final.md.

### CP-E03-HU11-03 — Resumen financiero y detección de excedente

- **Épica:** E03-Proyecto — Proyecto.
- **Historia de usuario asociada:** HU11.
- **Criterios de aceptación asociados:** CA054.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Resumen financiero y detección de excedente.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU10: Daniela Ramírez Torres y la boda de Sofía Navarro y Martín León.; HU11: Boda de Sofía Navarro y Martín León, cronograma e invitados existentes.; HU12: Catálogo metodológico: no existe en el contrato actual.; HU13: Proyecto de la boda de Sofía Navarro y Martín León.; HU14: Proyecto en fase PLANIFICACION y actividades operativas.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E03-Proyecto; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA054.
- **Resultado obtenido:** La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado.
- **Interpretación:** Funcionalidad no implementada; el criterio no puede cumplirse todavía.
- **Evidencia directa:** test/E03-Proyecto/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: dashboard-presupuesto. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.; Funcionalidad no implementada: dashboard-presupuesto. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E03-Proyecto/evidencias/casos-prueba.json; test/E03-Proyecto/evidencias/resultado.md; test/E03-Proyecto/resultado-final.md.

### CP-E03-HU11-04 — Actualización y permisos del dashboard

- **Épica:** E03-Proyecto — Proyecto.
- **Historia de usuario asociada:** HU11.
- **Criterios de aceptación asociados:** CA055.
- **Tipo de prueba:** MIXTO.
- **Estado final:** FAIL.
- **Objetivo:** Actualización y permisos del dashboard.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU10: Daniela Ramírez Torres y la boda de Sofía Navarro y Martín León.; HU11: Boda de Sofía Navarro y Martín León, cronograma e invitados existentes.; HU12: Catálogo metodológico: no existe en el contrato actual.; HU13: Proyecto de la boda de Sofía Navarro y Martín León.; HU14: Proyecto en fase PLANIFICACION y actividades operativas.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E03-Proyecto; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA055.
- **Resultado obtenido:** La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado.
- **Interpretación:** Funcionalidad no implementada; el criterio no puede cumplirse todavía.
- **Evidencia directa:** test/E03-Proyecto/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: dashboard-permisos. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E03-Proyecto/evidencias/casos-prueba.json; test/E03-Proyecto/evidencias/resultado.md; test/E03-Proyecto/resultado-final.md.

### CP-E03-HU12-01 — Consulta del catálogo vigente de buenas prácticas

- **Épica:** E03-Proyecto — Proyecto.
- **Historia de usuario asociada:** HU12.
- **Criterios de aceptación asociados:** CA056, CA060.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Consulta del catálogo vigente de buenas prácticas.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU10: Daniela Ramírez Torres y la boda de Sofía Navarro y Martín León.; HU11: Boda de Sofía Navarro y Martín León, cronograma e invitados existentes.; HU12: Catálogo metodológico: no existe en el contrato actual.; HU13: Proyecto de la boda de Sofía Navarro y Martín León.; HU14: Proyecto en fase PLANIFICACION y actividades operativas.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E03-Proyecto; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA056, CA060.
- **Resultado obtenido:** La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado.
- **Interpretación:** Funcionalidad no implementada; el criterio no puede cumplirse todavía.
- **Evidencia directa:** test/E03-Proyecto/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: catalogo-metodologias. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E03-Proyecto/evidencias/casos-prueba.json; test/E03-Proyecto/evidencias/resultado.md; test/E03-Proyecto/resultado-final.md.

### CP-E03-HU12-02 — Contenido contextual y referencia metodológica

- **Épica:** E03-Proyecto — Proyecto.
- **Historia de usuario asociada:** HU12.
- **Criterios de aceptación asociados:** CA057, CA058.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Contenido contextual y referencia metodológica.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU10: Daniela Ramírez Torres y la boda de Sofía Navarro y Martín León.; HU11: Boda de Sofía Navarro y Martín León, cronograma e invitados existentes.; HU12: Catálogo metodológico: no existe en el contrato actual.; HU13: Proyecto de la boda de Sofía Navarro y Martín León.; HU14: Proyecto en fase PLANIFICACION y actividades operativas.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E03-Proyecto; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA057, CA058.
- **Resultado obtenido:** La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado.
- **Interpretación:** Funcionalidad no implementada; el criterio no puede cumplirse todavía.
- **Evidencia directa:** test/E03-Proyecto/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: referencia-metodologica. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E03-Proyecto/evidencias/casos-prueba.json; test/E03-Proyecto/evidencias/resultado.md; test/E03-Proyecto/resultado-final.md.

### CP-E03-HU12-03 — Aplicación práctica de una buena práctica

- **Épica:** E03-Proyecto — Proyecto.
- **Historia de usuario asociada:** HU12.
- **Criterios de aceptación asociados:** CA059.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Aplicación práctica de una buena práctica.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU10: Daniela Ramírez Torres y la boda de Sofía Navarro y Martín León.; HU11: Boda de Sofía Navarro y Martín León, cronograma e invitados existentes.; HU12: Catálogo metodológico: no existe en el contrato actual.; HU13: Proyecto de la boda de Sofía Navarro y Martín León.; HU14: Proyecto en fase PLANIFICACION y actividades operativas.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E03-Proyecto; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA059.
- **Resultado obtenido:** La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado.
- **Interpretación:** Funcionalidad no implementada; el criterio no puede cumplirse todavía.
- **Evidencia directa:** test/E03-Proyecto/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: aplicacion-practica-metodologia. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E03-Proyecto/evidencias/casos-prueba.json; test/E03-Proyecto/evidencias/resultado.md; test/E03-Proyecto/resultado-final.md.

### CP-E03-HU13-01 — Navegación manteniendo el contexto del matrimonio

- **Épica:** E03-Proyecto — Proyecto.
- **Historia de usuario asociada:** HU13.
- **Criterios de aceptación asociados:** CA061, CA062.
- **Tipo de prueba:** MIXTO.
- **Estado final:** FAIL.
- **Objetivo:** Navegación manteniendo el contexto del matrimonio.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU10: Daniela Ramírez Torres y la boda de Sofía Navarro y Martín León.; HU11: Boda de Sofía Navarro y Martín León, cronograma e invitados existentes.; HU12: Catálogo metodológico: no existe en el contrato actual.; HU13: Proyecto de la boda de Sofía Navarro y Martín León.; HU14: Proyecto en fase PLANIFICACION y actividades operativas.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E03-Proyecto; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA061, CA062.
- **Resultado obtenido:** La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado.
- **Interpretación:** Funcionalidad no implementada; el criterio no puede cumplirse todavía.
- **Evidencia directa:** test/E03-Proyecto/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: contexto-matrimonio. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E03-Proyecto/evidencias/casos-prueba.json; test/E03-Proyecto/evidencias/resultado.md; test/E03-Proyecto/resultado-final.md.

### CP-E03-HU13-02 — Actualización de indicadores por cambios en módulos

- **Épica:** E03-Proyecto — Proyecto.
- **Historia de usuario asociada:** HU13.
- **Criterios de aceptación asociados:** CA063.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Actualización de indicadores por cambios en módulos.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU10: Daniela Ramírez Torres y la boda de Sofía Navarro y Martín León.; HU11: Boda de Sofía Navarro y Martín León, cronograma e invitados existentes.; HU12: Catálogo metodológico: no existe en el contrato actual.; HU13: Proyecto de la boda de Sofía Navarro y Martín León.; HU14: Proyecto en fase PLANIFICACION y actividades operativas.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E03-Proyecto; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA063.
- **Resultado obtenido:** La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado.
- **Interpretación:** Funcionalidad no implementada; el criterio no puede cumplirse todavía.
- **Evidencia directa:** test/E03-Proyecto/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: indicadores-integrados. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E03-Proyecto/evidencias/casos-prueba.json; test/E03-Proyecto/evidencias/resultado.md; test/E03-Proyecto/resultado-final.md.

### CP-E03-HU13-03 — Reutilización de información compartida

- **Épica:** E03-Proyecto — Proyecto.
- **Historia de usuario asociada:** HU13.
- **Criterios de aceptación asociados:** CA064.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Reutilización de información compartida.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU10: Daniela Ramírez Torres y la boda de Sofía Navarro y Martín León.; HU11: Boda de Sofía Navarro y Martín León, cronograma e invitados existentes.; HU12: Catálogo metodológico: no existe en el contrato actual.; HU13: Proyecto de la boda de Sofía Navarro y Martín León.; HU14: Proyecto en fase PLANIFICACION y actividades operativas.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E03-Proyecto; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA064.
- **Resultado obtenido:** La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado.
- **Interpretación:** Funcionalidad no implementada; el criterio no puede cumplirse todavía.
- **Evidencia directa:** test/E03-Proyecto/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: fuente-compartida. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E03-Proyecto/evidencias/casos-prueba.json; test/E03-Proyecto/evidencias/resultado.md; test/E03-Proyecto/resultado-final.md.

### CP-E03-HU13-04 — Permisos sobre módulos e información integrada

- **Épica:** E03-Proyecto — Proyecto.
- **Historia de usuario asociada:** HU13.
- **Criterios de aceptación asociados:** CA065.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Permisos sobre módulos e información integrada.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU10: Daniela Ramírez Torres y la boda de Sofía Navarro y Martín León.; HU11: Boda de Sofía Navarro y Martín León, cronograma e invitados existentes.; HU12: Catálogo metodológico: no existe en el contrato actual.; HU13: Proyecto de la boda de Sofía Navarro y Martín León.; HU14: Proyecto en fase PLANIFICACION y actividades operativas.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E03-Proyecto; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA065.
- **Resultado obtenido:** La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado.
- **Interpretación:** Funcionalidad no implementada; el criterio no puede cumplirse todavía.
- **Evidencia directa:** test/E03-Proyecto/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: permisos-contextuales. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E03-Proyecto/evidencias/casos-prueba.json; test/E03-Proyecto/evidencias/resultado.md; test/E03-Proyecto/resultado-final.md.

### CP-E03-HU14-01 — Identificación de la etapa actual

- **Épica:** E03-Proyecto — Proyecto.
- **Historia de usuario asociada:** HU14.
- **Criterios de aceptación asociados:** CA066.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** PASS.
- **Objetivo:** Identificación de la etapa actual.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU10: Daniela Ramírez Torres y la boda de Sofía Navarro y Martín León.; HU11: Boda de Sofía Navarro y Martín León, cronograma e invitados existentes.; HU12: Catálogo metodológico: no existe en el contrato actual.; HU13: Proyecto de la boda de Sofía Navarro y Martín León.; HU14: Proyecto en fase PLANIFICACION y actividades operativas.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E03-Proyecto; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA066.
- **Resultado obtenido:** La lógica existente respondió conforme al criterio técnico evaluado.
- **Interpretación:** El criterio evaluado cuenta con soporte backend actual.
- **Evidencia directa:** test/E03-Proyecto/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Sin mensajes técnicos adicionales; revisar la evidencia de la épica.
- **Clasificación del hallazgo:** Criterio acreditado por la ejecución o auditoría registrada.
- **Trazabilidad de archivos:** test/E03-Proyecto/evidencias/casos-prueba.json; test/E03-Proyecto/evidencias/resultado.md; test/E03-Proyecto/resultado-final.md.

### CP-E03-HU14-02 — Acciones de la etapa y próxima acción recomendada

- **Épica:** E03-Proyecto — Proyecto.
- **Historia de usuario asociada:** HU14.
- **Criterios de aceptación asociados:** CA067, CA068.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Acciones de la etapa y próxima acción recomendada.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU10: Daniela Ramírez Torres y la boda de Sofía Navarro y Martín León.; HU11: Boda de Sofía Navarro y Martín León, cronograma e invitados existentes.; HU12: Catálogo metodológico: no existe en el contrato actual.; HU13: Proyecto de la boda de Sofía Navarro y Martín León.; HU14: Proyecto en fase PLANIFICACION y actividades operativas.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E03-Proyecto; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA067, CA068.
- **Resultado obtenido:** La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado.
- **Interpretación:** Funcionalidad no implementada; el criterio no puede cumplirse todavía.
- **Evidencia directa:** test/E03-Proyecto/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: flujo-recomendado. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.; Funcionalidad no implementada: flujo-recomendado. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.; Funcionalidad no implementada: flujo-recomendado. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E03-Proyecto/evidencias/casos-prueba.json; test/E03-Proyecto/evidencias/resultado.md; test/E03-Proyecto/resultado-final.md.

### CP-E03-HU14-03 — Actualización del flujo al completar una acción

- **Épica:** E03-Proyecto — Proyecto.
- **Historia de usuario asociada:** HU14.
- **Criterios de aceptación asociados:** CA069.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Actualización del flujo al completar una acción.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU10: Daniela Ramírez Torres y la boda de Sofía Navarro y Martín León.; HU11: Boda de Sofía Navarro y Martín León, cronograma e invitados existentes.; HU12: Catálogo metodológico: no existe en el contrato actual.; HU13: Proyecto de la boda de Sofía Navarro y Martín León.; HU14: Proyecto en fase PLANIFICACION y actividades operativas.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E03-Proyecto; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA069.
- **Resultado obtenido:** La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado.
- **Interpretación:** Funcionalidad no implementada; el criterio no puede cumplirse todavía.
- **Evidencia directa:** test/E03-Proyecto/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: flujo-actualizacion. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E03-Proyecto/evidencias/casos-prueba.json; test/E03-Proyecto/evidencias/resultado.md; test/E03-Proyecto/resultado-final.md.

### CP-E03-HU14-04 — Flexibilidad del flujo de planificación

- **Épica:** E03-Proyecto — Proyecto.
- **Historia de usuario asociada:** HU14.
- **Criterios de aceptación asociados:** CA070.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** PASS.
- **Objetivo:** Flexibilidad del flujo de planificación.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU10: Daniela Ramírez Torres y la boda de Sofía Navarro y Martín León.; HU11: Boda de Sofía Navarro y Martín León, cronograma e invitados existentes.; HU12: Catálogo metodológico: no existe en el contrato actual.; HU13: Proyecto de la boda de Sofía Navarro y Martín León.; HU14: Proyecto en fase PLANIFICACION y actividades operativas.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E03-Proyecto; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA070.
- **Resultado obtenido:** La lógica existente respondió conforme al criterio técnico evaluado.
- **Interpretación:** El criterio evaluado cuenta con soporte backend actual.
- **Evidencia directa:** test/E03-Proyecto/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Sin mensajes técnicos adicionales; revisar la evidencia de la épica.
- **Clasificación del hallazgo:** Criterio acreditado por la ejecución o auditoría registrada.
- **Trazabilidad de archivos:** test/E03-Proyecto/evidencias/casos-prueba.json; test/E03-Proyecto/evidencias/resultado.md; test/E03-Proyecto/resultado-final.md.

### CP-E04-HU15-01 — Registro valido de actividad e incorporacion al cronograma

- **Épica:** E04-Cronograma — Cronograma.
- **Historia de usuario asociada:** HU15.
- **Criterios de aceptación asociados:** CA071, CA073.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Registro valido de actividad e incorporacion al cronograma.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU15: Valeria Campos y “Confirmar repertorio musical para la ceremonia”.; HU16: Equipo de Luciana Rios y Mateo Salazar.; HU17: Hito “Ceremonia lista para confirmar”.; HU18: Actividad “Validar distribucion de mesas”.; HU19: “Confirmar repertorio musical” -> “Ensayo de ceremonia”.; HU20: “Revisar contrato del fotografo”.; HU21: “Aprobar lista de invitados” -> “Enviar invitaciones”.; HU22: Plantillas reales cr_plantilla_actividad y cr_plantilla_dependencia.; HU23: “Ingreso de los novios” e “Inicio de la ceremonia”.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E04-Cronograma; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA071, CA073.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretación:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Evidencia directa:** test/E04-Cronograma/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: actividad-con-categoria. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E04-Cronograma/evidencias/casos-prueba.json; test/E04-Cronograma/evidencias/resultado.md; test/E04-Cronograma/resultado-final.md.

### CP-E04-HU15-02 — Validacion de datos obligatorios de actividad

- **Épica:** E04-Cronograma — Cronograma.
- **Historia de usuario asociada:** HU15.
- **Criterios de aceptación asociados:** CA072.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Validacion de datos obligatorios de actividad.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU15: Valeria Campos y “Confirmar repertorio musical para la ceremonia”.; HU16: Equipo de Luciana Rios y Mateo Salazar.; HU17: Hito “Ceremonia lista para confirmar”.; HU18: Actividad “Validar distribucion de mesas”.; HU19: “Confirmar repertorio musical” -> “Ensayo de ceremonia”.; HU20: “Revisar contrato del fotografo”.; HU21: “Aprobar lista de invitados” -> “Enviar invitaciones”.; HU22: Plantillas reales cr_plantilla_actividad y cr_plantilla_dependencia.; HU23: “Ingreso de los novios” e “Inicio de la ceremonia”.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E04-Cronograma; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA072.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretación:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Evidencia directa:** test/E04-Cronograma/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: actividad-validacion. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.; Funcionalidad no implementada: actividad-validacion. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.; Funcionalidad no implementada: actividad-validacion. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.; Funcionalidad no implementada: actividad-validacion. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E04-Cronograma/evidencias/casos-prueba.json; test/E04-Cronograma/evidencias/resultado.md; test/E04-Cronograma/resultado-final.md.

### CP-E04-HU15-03 — Edicion de una actividad existente

- **Épica:** E04-Cronograma — Cronograma.
- **Historia de usuario asociada:** HU15.
- **Criterios de aceptación asociados:** CA074.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** PASS.
- **Objetivo:** Edicion de una actividad existente.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU15: Valeria Campos y “Confirmar repertorio musical para la ceremonia”.; HU16: Equipo de Luciana Rios y Mateo Salazar.; HU17: Hito “Ceremonia lista para confirmar”.; HU18: Actividad “Validar distribucion de mesas”.; HU19: “Confirmar repertorio musical” -> “Ensayo de ceremonia”.; HU20: “Revisar contrato del fotografo”.; HU21: “Aprobar lista de invitados” -> “Enviar invitaciones”.; HU22: Plantillas reales cr_plantilla_actividad y cr_plantilla_dependencia.; HU23: “Ingreso de los novios” e “Inicio de la ceremonia”.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E04-Cronograma; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA074.
- **Resultado obtenido:** La capacidad backend evaluada esta disponible en la implementacion actual.
- **Interpretación:** Criterio tecnico cubierto por la implementacion actual.
- **Evidencia directa:** test/E04-Cronograma/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Sin mensajes técnicos adicionales; revisar la evidencia de la épica.
- **Clasificación del hallazgo:** Criterio acreditado por la ejecución o auditoría registrada.
- **Trazabilidad de archivos:** test/E04-Cronograma/evidencias/casos-prueba.json; test/E04-Cronograma/evidencias/resultado.md; test/E04-Cronograma/resultado-final.md.

### CP-E04-HU15-04 — Cambio de responsable

- **Épica:** E04-Cronograma — Cronograma.
- **Historia de usuario asociada:** HU15.
- **Criterios de aceptación asociados:** CA075.
- **Tipo de prueba:** MIXTO.
- **Estado final:** FAIL.
- **Objetivo:** Cambio de responsable.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU15: Valeria Campos y “Confirmar repertorio musical para la ceremonia”.; HU16: Equipo de Luciana Rios y Mateo Salazar.; HU17: Hito “Ceremonia lista para confirmar”.; HU18: Actividad “Validar distribucion de mesas”.; HU19: “Confirmar repertorio musical” -> “Ensayo de ceremonia”.; HU20: “Revisar contrato del fotografo”.; HU21: “Aprobar lista de invitados” -> “Enviar invitaciones”.; HU22: Plantillas reales cr_plantilla_actividad y cr_plantilla_dependencia.; HU23: “Ingreso de los novios” e “Inicio de la ceremonia”.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E04-Cronograma; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA075.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretación:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Evidencia directa:** test/E04-Cronograma/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: historial-asignacion. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E04-Cronograma/evidencias/casos-prueba.json; test/E04-Cronograma/evidencias/resultado.md; test/E04-Cronograma/resultado-final.md.

### CP-E04-HU16-01 — Supervision centralizada por miembro

- **Épica:** E04-Cronograma — Cronograma.
- **Historia de usuario asociada:** HU16.
- **Criterios de aceptación asociados:** CA076, CA077.
- **Tipo de prueba:** MIXTO.
- **Estado final:** FAIL.
- **Objetivo:** Supervision centralizada por miembro.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU15: Valeria Campos y “Confirmar repertorio musical para la ceremonia”.; HU16: Equipo de Luciana Rios y Mateo Salazar.; HU17: Hito “Ceremonia lista para confirmar”.; HU18: Actividad “Validar distribucion de mesas”.; HU19: “Confirmar repertorio musical” -> “Ensayo de ceremonia”.; HU20: “Revisar contrato del fotografo”.; HU21: “Aprobar lista de invitados” -> “Enviar invitaciones”.; HU22: Plantillas reales cr_plantilla_actividad y cr_plantilla_dependencia.; HU23: “Ingreso de los novios” e “Inicio de la ceremonia”.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E04-Cronograma; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA076, CA077.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretación:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Evidencia directa:** test/E04-Cronograma/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: panel-por-miembro. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E04-Cronograma/evidencias/casos-prueba.json; test/E04-Cronograma/evidencias/resultado.md; test/E04-Cronograma/resultado-final.md.

### CP-E04-HU16-02 — Calculo de avance por miembro o frente

- **Épica:** E04-Cronograma — Cronograma.
- **Historia de usuario asociada:** HU16.
- **Criterios de aceptación asociados:** CA078.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Calculo de avance por miembro o frente.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU15: Valeria Campos y “Confirmar repertorio musical para la ceremonia”.; HU16: Equipo de Luciana Rios y Mateo Salazar.; HU17: Hito “Ceremonia lista para confirmar”.; HU18: Actividad “Validar distribucion de mesas”.; HU19: “Confirmar repertorio musical” -> “Ensayo de ceremonia”.; HU20: “Revisar contrato del fotografo”.; HU21: “Aprobar lista de invitados” -> “Enviar invitaciones”.; HU22: Plantillas reales cr_plantilla_actividad y cr_plantilla_dependencia.; HU23: “Ingreso de los novios” e “Inicio de la ceremonia”.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E04-Cronograma; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA078.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretación:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Evidencia directa:** test/E04-Cronograma/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: avance-por-miembro. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E04-Cronograma/evidencias/casos-prueba.json; test/E04-Cronograma/evidencias/resultado.md; test/E04-Cronograma/resultado-final.md.

### CP-E04-HU16-03 — Actualizacion del panel tras cambios

- **Épica:** E04-Cronograma — Cronograma.
- **Historia de usuario asociada:** HU16.
- **Criterios de aceptación asociados:** CA079.
- **Tipo de prueba:** MIXTO.
- **Estado final:** FAIL.
- **Objetivo:** Actualizacion del panel tras cambios.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU15: Valeria Campos y “Confirmar repertorio musical para la ceremonia”.; HU16: Equipo de Luciana Rios y Mateo Salazar.; HU17: Hito “Ceremonia lista para confirmar”.; HU18: Actividad “Validar distribucion de mesas”.; HU19: “Confirmar repertorio musical” -> “Ensayo de ceremonia”.; HU20: “Revisar contrato del fotografo”.; HU21: “Aprobar lista de invitados” -> “Enviar invitaciones”.; HU22: Plantillas reales cr_plantilla_actividad y cr_plantilla_dependencia.; HU23: “Ingreso de los novios” e “Inicio de la ceremonia”.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E04-Cronograma; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA079.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretación:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Evidencia directa:** test/E04-Cronograma/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: panel-por-miembro. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E04-Cronograma/evidencias/casos-prueba.json; test/E04-Cronograma/evidencias/resultado.md; test/E04-Cronograma/resultado-final.md.

### CP-E04-HU16-04 — Identificacion de retrasadas y proximas a vencer

- **Épica:** E04-Cronograma — Cronograma.
- **Historia de usuario asociada:** HU16.
- **Criterios de aceptación asociados:** CA080.
- **Tipo de prueba:** MIXTO.
- **Estado final:** FAIL.
- **Objetivo:** Identificacion de retrasadas y proximas a vencer.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU15: Valeria Campos y “Confirmar repertorio musical para la ceremonia”.; HU16: Equipo de Luciana Rios y Mateo Salazar.; HU17: Hito “Ceremonia lista para confirmar”.; HU18: Actividad “Validar distribucion de mesas”.; HU19: “Confirmar repertorio musical” -> “Ensayo de ceremonia”.; HU20: “Revisar contrato del fotografo”.; HU21: “Aprobar lista de invitados” -> “Enviar invitaciones”.; HU22: Plantillas reales cr_plantilla_actividad y cr_plantilla_dependencia.; HU23: “Ingreso de los novios” e “Inicio de la ceremonia”.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E04-Cronograma; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA080.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretación:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Evidencia directa:** test/E04-Cronograma/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: panel-retrasadas-proximas. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E04-Cronograma/evidencias/casos-prueba.json; test/E04-Cronograma/evidencias/resultado.md; test/E04-Cronograma/resultado-final.md.

### CP-E04-HU17-01 — Consulta y filtrado de hitos

- **Épica:** E04-Cronograma — Cronograma.
- **Historia de usuario asociada:** HU17.
- **Criterios de aceptación asociados:** CA081, CA082, CA084.
- **Tipo de prueba:** MIXTO.
- **Estado final:** PASS.
- **Objetivo:** Consulta y filtrado de hitos.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU15: Valeria Campos y “Confirmar repertorio musical para la ceremonia”.; HU16: Equipo de Luciana Rios y Mateo Salazar.; HU17: Hito “Ceremonia lista para confirmar”.; HU18: Actividad “Validar distribucion de mesas”.; HU19: “Confirmar repertorio musical” -> “Ensayo de ceremonia”.; HU20: “Revisar contrato del fotografo”.; HU21: “Aprobar lista de invitados” -> “Enviar invitaciones”.; HU22: Plantillas reales cr_plantilla_actividad y cr_plantilla_dependencia.; HU23: “Ingreso de los novios” e “Inicio de la ceremonia”.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E04-Cronograma; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA081, CA082, CA084.
- **Resultado obtenido:** La capacidad backend evaluada esta disponible en la implementacion actual.
- **Interpretación:** Criterio tecnico cubierto por la implementacion actual.
- **Evidencia directa:** test/E04-Cronograma/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Sin mensajes técnicos adicionales; revisar la evidencia de la épica.
- **Clasificación del hallazgo:** Criterio acreditado por la ejecución o auditoría registrada.
- **Trazabilidad de archivos:** test/E04-Cronograma/evidencias/casos-prueba.json; test/E04-Cronograma/evidencias/resultado.md; test/E04-Cronograma/resultado-final.md.

### CP-E04-HU17-02 — Cumplimiento automatico de un hito

- **Épica:** E04-Cronograma — Cronograma.
- **Historia de usuario asociada:** HU17.
- **Criterios de aceptación asociados:** CA083.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Cumplimiento automatico de un hito.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU15: Valeria Campos y “Confirmar repertorio musical para la ceremonia”.; HU16: Equipo de Luciana Rios y Mateo Salazar.; HU17: Hito “Ceremonia lista para confirmar”.; HU18: Actividad “Validar distribucion de mesas”.; HU19: “Confirmar repertorio musical” -> “Ensayo de ceremonia”.; HU20: “Revisar contrato del fotografo”.; HU21: “Aprobar lista de invitados” -> “Enviar invitaciones”.; HU22: Plantillas reales cr_plantilla_actividad y cr_plantilla_dependencia.; HU23: “Ingreso de los novios” e “Inicio de la ceremonia”.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E04-Cronograma; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA083.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretación:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Evidencia directa:** test/E04-Cronograma/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: cumplimiento-automatico-hito. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E04-Cronograma/evidencias/casos-prueba.json; test/E04-Cronograma/evidencias/resultado.md; test/E04-Cronograma/resultado-final.md.

### CP-E04-HU17-03 — Hitos cumplidos en avance e historial

- **Épica:** E04-Cronograma — Cronograma.
- **Historia de usuario asociada:** HU17.
- **Criterios de aceptación asociados:** CA085.
- **Tipo de prueba:** MIXTO.
- **Estado final:** FAIL.
- **Objetivo:** Hitos cumplidos en avance e historial.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU15: Valeria Campos y “Confirmar repertorio musical para la ceremonia”.; HU16: Equipo de Luciana Rios y Mateo Salazar.; HU17: Hito “Ceremonia lista para confirmar”.; HU18: Actividad “Validar distribucion de mesas”.; HU19: “Confirmar repertorio musical” -> “Ensayo de ceremonia”.; HU20: “Revisar contrato del fotografo”.; HU21: “Aprobar lista de invitados” -> “Enviar invitaciones”.; HU22: Plantillas reales cr_plantilla_actividad y cr_plantilla_dependencia.; HU23: “Ingreso de los novios” e “Inicio de la ceremonia”.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E04-Cronograma; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA085.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretación:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Evidencia directa:** test/E04-Cronograma/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: historial-hitos. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E04-Cronograma/evidencias/casos-prueba.json; test/E04-Cronograma/evidencias/resultado.md; test/E04-Cronograma/resultado-final.md.

### CP-E04-HU18-01 — Configuracion de anticipaciones

- **Épica:** E04-Cronograma — Cronograma.
- **Historia de usuario asociada:** HU18.
- **Criterios de aceptación asociados:** CA086.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Configuracion de anticipaciones.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU15: Valeria Campos y “Confirmar repertorio musical para la ceremonia”.; HU16: Equipo de Luciana Rios y Mateo Salazar.; HU17: Hito “Ceremonia lista para confirmar”.; HU18: Actividad “Validar distribucion de mesas”.; HU19: “Confirmar repertorio musical” -> “Ensayo de ceremonia”.; HU20: “Revisar contrato del fotografo”.; HU21: “Aprobar lista de invitados” -> “Enviar invitaciones”.; HU22: Plantillas reales cr_plantilla_actividad y cr_plantilla_dependencia.; HU23: “Ingreso de los novios” e “Inicio de la ceremonia”.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E04-Cronograma; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA086.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretación:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Evidencia directa:** test/E04-Cronograma/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: anticipaciones-configurables. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E04-Cronograma/evidencias/casos-prueba.json; test/E04-Cronograma/evidencias/resultado.md; test/E04-Cronograma/resultado-final.md.

### CP-E04-HU18-02 — Generacion de alerta de vencimiento

- **Épica:** E04-Cronograma — Cronograma.
- **Historia de usuario asociada:** HU18.
- **Criterios de aceptación asociados:** CA087, CA088.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** PASS.
- **Objetivo:** Generacion de alerta de vencimiento.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU15: Valeria Campos y “Confirmar repertorio musical para la ceremonia”.; HU16: Equipo de Luciana Rios y Mateo Salazar.; HU17: Hito “Ceremonia lista para confirmar”.; HU18: Actividad “Validar distribucion de mesas”.; HU19: “Confirmar repertorio musical” -> “Ensayo de ceremonia”.; HU20: “Revisar contrato del fotografo”.; HU21: “Aprobar lista de invitados” -> “Enviar invitaciones”.; HU22: Plantillas reales cr_plantilla_actividad y cr_plantilla_dependencia.; HU23: “Ingreso de los novios” e “Inicio de la ceremonia”.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E04-Cronograma; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA087, CA088.
- **Resultado obtenido:** La capacidad backend evaluada esta disponible en la implementacion actual.
- **Interpretación:** Criterio tecnico cubierto por la implementacion actual.
- **Evidencia directa:** test/E04-Cronograma/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Sin mensajes técnicos adicionales; revisar la evidencia de la épica.
- **Clasificación del hallazgo:** Criterio acreditado por la ejecución o auditoría registrada.
- **Trazabilidad de archivos:** test/E04-Cronograma/evidencias/casos-prueba.json; test/E04-Cronograma/evidencias/resultado.md; test/E04-Cronograma/resultado-final.md.

### CP-E04-HU18-03 — Acceso al detalle desde alerta

- **Épica:** E04-Cronograma — Cronograma.
- **Historia de usuario asociada:** HU18.
- **Criterios de aceptación asociados:** CA089.
- **Tipo de prueba:** MIXTO.
- **Estado final:** FAIL.
- **Objetivo:** Acceso al detalle desde alerta.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU15: Valeria Campos y “Confirmar repertorio musical para la ceremonia”.; HU16: Equipo de Luciana Rios y Mateo Salazar.; HU17: Hito “Ceremonia lista para confirmar”.; HU18: Actividad “Validar distribucion de mesas”.; HU19: “Confirmar repertorio musical” -> “Ensayo de ceremonia”.; HU20: “Revisar contrato del fotografo”.; HU21: “Aprobar lista de invitados” -> “Enviar invitaciones”.; HU22: Plantillas reales cr_plantilla_actividad y cr_plantilla_dependencia.; HU23: “Ingreso de los novios” e “Inicio de la ceremonia”.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E04-Cronograma; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA089.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretación:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Evidencia directa:** test/E04-Cronograma/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: enlace-detalle-alerta. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E04-Cronograma/evidencias/casos-prueba.json; test/E04-Cronograma/evidencias/resultado.md; test/E04-Cronograma/resultado-final.md.

### CP-E04-HU18-04 — Supresion de alertas para actividades no vigentes

- **Épica:** E04-Cronograma — Cronograma.
- **Historia de usuario asociada:** HU18.
- **Criterios de aceptación asociados:** CA090.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Supresion de alertas para actividades no vigentes.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU15: Valeria Campos y “Confirmar repertorio musical para la ceremonia”.; HU16: Equipo de Luciana Rios y Mateo Salazar.; HU17: Hito “Ceremonia lista para confirmar”.; HU18: Actividad “Validar distribucion de mesas”.; HU19: “Confirmar repertorio musical” -> “Ensayo de ceremonia”.; HU20: “Revisar contrato del fotografo”.; HU21: “Aprobar lista de invitados” -> “Enviar invitaciones”.; HU22: Plantillas reales cr_plantilla_actividad y cr_plantilla_dependencia.; HU23: “Ingreso de los novios” e “Inicio de la ceremonia”.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E04-Cronograma; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA090.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretación:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Evidencia directa:** test/E04-Cronograma/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: supresion-alertas. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.; Funcionalidad no implementada: supresion-alertas. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.; Funcionalidad no implementada: supresion-alertas. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E04-Cronograma/evidencias/casos-prueba.json; test/E04-Cronograma/evidencias/resultado.md; test/E04-Cronograma/resultado-final.md.

### CP-E04-HU19-01 — Reprogramacion y conservacion del valor anterior

- **Épica:** E04-Cronograma — Cronograma.
- **Historia de usuario asociada:** HU19.
- **Criterios de aceptación asociados:** CA091.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Reprogramacion y conservacion del valor anterior.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU15: Valeria Campos y “Confirmar repertorio musical para la ceremonia”.; HU16: Equipo de Luciana Rios y Mateo Salazar.; HU17: Hito “Ceremonia lista para confirmar”.; HU18: Actividad “Validar distribucion de mesas”.; HU19: “Confirmar repertorio musical” -> “Ensayo de ceremonia”.; HU20: “Revisar contrato del fotografo”.; HU21: “Aprobar lista de invitados” -> “Enviar invitaciones”.; HU22: Plantillas reales cr_plantilla_actividad y cr_plantilla_dependencia.; HU23: “Ingreso de los novios” e “Inicio de la ceremonia”.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E04-Cronograma; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA091.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretación:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Evidencia directa:** test/E04-Cronograma/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: historial-reprogramacion. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E04-Cronograma/evidencias/casos-prueba.json; test/E04-Cronograma/evidencias/resultado.md; test/E04-Cronograma/resultado-final.md.

### CP-E04-HU19-02 — Margen de seguridad

- **Épica:** E04-Cronograma — Cronograma.
- **Historia de usuario asociada:** HU19.
- **Criterios de aceptación asociados:** CA092.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Margen de seguridad.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU15: Valeria Campos y “Confirmar repertorio musical para la ceremonia”.; HU16: Equipo de Luciana Rios y Mateo Salazar.; HU17: Hito “Ceremonia lista para confirmar”.; HU18: Actividad “Validar distribucion de mesas”.; HU19: “Confirmar repertorio musical” -> “Ensayo de ceremonia”.; HU20: “Revisar contrato del fotografo”.; HU21: “Aprobar lista de invitados” -> “Enviar invitaciones”.; HU22: Plantillas reales cr_plantilla_actividad y cr_plantilla_dependencia.; HU23: “Ingreso de los novios” e “Inicio de la ceremonia”.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E04-Cronograma; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA092.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretación:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Evidencia directa:** test/E04-Cronograma/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: margen-seguridad. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E04-Cronograma/evidencias/casos-prueba.json; test/E04-Cronograma/evidencias/resultado.md; test/E04-Cronograma/resultado-final.md.

### CP-E04-HU19-03 — Deteccion de conflictos por reprogramacion

- **Épica:** E04-Cronograma — Cronograma.
- **Historia de usuario asociada:** HU19.
- **Criterios de aceptación asociados:** CA093.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** PASS.
- **Objetivo:** Deteccion de conflictos por reprogramacion.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU15: Valeria Campos y “Confirmar repertorio musical para la ceremonia”.; HU16: Equipo de Luciana Rios y Mateo Salazar.; HU17: Hito “Ceremonia lista para confirmar”.; HU18: Actividad “Validar distribucion de mesas”.; HU19: “Confirmar repertorio musical” -> “Ensayo de ceremonia”.; HU20: “Revisar contrato del fotografo”.; HU21: “Aprobar lista de invitados” -> “Enviar invitaciones”.; HU22: Plantillas reales cr_plantilla_actividad y cr_plantilla_dependencia.; HU23: “Ingreso de los novios” e “Inicio de la ceremonia”.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E04-Cronograma; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA093.
- **Resultado obtenido:** La capacidad backend evaluada esta disponible en la implementacion actual.
- **Interpretación:** Criterio tecnico cubierto por la implementacion actual.
- **Evidencia directa:** test/E04-Cronograma/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Sin mensajes técnicos adicionales; revisar la evidencia de la épica.
- **Clasificación del hallazgo:** Criterio acreditado por la ejecución o auditoría registrada.
- **Trazabilidad de archivos:** test/E04-Cronograma/evidencias/casos-prueba.json; test/E04-Cronograma/evidencias/resultado.md; test/E04-Cronograma/resultado-final.md.

### CP-E04-HU19-04 — Impacto por cambio de fecha del matrimonio

- **Épica:** E04-Cronograma — Cronograma.
- **Historia de usuario asociada:** HU19.
- **Criterios de aceptación asociados:** CA094.
- **Tipo de prueba:** MIXTO.
- **Estado final:** FAIL.
- **Objetivo:** Impacto por cambio de fecha del matrimonio.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU15: Valeria Campos y “Confirmar repertorio musical para la ceremonia”.; HU16: Equipo de Luciana Rios y Mateo Salazar.; HU17: Hito “Ceremonia lista para confirmar”.; HU18: Actividad “Validar distribucion de mesas”.; HU19: “Confirmar repertorio musical” -> “Ensayo de ceremonia”.; HU20: “Revisar contrato del fotografo”.; HU21: “Aprobar lista de invitados” -> “Enviar invitaciones”.; HU22: Plantillas reales cr_plantilla_actividad y cr_plantilla_dependencia.; HU23: “Ingreso de los novios” e “Inicio de la ceremonia”.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E04-Cronograma; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA094.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretación:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Evidencia directa:** test/E04-Cronograma/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: impacto-fecha-matrimonio. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E04-Cronograma/evidencias/casos-prueba.json; test/E04-Cronograma/evidencias/resultado.md; test/E04-Cronograma/resultado-final.md.

### CP-E04-HU20-01 — Cambio de estado y actualizacion del avance

- **Épica:** E04-Cronograma — Cronograma.
- **Historia de usuario asociada:** HU20.
- **Criterios de aceptación asociados:** CA095, CA098.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** PASS.
- **Objetivo:** Cambio de estado y actualizacion del avance.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU15: Valeria Campos y “Confirmar repertorio musical para la ceremonia”.; HU16: Equipo de Luciana Rios y Mateo Salazar.; HU17: Hito “Ceremonia lista para confirmar”.; HU18: Actividad “Validar distribucion de mesas”.; HU19: “Confirmar repertorio musical” -> “Ensayo de ceremonia”.; HU20: “Revisar contrato del fotografo”.; HU21: “Aprobar lista de invitados” -> “Enviar invitaciones”.; HU22: Plantillas reales cr_plantilla_actividad y cr_plantilla_dependencia.; HU23: “Ingreso de los novios” e “Inicio de la ceremonia”.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E04-Cronograma; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA095, CA098.
- **Resultado obtenido:** La capacidad backend evaluada esta disponible en la implementacion actual.
- **Interpretación:** Criterio tecnico cubierto por la implementacion actual.
- **Evidencia directa:** test/E04-Cronograma/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Sin mensajes técnicos adicionales; revisar la evidencia de la épica.
- **Clasificación del hallazgo:** Criterio acreditado por la ejecución o auditoría registrada.
- **Trazabilidad de archivos:** test/E04-Cronograma/evidencias/casos-prueba.json; test/E04-Cronograma/evidencias/resultado.md; test/E04-Cronograma/resultado-final.md.

### CP-E04-HU20-02 — Deteccion automatica de retraso

- **Épica:** E04-Cronograma — Cronograma.
- **Historia de usuario asociada:** HU20.
- **Criterios de aceptación asociados:** CA096.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Deteccion automatica de retraso.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU15: Valeria Campos y “Confirmar repertorio musical para la ceremonia”.; HU16: Equipo de Luciana Rios y Mateo Salazar.; HU17: Hito “Ceremonia lista para confirmar”.; HU18: Actividad “Validar distribucion de mesas”.; HU19: “Confirmar repertorio musical” -> “Ensayo de ceremonia”.; HU20: “Revisar contrato del fotografo”.; HU21: “Aprobar lista de invitados” -> “Enviar invitaciones”.; HU22: Plantillas reales cr_plantilla_actividad y cr_plantilla_dependencia.; HU23: “Ingreso de los novios” e “Inicio de la ceremonia”.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E04-Cronograma; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA096.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretación:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Evidencia directa:** test/E04-Cronograma/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: retrasadas-regla-completa. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E04-Cronograma/evidencias/casos-prueba.json; test/E04-Cronograma/evidencias/resultado.md; test/E04-Cronograma/resultado-final.md.

### CP-E04-HU20-03 — Bloqueo de completado por dependencia pendiente

- **Épica:** E04-Cronograma — Cronograma.
- **Historia de usuario asociada:** HU20.
- **Criterios de aceptación asociados:** CA097, CA102.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Bloqueo de completado por dependencia pendiente.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU15: Valeria Campos y “Confirmar repertorio musical para la ceremonia”.; HU16: Equipo de Luciana Rios y Mateo Salazar.; HU17: Hito “Ceremonia lista para confirmar”.; HU18: Actividad “Validar distribucion de mesas”.; HU19: “Confirmar repertorio musical” -> “Ensayo de ceremonia”.; HU20: “Revisar contrato del fotografo”.; HU21: “Aprobar lista de invitados” -> “Enviar invitaciones”.; HU22: Plantillas reales cr_plantilla_actividad y cr_plantilla_dependencia.; HU23: “Ingreso de los novios” e “Inicio de la ceremonia”.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E04-Cronograma; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA097, CA102.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretación:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Evidencia directa:** test/E04-Cronograma/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: bloqueo-completado-dependencia. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E04-Cronograma/evidencias/casos-prueba.json; test/E04-Cronograma/evidencias/resultado.md; test/E04-Cronograma/resultado-final.md.

### CP-E04-HU20-04 — Autorizacion e identificacion de cambios de estado

- **Épica:** E04-Cronograma — Cronograma.
- **Historia de usuario asociada:** HU20.
- **Criterios de aceptación asociados:** CA099.
- **Tipo de prueba:** MIXTO.
- **Estado final:** FAIL.
- **Objetivo:** Autorizacion e identificacion de cambios de estado.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU15: Valeria Campos y “Confirmar repertorio musical para la ceremonia”.; HU16: Equipo de Luciana Rios y Mateo Salazar.; HU17: Hito “Ceremonia lista para confirmar”.; HU18: Actividad “Validar distribucion de mesas”.; HU19: “Confirmar repertorio musical” -> “Ensayo de ceremonia”.; HU20: “Revisar contrato del fotografo”.; HU21: “Aprobar lista de invitados” -> “Enviar invitaciones”.; HU22: Plantillas reales cr_plantilla_actividad y cr_plantilla_dependencia.; HU23: “Ingreso de los novios” e “Inicio de la ceremonia”.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E04-Cronograma; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA099.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretación:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Evidencia directa:** test/E04-Cronograma/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: historial-cambio-estado. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E04-Cronograma/evidencias/casos-prueba.json; test/E04-Cronograma/evidencias/resultado.md; test/E04-Cronograma/resultado-final.md.

### CP-E04-HU21-01 — Creacion de dependencias y prevencion de ciclos

- **Épica:** E04-Cronograma — Cronograma.
- **Historia de usuario asociada:** HU21.
- **Criterios de aceptación asociados:** CA100, CA101.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** PASS.
- **Objetivo:** Creacion de dependencias y prevencion de ciclos.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU15: Valeria Campos y “Confirmar repertorio musical para la ceremonia”.; HU16: Equipo de Luciana Rios y Mateo Salazar.; HU17: Hito “Ceremonia lista para confirmar”.; HU18: Actividad “Validar distribucion de mesas”.; HU19: “Confirmar repertorio musical” -> “Ensayo de ceremonia”.; HU20: “Revisar contrato del fotografo”.; HU21: “Aprobar lista de invitados” -> “Enviar invitaciones”.; HU22: Plantillas reales cr_plantilla_actividad y cr_plantilla_dependencia.; HU23: “Ingreso de los novios” e “Inicio de la ceremonia”.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E04-Cronograma; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA100, CA101.
- **Resultado obtenido:** La capacidad backend evaluada esta disponible en la implementacion actual.
- **Interpretación:** Criterio tecnico cubierto por la implementacion actual.
- **Evidencia directa:** test/E04-Cronograma/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Sin mensajes técnicos adicionales; revisar la evidencia de la épica.
- **Clasificación del hallazgo:** Criterio acreditado por la ejecución o auditoría registrada.
- **Trazabilidad de archivos:** test/E04-Cronograma/evidencias/casos-prueba.json; test/E04-Cronograma/evidencias/resultado.md; test/E04-Cronograma/resultado-final.md.

### CP-E04-HU21-02 — Dependencias sugeridas y personalizables

- **Épica:** E04-Cronograma — Cronograma.
- **Historia de usuario asociada:** HU21.
- **Criterios de aceptación asociados:** CA103, CA104.
- **Tipo de prueba:** MIXTO.
- **Estado final:** FAIL.
- **Objetivo:** Dependencias sugeridas y personalizables.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU15: Valeria Campos y “Confirmar repertorio musical para la ceremonia”.; HU16: Equipo de Luciana Rios y Mateo Salazar.; HU17: Hito “Ceremonia lista para confirmar”.; HU18: Actividad “Validar distribucion de mesas”.; HU19: “Confirmar repertorio musical” -> “Ensayo de ceremonia”.; HU20: “Revisar contrato del fotografo”.; HU21: “Aprobar lista de invitados” -> “Enviar invitaciones”.; HU22: Plantillas reales cr_plantilla_actividad y cr_plantilla_dependencia.; HU23: “Ingreso de los novios” e “Inicio de la ceremonia”.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E04-Cronograma; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA103, CA104.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretación:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Evidencia directa:** test/E04-Cronograma/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: dependencias-sugeridas. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E04-Cronograma/evidencias/casos-prueba.json; test/E04-Cronograma/evidencias/resultado.md; test/E04-Cronograma/resultado-final.md.

### CP-E04-HU22-01 — Consulta de tareas sugeridas

- **Épica:** E04-Cronograma — Cronograma.
- **Historia de usuario asociada:** HU22.
- **Criterios de aceptación asociados:** CA105.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Consulta de tareas sugeridas.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU15: Valeria Campos y “Confirmar repertorio musical para la ceremonia”.; HU16: Equipo de Luciana Rios y Mateo Salazar.; HU17: Hito “Ceremonia lista para confirmar”.; HU18: Actividad “Validar distribucion de mesas”.; HU19: “Confirmar repertorio musical” -> “Ensayo de ceremonia”.; HU20: “Revisar contrato del fotografo”.; HU21: “Aprobar lista de invitados” -> “Enviar invitaciones”.; HU22: Plantillas reales cr_plantilla_actividad y cr_plantilla_dependencia.; HU23: “Ingreso de los novios” e “Inicio de la ceremonia”.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E04-Cronograma; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA105.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretación:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Evidencia directa:** test/E04-Cronograma/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: catalogo-sugerencias. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E04-Cronograma/evidencias/casos-prueba.json; test/E04-Cronograma/evidencias/resultado.md; test/E04-Cronograma/resultado-final.md.

### CP-E04-HU22-02 — Seleccion y personalizacion de tareas sugeridas

- **Épica:** E04-Cronograma — Cronograma.
- **Historia de usuario asociada:** HU22.
- **Criterios de aceptación asociados:** CA106, CA107, CA109.
- **Tipo de prueba:** MIXTO.
- **Estado final:** FAIL.
- **Objetivo:** Seleccion y personalizacion de tareas sugeridas.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU15: Valeria Campos y “Confirmar repertorio musical para la ceremonia”.; HU16: Equipo de Luciana Rios y Mateo Salazar.; HU17: Hito “Ceremonia lista para confirmar”.; HU18: Actividad “Validar distribucion de mesas”.; HU19: “Confirmar repertorio musical” -> “Ensayo de ceremonia”.; HU20: “Revisar contrato del fotografo”.; HU21: “Aprobar lista de invitados” -> “Enviar invitaciones”.; HU22: Plantillas reales cr_plantilla_actividad y cr_plantilla_dependencia.; HU23: “Ingreso de los novios” e “Inicio de la ceremonia”.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E04-Cronograma; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA106, CA107, CA109.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretación:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Evidencia directa:** test/E04-Cronograma/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: seleccion-sugerencia. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E04-Cronograma/evidencias/casos-prueba.json; test/E04-Cronograma/evidencias/resultado.md; test/E04-Cronograma/resultado-final.md.

### CP-E04-HU22-03 — Creacion de instancia independiente desde sugerencia

- **Épica:** E04-Cronograma — Cronograma.
- **Historia de usuario asociada:** HU22.
- **Criterios de aceptación asociados:** CA108.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Creacion de instancia independiente desde sugerencia.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU15: Valeria Campos y “Confirmar repertorio musical para la ceremonia”.; HU16: Equipo de Luciana Rios y Mateo Salazar.; HU17: Hito “Ceremonia lista para confirmar”.; HU18: Actividad “Validar distribucion de mesas”.; HU19: “Confirmar repertorio musical” -> “Ensayo de ceremonia”.; HU20: “Revisar contrato del fotografo”.; HU21: “Aprobar lista de invitados” -> “Enviar invitaciones”.; HU22: Plantillas reales cr_plantilla_actividad y cr_plantilla_dependencia.; HU23: “Ingreso de los novios” e “Inicio de la ceremonia”.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E04-Cronograma; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA108.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretación:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Evidencia directa:** test/E04-Cronograma/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: instancia-desde-sugerencia. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E04-Cronograma/evidencias/casos-prueba.json; test/E04-Cronograma/evidencias/resultado.md; test/E04-Cronograma/resultado-final.md.

### CP-E04-HU23-01 — Registro y orden cronologico del timing

- **Épica:** E04-Cronograma — Cronograma.
- **Historia de usuario asociada:** HU23.
- **Criterios de aceptación asociados:** CA110, CA111.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Registro y orden cronologico del timing.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU15: Valeria Campos y “Confirmar repertorio musical para la ceremonia”.; HU16: Equipo de Luciana Rios y Mateo Salazar.; HU17: Hito “Ceremonia lista para confirmar”.; HU18: Actividad “Validar distribucion de mesas”.; HU19: “Confirmar repertorio musical” -> “Ensayo de ceremonia”.; HU20: “Revisar contrato del fotografo”.; HU21: “Aprobar lista de invitados” -> “Enviar invitaciones”.; HU22: Plantillas reales cr_plantilla_actividad y cr_plantilla_dependencia.; HU23: “Ingreso de los novios” e “Inicio de la ceremonia”.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E04-Cronograma; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA110, CA111.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretación:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Evidencia directa:** test/E04-Cronograma/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: timing-con-ubicacion. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E04-Cronograma/evidencias/casos-prueba.json; test/E04-Cronograma/evidencias/resultado.md; test/E04-Cronograma/resultado-final.md.

### CP-E04-HU23-02 — Deteccion de solapamientos incompatibles

- **Épica:** E04-Cronograma — Cronograma.
- **Historia de usuario asociada:** HU23.
- **Criterios de aceptación asociados:** CA112.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Deteccion de solapamientos incompatibles.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU15: Valeria Campos y “Confirmar repertorio musical para la ceremonia”.; HU16: Equipo de Luciana Rios y Mateo Salazar.; HU17: Hito “Ceremonia lista para confirmar”.; HU18: Actividad “Validar distribucion de mesas”.; HU19: “Confirmar repertorio musical” -> “Ensayo de ceremonia”.; HU20: “Revisar contrato del fotografo”.; HU21: “Aprobar lista de invitados” -> “Enviar invitaciones”.; HU22: Plantillas reales cr_plantilla_actividad y cr_plantilla_dependencia.; HU23: “Ingreso de los novios” e “Inicio de la ceremonia”.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E04-Cronograma; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA112.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretación:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Evidencia directa:** test/E04-Cronograma/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: solapamiento-timing. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.; Funcionalidad no implementada: solapamiento-timing. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E04-Cronograma/evidencias/casos-prueba.json; test/E04-Cronograma/evidencias/resultado.md; test/E04-Cronograma/resultado-final.md.

### CP-E04-HU23-03 — Edicion de actividad del timing

- **Épica:** E04-Cronograma — Cronograma.
- **Historia de usuario asociada:** HU23.
- **Criterios de aceptación asociados:** CA113.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** PASS.
- **Objetivo:** Edicion de actividad del timing.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU15: Valeria Campos y “Confirmar repertorio musical para la ceremonia”.; HU16: Equipo de Luciana Rios y Mateo Salazar.; HU17: Hito “Ceremonia lista para confirmar”.; HU18: Actividad “Validar distribucion de mesas”.; HU19: “Confirmar repertorio musical” -> “Ensayo de ceremonia”.; HU20: “Revisar contrato del fotografo”.; HU21: “Aprobar lista de invitados” -> “Enviar invitaciones”.; HU22: Plantillas reales cr_plantilla_actividad y cr_plantilla_dependencia.; HU23: “Ingreso de los novios” e “Inicio de la ceremonia”.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E04-Cronograma; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA113.
- **Resultado obtenido:** La capacidad backend evaluada esta disponible en la implementacion actual.
- **Interpretación:** Criterio tecnico cubierto por la implementacion actual.
- **Evidencia directa:** test/E04-Cronograma/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Sin mensajes técnicos adicionales; revisar la evidencia de la épica.
- **Clasificación del hallazgo:** Criterio acreditado por la ejecución o auditoría registrada.
- **Trazabilidad de archivos:** test/E04-Cronograma/evidencias/casos-prueba.json; test/E04-Cronograma/evidencias/resultado.md; test/E04-Cronograma/resultado-final.md.

### CP-E04-HU23-04 — Exportacion o version compartible del timing

- **Épica:** E04-Cronograma — Cronograma.
- **Historia de usuario asociada:** HU23.
- **Criterios de aceptación asociados:** CA114.
- **Tipo de prueba:** MIXTO.
- **Estado final:** FAIL.
- **Objetivo:** Exportacion o version compartible del timing.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: HU15: Valeria Campos y “Confirmar repertorio musical para la ceremonia”.; HU16: Equipo de Luciana Rios y Mateo Salazar.; HU17: Hito “Ceremonia lista para confirmar”.; HU18: Actividad “Validar distribucion de mesas”.; HU19: “Confirmar repertorio musical” -> “Ensayo de ceremonia”.; HU20: “Revisar contrato del fotografo”.; HU21: “Aprobar lista de invitados” -> “Enviar invitaciones”.; HU22: Plantillas reales cr_plantilla_actividad y cr_plantilla_dependencia.; HU23: “Ingreso de los novios” e “Inicio de la ceremonia”.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E04-Cronograma; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA114.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretación:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Evidencia directa:** test/E04-Cronograma/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: exportacion-timing. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E04-Cronograma/evidencias/casos-prueba.json; test/E04-Cronograma/evidencias/resultado.md; test/E04-Cronograma/resultado-final.md.

### CP-E05-HU24-01 — Registro de costos estimado y real con categoria financiera

- **Épica:** E05-Presupuesto — Presupuesto.
- **Historia de usuario asociada:** HU24.
- **Criterios de aceptación asociados:** CA115, CA116.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Registro de costos estimado y real con categoria financiera.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: Decoracion floral para ceremonia y recepcion; proveedor Jardines del Sol; montos PEN realistas.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E05-Presupuesto; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA115, CA116.
- **Resultado obtenido:** No existe un modulo financiero que cubra el criterio.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints.
- **Evidencia directa:** test/E05-Presupuesto/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: costos-estimado-real. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E05-Presupuesto/evidencias/casos-prueba.json; test/E05-Presupuesto/evidencias/resultado.md; test/E05-Presupuesto/resultado-final.md.

### CP-E05-HU24-02 — Validacion de montos de costo

- **Épica:** E05-Presupuesto — Presupuesto.
- **Historia de usuario asociada:** HU24.
- **Criterios de aceptación asociados:** CA117.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Validacion de montos de costo.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: Decoracion floral para ceremonia y recepcion; proveedor Jardines del Sol; montos PEN realistas.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E05-Presupuesto; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA117.
- **Resultado obtenido:** No existe un modulo financiero que cubra el criterio.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints.
- **Evidencia directa:** test/E05-Presupuesto/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: validacion-montos. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.; Funcionalidad no implementada: validacion-montos. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.; Funcionalidad no implementada: validacion-montos. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.; Funcionalidad no implementada: validacion-montos. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E05-Presupuesto/evidencias/casos-prueba.json; test/E05-Presupuesto/evidencias/resultado.md; test/E05-Presupuesto/resultado-final.md.

### CP-E05-HU24-03 — Actualizacion de costos y desviacion presupuestaria

- **Épica:** E05-Presupuesto — Presupuesto.
- **Historia de usuario asociada:** HU24.
- **Criterios de aceptación asociados:** CA118, CA119.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Actualizacion de costos y desviacion presupuestaria.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: Decoracion floral para ceremonia y recepcion; proveedor Jardines del Sol; montos PEN realistas.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E05-Presupuesto; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA118, CA119.
- **Resultado obtenido:** No existe un modulo financiero que cubra el criterio.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints.
- **Evidencia directa:** test/E05-Presupuesto/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: desviacion-presupuestaria. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E05-Presupuesto/evidencias/casos-prueba.json; test/E05-Presupuesto/evidencias/resultado.md; test/E05-Presupuesto/resultado-final.md.

### CP-E05-HU25-01 — Registro de pago y recalculo de saldo pendiente

- **Épica:** E05-Presupuesto — Presupuesto.
- **Historia de usuario asociada:** HU25.
- **Criterios de aceptación asociados:** CA120, CA121.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Registro de pago y recalculo de saldo pendiente.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: Decoracion floral para ceremonia y recepcion; proveedor Jardines del Sol; montos PEN realistas.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E05-Presupuesto; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA120, CA121.
- **Resultado obtenido:** No existe un modulo financiero que cubra el criterio.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints.
- **Evidencia directa:** test/E05-Presupuesto/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: pagos. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E05-Presupuesto/evidencias/casos-prueba.json; test/E05-Presupuesto/evidencias/resultado.md; test/E05-Presupuesto/resultado-final.md.

### CP-E05-HU25-02 — Validacion del monto de pago

- **Épica:** E05-Presupuesto — Presupuesto.
- **Historia de usuario asociada:** HU25.
- **Criterios de aceptación asociados:** CA122.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Validacion del monto de pago.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: Decoracion floral para ceremonia y recepcion; proveedor Jardines del Sol; montos PEN realistas.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E05-Presupuesto; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA122.
- **Resultado obtenido:** No existe un modulo financiero que cubra el criterio.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints.
- **Evidencia directa:** test/E05-Presupuesto/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: pagos. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.; Funcionalidad no implementada: pagos. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.; Funcionalidad no implementada: pagos. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.; Funcionalidad no implementada: pagos. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.; Funcionalidad no implementada: pagos. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E05-Presupuesto/evidencias/casos-prueba.json; test/E05-Presupuesto/evidencias/resultado.md; test/E05-Presupuesto/resultado-final.md.

### CP-E05-HU25-03 — Comprobante asociado al pago

- **Épica:** E05-Presupuesto — Presupuesto.
- **Historia de usuario asociada:** HU25.
- **Criterios de aceptación asociados:** CA123.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Comprobante asociado al pago.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: Decoracion floral para ceremonia y recepcion; proveedor Jardines del Sol; montos PEN realistas.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E05-Presupuesto; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA123.
- **Resultado obtenido:** No existe un modulo financiero que cubra el criterio.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints.
- **Evidencia directa:** test/E05-Presupuesto/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: comprobante-pago. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E05-Presupuesto/evidencias/casos-prueba.json; test/E05-Presupuesto/evidencias/resultado.md; test/E05-Presupuesto/resultado-final.md.

### CP-E05-HU25-04 — Seguimiento de compromisos pendientes y vencidos

- **Épica:** E05-Presupuesto — Presupuesto.
- **Historia de usuario asociada:** HU25.
- **Criterios de aceptación asociados:** CA124.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Seguimiento de compromisos pendientes y vencidos.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: Decoracion floral para ceremonia y recepcion; proveedor Jardines del Sol; montos PEN realistas.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E05-Presupuesto; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA124.
- **Resultado obtenido:** No existe un modulo financiero que cubra el criterio.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints.
- **Evidencia directa:** test/E05-Presupuesto/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: compromisos. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.; Funcionalidad no implementada: compromisos. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.; Funcionalidad no implementada: compromisos. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E05-Presupuesto/evidencias/casos-prueba.json; test/E05-Presupuesto/evidencias/resultado.md; test/E05-Presupuesto/resultado-final.md.

### CP-E05-HU26-01 — Calculo del desglose porcentual por categoria

- **Épica:** E05-Presupuesto — Presupuesto.
- **Historia de usuario asociada:** HU26.
- **Criterios de aceptación asociados:** CA125, CA126.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Calculo del desglose porcentual por categoria.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: Decoracion floral para ceremonia y recepcion; proveedor Jardines del Sol; montos PEN realistas.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E05-Presupuesto; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA125, CA126.
- **Resultado obtenido:** No existe un modulo financiero que cubra el criterio.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints.
- **Evidencia directa:** test/E05-Presupuesto/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: desglose-categoria. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E05-Presupuesto/evidencias/casos-prueba.json; test/E05-Presupuesto/evidencias/resultado.md; test/E05-Presupuesto/resultado-final.md.

### CP-E05-HU26-02 — Actualizacion del desglose porcentual

- **Épica:** E05-Presupuesto — Presupuesto.
- **Historia de usuario asociada:** HU26.
- **Criterios de aceptación asociados:** CA127.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Actualizacion del desglose porcentual.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: Decoracion floral para ceremonia y recepcion; proveedor Jardines del Sol; montos PEN realistas.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E05-Presupuesto; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA127.
- **Resultado obtenido:** No existe un modulo financiero que cubra el criterio.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints.
- **Evidencia directa:** test/E05-Presupuesto/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: desglose-categoria. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E05-Presupuesto/evidencias/casos-prueba.json; test/E05-Presupuesto/evidencias/resultado.md; test/E05-Presupuesto/resultado-final.md.

### CP-E05-HU26-03 — Representacion visual del desglose presupuestario

- **Épica:** E05-Presupuesto — Presupuesto.
- **Historia de usuario asociada:** HU26.
- **Criterios de aceptación asociados:** CA128.
- **Tipo de prueba:** MANUAL.
- **Estado final:** FAIL.
- **Objetivo:** Representacion visual del desglose presupuestario.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: Decoracion floral para ceremonia y recepcion; proveedor Jardines del Sol; montos PEN realistas.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E05-Presupuesto; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA128.
- **Resultado obtenido:** No existe un modulo financiero que cubra el criterio.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints.
- **Evidencia directa:** test/E05-Presupuesto/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: grafico-presupuesto. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E05-Presupuesto/evidencias/casos-prueba.json; test/E05-Presupuesto/evidencias/resultado.md; test/E05-Presupuesto/resultado-final.md.

### CP-E05-HU27-01 — Alerta de sobrepresupuesto por categoria

- **Épica:** E05-Presupuesto — Presupuesto.
- **Historia de usuario asociada:** HU27.
- **Criterios de aceptación asociados:** CA129, CA130.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Alerta de sobrepresupuesto por categoria.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: Decoracion floral para ceremonia y recepcion; proveedor Jardines del Sol; montos PEN realistas.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E05-Presupuesto; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA129, CA130.
- **Resultado obtenido:** No existe un modulo financiero que cubra el criterio.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints.
- **Evidencia directa:** test/E05-Presupuesto/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: alertas-financieras. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E05-Presupuesto/evidencias/casos-prueba.json; test/E05-Presupuesto/evidencias/resultado.md; test/E05-Presupuesto/resultado-final.md.

### CP-E05-HU27-02 — Alerta de desbalance global

- **Épica:** E05-Presupuesto — Presupuesto.
- **Historia de usuario asociada:** HU27.
- **Criterios de aceptación asociados:** CA131.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Alerta de desbalance global.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: Decoracion floral para ceremonia y recepcion; proveedor Jardines del Sol; montos PEN realistas.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E05-Presupuesto; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA131.
- **Resultado obtenido:** No existe un modulo financiero que cubra el criterio.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints.
- **Evidencia directa:** test/E05-Presupuesto/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: alertas-financieras. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E05-Presupuesto/evidencias/casos-prueba.json; test/E05-Presupuesto/evidencias/resultado.md; test/E05-Presupuesto/resultado-final.md.

### CP-E05-HU27-03 — Actualizacion de alertas financieras

- **Épica:** E05-Presupuesto — Presupuesto.
- **Historia de usuario asociada:** HU27.
- **Criterios de aceptación asociados:** CA132.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Actualizacion de alertas financieras.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: Decoracion floral para ceremonia y recepcion; proveedor Jardines del Sol; montos PEN realistas.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E05-Presupuesto; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA132.
- **Resultado obtenido:** No existe un modulo financiero que cubra el criterio.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints.
- **Evidencia directa:** test/E05-Presupuesto/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: alertas-financieras. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E05-Presupuesto/evidencias/casos-prueba.json; test/E05-Presupuesto/evidencias/resultado.md; test/E05-Presupuesto/resultado-final.md.

### CP-E05-HU27-04 — Acceso desde alerta al detalle financiero

- **Épica:** E05-Presupuesto — Presupuesto.
- **Historia de usuario asociada:** HU27.
- **Criterios de aceptación asociados:** CA133.
- **Tipo de prueba:** MIXTO.
- **Estado final:** FAIL.
- **Objetivo:** Acceso desde alerta al detalle financiero.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: Decoracion floral para ceremonia y recepcion; proveedor Jardines del Sol; montos PEN realistas.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E05-Presupuesto; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA133.
- **Resultado obtenido:** No existe un modulo financiero que cubra el criterio.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints.
- **Evidencia directa:** test/E05-Presupuesto/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: alertas-financieras. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E05-Presupuesto/evidencias/casos-prueba.json; test/E05-Presupuesto/evidencias/resultado.md; test/E05-Presupuesto/resultado-final.md.

### CP-E05-HU28-01 — Generacion de reporte financiero consolidado

- **Épica:** E05-Presupuesto — Presupuesto.
- **Historia de usuario asociada:** HU28.
- **Criterios de aceptación asociados:** CA134, CA137.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Generacion de reporte financiero consolidado.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: Decoracion floral para ceremonia y recepcion; proveedor Jardines del Sol; montos PEN realistas.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E05-Presupuesto; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA134, CA137.
- **Resultado obtenido:** No existe un modulo financiero que cubra el criterio.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints.
- **Evidencia directa:** test/E05-Presupuesto/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: reporte-financiero. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E05-Presupuesto/evidencias/casos-prueba.json; test/E05-Presupuesto/evidencias/resultado.md; test/E05-Presupuesto/resultado-final.md.

### CP-E05-HU28-02 — Filtrado del reporte financiero

- **Épica:** E05-Presupuesto — Presupuesto.
- **Historia de usuario asociada:** HU28.
- **Criterios de aceptación asociados:** CA135.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Filtrado del reporte financiero.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: Decoracion floral para ceremonia y recepcion; proveedor Jardines del Sol; montos PEN realistas.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E05-Presupuesto; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA135.
- **Resultado obtenido:** No existe un modulo financiero que cubra el criterio.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints.
- **Evidencia directa:** test/E05-Presupuesto/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: reporte-financiero. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E05-Presupuesto/evidencias/casos-prueba.json; test/E05-Presupuesto/evidencias/resultado.md; test/E05-Presupuesto/resultado-final.md.

### CP-E05-HU28-03 — Exportacion consistente en PDF y CSV

- **Épica:** E05-Presupuesto — Presupuesto.
- **Historia de usuario asociada:** HU28.
- **Criterios de aceptación asociados:** CA136.
- **Tipo de prueba:** MIXTO.
- **Estado final:** FAIL.
- **Objetivo:** Exportacion consistente en PDF y CSV.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: Decoracion floral para ceremonia y recepcion; proveedor Jardines del Sol; montos PEN realistas.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E05-Presupuesto; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA136.
- **Resultado obtenido:** No existe un modulo financiero que cubra el criterio.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints.
- **Evidencia directa:** test/E05-Presupuesto/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: exportacion-financiera. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E05-Presupuesto/evidencias/casos-prueba.json; test/E05-Presupuesto/evidencias/resultado.md; test/E05-Presupuesto/resultado-final.md.

### CP-E05-HU28-04 — Reporte sin datos coincidentes

- **Épica:** E05-Presupuesto — Presupuesto.
- **Historia de usuario asociada:** HU28.
- **Criterios de aceptación asociados:** CA138.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Reporte sin datos coincidentes.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: Decoracion floral para ceremonia y recepcion; proveedor Jardines del Sol; montos PEN realistas.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E05-Presupuesto; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA138.
- **Resultado obtenido:** No existe un modulo financiero que cubra el criterio.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints.
- **Evidencia directa:** test/E05-Presupuesto/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: reporte-financiero. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E05-Presupuesto/evidencias/casos-prueba.json; test/E05-Presupuesto/evidencias/resultado.md; test/E05-Presupuesto/resultado-final.md.

### CP-E05-HU29-01 — Incorporacion automatica de contratacion al presupuesto

- **Épica:** E05-Presupuesto — Presupuesto.
- **Historia de usuario asociada:** HU29.
- **Criterios de aceptación asociados:** CA139, CA140.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Incorporacion automatica de contratacion al presupuesto.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: Decoracion floral para ceremonia y recepcion; proveedor Jardines del Sol; montos PEN realistas.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E05-Presupuesto; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA139, CA140.
- **Resultado obtenido:** No existe un modulo financiero que cubra el criterio.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints.
- **Evidencia directa:** test/E05-Presupuesto/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: sincronizacion-proveedor-presupuesto. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E05-Presupuesto/evidencias/casos-prueba.json; test/E05-Presupuesto/evidencias/resultado.md; test/E05-Presupuesto/resultado-final.md.

### CP-E05-HU29-02 — Vinculacion contratacion-gasto sin duplicidad

- **Épica:** E05-Presupuesto — Presupuesto.
- **Historia de usuario asociada:** HU29.
- **Criterios de aceptación asociados:** CA141.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Vinculacion contratacion-gasto sin duplicidad.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: Decoracion floral para ceremonia y recepcion; proveedor Jardines del Sol; montos PEN realistas.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E05-Presupuesto; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA141.
- **Resultado obtenido:** No existe un modulo financiero que cubra el criterio.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints.
- **Evidencia directa:** test/E05-Presupuesto/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: sincronizacion-proveedor-presupuesto. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E05-Presupuesto/evidencias/casos-prueba.json; test/E05-Presupuesto/evidencias/resultado.md; test/E05-Presupuesto/resultado-final.md.

### CP-E05-HU29-03 — Sincronizacion al modificar monto contratado

- **Épica:** E05-Presupuesto — Presupuesto.
- **Historia de usuario asociada:** HU29.
- **Criterios de aceptación asociados:** CA142.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Sincronizacion al modificar monto contratado.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: Decoracion floral para ceremonia y recepcion; proveedor Jardines del Sol; montos PEN realistas.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E05-Presupuesto; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA142.
- **Resultado obtenido:** No existe un modulo financiero que cubra el criterio.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints.
- **Evidencia directa:** test/E05-Presupuesto/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: sincronizacion-proveedor-presupuesto. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E05-Presupuesto/evidencias/casos-prueba.json; test/E05-Presupuesto/evidencias/resultado.md; test/E05-Presupuesto/resultado-final.md.

### CP-E05-HU29-04 — Recalculo financiero posterior a contratacion

- **Épica:** E05-Presupuesto — Presupuesto.
- **Historia de usuario asociada:** HU29.
- **Criterios de aceptación asociados:** CA143.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Recalculo financiero posterior a contratacion.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** datos: Decoracion floral para ceremonia y recepcion; proveedor Jardines del Sol; montos PEN realistas.
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E05-Presupuesto; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA143.
- **Resultado obtenido:** No existe un modulo financiero que cubra el criterio.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints.
- **Evidencia directa:** test/E05-Presupuesto/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: sincronizacion-proveedor-presupuesto. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E05-Presupuesto/evidencias/casos-prueba.json; test/E05-Presupuesto/evidencias/resultado.md; test/E05-Presupuesto/resultado-final.md.

### CP-E06-HU30-01 — Registro y consulta de invitado

- **Épica:** E06-Invitados — Invitados.
- **Historia de usuario asociada:** HU30.
- **Criterios de aceptación asociados:** CA144.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** PASS.
- **Objetivo:** Registro y consulta de invitado.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** invitada: Mariana Salazar Ríos; mesa: Jardín de Magnolias
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E06-Invitados; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA144.
- **Resultado obtenido:** La capacidad evaluada existe en Invitados.
- **Interpretación:** Criterio técnico cubierto.
- **Evidencia directa:** test/E06-Invitados/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** La capacidad evaluada existe en el modulo Invitados.
- **Clasificación del hallazgo:** Criterio acreditado por la ejecución o auditoría registrada.
- **Trazabilidad de archivos:** test/E06-Invitados/evidencias/casos-prueba.json; test/E06-Invitados/evidencias/resultado.md; test/E06-Invitados/resultado-final.md.

### CP-E06-HU30-02 — Validación de datos del invitado

- **Épica:** E06-Invitados — Invitados.
- **Historia de usuario asociada:** HU30.
- **Criterios de aceptación asociados:** CA145.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Validación de datos del invitado.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** invitada: Mariana Salazar Ríos; mesa: Jardín de Magnolias
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E06-Invitados; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA145.
- **Resultado obtenido:** La capacidad no está implementada completamente.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Evidencia directa:** test/E06-Invitados/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: validacion.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E06-Invitados/evidencias/casos-prueba.json; test/E06-Invitados/evidencias/resultado.md; test/E06-Invitados/resultado-final.md.

### CP-E06-HU30-03 — Edición de invitado

- **Épica:** E06-Invitados — Invitados.
- **Historia de usuario asociada:** HU30.
- **Criterios de aceptación asociados:** CA146.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** PASS.
- **Objetivo:** Edición de invitado.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** invitada: Mariana Salazar Ríos; mesa: Jardín de Magnolias
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E06-Invitados; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA146.
- **Resultado obtenido:** La capacidad evaluada existe en Invitados.
- **Interpretación:** Criterio técnico cubierto.
- **Evidencia directa:** test/E06-Invitados/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** La capacidad evaluada existe en el modulo Invitados.
- **Clasificación del hallazgo:** Criterio acreditado por la ejecución o auditoría registrada.
- **Trazabilidad de archivos:** test/E06-Invitados/evidencias/casos-prueba.json; test/E06-Invitados/evidencias/resultado.md; test/E06-Invitados/resultado-final.md.

### CP-E06-HU30-04 — Retiro del invitado y actualización del total

- **Épica:** E06-Invitados — Invitados.
- **Historia de usuario asociada:** HU30.
- **Criterios de aceptación asociados:** CA147.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** PASS.
- **Objetivo:** Retiro del invitado y actualización del total.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** invitada: Mariana Salazar Ríos; mesa: Jardín de Magnolias
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E06-Invitados; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA147.
- **Resultado obtenido:** La capacidad evaluada existe en Invitados.
- **Interpretación:** Criterio técnico cubierto.
- **Evidencia directa:** test/E06-Invitados/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** La capacidad evaluada existe en el modulo Invitados.
- **Clasificación del hallazgo:** Criterio acreditado por la ejecución o auditoría registrada.
- **Trazabilidad de archivos:** test/E06-Invitados/evidencias/casos-prueba.json; test/E06-Invitados/evidencias/resultado.md; test/E06-Invitados/resultado-final.md.

### CP-E06-HU31-01 — Clasificación y filtrado por relación

- **Épica:** E06-Invitados — Invitados.
- **Historia de usuario asociada:** HU31.
- **Criterios de aceptación asociados:** CA148.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** PASS.
- **Objetivo:** Clasificación y filtrado por relación.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** invitada: Mariana Salazar Ríos; mesa: Jardín de Magnolias
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E06-Invitados; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA148.
- **Resultado obtenido:** La capacidad evaluada existe en Invitados.
- **Interpretación:** Criterio técnico cubierto.
- **Evidencia directa:** test/E06-Invitados/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** La capacidad evaluada existe en el modulo Invitados.
- **Clasificación del hallazgo:** Criterio acreditado por la ejecución o auditoría registrada.
- **Trazabilidad de archivos:** test/E06-Invitados/evidencias/casos-prueba.json; test/E06-Invitados/evidencias/resultado.md; test/E06-Invitados/resultado-final.md.

### CP-E06-HU31-02 — Cambio y retiro del filtro

- **Épica:** E06-Invitados — Invitados.
- **Historia de usuario asociada:** HU31.
- **Criterios de aceptación asociados:** CA149.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** PASS.
- **Objetivo:** Cambio y retiro del filtro.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** invitada: Mariana Salazar Ríos; mesa: Jardín de Magnolias
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E06-Invitados; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA149.
- **Resultado obtenido:** La capacidad evaluada existe en Invitados.
- **Interpretación:** Criterio técnico cubierto.
- **Evidencia directa:** test/E06-Invitados/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** La capacidad evaluada existe en el modulo Invitados.
- **Clasificación del hallazgo:** Criterio acreditado por la ejecución o auditoría registrada.
- **Trazabilidad de archivos:** test/E06-Invitados/evidencias/casos-prueba.json; test/E06-Invitados/evidencias/resultado.md; test/E06-Invitados/resultado-final.md.

### CP-E06-HU31-03 — Filtrado por colaborador autorizado

- **Épica:** E06-Invitados — Invitados.
- **Historia de usuario asociada:** HU31.
- **Criterios de aceptación asociados:** CA150.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Filtrado por colaborador autorizado.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** invitada: Mariana Salazar Ríos; mesa: Jardín de Magnolias
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E06-Invitados; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA150.
- **Resultado obtenido:** La capacidad no está implementada completamente.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Evidencia directa:** test/E06-Invitados/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: permisos-colaborador.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E06-Invitados/evidencias/casos-prueba.json; test/E06-Invitados/evidencias/resultado.md; test/E06-Invitados/resultado-final.md.

### CP-E06-HU32-01 — Gestión de requerimientos alimentarios

- **Épica:** E06-Invitados — Invitados.
- **Historia de usuario asociada:** HU32.
- **Criterios de aceptación asociados:** CA151.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** PASS.
- **Objetivo:** Gestión de requerimientos alimentarios.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** invitada: Mariana Salazar Ríos; mesa: Jardín de Magnolias
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E06-Invitados; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA151.
- **Resultado obtenido:** La capacidad evaluada existe en Invitados.
- **Interpretación:** Criterio técnico cubierto.
- **Evidencia directa:** test/E06-Invitados/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** La capacidad evaluada existe en el modulo Invitados.
- **Clasificación del hallazgo:** Criterio acreditado por la ejecución o auditoría registrada.
- **Trazabilidad de archivos:** test/E06-Invitados/evidencias/casos-prueba.json; test/E06-Invitados/evidencias/resultado.md; test/E06-Invitados/resultado-final.md.

### CP-E06-HU32-02 — Filtro y resumen por requerimiento alimentario

- **Épica:** E06-Invitados — Invitados.
- **Historia de usuario asociada:** HU32.
- **Criterios de aceptación asociados:** CA152.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Filtro y resumen por requerimiento alimentario.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** invitada: Mariana Salazar Ríos; mesa: Jardín de Magnolias
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E06-Invitados; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA152.
- **Resultado obtenido:** La capacidad no está implementada completamente.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Evidencia directa:** test/E06-Invitados/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: filtros-requerimientos.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E06-Invitados/evidencias/casos-prueba.json; test/E06-Invitados/evidencias/resultado.md; test/E06-Invitados/resultado-final.md.

### CP-E06-HU32-03 — Exportación del listado alimentario

- **Épica:** E06-Invitados — Invitados.
- **Historia de usuario asociada:** HU32.
- **Criterios de aceptación asociados:** CA153.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Exportación del listado alimentario.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** invitada: Mariana Salazar Ríos; mesa: Jardín de Magnolias
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E06-Invitados; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA153.
- **Resultado obtenido:** La capacidad no está implementada completamente.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Evidencia directa:** test/E06-Invitados/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: exportacion-alimentaria.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E06-Invitados/evidencias/casos-prueba.json; test/E06-Invitados/evidencias/resultado.md; test/E06-Invitados/resultado-final.md.

### CP-E06-HU33-01 — Asignación y consulta por mesa

- **Épica:** E06-Invitados — Invitados.
- **Historia de usuario asociada:** HU33.
- **Criterios de aceptación asociados:** CA154.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Asignación y consulta por mesa.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** invitada: Mariana Salazar Ríos; mesa: Jardín de Magnolias
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E06-Invitados; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA154.
- **Resultado obtenido:** La capacidad no está implementada completamente.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Evidencia directa:** test/E06-Invitados/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: mesas.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E06-Invitados/evidencias/casos-prueba.json; test/E06-Invitados/evidencias/resultado.md; test/E06-Invitados/resultado-final.md.

### CP-E06-HU33-02 — Reasignación de mesa sin duplicidad

- **Épica:** E06-Invitados — Invitados.
- **Historia de usuario asociada:** HU33.
- **Criterios de aceptación asociados:** CA155.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Reasignación de mesa sin duplicidad.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** invitada: Mariana Salazar Ríos; mesa: Jardín de Magnolias
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E06-Invitados; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA155.
- **Resultado obtenido:** La capacidad no está implementada completamente.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Evidencia directa:** test/E06-Invitados/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: reubicacion-mesa.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E06-Invitados/evidencias/casos-prueba.json; test/E06-Invitados/evidencias/resultado.md; test/E06-Invitados/resultado-final.md.

### CP-E06-HU33-03 — Representación gráfica de mesas

- **Épica:** E06-Invitados — Invitados.
- **Historia de usuario asociada:** HU33.
- **Criterios de aceptación asociados:** CA156.
- **Tipo de prueba:** MANUAL.
- **Estado final:** FAIL.
- **Objetivo:** Representación gráfica de mesas.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** invitada: Mariana Salazar Ríos; mesa: Jardín de Magnolias
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E06-Invitados; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA156.
- **Resultado obtenido:** La capacidad no está implementada completamente.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Evidencia directa:** test/E06-Invitados/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: grafico-mesas.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E06-Invitados/evidencias/casos-prueba.json; test/E06-Invitados/evidencias/resultado.md; test/E06-Invitados/resultado-final.md.

### CP-E06-HU34-01 — Cálculo de asistencia confirmada

- **Épica:** E06-Invitados — Invitados.
- **Historia de usuario asociada:** HU34.
- **Criterios de aceptación asociados:** CA157.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Cálculo de asistencia confirmada.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** invitada: Mariana Salazar Ríos; mesa: Jardín de Magnolias
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E06-Invitados; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA157.
- **Resultado obtenido:** La capacidad no está implementada completamente.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Evidencia directa:** test/E06-Invitados/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: estadisticas.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E06-Invitados/evidencias/casos-prueba.json; test/E06-Invitados/evidencias/resultado.md; test/E06-Invitados/resultado-final.md.

### CP-E06-HU34-02 — Pendientes de respuesta y actualización estadística

- **Épica:** E06-Invitados — Invitados.
- **Historia de usuario asociada:** HU34.
- **Criterios de aceptación asociados:** CA158.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Pendientes de respuesta y actualización estadística.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** invitada: Mariana Salazar Ríos; mesa: Jardín de Magnolias
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E06-Invitados; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA158.
- **Resultado obtenido:** La capacidad no está implementada completamente.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Evidencia directa:** test/E06-Invitados/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: estadisticas.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E06-Invitados/evidencias/casos-prueba.json; test/E06-Invitados/evidencias/resultado.md; test/E06-Invitados/resultado-final.md.

### CP-E06-HU34-03 — Permisos sobre estadísticas de invitados

- **Épica:** E06-Invitados — Invitados.
- **Historia de usuario asociada:** HU34.
- **Criterios de aceptación asociados:** CA159.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Permisos sobre estadísticas de invitados.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** invitada: Mariana Salazar Ríos; mesa: Jardín de Magnolias
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E06-Invitados; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA159.
- **Resultado obtenido:** La capacidad no está implementada completamente.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Evidencia directa:** test/E06-Invitados/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: estadisticas.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E06-Invitados/evidencias/casos-prueba.json; test/E06-Invitados/evidencias/resultado.md; test/E06-Invitados/resultado-final.md.

### CP-E06-HU35-01 — Gestión y actualización del RSVP

- **Épica:** E06-Invitados — Invitados.
- **Historia de usuario asociada:** HU35.
- **Criterios de aceptación asociados:** CA160.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** PASS.
- **Objetivo:** Gestión y actualización del RSVP.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** invitada: Mariana Salazar Ríos; mesa: Jardín de Magnolias
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E06-Invitados; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA160.
- **Resultado obtenido:** La capacidad evaluada existe en Invitados.
- **Interpretación:** Criterio técnico cubierto.
- **Evidencia directa:** test/E06-Invitados/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** La capacidad evaluada existe en el modulo Invitados.
- **Clasificación del hallazgo:** Criterio acreditado por la ejecución o auditoría registrada.
- **Trazabilidad de archivos:** test/E06-Invitados/evidencias/casos-prueba.json; test/E06-Invitados/evidencias/resultado.md; test/E06-Invitados/resultado-final.md.

### CP-E06-HU35-02 — Fechas de seguimiento RSVP

- **Épica:** E06-Invitados — Invitados.
- **Historia de usuario asociada:** HU35.
- **Criterios de aceptación asociados:** CA161.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Fechas de seguimiento RSVP.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** invitada: Mariana Salazar Ríos; mesa: Jardín de Magnolias
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E06-Invitados; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA161.
- **Resultado obtenido:** La capacidad no está implementada completamente.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Evidencia directa:** test/E06-Invitados/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: seguimiento-rsvp.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E06-Invitados/evidencias/casos-prueba.json; test/E06-Invitados/evidencias/resultado.md; test/E06-Invitados/resultado-final.md.

### CP-E06-HU35-03 — Recordatorios únicamente para RSVP pendientes

- **Épica:** E06-Invitados — Invitados.
- **Historia de usuario asociada:** HU35.
- **Criterios de aceptación asociados:** CA162.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Recordatorios únicamente para RSVP pendientes.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** invitada: Mariana Salazar Ríos; mesa: Jardín de Magnolias
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E06-Invitados; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA162.
- **Resultado obtenido:** La capacidad no está implementada completamente.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Evidencia directa:** test/E06-Invitados/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: recordatorios-rsvp.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E06-Invitados/evidencias/casos-prueba.json; test/E06-Invitados/evidencias/resultado.md; test/E06-Invitados/resultado-final.md.

### CP-E06-HU36-01 — Ordenamiento alfabético combinado con filtros

- **Épica:** E06-Invitados — Invitados.
- **Historia de usuario asociada:** HU36.
- **Criterios de aceptación asociados:** CA163.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** PASS.
- **Objetivo:** Ordenamiento alfabético combinado con filtros.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** invitada: Mariana Salazar Ríos; mesa: Jardín de Magnolias
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E06-Invitados; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA163.
- **Resultado obtenido:** La capacidad evaluada existe en Invitados.
- **Interpretación:** Criterio técnico cubierto.
- **Evidencia directa:** test/E06-Invitados/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** La capacidad evaluada existe en el modulo Invitados.
- **Clasificación del hallazgo:** Criterio acreditado por la ejecución o auditoría registrada.
- **Trazabilidad de archivos:** test/E06-Invitados/evidencias/casos-prueba.json; test/E06-Invitados/evidencias/resultado.md; test/E06-Invitados/resultado-final.md.

### CP-E06-HU36-02 — Persistencia de la preferencia de ordenamiento

- **Épica:** E06-Invitados — Invitados.
- **Historia de usuario asociada:** HU36.
- **Criterios de aceptación asociados:** CA164.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Persistencia de la preferencia de ordenamiento.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** invitada: Mariana Salazar Ríos; mesa: Jardín de Magnolias
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E06-Invitados; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA164.
- **Resultado obtenido:** La capacidad no está implementada completamente.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Evidencia directa:** test/E06-Invitados/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: preferencia-orden.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E06-Invitados/evidencias/casos-prueba.json; test/E06-Invitados/evidencias/resultado.md; test/E06-Invitados/resultado-final.md.

### CP-E06-HU37-01 — Generación y envío de invitación digital

- **Épica:** E06-Invitados — Invitados.
- **Historia de usuario asociada:** HU37.
- **Criterios de aceptación asociados:** CA165.
- **Tipo de prueba:** MIXTO.
- **Estado final:** FAIL.
- **Objetivo:** Generación y envío de invitación digital.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** invitada: Mariana Salazar Ríos; mesa: Jardín de Magnolias
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E06-Invitados; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA165.
- **Resultado obtenido:** La capacidad no está implementada completamente.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Evidencia directa:** test/E06-Invitados/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: invitacion-digital.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E06-Invitados/evidencias/casos-prueba.json; test/E06-Invitados/evidencias/resultado.md; test/E06-Invitados/resultado-final.md.

### CP-E06-HU37-02 — Registro de interacción sin alterar automáticamente RSVP

- **Épica:** E06-Invitados — Invitados.
- **Historia de usuario asociada:** HU37.
- **Criterios de aceptación asociados:** CA166.
- **Tipo de prueba:** MIXTO.
- **Estado final:** FAIL.
- **Objetivo:** Registro de interacción sin alterar automáticamente RSVP.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** invitada: Mariana Salazar Ríos; mesa: Jardín de Magnolias
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E06-Invitados; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA166.
- **Resultado obtenido:** La capacidad no está implementada completamente.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Evidencia directa:** test/E06-Invitados/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: invitacion-digital.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E06-Invitados/evidencias/casos-prueba.json; test/E06-Invitados/evidencias/resultado.md; test/E06-Invitados/resultado-final.md.

### CP-E06-HU37-03 — Notificación a Wedding Planner por interacción

- **Épica:** E06-Invitados — Invitados.
- **Historia de usuario asociada:** HU37.
- **Criterios de aceptación asociados:** CA167.
- **Tipo de prueba:** MIXTO.
- **Estado final:** FAIL.
- **Objetivo:** Notificación a Wedding Planner por interacción.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** invitada: Mariana Salazar Ríos; mesa: Jardín de Magnolias
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E06-Invitados; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA167.
- **Resultado obtenido:** La capacidad no está implementada completamente.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Evidencia directa:** test/E06-Invitados/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: invitacion-digital.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E06-Invitados/evidencias/casos-prueba.json; test/E06-Invitados/evidencias/resultado.md; test/E06-Invitados/resultado-final.md.

### CP-E07-HU38-01 — Búsqueda y filtrado de proveedores

- **Épica:** E07-Proveedores — Proveedores.
- **Historia de usuario asociada:** HU38.
- **Criterios de aceptación asociados:** CA182, CA183.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Búsqueda y filtrado de proveedores.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** proveedores: Eventos Magnolia; Coro Lumen; Fotografía Andina; contacto: Camila Rojas; ubicacion: Miraflores, Lima; servicio: Decoración floral; precioReferencia: S/ 2,800.00
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E07-Proveedores; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA182, CA183.
- **Resultado obtenido:** Funcionalidad no implementada: filtros-precio-ubicacion.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Evidencia directa:** test/E07-Proveedores/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: filtros-precio-ubicacion.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E07-Proveedores/evidencias/casos-prueba.json; test/E07-Proveedores/evidencias/resultado.md; test/E07-Proveedores/resultado-final.md.

### CP-E07-HU38-02 — Consulta resumida y perfil del proveedor

- **Épica:** E07-Proveedores — Proveedores.
- **Historia de usuario asociada:** HU38.
- **Criterios de aceptación asociados:** CA184, CA185.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** PASS.
- **Objetivo:** Consulta resumida y perfil del proveedor.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** proveedores: Eventos Magnolia; Coro Lumen; Fotografía Andina; contacto: Camila Rojas; ubicacion: Miraflores, Lima; servicio: Decoración floral; precioReferencia: S/ 2,800.00
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E07-Proveedores; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA184, CA185.
- **Resultado obtenido:** La capacidad existe en el módulo Proveedores.
- **Interpretación:** Criterio técnico cubierto.
- **Evidencia directa:** test/E07-Proveedores/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** La capacidad fue localizada en los endpoints, DTOs y servicio reales de Proveedores.
- **Clasificación del hallazgo:** Criterio acreditado por la ejecución o auditoría registrada.
- **Trazabilidad de archivos:** test/E07-Proveedores/evidencias/casos-prueba.json; test/E07-Proveedores/evidencias/resultado.md; test/E07-Proveedores/resultado-final.md.

### CP-E07-HU38-03 — Consulta de proveedores contratados del matrimonio

- **Épica:** E07-Proveedores — Proveedores.
- **Historia de usuario asociada:** HU38.
- **Criterios de aceptación asociados:** CA186.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** PASS.
- **Objetivo:** Consulta de proveedores contratados del matrimonio.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** proveedores: Eventos Magnolia; Coro Lumen; Fotografía Andina; contacto: Camila Rojas; ubicacion: Miraflores, Lima; servicio: Decoración floral; precioReferencia: S/ 2,800.00
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E07-Proveedores; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA186.
- **Resultado obtenido:** La capacidad existe en el módulo Proveedores.
- **Interpretación:** Criterio técnico cubierto.
- **Evidencia directa:** test/E07-Proveedores/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** La capacidad fue localizada en los endpoints, DTOs y servicio reales de Proveedores.
- **Clasificación del hallazgo:** Criterio acreditado por la ejecución o auditoría registrada.
- **Trazabilidad de archivos:** test/E07-Proveedores/evidencias/casos-prueba.json; test/E07-Proveedores/evidencias/resultado.md; test/E07-Proveedores/resultado-final.md.

### CP-E07-HU39-01 — Gestión del límite de favoritos por categoría

- **Épica:** E07-Proveedores — Proveedores.
- **Historia de usuario asociada:** HU39.
- **Criterios de aceptación asociados:** CA187, CA188.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Gestión del límite de favoritos por categoría.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** proveedores: Eventos Magnolia; Coro Lumen; Fotografía Andina; contacto: Camila Rojas; ubicacion: Miraflores, Lima; servicio: Decoración floral; precioReferencia: S/ 2,800.00
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E07-Proveedores; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA187, CA188.
- **Resultado obtenido:** Funcionalidad no implementada: limite-favoritos.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Evidencia directa:** test/E07-Proveedores/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: limite-favoritos.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E07-Proveedores/evidencias/casos-prueba.json; test/E07-Proveedores/evidencias/resultado.md; test/E07-Proveedores/resultado-final.md.

### CP-E07-HU39-02 — Retiro y reemplazo de favoritos

- **Épica:** E07-Proveedores — Proveedores.
- **Historia de usuario asociada:** HU39.
- **Criterios de aceptación asociados:** CA189, CA191.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** PASS.
- **Objetivo:** Retiro y reemplazo de favoritos.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** proveedores: Eventos Magnolia; Coro Lumen; Fotografía Andina; contacto: Camila Rojas; ubicacion: Miraflores, Lima; servicio: Decoración floral; precioReferencia: S/ 2,800.00
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E07-Proveedores; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA189, CA191.
- **Resultado obtenido:** La capacidad existe en el módulo Proveedores.
- **Interpretación:** Criterio técnico cubierto.
- **Evidencia directa:** test/E07-Proveedores/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** La capacidad fue localizada en los endpoints, DTOs y servicio reales de Proveedores.
- **Clasificación del hallazgo:** Criterio acreditado por la ejecución o auditoría registrada.
- **Trazabilidad de archivos:** test/E07-Proveedores/evidencias/casos-prueba.json; test/E07-Proveedores/evidencias/resultado.md; test/E07-Proveedores/resultado-final.md.

### CP-E07-HU39-03 — Comparación de proveedores favoritos

- **Épica:** E07-Proveedores — Proveedores.
- **Historia de usuario asociada:** HU39.
- **Criterios de aceptación asociados:** CA190.
- **Tipo de prueba:** MIXTO.
- **Estado final:** FAIL.
- **Objetivo:** Comparación de proveedores favoritos.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** proveedores: Eventos Magnolia; Coro Lumen; Fotografía Andina; contacto: Camila Rojas; ubicacion: Miraflores, Lima; servicio: Decoración floral; precioReferencia: S/ 2,800.00
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E07-Proveedores; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA190.
- **Resultado obtenido:** Funcionalidad no implementada: comparacion.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Evidencia directa:** test/E07-Proveedores/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: comparacion.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E07-Proveedores/evidencias/casos-prueba.json; test/E07-Proveedores/evidencias/resultado.md; test/E07-Proveedores/resultado-final.md.

### CP-E07-HU40-01 — Checklist operativo por proveedor

- **Épica:** E07-Proveedores — Proveedores.
- **Historia de usuario asociada:** HU40.
- **Criterios de aceptación asociados:** CA192, CA193.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Checklist operativo por proveedor.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** proveedores: Eventos Magnolia; Coro Lumen; Fotografía Andina; contacto: Camila Rojas; ubicacion: Miraflores, Lima; servicio: Decoración floral; precioReferencia: S/ 2,800.00
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E07-Proveedores; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA192, CA193.
- **Resultado obtenido:** Funcionalidad no implementada: checklist-proveedor.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Evidencia directa:** test/E07-Proveedores/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: checklist-proveedor.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E07-Proveedores/evidencias/casos-prueba.json; test/E07-Proveedores/evidencias/resultado.md; test/E07-Proveedores/resultado-final.md.

### CP-E07-HU40-02 — Registro de incidencia del proveedor

- **Épica:** E07-Proveedores — Proveedores.
- **Historia de usuario asociada:** HU40.
- **Criterios de aceptación asociados:** CA194, CA195.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Registro de incidencia del proveedor.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** proveedores: Eventos Magnolia; Coro Lumen; Fotografía Andina; contacto: Camila Rojas; ubicacion: Miraflores, Lima; servicio: Decoración floral; precioReferencia: S/ 2,800.00
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E07-Proveedores; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA194, CA195.
- **Resultado obtenido:** Funcionalidad no implementada: checklist-proveedor.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Evidencia directa:** test/E07-Proveedores/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: checklist-proveedor.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E07-Proveedores/evidencias/casos-prueba.json; test/E07-Proveedores/evidencias/resultado.md; test/E07-Proveedores/resultado-final.md.

### CP-E07-HU40-03 — Actualización compartida del seguimiento

- **Épica:** E07-Proveedores — Proveedores.
- **Historia de usuario asociada:** HU40.
- **Criterios de aceptación asociados:** CA196.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Actualización compartida del seguimiento.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** proveedores: Eventos Magnolia; Coro Lumen; Fotografía Andina; contacto: Camila Rojas; ubicacion: Miraflores, Lima; servicio: Decoración floral; precioReferencia: S/ 2,800.00
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E07-Proveedores; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA196.
- **Resultado obtenido:** Funcionalidad no implementada: checklist-proveedor.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Evidencia directa:** test/E07-Proveedores/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: checklist-proveedor.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E07-Proveedores/evidencias/casos-prueba.json; test/E07-Proveedores/evidencias/resultado.md; test/E07-Proveedores/resultado-final.md.

### CP-E07-HU41-01 — Consulta de disponibilidad del proveedor

- **Épica:** E07-Proveedores — Proveedores.
- **Historia de usuario asociada:** HU41.
- **Criterios de aceptación asociados:** CA197, CA198.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** PASS.
- **Objetivo:** Consulta de disponibilidad del proveedor.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** proveedores: Eventos Magnolia; Coro Lumen; Fotografía Andina; contacto: Camila Rojas; ubicacion: Miraflores, Lima; servicio: Decoración floral; precioReferencia: S/ 2,800.00
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E07-Proveedores; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA197, CA198.
- **Resultado obtenido:** La capacidad existe en el módulo Proveedores.
- **Interpretación:** Criterio técnico cubierto.
- **Evidencia directa:** test/E07-Proveedores/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** La capacidad fue localizada en los endpoints, DTOs y servicio reales de Proveedores.
- **Clasificación del hallazgo:** Criterio acreditado por la ejecución o auditoría registrada.
- **Trazabilidad de archivos:** test/E07-Proveedores/evidencias/casos-prueba.json; test/E07-Proveedores/evidencias/resultado.md; test/E07-Proveedores/resultado-final.md.

### CP-E07-HU41-02 — Solicitud de reserva

- **Épica:** E07-Proveedores — Proveedores.
- **Historia de usuario asociada:** HU41.
- **Criterios de aceptación asociados:** CA199.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Solicitud de reserva.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** proveedores: Eventos Magnolia; Coro Lumen; Fotografía Andina; contacto: Camila Rojas; ubicacion: Miraflores, Lima; servicio: Decoración floral; precioReferencia: S/ 2,800.00
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E07-Proveedores; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA199.
- **Resultado obtenido:** Funcionalidad no implementada: reserva.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Evidencia directa:** test/E07-Proveedores/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: reserva.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E07-Proveedores/evidencias/casos-prueba.json; test/E07-Proveedores/evidencias/resultado.md; test/E07-Proveedores/resultado-final.md.

### CP-E07-HU41-03 — Actualización de disponibilidad y acceso externo

- **Épica:** E07-Proveedores — Proveedores.
- **Historia de usuario asociada:** HU41.
- **Criterios de aceptación asociados:** CA200, CA201.
- **Tipo de prueba:** MIXTO.
- **Estado final:** FAIL.
- **Objetivo:** Actualización de disponibilidad y acceso externo.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** proveedores: Eventos Magnolia; Coro Lumen; Fotografía Andina; contacto: Camila Rojas; ubicacion: Miraflores, Lima; servicio: Decoración floral; precioReferencia: S/ 2,800.00
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E07-Proveedores; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA200, CA201.
- **Resultado obtenido:** Funcionalidad no implementada: acceso-externo.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Evidencia directa:** test/E07-Proveedores/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: acceso-externo.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E07-Proveedores/evidencias/casos-prueba.json; test/E07-Proveedores/evidencias/resultado.md; test/E07-Proveedores/resultado-final.md.

### CP-E07-HU42-01 — Registro de calificación y reseña

- **Épica:** E07-Proveedores — Proveedores.
- **Historia de usuario asociada:** HU42.
- **Criterios de aceptación asociados:** CA202, CA203.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Registro de calificación y reseña.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** proveedores: Eventos Magnolia; Coro Lumen; Fotografía Andina; contacto: Camila Rojas; ubicacion: Miraflores, Lima; servicio: Decoración floral; precioReferencia: S/ 2,800.00
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E07-Proveedores; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA202, CA203.
- **Resultado obtenido:** Funcionalidad no implementada: evaluaciones.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Evidencia directa:** test/E07-Proveedores/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: evaluaciones.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E07-Proveedores/evidencias/casos-prueba.json; test/E07-Proveedores/evidencias/resultado.md; test/E07-Proveedores/resultado-final.md.

### CP-E07-HU42-02 — Modificación de evaluación vigente

- **Épica:** E07-Proveedores — Proveedores.
- **Historia de usuario asociada:** HU42.
- **Criterios de aceptación asociados:** CA204.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Modificación de evaluación vigente.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** proveedores: Eventos Magnolia; Coro Lumen; Fotografía Andina; contacto: Camila Rojas; ubicacion: Miraflores, Lima; servicio: Decoración floral; precioReferencia: S/ 2,800.00
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E07-Proveedores; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA204.
- **Resultado obtenido:** Funcionalidad no implementada: evaluaciones.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Evidencia directa:** test/E07-Proveedores/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: evaluaciones.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E07-Proveedores/evidencias/casos-prueba.json; test/E07-Proveedores/evidencias/resultado.md; test/E07-Proveedores/resultado-final.md.

### CP-E07-HU42-03 — Promedio de calificaciones

- **Épica:** E07-Proveedores — Proveedores.
- **Historia de usuario asociada:** HU42.
- **Criterios de aceptación asociados:** CA205, CA206.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Promedio de calificaciones.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** proveedores: Eventos Magnolia; Coro Lumen; Fotografía Andina; contacto: Camila Rojas; ubicacion: Miraflores, Lima; servicio: Decoración floral; precioReferencia: S/ 2,800.00
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E07-Proveedores; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA205, CA206.
- **Resultado obtenido:** Funcionalidad no implementada: evaluaciones.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Evidencia directa:** test/E07-Proveedores/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: evaluaciones.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E07-Proveedores/evidencias/casos-prueba.json; test/E07-Proveedores/evidencias/resultado.md; test/E07-Proveedores/resultado-final.md.

### CP-E07-HU43-01 — Plan de pagos y agenda cronológica

- **Épica:** E07-Proveedores — Proveedores.
- **Historia de usuario asociada:** HU43.
- **Criterios de aceptación asociados:** CA207, CA208.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Plan de pagos y agenda cronológica.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** proveedores: Eventos Magnolia; Coro Lumen; Fotografía Andina; contacto: Camila Rojas; ubicacion: Miraflores, Lima; servicio: Decoración floral; precioReferencia: S/ 2,800.00
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E07-Proveedores; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA207, CA208.
- **Resultado obtenido:** Funcionalidad no implementada: pagos-proveedor.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Evidencia directa:** test/E07-Proveedores/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: pagos-proveedor.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E07-Proveedores/evidencias/casos-prueba.json; test/E07-Proveedores/evidencias/resultado.md; test/E07-Proveedores/resultado-final.md.

### CP-E07-HU43-02 — Recordatorios de cuotas

- **Épica:** E07-Proveedores — Proveedores.
- **Historia de usuario asociada:** HU43.
- **Criterios de aceptación asociados:** CA209.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Recordatorios de cuotas.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** proveedores: Eventos Magnolia; Coro Lumen; Fotografía Andina; contacto: Camila Rojas; ubicacion: Miraflores, Lima; servicio: Decoración floral; precioReferencia: S/ 2,800.00
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E07-Proveedores; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA209.
- **Resultado obtenido:** Funcionalidad no implementada: pagos-proveedor.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Evidencia directa:** test/E07-Proveedores/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: pagos-proveedor.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E07-Proveedores/evidencias/casos-prueba.json; test/E07-Proveedores/evidencias/resultado.md; test/E07-Proveedores/resultado-final.md.

### CP-E07-HU43-03 — Pago de cuota y vencimiento

- **Épica:** E07-Proveedores — Proveedores.
- **Historia de usuario asociada:** HU43.
- **Criterios de aceptación asociados:** CA210, CA211.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Pago de cuota y vencimiento.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** proveedores: Eventos Magnolia; Coro Lumen; Fotografía Andina; contacto: Camila Rojas; ubicacion: Miraflores, Lima; servicio: Decoración floral; precioReferencia: S/ 2,800.00
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E07-Proveedores; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA210, CA211.
- **Resultado obtenido:** Funcionalidad no implementada: pagos-proveedor.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Evidencia directa:** test/E07-Proveedores/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: pagos-proveedor.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E07-Proveedores/evidencias/casos-prueba.json; test/E07-Proveedores/evidencias/resultado.md; test/E07-Proveedores/resultado-final.md.

### CP-E07-HU44-01 — Registro y actualización manual de proveedor

- **Épica:** E07-Proveedores — Proveedores.
- **Historia de usuario asociada:** HU44.
- **Criterios de aceptación asociados:** CA212, CA213.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** PASS.
- **Objetivo:** Registro y actualización manual de proveedor.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** proveedores: Eventos Magnolia; Coro Lumen; Fotografía Andina; contacto: Camila Rojas; ubicacion: Miraflores, Lima; servicio: Decoración floral; precioReferencia: S/ 2,800.00
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E07-Proveedores; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA212, CA213.
- **Resultado obtenido:** La capacidad existe en el módulo Proveedores.
- **Interpretación:** Criterio técnico cubierto.
- **Evidencia directa:** test/E07-Proveedores/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** La capacidad fue localizada en los endpoints, DTOs y servicio reales de Proveedores.
- **Clasificación del hallazgo:** Criterio acreditado por la ejecución o auditoría registrada.
- **Trazabilidad de archivos:** test/E07-Proveedores/evidencias/casos-prueba.json; test/E07-Proveedores/evidencias/resultado.md; test/E07-Proveedores/resultado-final.md.

### CP-E07-HU44-02 — Enlace externo para completar información

- **Épica:** E07-Proveedores — Proveedores.
- **Historia de usuario asociada:** HU44.
- **Criterios de aceptación asociados:** CA214, CA215.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Enlace externo para completar información.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** proveedores: Eventos Magnolia; Coro Lumen; Fotografía Andina; contacto: Camila Rojas; ubicacion: Miraflores, Lima; servicio: Decoración floral; precioReferencia: S/ 2,800.00
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E07-Proveedores; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA214, CA215.
- **Resultado obtenido:** Funcionalidad no implementada: enlace-externo.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Evidencia directa:** test/E07-Proveedores/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: enlace-externo.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E07-Proveedores/evidencias/casos-prueba.json; test/E07-Proveedores/evidencias/resultado.md; test/E07-Proveedores/resultado-final.md.

### CP-E07-HU44-03 — Documentos y retiro conservando historial

- **Épica:** E07-Proveedores — Proveedores.
- **Historia de usuario asociada:** HU44.
- **Criterios de aceptación asociados:** CA216.
- **Tipo de prueba:** MIXTO.
- **Estado final:** FAIL.
- **Objetivo:** Documentos y retiro conservando historial.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** proveedores: Eventos Magnolia; Coro Lumen; Fotografía Andina; contacto: Camila Rojas; ubicacion: Miraflores, Lima; servicio: Decoración floral; precioReferencia: S/ 2,800.00
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E07-Proveedores; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA216.
- **Resultado obtenido:** Funcionalidad no implementada: documentos.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Evidencia directa:** test/E07-Proveedores/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: documentos.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E07-Proveedores/evidencias/casos-prueba.json; test/E07-Proveedores/evidencias/resultado.md; test/E07-Proveedores/resultado-final.md.

### CP-E07-HU45-01 — Asignación y modificación de prioridad

- **Épica:** E07-Proveedores — Proveedores.
- **Historia de usuario asociada:** HU45.
- **Criterios de aceptación asociados:** CA217, CA218.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** PASS.
- **Objetivo:** Asignación y modificación de prioridad.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** proveedores: Eventos Magnolia; Coro Lumen; Fotografía Andina; contacto: Camila Rojas; ubicacion: Miraflores, Lima; servicio: Decoración floral; precioReferencia: S/ 2,800.00
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E07-Proveedores; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA217, CA218.
- **Resultado obtenido:** La capacidad existe en el módulo Proveedores.
- **Interpretación:** Criterio técnico cubierto.
- **Evidencia directa:** test/E07-Proveedores/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** La capacidad fue localizada en los endpoints, DTOs y servicio reales de Proveedores.
- **Clasificación del hallazgo:** Criterio acreditado por la ejecución o auditoría registrada.
- **Trazabilidad de archivos:** test/E07-Proveedores/evidencias/casos-prueba.json; test/E07-Proveedores/evidencias/resultado.md; test/E07-Proveedores/resultado-final.md.

### CP-E07-HU45-02 — Ordenamiento y sugerencias por prioridad

- **Épica:** E07-Proveedores — Proveedores.
- **Historia de usuario asociada:** HU45.
- **Criterios de aceptación asociados:** CA219, CA220.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Ordenamiento y sugerencias por prioridad.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** proveedores: Eventos Magnolia; Coro Lumen; Fotografía Andina; contacto: Camila Rojas; ubicacion: Miraflores, Lima; servicio: Decoración floral; precioReferencia: S/ 2,800.00
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E07-Proveedores; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA219, CA220.
- **Resultado obtenido:** Funcionalidad no implementada: recomendaciones.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Evidencia directa:** test/E07-Proveedores/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: recomendaciones.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E07-Proveedores/evidencias/casos-prueba.json; test/E07-Proveedores/evidencias/resultado.md; test/E07-Proveedores/resultado-final.md.

### CP-E07-HU45-03 — Actualización de recomendaciones al contratar

- **Épica:** E07-Proveedores — Proveedores.
- **Historia de usuario asociada:** HU45.
- **Criterios de aceptación asociados:** CA221.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Actualización de recomendaciones al contratar.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** proveedores: Eventos Magnolia; Coro Lumen; Fotografía Andina; contacto: Camila Rojas; ubicacion: Miraflores, Lima; servicio: Decoración floral; precioReferencia: S/ 2,800.00
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E07-Proveedores; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA221.
- **Resultado obtenido:** Funcionalidad no implementada: recomendaciones.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Evidencia directa:** test/E07-Proveedores/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: recomendaciones.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E07-Proveedores/evidencias/casos-prueba.json; test/E07-Proveedores/evidencias/resultado.md; test/E07-Proveedores/resultado-final.md.

### CP-E07-HU46-01 — Registro de interacción y cálculo del tiempo de respuesta

- **Épica:** E07-Proveedores — Proveedores.
- **Historia de usuario asociada:** HU46.
- **Criterios de aceptación asociados:** CA222, CA223.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Registro de interacción y cálculo del tiempo de respuesta.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** proveedores: Eventos Magnolia; Coro Lumen; Fotografía Andina; contacto: Camila Rojas; ubicacion: Miraflores, Lima; servicio: Decoración floral; precioReferencia: S/ 2,800.00
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E07-Proveedores; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA222, CA223.
- **Resultado obtenido:** Funcionalidad no implementada: tiempo-respuesta.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Evidencia directa:** test/E07-Proveedores/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: tiempo-respuesta.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E07-Proveedores/evidencias/casos-prueba.json; test/E07-Proveedores/evidencias/resultado.md; test/E07-Proveedores/resultado-final.md.

### CP-E07-HU46-02 — Historial y promedio de respuesta

- **Épica:** E07-Proveedores — Proveedores.
- **Historia de usuario asociada:** HU46.
- **Criterios de aceptación asociados:** CA224, CA225.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Historial y promedio de respuesta.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** proveedores: Eventos Magnolia; Coro Lumen; Fotografía Andina; contacto: Camila Rojas; ubicacion: Miraflores, Lima; servicio: Decoración floral; precioReferencia: S/ 2,800.00
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E07-Proveedores; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA224, CA225.
- **Resultado obtenido:** Funcionalidad no implementada: tiempo-respuesta.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Evidencia directa:** test/E07-Proveedores/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: tiempo-respuesta.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E07-Proveedores/evidencias/casos-prueba.json; test/E07-Proveedores/evidencias/resultado.md; test/E07-Proveedores/resultado-final.md.

### CP-E07-HU46-03 — Consulta y comparación por tiempo de respuesta

- **Épica:** E07-Proveedores — Proveedores.
- **Historia de usuario asociada:** HU46.
- **Criterios de aceptación asociados:** CA226.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Consulta y comparación por tiempo de respuesta.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** proveedores: Eventos Magnolia; Coro Lumen; Fotografía Andina; contacto: Camila Rojas; ubicacion: Miraflores, Lima; servicio: Decoración floral; precioReferencia: S/ 2,800.00
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E07-Proveedores; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA226.
- **Resultado obtenido:** Funcionalidad no implementada: tiempo-respuesta.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Evidencia directa:** test/E07-Proveedores/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: tiempo-respuesta.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E07-Proveedores/evidencias/casos-prueba.json; test/E07-Proveedores/evidencias/resultado.md; test/E07-Proveedores/resultado-final.md.

### CP-E08-HU47-01 — Registro de planes de contingencia con alternativas

- **Épica:** E08-Riesgos — Riesgos.
- **Historia de usuario asociada:** HU47.
- **Criterios de aceptación asociados:** CA227, CA228.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Registro de planes de contingencia con alternativas.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** riesgos: Lluvia intensa durante la ceremonia al aire libre; Retraso del proveedor de sonido; responsable: Camila Rojas; ubicacion: Jardines de Miraflores
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E08-Riesgos; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA227, CA228.
- **Resultado obtenido:** Funcionalidad no implementada: planes de contingencia; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints.
- **Evidencia directa:** test/E08-Riesgos/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: planes de contingencia; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E08-Riesgos/evidencias/casos-prueba.json; test/E08-Riesgos/evidencias/resultado.md; test/E08-Riesgos/resultado-final.md.

### CP-E08-HU47-02 — Consulta de planes desde el riesgo

- **Épica:** E08-Riesgos — Riesgos.
- **Historia de usuario asociada:** HU47.
- **Criterios de aceptación asociados:** CA229.
- **Tipo de prueba:** MIXTO.
- **Estado final:** FAIL.
- **Objetivo:** Consulta de planes desde el riesgo.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** riesgos: Lluvia intensa durante la ceremonia al aire libre; Retraso del proveedor de sonido; responsable: Camila Rojas; ubicacion: Jardines de Miraflores
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E08-Riesgos; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA229.
- **Resultado obtenido:** Funcionalidad no implementada: consulta de planes; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints.
- **Evidencia directa:** test/E08-Riesgos/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: consulta de planes; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E08-Riesgos/evidencias/casos-prueba.json; test/E08-Riesgos/evidencias/resultado.md; test/E08-Riesgos/resultado-final.md.

### CP-E08-HU47-03 — Activación de plan de contingencia

- **Épica:** E08-Riesgos — Riesgos.
- **Historia de usuario asociada:** HU47.
- **Criterios de aceptación asociados:** CA230.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Activación de plan de contingencia.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** riesgos: Lluvia intensa durante la ceremonia al aire libre; Retraso del proveedor de sonido; responsable: Camila Rojas; ubicacion: Jardines de Miraflores
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E08-Riesgos; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA230.
- **Resultado obtenido:** Funcionalidad no implementada: activación de contingencia; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints.
- **Evidencia directa:** test/E08-Riesgos/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: activación de contingencia; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E08-Riesgos/evidencias/casos-prueba.json; test/E08-Riesgos/evidencias/resultado.md; test/E08-Riesgos/resultado-final.md.

### CP-E08-HU47-04 — Historial y versionado de planes

- **Épica:** E08-Riesgos — Riesgos.
- **Historia de usuario asociada:** HU47.
- **Criterios de aceptación asociados:** CA231.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Historial y versionado de planes.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** riesgos: Lluvia intensa durante la ceremonia al aire libre; Retraso del proveedor de sonido; responsable: Camila Rojas; ubicacion: Jardines de Miraflores
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E08-Riesgos; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA231.
- **Resultado obtenido:** Funcionalidad no implementada: historial de planes; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints.
- **Evidencia directa:** test/E08-Riesgos/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: historial de planes; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E08-Riesgos/evidencias/casos-prueba.json; test/E08-Riesgos/evidencias/resultado.md; test/E08-Riesgos/resultado-final.md.

### CP-E08-HU48-01 — Consulta del catálogo base de riesgos

- **Épica:** E08-Riesgos — Riesgos.
- **Historia de usuario asociada:** HU48.
- **Criterios de aceptación asociados:** CA232, CA233.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Consulta del catálogo base de riesgos.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** riesgos: Lluvia intensa durante la ceremonia al aire libre; Retraso del proveedor de sonido; responsable: Camila Rojas; ubicacion: Jardines de Miraflores
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E08-Riesgos; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA232, CA233.
- **Resultado obtenido:** Funcionalidad no implementada: catálogo de riesgos; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints.
- **Evidencia directa:** test/E08-Riesgos/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: catálogo de riesgos; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E08-Riesgos/evidencias/casos-prueba.json; test/E08-Riesgos/evidencias/resultado.md; test/E08-Riesgos/resultado-final.md.

### CP-E08-HU48-02 — Búsqueda y filtrado de riesgos

- **Épica:** E08-Riesgos — Riesgos.
- **Historia de usuario asociada:** HU48.
- **Criterios de aceptación asociados:** CA234.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Búsqueda y filtrado de riesgos.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** riesgos: Lluvia intensa durante la ceremonia al aire libre; Retraso del proveedor de sonido; responsable: Camila Rojas; ubicacion: Jardines de Miraflores
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E08-Riesgos; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA234.
- **Resultado obtenido:** Funcionalidad no implementada: filtros de riesgos; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints.
- **Evidencia directa:** test/E08-Riesgos/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: filtros de riesgos; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E08-Riesgos/evidencias/casos-prueba.json; test/E08-Riesgos/evidencias/resultado.md; test/E08-Riesgos/resultado-final.md.

### CP-E08-HU48-03 — Consulta de mitigaciones y planes predefinidos

- **Épica:** E08-Riesgos — Riesgos.
- **Historia de usuario asociada:** HU48.
- **Criterios de aceptación asociados:** CA235.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Consulta de mitigaciones y planes predefinidos.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** riesgos: Lluvia intensa durante la ceremonia al aire libre; Retraso del proveedor de sonido; responsable: Camila Rojas; ubicacion: Jardines de Miraflores
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E08-Riesgos; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA235.
- **Resultado obtenido:** Funcionalidad no implementada: mitigaciones predefinidas; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints.
- **Evidencia directa:** test/E08-Riesgos/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: mitigaciones predefinidas; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E08-Riesgos/evidencias/casos-prueba.json; test/E08-Riesgos/evidencias/resultado.md; test/E08-Riesgos/resultado-final.md.

### CP-E08-HU48-04 — Incorporación de riesgo desde catálogo

- **Épica:** E08-Riesgos — Riesgos.
- **Historia de usuario asociada:** HU48.
- **Criterios de aceptación asociados:** CA236.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Incorporación de riesgo desde catálogo.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** riesgos: Lluvia intensa durante la ceremonia al aire libre; Retraso del proveedor de sonido; responsable: Camila Rojas; ubicacion: Jardines de Miraflores
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E08-Riesgos; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA236.
- **Resultado obtenido:** Funcionalidad no implementada: instancia operacional independiente; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints.
- **Evidencia directa:** test/E08-Riesgos/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: instancia operacional independiente; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E08-Riesgos/evidencias/casos-prueba.json; test/E08-Riesgos/evidencias/resultado.md; test/E08-Riesgos/resultado-final.md.

### CP-E08-HU49-01 — Generación de alerta por riesgo crítico o incidencia

- **Épica:** E08-Riesgos — Riesgos.
- **Historia de usuario asociada:** HU49.
- **Criterios de aceptación asociados:** CA237, CA238.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Generación de alerta por riesgo crítico o incidencia.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** riesgos: Lluvia intensa durante la ceremonia al aire libre; Retraso del proveedor de sonido; responsable: Camila Rojas; ubicacion: Jardines de Miraflores
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E08-Riesgos; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA237, CA238.
- **Resultado obtenido:** Funcionalidad no implementada: alertas de riesgos; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints.
- **Evidencia directa:** test/E08-Riesgos/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: alertas de riesgos; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E08-Riesgos/evidencias/casos-prueba.json; test/E08-Riesgos/evidencias/resultado.md; test/E08-Riesgos/resultado-final.md.

### CP-E08-HU49-02 — Acceso desde alerta a riesgo y acciones de respuesta

- **Épica:** E08-Riesgos — Riesgos.
- **Historia de usuario asociada:** HU49.
- **Criterios de aceptación asociados:** CA239, CA240.
- **Tipo de prueba:** MIXTO.
- **Estado final:** FAIL.
- **Objetivo:** Acceso desde alerta a riesgo y acciones de respuesta.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** riesgos: Lluvia intensa durante la ceremonia al aire libre; Retraso del proveedor de sonido; responsable: Camila Rojas; ubicacion: Jardines de Miraflores
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E08-Riesgos; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA239, CA240.
- **Resultado obtenido:** Funcionalidad no implementada: referencias de alerta; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints.
- **Evidencia directa:** test/E08-Riesgos/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: referencias de alerta; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E08-Riesgos/evidencias/casos-prueba.json; test/E08-Riesgos/evidencias/resultado.md; test/E08-Riesgos/resultado-final.md.

### CP-E08-HU49-03 — Estado de atención de la alerta

- **Épica:** E08-Riesgos — Riesgos.
- **Historia de usuario asociada:** HU49.
- **Criterios de aceptación asociados:** CA241.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Estado de atención de la alerta.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** riesgos: Lluvia intensa durante la ceremonia al aire libre; Retraso del proveedor de sonido; responsable: Camila Rojas; ubicacion: Jardines de Miraflores
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E08-Riesgos; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA241.
- **Resultado obtenido:** Funcionalidad no implementada: estado de alerta de riesgo; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints.
- **Evidencia directa:** test/E08-Riesgos/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: estado de alerta de riesgo; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E08-Riesgos/evidencias/casos-prueba.json; test/E08-Riesgos/evidencias/resultado.md; test/E08-Riesgos/resultado-final.md.

### CP-E08-HU50-01 — Registro de gasto extraordinario

- **Épica:** E08-Riesgos — Riesgos.
- **Historia de usuario asociada:** HU50.
- **Criterios de aceptación asociados:** CA242.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Registro de gasto extraordinario.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** riesgos: Lluvia intensa durante la ceremonia al aire libre; Retraso del proveedor de sonido; responsable: Camila Rojas; ubicacion: Jardines de Miraflores
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E08-Riesgos; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA242.
- **Resultado obtenido:** Funcionalidad no implementada: gastos de riesgo; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints.
- **Evidencia directa:** test/E08-Riesgos/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: gastos de riesgo; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E08-Riesgos/evidencias/casos-prueba.json; test/E08-Riesgos/evidencias/resultado.md; test/E08-Riesgos/resultado-final.md.

### CP-E08-HU50-02 — Comprobante asociado a gasto de riesgo

- **Épica:** E08-Riesgos — Riesgos.
- **Historia de usuario asociada:** HU50.
- **Criterios de aceptación asociados:** CA243.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Comprobante asociado a gasto de riesgo.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** riesgos: Lluvia intensa durante la ceremonia al aire libre; Retraso del proveedor de sonido; responsable: Camila Rojas; ubicacion: Jardines de Miraflores
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E08-Riesgos; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA243.
- **Resultado obtenido:** Funcionalidad no implementada: comprobantes de riesgo; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints.
- **Evidencia directa:** test/E08-Riesgos/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: comprobantes de riesgo; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E08-Riesgos/evidencias/casos-prueba.json; test/E08-Riesgos/evidencias/resultado.md; test/E08-Riesgos/resultado-final.md.

### CP-E08-HU50-03 — Impacto financiero de los gastos de riesgo

- **Épica:** E08-Riesgos — Riesgos.
- **Historia de usuario asociada:** HU50.
- **Criterios de aceptación asociados:** CA244, CA245.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Impacto financiero de los gastos de riesgo.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** riesgos: Lluvia intensa durante la ceremonia al aire libre; Retraso del proveedor de sonido; responsable: Camila Rojas; ubicacion: Jardines de Miraflores
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E08-Riesgos; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA244, CA245.
- **Resultado obtenido:** Funcionalidad no implementada: integración financiera de riesgos; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints.
- **Evidencia directa:** test/E08-Riesgos/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: integración financiera de riesgos; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E08-Riesgos/evidencias/casos-prueba.json; test/E08-Riesgos/evidencias/resultado.md; test/E08-Riesgos/resultado-final.md.

### CP-E08-HU50-04 — Inclusión de gastos de riesgo en reportes

- **Épica:** E08-Riesgos — Riesgos.
- **Historia de usuario asociada:** HU50.
- **Criterios de aceptación asociados:** CA246.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Inclusión de gastos de riesgo en reportes.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** riesgos: Lluvia intensa durante la ceremonia al aire libre; Retraso del proveedor de sonido; responsable: Camila Rojas; ubicacion: Jardines de Miraflores
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E08-Riesgos; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA246.
- **Resultado obtenido:** Funcionalidad no implementada: reportes financieros de riesgos; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints.
- **Evidencia directa:** test/E08-Riesgos/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: reportes financieros de riesgos; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E08-Riesgos/evidencias/casos-prueba.json; test/E08-Riesgos/evidencias/resultado.md; test/E08-Riesgos/resultado-final.md.

### CP-E08-HU51-01 — Evaluación y cálculo automático de severidad

- **Épica:** E08-Riesgos — Riesgos.
- **Historia de usuario asociada:** HU51.
- **Criterios de aceptación asociados:** CA247, CA248.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Evaluación y cálculo automático de severidad.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** riesgos: Lluvia intensa durante la ceremonia al aire libre; Retraso del proveedor de sonido; responsable: Camila Rojas; ubicacion: Jardines de Miraflores
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E08-Riesgos; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA247, CA248.
- **Resultado obtenido:** Funcionalidad no implementada: matriz de severidad; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints.
- **Evidencia directa:** test/E08-Riesgos/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: matriz de severidad; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E08-Riesgos/evidencias/casos-prueba.json; test/E08-Riesgos/evidencias/resultado.md; test/E08-Riesgos/resultado-final.md.

### CP-E08-HU51-02 — Matriz y consulta por severidad

- **Épica:** E08-Riesgos — Riesgos.
- **Historia de usuario asociada:** HU51.
- **Criterios de aceptación asociados:** CA249, CA250.
- **Tipo de prueba:** MIXTO.
- **Estado final:** FAIL.
- **Objetivo:** Matriz y consulta por severidad.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** riesgos: Lluvia intensa durante la ceremonia al aire libre; Retraso del proveedor de sonido; responsable: Camila Rojas; ubicacion: Jardines de Miraflores
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E08-Riesgos; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA249, CA250.
- **Resultado obtenido:** Funcionalidad no implementada: consulta por severidad; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints.
- **Evidencia directa:** test/E08-Riesgos/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: consulta por severidad; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E08-Riesgos/evidencias/casos-prueba.json; test/E08-Riesgos/evidencias/resultado.md; test/E08-Riesgos/resultado-final.md.

### CP-E08-HU51-03 — Recálculo de severidad

- **Épica:** E08-Riesgos — Riesgos.
- **Historia de usuario asociada:** HU51.
- **Criterios de aceptación asociados:** CA251.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Recálculo de severidad.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** riesgos: Lluvia intensa durante la ceremonia al aire libre; Retraso del proveedor de sonido; responsable: Camila Rojas; ubicacion: Jardines de Miraflores
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E08-Riesgos; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA251.
- **Resultado obtenido:** Funcionalidad no implementada: recálculo de severidad; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints.
- **Evidencia directa:** test/E08-Riesgos/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: recálculo de severidad; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E08-Riesgos/evidencias/casos-prueba.json; test/E08-Riesgos/evidencias/resultado.md; test/E08-Riesgos/resultado-final.md.

### CP-E08-HU52-01 — Sugerencia automática de medidas de mitigación

- **Épica:** E08-Riesgos — Riesgos.
- **Historia de usuario asociada:** HU52.
- **Criterios de aceptación asociados:** CA252, CA253.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Sugerencia automática de medidas de mitigación.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** riesgos: Lluvia intensa durante la ceremonia al aire libre; Retraso del proveedor de sonido; responsable: Camila Rojas; ubicacion: Jardines de Miraflores
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E08-Riesgos; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA252, CA253.
- **Resultado obtenido:** Funcionalidad no implementada: sugerencias de mitigación; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints.
- **Evidencia directa:** test/E08-Riesgos/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: sugerencias de mitigación; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E08-Riesgos/evidencias/casos-prueba.json; test/E08-Riesgos/evidencias/resultado.md; test/E08-Riesgos/resultado-final.md.

### CP-E08-HU52-02 — Vinculación y estado de medidas/protocolos

- **Épica:** E08-Riesgos — Riesgos.
- **Historia de usuario asociada:** HU52.
- **Criterios de aceptación asociados:** CA254, CA255.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Vinculación y estado de medidas/protocolos.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** riesgos: Lluvia intensa durante la ceremonia al aire libre; Retraso del proveedor de sonido; responsable: Camila Rojas; ubicacion: Jardines de Miraflores
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E08-Riesgos; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA254, CA255.
- **Resultado obtenido:** Funcionalidad no implementada: estados de mitigación; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints.
- **Evidencia directa:** test/E08-Riesgos/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: estados de mitigación; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E08-Riesgos/evidencias/casos-prueba.json; test/E08-Riesgos/evidencias/resultado.md; test/E08-Riesgos/resultado-final.md.

### CP-E08-HU52-03 — Recálculo de sugerencias conservando historial

- **Épica:** E08-Riesgos — Riesgos.
- **Historia de usuario asociada:** HU52.
- **Criterios de aceptación asociados:** CA256.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Recálculo de sugerencias conservando historial.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** riesgos: Lluvia intensa durante la ceremonia al aire libre; Retraso del proveedor de sonido; responsable: Camila Rojas; ubicacion: Jardines de Miraflores
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E08-Riesgos; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA256.
- **Resultado obtenido:** Funcionalidad no implementada: historial de sugerencias; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints.
- **Evidencia directa:** test/E08-Riesgos/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: historial de sugerencias; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E08-Riesgos/evidencias/casos-prueba.json; test/E08-Riesgos/evidencias/resultado.md; test/E08-Riesgos/resultado-final.md.

### CP-E09-HU53-01 — Consulta, búsqueda y filtrado de Wedding Planners

- **Épica:** E09-Administracion — Administración.
- **Historia de usuario asociada:** HU53.
- **Criterios de aceptación asociados:** CA257, CA259.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Consulta, búsqueda y filtrado de Wedding Planners.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** weddingPlanners: Lucía Fernández Rojas; Daniel Paredes Silva; reporte: Consulta sobre recuperación de acceso; catalogo: Metodología de planificación por fases
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E09-Administracion; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA257, CA259.
- **Resultado obtenido:** Funcionalidad no implementada: gestión administrativa de Wedding Planners; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos.
- **Evidencia directa:** test/E09-Administracion/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: gestión administrativa de Wedding Planners; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E09-Administracion/evidencias/casos-prueba.json; test/E09-Administracion/evidencias/resultado.md; test/E09-Administracion/resultado-final.md.

### CP-E09-HU53-02 — Creación y actualización administrativa de Wedding Planner

- **Épica:** E09-Administracion — Administración.
- **Historia de usuario asociada:** HU53.
- **Criterios de aceptación asociados:** CA258.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Creación y actualización administrativa de Wedding Planner.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** weddingPlanners: Lucía Fernández Rojas; Daniel Paredes Silva; reporte: Consulta sobre recuperación de acceso; catalogo: Metodología de planificación por fases
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E09-Administracion; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA258.
- **Resultado obtenido:** Funcionalidad no implementada: alta administrativa de Wedding Planner; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos.
- **Evidencia directa:** test/E09-Administracion/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: alta administrativa de Wedding Planner; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E09-Administracion/evidencias/casos-prueba.json; test/E09-Administracion/evidencias/resultado.md; test/E09-Administracion/resultado-final.md.

### CP-E09-HU53-03 — Métricas de uso de Wedding Planner

- **Épica:** E09-Administracion — Administración.
- **Historia de usuario asociada:** HU53.
- **Criterios de aceptación asociados:** CA260.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Métricas de uso de Wedding Planner.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** weddingPlanners: Lucía Fernández Rojas; Daniel Paredes Silva; reporte: Consulta sobre recuperación de acceso; catalogo: Metodología de planificación por fases
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E09-Administracion; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA260.
- **Resultado obtenido:** Funcionalidad no implementada: métricas administrativas; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos.
- **Evidencia directa:** test/E09-Administracion/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: métricas administrativas; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E09-Administracion/evidencias/casos-prueba.json; test/E09-Administracion/evidencias/resultado.md; test/E09-Administracion/resultado-final.md.

### CP-E09-HU53-04 — Eliminación condicionada por historial

- **Épica:** E09-Administracion — Administración.
- **Historia de usuario asociada:** HU53.
- **Criterios de aceptación asociados:** CA261.
- **Tipo de prueba:** MIXTO.
- **Estado final:** FAIL.
- **Objetivo:** Eliminación condicionada por historial.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** weddingPlanners: Lucía Fernández Rojas; Daniel Paredes Silva; reporte: Consulta sobre recuperación de acceso; catalogo: Metodología de planificación por fases
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E09-Administracion; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA261.
- **Resultado obtenido:** Funcionalidad no implementada: eliminación condicionada; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos.
- **Evidencia directa:** test/E09-Administracion/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: eliminación condicionada; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E09-Administracion/evidencias/casos-prueba.json; test/E09-Administracion/evidencias/resultado.md; test/E09-Administracion/resultado-final.md.

### CP-E09-HU54-01 — Registro y cálculo de inactividad

- **Épica:** E09-Administracion — Administración.
- **Historia de usuario asociada:** HU54.
- **Criterios de aceptación asociados:** CA262.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Registro y cálculo de inactividad.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** weddingPlanners: Lucía Fernández Rojas; Daniel Paredes Silva; reporte: Consulta sobre recuperación de acceso; catalogo: Metodología de planificación por fases
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E09-Administracion; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA262.
- **Resultado obtenido:** Funcionalidad no implementada: política de inactividad; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos.
- **Evidencia directa:** test/E09-Administracion/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: política de inactividad; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E09-Administracion/evidencias/casos-prueba.json; test/E09-Administracion/evidencias/resultado.md; test/E09-Administracion/resultado-final.md.

### CP-E09-HU54-02 — Alerta previa por inactividad

- **Épica:** E09-Administracion — Administración.
- **Historia de usuario asociada:** HU54.
- **Criterios de aceptación asociados:** CA263.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Alerta previa por inactividad.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** weddingPlanners: Lucía Fernández Rojas; Daniel Paredes Silva; reporte: Consulta sobre recuperación de acceso; catalogo: Metodología de planificación por fases
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E09-Administracion; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA263.
- **Resultado obtenido:** Funcionalidad no implementada: alerta previa de inactividad; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos.
- **Evidencia directa:** test/E09-Administracion/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: alerta previa de inactividad; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E09-Administracion/evidencias/casos-prueba.json; test/E09-Administracion/evidencias/resultado.md; test/E09-Administracion/resultado-final.md.

### CP-E09-HU54-03 — Desactivación automática por inactividad

- **Épica:** E09-Administracion — Administración.
- **Historia de usuario asociada:** HU54.
- **Criterios de aceptación asociados:** CA264.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Desactivación automática por inactividad.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** weddingPlanners: Lucía Fernández Rojas; Daniel Paredes Silva; reporte: Consulta sobre recuperación de acceso; catalogo: Metodología de planificación por fases
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E09-Administracion; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA264.
- **Resultado obtenido:** Funcionalidad no implementada: scheduler de inactividad; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos.
- **Evidencia directa:** test/E09-Administracion/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: scheduler de inactividad; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E09-Administracion/evidencias/casos-prueba.json; test/E09-Administracion/evidencias/resultado.md; test/E09-Administracion/resultado-final.md.

### CP-E09-HU54-04 — Desactivación manual conservando historial

- **Épica:** E09-Administracion — Administración.
- **Historia de usuario asociada:** HU54.
- **Criterios de aceptación asociados:** CA265, CA266.
- **Tipo de prueba:** MIXTO.
- **Estado final:** FAIL.
- **Objetivo:** Desactivación manual conservando historial.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** weddingPlanners: Lucía Fernández Rojas; Daniel Paredes Silva; reporte: Consulta sobre recuperación de acceso; catalogo: Metodología de planificación por fases
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E09-Administracion; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA265, CA266.
- **Resultado obtenido:** Funcionalidad no implementada: suspensión administrativa auditada; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos.
- **Evidencia directa:** test/E09-Administracion/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: suspensión administrativa auditada; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E09-Administracion/evidencias/casos-prueba.json; test/E09-Administracion/evidencias/resultado.md; test/E09-Administracion/resultado-final.md.

### CP-E09-HU55-01 — Consulta de cuentas desactivadas

- **Épica:** E09-Administracion — Administración.
- **Historia de usuario asociada:** HU55.
- **Criterios de aceptación asociados:** CA267.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Consulta de cuentas desactivadas.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** weddingPlanners: Lucía Fernández Rojas; Daniel Paredes Silva; reporte: Consulta sobre recuperación de acceso; catalogo: Metodología de planificación por fases
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E09-Administracion; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA267.
- **Resultado obtenido:** Funcionalidad no implementada: listado administrativo de suspendidas; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos.
- **Evidencia directa:** test/E09-Administracion/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: listado administrativo de suspendidas; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E09-Administracion/evidencias/casos-prueba.json; test/E09-Administracion/evidencias/resultado.md; test/E09-Administracion/resultado-final.md.

### CP-E09-HU55-02 — Reactivación y recuperación de acceso

- **Épica:** E09-Administracion — Administración.
- **Historia de usuario asociada:** HU55.
- **Criterios de aceptación asociados:** CA268, CA269.
- **Tipo de prueba:** MIXTO.
- **Estado final:** FAIL.
- **Objetivo:** Reactivación y recuperación de acceso.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** weddingPlanners: Lucía Fernández Rojas; Daniel Paredes Silva; reporte: Consulta sobre recuperación de acceso; catalogo: Metodología de planificación por fases
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E09-Administracion; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA268, CA269.
- **Resultado obtenido:** Funcionalidad no implementada: reactivación administrativa; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos.
- **Evidencia directa:** test/E09-Administracion/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: reactivación administrativa; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E09-Administracion/evidencias/casos-prueba.json; test/E09-Administracion/evidencias/resultado.md; test/E09-Administracion/resultado-final.md.

### CP-E09-HU55-03 — Conservación y auditoría de reactivación

- **Épica:** E09-Administracion — Administración.
- **Historia de usuario asociada:** HU55.
- **Criterios de aceptación asociados:** CA270.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Conservación y auditoría de reactivación.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** weddingPlanners: Lucía Fernández Rojas; Daniel Paredes Silva; reporte: Consulta sobre recuperación de acceso; catalogo: Metodología de planificación por fases
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E09-Administracion; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA270.
- **Resultado obtenido:** Funcionalidad no implementada: auditoría de reactivación; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos.
- **Evidencia directa:** test/E09-Administracion/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: auditoría de reactivación; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E09-Administracion/evidencias/casos-prueba.json; test/E09-Administracion/evidencias/resultado.md; test/E09-Administracion/resultado-final.md.

### CP-E09-HU56-01 — Registro y actualización de elemento del catálogo

- **Épica:** E09-Administracion — Administración.
- **Historia de usuario asociada:** HU56.
- **Criterios de aceptación asociados:** CA271, CA272.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Registro y actualización de elemento del catálogo.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** weddingPlanners: Lucía Fernández Rojas; Daniel Paredes Silva; reporte: Consulta sobre recuperación de acceso; catalogo: Metodología de planificación por fases
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E09-Administracion; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA271, CA272.
- **Resultado obtenido:** Funcionalidad no implementada: catálogo global administrativo; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos.
- **Evidencia directa:** test/E09-Administracion/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: catálogo global administrativo; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E09-Administracion/evidencias/casos-prueba.json; test/E09-Administracion/evidencias/resultado.md; test/E09-Administracion/resultado-final.md.

### CP-E09-HU56-02 — Desactivación sin afectar proyectos existentes

- **Épica:** E09-Administracion — Administración.
- **Historia de usuario asociada:** HU56.
- **Criterios de aceptación asociados:** CA273.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Desactivación sin afectar proyectos existentes.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** weddingPlanners: Lucía Fernández Rojas; Daniel Paredes Silva; reporte: Consulta sobre recuperación de acceso; catalogo: Metodología de planificación por fases
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E09-Administracion; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA273.
- **Resultado obtenido:** Funcionalidad no implementada: desactivación de catálogo; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos.
- **Evidencia directa:** test/E09-Administracion/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: desactivación de catálogo; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E09-Administracion/evidencias/casos-prueba.json; test/E09-Administracion/evidencias/resultado.md; test/E09-Administracion/resultado-final.md.

### CP-E09-HU56-03 — Versionado del catálogo global

- **Épica:** E09-Administracion — Administración.
- **Historia de usuario asociada:** HU56.
- **Criterios de aceptación asociados:** CA274.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Versionado del catálogo global.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** weddingPlanners: Lucía Fernández Rojas; Daniel Paredes Silva; reporte: Consulta sobre recuperación de acceso; catalogo: Metodología de planificación por fases
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E09-Administracion; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA274.
- **Resultado obtenido:** Funcionalidad no implementada: versionado de catálogo; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos.
- **Evidencia directa:** test/E09-Administracion/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: versionado de catálogo; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E09-Administracion/evidencias/casos-prueba.json; test/E09-Administracion/evidencias/resultado.md; test/E09-Administracion/resultado-final.md.

### CP-E09-HU57-01 — Registro de reporte de soporte

- **Épica:** E09-Administracion — Administración.
- **Historia de usuario asociada:** HU57.
- **Criterios de aceptación asociados:** CA275.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Registro de reporte de soporte.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** weddingPlanners: Lucía Fernández Rojas; Daniel Paredes Silva; reporte: Consulta sobre recuperación de acceso; catalogo: Metodología de planificación por fases
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E09-Administracion; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA275.
- **Resultado obtenido:** Funcionalidad no implementada: reportes de soporte; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos.
- **Evidencia directa:** test/E09-Administracion/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: reportes de soporte; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E09-Administracion/evidencias/casos-prueba.json; test/E09-Administracion/evidencias/resultado.md; test/E09-Administracion/resultado-final.md.

### CP-E09-HU57-02 — Consulta y filtrado de reportes

- **Épica:** E09-Administracion — Administración.
- **Historia de usuario asociada:** HU57.
- **Criterios de aceptación asociados:** CA276.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Consulta y filtrado de reportes.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** weddingPlanners: Lucía Fernández Rojas; Daniel Paredes Silva; reporte: Consulta sobre recuperación de acceso; catalogo: Metodología de planificación por fases
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E09-Administracion; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA276.
- **Resultado obtenido:** Funcionalidad no implementada: bandeja de soporte; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos.
- **Evidencia directa:** test/E09-Administracion/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: bandeja de soporte; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E09-Administracion/evidencias/casos-prueba.json; test/E09-Administracion/evidencias/resultado.md; test/E09-Administracion/resultado-final.md.

### CP-E09-HU57-03 — Actualización del estado de soporte

- **Épica:** E09-Administracion — Administración.
- **Historia de usuario asociada:** HU57.
- **Criterios de aceptación asociados:** CA277.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Actualización del estado de soporte.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** weddingPlanners: Lucía Fernández Rojas; Daniel Paredes Silva; reporte: Consulta sobre recuperación de acceso; catalogo: Metodología de planificación por fases
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E09-Administracion; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA277.
- **Resultado obtenido:** Funcionalidad no implementada: estados de soporte; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos.
- **Evidencia directa:** test/E09-Administracion/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: estados de soporte; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E09-Administracion/evidencias/casos-prueba.json; test/E09-Administracion/evidencias/resultado.md; test/E09-Administracion/resultado-final.md.

### CP-E09-HU57-04 — Respuesta, notificación e historial de soporte

- **Épica:** E09-Administracion — Administración.
- **Historia de usuario asociada:** HU57.
- **Criterios de aceptación asociados:** CA278, CA279.
- **Tipo de prueba:** AUTOMATIZADO.
- **Estado final:** FAIL.
- **Objetivo:** Respuesta, notificación e historial de soporte.
- **Alcance y regla evaluada:** Se evaluó exclusivamente la capacidad trazada a los criterios indicados, sin implementar funcionalidades para forzar un resultado.
- **Precondiciones:** Entorno y evidencia de pruebas configurados para la épica correspondiente.
- **Datos de prueba:** weddingPlanners: Lucía Fernández Rojas; Daniel Paredes Silva; reporte: Consulta sobre recuperación de acceso; catalogo: Metodología de planificación por fases
- **Qué se utilizó y cómo:** Se usaron los fixtures, solicitudes, servicios, DTOs, contratos o componentes registrados por la evidencia de E09-Administracion; se evaluaron según el flujo real disponible.
- **Componente/endpoint evaluado:** Consultar la evidencia técnica de la épica.
- **Pasos ejecutados:** Se ejecutó la prueba automatizada o auditoría documentada para el caso.
- **Resultado esperado:** Cumplir CA278, CA279.
- **Resultado obtenido:** Funcionalidad no implementada: respuesta e historial de soporte; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos.
- **Evidencia directa:** test/E09-Administracion/evidencias/ y resultado-final.md.
- **Observaciones:** —
- **Detalle técnico:** Funcionalidad no implementada: respuesta e historial de soporte; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Clasificación del hallazgo:** Brecha funcional, comportamiento incompleto o criterio no cubierto; no se acreditó PASS por una regla diferente.
- **Trazabilidad de archivos:** test/E09-Administracion/evidencias/casos-prueba.json; test/E09-Administracion/evidencias/resultado.md; test/E09-Administracion/resultado-final.md.

## Pruebas unitarias, API, integración y manuales

- Los tipos, conteos y resultados se preservan desde cada épica.
- Los casos MANUAL y la parte visual de MIXTO requieren ejecución documentada en Flutter/Web.
- Los mensajes de Jest, requests, responses y diagnósticos se mantienen en los anexos y rutas de evidencia.

## Errores encontrados, corregidos y reejecutados

Los errores, correcciones y reejecuciones se presentan íntegros por épica en el Anexo A. Este consolidado no elimina ni reclasifica hallazgos de sus informes de origen.

## Casos manuales pendientes

Los casos MANUAL y aspectos visuales de MIXTO se conservan pendientes hasta una verificación explícita; sus limitaciones y pasos están en cada ficha y en los informes originales.

## Anexo A — Informes individuales íntegros por épica

### E01-Acceso — Acceso y autenticación

**Datos de prueba registrados:** idEjecucion: 20261026212901; weddingPlanners: nombreCompleto: Daniela Ramírez Torres; correoBase: daniela.ramirez.*@example.com; empresa: Ramírez Eventos; nombreCompleto: Alejandra Castro Montalvo; correoBase: alejandra.castro.*@example.com; empresa: Castro Eventos; parejas: pareja: Mateo Salinas e Isabella Cárdenas; uso: Borradores de HU06; reglaIdentificadores: El sufijo técnico de ejecución evita colisiones; la identidad visible se conserva legible.

**Ejecución registrada:** epica: E01-Acceso; fecha: 2026-10-26T20:34:28.551Z; pruebasAutomaticasEjecutadas: 1; resultado: PASS; alcance: Control del runner y protección del entorno de pruebas. Los casos funcionales HU01-HU06 se agregan en sus carpetas automatico/.; baseDeDatos: postgresql://postgres:****@localhost:5432/gestion_matrimonios_test

# Resultado final E01-Acceso

| Métrica | Resultado |
|---|---:|
| Casos conceptuales | 24 |
| Ejecuciones/variantes Jest | 24 |
| PASS | 10 |
| FAIL | 11 |
| Manuales pendientes | 3 |
| Resultado global automático | FAIL |

## Tabla principal

| Caso | CA | Estado | Resultado obtenido | Interpretación |
|---|---|---|---|---|
| CP-E01-HU01-01 – Registro exitoso de una nueva cuenta Wedding Planner | CA001, CA004, CA005 | PASS | Se enviaron datos válidos de persona, empresa, usuario y contraseña. El flujo creó una cuenta PROJECT_MANAGER con correo verificado. | La cuenta Wedding Planner quedó disponible para autenticación. |
| CP-E01-HU01-02 – Validación de campos obligatorios y correo | CA001 | PASS | Las cuatro variantes —nombres vacíos, apellido vacío, correo vacío y correo inválido— respondieron HTTP 400. | La API aplicó las validaciones requeridas. |
| CP-E01-HU01-03 – Política y confirmación de contraseña | CA002 | FAIL | El DTO no contempla confirmación de contraseña. NestJS rechazó el campo como propiedad no permitida antes de comparar ambos valores. | Hay rechazo HTTP, pero no por la regla CA002 de coincidencia. |
| CP-E01-HU01-04 – Rechazo de correo previamente registrado | CA003 | PASS | Tras crear la primera cuenta, una nueva solicitud con el mismo correo respondió HTTP 409. | El correo no pudo reutilizarse. |
| CP-E01-HU02-01 – Generación de correo de verificación | CA006 | FAIL | Se capturó un correo de prueba con código numérico único de seis dígitos; no contiene enlace de verificación. | CA006 exige enlace único; el mecanismo actual no lo cumple literalmente. |
| CP-E01-HU02-02 – Confirmación de correo vigente | CA007 | PASS | El código vigente fue confirmado y la cuenta quedó con correo verificado. | La verificación mediante el mecanismo actual funciona. |
| CP-E01-HU02-03 – Rechazo de token inválido, usado o expirado | CA008 | PASS | Los tokens inexistente, usado y expirado fueron rechazados con HTTP 400. | La validación de invalidez, uso y expiración funciona. |
| CP-E01-HU02-04 – Bloqueo de acceso sin correo verificado | CA009 | PASS | Una cuenta pendiente recibió HTTP 403 al intentar iniciar sesión. | El backend bloquea el acceso antes de verificar el correo. |
| CP-E01-HU02-05 – Control de reenvíos de verificación | CA010 | FAIL | Dos solicitudes consecutivas de reenvío fueron aceptadas y generaron dos mecanismos. | No se observó limitación temporal; CA010 no se cumple. |
| CP-E01-HU03-01 – Inicio de sesión válido | CA011, CA014 | PASS | La cuenta verificada recibió access token, refresh token y tipo PROJECT_MANAGER. | La autenticación y el tipo de usuario funcionaron. |
| CP-E01-HU03-02 – Rechazo genérico de credenciales inválidas | CA012 | PASS | Contraseña incorrecta y correo inexistente devolvieron HTTP 401 con el mismo mensaje. | No se reveló cuál credencial era incorrecta. |
| CP-E01-HU03-03 – Bloqueo de cuenta no verificada | CA013 | PASS | La cuenta pendiente recibió HTTP 403 al iniciar sesión. | Se aplica la restricción de verificación. |
| CP-E01-HU03-04 – Renovación de sesión con refresh token | CA015 | PASS | El refresh token vigente fue aceptado y se entregó un nuevo par de tokens. | La reapertura de Flutter queda como verificación manual. |
| CP-E01-HU04-01 – Consulta de información personal del perfil | CA016 | FAIL | GET /usuarios/:id devolvió datos de cuenta, pero no nombres, apellidos, correo ni teléfono. | No existe API de perfil con los datos CA016. |
| CP-E01-HU04-02 – Actualización de datos personales y contacto | CA017, CA019, CA020 | FAIL | PATCH /usuarios/:id recibió los campos personales y respondió HTTP 400 porque no pertenecen al DTO. | El endpoint no permite la actualización exigida. |
| CP-E01-HU04-03 – Validación de correo en el perfil | CA018 | FAIL | correoElectronico fue rechazado como propiedad no permitida antes de evaluar el formato. | La validación específica de formato CA018 no se ejecuta. |
| CP-E01-HU05-01 – Botón y confirmación de cerrar sesión | CA021, CA022 | MANUAL | Pendiente de ejecutar visualmente en Flutter. | Una prueba API no acredita botón ni diálogo visual. |
| CP-E01-HU05-02 – Revocación de sesión al cerrar sesión | CA023, CA024 | FAIL | El refresh token fue revocado, pero el access token previo permitió GET /usuarios/:id con HTTP 200. | El access token vigente no se invalida; CA024 falla. |
| CP-E01-HU05-03 – Expiración de sesión por inactividad | CA025 | FAIL | No existe SESSION_INACTIVITY_TIMEOUT ni política backend de inactividad. | No existe soporte verificable para CA025. |
| CP-E01-HU06-01 – Listado aislado por Wedding Planner | CA026 | FAIL | Con sesión WP-A se crearon borradores de WP-A y WP-B; el resumen HTTP 200 devolvió ambos. | El endpoint no filtra por Wedding Planner. |
| CP-E01-HU06-02 – Selección de matrimonio activo | CA027 | MANUAL | Pendiente de ejecutar en Flutter. | No existe endpoint backend para matrimonio activo. |
| CP-E01-HU06-03 – Aislamiento de información entre Wedding Planners | CA028 | FAIL | La consulta autenticada como WP-A incluyó un proyecto creado por WP-B. | Se confirmó filtración entre matrimonios. |
| CP-E01-HU06-04 – Cambio de matrimonio activo | CA029 | MANUAL | Pendiente de ejecutar en Flutter. | El cambio de contexto es una interacción frontend. |
| CP-E01-HU06-05 – Búsqueda y filtros de matrimonios | CA030 | FAIL | Aun enviando búsqueda y fechas, la respuesta incluyó el borrador de WP-B. | El resumen ignora parámetros y no implementa búsqueda/filtros. |

## Detalle por caso

### CP-E01-HU01-01 – Registro exitoso de una nueva cuenta Wedding Planner

- **ID:** CP-E01-HU01-01
- **HU:** HU01
- **CA:** CA001, CA004, CA005
- **Tipo de prueba:** AUTOMATIZADO
- **Objetivo:** Registrar cuenta Wedding Planner válida.
- **Precondiciones:** Base de datos de pruebas vacía y catálogos base cargados.
- **Datos utilizados:** Solicitudes sintéticas de registro; CP02 usa nombre, apellido y correo vacíos, y correo inválido.
- **Endpoint/componente:** POST /api/v1/auth/registro/*
- **Pasos ejecutados:** Se enviaron las acciones del caso y se verificó la respuesta y sus efectos observables.
- **Resultado esperado:** Crear la cuenta Wedding Planner, asociarla a su persona y permitir continuar al acceso.
- **Resultado obtenido:** Se enviaron datos válidos de persona, empresa, usuario y contraseña. El flujo creó una cuenta PROJECT_MANAGER con correo verificado.
- **Interpretación:** La cuenta Wedding Planner quedó disponible para autenticación.
- **Estado:** PASS
- **Evidencia técnica:** Ver resultados-automaticos.json de la HU.
- **Observaciones:** —

### CP-E01-HU01-02 – Validación de campos obligatorios y correo

- **ID:** CP-E01-HU01-02
- **HU:** HU01
- **CA:** CA001
- **Tipo de prueba:** AUTOMATIZADO
- **Objetivo:** Rechazar obligatorios o correo inválido.
- **Precondiciones:** Base de datos de pruebas vacía y catálogos base cargados.
- **Datos utilizados:** Solicitudes sintéticas de registro; CP02 usa nombre, apellido y correo vacíos, y correo inválido.
- **Endpoint/componente:** POST /api/v1/auth/registro/solicitar
- **Pasos ejecutados:** Se enviaron las acciones del caso y se verificó la respuesta y sus efectos observables. Variantes evaluadas: nombres vacío, apellido vacío, correo vacío, correo inválido.
- **Resultado esperado:** Rechazar cada campo obligatorio vacío y un correo con formato inválido.
- **Resultado obtenido:** Las cuatro variantes —nombres vacíos, apellido vacío, correo vacío y correo inválido— respondieron HTTP 400.
- **Interpretación:** La API aplicó las validaciones requeridas.
- **Estado:** PASS
- **Evidencia técnica:** Ver resultados-automaticos.json de la HU.
- **Observaciones:** —

### CP-E01-HU01-03 – Política y confirmación de contraseña

- **ID:** CP-E01-HU01-03
- **HU:** HU01
- **CA:** CA002
- **Tipo de prueba:** AUTOMATIZADO
- **Objetivo:** Validar política y confirmación de contraseña.
- **Precondiciones:** Base de datos de pruebas vacía y catálogos base cargados.
- **Datos utilizados:** Solicitudes sintéticas de registro; CP02 usa nombre, apellido y correo vacíos, y correo inválido.
- **Endpoint/componente:** POST /api/v1/auth/registro/finalizar
- **Pasos ejecutados:** Se enviaron las acciones del caso y se verificó la respuesta y sus efectos observables.
- **Resultado esperado:** Comprobar política de contraseña y que contraseña y confirmación coincidan.
- **Resultado obtenido:** El DTO no contempla confirmación de contraseña. NestJS rechazó el campo como propiedad no permitida antes de comparar ambos valores.
- **Interpretación:** Hay rechazo HTTP, pero no por la regla CA002 de coincidencia.
- **Estado:** FAIL
- **Evidencia técnica:** Disponible en la sección “Detalle técnico de fallos”.
- **Observaciones:** —

### CP-E01-HU01-04 – Rechazo de correo previamente registrado

- **ID:** CP-E01-HU01-04
- **HU:** HU01
- **CA:** CA003
- **Tipo de prueba:** AUTOMATIZADO
- **Objetivo:** Rechazar correo duplicado.
- **Precondiciones:** Base de datos de pruebas vacía y catálogos base cargados.
- **Datos utilizados:** Solicitudes sintéticas de registro; CP02 usa nombre, apellido y correo vacíos, y correo inválido.
- **Endpoint/componente:** POST /api/v1/auth/registro/solicitar
- **Pasos ejecutados:** Se enviaron las acciones del caso y se verificó la respuesta y sus efectos observables.
- **Resultado esperado:** No crear una segunda cuenta con el mismo correo.
- **Resultado obtenido:** Tras crear la primera cuenta, una nueva solicitud con el mismo correo respondió HTTP 409.
- **Interpretación:** El correo no pudo reutilizarse.
- **Estado:** PASS
- **Evidencia técnica:** Ver resultados-automaticos.json de la HU.
- **Observaciones:** —

### CP-E01-HU02-01 – Generación de correo de verificación

- **ID:** CP-E01-HU02-01
- **HU:** HU02
- **CA:** CA006
- **Tipo de prueba:** AUTOMATIZADO
- **Objetivo:** Generar verificación de correo.
- **Precondiciones:** Base de datos de pruebas vacía y catálogos base cargados.
- **Datos utilizados:** Cuenta pendiente sintética, token/código capturado y solicitudes de verificación.
- **Endpoint/componente:** POST /api/v1/auth/registro/solicitar
- **Pasos ejecutados:** Se enviaron las acciones del caso y se verificó la respuesta y sus efectos observables.
- **Resultado esperado:** Enviar un correo que contenga un enlace único de verificación.
- **Resultado obtenido:** Se capturó un correo de prueba con código numérico único de seis dígitos; no contiene enlace de verificación.
- **Interpretación:** CA006 exige enlace único; el mecanismo actual no lo cumple literalmente.
- **Estado:** FAIL
- **Evidencia técnica:** Disponible en la sección “Detalle técnico de fallos”.
- **Observaciones:** —

### CP-E01-HU02-02 – Confirmación de correo vigente

- **ID:** CP-E01-HU02-02
- **HU:** HU02
- **CA:** CA007
- **Tipo de prueba:** AUTOMATIZADO
- **Objetivo:** Confirmar verificación vigente.
- **Precondiciones:** Base de datos de pruebas vacía y catálogos base cargados.
- **Datos utilizados:** Cuenta pendiente sintética, token/código capturado y solicitudes de verificación.
- **Endpoint/componente:** POST /api/v1/auth/registro/confirmar
- **Pasos ejecutados:** Se enviaron las acciones del caso y se verificó la respuesta y sus efectos observables.
- **Resultado esperado:** Confirmar una cuenta mediante un mecanismo vigente.
- **Resultado obtenido:** El código vigente fue confirmado y la cuenta quedó con correo verificado.
- **Interpretación:** La verificación mediante el mecanismo actual funciona.
- **Estado:** PASS
- **Evidencia técnica:** Ver resultados-automaticos.json de la HU.
- **Observaciones:** —

### CP-E01-HU02-03 – Rechazo de token inválido, usado o expirado

- **ID:** CP-E01-HU02-03
- **HU:** HU02
- **CA:** CA008
- **Tipo de prueba:** AUTOMATIZADO
- **Objetivo:** Rechazar token inválido, usado o expirado.
- **Precondiciones:** Base de datos de pruebas vacía y catálogos base cargados.
- **Datos utilizados:** Cuenta pendiente sintética, token/código capturado y solicitudes de verificación.
- **Endpoint/componente:** POST /api/v1/auth/registro/confirmar
- **Pasos ejecutados:** Se enviaron las acciones del caso y se verificó la respuesta y sus efectos observables.
- **Resultado esperado:** Rechazar tokens inexistentes, usados o expirados.
- **Resultado obtenido:** Los tokens inexistente, usado y expirado fueron rechazados con HTTP 400.
- **Interpretación:** La validación de invalidez, uso y expiración funciona.
- **Estado:** PASS
- **Evidencia técnica:** Ver resultados-automaticos.json de la HU.
- **Observaciones:** —

### CP-E01-HU02-04 – Bloqueo de acceso sin correo verificado

- **ID:** CP-E01-HU02-04
- **HU:** HU02
- **CA:** CA009
- **Tipo de prueba:** AUTOMATIZADO
- **Objetivo:** Bloquear login pendiente.
- **Precondiciones:** Base de datos de pruebas vacía y catálogos base cargados.
- **Datos utilizados:** Cuenta pendiente sintética, token/código capturado y solicitudes de verificación.
- **Endpoint/componente:** POST /api/v1/auth/login
- **Pasos ejecutados:** Se enviaron las acciones del caso y se verificó la respuesta y sus efectos observables.
- **Resultado esperado:** Impedir que una cuenta pendiente acceda.
- **Resultado obtenido:** Una cuenta pendiente recibió HTTP 403 al intentar iniciar sesión.
- **Interpretación:** El backend bloquea el acceso antes de verificar el correo.
- **Estado:** PASS
- **Evidencia técnica:** Ver resultados-automaticos.json de la HU.
- **Observaciones:** —

### CP-E01-HU02-05 – Control de reenvíos de verificación

- **ID:** CP-E01-HU02-05
- **HU:** HU02
- **CA:** CA010
- **Tipo de prueba:** AUTOMATIZADO
- **Objetivo:** Limitar reenvíos frecuentes.
- **Precondiciones:** Base de datos de pruebas vacía y catálogos base cargados.
- **Datos utilizados:** Cuenta pendiente sintética, token/código capturado y solicitudes de verificación.
- **Endpoint/componente:** POST /api/v1/auth/verificar-correo/solicitar
- **Pasos ejecutados:** Se enviaron las acciones del caso y se verificó la respuesta y sus efectos observables.
- **Resultado esperado:** Evitar reenvíos repetidos dentro de un intervalo corto.
- **Resultado obtenido:** Dos solicitudes consecutivas de reenvío fueron aceptadas y generaron dos mecanismos.
- **Interpretación:** No se observó limitación temporal; CA010 no se cumple.
- **Estado:** FAIL
- **Evidencia técnica:** Disponible en la sección “Detalle técnico de fallos”.
- **Observaciones:** —

### CP-E01-HU03-01 – Inicio de sesión válido

- **ID:** CP-E01-HU03-01
- **HU:** HU03
- **CA:** CA011, CA014
- **Tipo de prueba:** AUTOMATIZADO
- **Objetivo:** Iniciar sesión verificada.
- **Precondiciones:** Base de datos de pruebas vacía y catálogos base cargados.
- **Datos utilizados:** Credenciales válidas, inválidas y pendientes; refresh token emitido por el backend.
- **Endpoint/componente:** POST /api/v1/auth/login
- **Pasos ejecutados:** Se enviaron las acciones del caso y se verificó la respuesta y sus efectos observables.
- **Resultado esperado:** Aceptar credenciales válidas de una cuenta verificada y aplicar PROJECT_MANAGER.
- **Resultado obtenido:** La cuenta verificada recibió access token, refresh token y tipo PROJECT_MANAGER.
- **Interpretación:** La autenticación y el tipo de usuario funcionaron.
- **Estado:** PASS
- **Evidencia técnica:** Ver resultados-automaticos.json de la HU.
- **Observaciones:** —

### CP-E01-HU03-02 – Rechazo genérico de credenciales inválidas

- **ID:** CP-E01-HU03-02
- **HU:** HU03
- **CA:** CA012
- **Tipo de prueba:** AUTOMATIZADO
- **Objetivo:** Rechazar credenciales sin revelar el campo erróneo.
- **Precondiciones:** Base de datos de pruebas vacía y catálogos base cargados.
- **Datos utilizados:** Credenciales válidas, inválidas y pendientes; refresh token emitido por el backend.
- **Endpoint/componente:** POST /api/v1/auth/login
- **Pasos ejecutados:** Se enviaron las acciones del caso y se verificó la respuesta y sus efectos observables.
- **Resultado esperado:** Rechazar credenciales inválidas sin revelar cuál campo falló.
- **Resultado obtenido:** Contraseña incorrecta y correo inexistente devolvieron HTTP 401 con el mismo mensaje.
- **Interpretación:** No se reveló cuál credencial era incorrecta.
- **Estado:** PASS
- **Evidencia técnica:** Ver resultados-automaticos.json de la HU.
- **Observaciones:** —

### CP-E01-HU03-03 – Bloqueo de cuenta no verificada

- **ID:** CP-E01-HU03-03
- **HU:** HU03
- **CA:** CA013
- **Tipo de prueba:** AUTOMATIZADO
- **Objetivo:** Bloquear cuenta pendiente.
- **Precondiciones:** Base de datos de pruebas vacía y catálogos base cargados.
- **Datos utilizados:** Credenciales válidas, inválidas y pendientes; refresh token emitido por el backend.
- **Endpoint/componente:** POST /api/v1/auth/login
- **Pasos ejecutados:** Se enviaron las acciones del caso y se verificó la respuesta y sus efectos observables.
- **Resultado esperado:** Rechazar el acceso de una cuenta aún no verificada.
- **Resultado obtenido:** La cuenta pendiente recibió HTTP 403 al iniciar sesión.
- **Interpretación:** Se aplica la restricción de verificación.
- **Estado:** PASS
- **Evidencia técnica:** Ver resultados-automaticos.json de la HU.
- **Observaciones:** —

### CP-E01-HU03-04 – Renovación de sesión con refresh token

- **ID:** CP-E01-HU03-04
- **HU:** HU03
- **CA:** CA015
- **Tipo de prueba:** MIXTO
- **Objetivo:** Mantener sesión vigente y rotar refresh.
- **Precondiciones:** Base de datos de pruebas vacía y catálogos base cargados.
- **Datos utilizados:** Credenciales válidas, inválidas y pendientes; refresh token emitido por el backend.
- **Endpoint/componente:** POST /api/v1/auth/refresh
- **Pasos ejecutados:** Se enviaron las acciones del caso y se verificó la respuesta y sus efectos observables.
- **Resultado esperado:** Renovar una sesión vigente sin pedir credenciales otra vez.
- **Resultado obtenido:** El refresh token vigente fue aceptado y se entregó un nuevo par de tokens.
- **Interpretación:** La reapertura de Flutter queda como verificación manual.
- **Estado:** PASS
- **Evidencia técnica:** Ver resultados-automaticos.json de la HU.
- **Observaciones:** La parte Flutter permanece documentada como manual.

### CP-E01-HU04-01 – Consulta de información personal del perfil

- **ID:** CP-E01-HU04-01
- **HU:** HU04
- **CA:** CA016
- **Tipo de prueba:** AUTOMATIZADO
- **Objetivo:** Consultar perfil autenticado.
- **Precondiciones:** Base de datos de pruebas vacía y catálogos base cargados.
- **Datos utilizados:** Cuenta autenticada y payload con datos personales y de contacto.
- **Endpoint/componente:** GET /api/v1/usuarios/:id
- **Pasos ejecutados:** Se enviaron las acciones del caso y se verificó la respuesta y sus efectos observables.
- **Resultado esperado:** Devolver los datos personales y de contacto del perfil autenticado.
- **Resultado obtenido:** GET /usuarios/:id devolvió datos de cuenta, pero no nombres, apellidos, correo ni teléfono.
- **Interpretación:** No existe API de perfil con los datos CA016.
- **Estado:** FAIL
- **Evidencia técnica:** Disponible en la sección “Detalle técnico de fallos”.
- **Observaciones:** —

### CP-E01-HU04-02 – Actualización de datos personales y contacto

- **ID:** CP-E01-HU04-02
- **HU:** HU04
- **CA:** CA017, CA019, CA020
- **Tipo de prueba:** AUTOMATIZADO
- **Objetivo:** Actualizar datos personales/contacto.
- **Precondiciones:** Base de datos de pruebas vacía y catálogos base cargados.
- **Datos utilizados:** Cuenta autenticada y payload con datos personales y de contacto.
- **Endpoint/componente:** PATCH /api/v1/usuarios/:id
- **Pasos ejecutados:** Se enviaron las acciones del caso y se verificó la respuesta y sus efectos observables.
- **Resultado esperado:** Actualizar nombres, apellidos, correo y teléfono permitidos.
- **Resultado obtenido:** PATCH /usuarios/:id recibió los campos personales y respondió HTTP 400 porque no pertenecen al DTO.
- **Interpretación:** El endpoint no permite la actualización exigida.
- **Estado:** FAIL
- **Evidencia técnica:** Disponible en la sección “Detalle técnico de fallos”.
- **Observaciones:** —

### CP-E01-HU04-03 – Validación de correo en el perfil

- **ID:** CP-E01-HU04-03
- **HU:** HU04
- **CA:** CA018
- **Tipo de prueba:** AUTOMATIZADO
- **Objetivo:** Validar perfil inválido.
- **Precondiciones:** Base de datos de pruebas vacía y catálogos base cargados.
- **Datos utilizados:** Cuenta autenticada y payload con datos personales y de contacto.
- **Endpoint/componente:** PATCH /api/v1/usuarios/:id
- **Pasos ejecutados:** Se enviaron las acciones del caso y se verificó la respuesta y sus efectos observables.
- **Resultado esperado:** Informar una validación de correo cuando su formato sea inválido.
- **Resultado obtenido:** correoElectronico fue rechazado como propiedad no permitida antes de evaluar el formato.
- **Interpretación:** La validación específica de formato CA018 no se ejecuta.
- **Estado:** FAIL
- **Evidencia técnica:** Disponible en la sección “Detalle técnico de fallos”.
- **Observaciones:** —

### CP-E01-HU05-01 – Botón y confirmación de cerrar sesión

- **ID:** CP-E01-HU05-01
- **HU:** HU05
- **CA:** CA021, CA022
- **Tipo de prueba:** MANUAL
- **Objetivo:** Comprobar botón y confirmación Flutter.
- **Precondiciones:** Base de datos de pruebas vacía y catálogos base cargados.
- **Datos utilizados:** Access token y refresh token de una sesión sintética autenticada.
- **Endpoint/componente:** Componente Flutter de perfil
- **Pasos ejecutados:** Se enviaron las acciones del caso y se verificó la respuesta y sus efectos observables.
- **Resultado esperado:** Mostrar botón de cierre de sesión y confirmación en Flutter.
- **Resultado obtenido:** Pendiente de ejecutar visualmente en Flutter.
- **Interpretación:** Una prueba API no acredita botón ni diálogo visual.
- **Estado:** MANUAL
- **Evidencia técnica:** Ver resultados-automaticos.json de la HU.
- **Observaciones:** —

### CP-E01-HU05-02 – Revocación de sesión al cerrar sesión

- **ID:** CP-E01-HU05-02
- **HU:** HU05
- **CA:** CA023, CA024
- **Tipo de prueba:** MIXTO
- **Objetivo:** Cerrar sesión y bloquear acceso posterior.
- **Precondiciones:** Base de datos de pruebas vacía y catálogos base cargados.
- **Datos utilizados:** Access token y refresh token de una sesión sintética autenticada.
- **Endpoint/componente:** POST logout y GET usuarios/:id
- **Pasos ejecutados:** Se enviaron las acciones del caso y se verificó la respuesta y sus efectos observables.
- **Resultado esperado:** Revocar la sesión y rechazar sus tokens posteriores.
- **Resultado obtenido:** El refresh token fue revocado, pero el access token previo permitió GET /usuarios/:id con HTTP 200.
- **Interpretación:** El access token vigente no se invalida; CA024 falla.
- **Estado:** FAIL
- **Evidencia técnica:** Disponible en la sección “Detalle técnico de fallos”.
- **Observaciones:** La parte Flutter permanece documentada como manual.

### CP-E01-HU05-03 – Expiración de sesión por inactividad

- **ID:** CP-E01-HU05-03
- **HU:** HU05
- **CA:** CA025
- **Tipo de prueba:** AUTOMATIZADO
- **Objetivo:** Aplicar inactividad.
- **Precondiciones:** Base de datos de pruebas vacía y catálogos base cargados.
- **Datos utilizados:** Access token y refresh token de una sesión sintética autenticada.
- **Endpoint/componente:** Configuración de sesión y guard JWT
- **Pasos ejecutados:** Se enviaron las acciones del caso y se verificó la respuesta y sus efectos observables.
- **Resultado esperado:** Invalidar la sesión tras el periodo de inactividad configurado.
- **Resultado obtenido:** No existe SESSION_INACTIVITY_TIMEOUT ni política backend de inactividad.
- **Interpretación:** No existe soporte verificable para CA025.
- **Estado:** FAIL
- **Evidencia técnica:** Disponible en la sección “Detalle técnico de fallos”.
- **Observaciones:** —

### CP-E01-HU06-01 – Listado aislado por Wedding Planner

- **ID:** CP-E01-HU06-01
- **HU:** HU06
- **CA:** CA026
- **Tipo de prueba:** AUTOMATIZADO
- **Objetivo:** Listar solo matrimonios de WP-A.
- **Precondiciones:** Base de datos de pruebas vacía y catálogos base cargados.
- **Datos utilizados:** Dos Wedding Planners autenticadas (WP-A/WP-B), con borradores y DNI únicos.
- **Endpoint/componente:** GET /api/v1/matrimonios/resumen
- **Pasos ejecutados:** Se enviaron las acciones del caso y se verificó la respuesta y sus efectos observables.
- **Resultado esperado:** Devolver únicamente matrimonios pertenecientes a la WP autenticada.
- **Resultado obtenido:** Con sesión WP-A se crearon borradores de WP-A y WP-B; el resumen HTTP 200 devolvió ambos.
- **Interpretación:** El endpoint no filtra por Wedding Planner.
- **Estado:** FAIL
- **Evidencia técnica:** Disponible en la sección “Detalle técnico de fallos”.
- **Observaciones:** —

### CP-E01-HU06-02 – Selección de matrimonio activo

- **ID:** CP-E01-HU06-02
- **HU:** HU06
- **CA:** CA027
- **Tipo de prueba:** MANUAL
- **Objetivo:** Seleccionar matrimonio activo.
- **Precondiciones:** Base de datos de pruebas vacía y catálogos base cargados.
- **Datos utilizados:** Dos Wedding Planners autenticadas (WP-A/WP-B), con borradores y DNI únicos.
- **Endpoint/componente:** Selector Flutter
- **Pasos ejecutados:** Se enviaron las acciones del caso y se verificó la respuesta y sus efectos observables.
- **Resultado esperado:** Permitir seleccionar el matrimonio activo desde Flutter.
- **Resultado obtenido:** Pendiente de ejecutar en Flutter.
- **Interpretación:** No existe endpoint backend para matrimonio activo.
- **Estado:** MANUAL
- **Evidencia técnica:** Ver resultados-automaticos.json de la HU.
- **Observaciones:** —

### CP-E01-HU06-03 – Aislamiento de información entre Wedding Planners

- **ID:** CP-E01-HU06-03
- **HU:** HU06
- **CA:** CA028
- **Tipo de prueba:** AUTOMATIZADO
- **Objetivo:** Aislar información entre matrimonios.
- **Precondiciones:** Base de datos de pruebas vacía y catálogos base cargados.
- **Datos utilizados:** Dos Wedding Planners autenticadas (WP-A/WP-B), con borradores y DNI únicos.
- **Endpoint/componente:** GET /api/v1/matrimonios/resumen
- **Pasos ejecutados:** Se enviaron las acciones del caso y se verificó la respuesta y sus efectos observables.
- **Resultado esperado:** No exponer proyectos de otra Wedding Planner.
- **Resultado obtenido:** La consulta autenticada como WP-A incluyó un proyecto creado por WP-B.
- **Interpretación:** Se confirmó filtración entre matrimonios.
- **Estado:** FAIL
- **Evidencia técnica:** Disponible en la sección “Detalle técnico de fallos”.
- **Observaciones:** —

### CP-E01-HU06-04 – Cambio de matrimonio activo

- **ID:** CP-E01-HU06-04
- **HU:** HU06
- **CA:** CA029
- **Tipo de prueba:** MANUAL
- **Objetivo:** Cambiar matrimonio activo.
- **Precondiciones:** Base de datos de pruebas vacía y catálogos base cargados.
- **Datos utilizados:** Dos Wedding Planners autenticadas (WP-A/WP-B), con borradores y DNI únicos.
- **Endpoint/componente:** Selector Flutter
- **Pasos ejecutados:** Se enviaron las acciones del caso y se verificó la respuesta y sus efectos observables.
- **Resultado esperado:** Permitir cambiar el matrimonio activo desde Flutter.
- **Resultado obtenido:** Pendiente de ejecutar en Flutter.
- **Interpretación:** El cambio de contexto es una interacción frontend.
- **Estado:** MANUAL
- **Evidencia técnica:** Ver resultados-automaticos.json de la HU.
- **Observaciones:** —

### CP-E01-HU06-05 – Búsqueda y filtros de matrimonios

- **ID:** CP-E01-HU06-05
- **HU:** HU06
- **CA:** CA030
- **Tipo de prueba:** AUTOMATIZADO
- **Objetivo:** Buscar y filtrar matrimonios.
- **Precondiciones:** Base de datos de pruebas vacía y catálogos base cargados.
- **Datos utilizados:** Dos Wedding Planners autenticadas (WP-A/WP-B), con borradores y DNI únicos.
- **Endpoint/componente:** GET /api/v1/matrimonios/resumen
- **Pasos ejecutados:** Se enviaron las acciones del caso y se verificó la respuesta y sus efectos observables.
- **Resultado esperado:** Aplicar búsqueda por pareja y filtros de fecha sin mostrar datos ajenos.
- **Resultado obtenido:** Aun enviando búsqueda y fechas, la respuesta incluyó el borrador de WP-B.
- **Interpretación:** El resumen ignora parámetros y no implementa búsqueda/filtros.
- **Estado:** FAIL
- **Evidencia técnica:** Disponible en la sección “Detalle técnico de fallos”.
- **Observaciones:** —

## Detalle técnico de fallos

### CP-E01-HU01-03

- La API no implementa un campo de confirmación de contraseña; el rechazo proviene de forbidNonWhitelisted y no de la regla CA002.

### CP-E01-HU02-01

- El mecanismo real es un código de seis dígitos; CA006 exige un enlace único en el correo.

### CP-E01-HU02-05

- expect(received).toBeLessThanOrEqual(expected)<br><br>Expected: <= 1<br>Received:    2

### CP-E01-HU04-01

- expect(received).toHaveProperty(path)<br><br>Expected path: "nombres"<br>Received path: []<br><br>Received value: {"correoVerificado": true, "esActivo": true, "fechaCreacion": "2026-10-26T21:29:16.864753Z", "fechaModificacion": "2026-10-26T21:29:17.043Z", "idEntidad": 33, "idPersonaNatural": 68, "idUsuario": 68, "tipoUsuario": "PROJECT_MANAGER", "ultimoAcceso": "2026-10-26T21:29:17.038Z", "usuario": "claudia.benites.212901.1"}

### CP-E01-HU04-02

- expect(received).toBe(expected) // Object.is equality<br><br>Expected: 200<br>Received: 400

### CP-E01-HU04-03

- expect(received).toMatch(expected)<br><br>Expected pattern: /email/i<br>Received string:  "property correoElectronico should not exist"

### CP-E01-HU05-02

- expect(received).toBe(expected) // Object.is equality<br><br>Expected: 401<br>Received: 200

### CP-E01-HU05-03

- No existe una política SESSION_INACTIVITY_TIMEOUT configurada ni lógica backend de expiración por inactividad.

### CP-E01-HU06-01

- expect(received).not.toContain(expected) // indexOf<br><br>Expected value: not "05d6ebf0-288e-40c7-8f0d-3d7c91c7ca0b"<br>Received array:     ["f50027fd-49d2-451b-94bf-b2e1a623ecba", "14207977-02ec-4e24-ac45-d0a14c8a662b", "62c8f06e-a536-47e4-8840-82455bfca7be", "19495816-b0e0-428e-8815-9f55eee622f1", "74064226-1c2a-48ab-80b1-f3668fbc9181", "6dd8ec29-3bda-4942-bcf2-883e4db386b8", "a3582d52-9139-400a-abdd-cf64bb745755", "05d6ebf0-288e-40c7-8f0d-3d7c91c7ca0b"]

### CP-E01-HU06-03

- expect(received).not.toContain(expected) // indexOf<br><br>Expected value: not "4bf1556b-04d4-4551-96b3-b36f39fbe5fe"<br>Received array:     ["f50027fd-49d2-451b-94bf-b2e1a623ecba", "14207977-02ec-4e24-ac45-d0a14c8a662b", "62c8f06e-a536-47e4-8840-82455bfca7be", "19495816-b0e0-428e-8815-9f55eee622f1", "74064226-1c2a-48ab-80b1-f3668fbc9181", "6dd8ec29-3bda-4942-bcf2-883e4db386b8", "a3582d52-9139-400a-abdd-cf64bb745755", "05d6ebf0-288e-40c7-8f0d-3d7c91c7ca0b", "450b9c1f-0fcf-419b-9df8-c9a6d237b2d5", "4bf1556b-04d4-4551-96b3-b36f39fbe5fe"]

### CP-E01-HU06-05

- expect(received).not.toContain(expected) // indexOf<br><br>Expected value: not "cd84a255-65d3-42d3-9f59-432219ed5e02"<br>Received array:     ["f50027fd-49d2-451b-94bf-b2e1a623ecba", "14207977-02ec-4e24-ac45-d0a14c8a662b", "62c8f06e-a536-47e4-8840-82455bfca7be", "19495816-b0e0-428e-8815-9f55eee622f1", "74064226-1c2a-48ab-80b1-f3668fbc9181", "6dd8ec29-3bda-4942-bcf2-883e4db386b8", "a3582d52-9139-400a-abdd-cf64bb745755", "05d6ebf0-288e-40c7-8f0d-3d7c91c7ca0b", "450b9c1f-0fcf-419b-9df8-c9a6d237b2d5", "4bf1556b-04d4-4551-96b3-b36f39fbe5fe", "3768b853-15fe-485c-9a0a-1df4ce7dc344", "cd84a255-65d3-42d3-9f59-432219ed5e02"]

## Resumen de diagnóstico

### Fallos reales del sistema

- CA002: no compara confirmación de contraseña.
- CA006: correo con código, no enlace único.
- CA010: no limita reenvíos consecutivos.
- CA016 a CA020: no existe API de perfil personal/contacto.
- CA024: access token sigue vigente tras logout.
- CA025: no existe política de inactividad.
- CA026, CA028 y CA030: resumen sin aislamiento, búsqueda ni filtros.

### Funcionalidades no implementadas

Confirmación de contraseña; enlace de verificación; rate limit; perfil; invalidación de access token; inactividad; contexto activo; filtro/búsqueda de matrimonios.

### Errores encontrados en las pruebas

- HU06-01, HU06-03 y HU06-05 esperaban HTTP 401 sin autenticar; el supuesto era incorrecto.
- HU05-03 usaba un matcher sobre una variable indefinida.
- HU02-03 no ejercía inicialmente el token expirado.

### Casos corregidos y reejecutados

- HU06-01, HU06-03 y HU06-05: ahora usan WP-A/WP-B autenticadas; resultado nuevo: FAIL por filtración real.
- HU05-03: ahora verifica la política explícitamente; resultado nuevo: FAIL por ausencia de política.
- HU02-03: ahora expira un registro controlado en BD de prueba; resultado nuevo: PASS.


---

### E02-Usuarios — Usuarios

**Datos de prueba registrados:** weddingPlanners: Daniela Ramírez Torres; Alejandra Castro Montalvo; colaborador: Jorge Medina Salas; pareja: Lucía Paredes Rojas; matrimonios: Boda de Lucía Paredes y Andrés Flores; Boda de Renata Silva y Diego Campos; nota: No se crearon registros operativos: el esquema actual no contiene entidades de miembros/permisos.

**Ejecución registrada:** comando: pnpm.cmd test:e02; alcance: Solo test/E02-Usuarios; excluye: E01-Acceso; E03-Proyecto; E04-Cronograma; E05-Presupuesto; E06-Invitados; E07-Proveedores; E08-Riesgos; E09-Administracion; backup

# Resultado final E02-Usuarios

| Métrica | Resultado |
|---|---:|
| Casos conceptuales | 10 |
| Ejecuciones/variantes Jest | 11 |
| Automatizados | 9 |
| Manuales | 0 |
| Mixtos | 1 |
| PASS | 0 |
| FAIL | 10 |
| Pendientes/no ejecutables | 0 |

## Tabla principal

| Caso | Nombre | CA | Estado | Resultado obtenido | Interpretación |
|---|---|---|---|---|---|
| CP-E02-HU08-01 | Incorporación de un miembro con rol operativo | CA036 | FAIL | La auditoría del contrato Prisma y de los módulos actuales no encontró entidades, DTOs, controladores ni endpoint para miembros, roles operativos o permisos por proyecto. | La funcionalidad requerida no está implementada en el modelo ni en los controladores actuales; el criterio no puede cumplirse. |
| CP-E02-HU08-02 | Invitación del nuevo miembro al proyecto | CA037 | FAIL | La auditoría del contrato Prisma y de los módulos actuales no encontró entidades, DTOs, controladores ni endpoint para miembros, roles operativos o permisos por proyecto. | La funcionalidad requerida no está implementada en el modelo ni en los controladores actuales; el criterio no puede cumplirse. |
| CP-E02-HU08-03 | Asignación de múltiples roles operativos | CA038 | FAIL | La auditoría del contrato Prisma y de los módulos actuales no encontró entidades, DTOs, controladores ni endpoint para miembros, roles operativos o permisos por proyecto. | La funcionalidad requerida no está implementada en el modelo ni en los controladores actuales; el criterio no puede cumplirse. |
| CP-E02-HU08-04 | Modificación de roles con conservación del historial | CA039 | FAIL | La auditoría del contrato Prisma y de los módulos actuales no encontró entidades, DTOs, controladores ni endpoint para miembros, roles operativos o permisos por proyecto. | La funcionalidad requerida no está implementada en el modelo ni en los controladores actuales; el criterio no puede cumplirse. |
| CP-E02-HU08-05 | Inhabilitación de un colaborador | CA040 | FAIL | La auditoría del contrato Prisma y de los módulos actuales no encontró entidades, DTOs, controladores ni endpoint para miembros, roles operativos o permisos por proyecto. | La funcionalidad requerida no está implementada en el modelo ni en los controladores actuales; el criterio no puede cumplirse. |
| CP-E02-HU09-01 | Acceso inicial según tipo de usuario | CA041 | FAIL | La auditoría del contrato Prisma y de los módulos actuales no encontró entidades, DTOs, controladores ni endpoint para miembros, roles operativos o permisos por proyecto. | La funcionalidad requerida no está implementada en el modelo ni en los controladores actuales; el criterio no puede cumplirse. |
| CP-E02-HU09-02 | Configuración de permisos de consulta y modificación | CA042 | FAIL | La auditoría del contrato Prisma y de los módulos actuales no encontró entidades, DTOs, controladores ni endpoint para miembros, roles operativos o permisos por proyecto. | La funcionalidad requerida no está implementada en el modelo ni en los controladores actuales; el criterio no puede cumplirse. |
| CP-E02-HU09-03 | Bloqueo de operaciones sin autorización | CA043 | FAIL | La auditoría del contrato Prisma y de los módulos actuales no encontró entidades, DTOs, controladores ni endpoint para miembros, roles operativos o permisos por proyecto. | La funcionalidad requerida no está implementada en el modelo ni en los controladores actuales; el criterio no puede cumplirse. |
| CP-E02-HU09-04 | Independencia de permisos entre matrimonios | CA044 | FAIL | La auditoría del contrato Prisma y de los módulos actuales no encontró entidades, DTOs, controladores ni endpoint para miembros, roles operativos o permisos por proyecto. | La funcionalidad requerida no está implementada en el modelo ni en los controladores actuales; el criterio no puede cumplirse. |
| CP-E02-HU09-05 | Visualización según permisos y asignaciones vigentes | CA045 | FAIL | La auditoría del contrato Prisma y de los módulos actuales no encontró entidades, DTOs, controladores ni endpoint para miembros, roles operativos o permisos por proyecto. | La funcionalidad requerida no está implementada en el modelo ni en los controladores actuales; el criterio no puede cumplirse. |

## Detalle por caso

### CP-E02-HU08-01 – Incorporación de un miembro con rol operativo

- **ID:** CP-E02-HU08-01
- **HU:** HU08
- **CA:** CA036
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Incorporación de un miembro con rol operativo.
- **Precondiciones:** Base de pruebas configurada y catálogos base disponibles.
- **Datos utilizados:** Daniela Ramírez Torres como Wedding Planner y Jorge Medina Salas como colaborador invitado.
- **Endpoint/componente:** No disponible; auditoría de contrato y módulos
- **Pasos ejecutados:** Se invocó la ruta que correspondería a la operación.
- **Resultado esperado:** Incorporar a Jorge Medina Salas con correo y al menos un rol, sin registros parciales.
- **Resultado obtenido:** La auditoría del contrato Prisma y de los módulos actuales no encontró entidades, DTOs, controladores ni endpoint para miembros, roles operativos o permisos por proyecto.
- **Interpretación:** La funcionalidad requerida no está implementada en el modelo ni en los controladores actuales; el criterio no puede cumplirse.
- **Estado:** FAIL
- **Evidencia:** Disponible en Detalle técnico.
- **Observaciones:** —

### CP-E02-HU08-02 – Invitación del nuevo miembro al proyecto

- **ID:** CP-E02-HU08-02
- **HU:** HU08
- **CA:** CA037
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Invitación del nuevo miembro al proyecto.
- **Precondiciones:** Base de pruebas configurada y catálogos base disponibles.
- **Datos utilizados:** Daniela Ramírez Torres como Wedding Planner y Jorge Medina Salas como colaborador invitado.
- **Endpoint/componente:** No disponible; auditoría de contrato y módulos
- **Pasos ejecutados:** Se invocó la ruta que correspondería a la operación.
- **Resultado esperado:** Generar y enviar una invitación vinculada al miembro y al proyecto.
- **Resultado obtenido:** La auditoría del contrato Prisma y de los módulos actuales no encontró entidades, DTOs, controladores ni endpoint para miembros, roles operativos o permisos por proyecto.
- **Interpretación:** La funcionalidad requerida no está implementada en el modelo ni en los controladores actuales; el criterio no puede cumplirse.
- **Estado:** FAIL
- **Evidencia:** Disponible en Detalle técnico.
- **Observaciones:** —

### CP-E02-HU08-03 – Asignación de múltiples roles operativos

- **ID:** CP-E02-HU08-03
- **HU:** HU08
- **CA:** CA038
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Asignación de múltiples roles operativos.
- **Precondiciones:** Base de pruebas configurada y catálogos base disponibles.
- **Datos utilizados:** Daniela Ramírez Torres como Wedding Planner y Jorge Medina Salas como colaborador invitado.
- **Endpoint/componente:** No disponible; auditoría de contrato y módulos
- **Pasos ejecutados:** Se invocó la ruta que correspondería a la operación.
- **Resultado esperado:** Persistir más de un rol distinto para el mismo miembro.
- **Resultado obtenido:** La auditoría del contrato Prisma y de los módulos actuales no encontró entidades, DTOs, controladores ni endpoint para miembros, roles operativos o permisos por proyecto.
- **Interpretación:** La funcionalidad requerida no está implementada en el modelo ni en los controladores actuales; el criterio no puede cumplirse.
- **Estado:** FAIL
- **Evidencia:** Disponible en Detalle técnico.
- **Observaciones:** —

### CP-E02-HU08-04 – Modificación de roles con conservación del historial

- **ID:** CP-E02-HU08-04
- **HU:** HU08
- **CA:** CA039
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Modificación de roles con conservación del historial.
- **Precondiciones:** Base de pruebas configurada y catálogos base disponibles.
- **Datos utilizados:** Daniela Ramírez Torres como Wedding Planner y Jorge Medina Salas como colaborador invitado.
- **Endpoint/componente:** No disponible; auditoría de contrato y módulos
- **Pasos ejecutados:** Se invocó la ruta que correspondería a la operación.
- **Resultado esperado:** Agregar o retirar roles conservando la información previa según el modelo.
- **Resultado obtenido:** La auditoría del contrato Prisma y de los módulos actuales no encontró entidades, DTOs, controladores ni endpoint para miembros, roles operativos o permisos por proyecto.
- **Interpretación:** La funcionalidad requerida no está implementada en el modelo ni en los controladores actuales; el criterio no puede cumplirse.
- **Estado:** FAIL
- **Evidencia:** Disponible en Detalle técnico.
- **Observaciones:** —

### CP-E02-HU08-05 – Inhabilitación de un colaborador

- **ID:** CP-E02-HU08-05
- **HU:** HU08
- **CA:** CA040
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Inhabilitación de un colaborador.
- **Precondiciones:** Base de pruebas configurada y catálogos base disponibles.
- **Datos utilizados:** Daniela Ramírez Torres como Wedding Planner y Jorge Medina Salas como colaborador invitado.
- **Endpoint/componente:** No disponible; auditoría de contrato y módulos
- **Pasos ejecutados:** Se invocó la ruta que correspondería a la operación.
- **Resultado esperado:** Inhabilitar la participación sin eliminar el usuario ni su historial.
- **Resultado obtenido:** La auditoría del contrato Prisma y de los módulos actuales no encontró entidades, DTOs, controladores ni endpoint para miembros, roles operativos o permisos por proyecto.
- **Interpretación:** La funcionalidad requerida no está implementada en el modelo ni en los controladores actuales; el criterio no puede cumplirse.
- **Estado:** FAIL
- **Evidencia:** Disponible en Detalle técnico.
- **Observaciones:** —

### CP-E02-HU09-01 – Acceso inicial según tipo de usuario

- **ID:** CP-E02-HU09-01
- **HU:** HU09
- **CA:** CA041
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Acceso inicial según tipo de usuario.
- **Precondiciones:** Base de pruebas configurada y catálogos base disponibles.
- **Datos utilizados:** Daniela Ramírez Torres, Lucía Paredes Rojas como pareja y Jorge Medina Salas como colaborador en dos matrimonios.
- **Endpoint/componente:** No disponible; auditoría de contrato y módulos
- **Pasos ejecutados:** Se invocó la ruta que correspondería a la operación.
- **Resultado esperado:** Diferenciar Wedding Planner, Pareja y Colaborador dentro del proyecto.
- **Resultado obtenido:** La auditoría del contrato Prisma y de los módulos actuales no encontró entidades, DTOs, controladores ni endpoint para miembros, roles operativos o permisos por proyecto.
- **Interpretación:** La funcionalidad requerida no está implementada en el modelo ni en los controladores actuales; el criterio no puede cumplirse.
- **Estado:** FAIL
- **Evidencia:** Disponible en Detalle técnico.
- **Observaciones:** —

### CP-E02-HU09-02 – Configuración de permisos de consulta y modificación

- **ID:** CP-E02-HU09-02
- **HU:** HU09
- **CA:** CA042
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Configuración de permisos de consulta y modificación.
- **Precondiciones:** Base de pruebas configurada y catálogos base disponibles.
- **Datos utilizados:** Daniela Ramírez Torres, Lucía Paredes Rojas como pareja y Jorge Medina Salas como colaborador en dos matrimonios.
- **Endpoint/componente:** No disponible; auditoría de contrato y módulos
- **Pasos ejecutados:** Se invocó la ruta que correspondería a la operación.
- **Resultado esperado:** Configurar consulta y modificación de forma independiente en áreas implementadas.
- **Resultado obtenido:** La auditoría del contrato Prisma y de los módulos actuales no encontró entidades, DTOs, controladores ni endpoint para miembros, roles operativos o permisos por proyecto.
- **Interpretación:** La funcionalidad requerida no está implementada en el modelo ni en los controladores actuales; el criterio no puede cumplirse.
- **Estado:** FAIL
- **Evidencia:** Disponible en Detalle técnico.
- **Observaciones:** —

### CP-E02-HU09-03 – Bloqueo de operaciones sin autorización

- **ID:** CP-E02-HU09-03
- **HU:** HU09
- **CA:** CA043
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Bloqueo de operaciones sin autorización.
- **Precondiciones:** Base de pruebas configurada y catálogos base disponibles.
- **Datos utilizados:** Daniela Ramírez Torres, Lucía Paredes Rojas como pareja y Jorge Medina Salas como colaborador en dos matrimonios.
- **Endpoint/componente:** No disponible; auditoría de contrato y módulos
- **Pasos ejecutados:** Se invocó la ruta que correspondería a la operación. Variantes: sin permiso de consulta, sin permiso de modificación.
- **Resultado esperado:** Bloquear específicamente las operaciones sin autorización.
- **Resultado obtenido:** La auditoría del contrato Prisma y de los módulos actuales no encontró entidades, DTOs, controladores ni endpoint para miembros, roles operativos o permisos por proyecto.
- **Interpretación:** La funcionalidad requerida no está implementada en el modelo ni en los controladores actuales; el criterio no puede cumplirse.
- **Estado:** FAIL
- **Evidencia:** Disponible en Detalle técnico.
- **Observaciones:** —

### CP-E02-HU09-04 – Independencia de permisos entre matrimonios

- **ID:** CP-E02-HU09-04
- **HU:** HU09
- **CA:** CA044
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Independencia de permisos entre matrimonios.
- **Precondiciones:** Base de pruebas configurada y catálogos base disponibles.
- **Datos utilizados:** Daniela Ramírez Torres, Lucía Paredes Rojas como pareja y Jorge Medina Salas como colaborador en dos matrimonios.
- **Endpoint/componente:** No disponible; auditoría de contrato y módulos
- **Pasos ejecutados:** Se invocó la ruta que correspondería a la operación.
- **Resultado esperado:** Modificar permisos de un matrimonio sin alterar los de otro.
- **Resultado obtenido:** La auditoría del contrato Prisma y de los módulos actuales no encontró entidades, DTOs, controladores ni endpoint para miembros, roles operativos o permisos por proyecto.
- **Interpretación:** La funcionalidad requerida no está implementada en el modelo ni en los controladores actuales; el criterio no puede cumplirse.
- **Estado:** FAIL
- **Evidencia:** Disponible en Detalle técnico.
- **Observaciones:** —

### CP-E02-HU09-05 – Visualización según permisos y asignaciones vigentes

- **ID:** CP-E02-HU09-05
- **HU:** HU09
- **CA:** CA045
- **Tipo:** MIXTO
- **Objetivo:** Visualización según permisos y asignaciones vigentes.
- **Precondiciones:** Base de pruebas configurada y catálogos base disponibles.
- **Datos utilizados:** Daniela Ramírez Torres, Lucía Paredes Rojas como pareja y Jorge Medina Salas como colaborador en dos matrimonios.
- **Endpoint/componente:** No disponible; auditoría de contrato y módulos
- **Pasos ejecutados:** Se invocó la ruta que correspondería a la operación.
- **Resultado esperado:** Entregar solo información permitida; la visibilidad Flutter es manual.
- **Resultado obtenido:** La auditoría del contrato Prisma y de los módulos actuales no encontró entidades, DTOs, controladores ni endpoint para miembros, roles operativos o permisos por proyecto.
- **Interpretación:** La funcionalidad requerida no está implementada en el modelo ni en los controladores actuales; el criterio no puede cumplirse.
- **Estado:** FAIL
- **Evidencia:** Disponible en Detalle técnico.
- **Observaciones:** La visibilidad de interfaz permanece como comprobación manual.

## Detalle técnico

### CP-E02-HU08-01 – Incorporación de un miembro con rol operativo

- La auditoría del contrato y módulos actuales no encontró entidades ni API para miembros, roles operativos o permisos por proyecto.

### CP-E02-HU08-02 – Invitación del nuevo miembro al proyecto

- La auditoría del contrato y módulos actuales no encontró entidades ni API para miembros, roles operativos o permisos por proyecto.

### CP-E02-HU08-03 – Asignación de múltiples roles operativos

- La auditoría del contrato y módulos actuales no encontró entidades ni API para miembros, roles operativos o permisos por proyecto.

### CP-E02-HU08-04 – Modificación de roles con conservación del historial

- La auditoría del contrato y módulos actuales no encontró entidades ni API para miembros, roles operativos o permisos por proyecto.

### CP-E02-HU08-05 – Inhabilitación de un colaborador

- La auditoría del contrato y módulos actuales no encontró entidades ni API para miembros, roles operativos o permisos por proyecto.

### CP-E02-HU09-01 – Acceso inicial según tipo de usuario

- La auditoría del contrato y módulos actuales no encontró entidades ni API para miembros, roles operativos o permisos por proyecto.

### CP-E02-HU09-02 – Configuración de permisos de consulta y modificación

- La auditoría del contrato y módulos actuales no encontró entidades ni API para miembros, roles operativos o permisos por proyecto.

### CP-E02-HU09-03 – Bloqueo de operaciones sin autorización

- La auditoría del contrato y módulos actuales no encontró entidades ni API para miembros, roles operativos o permisos por proyecto.
- La auditoría del contrato y módulos actuales no encontró entidades ni API para miembros, roles operativos o permisos por proyecto.

### CP-E02-HU09-04 – Independencia de permisos entre matrimonios

- La auditoría del contrato y módulos actuales no encontró entidades ni API para miembros, roles operativos o permisos por proyecto.

### CP-E02-HU09-05 – Visualización según permisos y asignaciones vigentes

- La auditoría del contrato y módulos actuales no encontró entidades ni API para miembros, roles operativos o permisos por proyecto.

## Fallos reales de la aplicación

- CA036 a CA045: no existen modelos, tablas, DTOs ni endpoints para miembros, roles operativos o permisos contextuales por proyecto.

## Funcionalidades no implementadas

Incorporación e invitación de miembros, múltiples roles, historial de roles, inhabilitación contextual, permisos de consulta/modificación y control de acceso contextual.

## Errores encontrados en los propios tests

Ninguno. Las rutas se auditaron antes de probarse y el HTTP 404 confirma la ausencia de la funcionalidad.

## Tests corregidos y reejecutados

No aplicó: es la primera ejecución formal de E02.

## Casos manuales pendientes

La parte Flutter de CP-E02-HU09-05 permanece pendiente; su parte backend fue ejecutada y falló por ausencia de API.


---

### E03-Proyecto — Proyecto

**Datos de prueba registrados:** datos: HU10: Daniela Ramírez Torres y la boda de Sofía Navarro y Martín León.; HU11: Boda de Sofía Navarro y Martín León, cronograma e invitados existentes.; HU12: Catálogo metodológico: no existe en el contrato actual.; HU13: Proyecto de la boda de Sofía Navarro y Martín León.; HU14: Proyecto en fase PLANIFICACION y actividades operativas.

**Ejecución registrada:** comando: pnpm.cmd test:e03; alcance: Solo test/E03-Proyecto; excluye: E01-Acceso; E02-Usuarios; E04-Cronograma; E05-Presupuesto; E06-Invitados; E07-Proveedores; E08-Riesgos; E09-Administracion; backup

# Resultado final E03-Proyecto

| Métrica | Resultado |
|---|---:|
| Casos conceptuales | 20 |
| Ejecuciones/variantes Jest | 27 |
| Pruebas unitarias aisladas | 4 |
| PASS | 3 |
| FAIL | 17 |

## Tabla principal

| Caso | Nombre | CA | Tipo | Estado | Resultado obtenido | Interpretación |
|---|---|---|---|---|---|---|
| CP-E03-HU10-01 | Registro válido de parámetros base y preparación temporal | CA046, CA047 | AUTOMATIZADO | FAIL | La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado. | Funcionalidad no implementada; el criterio no puede cumplirse todavía. |
| CP-E03-HU10-02 | Validación de parámetros base obligatorios | CA046 | AUTOMATIZADO | FAIL | La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado. | Funcionalidad no implementada; el criterio no puede cumplirse todavía. |
| CP-E03-HU10-03 | Generación del cronograma desde plantilla | CA048 | AUTOMATIZADO | PASS | La lógica existente respondió conforme al criterio técnico evaluado. | El criterio evaluado cuenta con soporte backend actual. |
| CP-E03-HU10-04 | Asociación del estilo al matrimonio | CA049 | AUTOMATIZADO | FAIL | La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado. | Funcionalidad no implementada; el criterio no puede cumplirse todavía. |
| CP-E03-HU10-05 | Confirmación previa para cambios sensibles | CA050 | MIXTO | FAIL | La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado. | Funcionalidad no implementada; el criterio no puede cumplirse todavía. |
| CP-E03-HU11-01 | Cálculo del avance y resumen de actividades | CA051, CA052 | AUTOMATIZADO | FAIL | La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado. | Funcionalidad no implementada; el criterio no puede cumplirse todavía. |
| CP-E03-HU11-02 | Indicadores de confirmación de invitados | CA053 | AUTOMATIZADO | FAIL | La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado. | Funcionalidad no implementada; el criterio no puede cumplirse todavía. |
| CP-E03-HU11-03 | Resumen financiero y detección de excedente | CA054 | AUTOMATIZADO | FAIL | La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado. | Funcionalidad no implementada; el criterio no puede cumplirse todavía. |
| CP-E03-HU11-04 | Actualización y permisos del dashboard | CA055 | MIXTO | FAIL | La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado. | Funcionalidad no implementada; el criterio no puede cumplirse todavía. |
| CP-E03-HU12-01 | Consulta del catálogo vigente de buenas prácticas | CA056, CA060 | AUTOMATIZADO | FAIL | La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado. | Funcionalidad no implementada; el criterio no puede cumplirse todavía. |
| CP-E03-HU12-02 | Contenido contextual y referencia metodológica | CA057, CA058 | AUTOMATIZADO | FAIL | La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado. | Funcionalidad no implementada; el criterio no puede cumplirse todavía. |
| CP-E03-HU12-03 | Aplicación práctica de una buena práctica | CA059 | AUTOMATIZADO | FAIL | La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado. | Funcionalidad no implementada; el criterio no puede cumplirse todavía. |
| CP-E03-HU13-01 | Navegación manteniendo el contexto del matrimonio | CA061, CA062 | MIXTO | FAIL | La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado. | Funcionalidad no implementada; el criterio no puede cumplirse todavía. |
| CP-E03-HU13-02 | Actualización de indicadores por cambios en módulos | CA063 | AUTOMATIZADO | FAIL | La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado. | Funcionalidad no implementada; el criterio no puede cumplirse todavía. |
| CP-E03-HU13-03 | Reutilización de información compartida | CA064 | AUTOMATIZADO | FAIL | La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado. | Funcionalidad no implementada; el criterio no puede cumplirse todavía. |
| CP-E03-HU13-04 | Permisos sobre módulos e información integrada | CA065 | AUTOMATIZADO | FAIL | La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado. | Funcionalidad no implementada; el criterio no puede cumplirse todavía. |
| CP-E03-HU14-01 | Identificación de la etapa actual | CA066 | AUTOMATIZADO | PASS | La lógica existente respondió conforme al criterio técnico evaluado. | El criterio evaluado cuenta con soporte backend actual. |
| CP-E03-HU14-02 | Acciones de la etapa y próxima acción recomendada | CA067, CA068 | AUTOMATIZADO | FAIL | La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado. | Funcionalidad no implementada; el criterio no puede cumplirse todavía. |
| CP-E03-HU14-03 | Actualización del flujo al completar una acción | CA069 | AUTOMATIZADO | FAIL | La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado. | Funcionalidad no implementada; el criterio no puede cumplirse todavía. |
| CP-E03-HU14-04 | Flexibilidad del flujo de planificación | CA070 | AUTOMATIZADO | PASS | La lógica existente respondió conforme al criterio técnico evaluado. | El criterio evaluado cuenta con soporte backend actual. |

## Detalle por caso

### CP-E03-HU10-01 – Registro válido de parámetros base y preparación temporal

- **ID:** CP-E03-HU10-01
- **HU:** HU10
- **CA:** CA046, CA047
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Registro válido de parámetros base y preparación temporal.
- **Precondiciones:** Base de pruebas y catálogos cargados.
- **Datos utilizados:** Daniela Ramírez Torres y la boda de Sofía Navarro y Martín León.
- **Endpoint/componente:** Componente auditado según implementación real.
- **Pasos ejecutados:** Auditoría y prueba aislada cuando existe capacidad.
- **Resultado esperado:** Cumplir CA046, CA047.
- **Resultado obtenido:** La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado.
- **Interpretación:** Funcionalidad no implementada; el criterio no puede cumplirse todavía.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E03-HU10-02 – Validación de parámetros base obligatorios

- **ID:** CP-E03-HU10-02
- **HU:** HU10
- **CA:** CA046
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Validación de parámetros base obligatorios.
- **Precondiciones:** Base de pruebas y catálogos cargados.
- **Datos utilizados:** Daniela Ramírez Torres y la boda de Sofía Navarro y Martín León.
- **Endpoint/componente:** Componente auditado según implementación real.
- **Pasos ejecutados:** Auditoría y prueba aislada cuando existe capacidad. Variantes: datos de pareja, fecha, presupuesto, estilo.
- **Resultado esperado:** Cumplir CA046.
- **Resultado obtenido:** La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado.
- **Interpretación:** Funcionalidad no implementada; el criterio no puede cumplirse todavía.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E03-HU10-03 – Generación del cronograma desde plantilla

- **ID:** CP-E03-HU10-03
- **HU:** HU10
- **CA:** CA048
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Generación del cronograma desde plantilla.
- **Precondiciones:** Base de pruebas y catálogos cargados.
- **Datos utilizados:** Daniela Ramírez Torres y la boda de Sofía Navarro y Martín León.
- **Endpoint/componente:** CronogramaDateService y generación desde plantilla
- **Pasos ejecutados:** Auditoría y prueba aislada cuando existe capacidad.
- **Resultado esperado:** Cumplir CA048.
- **Resultado obtenido:** La lógica existente respondió conforme al criterio técnico evaluado.
- **Interpretación:** El criterio evaluado cuenta con soporte backend actual.
- **Estado:** PASS
- **Evidencia:** Resultados automáticos.
- **Observaciones:** —

### CP-E03-HU10-04 – Asociación del estilo al matrimonio

- **ID:** CP-E03-HU10-04
- **HU:** HU10
- **CA:** CA049
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Asociación del estilo al matrimonio.
- **Precondiciones:** Base de pruebas y catálogos cargados.
- **Datos utilizados:** Daniela Ramírez Torres y la boda de Sofía Navarro y Martín León.
- **Endpoint/componente:** Componente auditado según implementación real.
- **Pasos ejecutados:** Auditoría y prueba aislada cuando existe capacidad.
- **Resultado esperado:** Cumplir CA049.
- **Resultado obtenido:** La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado.
- **Interpretación:** Funcionalidad no implementada; el criterio no puede cumplirse todavía.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E03-HU10-05 – Confirmación previa para cambios sensibles

- **ID:** CP-E03-HU10-05
- **HU:** HU10
- **CA:** CA050
- **Tipo:** MIXTO
- **Objetivo:** Confirmación previa para cambios sensibles.
- **Precondiciones:** Base de pruebas y catálogos cargados.
- **Datos utilizados:** Daniela Ramírez Torres y la boda de Sofía Navarro y Martín León.
- **Endpoint/componente:** Componente auditado según implementación real.
- **Pasos ejecutados:** Auditoría y prueba aislada cuando existe capacidad. Variantes: cambio de fecha, cambio de presupuesto.
- **Resultado esperado:** Cumplir CA050.
- **Resultado obtenido:** La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado.
- **Interpretación:** Funcionalidad no implementada; el criterio no puede cumplirse todavía.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** La parte visual permanece manual.

### CP-E03-HU11-01 – Cálculo del avance y resumen de actividades

- **ID:** CP-E03-HU11-01
- **HU:** HU11
- **CA:** CA051, CA052
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Cálculo del avance y resumen de actividades.
- **Precondiciones:** Base de pruebas y catálogos cargados.
- **Datos utilizados:** Boda de Sofía Navarro y Martín León, cronograma e invitados existentes.
- **Endpoint/componente:** Componente auditado según implementación real.
- **Pasos ejecutados:** Auditoría y prueba aislada cuando existe capacidad.
- **Resultado esperado:** Cumplir CA051, CA052.
- **Resultado obtenido:** La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado.
- **Interpretación:** Funcionalidad no implementada; el criterio no puede cumplirse todavía.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E03-HU11-02 – Indicadores de confirmación de invitados

- **ID:** CP-E03-HU11-02
- **HU:** HU11
- **CA:** CA053
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Indicadores de confirmación de invitados.
- **Precondiciones:** Base de pruebas y catálogos cargados.
- **Datos utilizados:** Boda de Sofía Navarro y Martín León, cronograma e invitados existentes.
- **Endpoint/componente:** Componente auditado según implementación real.
- **Pasos ejecutados:** Auditoría y prueba aislada cuando existe capacidad.
- **Resultado esperado:** Cumplir CA053.
- **Resultado obtenido:** La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado.
- **Interpretación:** Funcionalidad no implementada; el criterio no puede cumplirse todavía.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E03-HU11-03 – Resumen financiero y detección de excedente

- **ID:** CP-E03-HU11-03
- **HU:** HU11
- **CA:** CA054
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Resumen financiero y detección de excedente.
- **Precondiciones:** Base de pruebas y catálogos cargados.
- **Datos utilizados:** Boda de Sofía Navarro y Martín León, cronograma e invitados existentes.
- **Endpoint/componente:** Componente auditado según implementación real.
- **Pasos ejecutados:** Auditoría y prueba aislada cuando existe capacidad. Variantes: sin excedente, con excedente.
- **Resultado esperado:** Cumplir CA054.
- **Resultado obtenido:** La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado.
- **Interpretación:** Funcionalidad no implementada; el criterio no puede cumplirse todavía.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E03-HU11-04 – Actualización y permisos del dashboard

- **ID:** CP-E03-HU11-04
- **HU:** HU11
- **CA:** CA055
- **Tipo:** MIXTO
- **Objetivo:** Actualización y permisos del dashboard.
- **Precondiciones:** Base de pruebas y catálogos cargados.
- **Datos utilizados:** Boda de Sofía Navarro y Martín León, cronograma e invitados existentes.
- **Endpoint/componente:** Componente auditado según implementación real.
- **Pasos ejecutados:** Auditoría y prueba aislada cuando existe capacidad.
- **Resultado esperado:** Cumplir CA055.
- **Resultado obtenido:** La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado.
- **Interpretación:** Funcionalidad no implementada; el criterio no puede cumplirse todavía.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** La parte visual permanece manual.

### CP-E03-HU12-01 – Consulta del catálogo vigente de buenas prácticas

- **ID:** CP-E03-HU12-01
- **HU:** HU12
- **CA:** CA056, CA060
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Consulta del catálogo vigente de buenas prácticas.
- **Precondiciones:** Base de pruebas y catálogos cargados.
- **Datos utilizados:** Catálogo metodológico: no existe en el contrato actual.
- **Endpoint/componente:** Componente auditado según implementación real.
- **Pasos ejecutados:** Auditoría y prueba aislada cuando existe capacidad.
- **Resultado esperado:** Cumplir CA056, CA060.
- **Resultado obtenido:** La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado.
- **Interpretación:** Funcionalidad no implementada; el criterio no puede cumplirse todavía.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E03-HU12-02 – Contenido contextual y referencia metodológica

- **ID:** CP-E03-HU12-02
- **HU:** HU12
- **CA:** CA057, CA058
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Contenido contextual y referencia metodológica.
- **Precondiciones:** Base de pruebas y catálogos cargados.
- **Datos utilizados:** Catálogo metodológico: no existe en el contrato actual.
- **Endpoint/componente:** Componente auditado según implementación real.
- **Pasos ejecutados:** Auditoría y prueba aislada cuando existe capacidad.
- **Resultado esperado:** Cumplir CA057, CA058.
- **Resultado obtenido:** La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado.
- **Interpretación:** Funcionalidad no implementada; el criterio no puede cumplirse todavía.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E03-HU12-03 – Aplicación práctica de una buena práctica

- **ID:** CP-E03-HU12-03
- **HU:** HU12
- **CA:** CA059
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Aplicación práctica de una buena práctica.
- **Precondiciones:** Base de pruebas y catálogos cargados.
- **Datos utilizados:** Catálogo metodológico: no existe en el contrato actual.
- **Endpoint/componente:** Componente auditado según implementación real.
- **Pasos ejecutados:** Auditoría y prueba aislada cuando existe capacidad.
- **Resultado esperado:** Cumplir CA059.
- **Resultado obtenido:** La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado.
- **Interpretación:** Funcionalidad no implementada; el criterio no puede cumplirse todavía.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E03-HU13-01 – Navegación manteniendo el contexto del matrimonio

- **ID:** CP-E03-HU13-01
- **HU:** HU13
- **CA:** CA061, CA062
- **Tipo:** MIXTO
- **Objetivo:** Navegación manteniendo el contexto del matrimonio.
- **Precondiciones:** Base de pruebas y catálogos cargados.
- **Datos utilizados:** Proyecto de la boda de Sofía Navarro y Martín León.
- **Endpoint/componente:** Componente auditado según implementación real.
- **Pasos ejecutados:** Auditoría y prueba aislada cuando existe capacidad.
- **Resultado esperado:** Cumplir CA061, CA062.
- **Resultado obtenido:** La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado.
- **Interpretación:** Funcionalidad no implementada; el criterio no puede cumplirse todavía.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** La parte visual permanece manual.

### CP-E03-HU13-02 – Actualización de indicadores por cambios en módulos

- **ID:** CP-E03-HU13-02
- **HU:** HU13
- **CA:** CA063
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Actualización de indicadores por cambios en módulos.
- **Precondiciones:** Base de pruebas y catálogos cargados.
- **Datos utilizados:** Proyecto de la boda de Sofía Navarro y Martín León.
- **Endpoint/componente:** Componente auditado según implementación real.
- **Pasos ejecutados:** Auditoría y prueba aislada cuando existe capacidad.
- **Resultado esperado:** Cumplir CA063.
- **Resultado obtenido:** La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado.
- **Interpretación:** Funcionalidad no implementada; el criterio no puede cumplirse todavía.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E03-HU13-03 – Reutilización de información compartida

- **ID:** CP-E03-HU13-03
- **HU:** HU13
- **CA:** CA064
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Reutilización de información compartida.
- **Precondiciones:** Base de pruebas y catálogos cargados.
- **Datos utilizados:** Proyecto de la boda de Sofía Navarro y Martín León.
- **Endpoint/componente:** Componente auditado según implementación real.
- **Pasos ejecutados:** Auditoría y prueba aislada cuando existe capacidad.
- **Resultado esperado:** Cumplir CA064.
- **Resultado obtenido:** La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado.
- **Interpretación:** Funcionalidad no implementada; el criterio no puede cumplirse todavía.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E03-HU13-04 – Permisos sobre módulos e información integrada

- **ID:** CP-E03-HU13-04
- **HU:** HU13
- **CA:** CA065
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Permisos sobre módulos e información integrada.
- **Precondiciones:** Base de pruebas y catálogos cargados.
- **Datos utilizados:** Proyecto de la boda de Sofía Navarro y Martín León.
- **Endpoint/componente:** Componente auditado según implementación real.
- **Pasos ejecutados:** Auditoría y prueba aislada cuando existe capacidad.
- **Resultado esperado:** Cumplir CA065.
- **Resultado obtenido:** La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado.
- **Interpretación:** Funcionalidad no implementada; el criterio no puede cumplirse todavía.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E03-HU14-01 – Identificación de la etapa actual

- **ID:** CP-E03-HU14-01
- **HU:** HU14
- **CA:** CA066
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Identificación de la etapa actual.
- **Precondiciones:** Base de pruebas y catálogos cargados.
- **Datos utilizados:** Proyecto en fase PLANIFICACION y actividades operativas.
- **Endpoint/componente:** Componente auditado según implementación real.
- **Pasos ejecutados:** Auditoría y prueba aislada cuando existe capacidad.
- **Resultado esperado:** Cumplir CA066.
- **Resultado obtenido:** La lógica existente respondió conforme al criterio técnico evaluado.
- **Interpretación:** El criterio evaluado cuenta con soporte backend actual.
- **Estado:** PASS
- **Evidencia:** Resultados automáticos.
- **Observaciones:** —

### CP-E03-HU14-02 – Acciones de la etapa y próxima acción recomendada

- **ID:** CP-E03-HU14-02
- **HU:** HU14
- **CA:** CA067, CA068
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Acciones de la etapa y próxima acción recomendada.
- **Precondiciones:** Base de pruebas y catálogos cargados.
- **Datos utilizados:** Proyecto en fase PLANIFICACION y actividades operativas.
- **Endpoint/componente:** Componente auditado según implementación real.
- **Pasos ejecutados:** Auditoría y prueba aislada cuando existe capacidad. Variantes: dependencia habilitada, prioridad, proximidad de fecha límite.
- **Resultado esperado:** Cumplir CA067, CA068.
- **Resultado obtenido:** La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado.
- **Interpretación:** Funcionalidad no implementada; el criterio no puede cumplirse todavía.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E03-HU14-03 – Actualización del flujo al completar una acción

- **ID:** CP-E03-HU14-03
- **HU:** HU14
- **CA:** CA069
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Actualización del flujo al completar una acción.
- **Precondiciones:** Base de pruebas y catálogos cargados.
- **Datos utilizados:** Proyecto en fase PLANIFICACION y actividades operativas.
- **Endpoint/componente:** Componente auditado según implementación real.
- **Pasos ejecutados:** Auditoría y prueba aislada cuando existe capacidad.
- **Resultado esperado:** Cumplir CA069.
- **Resultado obtenido:** La auditoría no encontró la capacidad requerida o el módulo correspondiente no está implementado.
- **Interpretación:** Funcionalidad no implementada; el criterio no puede cumplirse todavía.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E03-HU14-04 – Flexibilidad del flujo de planificación

- **ID:** CP-E03-HU14-04
- **HU:** HU14
- **CA:** CA070
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Flexibilidad del flujo de planificación.
- **Precondiciones:** Base de pruebas y catálogos cargados.
- **Datos utilizados:** Proyecto en fase PLANIFICACION y actividades operativas.
- **Endpoint/componente:** Componente auditado según implementación real.
- **Pasos ejecutados:** Auditoría y prueba aislada cuando existe capacidad.
- **Resultado esperado:** Cumplir CA070.
- **Resultado obtenido:** La lógica existente respondió conforme al criterio técnico evaluado.
- **Interpretación:** El criterio evaluado cuenta con soporte backend actual.
- **Estado:** PASS
- **Evidencia:** Resultados automáticos.
- **Observaciones:** —

## Detalle técnico

### CP-E03-HU10-01
- Funcionalidad no implementada: parametros-base-estilo. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.
### CP-E03-HU10-02
- Funcionalidad no implementada: validacion-parametros-base. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- Funcionalidad no implementada: validacion-parametros-base. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- Funcionalidad no implementada: validacion-parametros-base. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- Funcionalidad no implementada: validacion-parametros-base. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.
### CP-E03-HU10-04
- Funcionalidad no implementada: estilo-evento. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.
### CP-E03-HU10-05
- Funcionalidad no implementada: confirmacion-cambios-sensibles. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- Funcionalidad no implementada: confirmacion-cambios-sensibles. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.
### CP-E03-HU11-01
- Funcionalidad no implementada: dashboard-avance. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.
### CP-E03-HU11-02
- Funcionalidad no implementada: dashboard-rsvp. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.
### CP-E03-HU11-03
- Funcionalidad no implementada: dashboard-presupuesto. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- Funcionalidad no implementada: dashboard-presupuesto. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.
### CP-E03-HU11-04
- Funcionalidad no implementada: dashboard-permisos. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.
### CP-E03-HU12-01
- Funcionalidad no implementada: catalogo-metodologias. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.
### CP-E03-HU12-02
- Funcionalidad no implementada: referencia-metodologica. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.
### CP-E03-HU12-03
- Funcionalidad no implementada: aplicacion-practica-metodologia. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.
### CP-E03-HU13-01
- Funcionalidad no implementada: contexto-matrimonio. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.
### CP-E03-HU13-02
- Funcionalidad no implementada: indicadores-integrados. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.
### CP-E03-HU13-03
- Funcionalidad no implementada: fuente-compartida. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.
### CP-E03-HU13-04
- Funcionalidad no implementada: permisos-contextuales. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.
### CP-E03-HU14-02
- Funcionalidad no implementada: flujo-recomendado. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- Funcionalidad no implementada: flujo-recomendado. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- Funcionalidad no implementada: flujo-recomendado. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.
### CP-E03-HU14-03
- Funcionalidad no implementada: flujo-actualizacion. La auditoría no encontró modelo, DTO, endpoint ni caso de uso que cubra este criterio.

## Resultados por HU

HU10: 1 PASS; HU11: 0 PASS; HU12: 0 PASS; HU13: 0 PASS; HU14: 2 PASS.

## Pruebas unitarias

Se ejecutaron cuatro pruebas aisladas de CronogramaDateService: 395 días, periodo inferior, redondeo y límite de inicio.

## Fallos reales de la aplicación

No hay dashboard integrado, estilo de evento, catálogo metodológico, permisos contextuales ni flujo guiado recomendado.

## Funcionalidades no implementadas

CA046, CA049, CA050, CA051–CA065, CA067–CA069 en las partes que requieren dichas capacidades.

## Errores encontrados en los tests

Ninguno.

## Tests corregidos y reejecutados

No aplicó.

## Casos manuales pendientes

Las partes visuales de CP-E03-HU10-05, CP-E03-HU11-04 y CP-E03-HU13-01.


---

### E04-Cronograma — Cronograma

**Datos de prueba registrados:** datos: HU15: Valeria Campos y “Confirmar repertorio musical para la ceremonia”.; HU16: Equipo de Luciana Rios y Mateo Salazar.; HU17: Hito “Ceremonia lista para confirmar”.; HU18: Actividad “Validar distribucion de mesas”.; HU19: “Confirmar repertorio musical” -> “Ensayo de ceremonia”.; HU20: “Revisar contrato del fotografo”.; HU21: “Aprobar lista de invitados” -> “Enviar invitaciones”.; HU22: Plantillas reales cr_plantilla_actividad y cr_plantilla_dependencia.; HU23: “Ingreso de los novios” e “Inicio de la ceremonia”.

**Ejecución registrada:** comando: pnpm.cmd test:e04; alcance: Solo test/E04-Cronograma; excluye: E01-Acceso; E02-Usuarios; E03-Proyecto; E05-Presupuesto; E06-Invitados; E07-Proveedores; E08-Riesgos; E09-Administracion; backup

# Resultado final E04-Cronograma

| Metrica | Resultado |
|---|---:|
| Casos conceptuales | 32 |
| Ejecuciones/variantes de casos | 41 |
| Pruebas unitarias aisladas | 3 |
| PASS conceptual | 7 |
| FAIL conceptual | 25 |

## Tabla principal

| Caso | Nombre | CA | Tipo | Estado | Resultado obtenido | Interpretacion |
|---|---|---|---|---|---|---|
| CP-E04-HU15-01 | Registro valido de actividad e incorporacion al cronograma | CA071, CA073 | AUTOMATIZADO | FAIL | La capacidad requerida no existe completamente en la implementacion actual. | Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia. |
| CP-E04-HU15-02 | Validacion de datos obligatorios de actividad | CA072 | AUTOMATIZADO | FAIL | La capacidad requerida no existe completamente en la implementacion actual. | Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia. |
| CP-E04-HU15-03 | Edicion de una actividad existente | CA074 | AUTOMATIZADO | PASS | La capacidad backend evaluada esta disponible en la implementacion actual. | Criterio tecnico cubierto por la implementacion actual. |
| CP-E04-HU15-04 | Cambio de responsable | CA075 | MIXTO | FAIL | La capacidad requerida no existe completamente en la implementacion actual. | Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia. |
| CP-E04-HU16-01 | Supervision centralizada por miembro | CA076, CA077 | MIXTO | FAIL | La capacidad requerida no existe completamente en la implementacion actual. | Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia. |
| CP-E04-HU16-02 | Calculo de avance por miembro o frente | CA078 | AUTOMATIZADO | FAIL | La capacidad requerida no existe completamente en la implementacion actual. | Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia. |
| CP-E04-HU16-03 | Actualizacion del panel tras cambios | CA079 | MIXTO | FAIL | La capacidad requerida no existe completamente en la implementacion actual. | Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia. |
| CP-E04-HU16-04 | Identificacion de retrasadas y proximas a vencer | CA080 | MIXTO | FAIL | La capacidad requerida no existe completamente en la implementacion actual. | Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia. |
| CP-E04-HU17-01 | Consulta y filtrado de hitos | CA081, CA082, CA084 | MIXTO | PASS | La capacidad backend evaluada esta disponible en la implementacion actual. | Criterio tecnico cubierto por la implementacion actual. |
| CP-E04-HU17-02 | Cumplimiento automatico de un hito | CA083 | AUTOMATIZADO | FAIL | La capacidad requerida no existe completamente en la implementacion actual. | Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia. |
| CP-E04-HU17-03 | Hitos cumplidos en avance e historial | CA085 | MIXTO | FAIL | La capacidad requerida no existe completamente en la implementacion actual. | Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia. |
| CP-E04-HU18-01 | Configuracion de anticipaciones | CA086 | AUTOMATIZADO | FAIL | La capacidad requerida no existe completamente en la implementacion actual. | Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia. |
| CP-E04-HU18-02 | Generacion de alerta de vencimiento | CA087, CA088 | AUTOMATIZADO | PASS | La capacidad backend evaluada esta disponible en la implementacion actual. | Criterio tecnico cubierto por la implementacion actual. |
| CP-E04-HU18-03 | Acceso al detalle desde alerta | CA089 | MIXTO | FAIL | La capacidad requerida no existe completamente en la implementacion actual. | Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia. |
| CP-E04-HU18-04 | Supresion de alertas para actividades no vigentes | CA090 | AUTOMATIZADO | FAIL | La capacidad requerida no existe completamente en la implementacion actual. | Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia. |
| CP-E04-HU19-01 | Reprogramacion y conservacion del valor anterior | CA091 | AUTOMATIZADO | FAIL | La capacidad requerida no existe completamente en la implementacion actual. | Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia. |
| CP-E04-HU19-02 | Margen de seguridad | CA092 | AUTOMATIZADO | FAIL | La capacidad requerida no existe completamente en la implementacion actual. | Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia. |
| CP-E04-HU19-03 | Deteccion de conflictos por reprogramacion | CA093 | AUTOMATIZADO | PASS | La capacidad backend evaluada esta disponible en la implementacion actual. | Criterio tecnico cubierto por la implementacion actual. |
| CP-E04-HU19-04 | Impacto por cambio de fecha del matrimonio | CA094 | MIXTO | FAIL | La capacidad requerida no existe completamente en la implementacion actual. | Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia. |
| CP-E04-HU20-01 | Cambio de estado y actualizacion del avance | CA095, CA098 | AUTOMATIZADO | PASS | La capacidad backend evaluada esta disponible en la implementacion actual. | Criterio tecnico cubierto por la implementacion actual. |
| CP-E04-HU20-02 | Deteccion automatica de retraso | CA096 | AUTOMATIZADO | FAIL | La capacidad requerida no existe completamente en la implementacion actual. | Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia. |
| CP-E04-HU20-03 | Bloqueo de completado por dependencia pendiente | CA097, CA102 | AUTOMATIZADO | FAIL | La capacidad requerida no existe completamente en la implementacion actual. | Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia. |
| CP-E04-HU20-04 | Autorizacion e identificacion de cambios de estado | CA099 | MIXTO | FAIL | La capacidad requerida no existe completamente en la implementacion actual. | Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia. |
| CP-E04-HU21-01 | Creacion de dependencias y prevencion de ciclos | CA100, CA101 | AUTOMATIZADO | PASS | La capacidad backend evaluada esta disponible en la implementacion actual. | Criterio tecnico cubierto por la implementacion actual. |
| CP-E04-HU21-02 | Dependencias sugeridas y personalizables | CA103, CA104 | MIXTO | FAIL | La capacidad requerida no existe completamente en la implementacion actual. | Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia. |
| CP-E04-HU22-01 | Consulta de tareas sugeridas | CA105 | AUTOMATIZADO | FAIL | La capacidad requerida no existe completamente en la implementacion actual. | Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia. |
| CP-E04-HU22-02 | Seleccion y personalizacion de tareas sugeridas | CA106, CA107, CA109 | MIXTO | FAIL | La capacidad requerida no existe completamente en la implementacion actual. | Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia. |
| CP-E04-HU22-03 | Creacion de instancia independiente desde sugerencia | CA108 | AUTOMATIZADO | FAIL | La capacidad requerida no existe completamente en la implementacion actual. | Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia. |
| CP-E04-HU23-01 | Registro y orden cronologico del timing | CA110, CA111 | AUTOMATIZADO | FAIL | La capacidad requerida no existe completamente en la implementacion actual. | Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia. |
| CP-E04-HU23-02 | Deteccion de solapamientos incompatibles | CA112 | AUTOMATIZADO | FAIL | La capacidad requerida no existe completamente en la implementacion actual. | Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia. |
| CP-E04-HU23-03 | Edicion de actividad del timing | CA113 | AUTOMATIZADO | PASS | La capacidad backend evaluada esta disponible en la implementacion actual. | Criterio tecnico cubierto por la implementacion actual. |
| CP-E04-HU23-04 | Exportacion o version compartible del timing | CA114 | MIXTO | FAIL | La capacidad requerida no existe completamente en la implementacion actual. | Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia. |

## Detalle por caso

### CP-E04-HU15-01 - Registro valido de actividad e incorporacion al cronograma

- **ID:** CP-E04-HU15-01
- **HU:** HU15
- **CA:** CA071, CA073
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Registro valido de actividad e incorporacion al cronograma.
- **Precondiciones:** Entorno de pruebas y catalogos base cargados.
- **Datos utilizados:** Valeria Campos y “Confirmar repertorio musical para la ceremonia”.
- **Endpoint/componente:** DTO, caso de uso o servicio real auditado.
- **Pasos ejecutados:** Auditoria del codigo y prueba aislada de la capacidad existente.
- **Resultado esperado:** Cumplir CA071, CA073.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretacion:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Estado:** FAIL
- **Evidencia:** Detalle tecnico.
- **Observaciones:** —

### CP-E04-HU15-02 - Validacion de datos obligatorios de actividad

- **ID:** CP-E04-HU15-02
- **HU:** HU15
- **CA:** CA072
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Validacion de datos obligatorios de actividad.
- **Precondiciones:** Entorno de pruebas y catalogos base cargados.
- **Datos utilizados:** Valeria Campos y “Confirmar repertorio musical para la ceremonia”.
- **Endpoint/componente:** DTO, caso de uso o servicio real auditado.
- **Pasos ejecutados:** Auditoria del codigo y prueba aislada de la capacidad existente. Variantes: nombre, fecha limite, prioridad, responsable.
- **Resultado esperado:** Cumplir CA072.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretacion:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Estado:** FAIL
- **Evidencia:** Detalle tecnico.
- **Observaciones:** —

### CP-E04-HU15-03 - Edicion de una actividad existente

- **ID:** CP-E04-HU15-03
- **HU:** HU15
- **CA:** CA074
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Edicion de una actividad existente.
- **Precondiciones:** Entorno de pruebas y catalogos base cargados.
- **Datos utilizados:** Valeria Campos y “Confirmar repertorio musical para la ceremonia”.
- **Endpoint/componente:** DTO, caso de uso o servicio real auditado.
- **Pasos ejecutados:** Auditoria del codigo y prueba aislada de la capacidad existente.
- **Resultado esperado:** Cumplir CA074.
- **Resultado obtenido:** La capacidad backend evaluada esta disponible en la implementacion actual.
- **Interpretacion:** Criterio tecnico cubierto por la implementacion actual.
- **Estado:** PASS
- **Evidencia:** Resultado automatico.
- **Observaciones:** —

### CP-E04-HU15-04 - Cambio de responsable

- **ID:** CP-E04-HU15-04
- **HU:** HU15
- **CA:** CA075
- **Tipo:** MIXTO
- **Objetivo:** Cambio de responsable.
- **Precondiciones:** Entorno de pruebas y catalogos base cargados.
- **Datos utilizados:** Valeria Campos y “Confirmar repertorio musical para la ceremonia”.
- **Endpoint/componente:** DTO, caso de uso o servicio real auditado.
- **Pasos ejecutados:** Auditoria del codigo y prueba aislada de la capacidad existente.
- **Resultado esperado:** Cumplir CA075.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretacion:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Estado:** FAIL
- **Evidencia:** Detalle tecnico.
- **Observaciones:** La parte visual o de navegacion permanece manual.

### CP-E04-HU16-01 - Supervision centralizada por miembro

- **ID:** CP-E04-HU16-01
- **HU:** HU16
- **CA:** CA076, CA077
- **Tipo:** MIXTO
- **Objetivo:** Supervision centralizada por miembro.
- **Precondiciones:** Entorno de pruebas y catalogos base cargados.
- **Datos utilizados:** Equipo de Luciana Rios y Mateo Salazar.
- **Endpoint/componente:** DTO, caso de uso o servicio real auditado.
- **Pasos ejecutados:** Auditoria del codigo y prueba aislada de la capacidad existente.
- **Resultado esperado:** Cumplir CA076, CA077.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretacion:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Estado:** FAIL
- **Evidencia:** Detalle tecnico.
- **Observaciones:** La parte visual o de navegacion permanece manual.

### CP-E04-HU16-02 - Calculo de avance por miembro o frente

- **ID:** CP-E04-HU16-02
- **HU:** HU16
- **CA:** CA078
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Calculo de avance por miembro o frente.
- **Precondiciones:** Entorno de pruebas y catalogos base cargados.
- **Datos utilizados:** Equipo de Luciana Rios y Mateo Salazar.
- **Endpoint/componente:** DTO, caso de uso o servicio real auditado.
- **Pasos ejecutados:** Auditoria del codigo y prueba aislada de la capacidad existente.
- **Resultado esperado:** Cumplir CA078.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretacion:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Estado:** FAIL
- **Evidencia:** Detalle tecnico.
- **Observaciones:** —

### CP-E04-HU16-03 - Actualizacion del panel tras cambios

- **ID:** CP-E04-HU16-03
- **HU:** HU16
- **CA:** CA079
- **Tipo:** MIXTO
- **Objetivo:** Actualizacion del panel tras cambios.
- **Precondiciones:** Entorno de pruebas y catalogos base cargados.
- **Datos utilizados:** Equipo de Luciana Rios y Mateo Salazar.
- **Endpoint/componente:** DTO, caso de uso o servicio real auditado.
- **Pasos ejecutados:** Auditoria del codigo y prueba aislada de la capacidad existente.
- **Resultado esperado:** Cumplir CA079.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretacion:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Estado:** FAIL
- **Evidencia:** Detalle tecnico.
- **Observaciones:** La parte visual o de navegacion permanece manual.

### CP-E04-HU16-04 - Identificacion de retrasadas y proximas a vencer

- **ID:** CP-E04-HU16-04
- **HU:** HU16
- **CA:** CA080
- **Tipo:** MIXTO
- **Objetivo:** Identificacion de retrasadas y proximas a vencer.
- **Precondiciones:** Entorno de pruebas y catalogos base cargados.
- **Datos utilizados:** Equipo de Luciana Rios y Mateo Salazar.
- **Endpoint/componente:** DTO, caso de uso o servicio real auditado.
- **Pasos ejecutados:** Auditoria del codigo y prueba aislada de la capacidad existente.
- **Resultado esperado:** Cumplir CA080.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretacion:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Estado:** FAIL
- **Evidencia:** Detalle tecnico.
- **Observaciones:** La parte visual o de navegacion permanece manual.

### CP-E04-HU17-01 - Consulta y filtrado de hitos

- **ID:** CP-E04-HU17-01
- **HU:** HU17
- **CA:** CA081, CA082, CA084
- **Tipo:** MIXTO
- **Objetivo:** Consulta y filtrado de hitos.
- **Precondiciones:** Entorno de pruebas y catalogos base cargados.
- **Datos utilizados:** Hito “Ceremonia lista para confirmar”.
- **Endpoint/componente:** DTO, caso de uso o servicio real auditado.
- **Pasos ejecutados:** Auditoria del codigo y prueba aislada de la capacidad existente.
- **Resultado esperado:** Cumplir CA081, CA082, CA084.
- **Resultado obtenido:** La capacidad backend evaluada esta disponible en la implementacion actual.
- **Interpretacion:** Criterio tecnico cubierto por la implementacion actual.
- **Estado:** PASS
- **Evidencia:** Resultado automatico.
- **Observaciones:** La parte visual o de navegacion permanece manual.

### CP-E04-HU17-02 - Cumplimiento automatico de un hito

- **ID:** CP-E04-HU17-02
- **HU:** HU17
- **CA:** CA083
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Cumplimiento automatico de un hito.
- **Precondiciones:** Entorno de pruebas y catalogos base cargados.
- **Datos utilizados:** Hito “Ceremonia lista para confirmar”.
- **Endpoint/componente:** DTO, caso de uso o servicio real auditado.
- **Pasos ejecutados:** Auditoria del codigo y prueba aislada de la capacidad existente.
- **Resultado esperado:** Cumplir CA083.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretacion:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Estado:** FAIL
- **Evidencia:** Detalle tecnico.
- **Observaciones:** —

### CP-E04-HU17-03 - Hitos cumplidos en avance e historial

- **ID:** CP-E04-HU17-03
- **HU:** HU17
- **CA:** CA085
- **Tipo:** MIXTO
- **Objetivo:** Hitos cumplidos en avance e historial.
- **Precondiciones:** Entorno de pruebas y catalogos base cargados.
- **Datos utilizados:** Hito “Ceremonia lista para confirmar”.
- **Endpoint/componente:** DTO, caso de uso o servicio real auditado.
- **Pasos ejecutados:** Auditoria del codigo y prueba aislada de la capacidad existente.
- **Resultado esperado:** Cumplir CA085.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretacion:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Estado:** FAIL
- **Evidencia:** Detalle tecnico.
- **Observaciones:** La parte visual o de navegacion permanece manual.

### CP-E04-HU18-01 - Configuracion de anticipaciones

- **ID:** CP-E04-HU18-01
- **HU:** HU18
- **CA:** CA086
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Configuracion de anticipaciones.
- **Precondiciones:** Entorno de pruebas y catalogos base cargados.
- **Datos utilizados:** Actividad “Validar distribucion de mesas”.
- **Endpoint/componente:** DTO, caso de uso o servicio real auditado.
- **Pasos ejecutados:** Auditoria del codigo y prueba aislada de la capacidad existente.
- **Resultado esperado:** Cumplir CA086.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretacion:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Estado:** FAIL
- **Evidencia:** Detalle tecnico.
- **Observaciones:** —

### CP-E04-HU18-02 - Generacion de alerta de vencimiento

- **ID:** CP-E04-HU18-02
- **HU:** HU18
- **CA:** CA087, CA088
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Generacion de alerta de vencimiento.
- **Precondiciones:** Entorno de pruebas y catalogos base cargados.
- **Datos utilizados:** Actividad “Validar distribucion de mesas”.
- **Endpoint/componente:** DTO, caso de uso o servicio real auditado.
- **Pasos ejecutados:** Auditoria del codigo y prueba aislada de la capacidad existente.
- **Resultado esperado:** Cumplir CA087, CA088.
- **Resultado obtenido:** La capacidad backend evaluada esta disponible en la implementacion actual.
- **Interpretacion:** Criterio tecnico cubierto por la implementacion actual.
- **Estado:** PASS
- **Evidencia:** Resultado automatico.
- **Observaciones:** —

### CP-E04-HU18-03 - Acceso al detalle desde alerta

- **ID:** CP-E04-HU18-03
- **HU:** HU18
- **CA:** CA089
- **Tipo:** MIXTO
- **Objetivo:** Acceso al detalle desde alerta.
- **Precondiciones:** Entorno de pruebas y catalogos base cargados.
- **Datos utilizados:** Actividad “Validar distribucion de mesas”.
- **Endpoint/componente:** DTO, caso de uso o servicio real auditado.
- **Pasos ejecutados:** Auditoria del codigo y prueba aislada de la capacidad existente.
- **Resultado esperado:** Cumplir CA089.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretacion:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Estado:** FAIL
- **Evidencia:** Detalle tecnico.
- **Observaciones:** La parte visual o de navegacion permanece manual.

### CP-E04-HU18-04 - Supresion de alertas para actividades no vigentes

- **ID:** CP-E04-HU18-04
- **HU:** HU18
- **CA:** CA090
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Supresion de alertas para actividades no vigentes.
- **Precondiciones:** Entorno de pruebas y catalogos base cargados.
- **Datos utilizados:** Actividad “Validar distribucion de mesas”.
- **Endpoint/componente:** DTO, caso de uso o servicio real auditado.
- **Pasos ejecutados:** Auditoria del codigo y prueba aislada de la capacidad existente. Variantes: completada, cancelada, no aplica.
- **Resultado esperado:** Cumplir CA090.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretacion:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Estado:** FAIL
- **Evidencia:** Detalle tecnico.
- **Observaciones:** —

### CP-E04-HU19-01 - Reprogramacion y conservacion del valor anterior

- **ID:** CP-E04-HU19-01
- **HU:** HU19
- **CA:** CA091
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Reprogramacion y conservacion del valor anterior.
- **Precondiciones:** Entorno de pruebas y catalogos base cargados.
- **Datos utilizados:** “Confirmar repertorio musical” -> “Ensayo de ceremonia”.
- **Endpoint/componente:** DTO, caso de uso o servicio real auditado.
- **Pasos ejecutados:** Auditoria del codigo y prueba aislada de la capacidad existente.
- **Resultado esperado:** Cumplir CA091.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretacion:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Estado:** FAIL
- **Evidencia:** Detalle tecnico.
- **Observaciones:** —

### CP-E04-HU19-02 - Margen de seguridad

- **ID:** CP-E04-HU19-02
- **HU:** HU19
- **CA:** CA092
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Margen de seguridad.
- **Precondiciones:** Entorno de pruebas y catalogos base cargados.
- **Datos utilizados:** “Confirmar repertorio musical” -> “Ensayo de ceremonia”.
- **Endpoint/componente:** DTO, caso de uso o servicio real auditado.
- **Pasos ejecutados:** Auditoria del codigo y prueba aislada de la capacidad existente.
- **Resultado esperado:** Cumplir CA092.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretacion:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Estado:** FAIL
- **Evidencia:** Detalle tecnico.
- **Observaciones:** —

### CP-E04-HU19-03 - Deteccion de conflictos por reprogramacion

- **ID:** CP-E04-HU19-03
- **HU:** HU19
- **CA:** CA093
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Deteccion de conflictos por reprogramacion.
- **Precondiciones:** Entorno de pruebas y catalogos base cargados.
- **Datos utilizados:** “Confirmar repertorio musical” -> “Ensayo de ceremonia”.
- **Endpoint/componente:** DTO, caso de uso o servicio real auditado.
- **Pasos ejecutados:** Auditoria del codigo y prueba aislada de la capacidad existente.
- **Resultado esperado:** Cumplir CA093.
- **Resultado obtenido:** La capacidad backend evaluada esta disponible en la implementacion actual.
- **Interpretacion:** Criterio tecnico cubierto por la implementacion actual.
- **Estado:** PASS
- **Evidencia:** Resultado automatico.
- **Observaciones:** —

### CP-E04-HU19-04 - Impacto por cambio de fecha del matrimonio

- **ID:** CP-E04-HU19-04
- **HU:** HU19
- **CA:** CA094
- **Tipo:** MIXTO
- **Objetivo:** Impacto por cambio de fecha del matrimonio.
- **Precondiciones:** Entorno de pruebas y catalogos base cargados.
- **Datos utilizados:** “Confirmar repertorio musical” -> “Ensayo de ceremonia”.
- **Endpoint/componente:** DTO, caso de uso o servicio real auditado.
- **Pasos ejecutados:** Auditoria del codigo y prueba aislada de la capacidad existente.
- **Resultado esperado:** Cumplir CA094.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretacion:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Estado:** FAIL
- **Evidencia:** Detalle tecnico.
- **Observaciones:** La parte visual o de navegacion permanece manual.

### CP-E04-HU20-01 - Cambio de estado y actualizacion del avance

- **ID:** CP-E04-HU20-01
- **HU:** HU20
- **CA:** CA095, CA098
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Cambio de estado y actualizacion del avance.
- **Precondiciones:** Entorno de pruebas y catalogos base cargados.
- **Datos utilizados:** “Revisar contrato del fotografo”.
- **Endpoint/componente:** DTO, caso de uso o servicio real auditado.
- **Pasos ejecutados:** Auditoria del codigo y prueba aislada de la capacidad existente.
- **Resultado esperado:** Cumplir CA095, CA098.
- **Resultado obtenido:** La capacidad backend evaluada esta disponible en la implementacion actual.
- **Interpretacion:** Criterio tecnico cubierto por la implementacion actual.
- **Estado:** PASS
- **Evidencia:** Resultado automatico.
- **Observaciones:** —

### CP-E04-HU20-02 - Deteccion automatica de retraso

- **ID:** CP-E04-HU20-02
- **HU:** HU20
- **CA:** CA096
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Deteccion automatica de retraso.
- **Precondiciones:** Entorno de pruebas y catalogos base cargados.
- **Datos utilizados:** “Revisar contrato del fotografo”.
- **Endpoint/componente:** DTO, caso de uso o servicio real auditado.
- **Pasos ejecutados:** Auditoria del codigo y prueba aislada de la capacidad existente.
- **Resultado esperado:** Cumplir CA096.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretacion:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Estado:** FAIL
- **Evidencia:** Detalle tecnico.
- **Observaciones:** —

### CP-E04-HU20-03 - Bloqueo de completado por dependencia pendiente

- **ID:** CP-E04-HU20-03
- **HU:** HU20
- **CA:** CA097, CA102
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Bloqueo de completado por dependencia pendiente.
- **Precondiciones:** Entorno de pruebas y catalogos base cargados.
- **Datos utilizados:** “Revisar contrato del fotografo”.
- **Endpoint/componente:** DTO, caso de uso o servicio real auditado.
- **Pasos ejecutados:** Auditoria del codigo y prueba aislada de la capacidad existente.
- **Resultado esperado:** Cumplir CA097, CA102.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretacion:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Estado:** FAIL
- **Evidencia:** Detalle tecnico.
- **Observaciones:** —

### CP-E04-HU20-04 - Autorizacion e identificacion de cambios de estado

- **ID:** CP-E04-HU20-04
- **HU:** HU20
- **CA:** CA099
- **Tipo:** MIXTO
- **Objetivo:** Autorizacion e identificacion de cambios de estado.
- **Precondiciones:** Entorno de pruebas y catalogos base cargados.
- **Datos utilizados:** “Revisar contrato del fotografo”.
- **Endpoint/componente:** DTO, caso de uso o servicio real auditado.
- **Pasos ejecutados:** Auditoria del codigo y prueba aislada de la capacidad existente.
- **Resultado esperado:** Cumplir CA099.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretacion:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Estado:** FAIL
- **Evidencia:** Detalle tecnico.
- **Observaciones:** La parte visual o de navegacion permanece manual.

### CP-E04-HU21-01 - Creacion de dependencias y prevencion de ciclos

- **ID:** CP-E04-HU21-01
- **HU:** HU21
- **CA:** CA100, CA101
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Creacion de dependencias y prevencion de ciclos.
- **Precondiciones:** Entorno de pruebas y catalogos base cargados.
- **Datos utilizados:** “Aprobar lista de invitados” -> “Enviar invitaciones”.
- **Endpoint/componente:** DTO, caso de uso o servicio real auditado.
- **Pasos ejecutados:** Auditoria del codigo y prueba aislada de la capacidad existente. Variantes: valida, consigo misma, ciclo directo, ciclo indirecto.
- **Resultado esperado:** Cumplir CA100, CA101.
- **Resultado obtenido:** La capacidad backend evaluada esta disponible en la implementacion actual.
- **Interpretacion:** Criterio tecnico cubierto por la implementacion actual.
- **Estado:** PASS
- **Evidencia:** Resultado automatico.
- **Observaciones:** —

### CP-E04-HU21-02 - Dependencias sugeridas y personalizables

- **ID:** CP-E04-HU21-02
- **HU:** HU21
- **CA:** CA103, CA104
- **Tipo:** MIXTO
- **Objetivo:** Dependencias sugeridas y personalizables.
- **Precondiciones:** Entorno de pruebas y catalogos base cargados.
- **Datos utilizados:** “Aprobar lista de invitados” -> “Enviar invitaciones”.
- **Endpoint/componente:** DTO, caso de uso o servicio real auditado.
- **Pasos ejecutados:** Auditoria del codigo y prueba aislada de la capacidad existente.
- **Resultado esperado:** Cumplir CA103, CA104.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretacion:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Estado:** FAIL
- **Evidencia:** Detalle tecnico.
- **Observaciones:** La parte visual o de navegacion permanece manual.

### CP-E04-HU22-01 - Consulta de tareas sugeridas

- **ID:** CP-E04-HU22-01
- **HU:** HU22
- **CA:** CA105
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Consulta de tareas sugeridas.
- **Precondiciones:** Entorno de pruebas y catalogos base cargados.
- **Datos utilizados:** Plantillas reales cr_plantilla_actividad y cr_plantilla_dependencia.
- **Endpoint/componente:** DTO, caso de uso o servicio real auditado.
- **Pasos ejecutados:** Auditoria del codigo y prueba aislada de la capacidad existente.
- **Resultado esperado:** Cumplir CA105.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretacion:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Estado:** FAIL
- **Evidencia:** Detalle tecnico.
- **Observaciones:** —

### CP-E04-HU22-02 - Seleccion y personalizacion de tareas sugeridas

- **ID:** CP-E04-HU22-02
- **HU:** HU22
- **CA:** CA106, CA107, CA109
- **Tipo:** MIXTO
- **Objetivo:** Seleccion y personalizacion de tareas sugeridas.
- **Precondiciones:** Entorno de pruebas y catalogos base cargados.
- **Datos utilizados:** Plantillas reales cr_plantilla_actividad y cr_plantilla_dependencia.
- **Endpoint/componente:** DTO, caso de uso o servicio real auditado.
- **Pasos ejecutados:** Auditoria del codigo y prueba aislada de la capacidad existente.
- **Resultado esperado:** Cumplir CA106, CA107, CA109.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretacion:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Estado:** FAIL
- **Evidencia:** Detalle tecnico.
- **Observaciones:** La parte visual o de navegacion permanece manual.

### CP-E04-HU22-03 - Creacion de instancia independiente desde sugerencia

- **ID:** CP-E04-HU22-03
- **HU:** HU22
- **CA:** CA108
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Creacion de instancia independiente desde sugerencia.
- **Precondiciones:** Entorno de pruebas y catalogos base cargados.
- **Datos utilizados:** Plantillas reales cr_plantilla_actividad y cr_plantilla_dependencia.
- **Endpoint/componente:** DTO, caso de uso o servicio real auditado.
- **Pasos ejecutados:** Auditoria del codigo y prueba aislada de la capacidad existente.
- **Resultado esperado:** Cumplir CA108.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretacion:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Estado:** FAIL
- **Evidencia:** Detalle tecnico.
- **Observaciones:** —

### CP-E04-HU23-01 - Registro y orden cronologico del timing

- **ID:** CP-E04-HU23-01
- **HU:** HU23
- **CA:** CA110, CA111
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Registro y orden cronologico del timing.
- **Precondiciones:** Entorno de pruebas y catalogos base cargados.
- **Datos utilizados:** “Ingreso de los novios” e “Inicio de la ceremonia”.
- **Endpoint/componente:** DTO, caso de uso o servicio real auditado.
- **Pasos ejecutados:** Auditoria del codigo y prueba aislada de la capacidad existente.
- **Resultado esperado:** Cumplir CA110, CA111.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretacion:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Estado:** FAIL
- **Evidencia:** Detalle tecnico.
- **Observaciones:** —

### CP-E04-HU23-02 - Deteccion de solapamientos incompatibles

- **ID:** CP-E04-HU23-02
- **HU:** HU23
- **CA:** CA112
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Deteccion de solapamientos incompatibles.
- **Precondiciones:** Entorno de pruebas y catalogos base cargados.
- **Datos utilizados:** “Ingreso de los novios” e “Inicio de la ceremonia”.
- **Endpoint/componente:** DTO, caso de uso o servicio real auditado.
- **Pasos ejecutados:** Auditoria del codigo y prueba aislada de la capacidad existente. Variantes: mismo responsable, ubicacion exclusiva.
- **Resultado esperado:** Cumplir CA112.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretacion:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Estado:** FAIL
- **Evidencia:** Detalle tecnico.
- **Observaciones:** —

### CP-E04-HU23-03 - Edicion de actividad del timing

- **ID:** CP-E04-HU23-03
- **HU:** HU23
- **CA:** CA113
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Edicion de actividad del timing.
- **Precondiciones:** Entorno de pruebas y catalogos base cargados.
- **Datos utilizados:** “Ingreso de los novios” e “Inicio de la ceremonia”.
- **Endpoint/componente:** DTO, caso de uso o servicio real auditado.
- **Pasos ejecutados:** Auditoria del codigo y prueba aislada de la capacidad existente.
- **Resultado esperado:** Cumplir CA113.
- **Resultado obtenido:** La capacidad backend evaluada esta disponible en la implementacion actual.
- **Interpretacion:** Criterio tecnico cubierto por la implementacion actual.
- **Estado:** PASS
- **Evidencia:** Resultado automatico.
- **Observaciones:** —

### CP-E04-HU23-04 - Exportacion o version compartible del timing

- **ID:** CP-E04-HU23-04
- **HU:** HU23
- **CA:** CA114
- **Tipo:** MIXTO
- **Objetivo:** Exportacion o version compartible del timing.
- **Precondiciones:** Entorno de pruebas y catalogos base cargados.
- **Datos utilizados:** “Ingreso de los novios” e “Inicio de la ceremonia”.
- **Endpoint/componente:** DTO, caso de uso o servicio real auditado.
- **Pasos ejecutados:** Auditoria del codigo y prueba aislada de la capacidad existente.
- **Resultado esperado:** Cumplir CA114.
- **Resultado obtenido:** La capacidad requerida no existe completamente en la implementacion actual.
- **Interpretacion:** Funcionalidad no implementada o incompleta; el criterio no puede cumplirse todavia.
- **Estado:** FAIL
- **Evidencia:** Detalle tecnico.
- **Observaciones:** La parte visual o de navegacion permanece manual.

## Resultados por HU

HU15: 1/4 PASS; HU16: 0/4 PASS; HU17: 1/3 PASS; HU18: 1/4 PASS; HU19: 1/4 PASS; HU20: 1/4 PASS; HU21: 1/2 PASS; HU22: 0/3 PASS; HU23: 1/4 PASS.

## Pruebas unitarias

Tres pruebas aisladas de ReprogramacionActividadesService: FINISH_TO_START, dias de desfase y ausencia de impacto.

## Detalle tecnico

### CP-E04-HU15-01
- Funcionalidad no implementada: actividad-con-categoria. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
### CP-E04-HU15-02
- Funcionalidad no implementada: actividad-validacion. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- Funcionalidad no implementada: actividad-validacion. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- Funcionalidad no implementada: actividad-validacion. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- Funcionalidad no implementada: actividad-validacion. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
### CP-E04-HU15-04
- Funcionalidad no implementada: historial-asignacion. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
### CP-E04-HU16-01
- Funcionalidad no implementada: panel-por-miembro. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
### CP-E04-HU16-02
- Funcionalidad no implementada: avance-por-miembro. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
### CP-E04-HU16-03
- Funcionalidad no implementada: panel-por-miembro. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
### CP-E04-HU16-04
- Funcionalidad no implementada: panel-retrasadas-proximas. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
### CP-E04-HU17-02
- Funcionalidad no implementada: cumplimiento-automatico-hito. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
### CP-E04-HU17-03
- Funcionalidad no implementada: historial-hitos. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
### CP-E04-HU18-01
- Funcionalidad no implementada: anticipaciones-configurables. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
### CP-E04-HU18-03
- Funcionalidad no implementada: enlace-detalle-alerta. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
### CP-E04-HU18-04
- Funcionalidad no implementada: supresion-alertas. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- Funcionalidad no implementada: supresion-alertas. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- Funcionalidad no implementada: supresion-alertas. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
### CP-E04-HU19-01
- Funcionalidad no implementada: historial-reprogramacion. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
### CP-E04-HU19-02
- Funcionalidad no implementada: margen-seguridad. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
### CP-E04-HU19-04
- Funcionalidad no implementada: impacto-fecha-matrimonio. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
### CP-E04-HU20-02
- Funcionalidad no implementada: retrasadas-regla-completa. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
### CP-E04-HU20-03
- Funcionalidad no implementada: bloqueo-completado-dependencia. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
### CP-E04-HU20-04
- Funcionalidad no implementada: historial-cambio-estado. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
### CP-E04-HU21-02
- Funcionalidad no implementada: dependencias-sugeridas. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
### CP-E04-HU22-01
- Funcionalidad no implementada: catalogo-sugerencias. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
### CP-E04-HU22-02
- Funcionalidad no implementada: seleccion-sugerencia. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
### CP-E04-HU22-03
- Funcionalidad no implementada: instancia-desde-sugerencia. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
### CP-E04-HU23-01
- Funcionalidad no implementada: timing-con-ubicacion. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
### CP-E04-HU23-02
- Funcionalidad no implementada: solapamiento-timing. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
- Funcionalidad no implementada: solapamiento-timing. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.
### CP-E04-HU23-04
- Funcionalidad no implementada: exportacion-timing. La auditoria no encontro modelo, DTO, endpoint ni caso de uso que cubra este criterio.

## Fallos reales de la aplicacion

Los FAIL reflejan capacidades ausentes o incompletas; no errores del runner.

## Funcionalidades no implementadas

Categorias de actividades, panel por miembro, checklists, cumplimiento/historial de hitos, anticipaciones, historial de reprogramacion, margen de seguridad, impacto por fecha de boda, bloqueo por dependencia, historial de cambios, catalogo/seleccion de sugerencias, ubicacion/solapamiento y exportacion de timing.

## Errores encontrados en los tests

Ninguno.

## Tests corregidos y reejecutados

No aplico.

## Casos manuales pendientes

Las partes visuales de supervision, hitos, navegacion desde alertas, confirmacion visual de impacto, relaciones graficas y exportacion.


---

### E05-Presupuesto — Presupuesto

**Datos de prueba registrados:** datos: Decoracion floral para ceremonia y recepcion; proveedor Jardines del Sol; montos PEN realistas.

**Ejecución registrada:** comando: pnpm.cmd test:e05; alcance: Solo test/E05-Presupuesto; excluye: E01-Acceso; E02-Usuarios; E03-Proyecto; E04-Cronograma; E06-Invitados; E07-Proveedores; E08-Riesgos; E09-Administracion; backup

# Resultado final E05-Presupuesto

| Metrica | Resultado |
|---|---:|
| Casos conceptuales | 22 |
| Ejecuciones/variantes | 31 |
| Pruebas unitarias | 0 |
| PASS conceptual | 0 |
| FAIL conceptual | 22 |

## Tabla principal

| Caso | Nombre | CA | Tipo | Estado | Resultado obtenido | Interpretacion |
|---|---|---|---|---|---|---|
| CP-E05-HU24-01 | Registro de costos estimado y real con categoria financiera | CA115, CA116 | AUTOMATIZADO | FAIL | No existe un modulo financiero que cubra el criterio. | Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints. |
| CP-E05-HU24-02 | Validacion de montos de costo | CA117 | AUTOMATIZADO | FAIL | No existe un modulo financiero que cubra el criterio. | Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints. |
| CP-E05-HU24-03 | Actualizacion de costos y desviacion presupuestaria | CA118, CA119 | AUTOMATIZADO | FAIL | No existe un modulo financiero que cubra el criterio. | Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints. |
| CP-E05-HU25-01 | Registro de pago y recalculo de saldo pendiente | CA120, CA121 | AUTOMATIZADO | FAIL | No existe un modulo financiero que cubra el criterio. | Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints. |
| CP-E05-HU25-02 | Validacion del monto de pago | CA122 | AUTOMATIZADO | FAIL | No existe un modulo financiero que cubra el criterio. | Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints. |
| CP-E05-HU25-03 | Comprobante asociado al pago | CA123 | AUTOMATIZADO | FAIL | No existe un modulo financiero que cubra el criterio. | Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints. |
| CP-E05-HU25-04 | Seguimiento de compromisos pendientes y vencidos | CA124 | AUTOMATIZADO | FAIL | No existe un modulo financiero que cubra el criterio. | Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints. |
| CP-E05-HU26-01 | Calculo del desglose porcentual por categoria | CA125, CA126 | AUTOMATIZADO | FAIL | No existe un modulo financiero que cubra el criterio. | Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints. |
| CP-E05-HU26-02 | Actualizacion del desglose porcentual | CA127 | AUTOMATIZADO | FAIL | No existe un modulo financiero que cubra el criterio. | Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints. |
| CP-E05-HU26-03 | Representacion visual del desglose presupuestario | CA128 | MANUAL | FAIL | No existe un modulo financiero que cubra el criterio. | Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints. |
| CP-E05-HU27-01 | Alerta de sobrepresupuesto por categoria | CA129, CA130 | AUTOMATIZADO | FAIL | No existe un modulo financiero que cubra el criterio. | Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints. |
| CP-E05-HU27-02 | Alerta de desbalance global | CA131 | AUTOMATIZADO | FAIL | No existe un modulo financiero que cubra el criterio. | Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints. |
| CP-E05-HU27-03 | Actualizacion de alertas financieras | CA132 | AUTOMATIZADO | FAIL | No existe un modulo financiero que cubra el criterio. | Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints. |
| CP-E05-HU27-04 | Acceso desde alerta al detalle financiero | CA133 | MIXTO | FAIL | No existe un modulo financiero que cubra el criterio. | Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints. |
| CP-E05-HU28-01 | Generacion de reporte financiero consolidado | CA134, CA137 | AUTOMATIZADO | FAIL | No existe un modulo financiero que cubra el criterio. | Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints. |
| CP-E05-HU28-02 | Filtrado del reporte financiero | CA135 | AUTOMATIZADO | FAIL | No existe un modulo financiero que cubra el criterio. | Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints. |
| CP-E05-HU28-03 | Exportacion consistente en PDF y CSV | CA136 | MIXTO | FAIL | No existe un modulo financiero que cubra el criterio. | Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints. |
| CP-E05-HU28-04 | Reporte sin datos coincidentes | CA138 | AUTOMATIZADO | FAIL | No existe un modulo financiero que cubra el criterio. | Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints. |
| CP-E05-HU29-01 | Incorporacion automatica de contratacion al presupuesto | CA139, CA140 | AUTOMATIZADO | FAIL | No existe un modulo financiero que cubra el criterio. | Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints. |
| CP-E05-HU29-02 | Vinculacion contratacion-gasto sin duplicidad | CA141 | AUTOMATIZADO | FAIL | No existe un modulo financiero que cubra el criterio. | Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints. |
| CP-E05-HU29-03 | Sincronizacion al modificar monto contratado | CA142 | AUTOMATIZADO | FAIL | No existe un modulo financiero que cubra el criterio. | Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints. |
| CP-E05-HU29-04 | Recalculo financiero posterior a contratacion | CA143 | AUTOMATIZADO | FAIL | No existe un modulo financiero que cubra el criterio. | Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints. |

## Detalle por caso

### CP-E05-HU24-01 - Registro de costos estimado y real con categoria financiera
- **ID:** CP-E05-HU24-01
- **HU:** HU24
- **CA:** CA115, CA116
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Registro de costos estimado y real con categoria financiera.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Decoracion floral para ceremonia y recepcion; proveedor Jardines del Sol; montos PEN realistas.
- **Endpoint/componente:** Contrato y modulo Proveedores auditados.
- **Pasos ejecutados:** Auditoria y prueba automatica de la capacidad existente.
- **Resultado esperado:** Cumplir CA115, CA116.
- **Resultado obtenido:** No existe un modulo financiero que cubra el criterio.
- **Interpretacion:** Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints.
- **Estado:** FAIL
- **Evidencia:** Detalle tecnico.
- **Observaciones:** —

### CP-E05-HU24-02 - Validacion de montos de costo
- **ID:** CP-E05-HU24-02
- **HU:** HU24
- **CA:** CA117
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Validacion de montos de costo.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Decoracion floral para ceremonia y recepcion; proveedor Jardines del Sol; montos PEN realistas.
- **Endpoint/componente:** Contrato y modulo Proveedores auditados.
- **Pasos ejecutados:** Auditoria y prueba automatica de la capacidad existente. Variantes: negativo, no numerico, cero, positivo.
- **Resultado esperado:** Cumplir CA117.
- **Resultado obtenido:** No existe un modulo financiero que cubra el criterio.
- **Interpretacion:** Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints.
- **Estado:** FAIL
- **Evidencia:** Detalle tecnico.
- **Observaciones:** —

### CP-E05-HU24-03 - Actualizacion de costos y desviacion presupuestaria
- **ID:** CP-E05-HU24-03
- **HU:** HU24
- **CA:** CA118, CA119
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Actualizacion de costos y desviacion presupuestaria.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Decoracion floral para ceremonia y recepcion; proveedor Jardines del Sol; montos PEN realistas.
- **Endpoint/componente:** Contrato y modulo Proveedores auditados.
- **Pasos ejecutados:** Auditoria y prueba automatica de la capacidad existente.
- **Resultado esperado:** Cumplir CA118, CA119.
- **Resultado obtenido:** No existe un modulo financiero que cubra el criterio.
- **Interpretacion:** Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints.
- **Estado:** FAIL
- **Evidencia:** Detalle tecnico.
- **Observaciones:** —

### CP-E05-HU25-01 - Registro de pago y recalculo de saldo pendiente
- **ID:** CP-E05-HU25-01
- **HU:** HU25
- **CA:** CA120, CA121
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Registro de pago y recalculo de saldo pendiente.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Decoracion floral para ceremonia y recepcion; proveedor Jardines del Sol; montos PEN realistas.
- **Endpoint/componente:** Contrato y modulo Proveedores auditados.
- **Pasos ejecutados:** Auditoria y prueba automatica de la capacidad existente.
- **Resultado esperado:** Cumplir CA120, CA121.
- **Resultado obtenido:** No existe un modulo financiero que cubra el criterio.
- **Interpretacion:** Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints.
- **Estado:** FAIL
- **Evidencia:** Detalle tecnico.
- **Observaciones:** —

### CP-E05-HU25-02 - Validacion del monto de pago
- **ID:** CP-E05-HU25-02
- **HU:** HU25
- **CA:** CA122
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Validacion del monto de pago.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Decoracion floral para ceremonia y recepcion; proveedor Jardines del Sol; montos PEN realistas.
- **Endpoint/componente:** Contrato y modulo Proveedores auditados.
- **Pasos ejecutados:** Auditoria y prueba automatica de la capacidad existente. Variantes: cero, negativo, mayor al saldo, igual al saldo, menor al saldo.
- **Resultado esperado:** Cumplir CA122.
- **Resultado obtenido:** No existe un modulo financiero que cubra el criterio.
- **Interpretacion:** Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints.
- **Estado:** FAIL
- **Evidencia:** Detalle tecnico.
- **Observaciones:** —

### CP-E05-HU25-03 - Comprobante asociado al pago
- **ID:** CP-E05-HU25-03
- **HU:** HU25
- **CA:** CA123
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Comprobante asociado al pago.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Decoracion floral para ceremonia y recepcion; proveedor Jardines del Sol; montos PEN realistas.
- **Endpoint/componente:** Contrato y modulo Proveedores auditados.
- **Pasos ejecutados:** Auditoria y prueba automatica de la capacidad existente.
- **Resultado esperado:** Cumplir CA123.
- **Resultado obtenido:** No existe un modulo financiero que cubra el criterio.
- **Interpretacion:** Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints.
- **Estado:** FAIL
- **Evidencia:** Detalle tecnico.
- **Observaciones:** —

### CP-E05-HU25-04 - Seguimiento de compromisos pendientes y vencidos
- **ID:** CP-E05-HU25-04
- **HU:** HU25
- **CA:** CA124
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Seguimiento de compromisos pendientes y vencidos.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Decoracion floral para ceremonia y recepcion; proveedor Jardines del Sol; montos PEN realistas.
- **Endpoint/componente:** Contrato y modulo Proveedores auditados.
- **Pasos ejecutados:** Auditoria y prueba automatica de la capacidad existente. Variantes: pendiente no vencida, pendiente vencida, pagada.
- **Resultado esperado:** Cumplir CA124.
- **Resultado obtenido:** No existe un modulo financiero que cubra el criterio.
- **Interpretacion:** Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints.
- **Estado:** FAIL
- **Evidencia:** Detalle tecnico.
- **Observaciones:** —

### CP-E05-HU26-01 - Calculo del desglose porcentual por categoria
- **ID:** CP-E05-HU26-01
- **HU:** HU26
- **CA:** CA125, CA126
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Calculo del desglose porcentual por categoria.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Decoracion floral para ceremonia y recepcion; proveedor Jardines del Sol; montos PEN realistas.
- **Endpoint/componente:** Contrato y modulo Proveedores auditados.
- **Pasos ejecutados:** Auditoria y prueba automatica de la capacidad existente.
- **Resultado esperado:** Cumplir CA125, CA126.
- **Resultado obtenido:** No existe un modulo financiero que cubra el criterio.
- **Interpretacion:** Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints.
- **Estado:** FAIL
- **Evidencia:** Detalle tecnico.
- **Observaciones:** —

### CP-E05-HU26-02 - Actualizacion del desglose porcentual
- **ID:** CP-E05-HU26-02
- **HU:** HU26
- **CA:** CA127
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Actualizacion del desglose porcentual.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Decoracion floral para ceremonia y recepcion; proveedor Jardines del Sol; montos PEN realistas.
- **Endpoint/componente:** Contrato y modulo Proveedores auditados.
- **Pasos ejecutados:** Auditoria y prueba automatica de la capacidad existente.
- **Resultado esperado:** Cumplir CA127.
- **Resultado obtenido:** No existe un modulo financiero que cubra el criterio.
- **Interpretacion:** Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints.
- **Estado:** FAIL
- **Evidencia:** Detalle tecnico.
- **Observaciones:** —

### CP-E05-HU26-03 - Representacion visual del desglose presupuestario
- **ID:** CP-E05-HU26-03
- **HU:** HU26
- **CA:** CA128
- **Tipo:** MANUAL
- **Objetivo:** Representacion visual del desglose presupuestario.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Decoracion floral para ceremonia y recepcion; proveedor Jardines del Sol; montos PEN realistas.
- **Endpoint/componente:** Contrato y modulo Proveedores auditados.
- **Pasos ejecutados:** Auditoria y prueba automatica de la capacidad existente.
- **Resultado esperado:** Cumplir CA128.
- **Resultado obtenido:** No existe un modulo financiero que cubra el criterio.
- **Interpretacion:** Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints.
- **Estado:** FAIL
- **Evidencia:** Detalle tecnico.
- **Observaciones:** Parte visual/manual pendiente.

### CP-E05-HU27-01 - Alerta de sobrepresupuesto por categoria
- **ID:** CP-E05-HU27-01
- **HU:** HU27
- **CA:** CA129, CA130
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Alerta de sobrepresupuesto por categoria.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Decoracion floral para ceremonia y recepcion; proveedor Jardines del Sol; montos PEN realistas.
- **Endpoint/componente:** Contrato y modulo Proveedores auditados.
- **Pasos ejecutados:** Auditoria y prueba automatica de la capacidad existente.
- **Resultado esperado:** Cumplir CA129, CA130.
- **Resultado obtenido:** No existe un modulo financiero que cubra el criterio.
- **Interpretacion:** Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints.
- **Estado:** FAIL
- **Evidencia:** Detalle tecnico.
- **Observaciones:** —

### CP-E05-HU27-02 - Alerta de desbalance global
- **ID:** CP-E05-HU27-02
- **HU:** HU27
- **CA:** CA131
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Alerta de desbalance global.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Decoracion floral para ceremonia y recepcion; proveedor Jardines del Sol; montos PEN realistas.
- **Endpoint/componente:** Contrato y modulo Proveedores auditados.
- **Pasos ejecutados:** Auditoria y prueba automatica de la capacidad existente.
- **Resultado esperado:** Cumplir CA131.
- **Resultado obtenido:** No existe un modulo financiero que cubra el criterio.
- **Interpretacion:** Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints.
- **Estado:** FAIL
- **Evidencia:** Detalle tecnico.
- **Observaciones:** —

### CP-E05-HU27-03 - Actualizacion de alertas financieras
- **ID:** CP-E05-HU27-03
- **HU:** HU27
- **CA:** CA132
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Actualizacion de alertas financieras.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Decoracion floral para ceremonia y recepcion; proveedor Jardines del Sol; montos PEN realistas.
- **Endpoint/componente:** Contrato y modulo Proveedores auditados.
- **Pasos ejecutados:** Auditoria y prueba automatica de la capacidad existente.
- **Resultado esperado:** Cumplir CA132.
- **Resultado obtenido:** No existe un modulo financiero que cubra el criterio.
- **Interpretacion:** Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints.
- **Estado:** FAIL
- **Evidencia:** Detalle tecnico.
- **Observaciones:** —

### CP-E05-HU27-04 - Acceso desde alerta al detalle financiero
- **ID:** CP-E05-HU27-04
- **HU:** HU27
- **CA:** CA133
- **Tipo:** MIXTO
- **Objetivo:** Acceso desde alerta al detalle financiero.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Decoracion floral para ceremonia y recepcion; proveedor Jardines del Sol; montos PEN realistas.
- **Endpoint/componente:** Contrato y modulo Proveedores auditados.
- **Pasos ejecutados:** Auditoria y prueba automatica de la capacidad existente.
- **Resultado esperado:** Cumplir CA133.
- **Resultado obtenido:** No existe un modulo financiero que cubra el criterio.
- **Interpretacion:** Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints.
- **Estado:** FAIL
- **Evidencia:** Detalle tecnico.
- **Observaciones:** Parte visual/manual pendiente.

### CP-E05-HU28-01 - Generacion de reporte financiero consolidado
- **ID:** CP-E05-HU28-01
- **HU:** HU28
- **CA:** CA134, CA137
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Generacion de reporte financiero consolidado.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Decoracion floral para ceremonia y recepcion; proveedor Jardines del Sol; montos PEN realistas.
- **Endpoint/componente:** Contrato y modulo Proveedores auditados.
- **Pasos ejecutados:** Auditoria y prueba automatica de la capacidad existente.
- **Resultado esperado:** Cumplir CA134, CA137.
- **Resultado obtenido:** No existe un modulo financiero que cubra el criterio.
- **Interpretacion:** Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints.
- **Estado:** FAIL
- **Evidencia:** Detalle tecnico.
- **Observaciones:** —

### CP-E05-HU28-02 - Filtrado del reporte financiero
- **ID:** CP-E05-HU28-02
- **HU:** HU28
- **CA:** CA135
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Filtrado del reporte financiero.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Decoracion floral para ceremonia y recepcion; proveedor Jardines del Sol; montos PEN realistas.
- **Endpoint/componente:** Contrato y modulo Proveedores auditados.
- **Pasos ejecutados:** Auditoria y prueba automatica de la capacidad existente.
- **Resultado esperado:** Cumplir CA135.
- **Resultado obtenido:** No existe un modulo financiero que cubra el criterio.
- **Interpretacion:** Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints.
- **Estado:** FAIL
- **Evidencia:** Detalle tecnico.
- **Observaciones:** —

### CP-E05-HU28-03 - Exportacion consistente en PDF y CSV
- **ID:** CP-E05-HU28-03
- **HU:** HU28
- **CA:** CA136
- **Tipo:** MIXTO
- **Objetivo:** Exportacion consistente en PDF y CSV.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Decoracion floral para ceremonia y recepcion; proveedor Jardines del Sol; montos PEN realistas.
- **Endpoint/componente:** Contrato y modulo Proveedores auditados.
- **Pasos ejecutados:** Auditoria y prueba automatica de la capacidad existente.
- **Resultado esperado:** Cumplir CA136.
- **Resultado obtenido:** No existe un modulo financiero que cubra el criterio.
- **Interpretacion:** Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints.
- **Estado:** FAIL
- **Evidencia:** Detalle tecnico.
- **Observaciones:** Parte visual/manual pendiente.

### CP-E05-HU28-04 - Reporte sin datos coincidentes
- **ID:** CP-E05-HU28-04
- **HU:** HU28
- **CA:** CA138
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Reporte sin datos coincidentes.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Decoracion floral para ceremonia y recepcion; proveedor Jardines del Sol; montos PEN realistas.
- **Endpoint/componente:** Contrato y modulo Proveedores auditados.
- **Pasos ejecutados:** Auditoria y prueba automatica de la capacidad existente.
- **Resultado esperado:** Cumplir CA138.
- **Resultado obtenido:** No existe un modulo financiero que cubra el criterio.
- **Interpretacion:** Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints.
- **Estado:** FAIL
- **Evidencia:** Detalle tecnico.
- **Observaciones:** —

### CP-E05-HU29-01 - Incorporacion automatica de contratacion al presupuesto
- **ID:** CP-E05-HU29-01
- **HU:** HU29
- **CA:** CA139, CA140
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Incorporacion automatica de contratacion al presupuesto.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Decoracion floral para ceremonia y recepcion; proveedor Jardines del Sol; montos PEN realistas.
- **Endpoint/componente:** Contrato y modulo Proveedores auditados.
- **Pasos ejecutados:** Auditoria y prueba automatica de la capacidad existente.
- **Resultado esperado:** Cumplir CA139, CA140.
- **Resultado obtenido:** No existe un modulo financiero que cubra el criterio.
- **Interpretacion:** Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints.
- **Estado:** FAIL
- **Evidencia:** Detalle tecnico.
- **Observaciones:** —

### CP-E05-HU29-02 - Vinculacion contratacion-gasto sin duplicidad
- **ID:** CP-E05-HU29-02
- **HU:** HU29
- **CA:** CA141
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Vinculacion contratacion-gasto sin duplicidad.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Decoracion floral para ceremonia y recepcion; proveedor Jardines del Sol; montos PEN realistas.
- **Endpoint/componente:** Contrato y modulo Proveedores auditados.
- **Pasos ejecutados:** Auditoria y prueba automatica de la capacidad existente.
- **Resultado esperado:** Cumplir CA141.
- **Resultado obtenido:** No existe un modulo financiero que cubra el criterio.
- **Interpretacion:** Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints.
- **Estado:** FAIL
- **Evidencia:** Detalle tecnico.
- **Observaciones:** —

### CP-E05-HU29-03 - Sincronizacion al modificar monto contratado
- **ID:** CP-E05-HU29-03
- **HU:** HU29
- **CA:** CA142
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Sincronizacion al modificar monto contratado.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Decoracion floral para ceremonia y recepcion; proveedor Jardines del Sol; montos PEN realistas.
- **Endpoint/componente:** Contrato y modulo Proveedores auditados.
- **Pasos ejecutados:** Auditoria y prueba automatica de la capacidad existente.
- **Resultado esperado:** Cumplir CA142.
- **Resultado obtenido:** No existe un modulo financiero que cubra el criterio.
- **Interpretacion:** Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints.
- **Estado:** FAIL
- **Evidencia:** Detalle tecnico.
- **Observaciones:** —

### CP-E05-HU29-04 - Recalculo financiero posterior a contratacion
- **ID:** CP-E05-HU29-04
- **HU:** HU29
- **CA:** CA143
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Recalculo financiero posterior a contratacion.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Decoracion floral para ceremonia y recepcion; proveedor Jardines del Sol; montos PEN realistas.
- **Endpoint/componente:** Contrato y modulo Proveedores auditados.
- **Pasos ejecutados:** Auditoria y prueba automatica de la capacidad existente.
- **Resultado esperado:** Cumplir CA143.
- **Resultado obtenido:** No existe un modulo financiero que cubra el criterio.
- **Interpretacion:** Funcionalidad no implementada; no se puede validar sin inventar tablas o endpoints.
- **Estado:** FAIL
- **Evidencia:** Detalle tecnico.
- **Observaciones:** —

## Resultados por HU

HU24: 0/3 PASS; HU25: 0/4 PASS; HU26: 0/3 PASS; HU27: 0/4 PASS; HU28: 0/4 PASS; HU29: 0/4 PASS.

## Pruebas unitarias

No existen servicios financieros aislables en el codigo actual.

## Detalle tecnico

- CP-E05-HU24-01: Funcionalidad no implementada: costos-estimado-real. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- CP-E05-HU24-02: Funcionalidad no implementada: validacion-montos. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- CP-E05-HU24-02: Funcionalidad no implementada: validacion-montos. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- CP-E05-HU24-02: Funcionalidad no implementada: validacion-montos. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- CP-E05-HU24-02: Funcionalidad no implementada: validacion-montos. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- CP-E05-HU24-03: Funcionalidad no implementada: desviacion-presupuestaria. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- CP-E05-HU25-01: Funcionalidad no implementada: pagos. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- CP-E05-HU25-02: Funcionalidad no implementada: pagos. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- CP-E05-HU25-02: Funcionalidad no implementada: pagos. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- CP-E05-HU25-02: Funcionalidad no implementada: pagos. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- CP-E05-HU25-02: Funcionalidad no implementada: pagos. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- CP-E05-HU25-02: Funcionalidad no implementada: pagos. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- CP-E05-HU25-03: Funcionalidad no implementada: comprobante-pago. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- CP-E05-HU25-04: Funcionalidad no implementada: compromisos. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- CP-E05-HU25-04: Funcionalidad no implementada: compromisos. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- CP-E05-HU25-04: Funcionalidad no implementada: compromisos. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- CP-E05-HU26-01: Funcionalidad no implementada: desglose-categoria. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- CP-E05-HU26-02: Funcionalidad no implementada: desglose-categoria. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- CP-E05-HU26-03: Funcionalidad no implementada: grafico-presupuesto. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- CP-E05-HU27-01: Funcionalidad no implementada: alertas-financieras. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- CP-E05-HU27-02: Funcionalidad no implementada: alertas-financieras. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- CP-E05-HU27-03: Funcionalidad no implementada: alertas-financieras. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- CP-E05-HU27-04: Funcionalidad no implementada: alertas-financieras. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- CP-E05-HU28-01: Funcionalidad no implementada: reporte-financiero. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- CP-E05-HU28-02: Funcionalidad no implementada: reporte-financiero. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- CP-E05-HU28-03: Funcionalidad no implementada: exportacion-financiera. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- CP-E05-HU28-04: Funcionalidad no implementada: reporte-financiero. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- CP-E05-HU29-01: Funcionalidad no implementada: sincronizacion-proveedor-presupuesto. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- CP-E05-HU29-02: Funcionalidad no implementada: sincronizacion-proveedor-presupuesto. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- CP-E05-HU29-03: Funcionalidad no implementada: sincronizacion-proveedor-presupuesto. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.
- CP-E05-HU29-04: Funcionalidad no implementada: sincronizacion-proveedor-presupuesto. El contrato actual no contiene tablas, DTOs, endpoints ni casos de uso de presupuesto financiero, pagos o reportes.

## Fallos reales de la aplicacion

No existe modulo de presupuesto: faltan costos por contratacion, pagos, cuotas, comprobantes, categorias financieras, alertas y reportes.

## Funcionalidades no implementadas

CA115-CA143 requieren un modelo financiero que no esta en el contrato actual.

## Errores encontrados en los tests

Ninguno.

## Tests corregidos y reejecutados

No aplico.

## Casos manuales pendientes

Grafico de desglose, navegacion desde alerta y visualizacion/exportacion de reportes.


---

### E06-Invitados — Invitados

**Datos de prueba registrados:** invitada: Mariana Salazar Ríos; mesa: Jardín de Magnolias

**Ejecución registrada:** comando: pnpm.cmd test:e06; alcance: Solo test/E06-Invitados; excluye: E01-Acceso; E02-Usuarios; E03-Proyecto; E04-Cronograma; E05-Presupuesto; E07-Proveedores; E08-Riesgos; E09-Administracion; backup

# Resultado final E06-Invitados

| Métrica | Resultado |
|---|---:|
| Casos conceptuales | 24 |
| Ejecuciones Jest | 24 |
| PASS conceptual | 8 |
| FAIL conceptual | 16 |

## Tabla principal

| Caso | Nombre | CA | Tipo | Estado | Resultado obtenido | Interpretación |
|---|---|---|---|---|---|---|
| CP-E06-HU30-01 | Registro y consulta de invitado | CA144 | AUTOMATIZADO | PASS | La capacidad evaluada existe en Invitados. | Criterio técnico cubierto. |
| CP-E06-HU30-02 | Validación de datos del invitado | CA145 | AUTOMATIZADO | FAIL | La capacidad no está implementada completamente. | Funcionalidad no implementada o incompleta. |
| CP-E06-HU30-03 | Edición de invitado | CA146 | AUTOMATIZADO | PASS | La capacidad evaluada existe en Invitados. | Criterio técnico cubierto. |
| CP-E06-HU30-04 | Retiro del invitado y actualización del total | CA147 | AUTOMATIZADO | PASS | La capacidad evaluada existe en Invitados. | Criterio técnico cubierto. |
| CP-E06-HU31-01 | Clasificación y filtrado por relación | CA148 | AUTOMATIZADO | PASS | La capacidad evaluada existe en Invitados. | Criterio técnico cubierto. |
| CP-E06-HU31-02 | Cambio y retiro del filtro | CA149 | AUTOMATIZADO | PASS | La capacidad evaluada existe en Invitados. | Criterio técnico cubierto. |
| CP-E06-HU31-03 | Filtrado por colaborador autorizado | CA150 | AUTOMATIZADO | FAIL | La capacidad no está implementada completamente. | Funcionalidad no implementada o incompleta. |
| CP-E06-HU32-01 | Gestión de requerimientos alimentarios | CA151 | AUTOMATIZADO | PASS | La capacidad evaluada existe en Invitados. | Criterio técnico cubierto. |
| CP-E06-HU32-02 | Filtro y resumen por requerimiento alimentario | CA152 | AUTOMATIZADO | FAIL | La capacidad no está implementada completamente. | Funcionalidad no implementada o incompleta. |
| CP-E06-HU32-03 | Exportación del listado alimentario | CA153 | AUTOMATIZADO | FAIL | La capacidad no está implementada completamente. | Funcionalidad no implementada o incompleta. |
| CP-E06-HU33-01 | Asignación y consulta por mesa | CA154 | AUTOMATIZADO | FAIL | La capacidad no está implementada completamente. | Funcionalidad no implementada o incompleta. |
| CP-E06-HU33-02 | Reasignación de mesa sin duplicidad | CA155 | AUTOMATIZADO | FAIL | La capacidad no está implementada completamente. | Funcionalidad no implementada o incompleta. |
| CP-E06-HU33-03 | Representación gráfica de mesas | CA156 | MANUAL | FAIL | La capacidad no está implementada completamente. | Funcionalidad no implementada o incompleta. |
| CP-E06-HU34-01 | Cálculo de asistencia confirmada | CA157 | AUTOMATIZADO | FAIL | La capacidad no está implementada completamente. | Funcionalidad no implementada o incompleta. |
| CP-E06-HU34-02 | Pendientes de respuesta y actualización estadística | CA158 | AUTOMATIZADO | FAIL | La capacidad no está implementada completamente. | Funcionalidad no implementada o incompleta. |
| CP-E06-HU34-03 | Permisos sobre estadísticas de invitados | CA159 | AUTOMATIZADO | FAIL | La capacidad no está implementada completamente. | Funcionalidad no implementada o incompleta. |
| CP-E06-HU35-01 | Gestión y actualización del RSVP | CA160 | AUTOMATIZADO | PASS | La capacidad evaluada existe en Invitados. | Criterio técnico cubierto. |
| CP-E06-HU35-02 | Fechas de seguimiento RSVP | CA161 | AUTOMATIZADO | FAIL | La capacidad no está implementada completamente. | Funcionalidad no implementada o incompleta. |
| CP-E06-HU35-03 | Recordatorios únicamente para RSVP pendientes | CA162 | AUTOMATIZADO | FAIL | La capacidad no está implementada completamente. | Funcionalidad no implementada o incompleta. |
| CP-E06-HU36-01 | Ordenamiento alfabético combinado con filtros | CA163 | AUTOMATIZADO | PASS | La capacidad evaluada existe en Invitados. | Criterio técnico cubierto. |
| CP-E06-HU36-02 | Persistencia de la preferencia de ordenamiento | CA164 | AUTOMATIZADO | FAIL | La capacidad no está implementada completamente. | Funcionalidad no implementada o incompleta. |
| CP-E06-HU37-01 | Generación y envío de invitación digital | CA165 | MIXTO | FAIL | La capacidad no está implementada completamente. | Funcionalidad no implementada o incompleta. |
| CP-E06-HU37-02 | Registro de interacción sin alterar automáticamente RSVP | CA166 | MIXTO | FAIL | La capacidad no está implementada completamente. | Funcionalidad no implementada o incompleta. |
| CP-E06-HU37-03 | Notificación a Wedding Planner por interacción | CA167 | MIXTO | FAIL | La capacidad no está implementada completamente. | Funcionalidad no implementada o incompleta. |

## Detalle por caso

### CP-E06-HU30-01 - Registro y consulta de invitado

- **ID:** CP-E06-HU30-01
- **HU:** HU30
- **CA:** CA144
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Registro y consulta de invitado.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Mariana Salazar Ríos; mesa Jardín de Magnolias.
- **Endpoint/componente:** Módulo Invitados auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada de la capacidad existente.
- **Resultado esperado:** Cumplir CA144.
- **Resultado obtenido:** La capacidad evaluada existe en Invitados.
- **Interpretación:** Criterio técnico cubierto.
- **Estado:** PASS
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E06-HU30-02 - Validación de datos del invitado

- **ID:** CP-E06-HU30-02
- **HU:** HU30
- **CA:** CA145
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Validación de datos del invitado.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Mariana Salazar Ríos; mesa Jardín de Magnolias.
- **Endpoint/componente:** Módulo Invitados auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada de la capacidad existente.
- **Resultado esperado:** Cumplir CA145.
- **Resultado obtenido:** La capacidad no está implementada completamente.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E06-HU30-03 - Edición de invitado

- **ID:** CP-E06-HU30-03
- **HU:** HU30
- **CA:** CA146
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Edición de invitado.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Mariana Salazar Ríos; mesa Jardín de Magnolias.
- **Endpoint/componente:** Módulo Invitados auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada de la capacidad existente.
- **Resultado esperado:** Cumplir CA146.
- **Resultado obtenido:** La capacidad evaluada existe en Invitados.
- **Interpretación:** Criterio técnico cubierto.
- **Estado:** PASS
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E06-HU30-04 - Retiro del invitado y actualización del total

- **ID:** CP-E06-HU30-04
- **HU:** HU30
- **CA:** CA147
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Retiro del invitado y actualización del total.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Mariana Salazar Ríos; mesa Jardín de Magnolias.
- **Endpoint/componente:** Módulo Invitados auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada de la capacidad existente.
- **Resultado esperado:** Cumplir CA147.
- **Resultado obtenido:** La capacidad evaluada existe en Invitados.
- **Interpretación:** Criterio técnico cubierto.
- **Estado:** PASS
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E06-HU31-01 - Clasificación y filtrado por relación

- **ID:** CP-E06-HU31-01
- **HU:** HU31
- **CA:** CA148
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Clasificación y filtrado por relación.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Mariana Salazar Ríos; mesa Jardín de Magnolias.
- **Endpoint/componente:** Módulo Invitados auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada de la capacidad existente.
- **Resultado esperado:** Cumplir CA148.
- **Resultado obtenido:** La capacidad evaluada existe en Invitados.
- **Interpretación:** Criterio técnico cubierto.
- **Estado:** PASS
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E06-HU31-02 - Cambio y retiro del filtro

- **ID:** CP-E06-HU31-02
- **HU:** HU31
- **CA:** CA149
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Cambio y retiro del filtro.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Mariana Salazar Ríos; mesa Jardín de Magnolias.
- **Endpoint/componente:** Módulo Invitados auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada de la capacidad existente.
- **Resultado esperado:** Cumplir CA149.
- **Resultado obtenido:** La capacidad evaluada existe en Invitados.
- **Interpretación:** Criterio técnico cubierto.
- **Estado:** PASS
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E06-HU31-03 - Filtrado por colaborador autorizado

- **ID:** CP-E06-HU31-03
- **HU:** HU31
- **CA:** CA150
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Filtrado por colaborador autorizado.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Mariana Salazar Ríos; mesa Jardín de Magnolias.
- **Endpoint/componente:** Módulo Invitados auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada de la capacidad existente.
- **Resultado esperado:** Cumplir CA150.
- **Resultado obtenido:** La capacidad no está implementada completamente.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E06-HU32-01 - Gestión de requerimientos alimentarios

- **ID:** CP-E06-HU32-01
- **HU:** HU32
- **CA:** CA151
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Gestión de requerimientos alimentarios.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Mariana Salazar Ríos; mesa Jardín de Magnolias.
- **Endpoint/componente:** Módulo Invitados auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada de la capacidad existente.
- **Resultado esperado:** Cumplir CA151.
- **Resultado obtenido:** La capacidad evaluada existe en Invitados.
- **Interpretación:** Criterio técnico cubierto.
- **Estado:** PASS
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E06-HU32-02 - Filtro y resumen por requerimiento alimentario

- **ID:** CP-E06-HU32-02
- **HU:** HU32
- **CA:** CA152
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Filtro y resumen por requerimiento alimentario.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Mariana Salazar Ríos; mesa Jardín de Magnolias.
- **Endpoint/componente:** Módulo Invitados auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada de la capacidad existente.
- **Resultado esperado:** Cumplir CA152.
- **Resultado obtenido:** La capacidad no está implementada completamente.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E06-HU32-03 - Exportación del listado alimentario

- **ID:** CP-E06-HU32-03
- **HU:** HU32
- **CA:** CA153
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Exportación del listado alimentario.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Mariana Salazar Ríos; mesa Jardín de Magnolias.
- **Endpoint/componente:** Módulo Invitados auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada de la capacidad existente.
- **Resultado esperado:** Cumplir CA153.
- **Resultado obtenido:** La capacidad no está implementada completamente.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E06-HU33-01 - Asignación y consulta por mesa

- **ID:** CP-E06-HU33-01
- **HU:** HU33
- **CA:** CA154
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Asignación y consulta por mesa.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Mariana Salazar Ríos; mesa Jardín de Magnolias.
- **Endpoint/componente:** Módulo Invitados auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada de la capacidad existente.
- **Resultado esperado:** Cumplir CA154.
- **Resultado obtenido:** La capacidad no está implementada completamente.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E06-HU33-02 - Reasignación de mesa sin duplicidad

- **ID:** CP-E06-HU33-02
- **HU:** HU33
- **CA:** CA155
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Reasignación de mesa sin duplicidad.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Mariana Salazar Ríos; mesa Jardín de Magnolias.
- **Endpoint/componente:** Módulo Invitados auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada de la capacidad existente.
- **Resultado esperado:** Cumplir CA155.
- **Resultado obtenido:** La capacidad no está implementada completamente.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E06-HU33-03 - Representación gráfica de mesas

- **ID:** CP-E06-HU33-03
- **HU:** HU33
- **CA:** CA156
- **Tipo:** MANUAL
- **Objetivo:** Representación gráfica de mesas.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Mariana Salazar Ríos; mesa Jardín de Magnolias.
- **Endpoint/componente:** Módulo Invitados auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada de la capacidad existente.
- **Resultado esperado:** Cumplir CA156.
- **Resultado obtenido:** La capacidad no está implementada completamente.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** Parte visual/manual pendiente.

### CP-E06-HU34-01 - Cálculo de asistencia confirmada

- **ID:** CP-E06-HU34-01
- **HU:** HU34
- **CA:** CA157
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Cálculo de asistencia confirmada.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Mariana Salazar Ríos; mesa Jardín de Magnolias.
- **Endpoint/componente:** Módulo Invitados auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada de la capacidad existente.
- **Resultado esperado:** Cumplir CA157.
- **Resultado obtenido:** La capacidad no está implementada completamente.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E06-HU34-02 - Pendientes de respuesta y actualización estadística

- **ID:** CP-E06-HU34-02
- **HU:** HU34
- **CA:** CA158
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Pendientes de respuesta y actualización estadística.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Mariana Salazar Ríos; mesa Jardín de Magnolias.
- **Endpoint/componente:** Módulo Invitados auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada de la capacidad existente.
- **Resultado esperado:** Cumplir CA158.
- **Resultado obtenido:** La capacidad no está implementada completamente.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E06-HU34-03 - Permisos sobre estadísticas de invitados

- **ID:** CP-E06-HU34-03
- **HU:** HU34
- **CA:** CA159
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Permisos sobre estadísticas de invitados.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Mariana Salazar Ríos; mesa Jardín de Magnolias.
- **Endpoint/componente:** Módulo Invitados auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada de la capacidad existente.
- **Resultado esperado:** Cumplir CA159.
- **Resultado obtenido:** La capacidad no está implementada completamente.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E06-HU35-01 - Gestión y actualización del RSVP

- **ID:** CP-E06-HU35-01
- **HU:** HU35
- **CA:** CA160
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Gestión y actualización del RSVP.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Mariana Salazar Ríos; mesa Jardín de Magnolias.
- **Endpoint/componente:** Módulo Invitados auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada de la capacidad existente.
- **Resultado esperado:** Cumplir CA160.
- **Resultado obtenido:** La capacidad evaluada existe en Invitados.
- **Interpretación:** Criterio técnico cubierto.
- **Estado:** PASS
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E06-HU35-02 - Fechas de seguimiento RSVP

- **ID:** CP-E06-HU35-02
- **HU:** HU35
- **CA:** CA161
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Fechas de seguimiento RSVP.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Mariana Salazar Ríos; mesa Jardín de Magnolias.
- **Endpoint/componente:** Módulo Invitados auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada de la capacidad existente.
- **Resultado esperado:** Cumplir CA161.
- **Resultado obtenido:** La capacidad no está implementada completamente.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E06-HU35-03 - Recordatorios únicamente para RSVP pendientes

- **ID:** CP-E06-HU35-03
- **HU:** HU35
- **CA:** CA162
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Recordatorios únicamente para RSVP pendientes.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Mariana Salazar Ríos; mesa Jardín de Magnolias.
- **Endpoint/componente:** Módulo Invitados auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada de la capacidad existente.
- **Resultado esperado:** Cumplir CA162.
- **Resultado obtenido:** La capacidad no está implementada completamente.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E06-HU36-01 - Ordenamiento alfabético combinado con filtros

- **ID:** CP-E06-HU36-01
- **HU:** HU36
- **CA:** CA163
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Ordenamiento alfabético combinado con filtros.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Mariana Salazar Ríos; mesa Jardín de Magnolias.
- **Endpoint/componente:** Módulo Invitados auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada de la capacidad existente.
- **Resultado esperado:** Cumplir CA163.
- **Resultado obtenido:** La capacidad evaluada existe en Invitados.
- **Interpretación:** Criterio técnico cubierto.
- **Estado:** PASS
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E06-HU36-02 - Persistencia de la preferencia de ordenamiento

- **ID:** CP-E06-HU36-02
- **HU:** HU36
- **CA:** CA164
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Persistencia de la preferencia de ordenamiento.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Mariana Salazar Ríos; mesa Jardín de Magnolias.
- **Endpoint/componente:** Módulo Invitados auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada de la capacidad existente.
- **Resultado esperado:** Cumplir CA164.
- **Resultado obtenido:** La capacidad no está implementada completamente.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E06-HU37-01 - Generación y envío de invitación digital

- **ID:** CP-E06-HU37-01
- **HU:** HU37
- **CA:** CA165
- **Tipo:** MIXTO
- **Objetivo:** Generación y envío de invitación digital.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Mariana Salazar Ríos; mesa Jardín de Magnolias.
- **Endpoint/componente:** Módulo Invitados auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada de la capacidad existente.
- **Resultado esperado:** Cumplir CA165.
- **Resultado obtenido:** La capacidad no está implementada completamente.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** Parte visual/manual pendiente.

### CP-E06-HU37-02 - Registro de interacción sin alterar automáticamente RSVP

- **ID:** CP-E06-HU37-02
- **HU:** HU37
- **CA:** CA166
- **Tipo:** MIXTO
- **Objetivo:** Registro de interacción sin alterar automáticamente RSVP.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Mariana Salazar Ríos; mesa Jardín de Magnolias.
- **Endpoint/componente:** Módulo Invitados auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada de la capacidad existente.
- **Resultado esperado:** Cumplir CA166.
- **Resultado obtenido:** La capacidad no está implementada completamente.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** Parte visual/manual pendiente.

### CP-E06-HU37-03 - Notificación a Wedding Planner por interacción

- **ID:** CP-E06-HU37-03
- **HU:** HU37
- **CA:** CA167
- **Tipo:** MIXTO
- **Objetivo:** Notificación a Wedding Planner por interacción.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Mariana Salazar Ríos; mesa Jardín de Magnolias.
- **Endpoint/componente:** Módulo Invitados auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada de la capacidad existente.
- **Resultado esperado:** Cumplir CA167.
- **Resultado obtenido:** La capacidad no está implementada completamente.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** Parte visual/manual pendiente.

## Resultados por HU

HU30: 3/4 PASS; HU31: 2/3 PASS; HU32: 1/3 PASS; HU33: 0/3 PASS; HU34: 0/3 PASS; HU35: 1/3 PASS; HU36: 1/2 PASS; HU37: 0/3 PASS.

## Pruebas unitarias

No se agregaron pruebas unitarias artificiales.

## Detalle técnico

- CP-E06-HU30-02: Funcionalidad no implementada: validacion.
- CP-E06-HU31-03: Funcionalidad no implementada: permisos-colaborador.
- CP-E06-HU32-02: Funcionalidad no implementada: filtros-requerimientos.
- CP-E06-HU32-03: Funcionalidad no implementada: exportacion-alimentaria.
- CP-E06-HU33-01: Funcionalidad no implementada: mesas.
- CP-E06-HU33-02: Funcionalidad no implementada: reubicacion-mesa.
- CP-E06-HU33-03: Funcionalidad no implementada: grafico-mesas.
- CP-E06-HU34-01: Funcionalidad no implementada: estadisticas.
- CP-E06-HU34-02: Funcionalidad no implementada: estadisticas.
- CP-E06-HU34-03: Funcionalidad no implementada: estadisticas.
- CP-E06-HU35-02: Funcionalidad no implementada: seguimiento-rsvp.
- CP-E06-HU35-03: Funcionalidad no implementada: recordatorios-rsvp.
- CP-E06-HU36-02: Funcionalidad no implementada: preferencia-orden.
- CP-E06-HU37-01: Funcionalidad no implementada: invitacion-digital.
- CP-E06-HU37-02: Funcionalidad no implementada: invitacion-digital.
- CP-E06-HU37-03: Funcionalidad no implementada: invitacion-digital.

## Fallos reales de la aplicación

Faltan colaborador autorizado, estadísticas RSVP, seguimiento/recordatorios, preferencia de orden e invitación digital. La asignación a mesa no valida RSVP confirmado ni incluye reasignación directa.

## Funcionalidades no implementadas

Exportación alimentaria, reportes, invitación digital y notificaciones de invitación.

## Errores encontrados en los tests

Ninguno.

## Tests corregidos y reejecutados

No aplicó.

## Casos manuales pendientes

Representación gráfica de mesas, preferencia visual de orden e invitación digital.


---

### E07-Proveedores — Proveedores

**Datos de prueba registrados:** proveedores: Eventos Magnolia; Coro Lumen; Fotografía Andina; contacto: Camila Rojas; ubicacion: Miraflores, Lima; servicio: Decoración floral; precioReferencia: S/ 2,800.00

**Ejecución registrada:** epic: E07; total: 27; jest: 27; pass: 6; fail: 21; suites: test/E07-Proveedores; excluidos: test/backup/legacy; test/E01-Acceso; test/E02-Usuarios; test/E03-Proyecto; test/E04-Cronograma; test/E05-Presupuesto; test/E06-Invitados; test/E08-Riesgos; test/E09-Administracion

# Resultado final E07-Proveedores

| Métrica | Resultado |
|---|---:|
| Casos conceptuales | 27 |
| Ejecuciones Jest | 27 |
| PASS conceptual | 6 |
| FAIL conceptual | 21 |

## Tabla principal

| Caso | Nombre | CA | Tipo | Estado | Resultado obtenido | Interpretación |
|---|---|---|---|---|---|---|
| CP-E07-HU38-01 | Búsqueda y filtrado de proveedores | CA182, CA183 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: filtros-precio-ubicacion. | Funcionalidad no implementada o incompleta. |
| CP-E07-HU38-02 | Consulta resumida y perfil del proveedor | CA184, CA185 | AUTOMATIZADO | PASS | La capacidad existe en el módulo Proveedores. | Criterio técnico cubierto. |
| CP-E07-HU38-03 | Consulta de proveedores contratados del matrimonio | CA186 | AUTOMATIZADO | PASS | La capacidad existe en el módulo Proveedores. | Criterio técnico cubierto. |
| CP-E07-HU39-01 | Gestión del límite de favoritos por categoría | CA187, CA188 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: limite-favoritos. | Funcionalidad no implementada o incompleta. |
| CP-E07-HU39-02 | Retiro y reemplazo de favoritos | CA189, CA191 | AUTOMATIZADO | PASS | La capacidad existe en el módulo Proveedores. | Criterio técnico cubierto. |
| CP-E07-HU39-03 | Comparación de proveedores favoritos | CA190 | MIXTO | FAIL | Funcionalidad no implementada: comparacion. | Funcionalidad no implementada o incompleta. |
| CP-E07-HU40-01 | Checklist operativo por proveedor | CA192, CA193 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: checklist-proveedor. | Funcionalidad no implementada o incompleta. |
| CP-E07-HU40-02 | Registro de incidencia del proveedor | CA194, CA195 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: checklist-proveedor. | Funcionalidad no implementada o incompleta. |
| CP-E07-HU40-03 | Actualización compartida del seguimiento | CA196 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: checklist-proveedor. | Funcionalidad no implementada o incompleta. |
| CP-E07-HU41-01 | Consulta de disponibilidad del proveedor | CA197, CA198 | AUTOMATIZADO | PASS | La capacidad existe en el módulo Proveedores. | Criterio técnico cubierto. |
| CP-E07-HU41-02 | Solicitud de reserva | CA199 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: reserva. | Funcionalidad no implementada o incompleta. |
| CP-E07-HU41-03 | Actualización de disponibilidad y acceso externo | CA200, CA201 | MIXTO | FAIL | Funcionalidad no implementada: acceso-externo. | Funcionalidad no implementada o incompleta. |
| CP-E07-HU42-01 | Registro de calificación y reseña | CA202, CA203 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: evaluaciones. | Funcionalidad no implementada o incompleta. |
| CP-E07-HU42-02 | Modificación de evaluación vigente | CA204 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: evaluaciones. | Funcionalidad no implementada o incompleta. |
| CP-E07-HU42-03 | Promedio de calificaciones | CA205, CA206 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: evaluaciones. | Funcionalidad no implementada o incompleta. |
| CP-E07-HU43-01 | Plan de pagos y agenda cronológica | CA207, CA208 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: pagos-proveedor. | Funcionalidad no implementada o incompleta. |
| CP-E07-HU43-02 | Recordatorios de cuotas | CA209 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: pagos-proveedor. | Funcionalidad no implementada o incompleta. |
| CP-E07-HU43-03 | Pago de cuota y vencimiento | CA210, CA211 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: pagos-proveedor. | Funcionalidad no implementada o incompleta. |
| CP-E07-HU44-01 | Registro y actualización manual de proveedor | CA212, CA213 | AUTOMATIZADO | PASS | La capacidad existe en el módulo Proveedores. | Criterio técnico cubierto. |
| CP-E07-HU44-02 | Enlace externo para completar información | CA214, CA215 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: enlace-externo. | Funcionalidad no implementada o incompleta. |
| CP-E07-HU44-03 | Documentos y retiro conservando historial | CA216 | MIXTO | FAIL | Funcionalidad no implementada: documentos. | Funcionalidad no implementada o incompleta. |
| CP-E07-HU45-01 | Asignación y modificación de prioridad | CA217, CA218 | AUTOMATIZADO | PASS | La capacidad existe en el módulo Proveedores. | Criterio técnico cubierto. |
| CP-E07-HU45-02 | Ordenamiento y sugerencias por prioridad | CA219, CA220 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: recomendaciones. | Funcionalidad no implementada o incompleta. |
| CP-E07-HU45-03 | Actualización de recomendaciones al contratar | CA221 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: recomendaciones. | Funcionalidad no implementada o incompleta. |
| CP-E07-HU46-01 | Registro de interacción y cálculo del tiempo de respuesta | CA222, CA223 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: tiempo-respuesta. | Funcionalidad no implementada o incompleta. |
| CP-E07-HU46-02 | Historial y promedio de respuesta | CA224, CA225 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: tiempo-respuesta. | Funcionalidad no implementada o incompleta. |
| CP-E07-HU46-03 | Consulta y comparación por tiempo de respuesta | CA226 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: tiempo-respuesta. | Funcionalidad no implementada o incompleta. |

## Detalle por caso

### CP-E07-HU38-01 - Búsqueda y filtrado de proveedores

- **ID:** CP-E07-HU38-01
- **HU:** HU38
- **CA:** CA182, CA183
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Búsqueda y filtrado de proveedores.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Eventos Magnolia, Coro Lumen, Fotografía Andina; Camila Rojas; Miraflores, Lima.
- **Endpoint/componente:** Módulo Proveedores auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada contra endpoints, DTOs y servicio existentes.
- **Resultado esperado:** Cumplir CA182, CA183.
- **Resultado obtenido:** Funcionalidad no implementada: filtros-precio-ubicacion.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E07-HU38-02 - Consulta resumida y perfil del proveedor

- **ID:** CP-E07-HU38-02
- **HU:** HU38
- **CA:** CA184, CA185
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Consulta resumida y perfil del proveedor.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Eventos Magnolia, Coro Lumen, Fotografía Andina; Camila Rojas; Miraflores, Lima.
- **Endpoint/componente:** Módulo Proveedores auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada contra endpoints, DTOs y servicio existentes.
- **Resultado esperado:** Cumplir CA184, CA185.
- **Resultado obtenido:** La capacidad existe en el módulo Proveedores.
- **Interpretación:** Criterio técnico cubierto.
- **Estado:** PASS
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E07-HU38-03 - Consulta de proveedores contratados del matrimonio

- **ID:** CP-E07-HU38-03
- **HU:** HU38
- **CA:** CA186
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Consulta de proveedores contratados del matrimonio.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Eventos Magnolia, Coro Lumen, Fotografía Andina; Camila Rojas; Miraflores, Lima.
- **Endpoint/componente:** Módulo Proveedores auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada contra endpoints, DTOs y servicio existentes.
- **Resultado esperado:** Cumplir CA186.
- **Resultado obtenido:** La capacidad existe en el módulo Proveedores.
- **Interpretación:** Criterio técnico cubierto.
- **Estado:** PASS
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E07-HU39-01 - Gestión del límite de favoritos por categoría

- **ID:** CP-E07-HU39-01
- **HU:** HU39
- **CA:** CA187, CA188
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Gestión del límite de favoritos por categoría.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Eventos Magnolia, Coro Lumen, Fotografía Andina; Camila Rojas; Miraflores, Lima.
- **Endpoint/componente:** Módulo Proveedores auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada contra endpoints, DTOs y servicio existentes.
- **Resultado esperado:** Cumplir CA187, CA188.
- **Resultado obtenido:** Funcionalidad no implementada: limite-favoritos.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E07-HU39-02 - Retiro y reemplazo de favoritos

- **ID:** CP-E07-HU39-02
- **HU:** HU39
- **CA:** CA189, CA191
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Retiro y reemplazo de favoritos.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Eventos Magnolia, Coro Lumen, Fotografía Andina; Camila Rojas; Miraflores, Lima.
- **Endpoint/componente:** Módulo Proveedores auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada contra endpoints, DTOs y servicio existentes.
- **Resultado esperado:** Cumplir CA189, CA191.
- **Resultado obtenido:** La capacidad existe en el módulo Proveedores.
- **Interpretación:** Criterio técnico cubierto.
- **Estado:** PASS
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E07-HU39-03 - Comparación de proveedores favoritos

- **ID:** CP-E07-HU39-03
- **HU:** HU39
- **CA:** CA190
- **Tipo:** MIXTO
- **Objetivo:** Comparación de proveedores favoritos.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Eventos Magnolia, Coro Lumen, Fotografía Andina; Camila Rojas; Miraflores, Lima.
- **Endpoint/componente:** Módulo Proveedores auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada contra endpoints, DTOs y servicio existentes.
- **Resultado esperado:** Cumplir CA190.
- **Resultado obtenido:** Funcionalidad no implementada: comparacion.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** Parte visual/manual pendiente.

### CP-E07-HU40-01 - Checklist operativo por proveedor

- **ID:** CP-E07-HU40-01
- **HU:** HU40
- **CA:** CA192, CA193
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Checklist operativo por proveedor.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Eventos Magnolia, Coro Lumen, Fotografía Andina; Camila Rojas; Miraflores, Lima.
- **Endpoint/componente:** Módulo Proveedores auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada contra endpoints, DTOs y servicio existentes.
- **Resultado esperado:** Cumplir CA192, CA193.
- **Resultado obtenido:** Funcionalidad no implementada: checklist-proveedor.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E07-HU40-02 - Registro de incidencia del proveedor

- **ID:** CP-E07-HU40-02
- **HU:** HU40
- **CA:** CA194, CA195
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Registro de incidencia del proveedor.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Eventos Magnolia, Coro Lumen, Fotografía Andina; Camila Rojas; Miraflores, Lima.
- **Endpoint/componente:** Módulo Proveedores auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada contra endpoints, DTOs y servicio existentes.
- **Resultado esperado:** Cumplir CA194, CA195.
- **Resultado obtenido:** Funcionalidad no implementada: checklist-proveedor.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E07-HU40-03 - Actualización compartida del seguimiento

- **ID:** CP-E07-HU40-03
- **HU:** HU40
- **CA:** CA196
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Actualización compartida del seguimiento.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Eventos Magnolia, Coro Lumen, Fotografía Andina; Camila Rojas; Miraflores, Lima.
- **Endpoint/componente:** Módulo Proveedores auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada contra endpoints, DTOs y servicio existentes.
- **Resultado esperado:** Cumplir CA196.
- **Resultado obtenido:** Funcionalidad no implementada: checklist-proveedor.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E07-HU41-01 - Consulta de disponibilidad del proveedor

- **ID:** CP-E07-HU41-01
- **HU:** HU41
- **CA:** CA197, CA198
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Consulta de disponibilidad del proveedor.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Eventos Magnolia, Coro Lumen, Fotografía Andina; Camila Rojas; Miraflores, Lima.
- **Endpoint/componente:** Módulo Proveedores auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada contra endpoints, DTOs y servicio existentes.
- **Resultado esperado:** Cumplir CA197, CA198.
- **Resultado obtenido:** La capacidad existe en el módulo Proveedores.
- **Interpretación:** Criterio técnico cubierto.
- **Estado:** PASS
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E07-HU41-02 - Solicitud de reserva

- **ID:** CP-E07-HU41-02
- **HU:** HU41
- **CA:** CA199
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Solicitud de reserva.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Eventos Magnolia, Coro Lumen, Fotografía Andina; Camila Rojas; Miraflores, Lima.
- **Endpoint/componente:** Módulo Proveedores auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada contra endpoints, DTOs y servicio existentes.
- **Resultado esperado:** Cumplir CA199.
- **Resultado obtenido:** Funcionalidad no implementada: reserva.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E07-HU41-03 - Actualización de disponibilidad y acceso externo

- **ID:** CP-E07-HU41-03
- **HU:** HU41
- **CA:** CA200, CA201
- **Tipo:** MIXTO
- **Objetivo:** Actualización de disponibilidad y acceso externo.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Eventos Magnolia, Coro Lumen, Fotografía Andina; Camila Rojas; Miraflores, Lima.
- **Endpoint/componente:** Módulo Proveedores auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada contra endpoints, DTOs y servicio existentes.
- **Resultado esperado:** Cumplir CA200, CA201.
- **Resultado obtenido:** Funcionalidad no implementada: acceso-externo.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** Parte visual/manual pendiente.

### CP-E07-HU42-01 - Registro de calificación y reseña

- **ID:** CP-E07-HU42-01
- **HU:** HU42
- **CA:** CA202, CA203
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Registro de calificación y reseña.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Eventos Magnolia, Coro Lumen, Fotografía Andina; Camila Rojas; Miraflores, Lima.
- **Endpoint/componente:** Módulo Proveedores auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada contra endpoints, DTOs y servicio existentes.
- **Resultado esperado:** Cumplir CA202, CA203.
- **Resultado obtenido:** Funcionalidad no implementada: evaluaciones.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E07-HU42-02 - Modificación de evaluación vigente

- **ID:** CP-E07-HU42-02
- **HU:** HU42
- **CA:** CA204
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Modificación de evaluación vigente.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Eventos Magnolia, Coro Lumen, Fotografía Andina; Camila Rojas; Miraflores, Lima.
- **Endpoint/componente:** Módulo Proveedores auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada contra endpoints, DTOs y servicio existentes.
- **Resultado esperado:** Cumplir CA204.
- **Resultado obtenido:** Funcionalidad no implementada: evaluaciones.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E07-HU42-03 - Promedio de calificaciones

- **ID:** CP-E07-HU42-03
- **HU:** HU42
- **CA:** CA205, CA206
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Promedio de calificaciones.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Eventos Magnolia, Coro Lumen, Fotografía Andina; Camila Rojas; Miraflores, Lima.
- **Endpoint/componente:** Módulo Proveedores auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada contra endpoints, DTOs y servicio existentes.
- **Resultado esperado:** Cumplir CA205, CA206.
- **Resultado obtenido:** Funcionalidad no implementada: evaluaciones.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E07-HU43-01 - Plan de pagos y agenda cronológica

- **ID:** CP-E07-HU43-01
- **HU:** HU43
- **CA:** CA207, CA208
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Plan de pagos y agenda cronológica.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Eventos Magnolia, Coro Lumen, Fotografía Andina; Camila Rojas; Miraflores, Lima.
- **Endpoint/componente:** Módulo Proveedores auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada contra endpoints, DTOs y servicio existentes.
- **Resultado esperado:** Cumplir CA207, CA208.
- **Resultado obtenido:** Funcionalidad no implementada: pagos-proveedor.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E07-HU43-02 - Recordatorios de cuotas

- **ID:** CP-E07-HU43-02
- **HU:** HU43
- **CA:** CA209
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Recordatorios de cuotas.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Eventos Magnolia, Coro Lumen, Fotografía Andina; Camila Rojas; Miraflores, Lima.
- **Endpoint/componente:** Módulo Proveedores auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada contra endpoints, DTOs y servicio existentes.
- **Resultado esperado:** Cumplir CA209.
- **Resultado obtenido:** Funcionalidad no implementada: pagos-proveedor.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E07-HU43-03 - Pago de cuota y vencimiento

- **ID:** CP-E07-HU43-03
- **HU:** HU43
- **CA:** CA210, CA211
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Pago de cuota y vencimiento.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Eventos Magnolia, Coro Lumen, Fotografía Andina; Camila Rojas; Miraflores, Lima.
- **Endpoint/componente:** Módulo Proveedores auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada contra endpoints, DTOs y servicio existentes.
- **Resultado esperado:** Cumplir CA210, CA211.
- **Resultado obtenido:** Funcionalidad no implementada: pagos-proveedor.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E07-HU44-01 - Registro y actualización manual de proveedor

- **ID:** CP-E07-HU44-01
- **HU:** HU44
- **CA:** CA212, CA213
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Registro y actualización manual de proveedor.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Eventos Magnolia, Coro Lumen, Fotografía Andina; Camila Rojas; Miraflores, Lima.
- **Endpoint/componente:** Módulo Proveedores auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada contra endpoints, DTOs y servicio existentes.
- **Resultado esperado:** Cumplir CA212, CA213.
- **Resultado obtenido:** La capacidad existe en el módulo Proveedores.
- **Interpretación:** Criterio técnico cubierto.
- **Estado:** PASS
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E07-HU44-02 - Enlace externo para completar información

- **ID:** CP-E07-HU44-02
- **HU:** HU44
- **CA:** CA214, CA215
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Enlace externo para completar información.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Eventos Magnolia, Coro Lumen, Fotografía Andina; Camila Rojas; Miraflores, Lima.
- **Endpoint/componente:** Módulo Proveedores auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada contra endpoints, DTOs y servicio existentes.
- **Resultado esperado:** Cumplir CA214, CA215.
- **Resultado obtenido:** Funcionalidad no implementada: enlace-externo.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E07-HU44-03 - Documentos y retiro conservando historial

- **ID:** CP-E07-HU44-03
- **HU:** HU44
- **CA:** CA216
- **Tipo:** MIXTO
- **Objetivo:** Documentos y retiro conservando historial.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Eventos Magnolia, Coro Lumen, Fotografía Andina; Camila Rojas; Miraflores, Lima.
- **Endpoint/componente:** Módulo Proveedores auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada contra endpoints, DTOs y servicio existentes.
- **Resultado esperado:** Cumplir CA216.
- **Resultado obtenido:** Funcionalidad no implementada: documentos.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** Parte visual/manual pendiente.

### CP-E07-HU45-01 - Asignación y modificación de prioridad

- **ID:** CP-E07-HU45-01
- **HU:** HU45
- **CA:** CA217, CA218
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Asignación y modificación de prioridad.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Eventos Magnolia, Coro Lumen, Fotografía Andina; Camila Rojas; Miraflores, Lima.
- **Endpoint/componente:** Módulo Proveedores auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada contra endpoints, DTOs y servicio existentes.
- **Resultado esperado:** Cumplir CA217, CA218.
- **Resultado obtenido:** La capacidad existe en el módulo Proveedores.
- **Interpretación:** Criterio técnico cubierto.
- **Estado:** PASS
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E07-HU45-02 - Ordenamiento y sugerencias por prioridad

- **ID:** CP-E07-HU45-02
- **HU:** HU45
- **CA:** CA219, CA220
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Ordenamiento y sugerencias por prioridad.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Eventos Magnolia, Coro Lumen, Fotografía Andina; Camila Rojas; Miraflores, Lima.
- **Endpoint/componente:** Módulo Proveedores auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada contra endpoints, DTOs y servicio existentes.
- **Resultado esperado:** Cumplir CA219, CA220.
- **Resultado obtenido:** Funcionalidad no implementada: recomendaciones.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E07-HU45-03 - Actualización de recomendaciones al contratar

- **ID:** CP-E07-HU45-03
- **HU:** HU45
- **CA:** CA221
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Actualización de recomendaciones al contratar.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Eventos Magnolia, Coro Lumen, Fotografía Andina; Camila Rojas; Miraflores, Lima.
- **Endpoint/componente:** Módulo Proveedores auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada contra endpoints, DTOs y servicio existentes.
- **Resultado esperado:** Cumplir CA221.
- **Resultado obtenido:** Funcionalidad no implementada: recomendaciones.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E07-HU46-01 - Registro de interacción y cálculo del tiempo de respuesta

- **ID:** CP-E07-HU46-01
- **HU:** HU46
- **CA:** CA222, CA223
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Registro de interacción y cálculo del tiempo de respuesta.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Eventos Magnolia, Coro Lumen, Fotografía Andina; Camila Rojas; Miraflores, Lima.
- **Endpoint/componente:** Módulo Proveedores auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada contra endpoints, DTOs y servicio existentes.
- **Resultado esperado:** Cumplir CA222, CA223.
- **Resultado obtenido:** Funcionalidad no implementada: tiempo-respuesta.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E07-HU46-02 - Historial y promedio de respuesta

- **ID:** CP-E07-HU46-02
- **HU:** HU46
- **CA:** CA224, CA225
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Historial y promedio de respuesta.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Eventos Magnolia, Coro Lumen, Fotografía Andina; Camila Rojas; Miraflores, Lima.
- **Endpoint/componente:** Módulo Proveedores auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada contra endpoints, DTOs y servicio existentes.
- **Resultado esperado:** Cumplir CA224, CA225.
- **Resultado obtenido:** Funcionalidad no implementada: tiempo-respuesta.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E07-HU46-03 - Consulta y comparación por tiempo de respuesta

- **ID:** CP-E07-HU46-03
- **HU:** HU46
- **CA:** CA226
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Consulta y comparación por tiempo de respuesta.
- **Precondiciones:** Entorno de pruebas.
- **Datos utilizados:** Eventos Magnolia, Coro Lumen, Fotografía Andina; Camila Rojas; Miraflores, Lima.
- **Endpoint/componente:** Módulo Proveedores auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada contra endpoints, DTOs y servicio existentes.
- **Resultado esperado:** Cumplir CA226.
- **Resultado obtenido:** Funcionalidad no implementada: tiempo-respuesta.
- **Interpretación:** Funcionalidad no implementada o incompleta.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

## Resultados por HU

HU38: 2/3 PASS; HU39: 1/3 PASS; HU40: 0/3 PASS; HU41: 1/3 PASS; HU42: 0/3 PASS; HU43: 0/3 PASS; HU44: 1/3 PASS; HU45: 1/3 PASS; HU46: 0/3 PASS.

## Pruebas unitarias

No se crearon pruebas unitarias artificiales: la lógica aislable solicitada (límite de favoritos, promedio de calificaciones, cuotas y tiempo de respuesta) no existe en el módulo actual.

## Detalle técnico

- CP-E07-HU38-01: Funcionalidad no implementada: filtros-precio-ubicacion.
- CP-E07-HU39-01: Funcionalidad no implementada: limite-favoritos.
- CP-E07-HU39-03: Funcionalidad no implementada: comparacion.
- CP-E07-HU40-01: Funcionalidad no implementada: checklist-proveedor.
- CP-E07-HU40-02: Funcionalidad no implementada: checklist-proveedor.
- CP-E07-HU40-03: Funcionalidad no implementada: checklist-proveedor.
- CP-E07-HU41-02: Funcionalidad no implementada: reserva.
- CP-E07-HU41-03: Funcionalidad no implementada: acceso-externo.
- CP-E07-HU42-01: Funcionalidad no implementada: evaluaciones.
- CP-E07-HU42-02: Funcionalidad no implementada: evaluaciones.
- CP-E07-HU42-03: Funcionalidad no implementada: evaluaciones.
- CP-E07-HU43-01: Funcionalidad no implementada: pagos-proveedor.
- CP-E07-HU43-02: Funcionalidad no implementada: pagos-proveedor.
- CP-E07-HU43-03: Funcionalidad no implementada: pagos-proveedor.
- CP-E07-HU44-02: Funcionalidad no implementada: enlace-externo.
- CP-E07-HU44-03: Funcionalidad no implementada: documentos.
- CP-E07-HU45-02: Funcionalidad no implementada: recomendaciones.
- CP-E07-HU45-03: Funcionalidad no implementada: recomendaciones.
- CP-E07-HU46-01: Funcionalidad no implementada: tiempo-respuesta.
- CP-E07-HU46-02: Funcionalidad no implementada: tiempo-respuesta.
- CP-E07-HU46-03: Funcionalidad no implementada: tiempo-respuesta.

## Fallos reales de la aplicación

No se detectaron errores en capacidades existentes. Las brechas detalladas corresponden a funcionalidades no implementadas, no a aserciones incorrectas.

## Funcionalidades no implementadas

Filtros por rango de precios y ubicación, límite de tres favoritos, comparación, checklist/incidencias, reserva, acceso externo, evaluaciones, pagos, recordatorios, documentos, recomendaciones y tiempos de respuesta.

## Diferencias CA vs implementación actual

El alcance vigente cubre directorio básico, servicios con costo referencial, asociación contextual, favoritos sin límite, disponibilidad booleana, alta/edición/desactivación y prioridad simple. No incluye los flujos avanzados descritos en los CA restantes.

## Errores encontrados en tests

Ninguno. Cada FAIL se conserva como resultado real de una capacidad ausente.

## Tests corregidos y reejecutados

CP-E07-HU38-01 fue ajustado para no otorgar PASS solo por búsqueda/categoría: CA183 exige filtros de precio y ubicación, que no existen. Se reejecutó.

## Casos manuales pendientes

Comparación visual de favoritos, experiencia de acceso externo y revisión visual de documentos; sus componentes backend también están ausentes.


---

### E08-Riesgos — Riesgos

**Datos de prueba registrados:** riesgos: Lluvia intensa durante la ceremonia al aire libre; Retraso del proveedor de sonido; responsable: Camila Rojas; ubicacion: Jardines de Miraflores

**Ejecución registrada:** epic: E08; total: 21; jest: 21; pass: 0; fail: 21; suites: test/E08-Riesgos; excluidos: test/backup/legacy; test/E01-Acceso; test/E02-Usuarios; test/E03-Proyecto; test/E04-Cronograma; test/E05-Presupuesto; test/E06-Invitados; test/E07-Proveedores; test/E09-Administracion

# Resultado final E08-Riesgos

| Métrica | Resultado |
|---|---:|
| Casos conceptuales | 21 |
| Ejecuciones Jest | 21 |
| PASS conceptual | 0 |
| FAIL conceptual | 21 |

## Tabla principal

| Caso | Nombre | CA | Tipo | Estado | Resultado obtenido | Interpretación |
|---|---|---|---|---|---|---|
| CP-E08-HU47-01 | Registro de planes de contingencia con alternativas | CA227, CA228 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: planes de contingencia; RiesgosModule no registra servicios, controladores ni modelos de riesgos. | Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints. |
| CP-E08-HU47-02 | Consulta de planes desde el riesgo | CA229 | MIXTO | FAIL | Funcionalidad no implementada: consulta de planes; RiesgosModule no registra servicios, controladores ni modelos de riesgos. | Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints. |
| CP-E08-HU47-03 | Activación de plan de contingencia | CA230 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: activación de contingencia; RiesgosModule no registra servicios, controladores ni modelos de riesgos. | Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints. |
| CP-E08-HU47-04 | Historial y versionado de planes | CA231 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: historial de planes; RiesgosModule no registra servicios, controladores ni modelos de riesgos. | Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints. |
| CP-E08-HU48-01 | Consulta del catálogo base de riesgos | CA232, CA233 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: catálogo de riesgos; RiesgosModule no registra servicios, controladores ni modelos de riesgos. | Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints. |
| CP-E08-HU48-02 | Búsqueda y filtrado de riesgos | CA234 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: filtros de riesgos; RiesgosModule no registra servicios, controladores ni modelos de riesgos. | Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints. |
| CP-E08-HU48-03 | Consulta de mitigaciones y planes predefinidos | CA235 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: mitigaciones predefinidas; RiesgosModule no registra servicios, controladores ni modelos de riesgos. | Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints. |
| CP-E08-HU48-04 | Incorporación de riesgo desde catálogo | CA236 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: instancia operacional independiente; RiesgosModule no registra servicios, controladores ni modelos de riesgos. | Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints. |
| CP-E08-HU49-01 | Generación de alerta por riesgo crítico o incidencia | CA237, CA238 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: alertas de riesgos; RiesgosModule no registra servicios, controladores ni modelos de riesgos. | Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints. |
| CP-E08-HU49-02 | Acceso desde alerta a riesgo y acciones de respuesta | CA239, CA240 | MIXTO | FAIL | Funcionalidad no implementada: referencias de alerta; RiesgosModule no registra servicios, controladores ni modelos de riesgos. | Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints. |
| CP-E08-HU49-03 | Estado de atención de la alerta | CA241 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: estado de alerta de riesgo; RiesgosModule no registra servicios, controladores ni modelos de riesgos. | Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints. |
| CP-E08-HU50-01 | Registro de gasto extraordinario | CA242 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: gastos de riesgo; RiesgosModule no registra servicios, controladores ni modelos de riesgos. | Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints. |
| CP-E08-HU50-02 | Comprobante asociado a gasto de riesgo | CA243 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: comprobantes de riesgo; RiesgosModule no registra servicios, controladores ni modelos de riesgos. | Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints. |
| CP-E08-HU50-03 | Impacto financiero de los gastos de riesgo | CA244, CA245 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: integración financiera de riesgos; RiesgosModule no registra servicios, controladores ni modelos de riesgos. | Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints. |
| CP-E08-HU50-04 | Inclusión de gastos de riesgo en reportes | CA246 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: reportes financieros de riesgos; RiesgosModule no registra servicios, controladores ni modelos de riesgos. | Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints. |
| CP-E08-HU51-01 | Evaluación y cálculo automático de severidad | CA247, CA248 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: matriz de severidad; RiesgosModule no registra servicios, controladores ni modelos de riesgos. | Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints. |
| CP-E08-HU51-02 | Matriz y consulta por severidad | CA249, CA250 | MIXTO | FAIL | Funcionalidad no implementada: consulta por severidad; RiesgosModule no registra servicios, controladores ni modelos de riesgos. | Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints. |
| CP-E08-HU51-03 | Recálculo de severidad | CA251 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: recálculo de severidad; RiesgosModule no registra servicios, controladores ni modelos de riesgos. | Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints. |
| CP-E08-HU52-01 | Sugerencia automática de medidas de mitigación | CA252, CA253 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: sugerencias de mitigación; RiesgosModule no registra servicios, controladores ni modelos de riesgos. | Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints. |
| CP-E08-HU52-02 | Vinculación y estado de medidas/protocolos | CA254, CA255 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: estados de mitigación; RiesgosModule no registra servicios, controladores ni modelos de riesgos. | Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints. |
| CP-E08-HU52-03 | Recálculo de sugerencias conservando historial | CA256 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: historial de sugerencias; RiesgosModule no registra servicios, controladores ni modelos de riesgos. | Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints. |

## Detalle por caso

### CP-E08-HU47-01 - Registro de planes de contingencia con alternativas

- **ID:** CP-E08-HU47-01
- **HU:** HU47
- **CA:** CA227, CA228
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Registro de planes de contingencia con alternativas.
- **Precondiciones:** Entorno de pruebas; módulo Riesgos disponible.
- **Datos utilizados:** Lluvia intensa durante la ceremonia al aire libre; retraso del proveedor de sonido; Camila Rojas; salón Jardines de Miraflores.
- **Endpoint/componente:** RiesgosModule auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada de las capas reales disponibles.
- **Resultado esperado:** Cumplir CA227, CA228.
- **Resultado obtenido:** Funcionalidad no implementada: planes de contingencia; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E08-HU47-02 - Consulta de planes desde el riesgo

- **ID:** CP-E08-HU47-02
- **HU:** HU47
- **CA:** CA229
- **Tipo:** MIXTO
- **Objetivo:** Consulta de planes desde el riesgo.
- **Precondiciones:** Entorno de pruebas; módulo Riesgos disponible.
- **Datos utilizados:** Lluvia intensa durante la ceremonia al aire libre; retraso del proveedor de sonido; Camila Rojas; salón Jardines de Miraflores.
- **Endpoint/componente:** RiesgosModule auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada de las capas reales disponibles.
- **Resultado esperado:** Cumplir CA229.
- **Resultado obtenido:** Funcionalidad no implementada: consulta de planes; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** La parte visual/manual también queda pendiente.

### CP-E08-HU47-03 - Activación de plan de contingencia

- **ID:** CP-E08-HU47-03
- **HU:** HU47
- **CA:** CA230
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Activación de plan de contingencia.
- **Precondiciones:** Entorno de pruebas; módulo Riesgos disponible.
- **Datos utilizados:** Lluvia intensa durante la ceremonia al aire libre; retraso del proveedor de sonido; Camila Rojas; salón Jardines de Miraflores.
- **Endpoint/componente:** RiesgosModule auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada de las capas reales disponibles.
- **Resultado esperado:** Cumplir CA230.
- **Resultado obtenido:** Funcionalidad no implementada: activación de contingencia; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E08-HU47-04 - Historial y versionado de planes

- **ID:** CP-E08-HU47-04
- **HU:** HU47
- **CA:** CA231
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Historial y versionado de planes.
- **Precondiciones:** Entorno de pruebas; módulo Riesgos disponible.
- **Datos utilizados:** Lluvia intensa durante la ceremonia al aire libre; retraso del proveedor de sonido; Camila Rojas; salón Jardines de Miraflores.
- **Endpoint/componente:** RiesgosModule auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada de las capas reales disponibles.
- **Resultado esperado:** Cumplir CA231.
- **Resultado obtenido:** Funcionalidad no implementada: historial de planes; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E08-HU48-01 - Consulta del catálogo base de riesgos

- **ID:** CP-E08-HU48-01
- **HU:** HU48
- **CA:** CA232, CA233
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Consulta del catálogo base de riesgos.
- **Precondiciones:** Entorno de pruebas; módulo Riesgos disponible.
- **Datos utilizados:** Lluvia intensa durante la ceremonia al aire libre; retraso del proveedor de sonido; Camila Rojas; salón Jardines de Miraflores.
- **Endpoint/componente:** RiesgosModule auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada de las capas reales disponibles.
- **Resultado esperado:** Cumplir CA232, CA233.
- **Resultado obtenido:** Funcionalidad no implementada: catálogo de riesgos; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E08-HU48-02 - Búsqueda y filtrado de riesgos

- **ID:** CP-E08-HU48-02
- **HU:** HU48
- **CA:** CA234
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Búsqueda y filtrado de riesgos.
- **Precondiciones:** Entorno de pruebas; módulo Riesgos disponible.
- **Datos utilizados:** Lluvia intensa durante la ceremonia al aire libre; retraso del proveedor de sonido; Camila Rojas; salón Jardines de Miraflores.
- **Endpoint/componente:** RiesgosModule auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada de las capas reales disponibles.
- **Resultado esperado:** Cumplir CA234.
- **Resultado obtenido:** Funcionalidad no implementada: filtros de riesgos; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E08-HU48-03 - Consulta de mitigaciones y planes predefinidos

- **ID:** CP-E08-HU48-03
- **HU:** HU48
- **CA:** CA235
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Consulta de mitigaciones y planes predefinidos.
- **Precondiciones:** Entorno de pruebas; módulo Riesgos disponible.
- **Datos utilizados:** Lluvia intensa durante la ceremonia al aire libre; retraso del proveedor de sonido; Camila Rojas; salón Jardines de Miraflores.
- **Endpoint/componente:** RiesgosModule auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada de las capas reales disponibles.
- **Resultado esperado:** Cumplir CA235.
- **Resultado obtenido:** Funcionalidad no implementada: mitigaciones predefinidas; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E08-HU48-04 - Incorporación de riesgo desde catálogo

- **ID:** CP-E08-HU48-04
- **HU:** HU48
- **CA:** CA236
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Incorporación de riesgo desde catálogo.
- **Precondiciones:** Entorno de pruebas; módulo Riesgos disponible.
- **Datos utilizados:** Lluvia intensa durante la ceremonia al aire libre; retraso del proveedor de sonido; Camila Rojas; salón Jardines de Miraflores.
- **Endpoint/componente:** RiesgosModule auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada de las capas reales disponibles.
- **Resultado esperado:** Cumplir CA236.
- **Resultado obtenido:** Funcionalidad no implementada: instancia operacional independiente; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E08-HU49-01 - Generación de alerta por riesgo crítico o incidencia

- **ID:** CP-E08-HU49-01
- **HU:** HU49
- **CA:** CA237, CA238
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Generación de alerta por riesgo crítico o incidencia.
- **Precondiciones:** Entorno de pruebas; módulo Riesgos disponible.
- **Datos utilizados:** Lluvia intensa durante la ceremonia al aire libre; retraso del proveedor de sonido; Camila Rojas; salón Jardines de Miraflores.
- **Endpoint/componente:** RiesgosModule auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada de las capas reales disponibles.
- **Resultado esperado:** Cumplir CA237, CA238.
- **Resultado obtenido:** Funcionalidad no implementada: alertas de riesgos; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E08-HU49-02 - Acceso desde alerta a riesgo y acciones de respuesta

- **ID:** CP-E08-HU49-02
- **HU:** HU49
- **CA:** CA239, CA240
- **Tipo:** MIXTO
- **Objetivo:** Acceso desde alerta a riesgo y acciones de respuesta.
- **Precondiciones:** Entorno de pruebas; módulo Riesgos disponible.
- **Datos utilizados:** Lluvia intensa durante la ceremonia al aire libre; retraso del proveedor de sonido; Camila Rojas; salón Jardines de Miraflores.
- **Endpoint/componente:** RiesgosModule auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada de las capas reales disponibles.
- **Resultado esperado:** Cumplir CA239, CA240.
- **Resultado obtenido:** Funcionalidad no implementada: referencias de alerta; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** La parte visual/manual también queda pendiente.

### CP-E08-HU49-03 - Estado de atención de la alerta

- **ID:** CP-E08-HU49-03
- **HU:** HU49
- **CA:** CA241
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Estado de atención de la alerta.
- **Precondiciones:** Entorno de pruebas; módulo Riesgos disponible.
- **Datos utilizados:** Lluvia intensa durante la ceremonia al aire libre; retraso del proveedor de sonido; Camila Rojas; salón Jardines de Miraflores.
- **Endpoint/componente:** RiesgosModule auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada de las capas reales disponibles.
- **Resultado esperado:** Cumplir CA241.
- **Resultado obtenido:** Funcionalidad no implementada: estado de alerta de riesgo; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E08-HU50-01 - Registro de gasto extraordinario

- **ID:** CP-E08-HU50-01
- **HU:** HU50
- **CA:** CA242
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Registro de gasto extraordinario.
- **Precondiciones:** Entorno de pruebas; módulo Riesgos disponible.
- **Datos utilizados:** Lluvia intensa durante la ceremonia al aire libre; retraso del proveedor de sonido; Camila Rojas; salón Jardines de Miraflores.
- **Endpoint/componente:** RiesgosModule auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada de las capas reales disponibles.
- **Resultado esperado:** Cumplir CA242.
- **Resultado obtenido:** Funcionalidad no implementada: gastos de riesgo; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E08-HU50-02 - Comprobante asociado a gasto de riesgo

- **ID:** CP-E08-HU50-02
- **HU:** HU50
- **CA:** CA243
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Comprobante asociado a gasto de riesgo.
- **Precondiciones:** Entorno de pruebas; módulo Riesgos disponible.
- **Datos utilizados:** Lluvia intensa durante la ceremonia al aire libre; retraso del proveedor de sonido; Camila Rojas; salón Jardines de Miraflores.
- **Endpoint/componente:** RiesgosModule auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada de las capas reales disponibles.
- **Resultado esperado:** Cumplir CA243.
- **Resultado obtenido:** Funcionalidad no implementada: comprobantes de riesgo; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E08-HU50-03 - Impacto financiero de los gastos de riesgo

- **ID:** CP-E08-HU50-03
- **HU:** HU50
- **CA:** CA244, CA245
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Impacto financiero de los gastos de riesgo.
- **Precondiciones:** Entorno de pruebas; módulo Riesgos disponible.
- **Datos utilizados:** Lluvia intensa durante la ceremonia al aire libre; retraso del proveedor de sonido; Camila Rojas; salón Jardines de Miraflores.
- **Endpoint/componente:** RiesgosModule auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada de las capas reales disponibles.
- **Resultado esperado:** Cumplir CA244, CA245.
- **Resultado obtenido:** Funcionalidad no implementada: integración financiera de riesgos; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E08-HU50-04 - Inclusión de gastos de riesgo en reportes

- **ID:** CP-E08-HU50-04
- **HU:** HU50
- **CA:** CA246
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Inclusión de gastos de riesgo en reportes.
- **Precondiciones:** Entorno de pruebas; módulo Riesgos disponible.
- **Datos utilizados:** Lluvia intensa durante la ceremonia al aire libre; retraso del proveedor de sonido; Camila Rojas; salón Jardines de Miraflores.
- **Endpoint/componente:** RiesgosModule auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada de las capas reales disponibles.
- **Resultado esperado:** Cumplir CA246.
- **Resultado obtenido:** Funcionalidad no implementada: reportes financieros de riesgos; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E08-HU51-01 - Evaluación y cálculo automático de severidad

- **ID:** CP-E08-HU51-01
- **HU:** HU51
- **CA:** CA247, CA248
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Evaluación y cálculo automático de severidad.
- **Precondiciones:** Entorno de pruebas; módulo Riesgos disponible.
- **Datos utilizados:** Lluvia intensa durante la ceremonia al aire libre; retraso del proveedor de sonido; Camila Rojas; salón Jardines de Miraflores.
- **Endpoint/componente:** RiesgosModule auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada de las capas reales disponibles.
- **Resultado esperado:** Cumplir CA247, CA248.
- **Resultado obtenido:** Funcionalidad no implementada: matriz de severidad; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E08-HU51-02 - Matriz y consulta por severidad

- **ID:** CP-E08-HU51-02
- **HU:** HU51
- **CA:** CA249, CA250
- **Tipo:** MIXTO
- **Objetivo:** Matriz y consulta por severidad.
- **Precondiciones:** Entorno de pruebas; módulo Riesgos disponible.
- **Datos utilizados:** Lluvia intensa durante la ceremonia al aire libre; retraso del proveedor de sonido; Camila Rojas; salón Jardines de Miraflores.
- **Endpoint/componente:** RiesgosModule auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada de las capas reales disponibles.
- **Resultado esperado:** Cumplir CA249, CA250.
- **Resultado obtenido:** Funcionalidad no implementada: consulta por severidad; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** La parte visual/manual también queda pendiente.

### CP-E08-HU51-03 - Recálculo de severidad

- **ID:** CP-E08-HU51-03
- **HU:** HU51
- **CA:** CA251
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Recálculo de severidad.
- **Precondiciones:** Entorno de pruebas; módulo Riesgos disponible.
- **Datos utilizados:** Lluvia intensa durante la ceremonia al aire libre; retraso del proveedor de sonido; Camila Rojas; salón Jardines de Miraflores.
- **Endpoint/componente:** RiesgosModule auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada de las capas reales disponibles.
- **Resultado esperado:** Cumplir CA251.
- **Resultado obtenido:** Funcionalidad no implementada: recálculo de severidad; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E08-HU52-01 - Sugerencia automática de medidas de mitigación

- **ID:** CP-E08-HU52-01
- **HU:** HU52
- **CA:** CA252, CA253
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Sugerencia automática de medidas de mitigación.
- **Precondiciones:** Entorno de pruebas; módulo Riesgos disponible.
- **Datos utilizados:** Lluvia intensa durante la ceremonia al aire libre; retraso del proveedor de sonido; Camila Rojas; salón Jardines de Miraflores.
- **Endpoint/componente:** RiesgosModule auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada de las capas reales disponibles.
- **Resultado esperado:** Cumplir CA252, CA253.
- **Resultado obtenido:** Funcionalidad no implementada: sugerencias de mitigación; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E08-HU52-02 - Vinculación y estado de medidas/protocolos

- **ID:** CP-E08-HU52-02
- **HU:** HU52
- **CA:** CA254, CA255
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Vinculación y estado de medidas/protocolos.
- **Precondiciones:** Entorno de pruebas; módulo Riesgos disponible.
- **Datos utilizados:** Lluvia intensa durante la ceremonia al aire libre; retraso del proveedor de sonido; Camila Rojas; salón Jardines de Miraflores.
- **Endpoint/componente:** RiesgosModule auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada de las capas reales disponibles.
- **Resultado esperado:** Cumplir CA254, CA255.
- **Resultado obtenido:** Funcionalidad no implementada: estados de mitigación; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E08-HU52-03 - Recálculo de sugerencias conservando historial

- **ID:** CP-E08-HU52-03
- **HU:** HU52
- **CA:** CA256
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Recálculo de sugerencias conservando historial.
- **Precondiciones:** Entorno de pruebas; módulo Riesgos disponible.
- **Datos utilizados:** Lluvia intensa durante la ceremonia al aire libre; retraso del proveedor de sonido; Camila Rojas; salón Jardines de Miraflores.
- **Endpoint/componente:** RiesgosModule auditado.
- **Pasos ejecutados:** Auditoría y prueba automatizada de las capas reales disponibles.
- **Resultado esperado:** Cumplir CA256.
- **Resultado obtenido:** Funcionalidad no implementada: historial de sugerencias; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar modelos, tablas o endpoints.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

## Resultados por HU

HU47: 0/4 PASS; HU48: 0/4 PASS; HU49: 0/3 PASS; HU50: 0/4 PASS; HU51: 0/3 PASS; HU52: 0/3 PASS.

## Pruebas unitarias

No se crearon pruebas unitarias: no existe lógica de severidad, matriz ni mitigaciones en el código real.

## Detalle técnico

- CP-E08-HU47-01: Funcionalidad no implementada: planes de contingencia; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- CP-E08-HU47-02: Funcionalidad no implementada: consulta de planes; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- CP-E08-HU47-03: Funcionalidad no implementada: activación de contingencia; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- CP-E08-HU47-04: Funcionalidad no implementada: historial de planes; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- CP-E08-HU48-01: Funcionalidad no implementada: catálogo de riesgos; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- CP-E08-HU48-02: Funcionalidad no implementada: filtros de riesgos; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- CP-E08-HU48-03: Funcionalidad no implementada: mitigaciones predefinidas; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- CP-E08-HU48-04: Funcionalidad no implementada: instancia operacional independiente; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- CP-E08-HU49-01: Funcionalidad no implementada: alertas de riesgos; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- CP-E08-HU49-02: Funcionalidad no implementada: referencias de alerta; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- CP-E08-HU49-03: Funcionalidad no implementada: estado de alerta de riesgo; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- CP-E08-HU50-01: Funcionalidad no implementada: gastos de riesgo; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- CP-E08-HU50-02: Funcionalidad no implementada: comprobantes de riesgo; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- CP-E08-HU50-03: Funcionalidad no implementada: integración financiera de riesgos; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- CP-E08-HU50-04: Funcionalidad no implementada: reportes financieros de riesgos; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- CP-E08-HU51-01: Funcionalidad no implementada: matriz de severidad; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- CP-E08-HU51-02: Funcionalidad no implementada: consulta por severidad; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- CP-E08-HU51-03: Funcionalidad no implementada: recálculo de severidad; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- CP-E08-HU52-01: Funcionalidad no implementada: sugerencias de mitigación; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- CP-E08-HU52-02: Funcionalidad no implementada: estados de mitigación; RiesgosModule no registra servicios, controladores ni modelos de riesgos.
- CP-E08-HU52-03: Funcionalidad no implementada: historial de sugerencias; RiesgosModule no registra servicios, controladores ni modelos de riesgos.

## Fallos reales de la aplicación

No aplica: el módulo Riesgos está vacío; las brechas son funcionalidades no implementadas, no fallos de una implementación existente.

## Funcionalidades no implementadas

Catálogo, instancias operativas, planes, historial, incidencias, alertas de riesgos, gastos, comprobantes, severidad, matriz, mitigaciones y protocolos.

## Diferencias CA vs implementación actual

Existe únicamente un RiesgosModule vacío. Las notificaciones vigentes se limitan a cronograma y no se integran con riesgos.

## Errores encontrados en los tests

Ninguno. Los 21 FAIL documentan la ausencia real del módulo funcional.

## Tests corregidos y reejecutados

No aplicó.

## Casos manuales pendientes

Consulta visual de planes, navegación desde alertas y matriz visual de severidad; sus soportes backend tampoco existen.


---

### E09-Administracion — Administración

**Datos de prueba registrados:** weddingPlanners: Lucía Fernández Rojas; Daniel Paredes Silva; reporte: Consulta sobre recuperación de acceso; catalogo: Metodología de planificación por fases

**Ejecución registrada:** epic: E09; total: 18; jest: 18; pass: 0; fail: 18; suites: test/E09-Administracion; excluidos: test/backup/legacy; test/E01-Acceso; test/E02-Usuarios; test/E03-Proyecto; test/E04-Cronograma; test/E05-Presupuesto; test/E06-Invitados; test/E07-Proveedores; test/E08-Riesgos

# Resultado final E09-Administración

| Métrica | Resultado |
|---|---:|
| Casos conceptuales | 18 |
| Ejecuciones Jest | 18 |
| PASS conceptual | 0 |
| FAIL conceptual | 18 |

## Tabla principal

| Caso | Nombre | CA | Tipo | Estado | Resultado obtenido | Interpretación |
|---|---|---|---|---|---|---|
| CP-E09-HU53-01 | Consulta, búsqueda y filtrado de Wedding Planners | CA257, CA259 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: gestión administrativa de Wedding Planners; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo. | Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos. |
| CP-E09-HU53-02 | Creación y actualización administrativa de Wedding Planner | CA258 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: alta administrativa de Wedding Planner; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo. | Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos. |
| CP-E09-HU53-03 | Métricas de uso de Wedding Planner | CA260 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: métricas administrativas; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo. | Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos. |
| CP-E09-HU53-04 | Eliminación condicionada por historial | CA261 | MIXTO | FAIL | Funcionalidad no implementada: eliminación condicionada; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo. | Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos. |
| CP-E09-HU54-01 | Registro y cálculo de inactividad | CA262 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: política de inactividad; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo. | Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos. |
| CP-E09-HU54-02 | Alerta previa por inactividad | CA263 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: alerta previa de inactividad; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo. | Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos. |
| CP-E09-HU54-03 | Desactivación automática por inactividad | CA264 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: scheduler de inactividad; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo. | Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos. |
| CP-E09-HU54-04 | Desactivación manual conservando historial | CA265, CA266 | MIXTO | FAIL | Funcionalidad no implementada: suspensión administrativa auditada; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo. | Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos. |
| CP-E09-HU55-01 | Consulta de cuentas desactivadas | CA267 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: listado administrativo de suspendidas; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo. | Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos. |
| CP-E09-HU55-02 | Reactivación y recuperación de acceso | CA268, CA269 | MIXTO | FAIL | Funcionalidad no implementada: reactivación administrativa; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo. | Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos. |
| CP-E09-HU55-03 | Conservación y auditoría de reactivación | CA270 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: auditoría de reactivación; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo. | Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos. |
| CP-E09-HU56-01 | Registro y actualización de elemento del catálogo | CA271, CA272 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: catálogo global administrativo; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo. | Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos. |
| CP-E09-HU56-02 | Desactivación sin afectar proyectos existentes | CA273 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: desactivación de catálogo; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo. | Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos. |
| CP-E09-HU56-03 | Versionado del catálogo global | CA274 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: versionado de catálogo; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo. | Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos. |
| CP-E09-HU57-01 | Registro de reporte de soporte | CA275 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: reportes de soporte; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo. | Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos. |
| CP-E09-HU57-02 | Consulta y filtrado de reportes | CA276 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: bandeja de soporte; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo. | Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos. |
| CP-E09-HU57-03 | Actualización del estado de soporte | CA277 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: estados de soporte; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo. | Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos. |
| CP-E09-HU57-04 | Respuesta, notificación e historial de soporte | CA278, CA279 | AUTOMATIZADO | FAIL | Funcionalidad no implementada: respuesta e historial de soporte; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo. | Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos. |

## Detalle por caso

### CP-E09-HU53-01 - Consulta, búsqueda y filtrado de Wedding Planners

- **ID:** CP-E09-HU53-01
- **HU:** HU53
- **CA:** CA257, CA259
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Consulta, búsqueda y filtrado de Wedding Planners.
- **Precondiciones:** Entorno de pruebas; Administración disponible.
- **Datos utilizados:** Lucía Fernández Rojas; Daniel Paredes Silva; consulta sobre recuperación de acceso; metodología de planificación por fases.
- **Endpoint/componente:** AdministracionModule y gestión genérica de Usuarios auditados.
- **Pasos ejecutados:** Auditoría y prueba automatizada de capas administrativas reales.
- **Resultado esperado:** Cumplir CA257, CA259.
- **Resultado obtenido:** Funcionalidad no implementada: gestión administrativa de Wedding Planners; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E09-HU53-02 - Creación y actualización administrativa de Wedding Planner

- **ID:** CP-E09-HU53-02
- **HU:** HU53
- **CA:** CA258
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Creación y actualización administrativa de Wedding Planner.
- **Precondiciones:** Entorno de pruebas; Administración disponible.
- **Datos utilizados:** Lucía Fernández Rojas; Daniel Paredes Silva; consulta sobre recuperación de acceso; metodología de planificación por fases.
- **Endpoint/componente:** AdministracionModule y gestión genérica de Usuarios auditados.
- **Pasos ejecutados:** Auditoría y prueba automatizada de capas administrativas reales.
- **Resultado esperado:** Cumplir CA258.
- **Resultado obtenido:** Funcionalidad no implementada: alta administrativa de Wedding Planner; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E09-HU53-03 - Métricas de uso de Wedding Planner

- **ID:** CP-E09-HU53-03
- **HU:** HU53
- **CA:** CA260
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Métricas de uso de Wedding Planner.
- **Precondiciones:** Entorno de pruebas; Administración disponible.
- **Datos utilizados:** Lucía Fernández Rojas; Daniel Paredes Silva; consulta sobre recuperación de acceso; metodología de planificación por fases.
- **Endpoint/componente:** AdministracionModule y gestión genérica de Usuarios auditados.
- **Pasos ejecutados:** Auditoría y prueba automatizada de capas administrativas reales.
- **Resultado esperado:** Cumplir CA260.
- **Resultado obtenido:** Funcionalidad no implementada: métricas administrativas; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E09-HU53-04 - Eliminación condicionada por historial

- **ID:** CP-E09-HU53-04
- **HU:** HU53
- **CA:** CA261
- **Tipo:** MIXTO
- **Objetivo:** Eliminación condicionada por historial.
- **Precondiciones:** Entorno de pruebas; Administración disponible.
- **Datos utilizados:** Lucía Fernández Rojas; Daniel Paredes Silva; consulta sobre recuperación de acceso; metodología de planificación por fases.
- **Endpoint/componente:** AdministracionModule y gestión genérica de Usuarios auditados.
- **Pasos ejecutados:** Auditoría y prueba automatizada de capas administrativas reales.
- **Resultado esperado:** Cumplir CA261.
- **Resultado obtenido:** Funcionalidad no implementada: eliminación condicionada; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** Parte visual/manual pendiente.

### CP-E09-HU54-01 - Registro y cálculo de inactividad

- **ID:** CP-E09-HU54-01
- **HU:** HU54
- **CA:** CA262
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Registro y cálculo de inactividad.
- **Precondiciones:** Entorno de pruebas; Administración disponible.
- **Datos utilizados:** Lucía Fernández Rojas; Daniel Paredes Silva; consulta sobre recuperación de acceso; metodología de planificación por fases.
- **Endpoint/componente:** AdministracionModule y gestión genérica de Usuarios auditados.
- **Pasos ejecutados:** Auditoría y prueba automatizada de capas administrativas reales.
- **Resultado esperado:** Cumplir CA262.
- **Resultado obtenido:** Funcionalidad no implementada: política de inactividad; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E09-HU54-02 - Alerta previa por inactividad

- **ID:** CP-E09-HU54-02
- **HU:** HU54
- **CA:** CA263
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Alerta previa por inactividad.
- **Precondiciones:** Entorno de pruebas; Administración disponible.
- **Datos utilizados:** Lucía Fernández Rojas; Daniel Paredes Silva; consulta sobre recuperación de acceso; metodología de planificación por fases.
- **Endpoint/componente:** AdministracionModule y gestión genérica de Usuarios auditados.
- **Pasos ejecutados:** Auditoría y prueba automatizada de capas administrativas reales.
- **Resultado esperado:** Cumplir CA263.
- **Resultado obtenido:** Funcionalidad no implementada: alerta previa de inactividad; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E09-HU54-03 - Desactivación automática por inactividad

- **ID:** CP-E09-HU54-03
- **HU:** HU54
- **CA:** CA264
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Desactivación automática por inactividad.
- **Precondiciones:** Entorno de pruebas; Administración disponible.
- **Datos utilizados:** Lucía Fernández Rojas; Daniel Paredes Silva; consulta sobre recuperación de acceso; metodología de planificación por fases.
- **Endpoint/componente:** AdministracionModule y gestión genérica de Usuarios auditados.
- **Pasos ejecutados:** Auditoría y prueba automatizada de capas administrativas reales.
- **Resultado esperado:** Cumplir CA264.
- **Resultado obtenido:** Funcionalidad no implementada: scheduler de inactividad; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E09-HU54-04 - Desactivación manual conservando historial

- **ID:** CP-E09-HU54-04
- **HU:** HU54
- **CA:** CA265, CA266
- **Tipo:** MIXTO
- **Objetivo:** Desactivación manual conservando historial.
- **Precondiciones:** Entorno de pruebas; Administración disponible.
- **Datos utilizados:** Lucía Fernández Rojas; Daniel Paredes Silva; consulta sobre recuperación de acceso; metodología de planificación por fases.
- **Endpoint/componente:** AdministracionModule y gestión genérica de Usuarios auditados.
- **Pasos ejecutados:** Auditoría y prueba automatizada de capas administrativas reales.
- **Resultado esperado:** Cumplir CA265, CA266.
- **Resultado obtenido:** Funcionalidad no implementada: suspensión administrativa auditada; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** Parte visual/manual pendiente.

### CP-E09-HU55-01 - Consulta de cuentas desactivadas

- **ID:** CP-E09-HU55-01
- **HU:** HU55
- **CA:** CA267
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Consulta de cuentas desactivadas.
- **Precondiciones:** Entorno de pruebas; Administración disponible.
- **Datos utilizados:** Lucía Fernández Rojas; Daniel Paredes Silva; consulta sobre recuperación de acceso; metodología de planificación por fases.
- **Endpoint/componente:** AdministracionModule y gestión genérica de Usuarios auditados.
- **Pasos ejecutados:** Auditoría y prueba automatizada de capas administrativas reales.
- **Resultado esperado:** Cumplir CA267.
- **Resultado obtenido:** Funcionalidad no implementada: listado administrativo de suspendidas; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E09-HU55-02 - Reactivación y recuperación de acceso

- **ID:** CP-E09-HU55-02
- **HU:** HU55
- **CA:** CA268, CA269
- **Tipo:** MIXTO
- **Objetivo:** Reactivación y recuperación de acceso.
- **Precondiciones:** Entorno de pruebas; Administración disponible.
- **Datos utilizados:** Lucía Fernández Rojas; Daniel Paredes Silva; consulta sobre recuperación de acceso; metodología de planificación por fases.
- **Endpoint/componente:** AdministracionModule y gestión genérica de Usuarios auditados.
- **Pasos ejecutados:** Auditoría y prueba automatizada de capas administrativas reales.
- **Resultado esperado:** Cumplir CA268, CA269.
- **Resultado obtenido:** Funcionalidad no implementada: reactivación administrativa; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** Parte visual/manual pendiente.

### CP-E09-HU55-03 - Conservación y auditoría de reactivación

- **ID:** CP-E09-HU55-03
- **HU:** HU55
- **CA:** CA270
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Conservación y auditoría de reactivación.
- **Precondiciones:** Entorno de pruebas; Administración disponible.
- **Datos utilizados:** Lucía Fernández Rojas; Daniel Paredes Silva; consulta sobre recuperación de acceso; metodología de planificación por fases.
- **Endpoint/componente:** AdministracionModule y gestión genérica de Usuarios auditados.
- **Pasos ejecutados:** Auditoría y prueba automatizada de capas administrativas reales.
- **Resultado esperado:** Cumplir CA270.
- **Resultado obtenido:** Funcionalidad no implementada: auditoría de reactivación; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E09-HU56-01 - Registro y actualización de elemento del catálogo

- **ID:** CP-E09-HU56-01
- **HU:** HU56
- **CA:** CA271, CA272
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Registro y actualización de elemento del catálogo.
- **Precondiciones:** Entorno de pruebas; Administración disponible.
- **Datos utilizados:** Lucía Fernández Rojas; Daniel Paredes Silva; consulta sobre recuperación de acceso; metodología de planificación por fases.
- **Endpoint/componente:** AdministracionModule y gestión genérica de Usuarios auditados.
- **Pasos ejecutados:** Auditoría y prueba automatizada de capas administrativas reales.
- **Resultado esperado:** Cumplir CA271, CA272.
- **Resultado obtenido:** Funcionalidad no implementada: catálogo global administrativo; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E09-HU56-02 - Desactivación sin afectar proyectos existentes

- **ID:** CP-E09-HU56-02
- **HU:** HU56
- **CA:** CA273
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Desactivación sin afectar proyectos existentes.
- **Precondiciones:** Entorno de pruebas; Administración disponible.
- **Datos utilizados:** Lucía Fernández Rojas; Daniel Paredes Silva; consulta sobre recuperación de acceso; metodología de planificación por fases.
- **Endpoint/componente:** AdministracionModule y gestión genérica de Usuarios auditados.
- **Pasos ejecutados:** Auditoría y prueba automatizada de capas administrativas reales.
- **Resultado esperado:** Cumplir CA273.
- **Resultado obtenido:** Funcionalidad no implementada: desactivación de catálogo; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E09-HU56-03 - Versionado del catálogo global

- **ID:** CP-E09-HU56-03
- **HU:** HU56
- **CA:** CA274
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Versionado del catálogo global.
- **Precondiciones:** Entorno de pruebas; Administración disponible.
- **Datos utilizados:** Lucía Fernández Rojas; Daniel Paredes Silva; consulta sobre recuperación de acceso; metodología de planificación por fases.
- **Endpoint/componente:** AdministracionModule y gestión genérica de Usuarios auditados.
- **Pasos ejecutados:** Auditoría y prueba automatizada de capas administrativas reales.
- **Resultado esperado:** Cumplir CA274.
- **Resultado obtenido:** Funcionalidad no implementada: versionado de catálogo; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E09-HU57-01 - Registro de reporte de soporte

- **ID:** CP-E09-HU57-01
- **HU:** HU57
- **CA:** CA275
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Registro de reporte de soporte.
- **Precondiciones:** Entorno de pruebas; Administración disponible.
- **Datos utilizados:** Lucía Fernández Rojas; Daniel Paredes Silva; consulta sobre recuperación de acceso; metodología de planificación por fases.
- **Endpoint/componente:** AdministracionModule y gestión genérica de Usuarios auditados.
- **Pasos ejecutados:** Auditoría y prueba automatizada de capas administrativas reales.
- **Resultado esperado:** Cumplir CA275.
- **Resultado obtenido:** Funcionalidad no implementada: reportes de soporte; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E09-HU57-02 - Consulta y filtrado de reportes

- **ID:** CP-E09-HU57-02
- **HU:** HU57
- **CA:** CA276
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Consulta y filtrado de reportes.
- **Precondiciones:** Entorno de pruebas; Administración disponible.
- **Datos utilizados:** Lucía Fernández Rojas; Daniel Paredes Silva; consulta sobre recuperación de acceso; metodología de planificación por fases.
- **Endpoint/componente:** AdministracionModule y gestión genérica de Usuarios auditados.
- **Pasos ejecutados:** Auditoría y prueba automatizada de capas administrativas reales.
- **Resultado esperado:** Cumplir CA276.
- **Resultado obtenido:** Funcionalidad no implementada: bandeja de soporte; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E09-HU57-03 - Actualización del estado de soporte

- **ID:** CP-E09-HU57-03
- **HU:** HU57
- **CA:** CA277
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Actualización del estado de soporte.
- **Precondiciones:** Entorno de pruebas; Administración disponible.
- **Datos utilizados:** Lucía Fernández Rojas; Daniel Paredes Silva; consulta sobre recuperación de acceso; metodología de planificación por fases.
- **Endpoint/componente:** AdministracionModule y gestión genérica de Usuarios auditados.
- **Pasos ejecutados:** Auditoría y prueba automatizada de capas administrativas reales.
- **Resultado esperado:** Cumplir CA277.
- **Resultado obtenido:** Funcionalidad no implementada: estados de soporte; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

### CP-E09-HU57-04 - Respuesta, notificación e historial de soporte

- **ID:** CP-E09-HU57-04
- **HU:** HU57
- **CA:** CA278, CA279
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Respuesta, notificación e historial de soporte.
- **Precondiciones:** Entorno de pruebas; Administración disponible.
- **Datos utilizados:** Lucía Fernández Rojas; Daniel Paredes Silva; consulta sobre recuperación de acceso; metodología de planificación por fases.
- **Endpoint/componente:** AdministracionModule y gestión genérica de Usuarios auditados.
- **Pasos ejecutados:** Auditoría y prueba automatizada de capas administrativas reales.
- **Resultado esperado:** Cumplir CA278, CA279.
- **Resultado obtenido:** Funcionalidad no implementada: respuesta e historial de soporte; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- **Interpretación:** Funcionalidad no implementada; no se puede validar sin inventar endpoints o modelos.
- **Estado:** FAIL
- **Evidencia:** Detalle técnico.
- **Observaciones:** —

## Resultados por HU

HU53: 0/4 PASS; HU54: 0/4 PASS; HU55: 0/3 PASS; HU56: 0/3 PASS; HU57: 0/4 PASS.

## Pruebas unitarias

No se crearon pruebas unitarias: no existe lógica administrativa aislable de inactividad, soporte ni catálogo.

## Detalle técnico

- CP-E09-HU53-01: Funcionalidad no implementada: gestión administrativa de Wedding Planners; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- CP-E09-HU53-02: Funcionalidad no implementada: alta administrativa de Wedding Planner; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- CP-E09-HU53-03: Funcionalidad no implementada: métricas administrativas; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- CP-E09-HU53-04: Funcionalidad no implementada: eliminación condicionada; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- CP-E09-HU54-01: Funcionalidad no implementada: política de inactividad; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- CP-E09-HU54-02: Funcionalidad no implementada: alerta previa de inactividad; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- CP-E09-HU54-03: Funcionalidad no implementada: scheduler de inactividad; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- CP-E09-HU54-04: Funcionalidad no implementada: suspensión administrativa auditada; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- CP-E09-HU55-01: Funcionalidad no implementada: listado administrativo de suspendidas; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- CP-E09-HU55-02: Funcionalidad no implementada: reactivación administrativa; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- CP-E09-HU55-03: Funcionalidad no implementada: auditoría de reactivación; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- CP-E09-HU56-01: Funcionalidad no implementada: catálogo global administrativo; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- CP-E09-HU56-02: Funcionalidad no implementada: desactivación de catálogo; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- CP-E09-HU56-03: Funcionalidad no implementada: versionado de catálogo; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- CP-E09-HU57-01: Funcionalidad no implementada: reportes de soporte; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- CP-E09-HU57-02: Funcionalidad no implementada: bandeja de soporte; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- CP-E09-HU57-03: Funcionalidad no implementada: estados de soporte; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.
- CP-E09-HU57-04: Funcionalidad no implementada: respuesta e historial de soporte; AdministracionModule no registra controladores ni servicios y no existe un rol Administrador administrativo.

## Fallos reales de la aplicación

No aplica: Administración no tiene implementación funcional. El controlador genérico de Usuarios no implementa rol Administrador ni casos E09.

## Funcionalidades no implementadas

Administrador/RBAC administrativo, panel y métricas, inactividad/scheduler/correos, reactivación auditada, catálogo versionado y soporte/feedback.

## Diferencias CA vs implementación actual

Solo existe AdministracionModule vacío y /usuarios genérico autenticado; no hay acciones, permisos ni persistencia administrativa requerida por CA257-CA279.

## Errores encontrados en los tests

Ninguno. Los 18 FAIL documentan capacidades ausentes.

## Tests corregidos y reejecutados

No aplicó.

## Casos manuales pendientes

Confirmaciones visuales de eliminación, suspensión y reactivación; tampoco cuentan con soporte backend.


## Anexo B — Rutas de evidencia

- test/E01-Acceso/evidencias/datos-prueba.json
- test/E01-Acceso/evidencias/casos-prueba.json
- test/E01-Acceso/evidencias/requests.json
- test/E01-Acceso/evidencias/responses.json
- test/E01-Acceso/evidencias/registros-generados.json
- test/E01-Acceso/evidencias/evidencias-especificas.json
- test/E01-Acceso/evidencias/resultado.md
- test/E01-Acceso/resultado-final.md
- test/E02-Usuarios/evidencias/datos-prueba.json
- test/E02-Usuarios/evidencias/casos-prueba.json
- test/E02-Usuarios/evidencias/requests.json
- test/E02-Usuarios/evidencias/responses.json
- test/E02-Usuarios/evidencias/registros-generados.json
- test/E02-Usuarios/evidencias/evidencias-especificas.json
- test/E02-Usuarios/evidencias/resultado.md
- test/E02-Usuarios/resultado-final.md
- test/E03-Proyecto/evidencias/datos-prueba.json
- test/E03-Proyecto/evidencias/casos-prueba.json
- test/E03-Proyecto/evidencias/requests.json
- test/E03-Proyecto/evidencias/responses.json
- test/E03-Proyecto/evidencias/registros-generados.json
- test/E03-Proyecto/evidencias/evidencias-especificas.json
- test/E03-Proyecto/evidencias/resultado.md
- test/E03-Proyecto/resultado-final.md
- test/E04-Cronograma/evidencias/datos-prueba.json
- test/E04-Cronograma/evidencias/casos-prueba.json
- test/E04-Cronograma/evidencias/requests.json
- test/E04-Cronograma/evidencias/responses.json
- test/E04-Cronograma/evidencias/registros-generados.json
- test/E04-Cronograma/evidencias/evidencias-especificas.json
- test/E04-Cronograma/evidencias/resultado.md
- test/E04-Cronograma/resultado-final.md
- test/E05-Presupuesto/evidencias/datos-prueba.json
- test/E05-Presupuesto/evidencias/casos-prueba.json
- test/E05-Presupuesto/evidencias/requests.json
- test/E05-Presupuesto/evidencias/responses.json
- test/E05-Presupuesto/evidencias/registros-generados.json
- test/E05-Presupuesto/evidencias/evidencias-especificas.json
- test/E05-Presupuesto/evidencias/resultado.md
- test/E05-Presupuesto/resultado-final.md
- test/E06-Invitados/evidencias/datos-prueba.json
- test/E06-Invitados/evidencias/casos-prueba.json
- test/E06-Invitados/evidencias/requests.json
- test/E06-Invitados/evidencias/responses.json
- test/E06-Invitados/evidencias/registros-generados.json
- test/E06-Invitados/evidencias/evidencias-especificas.json
- test/E06-Invitados/evidencias/resultado.md
- test/E06-Invitados/resultado-final.md
- test/E07-Proveedores/evidencias/datos-prueba.json
- test/E07-Proveedores/evidencias/casos-prueba.json
- test/E07-Proveedores/evidencias/requests.json
- test/E07-Proveedores/evidencias/responses.json
- test/E07-Proveedores/evidencias/registros-generados.json
- test/E07-Proveedores/evidencias/evidencias-especificas.json
- test/E07-Proveedores/evidencias/resultado.md
- test/E07-Proveedores/resultado-final.md
- test/E08-Riesgos/evidencias/datos-prueba.json
- test/E08-Riesgos/evidencias/casos-prueba.json
- test/E08-Riesgos/evidencias/requests.json
- test/E08-Riesgos/evidencias/responses.json
- test/E08-Riesgos/evidencias/registros-generados.json
- test/E08-Riesgos/evidencias/evidencias-especificas.json
- test/E08-Riesgos/evidencias/resultado.md
- test/E08-Riesgos/resultado-final.md
- test/E09-Administracion/evidencias/datos-prueba.json
- test/E09-Administracion/evidencias/casos-prueba.json
- test/E09-Administracion/evidencias/requests.json
- test/E09-Administracion/evidencias/responses.json
- test/E09-Administracion/evidencias/registros-generados.json
- test/E09-Administracion/evidencias/evidencias-especificas.json
- test/E09-Administracion/evidencias/resultado.md
- test/E09-Administracion/resultado-final.md
