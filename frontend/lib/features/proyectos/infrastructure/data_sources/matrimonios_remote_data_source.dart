import 'package:dio/dio.dart';
import '../../../autenticacion/infrastructure/auth_session.dart';

const _apiBaseUrl = String.fromEnvironment(
  'API_BASE_URL',
  defaultValue: 'http://localhost:3000/api/v1',
);

class MatrimoniosRemoteDataSource {
  MatrimoniosRemoteDataSource() : _dio = Dio(BaseOptions(baseUrl: _apiBaseUrl));

  final Dio _dio;

  Future<List<Map<String, dynamic>>> listarResumenes() async {
    final response = await _dio.get<Map<String, dynamic>>(
      '/matrimonios/resumen',
    );
    final items = List<Object?>.from(
      response.data?['data'] as List? ?? const [],
    );
    return items.map((item) => Map<String, dynamic>.from(item as Map)).toList();
  }

  Future<Map<String, dynamic>> guardarOnboarding(
    Map<String, dynamic> data, {
    required bool iniciar,
  }) async {
    final token = await AuthSession.obtenerAccessToken();
    if (token == null) throw StateError('Tu sesión expiró. Inicia sesión nuevamente.');
    final response = await _dio.post<Map<String, dynamic>>(
      iniciar ? '/matrimonios/onboarding/comenzar' : '/matrimonios/onboarding/borrador',
      data: data,
      options: Options(headers: {'Authorization': 'Bearer $token'}),
    );
    return Map<String, dynamic>.from(response.data?['data'] as Map);
  }

  Future<List<Map<String, dynamic>>> listarUbigeos() async {
    final response = await _dio.get<Map<String, dynamic>>(
      '/ubigeos',
      queryParameters: {'mostrarTodos': true},
    );
    final data = Map<String, dynamic>.from(response.data?['data'] as Map);
    final items = List<Object?>.from(data['items'] as List? ?? const []);
    return items.map((item) => Map<String, dynamic>.from(item as Map)).toList();
  }

  Future<Map<String, dynamic>> obtenerBorrador(String idProyecto) async {
    final token = await AuthSession.obtenerAccessToken();
    if (token == null) throw StateError('Tu sesión expiró. Inicia sesión nuevamente.');
    final response = await _dio.get<Map<String, dynamic>>(
      '/matrimonios/onboarding/proyecto/$idProyecto',
      options: Options(headers: {'Authorization': 'Bearer $token'}),
    );
    return Map<String, dynamic>.from(response.data?['data'] as Map);
  }
}
