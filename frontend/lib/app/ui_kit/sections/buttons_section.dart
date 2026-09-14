import 'package:flutter/material.dart';

import '../../../core/widgets/buttons/app_button.dart';
import '../../../core/widgets/buttons/app_icon_button.dart';


class ButtonsPageOneSection extends StatelessWidget {
  const ButtonsPageOneSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const _ButtonsHeading(),

        const SizedBox(height: 28),

        _ButtonExample(
          title: 'Primario',
          description: 'Acción principal de una vista o formulario.',
          child: AppButton(
            label: 'Guardar',
            icon: Icons.save_outlined,
            onPressed: () {},
          ),
        ),

        const SizedBox(height: 28),

        _ButtonExample(
          title: 'Secundario',
          description: 'Acción alternativa a la acción principal.',
          child: AppButton(
            label: 'Cancelar',
            variant: AppButtonVariant.secondary,
            onPressed: () {},
          ),
        ),

        const SizedBox(height: 28),

        _ButtonExample(
          title: 'Terciario / texto',
          description:
              'Acción de menor énfasis visual o navegación contextual.',
          child: AppButton(
            label: 'Ver detalles',
            variant: AppButtonVariant.tertiary,
            onPressed: () {},
          ),
        ),

        const SizedBox(height: 28),

        _ButtonExample(
          title: 'Destructivo',
          description:
              'Acciones irreversibles o que requieren especial atención.',
          child: AppButton(
            label: 'Eliminar',
            icon: Icons.delete_outline,
            variant: AppButtonVariant.destructive,
            onPressed: () {},
          ),
        ),

        const SizedBox(height: 28),

        const _ButtonExample(
          title: 'Loading',
          description:
              'Bloquea temporalmente una acción mientras se procesa.',
          child: AppButton(
            label: 'Guardando',
            loading: true,
            onPressed: null,
          ),
        ),

        const SizedBox(height: 28),

        const _ButtonExample(
          title: 'Disabled',
          description:
              'La acción permanece visible pero no se encuentra disponible.',
          child: AppButton(
            label: 'Continuar',
            onPressed: null,
          ),
        ),
      ],
    );
  }
}

class ButtonsPageTwoSection extends StatelessWidget {
  const ButtonsPageTwoSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const _ButtonsHeading(),

        const SizedBox(height: 28),

        _ButtonExample(
          title: 'Botón con icono',
          description:
              'El icono complementa el significado de la acción.',
          child: AppButton(
            label: 'Nuevo proyecto',
            icon: Icons.add,
            onPressed: () {},
          ),
        ),

        const SizedBox(height: 32),

        _ButtonExample(
          title: 'Icon button',
          description:
              'Acciones compactas cuyo significado puede representarse con un icono.',
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              AppIconButton(
                icon: Icons.edit_outlined,
                tooltip: 'Editar',
                onPressed: () {},
              ),

              const SizedBox(width: 12),

              AppIconButton(
                icon: Icons.add,
                tooltip: 'Agregar',
                variant: AppIconButtonVariant.filled,
                onPressed: () {},
              ),

              const SizedBox(width: 12),

              AppIconButton(
                icon: Icons.filter_list,
                tooltip: 'Filtrar',
                variant: AppIconButtonVariant.outlined,
                onPressed: () {},
              ),

              const SizedBox(width: 12),

              AppIconButton(
                icon: Icons.delete_outline,
                tooltip: 'Eliminar',
                variant: AppIconButtonVariant.destructive,
                onPressed: () {},
              ),
            ],
          ),
        ),

        const SizedBox(height: 36),

        _ButtonExample(
          title: 'Tamaños',
          description:
              'Tres tamaños para adaptar la jerarquía y densidad de la interfaz.',
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              AppButton(
                label: 'Small',
                size: AppButtonSize.small,
                onPressed: () {},
              ),

              const SizedBox(height: 14),

              AppButton(
                label: 'Medium',
                size: AppButtonSize.medium,
                onPressed: () {},
              ),

              const SizedBox(height: 14),

              AppButton(
                label: 'Large',
                size: AppButtonSize.large,
                onPressed: () {},
              ),
            ],
          ),
        ),

        const SizedBox(height: 36),

        _ButtonExample(
          title: 'Ancho completo',
          description:
              'Útil especialmente en formularios y layouts móviles.',
          child: AppButton(
            label: 'Crear proyecto',
            expanded: true,
            onPressed: () {},
          ),
        ),
      ],
    );
  }
}


class _ButtonsHeading extends StatelessWidget {
  const _ButtonsHeading();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Botones',
          style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                fontWeight: FontWeight.w700,
              ),
        ),
        const SizedBox(height: 6),
        Text(
          'Acciones utilizadas para iniciar operaciones y navegar por la aplicación.',
          style: Theme.of(context).textTheme.bodyMedium,
        ),
      ],
    );
  }
}

class _ButtonExample extends StatelessWidget {
  const _ButtonExample({
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

