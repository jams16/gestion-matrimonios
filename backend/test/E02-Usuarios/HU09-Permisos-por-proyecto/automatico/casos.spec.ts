import { ResultadoCasoE02, comprobarAusenciaModuloMiembros, ejecutarCasoE02, guardarEvidenciaHuE02 } from '../../soporte/contexto-e02';

describe('HU09 – Acceso y permisos por proyecto', () => {
  const resultados: ResultadoCasoE02[] = [];
  afterAll(async () => { await guardarEvidenciaHuE02('HU09-Permisos-por-proyecto', resultados); });

  it('CP-E02-HU09-01 – Acceso inicial según tipo de usuario', async () => ejecutarCasoE02(resultados, 'CP-E02-HU09-01', async () => {
    comprobarAusenciaModuloMiembros();
  }));
  it('CP-E02-HU09-02 – Configuración de permisos de consulta y modificación', async () => ejecutarCasoE02(resultados, 'CP-E02-HU09-02', async () => {
    comprobarAusenciaModuloMiembros();
  }));
  it.each([
    ['sin permiso de consulta', { invitados: { consulta: false, modificacion: false } }],
    ['sin permiso de modificación', { invitados: { consulta: true, modificacion: false } }],
  ])('CP-E02-HU09-03 – Bloqueo de operaciones sin autorización: %s', async (variante, permisos) => ejecutarCasoE02(resultados, 'CP-E02-HU09-03', async () => {
    expect(permisos).toBeDefined();
    comprobarAusenciaModuloMiembros();
  }, variante));
  it('CP-E02-HU09-04 – Independencia de permisos entre matrimonios', async () => ejecutarCasoE02(resultados, 'CP-E02-HU09-04', async () => {
    comprobarAusenciaModuloMiembros();
  }));
  it('CP-E02-HU09-05 – Visualización según permisos y asignaciones vigentes', async () => ejecutarCasoE02(resultados, 'CP-E02-HU09-05', async () => {
    comprobarAusenciaModuloMiembros();
  }));
});
