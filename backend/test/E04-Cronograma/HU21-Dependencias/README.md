# HU21 - Definir dependencias entre actividades

La HU comprueba que el cronograma conserve una secuencia logica, impida ciclos
y permita administrar las relaciones ya creadas.

- Pruebas automaticas: `automatico/casos.spec.ts`
- Casos manuales: `manual/casos-manuales.md`
- Evidencia producida por ejecucion: `evidencias/`

| Caso | CA | Cobertura |
|---|---|---|
| CP-E04-HU21-01 | CA100, CA101 | Crear predecesoras y rechazar ciclos directos o indirectos. |
| CP-E04-HU21-02 | CA102 | Eliminar dependencias previamente establecidas. |
| CP-E04-HU21-03 | CA103 | Identificacion visual de relaciones en la vista. |
| CP-E04-HU21-04 | CA104 | Persistencia al consultar actividades vinculadas. |
