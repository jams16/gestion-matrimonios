# Resultado final E06-Invitados

| Metrica | Resultado |
|---|---:|
| Casos conceptuales | 24 |
| Ejecuciones Jest | 24 |
| PASS conceptual | 8 |
| FAIL conceptual | 16 |

## Tabla principal

| Caso | Nombre | CA | Tipo | Estado | Resultado obtenido | Interpretacion |
|---|---|---|---|---|---|---|
| CP-E06-HU30-01 | Registro y consulta de invitado | CA144 | AUTOMATIZADO | PASS | La capacidad evaluada existe en Invitados. | Criterio tecnico cubierto. |
| CP-E06-HU30-02 | Validacion de datos del invitado | CA145 | AUTOMATIZADO | FAIL | La capacidad no esta implementada completamente. | Funcionalidad no implementada o incompleta. |
| CP-E06-HU30-03 | Edicion de invitado | CA146 | AUTOMATIZADO | PASS | La capacidad evaluada existe en Invitados. | Criterio tecnico cubierto. |
| CP-E06-HU30-04 | Retiro del invitado y actualizacion del total | CA147 | AUTOMATIZADO | PASS | La capacidad evaluada existe en Invitados. | Criterio tecnico cubierto. |
| CP-E06-HU31-01 | Clasificacion y filtrado por relacion | CA148 | AUTOMATIZADO | PASS | La capacidad evaluada existe en Invitados. | Criterio tecnico cubierto. |
| CP-E06-HU31-02 | Cambio y retiro del filtro | CA149 | AUTOMATIZADO | PASS | La capacidad evaluada existe en Invitados. | Criterio tecnico cubierto. |
| CP-E06-HU31-03 | Filtrado por colaborador autorizado | CA150 | AUTOMATIZADO | FAIL | La capacidad no esta implementada completamente. | Funcionalidad no implementada o incompleta. |
| CP-E06-HU32-01 | Gestion de requerimientos alimentarios | CA151 | AUTOMATIZADO | PASS | La capacidad evaluada existe en Invitados. | Criterio tecnico cubierto. |
| CP-E06-HU32-02 | Filtro y resumen por requerimiento alimentario | CA152 | AUTOMATIZADO | FAIL | La capacidad no esta implementada completamente. | Funcionalidad no implementada o incompleta. |
| CP-E06-HU32-03 | Exportacion del listado alimentario | CA153 | AUTOMATIZADO | FAIL | La capacidad no esta implementada completamente. | Funcionalidad no implementada o incompleta. |
| CP-E06-HU33-01 | Asignacion y consulta por mesa | CA154 | AUTOMATIZADO | FAIL | La capacidad no esta implementada completamente. | Funcionalidad no implementada o incompleta. |
| CP-E06-HU33-02 | Reasignacion de mesa sin duplicidad | CA155 | AUTOMATIZADO | FAIL | La capacidad no esta implementada completamente. | Funcionalidad no implementada o incompleta. |
| CP-E06-HU33-03 | Representacion grafica de mesas | CA156 | MANUAL | FAIL | La capacidad no esta implementada completamente. | Funcionalidad no implementada o incompleta. |
| CP-E06-HU34-01 | Calculo de asistencia confirmada | CA157 | AUTOMATIZADO | FAIL | La capacidad no esta implementada completamente. | Funcionalidad no implementada o incompleta. |
| CP-E06-HU34-02 | Pendientes de respuesta y actualizacion estadistica | CA158 | AUTOMATIZADO | FAIL | La capacidad no esta implementada completamente. | Funcionalidad no implementada o incompleta. |
| CP-E06-HU34-03 | Permisos sobre estadisticas de invitados | CA159 | AUTOMATIZADO | FAIL | La capacidad no esta implementada completamente. | Funcionalidad no implementada o incompleta. |
| CP-E06-HU35-01 | Gestion y actualizacion del RSVP | CA160 | AUTOMATIZADO | PASS | La capacidad evaluada existe en Invitados. | Criterio tecnico cubierto. |
| CP-E06-HU35-02 | Fechas de seguimiento RSVP | CA161 | AUTOMATIZADO | FAIL | La capacidad no esta implementada completamente. | Funcionalidad no implementada o incompleta. |
| CP-E06-HU35-03 | Recordatorios unicamente para RSVP pendientes | CA162 | AUTOMATIZADO | FAIL | La capacidad no esta implementada completamente. | Funcionalidad no implementada o incompleta. |
| CP-E06-HU36-01 | Ordenamiento alfabetico combinado con filtros | CA163 | AUTOMATIZADO | PASS | La capacidad evaluada existe en Invitados. | Criterio tecnico cubierto. |
| CP-E06-HU36-02 | Persistencia de la preferencia de ordenamiento | CA164 | AUTOMATIZADO | FAIL | La capacidad no esta implementada completamente. | Funcionalidad no implementada o incompleta. |
| CP-E06-HU37-01 | Generacion y envio de invitacion digital | CA165 | MIXTO | FAIL | La capacidad no esta implementada completamente. | Funcionalidad no implementada o incompleta. |
| CP-E06-HU37-02 | Registro de interaccion sin alterar automaticamente RSVP | CA166 | MIXTO | FAIL | La capacidad no esta implementada completamente. | Funcionalidad no implementada o incompleta. |
| CP-E06-HU37-03 | Notificacion a Wedding Planner por interaccion | CA167 | MIXTO | FAIL | La capacidad no esta implementada completamente. | Funcionalidad no implementada o incompleta. |

## Resultados por HU

HU30: 3/4 PASS; HU31: 2/3 PASS; HU32: 1/3 PASS; HU33: 0/3 PASS; HU34: 0/3 PASS; HU35: 1/3 PASS; HU36: 1/2 PASS; HU37: 0/3 PASS.

## Pruebas unitarias

No se agregaron pruebas unitarias artificiales.

## Detalle tecnico

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

## Fallos reales de la aplicacion

Faltan colaborador autorizado, estadisticas RSVP, seguimiento/recordatorios, preferencia de orden e invitacion digital. La asignacion a mesa no valida RSVP confirmado ni incluye reasignacion directa.

## Funcionalidades no implementadas

Exportacion alimentaria, reportes, invitacion digital y notificaciones de invitacion.

## Errores encontrados en los tests

Ninguno.

## Tests corregidos y reejecutados

No aplico.

## Casos manuales pendientes

Representacion grafica de mesas, preferencia visual de orden e invitacion digital.
