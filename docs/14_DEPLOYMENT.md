# 14_DEPLOYMENT.md

# Deployment Guide

Proyecto: PG Lista 3 AI

Versión: 1.0

---

# Objetivo

Este documento define el flujo oficial para desarrollar, probar y desplegar PG Lista 3 AI.

Todo cambio deberá seguir este proceso.

El objetivo es mantener un proyecto estable, organizado y fácil de desplegar.

---

# Stack Tecnológico

Frontend

* Next.js
* React
* TypeScript
* TailwindCSS

Backend

* Next.js API Routes
* Server Actions

Base de Datos

* Supabase PostgreSQL

Autenticación

* Supabase Auth

Hosting

* Vercel

Repositorio

* GitHub

Desarrollo Asistido

* OpenCode
* Claude Code
* Cursor (opcional)

---

# Flujo General

Idea

↓

Documentación

↓

Desarrollo

↓

Pruebas

↓

Commit

↓

Push

↓

Deploy

↓

Validación

---

# Ambientes

## Desarrollo

Uso diario.

Características:

* Cambios rápidos.
* Datos de prueba.
* Variables locales.

---

## Producción

Uso real.

Características:

* Base de datos oficial.
* Usuarios reales.
* Variables seguras.

Nunca realizar pruebas directamente en producción.

---

# Variables de Entorno

Archivo local:

.env.local

Nunca subir este archivo al repositorio.

Variables mínimas:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
```

Las claves privadas nunca deberán exponerse al frontend.

---

# Git

Ramas recomendadas

main

Versión estable.

develop

Desarrollo activo.

feature/nombre

Nueva funcionalidad.

fix/nombre

Corrección de errores.

hotfix/nombre

Corrección urgente.

---

# Flujo Git

1. Crear rama.

2. Desarrollar.

3. Probar.

4. Commit.

5. Push.

6. Pull Request.

7. Revisión.

8. Merge.

---

# Convención de Commits

Utilizar Commits descriptivos.

Ejemplos:

feat: agregar módulo de clientes

fix: corregir búsqueda de prospectos

refactor: mejorar estructura del dashboard

docs: actualizar documentación

style: mejorar interfaz

test: agregar pruebas

chore: actualizar dependencias

---

# Pull Requests

Toda PR deberá incluir:

Objetivo.

Cambios realizados.

Capturas de pantalla (cuando aplique).

Riesgos conocidos.

Checklist completado.

---

# Checklist antes del Push

* El proyecto compila.
* No existen errores TypeScript.
* No existen errores ESLint.
* Variables protegidas.
* Sin archivos temporales.
* Documentación actualizada.
* Funcionalidad probada.

---

# PWA (Aplicación Web Progresiva)

## Requisitos para instalabilidad

* **HTTPS obligatorio**: `beforeinstallprompt` solo funciona en contextos seguros (HTTPS o localhost).
* **Manifest válido**: El build genera `/manifest.webmanifest` automáticamente.
* **Service Worker**: `public/sw.js` se sirve con headers adecuados (configurado en `next.config.ts`).
* **Offline page**: `public/offline.html` se cachea con cache-first en la instalación del SW.

## Verificación post-deploy

1. Abrir la app en Chrome/Edge.
2. DevTools > Application > Manifest: Validar que el manifest se carga sin errores.
3. DevTools > Application > Service Workers: Confirmar "activated and is running".
4. Hacer clic en "Instalar" o verificar que Chrome muestra el botón de instalación en la barra de direcciones.
5. Probar offline: DevTools > Network > Offline, recargar, debe mostrar la offline page.
6. Lighthouse > PWA audit: Debe pasar las verificaciones básicas de instalabilidad.

## Limitaciones conocidas

* `npm run build && npm run start` en local (HTTP) no dispara `beforeinstallprompt`.
* Los iconos SVG son provisionales (diseño "L3" sobre azul).
* El Service Worker solo se registra en producción (variable `NODE_ENV`).

---

# Deploy en Vercel

Proceso:

1. Push a GitHub.

2. Vercel detecta cambios.

3. Ejecuta Build.

4. Ejecuta Validaciones.

5. Publica nueva versión.

---

# Build

Antes del despliegue verificar:

* npm run build
* Sin errores.
* Sin advertencias críticas.
* Rutas válidas.

---

# Base de Datos

Antes de desplegar:

* Migraciones listas.
* Tablas verificadas.
* Políticas RLS correctas.
* Índices creados.
* Backup disponible.

---

# Supabase

Validar:

* Auth funcionando.
* Base de datos accesible.
* Variables correctas.
* Storage funcionando.
* Políticas activas.

---

# Errores

Si el Build falla:

No desplegar.

Corregir.

Volver a probar.

Repetir proceso.

Nunca ignorar errores de compilación.

---

# Rollback

Si una versión presenta errores críticos:

Revertir inmediatamente.

Restaurar la versión estable.

Documentar el incidente.

Analizar la causa.

---

# Monitoreo

Durante el MVP revisar:

* Errores de Vercel.
* Logs de Supabase.
* Consola del navegador.
* Errores de autenticación.

En el futuro integrar:

* Sentry.
* Analytics.
* Monitoreo de rendimiento.

---

# Dependencias

Actualizar periódicamente:

* Next.js
* React
* TypeScript
* TailwindCSS
* Supabase
* Librerías principales

Nunca actualizar varias dependencias críticas al mismo tiempo sin realizar pruebas.

---

# Backups

Antes de cambios importantes:

* Exportar base de datos.
* Confirmar restauración.
* Verificar migraciones.

---

# Flujo de OpenCode

Antes de generar código:

1. Leer toda la carpeta `docs/`.
2. Revisar `10_TASKS.md`.
3. Identificar la siguiente tarea pendiente.
4. Verificar dependencias.
5. Generar únicamente el código necesario.
6. Evitar duplicación.
7. Mantener la arquitectura existente.
8. Actualizar documentación si realiza cambios importantes.

---

# Flujo de Claude Code

Claude deberá:

* Revisar arquitectura.
* Detectar mejoras.
* Refactorizar cuando aporte valor.
* Explicar decisiones importantes.
* No romper funcionalidades existentes.

---

# Flujo de Cursor

Cursor deberá utilizarse principalmente para:

* Desarrollo rápido.
* Refactorización.
* Autocompletado.
* Navegación del proyecto.
* Corrección de errores menores.

---

# Checklist antes del Deploy

* Todas las tareas completadas.
* Código revisado.
* Documentación actualizada.
* Variables configuradas.
* Build exitoso.
* Base de datos validada.
* Sin errores críticos.
* UI revisada.

---

# Checklist después del Deploy

Verificar:

* Inicio de sesión.
* Dashboard.
* Clientes.
* Prospectos.
* Seguimientos.
* IA.
* Navegación.
* Base de datos.
* Rendimiento.

---

# Definition of Release

Una versión podrá considerarse estable cuando:

* Todas las funcionalidades planeadas estén terminadas.
* No existan errores críticos.
* El rendimiento sea adecuado.
* La documentación esté actualizada.
* El despliegue haya sido validado.

---

# Recuperación

Si ocurre un problema en producción:

1. Identificar el error.
2. Revisar logs.
3. Determinar el impacto.
4. Aplicar rollback si es necesario.
5. Corregir el problema.
6. Probar la solución.
7. Publicar una nueva versión.
8. Documentar el incidente.

---

# Regla Suprema

Nunca desplegar una funcionalidad que no haya sido probada.

La estabilidad del proyecto siempre tendrá prioridad sobre la velocidad de desarrollo.

---

# Visión Final

El proceso de despliegue deberá ser simple, repetible y seguro.

Cualquier desarrollador o IA deberá poder comprender el flujo completo leyendo este documento, desde la configuración inicial hasta la publicación en producción.

El objetivo es mantener un ciclo de desarrollo profesional que permita iterar rápidamente sin comprometer la calidad ni la estabilidad del proyecto.

