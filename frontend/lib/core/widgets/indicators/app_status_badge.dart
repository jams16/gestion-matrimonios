import 'package:flutter/material.dart';

enum AppStatusBadgeType {
  neutral,
  info,
  success,
  warning,
  error,
}

class AppStatusBadge extends StatelessWidget {
  const AppStatusBadge({
    super.key,
    required this.label,
    required this.type,
    this.showDot = true,
  });

  final String label;
  final AppStatusBadgeType type;
  final bool showDot;

  Color _color(BuildContext context) {
    switch (type) {
      case AppStatusBadgeType.neutral:
        return Theme.of(context)
            .colorScheme
            .onSurfaceVariant;

      case AppStatusBadgeType.info:
        return Theme.of(context).colorScheme.primary;

      case AppStatusBadgeType.success:
        return const Color(0xFF2E7D32);

      case AppStatusBadgeType.warning:
        return const Color(0xFFF9A825);

      case AppStatusBadgeType.error:
        return Theme.of(context).colorScheme.error;
    }
  }

  @override
  Widget build(BuildContext context) {
    final color = _color(context);

    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: 10,
        vertical: 5,
      ),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.10),
        borderRadius: BorderRadius.circular(999),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (showDot) ...[
            Container(
              width: 7,
              height: 7,
              decoration: BoxDecoration(
                color: color,
                shape: BoxShape.circle,
              ),
            ),
            const SizedBox(width: 6),
          ],
          Text(
            label,
            style: Theme.of(context).textTheme.labelSmall?.copyWith(
                  color: color,
                  fontWeight: FontWeight.w600,
                ),
          ),
        ],
      ),
    );
  }
}