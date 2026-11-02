import 'dart:async';

import 'package:dio/dio.dart';
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

  Future<void> _recargar() async {
    ref.invalidate(cronogramaProvider(widget.idProyecto));
    await ref.read(cronogramaProvider(widget.idProyecto).future);
  }

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
            type: AppSnackbarType.info,
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
    final puedeConfirmar = faseCodigo == 'INICIO';
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
    final fechaInicioProyecto = _fecha(proyecto['fechaInicio']);
    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 14, 16, 0),
          child: Row(
            children: [
              const Text('Plan', style: TextStyle(fontWeight: FontWeight.w800)),
              const Spacer(),
              if (puedeConfirmar)
                AppButton(
                  label: 'PLANIFICADO',
                  icon: Icons.verified_outlined,
                  size: AppButtonSize.small,
                  loading: _procesando,
                  onPressed: _confirmarPlanificacion,
                ),
            ],
          ),
        ),
        _CabeceraCronograma(
          fechaBoda: fechaBoda,
          fechaInicioProyecto: fechaInicioProyecto,
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
                    _editarActividad(item, responsables, hitos: hitos),
                alEliminarActividad: _eliminarActividad,
                alCompletarActividad: (item) => _intentarCompletarActividad(
                  item,
                  actividades,
                  dependencias,
                ),
                alEditarHito: _editarHito,
                alEliminarHito: _eliminarHito,
                alAgregarActividadEnHito: (hito) => _editarActividad(
                  null,
                  responsables,
                  hitos: hitos,
                  hitoInicial: hito,
                ),
                alAgregarDependencia: () =>
                    _editarDependencia(actividades, hitos),
                alAgregarDependenciaEnActividad: (actividad) =>
                    _editarDependencia(
                      actividades,
                      hitos,
                      predecesoraInicial: actividad,
                    ),
                alMoverActividad: _moverActividad,
                alMoverHito: (hito, vecino) =>
                    _moverHito(hito, vecino, actividades),
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
        await _editarActividad(
          null,
          _responsablesDe(data),
          hitos: _lista(_mapa(data['cronograma'])['hitos']),
        );
      case 'plantilla':
        await _sugerencias(data);
      case 'dependencia':
        await _editarDependencia(
          _lista(_mapa(data['cronograma'])['actividades']),
          _lista(_mapa(data['cronograma'])['hitos']),
        );
    }
  }

  Future<void> _editarHito(
    Map<String, dynamic>? existente, {
    Map<String, dynamic>? plantilla,
  }) async {
    final nombre = TextEditingController(
      text:
          existente?['nombre']?.toString() ?? plantilla?['nombre']?.toString(),
    );
    DateTime? fecha =
        _fecha(existente?['fechaObjetivo']) ??
        DateTime.now().add(const Duration(days: 7));
    final criterio = TextEditingController(
      text:
          existente?['criterioAceptacion']?.toString() ??
          plantilla?['criterioAceptacion']?.toString(),
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
      if (plantilla?['idPlantillaHito'] != null)
        'idPlantillaHito': plantilla!['idPlantillaHito'],
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
    List<Map<String, dynamic>> responsables, {
    required List<Map<String, dynamic>> hitos,
    Map<String, dynamic>? hitoInicial,
  }) async {
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
    var idHito =
        existente?['idHito']?.toString() ??
        hitoInicial?['idHito']?.toString() ??
        '0';
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
                  const SizedBox(height: 18),
                  AppDateField(
                    label: 'Fecha de inicio',
                    initialDate: inicio,
                    onChanged: (value) => setDialogState(() => inicio = value),
                  ),
                  const SizedBox(height: 18),
                  AppDateField(
                    label: 'Fecha de fin',
                    initialDate: fin,
                    onChanged: (value) => setDialogState(() => fin = value),
                  ),
                  const SizedBox(height: 18),
                  DropdownButtonFormField<String>(
                    value: idHito,
                    isExpanded: true,
                    decoration: const InputDecoration(
                      labelText: 'Hito al que pertenece',
                      prefixIcon: Icon(Icons.flag_outlined),
                    ),
                    items: [
                      const DropdownMenuItem<String>(
                        value: '0',
                        child: Text('Sin hito'),
                      ),
                      ...hitos.map(
                        (hito) => DropdownMenuItem(
                          value: hito['idHito'].toString(),
                          child: Text(
                            hito['nombre']?.toString() ?? 'Hito',
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                      ),
                    ],
                    onChanged: (value) =>
                        setDialogState(() => idHito = value ?? '0'),
                  ),
                  const SizedBox(height: 18),
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
                  const SizedBox(height: 18),
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
    final data = <String, dynamic>{
      'nombre': nombre.text.trim(),
      'fechaInicio': inicio?.toIso8601String(),
      'fechaFin': fin!.toIso8601String(),
      'prioridad': prioridad,
      'idHito': idHito == '0' ? null : idHito,
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
    List<Map<String, dynamic>> hitos, {
    Map<String, dynamic>? predecesoraInicial,
    Map<String, dynamic>? sucesoraInicial,
  }) async {
    if (actividades.length < 2) {
      AppSnackbar.show(
        context,
        message: 'Crea al menos dos actividades antes de relacionarlas.',
        type: AppSnackbarType.warning,
      );
      return;
    }
    final nombresHitos = {
      for (final hito in hitos)
        hito['idHito']?.toString() ?? '': hito['nombre']?.toString() ?? 'Hito',
    };
    String etiquetaActividad(Map<String, dynamic> actividad) {
      final hito = nombresHitos[actividad['idHito']?.toString()];
      final nombre = actividad['nombre']?.toString() ?? 'Actividad';
      return hito == null ? nombre : '$nombre — $hito';
    }

    String predecesora =
        predecesoraInicial?['idActividad']?.toString() ??
        actividades.first['idActividad'].toString();
    String sucesora =
        sucesoraInicial?['idActividad']?.toString() ??
        actividades
            .firstWhere(
              (actividad) =>
                  actividad['idActividad']?.toString() != predecesora,
              orElse: () => actividades.last,
            )['idActividad']
            .toString();
    final fijaPredecesora = predecesoraInicial != null;
    final actividadBase = predecesoraInicial;
    String? predecesoraElegida;
    String? sucesoraElegida;
    final desfase = TextEditingController(text: '0');
    final guardar = await showDialog<bool>(
      context: context,
      builder: (dialogContext) => StatefulBuilder(
        builder: (context, setDialogState) => AlertDialog(
          title: const Text('Nueva dependencia'),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                if (actividadBase != null)
                  Align(
                    alignment: Alignment.centerLeft,
                    child: Text(
                      'Actividad seleccionada: ${etiquetaActividad(actividadBase)}',
                      style: const TextStyle(fontWeight: FontWeight.w700),
                    ),
                  ),
                if (actividadBase != null) const SizedBox(height: 18),
                if (actividadBase != null)
                  DropdownButtonFormField<String>(
                    initialValue: 'ninguna',
                    isExpanded: true,
                    decoration: const InputDecoration(
                      labelText: 'Predecesora (opcional)',
                    ),
                    items: [
                      const DropdownMenuItem<String>(
                        value: 'ninguna',
                        child: Text('Ninguna'),
                      ),
                      ...actividades
                          .where(
                            (a) =>
                                a['idActividad']?.toString() !=
                                actividadBase['idActividad']?.toString(),
                          )
                          .map(
                            (a) => DropdownMenuItem(
                              value: a['idActividad'].toString(),
                              child: Text(
                                etiquetaActividad(a),
                                overflow: TextOverflow.ellipsis,
                              ),
                            ),
                          ),
                    ],
                    onChanged: (value) => setDialogState(
                      () => predecesoraElegida = value == 'ninguna'
                          ? null
                          : value,
                    ),
                  ),
                if (actividadBase != null) const SizedBox(height: 18),
                DropdownButtonFormField<String>(
                  initialValue: actividadBase != null
                      ? 'ninguna'
                      : (fijaPredecesora ? sucesora : predecesora),
                  isExpanded: true,
                  decoration: InputDecoration(
                    labelText: actividadBase != null
                        ? 'Sucesora (opcional)'
                        : 'Actividad relacionada',
                  ),
                  items: [
                    if (actividadBase != null)
                      const DropdownMenuItem<String>(
                        value: 'ninguna',
                        child: Text('Ninguna'),
                      ),
                    ...actividades
                        .where(
                          (a) =>
                              a['idActividad']?.toString() !=
                              (actividadBase ??
                                      (fijaPredecesora
                                          ? predecesoraInicial
                                          : sucesoraInicial))?['idActividad']
                                  ?.toString(),
                        )
                        .map(
                          (a) => DropdownMenuItem(
                            value: a['idActividad'].toString(),
                            child: Text(
                              etiquetaActividad(a),
                              overflow: TextOverflow.ellipsis,
                            ),
                          ),
                        ),
                  ],
                  onChanged: (v) => setDialogState(() {
                    if (actividadBase != null) {
                      sucesoraElegida = v == 'ninguna' ? null : v;
                    } else if (fijaPredecesora) {
                      sucesora = v!;
                    } else {
                      predecesora = v!;
                      if (predecesora == sucesora) {
                        sucesora = actividades
                            .firstWhere(
                              (actividad) =>
                                  actividad['idActividad']?.toString() !=
                                  predecesora,
                            )['idActividad']
                            .toString();
                      }
                    }
                  }),
                ),
                const SizedBox(height: 18),
                AppTextField(
                  label: 'Días de desfase',
                  controller: desfase,
                  keyboardType: TextInputType.number,
                  prefixIcon: const Icon(Icons.calendar_view_day_outlined),
                ),
              ],
            ),
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
    if (actividadBase != null) {
      if (predecesoraElegida == null && sucesoraElegida == null) {
        if (mounted)
          AppSnackbar.show(
            context,
            message: 'Selecciona una actividad predecesora o sucesora.',
            type: AppSnackbarType.info,
          );
        return;
      }
      await _ejecutar((api) async {
        final desfaseValor = int.tryParse(desfase.text) ?? 0;
        if (predecesoraElegida != null) {
          await api.crearDependencia(widget.idProyecto, {
            'idActividadPredecesora': predecesoraElegida,
            'idActividadSucesora': actividadBase['idActividad'],
            'tipoDependencia': 'FINISH_TO_START',
            'diasDesfase': desfaseValor,
          });
        }
        if (sucesoraElegida != null) {
          await api.crearDependencia(widget.idProyecto, {
            'idActividadPredecesora': actividadBase['idActividad'],
            'idActividadSucesora': sucesoraElegida,
            'tipoDependencia': 'FINISH_TO_START',
            'diasDesfase': desfaseValor,
          });
        }
      }, exito: 'Dependencia creada.');
      return;
    }
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
    Map<String, dynamic>? plantilla,
  }) async {
    final actividad = TextEditingController(
      text:
          existente?['actividad']?.toString() ??
          plantilla?['actividad']?.toString(),
    );
    final horaPlantilla = _horaDePlantilla(plantilla?['horaInicio']);
    final inicioExistente =
        _fecha(existente?['fechaHoraInicio']) ??
        DateTime(
          DateTime.now().year,
          DateTime.now().month,
          DateTime.now().day,
          horaPlantilla?.hour ?? DateTime.now().hour,
          horaPlantilla?.minute ?? DateTime.now().minute,
        );
    final finExistente =
        _fecha(existente?['fechaHoraFin']) ??
        inicioExistente.add(
          Duration(
            minutes:
                int.tryParse(plantilla?['duracionMinutos']?.toString() ?? '') ??
                60,
          ),
        );
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
                  const SizedBox(height: 18),
                  AppDateField(
                    label: 'Fecha de inicio',
                    initialDate: fechaInicio,
                    onChanged: (value) =>
                        setDialogState(() => fechaInicio = value),
                  ),
                  const SizedBox(height: 18),
                  AppTimeField(
                    label: 'Hora de inicio',
                    initialTime: horaInicio,
                    onChanged: (value) =>
                        setDialogState(() => horaInicio = value),
                  ),
                  const SizedBox(height: 18),
                  AppDateField(
                    label: 'Fecha de fin',
                    initialDate: fechaFin,
                    onChanged: (value) =>
                        setDialogState(() => fechaFin = value),
                  ),
                  const SizedBox(height: 18),
                  AppTimeField(
                    label: 'Hora de fin',
                    initialTime: horaFin,
                    onChanged: (value) => setDialogState(() => horaFin = value),
                  ),
                  const SizedBox(height: 18),
                  AppTextField(
                    label: 'Ubicación',
                    controller: ubicacion,
                    prefixIcon: const Icon(Icons.place_outlined),
                  ),
                  const SizedBox(height: 18),
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
      if (plantilla?['idPlantillaTiming'] != null)
        'idPlantillaTiming': plantilla!['idPlantillaTiming'],
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
    await _ejecutar(
      (api) => api.intercambiarTiming(
        widget.idProyecto,
        item['idTiming'].toString(),
        vecino['idTiming'].toString(),
      ),
      exito: 'Orden y horas actualizados.',
    );
  }

  Future<void> _moverActividad(
    Map<String, dynamic> actividad,
    Map<String, dynamic> vecino,
  ) async {
    final inicioActividad = _fecha(actividad['fechaInicio']);
    final finActividad = _fecha(actividad['fechaFin']);
    final inicioVecino = _fecha(vecino['fechaInicio']);
    final finVecino = _fecha(vecino['fechaFin']);
    if (finActividad == null || finVecino == null) return;
    await _ejecutar((api) async {
      await api.actualizarActividad(
        widget.idProyecto,
        actividad['idActividad'].toString(),
        {
          'fechaInicio': inicioVecino?.toIso8601String(),
          'fechaFin': finVecino.toIso8601String(),
          'orden': vecino['orden'],
        },
      );
      await api.actualizarActividad(
        widget.idProyecto,
        vecino['idActividad'].toString(),
        {
          'fechaInicio': inicioActividad?.toIso8601String(),
          'fechaFin': finActividad.toIso8601String(),
          'orden': actividad['orden'],
        },
      );
    }, exito: 'Orden y fechas de actividades actualizados.');
  }

  Future<void> _moverHito(
    Map<String, dynamic> hito,
    Map<String, dynamic> vecino,
    List<Map<String, dynamic>> actividades,
  ) async {
    final fechaHito = _fecha(hito['fechaObjetivo']);
    final fechaVecino = _fecha(vecino['fechaObjetivo']);
    if (fechaHito == null || fechaVecino == null) return;
    DateTime desplazar(DateTime valor, int dias) =>
        valor.add(Duration(days: dias));
    final deltaHito = fechaVecino.difference(fechaHito).inDays;
    final deltaVecino = fechaHito.difference(fechaVecino).inDays;
    final actividadesHito = actividades.where(
      (a) => a['idHito']?.toString() == hito['idHito']?.toString(),
    );
    final actividadesVecino = actividades.where(
      (a) => a['idHito']?.toString() == vecino['idHito']?.toString(),
    );
    await _ejecutar((api) async {
      await api.actualizarHito(widget.idProyecto, hito['idHito'].toString(), {
        'fechaObjetivo': fechaVecino.toIso8601String(),
        'orden': vecino['orden'],
      });
      await api.actualizarHito(widget.idProyecto, vecino['idHito'].toString(), {
        'fechaObjetivo': fechaHito.toIso8601String(),
        'orden': hito['orden'],
      });
      for (final actividad in [...actividadesHito, ...actividadesVecino]) {
        final esPrimerHito =
            actividad['idHito']?.toString() == hito['idHito']?.toString();
        final inicio = _fecha(actividad['fechaInicio']);
        final fin = _fecha(actividad['fechaFin']);
        if (fin == null) continue;
        final dias = esPrimerHito ? deltaHito : deltaVecino;
        await api.actualizarActividad(
          widget.idProyecto,
          actividad['idActividad'].toString(),
          {
            'fechaInicio': inicio == null
                ? null
                : desplazar(inicio, dias).toIso8601String(),
            'fechaFin': desplazar(fin, dias).toIso8601String(),
          },
        );
      }
    }, exito: 'Hitos, actividades y fechas reordenados.');
  }

  Future<void> _sugerencias(Map<String, dynamic> data) async {
    try {
      final api = ref.read(cronogramaApiProvider);
      final tipo = await _seleccionarTipoPlantilla();
      if (tipo == null || !mounted) return;
      final cronograma = _mapa(data['cronograma']);
      final hitos = _lista(cronograma['hitos']);
      final actividadesActuales = _lista(cronograma['actividades']);
      final timingActual = _lista(cronograma['timing']);
      if (tipo == 'hito') {
        final plantillas = await api.sugerenciasHito(widget.idProyecto);
        final usados = hitos
            .map((x) => x['idPlantillaHito']?.toString())
            .toSet();
        final elegido = await _elegirPlantilla(
          'Hitos disponibles',
          plantillas
              .where((x) => !usados.contains(x['idPlantillaHito']?.toString()))
              .toList(),
        );
        if (elegido != null) await _editarHito(null, plantilla: elegido);
        return;
      }
      if (tipo == 'timing') {
        final plantillas = await api.sugerenciasTiming(widget.idProyecto);
        final usados = timingActual
            .map((x) => x['idPlantillaTiming']?.toString())
            .toSet();
        final elegido = await _elegirPlantilla(
          'Momentos disponibles',
          plantillas
              .where(
                (x) => !usados.contains(x['idPlantillaTiming']?.toString()),
              )
              .toList(),
        );
        if (elegido != null)
          await _editarTiming(data, _responsablesDe(data), plantilla: elegido);
        return;
      }
      if (tipo == 'dependencia') {
        final plantillas = await api.sugerenciasDependencia(widget.idProyecto);
        final disponibles = plantillas
            .where((x) {
              final predecesora = x['idActividadPredecesora']?.toString();
              final sucesora = x['idActividadSucesora']?.toString();
              return actividadesActuales.any(
                    (a) => a['idPlantillaActividad']?.toString() == predecesora,
                  ) &&
                  actividadesActuales.any(
                    (a) => a['idPlantillaActividad']?.toString() == sucesora,
                  );
            })
            .map((plantilla) {
              final predecesora = actividadesActuales.firstWhere(
                (actividad) =>
                    actividad['idPlantillaActividad']?.toString() ==
                    plantilla['idActividadPredecesora']?.toString(),
              );
              final sucesora = actividadesActuales.firstWhere(
                (actividad) =>
                    actividad['idPlantillaActividad']?.toString() ==
                    plantilla['idActividadSucesora']?.toString(),
              );
              return <String, dynamic>{
                ...plantilla,
                'nombre':
                    '${predecesora['nombre'] ?? 'Actividad'} → ${sucesora['nombre'] ?? 'Actividad'}',
              };
            })
            .toList();
        final elegido = await _elegirPlantilla(
          'Dependencias disponibles',
          disponibles,
        );
        if (elegido != null) {
          final predecesora = actividadesActuales.firstWhere(
            (actividad) =>
                actividad['idPlantillaActividad']?.toString() ==
                elegido['idActividadPredecesora']?.toString(),
          );
          final sucesora = actividadesActuales.firstWhere(
            (actividad) =>
                actividad['idPlantillaActividad']?.toString() ==
                elegido['idActividadSucesora']?.toString(),
          );
          await _editarDependencia(
            actividadesActuales,
            hitos,
            predecesoraInicial: predecesora,
            sucesoraInicial: sucesora,
          );
        }
        return;
      }
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
      final elegido = await _elegirPlantilla(
        'Actividades disponibles',
        disponibles,
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

  Future<String?> _seleccionarTipoPlantilla() => showModalBottomSheet<String>(
    context: context,
    showDragHandle: true,
    builder: (sheetContext) => SafeArea(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(20, 4, 20, 28),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const ListTile(
              title: Text('Incorporar desde plantilla'),
              subtitle: Text('Elige el tipo de elemento que deseas agregar.'),
            ),
            _opcionPlantilla(sheetContext, 'hito', Icons.flag_outlined, 'Hito'),
            _opcionPlantilla(
              sheetContext,
              'actividad',
              Icons.add_task_outlined,
              'Actividad',
            ),
            _opcionPlantilla(
              sheetContext,
              'dependencia',
              Icons.account_tree_outlined,
              'Dependencia',
            ),
            _opcionPlantilla(
              sheetContext,
              'timing',
              Icons.schedule_outlined,
              'Momento de timing',
            ),
          ],
        ),
      ),
    ),
  );

  Widget _opcionPlantilla(
    BuildContext context,
    String valor,
    IconData icono,
    String texto,
  ) => ListTile(
    leading: Icon(icono),
    title: Text(texto),
    onTap: () => Navigator.pop(context, valor),
  );

  Future<Map<String, dynamic>?> _elegirPlantilla(
    String titulo,
    List<Map<String, dynamic>> disponibles,
  ) => showModalBottomSheet<Map<String, dynamic>>(
    context: context,
    showDragHandle: true,
    builder: (sheetContext) => SafeArea(
      child: ListView(
        padding: const EdgeInsets.fromLTRB(16, 0, 16, 24),
        children: [
          ListTile(title: Text(titulo)),
          if (disponibles.isEmpty)
            const Padding(
              padding: EdgeInsets.all(24),
              child: Center(child: Text('No hay más opciones.')),
            ),
          ...disponibles.map(
            (item) => ListTile(
              leading: const Icon(Icons.library_add_outlined),
              title: Text(
                item['nombre']?.toString() ??
                    item['actividad']?.toString() ??
                    'Plantilla',
              ),
              subtitle: Text(item['codigo']?.toString() ?? ''),
              onTap: () => Navigator.pop(sheetContext, item),
            ),
          ),
        ],
      ),
    ),
  );

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
    required this.fechaInicioProyecto,
    required this.progreso,
    required this.actividadesCompletadas,
    required this.totalActividades,
  });
  final DateTime? fechaBoda;
  final DateTime? fechaInicioProyecto;
  final double progreso;
  final int actividadesCompletadas, totalActividades;
  @override
  Widget build(BuildContext context) {
    final dias = fechaBoda?.difference(DateTime.now()).inDays;
    final totalDias = fechaBoda != null && fechaInicioProyecto != null
        ? fechaBoda!.difference(fechaInicioProyecto!).inDays
        : 0;
    final progresoTiempo = totalDias <= 0 || dias == null
        ? 0.0
        : (1 - (dias / totalDias)).clamp(0.0, 1.0);
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
          const SizedBox(height: 14),
          LinearProgressIndicator(
            value: progresoTiempo,
            minHeight: 8,
            borderRadius: BorderRadius.circular(8),
            color: AppColors.primary,
            backgroundColor: Colors.white,
          ),
          const SizedBox(height: 5),
          Text(
            dias == null
                ? 'Fecha pendiente'
                : '${dias < 0 ? 0 : dias} días restantes',
            style: Theme.of(context).textTheme.labelMedium,
          ),
          const SizedBox(height: 14),
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
    required this.alAgregarActividadEnHito,
    required this.alAgregarDependenciaEnActividad,
    required this.alMoverActividad,
    required this.alMoverHito,
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
  final ValueChanged<Map<String, dynamic>> alAgregarActividadEnHito;
  final ValueChanged<Map<String, dynamic>> alAgregarDependenciaEnActividad;
  final void Function(Map<String, dynamic>, Map<String, dynamic>)
  alMoverActividad;
  final void Function(Map<String, dynamic>, Map<String, dynamic>) alMoverHito;
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
    final hitosOrdenados = [...hitos]
      ..sort((a, b) => _compararFecha(a['fechaObjetivo'], b['fechaObjetivo']));
    int compararActividad(Map<String, dynamic> a, Map<String, dynamic> b) {
      final porFecha = _compararFecha(a['fechaFin'], b['fechaFin']);
      return porFecha != 0
          ? porFecha
          : _compararFecha(a['createdAt'], b['createdAt']);
    }

    final sinHito = actividades.where((a) => a['idHito'] == null).toList()
      ..sort(compararActividad);
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
        ...hitosOrdenados.indexed.map((entrada) {
          final indice = entrada.$1;
          final hito = entrada.$2;
          return _HitoCard(
            hito: hito,
            actividades:
                actividades
                    .where(
                      (a) =>
                          a['idHito']?.toString() == hito['idHito']?.toString(),
                    )
                    .toList()
                  ..sort(compararActividad),
            alEditarHito: () => alEditarHito(hito),
            alEliminarHito: () => alEliminarHito(hito),
            alAgregarActividad: () => alAgregarActividadEnHito(hito),
            alSubir: indice == 0
                ? null
                : () => alMoverHito(hito, hitosOrdenados[indice - 1]),
            alBajar: indice == hitosOrdenados.length - 1
                ? null
                : () => alMoverHito(hito, hitosOrdenados[indice + 1]),
            alEditarActividad: alEditarActividad,
            alEliminarActividad: alEliminarActividad,
            alCompletarActividad: alCompletarActividad,
            dependenciasPorSucesora: dependenciasPorSucesora,
            nombresActividades: nombresActividades,
            nombresResponsables: nombresResponsables,
            alEliminarDependencia: alEliminarDependencia,
            alAgregarDependencia: alAgregarDependenciaEnActividad,
            alMoverActividad: alMoverActividad,
          );
        }),
        if (sinHito.isNotEmpty)
          _HitoCard(
            hito: const {'nombre': 'Actividades sin hito'},
            actividades: sinHito,
            alEditarHito: null,
            alEliminarHito: null,
            alAgregarActividad: null,
            alSubir: null,
            alBajar: null,
            alEditarActividad: alEditarActividad,
            alEliminarActividad: alEliminarActividad,
            alCompletarActividad: alCompletarActividad,
            dependenciasPorSucesora: dependenciasPorSucesora,
            nombresActividades: nombresActividades,
            nombresResponsables: nombresResponsables,
            alEliminarDependencia: alEliminarDependencia,
            alAgregarDependencia: alAgregarDependenciaEnActividad,
            alMoverActividad: alMoverActividad,
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
    required this.alAgregarActividad,
    required this.alSubir,
    required this.alBajar,
    required this.alEditarActividad,
    required this.alEliminarActividad,
    required this.alCompletarActividad,
    required this.dependenciasPorSucesora,
    required this.nombresActividades,
    required this.nombresResponsables,
    required this.alEliminarDependencia,
    required this.alAgregarDependencia,
    required this.alMoverActividad,
  });
  final Map<String, dynamic> hito;
  final List<Map<String, dynamic>> actividades;
  final VoidCallback? alEditarHito, alEliminarHito;
  final VoidCallback? alAgregarActividad;
  final VoidCallback? alSubir, alBajar;
  final ValueChanged<Map<String, dynamic>> alEditarActividad,
      alEliminarActividad;
  final ValueChanged<Map<String, dynamic>> alCompletarActividad;
  final Map<String, List<Map<String, dynamic>>> dependenciasPorSucesora;
  final Map<String, String> nombresActividades, nombresResponsables;
  final ValueChanged<Map<String, dynamic>> alEliminarDependencia;
  final ValueChanged<Map<String, dynamic>> alAgregarDependencia;
  final void Function(Map<String, dynamic>, Map<String, dynamic>)
  alMoverActividad;
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
                Wrap(
                  children: [
                    IconButton(
                      onPressed: alSubir,
                      icon: const Icon(Icons.keyboard_arrow_up),
                      tooltip: 'Subir hito',
                    ),
                    IconButton(
                      onPressed: alBajar,
                      icon: const Icon(Icons.keyboard_arrow_down),
                      tooltip: 'Bajar hito',
                    ),
                    PopupMenuButton<String>(
                      onSelected: (v) {
                        if (v == 'editar') return alEditarHito!();
                        if (v == 'agregarActividad')
                          return alAgregarActividad!();
                        return alEliminarHito!();
                      },
                      itemBuilder: (_) => const [
                        PopupMenuItem(
                          value: 'agregarActividad',
                          child: Text('Agregar actividad'),
                        ),
                        PopupMenuItem(value: 'editar', child: Text('Editar')),
                        PopupMenuItem(
                          value: 'eliminar',
                          child: Text('Desactivar'),
                        ),
                      ],
                    ),
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
              alAgregarDependencia: () => alAgregarDependencia(a),
              alMover: (vecino) => alMoverActividad(a, vecino),
              anterior: actividades.indexOf(a) == 0
                  ? null
                  : actividades[actividades.indexOf(a) - 1],
              siguiente: actividades.indexOf(a) == actividades.length - 1
                  ? null
                  : actividades[actividades.indexOf(a) + 1],
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
    required this.alAgregarDependencia,
    required this.alMover,
    required this.anterior,
    required this.siguiente,
  });
  final Map<String, dynamic> item;
  final VoidCallback alEditar, alEliminar, alCompletar;
  final List<Map<String, dynamic>> dependencias;
  final Map<String, String> nombresActividades, nombresResponsables;
  final ValueChanged<Map<String, dynamic>> alEliminarDependencia;
  final VoidCallback alAgregarDependencia;
  final ValueChanged<Map<String, dynamic>> alMover;
  final Map<String, dynamic>? anterior, siguiente;
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
        } else if (v == 'subir') {
          if (anterior != null) alMover(anterior!);
        } else if (v == 'bajar') {
          if (siguiente != null) alMover(siguiente!);
        } else if (v == 'dependencia') {
          alAgregarDependencia();
        } else if (v == 'completar') {
          alCompletar();
        } else if (v == 'eliminar') {
          alEliminar();
        }
      },
      itemBuilder: (_) => const [
        PopupMenuItem(value: 'subir', child: Text('Subir')),
        PopupMenuItem(value: 'bajar', child: Text('Bajar')),
        PopupMenuItem(value: 'dependencia', child: Text('Agregar dependencia')),
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
    final timingOrdenado = [...timing]
      ..sort(
        (a, b) => _compararFecha(a['fechaHoraInicio'], b['fechaHoraInicio']),
      );
    return ListView.separated(
      padding: const EdgeInsets.fromLTRB(16, 10, 16, 96),
      itemCount: timingOrdenado.length,
      separatorBuilder: (_, __) => const SizedBox(height: 8),
      itemBuilder: (context, i) {
        final item = timingOrdenado[i];
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
                  onPressed: i == 0
                      ? null
                      : () => alMover(item, timingOrdenado[i - 1]),
                ),
                IconButton(
                  tooltip: 'Bajar',
                  icon: const Icon(Icons.keyboard_arrow_down),
                  onPressed: i == timingOrdenado.length - 1
                      ? null
                      : () => alMover(item, timingOrdenado[i + 1]),
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
int _compararFecha(Object? a, Object? b) {
  final fechaA = _fecha(a);
  final fechaB = _fecha(b);
  if (fechaA == null && fechaB == null) return 0;
  if (fechaA == null) return 1;
  if (fechaB == null) return -1;
  return fechaA.compareTo(fechaB);
}

String _fechaCorta(DateTime? value) => value == null
    ? '--'
    : '${value.day.toString().padLeft(2, '0')}/${value.month.toString().padLeft(2, '0')}/${value.year}';
String _hora(DateTime? value) => value == null
    ? '--'
    : '${value.hour.toString().padLeft(2, '0')}:${value.minute.toString().padLeft(2, '0')}';
TimeOfDay? _horaDePlantilla(Object? value) {
  final partes = value?.toString().split(':') ?? const <String>[];
  if (partes.length < 2) return null;
  final hora = int.tryParse(partes[0]);
  final minuto = int.tryParse(partes[1]);
  return hora == null || minuto == null
      ? null
      : TimeOfDay(hour: hora, minute: minuto);
}

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
  if (error is DioException) {
    final estado = error.response?.statusCode;
    final data = error.response?.data;
    if (data is Map && data['mensaje'] != null) {
      return _textoSeguro(data['mensaje'].toString());
    }
    if (estado == 401) {
      return 'Tu sesión ya no es válida. Inicia sesión nuevamente.';
    }
    return 'No pudimos comunicarnos con el servidor. Inténtalo nuevamente.';
  }
  final texto = error.toString();
  final match = RegExp(
    r'mensaje[=:]\s*([^,}]+)',
    caseSensitive: false,
  ).firstMatch(texto);
  return _textoSeguro(
    match?.group(1)?.replaceAll('"', '').trim() ??
        texto.replaceFirst('Exception: ', ''),
  );
}

String _textoSeguro(String texto) => texto
    .replaceAll('Ã³', 'ó')
    .replaceAll('Ã­', 'í')
    .replaceAll('Ã¡', 'á')
    .replaceAll('Ã©', 'é')
    .replaceAll('Ãº', 'ú')
    .replaceAll('Ã±', 'ñ')
    .replaceAll('Â¿', '¿')
    .replaceAll('Â', '')
    .replaceAll('â€”', '—');

List<Widget> _separar(List<Widget> items) {
  final salida = <Widget>[];
  for (final item in items) {
    if (salida.isNotEmpty) salida.add(const SizedBox(height: 18));
    salida.add(item);
  }
  return salida;
}
