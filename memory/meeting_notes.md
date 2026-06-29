# MEETING_NOTES.md

# Minutas y Notas de Reuniones

Proyecto: PG Lista 3 AI
Versión: 1.0

---

## Objetivo

Este documento conserva las notas de las reuniones relacionadas con PG Lista 3 AI.

Su propósito es registrar:

* Temas discutidos.
* Información relevante.
* Cifras presentadas.
* Problemas identificados.
* Acuerdos.
* Responsables.
* Fechas compromiso.
* Preguntas pendientes.
* Próximos pasos.

Este archivo funciona como memoria de las reuniones, pero no sustituye otros documentos oficiales.

---

## Relación con otros archivos

Cuando una reunión produzca una decisión aprobada, deberá registrarse también en:

```text
memory/decision_log.md
```

Cuando genere una tarea confirmada, deberá agregarse a:

```text
docs/10_TASKS.md
```

Cuando produzca una idea todavía no validada, deberá agregarse a:

```text
memory/ideas.md
```

Cuando modifique la visión futura, deberá actualizarse:

```text
memory/future.md
```

---

# Tipos de reunión

Las reuniones podrán clasificarse como:

* Planeación del proyecto.
* Revisión del MVP.
* Revisión comercial.
* Seguimiento de Lista 3.
* Revisión técnica.
* Revisión de diseño.
* Pruebas con usuarios.
* Revisión con gerencia.
* Reunión con sistemas.
* Reunión con proveedores.
* Retrospectiva.

---

# Formato obligatorio para nuevas reuniones

```md
## MTG-000 — Nombre de la reunión

**Fecha:** AAAA-MM-DD  
**Hora:** HH:MM  
**Tipo:** Tipo de reunión  
**Modalidad:** Presencial | Videollamada | Llamada | Chat  
**Lugar:** Lugar o plataforma  
**Responsable de la minuta:** Nombre  

### Participantes

- Nombre — Puesto o función.
- Nombre — Puesto o función.

### Objetivo de la reunión

Explicar brevemente por qué se realizó.

### Contexto previo

Información necesaria para comprender la reunión.

### Temas discutidos

1. Tema.
2. Tema.
3. Tema.

### Información y cifras presentadas

- Indicador:
- Resultado:
- Periodo:
- Fuente:

### Problemas identificados

- Problema.
- Causa probable.
- Impacto.

### Propuestas discutidas

- Propuesta.
- Beneficios.
- Riesgos.
- Estado: pendiente, aceptada o descartada.

### Acuerdos

1. Acuerdo.
2. Acuerdo.
3. Acuerdo.

### Tareas y responsables

| ID | Tarea | Responsable | Fecha compromiso | Estado |
|---|---|---|---|---|
| 1 | Descripción | Nombre | AAAA-MM-DD | Pendiente |

### Decisiones tomadas

- Decisión.
- Motivo.
- Archivo que deberá actualizarse.

### Preguntas pendientes

- Pregunta.
- Responsable de investigarla.
- Fecha estimada de respuesta.

### Riesgos o bloqueos

- Riesgo.
- Impacto.
- Acción de mitigación.

### Próxima reunión

**Fecha tentativa:**  
**Objetivo:**  

### Archivos relacionados

- `ruta/archivo.md`
- Enlace, reporte o evidencia.

### Observaciones adicionales

Información que no corresponda a otra sección.
```

---

# Reglas para registrar reuniones

* Registrar la minuta el mismo día o lo antes posible.
* Escribir hechos y acuerdos, no interpretaciones personales.
* No marcar como decisión algo que todavía no fue aprobado.
* Asignar responsables únicamente cuando exista confirmación.
* Incluir fechas compromiso cuando sean conocidas.
* Evitar información innecesaria o conversaciones completas.
* No guardar contraseñas, claves, tokens ni datos bancarios.
* No exponer información sensible de clientes sin necesidad.
* Utilizar cifras con periodo y fuente.
* Mantener el historial; no borrar reuniones anteriores.
* Corregir errores dejando una nota cuando el cambio sea importante.

---

# Estados de tareas surgidas en reuniones

* Pendiente.
* En proceso.
* Bloqueada.
* Completada.
* Cancelada.

Las tareas oficiales deberán trasladarse posteriormente a `docs/10_TASKS.md`.

---

# Estados de propuestas

* Presentada.
* En evaluación.
* Requiere información.
* Aprobada.
* Rechazada.
* Pospuesta.

---

# Primera minuta del proyecto

## MTG-001 — Definición inicial de PG Lista 3 AI

**Fecha:** 2026-06-29
**Tipo:** Planeación del proyecto
**Modalidad:** Conversación de trabajo
**Responsable de la minuta:** Enrique

### Participantes

* Enrique — Responsable e impulsor del proyecto.
* Asistente de IA — Apoyo para planeación y documentación.

### Objetivo de la reunión

Definir el problema principal, el alcance inicial y la documentación necesaria para comenzar el desarrollo de PG Lista 3 AI.

### Contexto previo

La sucursal Nogalera necesita aumentar su cartera de clientes Lista 3, dar mejor seguimiento a prospectos y evitar que cotizaciones y oportunidades comerciales se pierdan.

Actualmente gran parte del seguimiento depende de:

* Memoria del vendedor.
* WhatsApp.
* Llamadas.
* Notas.
* Archivos de Excel.
* Información consultada en Intelisis.

No existe todavía una herramienta que concentre la gestión comercial y proponga acciones de seguimiento.

### Temas discutidos

1. Definición de Lista 3.
2. Necesidad de captar clientes de mayoreo.
3. Seguimiento a clientes y prospectos.
4. Restricciones para realizar visitas frecuentes.
5. Importancia de invitar clientes a conocer productos en tienda.
6. Uso futuro de información procedente de Intelisis.
7. Construcción de un agente comercial con IA.
8. Alcance inicial del MVP.
9. Estructura documental del proyecto.
10. Stack tecnológico previsto.

### Situación operativa

El usuario trabaja principalmente desde la sucursal Nogalera.

No existe disponibilidad permanente para salir a buscar clientes.

Las visitas se realizarán principalmente cuando:

* Exista una cita confirmada.
* El cliente esté esperando al asesor.
* Se trate de una oportunidad concreta.

Debido a que se comercializan pisos, recubrimientos, baños y productos de acabados, resulta conveniente que muchos clientes visiten la tienda para conocer físicamente los productos.

### Problemas identificados

* Clientes sin seguimiento.
* Prospectos que pueden perderse.
* Cotizaciones olvidadas.
* Falta de una agenda comercial centralizada.
* Información distribuida entre diferentes herramientas.
* Dependencia de la memoria del vendedor.
* Dificultad para priorizar oportunidades.
* Falta de indicadores claros de Lista 3.

### Propuesta principal

Desarrollar una aplicación web llamada provisionalmente PG Lista 3 AI.

La aplicación deberá:

* Registrar prospectos.
* Administrar clientes.
* Registrar seguimientos.
* Controlar cotizaciones.
* Organizar próximas acciones.
* Mostrar indicadores.
* Generar recomendaciones mediante IA.
* Ayudar al vendedor a decidir qué hacer cada día.

### Acuerdos

1. Comenzar con un MVP para la sucursal Nogalera.
2. Priorizar el uso desde computadora.
3. No intentar reemplazar Intelisis.
4. Empezar con captura manual de datos.
5. Evaluar importación desde Excel después de validar el flujo.
6. Mantener la IA como copiloto y no como sistema autónomo.
7. Priorizar llamadas, WhatsApp, correos e invitaciones a tienda.
8. No desarrollar inicialmente funciones complejas de campo.
9. Documentar primero el proyecto para que OpenCode comprenda el contexto.
10. Utilizar los documentos del proyecto como fuente oficial de verdad.

### Decisiones tomadas

* El proyecto iniciará como MVP interno.
* La primera implementación estará enfocada en Nogalera.
* La plataforma será web y priorizará escritorio.
* La IA recomendará acciones, pero requerirá confirmación para modificar datos o comunicarse con clientes.
* Intelisis continuará siendo el ERP oficial.
* El éxito del MVP se medirá por seguimiento y resultados comerciales, no por cantidad de funciones.

Estas decisiones deberán conservarse en:

```text
memory/decision_log.md
```

### Documentación creada

Se definió la siguiente estructura:

```text
README.md

docs/
knowledge/
memory/
```

Dentro de `docs/` se documentaron:

* Visión del proyecto.
* Visión del producto.
* Reglas de negocio.
* Flujos de usuario.
* Base de datos.
* Agente de IA.
* Motor de decisiones.
* UI y UX.
* Prompts.
* Roadmap.
* Tareas.
* Design System.
* API.
* Seguridad.
* Testing.
* Deployment.
* Contribución.
* Changelog.

Dentro de `knowledge/` se documentaron:

* Categorías.
* Clientes.
* Preguntas frecuentes.
* Intelisis.
* Lista 3.
* Plomería García.
* Productos.
* Ventas.

Dentro de `memory/` se documentaron:

* Decisiones.
* Visión futura.
* Ideas.
* Minutas.

### Tareas siguientes

| ID | Tarea                                                   | Responsable        | Estado    |
| -- | ------------------------------------------------------- | ------------------ | --------- |
| 1  | Revisar que todos los documentos tengan contenido       | Enrique            | Pendiente |
| 2  | Abrir la carpeta completa como proyecto en OpenCode     | Enrique            | Pendiente |
| 3  | Pedir a OpenCode que audite la documentación            | Enrique            | Pendiente |
| 4  | Corregir contradicciones entre documentos               | Enrique y OpenCode | Pendiente |
| 5  | Definir el alcance exacto del MVP                       | Enrique            | Pendiente |
| 6  | Preparar la estructura inicial de Next.js               | OpenCode           | Pendiente |
| 7  | Construir primero una versión local con datos de prueba | OpenCode           | Pendiente |
| 8  | Validar el flujo con casos reales de Nogalera           | Enrique            | Pendiente |

### Riesgos o bloqueos

* Información incompleta sobre las reglas oficiales de Lista 3.
* Falta de autorización para integrar Intelisis.
* Categorías de productos aún no verificadas completamente con el catálogo oficial.
* Posibilidad de documentar demasiadas funciones antes de validar el MVP.
* Riesgo de construir una herramienta demasiado compleja para el uso diario.
* Falta de datos históricos estructurados durante la primera versión.

### Criterios iniciales de éxito

El MVP deberá permitir comprobar si:

* Registrar un prospecto toma menos de 30 segundos.
* Registrar un seguimiento toma menos de 15 segundos.
* El usuario sabe qué clientes atender durante el día.
* Disminuyen los seguimientos olvidados.
* Las cotizaciones reciben atención oportuna.
* El agente produce recomendaciones útiles.
* La aplicación se utiliza de forma constante.
* Se generan oportunidades, cotizaciones o ventas atribuibles al seguimiento.

### Próxima reunión

**Objetivo:** Revisar el alcance exacto de la primera versión y seleccionar únicamente las funciones indispensables para comenzar a programar.

### Archivos relacionados

* `README.md`
* `docs/00_PROJECT.md`
* `docs/02_BUSINESS_RULES.md`
* `docs/03_USER_FLOWS.md`
* `docs/05_AI_AGENT.md`
* `docs/06_DECISION_ENGINE.md`
* `docs/09_ROADMAP.md`
* `docs/10_TASKS.md`
* `knowledge/lista3.md`
* `memory/decision_log.md`
* `memory/future.md`
* `memory/ideas.md`

---

# Plantilla rápida para reuniones comerciales

Esta plantilla podrá utilizarse cuando la reunión se enfoque en resultados de Lista 3.

```md id="pmhtc3"
## MTG-COM-000 — Revisión comercial

**Fecha:**  
**Sucursal:** Nogalera  
**Periodo revisado:**  
**Participantes:**  

### Indicadores

- Presupuesto:
- Venta acumulada:
- Porcentaje de cumplimiento:
- Diferencia contra meta:
- Objetivo Lista 3:
- Venta Lista 3:
- Clientes nuevos:
- Prospectos activos:
- Cotizaciones pendientes:
- Seguimientos realizados:

### Qué funcionó

- 

### Problemas detectados

- 

### Oportunidades

- 

### Acciones acordadas

| Acción | Responsable | Fecha | Indicador esperado |
|---|---|---|---|

### Apoyo requerido

- 

### Próxima revisión

- 
```

---

# Plantilla rápida para revisión técnica

```md id="93xlek"
## MTG-TEC-000 — Revisión técnica

**Fecha:**  
**Versión revisada:**  
**Participantes:**  

### Funciones demostradas

- 

### Resultado de pruebas

- 

### Errores encontrados

| Error | Prioridad | Responsable | Estado |
|---|---|---|---|

### Cambios solicitados

- 

### Decisiones técnicas

- 

### Próxima versión

- 
```

---

# Cierre de cada minuta

Después de registrar una reunión se deberá verificar:

* ¿Surgió una decisión?
* ¿Debe actualizarse `decision_log.md`?
* ¿Surgió una tarea?
* ¿Debe actualizarse `docs/10_TASKS.md`?
* ¿Surgió una idea no aprobada?
* ¿Debe actualizarse `ideas.md`?
* ¿Cambió el alcance?
* ¿Debe actualizarse el roadmap?
* ¿Cambió una regla de negocio?
* ¿Debe actualizarse la documentación correspondiente?

---

# Principio final

Las reuniones generan conversación.

Las minutas convierten esa conversación en conocimiento.

Las decisiones convierten el conocimiento en dirección.

Las tareas convierten la dirección en resultados.

