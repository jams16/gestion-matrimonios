import 'package:flutter/material.dart';

import '../../../core/widgets/buttons/app_button.dart';
import '../../../core/widgets/containers/app_card.dart';
import '../../../core/widgets/data/app_table.dart';
import '../../../core/widgets/feedback/app_message.dart';
import '../../../core/widgets/inputs/app_text_field.dart';

class UsageRulesPageOneSection extends StatelessWidget {
  const UsageRulesPageOneSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const _UsageRulesHeading(),

        const SizedBox(height: 28),

        _UsageRule(
          title: 'Cuándo usar cada botón',
          description:
              'El nivel visual del botón debe reflejar la importancia de la acción.',
          good: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              AppButton(label: 'Guardar', onPressed: () {}),
              const SizedBox(height: 8),
              AppButton(
                label: 'Cancelar',
                variant: AppButtonVariant.secondary,
                onPressed: () {},
              ),
              const SizedBox(height: 8),
              AppButton(
                label: 'Ver detalles',
                variant: AppButtonVariant.tertiary,
                onPressed: () {},
              ),
              const SizedBox(height: 8),
              AppButton(
                label: 'Eliminar',
                variant: AppButtonVariant.destructive,
                onPressed: () {},
              ),
            ],
          ),
          rules: const [
            'Primario: acción principal de la vista.',
            'Secundario: alternativa a la acción principal.',
            'Terciario: acción de bajo énfasis.',
            'Destructivo: eliminación o acción irreversible.',
            'Evitar múltiples botones primarios compitiendo entre sí.',
          ],
        ),

        const SizedBox(height: 36),

        const _UsageRule(
          title: 'Dialog vs página',
          description:
              'La elección depende de la complejidad y duración de la tarea.',
          good: _DialogVsPageExample(),
          rules: [
            'Dialog: tareas breves, confirmaciones o formularios pequeños.',
            'Página: tareas largas, múltiples secciones o navegación propia.',
            'No usar dialog para procesos complejos o con muchos campos.',
            'Si el usuario necesita consultar otra información mientras completa la tarea, preferir página.',
          ],
        ),
      ],
    );
  }
}

class UsageRulesPageTwoSection extends StatelessWidget {
  const UsageRulesPageTwoSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: const [
        _UsageRulesHeading(),

        SizedBox(height: 28),

        _UsageRule(
          title: 'Tabla vs cards',
          description:
              'La estructura debe adaptarse al tipo de información y al dispositivo.',
          good: _TableVsCardsExample(),
          rules: [
            'Tabla: comparar varias filas usando las mismas columnas.',
            'Cards: contenido más visual, flexible o heterogéneo.',
            'Desktop: preferir tabla para grandes conjuntos estructurados.',
            'Mobile: usar cards o scroll horizontal cuando una tabla no pueda simplificarse.',
          ],
        ),

        SizedBox(height: 36),

        _UsageRule(
          title: 'Cuándo usar iconos',
          description:
              'Los iconos deben reforzar una acción o concepto, no decorar sin propósito.',
          good: _IconsUsageExample(),
          rules: [
            'Usar iconos reconocibles para acciones frecuentes.',
            'Los icon buttons deben incluir tooltip.',
            'Acompañar con texto cuando el significado pueda ser ambiguo.',
            'No mezclar familias o estilos de iconos sin criterio.',
            'Evitar iconos puramente decorativos dentro de controles funcionales.',
          ],
        ),
      ],
    );
  }
}

class UsageRulesPageThreeSection extends StatelessWidget {
  const UsageRulesPageThreeSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: const [
        _UsageRulesHeading(),

        SizedBox(height: 28),

        _UsageRule(
          title: 'Cuándo usar helper text',
          description:
              'El helper text debe aportar información útil antes de que ocurra un error.',
          good: AppTextField(
            label: 'Nombre del proyecto',
            hintText: 'Ej. Matrimonio José y Carlos',
            helperText: 'Máximo 100 caracteres.',
          ),
          rules: [
            'Usar cuando exista una regla o formato que el usuario deba conocer.',
            'No repetir el label.',
            'No usar para información obvia.',
            'El error reemplaza la orientación cuando existe una validación fallida.',
          ],
        ),

        SizedBox(height: 36),

        _UsageRule(
          title: 'Cuándo mostrar confirmación',
          description:
              'La confirmación se reserva para acciones con consecuencias relevantes.',
          good: _ConfirmationExample(),
          rules: [
            'Mostrar para acciones destructivas o difíciles de revertir.',
            'Mostrar cuando la acción tenga consecuencias importantes.',
            'No confirmar acciones rutinarias como guardar cambios normales.',
            'El mensaje debe indicar claramente qué ocurrirá.',
            'La acción destructiva debe identificarse visualmente.',
          ],
        ),
      ],
    );
  }
}

class _UsageRulesHeading extends StatelessWidget {
  const _UsageRulesHeading();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Reglas de uso',
          style: Theme.of(
            context,
          ).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.w700),
        ),
        const SizedBox(height: 6),
        Text(
          'Criterios para elegir y utilizar correctamente los componentes del sistema.',
          style: Theme.of(context).textTheme.bodyMedium,
        ),
      ],
    );
  }
}

class _UsageRule extends StatelessWidget {
  const _UsageRule({
    required this.title,
    required this.description,
    required this.good,
    required this.rules,
  });

  final String title;
  final String description;
  final Widget good;
  final List<String> rules;

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: const BoxConstraints(maxWidth: 620),
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
          const SizedBox(height: 14),

          good,

          const SizedBox(height: 14),

          for (final rule in rules)
            Padding(
              padding: const EdgeInsets.only(bottom: 6),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('• '),
                  Expanded(
                    child: Text(
                      rule,
                      style: Theme.of(context).textTheme.bodySmall,
                    ),
                  ),
                ],
              ),
            ),
        ],
      ),
    );
  }
}

class _DialogVsPageExample extends StatelessWidget {
  const _DialogVsPageExample();

  @override
  Widget build(BuildContext context) {
    return const Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Expanded(
          child: AppCard(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Icon(Icons.open_in_new),
                SizedBox(height: 8),
                Text('Dialog', style: TextStyle(fontWeight: FontWeight.w600)),
                SizedBox(height: 4),
                Text('Acción breve o puntual.'),
              ],
            ),
          ),
        ),
        SizedBox(width: 12),
        Expanded(
          child: AppCard(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Icon(Icons.web_asset_outlined),
                SizedBox(height: 8),
                Text('Página', style: TextStyle(fontWeight: FontWeight.w600)),
                SizedBox(height: 4),
                Text('Proceso amplio o complejo.'),
              ],
            ),
          ),
        ),
      ],
    );
  }
}

class _TableVsCardsExample extends StatelessWidget {
  const _TableVsCardsExample();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const AppTable(
          columns: [
            AppTableColumn(label: 'Proveedor'),
            AppTableColumn(label: 'Estado'),
          ],
          rows: [
            ['Eventos Lima', 'Activo'],
            ['Fotografía Aurora', 'Pendiente'],
          ],
        ),

        const SizedBox(height: 16),

        Row(
          children: const [
            Expanded(child: AppCard(child: Text('Eventos Lima\nActivo'))),
            SizedBox(width: 12),
            Expanded(
              child: AppCard(child: Text('Fotografía Aurora\nPendiente')),
            ),
          ],
        ),
      ],
    );
  }
}

class _IconsUsageExample extends StatelessWidget {
  const _IconsUsageExample();

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        IconButton(
          tooltip: 'Editar',
          onPressed: () {},
          icon: const Icon(Icons.edit_outlined),
        ),

        const SizedBox(width: 12),

        AppButton(label: 'Nuevo proyecto', icon: Icons.add, onPressed: () {}),
      ],
    );
  }
}

class _ConfirmationExample extends StatelessWidget {
  const _ConfirmationExample();

  @override
  Widget build(BuildContext context) {
    return const AppMessage(
      type: AppMessageType.warning,
      message:
          'Confirma acciones destructivas o con consecuencias importantes; no acciones rutinarias.',
    );
  }
}
