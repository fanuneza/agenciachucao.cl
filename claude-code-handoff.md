# Claude Code Handoff — Visual Unification Project

## Context

Two Astro sites have been built as prototypes. Both are deployed via Cloudflare Pages from separate GitHub repos. The goal is to start a fresh Astro project that combines the best of both: the **visual design and design system from Site 1**, and the **structure, component architecture, SEO, and technical specs from Site 2**.

---

## The Two Sites

### Site 1 — "The Beautiful One"
- **Built with:** Claude Design → Claude Code
- **Strengths:** Strong visual design, well-crafted aesthetics, good design system (colors, typography, spacing, component styles)
- **Weaknesses:** Not technically sound — poor component structure, SEO gaps, unclear content architecture
- **Role in this project:** Donor of the visual/design layer only

### Site 2 — "The Sound One"
- **Built with:** Claude Code + Vibe Cartographer plugin
- **Strengths:** Solid Astro architecture, correct SEO implementation (meta tags, structured data, sitemap, OG), proper component breakdown, all technical specs met
- **Weaknesses:** Visual design is weak — typography is generic, spacing is inconsistent, lacks the refined aesthetic of Site 1
- **Role in this project:** Structural and technical baseline — this is what gets rebuilt, not replaced

---

## What Has Already Been Tried (and Why It Failed)

Direct CSS migration from Site 1 to Site 2 was attempted using Claude Code. It did not work reliably because:

- Site 1's CSS was written for its own component structure, not Site 2's
- Class name conflicts, specificity issues, and layout assumptions were incompatible
- Piecemeal style porting creates regressions and inconsistencies across components

The decision was made to **start a new Vibe Cartographer session** rather than patch the existing Site 2.

---

## Your Task

### Phase 1 — Extract the Design System from Site 1

Before writing any new code, analyze Site 1's codebase and produce a clean, portable design system document. Do not copy raw CSS. Derive and document:

**Tokens to extract:**
- Color palette: all CSS custom properties (`--color-*`), both light and dark mode if present
- Typography: font families (with CDN URLs), font weights used, type scale values
- Spacing scale: any spacing tokens or recurring values
- Border radius values and their usage contexts
- Shadow definitions
- Transition/animation values

**Component patterns to document:**
- Button variants (primary, secondary, ghost) — anatomy, colors, radius, padding
- Card component — background, border, shadow, radius, padding
- Navigation — layout, colors, active states
- Any other recurring UI patterns

**Output:** A `design-system.md` file and a `tokens.css` file with clean, portable CSS custom properties. These two files are the entire output of Phase 1.

---

### Phase 2 — Design System Proof

Before touching Site 2 or any page code, create a standalone `design-test.html` that renders:

1. **Surface layer stack** — all background levels nested to show depth progression
2. **Type specimen** — all type scale steps with correct font at correct size
3. **Text contrast check** — primary, muted, and faint text on every surface level
4. **Component sampler** — button variants, a card, a form input, a badge
5. **Both light and dark mode** (if Site 1 supports dark mode; if not, implement light only for now)

Validate visually that the design system transferred correctly. Fix any drift here — not later when it's spread across components. Delete `design-test.html` after validation.

---

### Phase 3 — Rebuild Site 2 with the New Design System

Take Site 2's Astro project as the structural base. Do not change:
- Page routes and URL structure
- `<head>` SEO metadata (title, description, OG tags, canonical URLs)
- Structured data / JSON-LD
- Sitemap configuration
- Astro component file structure and naming
- Any existing API integrations or data fetching logic

Apply the extracted design system by:
1. Replacing or creating `src/styles/tokens.css` with the clean token file from Phase 1
2. Importing it globally in the base layout
3. Rewriting component `<style>` blocks one component at a time, referencing design tokens
4. Replacing font `<link>` tags in the base layout with the correct CDN links from Site 1

---

## File Structure to Follow

```
src/
├── styles/
│   ├── tokens.css       ← THE design system (output of Phase 1)
│   └── base.css         ← Reset + base element styles
├── layouts/
│   └── BaseLayout.astro ← Imports tokens.css and base.css globally; correct font <link> tags
└── components/
    └── (existing Site 2 components, style blocks rewritten to use tokens)
```

---

## Key Principles

- **Structure is frozen.** Only the CSS/visual layer changes.
- **Tokens first, components second.** Never hardcode a hex value, pixel size, or spacing value — everything references a CSS custom property.
- **One component at a time.** Restyle and validate each component before moving to the next. Do not do a bulk find-and-replace of styles.
- **The design system proof is mandatory.** Do not skip Phase 2. It exists to catch token drift before it propagates.
- **Preserve Astro scoped styles.** Use `<style>` blocks inside `.astro` files for component-specific styles. Use `tokens.css` for global custom properties only.

---

## Deliverables

| Deliverable | Description |
|---|---|
| `design-system.md` | Human-readable spec of all visual tokens and component patterns extracted from Site 1 |
| `tokens.css` | Clean, portable CSS custom properties file (no component styles, tokens only) |
| `design-test.html` | Temporary validation page — delete after Phase 2 sign-off |
| Restyled Astro project | Site 2's full project with updated `tokens.css`, `base.css`, layout, and component styles |

---

## Starting Point

Begin with Phase 1. Request access to Site 1's source files (or repository URL) and produce `design-system.md` and `tokens.css` before writing any component code.
