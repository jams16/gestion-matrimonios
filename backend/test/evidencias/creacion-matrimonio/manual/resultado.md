# Resultado de ejecución

- ID de ejecución: `manual-creacion-matrimonio-SIMBOLICO-1792449879846`
- Fecha/hora: 2026-10-19T22:44:41.281Z
- Comando: `pnpm.cmd test:manual:creacion-matrimonio -- --tipo=SIMBOLICO`

| Caso | Resultado esperado | Resultado real | Regla | Origen | Intento | Estado |
| --- | --- | --- | --- | --- | --- | --- |
| Matrimonio A válido | A crea proyecto INICIO, ceremonia solicitada y cronograma. | A creado correctamente. | Caso base | {"idProyecto":"ab47da9d-4c91-492e-94b0-be47f82ed6aa","idMatrimonio":"e041e273-97e5-42ee-92e7-97a229a1ae9d","fase":2,"dni":"99880409"} | {} | PASS |
| Duplicado WP + fecha | Ya tienes un matrimonio activo para la misma fecha. | Ya tienes un matrimonio activo para la misma fecha. | Wedding Planner + fecha | {"idProyecto":"ab47da9d-4c91-492e-94b0-be47f82ed6aa","idMatrimonio":"e041e273-97e5-42ee-92e7-97a229a1ae9d","fase":2,"dni":null} | {"fecha":"2027-10-19","dni1":"99880411","dni2":"99880412"} | PASS |
| DNI en matrimonio no cerrado | Una persona de la pareja ya participa en un matrimonio que no está en cierre. | Una persona de la pareja ya participa en un matrimonio que no está en cierre. | DNI en proyecto no CIERRE | {"idProyecto":"ab47da9d-4c91-492e-94b0-be47f82ed6aa","idMatrimonio":"e041e273-97e5-42ee-92e7-97a229a1ae9d","fase":2,"dni":"99880409"} | {"fecha":"2027-10-20","dniReutilizado":"99880409","dniNuevo":"99880413"} | PASS |
| Fecha insuficiente | La fecha del matrimonio debe estar al menos a 30 días de hoy. | La fecha del matrimonio debe estar al menos a 30 días de hoy. | Fecha mínima | {} | {"fecha":"2026-10-20","dni1":"99880415","dni2":"99880416"} | PASS |
| Mismo DNI después de CIERRE | C crea proyecto nuevo INICIO y cronograma propio. | C creado con proyecto distinto después del cierre de A. | DNI permitido tras CIERRE | {"idProyecto":"ab47da9d-4c91-492e-94b0-be47f82ed6aa","idMatrimonio":"e041e273-97e5-42ee-92e7-97a229a1ae9d","fase":6,"dni":"99880409"} | {"idProyecto":"eb03491c-9ca4-4cbb-996d-ef9c1cb245f4","idMatrimonio":"4e505057-c952-4081-bc17-435bfb37c9c2","fase":2,"dni":"99880409"} | PASS |

## Resultado global: PASS

Ver `datos-prueba.json`, `requests.json`, `responses.json` y `registros-creados.json`.
