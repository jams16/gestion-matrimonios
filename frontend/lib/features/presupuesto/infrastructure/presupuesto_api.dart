import 'package:dio/dio.dart';

import '../../autenticacion/infrastructure/auth_session.dart';

const _baseUrl = String.fromEnvironment(
  'API_BASE_URL',
  defaultValue: 'http://localhost:3000/api/v1',
);

/// Cliente del modulo Presupuesto. Las reglas de calculo, alertas y
/// sincronizacion con proveedores se resuelven exclusivamente en el backend.
class PresupuestoApi {
  PresupuestoApi() : _dio = AuthSession.crearClienteAutenticado(baseUrl: _baseUrl);
  final Dio _dio;

  dynamic _data(Response<dynamic> r) =>
      r.data is Map && r.data['data'] != null ? r.data['data'] : r.data;
  Future<Map<String, dynamic>> _map(Future<Response<dynamic>> future) async =>
      Map<String, dynamic>.from(_data(await future) as Map? ?? const {});
  Future<List<Map<String, dynamic>>> _list(Future<Response<dynamic>> future) async =>
      List<Object?>.from(_data(await future) as List? ?? const [])
          .map((x) => Map<String, dynamic>.from(x as Map))
          .toList();

  String _root(String matrimonio) => '/matrimonios/$matrimonio/presupuesto';

  Future<Map<String, dynamic>> obtener(String m) =>
      _map(_dio.get(_root(m)));
  Future<Map<String, dynamic>> actualizar(String m, Map<String, dynamic> body) =>
      _map(_dio.patch(_root(m), data: body));
  Future<Map<String, dynamic>> resumen(String m) =>
      _map(_dio.get('${_root(m)}/resumen'));
  Future<List<Map<String, dynamic>>> desglose(String m) =>
      _list(_dio.get('${_root(m)}/desglose'));

  Future<List<Map<String, dynamic>>> categorias(String m) =>
      _list(_dio.get('${_root(m)}/categorias'));
  Future<void> crearCategoria(String m, Map<String, dynamic> b) async =>
      _dio.post('${_root(m)}/categorias', data: b);
  Future<void> editarCategoria(String m, int id, Map<String, dynamic> b) async =>
      _dio.patch('${_root(m)}/categorias/$id', data: b);
  Future<void> eliminarCategoria(String m, int id) async =>
      _dio.delete('${_root(m)}/categorias/$id');

  Future<List<Map<String, dynamic>>> costos(String m, {int? categoria, String? estado}) =>
      _list(_dio.get('${_root(m)}/costos', queryParameters: {
        'activo': true,
        if (categoria != null) 'idCategoriaPresupuesto': categoria,
        if (estado != null) 'estado': estado,
      }));
  Future<Map<String, dynamic>> costo(String m, String id) =>
      _map(_dio.get('${_root(m)}/costos/$id'));
  Future<void> crearCosto(String m, Map<String, dynamic> b) async =>
      _dio.post('${_root(m)}/costos', data: b);
  Future<void> editarCosto(String m, String id, Map<String, dynamic> b) async =>
      _dio.patch('${_root(m)}/costos/$id', data: b);
  Future<void> eliminarCosto(String m, String id) async =>
      _dio.delete('${_root(m)}/costos/$id');

  Future<List<Map<String, dynamic>>> pagos(String m, String costo) =>
      _list(_dio.get('${_root(m)}/costos/$costo/pagos'));
  Future<void> crearPago(String m, String costo, Map<String, dynamic> b) async =>
      _dio.post('${_root(m)}/costos/$costo/pagos', data: b);
  Future<void> editarPago(String m, String costo, String pago, Map<String, dynamic> b) async =>
      _dio.patch('${_root(m)}/costos/$costo/pagos/$pago', data: b);
  Future<void> eliminarPago(String m, String costo, String pago) async =>
      _dio.delete('${_root(m)}/costos/$costo/pagos/$pago');
  Future<List<Map<String, dynamic>>> documentos(String m, String costo, String pago) =>
      _list(_dio.get('${_root(m)}/costos/$costo/pagos/$pago/documentos'));
  Future<void> crearDocumento(String m, String costo, String pago, Map<String, dynamic> b) async =>
      _dio.post('${_root(m)}/costos/$costo/pagos/$pago/documentos', data: b);
  Future<List<Map<String, dynamic>>> seguimientos(String m, String costo, String pago) =>
      _list(_dio.get('${_root(m)}/costos/$costo/pagos/$pago/seguimientos'));
  Future<void> crearSeguimiento(String m, String costo, String pago, Map<String, dynamic> b) async =>
      _dio.post('${_root(m)}/costos/$costo/pagos/$pago/seguimientos', data: b);

  Future<List<Map<String, dynamic>>> compromisos(String m) =>
      _list(_dio.get('${_root(m)}/compromisos'));
  Future<void> crearCompromiso(String m, String costo, Map<String, dynamic> b) async =>
      _dio.post('${_root(m)}/costos/$costo/compromisos', data: b);
  Future<List<Map<String, dynamic>>> notificaciones(String m) =>
      _list(_dio.get('${_root(m)}/notificaciones'));
  Future<void> leerNotificacion(String m, String id) async =>
      _dio.patch('${_root(m)}/notificaciones/$id/leida');
  Future<Map<String, dynamic>> reporte(String m) =>
      _map(_dio.get('${_root(m)}/reportes'));
  Future<Map<String, dynamic>> exportar(String m, String formato) =>
      _map(_dio.get('${_root(m)}/reportes/exportar/$formato'));
}
