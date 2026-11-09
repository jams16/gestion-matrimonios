import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../infrastructure/presupuesto_api.dart';

final presupuestoApiProvider = Provider<PresupuestoApi>((ref) => PresupuestoApi());
final presupuestoResumenProvider = FutureProvider.autoDispose.family<Map<String, dynamic>, String>(
  (ref, matrimonio) => ref.watch(presupuestoApiProvider).resumen(matrimonio),
);
final presupuestoCategoriasProvider = FutureProvider.autoDispose.family<List<Map<String, dynamic>>, String>(
  (ref, matrimonio) => ref.watch(presupuestoApiProvider).categorias(matrimonio),
);
final presupuestoCostosProvider = FutureProvider.autoDispose.family<List<Map<String, dynamic>>, String>(
  (ref, matrimonio) => ref.watch(presupuestoApiProvider).costos(matrimonio),
);
final presupuestoCompromisosProvider = FutureProvider.autoDispose.family<List<Map<String, dynamic>>, String>(
  (ref, matrimonio) => ref.watch(presupuestoApiProvider).compromisos(matrimonio),
);
final presupuestoNotificacionesProvider = FutureProvider.autoDispose.family<List<Map<String, dynamic>>, String>(
  (ref, matrimonio) => ref.watch(presupuestoApiProvider).notificaciones(matrimonio),
);
