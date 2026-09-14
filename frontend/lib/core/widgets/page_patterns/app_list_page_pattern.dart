import 'package:flutter/material.dart';

class AppListPagePattern extends StatelessWidget {
  const AppListPagePattern({
    super.key,
    required this.title,
    required this.content,
    this.description,
    this.primaryAction,
    this.filters,
    this.search,
    this.pagination,
  });

  final String title;
  final String? description;

  final Widget content;

  final Widget? primaryAction;
  final Widget? filters;
  final Widget? search;
  final Widget? pagination;

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
                    style: Theme.of(context).textTheme.headlineSmall?.copyWith(
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

            if (primaryAction != null) ...[
              const SizedBox(width: 16),
              primaryAction!,
            ],
          ],
        ),

        if (search != null || filters != null) ...[
          const SizedBox(height: 24),

          Wrap(
            spacing: 12,
            runSpacing: 12,
            crossAxisAlignment: WrapCrossAlignment.center,
            children: [
              if (search != null) SizedBox(width: 320, child: search),
              if (filters != null) filters!,
            ],
          ),
        ],

        const SizedBox(height: 24),

        content,

        if (pagination != null) ...[
          const SizedBox(height: 24),
          Align(alignment: Alignment.centerRight, child: pagination),
        ],
      ],
    );
  }
}
