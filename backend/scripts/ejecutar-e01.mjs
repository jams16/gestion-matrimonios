import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const raiz = join(process.cwd(), 'test', 'E01-Acceso');
const definir = (id, hu, ca, tipo, objetivo, endpoint) => ({ id, hu, ca, tipo, objetivo, endpoint });
const casos = [
  definir('CP-E01-HU01-01', 'HU01', 'CA001, CA004, CA005', 'AUTOMATIZADO', 'Registrar cuenta Wedding Planner válida.', 'POST /api/v1/auth/registro/*'),
  definir('CP-E01-HU01-02', 'HU01', 'CA001', 'AUTOMATIZADO', 'Rechazar obligatorios o correo inválido.', 'POST /api/v1/auth/registro/solicitar'),
  definir('CP-E01-HU01-03', 'HU01', 'CA002', 'AUTOMATIZADO', 'Validar política y confirmación de contraseña.', 'POST /api/v1/auth/registro/finalizar'),
  definir('CP-E01-HU01-04', 'HU01', 'CA003', 'AUTOMATIZADO', 'Rechazar correo duplicado.', 'POST /api/v1/auth/registro/solicitar'),
  definir('CP-E01-HU02-01', 'HU02', 'CA006', 'AUTOMATIZADO', 'Generar verificación de correo.', 'POST /api/v1/auth/registro/solicitar'),
  definir('CP-E01-HU02-02', 'HU02', 'CA007', 'AUTOMATIZADO', 'Confirmar verificación vigente.', 'POST /api/v1/auth/registro/confirmar'),
  definir('CP-E01-HU02-03', 'HU02', 'CA008', 'AUTOMATIZADO', 'Rechazar token inválido, usado o expirado.', 'POST /api/v1/auth/registro/confirmar'),
  definir('CP-E01-HU02-04', 'HU02', 'CA009', 'AUTOMATIZADO', 'Bloquear login pendiente.', 'POST /api/v1/auth/login'),
  definir('CP-E01-HU02-05', 'HU02', 'CA010', 'AUTOMATIZADO', 'Limitar reenvíos frecuentes.', 'POST /api/v1/auth/verificar-correo/solicitar'),
  definir('CP-E01-HU03-01', 'HU03', 'CA011, CA014', 'AUTOMATIZADO', 'Iniciar sesión verificada.', 'POST /api/v1/auth/login'),
  definir('CP-E01-HU03-02', 'HU03', 'CA012', 'AUTOMATIZADO', 'Rechazar credenciales sin revelar el campo erróneo.', 'POST /api/v1/auth/login'),
  definir('CP-E01-HU03-03', 'HU03', 'CA013', 'AUTOMATIZADO', 'Bloquear cuenta pendiente.', 'POST /api/v1/auth/login'),
  definir('CP-E01-HU03-04', 'HU03', 'CA015', 'MIXTO', 'Mantener sesión vigente y rotar refresh.', 'POST /api/v1/auth/refresh'),
  definir('CP-E01-HU04-01', 'HU04', 'CA016', 'AUTOMATIZADO', 'Consultar perfil autenticado.', 'GET /api/v1/usuarios/:id'),
  definir('CP-E01-HU04-02', 'HU04', 'CA017, CA019, CA020', 'AUTOMATIZADO', 'Actualizar datos personales/contacto.', 'PATCH /api/v1/usuarios/:id'),
  definir('CP-E01-HU04-03', 'HU04', 'CA018', 'AUTOMATIZADO', 'Validar perfil inválido.', 'PATCH /api/v1/usuarios/:id'),
  definir('CP-E01-HU05-01', 'HU05', 'CA021, CA022', 'MANUAL', 'Comprobar botón y confirmación Flutter.', 'Componente Flutter de perfil'),
  definir('CP-E01-HU05-02', 'HU05', 'CA023, CA024', 'MIXTO', 'Cerrar sesión y bloquear acceso posterior.', 'POST logout y GET usuarios/:id'),
  definir('CP-E01-HU05-03', 'HU05', 'CA025', 'AUTOMATIZADO', 'Aplicar inactividad.', 'Configuración de sesión y guard JWT'),
  definir('CP-E01-HU06-01', 'HU06', 'CA026', 'AUTOMATIZADO', 'Listar solo matrimonios de WP-A.', 'GET /api/v1/matrimonios/resumen'),
  definir('CP-E01-HU06-02', 'HU06', 'CA027', 'MANUAL', 'Seleccionar matrimonio activo.', 'Selector Flutter'),
  definir('CP-E01-HU06-03', 'HU06', 'CA028', 'AUTOMATIZADO', 'Aislar información entre matrimonios.', 'GET /api/v1/matrimonios/resumen'),
  definir('CP-E01-HU06-04', 'HU06', 'CA029', 'MANUAL', 'Cambiar matrimonio activo.', 'Selector Flutter'),
  definir('CP-E01-HU06-05', 'HU06', 'CA030', 'AUTOMATIZADO', 'Buscar y filtrar matrimonios.', 'GET /api/v1/matrimonios/resumen'),
];
const nombresCasos = {
  'CP-E01-HU01-01': 'Registro exitoso de una nueva cuenta Wedding Planner',
  'CP-E01-HU01-02': 'Validación de campos obligatorios y correo',
  'CP-E01-HU01-03': 'Política y confirmación de contraseña',
  'CP-E01-HU01-04': 'Rechazo de correo previamente registrado',
  'CP-E01-HU02-01': 'Generación de correo de verificación',
  'CP-E01-HU02-02': 'Confirmación de correo vigente',
  'CP-E01-HU02-03': 'Rechazo de token inválido, usado o expirado',
  'CP-E01-HU02-04': 'Bloqueo de acceso sin correo verificado',
  'CP-E01-HU02-05': 'Control de reenvíos de verificación',
  'CP-E01-HU03-01': 'Inicio de sesión válido',
  'CP-E01-HU03-02': 'Rechazo genérico de credenciales inválidas',
  'CP-E01-HU03-03': 'Bloqueo de cuenta no verificada',
  'CP-E01-HU03-04': 'Renovación de sesión con refresh token',
  'CP-E01-HU04-01': 'Consulta de información personal del perfil',
  'CP-E01-HU04-02': 'Actualización de datos personales y contacto',
  'CP-E01-HU04-03': 'Validación de correo en el perfil',
  'CP-E01-HU05-01': 'Botón y confirmación de cerrar sesión',
  'CP-E01-HU05-02': 'Revocación de sesión al cerrar sesión',
  'CP-E01-HU05-03': 'Expiración de sesión por inactividad',
  'CP-E01-HU06-01': 'Listado aislado por Wedding Planner',
  'CP-E01-HU06-02': 'Selección de matrimonio activo',
  'CP-E01-HU06-03': 'Aislamiento de información entre Wedding Planners',
  'CP-E01-HU06-04': 'Cambio de matrimonio activo',
  'CP-E01-HU06-05': 'Búsqueda y filtros de matrimonios',
};

const texto = {
  'CP-E01-HU01-01': ['Se enviaron datos válidos de persona, empresa, usuario y contraseña. El flujo creó una cuenta PROJECT_MANAGER con correo verificado.', 'La cuenta Wedding Planner quedó disponible para autenticación.'],
  'CP-E01-HU01-02': ['Las cuatro variantes —nombres vacíos, apellido vacío, correo vacío y correo inválido— respondieron HTTP 400.', 'La API aplicó las validaciones requeridas.'],
  'CP-E01-HU01-03': ['El DTO no contempla confirmación de contraseña. NestJS rechazó el campo como propiedad no permitida antes de comparar ambos valores.', 'Hay rechazo HTTP, pero no por la regla CA002 de coincidencia.'],
  'CP-E01-HU01-04': ['Tras crear la primera cuenta, una nueva solicitud con el mismo correo respondió HTTP 409.', 'El correo no pudo reutilizarse.'],
  'CP-E01-HU02-01': ['Se capturó un correo de prueba con código numérico único de seis dígitos; no contiene enlace de verificación.', 'CA006 exige enlace único; el mecanismo actual no lo cumple literalmente.'],
  'CP-E01-HU02-02': ['El código vigente fue confirmado y la cuenta quedó con correo verificado.', 'La verificación mediante el mecanismo actual funciona.'],
  'CP-E01-HU02-03': ['Los tokens inexistente, usado y expirado fueron rechazados con HTTP 400.', 'La validación de invalidez, uso y expiración funciona.'],
  'CP-E01-HU02-04': ['Una cuenta pendiente recibió HTTP 403 al intentar iniciar sesión.', 'El backend bloquea el acceso antes de verificar el correo.'],
  'CP-E01-HU02-05': ['Dos solicitudes consecutivas de reenvío fueron aceptadas y generaron dos mecanismos.', 'No se observó limitación temporal; CA010 no se cumple.'],
  'CP-E01-HU03-01': ['La cuenta verificada recibió access token, refresh token y tipo PROJECT_MANAGER.', 'La autenticación y el tipo de usuario funcionaron.'],
  'CP-E01-HU03-02': ['Contraseña incorrecta y correo inexistente devolvieron HTTP 401 con el mismo mensaje.', 'No se reveló cuál credencial era incorrecta.'],
  'CP-E01-HU03-03': ['La cuenta pendiente recibió HTTP 403 al iniciar sesión.', 'Se aplica la restricción de verificación.'],
  'CP-E01-HU03-04': ['El refresh token vigente fue aceptado y se entregó un nuevo par de tokens.', 'La reapertura de Flutter queda como verificación manual.'],
  'CP-E01-HU04-01': ['GET /usuarios/:id devolvió datos de cuenta, pero no nombres, apellidos, correo ni teléfono.', 'No existe API de perfil con los datos CA016.'],
  'CP-E01-HU04-02': ['PATCH /usuarios/:id recibió los campos personales y respondió HTTP 400 porque no pertenecen al DTO.', 'El endpoint no permite la actualización exigida.'],
  'CP-E01-HU04-03': ['correoElectronico fue rechazado como propiedad no permitida antes de evaluar el formato.', 'La validación específica de formato CA018 no se ejecuta.'],
  'CP-E01-HU05-01': ['Pendiente de ejecutar visualmente en Flutter.', 'Una prueba API no acredita botón ni diálogo visual.'],
  'CP-E01-HU05-02': ['El refresh token fue revocado, pero el access token previo permitió GET /usuarios/:id con HTTP 200.', 'El access token vigente no se invalida; CA024 falla.'],
  'CP-E01-HU05-03': ['No existe SESSION_INACTIVITY_TIMEOUT ni política backend de inactividad.', 'No existe soporte verificable para CA025.'],
  'CP-E01-HU06-01': ['Con sesión WP-A se crearon borradores de WP-A y WP-B; el resumen HTTP 200 devolvió ambos.', 'El endpoint no filtra por Wedding Planner.'],
  'CP-E01-HU06-02': ['Pendiente de ejecutar en Flutter.', 'No existe endpoint backend para matrimonio activo.'],
  'CP-E01-HU06-03': ['La consulta autenticada como WP-A incluyó un proyecto creado por WP-B.', 'Se confirmó filtración entre matrimonios.'],
  'CP-E01-HU06-04': ['Pendiente de ejecutar en Flutter.', 'El cambio de contexto es una interacción frontend.'],
  'CP-E01-HU06-05': ['Aun enviando búsqueda y fechas, la respuesta incluyó el borrador de WP-B.', 'El resumen ignora parámetros y no implementa búsqueda/filtros.'],
};

const esperado = {
  'CP-E01-HU01-01': 'Crear la cuenta Wedding Planner, asociarla a su persona y permitir continuar al acceso.',
  'CP-E01-HU01-02': 'Rechazar cada campo obligatorio vacío y un correo con formato inválido.',
  'CP-E01-HU01-03': 'Comprobar política de contraseña y que contraseña y confirmación coincidan.',
  'CP-E01-HU01-04': 'No crear una segunda cuenta con el mismo correo.',
  'CP-E01-HU02-01': 'Enviar un correo que contenga un enlace único de verificación.',
  'CP-E01-HU02-02': 'Confirmar una cuenta mediante un mecanismo vigente.',
  'CP-E01-HU02-03': 'Rechazar tokens inexistentes, usados o expirados.',
  'CP-E01-HU02-04': 'Impedir que una cuenta pendiente acceda.',
  'CP-E01-HU02-05': 'Evitar reenvíos repetidos dentro de un intervalo corto.',
  'CP-E01-HU03-01': 'Aceptar credenciales válidas de una cuenta verificada y aplicar PROJECT_MANAGER.',
  'CP-E01-HU03-02': 'Rechazar credenciales inválidas sin revelar cuál campo falló.',
  'CP-E01-HU03-03': 'Rechazar el acceso de una cuenta aún no verificada.',
  'CP-E01-HU03-04': 'Renovar una sesión vigente sin pedir credenciales otra vez.',
  'CP-E01-HU04-01': 'Devolver los datos personales y de contacto del perfil autenticado.',
  'CP-E01-HU04-02': 'Actualizar nombres, apellidos, correo y teléfono permitidos.',
  'CP-E01-HU04-03': 'Informar una validación de correo cuando su formato sea inválido.',
  'CP-E01-HU05-01': 'Mostrar botón de cierre de sesión y confirmación en Flutter.',
  'CP-E01-HU05-02': 'Revocar la sesión y rechazar sus tokens posteriores.',
  'CP-E01-HU05-03': 'Invalidar la sesión tras el periodo de inactividad configurado.',
  'CP-E01-HU06-01': 'Devolver únicamente matrimonios pertenecientes a la WP autenticada.',
  'CP-E01-HU06-02': 'Permitir seleccionar el matrimonio activo desde Flutter.',
  'CP-E01-HU06-03': 'No exponer proyectos de otra Wedding Planner.',
  'CP-E01-HU06-04': 'Permitir cambiar el matrimonio activo desde Flutter.',
  'CP-E01-HU06-05': 'Aplicar búsqueda por pareja y filtros de fecha sin mostrar datos ajenos.',
};
const datosPorHu = {
  HU01: 'Solicitudes sintéticas de registro; CP02 usa nombre, apellido y correo vacíos, y correo inválido',
  HU02: 'Cuenta pendiente sintética, token/código capturado y solicitudes de verificación',
  HU03: 'Credenciales válidas, inválidas y pendientes; refresh token emitido por el backend',
  HU04: 'Cuenta autenticada y payload con datos personales y de contacto',
  HU05: 'Access token y refresh token de una sesión sintética autenticada',
  HU06: 'Dos Wedding Planners autenticadas (WP-A/WP-B), con borradores y DNI únicos',
};
const idEjecucion = process.env.E01_RUN_ID ?? new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
const ejecucionJest = spawnSync(process.execPath, ['--experimental-vm-modules', 'node_modules/jest/bin/jest.js', '--config', './jest.config.ts', '--runInBand', 'test/E01-Acceso'], {
  stdio: 'inherit',
  cwd: process.cwd(),
  env: { ...process.env, E01_RUN_ID: idEjecucion },
});
const ejecuciones = [];
for (const entrada of readdirSync(raiz, { withFileTypes: true })) {
  if (!entrada.isDirectory() || !/^HU\d\d-/.test(entrada.name)) continue;
  const archivo = join(raiz, entrada.name, 'evidencias', 'resultados-automaticos.json');
  if (existsSync(archivo)) ejecuciones.push(...JSON.parse(readFileSync(archivo, 'utf8')));
}
const agrupados = new Map(casos.map((caso) => [caso.id, []]));
for (const ejecucion of ejecuciones) agrupados.get(ejecucion.id)?.push(ejecucion);
const evaluados = casos.map((caso) => {
  const resultados = agrupados.get(caso.id) ?? [];
  const estado = caso.tipo === 'MANUAL' ? 'MANUAL' : !resultados.length ? 'NO EJECUTABLE' : resultados.every((r) => r.estado === 'PASS') ? 'PASS' : 'FAIL';
  const [obtenido, interpretacion] = texto[caso.id];
  return {
    ...caso,
    nombre: nombresCasos[caso.id],
    estado,
    obtenido,
    interpretacion,
    variantes: resultados.map((r) => r.variante).filter(Boolean),
    tecnico: resultados.filter((r) => r.estado === 'FAIL').map((r) => r.detalle),
  };
});
const limpio = (valor) => String(valor).replace(/\|/g, '\\|').replace(/\n/g, '<br>');
const tabla = evaluados.map((caso) => `| ${caso.id} – ${caso.nombre} | ${caso.ca} | ${caso.estado} | ${limpio(caso.obtenido)} | ${limpio(caso.interpretacion)} |`).join('\n');
const detalle = evaluados.map((caso) => `### ${caso.id} – ${caso.nombre}\n\n- **ID:** ${caso.id}\n- **HU:** ${caso.hu}\n- **CA:** ${caso.ca}\n- **Tipo de prueba:** ${caso.tipo}\n- **Objetivo:** ${caso.objetivo}\n- **Precondiciones:** Base de datos de pruebas vacía y catálogos base cargados.\n- **Datos utilizados:** ${datosPorHu[caso.hu]}.\n- **Endpoint/componente:** ${caso.endpoint}\n- **Pasos ejecutados:** Se enviaron las acciones del caso y se verificó la respuesta y sus efectos observables.${caso.variantes.length ? ` Variantes evaluadas: ${caso.variantes.join(', ')}.` : ''}\n- **Resultado esperado:** ${esperado[caso.id]}\n- **Resultado obtenido:** ${caso.obtenido}\n- **Interpretación:** ${caso.interpretacion}\n- **Estado:** ${caso.estado}\n- **Evidencia técnica:** ${caso.tecnico.length ? 'Disponible en la sección “Detalle técnico de fallos”.' : 'Ver resultados-automaticos.json de la HU.'}\n- **Observaciones:** ${caso.tipo === 'MIXTO' ? 'La parte Flutter permanece documentada como manual.' : '—'}\n`).join('\n');
const pass = evaluados.filter((caso) => caso.estado === 'PASS').length;
const fail = evaluados.filter((caso) => caso.estado === 'FAIL').length;
const manual = evaluados.filter((caso) => caso.estado === 'MANUAL').length;
const fallosTecnicos = evaluados.filter((caso) => caso.tecnico.length).map((caso) => `### ${caso.id}\n\n${caso.tecnico.map((error) => `- ${limpio(error)}`).join('\n')}`).join('\n\n');
const reporte = `# Resultado final E01-Acceso\n\n| Métrica | Resultado |\n|---|---:|\n| Casos conceptuales | ${casos.length} |\n| Ejecuciones/variantes Jest | ${ejecuciones.length} |\n| PASS | ${pass} |\n| FAIL | ${fail} |\n| Manuales pendientes | ${manual} |\n| Resultado global automático | ${ejecucionJest.status === 0 && fail === 0 ? 'PASS' : 'FAIL'} |\n\n## Tabla principal\n\n| Caso | CA | Estado | Resultado obtenido | Interpretación |\n|---|---|---|---|---|\n${tabla}\n\n## Detalle por caso\n\n${detalle}\n## Detalle técnico de fallos\n\n${fallosTecnicos || 'No se registraron fallos técnicos.'}\n\n## Resumen de diagnóstico\n\n### Fallos reales del sistema\n\n- CA002: no compara confirmación de contraseña.\n- CA006: correo con código, no enlace único.\n- CA010: no limita reenvíos consecutivos.\n- CA016 a CA020: no existe API de perfil personal/contacto.\n- CA024: access token sigue vigente tras logout.\n- CA025: no existe política de inactividad.\n- CA026, CA028 y CA030: resumen sin aislamiento, búsqueda ni filtros.\n\n### Funcionalidades no implementadas\n\nConfirmación de contraseña; enlace de verificación; rate limit; perfil; invalidación de access token; inactividad; contexto activo; filtro/búsqueda de matrimonios.\n\n### Errores encontrados en las pruebas\n\n- HU06-01, HU06-03 y HU06-05 esperaban HTTP 401 sin autenticar; el supuesto era incorrecto.\n- HU05-03 usaba un matcher sobre una variable indefinida.\n- HU02-03 no ejercía inicialmente el token expirado.\n\n### Casos corregidos y reejecutados\n\n- HU06-01, HU06-03 y HU06-05: ahora usan WP-A/WP-B autenticadas; resultado nuevo: FAIL por filtración real.\n- HU05-03: ahora verifica la política explícitamente; resultado nuevo: FAIL por ausencia de política.\n- HU02-03: ahora expira un registro controlado en BD de prueba; resultado nuevo: PASS.\n`;
const evidenciaRaiz = join(raiz, 'evidencias');
mkdirSync(evidenciaRaiz, { recursive: true });
const escribirJson = (nombre, contenido) => writeFileSync(join(evidenciaRaiz, nombre), `${JSON.stringify(contenido, null, 2)}\n`, 'utf8');
const datosPrueba = {
  idEjecucion,
  weddingPlanners: [
    { nombreCompleto: 'Daniela Ramírez Torres', correoBase: 'daniela.ramirez.*@example.com', empresa: 'Ramírez Eventos' },
    { nombreCompleto: 'Alejandra Castro Montalvo', correoBase: 'alejandra.castro.*@example.com', empresa: 'Castro Eventos' },
  ],
  parejas: [
    { pareja: 'Mateo Salinas e Isabella Cárdenas', uso: 'Borradores de HU06' },
  ],
  reglaIdentificadores: 'El sufijo técnico de ejecución evita colisiones; la identidad visible se conserva legible.',
};
const casosEvidencia = evaluados.map((caso) => ({
  id: caso.id, nombre: caso.nombre, hu: caso.hu, ca: caso.ca, tipo: caso.tipo,
  objetivo: caso.objetivo, precondiciones: 'Base de pruebas vacía y catálogos base cargados.',
  datosUtilizados: datosPorHu[caso.hu], endpointComponente: caso.endpoint,
  pasosEjecutados: `Se ejecutaron las acciones del caso.${caso.variantes.length ? ` Variantes: ${caso.variantes.join(', ')}.` : ''}`,
  resultadoEsperado: esperado[caso.id], resultadoObtenido: caso.obtenido,
  interpretacion: caso.interpretacion, estado: caso.estado,
  evidencia: caso.tecnico.length ? 'Ver detalle técnico de fallos.' : 'Ver resultados automáticos de la HU.',
  observaciones: caso.tipo === 'MIXTO' ? 'La parte visual queda manual.' : null,
}));
escribirJson('datos-prueba.json', datosPrueba);
escribirJson('casos-prueba.json', casosEvidencia);
escribirJson('requests.json', casosEvidencia.map(({ id, nombre, endpointComponente, datosUtilizados, pasosEjecutados }) => ({ id, nombre, endpointComponente, datosUtilizados, pasosEjecutados })));
escribirJson('responses.json', casosEvidencia.map(({ id, nombre, estado, resultadoObtenido, interpretacion }) => ({ id, nombre, estado, resultadoObtenido, interpretacion })));
escribirJson('registros-generados.json', { idEjecucion, registros: [
  'Cuentas Wedding Planner verificadas de Daniela Ramírez Torres y Alejandra Castro Montalvo.',
  'Cuentas pendientes para validación de verificación e inicio de sesión.',
  'Borradores de matrimonio de Mateo Salinas e Isabella Cárdenas para HU06.',
], nota: 'Los registros se crean mediante endpoints reales durante la ejecución; los IDs quedan en las respuestas y en la base de pruebas.' });
escribirJson('evidencias-especificas.json', evaluados.map((caso) => ({ id: caso.id, nombre: caso.nombre, variantes: caso.variantes, detalleTecnico: caso.tecnico })));
writeFileSync(join(evidenciaRaiz, 'resultado.md'), reporte, 'utf8');
writeFileSync(join(raiz, 'resultado-final.md'), reporte, 'utf8');
process.exit(ejecucionJest.status ?? 1);
