import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../../app/theme/app_colors.dart';
import '../../../../core/widgets/buttons/app_button.dart';
import '../../../../core/widgets/feedback/app_snackbar.dart';
import '../../../../core/widgets/inputs/app_text_field.dart';
import '../../../../core/widgets/overlays/app_confirmation_dialog.dart';
import '../../../autenticacion/infrastructure/auth_session.dart';
import '../../application/providers/cronograma_provider.dart';
import '../../infrastructure/cronograma_api.dart';

/// Vista operativa del cronograma. Las reglas de fechas, precedencia, ciclos y
/// conflictos se ejecutan exclusivamente en los endpoints de Cronograma.
class CronogramaPage extends ConsumerStatefulWidget {
  const CronogramaPage({super.key, required this.idProyecto});

  final String idProyecto;

  @override
  ConsumerState<CronogramaPage> createState() => _CronogramaPageState();
}

class _CronogramaPageState extends ConsumerState<CronogramaPage>
    with SingleTickerProviderStateMixin {
  late final TabController _tabs;
  bool _procesando = false;
  Timer? _autoguardadoPendiente;

  @override
  void initState() {
    super.initState();
    _tabs = TabController(length: 2, vsync: this)..addListener(_redibujarTab);
  }

  void _redibujarTab() {
    if (mounted && !_tabs.indexIsChanging) setState(() {});
  }

  @override
  void dispose() {
    _tabs
      ..removeListener(_redibujarTab)
      ..dispose();
    _autoguardadoPendiente?.cancel();
    super.dispose();
  }

  void _recargar() => ref.invalidate(cronogramaProvider(widget.idProyecto));

  /// Solo persiste cambios textuales completos sobre una instancia existente.
  /// Las fechas requieren la confirmación explícita para no saltar el preview
  /// de reprogramación y las validaciones de precedencia del backend.
  void _programarAutoguardadoActividad(
    Map<String, dynamic>? existente, {
    required String nombre,
    required String responsableTexto,
  }) {
    if (existente == null || nombre.trim().isEmpty) return;
    _autoguardadoPendiente?.cancel();
    _autoguardadoPendiente = Timer(const Duration(milliseconds: 700), () async {
      try {
        await ref.read(cronogramaApiProvider).actualizarActividad(
          widget.idProyecto,
          existente['idActividad'].toString(),
          {
            'nombre': nombre.trim(),
            'responsableTexto': _nuloSiVacio(responsableTexto),
          },
        );
        _recargar();
        if (mounted) {
          AppSnackbar.show(
            context,
            message: 'Cambios guardados.',
            type: AppSnackbarType.success,
          );
        }
      } catch (_) {
        if (mounted) {
          AppSnackbar.show(
            context,
            message: 'No se pudo guardar un cambio automático.',
            type: AppSnackbarType.warning,
          );
        }
      }
    });
  }

  Future<void> _ejecutar(
    Future<void> Function(CronogramaApi api) accion, {
    required String exito,
  }) async {
    if (_procesando) return;
    setState(() => _procesando = true);
    try {
      await accion(ref.read(cronogramaApiProvider));
      _recargar();
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

  Future<void> _confirmarPlanificacion() async {
    final confirmar = await AppConfirmationDialog.show(
      context,
      title: 'Confirmar planificación',
      message:
          '¿Está seguro de que el cronograma y el timing de la boda están correctamente planificados hasta el momento? Podrá realizar modificaciones posteriormente.',
      cancelLabel: 'Volver',
      confirmLabel: 'Confirmar',
    );
    if (!confirmar) return;
    await _ejecutar(
      (api) => api.confirmarPlanificacion(widget.idProyecto),
      exito: 'Cronograma planificado correctamente.',
    );
    AuthSession.actualizarPlanificacionConfirmada(true);
    if (mounted) context.go('/home');
  }

  @override
  Widget build(BuildContext context) {
    final estado = ref.watch(cronogramaProvider(widget.idProyecto));
    final puedeConfirmar = estado.maybeWhen(
      data: (data) {
        final proyecto = _mapa(_mapa(data['cronograma'])['proyecto']);
        final fase = _mapa(proyecto['faseProyecto']);
        return (fase['codigo'] ?? proyecto['faseProyectoCodigo'])?.toString() ==
            'INICIO';
      },
      orElse: () => false,
    );
    return Scaffold(
      backgroundColor: const Color(0xFFFDFBFF),
      appBar: AppBar(
        title: const Text('CRONOGRAMA'),
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 16),
            child: AppButton(
              label: 'PLANIFICADO',
              icon: Icons.verified_outlined,
              size: AppButtonSize.small,
              loading: _procesando,
              onPressed: puedeConfirmar ? _confirmarPlanificacion : null,
            ),
          ),
        ],
      ),
      body: estado.when(
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (error, _) =>
            _ErrorCarga(mensaje: _mensajeError(error), alReintentar: _recargar),
        data: (data) => _contenido(data),
      ),
      floatingActionButton: estado.maybeWhen(
        data: (data) => FloatingActionButton.extended(
          onPressed: _procesando
              ? null
              : () => _tabs.index == 0
                    ? _mostrarAccionesCronograma(data)
                    : _editarTiming(data),
          icon: Icon(
            _tabs.index == 0
                ? Icons.add_task_outlined
                : Icons.add_alarm_outlined,
          ),
          label: Text(_tabs.index == 0 ? 'Agregar' : 'Agregar momento'),
        ),
        orElse: () => null,
      ),
    );
  }

  Widget _contenido(Map<String, dynamic> data) {
    final cronograma = _mapa(data['cronograma']);
    final matrimonioData = _mapa(data['matrimonio']);
    final matrimonio = _mapa(matrimonioData['matrimonio']);
    final proyecto = _mapa(cronograma['proyecto']);
    final fase = _mapa(proyecto['faseProyecto']);
    final faseCodigo = (fase['codigo'] ?? proyecto['faseProyectoCodigo'] ?? '')
        .toString();
    AuthSession.seleccionarProyecto(
      idProyecto: widget.idProyecto,
      planificacionConfirmada:
          faseCodigo == 'PLANIFICACION' ||
          faseCodigo == 'MONITOREO_Y_CONTROL' ||
          faseCodigo == 'EJECUCION' ||
          faseCodigo == 'CIERRE',
    );
    final actividades = _lista(cronograma['actividades']);
    final hitos = _lista(cronograma['hitos']);
    final dependencias = _lista(cronograma['dependencias']);
    final timing = _lista(cronograma['timing']);
    final fechaBoda = _fecha(matrimonio['fechaMatrimonio']);
    final completadas = actividades
        .where((a) => a['estado'] == 'COMPLETADA')
        .length;
    final progreso = actividades.isEmpty
        ? 0.0
        : completadas / actividades.length;
    return Column(
      children: [
        _CabeceraCronograma(
          fechaBoda: fechaBoda,
          progreso: progreso,
          actividadesCompletadas: completadas,
          totalActividades: actividades.length,
        ),
        Material(
          color: Colors.transparent,
          child: TabBar(
            controller: _tabs,
            tabs: const [
              Tab(text: 'Cronograma', icon: Icon(Icons.account_tree_outlined)),
              Tab(
                text: 'Timing de la boda',
                icon: Icon(Icons.schedule_outlined),
              ),
            ],
          ),
        ),
        Expanded(
          child: TabBarView(
            controller: _tabs,
            children: [
              _ListaCronograma(
                hitos: hitos,
                actividades: actividades,
                dependencias: dependencias,
                alEditarActividad: _editarActividad,
                alEliminarActividad: _eliminarActividad,
                alCompletarActividad: _completarActividad,
                alEditarHito: _editarHito,
                alEliminarHito: _eliminarHito,
                alAgregarDependencia: () => _editarDependencia(actividades),
                alEliminarDependencia: _eliminarDependencia,
              ),
              _ListaTiming(
                timing: timing,
                alEditar: (item) => _editarTiming(data, existente: item),
                alEliminar: _eliminarTiming,
                alMover: _moverTiming,
              ),
            ],
          ),
        ),
      ],
    );
  }

  void _mostrarAccionesCronograma(Map<String, dynamic> data) {
    showModalBottomSheet<void>(
      context: context,
      showDragHandle: true,
      builder: (sheetContext) => SafeArea(
        child: Padding(
          padding: const EdgeInsets.fromLTRB(20, 8, 20, 28),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              ListTile(
                leading: const Icon(Icons.flag_outlined),
                title: const Text('Crear hito'),
                onTap: () {
                  Navigator.pop(sheetContext);
                  _editarHito(null);
                },
              ),
              ListTile(
                leading: const Icon(Icons.add_task_outlined),
                title: const Text('Crear actividad'),
                onTap: () {
                  Navigator.pop(sheetContext);
                  _editarActividad(null);
                },
              ),
              ListTile(
                leading: const Icon(Icons.library_add_outlined),
                title: const Text('Incorporar desde plantilla'),
                subtitle: const Text(
                  'Agrega una instancia sin modificar la plantilla.',
                ),
                onTap: () {
                  Navigator.pop(sheetContext);
                  _sugerencias(data);
                },
              ),
              ListTile(
                leading: const Icon(Icons.account_tree_outlined),
                title: const Text('Crear dependencia'),
                onTap: () {
                  Navigator.pop(sheetContext);
                  _editarDependencia(
                    _lista(_mapa(data['cronograma'])['actividades']),
                  );
                },
              ),
            ],
          ),
        ),
      ),
    );
  }

  Future<void> _editarHito(Map<String, dynamic>? existente) async {
    final nombre = TextEditingController(
      text: existente?['nombre']?.toString(),
    );
    final fecha = TextEditingController(
      text: _isoLocal(
        _fecha(existente?['fechaObjetivo']) ??
            DateTime.now().add(const Duration(days: 7)),
      ),
    );
    final criterio = TextEditingController(
      text: existente?['criterioAceptacion']?.toString(),
    );
    final form = GlobalKey<FormState>();
    final guardar = await _formulario(
      titulo: existente == null ? 'Nuevo hito' : 'Editar hito',
      form: form,
      campos: [
        AppTextField(
          label: 'Nombre',
          controller: nombre,
          required: true,
          prefixIcon: const Icon(Icons.flag_outlined),
          validator: _requerido,
        ),
        AppTextField(
          label: 'Fecha objetivo (AAAA-MM-DD)',
          controller: fecha,
          required: true,
          prefixIcon: const Icon(Icons.calendar_today_outlined),
          validator: _fechaValida,
        ),
        AppTextField(
          label: 'Criterio de aceptación',
          controller: criterio,
          maxLines: 3,
          prefixIcon: const Icon(Icons.rule_outlined),
        ),
      ],
    );
    if (!guardar || !form.currentState!.validate()) return;
    final data = <String, dynamic>{
      'nombre': nombre.text.trim(),
      'fechaObjetivo': _aIso(fecha.text),
      'criterioAceptacion': _nuloSiVacio(criterio.text),
    };
    await _ejecutar(
      (api) => existente == null
          ? api.crearHito(widget.idProyecto, data)
          : api.actualizarHito(
              widget.idProyecto,
              existente['idHito'].toString(),
              data,
            ),
      exito: existente == null
          ? 'Hito creado.'
          : 'Hito actualizado y guardado.',
    );
  }

  Future<void> _editarActividad(Map<String, dynamic>? existente) async {
    final nombre = TextEditingController(
      text: existente?['nombre']?.toString(),
    );
    final inicio = TextEditingController(
      text: _isoLocal(_fecha(existente?['fechaInicio'])),
    );
    final fin = TextEditingController(
      text: _isoLocal(
        _fecha(existente?['fechaFin']) ??
            DateTime.now().add(const Duration(days: 7)),
      ),
    );
    final responsable = TextEditingController(
      text: existente?['idUsuarioResponsable']?.toString(),
    );
    final responsableTexto = TextEditingController(
      text: existente?['responsableTexto']?.toString(),
    );
    String prioridad = existente?['prioridad']?.toString() ?? 'MEDIA';
    final form = GlobalKey<FormState>();
    final guardar = await showDialog<bool>(
      context: context,
      builder: (dialogContext) => StatefulBuilder(
        builder: (context, setDialogState) => AlertDialog(
          title: Text(
            existente == null ? 'Nueva actividad' : 'Editar actividad',
          ),
          content: SingleChildScrollView(
            child: Form(
              key: form,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  AppTextField(
                    label: 'Nombre',
                    controller: nombre,
                    required: true,
                    prefixIcon: const Icon(Icons.task_alt_outlined),
                    validator: _requerido,
                    onChanged: (valor) => _programarAutoguardadoActividad(
                      existente,
                      nombre: valor,
                      responsableTexto: responsableTexto.text,
                    ),
                  ),
                  const SizedBox(height: 14),
                  AppTextField(
                    label: 'Inicio (AAAA-MM-DD)',
                    controller: inicio,
                    prefixIcon: const Icon(Icons.event_outlined),
                    validator: _fechaOpcional,
                  ),
                  const SizedBox(height: 14),
                  AppTextField(
                    label: 'Fin (AAAA-MM-DD)',
                    controller: fin,
                    required: true,
                    prefixIcon: const Icon(Icons.event_available_outlined),
                    validator: _fechaValida,
                  ),
                  const SizedBox(height: 14),
                  DropdownButtonFormField<String>(
                    initialValue: prioridad,
                    decoration: const InputDecoration(
                      labelText: 'Prioridad',
                      prefixIcon: Icon(Icons.priority_high_outlined),
                    ),
                    items: const ['BAJA', 'MEDIA', 'ALTA', 'CRITICA']
                        .map((x) => DropdownMenuItem(value: x, child: Text(x)))
                        .toList(),
                    onChanged: (value) =>
                        setDialogState(() => prioridad = value ?? 'MEDIA'),
                  ),
                  const SizedBox(height: 14),
                  AppTextField(
                    label: 'ID de usuario responsable',
                    controller: responsable,
                    required: existente == null,
                    keyboardType: TextInputType.number,
                    prefixIcon: const Icon(Icons.person_outline),
                    validator: existente == null ? _enteroPositivo : null,
                  ),
                  const SizedBox(height: 14),
                  AppTextField(
                    label: 'Responsable (texto)',
                    controller: responsableTexto,
                    prefixIcon: const Icon(Icons.badge_outlined),
                    onChanged: (valor) => _programarAutoguardadoActividad(
                      existente,
                      nombre: nombre.text,
                      responsableTexto: valor,
                    ),
                  ),
                ],
              ),
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(dialogContext, false),
              child: const Text('Cancelar'),
            ),
            FilledButton(
              onPressed: () {
                if (form.currentState!.validate())
                  Navigator.pop(dialogContext, true);
              },
              child: const Text('Guardar'),
            ),
          ],
        ),
      ),
    );
    _autoguardadoPendiente?.cancel();
    if (guardar != true) return;
    final data = <String, dynamic>{
      'nombre': nombre.text.trim(),
      'fechaInicio': inicio.text.trim().isEmpty ? null : _aIso(inicio.text),
      'fechaFin': _aIso(fin.text),
      'prioridad': prioridad,
      if (responsable.text.trim().isNotEmpty)
        'idUsuarioResponsable': int.parse(responsable.text.trim()),
      'responsableTexto': _nuloSiVacio(responsableTexto.text),
    };
    if (existente == null) {
      await _ejecutar(
        (api) => api.crearActividad(widget.idProyecto, data),
        exito: 'Actividad creada.',
      );
      return;
    }
    final cambioFechas =
        data['fechaInicio']?.toString() !=
            existente['fechaInicio']?.toString() ||
        data['fechaFin']?.toString() != existente['fechaFin']?.toString();
    if (!cambioFechas) {
      await _ejecutar(
        (api) => api.actualizarActividad(
          widget.idProyecto,
          existente['idActividad'].toString(),
          data,
        ),
        exito: 'Actividad actualizada y guardada.',
      );
      return;
    }
    await _previsualizarYReprogramar(existente, data);
  }

  Future<void> _previsualizarYReprogramar(
    Map<String, dynamic> actividad,
    Map<String, dynamic> data,
  ) async {
    try {
      final api = ref.read(cronogramaApiProvider);
      final vista = await api.previsualizarReprogramacion(
        widget.idProyecto,
        actividad['idActividad'].toString(),
        {
          if (data['fechaInicio'] != null)
            'nuevaFechaInicio': data['fechaInicio'],
          'nuevaFechaFin': data['fechaFin'],
        },
      );
      final impacto = _mapa(vista['impacto']);
      final afectadas = _lista(impacto['actividadesAfectadas']).length;
      if (!mounted) return;
      final propagar = await AppConfirmationDialog.show(
        context,
        title: 'Reprogramar actividad',
        message: afectadas == 0
            ? 'No se detectaron sucesoras afectadas. ¿Deseas guardar la nueva fecha?'
            : 'Se detectaron $afectadas actividades sucesoras afectadas. ¿Deseas aplicar también los desplazamientos sugeridos?',
        confirmLabel: afectadas == 0 ? 'Guardar' : 'Propagar y guardar',
        cancelLabel: 'Volver',
      );
      if (!propagar) return;
      await _ejecutar(
        (api) => api.confirmarReprogramacion(
          widget.idProyecto,
          actividad['idActividad'].toString(),
          {
            if (data['fechaInicio'] != null)
              'nuevaFechaInicio': data['fechaInicio'],
            'nuevaFechaFin': data['fechaFin'],
            'propagar': afectadas > 0,
          },
        ),
        exito: 'Reprogramación guardada.',
      );
    } catch (error) {
      if (mounted)
        AppSnackbar.show(
          context,
          message: _mensajeError(error),
          type: AppSnackbarType.error,
        );
    }
  }

  Future<void> _editarDependencia(
    List<Map<String, dynamic>> actividades,
  ) async {
    if (actividades.length < 2) {
      AppSnackbar.show(
        context,
        message: 'Crea al menos dos actividades antes de relacionarlas.',
        type: AppSnackbarType.warning,
      );
      return;
    }
    String predecesora = actividades.first['idActividad'].toString();
    String sucesora = actividades[1]['idActividad'].toString();
    final desfase = TextEditingController(text: '0');
    final guardar = await showDialog<bool>(
      context: context,
      builder: (dialogContext) => StatefulBuilder(
        builder: (context, setDialogState) => AlertDialog(
          title: const Text('Nueva dependencia'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              DropdownButtonFormField<String>(
                initialValue: predecesora,
                decoration: const InputDecoration(
                  labelText: 'Actividad predecesora',
                ),
                items: actividades
                    .map(
                      (a) => DropdownMenuItem(
                        value: a['idActividad'].toString(),
                        child: Text(a['nombre']?.toString() ?? 'Actividad'),
                      ),
                    )
                    .toList(),
                onChanged: (v) => setDialogState(() => predecesora = v!),
              ),
              const SizedBox(height: 12),
              DropdownButtonFormField<String>(
                initialValue: sucesora,
                decoration: const InputDecoration(
                  labelText: 'Actividad sucesora',
                ),
                items: actividades
                    .map(
                      (a) => DropdownMenuItem(
                        value: a['idActividad'].toString(),
                        child: Text(a['nombre']?.toString() ?? 'Actividad'),
                      ),
                    )
                    .toList(),
                onChanged: (v) => setDialogState(() => sucesora = v!),
              ),
              const SizedBox(height: 12),
              AppTextField(
                label: 'Días de desfase',
                controller: desfase,
                keyboardType: TextInputType.number,
                prefixIcon: const Icon(Icons.calendar_view_day_outlined),
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(dialogContext, false),
              child: const Text('Cancelar'),
            ),
            FilledButton(
              onPressed: () => Navigator.pop(dialogContext, true),
              child: const Text('Crear'),
            ),
          ],
        ),
      ),
    );
    if (guardar != true) return;
    await _ejecutar(
      (api) => api.crearDependencia(widget.idProyecto, {
        'idActividadPredecesora': predecesora,
        'idActividadSucesora': sucesora,
        'tipoDependencia': 'FINISH_TO_START',
        'diasDesfase': int.tryParse(desfase.text) ?? 0,
      }),
      exito: 'Dependencia creada.',
    );
  }

  Future<void> _editarTiming(
    Map<String, dynamic> data, {
    Map<String, dynamic>? existente,
  }) async {
    final actividad = TextEditingController(
      text: existente?['actividad']?.toString(),
    );
    final inicio = TextEditingController(
      text: _isoLocal(_fecha(existente?['fechaHoraInicio']) ?? DateTime.now()),
    );
    final fin = TextEditingController(
      text: _isoLocal(
        _fecha(existente?['fechaHoraFin']) ??
            DateTime.now().add(const Duration(hours: 1)),
      ),
    );
    final ubicacion = TextEditingController(
      text: existente?['ubicacion']?.toString(),
    );
    final responsable = TextEditingController(
      text: existente?['responsableTexto']?.toString(),
    );
    final form = GlobalKey<FormState>();
    final guardar = await _formulario(
      titulo: existente == null ? 'Nuevo momento' : 'Editar momento',
      form: form,
      campos: [
        AppTextField(
          label: 'Actividad',
          controller: actividad,
          required: true,
          prefixIcon: const Icon(Icons.schedule_outlined),
          validator: _requerido,
        ),
        AppTextField(
          label: 'Inicio (AAAA-MM-DD HH:MM)',
          controller: inicio,
          required: true,
          prefixIcon: const Icon(Icons.play_circle_outline),
          validator: _fechaHoraValida,
        ),
        AppTextField(
          label: 'Fin (AAAA-MM-DD HH:MM)',
          controller: fin,
          required: true,
          prefixIcon: const Icon(Icons.stop_circle_outlined),
          validator: _fechaHoraValida,
        ),
        AppTextField(
          label: 'Ubicación',
          controller: ubicacion,
          prefixIcon: const Icon(Icons.place_outlined),
        ),
        AppTextField(
          label: 'Responsable',
          controller: responsable,
          prefixIcon: const Icon(Icons.person_outline),
        ),
      ],
    );
    if (!guardar || !form.currentState!.validate()) return;
    final fechaInicio = _aIso(inicio.text);
    final fechaFin = _aIso(fin.text);
    final duracion = DateTime.parse(
      fechaFin,
    ).difference(DateTime.parse(fechaInicio)).inMinutes;
    if (duracion <= 0) {
      if (mounted)
        AppSnackbar.show(
          context,
          message: 'El fin debe ser posterior al inicio.',
          type: AppSnackbarType.warning,
        );
      return;
    }
    final payload = <String, dynamic>{
      'actividad': actividad.text.trim(),
      'fechaHoraInicio': fechaInicio,
      'fechaHoraFin': fechaFin,
      'duracionMinutos': duracion,
      'ubicacion': _nuloSiVacio(ubicacion.text),
      'responsableTexto': _nuloSiVacio(responsable.text),
    };
    await _ejecutar(
      (api) => existente == null
          ? api.crearTiming(widget.idProyecto, payload)
          : api.actualizarTiming(
              widget.idProyecto,
              existente['idTiming'].toString(),
              payload,
            ),
      exito: existente == null
          ? 'Momento creado.'
          : 'Momento actualizado y reordenado.',
    );
  }

  Future<void> _moverTiming(Map<String, dynamic> item, int direccion) async {
    final orden =
        (int.tryParse(item['orden']?.toString() ?? '') ?? 0) + direccion;
    await _ejecutar(
      (api) => api.actualizarTiming(
        widget.idProyecto,
        item['idTiming'].toString(),
        {'orden': orden},
      ),
      exito: 'Orden actualizado.',
    );
  }

  Future<void> _sugerencias(Map<String, dynamic> data) async {
    try {
      final api = ref.read(cronogramaApiProvider);
      final sugerencias = await api.sugerenciasActividad(widget.idProyecto);
      final actividades = _lista(_mapa(data['cronograma'])['actividades']);
      final existentes = actividades
          .map((a) => a['idPlantillaActividad']?.toString())
          .whereType<String>()
          .toSet();
      final disponibles = sugerencias
          .where(
            (s) => !existentes.contains(s['idPlantillaActividad']?.toString()),
          )
          .toList();
      if (!mounted) return;
      if (disponibles.isEmpty) {
        AppSnackbar.show(
          context,
          message: 'No quedan actividades de plantilla disponibles.',
          type: AppSnackbarType.info,
        );
        return;
      }
      final elegido = await showModalBottomSheet<Map<String, dynamic>>(
        context: context,
        showDragHandle: true,
        builder: (context) => SafeArea(
          child: ListView(
            padding: const EdgeInsets.fromLTRB(16, 0, 16, 24),
            children: [
              const ListTile(
                title: Text('Agregar desde plantilla'),
                subtitle: Text(
                  'Selecciona una actividad que aún no está en este cronograma.',
                ),
              ),
              ...disponibles.map(
                (s) => ListTile(
                  leading: const Icon(Icons.library_add_outlined),
                  title: Text(s['nombre']?.toString() ?? 'Actividad'),
                  subtitle: Text(s['codigo']?.toString() ?? ''),
                  onTap: () => Navigator.pop(context, s),
                ),
              ),
            ],
          ),
        ),
      );
      if (elegido == null || !mounted) return;
      await _incorporarSugerencia(elegido);
    } catch (error) {
      if (mounted)
        AppSnackbar.show(
          context,
          message: _mensajeError(error),
          type: AppSnackbarType.error,
        );
    }
  }

  Future<void> _incorporarSugerencia(Map<String, dynamic> sugerencia) async {
    final fecha = TextEditingController(
      text: _isoLocal(DateTime.now().add(const Duration(days: 7))),
    );
    final responsable = TextEditingController();
    final form = GlobalKey<FormState>();
    final guardar = await _formulario(
      titulo: 'Incorporar actividad',
      form: form,
      descripcion:
          'Se creará una instancia independiente; la plantilla no se modifica.',
      campos: [
        Text(
          sugerencia['nombre']?.toString() ?? '',
          style: const TextStyle(fontWeight: FontWeight.w700),
        ),
        const SizedBox(height: 14),
        AppTextField(
          label: 'Fecha de fin (AAAA-MM-DD)',
          controller: fecha,
          required: true,
          prefixIcon: const Icon(Icons.event_outlined),
          validator: _fechaValida,
        ),
        AppTextField(
          label: 'Responsable (opcional)',
          controller: responsable,
          prefixIcon: const Icon(Icons.person_outline),
        ),
      ],
    );
    if (!guardar || !form.currentState!.validate()) return;
    await _ejecutar(
      (api) => api.incorporarSugerencia(widget.idProyecto, {
        'idPlantillaActividad': int.parse(
          sugerencia['idPlantillaActividad'].toString(),
        ),
        'fechaFin': _aIso(fecha.text),
        'responsableTexto': _nuloSiVacio(responsable.text),
      }),
      exito: 'Actividad incorporada desde plantilla.',
    );
  }

  Future<void> _eliminarActividad(Map<String, dynamic> item) => _eliminar(
    'Desactivar actividad',
    'La actividad dejará de mostrarse en el cronograma activo.',
    (api) => api.eliminarActividad(
      widget.idProyecto,
      item['idActividad'].toString(),
    ),
    'Actividad desactivada.',
  );
  Future<void> _completarActividad(Map<String, dynamic> item) => _ejecutar(
    (api) => api.cambiarEstadoActividad(
      widget.idProyecto,
      item['idActividad'].toString(),
      'COMPLETADA',
    ),
    exito: 'Actividad marcada como completada.',
  );
  Future<void> _eliminarHito(Map<String, dynamic> item) => _eliminar(
    'Desactivar hito',
    'El hito dejará de mostrarse en el cronograma activo.',
    (api) => api.eliminarHito(widget.idProyecto, item['idHito'].toString()),
    'Hito desactivado.',
  );
  Future<void> _eliminarTiming(Map<String, dynamic> item) => _eliminar(
    'Desactivar momento',
    'El momento dejará de mostrarse en el timing activo.',
    (api) => api.eliminarTiming(widget.idProyecto, item['idTiming'].toString()),
    'Momento desactivado.',
  );
  Future<void> _eliminarDependencia(Map<String, dynamic> item) => _eliminar(
    'Eliminar dependencia',
    'Se eliminará permanentemente la relación entre actividades.',
    (api) => api.eliminarDependencia(
      widget.idProyecto,
      item['idDependencia'].toString(),
    ),
    'Dependencia eliminada.',
  );
  Future<void> _eliminar(
    String titulo,
    String mensaje,
    Future<void> Function(CronogramaApi) accion,
    String exito,
  ) async {
    final aceptar = await AppConfirmationDialog.show(
      context,
      title: titulo,
      message: mensaje,
      type: AppConfirmationType.destructive,
      confirmLabel: 'Eliminar',
      cancelLabel: 'Volver',
    );
    if (aceptar) await _ejecutar(accion, exito: exito);
  }

  Future<bool> _formulario({
    required String titulo,
    String? descripcion,
    required GlobalKey<FormState> form,
    required List<Widget> campos,
  }) async {
    return await showDialog<bool>(
          context: context,
          builder: (dialogContext) => AlertDialog(
            title: Text(titulo),
            content: SingleChildScrollView(
              child: Form(
                key: form,
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    if (descripcion != null)
                      Padding(
                        padding: const EdgeInsets.only(bottom: 16),
                        child: Text(descripcion),
                      ),
                    ..._separar(campos),
                  ],
                ),
              ),
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(dialogContext, false),
                child: const Text('Cancelar'),
              ),
              FilledButton(
                onPressed: () {
                  if (form.currentState!.validate())
                    Navigator.pop(dialogContext, true);
                },
                child: const Text('Guardar'),
              ),
            ],
          ),
        ) ??
        false;
  }
}

class _CabeceraCronograma extends StatelessWidget {
  const _CabeceraCronograma({
    required this.fechaBoda,
    required this.progreso,
    required this.actividadesCompletadas,
    required this.totalActividades,
  });
  final DateTime? fechaBoda;
  final double progreso;
  final int actividadesCompletadas, totalActividades;
  @override
  Widget build(BuildContext context) {
    final dias = fechaBoda?.difference(DateTime.now()).inDays;
    return Container(
      width: double.infinity,
      margin: const EdgeInsets.fromLTRB(16, 12, 16, 6),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFFF4F0FB),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            fechaBoda == null
                ? 'Fecha de boda por confirmar'
                : 'Boda: ${_fechaCorta(fechaBoda!)}',
            style: Theme.of(
              context,
            ).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800),
          ),
          const SizedBox(height: 4),
          Text(
            dias == null
                ? 'Organiza el cronograma de tu boda.'
                : dias >= 0
                ? '$dias días restantes para el matrimonio'
                : 'La fecha de boda ya pasó',
          ),
          const SizedBox(height: 12),
          LinearProgressIndicator(
            value: progreso,
            minHeight: 8,
            borderRadius: BorderRadius.circular(8),
            color: AppColors.primary,
            backgroundColor: Colors.white,
          ),
          const SizedBox(height: 6),
          Text(
            '$actividadesCompletadas de $totalActividades actividades completadas',
            style: Theme.of(context).textTheme.labelMedium,
          ),
        ],
      ),
    );
  }
}

class _ListaCronograma extends StatelessWidget {
  const _ListaCronograma({
    required this.hitos,
    required this.actividades,
    required this.dependencias,
    required this.alEditarActividad,
    required this.alEliminarActividad,
    required this.alCompletarActividad,
    required this.alEditarHito,
    required this.alEliminarHito,
    required this.alAgregarDependencia,
    required this.alEliminarDependencia,
  });
  final List<Map<String, dynamic>> hitos, actividades, dependencias;
  final ValueChanged<Map<String, dynamic>> alEditarActividad;
  final ValueChanged<Map<String, dynamic>> alEliminarActividad;
  final ValueChanged<Map<String, dynamic>> alCompletarActividad;
  final ValueChanged<Map<String, dynamic>> alEditarHito;
  final ValueChanged<Map<String, dynamic>> alEliminarHito;
  final ValueChanged<Map<String, dynamic>> alEliminarDependencia;
  final VoidCallback alAgregarDependencia;
  @override
  Widget build(BuildContext context) {
    if (hitos.isEmpty && actividades.isEmpty)
      return const _Vacio(
        icon: Icons.event_note_outlined,
        titulo: 'Aún no hay elementos',
        mensaje:
            'Agrega hitos, actividades o incorpora elementos desde las plantillas.',
      );
    final sinHito = actividades.where((a) => a['idHito'] == null).toList();
    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 8, 16, 96),
      children: [
        ...hitos.map(
          (hito) => _HitoCard(
            hito: hito,
            actividades: actividades
                .where(
                  (a) => a['idHito']?.toString() == hito['idHito']?.toString(),
                )
                .toList(),
            alEditarHito: () => alEditarHito(hito),
            alEliminarHito: () => alEliminarHito(hito),
            alEditarActividad: alEditarActividad,
            alEliminarActividad: alEliminarActividad,
            alCompletarActividad: alCompletarActividad,
          ),
        ),
        if (sinHito.isNotEmpty)
          _HitoCard(
            hito: const {'nombre': 'Actividades sin hito'},
            actividades: sinHito,
            alEditarHito: null,
            alEliminarHito: null,
            alEditarActividad: alEditarActividad,
            alEliminarActividad: alEliminarActividad,
            alCompletarActividad: alCompletarActividad,
          ),
        if (dependencias.isNotEmpty)
          Card(
            child: Padding(
              padding: const EdgeInsets.all(14),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Dependencias',
                    style: TextStyle(fontWeight: FontWeight.w800),
                  ),
                  ...dependencias.map(
                    (d) => ListTile(
                      dense: true,
                      leading: const Icon(Icons.arrow_forward, size: 18),
                      title: Text(
                        '${d['nombrePredecesora'] ?? 'Actividad'} �  ${d['nombreSucesora'] ?? 'Actividad'}',
                      ),
                      subtitle: Text(
                        'Finalizar para iniciar · ${d['diasDesfase'] ?? 0} días de desfase',
                      ),
                      trailing: IconButton(
                        icon: const Icon(Icons.delete_outline),
                        onPressed: () => alEliminarDependencia(d),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        TextButton.icon(
          onPressed: alAgregarDependencia,
          icon: const Icon(Icons.add_link),
          label: const Text('Agregar dependencia'),
        ),
      ],
    );
  }
}

class _HitoCard extends StatelessWidget {
  const _HitoCard({
    required this.hito,
    required this.actividades,
    required this.alEditarHito,
    required this.alEliminarHito,
    required this.alEditarActividad,
    required this.alEliminarActividad,
    required this.alCompletarActividad,
  });
  final Map<String, dynamic> hito;
  final List<Map<String, dynamic>> actividades;
  final VoidCallback? alEditarHito, alEliminarHito;
  final ValueChanged<Map<String, dynamic>> alEditarActividad,
      alEliminarActividad;
  final ValueChanged<Map<String, dynamic>> alCompletarActividad;
  @override
  Widget build(BuildContext context) => Card(
    margin: const EdgeInsets.only(bottom: 12),
    child: Padding(
      padding: const EdgeInsets.all(14),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(Icons.flag_outlined, color: AppColors.primary),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  hito['nombre']?.toString() ?? 'Hito',
                  style: const TextStyle(fontWeight: FontWeight.w800),
                ),
              ),
              if (alEditarHito != null)
                PopupMenuButton<String>(
                  onSelected: (v) =>
                      v == 'editar' ? alEditarHito!() : alEliminarHito!(),
                  itemBuilder: (_) => const [
                    PopupMenuItem(value: 'editar', child: Text('Editar')),
                    PopupMenuItem(value: 'eliminar', child: Text('Desactivar')),
                  ],
                ),
            ],
          ),
          if (hito['fechaObjetivo'] != null)
            Padding(
              padding: const EdgeInsets.only(top: 4),
              child: Text(
                'Objetivo: ${_fechaCorta(_fecha(hito['fechaObjetivo'])!)}',
              ),
            ),
          const SizedBox(height: 8),
          ...actividades.map(
            (a) => _ActividadFila(
              item: a,
              alEditar: () => alEditarActividad(a),
              alEliminar: () => alEliminarActividad(a),
              alCompletar: () => alCompletarActividad(a),
            ),
          ),
        ],
      ),
    ),
  );
}

class _ActividadFila extends StatelessWidget {
  const _ActividadFila({
    required this.item,
    required this.alEditar,
    required this.alEliminar,
    required this.alCompletar,
  });
  final Map<String, dynamic> item;
  final VoidCallback alEditar, alEliminar, alCompletar;
  @override
  Widget build(BuildContext context) => ListTile(
    contentPadding: const EdgeInsets.only(left: 8),
    leading: Icon(
      item['estado'] == 'COMPLETADA'
          ? Icons.check_circle
          : Icons.radio_button_unchecked,
      color: item['estado'] == 'COMPLETADA' ? Colors.green : AppColors.primary,
    ),
    title: Text(item['nombre']?.toString() ?? 'Actividad'),
    subtitle: Text(
      '${item['estado'] ?? 'PENDIENTE'} · vence ${_fechaCorta(_fecha(item['fechaFin']))}${item['responsableTexto'] == null ? '' : ' · ${item['responsableTexto']}'}',
    ),
    trailing: PopupMenuButton<String>(
      onSelected: (v) {
        if (v == 'editar') {
          alEditar();
        } else if (v == 'completar') {
          alCompletar();
        } else {
          alEliminar();
        }
      },
      itemBuilder: (_) => const [
        PopupMenuItem(value: 'editar', child: Text('Editar / reprogramar')),
        PopupMenuItem(value: 'completar', child: Text('Marcar completada')),
        PopupMenuItem(value: 'eliminar', child: Text('Desactivar')),
      ],
    ),
  );
}

class _ListaTiming extends StatelessWidget {
  const _ListaTiming({
    required this.timing,
    required this.alEditar,
    required this.alEliminar,
    required this.alMover,
  });
  final List<Map<String, dynamic>> timing;
  final ValueChanged<Map<String, dynamic>> alEditar, alEliminar;
  final void Function(Map<String, dynamic>, int) alMover;
  @override
  Widget build(BuildContext context) {
    if (timing.isEmpty)
      return const _Vacio(
        icon: Icons.schedule_outlined,
        titulo: 'Sin momentos programados',
        mensaje:
            'Agrega los momentos del día de la boda para construir su línea de tiempo.',
      );
    return ListView.separated(
      padding: const EdgeInsets.fromLTRB(16, 10, 16, 96),
      itemCount: timing.length,
      separatorBuilder: (_, __) => const SizedBox(height: 8),
      itemBuilder: (context, i) {
        final item = timing[i];
        return Card(
          child: ListTile(
            leading: CircleAvatar(
              child: Text(_hora(_fecha(item['fechaHoraInicio']))),
            ),
            title: Text(item['actividad']?.toString() ?? 'Momento'),
            subtitle: Text(
              '${_hora(_fecha(item['fechaHoraInicio']))} � ${_hora(_fecha(item['fechaHoraFin']))}${item['ubicacion'] == null ? '' : ' · ${item['ubicacion']}'}',
            ),
            trailing: Wrap(
              children: [
                IconButton(
                  tooltip: 'Subir',
                  icon: const Icon(Icons.keyboard_arrow_up),
                  onPressed: i == 0 ? null : () => alMover(item, -1),
                ),
                IconButton(
                  tooltip: 'Bajar',
                  icon: const Icon(Icons.keyboard_arrow_down),
                  onPressed: i == timing.length - 1
                      ? null
                      : () => alMover(item, 1),
                ),
                PopupMenuButton<String>(
                  onSelected: (v) =>
                      v == 'editar' ? alEditar(item) : alEliminar(item),
                  itemBuilder: (_) => const [
                    PopupMenuItem(value: 'editar', child: Text('Editar')),
                    PopupMenuItem(value: 'eliminar', child: Text('Desactivar')),
                  ],
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}

class _Vacio extends StatelessWidget {
  const _Vacio({
    required this.icon,
    required this.titulo,
    required this.mensaje,
  });
  final IconData icon;
  final String titulo, mensaje;
  @override
  Widget build(BuildContext context) => Center(
    child: Padding(
      padding: const EdgeInsets.all(32),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 48, color: AppColors.primary),
          const SizedBox(height: 12),
          Text(
            titulo,
            style: Theme.of(
              context,
            ).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800),
          ),
          const SizedBox(height: 6),
          Text(mensaje, textAlign: TextAlign.center),
        ],
      ),
    ),
  );
}

class _ErrorCarga extends StatelessWidget {
  const _ErrorCarga({required this.mensaje, required this.alReintentar});
  final String mensaje;
  final VoidCallback alReintentar;
  @override
  Widget build(BuildContext context) => Center(
    child: Padding(
      padding: const EdgeInsets.all(28),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Icon(Icons.error_outline, size: 44, color: AppColors.error),
          const SizedBox(height: 12),
          const Text('No pudimos cargar el cronograma'),
          const SizedBox(height: 8),
          Text(mensaje, textAlign: TextAlign.center),
          const SizedBox(height: 18),
          AppButton(
            label: 'Reintentar',
            onPressed: alReintentar,
            icon: Icons.refresh,
          ),
        ],
      ),
    ),
  );
}

Map<String, dynamic> _mapa(Object? value) =>
    value is Map ? Map<String, dynamic>.from(value) : <String, dynamic>{};
List<Map<String, dynamic>> _lista(Object? value) => value is List
    ? value.whereType<Map>().map((x) => Map<String, dynamic>.from(x)).toList()
    : const [];
DateTime? _fecha(Object? value) =>
    value == null ? null : DateTime.tryParse(value.toString())?.toLocal();
String _fechaCorta(DateTime? value) => value == null
    ? '�'
    : '${value.day.toString().padLeft(2, '0')}/${value.month.toString().padLeft(2, '0')}/${value.year}';
String _hora(DateTime? value) => value == null
    ? '�'
    : '${value.hour.toString().padLeft(2, '0')}:${value.minute.toString().padLeft(2, '0')}';
String _isoLocal(DateTime? value) => value == null
    ? ''
    : '${value.year.toString().padLeft(4, '0')}-${value.month.toString().padLeft(2, '0')}-${value.day.toString().padLeft(2, '0')}${value.hour == 0 && value.minute == 0 ? '' : ' ${value.hour.toString().padLeft(2, '0')}:${value.minute.toString().padLeft(2, '0')}'}';
String _aIso(String value) =>
    DateTime.parse(value.trim().replaceFirst(' ', 'T')).toIso8601String();
String? _nuloSiVacio(String value) =>
    value.trim().isEmpty ? null : value.trim();
String? _requerido(String? value) =>
    value == null || value.trim().isEmpty ? 'Este campo es obligatorio.' : null;
String? _fechaValida(String? value) =>
    _requerido(value) ??
    (DateTime.tryParse(value!.trim().replaceFirst(' ', 'T')) == null
        ? 'Ingresa una fecha válida.'
        : null);
String? _fechaOpcional(String? value) =>
    value == null || value.trim().isEmpty ? null : _fechaValida(value);
String? _fechaHoraValida(String? value) => _fechaValida(value);
String? _enteroPositivo(String? value) {
  final id = int.tryParse(value?.trim() ?? '');
  return id != null && id > 0 ? null : 'Ingresa un ID válido.';
}

String _mensajeError(Object error) {
  final texto = error.toString();
  final match = RegExp(
    r'mensaje[=:]\s*([^,}]+)',
    caseSensitive: false,
  ).firstMatch(texto);
  return match?.group(1)?.replaceAll('"', '').trim() ??
      texto.replaceFirst('Exception: ', '');
}

List<Widget> _separar(List<Widget> items) {
  final salida = <Widget>[];
  for (final item in items) {
    if (salida.isNotEmpty) salida.add(const SizedBox(height: 14));
    salida.add(item);
  }
  return salida;
}
