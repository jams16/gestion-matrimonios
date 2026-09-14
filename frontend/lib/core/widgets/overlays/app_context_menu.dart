import 'package:flutter/material.dart';

class AppContextMenuItem<T> {
  const AppContextMenuItem({
    required this.value,
    required this.label,
    this.icon,
    this.destructive = false,
  });

  final T value;
  final String label;
  final IconData? icon;
  final bool destructive;
}

class AppContextMenu<T> extends StatelessWidget {
  const AppContextMenu({
    super.key,
    required this.items,
    required this.onSelected,
    this.tooltip = 'Más opciones',
    this.icon = Icons.more_vert,
  });

  final List<AppContextMenuItem<T>> items;

  final ValueChanged<T> onSelected;

  final String tooltip;
  final IconData icon;

  @override
  Widget build(BuildContext context) {
    return MenuAnchor(
      builder: (
        context,
        controller,
        child,
      ) {
        return IconButton(
          tooltip: tooltip,
          onPressed: () {
            if (controller.isOpen) {
              controller.close();
            } else {
              controller.open();
            }
          },
          icon: Icon(icon),
        );
      },
      menuChildren: items.map(
        (item) {
          final color = item.destructive
              ? Theme.of(context).colorScheme.error
              : null;

          return MenuItemButton(
            leadingIcon: item.icon == null
                ? null
                : Icon(
                    item.icon,
                    color: color,
                  ),
            onPressed: () {
              onSelected(item.value);
            },
            child: Text(
              item.label,
              style: TextStyle(
                color: color,
              ),
            ),
          );
        },
      ).toList(),
    );
  }
}