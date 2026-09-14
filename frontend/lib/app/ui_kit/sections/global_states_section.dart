import 'package:flutter/material.dart';

import '../../theme/app_colors.dart';
import '../../theme/app_radius.dart';
import '../../theme/app_states.dart';
import '../../theme/app_typography.dart';

class GlobalStatesSection extends StatelessWidget {
  const GlobalStatesSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Estados globales',
          style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                fontWeight: FontWeight.w700,
              ),
        ),

        const SizedBox(height: 6),

        Text(
          'Estados visuales e interactivos utilizados de forma consistente '
          'en toda la aplicación.',
          style: Theme.of(context).textTheme.bodyMedium,
        ),

        const SizedBox(height: 28),

        const _SectionTitle('Estados de interacción'),

        const SizedBox(height: 16),

        const _InteractionStates(),

        const SizedBox(height: 36),

        const _SectionTitle('Estados semánticos'),

        const SizedBox(height: 16),

        const _SemanticStates(),

        const SizedBox(height: 36),

        const _SectionTitle('Estado de carga'),

        const SizedBox(height: 16),

        const _LoadingState(),
      ],
    );
  }
}


class _InteractionStates extends StatelessWidget {
  const _InteractionStates();

  @override
  Widget build(BuildContext context) {
    final primary = AppColors.primary;

    return Column(
      children: [
        _InteractionStateRow(
          name: 'Normal',
          description: 'Estado predeterminado del componente.',
          foregroundColor: primary,
          backgroundColor: Colors.transparent,
          borderColor: AppColors.border,
        ),

        const SizedBox(height: 12),

        _InteractionStateRow(
          name: 'Hover',
          description: 'Cursor situado sobre el componente.',
          foregroundColor: primary,
          backgroundColor: AppStates.hoverOverlay(primary),
          borderColor: primary,
        ),

        const SizedBox(height: 12),

        _InteractionStateRow(
          name: 'Focus',
          description: 'Elemento activo mediante teclado o interacción.',
          foregroundColor: primary,
          backgroundColor: AppStates.focusOverlay(primary),
          borderColor: primary,
          borderWidth: 2,
        ),

        const SizedBox(height: 12),

        _InteractionStateRow(
          name: 'Pressed',
          description: 'Estado mientras el usuario mantiene la interacción.',
          foregroundColor: primary,
          backgroundColor: AppStates.pressedOverlay(primary),
          borderColor: primary,
        ),

        const SizedBox(height: 12),

        _InteractionStateRow(
          name: 'Disabled',
          description: 'Elemento visible pero no disponible.',
          foregroundColor: AppStates.disabledContent(
            AppColors.textPrimary,
          ),
          backgroundColor: AppStates.disabledContainer(
            AppColors.textPrimary,
          ),
          borderColor: AppStates.disabledContent(
            AppColors.border,
          ),
        ),
      ],
    );
  }
}



class _InteractionStateRow extends StatelessWidget {
  const _InteractionStateRow({
    required this.name,
    required this.description,
    required this.foregroundColor,
    required this.backgroundColor,
    required this.borderColor,
    this.borderWidth = 1,
  });

  final String name;
  final String description;

  final Color foregroundColor;
  final Color backgroundColor;
  final Color borderColor;

  final double borderWidth;

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Container(
          width: 150,
          height: 48,
          alignment: Alignment.center,
          decoration: BoxDecoration(
            color: backgroundColor,
            borderRadius: BorderRadius.circular(
              AppRadius.md,
            ),
            border: Border.all(
              color: borderColor,
              width: borderWidth,
            ),
          ),
          child: Text(
            name,
            style: AppTypography.label.copyWith(
              color: foregroundColor,
            ),
          ),
        ),

        const SizedBox(width: 20),

        Expanded(
          child: Text(
            description,
            style: AppTypography.body,
          ),
        ),
      ],
    );
  }
}



class _SemanticStates extends StatelessWidget {
  const _SemanticStates();

  @override
  Widget build(BuildContext context) {
    return const Column(
      children: [
        _SemanticStateRow(
          name: 'Error',
          description: 'Existe un problema que requiere corrección.',
          color: AppStates.error,
          icon: Icons.error_outline,
        ),

        SizedBox(height: 12),

        _SemanticStateRow(
          name: 'Success',
          description: 'La operación se completó correctamente.',
          color: AppStates.success,
          icon: Icons.check_circle_outline,
        ),

        SizedBox(height: 12),

        _SemanticStateRow(
          name: 'Warning',
          description:
              'Existe una situación que requiere atención del usuario.',
          color: AppStates.warning,
          icon: Icons.warning_amber_outlined,
        ),
      ],
    );
  }
}



class _SemanticStateRow extends StatelessWidget {
  const _SemanticStateRow({
    required this.name,
    required this.description,
    required this.color,
    required this.icon,
  });

  final String name;
  final String description;

  final Color color;
  final IconData icon;

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Container(
          width: 150,
          height: 48,
          padding: const EdgeInsets.symmetric(
            horizontal: 14,
          ),
          decoration: BoxDecoration(
            color: color.withValues(alpha: 0.08),
            borderRadius: BorderRadius.circular(
              AppRadius.md,
            ),
            border: Border.all(
              color: color,
            ),
          ),
          child: Row(
            children: [
              Icon(
                icon,
                size: 20,
                color: color,
              ),

              const SizedBox(width: 8),

              Text(
                name,
                style: AppTypography.label.copyWith(
                  color: color,
                ),
              ),
            ],
          ),
        ),

        const SizedBox(width: 20),

        Expanded(
          child: Text(
            description,
            style: AppTypography.body,
          ),
        ),
      ],
    );
  }
}


class _LoadingState extends StatelessWidget {
  const _LoadingState();

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Container(
          width: 150,
          height: 48,
          alignment: Alignment.center,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(
              AppRadius.md,
            ),
            border: Border.all(
              color: AppColors.border,
            ),
          ),
          child: const SizedBox(
            width: 20,
            height: 20,
            child: CircularProgressIndicator(
              strokeWidth: 2,
            ),
          ),
        ),

        const SizedBox(width: 20),

        const Expanded(
          child: Text(
            'Indica que una operación está en progreso. '
            'Debe impedir acciones duplicadas cuando corresponda.',
            style: AppTypography.body,
          ),
        ),
      ],
    );
  }
}


class _SectionTitle extends StatelessWidget {
  const _SectionTitle(this.text);

  final String text;

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: Theme.of(context).textTheme.titleLarge?.copyWith(
            fontWeight: FontWeight.w700,
          ),
    );
  }
}