# 04_DATABASE.md

# Database Architecture

Proyecto: PG Lista 3 AI

Versión: 1.0

---

# Objetivo

Este documento define la estructura lógica de la base de datos.

No representa una implementación específica en SQL.

Representa el modelo de negocio que deberá respetar cualquier implementación futura.

La base de datos deberá diseñarse pensando en escalabilidad, integraciones y crecimiento durante varios años.

---

# Principios

* Nunca duplicar información.
* Mantener relaciones claras.
* Permitir sincronización con otros sistemas.
* Facilitar futuras integraciones.
* Mantener historial completo.
* Nunca perder información comercial.

---

# Entidades principales

El sistema estará compuesto por las siguientes entidades principales:

* Usuarios
* Sucursales
* Empresas
* Contactos
* Prospectos
* Clientes
* Seguimientos
* Cotizaciones
* Ventas
* Productos
* Categorías
* Tareas
* Notificaciones
* Archivos
* Actividad
* Configuración

---

# Usuarios

Representa a cada persona que utiliza la aplicación.

Campos principales:

* id
* nombre
* correo
* contraseña (gestionada por Supabase Auth)
* teléfono
* rol
* sucursal_id
* activo
* fecha_creación
* fecha_actualización

Relaciones:

Un usuario pertenece a una sucursal.

Un usuario puede administrar muchos clientes.

---

# Sucursales

Representa las tiendas de Plomería García.

Campos:

* id
* nombre
* ciudad
* dirección
* teléfono
* activa

Relaciones:

Una sucursal tiene muchos usuarios.

Una sucursal tiene muchos clientes.

---

# Empresas

Representa la empresa donde trabaja el cliente.

Ejemplo:

Constructora ABC

Campos:

* id
* razón_social
* nombre_comercial
* RFC
* giro
* sitio_web
* dirección
* ciudad
* estado
* país
* observaciones

Relaciones:

Una empresa puede tener muchos contactos.

---

# Contactos

Representa a las personas dentro de una empresa.

Ejemplos:

Comprador.

Arquitecto.

Gerente.

Residente de obra.

Campos:

* id
* empresa_id
* nombre
* puesto
* teléfono
* celular
* WhatsApp
* correo
* cumpleaños
* observaciones

Una empresa puede tener varios contactos.

---

# Prospectos

Representa oportunidades de venta.

Campos:

* id
* empresa_id
* contacto_id
* origen
* estado
* prioridad
* potencial
* vendedor_id
* observaciones
* fecha_registro

Estados:

Nuevo

Contactado

Interesado

Seguimiento

Cotizando

Ganado

Perdido

Archivado

---

# Clientes

Representa clientes activos.

Campos:

* id
* empresa_id
* contacto_principal
* vendedor_id
* sucursal_id
* clasificación
* estado
* ticket_promedio
* frecuencia_compra
* última_compra
* valor_estimado
* observaciones

---

# Seguimientos

Historial de todas las interacciones.

Campos:

* id
* cliente_id
* prospecto_id
* usuario_id
* fecha
* tipo
* resultado
* siguiente_accion
* próxima_fecha
* notas

Tipos:

Llamada

WhatsApp

Correo

Visita

Reunión

Cotización

Otro

---

# Cotizaciones

Campos:

* id
* cliente_id
* fecha
* monto
* estado
* responsable
* observaciones

Estados:

Pendiente

Enviada

Aceptada

Rechazada

Cancelada

---

# Ventas

Campos:

* id
* cliente_id
* fecha
* importe
* sucursal
* vendedor
* origen

En futuras versiones podrán sincronizarse automáticamente desde Intelisis.

---

# Productos

Catálogo de productos.

Campos:

* id
* código
* descripción
* categoría
* línea
* marca
* unidad
* activo

Inicialmente podrán capturarse manualmente.

Posteriormente se sincronizarán con Intelisis.

---

# Categorías

Ejemplos:

Pisos

Porcelanatos

Sanitarios

Grifería

Muebles para baño

Accesorios

Adhesivos

Boquillas

Decorados

Canceles

Tarjas

Boilers

Minisplits

Tinacos

Campos:

* id
* nombre
* descripción

---

# Tareas

Campos:

* id
* usuario
* cliente
* fecha
* prioridad
* estado
* descripción

---

# Notificaciones

Campos:

* id
* usuario
* tipo
* mensaje
* leído
* fecha

---

# Archivos

Permitirá almacenar:

* PDFs
* Cotizaciones
* Fotografías
* Documentos
* Contratos

Campos:

* id
* nombre
* tipo
* ruta
* cliente
* fecha

---

# Actividad

Registro completo de auditoría.

Ejemplos:

Cliente creado.

Seguimiento realizado.

Cotización enviada.

Venta registrada.

Cambio de estado.

Nunca deberá eliminarse.

---

# Configuración

Preferencias del sistema.

Configuración de IA.

Recordatorios.

Integraciones.

Sucursales.

Usuarios.

Roles.

---

# Relaciones principales

Sucursal

↓

Usuarios

↓

Clientes

↓

Seguimientos

↓

Cotizaciones

↓

Ventas

---

Empresa

↓

Contactos

↓

Prospecto

↓

Cliente

↓

Ventas

---

# Integraciones futuras

La arquitectura deberá permitir integrar:

* Intelisis ERP
* Excel
* WhatsApp Business
* Correo electrónico
* Google Calendar
* API de Plomería García
* Sistemas internos

Sin modificar el modelo principal.

---

# Regla de diseño

La aplicación nunca deberá depender exclusivamente de una fuente de datos.

Toda entidad deberá poder capturarse manualmente o sincronizarse desde un sistema externo.

---

# Escalabilidad

La estructura deberá soportar:

* Múltiples sucursales.
* Múltiples vendedores.
* Miles de clientes.
* Millones de seguimientos.
* Integraciones futuras.
* Inteligencia Artificial.
* Reportes históricos.

---

# Objetivo final

La base de datos deberá convertirse en la fuente única de verdad para toda la operación comercial de PG Lista 3 AI.

Toda la Inteligencia Artificial, reportes, dashboards e integraciones deberán construirse sobre esta estructura.

