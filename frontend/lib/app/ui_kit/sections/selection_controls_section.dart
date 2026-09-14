import 'package:flutter/material.dart';

import '../../../core/widgets/selection/app_checkbox.dart';
import '../../../core/widgets/selection/app_choice_chips.dart';
import '../../../core/widgets/selection/app_radio_group.dart';
import '../../../core/widgets/selection/app_segmented_button.dart';
import '../../../core/widgets/selection/app_switch.dart';

class SelectionControlsSection extends StatefulWidget {
  const SelectionControlsSection({super.key});

  @override
  State<SelectionControlsSection> createState() =>
      _SelectionControlsSectionState();
}

class _SelectionControlsSectionState
    extends State<SelectionControlsSection> {
  bool _checkbox = true;
  bool _switchValue = true;

  String _radioValue = 'pareja';
  String _chipValue = 'pendiente';

  Set<String> _segmentValue = {
    'lista',
  };

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Controles de selección',
          style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                fontWeight: FontWeight.w700,
              ),
        ),

        const SizedBox(height: 6),

        Text(
          'Controles utilizados para seleccionar, activar o cambiar opciones.',
          style: Theme.of(context).textTheme.bodyMedium,
        ),

        const SizedBox(height: 28),

        _ControlExample(
          title: 'Checkbox',
          child: AppCheckbox(
            label: 'Enviar recordatorio',
            subtitle: 'Notificar a los involucrados antes de la actividad.',
            value: _checkbox,
            onChanged: (value) {
              setState(() {
                _checkbox = value;
              });
            },
          ),
        ),

        const SizedBox(height: 30),

        _ControlExample(
          title: 'Radio',
          child: AppRadioGroup<String>(
            label: 'Tipo de usuario',
            value: _radioValue,
            options: const [
              AppRadioOption(
                value: 'pareja',
                label: 'Pareja',
              ),
              AppRadioOption(
                value: 'wedding_planner',
                label: 'Wedding Planner',
              ),
              AppRadioOption(
                value: 'colaborador',
                label: 'Colaborador',
              ),
            ],
            onChanged: (value) {
              if (value == null) {
                return;
              }

              setState(() {
                _radioValue = value;
              });
            },
          ),
        ),

        const SizedBox(height: 30),

        _ControlExample(
          title: 'Switch',
          child: AppSwitch(
            label: 'Notificaciones',
            subtitle: 'Recibir alertas relacionadas con el proyecto.',
            value: _switchValue,
            onChanged: (value) {
              setState(() {
                _switchValue = value;
              });
            },
          ),
        ),

        const SizedBox(height: 30),

        _ControlExample(
          title: 'Chips',
          child: AppChoiceChips<String>(
            label: 'Estado',
            value: _chipValue,
            options: const [
              AppChipOption(
                value: 'pendiente',
                label: 'Pendiente',
              ),
              AppChipOption(
                value: 'proceso',
                label: 'En proceso',
              ),
              AppChipOption(
                value: 'completada',
                label: 'Completada',
              ),
            ],
            onChanged: (value) {
              setState(() {
                _chipValue = value;
              });
            },
          ),
        ),

        const SizedBox(height: 30),

        _ControlExample(
          title: 'Segmented buttons',
          child: AppSegmentedButton<String>(
            label: 'Vista',
            selected: _segmentValue,
            segments: const [
              AppSegment(
                value: 'lista',
                label: 'Lista',
                icon: Icons.view_list_outlined,
              ),
              AppSegment(
                value: 'grid',
                label: 'Grid',
                icon: Icons.grid_view_outlined,
              ),
              AppSegment(
                value: 'calendario',
                label: 'Calendario',
                icon: Icons.calendar_month_outlined,
              ),
            ],
            onChanged: (value) {
              setState(() {
                _segmentValue = value;
              });
            },
          ),
        ),
      ],
    );
  }
}

class _ControlExample extends StatelessWidget {
  const _ControlExample({
    required this.title,
    required this.child,
  });

  final String title;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: const BoxConstraints(
        maxWidth: 480,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: Theme.of(context).textTheme.titleSmall?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
          ),

          const SizedBox(height: 12),

          child,
        ],
      ),
    );
  }
}