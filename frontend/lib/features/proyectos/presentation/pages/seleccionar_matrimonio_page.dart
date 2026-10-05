import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../../app/responsive/app_layout.dart';
import '../../../../app/responsive/responsive_layout.dart';
import '../../../../app/theme/app_colors.dart';
import '../../../../app/theme/app_spacing.dart';
import '../../../../core/widgets/buttons/app_button.dart';
import '../../../../core/widgets/page_states/app_page_loading.dart';
import '../../../autenticacion/infrastructure/auth_api.dart';
import '../../../autenticacion/infrastructure/auth_session.dart';
import '../../application/providers/matrimonios_provider.dart';
import '../../domain/entities/matrimonio_resumen.dart';
import '../widgets/matrimonio_card.dart';

class SeleccionarMatrimonioPage extends ConsumerWidget {
  const SeleccionarMatrimonioPage({super.key, this.desdeHome = false});

  final bool desdeHome;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final matrimonios = ref.watch(matrimoniosResumenProvider);

    return Scaffold(
      backgroundColor: const Color(0xFFFDFBFF),
      body: SafeArea(
        child: ResponsiveLayout(
          mobile: _Layout(
            horizontalPadding: AppLayout.mobilePagePadding,
            maxWidth: AppLayout.maxFormWidth,
            matrimonios: matrimonios,
            desdeHome: desdeHome,
          ),
          tablet: _Layout(
            horizontalPadding: AppLayout.tabletPagePadding,
            maxWidth: AppLayout.maxMediumWidth,
            matrimonios: matrimonios,
            desdeHome: desdeHome,
          ),
          desktop: _Layout(
            horizontalPadding: AppLayout.desktopPagePadding,
            maxWidth: AppLayout.maxMediumWidth,
            matrimonios: matrimonios,
            desdeHome: desdeHome,
          ),
        ),
      ),
    );
  }
}

class _Layout extends StatelessWidget {
  const _Layout({
    required this.horizontalPadding,
    required this.maxWidth,
    required this.matrimonios,
    required this.desdeHome,
  });

  final double horizontalPadding;
  final double maxWidth;
  final AsyncValue<List<MatrimonioResumen>> matrimonios;
  final bool desdeHome;

  @override
  Widget build(BuildContext context) => Center(
    child: ConstrainedBox(
      constraints: BoxConstraints(maxWidth: maxWidth),
      child: Padding(
        padding: EdgeInsets.fromLTRB(
          horizontalPadding,
          AppSpacing.lg,
          horizontalPadding,
          AppSpacing.lg,
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Align(
              alignment: Alignment.centerLeft,
              child: TextButton.icon(
                onPressed: () async {
                  if (desdeHome) {
                    context.go('/home');
                    return;
                  }
                  final token = await AuthSession.obtenerRefreshToken();
                  try {
                    if (token != null) await AuthApi().cerrarSesion(token);
                  } finally {
                    await AuthSession.limpiar();
                    if (context.mounted) context.go('/bienvenida');
                  }
                },
                icon: const Icon(Icons.arrow_back),
                label: Text(desdeHome ? 'Volver' : 'Cerrar sesión'),
              ),
            ),
            const SizedBox(height: AppSpacing.xl),
            Text(
              'Selecciona un matrimonio',
              textAlign: TextAlign.left,
              style: Theme.of(
                context,
              ).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.w800),
            ),
            const SizedBox(height: AppSpacing.xs),
            Text(
              'Elige un matrimonio para continuar',
              textAlign: TextAlign.left,
              style: Theme.of(
                context,
              ).textTheme.bodyLarge?.copyWith(color: AppColors.textSecondary),
            ),
            const SizedBox(height: AppSpacing.xl),
            Expanded(
              child: matrimonios.when(
                loading: () =>
                    const AppPageLoading(message: 'Cargando matrimonios...'),
                error: (error, stackTrace) => const _ErrorState(),
                data: (items) => items.isEmpty
                    ? const SingleChildScrollView(child: MatrimoniosEmptyCard())
                    : ListView.separated(
                        itemCount: items.length,
                        separatorBuilder: (context, index) =>
                            const SizedBox(height: AppSpacing.md),
                        itemBuilder: (context, index) => MatrimonioCard(
                          matrimonio: items[index],
                          onTap: () {
                            final esBorrador =
                                items[index].estadoProyecto
                                    .trim()
                                    .toUpperCase() ==
                                'BORRADOR';
                            if (esBorrador) {
                              context.go('/matrimonio', extra: items[index].idProyecto);
                            } else {
                              context.go('/home');
                            }
                          },
                        ),
                      ),
              ),
            ),
            const SizedBox(height: AppSpacing.lg),
            AppButton(
              label: 'Agregar matrimonio',
              icon: Icons.add,
              expanded: true,
              size: AppButtonSize.large,
              onPressed: () => context.go('/matrimonio'),
            ),
          ],
        ),
      ),
    ),
  );
}

class _ErrorState extends ConsumerWidget {
  const _ErrorState();

  @override
  Widget build(BuildContext context, WidgetRef ref) => Center(
    child: Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        const Icon(Icons.error_outline, size: 42, color: AppColors.error),
        const SizedBox(height: AppSpacing.md),
        Text(
          'No pudimos cargar tus matrimonios',
          textAlign: TextAlign.center,
          style: Theme.of(
            context,
          ).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w700),
        ),
        const SizedBox(height: AppSpacing.xs),
        const Text(
          'Revisa la conexion con el servidor e intentalo nuevamente.',
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: AppSpacing.lg),
        AppButton(
          label: 'Reintentar',
          icon: Icons.refresh,
          onPressed: () => ref.invalidate(matrimoniosResumenProvider),
        ),
      ],
    ),
  );
}
