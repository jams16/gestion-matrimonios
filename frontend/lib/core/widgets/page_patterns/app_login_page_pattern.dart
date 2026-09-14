import 'package:flutter/material.dart';

import '../../../app/responsive/app_layout.dart';

class AppLoginPagePattern extends StatelessWidget {
  const AppLoginPagePattern({
    super.key,
    required this.form,
    this.logo,
    this.title = 'Iniciar sesión',
    this.description,
    this.footer,
  });

  final Widget form;
  final Widget? logo;

  final String title;
  final String? description;

  final Widget? footer;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: AppLayout.maxFormWidth),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              if (logo != null) ...[
                Align(alignment: Alignment.center, child: logo),
                const SizedBox(height: 24),
              ],

              Text(
                title,
                textAlign: TextAlign.center,
                style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  fontWeight: FontWeight.w700,
                ),
              ),

              if (description != null) ...[
                const SizedBox(height: 8),
                Text(
                  description!,
                  textAlign: TextAlign.center,
                  style: Theme.of(context).textTheme.bodyMedium,
                ),
              ],

              const SizedBox(height: 32),

              form,

              if (footer != null) ...[const SizedBox(height: 24), footer!],
            ],
          ),
        ),
      ),
    );
  }
}
