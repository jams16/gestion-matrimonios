import 'package:flutter/material.dart';

import '../../../core/widgets/indicators/app_avatar.dart';
import '../../../core/widgets/indicators/app_badge.dart';
import '../../../core/widgets/indicators/app_chip.dart';
import '../../../core/widgets/indicators/app_status_badge.dart';
import '../../../core/widgets/indicators/app_tag.dart';

class IndicatorsSection extends StatefulWidget {
  const IndicatorsSection({super.key});

  @override
  State<IndicatorsSection> createState() =>
      _IndicatorsSectionState();
}

class _IndicatorsSectionState
    extends State<IndicatorsSection> {
  bool _selectedChip = true;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const _IndicatorsHeading(),

        const SizedBox(height: 28),

        const _IndicatorExample(
          title: 'Badge',
          description:
              'Muestra información breve, conteos o características destacadas.',
          child: Wrap(
            spacing: 8,
            runSpacing: 8,
            children: [
              AppBadge(
                label: '12',
              ),
              AppBadge(
                label: '3 nuevos',
              ),
              AppBadge(
                label: 'Pro',
              ),
            ],
          ),
        ),

        const SizedBox(height: 30),

        const _IndicatorExample(
          title: 'Status badge',
          description:
              'Representa de forma compacta el estado de un elemento.',
          child: Wrap(
            spacing: 8,
            runSpacing: 8,
            children: [
              AppStatusBadge(
                label: 'Pendiente',
                type: AppStatusBadgeType.warning,
              ),
              AppStatusBadge(
                label: 'En proceso',
                type: AppStatusBadgeType.info,
              ),
              AppStatusBadge(
                label: 'Completada',
                type: AppStatusBadgeType.success,
              ),
              AppStatusBadge(
                label: 'Cancelada',
                type: AppStatusBadgeType.error,
              ),
              AppStatusBadge(
                label: 'Inactiva',
                type: AppStatusBadgeType.neutral,
              ),
            ],
          ),
        ),

        const SizedBox(height: 30),

        _IndicatorExample(
          title: 'Chip',
          description:
              'Elemento compacto que puede representar selección o información removible.',
          child: Wrap(
            spacing: 8,
            runSpacing: 8,
            children: [
              const AppChip(
                label: 'Catering',
                icon: Icons.restaurant_outlined,
              ),
              AppChip(
                label: 'Pendiente',
                selected: _selectedChip,
                onSelected: (value) {
                  setState(() {
                    _selectedChip = value;
                  });
                },
              ),
              AppChip(
                label: 'Fotografía',
                onDeleted: () {},
              ),
            ],
          ),
        ),

        const SizedBox(height: 30),

        const _IndicatorExample(
          title: 'Tag',
          description:
              'Etiqueta pequeña y no interactiva para clasificar información.',
          child: Wrap(
            spacing: 8,
            runSpacing: 8,
            children: [
              AppTag(
                label: 'Alta prioridad',
                icon: Icons.priority_high,
              ),
              AppTag(
                label: 'VIP',
                icon: Icons.star_outline,
              ),
              AppTag(
                label: 'Iglesia',
              ),
            ],
          ),
        ),

        const SizedBox(height: 30),

        const _IndicatorExample(
          title: 'Avatar',
          description:
              'Representa personas mediante fotografía, iniciales o icono de respaldo.',
          child: Wrap(
            spacing: 16,
            crossAxisAlignment: WrapCrossAlignment.center,
            children: [
              AppAvatar(
                name: 'José Moncada',
                size: AppAvatarSize.small,
              ),
              AppAvatar(
                name: 'Carlos Silva',
                size: AppAvatarSize.medium,
              ),
              AppAvatar(
                name: 'Wedding Planner',
                size: AppAvatarSize.large,
              ),
              AppAvatar(
                icon: Icons.person_outline,
                size: AppAvatarSize.medium,
              ),
            ],
          ),
        ),
      ],
    );
  }
}




class _IndicatorsHeading extends StatelessWidget {
  const _IndicatorsHeading();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Indicadores y etiquetas',
          style: Theme.of(context)
              .textTheme
              .headlineSmall
              ?.copyWith(
                fontWeight: FontWeight.w700,
              ),
        ),
        const SizedBox(height: 6),
        Text(
          'Elementos compactos utilizados para comunicar estado, clasificación e identidad.',
          style: Theme.of(context).textTheme.bodyMedium,
        ),
      ],
    );
  }
}

class _IndicatorExample extends StatelessWidget {
  const _IndicatorExample({
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
            style: Theme.of(context)
                .textTheme
                .titleSmall
                ?.copyWith(
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