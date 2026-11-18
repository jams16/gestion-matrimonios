import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:dio/dio.dart';
import 'package:go_router/go_router.dart';

import '../../../../app/router/route_names.dart';
import '../../../../app/theme/app_colors.dart';
import '../../../../app/theme/app_spacing.dart';
import '../../../../core/widgets/feedback/app_information_card.dart';
import '../../../../core/widgets/buttons/app_button.dart';
import '../../../../core/widgets/feedback/app_snackbar.dart';
import '../../../../core/widgets/inputs/app_number_field.dart';
import '../../../../core/widgets/inputs/app_select_field.dart';
import '../../../../core/widgets/inputs/app_text_field.dart';
import '../../../../core/widgets/selection/app_checkbox.dart';
import '../../../edt/infrastructure/edt_api.dart';
import '../../infrastructure/data_sources/matrimonios_remote_data_source.dart';

class CrearMatrimonioPage extends StatefulWidget {
  const CrearMatrimonioPage({super.key, this.idProyectoBorrador});
  final String? idProyectoBorrador;
  @override
  State<CrearMatrimonioPage> createState() => _CrearMatrimonioPageState();
}

class _CrearMatrimonioPageState extends State<CrearMatrimonioPage> {
  final _form = GlobalKey<FormState>();
  final _nombres1 = TextEditingController(),
      _apellido1 = TextEditingController(),
      _dni1 = TextEditingController(),
      _usuario1 = TextEditingController(),
      _contrasena1 = TextEditingController();
  final _nombres2 = TextEditingController(),
      _apellido2 = TextEditingController(),
      _dni2 = TextEditingController(),
      _usuario2 = TextEditingController(),
      _contrasena2 = TextEditingController();
  final _fecha = TextEditingController(),
      _presupuesto = TextEditingController(),
      _objetivos = TextEditingController(),
      _necesidades = TextEditingController(),
      _supuestos = TextEditingController(),
      _restricciones = TextEditingController(),
      _moonboard = TextEditingController();
  final List<String> _objetivosItems = <String>[];
  final List<String> _necesidadesItems = <String>[];
  final List<String> _supuestosItems = <String>[];
  final List<String> _restriccionesItems = <String>[];
  final List<String> _moonboardItems = <String>[];
  Timer? _introTimer;
  bool _mostrandoIntro = true, _usarDni = false;
  int _segundosRestantes = 5;
  int _paso = 1, _invitados = 1;
  String? _ubigeo;
  String _moneda = 'SOLES';
  DateTime? _fechaSeleccionada;
  int? _idTipoCeremonia;
  final List<_TipoCeremoniaOpcion> _tiposCeremonia = [];
  final Set<String> _alcanceCodigos = <String>{};
  final Set<String> _elementosEdtSeleccionados = <String>{};
  final List<Map<String, dynamic>> _elementosEdtNuevos =
      <Map<String, dynamic>>[];
  final EdtApi _edtApi = EdtApi();
  Map<String, dynamic>? _plantillaEdtSeleccionada;
  List<Map<String, dynamic>> _arbolEdt = <Map<String, dynamic>>[];
  bool _cargandoArbolEdt = false;
  String? _idProyecto;
  bool _guardando = false;
  late final Future<List<Map<String, dynamic>>> _ubigeos;
  late final Future<List<Map<String, dynamic>>> _categoriasServicio;
  late final Future<List<Map<String, dynamic>>> _plantillasEdt;
  late final Future<Map<String, dynamic>?> _gp01;
  late final Future<Map<String, dynamic>?> _gp02;
  late final Future<Map<String, dynamic>?> _gp03;
  late final Future<Map<String, dynamic>?> _gp04;
  late final Future<List<Map<String, dynamic>?>> _gp06AGp09;
  final Map<String, String> _nombresUbigeo = {};
  @override
  void initState() {
    super.initState();
    _idProyecto = widget.idProyectoBorrador;
    final dataSource = MatrimoniosRemoteDataSource();
    _ubigeos = dataSource.listarUbigeos();
    _categoriasServicio = dataSource.listarCategoriasServicio();
    _plantillasEdt = _edtApi.listarPlantillas();
    _gp01 = dataSource.obtenerBuenaPracticaPorCodigo('GP01');
    _gp02 = dataSource.obtenerBuenaPracticaPorCodigo('GP02');
    _gp03 = dataSource.obtenerBuenaPracticaPorCodigo('GP03');
    _gp04 = dataSource.obtenerBuenaPracticaPorCodigo('GP04');
    _gp06AGp09 = Future.wait([
      dataSource.obtenerBuenaPracticaPorCodigo('GP06'),
      dataSource.obtenerBuenaPracticaPorCodigo('GP07'),
      dataSource.obtenerBuenaPracticaPorCodigo('GP08'),
      dataSource.obtenerBuenaPracticaPorCodigo('GP09'),
    ]);
    _cargarNombresUbigeo();
    _cargarTiposCeremonia();
    if (widget.idProyectoBorrador != null) _cargarBorrador();
    _introTimer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (!mounted) return;
      if (_segundosRestantes <= 1) {
        timer.cancel();
        setState(() => _mostrandoIntro = false);
      } else {
        setState(() => _segundosRestantes--);
      }
    });
  }

  Future<void> _cargarNombresUbigeo() async {
    try {
      final ubigeos = await _ubigeos;
      if (!mounted) return;
      setState(() {
        for (final ubigeo in ubigeos) {
          final codigo = ubigeo['idUbigeo']?.toString();
          if (codigo == null) continue;
          _nombresUbigeo[codigo] =
              [ubigeo['distrito'], ubigeo['provincia'], ubigeo['departamento']]
                  .whereType<String>()
                  .where((texto) => texto.trim().isNotEmpty)
                  .join(', ');
        }
      });
    } catch (_) {
      // El codigo se conserva como respaldo si el catalogo no esta disponible.
    }
  }

  Future<void> _cargarTiposCeremonia() async {
    try {
      final tipos = await MatrimoniosRemoteDataSource().listarTiposCeremonia();
      if (!mounted) return;
      setState(() {
        final existentes = _tiposCeremonia.map((tipo) => tipo.id).toSet();
        _tiposCeremonia.addAll(
          tipos
              .map(
                (tipo) => _TipoCeremoniaOpcion(
                  id: _entero(tipo['idTipoCeremonia']) ?? 0,
                  nombre: tipo['nombre']?.toString() ?? '',
                ),
              )
              .where((tipo) => tipo.id > 0 && !existentes.contains(tipo.id)),
        );
      });
    } catch (_) {
      // El selector muestra el estado de catalogo no disponible sin bloquear el borrador.
    }
  }

  Future<void> _cargarBorrador() async {
    try {
      final data = await MatrimoniosRemoteDataSource().obtenerBorrador(
        widget.idProyectoBorrador!,
      );
      final p1 = Map<String, dynamic>.from(data['pareja1'] as Map);
      final p2 = Map<String, dynamic>.from(data['pareja2'] as Map);
      final proyecto = Map<String, dynamic>.from(data['proyecto'] as Map);
      final matrimonio = Map<String, dynamic>.from(data['matrimonio'] as Map);
      final tipo = _mapa(
        matrimonio['tipoCeremonia'] ?? matrimonio['tipo_ceremonia'],
      );
      final idTipo = _entero(
        matrimonio['idTipoCeremonia'] ??
            matrimonio['id_tipo_ceremonia'] ??
            tipo['idTipoCeremonia'] ??
            tipo['id_tipo_ceremonia'],
      );
      final nombreTipo = (tipo['nombre'] ?? tipo['codigo'])?.toString().trim();
      if (!mounted) return;
      setState(() {
        _nombres1.text = p1['nombres']?.toString() ?? '';
        _apellido1.text = p1['apellidoPaterno']?.toString() ?? '';
        _dni1.text = p1['dni']?.toString() ?? '';
        _usuario1.text = p1['usuario']?.toString() ?? '';
        _nombres2.text = p2['nombres']?.toString() ?? '';
        _apellido2.text = p2['apellidoPaterno']?.toString() ?? '';
        _dni2.text = p2['dni']?.toString() ?? '';
        _usuario2.text = p2['usuario']?.toString() ?? '';
        _fechaSeleccionada = _fechaDesdeApi(
          matrimonio['fechaMatrimonio'] ?? matrimonio['fecha_matrimonio'],
        );
        _fecha.text = _fechaSeleccionada == null
            ? ''
            : _fechaVisible(_fechaSeleccionada!);
        _presupuesto.text = proyecto['presupuesto']?.toString() ?? '';
        _alcanceCodigos
          ..clear()
          ..addAll(
            (proyecto['alcance']?.toString() ?? '')
                .split(';')
                .map((codigo) => codigo.trim())
                .where((codigo) => codigo.isNotEmpty),
          );
        final moneda = proyecto['moneda']?.toString();
        _moneda = moneda == 'DOLARES' ? 'DOLARES' : 'SOLES';
        _invitados =
            int.tryParse(matrimonio['cantidadInvitados']?.toString() ?? '') ??
            1;
        _ubigeo = matrimonio['ciudadUbicacion']?.toString();
        _idTipoCeremonia = idTipo;
        if (idTipo != null && nombreTipo != null && nombreTipo.isNotEmpty) {
          _tiposCeremonia.add(
            _TipoCeremoniaOpcion(id: idTipo, nombre: nombreTipo),
          );
        }
        _cargarItems(_objetivosItems, proyecto['objetivos']);
        _cargarItems(_necesidadesItems, proyecto['necesidades']);
        _cargarItems(_supuestosItems, proyecto['supuestos']);
        _cargarItems(_restriccionesItems, proyecto['restricciones']);
        _cargarItems(_moonboardItems, matrimonio['ideasMoonboard']);
      });
      final idMatrimonio = matrimonio['idMatrimonio']?.toString();
      if (idMatrimonio != null && idMatrimonio.isNotEmpty) {
        await _cargarEdtBorrador(idMatrimonio);
      }
    } catch (_) {
      if (mounted) {
        AppSnackbar.show(
          context,
          message: 'No se pudo cargar el borrador.',
          type: AppSnackbarType.error,
        );
      }
    }
  }

  Future<void> _cargarEdtBorrador(String idMatrimonio) async {
    try {
      final edt = await _edtApi.obtenerEdtMatrimonio(idMatrimonio);
      final idPlantilla = edt['edt'] is Map
          ? (edt['edt'] as Map)['idPlantillaOrigen']?.toString()
          : null;
      if (idPlantilla == null || idPlantilla.isEmpty) return;
      final plantillas = await _plantillasEdt;
      final plantilla = plantillas.where(
        (item) => item['idEdtPlantilla']?.toString() == idPlantilla,
      );
      if (plantilla.isEmpty) return;

      await _seleccionarPlantillaEdt(plantilla.first);
      if (!mounted) return;

      final origenesGuardados = <String>{};
      final nuevos = <Map<String, dynamic>>[];
      final origenPorElementoOperativo = <String, String>{};
      void indexar(Map<String, dynamic> nodo) {
        final id = nodo['idEdtMatrimonioElemento']?.toString();
        final origen = nodo['idEdtElementoOrigen']?.toString();
        if (id != null && origen != null) {
          origenPorElementoOperativo[id] = origen;
        }
        if (origen != null) origenesGuardados.add(origen);
        for (final hijo in List<Object?>.from(
          nodo['hijos'] as List? ?? const [],
        )) {
          indexar(Map<String, dynamic>.from(hijo as Map));
        }
      }

      final elementos = List<Object?>.from(
        edt['elementos'] as List? ?? const [],
      ).map((item) => Map<String, dynamic>.from(item as Map)).toList();
      for (final elemento in elementos) {
        indexar(elemento);
      }
      void recolectarNuevos(Map<String, dynamic> nodo) {
        if (nodo['idEdtElementoOrigen'] == null) {
          nuevos.add({
            'nombre': nodo['nombre']?.toString() ?? 'Nueva sección',
            if ((nodo['descripcion']?.toString() ?? '').trim().isNotEmpty)
              'descripcion': nodo['descripcion'].toString(),
            if (origenPorElementoOperativo[nodo['idEdtMatrimonioElementoPadre']
                    ?.toString()] !=
                null)
              '_idElementoPadreOrigen':
                  origenPorElementoOperativo[nodo['idEdtMatrimonioElementoPadre']
                      ?.toString()],
          });
        }
        for (final hijo in List<Object?>.from(
          nodo['hijos'] as List? ?? const [],
        )) {
          recolectarNuevos(Map<String, dynamic>.from(hijo as Map));
        }
      }

      for (final elemento in elementos) {
        recolectarNuevos(elemento);
      }
      final seleccion = <String>{};
      void seleccionar(Map<String, dynamic> nodo) {
        final idRelacion = nodo['idEdtPlantillaElemento']?.toString();
        final origen = nodo['elemento'] is Map
            ? (nodo['elemento'] as Map)['idEdtElemento']?.toString()
            : null;
        if (idRelacion != null &&
            origen != null &&
            origenesGuardados.contains(origen)) {
          seleccion.add(idRelacion);
        }
        for (final hijo in List<Object?>.from(
          nodo['hijos'] as List? ?? const [],
        )) {
          seleccionar(Map<String, dynamic>.from(hijo as Map));
        }
      }

      for (final nodo in _arbolEdt) {
        seleccionar(nodo);
      }
      setState(() {
        _elementosEdtSeleccionados
          ..clear()
          ..addAll(seleccion);
        _elementosEdtNuevos
          ..clear()
          ..addAll(nuevos);
      });
    } on DioException catch (error) {
      // Un borrador que aún no tiene EDT es válido; no se muestra como error.
      if (error.response?.statusCode != 404 && mounted) {
        AppSnackbar.show(
          context,
          message: 'No se pudo cargar la EDT del borrador.',
          type: AppSnackbarType.warning,
        );
      }
    }
  }

  @override
  void dispose() {
    _introTimer?.cancel();
    for (final c in [
      _nombres1,
      _apellido1,
      _dni1,
      _usuario1,
      _contrasena1,
      _nombres2,
      _apellido2,
      _dni2,
      _usuario2,
      _contrasena2,
      _fecha,
      _presupuesto,
      _objetivos,
      _necesidades,
      _supuestos,
      _restricciones,
      _moonboard,
    ]) {
      c.dispose();
    }
    super.dispose();
  }

  String? _obligatorio(String? v) =>
      v == null || v.trim().isEmpty ? 'Este campo es obligatorio.' : null;
  String? _dni(String? v) =>
      _obligatorio(v) ??
      (RegExp(r'^\d{8}$').hasMatch(v!.trim())
          ? null
          : 'Ingresa un DNI de 8 digitos.');
  void _copiarDni(bool value) => setState(() {
    _usarDni = value;
    if (value) {
      _usuario1.text = _dni1.text;
      _contrasena1.text = _dni1.text;
      _usuario2.text = _dni2.text;
      _contrasena2.text = _dni2.text;
    }
  });
  void _dniCambiado() {
    if (_dni1.text.length == 8 && _dni1.text == _dni2.text) {
      AppSnackbar.show(
        context,
        message: 'El DNI de la pareja 1 no puede ser el mismo de la pareja 2.',
        type: AppSnackbarType.warning,
      );
    }
    if (_usarDni) _copiarDni(true);
  }

  void _volver() {
    if (_paso == 1) {
      context.go('/matrimonios');
    } else {
      setState(() => _paso--);
    }
  }

  void _siguiente() {
    if (_paso < 5 && !_form.currentState!.validate()) {
      return;
    }
    if (_paso == 2 &&
        (_idTipoCeremonia == null ||
            _fechaSeleccionada == null ||
            _presupuesto.text.isEmpty ||
            _invitados < 1)) {
      AppSnackbar.show(
        context,
        message: 'Completa los datos obligatorios del matrimonio.',
        type: AppSnackbarType.warning,
      );
      return;
    }
    if (_paso == 4 && _plantillaEdtSeleccionada == null) {
      AppSnackbar.show(
        context,
        message: 'Selecciona una plantilla EDT para continuar.',
        type: AppSnackbarType.warning,
      );
      return;
    }
    if (_paso == 5) {
      _guardar(true);
      return;
    }
    setState(() => _paso++);
  }

  Map<String, dynamic> _payload({required bool iniciar}) {
    final payload = <String, dynamic>{
      'pareja1': {
        'nombres': _nombres1.text.trim(),
        'apellidoPaterno': _apellido1.text.trim(),
        'dni': _dni1.text.trim(),
        'usuario': _usuario1.text.trim(),
        'contrasena': _contrasena1.text,
      },
      'pareja2': {
        'nombres': _nombres2.text.trim(),
        'apellidoPaterno': _apellido2.text.trim(),
        'dni': _dni2.text.trim(),
        'usuario': _usuario2.text.trim(),
        'contrasena': _contrasena2.text,
      },
      if (iniciar || _fechaSeleccionada != null) 'fechaMatrimonio': _fechaApi,
      if (iniciar || _presupuesto.text.trim().isNotEmpty)
        'presupuesto':
            num.tryParse(_presupuesto.text.replaceAll(',', '.')) ?? 0,
      'moneda': _moneda,
      if (iniciar || _invitados > 0) 'cantidadInvitados': _invitados,
      if (_idTipoCeremonia != null) 'idTipoCeremonia': _idTipoCeremonia,
      'ciudadUbicacion': _ubigeo,
      'alcance': _alcanceCodigos.isEmpty ? null : _alcanceCodigos.join(';'),
      'objetivos': _unirItems(_objetivosItems),
      'necesidades': _unirItems(_necesidadesItems),
      'supuestos': _unirItems(_supuestosItems),
      'restricciones': _unirItems(_restriccionesItems),
      'ideasMoonboard': _unirItems(_moonboardItems),
    };
    return payload;
  }

  Future<void> _guardar(bool iniciar) async {
    if (_guardando) return;
    setState(() => _guardando = true);
    try {
      final api = MatrimoniosRemoteDataSource();
      Map<String, dynamic> resultado;

      // La EDT debe existir antes de iniciar el proyecto: el backend genera el
      // cronograma a partir de esa estructura al pasar a INICIO. Por eso el
      // último paso primero persiste/actualiza el borrador, guarda la EDT y
      // recién después confirma el inicio.
      if (iniciar) {
        final borrador = _payload(iniciar: false);
        if (_idProyecto != null) borrador['idProyecto'] = _idProyecto;
        final resultadoBorrador = await api.guardarOnboarding(
          borrador,
          iniciar: false,
        );
        final proyectoBorrador = Map<String, dynamic>.from(
          resultadoBorrador['proyecto'] as Map? ?? const <String, dynamic>{},
        );
        final matrimonioBorrador = Map<String, dynamic>.from(
          resultadoBorrador['matrimonio'] as Map? ?? const <String, dynamic>{},
        );
        _idProyecto = proyectoBorrador['idProyecto']?.toString() ?? _idProyecto;
        final idMatrimonioBorrador = matrimonioBorrador['idMatrimonio']
            ?.toString();
        if (idMatrimonioBorrador == null || idMatrimonioBorrador.isEmpty) {
          throw StateError('El servidor no devolvió el matrimonio creado.');
        }
        await _crearEdtMatrimonio(idMatrimonioBorrador);

        final datosInicio = _payload(iniciar: true);
        if (_idProyecto != null) datosInicio['idProyecto'] = _idProyecto;
        resultado = await api.guardarOnboarding(datosInicio, iniciar: true);
      } else {
        final datos = _payload(iniciar: false);
        if (_idProyecto != null) datos['idProyecto'] = _idProyecto;
        resultado = await api.guardarOnboarding(datos, iniciar: false);
        final matrimonioBorrador = Map<String, dynamic>.from(
          resultado['matrimonio'] as Map? ?? const <String, dynamic>{},
        );
        final idMatrimonioBorrador = matrimonioBorrador['idMatrimonio']
            ?.toString();
        if (_plantillaEdtSeleccionada != null &&
            idMatrimonioBorrador != null &&
            idMatrimonioBorrador.isNotEmpty) {
          await _crearEdtMatrimonio(idMatrimonioBorrador);
        }
      }
      if (!mounted) return;
      final matrimonio = Map<String, dynamic>.from(
        resultado['matrimonio'] as Map? ?? const <String, dynamic>{},
      );
      final idMatrimonio = matrimonio['idMatrimonio']?.toString();
      if (!mounted) return;
      if (iniciar) {
        final proyecto = Map<String, dynamic>.from(
          resultado['proyecto'] as Map? ?? const <String, dynamic>{},
        );
        final idProyecto = proyecto['idProyecto']?.toString();
        if (idProyecto == null || idProyecto.isEmpty) {
          throw StateError('El servidor no devolvió el proyecto creado.');
        }
        if (idMatrimonio == null || idMatrimonio.isEmpty) {
          throw StateError('El servidor no devolvio el matrimonio creado.');
        }
        AppSnackbar.show(
          context,
          message: 'Matrimonio y EDT creados correctamente.',
          type: AppSnackbarType.success,
        );
        context.go(
          RouteNames.plan,
          extra: PlanificacionCargaRouteData(idProyecto),
        );
      } else {
        AppSnackbar.show(
          context,
          message: 'Borrador guardado correctamente.',
          type: AppSnackbarType.success,
        );
        context.go(RouteNames.matrimonios);
      }
    } on DioException catch (error) {
      final data = error.response?.data;
      final mensaje = data is Map ? data['mensaje']?.toString() : null;
      if (mounted) {
        AppSnackbar.show(
          context,
          message:
              mensaje ??
              (error.response == null
                  ? 'No se pudo conectar con el servidor.'
                  : 'No se pudo guardar el matrimonio.'),
          type: AppSnackbarType.error,
        );
      }
    } on StateError catch (error) {
      if (mounted) {
        AppSnackbar.show(
          context,
          message: error.message.toString(),
          type: AppSnackbarType.warning,
        );
      }
    } catch (error) {
      if (mounted) {
        AppSnackbar.show(
          context,
          message: error.toString(),
          type: AppSnackbarType.error,
        );
      }
    } finally {
      if (mounted) setState(() => _guardando = false);
    }
  }

  Future<void> _crearEdtMatrimonio(String idMatrimonio) async {
    final plantilla = _plantillaEdtSeleccionada;
    if (plantilla == null) {
      throw StateError('Selecciona una plantilla EDT antes de comenzar.');
    }
    final idPlantilla = plantilla['idEdtPlantilla']?.toString();
    if (idPlantilla == null || idPlantilla.isEmpty) {
      throw StateError('La plantilla EDT seleccionada no es valida.');
    }
    // Guardar borrador y comenzar comparten la misma EDT. Cuando el usuario
    // vuelve al paso EDT y la cambia, se sincroniza esa misma instancia: no
    // se debe mostrar otra plantilla ni crear una segunda EDT.
    try {
      await _edtApi.obtenerEdtMatrimonio(idMatrimonio);
      await _aplicarAjustesEdt(idMatrimonio);
      return;
    } on DioException catch (error) {
      if (error.response?.statusCode != 404) rethrow;
    }

    await _edtApi.crearEdtMatrimonio(idMatrimonio, {
      'idPlantilla': idPlantilla,
      'nombre': 'EDT de ${_nombres1.text.trim()} y ${_nombres2.text.trim()}',
      'elementosSeleccionados': _elementosEdtSeleccionados.toList(),
    });

    // La EDT operativa ya existe: resuelve el padre elegido en la plantilla
    // contra su copia real antes de insertar las secciones personalizadas.
    final edtCreada = await _edtApi.obtenerEdtMatrimonio(idMatrimonio);
    final elementosPorOrigen = <String, String>{};
    void indexarOrigen(Map<String, dynamic> nodo) {
      final origen = nodo['idEdtElementoOrigen']?.toString();
      final id = nodo['idEdtMatrimonioElemento']?.toString();
      if (origen != null && id != null) {
        elementosPorOrigen[origen] = id;
      }
      for (final hijo in List<Object?>.from(
        nodo['hijos'] as List? ?? const [],
      )) {
        indexarOrigen(Map<String, dynamic>.from(hijo as Map));
      }
    }

    for (final raiz in List<Object?>.from(
      edtCreada['elementos'] as List? ?? const [],
    )) {
      indexarOrigen(Map<String, dynamic>.from(raiz as Map));
    }
    for (var index = 0; index < _elementosEdtNuevos.length; index++) {
      final nuevo = Map<String, dynamic>.from(_elementosEdtNuevos[index]);
      final idPadreOrigen = nuevo.remove('_idElementoPadreOrigen')?.toString();
      await _edtApi.agregarElementoMatrimonio(idMatrimonio, {
        ...nuevo,
        if (idPadreOrigen != null && elementosPorOrigen[idPadreOrigen] != null)
          'idEdtMatrimonioElementoPadre': elementosPorOrigen[idPadreOrigen],
        'orden': index,
      });
    }
    await _aplicarAjustesEdt(idMatrimonio);
  }

  Future<void> _aplicarAjustesEdt(String idMatrimonio) async {
    final respuesta = await _edtApi.obtenerEdtMatrimonio(idMatrimonio);
    final actuales = <String, String>{};
    void indexar(Map<String, dynamic> nodo) {
      final origen = nodo['idEdtElementoOrigen']?.toString();
      final id = nodo['idEdtMatrimonioElemento']?.toString();
      if (origen != null && id != null) actuales[origen] = id;
      for (final hijo in List<Object?>.from(
        nodo['hijos'] as List? ?? const [],
      )) {
        indexar(Map<String, dynamic>.from(hijo as Map));
      }
    }

    for (final raiz in List<Object?>.from(
      respuesta['elementos'] as List? ?? const [],
    )) {
      indexar(Map<String, dynamic>.from(raiz as Map));
    }

    // La EDT operativa es la fuente que se mostrará en Plan. Al retomar un
    // borrador debemos reflejar también desmarcados, cambios de jerarquía y
    // orden, no solo el nombre de los elementos seleccionados.
    final origenesSeleccionados = <String>{};
    void recopilarSeleccionados(List<Map<String, dynamic>> nodos) {
      for (final nodo in nodos) {
        final idPlantilla = nodo['idEdtPlantillaElemento']?.toString();
        final elemento = nodo['elemento'] is Map
            ? Map<String, dynamic>.from(nodo['elemento'] as Map)
            : const <String, dynamic>{};
        final origen = elemento['idEdtElemento']?.toString();
        if (idPlantilla != null &&
            origen != null &&
            _elementosEdtSeleccionados.contains(idPlantilla)) {
          origenesSeleccionados.add(origen);
        }
        recopilarSeleccionados(
          List<Object?>.from(
            nodo['hijos'] as List? ?? const [],
          ).map((hijo) => Map<String, dynamic>.from(hijo as Map)).toList(),
        );
      }
    }

    Future<bool> conservarNodo(Map<String, dynamic> nodo) async {
      final hijos = List<Object?>.from(
        nodo['hijos'] as List? ?? const [],
      ).map((hijo) => Map<String, dynamic>.from(hijo as Map)).toList();
      var conservaHijo = false;
      for (final hijo in hijos) {
        conservaHijo = (await conservarNodo(hijo)) || conservaHijo;
      }
      final origen = nodo['idEdtElementoOrigen']?.toString();
      final conservar =
          origen == null ||
          origenesSeleccionados.contains(origen) ||
          conservaHijo;
      if (!conservar) {
        final id = nodo['idEdtMatrimonioElemento']?.toString();
        if (id != null) {
          await _edtApi.eliminarElementoMatrimonio(idMatrimonio, id);
        }
      }
      return conservar;
    }

    recopilarSeleccionados(_arbolEdt);
    for (final raiz in List<Object?>.from(
      respuesta['elementos'] as List? ?? const [],
    )) {
      await conservarNodo(Map<String, dynamic>.from(raiz as Map));
    }

    Future<void> actualizar(
      List<Map<String, dynamic>> nodos, [
      String? idPadreActual,
    ]) async {
      for (var orden = 0; orden < nodos.length; orden++) {
        final nodo = nodos[orden];
        final idPlantilla = nodo['idEdtPlantillaElemento']?.toString();
        final elemento = nodo['elemento'] is Map
            ? Map<String, dynamic>.from(nodo['elemento'] as Map)
            : const <String, dynamic>{};
        final idOrigen = elemento['idEdtElemento']?.toString();
        final idActual = idOrigen == null ? null : actuales[idOrigen];
        if (idPlantilla != null &&
            _elementosEdtSeleccionados.contains(idPlantilla) &&
            idActual != null) {
          await _edtApi.actualizarElementoMatrimonio(idMatrimonio, idActual, {
            'nombre': elemento['nombre']?.toString() ?? 'Elemento EDT',
            'descripcion': elemento['descripcion']?.toString(),
            'orden': orden,
            'idEdtMatrimonioElementoPadre': idPadreActual,
          });
        }
        final hijos = List<Object?>.from(
          nodo['hijos'] as List? ?? const [],
        ).map((hijo) => Map<String, dynamic>.from(hijo as Map)).toList();
        await actualizar(hijos, idActual);
      }
    }

    await actualizar(_arbolEdt);
  }

  String get _tituloPaso => [
    'Datos de la pareja',
    'Datos base',
    'Objetivos y necesidades',
    'EDT del matrimonio',
    'Resumen',
  ][_paso - 1];
  TextEditingController get nombres1 => _nombres1;
  TextEditingController get apellido1 => _apellido1;
  TextEditingController get dni1 => _dni1;
  TextEditingController get nombres2 => _nombres2;
  TextEditingController get apellido2 => _apellido2;
  TextEditingController get dni2 => _dni2;
  TextEditingController get fecha => _fecha;
  TextEditingController get presupuesto => _presupuesto;
  TextEditingController get objetivos => _objetivos;
  TextEditingController get necesidades => _necesidades;
  TextEditingController get restricciones => _restricciones;
  TextEditingController get supuestos => _supuestos;
  TextEditingController get moonboard => _moonboard;
  String? get ubigeo => _ubigeo;
  String get _lugarResumen =>
      _nombresUbigeo[_ubigeo] ?? _ubigeo ?? 'Sin definir';
  @override
  Widget build(BuildContext context) {
    if (_mostrandoIntro) {
      return Stack(
        children: [
          const _InicioProyecto(),
          Positioned(
            bottom: 72,
            left: 0,
            right: 0,
            child: Text(
              'Continuamos en $_segundosRestantes s',
              textAlign: TextAlign.center,
              style: Theme.of(
                context,
              ).textTheme.bodyMedium?.copyWith(color: AppColors.textSecondary),
            ),
          ),
          Positioned(
            right: 16,
            bottom: 12,
            child: TextButton(
              onPressed: () {
                _introTimer?.cancel();
                setState(() => _mostrandoIntro = false);
              },
              child: const Text('SKIP'),
            ),
          ),
        ],
      );
    }
    return Scaffold(
      backgroundColor: const Color(0xFFFDFBFF),
      body: SafeArea(
        child: Align(
          alignment: Alignment.topCenter,
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 620),
            child: Form(
              key: _form,
              child: SingleChildScrollView(
                padding: const EdgeInsets.fromLTRB(24, 12, 24, 36),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Align(
                      alignment: Alignment.centerLeft,
                      child: AppButton(
                        label: 'Volver',
                        variant: AppButtonVariant.tertiary,
                        icon: Icons.arrow_back,
                        onPressed: _volver,
                      ),
                    ),
                    const SizedBox(height: AppSpacing.md),
                    Text(
                      'Crear matrimonio',
                      textAlign: TextAlign.center,
                      style: Theme.of(context).textTheme.headlineSmall
                          ?.copyWith(fontWeight: FontWeight.w800),
                    ),
                    const SizedBox(height: AppSpacing.xs),
                    Text(
                      'Paso $_paso de 5: $_tituloPaso',
                      textAlign: TextAlign.center,
                      style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                        color: AppColors.textSecondary,
                      ),
                    ),
                    const SizedBox(height: AppSpacing.lg),
                    _IndicadorPasos(
                      actual: _paso,
                      total: 5,
                      onPasoSeleccionado: (paso) =>
                          setState(() => _paso = paso),
                    ),
                    const SizedBox(height: AppSpacing.lg),
                    _Informacion(
                      practica: _paso == 1
                          ? _gp01
                          : _paso == 2
                          ? _gp02
                          : _paso == 4
                          ? _gp03
                          : _paso == 5
                          ? _gp04
                          : null,
                      practicas: _paso == 3 ? _gp06AGp09 : null,
                    ),
                    const SizedBox(height: AppSpacing.lg),
                    _contenidoPaso(),
                    const SizedBox(height: AppSpacing.xl),
                    _accionesPaso(),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _contenidoPaso() {
    if (_paso == 1) return _pareja();
    if (_paso == 2) return _datosBase();
    if (_paso == 3) return _objetivosNecesidades();
    if (_paso == 4) return _pasoEdt();
    return _resumen();
  }

  Widget _pareja() => Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      const Text(
        'Informacion de la pareja 1',
        style: TextStyle(fontWeight: FontWeight.w700),
      ),
      const SizedBox(height: 12),
      _campo('Nombre(s) de la pareja 1', _nombres1),
      _campo('Apellido paterno de la pareja 1', _apellido1),
      _campo('DNI de la pareja 1', _dni1, dni: true),
      _campo('Usuario de la pareja 1', _usuario1, enabled: !_usarDni),
      _campo(
        'Contrasena de la pareja 1',
        _contrasena1,
        enabled: !_usarDni,
        password: true,
      ),
      Padding(
        padding: const EdgeInsets.symmetric(vertical: 8),
        child: Divider(
          height: 1,
          thickness: 1,
          color: AppColors.border.withValues(alpha: .7),
        ),
      ),
      const Text(
        'Informacion de la pareja 2',
        style: TextStyle(fontWeight: FontWeight.w700),
      ),
      const SizedBox(height: 12),
      _campo('Nombre(s) de la pareja 2', _nombres2),
      _campo('Apellido paterno de la pareja 2', _apellido2),
      _campo('DNI de la pareja 2', _dni2, dni: true),
      _campo('Usuario de la pareja 2', _usuario2, enabled: !_usarDni),
      _campo(
        'Contrasena de la pareja 2',
        _contrasena2,
        enabled: !_usarDni,
        password: true,
      ),
      AppCheckbox(
        label: 'Usar DNI como usuario y contraseña',
        value: _usarDni,
        onChanged: _copiarDni,
      ),
    ],
  );

  Widget _accionesPaso() => LayoutBuilder(
    builder: (context, constraints) {
      final anterior = AppButton(
        label: 'Anterior',
        variant: AppButtonVariant.secondary,
        icon: Icons.arrow_back,
        onPressed: _volver,
      );
      final guardar = AppButton(
        label: 'Guardar borrador',
        variant: AppButtonVariant.tertiary,
        loading: _guardando,
        onPressed: () => _guardar(false),
      );
      final siguiente = AppButton(
        label: _paso == 5 ? 'Comenzar' : 'Siguiente',
        icon: Icons.arrow_forward,
        iconAfter: true,
        loading: _guardando,
        onPressed: _siguiente,
      );

      if (constraints.maxWidth < 430) {
        return Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            if (_paso > 1) ...[
              Center(child: guardar),
              const SizedBox(height: AppSpacing.sm),
            ],
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [anterior, siguiente],
            ),
          ],
        );
      }
      return Row(
        children: [
          anterior,
          const Spacer(),
          if (_paso > 1) guardar,
          const Spacer(),
          siguiente,
        ],
      );
    },
  );

  Widget _campo(
    String label,
    TextEditingController c, {
    bool dni = false,
    bool enabled = true,
    bool password = false,
    TextInputType? keyboardType,
    IconData? icon,
  }) => Padding(
    padding: const EdgeInsets.only(bottom: 16),
    child: AppTextField(
      label: label,
      controller: c,
      required: true,
      enabled: enabled,
      obscureText: password,
      prefixIcon: Icon(
        icon ??
            (password
                ? Icons.lock_outline
                : dni
                ? Icons.badge_outlined
                : Icons.person_outline),
      ),
      keyboardType: keyboardType ?? (dni ? TextInputType.number : null),
      inputFormatters: dni
          ? [
              FilteringTextInputFormatter.digitsOnly,
              LengthLimitingTextInputFormatter(8),
            ]
          : null,
      onChanged: dni ? (_) => _dniCambiado() : null,
      validator: dni ? _dni : _obligatorio,
    ),
  );
  Future<void> _seleccionarFecha() async {
    final hoy = DateTime.now();
    final fecha = await showDatePicker(
      context: context,
      firstDate: DateTime(hoy.year, hoy.month, hoy.day + 1),
      lastDate: DateTime(hoy.year + 20),
      initialDate: DateTime(hoy.year, hoy.month, hoy.day + 1),
    );
    if (fecha != null) {
      setState(() {
        _fechaSeleccionada = fecha;
        _fecha.text = _fechaVisible(fecha);
      });
    }
  }

  Widget _selectorUbigeo() => FutureBuilder<List<Map<String, dynamic>>>(
    future: _ubigeos,
    builder: (context, snapshot) {
      if (snapshot.hasError) {
        return const Text('No se pudieron cargar las ubicaciones.');
      }
      final items = snapshot.data ?? const [];
      return AppSelectField<String>(
        label: 'Ciudad / Ubicacion',
        hintText: snapshot.hasData
            ? 'Busca distrito, provincia o departamento'
            : 'Cargando ubicaciones...',
        initialValue: _ubigeo,
        searchable: true,
        options: items
            .map(
              (item) => AppSelectOption(
                value: item['idUbigeo'].toString(),
                label:
                    '${item['distrito']}, ${item['provincia']}, ${item['departamento']}',
              ),
            )
            .toList(),
        onChanged: snapshot.hasData
            ? (value) => setState(() => _ubigeo = value)
            : null,
      );
    },
  );
  Widget _datosBase() => Column(
    children: [
      AppTextField(
        label: 'Fecha del matrimonio',
        controller: _fecha,
        required: true,
        readOnly: true,
        prefixIcon: const Icon(Icons.calendar_today_outlined),
        suffixIcon: const Icon(Icons.arrow_drop_down),
        onTap: _seleccionarFecha,
        validator: _obligatorio,
      ),
      const SizedBox(height: 16),
      Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            width: 142,
            child: AppSelectField<String>(
              label: 'Moneda',
              required: true,
              initialValue: _moneda,
              options: const [
                AppSelectOption(value: 'SOLES', label: 'S/. (SOLES)'),
                AppSelectOption(value: 'DOLARES', label: 'US\$ (DOLARES)'),
              ],
              onChanged: (value) {
                if (value != null) setState(() => _moneda = value);
              },
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: AppTextField(
              label: 'Presupuesto estimado',
              controller: _presupuesto,
              required: true,
              prefixIcon: const Icon(Icons.payments_outlined),
              keyboardType: const TextInputType.numberWithOptions(
                decimal: true,
              ),
              validator: _obligatorio,
            ),
          ),
        ],
      ),
      const SizedBox(height: 16),
      AppNumberField(
        label: 'Cantidad estimada de invitados',
        required: true,
        min: 1,
        initialValue: _invitados,
        onChanged: (v) => _invitados = v.toInt(),
      ),
      const SizedBox(height: 16),
      _selectorUbigeo(),
      const SizedBox(height: 16),
      _selectorTipoCeremonia(),
      const SizedBox(height: 16),
      _selectorAlcance(),
    ],
  );

  Widget _selectorTipoCeremonia() {
    if (_tiposCeremonia.isEmpty) {
      return const Text(
        'El catalogo de tipos de ceremonia aun no esta disponible en el servidor.',
      );
    }
    return AppSelectField<int>(
      label: 'Tipo de ceremonia',
      required: true,
      initialValue: _idTipoCeremonia,
      options: _tiposCeremonia
          .map((tipo) => AppSelectOption(value: tipo.id, label: tipo.nombre))
          .toList(),
      onChanged: (value) => setState(() => _idTipoCeremonia = value),
    );
  }

  Widget _selectorAlcance() => FutureBuilder<List<Map<String, dynamic>>>(
    future: _categoriasServicio,
    builder: (context, snapshot) {
      if (snapshot.hasError) {
        return const Text('No se pudieron cargar las categorías de servicio.');
      }
      final categorias = (snapshot.data ?? const <Map<String, dynamic>>[])
          .where((categoria) => categoria['activo'] != false)
          .toList();
      final nombres = categorias
          .where(
            (categoria) =>
                _alcanceCodigos.contains(categoria['codigo']?.toString()),
          )
          .map((categoria) => categoria['nombre']?.toString() ?? '')
          .where((nombre) => nombre.isNotEmpty)
          .join(', ');
      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Alcance del proyecto',
            style: Theme.of(
              context,
            ).textTheme.labelMedium?.copyWith(fontWeight: FontWeight.w500),
          ),
          const SizedBox(height: 7),
          InkWell(
            borderRadius: BorderRadius.circular(12),
            onTap: snapshot.hasData
                ? () => _seleccionarAlcance(categorias)
                : null,
            child: InputDecorator(
              isEmpty: nombres.isEmpty,
              decoration: const InputDecoration(
                prefixIcon: Icon(Icons.category_outlined),
                suffixIcon: Icon(Icons.arrow_drop_down),
              ),
              child: Text(
                nombres.isEmpty
                    ? (snapshot.hasData
                          ? 'Selecciona los servicios incluidos'
                          : 'Cargando categorías...')
                    : nombres,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: nombres.isEmpty
                    ? Theme.of(context).inputDecorationTheme.hintStyle
                    : null,
              ),
            ),
          ),
        ],
      );
    },
  );

  Future<void> _seleccionarAlcance(
    List<Map<String, dynamic>> categorias,
  ) async {
    final seleccionInicial = Set<String>.from(_alcanceCodigos);
    final seleccion = await showModalBottomSheet<Set<String>>(
      context: context,
      isScrollControlled: true,
      showDragHandle: true,
      builder: (sheetContext) => _SelectorAlcanceSheet(
        categorias: categorias,
        seleccionInicial: seleccionInicial,
      ),
    );
    if (!mounted || seleccion == null) return;
    setState(() {
      _alcanceCodigos
        ..clear()
        ..addAll(seleccion);
    });
  }

  static Map<String, dynamic> _mapa(Object? value) => value is Map
      ? Map<String, dynamic>.from(value)
      : const <String, dynamic>{};
  static int? _entero(Object? value) => value is int
      ? value
      : value is num
      ? value.toInt()
      : int.tryParse(value?.toString() ?? '');
  static DateTime? _fechaDesdeApi(Object? value) {
    final texto = value?.toString();
    return texto == null || texto.isEmpty ? null : DateTime.tryParse(texto);
  }

  static String _fechaVisible(DateTime fecha) {
    const meses = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    return '${fecha.day} de ${meses[fecha.month - 1]} del ${fecha.year}';
  }

  String? get _fechaApi {
    final fecha = _fechaSeleccionada;
    if (fecha == null) return null;
    final mes = fecha.month.toString().padLeft(2, '0');
    final dia = fecha.day.toString().padLeft(2, '0');
    return '${fecha.year}-$mes-$dia';
  }

  void _cargarItems(List<String> destino, Object? valor) {
    destino
      ..clear()
      ..addAll(
        (valor?.toString() ?? '')
            .split(';')
            .map((item) => item.trim())
            .where((item) => item.isNotEmpty),
      );
  }

  String? _unirItems(List<String> items) =>
      items.isEmpty ? null : items.join(';');

  void _agregarItem(TextEditingController controller, List<String> items) {
    final texto = controller.text.trim().replaceAll(';', ',');
    if (texto.isEmpty) {
      AppSnackbar.show(
        context,
        message: 'Escribe un elemento antes de agregarlo.',
        type: AppSnackbarType.info,
      );
      return;
    }
    setState(() {
      items.add(texto);
      controller.clear();
    });
  }

  Widget _campoLista({
    required String label,
    required TextEditingController controller,
    required List<String> items,
  }) => Padding(
    padding: const EdgeInsets.only(bottom: 16),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            Expanded(
              child: AppTextField(
                label: label,
                controller: controller,
                hintText: 'Escribe y agrega un elemento',
                textInputAction: TextInputAction.done,
                onFieldSubmitted: (_) => _agregarItem(controller, items),
              ),
            ),
            const SizedBox(width: 12),
            AppButton(
              label: 'Agregar',
              icon: Icons.add,
              onPressed: () => _agregarItem(controller, items),
            ),
          ],
        ),
        AnimatedSize(
          duration: const Duration(milliseconds: 180),
          child: items.isEmpty
              ? const SizedBox.shrink()
              : Padding(
                  padding: const EdgeInsets.only(top: 10),
                  child: Card(
                    clipBehavior: Clip.antiAlias,
                    color: const Color(0xFFF4F0FB),
                    child: ExpansionTile(
                      initiallyExpanded: true,
                      leading: const Icon(
                        Icons.format_list_bulleted_outlined,
                        color: AppColors.primary,
                      ),
                      title: Text(
                        '${items.length} ${items.length == 1 ? 'elemento agregado' : 'elementos agregados'}',
                        style: const TextStyle(fontWeight: FontWeight.w700),
                      ),
                      children: List<Widget>.generate(
                        items.length,
                        (index) => ListTile(
                          dense: true,
                          leading: Text('${index + 1}.'),
                          title: Text(items[index]),
                          trailing: IconButton(
                            tooltip: 'Quitar',
                            icon: const Icon(Icons.close_outlined),
                            onPressed: () =>
                                setState(() => items.removeAt(index)),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
        ),
      ],
    ),
  );

  Widget _objetivosNecesidades() => Column(
    children: [
      _campoLista(
        label: 'Objetivos',
        controller: _objetivos,
        items: _objetivosItems,
      ),
      _campoLista(
        label: 'Necesidades',
        controller: _necesidades,
        items: _necesidadesItems,
      ),
      _campoLista(
        label: 'Supuestos',
        controller: _supuestos,
        items: _supuestosItems,
      ),
      _campoLista(
        label: 'Restricciones',
        controller: _restricciones,
        items: _restriccionesItems,
      ),
      _campoLista(
        label: 'Ideas para el moonboard',
        controller: _moonboard,
        items: _moonboardItems,
      ),
    ],
  );

  Widget _pasoEdt() => FutureBuilder<List<Map<String, dynamic>>>(
    future: _plantillasEdt,
    builder: (context, snapshot) {
      if (snapshot.hasError) {
        return const Text('No se pudieron cargar las plantillas EDT.');
      }
      final plantillas = snapshot.data ?? const <Map<String, dynamic>>[];
      if (!snapshot.hasData) {
        return const Center(child: CircularProgressIndicator());
      }
      if (plantillas.isEmpty) {
        return const _EdtPasoVacio();
      }
      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Seleccionar plantilla',
            style: Theme.of(
              context,
            ).textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w800),
          ),
          const SizedBox(height: 4),
          Text(
            'Elige la estructura que será la base editable de este matrimonio.',
            style: Theme.of(
              context,
            ).textTheme.bodyMedium?.copyWith(color: AppColors.textSecondary),
          ),
          const SizedBox(height: 12),
          AppSelectField<String>(
            label: 'Plantilla EDT',
            initialValue: _plantillaEdtSeleccionada?['idEdtPlantilla']
                ?.toString(),
            options: plantillas
                .map(
                  (plantilla) => AppSelectOption<String>(
                    value: plantilla['idEdtPlantilla'].toString(),
                    label: plantilla['nombre']?.toString() ?? 'Plantilla EDT',
                  ),
                )
                .toList(),
            onChanged: (id) {
              if (id == null) return;
              final plantilla = plantillas.firstWhere(
                (item) => item['idEdtPlantilla']?.toString() == id,
              );
              _seleccionarPlantillaEdt(plantilla);
            },
          ),
          if (_plantillaEdtSeleccionada != null) ...[
            const SizedBox(height: 16),
            _editorEdt(),
          ],
        ],
      );
    },
  );

  Future<void> _seleccionarPlantillaEdt(Map<String, dynamic> plantilla) async {
    final idPlantilla = plantilla['idEdtPlantilla']?.toString();
    if (idPlantilla == null || idPlantilla.isEmpty) return;
    setState(() => _cargandoArbolEdt = true);
    try {
      final respuesta = await _edtApi.arbol(idPlantilla);
      final elementos = respuesta['elementos'] ?? respuesta['arbol'];
      if (elementos != null && elementos is! List) {
        throw StateError(
          'La estructura EDT recibida no contiene una lista válida.',
        );
      }
      final arbol = List<Object?>.from(
        elementos as List? ?? const [],
      ).whereType<Map>().map(Map<String, dynamic>.from).toList();

      // La EDT debe poder visualizarse aunque el catálogo auxiliar de
      // categorías no esté disponible. En ese caso se conservan seleccionados
      // los elementos generales y la persona puede revisar los opcionales.
      List<Map<String, dynamic>> categorias = const [];
      try {
        categorias = await _categoriasServicio;
      } catch (_) {
        categorias = const [];
      }
      final seleccion = <String>{};
      void seleccionarAplicables(Map<String, dynamic> nodo) {
        final elemento = nodo['elemento'] is Map
            ? Map<String, dynamic>.from(nodo['elemento'] as Map)
            : const <String, dynamic>{};
        final idCategoria = elemento['idCategoriaServicio']?.toString();
        String? codigoCategoria;
        for (final categoria in categorias) {
          if (categoria['idCategoriaServicio']?.toString() == idCategoria) {
            codigoCategoria = categoria['codigo']?.toString();
            break;
          }
        }
        final idNodo = nodo['idEdtPlantillaElemento']?.toString();
        if (idNodo != null &&
            (idCategoria == null ||
                _alcanceCodigos.contains(codigoCategoria))) {
          seleccion.add(idNodo);
        }
        for (final hijo in List<Object?>.from(
          nodo['hijos'] as List? ?? const [],
        )) {
          seleccionarAplicables(Map<String, dynamic>.from(hijo as Map));
        }
      }

      for (final nodo in arbol) {
        seleccionarAplicables(nodo);
      }
      if (!mounted) return;
      setState(() {
        _plantillaEdtSeleccionada = plantilla;
        _arbolEdt = arbol;
        _elementosEdtSeleccionados
          ..clear()
          ..addAll(seleccion);
      });
    } catch (_) {
      if (mounted) {
        AppSnackbar.show(
          context,
          message: 'No se pudo cargar la estructura de la plantilla.',
          type: AppSnackbarType.error,
        );
      }
    } finally {
      if (mounted) setState(() => _cargandoArbolEdt = false);
    }
  }

  Widget _editorEdt() => Card(
    color: const Color(0xFFF4F0FB),
    child: Padding(
      padding: const EdgeInsets.all(12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            _plantillaEdtSeleccionada?['nombre']?.toString() ?? 'Plantilla EDT',
            style: Theme.of(
              context,
            ).textTheme.titleSmall?.copyWith(fontWeight: FontWeight.w800),
          ),
          const SizedBox(height: 4),
          const Text(
            'Los servicios incluidos se marcan automáticamente. Puedes revisar la selección antes de crear la EDT.',
          ),
          const SizedBox(height: 8),
          if (_cargandoArbolEdt)
            const Center(
              child: Padding(
                padding: EdgeInsets.all(20),
                child: CircularProgressIndicator(),
              ),
            )
          else if (_arbolEdt.isEmpty)
            const Padding(
              padding: EdgeInsets.all(12),
              child: Text('Esta plantilla todavía no tiene elementos.'),
            )
          else ...[
            Align(
              alignment: Alignment.centerRight,
              child: Wrap(
                spacing: 4,
                children: [
                  TextButton.icon(
                    onPressed: _seleccionarTodosEdt,
                    icon: const Icon(Icons.select_all_outlined),
                    label: const Text('Seleccionar todos'),
                  ),
                  TextButton.icon(
                    onPressed: _agregarElementoEdt,
                    icon: const Icon(Icons.add_outlined),
                    label: const Text('Agregar elemento'),
                  ),
                ],
              ),
            ),
            ..._arbolEdt.map(_nodoSeleccionableEdt),
            ..._elementosEdtNuevos.asMap().entries.map(
              (entry) => ListTile(
                leading: const Icon(
                  Icons.add_box_outlined,
                  color: AppColors.primary,
                ),
                title: Text(
                  entry.value['nombre']?.toString() ?? 'Nuevo elemento',
                ),
                subtitle: Text(
                  _nombreSeccionSuperiorEdt(
                    entry.value['_idElementoPadreOrigen']?.toString(),
                  ),
                ),
                trailing: IconButton(
                  tooltip: 'Quitar',
                  icon: const Icon(Icons.close_outlined),
                  onPressed: () =>
                      setState(() => _elementosEdtNuevos.removeAt(entry.key)),
                ),
              ),
            ),
          ],
        ],
      ),
    ),
  );

  void _seleccionarTodosEdt() {
    final ids = <String>{};
    void recolectar(Map<String, dynamic> nodo) {
      final id = nodo['idEdtPlantillaElemento']?.toString();
      if (id != null) ids.add(id);
      for (final hijo in List<Object?>.from(
        nodo['hijos'] as List? ?? const [],
      )) {
        recolectar(Map<String, dynamic>.from(hijo as Map));
      }
    }

    for (final nodo in _arbolEdt) {
      recolectar(nodo);
    }
    setState(() => _elementosEdtSeleccionados.addAll(ids));
  }

  Future<void> _agregarElementoEdt() async {
    final nombre = TextEditingController();
    final descripcion = TextEditingController();
    String? idPadreOrigen;
    final todos = _aplanarArbolEdt();
    final creado = await showModalBottomSheet<Map<String, dynamic>>(
      context: context,
      isScrollControlled: true,
      showDragHandle: true,
      builder: (modalContext) => StatefulBuilder(
        builder: (modalContext, setModalState) => Padding(
          padding: EdgeInsets.fromLTRB(
            AppSpacing.lg,
            AppSpacing.sm,
            AppSpacing.lg,
            MediaQuery.viewInsetsOf(modalContext).bottom + AppSpacing.lg,
          ),
          child: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Text(
                  'Agregar sección',
                  style: Theme.of(
                    modalContext,
                  ).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w800),
                ),
                const SizedBox(height: AppSpacing.lg),
                AppTextField(
                  label: 'Nombre de la sección',
                  controller: nombre,
                  required: true,
                  prefixIcon: const Icon(Icons.add_box_outlined),
                ),
                const SizedBox(height: AppSpacing.md),
                AppTextField(
                  label: 'Descripción',
                  controller: descripcion,
                  maxLines: 3,
                  prefixIcon: const Icon(Icons.notes_outlined),
                ),
                const SizedBox(height: AppSpacing.md),
                DropdownButtonFormField<String?>(
                  initialValue: idPadreOrigen,
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
                        value: nodo.idElementoOrigen,
                        child: Text(
                          '${'   ' * nodo.nivel}${nodo.nombre}',
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ),
                  ],
                  onChanged: (valor) =>
                      setModalState(() => idPadreOrigen = valor),
                ),
                const SizedBox(height: AppSpacing.xl),
                AppButton(
                  label: 'Agregar sección',
                  icon: Icons.add,
                  expanded: true,
                  onPressed: () {
                    final texto = nombre.text.trim();
                    if (texto.isEmpty) return;
                    Navigator.of(modalContext).pop({
                      'nombre': texto,
                      if (descripcion.text.trim().isNotEmpty)
                        'descripcion': descripcion.text.trim(),
                      '_idElementoPadreOrigen': ?idPadreOrigen,
                    });
                  },
                ),
              ],
            ),
          ),
        ),
      ),
    );
    nombre.dispose();
    descripcion.dispose();
    if (!mounted || creado == null) return;
    setState(() {
      final idPadreOrigen = creado['_idElementoPadreOrigen']?.toString();
      if (idPadreOrigen != null) {
        final padre = _buscarNodoPorElementoOrigen(idPadreOrigen);
        final idPlantilla = padre?['idEdtPlantillaElemento']?.toString();
        if (idPlantilla != null) _elementosEdtSeleccionados.add(idPlantilla);
      }
      _elementosEdtNuevos.add(creado);
    });
  }

  Widget _nodoSeleccionableEdt(Map<String, dynamic> nodo, [int nivel = 0]) {
    final id = nodo['idEdtPlantillaElemento']?.toString() ?? '';
    final elemento = nodo['elemento'] is Map
        ? Map<String, dynamic>.from(nodo['elemento'] as Map)
        : const <String, dynamic>{};
    final hijos = List<Object?>.from(
      nodo['hijos'] as List? ?? const [],
    ).map((hijo) => Map<String, dynamic>.from(hijo as Map)).toList();
    final seleccionado = _elementosEdtSeleccionados.contains(id);
    final puedeSubir = _puedeMoverElementoEdt(id, -1);
    final puedeBajar = _puedeMoverElementoEdt(id, 1);
    final puedeArrastrar = puedeSubir || puedeBajar;
    return Padding(
      padding: EdgeInsets.only(left: nivel * 16.0),
      child: Column(
        children: [
          DragTarget<String>(
            onWillAcceptWithDetails: (detalle) =>
                detalle.data != id && _sonHermanosEdt(detalle.data, id),
            onAcceptWithDetails: (detalle) =>
                _moverElementoSobreEdt(detalle.data, id),
            builder: (context, candidatos, _) => DecoratedBox(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(10),
                color: candidatos.isEmpty
                    ? Colors.transparent
                    : AppColors.primary.withValues(alpha: .08),
              ),
              child: Row(
                children: [
                  Expanded(
                    child: AppCheckbox(
                      label: elemento['nombre']?.toString() ?? 'Elemento EDT',
                      subtitle: elemento['idCategoriaServicio'] == null
                          ? 'Elemento general'
                          : seleccionado
                          ? 'Servicio incluido'
                          : 'Servicio opcional',
                      value: seleccionado,
                      onChanged: (marcado) =>
                          _cambiarSeleccionEdt(nodo, marcado),
                    ),
                  ),
                  if (puedeArrastrar)
                    Draggable<String>(
                      data: id,
                      feedback: Material(
                        color: Colors.transparent,
                        child: Icon(
                          Icons.drag_indicator,
                          size: 28,
                          color: AppColors.primary.withValues(alpha: .85),
                        ),
                      ),
                      childWhenDragging: const Opacity(
                        opacity: .35,
                        child: Icon(
                          Icons.drag_indicator,
                          color: AppColors.primary,
                        ),
                      ),
                      child: const Tooltip(
                        message:
                            'Arrastra para reordenar dentro del mismo nivel',
                        child: Icon(
                          Icons.drag_indicator,
                          color: AppColors.primary,
                        ),
                      ),
                    )
                  else
                    Icon(
                      Icons.drag_indicator,
                      color: AppColors.textSecondary.withValues(alpha: .35),
                    ),
                  IconButton(
                    tooltip: 'Subir',
                    onPressed: puedeSubir
                        ? () => _moverElementoEdt(id, -1)
                        : null,
                    icon: const Icon(Icons.keyboard_arrow_up),
                  ),
                  IconButton(
                    tooltip: 'Bajar',
                    onPressed: puedeBajar
                        ? () => _moverElementoEdt(id, 1)
                        : null,
                    icon: const Icon(Icons.keyboard_arrow_down),
                  ),
                  PopupMenuButton<String>(
                    tooltip: 'Acciones',
                    onSelected: (accion) {
                      if (accion == 'editar') _editarElementoEdt(nodo);
                    },
                    itemBuilder: (_) => const [
                      PopupMenuItem(value: 'editar', child: Text('Editar')),
                    ],
                  ),
                ],
              ),
            ),
          ),
          ...hijos.map((hijo) => _nodoSeleccionableEdt(hijo, nivel + 1)),
        ],
      ),
    );
  }

  void _cambiarSeleccionEdt(Map<String, dynamic> nodo, bool marcado) {
    final ids = <String>{};
    void recolectar(Map<String, dynamic> actual) {
      final id = actual['idEdtPlantillaElemento']?.toString();
      if (id != null) ids.add(id);
      for (final hijo in List<Object?>.from(
        actual['hijos'] as List? ?? const [],
      )) {
        recolectar(Map<String, dynamic>.from(hijo as Map));
      }
    }

    recolectar(nodo);
    setState(() {
      if (marcado) {
        _elementosEdtSeleccionados.addAll(ids);
      } else {
        _elementosEdtSeleccionados.removeAll(ids);
      }
    });
  }

  Future<void> _editarElementoEdt(Map<String, dynamic> nodo) async {
    final elemento = nodo['elemento'] is Map
        ? Map<String, dynamic>.from(nodo['elemento'] as Map)
        : <String, dynamic>{};
    final nombre = TextEditingController(text: elemento['nombre']?.toString());
    final descripcion = TextEditingController(
      text: elemento['descripcion']?.toString(),
    );
    final datos = await showDialog<Map<String, String>>(
      context: context,
      builder: (dialogContext) => AlertDialog(
        title: const Text('Editar elemento EDT'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            AppTextField(label: 'Nombre', controller: nombre, required: true),
            const SizedBox(height: 12),
            AppTextField(label: 'Descripción', controller: descripcion),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(dialogContext).pop(),
            child: const Text('Cancelar'),
          ),
          FilledButton(
            onPressed: () => Navigator.of(dialogContext).pop({
              'nombre': nombre.text.trim(),
              'descripcion': descripcion.text.trim(),
            }),
            child: const Text('Guardar'),
          ),
        ],
      ),
    );
    nombre.dispose();
    descripcion.dispose();
    if (!mounted || datos == null || (datos['nombre'] ?? '').isEmpty) return;
    setState(() {
      elemento['nombre'] = datos['nombre'];
      elemento['descripcion'] = datos['descripcion'];
      nodo['elemento'] = elemento;
    });
  }

  List<_NodoPasoEdt> _aplanarArbolEdt() {
    final todos = <_NodoPasoEdt>[];
    void recorrer(Map<String, dynamic> nodo, int nivel) {
      final elemento = nodo['elemento'] is Map
          ? Map<String, dynamic>.from(nodo['elemento'] as Map)
          : const <String, dynamic>{};
      final idOrigen = elemento['idEdtElemento']?.toString();
      if (idOrigen != null && idOrigen.isNotEmpty) {
        todos.add(
          _NodoPasoEdt(
            idElementoOrigen: idOrigen,
            nombre: elemento['nombre']?.toString() ?? 'Elemento EDT',
            nivel: nivel,
          ),
        );
      }
      for (final hijo in List<Object?>.from(
        nodo['hijos'] as List? ?? const [],
      )) {
        recorrer(Map<String, dynamic>.from(hijo as Map), nivel + 1);
      }
    }

    for (final nodo in _arbolEdt) {
      recorrer(nodo, 0);
    }
    return todos;
  }

  Map<String, dynamic>? _buscarNodoPorElementoOrigen(String idOrigen) {
    Map<String, dynamic>? buscar(List<Map<String, dynamic>> nodos) {
      for (final nodo in nodos) {
        final elemento = nodo['elemento'] is Map
            ? Map<String, dynamic>.from(nodo['elemento'] as Map)
            : const <String, dynamic>{};
        if (elemento['idEdtElemento']?.toString() == idOrigen) return nodo;
        final hijos = List<Object?>.from(
          nodo['hijos'] as List? ?? const [],
        ).map((hijo) => Map<String, dynamic>.from(hijo as Map)).toList();
        final encontrado = buscar(hijos);
        if (encontrado != null) return encontrado;
      }
      return null;
    }

    return buscar(_arbolEdt);
  }

  String _nombreSeccionSuperiorEdt(String? idOrigen) {
    if (idOrigen == null || idOrigen.isEmpty) {
      return 'Se agregará como sección independiente.';
    }
    final nodo = _buscarNodoPorElementoOrigen(idOrigen);
    final elemento = nodo?['elemento'] is Map
        ? Map<String, dynamic>.from(nodo!['elemento'] as Map)
        : const <String, dynamic>{};
    final nombre = elemento['nombre']?.toString();
    return nombre == null || nombre.isEmpty
        ? 'Sección superior seleccionada.'
        : 'Sección superior: $nombre';
  }

  bool _puedeMoverElementoEdt(String idNodo, int direccion) {
    bool buscar(List<Map<String, dynamic>> hermanos) {
      final indice = hermanos.indexWhere(
        (nodo) => nodo['idEdtPlantillaElemento']?.toString() == idNodo,
      );
      if (indice >= 0) {
        final destino = indice + direccion;
        return destino >= 0 && destino < hermanos.length;
      }
      for (final nodo in hermanos) {
        final hijos = List<Object?>.from(
          nodo['hijos'] as List? ?? const [],
        ).map((hijo) => Map<String, dynamic>.from(hijo as Map)).toList();
        if (buscar(hijos)) return true;
      }
      return false;
    }

    return buscar(_arbolEdt);
  }

  bool _sonHermanosEdt(String idOrigen, String idDestino) {
    bool buscar(List<Map<String, dynamic>> hermanos) {
      final contieneOrigen = hermanos.any(
        (nodo) => nodo['idEdtPlantillaElemento']?.toString() == idOrigen,
      );
      final contieneDestino = hermanos.any(
        (nodo) => nodo['idEdtPlantillaElemento']?.toString() == idDestino,
      );
      if (contieneOrigen && contieneDestino) return true;
      for (final nodo in hermanos) {
        final hijos = List<Object?>.from(
          nodo['hijos'] as List? ?? const [],
        ).map((hijo) => Map<String, dynamic>.from(hijo as Map)).toList();
        if (buscar(hijos)) return true;
      }
      return false;
    }

    return buscar(_arbolEdt);
  }

  void _moverElementoEdt(String idNodo, int direccion) {
    bool mover(List<Map<String, dynamic>> hermanos) {
      final indice = hermanos.indexWhere(
        (nodo) => nodo['idEdtPlantillaElemento']?.toString() == idNodo,
      );
      if (indice >= 0) {
        final destino = indice + direccion;
        if (destino < 0 || destino >= hermanos.length) return true;
        final temporal = hermanos[indice];
        hermanos[indice] = hermanos[destino];
        hermanos[destino] = temporal;
        return true;
      }
      for (final nodo in hermanos) {
        final hijos = List<Object?>.from(
          nodo['hijos'] as List? ?? const [],
        ).map((hijo) => Map<String, dynamic>.from(hijo as Map)).toList();
        if (mover(hijos)) {
          nodo['hijos'] = hijos;
          return true;
        }
      }
      return false;
    }

    setState(() => mover(_arbolEdt));
  }

  void _moverElementoSobreEdt(String idOrigen, String idDestino) {
    bool intercambiar(List<Map<String, dynamic>> hermanos) {
      final origen = hermanos.indexWhere(
        (nodo) => nodo['idEdtPlantillaElemento']?.toString() == idOrigen,
      );
      final destino = hermanos.indexWhere(
        (nodo) => nodo['idEdtPlantillaElemento']?.toString() == idDestino,
      );
      if (origen >= 0 && destino >= 0) {
        final temporal = hermanos[origen];
        hermanos[origen] = hermanos[destino];
        hermanos[destino] = temporal;
        return true;
      }
      for (final nodo in hermanos) {
        final hijos = List<Object?>.from(
          nodo['hijos'] as List? ?? const [],
        ).map((hijo) => Map<String, dynamic>.from(hijo as Map)).toList();
        if (intercambiar(hijos)) {
          nodo['hijos'] = hijos;
          return true;
        }
      }
      return false;
    }

    setState(() => intercambiar(_arbolEdt));
  }

  Widget _resumen() => Column(
    children: [
      _ResumenCard(
        icon: Icons.people_outline,
        title: 'Datos de la pareja',
        texto:
            'Pareja 1\n${nombres1.text} ${apellido1.text}\nUsuario: ${_usuario1.text}\nDNI: ${dni1.text}\n\nPareja 2\n${nombres2.text} ${apellido2.text}\nUsuario: ${_usuario2.text}\nDNI: ${dni2.text}',
        onEdit: () => setState(() => _paso = 1),
      ),
      const SizedBox(height: 12),
      _ResumenCard(
        icon: Icons.favorite_outline,
        title: 'Datos del matrimonio',
        contenido: _resumenDatosMatrimonio(),
        onEdit: () => setState(() => _paso = 2),
      ),
      const SizedBox(height: 12),
      _ResumenCard(
        icon: Icons.lightbulb_outline,
        title: 'Objetivos y necesidades',
        contenido: _resumenObjetivosNecesidades(),
        onEdit: () => setState(() => _paso = 3),
      ),
      const SizedBox(height: 12),
      _ResumenCard(
        icon: Icons.account_tree_outlined,
        title: 'EDT',
        contenido: _resumenEdt(),
        onEdit: () => setState(() => _paso = 4),
      ),
    ],
  );

  Widget _resumenDatosMatrimonio() => Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      Text('Fecha: ${fecha.text}'),
      Text(
        'Presupuesto: ${_moneda == 'DOLARES' ? 'US\$' : 'S/.'} ${presupuesto.text}',
      ),
      Text('Invitados: $_invitados'),
      Text('Lugar: $_lugarResumen'),
      const SizedBox(height: 12),
      Text(
        'Alcance',
        style: Theme.of(context).textTheme.labelLarge?.copyWith(
          fontWeight: FontWeight.w800,
          color: AppColors.primary,
        ),
      ),
      const SizedBox(height: 6),
      _resumenAlcance(),
    ],
  );

  Widget _resumenEdt() => Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      Text(
        _plantillaEdtSeleccionada?['nombre']?.toString() ??
            'No se seleccionó una plantilla.',
      ),
      const SizedBox(height: 4),
      Text(
        '${_elementosEdtSeleccionados.length + _elementosEdtNuevos.length} elementos incluidos',
        style: Theme.of(
          context,
        ).textTheme.bodySmall?.copyWith(color: AppColors.textSecondary),
      ),
      const SizedBox(height: 8),
      AppButton(
        label: 'Ver',
        icon: Icons.visibility_outlined,
        variant: AppButtonVariant.secondary,
        onPressed: _plantillaEdtSeleccionada == null ? null : _verEdtResumen,
      ),
    ],
  );

  Future<void> _verEdtResumen() async {
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
                  'EDT del matrimonio',
                  style: Theme.of(
                    context,
                  ).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w800),
                ),
                const SizedBox(height: 12),
                Expanded(
                  child: ListView(
                    children: _arbolEdt.map(_nodoVistaEdt).toList(),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _nodoVistaEdt(Map<String, dynamic> nodo, [int nivel = 0]) {
    final id = nodo['idEdtPlantillaElemento']?.toString() ?? '';
    if (!_elementosEdtSeleccionados.contains(id)) {
      return const SizedBox.shrink();
    }
    final elemento = nodo['elemento'] is Map
        ? Map<String, dynamic>.from(nodo['elemento'] as Map)
        : const <String, dynamic>{};
    final hijos = List<Object?>.from(
      nodo['hijos'] as List? ?? const [],
    ).map((hijo) => Map<String, dynamic>.from(hijo as Map));
    return Column(
      children: [
        ListTile(
          dense: true,
          contentPadding: EdgeInsets.only(left: nivel * 18.0),
          leading: Icon(
            nivel == 0
                ? Icons.account_tree_outlined
                : Icons.subdirectory_arrow_right,
            color: AppColors.primary,
          ),
          title: Text(elemento['nombre']?.toString() ?? 'Elemento EDT'),
        ),
        ...hijos.map((hijo) => _nodoVistaEdt(hijo, nivel + 1)),
      ],
    );
  }

  Widget _resumenAlcance() => FutureBuilder<List<Map<String, dynamic>>>(
    future: _categoriasServicio,
    builder: (context, snapshot) {
      final categorias = snapshot.data ?? const <Map<String, dynamic>>[];
      final nombres = _alcanceCodigos.map((codigo) {
        final categoria = categorias.cast<Map<String, dynamic>>().where(
          (item) => item['codigo']?.toString() == codigo,
        );
        return categoria.isEmpty
            ? codigo
            : categoria.first['nombre']?.toString() ?? codigo;
      }).toList();
      if (nombres.isEmpty) {
        return Text(
          'No se definieron servicios.',
          style: Theme.of(
            context,
          ).textTheme.bodySmall?.copyWith(color: AppColors.textSecondary),
        );
      }
      return Wrap(
        spacing: 6,
        runSpacing: 6,
        children: nombres
            .map(
              (nombre) => Chip(
                avatar: const Icon(Icons.check_circle_outline, size: 16),
                label: Text(nombre),
                visualDensity: VisualDensity.compact,
              ),
            )
            .toList(),
      );
    },
  );

  Widget _resumenObjetivosNecesidades() => Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      _seccionResumen('Objetivos', _objetivosItems),
      _seccionResumen('Necesidades', _necesidadesItems),
      _seccionResumen('Restricciones', _restriccionesItems),
      _seccionResumen('Supuestos', _supuestosItems),
      _seccionResumen('Ideas para el moonboard', _moonboardItems),
    ],
  );

  Widget _seccionResumen(String titulo, List<String> items) => Padding(
    padding: const EdgeInsets.only(bottom: 12),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          titulo,
          style: Theme.of(context).textTheme.labelLarge?.copyWith(
            fontWeight: FontWeight.w800,
            color: AppColors.primary,
          ),
        ),
        const SizedBox(height: 4),
        if (items.isEmpty)
          Text(
            'Sin elementos registrados.',
            style: Theme.of(context).textTheme.bodySmall?.copyWith(
              color: AppColors.textSecondary,
              fontStyle: FontStyle.italic,
            ),
          )
        else
          ...items.map(
            (item) => Padding(
              padding: const EdgeInsets.only(bottom: 3),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Padding(
                    padding: EdgeInsets.only(top: 5),
                    child: Icon(
                      Icons.circle,
                      size: 6,
                      color: AppColors.primary,
                    ),
                  ),
                  const SizedBox(width: 8),
                  Expanded(child: Text(item)),
                ],
              ),
            ),
          ),
      ],
    ),
  );
}

class _InicioProyecto extends StatelessWidget {
  const _InicioProyecto();
  @override
  Widget build(BuildContext context) => Scaffold(
    backgroundColor: const Color(0xFFFDFBFF),
    body: SafeArea(
      child: Center(
        child: Padding(
          padding: const EdgeInsets.all(32),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text(
                'Inicio de proyecto',
                style: TextStyle(fontSize: 28, fontWeight: FontWeight.w800),
              ),
              const SizedBox(height: 28),
              Image.asset(
                'assets/images/logoWP.webp',
                height: 112,
                fit: BoxFit.contain,
              ),
              const SizedBox(height: 28),
              const Text(
                'Comienza la planificacion',
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.w700),
              ),
              const SizedBox(height: 12),
              const Text(
                'En esta fase se registran los datos basicos del matrimonio para iniciar la planificacion del proyecto',
                textAlign: TextAlign.center,
              ),
            ],
          ),
        ),
      ),
    ),
  );
}

class _NodoPasoEdt {
  const _NodoPasoEdt({
    required this.idElementoOrigen,
    required this.nombre,
    required this.nivel,
  });

  final String idElementoOrigen;
  final String nombre;
  final int nivel;
}

class _EdtPasoVacio extends StatelessWidget {
  const _EdtPasoVacio();

  @override
  Widget build(BuildContext context) => Container(
    width: double.infinity,
    padding: const EdgeInsets.all(20),
    decoration: BoxDecoration(
      color: const Color(0xFFF4F0FB),
      borderRadius: BorderRadius.circular(12),
    ),
    child: const Column(
      children: [
        Icon(Icons.account_tree_outlined, size: 32, color: AppColors.primary),
        SizedBox(height: 8),
        Text('No hay plantillas EDT disponibles.'),
      ],
    ),
  );
}

class _IndicadorPasos extends StatelessWidget {
  const _IndicadorPasos({
    required this.actual,
    required this.total,
    required this.onPasoSeleccionado,
  });

  final int actual;
  final int total;
  final ValueChanged<int> onPasoSeleccionado;

  @override
  Widget build(BuildContext context) => Center(
    child: ConstrainedBox(
      constraints: const BoxConstraints(maxWidth: 440),
      child: Row(
        children: List.generate(total, (i) {
          final n = i + 1;
          final activo = n <= actual;
          return [
            InkWell(
              borderRadius: BorderRadius.circular(24),
              onTap: () => onPasoSeleccionado(n),
              child: CircleAvatar(
                radius: 15,
                backgroundColor: activo
                    ? AppColors.primary
                    : AppColors.disabledBackground,
                foregroundColor: activo
                    ? Colors.white
                    : AppColors.textSecondary,
                child: Text('$n'),
              ),
            ),
            if (n < total)
              Expanded(
                child: Container(
                  height: 2,
                  color: n < actual ? AppColors.primary : AppColors.border,
                ),
              ),
          ];
        }).expand((widgets) => widgets).toList(),
      ),
    ),
  );
}

class _Informacion extends StatelessWidget {
  const _Informacion({this.practica, this.practicas});

  final Future<Map<String, dynamic>?>? practica;
  final Future<List<Map<String, dynamic>?>>? practicas;

  @override
  Widget build(BuildContext context) {
    if (practicas != null) {
      return FutureBuilder<List<Map<String, dynamic>?>>(
        future: practicas,
        builder: (context, snapshot) {
          final detalles = (snapshot.data ?? const <Map<String, dynamic>?>[])
              .map(_aplicacionMatrimonios)
              .whereType<String>()
              .where((detalle) => detalle.trim().isNotEmpty)
              .toList();
          if (detalles.isEmpty) {
            return const AppInformationCard(texto: 'Informacion');
          }
          return AppInformationCard(
            texto: detalles.first,
            detalle: detalles.join('\n\n'),
            etiquetaDetalle: 'Ver recomendaciones completas',
          );
        },
      );
    }
    if (practica == null) {
      return const AppInformationCard(texto: 'Informacion');
    }
    return FutureBuilder<Map<String, dynamic>?>(
      future: practica,
      builder: (context, snapshot) {
        final data = snapshot.data;
        final detalle = _aplicacionMatrimonios(data);
        if (detalle == null || detalle.trim().isEmpty) {
          return const AppInformationCard(texto: 'Informacion');
        }
        return AppInformationCard(
          texto: detalle,
          detalle: detalle,
          etiquetaDetalle: 'Ver recomendacion completa',
        );
      },
    );
  }

  static String? _aplicacionMatrimonios(Map<String, dynamic>? practica) =>
      practica?['aplicacionMatrimonios']?.toString() ??
      practica?['aplicacion_matrimonios']?.toString();
}

class _TipoCeremoniaOpcion {
  const _TipoCeremoniaOpcion({required this.id, required this.nombre});
  final int id;
  final String nombre;
}

class _SelectorAlcanceSheet extends StatefulWidget {
  const _SelectorAlcanceSheet({
    required this.categorias,
    required this.seleccionInicial,
  });

  final List<Map<String, dynamic>> categorias;
  final Set<String> seleccionInicial;

  @override
  State<_SelectorAlcanceSheet> createState() => _SelectorAlcanceSheetState();
}

class _SelectorAlcanceSheetState extends State<_SelectorAlcanceSheet> {
  late final Set<String> _seleccion = Set<String>.from(widget.seleccionInicial);

  @override
  Widget build(BuildContext context) {
    final codigos = widget.categorias
        .map((categoria) => categoria['codigo']?.toString())
        .whereType<String>()
        .where((codigo) => codigo.isNotEmpty)
        .toSet();
    final todosSeleccionados =
        codigos.isNotEmpty && codigos.every(_seleccion.contains);

    return SafeArea(
      child: SizedBox(
        height: MediaQuery.sizeOf(context).height * .72,
        child: Padding(
          padding: const EdgeInsets.fromLTRB(20, 4, 20, 20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Alcance del proyecto',
                style: Theme.of(context).textTheme.titleMedium,
              ),
              const SizedBox(height: 4),
              Text(
                'Selecciona los servicios que estarán incluidos.',
                style: Theme.of(context).textTheme.bodyMedium,
              ),
              Align(
                alignment: Alignment.centerRight,
                child: TextButton.icon(
                  onPressed: codigos.isEmpty
                      ? null
                      : () => setState(() {
                          if (todosSeleccionados) {
                            _seleccion.removeAll(codigos);
                          } else {
                            _seleccion.addAll(codigos);
                          }
                        }),
                  icon: Icon(
                    todosSeleccionados
                        ? Icons.deselect_outlined
                        : Icons.select_all_outlined,
                    size: 18,
                  ),
                  label: Text(
                    todosSeleccionados
                        ? 'Limpiar selección'
                        : 'Seleccionar todos',
                  ),
                ),
              ),
              Expanded(
                child: widget.categorias.isEmpty
                    ? const Center(
                        child: Text(
                          'No hay categorías de servicio disponibles.',
                        ),
                      )
                    : ListView.separated(
                        itemCount: widget.categorias.length,
                        separatorBuilder: (_, _) => const Divider(height: 1),
                        itemBuilder: (_, index) {
                          final categoria = widget.categorias[index];
                          final codigo = categoria['codigo']?.toString();
                          if (codigo == null || codigo.isEmpty) {
                            return const SizedBox.shrink();
                          }
                          return AppCheckbox(
                            label: categoria['nombre']?.toString() ?? codigo,
                            value: _seleccion.contains(codigo),
                            onChanged: (marcado) => setState(() {
                              if (marcado) {
                                _seleccion.add(codigo);
                              } else {
                                _seleccion.remove(codigo);
                              }
                            }),
                          );
                        },
                      ),
              ),
              const SizedBox(height: 12),
              Row(
                children: [
                  Expanded(
                    child: AppButton(
                      label: 'Cancelar',
                      variant: AppButtonVariant.secondary,
                      onPressed: () => Navigator.of(context).pop(),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: AppButton(
                      label: 'Confirmar',
                      onPressed: () => Navigator.of(context).pop(_seleccion),
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

class _ResumenCard extends StatelessWidget {
  const _ResumenCard({
    required this.icon,
    required this.title,
    this.texto,
    this.contenido,
    required this.onEdit,
  }) : assert(texto != null || contenido != null);
  final IconData icon;
  final String title;
  final String? texto;
  final Widget? contenido;
  final VoidCallback onEdit;
  @override
  Widget build(BuildContext context) => Card(
    child: Padding(
      padding: const EdgeInsets.all(16),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          CircleAvatar(
            backgroundColor: const Color(0xFFE9E2F7),
            foregroundColor: AppColors.primary,
            child: Icon(icon),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(fontWeight: FontWeight.w800),
                ),
                const SizedBox(height: 8),
                contenido ??
                    (title == 'Datos de la pareja'
                        ? _DetalleParejas(texto: texto!)
                        : Text(texto!)),
              ],
            ),
          ),
          IconButton(
            onPressed: onEdit,
            icon: const Icon(Icons.edit_outlined),
            tooltip: 'Editar',
          ),
        ],
      ),
    ),
  );
}

class _DetalleParejas extends StatelessWidget {
  const _DetalleParejas({required this.texto});

  final String texto;

  @override
  Widget build(BuildContext context) {
    final parejas = texto.split('\n\n');
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: parejas
          .map(
            (pareja) => Padding(
              padding: const EdgeInsets.only(bottom: 10),
              child: _DetallePareja(texto: pareja),
            ),
          )
          .toList(),
    );
  }
}

class _DetallePareja extends StatelessWidget {
  const _DetallePareja({required this.texto});

  final String texto;

  @override
  Widget build(BuildContext context) {
    final lineas = texto.split('\n');
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          lineas.isEmpty ? '' : lineas.first,
          style: Theme.of(context).textTheme.labelMedium?.copyWith(
            color: AppColors.primary,
            fontWeight: FontWeight.w700,
          ),
        ),
        if (lineas.length > 1)
          Text(
            lineas[1],
            style: Theme.of(
              context,
            ).textTheme.bodyLarge?.copyWith(fontWeight: FontWeight.w700),
          ),
        ...lineas.skip(2).map((linea) => Text(linea)),
      ],
    );
  }
}
