# Resultado de ejecución

## 1. Identificación de la prueba
- Nombre: registro manual Wedding Planner.
- ID de ejecución: `manual-registro-wedding-planner`.
- Fecha/hora: 2026-10-19T22:43:46.246Z.
- Tipo: funcional.
- Entorno: configuración normal del backend y BD configurada.
- Objetivo: registrar, verificar y persistir una cuenta Wedding Planner.

## 2. Precondiciones
- Configuración normal de autenticación y cuenta de datos fijos disponible.

## 3. Datos de entrada
- Ver `datos-prueba.json` y `casos-prueba.json`.

## 4. Ejecución paso a paso

| Acción | Método/servicio | Esperado | Obtenido | HTTP | Comprobación BD | Evidencia | Estado |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Estado inicial | Endpoint real / correo capturado | Según escenario | No existe aún una cuenta con los datos fijos de prueba. | — | registros-creados.json | requests/responses JSON | PASS |
| Registro de Wedding Planner | Endpoint real / correo capturado | Según escenario | Se creó au_registro_pendiente en la BD. | 200 | registros-creados.json | requests/responses JSON | PASS |
| Correo de verificación generado | Endpoint real / correo capturado | Según escenario | Se capturó un único correo con código de seis dígitos. | — | registros-creados.json | requests/responses JSON | PASS |
| Verificación de cuenta | Endpoint real / correo capturado | Según escenario | El registro pendiente quedó confirmado en la BD. | 200 | registros-creados.json | requests/responses JSON | PASS |
| ESCENARIO A: creación nueva y verificación | Endpoint real / correo capturado | Según escenario | Se crearon Persona 1, Entidad 1 y Usuario 1 PROJECT_MANAGER verificado. | 201 | registros-creados.json | requests/responses JSON | PASS |

## 5. Registros creados/modificados
| Modelo/tabla | ID | Acción | Campos relevantes | Evidencia |
| --- | --- | --- | --- | --- |
| au_registro_pendiente / in_persona_natural / in_entidad / au_usuario | Ver JSON | Crear/verificar o rechazar duplicado | correo y perfil | registros-creados.json |

## 6. Validaciones realizadas
- Registro, correo, verificación y perfil.

## 7. Incidencias o warnings
- Ninguno.

## 8. Reproducción
- Comando: `pnpm.cmd test:manual:registro-wedding-planner`.
- La carpeta manual se sobrescribe; el runner no elimina registros de la BD.
