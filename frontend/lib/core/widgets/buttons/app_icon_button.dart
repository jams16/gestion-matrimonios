import 'package:flutter/material.dart';

import '../../../app/theme/app_colors.dart';

enum AppIconButtonVariant {
  standard,
  filled,
  outlined,
  destructive,
}

class AppIconButton extends StatelessWidget {
  const AppIconButton({
    super.key,
    required this.icon,
    required this.tooltip,
    required this.onPressed,
    this.variant = AppIconButtonVariant.standard,
  });

  final IconData icon;
  final String tooltip;

  final VoidCallback? onPressed;

  final AppIconButtonVariant variant;

  @override
  Widget build(BuildContext context) {
    switch (variant) {
      case AppIconButtonVariant.standard:
        return IconButton(
          tooltip: tooltip,
          onPressed: onPressed,
          icon: Icon(icon),
        );

      case AppIconButtonVariant.filled:
        return IconButton.filled(
          tooltip: tooltip,
          onPressed: onPressed,
          icon: Icon(icon),
        );

      case AppIconButtonVariant.outlined:
        return IconButton.outlined(
          tooltip: tooltip,
          onPressed: onPressed,
          icon: Icon(icon),
        );

      case AppIconButtonVariant.destructive:
        return IconButton.filled(
          tooltip: tooltip,
          onPressed: onPressed,
          style: IconButton.styleFrom(
            backgroundColor: AppColors.error,
            foregroundColor: Colors.white,
          ),
          icon: Icon(icon),
        );
    }
  }
}