import { ResultadoE04, ejecutarE04, guardarEvidenciaE04, requiereCapacidad } from '../../soporte/contexto-e04';
describe('HU21 - Dependencias', () => { const r: ResultadoE04[]=[]; afterAll(()=>guardarEvidenciaE04('HU21-Dependencias',r));
 it.each(['valida','consigo misma','ciclo directo','ciclo indirecto'])('CP-E04-HU21-01 - Creacion de dependencias y prevencion de ciclos: %s',(v)=>ejecutarE04(r,'CP-E04-HU21-01',()=>requiereCapacidad('dependencias-ciclos'),v));
 it('CP-E04-HU21-02 - Dependencias sugeridas y personalizables',()=>ejecutarE04(r,'CP-E04-HU21-02',()=>requiereCapacidad('dependencias-sugeridas')));
});
