import 'package:flutter/material.dart';

import '../../../core/widgets/data/app_data_table.dart';
import '../../../core/widgets/data/app_empty_state.dart';
import '../../../core/widgets/data/app_filters.dart';
import '../../../core/widgets/data/app_list.dart';
import '../../../core/widgets/data/app_list_item.dart';
import '../../../core/widgets/data/app_skeleton.dart';
import '../../../core/widgets/data/app_sort.dart';
import '../../../core/widgets/data/app_table.dart';
import '../../../core/widgets/navigation/app_pagination.dart';

class DataPageOneSection extends StatelessWidget {
  const DataPageOneSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const _DataHeading(),

        const SizedBox(height: 28),

        const _DataExample(
          title: 'Table',
          description:
              'Tabla simple para mostrar conjuntos pequeños de información.',
          maxWidth: double.infinity,
          child: AppTable(
            columns: [
              AppTableColumn(label: 'Actividad'),
              AppTableColumn(label: 'Responsable'),
              AppTableColumn(label: 'Estado'),
            ],
            rows: [
              ['Reservar local', 'Wedding Planner', 'Completada'],
              ['Confirmar catering', 'Pareja', 'Pendiente'],
              ['Contratar fotografía', 'Wedding Planner', 'En proceso'],
            ],
          ),
        ),

        const SizedBox(height: 36),

        _DataExample(
          title: 'Data table',
          description:
              'Tabla estructurada para datos con ordenamiento y acciones.',
          maxWidth: double.infinity,
          child: AppDataTable(
            columns: const [
              AppDataTableColumn(label: 'Proveedor'),
              AppDataTableColumn(label: 'Categoría'),
              AppDataTableColumn(label: 'Monto', numeric: true),
            ],
            rows: const [
              DataRow(
                cells: [
                  DataCell(Text('Eventos Lima')),
                  DataCell(Text('Local')),
                  DataCell(Text('S/ 8,500')),
                ],
              ),
              DataRow(
                cells: [
                  DataCell(Text('Catering del Valle')),
                  DataCell(Text('Catering')),
                  DataCell(Text('S/ 6,200')),
                ],
              ),
              DataRow(
                cells: [
                  DataCell(Text('Fotografía Aurora')),
                  DataCell(Text('Fotografía')),
                  DataCell(Text('S/ 2,800')),
                ],
              ),
            ],
          ),
        ),
      ],
    );
  }
}

class DataPageTwoSection extends StatelessWidget {
  const DataPageTwoSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const _DataHeading(),

        const SizedBox(height: 28),

        _DataExample(
          title: 'List / List item',
          description:
              'Listado vertical para elementos con información resumida.',
          child: AppList(
            children: [
              AppListItem(
                title: 'Reservar local',
                subtitle: 'Fecha límite: 20/09/2026',
                leading: const CircleAvatar(child: Icon(Icons.event_outlined)),
                trailing: const Icon(Icons.chevron_right),
                onTap: () {},
              ),
              AppListItem(
                title: 'Confirmar catering',
                subtitle: 'Responsable: Pareja',
                leading: const CircleAvatar(
                  child: Icon(Icons.restaurant_outlined),
                ),
                trailing: const Icon(Icons.chevron_right),
                onTap: () {},
              ),
            ],
          ),
        ),

        const SizedBox(height: 34),

        _DataExample(
          title: 'Empty state',
          description: 'Se muestra cuando no existen datos para presentar.',
          child: AppEmptyState(
            title: 'No hay proveedores',
            message:
                'Agrega un proveedor para comenzar a gestionar contrataciones.',
            action: FilledButton(
              onPressed: null,
              child: Text('Agregar proveedor'),
            ),
          ),
        ),

        const SizedBox(height: 34),

        const _DataExample(
          title: 'Skeleton',
          description:
              'Representa temporalmente contenido mientras se cargan datos.',
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              AppSkeleton(width: 320, height: 20),
              SizedBox(height: 10),
              AppSkeleton(width: 440, height: 14),
              SizedBox(height: 10),
              AppSkeleton(width: 380, height: 14),
            ],
          ),
        ),
      ],
    );
  }
}

class DataPageThreeSection extends StatefulWidget {
  const DataPageThreeSection({super.key});

  @override
  State<DataPageThreeSection> createState() => _DataPageThreeSectionState();
}

class _DataPageThreeSectionState extends State<DataPageThreeSection> {
  int _currentPage = 3;

  String _sortValue = 'nombre';

  AppSortDirection _direction = AppSortDirection.ascending;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const _DataHeading(),

        const SizedBox(height: 28),

        _DataExample(
          title: 'Pagination',
          description:
              'Divide conjuntos grandes de datos en páginas navegables.',
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

        const SizedBox(height: 36),

        _DataExample(
          title: 'Filters',
          description:
              'Permiten reducir los resultados según criterios seleccionados.',
          maxWidth: double.infinity,
          child: AppFilters(
            onClear: () {},
            children: const [
              FilterChip(
                label: Text('Pendientes'),
                selected: true,
                onSelected: null,
              ),
              FilterChip(
                label: Text('En proceso'),
                selected: false,
                onSelected: null,
              ),
              FilterChip(
                label: Text('Completadas'),
                selected: false,
                onSelected: null,
              ),
            ],
          ),
        ),

        const SizedBox(height: 36),

        _DataExample(
          title: 'Sort',
          description:
              'Permite elegir el criterio y la dirección de ordenamiento.',
          child: AppSort<String>(
            value: _sortValue,
            direction: _direction,
            options: const [
              AppSortOption(value: 'nombre', label: 'Nombre'),
              AppSortOption(value: 'fecha', label: 'Fecha'),
              AppSortOption(value: 'estado', label: 'Estado'),
            ],
            onValueChanged: (value) {
              if (value == null) {
                return;
              }

              setState(() {
                _sortValue = value;
              });
            },
            onDirectionChanged: (direction) {
              setState(() {
                _direction = direction;
              });
            },
          ),
        ),
      ],
    );
  }
}

class _DataHeading extends StatelessWidget {
  const _DataHeading();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Datos',
          style: Theme.of(
            context,
          ).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.w700),
        ),

        const SizedBox(height: 6),

        Text(
          'Componentes utilizados para presentar, explorar y organizar conjuntos de información.',
          style: Theme.of(context).textTheme.bodyMedium,
        ),
      ],
    );
  }
}

class _DataExample extends StatelessWidget {
  const _DataExample({
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
      constraints: BoxConstraints(maxWidth: maxWidth),
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

          const SizedBox(height: 12),

          child,
        ],
      ),
    );
  }
}
