import 'package:flutter/material.dart';

class AppNavigationItem {
  const AppNavigationItem({
    required this.label,
    required this.icon,
    this.selectedIcon,
    this.disabled = false,
  });

  final String label;
  final IconData icon;
  final IconData? selectedIcon;
  final bool disabled;
}
