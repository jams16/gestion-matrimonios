import 'package:flutter/material.dart';

import '../../../core/widgets/navigation/app_bottom_navigation.dart';
import '../../../core/widgets/navigation/app_breadcrumbs.dart';
import '../../../core/widgets/navigation/app_navigation_item.dart';
import '../../../core/widgets/navigation/app_navigation_rail.dart';
import '../../../core/widgets/navigation/app_pagination.dart';
import '../../../core/widgets/navigation/app_sidebar.dart';
import '../../../core/widgets/navigation/app_tabs.dart';
import '../../../core/widgets/navigation/app_top_bar.dart';

const _navigationItems = [
  AppNavigationItem(
    label: 'Inicio',
    icon: Icons.home_outlined,
    selectedIcon: Icons.home,
  ),
  AppNavigationItem(
    label: 'Proyecto',
    icon: Icons.folder_outlined,
    selectedIcon: Icons.folder,
  ),
  AppNavigationItem(
    label: 'Cronograma',
    icon: Icons.calendar_month_outlined,
    selectedIcon: Icons.calendar_month,
  ),
  AppNavigationItem(
    label: 'Presupuesto',
    icon: Icons.account_balance_wallet_outlined,
    selectedIcon: Icons.account_balance_wallet,
  ),
];



class NavigationPageOneSection extends StatefulWidget {
  const NavigationPageOneSection({super.key});

  @override
  State<NavigationPageOneSection> createState() =>
      _NavigationPageOneSectionState();
}

class _NavigationPageOneSectionState
    extends State<NavigationPageOneSection> {
  int _selectedSidebar = 0;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const _NavigationHeading(),

        const SizedBox(height: 28),

        const _NavigationExample(
          title: 'AppBar',
          description:
              'Encabezado principal con contexto y acciones de la pantalla.',
          maxWidth: double.infinity,
          child: SizedBox(
            height: 76,
            child: AppTopBar(
              title: 'Cronograma',
              subtitle: 'Matrimonio José y Carlos',
              actions: [
                IconButton(
                  tooltip: 'Notificaciones',
                  onPressed: null,
                  icon: Icon(
                    Icons.notifications_outlined,
                  ),
                ),
                IconButton(
                  tooltip: 'Perfil',
                  onPressed: null,
                  icon: Icon(
                    Icons.account_circle_outlined,
                  ),
                ),
              ],
            ),
          ),
        ),

        const SizedBox(height: 36),

        _NavigationExample(
          title: 'Sidebar',
          description:
              'Navegación principal recomendada para escritorio.',
          maxWidth: double.infinity,
          child: SizedBox(
            height: 470,
            child: Align(
              alignment: Alignment.centerLeft,
              child: AppSidebar(
                width: 250,
                selectedIndex: _selectedSidebar,
                items: _navigationItems,
                header: const Text(
                  'Gestión de Matrimonios',
                  style: TextStyle(
                    fontWeight: FontWeight.w700,
                  ),
                ),
                onDestinationSelected: (index) {
                  setState(() {
                    _selectedSidebar = index;
                  });
                },
              ),
            ),
          ),
        ),
      ],
    );
  }
}



class NavigationPageTwoSection extends StatefulWidget {
  const NavigationPageTwoSection({super.key});

  @override
  State<NavigationPageTwoSection> createState() =>
      _NavigationPageTwoSectionState();
}

class _NavigationPageTwoSectionState
    extends State<NavigationPageTwoSection> {
  int _railIndex = 0;
  int _bottomIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const _NavigationHeading(),

        const SizedBox(height: 28),

        _NavigationExample(
          title: 'NavigationRail',
          description:
              'Navegación lateral compacta recomendada para tablet.',
          child: SizedBox(
            height: 300,
            child: AppNavigationRail(
              selectedIndex: _railIndex,
              items: _navigationItems,
              onDestinationSelected: (index) {
                setState(() {
                  _railIndex = index;
                });
              },
            ),
          ),
        ),

        const SizedBox(height: 32),

        _NavigationExample(
          title: 'Bottom navigation',
          description:
              'Navegación principal en dispositivos móviles.',
          maxWidth: 480,
          child: AppBottomNavigation(
            selectedIndex: _bottomIndex,
            items: _navigationItems,
            onDestinationSelected: (index) {
              setState(() {
                _bottomIndex = index;
              });
            },
          ),
        ),

        const SizedBox(height: 36),

        const _NavigationExample(
          title: 'Tabs',
          description:
              'Navegación entre vistas relacionadas dentro del mismo contexto.',
          maxWidth: 480,
          child: DefaultTabController(
            length: 3,
            child: AppTabs(
              tabs: [
                AppTabItem(
                  label: 'Información',
                ),
                AppTabItem(
                  label: 'Miembros',
                ),
                AppTabItem(
                  label: 'Archivos',
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}




class NavigationPageThreeSection extends StatefulWidget {
  const NavigationPageThreeSection({super.key});

  @override
  State<NavigationPageThreeSection> createState() =>
      _NavigationPageThreeSectionState();
}

class _NavigationPageThreeSectionState
    extends State<NavigationPageThreeSection> {
  int _currentPage = 3;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const _NavigationHeading(),

        const SizedBox(height: 28),

        _NavigationExample(
          title: 'Breadcrumbs',
          description:
              'Muestran la ubicación actual dentro de una jerarquía.',
          maxWidth: double.infinity,
          child: AppBreadcrumbs(
            items: [
              AppBreadcrumbItem(
                label: 'Proyectos',
                onTap: () {},
              ),
              AppBreadcrumbItem(
                label: 'Matrimonio José y Carlos',
                onTap: () {},
              ),
              const AppBreadcrumbItem(
                label: 'Cronograma',
              ),
            ],
          ),
        ),

        const SizedBox(height: 36),

        _NavigationExample(
          title: 'Pagination',
          description:
              'Permite recorrer conjuntos de información divididos en páginas.',
          maxWidth: double.infinity,
          child: AppPagination(
            currentPage: _currentPage,
            totalPages: 10,
            onPageChanged: (page) {
              setState(() {
                _currentPage = page;
              });
            },
          ),
        ),
      ],
    );
  }
}



class _NavigationHeading extends StatelessWidget {
  const _NavigationHeading();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Navegación',
          style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                fontWeight: FontWeight.w700,
              ),
        ),
        const SizedBox(height: 6),
        Text(
          'Componentes para desplazarse entre módulos, vistas y conjuntos de información.',
          style: Theme.of(context).textTheme.bodyMedium,
        ),
      ],
    );
  }
}

class _NavigationExample extends StatelessWidget {
  const _NavigationExample({
    required this.title,
    required this.description,
    required this.child,
    this.maxWidth = 480,
  });

  final String title;
  final String description;
  final Widget child;

  final double maxWidth;

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: BoxConstraints(
        maxWidth: maxWidth,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: Theme.of(context).textTheme.titleSmall?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
          ),
          const SizedBox(height: 4),
          Text(
            description,
            style: Theme.of(context).textTheme.bodySmall,
          ),
          const SizedBox(height: 12),
          child,
        ],
      ),
    );
  }
}