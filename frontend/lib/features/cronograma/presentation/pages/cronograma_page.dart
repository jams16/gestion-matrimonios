import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../../app/theme/app_colors.dart';
import '../../../../core/widgets/buttons/app_button.dart';
import '../../../../core/widgets/feedback/app_snackbar.dart';
import '../../../../core/widgets/inputs/app_date_field.dart';
import '../../../../core/widgets/inputs/app_text_field.dart';
import '../../../../core/widgets/inputs/app_select_field.dart';
import '../../../../core/widgets/inputs/app_time_field.dart';
import '../../../../core/widgets/overlays/app_confirmation_dialog.dart';
import '../../../autenticacion/infrastructure/auth_session.dart';
import '../../application/providers/cronograma_provider.dart';
import '../../infrastructure/cronograma_api.dart';

/// Vista operativa del cronograma. Las reglas de fechas, precedencia, ciclos y
/// conflictos se ejecutan exclusivamente en los endpoints de Cronograma.
class CronogramaPage extends ConsumerStatefulWidget {
  const CronogramaPage({
    super.key,
    required this.idProyecto,
    this.embebido = false,
  });

  final String idProyecto;
  final bool embebido;

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
  }) {
    if (existente == null || nombre.trim().isEmpty) return;
    _autoguardadoPendiente?.cancel();
    _autoguardadoPendiente = Timer(const Duration(milliseconds: 700), () async {
      try {
        await ref.read(cronogramaApiProvider).actualizarActividad(
          widget.idProyecto,
          existente['idActividad'].toString(),
          {'nombre': nombre.trim()},
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
    final contenido = estado.when(
      loading: () => const Center(child: CircularProgressIndicator()),
      error: (error, _) =>
          _ErrorCarga(mensaje: _mensajeError(error), alReintentar: _recargar),
      data: (data) => _contenido(data),
    );
    final botonFlotante = estado.maybeWhen(
      data: (data) => FloatingActionButton.extended(
        onPressed: _procesando
            ? null
            : () => _tabs.index == 0
                  ? _mostrarAccionesCronograma(data)
                  : _editarTiming(data, _responsablesDe(data)),
        icon: Icon(
          _tabs.index == 0 ? Icons.add_task_outlined : Icons.add_alarm_outlined,
        ),
        label: Text(_tabs.index == 0 ? 'Agregar' : 'Agregar momento'),
      ),
      orElse: () => null,
    );
    if (widget.embebido) {
      return Stack(
        children: [
          contenido,
          if (puedeConfirmar)
            Positioned(
              top: 12,
              right: 16,
              child: AppButton(
                label: 'PLANIFICADO',
                icon: Icons.verified_outlined,
                size: AppButtonSize.small,
                loading: _procesando,
                onPressed: _confirmarPlanificacion,
              ),
            ),
          if (botonFlotante != null)
            Positioned(right: 18, bottom: 18, child: botonFlotante),
        ],
      );
    }
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
      body: contenido,
      floatingActionButton: botonFlotante,
    );
  }

  Widget _contenido(Map<String, dynamic> data) {
    final cronograma = _mapa(data['cronograma']);
    final matrimonioData = _mapa(data['matrimonio']);
    final matrimonio = _mapa(matrimonioData['matrimonio']);
    final responsables = _lista(matrimonioData['responsables']);
    final nombresResponsables = {
      for (final responsable in responsables)
        responsable['idUsuario'].toString():
            responsable['nombreCompleto']?.toString() ?? 'Usuario',
    };
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
                alEditarActividad: (item) =>
                    _editarActividad(item, responsables),
                alEliminarActividad: _eliminarActividad,
                alCompletarActividad: (item) => _intentarCompletarActividad(
                  item,
                  actividades,
                  dependencias,
                ),
                alEditarHito: _editarHito,
                alEliminarHito: _eliminarHito,
                alAgregarDependencia: () => _editarDependencia(actividades),
                alEliminarDependencia: _eliminarDependencia,
                nombresResponsables: nombresResponsables,
              ),
              _ListaTiming(
                timing: timing,
                alEditar: (item) =>
                    _editarTiming(data, responsables, existente: item),
                alEliminar: _eliminarTiming,
                alMover: _moverTiming,
                nombresResponsables: nombresResponsables,
              ),
            ],
          ),
        ),
      ],
    );
  }

  Future<void> _mostrarAccionesCronograma(Map<String, dynamic> data) async {
    final accion = await showModalBottomSheet<String>(
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
                onTap: () => Navigator.pop(sheetContext, 'hito'),
              ),
              ListTile(
                leading: const Icon(Icons.add_task_outlined),
                title: const Text('Crear actividad'),
                onTap: () => Navigator.pop(sheetContext, 'actividad'),
              ),
              ListTile(
                leading: const Icon(Icons.library_add_outlined),
                title: const Text('Incorporar desde plantilla'),
                subtitle: const Text(
                  'Agrega una instancia sin modificar la plantilla.',
                ),
                onTap: () => Navigator.pop(sheetContext, 'plantilla'),
              ),
              ListTile(
                leading: const Icon(Icons.account_tree_outlined),
                title: const Text('Crear dependencia'),
                onTap: () => Navigator.pop(sheetContext, 'dependencia'),
              ),
            ],
          ),
        ),
      ),
    );
    if (!mounted || accion == null) return;
    switch (accion) {
      case 'hito':
        await _editarHito(null);
      case 'actividad':
        await _editarActividad(null, _responsablesDe(data));
      case 'plantilla':
        await _sugerencias(data);
      case 'dependencia':
        await _editarDependencia(
          _lista(_mapa(data['cronograma'])['actividades']),
        );
    }
  }

  Future<void> _editarHito(Map<String, dynamic>? existente) async {
    final nombre = TextEditingController(
      text: existente?['nombre']?.toString(),
    );
    DateTime? fecha =
        _fecha(existente?['fechaObjetivo']) ??
        DateTime.now().add(const Duration(days: 7));
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
        AppDateField(
          label: 'Fecha objetivo',
          initialDate: fecha,
          onChanged: (value) => fecha = value,
        ),
        AppTextField(
          label: 'Criterio de aceptación',
          controller: criterio,
          maxLines: 3,
          prefixIcon: const Icon(Icons.rule_outlined),
        ),
      ],
    );
    if (!guardar || !form.currentState!.validate() || fecha == null) return;
    final data = <String, dynamic>{
      'nombre': nombre.text.trim(),
      'fechaObjetivo': fecha!.toIso8601String(),
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

  List<Map<String, dynamic>> _responsablesDe(Map<String, dynamic> data) =>
      _lista(_mapa(data['matrimonio'])['responsables']);

  Future<void> _editarActividad(
    Map<String, dynamic>? existente,
    List<Map<String, dynamic>> responsables,
  ) async {
    final nombre = TextEditingController(
      text: existente?['nombre']?.toString(),
    );
    DateTime? inicio = _fecha(existente?['fechaInicio']);
    DateTime? fin =
        _fecha(existente?['fechaFin']) ??
        DateTime.now().add(const Duration(days: 7));
    int? idResponsable = int.tryParse(
      existente?['idUsuarioResponsable']?.toString() ?? '',
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
                    ),
                  ),
                  const SizedBox(height: 14),
                  AppDateField(
                    label: 'Fecha de inicio',
                    initialDate: inicio,
                    onChanged: (value) => setDialogState(() => inicio = value),
                  ),
                  const SizedBox(height: 14),
                  AppDateField(
                    label: 'Fecha de fin',
                    initialDate: fin,
                    onChanged: (value) => setDialogState(() => fin = value),
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
                  AppSelectField<int>(
                    label: 'Responsable',
                    initialValue: idResponsable,
                    options: responsables
                        .map(
                          (item) => AppSelectOption<int>(
                            value: int.parse(item['idUsuario'].toString()),
                            label:
                                item['nombreCompleto']?.toString() ?? 'Usuario',
                          ),
                        )
                        .toList(),
                    onChanged: (valor) =>
                        setDialogState(() => idResponsable = valor),
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
    if (fin == null) {
      if (mounted) {
        AppSnackbar.show(
          context,
          message: 'Selecciona la fecha de fin.',
          type: AppSnackbarType.warning,
        );
      }
      return;
    }
    if (inicio != null && inicio!.isAfter(fin!)) {
      if (mounted) {
        AppSnackbar.show(
          context,
          message:
              'La fecha de inicio no puede ser posterior a la fecha de fin.',
          type: AppSnackbarType.warning,
        );
      }
      return;
    }
    if (existente == null && idResponsable == null) {
      if (mounted) {
        AppSnackbar.show(
          context,
          message: 'Selecciona un responsable para la actividad.',
          type: AppSnackbarType.warning,
        );
      }
      return;
    }
    final data = <String, dynamic>{
      'nombre': nombre.text.trim(),
      'fechaInicio': inicio?.toIso8601String(),
      'fechaFin': fin!.toIso8601String(),
      'prioridad': prioridad,
      if (idResponsable != null) 'idUsuarioResponsable': idResponsable,
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
    Map<String, dynamic> data,
    List<Map<String, dynamic>> responsables, {
    Map<String, dynamic>? existente,
  }) async {
    final actividad = TextEditingController(
      text: existente?['actividad']?.toString(),
    );
    final inicioExistente =
        _fecha(existente?['fechaHoraInicio']) ?? DateTime.now();
    final finExistente =
        _fecha(existente?['fechaHoraFin']) ??
        inicioExistente.add(const Duration(hours: 1));
    DateTime? fechaInicio = inicioExistente;
    DateTime? fechaFin = finExistente;
    TimeOfDay? horaInicio = TimeOfDay.fromDateTime(inicioExistente);
    TimeOfDay? horaFin = TimeOfDay.fromDateTime(finExistente);
    final ubicacion = TextEditingController(
      text: existente?['ubicacion']?.toString(),
    );
    int? idResponsable = int.tryParse(
      existente?['idUsuarioResponsable']?.toString() ?? '',
    );
    final form = GlobalKey<FormState>();
    final guardar = await showDialog<bool>(
      context: context,
      builder: (dialogContext) => StatefulBuilder(
        builder: (context, setDialogState) => AlertDialog(
          title: Text(existente == null ? 'Nuevo momento' : 'Editar momento'),
          content: SingleChildScrollView(
            child: Form(
              key: form,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  AppTextField(
                    label: 'Actividad',
                    controller: actividad,
                    required: true,
                    prefixIcon: const Icon(Icons.schedule_outlined),
                    validator: _requerido,
                  ),
                  AppDateField(
                    label: 'Fecha de inicio',
                    initialDate: fechaInicio,
                    onChanged: (value) =>
                        setDialogState(() => fechaInicio = value),
                  ),
                  const SizedBox(height: 14),
                  AppTimeField(
                    label: 'Hora de inicio',
                    initialTime: horaInicio,
                    onChanged: (value) =>
                        setDialogState(() => horaInicio = value),
                  ),
                  const SizedBox(height: 14),
                  AppDateField(
                    label: 'Fecha de fin',
                    initialDate: fechaFin,
                    onChanged: (value) =>
                        setDialogState(() => fechaFin = value),
                  ),
                  const SizedBox(height: 14),
                  AppTimeField(
                    label: 'Hora de fin',
                    initialTime: horaFin,
                    onChanged: (value) => setDialogState(() => horaFin = value),
                  ),
                  AppTextField(
                    label: 'Ubicación',
                    controller: ubicacion,
                    prefixIcon: const Icon(Icons.place_outlined),
                  ),
                  AppSelectField<int>(
                    label: 'Responsable',
                    initialValue: idResponsable,
                    options: responsables
                        .map(
                          (item) => AppSelectOption<int>(
                            value: int.parse(item['idUsuario'].toString()),
                            label:
                                item['nombreCompleto']?.toString() ?? 'Usuario',
                          ),
                        )
                        .toList(),
                    onChanged: (value) =>
                        setDialogState(() => idResponsable = value),
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
    if (guardar != true || !form.currentState!.validate()) return;
    if (fechaInicio == null ||
        fechaFin == null ||
        horaInicio == null ||
        horaFin == null)
      return;
    final inicio = DateTime(
      fechaInicio!.year,
      fechaInicio!.month,
      fechaInicio!.day,
      horaInicio!.hour,
      horaInicio!.minute,
    );
    final fin = DateTime(
      fechaFin!.year,
      fechaFin!.month,
      fechaFin!.day,
      horaFin!.hour,
      horaFin!.minute,
    );
    final duracion = fin.difference(inicio).inMinutes;
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
      'fechaHoraInicio': inicio.toIso8601String(),
      'fechaHoraFin': fin.toIso8601String(),
      'duracionMinutos': duracion,
      'ubicacion': _nuloSiVacio(ubicacion.text),
      'idUsuarioResponsable': idResponsable,
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

  Future<void> _moverTiming(
    Map<String, dynamic> item,
    Map<String, dynamic> vecino,
  ) async {
    final ordenActual = int.tryParse(item['orden']?.toString() ?? '') ?? 0;
    final ordenVecino = int.tryParse(vecino['orden']?.toString() ?? '') ?? 0;
    await _ejecutar((api) async {
      await api.actualizarTiming(
        widget.idProyecto,
        item['idTiming'].toString(),
        {'orden': ordenVecino},
      );
      await api.actualizarTiming(
        widget.idProyecto,
        vecino['idTiming'].toString(),
        {'orden': ordenActual},
      );
    }, exito: 'Orden actualizado.');
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
      await _incorporarSugerencia(elegido, _responsablesDe(data));
    } catch (error) {
      if (mounted)
        AppSnackbar.show(
          context,
          message: _mensajeError(error),
          type: AppSnackbarType.error,
        );
    }
  }

  Future<void> _incorporarSugerencia(
    Map<String, dynamic> sugerencia,
    List<Map<String, dynamic>> responsables,
  ) async {
    DateTime? fecha = DateTime.now().add(const Duration(days: 7));
    int? idResponsable;
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
        AppDateField(
          label: 'Fecha de fin',
          initialDate: fecha,
          onChanged: (value) => fecha = value,
        ),
        AppSelectField<int>(
          label: 'Responsable',
          initialValue: idResponsable,
          options: responsables
              .map(
                (item) => AppSelectOption<int>(
                  value: int.parse(item['idUsuario'].toString()),
                  label: item['nombreCompleto']?.toString() ?? 'Usuario',
                ),
              )
              .toList(),
          onChanged: (value) => idResponsable = value,
        ),
      ],
    );
    if (!guardar || !form.currentState!.validate() || fecha == null) return;
    await _ejecutar(
      (api) => api.incorporarSugerencia(widget.idProyecto, {
        'idPlantillaActividad': int.parse(
          sugerencia['idPlantillaActividad'].toString(),
        ),
        'fechaFin': fecha!.toIso8601String(),
        if (idResponsable != null) 'idUsuarioResponsable': idResponsable,
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
  Future<void> _intentarCompletarActividad(
    Map<String, dynamic> item,
    List<Map<String, dynamic>> actividades,
    List<Map<String, dynamic>> dependencias,
  ) async {
    final porId = {
      for (final actividad in actividades)
        actividad['idActividad'].toString(): actividad,
    };
    final pendientes = dependencias
        .where(
          (dependencia) =>
              dependencia['idActividadSucesora']?.toString() ==
              item['idActividad']?.toString(),
        )
        .map(
          (dependencia) =>
              porId[dependencia['idActividadPredecesora']?.toString()],
        )
        .whereType<Map<String, dynamic>>()
        .where((actividad) => actividad['estado']?.toString() != 'COMPLETADA')
        .toList();
    if (pendientes.isNotEmpty) {
      await showDialog<void>(
        context: context,
        builder: (dialogContext) => AlertDialog(
          icon: const Icon(Icons.info_outline, color: AppColors.primary),
          title: const Text('Hay trabajo pendiente'),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Completa primero las actividades de las que depende esta tarea:',
                ),
                const SizedBox(height: 10),
                ...pendientes.map(
                  (actividad) => Padding(
                    padding: const EdgeInsets.only(bottom: 6),
                    child: Row(
                      children: [
                        const Icon(Icons.link_outlined, size: 18),
                        const SizedBox(width: 8),
                        Expanded(
                          child: Text(
                            actividad['nombre']?.toString() ?? 'Actividad',
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(dialogContext),
              child: const Text('Volver'),
            ),
          ],
        ),
      );
      return;
    }
    final confirmar = await AppConfirmationDialog.show(
      context,
      title: 'Marcar actividad como completada',
      message:
          'La actividad se marcara como completada. Podras cambiar su estado despues si es necesario.',
      confirmLabel: 'Completar',
      cancelLabel: 'Volver',
    );
    if (!confirmar) return;
    await _ejecutar(
      (api) => api.cambiarEstadoActividad(
        widget.idProyecto,
        item['idActividad'].toString(),
        'COMPLETADA',
      ),
      exito: 'Actividad marcada como completada.',
    );
  }

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
    required this.nombresResponsables,
  });
  final List<Map<String, dynamic>> hitos, actividades, dependencias;
  final ValueChanged<Map<String, dynamic>> alEditarActividad;
  final ValueChanged<Map<String, dynamic>> alEliminarActividad;
  final ValueChanged<Map<String, dynamic>> alCompletarActividad;
  final ValueChanged<Map<String, dynamic>> alEditarHito;
  final ValueChanged<Map<String, dynamic>> alEliminarHito;
  final VoidCallback alAgregarDependencia;
  final ValueChanged<Map<String, dynamic>> alEliminarDependencia;
  final Map<String, String> nombresResponsables;
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
    final nombresActividades = {
      for (final actividad in actividades)
        actividad['idActividad'].toString():
            actividad['nombre']?.toString() ?? 'Actividad',
    };
    final dependenciasPorSucesora = <String, List<Map<String, dynamic>>>{};
    for (final dependencia in dependencias) {
      final sucesora = dependencia['idActividadSucesora']?.toString();
      if (sucesora != null) {
        (dependenciasPorSucesora[sucesora] ??= []).add(dependencia);
      }
    }
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
            dependenciasPorSucesora: dependenciasPorSucesora,
            nombresActividades: nombresActividades,
            nombresResponsables: nombresResponsables,
            alEliminarDependencia: alEliminarDependencia,
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
            dependenciasPorSucesora: dependenciasPorSucesora,
            nombresActividades: nombresActividades,
            nombresResponsables: nombresResponsables,
            alEliminarDependencia: alEliminarDependencia,
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
    required this.dependenciasPorSucesora,
    required this.nombresActividades,
    required this.nombresResponsables,
    required this.alEliminarDependencia,
  });
  final Map<String, dynamic> hito;
  final List<Map<String, dynamic>> actividades;
  final VoidCallback? alEditarHito, alEliminarHito;
  final ValueChanged<Map<String, dynamic>> alEditarActividad,
      alEliminarActividad;
  final ValueChanged<Map<String, dynamic>> alCompletarActividad;
  final Map<String, List<Map<String, dynamic>>> dependenciasPorSucesora;
  final Map<String, String> nombresActividades, nombresResponsables;
  final ValueChanged<Map<String, dynamic>> alEliminarDependencia;
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
              dependencias:
                  dependenciasPorSucesora[a['idActividad']?.toString()] ??
                  const [],
              nombresActividades: nombresActividades,
              nombresResponsables: nombresResponsables,
              alEliminarDependencia: alEliminarDependencia,
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
    required this.dependencias,
    required this.nombresActividades,
    required this.nombresResponsables,
    required this.alEliminarDependencia,
  });
  final Map<String, dynamic> item;
  final VoidCallback alEditar, alEliminar, alCompletar;
  final List<Map<String, dynamic>> dependencias;
  final Map<String, String> nombresActividades, nombresResponsables;
  final ValueChanged<Map<String, dynamic>> alEliminarDependencia;
  @override
  Widget build(BuildContext context) => ListTile(
    isThreeLine: true,
    contentPadding: const EdgeInsets.only(left: 8, right: 2),
    leading: Icon(
      item['estado'] == 'COMPLETADA'
          ? Icons.check_circle
          : Icons.radio_button_unchecked,
      color: item['estado'] == 'COMPLETADA' ? Colors.green : AppColors.primary,
    ),
    title: Text(item['nombre']?.toString() ?? 'Actividad'),
    subtitle: Padding(
      padding: const EdgeInsets.only(top: 6),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Wrap(
            spacing: 8,
            runSpacing: 6,
            children: [
              _EstadoActividadChip(
                estado: item['estado']?.toString() ?? 'PENDIENTE',
              ),
              _DatoActividad(
                icon: Icons.event_outlined,
                texto: 'Vence ${_fechaCorta(_fecha(item['fechaFin']))}',
              ),
              if (item['idUsuarioResponsable'] != null)
                _DatoActividad(
                  icon: Icons.person_outline,
                  texto:
                      nombresResponsables[item['idUsuarioResponsable']
                          .toString()] ??
                      'Sin responsable',
                ),
            ],
          ),
          ...dependencias.map(
            (dependencia) => Container(
              margin: const EdgeInsets.only(top: 7),
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 5),
              decoration: BoxDecoration(
                color: const Color(0xFFF4F0FB),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Row(
                children: [
                  const Icon(
                    Icons.link_outlined,
                    size: 16,
                    color: AppColors.primary,
                  ),
                  const SizedBox(width: 6),
                  Expanded(
                    child: Text(
                      'Depende de ${nombresActividades[dependencia['idActividadPredecesora']?.toString()] ?? 'actividad'}',
                    ),
                  ),
                  IconButton(
                    tooltip: 'Eliminar dependencia',
                    visualDensity: VisualDensity.compact,
                    iconSize: 18,
                    onPressed: () => alEliminarDependencia(dependencia),
                    icon: const Icon(Icons.link_off_outlined),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
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

class _EstadoActividadChip extends StatelessWidget {
  const _EstadoActividadChip({required this.estado});
  final String estado;

  @override
  Widget build(BuildContext context) {
    final (texto, color) = switch (estado) {
      'COMPLETADA' => ('Completada', Colors.green.shade700),
      'EN_PROCESO' => ('En proceso', Colors.blue.shade700),
      'BLOQUEADA' => ('Bloqueada', Colors.orange.shade800),
      _ => ('Pendiente', AppColors.primary),
    };
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: color.withValues(alpha: .12),
        borderRadius: BorderRadius.circular(99),
      ),
      child: Text(
        texto,
        style: TextStyle(
          color: color,
          fontWeight: FontWeight.w700,
          fontSize: 12,
        ),
      ),
    );
  }
}

class _DatoActividad extends StatelessWidget {
  const _DatoActividad({required this.icon, required this.texto});
  final IconData icon;
  final String texto;

  @override
  Widget build(BuildContext context) => Row(
    mainAxisSize: MainAxisSize.min,
    children: [
      Icon(
        icon,
        size: 15,
        color: Theme.of(context).colorScheme.onSurfaceVariant,
      ),
      const SizedBox(width: 4),
      ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 190),
        child: Text(texto, overflow: TextOverflow.ellipsis),
      ),
    ],
  );
}

class _ListaTiming extends StatelessWidget {
  const _ListaTiming({
    required this.timing,
    required this.alEditar,
    required this.alEliminar,
    required this.alMover,
    required this.nombresResponsables,
  });
  final List<Map<String, dynamic>> timing;
  final ValueChanged<Map<String, dynamic>> alEditar, alEliminar;
  final void Function(Map<String, dynamic>, Map<String, dynamic>) alMover;
  final Map<String, String> nombresResponsables;
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
              radius: 27,
              child: FittedBox(
                child: Text(
                  _hora(_fecha(item['fechaHoraInicio'])),
                  style: const TextStyle(fontWeight: FontWeight.w800),
                ),
              ),
            ),
            title: Text(item['actividad']?.toString() ?? 'Momento'),
            subtitle: Wrap(
              spacing: 8,
              runSpacing: 4,
              children: [
                _DatoActividad(
                  icon: Icons.schedule_outlined,
                  texto: 'Hasta ${_hora(_fecha(item['fechaHoraFin']))}',
                ),
                if (item['ubicacion'] != null)
                  _DatoActividad(
                    icon: Icons.place_outlined,
                    texto: item['ubicacion'].toString(),
                  ),
                if (item['idUsuarioResponsable'] != null)
                  _DatoActividad(
                    icon: Icons.person_outline,
                    texto:
                        nombresResponsables[item['idUsuarioResponsable']
                            .toString()] ??
                        'Sin responsable',
                  ),
              ],
            ),
            trailing: Wrap(
              children: [
                IconButton(
                  tooltip: 'Subir',
                  icon: const Icon(Icons.keyboard_arrow_up),
                  onPressed: i == 0 ? null : () => alMover(item, timing[i - 1]),
                ),
                IconButton(
                  tooltip: 'Bajar',
                  icon: const Icon(Icons.keyboard_arrow_down),
                  onPressed: i == timing.length - 1
                      ? null
                      : () => alMover(item, timing[i + 1]),
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
    ? '--'
    : '${value.day.toString().padLeft(2, '0')}/${value.month.toString().padLeft(2, '0')}/${value.year}';
String _hora(DateTime? value) => value == null
    ? '--'
    : '${value.hour.toString().padLeft(2, '0')}:${value.minute.toString().padLeft(2, '0')}';
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
