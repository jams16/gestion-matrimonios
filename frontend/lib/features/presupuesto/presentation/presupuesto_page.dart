import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../app/theme/app_colors.dart';
import '../../../app/theme/app_spacing.dart';
import '../../../core/widgets/buttons/app_button.dart';
import '../../../core/widgets/containers/app_card.dart';
import '../../../core/widgets/feedback/app_snackbar.dart';
import '../../../core/widgets/inputs/app_date_field.dart';
import '../../../core/widgets/inputs/app_select_field.dart';
import '../../../core/widgets/inputs/app_text_field.dart';
import '../../../core/widgets/navigation/app_tabs.dart';
import '../../../core/widgets/overlays/app_bottom_sheet.dart';
import '../../cronograma/application/providers/cronograma_provider.dart';
import '../application/presupuesto_provider.dart';

class PresupuestoPage extends ConsumerStatefulWidget {
  const PresupuestoPage({super.key, required this.idProyecto});
  final String idProyecto;
  @override
  ConsumerState<PresupuestoPage> createState() => _PresupuestoPageState();
}

class _PresupuestoPageState extends ConsumerState<PresupuestoPage>
    with SingleTickerProviderStateMixin {
  late final TabController _tabs;
  int _tab = 0;

  @override
  void initState() {
    super.initState();
    _tabs = TabController(length: 4, vsync: this)..addListener(() {
      if (mounted && _tab != _tabs.index) setState(() => _tab = _tabs.index);
    });
  }

  @override
  void dispose() { _tabs.dispose(); super.dispose(); }

  Future<void> _refresh(String m) async {
    ref.invalidate(presupuestoResumenProvider(m));
    ref.invalidate(presupuestoCategoriasProvider(m));
    ref.invalidate(presupuestoCostosProvider(m));
    ref.invalidate(presupuestoCompromisosProvider(m));
    ref.invalidate(presupuestoNotificacionesProvider(m));
  }

  Future<void> _run(String m, Future<void> Function() action, String ok) async {
    try {
      await action();
      await _refresh(m);
      if (mounted) AppSnackbar.show(context, message: ok, type: AppSnackbarType.success);
    } catch (e) {
      if (mounted) AppSnackbar.show(context, message: _error(e), type: AppSnackbarType.error);
    }
  }

  @override
  Widget build(BuildContext context) {
    final activo = ref.watch(_presupuestoMatrimonioProvider(widget.idProyecto));
    return activo.when(
      loading: () => const Center(child: CircularProgressIndicator()),
      error: (e, _) => _Error(text: _error(e), retry: () => ref.invalidate(_presupuestoMatrimonioProvider(widget.idProyecto))),
      data: (m) => RefreshIndicator(
        onRefresh: () => _refresh(m),
        child: ListView(
          padding: const EdgeInsets.all(AppSpacing.lg),
          children: [
            Row(children: [
              Expanded(child: Text('Presupuesto', style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w800))),
              IconButton(onPressed: () => _PresupuestoForm.show(context, ref, m, () => _refresh(m)), icon: const Icon(Icons.tune_outlined), tooltip: 'Editar presupuesto'),
              IconButton(onPressed: () => _menuAgregar(m), icon: const Icon(Icons.add_circle_outline), tooltip: 'Agregar'),
            ]),
            const SizedBox(height: AppSpacing.md),
            _Resumen(resumen: ref.watch(presupuestoResumenProvider(m))),
            const SizedBox(height: AppSpacing.lg),
            AppTabs(controller: _tabs, tabs: const [
              AppTabItem(label: 'Costos', icon: Icons.receipt_long_outlined),
              AppTabItem(label: 'Categorias', icon: Icons.category_outlined),
              AppTabItem(label: 'Pagos', icon: Icons.event_note_outlined),
              AppTabItem(label: 'Reportes', icon: Icons.assessment_outlined),
            ]),
            const Divider(height: 1, thickness: 1, color: Color(0xFF29252F)),
            const SizedBox(height: AppSpacing.md),
            AnimatedSwitcher(
              duration: const Duration(milliseconds: 220),
              child: switch (_tab) {
                0 => _Costos(matrimonio: m, refresh: () => _refresh(m), run: _run),
                1 => _Categorias(matrimonio: m, refresh: () => _refresh(m), run: _run),
                2 => _Pagos(matrimonio: m, refresh: () => _refresh(m), run: _run),
                _ => _Reportes(matrimonio: m, run: _run),
              },
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _menuAgregar(String m) async {
    final action = await AppBottomSheet.show<String>(context, title: 'Agregar al presupuesto', child: Column(children: [
      _Option(icon: Icons.receipt_long_outlined, title: 'Registrar costo', description: 'Estimado, real o vinculado a un proveedor.', onTap: () => Navigator.pop(context, 'costo')),
      _Option(icon: Icons.category_outlined, title: 'Crear categoria', description: 'Define el monto asignado por rubro.', onTap: () => Navigator.pop(context, 'categoria')),
      _Option(icon: Icons.payments_outlined, title: 'Registrar pago', description: 'Pago inicial, cuota o pago final.', onTap: () => Navigator.pop(context, 'pago')),
      _Option(icon: Icons.calendar_month_outlined, title: 'Programar pago', description: 'Incluye un vencimiento en el calendario.', onTap: () => Navigator.pop(context, 'compromiso')),
    ]));
    if (!mounted || action == null) return;
    switch (action) {
      case 'costo': await _CostoForm.show(context, ref, m, null, () => _refresh(m)); break;
      case 'categoria': await _CategoriaForm.show(context, ref, m, null, () => _refresh(m)); break;
      case 'pago': await _seleccionarCosto(m, (c) => _PagoForm.show(context, ref, m, c, () => _refresh(m))); break;
      case 'compromiso': await _seleccionarCosto(m, (c) => _CompromisoForm.show(context, ref, m, c, () => _refresh(m))); break;
    }
  }

  Future<void> _seleccionarCosto(String m, Future<void> Function(Map<String, dynamic>) fn) async {
    final costs = await ref.read(presupuestoCostosProvider(m).future);
    if (!mounted) return;
    final c = await AppBottomSheet.show<Map<String, dynamic>>(context, title: 'Selecciona un costo', child: Column(children: costs.map((x) => _Option(icon: Icons.receipt_outlined, title: x['concepto']?.toString() ?? 'Costo', description: _money(x['montoReal'] ?? x['montoEstimado']), onTap: () => Navigator.pop(context, x))).toList()));
    if (c != null) await fn(c);
  }
}

class _Resumen extends StatelessWidget {
  const _Resumen({required this.resumen});
  final AsyncValue<Map<String, dynamic>> resumen;
  @override
  Widget build(BuildContext context) => Container(
    padding: const EdgeInsets.all(AppSpacing.lg),
    decoration: BoxDecoration(color: const Color(0xFFF4F0FB), borderRadius: BorderRadius.circular(16)),
    child: resumen.when(
      loading: () => const LinearProgressIndicator(),
      error: (_, _) => const Text('No se pudo cargar el resumen financiero.'),
      data: (r) {
        final total = _num(r['monto_total']); final comprometido = _num(r['monto_comprometido']);
        final ratio = total <= 0 ? 0.0 : (comprometido / total).clamp(0.0, 1.0);
        return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text('Presupuesto: ${_money(total, r['moneda'])}', style: const TextStyle(fontWeight: FontWeight.w800)),
          const SizedBox(height: 12),
          LinearProgressIndicator(value: ratio, minHeight: 8, color: AppColors.primary, backgroundColor: Colors.white, borderRadius: BorderRadius.circular(8)),
          const SizedBox(height: 8),
          Text('${_money(comprometido, r['moneda'])} comprometido  |  ${_money(r['disponible'], r['moneda'])} disponible'),
          const SizedBox(height: 3),
          Text('${_money(r['monto_pagado'], r['moneda'])} pagado  |  ${_money(r['saldo_pendiente'], r['moneda'])} pendiente'),
        ]);
      },
    ),
  );
}

class _Costos extends ConsumerWidget {
  const _Costos({required this.matrimonio, required this.refresh, required this.run});
  final String matrimonio; final Future<void> Function() refresh; final Future<void> Function(String, Future<void> Function(), String) run;
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final data = ref.watch(presupuestoCostosProvider(matrimonio));
    return data.when(loading: () => const Center(child: Padding(padding: EdgeInsets.all(32), child: CircularProgressIndicator())), error: (e, _) => _Error(text: _error(e), retry: refresh), data: (items) {
      if (items.isEmpty) return const _Empty(text: 'Aun no hay costos. Agrega costos estimados o reales.');
      return Column(children: items.map((c) => Padding(padding: const EdgeInsets.only(bottom: 10), child: AppCard(elevated: true, onTap: () => _CostoDetalle.show(context, ref, matrimonio, c, refresh), child: Row(children: [
        CircleAvatar(backgroundColor: const Color(0xFFE9E1F7), child: Icon(_estadoIcon(c['estado']?.toString() ?? 'PLANIFICADO'), color: AppColors.primary)),
        const SizedBox(width: 12), Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [Text(c['concepto']?.toString() ?? 'Costo', style: const TextStyle(fontWeight: FontWeight.w700)), const SizedBox(height: 3), Text('${_money(c['montoEstimado'])} estimado  |  ${_money(c['montoReal'])} real'), const SizedBox(height: 5), _Chip(c['estado']?.toString() ?? 'PLANIFICADO')])) ,
        PopupMenuButton<String>(onSelected: (v) async { if (v == 'editar') await _CostoForm.show(context, ref, matrimonio, c, refresh); if (v == 'eliminar') await run(matrimonio, () => ref.read(presupuestoApiProvider).eliminarCosto(matrimonio, c['idCosto'].toString()), 'Costo desactivado.'); }, itemBuilder: (_) => const [PopupMenuItem(value: 'editar', child: Text('Editar')), PopupMenuItem(value: 'eliminar', child: Text('Eliminar'))]),
      ])))).toList());
    });
  }
}

class _Categorias extends ConsumerWidget {
  const _Categorias({required this.matrimonio, required this.refresh, required this.run});
  final String matrimonio; final Future<void> Function() refresh; final Future<void> Function(String, Future<void> Function(), String) run;
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final categorias = ref.watch(presupuestoCategoriasProvider(matrimonio));
    return categorias.when(
      loading: () => const Center(child: CircularProgressIndicator()),
      error: (e, _) => _Error(text: _error(e), retry: refresh),
      data: (items) {
        if (items.isEmpty) return const _Empty(text: 'Aun no hay categorias de presupuesto.');
        return Column(
          children: items.map((item) => Padding(
            padding: const EdgeInsets.only(bottom: 10),
            child: AppCard(
              child: Row(
                children: [
                  const CircleAvatar(backgroundColor: Color(0xFFE9E1F7), child: Icon(Icons.category_outlined, color: AppColors.primary)),
                  const SizedBox(width: 12),
                  Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                    Text(item['nombre']?.toString() ?? 'Categoria', style: const TextStyle(fontWeight: FontWeight.w700)),
                    Text('${item['codigo'] ?? ''} | Asignado: ${_money(item['montoAsignado'])}'),
                  ])),
                  PopupMenuButton<String>(
                    onSelected: (value) async {
                      if (value == 'editar') await _CategoriaForm.show(context, ref, matrimonio, item, refresh);
                      if (value == 'eliminar') await run(matrimonio, () => ref.read(presupuestoApiProvider).eliminarCategoria(matrimonio, _int(item['idCategoriaPresupuesto'])), 'Categoria desactivada.');
                    },
                    itemBuilder: (_) => const [
                      PopupMenuItem(value: 'editar', child: Text('Editar')),
                      PopupMenuItem(value: 'eliminar', child: Text('Eliminar')),
                    ],
                  ),
                ],
              ),
            ),
          )).toList(),
        );
      },
    );
  }
}

class _Pagos extends ConsumerWidget {
  const _Pagos({required this.matrimonio, required this.refresh, required this.run});
  final String matrimonio; final Future<void> Function() refresh; final Future<void> Function(String, Future<void> Function(), String) run;
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final compromisos = ref.watch(presupuestoCompromisosProvider(matrimonio));
    return compromisos.when(
      loading: () => const Center(child: CircularProgressIndicator()),
      error: (e, _) => _Error(text: _error(e), retry: refresh),
      data: (items) => Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Calendario de pagos', style: TextStyle(fontWeight: FontWeight.w800)),
          const SizedBox(height: 4),
          const Text('Los compromisos programados permiten monitorear cuotas y vencimientos.'),
          const SizedBox(height: 12),
          if (items.isEmpty)
            const _Empty(text: 'No hay pagos programados.')
          else
            ...items.map(
              (item) => Padding(
                padding: const EdgeInsets.only(bottom: 10),
                child: AppCard(
                  child: ListTile(
                    contentPadding: EdgeInsets.zero,
                    leading: const CircleAvatar(
                      backgroundColor: Color(0xFFE9E1F7),
                      child: Icon(Icons.event_available_outlined, color: AppColors.primary),
                    ),
                    title: Text(item['concepto']?.toString() ?? 'Pago programado'),
                    subtitle: Text('Vence: ${_date(item['fechaVencimiento'])}'),
                    trailing: Text(
                      _money(item['montoProgramado']),
                      style: const TextStyle(fontWeight: FontWeight.w700),
                    ),
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }
}

class _Alertas extends ConsumerWidget {
  const _Alertas({required this.matrimonio, required this.refresh, required this.run});
  final String matrimonio; final Future<void> Function() refresh; final Future<void> Function(String, Future<void> Function(), String) run;
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final alertas = ref.watch(presupuestoNotificacionesProvider(matrimonio));
    return alertas.when(
      loading: () => const Center(child: CircularProgressIndicator()),
      error: (e, _) => _Error(text: _error(e), retry: refresh),
      data: (items) {
        if (items.isEmpty) return const _Empty(text: 'No hay alertas financieras pendientes.');
        return Column(children: items.map((item) => Padding(
          padding: const EdgeInsets.only(bottom: 10),
          child: AppCard(
            backgroundColor: item['leida'] == true ? null : const Color(0xFFF4F0FB),
            child: ListTile(
              contentPadding: EdgeInsets.zero,
              leading: const Icon(Icons.warning_amber_outlined, color: AppColors.primary),
              title: Text(item['titulo']?.toString() ?? 'Alerta'),
              subtitle: Text(item['mensaje']?.toString() ?? ''),
              trailing: item['leida'] == true ? null : TextButton(
                onPressed: () => run(matrimonio, () => ref.read(presupuestoApiProvider).leerNotificacion(matrimonio, item['idNotificacion'].toString()), 'Alerta marcada como leida.'),
                child: const Text('Leida'),
              ),
            ),
          ),
        )).toList());
      },
    );
  }
}

class _Reportes extends ConsumerWidget {
  const _Reportes({required this.matrimonio, required this.run});
  final String matrimonio; final Future<void> Function(String, Future<void> Function(), String) run;
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return AppCard(
      elevated: true,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Reportes financieros', style: TextStyle(fontWeight: FontWeight.w800)),
          const SizedBox(height: 6),
          const Text('Genera el consolidado con costos, pagos, saldos y distribucion por categoria.'),
          const SizedBox(height: 16),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: [
              AppButton(
                label: 'Ver reporte',
                variant: AppButtonVariant.secondary,
                icon: Icons.visibility_outlined,
                onPressed: () async {
                  try {
                    final reporte = await ref.read(presupuestoApiProvider).reporte(matrimonio);
                    if (!context.mounted) return;
                    await AppBottomSheet.show(
                      context,
                      title: 'Reporte financiero',
                      child: Text(
                        'Total: ${_money(reporte['resumen']?['monto_total'])}\n'
                        'Comprometido: ${_money(reporte['resumen']?['monto_comprometido'])}\n'
                        'Pagado: ${_money(reporte['resumen']?['monto_pagado'])}',
                      ),
                    );
                  } catch (e) {
                    if (context.mounted) AppSnackbar.show(context, message: _error(e), type: AppSnackbarType.error);
                  }
                },
              ),
              AppButton(
                label: 'Exportar CSV',
                icon: Icons.download_outlined,
                onPressed: () async {
                  try {
                    await ref.read(presupuestoApiProvider).exportar(matrimonio, 'CSV');
                    if (context.mounted) AppSnackbar.show(context, message: 'Reporte CSV generado por el servidor.', type: AppSnackbarType.success);
                  } catch (e) {
                    if (context.mounted) AppSnackbar.show(context, message: _error(e), type: AppSnackbarType.error);
                  }
                },
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _CostoDetalle {
  static Future<void> show(BuildContext context, WidgetRef ref, String m, Map<String, dynamic> costo, Future<void> Function() refresh) async {
    final id = costo['idCosto'].toString();
    final pagos = await ref.read(presupuestoApiProvider).pagos(m, id);
    if (!context.mounted) return;
    await AppBottomSheet.show(context, title: costo['concepto']?.toString() ?? 'Costo', description: 'Pagos, comprobantes y seguimiento.', child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Text('Estimado: ${_money(costo['montoEstimado'])} | Real: ${_money(costo['montoReal'])}'),
      const SizedBox(height: 16),
      Row(children: [const Expanded(child: Text('Pagos registrados', style: TextStyle(fontWeight: FontWeight.w800))), IconButton(onPressed: () async { await _PagoForm.show(context, ref, m, costo, refresh); }, icon: const Icon(Icons.add_circle_outline), tooltip: 'Registrar pago')]),
      if (pagos.isEmpty) const Padding(padding: EdgeInsets.symmetric(vertical: 12), child: Text('No hay pagos registrados.')),
      ...pagos.map((p) => ListTile(contentPadding: EdgeInsets.zero, leading: const Icon(Icons.payments_outlined), title: Text('${p['concepto'] ?? 'Pago'} - ${_money(p['monto'])}'), subtitle: Text('${p['tipo'] ?? 'CUOTA'} | ${_date(p['fechaPago'])}'), trailing: IconButton(icon: const Icon(Icons.more_horiz), onPressed: () => _PagoDetalle.show(context, ref, m, id, p, refresh)))),
      const SizedBox(height: 8),
      AppButton(label: 'Programar pago', icon: Icons.calendar_month_outlined, variant: AppButtonVariant.secondary, onPressed: () => _CompromisoForm.show(context, ref, m, costo, refresh)),
    ]));
  }
}

class _PagoDetalle {
  static Future<void> show(BuildContext context, WidgetRef ref, String m, String costo, Map<String, dynamic> pago, Future<void> Function() refresh) async {
    final id = pago['idPago'].toString();
    final api = ref.read(presupuestoApiProvider);
    final all = await Future.wait([api.documentos(m, costo, id), api.seguimientos(m, costo, id)]);
    if (!context.mounted) return;
    await AppBottomSheet.show(context, title: 'Detalle de pago', description: '${pago['concepto'] ?? ''} | ${_money(pago['monto'])}', child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      _section('Comprobantes', (all[0] as List<Map<String, dynamic>>).map((x) => Text('• ${x['nombre'] ?? 'Documento'}')).toList(), () => _DocumentoForm.show(context, ref, m, costo, id, refresh)),
      const SizedBox(height: 20),
      _section('Seguimiento', (all[1] as List<Map<String, dynamic>>).map((x) => Text('• ${x['tipo'] ?? ''}: ${x['detalle'] ?? ''}')).toList(), () => _SeguimientoForm.show(context, ref, m, costo, id, refresh)),
      const SizedBox(height: 16),
      AppButton(label: 'Eliminar pago', variant: AppButtonVariant.destructive, expanded: true, onPressed: () async { try { await api.eliminarPago(m, costo, id); await refresh(); if (context.mounted) Navigator.pop(context); } catch (e) { if (context.mounted) AppSnackbar.show(context, message: _error(e), type: AppSnackbarType.error); } }),
    ]));
  }
  static Widget _section(String title, List<Widget> list, VoidCallback add) => Column(crossAxisAlignment: CrossAxisAlignment.start, children: [Row(children: [Expanded(child: Text(title, style: const TextStyle(fontWeight: FontWeight.w800))), IconButton(onPressed: add, icon: const Icon(Icons.add_circle_outline))]), if (list.isEmpty) const Text('Sin registros.') else ...list]);
}

class _PresupuestoForm {
  static Future<void> show(BuildContext context, WidgetRef ref, String m, Future<void> Function() refresh) async {
    Map<String, dynamic> actual;
    try {
      actual = await ref.read(presupuestoApiProvider).obtener(m);
    } catch (e) {
      if (context.mounted) AppSnackbar.show(context, message: _error(e), type: AppSnackbarType.error);
      return;
    }
    final monto = TextEditingController(text: (actual['montoTotal'] ?? actual['monto_total'] ?? '').toString());
    final moneda = TextEditingController(text: actual['moneda']?.toString() ?? 'PEN');
    if (!context.mounted) return;
    await AppBottomSheet.show(context, title: 'Presupuesto inicial', description: 'El disponible se calcula en el servidor a partir de costos y contrataciones.', child: _FormColumn(children: [
      AppTextField(label: 'Monto total (S/.)', controller: monto, required: true, keyboardType: const TextInputType.numberWithOptions(decimal: true), prefixIcon: const Icon(Icons.account_balance_wallet_outlined)),
      AppTextField(label: 'Moneda', controller: moneda, required: true, prefixIcon: const Icon(Icons.currency_exchange_outlined)),
      AppButton(label: 'Guardar presupuesto', expanded: true, icon: Icons.save_outlined, onPressed: () async { final value = double.tryParse(monto.text.replaceAll(',', '.')); if (value == null || moneda.text.trim().isEmpty) { AppSnackbar.show(context, message: 'Completa monto y moneda.', type: AppSnackbarType.info); return; } try { await ref.read(presupuestoApiProvider).actualizar(m, {'montoTotal': value, 'moneda': moneda.text.trim()}); await refresh(); if (context.mounted) Navigator.pop(context); } catch (e) { if (context.mounted) AppSnackbar.show(context, message: _error(e), type: AppSnackbarType.error); } }),
    ]));
  }
}

class _CategoriaForm {
  static Future<void> show(BuildContext context, WidgetRef ref, String m, Map<String, dynamic>? actual, Future<void> Function() refresh) async {
    final codigo = TextEditingController(text: actual?['codigo']?.toString() ?? '');
    final nombre = TextEditingController(text: actual?['nombre']?.toString() ?? '');
    final monto = TextEditingController(text: actual?['montoAsignado']?.toString() ?? '');
    await AppBottomSheet.show(context, title: actual == null ? 'Crear categoria' : 'Editar categoria', child: _FormColumn(children: [
      AppTextField(label: 'Codigo', controller: codigo, required: true, prefixIcon: const Icon(Icons.tag)),
      AppTextField(label: 'Nombre', controller: nombre, required: true, prefixIcon: const Icon(Icons.category_outlined)),
      AppTextField(label: 'Monto asignado (S/.)', controller: monto, required: true, keyboardType: const TextInputType.numberWithOptions(decimal: true), prefixIcon: const Icon(Icons.payments_outlined)),
      AppButton(label: 'Guardar', expanded: true, icon: Icons.save_outlined, onPressed: () async { final value = double.tryParse(monto.text.replaceAll(',', '.')); if (codigo.text.trim().isEmpty || nombre.text.trim().isEmpty || value == null) { AppSnackbar.show(context, message: 'Completa codigo, nombre y monto.', type: AppSnackbarType.info); return; } try { final api = ref.read(presupuestoApiProvider); final body = {'codigo': codigo.text.trim(), 'nombre': nombre.text.trim(), 'montoAsignado': value}; if (actual == null) { await api.crearCategoria(m, body); } else { await api.editarCategoria(m, _int(actual['idCategoriaPresupuesto']), body); } await refresh(); if (context.mounted) Navigator.pop(context); } catch (e) { if (context.mounted) AppSnackbar.show(context, message: _error(e), type: AppSnackbarType.error); } }),
    ]));
  }
}

class _CostoForm {
  static Future<void> show(BuildContext context, WidgetRef ref, String m, Map<String, dynamic>? actual, Future<void> Function() refresh) async {
    final categorias = await ref.read(presupuestoCategoriasProvider(m).future);
    if (!context.mounted) return;
    int? categoria = _intOrNull(actual?['idCategoriaPresupuesto']);
    final concepto = TextEditingController(text: actual?['concepto']?.toString() ?? '');
    final estimado = TextEditingController(text: actual?['montoEstimado']?.toString() ?? '');
    final real = TextEditingController(text: actual?['montoReal']?.toString() ?? '');
    String estado = actual?['estado']?.toString() ?? 'PLANIFICADO';
    await AppBottomSheet.show(context, title: actual == null ? 'Registrar costo' : 'Editar costo', description: 'Si el proveedor esta contratado, el backend sincroniza sus servicios y categorias.', child: StatefulBuilder(builder: (context, setLocal) => _FormColumn(children: [
      AppSelectField<int>(label: 'Categoria', initialValue: categoria, options: categorias.map((x) => AppSelectOption(value: _int(x['idCategoriaPresupuesto']), label: x['nombre']?.toString() ?? 'Categoria')).toList(), onChanged: (v) => setLocal(() => categoria = v)),
      AppTextField(label: 'Concepto', controller: concepto, required: true, prefixIcon: const Icon(Icons.receipt_long_outlined)),
      AppTextField(label: 'Monto estimado (S/.)', controller: estimado, required: true, keyboardType: const TextInputType.numberWithOptions(decimal: true), prefixIcon: const Icon(Icons.request_quote_outlined)),
      AppTextField(label: 'Monto real (S/.)', controller: real, required: true, keyboardType: const TextInputType.numberWithOptions(decimal: true), prefixIcon: const Icon(Icons.payments_outlined)),
      AppSelectField<String>(label: 'Estado', initialValue: estado, options: const ['PLANIFICADO','CONTRATADO','PAGADO','CANCELADO'].map((x) => AppSelectOption(value: x, label: x)).toList(), onChanged: (v) => setLocal(() => estado = v ?? estado)),
      AppButton(label: 'Guardar costo', expanded: true, icon: Icons.save_outlined, onPressed: () async { final e = double.tryParse(estimado.text.replaceAll(',', '.')); final r = double.tryParse(real.text.replaceAll(',', '.')); if (categoria == null || concepto.text.trim().isEmpty || e == null || r == null) { AppSnackbar.show(context, message: 'Completa los campos obligatorios.', type: AppSnackbarType.info); return; } final body = {'idCategoriaPresupuesto': categoria, 'concepto': concepto.text.trim(), 'montoEstimado': e, 'montoReal': r, 'estado': estado}; try { final api = ref.read(presupuestoApiProvider); if (actual == null) { await api.crearCosto(m, body); } else { await api.editarCosto(m, actual['idCosto'].toString(), body); } await refresh(); if (context.mounted) Navigator.pop(context); } catch (x) { if (context.mounted) AppSnackbar.show(context, message: _error(x), type: AppSnackbarType.error); } }),
    ])));
  }
}

class _PagoForm {
  static Future<void> show(BuildContext context, WidgetRef ref, String m, Map<String, dynamic> costo, Future<void> Function() refresh) async {
    final monto = TextEditingController(); final concepto = TextEditingController(); final cuota = TextEditingController(); DateTime fecha = DateTime.now(); String tipo = 'CUOTA';
    await AppBottomSheet.show(context, title: 'Registrar pago', description: costo['concepto']?.toString(), child: StatefulBuilder(builder: (context, setLocal) => _FormColumn(children: [
      AppTextField(label: 'Monto (S/.)', controller: monto, required: true, keyboardType: const TextInputType.numberWithOptions(decimal: true), prefixIcon: const Icon(Icons.payments_outlined)),
      AppTextField(label: 'Concepto', controller: concepto, required: true, prefixIcon: const Icon(Icons.notes_outlined)),
      AppDateField(label: 'Fecha de pago', initialDate: fecha, onChanged: (v) => setLocal(() => fecha = v ?? fecha)),
      AppSelectField<String>(label: 'Tipo de pago', initialValue: tipo, options: const ['PAGO_INICIAL','CUOTA','PAGO_FINAL'].map((x) => AppSelectOption(value: x, label: x.replaceAll('_', ' '))).toList(), onChanged: (v) => setLocal(() => tipo = v ?? tipo)),
      if (tipo == 'CUOTA') AppTextField(label: 'Numero de cuota', controller: cuota, keyboardType: TextInputType.number, prefixIcon: const Icon(Icons.format_list_numbered)),
      AppButton(label: 'Registrar pago', expanded: true, onPressed: () async { final value = double.tryParse(monto.text.replaceAll(',', '.')); if (value == null || concepto.text.trim().isEmpty) { AppSnackbar.show(context, message: 'Completa monto y concepto.', type: AppSnackbarType.info); return; } try { await ref.read(presupuestoApiProvider).crearPago(m, costo['idCosto'].toString(), {'monto': value, 'concepto': concepto.text.trim(), 'fechaPago': fecha.toIso8601String(), 'tipo': tipo, if (tipo == 'CUOTA' && int.tryParse(cuota.text) != null) 'numeroCuota': int.parse(cuota.text)}); await refresh(); if (context.mounted) Navigator.pop(context); } catch (e) { if (context.mounted) AppSnackbar.show(context, message: _error(e), type: AppSnackbarType.error); } }),
    ])));
  }
}

class _CompromisoForm {
  static Future<void> show(BuildContext context, WidgetRef ref, String m, Map<String, dynamic> costo, Future<void> Function() refresh) async {
    final monto = TextEditingController(); final concepto = TextEditingController(); DateTime fecha = DateTime.now().add(const Duration(days: 7));
    await AppBottomSheet.show(context, title: 'Programar pago', description: 'El vencimiento queda disponible para el calendario de pagos.', child: StatefulBuilder(builder: (context, setLocal) => _FormColumn(children: [
      AppTextField(label: 'Monto programado (S/.)', controller: monto, required: true, keyboardType: const TextInputType.numberWithOptions(decimal: true), prefixIcon: const Icon(Icons.payments_outlined)),
      AppTextField(label: 'Concepto', controller: concepto, required: true, prefixIcon: const Icon(Icons.event_note_outlined)),
      AppDateField(label: 'Fecha de vencimiento', initialDate: fecha, firstDate: DateTime.now().subtract(const Duration(days: 1)), onChanged: (v) => setLocal(() => fecha = v ?? fecha)),
      AppButton(label: 'Programar pago', expanded: true, icon: Icons.calendar_month_outlined, onPressed: () async { final value = double.tryParse(monto.text.replaceAll(',', '.')); if (value == null || concepto.text.trim().isEmpty) { AppSnackbar.show(context, message: 'Completa monto y concepto.', type: AppSnackbarType.info); return; } try { await ref.read(presupuestoApiProvider).crearCompromiso(m, costo['idCosto'].toString(), {'montoProgramado': value, 'concepto': concepto.text.trim(), 'fechaVencimiento': fecha.toIso8601String()}); await refresh(); if (context.mounted) Navigator.pop(context); } catch (e) { if (context.mounted) AppSnackbar.show(context, message: _error(e), type: AppSnackbarType.error); } }),
    ])));
  }
}

class _DocumentoForm {
  static Future<void> show(BuildContext context, WidgetRef ref, String m, String costo, String pago, Future<void> Function() refresh) async {
    final nombre = TextEditingController(); final url = TextEditingController(); final tipo = TextEditingController();
    await AppBottomSheet.show(context, title: 'Agregar comprobante', child: _FormColumn(children: [
      AppTextField(label: 'Nombre', controller: nombre, required: true, prefixIcon: const Icon(Icons.description_outlined)),
      AppTextField(label: 'URL del comprobante', controller: url, required: true, prefixIcon: const Icon(Icons.link_outlined)),
      AppTextField(label: 'Tipo de documento', controller: tipo, prefixIcon: const Icon(Icons.folder_outlined)),
      AppButton(label: 'Guardar comprobante', expanded: true, onPressed: () async { if (nombre.text.trim().isEmpty || url.text.trim().isEmpty) { AppSnackbar.show(context, message: 'Completa nombre y URL.', type: AppSnackbarType.info); return; } try { await ref.read(presupuestoApiProvider).crearDocumento(m, costo, pago, {'nombre': nombre.text.trim(), 'url': url.text.trim(), if (tipo.text.trim().isNotEmpty) 'tipo': tipo.text.trim()}); await refresh(); if (context.mounted) Navigator.pop(context); } catch (e) { if (context.mounted) AppSnackbar.show(context, message: _error(e), type: AppSnackbarType.error); } }),
    ]));
  }
}

class _SeguimientoForm {
  static Future<void> show(BuildContext context, WidgetRef ref, String m, String costo, String pago, Future<void> Function() refresh) async {
    final tipo = TextEditingController(); final detalle = TextEditingController();
    await AppBottomSheet.show(context, title: 'Agregar seguimiento', child: _FormColumn(children: [
      AppTextField(label: 'Tipo', controller: tipo, required: true, prefixIcon: const Icon(Icons.track_changes_outlined)),
      AppTextField(label: 'Detalle', controller: detalle, maxLines: 3, prefixIcon: const Icon(Icons.notes_outlined)),
      AppButton(label: 'Guardar seguimiento', expanded: true, onPressed: () async { if (tipo.text.trim().isEmpty) { AppSnackbar.show(context, message: 'Indica el tipo de seguimiento.', type: AppSnackbarType.info); return; } try { await ref.read(presupuestoApiProvider).crearSeguimiento(m, costo, pago, {'tipo': tipo.text.trim(), if (detalle.text.trim().isNotEmpty) 'detalle': detalle.text.trim()}); await refresh(); if (context.mounted) Navigator.pop(context); } catch (e) { if (context.mounted) AppSnackbar.show(context, message: _error(e), type: AppSnackbarType.error); } }),
    ]));
  }
}

class _FormColumn extends StatelessWidget {
  const _FormColumn({required this.children});
  final List<Widget> children;
  @override
  Widget build(BuildContext context) => Column(children: [for (var i = 0; i < children.length; i++) ...[children[i], if (i != children.length - 1) const SizedBox(height: 16)]]);
}

class _Option extends StatelessWidget {
  const _Option({required this.icon, required this.title, required this.description, required this.onTap});
  final IconData icon; final String title; final String description; final VoidCallback onTap;
  @override
  Widget build(BuildContext context) => ListTile(contentPadding: const EdgeInsets.symmetric(vertical: 4), leading: Icon(icon, color: AppColors.primary), title: Text(title), subtitle: Text(description), onTap: onTap);
}
class _Empty extends StatelessWidget { const _Empty({required this.text}); final String text; @override Widget build(BuildContext context) => Padding(padding: const EdgeInsets.all(32), child: Center(child: Text(text, textAlign: TextAlign.center))); }
class _Error extends StatelessWidget { const _Error({required this.text, required this.retry}); final String text; final VoidCallback retry; @override Widget build(BuildContext context) => Padding(padding: const EdgeInsets.all(32), child: Center(child: Column(mainAxisSize: MainAxisSize.min, children: [const Icon(Icons.error_outline, color: AppColors.error, size: 36), const SizedBox(height: 8), Text(text, textAlign: TextAlign.center), TextButton(onPressed: retry, child: const Text('Reintentar'))]))); }
class _Chip extends StatelessWidget { const _Chip(this.text); final String text; @override Widget build(BuildContext context) => Container(padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3), decoration: BoxDecoration(color: const Color(0xFFE9E1F7), borderRadius: BorderRadius.circular(10)), child: Text(text.replaceAll('_', ' '), style: const TextStyle(fontSize: 11, color: AppColors.primary, fontWeight: FontWeight.w700))); }

final _presupuestoMatrimonioProvider = FutureProvider.autoDispose.family<String, String>((ref, proyecto) async {
  final raw = await ref.watch(cronogramaApiProvider).obtenerMatrimonio(proyecto);
  final m = raw['matrimonio'] is Map ? Map<String, dynamic>.from(raw['matrimonio'] as Map) : raw;
  final id = (m['idMatrimonio'] ?? m['id_matrimonio'])?.toString();
  if (id == null || id.isEmpty) throw StateError('No se encontro el matrimonio activo.');
  return id;
});

double _num(dynamic value) => value is num ? value.toDouble() : double.tryParse(value?.toString() ?? '') ?? 0;
int _int(dynamic value) => value is int ? value : int.tryParse(value?.toString() ?? '') ?? 0;
int? _intOrNull(dynamic value) { final v = _int(value); return v <= 0 ? null : v; }
String _money(dynamic value, [dynamic moneda]) => '${moneda?.toString() ?? 'S/.'} ${_num(value).toStringAsFixed(2)}';
String _date(dynamic value) { final d = DateTime.tryParse(value?.toString() ?? ''); return d == null ? '-' : '${d.day.toString().padLeft(2, '0')}/${d.month.toString().padLeft(2, '0')}/${d.year}'; }
IconData _estadoIcon(String estado) => switch (estado) { 'PAGADO' => Icons.check_circle_outline, 'CONTRATADO' => Icons.handshake_outlined, 'CANCELADO' => Icons.cancel_outlined, _ => Icons.schedule_outlined };
String _error(Object e) { final text = e.toString(); final match = RegExp(r'message: ([^}]+)').firstMatch(text); return match?.group(1)?.replaceAll('"', '') ?? text.replaceFirst('Exception: ', ''); }
