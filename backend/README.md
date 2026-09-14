# Backend — Aplicación de Gestión de Proyectos Especializada en Matrimonios

Backend de la aplicación multiplataforma de gestión de proyectos especializada en la organización de matrimonios.

La aplicación utiliza una arquitectura cliente-servidor. Este backend constituye el único punto autorizado para ejecutar reglas de negocio, validar permisos, acceder a PostgreSQL, administrar archivos e interactuar con servicios externos.

---

# 1. Stack tecnológico

| Componente | Tecnología |
|---|---|
| Lenguaje | TypeScript |
| Framework | NestJS |
| Runtime | Node.js |
| Gestor de paquetes | pnpm |
| API | REST + JSON |
| Base de datos | PostgreSQL |
| ORM | Prisma |
| Autenticación | JWT Access Token + Refresh Token |
| Hash de contraseñas | Argon2id |
| Autorización | RBAC + permisos por proyecto |
| Pruebas | Jest |
| Sistema de módulos | CommonJS (CJS) |
| Formato | Prettier |
| Análisis estático | ESLint / Oxlint |
| Versionamiento | Git |

---

# 2. Principios arquitectónicos

El backend utiliza:

- arquitectura modular;
- organización feature-first;
- Clean Architecture;
- separación explícita de responsabilidades;
- inversión de dependencias;
- módulos funcionales independientes;
- persistencia desacoplada del dominio;
- API REST como interfaz de entrada;
- PostgreSQL como fuente principal de persistencia.

Cada funcionalidad debe pertenecer a un módulo de negocio claramente identificado.

La regla arquitectónica principal es:

```text
Presentation
      ↓
Application
      ↓
Domain
      ↑
Infrastructure
```

Las dependencias deben apuntar hacia las capas internas.

El dominio nunca depende de NestJS, Prisma, PostgreSQL, HTTP, Firebase, SMTP ni otras tecnologías externas.

---

# 3. Estructura general

```text
backend/
│
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.ts
│
├── scripts/
│
├── src/
│   ├── common/
│   ├── config/
│   ├── infrastructure/
│   ├── modules/
│   ├── app.module.ts
│   └── main.ts
│
├── test/
├── uploads/
│
├── .env
├── .env.example
├── .gitignore
├── .prettierrc
├── eslint.config.*
├── oxlint.json
├── jest.config.ts
├── nest-cli.json
├── package.json
├── pnpm-lock.yaml
├── prisma.config.ts
├── tsconfig.json
├── tsconfig.build.json
└── README.md
```

---

# 4. Responsabilidad de las carpetas raíz

## `prisma/`

Contiene la definición física de la base de datos administrada mediante Prisma.

```text
prisma/
├── migrations/
├── schema.prisma
└── seed.ts
```

### `schema.prisma`

Es la fuente de definición del esquema utilizado por Prisma.

Los nombres utilizados en TypeScript pueden seguir las convenciones del lenguaje, mientras que las tablas y columnas físicas mantienen la nomenclatura definida para PostgreSQL.

Ejemplo:

```prisma
model Proyecto {
  idProyecto String @id @default(uuid()) @map("id_proyecto") @db.Uuid
  nombre     String @db.VarChar(150)

  @@map("gp_proyecto")
}
```

Código:

```text
Proyecto
idProyecto
```

Base de datos:

```text
gp_proyecto
id_proyecto
```

### `migrations/`

Contiene exclusivamente las migraciones generadas mediante Prisma.

No modificar manualmente una migración que ya haya sido aplicada en un entorno compartido.

### `seed.ts`

Datos iniciales necesarios para ejecutar el sistema.

Ejemplos:

- roles;
- permisos;
- categorías iniciales;
- catálogo de riesgos;
- metodologías;
- configuraciones generales.

No utilizar el seed para introducir datos temporales de pruebas personales.

---

# 5. `src/config/`

Contiene configuración de la aplicación.

Ejemplo:

```text
config/
├── app.config.ts
├── auth.config.ts
├── database.config.ts
├── mail.config.ts
├── notifications.config.ts
└── storage.config.ts
```

Esta carpeta NO contiene reglas de negocio.

Debe centralizar aspectos como:

- variables de entorno;
- puertos;
- expiración de tokens;
- configuración de almacenamiento;
- SMTP;
- Firebase;
- parámetros técnicos.

Nunca acceder directamente a `process.env` desde módulos de negocio.

La lectura de configuración debe estar centralizada.

---

# 6. `src/common/`

Contiene elementos técnicos realmente compartidos por varios módulos.

Ejemplo:

```text
common/
├── decorators/
├── exceptions/
├── filters/
├── guards/
├── interceptors/
├── pipes/
├── types/
└── utils/
```

Puede contener:

- decorators comunes;
- guards transversales;
- filtros globales;
- interceptores;
- excepciones base;
- utilidades sin lógica de negocio;
- tipos técnicos compartidos.

NO debe convertirse en una carpeta donde colocar código que no se sabe dónde ubicar.

Incorrecto:

```text
common/
├── proyecto.service.ts
├── riesgo.service.ts
├── actividad.repository.ts
└── presupuesto.helper.ts
```

Si algo pertenece a un dominio funcional, debe estar dentro de su módulo.

---

# 7. `src/infrastructure/`

Contiene infraestructura técnica compartida por varios módulos.

Ejemplo:

```text
infrastructure/
├── database/
│   └── prisma/
├── mail/
├── notifications/
└── storage/
```

Ejemplos de responsabilidades:

- `PrismaService`;
- cliente SMTP;
- integración Firebase Cloud Messaging;
- sistema de archivos;
- adaptadores técnicos reutilizables.

Esta carpeta contiene infraestructura GLOBAL.

La infraestructura específica de una funcionalidad debe permanecer dentro de:

```text
modules/<modulo>/infrastructure/
```

---

# 8. `src/modules/`

Contiene los módulos funcionales del sistema.

```text
modules/
├── autenticacion/
├── usuarios/
├── proyectos/
├── cronograma/
├── presupuesto/
├── invitados/
├── proveedores/
├── riesgos/
├── administracion/
├── notificaciones/
└── archivos/
```

Cada módulo representa una capacidad funcional del sistema.

Los módulos deben poder evolucionar con el menor acoplamiento posible.

---

# 9. Estructura estándar de un módulo

Todos los módulos deben utilizar la misma estructura base.

Ejemplo:

```text
modules/
└── cronograma/
    │
    ├── domain/
    │   ├── entities/
    │   ├── enums/
    │   ├── value-objects/
    │   └── repositories/
    │
    ├── application/
    │   ├── dto/
    │   ├── use-cases/
    │   └── ports/
    │
    ├── infrastructure/
    │   ├── persistence/
    │   │   ├── repositories/
    │   │   └── mappers/
    │   └── services/
    │
    ├── presentation/
    │   └── controllers/
    │
    └── cronograma.module.ts
```

No crear estructuras diferentes arbitrariamente entre módulos.

---

# 10. Domain

```text
domain/
├── entities/
├── enums/
├── value-objects/
└── repositories/
```

Es el núcleo del módulo.

Aquí viven las reglas de negocio que deben mantenerse independientes de cualquier tecnología.

## `entities/`

Entidades del dominio.

Ejemplos:

```text
proyecto.entity.ts
actividad.entity.ts
hito.entity.ts
riesgo.entity.ts
```

Ejemplo:

```typescript
export class Actividad {
  // estado y comportamiento propio del dominio
}
```

Las entidades NO deben importar:

```text
@nestjs/*
@prisma/*
express
firebase
nodemailer
```

---

## `enums/`

Enumeraciones propias del dominio.

Ejemplo:

```text
estado-actividad.enum.ts
prioridad-actividad.enum.ts
estado-riesgo.enum.ts
```

Ejemplo:

```typescript
export enum EstadoActividad {
  PENDIENTE = 'PENDIENTE',
  EN_PROCESO = 'EN_PROCESO',
  COMPLETADA = 'COMPLETADA',
  CANCELADA = 'CANCELADA',
}
```

---

## `value-objects/`

Objetos de valor cuando exista una regla o concepto de dominio suficientemente relevante.

Ejemplos potenciales:

```text
rango-fechas.vo.ts
monto.vo.ts
correo-electronico.vo.ts
```

No crear Value Objects únicamente por cumplir un patrón.

Solo utilizarlos cuando encapsulen reglas reales.

---

## `repositories/`

Define contratos requeridos por el dominio o aplicación para persistir información.

Ejemplo:

```text
actividad.repository.ts
```

Ejemplo:

```typescript
export abstract class ActividadRepository {
  abstract findById(id: string): Promise<Actividad | null>;
  abstract save(actividad: Actividad): Promise<void>;
}
```

Aquí se define QUÉ necesita el dominio.

No CÓMO se implementa.

Por tanto:

```text
domain/repositories/
```

NO utiliza Prisma.

---

# 11. Application

```text
application/
├── dto/
├── use-cases/
└── ports/
```

Coordina las operaciones que el sistema puede realizar.

---

## `use-cases/`

Cada caso de uso representa una intención concreta.

Ejemplos:

```text
crear-actividad.use-case.ts
reprogramar-actividad.use-case.ts
actualizar-estado-actividad.use-case.ts
crear-proyecto.use-case.ts
evaluar-riesgo.use-case.ts
```

Convención:

```typescript
export class CrearActividadUseCase {
  async execute(...) {
    ...
  }
}
```

Preferir:

```text
1 clase = 1 caso de uso
```

Evitar clases genéricas gigantes como:

```text
CronogramaService
ProyectoService
GeneralService
ManagerService
```

con decenas de métodos no relacionados.

---

## `dto/`

Objetos utilizados para transferir información entre interfaces y aplicación.

Ejemplos:

```text
crear-actividad.dto.ts
actualizar-actividad.dto.ts
buscar-actividades.dto.ts
```

Regla:

```text
Entidad de dominio ≠ DTO ≠ Modelo Prisma
```

Son conceptos diferentes y no deben utilizarse indistintamente.

---

## `ports/`

Contratos hacia capacidades externas necesarias por los casos de uso.

Ejemplos:

```text
email.port.ts
notification.port.ts
storage.port.ts
```

Diferencia:

```text
domain/repositories/
```

define principalmente contratos de persistencia del dominio.

```text
application/ports/
```

define capacidades externas requeridas para ejecutar casos de uso.

---

# 12. Infrastructure del módulo

```text
infrastructure/
├── persistence/
│   ├── repositories/
│   └── mappers/
└── services/
```

Implementa detalles técnicos.

Aquí sí pueden aparecer:

- Prisma;
- PostgreSQL;
- SMTP;
- Firebase;
- filesystem;
- librerías externas.

---

## `persistence/repositories/`

Implementaciones concretas de los contratos definidos en Domain.

Ejemplo:

```text
prisma-actividad.repository.ts
```

Ejemplo conceptual:

```typescript
export class PrismaActividadRepository
  implements ActividadRepository {
}
```

---

## `persistence/mappers/`

Transforma estructuras entre infraestructura y dominio.

Ejemplo:

```text
actividad-prisma.mapper.ts
```

Responsabilidad:

```text
Prisma record
      ↕
Domain Entity
```

No contaminar las entidades de dominio con tipos Prisma.

---

## `services/`

Adaptadores técnicos particulares del módulo.

Ejemplo:

```text
generador-timing.service.ts
```

Solo crear servicios aquí cuando representen una implementación técnica.

Las reglas puramente de negocio pertenecen al dominio.

---

# 13. Presentation

```text
presentation/
└── controllers/
```

Representa las entradas hacia la aplicación.

Actualmente la entrada principal es HTTP mediante REST.

Ejemplo:

```text
cronograma.controller.ts
proyectos.controller.ts
riesgos.controller.ts
```

Un Controller debe:

1. recibir la petición;
2. validar datos mediante DTO;
3. identificar al usuario autenticado;
4. llamar al caso de uso;
5. devolver la respuesta HTTP.

Un Controller NO debe:

- acceder directamente a Prisma;
- ejecutar queries;
- contener reglas de negocio complejas;
- calcular lógica financiera;
- realizar autorización únicamente en frontend;
- manipular directamente archivos o servicios externos.

Incorrecto:

```text
Controller → Prisma
```

Correcto:

```text
Controller
    ↓
Use Case
    ↓
Repository Interface
    ↓
Prisma Repository
```

---

# 14. Archivo `<modulo>.module.ts`

Cada módulo NestJS define el wiring de sus dependencias.

Ejemplo:

```text
cronograma.module.ts
```

Debe registrar:

- controllers;
- casos de uso/providers;
- implementaciones de repositories;
- dependencias externas necesarias.

La configuración de NestJS permanece en esta capa y nunca dentro del dominio.

---

# 15. Flujo estándar de una solicitud

Ejemplo: registrar una actividad.

```text
Flutter
   ↓
POST /api/v1/proyectos/:idProyecto/actividades
   ↓
ActividadesController
   ↓
CrearActividadDto
   ↓
CrearActividadUseCase
   ↓
Actividad (Domain)
   ↓
ActividadRepository
   ↓
PrismaActividadRepository
   ↓
Prisma
   ↓
PostgreSQL
```

La respuesta realiza el recorrido inverso.

---

# 16. Reglas de dependencia

## Permitido

```text
presentation → application
application  → domain
infrastructure → domain
infrastructure → application ports
```

## Prohibido

```text
domain → application
domain → infrastructure
domain → presentation

application → presentation

repository de un módulo → repository de otro módulo

controller → Prisma
controller → PostgreSQL
```

---

# 17. Comunicación entre módulos

Los módulos pueden colaborar cuando un caso de uso lo requiera.

Ejemplo:

```text
Proveedores
    ↓
Presupuesto
```

cuando una contratación genera un compromiso financiero.

La comunicación debe realizarse mediante operaciones expuestas por la capa de aplicación.

Nunca:

```text
ProveedorRepository
      ↓
PrismaPresupuestoRepository
```

Preferir:

```text
ConfirmarContratacionUseCase
      ↓
RegistrarCompromisoFinanciero
```

o una interfaz de aplicación explícitamente diseñada para dicha colaboración.

Evitar dependencias circulares.

`forwardRef()` debe considerarse una excepción, no una solución habitual.

---

# 18. Nomenclatura del código

## Carpetas

Utilizar:

```text
kebab-case
```

Ejemplos:

```text
value-objects/
use-cases/
```

No:

```text
ValueObjects/
useCases/
Use_Cases/
```

---

## Archivos TypeScript

Utilizar:

```text
kebab-case.tipo.ts
```

Ejemplos:

```text
actividad.entity.ts
crear-actividad.use-case.ts
crear-actividad.dto.ts
actividad.repository.ts
prisma-actividad.repository.ts
actividad-prisma.mapper.ts
estado-actividad.enum.ts
cronograma.controller.ts
cronograma.module.ts
```

---

## Clases

PascalCase:

```typescript
Actividad
CrearActividadUseCase
PrismaActividadRepository
CronogramaController
CronogramaModule
```

---

## Métodos y variables

camelCase:

```typescript
crearActividad()
buscarProyecto()
idProyecto
fechaInicio
montoEstimado
```

---

## Constantes

UPPER_SNAKE_CASE:

```typescript
MAX_INTENTOS
DEFAULT_PAGE_SIZE
JWT_ACCESS_TOKEN
```

---

## Enums

Nombre:

```text
PascalCase
```

Valores:

```text
UPPER_SNAKE_CASE
```

Ejemplo:

```typescript
enum EstadoProyecto {
  BORRADOR = 'BORRADOR',
  EN_PLANIFICACION = 'EN_PLANIFICACION',
  CERRADO = 'CERRADO',
}
```

---

# 19. Idioma

Los conceptos propios del negocio se escribirán en español.

Ejemplos:

```text
Proyecto
Matrimonio
Actividad
Proveedor
Invitado
Presupuesto
Riesgo
```

Los conceptos técnicos consolidados mantienen su denominación técnica.

Ejemplos:

```text
Controller
Repository
Mapper
DTO
UseCase
Guard
Interceptor
Pipe
Module
```

Ejemplo correcto:

```text
crear-proyecto.use-case.ts
proyecto.repository.ts
prisma-proyecto.repository.ts
proyectos.controller.ts
```

Evitar mezclar arbitrariamente conceptos:

```text
create-proyecto.service.ts
GuestRepository
presupuestoController.ts
```

---

# 20. Convenciones PostgreSQL

La base de datos utiliza:

```text
snake_case
```

Las tablas utilizan prefijos por dominio.

| Prefijo | Dominio |
|---|---|
| `in_` | Involucrados |
| `au_` | Autenticación y usuarios |
| `gp_` | Gestión de proyectos |
| `cr_` | Cronograma |
| `pr_` | Presupuesto |
| `iv_` | Invitados |
| `pv_` | Proveedores |
| `rg_` | Riesgos |
| `ad_` | Administración |
| `nt_` | Notificaciones |
| `ar_` | Archivos |

Ejemplos:

```text
gp_proyecto
gp_matrimonio
cr_actividad
pr_presupuesto
pv_proveedor
rg_riesgo
```

---

# 21. Claves primarias

Por defecto:

```text
UUID
```

Ejemplo:

```text
id_proyecto
id_actividad
id_presupuesto
```

Excepciones son claves naturales ya justificadas por el modelo físico, como:

```text
in_persona_natural.dni
in_entidad.ruc
in_ubigeo.codigo_ubigeo
```

No introducir nuevas claves naturales sin una razón de negocio clara.

---

# 22. Fechas

Utilizar:

```text
DATE
```

cuando importa únicamente el día.

Ejemplo:

```text
fecha_matrimonio
fecha_pago
```

Utilizar:

```text
TIMESTAMPTZ
```

cuando importa instante, fecha y hora.

Ejemplo:

```text
fecha_creacion
fecha_modificacion
fecha_envio
fecha_activacion
```

---

# 23. Dinero

Nunca utilizar:

```text
FLOAT
DOUBLE
REAL
```

para valores monetarios.

Utilizar:

```text
NUMERIC(12,2)
```

o la precisión establecida en el modelo físico.

---

# 24. Campos derivados

No almacenar información que pueda obtenerse de forma confiable mediante cálculo salvo que exista una razón explícita de rendimiento o auditoría.

Ejemplos que normalmente se calculan:

```text
porcentaje de avance
saldo pendiente
porcentaje presupuestario
desviación
promedio de calificación
tiempo promedio de respuesta
estado "retrasado"
estado "vencido"
```

Evitar inconsistencias entre valores almacenados y valores calculados.

---

# 25. API REST

Todas las rutas deben partir de:

```text
/api/v1
```

Utilizar recursos en plural.

Correcto:

```text
GET    /api/v1/proyectos
POST   /api/v1/proyectos
GET    /api/v1/proyectos/:idProyecto
PATCH  /api/v1/proyectos/:idProyecto
DELETE /api/v1/proyectos/:idProyecto
```

Subrecursos:

```text
GET  /api/v1/proyectos/:idProyecto/actividades
POST /api/v1/proyectos/:idProyecto/actividades
```

Evitar:

```text
/getProjects
/createProject
/deleteActivity
/updateGuest
```

La acción ya está expresada mediante el verbo HTTP.

---

# 26. Verbos HTTP

| Operación | Método |
|---|---|
| Consultar | GET |
| Crear | POST |
| Actualización parcial | PATCH |
| Reemplazo total | PUT |
| Eliminar | DELETE |

Preferir `PATCH` para actualizaciones parciales.

---

# 27. Códigos HTTP

| Código | Uso |
|---|---|
| `200` | operación exitosa |
| `201` | recurso creado |
| `204` | eliminación sin contenido |
| `400` | solicitud inválida |
| `401` | usuario no autenticado |
| `403` | usuario autenticado sin permiso |
| `404` | recurso inexistente |
| `409` | conflicto |
| `422` | regla de negocio no satisfecha |
| `500` | error interno inesperado |

No devolver `200` para representar errores.

---

# 28. JSON

Las propiedades expuestas por la API utilizan:

```text
camelCase
```

Ejemplo:

```json
{
  "idActividad": "uuid",
  "fechaInicioPlanificada": "2026-10-01T14:00:00Z",
  "margenSeguridadMin": 30
}
```

La nomenclatura física de PostgreSQL no debe filtrarse a la API.

---

# 29. Respuestas exitosas

Para recursos individuales:

```json
{
  "data": {
    "idProyecto": "..."
  }
}
```

Para colecciones paginadas:

```json
{
  "data": [],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

---

# 30. Formato estándar de errores

Los errores de la API deben utilizar una estructura consistente.

```json
{
  "statusCode": 400,
  "code": "ACTIVIDAD_FECHA_INVALIDA",
  "message": "La fecha de finalización debe ser posterior a la fecha de inicio.",
  "details": null,
  "timestamp": "2026-09-13T16:30:00.000Z",
  "path": "/api/v1/proyectos/123/actividades"
}
```

## `code`

Debe ser estable y utilizable por el frontend.

Ejemplos:

```text
USUARIO_NO_ENCONTRADO
PROYECTO_SIN_PERMISO
ACTIVIDAD_FECHA_INVALIDA
DEPENDENCIA_CIRCULAR
PRESUPUESTO_INSUFICIENTE
```

No obligar al frontend a interpretar textos humanos para determinar qué error ocurrió.

---

# 31. Validación

Toda entrada externa debe validarse.

Utilizar DTO + `class-validator`.

El `ValidationPipe` global debe configurarse para:

```typescript
whitelist: true
forbidNonWhitelisted: true
transform: true
```

El frontend puede validar por experiencia de usuario.

El backend SIEMPRE vuelve a validar.

---

# 32. Autenticación

La autenticación utiliza:

```text
correo + contraseña
```

Las contraseñas deben almacenarse exclusivamente mediante:

```text
Argon2id
```

Nunca guardar:

- contraseñas en texto plano;
- contraseñas reversibles;
- contraseñas en logs.

Después de autenticar:

```text
Access Token
Refresh Token
```

Ambos utilizan JWT según la arquitectura definida.

---

# 33. Access Token

Utilizado para acceder a recursos protegidos.

Debe tener una duración relativamente corta.

Se envía mediante:

```http
Authorization: Bearer <token>
```

---

# 34. Refresh Token

Permite renovar la sesión.

Los Refresh Tokens persistidos deben almacenarse mediante hash.

No guardar el token sensible directamente cuando no sea necesario.

Debe poder:

- expirar;
- revocarse;
- invalidarse al cerrar sesión.

---

# 35. Autorización

La autorización tiene dos niveles.

## Nivel global

RBAC.

Ejemplos:

```text
ADMINISTRADOR
WEDDING_PLANNER
PAREJA
COLABORADOR
```

## Nivel proyecto

Permisos correspondientes a un matrimonio/proyecto concreto.

Ejemplo:

```text
usuario
    ↓
miembro del proyecto
    ↓
rol operativo
    ↓
permisos
```

Ocultar un botón en Flutter NO constituye autorización.

Toda operación protegida debe validarse nuevamente en backend.

---

# 36. Aislamiento por proyecto

Todo recurso perteneciente a un proyecto debe validar:

1. que el proyecto exista;
2. que el usuario tenga acceso;
3. que tenga permiso para ejecutar la operación;
4. que el recurso solicitado pertenezca realmente a ese proyecto.

Nunca confiar únicamente en un `idActividad`, `idInvitado`, etc. enviado por el cliente.

---

# 37. Prisma

La aplicación no debe utilizar `PrismaClient` libremente en Controllers o casos de uso.

Debe existir una instancia centralizada, por ejemplo:

```text
src/infrastructure/database/prisma/prisma.service.ts
```

Las consultas específicas deben quedar dentro de repositories de infraestructura.

Correcto:

```text
UseCase
    ↓
Repository
    ↓
PrismaRepository
    ↓
PrismaService
```

Incorrecto:

```text
Controller → PrismaService
```

---

# 38. Migraciones

Crear una migración mediante:

```bash
pnpm exec prisma migrate dev --name nombre-descriptivo
```

Ejemplos:

```bash
pnpm exec prisma migrate dev --name init
pnpm exec prisma migrate dev --name add-cronograma
pnpm exec prisma migrate dev --name add-presupuesto
```

Aplicar nombres descriptivos.

No utilizar:

```text
migration1
cambio
fix
prueba
nuevo
```

---

# 39. Prisma Client

Después de cambios que lo requieran:

```bash
pnpm exec prisma generate
```

---

# 40. Seed

Ejecutar el mecanismo de seed configurado para Prisma.

El seed debe ser:

- reproducible;
- idempotente cuando sea posible;
- independiente de información personal;
- apto para levantar un entorno limpio.

---

# 41. Transacciones

Utilizar transacciones cuando una operación de negocio requiere que varios cambios sean atómicos.

Ejemplo:

```text
Confirmar contratación
    ↓
crear contratación
    ↓
crear compromiso financiero
```

Si falla una parte, la operación completa debe poder revertirse.

Nunca manejar transacciones desde Controllers.

---

# 42. Archivos

Los archivos físicos NO se almacenan como binarios en PostgreSQL.

Durante desarrollo:

```text
uploads/
```

contiene almacenamiento local.

PostgreSQL conserva:

- id;
- nombre;
- tipo MIME;
- tamaño;
- ruta;
- usuario;
- relaciones.

Utilizar nombres físicos no predecibles, preferentemente UUID.

Ejemplo:

```text
550e8400-e29b-41d4-a716-446655440000.pdf
```

No confiar en el nombre enviado por el usuario.

Validar:

- extensión;
- MIME;
- tamaño;
- autorización.

La ruta almacenada debería ser relativa al sistema de almacenamiento y no una ruta absoluta de una computadora particular.

---

# 43. Notificaciones

Los módulos funcionales determinan CUÁNDO debe producirse una notificación.

El módulo `notificaciones` administra:

- destinatarios;
- persistencia;
- estado;
- canal;
- envío.

Ejemplo:

```text
Cronograma
    ↓
detecta vencimiento
    ↓
Notificaciones
    ↓
APP / PUSH / CORREO
```

No implementar una infraestructura de notificaciones diferente dentro de cada módulo.

---

# 44. Logging

Utilizar el mecanismo de logging de NestJS.

Evitar:

```typescript
console.log(...)
```

en código de aplicación.

Nunca registrar:

- contraseña;
- Access Token;
- Refresh Token;
- secretos;
- credenciales SMTP;
- datos sensibles innecesarios.

Los logs deben describir eventos técnicos y errores útiles para diagnóstico.

---

# 45. Excepciones

Las excepciones de negocio deben ser explícitas.

Evitar:

```typescript
throw new Error('algo salió mal');
```

cuando existe un significado de negocio concreto.

Preferir errores identificables como:

```text
ProyectoNoEncontrado
DependenciaCircular
UsuarioSinPermiso
SaldoInsuficiente
```

El filtro global HTTP debe traducirlos al formato estándar de respuesta.

---

# 46. Tests

Se utilizarán tres niveles principales.

## Unitarios

Prueban:

- entidades;
- reglas;
- casos de uso;
- servicios de dominio.

No necesitan una base de datos real.

Nombre:

```text
*.spec.ts
```

---

## Integración

Prueban:

- repositories;
- Prisma;
- PostgreSQL;
- integraciones relevantes.

---

## E2E

Se encuentran principalmente en:

```text
/test
```

Nombre:

```text
*.e2e-spec.ts
```

Comprueban el flujo HTTP completo.

Ejemplo:

```text
HTTP
 ↓
Controller
 ↓
UseCase
 ↓
Repository
 ↓
DB
```

---

# 47. Convención de pruebas

Utilizar:

```text
describe()
it()
```

Los nombres deben expresar comportamiento.

Correcto:

```typescript
it('debe rechazar una dependencia circular')
```

No:

```typescript
it('test 1')
```

---

# 48. Package manager

Este proyecto utiliza exclusivamente:

```text
pnpm
```

No utilizar:

```text
npm install
yarn
bun
```

para gestionar este backend.

Instalar dependencia:

```bash
pnpm add paquete
```

Dependencia de desarrollo:

```bash
pnpm add -D paquete
```

Ejecutar binario:

```bash
pnpm exec prisma ...
```

Instalar proyecto:

```bash
pnpm install
```

El archivo:

```text
pnpm-lock.yaml
```

DEBE permanecer versionado en Git.

---

# 49. Política de dependencias

No instalar paquetes "por si acaso".

Antes de añadir una dependencia:

1. comprobar si realmente es necesaria;
2. revisar si NestJS o Node ya resuelven el problema;
3. evitar librerías duplicadas para la misma función;
4. preferir proyectos mantenidos;
5. instalar únicamente en el scope necesario.

No utilizar `--force` para resolver incompatibilidades sin comprender primero la causa.

---

# 50. Variables de entorno

Los valores reales se almacenan en:

```text
.env
```

Este archivo NO debe versionarse.

Debe existir:

```text
.env.example
```

sin secretos.

Ejemplo:

```env
NODE_ENV=development
PORT=3000

DATABASE_URL=

JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
JWT_ACCESS_EXPIRATION=
JWT_REFRESH_EXPIRATION=

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=

FCM_PROJECT_ID=

UPLOAD_PATH=uploads
```

La aplicación debe fallar al iniciar si falta una variable obligatoria crítica.

---

# 51. `.gitignore`

Como mínimo deben excluirse:

```text
node_modules/
dist/
coverage/
.env
.env.*
!.env.example

uploads/*
!uploads/.gitkeep

*.log
```

No versionar artefactos generados ni secretos.

---

# 52. `dist/`

Contenido generado por compilación.

NO editar manualmente.

NO contener código fuente que no exista en `src/`.

---

# 53. `node_modules/`

Dependencias locales.

NO editar.

NO versionar.

Si existe un problema de dependencias, solucionarlo mediante:

```text
package.json
pnpm-lock.yaml
pnpm
```

---

# 54. `scripts/`

Contiene automatizaciones del proyecto.

Ejemplos:

```text
create-module-structure.ps1
reset-database.ps1
```

Los scripts deben:

- tener nombres descriptivos;
- ser reproducibles;
- evitar operaciones destructivas no confirmadas;
- incluir comentarios cuando no sean evidentes.

---

# 55. Carpetas de asistentes o editores

Pueden existir carpetas como:

```text
.agents/
.claude/
.cursor/
.devin/
```

Estas carpetas corresponden a herramientas de desarrollo o asistentes y NO forman parte de la arquitectura de ejecución del backend.

No colocar dentro de ellas:

- código de negocio;
- configuraciones necesarias para ejecutar el sistema;
- secretos.

El backend debe poder compilar y ejecutarse independientemente de ellas.

---

# 56. Imports

Evitar rutas excesivamente relativas:

```typescript
../../../../../../common/...
```

Utilizar aliases cuando estén configurados.

Ejemplo:

```typescript
import { ... } from '@modules/...';
import { ... } from '@common/...';
import { ... } from '@infrastructure/...';
```

Dentro de una misma área cercana puede utilizarse import relativo simple.

Evitar archivos `index.ts` utilizados indiscriminadamente como barrel files porque pueden ocultar dependencias y favorecer ciclos.

Preferir imports explícitos.

---

# 57. Git

Ramas principales:

```text
main
develop
```

Ramas de trabajo:

```text
feature/*
fix/*
refactor/*
```

Ejemplos:

```text
feature/autenticacion-login
feature/proyectos-crear
feature/cronograma-actividades
fix/refresh-token
refactor/riesgos-evaluacion
```

---

# 58. Commits

Utilizar Conventional Commits.

Formato:

```text
tipo(scope): descripción
```

Ejemplos:

```text
feat(auth): implementar inicio de sesión
feat(proyectos): registrar proyecto de matrimonio
feat(cronograma): agregar dependencias entre actividades
fix(presupuesto): corregir cálculo de saldo
refactor(riesgos): separar evaluación de severidad
test(proyectos): agregar pruebas de creación
docs(backend): documentar arquitectura
chore(deps): actualizar dependencias
```

Tipos habituales:

```text
feat
fix
refactor
test
docs
chore
build
ci
```

---

# 59. Regla para nombres de scope en commits

Utilizar scopes consistentes:

```text
auth
usuarios
proyectos
cronograma
presupuesto
invitados
proveedores
riesgos
administracion
notificaciones
archivos
db
deps
backend
```

No inventar una variante nueva en cada commit.

---

# 60. Antes de hacer commit

Ejecutar:

```bash
pnpm format
pnpm lint
pnpm test
pnpm build
```

El código no debería subirse si:

- no compila;
- rompe tests existentes;
- tiene errores de lint;
- contiene secretos;
- contiene código temporal.

---

# 61. Código temporal

No dejar en commits:

```typescript
console.log('prueba');
```

ni:

```text
TODO arreglar esto luego
hack temporal
password = "123456"
```

Los TODO legítimos deben describir claramente la deuda pendiente.

---

# 62. Comentarios

Los comentarios deben explicar POR QUÉ existe una decisión cuando no sea evidente.

Evitar explicar literalmente lo que ya dice el código.

Incorrecto:

```typescript
// Incrementa contador
contador++;
```

Útil:

```typescript
// El retraso no se persiste como estado porque se deriva
// de la fecha límite y del estado actual de la actividad.
```

---

# 63. Tamaño de clases

Una clase debe tener una responsabilidad clara.

Señales de alerta:

```text
1000 líneas
30 métodos públicos
10 dependencias inyectadas
5 dominios diferentes
```

Si ocurre, revisar la responsabilidad antes de seguir agregando código.

---

# 64. Servicios genéricos

Evitar:

```text
UtilsService
HelperService
CommonService
GeneralService
DatabaseService
```

cuando agrupen responsabilidades no relacionadas.

Preferir nombres que indiquen exactamente su función.

---

# 65. Reglas sobre módulos

Cada funcionalidad nueva debe responder antes:

```text
¿A qué módulo pertenece?
```

Si la respuesta no es clara:

1. revisar el dominio;
2. verificar si realmente es transversal;
3. evitar crear módulos arbitrariamente.

No colocar funcionalidad de negocio en `common`.

---

# 66. Agregar una funcionalidad nueva

Ejemplo: "Reprogramar actividad".

Orden recomendado:

### 1. Dominio

Definir reglas relevantes.

```text
domain/
```

### 2. Contratos

Definir repository/port requerido.

```text
domain/repositories/
application/ports/
```

### 3. Caso de uso

```text
application/use-cases/reprogramar-actividad.use-case.ts
```

### 4. DTO

```text
application/dto/reprogramar-actividad.dto.ts
```

### 5. Persistencia

```text
infrastructure/persistence/repositories/
```

### 6. Mapper, si es necesario

```text
infrastructure/persistence/mappers/
```

### 7. Controller

```text
presentation/controllers/
```

### 8. Registrar dependencias

```text
cronograma.module.ts
```

### 9. Tests

Agregar pruebas correspondientes.

---

# 67. Definition of Done

Una funcionalidad backend se considera terminada cuando:

- [ ] está ubicada en el módulo correcto;
- [ ] respeta la separación de capas;
- [ ] tiene validaciones de entrada;
- [ ] verifica autorización cuando corresponde;
- [ ] sus reglas están en la capa adecuada;
- [ ] no accede directamente a Prisma desde Controller;
- [ ] no introduce dependencia circular;
- [ ] maneja errores de forma consistente;
- [ ] tiene pruebas relevantes;
- [ ] `pnpm lint` pasa;
- [ ] `pnpm test` pasa;
- [ ] `pnpm build` pasa;
- [ ] no contiene secretos;
- [ ] las migraciones necesarias están versionadas;
- [ ] `.env.example` fue actualizado si apareció una variable nueva;
- [ ] el README se actualizó si cambió una decisión arquitectónica.

---

# 68. Comandos principales

Instalar dependencias:

```bash
pnpm install
```

Desarrollo:

```bash
pnpm start:dev
```

Compilar:

```bash
pnpm build
```

Ejecutar compilado:

```bash
pnpm start:prod
```

Formatear:

```bash
pnpm format
```

Lint:

```bash
pnpm lint
```

Tests:

```bash
pnpm test
```

Tests en modo watch:

```bash
pnpm test:watch
```

Cobertura:

```bash
pnpm test:cov
```

E2E:

```bash
pnpm test:e2e
```

Generar Prisma Client:

```bash
pnpm exec prisma generate
```

Crear migración:

```bash
pnpm exec prisma migrate dev --name nombre
```

Abrir Prisma Studio:

```bash
pnpm exec prisma studio
```

---

# 69. Instalación local

## Requisitos

Se requiere:

- Node.js compatible con la versión del proyecto;
- pnpm;
- PostgreSQL;
- Git.

Instalar dependencias:

```bash
pnpm install
```

Crear archivo local:

```text
.env
```

a partir de:

```text
.env.example
```

Configurar principalmente:

```text
DATABASE_URL
JWT_ACCESS_SECRET
JWT_REFRESH_SECRET
```

Generar cliente Prisma:

```bash
pnpm exec prisma generate
```

Aplicar migraciones:

```bash
pnpm exec prisma migrate dev
```

Ejecutar backend:

```bash
pnpm start:dev
```

Por defecto, la API estará disponible según el puerto definido en configuración.

---

# 70. Flujo de desarrollo recomendado

Para cada Historia de Usuario:

```text
Historia / criterios de aceptación
          ↓
Reglas de negocio
          ↓
Modelo de dominio
          ↓
Caso de uso
          ↓
Repository / Port
          ↓
Infraestructura
          ↓
Controller / API
          ↓
Tests
          ↓
Frontend
```

No comenzar por crear un Controller y decidir después dónde colocar el resto de la lógica.

---

# 71. Regla de oro

Ante cualquier duda sobre dónde ubicar código:

### ¿Es una regla de negocio?

```text
domain/
```

### ¿Coordina una operación del sistema?

```text
application/
```

### ¿Implementa una tecnología?

```text
infrastructure/
```

### ¿Recibe o devuelve HTTP?

```text
presentation/
```

### ¿Es transversal y técnico para múltiples módulos?

```text
src/common/
o
src/infrastructure/
```

### ¿Pertenece claramente a un dominio?

```text
src/modules/<dominio>/
```

---

# 72. Principios que no deben romperse

1. El dominio no conoce Prisma.
2. El dominio no conoce NestJS.
3. Controllers no acceden a la base de datos.
4. El frontend nunca accede directamente a PostgreSQL.
5. Un módulo no accede al repository interno de otro módulo.
6. Las reglas de autorización se verifican en backend.
7. Los datos pertenecientes a un proyecto siempre se aíslan por proyecto.
8. Las migraciones representan cambios del esquema.
9. Los secretos no se versionan.
10. Los cálculos derivados no se persisten innecesariamente.
11. Los archivos físicos no se almacenan como binarios en PostgreSQL.
12. Las dependencias externas se encapsulan detrás de infraestructura o ports.
13. Todo código debe tener una ubicación arquitectónica justificable.
14. La simplicidad prevalece sobre patrones innecesarios.
15. La arquitectura solo se modifica mediante una decisión consciente y documentada.

---

# 73. Estado de la arquitectura

Esta estructura constituye el estándar base del backend.

No debe modificarse durante el desarrollo únicamente por comodidad de una funcionalidad particular.

Si aparece una necesidad que aparentemente requiere romper una de estas reglas, primero debe revisarse si:

1. existe una solución dentro de la estructura actual;
2. la nueva necesidad representa realmente una excepción;
3. el cambio beneficia a toda la arquitectura y no solamente a un caso particular.

Las decisiones arquitectónicas importantes deben mantenerse documentadas para evitar que distintas partes del sistema evolucionen con criterios incompatibles.

---

# 74. Convenciones API e IDs para Involucrados

Las reglas funcionales de esta sección tienen prioridad sobre ejemplos generales
anteriores cuando se trabaje con Persona Natural y Ubigeo.

- Los IDs internos numéricos nuevos son autoincrementales desde 1000.
- in_persona_natural.id_persona_natural es numérico; no usa UUID.
- in_ubigeo.id_ubigeo es la excepción: conserva su clave natural VARCHAR(6).
- Toda respuesta exitosa o fallida usa la forma { "mensaje": "...", "data": ... }.
- En errores, data siempre es null y se usa el estado HTTP correspondiente.
- Persona Natural se elimina lógicamente mediante es_activo=false.

## Paginación, búsqueda y filtros

Los listados aceptan pagina, limite, ordenarPor, orden, buscar y mostrarTodos.
Cuando mostrarTodos=true, se ignoran página y límite, pero se mantienen la
búsqueda, los filtros y el orden. La respuesta contiene items y paginacion con
pagina, limite, total, totalPaginas, tieneAnterior y tieneSiguiente.

La búsqueda es parcial y no distingue mayúsculas/minúsculas. Persona permite
buscar por nombres, apellidos, correo, DNI y teléfono; filtra además por ID,
ubigeo, estado, departamento, provincia y distrito. Por defecto devuelve solo
personas activas. Ubigeo busca y filtra por código, departamento, provincia y
distrito.

## Endpoints de Persona Natural

- POST /api/v1/personas: crea una persona. Requiere nombres, apellidoPaterno y correoElectronico.
- GET /api/v1/personas/:id: obtiene una persona.
- PUT /api/v1/personas/:id y PATCH /api/v1/personas/:id: actualizan.
- DELETE /api/v1/personas/:id: realiza eliminación lógica.
- GET /api/v1/personas: lista, busca, filtra, ordena y pagina.
- POST /api/v1/personas/importar: recibe multipart/form-data, campo archivo,
  máximo 10 MB, extensión XLSX o CSV.

La importación espera las columnas nombres, apellido_paterno, apellido_materno,
telefono, correo_electronico, dni, direccion y codigo_ubigeo. Valida cada fila
de manera independiente y devuelve totalFilas, importadas, errores y
detalleErrores.

## Endpoints de Ubigeo

- GET /api/v1/ubigeos/:id: obtiene un ubigeo.
- GET /api/v1/ubigeos: lista, busca, filtra, ordena y pagina.

in_ubigeo es un catálogo preexistente y externo a esta funcionalidad: no se
crea, elimina ni carga mediante seed o endpoints.

---

# 75. Entidades de Involucrados

La tabla in_entidad almacena organizaciones relacionadas al proyecto. Su clave
id_entidad es numérica, autoincremental y su secuencia inicia en 1000; no usa
UUID. RUC es opcional, pero único cuando se registra.

tipo_entidad se declara como el enum de dominio Prisma in_tipo_entidad, con los
valores PUBLICA, PRIVADA, RELIGIOSA y OTROS. Prisma 8 lo persiste como texto
restringido mediante una restricción CHECK administrada por el contrato, con
los mismos valores permitidos.

La tabla mantiene la relación opcional codigo_ubigeo con in_ubigeo.id_ubigeo,
el estado es_activo y timestamps de creación y modificación. Una entidad se
elimina lógicamente cambiando es_activo a false.

## Endpoints de Entidad

- POST /api/v1/entidades: crea una entidad; requiere nombreComercial y
  tipoEntidad.
- GET /api/v1/entidades/:id: obtiene una entidad.
- PUT /api/v1/entidades/:id y PATCH /api/v1/entidades/:id: actualizan campos
  permitidos, sin modificar ID ni fecha de creación.
- DELETE /api/v1/entidades/:id: realiza eliminación lógica.
- GET /api/v1/entidades: lista entidades.
- POST /api/v1/entidades/importar: recibe multipart/form-data en el campo
  archivo; acepta CSV o XLSX de hasta 10 MB.

El listado admite pagina, limite, ordenarPor, orden, buscar, mostrarTodos,
idEntidad, ruc, razonSocial, nombreComercial, tipoEntidad, correoElectronico,
codigoUbigeo, esActivo, departamento, provincia y distrito. Por defecto solo
retorna registros activos. buscar es parcial y case-insensitive sobre RUC,
razón social, nombre comercial, correo, teléfono y dirección.

La importación exige las columnas ruc, razon_social, nombre_comercial,
tipo_entidad, telefono, correo_electronico, redes_sociales, direccion y
codigo_ubigeo. nombre_comercial y tipo_entidad son obligatorios por fila. Cada
fila se valida independientemente y la respuesta conserva totalFilas,
importadas, errores y detalleErrores.

## Swagger

La especificación OpenAPI está disponible en /api/docs. Los endpoints de
Entidades documentan sus DTOs, enum tipoEntidad, parámetros de consulta,
multipart de importación y respuestas HTTP principales.
