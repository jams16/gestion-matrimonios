import 'package:flutter/material.dart';

enum AppAlertType { info, success, warning, error }

class AppAlert extends StatelessWidget {
  const AppAlert({
    super.key,
    required this.title,
    required this.message,
    this.type = AppAlertType.info,
    this.onClose,
  });

  final String title;
  final String message;
  final AppAlertType type;
  final VoidCallback? onClose;

  Color _color(BuildContext context) {
    switch (type) {
      case AppAlertType.info:
        return Theme.of(context).colorScheme.primary;

      case AppAlertType.success:
        return const Color(0xFF2E7D32);

      case AppAlertType.warning:
        return const Color(0xFFF9A825);

      case AppAlertType.error:
        return Theme.of(context).colorScheme.error;
    }
  }

  IconData get _icon {
    switch (type) {
      case AppAlertType.info:
        return Icons.info_outline;

      case AppAlertType.success:
        return Icons.check_circle_outline;

      case AppAlertType.warning:
        return Icons.warning_amber_outlined;

      case AppAlertType.error:
        return Icons.error_outline;
    }
  }

  @override
  Widget build(BuildContext context) {
    final color = _color(context);

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.08),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: color),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(_icon, color: color),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: Theme.of(context).textTheme.titleSmall?.copyWith(
                    fontWeight: FontWeight.w600,
                    color: color,
                  ),
                ),
                const SizedBox(height: 4),
                Text(message),
              ],
            ),
          ),
          if (onClose != null)
            IconButton(
              tooltip: 'Cerrar',
              onPressed: onClose,
              icon: const Icon(Icons.close),
            ),
        ],
      ),
    );
  }
}
