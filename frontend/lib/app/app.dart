import 'package:flutter/material.dart';

import 'router/app_router.dart';
import 'theme/app_theme.dart';
import '../features/autenticacion/infrastructure/auth_session.dart';

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      debugShowCheckedModeBanner: false,
      title: 'Gestión de Matrimonios',
      theme: AppTheme.light,
      routerConfig: appRouter,
      builder: (context, child) => Listener(
        behavior: HitTestBehavior.translucent,
        onPointerDown: (_) {
          AuthSession.registrarActividad();
        },
        onPointerSignal: (_) {
          AuthSession.registrarActividad();
        },
        child: child ?? const SizedBox.shrink(),
      ),
    );
  }
}
