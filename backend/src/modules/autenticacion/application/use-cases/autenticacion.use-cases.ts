import { createHash, randomBytes, randomInt } from 'node:crypto';
import * as argon2 from 'argon2';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Temporal } from 'temporal-polyfill';

import {
  LoginDto,
  QueryUsuarioDto,
  RegisterDto,
  ResetPasswordDto,
  SolicitarTokenDto,
  UpdateUsuarioDto,
} from '../dto/autenticacion.dto';
import {
  FinalizarRegistroDto,
  SolicitarRegistroDto,
} from '../dto/autenticacion.dto';
import { CorreoCuentaPort } from '../ports/correo-cuenta.port';
import { AutenticacionRepository } from '../../domain/repositories/autenticacion.repository';
import { TipoTokenCuenta } from '../../domain/enums/tipo-token-cuenta.enum';

const hashToken = (token: string) =>
  createHash('sha256').update(token).digest('hex');
const tokenSeguro = () => randomBytes(32).toString('base64url');
const codigoRegistroSeguro = () => randomInt(100000, 1000000).toString();
const ahora = () => Temporal.Now.instant();
const enMs = (milisegundos: number) =>
  Temporal.Instant.fromEpochMilliseconds(Date.now() + milisegundos);
const expiro = (fecha: Temporal.Instant) =>
  Temporal.Instant.compare(fecha, ahora()) <= 0;
const esContrasenaSegura = (valor: string) =>
  /[a-z]/.test(valor) &&
  /[A-Z]/.test(valor) &&
  /\d/.test(valor) &&
  /[^A-Za-z0-9]/.test(valor);
const expiracionMs = (valor: string, defecto: number) => {
  const match = /^(\d+)\s*([smhd])$/.exec(valor);
  if (!match) return defecto;
  return (
    Number(match[1]) * ({ s: 1e3, m: 6e4, h: 36e5, d: 864e5 }[match[2]] ?? 1)
  );
};
const publico = <T extends { contrasenaHash: string }>(usuario: T) => {
  const { contrasenaHash: _hash, ...resultado } = usuario;
  return resultado;
};

@Injectable()
export class RegistrarUsuarioUseCase {
  constructor(
    private readonly repository: AutenticacionRepository,
    private readonly correo: CorreoCuentaPort,
  ) {}
  async execute(dto: RegisterDto) {
    if (!esContrasenaSegura(dto.contrasena))
      throw new BadRequestException(
        'La contraseña debe incluir mayúscula, minúscula, número y símbolo.',
      );
    if (await this.repository.usuarioExiste(dto.usuario))
      throw new ConflictException('El usuario ya está registrado.');
    const persona = await this.repository.personaExiste(dto.idPersonaNatural);
    if (!persona)
      throw new BadRequestException('La persona natural no existe.');
    if (dto.idEntidad && !(await this.repository.entidadExiste(dto.idEntidad)))
      throw new BadRequestException('La entidad no existe.');
    const usuario = await this.repository.crearUsuario({
      idPersonaNatural: dto.idPersonaNatural,
      idEntidad: dto.idEntidad ?? null,
      usuario: dto.usuario,
      tipoUsuario: dto.tipoUsuario,
      contrasenaHash: await argon2.hash(dto.contrasena, {
        type: argon2.argon2id,
      }),
      ultimoAcceso: ahora(),
    });
    await new SolicitarVerificacionCorreoUseCase(
      this.repository,
      this.correo,
    ).enviar(usuario.idUsuario, persona);
    return publico(usuario);
  }
}

@Injectable()
export class RegistroPendienteUseCase {
  constructor(
    private readonly repository: AutenticacionRepository,
    private readonly correo: CorreoCuentaPort,
  ) {}
  async solicitar(dto: SolicitarRegistroDto) {
    if (await this.repository.correoPersonaExiste(dto.correoElectronico))
      throw new ConflictException('El correo ya se encuentra registrado.');
    const token = codigoRegistroSeguro();
    await this.repository.crearRegistroPendiente({
      ...dto,
      apellidoMaterno: dto.apellidoMaterno ?? null,
      tokenHash: hashToken(token),
      fechaExpiracion: enMs(24 * 3600e3),
    });
    await this.correo.enviarRegistro(dto.correoElectronico, dto.nombres, token);
  }
  async confirmar(token: string) {
    const registro = await this.repository.obtenerRegistroPendiente(
      hashToken(token),
    );
    if (
      !registro ||
      registro.fechaVerificacion ||
      expiro(registro.fechaExpiracion)
    )
      throw new BadRequestException(
        'El enlace de registro es inválido o expiró.',
      );
    await this.repository.verificarRegistroPendiente(registro.idRegistro);
  }
  async finalizar(dto: FinalizarRegistroDto) {
    const registro = await this.repository.obtenerRegistroPendiente(
      hashToken(dto.token),
    );
    if (
      !registro ||
      !registro.fechaVerificacion ||
      expiro(registro.fechaExpiracion)
    )
      throw new BadRequestException(
        'Debes verificar tu correo antes de continuar.',
      );
    if (await this.repository.usuarioExiste(dto.usuario))
      throw new ConflictException('El usuario ya está registrado.');
    if (!esContrasenaSegura(dto.contrasena))
      throw new BadRequestException(
        'La contraseña debe incluir mayúscula, minúscula, número y símbolo.',
      );
    const persona = await this.repository.crearPersonaRegistro({
      nombres: registro.nombres,
      apellidoPaterno: registro.apellidoPaterno,
      apellidoMaterno: registro.apellidoMaterno,
      correoElectronico: registro.correoElectronico,
    });
    const entidad = await this.repository.crearEntidadRegistro({
      nombreComercial: dto.nombreComercial,
      ruc: dto.ruc ?? null,
      telefono: dto.telefono ?? null,
      correoElectronico: dto.correoCorporativo ?? null,
    });
    const usuario = await this.repository.crearUsuario({
      idPersonaNatural: persona.idPersonaNatural,
      idEntidad: entidad.idEntidad,
      usuario: dto.usuario,
      tipoUsuario: 'PROJECT_MANAGER' as never,
      contrasenaHash: await argon2.hash(dto.contrasena, {
        type: argon2.argon2id,
      }),
      ultimoAcceso: ahora(),
    });
    const usuarioVerificado = await this.repository.actualizarUsuario(
      usuario.idUsuario,
      { correoVerificado: true },
    );
    return publico(usuarioVerificado ?? usuario);
  }
}

@Injectable()
export class IniciarSesionUseCase {
  constructor(
    private readonly repository: AutenticacionRepository,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}
  async execute(dto: LoginDto) {
    const usuario = await this.repository.buscarUsuario(dto.usuarioOCorreo);
    if (
      !usuario ||
      !usuario.esActivo ||
      !(await argon2.verify(usuario.contrasenaHash, dto.contrasena))
    )
      throw new UnauthorizedException('Credenciales inválidas.');
    if (!usuario.correoVerificado) {
      const persona = await this.repository.personaExiste(
        usuario.idPersonaNatural,
      );
      if (
        persona &&
        (await this.repository.registroPendienteVerificado(
          persona.correoElectronico,
        ))
      ) {
        await this.repository.actualizarUsuario(usuario.idUsuario, {
          correoVerificado: true,
        });
        usuario.correoVerificado = true;
      }
    }
    if (!usuario.correoVerificado)
      throw new ForbiddenException(
        'Debes verificar tu correo antes de acceder.',
      );
    const refresh = tokenSeguro();
    const sesion = await this.repository.crearSesion({
      idUsuario: usuario.idUsuario,
      refreshTokenHash: await argon2.hash(refresh, { type: argon2.argon2id }),
      fechaExpiracion: enMs(
        expiracionMs(
          this.config.get<string>('JWT_REFRESH_EXPIRATION') ?? '7d',
          7 * 864e5,
        ),
      ),
    });
    await this.repository.actualizarUsuario(usuario.idUsuario, {
      ultimoAcceso: ahora(),
    });
    const accessToken = await this.jwt.signAsync({
      sub: usuario.idUsuario,
      usuario: usuario.usuario,
    });
    const refreshToken = await this.jwt.signAsync(
      { sub: usuario.idUsuario, sid: sesion.idSesion, token: refresh },
      {
        secret: this.config.getOrThrow<string>('JWT_REFRESH_SECRET'),
        expiresIn: (this.config.get<string>('JWT_REFRESH_EXPIRATION') ??
          '7d') as never,
      },
    );
    const persona = await this.repository.personaExiste(
      usuario.idPersonaNatural,
    );
    const nombreCompleto = persona
      ? [
          persona.nombres,
          persona.apellidoPaterno,
          persona.apellidoMaterno,
        ]
          .filter(Boolean)
          .join(' ')
      : usuario.usuario;
    return {
      accessToken,
      refreshToken,
      usuario: { ...publico(usuario), nombreCompleto },
    };
  }
}

@Injectable()
export class RefrescarSesionUseCase {
  constructor(
    private readonly repository: AutenticacionRepository,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}
  async execute(refreshToken: string) {
    let payload: { sub: number; sid: number; token: string };
    try {
      payload = await this.jwt.verifyAsync(refreshToken, {
        secret: this.config.getOrThrow<string>('JWT_REFRESH_SECRET'),
      });
    } catch {
      throw new UnauthorizedException('Refresh token inválido.');
    }
    const sesion = await this.repository.obtenerSesion(payload.sid);
    if (
      !sesion ||
      sesion.idUsuario !== payload.sub ||
      sesion.fechaRevocacion ||
      expiro(sesion.fechaExpiracion) ||
      !(await argon2.verify(sesion.refreshTokenHash, payload.token))
    )
      throw new UnauthorizedException('Refresh token inválido o expirado.');
    await this.repository.revocarSesion(sesion.idSesion, ahora());
    const usuario = await this.repository.obtenerUsuario(payload.sub);
    if (!usuario?.esActivo)
      throw new UnauthorizedException('Usuario no disponible.');
    const tokenAleatorio = tokenSeguro();
    const nuevaSesion = await this.repository.crearSesion({
      idUsuario: usuario.idUsuario,
      refreshTokenHash: await argon2.hash(tokenAleatorio, {
        type: argon2.argon2id,
      }),
      fechaExpiracion: enMs(
        expiracionMs(
          this.config.get<string>('JWT_REFRESH_EXPIRATION') ?? '7d',
          7 * 864e5,
        ),
      ),
    });
    return {
      accessToken: await this.jwt.signAsync({
        sub: usuario.idUsuario,
        usuario: usuario.usuario,
      }),
      refreshToken: await this.jwt.signAsync(
        {
          sub: usuario.idUsuario,
          sid: nuevaSesion.idSesion,
          token: tokenAleatorio,
        },
        {
          secret: this.config.getOrThrow<string>('JWT_REFRESH_SECRET'),
          expiresIn: (this.config.get<string>('JWT_REFRESH_EXPIRATION') ??
            '7d') as never,
        },
      ),
      usuario: publico(usuario),
    };
  }
}

@Injectable()
export class CerrarSesionUseCase {
  constructor(
    private readonly repository: AutenticacionRepository,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}
  async execute(refreshToken: string) {
    try {
      const payload = await this.jwt.verifyAsync<{ sid: number }>(
        refreshToken,
        { secret: this.config.getOrThrow<string>('JWT_REFRESH_SECRET') },
      );
      await this.repository.revocarSesion(payload.sid, ahora());
    } catch {
      throw new UnauthorizedException('Refresh token inválido.');
    }
  }
}

@Injectable()
export class SolicitarVerificacionCorreoUseCase {
  constructor(
    private readonly repository: AutenticacionRepository,
    private readonly correo: CorreoCuentaPort,
  ) {}
  async enviar(
    idUsuario: number,
    persona?: {
      correoElectronico: string;
      nombres: string;
      apellidoPaterno: string;
    },
  ) {
    const usuario = await this.repository.obtenerUsuario(idUsuario);
    const datos =
      persona ??
      (usuario
        ? await this.repository.personaExiste(usuario.idPersonaNatural)
        : null);
    if (!usuario || !datos || usuario.correoVerificado) return;
    const token = tokenSeguro();
    await this.repository.crearTokenCuenta({
      idUsuario,
      tipoToken: TipoTokenCuenta.VERIFICACION_CORREO,
      tokenHash: hashToken(token),
      fechaExpiracion: enMs(24 * 36e5),
    });
    await this.correo.enviarVerificacion(
      datos.correoElectronico,
      `${datos.nombres} ${datos.apellidoPaterno}`,
      token,
    );
  }
  async execute(dto: SolicitarTokenDto) {
    const usuario = await this.repository.buscarUsuario(dto.usuarioOCorreo);
    if (usuario) await this.enviar(usuario.idUsuario);
  }
}

@Injectable()
export class ConfirmarCorreoUseCase {
  constructor(private readonly repository: AutenticacionRepository) {}
  async execute(token: string) {
    const registro = await this.repository.buscarTokenCuenta(
      hashToken(token),
      TipoTokenCuenta.VERIFICACION_CORREO,
    );
    if (!registro || expiro(registro.fechaExpiracion))
      throw new BadRequestException(
        'El enlace de verificación es inválido o expiró.',
      );
    await this.repository.actualizarUsuario(registro.idUsuario, {
      correoVerificado: true,
    });
    await this.repository.usarTokenCuenta(registro.idToken, ahora());
  }
}

@Injectable()
export class RecuperarContrasenaUseCase {
  constructor(
    private readonly repository: AutenticacionRepository,
    private readonly correo: CorreoCuentaPort,
  ) {}
  async solicitar(dto: SolicitarTokenDto) {
    const usuario = await this.repository.buscarUsuario(dto.usuarioOCorreo);
    if (!usuario) return;
    const persona = await this.repository.personaExiste(
      usuario.idPersonaNatural,
    );
    if (!persona) return;
    const token = tokenSeguro();
    await this.repository.crearTokenCuenta({
      idUsuario: usuario.idUsuario,
      tipoToken: TipoTokenCuenta.RECUPERACION_CONTRASENA,
      tokenHash: hashToken(token),
      fechaExpiracion: enMs(3600e3),
    });
    await this.correo.enviarRecuperacion(
      persona.correoElectronico,
      `${persona.nombres} ${persona.apellidoPaterno}`,
      token,
    );
  }
  async confirmar(dto: ResetPasswordDto) {
    if (!esContrasenaSegura(dto.nuevaContrasena))
      throw new BadRequestException(
        'La contraseña debe incluir mayúscula, minúscula, número y símbolo.',
      );
    const registro = await this.repository.buscarTokenCuenta(
      hashToken(dto.token),
      TipoTokenCuenta.RECUPERACION_CONTRASENA,
    );
    if (!registro || expiro(registro.fechaExpiracion))
      throw new BadRequestException(
        'El enlace de recuperación es inválido o expiró.',
      );
    await this.repository.actualizarUsuario(registro.idUsuario, {
      contrasenaHash: await argon2.hash(dto.nuevaContrasena, {
        type: argon2.argon2id,
      }),
    });
    await this.repository.usarTokenCuenta(registro.idToken, ahora());
    await this.repository.revocarSesionesUsuario(
      registro.idUsuario,
      ahora(),
    );
  }
}

@Injectable()
export class GestionarUsuariosUseCase {
  constructor(private readonly repository: AutenticacionRepository) {}
  async obtener(id: number) {
    const usuario = await this.repository.obtenerUsuario(id);
    if (!usuario) throw new NotFoundException('Usuario no encontrado.');
    return publico(usuario);
  }
  async listar(query: QueryUsuarioDto) {
    const resultado = await this.repository.listarUsuarios(query);
    return { ...resultado, items: resultado.items.map(publico) };
  }
  async actualizar(id: number, dto: UpdateUsuarioDto) {
    if (dto.usuario && (await this.repository.usuarioExiste(dto.usuario, id)))
      throw new ConflictException('El usuario ya está registrado.');
    if (dto.idEntidad && !(await this.repository.entidadExiste(dto.idEntidad)))
      throw new BadRequestException('La entidad no existe.');
    const usuario = await this.repository.actualizarUsuario(id, dto);
    if (!usuario) throw new NotFoundException('Usuario no encontrado.');
    return publico(usuario);
  }
  async eliminar(id: number) {
    const usuario = await this.repository.actualizarUsuario(id, {
      esActivo: false,
    });
    if (!usuario) throw new NotFoundException('Usuario no encontrado.');
    await this.repository.revocarSesionesUsuario(id, ahora());
    return publico(usuario);
  }
}
