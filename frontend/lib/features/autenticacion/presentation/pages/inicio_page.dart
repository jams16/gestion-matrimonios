import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../../../app/responsive/app_breakpoints.dart';
import '../../../../app/responsive/app_layout.dart';
import '../../../../app/responsive/responsive_layout.dart';
import '../../../../app/theme/app_colors.dart';
import '../../../../app/theme/app_spacing.dart';
import '../../../../core/widgets/buttons/app_icon_button.dart';
import '../../../../core/widgets/navigation/app_bottom_navigation.dart';
import '../../../../core/widgets/navigation/app_navigation_item.dart';
import '../../../../core/widgets/navigation/app_navigation_rail.dart';
import '../../../../core/widgets/navigation/app_sidebar.dart';
import '../../../../core/widgets/navigation/app_top_bar.dart';
import '../../infrastructure/auth_api.dart';
import '../../infrastructure/auth_session.dart';

class InicioPage extends StatefulWidget {
  const InicioPage({super.key, this.nombre, this.seccion = 0});

  final Object? nombre;
  final int seccion;

  @override
  State<InicioPage> createState() => _InicioPageState();
}

class _InicioPageState extends State<InicioPage> {
  static bool _sidebarContraido = false;
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
  static const _rutas = ['/home', '/plan', '/gestion', '/proveedores'];

  @override
  void initState() {
    super.initState();
    _seccionActual = widget.seccion;
  }

  String get _nombreCompleto {
    final nombre = widget.nombre?.toString().trim();
    return nombre == null || nombre.isEmpty ? 'Wedding Planner' : nombre;
  }

  void _seleccionar(int index) {
    if (index != _seccionActual) {
      context.go(_rutas[index], extra: _nombreCompleto);
    }
  }

  Future<void> _cerrarSesion() async {
    final refreshToken = await AuthSession.obtenerRefreshToken();
    try {
      if (refreshToken != null) await AuthApi().cerrarSesion(refreshToken);
    } finally {
      await AuthSession.limpiar();
      if (mounted) context.go('/bienvenida');
    }
  }

  Widget _tarjeta(String titulo, String descripcion, IconData icono) {
    final tema = Theme.of(context);
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(AppSpacing.xl),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Icon(icono, color: tema.colorScheme.primary),
            const SizedBox(width: AppSpacing.lg),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    titulo,
                    style: tema.textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const SizedBox(height: AppSpacing.xs),
                  Text(descripcion, style: tema.textTheme.bodyMedium),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _contenido() {
    final tarjeta = switch (_seccionActual) {
      0 => _tarjeta(
        'Vista general',
        'Aquí verás los avances y recordatorios importantes de tu boda.',
        Icons.insights_outlined,
      ),
      1 => _tarjeta(
        'Por empezar',
        'Aún no tienes actividades planificadas.',
        Icons.playlist_add_outlined,
      ),
      2 => _tarjeta(
        'Sin pendientes',
        'No hay pendientes de Presupuesto ni Invitados para gestionar.',
        Icons.check_circle_outline,
      ),
      _ => _tarjeta(
        'Directorio vacío',
        'Añade proveedores cuando estés listo para comparar tus opciones.',
        Icons.store_outlined,
      ),
    };
    return SingleChildScrollView(
      padding: const EdgeInsets.symmetric(
        horizontal: AppLayout.desktopPagePadding,
        vertical: AppSpacing.xl,
      ),
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: AppLayout.maxMediumWidth),
          child: _seccionActual == 0
              ? Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Hola, ' + _nombreCompleto,
                      style: Theme.of(context).textTheme.headlineSmall
                          ?.copyWith(fontWeight: FontWeight.w700),
                    ),
                    const SizedBox(height: AppSpacing.xl),
                    tarjeta,
                  ],
                )
              : tarjeta,
        ),
      ),
    );
  }

  PopupMenuItem<_OpcionPerfil> _separadorPerfil() => PopupMenuItem(
    enabled: false,
    height: 12,
    padding: const EdgeInsets.symmetric(horizontal: AppSpacing.lg),
    child: Divider(height: 1, color: AppColors.border.withValues(alpha: 0.55)),
  );

  PopupMenuItem<_OpcionPerfil> _itemPerfil(
    _OpcionPerfil opcion,
    IconData icono,
    String texto,
  ) => PopupMenuItem(
    value: opcion,
    child: Row(
      children: [
        Icon(icono, size: 20, color: AppColors.textPrimary),
        const SizedBox(width: AppSpacing.md),
        Text(texto),
      ],
    ),
  );

  List<Widget> _accionesAppBar() => [
    AppIconButton(
      icon: Icons.notifications_none_outlined,
      tooltip: 'Notificaciones',
      onPressed: () {},
    ),
    PopupMenuButton<_OpcionPerfil>(
      tooltip: 'Menú de perfil',
      icon: const Icon(Icons.account_circle_outlined),
      offset: const Offset(-12, 8),
      constraints: const BoxConstraints(minWidth: 260, maxWidth: 300),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
        side: BorderSide(color: AppColors.border.withValues(alpha: 0.45)),
      ),
      onSelected: (opcion) {
        if (opcion == _OpcionPerfil.cerrarSesion) _cerrarSesion();
      },
      itemBuilder: (context) => [
        PopupMenuItem<_OpcionPerfil>(
          enabled: false,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  const Icon(
                    Icons.account_circle_outlined,
                    color: AppColors.primary,
                  ),
                  const SizedBox(width: AppSpacing.sm),
                  Expanded(
                    child: Text(
                      _nombreCompleto,
                      style: Theme.of(context).textTheme.titleSmall?.copyWith(
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 2),
              Text(
                'Wedding Planner',
                style: Theme.of(context).textTheme.bodySmall,
              ),
            ],
          ),
        ),
        _separadorPerfil(),
        _itemPerfil(_OpcionPerfil.miPerfil, Icons.person_outline, 'Mi Perfil'),
        _itemPerfil(_OpcionPerfil.miStaff, Icons.groups_outlined, 'Mi Staff'),
        _itemPerfil(
          _OpcionPerfil.riesgos,
          Icons.warning_amber_outlined,
          'Riesgos',
        ),
        _itemPerfil(_OpcionPerfil.misBodas, Icons.favorite_border, 'Mis bodas'),
        _itemPerfil(
          _OpcionPerfil.configuraciones,
          Icons.settings_outlined,
          'Configuraciones',
        ),
        _separadorPerfil(),
        PopupMenuItem(
          value: _OpcionPerfil.cerrarSesion,
          padding: const EdgeInsets.symmetric(horizontal: AppSpacing.sm),
          child: const _DangerProfileItem(),
        ),
      ],
    ),
  ];

  Widget _navegacionConSombra(Widget child) => Container(
    decoration: BoxDecoration(
      boxShadow: [
        BoxShadow(
          color: AppColors.textPrimary.withValues(alpha: 0.07),
          blurRadius: 12,
          offset: const Offset(4, 0),
        ),
      ],
    ),
    child: child,
  );

  Widget _navegacionDesktop(Color fondo, Color indicador) {
    if (!_sidebarContraido) {
      return _navegacionConSombra(
        AppSidebar(
          backgroundColor: fondo,
          indicatorColor: AppColors.primary,
          selectedForegroundColor: Colors.white,
          items: _items,
          selectedIndex: _seccionActual,
          onDestinationSelected: _seleccionar,
          header: Row(
            children: [
              const Expanded(
                child: Text(
                  'WeddingApp',
                  style: TextStyle(fontWeight: FontWeight.w800),
                ),
              ),
              IconButton(
                tooltip: 'Contraer menú',
                onPressed: () => setState(() => _sidebarContraido = true),
                icon: const Icon(Icons.menu_open),
              ),
            ],
          ),
        ),
      );
    }
    return _navegacionConSombra(
      AppNavigationRail(
        backgroundColor: fondo,
        indicatorColor: indicador,
        selectedForegroundColor: Colors.white,
        selectedLabelColor: AppColors.textPrimary,
        items: _items,
        selectedIndex: _seccionActual,
        onDestinationSelected: _seleccionar,
        leading: IconButton(
          tooltip: 'Desplegar menú',
          onPressed: () => setState(() => _sidebarContraido = false),
          icon: const Icon(Icons.menu),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    const fondoNavegacion = AppColors.background;
    return Scaffold(
      backgroundColor: AppColors.surface,
      appBar: AppTopBar(
        title: _titulos[_seccionActual],
        backgroundColor: AppColors.primary,
        foregroundColor: Colors.white,
        actions: _accionesAppBar(),
      ),
      body: ResponsiveLayout(
        mobile: _contenido(),
        tablet: Row(
          children: [
            _navegacionConSombra(
              AppNavigationRail(
                backgroundColor: fondoNavegacion,
                indicatorColor: AppColors.primary,
                selectedForegroundColor: Colors.white,
                selectedLabelColor: AppColors.textPrimary,
                items: _items,
                selectedIndex: _seccionActual,
                onDestinationSelected: _seleccionar,
              ),
            ),
            Expanded(child: _contenido()),
          ],
        ),
        desktop: Row(
          children: [
            _navegacionDesktop(fondoNavegacion, AppColors.primary),
            Expanded(child: _contenido()),
          ],
        ),
      ),
      bottomNavigationBar:
          MediaQuery.sizeOf(context).width < AppBreakpoints.mobile
          ? AppBottomNavigation(
              backgroundColor: fondoNavegacion,
              indicatorColor: AppColors.primary,
              selectedForegroundColor: Colors.white,
              selectedLabelColor: AppColors.textPrimary,
              items: _items,
              selectedIndex: _seccionActual,
              onDestinationSelected: _seleccionar,
            )
          : null,
    );
  }
}

class _DangerProfileItem extends StatefulWidget {
  const _DangerProfileItem();

  @override
  State<_DangerProfileItem> createState() => _DangerProfileItemState();
}

class _DangerProfileItemState extends State<_DangerProfileItem> {
  bool _hover = false;

  @override
  Widget build(BuildContext context) => MouseRegion(
    onEnter: (_) => setState(() => _hover = true),
    onExit: (_) => setState(() => _hover = false),
    child: AnimatedContainer(
      duration: const Duration(milliseconds: 140),
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.md,
        vertical: AppSpacing.sm,
      ),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(10),
        color: _hover
            ? AppColors.error.withValues(alpha: 0.16)
            : Colors.transparent,
      ),
      child: const Row(
        children: [
          Icon(Icons.logout, size: 20, color: AppColors.error),
          SizedBox(width: AppSpacing.md),
          Text('Cerrar sesión', style: TextStyle(color: AppColors.error)),
        ],
      ),
    ),
  );
}

enum _OpcionPerfil {
  miPerfil,
  miStaff,
  riesgos,
  misBodas,
  configuraciones,
  cerrarSesion,
}
