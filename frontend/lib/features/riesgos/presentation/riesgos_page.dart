import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../app/theme/app_colors.dart';
import '../../../core/widgets/buttons/app_button.dart';
import '../../../core/widgets/containers/app_card.dart';
import '../../../core/widgets/feedback/app_snackbar.dart';
import '../../../core/widgets/inputs/app_text_field.dart';
import '../../../core/widgets/navigation/app_tabs.dart';
import '../application/riesgos_provider.dart';

class RiesgosPage extends ConsumerStatefulWidget {
  const RiesgosPage({super.key, required this.idProyecto});
  final String idProyecto;

  @override
  ConsumerState<RiesgosPage> createState() => _RiesgosPageState();
}

class _RiesgosPageState extends ConsumerState<RiesgosPage>
    with SingleTickerProviderStateMixin {
  late final TabController _tabs;

  @override
  void initState() {
    super.initState();
    _tabs = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _tabs.dispose();
    super.dispose();
  }

  void _refresh() {
    ref.invalidate(riesgosProvider(widget.idProyecto));
    ref.invalidate(catalogoRiesgoProvider(widget.idProyecto));
    ref.invalidate(matrizRiesgoProvider(widget.idProyecto));
  }

  Future<void> _guardarRiesgo([Map<String, dynamic>? existente]) async {
    final categorias = await ref.read(
      categoriasRiesgoProvider(widget.idProyecto).future,
    );
    if (!mounted || categorias.isEmpty) {
      if (mounted) {
        AppSnackbar.show(
          context,
          message: 'NO HAY categorias disponibles.',
          type: AppSnackbarType.info,
        );
      }
      return;
    }
    final previo = existente ?? <String, dynamic>{};
    final nombre = TextEditingController(text: previo['nombre']?.toString());
    final descripcion = TextEditingController(
      text: previo['descripcion']?.toString(),
    );
    int categoria = (previo['idCategoriaRiesgo'] as num?)?.toInt() ??
        (categorias.first['idCategoriaRiesgo'] as num).toInt();
    int probabilidad = (previo['probabilidad'] as num?)?.toInt() ?? 3;
    int impacto = (previo['impacto'] as num?)?.toInt() ?? 3;

    final confirmar = await showDialog<bool>(
      context: context,
      builder: (dialog) => StatefulBuilder(
        builder: (context, setDialogState) => AlertDialog(
          title: Text(existente == null ? 'Registrar riesgo' : 'Editar riesgo'),
          content: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                DropdownButtonFormField<int>(
                  value: categoria,
                  isExpanded: true,
                  decoration: const InputDecoration(labelText: 'Categoria'),
                  items: categorias
                      .map(
                        (item) => DropdownMenuItem<int>(
                          value: (item['idCategoriaRiesgo'] as num).toInt(),
                          child: Text(item['nombre']?.toString() ?? 'Categoria'),
                        ),
                      )
                      .toList(),
                  onChanged: (value) => setDialogState(() => categoria = value!),
                ),
                const SizedBox(height: 12),
                AppTextField(label: 'Nombre', controller: nombre, required: true),
                const SizedBox(height: 12),
                AppTextField(label: 'Descripcion', controller: descripcion, maxLines: 3),
                _slider('Probabilidad', probabilidad, (v) {
                  setDialogState(() => probabilidad = v);
                }),
                _slider('Impacto', impacto, (v) {
                  setDialogState(() => impacto = v);
                }),
                Text(
                  'Severidad: ${_severidad(probabilidad * impacto)}',
                  style: const TextStyle(fontWeight: FontWeight.w700),
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
    if (confirmar != true || nombre.text.trim().isEmpty) return;

    final data = <String, dynamic>{
      'idCategoriaRiesgo': categoria,
      'nombre': nombre.text.trim(),
      'probabilidad': probabilidad,
      'impacto': impacto,
      if (descripcion.text.trim().isNotEmpty)
        'descripcion': descripcion.text.trim(),
    };
    try {
      final api = ref.read(riesgosApiProvider);
      if (existente == null) {
        await api.crear(widget.idProyecto, data);
      } else {
        await api.actualizar(widget.idProyecto, existente['idRiesgo'].toString(), data);
      }
      _refresh();
      if (mounted) {
        AppSnackbar.show(context, message: 'Riesgo guardado.', type: AppSnackbarType.success);
      }
    } catch (error) {
      if (mounted) {
        AppSnackbar.show(context, message: error.toString(), type: AppSnackbarType.error);
      }
    }
  }

  Widget _slider(String label, int value, ValueChanged<int> onChanged) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('$label: $value/5'),
        Slider(
          value: value.toDouble(),
          min: 1,
          max: 5,
          divisions: 4,
          label: '$value',
          onChanged: (v) => onChanged(v.round()),
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFFDFBFF),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => _guardarRiesgo(),
        icon: const Icon(Icons.add_alert_outlined),
        label: const Text('Agregar riesgo'),
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 14, 16, 0),
            child: Row(
              children: [
                Text('Riesgos', style: Theme.of(context).textTheme.titleLarge),
                const Spacer(),
                IconButton(onPressed: _refresh, icon: const Icon(Icons.refresh)),
              ],
            ),
          ),
          AppTabs(
            controller: _tabs,
            tabs: const [
              AppTabItem(label: 'Riesgos', icon: Icons.warning_amber_outlined),
              AppTabItem(label: 'Catalogo', icon: Icons.menu_book_outlined),
              AppTabItem(label: 'Mapa de calor', icon: Icons.grid_view_outlined),
            ],
          ),
          const Divider(height: 1, color: Color(0xFF29252F)),
          Expanded(
            child: TabBarView(
              controller: _tabs,
              children: [_listaRiesgos(), _catalogo(), _matriz()],
            ),
          ),
        ],
      ),
    );
  }

  Widget _listaRiesgos() {
    final riesgos = ref.watch(riesgosProvider(widget.idProyecto));
    return riesgos.when(
      loading: () => const Center(child: CircularProgressIndicator()),
      error: (e, _) => Center(child: Text(e.toString())),
      data: (items) => ListView(
        padding: const EdgeInsets.fromLTRB(16, 16, 16, 100),
        children: [
          if (items.isEmpty) const Center(child: Padding(padding: EdgeInsets.all(32), child: Text('NO HAY riesgos registrados.'))),
          ...items.map((item) => Padding(
            padding: const EdgeInsets.only(bottom: 10),
            child: AppCard(
              onTap: () => _guardarRiesgo(item),
              child: ListTile(
                contentPadding: EdgeInsets.zero,
                leading: CircleAvatar(
                  backgroundColor: _color(item['severidad']?.toString()).withValues(alpha: .16),
                  child: Icon(Icons.warning_amber_rounded, color: _color(item['severidad']?.toString())),
                ),
                title: Text(item['nombre']?.toString() ?? 'Riesgo'),
                subtitle: Text('P ${item['probabilidad']}/5 · I ${item['impacto']}/5 · ${item['severidad']}'),
                trailing: IconButton(
                  icon: const Icon(Icons.delete_outline),
                  onPressed: () async {
                    await ref.read(riesgosApiProvider).eliminar(widget.idProyecto, item['idRiesgo'].toString());
                    _refresh();
                  },
                ),
              ),
            ),
          )),
        ],
      ),
    );
  }

  Widget _catalogo() {
    final catalogo = ref.watch(catalogoRiesgoProvider(widget.idProyecto));
    return catalogo.when(
      loading: () => const Center(child: CircularProgressIndicator()),
      error: (e, _) => Center(child: Text(e.toString())),
      data: (items) => ListView(
        padding: const EdgeInsets.fromLTRB(16, 16, 16, 100),
        children: [
          if (items.isEmpty) const Center(child: Padding(padding: EdgeInsets.all(32), child: Text('NO HAY riesgos en el catalogo.'))),
          ...items.map((item) => AppCard(
            child: ListTile(
              title: Text(item['nombre']?.toString() ?? 'Riesgo'),
              subtitle: Text(item['descripcion']?.toString() ?? ''),
              trailing: IconButton(
                icon: const Icon(Icons.add_circle_outline),
                onPressed: () async {
                  await ref.read(riesgosApiProvider).incorporar(widget.idProyecto, (item['idPlantillaRiesgo'] as num).toInt());
                  _refresh();
                },
              ),
            ),
          )),
        ],
      ),
    );
  }

  Widget _matriz() {
    final matriz = ref.watch(matrizRiesgoProvider(widget.idProyecto));
    return matriz.when(
      loading: () => const Center(child: CircularProgressIndicator()),
      error: (e, _) => Center(child: Text(e.toString())),
      data: (items) => Center(
        child: Text(items.isEmpty ? 'NO HAY riesgos para evaluar.' : '${items.length} riesgos evaluados en el mapa de calor.'),
      ),
    );
  }
}

String _severidad(int valor) => valor >= 15 ? 'ALTO' : valor >= 8 ? 'MEDIO' : 'BAJO';
Color _color(String? valor) => valor == 'ALTO' ? Colors.red : valor == 'MEDIO' ? Colors.orange : Colors.green;
