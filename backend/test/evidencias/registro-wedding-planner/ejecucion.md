# Ejecución

- Objetivo: comprobar el flujo real de registro Wedding Planner.
- Tipo: integración funcional HTTP con repositorio y correo de prueba aislados.
- Entorno: Nest TestingModule, `NODE_ENV=test`, sin conexión SMTP ni escritura en la base de desarrollo.
- Comando: `pnpm.cmd test:registro-wedding-planner`.
- Identificador: `wp-prueba-1792439385948`.

| Paso | Endpoint | Input | Status | Comprobación | Resultado |
| --- | --- | --- | --- | --- | --- |
| Estado inicial | Repositorio de prueba | Correo único | — | Sin persona, usuario ni registro pendiente | PASS |
| Solicitud | POST /api/v1/auth/registro/solicitar | requests/01-registro.json | 200 | Se creó `au_registro_pendiente` lógico y se capturó un correo | PASS |
| Confirmación | POST /api/v1/auth/registro/confirmar | Código capturado, enmascarado en requests/02-verificacion.json | 200 | `fecha_verificacion` quedó registrada | PASS |
| Finalización | POST /api/v1/auth/registro/finalizar | Código real solo en memoria | 201 | Persona, Entidad PRIVADA y Usuario PROJECT_MANAGER verificado | PASS |

El código se obtiene del correo capturado, se valida como seis dígitos y nunca se escribe sin máscara. Para repetir desde cero no es necesaria limpieza: el correo y usuario se generan con timestamp.
