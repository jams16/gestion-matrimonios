import 'package:flutter/material.dart';

import '../../../app/theme/app_colors.dart';
import 'app_dialog.dart';

enum AppConfirmationType {
  normal,
  destructive,
}

abstract final class AppConfirmationDialog {
  static Future<bool> show(
    BuildContext context, {
    required String title,
    required String message,
    String confirmLabel = 'Confirmar',
    String cancelLabel = 'Cancelar',
    AppConfirmationType type = AppConfirmationType.normal,
  }) async {
    final destructive =
        type == AppConfirmationType.destructive;

    final result = await AppDialog.show<bool>(
      context,
      title: title,
      description: message,
      icon: destructive
          ? Icons.warning_amber_outlined
          : Icons.help_outline,
      content: const SizedBox.shrink(),
      barrierDismissible: false,
      actions: [
        TextButton(
          onPressed: () {
            Navigator.of(context).pop(false);
          },
          child: Text(cancelLabel),
        ),
        destructive
            ? FilledButton(
                style: FilledButton.styleFrom(
                  backgroundColor: AppColors.error,
                  foregroundColor: Colors.white,
                ),
                onPressed: () {
                  Navigator.of(context).pop(true);
                },
                child: Text(confirmLabel),
              )
            : FilledButton(
                onPressed: () {
                  Navigator.of(context).pop(true);
                },
                child: Text(confirmLabel),
              ),
      ],
    );

    return result ?? false;
  }
}