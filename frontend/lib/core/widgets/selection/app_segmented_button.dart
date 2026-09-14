import 'package:flutter/material.dart';

class AppSegment<T> {
  const AppSegment({required this.value, required this.label, this.icon});

  final T value;
  final String label;
  final IconData? icon;
}

class AppSegmentedButton<T> extends StatelessWidget {
  const AppSegmentedButton({
    super.key,
    required this.label,
    required this.segments,
    required this.selected,
    required this.onChanged,
  });

  final String label;

  final List<AppSegment<T>> segments;

  final Set<T> selected;

  final ValueChanged<Set<T>>? onChanged;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: Theme.of(
            context,
          ).textTheme.labelMedium?.copyWith(fontWeight: FontWeight.w500),
        ),

        const SizedBox(height: 10),

        SegmentedButton<T>(
          segments: segments
              .map(
                (segment) => ButtonSegment<T>(
                  value: segment.value,
                  label: Text(segment.label),
                  icon: segment.icon == null ? null : Icon(segment.icon),
                ),
              )
              .toList(),
          selected: selected,
          onSelectionChanged: onChanged,
        ),
      ],
    );
  }
}
