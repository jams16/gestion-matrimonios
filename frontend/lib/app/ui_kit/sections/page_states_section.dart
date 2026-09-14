import 'package:flutter/material.dart';

import '../../../core/widgets/buttons/app_button.dart';
import '../../../core/widgets/page_states/app_page_loading.dart';
import '../../../core/widgets/page_states/app_page_state.dart';

class PageStatesPageOneSection extends StatelessWidget {
  const PageStatesPageOneSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const _PageStatesHeading(),

        const SizedBox(height: 28),

        _PageStateExample(
          title: 'Loading',
          description:
              'Se muestra mientras se obtiene la información necesaria para construir la página.',
          child: ConstrainedBox(
            constraints: BoxConstraints(
              minHeight: 190,
            ),
            child: AppPageLoading(),
          ),
        ),

        const SizedBox(height: 30),

        _PageStateExample(
          title: 'Empty',
          description:
              'Se utiliza cuando la operación fue correcta, pero no existen datos para mostrar.',
          child: ConstrainedBox(
            constraints: const BoxConstraints(
              minHeight: 260,
            ),
            child: AppPageState(
              type: AppPageStateType.empty,
              title: 'No hay actividades',
              message:
                  'Aún no se han registrado actividades en el cronograma.',
              primaryAction: AppButton(
                label: 'Crear actividad',
                icon: Icons.add,
                onPressed: () {},
              ),
            ),
          ),
        ),
      ],
    );
  }
}



class PageStatesPageTwoSection extends StatelessWidget {
  const PageStatesPageTwoSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const _PageStatesHeading(),

        const SizedBox(height: 28),

        _PageStateExample(
          title: 'Error',
          description:
              'Indica que ocurrió un problema al cargar o procesar la información.',
          child: ConstrainedBox(
            constraints: const BoxConstraints(
              minHeight: 260,
            ),
            child: AppPageState(
              type: AppPageStateType.error,
              title: 'No pudimos cargar la información',
              message:
                  'Ocurrió un problema inesperado. Intenta nuevamente.',
              primaryAction: AppButton(
                label: 'Reintentar',
                icon: Icons.refresh,
                onPressed: () {},
              ),
            ),
          ),
        ),

        const SizedBox(height: 30),

        _PageStateExample(
          title: 'Sin permisos',
          description:
              'Se muestra cuando el usuario puede acceder a la aplicación, pero no a este recurso.',
          child: ConstrainedBox(
            constraints: const BoxConstraints(
              minHeight: 260,
            ),
            child: AppPageState(
              type: AppPageStateType.noPermission,
              title: 'No tienes permisos',
              message:
                  'Tu rol actual no tiene acceso a esta información.',
              secondaryAction: AppButton(
                label: 'Volver',
                variant: AppButtonVariant.secondary,
                onPressed: () {},
              ),
            ),
          ),
        ),
      ],
    );
  }
}




class PageStatesPageThreeSection extends StatelessWidget {
  const PageStatesPageThreeSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const _PageStatesHeading(),

        const SizedBox(height: 28),

        _PageStateExample(
          title: 'Sin conexión',
          description:
              'Se utiliza cuando la aplicación no puede comunicarse con el servidor.',
          child: ConstrainedBox(
            constraints: const BoxConstraints(
              minHeight: 260,
            ),
            child: AppPageState(
              type: AppPageStateType.offline,
              title: 'Sin conexión',
              message:
                  'Verifica tu conexión a internet e intenta nuevamente.',
              primaryAction: AppButton(
                label: 'Reintentar',
                icon: Icons.refresh,
                onPressed: () {},
              ),
            ),
          ),
        ),

        const SizedBox(height: 30),

        _PageStateExample(
          title: 'Success',
          description:
              'Confirma la finalización satisfactoria de un proceso de página completa.',
          child: ConstrainedBox(
            constraints: const BoxConstraints(
              minHeight: 260,
            ),
            child: AppPageState(
              type: AppPageStateType.success,
              title: 'Proyecto creado',
              message:
                  'El proyecto de matrimonio fue creado correctamente.',
              primaryAction: AppButton(
                label: 'Ver proyecto',
                onPressed: () {},
              ),
            ),
          ),
        ),
      ],
    );
  }
}




class _PageStatesHeading extends StatelessWidget {
  const _PageStatesHeading();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Estados de página',
          style: Theme.of(context)
              .textTheme
              .headlineSmall
              ?.copyWith(
                fontWeight: FontWeight.w700,
              ),
        ),

        const SizedBox(height: 6),

        Text(
          'Estados utilizados cuando una página todavía no puede mostrar su contenido principal.',
          style: Theme.of(context).textTheme.bodyMedium,
        ),
      ],
    );
  }
}

class _PageStateExample extends StatelessWidget {
  const _PageStateExample({
    required this.title,
    required this.description,
    required this.child,
  });

  final String title;
  final String description;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: const BoxConstraints(
        maxWidth: 620,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: Theme.of(context)
                .textTheme
                .titleSmall
                ?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
          ),

          const SizedBox(height: 4),

          Text(
            description,
            style: Theme.of(context).textTheme.bodySmall,
          ),

          const SizedBox(height: 12),

          DecoratedBox(
            decoration: BoxDecoration(
              border: Border.all(
                color: Theme.of(context)
                    .colorScheme
                    .outlineVariant,
              ),
              borderRadius: BorderRadius.circular(12),
            ),
            child: child,
          ),
        ],
      ),
    );
  }
}