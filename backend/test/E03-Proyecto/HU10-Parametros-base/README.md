# HU10 — Configurar parámetros base y alcance del matrimonio

La HU10 cubre el registro de información inicial, su conservación como base
del proyecto, la selección/configuración de una EDT y la generación posterior
del cronograma e hitos desde esa EDT.

- Casos manuales detallados: [manual/casos-manuales.md](manual/casos-manuales.md)
- Matriz completa de E03: [../casos-prueba-detallados.md](../casos-prueba-detallados.md)
- Pruebas automáticas: `automatico/casos.spec.ts`
- Evidencia producida por ejecución: `evidencias/`

Los criterios de aceptación son:

1. **CA046:** registrar y validar datos iniciales obligatorios.
2. **CA047:** conservarlos como configuración base del matrimonio.
3. **CA048:** seleccionar y personalizar una EDT propia sin mutar su plantilla.
4. **CA049:** revisar los datos, alcance y EDT antes de confirmar.
5. **CA050:** al confirmar, instanciar EDT y generar cronograma e hitos
   aplicables e independientes de las plantillas.
