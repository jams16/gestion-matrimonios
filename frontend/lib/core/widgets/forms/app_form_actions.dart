import 'package:flutter/material.dart';

class AppFormActions extends StatelessWidget {
  const AppFormActions({
    super.key,
    required this.primaryAction,
    this.secondaryAction,
    this.alignEnd = true,
  });

  final Widget primaryAction;
  final Widget? secondaryAction;

  final bool alignEnd;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: alignEnd
          ? MainAxisAlignment.end
          : MainAxisAlignment.start,
      children: [
        if (secondaryAction != null) ...[
          secondaryAction!,
          const SizedBox(width: 12),
        ],
        primaryAction,
      ],
    );
  }
}
