import 'package:flutter/material.dart';

class A4Sheet extends StatelessWidget {
  const A4Sheet({super.key, required this.child});

  final Widget child;

  static const double width = 794;
  static const double height = 1123;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: width,
      height: height,
      child: Material(
        color: Colors.white,
        child: Padding(
          padding: const EdgeInsets.fromLTRB(48, 40, 48, 40),
          child: child,
        ),
      ),
    );
  }
}
