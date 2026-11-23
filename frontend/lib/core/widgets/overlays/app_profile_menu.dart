import 'package:flutter/material.dart';

import '../../../app/theme/app_colors.dart';
import '../../../app/theme/app_spacing.dart';

enum AppProfileMenuAction {
  miPerfil,
  miStaff,
  riesgos,
  misBodas,
  misPlantillas,
  misProveedores,
  configuraciones,
  cerrarSesion,
}

class AppProfileMenu extends StatelessWidget {
  const AppProfileMenu({
    required this.nombreCompleto,
    required this.onSelected,
    super.key,
  });

  final String nombreCompleto;
  final ValueChanged<AppProfileMenuAction> onSelected;

  @override
  Widget build(BuildContext context) => PopupMenuButton<AppProfileMenuAction>(
    tooltip: 'Menú de perfil',
    icon: const Icon(Icons.account_circle_outlined),
    position: PopupMenuPosition.under,
    offset: const Offset(0, 8),
    constraints: const BoxConstraints(minWidth: 260, maxWidth: 300),
    elevation: 6,
    color: AppColors.surface,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(16),
      side: BorderSide(color: AppColors.border.withValues(alpha: 0.45)),
    ),
    onSelected: onSelected,
    itemBuilder: (context) => [
      PopupMenuItem<AppProfileMenuAction>(
        enabled: false,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                const Icon(
                  Icons.account_circle_outlined,
                  color: AppColors.primary,
                ),
                const SizedBox(width: AppSpacing.sm),
                Expanded(
                  child: Text(
                    nombreCompleto,
                    style: Theme.of(context).textTheme.titleSmall?.copyWith(
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 2),
            Text(
              'Wedding Planner',
              style: Theme.of(context).textTheme.bodySmall,
            ),
          ],
        ),
      ),
      _separador(),
      _item(AppProfileMenuAction.miPerfil, Icons.person_outline, 'Mi Perfil'),
      _item(AppProfileMenuAction.miStaff, Icons.groups_outlined, 'Mi Staff'),
      _item(
        AppProfileMenuAction.riesgos,
        Icons.warning_amber_outlined,
        'Riesgos',
      ),
      _item(AppProfileMenuAction.misBodas, Icons.favorite_border, 'Mis bodas'),
      _item(
        AppProfileMenuAction.misPlantillas,
        Icons.account_tree_outlined,
        'Mis plantillas',
      ),
      _item(
        AppProfileMenuAction.misProveedores,
        Icons.storefront_outlined,
        'Mis proveedores',
      ),
      _item(
        AppProfileMenuAction.configuraciones,
        Icons.settings_outlined,
        'Configuraciones',
      ),
      _separador(),
      const PopupMenuItem<AppProfileMenuAction>(
        value: AppProfileMenuAction.cerrarSesion,
        padding: EdgeInsets.symmetric(horizontal: AppSpacing.sm),
        child: _CerrarSesionItem(),
      ),
    ],
  );

  PopupMenuItem<AppProfileMenuAction> _separador() => PopupMenuItem(
    enabled: false,
    height: 12,
    padding: const EdgeInsets.symmetric(horizontal: AppSpacing.lg),
    child: Divider(height: 1, color: AppColors.border.withValues(alpha: 0.55)),
  );

  PopupMenuItem<AppProfileMenuAction> _item(
    AppProfileMenuAction accion,
    IconData icono,
    String texto,
  ) => PopupMenuItem(
    value: accion,
    child: Row(
      children: [
        Icon(icono, size: 20, color: AppColors.textPrimary),
        const SizedBox(width: AppSpacing.md),
        Text(texto),
      ],
    ),
  );
}

class _CerrarSesionItem extends StatelessWidget {
  const _CerrarSesionItem();

  @override
  Widget build(BuildContext context) => const Row(
    children: [
      Icon(Icons.logout, color: AppColors.error),
      SizedBox(width: AppSpacing.md),
      Text('Cerrar sesión', style: TextStyle(color: AppColors.error)),
    ],
  );
}
