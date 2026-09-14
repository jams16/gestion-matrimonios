import 'package:flutter/material.dart';

class AppPagination extends StatelessWidget {
  const AppPagination({
    super.key,
    required this.currentPage,
    required this.totalPages,
    required this.onPageChanged,
    this.maxVisiblePages = 5,
  });

  final int currentPage;
  final int totalPages;

  final ValueChanged<int> onPageChanged;

  final int maxVisiblePages;

  List<int> _visiblePages() {
    if (totalPages <= maxVisiblePages) {
      return List.generate(totalPages, (index) => index + 1);
    }

    var start = currentPage - (maxVisiblePages ~/ 2);

    var end = start + maxVisiblePages - 1;

    if (start < 1) {
      start = 1;
      end = maxVisiblePages;
    }

    if (end > totalPages) {
      end = totalPages;
      start = totalPages - maxVisiblePages + 1;
    }

    return List.generate(end - start + 1, (index) => start + index);
  }

  @override
  Widget build(BuildContext context) {
    if (totalPages <= 1) {
      return const SizedBox.shrink();
    }

    final pages = _visiblePages();

    return Wrap(
      spacing: 6,
      runSpacing: 6,
      crossAxisAlignment: WrapCrossAlignment.center,
      children: [
        IconButton.outlined(
          tooltip: 'Página anterior',
          onPressed: currentPage > 1
              ? () {
                  onPageChanged(currentPage - 1);
                }
              : null,
          icon: const Icon(Icons.chevron_left),
        ),

        for (final page in pages)
          _PageButton(
            page: page,
            selected: page == currentPage,
            onPressed: () {
              onPageChanged(page);
            },
          ),

        IconButton.outlined(
          tooltip: 'Página siguiente',
          onPressed: currentPage < totalPages
              ? () {
                  onPageChanged(currentPage + 1);
                }
              : null,
          icon: const Icon(Icons.chevron_right),
        ),
      ],
    );
  }
}

class _PageButton extends StatelessWidget {
  const _PageButton({
    required this.page,
    required this.selected,
    required this.onPressed,
  });

  final int page;
  final bool selected;
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    if (selected) {
      return IconButton.filled(
        tooltip: 'Página $page',
        onPressed: onPressed,
        icon: Text('$page'),
      );
    }

    return IconButton.outlined(
      tooltip: 'Página $page',
      onPressed: onPressed,
      icon: Text('$page'),
    );
  }
}
