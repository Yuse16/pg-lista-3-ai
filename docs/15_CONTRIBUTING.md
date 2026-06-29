# 15_CONTRIBUTING.md

# Contributing Guide

Proyecto: PG Lista 3 AI

Versión: 1.0

---

# Bienvenido

Gracias por contribuir al proyecto PG Lista 3 AI.

Este documento define las reglas oficiales para cualquier persona o Inteligencia Artificial que participe en el desarrollo del proyecto.

El objetivo es mantener un código limpio, consistente y fácil de mantener.

---

# Filosofía del Proyecto

Antes de escribir una sola línea de código deberás entender que este proyecto no consiste únicamente en desarrollar una aplicación.

El objetivo es construir una plataforma inteligente que ayude a los asesores comerciales de Plomería García a vender más mediante organización, seguimiento e Inteligencia Artificial.

Cada decisión deberá aportar valor al usuario final.

---

# Antes de comenzar

Siempre deberás leer la carpeta `docs/` completa.

Especialmente:

* README.md
* 00_PROJECT.md
* 01_PRODUCT_VISION.md
* 02_BUSINESS_RULES.md
* 03_USER_FLOWS.md
* 04_DATABASE.md
* 05_AI_AGENT.md
* 06_DECISION_ENGINE.md
* 07_UI_UX.md
* 08_PROMPTS.md
* 09_ROADMAP.md
* 10_TASKS.md
* 10_DESIGN_SYSTEM.md
* 11_API.md
* 12_SECURITY.md
* 13_TESTING.md
* 14_DEPLOYMENT.md

Nunca comenzar una tarea sin comprender el contexto del proyecto.

---

# Forma de trabajar

Todo desarrollo deberá seguir el siguiente flujo:

1. Leer la documentación.
2. Revisar las tareas pendientes.
3. Identificar dependencias.
4. Diseñar la solución.
5. Implementar.
6. Probar.
7. Documentar.
8. Realizar commit.

---

# Principios de Desarrollo

Todo código deberá ser:

* Claro.
* Modular.
* Escalable.
* Reutilizable.
* Tipado.
* Documentado cuando sea necesario.

Evitar soluciones rápidas que generen deuda técnica.

---

# Componentes

Antes de crear un componente nuevo verificar si ya existe uno similar.

Si existe, reutilizarlo.

Si no existe, construirlo de forma genérica para que pueda utilizarse en otras pantallas.

Nunca crear componentes exclusivos para una única vista salvo que sea estrictamente necesario.

---

# Estilo de Código

Utilizar:

* TypeScript estricto.
* Funciones pequeñas.
* Nombres descriptivos.
* Componentes desacoplados.
* Imports ordenados.
* Sin código muerto.

---

# Documentación

Cada cambio importante deberá reflejarse en la documentación correspondiente.

La documentación siempre tendrá la misma prioridad que el código.

---

# Git

Commits claros.

Ejemplos:

feat: agregar CRUD de clientes

fix: corregir búsqueda

docs: actualizar roadmap

refactor: optimizar dashboard

---

# Pull Requests

Toda Pull Request deberá incluir:

Objetivo.

Descripción de cambios.

Impacto esperado.

Capturas de pantalla cuando aplique.

Checklist de validación.

---

# Revisión de Código

Antes de aprobar cualquier cambio verificar:

* Arquitectura.
* Legibilidad.
* Seguridad.
* Rendimiento.
* Reutilización.
* Consistencia visual.

---

# Calidad

No aceptar código que:

Duplique lógica.

Rompa componentes existentes.

Genere advertencias innecesarias.

No siga la documentación.

---

# Errores

Cuando se detecte un error:

1. Reproducir.
2. Encontrar la causa raíz.
3. Corregir.
4. Probar nuevamente.
5. Documentar si aplica.

Nunca corregir únicamente el síntoma.

---

# Inteligencia Artificial

Las IA que colaboren en el proyecto deberán:

Leer la documentación antes de generar código.

Mantener la arquitectura.

No eliminar funcionalidades existentes.

Explicar decisiones importantes.

Proponer mejoras justificadas.

No inventar reglas de negocio.

---

# Regla para OpenCode

Antes de realizar cualquier cambio:

* Leer la carpeta `docs/`.
* Revisar `10_TASKS.md`.
* Identificar la siguiente tarea.
* Revisar dependencias.
* Generar únicamente el código necesario.
* Mantener la arquitectura.
* Actualizar documentación cuando corresponda.

---

# Regla para Claude Code

Claude deberá actuar como:

Arquitecto.

Revisor técnico.

Optimizador.

Nunca como un generador de código sin contexto.

---

# Regla para Cursor

Cursor deberá utilizarse para:

* Desarrollo.
* Refactorización.
* Navegación.
* Corrección de errores.
* Productividad.

---

# Definition of Done

Una tarea estará terminada únicamente cuando:

* Funcione correctamente.
* Compile sin errores.
* Pase las validaciones.
* Mantenga la arquitectura.
* Esté documentada.
* Cumpla los criterios definidos en `10_TASKS.md`.

---

# Comunicación

Cuando exista una mejor solución técnica:

No implementarla directamente.

Primero explicar:

* Qué problema resuelve.
* Beneficios.
* Riesgos.
* Impacto.

Después solicitar aprobación cuando el cambio afecte la arquitectura o las reglas de negocio.

---

# Principios de Diseño

Toda pantalla deberá responder:

¿Qué acción principal realizará el usuario?

¿Qué información necesita realmente?

¿Cómo reducir el número de clics?

¿Cómo mejorar la productividad?

---

# Filosofía Comercial

Cada funcionalidad deberá ayudar a:

* Conseguir nuevos clientes.
* Recuperar clientes.
* Dar mejor seguimiento.
* Organizar el trabajo.
* Incrementar las ventas.

Si una funcionalidad no aporta alguno de estos objetivos, deberá reevaluarse.

---

# Respeto por la Arquitectura

Nunca modificar:

* API.
* Base de datos.
* Seguridad.
* Sistema de IA.
* Design System.

Sin revisar previamente la documentación correspondiente.

---

# Visión del Proyecto

PG Lista 3 AI deberá evolucionar como una plataforma SaaS moderna, escalable y centrada en el usuario.

La calidad del producto dependerá de mantener consistencia en el desarrollo, respeto por la arquitectura y documentación actualizada.

---

# Regla Suprema

Antes de escribir cualquier línea de código pregúntate:

**¿Este cambio hace que la aplicación sea más útil para el asesor comercial, mantiene la calidad del proyecto y respeta la documentación existente?**

Si la respuesta es no, la implementación deberá replantearse.

