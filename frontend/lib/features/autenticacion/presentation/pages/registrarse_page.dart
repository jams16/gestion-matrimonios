import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../../../core/widgets/inputs/app_text_field.dart';
import '../../../../core/widgets/page_patterns/app_wizard_page_pattern.dart';
import '../../infrastructure/auth_api.dart';

class RegistrarsePage extends StatefulWidget {
  const RegistrarsePage({super.key});
  @override
  State<RegistrarsePage> createState() => _RegistrarsePageState();
}

class _RegistrarsePageState extends State<RegistrarsePage> {
  int _paso = 0;
  bool _cargando = false;
  bool _correoSolicitado = false;
  final _form = GlobalKey<FormState>();
  final _nombres = TextEditingController();
  final _paterno = TextEditingController();
  final _materno = TextEditingController();
  final _correo = TextEditingController();
  final _token = TextEditingController();
  final _usuario = TextEditingController();
  final _clave = TextEditingController();
  final _confirmacion = TextEditingController();
  final _empresa = TextEditingController();
  final _ruc = TextEditingController();
  final _telefono = TextEditingController();
  final _corporativo = TextEditingController();

  String? _requerido(String? value) => value == null || value.trim().isEmpty
      ? 'Este campo es obligatorio.'
      : null;
  String? _correoValido(String? value) {
    final requerido = _requerido(value);
    if (requerido != null) return requerido;
    return !RegExp(r'^[^@\s]+@[^@\s]+\.[^@\s]+$').hasMatch(value!.trim())
        ? 'Ingresa un correo electrónico válido.'
        : null;
  }

  String? _contrasena(String? value) {
    final requerido = _requerido(value);
    if (requerido != null) return requerido;
    return !RegExp(
          r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$',
        ).hasMatch(value!)
        ? 'Usa 8 caracteres, mayúscula, minúscula, número y símbolo.'
        : null;
  }

  String? _rucValido(String? value) {
    if (value == null || value.trim().isEmpty) return null;
    return RegExp(r'^\d{11}$').hasMatch(value.trim())
        ? null
        : 'El RUC debe tener exactamente 11 dígitos.';
  }

  String? _telefonoValido(String? value) {
    if (value == null || value.trim().isEmpty) return null;
    return value.trim().length <= 15 ? null : 'Máximo 15 caracteres.';
  }

  void _mensaje(String texto) {
    ScaffoldMessenger.of(context)
      ..hideCurrentSnackBar()
      ..showSnackBar(SnackBar(content: Text(texto)));
  }

  Widget _contenido() {
    if (_paso == 0)
      return Column(
        children: [
          AppTextField(
            label: 'Nombres',
            controller: _nombres,
            required: true,
            validator: _requerido,
          ),
          const SizedBox(height: 12),
          AppTextField(
            label: 'Apellido paterno',
            controller: _paterno,
            required: true,
            validator: _requerido,
          ),
          const SizedBox(height: 12),
          AppTextField(label: 'Apellido materno', controller: _materno),
          const SizedBox(height: 12),
          AppTextField(
            label: 'Correo electrónico',
            controller: _correo,
            required: true,
            validator: _correoValido,
          ),
          if (_correoSolicitado) ...[
            const SizedBox(height: 20),
            AppTextField(
              label: 'Código de verificación',
              controller: _token,
              required: true,
              validator: (value) =>
                  RegExp(r'^\d{6}$').hasMatch(value?.trim() ?? '')
                  ? null
                  : 'Ingresa los 6 dígitos recibidos por correo.',
              helperText:
                  'Revisa tu correo e ingresa el código numérico de seis dígitos.',
            ),
          ],
        ],
      );
    if (_paso == 1)
      return Column(
        children: [
          AppTextField(
            label: 'Usuario',
            controller: _usuario,
            required: true,
            validator: _requerido,
          ),
          const SizedBox(height: 12),
          AppTextField(
            label: 'Contraseña',
            controller: _clave,
            required: true,
            obscureText: true,
            validator: _contrasena,
          ),
          const SizedBox(height: 12),
          AppTextField(
            label: 'Confirmación de contraseña',
            controller: _confirmacion,
            required: true,
            obscureText: true,
            validator: (value) =>
                _requerido(value) ??
                (value != _clave.text ? 'Las contraseñas no coinciden.' : null),
          ),
        ],
      );
    return Column(
      children: [
        AppTextField(
          label: 'Nombre comercial de empresa',
          controller: _empresa,
          required: true,
          validator: _requerido,
        ),
        const SizedBox(height: 12),
        AppTextField(label: 'RUC', controller: _ruc, validator: _rucValido),
        const SizedBox(height: 12),
        AppTextField(
          label: 'Teléfono',
          controller: _telefono,
          validator: _telefonoValido,
        ),
        const SizedBox(height: 12),
        AppTextField(
          label: 'Correo corporativo',
          controller: _corporativo,
          validator: (value) =>
              value == null || value.isEmpty ? null : _correoValido(value),
        ),
      ],
    );
  }

  String _mensajeError(DioException error) {
    final data = error.response?.data;
    if (data is Map && data['mensaje'] != null)
      return data['mensaje'].toString();
    return error.response == null
        ? 'No pudimos conectar con el servidor.'
        : 'No pudimos completar el registro.';
  }

  Future<void> _siguiente() async {
    if (!_form.currentState!.validate()) return;
    setState(() => _cargando = true);
    try {
      if (_paso == 0 && !_correoSolicitado) {
        await AuthApi().solicitarRegistro({
          'nombres': _nombres.text.trim(),
          'apellidoPaterno': _paterno.text.trim(),
          'apellidoMaterno': _materno.text.trim(),
          'correoElectronico': _correo.text.trim(),
        });
        if (!mounted) return;
        setState(() => _correoSolicitado = true);
        _mensaje(
          'Te enviamos un código de seis dígitos. Escríbelo para continuar.',
        );
        return;
      }
      if (_paso == 0) {
        await AuthApi().confirmarRegistro(_token.text.trim());
        if (!mounted) return;
        setState(() => _paso = 1);
        _mensaje('Correo confirmado. Crea tus credenciales.');
        return;
      }
      if (_paso == 1) {
        setState(() => _paso = 2);
        return;
      }
      await AuthApi().finalizarRegistro({
        'token': _token.text.trim(),
        'usuario': _usuario.text.trim(),
        'contrasena': _clave.text,
        'nombreComercial': _empresa.text.trim(),
        'ruc': _ruc.text.trim(),
        'telefono': _telefono.text.trim(),
        'correoCorporativo': _corporativo.text.trim(),
      });
      if (mounted)
        context.go(
          '/home',
          extra: _nombres.text.trim() + ' ' + _paterno.text.trim(),
        );
    } on DioException catch (error) {
      if (mounted) _mensaje(_mensajeError(error));
    } finally {
      if (mounted) setState(() => _cargando = false);
    }
  }

  @override
  void dispose() {
    for (final controller in [
      _nombres,
      _paterno,
      _materno,
      _correo,
      _token,
      _usuario,
      _clave,
      _confirmacion,
      _empresa,
      _ruc,
      _telefono,
      _corporativo,
    ]) {
      controller.dispose();
    }
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => Scaffold(
    body: SafeArea(
      child: Stack(
        children: [
          Positioned(
            top: 12,
            left: 8,
            child: TextButton.icon(
              onPressed: () => context.go('/bienvenida'),
              icon: const Icon(Icons.arrow_back),
              label: const Text('Volver'),
            ),
          ),
          Center(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(24),
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 640),
                child: Form(
                  key: _form,
                  child: AppWizardPagePattern(
                    title: 'Crea tu cuenta',
                    description: _paso == 0 && !_correoSolicitado
                        ? 'Cuéntanos primero quién eres.'
                        : 'Completa tus datos para empezar a planificar.',
                    steps: const [
                      AppWizardStep(title: 'Tus datos'),
                      AppWizardStep(title: 'Acceso'),
                      AppWizardStep(title: 'Empresa'),
                    ],
                    currentStep: _paso,
                    content: _contenido(),
                    onPrevious: _paso == 0
                        ? null
                        : () => setState(() => _paso--),
                    onNext: _cargando ? null : _siguiente,
                    nextLabel: _paso == 0 && !_correoSolicitado
                        ? 'Enviar correo'
                        : 'Continuar',
                    finishLabel: 'Crear cuenta',
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    ),
  );
}
