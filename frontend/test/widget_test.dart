import 'package:flutter_test/flutter_test.dart';
import 'package:frontend/app/app.dart';

void main() {
  testWidgets('muestra la bienvenida de WeddingApp', (tester) async {
    await tester.pumpWidget(const App());
    await tester.pumpAndSettle();
    expect(find.text('WeddingApp'), findsWidgets);
  });
}
