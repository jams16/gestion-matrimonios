import 'dart:async';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../../app/theme/app_colors.dart';
import '../../../../core/widgets/buttons/app_button.dart';
import '../../../../core/widgets/feedback/app_information_card.dart';
import '../../../../core/widgets/feedback/app_snackbar.dart';
import '../../../../core/widgets/inputs/app_date_field.dart';
import '../../../../core/widgets/inputs/app_number_field.dart';
import '../../../../core/widgets/inputs/app_select_field.dart';
import '../../../../core/widgets/inputs/app_text_field.dart';
import '../../../../core/widgets/inputs/app_time_field.dart';
import '../../../../core/widgets/overlays/app_confirmation_dialog.dart';
import '../../../autenticacion/infrastructure/auth_session.dart';
import '../../../edt/infrastructure/edt_api.dart';
import '../../../proyectos/infrastructure/data_sources/matrimonios_remote_data_source.dart';
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
  late final Future<Map<String, dynamic>?> _buenaPracticaPlan;
  late final List<Future<List<Map<String, dynamic>?>>> _buenasPracticasPorSeccion;
  VoidCallback? _agregarEdt;
  Map<String, dynamic>? _ultimoCronograma;
  bool _procesando = false;
  Timer? _autoguardadoPendiente;

  @override
  void initState() {
    super.initState();
    _tabs = TabController(length: 4, vsync: this)..addListener(_redibujarTab);
    final buenasPracticas = MatrimoniosRemoteDataSource();
    _buenaPracticaPlan = buenasPracticas.obtenerBuenaPracticaPorCodigo('GP24');
    _buenasPracticasPorSeccion = [
      Future.wait([buenasPracticas.obtenerBuenaPracticaPorCodigo('GP20')]),
      Future.wait([
        buenasPracticas.obtenerBuenaPracticaPorCodigo('GP27'),
        buenasPracticas.obtenerBuenaPracticaPorCodigo('GP25'),
      ]),
      Future.wait([buenasPracticas.obtenerBuenaPracticaPorCodigo('GP28')]),
      Future.wait([buenasPracticas.obtenerBuenaPracticaPorCodigo('GP26')]),
    ];
  }

  void _redibujarTab() {
    if (mounted && !_tabs.indexIsChanging) {
      setState(() {});
    }
  }

  @override
  void didUpdateWidget(covariant CronogramaPage oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.idProyecto != widget.idProyecto) {
      _ultimoCronograma = null;
    }
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

  Widget _informacionPlan() => FutureBuilder<Map<String, dynamic>?>(
    future: _buenaPracticaPlan,
    builder: (context, snapshot) {
      final practica = snapshot.data;
      final detalle =
          practica?['aplicacionMatrimonios']?.toString() ??
          practica?['aplicacion_matrimonios']?.toString();
      if (detalle == null || detalle.trim().isEmpty) {
        return const SizedBox.shrink();
      }
      return IconButton(
        tooltip: 'Ver recomendación de planificación',
        icon: const Icon(Icons.info_outline, color: AppColors.primary),
        onPressed: () => showDialog<void>(
          context: context,
          builder: (dialogContext) => AlertDialog(
            title: const Text('Información'),
            content: ConstrainedBox(
              constraints: BoxConstraints(
                maxHeight: MediaQuery.sizeOf(dialogContext).height * .55,
              ),
              child: SingleChildScrollView(child: Text(detalle)),
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.of(dialogContext).pop(),
                child: const Text('Cerrar'),
              ),
            ],
          ),
        ),
      );
    },
  );

  Widget _informacionSeccion() =>
      FutureBuilder<List<Map<String, dynamic>?>>(
        future: _buenasPracticasPorSeccion[_tabs.index],
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const AppInformationCard(
              texto: 'Cargando informacion...',
              maxLines: 1,
            );
          }
          final detalles = (snapshot.data ?? const <Map<String, dynamic>?>[])
              .map(_aplicacionMatrimonios)
              .whereType<String>()
              .where((detalle) => detalle.trim().isNotEmpty)
              .toList();
          if (detalles.isEmpty) {
            return const SizedBox.shrink();
          }
          return AppInformationCard(
            texto: detalles.first,
            detalle: detalles.join('\n\n'),
            etiquetaDetalle: 'Ver recomendacion completa',
            maxLines: 1,
          );
        },
      );

  String? _aplicacionMatrimonios(Map<String, dynamic>? practica) =>
      practica?['aplicacionMatrimonios']?.toString() ??
      practica?['aplicacion_matrimonios']?.toString();

  /// Solo persiste cambios textuales completos sobre una instancia existente.
  /// Las fechas requieren la confirmación explícita para no saltar el preview
  /// de reprogramación y las validaciones de precedencia del backend.
  void _programarAutoguardadoActividad(
    Map<String, dynamic>? existente, {
    required String nombre,
  }) {
    if (existente == null || nombre.trim().isEmpty) {
      return;
    }
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
    if (_procesando) {
      return;
    }
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
      if (mounted) {
        setState(() => _procesando = false);
      }
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
    if (!confirmar) {
      return;
    }
    await _ejecutar(
      (api) => api.confirmarPlanificacion(widget.idProyecto),
      exito: 'Cronograma planificado correctamente.',
    );
    AuthSession.actualizarPlanificacionConfirmada(true);
    if (mounted) {
      context.go('/home');
    }
  }

  Future<void> _mostrarDetalleActividad(Map<String, dynamic> actividad) async {
    final id = actividad['idActividad']?.toString();
    if (id == null || id.isEmpty) return;
    await showModalBottomSheet<void>(
      context: context,
      isScrollControlled: true,
      builder: (context) => _DetalleActividadSheet(
        actividad: actividad,
        cargarChecklist: () => ref
            .read(cronogramaApiProvider)
            .checklistActividad(widget.idProyecto, id),
        agregarChecklist: (descripcion) => ref
            .read(cronogramaApiProvider)
            .crearChecklistActividad(widget.idProyecto, id, descripcion),
        actualizarChecklist: (idChecklist, data) => ref
            .read(cronogramaApiProvider)
            .actualizarChecklistActividad(
              widget.idProyecto,
              id,
              idChecklist,
              data,
            ),
      ),
    );
  }

  Future<void> _mostrarDetalleHito(
    Map<String, dynamic> hito,
    List<Map<String, dynamic>> actividades,
    List<Map<String, dynamic>> todasLasActividades,
  ) async {
    await showModalBottomSheet<void>(
      context: context,
      isScrollControlled: true,
      builder: (_) => _DetalleHitoSheet(
        hito: hito,
        actividades: actividades,
        disponibles: todasLasActividades
            .where(
              (actividad) => !actividades.any(
                (asociada) =>
                    asociada['idActividad']?.toString() ==
                    actividad['idActividad']?.toString(),
              ),
            )
            .toList(),
        onAsociarActividad: (actividad) {
          Navigator.of(context).pop();
          return _ejecutar(
            (api) => api.asociarActividadAHito(
              widget.idProyecto,
              hito['idHito'].toString(),
              actividad['idActividad'].toString(),
            ),
            exito: 'Actividad agregada al hito.',
          );
        },
        onQuitarActividad: (actividad) {
          Navigator.of(context).pop();
          return _ejecutar(
            (api) => api.quitarActividadDeHito(
              widget.idProyecto,
              hito['idHito'].toString(),
              actividad['idActividad'].toString(),
            ),
            exito: 'Actividad quitada del hito.',
          );
        },
      ),
    );
    await _recargar();
  }

  Future<void> _reiniciarTiming(List<Map<String, dynamic>> timing) async {
    final hora = await showTimePicker(
      context: context,
      initialTime: const TimeOfDay(hour: 8, minute: 0),
      builder: (context, child) => MediaQuery(
        data: MediaQuery.of(context).copyWith(alwaysUse24HourFormat: true),
        child: child!,
      ),
    );
    if (hora == null) return;
    final confirmar = await AppConfirmationDialog.show(
      context,
      title: 'Reiniciar timing',
      message:
          'Se reemplazarán los momentos generados actualmente por una nueva línea de tiempo desde ${hora.format(context)}.',
      cancelLabel: 'Volver',
      confirmLabel: 'Reiniciar',
    );
    if (!confirmar) return;
    await _ejecutar((api) async {
      for (final momento in timing) {
        final id = momento['idTiming']?.toString();
        if (id != null && id.isNotEmpty)
          await api.eliminarTiming(widget.idProyecto, id);
      }
      await api.generarTiming(
        widget.idProyecto,
        '${hora.hour.toString().padLeft(2, '0')}:${hora.minute.toString().padLeft(2, '0')}',
      );
    }, exito: 'Timing reiniciado con la nueva hora de inicio.');
  }

  Future<void> _agregarActividadAHito(
    Map<String, dynamic> hito,
    List<Map<String, dynamic>> actividades,
    List<Map<String, dynamic>> responsables,
    List<Map<String, dynamic>> hitos,
  ) async {
    final accion = await showModalBottomSheet<String>(
      context: context,
      showDragHandle: true,
      builder: (_) => SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              leading: const Icon(Icons.add_task_outlined),
              title: const Text('Crear actividad'),
              subtitle: const Text('Crear una actividad nueva para este hito.'),
              onTap: () => Navigator.pop(context, 'crear'),
            ),
            ListTile(
              leading: const Icon(Icons.playlist_add_outlined),
              title: const Text('Añadir actividad existente'),
              subtitle: const Text(
                'Vincular una actividad ya registrada en el cronograma.',
              ),
              onTap: () => Navigator.pop(context, 'vincular'),
            ),
          ],
        ),
      ),
    );
    if (!mounted || accion == null) {
      return;
    }
    if (accion == 'crear') {
      await _editarActividad(
        null,
        responsables,
        idHito: hito['idHito']?.toString(),
      );
      return;
    }
    final elegida = await showModalBottomSheet<Map<String, dynamic>>(
      context: context,
      showDragHandle: true,
      builder: (_) => SafeArea(
        child: ListView(
          shrinkWrap: true,
          children: actividades
              .map(
                (actividad) => ListTile(
                  leading: const Icon(Icons.task_alt_outlined),
                  title: Text(actividad['nombre']?.toString() ?? 'Actividad'),
                  subtitle: Text(
                    'Vence ${_fechaCorta(_fecha(actividad['fechaFin']))}',
                  ),
                  onTap: () => Navigator.pop(context, actividad),
                ),
              )
              .toList(),
        ),
      ),
    );
    if (elegida == null) {
      return;
    }
    await _ejecutar(
      (api) => api.asociarActividadAHito(
        widget.idProyecto,
        hito['idHito'].toString(),
        elegida['idActividad'].toString(),
      ),
      exito: 'Actividad agregada al hito.',
    );
  }

  Future<void> _mostrarDetalleTiming(Map<String, dynamic> timing) async {
    final idTiming = timing['idTiming']?.toString();
    if (idTiming == null || idTiming.isEmpty) {
      return;
    }
    await showModalBottomSheet<void>(
      context: context,
      isScrollControlled: true,
      builder: (_) => _DetalleTimingSheet(
        timing: timing,
        guardarChecklist: (items) =>
            ref.read(cronogramaApiProvider).actualizarTiming(
              widget.idProyecto,
              idTiming,
              {'listaVerificacion': items},
            ),
      ),
    );
    await _recargar();
  }

  @override
  Widget build(BuildContext context) {
    final estado = ref.watch(cronogramaProvider(widget.idProyecto));
    final datosActuales = estado.maybeWhen(
      data: (data) {
        _ultimoCronograma = data;
        return data;
      },
      orElse: () => _ultimoCronograma,
    );
    final proyectoActual = _mapa(
      _mapa(datosActuales?['cronograma'])['proyecto'],
    );
    final faseActual = _mapa(proyectoActual['faseProyecto']);
    final puedeConfirmar =
        (faseActual['codigo'] ?? proyectoActual['faseProyectoCodigo'])
            ?.toString() ==
        'INICIO';
    final contenido = datosActuales != null
        ? _contenido(datosActuales)
        : estado.when(
            loading: () => const Center(child: CircularProgressIndicator()),
            error: (error, _) => _ErrorCarga(
              mensaje: _mensajeError(error),
              alReintentar: _recargar,
            ),
            data: (_) => const SizedBox.shrink(),
          );
    final botonFlotante = datosActuales == null
        ? null
        : FloatingActionButton.extended(
            onPressed: _procesando
                ? null
                : _tabs.index == 0
                ? _agregarEdt
                : () => _tabs.index == 1
                      ? _mostrarAccionesCronograma(datosActuales)
                      : _tabs.index == 2
                      ? _editarHito(null)
                      : _editarTiming(
                          datosActuales,
                          _responsablesDe(datosActuales),
                        ),
            icon: Icon(
              _tabs.index == 0
                  ? Icons.account_tree_outlined
                  : _tabs.index == 3
                  ? Icons.add_alarm_outlined
                  : Icons.add_task_outlined,
            ),
            label: Text(
              _tabs.index == 0
                  ? 'Agregar sección'
                  : _tabs.index == 3
                  ? 'Agregar momento'
                  : 'Agregar',
            ),
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
      nombreProyecto: proyecto['nombre']?.toString(),
      planificacionConfirmada:
          faseCodigo == 'PLANIFICACION' ||
          faseCodigo == 'MONITOREO_Y_CONTROL' ||
          faseCodigo == 'EJECUCION' ||
          faseCodigo == 'CIERRE',
    );
    final actividades = _lista(cronograma['actividades']);
    final hitos = _lista(cronograma['hitos']);
    final dependencias = _lista(cronograma['dependencias']);
    final hitoActividades = _lista(cronograma['hitoActividades']);
    final timing = _lista(cronograma['timing']);
    final fechaBoda = _fecha(matrimonio['fechaMatrimonio']);
    final completadas = actividades
        .where((a) => a['estado'] == 'COMPLETADA')
        .length;
    final hitosLogrados = hitos
        .where(
          (hito) =>
              hito['estado']?.toString() == 'COMPLETADO' ||
              hito['estado']?.toString() == 'COMPLETADA',
        )
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
              const Text('PLAN', style: TextStyle(fontWeight: FontWeight.w800)),
              _informacionPlan(),
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
          hitosLogrados: hitosLogrados,
          totalHitos: hitos.length,
        ),
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 10, 16, 8),
          child: _NavegacionSegmentadaPlan(
            seleccionado: _tabs.index,
            onSeleccionar: _tabs.animateTo,
          ),
        ),
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 0, 16, 8),
          child: _informacionSeccion(),
        ),
        Expanded(
          child: TabBarView(
            controller: _tabs,
            children: [
              _EdtMatrimonioPanel(
                idMatrimonio: matrimonio['idMatrimonio']?.toString(),
                onRegistrarAgregar: (accion) {
                  if (_agregarEdt != accion) {
                    WidgetsBinding.instance.addPostFrameCallback((_) {
                      if (mounted) setState(() => _agregarEdt = accion);
                    });
                  }
                },
              ),
              _ListaCronograma(
                hitos: hitos,
                actividades: actividades,
                dependencias: dependencias,
                hitoActividades: hitoActividades,
                alEditarActividad: (item) =>
                    _editarActividad(item, responsables),
                alEliminarActividad: _eliminarActividad,
                alVerActividad: _mostrarDetalleActividad,
                alEditarHito: _editarHito,
                alEliminarHito: _eliminarHito,
                alAgregarDependenciaEnActividad: (actividad) =>
                    _editarDependencia(
                      actividades,
                      hitos,
                      predecesoraInicial: actividad,
                    ),
                alMoverActividad: _moverActividad,
                alMoverHito: _moverHito,
                alEliminarDependencia: _eliminarDependencia,
                nombresResponsables: nombresResponsables,
              ),
              _ListaHitos(
                hitos: hitos,
                actividades: actividades,
                hitoActividades: hitoActividades,
                onEdit: _editarHito,
                onDelete: _eliminarHito,
                onOpen: (hito, asociadas) =>
                    _mostrarDetalleHito(hito, asociadas, actividades),
              ),
              _ListaTiming(
                timing: timing,
                alEditar: (item) =>
                    _editarTiming(data, responsables, existente: item),
                alEliminar: _eliminarTiming,
                alMover: _moverTiming,
                nombresResponsables: nombresResponsables,
                alVer: _mostrarDetalleTiming,
                alGenerar: (hora) => _ejecutar(
                  (api) => api.generarTiming(widget.idProyecto, hora),
                  exito: 'Timing generado correctamente.',
                ),
                alReiniciar: () => _reiniciarTiming(timing),
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
                leading: const Icon(Icons.account_tree_outlined),
                title: const Text('Crear dependencia'),
                onTap: () => Navigator.pop(sheetContext, 'dependencia'),
              ),
            ],
          ),
        ),
      ),
    );
    if (!mounted || accion == null) {
      return;
    }
    switch (accion) {
      case 'hito':
        await _editarHito(null);
      case 'actividad':
        await _editarActividad(null, _responsablesDe(data));
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
    if (!guardar || !form.currentState!.validate() || fecha == null) {
      return;
    }
    final data = <String, dynamic>{
      'nombre': nombre.text.trim(),
      'criterioAceptacion': _nuloSiVacio(criterio.text),
      'fechaObjetivo': fecha!.toIso8601String(),
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
    String? idHito,
  }) async {
    final nombre = TextEditingController(
      text: existente?['nombre']?.toString(),
    );
    DateTime? fin =
        _fecha(existente?['fechaFin']) ??
        DateTime.now().add(const Duration(days: 7));
    int? idResponsable = int.tryParse(
      existente?['idUsuarioResponsable']?.toString() ?? '',
    );
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
                    label: 'Fecha de fin',
                    initialDate: fin,
                    onChanged: (value) => setDialogState(() => fin = value),
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
    if (guardar != true) {
      return;
    }
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
    final data = <String, dynamic>{
      'nombre': nombre.text.trim(),
      'fechaFin': fin!.toIso8601String(),
      'prioridad': existente?['prioridad']?.toString() ?? 'MEDIA',
      if (idResponsable != null) 'idUsuarioResponsable': idResponsable,
      if (existente == null && idHito != null) 'idHito': idHito,
    };
    if (existente == null) {
      await _ejecutar(
        (api) => api.crearActividad(widget.idProyecto, data),
        exito: 'Actividad creada.',
      );
      return;
    }
    final cambioFechas =
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
      final actividadesAfectadas = _lista(
        impacto['actividades_afectadas'] ?? impacto['actividadesAfectadas'],
      );
      final afectadas = actividadesAfectadas.length;
      if (!mounted) {
        return;
      }
      final propagar = await AppConfirmationDialog.show(
        context,
        title: 'Reprogramar actividad',
        message: afectadas == 0
            ? 'No se detectaron sucesoras afectadas. ¿Deseas guardar la nueva fecha?'
            : 'Se detectaron $afectadas actividades sucesoras afectadas. ¿Deseas aplicar también los desplazamientos sugeridos?',
        confirmLabel: afectadas == 0 ? 'Guardar' : 'Propagar y guardar',
        cancelLabel: 'Volver',
      );
      if (!propagar) {
        return;
      }
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
    // Desde el botón general se elige primero la actividad base; luego el
    // mismo formulario permite definir una predecesora, sucesora o ambas.
    if (predecesoraInicial == null && sucesoraInicial == null) {
      final base = await showModalBottomSheet<Map<String, dynamic>>(
        context: context,
        showDragHandle: true,
        builder: (sheetContext) => SafeArea(
          child: ListView(
            shrinkWrap: true,
            children: actividades
                .map(
                  (actividad) => ListTile(
                    leading: const Icon(Icons.task_alt_outlined),
                    title: Text(actividad['nombre']?.toString() ?? 'Actividad'),
                    onTap: () => Navigator.pop(sheetContext, actividad),
                  ),
                )
                .toList(),
          ),
        ),
      );
      if (base != null) {
        await _editarDependencia(actividades, hitos, predecesoraInicial: base);
      }
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
    if (guardar != true) {
      return;
    }
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
    // Un momento nuevo corresponde al día del matrimonio activo.
    final fechaMatrimonio =
        _fecha(_mapa(data['matrimonio'])['fechaMatrimonio']) ?? DateTime.now();
    final momentosActuales = _lista(_mapa(data['cronograma'])['timing']);
    final ultimoMomento = momentosActuales
        .map((item) => _fechaHora(item['fechaHoraFin']))
        .whereType<DateTime>()
        .fold<DateTime?>(
          null,
          (mayor, fecha) =>
              mayor == null || fecha.isAfter(mayor) ? fecha : mayor,
        );
    final inicioExistente =
        _fechaHora(existente?['fechaHoraInicio']) ??
        ultimoMomento ??
        DateTime(
          fechaMatrimonio.year,
          fechaMatrimonio.month,
          fechaMatrimonio.day,
          8,
        );
    DateTime? fechaInicio = inicioExistente;
    TimeOfDay? horaInicio = TimeOfDay.fromDateTime(inicioExistente);
    var duracion =
        int.tryParse(
          existente?['duracionMinutos']?.toString() ??
              plantilla?['duracionMinutos']?.toString() ??
              '',
        ) ??
        60;
    var tiempoExtra =
        int.tryParse(
          existente?['tiempoExtraMinutos']?.toString() ??
              plantilla?['tiempoExtraMinutos']?.toString() ??
              '',
        ) ??
        0;
    var tipoHorario =
        existente?['tipoHorario']?.toString() ??
        plantilla?['tipoHorario']?.toString() ??
        'FLEXIBLE';
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
                  AppSelectField<String>(
                    label: 'Tipo de horario',
                    initialValue: tipoHorario,
                    options: const [
                      AppSelectOption(value: 'FLEXIBLE', label: 'Flexible'),
                      AppSelectOption(value: 'FIJO', label: 'Fijo'),
                    ],
                    onChanged: (value) =>
                        setDialogState(() => tipoHorario = value ?? 'FLEXIBLE'),
                  ),
                  const SizedBox(height: 18),
                  Row(
                    children: [
                      Expanded(
                        child: AppDateField(
                          label: 'Fecha de inicio',
                          initialDate: fechaInicio,
                          onChanged: (valor) =>
                              setDialogState(() => fechaInicio = valor),
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: AppTimeField(
                          label: 'Hora de inicio',
                          initialTime: horaInicio,
                          onChanged: (valor) =>
                              setDialogState(() => horaInicio = valor),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 18),
                  _SelectorMinutos(
                    etiqueta: 'Duración (min)',
                    valor: duracion,
                    minimo: 1,
                    onChanged: (valor) =>
                        setDialogState(() => duracion = valor),
                  ),
                  const SizedBox(height: 18),
                  _SelectorMinutos(
                    etiqueta: 'Tiempo extra (min)',
                    valor: tiempoExtra,
                    onChanged: (valor) =>
                        setDialogState(() => tiempoExtra = valor),
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
    if (guardar != true || !form.currentState!.validate()) {
      return;
    }
    if (fechaInicio == null || horaInicio == null) {
      return;
    }
    final inicio = DateTime(
      fechaInicio!.year,
      fechaInicio!.month,
      fechaInicio!.day,
      horaInicio!.hour,
      horaInicio!.minute,
    );
    final fin = inicio.add(Duration(minutes: duracion));
    final payload = <String, dynamic>{
      'actividad': actividad.text.trim(),
      'fechaHoraInicio': inicio.toIso8601String(),
      'fechaHoraFin': fin.toIso8601String(),
      'duracionMinutos': duracion,
      'tipoHorario': tipoHorario,
      'tiempoExtraMinutos': tiempoExtra,
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
    if (finActividad == null || finVecino == null) {
      return;
    }
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

  Future<void> _moverHito(Map<String, dynamic> hito, int nuevaPosicion) async {
    await _ejecutar((api) async {
      await api.actualizarHito(widget.idProyecto, hito['idHito'].toString(), {
        'orden': nuevaPosicion,
      });
    }, exito: 'Posición del hito actualizada.');
  }

  Future<void> _sugerencias(Map<String, dynamic> data) async {
    try {
      final api = ref.read(cronogramaApiProvider);
      final tipo = await _seleccionarTipoPlantilla();
      if (tipo == null || !mounted) {
        return;
      }
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
        if (elegido != null) {
          await _editarHito(null, plantilla: elegido);
        }
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
      if (!mounted) {
        return;
      }
      final elegido = await _elegirPlantilla(
        'Actividades disponibles',
        disponibles,
      );
      if (elegido == null || !mounted) {
        return;
      }
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
    if (!guardar || !form.currentState!.validate() || fecha == null) {
      return;
    }
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
    if (aceptar) {
      await _ejecutar(accion, exito: exito);
    }
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

class _NavegacionSegmentadaPlan extends StatelessWidget {
  const _NavegacionSegmentadaPlan({
    required this.seleccionado,
    required this.onSeleccionar,
  });

  final int seleccionado;
  final ValueChanged<int> onSeleccionar;

  @override
  Widget build(BuildContext context) {
    const opciones = [
      (texto: 'EDT', icono: Icons.account_tree_outlined),
      (texto: 'Cronograma', icono: Icons.calendar_month_outlined),
      (texto: 'Hitos', icono: Icons.flag_outlined),
      (texto: 'Timing', icono: Icons.schedule_outlined),
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
              flex: seleccionada ? 4 : 1,
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
                          Flexible(
                            child: Text(
                              opcion.texto,
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style: const TextStyle(
                                color: Colors.white,
                                fontWeight: FontWeight.w700,
                              ),
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

class _CabeceraCronograma extends StatelessWidget {
  const _CabeceraCronograma({
    required this.fechaBoda,
    required this.fechaInicioProyecto,
    required this.progreso,
    required this.actividadesCompletadas,
    required this.totalActividades,
    required this.hitosLogrados,
    required this.totalHitos,
  });
  final DateTime? fechaBoda;
  final DateTime? fechaInicioProyecto;
  final double progreso;
  final int actividadesCompletadas, totalActividades;
  final int hitosLogrados, totalHitos;
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
                : 'Boda: ${_fechaLarga(fechaBoda!)}',
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
          Row(
            children: [
              Expanded(
                child: _MetricaProgreso(
                  valor: progreso,
                  texto:
                      '$actividadesCompletadas de $totalActividades actividades',
                ),
              ),
              const SizedBox(width: 14),
              Expanded(
                child: _MetricaProgreso(
                  valor: totalHitos == 0 ? 0 : hitosLogrados / totalHitos,
                  texto: '$hitosLogrados de $totalHitos hitos',
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _MetricaProgreso extends StatelessWidget {
  const _MetricaProgreso({required this.valor, required this.texto});
  final double valor;
  final String texto;

  @override
  Widget build(BuildContext context) => Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      LinearProgressIndicator(
        value: valor,
        minHeight: 8,
        borderRadius: BorderRadius.circular(8),
        color: AppColors.primary,
        backgroundColor: Colors.white,
      ),
      const SizedBox(height: 6),
      Text(texto, style: Theme.of(context).textTheme.labelMedium),
    ],
  );
}

class _ListaCronograma extends StatelessWidget {
  const _ListaCronograma({
    required this.hitos,
    required this.actividades,
    required this.dependencias,
    required this.hitoActividades,
    required this.alEditarActividad,
    required this.alEliminarActividad,
    required this.alVerActividad,
    required this.alEditarHito,
    required this.alEliminarHito,
    required this.alAgregarDependenciaEnActividad,
    required this.alMoverActividad,
    required this.alMoverHito,
    required this.alEliminarDependencia,
    required this.nombresResponsables,
  });
  final List<Map<String, dynamic>> hitos,
      actividades,
      dependencias,
      hitoActividades;
  final ValueChanged<Map<String, dynamic>> alEditarActividad;
  final ValueChanged<Map<String, dynamic>> alEliminarActividad;
  final ValueChanged<Map<String, dynamic>> alVerActividad;
  final ValueChanged<Map<String, dynamic>> alEditarHito;
  final ValueChanged<Map<String, dynamic>> alEliminarHito;
  final ValueChanged<Map<String, dynamic>> alAgregarDependenciaEnActividad;
  final void Function(Map<String, dynamic>, Map<String, dynamic>)
  alMoverActividad;
  final void Function(Map<String, dynamic>, int) alMoverHito;
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
    int compararActividad(Map<String, dynamic> a, Map<String, dynamic> b) {
      final porFecha = _compararFecha(a['fechaFin'], b['fechaFin']);
      return porFecha != 0
          ? porFecha
          : _compararFecha(a['createdAt'], b['createdAt']);
    }

    final actividadesOrdenadas = [...actividades]..sort(compararActividad);
    final nombresActividades = {
      for (final actividad in actividades)
        actividad['idActividad'].toString():
            actividad['nombre']?.toString() ?? 'Actividad',
    };
    final actividadesPorId = {
      for (final actividad in actividadesOrdenadas)
        actividad['idActividad'].toString(): actividad,
    };
    final dependenciasPorSucesora = <String, List<Map<String, dynamic>>>{};
    for (final dependencia in dependencias) {
      final sucesora = dependencia['idActividadSucesora']?.toString();
      if (sucesora != null) {
        (dependenciasPorSucesora[sucesora] ??= []).add(dependencia);
      }
    }
    final actividadesPorHito = <String, List<Map<String, dynamic>>>{
      for (final hito in hitos) hito['idHito'].toString(): [],
    };
    for (final relacion in hitoActividades) {
      final idHito = relacion['idHito']?.toString();
      final actividad = actividadesPorId[relacion['idActividad']?.toString()];
      if (idHito != null && actividad != null) {
        (actividadesPorHito[idHito] ??= []).add(actividad);
      }
    }
    int posicionPorFecha(Map<String, dynamic> hito) {
      final fecha = _fecha(hito['fechaObjetivo']);
      if (fecha == null) return actividadesOrdenadas.length;
      return actividadesOrdenadas.where((actividad) {
        final fin = _fecha(actividad['fechaFin']);
        return fin != null && !fin.isAfter(fecha);
      }).length;
    }

    int posicionHito(Map<String, dynamic> hito) {
      final ordenManual = int.tryParse(hito['orden']?.toString() ?? '');
      if (hito['modificadoManualmente'] == true && ordenManual != null) {
        return ordenManual.clamp(0, actividadesOrdenadas.length);
      }
      final asociadas =
          actividadesPorHito[hito['idHito']?.toString()] ?? const [];
      if (asociadas.isNotEmpty) {
        final ids = asociadas
            .map((item) => item['idActividad']?.toString())
            .toSet();
        return actividadesOrdenadas.lastIndexWhere(
              (actividad) => ids.contains(actividad['idActividad']?.toString()),
            ) +
            1;
      }
      return posicionPorFecha(hito);
    }

    final hitosUbicados =
        hitos.map((hito) {
          final posicion = posicionHito(hito);
          return (hito: Map<String, dynamic>.from(hito), posicion: posicion);
        }).toList()..sort(
          (a, b) => a.posicion != b.posicion
              ? a.posicion.compareTo(b.posicion)
              : (a.hito['modificadoManualmente'] == true).toString().compareTo(
                  (b.hito['modificadoManualmente'] == true).toString(),
                ),
        );

    Widget actividadCard(Map<String, dynamic> actividad, int indice) =>
        _ActividadFila(
          item: actividad,
          alEditar: () => alEditarActividad(actividad),
          alEliminar: () => alEliminarActividad(actividad),
          alVer: () => alVerActividad(actividad),
          dependencias:
              dependenciasPorSucesora[actividad['idActividad']?.toString()] ??
              const [],
          nombresActividades: nombresActividades,
          nombresResponsables: nombresResponsables,
          alEliminarDependencia: alEliminarDependencia,
          alAgregarDependencia: () =>
              alAgregarDependenciaEnActividad(actividad),
          alMover: (vecino) => alMoverActividad(actividad, vecino),
          anterior: indice == 0 ? null : actividadesOrdenadas[indice - 1],
          siguiente: indice == actividadesOrdenadas.length - 1
              ? null
              : actividadesOrdenadas[indice + 1],
        );

    final elementos = <Widget>[];
    for (
      var posicion = 0;
      posicion <= actividadesOrdenadas.length;
      posicion++
    ) {
      if (posicion > 0) {
        elementos.add(
          actividadCard(actividadesOrdenadas[posicion - 1], posicion - 1),
        );
      }
      for (final ubicado in hitosUbicados.where(
        (item) => item.posicion == posicion,
      )) {
        final hito = ubicado.hito;
        final indiceHito = hitosUbicados.indexOf(ubicado);
        final tieneHitoDespues = indiceHito < hitosUbicados.length - 1;
        elementos.add(
          _HitoCard(
            hito: hito,
            alEditarHito: () => alEditarHito(hito),
            alEliminarHito: () => alEliminarHito(hito),
            alSubir: posicion == 0
                ? null
                : () => alMoverHito(hito, posicion - 1),
            alBajar: posicion == actividadesOrdenadas.length
                ? (tieneHitoDespues ? () => alMoverHito(hito, posicion) : null)
                : () => alMoverHito(hito, posicion + 1),
          ),
        );
      }
    }
    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 8, 16, 96),
      children: elementos,
    );
  }
}

class _HitoCard extends StatelessWidget {
  const _HitoCard({
    required this.hito,
    required this.alEditarHito,
    required this.alEliminarHito,
    required this.alSubir,
    required this.alBajar,
  });
  final Map<String, dynamic> hito;
  final VoidCallback? alEditarHito, alEliminarHito;
  final VoidCallback? alSubir, alBajar;
  @override
  Widget build(BuildContext context) => Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      // En la línea de tiempo primero se muestran las tareas necesarias;
      // el hito queda como resultado de ese bloque de trabajo.
      Card(
        margin: const EdgeInsets.only(bottom: 16),
        color: const Color(0xFFF4F0FB),
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
                            if (v == 'editar') {
                              return alEditarHito!();
                            }
                            return alEliminarHito!();
                          },
                          itemBuilder: (_) => const [
                            PopupMenuItem(
                              value: 'editar',
                              child: Text('Editar'),
                            ),
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
                    'Objetivo: ${_fechaCorta(_fecha(hito['fechaObjetivo']))}',
                  ),
                ),
            ],
          ),
        ),
      ),
    ],
  );
}

class _ActividadFila extends StatelessWidget {
  const _ActividadFila({
    required this.item,
    required this.alEditar,
    required this.alEliminar,
    required this.alVer,
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
  final VoidCallback alEditar, alEliminar, alVer;
  final List<Map<String, dynamic>> dependencias;
  final Map<String, String> nombresActividades, nombresResponsables;
  final ValueChanged<Map<String, dynamic>> alEliminarDependencia;
  final VoidCallback alAgregarDependencia;
  final ValueChanged<Map<String, dynamic>> alMover;
  final Map<String, dynamic>? anterior, siguiente;
  @override
  Widget build(BuildContext context) => Card(
    margin: const EdgeInsets.only(bottom: 8),
    child: ListTile(
      onTap: alVer,
      isThreeLine: true,
      contentPadding: const EdgeInsets.only(left: 8, right: 2),
      leading: Icon(
        item['estado'] == 'COMPLETADA'
            ? Icons.check_circle
            : Icons.radio_button_unchecked,
        color: item['estado'] == 'COMPLETADA'
            ? Colors.green
            : AppColors.primary,
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
      trailing: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          IconButton(
            tooltip: 'Subir actividad',
            onPressed: anterior == null ? null : () => alMover(anterior!),
            icon: const Icon(Icons.keyboard_arrow_up),
          ),
          IconButton(
            tooltip: 'Bajar actividad',
            onPressed: siguiente == null ? null : () => alMover(siguiente!),
            icon: const Icon(Icons.keyboard_arrow_down),
          ),
          PopupMenuButton<String>(
            onSelected: (v) {
              if (v == 'editar') {
                alEditar();
              } else if (v == 'dependencia') {
                alAgregarDependencia();
              } else if (v == 'eliminar') {
                alEliminar();
              }
            },
            itemBuilder: (_) => const [
              PopupMenuItem(value: 'editar', child: Text('Editar')),
              PopupMenuItem(
                value: 'dependencia',
                child: Text('Agregar dependencia'),
              ),
              PopupMenuItem(value: 'eliminar', child: Text('Eliminar')),
            ],
          ),
        ],
      ),
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
      _ => ('Pendiente', const Color(0xFFF9A825)),
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
    required this.alVer,
    required this.alGenerar,
    required this.alReiniciar,
  });
  final List<Map<String, dynamic>> timing;
  final ValueChanged<Map<String, dynamic>> alEditar, alEliminar;
  final void Function(Map<String, dynamic>, Map<String, dynamic>) alMover;
  final Map<String, String> nombresResponsables;
  final ValueChanged<Map<String, dynamic>> alVer;
  final ValueChanged<String> alGenerar;
  final VoidCallback alReiniciar;
  @override
  Widget build(BuildContext context) {
    if (timing.isEmpty) return _GenerarTimingVacio(onGenerar: alGenerar);
    /*if (timing.isEmpty)
      return const _Vacio(
        icon: Icons.schedule_outlined,
        titulo: 'Sin momentos programados',
        mensaje:
            'Agrega los momentos del día de la boda para construir su línea de tiempo.',
      );*/
    final timingOrdenado = [...timing]
      ..sort(
        (a, b) =>
            _compararFechaHora(a['fechaHoraInicio'], b['fechaHoraInicio']),
      );
    return ListView.separated(
      padding: const EdgeInsets.fromLTRB(16, 10, 16, 96),
      itemCount: timingOrdenado.length + 1,
      separatorBuilder: (_, __) => const SizedBox(height: 8),
      itemBuilder: (context, indice) {
        if (indice == 0) {
          final inicio = _fechaHora(timingOrdenado.first['fechaHoraInicio']);
          return Row(
            children: [
              Expanded(
                child: InputDecorator(
                  decoration: const InputDecoration(
                    labelText: 'Hora de inicio del timing',
                    prefixIcon: Icon(Icons.access_time_outlined),
                  ),
                  child: Text(_hora(inicio)),
                ),
              ),
              const SizedBox(width: 10),
              IconButton.filledTonal(
                tooltip: 'Reiniciar generación automática',
                onPressed: alReiniciar,
                icon: const Icon(Icons.restart_alt),
              ),
            ],
          );
        }
        final i = indice - 1;
        final item = timingOrdenado[i];
        return DragTarget<Map<String, dynamic>>(
          onWillAcceptWithDetails: (detalle) =>
              detalle.data['idTiming']?.toString() !=
              item['idTiming']?.toString(),
          onAcceptWithDetails: (detalle) => alMover(detalle.data, item),
          builder: (context, candidatos, _) => Card(
            color: candidatos.isEmpty
                ? null
                : Theme.of(context).colorScheme.primaryContainer,
            child: ListTile(
              onTap: () => alVer(item),
              leading: SizedBox(
                width: 76,
                child: Row(
                  children: [
                    LongPressDraggable<Map<String, dynamic>>(
                      data: item,
                      feedback: Material(
                        color: Colors.transparent,
                        child: Icon(
                          Icons.drag_indicator,
                          color: Theme.of(context).colorScheme.primary,
                          size: 30,
                        ),
                      ),
                      childWhenDragging: const Icon(
                        Icons.drag_indicator,
                        color: Colors.transparent,
                      ),
                      child: const Icon(
                        Icons.drag_indicator,
                        color: AppColors.primary,
                        semanticLabel: 'Mantén y arrastra para mover',
                      ),
                    ),
                    const SizedBox(width: 6),
                    CircleAvatar(
                      radius: 23,
                      child: FittedBox(
                        child: Text(
                          _hora(_fechaHora(item['fechaHoraInicio'])),
                          style: const TextStyle(fontWeight: FontWeight.w800),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              title: Text(item['actividad']?.toString() ?? 'Momento'),
              subtitle: Wrap(
                spacing: 8,
                runSpacing: 4,
                children: [
                  _DatoActividad(
                    icon: Icons.schedule_outlined,
                    texto: 'Hasta ${_hora(_fechaHora(item['fechaHoraFin']))}',
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
                      PopupMenuItem(
                        value: 'eliminar',
                        child: Text('Desactivar'),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}

class _SelectorMinutos extends StatelessWidget {
  const _SelectorMinutos({
    required this.etiqueta,
    required this.valor,
    required this.onChanged,
    this.minimo = 0,
  });

  final String etiqueta;
  final int valor;
  final int minimo;
  final ValueChanged<int> onChanged;

  @override
  Widget build(BuildContext context) => AppNumberField(
    label: etiqueta,
    initialValue: valor,
    min: minimo,
    step: 1,
    onChanged: (nuevoValor) => onChanged(nuevoValor.toInt()),
  );
}

class _GenerarTimingVacio extends StatefulWidget {
  const _GenerarTimingVacio({required this.onGenerar});
  final ValueChanged<String> onGenerar;
  @override
  State<_GenerarTimingVacio> createState() => _GenerarTimingVacioState();
}

class _GenerarTimingVacioState extends State<_GenerarTimingVacio> {
  TimeOfDay? _hora;
  @override
  Widget build(BuildContext context) => _VacioConAccion(
    icon: Icons.schedule_outlined,
    titulo: 'Define el inicio del timing',
    mensaje:
        'Elige la hora inicial para generar una línea de tiempo basada en las plantillas.',
    accion: AppButton(
      label: _hora == null
          ? 'Elegir hora de inicio'
          : 'Generar desde las plantillas',
      icon: Icons.access_time_outlined,
      onPressed: () async {
        if (_hora == null) {
          final elegida = await showTimePicker(
            context: context,
            initialTime: const TimeOfDay(hour: 8, minute: 0),
            builder: (context, child) => MediaQuery(
              data: MediaQuery.of(
                context,
              ).copyWith(alwaysUse24HourFormat: true),
              child: child!,
            ),
          );
          if (elegida != null && mounted) setState(() => _hora = elegida);
          return;
        }
        widget.onGenerar(
          '${_hora!.hour.toString().padLeft(2, '0')}:${_hora!.minute.toString().padLeft(2, '0')}',
        );
      },
    ),
  );
}

class _VacioConAccion extends StatelessWidget {
  const _VacioConAccion({
    required this.icon,
    required this.titulo,
    required this.mensaje,
    required this.accion,
  });
  final IconData icon;
  final String titulo, mensaje;
  final Widget accion;
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
          const SizedBox(height: 18),
          accion,
        ],
      ),
    ),
  );
}

class _ListaHitos extends StatelessWidget {
  const _ListaHitos({
    required this.hitos,
    required this.actividades,
    required this.hitoActividades,
    required this.onEdit,
    required this.onDelete,
    required this.onOpen,
  });
  final List<Map<String, dynamic>> hitos, actividades, hitoActividades;
  final ValueChanged<Map<String, dynamic>> onEdit;
  final ValueChanged<Map<String, dynamic>> onDelete;
  final void Function(Map<String, dynamic>, List<Map<String, dynamic>>) onOpen;
  @override
  Widget build(BuildContext context) {
    final actividadesOrdenadas = [...actividades]
      ..sort((a, b) => _compararFecha(a['fechaFin'], b['fechaFin']));
    int posicionPorFecha(Map<String, dynamic> hito) {
      final fecha = _fecha(hito['fechaObjetivo']);
      if (fecha == null) return actividadesOrdenadas.length;
      return actividadesOrdenadas.where((actividad) {
        final fin = _fecha(actividad['fechaFin']);
        return fin != null && !fin.isAfter(fecha);
      }).length;
    }

    final ordenados = hitos.map((hito) {
      final orden = int.tryParse(hito['orden']?.toString() ?? '');
      final posicion = hito['modificadoManualmente'] == true && orden != null
          ? orden.clamp(0, actividadesOrdenadas.length)
          : posicionPorFecha(hito);
      return (hito: Map<String, dynamic>.from(hito), posicion: posicion);
    }).toList()..sort((a, b) => a.posicion.compareTo(b.posicion));
    if (ordenados.isEmpty)
      return const _Vacio(
        icon: Icons.flag_outlined,
        titulo: 'Sin hitos',
        mensaje: 'Crea un hito para organizar los resultados del matrimonio.',
      );
    return ListView.separated(
      padding: const EdgeInsets.fromLTRB(16, 10, 16, 96),
      itemCount: ordenados.length,
      separatorBuilder: (_, __) => const SizedBox(height: 10),
      itemBuilder: (_, i) {
        final hito = ordenados[i].hito;
        final asociadas = actividadesOrdenadas
            .where(
              (actividad) => hitoActividades.any(
                (relacion) =>
                    relacion['idHito']?.toString() ==
                        hito['idHito']?.toString() &&
                    relacion['idActividad']?.toString() ==
                        actividad['idActividad']?.toString(),
              ),
            )
            .toList();
        return Card(
          child: ListTile(
            onTap: () => onOpen(hito, asociadas),
            leading: const CircleAvatar(child: Icon(Icons.flag_outlined)),
            title: Text(hito['nombre']?.toString() ?? 'Hito'),
            subtitle: Text(
              '${asociadas.length} actividades necesarias · ${_fechaCorta(_fecha(hito['fechaObjetivo']))}',
            ),
            trailing: Wrap(
              children: [
                PopupMenuButton<String>(
                  onSelected: (accion) =>
                      accion == 'editar' ? onEdit(hito) : onDelete(hito),
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

class _EdtMatrimonioPanel extends StatefulWidget {
  const _EdtMatrimonioPanel({
    super.key,
    required this.idMatrimonio,
    this.onRegistrarAgregar,
  });
  final String? idMatrimonio;
  final ValueChanged<VoidCallback>? onRegistrarAgregar;
  @override
  State<_EdtMatrimonioPanel> createState() => _EdtMatrimonioPanelState();
}

class _EdtMatrimonioPanelState extends State<_EdtMatrimonioPanel> {
  late Future<Map<String, dynamic>> _carga;
  Map<String, dynamic>? _ultimaEstructura;
  final _api = EdtApi();

  @override
  void initState() {
    super.initState();
    _carga = widget.idMatrimonio == null
        ? Future.value({})
        : EdtApi().obtenerEdtMatrimonio(widget.idMatrimonio!);
    widget.onRegistrarAgregar?.call(mostrarAgregar);
  }

  void _recargar() => setState(() {
    _carga = widget.idMatrimonio == null
        ? Future.value({})
        : _api.obtenerEdtMatrimonio(widget.idMatrimonio!);
  });

  Future<void> _editar(Map<String, dynamic> nodo) async {
    final nombre = TextEditingController(text: nodo['nombre']?.toString());
    final descripcion = TextEditingController(
      text: nodo['descripcion']?.toString(),
    );
    final guardar = await showDialog<bool>(
      context: context,
      builder: (dialogContext) => AlertDialog(
        title: const Text('Editar elemento EDT'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: nombre,
              decoration: const InputDecoration(labelText: 'Nombre'),
            ),
            const SizedBox(height: 14),
            TextField(
              controller: descripcion,
              decoration: const InputDecoration(labelText: 'Descripción'),
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
            child: const Text('Guardar'),
          ),
        ],
      ),
    );
    if (guardar == true &&
        widget.idMatrimonio != null &&
        nombre.text.trim().isNotEmpty) {
      await _api.actualizarElementoMatrimonio(
        widget.idMatrimonio!,
        nodo['idEdtMatrimonioElemento'].toString(),
        {
          'nombre': nombre.text.trim(),
          'descripcion': descripcion.text.trim().isEmpty
              ? null
              : descripcion.text.trim(),
        },
      );
      _recargar();
    }
    nombre.dispose();
    descripcion.dispose();
  }

  void mostrarAgregar() => unawaited(_agregar());

  List<Map<String, dynamic>> _aplanar(
    List<Map<String, dynamic>> nodos, [
    int nivel = 0,
  ]) {
    final resultado = <Map<String, dynamic>>[];
    for (final nodo in nodos) {
      resultado.add({...nodo, '_nivel': nivel});
      resultado.addAll(_aplanar(_lista(nodo['hijos']), nivel + 1));
    }
    return resultado;
  }

  Future<void> _agregar() async {
    final nombre = TextEditingController();
    final descripcion = TextEditingController();
    final estructura = await _carga;
    final opciones = _aplanar(
      _lista(estructura['elementos'] ?? estructura['arbol']),
    );
    const nivelPrincipal = '__nivel_principal__';
    var idPadre = nivelPrincipal;
    final guardar = await showDialog<bool>(
      context: context,
      builder: (dialogContext) => AlertDialog(
        title: const Text('Nueva sección EDT'),
        content: StatefulBuilder(
          builder: (_, setDialogState) => SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextField(
                  controller: nombre,
                  decoration: const InputDecoration(labelText: 'Nombre'),
                ),
                const SizedBox(height: 14),
                TextField(
                  controller: descripcion,
                  minLines: 2,
                  maxLines: 4,
                  decoration: const InputDecoration(labelText: 'Descripción'),
                ),
                const SizedBox(height: 14),
                DropdownButtonFormField<String>(
                  value: idPadre,
                  isExpanded: true,
                  decoration: const InputDecoration(labelText: 'Sección padre'),
                  items: [
                    const DropdownMenuItem(
                      value: nivelPrincipal,
                      child: Text('Nivel principal'),
                    ),
                    ...opciones.map(
                      (nodo) => DropdownMenuItem(
                        value: nodo['idEdtMatrimonioElemento'].toString(),
                        child: Text(
                          '${'  ' * (nodo['_nivel'] as int)}${nodo['nombre'] ?? 'Elemento'}',
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ),
                  ],
                  onChanged: (valor) =>
                      setDialogState(() => idPadre = valor ?? nivelPrincipal),
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
            onPressed: () => Navigator.pop(dialogContext, true),
            child: const Text('Agregar'),
          ),
        ],
      ),
    );
    if (guardar == true &&
        widget.idMatrimonio != null &&
        nombre.text.trim().isNotEmpty) {
      await _api.agregarElementoMatrimonio(widget.idMatrimonio!, {
        'nombre': nombre.text.trim(),
        if (descripcion.text.trim().isNotEmpty)
          'descripcion': descripcion.text.trim(),
        if (idPadre != nivelPrincipal) 'idEdtMatrimonioElementoPadre': idPadre,
        'orden': 9999,
      });
      _recargar();
    }
    nombre.dispose();
    descripcion.dispose();
  }

  Future<void> _mover(
    Map<String, dynamic> actual,
    Map<String, dynamic> vecino,
  ) async {
    if (widget.idMatrimonio == null) return;
    final ordenActual = int.tryParse(actual['orden']?.toString() ?? '') ?? 0;
    final ordenVecino = int.tryParse(vecino['orden']?.toString() ?? '') ?? 0;
    await _api.actualizarElementoMatrimonio(
      widget.idMatrimonio!,
      actual['idEdtMatrimonioElemento'].toString(),
      {'orden': ordenVecino},
    );
    await _api.actualizarElementoMatrimonio(
      widget.idMatrimonio!,
      vecino['idEdtMatrimonioElemento'].toString(),
      {'orden': ordenActual},
    );
    _recargar();
  }

  Widget _nodo(
    Map<String, dynamic> nodo,
    int nivel,
    List<Map<String, dynamic>> hermanos,
  ) {
    final hijos = _lista(nodo['hijos']);
    final indice = hermanos.indexWhere(
      (item) =>
          item['idEdtMatrimonioElemento'] == nodo['idEdtMatrimonioElemento'],
    );
    return Card(
      child: Padding(
        padding: EdgeInsets.fromLTRB(14 + nivel * 14.0, 8, 8, 8),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(
                  hijos.isEmpty
                      ? Icons.check_box_outline_blank
                      : Icons.account_tree_outlined,
                  size: 18,
                  color: AppColors.primary,
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    nodo['nombre']?.toString() ?? 'Elemento',
                    style: const TextStyle(fontWeight: FontWeight.w700),
                  ),
                ),
                IconButton(
                  onPressed: indice > 0
                      ? () => _mover(nodo, hermanos[indice - 1])
                      : null,
                  icon: const Icon(Icons.keyboard_arrow_up),
                ),
                IconButton(
                  onPressed: indice >= 0 && indice < hermanos.length - 1
                      ? () => _mover(nodo, hermanos[indice + 1])
                      : null,
                  icon: const Icon(Icons.keyboard_arrow_down),
                ),
                PopupMenuButton<String>(
                  onSelected: (accion) {
                    if (accion == 'editar') _editar(nodo);
                  },
                  itemBuilder: (_) => const [
                    PopupMenuItem(value: 'editar', child: Text('Editar')),
                  ],
                ),
              ],
            ),
            ...hijos.map((hijo) => _nodo(hijo, nivel + 1, hijos)),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) => FutureBuilder<Map<String, dynamic>>(
    future: _carga,
    builder: (_, estado) {
      if (estado.hasData && estado.data!.isNotEmpty) {
        _ultimaEstructura = estado.data;
      }
      final estructura = estado.data ?? _ultimaEstructura;
      if (estado.connectionState != ConnectionState.done &&
          estructura == null) {
        return const Center(child: CircularProgressIndicator());
      }
      if (estado.hasError || estructura == null || estructura.isEmpty) {
        return const _Vacio(
          icon: Icons.account_tree_outlined,
          titulo: 'EDT no disponible',
          mensaje: 'Aún no se definió una estructura EDT para este matrimonio.',
        );
      }
      final arbol = _lista(estructura['elementos'] ?? estructura['arbol']);
      return ListView(
        padding: const EdgeInsets.fromLTRB(16, 10, 16, 96),
        children: [...arbol.map((nodo) => _nodo(nodo, 0, arbol))],
      );
    },
  );
}

class _NodoEdt extends StatelessWidget {
  const _NodoEdt({required this.nodo, required this.nivel});
  final Map<String, dynamic> nodo;
  final int nivel;
  @override
  Widget build(BuildContext context) {
    final hijos = _lista(nodo['hijos']);
    return Card(
      child: Padding(
        padding: EdgeInsets.fromLTRB(14 + nivel * 14.0, 10, 12, 10),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(
                  hijos.isEmpty
                      ? Icons.check_box_outline_blank
                      : Icons.account_tree_outlined,
                  size: 18,
                  color: AppColors.primary,
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    nodo['nombre']?.toString() ?? 'Elemento',
                    style: const TextStyle(fontWeight: FontWeight.w700),
                  ),
                ),
              ],
            ),
            ...hijos.map((hijo) => _NodoEdt(nodo: hijo, nivel: nivel + 1)),
          ],
        ),
      ),
    );
  }
}

class _DetalleHitoSheet extends StatelessWidget {
  const _DetalleHitoSheet({
    required this.hito,
    required this.actividades,
    required this.disponibles,
    required this.onAsociarActividad,
    required this.onQuitarActividad,
  });
  final Map<String, dynamic> hito;
  final List<Map<String, dynamic>> actividades;
  final List<Map<String, dynamic>> disponibles;
  final Future<void> Function(Map<String, dynamic>) onAsociarActividad;
  final Future<void> Function(Map<String, dynamic>) onQuitarActividad;

  @override
  Widget build(BuildContext context) => _DetalleSheet(
    titulo: hito['nombre']?.toString() ?? 'Hito',
    children: [
      if (hito['fechaObjetivo'] != null)
        Text('Objetivo: ${_fechaCorta(_fecha(hito['fechaObjetivo']))}'),
      if (hito['criterioAceptacion'] != null) ...[
        const SizedBox(height: 12),
        Text(hito['criterioAceptacion'].toString()),
      ],
      const SizedBox(height: 20),
      const Text(
        'Actividades necesarias',
        style: TextStyle(fontWeight: FontWeight.w800),
      ),
      const SizedBox(height: 8),
      _SelectorActividadHito(
        disponibles: disponibles,
        onAgregar: onAsociarActividad,
      ),
      if (actividades.isEmpty)
        const Text('Aún no hay actividades asociadas a este hito.'),
      ...actividades.map(
        (actividad) => ListTile(
          contentPadding: EdgeInsets.zero,
          leading: const Icon(
            Icons.task_alt_outlined,
            color: AppColors.primary,
          ),
          title: Text(actividad['nombre']?.toString() ?? 'Actividad'),
          subtitle: Text('Vence ${_fechaCorta(_fecha(actividad['fechaFin']))}'),
          trailing: IconButton(
            tooltip: 'Quitar del hito',
            icon: const Icon(Icons.remove_circle_outline),
            onPressed: () => onQuitarActividad(actividad),
          ),
        ),
      ),
    ],
  );
}

class _SelectorActividadHito extends StatefulWidget {
  const _SelectorActividadHito({
    required this.disponibles,
    required this.onAgregar,
  });
  final List<Map<String, dynamic>> disponibles;
  final Future<void> Function(Map<String, dynamic>) onAgregar;

  @override
  State<_SelectorActividadHito> createState() => _SelectorActividadHitoState();
}

class _SelectorActividadHitoState extends State<_SelectorActividadHito> {
  String? _idSeleccionado;

  @override
  Widget build(BuildContext context) {
    Map<String, dynamic>? seleccionada;
    for (final actividad in widget.disponibles) {
      if (actividad['idActividad']?.toString() == _idSeleccionado) {
        seleccionada = actividad;
        break;
      }
    }
    final actividadSeleccionada = seleccionada;
    return Row(
      children: [
        Expanded(
          child: DropdownButtonFormField<String>(
            value: _idSeleccionado,
            isExpanded: true,
            decoration: const InputDecoration(labelText: 'Agregar actividad'),
            hint: const Text('Selecciona una actividad'),
            items: widget.disponibles
                .map(
                  (actividad) => DropdownMenuItem<String>(
                    value: actividad['idActividad']?.toString(),
                    child: Text(
                      actividad['nombre']?.toString() ?? 'Actividad',
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                )
                .toList(),
            onChanged: widget.disponibles.isEmpty
                ? null
                : (valor) => setState(() => _idSeleccionado = valor),
          ),
        ),
        const SizedBox(width: 8),
        IconButton(
          tooltip: 'Agregar actividad al hito',
          icon: const Icon(Icons.add_circle, color: AppColors.primary),
          onPressed: actividadSeleccionada == null
              ? null
              : () => widget.onAgregar(actividadSeleccionada),
        ),
      ],
    );
  }
}

class _HitoDetallePage extends StatelessWidget {
  const _HitoDetallePage({
    required this.hito,
    required this.actividades,
    required this.onAgregarActividad,
  });
  final Map<String, dynamic> hito;
  final List<Map<String, dynamic>> actividades;
  final VoidCallback onAgregarActividad;
  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title: const Text('Detalle del hito')),
    floatingActionButton: FloatingActionButton.extended(
      onPressed: onAgregarActividad,
      icon: const Icon(Icons.add_task_outlined),
      label: const Text('Agregar actividad'),
    ),
    body: ListView(
      padding: const EdgeInsets.fromLTRB(16, 18, 16, 96),
      children: [
        Text(
          hito['nombre']?.toString() ?? 'Hito',
          style: Theme.of(
            context,
          ).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.w800),
        ),
        if (hito['fechaObjetivo'] != null)
          Padding(
            padding: const EdgeInsets.only(top: 6),
            child: Text(
              'Objetivo: ${_fechaCorta(_fecha(hito['fechaObjetivo']))}',
            ),
          ),
        if (hito['criterioAceptacion'] != null)
          Padding(
            padding: const EdgeInsets.only(top: 14),
            child: Text(hito['criterioAceptacion'].toString()),
          ),
        const SizedBox(height: 24),
        const Text(
          'Actividades necesarias',
          style: TextStyle(fontWeight: FontWeight.w800),
        ),
        const SizedBox(height: 8),
        if (actividades.isEmpty)
          const Text('Aún no hay actividades asociadas a este hito.'),
        ...actividades.map(
          (a) => Card(
            child: ListTile(
              leading: const Icon(
                Icons.task_alt_outlined,
                color: AppColors.primary,
              ),
              title: Text(a['nombre']?.toString() ?? 'Actividad'),
              subtitle: Text('Vence ${_fechaCorta(_fecha(a['fechaFin']))}'),
            ),
          ),
        ),
      ],
    ),
  );
}

class _DetalleTimingSheet extends StatefulWidget {
  const _DetalleTimingSheet({
    required this.timing,
    required this.guardarChecklist,
  });
  final Map<String, dynamic> timing;
  final Future<void> Function(List<String>) guardarChecklist;

  @override
  State<_DetalleTimingSheet> createState() => _DetalleTimingSheetState();
}

class _DetalleTimingSheetState extends State<_DetalleTimingSheet> {
  late List<String> _items;
  final _nuevo = TextEditingController();

  @override
  void initState() {
    super.initState();
    _items = _itemsChecklist(widget.timing['listaVerificacion']);
  }

  @override
  void dispose() {
    _nuevo.dispose();
    super.dispose();
  }

  Future<void> _agregar() async {
    final texto = _nuevo.text.trim();
    if (texto.isEmpty) {
      return;
    }
    final actualizados = [..._items, texto];
    await widget.guardarChecklist(actualizados);
    if (!mounted) {
      return;
    }
    setState(() {
      _items = actualizados;
      _nuevo.clear();
    });
  }

  @override
  Widget build(BuildContext context) => _DetalleSheet(
    titulo: widget.timing['actividad']?.toString() ?? 'Momento del timing',
    children: [
      Text(
        '${_hora(_fechaHora(widget.timing['fechaHoraInicio']))} – ${_hora(_fechaHora(widget.timing['fechaHoraFin']))}',
      ),
      const SizedBox(height: 16),
      const Text(
        'Lista de verificación',
        style: TextStyle(fontWeight: FontWeight.w800),
      ),
      ..._items.map(
        (item) => ListTile(
          leading: const Icon(Icons.check_box_outline_blank),
          title: Text(item),
        ),
      ),
      Row(
        children: [
          Expanded(
            child: TextField(
              controller: _nuevo,
              decoration: const InputDecoration(labelText: 'Nueva tarea'),
              onSubmitted: (_) => _agregar(),
            ),
          ),
          IconButton(
            tooltip: 'Agregar tarea',
            icon: const Icon(Icons.add_circle, color: AppColors.primary),
            onPressed: _agregar,
          ),
        ],
      ),
    ],
  );
}

class _DetalleActividadSheet extends StatefulWidget {
  const _DetalleActividadSheet({
    required this.actividad,
    required this.cargarChecklist,
    required this.agregarChecklist,
    required this.actualizarChecklist,
  });
  final Map<String, dynamic> actividad;
  final Future<List<Map<String, dynamic>>> Function() cargarChecklist;
  final Future<void> Function(String) agregarChecklist;
  final Future<void> Function(String, Map<String, dynamic>) actualizarChecklist;
  @override
  State<_DetalleActividadSheet> createState() => _DetalleActividadSheetState();
}

class _DetalleActividadSheetState extends State<_DetalleActividadSheet> {
  late Future<List<Map<String, dynamic>>> _checklist;
  final _nuevo = TextEditingController();
  @override
  void initState() {
    super.initState();
    _checklist = widget.cargarChecklist();
  }

  @override
  void dispose() {
    _nuevo.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => _DetalleSheet(
    titulo: widget.actividad['nombre']?.toString() ?? 'Actividad',
    children: [
      Text('Vence ${_fechaCorta(_fecha(widget.actividad['fechaFin']))}'),
      const SizedBox(height: 16),
      const Text('Checklist', style: TextStyle(fontWeight: FontWeight.w800)),
      FutureBuilder<List<Map<String, dynamic>>>(
        future: _checklist,
        builder: (_, estado) {
          final items = estado.data ?? const [];
          if (estado.connectionState != ConnectionState.done)
            return const Padding(
              padding: EdgeInsets.all(12),
              child: CircularProgressIndicator(),
            );
          return Column(
            children: [
              ...items.map(
                (item) => Padding(
                  padding: const EdgeInsets.symmetric(vertical: 3),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Checkbox(
                        value: item['completada'] == true,
                        onChanged: null,
                      ),
                      const SizedBox(width: 8),
                      Expanded(
                        child: Padding(
                          padding: const EdgeInsets.only(top: 12),
                          child: Text(
                            _textoChecklist(
                              item['descripcion']?.toString() ?? 'Subtarea',
                            ),
                            softWrap: true,
                          ),
                        ),
                      ),
                      IconButton(
                        tooltip: 'Quitar subtarea',
                        icon: const Icon(Icons.remove_circle_outline),
                        onPressed: () async {
                          final id = item['idChecklist']?.toString();
                          if (id == null || id.isEmpty) {
                            return;
                          }
                          await widget.actualizarChecklist(id, {
                            'activo': false,
                          });
                          if (mounted) {
                            setState(
                              () => _checklist = widget.cargarChecklist(),
                            );
                          }
                        },
                      ),
                    ],
                  ),
                ),
              ),
              if (items.isEmpty)
                const Padding(
                  padding: EdgeInsets.all(8),
                  child: Text('Sin subtareas todavía.'),
                ),
            ],
          );
        },
      ),
      Row(
        children: [
          Expanded(
            child: TextField(
              controller: _nuevo,
              decoration: const InputDecoration(labelText: 'Nueva subtarea'),
            ),
          ),
          IconButton(
            icon: const Icon(Icons.add_circle, color: AppColors.primary),
            onPressed: () async {
              final texto = _nuevo.text.trim();
              if (texto.isEmpty) return;
              await widget.agregarChecklist(texto);
              _nuevo.clear();
              if (mounted)
                setState(() => _checklist = widget.cargarChecklist());
            },
          ),
        ],
      ),
    ],
  );
}

class _DetalleSheet extends StatelessWidget {
  const _DetalleSheet({required this.titulo, required this.children});
  final String titulo;
  final List<Widget> children;
  @override
  Widget build(BuildContext context) => SafeArea(
    child: Padding(
      padding: EdgeInsets.fromLTRB(
        20,
        8,
        20,
        MediaQuery.of(context).viewInsets.bottom + 24,
      ),
      child: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            Center(
              child: Container(
                width: 42,
                height: 4,
                decoration: BoxDecoration(
                  color: Colors.black26,
                  borderRadius: BorderRadius.circular(8),
                ),
              ),
            ),
            const SizedBox(height: 18),
            Text(
              titulo,
              style: Theme.of(
                context,
              ).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w800),
            ),
            const SizedBox(height: 16),
            ...children,
          ],
        ),
      ),
    ),
  );
}

List<String> _itemsChecklist(Object? valor) {
  if (valor is List)
    return valor
        .map((e) => e.toString())
        .where((e) => e.trim().isNotEmpty)
        .toList();
  final texto = valor?.toString() ?? '';
  if (texto.isEmpty) return const [];
  return texto
      .replaceAll(RegExp(r'^[\[\]\"]+|[\[\]\"]+$'), '')
      .split(';')
      .map((e) => e.trim())
      .where((e) => e.isNotEmpty)
      .toList();
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
DateTime? _fecha(Object? value) {
  if (value == null) return null;
  final fecha = DateTime.tryParse(value.toString());
  if (fecha == null) return null;
  // Son fechas de negocio: no se desplaza el día mostrado por la zona horaria.
  return DateTime(fecha.year, fecha.month, fecha.day);
}

/// `_fecha` es para fechas de negocio y elimina la hora intencionalmente.
/// Los momentos del timing son instantes: deben conservar hora y minutos.
DateTime? _fechaHora(Object? value) {
  if (value == null) return null;
  return DateTime.tryParse(value.toString())?.toLocal();
}

int _compararFecha(Object? a, Object? b) {
  final fechaA = _fecha(a);
  final fechaB = _fecha(b);
  if (fechaA == null && fechaB == null) {
    return 0;
  }
  if (fechaA == null) {
    return 1;
  }
  if (fechaB == null) {
    return -1;
  }
  return fechaA.compareTo(fechaB);
}

int _compararFechaHora(Object? a, Object? b) {
  final fechaA = _fechaHora(a);
  final fechaB = _fechaHora(b);
  if (fechaA == null && fechaB == null) return 0;
  if (fechaA == null) return 1;
  if (fechaB == null) return -1;
  return fechaA.compareTo(fechaB);
}

String _fechaCorta(DateTime? value) => value == null
    ? '--'
    : '${value.day.toString().padLeft(2, '0')}/${value.month.toString().padLeft(2, '0')}/${value.year}';
String _fechaLarga(DateTime value) {
  const meses = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ];
  return '${value.day} de ${meses[value.month - 1]} del ${value.year}';
}

String _hora(DateTime? value) => value == null
    ? '--'
    : '${value.hour}:${value.minute.toString().padLeft(2, '0')}';

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

/// Compatibilidad visual para checklists creados antes de corregir el catálogo
/// maestro. No persiste cambios ni modifica el texto ingresado por la persona.
String _textoChecklist(String texto) => texto
    .replaceAll('Ã¡', 'á')
    .replaceAll('Ã©', 'é')
    .replaceAll('Ã­', 'í')
    .replaceAll('Ã³', 'ó')
    .replaceAll('Ãº', 'ú')
    .replaceAll('Ã±', 'ñ')
    .replaceAll('¢', 'ó')
    .replaceAll('¡', 'í')
    .replaceAll('£', 'ú')
    .replaceAll('¤', 'ñ');

List<Widget> _separar(List<Widget> items) {
  final salida = <Widget>[];
  for (final item in items) {
    if (salida.isNotEmpty) {
      salida.add(const SizedBox(height: 18));
    }
    salida.add(item);
  }
  return salida;
}
