import 'package:go_router/go_router.dart';

import '../ui_kit/ui_kit_page.dart';
import '../../features/autenticacion/presentation/pages/bienvenida_page.dart';
import '../../features/autenticacion/presentation/pages/iniciar_sesion_page.dart';
import '../../features/autenticacion/presentation/pages/inicio_page.dart';
import '../../features/autenticacion/presentation/pages/recuperar_contrasena_page.dart';
import '../../features/autenticacion/presentation/pages/registrarse_page.dart';
import '../../features/proyectos/presentation/pages/seleccionar_matrimonio_page.dart';
import '../../features/proyectos/presentation/pages/crear_matrimonio_page.dart';
import 'route_names.dart';

final appRouter = GoRouter(
  initialLocation: RouteNames.bienvenida,
  routes: [
    GoRoute(path: '/', redirect: (context, state) => '/home'),
    GoRoute(
      path: '/home',
      builder: (context, state) => InicioPage(nombre: state.extra, seccion: 0),
    ),
    GoRoute(
      path: '/plan',
      builder: (context, state) => InicioPage(nombre: state.extra, seccion: 1),
    ),
    GoRoute(
      path: '/gestion',
      builder: (context, state) => InicioPage(nombre: state.extra, seccion: 2),
    ),
    GoRoute(
      path: '/proveedores',
      builder: (context, state) => InicioPage(nombre: state.extra, seccion: 3),
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
      path: RouteNames.matrimonios,
      builder: (context, state) =>
          SeleccionarMatrimonioPage(nombre: state.extra),
    ),
    GoRoute(
      path: RouteNames.matrimonio,
      builder: (context, state) => const CrearMatrimonioPage(),
    ),
    GoRoute(
      path: RouteNames.uiKit,
      builder: (context, state) => const UiKitPage(),
    ),
  ],
);
