import 'package:flutter/material.dart';

class AppRadioOption<T> {
  const AppRadioOption({
    required this.value,
    required this.label,
    this.subtitle,
  });

  final T value;
  final String label;
  final String? subtitle;
}

class AppRadioGroup<T> extends StatelessWidget {
  const AppRadioGroup({
    super.key,
    required this.label,
    required this.options,
    required this.value,
    required this.onChanged,
    this.enabled = true,
  });

  final String label;

  final List<AppRadioOption<T>> options;

  final T? value;

  final ValueChanged<T?>? onChanged;

  final bool enabled;

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

        const SizedBox(height: 8),

        ...options.map(
          (option) => RadioListTile<T>(
            value: option.value,
            groupValue: value,
            onChanged: enabled ? onChanged : null,
            title: Text(
              option.label,
            ),
            subtitle: option.subtitle == null
                ? null
                : Text(
                    option.subtitle!,
                  ),
            contentPadding: EdgeInsets.zero,
            dense: true,
          ),
        ),
      ],
    );
  }
}