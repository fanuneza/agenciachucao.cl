# Agencia Chucao — Agent Guidance

Este documento define las convenciones del proyecto para agentes que trabajen en [`agenciachucao.cl`](https://agenciachucao.cl). Es un sitio estático de conversión para clínicas dentales de alto ticket en Santiago, Chile. Antes de modificar código, lee este archivo, `PRODUCT.md`, `DESIGN.md` y el estado del working tree.

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

## Opening Workflow

1. Lee este `AGENTS.md`, `PRODUCT.md`, `DESIGN.md`, `README.md` y el estado del working tree.
2. Resuelve el repo con jCodeMunch e indexa si es necesario.
3. Para trabajo en fuentes, usa `plan_turn` con el repo resuelto, la tarea y el modelo activo.
4. Consulta Astro Docs MCP antes de confiar en comportamiento de Astro que pueda cambiar.
5. Define un resultado pequeño y verificable. Preserva trabajo no relacionado.
6. Antes de cambiar comportamiento compartido, revisa blast radius e importadores. Después de editar, llama `register_edit` con `reindex: true`.

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
- Fuentes auto-hospedadas en `public/fonts/`.
- Estilos en `src/styles/tokens.css` y `src/styles/global.css`. No añadir metodologías CSS nuevas sin justificación.
- Componentes Astro en `src/components/`. Mantener módulos pequeños y con nombres claros.
- Formulario de contacto en `src/components/ContactForm.astro`, enviado vía Web3Forms (`PUBLIC_WEB3FORMS_KEY`). Sus estilos viven en `public/styles/contact-form.css` y se cargan de forma asíncrona solo en `/contacto/`.
- WhatsApp flotante en `src/components/WhatsAppButton.astro` (`PUBLIC_WA_NUMBER`).
- Consentimiento de cookies en `src/components/CookieConsent.astro` + `src/scripts/site.ts`. GTM solo carga tras aceptación explícita.
- Imágenes: preferir componentes nativos de Astro; dimensionar y no lazy-load la imagen LCP.
- Mantener un único source of truth tipado para metadatos, schemas y hechos de negocio.
- Preservar UTF-8 y la voz del proyecto en español de Chile.

## Quality Contract

- Rutas representativas para verificar: `/`, `/contacto/`, `/politica-de-cookies/`, `/404`.
- Objetivo: Lighthouse 100 en Accessibility, Best Practices y SEO; Performance con excepción documentada para `unused-css-rules`.
- Astro `build.inlineStylesheets: "always"` fuerza todo el CSS scoped de componentes a un `<style>` inline por página. El CSS below-the-fold (footer, formulario de contacto, cuerpo de `/contacto/`) se carga de forma no bloqueante vía `IntersectionObserver` desde `public/styles/footer.css`, `public/styles/contact-form.css` y `public/styles/contacto.css`; los estilos críticos mínimos se mantienen en `src/styles/global.css` para evitar FOUC.
- `.lighthouserc.cjs` tolera hasta 1 stylesheet con reglas no usadas (`unused-css-rules`: `maxLength: 1`) porque el CSS scoped inlineado siempre contendrá algo de below-the-fold; el impacto real es 0 ms de metric savings. Eliminarlo por completo requeriría extraer todo el CSS de componentes a archivos globales/lazy-loaded (refactor grande) o cambiar `inlineStylesheets`.
- Tests de accesibilidad con axe-core en `tests/visual/a11y.spec.ts`.
- Tests de build/output en `tests/build-output.spec.ts` y `tests/build/build.spec.ts`.
- Tests de consentimiento en `tests/analytics-consent.spec.ts`.
- Chequeos determinísticos de build: metadatos canónicos, sitemap, robots, structured data, redirects, security files.
- Ejecutar durante el trabajo: formateo, lint, type check, build y tests mínimos relevantes.
- Antes de entregar: suite completa (`npm run lint`, `npm run format:check`, `npm run check`, `npm run build`, `npm test`).
- Reportar checks omitidos y sus razones.

## SEO, Structured Data y Analytics

- El sitio usa `@jdevalk/astro-seo-graph` para validación de H1, metadatos, enlaces internos, alt de imágenes y structured data.
- Emite `WebSite` node en la home con `name` consistente a `og:site_name` y branding.
- GTM se carga solo tras consentimiento (`GTM-PZPX7SK9`); GA4 vive dentro del contenedor. Ver `docs/analytics-csp-consent.md`.
- No enviar datos personales en payloads de analytics.
- Mantener coherencia entre contenido visible y structured data.

## Seguridad, Privacidad y Git

- CSP está definida en `public/_headers` para Cloudflare Pages. No copiar CSP universales; ajustar solo para servicios documentados.
- No commitear, staguear, pushear, crear PRs, cambiar de branch, editar configuración de Git ni reescribir historia a menos que el usuario lo solicite explícitamente.
- No subir secretos, `.env` ni datos privados al repositorio.
- No publicar instrucciones internas ni datos privados a través de `llms.txt`, schema o metadatos.
