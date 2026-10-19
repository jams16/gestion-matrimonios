# Resultado del runner manual: registro Wedding Planner

- ID de ejecución: `manual-registro-wedding-planner`
- Fecha/hora: 2026-10-19T20:21:54.393Z
- Escenario: ESCENARIO B: intento de registro duplicado correctamente rechazado
- Objetivo: registrar, verificar y persistir una cuenta Wedding Planner en la BD configurada.
- Comando: `pnpm.cmd test:manual:registro-wedding-planner`
- Reportes JSON: datos-prueba.json, requests.json, responses.json, registros-creados.json, correo-verificacion.json

| Paso | Método/servicio | Esperado | Obtenido | HTTP | BD | Estado |
| --- | --- | --- | --- | --- | --- | --- |
| Estado inicial | Endpoint real / servicio de correo capturado | Correcto | Existe una cuenta previa con los datos fijos de prueba. | — | Ver registros-creados.json | PASS |
| ESCENARIO B: intento de registro duplicado correctamente rechazado | Endpoint real / servicio de correo capturado | Correcto | El backend rechazó el correo fijo ya registrado y no generó correo. | 409 | Ver registros-creados.json | PASS |

## Resultado global: PASS

## Errores/warnings
- Ninguno.

Los registros creados se conservan deliberadamente para su inspección; el runner no ejecuta limpieza ni rollback.
