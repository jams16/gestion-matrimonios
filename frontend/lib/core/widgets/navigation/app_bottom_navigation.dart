import 'package:flutter/material.dart';

import 'app_navigation_item.dart';

class AppBottomNavigation extends StatelessWidget {
  const AppBottomNavigation({
    super.key,
    required this.items,
    required this.selectedIndex,
    required this.onDestinationSelected,
    this.backgroundColor,
    this.indicatorColor,
    this.selectedForegroundColor,
    this.selectedLabelColor,
  });

  final List<AppNavigationItem> items;

  final int selectedIndex;
  final ValueChanged<int> onDestinationSelected;
  final Color? backgroundColor;
  final Color? indicatorColor;
  final Color? selectedForegroundColor;
  final Color? selectedLabelColor;

  @override
  Widget build(BuildContext context) {
    return NavigationBarTheme(
      data: NavigationBarThemeData(
        labelTextStyle: WidgetStatePropertyAll(
          TextStyle(color: selectedLabelColor),
        ),
      ),
      child: NavigationBar(
        selectedIndex: selectedIndex,
        onDestinationSelected: onDestinationSelected,
        labelBehavior: NavigationDestinationLabelBehavior.onlyShowSelected,
        backgroundColor: backgroundColor,
        indicatorColor: indicatorColor,
        destinations: items
            .map(
              (item) => NavigationDestination(
                icon: Icon(item.icon),
                selectedIcon: Icon(
                  item.selectedIcon ?? item.icon,
                  color: selectedForegroundColor,
                ),
                label: item.label,
              ),
            )
            .toList(),
      ),
    );
  }
}
