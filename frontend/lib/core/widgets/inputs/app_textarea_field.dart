import 'package:flutter/material.dart';

import 'app_text_field.dart';

class AppTextareaField extends StatelessWidget {
  const AppTextareaField({
    super.key,
    required this.label,
    this.controller,
    this.hintText,
    this.helperText,
    this.errorText,
    this.maxLines = 4,
    this.onChanged,
    this.validator,
  });

  final String label;

  final TextEditingController? controller;

  final String? hintText;
  final String? helperText;
  final String? errorText;

  final int maxLines;

  final ValueChanged<String>? onChanged;
  final FormFieldValidator<String>? validator;

  @override
  Widget build(BuildContext context) {
    return AppTextField(
      label: label,
      controller: controller,
      hintText: hintText,
      helperText: helperText,
      errorText: errorText,
      maxLines: maxLines,
      keyboardType: TextInputType.multiline,
      onChanged: onChanged,
      validator: validator,
    );
  }
}
