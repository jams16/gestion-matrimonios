import 'package:dio/dio.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../app/theme/app_colors.dart';
import '../../../app/theme/app_spacing.dart';
import '../../../core/widgets/buttons/app_button.dart';
import '../../../core/widgets/containers/app_card.dart';
import '../../../core/widgets/feedback/app_snackbar.dart';
import '../../../core/widgets/inputs/app_date_field.dart';
import '../../../core/widgets/inputs/app_search_field.dart';
import '../../../core/widgets/inputs/app_select_field.dart';
import '../../../core/widgets/inputs/app_text_field.dart';
import '../../../core/widgets/overlays/app_confirmation_dialog.dart';
import '../application/proveedores_provider.dart';

class ProveedoresPage extends ConsumerStatefulWidget {
  const ProveedoresPage({super.key, required this.idProyecto});

  final String idProyecto;

  @override
  ConsumerState<ProveedoresPage> createState() => _ProveedoresPageState();
}

class _ProveedoresPageState extends ConsumerState<ProveedoresPage> {
  String _buscar = '';
  int? _categoria;
  String? _estado;
  bool _procesando = false;

  Future<void> _refrescar(String matrimonio) async {
    ref.invalidate(proveedoresMatrimonioProvider(matrimonio));
    await ref.read(proveedoresMatrimonioProvider(matrimonio).future);
  }

  Future<void> _ejecutar(
    String matrimonio,
    Future<void> Function() accion, {
    required String exito,
  }) async {
    if (_procesando) return;
    setState(() => _procesando = true);
    try {
      await accion();
      await _refrescar(matrimonio);
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

  @override
  Widget build(BuildContext context) {
    final matrimonio = ref.watch(
      proveedorMatrimonioActivoProvider(widget.idProyecto),
    );
    return matrimonio.when(
      loading: () => const Center(child: CircularProgressIndicator()),
      error: (error, _) => _EstadoError(
        error: error,
        alReintentar: () => ref.invalidate(
          proveedorMatrimonioActivoProvider(widget.idProyecto),
        ),
      ),
      data: (actual) {
        final idMatrimonio = actual['idMatrimonio'].toString();
        final proveedores = ref.watch(
          proveedoresMatrimonioProvider(idMatrimonio),
        );
        final categorias = ref.watch(proveedoresCategoriasProvider);
        return Stack(
          children: [
            RefreshIndicator(
              onRefresh: () => _refrescar(idMatrimonio),
              child: ListView(
                padding: const EdgeInsets.fromLTRB(16, 14, 16, 100),
                children: [
                  Text(
                    'PROVEEDORES',
                    style: Theme.of(context).textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.w800,
                    ),
                  ),
                  const SizedBox(height: AppSpacing.md),
                  _ResumenProveedores(proveedores: proveedores),
                  const SizedBox(height: AppSpacing.lg),
                  AppSearchField(
                    label: null,
                    hintText: 'Buscar proveedor o servicio',
                    onChanged: (value) => setState(() => _buscar = value),
                  ),
                  const SizedBox(height: AppSpacing.sm),
                  categorias.when(
                    loading: () => const SizedBox.shrink(),
                    error: (_, _) => const SizedBox.shrink(),
                    data: (items) => _Filtros(
                      categorias: items,
                      categoria: _categoria,
                      estado: _estado,
                      onCategoria: (value) =>
                          setState(() => _categoria = value),
                      onEstado: (value) => setState(() => _estado = value),
                    ),
                  ),
                  const SizedBox(height: AppSpacing.md),
                  proveedores.when(
                    loading: () => const Padding(
                      padding: EdgeInsets.all(32),
                      child: Center(child: CircularProgressIndicator()),
                    ),
                    error: (error, _) => _EstadoError(
                      error: error,
                      alReintentar: () => _refrescar(idMatrimonio),
                    ),
                    data: (items) {
                      final filtrados = _filtrar(items);
                      if (filtrados.isEmpty) {
                        return const _EstadoVacio();
                      }
                      return Column(
                        children: [
                          for (final proveedor in filtrados)
                            Padding(
                              padding: const EdgeInsets.only(bottom: 10),
                              child: _ProveedorCard(
                                proveedor: proveedor,
                                onTap: () => _detalle(idMatrimonio, proveedor),
                                onFavorito: () => _ejecutar(
                                  idMatrimonio,
                                  () => ref
                                      .read(proveedoresApiProvider)
                                      .cambiarFavorito(
                                        idMatrimonio,
                                        proveedor['idProveedor'].toString(),
                                        proveedor['favorito'] != true,
                                      ),
                                  exito: proveedor['favorito'] == true
                                      ? 'Proveedor retirado de favoritos.'
                                      : 'Proveedor agregado a favoritos.',
                                ),
                              ),
                            ),
                        ],
                      );
                    },
                  ),
                ],
              ),
            ),
            Positioned(
              right: 18,
              bottom: 18,
              child: AppButton(
                label: 'Agregar',
                icon: Icons.add_business_outlined,
                loading: _procesando,
                onPressed: () => _accionesAgregar(idMatrimonio),
              ),
            ),
          ],
        );
      },
    );
  }

  List<Map<String, dynamic>> _filtrar(List<Map<String, dynamic>> items) {
    final query = _buscar.trim().toLowerCase();
    return items.where((item) {
      final proveedor = _mapa(item['proveedor']);
      final servicios = _lista(proveedor['servicios']);
      final coincideTexto =
          query.isEmpty ||
          '${proveedor['nombreComercial'] ?? ''} ${servicios.map((x) => x['nombre']).join(' ')}'
              .toLowerCase()
              .contains(query);
      final coincideCategoria =
          _categoria == null ||
          servicios.any(
            (servicio) => servicio['idCategoriaServicio'] == _categoria,
          );
      final coincideEstado =
          _estado == null || item['estadoSeleccion'] == _estado;
      return coincideTexto && coincideCategoria && coincideEstado;
    }).toList();
  }

  Future<void> _accionesAgregar(String matrimonio) async {
    final accion = await showModalBottomSheet<String>(
      context: context,
      showDragHandle: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (sheet) => SafeArea(
        child: Padding(
          padding: const EdgeInsets.fromLTRB(12, 4, 12, 20),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              _AccionAgregar(
                icon: Icons.storefront_outlined,
                titulo: 'Explorar directorio',
                descripcion: 'Asocia un proveedor existente a este matrimonio.',
                onTap: () => Navigator.pop(sheet, 'directorio'),
              ),
              _AccionAgregar(
                icon: Icons.add_business_outlined,
                titulo: 'Registrar proveedor',
                descripcion:
                    'Crea un proveedor global y lo asocia al matrimonio.',
                onTap: () => Navigator.pop(sheet, 'crear'),
              ),
            ],
          ),
        ),
      ),
    );
    if (!mounted || accion == null) return;
    if (accion == 'directorio') await _explorarDirectorio(matrimonio);
    if (accion == 'crear') await _crearProveedor(matrimonio);
  }

  Future<void> _explorarDirectorio(String matrimonio) async {
    final seleccion = await showModalBottomSheet<Map<String, dynamic>>(
      context: context,
      isScrollControlled: true,
      showDragHandle: true,
      builder: (sheet) =>
          _DirectorioSheet(api: ref.read(proveedoresApiProvider)),
    );
    if (!mounted || seleccion == null) return;
    await _ejecutar(
      matrimonio,
      () => ref.read(proveedoresApiProvider).asociar(
        matrimonio,
        seleccion['idProveedor'].toString(),
        const {'estadoSeleccion': 'CONSIDERADO'},
      ),
      exito: 'Proveedor asociado al matrimonio.',
    );
  }

  Future<void> _crearProveedor(String matrimonio) async {
    final categorias = await ref.read(proveedoresCategoriasProvider.future);
    if (!mounted) return;
    final data = await _ProveedorForm.show(context, categorias: categorias);
    if (!mounted || data == null) return;
    await _ejecutar(matrimonio, () async {
      final servicioInicial = data.remove('_servicioInicial');
      final creado = await ref.read(proveedoresApiProvider).crear(data);
      if (servicioInicial is Map) {
        await ref
            .read(proveedoresApiProvider)
            .crearServicio(
              creado['idProveedor'].toString(),
              Map<String, dynamic>.from(servicioInicial),
            );
      }
      await ref.read(proveedoresApiProvider).asociar(
        matrimonio,
        creado['idProveedor'].toString(),
        const {'estadoSeleccion': 'CONSIDERADO'},
      );
    }, exito: 'Proveedor creado y asociado al matrimonio.');
  }

  Future<void> _detalle(String matrimonio, Map<String, dynamic> item) async {
    final proveedor = _mapa(item['proveedor']);
    final accion = await showModalBottomSheet<String>(
      context: context,
      showDragHandle: true,
      isScrollControlled: true,
      builder: (sheet) => _DetalleProveedorSheet(item: item),
    );
    if (!mounted || accion == null) return;
    final idProveedor = item['idProveedor'].toString();
    switch (accion) {
      case 'favorito':
        final esFavorito = item['favorito'] == true;
        await _ejecutar(
          matrimonio,
          () => ref
              .read(proveedoresApiProvider)
              .cambiarFavorito(matrimonio, idProveedor, !esFavorito),
          exito: esFavorito
              ? 'Proveedor retirado de favoritos.'
              : 'Proveedor agregado a favoritos.',
        );
      case 'relacion':
        final data = await _RelacionForm.show(context, item);
        if (data != null && mounted) {
          await _ejecutar(
            matrimonio,
            () => ref
                .read(proveedoresApiProvider)
                .actualizarRelacion(matrimonio, idProveedor, data),
            exito: 'Relación con el matrimonio actualizada.',
          );
        }
      case 'servicio':
        final categorias = ref
            .read(proveedoresCategoriasProvider)
            .maybeWhen(
              data: (items) => items,
              orElse: () => const <Map<String, dynamic>>[],
            );
        final servicio = await _seleccionarServicio(proveedor);
        if (!mounted || servicio == null) return;
        final data = await _ServicioForm.show(
          context,
          categorias,
          servicio: servicio['idProveedorServicio'] == null ? null : servicio,
        );
        if (data != null && mounted) {
          final existente = servicio['idProveedorServicio'] != null;
          await _ejecutar(matrimonio, () {
            final api = ref.read(proveedoresApiProvider);
            return existente
                ? api.actualizarServicio(
                    idProveedor,
                    servicio['idProveedorServicio'].toString(),
                    data,
                  )
                : api.crearServicio(idProveedor, data);
          }, exito: existente ? 'Servicio actualizado.' : 'Servicio agregado.');
        }
      case 'disponibilidad':
        final disponibilidad = await _seleccionarDisponibilidad(idProveedor);
        if (!mounted || disponibilidad == null) return;
        final data = await _DisponibilidadForm.show(
          context,
          disponible: disponibilidad,
        );
        if (data != null && mounted) {
          final existente = disponibilidad['idDisponibilidadProveedor'] != null;
          await _ejecutar(
            matrimonio,
            () {
              final api = ref.read(proveedoresApiProvider);
              return existente
                  ? api.actualizarDisponibilidad(
                      idProveedor,
                      disponibilidad['idDisponibilidadProveedor'].toString(),
                      data,
                    )
                  : api.crearDisponibilidad(idProveedor, data);
            },
            exito: existente
                ? 'Disponibilidad actualizada.'
                : 'Disponibilidad registrada.',
          );
        }
      case 'retirar':
        final confirmar = await AppConfirmationDialog.show(
          context,
          title: 'Retirar proveedor',
          message: 'El proveedor dejará de estar asociado a este matrimonio.',
          cancelLabel: 'Volver',
          confirmLabel: 'Retirar',
        );
        if (confirmar && mounted) {
          await _ejecutar(
            matrimonio,
            () => ref
                .read(proveedoresApiProvider)
                .retirar(matrimonio, idProveedor),
            exito: 'Proveedor retirado del matrimonio.',
          );
        }
      case 'editar':
        final data = await _ProveedorForm.show(context, proveedor: proveedor);
        if (data != null && mounted) {
          data.remove('tipoProveedor');
          data.remove('idPersonaNatural');
          data.remove('idEntidad');
          await _ejecutar(
            matrimonio,
            () => ref
                .read(proveedoresApiProvider)
                .actualizarProveedor(idProveedor, data),
            exito: 'Proveedor actualizado.',
          );
        }
    }
  }

  Future<Map<String, dynamic>?> _seleccionarServicio(
    Map<String, dynamic> proveedor,
  ) => showModalBottomSheet<Map<String, dynamic>>(
    context: context,
    showDragHandle: true,
    builder: (sheet) {
      final servicios = _lista(proveedor['servicios']);
      return SafeArea(
        child: Padding(
          padding: const EdgeInsets.fromLTRB(12, 4, 12, 20),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              ListTile(
                leading: const Icon(Icons.add_circle_outline),
                title: const Text('Agregar servicio'),
                onTap: () => Navigator.pop(sheet, const <String, dynamic>{}),
              ),
              for (final servicio in servicios)
                ListTile(
                  leading: const Icon(Icons.edit_outlined),
                  title: Text(servicio['nombre']?.toString() ?? 'Servicio'),
                  subtitle: Text('S/ ${servicio['costoReferencial'] ?? '—'}'),
                  onTap: () => Navigator.pop(sheet, servicio),
                ),
            ],
          ),
        ),
      );
    },
  );

  Future<Map<String, dynamic>?> _seleccionarDisponibilidad(
    String idProveedor,
  ) async {
    try {
      final items = await ref
          .read(proveedoresApiProvider)
          .disponibilidades(idProveedor);
      if (!mounted) return null;
      return await showModalBottomSheet<Map<String, dynamic>>(
        context: context,
        showDragHandle: true,
        builder: (sheet) => SafeArea(
          child: Padding(
            padding: const EdgeInsets.fromLTRB(12, 4, 12, 20),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                ListTile(
                  leading: const Icon(Icons.add_circle_outline),
                  title: const Text('Registrar nueva fecha'),
                  onTap: () => Navigator.pop(sheet, const <String, dynamic>{}),
                ),
                for (final item in items)
                  ListTile(
                    leading: Icon(
                      item['disponible'] == true
                          ? Icons.event_available_outlined
                          : Icons.event_busy_outlined,
                    ),
                    title: Text(_fechaCorta(item['fecha'])),
                    subtitle: Text(
                      item['disponible'] == true
                          ? 'Disponible'
                          : 'No disponible',
                    ),
                    onTap: () => Navigator.pop(sheet, item),
                  ),
              ],
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
      return null;
    }
  }
}

class _ResumenProveedores extends StatelessWidget {
  const _ResumenProveedores({required this.proveedores});
  final AsyncValue<List<Map<String, dynamic>>> proveedores;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(AppSpacing.lg),
      decoration: BoxDecoration(
        color: const Color(0xFFF4F0FB),
        borderRadius: BorderRadius.circular(16),
      ),
      child: proveedores.when(
        loading: () => const LinearProgressIndicator(
          color: AppColors.primary,
          backgroundColor: Colors.white,
        ),
        error: (_, _) =>
            const Text('No se pudo calcular el resumen de proveedores.'),
        data: (items) {
          final contratados = items
              .where((item) => item['estadoSeleccion'] == 'SELECCIONADO')
              .length;
          final progreso = items.isEmpty ? 0.0 : contratados / items.length;
          return Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Proveedores',
                style: TextStyle(fontWeight: FontWeight.w800),
              ),
              const SizedBox(height: 12),
              LinearProgressIndicator(
                value: progreso,
                minHeight: 8,
                borderRadius: BorderRadius.circular(99),
                color: AppColors.primary,
                backgroundColor: Colors.white,
              ),
              const SizedBox(height: 8),
              Text('$contratados de ${items.length} proveedores contratados'),
              if (items.isNotEmpty)
                Text(
                  '${(progreso * 100).round()}% seleccionados',
                  style: Theme.of(context).textTheme.bodySmall,
                ),
            ],
          );
        },
      ),
    );
  }
}

class _Filtros extends StatelessWidget {
  const _Filtros({
    required this.categorias,
    required this.categoria,
    required this.estado,
    required this.onCategoria,
    required this.onEstado,
  });
  final List<Map<String, dynamic>> categorias;
  final int? categoria;
  final String? estado;
  final ValueChanged<int?> onCategoria;
  final ValueChanged<String?> onEstado;
  @override
  Widget build(BuildContext context) {
    final chips = <Widget>[
      ChoiceChip(
        label: const Text('Todos'),
        selected: categoria == null && estado == null,
        onSelected: (_) {
          onCategoria(null);
          onEstado(null);
        },
      ),
      for (final item in categorias)
        FilterChip(
          label: Text(item['nombre']?.toString() ?? 'Categoría'),
          selected: categoria == item['idCategoriaServicio'],
          onSelected: (_) => onCategoria(
            categoria == item['idCategoriaServicio']
                ? null
                : item['idCategoriaServicio'] as int?,
          ),
        ),
      for (final item in const [
        ('Considerados', 'CONSIDERADO'),
        ('Contratados', 'SELECCIONADO'),
        ('Descartados', 'DESCARTADO'),
      ])
        FilterChip(
          label: Text(item.$1),
          selected: estado == item.$2,
          onSelected: (_) => onEstado(estado == item.$2 ? null : item.$2),
        ),
    ];
    return SizedBox(
      height: 40,
      child: ScrollConfiguration(
        behavior: ScrollConfiguration.of(context).copyWith(
          scrollbars: false,
          dragDevices: const {
            PointerDeviceKind.touch,
            PointerDeviceKind.mouse,
            PointerDeviceKind.trackpad,
            PointerDeviceKind.stylus,
          },
        ),
        child: SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          physics: const AlwaysScrollableScrollPhysics(
            parent: BouncingScrollPhysics(),
          ),
          child: Row(
            children: [
              for (var index = 0; index < chips.length; index++) ...[
                if (index > 0) const SizedBox(width: AppSpacing.sm),
                chips[index],
              ],
            ],
          ),
        ),
      ),
    );
  }
}

class _ProveedorCard extends StatelessWidget {
  const _ProveedorCard({
    required this.proveedor,
    required this.onTap,
    required this.onFavorito,
  });
  final Map<String, dynamic> proveedor;
  final VoidCallback onTap;
  final VoidCallback onFavorito;
  @override
  Widget build(BuildContext context) {
    final global = _mapa(proveedor['proveedor']);
    final servicios = _lista(global['servicios']);
    final categorias = servicios
        .map((s) => _mapa(s['categoria'])['nombre']?.toString())
        .whereType<String>()
        .toSet()
        .join(' · ');
    final precios = servicios
        .map((s) => s['costoReferencial'])
        .where((x) => x != null)
        .join(' · ');
    final estado = proveedor['estadoSeleccion']?.toString() ?? 'CONSIDERADO';
    return AppCard(
      elevated: true,
      onTap: onTap,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          CircleAvatar(
            backgroundColor: const Color(0xFFE9E1F7),
            child: Icon(
              Icons.storefront_outlined,
              color: Theme.of(context).colorScheme.primary,
            ),
          ),
          const SizedBox(width: AppSpacing.md),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Expanded(
                      child: Text(
                        global['nombreComercial']?.toString() ?? 'Proveedor',
                        style: const TextStyle(fontWeight: FontWeight.w800),
                      ),
                    ),
                    _EstadoChip(estado: estado),
                  ],
                ),
                if (categorias.isNotEmpty)
                  Padding(
                    padding: const EdgeInsets.only(top: 4),
                    child: Text(
                      categorias,
                      style: Theme.of(context).textTheme.bodySmall,
                    ),
                  ),
                if (servicios.isNotEmpty)
                  Padding(
                    padding: const EdgeInsets.only(top: 4),
                    child: Text(
                      servicios.map((s) => s['nombre']).join(', '),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                if (precios.isNotEmpty)
                  Padding(
                    padding: const EdgeInsets.only(top: 4),
                    child: Text(
                      'Desde S/ $precios',
                      style: Theme.of(context).textTheme.bodySmall,
                    ),
                  ),
                const SizedBox(height: 8),
                Wrap(
                  spacing: 6,
                  runSpacing: 4,
                  children: [
                    if (proveedor['prioridad'] != null)
                      _MiniChip(label: 'Prioridad ${proveedor['prioridad']}'),
                    _MiniChip(
                      label: _disponibilidad(proveedor['disponibilidadBoda']),
                    ),
                  ],
                ),
              ],
            ),
          ),
          IconButton(
            icon: Icon(
              proveedor['favorito'] == true
                  ? Icons.favorite
                  : Icons.favorite_border,
              color: proveedor['favorito'] == true ? AppColors.error : null,
            ),
            tooltip: 'Favorito',
            onPressed: onFavorito,
          ),
        ],
      ),
    );
  }
}

class _DetalleProveedorSheet extends StatelessWidget {
  const _DetalleProveedorSheet({required this.item});
  final Map<String, dynamic> item;
  @override
  Widget build(BuildContext context) {
    final proveedor = _mapa(item['proveedor']);
    final servicios = _lista(proveedor['servicios']);
    return SafeArea(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(20, 4, 20, 28),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                proveedor['nombreComercial']?.toString() ?? 'Proveedor',
                style: Theme.of(
                  context,
                ).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w800),
              ),
              if ((proveedor['descripcion']?.toString() ?? '').isNotEmpty)
                Padding(
                  padding: const EdgeInsets.only(top: 6),
                  child: Text(proveedor['descripcion'].toString()),
                ),
              const SizedBox(height: 14),
              for (final servicio in servicios)
                ListTile(
                  contentPadding: EdgeInsets.zero,
                  leading: const Icon(Icons.sell_outlined),
                  title: Text(servicio['nombre']?.toString() ?? 'Servicio'),
                  subtitle: Text('S/ ${servicio['costoReferencial'] ?? '—'}'),
                ),
              const Divider(),
              _AccionAgregar(
                icon: Icons.tune_outlined,
                titulo: 'Gestionar relación',
                descripcion: 'Estado, prioridad, favorito y contratación.',
                onTap: () => Navigator.pop(context, 'relacion'),
              ),
              _AccionAgregar(
                icon: item['favorito'] == true
                    ? Icons.favorite_border_outlined
                    : Icons.favorite_outline,
                titulo: item['favorito'] == true
                    ? 'Quitar de favoritos'
                    : 'Agregar a favoritos',
                descripcion:
                    'Marca este proveedor como favorito del matrimonio.',
                onTap: () => Navigator.pop(context, 'favorito'),
              ),
              _AccionAgregar(
                icon: Icons.add_card_outlined,
                titulo: 'Gestionar servicios y paquetes',
                descripcion: 'Agrega o edita servicios, paquetes y costos.',
                onTap: () => Navigator.pop(context, 'servicio'),
              ),
              _AccionAgregar(
                icon: Icons.event_available_outlined,
                titulo: 'Registrar disponibilidad',
                descripcion: 'Indica disponibilidad para una fecha.',
                onTap: () => Navigator.pop(context, 'disponibilidad'),
              ),
              _AccionAgregar(
                icon: Icons.edit_outlined,
                titulo: 'Editar proveedor',
                descripcion: 'Actualiza los datos globales del directorio.',
                onTap: () => Navigator.pop(context, 'editar'),
              ),
              _AccionAgregar(
                icon: Icons.link_off_outlined,
                titulo: 'Retirar del matrimonio',
                descripcion: 'Conserva el proveedor global.',
                onTap: () => Navigator.pop(context, 'retirar'),
                destructive: true,
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _AccionAgregar extends StatelessWidget {
  const _AccionAgregar({
    required this.icon,
    required this.titulo,
    required this.descripcion,
    required this.onTap,
    this.destructive = false,
  });
  final IconData icon;
  final String titulo;
  final String descripcion;
  final VoidCallback onTap;
  final bool destructive;
  @override
  Widget build(BuildContext context) => ListTile(
    leading: Icon(icon, color: destructive ? AppColors.error : null),
    title: Text(
      titulo,
      style: destructive ? const TextStyle(color: AppColors.error) : null,
    ),
    subtitle: Text(descripcion),
    onTap: onTap,
  );
}

class _DirectorioSheet extends StatefulWidget {
  const _DirectorioSheet({required this.api});
  final dynamic api;
  @override
  State<_DirectorioSheet> createState() => _DirectorioSheetState();
}

class _DirectorioSheetState extends State<_DirectorioSheet> {
  String buscar = '';
  @override
  Widget build(BuildContext context) => SafeArea(
    child: Padding(
      padding: const EdgeInsets.fromLTRB(20, 4, 20, 24),
      child: SizedBox(
        height: MediaQuery.sizeOf(context).height * .72,
        child: Column(
          children: [
            const Text(
              'Directorio de proveedores',
              style: TextStyle(fontWeight: FontWeight.w800),
            ),
            const SizedBox(height: 12),
            AppSearchField(
              label: null,
              hintText: 'Buscar en el directorio',
              onChanged: (v) => setState(() => buscar = v),
            ),
            const SizedBox(height: 12),
            Expanded(
              child: FutureBuilder<List<Map<String, dynamic>>>(
                future: widget.api.listar(buscar: buscar),
                builder: (context, snapshot) {
                  if (snapshot.connectionState != ConnectionState.done)
                    return const Center(child: CircularProgressIndicator());
                  if (snapshot.hasError)
                    return const Center(
                      child: Text('No se pudo cargar el directorio.'),
                    );
                  final data = snapshot.data ?? const [];
                  if (data.isEmpty)
                    return const Center(
                      child: Text('No hay proveedores disponibles.'),
                    );
                  return ListView.builder(
                    itemCount: data.length,
                    itemBuilder: (_, index) {
                      final item = data[index];
                      return ListTile(
                        leading: const Icon(Icons.storefront_outlined),
                        title: Text(
                          item['nombreComercial']?.toString() ?? 'Proveedor',
                        ),
                        subtitle: Text(
                          _lista(
                            item['servicios'],
                          ).map((x) => x['nombre']).join(', '),
                        ),
                        trailing: const Icon(Icons.add_circle_outline),
                        onTap: () => Navigator.pop(context, item),
                      );
                    },
                  );
                },
              ),
            ),
          ],
        ),
      ),
    ),
  );
}

class _ProveedorForm {
  static Future<Map<String, dynamic>?> show(
    BuildContext context, {
    Map<String, dynamic>? proveedor,
    List<Map<String, dynamic>> categorias = const [],
  }) async {
    final nombre = TextEditingController(
      text: proveedor?['nombreComercial']?.toString() ?? '',
    );
    final identificador = TextEditingController(
      text: proveedor == null
          ? ''
          : (proveedor['idPersonaNatural'] ?? proveedor['idEntidad'] ?? '')
                .toString(),
    );
    final telefono = TextEditingController(
      text: proveedor?['telefonoContacto']?.toString() ?? '',
    );
    final correo = TextEditingController(
      text: proveedor?['correoContacto']?.toString() ?? '',
    );
    final direccion = TextEditingController(
      text: proveedor?['direccion']?.toString() ?? '',
    );
    final servicio = TextEditingController();
    final costoServicio = TextEditingController();
    var tipo = proveedor?['tipoProveedor']?.toString() ?? 'EMPRESA';
    int? categoriaInicial;
    return showDialog<Map<String, dynamic>>(
      context: context,
      builder: (dialog) => StatefulBuilder(
        builder: (context, setState) => AlertDialog(
          title: Text(
            proveedor == null ? 'Registrar proveedor' : 'Editar proveedor',
          ),
          content: SingleChildScrollView(
            child: SizedBox(
              width: 440,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  if (proveedor == null) ...[
                    AppSelectField<String>(
                      label: 'Tipo de proveedor',
                      initialValue: tipo,
                      options: const [
                        AppSelectOption(value: 'EMPRESA', label: 'Empresa'),
                        AppSelectOption(
                          value: 'PERSONA_NATURAL',
                          label: 'Persona natural',
                        ),
                      ],
                      onChanged: (v) => setState(() => tipo = v ?? tipo),
                    ),
                    const SizedBox(height: 16),
                    AppTextField(
                      label: tipo == 'EMPRESA'
                          ? 'ID de entidad (opcional)'
                          : 'ID de persona natural (opcional)',
                      controller: identificador,
                      prefixIcon: const Icon(Icons.badge_outlined),
                      keyboardType: TextInputType.number,
                    ),
                    const SizedBox(height: 16),
                  ],
                  AppTextField(
                    label: 'Nombre comercial',
                    controller: nombre,
                    prefixIcon: const Icon(Icons.storefront_outlined),
                    required: true,
                  ),
                  const SizedBox(height: 16),
                  AppTextField(
                    label: 'Teléfono',
                    controller: telefono,
                    prefixIcon: const Icon(Icons.phone_outlined),
                    keyboardType: TextInputType.phone,
                  ),
                  const SizedBox(height: 16),
                  AppTextField(
                    label: 'Correo',
                    controller: correo,
                    prefixIcon: const Icon(Icons.email_outlined),
                    keyboardType: TextInputType.emailAddress,
                  ),
                  const SizedBox(height: 16),
                  AppTextField(
                    label: 'Ubicación / dirección',
                    controller: direccion,
                    prefixIcon: const Icon(Icons.location_on_outlined),
                  ),
                  if (proveedor == null) ...[
                    const SizedBox(height: 16),
                    AppSelectField<int>(
                      label: 'Categoría inicial',
                      initialValue: categoriaInicial,
                      options: categorias
                          .map(
                            (item) => AppSelectOption(
                              value: item['idCategoriaServicio'] as int,
                              label: item['nombre']?.toString() ?? 'Categoría',
                            ),
                          )
                          .toList(),
                      hintText: 'Selecciona una categoría',
                      onChanged: (value) =>
                          setState(() => categoriaInicial = value),
                    ),
                    const SizedBox(height: 16),
                    AppTextField(
                      label: 'Servicio o paquete inicial',
                      controller: servicio,
                      prefixIcon: const Icon(Icons.inventory_2_outlined),
                    ),
                    const SizedBox(height: 16),
                    AppTextField(
                      label: 'Costo referencial (S/.)',
                      controller: costoServicio,
                      prefixIcon: const Icon(Icons.payments_outlined),
                      keyboardType: const TextInputType.numberWithOptions(
                        decimal: true,
                      ),
                    ),
                  ],
                ],
              ),
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(dialog),
              child: const Text('Cancelar'),
            ),
            AppButton(
              label: 'Guardar',
              onPressed: () {
                if (nombre.text.trim().isEmpty) {
                  AppSnackbar.show(
                    context,
                    message: 'Ingresa el nombre comercial del proveedor.',
                    type: AppSnackbarType.info,
                  );
                  return;
                }
                final idVinculado = int.tryParse(identificador.text.trim());
                final costo = num.tryParse(costoServicio.text.trim());
                final tieneServicio =
                    servicio.text.trim().isNotEmpty ||
                    categoriaInicial != null ||
                    costoServicio.text.trim().isNotEmpty;
                if (tieneServicio &&
                    (categoriaInicial == null ||
                        servicio.text.trim().isEmpty ||
                        costo == null)) {
                  AppSnackbar.show(
                    context,
                    message:
                        'Completa categoría, servicio y costo; o deja los tres campos vacíos.',
                    type: AppSnackbarType.info,
                  );
                  return;
                }
                Navigator.pop(dialog, {
                  'tipoProveedor': tipo,
                  if (proveedor == null &&
                      idVinculado != null &&
                      tipo == 'EMPRESA')
                    'idEntidad': idVinculado,
                  if (proveedor == null &&
                      idVinculado != null &&
                      tipo == 'PERSONA_NATURAL')
                    'idPersonaNatural': idVinculado,
                  'nombreComercial': nombre.text.trim(),
                  if (telefono.text.trim().isNotEmpty)
                    'telefonoContacto': telefono.text.trim(),
                  if (correo.text.trim().isNotEmpty)
                    'correoContacto': correo.text.trim(),
                  if (direccion.text.trim().isNotEmpty)
                    'direccion': direccion.text.trim(),
                  if (proveedor == null && categoriaInicial != null)
                    '_servicioInicial': {
                      'idCategoriaServicio': categoriaInicial,
                      'nombre': servicio.text.trim(),
                      'costoReferencial': costo,
                      'moneda': 'PEN',
                    },
                });
              },
            ),
          ],
        ),
      ),
    );
  }
}

class _RelacionForm {
  static Future<Map<String, dynamic>?> show(
    BuildContext context,
    Map<String, dynamic> actual,
  ) async {
    var estado = actual['estadoSeleccion']?.toString() ?? 'CONSIDERADO';
    var prioridad = actual['prioridad']?.toString() ?? 'MEDIA';
    var favorito = actual['favorito'] == true;
    return showDialog<Map<String, dynamic>>(
      context: context,
      builder: (dialog) => StatefulBuilder(
        builder: (context, setState) => AlertDialog(
          title: const Text('Relación con el matrimonio'),
          content: SizedBox(
            width: 400,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                AppSelectField<String>(
                  label: 'Estado',
                  initialValue: estado,
                  options: const [
                    AppSelectOption(value: 'CONSIDERADO', label: 'Considerado'),
                    AppSelectOption(
                      value: 'SELECCIONADO',
                      label: 'Contratado / seleccionado',
                    ),
                    AppSelectOption(value: 'DESCARTADO', label: 'Descartado'),
                  ],
                  onChanged: (v) => setState(() => estado = v ?? estado),
                ),
                const SizedBox(height: 16),
                AppSelectField<String>(
                  label: 'Prioridad',
                  initialValue: prioridad,
                  options: const [
                    AppSelectOption(value: 'ALTA', label: 'Alta'),
                    AppSelectOption(value: 'MEDIA', label: 'Media'),
                    AppSelectOption(value: 'BAJA', label: 'Baja'),
                  ],
                  onChanged: (v) => setState(() => prioridad = v ?? prioridad),
                ),
                CheckboxListTile(
                  contentPadding: EdgeInsets.zero,
                  value: favorito,
                  title: const Text('Favorito'),
                  onChanged: (v) => setState(() => favorito = v ?? false),
                ),
              ],
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(dialog),
              child: const Text('Cancelar'),
            ),
            AppButton(
              label: 'Guardar',
              onPressed: () => Navigator.pop(dialog, {
                'estadoSeleccion': estado,
                'prioridad': prioridad,
                'favorito': favorito,
              }),
            ),
          ],
        ),
      ),
    );
  }
}

class _ServicioForm {
  static Future<Map<String, dynamic>?> show(
    BuildContext context,
    List<Map<String, dynamic>> categorias, {
    Map<String, dynamic>? servicio,
  }) async {
    final nombre = TextEditingController(
      text: servicio?['nombre']?.toString() ?? '',
    );
    final costo = TextEditingController(
      text: servicio?['costoReferencial']?.toString() ?? '',
    );
    int? categoria = servicio?['idCategoriaServicio'] as int?;
    return showDialog<Map<String, dynamic>>(
      context: context,
      builder: (dialog) => StatefulBuilder(
        builder: (context, setState) => AlertDialog(
          title: Text(
            servicio == null ? 'Agregar servicio' : 'Editar servicio',
          ),
          content: SizedBox(
            width: 420,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                AppSelectField<int>(
                  label: 'Categoría',
                  initialValue: categoria,
                  options: categorias
                      .map(
                        (x) => AppSelectOption(
                          value: x['idCategoriaServicio'] as int,
                          label: x['nombre']?.toString() ?? 'Categoría',
                        ),
                      )
                      .toList(),
                  onChanged: (v) => setState(() => categoria = v),
                ),
                const SizedBox(height: 16),
                AppTextField(
                  label: 'Nombre del servicio',
                  controller: nombre,
                  required: true,
                ),
                const SizedBox(height: 16),
                AppTextField(
                  label: 'Costo referencial (S/)',
                  controller: costo,
                  keyboardType: const TextInputType.numberWithOptions(
                    decimal: true,
                  ),
                  required: true,
                ),
              ],
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(dialog),
              child: const Text('Cancelar'),
            ),
            AppButton(
              label: 'Guardar',
              onPressed: () {
                final valor = num.tryParse(costo.text);
                if (categoria == null ||
                    nombre.text.trim().isEmpty ||
                    valor == null)
                  return;
                Navigator.pop(dialog, {
                  'idCategoriaServicio': categoria,
                  'nombre': nombre.text.trim(),
                  'costoReferencial': valor,
                  'moneda': 'PEN',
                });
              },
            ),
          ],
        ),
      ),
    );
  }
}

class _DisponibilidadForm {
  static Future<Map<String, dynamic>?> show(
    BuildContext context, {
    Map<String, dynamic>? disponible,
  }) async {
    DateTime? fecha =
        DateTime.tryParse(disponible?['fecha']?.toString() ?? '') ??
        DateTime.now();
    var estaDisponible = disponible?['disponible'] != false;
    return showDialog<Map<String, dynamic>>(
      context: context,
      builder: (dialog) => StatefulBuilder(
        builder: (context, setState) => AlertDialog(
          title: const Text('Registrar disponibilidad'),
          content: SizedBox(
            width: 400,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                AppDateField(
                  label: 'Fecha',
                  initialDate: fecha,
                  firstDate: DateTime.now(),
                  onChanged: (v) => fecha = v,
                ),
                SwitchListTile(
                  contentPadding: EdgeInsets.zero,
                  title: const Text('Disponible'),
                  value: estaDisponible,
                  onChanged: (v) => setState(() => estaDisponible = v),
                ),
              ],
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(dialog),
              child: const Text('Cancelar'),
            ),
            AppButton(
              label: 'Guardar',
              onPressed: () {
                if (fecha == null) return;
                Navigator.pop(dialog, {
                  'fecha': fecha!.toIso8601String(),
                  'disponible': estaDisponible,
                });
              },
            ),
          ],
        ),
      ),
    );
  }
}

class _EstadoChip extends StatelessWidget {
  const _EstadoChip({required this.estado});
  final String estado;
  @override
  Widget build(BuildContext context) {
    final (label, color) = switch (estado) {
      'SELECCIONADO' => ('Contratado', Colors.green),
      'DESCARTADO' => ('Descartado', AppColors.error),
      _ => ('Considerado', AppColors.primary),
    };
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: color.withValues(alpha: .12),
        borderRadius: BorderRadius.circular(99),
      ),
      child: Text(
        label,
        style: TextStyle(
          fontSize: 11,
          color: color,
          fontWeight: FontWeight.w700,
        ),
      ),
    );
  }
}

class _MiniChip extends StatelessWidget {
  const _MiniChip({required this.label});
  final String label;
  @override
  Widget build(BuildContext context) => Container(
    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
    decoration: BoxDecoration(
      color: AppColors.background,
      borderRadius: BorderRadius.circular(99),
    ),
    child: Text(label, style: Theme.of(context).textTheme.labelSmall),
  );
}

class _EstadoVacio extends StatelessWidget {
  const _EstadoVacio();
  @override
  Widget build(BuildContext context) => const Padding(
    padding: EdgeInsets.all(36),
    child: Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(Icons.storefront_outlined, size: 42),
          SizedBox(height: 12),
          Text('Aún no hay proveedores asociados.'),
          SizedBox(height: 4),
          Text(
            'Usa Agregar para explorar el directorio.',
            textAlign: TextAlign.center,
          ),
        ],
      ),
    ),
  );
}

class _EstadoError extends StatelessWidget {
  const _EstadoError({required this.error, required this.alReintentar});
  final Object error;
  final VoidCallback alReintentar;
  @override
  Widget build(BuildContext context) => Padding(
    padding: const EdgeInsets.all(28),
    child: Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Icon(Icons.error_outline, color: AppColors.error, size: 38),
          const SizedBox(height: 10),
          const Text('No se pudieron cargar los proveedores.'),
          const SizedBox(height: 10),
          AppButton(
            label: 'Reintentar',
            icon: Icons.refresh,
            onPressed: alReintentar,
          ),
        ],
      ),
    ),
  );
}

Map<String, dynamic> _mapa(Object? value) =>
    value is Map ? Map<String, dynamic>.from(value) : const {};
List<Map<String, dynamic>> _lista(Object? value) => List<Object?>.from(
  value as List? ?? const [],
).whereType<Map>().map((x) => Map<String, dynamic>.from(x)).toList();
String _disponibilidad(Object? value) => switch (value?.toString()) {
  'DISPONIBLE' => 'Disponible para la boda',
  'NO_DISPONIBLE' => 'No disponible para la boda',
  _ => 'Disponibilidad pendiente',
};
String _fechaCorta(Object? value) {
  final fecha = DateTime.tryParse(value?.toString() ?? '');
  if (fecha == null) return 'Fecha sin definir';
  return '${fecha.day.toString().padLeft(2, '0')}/${fecha.month.toString().padLeft(2, '0')}/${fecha.year}';
}

String _mensajeError(Object error) {
  if (error is DioException) {
    final data = error.response?.data;
    if (data is Map)
      return (data['mensaje'] ??
              data['message'] ??
              'No se pudo completar la operación.')
          .toString();
  }
  return error.toString().replaceFirst('Exception: ', '');
}
