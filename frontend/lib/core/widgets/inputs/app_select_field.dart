import 'package:flutter/material.dart';

class AppSelectOption<T> {
  const AppSelectOption({required this.value, required this.label});

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
          style: Theme.of(
            context,
          ).textTheme.labelMedium?.copyWith(fontWeight: FontWeight.w500),
        ),

        const SizedBox(height: 7),

        DropdownButtonFormField<T>(
          isExpanded: true,
          value: options.any((option) => option.value == initialValue)
              ? initialValue
              : null,
          decoration: InputDecoration(
            hintText: hintText,
            helperText: helperText,
            errorText: errorText,
            prefixIcon: searchable ? const Icon(Icons.search) : null,
          ),
          items: options
              .map(
                (option) => DropdownMenuItem<T>(
                  value: option.value,
                  child: Text(
                    _textoSeguro(option.label),
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
              )
              .toList(),
          onChanged: onChanged,
        ),
      ],
    );
  }
}

String _textoSeguro(String texto) => texto
    .replaceAll('\u00a2', 'ó')
    .replaceAll('\u00a1', 'í')
    .replaceAll('\u00a3', 'ú')
    .replaceAll('\u00a0', 'á')
    .replaceAll('\u00a4', 'ñ')
    .replaceAll('\u201a', 'é')
    .replaceAll('\uFFFD', '');
