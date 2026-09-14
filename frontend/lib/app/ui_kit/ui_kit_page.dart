import 'package:flutter/material.dart';

import 'sections/foundations_section.dart';
import 'sections/responsive_section.dart';
import 'sections/global_states_section.dart';

import 'sections/inputs_section.dart';
import 'sections/selection_controls_section.dart';
import 'sections/buttons_section.dart';
import 'sections/feedback_section.dart';
import 'sections/containers_section.dart';
import 'sections/navigation_section.dart';
import 'sections/overlays_section.dart';
import 'sections/data_section.dart';
import 'sections/indicators_section.dart';

import 'sections/forms_section.dart';
import 'sections/page_patterns_section.dart';
import 'sections/page_states_section.dart';

import 'sections/accessibility_section.dart';
import 'sections/usage_rules_section.dart';
import 'sections/responsive_examples_section.dart';

import 'widgets/a4_sheet.dart';
import 'widgets/ui_kit_page_header.dart';

class UiKitPage extends StatelessWidget {
  const UiKitPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SingleChildScrollView(
        child: Align(
          alignment: Alignment.topLeft,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: const [
              // PÁGINA 1
              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(),
                    SizedBox(height: 24),
                    FoundationsPageOneSection(),
                  ],
                ),
              ),

              // PÁGINA 2
              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(subtitle: 'Fundamentos visuales'),
                    SizedBox(height: 24),
                    FoundationsPageTwoSection(),
                  ],
                ),
              ),

              // PÁGINA 3
              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(subtitle: 'Fundamentos visuales'),
                    SizedBox(height: 24),
                    FoundationsPageThreeSection(),
                  ],
                ),
              ),

              // PÁGINA 4
              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(subtitle: 'Responsive'),
                    SizedBox(height: 24),
                    ResponsiveOnePageSection(),
                  ],
                ),
              ),

              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(subtitle: 'Responsive'),
                    SizedBox(height: 24),
                    ResponsiveTwoPageSection(),
                  ],
                ),
              ),

              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(subtitle: 'Responsive'),
                    SizedBox(height: 24),
                    ResponsiveThreePageSection(),
                  ],
                ),
              ),

              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(subtitle: 'Estados globales'),
                    SizedBox(height: 24),
                    GlobalStatesSection(),
                  ],
                ),
              ),

              // INPUTS
              // INPUTS — PÁGINA 1
              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(subtitle: 'Inputs'),
                    SizedBox(height: 24),
                    InputsPageOneSection(),
                  ],
                ),
              ),

              // INPUTS — PÁGINA 2
              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(subtitle: 'Inputs'),
                    SizedBox(height: 24),
                    InputsPageTwoSection(),
                  ],
                ),
              ),

              // INPUTS — PÁGINA 3
              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(subtitle: 'Inputs'),
                    SizedBox(height: 24),
                    InputsPageThreeSection(),
                  ],
                ),
              ),

              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(subtitle: 'Controles de selección'),
                    SizedBox(height: 24),
                    SelectionControlsSection(),
                  ],
                ),
              ),

              // BOTONES — PÁGINA 1
              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(subtitle: 'Botones'),
                    SizedBox(height: 24),
                    ButtonsPageOneSection(),
                  ],
                ),
              ),

              // BOTONES — PÁGINA 2
              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(subtitle: 'Botones'),
                    SizedBox(height: 24),
                    ButtonsPageTwoSection(),
                  ],
                ),
              ),

              // FEEDBACK — PÁGINA 1
              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(subtitle: 'Feedback'),
                    SizedBox(height: 24),
                    FeedbackPageOneSection(),
                  ],
                ),
              ),

              // FEEDBACK — PÁGINA 2
              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(subtitle: 'Feedback'),
                    SizedBox(height: 24),
                    FeedbackPageTwoSection(),
                  ],
                ),
              ),

              // CONTENEDORES — PÁGINA 1
              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(subtitle: 'Contenedores'),
                    SizedBox(height: 24),
                    ContainersPageOneSection(),
                  ],
                ),
              ),

              // CONTENEDORES — PÁGINA 2
              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(subtitle: 'Contenedores'),
                    SizedBox(height: 24),
                    ContainersPageTwoSection(),
                  ],
                ),
              ),

              // NAVEGACIÓN — PÁGINA 1
              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(subtitle: 'Navegación'),
                    SizedBox(height: 24),
                    NavigationPageOneSection(),
                  ],
                ),
              ),

              // NAVEGACIÓN — PÁGINA 2
              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(subtitle: 'Navegación'),
                    SizedBox(height: 24),
                    NavigationPageTwoSection(),
                  ],
                ),
              ),

              // NAVEGACIÓN — PÁGINA 3
              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(subtitle: 'Navegación'),
                    SizedBox(height: 24),
                    NavigationPageThreeSection(),
                  ],
                ),
              ),

              // OVERLAYS — PÁGINA 1
              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(subtitle: 'Overlays'),
                    SizedBox(height: 24),
                    OverlaysPageOneSection(),
                  ],
                ),
              ),

              // OVERLAYS — PÁGINA 2
              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(subtitle: 'Overlays'),
                    SizedBox(height: 24),
                    OverlaysPageTwoSection(),
                  ],
                ),
              ),

              // DATOS — PÁGINA 1
              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(subtitle: 'Datos'),
                    SizedBox(height: 24),
                    DataPageOneSection(),
                  ],
                ),
              ),

              // DATOS — PÁGINA 2
              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(subtitle: 'Datos'),
                    SizedBox(height: 24),
                    DataPageTwoSection(),
                  ],
                ),
              ),

              // DATOS — PÁGINA 3
              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(subtitle: 'Datos'),
                    SizedBox(height: 24),
                    DataPageThreeSection(),
                  ],
                ),
              ),

              // INDICADORES Y ETIQUETAS
              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(subtitle: 'Indicadores y etiquetas'),
                    SizedBox(height: 24),
                    IndicatorsSection(),
                  ],
                ),
              ),

              // FORMULARIOS — PÁGINA 1
              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(subtitle: 'Formularios completos'),
                    SizedBox(height: 24),
                    FormsPageOneSection(),
                  ],
                ),
              ),

              // FORMULARIOS — PÁGINA 2
              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(subtitle: 'Formularios completos'),
                    SizedBox(height: 24),
                    FormsPageTwoSection(),
                  ],
                ),
              ),

              // FORMULARIOS — PÁGINA 2
              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(subtitle: 'Formularios completos'),
                    SizedBox(height: 24),
                    FormsPageThreeSection(),
                  ],
                ),
              ),

              // PATRONES DE PÁGINA — PÁGINA 1
              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(subtitle: 'Patrones de página'),
                    SizedBox(height: 24),
                    PagePatternsPageOneSection(),
                  ],
                ),
              ),

              // PATRONES DE PÁGINA — PÁGINA 2
              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(subtitle: 'Patrones de página'),
                    SizedBox(height: 24),
                    PagePatternsPageTwoSection(),
                  ],
                ),
              ),

              // PATRONES DE PÁGINA — PÁGINA 3
              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(subtitle: 'Patrones de página'),
                    SizedBox(height: 24),
                    PagePatternsPageThreeSection(),
                  ],
                ),
              ),

              // PATRONES DE PÁGINA — PÁGINA 4
              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(subtitle: 'Patrones de página'),
                    SizedBox(height: 24),
                    PagePatternsPageFourSection(),
                  ],
                ),
              ),

              // ESTADOS DE PÁGINA — PÁGINA 1
              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(subtitle: 'Estados de página'),
                    SizedBox(height: 24),
                    PageStatesPageOneSection(),
                  ],
                ),
              ),

              // ESTADOS DE PÁGINA — PÁGINA 2
              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(subtitle: 'Estados de página'),
                    SizedBox(height: 24),
                    PageStatesPageTwoSection(),
                  ],
                ),
              ),

              // ESTADOS DE PÁGINA — PÁGINA 2
              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(subtitle: 'Estados de página'),
                    SizedBox(height: 24),
                    PageStatesPageThreeSection(),
                  ],
                ),
              ),

              // ACCESIBILIDAD — PÁGINA 1
              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(subtitle: 'Accesibilidad'),
                    SizedBox(height: 24),
                    AccessibilityPageOneSection(),
                  ],
                ),
              ),

              // ACCESIBILIDAD — PÁGINA 2
              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(subtitle: 'Accesibilidad'),
                    SizedBox(height: 24),
                    AccessibilityPageTwoSection(),
                  ],
                ),
              ),

              // REGLAS DE USO — PÁGINA 1
              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(subtitle: 'Reglas de uso'),
                    SizedBox(height: 24),
                    UsageRulesPageOneSection(),
                  ],
                ),
              ),

              // REGLAS DE USO — PÁGINA 2
              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(subtitle: 'Reglas de uso'),
                    SizedBox(height: 24),
                    UsageRulesPageTwoSection(),
                  ],
                ),
              ),

              // REGLAS DE USO — PÁGINA 2
              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(subtitle: 'Reglas de uso'),
                    SizedBox(height: 24),
                    UsageRulesPageThreeSection(),
                  ],
                ),
              ),

              // EJEMPLOS RESPONSIVE — PÁGINA 1
              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(subtitle: 'Ejemplos responsive reales'),
                    SizedBox(height: 24),
                    ResponsiveExamplesPageOneSection(),
                  ],
                ),
              ),

              // EJEMPLOS RESPONSIVE — PÁGINA 2
              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(subtitle: 'Ejemplos responsive reales'),
                    SizedBox(height: 24),
                    ResponsiveExamplesPageTwoSection(),
                  ],
                ),
              ),

              // EJEMPLOS RESPONSIVE — PÁGINA 3
              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(subtitle: 'Ejemplos responsive reales'),
                    SizedBox(height: 24),
                    ResponsiveExamplesPageThreeSection(),
                  ],
                ),
              ),

              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(subtitle: 'Ejemplos responsive reales'),
                    SizedBox(height: 24),
                    ResponsiveExamplesPageFourSection(),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
