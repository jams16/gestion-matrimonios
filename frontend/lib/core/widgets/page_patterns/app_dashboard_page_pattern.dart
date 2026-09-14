import 'package:flutter/material.dart';

class AppDashboardPagePattern extends StatelessWidget {
  const AppDashboardPagePattern({
    super.key,
    required this.title,
    required this.sections,
    this.description,
    this.actions = const [],
  });

  final String title;
  final String? description;

  final List<Widget> sections;
  final List<Widget> actions;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: Column(
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
                    const SizedBox(height: 4),
                    Text(
                      description!,
                      style: Theme.of(context).textTheme.bodyMedium,
                    ),
                  ],
                ],
              ),
            ),

            if (actions.isNotEmpty)
              Wrap(
                spacing: 8,
                runSpacing: 8,
                children: actions,
              ),
          ],
        ),

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