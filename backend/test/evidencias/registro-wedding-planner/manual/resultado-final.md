# Resultado final

## Resumen

| Métrica | Resultado |
|---|---|
| Casos ejecutados | 2 |
| PASS | 2 |
| FAIL | 0 |
| Resultado global | PASS |

## Casos de prueba

| ID | Caso | Tipo | Resultado esperado | Resultado obtenido | Estado |
|---|---|---|---|---|---|
| CP-MAN-01 | Estado inicial | FUNCIONAL | Detectar cuenta fija | Cuenta previa detectada | PASS |
| CP-MAN-02 | Registro duplicado | FUNCIONAL | HTTP 409 sin correo | HTTP 409 y sin correo | PASS |

## Evidencias principales

| Evidencia | Archivo |
|---|---|
| Datos | datos-prueba.json |
| Solicitud/respuesta | requests.json, responses.json |
| Persistencia | registros-creados.json |
| Correo | correo-verificacion.json |

## Resultado funcional

La cuenta fija existente fue rechazada correctamente como duplicada.

## Limitaciones

Este resultado histórico corresponde al escenario B; no crea una segunda cuenta.

## Reproducción

`pnpm.cmd test:manual:registro-wedding-planner`

## Conclusión

La protección contra duplicado terminó en PASS.
