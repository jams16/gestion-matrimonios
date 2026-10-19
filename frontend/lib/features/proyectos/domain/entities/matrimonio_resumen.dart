class MatrimonioResumen {
  const MatrimonioResumen({
    required this.idMatrimonio,
    required this.idProyecto,
    required this.nombreProyecto,
    required this.fechaMatrimonio,
    required this.ciudadUbicacion,
    required this.estadoActivo,
    this.idFaseProyecto,
    this.faseCodigo,
    this.faseNombre,
  });

  final String idMatrimonio;
  final String idProyecto;
  final String nombreProyecto;
  final DateTime? fechaMatrimonio;
  final String ciudadUbicacion;

  /// Indica si el proyecto está activo; no representa su fase.
  final bool estadoActivo;
  final int? idFaseProyecto;
  final String? faseCodigo;
  final String? faseNombre;

  bool get esBorrador => faseCodigo?.trim().toUpperCase() == 'BORRADOR';

  String get etiquetaFase => faseNombre?.trim().isNotEmpty == true
      ? faseNombre!.trim()
      : faseCodigo?.trim().isNotEmpty == true
      ? faseCodigo!.trim()
      : 'Sin fase';
}
