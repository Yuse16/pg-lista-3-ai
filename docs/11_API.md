# 11_API.md

# API Specification

Proyecto: PG Lista 3 AI

Versión: 1.0

---

# Objetivo

Este documento define el contrato oficial entre el Frontend, Backend, Inteligencia Artificial e Integraciones Externas.

Toda comunicación deberá respetar esta especificación.

---

# Principios

La API deberá ser:

* RESTful
* Escalable
* Segura
* Versionada
* Documentada
* Fácil de mantener

---

# URL Base

Desarrollo

/api/v1

Producción

https://api.pglista3.com/api/v1

---

# Formato

Todas las peticiones utilizarán JSON.

Request

Content-Type:

application/json

Response

application/json

UTF-8

---

# Versionado

Todas las rutas deberán comenzar con:

/api/v1/

Cuando existan cambios incompatibles se creará:

/api/v2/

Nunca romper compatibilidad.

---

# Autenticación

Todas las rutas privadas requerirán:

Authorization:

Bearer TOKEN

El token será administrado mediante Supabase Auth.

---

# Respuesta Exitosa

Formato estándar:

```json
{
  "success": true,
  "data": {},
  "message": "Operación realizada correctamente."
}
```

---

# Respuesta con Error

```json
{
  "success": false,
  "error": {
    "code": "CLIENT_NOT_FOUND",
    "message": "Cliente no encontrado."
  }
}
```

---

# Paginación

Todas las listas deberán soportar:

page

limit

sort

order

search

Ejemplo:

GET /clients?page=1&limit=20

---

# Filtros

Todas las colecciones deberán permitir filtros.

Ejemplo:

estado

prioridad

sucursal

vendedor

fecha

categoría

cliente

---

# Endpoints

---

# AUTH

POST

/auth/login

POST

/auth/logout

POST

/auth/refresh

GET

/auth/me

---

# USERS

GET

/users

GET

/users/{id}

POST

/users

PUT

/users/{id}

DELETE

/users/{id}

---

# CLIENTS

GET

/clients

GET

/clients/{id}

POST

/clients

PUT

/clients/{id}

DELETE

/clients/{id}

---

# PROSPECTS

GET

/prospects

POST

/prospects

PUT

/prospects/{id}

DELETE

/prospects/{id}

POST

/prospects/{id}/convert

---

# FOLLOW UPS

GET

/followups

POST

/followups

PUT

/followups/{id}

DELETE

/followups/{id}

---

# TASKS

GET

/tasks

POST

/tasks

PUT

/tasks/{id}

DELETE

/tasks/{id}

---

# QUOTATIONS

GET

/quotations

POST

/quotations

PUT

/quotations/{id}

DELETE

/quotations/{id}

---

# SALES

GET

/sales

POST

/sales

GET

/sales/{id}

---

# PRODUCTS

GET

/products

GET

/products/{id}

POST

/products

PUT

/products/{id}

DELETE

/products/{id}

---

# CATEGORIES

GET

/categories

POST

/categories

PUT

/categories/{id}

DELETE

/categories/{id}

---

# DASHBOARD

GET

/dashboard

Retorna:

* KPIs
* Clientes prioritarios
* Ventas
* Seguimientos
* Alertas
* Agenda

---

# REPORTS

GET

/reports/sales

GET

/reports/customers

GET

/reports/followups

GET

/reports/lista3

---

# AI

POST

/ai/chat

POST

/ai/recommendations

POST

/ai/analyze

GET

/ai/daily-summary

---

# NOTIFICATIONS

GET

/notifications

PUT

/notifications/read

DELETE

/notifications/{id}

---

# FILES

POST

/files/upload

GET

/files/{id}

DELETE

/files/{id}

---

# SEARCH

GET

/search

Deberá buscar simultáneamente:

Clientes

Prospectos

Productos

Cotizaciones

Ventas

---

# IMPORT

POST

/import/excel

POST

/import/intelisis

POST

/import/products

---

# EXPORT

GET

/export/customers

GET

/export/sales

GET

/export/followups

---

# HEALTH

GET

/health

Respuesta:

Estado de la API

Base de datos

Servicios

Tiempo de respuesta

---

# Rate Limit

Autenticado

120 solicitudes por minuto.

Invitado

20 solicitudes por minuto.

---

# Validaciones

Toda petición deberá validar:

Campos obligatorios

Tipos

Longitud

Formato

Permisos

---

# Códigos HTTP

200

OK

201

Created

204

No Content

400

Bad Request

401

Unauthorized

403

Forbidden

404

Not Found

409

Conflict

422

Validation Error

429

Too Many Requests

500

Internal Server Error

---

# Logs

Registrar:

Usuario

IP

Endpoint

Método

Duración

Resultado

Fecha

---

# Auditoría

Registrar cambios en:

Clientes

Prospectos

Cotizaciones

Ventas

Usuarios

Configuraciones

Nunca eliminar auditorías.

---

# Integraciones Futuras

Intelisis

WhatsApp Business

Google Calendar

Microsoft Outlook

Correo

n8n

Make

Power Automate

API Plomería García

---

# Seguridad

Nunca exponer:

Contraseñas

Tokens

Secrets

Claves API

Variables privadas

---

# Principio REST

GET

Consultar

POST

Crear

PUT

Actualizar completamente

PATCH

Actualizar parcialmente

DELETE

Eliminar lógicamente cuando aplique

---

# Convenciones

URLs:

Plural

Minúsculas

Sin espacios

Sin verbos

Ejemplo correcto:

/clients

Ejemplo incorrecto:

/getClient

---

# Regla Suprema

Toda nueva funcionalidad deberá exponer una API consistente con este documento.

La API es el contrato oficial del sistema.

Nunca deberá modificarse sin mantener compatibilidad o crear una nueva versión.

---

# Visión Final

La API deberá permitir que cualquier cliente (Web, App móvil, IA, integraciones o sistemas externos) consuma los datos de forma consistente, segura y escalable.

Toda la lógica de negocio deberá residir en servicios bien definidos, manteniendo una separación clara entre la interfaz de usuario, la lógica de aplicación y las integraciones externas.

