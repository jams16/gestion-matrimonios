# Cambio de computadora

Guía para mover WeddingApp a otra PC sin perder configuración, datos ni correo.

## Antes de cambiar

- Lleva el repositorio completo, incluidos backend/migrations, backend/prisma, los archivos lock y documents.
- Si deseas conservar datos, exporta PostgreSQL y conserva también backend/uploads si contiene archivos cargados.
- Guarda de forma privada los valores actuales de backend/.env. No subas ese archivo, backups SQL, contraseñas SMTP ni secretos JWT a Git.
- Las credenciales SMTP y de base de datos que hayan quedado expuestas deben rotarse antes de usar la nueva PC.
- No es necesario copiar node_modules, dist, build o .dart_tool: se regeneran.

## Programas requeridos

1. Git.
2. Node.js 22 LTS y pnpm.
3. PostgreSQL y opcionalmente pgAdmin.
4. Flutter SDK estable y Chrome.

Comprobación:

    node --version
    pnpm --version
    psql --version
    flutter doctor

Ejecuta flutter doctor y resuelve los errores que reporte.

## Respaldar y restaurar PostgreSQL

En la PC anterior:

    pg_dump -U postgres -F c -f gestion_matrimonios.backup gestion_matrimonios

En la nueva PC instala PostgreSQL, define la nueva contraseña de postgres, crea la base y restaura:

    createdb -U postgres gestion_matrimonios
    pg_restore -U postgres -d gestion_matrimonios --clean --if-exists gestion_matrimonios.backup

El argumento --clean reemplaza objetos de la base destino. Úsalo solo contra la base local gestion_matrimonios que acabas de crear.

Si no conservarás datos, crea una base vacía con ese mismo nombre. Prisma aplicará el esquema.

## Configurar backend

1. Copia backend/.env.example como backend/.env.
2. Configura los valores de la nueva PC:

    PORT=3000
    NODE_ENV=development
    DATABASE_URL="postgresql://postgres:NUEVA_CONTRASENA@localhost:5432/gestion_matrimonios"
    JWT_ACCESS_SECRET="secreto-largo-aleatorio"
    JWT_REFRESH_SECRET="otro-secreto-largo-aleatorio"
    JWT_ACCESS_EXPIRATION="15m"
    JWT_REFRESH_EXPIRATION="7d"

3. Configura SMTP. Para Gmail debe ser contraseña de aplicación, no contraseña normal:

    SMTP_HOST=smtp.gmail.com
    SMTP_PORT=587
    SMTP_SECURE=false
    SMTP_USER=tu_correo@gmail.com
    SMTP_PASSWORD=CONTRASENA_DE_APLICACION
    SMTP_FROM="Gestion de Matrimonios <tu_correo@gmail.com>"

4. Para Flutter Web local:

    FRONTEND_URL=http://localhost:5173
    CORS_ALLOWED_ORIGINS=http://localhost:5173

Flutter Web puede escoger un puerto diferente en cada ejecución. En desarrollo el backend admite automáticamente localhost y 127.0.0.1 con puerto dinámico; no modifiques CORS cada vez.

Instala y verifica:

    cd backend
    corepack enable
    corepack prepare pnpm@latest --activate
    pnpm install --frozen-lockfile
    pnpm exec prisma migration status
    pnpm exec prisma migration apply
    //o mejor pnpm.cmd exec prisma db migrate
    pnpm build
    pnpm test -- --runInBand
    pnpm start:dev

La migración aplica solo cambios pendientes y no borra datos. El resultado esperado de migration status es Up to date. Al arrancar Nest debe aparecer SMTP conectado correctamente.

## Configurar frontend

    cd frontend
    flutter pub get
    flutter analyze
    flutter test
    flutter run -d chrome

La API por defecto es http://localhost:3000/api/v1. Si cambias el puerto del backend:

    flutter run -d chrome --dart-define=API_BASE_URL=http://localhost:PUERTO/api/v1

Las rutas web son limpias, por ejemplo /registrarse, sin /#/.

## Prueba mínima

1. Abre Flutter Web.
2. Registra una cuenta con un correo accesible.
3. Confirma que llega un código de seis dígitos.
4. Completa usuario y nombre comercial.
5. Inicia sesión con usuario o correo y contraseña.
6. Abre Swagger: http://localhost:3000/api/docs.

## Diagnóstico rápido

- CORS: reinicia backend; confirma NODE_ENV=development y que Flutter apunte al puerto correcto.
- Error SMTP: confirma SMTP_SECURE=false para puerto 587 y usa contraseña de aplicación.
- Error de conexión a PostgreSQL: revisa usuario, contraseña, puerto, servicio PostgreSQL y DATABASE_URL.
- Migraciones: ejecuta pnpm exec prisma migration status antes de intentar crear migraciones nuevas.
- Producción: define NODE_ENV=production, HTTPS, FRONTEND_URL y CORS_ALLOWED_ORIGINS con el dominio real, sin comodines.

## Nunca publicar

- backend/.env
- Backups .backup o .sql con datos reales
- Contraseñas de aplicación SMTP
- Secretos JWT
- Claves, certificados o tokens

backend/.env.example es solo una plantilla; debe contener marcadores, nunca credenciales reales.
