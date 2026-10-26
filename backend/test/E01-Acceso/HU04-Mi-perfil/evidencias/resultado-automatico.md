# Resultado automático HU04-Mi-perfil

| Caso | Estado | Resultado obtenido |
|---|---|---|
| CP-E01-HU04-01 | FAIL | expect(received).toHaveProperty(path)

Expected path: "nombres"
Received path: []

Received value: {"correoVerificado": true, "esActivo": true, "fechaCreacion": "2026-10-26T21:29:16.864753Z", "fechaModificacion": "2026-10-26T21:29:17.043Z", "idEntidad": 33, "idPersonaNatural": 68, "idUsuario": 68, "tipoUsuario": "PROJECT_MANAGER", "ultimoAcceso": "2026-10-26T21:29:17.038Z", "usuario": "claudia.benites.212901.1"} |
| CP-E01-HU04-02 | FAIL | expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 400 |
| CP-E01-HU04-03 | FAIL | expect(received).toMatch(expected)

Expected pattern: /email/i
Received string:  "property correoElectronico should not exist" |
