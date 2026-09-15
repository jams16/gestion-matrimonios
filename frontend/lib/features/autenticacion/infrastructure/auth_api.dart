import 'package:dio/dio.dart';

const _apiBaseUrl = String.fromEnvironment(
  'API_BASE_URL',
  defaultValue: 'http://localhost:3000/api/v1',
);

class AuthApi {
  AuthApi() : _dio = Dio(BaseOptions(baseUrl: _apiBaseUrl));
  final Dio _dio;

  Future<Map<String, dynamic>> iniciarSesion({
    required String usuarioOCorreo,
    required String contrasena,
  }) async {
    final respuesta = await _dio.post(
      '/auth/login',
      data: {'usuarioOCorreo': usuarioOCorreo, 'contrasena': contrasena},
    );
    return Map<String, dynamic>.from(respuesta.data['data'] as Map);
  }

  Future<void> solicitarRegistro(Map<String, dynamic> data) async {
    await _dio.post('/auth/registro/solicitar', data: data);
  }

  Future<void> confirmarRegistro(String token) async {
    await _dio.post('/auth/registro/confirmar', data: {'token': token});
  }

  Future<void> finalizarRegistro(Map<String, dynamic> data) async {
    await _dio.post('/auth/registro/finalizar', data: data);
  }

  Future<void> cerrarSesion(String refreshToken) async {
    await _dio.post('/auth/logout', data: {'refreshToken': refreshToken});
  }
}
