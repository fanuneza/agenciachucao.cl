# Product Requirements Document — Agencia Chucao Website (v3)

**Project:** Marketing website for Agencia Chucao
**Builder:** Fabián
**Date:** 2026-04-24
**Version:** 2.0
**Source of truth:** `docs/scope.md`
**Reference:** `Site 2/docs/prd.md` (adopted where not in conflict)
**Feeds into:** `/spec`

---

## 1. Core Emotional Outcome

Every page, section, and piece of copy on this site must produce a single emotional outcome in the potential client:

> **Relief and confidence.** The visitor — likely a Chilean SMB owner who has been let down by a previous agency — needs to believe that Chucao will make their life easier. That they can hand this problem over and trust that it will be handled. That the result will be: more leads, more online visibility, better reputation.

This is the north star. Differentiators, credentials, and proof points are instruments — this belief is the destination.

---

## 2. User Personas

### 2.1 The Skeptical SMB Owner (Primary)

- **Who:** Chilean professional services business owner — lawyers, consultants, small offices. 35–55 years old.
- **Context:** Has hired at least one digital marketing agency before and felt deceived — money spent, no results, no transparency.
- **Mindset:** Skeptical but open. Willing to try again if trust is established clearly and quickly.
- **Behavior:** Arrives via organic search or word of mouth. Scans, doesn't read. Makes decisions based on trust signals and personal connection, not pitch decks.
- **Primary device:** Mobile.
- **Preferred contact:** WhatsApp — that is how Chile does business.
- **Job to be done:** Find an agency I can actually trust to deliver results without making me chase them.

### 2.2 The Warm Referral (Secondary)

- **Who:** Someone sent directly by a mutual contact. Already has some trust in Chucao before arriving.
- **Behavior:** Arrives at the homepage or directly to the About page. Wants to confirm the vibe, check the work, and reach out.
- **Job to be done:** Validate what I've already been told. Find the contact button.

### 2.3 The Researcher (Secondary)

- **Who:** A potential client who is not ready to buy yet. Gathering information, comparing options.
- **Behavior:** Reads blog articles, browses the services index, possibly the portfolio. Not ready to initiate contact.
- **Job to be done:** Understand what options exist and get something useful — ideally something that makes Chucao memorable when ready to decide.

### 2.4 Fabián (Admin / Operator)

- **Who:** Co-founder, manages leads and client relationships.
- **Job to be done:** Receive qualified lead information, respond via WhatsApp, and track whether the site is converting.

---

## 3. Site Map

**13 pages, 7 unique layouts.** Plus 1 custom 404 page and 1 minimal cookie policy page (legally required by Ley 21.719).

| Page | Layout | Notes |
|---|---|---|
| Home | Unique | Primary conversion page |
| Servicios | Services index | Links to all 7 service pages |
| Gestión de Redes Sociales | Service page (shared) | |
| SEO Técnico y Posicionamiento | Service page (shared) | |
| Desarrollo Web | Service page (shared) | |
| Optimización de Google Business Profile | Service page (shared) | |
| Creación de Contenido | Service page (shared) | |
| Email Marketing | Service page (shared) | Listed and promoted |
| Publicidad en Google y Meta | Service page (shared) | Listed but not promoted |
| Sobre Nosotros | Unique | |
| Portafolio | Unique | |
| Blog (index) | Unique | |
| Blog (post) | Shared across all posts | Content from Markdown files |
| Contacto | Unique | |
| 404 | Unique | Custom, conversion-focused |
| Política de Cookies | Simple | Legally required |

---

## 4. User Stories

### Homepage

- As a skeptical SMB owner, I want to understand within 30 seconds what Chucao does, who it's for, and why it's different from the agencies that let me down, so I can decide whether to keep reading or leave.
- As a visitor, I want a clear, frictionless path to start a WhatsApp conversation, so I don't have to search for a way to reach out.
- As a warm referral, I want to see real proof — real projects, real experience, real people — so I can validate what I've already heard about Chucao.

### Service Pages

- As a potential client considering a service, I want to understand why my current situation is a problem, what the solution looks like, and whether Chucao has delivered this before, so I can decide if it's worth a conversation.
- As a visitor on a service page, I want a CTA that speaks to my specific intent — not a generic "contáctanos" — so the next step feels relevant to what I just read.
- As a business owner interested in email marketing, I want to understand what Chucao actually manages and what results to expect, so I can decide if handing this over makes sense.

### Portfolio

- As a potential client, I want to see real work done for real businesses similar to mine, so I can picture what Chucao might do for me.

### Blog

- As a researcher, I want to read practical, honest content about digital marketing in Chile, so I can learn something useful and remember who taught me.
- As a blog reader who finishes an article, I want to be pointed toward the relevant service, so the next step is obvious.

### Contact

- As a ready-to-buy visitor, I want to submit my information quickly and know it was received, so I can expect a response without uncertainty.

### 404 Page

- As a visitor who lands on a broken URL, I want to be reminded who Chucao is and given a clear path forward, so I don't just leave.

---

## 5. Feature Requirements & Acceptance Criteria

### 5.1 Homepage

**Structure (Option A — Problem First):**
1. Hero
2. ¿Por qué Chucao?
3. Servicios (cards)
4. Credenciales
5. Portafolio (preview)
6. Blog (preview)
7. CTA final

**Acceptance Criteria:**
- [ ] Hero headline "Las otras agencias te venden humo. Chucao te trae clientes." is visible above the fold on both desktop and mobile without scrolling.
- [ ] Primary CTA "Hablemos de tu negocio →" links to WhatsApp with the standard pre-filled message.
- [ ] Secondary CTA "Conoce nuestros servicios →" links to `/servicios`.
- [ ] ¿Por qué Chucao? section presents 3–4 differentiators in the dark section pattern (forest bed, pillar rows): transparency, media + tech background, personal attention, founder origin.
- [ ] Services section displays cards for all 7 featured services (including Email Marketing), each linking to its individual service page.
- [ ] Credentials section shows "24 años de experiencia combinada" and logo strip: Prey, ArchDaily, TVN, La Tercera.
- [ ] Portfolio preview shows 3–4 project cards.
- [ ] Blog preview shows 2–3 most recent articles.
- [ ] Final CTA repeats the primary WhatsApp CTA.
- [ ] Floating WhatsApp button is visible and accessible on all viewport sizes.
- [ ] All design tokens are sourced from `src/styles/tokens.css` — no invented hex values, sizes, or spacing.

---

### 5.2 Service Pages (Shared Layout)

**Section structure for all 7 service pages:**
1. H1 — value-statement headline (not brand name + service label)
2. Lede — one-sentence emotional hook
3. El Problema — the pain the visitor is experiencing
4. Lo Que Hacemos — what Chucao does and how it addresses the problem
5. Por Qué Agencia Chucao — proof: portfolio references, named experience, or demonstrable results
6. CTA — service-specific (see CTA Map, §8)

**Services (6 featured + 1 unlisted):**
- Gestión de Redes Sociales
- SEO Técnico y Posicionamiento
- Desarrollo Web
- Optimización de Google Business Profile
- Creación de Contenido
- **Email Marketing** *(featured — included in services index, nav, and homepage cards)*
- Publicidad en Google y Meta *(listed but not promoted — see below)*

**Acceptance Criteria:**
- [ ] All 7 service pages (including Email Marketing) share the same layout template; only content differs.
- [ ] Each page has a value-statement H1 (not "Agencia Chucao — [Service Name]").
- [ ] Each page uses its service-specific primary CTA from the CTA map (§8).
- [ ] Each page has a secondary CTA: "Ver portafolio →" linking to `/portafolio`.
- [ ] No generic "Contáctanos" button appears — every CTA is intentional and specific.
- [ ] Floating WhatsApp button is present on all service pages.
- [ ] Publicidad en Google y Meta page exists and loads correctly but is NOT linked from the services index, nav, or homepage cards — it is only reachable via direct URL or sitemap.
- [ ] Email Marketing page is linked from the services index, nav, and homepage service cards.
- [ ] Email Marketing H1 communicates outcome, not service label (e.g., "Tu lista de correos trabajando para ti. Sin spam, sin excusas.").
- [ ] Email Marketing El Problema section addresses: "tienes contactos pero no los estás convirtiendo" or equivalent.

---

### 5.3 About Page (Sobre Nosotros)

**Acceptance Criteria:**
- [ ] Page opens with the personal founder narrative — "Somos Chucao porque…" — written as a story, not a marketing blurb.
- [ ] Real photos of both founders are present. (Placeholder images at launch; updated post-launch.)
- [ ] Brand name story is included: the chucao is a bird that is uniquely Chilean — beautiful, singular, with a call that stays with you.
- [ ] PUC journalism school credential appears — one line, present but not foregrounded.
- [ ] "24 años de experiencia combinada" and logo strip (Prey, ArchDaily, TVN, La Tercera) appear.
- [ ] Primary CTA: "Conoce nuestros servicios →" linking to `/servicios`. (Not WhatsApp — this page builds trust; it does not close.)
- [ ] Floating WhatsApp button is present.

---

### 5.4 Portfolio (Portafolio)

**Card anatomy (per project):**
- Project name
- Category (Desarrollo Web / SEO Técnico)
- Brief description (1–3 sentences)
- Link to live site (opens in new tab)
- Screenshot or logo treatment

**Projects at launch:**

| Project | Category |
|---|---|
| trxconcept.cl | Desarrollo Web |
| matriz.agenciachucao.cl | Desarrollo Web |
| fiberpole.cl | SEO Técnico |
| invenio.cl | SEO Técnico |

**Acceptance Criteria:**
- [ ] 4 real project cards are displayed.
- [ ] 1–2 "Próximamente" placeholder cards are displayed with a visually distinct treatment (no live link, no screenshot — clearly in-progress).
- [ ] No individual project pages — all content is on the card.
- [ ] External links open in new tab with `rel="noopener noreferrer"`.
- [ ] Primary CTA: "¿Te interesa algo así para tu negocio? Conversemos" → WhatsApp.
- [ ] Floating WhatsApp button is present.

---

### 5.5 Blog (Índice)

**Acceptance Criteria:**
- [ ] Blog index displays all published articles sorted by most recent.
- [ ] Each article card shows: title, publication date, reading time estimate, brief excerpt, category/tag.
- [ ] Blog launches with 3 articles as Markdown files in `src/content/blog/`:
  - **Artículo 1:** "¿Por qué nadie me contacta desde mi sitio web?" — service mapping: `desarrollo-web`
  - **Artículo 2:** "¿Por qué no aparezco en Google? Lo que nadie te explica bien" — service mapping: `seo`
  - **Artículo 3:** "¿Vale la pena contratar una agencia de marketing digital? Lo que nadie te dice" — service mapping: `default`

---

### 5.6 Blog (Artículo individual)

**Post page anatomy:**
1. H1 (article title)
2. Metadata: author name + photo, publication date, reading time
3. Article body (with editorial image layout — see below)
4. Social share buttons
5. Service-mapped CTA (primary, end of article)
6. Related articles (3 cards)

**Editorial image layout:** In-article images support multiple layout modes — full-width, 50/50 side-by-side, captioned. Not just centered images with default margins.

**Social share buttons:** WhatsApp (primary for Chilean audience), LinkedIn, Twitter/X.

**Service-mapped CTA:** Each article has a `service` field in frontmatter that maps to the corresponding service CTA from the CTA map (§8). Confirmed mappings:
- Artículo 1 → `desarrollo-web` ("Cuéntanos tu proyecto")
- Artículo 2 → `seo` ("Pide tu auditoría SEO gratuita")
- Artículo 3 → `default` ("Hablemos de tu negocio" → standard WhatsApp)

**Acceptance Criteria:**
- [ ] Author name and placeholder photo (real photo post-launch) appear on every post.
- [ ] Reading time estimate is calculated and displayed (e.g., "4 min de lectura").
- [ ] Social share buttons present: WhatsApp, LinkedIn, Twitter/X.
- [ ] Each post's `service` frontmatter field routes to the correct service CTA block.
- [ ] Posts with no `service` frontmatter field fall back to the generic home CTA ("Hablemos de tu negocio" → WhatsApp).
- [ ] Related articles section shows 3 posts (by shared tag or manual `relatedSlugs` frontmatter array).
- [ ] Internal links to relevant service pages are present within article body.

---

### 5.7 Contact Page (Contacto)

**Form fields (required):**
1. Nombre
2. Correo electrónico
3. Teléfono
4. Cargo / Posición
5. Sitio web de tu empresa

**Submission routing:** Web3Forms → `contacto@agenciachucao.cl`

**Acceptance Criteria:**
- [ ] All 5 fields are required before submission is allowed.
- [ ] Form validates email format and phone format before submission.
- [ ] Web3Forms honeypot field is present (anti-spam).
- [ ] On successful submission: inline success message — "Tu mensaje fue enviado. Te contactaremos pronto." No page redirect.
- [ ] On submission failure (Web3Forms error): inline error message with a fallback WhatsApp link.
- [ ] WhatsApp contact option is prominently displayed alongside the form as the alternative path.
- [ ] No additional CTA on this page — the form is the action.
- [ ] Floating WhatsApp button is present.

---

### 5.8 404 Page

**Copy (confirmed, not a proposal):**
- H1: Esta página no existe.
- P: Igual que los resultados que te prometió tu última agencia.
- P: Pero nosotros sí existimos. Y traemos clientes.

**Acceptance Criteria:**
- [ ] Copy appears exactly as specified above.
- [ ] CTA: "Hablemos de tu negocio" → WhatsApp (standard pre-filled message).
- [ ] Link back to homepage.
- [ ] Floating WhatsApp button is present.
- [ ] Page is served by Cloudflare Pages' custom 404 handling (configured via `_redirects` or `not_found.html`).

---

### 5.9 Floating WhatsApp Button

**Behavior:**
- Visible on all pages on all viewport sizes.
- Fixed position; does not obscure primary content or CTAs.
- On click: opens WhatsApp with the pre-filled message.

**Pre-filled message (standard, all buttons):**
> Hola 👋 Vi Agencia Chucao y me interesa mejorar la presencia digital de mi negocio. ¿Tienen disponibilidad para conversar?

**Exception:** Service-specific WhatsApp CTAs use their own pre-filled messages (see §8 CTA Map). The floating button always uses the standard message.

**Acceptance Criteria:**
- [ ] Button is accessible via keyboard and has a proper ARIA label.
- [ ] Button click is tracked as a named GA4 event (`whatsapp_click_floating`).
- [ ] Inline CTA clicks are tracked as separate named events per page/service.

---

## 6. Edge Cases & Error States

| Scenario | Expected Behavior |
|---|---|
| Contact form submission fails (Web3Forms error) | Inline error message: "Hubo un problema al enviar tu mensaje. Escríbenos directamente por WhatsApp." with WhatsApp link. |
| Visitor lands on a non-existent URL | Custom 404 page (§5.8). |
| Visitor on mobile | All CTAs, forms, and the floating WhatsApp button are fully functional and readable on screens from 375px wide. |
| Visitor dismisses cookie consent banner | Non-essential scripts (GA4) do not fire. Session continues. Banner does not reappear this visit. |
| Visitor rejects cookie consent | Same as dismiss — no analytics scripts load. |
| Visitor lands on Publicidad en Google y Meta service page | Page exists and loads normally. Simply not linked from the services index or navigation. |
| "Próximamente" portfolio card clicked | No link — card is not clickable or displays a "Pronto" state. No broken link. |
| Blog post has no `service` frontmatter field | Falls back to the generic home CTA ("Hablemos de tu negocio" → WhatsApp). |
| Social share button tapped on mobile (WhatsApp) | Opens WhatsApp with a pre-composed share message including article title and URL. |
| Google Fonts CDN is unreachable | Self-hosted fonts load from `/public/fonts/` — no font flash, no layout shift. |

---

## 7. Analytics & Measurement Plan

**Stack:** GA4. All analytics scripts blocked until cookie consent is granted.

**Event Map:**

| Event Name | Trigger | Properties |
|---|---|---|
| `whatsapp_click_floating` | Floating button click | `page_url` |
| `whatsapp_click_inline` | Inline CTA click | `page_url`, `cta_label`, `service` |
| `contact_form_submit` | Successful Web3Forms submission | `page_url` |
| `portfolio_link_click` | External portfolio link clicked | `project_name` |
| `blog_scroll_depth` | 25%, 50%, 75%, 100% | `article_title`, `depth` |
| `service_page_view` | Service page loaded | `service_name` |

All events must be configured before launch and verified in GA4 DebugView.

---

## 8. CTA Map

### Main Pages

| Page | Primary CTA | Destination | Secondary CTA |
|---|---|---|---|
| Home | Hablemos de tu negocio → | WhatsApp (standard) | Conoce nuestros servicios → /servicios |
| Servicios (index) | ¿No sabes por dónde empezar? Conversemos | WhatsApp | Ver portafolio → /portafolio |
| Sobre Nosotros | Conoce nuestros servicios → | /servicios | — |
| Portafolio | ¿Te interesa algo así para tu negocio? Conversemos | WhatsApp | — |
| Blog (article) | Service-mapped (see below) | WhatsApp | — |
| Contacto | (none — form is the action) | — | — |

### Service Pages

| Service | Primary CTA | WhatsApp Pre-fill |
|---|---|---|
| Gestión de Redes Sociales | Cotiza la gestión de tus redes | "Hola 👋 Me interesa cotizar la gestión de redes sociales con Agencia Chucao." |
| SEO Técnico y Posicionamiento | Pide tu auditoría SEO gratuita | "Hola 👋 Me interesa una auditoría SEO gratuita para mi sitio web con Agencia Chucao." |
| Desarrollo Web | Cuéntanos tu proyecto | "Hola 👋 Quiero conversar sobre un proyecto de desarrollo web con Agencia Chucao." |
| Optimización de Google Business Profile | Mejora tu ficha de Google hoy | "Hola 👋 Me interesa optimizar mi perfil de Google Business con Agencia Chucao." |
| Creación de Contenido | Solicita una muestra de contenido | "Hola 👋 Me interesa solicitar una muestra de contenido con Agencia Chucao." |
| Email Marketing | Cotiza tu estrategia de email | "Hola 👋 Me interesa cotizar una estrategia de email marketing con Agencia Chucao." |
| Publicidad en Google y Meta | Revisa si tus avisos están funcionando | "Hola 👋 Me interesa que Agencia Chucao revise el rendimiento de mi publicidad en Google o Meta." |

### Blog Article CTAs (service-mapped)

| `service` frontmatter value | CTA Label | Destination |
|---|---|---|
| `redes-sociales` | Cotiza la gestión de tus redes | WhatsApp (redes) |
| `seo` | Pide tu auditoría SEO gratuita | WhatsApp (SEO) |
| `desarrollo-web` | Cuéntanos tu proyecto | WhatsApp (dev) |
| `google-business` | Mejora tu ficha de Google hoy | WhatsApp (GBP) |
| `contenido` | Solicita una muestra de contenido | WhatsApp (contenido) |
| `email-marketing` | Cotiza tu estrategia de email | WhatsApp (email) |
| `publicidad` | Revisa si tus avisos están funcionando | WhatsApp (publicidad) |
| `default` | Hablemos de tu negocio | WhatsApp (standard) |

### Standard WhatsApp Pre-fill (Floating Button + Home CTA)
> Hola 👋 Vi Agencia Chucao y me interesa mejorar la presencia digital de mi negocio. ¿Tienen disponibilidad para conversar?

---

## 9. SEO & Performance Requirements

> **These are not optimizations — they are proof of the brand promise.**
> Agencia Chucao positions itself against agencies that sell smoke and deliver nothing. A site that doesn't rank in search and doesn't score on PageSpeed cannot be the online presence of an agency that claims to deliver results. Every technical decision must treat SEO and performance as hard constraints, not afterthoughts. A fast, well-ranked site *is* the product demonstration.

### SEO (First-Class Requirement)

Every page must have:
- [ ] Unique `<title>` tag
- [ ] Unique meta description (140–160 characters)
- [ ] Open Graph tags: `og:title`, `og:description`, `og:image`, `og:url`
- [ ] Twitter card meta tags
- [ ] Canonical tag

Structured data (JSON-LD):
- [ ] `LocalBusiness` schema on homepage (agency name, address, contact, service list)
- [ ] `Article` schema on all blog posts (title, author, publish date, description)

Technical SEO:
- [ ] `robots.txt` — all pages indexable except `/politica-de-cookies`
- [ ] `sitemap.xml` — auto-generated by Astro, submitted to Google Search Console
- [ ] Clean Spanish-language URL slugs: e.g., `/servicios/seo-tecnico-y-posicionamiento/`
- [ ] No legacy redirects required (previous site is de-indexed)

### Performance

**Target: 100/100 Google PageSpeed Insights on both desktop and mobile.**

Requirements:
- [ ] Self-hosted fonts — no Google Fonts CDN calls at runtime (fonts preloaded from `/public/fonts/`)
- [ ] All images served as WebP with proper `width` and `height` attributes
- [ ] Lazy loading on all below-the-fold images
- [ ] No render-blocking resources in `<head>`
- [ ] Total JS payload minimized — Astro static output ships zero JS by default; any client-side islands must be explicitly justified
- [ ] Core Web Vitals targets: LCP < 2.5s, INP < 200ms, CLS < 0.1

---

## 10. Legal & Compliance

### Cookie Consent (Ley 21.719 — Option A: Minimal Launch Banner)

**In scope for launch:**
- [ ] Cookie consent banner appears on first visit before any non-essential script fires.
- [ ] Banner message: "Este sitio usa cookies de analítica para mejorar tu experiencia."
- [ ] Two buttons: "Aceptar" and "Rechazar" — equal visual prominence (same size, same contrast).
- [ ] GA4 is blocked until "Aceptar" is clicked.
- [ ] Consent stored as a first-party cookie with 12-month expiry.
- [ ] "Gestionar preferencias de cookies" link in site footer.
- [ ] Banner links to `/politica-de-cookies`.
- [ ] Minimal `/politica-de-cookies` page exists with: what cookies are used, categories, purpose, duration.

**Deferred to post-launch (legal deadline: December 2026):**
- Granular category-level toggles
- Full consent log with timestamp and policy version
- Re-consent on policy change
- Full Cookie Policy page with complete cookie inventory

### Accessibility

**Target: WCAG 2.1 AA minimum at launch.**

- [ ] All images have descriptive `alt` attributes
- [ ] All interactive elements (buttons, links, form fields) are keyboard-navigable
- [ ] Color contrast ratios meet AA minimums
- [ ] Proper heading hierarchy (`h1` → `h2` → `h3`) on every page
- [ ] Form fields have associated `<label>` elements
- [ ] Skip-to-content link present for keyboard users

---

## 11. Technical Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Astro (static output) | Security, PageSpeed, zero-JS by default |
| Styling | Plain CSS | `src/styles/tokens.css` + `src/styles/global.css` + component `<style>` blocks. No Tailwind, no utility frameworks, no inline `style=` attributes. |
| Hosting | Cloudflare Pages | Already in Fabián's infrastructure; free tier; fast CDN |
| Form handling | Web3Forms | Static-site compatible; routes to `contacto@agenciachucao.cl`; honeypot field required |
| Analytics | GA4 | Blocked behind cookie consent; configured before launch |
| Blog content | Markdown (`.md`) in `src/content/blog/` | TypeScript frontmatter schema via Astro Content Collections. Sanity CMS is post-launch. |

---

## 12. Blog Content Data Model (Markdown Frontmatter)

Blog posts are Markdown files in `src/content/blog/`. Astro Content Collections enforce the schema at build time.

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | yes | H1 and `<title>` tag |
| `description` | string (max 160) | yes | Meta description and OG description |
| `publishDate` | date (YYYY-MM-DD) | yes | Shown on post; used for sort order |
| `author` | string | yes | Defaults to "Fabián" |
| `service` | enum | no | One of: `redes-sociales`, `seo`, `desarrollo-web`, `google-business`, `contenido`, `email-marketing`, `publicidad`, `default`. Omit = falls back to `default`. |
| `tags` | string[] | no | Used for related articles |
| `heroImage` | string (path) | no | Optional; falls back to site OG default |
| `relatedSlugs` | string[] | no | Manual related article overrides |

**Pre-launch content setup (required before build):**
- [ ] 3 launch articles entered as `.md` files in `src/content/blog/`
- [ ] Frontmatter validated against schema (Astro build will fail on schema errors)
- [ ] Article body written in Markdown with internal links to relevant service pages
- [ ] Each article has a `[CONVERSIÓN]` paragraph within the body with an editorial CTA

---

## 13. Prioritization

### Must-Have at Launch

- All 13 pages + 404 + minimal cookie policy
- Homepage (full structure, all 7 sections)
- 7 service pages including Email Marketing (shared layout, unique content and CTAs)
- Publicidad en Google y Meta page (exists, not linked from nav/index)
- About page (placeholder photos, narrative copy)
- Portfolio (4 real cards + 1–2 "próximamente" placeholders)
- Blog (index + 3 launch articles with full post layout, served from Markdown)
- Contact page (Web3Forms + Web3Forms honeypot + WhatsApp)
- Floating WhatsApp button (all pages)
- Custom 404 page (confirmed copy)
- Full CTA map implemented (all 7 services including Email Marketing)
- GA4 (behind consent)
- Cookie consent banner (Option A)
- **SEO metadata on all pages — non-negotiable**
- **Structured data (LocalBusiness + Article) — non-negotiable**
- **Sitemap + robots.txt — non-negotiable**
- **100/100 PageSpeed target (desktop and mobile) — non-negotiable**
- **Self-hosted fonts (no Google Fonts CDN) — required for PageSpeed target**
- Basic accessibility (WCAG 2.1 AA)

### Post-Launch (Priority Order)

1. **Cookie consent — full implementation** (legal deadline: December 2026)
2. **Booking tool** — direct meeting/call scheduling (Calendly embed or equivalent)
3. **Newsletter / email capture** — list capture and campaigns (also a service Chucao offers)
4. **Founder photos** — replace placeholder images on About page and blog author cards
5. **Portfolio expansion** — add case studies as new clients are served
6. **Sanity CMS** — migrate blog to Sanity Studio (scaffold exists in `Site 2/`); required for non-technical partner to publish posts without GitHub
7. **Cookie policy page — full version** — complete cookie inventory, granular controls

---

## 14. Success Criteria

The site is successful when:

1. A potential client lands on the homepage and within 30 seconds understands what Chucao does, who it's for, and why it's different from the agencies that burned them before.
2. The conversion path — from interest to WhatsApp contact — is frictionless on both desktop and mobile.
3. **The site scores 100/100 on Google PageSpeed Insights (desktop and mobile).** Hard launch gate — not a target to improve post-launch.
4. **All Core Web Vitals are green before launch:** LCP < 2.5s, INP < 200ms, CLS < 0.1.
5. **Service pages rank for their target keywords within 90 days of launch.** The Astro static output and proper on-page SEO give this site a structural advantage — use it.
6. The site reads as the online presence of a serious, established agency — not a portfolio, not a freelancer page.
7. Within 3–6 months of launch, the site is generating consistent inbound lead inquiries via WhatsApp and the contact form.
8. GA4 analytics events are firing correctly from day one, with consent properly gating all tracking.
