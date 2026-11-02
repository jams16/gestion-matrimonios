# Resultado final E01-Acceso

| Métrica | Resultado |
|---|---:|
| Casos conceptuales | 24 |
| Ejecuciones/variantes Jest | 24 |
| PASS | 21 |
| FAIL | 0 |
| Manuales pendientes | 3 |
| Resultado global automático | PASS |

## Tabla principal

| Caso | CA | Estado | Resultado obtenido | Interpretación |
|---|---|---|---|---|
| CP-E01-HU01-01 – Registro exitoso de una nueva cuenta Wedding Planner | CA001, CA004, CA005 | PASS | Se enviaron datos válidos de persona, empresa, usuario y contraseña. El flujo creó una cuenta PROJECT_MANAGER con correo verificado. | La cuenta Wedding Planner quedó disponible para autenticación. |
| CP-E01-HU01-02 – Validación de campos obligatorios y correo | CA001 | PASS | Las cuatro variantes —nombres vacíos, apellido vacío, correo vacío y correo inválido— respondieron HTTP 400. | La API aplicó las validaciones requeridas. |
| CP-E01-HU01-03 – Política y confirmación de contraseña | CA002 | PASS | La API recibe confirmacionContrasena y rechaza una confirmación distinta con HTTP 400 y mensaje específico. | La comparación se realiza en el backend antes de persistir la cuenta. |
| CP-E01-HU01-04 – Rechazo de correo previamente registrado | CA003 | PASS | Tras crear la primera cuenta, una nueva solicitud con el mismo correo respondió HTTP 409. | El correo no pudo reutilizarse. |
| CP-E01-HU02-01 – Generación de correo de verificación | CA006 | PASS | Se capturó un correo de prueba con un código numérico único de seis dígitos. | El flujo vigente de registro verifica la identidad mediante código de correo. |
| CP-E01-HU02-02 – Confirmación de correo vigente | CA007 | PASS | El código vigente fue confirmado y la cuenta quedó con correo verificado. | La verificación mediante el mecanismo actual funciona. |
| CP-E01-HU02-03 – Rechazo de token inválido, usado o expirado | CA008 | PASS | Los tokens inexistente, usado y expirado fueron rechazados con HTTP 400. | La validación de invalidez, uso y expiración funciona. |
| CP-E01-HU02-04 – Bloqueo de acceso sin correo verificado | CA009 | PASS | Una cuenta pendiente recibió HTTP 403 al intentar iniciar sesión. | El backend bloquea el acceso antes de verificar el correo. |
| CP-E01-HU02-05 – Control de reenvíos de verificación | CA010 | PASS | La primera solicitud genera un correo y la segunda, dentro de 60 segundos, no genera uno adicional. | El reenvío está protegido frente a solicitudes repetidas en un intervalo corto. |
| CP-E01-HU03-01 – Inicio de sesión válido | CA011, CA014 | PASS | La cuenta verificada recibió access token, refresh token y tipo PROJECT_MANAGER. | La autenticación y el tipo de usuario funcionaron. |
| CP-E01-HU03-02 – Rechazo genérico de credenciales inválidas | CA012 | PASS | Contraseña incorrecta y correo inexistente devolvieron HTTP 401 con el mismo mensaje. | No se reveló cuál credencial era incorrecta. |
| CP-E01-HU03-03 – Bloqueo de cuenta no verificada | CA013 | PASS | La cuenta pendiente recibió HTTP 403 al iniciar sesión. | Se aplica la restricción de verificación. |
| CP-E01-HU03-04 – Renovación de sesión con refresh token | CA015 | PASS | El refresh token vigente fue aceptado y se entregó un nuevo par de tokens. | La reapertura de Flutter queda como verificación manual. |
| CP-E01-HU04-01 – Consulta de información personal del perfil | CA016 | PASS | GET /usuarios/:id devuelve datos de cuenta y datos personales/de contacto de su propia persona. | El perfil autenticado se expone sin datos sensibles. |
| CP-E01-HU04-02 – Actualización de datos personales y contacto | CA017, CA019, CA020 | PASS | PATCH /usuarios/:id actualiza nombres, apellidos, correo y teléfono permitidos. | La edición del perfil persiste los datos de PersonaNatural. |
| CP-E01-HU04-03 – Validación de correo en el perfil | CA018 | PASS | Un correo mal formado responde HTTP 400 mediante la validación de email. | La API valida el formato antes de persistir. |
| CP-E01-HU05-01 – Botón y confirmación de cerrar sesión | CA021, CA022 | MANUAL | Pendiente de ejecutar visualmente en Flutter. | Una prueba API no acredita botón ni diálogo visual. |
| CP-E01-HU05-02 – Revocación de sesión al cerrar sesión | CA023, CA024 | PASS | Logout revoca la sesión persistida; el refresh y el access token asociados quedan rechazados. | El guard comprueba la sesión en cada acceso protegido. |
| CP-E01-HU05-03 – Expiración de sesión por inactividad | CA025 | PASS | SESSION_INACTIVITY_TIMEOUT está configurado y el guard invalida una sesión inactiva. | La actividad válida actualiza ultimoAcceso; al expirar se revocan las sesiones. |
| CP-E01-HU06-01 – Listado aislado por Wedding Planner | CA026 | PASS | El resumen autenticado de WP-A contiene su matrimonio y excluye el de WP-B. | La consulta se restringe por id_pm del usuario autenticado. |
| CP-E01-HU06-02 – Selección de matrimonio activo | CA027 | MANUAL | Pendiente de ejecutar en Flutter. | No existe endpoint backend para matrimonio activo. |
| CP-E01-HU06-03 – Aislamiento de información entre Wedding Planners | CA028 | PASS | La consulta de WP-A no expone el proyecto creado por WP-B. | El aislamiento se aplica antes de construir el resumen. |
| CP-E01-HU06-04 – Cambio de matrimonio activo | CA029 | MANUAL | Pendiente de ejecutar en Flutter. | El cambio de contexto es una interacción frontend. |
| CP-E01-HU06-05 – Búsqueda y filtros de matrimonios | CA030 | PASS | La búsqueda por nombre de pareja y el rango de fechas conservan únicamente el matrimonio propio coincidente. | Los filtros se aplican sobre la colección ya aislada por Wedding Planner. |

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
- **Resultado obtenido:** La API recibe confirmacionContrasena y rechaza una confirmación distinta con HTTP 400 y mensaje específico.
- **Interpretación:** La comparación se realiza en el backend antes de persistir la cuenta.
- **Estado:** PASS
- **Evidencia técnica:** Ver resultados-automaticos.json de la HU.
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
- **Resultado esperado:** Enviar al correo un código único de seis dígitos para confirmar el registro.
- **Resultado obtenido:** Se capturó un correo de prueba con un código numérico único de seis dígitos.
- **Interpretación:** El flujo vigente de registro verifica la identidad mediante código de correo.
- **Estado:** PASS
- **Evidencia técnica:** Ver resultados-automaticos.json de la HU.
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
- **Resultado obtenido:** La primera solicitud genera un correo y la segunda, dentro de 60 segundos, no genera uno adicional.
- **Interpretación:** El reenvío está protegido frente a solicitudes repetidas en un intervalo corto.
- **Estado:** PASS
- **Evidencia técnica:** Ver resultados-automaticos.json de la HU.
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
- **Resultado obtenido:** GET /usuarios/:id devuelve datos de cuenta y datos personales/de contacto de su propia persona.
- **Interpretación:** El perfil autenticado se expone sin datos sensibles.
- **Estado:** PASS
- **Evidencia técnica:** Ver resultados-automaticos.json de la HU.
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
- **Resultado obtenido:** PATCH /usuarios/:id actualiza nombres, apellidos, correo y teléfono permitidos.
- **Interpretación:** La edición del perfil persiste los datos de PersonaNatural.
- **Estado:** PASS
- **Evidencia técnica:** Ver resultados-automaticos.json de la HU.
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
- **Resultado obtenido:** Un correo mal formado responde HTTP 400 mediante la validación de email.
- **Interpretación:** La API valida el formato antes de persistir.
- **Estado:** PASS
- **Evidencia técnica:** Ver resultados-automaticos.json de la HU.
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
- **Resultado obtenido:** Logout revoca la sesión persistida; el refresh y el access token asociados quedan rechazados.
- **Interpretación:** El guard comprueba la sesión en cada acceso protegido.
- **Estado:** PASS
- **Evidencia técnica:** Ver resultados-automaticos.json de la HU.
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
- **Resultado obtenido:** SESSION_INACTIVITY_TIMEOUT está configurado y el guard invalida una sesión inactiva.
- **Interpretación:** La actividad válida actualiza ultimoAcceso; al expirar se revocan las sesiones.
- **Estado:** PASS
- **Evidencia técnica:** Ver resultados-automaticos.json de la HU.
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
- **Resultado obtenido:** El resumen autenticado de WP-A contiene su matrimonio y excluye el de WP-B.
- **Interpretación:** La consulta se restringe por id_pm del usuario autenticado.
- **Estado:** PASS
- **Evidencia técnica:** Ver resultados-automaticos.json de la HU.
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
- **Resultado obtenido:** La consulta de WP-A no expone el proyecto creado por WP-B.
- **Interpretación:** El aislamiento se aplica antes de construir el resumen.
- **Estado:** PASS
- **Evidencia técnica:** Ver resultados-automaticos.json de la HU.
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
- **Resultado obtenido:** La búsqueda por nombre de pareja y el rango de fechas conservan únicamente el matrimonio propio coincidente.
- **Interpretación:** Los filtros se aplican sobre la colección ya aislada por Wedding Planner.
- **Estado:** PASS
- **Evidencia técnica:** Ver resultados-automaticos.json de la HU.
- **Observaciones:** —

## Detalle técnico de fallos

No se registraron fallos técnicos.

## Resumen de diagnóstico

### Funcionalidades implementadas y verificadas

- CA002: comparación backend de contraseña y confirmación.
- CA006: código único de seis dígitos enviado al correo durante el registro.
- CA010: enfriamiento de 60 segundos para reenviar verificación.
- CA016 a CA020: consulta y edición del perfil personal/contacto, con validación de correo y unicidad.
- CA024: invalidación efectiva de access token al revocar la sesión de logout.
- CA025: expiración por inactividad configurable mediante SESSION_INACTIVITY_TIMEOUT.
- CA026, CA028 y CA030: aislamiento por Wedding Planner y filtros de pareja/fecha en matrimonios.

### Casos manuales pendientes

- HU05-01: botón y confirmación visual de cierre de sesión.
- HU06-02: selección visual de matrimonio activo.
- HU06-04: cambio visual de matrimonio activo.
