import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../ui_kit/ui_kit_page.dart';
import '../../features/autenticacion/presentation/pages/bienvenida_page.dart';
import '../../features/autenticacion/presentation/pages/iniciar_sesion_page.dart';
import '../../features/autenticacion/presentation/pages/inicio_page.dart';
import '../../features/autenticacion/presentation/pages/recuperar_contrasena_page.dart';
import '../../features/autenticacion/presentation/pages/registrarse_page.dart';
import '../../features/proyectos/presentation/pages/seleccionar_matrimonio_page.dart';
import '../../features/proyectos/presentation/pages/crear_matrimonio_page.dart';
import '../../features/cronograma/presentation/pages/cronograma_page.dart';
import '../../features/cronograma/presentation/pages/planificar_matrimonio_page.dart';
import '../../features/invitados/presentation/gestion_invitados_pages.dart';
import '../../features/proveedores/presentation/proveedores_page.dart';
import '../../features/riesgos/presentation/riesgos_page.dart';
import '../../features/presupuesto/presentation/presupuesto_page.dart';
import '../../features/autenticacion/infrastructure/auth_session.dart';
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
      builder: (context, state) {
        final extra = state.extra;
        if (extra is PlanificacionCargaRouteData) {
          return PlanificarMatrimonioPage(idProyecto: extra.idProyecto);
        }
        final idProyecto = AuthSession.idProyectoActivo;
        if (idProyecto != null) {
          return InicioPage(
            seccion: 1,
            contenidoPlan: CronogramaPage(
              idProyecto: idProyecto,
              embebido: true,
            ),
          );
        }
        return InicioPage(nombre: extra, seccion: 1);
      },
    ),
    GoRoute(
      path: '/gestion',
      builder: (context, state) {
        final idProyecto = AuthSession.idProyectoActivo;
        return InicioPage(
          nombre: state.extra,
          seccion: 2,
          contenidoGestion: idProyecto == null
              ? null
              : GestionPage(idProyecto: idProyecto),
        );
      },
    ),
    GoRoute(
      path: '/gestion/invitados',
      builder: (context, state) {
        final idProyecto = AuthSession.idProyectoActivo;
        return InicioPage(
          nombre: state.extra,
          seccion: 2,
          contenidoGestion: idProyecto == null
              ? null
              : ListaInvitadosPage(idProyecto: idProyecto),
        );
      },
    ),
    GoRoute(
      path: '/presupuesto',
      builder: (context, state) {
        final idProyecto = AuthSession.idProyectoActivo;
        return InicioPage(
          nombre: state.extra,
          seccion: 2,
          contenidoGestion: idProyecto == null
              ? const Center(child: Text('Selecciona un matrimonio para ver el presupuesto.'))
              : PresupuestoPage(idProyecto: idProyecto),
        );
      },
    ),
    GoRoute(
      path: '/proveedores',
      builder: (context, state) {
        final idProyecto = AuthSession.idProyectoActivo;
        return InicioPage(
          nombre: state.extra,
          seccion: 3,
          contenidoProveedores: idProyecto == null
              ? null
              : ProveedoresPage(idProyecto: idProyecto),
        );
      },
    ),
    GoRoute(
      path: '/riesgos',
      builder: (context, state) {
        final idProyecto = AuthSession.idProyectoActivo;
        return InicioPage(
          sinSeleccionNavegacion: true,
          contenidoExtra: idProyecto == null
              ? const Center(child: Text('Selecciona un matrimonio para ver sus riesgos.'))
              : RiesgosPage(idProyecto: idProyecto),
        );
      },
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
          SeleccionarMatrimonioPage(desdeHome: state.extra == true),
    ),
    GoRoute(
      path: RouteNames.matrimonio,
      builder: (context, state) =>
          CrearMatrimonioPage(idProyectoBorrador: state.extra as String?),
    ),
    GoRoute(
      path: RouteNames.uiKit,
      builder: (context, state) => const UiKitPage(),
    ),
  ],
);
