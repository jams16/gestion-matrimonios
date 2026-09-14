import 'package:flutter/material.dart';

class AppSelectOption<T> {
  const AppSelectOption({
    required this.value,
    required this.label,
  });

  final T value;
  final String label;
}

class AppSelectField<T> extends StatelessWidget {
  const AppSelectField({
    super.key,
    required this.label,
    required this.options,
    this.initialValue,
    this.hintText = 'Selecciona una opción',
    this.helperText,
    this.errorText,
    this.onChanged,
  });

  final String label;

  final List<AppSelectOption<T>> options;

  final T? initialValue;

  final String hintText;
  final String? helperText;
  final String? errorText;

  final ValueChanged<T?>? onChanged;

  @override
  Widget build(BuildContext context) {
    final searchable = options.length > 5;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: Theme.of(context).textTheme.labelMedium?.copyWith(
                fontWeight: FontWeight.w500,
              ),
        ),

        const SizedBox(height: 7),

        LayoutBuilder(
          builder: (context, constraints) {
            return DropdownMenu<T>(
              width: constraints.maxWidth,
              initialSelection: initialValue,

              hintText: hintText,
              helperText: helperText,
              errorText: errorText,

              enableFilter: searchable,
              enableSearch: searchable,
              requestFocusOnTap: searchable,

              leadingIcon: searchable
                  ? const Icon(
                      Icons.search,
                    )
                  : null,

              dropdownMenuEntries: options
                  .map(
                    (option) => DropdownMenuEntry<T>(
                      value: option.value,
                      label: option.label,
                    ),
                  )
                  .toList(),

              onSelected: onChanged,
            );
          },
        ),
      ],
    );
  }
}