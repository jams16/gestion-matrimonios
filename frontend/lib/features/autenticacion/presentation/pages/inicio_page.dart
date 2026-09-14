import 'package:flutter/material.dart';
class InicioPage extends StatelessWidget {
  const InicioPage({super.key, this.nombre});
  final Object? nombre;
  @override Widget build(BuildContext context) => Scaffold(body: Center(child: Text(
    nombre == null ? 'Bienvenid@' : 'Bienvenid@, ' + nombre.toString(),
    style: Theme.of(context).textTheme.headlineMedium)));
}
