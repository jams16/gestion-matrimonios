import 'package:flutter/material.dart';

import '../../../core/widgets/feedback/app_alert.dart';
import '../../../core/widgets/feedback/app_banner.dart';
import '../../../core/widgets/feedback/app_loading_indicator.dart';
import '../../../core/widgets/feedback/app_message.dart';
import '../../../core/widgets/feedback/app_progress_bar.dart';
import '../../../core/widgets/feedback/app_snackbar.dart';
import '../../../core/widgets/feedback/app_tooltip.dart';

class FeedbackPageOneSection extends StatelessWidget {
  const FeedbackPageOneSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const _FeedbackHeading(),

        const SizedBox(height: 28),

        _FeedbackExample(
          title: 'Snackbar',
          description:
              'Feedback temporal para confirmar una acción o informar un resultado.',
          child: Wrap(
            spacing: 12,
            runSpacing: 12,
            children: [
              FilledButton(
                onPressed: () {
                  AppSnackbar.show(
                    context,
                    message: 'Cambios guardados correctamente.',
                    type: AppSnackbarType.success,
                  );
                },
                child: const Text('Mostrar snackbar'),
              ),
            ],
          ),
        ),

        const SizedBox(height: 30),

        const _FeedbackExample(
          title: 'Alert',
          description:
              'Mensaje relevante que permanece visible dentro del contenido.',
          child: AppAlert(
            title: 'Revisa la información',
            message: 'Existen campos pendientes antes de completar el proceso.',
            type: AppAlertType.warning,
          ),
        ),

        const SizedBox(height: 30),

        const _FeedbackExample(
          title: 'Banner',
          description:
              'Aviso persistente asociado al estado general de una pantalla.',
          maxWidth: double.infinity,
          child: AppBanner(
            message: 'Hay cambios sin guardar en este proyecto.',
            type: AppBannerType.info,
            actionLabel: 'Guardar',
          ),
        ),

        const SizedBox(height: 30),

        const _FeedbackExample(
          title: 'Tooltip',
          description:
              'Explica acciones representadas mediante iconos o elementos poco evidentes.',
          child: AppTooltip(
            message: 'Editar proyecto',
            child: IconButton(onPressed: null, icon: Icon(Icons.edit_outlined)),
          ),
        ),
      ],
    );
  }
}

class FeedbackPageTwoSection extends StatelessWidget {
  const FeedbackPageTwoSection({super.key});

  @override
  Widget build(BuildContext context) {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _FeedbackHeading(),

        SizedBox(height: 28),

        _FeedbackExample(
          title: 'Error message',
          description:
              'Comunica errores específicos que requieren una acción del usuario.',
          child: AppMessage(
            message:
                'No fue posible guardar los cambios. Inténtalo nuevamente.',
            type: AppMessageType.error,
          ),
        ),

        SizedBox(height: 30),

        _FeedbackExample(
          title: 'Success message',
          description: 'Confirma que una operación se completó correctamente.',
          child: AppMessage(
            message: 'El proyecto fue creado correctamente.',
            type: AppMessageType.success,
          ),
        ),

        SizedBox(height: 30),

        _FeedbackExample(
          title: 'Loading indicator',
          description: 'Indica una operación de duración indeterminada.',
          child: AppLoadingIndicator(label: 'Cargando información...'),
        ),

        SizedBox(height: 30),

        _FeedbackExample(
          title: 'Progress bar',
          description:
              'Representa el avance de una operación cuyo progreso puede medirse.',
          child: AppProgressBar(label: 'Carga de archivos', value: 0.68),
        ),
      ],
    );
  }
}

class _FeedbackHeading extends StatelessWidget {
  const _FeedbackHeading();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Feedback',
          style: Theme.of(
            context,
          ).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.w700),
        ),
        const SizedBox(height: 6),
        Text(
          'Componentes utilizados para comunicar estados, resultados y progreso.',
          style: Theme.of(context).textTheme.bodyMedium,
        ),
      ],
    );
  }
}

class _FeedbackExample extends StatelessWidget {
  const _FeedbackExample({
    required this.title,
    required this.description,
    required this.child,
    this.maxWidth = 480,
  });

  final String title;
  final String description;
  final Widget child;
  final double maxWidth;

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: BoxConstraints(maxWidth: maxWidth),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: Theme.of(
              context,
            ).textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w600),
          ),

          const SizedBox(height: 4),

          Text(description, style: Theme.of(context).textTheme.bodySmall),

          const SizedBox(height: 12),

          child,
        ],
      ),
    );
  }
}
