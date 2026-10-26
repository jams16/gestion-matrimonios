# Resultado automático HU04-Mi-perfil

| Caso | Estado | Resultado obtenido |
|---|---|---|
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
