import '../../domain/entities/matrimonio_resumen.dart';

class MatrimonioResumenModel extends MatrimonioResumen {
  const MatrimonioResumenModel({
    required super.idMatrimonio,
    required super.idProyecto,
    required super.nombreProyecto,
    required super.fechaMatrimonio,
    required super.ciudadUbicacion,
  });

  factory MatrimonioResumenModel.fromMap(Map<String, dynamic> data) {
    final nombreProyecto = _texto(data['nombreProyecto']).isEmpty
        ? 'Matrimonio sin nombre'
        : _texto(data['nombreProyecto']);
    final ciudad = _texto(data['ciudadUbicacion']);

    return MatrimonioResumenModel(
      idMatrimonio: _texto(data['idMatrimonio']),
      idProyecto: _texto(data['idProyecto']),
      nombreProyecto: nombreProyecto,
      fechaMatrimonio: DateTime.tryParse(_texto(data['fechaMatrimonio'])),
      ciudadUbicacion: ciudad.isEmpty ? 'Ciudad pendiente' : ciudad,
    );
  }

  static String _texto(Object? value) => value?.toString().trim() ?? '';
}
