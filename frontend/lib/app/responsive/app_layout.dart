abstract final class AppLayout {
  // Ancho máximo del contenido principal.
  static const double maxContentWidth = 1440;

  // Formularios y contenido angosto.
  static const double maxFormWidth = 480;

  // Contenido medio: detalle, cards, etc.
  static const double maxMediumWidth = 960;

  // Padding horizontal de página.
  static const double mobilePagePadding = 16;
  static const double tabletPagePadding = 24;
  static const double desktopPagePadding = 32;

  // Separación de grid.
  static const double gridGap = 24;

  // Columnas recomendadas.
  static const int mobileColumns = 1;
  static const int tabletColumns = 2;
  static const int desktopColumns = 4;
}