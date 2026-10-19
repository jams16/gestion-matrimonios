# Resultado final

| Paso | Tipo de prueba | Resultado | Evidencia | PASS/FAIL |
| --- | --- | --- | --- | --- |
| Estado inicial | Integracion funcional | Sin registros de esta ejecucion | bd/00-estado-inicial.json | PASS |
| Solicitud de registro | Integracion funcional | Registro pendiente y correo capturado | requests/01-registro.json, correo/01-correo-verificacion.json | PASS |
| Confirmacion | Integracion funcional | Codigo valido confirma el registro | requests/02-verificacion.json, responses/02-verificacion.json | PASS |
| Finalizacion | Integracion funcional | Persona, Entidad PRIVADA y PROJECT_MANAGER verificado | bd/02-despues-verificacion.json, responses/02-finalizar.json | PASS |
| Adaptador PostgreSQL fisico | Infraestructura | DATABASE_URL_TEST no esta configurada | Limitacion documentada | FAIL |

- Pruebas unitarias: 5 PASS; registro pendiente, destinatario, codigo valido, invalido, expirado y reutilizado. Usuario inexistente no aplica: el usuario se crea al finalizar.
- Prueba funcional: pnpm.cmd test:registro-wedding-planner.
- Total: 9 PASS / 1 FAIL.
- Limitacion: se utiliza persistencia de prueba en memoria para no escribir en una base ajena. Configure DATABASE_URL_TEST y una prueba PostgreSQL dedicada para validar el adaptador Prisma fisico.
