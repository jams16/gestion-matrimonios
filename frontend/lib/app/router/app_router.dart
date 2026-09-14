import 'package:go_router/go_router.dart';

import '../ui_kit/ui_kit_page.dart';
import '../../features/autenticacion/presentation/pages/bienvenida_page.dart';
import '../../features/autenticacion/presentation/pages/iniciar_sesion_page.dart';
import '../../features/autenticacion/presentation/pages/inicio_page.dart';
import '../../features/autenticacion/presentation/pages/recuperar_contrasena_page.dart';
import '../../features/autenticacion/presentation/pages/registrarse_page.dart';
import 'route_names.dart';

final appRouter = GoRouter(
  initialLocation: RouteNames.bienvenida,
  routes: [
    GoRoute(
      path: '/',
      builder: (context, state) => InicioPage(nombre: state.extra),
    ),
    GoRoute(
      path: RouteNames.bienvenida,
      builder: (context, state) => const BienvenidaPage(),
    ),
    GoRoute(
      path: RouteNames.iniciarSesion,
      builder: (context, state) => const IniciarSesionPage(),
    ),
    GoRoute(
      path: RouteNames.registrarse,
      builder: (context, state) => const RegistrarsePage(),
    ),
    GoRoute(
      path: RouteNames.recuperarContrasena,
      builder: (context, state) => const RecuperarContrasenaPage(),
    ),
    GoRoute(
      path: RouteNames.uiKit,
      builder: (context, state) => const UiKitPage(),
    ),
  ],
);
