import { ResultadoCasoE02, comprobarAusenciaModuloMiembros, ejecutarCasoE02, guardarEvidenciaHuE02 } from '../../soporte/contexto-e02';

describe('HU08 – Gestionar roles operativos', () => {
  const resultados: ResultadoCasoE02[] = [];
  afterAll(async () => { await guardarEvidenciaHuE02('HU08-Gestionar-roles-operativos', resultados); });

  it('CP-E02-HU08-01 – Incorporación de un miembro con rol operativo', async () => ejecutarCasoE02(resultados, 'CP-E02-HU08-01', async () => {
    comprobarAusenciaModuloMiembros();
  }));
  it('CP-E02-HU08-02 – Invitación del nuevo miembro al proyecto', async () => ejecutarCasoE02(resultados, 'CP-E02-HU08-02', async () => {
    comprobarAusenciaModuloMiembros();
  }));
  it('CP-E02-HU08-03 – Asignación de múltiples roles operativos', async () => ejecutarCasoE02(resultados, 'CP-E02-HU08-03', async () => {
    comprobarAusenciaModuloMiembros();
  }));
  it('CP-E02-HU08-04 – Modificación de roles con conservación del historial', async () => ejecutarCasoE02(resultados, 'CP-E02-HU08-04', async () => {
    comprobarAusenciaModuloMiembros();
  }));
  it('CP-E02-HU08-05 – Inhabilitación de un colaborador', async () => ejecutarCasoE02(resultados, 'CP-E02-HU08-05', async () => {
    comprobarAusenciaModuloMiembros();
  }));
});
