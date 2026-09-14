import 'package:flutter/material.dart';

class AppSettingsPagePattern extends StatelessWidget {
  const AppSettingsPagePattern({
    super.key,
    required this.title,
    required this.sections,
    this.description,
  });

  final String title;
  final String? description;

  final List<Widget> sections;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: Theme.of(context)
              .textTheme
              .headlineSmall
              ?.copyWith(
                fontWeight: FontWeight.w700,
              ),
        ),

        if (description != null) ...[
          const SizedBox(height: 6),
          Text(
            description!,
            style: Theme.of(context).textTheme.bodyMedium,
          ),
        ],

        const SizedBox(height: 28),

        for (int index = 0;
            index < sections.length;
            index++) ...[
          sections[index],

          if (index < sections.length - 1)
            const SizedBox(height: 24),
        ],
      ],
    );
  }
}