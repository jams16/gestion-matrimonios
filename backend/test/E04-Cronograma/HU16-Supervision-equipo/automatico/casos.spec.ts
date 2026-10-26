import { ResultadoE04, ejecutarE04, guardarEvidenciaE04, requiereCapacidad } from '../../soporte/contexto-e04';
describe('HU16 - Supervision del equipo', () => { const r: ResultadoE04[]=[]; afterAll(()=>guardarEvidenciaE04('HU16-Supervision-equipo',r));
 it('CP-E04-HU16-01 - Supervision centralizada por miembro',()=>ejecutarE04(r,'CP-E04-HU16-01',()=>requiereCapacidad('panel-por-miembro')));
 it('CP-E04-HU16-02 - Calculo de avance por miembro o frente',()=>ejecutarE04(r,'CP-E04-HU16-02',()=>requiereCapacidad('avance-por-miembro')));
 it('CP-E04-HU16-03 - Actualizacion del panel tras cambios',()=>ejecutarE04(r,'CP-E04-HU16-03',()=>requiereCapacidad('panel-por-miembro')));
 it('CP-E04-HU16-04 - Identificacion de retrasadas y proximas a vencer',()=>ejecutarE04(r,'CP-E04-HU16-04',()=>requiereCapacidad('panel-retrasadas-proximas')));
});
