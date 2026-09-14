import 'package:flutter/material.dart';

class AppChip extends StatelessWidget {
  const AppChip({
    super.key,
    required this.label,
    this.icon,
    this.onDeleted,
    this.selected = false,
    this.onSelected,
  });

  final String label;
  final IconData? icon;

  final VoidCallback? onDeleted;

  final bool selected;
  final ValueChanged<bool>? onSelected;

  @override
  Widget build(BuildContext context) {
    if (onSelected != null) {
      return FilterChip(
        label: Text(label),
        selected: selected,
        onSelected: onSelected,
        avatar: icon == null
            ? null
            : Icon(
                icon,
                size: 18,
              ),
        deleteIcon: onDeleted == null
            ? null
            : const Icon(
                Icons.close,
                size: 18,
              ),
        onDeleted: onDeleted,
      );
    }

    return Chip(
      label: Text(label),
      avatar: icon == null
          ? null
          : Icon(
              icon,
              size: 18,
            ),
      deleteIcon: onDeleted == null
          ? null
          : const Icon(
              Icons.close,
              size: 18,
            ),
      onDeleted: onDeleted,
    );
  }
}