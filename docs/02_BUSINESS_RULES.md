# 02_BUSINESS_RULES.md

# Reglas de Negocio

Proyecto: PG Lista 3 AI

Versión: 1.0

---

# Propósito

Este documento define las reglas del negocio que deben respetarse durante el desarrollo del sistema.

Todas las decisiones de la aplicación y de la Inteligencia Artificial deberán seguir estas reglas.

Si una regla cambia en el futuro, este documento será la fuente oficial.

---

# Regla principal

El objetivo del sistema es ayudar a incrementar las ventas de clientes Lista 3 mediante un mejor seguimiento comercial.

Todas las funcionalidades deberán contribuir a este objetivo.

---

# Definiciones

## Prospecto

Es una empresa o persona que aún no ha realizado compras con Plomería García.

Puede existir únicamente como una oportunidad de venta.

Ejemplos:

* Constructora.
* Contratista.
* Arquitecto.
* Ingeniero.
* Empresa.
* Instalador.
* Mantenimiento industrial.
* Negocio.

Un prospecto puede convertirse en cliente.

---

## Cliente

Es una persona o empresa que ya realizó al menos una compra.

Todo cliente conservará su historial completo.

Nunca deberá perderse información.

---

## Cliente Lista 3

Cliente con enfoque de mayoreo.

Generalmente compra de manera frecuente o realiza compras de volumen.

No todos los clientes pertenecen a Lista 3.

La clasificación será definida por la empresa.

---

# Estados de un prospecto

Un prospecto puede tener únicamente uno de estos estados:

* Nuevo
* Contactado
* Interesado
* Cotización enviada
* Seguimiento
* Ganado
* Perdido
* Archivado

No se permiten otros estados sin autorización.

---

# Estados de un cliente

* Activo
* Inactivo
* Suspendido
* Potencial
* Estratégico

---

# Seguimientos

Todo seguimiento deberá registrar:

* Fecha.
* Hora.
* Responsable.
* Medio de contacto.
* Resultado.
* Próxima acción.
* Fecha del siguiente seguimiento.

Nunca deberá existir un seguimiento sin responsable.

---

# Medios de contacto

Los seguimientos podrán realizarse mediante:

* Llamada telefónica.
* WhatsApp.
* Correo electrónico.
* Visita.
* Mensaje.
* Reunión.

---

# Cotizaciones

Cada cotización deberá contener como mínimo:

* Cliente.
* Fecha.
* Monto.
* Estado.
* Observaciones.
* Responsable.

Estados permitidos:

* Pendiente.
* Enviada.
* Aceptada.
* Rechazada.
* Cancelada.

---

# Compras

Cada compra deberá quedar asociada a un cliente.

Información mínima:

* Fecha.
* Importe.
* Productos.
* Sucursal.
* Vendedor.

---

# Prioridad de clientes

La IA calculará una prioridad considerando distintos factores.

Ejemplos:

* Tiempo sin comprar.
* Número de compras.
* Monto histórico.
* Cotizaciones pendientes.
* Actividad reciente.
* Seguimientos vencidos.

El algoritmo podrá evolucionar con el tiempo.

---

# Clientes inactivos

Un cliente podrá marcarse como inactivo cuando deje de realizar compras durante un periodo definido por la empresa.

La IA deberá generar alertas para intentar recuperarlo.

---

# Recuperación de clientes

Cuando un cliente vuelva a comprar después de un periodo de inactividad, el sistema deberá registrar el evento y actualizar automáticamente su estado.

---

# Agenda

Toda tarea deberá tener:

* Responsable.
* Fecha.
* Hora.
* Prioridad.
* Estado.

Estados permitidos:

* Pendiente.
* En proceso.
* Finalizada.
* Cancelada.

---

# Inteligencia Artificial

La IA deberá actuar siempre como un asistente comercial.

Nunca modificará información automáticamente.

Solo podrá:

* Recomendar.
* Analizar.
* Priorizar.
* Resumir.
* Alertar.
* Sugerir acciones.

Las acciones que modifiquen datos deberán ser confirmadas por el usuario.

---

# Reglas para recomendaciones

La IA nunca deberá recomendar acciones sin contexto.

Toda sugerencia deberá estar basada en datos reales del sistema.

Ejemplo correcto:

"Este cliente tiene 62 días sin comprar y anteriormente realizaba compras mensuales. Se recomienda realizar una llamada de seguimiento."

Ejemplo incorrecto:

"Sería buena idea llamarle."

---

# Eliminación de información

Los clientes nunca deberán eliminarse físicamente de la base de datos.

Solo podrán marcarse como inactivos o archivados.

Esto permitirá conservar el historial comercial.

---

# Historial

Todo cambio importante deberá quedar registrado.

Ejemplos:

* Cambio de estado.
* Nueva compra.
* Nueva cotización.
* Seguimiento realizado.
* Cambio de vendedor.
* Cambio de datos.

---

# Seguridad

Cada usuario verá únicamente la información que le corresponda según su nivel de permisos.

Los administradores tendrán acceso completo.

---

# Indicadores

El sistema deberá calcular automáticamente indicadores como:

* Ventas del mes.
* Cumplimiento de presupuesto.
* Nuevos clientes.
* Clientes recuperados.
* Prospectos convertidos.
* Seguimientos realizados.
* Seguimientos pendientes.
* Ticket promedio.
* Frecuencia de compra.

---

# Reglas para futuras integraciones

Cuando el sistema se conecte con Intelisis u otros sistemas:

* Nunca deberá sobrescribir información sin validación.
* Toda sincronización deberá registrarse.
* Los errores deberán quedar documentados.
* La información crítica deberá poder recuperarse.

---

# Regla de oro para el desarrollo

Si una nueva funcionalidad no ayuda a captar clientes, mejorar el seguimiento, organizar el trabajo del vendedor o incrementar las ventas, deberá evaluarse cuidadosamente antes de implementarse.

---

# Regla de oro para la IA

Antes de emitir cualquier recomendación, la IA deberá responder internamente estas preguntas:

1. ¿Tengo datos suficientes?
2. ¿La recomendación está basada en información real?
3. ¿Esta acción puede ayudar a vender más?
4. ¿Existe una acción más prioritaria?
5. ¿Cómo puedo ayudar al vendedor a tomar una mejor decisión?

Solo después de responder estas preguntas deberá generar una sugerencia.

---

# Principio final

Las reglas de este documento tienen prioridad sobre cualquier decisión de implementación.

Si existe un conflicto entre el código y estas reglas, deberán prevalecer las reglas de negocio.

