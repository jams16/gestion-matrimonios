import 'package:flutter/material.dart';

import 'app_text_field.dart';

class AppAutocompleteField extends StatelessWidget {
  const AppAutocompleteField({
    super.key,
    required this.label,
    required this.options,
    this.hintText,
    this.onSelected,
  });

  final String label;
  final List<String> options;

  final String? hintText;

  final ValueChanged<String>? onSelected;

  @override
  Widget build(BuildContext context) {
    return Autocomplete<String>(
      optionsBuilder: (textEditingValue) {
        final query = textEditingValue.text
            .trim()
            .toLowerCase();

        if (query.isEmpty) {
          return const Iterable<String>.empty();
        }

        return options.where(
          (option) => option
              .toLowerCase()
              .contains(query),
        );
      },

      onSelected: onSelected,

      fieldViewBuilder: (
        context,
        controller,
        focusNode,
        onFieldSubmitted,
      ) {
        return AppTextField(
          label: label,
          controller: controller,
          focusNode: focusNode,
          hintText: hintText,
          prefixIcon: const Icon(
            Icons.search,
          ),
          onFieldSubmitted: (_) {
            onFieldSubmitted();
          },
        );
      },

      optionsViewBuilder: (
        context,
        onSelected,
        options,
      ) {
        final values = options.toList();

        return Align(
          alignment: Alignment.topLeft,
          child: Material(
            elevation: 4,
            borderRadius: BorderRadius.circular(8),
            child: ConstrainedBox(
              constraints: const BoxConstraints(
                maxWidth: 480,
                maxHeight: 240,
              ),
              child: ListView.builder(
                padding: EdgeInsets.zero,
                shrinkWrap: true,
                itemCount: values.length,
                itemBuilder: (context, index) {
                  final option = values[index];

                  return ListTile(
                    title: Text(option),
                    onTap: () {
                      onSelected(option);
                    },
                  );
                },
              ),
            ),
          ),
        );
      },
    );
  }
}