import 'package:flutter/material.dart';

/// Los avisos de la aplicación usan exclusivamente la paleta semántica
/// información, éxito y error/peligro. `warning` se conserva como alias de
/// compatibilidad para pantallas anteriores, pero visualmente es información.
enum AppSnackbarType { info, success, warning, error, danger }

abstract final class AppSnackbar {
  static void show(
    BuildContext context, {
    required String message,
    AppSnackbarType type = AppSnackbarType.info,
    String? actionLabel,
    VoidCallback? onAction,
  }) {
    final scheme = Theme.of(context).colorScheme;

    final Color backgroundColor;
    final IconData icon;

    switch (type) {
      case AppSnackbarType.info:
        backgroundColor = scheme.primary;
        icon = Icons.info_outline;

      case AppSnackbarType.success:
        backgroundColor = const Color(0xFF2E7D32);
        icon = Icons.check_circle_outline;

      case AppSnackbarType.warning:
        backgroundColor = scheme.primary;
        icon = Icons.info_outline;

      case AppSnackbarType.error:
        backgroundColor = scheme.error;
        icon = Icons.error_outline;

      case AppSnackbarType.danger:
        backgroundColor = scheme.error;
        icon = Icons.error_outline;
    }

    ScaffoldMessenger.of(context)
      ..hideCurrentSnackBar()
      ..showSnackBar(
        SnackBar(
          behavior: SnackBarBehavior.floating,
          backgroundColor: backgroundColor,
          content: Row(
            children: [
              Icon(icon, color: Colors.white),
              const SizedBox(width: 12),
              Expanded(
                child: Text(
                  message,
                  style: const TextStyle(color: Colors.white),
                ),
              ),
            ],
          ),
          action: actionLabel == null
              ? null
              : SnackBarAction(
                  label: actionLabel,
                  textColor: Colors.white,
                  onPressed: onAction ?? () {},
                ),
        ),
      );
  }
}
