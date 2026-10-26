# Clasificación de casos E01-Acceso

| Caso | Clasificación | Alcance automatizado |
|---|---|---|
| CP-E01-HU01-01 a 04 | AUTOMATIZADO | API de registro, validación, duplicado y persistencia observable. |
| CP-E01-HU02-01 a 05 | AUTOMATIZADO | API, códigos de correo capturados y validaciones de verificación. |
| CP-E01-HU03-01 a 03 | AUTOMATIZADO | API de inicio de sesión. |
| CP-E01-HU03-04 | MIXTO | API de refresh; persistencia tras reapertura Flutter queda manual. |
| CP-E01-HU04-01 a 03 | AUTOMATIZADO | API de perfil; actualmente revela ausencias funcionales. |
| CP-E01-HU05-01 | MANUAL | Visibilidad y confirmación del control Flutter. |
| CP-E01-HU05-02 | MIXTO | Revocación API automática; confirmación/redirección Flutter manual. |
| CP-E01-HU05-03 | AUTOMATIZADO | Se verifica configuración real de inactividad. |
| CP-E01-HU06-01, 03 y 05 | AUTOMATIZADO | Aislamiento/autorización y filtros del endpoint real. |
| CP-E01-HU06-02 y 04 | MANUAL | Contexto activo y selector son estado de frontend, sin endpoint backend actual. |

Totales: **19 automatizados**, **3 manuales** y **2 mixtos** (24 casos definidos).
