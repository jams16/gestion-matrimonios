# Resultado final E01-Acceso

| Métrica | Resultado |
|---|---:|
| Casos automáticos ejecutados | 24 |
| PASS | 13 |
| FAIL | 11 |
| Resultado global | FAIL |

## Resultados por caso

| Caso | Estado | Resultado obtenido |
|---|---|---|
| CP-E01-HU01-01 | PASS | El comportamiento observado cumplió el resultado esperado. |
| CP-E01-HU01-02 | PASS | El comportamiento observado cumplió el resultado esperado. |
| CP-E01-HU01-02 | PASS | El comportamiento observado cumplió el resultado esperado. |
| CP-E01-HU01-02 | PASS | El comportamiento observado cumplió el resultado esperado. |
| CP-E01-HU01-02 | PASS | El comportamiento observado cumplió el resultado esperado. |
| CP-E01-HU01-03 | FAIL | La API no implementa un campo de confirmación de contraseña; el rechazo proviene de forbidNonWhitelisted y no de la regla CA002. |
| CP-E01-HU01-04 | PASS | El comportamiento observado cumplió el resultado esperado. |
| CP-E01-HU02-01 | FAIL | El mecanismo real es un código de seis dígitos; CA006 exige un enlace único en el correo. |
| CP-E01-HU02-02 | PASS | El comportamiento observado cumplió el resultado esperado. |
| CP-E01-HU02-03 | PASS | El comportamiento observado cumplió el resultado esperado. |
| CP-E01-HU02-04 | PASS | El comportamiento observado cumplió el resultado esperado. |
| CP-E01-HU02-05 | FAIL | expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    2 |
| CP-E01-HU03-01 | PASS | El comportamiento observado cumplió el resultado esperado. |
| CP-E01-HU03-02 | PASS | El comportamiento observado cumplió el resultado esperado. |
| CP-E01-HU03-03 | PASS | El comportamiento observado cumplió el resultado esperado. |
| CP-E01-HU03-04 | PASS | El comportamiento observado cumplió el resultado esperado. |
| CP-E01-HU04-01 | FAIL | expect(received).toHaveProperty(path)

Expected path: "nombres"
Received path: []

Received value: {"correoVerificado": true, "esActivo": true, "fechaCreacion": "2026-10-26T20:39:42.290847Z", "fechaModificacion": "2026-10-26T20:39:42.47Z", "idEntidad": 24, "idPersonaNatural": 27, "idUsuario": 27, "tipoUsuario": "PROJECT_MANAGER", "ultimoAcceso": "2026-10-26T20:39:42.468Z", "usuario": "e01hu04read17930471820751"} |
| CP-E01-HU04-02 | FAIL | expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 400 |
| CP-E01-HU04-03 | FAIL | expect(received).toMatch(expected)

Expected pattern: /email/i
Received string:  "property correoElectronico should not exist" |
| CP-E01-HU05-02 | FAIL | expect(received).toBe(expected) // Object.is equality

Expected: 401
Received: 200 |
| CP-E01-HU05-03 | FAIL | expect(received).toMatch(expected)

Matcher error: received value must be a string

Received has value: undefined |
| CP-E01-HU06-01 | FAIL | expect(received).toBe(expected) // Object.is equality

Expected: 401
Received: 200 |
| CP-E01-HU06-03 | FAIL | expect(received).toBe(expected) // Object.is equality

Expected: 401
Received: 200 |
| CP-E01-HU06-05 | FAIL | expect(received).toBe(expected) // Object.is equality

Expected: 401
Received: 200 |
