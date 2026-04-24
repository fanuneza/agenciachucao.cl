# Scope — Agencia Chucao Website (v3)

**Project:** Marketing website for Agencia Chucao — rebuild with correct design system applied to solid architecture
**Date:** 2026-04-23
**Builder:** Fabián (PM / marketer / journalist)

---

## The Idea

A conversion-focused marketing website for a two-person digital agency. The site has one job: turn curious visitors into leads. It needs to look like the online presence of a serious, established company — because Chucao *is* serious, even if it's new.

The central brand premise: most agencies sell smoke. Chucao delivers clients.

**This version** takes the proven architecture from Site 2 and applies the correct, fully-specified design system from the old-site handoff. Previous attempts to port CSS failed due to structural incompatibility — this build starts clean with both resources available.

---

## Design Authority (Non-Negotiable)

The design system is **locked**. These two files in `Site 2/handoff/old-site/` are the authoritative source for all visual decisions:

| File | Role |
|---|---|
| `Design System.html` | Canonical reference — tokens, type scale, components, patterns, page composition maps |
| `assets/chucao.css` | Portable CSS — exact token values, button/form/utility/animation primitives |
| `Chucao v2 Prototype.html` | Visual layout reference — page composition, section rhythm, proportions |

**Rule:** No hex value, font size, spacing, or animation value may be invented. Everything references a CSS custom property from `tokens.css`. Minor tweaks are allowed only when technically necessary for Astro compatibility — never for aesthetic preference.

---

## Design Token Summary

Extracted from `chucao.css` — these are fixed:

**Colors (10 tokens)**
- `--color-orange`: #CC4B3A — primary CTA, accent
- `--color-orange-dark`: #A33C2D — hover state
- `--color-orange-pale`: #F9EDEB — tint background
- `--color-forest`: #1C2E1A — nav, hero, dark sections
- `--color-forest-mid`: #2A4427 — hover surfaces
- `--color-olive`: #5C6B57 — muted text
- `--color-moss`: #DDE3D8 — borders
- `--color-sage`: #F4F6F1 — page background
- `--color-white`: #FFFFFF — card background
- `--color-black`: #111111 — body text

**Typography (2 families)**
- `--font-sans`: Montserrat (400/500/600/700/800/900) — all UI, headings, labels
- `--font-serif`: Lora (400/500, italic) — body text, prose, form inputs
- `--font-mono`: JetBrains Mono — code only

**Google Fonts URL:** `https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,800&family=Lora:ital,wght@0,400;0,500;1,400;1,500&family=JetBrains+Mono:wght@400;500&display=swap`

**Type Scale**
- H1: Montserrat 900 · 56–80px · -0.03em · 1.02
- H2: Montserrat 800 · 28–36px · -0.02em · 1.15
- H3: Montserrat 700 · 22px · 1.25
- H4: Montserrat 700 · 18px · 1.3
- Lede: Lora 400 · 19px · 1.7 · olive
- Body: Lora 400 · 16px · 1.75 · black
- Quote: Lora 400 italic · 22px · 1.65 · forest

**Spacing & Layout**
- Container: `max-width: 1240px`, `padding-inline: 1.5rem`
- Section padding: 7rem (lg) / 5rem (sm)
- Radius: cards 2px, buttons 3px, form fields 4px, step pips 50%

**Animation curve:** `cubic-bezier(.16, 1, .3, 1)` — spring-like, never bouncy

---

## Technical Architecture

**Stack:** Astro (static) · Plain CSS · Web3Forms · GA4 · Cloudflare Pages

This is driven by a hard security constraint: a previous WordPress site was hijacked on DigitalOcean with no backups. A static Astro site eliminates the attack surface entirely.

**CSS approach:** No Tailwind or utility frameworks. All styles live in external `.css` files — `src/styles/tokens.css` for design tokens and `src/styles/global.css` for base/utility styles. Component-specific styles go in `<style>` blocks inside `.astro` files (Astro scopes these automatically). No inline `style=` attributes or `<script>` tags unless there is no external alternative.

**Source of truth for structure:** Site 2's architecture (component breakdown, SEO implementation, data layer) is the baseline. The CSS/visual layer is being replaced — nothing structural changes.

---

## The User

**Primary audience:** Chilean SMBs in professional services — lawyers, consultants, small offices. Busy, skeptical of agencies (most have let them down), make decisions based on trust and personal connection.

**Secondary audience:** Any Chilean business that needs digital marketing and wants an agency that will show its work.

**How they arrive:** Organic search, word of mouth, direct referrals. WhatsApp is the preferred contact channel.

---

## Core Message

> *"Las otras agencias te venden humo. Chucao te trae clientes."*

Hero headline and north star. Everything else is proof.

---

## Services (7 total, 6 featured)

1. **Gestión de redes sociales** — management and campaigns
2. **SEO técnico y posicionamiento** — technical audits and ongoing SEO
3. **Desarrollo web** — websites and web projects
4. **Optimización de Google Business Profile** — local presence
5. **Creación de contenido** — blog posts and editorial strategy
6. **Email marketing** — list management, campaigns, and automation
7. **Publicidad en Google y Meta** — ads management (listed, not promoted)

**Lead-gen hook:** Free SEO audit — low commitment, high conversion potential.

---

## Pages (13 total, 7 layouts)

| Page | Notes |
|---|---|
| **Home** | Primary conversion page. Problem-first structure. |
| **Servicios** | Services index — overview + links to individual pages. |
| **Servicios / [slug]** | 7 individual service pages — shared layout, unique copy. |
| **Sobre nosotros** | Personal narrative, founder photos, origin story. |
| **Portafolio** | 4 real projects + 1–2 "próximamente" placeholders. |
| **Blog** | Launches with 3 articles. |
| **Contacto** | Contact form + WhatsApp + email. |

---

## Homepage Structure (Option A — Problem First)

1. **Hero** — "Las otras agencias te venden humo. Chucao te trae clientes." Primary CTA → WhatsApp.
2. **¿Por qué Chucao?** — 3–4 differentiators in dark section pattern (forest bed, pillar rows).
3. **Servicios** — Service cards 3-up grid.
4. **Credenciales** — Stat cells (24 combined years + logo strip: Prey, ArchDaily, TVN, La Tercera).
5. **Portafolio** — Preview of 3–4 projects.
6. **Blog** — Latest 2–3 articles.
7. **CTA final** — "Cotiza con nosotros" → WhatsApp.

---

## Components (from Design System)

All components are fully specified in `Design System.html`. These ship:

| Component | File | Description |
|---|---|---|
| BaseLayout | `src/layouts/BaseLayout.astro` | HTML shell, Nav + Footer, SEO mount, global CSS, scroll-reveal + stat counter boot |
| Nav | `src/components/Nav.astro` | Sticky forest navbar, wordmark, mobile drawer below `lg:` |
| Footer | `src/components/Footer.astro` | Forest bed, 3-col desktop |
| SEO | `src/components/SEO.astro` | Per-page meta, OG tags, canonical, LocalBusiness JSON-LD |
| Hero | `src/components/Hero.astro` | Forest bed, noise overlay, ghost watermark, orange rule, staggered entrance |
| ServiceCard | `src/components/ServiceCard.astro` | Orange top bar, ghost ordinal, hover lift |
| ContactForm | `src/components/ContactForm.astro` | Web3Forms POST, honeypot, inline validation |

---

## Conversion Strategy

**Primary CTA:** WhatsApp — floating button on all pages + inline CTAs.
**Secondary CTA:** Email via contact form on Contact page.
**No booking tool at launch.**

---

## Brand Voice

- **Language:** Spanish only
- **Register:** Tú — direct and familiar
- **Tone:** Professional with edge. Confident without arrogance. No Oxford commas.

---

## Trust Signals

- 24 combined years of professional experience
- Logo strip: Prey, ArchDaily, TVN, La Tercera
- PUC journalism credential
- Real portfolio with real projects
- Personal photos and narrative — humans, not a brand facade

---

## Portfolio

Launches with 4 real projects:

| Project | Type |
|---|---|
| trxconcept.cl | Web development |
| matriz.agenciachucao.cl | Web development |
| fiberpole.cl | Technical SEO |
| invenio.cl | Technical SEO |

Plus 1–2 "próximamente" placeholder cards.

---

## Explicit Cuts at Launch

- No online payments
- No authentication or user accounts
- No booking/scheduling tool (post-launch roadmap)
- No newsletter or email capture
- No multilingual version
- No client portal
- No CMS (content is Markdown / TypeScript data files)

---

## Post-Launch Roadmap

1. **Booking tool** — Calendly embed or equivalent
2. **Newsletter** — email list + campaigns
3. **Portfolio expansion** — case studies as clients are added
4. **Sanity CMS** — for blog content management (scaffold exists in Site 2)

---

## Success Criteria

1. A visitor lands on the homepage and within 30 seconds understands what Chucao does, who it's for, and why it's different from the agencies that burned them.
2. The conversion path — interest → WhatsApp — is frictionless on desktop and mobile.
3. The site reads as a serious, established agency. Not a portfolio. Not a freelancer page.
4. Within 3–6 months of launch, the site generates consistent inbound lead inquiries.
