export abstract class CorreoCuentaPort {
  abstract enviarVerificacion(
    destinatario: string,
    nombre: string,
    token: string,
  ): Promise<void>;
  abstract enviarRecuperacion(
    destinatario: string,
    nombre: string,
    token: string,
  ): Promise<void>;
  abstract enviarRegistro(
    destinatario: string,
    nombre: string,
    token: string,
  ): Promise<void>;
}
