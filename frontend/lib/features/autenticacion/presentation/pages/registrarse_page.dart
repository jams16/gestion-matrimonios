import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/widgets/inputs/app_text_field.dart';
import '../../../../core/widgets/page_patterns/app_wizard_page_pattern.dart';

class RegistrarsePage extends StatefulWidget { const RegistrarsePage({super.key}); @override State<RegistrarsePage> createState() => _RegistrarsePageState(); }
class _RegistrarsePageState extends State<RegistrarsePage> {
  int _paso = 0; final _form = GlobalKey<FormState>(); final _nombres = TextEditingController(); final _paterno = TextEditingController(); final _correo = TextEditingController(); final _usuario = TextEditingController(); final _clave = TextEditingController(); final _confirmacion = TextEditingController();
  String? _requerido(String? value) => value == null || value.trim().isEmpty ? 'Este campo es obligatorio.' : null;
  String? _correoValido(String? value) => _requerido(value) ?? (!RegExp(r'^[^@\s]+@[^@\s]+\.[^@\s]+$').hasMatch(value!) ? 'Ingresa un correo electrónico válido.' : null);
  String? _contrasena(String? value) => _requerido(value) ?? (!RegExp(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$').hasMatch(value!) ? 'Debe tener 8 caracteres, mayúscula, minúscula y número.' : null);
  Widget _contenido() {
    if (_paso == 0) return Column(children: [AppTextField(label:'Nombres',controller:_nombres,required:true,validator:_requerido),const SizedBox(height:12),AppTextField(label:'Apellido paterno',controller:_paterno,required:true,validator:_requerido),const SizedBox(height:12),const AppTextField(label:'Apellido materno'),const SizedBox(height:12),AppTextField(label:'Correo electrónico',controller:_correo,required:true,validator:_correoValido)]);
    if (_paso == 1) return Column(children: [AppTextField(label:'Usuario',controller:_usuario,required:true,validator:_requerido),const SizedBox(height:12),AppTextField(label:'Contraseña',controller:_clave,required:true,obscureText:true,validator:_contrasena),const SizedBox(height:12),AppTextField(label:'Confirmación de contraseña',controller:_confirmacion,required:true,obscureText:true,validator:(v)=>v != _clave.text ? 'Las contraseñas no coinciden.' : _requerido(v))]);
    return const Column(children:[AppTextField(label:'Nombre comercial de empresa',required:true),SizedBox(height:12),AppTextField(label:'RUC'),SizedBox(height:12),AppTextField(label:'Teléfono'),SizedBox(height:12),AppTextField(label:'Correo corporativo')]);
  }
  void _siguiente() {
    if (!_form.currentState!.validate()) return;
    if (_paso == 0) { ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content:Text('Revisa tu correo y confirma con el botón “Sí, soy yo” para continuar.'))); return; }
    if (_paso < 2) { setState(() => _paso++); } else { context.go('/', extra: _nombres.text + ' ' + _paterno.text); }
  }
  @override Widget build(BuildContext context) => Scaffold(body: SafeArea(child: Stack(children:[
    Positioned(top:12,left:8,child:TextButton.icon(onPressed:()=>context.go('/bienvenida'),icon:const Icon(Icons.arrow_back),label:const Text('Volver'))),
    Center(child:SingleChildScrollView(padding:const EdgeInsets.all(24),child:ConstrainedBox(constraints:const BoxConstraints(maxWidth:640),child:Form(key:_form,child:AppWizardPagePattern(title:'Crea tu cuenta',description:'Completa tus datos para trabajar con tu Wedding Planner.',steps:const[AppWizardStep(title:'Tus datos'),AppWizardStep(title:'Acceso'),AppWizardStep(title:'Empresa')],currentStep:_paso,content:_contenido(),onPrevious:_paso==0?null:()=>setState(()=>_paso--),onNext:_siguiente,finishLabel:'Crear cuenta'))))),
  ])));
}
