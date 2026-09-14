import 'package:flutter/material.dart';

enum AppAvatarSize {
  small,
  medium,
  large,
}

class AppAvatar extends StatelessWidget {
  const AppAvatar({
    super.key,
    this.imageUrl,
    this.name,
    this.icon,
    this.size = AppAvatarSize.medium,
  });

  final String? imageUrl;
  final String? name;
  final IconData? icon;

  final AppAvatarSize size;

  double get _diameter {
    switch (size) {
      case AppAvatarSize.small:
        return 32;

      case AppAvatarSize.medium:
        return 40;

      case AppAvatarSize.large:
        return 56;
    }
  }

  double get _fontSize {
    switch (size) {
      case AppAvatarSize.small:
        return 12;

      case AppAvatarSize.medium:
        return 14;

      case AppAvatarSize.large:
        return 18;
    }
  }

  String? get _initials {
    final value = name?.trim();

    if (value == null || value.isEmpty) {
      return null;
    }

    final parts = value
        .split(RegExp(r'\s+'))
        .where((part) => part.isNotEmpty)
        .toList();

    if (parts.length == 1) {
      return parts.first
          .substring(0, 1)
          .toUpperCase();
    }

    return '${parts.first[0]}${parts.last[0]}'
        .toUpperCase();
  }

  @override
  Widget build(BuildContext context) {
    return CircleAvatar(
      radius: _diameter / 2,
      backgroundImage:
          imageUrl == null ? null : NetworkImage(imageUrl!),
      child: imageUrl != null
          ? null
          : _initials != null
              ? Text(
                  _initials!,
                  style: TextStyle(
                    fontSize: _fontSize,
                    fontWeight: FontWeight.w600,
                  ),
                )
              : Icon(
                  icon ?? Icons.person_outline,
                  size: _diameter * 0.5,
                ),
    );
  }
}