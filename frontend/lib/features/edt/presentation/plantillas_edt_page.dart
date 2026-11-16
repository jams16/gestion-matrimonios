import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../app/theme/app_colors.dart';
import '../../../app/theme/app_spacing.dart';
import '../../../core/widgets/buttons/app_button.dart';
import '../../../core/widgets/containers/app_card.dart';
import '../../../core/widgets/feedback/app_information_card.dart';
import '../../../core/widgets/feedback/app_snackbar.dart';
import '../../../core/widgets/inputs/app_text_field.dart';
import '../../../core/widgets/overlays/app_confirmation_dialog.dart';
import '../../proyectos/application/providers/matrimonios_provider.dart';
import '../application/edt_provider.dart';

class PlantillasEdtPage extends ConsumerStatefulWidget {
  const PlantillasEdtPage({super.key});

  @override
  ConsumerState<PlantillasEdtPage> createState() => _PlantillasEdtPageState();
}

class _PlantillasEdtPageState extends ConsumerState<PlantillasEdtPage> {
  bool _procesando = false;

  Future<void> _recargar() async {
    ref.invalidate(plantillasEdtProvider);
    await ref.read(plantillasEdtProvider.future);
  }

  Future<void> _ejecutar(
    Future<void> Function() accion, {
    required String exito,
  }) async {
    if (_procesando) return;
    setState(() => _procesando = true);
    try {
      await accion();
      await _recargar();
      if (mounted) {
        AppSnackbar.show(
          context,
          message: exito,
          type: AppSnackbarType.success,
        );
      }
    } catch (error) {
      if (mounted) {
        AppSnackbar.show(
          context,
          message: _mensajeError(error),
          type: AppSnackbarType.error,
        );
      }
    } finally {
      if (mounted) setState(() => _procesando = false);
    }
  }

  Future<void> _formPlantilla({Map<String, dynamic>? actual}) async {
    final nombre = TextEditingController(text: actual?['nombre']?.toString());
    final descripcion = TextEditingController(
      text: actual?['descripcion']?.toString(),
    );
    final guardar = await showModalBottomSheet<bool>(
      context: context,
      isScrollControlled: true,
      showDragHandle: true,
      builder: (context) => Padding(
        padding: EdgeInsets.fromLTRB(
          AppSpacing.lg,
          AppSpacing.sm,
          AppSpacing.lg,
          MediaQuery.viewInsetsOf(context).bottom + AppSpacing.lg,
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(
              actual == null ? 'Crear plantilla EDT' : 'Editar plantilla EDT',
              style: Theme.of(
                context,
              ).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w800),
            ),
            const SizedBox(height: AppSpacing.lg),
            AppTextField(
              controller: nombre,
              label: 'Nombre',
              required: true,
              prefixIcon: const Icon(Icons.account_tree_outlined),
            ),
            const SizedBox(height: AppSpacing.md),
            AppTextField(
              controller: descripcion,
              label: 'Descripción',
              maxLines: 3,
              prefixIcon: const Icon(Icons.notes_outlined),
            ),
            const SizedBox(height: AppSpacing.xl),
            AppButton(
              label: 'Guardar',
              icon: Icons.check,
              expanded: true,
              onPressed: () {
                if (nombre.text.trim().isEmpty) return;
                Navigator.pop(context, true);
              },
            ),
          ],
        ),
      ),
    );
    if (guardar != true || nombre.text.trim().isEmpty) return;
    final data = {
      'nombre': nombre.text.trim(),
      if (descripcion.text.trim().isNotEmpty)
        'descripcion': descripcion.text.trim(),
    };
    await _ejecutar(
      () => actual == null
          ? ref.read(edtApiProvider).crearPlantilla(data)
          : ref
                .read(edtApiProvider)
                .actualizarPlantilla(actual['idEdtPlantilla'].toString(), data),
      exito: actual == null
          ? 'Plantilla EDT creada.'
          : 'Plantilla EDT actualizada.',
    );
  }

  Future<void> _verArbol(Map<String, dynamic> plantilla) async {
    try {
      final respuesta = await ref
          .read(edtApiProvider)
          .arbol(plantilla['idEdtPlantilla'].toString());
      if (!mounted) return;
      final elementos = List<Object?>.from(
        respuesta['elementos'] as List? ?? const [],
      ).map((item) => Map<String, dynamic>.from(item as Map)).toList();
      await showModalBottomSheet<void>(
        context: context,
        showDragHandle: true,
        builder: (context) => SafeArea(
          child: SizedBox(
            height: MediaQuery.sizeOf(context).height * .7,
            child: Padding(
              padding: const EdgeInsets.fromLTRB(20, 4, 20, 20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    plantilla['nombre']?.toString() ?? 'Plantilla EDT',
                    style: Theme.of(context).textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.w800,
                    ),
                  ),
                  const SizedBox(height: AppSpacing.xs),
                  Text(
                    'Estructura de la plantilla',
                    style: Theme.of(context).textTheme.bodyMedium,
                  ),
                  const SizedBox(height: AppSpacing.md),
                  Expanded(
                    child: elementos.isEmpty
                        ? const _EstadoSinElementos()
                        : ListView(
                            children: elementos.map(_nodoArbol).toList(),
                          ),
                  ),
                ],
              ),
            ),
          ),
        ),
      );
    } catch (error) {
      if (mounted) {
        AppSnackbar.show(
          context,
          message: _mensajeError(error),
          type: AppSnackbarType.error,
        );
      }
    }
  }

  Widget _nodoArbol(Map<String, dynamic> nodo, [int nivel = 0]) {
    final hijos = List<Object?>.from(
      nodo['hijos'] as List? ?? const [],
    ).map((item) => Map<String, dynamic>.from(item as Map));
    final elemento = nodo['elemento'] is Map
        ? Map<String, dynamic>.from(nodo['elemento'] as Map)
        : const <String, dynamic>{};
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: EdgeInsets.only(left: nivel * 20.0, bottom: 4),
          child: ListTile(
            dense: true,
            contentPadding: EdgeInsets.zero,
            leading: Icon(
              nivel == 0
                  ? Icons.account_tree_outlined
                  : Icons.subdirectory_arrow_right,
              color: AppColors.primary,
            ),
            title: Text(elemento['nombre']?.toString() ?? 'Elemento EDT'),
            subtitle: elemento['descripcion'] == null
                ? null
                : Text(
                    elemento['descripcion'].toString(),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
          ),
        ),
        ...hijos.map((hijo) => _nodoArbol(hijo, nivel + 1)),
      ],
    );
  }

  Future<void> _duplicar(Map<String, dynamic> plantilla) async => _ejecutar(
    () => ref
        .read(edtApiProvider)
        .duplicarPlantilla(plantilla['idEdtPlantilla'].toString()),
    exito: 'Copia creada en Mis plantillas.',
  );

  Future<void> _eliminar(Map<String, dynamic> plantilla) async {
    final confirmar = await AppConfirmationDialog.show(
      context,
      title: 'Eliminar plantilla',
      message:
          'La plantilla dejará de estar disponible. Esta acción no afecta EDT ya creadas para matrimonios.',
      confirmLabel: 'Eliminar',
      cancelLabel: 'Volver',
      type: AppConfirmationType.destructive,
    );
    if (confirmar) {
      await _ejecutar(
        () => ref
            .read(edtApiProvider)
            .eliminarPlantilla(plantilla['idEdtPlantilla'].toString()),
        exito: 'Plantilla EDT eliminada.',
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final plantillas = ref.watch(plantillasEdtProvider);
    final practica = ref.watch(buenaPracticaProvider('GP03'));
    return RefreshIndicator(
      onRefresh: _recargar,
      child: ListView(
        padding: const EdgeInsets.fromLTRB(16, 14, 16, 112),
        children: [
          Text(
            'Plantillas EDT',
            style: Theme.of(
              context,
            ).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w800),
          ),
          const SizedBox(height: AppSpacing.xs),
          Text(
            'Gestiona las estructuras que utilizarás como base para organizar tus matrimonios.',
            style: Theme.of(
              context,
            ).textTheme.bodyMedium?.copyWith(color: AppColors.textSecondary),
          ),
          const SizedBox(height: AppSpacing.md),
          _InformacionGp03(practica: practica),
          const SizedBox(height: AppSpacing.lg),
          const _SelectorPlantillas(),
          const SizedBox(height: AppSpacing.xl),
          plantillas.when(
            loading: () => const Padding(
              padding: EdgeInsets.all(32),
              child: Center(child: CircularProgressIndicator()),
            ),
            error: (error, _) =>
                _ErrorPlantillas(error: error, alReintentar: _recargar),
            data: (items) => _contenido(items),
          ),
        ],
      ),
    );
  }

  Widget _contenido(List<Map<String, dynamic>> items) {
    final global = items
        .where((item) => item['tipo']?.toString() == 'GLOBAL')
        .cast<Map<String, dynamic>>()
        .firstOrNull;
    final propias = items
        .where((item) => item['tipo']?.toString() == 'WP')
        .toList();
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Text(
          'Plantilla global',
          style: Theme.of(
            context,
          ).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800),
        ),
        const SizedBox(height: AppSpacing.sm),
        _PlantillaGlobalCard(
          plantilla: global,
          alVer: global == null ? null : () => _verArbol(global),
          alDuplicar: global == null ? null : () => _duplicar(global),
        ),
        const SizedBox(height: AppSpacing.xl),
        Row(
          children: [
            Expanded(
              child: Text(
                'Mis plantillas',
                style: Theme.of(
                  context,
                ).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800),
              ),
            ),
            AppButton(
              label: 'Crear plantilla EDT',
              icon: Icons.add,
              size: AppButtonSize.small,
              onPressed: _procesando ? null : _formPlantilla,
            ),
          ],
        ),
        const SizedBox(height: AppSpacing.sm),
        if (propias.isEmpty)
          _EstadoVacio(
            alCrear: _procesando ? null : _formPlantilla,
            alDuplicarGlobal: global == null ? null : () => _duplicar(global),
          )
        else
          ...propias.map(
            (plantilla) => Padding(
              padding: const EdgeInsets.only(bottom: AppSpacing.md),
              child: _PlantillaPropiaCard(
                plantilla: plantilla,
                alVer: () => _verArbol(plantilla),
                alEditarElementos: () =>
                    context.push('/plantillas-edt/editor', extra: plantilla),
                alEditar: () => _formPlantilla(actual: plantilla),
                alDuplicar: () => _duplicar(plantilla),
                alEliminar: () => _eliminar(plantilla),
              ),
            ),
          ),
      ],
    );
  }
}

class _SelectorPlantillas extends StatelessWidget {
  const _SelectorPlantillas();
  @override
  Widget build(BuildContext context) => SegmentedButton<String>(
    showSelectedIcon: false,
    segments: const [
      ButtonSegment(
        value: 'edt',
        label: Text('EDT'),
        icon: Icon(Icons.account_tree_outlined),
      ),
      ButtonSegment(value: 'cronograma', label: Text('Cronograma')),
      ButtonSegment(value: 'timing', label: Text('Timing')),
      ButtonSegment(value: 'hitos', label: Text('Hitos')),
    ],
    selected: const {'edt'},
    onSelectionChanged: (_) {},
  );
}

class _InformacionGp03 extends StatelessWidget {
  const _InformacionGp03({required this.practica});
  final AsyncValue<Map<String, dynamic>?> practica;
  @override
  Widget build(BuildContext context) => practica.when(
    loading: () => const AppInformationCard(texto: 'Cargando información...'),
    error: (_, _) => const SizedBox.shrink(),
    data: (item) {
      final detalle =
          item?['aplicacionMatrimonios']?.toString() ??
          item?['aplicacion_matrimonios']?.toString();
      if (detalle == null || detalle.trim().isEmpty) {
        return const SizedBox.shrink();
      }
      return AppInformationCard(texto: detalle, detalle: detalle);
    },
  );
}

class _PlantillaGlobalCard extends StatelessWidget {
  const _PlantillaGlobalCard({
    required this.plantilla,
    this.alVer,
    this.alDuplicar,
  });
  final Map<String, dynamic>? plantilla;
  final VoidCallback? alVer;
  final VoidCallback? alDuplicar;
  @override
  Widget build(BuildContext context) => AppCard(
    elevated: true,
    backgroundColor: const Color(0xFFF4F0FB),
    borderColor: AppColors.primary.withValues(alpha: .25),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            const CircleAvatar(
              backgroundColor: AppColors.primary,
              child: Icon(Icons.auto_awesome_outlined, color: Colors.white),
            ),
            const SizedBox(width: AppSpacing.md),
            Expanded(
              child: Text(
                'EDT general de matrimonio',
                style: Theme.of(
                  context,
                ).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800),
              ),
            ),
            const _EtiquetaGlobal(),
          ],
        ),
        const SizedBox(height: AppSpacing.md),
        const Text(
          'Plantilla base proporcionada por el sistema. Puedes revisarla o crear una copia para personalizarla.',
        ),
        const SizedBox(height: AppSpacing.md),
        Wrap(
          spacing: AppSpacing.sm,
          runSpacing: AppSpacing.sm,
          children: [
            AppButton(
              label: 'Ver',
              variant: AppButtonVariant.tertiary,
              icon: Icons.visibility_outlined,
              onPressed: alVer,
            ),
            AppButton(
              label: 'Duplicar como mi plantilla',
              icon: Icons.copy_outlined,
              onPressed: alDuplicar,
            ),
          ],
        ),
      ],
    ),
  );
}

class _EtiquetaGlobal extends StatelessWidget {
  const _EtiquetaGlobal();
  @override
  Widget build(BuildContext context) => Container(
    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
    decoration: BoxDecoration(
      color: Colors.white.withValues(alpha: .75),
      borderRadius: BorderRadius.circular(99),
    ),
    child: const Text(
      'GLOBAL',
      style: TextStyle(
        color: AppColors.primary,
        fontWeight: FontWeight.w800,
        fontSize: 11,
      ),
    ),
  );
}

class _PlantillaPropiaCard extends StatelessWidget {
  const _PlantillaPropiaCard({
    required this.plantilla,
    required this.alVer,
    required this.alEditar,
    required this.alEditarElementos,
    required this.alDuplicar,
    required this.alEliminar,
  });
  final Map<String, dynamic> plantilla;
  final VoidCallback alVer;
  final VoidCallback alEditar;
  final VoidCallback alEditarElementos;
  final VoidCallback alDuplicar;
  final VoidCallback alEliminar;
  @override
  Widget build(BuildContext context) {
    final fecha =
        plantilla['updatedAt']?.toString() ??
        plantilla['updated_at']?.toString();
    return AppCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(Icons.account_tree_outlined, color: AppColors.primary),
              const SizedBox(width: AppSpacing.sm),
              Expanded(
                child: Text(
                  plantilla['nombre']?.toString() ?? 'Plantilla EDT',
                  style: Theme.of(
                    context,
                  ).textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w800),
                ),
              ),
              PopupMenuButton<String>(
                onSelected: (value) {
                  switch (value) {
                    case 'ver':
                      alVer();
                    case 'editar':
                      alEditar();
                    case 'editarElementos':
                      alEditarElementos();
                    case 'duplicar':
                      alDuplicar();
                    case 'eliminar':
                      alEliminar();
                  }
                },
                itemBuilder: (_) => const [
                  PopupMenuItem(value: 'ver', child: Text('Ver')),
                  PopupMenuItem(value: 'editar', child: Text('Editar')),
                  PopupMenuItem(
                    value: 'editarElementos',
                    child: Text('Editar elementos'),
                  ),
                  PopupMenuItem(value: 'duplicar', child: Text('Duplicar')),
                  PopupMenuItem(
                    value: 'eliminar',
                    child: Text(
                      'Eliminar',
                      style: TextStyle(color: AppColors.error),
                    ),
                  ),
                ],
              ),
            ],
          ),
          if ((plantilla['descripcion']?.toString().trim().isNotEmpty ??
              false)) ...[
            const SizedBox(height: AppSpacing.xs),
            Text(
              plantilla['descripcion'].toString(),
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
              style: Theme.of(
                context,
              ).textTheme.bodyMedium?.copyWith(color: AppColors.textSecondary),
            ),
          ],
          if (fecha != null) ...[
            const SizedBox(height: AppSpacing.sm),
            Row(
              children: [
                const Icon(
                  Icons.schedule_outlined,
                  size: 15,
                  color: AppColors.textSecondary,
                ),
                const SizedBox(width: 5),
                Expanded(
                  child: Text(
                    'Última modificación: $fecha',
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: Theme.of(context).textTheme.bodySmall?.copyWith(
                      color: AppColors.textSecondary,
                    ),
                  ),
                ),
              ],
            ),
          ],
          const SizedBox(height: AppSpacing.sm),
          Wrap(
            spacing: AppSpacing.xs,
            children: [
              TextButton.icon(
                onPressed: alVer,
                icon: const Icon(Icons.visibility_outlined, size: 18),
                label: const Text('Ver'),
              ),
              TextButton.icon(
                onPressed: alEditar,
                icon: const Icon(Icons.edit_outlined, size: 18),
                label: const Text('Editar'),
              ),
              TextButton.icon(
                onPressed: alEditarElementos,
                icon: const Icon(Icons.account_tree_outlined, size: 18),
                label: const Text('Editar elementos'),
              ),
              TextButton.icon(
                onPressed: alDuplicar,
                icon: const Icon(Icons.copy_outlined, size: 18),
                label: const Text('Duplicar'),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _EstadoVacio extends StatelessWidget {
  const _EstadoVacio({this.alCrear, this.alDuplicarGlobal});
  final VoidCallback? alCrear;
  final VoidCallback? alDuplicarGlobal;
  @override
  Widget build(BuildContext context) => AppCard(
    child: Column(
      children: [
        const Icon(
          Icons.account_tree_outlined,
          size: 42,
          color: AppColors.primary,
        ),
        const SizedBox(height: AppSpacing.md),
        Text(
          'Aún no tienes plantillas EDT',
          style: Theme.of(
            context,
          ).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800),
        ),
        const SizedBox(height: AppSpacing.xs),
        Text(
          'Puedes crear una desde cero o duplicar la plantilla global como punto de partida.',
          textAlign: TextAlign.center,
          style: Theme.of(
            context,
          ).textTheme.bodyMedium?.copyWith(color: AppColors.textSecondary),
        ),
        const SizedBox(height: AppSpacing.lg),
        Wrap(
          alignment: WrapAlignment.center,
          spacing: AppSpacing.sm,
          runSpacing: AppSpacing.sm,
          children: [
            AppButton(
              label: 'Crear desde cero',
              icon: Icons.add,
              onPressed: alCrear,
            ),
            AppButton(
              label: 'Duplicar plantilla global',
              variant: AppButtonVariant.secondary,
              icon: Icons.copy_outlined,
              onPressed: alDuplicarGlobal,
            ),
          ],
        ),
      ],
    ),
  );
}

class _EstadoSinElementos extends StatelessWidget {
  const _EstadoSinElementos();
  @override
  Widget build(BuildContext context) =>
      const Center(child: Text('Esta plantilla aún no tiene elementos.'));
}

class _ErrorPlantillas extends StatelessWidget {
  const _ErrorPlantillas({required this.error, required this.alReintentar});
  final Object error;
  final Future<void> Function() alReintentar;
  @override
  Widget build(BuildContext context) => AppCard(
    child: Column(
      children: [
        const Icon(Icons.error_outline, color: AppColors.error, size: 38),
        const SizedBox(height: AppSpacing.sm),
        const Text('No pudimos cargar las plantillas EDT'),
        const SizedBox(height: AppSpacing.sm),
        AppButton(
          label: 'Reintentar',
          variant: AppButtonVariant.secondary,
          icon: Icons.refresh,
          onPressed: () => alReintentar(),
        ),
      ],
    ),
  );
}

String _mensajeError(Object error) {
  if (error is DioException) {
    final data = error.response?.data;
    if (data is Map) {
      return data['message']?.toString() ??
          'No se pudo completar la operación.';
    }
  }
  return 'No se pudo completar la operación.';
}

extension _FirstOrNull<T> on Iterable<T> {
  T? get firstOrNull => isEmpty ? null : first;
}
