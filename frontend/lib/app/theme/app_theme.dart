import 'package:flutter/material.dart';

import 'app_borders.dart';
import 'app_colors.dart';
import 'app_radius.dart';
import 'app_typography.dart';

abstract final class AppTheme {
  static ThemeData get light {
    final colorScheme = ColorScheme(
      brightness: Brightness.light,

      primary: AppColors.primary,
      onPrimary: Colors.white,

      secondary: AppColors.secondary,
      onSecondary: Colors.white,

      error: AppColors.error,
      onError: Colors.white,

      surface: AppColors.surface,
      onSurface: AppColors.textPrimary,
    );

    return ThemeData(
      useMaterial3: true,

      colorScheme: colorScheme,

      scaffoldBackgroundColor: AppColors.background,

      focusColor: AppColors.primary.withValues(
        alpha: 0.12,
      ),

      hoverColor: AppColors.primary.withValues(
        alpha: 0.08,
      ),

      splashColor: AppColors.primary.withValues(
        alpha: 0.12,
      ),

      textTheme: const TextTheme(
        displaySmall: AppTypography.display,
        headlineMedium: AppTypography.heading,
        titleLarge: AppTypography.subheading,
        bodyMedium: AppTypography.body,
        labelLarge: AppTypography.label,
        bodySmall: AppTypography.caption,
      ),

      inputDecorationTheme: InputDecorationTheme(
        filled: false,
        isDense: true,

        contentPadding: const EdgeInsets.symmetric(
          horizontal: 14,
          vertical: 13,
        ),

        hintStyle: AppTypography.body.copyWith(
          color: AppColors.textSecondary,
        ),

        helperStyle: AppTypography.caption.copyWith(
          color: AppColors.textSecondary,
        ),

        errorStyle: AppTypography.caption.copyWith(
          color: AppColors.error,
        ),

        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(
            AppRadius.md,
          ),
          borderSide: AppBorders.normal,
        ),

        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(
            AppRadius.md,
          ),
          borderSide: AppBorders.normal,
        ),

        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(
            AppRadius.md,
          ),
          borderSide: AppBorders.focused,
        ),

        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(
            AppRadius.md,
          ),
          borderSide: AppBorders.error,
        ),

        focusedErrorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(
            AppRadius.md,
          ),
          borderSide: const BorderSide(
            color: AppColors.error,
            width: 1.5,
          ),
        ),

        disabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(
            AppRadius.md,
          ),
          borderSide: AppBorders.disabled,
        ),
      ),
    );
  }
}