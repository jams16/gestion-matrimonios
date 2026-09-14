import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/widgets/buttons/app_button.dart';
import '../widgets/auth_hero.dart';

class BienvenidaPage extends StatelessWidget {
  const BienvenidaPage({super.key});
  @override
  Widget build(BuildContext context) => Scaffold(
    body: SafeArea(
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 500),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 32),
            child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
          Text('WeddingApp', style: Theme.of(context).textTheme.headlineMedium?.copyWith(fontWeight: FontWeight.w800)),
          const SizedBox(height: 36), const AuthHero(large: true),
          const SizedBox(height: 28),
          Text('Una boda memorable empieza con una planificación que inspira.', textAlign: TextAlign.center, style: Theme.of(context).textTheme.titleLarge),
          const SizedBox(height: 10),
          const Text('Convierte cada detalle en un proyecto claro, tranquilo y hermoso.', textAlign: TextAlign.center),
          const SizedBox(height: 38),
          AppButton(label: 'Iniciar sesión', expanded: true, size: AppButtonSize.large, onPressed: () => context.go('/iniciar-sesion')),
          const SizedBox(height: 12),
          AppButton(label: 'Crear una nueva cuenta', expanded: true, variant: AppButtonVariant.secondary, onPressed: () => context.go('/registrarse')),
            ]),
          ),
        ),
      ),
    ),
  );
}
