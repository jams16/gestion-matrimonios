import 'package:flutter/material.dart';

import '../../../core/widgets/inputs/app_autocomplete_field.dart';
import '../../../core/widgets/inputs/app_date_field.dart';
import '../../../core/widgets/inputs/app_file_field.dart';
import '../../../core/widgets/inputs/app_number_field.dart';
import '../../../core/widgets/inputs/app_password_field.dart';
import '../../../core/widgets/inputs/app_search_field.dart';
import '../../../core/widgets/inputs/app_select_field.dart';
import '../../../core/widgets/inputs/app_text_field.dart';
import '../../../core/widgets/inputs/app_textarea_field.dart';
import '../../../core/widgets/inputs/app_time_field.dart';

class InputsPageOneSection extends StatelessWidget {
  const InputsPageOneSection({super.key});

  @override
  Widget build(BuildContext context) {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _InputsHeading(),

        SizedBox(height: 28),

        _InputExample(
          title: 'Text input',
          child: AppTextField(label: 'Nombre', hintText: 'Ingresa tu nombre'),
        ),

        SizedBox(height: 28),

        _InputExample(
          title: 'Password',
          child: AppPasswordField(
            label: 'Contraseña',
            hintText: 'Ingresa tu contraseña',
            helperText: 'Mínimo 8 caracteres.',
          ),
        ),

        SizedBox(height: 28),

        _InputExample(
          title: 'Textarea',
          child: AppTextareaField(
            label: 'Observaciones',
            hintText: 'Escribe una observación',
            maxLines: 4,
          ),
        ),

        SizedBox(height: 28),

        _InputExample(
          title: 'Search',
          child: AppSearchField(hintText: 'Buscar actividad...'),
        ),
      ],
    );
  }
}

class InputsPageTwoSection extends StatelessWidget {
  const InputsPageTwoSection({super.key});

  @override
  Widget build(BuildContext context) {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _InputsHeading(),

        SizedBox(height: 28),

        _InputExample(
          title: 'Number',
          child: AppNumberField(
            label: 'Número de invitados',
            initialValue: 120,
            min: 0,
            max: 1000,
          ),
        ),

        SizedBox(height: 28),

        _InputExample(
          title: 'Date',
          child: AppDateField(label: 'Fecha del matrimonio'),
        ),

        SizedBox(height: 28),

        _InputExample(
          title: 'Time',
          child: AppTimeField(label: 'Hora de inicio'),
        ),

        SizedBox(height: 28),

        _InputExample(
          title: 'Select / Dropdown · pocas opciones',
          child: AppSelectField<String>(
            label: 'Estado',
            options: [
              AppSelectOption(value: 'pendiente', label: 'Pendiente'),
              AppSelectOption(value: 'proceso', label: 'En proceso'),
              AppSelectOption(value: 'completada', label: 'Completada'),
              AppSelectOption(value: 'cancelada', label: 'Cancelada'),
            ],
          ),
        ),
      ],
    );
  }
}

class InputsPageThreeSection extends StatelessWidget {
  const InputsPageThreeSection({super.key});

  @override
  Widget build(BuildContext context) {
    return const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _InputsHeading(),

        SizedBox(height: 28),

        _InputExample(
          title: 'Select / Dropdown · buscable',
          child: AppSelectField<String>(
            label: 'País',
            hintText: 'Busca o selecciona un país',
            options: [
              AppSelectOption(value: 'PE', label: 'Perú'),
              AppSelectOption(value: 'CL', label: 'Chile'),
              AppSelectOption(value: 'CO', label: 'Colombia'),
              AppSelectOption(value: 'MX', label: 'México'),
              AppSelectOption(value: 'AR', label: 'Argentina'),
              AppSelectOption(value: 'BR', label: 'Brasil'),
              AppSelectOption(value: 'EC', label: 'Ecuador'),
              AppSelectOption(value: 'BO', label: 'Bolivia'),
              AppSelectOption(value: 'US', label: 'Estados Unidos'),
              AppSelectOption(value: 'ES', label: 'España'),
            ],
          ),
        ),

        SizedBox(height: 32),

        _InputExample(
          title: 'Autocomplete',
          child: AppAutocompleteField(
            label: 'Proveedor',
            hintText: 'Busca un proveedor',
            options: [
              'Eventos Lima',
              'Fotografía Aurora',
              'Catering del Valle',
              'Florería Primavera',
              'Sonido Premium',
              'Decoraciones Luna',
            ],
          ),
        ),

        SizedBox(height: 32),

        _InputExample(
          title: 'File input',
          child: AppFileField(
            label: 'Contrato',
            helperText: 'PDF, DOC o DOCX.',
            allowedExtensions: ['pdf', 'doc', 'docx'],
          ),
        ),
      ],
    );
  }
}

class _InputsHeading extends StatelessWidget {
  const _InputsHeading();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Inputs',
          style: Theme.of(
            context,
          ).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.w700),
        ),
        const SizedBox(height: 6),
        Text(
          'Campos de entrada utilizados en formularios de la aplicación.',
          style: Theme.of(context).textTheme.bodyMedium,
        ),
      ],
    );
  }
}

class _InputExample extends StatelessWidget {
  const _InputExample({required this.title, required this.child});

  final String title;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: const BoxConstraints(maxWidth: 480),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: Theme.of(
              context,
            ).textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w600),
          ),
          const SizedBox(height: 12),
          child,
        ],
      ),
    );
  }
}
