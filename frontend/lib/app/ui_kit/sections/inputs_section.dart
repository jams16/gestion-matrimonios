import 'package:flutter/material.dart';

import '../../../core/widgets/inputs/app_text_field.dart';

class InputsSection extends StatefulWidget {
  const InputsSection({super.key});

  @override
  State<InputsSection> createState() => _InputsSectionState();
}

class _InputsSectionState extends State<InputsSection> {
  final _filledController = TextEditingController(
    text: 'jose@correo.com',
  );

  @override
  void dispose() {
    _filledController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Inputs',
          style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                fontWeight: FontWeight.w700,
              ),
        ),
        const SizedBox(height: 6),
        Text(
          'Estados y variantes de los campos de entrada.',
          style: Theme.of(context).textTheme.bodyMedium,
        ),
        const SizedBox(height: 28),

        const _InputExample(
          title: 'Normal',
          child: AppTextField(
            label: 'Nombre',
            hintText: 'Ingresa tu nombre',
          ),
        ),

        const SizedBox(height: 26),

        const _InputExample(
          title: 'Con icono',
          child: AppTextField(
            label: 'Correo electrónico',
            hintText: 'ejemplo@correo.com',
            prefixIcon: Icon(Icons.email_outlined),
          ),
        ),

        const SizedBox(height: 26),

        _InputExample(
          title: 'Llenado',
          child: AppTextField(
            label: 'Correo electrónico',
            controller: _filledController,
            prefixIcon: const Icon(Icons.email_outlined),
          ),
        ),

        const SizedBox(height: 26),

        const _InputExample(
          title: 'Error',
          child: AppTextField(
            label: 'Correo electrónico',
            hintText: 'ejemplo@correo.com',
            prefixIcon: Icon(Icons.email_outlined),
            errorText: 'Ingresa un correo electrónico válido.',
          ),
        ),

        const SizedBox(height: 26),

        const _InputExample(
          title: 'Texto de ayuda',
          child: AppTextField(
            label: 'Nombre del proyecto',
            hintText: 'Ej. Matrimonio José y Carlos',
            helperText: 'Máximo 100 caracteres.',
          ),
        ),
      ],
    );
  }
}

class _InputExample extends StatelessWidget {
  const _InputExample({
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