import 'package:flutter/material.dart';

class AppProgressBar extends StatelessWidget {
  const AppProgressBar({
    super.key,
    required this.value,
    this.label,
    this.showPercentage = true,
  });

  /// Valor entre 0.0 y 1.0.
  final double value;

  final String? label;
  final bool showPercentage;

  @override
  Widget build(BuildContext context) {
    final normalizedValue = value.clamp(0.0, 1.0);

    final percentage = (normalizedValue * 100).round();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (label != null || showPercentage)
          Row(
            children: [
              if (label != null)
                Expanded(
                  child: Text(
                    label!,
                    style: Theme.of(context).textTheme.labelMedium,
                  ),
                ),
              if (showPercentage)
                Text(
                  '$percentage%',
                  style: Theme.of(context).textTheme.labelMedium,
                ),
            ],
          ),

        if (label != null || showPercentage) const SizedBox(height: 8),

        Semantics(
          label: label ?? 'Progreso',
          value: '$percentage%',
          child: LinearProgressIndicator(
            value: normalizedValue,
            minHeight: 8,
            borderRadius: BorderRadius.circular(999),
          ),
        ),
      ],
    );
  }
}
