class MatrimonioResumen {
  const MatrimonioResumen({
    required this.idMatrimonio,
    required this.idProyecto,
    required this.nombreProyecto,
    required this.fechaMatrimonio,
    required this.ciudadUbicacion,
  });

  final String idMatrimonio;
  final String idProyecto;
  final String nombreProyecto;
  final DateTime? fechaMatrimonio;
  final String ciudadUbicacion;
}
