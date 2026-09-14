import 'package:flutter/material.dart';

enum AppSortDirection {
  ascending,
  descending,
}

class AppSortOption<T> {
  const AppSortOption({
    required this.value,
    required this.label,
  });

  final T value;
  final String label;
}

class AppSort<T> extends StatelessWidget {
  const AppSort({
    super.key,
    required this.options,
    required this.value,
    required this.direction,
    required this.onValueChanged,
    required this.onDirectionChanged,
  });

  final List<AppSortOption<T>> options;

  final T value;

  final AppSortDirection direction;

  final ValueChanged<T?> onValueChanged;
  final ValueChanged<AppSortDirection>
      onDirectionChanged;

  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing: 8,
      runSpacing: 8,
      crossAxisAlignment: WrapCrossAlignment.center,
      children: [
        DropdownButton<T>(
          value: value,
          items: options
              .map(
                (option) => DropdownMenuItem<T>(
                  value: option.value,
                  child: Text(
                    option.label,
                  ),
                ),
              )
              .toList(),
          onChanged: onValueChanged,
        ),

        IconButton.outlined(
          tooltip: direction ==
                  AppSortDirection.ascending
              ? 'Orden ascendente'
              : 'Orden descendente',
          onPressed: () {
            onDirectionChanged(
              direction ==
                      AppSortDirection.ascending
                  ? AppSortDirection.descending
                  : AppSortDirection.ascending,
            );
          },
          icon: Icon(
            direction ==
                    AppSortDirection.ascending
                ? Icons.arrow_upward
                : Icons.arrow_downward,
          ),
        ),
      ],
    );
  }
}