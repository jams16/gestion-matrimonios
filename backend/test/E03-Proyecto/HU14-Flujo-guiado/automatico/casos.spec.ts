import { ResultadoE03, ejecutarE03, guardarEvidenciaE03, requiereCapacidad } from '../../soporte/contexto-e03';
describe('HU14 – Flujo guiado',()=>{const r:ResultadoE03[]=[];afterAll(()=>guardarEvidenciaE03('HU14-Flujo-guiado',r));
 it('CP-E03-HU14-01 – Identificación de la etapa actual',()=>ejecutarE03(r,'CP-E03-HU14-01',()=>requiereCapacidad('fases-proyecto')));
 it.each(['dependencia habilitada','prioridad','proximidad de fecha límite'])('CP-E03-HU14-02 – Acciones de la etapa y próxima acción recomendada: %s',(v)=>ejecutarE03(r,'CP-E03-HU14-02',()=>requiereCapacidad('flujo-recomendado'),v));
 it('CP-E03-HU14-03 – Actualización del flujo al completar una acción',()=>ejecutarE03(r,'CP-E03-HU14-03',()=>requiereCapacidad('flujo-actualizacion')));
 it('CP-E03-HU14-04 – Flexibilidad del flujo de planificación',()=>ejecutarE03(r,'CP-E03-HU14-04',()=>requiereCapacidad('cronograma-editable')));
});
