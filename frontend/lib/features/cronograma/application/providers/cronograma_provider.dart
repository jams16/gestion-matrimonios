import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../infrastructure/cronograma_api.dart';

final cronogramaApiProvider = Provider<CronogramaApi>((ref) => CronogramaApi());

final cronogramaProvider = FutureProvider.autoDispose
    .family<Map<String, dynamic>, String>((ref, idProyecto) async {
      final api = ref.watch(cronogramaApiProvider);
      final resultados = await Future.wait([
        api.obtener(idProyecto),
        api.obtenerMatrimonio(idProyecto),
      ]);
      return {
        'cronograma': _normalizarTexto(resultados[0]),
        'matrimonio': _normalizarTexto(resultados[1]),
      };
    });

/// Corrige caracteres CP-1252 heredados de datos maestros ya almacenados.
/// No modifica los registros: solo evita que la interfaz muestre texto roto.
dynamic _normalizarTexto(dynamic valor) {
  if (valor is String) {
    return valor
        .replaceAll('\u00a2', 'ó')
        .replaceAll('\u00a1', 'í')
        .replaceAll('\u00a3', 'ú')
        .replaceAll('\u00a0', 'á')
        .replaceAll('\u00a4', 'ñ')
        .replaceAll('\u201a', 'é')
        .replaceAll('\uFFFD', '');
  }
  if (valor is List) return valor.map(_normalizarTexto).toList();
  if (valor is Map) {
    return valor.map((clave, item) => MapEntry(clave, _normalizarTexto(item)));
  }
  return valor;
}
