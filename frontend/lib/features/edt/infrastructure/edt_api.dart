import 'package:dio/dio.dart';

import '../../autenticacion/infrastructure/auth_session.dart';

const _baseUrl = String.fromEnvironment(
  'API_BASE_URL',
  defaultValue: 'http://localhost:3000/api/v1',
);

class EdtApi {
  EdtApi() : _dio = AuthSession.crearClienteAutenticado(baseUrl: _baseUrl);

  final Dio _dio;

  dynamic _data(Response<dynamic> response) =>
      response.data is Map && response.data['data'] != null
      ? response.data['data']
      : response.data;

  Future<List<Map<String, dynamic>>> listarPlantillas() async {
    final data = _data(await _dio.get('/edt/plantillas'));
    return List<Object?>.from(
      data as List? ?? const [],
    ).map((item) => Map<String, dynamic>.from(item as Map)).toList();
  }

  Future<Map<String, dynamic>> arbol(String idPlantilla) async =>
      Map<String, dynamic>.from(
        _data(await _dio.get('/edt/plantillas/$idPlantilla/arbol')) as Map,
      );

  Future<List<Map<String, dynamic>>> listarElementos() async {
    final data = _data(await _dio.get('/edt/elementos'));
    return List<Object?>.from(
      data as List? ?? const [],
    ).map((item) => Map<String, dynamic>.from(item as Map)).toList();
  }

  Future<Map<String, dynamic>> crearElemento(Map<String, dynamic> data) async =>
      Map<String, dynamic>.from(
        _data(await _dio.post('/edt/elementos', data: data)) as Map,
      );

  Future<void> agregarElementoPlantilla(
    String idPlantilla,
    Map<String, dynamic> data,
  ) => _dio.post('/edt/plantillas/$idPlantilla/elementos', data: data);

  Future<void> actualizarElementoPlantilla(
    String idPlantilla,
    String idElementoPlantilla,
    Map<String, dynamic> data,
  ) => _dio.patch(
    '/edt/plantillas/$idPlantilla/elementos/$idElementoPlantilla',
    data: data,
  );

  Future<void> reordenarElementosPlantilla(
    String idPlantilla,
    List<Map<String, dynamic>> ordenes,
  ) => _dio.patch(
    '/edt/plantillas/$idPlantilla/elementos/ordenar',
    data: {'ordenes': ordenes},
  );

  Future<void> eliminarElementoPlantilla(
    String idPlantilla,
    String idElementoPlantilla,
  ) => _dio.delete(
    '/edt/plantillas/$idPlantilla/elementos/$idElementoPlantilla',
  );

  Future<void> crearPlantilla(Map<String, dynamic> data) =>
      _dio.post('/edt/plantillas', data: data);

  Future<void> actualizarPlantilla(
    String idPlantilla,
    Map<String, dynamic> data,
  ) => _dio.patch('/edt/plantillas/$idPlantilla', data: data);

  Future<void> duplicarPlantilla(String idPlantilla, {String? nombre}) =>
      _dio.post(
        '/edt/plantillas/$idPlantilla/duplicar',
        data: {if (nombre?.trim().isNotEmpty == true) 'nombre': nombre!.trim()},
      );

  Future<void> eliminarPlantilla(String idPlantilla) =>
      _dio.delete('/edt/plantillas/$idPlantilla');
}
