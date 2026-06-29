# IDEAS.md

# Banco de Ideas

Proyecto: PG Lista 3 AI
Versión: 1.0
Estado: Documento de exploración

---

## Objetivo

Este documento almacena ideas, propuestas, experimentos y posibles mejoras para PG Lista 3 AI.

Las ideas registradas aquí:

* No están aprobadas automáticamente.
* No forman parte del MVP.
* No representan tareas pendientes.
* No tienen fecha de entrega.
* No deben implementarse sin evaluación.
* Pueden modificarse, combinarse o descartarse.

Las decisiones aprobadas deberán pasar a `memory/decision_log.md`.

Las funciones seleccionadas para desarrollo deberán pasar a:

* `docs/09_ROADMAP.md`
* `docs/10_TASKS.md`

La visión de largo plazo deberá registrarse en `memory/future.md`.

---

# Estados permitidos

Cada idea deberá tener uno de los siguientes estados:

* Borrador
* En evaluación
* Validar con usuarios
* Aprobada
* Convertida en tarea
* Pospuesta
* Descartada

---

# Prioridad estimada

Las ideas podrán clasificarse como:

* Alta
* Media
* Baja
* Sin definir

La prioridad no implica aprobación.

---

# Formato para registrar nuevas ideas

```md
## IDEA-000 — Nombre de la idea

**Fecha:** AAAA-MM-DD  
**Estado:** Borrador  
**Prioridad estimada:** Alta | Media | Baja | Sin definir  
**Área:** Clientes | Prospectos | Seguimientos | IA | Ventas | Productos | Integraciones | UX | Reportes  

### Problema

¿Qué problema real intenta resolver?

### Propuesta

¿En qué consiste la idea?

### Beneficio esperado

¿Qué mejora generaría?

### Riesgos o dudas

¿Qué todavía no sabemos?

### Validación necesaria

¿Cómo comprobaremos si vale la pena?

### Dependencias

¿Qué se necesita antes de construirla?
```

---

# Ideas iniciales

## IDEA-001 — Plan comercial diario generado por IA

**Fecha:** 2026-06-29
**Estado:** Validar con usuarios
**Prioridad estimada:** Alta
**Área:** IA

### Problema

El vendedor puede perder tiempo decidiendo a quién contactar y qué seguimientos atender primero.

### Propuesta

Al abrir la aplicación, el agente generará una lista priorizada de acciones para el día.

Ejemplo:

1. Contactar a un cliente con cotización pendiente.
2. Recuperar a un cliente que dejó de comprar.
3. Dar seguimiento a un prospecto interesado.
4. Invitar a un cliente a conocer productos en tienda.

Cada acción deberá mostrar:

* Cliente o prospecto.
* Motivo.
* Prioridad.
* Acción recomendada.
* Fecha del último contacto.
* Botón para registrar el resultado.

### Beneficio esperado

Reducir clientes olvidados y aumentar seguimientos efectivos.

### Riesgos o dudas

La calidad dependerá de que la información esté actualizada.

### Validación necesaria

Probar durante dos semanas si el usuario completa las recomendaciones y si estas generan respuestas, cotizaciones o ventas.

### Dependencias

* Clientes.
* Prospectos.
* Seguimientos.
* Motor de decisiones.

---

## IDEA-002 — Captura rápida de prospectos en menos de 30 segundos

**Fecha:** 2026-06-29
**Estado:** Aprobada conceptualmente
**Prioridad estimada:** Alta
**Área:** Prospectos

### Problema

Los clientes potenciales pueden perderse si el registro requiere demasiados datos.

### Propuesta

Crear un formulario rápido con:

* Nombre.
* Empresa.
* Teléfono o WhatsApp.
* Tipo de cliente.
* Producto o proyecto de interés.
* Próxima acción.

Los demás datos podrán completarse después.

### Beneficio esperado

Registrar oportunidades sin interrumpir la atención en tienda.

### Riesgos o dudas

Podrían acumularse registros incompletos.

### Validación necesaria

Medir cuánto tarda el usuario en registrar un prospecto real.

### Dependencias

* Módulo de prospectos.
* Validación de duplicados.

---

## IDEA-003 — Bandeja de cotizaciones pendientes

**Fecha:** 2026-06-29
**Estado:** En evaluación
**Prioridad estimada:** Alta
**Área:** Seguimientos

### Problema

Las cotizaciones pueden quedar sin seguimiento y terminar perdiéndose.

### Propuesta

Crear una vista que clasifique las cotizaciones por tiempo sin atención:

* Hoy.
* Entre 1 y 3 días.
* Entre 4 y 7 días.
* Más de 7 días.
* Vencidas.

La IA propondrá un mensaje o una llamada de seguimiento.

### Beneficio esperado

Mejorar la conversión de cotizaciones a ventas.

### Riesgos o dudas

Será necesario registrar correctamente cuándo se envió cada cotización.

### Validación necesaria

Comparar cuántas cotizaciones reciben seguimiento antes y después de usar la función.

### Dependencias

* Módulo de cotizaciones.
* Historial de seguimiento.

---

## IDEA-004 — Recuperación de clientes inactivos

**Fecha:** 2026-06-29
**Estado:** Validar con usuarios
**Prioridad estimada:** Alta
**Área:** Clientes

### Problema

Existen clientes que anteriormente compraban y ya no reciben seguimiento.

### Propuesta

Detectar clientes cuyo tiempo sin comprar sea mayor a su comportamiento habitual.

El sistema deberá mostrar:

* Última compra.
* Frecuencia histórica.
* Categorías compradas.
* Monto promedio.
* Acción sugerida.
* Borrador de mensaje.

### Beneficio esperado

Recuperar ventas utilizando una cartera que ya conoce la empresa.

### Riesgos o dudas

Durante el MVP puede no existir historial suficiente.

### Validación necesaria

Realizar una campaña pequeña de recuperación y medir respuestas, cotizaciones y ventas.

### Dependencias

* Historial de ventas.
* Importación desde Excel o Intelisis.

---

## IDEA-005 — Invitación inteligente para visitar la tienda

**Fecha:** 2026-06-29
**Estado:** En evaluación
**Prioridad estimada:** Alta
**Área:** Ventas

### Problema

Los productos como pisos, recubrimientos, muebles de baño y acabados se venden mejor cuando el cliente puede verlos físicamente.

### Propuesta

El agente preparará invitaciones personalizadas para que prospectos y clientes visiten la sucursal.

La invitación podrá considerar:

* Tipo de proyecto.
* Productos de interés.
* Novedades disponibles.
* Horario sugerido.
* Nombre del asesor.
* Ubicación de la sucursal.
* Cita opcional.

### Beneficio esperado

Aumentar visitas de clientes profesionales con una necesidad concreta.

### Riesgos o dudas

La invitación debe sentirse personal y no como publicidad masiva.

### Validación necesaria

Registrar cuántas invitaciones generan visitas y cuántas visitas terminan en cotización.

### Dependencias

* Plantillas de mensajes.
* Agenda.
* Datos de la sucursal.

---

## IDEA-006 — Resumen inteligente antes de atender a un cliente

**Fecha:** 2026-06-29
**Estado:** En evaluación
**Prioridad estimada:** Media
**Área:** IA

### Problema

Antes de llamar o recibir a un cliente, el vendedor puede no recordar su historial completo.

### Propuesta

Mostrar un resumen de pocos segundos con:

* Quién es.
* Qué proyecto tiene.
* Qué productos le interesan.
* Último contacto.
* Cotizaciones pendientes.
* Compromisos realizados.
* Próxima acción sugerida.

### Beneficio esperado

Dar una atención más personalizada y profesional.

### Riesgos o dudas

El resumen debe ser breve y evitar información irrelevante.

### Validación necesaria

Probarlo con clientes reales y preguntar al usuario si le ayudó a preparar mejor la conversación.

### Dependencias

* Ficha del cliente.
* Historial.
* IA.

---

## IDEA-007 — Notas de seguimiento mediante voz

**Fecha:** 2026-06-29
**Estado:** Pospuesta
**Prioridad estimada:** Media
**Área:** UX

### Problema

Escribir notas puede resultar lento mientras se atiende la tienda.

### Propuesta

Permitir que el usuario diga:

> Hablé con el arquitecto. Está buscando piso para una casa de 180 metros cuadrados. Vendrá el jueves por la tarde.

El sistema convertirá el audio en:

* Nota.
* Producto de interés.
* Próxima acción.
* Fecha de seguimiento.
* Posible cita.

El usuario revisará la información antes de guardarla.

### Beneficio esperado

Registrar información rápidamente y con mayor detalle.

### Riesgos o dudas

Errores de transcripción y privacidad de conversaciones.

### Validación necesaria

Probar precisión con notas cortas en un ambiente de tienda.

### Dependencias

* Servicio de transcripción.
* Confirmación del usuario.

---

## IDEA-008 — Generador de mensajes personalizados

**Fecha:** 2026-06-29
**Estado:** En evaluación
**Prioridad estimada:** Alta
**Área:** IA

### Problema

Los mensajes genéricos suelen recibir menos respuestas.

### Propuesta

El agente redactará mensajes basados en el historial real del cliente.

Tipos:

* Primer contacto.
* Seguimiento de cotización.
* Recuperación de cliente.
* Invitación a tienda.
* Presentación de novedades.
* Confirmación de cita.
* Seguimiento posterior a la compra.

El mensaje deberá quedar como borrador editable.

### Beneficio esperado

Ahorrar tiempo y mejorar la calidad del contacto.

### Riesgos o dudas

No debe inventar promociones, precios, disponibilidad ni compromisos.

### Validación necesaria

Comparar la tasa de respuesta frente a mensajes tradicionales.

### Dependencias

* Historial del cliente.
* Plantillas.
* Agente IA.

---

## IDEA-009 — Perfil de oportunidad comercial

**Fecha:** 2026-06-29
**Estado:** Borrador
**Prioridad estimada:** Media
**Área:** Clientes

### Problema

No todos los prospectos representan la misma oportunidad.

### Propuesta

Asignar una calificación utilizando información como:

* Tipo de cliente.
* Tamaño aproximado del proyecto.
* Urgencia.
* Categorías de interés.
* Presupuesto conocido.
* Número de contactos.
* Respuesta a seguimientos.
* Cotizaciones solicitadas.

La calificación deberá explicar sus razones.

### Beneficio esperado

Enfocar el tiempo en oportunidades con mayor probabilidad de compra.

### Riesgos o dudas

No se debe descartar automáticamente a un prospecto por una calificación baja.

### Validación necesaria

Comparar las calificaciones con las conversiones reales.

### Dependencias

* Motor de decisiones.
* Datos suficientes.

---

## IDEA-010 — Panel de resultados de Lista 3

**Fecha:** 2026-06-29
**Estado:** En evaluación
**Prioridad estimada:** Alta
**Área:** Reportes

### Problema

La gerencia necesita conocer los resultados sin revisar cliente por cliente.

### Propuesta

Mostrar indicadores como:

* Venta Lista 3.
* Objetivo.
* Porcentaje de cumplimiento.
* Clientes nuevos.
* Clientes recuperados.
* Prospectos activos.
* Cotizaciones pendientes.
* Seguimientos realizados.
* Conversión.
* Ticket promedio.

Los reportes generales podrán ocultar nombres sensibles cuando corresponda.

### Beneficio esperado

Presentar avances claros en juntas y tomar decisiones oportunas.

### Riesgos o dudas

Los cálculos deberán utilizar definiciones comerciales oficiales.

### Validación necesaria

Comparar el panel con los reportes utilizados actualmente.

### Dependencias

* Ventas.
* Clientes.
* Permisos.
* Objetivos comerciales.

---

## IDEA-011 — Importación asistida desde Excel

**Fecha:** 2026-06-29
**Estado:** En evaluación
**Prioridad estimada:** Alta
**Área:** Integraciones

### Problema

Durante el MVP puede ser necesario importar clientes o ventas sin conectarse directamente con Intelisis.

### Propuesta

Crear un asistente que permita:

1. Subir un archivo.
2. Detectar columnas.
3. Relacionarlas con campos del sistema.
4. Mostrar una vista previa.
5. Identificar duplicados.
6. Informar errores.
7. Confirmar la importación.

### Beneficio esperado

Empezar con información real sin desarrollar todavía una integración compleja.

### Riesgos o dudas

Los reportes pueden cambiar de estructura.

### Validación necesaria

Probar con archivos reales exportados desde Intelisis.

### Dependencias

* Modelo de datos.
* Validación.
* Auditoría.

---

## IDEA-012 — Buscador global con lenguaje natural

**Fecha:** 2026-06-29
**Estado:** Borrador
**Prioridad estimada:** Media
**Área:** IA

### Problema

Los usuarios pueden tardar en encontrar información distribuida en distintas pantallas.

### Propuesta

Permitir preguntas como:

* ¿Qué clientes tienen cotizaciones pendientes?
* ¿Quién lleva más de 30 días sin seguimiento?
* ¿Qué prospectos buscan pisos?
* ¿Cuántos clientes nuevos conseguimos este mes?
* ¿Qué debo atender hoy?

### Beneficio esperado

Consultar información rápidamente sin aprender filtros complejos.

### Riesgos o dudas

El agente deberá respetar permisos y no mostrar información fuera del alcance del usuario.

### Validación necesaria

Probar con las preguntas más comunes del equipo.

### Dependencias

* Datos estructurados.
* Permisos.
* Agente IA.

---

## IDEA-013 — Paquetes de solución por proyecto

**Fecha:** 2026-06-29
**Estado:** Borrador
**Prioridad estimada:** Media
**Área:** Productos

### Problema

El vendedor puede enfocarse solo en el producto principal y dejar pasar artículos complementarios.

### Propuesta

Crear grupos orientativos, por ejemplo:

* Proyecto de baño.
* Proyecto de cocina.
* Colocación de piso.
* Recubrimiento de muro.
* Remodelación residencial.

Cada paquete funcionará como lista de revisión comercial, no como cotización automática.

### Beneficio esperado

Ofrecer soluciones más completas y aumentar el ticket promedio.

### Riesgos o dudas

Los productos exactos deben depender del catálogo, compatibilidad y existencia.

### Validación necesaria

Revisar los paquetes con vendedores que conozcan las categorías.

### Dependencias

* Catálogo.
* Categorías.
* Productos relacionados.

---

## IDEA-014 — Seguimiento posterior a la compra

**Fecha:** 2026-06-29
**Estado:** En evaluación
**Prioridad estimada:** Media
**Área:** Seguimientos

### Problema

La relación comercial puede detenerse después de cerrar la venta.

### Propuesta

Después de una compra importante, programar:

* Confirmación de entrega.
* Pregunta sobre avance del proyecto.
* Detección de material adicional.
* Solicitud de próxima etapa.
* Recordatorio de recompra cuando corresponda.

### Beneficio esperado

Fortalecer la relación y generar compras posteriores.

### Riesgos o dudas

No saturar al cliente con demasiados mensajes.

### Validación necesaria

Probar distintas frecuencias según el tipo de proyecto.

### Dependencias

* Ventas.
* Agenda.
* Reglas de frecuencia.

---

## IDEA-015 — Preparador de juntas comerciales

**Fecha:** 2026-06-29
**Estado:** Borrador
**Prioridad estimada:** Media
**Área:** Reportes

### Problema

Preparar manualmente cifras, avances y planes de acción requiere tiempo.

### Propuesta

El sistema generará un borrador para juntas con:

* Venta acumulada.
* Presupuesto.
* Porcentaje de cumplimiento.
* Diferencia contra meta.
* Resultado Lista 3.
* Clientes nuevos.
* Seguimientos.
* Problemas detectados.
* Plan de acción.

El usuario deberá revisar el texto antes de presentarlo.

### Beneficio esperado

Presentar resultados claros y acciones concretas.

### Riesgos o dudas

Debe evitar exponer nombres de clientes cuando la información sea sensible.

### Validación necesaria

Comparar el borrador con la información que actualmente se solicita en las juntas.

### Dependencias

* Datos de ventas.
* Objetivos.
* Reportes.
* Permisos.

---

## IDEA-016 — Semáforo comercial de clientes

**Fecha:** 2026-06-29
**Estado:** En evaluación
**Prioridad estimada:** Media
**Área:** Clientes

### Problema

Es difícil detectar visualmente qué clientes requieren atención.

### Propuesta

Utilizar un semáforo:

* Verde: actividad reciente y sin pendientes.
* Amarillo: seguimiento próximo o reducción de actividad.
* Rojo: seguimiento vencido, cotización olvidada o inactividad anormal.
* Gris: archivado o sin información suficiente.

El color nunca deberá ser el único indicador; deberá incluir texto y motivo.

### Beneficio esperado

Identificar rápidamente la salud de la cartera.

### Riesgos o dudas

Los límites deberán adaptarse al comportamiento real de cada cliente.

### Validación necesaria

Revisar si la clasificación coincide con la percepción del vendedor.

### Dependencias

* Motor de decisiones.
* Historial.

---

## IDEA-017 — Registro del origen del prospecto

**Fecha:** 2026-06-29
**Estado:** Borrador
**Prioridad estimada:** Media
**Área:** Prospectos

### Problema

No se conoce qué medios generan los mejores clientes.

### Propuesta

Registrar el origen:

* Visita a tienda.
* Recomendación.
* WhatsApp.
* Llamada.
* Página web.
* Redes sociales.
* Cliente anterior.
* Constructora.
* Arquitecto.
* Otro.

### Beneficio esperado

Identificar los canales que producen más oportunidades y ventas.

### Riesgos o dudas

El origen debe registrarse fácilmente para no entorpecer la captura.

### Validación necesaria

Medir conversiones por origen durante varios meses.

### Dependencias

* Prospectos.
* Reportes.

---

## IDEA-018 — Modo de captura durante atención en tienda

**Fecha:** 2026-06-29
**Estado:** Borrador
**Prioridad estimada:** Alta
**Área:** UX

### Problema

Durante la atención al cliente no es práctico abrir formularios extensos.

### Propuesta

Crear una ventana compacta para registrar:

* Quién vino.
* Qué busca.
* Medidas o cantidad aproximada.
* Fecha estimada de compra.
* Teléfono.
* Próxima acción.

Después podrá completarse el perfil.

### Beneficio esperado

Convertir visitas de mostrador en oportunidades de seguimiento.

### Riesgos o dudas

Debe evitar registros duplicados o demasiado incompletos.

### Validación necesaria

Probarla durante una jornada real en la sucursal.

### Dependencias

* Captura rápida.
* Detección de duplicados.

---

## IDEA-019 — Control de compromisos con el cliente

**Fecha:** 2026-06-29
**Estado:** Borrador
**Prioridad estimada:** Alta
**Área:** Seguimientos

### Problema

Pueden olvidarse compromisos como enviar una cotización, confirmar existencia o devolver una llamada.

### Propuesta

Permitir marcar compromisos explícitos:

* Qué se prometió.
* A quién.
* Fecha límite.
* Responsable.
* Estado.
* Evidencia o nota de cumplimiento.

### Beneficio esperado

Mejorar la confianza y evitar fallas de atención.

### Riesgos o dudas

No duplicar innecesariamente tareas y seguimientos.

### Validación necesaria

Medir cuántos compromisos se completan a tiempo.

### Dependencias

* Tareas.
* Alertas.
* Ficha del cliente.

---

## IDEA-020 — Aprendizaje basado en resultados

**Fecha:** 2026-06-29
**Estado:** Pospuesta
**Prioridad estimada:** Baja
**Área:** IA

### Problema

Las reglas iniciales pueden no reflejar completamente qué acciones funcionan mejor.

### Propuesta

Registrar el resultado de cada recomendación:

* Ignorada.
* Ejecutada.
* Cliente respondió.
* Generó cotización.
* Generó venta.
* No funcionó.

Con suficiente información, ajustar las prioridades futuras.

### Beneficio esperado

Mejorar progresivamente la utilidad del agente.

### Riesgos o dudas

Requiere suficientes datos y controles para evitar conclusiones incorrectas.

### Validación necesaria

No evaluar hasta contar con un historial significativo.

### Dependencias

* Uso sostenido.
* Registro de resultados.
* Gobierno de datos.

---

# Ideas descartadas por ahora

## Aplicación móvil completa desde el inicio

Motivo:

El uso inicial será principalmente desde una computadora en la sucursal.

Podrá reconsiderarse después de validar el MVP.

---

## Envío automático de WhatsApp sin confirmación

Motivo:

Puede generar mensajes incorrectos, saturar clientes o crear compromisos no autorizados.

La primera versión solo generará borradores.

---

## Reemplazar Intelisis

Motivo:

Intelisis seguirá siendo el sistema operativo oficial.

PG Lista 3 AI será una capa de seguimiento e inteligencia comercial.

---

## Crear un sistema corporativo multisucursal desde el MVP

Motivo:

Primero se debe validar el producto en Nogalera.

---

## Predicciones complejas desde el inicio

Motivo:

Todavía no existe suficiente información confiable para generar modelos predictivos útiles.

---

# Proceso de evaluación de ideas

Toda idea deberá pasar por las siguientes preguntas:

1. ¿Resuelve un problema observado?
2. ¿Ayuda a vender más o mejorar el seguimiento?
3. ¿Quién la utilizará?
4. ¿Con qué frecuencia?
5. ¿Puede validarse de forma sencilla?
6. ¿Existe una solución más pequeña?
7. ¿Qué datos necesita?
8. ¿Qué riesgos tiene?
9. ¿Pertenece al MVP?
10. ¿Qué indicador demostrará que funciona?

---

# Flujo de promoción

Idea registrada.

↓

Evaluación.

↓

Validación con usuario.

↓

Decisión documentada.

↓

Incorporación al roadmap.

↓

Creación de tarea.

↓

Desarrollo.

↓

Medición del resultado.

---

# Reglas de mantenimiento

* No convertir todas las ideas en funciones.
* Evitar duplicar propuestas.
* Combinar ideas similares.
* Registrar la razón cuando una idea se descarte.
* No borrar ideas descartadas; conservar su aprendizaje.
* Revisar este archivo antes de planear una nueva versión.
* OpenCode no deberá implementar directamente una idea de este documento.
* Toda idea aprobada deberá quedar respaldada en `decision_log.md`.

---

# Principio final

Una idea no es valiosa por ser innovadora.

Es valiosa cuando resuelve un problema real, puede probarse y produce un beneficio medible para el usuario.

