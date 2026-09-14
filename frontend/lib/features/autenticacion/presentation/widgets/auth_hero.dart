import 'package:flutter/material.dart';

class AuthHero extends StatelessWidget {
  const AuthHero({super.key, this.large = false});
  final bool large;
  @override
  Widget build(BuildContext context) {
    final width = large ? 260.0 : 150.0;
    return ClipRRect(
      borderRadius: BorderRadius.circular(28),
      child: Image.asset('assets/images/logoWP.webp',
        width: width, height: large ? 180 : 100, fit: BoxFit.contain,
        errorBuilder: (_, _, _) => Container(
          width: width, height: large ? 180 : 100,
          color: Theme.of(context).colorScheme.primaryContainer,
          alignment: Alignment.center,
          child: Icon(Icons.favorite_outline, size: large ? 84 : 52,
            color: Theme.of(context).colorScheme.primary),
        )),
    );
  }
}
