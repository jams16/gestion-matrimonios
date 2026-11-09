import 'package:dio/dio.dart';

import '../../autenticacion/infrastructure/auth_session.dart';

const _baseUrl = String.fromEnvironment(
  'API_BASE_URL',
  defaultValue: 'http://localhost:3000/api/v1',
);

class ProveedoresApi {
  ProveedoresApi() : _dio = AuthSession.crearClienteAutenticado(baseUrl: _baseUrl);

  final Dio _dio;

  Future<Options> _options() async {
    final token = await AuthSession.obtenerAccessToken();
    if (token == null || token.isEmpty) {
      throw StateError('Tu sesión expiró. Inicia sesión nuevamente.');
    }
    return Options(headers: {'Authorization': 'Bearer $token'});
  }

  dynamic _data(Response<dynamic> response) =>
      response.data is Map && response.data['data'] != null
      ? response.data['data']
      : response.data;

  List<Map<String, dynamic>> _lista(Response<dynamic> response) =>
      List<Object?>.from(
        _data(response) as List? ?? const [],
      ).map((item) => Map<String, dynamic>.from(item as Map)).toList();

  Future<List<Map<String, dynamic>>> categorias() async => _lista(
    await _dio.get(
      '/proveedores/catalogos/categorias-servicio',
      options: await _options(),
    ),
  );

  Future<List<Map<String, dynamic>>> listar({
    String? buscar,
    int? idCategoriaServicio,
    String? ubicacion,
    num? costoMinimo,
    num? costoMaximo,
  }) async => _lista(
    await _dio.get(
      '/proveedores',
      queryParameters: {
        if (buscar?.trim().isNotEmpty == true) 'buscar': buscar!.trim(),
        if (idCategoriaServicio != null)
          'idCategoriaServicio': idCategoriaServicio,
        if (ubicacion?.trim().isNotEmpty == true)
          'ubicacion': ubicacion!.trim(),
        if (costoMinimo != null) 'costoMinimo': costoMinimo,
        if (costoMaximo != null) 'costoMaximo': costoMaximo,
        'activo': true,
      },
      options: await _options(),
    ),
  );

  Future<List<Map<String, dynamic>>> listarMatrimonio(
    String idMatrimonio, {
    int? idCategoriaServicio,
    String? estadoSeleccion,
  }) async => _lista(
    await _dio.get(
      '/matrimonios/$idMatrimonio/proveedores',
      queryParameters: {
        if (idCategoriaServicio != null)
          'idCategoriaServicio': idCategoriaServicio,
        if (estadoSeleccion != null) 'estadoSeleccion': estadoSeleccion,
        'activo': true,
      },
      options: await _options(),
    ),
  );

  Future<Map<String, dynamic>> crear(Map<String, dynamic> data) async {
    final response = await _dio.post(
      '/proveedores',
      data: data,
      options: await _options(),
    );
    return Map<String, dynamic>.from(_data(response) as Map);
  }

  Future<void> actualizarProveedor(
    String idProveedor,
    Map<String, dynamic> data,
  ) async {
    await _dio.patch(
      '/proveedores/$idProveedor',
      data: data,
      options: await _options(),
    );
  }

  Future<void> desactivarProveedor(String idProveedor) async {
    await _dio.delete('/proveedores/$idProveedor', options: await _options());
  }

  Future<void> asociar(
    String idMatrimonio,
    String idProveedor,
    Map<String, dynamic> data,
  ) async {
    await _dio.post(
      '/matrimonios/$idMatrimonio/proveedores/$idProveedor',
      data: data,
      options: await _options(),
    );
  }

  Future<void> actualizarRelacion(
    String idMatrimonio,
    String idProveedor,
    Map<String, dynamic> data,
  ) async {
    await _dio.patch(
      '/matrimonios/$idMatrimonio/proveedores/$idProveedor',
      data: data,
      options: await _options(),
    );
  }

  Future<void> cambiarFavorito(
    String idMatrimonio,
    String idProveedor,
    bool favorito,
  ) async {
    await _dio.patch(
      '/matrimonios/$idMatrimonio/proveedores/$idProveedor/favorito',
      data: {'favorito': favorito},
      options: await _options(),
    );
  }

  Future<void> retirar(String idMatrimonio, String idProveedor) async {
    await _dio.delete(
      '/matrimonios/$idMatrimonio/proveedores/$idProveedor',
      options: await _options(),
    );
  }

  Future<void> crearServicio(
    String idProveedor,
    Map<String, dynamic> data,
  ) async {
    await _dio.post(
      '/proveedores/$idProveedor/servicios',
      data: data,
      options: await _options(),
    );
  }

  Future<void> actualizarServicio(
    String idProveedor,
    String idServicio,
    Map<String, dynamic> data,
  ) async {
    await _dio.patch(
      '/proveedores/$idProveedor/servicios/$idServicio',
      data: data,
      options: await _options(),
    );
  }

  Future<List<Map<String, dynamic>>> disponibilidades(
    String idProveedor,
  ) async => _lista(
    await _dio.get(
      '/proveedores/$idProveedor/disponibilidades',
      options: await _options(),
    ),
  );

  Future<void> crearDisponibilidad(
    String idProveedor,
    Map<String, dynamic> data,
  ) async {
    await _dio.post(
      '/proveedores/$idProveedor/disponibilidades',
      data: data,
      options: await _options(),
    );
  }

  Future<void> actualizarDisponibilidad(
    String idProveedor,
    String idDisponibilidad,
    Map<String, dynamic> data,
  ) async {
    await _dio.patch(
      '/proveedores/$idProveedor/disponibilidades/$idDisponibilidad',
      data: data,
      options: await _options(),
    );
  }
}
