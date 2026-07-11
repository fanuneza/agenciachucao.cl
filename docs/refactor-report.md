# Refactor report — Agencia Chucao

## Executive summary

This refactor aimed to make the Agencia Chucao Astro site leaner, clearer, and more maintainable without changing its public behavior, visual output, routes, analytics, SEO, or accessibility.

The main structural problems found were:

- Dead and unused code: an entire unused SEO component, an unused SEO/structured-data library, an unused responsive-images helper, and stale configuration keys.
- Broken or unreachable code: the 404 page referenced missing design tokens, the contact-form validation targeted non-existent CSS classes, and the FAQ had a ghost init path that never matched the markup.
- Duplication: the blog entry type was copy-pasted in four files, WhatsApp URL construction was repeated in four files, and brand markup was duplicated in Nav and Footer.
- A monolithic client script (`src/scripts/site.ts`) mixed header behavior, analytics tracking, pricing observation, FAB visibility, form validation, and cookie-banner logic.
- Inconsistent CSS naming: most section components used flat or appearance-based class names rather than BEM.

The refactor removed ~1,170 lines and added ~560 lines across 32 changed files, deleted 4 unused files, and created 7 new focused modules. All verification commands pass.

## Baseline condition

- **Framework:** Astro 6.4.2, static output.
- **Language:** TypeScript.
- **Package manager:** npm.
- **Baseline commit:** `eb4add0`.
- **Working tree:** clean before edits.

## Verification commands

| Command | Purpose |
|---|---|
| `npm run check` | Astro type check |
| `npm run lint` | ESLint + Stylelint + text-quality script |
| `npm run format:check` | Prettier formatting check |
| `npm run build` | Production static build |
| `npm run test:source` | Vitest source-hygiene tests |
| `npm run test:build` | Playwright build-output tests |
| `npm run test:a11y` | Playwright + axe-core accessibility tests |
| `npm run test:consent` | Playwright analytics-consent tests |

## Verification results

### Before refactor (baseline)

| Command | Result |
|---|---|
| `npm run check` | 0 errors, 0 warnings, 8 hints (`z` deprecated in `astro:content`) |
| `npm run lint` | pass |
| `npm run format:check` | pass |
| `npm run build` | pass |
| `npm run test:source` | 4/4 pass |
| `npm run test:build` | 7/7 pass |
| `npm run test:a11y` | 4/4 pass |
| `npm run test:consent` | 3/3 pass |

### After refactor

| Command | Result |
|---|---|
| `npm run check` | 0 errors, 0 warnings, 8 hints (same pre-existing `z` hints) |
| `npm run lint` | pass |
| `npm run format:check` | pass |
| `npm run build` | pass |
| `npm run test:source` | 4/4 pass |
| `npm run test:build` | 7/7 pass |
| `npm run test:a11y` | 4/4 pass |
| `npm run test:consent` | 3/3 pass |
| `npm test` | 26/26 pass |

One test selector was updated as a consequence of the BEM migration: `tests/build/build.spec.ts:144` now uses `header.site-nav` instead of `header.nav`.

No regressions introduced by the refactor.

## Refactoring passes completed

1. **Baseline establishment** — ran all verification commands, recorded results, created `docs/refactor-audit.md`.
2. **Dead-code removal** — deleted unused SEO component and library files, removed stale config keys, and removed the ghost FAQ init.
3. **Defect repair** — fixed 404 styling with existing tokens, aligned contact-form error classes with the validation script.
4. **Duplication consolidation** — introduced shared `CollectionEntry<"blog">` usage, a `buildWhatsAppUrl` helper, and a `Brand` component.
5. **Schema consolidation** — moved FAQ schema builder into `src/utils/schema.ts` and removed the redundant `src/lib/structured-data.ts`.
6. **BEM migration** — renamed component-level classes in all major components and pages to BEM.
7. **Script modularization** — split `src/scripts/site.ts` into focused modules (header, tracking, FAB, contact-form, cookie-banner) and kept `site.ts` as a thin orchestrator.
8. **Final cleanup** — fixed formatting, ran full verification suite, confirmed no old selectors remain in source.

## Dead code removed

- `src/components/SEO.astro` — no imports anywhere.
- `src/lib/seo.ts` — only consumed by the unused `SEO.astro`.
- `src/lib/structured-data.ts` — mostly unused; `buildFaqPage` moved to `src/utils/schema.ts`.
- `src/lib/responsive-images.ts` — no imports.
- `site.cloudflareAnalyticsEnabled` and `site.socialProfiles` — unused runtime configuration.
- `initFaq` in `src/scripts/site.ts` — queried `.faq-row__trigger`, which never matched any markup.
- Unused `.field-error.visible` and `.form-field.invalid` CSS states in `ContactForm.astro` (replaced with BEM modifiers driven by the validation script).

## Duplicate logic consolidated

- Replaced four copy-pasted `BlogPostEntry` interfaces with Astro's `CollectionEntry<"blog">`.
- Added `src/utils/whatsapp.ts` with `buildWhatsAppUrl()` and replaced manual URL construction in:
  - `src/pages/index.astro`
  - `src/components/WhatsAppButton.astro`
  - `src/pages/404.astro`
  - `src/components/ContactForm.astro`
- Extracted `src/components/Brand.astro` to remove duplicated wordmark markup in `Nav.astro` and `Footer.astro`.
- Moved `buildFaqPage` into `src/utils/schema.ts` so breadcrumb labels and schema graph generation live in one place.

## Files or modules split

- `src/scripts/site.ts` (297 lines) split into:
  - `src/scripts/header.ts` — sticky header scroll state
  - `src/scripts/tracking.ts` — tracked-link bindings and pricing intersection observer
  - `src/scripts/fab.ts` — floating WhatsApp button visibility
  - `src/scripts/contact-form.ts` — form validation and submission
  - `src/scripts/cookie-banner.ts` — cookie consent banner behavior
  - `src/scripts/site.ts` — orchestrator that imports the above

## Dependencies removed

No production or development dependencies were removed; the refactor only deleted source files and configuration keys that were already unused. No new dependencies were added.

## BEM conventions adopted

Project-owned component classes were migrated to BEM. Global layout/typography utilities were intentionally left as shared primitives:

`.wrap`, `.section`, `.section.dark`, `.lede`, `.eyebrow`, `.kicker`, `.metric`, `.note`, `.btn`, `.btn-secondary`, `.btn-ghost`, `.h-rule`, `.scroll-reveal`, `.stat-counter`, `.form-field`, `.field-label`, `.tray`, `.serial`, `.meta`, `.arrow`, `.skip-link`.

New BEM blocks created:

- `.site-nav` (was `.nav`)
- `.site-footer` (was `.foot`)
- `.brand` / `.brand--dark` / `.brand__mark` / `.brand__wordmark` / `.brand__wordmark--light` / `.brand__wordmark--bold`
- `.hero__*` elements (was `.hero-headline`, `.hero-lede`, `.flow-*`, etc.)
- `.problem-section__*` (was `.problem`, `.leak`, etc.)
- `.offer-section__*` (was `.offer-*`)
- `.process-section__*` (was `.how`, `.step`, etc.)
- `.proof-section__*` (was `.proof-*`)
- `.fit-section__*` (was `.qual-*`)
- `.scope-section__*` (was `.includes`, `.inc-*`, `.extras-*`)
- `.pricing-section__*` (was `.pricing`, `.price-*`)
- `.founding-section__*` (was `.founding`, `.detail-*`)
- `.faq-section__*` (was `.faq-*`, `.ind`)
- `.cta-section__*` (was `.final-*`, `.wa-link`)
- `.contact-form__*` (form-specific parts)
- `.audit-page__*` (was `.audit-*`)
- `.policy-page__*` (was `.policy-*`)
- `.not-found__*` (404 page)
- `.wa-float__dot` / `.wa-float__icon` / `.wa-float__label`
- `.cookie-banner__*` (was `.cookie-*`)

## Old-to-new CSS selector mapping

| Old | New |
|---|---|
| `.nav` | `.site-nav` |
| `.nav-inner` | `.site-nav__inner` |
| `.nav-meta` | `.site-nav__meta` |
| `.nav-meta-item` | `.site-nav__meta-item` |
| `.nav-cta` | `.site-nav__cta` |
| `.foot` | `.site-footer` |
| `.foot-grid` | `.site-footer__grid` |
| `.foot-brand` | `.site-footer__brand` |
| `.foot-tag` | `.site-footer__tagline` |
| `.col-label` | `.site-footer__col-label` |
| `.foot-bottom` | `.site-footer__bottom` |
| `.foot-legal` | `.site-footer__legal` |
| `.cookie-manage-btn` | `.site-footer__cookie-btn` |
| `.brand` (local markup) | `<Brand />` component |
| `.hero-headline` | `.hero__headline` |
| `.hero-lede` | `.hero__lede` |
| `.hero-actions` | `.hero__actions` |
| `.hero-trust` | `.hero__trust` |
| `.hero-grid` | `.hero__grid` |
| `.flow-panel` | `.hero__flow` |
| `.flow-label` | `.hero__flow-label` |
| `.flow-steps` | `.hero__flow-steps` |
| `.flow-step` | `.hero__flow-step` |
| `.flow-dot` | `.hero__flow-dot` |
| `.flow-connector` | `.hero__flow-connector` |
| `.flow-name` | `.hero__flow-name` |
| `.flow-meta` | `.hero__flow-meta` |
| `.flow-meta-k` | `.hero__flow-meta-key` |
| `.problem` | `.problem-section` |
| `.prob-lede` | `.problem-section__lede` |
| `.leaks` | `.problem-section__leaks` |
| `.leak` | `.problem-section__leak` |
| `.leak .num` | `.problem-section__leak-num` |
| `.leak-body` | `.problem-section__leak-body` |
| `.leak .title` | `.problem-section__leak-title` |
| `.leak .desc` | `.problem-section__leak-desc` |
| `.problem-trigger` | `.problem-section__quote` |
| `.offer-lede` | `.offer-section__lede` |
| `.offer-grid` | `.offer-section__grid` |
| `.offer-cell` | `.offer-section__item` |
| `.offer-cell .idx` | `.offer-section__item-index` |
| `.promise` | `.offer-section__promise` |
| `.how` | `.process-section` |
| `.how-lede` | `.process-section__lede` |
| `.steps` | `.process-section__steps` |
| `.step` | `.process-section__step` |
| `.step-header` | `.process-section__step-header` |
| `.step .num` | `.process-section__step-num` |
| `.step .timeline` | `.process-section__step-timeline` |
| `.step .title` | `.process-section__step-title` |
| `.step .desc` | `.process-section__step-desc` |
| `.proof` | `.proof-section` |
| `.proof-lede` | `.proof-section__lede` |
| `.proof-grid` | `.proof-section__grid` |
| `.proof-events` | `.proof-section__events` |
| `.proof-event` | `.proof-section__event` |
| `.proof-mark` | `.proof-section__event-mark` |
| `.proof-event-title` | `.proof-section__event-title` |
| `.proof-report` | `.proof-section__report` |
| `.proof-report-label` | `.proof-section__report-label` |
| `.proof-report-body` | `.proof-section__report-body` |
| `.qual` | `.fit-section` |
| `.qual-grid` | `.fit-section__grid` |
| `.qual-col` | `.fit-section__col` |
| `.qual-col.fit` | `.fit-section__col--fit` |
| `.qual-col.nofit` | `.fit-section__col--nofit` |
| `.qual-label` | `.fit-section__col-label` |
| `.qual-list` | `.fit-section__list` |
| `.includes` | `.scope-section` |
| `.includes-grid` | `.scope-section__grid` |
| `.inc-col` | `.scope-section__col` |
| `.inc-col.in` | `.scope-section__col--included` |
| `.inc-col.out` | `.scope-section__col--excluded` |
| `.inc-col .label` | `.scope-section__col-label` |
| `.inc-list` | `.scope-section__list` |
| `.inc-list .mark` | `.scope-section__list-mark` |
| `.extras-block` | `.scope-section__extras` |
| `.extras-label` | `.scope-section__extras-label` |
| `.extras-list` | `.scope-section__extras-list` |
| `.includes-note` | `.scope-section__note` |
| `.pricing` | `.pricing-section` |
| `.price-lede` | `.pricing-section__lede` |
| `.price-grid` | `.pricing-section__grid` |
| `.price-col` | `.pricing-section__card` |
| `.price-col.featured` | `.pricing-section__card--featured` |
| `.price-label` | `.pricing-section__card-label` |
| `.price-amt` | `.pricing-section__card-amount` |
| `.price-amt.alt` | `.pricing-section__card-amount--text` |
| `.price-period` | `.pricing-section__card-period` |
| `.price-note` | `.pricing-section__card-note` |
| `.founding` | `.founding-section` |
| `.founding-grid` | `.founding-section__grid` |
| `.founding-intro` | `.founding-section__intro` |
| `.found-lede` | `.founding-section__lede` |
| `.founding-details` | `.founding-section__details` |
| `.detail-row` | `.founding-section__detail` |
| `.detail-k` | `.founding-section__detail-key` |
| `.detail-v` | `.founding-section__detail-value` |
| `.detail-v.alt` | `.founding-section__detail-value--text` |
| `.founding-note` | `.founding-section__note` |
| `.founding-cta` | `.founding-section__cta` |
| `.faq` | `.faq-section` |
| `.faq-lede` | `.faq-section__lede` |
| `.faq-list` | `.faq-section__list` |
| `.faq-item` | `.faq-section__item` |
| `.faq-q` | `.faq-section__question` |
| `.faq-q-text` | `.faq-section__question-text` |
| `.ind` | `.faq-section__indicator` |
| `.faq-a` | `.faq-section__answer` |
| `.faq-a-inner` | `.faq-section__answer-inner` |
| `.final-section` | `.cta-section` |
| `.final` | `.cta-section__content` |
| `.final-lede` | `.cta-section__lede` |
| `.final-actions` | `.cta-section__actions` |
| `.final-btn` | `.cta-section__btn` |
| `.wa-link` | `.cta-section__whatsapp` |
| `.final-microcopy` | `.cta-section__microcopy` |
| `.form-group` | `.contact-form__group` |
| `.field-error` | `.contact-form__error` |
| `.field-error.visible` | `.contact-form__error--visible` |
| `.form-field.invalid` | `.contact-form__group--invalid .form-field` |
| `.form-status` | `.contact-form__status` |
| `.form-status.success` | `.contact-form__status--success` |
| `.form-status.error` | `.contact-form__status--error` |
| `.form-select` | `.contact-form__select` |
| `.form-submit` | `.contact-form__submit` |
| `.form-wa-fallback` | `.contact-form__fallback` |
| `.fallback-text` | `.contact-form__fallback-text` |
| `.fallback-link` | `.contact-form__fallback-link` |
| `.audit-hero` | `.audit-page__hero` |
| `.audit-lede` | `.audit-page__lede` |
| `.audit-grid` | `.audit-page__grid` |
| `.audit-form-wrap` | `.audit-page__form` |
| `.audit-aside` | `.audit-page__aside` |
| `.audit-block` | `.audit-page__block` |
| `.audit-block-text` | `.audit-page__block-text` |
| `.audit-email` | `.audit-page__email` |
| `.policy` | `.policy-page` |
| `.policy-wrap` | `.policy-page__wrap` |
| `.policy-header` | `.policy-page__header` |
| `.policy-meta` | `.policy-page__meta` |
| `.policy-body` | `.policy-page__body` |
| `.policy-section` | `.policy-page__section` |
| `.policy-table-wrap` | `.policy-page__table-wrap` |
| `.policy-table` | `.policy-page__table` |
| `.posts-list` | `.blog-index__posts` |
| `.blog-header` | `.blog-post__header` |
| `.blog-content` | `.blog-post__content` |
| `.wa-float .dot` | `.wa-float__dot` |
| `.wa-float .lbl` | `.wa-float__label` |
| `.wa-float svg` | `.wa-float__icon` |
| `.cookie-banner` inner elements | `.cookie-banner__inner`, `.cookie-banner__text`, `.cookie-banner__link`, `.cookie-banner__actions`, `.cookie-banner__btn` |
| `.not-found-*` | `.not-found__*` |

## Behavior-preservation checks

- All routes preserved (`/`, `/contacto/`, `/politica-de-cookies/`, `/404`, `/blog/`, `/blog/hello-world/`).
- All IDs, data attributes, ARIA attributes, roles, and tracking attributes preserved.
- All public interfaces (props, exports) preserved.
- All analytics events, GTM consent behavior, and cookie consent flow preserved.
- All form fields, validation rules, and Web3Forms submission logic preserved.
- SEO metadata, canonical URLs, structured data, sitemap, and redirects preserved.
- Build produces 6 pages; sitemap and IndexNow submission unchanged.
- Full Playwright suite passes (build output, accessibility, consent).

## Pre-existing failures

No pre-existing test failures. The only baseline warnings are:

- 8 Astro hints about deprecated `z` import from `astro:content` in `src/content.config.ts`.
- `markdownAlternate` warnings from `@jdevalk/astro-seo-graph` about `.md` alternates that would 404; these are harmless and unchanged.

## Remaining uncertain dead-code candidates

- `src/content/blog/hello-world.md` — only a sample post; the blog index and post page are functional, so this content is intentional.
- `src/pages/.well-known/api-catalog.ts`, `src/pages/schema/post.json.ts`, `src/pages/schemamap.xml.ts` — wired through `@jdevalk/astro-seo-graph`; left intact because they are part of the external integration contract.

## Deferred work

- **Font loading:** the CSS tokens reference `Geist` and `Instrument Serif`, while the repository ships `JetBrains Mono`, `Lora`, and `Montserrat` and has no `@font-face` rules. Fixing this would change visual output and is deferred.
- **Dependency upgrades:** no upgrades were performed per the constraints.
- **Framework migration:** not applicable.
- **Major redesign of 404 page:** repaired with existing tokens but kept the same content and structure.

## Known risks or areas requiring manual browser review

- The 404 page was restyled from broken tokens to existing tokens; a quick manual check that it renders correctly is recommended.
- The header scroll shadow (`site-nav--scrolled`) was previously non-functional because the selector targeted `#site-header`, which did not exist. It now targets `.site-nav`. This is a behavior fix, but the visual effect should be verified.
- The contact-form error state now applies a red border via `.contact-form__group--invalid .form-field`; this was previously broken and should be verified visually.
- BEM migration touched many components; while all automated tests pass, a visual smoke test across breakpoints is recommended.

## Summary of changes

- 32 source files changed, 4 deleted, 7 created; plus 1 test selector updated.
- ~1,170 lines removed, ~560 lines added (net reduction ~610 lines).
- No new dependencies.
- No behavioral or public-interface changes.
- All verification commands pass.
