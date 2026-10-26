import { ResultadoE04, ejecutarE04, guardarEvidenciaE04, requiereCapacidad } from '../../soporte/contexto-e04';
describe('HU17 - Hitos', () => { const r: ResultadoE04[]=[]; afterAll(()=>guardarEvidenciaE04('HU17-Hitos',r));
 it('CP-E04-HU17-01 - Consulta y filtrado de hitos',()=>ejecutarE04(r,'CP-E04-HU17-01',()=>requiereCapacidad('hito-crud')));
 it('CP-E04-HU17-02 - Cumplimiento automatico de un hito',()=>ejecutarE04(r,'CP-E04-HU17-02',()=>requiereCapacidad('cumplimiento-automatico-hito')));
 it('CP-E04-HU17-03 - Hitos cumplidos en avance e historial',()=>ejecutarE04(r,'CP-E04-HU17-03',()=>requiereCapacidad('historial-hitos')));
});
