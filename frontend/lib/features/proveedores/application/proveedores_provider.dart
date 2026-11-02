import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../cronograma/application/providers/cronograma_provider.dart';
import '../infrastructure/proveedores_api.dart';

final proveedoresApiProvider = Provider<ProveedoresApi>(
  (ref) => ProveedoresApi(),
);

final proveedoresCategoriasProvider =
    FutureProvider.autoDispose<List<Map<String, dynamic>>>(
      (ref) => ref.watch(proveedoresApiProvider).categorias(),
    );

final proveedoresMatrimonioProvider = FutureProvider.autoDispose
    .family<List<Map<String, dynamic>>, String>(
      (ref, idMatrimonio) =>
          ref.watch(proveedoresApiProvider).listarMatrimonio(idMatrimonio),
    );

final proveedorMatrimonioActivoProvider = FutureProvider.autoDispose
    .family<Map<String, dynamic>, String>((ref, idProyecto) async {
      final raw = await ref
          .watch(cronogramaApiProvider)
          .obtenerMatrimonio(idProyecto);
      final matrimonio = raw['matrimonio'] is Map
          ? Map<String, dynamic>.from(raw['matrimonio'] as Map)
          : raw;
      final id = (matrimonio['idMatrimonio'] ?? matrimonio['id_matrimonio'])
          ?.toString();
      if (id == null || id.isEmpty) {
        throw StateError('No se encontró el matrimonio activo.');
      }
      return {...matrimonio, 'idMatrimonio': id};
    });
