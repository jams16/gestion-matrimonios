import 'package:flutter/material.dart';

class AppTabItem {
  const AppTabItem({
    required this.label,
    this.icon,
  });

  final String label;
  final IconData? icon;
}

class AppTabs extends StatelessWidget {
  const AppTabs({
    super.key,
    required this.tabs,
    this.isScrollable = false,
  });

  final List<AppTabItem> tabs;

  final bool isScrollable;

  @override
  Widget build(BuildContext context) {
    return TabBar(
      isScrollable: isScrollable,
      tabAlignment: isScrollable
          ? TabAlignment.start
          : TabAlignment.fill,
      tabs: tabs
          .map(
            (tab) => Tab(
              text: tab.label,
              icon: tab.icon == null
                  ? null
                  : Icon(
                      tab.icon,
                    ),
            ),
          )
          .toList(),
    );
  }
}