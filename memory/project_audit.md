# PROJECT AUDIT

## Documentos leídos

| Archivo | Estado |
|---|---|
| README.md | Leído |
| docs/00_PROJECT.md | Leído |
| docs/01_PRODUCT_VISION.md | Leído |
| docs/02_BUSINESS_RULES.md | Leído |
| docs/03_USER_FLOWS.md | Leído |
| docs/04_DATABASE.md | Leído |
| docs/05_AI_AGENT.md | Leído |
| docs/06_DECISION_ENGINE.md | Leído |
| docs/07_UI_UX.md | Leído |
| docs/08_PROMPTS.md | Leído |
| docs/09_ROADMAP.md | Leído |
| docs/10_DESIGN_SYSTEM.md | Leído |
| docs/11_API.md | Leído |
| docs/12_SECURITY.md | Leído |
| docs/13_TESTING.md | Leído |
| docs/14_DEPLOYMENT.md | Leído |
| docs/15_CONTRIBUTING.md | Leído |
| docs/16_TASKS.md | Leído |
| docs/CHANGELOG.md | Leído |
| memory/decision_log.md | Leído |
| memory/future.md | Leído |
| memory/meeting_notes.md | Leído |
| memory/ideas.md | Leído |
| knowledge/categorias.md | Leído |
| knowledge/clientes.md | Leído |
| knowledge/faq.md | Leído |
| knowledge/intelisis.md | Leído |
| knowledge/lista3.md | Leído |
| knowledge/plomeria_garcia.md | Leído |
| knowledge/productos.md | Leído |
| knowledge/ventas.md | Leído |

---

## Contradicciones detectadas

### 1. Nombre de archivo de tareas inconsistente
- **Problema:** El archivo se llama `docs/16_TASKS.md` pero múltiples documentos lo referencian como `docs/10_TASKS.md` (docs/15_CONTRIBUTING.md:49, docs/08_PROMPTS.md desaparece, memory/decision_log.md:28, docs/15_CONTRIBUTING.md:219, etc.).
- **Decisión:** Mantener el archivo como `docs/16_TASKS.md` (su posición real en el sistema de numeración). Las referencias internas cruzadas se actualizarán cuando se modifique el archivo. No es bloqueante para el MVP.

### 2. Dark mode solicitado vs. priorización
- **Problema:** `docs/07_UI_UX.md:406` dice "El sistema deberá soportar Dark Mode desde la primera versión. No deberá implementarse posteriormente". El usuario explícitamente dice: "Arquitectura preparada para modo oscuro, sin priorizarlo sobre lo esencial."
- **Decisión:** Seguir la instrucción del usuario actual. Preparar variables CSS para dark mode pero no implementarlo activamente. Priorizar funcionalidad.

### 3. MVP scope — Inicio de sesión
- **Problema:** `docs/09_ROADMAP.md` lista "Inicio de sesión" como parte del MVP. Sin embargo, no existe Supabase configurado ni credenciales. El usuario dice: "La aplicación debe funcionar aunque todavía no existan credenciales externas."
- **Decisión:** Construir sin autenticación real. Usar un selector de usuario/vendedor simulado para el MVP. La arquitectura de repositorios preparada para conectar Supabase después.

### 4. Estados de prospecto — inconsistencia menor
- **Problema:** `docs/02_BUSINESS_RULES.md:76` lista 8 estados. `docs/04_DATABASE.md:180` lista 8 pero usa "Cotizando" vs "Cotización enviada". La instrucción del usuario dice "Cotización enviada".
- **Decisión:** Usar los estados exactos que el usuario lista en la sección 4.3: Nuevo, Contactado, Interesado, Cotización enviada, Seguimiento, Ganado, Perdido, Archivado.

### 5. Cliente estados — inconsistencia
- **Problema:** `docs/02_BUSINESS_RULES.md:93` lista: Activo, Inactivo, Suspendido, Potencial, Estratégico. El usuario en sección 4.4 solo menciona "activo o inactivo".
- **Decisión:** Para el MVP, usar Activo e Inactivo como estados principales. Los demás se agregarán después.

---

## Riesgos

1. **Sin Supabase:** La persistencia depende de localStorage. Al recargar el navegador en otra máquina se pierden datos. Documentado como limitación temporal.
2. **Sin autenticación real:** Cualquier persona con acceso a la URL puede usar la app. Aceptable para MVP interno.
3. **Datos de prueba genéricos:** No representan clientes reales. No permiten probar flujos complejos de recuperación.
4. **Sin historial de compras real:** El motor de recomendaciones no puede calcular "clientes que dejaron de comprar" sin datos históricos.
5. **Sin integración Intelisis:** No hay catálogo de productos real ni precios.

---

## Información faltante

1. **Reglas exactas de Lista 3** — criterios oficiales de clasificación.
2. **Presupuestos y metas** — para calcular cumplimiento.
3. **Catálogo de productos** — para recomendaciones específicas.
4. **Clientes reales** — para probar con datos verdaderos.
5. **Sucursales y vendedores** — para asignación.

---

## Qué puede construirse sin la información faltante

- ✅ Dashboard con indicadores (sobre datos semilla).
- ✅ CRUD de prospectos (captura manual).
- ✅ CRUD de clientes (captura manual).
- ✅ Seguimientos (registro de interacciones).
- ✅ Cotizaciones (referencia, sin productos).
- ✅ Agenda de tareas.
- ✅ Motor de recomendaciones determinista (basado en reglas, no en ML).
- ✅ Búsqueda y filtros básicos.
- ✅ Navegación completa.
- ✅ Estados vacíos y de carga.
- ✅ Validaciones de formulario.

---

## Resumen de decisiones de arquitectura para el MVP

| Decisión | Valor |
|---|---|
| Framework | Next.js 16 App Router |
| Lenguaje | TypeScript estricto |
| Estilos | Tailwind CSS |
| Persistencia | Repositorio local (localStorage) con interfaz preparada para Supabase |
| Autenticación | Simulada (selector de vendedor) |
| Datos de prueba | Seed data genérica |
| Motor IA | Determinista basado en reglas (docs/06_DECISION_ENGINE.md) |
| Despliegue | Local (npm run dev) / Vercel |
| PWA | Service Worker cache-first, Manifest dinámico, offline page, instalable |
| Iconos | SVG provisionales ("L3" sobre `#2563eb`) |

---

## Fase 2 completada — v0.2.0

### Auditoría funcional
- Todos los módulos verificados: `/prospects` (list/new/detail), `/clients` (list/detail), `/followups`, `/quotes` (list/new), `/agenda`
- CRUD, búsqueda, filtros, persistencia (localStorage), estados vacíos y de carga confirmados
- Todos los componentes envueltos en `<Suspense>` para Next.js 16 useSearchParams

### Motor de recomendaciones (20+ reglas)
- **Prospectos**: Nuevo sin contacto, sin próxima acción, interesado sin actividad, cotización enviada sin seguimiento, días sin contacto
- **Clientes**: Inactivo, activo sin próxima acción, seguimiento vencido, sin contacto reciente, cotización pendiente, compromiso para hoy, invitación a tienda
- **Cotizaciones**: Pendiente, enviada sin seguimiento, >3 días sin actividad, >7 días sin respuesta
- **Seguimientos**: Vencido, para hoy, sin resultado, sin próxima acción
- **Tareas**: Vencida, para hoy

### Integración
- Dashboard: Top 5 recomendaciones con evidencia
- Fichas prospecto/cliente: Recomendaciones específicas del registro
- Cotizaciones: Badge "Requiere seguimiento" + soft delete con confirmación modal
- Dashboard recalcula al recibir foco (window focus)

### Soft delete
- Quotes.delete reemplazado por `cancel()` que cambia estado a Cancelada
- Modal de confirmación antes de cancelar

### Pruebas
- 15 tests unitarios (vitest) — todas las reglas principales cubiertas
- `npm run test` para ejecutar
- Limitación: Pruebas en Node.js (sin navegador), no pueden probar localStorage directamente

---

## Fase 3 completada — v0.3.0 (PWA)

### PWA completa
- **Manifest dinámico**: `src/app/manifest.ts` — MetadataRoute.Manifest con theme_color `#2563eb`, display standalone, SVG icons.
- **Service Worker**: `public/sw.js` — cache-first para assets estáticos, network-first para navegación (offline fallback), network-only para datos dinámicos. Caché v1 con limpieza en activate.
- **Offline page**: `public/offline.html` — marca L3, mensaje, botón reintento.
- **Instalación**: `src/components/pwa/install-app-button.tsx` — beforeinstallprompt, standalone detection.
- **Registro**: `src/components/pwa/service-worker-register.tsx` — solo producción, version detection, SKIP_WAITING.
- **Demo mode indicator**: Topbar badge ámbar "Demo" con panel informativo.
- **SW headers**: next.config.ts headers para `/sw.js`.

### Cambios de arquitectura
- `src/app/manifest.ts` — nuevo (MetadataRoute.Manifest)
- `src/app/layout.tsx` — metadata con manifest + icons + appleWebApp; viewport export con themeColor
- `next.config.ts` — headers() para SW
- `public/sw.js` — nuevo (service worker)
- `public/offline.html` — nuevo (offline page)
- `public/icons/` — 4 SVG nuevos
- `src/components/pwa/` — 2 componentes nuevos (install button + SW register)
- `src/components/layout/topbar.tsx` — demo mode badge + install button
- `src/components/layout/sidebar.tsx` — demo mode text

### Build
- 14 rutas (nueva: `/manifest.webmanifest`)
- Build exitoso, lint limpio (solo pre-existentes)
- beforeinstallprompt requiere HTTPS (Vercel)
- Vitest no en dependencias
