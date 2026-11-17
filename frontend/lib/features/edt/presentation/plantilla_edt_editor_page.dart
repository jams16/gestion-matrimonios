import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../app/theme/app_colors.dart';
import '../../../app/theme/app_spacing.dart';
import '../../../core/widgets/buttons/app_button.dart';
import '../../../core/widgets/containers/app_card.dart';
import '../../../core/widgets/feedback/app_snackbar.dart';
import '../../../core/widgets/inputs/app_text_field.dart';
import '../../../core/widgets/overlays/app_confirmation_dialog.dart';
import '../application/edt_provider.dart';

class PlantillaEdtEditorPage extends ConsumerStatefulWidget {
  const PlantillaEdtEditorPage({
    required this.idPlantilla,
    required this.nombrePlantilla,
    super.key,
  });

  final String idPlantilla;
  final String nombrePlantilla;

  @override
  ConsumerState<PlantillaEdtEditorPage> createState() =>
      _PlantillaEdtEditorPageState();
}

class _PlantillaEdtEditorPageState
    extends ConsumerState<PlantillaEdtEditorPage> {
  late Future<Map<String, dynamic>> _carga;
  bool _procesando = false;
  final Map<String, int> _ordenesLocales = {};

  @override
  void initState() {
    super.initState();
    _carga = _api.arbol(widget.idPlantilla);
  }

  dynamic get _api => ref.read(edtApiProvider);

  Future<void> _recargar() async {
    setState(() {
      _ordenesLocales.clear();
      _carga = _api.arbol(widget.idPlantilla);
    });
    await _carga;
  }

  Future<void> _ejecutar(
    Future<void> Function() accion,
    String mensaje, {
    bool recargar = true,
    VoidCallback? alCompletar,
  }) async {
    if (_procesando) {
      return;
    }
    setState(() => _procesando = true);
    try {
      await accion();
      if (recargar) {
        await _recargar();
      } else {
        alCompletar?.call();
      }
      if (mounted) {
        AppSnackbar.show(
          context,
          message: mensaje,
          type: AppSnackbarType.success,
        );
      }
    } catch (error) {
      if (mounted) {
        AppSnackbar.show(
          context,
          message: _error(error),
          type: AppSnackbarType.error,
        );
      }
    } finally {
      if (mounted) {
        setState(() => _procesando = false);
      }
    }
  }

  List<_NodoEdt> _aplanar(List<Object?> elementos) {
    final resultado = <_NodoEdt>[];
    void recorrer(Map<String, dynamic> nodo, int nivel) {
      resultado.add(_NodoEdt(nodo: nodo, nivel: nivel));
      final hijos =
          List<Object?>.from(
              nodo['hijos'] as List? ?? const [],
            ).map((item) => Map<String, dynamic>.from(item as Map)).toList()
            ..sort((a, b) => _orden(a).compareTo(_orden(b)));
      for (final hijo in hijos) {
        recorrer(hijo, nivel + 1);
      }
    }

    final raices =
        elementos.map((item) => Map<String, dynamic>.from(item as Map)).toList()
          ..sort((a, b) => _orden(a).compareTo(_orden(b)));
    for (final item in raices) {
      recorrer(item, 0);
    }
    return resultado;
  }

  String _id(Map<String, dynamic> nodo) =>
      nodo['idEdtPlantillaElemento']?.toString() ?? '';

  int _orden(Map<String, dynamic> nodo) =>
      _ordenesLocales[_id(nodo)] ?? (nodo['orden'] as num? ?? 0).toInt();

  String? _padre(Map<String, dynamic> nodo) =>
      nodo['idEdtPlantillaElementoPadre']?.toString();

  Map<String, dynamic> _elemento(Map<String, dynamic> nodo) =>
      nodo['elemento'] is Map
      ? Map<String, dynamic>.from(nodo['elemento'] as Map)
      : const <String, dynamic>{};

  Future<void> _mover(
    _NodoEdt nodo,
    List<_NodoEdt> todos,
    int direccion,
  ) async {
    final hermanos =
        todos.where((item) => _padre(item.nodo) == _padre(nodo.nodo)).toList()
          ..sort((a, b) => _orden(a.nodo).compareTo(_orden(b.nodo)));
    final indice = hermanos.indexWhere(
      (item) => _id(item.nodo) == _id(nodo.nodo),
    );
    final destino = indice + direccion;
    if (indice < 0 || destino < 0 || destino >= hermanos.length) {
      return;
    }
    final reordenados = [...hermanos];
    final movido = reordenados.removeAt(indice);
    reordenados.insert(destino, movido);
    await _guardarOrden(reordenados);
  }

  Future<void> _soltarSobre(
    _NodoEdt origen,
    _NodoEdt destino,
    List<_NodoEdt> todos,
  ) async {
    if (_padre(origen.nodo) != _padre(destino.nodo)) {
      return;
    }
    final hermanos =
        todos.where((item) => _padre(item.nodo) == _padre(origen.nodo)).toList()
          ..sort((a, b) => _orden(a.nodo).compareTo(_orden(b.nodo)));
    final indiceOrigen = hermanos.indexWhere(
      (item) => _id(item.nodo) == _id(origen.nodo),
    );
    final indiceDestino = hermanos.indexWhere(
      (item) => _id(item.nodo) == _id(destino.nodo),
    );
    if (indiceOrigen < 0 ||
        indiceDestino < 0 ||
        indiceOrigen == indiceDestino) {
      return;
    }
    final movido = hermanos.removeAt(indiceOrigen);
    hermanos.insert(indiceDestino, movido);
    await _guardarOrden(hermanos);
  }

  Future<void> _guardarOrden(List<_NodoEdt> hermanos) {
    final ordenes = [
      for (var indice = 0; indice < hermanos.length; indice++)
        {
          'idElementoPlantilla': _id(hermanos[indice].nodo),
          'orden': indice + 1,
        },
    ];
    return _ejecutar(
      () => _api.reordenarElementosPlantilla(widget.idPlantilla, ordenes),
      'Orden de elementos actualizado.',
      recargar: false,
      alCompletar: () {
        for (var indice = 0; indice < hermanos.length; indice++) {
          _ordenesLocales[_id(hermanos[indice].nodo)] = indice + 1;
        }
        setState(() {});
      },
    );
  }

  Future<void> _editarElemento(_NodoEdt nodo) async {
    final elemento = _elemento(nodo.nodo);
    final nombre = TextEditingController(text: elemento['nombre']?.toString());
    final descripcion = TextEditingController(
      text: elemento['descripcion']?.toString(),
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
              'Editar elemento',
              style: Theme.of(
                context,
              ).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w800),
            ),
            const SizedBox(height: AppSpacing.lg),
            AppTextField(
              controller: nombre,
              label: 'Nombre de la sección',
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
              label: 'Guardar cambios',
              icon: Icons.check,
              expanded: true,
              onPressed: () {
                if (nombre.text.trim().isNotEmpty) {
                  Navigator.pop(context, true);
                }
              },
            ),
          ],
        ),
      ),
    );
    if (guardar != true || nombre.text.trim().isEmpty) {
      return;
    }
    await _ejecutar(
      () => _api.actualizarElementoPlantilla(
        widget.idPlantilla,
        _id(nodo.nodo),
        {'nombre': nombre.text.trim(), 'descripcion': descripcion.text.trim()},
      ),
      'Elemento actualizado.',
    );
  }

  Future<void> _agregarSeccion(List<_NodoEdt> todos) async {
    final nombre = TextEditingController();
    final descripcion = TextEditingController();
    String? idPadre;
    final guardar = await showModalBottomSheet<bool>(
      context: context,
      isScrollControlled: true,
      showDragHandle: true,
      builder: (context) => StatefulBuilder(
        builder: (context, setModalState) => Padding(
          padding: EdgeInsets.fromLTRB(
            AppSpacing.lg,
            AppSpacing.sm,
            AppSpacing.lg,
            MediaQuery.viewInsetsOf(context).bottom + AppSpacing.lg,
          ),
          child: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Text(
                  'Agregar sección',
                  style: Theme.of(
                    context,
                  ).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w800),
                ),
                const SizedBox(height: AppSpacing.lg),
                AppTextField(
                  controller: nombre,
                  label: 'Nombre de la sección',
                  required: true,
                  prefixIcon: const Icon(Icons.add_box_outlined),
                ),
                const SizedBox(height: AppSpacing.md),
                AppTextField(
                  controller: descripcion,
                  label: 'Descripción',
                  maxLines: 3,
                  prefixIcon: const Icon(Icons.notes_outlined),
                ),
                const SizedBox(height: AppSpacing.md),
                DropdownButtonFormField<String?>(
                  initialValue: idPadre,
                  isExpanded: true,
                  decoration: const InputDecoration(
                    labelText: 'Sección superior',
                    prefixIcon: Icon(Icons.account_tree_outlined),
                  ),
                  items: [
                    const DropdownMenuItem<String?>(
                      value: null,
                      child: Text('Sin sección superior'),
                    ),
                    ...todos.map(
                      (nodo) => DropdownMenuItem<String?>(
                        value: _id(nodo.nodo),
                        child: Text(
                          '${'   ' * nodo.nivel}${_elemento(nodo.nodo)['nombre'] ?? 'Elemento'}',
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ),
                  ],
                  onChanged: (valor) => setModalState(() => idPadre = valor),
                ),
                const SizedBox(height: AppSpacing.xl),
                AppButton(
                  label: 'Agregar sección',
                  icon: Icons.add,
                  expanded: true,
                  onPressed: () {
                    if (nombre.text.trim().isNotEmpty) {
                      Navigator.pop(context, true);
                    }
                  },
                ),
              ],
            ),
          ),
        ),
      ),
    );
    if (guardar != true || nombre.text.trim().isEmpty) {
      return;
    }
    final hermanos = todos.where((nodo) => _padre(nodo.nodo) == idPadre);
    final siguienteOrden =
        hermanos.fold<int>(
          0,
          (maximo, nodo) => (nodo.nodo['orden'] as num? ?? 0).toInt() > maximo
              ? (nodo.nodo['orden'] as num).toInt()
              : maximo,
        ) +
        1;
    await _ejecutar(() async {
      final creado = await _api.crearElemento({
        'nombre': nombre.text.trim(),
        if (descripcion.text.trim().isNotEmpty)
          'descripcion': descripcion.text.trim(),
      });
      await _api.agregarElementoPlantilla(widget.idPlantilla, {
        'idElemento': creado['idEdtElemento']?.toString(),
        'idPlantillaElementoPadre': ?idPadre,
        'orden': siguienteOrden,
      });
    }, 'Sección agregada.');
  }

  Future<void> _eliminarElemento(_NodoEdt nodo) async {
    final confirmar = await AppConfirmationDialog.show(
      context,
      title: 'Eliminar sección',
      message:
          'Se eliminará esta sección y las subsecciones que contiene de esta plantilla.',
      confirmLabel: 'Eliminar',
      cancelLabel: 'Volver',
      type: AppConfirmationType.destructive,
    );
    if (!confirmar) {
      return;
    }
    await _ejecutar(
      () => _api.eliminarElementoPlantilla(widget.idPlantilla, _id(nodo.nodo)),
      'Sección eliminada.',
    );
  }

  @override
  Widget build(BuildContext context) => FutureBuilder<Map<String, dynamic>>(
    future: _carga,
    builder: (context, snapshot) {
      if (snapshot.connectionState != ConnectionState.done) {
        return const Center(child: CircularProgressIndicator());
      }
      if (snapshot.hasError) {
        return Center(
          child: AppButton(
            label: 'Reintentar',
            icon: Icons.refresh,
            onPressed: _recargar,
          ),
        );
      }
      final elementos = List<Object?>.from(
        snapshot.data?['elementos'] as List? ?? const [],
      );
      final todos = _aplanar(elementos);
      return RefreshIndicator(
        onRefresh: _recargar,
        child: ListView(
          padding: const EdgeInsets.fromLTRB(16, 14, 16, 112),
          children: [
            TextButton.icon(
              onPressed: () => context.pop(),
              icon: const Icon(Icons.arrow_back),
              label: const Text('Volver a plantillas'),
              style: TextButton.styleFrom(alignment: Alignment.centerLeft),
            ),
            const SizedBox(height: AppSpacing.sm),
            Text(
              'Editar elementos',
              style: Theme.of(
                context,
              ).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w800),
            ),
            const SizedBox(height: AppSpacing.xs),
            Text(
              widget.nombrePlantilla,
              style: Theme.of(
                context,
              ).textTheme.bodyLarge?.copyWith(color: AppColors.textSecondary),
            ),
            const SizedBox(height: AppSpacing.md),
            const AppCard(
              backgroundColor: Color(0xFFF4F0FB),
              child: Row(
                children: [
                  Icon(Icons.drag_indicator, color: AppColors.primary),
                  SizedBox(width: AppSpacing.sm),
                  Expanded(
                    child: Text(
                      'Arrastra o usa las flechas para ordenar secciones del mismo nivel.',
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: AppSpacing.lg),
            Align(
              alignment: Alignment.centerRight,
              child: AppButton(
                label: 'Agregar sección',
                icon: Icons.add,
                onPressed: _procesando ? null : () => _agregarSeccion(todos),
              ),
            ),
            const SizedBox(height: AppSpacing.md),
            if (_procesando) ...[
              const LinearProgressIndicator(),
              const SizedBox(height: AppSpacing.md),
            ],
            if (todos.isEmpty)
              const _EdtVacio()
            else
              ...todos.map(
                (nodo) => _ElementoEdtCard(
                  nodo: nodo,
                  procesando: _procesando,
                  puedeSubir: _puedeMover(nodo, todos, -1),
                  puedeBajar: _puedeMover(nodo, todos, 1),
                  onSubir: () => _mover(nodo, todos, -1),
                  onBajar: () => _mover(nodo, todos, 1),
                  onSoltarEncima: (origen) => _soltarSobre(origen, nodo, todos),
                  onEditar: () => _editarElemento(nodo),
                  onEliminar: () => _eliminarElemento(nodo),
                ),
              ),
          ],
        ),
      );
    },
  );

  bool _puedeMover(_NodoEdt nodo, List<_NodoEdt> todos, int direccion) {
    final hermanos =
        todos.where((item) => _padre(item.nodo) == _padre(nodo.nodo)).toList()
          ..sort((a, b) => _orden(a.nodo).compareTo(_orden(b.nodo)));
    final indice = hermanos.indexWhere(
      (item) => _id(item.nodo) == _id(nodo.nodo),
    );
    return indice + direccion >= 0 && indice + direccion < hermanos.length;
  }

  String _error(Object error) {
    if (error is DioException) {
      final data = error.response?.data;
      if (data is Map && data['message'] != null) {
        return data['message'].toString();
      }
    }
    return 'No se pudo actualizar la plantilla.';
  }
}

class _NodoEdt {
  const _NodoEdt({required this.nodo, required this.nivel});
  final Map<String, dynamic> nodo;
  final int nivel;
}

class _ElementoEdtCard extends StatelessWidget {
  const _ElementoEdtCard({
    required this.nodo,
    required this.procesando,
    required this.puedeSubir,
    required this.puedeBajar,
    required this.onSubir,
    required this.onBajar,
    required this.onSoltarEncima,
    required this.onEditar,
    required this.onEliminar,
  });

  final _NodoEdt nodo;
  final bool procesando;
  final bool puedeSubir;
  final bool puedeBajar;
  final VoidCallback onSubir;
  final VoidCallback onBajar;
  final ValueChanged<_NodoEdt> onSoltarEncima;
  final VoidCallback onEditar;
  final VoidCallback onEliminar;

  @override
  Widget build(BuildContext context) {
    final elemento = nodo.nodo['elemento'] is Map
        ? Map<String, dynamic>.from(nodo.nodo['elemento'] as Map)
        : const <String, dynamic>{};
    return Padding(
      padding: EdgeInsets.only(left: nodo.nivel * 12.0, bottom: AppSpacing.sm),
      child: DragTarget<_NodoEdt>(
        onWillAcceptWithDetails: (detalle) =>
            !procesando &&
            detalle.data != nodo &&
            detalle.data.nodo['idEdtPlantillaElementoPadre'] ==
                nodo.nodo['idEdtPlantillaElementoPadre'],
        onAcceptWithDetails: (detalle) => onSoltarEncima(detalle.data),
        builder: (context, candidatos, rechazados) => AppCard(
          borderColor: candidatos.isEmpty
              ? null
              : AppColors.primary.withValues(alpha: 0.75),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Padding(
                padding: const EdgeInsets.only(top: 8),
                child: Draggable<_NodoEdt>(
                  data: nodo,
                  feedback: Material(
                    color: Colors.transparent,
                    child: Icon(
                      Icons.drag_indicator,
                      size: 28,
                      color: AppColors.primary.withValues(alpha: 0.85),
                    ),
                  ),
                  childWhenDragging: const Opacity(
                    opacity: 0.35,
                    child: Icon(Icons.drag_indicator, color: AppColors.primary),
                  ),
                  child: const Tooltip(
                    message: 'Arrastra para reordenar dentro del mismo nivel',
                    child: Icon(Icons.drag_indicator, color: AppColors.primary),
                  ),
                ),
              ),
              const SizedBox(width: AppSpacing.xs),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      elemento['nombre']?.toString() ?? 'Elemento EDT',
                      style: Theme.of(context).textTheme.titleSmall?.copyWith(
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                    if ((elemento['descripcion']
                            ?.toString()
                            .trim()
                            .isNotEmpty ??
                        false)) ...[
                      const SizedBox(height: 3),
                      Text(
                        elemento['descripcion'].toString(),
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                        style: Theme.of(context).textTheme.bodySmall?.copyWith(
                          color: AppColors.textSecondary,
                        ),
                      ),
                    ],
                  ],
                ),
              ),
              IconButton(
                tooltip: 'Subir',
                onPressed: procesando || !puedeSubir ? null : onSubir,
                icon: const Icon(Icons.keyboard_arrow_up),
              ),
              IconButton(
                tooltip: 'Bajar',
                onPressed: procesando || !puedeBajar ? null : onBajar,
                icon: const Icon(Icons.keyboard_arrow_down),
              ),
              PopupMenuButton<String>(
                onSelected: (valor) {
                  if (valor == 'editar') {
                    onEditar();
                  } else {
                    onEliminar();
                  }
                },
                itemBuilder: (_) => const [
                  PopupMenuItem(value: 'editar', child: Text('Editar')),
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
        ),
      ),
    );
  }
}

class _EdtVacio extends StatelessWidget {
  const _EdtVacio();
  @override
  Widget build(BuildContext context) => const AppCard(
    child: Padding(
      padding: EdgeInsets.all(AppSpacing.lg),
      child: Center(child: Text('Aún no hay elementos en esta plantilla.')),
    ),
  );
}
