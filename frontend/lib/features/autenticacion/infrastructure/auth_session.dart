import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class AuthSession {
  AuthSession._();

  static const _storage = FlutterSecureStorage();
  static const _refreshTokenKey = 'auth_refresh_token';
  static const _accessTokenKey = 'auth_access_token';
  static const _nombreCompletoKey = 'auth_nombre_completo';
  static String? _refreshToken;
  static String? _accessToken;
  static String? _nombreCompleto;

  static Future<void> guardar({
    required String refreshToken,
    required String accessToken,
    required String nombreCompleto,
    required bool persistir,
  }) async {
    _refreshToken = refreshToken;
    _accessToken = accessToken;
    _nombreCompleto = nombreCompleto;
    if (!persistir) return;
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

  static Future<void> limpiar() async {
    _refreshToken = null;
    _accessToken = null;
    _nombreCompleto = null;
    await _storage.delete(key: _refreshTokenKey);
    await _storage.delete(key: _accessTokenKey);
    await _storage.delete(key: _nombreCompletoKey);
  }
}
