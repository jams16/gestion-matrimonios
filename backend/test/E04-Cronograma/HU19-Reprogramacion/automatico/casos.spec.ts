import { ResultadoE04, ejecutarE04, guardarEvidenciaE04, requiereCapacidad } from '../../soporte/contexto-e04';
import { ReprogramacionActividadesService } from '../../../../src/modules/cronograma/application/services/reprogramacion-actividades.service';
describe('HU19 - Reprogramacion', () => { const r: ResultadoE04[]=[]; afterAll(()=>guardarEvidenciaE04('HU19-Reprogramacion',r));
 it('CP-E04-HU19-01 - Reprogramacion y conservacion del valor anterior',()=>ejecutarE04(r,'CP-E04-HU19-01',()=>requiereCapacidad('historial-reprogramacion')));
 it('CP-E04-HU19-02 - Margen de seguridad',()=>ejecutarE04(r,'CP-E04-HU19-02',()=>requiereCapacidad('margen-seguridad')));
 it('CP-E04-HU19-03 - Deteccion de conflictos por reprogramacion',()=>ejecutarE04(r,'CP-E04-HU19-03',()=>requiereCapacidad('reprogramacion-preview')));
 it('CP-E04-HU19-04 - Impacto por cambio de fecha del matrimonio',()=>ejecutarE04(r,'CP-E04-HU19-04',()=>requiereCapacidad('impacto-fecha-matrimonio')));
});

describe('Reglas aisladas de reprogramacion', () => {
  const servicio = new ReprogramacionActividadesService();
  const actividad = (idActividad: string, fechaInicio: string, fechaFin: string) => ({ idActividad, nombre: idActividad, fechaInicio, fechaFin });
  it('desplaza una sucesora FINISH_TO_START conservando su duracion', () => {
    const resultado = servicio.simular(actividad('A','2027-06-01T00:00:00.000Z','2027-06-03T00:00:00.000Z'),new Date('2027-06-02T00:00:00.000Z'),new Date('2027-06-05T00:00:00.000Z'),[actividad('A','2027-06-01T00:00:00.000Z','2027-06-03T00:00:00.000Z'),actividad('B','2027-06-04T00:00:00.000Z','2027-06-06T00:00:00.000Z')],[{idActividadPredecesora:'A',idActividadSucesora:'B',tipoDependencia:'FINISH_TO_START',diasDesfase:0}]);
    expect(resultado.impactos[0].fechaInicioSugerida.toISOString()).toContain('2027-06-05');
    expect(resultado.impactos[0].fechaFinSugerida.toISOString()).toContain('2027-06-07');
  });
  it('respeta los dias de desfase de una dependencia', () => {
    const resultado = servicio.simular(actividad('A','2027-06-01T00:00:00.000Z','2027-06-03T00:00:00.000Z'),undefined,new Date('2027-06-05T00:00:00.000Z'),[actividad('A','2027-06-01T00:00:00.000Z','2027-06-03T00:00:00.000Z'),actividad('B','2027-06-04T00:00:00.000Z','2027-06-06T00:00:00.000Z')],[{idActividadPredecesora:'A',idActividadSucesora:'B',tipoDependencia:'FINISH_TO_START',diasDesfase:2}]);
    expect(resultado.impactos[0].fechaInicioSugerida.toISOString()).toContain('2027-06-07');
  });
  it('no propone impacto si la sucesora ya inicia despues de la fecha permitida', () => {
    const resultado = servicio.simular(actividad('A','2027-06-01T00:00:00.000Z','2027-06-03T00:00:00.000Z'),undefined,new Date('2027-06-05T00:00:00.000Z'),[actividad('A','2027-06-01T00:00:00.000Z','2027-06-03T00:00:00.000Z'),actividad('B','2027-06-08T00:00:00.000Z','2027-06-10T00:00:00.000Z')],[{idActividadPredecesora:'A',idActividadSucesora:'B',tipoDependencia:'FINISH_TO_START',diasDesfase:0}]);
    expect(resultado.impactos).toHaveLength(0);
  });
});
