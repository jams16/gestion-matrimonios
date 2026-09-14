import 'package:flutter/material.dart';

enum AppBannerType {
  info,
  warning,
  error,
}

class AppBanner extends StatelessWidget {
  const AppBanner({
    super.key,
    required this.message,
    this.type = AppBannerType.info,
    this.actionLabel,
    this.onAction,
    this.onClose,
  });

  final String message;
  final AppBannerType type;

  final String? actionLabel;
  final VoidCallback? onAction;
  final VoidCallback? onClose;

  Color _color(BuildContext context) {
    switch (type) {
      case AppBannerType.info:
        return Theme.of(context).colorScheme.primary;

      case AppBannerType.warning:
        return const Color(0xFFF9A825);

      case AppBannerType.error:
        return Theme.of(context).colorScheme.error;
    }
  }

  IconData get _icon {
    switch (type) {
      case AppBannerType.info:
        return Icons.info_outline;

      case AppBannerType.warning:
        return Icons.warning_amber_outlined;

      case AppBannerType.error:
        return Icons.error_outline;
    }
  }

  @override
  Widget build(BuildContext context) {
    final color = _color(context);

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(
        horizontal: 16,
        vertical: 12,
      ),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.08),
        border: Border(
          bottom: BorderSide(
            color: color,
          ),
        ),
      ),
      child: Row(
        children: [
          Icon(
            _icon,
            color: color,
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              message,
            ),
          ),
          if (actionLabel != null)
            TextButton(
              onPressed: onAction,
              child: Text(actionLabel!),
            ),
          if (onClose != null)
            IconButton(
              tooltip: 'Cerrar',
              onPressed: onClose,
              icon: const Icon(
                Icons.close,
              ),
            ),
        ],
      ),
    );
  }
}