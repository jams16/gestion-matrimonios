import 'package:flutter/material.dart';

import '../../../core/widgets/buttons/app_button.dart';
import '../../../core/widgets/containers/app_card.dart';
import '../../../core/widgets/containers/app_panel.dart';
import '../../../core/widgets/containers/app_section.dart';
import '../../../core/widgets/data/app_list.dart';
import '../../../core/widgets/data/app_list_item.dart';
import '../../../core/widgets/forms/app_form_actions.dart';
import '../../../core/widgets/forms/app_form_layout.dart';
import '../../../core/widgets/indicators/app_status_badge.dart';
import '../../../core/widgets/inputs/app_password_field.dart';
import '../../../core/widgets/inputs/app_search_field.dart';
import '../../../core/widgets/inputs/app_text_field.dart';
import '../../../core/widgets/navigation/app_breadcrumbs.dart';
import '../../../core/widgets/page_patterns/app_dashboard_page_pattern.dart';
import '../../../core/widgets/page_patterns/app_detail_page_pattern.dart';
import '../../../core/widgets/page_patterns/app_form_page_pattern.dart';
import '../../../core/widgets/page_patterns/app_list_page_pattern.dart';
import '../../../core/widgets/page_patterns/app_login_page_pattern.dart';
import '../../../core/widgets/page_patterns/app_settings_page_pattern.dart';
import '../../../core/widgets/page_patterns/app_wizard_page_pattern.dart';

class PagePatternsPageOneSection extends StatelessWidget {
  const PagePatternsPageOneSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const _PatternsHeading(),

        const SizedBox(height: 28),

        const _PatternExample(
          title: 'Login',
          description:
              'Pantalla centrada, simple y enfocada exclusivamente en autenticación.',
          child: SizedBox(
            height: 330,
            child: AppLoginPagePattern(
              title: 'Iniciar sesión',
              description: 'Accede a tu cuenta para gestionar tus proyectos.',
              form: AppFormLayout(
                children: [
                  AppTextField(
                    label: 'Correo electrónico',
                    hintText: 'ejemplo@correo.com',
                  ),
                  AppPasswordField(label: 'Contraseña'),
                  AppButton(
                    label: 'Iniciar sesión',
                    expanded: true,
                    onPressed: null,
                  ),
                ],
              ),
            ),
          ),
        ),

        const SizedBox(height: 36),

        _PatternExample(
          title: 'Listado',
          description:
              'Combina título, búsqueda, acción principal y colección de resultados.',
          maxWidth: double.infinity,
          child: AppListPagePattern(
            title: 'Proyectos',
            description: 'Gestiona tus proyectos de matrimonio.',
            search: const AppSearchField(hintText: 'Buscar proyecto...'),
            primaryAction: AppButton(
              label: 'Nuevo proyecto',
              icon: Icons.add,
              onPressed: () {},
            ),
            content: AppList(
              children: [
                AppListItem(
                  title: 'Matrimonio José y Carlos',
                  subtitle: '15 de noviembre de 2026',
                  trailing: const Icon(Icons.chevron_right),
                  onTap: () {},
                ),
                AppListItem(
                  title: 'Matrimonio Ana y Luis',
                  subtitle: '4 de diciembre de 2026',
                  trailing: const Icon(Icons.chevron_right),
                  onTap: () {},
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}

class PagePatternsPageTwoSection extends StatelessWidget {
  const PagePatternsPageTwoSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const _PatternsHeading(),

        const SizedBox(height: 28),

        _PatternExample(
          title: 'Detalle',
          description:
              'Presenta información completa de una entidad junto con sus acciones.',
          maxWidth: double.infinity,
          child: AppDetailPagePattern(
            title: 'Matrimonio José y Carlos',
            description: 'Proyecto programado para el 15 de noviembre de 2026.',
            breadcrumbs: AppBreadcrumbs(
              items: [
                AppBreadcrumbItem(label: 'Proyectos', onTap: () {}),
                const AppBreadcrumbItem(label: 'Matrimonio José y Carlos'),
              ],
            ),
            status: const AppStatusBadge(
              label: 'En planificación',
              type: AppStatusBadgeType.info,
            ),
            actions: [
              AppButton(
                label: 'Editar',
                variant: AppButtonVariant.secondary,
                icon: Icons.edit_outlined,
                onPressed: () {},
              ),
            ],
            content: const AppPanel(
              title: 'Información general',
              child: Text(
                'Fecha, ubicación, responsables y demás datos del proyecto.',
              ),
            ),
          ),
        ),

        const SizedBox(height: 36),

        _PatternExample(
          title: 'Crear / Editar',
          description:
              'Utiliza el mismo patrón estructural para formularios de creación y edición.',
          maxWidth: double.infinity,
          child: AppFormPagePattern(
            title: 'Crear proyecto',
            description: 'Completa la información inicial del matrimonio.',
            form: AppFormLayout(
              children: [
                AppTextField(
                  label: 'Nombre del proyecto',
                  required: true,
                  hintText: 'Ej. Matrimonio José y Carlos',
                ),
                AppTextField(label: 'Ubicación', hintText: 'Ej. Lima, Perú'),
                AppFormActions(
                  secondaryAction: AppButton(
                    label: 'Cancelar',
                    variant: AppButtonVariant.secondary,
                    onPressed: null,
                  ),
                  primaryAction: AppButton(
                    label: 'Crear proyecto',
                    onPressed: null,
                  ),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}

class PagePatternsPageThreeSection extends StatelessWidget {
  const PagePatternsPageThreeSection({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const _PatternsHeading(),

        const SizedBox(height: 28),

        const _PatternExample(
          title: 'Dashboard',
          description:
              'Resume información clave y accesos prioritarios del proyecto.',
          maxWidth: double.infinity,
          child: AppDashboardPagePattern(
            title: 'Resumen del proyecto',
            description: 'Estado general del matrimonio.',
            sections: [
              Row(
                children: [
                  Expanded(
                    child: AppCard(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Presupuesto'),
                          SizedBox(height: 8),
                          Text(
                            'S/ 24,300',
                            style: TextStyle(
                              fontSize: 22,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  SizedBox(width: 16),
                  Expanded(
                    child: AppCard(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Invitados'),
                          SizedBox(height: 8),
                          Text(
                            '128',
                            style: TextStyle(
                              fontSize: 22,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
              AppSection(
                title: 'Próximas actividades',
                child: Text(
                  'Reservar local · Confirmar catering · Enviar invitaciones',
                ),
              ),
            ],
          ),
        ),

        const SizedBox(height: 36),

        const _PatternExample(
          title: 'Configuración',
          description:
              'Agrupa preferencias relacionadas y de baja frecuencia de uso.',
          maxWidth: double.infinity,
          child: AppSettingsPagePattern(
            title: 'Configuración',
            description:
                'Personaliza el comportamiento de la cuenta y del proyecto.',
            sections: [
              AppPanel(
                title: 'Notificaciones',
                child: Text('Preferencias de correo y notificaciones push.'),
              ),
              AppPanel(
                title: 'Privacidad',
                child: Text('Configuración de acceso y permisos.'),
              ),
            ],
          ),
        ),
      ],
    );
  }
}

class PagePatternsPageFourSection extends StatefulWidget {
  const PagePatternsPageFourSection({super.key});

  @override
  State<PagePatternsPageFourSection> createState() =>
      _PagePatternsPageFourSectionState();
}

class _PagePatternsPageFourSectionState
    extends State<PagePatternsPageFourSection> {
  int _step = 0;

  static const _steps = [
    AppWizardStep(title: 'Información', description: 'Datos generales.'),
    AppWizardStep(title: 'Fecha y ubicación', description: 'Datos del evento.'),
    AppWizardStep(title: 'Confirmación', description: 'Revisa la información.'),
  ];

  void _next() {
    if (_step < _steps.length - 1) {
      setState(() {
        _step++;
      });
    }
  }

  void _previous() {
    if (_step > 0) {
      setState(() {
        _step--;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const _PatternsHeading(),

        const SizedBox(height: 28),

        _PatternExample(
          title: 'Wizard / pasos',
          description:
              'Divide procesos largos en etapas pequeñas y comprensibles.',
          maxWidth: double.infinity,
          child: AppWizardPagePattern(
            title: 'Crear proyecto',
            description: 'Completa los pasos para iniciar un nuevo matrimonio.',
            steps: _steps,
            currentStep: _step,
            onPrevious: _previous,
            onNext: _next,
            content: switch (_step) {
              0 => const AppFormLayout(
                children: [
                  AppTextField(
                    label: 'Nombre del proyecto',
                    required: true,
                    hintText: 'Ej. Matrimonio José y Carlos',
                  ),
                ],
              ),
              1 => const AppFormLayout(
                children: [
                  AppTextField(label: 'Ubicación', hintText: 'Ej. Lima, Perú'),
                ],
              ),
              _ => const AppPanel(
                title: 'Confirmación',
                child: Text(
                  'Revisa la información antes de crear el proyecto.',
                ),
              ),
            },
          ),
        ),
      ],
    );
  }
}

class _PatternsHeading extends StatelessWidget {
  const _PatternsHeading();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Patrones de página',
          style: Theme.of(
            context,
          ).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.w700),
        ),
        const SizedBox(height: 6),
        Text(
          'Composiciones reutilizables para estructurar las principales vistas de la aplicación.',
          style: Theme.of(context).textTheme.bodyMedium,
        ),
      ],
    );
  }
}

class _PatternExample extends StatelessWidget {
  const _PatternExample({
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
