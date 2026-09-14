import 'package:flutter/material.dart';

import '../../../core/widgets/containers/app_accordion.dart';
import '../../../core/widgets/containers/app_card.dart';
import '../../../core/widgets/containers/app_divider.dart';
import '../../../core/widgets/containers/app_panel.dart';
import '../../../core/widgets/containers/app_section.dart';

class ContainersPageOneSection extends StatelessWidget {
  const ContainersPageOneSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const _ContainersHeading(),

        const SizedBox(height: 28),

        const _ContainerExample(
          title: 'Card',
          description:
              'Agrupa información relacionada dentro de una unidad visual compacta.',
          child: AppCard(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Matrimonio José y Carlos',
                  style: TextStyle(fontWeight: FontWeight.w600),
                ),
                SizedBox(height: 6),
                Text('15 de noviembre de 2026 · Lima'),
              ],
            ),
          ),
        ),

        const SizedBox(height: 32),

        const _ContainerExample(
          title: 'Panel',
          description:
              'Contenedor estructural para bloques importantes dentro de una pantalla.',
          maxWidth: double.infinity,
          child: AppPanel(
            title: 'Información general',
            description: 'Datos principales del proyecto de matrimonio.',
            child: Text(
              'Aquí se mostrarán los campos y contenido asociados a esta sección.',
            ),
          ),
        ),

        const SizedBox(height: 32),

        const _ContainerExample(
          title: 'Section',
          description:
              'Organiza contenido bajo un título sin añadir necesariamente borde o fondo.',
          maxWidth: double.infinity,
          child: AppSection(
            title: 'Presupuesto',
            description: 'Resumen financiero del proyecto.',
            child: Text(
              'Contenido correspondiente a la sección de presupuesto.',
            ),
          ),
        ),
      ],
    );
  }
}

class ContainersPageTwoSection extends StatelessWidget {
  const ContainersPageTwoSection({super.key});

  @override
  Widget build(BuildContext context) {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _ContainersHeading(),

        SizedBox(height: 28),

        _ContainerExample(
          title: 'Divider',
          description:
              'Separación visual entre grupos de contenido relacionados.',
          maxWidth: double.infinity,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Información del proveedor'),

              SizedBox(height: 16),

              AppDivider(),

              SizedBox(height: 16),

              Text('Información del contrato'),
            ],
          ),
        ),

        SizedBox(height: 36),

        _ContainerExample(
          title: 'Accordion / Expansion panel',
          description:
              'Oculta contenido secundario hasta que el usuario decide expandirlo.',
          maxWidth: double.infinity,
          child: Column(
            children: [
              AppAccordion(
                title: 'Datos del matrimonio',
                subtitle: 'Información general del evento.',
                initiallyExpanded: true,
                child: Text(
                  'Fecha, ubicación, cantidad estimada de invitados y responsables.',
                ),
              ),

              SizedBox(height: 12),

              AppAccordion(
                title: 'Configuración avanzada',
                subtitle: 'Opciones utilizadas con menor frecuencia.',
                child: Text(
                  'Preferencias y parámetros adicionales del proyecto.',
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}

class _ContainersHeading extends StatelessWidget {
  const _ContainersHeading();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Contenedores',
          style: Theme.of(
            context,
          ).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.w700),
        ),

        const SizedBox(height: 6),

        Text(
          'Estructuras utilizadas para agrupar y organizar información.',
          style: Theme.of(context).textTheme.bodyMedium,
        ),
      ],
    );
  }
}

class _ContainerExample extends StatelessWidget {
  const _ContainerExample({
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
