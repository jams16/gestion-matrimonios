import '../../domain/entities/matrimonio_resumen.dart';

class MatrimonioResumenModel extends MatrimonioResumen {
  const MatrimonioResumenModel({
    required super.idMatrimonio,
    required super.idProyecto,
    required super.nombreProyecto,
    required super.fechaMatrimonio,
    required super.ciudadUbicacion,
    required super.estadoProyecto,
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
      estadoProyecto: _texto(data['estadoProyecto']).isEmpty
          ? 'SIN ESTADO'
          : _texto(data['estadoProyecto']),
    );
  }

  static String _texto(Object? value) => value?.toString().trim() ?? '';
}
