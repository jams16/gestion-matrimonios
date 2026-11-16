-- Corrección completa de gp_buena_practica basada en el Anexo D del documento de tesis
-- Actualiza GP01-GP78 conservando id_buena_practica y fecha_creacion.
SET client_encoding TO 'UTF8';

BEGIN;

UPDATE gp_buena_practica AS gp
SET
    nombre = v.nombre,
    descripcion = v.descripcion,
    aplicacion_matrimonios = v.aplicacion_matrimonios,
    area_gestion = v.area_gestion,
    fuente_metodologica = v.fuente_metodologica,
    anio_fuente = v.anio_fuente,
    referencia_especifica = v.referencia_especifica,
    id_fase_proyecto = NULL,
    ejemplo_practico = NULL,
    recomendaciones = NULL,
    estado = TRUE,
    version = 1,
    fecha_modificacion = CURRENT_TIMESTAMP
FROM (
    VALUES
        (
        'GP01',
        'Adaptación de la gestión al contexto (tailoring)',
        'El tailoring es la adaptación deliberada del enfoque de gestión de proyectos, la gobernanza y los procesos para alinearse con el entorno y los objetivos del proyecto.',
        'La planificación no debe ser idéntica para todos los matrimonios. Debe adaptarse según las características particulares de cada boda, tales como el presupuesto disponible, el número de invitados, el tipo de ceremonia (civil, religiosa o simbólica), el tiempo disponible para la organización, las locaciones seleccionadas, los proveedores contratados y la logística general.',
        'Enfoque metodológico general',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección de la Guía, p. 103; ISO 21502: sección 4.5.1, p. 11'
        ),
        (
        'GP02',
        'Enfoque predictivo de gestión',
        'Un enfoque predictivo establece anticipadamente los principales componentes del proyecto, como actividades, secuencia, plazos, hitos y restricciones, utilizando dicha planificación como referencia para ejecutar, monitorear y controlar el trabajo.',
        'La organización del matrimonio parte de información inicial para establecer un cronograma base que puede revisarse antes de su aprobación. Luego se detallan aspectos como presupuesto, invitados y proveedores, y se realiza el seguimiento respecto de la planificación establecida. Los cambios o imprevistos que surjan durante la ejecución se gestionan mediante ajustes controlados, manteniendo como referencia el plan aprobado.',
        'Enfoque metodológico general',
        'PMI',
        '2026',
        'PMI: Sección del Estándar, pp. 61-68'
        ),
        (
        'GP03',
        'Planificación progresiva',
        'Elaboración progresiva: proceso iterativo de aumentar el nivel de detalle de un plan de gestión de proyectos a medida que se dispone de mayor cantidad de información y estimaciones más precisas.',
        'Al inicio se establecen los grandes hitos y el presupuesto global; conforme se cuenta con información más precisa, se detallan las actividades mensuales, las contrataciones semanales y, finalmente, se elabora el timing definitivo minuto a minuto para el día del matrimonio.',
        'Enfoque metodológico general',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección del Estándar, p. 71; ISO 21502: sección 7.2, p. 27'
        ),
        (
        'GP04',
        'Gestión integrada del proyecto',
        'El principio de “Adoptar una Visión Holística” implica comprender y gestionar proyectos considerando todos los componentes y sus interdependencias como parte de un sistema más amplio.',
        'La organización de la boda se aborda de forma interconectada, reconociendo que cualquier modificación en una dimensión impacta las demás: por ejemplo, la contratación de un proveedor influye directamente en el presupuesto comprometido, los plazos de pago, la logística, el cronograma general y los riesgos asociados al evento.',
        'Enfoque metodológico general',
        'PMI',
        '2026',
        'PMI: Sección del Estándar, p. 38'
        ),
        (
        'GP05',
        'Ciclo de vida estructurado del proyecto',
        'El ciclo de vida del proyecto es la serie de actividades o fases que atraviesa un proyecto desde su inicio y las acciones de los profesionales del proyecto y otras partes interesadas que trabajan en él o participan en él, hasta su cierre.',
        'Organizar el matrimonio a través de etapas secuenciales y claras que abarcan desde la definición inicial (objetivos y presupuesto), la planificación y contratación de servicios, el seguimiento previo, la coordinación operativa del día de la boda, hasta el cierre posterior y liquidación final del evento.',
        'Enfoque metodológico general',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección de la Guía, p. 16; ISO 21502: sección 4.4, p. 9'
        ),
        (
        'GP06',
        'Definir objetivos del proyecto',
        'Métricas objetivo para el proyecto que estén claramente alineadas y demuestren un impacto significativo a los objetivos estratégicos de la organización.',
        'Consiste en definir desde la etapa inicial las metas fundamentales de los novios para el evento, tales como el presupuesto límite, el número estimado de invitados, el estilo o concepto de la celebración, el nivel de experiencia deseado y las prioridades innegociables de la pareja.',
        'Inicio, gobernanza y definición del proyecto',
        'PMI',
        '2026',
        'PMI: Sección de la Guía, p. 13'
        ),
        (
        'GP07',
        'Definir criterios de éxito',
        'Normas, reglas o pruebas en las que se puede basar un juicio o decisión o mediante las cuales se puede evaluar un producto, servicio, resultado o proceso.',
        'Consiste en establecer los parámetros cualitativos y cuantitativos que determinarán si la boda fue exitosa, como el estricto cumplimiento del presupuesto planificado, la ejecución puntual de las actividades críticas y la respuesta fluida ante imprevistos.',
        'Inicio, gobernanza y definición del proyecto',
        'PMI',
        '2026',
        'PMI: Sección del Estándar, p. 12'
        ),
        (
        'GP08',
        'Definir el alcance',
        'El proceso de desarrollar una descripción detallada o de alto nivel del proyecto y producto.',
        'Consiste en delimitar con claridad todos los componentes, servicios y actividades que formarán parte del matrimonio (ceremonia religiosa/civil, banquete, vestuario, música, fotografía) diferenciándolos explícitamente de aquellos servicios que no serán contratados o asumidos.',
        'Inicio, gobernanza y definición del proyecto',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección de la Guía, p. 42; ISO 21502: sección 7.4, p. 29'
        ),
        (
        'GP09',
        'Identificar supuestos y restricciones',
        'Documentar factores aceptados como verdaderos sin prueba o demostración y factores limitantes que afectan la ejecución del proyecto.',
        'Consiste en formalizar las condiciones dadas e inamovibles del evento, como la fecha fija del matrimonio, el límite presupuestario máximo, el aforo permitido por el local, las ordenanzas municipales sobre horarios de música y las restricciones alimentarias o religiosas.',
        'Inicio, gobernanza y definición del proyecto',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección del Estándar, p. 17; ISO 21502: sección 7.2, p. 24'
        ),
        (
        'GP10',
        'Definir funciones',
        'Definir claramente quién realiza el trabajo y quién responde por los resultados mediante la asignación de roles y responsabilidades.',
        'Consiste en estructurar una asignación clara de roles para cada tarea del matrimonio, determinando quién es el responsable principal de la coordinación con la iglesia, la confirmación de la lista de invitados, el seguimiento de pagos a proveedores y la supervisión del timing en la recepción.',
        'Inicio, gobernanza y definición del proyecto',
        'ISO 21502',
        '2020',
        'ISO 21502: sección 4.5, p. 10'
        ),
        (
        'GP11',
        'Mantener información inicial consolidada del proyecto',
        'El proceso de Iniciar Proyecto o Fase autoriza oficialmente el inicio de un proyecto y establece una referencia común mediante la creación de un documento consolidado de inicio.',
        'Consiste en elaborar una ficha técnica o acta de inicio consolidada del matrimonio que reúna los datos esenciales del evento: nombres de la pareja, fecha seleccionada, lugares de ceremonia y recepción, presupuesto base inicial, estilo de boda y número estimado de asistentes.',
        'Inicio, gobernanza y definición del proyecto',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección de la Guía, p. 17; ISO 21502: sección 6.5, p. 21'
        ),
        (
        'GP12',
        'Identificar interesados',
        'El proceso de identificar periódicamente a las partes interesadas del proyecto y analizar y documentar la información relevante sobre sus intereses, participación, interdependencias, influencia y posible impacto en el éxito del proyecto.',
        'Reconocer e identificar formalmente a todas las personas, grupos u organizaciones que intervienen o se ven afectados por la boda, incluyendo a los novios, el wedding planner, colaboradores del equipo, familiares clave, proveedores de servicios, responsables del local, iglesia e invitados.',
        'Gestión de interesados y comunicaciones',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección de la Guía, p. 71; ISO 21502: sección 7.12, p. 39'
        ),
        (
        'GP13',
        'Analizar interesados',
        'El análisis de las partes interesadas genera una lista de las partes interesadas e información relevante, como sus cargos en la organización, roles en el proyecto, intereses, expectativas, actitudes y su interés en la información sobre el proyecto.',
        'Evaluar el grado de autoridad e interés de cada involucrado en el matrimonio para adaptar la gestión: diferenciar a quienes aprueban las decisiones finales (los novios), quienes ejecutan y coordinan los servicios (wedding planner), quienes deben ser consultados (padres o padrinos) y quienes únicamente reciben información puntual (invitados).',
        'Gestión de interesados y comunicaciones',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección de la Guía, p. 71; ISO 21502: sección 7.12, p. 39'
        ),
        (
        'GP14',
        'Planificar la participación de interesados',
        'El proceso de desarrollar estrategias para involucrar a las partes interesadas identificadas en el proyecto, en función de sus necesidades, expectativas, intereses, requisitos y su posible impacto en el proyecto.',
        'Definir anticipadamente la forma y los momentos clave en que cada participante intervendrá durante la preparación del matrimonio, estableciendo un calendario de revisiones con los novios para aprobaciones de presupuesto y diseño, sesiones de trabajo con proveedores y plazos de comunicación para la lista de invitados.',
        'Gestión de interesados y comunicaciones',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección de la Guía, p. 72; ISO 21502: sección 7.12, p. 39'
        ),
        (
        'GP15',
        'Gestionar la participación de interesados',
        'El proceso de comunicarse y trabajar con las partes interesadas para satisfacer sus necesidades y expectativas, abordar problemas y fomentar la participación adecuada de las partes interesadas.',
        'Interactuar activamente con todos los involucrados a lo largo del proyecto, solicitando a tiempo las confirmaciones de la pareja, coordinando los detalles logísticos con los proveedores y atendiendo oportunamente las inquietudes o cambios requeridos por los familiares e invitados.',
        'Gestión de interesados y comunicaciones',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección de la Guía, p. 72; ISO 21502: sección 7.12, p. 39'
        ),
        (
        'GP16',
        'Monitorear la participación',
        'El proceso de monitorear las relaciones de las partes interesadas del proyecto y adaptar las estrategias para involucrarlas mediante la modificación de los planes de participación.',
        'Evaluar continuamente el nivel de respuesta y compromiso de cada participante, detectando demoras de la pareja en la toma de decisiones, retrasos en la confirmación de asistentes o falta de respuesta de proveedores para ajustar los métodos de seguimiento y comunicación.',
        'Gestión de interesados y comunicaciones',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección de la Guía, p. 73; ISO 21502: sección 7.12, p. 39'
        ),
        (
        'GP17',
        'Planificar las comunicaciones',
        'El proceso de desarrollar un enfoque y un plan apropiados para las actividades de comunicación del proyecto con base en las necesidades de información de las partes interesadas y las necesidades del proyecto.',
        'Establecer de forma estructurada qué información sobre la boda debe ser transmitida a cada grupo, mediante qué canales y con qué frecuencia, definiendo avisos de vencimiento de pagos, recordatorios de pruebas de vestuario, fichas técnicas para proveedores y avisos de asistencia para invitados.',
        'Gestión de interesados y comunicaciones',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección de la Guía, p. 73; ISO 21502: sección 7.12, p. 40'
        ),
        (
        'GP18',
        'Gestionar permisos según responsabilidad',
        'Definir e implementar controles de acceso e información para garantizar que los miembros del equipo y las partes interesadas dispongan de la autoridad y permisos acordes a sus funciones en la gobernanza del proyecto.',
        'Establecer límites claros de acceso a la información y facultades de acción según el rol desempeñado en la boda: el wedding planner administra la planificación global, los novios tienen autoridad sobre la aprobación del presupuesto y selección final, los asistentes gestionan solo las tareas asignadas y los proveedores consultan únicamente el alcance de su contrato.',
        'Gestión de interesados y comunicaciones',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección de la Guía, p. 73; ISO 21502: sección 7.12, p. 40'
        ),
        (
        'GP19',
        'Descomponer el alcance',
        'Dividir y estructurar el alcance total del proyecto en componentes principales o cuentas de control que permitan integrar y gestionar el presupuesto, el cronograma y las responsabilidades del trabajo.',
        'Consiste en descomponer la totalidad de la boda en grandes áreas o cuentas de control operativas y financieras (tales como ceremonia, recepción, proveedores, invitados, presupuesto global, logística y gestión de riesgos), estableciendo los bloques fundamentales sobre los cuales se administrará la organización del evento.',
        'Gestión del alcance y trabajo',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección de la Guía, p. 140; ISO 21502: sección 7.4, pp. 29-30'
        ),
        (
        'GP20',
        'Desarrollar la estructura del alcance',
        'Subdividir los entregables y componentes principales del proyecto en partes cada vez más pequeñas y manejables denominadas paquetes de trabajo para facilitar su asignación, seguimiento y control.',
        'Consiste en desglosar cada área o cuenta principal del matrimonio en paquetes de trabajo específicos y delimitados; por ejemplo, dentro de la recepción, estructurar paquetes de trabajo concretos como la contratación del catering, el alquiler de mobiliario, el diseño de la decoración floral y el servicio de sonido e iluminación.',
        'Gestión del alcance y trabajo',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección de la Guía, p. 42; ISO 21502: sección 7.4, pp. 29-30'
        ),
        (
        'GP21',
        'Definir criterios de aceptación',
        'Establecer condiciones que permiten considerar completo un entregable o actividad.',
        'Establecer los requisitos objetivos que deben cumplirse para dar por completada una tarea o servicio en la boda; por ejemplo, la contratación del catering no se considera finalizada únicamente con elegir la opción, sino cuando se tiene el contrato firmado, el menú probado y aprobado, y la reserva o adelanto financiero realizado.',
        'Gestión del alcance y trabajo',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección de la Guía, p. 42; ISO 21502: sección 7.4, pp. 29-30'
        ),
        (
        'GP22',
        'Validar resultados del alcance',
        'Confirmar con los interesados que lo producido cumple lo acordado.',
        'Revisar formalmente y obtener la conformidad o aprobación explícita de los novios sobre los entregables y propuestas clave antes de su ejecución o producción definitiva, como la prueba de menú del catering, las muestras de la invitación impresas, la propuesta floral o el plano de distribución de mesas.',
        'Gestión del alcance y trabajo',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección de la Guía, p. 44; ISO 21502: sección 7.4, pp. 29-30'
        ),
        (
        'GP23',
        'Monitorear y controlar el alcance',
        'Evitar incorporaciones no controladas y evaluar modificaciones.',
        'Supervisar y gestionar cualquier adición o cambio no planificado en la boda, asegurando que antes de incorporar nuevos servicios, actividades o un incremento en el número de invitados, se analice y evalúe su impacto en el presupuesto, cronograma y logística antes de ser aceptado definitivamente.',
        'Gestión del alcance y trabajo',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección de la Guía, p. 42; ISO 21502: sección 7.4, pp. 29-30'
        ),
        (
        'GP24',
        'Definir actividades',
        'Identificar el trabajo necesario para cumplir los resultados del proyecto.',
        'Consiste en identificar y registrar todas las tareas operativas, administrativas y de coordinación requeridas para llevar a cabo la boda, abarcando la tramitación de documentos, selección de proveedores, gestión de invitados, pagos, logística y detalles de la recepción.',
        'Gestión del cronograma',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección de la Guía, p. 50; ISO 21502: sección 7.6, pp. 32-33'
        ),
        (
        'GP25',
        'Secuenciar actividades',
        'Determinar relaciones y dependencias entre actividades.',
        'Establecer el orden lógico de precedencia entre las tareas de la boda para evitar incoherencias; por ejemplo, no definir el diseño de la decoración sin haber seleccionado el local.',
        'Gestión del cronograma',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección de la Guía, p. 51; ISO 21502: sección 7.6, pp. 32-33'
        ),
        (
        'GP26',
        'Estimar duraciones',
        'Estimar el tiempo necesario para ejecutar actividades considerando información disponible.',
        'Determinar el tiempo requerido para llevar a cabo cada tarea o trámite de la boda con base en la experiencia de los proveedores; por ejemplo, calcular las semanas necesarias para la confección del vestido de novia, el plazo de entrega del expediente matrimonial o el tiempo de respuesta esperado para las invitaciones.',
        'Gestión del cronograma',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección de la Guía, p. 52; ISO 21502: sección 7.6, pp. 32-33'
        ),
        (
        'GP27',
        'Desarrollar el cronograma',
        'Construir una programación integrada considerando actividades, dependencias, restricciones y recursos.',
        'Integrar todas las tareas, plazos, dependencias y fechas fijas en un calendario maestro articulado que organice el proceso desde los meses previos (planificación y contrataciones) hasta el timing detallado minuto a minuto del día del matrimonio.',
        'Gestión del cronograma',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección de la Guía, p. 49; ISO 21502: sección 7.6, pp. 32-33'
        ),
        (
        'GP28',
        'Gestionar hitos',
        'Establecer eventos significativos utilizados para medir progreso.',
        'Fijar puntos de control clave a lo largo de la organización del matrimonio para verificar el avance de la planificación, tales como la aprobación de la fecha y presupuesto inicial, la reserva de la iglesia y local, la contratación de proveedores principales, el cierre del RSVP, el ensayo general y la ejecución de la boda.',
        'Gestión del cronograma',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección de la Guía, p. 49; ISO 21502: sección 7.6, pp. 32-33'
        ),
        (
        'GP29',
        'Identificar actividades críticas',
        'Reconocer tareas cuyo retraso puede comprometer resultados o fechas posteriores.',
        'Identificar aquellas actividades de la boda que no admiten demoras sin poner en riesgo la fecha fijada o el desarrollo del evento; por ejemplo, la reserva de la fecha en la iglesia o local, la apertura del expediente legal matrimonial o la contratación del catering principal.',
        'Gestión del cronograma',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección de la Guía, p. 160; ISO 21502: sección 7.6, pp. 32-33'
        ),
        (
        'GP30',
        'Utilizar márgenes y holguras',
        'Incorporar reservas temporales donde existe incertidumbre.',
        'Incluir colchones de tiempo o margen de maniobra en actividades sensibles a imprevistos, como prever un margen adicional para la llegada del vestido de novia, tiempo extra para el traslado entre la ceremonia y el local, o reservas temporales para el montaje de proveedores el día de la celebración.',
        'Gestión del cronograma',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección de la Guía, p. 160; ISO 21502: sección 7.6, pp. 32-33'
        ),
        (
        'GP31',
        'Comparar cronograma planificado y real',
        'Contrastar desempeño real frente a la planificación.',
        'Supervisar periódicamente el estado de ejecución de las tareas de la boda (no iniciadas, en curso, completadas o retrasadas) respecto a las fechas previstas en el plan inicial, identificando desviaciones a tiempo para adoptar acciones correctivas antes de la fecha del evento.',
        'Gestión del cronograma',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección de la Guía, p. 54; ISO 21502: sección 7.6, pp. 32-33'
        ),
        (
        'GP32',
        'Reprogramar de manera controlada',
        'Ajustar el cronograma cuando cambian condiciones y conservar coherencia entre dependencias.',
        'Modificar de forma coordinada las fechas de las actividades afectadas cuando ocurren imprevistos o demoras por parte de un proveedor, recalculando las fechas de las tareas sucesoras e hitos relacionados para mantener la coherencia temporal de todo el proyecto nupcial.',
        'Gestión del cronograma',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección de la Guía, p. 54; ISO 21502: sección 7.6, pp. 32-33'
        ),
        (
        'GP33',
        'Analizar escenarios hipotéticos',
        'Evaluar consecuencias potenciales de una alteración antes de decidir.',
        'Evaluar previamente el impacto que tendría un posible cambio o retraso en la boda antes de confirmarlo; por ejemplo, qué repercusión tendría cambiar el horario de la ceremonia en el contrato del fotógrafo y el transporte.',
        'Gestión del cronograma',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección de la Guía, p. 55; ISO 21502: sección 7.6, pp. 32-33'
        ),
        (
        'GP34',
        'Establecer presupuesto base',
        'Consolidar estimaciones en una referencia económica contra la cual controlar el proyecto.',
        'Consiste en formalizar el presupuesto global aprobado para la boda y asignar los límite de gasto a cada categoría, sirviendo como la línea base oficial de comparación para evitar excesos financieros por parte de la pareja.',
        'Gestión financiera y presupuesto',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección de la Guía, p. 64; ISO 21502: sección 7.7, pp. 33-34'
        ),
        (
        'GP35',
        'Planificar la gestión financiera',
        'Definir cómo se estimarán, presupuestarán, registrarán y controlarán los recursos económicos.',
        'Consiste en establecer desde la etapa inicial las categorías de gasto del matrimonio (locación, catering, vestuario, fotografía, música, decoración), fijando el monto total disponible, los responsables de la administración de los fondos y los mecanismos de actualización y revisión económica.',
        'Gestión financiera y presupuesto',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección de la Guía, pp. 62-63; ISO 21502: sección 7.7, p. 33'
        ),
        (
        'GP36',
        'Estimar costos',
        'Determinar anticipadamente los costos esperados.',
        'Consiste en calcular previamente el valor estimado de cada servicio, proveedor o actividad nupcial (por ejemplo, proyectar el costo por persona del banquete, el alquiler del local o el valor del vestuario) antes de asumir compromisos contractuales.',
        'Gestión financiera y presupuesto',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección de la Guía, pp. 62-63; ISO 21502: sección 7.7, pp. 33-34'
        ),
        (
        'GP37',
        'Registrar compromisos financieros',
        'Considerar obligaciones económicas aunque todavía no hayan sido pagadas.',
        'Implica contabilizar inmediatamente el valor total de un contrato firmado con un proveedor de la boda como costo comprometido dentro del presupuesto global, aun cuando únicamente se haya abonado un adelanto o reserva inicial.',
        'Gestión financiera y presupuesto',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección de la Guía, p. 64; ISO 21502: sección 7.7, pp. 33-34'
        ),
        (
        'GP38',
        'Gestionar pagos, cuotas y saldos',
        'Controlar obligaciones financieras a lo largo del proyecto.',
        'Consiste en estructurar y supervisar los calendarios de vencimiento de cada proveedor, registrando adelantos entregados, fechas de cuotas intermedias, importes efectivamente pagados y saldos pendientes por liquidar.',
        'Gestión financiera y presupuesto',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección de la Guía, p. 64; ISO 21502: sección 7.7, pp. 33-34'
        ),
        (
        'GP39',
        'Comparar estimado, comprometido, pagado y real',
        'Analizar distintas dimensiones del gasto para obtener una visión realista.',
        'Consiste en examinar conjuntamente lo proyectado para cada rubro, lo contratado formalmente con los proveedores, lo ya desembolsado y los compromisos pendientes, brindando a la pareja y al planner un estado financiero integral y transparente.',
        'Gestión financiera y presupuesto',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección de la Guía, p. 64; ISO 21502: sección 7.7, pp. 33-34'
        ),
        (
        'GP40',
        'Monitorear desviaciones financieras',
        'Comparar el desempeño económico actual con el presupuesto y actuar ante desviaciones.',
        'Supervisar periódicamente las finanzas del matrimonio respecto al plan inicial, detectando incrementos de costo o sobrepresupuestos en rubros específicos para tomar medidas correctivas o reasignar fondos entre categorías a tiempo.',
        'Gestión financiera y presupuesto',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección de la Guía, p. 65; ISO 21502: sección 7.7, pp. 33-34'
        ),
        (
        'GP41',
        'Mantener reserva para contingencias',
        'Considerar recursos destinados a riesgos identificados o gastos imprevistos.',
        'Disponer de un fondo o porcentaje reservado dentro del presupuesto total de la boda destinado a cubrir eventos inciertos o gastos no planificados de última hora, como imprevistos logísticos, variaciones de aforo o soluciones climáticas de emergencia.',
        'Gestión financiera y presupuesto',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección de la Guía, p. 64; ISO 21502: sección 7.7, pp. 33-34'
        ),
        (
        'GP42',
        'Planificar adquisiciones',
        'Determinar qué productos o servicios externos se necesitarán, cuándo y bajo qué condiciones.',
        'Consiste en identificar todas las necesidades de contratación externa requeridas para la boda (tales como locación, banquete, música, fotografía, vestuario, floristería y transporte) y programar los momentos oportunos a lo largo de la planificación para iniciar la búsqueda y acordar cada servicio.',
        'Gestión de proveedores y adquisiciones',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección de la Guía, pp. 20-21; ISO 21502: sección 7.17, pp. 43-44'
        ),
        (
        'GP43',
        'Priorizar contrataciones',
        'Determinar el orden de contratación según criticidad, dependencia y disponibilidad.',
        'Establecer la secuencia lógica de reserva de proveedores evaluando la demanda del mercado nupcial; por ejemplo, asegurar en primer lugar la fecha en la iglesia o juzgado, la locación de la recepción, el catering y la fotografía por contar con agenda limitada, antes de avanzar con contrataciones secundarias.',
        'Gestión de proveedores y adquisiciones',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección de la Guía, pp. 20-21; ISO 21502: sección 7.17, pp. 43-44'
        ),
        (
        'GP44',
        'Identificar criterios de selección',
        'Establecer criterios objetivos para comparar alternativas.',
        'Fijar los parámetros clave de evaluación para la elección de cada proveedor de la boda, considerando el costo del paquete, la calidad del servicio, la experiencia en eventos similares, la disponibilidad en la fecha seleccionada, la flexibilidad de adaptación y la agilidad de respuesta.',
        'Gestión de proveedores y adquisiciones',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección de la Guía, pp. 20-21; ISO 21502: sección 7.17, pp. 43-44'
        ),
        (
        'GP45',
        'Analizar alternativas',
        'Evaluar varias soluciones antes de adoptar una decisión.',
        'Comparar de manera sistemática distintas propuestas o cotizaciones dentro de una misma categoría de servicio nupcial (por ejemplo, evaluar tres empresas de catering o dos propuestas de diseño floral) sopesando sus beneficios, condiciones y costos antes de tomar la decisión final.',
        'Gestión de proveedores y adquisiciones',
        'PMI',
        '2026',
        'PMI: Sección de la Guía, pp. 20-21'
        ),
        (
        'GP46',
        'Gestionar contratos',
        'Registrar obligaciones, compromisos, condiciones y entregables acordados.',
        'Formalizar los acuerdos con cada proveedor nupcial detallando por escrito el alcance del servicio, montos totales pactados, esquema de adelantos y cuotas, fechas de entrega, políticas de cancelación y requerimientos logísticos específicos para el día del evento.',
        'Gestión de proveedores y adquisiciones',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección de la Guía, pp. 20-21; ISO 21502: sección 7.17, pp. 43-44'
        ),
        (
        'GP47',
        'Monitorear desempeño del proveedor',
        'Verificar cumplimiento durante la planificación y ejecución.',
        'Realizar un seguimiento continuo al desempeño de los proveedores contratados a lo largo del proceso organizativo y durante el día B, supervisando la puntualidad, la calidad de la atención, la fluidez en la comunicación y el cumplimiento estricto de las condiciones contractuales.',
        'Gestión de proveedores y adquisiciones',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección de la Guía, pp. 20-21; ISO 21502: sección 7.17, pp. 43-44'
        ),
        (
        'GP48',
        'Planificar recursos',
        'Identificar los recursos humanos, físicos y tecnológicos necesarios.',
        'Consiste en determinar y cuantificar previamente todos los recursos personales, logísticos y materiales requeridos para la preparación y ejecución del matrimonio, abarcando el equipo de asistencia el día B, transportes, mobiliario, elementos decorativos, equipamiento técnico y kits de emergencia.',
        'Gestión de recursos y equipo',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección de la Guía, pp. 81-83; ISO 21502: sección 7.5, pp. 30-32'
        ),
        (
        'GP49',
        'Monitorear disponibilidad de recursos',
        'Verificar que los recursos estén disponibles cuando y donde se necesitan.',
        'Consiste en comprobar de forma continua que el personal de asistencia, los transportes, los materiales y los equipos confirmados estén presentes en la ubicación adecuada y en el horario exacto estipulado en la pauta o timing de la boda.',
        'Gestión de recursos y equipo',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección de la Guía, pp. 87-88; ISO 21502: sección 7.5, pp. 30-32'
        ),
        (
        'GP50',
        'Fomentar colaboración efectiva',
        'Crear condiciones para que el equipo comparta información, responsabilidades y objetivos.',
        'Consiste en establecer un entorno de coordinación transparente y fluido entre el wedding planner, la pareja, los coordinadores de campo y los colaboradores, manteniendo alineados los objetivos del matrimonio, el avance de las asignaciones y la resolución de imprevistos mediante canales directos e información centralizada.',
        'Gestión de recursos y equipo',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección de la Guía, p. 86; ISO 21502: sección 7.5, pp. 30-32'
        ),
        (
        'GP51',
        'Planificar la calidad',
        'Definir los criterios, estándares y mecanismos necesarios para garantizar que los resultados y servicios del proyecto cumplan con las expectativas y requisitos de las partes interesadas.',
        'Consiste en establecer desde la fase inicial de planificación los criterios de aceptación y estándares de calidad requeridos para cada propuesta, servicio y entregable clave de la boda, tales como los atributos esperados del catering, la decoración floral, la fotografía y el vestuario.',
        'Gestión de calidad',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección de la Guía, p. 129; ISO 21502: sección 7.11, pp. 37-39'
        ),
        (
        'GP52',
        'Controlar calidad de productos y servicios',
        'Verificar los resultados y entregables obtenidos frente a los criterios de calidad definidos previamente y adoptar acciones correctivas ante cualquier no conformidad o incumplimiento.',
        'Consiste en supervisar e inspeccionar directamente el cumplimiento de los servicios y productos entregados por cada proveedor contratado para la boda (como comprobar la calidad del montaje, la presentación del banquete o la puntualidad del transporte), gestionando reclamos o ajustes inmediatos en caso de desviaciones.',
        'Gestión de calidad',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección de la Guía, p. 23; ISO 21502: sección 7.11, pp. 37-39'
        ),
        (
        'GP53',
        'Mejora continua',
        'Incorporar los aprendizajes y hallazgos obtenidos durante la ejecución para aumentar la eficacia, eficiencia y calidad de los procesos en proyectos futuros.',
        'Consiste en analizar la experiencia operativa y los resultados obtenidos al concluir cada matrimonio para actualizar y perfeccionar las plantillas de planificación, las listas de verificación, el catálogo de proveedores recomendados y los protocolos de coordinación para futuros eventos nupciales.',
        'Gestión de calidad',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección de la Guía, p. 43; ISO 21502: sección 5.3, p. 16'
        ),
        (
        'GP54',
        'Integrar la gestión de riesgos en la planificación',
        'El riesgo debe formar parte de las decisiones y no gestionarse como actividad aislada.',
        'Consiste en incorporar el análisis de riesgos de manera continua durante todas las decisiones del matrimonio, evaluando la incertidumbre al definir la fecha, contratar proveedores, estructurar el presupuesto, distribuir el cronograma y coordinar la logística del día de la boda.',
        'Gestión de riesgos',
        'PMI; ISO 21502; ISO 31000',
        '2026; 2020; 2018',
        'PMI: Sección de la Guía, pp. 92-94; ISO 21502: sección 7.8, pp. 34-35; ISO 31000: sección 6.1, p. 8'
        ),
        (
        'GP55',
        'Establecer contexto y alcance del análisis de riesgos',
        'Definir qué objetivos, actividades y condiciones serán considerados.',
        'Consiste en delimitar el marco de evaluación de riesgos para cada boda considerando sus factores singulares, tales como la época del año, el tipo de locación (al aire libre o techada), el estilo de ceremonia, el número de invitados y las condiciones de los proveedores contratados.',
        'Gestión de riesgos',
        'ISO 31000',
        '2018',
        'ISO 31000: sección 6.3.2, p. 10'
        ),
        (
        'GP56',
        'Definir criterios de riesgo',
        'Establecer cómo se juzgará la importancia de los riesgos.',
        'Fijar de antemano las escalas de probabilidad e impacto (niveles de severidad bajo, medio, alto o crítico) para evaluar objetivamente la relevancia de cualquier imprevisto o eventualidad que pueda surgir durante la boda.',
        'Gestión de riesgos',
        'PMI; ISO 31000',
        '2026; 2018',
        'PMI: Sección de la Guía, p. 95; ISO 31000: sección 6.3.4, p. 10'
        ),
        (
        'GP57',
        'Identificar riesgos de forma sistemática',
        'Encontrar, reconocer y describir incertidumbres que puedan favorecer o impedir objetivos.',
        'Consiste en identificar y listar estructuradamente todas las amenazas y oportunidades que podrían afectar la boda, como mal tiempo, retrasos de proveedores, fallas técnicas en sonido/iluminación, cancelaciones de última hora o ausencias de invitados clave.',
        'Gestión de riesgos',
        'PMI; ISO 21502; ISO 31000',
        '2026; 2020; 2018',
        'PMI: Sección de la Guía, pp. 96; ISO 21502: sección 7.8, pp. 34-35; ISO 31000: sección 6.4.2, p. 11'
        ),
        (
        'GP58',
        'Considerar causas, eventos y consecuencias',
        'Un riesgo debe analizarse más allá de un simple nombre.',
        'Analizar cada evento incierto desglosando su origen, manifestación y efectos; por ejemplo, ante el riesgo de lluvia, identificar la causa (temporada de precipitaciones), el evento (lluvia durante el coctel exterior) y la consecuencia (daño en la decoración, retraso en el banquete y reubicación de invitados).',
        'Gestión de riesgos',
        'ISO 31000',
        '2018',
        'ISO 31000: sección 6.4.3, p. 12'
        ),
        (
        'GP59',
        'Analizar probabilidad e impacto',
        'Evaluar la posibilidad de ocurrencia y magnitud de las consecuencias.',
        'Ponderar la posibilidad de que suceda cada imprevisto identificado en la boda y medir la magnitud del impacto económico, temporal o emocional que provocaría si llegara a materializarse.',
        'Gestión de riesgos',
        'PMI; ISO 21502; ISO 31000',
        '2026; 2020; 2018',
        'PMI: Sección de la Guía, p. 96; ISO 21502: sección 7.8, pp. 34-35; ISO 31000: sección 6.4.3, p. 12'
        ),
        (
        'GP60',
        'Evaluar y priorizar riesgos',
        'Comparar los resultados del análisis con criterios establecidos para determinar necesidad de acción.',
        'Clasificar los riesgos del matrimonio según su nivel de severidad calculado, permitiendo que la pareja y el wedding planner concentren sus esfuerzos de atención y recursos en las amenazas más urgentes o de mayor impacto.',
        'Gestión de riesgos',
        'ISO 21502; ISO 31000',
        '2020; 2018',
        'ISO 21502: sección 7.8, pp. 34-35; ISO 31000: sección 6.4.4, p. 12'
        ),
        (
        'GP61',
        'Asignar propietario del riesgo',
        'Determinar quién tiene responsabilidad de supervisar y gestionar cada riesgo.',
        'Designar formalmente a un encargado (el wedding planner, la novia, el novio o un asistente de coordinación) para supervisar un riesgo específico y activar el plan de respuesta si la situación lo requiere.',
        'Gestión de riesgos',
        'ISO 31000',
        '2018',
        'ISO 31000: sección 5.4.3, p. 7'
        ),
        (
        'GP62',
        'Seleccionar estrategias de tratamiento',
        'Determinar la respuesta más apropiada según objetivos, recursos y contexto.',
        'Seleccionar el enfoque de respuesta más conveniente para cada riesgo de la boda, eligiendo entre evitar la amenaza, reducir su probabilidad/impacto, transferirla (mediante contratos o seguros) o aceptarla formalmente.',
        'Gestión de riesgos',
        'PMI; ISO 31000',
        '2026; 2018',
        'PMI: Sección de la Guía, pp. 98-99; ISO 31000: sección 6.5.2, p. 13'
        ),
        (
        'GP63',
        'Definir planes de contingencia',
        'Establecer previamente qué hacer cuando el riesgo se materializa.',
        'Diseñar protocolos de emergencia a ser ejecutados si el problema ocurre durante la boda, como disponer de un grupo electrógeno de respaldo, contar con contactos de proveedores alternativos o habilitar un salón interior secundario.',
        'Gestión de riesgos',
        'PMI; ISO 31000',
        '2026; 2018',
        'PMI: Sección de la Guía, pp. 98-99; ISO 31000: sección 6.5.3, p. 14'
        ),
        (
        'GP64',
        'Monitorear riesgos continuamente',
        'Revisar riesgos durante todo el ciclo del proyecto porque su probabilidad o impacto puede cambiar.',
        'Revisar periódicamente el estado de los riesgos a lo largo de toda la organización del matrimonio, reconociendo que un riesgo inicialmente bajo (como la previsión meteorológica o el estado de un permiso) puede volverse crítico a medida que se acerca el día del evento.',
        'Gestión de riesgos',
        'PMI; ISO 21502; ISO 31000',
        '2026; 2020; 2018',
        'PMI: Sección de la Guía, pp. 98-100; ISO 21502: sección 7.8, pp. 34-35; ISO 31000: sección 6.6, p. 14'
        ),
        (
        'GP65',
        'Registrar y reportar riesgos',
        'Mantener documentación actualizada que apoye decisiones y comunicación.',
        'Mantener un registro y reporte actualizado de los riesgos de la boda que detalle la causa, consecuencia, severidad, responsable y estado de los planes de respuesta, facilitando la toma de decisiones con la pareja.',
        'Gestión de riesgos',
        'PMI; ISO 31000',
        '2026; 2018',
        'PMI: Sección de la Guía, pp. 98-99; ISO 31000: sección 6.7, p. 13'
        ),
        (
        'GP66',
        'Registrar costos asociados a riesgos',
        'Relacionar las respuestas e incidencias con sus consecuencias económicas.',
        'Contabilizar y vincular los costos económicos derivados de la activación de medidas preventivas o planes de contingencia dentro del presupuesto general del matrimonio.',
        'Gestión de riesgos',
        'PMI; ISO 31000',
        '2026; 2018',
        'PMI: Sección de la Guía, p. 60; ISO 31000: sección 6.7, p. 13'
        ),
        (
        'GP67',
        'Reutilizar conocimiento de riesgos',
        'Aprender de incidentes anteriores para aumentar la preparación futura.',
        'Documentar e incorporar las lecciones aprendidas e imprevistos superados en matrimonios previos dentro del catálogo de riesgos del wedding planner, mejorando la capacidad de prevención para futuros eventos nupciales.',
        'Gestión de riesgos',
        'PMI; ISO 31000',
        '2026; 2018',
        'PMI: Sección de la Guía, pp. 24-25; ISO 31000: sección 5.7.2, p. 8'
        ),
        (
        'GP68',
        'Registrar y resolver incidencias',
        'Identificar, documentar y gestionar los problemas ocurridos durante el proyecto para resolverlos de manera oportuna y evitar impactos negativos en el logro de los objetivos.',
        'Consiste en registrar y abordar inmediatamente cualquier imprevisto o problema ya materializado durante la planificación o el día de la boda (como la falla del sistema de sonido, la demora en la entrega de la torta o el incumplimiento de un proveedor) para implementar soluciones rápidas y evitar que afecte el desarrollo del evento.',
        'Gestión de cambios e incidencias',
        'ISO 21502',
        '2020',
        'ISO 21502: sección 7.9, pp. 35-36'
        ),
        (
        'GP69',
        'Identificar y evaluar solicitudes de cambio',
        'Recibir, registrar y analizar las modificaciones propuestas al proyecto, evaluando su impacto en el alcance, cronograma, presupuesto, calidad y riesgos antes de tomar una decisión.',
        'Consiste en formalizar y analizar detalladamente cualquier propuesta de modificación realizada por la pareja (como aumentar el número de invitados, cambiar el menú del banquete o reubicar el lugar del coctel), determinando previamente el impacto económico, temporal y logístico que provocará antes de autorizarla.',
        'Gestión de cambios e incidencias',
        'ISO 21502',
        '2020',
        'ISO 21502: sección 7.10, pp. 36-37'
        ),
        (
        'GP70',
        'Planear la implementación de solicitudes de cambio',
        'Definir las actividades, recursos, responsables y ajustes requeridos en los planes del proyecto para incorporar de manera coordinada los cambios aprobados.',
        'Consiste en diseñar la reprogramación y reasignación de actividades necesaria tras la aprobación de una modificación en la boda; por ejemplo, si los novios aprueban cambiar el horario de la ceremonia religiosa, planificar los ajustes en las horas de llegada de fotógrafos, el servicio de transporte, la entrega del ramo y el montaje del salón.',
        'Gestión de cambios e incidencias',
        'ISO 21502',
        '2020',
        'ISO 21502: sección 7.10, pp. 36-37'
        ),
        (
        'GP71',
        'Implementar y cerrar solicitudes de cambio',
        'Ejecutar las modificaciones autorizadas, actualizar los componentes e información del proyecto afectados y verificar su correcta integración antes de dar por concluida la solicitud de cambio.',
        'Consiste en llevar a cabo efectivamente los ajustes aprobados en el matrimonio (actualizar contratos con proveedores, ajustar el presupuesto global, modificar el cronograma de trabajo y notificar a los involucrados), registrando el cierre formal de la modificación al comprobar que todos los planes han quedado alineados.',
        'Gestión de cambios e incidencias',
        'ISO 21502',
        '2020',
        'ISO 21502: sección 7.10, pp. 36-37'
        ),
        (
        'GP72',
        'Gestionar el desempeño del proyecto',
        'Supervisar y controlar continuamente el progreso general del proyecto mediante el seguimiento y evaluación del rendimiento real frente al planificado para garantizar el cumplimiento de los objetivos.',
        'Consiste en supervisar de manera constante la salud y avance global de la boda, evaluando si el cumplimiento de las contrataciones, los gastos incurridos y los plazos de trabajo se mantienen alineados con la planificación inicial para adoptar ajustes inmediatos ante cualquier desviación.',
        'Seguimiento, medición y control',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección de la Guía, pp. 26-27; ISO 21502: sección 6.6, pp. 22-24'
        ),
        (
        'GP73',
        'Gestionar las actividades en cada fase',
        'Asegurar que las actividades correspondientes a cada etapa del ciclo de vida del proyecto se inicien, ejecuten, monitoreen y concluyan ordenadamente antes de autorizar la transición a la siguiente fase.',
        'Consiste en coordinar y supervisar secuencialmente cada periodo de la boda (como la definición inicial, la preparación logística final y la ejecución del día de la boda), verificando que los compromisos y entregables de cada etapa estén satisfechos antes de avanzar a la siguiente.',
        'Seguimiento, medición y control',
        'ISO 21502',
        '2020',
        'ISO 21502: sección 6.6, pp. 22-24'
        ),
        (
        'GP74',
        'Gestionar los informes',
        'Planificar, recopilar y estructurar la información del proyecto para generar reportes confiables que respondan a las necesidades de comunicación de las partes interesadas.',
        'Consiste en consolidar y organizar periódicamente la información relevante del matrimonio (estado presupuestario, tareas completadas, confirmaciones de asistencia) para elaborar resúmenes oportunos adaptados tanto a los novios como al equipo organizador.',
        'Seguimiento, medición y control',
        'ISO 21502',
        '2020',
        'ISO 21502: sección 7.15, p. 42'
        ),
        (
        'GP75',
        'Informar periódicamente el estado del proyecto',
        'Consolidar y transmitir periódicamente la información actualizada sobre el estado del proyecto, pronósticos, riesgos y cumplimiento de objetivos para facilitar la toma de decisiones informadas.',
        'Consiste en presentar de manera sistemática y regular a la pareja un reporte claro del estado del matrimonio, reuniendo el balance del presupuesto, el estado de la lista de invitados (RSVP), el avance del cronograma y las próximas aprobaciones o pagos requeridos.',
        'Seguimiento, medición y control',
        'ISO 21502',
        '2020',
        'ISO 21502: sección 7.15, p. 42'
        ),
        (
        'GP76',
        'Cerrar formalmente el proyecto',
        'Finalizar oficialmente todas las actividades del proyecto o fase, formalizando la terminación administrativa y operativa y liberando los recursos asignados.',
        'Consiste en declarar oficialmente concluida la organización del matrimonio una vez solventadas todas las actividades posteriores al evento, cerrando la gestión del proyecto, realizando el balance financiero definitivo y dando por finalizadas las funciones de coordinación del equipo.',
        'Cierre y aprendizaje',
        'PMI; ISO 21502',
        '2026; 2020',
        'PMI: Sección de la Guía, p. 31; ISO 21502: sección 6.8, p. 25-26'
        ),
        (
        'GP77',
        'Cerrar adquisiciones y compromisos',
        'Confirmar que todas las obligaciones contractuales con proveedores externos hayan sido satisfechas, liquidando saldos, gestionando garantías y cerrando formalmente los acuerdos.',
        'Consiste en verificar el cumplimiento total de los contratos de servicios de la boda (catering, fotografía, música, locación, vestuario), confirmando la recepción de todos los entregables finales acordados y la liquidación de pagos para dar por concluidas las relaciones contractuales.',
        'Cierre y aprendizaje',
        'ISO 21502',
        '2020',
        'ISO 21502: sección 7.17, p. 43-44'
        ),
        (
        'GP78',
        'Registrar lecciones aprendidas',
        'Documentar el conocimiento, hallazgos, aciertos y dificultades experimentadas durante el proyecto para mejorar el desempeño en iniciativas futuras.',
        'Consiste en identificar y documentar los aprendizajes obtenidos durante la planificación y ejecución del matrimonio (qué funcionó adecuadamente, qué problemas imprevistos surgieron, qué proveedores destacaron y qué aspectos logísticos deben ajustarse) para disponer de referencias valiosas en próximos eventos nupciales.',
        'Cierre y aprendizaje',
        'ISO 21502',
        '2020',
        'ISO 21502: sección 7.18, p. 44-45'
        )
) AS v(
    codigo,
    nombre,
    descripcion,
    aplicacion_matrimonios,
    area_gestion,
    fuente_metodologica,
    anio_fuente,
    referencia_especifica
)
WHERE gp.codigo = v.codigo;

-- Debe devolver 78.
SELECT COUNT(*) AS buenas_practicas_actualizadas
FROM gp_buena_practica
WHERE codigo BETWEEN 'GP01' AND 'GP78';

-- Revisión rápida del contenido corregido.
SELECT codigo, nombre, area_gestion, fuente_metodologica, anio_fuente, referencia_especifica
FROM gp_buena_practica
WHERE codigo BETWEEN 'GP01' AND 'GP78'
ORDER BY codigo;

COMMIT;
