import { ResultadoE04, ejecutarE04, guardarEvidenciaE04, requiereCapacidad } from '../../soporte/contexto-e04';
describe('HU18 - Alertas', () => { const r: ResultadoE04[]=[]; afterAll(()=>guardarEvidenciaE04('HU18-Alertas',r));
 it('CP-E04-HU18-01 - Configuracion de anticipaciones',()=>ejecutarE04(r,'CP-E04-HU18-01',()=>requiereCapacidad('anticipaciones-configurables')));
 it('CP-E04-HU18-02 - Generacion de alerta de vencimiento',()=>ejecutarE04(r,'CP-E04-HU18-02',()=>requiereCapacidad('notificaciones-cronograma')));
 it('CP-E04-HU18-03 - Acceso al detalle desde alerta',()=>ejecutarE04(r,'CP-E04-HU18-03',()=>requiereCapacidad('enlace-detalle-alerta')));
 it.each(['completada','cancelada','no aplica'])('CP-E04-HU18-04 - Supresion de alertas: %s',(v)=>ejecutarE04(r,'CP-E04-HU18-04',()=>requiereCapacidad('supresion-alertas'),v));
});
