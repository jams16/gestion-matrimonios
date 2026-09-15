import 'package:flutter/material.dart';

class AppTopBar extends StatelessWidget implements PreferredSizeWidget {
  const AppTopBar({
    super.key,
    required this.title,
    this.subtitle,
    this.leading,
    this.actions = const [],
    this.centerTitle = false,
    this.backgroundColor,
    this.foregroundColor,
    this.horizontalPadding = 32,
  });

  final String title;
  final String? subtitle;

  final Widget? leading;
  final List<Widget> actions;

  final bool centerTitle;
  final Color? backgroundColor;
  final Color? foregroundColor;
  final double horizontalPadding;

  @override
  Size get preferredSize => Size.fromHeight(subtitle == null ? 64 : 76);

  @override
  Widget build(BuildContext context) {
    return AppBar(
      toolbarHeight: preferredSize.height,
      centerTitle: centerTitle,
      leading: leading,
      backgroundColor: backgroundColor,
      foregroundColor: foregroundColor,
      titleSpacing: horizontalPadding,
      title: Column(
        crossAxisAlignment: centerTitle
            ? CrossAxisAlignment.center
            : CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: Theme.of(context).textTheme.titleLarge?.copyWith(
              fontWeight: FontWeight.w600,
              color: foregroundColor,
            ),
          ),
          if (subtitle != null) ...[
            const SizedBox(height: 2),
            Text(
              subtitle!,
              style: Theme.of(
                context,
              ).textTheme.bodySmall?.copyWith(color: foregroundColor),
            ),
          ],
        ],
      ),
      actions: [
        Padding(
          padding: EdgeInsets.only(right: horizontalPadding - 8),
          child: Row(mainAxisSize: MainAxisSize.min, children: actions),
        ),
      ],
    );
  }
}
