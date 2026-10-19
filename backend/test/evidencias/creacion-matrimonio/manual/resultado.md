# Resultado de ejecución

## 1. Identificación de la prueba
- Nombre: creación manual de matrimonio (SIMBOLICO).
- ID de ejecución: `manual-creacion-matrimonio-SIMBOLICO`.
- Fecha/hora: 2026-10-19T21:13:34.971Z.
- Tipo: funcional.
- Entorno: configuración normal del backend y base de datos configurada.
- Objetivo: crear y verificar un matrimonio mediante el caso de uso real.

## 2. Precondiciones
- Existe un Wedding Planner activo y los catálogos requeridos.

## 3. Datos de entrada
- Ver `datos-prueba.json` y `casos-prueba.json`.

## 4. Ejecución paso a paso

| Acción | Método/servicio | Esperado | Obtenido | HTTP | Comprobación BD | Evidencia | Estado |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Ejecución | GuardarOnboardingMatrimonioUseCase | Según regla | Nest can't resolve dependencies of the PrismaCronogramaRepository (PrismaService, ?). Please make sure that the argument at index [1] is available in the current module.

Potential solutions:
- The dependency at index [1] appears to be undefined at runtime
- This commonly occurs when using 'import type' instead of 'import' for injectable classes
- Check your imports and change:
  ❌ import type { SomeService } from './some.service';
  ✅ import { SomeService } from './some.service';
- Ensure the imported class is decorated with @Injectable() or is a valid provider
- If using dynamic imports, ensure the class is available at runtime, not just for type checking

For more common dependency resolution issues, see: https://docs.nestjs.com/faq/common-errors | N/A | registros-creados.json | JSON de ejecución | FAIL |

## 5. Registros creados/modificados
| Modelo/tabla | ID | Acción | Campos relevantes | Evidencia |
| --- | --- | --- | --- | --- |
| gp_proyecto / gp_matrimonio / cr_* | Ver JSON | Crear, reutilizar o actualizar | fase, estado, ceremonia y cronograma | registros-creados.json |

## 6. Validaciones realizadas
- Fase INICIO, estado activo, ceremonia, dependencias, DNI, fecha mínima y Wedding Planner+fecha.

## 7. Incidencias o warnings
- Nest can't resolve dependencies of the PrismaCronogramaRepository (PrismaService, ?). Please make sure that the argument at index [1] is available in the current module.

Potential solutions:
- The dependency at index [1] appears to be undefined at runtime
- This commonly occurs when using 'import type' instead of 'import' for injectable classes
- Check your imports and change:
  ❌ import type { SomeService } from './some.service';
  ✅ import { SomeService } from './some.service';
- Ensure the imported class is decorated with @Injectable() or is a valid provider
- If using dynamic imports, ensure the class is available at runtime, not just for type checking

For more common dependency resolution issues, see: https://docs.nestjs.com/faq/common-errors

## 8. Reproducción
- Comando: `pnpm.cmd test:manual:creacion-matrimonio -- --tipo=SIMBOLICO`.
- La carpeta manual se sobrescribe; los registros de BD no se eliminan.
