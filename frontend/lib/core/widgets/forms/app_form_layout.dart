import 'package:flutter/material.dart';

import '../../../app/responsive/app_layout.dart';

class AppFormLayout extends StatelessWidget {
  const AppFormLayout({
    super.key,
    required this.children,
    this.maxWidth = AppLayout.maxFormWidth,
    this.spacing = 20,
  });

  final List<Widget> children;
  final double maxWidth;
  final double spacing;

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: BoxConstraints(maxWidth: maxWidth),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          for (int index = 0; index < children.length; index++) ...[
            children[index],
            if (index < children.length - 1) SizedBox(height: spacing),
          ],
        ],
      ),
    );
  }
}
