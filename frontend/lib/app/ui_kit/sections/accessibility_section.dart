import 'package:flutter/material.dart';

import '../../accessibility/app_accessibility.dart';
import '../../accessibility/app_focus_ring.dart';
import '../../theme/app_colors.dart';
import '../../../core/widgets/buttons/app_button.dart';
import '../../../core/widgets/indicators/app_status_badge.dart';
import '../../../core/widgets/inputs/app_text_field.dart';

class AccessibilityPageOneSection extends StatelessWidget {
  const AccessibilityPageOneSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const _AccessibilityHeading(),

        const SizedBox(height: 28),

        const _AccessibilityExample(
          title: 'Contraste',
          description:
              'El texto y los elementos interactivos deben distinguirse claramente de su fondo.',
          child: _ContrastExample(),
        ),

        const SizedBox(height: 34),

        _AccessibilityExample(
          title: 'Focus visible',
          description:
              'Los elementos enfocados mediante teclado deben mostrar una indicación visual clara.',
          child: AppFocusRing(
            autofocus: true,
            onActivate: () {},
            child: const Padding(
              padding: EdgeInsets.all(4),
              child: AppButton(label: 'Elemento enfocado', onPressed: null),
            ),
          ),
        ),

        const SizedBox(height: 34),

        const _AccessibilityExample(
          title: 'Navegación por teclado',
          description:
              'Las acciones deben poder recorrerse mediante Tab y activarse mediante teclado.',
          child: _KeyboardExample(),
        ),

        const SizedBox(height: 34),

        const _AccessibilityExample(
          title: 'Tamaño mínimo táctil',
          description:
              'Los objetivos interactivos deben tener un área suficientemente grande para mouse y pantalla táctil.',
          child: _TouchTargetExample(),
        ),
      ],
    );
  }
}

class AccessibilityPageTwoSection extends StatelessWidget {
  const AccessibilityPageTwoSection({super.key});

  @override
  Widget build(BuildContext context) {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _AccessibilityHeading(),

        SizedBox(height: 28),

        _AccessibilityExample(
          title: 'Labels',
          description:
              'Los campos deben conservar un label visible y no depender únicamente del placeholder.',
          child: AppTextField(
            label: 'Correo electrónico',
            required: true,
            hintText: 'ejemplo@correo.com',
          ),
        ),

        SizedBox(height: 34),

        _AccessibilityExample(
          title: 'Semantics',
          description:
              'Los elementos personalizados deben comunicar su propósito y estado a tecnologías de asistencia.',
          child: _SemanticsExample(),
        ),

        SizedBox(height: 34),

        _AccessibilityExample(
          title: 'No depender solo del color',
          description:
              'Los estados deben combinar color con texto, iconos u otra señal visual.',
          child: _ColorIndependenceExample(),
        ),
      ],
    );
  }
}

class _ContrastExample extends StatelessWidget {
  const _ContrastExample();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          width: 300,
          padding: const EdgeInsets.all(16),
          color: AppColors.primary,
          child: const Text(
            'Texto sobre color primario',
            style: TextStyle(color: Colors.white, fontWeight: FontWeight.w600),
          ),
        ),

        const SizedBox(height: 12),

        Container(
          width: 300,
          padding: const EdgeInsets.all(16),
          color: AppColors.surface,
          child: const Text(
            'Texto sobre superficie',
            style: TextStyle(color: AppColors.textPrimary),
          ),
        ),
      ],
    );
  }
}

class _KeyboardExample extends StatelessWidget {
  const _KeyboardExample();

  @override
  Widget build(BuildContext context) {
    return FocusTraversalGroup(
      policy: OrderedTraversalPolicy(),
      child: Row(
        children: [
          FocusTraversalOrder(
            order: const NumericFocusOrder(1),
            child: AppButton(
              label: 'Anterior',
              variant: AppButtonVariant.secondary,
              onPressed: () {},
            ),
          ),

          const SizedBox(width: 12),

          FocusTraversalOrder(
            order: const NumericFocusOrder(2),
            child: AppButton(label: 'Siguiente', onPressed: () {}),
          ),
        ],
      ),
    );
  }
}

class _TouchTargetExample extends StatelessWidget {
  const _TouchTargetExample();

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Container(
          width: AppAccessibility.minTouchTarget,
          height: AppAccessibility.minTouchTarget,
          alignment: Alignment.center,
          decoration: BoxDecoration(
            border: Border.all(color: AppColors.primary),
            borderRadius: BorderRadius.circular(8),
          ),
          child: const Text('44'),
        ),

        const SizedBox(width: 24),

        Container(
          width: AppAccessibility.recommendedTouchTarget,
          height: AppAccessibility.recommendedTouchTarget,
          alignment: Alignment.center,
          decoration: BoxDecoration(
            border: Border.all(color: AppColors.primary),
            borderRadius: BorderRadius.circular(8),
          ),
          child: const Text('48'),
        ),

        const SizedBox(width: 16),

        Expanded(
          child: Text(
            '44 px mínimo · '
            '48 px recomendado en móvil',
            style: Theme.of(context).textTheme.bodySmall,
          ),
        ),
      ],
    );
  }
}

class _SemanticsExample extends StatelessWidget {
  const _SemanticsExample();

  @override
  Widget build(BuildContext context) {
    return Semantics(
      label: 'Progreso del proyecto',
      value: '68 por ciento completado',
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Progreso del proyecto',
            style: Theme.of(context).textTheme.labelMedium,
          ),

          const SizedBox(height: 8),

          const LinearProgressIndicator(value: 0.68),

          const SizedBox(height: 6),

          Text('68 %', style: Theme.of(context).textTheme.bodySmall),
        ],
      ),
    );
  }
}

class _ColorIndependenceExample extends StatelessWidget {
  const _ColorIndependenceExample();

  @override
  Widget build(BuildContext context) {
    return const Wrap(
      spacing: 12,
      runSpacing: 12,
      children: [
        AppStatusBadge(label: 'En proceso', type: AppStatusBadgeType.info),

        AppStatusBadge(label: 'Completada', type: AppStatusBadgeType.success),

        AppStatusBadge(label: 'Pendiente', type: AppStatusBadgeType.warning),

        AppStatusBadge(label: 'Cancelada', type: AppStatusBadgeType.error),
      ],
    );
  }
}

class _AccessibilityHeading extends StatelessWidget {
  const _AccessibilityHeading();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Accesibilidad',
          style: Theme.of(
            context,
          ).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.w700),
        ),

        const SizedBox(height: 6),

        Text(
          'Reglas para mantener la interfaz perceptible, operable y comprensible para diferentes usuarios.',
          style: Theme.of(context).textTheme.bodyMedium,
        ),
      ],
    );
  }
}

class _AccessibilityExample extends StatelessWidget {
  const _AccessibilityExample({
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
      constraints: const BoxConstraints(maxWidth: 620),
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
