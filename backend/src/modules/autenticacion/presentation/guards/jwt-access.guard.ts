import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Temporal } from 'temporal-polyfill';

import { AutenticacionRepository } from '../../domain/repositories/autenticacion.repository';

const milisegundos = (valor: string, defecto: number) => {
  const match = /^(\d+)\s*([smhd])$/.exec(valor);
  if (!match) return defecto;
  return Number(match[1]) * ({ s: 1e3, m: 6e4, h: 36e5, d: 864e5 }[match[2]] ?? 1);
};

@Injectable()
export class JwtAccessGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
    private readonly repository: AutenticacionRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<{
      headers: { authorization?: string };
      usuarioAutenticado?: unknown;
    }>();
    const [tipo, token] = request.headers.authorization?.split(' ') ?? [];
    if (tipo !== 'Bearer' || !token) {
      throw new UnauthorizedException('Access token requerido.');
    }
    try {
      const payload = await this.jwt.verifyAsync<{
        sub: number;
        sid?: number;
      }>(token, {
        secret: this.config.getOrThrow<string>('JWT_ACCESS_SECRET'),
      });
      if (!payload.sid) throw new UnauthorizedException('Sesión no válida.');
      const sesion = await this.repository.obtenerSesion(payload.sid);
      const usuario = await this.repository.obtenerUsuario(payload.sub);
      const ahora = Temporal.Now.instant();
      const inactividad = milisegundos(
        this.config.get<string>('SESSION_INACTIVITY_TIMEOUT') ?? '1h',
        60 * 60e3,
      );
      if (
        !sesion ||
        sesion.idUsuario !== payload.sub ||
        !!sesion.fechaRevocacion ||
        Temporal.Instant.compare(sesion.fechaExpiracion, ahora) <= 0 ||
        !usuario?.esActivo ||
        Temporal.Instant.compare(
          usuario.ultimoAcceso.add({ milliseconds: inactividad }),
          ahora,
        ) <= 0
      ) {
        if (usuario) await this.repository.revocarSesionesUsuario(usuario.idUsuario, ahora);
        throw new UnauthorizedException('Sesión inválida, revocada o expirada por inactividad.');
      }
      await this.repository.actualizarUsuario(usuario.idUsuario, {
        ultimoAcceso: ahora,
      });
      request.usuarioAutenticado = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Access token inválido o expirado.');
    }
  }
}
