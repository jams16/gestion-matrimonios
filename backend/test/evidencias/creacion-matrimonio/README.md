# Evidencias: creación de matrimonio

## Objetivo

Centralizar evidencia reproducible de la creación de matrimonio, proyecto y cronograma.

## Alcance

- `automatico/`: pruebas aisladas de reglas de fecha, filtrado y dependencias.
- `manual/`: ejecución del caso de uso real contra la BD configurada; conserva los datos.

## Estructura

Cada modalidad contiene `resultado.md`, `resultado-final.md`, datos, casos, requests,
responses y registros. La evidencia específica de este flujo es el cronograma, las fechas,
las relaciones y el filtrado de ceremonia.

## Comandos

- Automático: `pnpm.cmd test:creacion-matrimonio`
- Manual: `pnpm.cmd test:manual:creacion-matrimonio -- --tipo=SIMBOLICO`

Tipos disponibles: `CIVIL`, `RELIGIOSO`, `RELIGIOSO_CIVIL` y `SIMBOLICO`.

## Interpretación

`PASS` confirma la regla indicada; `FAIL` registra una diferencia real. `WARN` no se
cuenta como éxito funcional y documenta una condición inspeccionable, por ejemplo la
ausencia de plantillas activas. El runner manual sobrescribe sus archivos, no la BD.
