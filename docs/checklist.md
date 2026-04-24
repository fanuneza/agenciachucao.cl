# Build Checklist — Agencia Chucao Website (v3)

**Project:** Agencia Chucao — conversion-focused marketing website  
**Builder:** Fabián  
**Date:** 2026-04-24  
**Source:** `docs/spec.md` (PRD wins all conflicts → `docs/prd.md`)  
**Feeds into:** `/build`

> **Dependency legend:** Each phase lists which phases it requires before starting.  
> **Effort:** XS < 30 min · S 30–90 min · M 2–4 h · L 4–8 h

---

## Phase 0 — Pre-Build Setup
**Dependencies:** none  
**Effort:** XS

- [ ] Create account at web3forms.com → generate access key → note as `PUBLIC_WEB3FORMS_KEY`
- [ ] Create GA4 property → copy Measurement ID → note as `PUBLIC_GA4_ID`
- [ ] Confirm WhatsApp business number (digits + country code, e.g. `56912345678`) → note as `PUBLIC_WA_NUMBER`
- [ ] Connect Cloudflare Pages to this Git repo → configure `agenciachucao.cl` custom domain
- [ ] Add `PUBLIC_WA_NUMBER`, `PUBLIC_GA4_ID`, `PUBLIC_WEB3FORMS_KEY` to Cloudflare Pages dashboard env vars

**Acceptance criteria:** All three keys are in hand. Cloudflare Pages project exists and is connected to `main` branch.

---

## Phase 1 — Project Scaffold
**Dependencies:** Phase 0  
**Effort:** S

- [ ] Initialize Astro 4.x project at repo root (`npm create astro@latest .` or manual)
- [ ] Install dependencies: `astro`, `@astrojs/sitemap`; remove any bloat (Tailwind, React)
- [ ] Write `astro.config.mjs` per spec §6.7: `output: 'static'`, `site: 'https://agenciachucao.cl'`, sitemap integration with `/politica-de-cookies` filter
- [ ] Write `tsconfig.json` (strict mode, path aliases if needed)
- [ ] Write `package.json` scripts: `dev`, `build`, `preview`
- [ ] Create `.env` file with the three keys (gitignored)
- [ ] Create `.env.example` with placeholder values (committed)
- [ ] Verify `.env` is in `.gitignore`
- [ ] Create directory structure per spec §3: `public/fonts/`, `public/images/portfolio/`, `public/images/founders/`, `public/images/og/`, `src/styles/`, `src/content/blog/`, `src/data/`, `src/layouts/`, `src/components/`, `src/pages/servicios/`, `src/pages/blog/`

**Acceptance criteria:** `npm run dev` starts without errors. Project directory matches spec §3 tree. `.env` not tracked by git.

---

## Phase 2 — Design System (tokens + fonts + global CSS)
**Dependencies:** Phase 1  
**Effort:** M

- [ ] Download WOFF2 files for all required weights → `public/fonts/`
  - Montserrat: 400, 500, 600, 700, 800, 900, 800-italic (7 files)
  - Lora: 400, 500, 400-italic, 500-italic (4 files)
  - JetBrains Mono: 400, 500 (2 files)
  - Use [google-webfonts-helper](https://gwfh.mranftl.com) or `@fontsource` packages
- [ ] Create `src/styles/tokens.css` — `:root {}` block only, no selectors:
  - 10 colors (orange `#CC4B3A`, forest `#1C2E1A`, sage `#F4F6F1`, etc.) from `Site 2/handoff/old-site/chucao.css`
  - 3 font-family stacks (`--font-sans`, `--font-serif`, `--font-mono`)
  - Full type scale (H1–H6 + body: family, weight, size range, tracking, line-height)
  - Layout tokens: container max-width `1240px`, padding-inline `1.5rem`, section padding `7rem`/`5rem`, border-radius values
  - Animation: `--ease-spring: cubic-bezier(.16, 1, .3, 1)`
- [ ] Create `src/styles/global.css`:
  - `@import './tokens.css'`
  - `@font-face` declarations for all 13 font files (family, style, weight, `font-display: swap`, woff2 path)
  - Base reset (box-sizing, margin/padding zero, etc.)
  - `.container` class using token values
  - `.scroll-reveal` utility (hidden state; JS adds `.visible`)
  - `.stat-counter` utility
  - All values via `var(--token)` — zero hardcoded numbers
- [ ] **Validation gate:** `grep -r '#[0-9A-Fa-f]\{3,6\}' src/` returns zero results outside `tokens.css`

**Acceptance criteria:** No raw hex codes or pixel values in any component file. Grep validation passes. Font files present in `public/fonts/`.

---

## Phase 3 — Data Layer
**Dependencies:** Phase 1  
**Effort:** M

- [ ] Write `src/data/services.ts` implementing the `Service` interface from spec §4.2:
  - 7 entries total: 6 featured + `publicidad-en-google-y-meta` (`featured: false`)
  - Populate `headline`, `problema`, `solucion`, `cta` from `docs/copy/services-*.md` files
  - Service-specific `whatsappMessage` values URL-encoded per spec §5.2
- [ ] Write `src/data/portfolio.ts` implementing the `PortfolioProject` interface from spec §4.3:
  - 4 real projects: `trxconcept.cl`, `matriz.agenciachucao.cl` (Desarrollo Web); `fiberpole.cl`, `invenio.cl` (SEO Técnico)
  - 1–2 placeholder cards with `comingSoon: true`
  - Placeholder `screenshot` paths pointing to `public/images/portfolio/` WebPs
- [ ] Write `src/content/config.ts` with the blog Content Collections schema from spec §4.1:
  - All fields: `title`, `description` (max 160), `publishDate`, `author`, `service` enum, `tags`, `heroImage`, `relatedSlugs`
  - Export `collections = { blog }`

**Acceptance criteria:** TypeScript compiles without errors. `services.ts` exports 7 entries, 6 with `featured: true`. `portfolio.ts` exports entries with at least 2 `comingSoon` placeholder cards. `config.ts` schema matches spec exactly.

---

## Phase 4 — Base Layout & Core Shared Components
**Dependencies:** Phase 2, Phase 3  
**Effort:** M

Build in this order (each depends on the previous):

- [ ] **`SEO.astro`** — accepts Props from spec §7.2; renders `<title>`, meta description, OG tags, canonical, `noindex` meta when true, JSON-LD `<script type="application/ld+json">` when `schema` prop is passed
- [ ] **`Nav.astro`** — sticky forest background; wordmark + 4 nav links (Servicios, Portafolio, Blog, Contacto); mobile hamburger → drawer at `lg:` breakpoint; no Publicidad link
- [ ] **`Footer.astro`** — forest section; 3-column desktop layout; "Gestionar preferencias de cookies" link (clears `chucao_consent` cookie + reloads page); link to `/politica-de-cookies/`
- [ ] **`WhatsAppButton.astro`** — fixed bottom-right; reads `PUBLIC_WA_NUMBER` from `import.meta.env`; standard WhatsApp message from spec §5.2; `aria-label` set; fires `whatsapp_click_floating` on click (with `typeof gtag !== 'undefined'` guard)
- [ ] **`CookieConsent.astro`** — per spec §8 and §5.4:
  - Fixed-position banner; two equal-prominence buttons ("Aceptar" / "Rechazar")
  - On load: reads `chucao_consent` cookie; if `accepted` calls `initGA4()`; if `rejected` stays silent; if absent shows banner
  - "Aceptar": sets cookie (max-age 31536000), calls `initGA4()`, hides banner
  - "Rechazar": sets cookie, hides banner, does NOT call `initGA4()`
  - `initGA4()`: injects `<script async>` for gtag.js, initializes `dataLayer`, calls `gtag('config', PUBLIC_GA4_ID)`
  - "Gestionar preferencias" link: clears cookie + `location.reload()`
- [ ] **`BaseLayout.astro`** — renders in spec order: font `<link rel="preload">` for Montserrat 900 (+ Lora 400 minimum), `<SEO>`, `<Nav>`, `<slot>`, `<WhatsAppButton>`, `<CookieConsent>`, `<Footer>`; scroll-reveal + stat-counter boot script; GA4 NOT initialized here

**Acceptance criteria:** Nav renders correctly at mobile and desktop. Cookie banner appears on first visit in incognito. "Aceptar" initializes GA4; "Rechazar" does not (verify in browser network tab). Font preload links present in `<head>`.

---

## Phase 5 — Blog Infrastructure
**Dependencies:** Phase 3, Phase 4  
**Effort:** S

- [ ] **`BlogCard.astro`** — displays article title, description, publishDate, service badge; links to `/blog/[slug]/`
- [ ] **`SocialShare.astro`** — WhatsApp, LinkedIn, X share buttons using `Astro.url`; WhatsApp uses `wa.me` URL per spec §5.2
- [ ] **`BlogPost.astro`** layout — extends BaseLayout; receives Content Collections entry; renders:
  - Reading time: `Math.ceil(wordCount / 200)` min
  - Author byline + publish date
  - Body via `<Content />`
  - `<SocialShare>`
  - Service CTA: looks up `entry.data.service` in `services.ts`, renders matching `cta.primary` button
  - Related articles: use `relatedSlugs` if present, else match by `tags` (3 posts max)
  - `blog_scroll_depth` event at 25/50/75/100% milestones (with gtag guard)
- [ ] **`src/pages/blog/index.astro`** — fetches all blog posts via `getCollection('blog')`; sorts by `publishDate` descending; renders grid of `<BlogCard>` components
- [ ] **`src/pages/blog/[slug].astro`** — `getStaticPaths` returns all slugs; renders via `<BlogPost>` layout; passes `Article` JSON-LD schema to SEO; fires `service_page_view` is NOT fired here (only on service pages)

**Acceptance criteria:** Blog index lists all articles sorted by date. Individual posts render with correct reading time, CTA, and social share buttons. Scroll depth events fire at correct thresholds (test with console.log before GA4 verification).

---

## Phase 6 — Home Page
**Dependencies:** Phase 4, Phase 5 (BlogCard), Phase 3  
**Effort:** L

Build sections as components, compose in `src/pages/index.astro`:

- [ ] **`Hero.astro`** — forest background (`--color-forest`); noise texture overlay; ghost Chucao watermark; H1 with main headline; subheadline; primary CTA ("WhatsApp Hablemos") + secondary CTA ("Ver servicios"); staggered entrance animation using `--ease-spring`; fires `whatsapp_click_inline` on CTA click
- [ ] **`ServiceCard.astro`** — orange top bar; ghost ordinal number (large, low-opacity background); service name + short description; hover lift transform; links to `/servicios/[id]/`
- [ ] Home services section — 6 `<ServiceCard>` for `featured: true` services (publicidad excluded); 2–3 col grid; section header
- [ ] Stats section — 3–4 numbers (clients served, campaigns run, etc.); `stat-counter` animation triggers on scroll into view; values in `tokens.css` or hardcoded in component (acceptable here)
- [ ] Portfolio preview section — 3 `<PortfolioCard>` (use component from Phase 9; build placeholder if Phase 9 not done yet); "Ver portafolio completo" link
- [ ] Blog preview section — 3 most recent `<BlogCard>` from `getCollection('blog')`; "Ver todos los artículos" link; requires at least 1 article to render (use placeholder check)
- [ ] Bottom CTA section — large conversion section; "Hablemos de tu negocio" WhatsApp button; fires `whatsapp_click_inline`
- [ ] `src/pages/index.astro` — assembles all sections; passes `LocalBusiness` JSON-LD to SEO; unique `title` and `description`

**Acceptance criteria:** Homepage renders all 6 sections without JavaScript errors. ServiceCards show only 6 featured services. Stat counters animate on scroll. Blog preview renders correctly with at least 1 article. WhatsApp CTA fires gtag event (with guard).

---

## Phase 7 — Service Pages
**Dependencies:** Phase 4, Phase 3  
**Effort:** M

- [ ] **`src/pages/servicios/index.astro`** — grid of 6 `<ServiceCard>` for featured services; breadcrumb/heading; unique SEO title + description
- [ ] **`src/pages/servicios/gestion-de-redes-sociales.astro`** — H1 from `services.ts headline`; problema section; solución section; primary CTA WhatsApp button; secondary CTA → `/portafolio/`; fires `service_page_view` on load; fires `whatsapp_click_inline` on CTA; `Service` JSON-LD (if applicable) or no schema
- [ ] **`src/pages/servicios/seo-tecnico-y-posicionamiento.astro`** — same structure as above
- [ ] **`src/pages/servicios/desarrollo-web.astro`** — same structure
- [ ] **`src/pages/servicios/optimizacion-de-google-business-profile.astro`** — same structure
- [ ] **`src/pages/servicios/creacion-de-contenido.astro`** — same structure
- [ ] **`src/pages/servicios/email-marketing.astro`** — same structure
- [ ] **`src/pages/servicios/publicidad-en-google-y-meta.astro`** — same structure; NOT linked from nav or servicios index; IS in sitemap; NOT in robots.txt Disallow

**Acceptance criteria:** All 8 service pages (index + 7 detail) render without errors. Publicidad page is reachable at its URL but absent from nav and services index. `service_page_view` event fires on each detail page. WhatsApp messages are service-specific (check URL-encoded text).

---

## Phase 8 — About Page
**Dependencies:** Phase 4  
**Effort:** S

- [ ] **`src/pages/sobre-nosotros.astro`**:
  - Founder(s) section with placeholder WebP photos from `public/images/founders/`
  - Mission / values copy (written directly in component — no CMS)
  - "Hablemos" CTA linking to `/contacto/`
  - `LocalBusiness` JSON-LD schema (same fields as homepage: name, address, telephone, url, serviceType list)
  - Unique SEO title + description

**Acceptance criteria:** Page renders with placeholder founder images. JSON-LD is valid (test with Google Rich Results Test). No 404s for image paths.

---

## Phase 9 — Portfolio Page
**Dependencies:** Phase 4, Phase 3  
**Effort:** S

- [ ] **`PortfolioCard.astro`** — if `comingSoon: true`: muted card with "Próximamente" badge, no link, not clickable; otherwise: screenshot WebP, project name, category badge, description, external link (`rel="noopener noreferrer" target="_blank"`); external link fires `portfolio_link_click` event with `project_name` (with gtag guard)
- [ ] **`src/pages/portafolio.astro`** — renders all projects from `portfolio.ts`; real projects first, comingSoon cards at end; unique SEO title + description

**Acceptance criteria:** Real project cards have working external links. ComingSoon cards have "Próximamente" badge and are not clickable. `portfolio_link_click` fires with correct `project_name`.

---

## Phase 10 — Contact Page
**Dependencies:** Phase 4  
**Effort:** S

- [ ] **`ContactForm.astro`** — per spec §8 and §5.1:
  - 5 fields: `nombre`, `email`, `telefono`, `cargo`, `sitio_web`
  - Hidden honeypot: `<input name="botcheck" type="text" style="display:none" tabindex="-1" autocomplete="off">`; value always empty
  - Hidden `access_key` field using `PUBLIC_WEB3FORMS_KEY`
  - Client-side validation: all 5 fields required; email format; phone format
  - `fetch()` POST to `https://api.web3forms.com/submit`
  - Success: inline "Tu mensaje fue enviado. Te contactaremos pronto."; fires `contact_form_submit` gtag event
  - Failure: inline error message + WhatsApp fallback link
- [ ] **`src/pages/contacto.astro`** — renders `<ContactForm>`; page intro copy; WhatsApp direct link as alternative; unique SEO title + description

**Acceptance criteria:** Form submits successfully to Web3Forms (verify email received). Honeypot field present but invisible. Validation blocks empty or malformed submissions. `contact_form_submit` fires on success. WhatsApp fallback link renders on error.

---

## Phase 11 — Utility Pages & Static Assets
**Dependencies:** Phase 4  
**Effort:** S

- [ ] **`src/pages/404.astro`** — custom 404; brief empathetic copy; link back to homepage + WhatsApp button; no SEO title/description stuffing
- [ ] **`src/pages/politica-de-cookies.astro`** — `noindex: true` in SEO component; minimal legal content (cookie name `chucao_consent`, purpose, duration 12 months, how to manage/withdraw); link to manage preferences
- [ ] **`public/robots.txt`** — per spec §7.3: Allow `/`, Disallow `/politica-de-cookies/`, Sitemap line
- [ ] **`public/_redirects`** — `/* /404.html 404`
- [ ] **Placeholder images** (generate or use solid-color WebPs):
  - `public/images/founders/fabian-placeholder.webp`
  - `public/images/founders/partner-placeholder.webp`
  - `public/images/og/og-default.webp` (1200×630)
  - `public/images/portfolio/trxconcept.webp`, `matriz.webp`, `fiberpole.webp`, `invenio.webp`
- [ ] **`public/favicon.ico`** — Chucao favicon (or placeholder 32×32 green square for now)

**Acceptance criteria:** 404 page renders at `/404`. Cookie policy page has `noindex` meta. `robots.txt` accessible. All image paths resolve (no broken `<img>` tags).

---

## Phase 12 — Blog Content (3 Launch Articles)
**Dependencies:** Phase 3, Phase 5  
**Effort:** L

All articles must validate against the Content Collections schema or the Astro build will fail.

- [ ] **Article 1** — `src/content/blog/[slug-1].md`
  - Topic: aligned to an SEO-opportunity keyword (suggest: "cómo mejorar tu presencia digital en Chile")
  - Service field: matches one of the 8 enum values
  - Internal links: at least 2 links to relevant `/servicios/` pages
  - `[CONVERSIÓN]` paragraph within body: editorial CTA with a WhatsApp or `/contacto/` link
  - Frontmatter: all required fields; `description` ≤ 160 chars; `publishDate` as ISO date
- [ ] **Article 2** — `src/content/blog/[slug-2].md`
  - Topic: different service area from Article 1
  - Same structure requirements as Article 1
- [ ] **Article 3** — `src/content/blog/[slug-3].md`
  - Topic: different service area from Articles 1 and 2
  - Same structure requirements as Article 1
- [ ] Run `npm run build` — confirm zero schema validation errors

**Acceptance criteria:** `npm run build` completes without errors. Blog index shows 3 articles sorted by date. Each article renders with correct service CTA, reading time, and social share buttons. Each article contains at least one internal service link and a `[CONVERSIÓN]` paragraph.

---

## Phase 13 — Analytics Verification
**Dependencies:** All pages built (Phases 4–12)  
**Effort:** S

- [ ] Confirm `typeof gtag !== 'undefined'` guard is present on every `gtag()` call across all components
- [ ] Test all 6 custom events in GA4 DebugView (with consent accepted):
  - [ ] `whatsapp_click_floating` — click the floating button
  - [ ] `whatsapp_click_inline` — click a CTA on Hero or bottom CTA section
  - [ ] `contact_form_submit` — submit a test form submission
  - [ ] `portfolio_link_click` — click an external portfolio link
  - [ ] `blog_scroll_depth` — scroll through a blog post to 25/50/75/100%
  - [ ] `service_page_view` — visit any service detail page
- [ ] Verify GA4 does NOT fire when consent is rejected:
  - Incognito window → click "Rechazar" → check browser Network tab for requests to `googletagmanager.com` — none should appear
- [ ] Verify `chucao_consent` cookie is set correctly in both accept and reject flows

**Acceptance criteria:** All 6 events visible in GA4 DebugView after consent. Zero GA4 network requests after rejection. Cookie set with correct `max-age` and `path=/`.

---

## Phase 14 — Documentation & Security Verification
**Dependencies:** All phases complete  
**Effort:** S

- [ ] **README.md** — project overview; setup instructions (`npm install`, `.env` setup, `npm run dev`); build command; Cloudflare Pages deployment notes; pointer to `docs/spec.md` for architecture
- [ ] **Secrets scan** — confirm `.env` is not committed: `git ls-files | grep .env` returns nothing
- [ ] **Hardcoded values scan** — `grep -r '#[0-9A-Fa-f]\{3,6\}' src/` returns zero results outside `tokens.css`
- [ ] **No Google Fonts CDN** — `grep -r 'fonts.googleapis.com' src/` returns zero results
- [ ] **Dependency audit** — `npm audit` — fix any high/critical vulnerabilities
- [ ] **PageSpeed Insights** — 100/100 desktop; target 90+ mobile (hard requirement per spec §9 — self-hosted fonts are prerequisite)
- [ ] **Core Web Vitals** — LCP < 2.5s, INP < 200ms, CLS < 0.1 (test on real Cloudflare Pages URL)
- [ ] **Full page smoke test** — all 13 pages + 404 + cookie policy render without console errors:
  - [ ] `/` · `/servicios/` · 6 service pages · `/sobre-nosotros/` · `/portafolio/` · `/blog/` · 3 blog posts · `/contacto/` · `/politica-de-cookies/` · `/404`
- [ ] **Sitemap** — `https://agenciachucao.cl/sitemap-index.xml` accessible; `/politica-de-cookies/` absent; `/publicidad-en-google-y-meta/` present
- [ ] **robots.txt** — accessible at `https://agenciachucao.cl/robots.txt`; Sitemap line present
- [ ] **Submit sitemap** to Google Search Console

**Acceptance criteria:** No secrets in git history. PageSpeed 100/100 desktop. No console errors on any page. Sitemap and robots.txt accessible and correct. Dependency audit clean.
