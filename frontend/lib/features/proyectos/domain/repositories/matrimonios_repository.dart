import '../entities/matrimonio_resumen.dart';

abstract interface class MatrimoniosRepository {
  Future<List<MatrimonioResumen>> listarResumenes();
}
