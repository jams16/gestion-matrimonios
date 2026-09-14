import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/widgets/buttons/app_button.dart';
import '../../../../core/widgets/inputs/app_text_field.dart';
import '../../../../core/widgets/page_patterns/app_login_page_pattern.dart';
import '../widgets/auth_hero.dart';

class RecuperarContrasenaPage extends StatelessWidget {
  const RecuperarContrasenaPage({super.key});
  @override Widget build(BuildContext context) => Scaffold(body: Stack(children: [
    Positioned(top: 12,left: 8,child: TextButton.icon(onPressed:()=>context.go('/iniciar-sesion'),icon:const Icon(Icons.arrow_back),label:const Text('Volver'))),
    AppLoginPagePattern(logo:const AuthHero(),title:'Recupera tu contraseña',description:'Indica tu usuario y correo para enviarte un enlace seguro.',form:Column(children:[
      const AppTextField(label:'Usuario',required:true),const SizedBox(height:16),
      const AppTextField(label:'Correo electrónico',required:true),const SizedBox(height:24),
      AppButton(label:'Enviar enlace',expanded:true,onPressed:()=>ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content:Text('Si la cuenta existe, enviamos un enlace a tu correo.')))),
    ])),
  ]));
}
