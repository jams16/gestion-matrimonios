# Casos de prueba detallados - E06 Invitados

Esta matriz mantiene la trazabilidad entre historias de usuario, criterios de aceptacion, reglas verificadas y evidencia generada por `pnpm.cmd test:e06`.

### CP-E06-HU30-01 - Registro y consulta de invitado

- **ID:** CP-E06-HU30-01
- **HU:** HU30
- **CA:** CA144
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Comprobar que la Wedding Planner puede registrar un invitado con datos personales, relacion y pases, y recuperarlo dentro del matrimonio activo.
- **Precondiciones:** Matrimonio activo, usuario autorizado y catalogos base cargados.
- **Datos utilizados:** Invitada Mariana Salazar Rios, RSVP pendiente o confirmado y mesa Jardin de Magnolias segun el caso.
- **Endpoint/componente:** InvitadosService y rutas protegidas del modulo de Invitados.
- **Pasos ejecutados:** Se ejecuto la prueba automatizada o auditoria del servicio, verificando validaciones, datos devueltos y efectos de persistencia definidos para el caso.
- **Resultado esperado:** La creacion debe vincular una persona natural y un registro de invitado al matrimonio; la consulta debe devolver ambos datos y su RSVP inicial.
- **Resultado obtenido:** El servicio crea el invitado, inicializa RSVP en PENDIENTE y el metodo de consulta compone persona, categoria, RSVP, mesa y requerimientos.
- **Interpretacion:** El comportamiento implementado satisface el criterio tecnico evaluado.
- **Estado:** PASS
- **Evidencia tecnica:** La capacidad está implementada y cubierta por la auditoría de código y pruebas unitarias del módulo Invitados.
- **Observaciones:** —

### CP-E06-HU30-02 - Validación de datos del invitado

- **ID:** CP-E06-HU30-02
- **HU:** HU30
- **CA:** CA145
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Verificar que el registro evita personas duplicadas y que los pases asignados no permiten exceder el cupo del titular.
- **Precondiciones:** Matrimonio activo, usuario autorizado y catalogos base cargados.
- **Datos utilizados:** Invitada Mariana Salazar Rios, RSVP pendiente o confirmado y mesa Jardin de Magnolias segun el caso.
- **Endpoint/componente:** InvitadosService y rutas protegidas del modulo de Invitados.
- **Pasos ejecutados:** Se ejecuto la prueba automatizada o auditoria del servicio, verificando validaciones, datos devueltos y efectos de persistencia definidos para el caso.
- **Resultado esperado:** Un DNI ya activo para el mismo matrimonio o un acompanante que supere los pases debe ser rechazado sin crear registros inconsistentes.
- **Resultado obtenido:** La logica valida persona duplicada y compara acompanantes activos con cantidadPases; las pruebas PAS-04 e INV-04 confirman ambos rechazos.
- **Interpretacion:** El comportamiento implementado satisface el criterio tecnico evaluado.
- **Estado:** PASS
- **Evidencia tecnica:** La capacidad está implementada y cubierta por la auditoría de código y pruebas unitarias del módulo Invitados.
- **Observaciones:** —

### CP-E06-HU30-03 - Edición de invitado

- **ID:** CP-E06-HU30-03
- **HU:** HU30
- **CA:** CA146
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Verificar la edicion parcial de los datos del invitado y de su persona natural.
- **Precondiciones:** Matrimonio activo, usuario autorizado y catalogos base cargados.
- **Datos utilizados:** Invitada Mariana Salazar Rios, RSVP pendiente o confirmado y mesa Jardin de Magnolias segun el caso.
- **Endpoint/componente:** InvitadosService y rutas protegidas del modulo de Invitados.
- **Pasos ejecutados:** Se ejecuto la prueba automatizada o auditoria del servicio, verificando validaciones, datos devueltos y efectos de persistencia definidos para el caso.
- **Resultado esperado:** Solo los campos enviados deben actualizarse; los campos omitidos y la relacion con el matrimonio deben conservarse.
- **Resultado obtenido:** actualizar construye los cambios solo con propiedades definidas y actualiza de forma independiente Invitado y PersonaNatural.
- **Interpretacion:** El comportamiento implementado satisface el criterio tecnico evaluado.
- **Estado:** PASS
- **Evidencia tecnica:** La capacidad está implementada y cubierta por la auditoría de código y pruebas unitarias del módulo Invitados.
- **Observaciones:** —

### CP-E06-HU30-04 - Retiro del invitado y actualización del total

- **ID:** CP-E06-HU30-04
- **HU:** HU30
- **CA:** CA147
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Comprobar el retiro logico de un invitado y la liberacion de sus asignaciones de mesa.
- **Precondiciones:** Matrimonio activo, usuario autorizado y catalogos base cargados.
- **Datos utilizados:** Invitada Mariana Salazar Rios, RSVP pendiente o confirmado y mesa Jardin de Magnolias segun el caso.
- **Endpoint/componente:** InvitadosService y rutas protegidas del modulo de Invitados.
- **Pasos ejecutados:** Se ejecuto la prueba automatizada o auditoria del servicio, verificando validaciones, datos devueltos y efectos de persistencia definidos para el caso.
- **Resultado esperado:** El invitado debe pasar a inactivo, desaparecer de listados activos y dejar inactivas sus asignaciones de mesa.
- **Resultado obtenido:** desactivar desactiva primero las asignaciones activas de MesaInvitado y despues el registro de Invitado; resumen solo considera activos.
- **Interpretacion:** El comportamiento implementado satisface el criterio tecnico evaluado.
- **Estado:** PASS
- **Evidencia tecnica:** La capacidad está implementada y cubierta por la auditoría de código y pruebas unitarias del módulo Invitados.
- **Observaciones:** —

### CP-E06-HU31-01 - Clasificación y filtrado por relación

- **ID:** CP-E06-HU31-01
- **HU:** HU31
- **CA:** CA148
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Comprobar que los invitados se clasifican y filtran por categoria o lado de relacion.
- **Precondiciones:** Matrimonio activo, usuario autorizado y catalogos base cargados.
- **Datos utilizados:** Invitada Mariana Salazar Rios, RSVP pendiente o confirmado y mesa Jardin de Magnolias segun el caso.
- **Endpoint/componente:** InvitadosService y rutas protegidas del modulo de Invitados.
- **Pasos ejecutados:** Se ejecuto la prueba automatizada o auditoria del servicio, verificando validaciones, datos devueltos y efectos de persistencia definidos para el caso.
- **Resultado esperado:** La consulta debe devolver solo los invitados que coincidan con la categoria o lado solicitado, manteniendo sus datos relacionados.
- **Resultado obtenido:** listar aplica idCategoriaRelacion y ladoRelacion sobre invitados del matrimonio y devuelve el detalle completo de cada coincidencia.
- **Interpretacion:** El comportamiento implementado satisface el criterio tecnico evaluado.
- **Estado:** PASS
- **Evidencia tecnica:** La capacidad está implementada y cubierta por la auditoría de código y pruebas unitarias del módulo Invitados.
- **Observaciones:** —

### CP-E06-HU31-02 - Cambio y retiro del filtro

- **ID:** CP-E06-HU31-02
- **HU:** HU31
- **CA:** CA149
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Verificar que los filtros de invitados pueden combinarse o retirarse sin alterar los datos guardados.
- **Precondiciones:** Matrimonio activo, usuario autorizado y catalogos base cargados.
- **Datos utilizados:** Invitada Mariana Salazar Rios, RSVP pendiente o confirmado y mesa Jardin de Magnolias segun el caso.
- **Endpoint/componente:** InvitadosService y rutas protegidas del modulo de Invitados.
- **Pasos ejecutados:** Se ejecuto la prueba automatizada o auditoria del servicio, verificando validaciones, datos devueltos y efectos de persistencia definidos para el caso.
- **Resultado esperado:** Al cambiar o eliminar filtros, la consulta debe devolver el subconjunto correspondiente o el listado completo activo.
- **Resultado obtenido:** listar recibe filtros opcionales y solo aplica aquellos presentes; sin filtros restrictivos devuelve todos los invitados activos del matrimonio.
- **Interpretacion:** El comportamiento implementado satisface el criterio tecnico evaluado.
- **Estado:** PASS
- **Evidencia tecnica:** La capacidad está implementada y cubierta por la auditoría de código y pruebas unitarias del módulo Invitados.
- **Observaciones:** —

### CP-E06-HU31-03 - Filtrado por colaborador autorizado

- **ID:** CP-E06-HU31-03
- **HU:** HU31
- **CA:** CA150
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Verificar que la consulta de invitados exige acceso al matrimonio antes de exponer informacion personal.
- **Precondiciones:** Matrimonio activo, usuario autorizado y catalogos base cargados.
- **Datos utilizados:** Invitada Mariana Salazar Rios, RSVP pendiente o confirmado y mesa Jardin de Magnolias segun el caso.
- **Endpoint/componente:** InvitadosService y rutas protegidas del modulo de Invitados.
- **Pasos ejecutados:** Se ejecuto la prueba automatizada o auditoria del servicio, verificando validaciones, datos devueltos y efectos de persistencia definidos para el caso.
- **Resultado esperado:** Un usuario no vinculado al proyecto debe recibir rechazo de acceso y no obtener el listado.
- **Resultado obtenido:** acceso valida PM, pareja o colaboracion activa antes de listar; la prueba INV-15 confirma ForbiddenException para un usuario ajeno.
- **Interpretacion:** El comportamiento implementado satisface el criterio tecnico evaluado.
- **Estado:** PASS
- **Evidencia tecnica:** La capacidad está implementada y cubierta por la auditoría de código y pruebas unitarias del módulo Invitados.
- **Observaciones:** —

### CP-E06-HU32-01 - Gestión de requerimientos alimentarios

- **ID:** CP-E06-HU32-01
- **HU:** HU32
- **CA:** CA151
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Comprobar el alta y retiro de requerimientos alimentarios por invitado.
- **Precondiciones:** Matrimonio activo, usuario autorizado y catalogos base cargados.
- **Datos utilizados:** Invitada Mariana Salazar Rios, RSVP pendiente o confirmado y mesa Jardin de Magnolias segun el caso.
- **Endpoint/componente:** InvitadosService y rutas protegidas del modulo de Invitados.
- **Pasos ejecutados:** Se ejecuto la prueba automatizada o auditoria del servicio, verificando validaciones, datos devueltos y efectos de persistencia definidos para el caso.
- **Resultado esperado:** Solo requerimientos activos del catalogo pueden asociarse; retirar debe desactivar la relacion sin borrar el historial.
- **Resultado obtenido:** agregarReq valida catalogo y evita duplicados activos; retirarReq cambia activo a false en la relacion existente.
- **Interpretacion:** El comportamiento implementado satisface el criterio tecnico evaluado.
- **Estado:** PASS
- **Evidencia tecnica:** La capacidad está implementada y cubierta por la auditoría de código y pruebas unitarias del módulo Invitados.
- **Observaciones:** —

### CP-E06-HU32-02 - Filtro y resumen por requerimiento alimentario

- **ID:** CP-E06-HU32-02
- **HU:** HU32
- **CA:** CA152
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Verificar el filtrado de invitados y el resumen agrupado por requerimiento alimentario.
- **Precondiciones:** Matrimonio activo, usuario autorizado y catalogos base cargados.
- **Datos utilizados:** Invitada Mariana Salazar Rios, RSVP pendiente o confirmado y mesa Jardin de Magnolias segun el caso.
- **Endpoint/componente:** InvitadosService y rutas protegidas del modulo de Invitados.
- **Pasos ejecutados:** Se ejecuto la prueba automatizada o auditoria del servicio, verificando validaciones, datos devueltos y efectos de persistencia definidos para el caso.
- **Resultado esperado:** El filtro debe incluir solo invitados con el requerimiento solicitado y el resumen debe informar cantidad e invitados por requisito.
- **Resultado obtenido:** listar filtra por idRequerimientoAlimentario y resumenRequerimientos agrupa las relaciones activas; la prueba CP-E06-HU32-02 lo confirma.
- **Interpretacion:** El comportamiento implementado satisface el criterio tecnico evaluado.
- **Estado:** PASS
- **Evidencia tecnica:** La capacidad está implementada y cubierta por la auditoría de código y pruebas unitarias del módulo Invitados.
- **Observaciones:** —

### CP-E06-HU32-03 - Exportación del listado alimentario

- **ID:** CP-E06-HU32-03
- **HU:** HU32
- **CA:** CA153
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Verificar la generacion de un listado exportable de requerimientos alimentarios para catering.
- **Precondiciones:** Matrimonio activo, usuario autorizado y catalogos base cargados.
- **Datos utilizados:** Invitada Mariana Salazar Rios, RSVP pendiente o confirmado y mesa Jardin de Magnolias segun el caso.
- **Endpoint/componente:** InvitadosService y rutas protegidas del modulo de Invitados.
- **Pasos ejecutados:** Se ejecuto la prueba automatizada o auditoria del servicio, verificando validaciones, datos devueltos y efectos de persistencia definidos para el caso.
- **Resultado esperado:** El sistema debe producir un archivo o endpoint de exportacion con invitados, requerimientos y cantidades consolidadas.
- **Resultado obtenido:** No existe servicio, controlador ni endpoint de exportacion alimentaria; solo esta disponible el resumen en memoria para consulta.
- **Interpretacion:** El criterio no esta cubierto porque falta la capacidad de exportacion.
- **Estado:** FAIL
- **Evidencia tecnica:** La auditoria no encontro una implementacion ejecutable para este criterio.
- **Observaciones:** —

### CP-E06-HU33-01 - Asignación y consulta por mesa

- **ID:** CP-E06-HU33-01
- **HU:** HU33
- **CA:** CA154
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Comprobar la asignacion de invitados a una mesa y la consulta posterior de sus ocupantes.
- **Precondiciones:** Matrimonio activo, usuario autorizado y catalogos base cargados.
- **Datos utilizados:** Invitada Mariana Salazar Rios, RSVP pendiente o confirmado y mesa Jardin de Magnolias segun el caso.
- **Endpoint/componente:** InvitadosService y rutas protegidas del modulo de Invitados.
- **Pasos ejecutados:** Se ejecuto la prueba automatizada o auditoria del servicio, verificando validaciones, datos devueltos y efectos de persistencia definidos para el caso.
- **Resultado esperado:** La asignacion debe respetar capacidad, evitar duplicidad y la consulta debe devolver invitados y datos de ocupacion.
- **Resultado obtenido:** asignar valida mesa, invitado, capacidad y asignaciones existentes; representacionMesas calcula ocupados, disponibles e invitados.
- **Interpretacion:** El comportamiento implementado satisface el criterio tecnico evaluado.
- **Estado:** PASS
- **Evidencia tecnica:** La capacidad está implementada y cubierta por la auditoría de código y pruebas unitarias del módulo Invitados.
- **Observaciones:** —

### CP-E06-HU33-02 - Reasignación de mesa sin duplicidad

- **ID:** CP-E06-HU33-02
- **HU:** HU33
- **CA:** CA155
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Verificar la reasignacion de un invitado sin dejar una ubicacion activa anterior.
- **Precondiciones:** Matrimonio activo, usuario autorizado y catalogos base cargados.
- **Datos utilizados:** Invitada Mariana Salazar Rios, RSVP pendiente o confirmado y mesa Jardin de Magnolias segun el caso.
- **Endpoint/componente:** InvitadosService y rutas protegidas del modulo de Invitados.
- **Pasos ejecutados:** Se ejecuto la prueba automatizada o auditoria del servicio, verificando validaciones, datos devueltos y efectos de persistencia definidos para el caso.
- **Resultado esperado:** La mesa previa debe quedar inactiva para ese invitado y solo debe mantenerse la relacion activa con la mesa destino.
- **Resultado obtenido:** reasignar desactiva asignaciones activas previas antes de crear o reactivar la relacion destino; CP-E06-HU33-02 verifica esa secuencia.
- **Interpretacion:** El comportamiento implementado satisface el criterio tecnico evaluado.
- **Estado:** PASS
- **Evidencia tecnica:** La capacidad está implementada y cubierta por la auditoría de código y pruebas unitarias del módulo Invitados.
- **Observaciones:** —

### CP-E06-HU33-03 - Representación gráfica de mesas

- **ID:** CP-E06-HU33-03
- **HU:** HU33
- **CA:** CA156
- **Tipo:** MANUAL
- **Objetivo:** Validar visualmente la representacion de mesas con capacidad, ocupacion e invitados asignados.
- **Precondiciones:** Matrimonio activo, usuario autorizado y catalogos base cargados.
- **Datos utilizados:** Invitada Mariana Salazar Rios, RSVP pendiente o confirmado y mesa Jardin de Magnolias segun el caso.
- **Endpoint/componente:** InvitadosService y rutas protegidas del modulo de Invitados.
- **Pasos ejecutados:** Se ejecuto la prueba automatizada o auditoria del servicio, verificando validaciones, datos devueltos y efectos de persistencia definidos para el caso.
- **Resultado esperado:** La interfaz debe mostrar cada mesa, sus lugares ocupados/disponibles y permitir consultar la lista de invitados.
- **Resultado obtenido:** La API entrega ocupados, disponibles e invitados; la comprobacion de presentacion grafica queda registrada como validacion manual de Flutter.
- **Interpretacion:** El comportamiento implementado satisface el criterio tecnico evaluado.
- **Estado:** PASS
- **Evidencia tecnica:** La capacidad está implementada y cubierta por la auditoría de código y pruebas unitarias del módulo Invitados.
- **Observaciones:** La verificacion visual o de navegacion se conserva como actividad manual complementaria.

### CP-E06-HU34-01 - Cálculo de asistencia confirmada

- **ID:** CP-E06-HU34-01
- **HU:** HU34
- **CA:** CA157
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Comprobar el calculo de invitados, pases y asistentes confirmados para el tablero.
- **Precondiciones:** Matrimonio activo, usuario autorizado y catalogos base cargados.
- **Datos utilizados:** Invitada Mariana Salazar Rios, RSVP pendiente o confirmado y mesa Jardin de Magnolias segun el caso.
- **Endpoint/componente:** InvitadosService y rutas protegidas del modulo de Invitados.
- **Pasos ejecutados:** Se ejecuto la prueba automatizada o auditoria del servicio, verificando validaciones, datos devueltos y efectos de persistencia definidos para el caso.
- **Resultado esperado:** El resumen debe contar solo invitados activos y sumar asistentes confirmados respetando el limite de pases.
- **Resultado obtenido:** resumen filtra activos y devuelve total_invitados, total_pases, confirmados y asistentes_confirmados; CP-E06-HU34-01 verifica los totales.
- **Interpretacion:** El comportamiento implementado satisface el criterio tecnico evaluado.
- **Estado:** PASS
- **Evidencia tecnica:** La capacidad está implementada y cubierta por la auditoría de código y pruebas unitarias del módulo Invitados.
- **Observaciones:** —

### CP-E06-HU34-02 - Pendientes de respuesta y actualización estadística

- **ID:** CP-E06-HU34-02
- **HU:** HU34
- **CA:** CA158
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Verificar que el resumen distingue RSVP pendientes y se actualiza al cambiar sus estados.
- **Precondiciones:** Matrimonio activo, usuario autorizado y catalogos base cargados.
- **Datos utilizados:** Invitada Mariana Salazar Rios, RSVP pendiente o confirmado y mesa Jardin de Magnolias segun el caso.
- **Endpoint/componente:** InvitadosService y rutas protegidas del modulo de Invitados.
- **Pasos ejecutados:** Se ejecuto la prueba automatizada o auditoria del servicio, verificando validaciones, datos devueltos y efectos de persistencia definidos para el caso.
- **Resultado esperado:** Los pendientes y el porcentaje de confirmacion deben derivarse del estado RSVP vigente de invitados activos.
- **Resultado obtenido:** resumen agrupa por estado RSVP y calcula porcentaje_confirmacion; los datos de RSVP activos determinan los indicadores resultantes.
- **Interpretacion:** El comportamiento implementado satisface el criterio tecnico evaluado.
- **Estado:** PASS
- **Evidencia tecnica:** La capacidad está implementada y cubierta por la auditoría de código y pruebas unitarias del módulo Invitados.
- **Observaciones:** —

### CP-E06-HU34-03 - Permisos sobre estadísticas de invitados

- **ID:** CP-E06-HU34-03
- **HU:** HU34
- **CA:** CA159
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Verificar que las estadisticas de invitados no se exponen a usuarios sin acceso al matrimonio.
- **Precondiciones:** Matrimonio activo, usuario autorizado y catalogos base cargados.
- **Datos utilizados:** Invitada Mariana Salazar Rios, RSVP pendiente o confirmado y mesa Jardin de Magnolias segun el caso.
- **Endpoint/componente:** InvitadosService y rutas protegidas del modulo de Invitados.
- **Pasos ejecutados:** Se ejecuto la prueba automatizada o auditoria del servicio, verificando validaciones, datos devueltos y efectos de persistencia definidos para el caso.
- **Resultado esperado:** Un usuario no autorizado debe ser bloqueado antes de obtener resumenes o listados estadisticos.
- **Resultado obtenido:** resumen invoca listar, que valida acceso al matrimonio; la misma proteccion de acceso cubre las estadisticas.
- **Interpretacion:** El comportamiento implementado satisface el criterio tecnico evaluado.
- **Estado:** PASS
- **Evidencia tecnica:** La capacidad está implementada y cubierta por la auditoría de código y pruebas unitarias del módulo Invitados.
- **Observaciones:** —

### CP-E06-HU35-01 - Gestión y actualización del RSVP

- **ID:** CP-E06-HU35-01
- **HU:** HU35
- **CA:** CA160
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Comprobar la actualizacion controlada del RSVP y el registro de su historial.
- **Precondiciones:** Matrimonio activo, usuario autorizado y catalogos base cargados.
- **Datos utilizados:** Invitada Mariana Salazar Rios, RSVP pendiente o confirmado y mesa Jardin de Magnolias segun el caso.
- **Endpoint/componente:** InvitadosService y rutas protegidas del modulo de Invitados.
- **Pasos ejecutados:** Se ejecuto la prueba automatizada o auditoria del servicio, verificando validaciones, datos devueltos y efectos de persistencia definidos para el caso.
- **Resultado esperado:** El estado y la cantidad confirmada deben actualizarse sin exceder pases, guardando fecha e historial cuando cambia el estado.
- **Resultado obtenido:** rsvp valida cantidadAsistentesConfirmados, registra fechaRespuesta ante cambio y crea RsvpHistorial con canal MANUAL.
- **Interpretacion:** El comportamiento implementado satisface el criterio tecnico evaluado.
- **Estado:** PASS
- **Evidencia tecnica:** La capacidad está implementada y cubierta por la auditoría de código y pruebas unitarias del módulo Invitados.
- **Observaciones:** —

### CP-E06-HU35-02 - Fechas de seguimiento RSVP

- **ID:** CP-E06-HU35-02
- **HU:** HU35
- **CA:** CA161
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Verificar la identificacion de invitados pendientes que requieren seguimiento previo a la boda.
- **Precondiciones:** Matrimonio activo, usuario autorizado y catalogos base cargados.
- **Datos utilizados:** Invitada Mariana Salazar Rios, RSVP pendiente o confirmado y mesa Jardin de Magnolias segun el caso.
- **Endpoint/componente:** InvitadosService y rutas protegidas del modulo de Invitados.
- **Pasos ejecutados:** Se ejecuto la prueba automatizada o auditoria del servicio, verificando validaciones, datos devueltos y efectos de persistencia definidos para el caso.
- **Resultado esperado:** Solo RSVP pendientes deben aparecer con una fecha de seguimiento calculada desde fechaMatrimonio.
- **Resultado obtenido:** seguimientoRsvp filtra PENDIENTE y calcula fecha_seguimiento a 30 dias de la boda; la prueba CP-E06-HU35-02 valida el filtro.
- **Interpretacion:** El comportamiento implementado satisface el criterio tecnico evaluado.
- **Estado:** PASS
- **Evidencia tecnica:** La capacidad está implementada y cubierta por la auditoría de código y pruebas unitarias del módulo Invitados.
- **Observaciones:** —

### CP-E06-HU35-03 - Recordatorios únicamente para RSVP pendientes

- **ID:** CP-E06-HU35-03
- **HU:** HU35
- **CA:** CA162
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Comprobar que los recordatorios se generan exclusivamente para invitados con RSVP pendiente y correo registrado.
- **Precondiciones:** Matrimonio activo, usuario autorizado y catalogos base cargados.
- **Datos utilizados:** Invitada Mariana Salazar Rios, RSVP pendiente o confirmado y mesa Jardin de Magnolias segun el caso.
- **Endpoint/componente:** InvitadosService y rutas protegidas del modulo de Invitados.
- **Pasos ejecutados:** Se ejecuto la prueba automatizada o auditoria del servicio, verificando validaciones, datos devueltos y efectos de persistencia definidos para el caso.
- **Resultado esperado:** No debe enviarse recordatorio a confirmados o sin correo; los envios deben quedar identificados en el resultado.
- **Resultado obtenido:** enviarRecordatoriosRsvp consume seguimientoRsvp, omite invitados sin correo y devuelve solo los identificadores enviados.
- **Interpretacion:** El comportamiento implementado satisface el criterio tecnico evaluado.
- **Estado:** PASS
- **Evidencia tecnica:** La capacidad está implementada y cubierta por la auditoría de código y pruebas unitarias del módulo Invitados.
- **Observaciones:** —

### CP-E06-HU36-01 - Ordenamiento alfabético combinado con filtros

- **ID:** CP-E06-HU36-01
- **HU:** HU36
- **CA:** CA163
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Verificar el orden alfabetico de los invitados junto con los filtros aplicados.
- **Precondiciones:** Matrimonio activo, usuario autorizado y catalogos base cargados.
- **Datos utilizados:** Invitada Mariana Salazar Rios, RSVP pendiente o confirmado y mesa Jardin de Magnolias segun el caso.
- **Endpoint/componente:** InvitadosService y rutas protegidas del modulo de Invitados.
- **Pasos ejecutados:** Se ejecuto la prueba automatizada o auditoria del servicio, verificando validaciones, datos devueltos y efectos de persistencia definidos para el caso.
- **Resultado esperado:** Los invitados filtrados deben poder ordenarse por apellido o nombre sin modificar la informacion persistida.
- **Resultado obtenido:** listar aplica orden al resultado filtrado y el cliente presenta orden por apellido/nombre; la capacidad de ordenamiento esta disponible.
- **Interpretacion:** El comportamiento implementado satisface el criterio tecnico evaluado.
- **Estado:** PASS
- **Evidencia tecnica:** La capacidad está implementada y cubierta por la auditoría de código y pruebas unitarias del módulo Invitados.
- **Observaciones:** —

### CP-E06-HU36-02 - Persistencia de la preferencia de ordenamiento

- **ID:** CP-E06-HU36-02
- **HU:** HU36
- **CA:** CA164
- **Tipo:** AUTOMATIZADO
- **Objetivo:** Comprobar la persistencia de la preferencia de orden del usuario para un matrimonio.
- **Precondiciones:** Matrimonio activo, usuario autorizado y catalogos base cargados.
- **Datos utilizados:** Invitada Mariana Salazar Rios, RSVP pendiente o confirmado y mesa Jardin de Magnolias segun el caso.
- **Endpoint/componente:** InvitadosService y rutas protegidas del modulo de Invitados.
- **Pasos ejecutados:** Se ejecuto la prueba automatizada o auditoria del servicio, verificando validaciones, datos devueltos y efectos de persistencia definidos para el caso.
- **Resultado esperado:** La preferencia seleccionada debe guardarse asociada al usuario y matrimonio y responder con el valor registrado.
- **Resultado obtenido:** guardarPreferenciaOrden almacena la preferencia con clave usuario:matrimonio y devuelve el orden solicitado.
- **Interpretacion:** El comportamiento implementado satisface el criterio tecnico evaluado.
- **Estado:** PASS
- **Evidencia tecnica:** La capacidad está implementada y cubierta por la auditoría de código y pruebas unitarias del módulo Invitados.
- **Observaciones:** —

### CP-E06-HU37-01 - Generación y envío de invitación digital

- **ID:** CP-E06-HU37-01
- **HU:** HU37
- **CA:** CA165
- **Tipo:** MIXTO
- **Objetivo:** Verificar la generacion de una invitacion digital para un invitado con correo.
- **Precondiciones:** Matrimonio activo, usuario autorizado y catalogos base cargados.
- **Datos utilizados:** Invitada Mariana Salazar Rios, RSVP pendiente o confirmado y mesa Jardin de Magnolias segun el caso.
- **Endpoint/componente:** InvitadosService y rutas protegidas del modulo de Invitados.
- **Pasos ejecutados:** Se ejecuto la prueba automatizada o auditoria del servicio, verificando validaciones, datos devueltos y efectos de persistencia definidos para el caso.
- **Resultado esperado:** Debe generarse un enlace identificable, enviarse mediante el servicio de correo y registrarse el evento en el historial RSVP.
- **Resultado obtenido:** generarInvitacionDigital exige correo, crea token/enlace, usa CorreoService y registra una entrada SISTEMA cuando existe RSVP.
- **Interpretacion:** El comportamiento implementado satisface el criterio tecnico evaluado.
- **Estado:** PASS
- **Evidencia tecnica:** La capacidad está implementada y cubierta por la auditoría de código y pruebas unitarias del módulo Invitados.
- **Observaciones:** La verificacion visual o de navegacion se conserva como actividad manual complementaria.

### CP-E06-HU37-02 - Registro de interacción sin alterar automáticamente RSVP

- **ID:** CP-E06-HU37-02
- **HU:** HU37
- **CA:** CA166
- **Tipo:** MIXTO
- **Objetivo:** Comprobar que una interaccion con la invitacion queda registrada sin cambiar automaticamente el RSVP.
- **Precondiciones:** Matrimonio activo, usuario autorizado y catalogos base cargados.
- **Datos utilizados:** Invitada Mariana Salazar Rios, RSVP pendiente o confirmado y mesa Jardin de Magnolias segun el caso.
- **Endpoint/componente:** InvitadosService y rutas protegidas del modulo de Invitados.
- **Pasos ejecutados:** Se ejecuto la prueba automatizada o auditoria del servicio, verificando validaciones, datos devueltos y efectos de persistencia definidos para el caso.
- **Resultado esperado:** La interaccion debe agregarse al historial digital y conservar el estado RSVP previo.
- **Resultado obtenido:** registrarInteraccionInvitacion crea RsvpHistorial con canal DIGITAL y devuelve el estado actual sin ejecutar actualizacion RSVP.
- **Interpretacion:** El comportamiento implementado satisface el criterio tecnico evaluado.
- **Estado:** PASS
- **Evidencia tecnica:** La capacidad está implementada y cubierta por la auditoría de código y pruebas unitarias del módulo Invitados.
- **Observaciones:** La verificacion visual o de navegacion se conserva como actividad manual complementaria.

### CP-E06-HU37-03 - Notificación a Wedding Planner por interacción

- **ID:** CP-E06-HU37-03
- **HU:** HU37
- **CA:** CA167
- **Tipo:** MIXTO
- **Objetivo:** Verificar la notificacion a la Wedding Planner cuando se registra una interaccion digital.
- **Precondiciones:** Matrimonio activo, usuario autorizado y catalogos base cargados.
- **Datos utilizados:** Invitada Mariana Salazar Rios, RSVP pendiente o confirmado y mesa Jardin de Magnolias segun el caso.
- **Endpoint/componente:** InvitadosService y rutas protegidas del modulo de Invitados.
- **Pasos ejecutados:** Se ejecuto la prueba automatizada o auditoria del servicio, verificando validaciones, datos devueltos y efectos de persistencia definidos para el caso.
- **Resultado esperado:** Si el repositorio de notificaciones esta disponible, debe crearse una notificacion dirigida al responsable del proyecto.
- **Resultado obtenido:** registrarInteraccionInvitacion crea Notificacion con tipo INVITADOS, destino del responsable y mensaje de la interaccion.
- **Interpretacion:** El comportamiento implementado satisface el criterio tecnico evaluado.
- **Estado:** PASS
- **Evidencia tecnica:** La capacidad está implementada y cubierta por la auditoría de código y pruebas unitarias del módulo Invitados.
- **Observaciones:** La verificacion visual o de navegacion se conserva como actividad manual complementaria.
