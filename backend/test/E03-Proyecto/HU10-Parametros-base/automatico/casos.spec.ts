import { GuardarOnboardingMatrimonioUseCase } from '../../../../src/modules/proyectos/application/use-cases/onboarding-matrimonio.use-case';
import { jest } from '@jest/globals';
import { GuardarOnboardingMatrimonioDto } from '../../../../src/modules/proyectos/application/dto/guardar-onboarding-matrimonio.dto';
import { ProyectosRepository } from '../../../../src/modules/proyectos/domain/repositories/proyectos.repository';
import {
  ResultadoE03,
  ejecutarE03,
  guardarEvidenciaE03,
  requiereCapacidad,
} from '../../soporte/contexto-e03';

const idProyecto = '11111111-1111-4111-8111-111111111111';

const datosValidos = (): GuardarOnboardingMatrimonioDto => ({
  pareja1: {
    nombres: 'Ana',
    apellidoPaterno: 'Ramos',
    dni: '12345678',
    usuario: 'ana.ramos',
    contrasena: 'ClaveSegura1',
  },
  pareja2: {
    nombres: 'Luis',
    apellidoPaterno: 'Mendoza',
    dni: '87654321',
    usuario: 'luis.mendoza',
    contrasena: 'ClaveSegura2',
  },
  fechaMatrimonio: '2028-11-20',
  presupuesto: 50000,
  moneda: 'SOLES',
  cantidadInvitados: 120,
  idTipoCeremonia: 1,
  ciudadUbicacion: '150101',
  alcance: 'CATERING;FOTOGRAFIA',
  objetivos: 'Definir presupuesto;contratar local',
  necesidades: 'Catering vegetariano',
  supuestos: 'Disponibilidad de local',
  restricciones: 'Presupuesto máximo aprobado',
  ideasMoonboard: 'Lila y blanco',
});

function crearRepositorio() {
  const guardarOnboardingMatrimonio = jest.fn(async (data, _idPm, iniciar) => ({
    proyecto: {
      idProyecto,
      idPm: 77,
      fechaInicio: new Date('2026-11-01'),
      presupuesto: data.presupuesto ?? null,
      moneda: data.moneda ?? 'SOLES',
      alcance: data.alcance ?? null,
      estado: iniciar ? 'ACTIVO' : 'BORRADOR',
    },
    matrimonio: {
      idMatrimonio: '22222222-2222-4222-8222-222222222222',
      idProyecto,
      fechaMatrimonio: data.fechaMatrimonio ?? null,
    },
  }));

  const repositorio = {
    guardarOnboardingMatrimonio,
    obtenerProyecto: jest.fn(),
    obtenerMatrimonioPorProyecto: jest.fn(),
    ubigeoExiste: jest.fn().mockResolvedValue(true),
  } as unknown as ProyectosRepository;

  return { repositorio, guardarOnboardingMatrimonio };
}

describe('HU10 — Configurar parámetros base y alcance mediante EDT', () => {
  const resultados: ResultadoE03[] = [];

  afterAll(() => guardarEvidenciaE03('HU10-Parametros-base', resultados));

  it('CP-E03-HU10-01 — CA046 valida campos obligatorios antes de iniciar', async () => {
    await ejecutarE03(resultados, 'CP-E03-HU10-01', async () => {
      const { repositorio, guardarOnboardingMatrimonio } = crearRepositorio();
      const generador = { execute: jest.fn().mockResolvedValue({}) };
      const caso = new GuardarOnboardingMatrimonioUseCase(
        repositorio,
        generador as never,
      );

      const sinFecha = datosValidos();
      sinFecha.fechaMatrimonio = undefined;
      await expect(caso.execute(sinFecha, 77, true)).rejects.toThrow(
        'Completa los datos obligatorios',
      );

      const dniRepetido = datosValidos();
      dniRepetido.pareja2.dni = dniRepetido.pareja1.dni;
      await expect(caso.execute(dniRepetido, 77, false)).rejects.toThrow(
        'DNI de la pareja deben ser diferentes',
      );

      await caso.execute(datosValidos(), 77, true);
      expect(guardarOnboardingMatrimonio).toHaveBeenCalledWith(
        expect.objectContaining({
          moneda: 'SOLES',
          presupuesto: 50000,
          cantidadInvitados: 120,
          idTipoCeremonia: 1,
          alcance: 'CATERING;FOTOGRAFIA',
        }),
        77,
        true,
      );
    });
  });

  it('CP-E03-HU10-02 — CA047 conserva la configuración base en borrador', async () => {
    await ejecutarE03(resultados, 'CP-E03-HU10-02', async () => {
      const { repositorio, guardarOnboardingMatrimonio } = crearRepositorio();
      const caso = new GuardarOnboardingMatrimonioUseCase(
        repositorio,
        { execute: jest.fn() } as never,
      );
      const datos = datosValidos();

      await caso.execute(datos, 77, false);

      expect(guardarOnboardingMatrimonio).toHaveBeenCalledWith(datos, 77, false);
      expect(guardarOnboardingMatrimonio.mock.results[0].value).resolves.toEqual(
        expect.objectContaining({
          proyecto: expect.objectContaining({
            presupuesto: 50000,
            moneda: 'SOLES',
            alcance: 'CATERING;FOTOGRAFIA',
          }),
          matrimonio: expect.objectContaining({ fechaMatrimonio: '2028-11-20' }),
        }),
      );
    });
  });

  it('CP-E03-HU10-03 — CA048 dispone de EDT independiente desde plantilla', async () => {
    await ejecutarE03(resultados, 'CP-E03-HU10-03', () =>
      requiereCapacidad('edt-matrimonio-independiente'),
    );
  });

  it('CP-E03-HU10-04 — CA049 dispone de revisión editable previa', async () => {
    await ejecutarE03(resultados, 'CP-E03-HU10-04', () =>
      requiereCapacidad('revision-onboarding'),
    );
  });

  it('CP-E03-HU10-05 — CA050 invoca la generación solo al confirmar', async () => {
    await ejecutarE03(resultados, 'CP-E03-HU10-05', async () => {
      const { repositorio } = crearRepositorio();
      const generador = { execute: jest.fn().mockResolvedValue({
        actividades_creadas: 4,
        hitos_creados: 2,
      }) };
      const caso = new GuardarOnboardingMatrimonioUseCase(
        repositorio,
        generador as never,
      );

      await caso.execute(datosValidos(), 77, false);
      expect(generador.execute).not.toHaveBeenCalled();

      await caso.execute(datosValidos(), 77, true);
      expect(generador.execute).toHaveBeenCalledWith(idProyecto);
    });
  });
});
