# Frontend — Aplicación de Gestión de Proyectos Especializada en Matrimonios

Frontend multiplataforma de la aplicación de gestión de proyectos especializada en la organización de matrimonios.

La aplicación cliente se desarrolla utilizando Flutter y Dart con una única base de código para:

- Android;
- Web responsiva;
- PWA.

El frontend es responsable de presentar información, gestionar la interacción con el usuario, mantener el estado de interfaz y consumir las operaciones expuestas por la API REST del backend.

El frontend nunca accede directamente a PostgreSQL ni implementa reglas de autorización como única medida de seguridad.

---

# 1. Stack tecnológico

| Componente | Tecnología |
|---|---|
| Framework | Flutter |
| Lenguaje | Dart |
| Plataformas | Android, Web y PWA |
| Gestión de estado | Riverpod |
| Cliente HTTP | Dio |
| Navegación | go_router |
| Persistencia segura | Abstracción de almacenamiento seguro |
| API | REST + JSON |
| Backend | NestJS |
| Formato | `dart format` |
| Análisis estático | `flutter analyze` |
| Pruebas | Flutter Test |
| Versionamiento | Git |

---

# 2. Principios arquitectónicos

El frontend utiliza:

- organización feature-first;
- separación basada en Clean Architecture;
- componentes reutilizables;
- estado gestionado mediante Riverpod;
- desacoplamiento entre presentación y acceso HTTP;
- navegación centralizada;
- manejo uniforme de errores;
- diseño adaptativo para móvil y escritorio;
- consumo exclusivo de la API REST.

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

Las dependencias deben orientarse hacia el núcleo.

Las capas internas no deben conocer detalles innecesarios de Flutter, Dio o implementaciones concretas de servicios externos.

---

# 3. Estructura general

```text
frontend/
│
├── android/
├── web/
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── lib/
│   ├── app/
│   ├── core/
│   ├── features/
│   └── main.dart
│
├── test/
├── integration_test/
│
├── pubspec.yaml
├── pubspec.lock
├── analysis_options.yaml
├── README.md
└── .gitignore
```

Las carpetas generadas por Flutter para plataformas específicas deben mantenerse separadas de la lógica funcional.

---

# 4. `lib/`

Contiene todo el código Dart de la aplicación.

```text
lib/
├── app/
├── core/
├── features/
└── main.dart
```

---

# 5. `main.dart`

Debe ser un punto de entrada pequeño.

Su responsabilidad es únicamente:

1. inicializar dependencias globales necesarias;
2. preparar configuración;
3. crear el `ProviderScope`;
4. ejecutar la aplicación.

Ejemplo conceptual:

```dart
void main() {
  runApp(
    const ProviderScope(
      child: App(),
    ),
  );
}
```

No colocar en `main.dart`:

- llamadas HTTP;
- reglas de negocio;
- navegación completa;
- lógica de autenticación;
- inicialización de funcionalidades específicas.

---

# 6. `lib/app/`

Contiene configuración global propia de la aplicación.

```text
app/
├── app.dart
├── config/
├── router/
├── theme/
└── responsive/
```

---

# 7. `app/app.dart`

Define el widget raíz de la aplicación.

Ejemplo de responsabilidades:

- `MaterialApp.router`;
- tema;
- navegación;
- configuración global de UI.

No debe contener lógica funcional de módulos.

---

# 8. `app/config/`

Configuración de ejecución del frontend.

Ejemplo:

```text
config/
├── environment.dart
└── app_config.dart
```

Aquí pueden definirse elementos como:

```text
API_BASE_URL
entorno actual
flags técnicos
```

No almacenar secretos en el frontend.

Cualquier valor incluido dentro de una aplicación Flutter distribuida debe considerarse potencialmente visible para el usuario.

---

# 9. Variables de entorno

Preferir configuración mediante:

```bash
--dart-define
```

Ejemplo:

```bash
flutter run \
  --dart-define=API_BASE_URL=http://localhost:3000/api/v1
```

En Dart:

```dart
const apiBaseUrl = String.fromEnvironment(
  'API_BASE_URL',
  defaultValue: 'http://localhost:3000/api/v1',
);
```

Nunca escribir URLs directamente dentro de páginas o repositories:

```dart
// Incorrecto
final url = 'http://localhost:3000/api/v1/proyectos';
```

La URL base debe estar centralizada.

---

# 10. `app/router/`

Contiene toda la configuración principal de navegación.

Ejemplo:

```text
router/
├── app_router.dart
├── route_names.dart
└── route_guards.dart
```

La navegación debe mantenerse centralizada.

Evitar que cada feature cree routers globales independientes.

Ejemplos de rutas:

```text
/login
/proyectos
/proyectos/:idProyecto
/proyectos/:idProyecto/cronograma
/proyectos/:idProyecto/presupuesto
/proyectos/:idProyecto/invitados
/proyectos/:idProyecto/proveedores
/proyectos/:idProyecto/riesgos
/admin
```

---

# 11. Navegación

Utilizar `go_router`.

Las rutas deben representar pantallas o recursos, no acciones internas.

Correcto:

```text
/proyectos/123/cronograma
/proyectos/123/invitados
```

Evitar:

```text
/createProject
/showGuests
/editBudget
```

---

# 12. Protección de rutas

El frontend puede impedir navegación hacia una pantalla cuando:

- el usuario no está autenticado;
- no tiene determinado rol;
- no tiene determinado permiso conocido.

Sin embargo:

```text
protección frontend ≠ autorización real
```

El backend debe validar nuevamente cada operación protegida.

La interfaz solo mejora la experiencia del usuario.

---

# 13. `app/theme/`

Contiene el sistema visual global.

Ejemplo:

```text
theme/
├── app_theme.dart
├── app_colors.dart
├── app_typography.dart
├── app_spacing.dart
└── app_radius.dart
```

Los valores visuales repetidos deben centralizarse.

Evitar:

```dart
Color(0xFF123456)
```

distribuido en decenas de widgets.

Preferir:

```dart
AppColors.primary
```

---

# 14. Sistema de diseño

Centralizar al menos:

- colores;
- tipografía;
- tamaños;
- espaciados;
- radios;
- elevaciones;
- breakpoints.

Esto permite modificar la identidad visual sin editar cientos de archivos.

---

# 15. `app/responsive/`

Contiene reglas de adaptación según tamaño de pantalla.

Ejemplo:

```text
responsive/
├── breakpoints.dart
└── responsive_layout.dart
```

Definir breakpoints centralizados.

Ejemplo conceptual:

```dart
class AppBreakpoints {
  static const mobile = 600.0;
  static const tablet = 1024.0;
}
```

No utilizar números distintos arbitrariamente en cada pantalla.

---

# 16. Diseño adaptativo

Las mismas funcionalidades deben poder utilizarse desde:

- teléfono;
- tablet cuando corresponda;
- navegador de escritorio.

La adaptación puede afectar:

- navegación;
- número de columnas;
- tamaño de componentes;
- presencia de sidebar;
- organización de formularios.

No deben existir dos aplicaciones funcionalmente distintas para móvil y web.

---

# 17. `lib/core/`

Contiene elementos técnicos transversales utilizados por múltiples features.

Ejemplo:

```text
core/
├── auth/
├── constants/
├── errors/
├── network/
├── storage/
├── utils/
└── widgets/
```

`core/` no debe convertirse en una carpeta donde colocar código funcional sin clasificación.

---

# 18. `core/network/`

Contiene configuración HTTP compartida.

Ejemplo:

```text
network/
├── api_client.dart
├── api_endpoints.dart
├── auth_interceptor.dart
└── network_exception_mapper.dart
```

El cliente HTTP se configura una sola vez.

No crear una instancia diferente de Dio en cada repository.

---

# 19. `ApiClient`

Debe centralizar:

- base URL;
- timeouts;
- headers comunes;
- serialización necesaria;
- interceptores;
- autenticación;
- tratamiento técnico de errores.

Ejemplo conceptual:

```text
Feature DataSource
      ↓
ApiClient
      ↓
Dio
      ↓
Backend
```

---

# 20. Interceptor de autenticación

El interceptor puede añadir:

```http
Authorization: Bearer <access_token>
```

a solicitudes protegidas.

También puede participar en el flujo de renovación del Access Token.

El interceptor NO contiene reglas de negocio.

---

# 21. Tokens

Nunca:

- imprimir tokens mediante `print`;
- registrar tokens en logs;
- mostrar tokens en errores;
- incluir secretos en analytics;
- almacenar contraseñas.

El almacenamiento de credenciales debe quedar encapsulado mediante:

```text
core/storage/
```

La UI no debe conocer dónde se guarda físicamente un token.

---

# 22. Access Token

Preferentemente se mantiene como estado de sesión y se utiliza para autenticar solicitudes.

Debe considerarse temporal.

No debe estar repartido entre widgets o features.

---

# 23. Refresh Token

Su almacenamiento debe abstraerse detrás de un servicio.

Ejemplo:

```text
TokenStorage
```

Esto permite utilizar una implementación adecuada según plataforma sin contaminar el resto de la aplicación.

La lógica de sesión no debe depender directamente de un paquete específico de almacenamiento.

---

# 24. `core/auth/`

Contiene infraestructura transversal relacionada con la sesión activa.

Ejemplo:

```text
auth/
├── auth_session.dart
├── current_user.dart
└── auth_state_provider.dart
```

Las funcionalidades específicas de:

- iniciar sesión;
- recuperar contraseña;
- registrar cuenta;

siguen perteneciendo a:

```text
features/autenticacion/
```

`core/auth` solo contiene conceptos globales necesarios por toda la aplicación.

---

# 25. `core/errors/`

Centraliza el modelo de errores del cliente.

Ejemplo:

```text
errors/
├── app_exception.dart
├── api_exception.dart
├── validation_exception.dart
└── failure.dart
```

El frontend debe distinguir al menos:

- errores de validación;
- autenticación;
- autorización;
- recurso inexistente;
- conflicto;
- regla de negocio;
- conectividad;
- error inesperado.

---

# 26. Errores provenientes del backend

El backend utiliza una respuesta consistente similar a:

```json
{
  "statusCode": 400,
  "code": "ACTIVIDAD_FECHA_INVALIDA",
  "message": "La fecha de finalización debe ser posterior a la fecha de inicio.",
  "details": null
}
```

El frontend debe utilizar principalmente:

```text
code
```

para identificar el error.

No depender de comparar mensajes humanos:

```dart
if (message == 'La fecha de finalización...') {
}
```

Incorrecto.

Preferir:

```dart
if (error.code == 'ACTIVIDAD_FECHA_INVALIDA') {
}
```

---

# 27. `core/widgets/`

Contiene componentes visuales realmente reutilizables en múltiples features.

Ejemplos:

```text
app_button.dart
app_text_field.dart
loading_indicator.dart
empty_state.dart
error_view.dart
confirmation_dialog.dart
```

No mover automáticamente todos los widgets aquí.

Si un widget pertenece exclusivamente a Cronograma:

```text
features/cronograma/presentation/widgets/
```

---

# 28. `core/constants/`

Solo constantes globales reales.

Ejemplo:

```text
pagination_constants.dart
ui_constants.dart
```

No almacenar reglas específicas de un módulo aquí.

---

# 29. `core/utils/`

Debe mantenerse pequeña.

Ejemplos apropiados:

```text
date_formatter.dart
currency_formatter.dart
validators compartidos
```

Evitar convertirla en:

```text
utils/
  everything.dart
```

Si una utilidad solo pertenece a Presupuesto, debe permanecer en Presupuesto.

---

# 30. `lib/features/`

Contiene las funcionalidades principales.

```text
features/
├── autenticacion/
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

Cada feature debe poder evolucionar con el menor acoplamiento posible.

---

# 31. Estructura estándar de un feature

Todos los features utilizarán:

```text
features/
└── cronograma/
    │
    ├── domain/
    │   ├── entities/
    │   └── repositories/
    │
    ├── application/
    │   ├── use_cases/
    │   └── providers/
    │
    ├── infrastructure/
    │   ├── data_sources/
    │   ├── models/
    │   └── repositories/
    │
    └── presentation/
        ├── pages/
        ├── widgets/
        └── controllers/
```

No crear una estructura distinta para cada feature según conveniencia.

---

# 32. `domain/`

Representa los conceptos principales del negocio utilizados por el cliente.

Debe mantenerse independiente de:

- Dio;
- JSON;
- HTTP;
- widgets;
- Riverpod cuando no sea necesario.

---

# 33. `domain/entities/`

Entidades del dominio.

Ejemplos:

```text
proyecto.dart
actividad.dart
invitado.dart
proveedor.dart
riesgo.dart
```

Ejemplo:

```dart
class Actividad {
  final String idActividad;
  final String nombre;
  final DateTime fechaFinPlanificada;

  const Actividad({
    required this.idActividad,
    required this.nombre,
    required this.fechaFinPlanificada,
  });
}
```

Una entidad no debe saber cómo llegó mediante HTTP.

---

# 34. `domain/repositories/`

Define los contratos que necesita la aplicación.

Ejemplo:

```text
cronograma_repository.dart
```

Ejemplo:

```dart
abstract interface class CronogramaRepository {
  Future<List<Actividad>> obtenerActividades(String idProyecto);
}
```

Aquí se define:

```text
QUÉ necesita la aplicación
```

No:

```text
CÓMO se obtiene
```

Por lo tanto esta capa no importa Dio.

---

# 35. `application/`

Coordina las operaciones y estado requerido por la interfaz.

```text
application/
├── use_cases/
└── providers/
```

---

# 36. `application/use_cases/`

Contiene acciones concretas.

Ejemplos:

```text
obtener_actividades.dart
crear_actividad.dart
reprogramar_actividad.dart
actualizar_estado_actividad.dart
```

Un caso de uso representa una intención funcional.

Evitar clases gigantes con docenas de operaciones no relacionadas.

---

# 37. ¿Siempre necesita un Use Case?

No.

La arquitectura debe permanecer útil y no ceremonial.

Para operaciones triviales, un provider puede utilizar directamente el repository si no existe lógica de coordinación relevante.

Crear un Use Case cuando:

- existe una regla;
- coordina varias operaciones;
- será reutilizado;
- representa una acción importante del dominio;
- mejora claramente la separación.

No crear clases vacías únicamente para cumplir un patrón.

---

# 38. `application/providers/`

Contiene providers Riverpod asociados al feature.

Ejemplos:

```text
actividades_provider.dart
cronograma_filters_provider.dart
actividad_detail_provider.dart
```

Aquí se gestiona:

- estado;
- carga;
- error;
- actualización;
- coordinación con repositories/use cases.

No incluir widgets.

---

# 39. Riverpod

Riverpod es el mecanismo estándar de gestión de estado.

Utilizar providers con alcance claro.

Evitar estados globales innecesarios.

Ejemplo:

```text
estado global legítimo:
- sesión
- usuario actual
- configuración global

estado local al feature:
- filtros de invitados
- actividad seleccionada
- presupuesto actual
- riesgos
```

No convertir todo en estado global.

---

# 40. `ref.watch`

Utilizar cuando la UI deba reconstruirse al cambiar un estado.

Ejemplo:

```dart
final state = ref.watch(actividadesProvider);
```

---

# 41. `ref.read`

Utilizar para ejecutar una acción puntual sin escuchar cambios.

Ejemplo:

```dart
ref.read(actividadesProvider.notifier).crearActividad(...);
```

No utilizar `read` como sustituto sistemático de `watch`.

---

# 42. Estado asíncrono

Preferir estados explícitos:

```text
loading
data
error
```

Riverpod proporciona mecanismos como:

```text
AsyncValue
```

Evitar variables dispersas:

```dart
bool loading;
bool hasError;
String? error;
List<Actividad>? data;
```

cuando una abstracción asíncrona adecuada resuelve el problema.

---

# 43. `presentation/controllers/`

Contiene controladores de interfaz cuando una pantalla requiere coordinación de comportamiento que no corresponde directamente a un widget.

Ejemplo:

```text
actividad_form_controller.dart
```

Puede coordinar:

- estado temporal del formulario;
- validaciones de interfaz;
- envío;
- interacción con providers.

No debe convertirse en una segunda capa de negocio.

---

# 44. `infrastructure/`

Implementa detalles técnicos necesarios por el feature.

```text
infrastructure/
├── data_sources/
├── models/
└── repositories/
```

---

# 45. `infrastructure/data_sources/`

Responsable de obtener o enviar información hacia fuentes externas.

Ejemplo:

```text
cronograma_remote_data_source.dart
```

Puede utilizar:

```text
Dio
ApiClient
REST
JSON
```

Ejemplo conceptual:

```text
CronogramaRemoteDataSource
        ↓
ApiClient
        ↓
Backend
```

No devuelve widgets ni maneja navegación.

---

# 46. `infrastructure/models/`

Representa modelos de transferencia utilizados por infraestructura.

Ejemplo:

```text
actividad_model.dart
```

Puede contener:

```dart
fromJson()
toJson()
```

Ejemplo:

```dart
class ActividadModel {
  factory ActividadModel.fromJson(Map<String, dynamic> json) {
    ...
  }
}
```

---

# 47. Model ≠ Entity

No confundir:

```text
ActividadModel
```

con:

```text
Actividad
```

`ActividadModel` conoce la representación JSON.

`Actividad` representa el concepto utilizado por el dominio.

Flujo:

```text
JSON
 ↓
ActividadModel
 ↓
Actividad
```

Y para enviar:

```text
Application input
 ↓
Model / request body
 ↓
JSON
```

---

# 48. `infrastructure/repositories/`

Implementa los contratos del dominio.

Ejemplo:

```text
cronograma_repository_impl.dart
```

Conceptualmente:

```dart
class CronogramaRepositoryImpl
    implements CronogramaRepository {
}
```

Utiliza:

```text
DataSource
Mapper/Model
```

pero la capa de dominio solo conoce:

```text
CronogramaRepository
```

---

# 49. `presentation/pages/`

Contiene pantallas completas.

Ejemplos:

```text
cronograma_page.dart
actividad_detail_page.dart
crear_actividad_page.dart
```

Una Page coordina composición de UI.

No debe contener:

- llamadas Dio;
- URLs;
- SQL;
- parseo complejo de JSON;
- reglas críticas de negocio.

---

# 50. `presentation/widgets/`

Componentes de presentación específicos del feature.

Ejemplos:

```text
actividad_card.dart
hito_card.dart
cronograma_toolbar.dart
dependencia_indicator.dart
```

Si un componente empieza a ser reutilizado por varios features, evaluar moverlo a:

```text
core/widgets/
```

No hacerlo prematuramente.

---

# 51. Widgets pequeños

Preferir composición.

En vez de:

```text
CronogramaPage de 1500 líneas
```

utilizar:

```text
CronogramaPage
├── CronogramaHeader
├── CronogramaFilters
├── ActividadesList
├── HitosSection
└── CronogramaEmptyState
```

Esto mejora:

- pruebas;
- mantenimiento;
- reutilización;
- legibilidad.

---

# 52. Build methods

Evitar `build()` excesivamente grandes.

Cuando un fragmento represente un elemento visual con responsabilidad propia, extraerlo a un widget.

No extraer cada `Padding` trivial a una clase distinta.

Buscar equilibrio.

---

# 53. `BuildContext`

`BuildContext` pertenece a presentación.

No enviarlo hacia:

```text
domain
repositories
data_sources
use_cases
```

Incorrecto:

```dart
repository.crearActividad(context, actividad);
```

El repository no debe conocer Flutter UI.

---

# 54. Navegación desde lógica de negocio

No utilizar:

```dart
context.go(...)
```

dentro de:

- repositories;
- data sources;
- entities.

La navegación corresponde a la capa de presentación.

---

# 55. Comunicación entre features

Evitar que una feature acceda directamente a la infraestructura interna de otra.

Incorrecto:

```text
proveedores/
    ↓
presupuesto/infrastructure/repositories/...
```

La integración principal entre dominios ocurre en el backend.

El frontend debe consumir el resultado de las operaciones expuestas por la API.

Si existe estado compartido legítimo, exponer una interfaz/provider suficientemente estable.

---

# 56. Nomenclatura de carpetas

Dart utiliza:

```text
snake_case
```

Ejemplos:

```text
use_cases/
data_sources/
value_objects/
```

No utilizar:

```text
use-cases/
DataSources/
useCases/
```

---

# 57. Nomenclatura de archivos

Todos los archivos Dart:

```text
snake_case.dart
```

Correcto:

```text
actividad.dart
actividad_model.dart
crear_actividad.dart
actividad_card.dart
cronograma_repository.dart
cronograma_repository_impl.dart
```

Incorrecto:

```text
Actividad.dart
actividadModel.dart
actividad-model.dart
```

---

# 58. Clases

PascalCase:

```dart
Actividad
ActividadModel
CronogramaRepository
CronogramaRepositoryImpl
ActividadCard
```

---

# 59. Variables y métodos

camelCase:

```dart
idProyecto
fechaInicio
crearActividad()
obtenerInvitados()
```

---

# 60. Constantes

Utilizar nombres de Dart claros y consistentes.

Ejemplo:

```dart
static const defaultPageSize = 20;
```

No utilizar convenciones propias de C como requisito:

```text
DEFAULT_PAGE_SIZE
```

salvo que exista una razón particular.

Seguir las recomendaciones de Dart.

---

# 61. Nombres privados

Dart utiliza `_`:

```dart
final Dio _dio;

void _onSubmit() {}
```

Utilizar privacidad cuando el elemento no forma parte de la interfaz pública del archivo/clase.

---

# 62. Idioma

Los conceptos del dominio se escriben en español:

```text
Proyecto
Matrimonio
Actividad
Invitado
Proveedor
Riesgo
Presupuesto
```

Los términos técnicos consolidados pueden mantenerse en inglés:

```text
Repository
Provider
Controller
DataSource
Model
Widget
Page
Router
```

Ejemplo:

```text
cronograma_repository.dart
actividad_model.dart
crear_actividad_page.dart
```

Evitar mezclas arbitrarias:

```text
create_actividad_page.dart
guest_repository.dart
presupuestoScreen.dart
```

---

# 63. JSON

La API utiliza:

```text
camelCase
```

Ejemplo:

```json
{
  "idProyecto": "...",
  "fechaInicioPlanificada": "...",
  "margenSeguridadMin": 30
}
```

Los modelos deben respetar el contrato de la API.

No exponer nombres físicos PostgreSQL:

```text
id_proyecto
fecha_inicio_planificada
```

en la interfaz de red salvo que la API los definiera explícitamente.

---

# 64. Fechas

El backend debe enviar formatos ISO 8601.

Ejemplo:

```text
2026-09-13T16:30:00.000Z
```

El frontend debe convertirlos a:

```dart
DateTime
```

No mantener fechas de negocio como strings arbitrarios.

---

# 65. Formato visual de fechas

La representación:

```text
13/09/2026
13 de septiembre
10:45 a. m.
```

pertenece a presentación.

La entidad conserva:

```dart
DateTime
```

No almacenar internamente:

```text
"13 de septiembre de 2026"
```

como fecha de dominio.

---

# 66. Dinero

Nunca utilizar `double` de manera despreocupada para cálculos financieros críticos en el cliente.

El backend es la fuente de verdad para cálculos financieros.

El frontend representa montos y muestra resultados.

Nunca confiar en un cálculo exclusivamente del cliente para registrar operaciones financieras.

---

# 67. Backend como fuente de verdad

El frontend puede calcular valores visuales temporales para UX.

Sin embargo:

- permisos;
- saldo;
- presupuesto;
- severidad;
- estados derivados críticos;
- reglas de dependencias;
- validaciones financieras;

deben ser confirmadas por el backend.

---

# 68. Validación de formularios

Existen dos niveles.

## Frontend

Validación inmediata para UX:

- requerido;
- formato de correo;
- longitud;
- valores numéricos;
- fechas básicas.

## Backend

Validación definitiva.

Nunca asumir que una petición es válida solo porque pasó un formulario Flutter.

---

# 69. Formularios

Cada formulario complejo debería tener un modelo/controlador de estado claramente definido.

Evitar veinte variables dentro de un `StatefulWidget`.

Cuando el formulario crezca:

```text
presentation/controllers/
```

o provider específico.

---

# 70. Estado local vs Riverpod

No todo necesita Riverpod.

Utilizar estado local para elementos puramente visuales como:

- pestaña seleccionada;
- expansión de panel;
- hover;
- animación temporal.

Utilizar Riverpod cuando el estado:

- proviene del backend;
- debe compartirse;
- debe sobrevivir a reconstrucciones significativas;
- representa estado funcional;
- requiere lógica asíncrona.

---

# 71. `setState`

`setState` no está prohibido.

Puede utilizarse para estado visual estrictamente local.

No utilizarlo como arquitectura principal para:

- sesión;
- proyectos;
- cronograma;
- presupuesto;
- invitados;
- proveedores;
- riesgos.

---

# 72. Responsive

No crear:

```text
cronograma_mobile_page.dart
cronograma_web_page.dart
```

para toda funcionalidad salvo que las interfaces sean realmente muy diferentes.

Preferir componentes adaptativos reutilizados.

Ejemplo:

```dart
if (width < AppBreakpoints.mobile) {
  return MobileLayout(...);
}

return DesktopLayout(...);
```

La lógica funcional debe ser la misma.

---

# 73. Tablas en escritorio

Para información extensa en Web/PWA pueden utilizarse:

- DataTable;
- tablas personalizadas;
- paneles laterales;
- layouts de varias columnas.

En móvil la misma información puede adaptarse a:

- cards;
- listas;
- bottom sheets;
- páginas de detalle.

El cambio es visual, no de reglas de negocio.

---

# 74. Accesibilidad

Todo componente interactivo debería considerar:

- contraste suficiente;
- tamaño mínimo de interacción;
- textos legibles;
- labels;
- estados de foco;
- teclado en web;
- semántica cuando corresponda.

No depender exclusivamente del color para representar estados.

Ejemplo:

```text
Retrasada
```

debe tener texto/iconografía además del color.

---

# 75. Estados obligatorios de las pantallas

Toda pantalla que consume datos remotos debe considerar:

```text
Loading
Success
Empty
Error
```

No diseñar únicamente el caso exitoso.

Ejemplo:

```text
CronogramaPage
├── Loading
├── Empty
├── Data
└── Error + retry
```

---

# 76. Errores amigables

El usuario no debe ver:

```text
DioException
SocketException
500 Internal Server Error
```

sin contexto.

Transformar errores técnicos en mensajes adecuados.

El detalle técnico puede utilizarse internamente durante desarrollo.

---

# 77. Reintentos

No reintentar automáticamente cualquier operación.

Especial cuidado con operaciones mutables:

```text
crear pago
crear contratación
actualizar presupuesto
```

Un retry automático mal implementado puede duplicar operaciones.

Los reintentos automáticos deben limitarse a operaciones idempotentes o estar soportados explícitamente por el backend.

---

# 78. Paginación

Listas potencialmente grandes deben soportar paginación cuando corresponda.

Ejemplos:

- proveedores;
- soporte;
- notificaciones;
- proyectos.

No descargar miles de registros innecesariamente.

El frontend debe utilizar la metadata enviada por la API.

---

# 79. Filtros

El estado de filtros pertenece normalmente al feature.

Ejemplo:

```text
invitados_filters_provider.dart
proveedores_filters_provider.dart
```

Cuando los filtros deban aplicarse desde backend, enviarlos como parámetros de consulta.

Ejemplo:

```text
GET /proveedores?categoria=fotografia&ubicacion=lima&page=1
```

---

# 80. Assets

Los recursos locales se almacenan en:

```text
assets/
├── images/
├── icons/
└── fonts/
```

Deben declararse en:

```text
pubspec.yaml
```

Utilizar nombres:

```text
snake_case
```

Ejemplo:

```text
logo_horizontal.png
empty_guests.svg
calendar_icon.svg
```

No:

```text
Imagen Final NUEVA 2.png
```

---

# 81. Imágenes remotas

Las imágenes obtenidas desde backend deben manejar:

- loading;
- error;
- placeholder;
- tamaños apropiados.

Evitar descargar imágenes enormes para mostrarlas en cards pequeñas.

---

# 82. `android/`

Contiene configuración específica Android generada por Flutter.

Modificar únicamente cuando una necesidad de plataforma lo requiera.

Ejemplos:

- permisos;
- nombre de aplicación;
- configuración Firebase;
- iconos;
- signing.

No colocar lógica funcional Dart aquí.

---

# 83. `web/`

Contiene configuración específica de la versión Web/PWA.

Puede incluir:

- `index.html`;
- manifest;
- favicon;
- configuración PWA.

No duplicar lógica funcional dentro de JavaScript del directorio web.

La lógica de aplicación permanece en:

```text
lib/
```

---

# 84. PWA

La versión web debe mantener:

- manifest correcto;
- iconos;
- nombre de aplicación;
- comportamiento responsive.

No asumir capacidades nativas que no estén disponibles en navegador sin comprobar compatibilidad.

---

# 85. `pubspec.yaml`

Es la fuente de dependencias Flutter.

Mantener orden y evitar dependencias innecesarias.

Agregar una dependencia:

```bash
flutter pub add paquete
```

Agregar desarrollo:

```bash
flutter pub add --dev paquete
```

No editar versiones arbitrariamente sin revisar compatibilidad.

---

# 86. Dependencias

No instalar paquetes "por si acaso".

Antes de agregar uno:

1. determinar si Flutter/Dart ya ofrece la capacidad;
2. verificar mantenimiento;
3. revisar compatibilidad Android/Web;
4. evitar dos paquetes para el mismo problema;
5. verificar si realmente será utilizado.

Una dependencia adicional incrementa mantenimiento.

---

# 87. `pubspec.lock`

Debe versionarse para la aplicación.

Permite reproducir las mismas versiones de dependencias utilizadas durante desarrollo.

---

# 88. Imports

Preferir imports de paquete para elementos externos al directorio inmediato.

Ejemplo:

```dart
import 'package:frontend/features/cronograma/domain/entities/actividad.dart';
```

Evitar rutas largas:

```dart
import '../../../../../../cronograma/...';
```

Dentro de archivos estrechamente relacionados pueden utilizarse imports relativos simples si mejoran legibilidad.

Mantener una política consistente.

---

# 89. Barrel files

Evitar crear `index.dart` para todo.

Pueden ocultar dependencias y generar ciclos.

Preferir imports explícitos mientras el beneficio de un barrel no sea evidente.

---

# 90. Formato

Antes de commit:

```bash
dart format .
```

No discutir manualmente formatos que Dart puede resolver automáticamente.

---

# 91. Análisis estático

Ejecutar:

```bash
flutter analyze
```

No dejar warnings importantes ignorados sin justificación.

No llenar:

```text
ignore:
```

simplemente para hacer desaparecer problemas.

---

# 92. `analysis_options.yaml`

Debe contener las reglas de análisis utilizadas por todo el proyecto.

No desactivar reglas únicamente porque resultan incómodas.

Si una regla debe modificarse, hacerlo conscientemente y para todo el equipo.

---

# 93. Tests

El frontend debe considerar:

- unit tests;
- provider/use case tests;
- widget tests;
- integration tests.

---

# 94. Unit tests

Prueban:

- entidades;
- mappers;
- use cases;
- repositories con mocks;
- lógica de providers.

Ejemplo:

```text
test/features/cronograma/application/
```

---

# 95. Widget tests

Prueban comportamiento visual.

Ejemplos:

- aparece estado de carga;
- aparece mensaje de error;
- botón deshabilitado;
- formulario valida campos;
- card muestra información correcta.

---

# 96. Integration tests

Flujos críticos completos.

Ejemplos:

```text
login
→ proyectos
→ crear proyecto
```

o:

```text
abrir cronograma
→ crear actividad
→ visualizar actividad
```

Ubicación:

```text
integration_test/
```

---

# 97. Organización de tests

Preferir reflejar la estructura de `lib`.

Ejemplo:

```text
test/
└── features/
    └── cronograma/
        ├── domain/
        ├── application/
        ├── infrastructure/
        └── presentation/
```

Así es fácil encontrar la prueba correspondiente.

---

# 98. Nombres de tests

Los nombres deben expresar comportamiento.

Correcto:

```dart
test(
  'debe mostrar un mensaje cuando no existen actividades',
  () {},
);
```

No:

```dart
test('test1', () {});
```

---

# 99. Mocks

Mockear límites externos:

- repository;
- API;
- storage.

No mockear cada clase únicamente para alcanzar cobertura artificial.

La prueba debe verificar comportamiento real.

---

# 100. Git

Ramas principales:

```text
main
develop
```

Trabajo:

```text
feature/*
fix/*
refactor/*
```

Ejemplos:

```text
feature/auth-login-ui
feature/cronograma-listado
feature/invitados-rsvp
fix/responsive-presupuesto
```

---

# 101. Commits

Utilizar Conventional Commits.

Ejemplos:

```text
feat(auth): implementar pantalla de inicio de sesión
feat(cronograma): mostrar actividades del proyecto
feat(invitados): agregar filtro por relación
fix(responsive): corregir layout de presupuesto
refactor(proveedores): separar card reutilizable
test(auth): agregar pruebas del formulario
docs(frontend): actualizar arquitectura
chore(deps): actualizar dependencias Flutter
```

---

# 102. Scope de commits

Mantener scopes consistentes:

```text
auth
proyectos
cronograma
presupuesto
invitados
proveedores
riesgos
administracion
notificaciones
archivos
router
theme
responsive
deps
frontend
```

---

# 103. Antes de commit

Ejecutar:

```bash
dart format .
flutter analyze
flutter test
```

Cuando corresponda también:

```bash
flutter build web
```

o:

```bash
flutter build apk
```

No subir código que:

- no compile;
- falle análisis;
- rompa tests;
- contenga secretos;
- contenga logs temporales.

---

# 104. Logging

Evitar:

```dart
print(...)
```

distribuido por la aplicación.

Durante desarrollo puede existir logging controlado.

Nunca registrar:

- contraseña;
- Access Token;
- Refresh Token;
- datos personales innecesarios.

---

# 105. Información sensible

El frontend maneja información como:

- invitados;
- teléfonos;
- correos;
- presupuesto;
- contratos;
- proveedores.

Mostrar únicamente la información necesaria según permisos.

No almacenar copias locales innecesarias.

No persistir información sensible solo para acelerar una pantalla sin evaluar el riesgo.

---

# 106. Archivos

El frontend nunca decide por sí solo dónde se almacenará físicamente un archivo.

Flujo:

```text
Usuario selecciona archivo
      ↓
Frontend valida UX básica
      ↓
Backend
      ↓
validación definitiva
      ↓
almacenamiento
```

El frontend puede validar:

- extensión;
- tamaño visible;
- selección.

El backend vuelve a validar todo.

---

# 107. Subida de archivos

Mostrar al usuario estados:

```text
seleccionado
subiendo
completado
error
```

No considerar un archivo almacenado hasta recibir confirmación del backend.

---

# 108. Notificaciones

El módulo frontend de Notificaciones presenta:

- notificaciones internas;
- leído/no leído;
- navegación al recurso correspondiente.

La generación de una alerta no se decide únicamente en el frontend.

El backend determina cuándo corresponde generar una notificación.

---

# 109. Deep linking interno

Cuando una notificación representa un recurso:

```text
Actividad
Riesgo
Proveedor
Soporte
```

debe existir una forma centralizada de resolver hacia qué ruta navegar.

Evitar condicionales repartidos por distintos widgets.

---

# 110. Loading

Evitar bloquear toda la aplicación cuando solo se está cargando una sección.

Ejemplo:

```text
Dashboard
├── resumen cargado
├── actividades cargando
└── riesgos cargados
```

Cuando sea técnicamente razonable, cada sección administra su propio estado.

---

# 111. Caché

No introducir una estrategia compleja de caché antes de necesitarla.

Riverpod puede conservar estado durante la navegación cuando corresponda.

Toda caché debe tener una política clara de invalidez.

Ejemplo:

Después de:

```text
crear actividad
```

debe invalidarse/refrescarse:

```text
lista de actividades
indicadores relacionados
```

---

# 112. Refresco de datos

Después de mutaciones exitosas:

```text
POST
PATCH
DELETE
```

actualizar únicamente los providers afectados.

Evitar recargar toda la aplicación.

---

# 113. Optimistic UI

Utilizar actualizaciones optimistas solamente cuando:

- sean fáciles de revertir;
- el riesgo de conflicto sea bajo;
- mejoren realmente la UX.

No utilizar inicialmente para operaciones sensibles como:

- pagos;
- contratación;
- presupuesto;
- permisos.

Esperar confirmación del backend.

---

# 114. Debounce

Para búsquedas:

```text
proveedores
invitados
usuarios
```

aplicar debounce cuando se consulte al backend repetidamente.

Evitar una petición HTTP por cada tecla sin control.

---

# 115. Componentes de dominio

No crear una pantalla o widget que dependa de detalles internos de Prisma o PostgreSQL.

El frontend conoce únicamente el contrato REST.

Esto permite que el backend cambie internamente sin modificar la UI.

---

# 116. Separación Backend / Frontend

El frontend NO debe duplicar reglas como fuente de verdad.

Ejemplo:

Puede advertir:

```text
"El pago supera el saldo pendiente"
```

pero el backend vuelve a validar antes de registrar el pago.

Lo mismo aplica para:

- dependencias;
- permisos;
- presupuesto;
- RSVP;
- evaluación de riesgos;
- disponibilidad.

---

# 117. Estructura de una nueva feature

Cuando se agregue una nueva funcionalidad:

```text
features/nueva_feature/
├── domain/
│   ├── entities/
│   └── repositories/
├── application/
│   ├── use_cases/
│   └── providers/
├── infrastructure/
│   ├── data_sources/
│   ├── models/
│   └── repositories/
└── presentation/
    ├── pages/
    ├── widgets/
    └── controllers/
```

No todas las subcarpetas necesitan contener archivos si la feature aún no requiere esa responsabilidad.

---

# 118. Orden recomendado para implementar una operación

Ejemplo:

```text
Mostrar actividades del cronograma
```

### 1. Entity

```text
domain/entities/actividad.dart
```

### 2. Repository contract

```text
domain/repositories/cronograma_repository.dart
```

### 3. Model

```text
infrastructure/models/actividad_model.dart
```

### 4. DataSource

```text
infrastructure/data_sources/cronograma_remote_data_source.dart
```

### 5. Repository implementation

```text
infrastructure/repositories/cronograma_repository_impl.dart
```

### 6. Use Case si aporta valor

```text
application/use_cases/obtener_actividades.dart
```

### 7. Provider

```text
application/providers/actividades_provider.dart
```

### 8. Page

```text
presentation/pages/cronograma_page.dart
```

### 9. Widgets

```text
presentation/widgets/actividad_card.dart
```

### 10. Tests

Agregar pruebas de las capas relevantes.

---

# 119. Ejemplo de flujo completo

```text
CronogramaPage
      ↓
actividadesProvider
      ↓
ObtenerActividades
      ↓
CronogramaRepository
      ↓
CronogramaRepositoryImpl
      ↓
CronogramaRemoteDataSource
      ↓
ApiClient / Dio
      ↓
NestJS API
```

Respuesta:

```text
JSON
 ↓
ActividadModel
 ↓
Actividad
 ↓
Provider
 ↓
Page
```

Ese debe ser el patrón mental habitual.

---

# 120. Definition of Done

Una funcionalidad frontend se considera terminada cuando:

- [ ] pertenece al feature correcto;
- [ ] respeta las capas;
- [ ] no realiza HTTP desde widgets;
- [ ] no contiene reglas críticas exclusivamente en UI;
- [ ] maneja Loading;
- [ ] maneja Empty cuando corresponda;
- [ ] maneja Error;
- [ ] muestra Success correctamente;
- [ ] funciona en móvil;
- [ ] funciona en Web/PWA;
- [ ] respeta permisos conocidos;
- [ ] el backend sigue siendo fuente de autorización;
- [ ] los formularios tienen validación de UX;
- [ ] los errores del backend se interpretan consistentemente;
- [ ] no hay secretos;
- [ ] no hay tokens en logs;
- [ ] existen pruebas relevantes;
- [ ] `dart format .` pasa;
- [ ] `flutter analyze` pasa;
- [ ] `flutter test` pasa;
- [ ] no contiene código temporal.

---

# 121. Comandos principales

Instalar dependencias:

```bash
flutter pub get
```

Ejecutar:

```bash
flutter run
```

Ejecutar Web:

```bash
flutter run -d chrome
```

Ver dispositivos:

```bash
flutter devices
```

Formatear:

```bash
dart format .
```

Analizar:

```bash
flutter analyze
```

Tests:

```bash
flutter test
```

Compilar Web:

```bash
flutter build web
```

Compilar APK:

```bash
flutter build apk
```

Compilar Android App Bundle:

```bash
flutter build appbundle
```

Limpiar generados:

```bash
flutter clean
flutter pub get
```

---

# 122. Ejecución con backend local

En Web normalmente puede utilizarse:

```bash
flutter run -d chrome \
  --dart-define=API_BASE_URL=http://localhost:3000/api/v1
```

En Android Emulator, `localhost` representa el propio emulador.

Habitualmente se utilizará la dirección correspondiente al host accesible desde el emulador.

La configuración debe permanecer centralizada y nunca dispersa por código.

---

# 123. Instalación inicial

Comprobar entorno:

```bash
flutter doctor
```

Instalar dependencias:

```bash
flutter pub get
```

Comprobar calidad:

```bash
flutter analyze
flutter test
```

Ejecutar:

```bash
flutter run
```

---

# 124. Dependencias base previstas

El proyecto utiliza o contempla:

```text
flutter_riverpod
dio
go_router
```

Las dependencias adicionales deben agregarse cuando una necesidad funcional concreta lo justifique.

Ejemplos futuros posibles:

- almacenamiento seguro;
- Firebase Messaging;
- selección de archivos;
- generación/visualización de documentos;
- gráficos;
- internacionalización.

No instalar anticipadamente todo el ecosistema.

---

# 125. Orden de desarrollo funcional

El frontend debería crecer aproximadamente en este orden:

1. estructura base;
2. tema y navegación;
3. cliente HTTP;
4. manejo de errores;
5. autenticación;
6. sesión;
7. proyectos;
8. cronograma;
9. presupuesto;
10. proveedores;
11. invitados;
12. riesgos;
13. notificaciones;
14. archivos;
15. administración.

Esto mantiene dependencias funcionales coherentes.

---

# 126. Primer vertical slice

La primera funcionalidad completa debe ser:

```text
Login
```

Flujo:

```text
LoginPage
    ↓
AuthController / Provider
    ↓
LoginUseCase
    ↓
AuthRepository
    ↓
AuthRepositoryImpl
    ↓
AuthRemoteDataSource
    ↓
ApiClient
    ↓
POST /auth/login
```

Esto valida:

- arquitectura frontend;
- HTTP;
- errores;
- Riverpod;
- navegación;
- sesión;
- backend.

---

# 127. Segundo vertical slice

Después implementar:

```text
Listar proyectos
```

y luego:

```text
Crear proyecto
```

Así se valida el primer flujo autenticado completo.

---

# 128. Tercer vertical slice

Después:

```text
Cronograma
→ Listar actividades
→ Crear actividad
```

Ese patrón podrá reutilizarse para el resto de features.

---

# 129. Qué NO hacer

No crear:

```text
lib/
├── screens/
├── services/
├── models/
├── widgets/
└── utils/
```

como estructura global donde todas las funcionalidades terminan mezcladas.

Tampoco:

```text
CronogramaPage
   ↓
Dio
   ↓
API
```

Ni:

```text
Widget
   ↓
RepositoryImpl
```

Ni:

```text
Provider
   ↓
BuildContext
```

---

# 130. Reglas de oro

1. Los widgets no realizan llamadas HTTP directamente.
2. Dio no aparece en Domain.
3. El Domain no depende de Flutter UI.
4. `BuildContext` no sale de Presentation.
5. Riverpod administra estado, no reglas críticas del backend.
6. El backend es la fuente de verdad.
7. Las features no acceden a infraestructura privada de otras features.
8. Los conceptos de negocio se mantienen en español.
9. Los archivos Dart utilizan `snake_case`.
10. No almacenar secretos en Flutter.
11. No imprimir tokens.
12. Las URLs se centralizan.
13. Toda pantalla remota contempla Loading/Error/Empty/Data.
14. Los widgets grandes se descomponen por responsabilidad.
15. No crear abstracciones sin beneficio real.
16. No instalar paquetes innecesarios.
17. La misma lógica funcional sirve para Android y Web/PWA.
18. Las diferencias entre plataformas deben limitarse principalmente a UI e infraestructura específica.
19. Los permisos visuales nunca reemplazan autorización backend.
20. La arquitectura solo cambia mediante una decisión explícita y documentada.

---

# 131. ¿Dónde colocar algo?

Ante una duda:

### ¿Es una entidad o contrato del negocio?

```text
feature/domain/
```

### ¿Coordina una operación?

```text
feature/application/
```

### ¿Gestiona estado Riverpod de esa funcionalidad?

```text
feature/application/providers/
```

### ¿Consume REST o transforma JSON?

```text
feature/infrastructure/
```

### ¿Es una pantalla o componente visual?

```text
feature/presentation/
```

### ¿Se utiliza técnicamente en toda la aplicación?

```text
core/
```

### ¿Es configuración global de aplicación?

```text
app/
```

### ¿Solo pertenece a una feature?

Debe permanecer dentro de esa feature.

---

# 132. Estado de la arquitectura

Esta estructura constituye el estándar base del frontend.

No debe modificarse durante el desarrollo únicamente porque una funcionalidad concreta resulte más rápida de implementar de otra forma.

Si aparece una nueva necesidad, primero revisar:

1. si encaja en las capas actuales;
2. si pertenece a una feature existente;
3. si realmente es transversal;
4. si requiere una nueva abstracción;
5. si el cambio mejora toda la solución.

El objetivo de esta arquitectura no es agregar capas innecesarias, sino mantener una base de código:

- predecible;
- mantenible;
- testeable;
- desacoplada;
- coherente entre funcionalidades;
- reutilizable entre Android y Web/PWA.