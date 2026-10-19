import '../../domain/entities/matrimonio_resumen.dart';

class MatrimonioResumenModel extends MatrimonioResumen {
  const MatrimonioResumenModel({
    required super.idMatrimonio,
    required super.idProyecto,
    required super.nombreProyecto,
    required super.fechaMatrimonio,
    required super.ciudadUbicacion,
    required super.estadoActivo,
    super.idFaseProyecto,
    super.faseCodigo,
    super.faseNombre,
  });

  factory MatrimonioResumenModel.fromMap(Map<String, dynamic> data) {
    final nombreProyecto = _texto(data['nombreProyecto']).isEmpty
        ? 'Matrimonio sin nombre'
        : _texto(data['nombreProyecto']);
    final ciudad = _texto(data['ciudadUbicacion']);

    final fase = _mapa(data['faseProyecto'] ?? data['fase_proyecto']);
    // `estadoProyecto` se lee únicamente para respuestas aún no actualizadas.
    // Los nuevos contratos deben enviar faseProyecto/fase_codigo.
    final faseLegada = _texto(data['estadoProyecto']);

    return MatrimonioResumenModel(
      idMatrimonio: _texto(data['idMatrimonio']),
      idProyecto: _texto(data['idProyecto']),
      nombreProyecto: nombreProyecto,
      fechaMatrimonio: DateTime.tryParse(_texto(data['fechaMatrimonio'])),
      ciudadUbicacion: ciudad.isEmpty ? 'Ciudad pendiente' : ciudad,
      estadoActivo: _booleano(data['estado'], porDefecto: true),
      idFaseProyecto: _entero(
        data['idFaseProyecto'] ?? data['id_fase_proyecto'],
      ),
      faseCodigo:
          _texto(
            fase['codigo'] ?? data['faseCodigo'] ?? data['fase_codigo'],
          ).isNotEmpty
          ? _texto(fase['codigo'] ?? data['faseCodigo'] ?? data['fase_codigo'])
          : (faseLegada.isEmpty ? null : faseLegada),
      faseNombre:
          _texto(
            fase['nombre'] ?? data['faseNombre'] ?? data['fase_nombre'],
          ).isEmpty
          ? null
          : _texto(fase['nombre'] ?? data['faseNombre'] ?? data['fase_nombre']),
    );
  }

  static String _texto(Object? value) => value?.toString().trim() ?? '';

  static Map<String, dynamic> _mapa(Object? value) => value is Map
      ? Map<String, dynamic>.from(value)
      : const <String, dynamic>{};

  static int? _entero(Object? value) => switch (value) {
    int value => value,
    num value => value.toInt(),
    _ => int.tryParse(_texto(value)),
  };

  static bool _booleano(Object? value, {required bool porDefecto}) =>
      switch (value) {
        bool value => value,
        num value => value != 0,
        String value when value.toLowerCase() == 'true' => true,
        String value when value.toLowerCase() == 'false' => false,
        _ => porDefecto,
      };
}
