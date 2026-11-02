import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../app/theme/app_colors.dart';
import '../../../app/theme/app_spacing.dart';
import '../../../core/widgets/buttons/app_button.dart';
import '../../../core/widgets/containers/app_card.dart';
import '../../../core/widgets/feedback/app_snackbar.dart';
import '../../../core/widgets/inputs/app_search_field.dart';
import '../../../core/widgets/inputs/app_text_field.dart';
import '../../../core/widgets/overlays/app_confirmation_dialog.dart';
import '../../cronograma/application/providers/cronograma_provider.dart';
import '../application/invitados_provider.dart';

class GestionPage extends ConsumerWidget {
  const GestionPage({super.key, required this.idProyecto});
  final String idProyecto;
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final activo = ref.watch(_matrimonioActivoProvider(idProyecto));
    return activo.when(
      loading: () => const Center(child: CircularProgressIndicator()),
      error: (e, _) => _EstadoError(e),
      data: (m) => ListView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        children: [
          Text(
            'GESTIÓN',
            style: Theme.of(
              context,
            ).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w800),
          ),
          const SizedBox(height: AppSpacing.md),
          _Resumen(resumen: ref.watch(invitadosResumenProvider(m.id))),
          const SizedBox(height: AppSpacing.lg),
          AppCard(
            elevated: true,
            onTap: () => context.go('/gestion/invitados'),
            child: const Row(
              children: [
                CircleAvatar(
                  radius: 26,
                  backgroundColor: Color(0xFFE9E1F7),
                  child: Icon(Icons.groups_outlined, color: AppColors.primary),
                ),
                SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'INVITADOS',
                        style: TextStyle(fontWeight: FontWeight.w800),
                      ),
                      SizedBox(height: 4),
                      Text('RSVP, pases, mesas y requerimientos alimentarios.'),
                    ],
                  ),
                ),
                Icon(Icons.chevron_right),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class ListaInvitadosPage extends ConsumerStatefulWidget {
  const ListaInvitadosPage({super.key, required this.idProyecto});
  final String idProyecto;
  @override
  ConsumerState<ListaInvitadosPage> createState() => _ListaInvitadosPageState();
}

class _ListaInvitadosPageState extends ConsumerState<ListaInvitadosPage> {
  int _tab = 0;
  String _buscar = '';
  String? _lado;

  Future<void> _refrescar(String matrimonio) async {
    ref.invalidate(invitadosListaProvider(matrimonio));
    ref.invalidate(invitadosResumenProvider(matrimonio));
    ref.invalidate(mesasProvider(matrimonio));
    await ref.read(invitadosListaProvider(matrimonio).future);
  }

  @override
  Widget build(BuildContext context) {
    final activo = ref.watch(_matrimonioActivoProvider(widget.idProyecto));
    return activo.when(
      loading: () => const Center(child: CircularProgressIndicator()),
      error: (e, _) => _EstadoError(e),
      data: (m) {
        final lista = ref.watch(invitadosListaProvider(m.id));
        return Stack(
          children: [
            RefreshIndicator(
              onRefresh: () => _refrescar(m.id),
              child: ListView(
                padding: const EdgeInsets.all(AppSpacing.lg),
                children: [
                  Row(
                    children: [
                      IconButton(
                        onPressed: () => context.go('/gestion'),
                        icon: const Icon(Icons.arrow_back),
                      ),
                      const SizedBox(width: 8),
                      Text(
                        'Lista de invitados',
                        style: Theme.of(context).textTheme.titleLarge?.copyWith(
                          fontWeight: FontWeight.w800,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: AppSpacing.md),
                  _Resumen(resumen: ref.watch(invitadosResumenProvider(m.id))),
                  const SizedBox(height: AppSpacing.lg),
                  _Tabs(
                    tab: _tab,
                    onChanged: (tab) => setState(() => _tab = tab),
                  ),
                  const Divider(
                    height: 1,
                    thickness: 1,
                    color: Color(0xFF29252F),
                  ),
                  const SizedBox(height: AppSpacing.sm),
                  if (_tab == 0) ...[
                    AppSearchField(
                      label: null,
                      hintText: 'Buscar invitado',
                      onChanged: (v) => setState(() => _buscar = v),
                    ),
                    const SizedBox(height: AppSpacing.sm),
                    Wrap(
                      spacing: 8,
                      children: [
                        for (final item in const [
                          ('Todos', null),
                          ('Novia', 'NOVIA'),
                          ('Novio', 'NOVIO'),
                          ('Ambos', 'AMBOS'),
                        ])
                          FilterChip(
                            label: Text(item.$1),
                            selected: _lado == item.$2,
                            onSelected: (_) => setState(() => _lado = item.$2),
                          ),
                      ],
                    ),
                    const SizedBox(height: AppSpacing.md),
                    lista.when(
                      loading: () => const Padding(
                        padding: EdgeInsets.all(28),
                        child: Center(child: CircularProgressIndicator()),
                      ),
                      error: (e, _) => _EstadoError(e),
                      data: (todos) {
                        final filtrados = todos.where((i) {
                          final p = Map<String, dynamic>.from(
                            i['personaNatural'] as Map? ?? const {},
                          );
                          final texto =
                              '${p['nombres'] ?? ''} ${p['apellidoPaterno'] ?? ''} ${p['apellidoMaterno'] ?? ''}'
                                  .toLowerCase();
                          return texto.contains(_buscar.toLowerCase()) &&
                              (_lado == null || i['ladoRelacion'] == _lado);
                        }).toList();
                        if (filtrados.isEmpty)
                          return const Padding(
                            padding: EdgeInsets.all(32),
                            child: Center(
                              child: Text(
                                'Aún no hay invitados que coincidan.',
                              ),
                            ),
                          );
                        return Column(
                          children: filtrados
                              .map(
                                (i) => Padding(
                                  padding: const EdgeInsets.only(bottom: 8),
                                  child: _InvitadoCard(
                                    matrimonio: m.id,
                                    invitado: i,
                                    editar: () => _editar(m.id, i),
                                    refrescar: () => _refrescar(m.id),
                                  ),
                                ),
                              )
                              .toList(),
                        );
                      },
                    ),
                  ] else
                    _Mesas(matrimonio: m.id, refrescar: () => _refrescar(m.id)),
                  const SizedBox(height: 96),
                ],
              ),
            ),
            Positioned(
              right: AppSpacing.lg,
              bottom: AppSpacing.lg,
              child: AppButton(
                label: 'Agregar',
                icon: Icons.add_circle_outline,
                onPressed: () => _acciones(m.id),
              ),
            ),
          ],
        );
      },
    );
  }

  Future<void> _acciones(String matrimonio) async {
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
              _Accion(
                icon: Icons.person_add_alt_1_outlined,
                titulo: 'Crear invitado',
                descripcion: 'Registra datos, pases y relación con la pareja.',
                onTap: () => Navigator.pop(sheet, 'invitado'),
              ),
              _Accion(
                icon: Icons.table_restaurant_outlined,
                titulo: 'Crear mesa',
                descripcion: 'Organiza la distribución de invitados.',
                onTap: () => Navigator.pop(sheet, 'mesa'),
              ),
              _Accion(
                icon: Icons.upload_file_outlined,
                titulo: 'Importar invitados',
                descripcion:
                    'Carga una lista cuando esté disponible el servicio.',
                onTap: () => Navigator.pop(sheet, 'importar'),
              ),
            ],
          ),
        ),
      ),
    );
    if (!mounted || accion == null) return;
    if (accion == 'invitado') await _editar(matrimonio, null);
    if (accion == 'mesa') await _crearMesa(matrimonio);
    if (accion == 'importar' && mounted)
      AppSnackbar.show(
        context,
        message: 'La importación estará disponible al habilitar carga masiva.',
        type: AppSnackbarType.info,
      );
  }

  Future<void> _editar(
    String matrimonio,
    Map<String, dynamic>? invitado,
  ) async {
    final persona = Map<String, dynamic>.from(
      invitado?['personaNatural'] as Map? ?? const {},
    );
    final nombres = TextEditingController(
      text: persona['nombres']?.toString() ?? '',
    );
    final paterno = TextEditingController(
      text: persona['apellidoPaterno']?.toString() ?? '',
    );
    final dni = TextEditingController(text: persona['dni']?.toString() ?? '');
    final pases = TextEditingController(
      text: '${invitado?['cantidadPases'] ?? 1}',
    );
    final relacion = TextEditingController(
      text:
          (invitado?['categoriaRelacion'] as Map?)?['nombre']?.toString() ?? '',
    );
    var lado = invitado?['ladoRelacion']?.toString() ?? 'AMBOS';
    final ok = await showDialog<bool>(
      context: context,
      builder: (dialog) => StatefulBuilder(
        builder: (context, setDialogState) => AlertDialog(
          title: Text(
            invitado == null ? 'Agregar invitado' : 'Editar invitado',
          ),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                AppTextField(
                  label: 'Nombres',
                  controller: nombres,
                  required: true,
                  prefixIcon: const Icon(Icons.person_outline),
                ),
                const SizedBox(height: 16),
                AppTextField(
                  label: 'Apellido paterno',
                  controller: paterno,
                  required: true,
                  prefixIcon: const Icon(Icons.badge_outlined),
                ),
                const SizedBox(height: 16),
                AppTextField(
                  label: 'DNI',
                  controller: dni,
                  required: true,
                  keyboardType: TextInputType.number,
                  prefixIcon: const Icon(Icons.credit_card_outlined),
                ),
                const SizedBox(height: 16),
                DropdownButtonFormField<String>(
                  value: lado,
                  isExpanded: true,
                  decoration: const InputDecoration(
                    labelText: '¿De quién es invitado?',
                  ),
                  items: const [
                    DropdownMenuItem(value: 'NOVIA', child: Text('Novia')),
                    DropdownMenuItem(value: 'NOVIO', child: Text('Novio')),
                    DropdownMenuItem(value: 'AMBOS', child: Text('Ambos')),
                  ],
                  onChanged: (v) => setDialogState(() => lado = v ?? 'AMBOS'),
                ),
                const SizedBox(height: 16),
                AppTextField(
                  label: 'Relación con la pareja',
                  controller: relacion,
                  required: true,
                  hintText: 'Padrino, tío, amiga, prima…',
                  prefixIcon: const Icon(Icons.family_restroom_outlined),
                ),
                const SizedBox(height: 16),
                AppTextField(
                  label: 'Número de pases',
                  controller: pases,
                  keyboardType: TextInputType.number,
                  prefixIcon: const Icon(Icons.confirmation_number_outlined),
                ),
              ],
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(dialog, false),
              child: const Text('Cancelar'),
            ),
            AppButton(
              label: 'Guardar',
              onPressed: () => Navigator.pop(dialog, true),
            ),
          ],
        ),
      ),
    );
    if (ok != true || !mounted) return;
    if (nombres.text.trim().isEmpty ||
        paterno.text.trim().isEmpty ||
        dni.text.trim().length != 8 ||
        relacion.text.trim().isEmpty) {
      AppSnackbar.show(
        context,
        message:
            'Completa nombres, apellido paterno, DNI de 8 dígitos y relación.',
        type: AppSnackbarType.error,
      );
      return;
    }
    final datos = {
      'persona': {
        'nombres': nombres.text.trim(),
        'apellidoPaterno': paterno.text.trim(),
        'dni': dni.text.trim(),
      },
      'cantidadPases': int.tryParse(pases.text) ?? 1,
      'ladoRelacion': lado,
      'nombreCategoriaRelacion': relacion.text.trim(),
    };
    try {
      final api = ref.read(invitadosApiProvider);
      if (invitado == null)
        await api.crear(matrimonio, datos);
      else
        await api.actualizar(
          matrimonio,
          invitado['idInvitado'].toString(),
          datos,
        );
      await _refrescar(matrimonio);
      if (mounted)
        AppSnackbar.show(
          context,
          message: 'Invitado guardado correctamente.',
          type: AppSnackbarType.success,
        );
    } catch (e) {
      if (mounted)
        AppSnackbar.show(
          context,
          message: 'No se pudo guardar el invitado: ${_mensaje(e)}',
          type: AppSnackbarType.error,
        );
    }
  }

  Future<void> _crearMesa(String matrimonio) async {
    final nombre = TextEditingController();
    final capacidad = TextEditingController(text: '8');
    final ok = await showDialog<bool>(
      context: context,
      builder: (d) => AlertDialog(
        title: const Text('Agregar mesa'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            AppTextField(
              label: 'Nombre de mesa',
              controller: nombre,
              required: true,
              prefixIcon: const Icon(Icons.table_restaurant_outlined),
            ),
            const SizedBox(height: 16),
            AppTextField(
              label: 'Capacidad',
              controller: capacidad,
              required: true,
              keyboardType: TextInputType.number,
              prefixIcon: const Icon(Icons.people_outline),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(d, false),
            child: const Text('Cancelar'),
          ),
          AppButton(label: 'Guardar', onPressed: () => Navigator.pop(d, true)),
        ],
      ),
    );
    if (ok != true || !mounted) return;
    try {
      await ref.read(invitadosApiProvider).crearMesa(matrimonio, {
        'nombre': nombre.text.trim(),
        'capacidad': int.tryParse(capacidad.text) ?? 1,
      });
      await _refrescar(matrimonio);
      if (mounted)
        AppSnackbar.show(
          context,
          message: 'Mesa creada correctamente.',
          type: AppSnackbarType.success,
        );
    } catch (e) {
      if (mounted)
        AppSnackbar.show(
          context,
          message: 'No se pudo crear la mesa: ${_mensaje(e)}',
          type: AppSnackbarType.error,
        );
    }
  }
}

class _Resumen extends StatelessWidget {
  const _Resumen({required this.resumen});
  final AsyncValue<Map<String, dynamic>> resumen;
  @override
  Widget build(BuildContext context) => Container(
    width: double.infinity,
    padding: const EdgeInsets.all(AppSpacing.lg),
    decoration: BoxDecoration(
      color: const Color(0xFFF4F0FB),
      borderRadius: BorderRadius.circular(16),
    ),
    child: resumen.when(
      loading: () => const LinearProgressIndicator(),
      error: (_, _) => const Text('No se pudo cargar el resumen de invitados.'),
      data: (r) {
        final total = (r['total_invitados'] as num?)?.toInt() ?? 0;
        final confirmados = (r['confirmados'] as num?)?.toInt() ?? 0;
        final pendientes = (r['pendientes'] as num?)?.toInt() ?? 0;
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Invitados',
              style: TextStyle(fontWeight: FontWeight.w800),
            ),
            const SizedBox(height: 12),
            LinearProgressIndicator(
              value: total == 0 ? 0 : confirmados / total,
              minHeight: 8,
              color: AppColors.primary,
              backgroundColor: Colors.white,
              borderRadius: BorderRadius.circular(8),
            ),
            const SizedBox(height: 8),
            Text(
              total == 0
                  ? 'Aún no registras invitados.'
                  : '$confirmados / $total confirmados · $pendientes pendientes',
            ),
          ],
        );
      },
    ),
  );
}

class _Tabs extends StatelessWidget {
  const _Tabs({required this.tab, required this.onChanged});
  final int tab;
  final ValueChanged<int> onChanged;
  @override
  Widget build(BuildContext context) => Row(
    children: [
      Expanded(child: _item(0, Icons.groups_outlined, 'Invitados')),
      Expanded(child: _item(1, Icons.table_restaurant_outlined, 'Mesas')),
    ],
  );
  Widget _item(int id, IconData icono, String titulo) {
    final seleccionado = id == tab;
    return InkWell(
      onTap: () => onChanged(id),
      child: Padding(
        padding: const EdgeInsets.only(top: 10),
        child: Column(
          children: [
            Icon(
              icono,
              color: seleccionado ? AppColors.primary : AppColors.textSecondary,
            ),
            const SizedBox(height: 4),
            Text(
              titulo,
              style: TextStyle(
                color: seleccionado
                    ? AppColors.primary
                    : AppColors.textSecondary,
                fontWeight: seleccionado ? FontWeight.w700 : null,
              ),
            ),
            const SizedBox(height: 8),
            Container(
              height: 3,
              color: seleccionado ? AppColors.primary : Colors.transparent,
            ),
          ],
        ),
      ),
    );
  }
}

class _Mesas extends ConsumerWidget {
  const _Mesas({required this.matrimonio, required this.refrescar});
  final String matrimonio;
  final Future<void> Function() refrescar;
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final mesas = ref.watch(mesasProvider(matrimonio));
    final invitadosAsync = ref.watch(invitadosListaProvider(matrimonio));
    final invitados = invitadosAsync.when(
      data: (items) => items,
      loading: () => const <Map<String, dynamic>>[],
      error: (_, _) => const <Map<String, dynamic>>[],
    );
    return mesas.when(
      loading: () => const Center(child: CircularProgressIndicator()),
      error: (e, _) => _EstadoError(e),
      data: (items) => items.isEmpty
          ? const Padding(
              padding: EdgeInsets.all(28),
              child: Center(child: Text('Aún no hay mesas registradas.')),
            )
          : Column(
              children: items
                  .map(
                    (m) => Padding(
                      padding: const EdgeInsets.only(bottom: 10),
                      child: _MesaCard(
                        mesa: m,
                        matrimonio: matrimonio,
                        invitados: invitados,
                        refrescar: refrescar,
                      ),
                    ),
                  )
                  .toList(),
            ),
    );
  }
}

class _MesaCard extends ConsumerWidget {
  const _MesaCard({
    required this.mesa,
    required this.matrimonio,
    required this.invitados,
    required this.refrescar,
  });
  final Map<String, dynamic> mesa;
  final String matrimonio;
  final List<Map<String, dynamic>> invitados;
  final Future<void> Function() refrescar;
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final ocupados = (mesa['ocupados'] as num?)?.toInt() ?? 0;
    final capacidad = (mesa['capacidad'] as num?)?.toInt() ?? 0;
    return AppCard(
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const CircleAvatar(
            backgroundColor: Color(0xFFE9E1F7),
            child: Icon(
              Icons.table_restaurant_outlined,
              color: AppColors.primary,
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  mesa['nombre']?.toString() ?? 'Mesa',
                  style: const TextStyle(fontWeight: FontWeight.w800),
                ),
                const SizedBox(height: 4),
                Text('$ocupados de $capacidad lugares ocupados'),
                const SizedBox(height: 8),
                LinearProgressIndicator(
                  value: capacidad == 0 ? 0 : ocupados / capacidad,
                  minHeight: 6,
                  color: AppColors.primary,
                  backgroundColor: const Color(0xFFF4F0FB),
                  borderRadius: BorderRadius.circular(8),
                ),
              ],
            ),
          ),
          PopupMenuButton<String>(
            onSelected: (a) => _accion(context, ref, a),
            itemBuilder: (_) => const [
              PopupMenuItem(value: 'asignar', child: Text('Agregar invitado')),
              PopupMenuItem(value: 'editar', child: Text('Editar mesa')),
              PopupMenuItem(value: 'eliminar', child: Text('Eliminar mesa')),
            ],
          ),
        ],
      ),
    );
  }

  Future<void> _accion(
    BuildContext context,
    WidgetRef ref,
    String accion,
  ) async {
    final api = ref.read(invitadosApiProvider);
    try {
      if (accion == 'asignar') {
        final seleccionado = await showModalBottomSheet<Map<String, dynamic>>(
          context: context,
          showDragHandle: true,
          builder: (sheet) => SafeArea(
            child: ListView(
              shrinkWrap: true,
              children: invitados.where((i) => i['mesa'] == null).map((i) {
                final p = Map<String, dynamic>.from(
                  i['personaNatural'] as Map? ?? const {},
                );
                return ListTile(
                  leading: const Icon(Icons.person_outline),
                  title: Text(
                    '${p['nombres'] ?? ''} ${p['apellidoPaterno'] ?? ''}',
                  ),
                  onTap: () => Navigator.pop(sheet, i),
                );
              }).toList(),
            ),
          ),
        );
        if (seleccionado == null) return;
        await api.asignarAMesa(
          matrimonio,
          mesa['idMesa'].toString(),
          seleccionado['idInvitado'].toString(),
        );
      } else if (accion == 'eliminar') {
        final ok = await AppConfirmationDialog.show(
          context,
          title: 'Eliminar mesa',
          message: 'La mesa se desactivará si no tiene invitados asignados.',
          confirmLabel: 'Eliminar',
          type: AppConfirmationType.destructive,
        );
        if (!ok) return;
        await api.desactivarMesa(matrimonio, mesa['idMesa'].toString());
      } else {
        final nombre = TextEditingController(
          text: mesa['nombre']?.toString() ?? '',
        );
        final capacidad = TextEditingController(
          text: '${mesa['capacidad'] ?? 1}',
        );
        final ok = await showDialog<bool>(
          context: context,
          builder: (d) => AlertDialog(
            title: const Text('Editar mesa'),
            content: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                AppTextField(label: 'Nombre de mesa', controller: nombre),
                const SizedBox(height: 16),
                AppTextField(
                  label: 'Capacidad',
                  controller: capacidad,
                  keyboardType: TextInputType.number,
                ),
              ],
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(d, false),
                child: const Text('Cancelar'),
              ),
              AppButton(
                label: 'Guardar',
                onPressed: () => Navigator.pop(d, true),
              ),
            ],
          ),
        );
        if (ok != true) return;
        await api.actualizarMesa(matrimonio, mesa['idMesa'].toString(), {
          'nombre': nombre.text.trim(),
          'capacidad': int.tryParse(capacidad.text) ?? 1,
        });
      }
      await refrescar();
      if (context.mounted)
        AppSnackbar.show(
          context,
          message: 'Mesa actualizada correctamente.',
          type: AppSnackbarType.success,
        );
    } catch (e) {
      if (context.mounted)
        AppSnackbar.show(
          context,
          message: 'No se pudo actualizar la mesa: ${_mensaje(e)}',
          type: AppSnackbarType.error,
        );
    }
  }
}

class _InvitadoCard extends ConsumerWidget {
  const _InvitadoCard({
    required this.matrimonio,
    required this.invitado,
    required this.editar,
    required this.refrescar,
  });
  final String matrimonio;
  final Map<String, dynamic> invitado;
  final VoidCallback editar;
  final Future<void> Function() refrescar;
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final p = Map<String, dynamic>.from(
      invitado['personaNatural'] as Map? ?? const {},
    );
    final rsvp = Map<String, dynamic>.from(
      invitado['rsvp'] as Map? ?? const {},
    );
    final estado = rsvp['estadoRsvp']?.toString() ?? 'PENDIENTE';
    final color = estado == 'CONFIRMADO'
        ? Colors.green
        : estado == 'NO_ASISTE'
        ? AppColors.error
        : Colors.orange;
    return AppCard(
      onTap: editar,
      child: Row(
        children: [
          CircleAvatar(
            backgroundColor: AppColors.primary.withValues(alpha: .12),
            child: const Icon(Icons.person_outline, color: AppColors.primary),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  '${p['nombres'] ?? ''} ${p['apellidoPaterno'] ?? ''}',
                  style: const TextStyle(fontWeight: FontWeight.w700),
                ),
                const SizedBox(height: 3),
                Text(
                  '${invitado['cantidadPases'] ?? 1} pase(s) · ${invitado['ladoRelacion'] ?? 'AMBOS'}',
                ),
                const SizedBox(height: 5),
                Chip(
                  label: Text(estado),
                  visualDensity: VisualDensity.compact,
                  labelStyle: TextStyle(
                    color: color,
                    fontWeight: FontWeight.w700,
                  ),
                  backgroundColor: color.withValues(alpha: .1),
                  side: BorderSide.none,
                ),
              ],
            ),
          ),
          PopupMenuButton<String>(
            onSelected: (a) => _accion(context, ref, a),
            itemBuilder: (_) => const [
              PopupMenuItem(value: 'editar', child: Text('Editar')),
              PopupMenuItem(value: 'confirmar', child: Text('Confirmar RSVP')),
              PopupMenuItem(
                value: 'verificar',
                child: Text('Primera reconfirmación'),
              ),
              PopupMenuItem(value: 'eliminar', child: Text('Desactivar')),
            ],
          ),
        ],
      ),
    );
  }

  Future<void> _accion(
    BuildContext context,
    WidgetRef ref,
    String accion,
  ) async {
    try {
      final api = ref.read(invitadosApiProvider);
      if (accion == 'editar') return editar();
      if (accion == 'confirmar')
        await api.actualizarRsvp(
          matrimonio,
          invitado['idInvitado'].toString(),
          'CONFIRMADO',
        );
      if (accion == 'verificar')
        await api.verificarRsvp(
          matrimonio,
          invitado['idInvitado'].toString(),
          1,
        );
      if (accion == 'eliminar') {
        final ok = await AppConfirmationDialog.show(
          context,
          title: 'Desactivar invitado',
          message: 'El invitado dejará de estar activo en esta boda.',
          confirmLabel: 'Desactivar',
          type: AppConfirmationType.destructive,
        );
        if (ok)
          await api.desactivar(matrimonio, invitado['idInvitado'].toString());
      }
      await refrescar();
    } catch (e) {
      if (context.mounted)
        AppSnackbar.show(
          context,
          message: 'No se pudo actualizar el invitado: ${_mensaje(e)}',
          type: AppSnackbarType.error,
        );
    }
  }
}

class _Accion extends StatelessWidget {
  const _Accion({
    required this.icon,
    required this.titulo,
    required this.descripcion,
    required this.onTap,
  });
  final IconData icon;
  final String titulo;
  final String descripcion;
  final VoidCallback onTap;
  @override
  Widget build(BuildContext context) => ListTile(
    leading: Icon(icon),
    title: Text(titulo),
    subtitle: Text(descripcion),
    onTap: onTap,
  );
}

class _MatrimonioActivo {
  const _MatrimonioActivo(this.id);
  final String id;
}

final _matrimonioActivoProvider = FutureProvider.autoDispose
    .family<_MatrimonioActivo, String>((ref, proyecto) async {
      final raw = await ref
          .watch(cronogramaApiProvider)
          .obtenerMatrimonio(proyecto);
      final m = raw['matrimonio'] is Map
          ? Map<String, dynamic>.from(raw['matrimonio'] as Map)
          : raw;
      final id = (m['idMatrimonio'] ?? m['id_matrimonio'])?.toString();
      if (id == null || id.isEmpty)
        throw StateError('No se encontró el matrimonio activo.');
      return _MatrimonioActivo(id);
    });

class _EstadoError extends StatelessWidget {
  const _EstadoError(this.error);
  final Object error;
  @override
  Widget build(BuildContext context) => Center(
    child: Padding(
      padding: const EdgeInsets.all(24),
      child: Text(
        'No se pudo cargar Gestión.\n$error',
        textAlign: TextAlign.center,
      ),
    ),
  );
}

String _mensaje(Object error) {
  final match = RegExp(r'message: ?([^,}]+)').firstMatch(error.toString());
  return match?.group(1)?.replaceAll("'", '') ??
      error.toString().replaceFirst('Exception: ', '');
}
