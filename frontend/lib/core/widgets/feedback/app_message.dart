import 'package:flutter/material.dart';

enum AppMessageType { info, success, warning, error }

class AppMessage extends StatelessWidget {
  const AppMessage({
    super.key,
    required this.message,
    this.type = AppMessageType.info,
  });

  final String message;
  final AppMessageType type;

  Color _color(BuildContext context) {
    switch (type) {
      case AppMessageType.info:
        return Theme.of(context).colorScheme.primary;

      case AppMessageType.success:
        return const Color(0xFF2E7D32);

      case AppMessageType.warning:
        return const Color(0xFFF9A825);

      case AppMessageType.error:
        return Theme.of(context).colorScheme.error;
    }
  }

  IconData get _icon {
    switch (type) {
      case AppMessageType.info:
        return Icons.info_outline;

      case AppMessageType.success:
        return Icons.check_circle_outline;

      case AppMessageType.warning:
        return Icons.warning_amber_outlined;

      case AppMessageType.error:
        return Icons.error_outline;
    }
  }

  @override
  Widget build(BuildContext context) {
    final color = _color(context);

    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Icon(_icon, size: 18, color: color),
        const SizedBox(width: 8),
        Expanded(
          child: Text(
            message,
            style: Theme.of(
              context,
            ).textTheme.bodySmall?.copyWith(color: color),
          ),
        ),
      ],
    );
  }
}
