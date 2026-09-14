import 'package:flutter/material.dart';

class AppListItem extends StatelessWidget {
  const AppListItem({
    super.key,
    required this.title,
    this.subtitle,
    this.leading,
    this.trailing,
    this.onTap,
  });

  final String title;
  final String? subtitle;

  final Widget? leading;
  final Widget? trailing;

  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return ListTile(
      contentPadding: const EdgeInsets.symmetric(
        horizontal: 16,
        vertical: 4,
      ),
      leading: leading,
      trailing: trailing,
      title: Text(
        title,
        style: Theme.of(context)
            .textTheme
            .bodyLarge
            ?.copyWith(
              fontWeight: FontWeight.w500,
            ),
      ),
      subtitle: subtitle == null
          ? null
          : Text(
              subtitle!,
            ),
      onTap: onTap,
    );
  }
}