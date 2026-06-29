# DECISION_LOG.md

# Registro de Decisiones

Proyecto: PG Lista 3 AI

Versión: 1.0

---

## Objetivo

Este documento conserva las decisiones importantes tomadas durante el diseño y desarrollo del proyecto.

Su propósito es evitar que una persona o una Inteligencia Artificial cambie posteriormente una decisión sin conocer:

* Por qué se tomó.
* Qué problema resolvía.
* Qué alternativas se evaluaron.
* Qué consecuencias tiene.
* Si la decisión continúa vigente.

Este archivo no es una lista de tareas.

Las tareas se registran en `docs/10_TASKS.md`.

Las ideas todavía no aprobadas se registran en `memory/ideas.md`.

---

## Formato obligatorio

Cada decisión nueva deberá utilizar esta estructura:

```md
## DEC-000 — Nombre de la decisión

**Fecha:** AAAA-MM-DD  
**Estado:** Propuesta | Aprobada | Reemplazada | Cancelada  
**Responsable:** Nombre  
**Área:** Producto | Negocio | Diseño | Tecnología | IA | Datos | Seguridad  

### Contexto

Explicación del problema o necesidad.

### Decisión

Descripción clara de lo que se decidió.

### Motivo

Razones que justifican la decisión.

### Alternativas consideradas

- Alternativa 1.
- Alternativa 2.

### Consecuencias

Beneficios, limitaciones y riesgos conocidos.

### Archivos relacionados

- `ruta/archivo.md`

### Reemplaza a

Indicar otra decisión cuando corresponda.
```

---

# Decisiones iniciales

## DEC-011 — Motor de recomendaciones 100% determinista (sin ML)

**Fecha:** 2026-06-29
**Estado:** Aprobada
**Responsable:** Enrique
**Área:** IA

### Contexto

El proyecto requiere un agente que recomiende acciones comerciales. La documentación original (docs/05_AI_AGENT.md, docs/06_DECISION_ENGINE.md) describe tanto reglas deterministas como posibles aplicaciones de ML.

### Decisión

El motor de recomendaciones se implementa con reglas deterministas puras:
- Sin APIs externas de IA/ML.
- Sin modelos entrenados.
- Sin llamadas a OpenAI, Anthropic, etc.
- Toda la lógica en TypeScript con condiciones explícitas.

### Motivo

- El MVP debe validar el flujo comercial antes de invertir en ML.
- Las reglas de negocio están bien definidas (docs/02_BUSINESS_RULES.md).
- Un motor determinista es predecible, testeable y no tiene costos recurrentes.
- El usuario puede entender y ajustar las reglas sin conocimientos de ML.

### Alternativas consideradas

- API de OpenAI para generar recomendaciones (costos, latencia, opacidad).
- Modelo local con TensorFlow.js (complejidad innecesaria para el MVP).

### Consecuencias

- 20+ reglas implementadas, todas testeables unitariamente.
- 15 tests unitarios que cubren todas las reglas principales.
- El motor es completamente offline (funciona sin internet).
- Las recomendaciones son explicables (cada una incluye evidencia concreta).

### Archivos relacionados

- `src/lib/recommendations.ts`
- `src/lib/__tests__/recommendations.test.ts`
- `docs/06_DECISION_ENGINE.md`

---

## DEC-012 — Soft delete para cotizaciones mediante cambio de estado

**Fecha:** 2026-06-29
**Estado:** Aprobada
**Responsable:** Enrique
**Área:** Negocio

### Contexto

La regla de negocio establece: "No eliminar físicamente información comercial importante sin confirmación" (docs/02_BUSINESS_RULES.md).

### Decisión

El método `quotes.delete()` en store.ts ahora ejecuta `update()` con `status: 'Cancelada'` en lugar de `filter()` o `splice()` del array. Se agregó un método `cancel()` como alias explícito. La UI muestra un modal de confirmación antes de cancelar.

### Motivo

- Preserva el historial comercial completo.
- Las cotizaciones canceladas aún aparecen en listados y reportes.
- El usuario puede distinguir entre cancelada/activa por el estado.

### Alternativas consideradas

- Eliminación física del registro (viola regla de negocio).
- Campo `deleted_at` con soft delete lógico (innecesario para MVP; el campo status es suficiente).

### Consecuencias

- El botón "Eliminar" se reemplazó por "Cancelar" con modal de confirmación.
- Las cotizaciones canceladas persisten en localStorage.
- No hay forma de recuperar una cotización cancelada desde la UI (requeriría función de revertir).

### Archivos relacionados

- `src/lib/store.ts` (métodos `delete` y `cancel`)
- `src/app/quotes/page.tsx` (modal de confirmación)
- `src/lib/types.ts` (QuoteStatus incluye 'Cancelada')

---



## DEC-001 — Construir primero un MVP interno

**Fecha:** 2026-06-29
**Estado:** Aprobada
**Responsable:** Enrique
**Área:** Producto

### Contexto

El proyecto comienza como una prueba para conocer si una aplicación con agente comercial puede ayudar a organizar y aumentar las ventas de clientes Lista 3.

Todavía no existe una validación suficiente para construir una plataforma corporativa completa.

### Decisión

Desarrollar primero un MVP sencillo, funcional y orientado a la sucursal Nogalera.

### Motivo

Se necesita validar el flujo real de trabajo antes de invertir tiempo en integraciones, automatizaciones y funciones avanzadas.

### Alternativas consideradas

* Construir desde el inicio una plataforma para todas las sucursales.
* Integrar Intelisis antes de probar el flujo comercial.
* Crear únicamente un CRM tradicional.

### Consecuencias

El MVP tendrá un alcance limitado, pero permitirá aprender rápidamente qué funciones aportan valor real.

### Archivos relacionados

* `docs/00_PROJECT.md`
* `docs/09_ROADMAP.md`
* `docs/10_TASKS.md`

---

## DEC-002 — El proyecto se enfocará primero en clientes Lista 3

**Fecha:** 2026-06-29
**Estado:** Aprobada
**Responsable:** Enrique
**Área:** Negocio

### Contexto

La oportunidad principal identificada consiste en aumentar la cartera de clientes de mayoreo y mejorar el seguimiento de clientes actuales y prospectos.

### Decisión

La primera versión se enfocará en:

* Prospectos Lista 3.
* Clientes Lista 3.
* Seguimientos.
* Cotizaciones.
* Recordatorios.
* Oportunidades comerciales.

### Motivo

Lista 3 representa una oportunidad directa para generar compras recurrentes y elevar el volumen de ventas.

### Consecuencias

Las funciones que no ayuden directamente a captar, recuperar o desarrollar clientes Lista 3 tendrán menor prioridad.

### Archivos relacionados

* `knowledge/lista3.md`
* `knowledge/clientes.md`
* `docs/02_BUSINESS_RULES.md`

---

## DEC-003 — La prospección inicial se realizará principalmente desde tienda

**Fecha:** 2026-06-29
**Estado:** Aprobada
**Responsable:** Enrique
**Área:** Negocio

### Contexto

Actualmente no existe disponibilidad para realizar visitas constantes fuera de la sucursal.

Las visitas solamente podrán hacerse cuando exista una cita concreta o un cliente puntual que esté esperando al vendedor.

Además, por tratarse de pisos, recubrimientos, baños y acabados, es conveniente que muchos clientes visiten la tienda para observar físicamente los productos.

### Decisión

El agente deberá priorizar acciones que puedan ejecutarse desde la sucursal:

* Llamadas.
* WhatsApp.
* Correos.
* Seguimiento de cotizaciones.
* Recuperación de clientes.
* Invitaciones para visitar la tienda.
* Preparación de citas puntuales.

### Motivo

La aplicación debe adaptarse a la operación real y no depender de visitas frecuentes que actualmente no pueden realizarse.

### Consecuencias

Las rutas de visitas y la prospección en campo no formarán parte del MVP.

### Archivos relacionados

* `docs/03_USER_FLOWS.md`
* `docs/05_AI_AGENT.md`
* `knowledge/lista3.md`

---

## DEC-004 — La IA será un copiloto, no un sistema autónomo

**Fecha:** 2026-06-29
**Estado:** Aprobada
**Responsable:** Enrique
**Área:** IA

### Contexto

El agente debe ayudar a encontrar oportunidades y organizar el seguimiento, pero no debe tomar acciones delicadas sin autorización.

### Decisión

La IA podrá:

* Analizar.
* Resumir.
* Priorizar.
* Recomendar.
* Redactar mensajes.
* Detectar riesgos y oportunidades.

La IA no podrá sin confirmación:

* Enviar mensajes.
* Cambiar estados.
* Eliminar registros.
* Crear compromisos con clientes.
* Modificar información comercial.

### Motivo

La decisión final debe permanecer en manos del usuario.

### Consecuencias

Las acciones sugeridas por IA deberán presentarse con botones de confirmación o edición.

### Archivos relacionados

* `docs/05_AI_AGENT.md`
* `docs/06_DECISION_ENGINE.md`
* `docs/12_SECURITY.md`

---

## DEC-005 — Intelisis continuará como sistema oficial de operación

**Fecha:** 2026-06-29
**Estado:** Aprobada
**Responsable:** Enrique
**Área:** Datos

### Contexto

Intelisis contiene información operativa de clientes, productos, inventarios, cotizaciones y ventas.

### Decisión

PG Lista 3 AI no reemplazará Intelisis.

La aplicación funcionará como una capa de seguimiento e inteligencia comercial.

### Motivo

No es necesario reconstruir las funciones del ERP para validar el proyecto.

### Consecuencias

Durante el MVP podrá utilizarse captura manual o importación mediante Excel.

La integración directa con Intelisis se evaluará después de validar la utilidad de la aplicación.

### Archivos relacionados

* `knowledge/intelisis.md`
* `docs/04_DATABASE.md`
* `docs/09_ROADMAP.md`

---

## DEC-006 — El MVP será una aplicación web para escritorio

**Fecha:** 2026-06-29
**Estado:** Aprobada
**Responsable:** Enrique
**Área:** Tecnología

### Contexto

La herramienta será utilizada principalmente dentro de la sucursal desde una computadora.

### Decisión

Desarrollar primero una aplicación web optimizada para escritorio.

Tecnologías previstas:

* Next.js.
* TypeScript.
* Tailwind CSS.
* Supabase.
* Vercel.

### Motivo

Este stack permite desarrollar, probar y desplegar rápidamente sin instalar programas en cada computadora.

### Consecuencias

La versión móvil no será prioridad durante el MVP, aunque la interfaz deberá evitar bloquear una futura adaptación.

### Archivos relacionados

* `README.md`
* `docs/14_DEPLOYMENT.md`
* `docs/07_UI_UX.md`

---

## DEC-007 — Empezar con información capturada manualmente

**Fecha:** 2026-06-29
**Estado:** Aprobada
**Responsable:** Enrique
**Área:** Producto

### Contexto

Todavía no se conoce el método autorizado para conectarse directamente con Intelisis.

Esperar una integración completa impediría probar rápidamente el proyecto.

### Decisión

La primera versión permitirá registrar manualmente:

* Prospectos.
* Clientes.
* Seguimientos.
* Cotizaciones.
* Notas.
* Próximas acciones.

Posteriormente se podrán importar datos desde Excel.

### Motivo

Validar primero el flujo y la utilidad del agente antes de desarrollar integraciones complejas.

### Consecuencias

Algunas métricas iniciales dependerán de la información registrada por los usuarios.

### Archivos relacionados

* `docs/03_USER_FLOWS.md`
* `docs/09_ROADMAP.md`
* `docs/10_TASKS.md`

---

## DEC-008 — No mencionar públicamente los clientes captados desde otras sucursales

**Fecha:** 2026-06-29
**Estado:** Aprobada
**Responsable:** Enrique
**Área:** Negocio

### Contexto

Algunos clientes actualmente atendidos en Nogalera compraban anteriormente en otras sucursales de Plomería García.

Divulgar sus nombres en juntas o reportes generales podría generar conflictos internos.

### Decisión

Los reportes generales deberán mostrar cantidades, estados y resultados sin exponer nombres cuando no sea necesario.

Los nombres solamente se mostrarán a usuarios con permisos y dentro de la gestión operativa correspondiente.

### Motivo

Proteger la relación comercial y evitar conflictos entre sucursales.

### Consecuencias

El sistema deberá permitir reportes agregados y controles de visibilidad.

### Archivos relacionados

* `docs/12_SECURITY.md`
* `knowledge/clientes.md`

---

## DEC-009 — El agente deberá explicar sus recomendaciones

**Fecha:** 2026-06-29
**Estado:** Aprobada
**Responsable:** Enrique
**Área:** IA

### Contexto

Una recomendación sin explicación puede parecer arbitraria y generar poca confianza.

### Decisión

Cada recomendación deberá mostrar:

* Acción sugerida.
* Motivo.
* Datos utilizados.
* Prioridad.
* Nivel de confianza cuando corresponda.

### Motivo

El usuario necesita comprender por qué debe actuar sobre un cliente antes que sobre otro.

### Consecuencias

No serán válidas recomendaciones genéricas como “llama a este cliente” sin contexto.

### Archivos relacionados

* `docs/05_AI_AGENT.md`
* `docs/06_DECISION_ENGINE.md`

---

## DEC-010 — No construir funciones avanzadas antes de validar el uso real

**Fecha:** 2026-06-29
**Estado:** Aprobada
**Responsable:** Enrique
**Área:** Producto

### Contexto

Existe una visión amplia que incluye WhatsApp, Intelisis, predicciones, rutas, automatizaciones y múltiples sucursales.

### Decisión

No desarrollar estas funciones durante la primera prueba salvo que sean indispensables para validar el flujo principal.

### Motivo

Evitar que el proyecto se vuelva demasiado grande antes de comprobar que los vendedores realmente lo utilizan.

### Consecuencias

El MVP se concentrará en:

1. Clientes.
2. Prospectos.
3. Seguimientos.
4. Agenda.
5. Cotizaciones.
6. Recomendaciones básicas del agente.
7. Indicadores esenciales.

### Archivos relacionados

* `docs/09_ROADMAP.md`
* `docs/10_TASKS.md`

---

# Reglas de mantenimiento

* No borrar decisiones anteriores.
* Una decisión reemplazada deberá conservarse y cambiar su estado a `Reemplazada`.
* Toda modificación importante del alcance deberá registrarse aquí.
* Las decisiones pequeñas de implementación no necesitan registrarse.
* OpenCode deberá consultar este archivo antes de proponer cambios importantes.
* Una decisión registrada no deberá modificarse silenciosamente desde el código.

---

# Principio final

El código puede cambiar.

Las herramientas pueden cambiar.

La interfaz puede cambiar.

Las razones detrás de las decisiones deben permanecer documentadas.

