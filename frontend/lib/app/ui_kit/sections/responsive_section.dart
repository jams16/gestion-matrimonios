import 'package:flutter/material.dart';

import '../../responsive/app_layout.dart';
import '../../theme/app_colors.dart';
import '../../theme/app_radius.dart';
import '../../theme/app_typography.dart';

class ResponsiveOnePageSection extends StatelessWidget {
  const ResponsiveOnePageSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: const [
        _SectionHeading(
          title: 'Responsive',
          description:
              'Reglas de adaptación de la interfaz según el espacio disponible.',
        ),

        SizedBox(height: 28),

        _BreakpointsSection(),

        SizedBox(height: 36),

        _MaxWidthsSection(),

        SizedBox(height: 36),

        _PagePaddingSection(),
      ],
    );
  }
}

class ResponsiveTwoPageSection extends StatelessWidget {
  const ResponsiveTwoPageSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: const [
        _SectionHeading(
          title: 'Responsive',
          description:
              'Reglas de adaptación de la interfaz según el espacio disponible.',
        ),

        SizedBox(height: 28),

        _ResponsiveRulesSection(),
      ],
    );
  }
}

class ResponsiveThreePageSection extends StatelessWidget {
  const ResponsiveThreePageSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: const [
        _SectionHeading(
          title: 'Responsive',
          description:
              'Reglas de adaptación de la interfaz según el espacio disponible.',
        ),

        SizedBox(height: 28),

        _GridSection(),
      ],
    );
  }
}


class _BreakpointsSection extends StatelessWidget {
  const _BreakpointsSection();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: const [
        _SectionTitle('Breakpoints'),
        SizedBox(height: 16),

        _BreakpointToken(
          label: 'Mobile',
          value: '< 600 px',
          width: 120,
        ),
        SizedBox(height: 12),

        _BreakpointToken(
          label: 'Tablet',
          value: '600 – 1023 px',
          width: 220,
        ),
        SizedBox(height: 12),

        _BreakpointToken(
          label: 'Desktop',
          value: '1024 – 1439 px',
          width: 320,
        ),
        SizedBox(height: 12),

        _BreakpointToken(
          label: 'Large desktop',
          value: '≥ 1440 px',
          width: 420,
        ),
      ],
    );
  }
}

class _MaxWidthsSection extends StatelessWidget {
  const _MaxWidthsSection();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const _SectionTitle('Anchos máximos'),
        const SizedBox(height: 16),

        _ValueRow(
          label: 'Contenido principal',
          value: '${AppLayout.maxContentWidth.toInt()} px',
        ),
        _ValueRow(
          label: 'Formulario',
          value: '${AppLayout.maxFormWidth.toInt()} px',
        ),
        _ValueRow(
          label: 'Contenido medio',
          value: '${AppLayout.maxMediumWidth.toInt()} px',
        ),
      ],
    );
  }
}


class _PagePaddingSection extends StatelessWidget {
  const _PagePaddingSection();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const _SectionTitle('Padding de página'),
        const SizedBox(height: 16),

        _ValueRow(
          label: 'Mobile',
          value: '${AppLayout.mobilePagePadding.toInt()} px',
        ),
        _ValueRow(
          label: 'Tablet',
          value: '${AppLayout.tabletPagePadding.toInt()} px',
        ),
        _ValueRow(
          label: 'Desktop',
          value: '${AppLayout.desktopPagePadding.toInt()} px',
        ),
      ],
    );
  }
}


class _ResponsiveRulesSection extends StatelessWidget {
  const _ResponsiveRulesSection();

  @override
  Widget build(BuildContext context) {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _SectionTitle('Reglas mobile / tablet / desktop'),
        SizedBox(height: 16),

        _RuleCard(
          title: 'Mobile',
          items: [
            '1 columna',
            'Contenido al 100% del ancho disponible',
            'Padding horizontal de 16 px',
            'Navegación compacta',
            'Tablas complejas se adaptan a cards o scroll horizontal',
          ],
        ),

        SizedBox(height: 12),

        _RuleCard(
          title: 'Tablet',
          items: [
            '1–2 columnas',
            'Padding horizontal de 24 px',
            'Mayor aprovechamiento horizontal',
            'Componentes conservan tamaños táctiles',
          ],
        ),

        SizedBox(height: 12),

        _RuleCard(
          title: 'Desktop',
          items: [
            'Hasta 4 columnas',
            'Padding horizontal de 32 px',
            'Contenido máximo de 1440 px',
            'Puede utilizar sidebar o navigation rail',
            'Formularios simples conservan ancho máximo de 480 px',
          ],
        ),
      ],
    );
  }
}


class _GridSection extends StatelessWidget {
  const _GridSection();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const _SectionTitle('Grid / columnas'),
        const SizedBox(height: 16),

        _GridPreview(
          label: 'Mobile · 1 columna',
          columns: AppLayout.mobileColumns,
        ),

        const SizedBox(height: 16),

        _GridPreview(
          label: 'Tablet · 2 columnas',
          columns: AppLayout.tabletColumns,
        ),

        const SizedBox(height: 16),

        _GridPreview(
          label: 'Desktop · 4 columnas',
          columns: AppLayout.desktopColumns,
        ),
      ],
    );
  }
}


class _SectionHeading extends StatelessWidget {
  const _SectionHeading({
    required this.title,
    required this.description,
  });

  final String title;
  final String description;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                fontWeight: FontWeight.w700,
              ),
        ),
        const SizedBox(height: 6),
        Text(
          description,
          style: Theme.of(context).textTheme.bodyMedium,
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



class _BreakpointToken extends StatelessWidget {
  const _BreakpointToken({
    required this.label,
    required this.value,
    required this.width,
  });

  final String label;
  final String value;
  final double width;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        SizedBox(
          width: 120,
          child: Text(
            label,
            style: AppTypography.label,
          ),
        ),
        Container(
          width: width,
          height: 32,
          alignment: Alignment.centerLeft,
          padding: const EdgeInsets.symmetric(horizontal: 10),
          decoration: BoxDecoration(
            color: AppColors.primary.withValues(alpha: 0.08),
            borderRadius: BorderRadius.circular(AppRadius.md),
            border: Border.all(
              color: AppColors.primary,
            ),
          ),
          child: Text(
            value,
            style: AppTypography.caption,
          ),
        ),
      ],
    );
  }
}



class _ValueRow extends StatelessWidget {
  const _ValueRow({
    required this.label,
    required this.value,
  });

  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Row(
        children: [
          SizedBox(
            width: 190,
            child: Text(
              label,
              style: AppTypography.label,
            ),
          ),
          Text(
            value,
            style: AppTypography.body,
          ),
        ],
      ),
    );
  }
}



class _RuleCard extends StatelessWidget {
  const _RuleCard({
    required this.title,
    required this.items,
  });

  final String title;
  final List<String> items;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        border: Border.all(
          color: AppColors.border,
        ),
        borderRadius: BorderRadius.circular(
          AppRadius.lg,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: AppTypography.subheading,
          ),
          const SizedBox(height: 8),
          for (final item in items)
            Padding(
              padding: const EdgeInsets.only(bottom: 4),
              child: Text(
                '• $item',
                style: AppTypography.body,
              ),
            ),
        ],
      ),
    );
  }
}




class _GridPreview extends StatelessWidget {
  const _GridPreview({
    required this.label,
    required this.columns,
  });

  final String label;
  final int columns;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: AppTypography.label,
        ),
        const SizedBox(height: 8),

        Row(
          children: List.generate(
            columns,
            (index) => Expanded(
              child: Container(
                height: 44,
                margin: EdgeInsets.only(
                  right: index == columns - 1
                      ? 0
                      : AppLayout.gridGap / 2,
                ),
                decoration: BoxDecoration(
                  color: AppColors.primary.withValues(
                    alpha: 0.10,
                  ),
                  borderRadius: BorderRadius.circular(
                    AppRadius.md,
                  ),
                  border: Border.all(
                    color: AppColors.primary,
                  ),
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }
}