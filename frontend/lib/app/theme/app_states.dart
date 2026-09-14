import 'package:flutter/material.dart';

import 'app_colors.dart';

/// Reglas globales para representar estados interactivos y semánticos.
///
/// Estos valores deben reutilizarse en botones, inputs, cards,
/// elementos de navegación y demás componentes de la aplicación.
abstract final class AppStates {
  // ---------------------------------------------------------------------------
  // INTERACCIÓN
  // ---------------------------------------------------------------------------

  /// Overlay aplicado cuando el cursor está sobre un elemento.
  static const double hoverOpacity = 0.08;

  /// Overlay aplicado cuando un elemento tiene foco.
  static const double focusOpacity = 0.12;

  /// Overlay aplicado mientras un elemento está presionado.
  static const double pressedOpacity = 0.12;

  /// Opacidad de contenido deshabilitado.
  static const double disabledContentOpacity = 0.38;

  /// Opacidad de fondos o contenedores deshabilitados.
  static const double disabledContainerOpacity = 0.12;

  // ---------------------------------------------------------------------------
  // ESTADOS SEMÁNTICOS
  // ---------------------------------------------------------------------------

  static const Color error = AppColors.error;
  static const Color success = AppColors.success;
  static const Color warning = AppColors.warning;
  static const Color info = AppColors.info;

  // ---------------------------------------------------------------------------
  // HELPERS
  // ---------------------------------------------------------------------------

  static Color hoverOverlay(Color color) {
    return color.withValues(alpha: hoverOpacity);
  }

  static Color focusOverlay(Color color) {
    return color.withValues(alpha: focusOpacity);
  }

  static Color pressedOverlay(Color color) {
    return color.withValues(alpha: pressedOpacity);
  }

  static Color disabledContent(Color color) {
    return color.withValues(alpha: disabledContentOpacity);
  }

  static Color disabledContainer(Color color) {
    return color.withValues(alpha: disabledContainerOpacity);
  }
}