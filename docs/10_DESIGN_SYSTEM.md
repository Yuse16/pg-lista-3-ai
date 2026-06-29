# 10_DESIGN_SYSTEM.md

# Design System

Proyecto: PG Lista 3 AI

Versión: 1.0

---

# Objetivo

Este documento define todas las reglas visuales del proyecto.

Ningún componente deberá diseñarse sin seguir este documento.

El objetivo es mantener una experiencia consistente, moderna y profesional.

---

# Filosofía

La interfaz deberá transmitir:

* Profesionalismo
* Simplicidad
* Rapidez
* Claridad
* Tecnología
* Confianza

Cada componente deberá existir para ayudar al usuario a trabajar mejor.

Nunca para decorar.

---

# Principios

Todo componente debe ser:

* Reutilizable
* Accesible
* Responsive
* Ligero
* Escalable
* Fácil de mantener

---

# Inspiración

Tomar inspiración visual de:

* Linear
* Notion
* Vercel Dashboard
* Stripe
* GitHub
* Supabase Studio
* Arc Browser

Nunca copiar diseños.

Inspirarse únicamente.

---

# Grid

Utilizar un sistema de 8px.

Todos los espacios deberán ser múltiplos de:

4

8

12

16

24

32

40

48

64

96

128

Nunca utilizar medidas aleatorias.

---

# Breakpoints

Mobile

0 px

Tablet

768 px

Laptop

1024 px

Desktop

1280 px

Wide

1536 px

---

# Border Radius

XS

4px

SM

6px

MD

8px

LG

12px

XL

16px

2XL

24px

Nunca utilizar radios diferentes.

---

# Sombras

Solo tres niveles.

Shadow Small

Inputs

Cards pequeñas

Shadow Medium

Cards

Dropdowns

Shadow Large

Modales

Nunca exagerar sombras.

---

# Paleta

## Primario

Azul

Uso:

Botones principales.

Links.

Indicadores.

---

## Secundario

Gris

Uso:

Fondos.

Separadores.

Paneles.

---

## Éxito

Verde

---

## Advertencia

Amarillo

---

## Error

Rojo

---

## Información

Azul claro

---

# Fondo

Modo claro

Blanco

Gris muy claro

Modo oscuro

Gris oscuro

Negro suave

Nunca utilizar negro puro.

---

# Tipografía

Fuente principal

Inter

Alternativa

Geist

Sistema Apple

SF Pro

---

# Escala tipográfica

Display

48px

H1

36px

H2

30px

H3

24px

H4

20px

H5

18px

Body

16px

Small

14px

Caption

12px

Nunca utilizar tamaños arbitrarios.

---

# Peso de fuente

Regular

400

Medium

500

Semibold

600

Bold

700

---

# Iconos

Utilizar exclusivamente:

Lucide Icons

Nunca mezclar librerías.

---

# Botones

Tipos:

Primary

Secondary

Outline

Ghost

Danger

Link

---

# Estados

Default

Hover

Focus

Active

Disabled

Loading

Success

Error

Todos los botones deberán soportar estos estados.

---

# Inputs

Todos deberán incluir:

Label

Placeholder

Helper Text

Mensaje de error

Estado deshabilitado

Estado cargando

---

# Cards

Todas deberán compartir:

Padding consistente

Título

Contenido

Acciones

Opcionalmente:

Footer

---

# Tablas

Todas deberán permitir:

Buscar

Ordenar

Filtrar

Paginación

Seleccionar filas

Exportar

Responsive

---

# Formularios

Máximo:

Dos columnas.

Preferentemente:

Una columna.

Agrupar campos relacionados.

Validación en tiempo real.

---

# Sidebar

Siempre visible en escritorio.

Colapsable.

Íconos.

Texto.

Indicador de pantalla activa.

---

# Topbar

Buscador global.

Notificaciones.

Perfil.

Acciones rápidas.

---

# Dashboard

Debe mostrar:

Indicadores.

Clientes prioritarios.

Seguimientos.

Ventas.

IA.

Alertas.

Actividad reciente.

---

# Espaciado

Todos los componentes deberán utilizar el sistema de 8px.

Nunca colocar elementos "a ojo".

---

# Colores de estados

Verde

Éxito.

Rojo

Urgente.

Amarillo

Pendiente.

Azul

Información.

Gris

Inactivo.

---

# Animaciones

Duración:

150 ms

200 ms

250 ms

Utilizar únicamente:

Fade

Scale

Slide

Hover

Nunca utilizar animaciones largas.

---

# Loading

Skeletons.

Progress bars.

Spinners.

Nunca dejar pantallas vacías.

---

# Empty States

Cada pantalla deberá tener un estado vacío.

Debe explicar:

Qué sucede.

Qué puede hacer el usuario.

Botón principal.

---

# Modales

Utilizar únicamente cuando sea necesario.

No abusar de ellos.

Toda acción destructiva deberá requerir confirmación.

---

# Toasts

Tipos:

Success

Warning

Info

Error

Duración máxima:

5 segundos.

---

# Accesibilidad

Contraste AA.

Navegación por teclado.

Focus visible.

Labels.

ARIA.

No depender únicamente del color.

---

# Responsive

Prioridad:

1. Desktop

2. Tablet

3. Mobile

---

# Rendimiento

Cada pantalla deberá cargar lo estrictamente necesario.

Utilizar:

Lazy Loading

Code Splitting

Memoización cuando aplique

Virtualización para listas grandes

---

# Componentes Base

Button

Input

Textarea

Select

Checkbox

Switch

Badge

Avatar

Card

Table

Modal

Dropdown

Tooltip

Popover

Tabs

Accordion

Breadcrumb

Pagination

Skeleton

Toast

Spinner

Command Palette

Todos deberán construirse una sola vez y reutilizarse.

---

# Convenciones

Nunca copiar componentes.

Nunca duplicar estilos.

Nunca crear variantes innecesarias.

Todo deberá construirse sobre componentes base.

---

# Regla Suprema

Antes de crear cualquier pantalla o componente, responder:

¿Este componente ya existe?

Si existe:

Reutilizar.

Si no existe:

Crear un componente reutilizable.

Nunca desarrollar componentes específicos para una sola pantalla.

---

# Objetivo Final

PG Lista 3 AI deberá sentirse como un software SaaS premium.

Cada interacción deberá transmitir rapidez, orden y confianza.

El usuario nunca deberá sentir que está utilizando una aplicación improvisada.

La experiencia deberá ser comparable con productos de clase mundial, manteniendo una identidad propia adaptada al trabajo comercial de Plomería García.

