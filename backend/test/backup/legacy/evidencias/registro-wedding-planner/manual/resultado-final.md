# Resultado final

## Resumen

| Métrica | Resultado |
|---|---|
| Casos ejecutados | 5 |
| PASS | 5 |
| FAIL | 0 |
| Resultado global | PASS |

## Casos de prueba

| ID | Caso | Tipo | Resultado esperado | Resultado obtenido | Estado |
|---|---|---|---|---|---|
| CP-MAN-01 | Estado inicial | FUNCIONAL | Según escenario | No existe aún una cuenta con los datos fijos de prueba. | PASS |
| CP-MAN-02 | Registro de Wedding Planner | FUNCIONAL | Según escenario | Se creó au_registro_pendiente en la BD. | PASS |
| CP-MAN-03 | Correo de verificación generado | FUNCIONAL | Según escenario | Se capturó un único correo con código de seis dígitos. | PASS |
| CP-MAN-04 | Verificación de cuenta | FUNCIONAL | Según escenario | El registro pendiente quedó confirmado en la BD. | PASS |
| CP-MAN-05 | ESCENARIO A: creación nueva y verificación | FUNCIONAL | Según escenario | Se crearon Persona 1, Entidad 1 y Usuario 1 PROJECT_MANAGER verificado. | PASS |

## Evidencias principales

| Evidencia | Archivo |
|---|---|
| Datos/casos | datos-prueba.json, casos-prueba.json |
| Requests/responses | requests.json, responses.json |
| Registros | registros-creados.json |
| Verificación | correo-verificacion.json |

## Resultado funcional
Se documentó el flujo real sin falsear el escenario A o B.

## Limitaciones
El resultado depende de que la cuenta fija exista o no en la BD.

## Reproducción
`pnpm.cmd test:manual:registro-wedding-planner`

## Conclusión
Resultado PASS.
