import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:go_router/go_router.dart';

import '../../../../app/theme/app_colors.dart';
import '../../../../app/theme/app_spacing.dart';
import '../../../../core/widgets/buttons/app_button.dart';
import '../../../../core/widgets/feedback/app_snackbar.dart';
import '../../../../core/widgets/inputs/app_number_field.dart';
import '../../../../core/widgets/inputs/app_select_field.dart';
import '../../../../core/widgets/inputs/app_text_field.dart';
import '../../../../core/widgets/selection/app_checkbox.dart';

class CrearMatrimonioPage extends StatefulWidget {
  const CrearMatrimonioPage({super.key});
  @override State<CrearMatrimonioPage> createState() => _CrearMatrimonioPageState();
}

class _CrearMatrimonioPageState extends State<CrearMatrimonioPage> {
  final _form = GlobalKey<FormState>();
  final _nombres1 = TextEditingController(), _apellido1 = TextEditingController(), _dni1 = TextEditingController(), _usuario1 = TextEditingController(), _contrasena1 = TextEditingController();
  final _nombres2 = TextEditingController(), _apellido2 = TextEditingController(), _dni2 = TextEditingController(), _usuario2 = TextEditingController(), _contrasena2 = TextEditingController();
  final _fecha = TextEditingController(), _presupuesto = TextEditingController(), _objetivos = TextEditingController(), _necesidades = TextEditingController(), _supuestos = TextEditingController(), _restricciones = TextEditingController(), _moonboard = TextEditingController();
  Timer? _introTimer;
  bool _mostrandoIntro = true, _usarDni = false;
  int _segundosRestantes = 5;
  int _paso = 1, _invitados = 1;
  String? _ubigeo, _tipoCeremonia;
  @override void initState() { super.initState(); _introTimer = Timer.periodic(const Duration(seconds: 1), (timer) { if (!mounted) return; if (_segundosRestantes <= 1) { timer.cancel(); setState(() => _mostrandoIntro = false); } else { setState(() => _segundosRestantes--); } }); }
  @override void dispose() { _introTimer?.cancel(); for (final c in [_nombres1,_apellido1,_dni1,_usuario1,_contrasena1,_nombres2,_apellido2,_dni2,_usuario2,_contrasena2,_fecha,_presupuesto,_objetivos,_necesidades,_supuestos,_restricciones,_moonboard]) { c.dispose(); } super.dispose(); }
  String? _obligatorio(String? v) => v == null || v.trim().isEmpty ? 'Este campo es obligatorio.' : null;
  String? _dni(String? v) => _obligatorio(v) ?? (RegExp(r'^\d{8}$').hasMatch(v!.trim()) ? null : 'Ingresa un DNI de 8 dígitos.');
  void _copiarDni(bool value) => setState(() { _usarDni = value; if (value) { _usuario1.text = _dni1.text; _contrasena1.text = _dni1.text; _usuario2.text = _dni2.text; _contrasena2.text = _dni2.text; } });
  void _volver() { if (_paso == 1) context.go('/matrimonios'); else setState(() => _paso--); }
  void _siguiente() { if (_paso < 4 && !_form.currentState!.validate()) return; if (_paso == 2 && (_tipoCeremonia == null || _fecha.text.isEmpty || _presupuesto.text.isEmpty || _invitados < 1)) { AppSnackbar.show(context, message: 'Completa los datos obligatorios del matrimonio.', type: AppSnackbarType.warning); return; } if (_paso == 4) { AppSnackbar.show(context, message: 'Matrimonio creado correctamente.', type: AppSnackbarType.success); context.go('/home'); return; } setState(() => _paso++); }
  String get _tituloPaso => ['Datos de la pareja', 'Datos base', 'Objetivos y necesidades', 'Resumen'][_paso - 1];
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
  @override Widget build(BuildContext context) {
    if (_mostrandoIntro) return Stack(children: [const _InicioProyecto(), Positioned(bottom: 72, left: 0, right: 0, child: Text('Continuamos en $_segundosRestantes s', textAlign: TextAlign.center, style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: AppColors.textSecondary))), Positioned(right: 16, bottom: 12, child: TextButton(onPressed: () { _introTimer?.cancel(); setState(() => _mostrandoIntro = false); }, child: const Text('SKIP')))]);
    return Scaffold(backgroundColor: const Color(0xFFFDFBFF), body: SafeArea(child: Center(child: ConstrainedBox(constraints: const BoxConstraints(maxWidth: 620), child: Form(key: _form, child: SingleChildScrollView(padding: const EdgeInsets.fromLTRB(24, 12, 24, 36), child: Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
      Align(alignment: Alignment.centerLeft, child: AppButton(label: 'Volver', variant: AppButtonVariant.tertiary, icon: Icons.arrow_back, onPressed: _volver)), const SizedBox(height: AppSpacing.md),
      Text('Crear matrimonio', textAlign: TextAlign.center, style: Theme.of(context).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.w800)), const SizedBox(height: AppSpacing.xs),
      Text('Paso $_paso de 4: $_tituloPaso', textAlign: TextAlign.center, style: Theme.of(context).textTheme.bodyLarge?.copyWith(color: AppColors.textSecondary)),
      const SizedBox(height: AppSpacing.lg), _IndicadorPasos(actual: _paso), const SizedBox(height: AppSpacing.lg), const _Informacion(), const SizedBox(height: AppSpacing.lg), _contenidoPaso(), const SizedBox(height: AppSpacing.xl),
      Row(children: [if (_paso > 1) AppButton(label: 'Guardar borrador', variant: AppButtonVariant.tertiary, onPressed: () => AppSnackbar.show(context, message: 'Borrador guardado correctamente.', type: AppSnackbarType.success)), const Spacer(), AppButton(label: _paso == 4 ? 'Comenzar' : 'Siguiente', icon: Icons.arrow_forward, onPressed: _siguiente)]),
    ])))))));
  }
  Widget _contenidoPaso() { if (_paso == 1) return _pareja(); if (_paso == 2) return _datosBase(); if (_paso == 3) return _objetivosNecesidades(); return _resumen(); }
  Widget _pareja() => Column(children: [_campo('Nombre(s) de la pareja 1', _nombres1), _campo('Apellido paterno de la pareja 1', _apellido1), _campo('DNI de la pareja 1', _dni1, dni: true), _campo('Usuario de la pareja 1', _usuario1, enabled: !_usarDni), _campo('Contraseña de la pareja 1', _contrasena1, enabled: !_usarDni, password: true), const SizedBox(height: 8), _campo('Nombre(s) de la pareja 2', _nombres2), _campo('Apellido paterno de la pareja 2', _apellido2), _campo('DNI de la pareja 2', _dni2, dni: true), _campo('Usuario de la pareja 2', _usuario2, enabled: !_usarDni), _campo('Contraseña de la pareja 2', _contrasena2, enabled: !_usarDni, password: true), AppCheckbox(label: 'Usar DNI como usuario y contraseña', value: _usarDni, onChanged: _copiarDni)]);
  Widget _campo(String label, TextEditingController c, {bool dni=false, bool enabled=true, bool password=false}) => Padding(padding: const EdgeInsets.only(bottom: 16), child: AppTextField(label: label, controller: c, required: true, enabled: enabled, obscureText: password, prefixIcon: Icon(password ? Icons.lock_outline : dni ? Icons.badge_outlined : label.startsWith('Usuario') ? Icons.person_outline : Icons.person_outline), keyboardType: dni ? TextInputType.number : null, inputFormatters: dni ? [FilteringTextInputFormatter.digitsOnly, LengthLimitingTextInputFormatter(8)] : null, onChanged: dni && _usarDni ? (_) => _copiarDni(true) : null, validator: dni ? _dni : _obligatorio));
  Widget _datosBase() => Column(children: [_campo('Fecha del matrimonio', _fecha), _campo('Presupuesto estimado (S/.)', _presupuesto), AppNumberField(label: 'Cantidad estimada de invitados', min: 1, initialValue: _invitados, onChanged: (v) => _invitados = v.toInt()), const SizedBox(height: 16), AppSelectField(label: 'Ciudad / Ubicación', hintText: 'Selecciona una ubicación', initialValue: _ubigeo, options: const [AppSelectOption(value: '150101', label: 'Lima / Lima / Lima'), AppSelectOption(value: '130101', label: 'Trujillo / Trujillo / La Libertad')], onChanged: (v) => setState(() => _ubigeo = v)), const SizedBox(height: 16), AppSelectField(label: 'Tipo de ceremonia', initialValue: _tipoCeremonia, options: const [AppSelectOption(value: 'RELIGIOSO', label: 'Religiosa'), AppSelectOption(value: 'CIVIL', label: 'Civil'), AppSelectOption(value: 'RELIGIOSO_Y_CIVIL', label: 'Religiosa y civil'), AppSelectOption(value: 'SIMBOLICO', label: 'Simbólica')], onChanged: (v) => setState(() => _tipoCeremonia = v))]);
  Widget _area(String label, TextEditingController c) => Padding(padding: const EdgeInsets.only(bottom: 16), child: AppTextField(label: label, controller: c, maxLines: 4));
  Widget _objetivosNecesidades() => Column(children: [_area('Objetivos', _objetivos), _area('Necesidades', _necesidades), _area('Supuestos', _supuestos), _area('Restricciones', _restricciones), _area('Ideas para el moonboard', _moonboard)]);
  Widget _resumen() => Column(children: [_ResumenCard(icon: Icons.people_outline, title: 'Datos de la pareja', texto: '${nombres1.text} ${apellido1.text} · DNI ${dni1.text}\n${nombres2.text} ${apellido2.text} · DNI ${dni2.text}', onEdit: () => setState(() => _paso = 1)), const SizedBox(height: 12), _ResumenCard(icon: Icons.favorite_outline, title: 'Datos del matrimonio', texto: 'Fecha: ${fecha.text}\nPresupuesto: S/. ${presupuesto.text}\nInvitados: $_invitados\nLugar: ${ubigeo ?? 'Sin definir'}', onEdit: () => setState(() => _paso = 2)), const SizedBox(height: 12), _ResumenCard(icon: Icons.lightbulb_outline, title: 'Objetivos y necesidades', texto: 'Objetivo\n${objetivos.text}\n\nNecesidades\n${necesidades.text}\n\nRestricciones\n${restricciones.text}\n\nSupuestos\n${supuestos.text}\n\nIdeas para el moonboard\n${moonboard.text}', onEdit: () => setState(() => _paso = 3))]);
}
class _InicioProyecto extends StatelessWidget { const _InicioProyecto(); @override Widget build(BuildContext context) => Scaffold(backgroundColor: const Color(0xFFFDFBFF), body: SafeArea(child: Center(child: Padding(padding: const EdgeInsets.all(32), child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [const Text('Inicio de proyecto', style: TextStyle(fontSize: 28, fontWeight: FontWeight.w800)), const SizedBox(height: 28), Image.asset('assets/images/logoWP.webp', height: 112, fit: BoxFit.contain), const SizedBox(height: 28), const Text('Comienza la planificación', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w700)), const SizedBox(height: 12), const Text('En esta fase se registran los datos básicos del matrimonio para iniciar la planificación del proyecto', textAlign: TextAlign.center)]))))); }
class _IndicadorPasos extends StatelessWidget { const _IndicadorPasos({required this.actual}); final int actual; @override Widget build(BuildContext context) => Row(children: List.generate(4, (i) { final n=i+1, activo=n<=actual; return Expanded(child: Row(children: [CircleAvatar(radius: 15, backgroundColor: activo ? AppColors.primary : AppColors.disabledBackground, foregroundColor: activo ? Colors.white : AppColors.textSecondary, child: Text('$n')), if(n<4) Expanded(child: Container(height: 2, color: n<actual ? AppColors.primary : AppColors.border))])); })); }
class _Informacion extends StatelessWidget { const _Informacion(); @override Widget build(BuildContext context) => Container(padding: const EdgeInsets.all(16), decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(12), border: Border.all(color: AppColors.border)), child: const Row(children: [Icon(Icons.info_outline, color: AppColors.primary), SizedBox(width: 12), Text('Información')])); }
class _ResumenCard extends StatelessWidget { const _ResumenCard({required this.icon, required this.title, required this.texto, required this.onEdit}); final IconData icon; final String title, texto; final VoidCallback onEdit; @override Widget build(BuildContext context) => Card(child: Padding(padding: const EdgeInsets.all(16), child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [CircleAvatar(backgroundColor: const Color(0xFFE9E2F7), foregroundColor: AppColors.primary, child: Icon(icon)), const SizedBox(width: 12), Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [Text(title, style: const TextStyle(fontWeight: FontWeight.w800)), const SizedBox(height: 8), Text(texto)])), IconButton(onPressed: onEdit, icon: const Icon(Icons.edit_outlined), tooltip: 'Editar')]))); }
