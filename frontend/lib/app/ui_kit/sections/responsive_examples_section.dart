import 'package:flutter/material.dart';

import '../../responsive/app_layout.dart';

import '../../../core/widgets/buttons/app_button.dart';
import '../../../core/widgets/containers/app_card.dart';
import '../../../core/widgets/data/app_data_table.dart';
import '../../../core/widgets/forms/app_form_actions.dart';
import '../../../core/widgets/forms/app_form_layout.dart';
import '../../../core/widgets/inputs/app_date_field.dart';
import '../../../core/widgets/inputs/app_text_field.dart';
import '../../../core/widgets/navigation/app_bottom_navigation.dart';
import '../../../core/widgets/navigation/app_navigation_item.dart';
import '../../../core/widgets/navigation/app_sidebar.dart';
import '../../../core/widgets/overlays/app_bottom_sheet.dart';
import '../../../core/widgets/overlays/app_dialog.dart';

class ResponsiveExamplesPageOneSection extends StatelessWidget {
  const ResponsiveExamplesPageOneSection({super.key});

  @override
  Widget build(BuildContext context) {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _ResponsiveExamplesHeading(),

        SizedBox(height: 28),

        _ResponsiveExample(
          title: 'Formulario mobile',
          description:
              'Una sola columna, ancho completo y acciones adaptadas al espacio disponible.',
          child: _MobileFormPreview(),
        ),
      ],
    );
  }
}

class _MobileFormPreview extends StatelessWidget {
  const _MobileFormPreview();

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 360,
      padding: const EdgeInsets.all(AppLayout.mobilePagePadding),
      decoration: BoxDecoration(
        border: Border.all(color: Theme.of(context).colorScheme.outlineVariant),
        borderRadius: BorderRadius.circular(12),
      ),
      child: AppFormLayout(
        children: [
          const AppTextField(
            label: 'Nombre del proyecto',
            required: true,
            hintText: 'Ej. Matrimonio José y Carlos',
          ),

          const AppDateField(label: 'Fecha del matrimonio'),

          const AppTextField(label: 'Ubicación', hintText: 'Ej. Lima, Perú'),

          Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              AppButton(label: 'Guardar', expanded: true, onPressed: () {}),

              const SizedBox(height: 10),

              AppButton(
                label: 'Cancelar',
                variant: AppButtonVariant.secondary,
                expanded: true,
                onPressed: () {},
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _DesktopFormPreview extends StatelessWidget {
  const _DesktopFormPreview();

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 680,
      padding: const EdgeInsets.all(AppLayout.desktopPagePadding),
      decoration: BoxDecoration(
        border: Border.all(color: Theme.of(context).colorScheme.outlineVariant),
        borderRadius: BorderRadius.circular(12),
      ),
      child: AppFormLayout(
        children: [
          const AppTextField(
            label: 'Nombre del proyecto',
            required: true,
            hintText: 'Ej. Matrimonio José y Carlos',
          ),

          const AppDateField(label: 'Fecha del matrimonio'),

          const AppTextField(label: 'Ubicación', hintText: 'Ej. Lima, Perú'),

          AppFormActions(
            secondaryAction: AppButton(
              label: 'Cancelar',
              variant: AppButtonVariant.secondary,
              onPressed: () {},
            ),
            primaryAction: AppButton(label: 'Guardar', onPressed: () {}),
          ),
        ],
      ),
    );
  }
}

class ResponsiveExamplesPageTwoSection extends StatelessWidget {
  const ResponsiveExamplesPageTwoSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const _ResponsiveExamplesHeading(),

        SizedBox(height: 28),

        _ResponsiveExample(
          title: 'Formulario desktop',
          description:
              'Mantiene una sola columna, pero limita el ancho para mejorar legibilidad y recorrido visual.',
          child: _DesktopFormPreview(),
        ),
      ],
    );
  }
}

class _DataResponsiveExample extends StatelessWidget {
  const _DataResponsiveExample();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _PreviewLabel(label: 'DESKTOP', width: '≥ 1024 px'),

        const SizedBox(height: 8),

        const _DesktopTableExample(),

        const SizedBox(height: 24),

        _PreviewLabel(label: 'MOBILE', width: '< 600 px'),

        const SizedBox(height: 8),

        const SizedBox(width: 360, child: _MobileCardsExample()),
      ],
    );
  }
}

class _DesktopTableExample extends StatelessWidget {
  const _DesktopTableExample();

  @override
  Widget build(BuildContext context) {
    return const AppDataTable(
      columns: [
        AppDataTableColumn(label: 'Proveedor'),
        AppDataTableColumn(label: 'Categoría'),
        AppDataTableColumn(label: 'Estado'),
        AppDataTableColumn(label: 'Monto', numeric: true),
      ],
      rows: [
        DataRow(
          cells: [
            DataCell(Text('Eventos Lima')),
            DataCell(Text('Local')),
            DataCell(Text('Confirmado')),
            DataCell(Text('S/ 8,500')),
          ],
        ),
        DataRow(
          cells: [
            DataCell(Text('Fotografía Aurora')),
            DataCell(Text('Fotografía')),
            DataCell(Text('Pendiente')),
            DataCell(Text('S/ 2,800')),
          ],
        ),
      ],
    );
  }
}

class _MobileCardsExample extends StatelessWidget {
  const _MobileCardsExample();

  @override
  Widget build(BuildContext context) {
    return Column(
      children: const [
        AppCard(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Eventos Lima',
                style: TextStyle(fontWeight: FontWeight.w600),
              ),
              SizedBox(height: 8),
              Text('Categoría: Local'),
              Text('Estado: Confirmado'),
              Text('Monto: S/ 8,500'),
            ],
          ),
        ),

        SizedBox(height: 12),

        AppCard(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Fotografía Aurora',
                style: TextStyle(fontWeight: FontWeight.w600),
              ),
              SizedBox(height: 8),
              Text('Categoría: Fotografía'),
              Text('Estado: Pendiente'),
              Text('Monto: S/ 2,800'),
            ],
          ),
        ),
      ],
    );
  }
}

const _responsiveNavigationItems = [
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

class _NavigationResponsiveExample extends StatefulWidget {
  const _NavigationResponsiveExample();

  @override
  State<_NavigationResponsiveExample> createState() =>
      _NavigationResponsiveExampleState();
}

class _NavigationResponsiveExampleState
    extends State<_NavigationResponsiveExample> {
  int _selectedIndex = 0;

  void _select(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _PreviewLabel(label: 'DESKTOP', width: '≥ 1024 px'),

        const SizedBox(height: 8),

        SizedBox(
          width: 260,
          height: 300,
          child: AppSidebar(
            items: _responsiveNavigationItems,
            selectedIndex: _selectedIndex,
            onDestinationSelected: _select,
          ),
        ),

        const SizedBox(height: 24),

        _PreviewLabel(label: 'MOBILE', width: '< 600 px'),

        const SizedBox(height: 8),

        SizedBox(
          width: 360,
          child: AppBottomNavigation(
            items: _responsiveNavigationItems,
            selectedIndex: _selectedIndex,
            onDestinationSelected: _select,
          ),
        ),
      ],
    );
  }
}

class ResponsiveExamplesPageThreeSection extends StatelessWidget {
  const ResponsiveExamplesPageThreeSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const _ResponsiveExamplesHeading(),

        const SizedBox(height: 28),

        const _ResponsiveExample(
          title: 'Tabla desktop → cards mobile',
          description:
              'Los mismos datos cambian de representación cuando una tabla deja de ser cómoda en pantallas pequeñas.',
          child: _DataResponsiveExample(),
        ),
      ],
    );
  }
}

class ResponsiveExamplesPageFourSection extends StatelessWidget {
  const ResponsiveExamplesPageFourSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const _ResponsiveExamplesHeading(),

        const SizedBox(height: 28),

        _ResponsiveExample(
          title: 'Sidebar desktop → bottom navigation mobile',
          description:
              'Los destinos principales se mantienen; solo cambia la presentación según el breakpoint.',
          child: _NavigationResponsiveExample(),
        ),

        const SizedBox(height: 36),

        _ResponsiveExample(
          title: 'Dialog desktop → bottom sheet mobile',
          description:
              'Una misma acción puede utilizar diferentes overlays según el espacio y contexto de interacción.',
          child: _ResponsiveOverlayExample(),
        ),
      ],
    );
  }
}

class _ResponsiveOverlayExample extends StatelessWidget {
  const _ResponsiveOverlayExample();

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _PreviewLabel(label: 'DESKTOP', width: '≥ 1024 px'),

              const SizedBox(height: 8),

              AppButton(
                label: 'Abrir dialog',
                icon: Icons.open_in_new,
                onPressed: () {
                  AppDialog.show(
                    context,
                    title: 'Filtros',
                    description: 'Selecciona los criterios de búsqueda.',
                    content: const _FilterContent(),
                    actions: [
                      TextButton(
                        onPressed: () {
                          Navigator.of(context).pop();
                        },
                        child: const Text('Cancelar'),
                      ),
                      FilledButton(
                        onPressed: () {
                          Navigator.of(context).pop();
                        },
                        child: const Text('Aplicar'),
                      ),
                    ],
                  );
                },
              ),
            ],
          ),
        ),

        const SizedBox(width: 24),

        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _PreviewLabel(label: 'MOBILE', width: '< 600 px'),

              const SizedBox(height: 8),

              AppButton(
                label: 'Abrir bottom sheet',
                icon: Icons.vertical_align_top,
                onPressed: () {
                  AppBottomSheet.show(
                    context,
                    title: 'Filtros',
                    description: 'Selecciona los criterios de búsqueda.',
                    child: const _FilterContent(),
                  );
                },
              ),
            ],
          ),
        ),
      ],
    );
  }
}

class _FilterContent extends StatelessWidget {
  const _FilterContent();

  @override
  Widget build(BuildContext context) {
    return const Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        AppTextField(label: 'Proveedor', hintText: 'Buscar proveedor'),

        SizedBox(height: 16),

        AppTextField(label: 'Categoría', hintText: 'Ej. Fotografía'),
      ],
    );
  }
}

class _ResponsiveExamplesHeading extends StatelessWidget {
  const _ResponsiveExamplesHeading();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Ejemplos responsive reales',
          style: Theme.of(
            context,
          ).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.w700),
        ),

        const SizedBox(height: 6),

        Text(
          'Ejemplos de adaptación real de componentes y patrones según el espacio disponible.',
          style: Theme.of(context).textTheme.bodyMedium,
        ),
      ],
    );
  }
}

class _ResponsiveExample extends StatelessWidget {
  const _ResponsiveExample({
    required this.title,
    required this.description,
    required this.child,
  });

  final String title;
  final String description;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: const BoxConstraints(maxWidth: 680),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: Theme.of(
              context,
            ).textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w600),
          ),

          const SizedBox(height: 4),

          Text(description, style: Theme.of(context).textTheme.bodySmall),

          const SizedBox(height: 14),

          child,
        ],
      ),
    );
  }
}

class _PreviewLabel extends StatelessWidget {
  const _PreviewLabel({required this.label, required this.width});

  final String label;
  final String width;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(
          label,
          style: Theme.of(
            context,
          ).textTheme.labelMedium?.copyWith(fontWeight: FontWeight.w700),
        ),
        const SizedBox(width: 8),
        Text(width, style: Theme.of(context).textTheme.bodySmall),
      ],
    );
  }
}
