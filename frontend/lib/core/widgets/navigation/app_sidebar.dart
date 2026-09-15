import 'package:flutter/material.dart';

import 'app_navigation_item.dart';

class AppSidebar extends StatelessWidget {
  const AppSidebar({
    super.key,
    required this.items,
    required this.selectedIndex,
    required this.onDestinationSelected,
    this.header,
    this.footer,
    this.width = 260,
    this.backgroundColor,
    this.indicatorColor,
    this.selectedForegroundColor,
  });

  final List<AppNavigationItem> items;

  final int selectedIndex;
  final ValueChanged<int> onDestinationSelected;

  final Widget? header;
  final Widget? footer;

  final double width;
  final Color? backgroundColor;
  final Color? indicatorColor;
  final Color? selectedForegroundColor;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: width,
      child: NavigationDrawer(
        backgroundColor: backgroundColor,
        indicatorColor: indicatorColor,
        selectedIndex: selectedIndex,
        onDestinationSelected: onDestinationSelected,
        children: [
          if (header != null)
            Padding(
              padding: const EdgeInsets.fromLTRB(20, 20, 20, 12),
              child: header,
            ),

          ...items.asMap().entries.map((entry) {
            final item = entry.value;
            final isSelected = entry.key == selectedIndex;
            final color = isSelected ? selectedForegroundColor : null;
            return NavigationDrawerDestination(
              icon: Icon(item.icon, color: color),
              selectedIcon: Icon(item.selectedIcon ?? item.icon, color: color),
              label: Text(item.label, style: TextStyle(color: color)),
            );
          }),

          if (footer != null) ...[
            const Divider(),
            Padding(padding: const EdgeInsets.all(16), child: footer),
          ],
        ],
      ),
    );
  }
}
