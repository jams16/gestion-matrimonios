# Resumen: autenticación y usuarios

Se agregaron au_usuario, au_sesion y au_token_cuenta, con claves numéricas
desde 1000, relaciones restrictivas a Persona Natural y Entidad, y migración
aditiva 20260914T1903_add_autenticacion. Prisma 8 declara los enums
au_tipo_usuario y au_tipo_token_cuenta.

Se implementaron registro, inicio/cierre de sesión, refresh con rotación,
verificación de correo, recuperación de contraseña y gestión paginada de
usuarios. Argon2id protege contraseñas y hashes de refresh; tokens de cuenta
se almacenan como SHA-256 y no se exponen. Usuarios está protegido por guard
JWT y la eliminación es lógica con revocación de sesiones.

Nodemailer es la dependencia nueva. SMTP envía un botón “Sí, soy yo” hacia
FRONTEND_URL; el frontend remite el token a la confirmación POST. Se añadieron
SMTP_FROM, SMTP_SECURE y FRONTEND_URL a .env.example.
