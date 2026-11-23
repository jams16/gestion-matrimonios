import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../app/theme/app_colors.dart';
import '../../../core/widgets/containers/app_card.dart';
import '../../../core/widgets/feedback/app_snackbar.dart';
import '../application/riesgos_provider.dart';

class RiesgosPage extends ConsumerStatefulWidget {
  const RiesgosPage({super.key, required this.idProyecto});
  final String idProyecto;

  @override
  ConsumerState<RiesgosPage> createState() => _RiesgosPageState();
}

class _RiesgosPageState extends ConsumerState<RiesgosPage> {
  int _vista = 0;

  void _actualizar() {
    ref.invalidate(riesgosProvider(widget.idProyecto));
    ref.invalidate(catalogoRiesgoProvider(widget.idProyecto));
    ref.invalidate(matrizRiesgoProvider(widget.idProyecto));
  }

  Future<void> _abrirCatalogo() async {
    try {
      final resultados = await Future.wait([
        ref.read(catalogoRiesgoProvider(widget.idProyecto).future),
        ref.read(riesgosProvider(widget.idProyecto).future),
      ]);
      final agregados = resultados[1]
          .map((riesgo) => (riesgo['idPlantillaRiesgo'] as num?)?.toInt())
          .whereType<int>()
          .toSet();
      final nombresAgregados = resultados[1]
          .map((riesgo) => riesgo['nombre']?.toString().trim().toLowerCase())
          .whereType<String>()
          .toSet();
      final catalogo = resultados[0]
          .where(
            (plantilla) =>
                !agregados.contains(
                  (plantilla['idPlantillaRiesgo'] as num?)?.toInt(),
                ) &&
                !nombresAgregados.contains(
                  plantilla['nombre']?.toString().trim().toLowerCase(),
                ),
          )
          .toList();
      if (!mounted) return;
      await showModalBottomSheet<void>(
        context: context,
        isScrollControlled: true,
        showDragHandle: true,
        shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(28))),
        builder: (context) => _CatalogoSheet(
          catalogo: catalogo,
          seleccionar: (plantilla) {
            Navigator.pop(context);
            _evaluarCatalogo(plantilla);
          },
        ),
      );
    } catch (error) {
      _notificarError(error);
    }
  }

  Future<void> _evaluarCatalogo(Map<String, dynamic> plantilla) async {
    final valores = await _dialogoEvaluacion(
      titulo: 'Agregar riesgo',
      nombre: plantilla['nombre']?.toString() ?? 'Riesgo',
      codigo: plantilla['codigo']?.toString(),
    );
    if (valores == null) return;
    try {
      await ref.read(riesgosApiProvider).incorporar(
            widget.idProyecto,
            (plantilla['idPlantillaRiesgo'] as num).toInt(),
            probabilidad: valores.$1,
            impacto: valores.$2,
          );
      _actualizar();
      _notificar('Riesgo agregado al matrimonio.', AppSnackbarType.success);
    } catch (error) {
      _notificarError(error);
    }
  }

  Future<void> _editar(Map<String, dynamic> riesgo) async {
    final valores = await _dialogoEvaluacion(
      titulo: 'Actualizar evaluación',
      nombre: riesgo['nombre']?.toString() ?? 'Riesgo',
      codigo: riesgo['codigo']?.toString(),
      probabilidad: (riesgo['probabilidad'] as num?)?.toInt() ?? 3,
      impacto: (riesgo['impacto'] as num?)?.toInt() ?? 3,
    );
    if (valores == null) return;
    try {
      await ref.read(riesgosApiProvider).actualizar(widget.idProyecto, riesgo['idRiesgo'].toString(), {
        'probabilidad': valores.$1,
        'impacto': valores.$2,
      });
      _actualizar();
      _notificar('Evaluación actualizada.', AppSnackbarType.success);
    } catch (error) {
      _notificarError(error);
    }
  }

  Future<(int, int)?> _dialogoEvaluacion({
    required String titulo,
    required String nombre,
    String? codigo,
    int probabilidad = 3,
    int impacto = 3,
  }) async {
    var p = probabilidad;
    var i = impacto;
    final aceptar = await showDialog<bool>(
      context: context,
      builder: (dialog) => StatefulBuilder(
        builder: (context, cambiar) => AlertDialog(
          title: Text(titulo),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                if (codigo != null) Text(codigo, style: const TextStyle(color: AppColors.primary, fontWeight: FontWeight.w800)),
                Text(nombre, style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800)),
                const SizedBox(height: 20),
                _SelectorNivel(titulo: 'Probabilidad', valor: p, onChanged: (v) => cambiar(() => p = v)),
                const SizedBox(height: 16),
                _SelectorNivel(titulo: 'Impacto', valor: i, onChanged: (v) => cambiar(() => i = v)),
                const SizedBox(height: 16),
                _SeveridadResumen(probabilidad: p, impacto: i),
              ],
            ),
          ),
          actions: [
            TextButton(onPressed: () => Navigator.pop(dialog, false), child: const Text('Cancelar')),
            FilledButton(onPressed: () => Navigator.pop(dialog, true), child: Text(titulo == 'Agregar riesgo' ? 'Agregar' : 'Guardar')),
          ],
        ),
      ),
    );
    return aceptar == true ? (p, i) : null;
  }

  Future<void> _quitar(Map<String, dynamic> riesgo) async {
    final confirmar = await showDialog<bool>(
      context: context,
      builder: (dialog) => AlertDialog(
        title: const Text('Quitar riesgo'),
        content: Text('¿Quitar “${riesgo['nombre'] ?? 'este riesgo'}” del matrimonio?'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(dialog, false), child: const Text('Cancelar')),
          FilledButton(
            style: FilledButton.styleFrom(backgroundColor: AppColors.error),
            onPressed: () => Navigator.pop(dialog, true),
            child: const Text('Quitar'),
          ),
        ],
      ),
    );
    if (confirmar != true) return;
    try {
      await ref.read(riesgosApiProvider).eliminar(widget.idProyecto, riesgo['idRiesgo'].toString());
      _actualizar();
      _notificar('Riesgo quitado del matrimonio.', AppSnackbarType.success);
    } catch (error) {
      _notificarError(error);
    }
  }

  void _notificar(String mensaje, AppSnackbarType tipo) {
    if (mounted) AppSnackbar.show(context, message: mensaje, type: tipo);
  }

  void _notificarError(Object error) => _notificar(_error(error), AppSnackbarType.error);

  @override
  Widget build(BuildContext context) => Scaffold(
        backgroundColor: AppColors.surface,
        floatingActionButton: _vista == 0
            ? FloatingActionButton.extended(
                heroTag: 'agregar-riesgo',
                onPressed: _abrirCatalogo,
                icon: const Icon(Icons.add_alert_outlined),
                label: const Text('Agregar'),
              )
            : null,
        body: Column(
          children: [
            Padding(
              padding: const EdgeInsets.fromLTRB(16, 14, 16, 0),
              child: Row(children: [Text('Riesgos', style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w800)), const Spacer(), IconButton(tooltip: 'Actualizar', onPressed: _actualizar, icon: const Icon(Icons.refresh))]),
            ),
            Padding(
              padding: const EdgeInsets.all(16),
              child: SegmentedButton<int>(
                segments: const [
                  ButtonSegment(value: 0, icon: Icon(Icons.warning_amber_outlined), label: Text('Riesgos')),
                  ButtonSegment(value: 1, icon: Icon(Icons.grid_view_outlined), label: Text('Mapa de calor')),
                ],
                selected: {_vista},
                showSelectedIcon: false,
                onSelectionChanged: (valor) => setState(() => _vista = valor.first),
              ),
            ),
            const Divider(height: 1, color: Color(0xFF29252F)),
            Expanded(child: AnimatedSwitcher(duration: const Duration(milliseconds: 180), child: _vista == 0 ? _misRiesgos() : _mapaCalor())),
          ],
        ),
      );

  Widget _misRiesgos() {
    final riesgos = ref.watch(riesgosProvider(widget.idProyecto));
    return riesgos.when(
      loading: () => const Center(child: CircularProgressIndicator()),
      error: (error, _) => _EstadoError(mensaje: _error(error), reintentar: _actualizar),
      data: (items) => RefreshIndicator(
        onRefresh: () async => _actualizar(),
        child: ListView(
          key: const ValueKey('riesgos'),
          padding: const EdgeInsets.fromLTRB(16, 16, 16, 104),
          children: [
            Text('Mis riesgos', style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800)),
            const SizedBox(height: 4),
            const Text('Riesgos del catálogo que aplican a este matrimonio.'),
            const SizedBox(height: 16),
            if (items.isEmpty) _EstadoVacio(onAgregar: _abrirCatalogo),
            ...items.map((riesgo) => Padding(padding: const EdgeInsets.only(bottom: 12), child: _RiesgoCard(riesgo: riesgo, ver: () => context.go('/gestion/riesgos/${riesgo['idRiesgo']}', extra: riesgo), editar: () => _editar(riesgo), quitar: () => _quitar(riesgo)))),
          ],
        ),
      ),
    );
  }

  Widget _mapaCalor() {
    final matriz = ref.watch(matrizRiesgoProvider(widget.idProyecto));
    return matriz.when(
      loading: () => const Center(child: CircularProgressIndicator()),
      error: (error, _) => _EstadoError(mensaje: _error(error), reintentar: _actualizar),
      data: (riesgos) => SingleChildScrollView(
        key: const ValueKey('mapa'),
        padding: const EdgeInsets.all(16),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text('Mapa de calor', style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800)),
          const SizedBox(height: 4),
          const Text('Los códigos se ubican según su probabilidad e impacto.'),
          const SizedBox(height: 16),
          _MapaCalor(riesgos: riesgos),
          const SizedBox(height: 12),
          const Wrap(spacing: 10, runSpacing: 8, children: [_Chip(texto: 'Baja ≤ 0.05', color: AppColors.success), _Chip(texto: 'Media ≥ 0.05', color: AppColors.warning), _Chip(texto: 'Alta ≥ 0.18', color: AppColors.error)]),
        ]),
      ),
    );
  }
}

class _CatalogoSheet extends StatefulWidget {
  const _CatalogoSheet({required this.catalogo, required this.seleccionar});
  final List<Map<String, dynamic>> catalogo;
  final ValueChanged<Map<String, dynamic>> seleccionar;
  @override
  State<_CatalogoSheet> createState() => _CatalogoSheetState();
}

class _CatalogoSheetState extends State<_CatalogoSheet> {
  String buscar = '';
  @override
  Widget build(BuildContext context) {
    final items = widget.catalogo.where((item) => '${item['codigo'] ?? ''} ${item['nombre'] ?? ''} ${item['descripcion'] ?? ''}'.toLowerCase().contains(buscar.toLowerCase())).toList();
    return SafeArea(child: DraggableScrollableSheet(
      expand: false,
      initialChildSize: .82,
      maxChildSize: .94,
      minChildSize: .5,
      builder: (context, scroll) => Padding(
        padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text('Catálogo de riesgos', style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w800)),
          const SizedBox(height: 4), const Text('Selecciona un riesgo para evaluarlo y agregarlo al matrimonio.'), const SizedBox(height: 16),
          TextField(onChanged: (valor) => setState(() => buscar = valor), decoration: const InputDecoration(prefixIcon: Icon(Icons.search), hintText: 'Buscar riesgo')),
          const SizedBox(height: 12),
          Expanded(child: items.isEmpty ? const Center(child: Text('NO HAY riesgos disponibles.')) : ListView.separated(controller: scroll, itemCount: items.length, separatorBuilder: (_, __) => const SizedBox(height: 8), itemBuilder: (context, indice) {
            final item = items[indice];
            return AppCard(onTap: () => widget.seleccionar(item), child: Row(children: [const Icon(Icons.library_add_outlined, color: AppColors.primary), const SizedBox(width: 12), Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [Text(item['codigo']?.toString() ?? 'CAT', style: const TextStyle(color: AppColors.primary, fontWeight: FontWeight.w800)), const SizedBox(height: 4), Text(item['nombre']?.toString() ?? 'Riesgo', style: const TextStyle(fontWeight: FontWeight.w800)), if ((item['descripcion']?.toString().isNotEmpty ?? false)) Text(item['descripcion'].toString(), maxLines: 2, overflow: TextOverflow.ellipsis)])), const Icon(Icons.chevron_right)]));
          })),
        ]),
      ),
    ));
  }
}

class _RiesgoCard extends StatelessWidget {
  const _RiesgoCard({required this.riesgo, required this.ver, required this.editar, required this.quitar});
  final Map<String, dynamic> riesgo;
  final VoidCallback ver;
  final VoidCallback editar;
  final VoidCallback quitar;
  @override
  Widget build(BuildContext context) {
    final p = (riesgo['probabilidad'] as num?)?.toInt() ?? 1;
    final i = (riesgo['impacto'] as num?)?.toInt() ?? 1;
    final severidad = riesgo['severidad']?.toString() ?? _severidad(p, i);
    final color = _color(severidad);
    return AppCard(elevated: true, borderColor: color.withValues(alpha: .3), onTap: ver, child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Container(width: 44, height: 44, decoration: BoxDecoration(color: color.withValues(alpha: .14), shape: BoxShape.circle), child: Icon(Icons.warning_amber_rounded, color: color)), const SizedBox(width: 12),
      Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Row(children: [if (riesgo['codigo'] != null) Padding(padding: const EdgeInsets.only(right: 8), child: Text(riesgo['codigo'].toString(), style: const TextStyle(color: AppColors.primary, fontSize: 12, fontWeight: FontWeight.w800))), Expanded(child: Text(riesgo['nombre']?.toString() ?? 'Riesgo', style: const TextStyle(fontWeight: FontWeight.w800)))]),
        if ((riesgo['descripcion']?.toString().isNotEmpty ?? false)) Padding(padding: const EdgeInsets.only(top: 4), child: Text(riesgo['descripcion'].toString(), maxLines: 2, overflow: TextOverflow.ellipsis)),
        const SizedBox(height: 12), Wrap(spacing: 8, runSpacing: 8, children: [_Chip(texto: 'P ${_nivel(p)}', color: AppColors.primary), _Chip(texto: 'I ${_nivel(i)}', color: AppColors.secondary), _Chip(texto: '${severidad[0]}${severidad.substring(1).toLowerCase()}', color: color)]),
      ])),
      PopupMenuButton<String>(onSelected: (valor) => valor == 'editar' ? editar() : quitar(), itemBuilder: (_) => const [PopupMenuItem(value: 'editar', child: Text('Actualizar evaluación')), PopupMenuItem(value: 'quitar', child: Text('Quitar del matrimonio', style: TextStyle(color: AppColors.error)))])
    ]));
  }
}

class _SelectorNivel extends StatelessWidget {
  const _SelectorNivel({required this.titulo, required this.valor, required this.onChanged});
  final String titulo; final int valor; final ValueChanged<int> onChanged;
  @override
  Widget build(BuildContext context) => Column(crossAxisAlignment: CrossAxisAlignment.start, children: [Text('$titulo: ${_nivel(valor)} (${_valor(valor).toStringAsFixed(1)})', style: const TextStyle(fontWeight: FontWeight.w700)), const SizedBox(height: 8), SegmentedButton<int>(segments: List.generate(5, (indice) => ButtonSegment(value: indice + 1, label: Text('${indice + 1}'))), selected: {valor}, showSelectedIcon: false, onSelectionChanged: (seleccion) => onChanged(seleccion.first))]);
}

class _SeveridadResumen extends StatelessWidget {
  const _SeveridadResumen({required this.probabilidad, required this.impacto});
  final int probabilidad; final int impacto;
  @override
  Widget build(BuildContext context) { final resultado = _valor(probabilidad) * _valor(impacto); final severidad = _severidad(probabilidad, impacto); final color = _color(severidad); return Container(width: double.infinity, padding: const EdgeInsets.all(12), decoration: BoxDecoration(color: color.withValues(alpha: .12), borderRadius: BorderRadius.circular(12)), child: Text('Severidad automática: ${resultado.toStringAsFixed(2)} · ${severidad[0]}${severidad.substring(1).toLowerCase()}', style: TextStyle(color: color, fontWeight: FontWeight.w800))); }
}

class _MapaCalor extends StatelessWidget {
  const _MapaCalor({required this.riesgos}); final List<Map<String, dynamic>> riesgos;
  @override
  Widget build(BuildContext context) => AppCard(padding: const EdgeInsets.all(10), child: Column(children: [
    const Align(alignment: Alignment.centerRight, child: Text('Probabilidad →', style: TextStyle(fontWeight: FontWeight.w700))),
    for (var impacto = 5; impacto >= 1; impacto--) Row(children: [SizedBox(width: 24, child: Text('$impacto', textAlign: TextAlign.center, style: const TextStyle(fontWeight: FontWeight.w700))), ...List.generate(5, (indice) { final probabilidad = indice + 1; final items = riesgos.where((r) => (r['probabilidad'] as num?)?.toInt() == probabilidad && (r['impacto'] as num?)?.toInt() == impacto).toList(); final color = _color(_severidad(probabilidad, impacto)); return Expanded(child: Container(constraints: const BoxConstraints(minHeight: 52), margin: const EdgeInsets.all(1.5), padding: const EdgeInsets.all(3), decoration: BoxDecoration(color: color.withValues(alpha: .18), borderRadius: BorderRadius.circular(7)), child: Wrap(alignment: WrapAlignment.center, children: items.map((r) => Text(r['codigo']?.toString() ?? 'R', style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w800))).toList()))); })]),
    const Align(alignment: Alignment.centerLeft, child: Text('Impacto ↑', style: TextStyle(fontWeight: FontWeight.w700))),
  ]));
}

class _Chip extends StatelessWidget { const _Chip({required this.texto, required this.color}); final String texto; final Color color; @override Widget build(BuildContext context) => Container(padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4), decoration: BoxDecoration(color: color.withValues(alpha: .12), borderRadius: BorderRadius.circular(20)), child: Text(texto, style: TextStyle(fontSize: 12, color: color, fontWeight: FontWeight.w700))); }
class _EstadoVacio extends StatelessWidget { const _EstadoVacio({required this.onAgregar}); final VoidCallback onAgregar; @override Widget build(BuildContext context) => AppCard(elevated: true, child: Column(children: [const Icon(Icons.shield_outlined, size: 42, color: AppColors.primary), const SizedBox(height: 12), const Text('Aún no agregaste riesgos', style: TextStyle(fontWeight: FontWeight.w800)), const SizedBox(height: 4), const Text('Elige un riesgo del catálogo y evalúalo.', textAlign: TextAlign.center), const SizedBox(height: 16), OutlinedButton.icon(onPressed: onAgregar, icon: const Icon(Icons.library_add_outlined), label: const Text('Explorar catálogo'))])); }
class _EstadoError extends StatelessWidget { const _EstadoError({required this.mensaje, required this.reintentar}); final String mensaje; final VoidCallback reintentar; @override Widget build(BuildContext context) => Center(child: Column(mainAxisSize: MainAxisSize.min, children: [Text(mensaje, textAlign: TextAlign.center), const SizedBox(height: 12), OutlinedButton.icon(onPressed: reintentar, icon: const Icon(Icons.refresh), label: const Text('Reintentar'))])); }

double _valor(int nivel) => const [0.1, 0.3, 0.5, 0.7, 0.9][nivel - 1];
String _nivel(int nivel) => const ['Muy baja', 'Baja', 'Media', 'Alta', 'Muy alta'][nivel - 1];
String _severidad(int p, int i) { final valor = _valor(p) * _valor(i); return valor >= .18 ? 'ALTO' : valor >= .05 ? 'MEDIO' : 'BAJO'; }
Color _color(String severidad) => switch (severidad) {'ALTO' => AppColors.error, 'MEDIO' => AppColors.warning, _ => AppColors.success};
String _error(Object error) => error.toString().replaceFirst('Exception: ', '');

class DetalleRiesgoPage extends ConsumerStatefulWidget {
  const DetalleRiesgoPage({super.key, required this.idProyecto, required this.riesgo});
  final String idProyecto; final Map<String, dynamic> riesgo;
  @override ConsumerState<DetalleRiesgoPage> createState() => _DetalleRiesgoPageState();
}
class _DetalleRiesgoPageState extends ConsumerState<DetalleRiesgoPage> {
  int tab = 0; late Future<List<Map<String,dynamic>>> planes;
  @override void initState(){super.initState(); planes=ref.read(riesgosApiProvider).planes(widget.idProyecto,widget.riesgo['idRiesgo'].toString());}
  void recargar()=>setState(() => planes=ref.read(riesgosApiProvider).planes(widget.idProyecto,widget.riesgo['idRiesgo'].toString()));
  Future<void> agregar() async { final texto=TextEditingController(); var alternativa='PLAN_A'; final ok=await showDialog<bool>(context: context,builder:(d)=>StatefulBuilder(builder:(c,set)=>AlertDialog(title:const Text('Agregar plan de respuesta'),content:Column(mainAxisSize:MainAxisSize.min,children:[SegmentedButton<String>(segments:const [ButtonSegment(value:'PLAN_A',label:Text('Plan A')),ButtonSegment(value:'PLAN_B',label:Text('Plan B')),ButtonSegment(value:'PLAN_C',label:Text('Plan C'))],selected:{alternativa},onSelectionChanged:(v)=>set(()=>alternativa=v.first)),const SizedBox(height:16),TextField(controller:texto,maxLines:3,decoration:const InputDecoration(labelText:'Acción o plan de contingencia'))]),actions:[TextButton(onPressed:()=>Navigator.pop(d,false),child:const Text('Cancelar')),FilledButton(onPressed:()=>Navigator.pop(d,true),child:const Text('Agregar'))]))); if(ok!=true||texto.text.trim().isEmpty)return; await ref.read(riesgosApiProvider).crearPlan(widget.idProyecto,widget.riesgo['idRiesgo'].toString(),{'alternativa':alternativa,'accion':texto.text.trim()});recargar();}
  @override Widget build(BuildContext context)=>Scaffold(floatingActionButton:FloatingActionButton.extended(onPressed:agregar,icon:const Icon(Icons.add),label:const Text('Agregar plan')),body:Column(children:[Padding(padding:const EdgeInsets.all(16),child:Row(children:[IconButton(onPressed:()=>context.go('/gestion/riesgos'),icon:const Icon(Icons.arrow_back)),Expanded(child:Text(widget.riesgo['nombre']?.toString()??'Riesgo',style:Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight:FontWeight.w800)))])),Padding(padding:const EdgeInsets.symmetric(horizontal:16),child:SegmentedButton<int>(segments:const [ButtonSegment(value:0,label:Text('Contingencia'),icon:Icon(Icons.shield_outlined)),ButtonSegment(value:1,label:Text('Respuesta'),icon:Icon(Icons.alt_route_outlined))],selected:{tab},onSelectionChanged:(v)=>setState(()=>tab=v.first))),const SizedBox(height:12),Expanded(child:FutureBuilder<List<Map<String,dynamic>>>(future:planes,builder:(c,s){if(!s.hasData)return const Center(child:CircularProgressIndicator());final datos=s.data!;return ListView(padding:const EdgeInsets.fromLTRB(16,8,16,100),children:[if(datos.isEmpty)const Center(child:Padding(padding:EdgeInsets.all(32),child:Text('NO HAY planes registrados.'))),...datos.where((p)=>tab==0||p['alternativa']!=null).map((p)=>Padding(padding:const EdgeInsets.only(bottom:10),child:AppCard(child:ListTile(leading:CircleAvatar(child:Text(p['alternativa'].toString().replaceAll('PLAN_',''))),title:Text(p['alternativa'].toString().replaceAll('_',' ')),subtitle:Text(p['accion']?.toString()??'')))))]);} ))]));
}
