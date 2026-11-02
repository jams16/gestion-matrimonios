import 'package:dio/dio.dart';

import '../../autenticacion/infrastructure/auth_session.dart';

const _baseUrl = String.fromEnvironment(
  'API_BASE_URL',
  defaultValue: 'http://localhost:3000/api/v1',
);

class InvitadosApi {
  InvitadosApi() : _dio = Dio(BaseOptions(baseUrl: _baseUrl));
  final Dio _dio;

  Future<Options> _options() async {
    final token = await AuthSession.obtenerAccessToken();
    if (token == null || token.isEmpty)
      throw StateError('Tu sesión expiró. Inicia sesión nuevamente.');
    return Options(headers: {'Authorization': 'Bearer $token'});
  }

  dynamic _data(Response<dynamic> response) =>
      response.data is Map && response.data['data'] != null
      ? response.data['data']
      : response.data;
  Future<List<Map<String, dynamic>>> listar(
    String idMatrimonio, {
    String? buscar,
    String? lado,
  }) async {
    final r = await _dio.get(
      '/matrimonios/$idMatrimonio/invitados',
      queryParameters: {
        if (buscar?.isNotEmpty == true) 'buscar': buscar,
        if (lado != null) 'ladoRelacion': lado,
        'activo': true,
      },
      options: await _options(),
    );
    return List<Object?>.from(
      _data(r) as List? ?? const [],
    ).map((x) => Map<String, dynamic>.from(x as Map)).toList();
  }

  Future<Map<String, dynamic>> resumen(String idMatrimonio) async {
    final r = await _dio.get(
      '/matrimonios/$idMatrimonio/invitados/resumen',
      options: await _options(),
    );
    return Map<String, dynamic>.from(_data(r) as Map? ?? const {});
  }

  Future<List<Map<String, dynamic>>> categorias() async {
    final r = await _dio.get(
      '/invitados/catalogos/categorias-relacion',
      options: await _options(),
    );
    return List<Object?>.from(
      _data(r) as List? ?? const [],
    ).map((x) => Map<String, dynamic>.from(x as Map)).toList();
  }

  Future<void> crear(String idMatrimonio, Map<String, dynamic> data) async =>
      _dio.post(
        '/matrimonios/$idMatrimonio/invitados',
        data: data,
        options: await _options(),
      );
  Future<void> actualizar(
    String idMatrimonio,
    String idInvitado,
    Map<String, dynamic> data,
  ) async => _dio.patch(
    '/matrimonios/$idMatrimonio/invitados/$idInvitado',
    data: data,
    options: await _options(),
  );
  Future<void> desactivar(String idMatrimonio, String idInvitado) async =>
      _dio.delete(
        '/matrimonios/$idMatrimonio/invitados/$idInvitado',
        options: await _options(),
      );
  Future<void> actualizarRsvp(String m, String i, String estado) async =>
      _dio.patch(
        '/matrimonios/$m/invitados/$i/rsvp',
        data: {'estadoRsvp': estado},
        options: await _options(),
      );
  Future<void> verificarRsvp(String m, String i, int numero) async => _dio.post(
    '/matrimonios/$m/invitados/$i/rsvp/verificacion-manual-$numero',
    options: await _options(),
  );
  Future<void> cancelarConfirmacion(String m, String i, int nivel) async =>
      _dio.patch(
        '/matrimonios/$m/invitados/$i/rsvp/cancelar-confirmacion',
        data: {'nivel': nivel},
        options: await _options(),
      );
  Future<void> crearAcompanante(
    String matrimonio,
    String titular,
    Map<String, dynamic> data,
  ) async => _dio.post(
    '/matrimonios/$matrimonio/invitados/$titular/acompanantes',
    data: data,
    options: await _options(),
  );

  Future<List<Map<String, dynamic>>> mesas(String idMatrimonio) async {
    final response = await _dio.get(
      '/matrimonios/$idMatrimonio/mesas/representacion',
      options: await _options(),
    );
    return List<Object?>.from(
      _data(response) as List? ?? const [],
    ).map((item) => Map<String, dynamic>.from(item as Map)).toList();
  }

  Future<void> crearMesa(
    String idMatrimonio,
    Map<String, dynamic> data,
  ) async => _dio.post(
    '/matrimonios/$idMatrimonio/mesas',
    data: data,
    options: await _options(),
  );

  Future<void> actualizarMesa(
    String matrimonio,
    String mesa,
    Map<String, dynamic> data,
  ) async => _dio.patch(
    '/matrimonios/$matrimonio/mesas/$mesa',
    data: data,
    options: await _options(),
  );
  Future<void> desactivarMesa(String matrimonio, String mesa) async =>
      _dio.delete(
        '/matrimonios/$matrimonio/mesas/$mesa',
        options: await _options(),
      );
  Future<void> asignarAMesa(
    String matrimonio,
    String mesa,
    String invitado,
  ) async => _dio.post(
    '/matrimonios/$matrimonio/mesas/$mesa/invitados/$invitado',
    options: await _options(),
  );
}
