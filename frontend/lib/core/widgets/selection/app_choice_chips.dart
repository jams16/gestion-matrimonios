import 'package:flutter/material.dart';

class AppChipOption<T> {
  const AppChipOption({
    required this.value,
    required this.label,
    this.icon,
  });

  final T value;
  final String label;
  final IconData? icon;
}

class AppChoiceChips<T> extends StatelessWidget {
  const AppChoiceChips({
    super.key,
    required this.label,
    required this.options,
    required this.value,
    required this.onChanged,
  });

  final String label;

  final List<AppChipOption<T>> options;

  final T? value;

  final ValueChanged<T>? onChanged;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: Theme.of(context).textTheme.labelMedium?.copyWith(
                fontWeight: FontWeight.w500,
              ),
        ),

        const SizedBox(height: 10),

        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: options.map(
            (option) {
              final selected = option.value == value;

              return ChoiceChip(
                label: Text(
                  option.label,
                ),
                selected: selected,
                avatar: option.icon == null
                    ? null
                    : Icon(
                        option.icon,
                        size: 18,
                      ),
                onSelected: (_) {
                  onChanged?.call(
                    option.value,
                  );
                },
              );
            },
          ).toList(),
        ),
      ],
    );
  }
}