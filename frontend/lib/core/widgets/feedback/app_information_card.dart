import 'package:flutter/material.dart';

import '../../../app/theme/app_colors.dart';
import '../overlays/app_dialog.dart';

/// Bloque informativo breve. Si recibe [detalle], el icono abre el contenido
/// completo en un panel adaptable al tamaño del dispositivo.
class AppInformationCard extends StatelessWidget {
  const AppInformationCard({
    super.key,
    required this.texto,
    this.detalle,
    this.etiquetaDetalle = 'Ver informacion completa',
  });

  final String texto;
  final String? detalle;
  final String etiquetaDetalle;

  @override
  Widget build(BuildContext context) {
    final icono = Icon(
      Icons.info_outline,
      color: AppColors.primary,
      semanticLabel: etiquetaDetalle,
    );

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      decoration: BoxDecoration(
        color: const Color(0xFFF4F0FB),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          if (detalle != null)
            IconButton(
              tooltip: etiquetaDetalle,
              onPressed: () => _mostrarDetalle(context),
              icon: icono,
            )
          else
            Padding(padding: const EdgeInsets.all(8), child: icono),
          const SizedBox(width: 8),
          Expanded(
            child: Text(
              texto,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                color: AppColors.textSecondary,
                height: 1.35,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Future<void> _mostrarDetalle(BuildContext context) => AppDialog.show<void>(
    context,
    title: 'Informacion',
    icon: Icons.info_outline,
    maxWidth: 560,
    content: ConstrainedBox(
      constraints: BoxConstraints(
        maxHeight: MediaQuery.sizeOf(context).height * .55,
      ),
      child: SingleChildScrollView(
        child: Text(detalle!, style: Theme.of(context).textTheme.bodyLarge),
      ),
    ),
    actions: [
      TextButton(
        onPressed: () => Navigator.of(context).pop(),
        child: const Text('Cerrar'),
      ),
    ],
  );
}
