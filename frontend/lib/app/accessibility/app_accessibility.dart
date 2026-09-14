abstract final class AppAccessibility {
  // Tamaño mínimo aceptable para elementos interactivos.
  static const double minTouchTarget = 44;

  // Tamaño recomendado para móvil.
  static const double recommendedTouchTarget = 48;

  // Grosor del indicador de foco.
  static const double focusBorderWidth = 2;

  // Separación entre el componente y el focus ring.
  static const double focusRingGap = 2;

  // Duración recomendada para tooltips.
  static const Duration tooltipWaitDuration = Duration(milliseconds: 400);

  static const Duration tooltipShowDuration = Duration(seconds: 3);
}
