import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';

import { CorreoCuentaPort } from '../../application/ports/correo-cuenta.port';

@Injectable()
export class SmtpCorreoCuentaService implements CorreoCuentaPort {
  constructor(private readonly config: ConfigService) {}
  async enviarVerificacion(
    destinatario: string,
    nombre: string,
    token: string,
  ) {
    await this.enviar(
      destinatario,
      nombre,
      token,
      'verificar-correo',
      'Confirmar mi cuenta',
      'Sí, soy yo',
    );
  }
  async enviarRecuperacion(
    destinatario: string,
    nombre: string,
    token: string,
  ) {
    await this.enviar(
      destinatario,
      nombre,
      token,
      'recuperar-contrasena',
      'Restablecer mi contraseña',
      'Restablecer contraseña',
    );
  }
  private async enviar(
    destinatario: string,
    nombre: string,
    token: string,
    ruta: string,
    asunto: string,
    boton: string,
  ) {
    const host = this.config.get<string>('SMTP_HOST');
    const user = this.config.get<string>('SMTP_USER');
    const password = this.config.get<string>('SMTP_PASSWORD');
    const frontend = this.config.get<string>('FRONTEND_URL');
    if (!host || !user || !password || !frontend)
      throw new ServiceUnavailableException(
        'El correo de autenticación no está configurado.',
      );
    const url = `${frontend.replace(/\/$/, '')}/${ruta}?token=${encodeURIComponent(token)}`;
    const transporter = nodemailer.createTransport({
      host,
      port: Number(this.config.get('SMTP_PORT') ?? 587),
      secure: this.config.get('SMTP_SECURE') === 'true',
      auth: { user, pass: password },
    });
    await transporter.sendMail({
      from: this.config.get<string>('SMTP_FROM') ?? user,
      to: destinatario,
      subject: asunto,
      html: `<p>Hola ${nombre},</p><p>Para continuar, confirma esta acción:</p><p><a href="${url}" style="display:inline-block;padding:12px 18px;background:#1677ff;color:#fff;text-decoration:none;border-radius:6px">${boton}</a></p><p>Si no solicitaste esta acción, ignora este mensaje.</p>`,
    });
  }
}
