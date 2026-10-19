import { BadRequestException } from '@nestjs/common';
import { Temporal } from 'temporal-polyfill';

import { CorreoCuentaPort } from '../ports/correo-cuenta.port';
import { RegistroPendienteUseCase } from './autenticacion.use-cases';

type Registro = {
  idRegistro: number;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string | null;
  correoElectronico: string;
  tokenHash: string;
  fechaExpiracion: Temporal.Instant;
  fechaVerificacion: Temporal.Instant | null;
};

class RepositorioRegistroPrueba {
  readonly registros: Registro[] = [];

  async correoPersonaExiste() {
    return false;
  }

  async crearRegistroPendiente(
    data: Omit<Registro, 'idRegistro' | 'fechaVerificacion'>,
  ) {
    const registro: Registro = {
      ...data,
      idRegistro: this.registros.length + 1,
      fechaVerificacion: null,
    };
    this.registros.push(registro);
    return { idRegistro: registro.idRegistro };
  }

  async obtenerRegistroPendiente(tokenHash: string) {
    return (
      this.registros.find((registro) => registro.tokenHash === tokenHash) ??
      null
    );
  }

  async verificarRegistroPendiente(id: number) {
    const registro = this.registros.find((item) => item.idRegistro === id);
    if (registro) registro.fechaVerificacion = Temporal.Now.instant();
  }
}

class CorreoPrueba extends CorreoCuentaPort {
  readonly enviados: Array<{
    destinatario: string;
    nombre: string;
    token: string;
  }> = [];
  async enviarRegistro(destinatario: string, nombre: string, token: string) {
    this.enviados.push({ destinatario, nombre, token });
  }
  async enviarVerificacion() {}
  async enviarRecuperacion() {}
}

describe('RegistroPendienteUseCase', () => {
  const solicitud = {
    nombres: 'Wedding Planner Prueba',
    apellidoPaterno: 'Automatizada',
    apellidoMaterno: 'Unitaria',
    correoElectronico: 'wedding-planner-prueba@example.test',
  };

  const preparar = () => {
    const repositorio = new RepositorioRegistroPrueba();
    const correo = new CorreoPrueba();
    const casoUso = new RegistroPendienteUseCase(repositorio as never, correo);
    return { repositorio, correo, casoUso };
  };

  it('deja un registro pendiente y solicita el correo al destinatario correcto', async () => {
    const { repositorio, correo, casoUso } = preparar();
    await casoUso.solicitar(solicitud);
    expect(repositorio.registros).toHaveLength(1);
    expect(repositorio.registros[0].fechaVerificacion).toBeNull();
    expect(correo.enviados).toHaveLength(1);
    expect(correo.enviados[0]).toMatchObject({
      destinatario: solicitud.correoElectronico,
      nombre: solicitud.nombres,
      token: expect.stringMatching(/^\d{6}$/),
    });
  });

  it('confirma un código válido', async () => {
    const { repositorio, correo, casoUso } = preparar();
    await casoUso.solicitar(solicitud);
    await casoUso.confirmar(correo.enviados[0].token);
    expect(repositorio.registros[0].fechaVerificacion).not.toBeNull();
  });

  it('rechaza un código inválido', async () => {
    const { casoUso } = preparar();
    await expect(casoUso.confirmar('000000')).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it('rechaza un código expirado', async () => {
    const { repositorio, correo, casoUso } = preparar();
    await casoUso.solicitar(solicitud);
    repositorio.registros[0].fechaExpiracion =
      Temporal.Instant.fromEpochMilliseconds(Date.now() - 1);
    await expect(
      casoUso.confirmar(correo.enviados[0].token),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('rechaza reutilizar un código ya confirmado', async () => {
    const { correo, casoUso } = preparar();
    await casoUso.solicitar(solicitud);
    await casoUso.confirmar(correo.enviados[0].token);
    await expect(
      casoUso.confirmar(correo.enviados[0].token),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
