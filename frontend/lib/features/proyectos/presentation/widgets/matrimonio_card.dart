import 'package:flutter/material.dart';

import '../../../../app/theme/app_colors.dart';
import '../../../../app/theme/app_radius.dart';
import '../../../../app/theme/app_spacing.dart';
import '../../domain/entities/matrimonio_resumen.dart';

class MatrimonioCard extends StatelessWidget {
  const MatrimonioCard({
    super.key,
    required this.matrimonio,
    required this.onTap,
  });

  final MatrimonioResumen matrimonio;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final tema = Theme.of(context);
    return SizedBox(
      width: double.infinity,
      child: Card(
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.all(AppSpacing.lg),
          child: IntrinsicHeight(
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  width: 44,
                  alignment: Alignment.topCenter,
                  child: CircleAvatar(
                    backgroundColor: AppColors.primary.withValues(alpha: 0.12),
                    foregroundColor: AppColors.primary,
                    child: const Icon(Icons.favorite_border),
                  ),
                ),
                const SizedBox(width: AppSpacing.md),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        matrimonio.nombreProyecto,
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                        style: tema.textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                      const SizedBox(height: AppSpacing.md),
                      _MetaRow(
                        icon: Icons.event_outlined,
                        label: _formatearFecha(matrimonio.fechaMatrimonio),
                      ),
                      const SizedBox(height: AppSpacing.sm),
                      _MetaRow(
                        icon: Icons.location_on_outlined,
                        label: matrimonio.ciudadUbicacion,
                      ),
                      const SizedBox(height: AppSpacing.sm),
                      _EstadoChip(estado: matrimonio.estadoProyecto),
                    ],
                  ),
                ),
                const Spacer(),
                const SizedBox(width: AppSpacing.md),
                const Center(
                  child: Icon(
                    Icons.arrow_forward_ios,
                    size: 18,
                    color: AppColors.textSecondary,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
      ),
    );
  }

  static String _formatearFecha(DateTime? fecha) {
    if (fecha == null) return 'Fecha pendiente';
    final dia = fecha.day.toString().padLeft(2, '0');
    final mes = fecha.month.toString().padLeft(2, '0');
    return '$dia/$mes/${fecha.year}';
  }
}

class _EstadoChip extends StatelessWidget {
  const _EstadoChip({required this.estado});
  final String estado;

  @override
  Widget build(BuildContext context) {
    final borrador = estado == 'BORRADOR';
    return Chip(
      visualDensity: VisualDensity.compact,
      side: BorderSide.none,
      shape: const StadiumBorder(),
      backgroundColor: borrador
          ? AppColors.primary.withValues(alpha: 0.12)
          : AppColors.success.withValues(alpha: 0.12),
      label: Text(
        borrador ? 'Borrador' : estado,
        style: TextStyle(
          color: borrador ? AppColors.primary : AppColors.success,
          fontWeight: FontWeight.w700,
        ),
      ),
    );
  }
}

class MatrimoniosEmptyCard extends StatelessWidget {
  const MatrimoniosEmptyCard({super.key});

  @override
  Widget build(BuildContext context) => CustomPaint(
    painter: _DashedBorderPainter(
      color: AppColors.border,
      radius: AppRadius.lg,
    ),
    child: Container(
      width: double.infinity,
      padding: const EdgeInsets.all(AppSpacing.xl),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(AppRadius.lg),
        color: Colors.transparent,
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            Icons.add_home_work_outlined,
            size: 42,
            color: Theme.of(context).colorScheme.primary,
          ),
          const SizedBox(height: AppSpacing.md),
          Text(
            'Aun no tienes matrimonios',
            textAlign: TextAlign.center,
            style: Theme.of(
              context,
            ).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w700),
          ),
          const SizedBox(height: AppSpacing.xs),
          Text(
            'Comienza creando un matrimonio para planificarlo desde aqui.',
            textAlign: TextAlign.center,
            style: Theme.of(context).textTheme.bodyMedium,
          ),
        ],
      ),
    ),
  );
}

class _MetaRow extends StatelessWidget {
  const _MetaRow({required this.icon, required this.label});

  final IconData icon;
  final String label;

  @override
  Widget build(BuildContext context) => Row(
    mainAxisSize: MainAxisSize.min,
    children: [
      Icon(icon, size: 17, color: AppColors.textSecondary),
      const SizedBox(width: AppSpacing.xs),
      Flexible(
        child: Text(
          label,
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
          style: Theme.of(context).textTheme.bodyMedium,
        ),
      ),
    ],
  );
}

class _DashedBorderPainter extends CustomPainter {
  const _DashedBorderPainter({required this.color, required this.radius});

  final Color color;
  final double radius;

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1.4;
    final rect = Offset.zero & size;
    final path = Path()
      ..addRRect(
        RRect.fromRectAndRadius(rect.deflate(0.7), Radius.circular(radius)),
      );

    for (final metric in path.computeMetrics()) {
      double distance = 0;
      while (distance < metric.length) {
        final next = distance + 8;
        canvas.drawPath(metric.extractPath(distance, next), paint);
        distance = next + 6;
      }
    }
  }

  @override
  bool shouldRepaint(covariant _DashedBorderPainter oldDelegate) {
    return oldDelegate.color != color || oldDelegate.radius != radius;
  }
}
