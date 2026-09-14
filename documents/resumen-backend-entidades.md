# Resumen de implementación: Entidades

## Cambios realizados

Se extendió el módulo existente Involucrados con Entidad, manteniendo sus capas
presentation, application, domain e infrastructure. Se añadieron DTOs, enum de
dominio, entidad, contrato de repositorio, repositorio Prisma 8, casos de uso,
controlador REST y pruebas unitarias.

## Base de datos y Prisma

Se verificó que in_entidad y el enum no existían. Se creó in_entidad con RUC
único opcional, datos comerciales, estado activo, timestamps, índice y FK
restrictiva a in_ubigeo. No se destruyeron datos ni se modificó in_ubigeo.

id_entidad es SERIAL/autoincremental y su secuencia fue configurada para
comenzar en 1000. Prisma 8 representa in_tipo_entidad como un enum de dominio:
la columna tipo_entidad es texto restringido por CHECK a PUBLICA, PRIVADA,
RELIGIOSA y OTROS.

## API y Swagger

Se implementaron:

- POST /api/v1/entidades
- GET /api/v1/entidades
- GET /api/v1/entidades/:id
- PUT y PATCH /api/v1/entidades/:id
- DELETE /api/v1/entidades/:id
- POST /api/v1/entidades/importar

Los endpoints devuelven { mensaje, data }. Los errores devuelven data null por
el filtro global existente. Swagger documenta DTOs, enum, endpoints, parámetros
de listado, importación multipart y respuestas.

## Validaciones y comportamiento

Se valida nombre comercial, tipo de entidad, RUC de 11 dígitos y único, correo,
longitudes y ubigeo. El listado permite paginación, orden, búsqueda parcial,
mostrarTodos y filtros por entidad, estado y ubicación. La eliminación es
lógica. CSV y XLSX validan fila por fila sin cancelar registros válidos.

## Archivos principales

- backend/prisma/contract.prisma y artefactos Prisma emitidos.
- backend/src/modules/involucrados/domain/enums/tipo-entidad.enum.ts.
- backend/src/modules/involucrados/domain/entities/entidad.entity.ts.
- backend/src/modules/involucrados/application/dto/*entidad*.
- backend/src/modules/involucrados/application/use-cases/entidades.use-cases.ts.
- backend/src/modules/involucrados/infrastructure/persistence/repositories/prisma-involucrados.repository.ts.
- backend/src/modules/involucrados/presentation/controllers/entidades.controller.ts.
- backend/src/modules/involucrados/application/use-cases/entidades.use-cases.spec.ts.
- backend/README.md.

## Dependencias nuevas

No se añadieron dependencias para Entidad: se reutilizaron ExcelJS, Swagger,
class-validator, class-transformer y Prisma 8 ya presentes.

## Verificaciones

- Prisma contract format, emit y migration check: correctos.
- Base de datos actualizada mediante cuatro operaciones aditivas y migración
  versionada `20260914T1803_add_entidad`: correcto.
- Pruebas unitarias: 23 correctas; pruebas e2e: 1 correcta.
- Formato: correcto. Lint sin errores; conserva cinco advertencias preexistentes
  de configuraciones vacías.
- Compilación NestJS: correcta.
