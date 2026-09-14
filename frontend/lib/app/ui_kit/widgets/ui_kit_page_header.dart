import 'package:flutter/material.dart';

class UiKitPageHeader extends StatelessWidget {
  const UiKitPageHeader({
    super.key,
    this.subtitle =
        'Sistema visual y componentes reutilizables de la aplicación.',
  });

  final String subtitle;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Diseño UI/UX Kit',
          style: Theme.of(
            context,
          ).textTheme.headlineMedium?.copyWith(fontWeight: FontWeight.w700),
        ),
        const SizedBox(height: 6),
        Text(subtitle, style: Theme.of(context).textTheme.bodyMedium),
        const SizedBox(height: 18),
        const Divider(),
      ],
    );
  }
}
