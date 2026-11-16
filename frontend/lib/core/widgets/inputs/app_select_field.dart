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
    this.searchable = false,
    this.required = false,
  });

  final String label;

  final List<AppSelectOption<T>> options;

  final T? initialValue;

  final String hintText;
  final String? helperText;
  final String? errorText;

  final ValueChanged<T?>? onChanged;

  /// Abre un selector con búsqueda. Úsalo para catálogos amplios, como ubigeos.
  final bool searchable;
  final bool required;

  @override
  Widget build(BuildContext context) {
    if (searchable) {
      return _AppSearchSelectField<T>(
        label: label,
        options: options,
        value: initialValue,
        hintText: hintText,
        helperText: helperText,
        errorText: errorText,
        onChanged: onChanged,
        required: required,
      );
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _SelectLabel(label: label, required: required),

        const SizedBox(height: 7),

        DropdownButtonFormField<T>(
          isExpanded: true,
          initialValue: options.any((option) => option.value == initialValue)
              ? initialValue
              : null,
          decoration: InputDecoration(
            hintText: hintText,
            helperText: helperText,
            errorText: errorText,
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

class _AppSearchSelectField<T> extends StatelessWidget {
  const _AppSearchSelectField({
    required this.label,
    required this.options,
    required this.value,
    required this.hintText,
    required this.helperText,
    required this.errorText,
    required this.onChanged,
    required this.required,
  });

  final String label;
  final List<AppSelectOption<T>> options;
  final T? value;
  final String hintText;
  final String? helperText;
  final String? errorText;
  final ValueChanged<T?>? onChanged;
  final bool required;

  @override
  Widget build(BuildContext context) {
    String? selected;
    for (final option in options) {
      if (option.value == value) {
        selected = option.label;
        break;
      }
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _SelectLabel(label: label, required: required),
        const SizedBox(height: 7),
        InkWell(
          borderRadius: BorderRadius.circular(12),
          onTap: onChanged == null ? null : () => _showSelector(context),
          child: InputDecorator(
            isEmpty: selected == null,
            decoration: InputDecoration(
              helperText: helperText,
              errorText: errorText,
              prefixIcon: const Icon(Icons.search),
              suffixIcon: const Icon(Icons.arrow_drop_down),
            ),
            child: Text(
              selected == null ? hintText : _textoSeguro(selected),
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: selected == null
                  ? Theme.of(context).inputDecorationTheme.hintStyle
                  : null,
            ),
          ),
        ),
      ],
    );
  }

  Future<void> _showSelector(BuildContext context) async {
    var query = '';
    await showModalBottomSheet<void>(
      context: context,
      isScrollControlled: true,
      showDragHandle: true,
      builder: (sheetContext) => SafeArea(
        child: StatefulBuilder(
          builder: (context, setSheetState) {
            final filtered = options.where((option) {
              return _textoSeguro(
                option.label,
              ).toLowerCase().contains(query.trim().toLowerCase());
            }).toList();
            return SizedBox(
              height: MediaQuery.sizeOf(context).height * .72,
              child: Padding(
                padding: const EdgeInsets.fromLTRB(20, 0, 20, 20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(label, style: Theme.of(context).textTheme.titleMedium),
                    const SizedBox(height: 12),
                    TextField(
                      autofocus: true,
                      decoration: const InputDecoration(
                        hintText: 'Buscar...',
                        prefixIcon: Icon(Icons.search),
                      ),
                      onChanged: (text) => setSheetState(() => query = text),
                    ),
                    const SizedBox(height: 8),
                    Expanded(
                      child: filtered.isEmpty
                          ? const Center(child: Text('No hay resultados.'))
                          : ListView.separated(
                              itemCount: filtered.length,
                              separatorBuilder: (_, _) =>
                                  const Divider(height: 1),
                              itemBuilder: (_, index) {
                                final option = filtered[index];
                                return ListTile(
                                  title: Text(_textoSeguro(option.label)),
                                  trailing: option.value == value
                                      ? const Icon(Icons.check)
                                      : null,
                                  onTap: () {
                                    Navigator.of(sheetContext).pop();
                                    onChanged?.call(option.value);
                                  },
                                );
                              },
                            ),
                    ),
                  ],
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}

class _SelectLabel extends StatelessWidget {
  const _SelectLabel({required this.label, required this.required});

  final String label;
  final bool required;

  @override
  Widget build(BuildContext context) => Text.rich(
    TextSpan(
      text: label,
      style: Theme.of(
        context,
      ).textTheme.labelMedium?.copyWith(fontWeight: FontWeight.w500),
      children: required
          ? const [
              TextSpan(
                text: ' *',
                style: TextStyle(
                  color: Colors.red,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ]
          : const [],
    ),
  );
}

String _textoSeguro(String texto) => texto
    .replaceAll('\u00a2', 'ó')
    .replaceAll('\u00a1', 'í')
    .replaceAll('\u00a3', 'ú')
    .replaceAll('\u00a0', 'á')
    .replaceAll('\u00a4', 'ñ')
    .replaceAll('\u201a', 'é')
    .replaceAll('\uFFFD', '');
