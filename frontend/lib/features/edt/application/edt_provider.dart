import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../infrastructure/edt_api.dart';

final edtApiProvider = Provider<EdtApi>((_) => EdtApi());

final plantillasEdtProvider =
    FutureProvider.autoDispose<List<Map<String, dynamic>>>(
      (ref) => ref.read(edtApiProvider).listarPlantillas(),
    );
