import 'package:dio/dio.dart';

import '../../autenticacion/infrastructure/auth_session.dart';

const _apiBaseUrl = String.fromEnvironment(
  'API_BASE_URL',
  defaultValue: 'http://localhost:3000/api/v1',
);

/// Adaptador REST del cronograma. Todas las reglas de precedencia, fechas y
/// conflictos siguen perteneciendo al backend.
class CronogramaApi {
  CronogramaApi() : _dio = AuthSession.crearClienteAutenticado(baseUrl: _apiBaseUrl);

  final Dio _dio;

  Future<Options> _opciones() async {
    final token = await AuthSession.obtenerAccessToken();
    if (token == null || token.isEmpty) {
      throw StateError('Tu sesión expiró. Inicia sesión nuevamente.');
    }
    return Options(headers: {'Authorization': 'Bearer $token'});
  }

  Future<Map<String, dynamic>> obtener(String idProyecto) async {
    final response = await _dio.get<Map<String, dynamic>>(
      '/proyectos/$idProyecto/cronograma',
      options: await _opciones(),
    );
    return Map<String, dynamic>.from(response.data?['data'] as Map);
  }

  Future<Map<String, dynamic>> obtenerMatrimonio(String idProyecto) async {
    final response = await _dio.get<Map<String, dynamic>>(
      '/matrimonios/onboarding/proyecto/$idProyecto',
      options: await _opciones(),
    );
    return Map<String, dynamic>.from(response.data?['data'] as Map);
  }

  Future<void> confirmarPlanificacion(String idProyecto) async {
    await _dio.post<void>(
      '/proyectos/$idProyecto/cronograma/confirmar-planificacion',
      options: await _opciones(),
    );
  }

  Future<void> crearHito(String idProyecto, Map<String, dynamic> data) =>
      _post('/proyectos/$idProyecto/cronograma/hitos', data);
  Future<void> actualizarHito(
    String idProyecto,
    String idHito,
    Map<String, dynamic> data,
  ) => _patch('/proyectos/$idProyecto/cronograma/hitos/$idHito', data);
  Future<void> eliminarHito(String idProyecto, String idHito) =>
      _delete('/proyectos/$idProyecto/cronograma/hitos/$idHito');

  Future<void> crearActividad(String idProyecto, Map<String, dynamic> data) =>
      _post('/proyectos/$idProyecto/cronograma/actividades', data);
  Future<void> actualizarActividad(
    String idProyecto,
    String idActividad,
    Map<String, dynamic> data,
  ) => _patch(
    '/proyectos/$idProyecto/cronograma/actividades/$idActividad',
    data,
  );
  Future<void> eliminarActividad(String idProyecto, String idActividad) =>
      _delete('/proyectos/$idProyecto/cronograma/actividades/$idActividad');
  Future<void> cambiarEstadoActividad(
    String idProyecto,
    String idActividad,
    String estado,
  ) => _patch(
    '/proyectos/$idProyecto/cronograma/actividades/$idActividad/estado',
    {'estado': estado},
  );

  Future<Map<String, dynamic>> previsualizarReprogramacion(
    String idProyecto,
    String idActividad,
    Map<String, dynamic> data,
  ) async {
    final response = await _dio.post<Map<String, dynamic>>(
      '/proyectos/$idProyecto/cronograma/actividades/$idActividad/reprogramacion/preview',
      data: data,
      options: await _opciones(),
    );
    return Map<String, dynamic>.from(response.data?['data'] as Map);
  }

  Future<void> confirmarReprogramacion(
    String idProyecto,
    String idActividad,
    Map<String, dynamic> data,
  ) => _post(
    '/proyectos/$idProyecto/cronograma/actividades/$idActividad/reprogramacion/confirmar',
    data,
  );

  Future<void> crearDependencia(String idProyecto, Map<String, dynamic> data) =>
      _post('/proyectos/$idProyecto/cronograma/dependencias', data);
  Future<void> eliminarDependencia(String idProyecto, String idDependencia) =>
      _delete('/proyectos/$idProyecto/cronograma/dependencias/$idDependencia');

  Future<void> crearTiming(String idProyecto, Map<String, dynamic> data) =>
      _post('/proyectos/$idProyecto/cronograma/timing', data);
  Future<void> actualizarTiming(
    String idProyecto,
    String idTiming,
    Map<String, dynamic> data,
  ) => _patch('/proyectos/$idProyecto/cronograma/timing/$idTiming', data);
  Future<void> eliminarTiming(String idProyecto, String idTiming) =>
      _delete('/proyectos/$idProyecto/cronograma/timing/$idTiming');
  Future<void> intercambiarTiming(
    String idProyecto,
    String idTiming,
    String idTimingVecino,
  ) => _patch('/proyectos/$idProyecto/cronograma/timing/intercambiar', {
    'idTiming': idTiming,
    'idTimingVecino': idTimingVecino,
  });

  Future<List<Map<String, dynamic>>> sugerenciasActividad(
    String idProyecto,
  ) async {
    final response = await _dio.get<Map<String, dynamic>>(
      '/proyectos/$idProyecto/cronograma/sugerencias/actividades',
      options: await _opciones(),
    );
    final data = List<Object?>.from(
      response.data?['data'] as List? ?? const [],
    );
    return data.map((item) => Map<String, dynamic>.from(item as Map)).toList();
  }

  Future<void> incorporarSugerencia(
    String idProyecto,
    Map<String, dynamic> data,
  ) => _post('/proyectos/$idProyecto/cronograma/sugerencias/actividades', data);

  Future<List<Map<String, dynamic>>> sugerenciasHito(String idProyecto) =>
      _obtenerSugerencias(
        '/proyectos/$idProyecto/cronograma/sugerencias/hitos',
      );
  Future<List<Map<String, dynamic>>> sugerenciasDependencia(
    String idProyecto,
  ) => _obtenerSugerencias(
    '/proyectos/$idProyecto/cronograma/sugerencias/dependencias',
  );
  Future<List<Map<String, dynamic>>> sugerenciasTiming(String idProyecto) =>
      _obtenerSugerencias(
        '/proyectos/$idProyecto/cronograma/sugerencias/timing',
      );

  Future<List<Map<String, dynamic>>> _obtenerSugerencias(String path) async {
    final response = await _dio.get<Map<String, dynamic>>(
      path,
      options: await _opciones(),
    );
    return List<Object?>.from(
      response.data?['data'] as List? ?? const [],
    ).map((item) => Map<String, dynamic>.from(item as Map)).toList();
  }

  Future<void> _post(String path, Map<String, dynamic> data) async {
    await _dio.post<void>(path, data: data, options: await _opciones());
  }

  Future<void> _patch(String path, Map<String, dynamic> data) async {
    await _dio.patch<void>(path, data: data, options: await _opciones());
  }

  Future<void> _delete(String path) async {
    await _dio.delete<void>(path, options: await _opciones());
  }
}
