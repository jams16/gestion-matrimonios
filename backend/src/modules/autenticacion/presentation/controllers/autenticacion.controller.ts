import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  LoginDto,
  RefreshTokenDto,
  RegisterDto,
  ResetPasswordDto,
  SolicitarTokenDto,
  TokenCuentaDto,
  SolicitarRegistroDto,
  FinalizarRegistroDto,
  ConfirmarRegistroPendienteDto,
} from '../../application/dto/autenticacion.dto';
import {
  CerrarSesionUseCase,
  ConfirmarCorreoUseCase,
  IniciarSesionUseCase,
  RecuperarContrasenaUseCase,
  RefrescarSesionUseCase,
  RegistrarUsuarioUseCase,
  SolicitarVerificacionCorreoUseCase,
  RegistroPendienteUseCase,
} from '../../application/use-cases/autenticacion.use-cases';

@ApiTags('Autenticación')
@Controller('auth')
export class AutenticacionController {
  constructor(
    private readonly registrar: RegistrarUsuarioUseCase,
    private readonly login: IniciarSesionUseCase,
    private readonly refresh: RefrescarSesionUseCase,
    private readonly logout: CerrarSesionUseCase,
    private readonly verificar: SolicitarVerificacionCorreoUseCase,
    private readonly confirmar: ConfirmarCorreoUseCase,
    private readonly recuperacion: RecuperarContrasenaUseCase,
    private readonly registroPendiente: RegistroPendienteUseCase,
  ) {}
  @Post('registrar')
  @ApiOperation({
    summary: 'Registrar un usuario y enviar el correo de confirmación',
  })
  @ApiCreatedResponse({ description: 'Usuario creado correctamente.' })
  async registrarUsuario(@Body() dto: RegisterDto) {
    return {
      mensaje:
        'Usuario creado correctamente. Revisa tu correo para confirmar la cuenta.',
      data: await this.registrar.execute(dto),
    };
  }
  @Post('registro/solicitar')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Enviar correo para iniciar el registro' })
  @ApiOkResponse({ description: 'Correo de registro enviado correctamente.' })
  async solicitarRegistro(
    @Body() dto: SolicitarRegistroDto,
  ) {
    await this.registroPendiente.solicitar(dto);
    return {
      mensaje: 'Revisa tu correo para confirmar tu identidad.',
      data: null,
    };
  }
  @Post('registro/confirmar')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Confirmar el correo del registro pendiente' })
  async confirmarRegistro(
    @Body() dto: ConfirmarRegistroPendienteDto,
  ) {
    await this.registroPendiente.confirmar(dto.token);
    return { mensaje: 'Correo confirmado correctamente.', data: null };
  }
  @Post('registro/finalizar')
  @ApiCreatedResponse({ description: 'Cuenta Wedding Planner creada.' })
  @ApiOperation({ summary: 'Finalizar registro de Wedding Planner' })
  async finalizarRegistro(
    @Body() dto: FinalizarRegistroDto,
  ) {
    return {
      mensaje: 'Cuenta creada correctamente.',
      data: await this.registroPendiente.finalizar(dto),
    };
  }
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiOkResponse({ description: 'Inicio de sesión correcto.' })
  async iniciarSesion(@Body() dto: LoginDto) {
    return {
      mensaje: 'Inicio de sesión correcto.',
      data: await this.login.execute(dto),
    };
  }
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Rotar refresh token' })
  async refrescar(@Body() dto: RefreshTokenDto) {
    return {
      mensaje: 'Sesión actualizada correctamente.',
      data: await this.refresh.execute(dto.refreshToken),
    };
  }
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Revocar la sesión indicada por el refresh token' })
  async cerrarSesion(@Body() dto: RefreshTokenDto) {
    await this.logout.execute(dto.refreshToken);
    return { mensaje: 'Sesión cerrada correctamente.', data: null };
  }
  @Post('verificar-correo/solicitar')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Enviar correo con botón Sí, soy yo' })
  async solicitarVerificacion(@Body() dto: SolicitarTokenDto) {
    await this.verificar.execute(dto);
    return {
      mensaje: 'Si la cuenta existe, se envió un correo de verificación.',
      data: null,
    };
  }
  @Post('verificar-correo/confirmar')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Confirmar el correo usando el token del enlace' })
  async confirmarCorreo(@Body() dto: TokenCuentaDto) {
    await this.confirmar.execute(dto.token);
    return { mensaje: 'Correo verificado correctamente.', data: null };
  }
  @Post('recuperar-contrasena/solicitar')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Solicitar correo de recuperación' })
  async solicitarRecuperacion(@Body() dto: SolicitarTokenDto) {
    await this.recuperacion.solicitar(dto);
    return {
      mensaje: 'Si la cuenta existe, se envió un correo de recuperación.',
      data: null,
    };
  }
  @Post('recuperar-contrasena/confirmar')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Restablecer contraseña con token de correo' })
  async confirmarRecuperacion(@Body() dto: ResetPasswordDto) {
    await this.recuperacion.confirmar(dto);
    return { mensaje: 'Contraseña actualizada correctamente.', data: null };
  }
}
