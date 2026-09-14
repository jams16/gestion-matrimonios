import 'package:flutter/material.dart';

class AppTooltip extends StatelessWidget {
  const AppTooltip({
    super.key,
    required this.message,
    required this.child,
    this.preferBelow = true,
  });

  final String message;
  final Widget child;
  final bool preferBelow;

  @override
  Widget build(BuildContext context) {
    return Tooltip(
      message: message,
      preferBelow: preferBelow,
      waitDuration: const Duration(
        milliseconds: 400,
      ),
      showDuration: const Duration(
        seconds: 3,
      ),
      child: child,
    );
  }
}