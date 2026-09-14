import 'package:flutter/material.dart';

enum AppPageStateType {
  empty,
  error,
  noPermission,
  offline,
  success,
}

class AppPageState extends StatelessWidget {
  const AppPageState({
    super.key,
    required this.type,
    required this.title,
    required this.message,
    this.primaryAction,
    this.secondaryAction,
    this.icon,
  });

  final AppPageStateType type;

  final String title;
  final String message;

  final Widget? primaryAction;
  final Widget? secondaryAction;

  final IconData? icon;

  IconData _defaultIcon() {
    switch (type) {
      case AppPageStateType.empty:
        return Icons.inbox_outlined;

      case AppPageStateType.error:
        return Icons.error_outline;

      case AppPageStateType.noPermission:
        return Icons.lock_outline;

      case AppPageStateType.offline:
        return Icons.wifi_off_outlined;

      case AppPageStateType.success:
        return Icons.check_circle_outline;
    }
  }

  Color _color(BuildContext context) {
    switch (type) {
      case AppPageStateType.empty:
        return Theme.of(context)
            .colorScheme
            .onSurfaceVariant;

      case AppPageStateType.error:
        return Theme.of(context).colorScheme.error;

      case AppPageStateType.noPermission:
        return Theme.of(context)
            .colorScheme
            .onSurfaceVariant;

      case AppPageStateType.offline:
        return Theme.of(context).colorScheme.primary;

      case AppPageStateType.success:
        return const Color(0xFF2E7D32);
    }
  }

  @override
  Widget build(BuildContext context) {
    final color = _color(context);

    return Center(
      child: ConstrainedBox(
        constraints: const BoxConstraints(
          maxWidth: 420,
        ),
        child: Padding(
          padding: const EdgeInsets.symmetric(
            horizontal: 24,
            vertical: 40,
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(
                icon ?? _defaultIcon(),
                size: 56,
                color: color,
              ),

              const SizedBox(height: 20),

              Text(
                title,
                textAlign: TextAlign.center,
                style: Theme.of(context)
                    .textTheme
                    .titleLarge
                    ?.copyWith(
                      fontWeight: FontWeight.w700,
                    ),
              ),

              const SizedBox(height: 8),

              Text(
                message,
                textAlign: TextAlign.center,
                style: Theme.of(context).textTheme.bodyMedium,
              ),

              if (primaryAction != null ||
                  secondaryAction != null) ...[
                const SizedBox(height: 24),

                Wrap(
                  spacing: 12,
                  runSpacing: 12,
                  alignment: WrapAlignment.center,
                  children: [
                    if (secondaryAction != null)
                      secondaryAction!,
                    if (primaryAction != null)
                      primaryAction!,
                  ],
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}