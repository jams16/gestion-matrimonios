# Resultado de ejecución

- ID de ejecución: `manual-creacion-matrimonio-RELIGIOSO_CIVIL-1792447474677`
- Fecha/hora: 2026-10-19T22:04:36.057Z
- Comando: `pnpm.cmd test:manual:creacion-matrimonio -- --tipo=RELIGIOSO_CIVIL`

| Caso | Resultado esperado | Resultado real | Regla | Origen | Intento | Estado |
| --- | --- | --- | --- | --- | --- | --- |
| Matrimonio A válido | A crea proyecto INICIO, ceremonia solicitada y cronograma. | A creado correctamente. | Caso base | {"idProyecto":"983fb367-a9a3-4e33-a10b-0ffcdc345462","idMatrimonio":"5830a8f8-1e7c-4b53-80d5-f0bd175b7756","fase":2,"dni":"97475256"} | {} | PASS |
| Duplicado WP + fecha | Ya tienes un matrimonio activo para la misma fecha. | Ya tienes un matrimonio activo para la misma fecha. | Wedding Planner + fecha | {"idProyecto":"983fb367-a9a3-4e33-a10b-0ffcdc345462","idMatrimonio":"5830a8f8-1e7c-4b53-80d5-f0bd175b7756","fase":2,"dni":null} | {"fecha":"2027-10-19","dni1":"97475258","dni2":"97475259"} | PASS |
| DNI en matrimonio no cerrado | Una persona de la pareja ya participa en un matrimonio que no está en cierre. | Una persona de la pareja ya participa en un matrimonio que no está en cierre. | DNI en proyecto no CIERRE | {"idProyecto":"983fb367-a9a3-4e33-a10b-0ffcdc345462","idMatrimonio":"5830a8f8-1e7c-4b53-80d5-f0bd175b7756","fase":2,"dni":"97475256"} | {"fecha":"2027-10-20","dniReutilizado":"97475256","dniNuevo":"97475260"} | PASS |
| Fecha insuficiente | La fecha del matrimonio debe estar al menos a 30 días de hoy. | La fecha del matrimonio debe estar al menos a 30 días de hoy. | Fecha mínima | {} | {"fecha":"2026-10-20","dni1":"97475262","dni2":"97475263"} | PASS |
| Mismo DNI después de CIERRE | C crea proyecto nuevo INICIO y cronograma propio. | C creado con proyecto distinto después del cierre de A. | DNI permitido tras CIERRE | {"idProyecto":"983fb367-a9a3-4e33-a10b-0ffcdc345462","idMatrimonio":"5830a8f8-1e7c-4b53-80d5-f0bd175b7756","fase":6,"dni":"97475256"} | {"idProyecto":"523fa566-acf3-47d3-ade5-028890f7418b","idMatrimonio":"bc9b747e-43ab-4f26-a463-eaa822479ebc","fase":2,"dni":"97475256"} | PASS |

## Resultado global: PASS

Ver `datos-prueba.json`, `requests.json`, `responses.json` y `registros-creados.json`.
