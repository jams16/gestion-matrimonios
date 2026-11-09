import 'package:dio/dio.dart';

import '../../autenticacion/infrastructure/auth_session.dart';

const _baseUrl = String.fromEnvironment(
  'API_BASE_URL',
  defaultValue: 'http://localhost:3000/api/v1',
);

class RiesgosApi {
  RiesgosApi() : _dio = AuthSession.crearClienteAutenticado(baseUrl: _baseUrl);
  final Dio _dio;

  dynamic _data(Response<dynamic> r) =>
      r.data is Map && r.data['data'] != null ? r.data['data'] : r.data;
  Future<List<Map<String, dynamic>>> _lista(Future<Response<dynamic>> request) async =>
      List<Object?>.from(_data(await request) as List? ?? const [])
          .map((e) => Map<String, dynamic>.from(e as Map))
          .toList();

  Future<List<Map<String, dynamic>>> categorias(String proyecto) =>
      _lista(_dio.get('/proyectos/$proyecto/riesgos/categorias'));
  Future<void> crearCategoria(String proyecto, Map<String, dynamic> data) =>
      _dio.post('/proyectos/$proyecto/riesgos/categorias', data: data);
  Future<List<Map<String, dynamic>>> listar(String proyecto, {String? severidad}) =>
      _lista(_dio.get('/proyectos/$proyecto/riesgos', queryParameters: {
        if (severidad != null) 'severidad': severidad,
      }));
  Future<List<Map<String, dynamic>>> catalogo(String proyecto, {int? categoria, String? buscar}) =>
      _lista(_dio.get('/proyectos/$proyecto/riesgos/catalogo', queryParameters: {
        if (categoria != null) 'categoria': categoria,
        if (buscar?.trim().isNotEmpty == true) 'buscar': buscar,
      }));
  Future<void> crear(String proyecto, Map<String, dynamic> data) =>
      _dio.post('/proyectos/$proyecto/riesgos', data: data);
  Future<void> incorporar(String proyecto, int plantilla) =>
      _dio.post('/proyectos/$proyecto/riesgos/catalogo/$plantilla/incorporar');
  Future<void> actualizar(String proyecto, String riesgo, Map<String, dynamic> data) =>
      _dio.patch('/proyectos/$proyecto/riesgos/$riesgo', data: data);
  Future<void> eliminar(String proyecto, String riesgo) =>
      _dio.delete('/proyectos/$proyecto/riesgos/$riesgo');
  Future<List<Map<String, dynamic>>> matriz(String proyecto) =>
      _lista(_dio.get('/proyectos/$proyecto/riesgos/matriz'));
  Future<List<Map<String, dynamic>>> planes(String p, String r) =>
      _lista(_dio.get('/proyectos/$p/riesgos/$r/planes'));
  Future<void> crearPlan(String p, String r, Map<String, dynamic> d) =>
      _dio.post('/proyectos/$p/riesgos/$r/planes', data: d);
  Future<void> activarPlan(String p, String r, String plan, {String? incidencia}) =>
      _dio.post('/proyectos/$p/riesgos/$r/planes/$plan/activar', data: {
        if (incidencia != null) 'idIncidencia': incidencia,
      });
  Future<void> incidencia(String p, String r, Map<String, dynamic> d) =>
      _dio.post('/proyectos/$p/riesgos/$r/incidencias', data: d);
  Future<List<Map<String, dynamic>>> mitigaciones(String p, String r) =>
      _lista(_dio.get('/proyectos/$p/riesgos/$r/mitigaciones'));
  Future<void> actualizarMitigacion(String p, String r, String m, String estado) =>
      _dio.patch('/proyectos/$p/riesgos/$r/mitigaciones/$m', data: {'estado': estado});
  Future<Map<String, dynamic>> costo(String p, String r, Map<String, dynamic> d) async =>
      Map<String, dynamic>.from(_data(await _dio.post('/proyectos/$p/riesgos/$r/costos', data: d)) as Map);
  Future<void> documento(String p, String r, String c, Map<String, dynamic> d) =>
      _dio.post('/proyectos/$p/riesgos/$r/costos/$c/documentos', data: d);
}
