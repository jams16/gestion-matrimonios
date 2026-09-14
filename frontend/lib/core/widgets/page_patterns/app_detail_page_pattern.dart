import 'package:flutter/material.dart';

class AppDetailPagePattern extends StatelessWidget {
  const AppDetailPagePattern({
    super.key,
    required this.title,
    required this.content,
    this.description,
    this.breadcrumbs,
    this.status,
    this.actions = const [],
  });

  final String title;
  final String? description;

  final Widget content;

  final Widget? breadcrumbs;
  final Widget? status;

  final List<Widget> actions;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (breadcrumbs != null) ...[
          breadcrumbs!,
          const SizedBox(height: 16),
        ],

        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Wrap(
                    spacing: 12,
                    runSpacing: 8,
                    crossAxisAlignment: WrapCrossAlignment.center,
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

                      if (status != null)
                        status!,
                    ],
                  ),

                  if (description != null) ...[
                    const SizedBox(height: 6),
                    Text(
                      description!,
                      style: Theme.of(context).textTheme.bodyMedium,
                    ),
                  ],
                ],
              ),
            ),

            if (actions.isNotEmpty) ...[
              const SizedBox(width: 16),

              Wrap(
                spacing: 8,
                runSpacing: 8,
                children: actions,
              ),
            ],
          ],
        ),

        const SizedBox(height: 28),

        content,
      ],
    );
  }
}