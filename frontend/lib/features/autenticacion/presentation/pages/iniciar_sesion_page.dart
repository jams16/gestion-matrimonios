import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/widgets/buttons/app_button.dart';
import '../../../../core/widgets/inputs/app_password_field.dart';
import '../../../../core/widgets/inputs/app_text_field.dart';
import '../../../../core/widgets/page_patterns/app_login_page_pattern.dart';
import '../widgets/auth_hero.dart';

class IniciarSesionPage extends StatefulWidget { const IniciarSesionPage({super.key}); @override State<IniciarSesionPage> createState() => _IniciarSesionPageState(); }
class _IniciarSesionPageState extends State<IniciarSesionPage> {
  final _form = GlobalKey<FormState>(); final _usuario = TextEditingController(); final _clave = TextEditingController(); bool _recordarme = false;
  String? _required(String? value) => value == null || value.trim().isEmpty ? 'Este campo es obligatorio.' : null;
  @override void dispose() { _usuario.dispose(); _clave.dispose(); super.dispose(); }
  @override Widget build(BuildContext context) => Scaffold(
    body: Stack(children: [
      Positioned(top: 12, left: 8, child: TextButton.icon(onPressed: () => context.go('/bienvenida'), icon: const Icon(Icons.arrow_back), label: const Text('Volver'))),
      AppLoginPagePattern(
        logo: const AuthHero(), title: 'Inicio de sesión',
        description: 'Ingresa tus credenciales para continuar con la planificación.',
        form: Form(key: _form, child: Column(children: [
          AppTextField(label: 'Usuario o correo', controller: _usuario, required: true, prefixIcon: const Icon(Icons.person_outline), validator: _required),
          const SizedBox(height: 20),
          AppPasswordField(label: 'Contraseña', controller: _clave, validator: _required),
          const SizedBox(height: 16),
          Row(children: [
            Checkbox(value: _recordarme, onChanged: (value) => setState(() => _recordarme = value ?? false)),
            const Text('Recordarme'), const Spacer(),
            TextButton(onPressed: () => context.go('/recuperar-contrasena'), child: const Text('¿Olvidaste tu contraseña?')),
          ]),
          const SizedBox(height: 16),
          AppButton(label: 'Iniciar sesión', expanded: true, onPressed: () {
            if (_form.currentState!.validate()) context.go('/', extra: _usuario.text.trim());
          }),
        ])),
        footer: Center(child: TextButton(onPressed: () => context.go('/registrarse'), child: const Text('Crear una nueva cuenta'))),
      ),
    ]),
  );
}
