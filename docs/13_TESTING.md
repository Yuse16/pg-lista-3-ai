# 13_TESTING.md

# Testing Strategy

Proyecto: PG Lista 3 AI

Versión: 1.0

---

# Objetivo

Este documento define cómo deberá verificarse el correcto funcionamiento del proyecto.

Todo desarrollo deberá probarse antes de considerarse terminado.

El objetivo no es tener el mayor número de pruebas, sino asegurar que las funcionalidades principales funcionen correctamente.

---

# Filosofía

Cada nueva funcionalidad deberá ser:

* Construida.
* Probada.
* Revisada.
* Documentada.

Nunca marcar una tarea como completada sin verificar su funcionamiento.

---

# Tipos de pruebas

Durante el MVP se utilizarán principalmente:

* Pruebas manuales.
* Validaciones funcionales.
* Revisión visual.

En futuras versiones podrán agregarse pruebas automatizadas.

---

# Flujo de pruebas

Cada nueva funcionalidad deberá seguir este flujo:

1. Desarrollar.
2. Verificar que compile.
3. Revisar la interfaz.
4. Validar el flujo completo.
5. Corregir errores.
6. Documentar cambios.

---

# Validaciones generales

Antes de aceptar cualquier cambio verificar:

* El proyecto inicia correctamente.
* No existen errores de compilación.
* No existen errores de TypeScript.
* No existen errores de ESLint.
* No existen imports sin usar.
* No existen componentes rotos.

---

# Dashboard

Verificar:

* Carga correctamente.
* Muestra indicadores.
* No existen espacios vacíos inesperados.
* La navegación funciona.
* La interfaz responde rápidamente.

---

# Clientes

Verificar:

* Crear cliente.
* Editar cliente.
* Consultar cliente.
* Buscar cliente.
* Eliminar (Soft Delete).
* Restaurar cuando aplique.

---

# Prospectos

Verificar:

* Crear prospecto.
* Editar.
* Buscar.
* Cambiar estado.
* Convertir a cliente.

---

# Seguimientos

Verificar:

* Registrar seguimiento.
* Editar seguimiento.
* Mostrar historial.
* Mostrar fecha siguiente.
* Recordatorios.

---

# IA

Verificar:

* Recibe contexto.
* Genera recomendaciones.
* No inventa información.
* Explica el motivo de sus sugerencias.
* No modifica datos automáticamente.

---

# Formularios

Todos los formularios deberán validar:

* Campos obligatorios.
* Formatos.
* Longitudes.
* Mensajes de error claros.
* Estados de carga.

---

# Navegación

Verificar:

* Sidebar.
* Dashboard.
* Clientes.
* Prospectos.
* Reportes.
* Configuración.

Todas las rutas deberán funcionar.

---

# Responsive

Verificar:

Desktop

Laptop

Tablet

No es obligatorio optimizar para móvil en el MVP.

---

# Rendimiento

Objetivos:

Cambio entre pantallas:

Menos de 300 ms.

Carga inicial:

Menos de 3 segundos.

Consultas normales:

Menos de 1 segundo.

---

# Accesibilidad

Comprobar:

* Navegación con teclado.
* Focus visible.
* Contraste adecuado.
* Labels en formularios.

---

# Seguridad

Verificar:

* Usuario no autenticado no puede acceder a rutas privadas.
* Roles respetan permisos.
* No se muestran datos restringidos.

---

# Errores

Probar:

* Sin conexión.
* Datos inválidos.
* Errores del servidor.
* Formularios incompletos.

La aplicación deberá informar el problema sin bloquearse.

---

# Checklist antes de finalizar una tarea

* Compila correctamente.
* Sin errores TypeScript.
* Sin errores ESLint.
* Funciona según lo esperado.
* Diseño consistente.
* Código limpio.
* Documentación actualizada.

---

# Corrección de errores

Cuando se detecte un error:

1. Reproducirlo.
2. Identificar la causa.
3. Corregir.
4. Probar nuevamente.
5. Confirmar que no afectó otras funcionalidades.

---

# Definition of Done

Una funcionalidad se considera terminada cuando:

* Cumple el objetivo.
* Funciona correctamente.
* No rompe funcionalidades existentes.
* Está documentada.
* Fue revisada.

---

# PWA (Aplicación Web Progresiva)

Verificar:

* **Manifest**: Navegar a `/manifest.webmanifest`, validar JSON con name, short_name, icons, display, theme_color.
* **Service Worker**: En DevTools > Application > Service Workers, confirmar registro y estado "activated".
* **Cache**: En DevTools > Application > Cache Storage, verificar `pglista3-v1` con iconos y offline page cacheados.
* **Offline**: En DevTools > Network > Offline, recargar y verificar que se muestra `/offline.html`.
* **Instalación**: En navegador compatible (Chrome/Edge), verificar que aparece el botón "Instalar" y el evento beforeinstallprompt se dispara.
* **Standalone**: Una vez instalada, abrir la app standalone y verificar que el botón "Instalar" desaparece.
* **Actualización**: Modificar el SW, recargar, verificar que se detecta nueva versión y se muestra el prompt de actualización.
* **Demo mode**: Verificar badge ámbar "Demo" en topbar y que el panel informativo se muestra al hacer clic.
* **Meta tags Apple**: En el HTML, verificar `apple-mobile-web-app-capable`, `apple-touch-icon`, `apple-mobile-web-app-title`.

---

# Futuro

En versiones posteriores podrán incorporarse:

* Unit Testing (Vitest).
* Component Testing.
* Integration Testing.
* End-to-End Testing (Playwright).
* Pruebas de rendimiento.
* Pruebas automatizadas en GitHub Actions.

---

# Regla para OpenCode

Antes de marcar cualquier tarea como completada deberá verificar:

* Que el proyecto compile.
* Que el flujo completo funcione.
* Que no existan errores visibles.
* Que el código siga la arquitectura del proyecto.
* Que la documentación permanezca actualizada.

Nunca asumir que una funcionalidad funciona sin comprobarla.

---

# Visión Final

La calidad del proyecto dependerá de la confiabilidad de cada funcionalidad.

Es preferible desarrollar menos funciones bien probadas que muchas funciones con errores.

Cada versión deberá sentirse estable, rápida y lista para utilizarse en un entorno real.

