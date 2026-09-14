import 'package:flutter/material.dart';

class AppWizardStep {
  const AppWizardStep({required this.title, this.description});

  final String title;
  final String? description;
}

class AppWizardPagePattern extends StatelessWidget {
  const AppWizardPagePattern({
    super.key,
    required this.title,
    required this.steps,
    required this.currentStep,
    required this.content,
    required this.onPrevious,
    required this.onNext,
    this.description,
    this.nextLabel = 'Siguiente',
    this.previousLabel = 'Anterior',
    this.finishLabel = 'Finalizar',
  });

  final String title;
  final String? description;

  final List<AppWizardStep> steps;

  final int currentStep;

  final Widget content;

  final VoidCallback? onPrevious;
  final VoidCallback? onNext;

  final String nextLabel;
  final String previousLabel;
  final String finishLabel;

  @override
  Widget build(BuildContext context) {
    final isLast = currentStep == steps.length - 1;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: Theme.of(
            context,
          ).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.w700),
        ),

        if (description != null) ...[
          const SizedBox(height: 6),
          Text(description!, style: Theme.of(context).textTheme.bodyMedium),
        ],

        const SizedBox(height: 28),

        Stepper(
          currentStep: currentStep,
          controlsBuilder: (context, details) {
            return const SizedBox.shrink();
          },
          steps: List.generate(steps.length, (index) {
            final step = steps[index];

            return Step(
              title: Text(step.title),
              subtitle: step.description == null
                  ? null
                  : Text(step.description!),
              content: index == currentStep ? content : const SizedBox.shrink(),
              isActive: index <= currentStep,
              state: index < currentStep
                  ? StepState.complete
                  : index == currentStep
                  ? StepState.editing
                  : StepState.indexed,
            );
          }),
        ),

        const SizedBox(height: 24),

        Row(
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            if (currentStep > 0)
              OutlinedButton(onPressed: onPrevious, child: Text(previousLabel)),

            if (currentStep > 0) const SizedBox(width: 12),

            FilledButton(
              onPressed: onNext,
              child: Text(isLast ? finishLabel : nextLabel),
            ),
          ],
        ),
      ],
    );
  }
}
