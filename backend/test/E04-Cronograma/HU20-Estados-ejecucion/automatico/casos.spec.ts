import { ResultadoE04, ejecutarE04, guardarEvidenciaE04, requiereCapacidad } from '../../soporte/contexto-e04';
describe('HU20 - Estados de ejecucion', () => { const r: ResultadoE04[]=[]; afterAll(()=>guardarEvidenciaE04('HU20-Estados-ejecucion',r));
 it('CP-E04-HU20-01 - Cambio de estado y actualizacion del avance',()=>ejecutarE04(r,'CP-E04-HU20-01',()=>requiereCapacidad('actividad-crud')));
 it('CP-E04-HU20-02 - Deteccion automatica de retraso',()=>ejecutarE04(r,'CP-E04-HU20-02',()=>requiereCapacidad('retrasadas-regla-completa')));
 it('CP-E04-HU20-03 - Bloqueo de completado por dependencia pendiente',()=>ejecutarE04(r,'CP-E04-HU20-03',()=>requiereCapacidad('bloqueo-completado-dependencia')));
 it('CP-E04-HU20-04 - Autorizacion e identificacion de cambios de estado',()=>ejecutarE04(r,'CP-E04-HU20-04',()=>requiereCapacidad('historial-cambio-estado')));
});
