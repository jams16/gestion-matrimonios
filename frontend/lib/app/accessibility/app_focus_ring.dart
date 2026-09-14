import 'package:flutter/material.dart';

import '../theme/app_radius.dart';
import 'app_accessibility.dart';

class AppFocusRing extends StatefulWidget {
  const AppFocusRing({
    super.key,
    required this.child,
    this.borderRadius = AppRadius.md,
    this.autofocus = false,
    this.onActivate,
  });

  final Widget child;

  final double borderRadius;
  final bool autofocus;

  final VoidCallback? onActivate;

  @override
  State<AppFocusRing> createState() => _AppFocusRingState();
}

class _AppFocusRingState extends State<AppFocusRing> {
  bool _focused = false;

  @override
  Widget build(BuildContext context) {
    return FocusableActionDetector(
      autofocus: widget.autofocus,
      onShowFocusHighlight: (value) {
        setState(() {
          _focused = value;
        });
      },
      actions: {
        if (widget.onActivate != null)
          ActivateIntent: CallbackAction<ActivateIntent>(
            onInvoke: (_) {
              widget.onActivate?.call();
              return null;
            },
          ),
      },
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 120),
        padding: EdgeInsets.all(_focused ? AppAccessibility.focusRingGap : 0),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(
            widget.borderRadius + AppAccessibility.focusRingGap,
          ),
          border: _focused
              ? Border.all(
                  color: Theme.of(context).colorScheme.primary,
                  width: AppAccessibility.focusBorderWidth,
                )
              : null,
        ),
        child: widget.child,
      ),
    );
  }
}
