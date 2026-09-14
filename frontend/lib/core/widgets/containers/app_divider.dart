import 'package:flutter/material.dart';

import '../../../app/theme/app_colors.dart';

class AppDivider extends StatelessWidget {
  const AppDivider({
    super.key,
    this.vertical = false,
    this.thickness = 1,
    this.indent = 0,
    this.endIndent = 0,
  });

  final bool vertical;

  final double thickness;
  final double indent;
  final double endIndent;

  @override
  Widget build(BuildContext context) {
    if (vertical) {
      return VerticalDivider(
        width: 1,
        thickness: thickness,
        indent: indent,
        endIndent: endIndent,
        color: AppColors.border,
      );
    }

    return Divider(
      height: 1,
      thickness: thickness,
      indent: indent,
      endIndent: endIndent,
      color: AppColors.border,
    );
  }
}