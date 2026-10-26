import { ResultadoE03, ejecutarE03, guardarEvidenciaE03, requiereCapacidad } from '../../soporte/contexto-e03';
describe('HU13 – Centralizar información',()=>{const r:ResultadoE03[]=[];afterAll(()=>guardarEvidenciaE03('HU13-Informacion-centralizada',r));
 it('CP-E03-HU13-01 – Navegación manteniendo el contexto del matrimonio',()=>ejecutarE03(r,'CP-E03-HU13-01',()=>requiereCapacidad('contexto-matrimonio')));
 it('CP-E03-HU13-02 – Actualización de indicadores por cambios en módulos',()=>ejecutarE03(r,'CP-E03-HU13-02',()=>requiereCapacidad('indicadores-integrados')));
 it('CP-E03-HU13-03 – Reutilización de información compartida',()=>ejecutarE03(r,'CP-E03-HU13-03',()=>requiereCapacidad('fuente-compartida')));
 it('CP-E03-HU13-04 – Permisos sobre módulos e información integrada',()=>ejecutarE03(r,'CP-E03-HU13-04',()=>requiereCapacidad('permisos-contextuales')));
});
