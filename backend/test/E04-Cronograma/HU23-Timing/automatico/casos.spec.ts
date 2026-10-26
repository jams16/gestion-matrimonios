import { ResultadoE04, ejecutarE04, guardarEvidenciaE04, requiereCapacidad } from '../../soporte/contexto-e04';
describe('HU23 - Timing', () => { const r: ResultadoE04[]=[]; afterAll(()=>guardarEvidenciaE04('HU23-Timing',r));
 it('CP-E04-HU23-01 - Registro y orden cronologico del timing',()=>ejecutarE04(r,'CP-E04-HU23-01',()=>requiereCapacidad('timing-con-ubicacion')));
 it.each(['mismo responsable','ubicacion exclusiva'])('CP-E04-HU23-02 - Deteccion de solapamientos incompatibles: %s',(v)=>ejecutarE04(r,'CP-E04-HU23-02',()=>requiereCapacidad('solapamiento-timing'),v));
 it('CP-E04-HU23-03 - Edicion de actividad del timing',()=>ejecutarE04(r,'CP-E04-HU23-03',()=>requiereCapacidad('timing-crud')));
 it('CP-E04-HU23-04 - Exportacion o version compartible del timing',()=>ejecutarE04(r,'CP-E04-HU23-04',()=>requiereCapacidad('exportacion-timing')));
});
