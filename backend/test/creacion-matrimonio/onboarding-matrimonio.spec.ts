import { BadRequestException } from '@nestjs/common';
import { jest } from '@jest/globals';

import { GuardarOnboardingMatrimonioUseCase } from '../../src/modules/proyectos/application/use-cases/onboarding-matrimonio.use-case';

const fechaEnDias = (dias: number) => {
  const fecha = new Date();
  fecha.setUTCHours(0, 0, 0, 0);
  fecha.setUTCDate(fecha.getUTCDate() + dias);
  return fecha.toISOString().slice(0, 10);
};

const dto = (fechaMatrimonio = fechaEnDias(30)) => ({
  pareja1: {
    nombres: 'Ana',
    apellidoPaterno: 'Prueba',
    dni: '12345678',
    usuario: 'ana.prueba',
    contrasena: 'PruebaSegura1!',
  },
  pareja2: {
    nombres: 'Luis',
    apellidoPaterno: 'Prueba',
    dni: '87654321',
    usuario: 'luis.prueba',
    contrasena: 'PruebaSegura1!',
  },
  fechaMatrimonio,
  cantidadInvitados: 100,
  presupuesto: 10000,
  idTipoCeremonia: 1,
});

describe('GuardarOnboardingMatrimonioUseCase', () => {
  const repositorio = {
    ubigeoExiste: jest.fn(),
    obtenerProyecto: jest.fn(),
    obtenerMatrimonioPorProyecto: jest.fn(),
    guardarOnboardingMatrimonio: jest.fn(),
  };
  const cronograma = { execute: jest.fn() };
  const useCase = new GuardarOnboardingMatrimonioUseCase(
    repositorio as never,
    cronograma as never,
  );

  beforeEach(() => {
    jest.clearAllMocks();
    repositorio.guardarOnboardingMatrimonio.mockResolvedValue({
      proyecto: { idProyecto: 'proyecto-prueba' },
      matrimonio: { idMatrimonio: 'matrimonio-prueba' },
    });
    cronograma.execute.mockResolvedValue({
      hitos_creados: 1,
      actividades_creadas: 1,
      dependencias_creadas: 0,
      elementos_timing_creados: 1,
    });
  });

  it('acepta una boda exactamente a 30 días y genera el cronograma al iniciar', async () => {
    await expect(useCase.execute(dto(), 1000, true)).resolves.toMatchObject({
      cronograma: { actividades_creadas: 1 },
    });
    expect(cronograma.execute).toHaveBeenCalledWith('proyecto-prueba');
  });

  it.each([fechaEnDias(1), fechaEnDias(-1)])(
    'rechaza una boda fuera del horizonte mínimo (%s)',
    async (fecha) => {
      await expect(
        useCase.execute(dto(fecha), 1000, true),
      ).rejects.toBeInstanceOf(BadRequestException);
      expect(repositorio.guardarOnboardingMatrimonio).not.toHaveBeenCalled();
    },
  );

  it('rechaza DNI iguales dentro de la misma pareja', async () => {
    const datos = dto();
    datos.pareja2.dni = datos.pareja1.dni;
    await expect(useCase.execute(datos, 1000, true)).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });
});
