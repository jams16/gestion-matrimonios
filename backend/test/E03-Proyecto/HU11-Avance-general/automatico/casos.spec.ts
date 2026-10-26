import { ResultadoE03, ejecutarE03, guardarEvidenciaE03, requiereCapacidad } from '../../soporte/contexto-e03';
describe('HU11 – Visualizar avance general',()=>{const r:ResultadoE03[]=[];afterAll(()=>guardarEvidenciaE03('HU11-Avance-general',r));
 it('CP-E03-HU11-01 – Cálculo del avance y resumen de actividades',()=>ejecutarE03(r,'CP-E03-HU11-01',()=>requiereCapacidad('dashboard-avance')));
 it('CP-E03-HU11-02 – Indicadores de confirmación de invitados',()=>ejecutarE03(r,'CP-E03-HU11-02',()=>requiereCapacidad('dashboard-rsvp')));
 it.each(['sin excedente','con excedente'])('CP-E03-HU11-03 – Resumen financiero y detección de excedente: %s',(v)=>ejecutarE03(r,'CP-E03-HU11-03',()=>requiereCapacidad('dashboard-presupuesto'),v));
 it('CP-E03-HU11-04 – Actualización y permisos del dashboard',()=>ejecutarE03(r,'CP-E03-HU11-04',()=>requiereCapacidad('dashboard-permisos')));
});
