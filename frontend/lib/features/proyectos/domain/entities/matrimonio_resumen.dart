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

  int get progresoFases {
    switch (faseCodigo?.trim().toUpperCase()) {
      case 'INICIO':
        return 1;
      case 'PLANIFICACION':
        return 2;
      case 'MONITOREO_Y_CONTROL':
      case 'EJECUCION':
        return _esDiaDeLaBoda ? 4 : 3;
      case 'CIERRE':
        return 5;
      default:
        return 0;
    }
  }

  bool get _esDiaDeLaBoda {
    if (fechaMatrimonio == null) return false;
    final hoy = DateTime.now();
    return fechaMatrimonio!.year == hoy.year &&
        fechaMatrimonio!.month == hoy.month &&
        fechaMatrimonio!.day == hoy.day;
  }

  String get etiquetaProgreso {
    switch (progresoFases) {
      case 1:
        return 'Iniciado';
      case 2:
        return 'Planificación';
      case 3:
        return 'Ejecución';
      case 4:
        return 'Día de la boda';
      case 5:
        return 'Cierre';
      default:
        return 'Borrador';
    }
  }
}
