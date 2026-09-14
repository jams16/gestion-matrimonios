import 'package:flutter/material.dart';

import '../../../app/theme/app_colors.dart';
import '../../../app/theme/app_radius.dart';

class AppFilters extends StatelessWidget {
  const AppFilters({
    super.key,
    required this.children,
    this.onClear,
    this.clearLabel = 'Limpiar filtros',
  });

  final List<Widget> children;

  final VoidCallback? onClear;
  final String clearLabel;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(AppRadius.lg),
        border: Border.all(color: AppColors.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Text(
                'Filtros',
                style: Theme.of(
                  context,
                ).textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w600),
              ),

              const Spacer(),

              if (onClear != null)
                TextButton(onPressed: onClear, child: Text(clearLabel)),
            ],
          ),

          const SizedBox(height: 12),

          Wrap(spacing: 12, runSpacing: 12, children: children),
        ],
      ),
    );
  }
}
