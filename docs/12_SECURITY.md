# 12_SECURITY.md

# Security Architecture

Proyecto: PG Lista 3 AI

Versión: 1.0

---

# Objetivo

Definir las políticas de seguridad del proyecto.

Toda funcionalidad deberá respetar este documento.

La seguridad será responsabilidad de toda la aplicación y no únicamente del backend.

---

# Principios

La seguridad deberá ser:

* Preventiva
* Escalable
* Auditada
* Documentada
* Transparente
* Basada en el principio de menor privilegio

---

# Arquitectura

Frontend

↓

API

↓

Servicios

↓

Base de Datos

↓

Supabase

↓

Logs

↓

Auditoría

Cada capa deberá validar permisos.

Nunca confiar únicamente en el frontend.

---

# Autenticación

Proveedor:

Supabase Auth

Métodos permitidos:

* Correo y contraseña
* Magic Link (futuro)
* OAuth Google (futuro)
* Microsoft 365 (futuro)

Nunca almacenar contraseñas manualmente.

---

# Sesiones

Todas las sesiones deberán:

* Expirar automáticamente.
* Poder revocarse.
* Renovarse mediante refresh token.
* Invalidarse al cerrar sesión.

---

# Roles

Inicialmente existirán:

Administrador

Gerente

Coordinador

Vendedor

Consulta

Cada rol tendrá permisos específicos.

---

# Permisos

Los permisos deberán ser independientes de los roles.

Ejemplos:

Puede crear clientes.

Puede editar clientes.

Puede eliminar clientes.

Puede exportar.

Puede importar.

Puede administrar usuarios.

Puede modificar configuración.

Esto permitirá crear nuevos roles sin modificar el código.

---

# Principio de Menor Privilegio

Todo usuario tendrá únicamente los permisos necesarios para realizar su trabajo.

Nunca conceder permisos por comodidad.

---

# Row Level Security (RLS)

Toda la información almacenada en Supabase deberá utilizar RLS.

Ejemplos:

Un vendedor únicamente podrá consultar los clientes asignados a él.

Un coordinador podrá consultar la información de su sucursal.

Un administrador podrá consultar toda la información.

---

# Protección de Datos

Nunca almacenar:

Contraseñas.

Tokens.

Secrets.

API Keys.

Información sensible en texto plano.

Toda información confidencial deberá cifrarse cuando sea necesario.

---

# Variables de Entorno

Todas las claves deberán almacenarse en variables de entorno.

Nunca escribir claves dentro del código.

Ejemplo:

.env.local

Nunca subir este archivo a GitHub.

---

# API Keys

Todas las API Keys deberán:

Rotarse periódicamente.

Tener permisos mínimos.

Poder revocarse.

Nunca exponerse al cliente.

---

# Auditoría

Registrar:

Inicio de sesión.

Cierre de sesión.

Creación de clientes.

Edición.

Eliminación lógica.

Cambios de permisos.

Importaciones.

Exportaciones.

Configuraciones.

Toda auditoría deberá incluir:

Usuario.

Fecha.

Hora.

IP.

Acción.

Resultado.

---

# Eliminación

Nunca eliminar información comercial de forma física.

Utilizar Soft Delete.

Campos:

deleted_at

deleted_by

La información podrá restaurarse.

---

# Validaciones

Toda entrada deberá validar:

Tipo.

Longitud.

Formato.

Campos obligatorios.

Permisos.

Reglas de negocio.

Nunca confiar en los datos recibidos.

---

# Sanitización

Toda información recibida deberá limpiarse antes de almacenarse.

Evitar:

XSS.

HTML malicioso.

Scripts.

Inyecciones.

---

# SQL Injection

Nunca construir consultas mediante concatenación.

Utilizar consultas parametrizadas.

---

# Cross Site Scripting (XSS)

Escapar contenido cuando sea necesario.

No renderizar HTML proporcionado por usuarios sin sanitizar.

---

# Cross Site Request Forgery (CSRF)

Proteger formularios y acciones sensibles mediante los mecanismos recomendados por el framework y Supabase.

---

# Rate Limiting

Login:

5 intentos por minuto.

API:

120 solicitudes por minuto por usuario autenticado.

Invitados:

20 solicitudes por minuto.

---

# Bloqueo

Después de varios intentos fallidos:

Bloquear temporalmente la autenticación.

Registrar evento de seguridad.

---

# Logs

Registrar:

Errores.

Advertencias.

Excepciones.

Consultas lentas.

Intentos fallidos.

Eventos críticos.

---

# Monitoreo

Integrar en el futuro:

Sentry.

Logs centralizados.

Alertas automáticas.

---

# Backups

Realizar respaldos automáticos.

Mantener varias versiones.

Probar periódicamente la restauración.

---

# Recuperación

Definir procedimientos para:

Pérdida de datos.

Error humano.

Fallas del servidor.

Corrupción de información.

---

# Privacidad

Cumplir con la legislación aplicable.

Los usuarios únicamente visualizarán la información necesaria para desempeñar su trabajo.

---

# Exportaciones

Solo usuarios autorizados podrán exportar:

Clientes.

Ventas.

Reportes.

Prospectos.

Toda exportación deberá registrarse en auditoría.

---

# Importaciones

Toda importación deberá:

Validarse.

Detectar duplicados.

Generar reporte de errores.

Permitir reversión cuando sea posible.

---

# Archivos

Tipos permitidos:

PDF

JPG

PNG

XLSX

CSV

DOCX

Validar:

Tamaño.

Tipo MIME.

Extensión.

Nunca ejecutar archivos cargados por usuarios.

---

# Integraciones

Toda integración externa deberá:

Utilizar HTTPS.

Autenticarse.

Validar certificados.

Registrar errores.

Implementar tiempos de espera y reintentos controlados.

---

# IA

La Inteligencia Artificial nunca deberá:

Modificar datos automáticamente.

Eliminar información.

Tomar decisiones críticas sin aprobación del usuario.

Enviar mensajes sin confirmación.

La IA únicamente podrá sugerir acciones.

---

# Seguridad Frontend

Nunca confiar en validaciones del navegador.

Ocultar elementos por permisos.

No almacenar información sensible en Local Storage.

Mantener el estado de autenticación de forma segura utilizando las capacidades de Supabase.

---

# Seguridad Backend

Toda lógica de negocio deberá ejecutarse en el servidor.

Nunca depender únicamente del cliente para validar permisos.

---

# Gestión de Errores

Los mensajes públicos nunca deberán revelar:

Consultas SQL.

Rutas internas.

Claves.

Stack Traces.

Información sensible.

Los detalles completos deberán registrarse únicamente en los logs.

---

# Dependencias

Actualizar periódicamente:

Next.js

React

Supabase

Node.js

Tailwind

Librerías de terceros

Eliminar dependencias sin mantenimiento.

---

# Revisión de Seguridad

Antes de cada versión estable verificar:

* Dependencias actualizadas.
* Vulnerabilidades conocidas.
* Permisos correctos.
* RLS funcionando.
* Variables de entorno protegidas.
* Auditoría operativa.
* Backups activos.
* Logs funcionando.

---

# Respuesta a Incidentes

En caso de detectar un incidente:

1. Contener el problema.
2. Registrar el evento.
3. Identificar la causa.
4. Corregir la vulnerabilidad.
5. Restaurar el servicio.
6. Documentar el incidente.
7. Implementar acciones preventivas.

---

# Regla Suprema

La seguridad siempre tendrá prioridad sobre la comodidad.

Si una funcionalidad compromete la seguridad del sistema o la información de los clientes, deberá rediseñarse antes de implementarse.

---

# Visión Final

PG Lista 3 AI deberá ofrecer un entorno seguro para asesores comerciales, gerentes y administradores, protegiendo la información de clientes, ventas y operaciones mediante una arquitectura moderna, auditoría completa, control de permisos y buenas prácticas de desarrollo desde la primera versión.

