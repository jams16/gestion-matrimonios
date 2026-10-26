import { ResultadoE04, ejecutarE04, guardarEvidenciaE04, requiereCapacidad } from '../../soporte/contexto-e04';
describe('HU15 - Registrar actividades', () => { const r: ResultadoE04[]=[]; afterAll(()=>guardarEvidenciaE04('HU15-Actividades',r));
 it('CP-E04-HU15-01 - Registro valido de actividad e incorporacion al cronograma',()=>ejecutarE04(r,'CP-E04-HU15-01',()=>requiereCapacidad('actividad-con-categoria')));
 it.each(['nombre','fecha limite','prioridad','responsable'])('CP-E04-HU15-02 - Validacion de datos obligatorios: %s',(v)=>ejecutarE04(r,'CP-E04-HU15-02',()=>requiereCapacidad('actividad-validacion'),v));
 it('CP-E04-HU15-03 - Edicion de una actividad existente',()=>ejecutarE04(r,'CP-E04-HU15-03',()=>requiereCapacidad('actividad-crud')));
 it('CP-E04-HU15-04 - Cambio de responsable',()=>ejecutarE04(r,'CP-E04-HU15-04',()=>requiereCapacidad('historial-asignacion')));
});
