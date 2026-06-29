# 06_DECISION_ENGINE.md

# Decision Engine

Proyecto: PG Lista 3 AI

Versión: 1.0

---

# Objetivo

Este documento define las reglas que utiliza el Agente Inteligente para analizar la información del negocio y generar recomendaciones.

El objetivo es convertir datos en acciones concretas que ayuden al asesor comercial a vender más.

Toda recomendación deberá estar basada en información verificable.

---

# Principios

El motor de decisiones siempre deberá:

* Priorizar ventas.
* Priorizar seguimiento.
* Detectar oportunidades.
* Detectar riesgos.
* Explicar cada recomendación.
* Evitar falsas alertas.
* Ser transparente.

Nunca deberá emitir recomendaciones sin evidencia.

---

# Orden de prioridades

Cuando existan múltiples acciones posibles, el sistema deberá atenderlas en el siguiente orden:

1. Clientes estratégicos sin seguimiento.
2. Cotizaciones importantes pendientes.
3. Clientes con compras recurrentes que dejaron de comprar.
4. Prospectos con alta probabilidad de compra.
5. Clientes nuevos.
6. Clientes inactivos.
7. Tareas administrativas.

---

# Nivel de prioridad

Cada oportunidad deberá clasificarse como:

## Crítica

Requiere atención inmediata.

Ejemplos:

* Cliente estratégico sin seguimiento.
* Cotización importante vencida.
* Seguimiento prometido para hoy.

---

## Alta

Debe atenderse durante el día.

Ejemplos:

* Cliente con más de 30 días sin comprar.
* Prospecto esperando respuesta.
* Cliente con varias cotizaciones abiertas.

---

## Media

Puede atenderse durante la semana.

Ejemplos:

* Cliente activo sin contacto reciente.
* Prospecto nuevo.
* Seguimiento preventivo.

---

## Baja

No requiere acción inmediata.

Ejemplos:

* Cliente recientemente atendido.
* Cliente con compra reciente.
* Tareas informativas.

---

# Motor de clientes

El sistema deberá analizar automáticamente:

Última compra.

Monto promedio.

Frecuencia.

Número de compras.

Seguimientos.

Cotizaciones.

Valor comercial.

Categorías compradas.

---

# Reglas de clientes

SI un cliente nunca ha recibido seguimiento

ENTONCES generar alerta.

---

SI un cliente tiene seguimiento vencido

ENTONCES prioridad alta.

---

SI un cliente compra cada mes

Y han pasado más días de lo habitual

ENTONCES sugerir contacto.

---

SI un cliente incrementa sus compras

ENTONCES marcar oportunidad de crecimiento.

---

SI un cliente disminuye sus compras

ENTONCES generar alerta preventiva.

---

SI un cliente compra una sola categoría

ENTONCES sugerir productos complementarios.

---

# Motor de cotizaciones

SI una cotización fue enviada

Y no existe seguimiento después de varios días

ENTONCES sugerir llamada.

---

SI existen varias cotizaciones rechazadas

ENTONCES recomendar analizar la causa.

---

SI una cotización es aceptada

ENTONCES programar seguimiento postventa.

---

# Motor de prospectos

SI un prospecto nunca ha sido contactado

ENTONCES prioridad inmediata.

---

SI un prospecto recibió información

Y no existe respuesta

ENTONCES recordar seguimiento.

---

SI un prospecto solicita cotización

ENTONCES incrementar prioridad.

---

SI un prospecto realiza su primera compra

ENTONCES convertir automáticamente su estado a cliente (previa confirmación del usuario).

---

# Motor de ventas

Analizar diariamente:

Ventas.

Ticket promedio.

Productos.

Clientes nuevos.

Clientes recuperados.

Ventas perdidas.

Cumplimiento del presupuesto.

---

# Motor de oportunidades

Buscar automáticamente:

Clientes recuperables.

Clientes con potencial.

Productos no ofrecidos.

Compras estacionales.

Incremento del ticket promedio.

Ventas cruzadas.

---

# Motor de productos relacionados

Ejemplo:

SI el cliente compra porcelanato

Sugerir:

* Adhesivo.
* Boquilla.
* Crucetas.
* Niveladores.
* Herramientas de instalación.

---

SI compra sanitario

Sugerir:

* Llaves.
* Accesorios.
* Asiento.
* Válvula.
* Conectores.

---

Estas reglas deberán poder ampliarse sin modificar el núcleo del sistema.

---

# Motor de seguimiento

Cada seguimiento deberá responder:

¿Ya se realizó?

¿Cuándo toca el siguiente?

¿Cuál fue el resultado?

¿Existe compromiso con el cliente?

¿Qué acción sigue?

---

# Motor de agenda

Cada mañana el sistema deberá generar automáticamente:

Top 10 clientes prioritarios.

Top 10 seguimientos.

Top 5 oportunidades.

Top 5 riesgos.

Tareas pendientes.

Recomendaciones IA.

---

# Motor de alertas

Las alertas deberán clasificarse por importancia.

Nunca mostrar más de cinco alertas críticas al mismo tiempo.

Evitar saturar al usuario.

---

# Motor de aprendizaje

En futuras versiones el sistema podrá aprender de:

* Clientes recuperados.
* Ventas exitosas.
* Seguimientos efectivos.
* Productos más vendidos juntos.
* Estacionalidad.
* Conversión de prospectos.

Las recomendaciones futuras podrán ajustarse utilizando estos patrones.

---

# Motor de confianza

Cada recomendación deberá incluir un nivel de confianza:

* Muy alta.
* Alta.
* Media.
* Baja.

Este nivel dependerá de la cantidad y calidad de datos disponibles.

---

# Explicabilidad

Toda recomendación deberá responder:

¿Por qué?

¿Qué datos utilizó?

¿Qué beneficio espera obtener?

Nunca emitir recomendaciones sin explicación.

---

# Reglas de seguridad

El motor nunca podrá:

Modificar clientes automáticamente.

Eliminar registros.

Cerrar cotizaciones.

Cambiar estados sin autorización.

Enviar mensajes sin confirmación del usuario.

Toda acción que altere información requerirá validación del usuario.

---

# Evolución

Este documento deberá crecer continuamente.

Cada nueva regla comercial aprobada deberá agregarse aquí antes de implementarse en el sistema.

El objetivo es que el conocimiento del negocio permanezca documentado y no dependa únicamente del código.

---

# Regla Suprema

El motor de decisiones existe para responder una única pregunta:

**"¿Cuál es la acción que ofrece la mayor probabilidad de generar una venta o fortalecer la relación con el cliente en este momento?"**

Toda decisión deberá orientarse a responder esa pregunta de manera objetiva, explicable y basada en datos.

