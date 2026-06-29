# PG Lista 3 AI

## Descripción

PG Lista 3 AI es una aplicación de escritorio diseñada para ayudar a los asesores comerciales de Plomería García a administrar, dar seguimiento y aumentar las ventas de clientes **Lista 3** (clientes de mayoreo).

El objetivo principal no es únicamente almacenar información de clientes, sino convertirse en un asistente inteligente que ayude a generar más ventas mediante seguimiento, análisis de oportunidades y recomendaciones comerciales.

---

# Objetivo del proyecto

Crear la mejor herramienta posible para incrementar las ventas de clientes Lista 3 dentro de Plomería García.

La aplicación deberá ayudar al vendedor a:

* Registrar prospectos.
* Administrar clientes.
* Dar seguimiento automáticamente.
* Recordar llamadas.
* Recordar cotizaciones.
* Detectar clientes inactivos.
* Analizar compras.
* Recomendar productos.
* Incrementar la frecuencia de compra.
* Aumentar el ticket promedio.

El sistema deberá actuar como un vendedor experto disponible las 24 horas.

---

# ¿Qué es Lista 3?

Lista 3 es la clasificación utilizada por Plomería García para clientes de mayoreo.

Normalmente pertenecen a alguno de estos perfiles:

* Constructoras
* Contratistas
* Empresas de mantenimiento
* Arquitectos
* Ingenieros
* Instaladores
* Comercios
* Empresas industriales
* Clientes con compras frecuentes

Estos clientes reciben atención personalizada y normalmente realizan compras de mayor volumen.

---

# Filosofía del proyecto

Este proyecto no busca desarrollar únicamente un CRM.

El objetivo es crear un sistema inteligente que ayude a vender más.

Cada función que se agregue deberá responder una pregunta:

> ¿Esto ayuda a vender más?

Si la respuesta es no, probablemente esa función no sea prioritaria.

---

# Inteligencia Artificial

La IA será una parte central del sistema.

Debe ayudar a:

* Encontrar oportunidades.
* Detectar clientes inactivos.
* Recomendar seguimientos.
* Generar mensajes.
* Crear correos.
* Analizar ventas.
* Identificar patrones.
* Recomendar productos relacionados.
* Recordar tareas pendientes.
* Priorizar clientes importantes.

La IA nunca reemplaza al vendedor.

La IA ayuda al vendedor a tomar mejores decisiones.

---

# Tecnologías previstas

* Next.js
* React
* TypeScript
* TailwindCSS
* Supabase
* PostgreSQL
* OpenAI
* Claude
* OpenCode
* Vercel

Estas tecnologías pueden cambiar conforme evolucione el proyecto.

---

# Estado actual

**v0.3.0 — Aplicación Progresiva (PWA)**

La aplicación es ahora una PWA instalable con:
- Servicio Worker con estrategia cache-first (assets) y network-first (navegación)
- Página offline con marca y botón de reintento
- Botón de instalación mediante `beforeinstallprompt`
- Manifest dinámico con iconos SVG provisionales ("L3" sobre azul)
- Indicador de modo demo en topbar con panel informativo
- Metadata completa para Apple (apple-mobile-web-app-capable)

Sesión simulada como "Vendedor Nogalera". Persistencia mediante localStorage. Sin Supabase ni autenticación real.

Siguiente paso: Despliegue en Vercel para probar la instalabilidad PWA en HTTPS.

---

# Organización del proyecto

docs/

Contiene toda la documentación funcional del proyecto.

knowledge/

Contiene el conocimiento del negocio que utilizará la IA.

memory/

Contiene decisiones tomadas durante el desarrollo, ideas futuras y memoria del proyecto.

examples/

Ejemplos reales de documentos, cotizaciones, tickets, imágenes y conversaciones.

templates/

Plantillas reutilizables.

playbooks/

Procedimientos internos y estrategias comerciales.

---

# Regla principal para cualquier IA

Antes de generar código:

1. Leer README.md.
2. Leer toda la carpeta docs.
3. Leer toda la carpeta knowledge.
4. Respetar las reglas del negocio.
5. Nunca asumir información.
6. Mantener una arquitectura limpia.
7. Priorizar escalabilidad.
8. Evitar código duplicado.
9. Documentar decisiones importantes.
10. Pensar siempre como un desarrollador senior.

---

# Objetivo a largo plazo

Construir el asistente comercial más inteligente para Plomería García.

El sistema deberá ser capaz de:

* Administrar clientes.
* Aprender de las ventas.
* Aprender del comportamiento de los clientes.
* Recomendar acciones.
* Automatizar seguimientos.
* Integrarse con Intelisis.
* Integrarse con WhatsApp.
* Integrarse con correo electrónico.
* Integrarse con la página web.
* Analizar indicadores.
* Ayudar a incrementar las ventas de toda la empresa.

---

# Principio del proyecto

No estamos desarrollando una aplicación.

Estamos construyendo un vendedor digital que ayudará a los vendedores humanos a vender más.

