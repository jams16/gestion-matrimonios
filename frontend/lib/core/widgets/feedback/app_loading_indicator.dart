import 'package:flutter/material.dart';

enum AppLoadingIndicatorSize { small, medium, large }

class AppLoadingIndicator extends StatelessWidget {
  const AppLoadingIndicator({
    super.key,
    this.size = AppLoadingIndicatorSize.medium,
    this.label,
  });

  final AppLoadingIndicatorSize size;
  final String? label;

  double get _dimension {
    switch (size) {
      case AppLoadingIndicatorSize.small:
        return 16;

      case AppLoadingIndicatorSize.medium:
        return 24;

      case AppLoadingIndicatorSize.large:
        return 40;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        SizedBox(
          width: _dimension,
          height: _dimension,
          child: const CircularProgressIndicator(strokeWidth: 2.5),
        ),
        if (label != null) ...[const SizedBox(width: 12), Text(label!)],
      ],
    );
  }
}
