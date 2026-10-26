# Evidencias: registro Wedding Planner

## Objetivo

Demostrar el registro, verificación y finalización de una cuenta Wedding Planner.

## Alcance

- `automatico/`: integración HTTP aislada con repositorio y correo capturado en memoria.
- `manual/`: flujo real contra la BD configurada; el correo se captura solo dentro del runner.

## Estructura

Cada modalidad contiene `resultado.md`, `resultado-final.md`, datos, casos, requests,
responses y registros. La evidencia específica es el correo/código de verificación.
Los archivos históricos previos se conservan mientras la siguiente ejecución automática
genera la estructura normalizada.

## Comandos

- Automático: `pnpm.cmd test:registro-wedding-planner`
- Manual: `pnpm.cmd test:manual:registro-wedding-planner`

## Interpretación

`PASS` representa un resultado comprobado; `FAIL` una diferencia real. El runner manual
sobrescribe su única carpeta `manual/` y no elimina registros de la BD.
