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

  Future<Map<String, dynamic>> arbol(String idPlantilla) async {
    final contenido = _data(
      await _dio.get('/edt/plantillas/$idPlantilla/arbol'),
    );
    if (contenido is! Map) {
      throw StateError(
        'La respuesta del árbol EDT no tiene el formato esperado.',
      );
    }

    // El interceptor de la API normalmente entrega { data: {...} }. Se acepta
    // también una envoltura adicional para no descartar el árbol si el servidor
    // o un proxy ya lo envolvió antes de responder.
    final respuesta = Map<String, dynamic>.from(contenido);
    final datosAnidados = respuesta['data'];
    return datosAnidados is Map<String, dynamic>
        ? datosAnidados
        : datosAnidados is Map
        ? Map<String, dynamic>.from(datosAnidados)
        : respuesta;
  }

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

  Future<Map<String, dynamic>> crearEdtMatrimonio(
    String idMatrimonio,
    Map<String, dynamic> data,
  ) async => Map<String, dynamic>.from(
    _data(await _dio.post('/matrimonios/$idMatrimonio/edt', data: data)) as Map,
  );

  Future<void> agregarElementoMatrimonio(
    String idMatrimonio,
    Map<String, dynamic> data,
  ) => _dio.post('/matrimonios/$idMatrimonio/edt/elementos', data: data);

  Future<Map<String, dynamic>> obtenerEdtMatrimonio(
    String idMatrimonio,
  ) async => Map<String, dynamic>.from(
    _data(await _dio.get('/matrimonios/$idMatrimonio/edt')) as Map,
  );

  Future<void> actualizarElementoMatrimonio(
    String idMatrimonio,
    String idElemento,
    Map<String, dynamic> data,
  ) => _dio.patch(
    '/matrimonios/$idMatrimonio/edt/elementos/$idElemento',
    data: data,
  );

  Future<void> eliminarElementoMatrimonio(
    String idMatrimonio,
    String idElemento,
  ) => _dio.delete('/matrimonios/$idMatrimonio/edt/elementos/$idElemento');
}
