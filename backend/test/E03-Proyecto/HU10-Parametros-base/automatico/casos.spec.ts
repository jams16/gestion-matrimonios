import { CronogramaDateService } from '../../../../src/modules/cronograma/application/services/cronograma-date.service';
import { ResultadoE03, ejecutarE03, guardarEvidenciaE03, requiereCapacidad } from '../../soporte/contexto-e03';
describe('HU10 – Configurar parámetros base', () => {
 const r: ResultadoE03[]=[]; afterAll(()=>guardarEvidenciaE03('HU10-Parametros-base',r));
 it('CP-E03-HU10-01 – Registro válido de parámetros base y preparación temporal',()=>ejecutarE03(r,'CP-E03-HU10-01',()=>requiereCapacidad('parametros-base-estilo')));
 it.each(['datos de pareja','fecha','presupuesto','estilo'])('CP-E03-HU10-02 – Validación de parámetros base obligatorios: %s',(v)=>ejecutarE03(r,'CP-E03-HU10-02',()=>requiereCapacidad('validacion-parametros-base'),v));
 it('CP-E03-HU10-03 – Generación del cronograma desde plantilla',()=>ejecutarE03(r,'CP-E03-HU10-03',()=>requiereCapacidad('cronograma-plantilla')));
 it('CP-E03-HU10-04 – Asociación del estilo al matrimonio',()=>ejecutarE03(r,'CP-E03-HU10-04',()=>requiereCapacidad('estilo-evento')));
 it.each(['cambio de fecha','cambio de presupuesto'])('CP-E03-HU10-05 – Confirmación previa para cambios sensibles: %s',(v)=>ejecutarE03(r,'CP-E03-HU10-05',()=>requiereCapacidad('confirmacion-cambios-sensibles'),v));
 describe('Pruebas unitarias de escalamiento temporal',()=>{ const s=new CronogramaDateService(); const i=new Date('2026-01-01T00:00:00Z');
  it('calcula 395 días',()=>expect(s.calcularFechaObjetivo(i,new Date('2027-01-31T00:00:00Z'),'ESCALABLE',100).toISOString()).toContain('2026-10-23'));
  it('escala periodo menor',()=>expect(s.calcularFechaObjetivo(i,new Date('2026-07-20T00:00:00Z'),'ESCALABLE',100).toISOString()).toContain('2026-05-30'));
  it('redondea offset escalable',()=>expect(s.calcularFechaObjetivo(i,new Date('2026-01-11T00:00:00Z'),'ESCALABLE',20).toISOString()).toContain('2026-01-10'));
  it('no programa antes del inicio',()=>expect(s.calcularFechaObjetivo(i,new Date('2026-01-02T00:00:00Z'),'FIJO_EVENTO',50).toISOString()).toContain('2026-01-01'));
 });
});
