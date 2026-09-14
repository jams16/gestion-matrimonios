import 'package:flutter/material.dart';

import '../../../app/theme/app_radius.dart';

class AppSkeleton extends StatefulWidget {
  const AppSkeleton({
    super.key,
    required this.width,
    required this.height,
    this.radius = AppRadius.md,
  });

  final double width;
  final double height;
  final double radius;

  @override
  State<AppSkeleton> createState() =>
      _AppSkeletonState();
}

class _AppSkeletonState extends State<AppSkeleton>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<double> _animation;

  @override
  void initState() {
    super.initState();

    _controller = AnimationController(
      vsync: this,
      duration: const Duration(
        milliseconds: 1100,
      ),
    )..repeat(
        reverse: true,
      );

    _animation = Tween<double>(
      begin: 0.35,
      end: 0.75,
    ).animate(
      CurvedAnimation(
        parent: _controller,
        curve: Curves.easeInOut,
      ),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final baseColor = Theme.of(context)
        .colorScheme
        .surfaceContainerHighest;

    return FadeTransition(
      opacity: _animation,
      child: Container(
        width: widget.width,
        height: widget.height,
        decoration: BoxDecoration(
          color: baseColor,
          borderRadius: BorderRadius.circular(
            widget.radius,
          ),
        ),
      ),
    );
  }
}