import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class AuthSession {
  AuthSession._();

  static const _storage = FlutterSecureStorage();
  static const _refreshTokenKey = 'auth_refresh_token';
  static const _accessTokenKey = 'auth_access_token';
  static const _nombreCompletoKey = 'auth_nombre_completo';
  static const _idProyectoActivoKey = 'auth_id_proyecto_activo';
  static const _nombreProyectoActivoKey = 'auth_nombre_proyecto_activo';
  static const _planificacionConfirmadaKey = 'auth_planificacion_confirmada';
  static const _ultimaRenovacionKey = 'auth_ultima_renovacion';
  static String? _refreshToken;
  static String? _accessToken;
  static String? _nombreCompleto;
  // Contexto de navegación de la boda seleccionada. No sustituye la
  // autorización del backend; únicamente evita ofrecer secciones que aún no
  // corresponden antes de confirmar la planificación inicial.
  static String? _idProyectoActivo;
  static String? _nombreProyectoActivo;
  static bool _planificacionConfirmada = false;
  static DateTime? _ultimaRenovacion;
  static Future<void>? _renovacionEnCurso;
  static const _renovarCada = Duration(seconds: 30);
  static const _apiBaseUrl = String.fromEnvironment(
    'API_BASE_URL',
    defaultValue: 'http://localhost:3000/api/v1',
  );

  static Future<void> guardar({
    required String refreshToken,
    required String accessToken,
    required String nombreCompleto,
    required bool persistir,
  }) async {
    _refreshToken = refreshToken;
    _accessToken = accessToken;
    _nombreCompleto = nombreCompleto;
    _ultimaRenovacion = DateTime.now();
    // A browser reload must preserve an authenticated session. The explicit
    // logout action remains the only operation that removes these values.
    // `persistir` is retained in the public API for the login UI contract.
    await _storage.write(key: _refreshTokenKey, value: refreshToken);
    await _storage.write(key: _accessTokenKey, value: accessToken);
    await _storage.write(key: _nombreCompletoKey, value: nombreCompleto);
    await _storage.write(
      key: _ultimaRenovacionKey,
      value: _ultimaRenovacion!.toIso8601String(),
    );
  }

  static Future<String?> obtenerRefreshToken() async {
    return _refreshToken ?? await _storage.read(key: _refreshTokenKey);
  }

  static Future<String?> obtenerNombreCompleto() async =>
      _nombreCompleto ?? await _storage.read(key: _nombreCompletoKey);
  /// Obtiene un token utilizable. Si hubo actividad y existe una renovaciÃ³n
  /// pendiente, espera su resultado antes de autorizar la siguiente solicitud.
  /// Esto evita que una peticiÃ³n salga con el access token anterior justo
  /// cuando el refresh token acaba de rotarse.
  static Future<String?> obtenerAccessToken() async {
    await registrarActividad();
    return _accessToken ?? await _storage.read(key: _accessTokenKey);
  }

  /// Crea un cliente para endpoints protegidos. El token se adjunta al final
  /// de cada solicitud, y ante un 401 se renueva la sesiÃ³n y se reintenta una
  /// Ãºnica vez. Un refresh fallido no borra la sesiÃ³n: puede ser un corte de
  /// red transitorio y la pantalla debe mostrar ese error, no una expiraciÃ³n
  /// falsa.
  static Dio crearClienteAutenticado({String? baseUrl}) {
    late final Dio dio;
    dio = Dio(BaseOptions(baseUrl: baseUrl ?? _apiBaseUrl));
    dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) async {
          final token = await obtenerAccessToken();
          if (token != null && token.isNotEmpty) {
            options.headers['Authorization'] = 'Bearer $token';
          }
          handler.next(options);
        },
        onError: (error, handler) async {
          final request = error.requestOptions;
          final yaReintentada = request.extra['auth_reintentada'] == true;
          if (error.response?.statusCode != 401 || yaReintentada) {
            handler.next(error);
            return;
          }

          await _renovarForzada();
          final token = _accessToken;
          if (token == null || token.isEmpty) {
            handler.next(error);
            return;
          }

          request.extra['auth_reintentada'] = true;
          request.headers['Authorization'] = 'Bearer $token';
          try {
            final response = await dio.fetch<dynamic>(request);
            handler.resolve(response);
          } on DioException catch (retryError) {
            handler.next(retryError);
          }
        },
      ),
    );
    return dio;
  }

  static Future<void> restaurar() async {
    _refreshToken = await _storage.read(key: _refreshTokenKey);
    _accessToken = await _storage.read(key: _accessTokenKey);
    _nombreCompleto = await _storage.read(key: _nombreCompletoKey);
    _ultimaRenovacion = DateTime.tryParse(
      await _storage.read(key: _ultimaRenovacionKey) ?? '',
    );
    _idProyectoActivo = await _storage.read(key: _idProyectoActivoKey);
    _nombreProyectoActivo = await _storage.read(key: _nombreProyectoActivoKey);
    _planificacionConfirmada =
        await _storage.read(key: _planificacionConfirmadaKey) == 'true';
  }

  /// Registra actividad mediante rotación silenciosa; agrupa interacciones
  /// consecutivas de 30 segundos para no generar una petición por cada toque.
  static Future<void> registrarActividad() {
    final ahora = DateTime.now();
    if (_ultimaRenovacion != null &&
        ahora.difference(_ultimaRenovacion!) < _renovarCada) {
      return Future.value();
    }
    if (_renovacionEnCurso != null) {
      return _renovacionEnCurso!;
    }
    _renovacionEnCurso = _renovarPorActividad().whenComplete(() {
      _renovacionEnCurso = null;
    });
    return _renovacionEnCurso!;
  }

  static Future<void> _renovarPorActividad() async {
    final refreshToken = await obtenerRefreshToken();
    if (refreshToken == null || refreshToken.isEmpty) {
      return;
    }
    try {
      final respuesta = await Dio(BaseOptions(baseUrl: _apiBaseUrl)).post(
        '/auth/refresh',
        data: {'refreshToken': refreshToken},
      );
      final data = Map<String, dynamic>.from(respuesta.data['data'] as Map);
      final nuevoAccess = data['accessToken']?.toString();
      final nuevoRefresh = data['refreshToken']?.toString();
      if (nuevoAccess == null || nuevoRefresh == null) {
        return;
      }
      _accessToken = nuevoAccess;
      _refreshToken = nuevoRefresh;
      _ultimaRenovacion = DateTime.now();
      await _storage.write(key: _accessTokenKey, value: nuevoAccess);
      await _storage.write(key: _refreshTokenKey, value: nuevoRefresh);
      await _storage.write(
        key: _ultimaRenovacionKey,
        value: _ultimaRenovacion!.toIso8601String(),
      );
    } on DioException {
      // No cerramos la sesión por un fallo transitorio de red. El guard del
      // backend decidirá si el refresh token realmente dejó de ser válido.
    }
  }

  static Future<void> _renovarForzada() async {
    if (_renovacionEnCurso != null) {
      await _renovacionEnCurso;
      return;
    }
    _renovacionEnCurso = _renovarPorActividad().whenComplete(() {
      _renovacionEnCurso = null;
    });
    await _renovacionEnCurso;
  }

  static String? get idProyectoActivo => _idProyectoActivo;
  static String? get nombreProyectoActivo => _nombreProyectoActivo;
  static bool get planificacionConfirmada => _planificacionConfirmada;

  static void seleccionarProyecto({
    required String idProyecto,
    String? nombreProyecto,
    required bool planificacionConfirmada,
  }) {
    final esMismoProyecto = _idProyectoActivo == idProyecto;
    _idProyectoActivo = idProyecto;
    // Las pantallas internas solo actualizan el estado de planificaciÃ³n y no
    // siempre vuelven a incluir el nombre. En ese caso conservamos el nombre
    // ya seleccionado; navegar nunca debe reemplazarlo por WeddingApp.
    if (nombreProyecto != null && nombreProyecto.trim().isNotEmpty) {
      _nombreProyectoActivo = nombreProyecto.trim();
    } else if (!esMismoProyecto) {
      _nombreProyectoActivo = null;
    }
    _planificacionConfirmada = planificacionConfirmada;
    _guardarProyectoActivo();
  }

  static void actualizarPlanificacionConfirmada(bool value) {
    _planificacionConfirmada = value;
    _guardarProyectoActivo();
  }

  static void _guardarProyectoActivo() {
    if (_idProyectoActivo == null) return;
    _storage.write(key: _idProyectoActivoKey, value: _idProyectoActivo);
    _storage.write(
      key: _nombreProyectoActivoKey,
      value: _nombreProyectoActivo,
    );
    _storage.write(
      key: _planificacionConfirmadaKey,
      value: _planificacionConfirmada.toString(),
    );
  }

  static Future<void> limpiar() async {
    _refreshToken = null;
    _accessToken = null;
    _nombreCompleto = null;
    _idProyectoActivo = null;
    _nombreProyectoActivo = null;
    _planificacionConfirmada = false;
    _ultimaRenovacion = null;
    await _storage.delete(key: _refreshTokenKey);
    await _storage.delete(key: _accessTokenKey);
    await _storage.delete(key: _nombreCompletoKey);
    await _storage.delete(key: _idProyectoActivoKey);
    await _storage.delete(key: _nombreProyectoActivoKey);
    await _storage.delete(key: _planificacionConfirmadaKey);
    await _storage.delete(key: _ultimaRenovacionKey);
  }
}
