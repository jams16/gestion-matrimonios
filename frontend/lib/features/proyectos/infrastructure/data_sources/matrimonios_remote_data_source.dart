import 'package:dio/dio.dart';

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
}
