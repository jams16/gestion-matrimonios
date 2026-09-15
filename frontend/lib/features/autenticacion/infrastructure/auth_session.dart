import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class AuthSession {
  AuthSession._();

  static const _storage = FlutterSecureStorage();
  static const _refreshTokenKey = 'auth_refresh_token';
  static const _nombreCompletoKey = 'auth_nombre_completo';
  static String? _refreshToken;

  static Future<void> guardar({
    required String refreshToken,
    required String nombreCompleto,
    required bool persistir,
  }) async {
    _refreshToken = refreshToken;
    if (!persistir) return;
    await _storage.write(key: _refreshTokenKey, value: refreshToken);
    await _storage.write(key: _nombreCompletoKey, value: nombreCompleto);
  }

  static Future<String?> obtenerRefreshToken() async {
    return _refreshToken ?? await _storage.read(key: _refreshTokenKey);
  }

  static Future<void> limpiar() async {
    _refreshToken = null;
    await _storage.delete(key: _refreshTokenKey);
    await _storage.delete(key: _nombreCompletoKey);
  }
}
