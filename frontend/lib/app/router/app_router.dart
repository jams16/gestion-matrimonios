import 'package:go_router/go_router.dart';

import '../ui_kit/ui_kit_page.dart';
import 'route_names.dart';

final appRouter = GoRouter(
  initialLocation: RouteNames.uiKit,
  routes: [
    GoRoute(
      path: RouteNames.uiKit,
      builder: (context, state) => const UiKitPage(),
    ),
  ],
);