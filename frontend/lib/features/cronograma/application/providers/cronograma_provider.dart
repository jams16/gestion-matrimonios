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
      return {'cronograma': resultados[0], 'matrimonio': resultados[1]};
    });
