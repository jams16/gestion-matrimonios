# Resultado de ejecución

## 1. Identificación de la prueba
- Nombre: registro Wedding Planner automático.
- ID de ejecución: `wp-prueba-1792446243939`.
- Fecha/hora: 2026-10-19T21:44:03.939Z.
- Tipo: integración funcional.
- Entorno: Nest TestingModule aislado.
- Objetivo: registro, verificación y creación de perfil.

## 2. Precondiciones
- Repositorio y correo de prueba en memoria.

## 3. Datos de entrada
- Ver `datos-prueba.json`.

## 4. Ejecución paso a paso
| Acción | Método/endpoint | Esperado | Obtenido | HTTP | Comprobación BD | Evidencia | Estado |
|---|---|---|---|---|---|---|---|
| Solicitud | POST /auth/registro/solicitar | Pendiente y código | Generado | 200 | Repositorio en memoria | requests.json | PASS |
| Confirmación | POST /auth/registro/confirmar | Verificar código | Confirmado | 200 | fecha_verificacion | responses.json | PASS |
| Finalización | POST /auth/registro/finalizar | Perfil Wedding Planner | PROJECT_MANAGER | 201 | Persona, entidad y usuario | registros-generados.json | PASS |

## 5. Registros creados/modificados
| Modelo/tabla | ID | Acción | Campos relevantes | Evidencia |
|---|---|---|---|---|
| au_registro_pendiente / in_persona_natural / in_entidad / au_usuario | Ver JSON | Crear/verificar | PRIVADA, PROJECT_MANAGER, correo verificado | registros-generados.json |

## 6. Validaciones realizadas
- Código de seis dígitos, perfil y verificación.

## 7. Incidencias o warnings
- No se valida PostgreSQL físico.

## 8. Reproducción
- `pnpm.cmd test:registro-wedding-planner`
