# Technical Specification — Agencia Chucao Website (v3)

**Project:** Conversion-focused marketing website for Agencia Chucao  
**Builder:** Fabián  
**Date:** 2026-04-24  
**Version:** 2.0 (rewritten from PRD — PRD wins all conflicts)  
**Source of truth:** `docs/prd.md`  
**Visual authority:** `Site 2/handoff/old-site/chucao.css` + `Design System.html`  
**Architecture reference:** `Site 2/` (draw from, do not modify)  
**Feeds into:** `/checklist` → `/build`

---

## 1. Stack Decisions

| Layer | Decision | Rationale |
|---|---|---|
| Framework | Astro 4.x, `output: 'static'` | Zero JS by default; static output eliminates server attack surface |
| Styling | Plain CSS — `tokens.css` + `global.css` + scoped component `<style>` blocks | No Tailwind. No utility classes. All visual values come from CSS custom properties. No raw hex, px, or spacing values outside the token file. No inline `style=` attributes. |
| Fonts | Self-hosted WOFF2 files in `public/fonts/` | Google Fonts CDN is disallowed — it blocks 100/100 PageSpeed. `@font-face` declarations live in `src/styles/global.css`. Fonts are preloaded with `<link rel="preload">` in BaseLayout. |
| Contact form | Web3Forms | No backend required; AJAX submission; free tier. Routes to `contacto@agenciachucao.cl`. |
| Analytics | GA4 via direct `gtag.js` embed | Blocked behind cookie consent — GA4 does not fire until user clicks "Aceptar". No GTM, no Mixpanel. |
| Blog content | Astro Content Collections (Markdown `.md` files) | Launches with 3 articles. No CMS at launch. Sanity CMS scaffold in `Site 2/src/sanity/` is the post-launch upgrade path — do not port it now. |
| Hosting | Cloudflare Pages | Git-connected; auto-deploys on push to `main`; Cloudflare DNS manages `agenciachucao.cl`. |
| Images | WebP format, explicit `width` + `height` attributes, `loading="lazy"` | Core Web Vitals requirement |
| Cookie consent | First-party cookie (12-month expiry), vanilla JS | No third-party consent library. `CookieConsent.astro` component handles banner, storage, and GA4 initialization gate. |

---

## 2. Design Token Architecture

This is the central technical decision of the entire project. All visual values flow through CSS custom properties — defined once in `tokens.css`, referenced everywhere else.

**Source files (read-only — never modify these):**

| File | Role |
|---|---|
| `Site 2/handoff/old-site/chucao.css` | Token values + component CSS primitives — the extraction source |
| `Site 2/handoff/old-site/Design System.html` | Canonical visual spec — typography, spacing, patterns, composition maps |
| `Site 2/handoff/old-site/Chucao v2 Prototype.html` | Visual layout reference — section rhythm, proportions, component appearance |

**Token categories to extract into `tokens.css`:**

| Category | Count | Examples |
|---|---|---|
| Colors | 10 | `--color-orange: #CC4B3A`, `--color-forest: #1C2E1A`, `--color-sage: #F4F6F1` |
| Font families | 3 | `--font-sans: 'Montserrat', sans-serif`, `--font-serif: 'Lora', serif` |
| Type scale | Per heading + body | H1: Montserrat 900, 56–80px, -0.03em tracking, 1.02 line-height |
| Layout | Container, section padding, radius | `max-width: 1240px`, padding-inline `1.5rem`, section padding `7rem`/`5rem` |
| Animation | Easing | `--ease-spring: cubic-bezier(.16, 1, .3, 1)` |

**CSS file roles:**

| File | Contents | Rule |
|---|---|---|
| `src/styles/tokens.css` | CSS custom property declarations ONLY | No selectors. No classes. Just `--token: value;` inside `:root {}`. |
| `src/styles/global.css` | `@import './tokens.css'`, `@font-face` declarations, base reset, `.container`, scroll-reveal + stat-counter utilities | No hardcoded values — uses `var(--token)` throughout. `@font-face` blocks reference `/fonts/` paths. |
| Component `<style>` blocks | Per-component layout + appearance | All values via `var(--token)`. No raw numbers. |

**Validation rule:** `grep -r '#[0-9A-Fa-f]\{3,6\}' src/` must return zero results outside of `tokens.css`. This is the definition of done for the design system phase.

---

## 3. File Structure

```
/
├── public/
│   ├── fonts/                          # Self-hosted WOFF2 font files (downloaded pre-build)
│   │   ├── montserrat-*.woff2          # All needed weights/styles for Montserrat
│   │   ├── lora-*.woff2                # All needed weights/styles for Lora
│   │   └── jetbrains-mono-*.woff2     # JetBrains Mono weights used
│   ├── images/
│   │   ├── portfolio/                  # WebP screenshots for each portfolio project
│   │   ├── founders/                   # Placeholder WebPs at launch; real photos post-launch
│   │   └── og/                         # OG image (1200×630 WebP) — homepage minimum at launch
│   ├── robots.txt
│   ├── _redirects                      # Cloudflare Pages: /* /404.html 404
│   └── favicon.ico
│
├── src/
│   ├── styles/
│   │   ├── tokens.css                  # CSS custom properties ONLY (extracted from chucao.css)
│   │   └── global.css                  # @import tokens, @font-face declarations, reset, .container, utilities
│   │
│   ├── content/
│   │   ├── config.ts                   # Astro Content Collections schema definition
│   │   └── blog/
│   │       ├── [article-1-slug].md     # 3 launch articles
│   │       ├── [article-2-slug].md
│   │       └── [article-3-slug].md
│   │
│   ├── data/
│   │   ├── services.ts                 # Service content + WhatsApp CTA messages (single source of truth)
│   │   └── portfolio.ts                # Portfolio project data
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro            # HTML shell: Nav, Footer, WhatsApp button, fonts preload, GA4 (gated)
│   │   └── BlogPost.astro              # Extends BaseLayout; adds reading time, social share, service CTA
│   │
│   ├── components/
│   │   ├── SEO.astro                   # <head>: title, meta desc, OG, canonical, JSON-LD
│   │   ├── Nav.astro                   # Sticky forest navbar, wordmark, mobile drawer
│   │   ├── Footer.astro                # Forest section, 3-col desktop layout, cookie settings link
│   │   ├── Hero.astro                  # Forest bed, noise overlay, ghost watermark, staggered entrance
│   │   ├── ServiceCard.astro           # Orange top bar, ghost ordinal, hover lift
│   │   ├── PortfolioCard.astro         # Screenshot, category, comingSoon placeholder treatment
│   │   ├── BlogCard.astro              # Article card for blog index + homepage preview
│   │   ├── ContactForm.astro           # Web3Forms AJAX, honeypot, inline validation, WhatsApp fallback
│   │   ├── CookieConsent.astro         # First-visit banner, consent storage, GA4 initialization gate
│   │   ├── WhatsAppButton.astro        # Floating button on all pages
│   │   └── SocialShare.astro           # Blog post share buttons (WhatsApp, LinkedIn, X)
│   │
│   └── pages/
│       ├── index.astro                              # Home
│       ├── servicios/
│       │   ├── index.astro                          # Services index
│       │   ├── gestion-de-redes-sociales.astro
│       │   ├── seo-tecnico-y-posicionamiento.astro
│       │   ├── desarrollo-web.astro
│       │   ├── optimizacion-de-google-business-profile.astro
│       │   ├── creacion-de-contenido.astro
│       │   ├── email-marketing.astro
│       │   └── publicidad-en-google-y-meta.astro    # Exists; NOT linked from nav or index
│       ├── sobre-nosotros.astro
│       ├── portafolio.astro
│       ├── blog/
│       │   ├── index.astro
│       │   └── [slug].astro
│       ├── contacto.astro
│       ├── politica-de-cookies.astro               # Required by Ley 21.719; noindex
│       └── 404.astro
│
├── astro.config.mjs
├── tsconfig.json
├── .env                                # Gitignored — all API keys and IDs
└── package.json
```

---

## 4. Content Schema

### 4.1 Blog Post — Content Collections (`src/content/blog/*.md`)

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    publishDate: z.date(),
    author: z.string().default('Fabián'),
    service: z.enum([
      'redes-sociales', 'seo', 'desarrollo-web',
      'google-business', 'contenido', 'email-marketing',
      'publicidad', 'default',
    ]).default('default'),
    tags: z.array(z.string()).optional(),
    heroImage: z.string().optional(),
    relatedSlugs: z.array(z.string()).optional(),
  }),
});

export const collections = { blog };
```

Each article's `service` field maps to a CTA from `services.ts`. If `'default'` (or omitted), falls back to the standard home CTA ("Hablemos de tu negocio" → standard WhatsApp message).

`relatedSlugs` is a manual override for the related articles section. When absent, related articles are selected by shared `tags`.

### 4.2 Service Data Shape (`src/data/services.ts`)

```typescript
interface Service {
  id: string;                  // URL slug segment, e.g. 'seo-tecnico-y-posicionamiento'
  name: string;                // Display name
  headline: string;            // H1 value statement (not brand name + service label)
  problema: string;            // Pain section copy
  solucion: string;            // Solution section copy
  cta: {
    primary: string;           // Button label
    whatsappMessage: string;   // URL-encoded WhatsApp pre-fill message
    secondary?: string;        // Secondary CTA label (always links to /portafolio)
  };
  featured: boolean;           // false = publicidad page (excluded from nav + index + homepage)
}
```

### 4.3 Portfolio Data Shape (`src/data/portfolio.ts`)

```typescript
interface PortfolioProject {
  name: string;                // Display name, e.g. 'trxconcept.cl'
  category: 'Desarrollo Web' | 'SEO Técnico';
  description: string;         // 1–3 sentences
  url?: string;                // Live site URL — absent means comingSoon card
  screenshot?: string;         // Path to WebP in /public/images/portfolio/
  comingSoon?: boolean;
}
```

Launch data: trxconcept.cl, matriz.agenciachucao.cl (Desarrollo Web), fiberpole.cl, invenio.cl (SEO Técnico) + 1–2 placeholder cards.

---

## 5. Data Flows

### 5.1 Contact Form (Web3Forms)

```
User → ContactForm.astro
  → client-side validation (all 5 fields required; email + phone format check)
  → fetch() POST to https://api.web3forms.com/submit
      body: { access_key: PUBLIC_WEB3FORMS_KEY, nombre, email, telefono, cargo, sitio_web, botcheck: '' }
  → success: inline "Tu mensaje fue enviado. Te contactaremos pronto."
  → failure: inline error + WhatsApp fallback link
  → success path: gtag('event', 'contact_form_submit', { page_url: window.location.href })
```

The `botcheck` field is a honeypot — it must be present in the DOM but always empty. Web3Forms rejects submissions where it has a value.

### 5.2 WhatsApp Links

All WhatsApp CTAs follow this pattern:

```
https://wa.me/{PUBLIC_WA_NUMBER}?text={encodeURIComponent(message)}
```

`PUBLIC_WA_NUMBER` = Fabián's number, digits only with country code (e.g. `56912345678`), stored in `.env`.

Standard message (floating button + home hero CTA):
> Hola 👋 Vi Agencia Chucao y me interesa mejorar la presencia digital de mi negocio. ¿Tienen disponibilidad para conversar?

Service-specific pre-fill messages are defined per entry in `services.ts`.

### 5.3 Blog Data Flow (Markdown / Content Collections)

```
Build time:
  src/content/blog/*.md
    → Astro Content Collections (defineCollection in config.ts)
    → blog/index.astro: const posts = await getCollection('blog')
                        sorted by frontmatter.publishDate descending
    → blog/[slug].astro: export const getStaticPaths = async () => {
                             const posts = await getCollection('blog')
                             return posts.map(post => ({ params: { slug: post.slug }, props: post }))
                         }

No webhook. No external API. Build fails only if .md files have invalid frontmatter.

Post-launch upgrade path:
  Replace getCollection() calls with Sanity client.fetch() GROQ queries.
  Sanity schema and client scaffold already exist in Site 2/src/sanity/.
```

### 5.4 Analytics (GA4 — consent-gated)

```
BaseLayout.astro:
  <CookieConsent> renders banner on first visit (before any non-essential script fires)

CookieConsent.astro logic:
  On page load:
    → Read first-party cookie 'chucao_consent'
    → If value === 'accepted': call initGA4()
    → If cookie absent: show banner
  On "Aceptar" click:
    → Set cookie 'chucao_consent=accepted; max-age=31536000; path=/'
    → call initGA4()
    → hide banner
  On "Rechazar" click:
    → Set cookie 'chucao_consent=rejected; max-age=31536000; path=/'
    → hide banner
    → GA4 is NOT initialized

initGA4():
  → Inject <script async src="https://www.googletagmanager.com/gtag/js?id={PUBLIC_GA4_ID}">
  → Initialize window.dataLayer and gtag() function
  → gtag('config', PUBLIC_GA4_ID)
```

Custom events are fired inline in component scripts via `gtag('event', name, props)` — only after consent.

| Event | Trigger | Properties |
|---|---|---|
| `whatsapp_click_floating` | Floating WhatsApp button click | `page_url` |
| `whatsapp_click_inline` | Inline CTA WhatsApp click | `page_url`, `cta_label`, `service` |
| `contact_form_submit` | Successful Web3Forms submission | `page_url` |
| `portfolio_link_click` | External portfolio card link click | `project_name` |
| `blog_scroll_depth` | 25 / 50 / 75 / 100% scroll milestone on blog posts | `article_title`, `depth` |
| `service_page_view` | Service page loaded | `service_name` |

---

## 6. External Dependencies & Configuration

### 6.1 Environment Variables (`.env` — never commit this file)

```
# Client-side (PUBLIC_ prefix — safely embedded in browser bundle via import.meta.env)
PUBLIC_WA_NUMBER=           # WhatsApp number: digits + country code, e.g. 56912345678
PUBLIC_GA4_ID=              # GA4 Measurement ID: G-XXXXXXXXXX
PUBLIC_WEB3FORMS_KEY=       # Web3Forms access key (from web3forms.com dashboard)
```

No server-side environment variables required at launch. No Cloudflare Pages Functions at launch.

### 6.2 Web3Forms Setup

- Create account at web3forms.com → create form → copy access key → `PUBLIC_WEB3FORMS_KEY`
- No domain verification or dashboard configuration required for basic AJAX submissions
- Configure email notifications in Web3Forms dashboard to alert on new submissions
- Endpoint: `https://api.web3forms.com/submit` (POST)

### 6.3 Self-Hosted Fonts

**Fonts required:** Montserrat (400, 500, 600, 700, 800, 900, 800-italic), Lora (400, 500, 400-italic, 500-italic), JetBrains Mono (400, 500).

**Download:** Use [google-webfonts-helper](https://gwfh.mranftl.com) or the `@fontsource` npm packages to get WOFF2 files.

**Files go to:** `public/fonts/`

**`@font-face` declarations** go in `src/styles/global.css` (before the reset):

```css
@font-face {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: url('/fonts/montserrat-v26-latin-900.woff2') format('woff2');
}
/* ... repeat for each weight/style variant */
```

**Preloading in BaseLayout.astro** (for the weights used above the fold — at minimum Montserrat 900 for H1):

```html
<link rel="preload" as="font" type="font/woff2"
  href="/fonts/montserrat-v26-latin-900.woff2" crossorigin>
```

### 6.4 Cookie Consent Storage

- Cookie name: `chucao_consent`
- Values: `accepted` | `rejected`
- Max-age: `31536000` (12 months)
- Set via client-side JavaScript in `CookieConsent.astro`
- No third-party library

### 6.5 Google Analytics 4

- Create GA4 property → Measurement ID (`G-XXXXXXXXXX`) → `PUBLIC_GA4_ID`
- GA4 script is injected dynamically only after consent is granted (see §5.4)
- Verify all events in GA4 DebugView before launch

### 6.6 Cloudflare Pages

- Build command: `npm run build`
- Output directory: `dist`
- Environment variables: add `PUBLIC_WA_NUMBER`, `PUBLIC_GA4_ID`, `PUBLIC_WEB3FORMS_KEY` in Pages dashboard (Settings → Environment variables)
- Custom domain: `agenciachucao.cl` — configure via Pages → Custom domains; DNS records in Cloudflare
- `public/_redirects` content: `/* /404.html 404`

### 6.7 Astro Configuration

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  site: 'https://agenciachucao.cl',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/politica-de-cookies'),
    }),
  ],
});
```

`/publicidad-en-google-y-meta/` IS included in the sitemap — it is reachable via direct URL or sitemap per PRD §5.2. Only `/politica-de-cookies` is excluded.

---

## 7. Routing & SEO

### 7.1 URL Structure

| Page | URL | Notes |
|---|---|---|
| Home | `/` | Primary conversion page |
| Services index | `/servicios/` | Grid of 6 featured services |
| Gestión de Redes Sociales | `/servicios/gestion-de-redes-sociales/` | |
| SEO Técnico | `/servicios/seo-tecnico-y-posicionamiento/` | |
| Desarrollo Web | `/servicios/desarrollo-web/` | |
| Google Business Profile | `/servicios/optimizacion-de-google-business-profile/` | |
| Creación de Contenido | `/servicios/creacion-de-contenido/` | |
| Email Marketing | `/servicios/email-marketing/` | Featured |
| Publicidad (unlisted) | `/servicios/publicidad-en-google-y-meta/` | Not in nav or services index; in sitemap |
| About | `/sobre-nosotros/` | |
| Portfolio | `/portafolio/` | |
| Blog index | `/blog/` | |
| Blog post | `/blog/[slug]/` | Slug from .md frontmatter |
| Contact | `/contacto/` | |
| Cookie Policy | `/politica-de-cookies/` | `noindex: true`; excluded from sitemap |
| 404 | `/404` | Cloudflare Pages serves on unmatched routes |

### 7.2 SEO Component (`SEO.astro`) Props

```typescript
interface Props {
  title: string;         // Required — <title> + og:title
  description: string;   // Required — meta description + og:description (target 140–160 chars)
  image?: string;        // og:image path; defaults to /images/og/og-default.webp
  canonical?: string;    // Overrides auto-derived canonical (Astro.url.href)
  noindex?: boolean;     // true for /politica-de-cookies only
  schema?: object;       // JSON-LD: LocalBusiness (home/about), Article (blog posts)
}
```

Every page passes unique `title` and `description`. Canonical is auto-derived from `Astro.url` unless overridden.

### 7.3 Robots.txt

```
User-agent: *
Allow: /
Disallow: /politica-de-cookies/

Sitemap: https://agenciachucao.cl/sitemap-index.xml
```

`/servicios/publicidad-en-google-y-meta/` is NOT disallowed — it is indexable.

### 7.4 Structured Data

| Schema type | Pages | Required fields |
|---|---|---|
| `LocalBusiness` | Home, About | name, address, telephone, url, serviceType list |
| `Article` | All blog posts | headline, author, datePublished, description |

Pass as `schema` prop to `SEO.astro`, serialized as `<script type="application/ld+json">`.

---

## 8. Component Responsibilities

### BaseLayout.astro

Shell for every page. Props:

```typescript
interface Props {
  title: string;
  description: string;
  image?: string;
  schema?: object;
  noindex?: boolean;
}
```

Renders in order: font `<link rel="preload">` tags, `<SEO>`, `<Nav>`, `<slot>`, `<WhatsAppButton>`, `<CookieConsent>`, `<Footer>`.

GA4 is NOT initialized in this layout — `CookieConsent` controls initialization after consent.

Scroll-reveal and stat-counter utilities are initialized via a single `<script>` in this layout.

### BlogPost.astro

Extends BaseLayout. Receives a Content Collections entry. Renders:
- Reading time: `Math.ceil(wordCount / 200)` min (computed from entry body text)
- Author byline + publish date
- Body prose (rendered via `<Content />` from Content Collections)
- `<SocialShare>` (WhatsApp, LinkedIn, X)
- Service CTA: looks up entry's `service` field in `services.ts`, renders matching primary CTA button
- Related articles: 3 posts from `relatedSlugs` frontmatter if present, otherwise by shared `tags`

### CookieConsent.astro

Renders a fixed-position banner on first visit (before any non-essential script fires). Two buttons of equal visual prominence: "Aceptar" and "Rechazar". On accept: stores `chucao_consent=accepted` cookie and dynamically injects and initializes GA4. On reject: stores `chucao_consent=rejected` cookie and does nothing else. On subsequent visits: reads the cookie and either initializes GA4 (if accepted) or stays silent (if rejected) — banner is not shown again.

Contains a "Gestionar preferencias de cookies" link that clears the consent cookie and reloads the page to re-show the banner. This link also appears in the Footer.

### ContactForm.astro

Web3Forms AJAX submission. Fields: `nombre`, `email`, `telefono`, `cargo`, `sitio_web`. Hidden honeypot: `botcheck` (empty string required — must be in DOM, must remain empty). On success: inline confirmation, fires `contact_form_submit` gtag event. On failure: error message + WhatsApp link fallback.

### PortfolioCard.astro

If `project.comingSoon`: renders a muted card with a "Próximamente" badge and no link (not clickable). Otherwise: screenshot image, project name, category badge, description, external link (`rel="noopener noreferrer" target="_blank"`). External link clicks fire `portfolio_link_click` gtag event.

### WhatsAppButton.astro

Floating button, always visible, links to standard WhatsApp message. Fires `whatsapp_click_floating` on click. Position: fixed, bottom-right. Keyboard accessible with ARIA label.

### Nav.astro

Sticky, forest background. Wordmark + navigation links. Mobile: hamburger → drawer below `lg:` breakpoint. Navigation links: Servicios, Portafolio, Blog, Contacto. No "Publicidad" link.

### Footer.astro

Includes "Gestionar preferencias de cookies" link (clears consent cookie, re-shows banner). Link to `/politica-de-cookies/`.

---

## 9. Key Implementation Constraints

| Constraint | Rule |
|---|---|
| No hardcoded visual values in components | Every color, font, size, spacing, animation references `var(--token)`. Zero raw hex codes or px values in component files. |
| No Tailwind | No utility classes, no `tailwind.config`, no `@tailwindcss/vite`. |
| No inline `style=` attributes | All component appearance lives in `<style>` blocks. |
| Self-hosted fonts only | No Google Fonts CDN `<link>` tags. All fonts served from `/public/fonts/` via `@font-face` in `global.css`. This is a hard PageSpeed 100/100 requirement. |
| GA4 blocked until consent | The GA4 `<script>` tag is never in the static HTML. It is injected dynamically by `CookieConsent.astro` only after the user clicks "Aceptar". |
| GA4 not initialized until consent | `gtag()` calls in components are no-ops unless `window.gtag` was defined by `initGA4()`. Guard: `typeof gtag !== 'undefined' && gtag(...)` |
| No `<script>` tags beyond consent, form, and tracker interactions | The only scripts are: `CookieConsent.astro` (consent + GA4 init), ContactForm AJAX, scroll-reveal/stat-counter boot in BaseLayout, WhatsApp click tracker. |
| Publicidad page exists but is invisible from navigation | The page must not appear in nav, services index, or homepage services grid. It IS in the sitemap. It is NOT disallowed in robots.txt. |
| No server-side functions at launch | The `functions/` directory from Site 2 is not ported. Web3Forms handles the contact form without a Cloudflare Pages Function. |
| Blog launches with Markdown only | Do not create `src/sanity/` or port the Sanity client. Content Collections from `src/content/blog/` is the launch architecture. |
| 3 articles required before production build | Article `.md` files must be in `src/content/blog/` before the production Cloudflare Pages deploy. |

---

## 10. Out of Scope at Launch

These are deferred — not decisions to revisit, just boundaries to hold:

- Sanity CMS for blog content management (post-launch; scaffold in `Site 2/src/sanity/`)
- Lead magnet / PDF delivery / Brevo transactional email (post-launch — part of email capture initiative)
- Newsletter / email marketing list
- Cookie consent — granular category toggles, full consent log, re-consent on policy change (legal deadline December 2026; Option A banner IS in scope at launch)
- Full Cookie Policy page with complete cookie inventory (post-launch; minimal page is in scope)
- GTM container and Mixpanel
- Exit intent modal
- Online payments
- Authentication or user accounts
- Booking / scheduling tool
- Multilingual version
- Client portal
- Individual portfolio case study pages

---

## 11. Pre-Launch Checklist

**Font setup (required before first build):**
- [ ] Download WOFF2 files for Montserrat, Lora, JetBrains Mono → `public/fonts/`
- [ ] Write `@font-face` declarations in `src/styles/global.css`
- [ ] Add `<link rel="preload">` for above-the-fold font weights in BaseLayout.astro

**Blog content (required before production deploy):**
- [ ] Write 3 launch articles as `.md` files in `src/content/blog/`
- [ ] Frontmatter validated against Content Collections schema (Astro build will fail on schema errors)
- [ ] Article bodies include internal links to relevant service pages
- [ ] Each article has a `[CONVERSIÓN]` paragraph within the body with an editorial CTA

**Account setup (complete before build phase):**
- [ ] Web3Forms: create account, generate access key → `PUBLIC_WEB3FORMS_KEY`
- [ ] GA4: create property → `PUBLIC_GA4_ID`
- [ ] Cloudflare Pages: connect Git repo, configure `agenciachucao.cl` domain, add `PUBLIC_WA_NUMBER`, `PUBLIC_GA4_ID`, `PUBLIC_WEB3FORMS_KEY` to dashboard env vars
- [ ] WhatsApp number confirmed → add to `.env` as `PUBLIC_WA_NUMBER`

**Visual assets (placeholders acceptable at launch):**
- [ ] Placeholder founder photos (WebP) → `public/images/founders/fabian-placeholder.webp` + `partner-placeholder.webp`
- [ ] OG image (1200×630 WebP) → `public/images/og/og-default.webp`
- [ ] Portfolio screenshots (WebP) for 4 projects → `public/images/portfolio/`

**Pre-launch verification:**
- [ ] All 6 custom GA4 events verified in GA4 DebugView with consent accepted
- [ ] GA4 does NOT fire when consent is rejected — verified in browser network tab
- [ ] Cookie consent banner appears on first visit in an incognito window
- [ ] PageSpeed Insights: 100/100 desktop and mobile
- [ ] Core Web Vitals: LCP < 2.5s, INP < 200ms, CLS < 0.1
- [ ] All 13 pages + 404 + cookie policy render without errors
- [ ] Sitemap submitted to Google Search Console
- [ ] `robots.txt` accessible at `https://agenciachucao.cl/robots.txt`
