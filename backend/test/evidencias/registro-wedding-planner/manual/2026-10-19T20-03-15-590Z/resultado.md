# Resultado del runner manual: registro Wedding Planner

- ID de ejecución: `manual-wp-1792440195590`
- Fecha/hora: 2026-10-19T20:03:15.590Z
- Objetivo: registrar, verificar y persistir una cuenta Wedding Planner en la BD configurada.
- Comando: `pnpm.cmd test:manual:registro-wedding-planner`
- Reportes JSON: datos-prueba.json, requests.json, responses.json, registros-creados.json, correo-verificacion.json

| Paso | Método/servicio | Esperado | Obtenido | HTTP | BD | Estado |
| --- | --- | --- | --- | --- | --- | --- |
| Estado inicial | Endpoint real / servicio de correo capturado | Correcto | No existen registros con el correo de prueba. | — | Ver registros-creados.json | PASS |
| Registro de Wedding Planner | Endpoint real / servicio de correo capturado | Correcto | Se creó au_registro_pendiente en la BD. | 200 | Ver registros-creados.json | PASS |
| Correo de verificación generado | Endpoint real / servicio de correo capturado | Correcto | Se capturó un único correo con código de seis dígitos. | — | Ver registros-creados.json | PASS |
| Verificación de cuenta | Endpoint real / servicio de correo capturado | Correcto | El registro pendiente quedó confirmado en la BD. | 200 | Ver registros-creados.json | PASS |
| Persistencia y estado final | Endpoint real / servicio de correo capturado | Correcto | Se crearon Persona 1, Entidad 1 y Usuario 1 PROJECT_MANAGER verificado. | 201 | Ver registros-creados.json | PASS |

## Resultado global: PASS

## Errores/warnings
- Ninguno.

Los registros creados se conservan deliberadamente para su inspección; el runner no ejecuta limpieza ni rollback.
