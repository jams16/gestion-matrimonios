import 'package:flutter/material.dart';

import '../../../core/widgets/buttons/app_button.dart';
import '../../../core/widgets/forms/app_form_actions.dart';
import '../../../core/widgets/forms/app_form_field_group.dart';
import '../../../core/widgets/forms/app_form_layout.dart';
import '../../../core/widgets/inputs/app_date_field.dart';
import '../../../core/widgets/inputs/app_select_field.dart';
import '../../../core/widgets/inputs/app_text_field.dart';
import '../../../core/widgets/inputs/app_textarea_field.dart';

class FormsPageOneSection extends StatelessWidget {
  const FormsPageOneSection({super.key});

  @override
  Widget build(BuildContext context) {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _FormsHeading(),

        SizedBox(height: 28),

        _FormExample(
          title: 'Form layout',
          description:
              'Los formularios simples utilizan una sola columna y un ancho máximo controlado.',
          child: AppFormLayout(
            children: [
              AppTextField(
                label: 'Nombre',
                hintText: 'Ingresa tu nombre',
              ),
              AppTextField(
                label: 'Correo electrónico',
                hintText: 'ejemplo@correo.com',
              ),
            ],
          ),
        ),

        SizedBox(height: 32),

        _FormExample(
          title: 'Label + input',
          description:
              'El label siempre se muestra sobre el campo.',
          child: AppTextField(
            label: 'Nombre del proyecto',
            hintText: 'Ej. Matrimonio José y Carlos',
          ),
        ),

        SizedBox(height: 32),

        _FormExample(
          title: 'Campo requerido',
          description:
              'Los campos obligatorios se identifican mediante un asterisco.',
          child: AppTextField(
            label: 'Correo electrónico',
            required: true,
            hintText: 'ejemplo@correo.com',
          ),
        ),

        SizedBox(height: 32),

        _FormExample(
          title: 'Helper text',
          description:
              'Se utiliza únicamente cuando aporta orientación útil.',
          child: AppTextField(
            label: 'Nombre del proyecto',
            hintText: 'Ej. Matrimonio José y Carlos',
            helperText: 'Máximo 100 caracteres.',
          ),
        ),

        SizedBox(height: 32),

        _FormExample(
          title: 'Error',
          description:
              'El mensaje indica claramente qué debe corregir el usuario.',
          child: AppTextField(
            label: 'Correo electrónico',
            required: true,
            hintText: 'ejemplo@correo.com',
            errorText: 'Ingresa un correo electrónico válido.',
          ),
        ),
      ],
    );
  }
}



class FormsPageTwoSection extends StatelessWidget {
  const FormsPageTwoSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const _FormsHeading(),

        const SizedBox(height: 28),

        const _FormExample(
          title: 'Agrupaciones',
          description:
              'Los campos relacionados se agrupan visualmente bajo un mismo contexto.',
          maxWidth: double.infinity,
          child: AppFormFieldGroup(
            title: 'Información del matrimonio',
            description:
                'Datos principales utilizados para configurar el proyecto.',
            children: [
              AppTextField(
                label: 'Nombre del proyecto',
                required: true,
                hintText: 'Ej. Matrimonio José y Carlos',
              ),

              AppDateField(
                label: 'Fecha del matrimonio',
              ),

              AppTextField(
                label: 'Ubicación',
                hintText: 'Ej. Lima, Perú',
              ),
            ],
          ),
        ),

        const SizedBox(height: 36),

        _FormExample(
          title: 'Acciones de formulario',
          description:
              'La acción principal se coloca al final y recibe mayor énfasis.',
          maxWidth: double.infinity,
          child: AppFormActions(
            secondaryAction: AppButton(
              label: 'Cancelar',
              variant: AppButtonVariant.secondary,
              onPressed: () {},
            ),
            primaryAction: AppButton(
              label: 'Guardar',
              icon: Icons.save_outlined,
              onPressed: () {},
            ),
          ),
        ),
      ],
    );
  }
}


class FormsPageThreeSection extends StatelessWidget {
  const FormsPageThreeSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const _FormsHeading(),

        const SizedBox(height: 28),

        _FormExample(
          title: 'Formulario completo',
          description:
              'Ejemplo combinando estructura, campos, agrupaciones y acciones.',
          maxWidth: double.infinity,
          child: AppFormLayout(
            maxWidth: 600,
            children: [
              const AppFormFieldGroup(
                title: 'Información general',
                children: [
                  AppTextField(
                    label: 'Nombre del proyecto',
                    required: true,
                    hintText:
                        'Ej. Matrimonio José y Carlos',
                  ),

                  AppDateField(
                    label: 'Fecha del matrimonio',
                  ),

                  AppSelectField<String>(
                    label: 'Estado',
                    options: [
                      AppSelectOption(
                        value: 'planificacion',
                        label: 'Planificación',
                      ),
                      AppSelectOption(
                        value: 'ejecucion',
                        label: 'Ejecución',
                      ),
                      AppSelectOption(
                        value: 'finalizado',
                        label: 'Finalizado',
                      ),
                    ],
                  ),

                  AppTextareaField(
                    label: 'Descripción',
                    hintText:
                        'Agrega información adicional del proyecto.',
                  ),
                ],
              ),

              AppFormActions(
                secondaryAction: AppButton(
                  label: 'Cancelar',
                  variant: AppButtonVariant.secondary,
                  onPressed: () {},
                ),
                primaryAction: AppButton(
                  label: 'Crear proyecto',
                  onPressed: () {},
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}



class _FormsHeading extends StatelessWidget {
  const _FormsHeading();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Formularios completos',
          style: Theme.of(context)
              .textTheme
              .headlineSmall
              ?.copyWith(
                fontWeight: FontWeight.w700,
              ),
        ),
        const SizedBox(height: 6),
        Text(
          'Reglas para estructurar formularios consistentes, claros y fáciles de completar.',
          style: Theme.of(context).textTheme.bodyMedium,
        ),
      ],
    );
  }
}

class _FormExample extends StatelessWidget {
  const _FormExample({
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
      constraints: BoxConstraints(
        maxWidth: maxWidth,
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
          child,
        ],
      ),
    );
  }
}