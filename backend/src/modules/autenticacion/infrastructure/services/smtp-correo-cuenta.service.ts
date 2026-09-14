import {
  Injectable,
  Logger,
  OnModuleInit,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';

import { CorreoCuentaPort } from '../../application/ports/correo-cuenta.port';

@Injectable()
export class SmtpCorreoCuentaService implements CorreoCuentaPort, OnModuleInit {
  private readonly logger = new Logger(SmtpCorreoCuentaService.name);

  constructor(private readonly config: ConfigService) {}

  async onModuleInit(): Promise<void> {
    try {
      await this._transporter().verify();
      this.logger.log('SMTP conectado correctamente.');
    } catch (error) {
      this.logger.error(
        'No se pudo verificar la conexión SMTP. Revise host, puerto, seguridad y credenciales.',
        error instanceof Error ? error.stack : undefined,
      );
    }
  }
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
  async enviarRegistro(destinatario: string, nombre: string, token: string) {
    this.logger.log(
      `Intentando enviar código de registro a: ${destinatario}`,
    );
    const info = await this._transporter().sendMail({
      from:
        this.config.get<string>('SMTP_FROM') ??
        this.config.get<string>('SMTP_USER'),
      to: destinatario,
      subject: 'Código de verificación para WeddingApp',
      html: `<p>Hola ${nombre},</p><p>Ingresa este código para continuar con la creación de tu cuenta:</p><p style="font-size:28px;font-weight:700;letter-spacing:6px">${token}</p><p>El código vence en 24 horas. Si no solicitaste este registro, ignora este mensaje.</p>`,
    });
    this.logger.log(
      `Código de registro enviado. messageId=${info.messageId}; respuesta SMTP=${info.response}`,
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
    const frontend = this.config.get<string>('FRONTEND_URL');
    if (!frontend)
      throw new ServiceUnavailableException(
        'El correo de autenticación no está configurado.',
      );
    const url = `${frontend.replace(/\/$/, '')}/${ruta}?token=${encodeURIComponent(token)}`;
    this.logger.log(
      `Intentando enviar correo de autenticación a: ${destinatario}`,
    );
    const info = await this._transporter().sendMail({
      from:
        this.config.get<string>('SMTP_FROM') ??
        this.config.get<string>('SMTP_USER'),
      to: destinatario,
      subject: asunto,
      html: `<p>Hola ${nombre},</p><p>Para continuar, confirma esta acción:</p><p><a href="${url}" style="display:inline-block;padding:12px 18px;background:#1677ff;color:#fff;text-decoration:none;border-radius:6px">${boton}</a></p><p>Si no solicitaste esta acción, ignora este mensaje.</p>`,
    });
    this.logger.log(
      `Correo enviado. messageId=${info.messageId}; respuesta SMTP=${info.response}`,
    );
  }

  private _transporter() {
    const host = this.config.get<string>('SMTP_HOST');
    const user = this.config.get<string>('SMTP_USER');
    const password = this.config.get<string>('SMTP_PASSWORD');
    if (!host || !user || !password) {
      throw new ServiceUnavailableException(
        'El servicio SMTP no está configurado.',
      );
    }
    return nodemailer.createTransport({
      host,
      port: Number(this.config.get('SMTP_PORT') ?? 587),
      secure: this.config.get('SMTP_SECURE') === 'true',
      auth: {
        user,
        pass: password,
      },
    });
  }
}
