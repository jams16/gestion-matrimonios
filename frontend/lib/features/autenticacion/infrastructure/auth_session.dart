import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class AuthSession {
  AuthSession._();

  static const _storage = FlutterSecureStorage();
  static const _refreshTokenKey = 'auth_refresh_token';
  static const _accessTokenKey = 'auth_access_token';
  static const _nombreCompletoKey = 'auth_nombre_completo';
  static const _idProyectoActivoKey = 'auth_id_proyecto_activo';
  static const _planificacionConfirmadaKey = 'auth_planificacion_confirmada';
  static String? _refreshToken;
  static String? _accessToken;
  static String? _nombreCompleto;
  // Contexto de navegación de la boda seleccionada. No sustituye la
  // autorización del backend; únicamente evita ofrecer secciones que aún no
  // corresponden antes de confirmar la planificación inicial.
  static String? _idProyectoActivo;
  static bool _planificacionConfirmada = false;

  static Future<void> guardar({
    required String refreshToken,
    required String accessToken,
    required String nombreCompleto,
    required bool persistir,
  }) async {
    _refreshToken = refreshToken;
    _accessToken = accessToken;
    _nombreCompleto = nombreCompleto;
    // A browser reload must preserve an authenticated session. The explicit
    // logout action remains the only operation that removes these values.
    // `persistir` is retained in the public API for the login UI contract.
    await _storage.write(key: _refreshTokenKey, value: refreshToken);
    await _storage.write(key: _accessTokenKey, value: accessToken);
    await _storage.write(key: _nombreCompletoKey, value: nombreCompleto);
  }

  static Future<String?> obtenerRefreshToken() async {
    return _refreshToken ?? await _storage.read(key: _refreshTokenKey);
  }

  static Future<String?> obtenerNombreCompleto() async =>
      _nombreCompleto ?? await _storage.read(key: _nombreCompletoKey);
  static Future<String?> obtenerAccessToken() async =>
      _accessToken ?? await _storage.read(key: _accessTokenKey);

  static Future<void> restaurar() async {
    _refreshToken = await _storage.read(key: _refreshTokenKey);
    _accessToken = await _storage.read(key: _accessTokenKey);
    _nombreCompleto = await _storage.read(key: _nombreCompletoKey);
    _idProyectoActivo = await _storage.read(key: _idProyectoActivoKey);
    _planificacionConfirmada =
        await _storage.read(key: _planificacionConfirmadaKey) == 'true';
  }

  static String? get idProyectoActivo => _idProyectoActivo;
  static bool get planificacionConfirmada => _planificacionConfirmada;

  static void seleccionarProyecto({
    required String idProyecto,
    required bool planificacionConfirmada,
  }) {
    _idProyectoActivo = idProyecto;
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
      key: _planificacionConfirmadaKey,
      value: _planificacionConfirmada.toString(),
    );
  }

  static Future<void> limpiar() async {
    _refreshToken = null;
    _accessToken = null;
    _nombreCompleto = null;
    _idProyectoActivo = null;
    _planificacionConfirmada = false;
    await _storage.delete(key: _refreshTokenKey);
    await _storage.delete(key: _accessTokenKey);
    await _storage.delete(key: _nombreCompletoKey);
    await _storage.delete(key: _idProyectoActivoKey);
    await _storage.delete(key: _planificacionConfirmadaKey);
  }
}
