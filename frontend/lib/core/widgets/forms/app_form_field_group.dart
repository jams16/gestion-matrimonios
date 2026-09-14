import 'package:flutter/material.dart';

import '../../../app/theme/app_colors.dart';
import '../../../app/theme/app_radius.dart';

class AppFormFieldGroup extends StatelessWidget {
  const AppFormFieldGroup({
    super.key,
    required this.title,
    required this.children,
    this.description,
  });

  final String title;
  final String? description;
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        border: Border.all(
          color: AppColors.border,
        ),
        borderRadius: BorderRadius.circular(
          AppRadius.lg,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: Theme.of(context)
                .textTheme
                .titleMedium
                ?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
          ),

          if (description != null) ...[
            const SizedBox(height: 4),
            Text(
              description!,
              style: Theme.of(context).textTheme.bodySmall,
            ),
          ],

          const SizedBox(height: 20),

          for (int index = 0; index < children.length; index++) ...[
            children[index],
            if (index < children.length - 1)
              const SizedBox(height: 18),
          ],
        ],
      ),
    );
  }
}