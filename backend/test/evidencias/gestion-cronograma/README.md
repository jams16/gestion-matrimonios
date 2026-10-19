# Evidencias: gestión de cronograma

## Objetivo

Centralizar evidencia de consulta, gestión y confirmación del cronograma operativo.

## Alcance

- `automatico/`: pruebas aisladas con repositorios en memoria.
- `manual/`: ejecución contra la BD configurada, sobre un proyecto existente en fase `INICIO`.

## Comandos

- Automático: `pnpm.cmd test:gestion-cronograma`
- Manual: `pnpm.cmd test:manual:gestion-cronograma`

El runner manual no crea matrimonios ni modifica tablas `cr_plantilla_*`. Sobrescribe sus evidencias y conserva los cambios operativos en BD.
