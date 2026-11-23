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
            backgroundColor: AppColors.surface,
            borderColor: AppColors.primary.withValues(alpha: 0.28),
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
          const SizedBox(height: AppSpacing.md),
          AppCard(
            elevated: true,
            backgroundColor: AppColors.surface,
            borderColor: AppColors.primary.withValues(alpha: 0.28),
            onTap: () => context.go('/presupuesto'),
            child: const Row(
              children: [
                CircleAvatar(
                  radius: 26,
                  backgroundColor: Color(0xFFE9E1F7),
                  child: Icon(
                    Icons.account_balance_wallet_outlined,
                    color: AppColors.primary,
                  ),
                ),
                SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'PRESUPUESTO',
                        style: TextStyle(fontWeight: FontWeight.w800),
                      ),
                      SizedBox(height: 4),
                      Text('Costos, pagos y avance financiero de la boda.'),
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
  String _buscarMesa = '';
  String? _lado;
  bool _ordenAscendente = true;

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
                  _NavegacionInvitados(
                    seleccionado: _tab,
                    onSeleccionar: (tab) => setState(() => _tab = tab),
                  ),
                  const SizedBox(height: AppSpacing.lg),
                  AnimatedSwitcher(
                    duration: const Duration(milliseconds: 240),
                    switchInCurve: Curves.easeOutCubic,
                    switchOutCurve: Curves.easeInCubic,
                    transitionBuilder: (child, animation) => SlideTransition(
                      position: Tween<Offset>(
                        begin: const Offset(0.04, 0),
                        end: Offset.zero,
                      ).animate(animation),
                      child: FadeTransition(opacity: animation, child: child),
                    ),
                    child: _tab == 0
                        ? Column(
                            key: const ValueKey('invitados'),
                            children: [
                              AppSearchField(
                                label: null,
                                hintText: 'Buscar invitado',
                                onChanged: (v) => setState(() => _buscar = v),
                              ),
                              const SizedBox(height: AppSpacing.sm),
                              SingleChildScrollView(
                                scrollDirection: Axis.horizontal,
                                child: Row(
                                  crossAxisAlignment: CrossAxisAlignment.center,
                                  children: [
                                    for (final item in const [
                                      ('Todos', null),
                                      ('Novia', 'NOVIA'),
                                      ('Novio', 'NOVIO'),
                                    ])
                                      Padding(
                                        padding: const EdgeInsets.only(
                                          right: AppSpacing.sm,
                                        ),
                                        child: FilterChip(
                                          label: Text(item.$1),
                                          selected: _lado == item.$2,
                                          onSelected: (_) =>
                                              setState(() => _lado = item.$2),
                                        ),
                                      ),
                                    PopupMenuButton<bool>(
                                      tooltip: 'Ordenar invitados',
                                      onSelected: (valor) => setState(
                                        () => _ordenAscendente = valor,
                                      ),
                                      itemBuilder: (_) => const [
                                        PopupMenuItem(
                                          value: true,
                                          child: Text('Ordenar A-Z'),
                                        ),
                                        PopupMenuItem(
                                          value: false,
                                          child: Text('Ordenar Z-A'),
                                        ),
                                      ],
                                      child: Container(
                                        height: 32,
                                        padding: const EdgeInsets.symmetric(
                                          horizontal: AppSpacing.md,
                                        ),
                                        decoration: BoxDecoration(
                                          color: const Color(0xFFF4F0FB),
                                          borderRadius: BorderRadius.circular(
                                            16,
                                          ),
                                        ),
                                        child: Row(
                                          children: [
                                            Text(
                                              _ordenAscendente
                                                  ? 'Ordenar A-Z'
                                                  : 'Ordenar Z-A',
                                            ),
                                            const SizedBox(
                                              width: AppSpacing.xs,
                                            ),
                                            const Icon(
                                              Icons.arrow_drop_down,
                                              size: 18,
                                            ),
                                          ],
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              const SizedBox(height: AppSpacing.md),
                              lista.when(
                                loading: () => const Padding(
                                  padding: EdgeInsets.all(28),
                                  child: Center(
                                    child: CircularProgressIndicator(),
                                  ),
                                ),
                                error: (e, _) => _EstadoError(e),
                                data: (todos) {
                                  final filtrados =
                                      todos.where((i) {
                                        final p = Map<String, dynamic>.from(
                                          i['personaNatural'] as Map? ??
                                              const {},
                                        );
                                        final texto =
                                            '${p['nombres'] ?? ''} ${p['apellidoPaterno'] ?? ''} ${p['apellidoMaterno'] ?? ''}'
                                                .toLowerCase();
                                        return texto.contains(
                                              _buscar.toLowerCase(),
                                            ) &&
                                            (_lado == null ||
                                                i['ladoRelacion'] == _lado);
                                      }).toList()..sort((a, b) {
                                        final comparacion = _claveOrdenInvitado(
                                          a,
                                        ).compareTo(_claveOrdenInvitado(b));
                                        return _ordenAscendente
                                            ? comparacion
                                            : -comparacion;
                                      });
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
                                            padding: const EdgeInsets.only(
                                              bottom: 8,
                                            ),
                                            child: _InvitadoCard(
                                              matrimonio: m.id,
                                              invitado: i,
                                              editar: () => _editar(m.id, i),
                                              verDetalle: () => context.go(
                                                '/gestion/invitados/${i['idInvitado']}',
                                              ),
                                              refrescar: () => _refrescar(m.id),
                                            ),
                                          ),
                                        )
                                        .toList(),
                                  );
                                },
                              ),
                            ],
                          )
                        : KeyedSubtree(
                            key: const ValueKey('mesas'),
                            child: Column(
                              children: [
                                AppSearchField(
                                  label: null,
                                  hintText: 'Buscar mesa',
                                  onChanged: (v) =>
                                      setState(() => _buscarMesa = v),
                                ),
                                const SizedBox(height: AppSpacing.md),
                                _Mesas(
                                  matrimonio: m.id,
                                  buscar: _buscarMesa,
                                  refrescar: () => _refrescar(m.id),
                                ),
                              ],
                            ),
                          ),
                  ),
                  const SizedBox(height: 96),
                ],
              ),
            ),
            Positioned(
              right: 18,
              bottom: 18,
              child: FloatingActionButton.extended(
                onPressed: () => _acciones(m.id),
                icon: const Icon(Icons.person_add_alt_1_outlined),
                label: const Text('Agregar'),
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
    Map<String, dynamic>? invitado, {
    String? idTitular,
  }) async {
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
    final telefono = TextEditingController(
      text: persona['telefono']?.toString() ?? '',
    );
    final correo = TextEditingController(
      text: persona['correoElectronico']?.toString() ?? '',
    );
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
                AppTextField(
                  label: 'Teléfono',
                  controller: telefono,
                  keyboardType: TextInputType.phone,
                  prefixIcon: const Icon(Icons.phone_outlined),
                ),
                const SizedBox(height: 16),
                AppTextField(
                  label: 'Correo electrónico',
                  controller: correo,
                  keyboardType: TextInputType.emailAddress,
                  prefixIcon: const Icon(Icons.mail_outline),
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
        if (telefono.text.trim().isNotEmpty) 'telefono': telefono.text.trim(),
        if (correo.text.trim().isNotEmpty)
          'correoElectronico': correo.text.trim(),
      },
      'cantidadPases': int.tryParse(pases.text) ?? 1,
      'ladoRelacion': lado,
      'nombreCategoriaRelacion': relacion.text.trim(),
    };
    try {
      final api = ref.read(invitadosApiProvider);
      if (idTitular != null)
        await api.crearAcompanante(matrimonio, idTitular, datos);
      else if (invitado == null)
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

class DetalleInvitadoPage extends ConsumerWidget {
  const DetalleInvitadoPage({
    super.key,
    required this.idProyecto,
    required this.idInvitado,
  });

  final String idProyecto;
  final String idInvitado;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final activo = ref.watch(_matrimonioActivoProvider(idProyecto));
    return activo.when(
      loading: () => const Center(child: CircularProgressIndicator()),
      error: (e, _) => _EstadoError(e),
      data: (matrimonio) {
        final invitado = ref.watch(
          invitadoDetalleProvider((
            matrimonio: matrimonio.id,
            invitado: idInvitado,
          )),
        );
        return invitado.when(
          loading: () => const Center(child: CircularProgressIndicator()),
          error: (e, _) => _EstadoError(e),
          data: (item) => _DetalleInvitadoContenido(
            matrimonio: matrimonio.id,
            invitado: item,
          ),
        );
      },
    );
  }
}

class _DetalleInvitadoContenido extends ConsumerWidget {
  const _DetalleInvitadoContenido({
    required this.matrimonio,
    required this.invitado,
  });

  final String matrimonio;
  final Map<String, dynamic> invitado;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final esTitular = invitado['esTitular'] != false;
    final acompanantes = esTitular
        ? ref.watch(
            acompanantesProvider((
              matrimonio: matrimonio,
              titular: invitado['idInvitado'].toString(),
            )),
          )
        : null;
    final pases = (invitado['cantidadPases'] as num?)?.toInt() ?? 1;
    return ListView(
      padding: const EdgeInsets.all(AppSpacing.lg),
      children: [
        TextButton.icon(
          onPressed: () => context.go('/gestion/invitados'),
          icon: const Icon(Icons.arrow_back),
          label: const Text('Volver a invitados'),
          style: TextButton.styleFrom(alignment: Alignment.centerLeft),
        ),
        const SizedBox(height: AppSpacing.md),
        _FichaInvitado(invitado: invitado),
        const SizedBox(height: AppSpacing.xl),
        Text(
          esTitular ? 'Invitados por pases' : 'Invitado por pase',
          style: Theme.of(
            context,
          ).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800),
        ),
        const SizedBox(height: AppSpacing.xs),
        Text(
          esTitular
              ? 'Este invitado cuenta con $pases pase(s).'
              : 'Este invitado esta vinculado a un titular.',
          style: const TextStyle(color: AppColors.textSecondary),
        ),
        const SizedBox(height: AppSpacing.md),
        if (!esTitular)
          const _EstadoVacioPases(
            mensaje: 'Los acompanantes se administran desde el titular.',
          )
        else
          acompanantes!.when(
            loading: () => const Center(child: CircularProgressIndicator()),
            error: (e, _) => _EstadoError(e),
            data: (items) {
              final disponibles = (pases - 1 - items.length).clamp(0, pases);
              return Column(
                children: [
                  if (items.isNotEmpty)
                    ...items.map(
                      (item) => Padding(
                        padding: const EdgeInsets.only(bottom: AppSpacing.sm),
                        child: _FichaInvitado(invitado: item, compacto: true),
                      ),
                    ),
                  if (items.isEmpty)
                    const _EstadoVacioPases(
                      mensaje: 'Aun no hay invitados registrados por pases.',
                    ),
                  if (disponibles > 0) ...[
                    const SizedBox(height: AppSpacing.sm),
                    Text(
                      '$disponibles pase(s) aun disponible(s).',
                      style: const TextStyle(color: AppColors.textSecondary),
                    ),
                    const SizedBox(height: AppSpacing.md),
                    AppButton(
                      label: 'Agregar invitado por pase',
                      icon: Icons.person_add_alt_1_outlined,
                      variant: AppButtonVariant.secondary,
                      onPressed: () => _agregarPase(context, ref),
                    ),
                  ],
                ],
              );
            },
          ),
      ],
    );
  }

  Future<void> _agregarPase(BuildContext context, WidgetRef ref) async {
    final nombres = TextEditingController();
    final paterno = TextEditingController();
    final dni = TextEditingController();
    final telefono = TextEditingController();
    final correo = TextEditingController();
    final ok = await showDialog<bool>(
      context: context,
      builder: (dialog) => AlertDialog(
        title: const Text('Agregar invitado por pase'),
        content: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              AppTextField(
                label: 'Nombres',
                controller: nombres,
                required: true,
              ),
              const SizedBox(height: AppSpacing.md),
              AppTextField(
                label: 'Apellido paterno',
                controller: paterno,
                required: true,
              ),
              const SizedBox(height: AppSpacing.md),
              AppTextField(
                label: 'DNI',
                controller: dni,
                required: true,
                keyboardType: TextInputType.number,
              ),
              const SizedBox(height: AppSpacing.md),
              AppTextField(
                label: 'Telefono',
                controller: telefono,
                keyboardType: TextInputType.phone,
              ),
              const SizedBox(height: AppSpacing.md),
              AppTextField(
                label: 'Correo electronico',
                controller: correo,
                keyboardType: TextInputType.emailAddress,
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
            label: 'Agregar',
            onPressed: () => Navigator.pop(dialog, true),
          ),
        ],
      ),
    );
    if (ok != true || !context.mounted) return;
    if (nombres.text.trim().isEmpty ||
        paterno.text.trim().isEmpty ||
        dni.text.trim().length != 8) {
      AppSnackbar.show(
        context,
        message: 'Completa nombres, apellido paterno y DNI de 8 digitos.',
        type: AppSnackbarType.error,
      );
      return;
    }
    final persona = Map<String, dynamic>.from(
      invitado['personaNatural'] as Map? ?? const {},
    );
    try {
      await ref.read(invitadosApiProvider).crearAcompanante(
        matrimonio,
        invitado['idInvitado'].toString(),
        {
          'persona': {
            'nombres': nombres.text.trim(),
            'apellidoPaterno': paterno.text.trim(),
            'dni': dni.text.trim(),
            if (telefono.text.trim().isNotEmpty)
              'telefono': telefono.text.trim(),
            if (correo.text.trim().isNotEmpty)
              'correoElectronico': correo.text.trim(),
          },
          'cantidadPases': 1,
          'ladoRelacion': invitado['ladoRelacion'] ?? 'AMBOS',
          'nombreCategoriaRelacion':
              (invitado['categoriaRelacion'] as Map?)?['nombre'] ??
              'Acompanante de ${persona['nombres'] ?? 'invitado'}',
        },
      );
      ref
        ..invalidate(
          acompanantesProvider((
            matrimonio: matrimonio,
            titular: invitado['idInvitado'].toString(),
          )),
        )
        ..invalidate(invitadosListaProvider(matrimonio))
        ..invalidate(invitadosResumenProvider(matrimonio));
      if (context.mounted) {
        AppSnackbar.show(
          context,
          message: 'Invitado por pase agregado.',
          type: AppSnackbarType.success,
        );
      }
    } catch (e) {
      if (context.mounted) {
        AppSnackbar.show(
          context,
          message: 'No se pudo agregar el invitado: ${_mensaje(e)}',
          type: AppSnackbarType.error,
        );
      }
    }
  }
}

class _FichaInvitado extends StatelessWidget {
  const _FichaInvitado({required this.invitado, this.compacto = false});

  final Map<String, dynamic> invitado;
  final bool compacto;

  @override
  Widget build(BuildContext context) {
    final persona = Map<String, dynamic>.from(
      invitado['personaNatural'] as Map? ?? const {},
    );
    final telefono = _textoContacto(persona['telefono']);
    final correo = _textoContacto(persona['correoElectronico']);
    return AppCard(
      elevated: !compacto,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          CircleAvatar(
            radius: compacto ? 20 : 24,
            backgroundColor: AppColors.primary.withValues(alpha: .12),
            child: const Icon(Icons.person_outline, color: AppColors.primary),
          ),
          const SizedBox(width: AppSpacing.md),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  _nombreOrdenadoInvitado(invitado),
                  style: const TextStyle(fontWeight: FontWeight.w800),
                ),
                const SizedBox(height: AppSpacing.xs),
                Text('${invitado['cantidadPases'] ?? 1} pase(s)'),
                if (telefono.isNotEmpty) ...[
                  const SizedBox(height: AppSpacing.sm),
                  _DatoContacto(icono: Icons.phone_outlined, texto: telefono),
                ],
                if (correo.isNotEmpty) ...[
                  const SizedBox(height: AppSpacing.xs),
                  _DatoContacto(icono: Icons.mail_outline, texto: correo),
                ],
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _DatoContacto extends StatelessWidget {
  const _DatoContacto({required this.icono, required this.texto});

  final IconData icono;
  final String texto;

  @override
  Widget build(BuildContext context) => Row(
    children: [
      Icon(icono, size: 16, color: AppColors.textSecondary),
      const SizedBox(width: AppSpacing.xs),
      Expanded(
        child: Text(
          texto,
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
          style: const TextStyle(color: AppColors.textSecondary),
        ),
      ),
    ],
  );
}

class _EstadoVacioPases extends StatelessWidget {
  const _EstadoVacioPases({required this.mensaje});

  final String mensaje;

  @override
  Widget build(BuildContext context) => AppCard(
    child: Row(
      children: [
        const Icon(Icons.group_outlined, color: AppColors.textSecondary),
        const SizedBox(width: AppSpacing.md),
        Expanded(child: Text(mensaje)),
      ],
    ),
  );
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

class _NavegacionInvitados extends StatelessWidget {
  const _NavegacionInvitados({
    required this.seleccionado,
    required this.onSeleccionar,
  });

  final int seleccionado;
  final ValueChanged<int> onSeleccionar;

  @override
  Widget build(BuildContext context) {
    const opciones = [
      (texto: 'Invitados', icono: Icons.groups_outlined),
      (texto: 'Mesas', icono: Icons.table_restaurant_outlined),
    ];
    return ClipRRect(
      borderRadius: BorderRadius.circular(18),
      child: DecoratedBox(
        decoration: BoxDecoration(
          border: Border.all(color: AppColors.textPrimary),
          borderRadius: BorderRadius.circular(18),
        ),
        child: Row(
          children: List.generate(opciones.length, (indice) {
            final seleccionada = indice == seleccionado;
            final opcion = opciones[indice];
            return Expanded(
              flex: seleccionada ? 3 : 2,
              child: Material(
                color: seleccionada ? AppColors.primary : Colors.white,
                child: InkWell(
                  onTap: () => onSeleccionar(indice),
                  child: Container(
                    height: 38,
                    decoration: BoxDecoration(
                      border: indice == opciones.length - 1
                          ? null
                          : const Border(
                              right: BorderSide(color: AppColors.textPrimary),
                            ),
                    ),
                    alignment: Alignment.center,
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(
                          opcion.icono,
                          size: 18,
                          color: seleccionada
                              ? Colors.white
                              : AppColors.textPrimary,
                        ),
                        if (seleccionada) ...[
                          const SizedBox(width: 7),
                          Text(
                            opcion.texto,
                            style: const TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                        ],
                      ],
                    ),
                  ),
                ),
              ),
            );
          }),
        ),
      ),
    );
  }
}

class _Mesas extends ConsumerWidget {
  const _Mesas({
    required this.matrimonio,
    required this.buscar,
    required this.refrescar,
  });
  final String matrimonio;
  final String buscar;
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
      data: (items) {
        final filtradas = items
            .where(
              (mesa) => (mesa['nombre']?.toString() ?? '')
                  .toLowerCase()
                  .contains(buscar.toLowerCase()),
            )
            .toList();
        return filtradas.isEmpty
            ? const Padding(
                padding: EdgeInsets.all(28),
                child: Center(child: Text('Aún no hay mesas registradas.')),
              )
            : Column(
                children: filtradas
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
              );
      },
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
      onTap: () => _verInvitadosMesa(context, ref),
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

  Future<void> _verInvitadosMesa(BuildContext context, WidgetRef ref) =>
      showModalBottomSheet<void>(
        context: context,
        showDragHandle: true,
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
        ),
        builder: (sheet) {
          final asignados = List<Map<String, dynamic>>.from(
            mesa['invitados'] as List? ?? const [],
          );
          return _InvitadosMesaSheet(
            mesa: mesa,
            asignados: asignados,
            retirar: (asignacion) async {
              final invitado = _invitadoDeMesa(asignacion);
              await ref
                  .read(invitadosApiProvider)
                  .retirarDeMesa(
                    matrimonio,
                    mesa['idMesa'].toString(),
                    invitado['idInvitado'].toString(),
                  );
              await refrescar();
            },
          );
        },
      );

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

class _InvitadosMesaSheet extends StatefulWidget {
  const _InvitadosMesaSheet({
    required this.mesa,
    required this.asignados,
    required this.retirar,
  });

  final Map<String, dynamic> mesa;
  final List<Map<String, dynamic>> asignados;
  final Future<void> Function(Map<String, dynamic> asignacion) retirar;

  @override
  State<_InvitadosMesaSheet> createState() => _InvitadosMesaSheetState();
}

class _InvitadosMesaSheetState extends State<_InvitadosMesaSheet> {
  String _buscar = '';
  String? _quitando;

  @override
  Widget build(BuildContext context) {
    final filtrados = widget.asignados.where((asignacion) {
      final invitado = _invitadoDeMesa(asignacion);
      final persona = Map<String, dynamic>.from(
        invitado['personaNatural'] as Map? ?? const {},
      );
      final texto =
          '${persona['apellidoPaterno'] ?? ''} ${persona['nombres'] ?? ''} ${persona['dni'] ?? ''}'
              .toLowerCase();
      return texto.contains(_buscar.toLowerCase());
    }).toList();
    return SafeArea(
      child: SizedBox(
        height: MediaQuery.sizeOf(context).height * .72,
        child: Padding(
          padding: const EdgeInsets.fromLTRB(16, 4, 16, 20),
          child: Column(
            children: [
              Text(
                widget.mesa['nombre']?.toString() ?? 'Mesa',
                style: Theme.of(
                  context,
                ).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800),
              ),
              const SizedBox(height: AppSpacing.md),
              AppSearchField(
                label: null,
                hintText: 'Buscar por nombre o DNI',
                onChanged: (valor) => setState(() => _buscar = valor),
              ),
              const SizedBox(height: AppSpacing.sm),
              Expanded(
                child: filtrados.isEmpty
                    ? const Center(
                        child: Text('No hay invitados que coincidan.'),
                      )
                    : ListView.separated(
                        itemCount: filtrados.length,
                        separatorBuilder: (_, _) => const Divider(height: 1),
                        itemBuilder: (context, index) {
                          final asignacion = filtrados[index];
                          final invitado = _invitadoDeMesa(asignacion);
                          final id = invitado['idInvitado'].toString();
                          final quitando = _quitando == id;
                          return ListTile(
                            leading: const Icon(Icons.person_outline),
                            title: Text(_nombreOrdenadoInvitado(invitado)),
                            subtitle: Text(
                              _dniInvitado(invitado) ??
                                  '${invitado['cantidadPases'] ?? 1} pase(s)',
                            ),
                            trailing: IconButton(
                              tooltip: 'Quitar de la mesa',
                              icon: quitando
                                  ? const SizedBox(
                                      width: 18,
                                      height: 18,
                                      child: CircularProgressIndicator(
                                        strokeWidth: 2,
                                      ),
                                    )
                                  : const Icon(
                                      Icons.person_remove_outlined,
                                      color: AppColors.error,
                                    ),
                              onPressed: quitando
                                  ? null
                                  : () => _quitar(asignacion, id),
                            ),
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

  Future<void> _quitar(Map<String, dynamic> asignacion, String id) async {
    setState(() => _quitando = id);
    try {
      await widget.retirar(asignacion);
      if (mounted) {
        setState(() => widget.asignados.remove(asignacion));
      }
    } catch (e) {
      if (mounted) {
        AppSnackbar.show(
          context,
          message: 'No se pudo quitar el invitado: ${_mensaje(e)}',
          type: AppSnackbarType.error,
        );
      }
    } finally {
      if (mounted) setState(() => _quitando = null);
    }
  }
}

class _InvitadoCard extends ConsumerWidget {
  const _InvitadoCard({
    required this.matrimonio,
    required this.invitado,
    required this.editar,
    required this.verDetalle,
    required this.refrescar,
  });
  final String matrimonio;
  final Map<String, dynamic> invitado;
  final VoidCallback editar;
  final VoidCallback verDetalle;
  final Future<void> Function() refrescar;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final persona = Map<String, dynamic>.from(
      invitado['personaNatural'] as Map? ?? const {},
    );
    final rsvp = Map<String, dynamic>.from(
      invitado['rsvp'] as Map? ?? const {},
    );
    final primera = rsvp['verificacionManual1'] == true;
    final segunda = rsvp['verificacionManual2'] == true;
    final estado = segunda
        ? 'Confirmado · 2.ª confirmación'
        : primera
        ? 'Confirmado · 1.ª confirmación'
        : 'Pendiente de confirmación';
    final color = primera ? Colors.green : Colors.orange;
    return AppCard(
      onTap: verDetalle,
      elevated: true,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          CircleAvatar(
            radius: 24,
            backgroundColor: AppColors.primary.withValues(alpha: .12),
            child: const Icon(Icons.person_outline, color: AppColors.primary),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  _nombreOrdenadoInvitado(invitado),
                  style: const TextStyle(fontWeight: FontWeight.w800),
                ),
                const SizedBox(height: 4),
                Text(
                  '${invitado['cantidadPases'] ?? 1} pase(s) · ${invitado['ladoRelacion'] ?? 'AMBOS'}',
                ),
                if (invitado['idInvitadoTitular'] != null)
                  const Padding(
                    padding: EdgeInsets.only(top: 3),
                    child: Text(
                      'Acompañante vinculado',
                      style: TextStyle(color: AppColors.textSecondary),
                    ),
                  ),
                if (_textoContacto(persona['telefono']).isNotEmpty) ...[
                  const SizedBox(height: 6),
                  _DatoContacto(
                    icono: Icons.phone_outlined,
                    texto: _textoContacto(persona['telefono']),
                  ),
                ],
                if (_textoContacto(
                  persona['correoElectronico'],
                ).isNotEmpty) ...[
                  const SizedBox(height: 4),
                  _DatoContacto(
                    icono: Icons.mail_outline,
                    texto: _textoContacto(persona['correoElectronico']),
                  ),
                ],
                const SizedBox(height: 8),
                Chip(
                  avatar: Icon(
                    primera
                        ? Icons.check_circle_outline
                        : Icons.schedule_outlined,
                    color: color,
                    size: 16,
                  ),
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
            onSelected: (accion) => _accion(context, ref, accion),
            itemBuilder: (_) => _acciones(primera, segunda),
          ),
        ],
      ),
    );
  }

  List<PopupMenuEntry<String>> _acciones(bool primera, bool segunda) => [
    const PopupMenuItem(value: 'editar', child: Text('Editar invitado')),
    if (invitado['esTitular'] != false)
      const PopupMenuItem(
        value: 'pase',
        child: Text('Agregar invitado por pase'),
      ),
    if (!primera)
      const PopupMenuItem(
        value: 'primera',
        child: Text('Primera confirmación'),
      ),
    if (primera && !segunda) ...const [
      PopupMenuItem(value: 'cancelar1', child: Text('Cancelar confirmación')),
      PopupMenuItem(value: 'segunda', child: Text('Segunda confirmación')),
    ],
    if (segunda) ...const [
      PopupMenuItem(value: 'cancelar2', child: Text('Cancelar confirmación')),
    ],
    const PopupMenuItem(value: 'eliminar', child: Text('Desactivar')),
  ];

  Future<void> _accion(
    BuildContext context,
    WidgetRef ref,
    String accion,
  ) async {
    try {
      final api = ref.read(invitadosApiProvider);
      final id = invitado['idInvitado'].toString();
      if (accion == 'editar') return editar();
      if (accion == 'pase') return await _agregarPase(context, ref);
      if (accion == 'primera') {
        await api.actualizarRsvp(matrimonio, id, 'CONFIRMADO');
        await api.verificarRsvp(matrimonio, id, 1);
      }
      if (accion == 'segunda') await api.verificarRsvp(matrimonio, id, 2);
      if (accion == 'cancelar1')
        await api.cancelarConfirmacion(matrimonio, id, 1);
      if (accion == 'cancelar2')
        await api.cancelarConfirmacion(matrimonio, id, 2);
      if (accion == 'eliminar') {
        final ok = await AppConfirmationDialog.show(
          context,
          title: 'Desactivar invitado',
          message: 'El invitado dejará de estar activo en esta boda.',
          confirmLabel: 'Desactivar',
          type: AppConfirmationType.destructive,
        );
        if (ok) await api.desactivar(matrimonio, id);
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

  Future<void> _agregarPase(BuildContext context, WidgetRef ref) async {
    final nombres = TextEditingController();
    final paterno = TextEditingController();
    final dni = TextEditingController();
    final telefono = TextEditingController();
    final correo = TextEditingController();
    final ok = await showDialog<bool>(
      context: context,
      builder: (d) => AlertDialog(
        title: const Text('Agregar invitado por pase'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            AppTextField(label: 'Nombres', controller: nombres, required: true),
            const SizedBox(height: 16),
            AppTextField(
              label: 'Apellido paterno',
              controller: paterno,
              required: true,
            ),
            const SizedBox(height: 16),
            AppTextField(
              label: 'DNI',
              controller: dni,
              required: true,
              keyboardType: TextInputType.number,
            ),
            const SizedBox(height: 16),
            AppTextField(
              label: 'Telefono',
              controller: telefono,
              keyboardType: TextInputType.phone,
            ),
            const SizedBox(height: 16),
            AppTextField(
              label: 'Correo electronico',
              controller: correo,
              keyboardType: TextInputType.emailAddress,
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(d, false),
            child: const Text('Cancelar'),
          ),
          AppButton(label: 'Agregar', onPressed: () => Navigator.pop(d, true)),
        ],
      ),
    );
    if (ok != true || !context.mounted) return;
    if (nombres.text.trim().isEmpty ||
        paterno.text.trim().isEmpty ||
        dni.text.trim().length != 8) {
      AppSnackbar.show(
        context,
        message: 'Completa nombres, apellido paterno y DNI de 8 dígitos.',
        type: AppSnackbarType.error,
      );
      return;
    }
    final persona = Map<String, dynamic>.from(
      invitado['personaNatural'] as Map? ?? const {},
    );
    await ref.read(invitadosApiProvider).crearAcompanante(
      matrimonio,
      invitado['idInvitado'].toString(),
      {
        'persona': {
          'nombres': nombres.text.trim(),
          'apellidoPaterno': paterno.text.trim(),
          'dni': dni.text.trim(),
          if (telefono.text.trim().isNotEmpty) 'telefono': telefono.text.trim(),
          if (correo.text.trim().isNotEmpty)
            'correoElectronico': correo.text.trim(),
        },
        'cantidadPases': 1,
        'ladoRelacion': invitado['ladoRelacion'] ?? 'AMBOS',
        'nombreCategoriaRelacion':
            (invitado['categoriaRelacion'] as Map?)?['nombre'] ??
            'Acompañante de ${persona['nombres'] ?? 'invitado'}',
      },
    );
    await refrescar();
    if (context.mounted)
      AppSnackbar.show(
        context,
        message: 'Invitado por pase agregado.',
        type: AppSnackbarType.success,
      );
  }
}

// ignore: unused_element
class _InvitadoCardLegacy extends ConsumerWidget {
  const _InvitadoCardLegacy({
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

Map<String, dynamic> _invitadoDeMesa(Map<String, dynamic> fila) {
  final invitado = fila['invitado'];
  return invitado is Map
      ? Map<String, dynamic>.from(invitado)
      : Map<String, dynamic>.from(fila);
}

String _nombreOrdenadoInvitado(Map<String, dynamic> invitado) {
  final persona = Map<String, dynamic>.from(
    invitado['personaNatural'] as Map? ?? const {},
  );
  return '${persona['apellidoPaterno'] ?? ''}, ${persona['nombres'] ?? ''}'
      .replaceFirst(RegExp(r'^,\\s*'), '')
      .trim();
}

String? _dniInvitado(Map<String, dynamic> invitado) {
  final persona = Map<String, dynamic>.from(
    invitado['personaNatural'] as Map? ?? const {},
  );
  final dni = _textoContacto(persona['dni']);
  return dni.isEmpty ? null : 'DNI $dni';
}

String _claveOrdenInvitado(Map<String, dynamic> invitado) {
  final persona = Map<String, dynamic>.from(
    invitado['personaNatural'] as Map? ?? const {},
  );
  return '${persona['apellidoPaterno'] ?? ''}, ${persona['nombres'] ?? ''}'
      .toLowerCase();
}

String _textoContacto(Object? valor) => valor?.toString().trim() ?? '';

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
