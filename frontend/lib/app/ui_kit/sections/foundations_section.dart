import 'package:flutter/material.dart';

import '../../theme/app_borders.dart';
import '../../theme/app_colors.dart';
import '../../theme/app_icons.dart';
import '../../theme/app_radius.dart';
import '../../theme/app_shadows.dart';
import '../../theme/app_sizes.dart';
import '../../theme/app_spacing.dart';
import '../../theme/app_typography.dart';

class _SectionHeading extends StatelessWidget {
  const _SectionHeading({required this.title, required this.description});

  final String title;
  final String description;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: Theme.of(
            context,
          ).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.w700),
        ),
        const SizedBox(height: 6),
        Text(description, style: Theme.of(context).textTheme.bodyMedium),
      ],
    );
  }
}

class FoundationsPageOneSection extends StatelessWidget {
  const FoundationsPageOneSection({super.key});

  @override
  Widget build(BuildContext context) {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _SectionHeading(
          title: 'Fundamentos visuales',
          description: 'Reglas visuales base utilizadas en toda la aplicación.',
        ),

        SizedBox(height: 28),

        _ColorsSection(),

        SizedBox(height: 36),

        _TypographySection(),
      ],
    );
  }
}

class FoundationsPageTwoSection extends StatelessWidget {
  const FoundationsPageTwoSection({super.key});

  @override
  Widget build(BuildContext context) {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _SectionHeading(
          title: 'Fundamentos visuales',
          description:
              'Dimensiones, formas y reglas de interacción del sistema.',
        ),

        SizedBox(height: 28),

        _SpacingSection(),

        SizedBox(height: 36),

        _RadiusSection(),

        SizedBox(height: 36),

        _BordersSection(),

        SizedBox(height: 36),

        _ShadowsSection(),
      ],
    );
  }
}

class FoundationsPageThreeSection extends StatelessWidget {
  const FoundationsPageThreeSection({super.key});

  @override
  Widget build(BuildContext context) {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _SectionHeading(
          title: 'Fundamentos visuales',
          description:
              'Dimensiones, formas y reglas de interacción del sistema.',
        ),

        SizedBox(height: 28),

        _ShadowsSection(),

        SizedBox(height: 36),

        _IconsSection(),

        SizedBox(height: 36),

        _InteractionSection(),
      ],
    );
  }
}

class _ColorsSection extends StatelessWidget {
  const _ColorsSection();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const _SectionTitle('Colores'),

        const SizedBox(height: 16),

        Wrap(
          spacing: 16,
          runSpacing: 16,
          children: const [
            _ColorToken(name: 'Primary', color: AppColors.primary),
            _ColorToken(name: 'Secondary', color: AppColors.secondary),
            _ColorToken(name: 'Surface', color: AppColors.surface),
            _ColorToken(name: 'Text primary', color: AppColors.textPrimary),
            _ColorToken(name: 'Text secondary', color: AppColors.textSecondary),
            _ColorToken(name: 'Border', color: AppColors.border),
            _ColorToken(name: 'Success', color: AppColors.success),
            _ColorToken(name: 'Warning', color: AppColors.warning),
            _ColorToken(name: 'Error', color: AppColors.error),
            _ColorToken(name: 'Info', color: AppColors.info),
            _ColorToken(name: 'Disabled', color: AppColors.disabled),
          ],
        ),
      ],
    );
  }
}

class _TypographySection extends StatelessWidget {
  const _TypographySection();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: const [
        _SectionTitle('Tipografía'),

        SizedBox(height: 16),

        Text(
          'Display — Proyecto de Fin de Carrera 2',
          style: AppTypography.display,
        ),

        SizedBox(height: 16),

        Text('Heading — Gestión de proyectos', style: AppTypography.heading),

        SizedBox(height: 16),

        Text(
          'Subheading — Información general',
          style: AppTypography.subheading,
        ),

        SizedBox(height: 16),

        Text(
          'Body — Texto principal utilizado para contenido.',
          style: AppTypography.body,
        ),

        SizedBox(height: 16),

        Text('Label — Correo electrónico', style: AppTypography.label),

        SizedBox(height: 16),

        Text('Caption — Máximo 100 caracteres.', style: AppTypography.caption),
      ],
    );
  }
}

class _SpacingSection extends StatelessWidget {
  const _SpacingSection();

  @override
  Widget build(BuildContext context) {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _SectionTitle('Spacing'),

        SizedBox(height: 16),

        _SpacingToken('XS', AppSpacing.xs),
        _SpacingToken('SM', AppSpacing.sm),
        _SpacingToken('MD', AppSpacing.md),
        _SpacingToken('LG', AppSpacing.lg),
        _SpacingToken('XL', AppSpacing.xl),
        _SpacingToken('2XL', AppSpacing.xxl),
        _SpacingToken('3XL', AppSpacing.xxxl),
      ],
    );
  }
}

class _RadiusSection extends StatelessWidget {
  const _RadiusSection();

  @override
  Widget build(BuildContext context) {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _SectionTitle('Radios'),

        SizedBox(height: 16),

        Wrap(
          spacing: 16,
          runSpacing: 16,
          children: [
            _RadiusToken('SM', AppRadius.sm),
            _RadiusToken('MD', AppRadius.md),
            _RadiusToken('LG', AppRadius.lg),
            _RadiusToken('XL', AppRadius.xl),
          ],
        ),
      ],
    );
  }
}

class _BordersSection extends StatelessWidget {
  const _BordersSection();

  @override
  Widget build(BuildContext context) {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _SectionTitle('Bordes'),

        SizedBox(height: 16),

        _BorderToken(name: 'Normal', border: AppBorders.normal),

        SizedBox(height: 12),

        _BorderToken(name: 'Focus', border: AppBorders.focused),

        SizedBox(height: 12),

        _BorderToken(name: 'Error', border: AppBorders.error),

        SizedBox(height: 12),

        _BorderToken(name: 'Disabled', border: AppBorders.disabled),
      ],
    );
  }
}

class _ShadowsSection extends StatelessWidget {
  const _ShadowsSection();

  @override
  Widget build(BuildContext context) {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _SectionTitle('Sombras / elevación'),

        SizedBox(height: 16),

        Wrap(
          spacing: 16,
          runSpacing: 16,
          children: [
            _ShadowToken(name: 'None', shadow: AppShadows.none),
            _ShadowToken(name: 'Low', shadow: AppShadows.low),
            _ShadowToken(name: 'Medium', shadow: AppShadows.medium),
            _ShadowToken(name: 'High', shadow: AppShadows.high),
          ],
        ),
      ],
    );
  }
}

class _IconsSection extends StatelessWidget {
  const _IconsSection();

  @override
  Widget build(BuildContext context) {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _SectionTitle('Iconografía'),

        SizedBox(height: 16),

        Row(
          children: [
            Icon(Icons.mail_outline, size: AppIcons.small),

            SizedBox(width: 24),

            Icon(Icons.mail_outline, size: AppIcons.medium),

            SizedBox(width: 24),

            Icon(Icons.mail_outline, size: AppIcons.large),

            SizedBox(width: 24),

            Icon(Icons.mail_outline, size: AppIcons.extraLarge),
          ],
        ),

        SizedBox(height: 12),

        Text('16 / 20 / 24 / 32 px', style: AppTypography.caption),
      ],
    );
  }
}

class _InteractionSection extends StatelessWidget {
  const _InteractionSection();

  @override
  Widget build(BuildContext context) {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _SectionTitle('Tamaños mínimos de interacción'),

        SizedBox(height: 16),

        _SizeToken(label: 'Mínimo', size: AppSizes.minInteraction),

        SizedBox(height: 16),

        _SizeToken(
          label: 'Recomendado móvil',
          size: AppSizes.recommendedInteraction,
        ),

        SizedBox(height: 16),

        Text('Inputs: 48 px de altura recomendada.', style: AppTypography.body),
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
      style: Theme.of(
        context,
      ).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w700),
    );
  }
}

class _ColorToken extends StatelessWidget {
  const _ColorToken({required this.name, required this.color});

  final String name;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 120,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            height: 52,
            decoration: BoxDecoration(
              color: color,
              borderRadius: BorderRadius.circular(AppRadius.md),
              border: Border.all(color: AppColors.border),
            ),
          ),

          const SizedBox(height: 8),

          Text(name, style: AppTypography.label),

          const SizedBox(height: 2),

          Text(_hex(color), style: AppTypography.caption),
        ],
      ),
    );
  }

  String _hex(Color color) {
    return '#${color.value.toRadixString(16).substring(2).toUpperCase()}';
  }
}

class _SpacingToken extends StatelessWidget {
  const _SpacingToken(this.name, this.value);

  final String name;
  final double value;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Row(
        children: [
          SizedBox(width: 48, child: Text(name, style: AppTypography.label)),

          Container(width: value, height: 12, color: AppColors.primary),

          const SizedBox(width: 12),

          Text('${value.toInt()} px', style: AppTypography.caption),
        ],
      ),
    );
  }
}

class _RadiusToken extends StatelessWidget {
  const _RadiusToken(this.name, this.value);

  final String name;
  final double value;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 100,
      child: Column(
        children: [
          Container(
            width: 64,
            height: 48,
            decoration: BoxDecoration(
              border: Border.all(color: AppColors.primary),
              borderRadius: BorderRadius.circular(value),
            ),
          ),

          const SizedBox(height: 8),

          Text('$name · ${value.toInt()}', style: AppTypography.caption),
        ],
      ),
    );
  }
}

class _BorderToken extends StatelessWidget {
  const _BorderToken({required this.name, required this.border});

  final String name;
  final BorderSide border;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        SizedBox(width: 80, child: Text(name, style: AppTypography.label)),

        Container(
          width: 180,
          height: 44,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(AppRadius.md),
            border: Border.fromBorderSide(border),
          ),
        ),
      ],
    );
  }
}

class _ShadowToken extends StatelessWidget {
  const _ShadowToken({required this.name, required this.shadow});

  final String name;
  final List<BoxShadow> shadow;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 120,
      child: Column(
        children: [
          Container(
            width: 100,
            height: 64,
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(AppRadius.lg),
              boxShadow: shadow,
              border: Border.all(color: AppColors.border),
            ),
          ),

          const SizedBox(height: 10),

          Text(name, style: AppTypography.caption),
        ],
      ),
    );
  }
}

class _SizeToken extends StatelessWidget {
  const _SizeToken({required this.label, required this.size});

  final String label;
  final double size;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Container(
          width: size,
          height: size,
          alignment: Alignment.center,
          decoration: BoxDecoration(
            border: Border.all(color: AppColors.primary),
            borderRadius: BorderRadius.circular(AppRadius.md),
          ),
          child: Text('${size.toInt()}', style: AppTypography.caption),
        ),

        const SizedBox(width: 16),

        Text(
          '$label — ${size.toInt()} × ${size.toInt()} px',
          style: AppTypography.body,
        ),
      ],
    );
  }
}
