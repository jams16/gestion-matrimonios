import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../domain/entities/matrimonio_resumen.dart';
import '../../domain/repositories/matrimonios_repository.dart';
import '../../infrastructure/data_sources/matrimonios_remote_data_source.dart';
import '../../infrastructure/repositories/matrimonios_repository_impl.dart';

final matrimoniosRemoteDataSourceProvider =
    Provider<MatrimoniosRemoteDataSource>(
      (ref) => MatrimoniosRemoteDataSource(),
    );

final matrimoniosRepositoryProvider = Provider<MatrimoniosRepository>(
  (ref) =>
      MatrimoniosRepositoryImpl(ref.watch(matrimoniosRemoteDataSourceProvider)),
);

final matrimoniosResumenProvider =
    FutureProvider.autoDispose<List<MatrimonioResumen>>((ref) {
      return ref.watch(matrimoniosRepositoryProvider).listarResumenes();
    });
