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
