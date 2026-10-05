import '../../domain/entities/matrimonio_resumen.dart';
import '../../domain/repositories/matrimonios_repository.dart';
import '../data_sources/matrimonios_remote_data_source.dart';
import '../models/matrimonio_resumen_model.dart';

class MatrimoniosRepositoryImpl implements MatrimoniosRepository {
  MatrimoniosRepositoryImpl(this._remoteDataSource);

  final MatrimoniosRemoteDataSource _remoteDataSource;

  @override
  Future<List<MatrimonioResumen>> listarResumenes() async {
    final matrimonios = await _remoteDataSource.listarResumenes();
    final resumenes = matrimonios.map(MatrimonioResumenModel.fromMap).toList();

    resumenes.sort((a, b) {
      final left = a.fechaMatrimonio;
      final right = b.fechaMatrimonio;
      if (left == null && right == null) return 0;
      if (left == null) return 1;
      if (right == null) return -1;
      return left.compareTo(right);
    });

    return resumenes;
  }
}
