import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../../../app/theme/app_colors.dart';
import '../../../../core/widgets/inputs/app_text_field.dart';
import '../../../../core/widgets/overlays/app_dialog.dart';
import '../../../../core/widgets/page_patterns/app_wizard_page_pattern.dart';
import '../../../../app/router/route_names.dart';
import '../../infrastructure/auth_api.dart';
import '../../infrastructure/auth_session.dart';

class RegistrarsePage extends StatefulWidget {
  const RegistrarsePage({super.key});
  @override
  State<RegistrarsePage> createState() => _RegistrarsePageState();
}

class _RegistrarsePageState extends State<RegistrarsePage> {
  int _paso = 0;
  bool _cargando = false;
  bool _correoSolicitado = false;
  bool _correoVerificado = false;
  bool _aceptaTerminos = false;
  bool _aceptaPrivacidad = false;
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

  Future<void> _mostrarDocumentoLegal({required bool privacidad}) async {
    final titulo = privacidad ? 'Política de privacidad' : 'Términos y condiciones';
    final secciones = privacidad ? _politicaPrivacidad : _terminosCondiciones;
    await AppDialog.show<void>(
      context,
      title: titulo,
      icon: privacidad ? Icons.privacy_tip_outlined : Icons.gavel_outlined,
      maxWidth: 680,
      content: SizedBox(
        height: (MediaQuery.sizeOf(context).height.clamp(360.0, 560.0) * .72)
            .toDouble(),
        child: Scrollbar(
          thumbVisibility: true,
          child: SingleChildScrollView(
            padding: const EdgeInsets.only(right: 12),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Última actualización: 16 de noviembre de 2026',
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: AppColors.textSecondary,
                  ),
                ),
                const SizedBox(height: 16),
                for (final seccion in secciones) ...[
                  Text(
                    seccion.$1,
                    style: Theme.of(context).textTheme.titleSmall?.copyWith(
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Text(seccion.$2, style: Theme.of(context).textTheme.bodyMedium),
                  const SizedBox(height: 18),
                ],
              ],
            ),
          ),
        ),
      ),
      actions: [
        FilledButton(
          onPressed: () => Navigator.of(context).pop(),
          child: const Text('Entendido'),
        ),
      ],
    );
  }

  Widget _consentimientos() => Container(
    padding: const EdgeInsets.all(12),
    decoration: BoxDecoration(
      color: const Color(0xFFF9F7FC),
      borderRadius: BorderRadius.circular(12),
      border: Border.all(color: AppColors.border.withValues(alpha: .55)),
    ),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const SizedBox(height: 4),
        Text(
          'Revisa y acepta ambos documentos para continuar.',
          style: Theme.of(context).textTheme.bodySmall?.copyWith(
            color: AppColors.textSecondary,
          ),
        ),
        const SizedBox(height: 8),
        _LegalConsent(
          value: _aceptaTerminos,
          prefix: 'Acepto los ',
          linkText: 'Términos y condiciones',
          onChanged: (value) => setState(() => _aceptaTerminos = value),
          onOpen: () => _mostrarDocumentoLegal(privacidad: false),
        ),
        _LegalConsent(
          value: _aceptaPrivacidad,
          prefix: 'Acepto la ',
          linkText: 'Política de privacidad',
          onChanged: (value) => setState(() => _aceptaPrivacidad = value),
          onOpen: () => _mostrarDocumentoLegal(privacidad: true),
        ),
      ],
    ),
  );

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
          if (_correoSolicitado && !_correoVerificado) ...[
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
          if (_correoVerificado) ...[
            const SizedBox(height: 16),
            const _CorreoVerificado(),
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
    if (_paso == 2 && (!_aceptaTerminos || !_aceptaPrivacidad)) {
      _mensaje('Debes aceptar los Términos y condiciones y la Política de privacidad.');
      return;
    }
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
        if (_correoVerificado) {
          setState(() => _paso = 1);
          return;
        }
        await AuthApi().confirmarRegistro(_token.text.trim());
        if (!mounted) return;
        setState(() {
          _correoVerificado = true;
          _paso = 1;
        });
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
        'confirmacionContrasena': _confirmacion.text,
        'nombreComercial': _empresa.text.trim(),
        'ruc': _ruc.text.trim(),
        'telefono': _telefono.text.trim(),
        'correoCorporativo': _corporativo.text.trim(),
      });
      final sesion = await AuthApi().iniciarSesion(
        usuarioOCorreo: _usuario.text.trim(),
        contrasena: _clave.text,
      );
      final usuario = Map<String, dynamic>.from(sesion['usuario'] as Map);
      final nombreCompleto =
          usuario['nombreCompleto']?.toString() ??
          '${_nombres.text.trim()} ${_paterno.text.trim()}'.trim();
      await AuthSession.guardar(
        refreshToken: sesion['refreshToken'].toString(),
        accessToken: sesion['accessToken'].toString(),
        nombreCompleto: nombreCompleto,
        persistir: true,
      );
      if (mounted) {
        context.go(RouteNames.registroExitoso, extra: nombreCompleto);
      }
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
                    footer: _paso == 2 ? _consentimientos() : null,
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

class _LegalConsent extends StatefulWidget {
  const _LegalConsent({
    required this.value,
    required this.prefix,
    required this.linkText,
    required this.onChanged,
    required this.onOpen,
  });

  final bool value;
  final String prefix;
  final String linkText;
  final ValueChanged<bool> onChanged;
  final VoidCallback onOpen;

  @override
  State<_LegalConsent> createState() => _LegalConsentState();
}

class _CorreoVerificado extends StatelessWidget {
  const _CorreoVerificado();

  @override
  Widget build(BuildContext context) => Container(
    width: double.infinity,
    padding: const EdgeInsets.all(12),
    decoration: BoxDecoration(
      color: const Color(0xFFE8F5E9),
      borderRadius: BorderRadius.circular(12),
    ),
    child: const Row(
      children: [
        Icon(Icons.verified_outlined, color: AppColors.success),
        SizedBox(width: 10),
        Expanded(
          child: Text(
            'Correo verificado. Puedes continuar o volver a revisar tus datos.',
          ),
        ),
      ],
    ),
  );
}

class _LegalConsentState extends State<_LegalConsent> {
  bool _hover = false;

  @override
  Widget build(BuildContext context) => Row(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      Checkbox(
        value: widget.value,
        visualDensity: VisualDensity.compact,
        onChanged: (value) => widget.onChanged(value ?? false),
      ),
      const SizedBox(width: 4),
      Expanded(
        child: Padding(
          padding: const EdgeInsets.only(top: 10),
          child: Wrap(
            crossAxisAlignment: WrapCrossAlignment.center,
            children: [
              Text(widget.prefix, style: Theme.of(context).textTheme.bodyMedium),
              MouseRegion(
                cursor: SystemMouseCursors.click,
                onEnter: (_) => setState(() => _hover = true),
                onExit: (_) => setState(() => _hover = false),
                child: GestureDetector(
                  onTap: widget.onOpen,
                  child: Text(
                    widget.linkText,
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: _hover ? AppColors.secondary : AppColors.primary,
                      fontWeight: FontWeight.w700,
                      decoration: TextDecoration.underline,
                      decorationThickness: _hover ? 2 : 1,
                    ),
                  ),
                ),
              ),
              const Text('.'),
            ],
          ),
        ),
      ),
    ],
  );
}

typedef _LegalSection = (String, String);

const List<_LegalSection> _terminosCondiciones = [
  ('1. Finalidad de la aplicación', 'La aplicación está diseñada para apoyar a Wedding Planners en la planificación, organización, seguimiento y coordinación de matrimonios mediante herramientas relacionadas con actividades, cronogramas, timing, hitos, presupuesto, invitados, proveedores y otros elementos de gestión.'),
  ('2. Registro y cuenta de usuario', 'Podrán crear una cuenta las personas que proporcionen información válida y acepten los presentes Términos y Condiciones y la Política de Privacidad. El usuario es responsable de mantener la confidencialidad de sus credenciales de acceso y de las acciones realizadas desde su cuenta.'),
  ('3. Información registrada', 'El usuario es responsable de que la información ingresada en la aplicación sea correcta y de contar con la autorización necesaria cuando registre información personal de parejas, invitados, proveedores u otras personas.'),
  ('4. Uso adecuado', 'La aplicación deberá utilizarse únicamente para fines legítimos relacionados con la gestión de matrimonios. No está permitido utilizarla para registrar información falsa, vulnerar derechos de terceros, realizar actividades ilícitas o intentar afectar el funcionamiento o seguridad de la plataforma.'),
  ('5. Plantillas y recomendaciones', 'Los cronogramas, timings, hitos, actividades, tiempos y demás plantillas proporcionadas por la aplicación son herramientas de apoyo y referencia. La Wedding Planner es responsable de revisar, modificar y adaptar estas propuestas según las características y necesidades específicas de cada matrimonio.'),
  ('6. Propiedad intelectual', 'El diseño, estructura, contenidos y funcionalidades propias de la aplicación se encuentran protegidos por las normas aplicables sobre propiedad intelectual. La información registrada por los usuarios continuará perteneciendo a sus respectivos titulares.'),
  ('7. Suspensión o eliminación de cuentas', 'La aplicación podrá restringir, suspender o eliminar cuentas cuando exista un incumplimiento de estos términos, un uso indebido de la plataforma o una situación que comprometa su seguridad. El usuario podrá solicitar la eliminación de su cuenta conforme a los mecanismos disponibles en la aplicación.'),
  ('8. Limitación de responsabilidad', 'La aplicación busca facilitar la organización de matrimonios, pero no garantiza que las recomendaciones, tiempos o plantillas sean aplicables a todos los eventos. Las decisiones finales relacionadas con la planificación y ejecución del matrimonio corresponden a la Wedding Planner y a los demás responsables involucrados.'),
  ('9. Modificaciones', 'Estos Términos y Condiciones podrán actualizarse cuando existan cambios en las funcionalidades de la aplicación o cuando sea necesario adecuarlos a nuevas disposiciones legales. Los cambios relevantes serán comunicados a los usuarios.'),
  ('10. Contacto', 'Para consultas relacionadas con estos Términos y Condiciones, puede comunicarse a: a20186054@pucp.edu.pe.'),
];

const List<_LegalSection> _politicaPrivacidad = [
  ('1. Datos que se recopilan', 'La aplicación podrá recopilar datos como nombre, correo electrónico, información de la cuenta y datos necesarios para gestionar matrimonios. La Wedding Planner podrá registrar información de parejas, invitados, proveedores, responsables y otras personas vinculadas al evento, como nombres, teléfonos, correos electrónicos y datos necesarios para la planificación.'),
  ('2. Finalidad del tratamiento', 'Los datos serán utilizados para permitir el funcionamiento de la aplicación, gestionar las cuentas de usuario, organizar matrimonios, administrar actividades, invitados, proveedores, presupuestos y demás funcionalidades ofrecidas. No se utilizarán los datos para finalidades diferentes sin informar previamente al usuario cuando corresponda.'),
  ('3. Datos de terceros', 'Cuando una Wedding Planner registre información personal de otras personas, será responsable de contar con la autorización o base legal correspondiente para utilizar dichos datos dentro de la aplicación.'),
  ('4. Acceso a la información', 'La información podrá ser consultada únicamente por usuarios autorizados y por los proveedores tecnológicos necesarios para prestar el servicio, de acuerdo con las funciones y permisos establecidos en la aplicación. Los datos no serán vendidos ni cedidos a terceros para fines comerciales sin autorización.'),
  ('5. Almacenamiento', 'Los datos podrán almacenarse mediante proveedores tecnológicos utilizados para el funcionamiento de la aplicación, aplicando medidas razonables para proteger su confidencialidad, integridad y disponibilidad.'),
  ('6. Conservación y eliminación', 'Los datos se conservarán mientras la cuenta se encuentre activa o mientras sean necesarios para cumplir las finalidades para las cuales fueron recopilados. El usuario podrá solicitar la eliminación de su cuenta y de sus datos cuando corresponda, salvo obligación legal de conservación.'),
  ('7. Derechos sobre los datos personales', 'Los titulares de datos personales podrán solicitar, cuando corresponda, el acceso, actualización, rectificación, oposición o eliminación de sus datos personales, de acuerdo con la Ley N.° 29733, Ley de Protección de Datos Personales, y su normativa vigente.'),
  ('8. Seguridad', 'La aplicación implementará medidas técnicas y organizativas razonables destinadas a evitar el acceso, pérdida, modificación o divulgación no autorizada de información personal.'),
  ('9. Cambios en la Política de Privacidad', 'Esta política podrá actualizarse debido a cambios en las funcionalidades de la aplicación o en la normativa aplicable. Los cambios relevantes serán informados a los usuarios.'),
  ('10. Contacto', 'Para consultas o solicitudes relacionadas con el tratamiento de datos personales, puede comunicarse a: a20186054@pucp.edu.pe.'),
];
