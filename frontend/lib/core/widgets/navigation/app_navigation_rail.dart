import 'package:flutter/material.dart';

import 'app_navigation_item.dart';

class AppNavigationRail extends StatelessWidget {
  const AppNavigationRail({
    super.key,
    required this.items,
    required this.selectedIndex,
    required this.onDestinationSelected,
    this.extended = false,
    this.leading,
    this.trailing,
    this.backgroundColor,
    this.indicatorColor,
    this.selectedForegroundColor,
    this.selectedLabelColor,
  });

  final List<AppNavigationItem> items;

  final int selectedIndex;
  final ValueChanged<int> onDestinationSelected;

  final bool extended;

  final Widget? leading;
  final Widget? trailing;
  final Color? backgroundColor;
  final Color? indicatorColor;
  final Color? selectedForegroundColor;
  final Color? selectedLabelColor;

  @override
  Widget build(BuildContext context) {
    return NavigationRail(
      selectedIndex: selectedIndex,
      onDestinationSelected: onDestinationSelected,
      extended: extended,
      leading: leading,
      trailing: trailing,
      backgroundColor: backgroundColor,
      indicatorColor: indicatorColor,
      selectedIconTheme: IconThemeData(color: selectedForegroundColor),
      selectedLabelTextStyle: TextStyle(
        color: selectedLabelColor ?? selectedForegroundColor,
      ),
      labelType: extended
          ? NavigationRailLabelType.none
          : NavigationRailLabelType.selected,
      destinations: items
          .map(
            (item) => NavigationRailDestination(
              icon: Icon(item.icon),
              selectedIcon: Icon(item.selectedIcon ?? item.icon),
              label: Text(item.label),
            ),
          )
          .toList(),
    );
  }
}
