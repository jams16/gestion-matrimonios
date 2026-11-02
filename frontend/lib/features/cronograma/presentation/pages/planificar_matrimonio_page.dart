import 'dart:async';

import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../../../app/router/route_names.dart';
import '../../../../app/theme/app_colors.dart';
import '../../../autenticacion/infrastructure/auth_session.dart';

/// Pausa visual posterior al onboarding. El cronograma ya fue generado por el
/// endpoint de onboarding antes de llegar aquí; esta pantalla no replica esa
/// operación ni crea registros adicionales.
class PlanificarMatrimonioPage extends StatefulWidget {
  const PlanificarMatrimonioPage({super.key, required this.idProyecto});

  final String idProyecto;

  @override
  State<PlanificarMatrimonioPage> createState() =>
      _PlanificarMatrimonioPageState();
}

class _PlanificarMatrimonioPageState extends State<PlanificarMatrimonioPage>
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
    AuthSession.seleccionarProyecto(
      idProyecto: widget.idProyecto,
      planificacionConfirmada: false,
    );
    _temporizador = Timer(const Duration(seconds: 5), _continuar);
  }

  void _continuar() {
    if (mounted) context.go(RouteNames.plan);
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
                    'Planificar matrimonio',
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
                    'Organizamos cada momento',
                    style: theme.textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    'Estamos preparando hitos, actividades, dependencias y el timing de la boda.',
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
                  const SizedBox(height: 18),
                  TextButton(
                    onPressed: _continuar,
                    child: const Text('Continuar'),
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
