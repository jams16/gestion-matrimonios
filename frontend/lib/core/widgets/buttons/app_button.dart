import 'package:flutter/material.dart';

import '../../../app/theme/app_colors.dart';
import '../../../app/theme/app_radius.dart';

enum AppButtonVariant {
  primary,
  secondary,
  tertiary,
  destructive,
}

enum AppButtonSize {
  small,
  medium,
  large,
}

class AppButton extends StatelessWidget {
  const AppButton({
    super.key,
    required this.label,
    required this.onPressed,
    this.variant = AppButtonVariant.primary,
    this.size = AppButtonSize.medium,
    this.icon,
    this.loading = false,
    this.expanded = false,
  });

  final String label;

  final VoidCallback? onPressed;

  final AppButtonVariant variant;
  final AppButtonSize size;

  final IconData? icon;

  final bool loading;
  final bool expanded;

  double get _height {
    switch (size) {
      case AppButtonSize.small:
        return 36;

      case AppButtonSize.medium:
        return 44;

      case AppButtonSize.large:
        return 52;
    }
  }

  EdgeInsetsGeometry get _padding {
    switch (size) {
      case AppButtonSize.small:
        return const EdgeInsets.symmetric(
          horizontal: 14,
        );

      case AppButtonSize.medium:
        return const EdgeInsets.symmetric(
          horizontal: 18,
        );

      case AppButtonSize.large:
        return const EdgeInsets.symmetric(
          horizontal: 22,
        );
    }
  }

  TextStyle? _textStyle(BuildContext context) {
    switch (size) {
      case AppButtonSize.small:
        return Theme.of(context).textTheme.labelMedium;

      case AppButtonSize.medium:
        return Theme.of(context).textTheme.labelLarge;

      case AppButtonSize.large:
        return Theme.of(context).textTheme.titleSmall?.copyWith(
              fontWeight: FontWeight.w600,
            );
    }
  }

  ButtonStyle _style(BuildContext context) {
    final radius = RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(
        AppRadius.md,
      ),
    );

    final base = ButtonStyle(
      minimumSize: WidgetStatePropertyAll(
        Size(0, _height),
      ),
      padding: WidgetStatePropertyAll(
        _padding,
      ),
      shape: WidgetStatePropertyAll(
        radius,
      ),
      textStyle: WidgetStatePropertyAll(
        _textStyle(context),
      ),
    );

    switch (variant) {
      case AppButtonVariant.primary:
        return base.copyWith(
          backgroundColor: const WidgetStatePropertyAll(
            AppColors.primary,
          ),
          foregroundColor: const WidgetStatePropertyAll(
            Colors.white,
          ),
        );

      case AppButtonVariant.secondary:
        return base.copyWith(
          backgroundColor: const WidgetStatePropertyAll(
            Colors.transparent,
          ),
          foregroundColor: const WidgetStatePropertyAll(
            AppColors.primary,
          ),
          side: const WidgetStatePropertyAll(
            BorderSide(
              color: AppColors.primary,
            ),
          ),
        );

      case AppButtonVariant.tertiary:
        return base.copyWith(
          backgroundColor: const WidgetStatePropertyAll(
            Colors.transparent,
          ),
          foregroundColor: const WidgetStatePropertyAll(
            AppColors.primary,
          ),
          elevation: const WidgetStatePropertyAll(0),
        );

      case AppButtonVariant.destructive:
        return base.copyWith(
          backgroundColor: const WidgetStatePropertyAll(
            AppColors.error,
          ),
          foregroundColor: const WidgetStatePropertyAll(
            Colors.white,
          ),
        );
    }
  }

  Widget _content(BuildContext context) {
    if (loading) {
      return SizedBox(
        width: 20,
        height: 20,
        child: CircularProgressIndicator(
          strokeWidth: 2,
          color: variant == AppButtonVariant.secondary ||
                  variant == AppButtonVariant.tertiary
              ? AppColors.primary
              : Colors.white,
        ),
      );
    }

    if (icon == null) {
      return Text(label);
    }

    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(
          icon,
          size: 18,
        ),
        const SizedBox(width: 8),
        Text(label),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    final callback = loading ? null : onPressed;

    Widget button;

    switch (variant) {
      case AppButtonVariant.primary:
      case AppButtonVariant.destructive:
        button = FilledButton(
          onPressed: callback,
          style: _style(context),
          child: _content(context),
        );
        break;

      case AppButtonVariant.secondary:
        button = OutlinedButton(
          onPressed: callback,
          style: _style(context),
          child: _content(context),
        );
        break;

      case AppButtonVariant.tertiary:
        button = TextButton(
          onPressed: callback,
          style: _style(context),
          child: _content(context),
        );
        break;
    }

    if (!expanded) {
      return button;
    }

    return SizedBox(
      width: double.infinity,
      child: button,
    );
  }
}