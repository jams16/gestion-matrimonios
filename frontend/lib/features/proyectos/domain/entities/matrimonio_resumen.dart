class MatrimonioResumen {
  const MatrimonioResumen({
    required this.idMatrimonio,
    required this.idProyecto,
    required this.nombreProyecto,
    required this.fechaMatrimonio,
    required this.ciudadUbicacion,
    required this.estadoProyecto,
  });

  final String idMatrimonio;
  final String idProyecto;
  final String nombreProyecto;
  final DateTime? fechaMatrimonio;
  final String ciudadUbicacion;
  final String estadoProyecto;
}
