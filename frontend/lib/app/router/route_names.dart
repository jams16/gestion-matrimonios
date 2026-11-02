abstract final class RouteNames {
  static const uiKit = '/ui-kit';
  static const bienvenida = '/bienvenida';
  static const iniciarSesion = '/iniciar-sesion';
  static const registrarse = '/registrarse';
  static const recuperarContrasena = '/recuperar-contrasena';
  static const matrimonios = '/matrimonios';
  static const matrimonio = '/matrimonio';
  static const plan = '/plan';
}

class PlanificacionCargaRouteData {
  const PlanificacionCargaRouteData(this.idProyecto);
  final String idProyecto;
}
