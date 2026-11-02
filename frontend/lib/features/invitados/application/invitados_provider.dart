import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../infrastructure/invitados_api.dart';

final invitadosApiProvider = Provider<InvitadosApi>((ref) => InvitadosApi());
final invitadosResumenProvider = FutureProvider.autoDispose
    .family<Map<String, dynamic>, String>(
      (ref, idMatrimonio) =>
          ref.watch(invitadosApiProvider).resumen(idMatrimonio),
    );
final invitadosListaProvider = FutureProvider.autoDispose
    .family<List<Map<String, dynamic>>, String>(
      (ref, idMatrimonio) =>
          ref.watch(invitadosApiProvider).listar(idMatrimonio),
    );
final mesasProvider = FutureProvider.autoDispose
    .family<List<Map<String, dynamic>>, String>(
      (ref, idMatrimonio) =>
          ref.watch(invitadosApiProvider).mesas(idMatrimonio),
    );
