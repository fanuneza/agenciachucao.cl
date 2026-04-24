# Builder Profile — Agencia Chucao Visual Unification

## Who I Am

- **Name:** Fabián
- **Role:** Product Manager / Marketer / Newbie Dev
- **Experience:** 15 years in tech, technical non-coder
- **Persona:** Professor (explain as you go, teach the why)
- **Mode:** Learner (guided, with context — not just instructions)

---

## This Project

**Project:** Visual Unification of Agencia Chucao's two prototype sites

**The problem:** Two Astro sites were built independently. One has great visual design but weak architecture. The other has solid architecture but weak visual design. Direct CSS migration was attempted and failed due to component structure incompatibility. Starting fresh with Vibe Cartographer.

**The solution:** Use the design system from `Site 2/handoff/old-site/` (`Design System.html` + `chucao.css`) as the authoritative visual spec. Apply it to Site 2's architecture using plain CSS — no Tailwind. No inline styles or `<script>` tags unless there is genuinely no external alternative.

---

## The Two Sources

| | Site 1 (`Site 1/`) | Site 2 (`Site 2/`) |
|---|---|---|
| **Built with** | Claude Design → Claude Code | Claude Code + Vibe Cartographer |
| **Strengths** | Visual design, design system, aesthetics | Astro architecture, SEO, component structure, Sanity CMS |
| **Role** | Design donor — tokens and visual patterns only | Structural base — everything that doesn't change |

---

## What Is Frozen (Never Touch)

- Page routes and URL structure
- `<head>` SEO metadata (title, description, OG, canonical)
- Structured data / JSON-LD
- Sitemap configuration
- Astro component file structure and naming
- Sanity CMS integration (`Site 2/src/sanity/`)
- Data files (`portfolio.ts`, `services.ts`)

---

## Three-Phase Plan

### Phase 1 — Extract Design System
- Analyze `Site 1/src/styles/global.css`
- Produce `design-system.md` (human-readable spec)
- Produce `tokens.css` (portable CSS custom properties only)

### Phase 2 — Design System Proof
- Build `design-test.html` to validate token transfer
- Check: surfaces, type scale, contrast, component sampler, dark/light modes
- Delete `design-test.html` after sign-off

### Phase 3 — Rebuild Site 2
- Add `Site 2/src/styles/tokens.css` from Phase 1
- Update `Site 2/src/layouts/BaseLayout.astro` with correct font links
- Rewrite component `<style>` blocks one at a time to use tokens
- Never hardcode a hex value, size, or spacing value

---

## Key Principles

- Tokens first, components second
- One component at a time — never bulk-replace styles
- The design proof is mandatory — Phase 2 cannot be skipped
- Structure is frozen — only the CSS/visual layer changes

---

## Deliverables

| File | Description |
|---|---|
| `design-system.md` | Human-readable visual spec extracted from Site 1 |
| `tokens.css` | Clean CSS custom properties (no component styles) |
| `design-test.html` | Temporary validation page — delete after Phase 2 |
| Restyled `Site 2/` | Full project with updated styles, layout, and components |

---

*Profile written: 2026-04-23 | Vibe Cartographer onboard session*
