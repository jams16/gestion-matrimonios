export type BuenaPracticaBase = {
  codigo: string;
  nombre: string;
  descripcion: string;
  aplicacionMatrimonios: string;
  areaGestion: string;
  fuenteMetodologica: string;
  anioFuente: string;
  referenciaEspecifica: string;
  idFaseProyecto: null;
  ejemploPractico: null;
  recomendaciones: null;
};

type Definicion = readonly [string, string, string, string];

const definiciones: Definicion[] = [
  ['GP01', 'Adaptación de la gestión al contexto (tailoring)', 'Enfoque metodológico general', 'Adaptar deliberadamente el enfoque, la gobernanza y los procesos a los objetivos y al entorno del proyecto.'],
  ['GP02', 'Enfoque predictivo de gestión', 'Enfoque metodológico general', 'Establecer anticipadamente actividades, secuencia, plazos, hitos y restricciones como referencia de ejecución y control.'],
  ['GP03', 'Planificación progresiva', 'Enfoque metodológico general', 'Aumentar iterativamente el detalle del plan conforme se dispone de mejor información y estimaciones.'],
  ['GP04', 'Gestión integrada del proyecto', 'Enfoque metodológico general', 'Gestionar componentes e interdependencias del proyecto como parte de un sistema integrado.'],
  ['GP05', 'Ciclo de vida estructurado del proyecto', 'Enfoque metodológico general', 'Organizar el proyecto en fases secuenciales desde el inicio hasta el cierre.'],
  ['GP06', 'Definir objetivos del proyecto', 'Inicio y gobernanza', 'Definir métricas y metas claras, alineadas con los resultados esperados del proyecto.'],
  ['GP07', 'Definir criterios de éxito', 'Inicio y gobernanza', 'Establecer normas y parámetros cualitativos y cuantitativos para evaluar el éxito.'],
  ['GP08', 'Definir el alcance', 'Inicio y gobernanza', 'Delimitar los componentes, servicios y actividades incluidos y excluidos del proyecto.'],
  ['GP09', 'Identificar supuestos y restricciones', 'Inicio y gobernanza', 'Documentar condiciones aceptadas como verdaderas y factores limitantes de la ejecución.'],
  ['GP10', 'Definir funciones', 'Inicio y gobernanza', 'Asignar claramente roles, responsabilidades y responsables de los resultados.'],
  ['GP11', 'Mantener información inicial consolidada del proyecto', 'Inicio y gobernanza', 'Consolidar la información esencial que autoriza y sirve de referencia común al inicio.'],
  ['GP12', 'Identificar interesados', 'Interesados y comunicaciones', 'Reconocer y documentar a quienes intervienen, se ven afectados o influyen en el proyecto.'],
  ['GP13', 'Analizar interesados', 'Interesados y comunicaciones', 'Analizar autoridad, interés, expectativas y necesidades de información de los interesados.'],
  ['GP14', 'Planificar la participación de interesados', 'Interesados y comunicaciones', 'Definir estrategias, momentos y mecanismos de involucramiento de los interesados.'],
  ['GP15', 'Gestionar la participación de interesados', 'Interesados y comunicaciones', 'Trabajar activamente con interesados para atender necesidades, decisiones y problemas.'],
  ['GP16', 'Monitorear la participación', 'Interesados y comunicaciones', 'Evaluar la respuesta y compromiso de los interesados y ajustar el seguimiento.'],
  ['GP17', 'Planificar las comunicaciones', 'Interesados y comunicaciones', 'Definir qué información comunicar, a quién, por qué canal y con qué frecuencia.'],
  ['GP18', 'Gestionar permisos según responsabilidad', 'Interesados y comunicaciones', 'Aplicar controles de acceso e información proporcionales al rol y responsabilidad.'],
  ['GP19', 'Descomponer el alcance', 'Alcance y trabajo', 'Estructurar el alcance total en componentes o cuentas de control gestionables.'],
  ['GP20', 'Desarrollar la estructura del alcance', 'Alcance y trabajo', 'Desglosar componentes y entregables en paquetes de trabajo manejables.'],
  ['GP21', 'Definir criterios de aceptación', 'Alcance y trabajo', 'Establecer condiciones objetivas para considerar completo un entregable o actividad.'],
  ['GP22', 'Validar resultados del alcance', 'Alcance y trabajo', 'Confirmar formalmente con los interesados que los entregables cumplen lo acordado.'],
  ['GP23', 'Monitorear y controlar el alcance', 'Alcance y trabajo', 'Evaluar cambios y evitar incorporaciones no controladas al alcance.'],
  ['GP24', 'Definir actividades', 'Cronograma', 'Identificar y registrar el trabajo necesario para cumplir los resultados del proyecto.'],
  ['GP25', 'Secuenciar actividades', 'Cronograma', 'Determinar relaciones lógicas y dependencias entre las actividades.'],
  ['GP26', 'Estimar duraciones', 'Cronograma', 'Estimar el tiempo requerido para ejecutar actividades usando información disponible.'],
  ['GP27', 'Desarrollar el cronograma', 'Cronograma', 'Construir una programación integrada considerando actividades, dependencias, restricciones y recursos.'],
  ['GP28', 'Gestionar hitos', 'Cronograma', 'Establecer eventos significativos para medir el progreso del proyecto.'],
  ['GP29', 'Identificar actividades críticas', 'Cronograma', 'Reconocer tareas cuyo retraso compromete resultados o fechas posteriores.'],
  ['GP30', 'Utilizar márgenes y holguras', 'Cronograma', 'Incorporar reservas temporales donde existe incertidumbre.'],
  ['GP31', 'Comparar cronograma planificado y real', 'Cronograma', 'Contrastar el desempeño real con la planificación para detectar desviaciones.'],
  ['GP32', 'Reprogramar de manera controlada', 'Cronograma', 'Ajustar fechas manteniendo coherencia entre dependencias y actividades afectadas.'],
  ['GP33', 'Analizar escenarios hipotéticos', 'Cronograma', 'Evaluar consecuencias potenciales de una alteración antes de decidirla.'],
  ['GP34', 'Establecer presupuesto base', 'Gestión financiera y presupuesto', 'Consolidar estimaciones en una referencia económica para controlar el proyecto.'],
  ['GP35', 'Planificar la gestión financiera', 'Gestión financiera y presupuesto', 'Definir cómo estimar, presupuestar, registrar y controlar recursos económicos.'],
  ['GP36', 'Estimar costos', 'Gestión financiera y presupuesto', 'Determinar anticipadamente los costos esperados de servicios, actividades y recursos.'],
  ['GP37', 'Registrar compromisos financieros', 'Gestión financiera y presupuesto', 'Considerar obligaciones económicas aun cuando todavía no hayan sido pagadas.'],
  ['GP38', 'Gestionar pagos, cuotas y saldos', 'Gestión financiera y presupuesto', 'Controlar pagos, cuotas, vencimientos y saldos pendientes durante el proyecto.'],
  ['GP39', 'Comparar estimado, comprometido, pagado y real', 'Gestión financiera y presupuesto', 'Analizar las dimensiones del gasto para obtener una visión financiera realista.'],
  ['GP40', 'Monitorear desviaciones financieras', 'Gestión financiera y presupuesto', 'Comparar el desempeño económico con el presupuesto y actuar ante desviaciones.'],
  ['GP41', 'Mantener reserva para contingencias', 'Gestión financiera y presupuesto', 'Reservar recursos para riesgos identificados y gastos imprevistos.'],
  ['GP42', 'Planificar adquisiciones', 'Proveedores y adquisiciones', 'Determinar qué productos o servicios externos se requieren, cuándo y bajo qué condiciones.'],
  ['GP43', 'Priorizar contrataciones', 'Proveedores y adquisiciones', 'Ordenar las contrataciones según criticidad, dependencia y disponibilidad.'],
  ['GP44', 'Identificar criterios de selección', 'Proveedores y adquisiciones', 'Definir criterios objetivos para comparar alternativas de proveedores.'],
  ['GP45', 'Analizar alternativas', 'Proveedores y adquisiciones', 'Evaluar propuestas antes de adoptar una decisión de contratación.'],
  ['GP46', 'Gestionar contratos', 'Proveedores y adquisiciones', 'Registrar obligaciones, compromisos, condiciones y entregables acordados con proveedores.'],
  ['GP47', 'Monitorear desempeño del proveedor', 'Proveedores y adquisiciones', 'Verificar el cumplimiento de proveedores durante la planificación y ejecución.'],
  ['GP48', 'Planificar recursos', 'Recursos y equipo', 'Identificar recursos humanos, físicos y tecnológicos necesarios.'],
  ['GP49', 'Monitorear disponibilidad de recursos', 'Recursos y equipo', 'Verificar que los recursos estén disponibles cuando y donde se necesitan.'],
  ['GP50', 'Fomentar colaboración efectiva', 'Recursos y equipo', 'Crear condiciones para compartir información, responsabilidades y objetivos.'],
  ['GP51', 'Planificar la calidad', 'Calidad', 'Definir criterios, estándares y mecanismos para cumplir requisitos y expectativas.'],
  ['GP52', 'Controlar calidad de productos y servicios', 'Calidad', 'Verificar entregables frente a criterios de calidad y adoptar correcciones.'],
  ['GP53', 'Mejora continua', 'Calidad', 'Incorporar aprendizajes y hallazgos para mejorar futuros proyectos.'],
  ['GP54', 'Integrar la gestión de riesgos en la planificación', 'Riesgos', 'Incorporar el análisis de riesgos en las decisiones y no tratarlo como actividad aislada.'],
  ['GP55', 'Establecer contexto y alcance del análisis de riesgos', 'Riesgos', 'Definir objetivos, actividades y condiciones consideradas en el análisis de riesgos.'],
  ['GP56', 'Definir criterios de riesgo', 'Riesgos', 'Establecer cómo juzgar la importancia y severidad de los riesgos.'],
  ['GP57', 'Identificar riesgos de forma sistemática', 'Riesgos', 'Encontrar, reconocer y describir incertidumbres que pueden favorecer o impedir objetivos.'],
  ['GP58', 'Considerar causas, eventos y consecuencias', 'Riesgos', 'Analizar cada riesgo por su causa, evento y consecuencias potenciales.'],
  ['GP59', 'Analizar probabilidad e impacto', 'Riesgos', 'Evaluar posibilidad de ocurrencia y magnitud de las consecuencias.'],
  ['GP60', 'Evaluar y priorizar riesgos', 'Riesgos', 'Comparar resultados del análisis para determinar necesidad y prioridad de acción.'],
  ['GP61', 'Asignar propietario del riesgo', 'Riesgos', 'Designar a quien supervisa y gestiona cada riesgo.'],
  ['GP62', 'Seleccionar estrategias de tratamiento', 'Riesgos', 'Determinar la respuesta más apropiada según objetivos, recursos y contexto.'],
  ['GP63', 'Definir planes de contingencia', 'Riesgos', 'Establecer previamente protocolos de respuesta cuando el riesgo se materializa.'],
  ['GP64', 'Monitorear riesgos continuamente', 'Riesgos', 'Revisar riesgos durante todo el ciclo porque su probabilidad e impacto pueden cambiar.'],
  ['GP65', 'Registrar y reportar riesgos', 'Riesgos', 'Mantener documentación actualizada que apoye decisiones y comunicación.'],
  ['GP66', 'Registrar costos asociados a riesgos', 'Riesgos', 'Relacionar respuestas e incidencias con sus consecuencias económicas.'],
  ['GP67', 'Reutilizar conocimiento de riesgos', 'Riesgos', 'Aprender de incidentes anteriores para aumentar la preparación futura.'],
  ['GP68', 'Registrar y resolver incidencias', 'Cambios e incidencias', 'Identificar, documentar y gestionar problemas ocurridos para resolverlos oportunamente.'],
  ['GP69', 'Identificar y evaluar solicitudes de cambio', 'Cambios e incidencias', 'Recibir, registrar y analizar modificaciones antes de decidirlas.'],
  ['GP70', 'Planear la implementación de solicitudes de cambio', 'Cambios e incidencias', 'Definir actividades, recursos, responsables y ajustes para incorporar cambios aprobados.'],
  ['GP71', 'Implementar y cerrar solicitudes de cambio', 'Cambios e incidencias', 'Ejecutar modificaciones autorizadas, actualizar componentes afectados y verificar integración.'],
  ['GP72', 'Gestionar el desempeño del proyecto', 'Seguimiento, medición y control', 'Supervisar continuamente el progreso real frente al planificado.'],
  ['GP73', 'Gestionar las actividades en cada fase', 'Seguimiento, medición y control', 'Asegurar que cada fase complete ordenadamente sus actividades antes de la transición.'],
  ['GP74', 'Gestionar los informes', 'Seguimiento, medición y control', 'Planificar y estructurar información para producir reportes confiables.'],
  ['GP75', 'Informar periódicamente el estado del proyecto', 'Seguimiento, medición y control', 'Transmitir periódicamente estado, pronósticos, riesgos y cumplimiento de objetivos.'],
  ['GP76', 'Cerrar formalmente el proyecto', 'Cierre y aprendizaje', 'Finalizar formalmente actividades, recursos y obligaciones administrativas y operativas.'],
  ['GP77', 'Cerrar adquisiciones y compromisos', 'Cierre y aprendizaje', 'Confirmar obligaciones contractuales satisfechas y liquidar saldos y compromisos.'],
  ['GP78', 'Registrar lecciones aprendidas', 'Cierre y aprendizaje', 'Documentar conocimiento, hallazgos, aciertos y dificultades para proyectos futuros.'],
];

function fuentes(area: string): Pick<BuenaPracticaBase, 'fuenteMetodologica' | 'anioFuente' | 'referenciaEspecifica'> {
  if (area === 'Riesgos') return {
    fuenteMetodologica: 'PMI; ISO 21502; ISO 31000', anioFuente: '2026; 2020; 2018',
    referenciaEspecifica: 'Catálogo de buenas prácticas, Anexo D.10.',
  };
  if (area === 'Cierre y aprendizaje') return {
    fuenteMetodologica: 'PMI; ISO 21502', anioFuente: '2026; 2020',
    referenciaEspecifica: 'Catálogo de buenas prácticas, Anexo D.13.',
  };
  return {
    fuenteMetodologica: 'PMI; ISO 21502', anioFuente: '2026; 2020',
    referenciaEspecifica: `Catálogo de buenas prácticas, área: ${area}.`,
  };
}

const aplicacion = (nombre: string, area: string) =>
  `Aplicar «${nombre}» en la organización del matrimonio, integrándola a la gestión de ${area.toLowerCase()} y a las decisiones de la pareja y del Wedding Planner.`;

export const buenasPracticasBase: BuenaPracticaBase[] = definiciones.map(([codigo, nombre, areaGestion, descripcion]) => ({
  codigo,
  nombre,
  descripcion,
  aplicacionMatrimonios: aplicacion(nombre, areaGestion),
  areaGestion,
  ...fuentes(areaGestion),
  idFaseProyecto: null,
  ejemploPractico: null,
  recomendaciones: null,
}));

export default buenasPracticasBase;
