import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../../../app/responsive/app_breakpoints.dart';
import '../../../../app/responsive/app_layout.dart';
import '../../../../app/responsive/responsive_layout.dart';
import '../../../../core/widgets/buttons/app_icon_button.dart';
import '../../../../core/widgets/navigation/app_bottom_navigation.dart';
import '../../../../core/widgets/navigation/app_navigation_item.dart';
import '../../../../core/widgets/navigation/app_navigation_rail.dart';
import '../../../../core/widgets/navigation/app_sidebar.dart';
import '../../../../core/widgets/navigation/app_top_bar.dart';
import '../../../../core/widgets/page_patterns/app_dashboard_page_pattern.dart';
import '../../infrastructure/auth_api.dart';
import '../../infrastructure/auth_session.dart';

class InicioPage extends StatefulWidget {
  const InicioPage({super.key, this.nombre});

  final Object? nombre;

  @override
  State<InicioPage> createState() => _InicioPageState();
}

class _InicioPageState extends State<InicioPage> {
  int _seccionActual = 0;

  static const _items = [
    AppNavigationItem(
      label: 'Home',
      icon: Icons.home_outlined,
      selectedIcon: Icons.home,
    ),
    AppNavigationItem(
      label: 'Plan',
      icon: Icons.auto_awesome_mosaic_outlined,
      selectedIcon: Icons.auto_awesome_mosaic,
    ),
    AppNavigationItem(
      label: 'Gestión',
      icon: Icons.account_tree_outlined,
      selectedIcon: Icons.account_tree,
    ),
    AppNavigationItem(
      label: 'Proveedores',
      icon: Icons.storefront_outlined,
      selectedIcon: Icons.storefront,
    ),
  ];

  static const _titulos = ['Home', 'Plan', 'Gestión', 'Proveedores'];
  static const _descripciones = [
    'Una vista rápida de la planificación de tu boda.',
    'Define y ordena los momentos importantes.',
    'Coordina tareas, responsables y avances.',
    'Organiza los aliados que harán realidad cada detalle.',
  ];

  String get _nombreCompleto {
    final nombre = widget.nombre?.toString().trim();
    return nombre == null || nombre.isEmpty ? 'Wedding Planner' : nombre;
  }

  void _seleccionar(int index) => setState(() => _seccionActual = index);

  Future<void> _cerrarSesion() async {
    final refreshToken = await AuthSession.obtenerRefreshToken();
    try {
      if (refreshToken != null) await AuthApi().cerrarSesion(refreshToken);
    } finally {
      await AuthSession.limpiar();
      if (mounted) context.go('/bienvenida');
    }
  }

  Widget _contenido() {
    final titulo = _titulos[_seccionActual];
    return SingleChildScrollView(
      padding: const EdgeInsets.all(AppLayout.mobilePagePadding),
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(
            maxWidth: AppLayout.maxContentWidth,
          ),
          child: AppDashboardPagePattern(
            title: _seccionActual == 0 ? 'Hola, ' + _nombreCompleto : titulo,
            description: _descripciones[_seccionActual],
            sections: [_seccion(_seccionActual)],
          ),
        ),
      ),
    );
  }

  Widget _seccion(int indice) {
    final tema = Theme.of(context);
    final datos = switch (indice) {
      0 => const [
        _Resumen(
          'Próximo paso',
          'Comienza creando el plan de tu boda.',
          Icons.celebration_outlined,
        ),
        _Resumen(
          'Tu equipo',
          'Invita a quienes participarán en la organización.',
          Icons.groups_outlined,
        ),
        _Resumen(
          'Vista general',
          'Aquí verás los avances y recordatorios importantes.',
          Icons.insights_outlined,
        ),
      ],
      1 => const [
        _Resumen(
          'Plan de boda',
          'Establece hitos, fechas y prioridades.',
          Icons.event_note_outlined,
        ),
        _Resumen(
          'Por empezar',
          'Aún no tienes tareas planificadas.',
          Icons.playlist_add_outlined,
        ),
      ],
      2 => const [
        _Resumen(
          'Gestión',
          'Centraliza responsables y el progreso de cada actividad.',
          Icons.assignment_turned_in_outlined,
        ),
        _Resumen(
          'Sin pendientes',
          'Cuando crees actividades aparecerán aquí.',
          Icons.check_circle_outline,
        ),
      ],
      _ => const [
        _Resumen(
          'Proveedores',
          'Registra y compara proveedores para tu celebración.',
          Icons.handshake_outlined,
        ),
        _Resumen(
          'Directorio vacío',
          'Añade proveedores cuando estés listo.',
          Icons.store_outlined,
        ),
      ],
    };
    return LayoutBuilder(
      builder: (context, constraints) {
        final columnas = constraints.maxWidth >= 900
            ? 3
            : constraints.maxWidth >= 600
            ? 2
            : 1;
        final ancho =
            (constraints.maxWidth - (columnas - 1) * AppLayout.gridGap) /
            columnas;
        return Wrap(
          spacing: AppLayout.gridGap,
          runSpacing: AppLayout.gridGap,
          children: datos
              .map(
                (dato) => SizedBox(
                  width: ancho,
                  child: Card(
                    child: Padding(
                      padding: const EdgeInsets.all(20),
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Icon(dato.icono, color: tema.colorScheme.primary),
                          const SizedBox(width: 12),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  dato.titulo,
                                  style: tema.textTheme.titleMedium?.copyWith(
                                    fontWeight: FontWeight.w700,
                                  ),
                                ),
                                const SizedBox(height: 4),
                                Text(
                                  dato.descripcion,
                                  style: tema.textTheme.bodyMedium,
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              )
              .toList(),
        );
      },
    );
  }

  List<Widget> _accionesAppBar() => [
    const AppIconButton(
      icon: Icons.notifications_none_outlined,
      tooltip: 'Notificaciones',
      onPressed: null,
    ),
    PopupMenuButton<_OpcionPerfil>(
      tooltip: 'Menú de perfil',
      icon: const Icon(Icons.account_circle_outlined),
      onSelected: (opcion) {
        if (opcion == _OpcionPerfil.cerrarSesion) _cerrarSesion();
      },
      itemBuilder: (context) => [
        PopupMenuItem<_OpcionPerfil>(
          enabled: false,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                _nombreCompleto,
                style: Theme.of(
                  context,
                ).textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w700),
              ),
              const SizedBox(height: 2),
              Text(
                'Wedding Planner',
                style: Theme.of(context).textTheme.bodySmall,
              ),
            ],
          ),
        ),
        const PopupMenuDivider(),
        _itemPerfil(_OpcionPerfil.miPerfil, Icons.person_outline, 'Mi Perfil'),
        _itemPerfil(_OpcionPerfil.miStaff, Icons.groups_outlined, 'Mi Staff'),
        _itemPerfil(
          _OpcionPerfil.riesgos,
          Icons.warning_amber_outlined,
          'Riesgos',
        ),
        _itemPerfil(_OpcionPerfil.misBodas, Icons.favorite_border, 'Mis bodas'),
        const PopupMenuDivider(),
        _itemPerfil(_OpcionPerfil.cerrarSesion, Icons.logout, 'Cerrar sesión'),
      ],
    ),
  ];

  PopupMenuItem<_OpcionPerfil> _itemPerfil(
    _OpcionPerfil opcion,
    IconData icono,
    String texto,
  ) => PopupMenuItem(
    value: opcion,
    child: Row(
      children: [Icon(icono, size: 20), const SizedBox(width: 12), Text(texto)],
    ),
  );

  @override
  Widget build(BuildContext context) {
    final titulo = _titulos[_seccionActual];
    return Scaffold(
      appBar: AppTopBar(title: titulo, actions: _accionesAppBar()),
      body: ResponsiveLayout(
        mobile: _contenido(),
        tablet: Row(
          children: [
            AppNavigationRail(
              items: _items,
              selectedIndex: _seccionActual,
              onDestinationSelected: _seleccionar,
            ),
            const VerticalDivider(width: 1),
            Expanded(child: _contenido()),
          ],
        ),
        desktop: Row(
          children: [
            AppSidebar(
              items: _items,
              selectedIndex: _seccionActual,
              onDestinationSelected: _seleccionar,
              header: const Text(
                'WeddingApp',
                style: TextStyle(fontWeight: FontWeight.w800),
              ),
            ),
            const VerticalDivider(width: 1),
            Expanded(child: _contenido()),
          ],
        ),
      ),
      bottomNavigationBar:
          MediaQuery.sizeOf(context).width < AppBreakpoints.mobile
          ? AppBottomNavigation(
              items: _items,
              selectedIndex: _seccionActual,
              onDestinationSelected: _seleccionar,
            )
          : null,
    );
  }
}

class _Resumen {
  const _Resumen(this.titulo, this.descripcion, this.icono);
  final String titulo;
  final String descripcion;
  final IconData icono;
}

enum _OpcionPerfil { miPerfil, miStaff, riesgos, misBodas, cerrarSesion }
