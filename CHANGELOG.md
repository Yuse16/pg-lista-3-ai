# Changelog

## 0.3.0 — Aplicación Web Progresiva (PWA)

### Cambios principales
- **PWA completa**: Service Worker, Web App Manifest, offline page, instalable.
- **Manifest dinámico**: `src/app/manifest.ts` con MetadataRoute.Manifest — name, short_name, display standalone, theme_color, SVG icons con purpose any + maskable.
- **Service Worker**: `public/sw.js` — cache-first para assets estáticos (iconos, offline page), network-first para navegación (fallback offline), network-only para datos dinámicos. Caché v1 con limpieza en activate.
- **Offline page**: `public/offline.html` — marca L3, mensaje informativo, botón de reintento.
- **Instalación**: `src/components/pwa/install-app-button.tsx` — beforeinstallprompt, standalone detection, se oculta cuando ya instalado o no soportado.
- **Registrador SW**: `src/components/pwa/service-worker-register.tsx` — solo en producción, detecta nuevos versiones con updatefound, SKIP_WAITING message protocol.
- **Iconos provisionales**: `public/icons/` — 4 SVG (192, 512, 512-maskable, apple-touch-icon) con "L3" sobre `#2563eb`.
- **Metadata + Viewport**: `src/app/layout.tsx` — manifest link, apple-web-app-capable, viewport export con themeColor.
- **Demo mode indicator**: Topbar badge ámbar "Demo" con panel informativo expandible.
- **Headers SW**: `next.config.ts` — headers para `/sw.js` con Content-Type y Cache-Control no-cache.

### Arquitectura
- Todos los módulos existentes preservados sin cambios en lógica de negocio.
- Modo demo (localStorage) sigue funcional con indicador visible.
- Service Worker registrado únicamente en producción para no interferir con hot-reload.

### Build
- 14 rutas (nueva: `/manifest.webmanifest`).
- `npm run build` exitoso.
- Lint: solo errores pre-existentes (2 errors, 4 warnings).

### Limitaciones conocidas
- beforeinstallprompt requiere HTTPS (funciona en Vercel, no en local).
- SVGs son provisionales hasta tener logo definitivo.
- Vitest no en dependencies (npm run test falla).
- Sin Supabase ni autenticación real.

## 0.2.0 — Auditoría funcional y motor de recomendaciones

### Cambios principales
- **Auditoría funcional completa**: Verificación de CRUD, búsqueda, filtros, persistencia y flujos completos en todos los módulos.
- **Motor de recomendaciones determinista**: Implementación completa con 20+ reglas de negocio basadas en docs/05_AI_AGENT.md, docs/06_DECISION_ENGINE.md y docs/02_BUSINESS_RULES.md.

### Reglas del motor
**Prospectos**: Nuevo sin contacto, sin próxima acción, interesado sin actividad, cotización enviada sin seguimiento, días sin contacto.
**Clientes**: Inactivo, activo sin próxima acción, seguimiento vencido, sin contacto reciente, cotización pendiente, compromiso para hoy, invitación a tienda.
**Cotizaciones**: Pendiente, enviada sin seguimiento, >3 días sin actividad, >7 días sin respuesta.
**Seguimientos**: Vencido, para hoy, sin resultado, sin próxima acción.
**Tareas**: Vencida, para hoy.

### Integración visual
- Dashboard: Top 5 recomendaciones ordenadas por prioridad con evidencia visible.
- Fichas de prospecto y cliente: Recomendaciones específicas del registro.
- Cotizaciones: Badge "Requiere seguimiento" para cotizaciones con alerta.
- Dashboard actualizado al recargar la página o al cambiar de pestaña (focus).

### Correcciones
- **Soft delete en cotizaciones**: El botón de eliminar ahora cambia el estado a "Cancelada" con confirmación modal. No hay eliminación física.
- **useSearchParams**: Todos los componentes envueltos en Suspense boundary (Next.js 16).
- **Dashboard**: Todos los indicadores se calculan desde datos reales (sin valores fijos).

### Pruebas
- 15 tests unitarios para el motor de recomendaciones (vitest).
- Cobertura: 10 reglas del motor + utilidades + ordenamiento.

### Comandos
```bash
npm run dev        # Desarrollo
npm run build      # Build + typecheck
npm run test       # Tests unitarios
npm start          # Producción
```

### Limitaciones conocidas
- ESLint con Node v24 presenta incompatibilidad en es-iterator-helpers (error conocido de la comunidad). TypeScript typecheck y build pasan correctamente.
- No existe autenticación real; sesión simulada como "Vendedor Nogalera".
- Persistencia mediante localStorage; sin Supabase.
- No hay integración con Intelisis, WhatsApp Business ni correo electrónico.
- Las pruebas del motor se ejecutan en Node.js sin navegador (no pueden probar localStorage directamente).
