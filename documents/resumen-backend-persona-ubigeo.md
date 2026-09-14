# Resumen de implementación: Persona Natural y Ubigeo

## Qué se hizo

Se creó el módulo feature-first involucrados respetando el flujo presentation →
application → domain ← infrastructure. Incluye DTOs validados, entidades,
contrato de repositorio, implementación Prisma 8, casos de uso y controladores
REST para Persona Natural y Ubigeo.

Se agregó el formato global de respuestas { mensaje, data }, un filtro global
que no expone errores internos, validación global con transformación de query
params, y conexión Prisma centralizada.

Persona permite crear, consultar, editar, listar y desactivar lógicamente.
Los listados incluyen paginación, orden, búsqueda parcial case-insensitive,
mostrarTodos y los filtros solicitados. La importación acepta CSV o XLSX,
valida cada fila y continúa ante errores individuales.

## Por qué se hizo así

El README exige Clean Architecture, módulos feature-first y prohíbe acceder a
Prisma desde controllers o casos de uso. Por eso Prisma está encapsulado en el
repositorio de infraestructura y cada operación HTTP delega en un caso de uso.
La baja es lógica para preservar historial y relaciones. El catálogo Ubigeo se
registró como modelo de solo consulta porque ya existía y sus datos no debían
modificarse.

## Cómo se hizo

- Se inspeccionó PostgreSQL antes de modificarlo: in_ubigeo existía con código
  VARCHAR(6), departamento, provincia y distrito; in_persona_natural no existía.
- Se amplió prisma/contract.prisma, se emitieron los artefactos tipados y se
  aplicó una actualización aditiva de cuatro operaciones.
- Se creó in_persona_natural con campos, longitudes, nulabilidad, timestamps,
  DNI único, índice de ubigeo y FK restrictiva.
- Se configuró su secuencia para iniciar en 1000. No se alteró ni eliminó ningún
  dato de in_ubigeo.
- CSV se procesa con un parser local compatible con comillas escapadas; XLSX se
  procesa con ExcelJS. El límite HTTP es 10 MB.
- Se agregó cobertura unitaria con repositorio en memoria para no alterar datos
  reales durante las pruebas.

## Archivos principales

- backend/prisma/contract.prisma y artefactos emitidos.
- backend/src/common/: respuesta y manejo global de errores.
- backend/src/infrastructure/database/prisma/: conexión centralizada.
- backend/src/modules/involucrados/: dominio, DTOs, casos de uso, repositorio
  Prisma, controllers y pruebas.
- backend/src/app.module.ts y backend/src/main.ts: registro del módulo,
  validación, filtro e interceptor global.
- backend/README.md: reglas funcionales, parámetros y endpoints.
- backend/package.json, lockfile y configuración Jest/TypeScript.

## Endpoints y parámetros

- POST /api/v1/personas
- POST /api/v1/personas/importar, campo multipart archivo
- GET /api/v1/personas
- GET /api/v1/personas/:id
- PUT o PATCH /api/v1/personas/:id
- DELETE /api/v1/personas/:id
- GET /api/v1/ubigeos
- GET /api/v1/ubigeos/:id

Parámetros comunes: pagina, limite, ordenarPor, orden, buscar y mostrarTodos.
Los filtros detallados están documentados en el README.

## Dependencias nuevas

- exceljs: lectura de XLSX.
- @nestjs/mapped-types: DTO parcial de actualización.
- pg: driver PostgreSQL declarado directamente.
- temporal-polyfill: soporte TIMESTAMPTZ requerido por Prisma 8 sobre Node 24.
- @types/multer: tipos de desarrollo para archivos multipart.

## Verificaciones

- Prisma contract format/emit: correcto.
- Prisma migration check/status: correcto y base al día.
- Pruebas unitarias: 15/15 correctas.
- Prueba E2E: 1/1 correcta.
- Compilación NestJS: correcta.
- Lint: sin errores; permanecen cinco advertencias previas por archivos de
  configuración vacíos.
