# Resultado final

## Resumen

| Métrica | Resultado |
|---|---|
| Casos ejecutados | 1 |
| PASS | 0 |
| FAIL | 1 |
| Resultado global | FAIL |

## Casos de prueba

| ID | Caso | Tipo | Resultado esperado | Resultado obtenido | Estado |
|---|---|---|---|---|---|
| CP-MAN-01 | Ejecución | FUNCIONAL | Según regla | Nest can't resolve dependencies of the PrismaCronogramaRepository (PrismaService, ?). Please make sure that the argument at index [1] is available in the current module.

Potential solutions:
- The dependency at index [1] appears to be undefined at runtime
- This commonly occurs when using 'import type' instead of 'import' for injectable classes
- Check your imports and change:
  ❌ import type { SomeService } from './some.service';
  ✅ import { SomeService } from './some.service';
- Ensure the imported class is decorated with @Injectable() or is a valid provider
- If using dynamic imports, ensure the class is available at runtime, not just for type checking

For more common dependency resolution issues, see: https://docs.nestjs.com/faq/common-errors | FAIL |

## Evidencias principales

| Evidencia | Archivo |
|---|---|
| Entradas | datos-prueba.json |
| Registros | registros-creados.json |
| Cronograma | cronograma-generado.json |
| Casos negativos | casos-negativos.json |

## Resultado funcional
El runner ejecutó el flujo real sin limpieza de datos.

## Limitaciones
Las cantidades dependen de las plantillas activas en la BD.

## Reproducción
`pnpm.cmd test:manual:creacion-matrimonio -- --tipo=SIMBOLICO`

## Conclusión
Resultado FAIL conforme a las evidencias listadas.
