import 'package:flutter/material.dart';

import '../../../app/theme/app_colors.dart';

class AppList extends StatelessWidget {
  const AppList({
    super.key,
    required this.children,
    this.separated = true,
  });

  final List<Widget> children;
  final bool separated;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        for (int index = 0;
            index < children.length;
            index++) ...[
          children[index],
          if (separated &&
              index < children.length - 1)
            const Divider(
              height: 1,
              color: AppColors.border,
            ),
        ],
      ],
    );
  }
}