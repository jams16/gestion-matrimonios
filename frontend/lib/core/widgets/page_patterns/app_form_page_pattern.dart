import 'package:flutter/material.dart';

class AppFormPagePattern extends StatelessWidget {
  const AppFormPagePattern({
    super.key,
    required this.title,
    required this.form,
    this.description,
    this.breadcrumbs,
  });

  final String title;
  final String? description;

  final Widget form;
  final Widget? breadcrumbs;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (breadcrumbs != null) ...[breadcrumbs!, const SizedBox(height: 16)],

        Text(
          title,
          style: Theme.of(
            context,
          ).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.w700),
        ),

        if (description != null) ...[
          const SizedBox(height: 6),
          Text(description!, style: Theme.of(context).textTheme.bodyMedium),
        ],

        const SizedBox(height: 28),

        form,
      ],
    );
  }
}
