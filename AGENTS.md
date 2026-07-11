# Agencia Chucao — Agent Guidance

Este documento define las convenciones del proyecto para agentes que trabajen en [`agenciachucao.cl`](https://agenciachucao.cl). Es un sitio estático de conversión para clínicas dentales de alto ticket en Santiago, Chile. Antes de modificar código, lee este archivo, `PRODUCT.md`, `DESIGN.md`, `README.md` y el estado del working tree.

## Project Context

- **Registro:** `brand` (el diseño ES el producto).
- **Plataforma:** web estática, Astro 6, output `static`, desplegado en Cloudflare Pages.
- **Usuario principal:** dueño de clínica dental en Santiago que compara agencias de marketing y necesita confianza rápida para invertir en captación de pacientes.
- **CTA primario:** solicitar auditoría gratuita vía formulario en `/contacto/`.
- **CTA secundario:** iniciar conversación por WhatsApp.
- **Personalidad:** cercana, directa, confiable. Sin jerga innecesaria. Se habla como un socio que entiende el negocio dental, no como una agencia de startup.
- **Anti-referencias:** fondos crema/beige genéricos de agencia, iconos de cohete, jerga en inglés, azul clínico cliché, sonrisas blanquísimas, fotos de familia forzadas.
- **Idioma:** español de Chile (`lang="es-CL"`).

### Principios de diseño

1. **Practice what you preach:** el sitio mismo debe demostrar conversión, claridad y medición.
2. **Show, don't tell:** preferir evidencia visual (reportes, casos, contexto real) sobre párrafos de claims.
3. **Territorial honesty:** lenguaje, precios y pruebas ancladas en Santiago y en clínicas dentales reales.
4. **No filler:** cada sección debe justificar su existencia con una acción o una creencia que acerque al CTA.
5. **Accessible by default:** cumplir WCAG AA estricto en contraste, foco, motion y lectores de pantalla.

## Required Documentation

Las decisiones importantes del proyecto deben quedar registradas. No inventar dominios, datos legales, credenciales, IDs de tracking ni claims no verificados. Los documentos existentes son:

- `PRODUCT.md` — contexto de negocio, usuario, propuesta de valor y voz.
- `DESIGN.md` — sistema visual, tokens, tipografía, reglas de diseño y sidecar `.impeccable/design.json`.
- `docs/refactor-audit.md` — hallazgos y plan inicial del refactor de mantenibilidad.
- `docs/refactor-report.md` — resumen ejecutivo del refactor ejecutado, baseline y resultados.
- `docs/analytics-csp-consent.md` — arquitectura de consentimiento, GTM/GA4, CSP y checklist de QA manual.
- `docs/ci-audit.md` — estado y recomendaciones del pipeline de CI.

Cuando una decisión nueva lo amerite, actualizar el documento correspondiente en lugar de agregar secciones sueltas en `AGENTS.md`.

## Opening Workflow

1. Lee este `AGENTS.md`, `PRODUCT.md`, `DESIGN.md`, `README.md` y el estado del working tree.
2. Resuelve el repo con jCodeMunch e indexa si es necesario.
3. Para trabajo en fuentes, usa `plan_turn` con el repo resuelto, la tarea y el modelo activo.
4. Consulta Astro Docs MCP antes de confiar en comportamiento de Astro que pueda cambiar: integraciones, adaptadores, content collections/loaders, imágenes, rutas, middleware, actions, sesiones y view transitions.
5. Define un resultado pequeño y verificable. Preserva trabajo no relacionado.
6. Antes de cambiar comportamiento compartido, revisa blast radius e importadores. Después de editar, llama `register_edit` con `reindex: true`.
7. Shell search sigue siendo válido para nombres de archivo, output generado, texto exacto y documentación no indexada.

## Design System

El sistema visual está documentado en `DESIGN.md` y en el sidecar `.impeccable/design.json`. Respétalo en cualquier cambio de UI.

### Tokens clave

- **Acento:** `#b83d1f` (vermilion), hover `#8f2813` (vermilion-d), texto sobre fondos oscuros `#e86b4a` (vermilion-light).
- **Fondos:** `#f2eee6` (bone), `#e8e2d4` (bone-2), `#0e0e0c` (ink).
- **Texto:** `#0e0e0c` sobre bone, `#f2eee6` sobre ink, `#4a4943` (graphite) para secundario, `#6d6a64` (muted) para metadatos.
- Ver tokens completos en `DESIGN.md` y `.impeccable/design.json`; cualquier cambio debe sincronizarse en ambos.
- **Tipografía:** Montserrat para display/body, JetBrains Mono para etiquetas y metadatos.
- **Forma:** esquinas nítidas (`border-radius: 0`).
- **Elevación:** plano por defecto; la única sombra permitida es la del FAB de WhatsApp (`0 12px 28px rgba(14, 14, 12, 0.18)`).

### Reglas de diseño

- **The One Voice Rule:** el acento rojo es la única voz de color fuerte. No introducir segundos acentos saturados.
- **The No-Frills Rule:** nunca usar serifas decorativas, cursivas display ni fuentes script.
- **The Flat-By-Default Rule:** las superficies no llevan sombra en reposo.
- Mantener el acento en ≤10% de la superficie de pantalla.
- Respetar el límite de 65–75ch en bloques de texto.
- Usar JetBrains Mono solo para etiquetas, metadatos y botones ghost.
- No usar `border-left > 1px` como acento, gradientes decorativos ni glassmorphism sin razón funcional.

## Implementation Defaults

- Stack: Astro 6, TypeScript, output estático, npm.
- Fuentes auto-hospedadas en `public/fonts/`. Cargar variantes `latin-*` de `@fontsource` para reducir CSS crítico.
- Estilos en `src/styles/global.css` y hojas por ruta en `public/styles/`. No añadir metodologías CSS nuevas sin justificación.
- No usar bloques `<style>` en componentes ni páginas. El CSS de cada bloque vive en `public/styles/` y se carga explícitamente.
- Componentes Astro en `src/components/`. Mantener módulos pequeños y con nombres claros.
- Formulario de contacto en `src/components/ContactForm.astro`, enviado vía Web3Forms (`PUBLIC_WEB3FORMS_KEY`). Sus estilos viven en `public/styles/contact-form.css` y se cargan de forma asíncrona solo en `/contacto/`.
- WhatsApp flotante en `src/components/WhatsAppButton.astro` (`PUBLIC_WA_NUMBER`).
- Consentimiento de cookies en `src/components/CookieConsent.astro` + `src/scripts/site.ts`. GTM solo carga tras aceptación explícita.
- Imágenes: preferir componentes nativos de Astro; dimensionar y no lazy-load la imagen LCP.
- Mantener un único source of truth tipado para metadatos, schemas y hechos de negocio.
- Preservar UTF-8 y la voz del proyecto en español de Chile.

## Quality Contract

Las rutas representativas y el plan de verificación detallado viven en `docs/quality.md`. Resumen:

- Rutas representativas para verificar: `/`, `/contacto/`, `/politica-de-cookies/`, `/404`.
- Objetivo: Lighthouse 100 en Accessibility, Best Practices y SEO; Performance con `render-blocking-resources` como advertencia aceptada por CSS crítico sincrónico.
- El CSS de cada página se carga de forma explícita: `src/styles/global.css` (compartido sincrónico) más hojas sincrónicas/lazy en `public/styles/` según la ruta. El CSS below-the-fold (footer, formulario de contacto, secciones de home, banner de cookies) se carga de forma no bloqueante vía `IntersectionObserver` usando `src/components/LazyStyles.astro`; los estilos críticos de layout se mantienen en hojas sincrónicas para evitar CLS/FOUC.
- `.lighthouserc.cjs` no tiene excepciones para `unused-css-rules`: todas las hojas cargadas en una ruta deben contener solo reglas usadas en esa ruta. Si se añade una hoja compartida, asegurar que no traiga reglas no usadas por la ruta testeada, o dividirla/duplicarla por página.
- Tests de accesibilidad con axe-core en `tests/visual/a11y.spec.ts`.
- Tests de build/output en `tests/build-output.spec.ts` y `tests/build/build.spec.ts`.
- Tests de consentimiento en `tests/analytics-consent.spec.ts`.
- Chequeos determinísticos de build: metadatos canónicos, sitemap, robots, structured data, redirects, security files.
- Ejecutar durante el trabajo: formateo, lint, type check, build y tests mínimos relevantes.
- Antes de entregar: suite completa (`npm run lint`, `npm run format:check`, `npm run check`, `npm run build`, `npm test`).
- Reportar checks omitidos y sus razones.

## Performance and Accessibility

- Mantener páginas estáticas y server-rendered. Cada island, script inline, tercero o función runtime requiere un requisito de usuario concreto.
- Usar Astro islands solo en el límite interactivo más pequeño y elegir la directiva de cliente menos eager que cumpla el UX.
- Preferir fuentes auto-hospedadas/subseteadas con `font-display` adecuado. Precargar solo recursos críticos medidos.
- Usar componentes de imagen de Astro. Dimensionar imágenes, entregar `sizes` precisos y mantener la imagen LCP descubrible y eager-loaded.
- Usar landmarks semánticos, un `h1` claro por página, jerarquía lógica de encabezados y nombres descriptivos en enlaces/botones.
- Soportar teclado, foco visible, skip navigation, zoom/reflow, touch targets, reduced motion y alternativas no-hover.
- Dar a formularios etiquetas persistentes, instrucciones, mensajes de estado y recuperación útil de errores.
- Cumplir WCAG AA en contraste; no comunicar significado solo con color.
- Imágenes informativas con `alt` contextual; imágenes decorativas con `alt` vacío u ocultamiento apropiado.
- Preferir HTML nativo antes que ARIA; preservar `aria-expanded`, `aria-current`, `disabled`, `checked`, `open`, `hidden`.
- No ocultar contenido esencial detrás de JavaScript, animaciones, acordeones, carruseles o hover.

## SEO, Structured Data y LLM Coverage

- El sitio usa `@jdevalk/astro-seo-graph` para validación de H1, metadatos, enlaces internos, alt de imágenes y structured data.
- Emite `WebSite` node en la home con `name` consistente a `og:site_name` y branding.
- Cada página indexable debe tener título descriptivo, meta descripción, canonical URL, un `h1` claro y landmarks semánticos.
- Responder la pregunta principal de cada página en texto server-rendered sin requerir interacción.
- Enlazar entidades relacionadas con anchor text descriptivo; mantener URLs canónicas estables.
- Citar fuentes autorizadas y mostrar fechas de revisión cuando los hechos son sensibles al tiempo.
- Emitir solo structured data que coincida con el contenido visible.
- `llms.txt` es opcional; si se añade, seguir el formato de la propuesta y vincular recursos públicos canónicos. No publicar instrucciones internas ni datos privados a través de archivos de descubrimiento.
- GTM se carga solo tras consentimiento (`GTM-PZPX7SK9`); GA4 vive dentro del contenedor. Ver `docs/analytics-csp-consent.md`.
- No enviar datos personales en payloads de analytics.
- Mantener coherencia entre contenido visible y structured data.

## Analytics, Consent y Seguridad

- Analytics es opt-in y consentido. La arquitectura completa está en `docs/analytics-csp-consent.md`.
- GTM/GA4 se cargan solo tras aceptación explícita. No usar `gtag.js` standalone.
- Centralizar eventos en `src/scripts/site.ts`. No incluir PII (nombres, emails, teléfonos, direcciones, valores de formulario) en payloads.
- CSP está definida en `public/_headers` para Cloudflare Pages. No copiar CSP universales; ajustar solo para servicios documentados.
- La baseline de seguridad considera `Content-Security-Policy`, `Strict-Transport-Security` tras confirmar HTTPS, `X-Content-Type-Options: nosniff`, protección contra clickjacking via CSP `frame-ancestors` y `X-Frame-Options` para clientes legacy, `Referrer-Policy` y `Permissions-Policy` mínimo.
- Probar `_headers` y `_redirects` construidos, y verificar headers desplegados en HTML y assets estáticos.

## Cloudflare Pages y Deployment

- Plataforma objetivo: Cloudflare Pages estático conectado a GitHub. Astro output `static`, sin adapter.
- Build command: `npm run build`; output directory: `dist`.
- Usar preview deployments para revisar cambios antes de mergear a la rama de producción.
- Verificar límites de Pages: cantidad/tamaño de archivos, reglas de `_headers`/`_redirects`.
- Dominio custom con HTTPS y modo SSL/TLS intencional.
- Cloudflare Web Analytics está deshabilitado intencionalmente; si se habilita en el dashboard, inyectará `beacon.min.js` antes del consentimiento. Ver `docs/analytics-csp-consent.md`.

## Seguridad, Privacidad y Git

- No commitear, staguear, pushear, crear PRs, cambiar de branch, editar configuración de Git ni reescribir historia a menos que el usuario lo solicite explícitamente.
- No subir secretos, `.env` ni datos privados al repositorio.
- No publicar instrucciones internas ni datos privados a través de `llms.txt`, schema o metadatos.
- Preservar cambios no relacionados del working tree. Inspección de Git es lectura; mutaciones requieren instrucción explícita.
