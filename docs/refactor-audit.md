# Refactor audit — Agencia Chucao

## Baseline condition

- **Framework:** Astro 6.4.2 static site.
- **Language:** TypeScript.
- **Package manager:** npm.
- **Node:** >=22.
- **Git status:** clean working tree (`eb4add0`).
- **Verification commands discovered:**
  - `npm run check` — Astro type check.
  - `npm run lint` — ESLint + Stylelint + text-quality script.
  - `npm run format:check` — Prettier check.
  - `npm run build` — Production build.
  - `npm run test:source` — Vitest source-hygiene tests.
  - `npm run test:build` — Playwright build-output tests.
  - `npm run test:a11y` — Playwright + axe-core accessibility tests.
  - `npm run test:consent` — Playwright analytics-consent tests.
  - `npm run test:lighthouse` — Lighthouse CI (not run at baseline due to time).

## Baseline verification results

All baseline checks passed before any edits:

| Command                | Result                                                            |
| ---------------------- | ----------------------------------------------------------------- |
| `npm run check`        | 0 errors, 0 warnings, 8 hints (`z` deprecated in `astro:content`) |
| `npm run lint`         | pass                                                              |
| `npm run format:check` | pass                                                              |
| `npm run build`        | pass (6 pages, sitemap, IndexNow submitted)                       |
| `npm run test:source`  | 4/4 pass                                                          |
| `npm run test:build`   | 7/7 pass                                                          |
| `npm run test:a11y`    | 4/4 pass                                                          |
| `npm run test:consent` | 3/3 pass                                                          |

Build emits a few `markdownAlternate` warnings from `@jdevalk/astro-seo-graph` about `.md` alternates that would 404; these are pre-existing and harmless.

## Audit findings

### 1. Dead / unused code

- `src/components/SEO.astro` — no imports anywhere.
- `src/lib/seo.ts` — only consumed by the unused `SEO.astro`.
- `src/lib/responsive-images.ts` — no imports.
- `src/lib/structured-data.ts` — `buildStructuredDataGraph` and `buildBreadcrumbList` are unused; only `buildFaqPage` is used from `src/pages/index.astro`.
- `site.cloudflareAnalyticsEnabled` in `src/config/site.ts` — referenced by no runtime code; the README explicitly states Cloudflare Web Analytics is not enabled.
- `site.socialProfiles` empty array — only referenced by the mostly-unused `structured-data.ts`.
- `initFaq` in `src/scripts/site.ts` queries `.faq-row__trigger`; the markup uses `.faq-q`, so this function never binds anything.
- `ContactForm.astro` defines `.form-field.invalid` and `.field-error.visible` states, but `site.ts` uses inline `display` and applies `.error` to a non-existent `.input` class, so those CSS states are unreachable.
- `src/pages/404.astro` references CSS custom properties (`--color-slate`, `--color-gold`, `--color-white`, `--font-display`) and classes (`.btn-primary-gold`, `.container`, `.section-py`) that do not exist anywhere in the project; the page renders with broken styling.

### 2. Duplication and DRY violations

- `BlogPostEntry` interface is copy-pasted in four files: `blog/index.astro`, `blog/[...slug].astro`, `blog/[...slug].md.ts`, `schema/post.json.ts`.
- WhatsApp URL construction is repeated in `index.astro`, `WhatsAppButton.astro`, `404.astro`, and `ContactForm.astro`.
- Brand/wordmark markup is duplicated in `Nav.astro` and `Footer.astro`.
- Breadcrumb label mapping for `contacto` / `politica-de-cookies` is duplicated in `utils/schema.ts` and `lib/structured-data.ts`.
- Inline arrow SVGs are repeated in multiple CTA buttons.

### 3. Complexity and structure issues

- `src/scripts/site.ts` mixes many unrelated responsibilities (header scroll, FAQ accordion, analytics link tracking, pricing observer, FAB visibility, contact-form validation, cookie banner). It is the top hotspot per repository health analysis.
- Two overlapping schema builders exist (`src/utils/schema.ts` for production layout, `src/lib/structured-data.ts` for the unused SEO component and FAQ schema).
- `BaseLayout.astro` imports schema builder from a relative `../utils/schema` path instead of the `@/` alias.
- Blog pages use relative imports (`../../layouts/...`) instead of project aliases.

### 4. BEM / naming inconsistencies

Many component-level class names are flat or appearance-based rather than BEM:

- `.nav`, `.nav-inner`, `.nav-meta`, `.nav-cta`
- `.foot`, `.foot-grid`, `.foot-tag`, `.foot-bottom`, `.foot-legal`
- `.hero-headline`, `.hero-lede`, `.hero-actions`, `.hero-trust`, `.flow-panel`, `.flow-step`, `.flow-dot`, `.flow-connector`, `.flow-meta`, `.flow-meta-k`
- `.leak`, `.leak-body`, `.problem-trigger`
- `.offer-cell`, `.offer-grid`, `.offer-lede`, `.promise`
- `.how-lede`, `.steps`, `.step`, `.step-header`, `.timeline`
- `.proof-grid`, `.proof-event`, `.proof-mark`, `.proof-report`, `.proof-report-label`
- `.qual-grid`, `.qual-col`, `.qual-label`, `.qual-list`
- `.inc-col`, `.inc-list`, `.extras-block`, `.extras-list`
- `.price-grid`, `.price-col`, `.price-amt`, `.price-period`, `.price-note`
- `.founding-grid`, `.founding-intro`, `.founding-details`, `.detail-row`, `.detail-k`, `.detail-v`
- `.faq-q`, `.faq-a`, `.faq-a-inner`, `.ind`
- `.final-section`, `.final-actions`, `.final-btn`, `.wa-link`, `.final-microcopy`
- `.audit-hero`, `.audit-grid`, `.audit-aside`, `.audit-block`, `.audit-email`

Global layout/typography utilities are intentionally **not** forced into BEM (`.wrap`, `.section`, `.lede`, `.eyebrow`, `.kicker`, `.metric`, `.note`, `.btn`, `.btn-secondary`, `.btn-ghost`, `.h-rule`, `.scroll-reveal`, `.stat-counter`, `.form-field`, `.field-label`).

### 5. Known pre-existing defects (not introduced by this refactor)

- 404 page styling is broken due to missing tokens/classes.
- Contact form validation does not apply the intended `.invalid` visual state to fields.
- FAQ has a duplicate/ghost init path in `site.ts` that never matches.
- CSS font tokens reference `Geist` / `Instrument Serif` while the repository ships `JetBrains Mono`, `Lora`, `Montserrat` and has no `@font-face` rules; this changes visual output and is out of scope for a behavior-preserving refactor.

## Planned passes

1. **Establish baseline & document** — record verification results (done above).
2. **Remove confidently dead code** — delete `SEO.astro`, `lib/seo.ts`, `lib/responsive-images.ts`; remove unused `site` config keys; remove dead `initFaq` from `site.ts`.
3. **Fix obvious defects** — repair 404 styling with existing tokens; align contact-form error classes with the validation script; remove the ghost FAQ init.
4. **Consolidate duplication** — create a shared `BlogPostEntry` type; add a `buildWhatsAppUrl` helper; extract a `Brand` component; move FAQ schema builder closer to usage; normalize breadcrumb labels.
5. **BEM migration** — rename component-level classes to BEM in the major sections and update all markup, styles, JS selectors, and tests.
6. **Simplify structure** — split `site.ts` into focused modules (analytics bindings, header, form, cookie banner, FAQ); simplify `BaseLayout` imports.
7. **Verification** — run lint, type-check, build, and all Playwright suites after each meaningful pass.

## Risks and deferred work

- BEM migration touches many files; selector renames must be exhaustive.
- Splitting `site.ts` must preserve the single bundled `<script>` loaded by `BaseLayout`.
- Font loading is intentionally deferred; fixing it would change visual output.
- No dependency upgrades will be performed.
