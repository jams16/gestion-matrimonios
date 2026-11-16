import 'dart:async';

import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../../../app/router/route_names.dart';
import '../../../../app/theme/app_colors.dart';

/// Bienvenida breve posterior a un registro y autenticacion exitosos.
/// La cuenta ya esta creada al entrar a esta pantalla; aqui solo se ofrece
/// continuidad visual antes de mostrar los matrimonios de la Wedding Planner.
class RegistroExitosoPage extends StatefulWidget {
  const RegistroExitosoPage({super.key, this.nombre});

  final String? nombre;

  @override
  State<RegistroExitosoPage> createState() => _RegistroExitosoPageState();
}

class _RegistroExitosoPageState extends State<RegistroExitosoPage>
    with SingleTickerProviderStateMixin {
  late final AnimationController _progreso;
  Timer? _temporizador;

  @override
  void initState() {
    super.initState();
    _progreso = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 5),
    )..forward();
    _temporizador = Timer(const Duration(seconds: 5), _continuar);
  }

  void _continuar() {
    if (mounted) context.go(RouteNames.matrimonios);
  }

  @override
  void dispose() {
    _temporizador?.cancel();
    _progreso.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final nombres = widget.nombre?.trim().split(RegExp(r'\s+')) ?? const [];
    final primerNombre = nombres.isEmpty ? null : nombres.first;
    final saludo = primerNombre == null || primerNombre.isEmpty
        ? 'Bienvenida a WeddingApp'
        : 'Bienvenida, $primerNombre';

    return Scaffold(
      backgroundColor: const Color(0xFFFDFBFF),
      body: SafeArea(
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 460),
            child: Padding(
              padding: const EdgeInsets.all(32),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    'Cuenta creada',
                    textAlign: TextAlign.center,
                    style: theme.textTheme.headlineSmall?.copyWith(
                      fontWeight: FontWeight.w800,
                    ),
                  ),
                  const SizedBox(height: 28),
                  Image.asset(
                    'assets/images/logoWP.webp',
                    height: 112,
                    fit: BoxFit.contain,
                  ),
                  const SizedBox(height: 28),
                  Text(
                    saludo,
                    textAlign: TextAlign.center,
                    style: theme.textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    'Tu cuenta de Wedding Planner esta lista. Prepararemos tu espacio para que puedas crear y organizar tus matrimonios.',
                    textAlign: TextAlign.center,
                    style: theme.textTheme.bodyLarge,
                  ),
                  const SizedBox(height: 32),
                  AnimatedBuilder(
                    animation: _progreso,
                    builder: (context, _) => Column(
                      children: [
                        LinearProgressIndicator(
                          value: _progreso.value,
                          minHeight: 8,
                          borderRadius: BorderRadius.circular(8),
                          color: AppColors.primary,
                          backgroundColor: const Color(0xFFE9E2F7),
                        ),
                        const SizedBox(height: 10),
                        Text(
                          '${(_progreso.value * 100).round()}% listo',
                          style: theme.textTheme.labelLarge?.copyWith(
                            color: AppColors.textSecondary,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
