import 'package:flutter/material.dart';

class AppBreadcrumbItem {
  const AppBreadcrumbItem({
    required this.label,
    this.onTap,
  });

  final String label;
  final VoidCallback? onTap;
}

class AppBreadcrumbs extends StatelessWidget {
  const AppBreadcrumbs({
    super.key,
    required this.items,
  });

  final List<AppBreadcrumbItem> items;

  @override
  Widget build(BuildContext context) {
    return Wrap(
      crossAxisAlignment: WrapCrossAlignment.center,
      spacing: 4,
      runSpacing: 4,
      children: [
        for (int index = 0; index < items.length; index++) ...[
          if (index > 0)
            Icon(
              Icons.chevron_right,
              size: 18,
              color: Theme.of(context)
                  .colorScheme
                  .onSurfaceVariant,
            ),

          _BreadcrumbItemWidget(
            item: items[index],
            current: index == items.length - 1,
          ),
        ],
      ],
    );
  }
}

class _BreadcrumbItemWidget extends StatelessWidget {
  const _BreadcrumbItemWidget({
    required this.item,
    required this.current,
  });

  final AppBreadcrumbItem item;
  final bool current;

  @override
  Widget build(BuildContext context) {
    if (current || item.onTap == null) {
      return Text(
        item.label,
        style: Theme.of(context).textTheme.bodySmall?.copyWith(
              fontWeight: current
                  ? FontWeight.w600
                  : FontWeight.w400,
              color: current
                  ? Theme.of(context).colorScheme.onSurface
                  : Theme.of(context)
                      .colorScheme
                      .onSurfaceVariant,
            ),
      );
    }

    return InkWell(
      borderRadius: BorderRadius.circular(4),
      onTap: item.onTap,
      child: Padding(
        padding: const EdgeInsets.symmetric(
          horizontal: 2,
          vertical: 4,
        ),
        child: Text(
          item.label,
          style: Theme.of(context).textTheme.bodySmall?.copyWith(
                color: Theme.of(context).colorScheme.primary,
              ),
        ),
      ),
    );
  }
}