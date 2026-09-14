import 'package:flutter/material.dart';

import 'app_colors.dart';

abstract final class AppBorders {
  static const BorderSide normal = BorderSide(
    color: AppColors.border,
    width: 1,
  );

  static const BorderSide focused = BorderSide(
    color: AppColors.primary,
    width: 1.5,
  );

  static const BorderSide error = BorderSide(color: AppColors.error, width: 1);

  static const BorderSide disabled = BorderSide(
    color: AppColors.disabled,
    width: 1,
  );
}
