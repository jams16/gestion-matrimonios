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
  });

  final List<AppNavigationItem> items;

  final int selectedIndex;
  final ValueChanged<int> onDestinationSelected;

  final bool extended;

  final Widget? leading;
  final Widget? trailing;

  @override
  Widget build(BuildContext context) {
    return NavigationRail(
      selectedIndex: selectedIndex,
      onDestinationSelected: onDestinationSelected,
      extended: extended,
      leading: leading,
      trailing: trailing,
      labelType: extended
          ? NavigationRailLabelType.none
          : NavigationRailLabelType.selected,
      destinations: items
          .map(
            (item) => NavigationRailDestination(
              icon: Icon(
                item.icon,
              ),
              selectedIcon: Icon(
                item.selectedIcon ?? item.icon,
              ),
              label: Text(
                item.label,
              ),
            ),
          )
          .toList(),
    );
  }
}