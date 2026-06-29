# 10_TASKS.md

# Lista Oficial de Tareas

Proyecto: PG Lista 3 AI

Versión: 1.0

---

# Objetivo

Este documento contiene todas las tareas pendientes del proyecto.

Las tareas deberán ejecutarse en el orden de prioridad definido.

Ninguna tarea deberá marcarse como completada sin cumplir sus criterios de aceptación.

---

# Estados permitidos

* Backlog
* Pendiente
* En desarrollo
* En revisión
* En pruebas
* Completado
* Cancelado

---

# Prioridades

P0 — Crítica

Sin esta tarea el proyecto no puede avanzar.

P1 — Alta

Genera mucho valor al usuario.

P2 — Media

Mejora la experiencia.

P3 — Baja

Puede desarrollarse posteriormente.

---

# FASE 1 — Fundación del proyecto

## TASK-001

Estado:
Completado

Prioridad:
P0

Título:
Configurar proyecto Next.js

Criterios:

* Next.js 16.2.9
* TypeScript strict
* Tailwind CSS v4.3.2 (postcss via @tailwindcss/postcss)
* ESLint
* Prettier
* Estructura inicial (app/, components/, lib/, hooks/)
* `npm run build` passes
* Known: ESLint has es-iterator-helpers issue on Node v24

---

## TASK-002

Estado:
Cancelado

Prioridad:
P0

Título:
Configurar Supabase

Motivo:
Se decidió usar localStorage para el MVP. Supabase se integrará después de validar el uso real.

---

## TASK-003

Estado:
Cancelado

Prioridad:
P0

Título:
Autenticación

Motivo:
No hay Supabase ni credenciales. Sesión simulada como "Vendedor Nogalera". Se implementará después del MVP.

---

## TASK-004

Estado:
Completado

Prioridad:
P0

Título:
Crear estructura del proyecto

Criterios:

* app/ (11 rutas: page, prospects, prospects/[id], prospects/new, clients, clients/[id], followups, quotes, quotes/new, agenda, layout)
* components/ (ui/, forms/, layout/, features/)
* lib/ (store, types, recommendations, utils)
* hooks/
* docs/
* memory/
* knowledge/

---

# FASE 2 — Dashboard

## TASK-005

Estado:
Completado

Prioridad:
P1

Título:
Dashboard Principal

Criterios:

* 8 tarjetas de indicadores calculados desde datos reales (prospectos, clientes, seguimientos, cotizaciones)
* Top 5 recomendaciones con prioridad/confianza y evidencia
* Botón "Ver detalle" navega a la entidad correspondiente
* Actividad reciente de todos los tipos de entidad
- Recálculo automático al recibir foco (window focus)
* Sin valores fijos

---

## TASK-006

Estado:
Completado

Prioridad:
P1

Título:
Sidebar de navegación

Criterios:

* Enlaces a: Dashboard, Prospectos, Clientes, Seguimientos, Cotizaciones, Agenda
* Indicador visual de ruta activa
* Diseño desktop

---

## TASK-007

Estado:
Completado

Prioridad:
P1

Título:
Topbar

Criterios:

* Buscador funcional
* Indicador de usuario/vendedor
* Navegación rápida

---

# FASE 3 — Clientes

## TASK-008

Estado:
Completado

Prioridad:
P0

Título:
CRUD Clientes

Criterios:

* Lista con búsqueda y filtros
* Crear nuevo cliente
* Editar cliente
* Cambiar estado (Activo/Inactivo)
* Persistencia en localStorage
* Todos los componentes envueltos en Suspense (useSearchParams)

---

## TASK-009

Estado:
Completado

Prioridad:
P1

Título:
Ficha completa del cliente

Criterios:

* Datos del cliente
* Seguimientos del cliente
* Cotizaciones del cliente
* Recomendaciones específicas del cliente
* Contador de recomendaciones en sidebar

---

## TASK-010

Estado:
Completado

Prioridad:
P2

Título:
Historial del cliente

Criterios:

* Línea de tiempo de interacciones
* Seguimientos agrupados

---

## TASK-011

Estado:
Completado

Prioridad:
P2

Título:
Notas del cliente

Criterios:

* Campo de notas en el formulario de edición

---

## TASK-012

Estado:
Pendiente

Prioridad:
P3

Título:
Archivos del cliente

---

# FASE 4 — Prospectos

## TASK-013

Estado:
Completado

Prioridad:
P0

Título:
CRUD Prospectos

Criterios:

* Lista con búsqueda y filtros
* Crear nuevo prospecto
* Editar prospecto
* Cambiar estado (8 estados)
* Persistencia en localStorage
* Suspense boundaries

---

## TASK-014

Estado:
Completado

Prioridad:
P1

Título:
Conversión Prospecto → Cliente

Criterios:

* Botón "Convertir en cliente" en ficha de prospecto
* Oculto si el prospecto ya está convertido (estado Ganado)
* Store.previene conversión duplicada
* Recarga recomendaciones después de conversión

---

## TASK-015

Estado:
Completado

Prioridad:
P2

Título:
Prioridad automática

Criterios:

* El motor de recomendaciones asigna prioridad según reglas de negocio

---

# FASE 5 — Seguimientos

## TASK-016

Estado:
Completado

Prioridad:
P0

Título:
Registro de seguimiento

Criterios:

* Crear seguimiento vinculado a prospecto o cliente
* Campos: tipo, resultado, próxima acción, fecha
* Persistencia en localStorage

---

## TASK-017

Estado:
Completado

Prioridad:
P1

Título:
Agenda de seguimientos

Criterios:

* Lista de seguimientos con filtros
* Estados: pendiente, completado, vencido
* Suspense boundary

---

## TASK-018

Estado:
Pendiente

Prioridad:
P2

Título:
Recordatorios

---

# FASE 6 — Cotizaciones

## TASK-019

Estado:
Completado

Prioridad:
P0

Título:
Registrar cotización

Criterios:

* Crear cotización (monto, estado, notas, próxima acción)
* Asociada a prospecto o cliente
* Persistencia en localStorage
* Suspense boundary

---

## TASK-020

Estado:
Completado

Prioridad:
P1

Título:
Lista de cotizaciones

Criterios:

* Lista con búsqueda y filtros
* Cambiar estado (no destructivo)
* Badge "Requiere seguimiento" cuando aplica

---

## TASK-021

Estado:
Completado

Prioridad:
P1

Título:
Cancelación (soft delete) de cotizaciones

Criterios:

* Botón Cancelar → modal de confirmación → cambia estado a "Cancelada"
* No hay eliminación física
* Store.delete reemplazado por update con status Cancelada

---

# FASE 7 — Inteligencia Artificial

## TASK-022

Estado:
Completado

Prioridad:
P1

Título:
Panel de recomendaciones

Criterios:

* Integrado en Dashboard (top 5), ficha de prospecto, ficha de cliente
* Explicaciones con evidencia, prioridad y confianza

---

## TASK-023

Estado:
Pendiente

Prioridad:
P2

Título:
Resumen diario

---

## TASK-024

Estado:
Completado

Prioridad:
P0

Título:
Motor de recomendaciones

Criterios:

* 20+ reglas deterministas (sin ML ni APIs externas)
* Cobertura: prospectos, clientes, cotizaciones, seguimientos, tareas
* Output: 30 recomendaciones máximo, ordenadas por prioridad
* Incluye: acción, razón, prioridad, confianza, datos usados, evidencia, título
* Motor read-only: no modifica registros

---

## TASK-025

Estado:
Completado

Prioridad:
P1

Título:
Ordenamiento por prioridad

Criterios:

* Crítica > Alta > Media > Baja
* Dentro de cada nivel, orden consistente

---

## TASK-026

Estado:
Completado

Prioridad:
P1

Título:
Clientes en riesgo

Criterios:

* Clientes inactivos recomendados como "alta prioridad"
* Clientes sin contacto reciente detectados
* Seguimientos vencidos marcados

---

## TASK-027

Estado:
Completado

Prioridad:
P1

Título:
Clientes con oportunidad

Criterios:

* Clientes activos sin próxima acción detectados
* Cotizaciones pendientes sin seguimiento
* Prospectos con interés pero sin actividad reciente

---

## TASK-028

Estado:
Pendiente

Prioridad:
P3

Título:
Productos sugeridos

Motivo:
Requiere catálogo de productos, no disponible en MVP.

---

# FASE 8 — Reportes

## TASK-029

Estado:
Pendiente

Prioridad:
P2

Título:
Reporte de clientes

---

## TASK-030

Estado:
Pendiente

Prioridad:
P2

Título:
Reporte de ventas

---

## TASK-031

Estado:
Pendiente

Prioridad:
P2

Título:
Reporte Lista 3

---

## TASK-032

Estado:
Pendiente

Prioridad:
P2

Título:
Reporte de seguimientos

---

# FASE 9 — Integraciones

## TASK-033

Estado:
Pendiente

Prioridad:
P3

Título:
Importar Excel

---

## TASK-034

Estado:
Pendiente

Prioridad:
P3

Título:
Intelisis

---

## TASK-035

Estado:
Pendiente

Prioridad:
P3

Título:
WhatsApp

---

## TASK-036

Estado:
Pendiente

Prioridad:
P3

Título:
Correo

---

# FASE 10 — PWA (Aplicación Web Progresiva)

## TASK-037

Estado:
Completado

Prioridad:
P1

Título:
Web App Manifest

Criterios:

* Archivo `src/app/manifest.ts` usando MetadataRoute.Manifest
* name, short_name, description, start_url, scope, display standalone
* SVG icons con purpose any + maskable
* theme_color, background_color, orientation, lang es-MX

---

## TASK-038

Estado:
Completado

Prioridad:
P1

Título:
Service Worker

Criterios:

* `public/sw.js` con cache-first para assets estáticos
* network-first para navegación con fallback offline
* network-only para datos dinámicos y cross-origin
* Limpieza de cachés viejas en activate
* Versión de caché: pglista3-v1

---

## TASK-039

Estado:
Completado

Prioridad:
P1

Título:
Offline page

Criterios:

* `public/offline.html` con marca L3
* Mensaje informativo
* Botón de reintento

---

## TASK-040

Estado:
Completado

Prioridad:
P1

Título:
Instalación (beforeinstallprompt)

Criterios:

* `src/components/pwa/install-app-button.tsx`
* Captura beforeinstallprompt
* Se oculta si ya instalado o no soportado
* standalone detection (display-mode + navigator.standalone)

---

## TASK-041

Estado:
Completado

Prioridad:
P1

Título:
Registro de Service Worker

Criterios:

* `src/components/pwa/service-worker-register.tsx`
* Solo se registra en producción
* Detecta nuevas versiones (updatefound)
* SKIP_WAITING message protocol para recargar

---

## TASK-042

Estado:
Completado

Prioridad:
P1

Título:
Iconos provisionales

Criterios:

* 4 iconos SVG en `public/icons/`
* 192px, 512px, 512-maskable, apple-touch-icon
* "L3" sobre fondo azul `#2563eb`

---

## TASK-043

Estado:
Completado

Prioridad:
P1

Título:
Metadata PWA en layout

Criterios:

* manifest link en metadata
* apple-web-app-capable, apple-touch-icon
* Viewport export con themeColor

---

## TASK-044

Estado:
Completado

Prioridad:
P2

Título:
Demo mode indicator

Criterios:

* Badge ámbar "Demo" en topbar
* Panel informativo expandible al hacer clic
* Texto informativo en sidebar

---

## TASK-045

Estado:
Completado

Prioridad:
P1

Título:
SW headers en next.config

Criterios:

* Content-Type: application/javascript
* Cache-Control: no-cache
* CSP: 'self'

---

# FASE 11 — Optimización

## TASK-046

Estado:
Pendiente

Prioridad:
P3

Título:
Dark Mode

---

## TASK-047

Estado:
Pendiente

Prioridad:
P3

Título:
Responsive

---

## TASK-048

Estado:
Pendiente

Prioridad:
P3

Título:
Optimización de rendimiento

---

## TASK-049

Estado:
Pendiente

Prioridad:
P3

Título:
Accesibilidad

---

# Tareas técnicas

* Configurar Husky.
* Configurar lint-staged.
* Configurar CI/CD.
* Configurar GitHub Actions.
* Configurar Vercel.
* Configurar variables de entorno.
* Configurar monitoreo.
* Configurar logs.

---

# Calidad

Antes de cerrar una tarea deberá verificarse:

* Compila correctamente.
* No existen errores TypeScript.
* Sin errores ESLint.
* Responsive.
* Accesible.
* Código reutilizable.
* Documentación actualizada.

---

# Definition of Done

Una tarea solamente podrá marcarse como completada cuando:

* Cumpla todos los requisitos.
* Pase pruebas.
* Mantenga la arquitectura.
* No genere deuda técnica.
* Esté documentada.
* Sea aprobada.

---

# Regla para cualquier IA

Antes de comenzar una nueva tarea:

1. Leer toda la documentación.
2. Revisar tareas completadas.
3. Revisar dependencias.
4. Confirmar que la tarea anterior está terminada.
5. Mantener consistencia con el resto del proyecto.

Nunca comenzar una tarea aislada sin entender el contexto.

---

# Visión

Este archivo será el backlog oficial del proyecto.

Todas las nuevas funcionalidades deberán registrarse aquí antes de implementarse.

La documentación siempre tendrá prioridad sobre el código improvisado.
