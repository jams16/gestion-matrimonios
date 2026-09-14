import 'package:flutter/material.dart';

import '../../../core/widgets/overlays/app_bottom_sheet.dart';
import '../../../core/widgets/overlays/app_confirmation_dialog.dart';
import '../../../core/widgets/overlays/app_context_menu.dart';
import '../../../core/widgets/overlays/app_dialog.dart';
import '../../../core/widgets/overlays/app_popover.dart';

class OverlaysPageOneSection extends StatelessWidget {
  const OverlaysPageOneSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const _OverlaysHeading(),

        const SizedBox(height: 28),

        _OverlayExample(
          title: 'Dialog',
          description:
              'Muestra contenido o acciones que requieren atención temporal.',
          child: FilledButton(
            onPressed: () {
              AppDialog.show(
                context,
                title: 'Editar proyecto',
                description:
                    'Modifica la información general del proyecto.',
                content: const Text(
                  'Aquí se colocará el formulario correspondiente.',
                ),
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
                    child: const Text('Guardar'),
                  ),
                ],
              );
            },
            child: const Text(
              'Abrir dialog',
            ),
          ),
        ),

        const SizedBox(height: 32),

        _OverlayExample(
          title: 'Confirmation dialog',
          description:
              'Solicita confirmación antes de ejecutar una acción importante o irreversible.',
          child: FilledButton(
            onPressed: () async {
              await AppConfirmationDialog.show(
                context,
                title: 'Eliminar actividad',
                message:
                    'La actividad será eliminada permanentemente.',
                confirmLabel: 'Eliminar',
                type: AppConfirmationType.destructive,
              );
            },
            child: const Text(
              'Mostrar confirmación',
            ),
          ),
        ),

        const SizedBox(height: 32),

        _OverlayExample(
          title: 'Bottom sheet',
          description:
              'Presenta acciones o contenido adicional principalmente en dispositivos móviles.',
          child: FilledButton(
            onPressed: () {
              AppBottomSheet.show(
                context,
                title: 'Filtros',
                description:
                    'Selecciona los criterios para filtrar la información.',
                child: const Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Estado'),
                    SizedBox(height: 12),
                    CheckboxListTile(
                      contentPadding: EdgeInsets.zero,
                      value: true,
                      onChanged: null,
                      title: Text('Pendientes'),
                    ),
                    CheckboxListTile(
                      contentPadding: EdgeInsets.zero,
                      value: false,
                      onChanged: null,
                      title: Text('Completadas'),
                    ),
                  ],
                ),
              );
            },
            child: const Text(
              'Abrir bottom sheet',
            ),
          ),
        ),
      ],
    );
  }
}



class OverlaysPageTwoSection extends StatelessWidget {
  const OverlaysPageTwoSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const _OverlaysHeading(),

        const SizedBox(height: 28),

        _OverlayExample(
          title: 'Menu contextual',
          description:
              'Agrupa acciones relacionadas con un elemento sin ocupar espacio permanente.',
          child: AppContextMenu<String>(
            items: const [
              AppContextMenuItem(
                value: 'ver',
                label: 'Ver',
                icon: Icons.visibility_outlined,
              ),
              AppContextMenuItem(
                value: 'editar',
                label: 'Editar',
                icon: Icons.edit_outlined,
              ),
              AppContextMenuItem(
                value: 'duplicar',
                label: 'Duplicar',
                icon: Icons.copy_outlined,
              ),
              AppContextMenuItem(
                value: 'eliminar',
                label: 'Eliminar',
                icon: Icons.delete_outline,
                destructive: true,
              ),
            ],
            onSelected: (value) {},
          ),
        ),

        const SizedBox(height: 40),

        _OverlayExample(
          title: 'Popover',
          description:
              'Muestra información contextual breve junto al elemento que la origina.',
          child: AppPopover(
            trigger: const Chip(
              avatar: Icon(
                Icons.info_outline,
                size: 18,
              ),
              label: Text(
                'Información',
              ),
            ),
            content: const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  'Presupuesto vigente',
                  style: TextStyle(
                    fontWeight: FontWeight.w600,
                  ),
                ),
                SizedBox(height: 6),
                Text(
                  'Incluye el monto base y los ajustes realizados durante el proyecto.',
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}




class _OverlaysHeading extends StatelessWidget {
  const _OverlaysHeading();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Overlays',
          style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                fontWeight: FontWeight.w700,
              ),
        ),
        const SizedBox(height: 6),
        Text(
          'Elementos temporales que aparecen sobre el contenido principal.',
          style: Theme.of(context).textTheme.bodyMedium,
        ),
      ],
    );
  }
}

class _OverlayExample extends StatelessWidget {
  const _OverlayExample({
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
      constraints: const BoxConstraints(
        maxWidth: 480,
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