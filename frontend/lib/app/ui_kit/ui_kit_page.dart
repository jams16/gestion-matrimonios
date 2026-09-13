import 'package:flutter/material.dart';

import 'sections/foundations_section.dart';
import 'sections/responsive_section.dart';

import 'sections/inputs_section.dart';
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
                    UiKitPageHeader(
                      subtitle: 'Fundamentos visuales',
                    ),
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
                    UiKitPageHeader(
                      subtitle: 'Fundamentos visuales',
                    ),
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
                    UiKitPageHeader(
                      subtitle: 'Responsive',
                    ),
                    SizedBox(height: 24),
                    ResponsiveOnePageSection(),
                  ],
                ),
              ),

              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(
                      subtitle: 'Responsive',
                    ),
                    SizedBox(height: 24),
                    ResponsiveTwoPageSection(),
                  ],
                ),
              ),

              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(
                      subtitle: 'Responsive',
                    ),
                    SizedBox(height: 24),
                    ResponsiveThreePageSection(),
                  ],
                ),
              ),

              // PÁGINA 10
              A4Sheet(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    UiKitPageHeader(
                      subtitle: 'Componentes',
                    ),
                    SizedBox(height: 24),
                    InputsSection(),
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