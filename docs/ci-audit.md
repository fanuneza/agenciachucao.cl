# CI Audit — Agencia Chucao

## Date

2026-05-10

## Project Stack

- **Framework:** Astro 6 (static output)
- **Package manager:** npm
- **Node:** >=22
- **TypeScript:** 5.7 with Astro strict config
- **Linting:** ESLint (astro + typescript plugins), Stylelint
- **Formatting:** Prettier with astro plugin
- **Testing:** Playwright (@playwright/test, @axe-core/playwright)
- **Performance:** Lighthouse CI (@lhci/cli)
- **CI provider:** GitHub Actions

---

## Current CI Summary (Before)

### `ci.yml` (push / PR to `main`)

**Job: `lint-and-build`**

1. Checkout
2. Setup Node.js (from `.nvmrc`)
3. `npm ci`
4. `npm run lint`
5. `npm run format:check`
6. `npm run build`
7. Lighthouse CI (`npm install -g @lhci/cli && lhci autorun`)

**Job: `test`** (depends on `lint-and-build`)

1. Checkout
2. Setup Node.js
3. `npm ci`
4. Install Playwright browsers
5. `npm run build` (second build, no artifact sharing)
6. `npx playwright test`

### `deploy.yml` (on `deployment_status` success)

1. Checkout
2. Setup Node.js
3. `npm ci`
4. Install Playwright browsers
5. `npx playwright test` against deployed URL

### Test files

- `tests/visual/a11y.spec.ts` — axe-core accessibility scans for 4 pages
- `tests/visual/capture.spec.ts` — 16 screenshot captures across 4 viewports (zero assertions)

---

## Classification of Checks

| Check                                    | Verdict               | Reasoning                                                                                                                           |
| ---------------------------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Format check**                         | Essential             | Prevents style drift and noisy diffs                                                                                                |
| **Lint (ESLint + Stylelint)**            | Essential             | Catches syntax errors, unused code, and CSS issues                                                                                  |
| **Build (`astro check && astro build`)** | Essential             | Type-checks Astro/TS and confirms the site compiles                                                                                 |
| **Lighthouse CI**                        | Redundant / noisy     | All assertions configured as `warn` — never fails CI. Adds global npm install overhead and upload time without blocking regressions |
| **Playwright a11y tests**                | Essential             | Catches real accessibility regressions (axe-core, wcag2a/2aa/21aa)                                                                  |
| **Playwright capture tests**             | Redundant             | 16 screenshot tests with zero assertions. Only writes files to `.cache/parity`. Never fails, wastes ~30s per run                    |
| **Deploy smoke tests (all Playwright)**  | Useful but incomplete | Running capture tests against deployed URL is still useless. A11y + build validation against live deployment is valuable            |
| **Type checking as standalone step**     | Missing               | Bundled inside `astro build`, so type errors are discovered late and mixed with build output                                        |
| **Build output validation**              | Missing               | No verification that expected pages, sitemap, or SEO metadata exist in the built site                                               |
| **SEO metadata checks**                  | Missing               | No protection against accidental removal of title, description, OG tags, or canonical links                                         |

### Key Problems

1. **Site built twice** — `lint-and-build` and `test` each run `npm run build` without sharing artifacts.
2. **capture.spec.ts is dead weight** — 16 tests that always pass because they assert nothing.
3. **Lighthouse CI is decorative** — Warn-only config means it consumes CI time without providing signal.
4. **Deploy workflow runs useless capture tests** — Screenshot tests against a deployed URL still have no assertions.
5. **Title duplication bug** — `index.astro` and `contacto.astro` passed `| Agencia Chucao` in the `title` prop while the `<SEO>` component also appended `| Agencia Chucao`, producing double site names. This was caught by the new build validation tests.

---

## Changes Made

### 1. Removed `tests/visual/capture.spec.ts`

- Zero-value in CI. Screenshots were saved to `.cache/parity` but never compared or persisted.
- Kept `PLAYWRIGHT_VISUAL_CAPTURE.md` for local visual parity workflows if needed.

### 2. Improved `tests/visual/a11y.spec.ts`

- Changed `waitUntil: "networkidle"` to `waitUntil: "load"` for faster, more reliable page loads on a static site.

### 3. Added `tests/build/build.spec.ts`

Validates the built site with deterministic assertions:

- **Pages render** — `/`, `/contacto/`, `/politica-de-cookies/` return 200 and have correct `<title>` and `<meta name="description">`
- **404 page** — renders without server error and has correct title
- **SEO metadata** — Open Graph tags (`og:type`, `og:title`, `og:description`, `og:image`, `og:image:width`, `og:image:height`) and Twitter card tags exist on the home page
- **Sitemap** — `/sitemap-index.xml` is accessible
- **Critical content** — home page has header, main, footer, and contact links; contact page has the expected form fields

### 4. Updated `playwright.config.ts`

- Changed `testDir` from `"./tests/visual"` to `"./tests"` so all test directories are discovered.

### 5. Updated `package.json` scripts

```json
{
  "test": "playwright test",
  "test:a11y": "playwright test tests/visual/a11y.spec.ts",
  "test:build": "playwright test tests/build/build.spec.ts",
  "test:lighthouse": "lhci autorun"
}
```

- Removed `capture:*` scripts.
- Kept `test:lighthouse` for local performance checks.

### 6. Consolidated `.github/workflows/ci.yml`

- Merged into a single `ci` job to eliminate the redundant second build.
- Steps: checkout → setup Node → `npm ci` → format check → lint → build → install Playwright → `npm test`
- Removed the Lighthouse CI step (all warnings, no signal).
- Removed the global `@lhci/cli` install.

### 7. Updated `.github/workflows/deploy.yml`

- Kept deploy smoke tests but now runs the same meaningful test suite (`npx playwright test`) against the deployed URL.
- No longer runs useless capture tests (they were deleted).

### 8. Fixed title duplication in source pages

- `src/pages/index.astro`: removed `| Agencia Chucao` from the `title` prop
- `src/pages/contacto.astro`: removed `| Agencia Chucao` from the `title` prop
- The `<SEO>` component already appends `| Agencia Chucao` automatically.

---

## Recommended Final CI Structure

```
CI (push / PR to main)
├── checkout
├── setup Node
├── npm ci
├── format:check
├── lint
├── build
├── install Playwright browsers
└── test (a11y + build validation)

Deploy Smoke Tests (deployment_status == success)
├── checkout
├── setup Node
├── npm ci
├── install Playwright browsers
└── test against PLAYWRIGHT_BASE_URL
```

---

## Local Commands

```bash
# Run all checks
npm run format:check
npm run lint
npm run build
npm test

# Run specific suites
npm run test:a11y
npm run test:build

# Local Lighthouse (optional, not run in CI)
npm run test:lighthouse
```

---

## Remaining Recommended Improvements (Not Implemented)

1. **Share build artifacts between CI steps**
   - Currently the single job builds and then tests against `astro preview`. This is simple and correct for a small static site. For larger sites, uploading `dist/` as an artifact and testing against it could save a rebuild in deploy workflows.

2. **Schema validation for data files**
   - `src/data/services.ts` exports structured data consumed by components. A lightweight runtime validation (e.g., Zod) or a small unit test could catch malformed entries before build. Not implemented because the current data surface is tiny and manually maintained.

3. **HTML validation**
   - Could add `html-validate` against the built `dist/` directory. Useful for catching invalid nesting or missing attributes, but currently not a source of regressions in this project.

4. **Link checking**
   - No external link validation is performed. Adding a crawler like `linkinator` against the built dist could catch broken internal or external links, but external link checks are brittle in CI. Consider only if internal link count grows.

5. **Security / dependency audit**
   - `npm audit` produces many false positives in frontend projects (especially dev dependencies). Not added to avoid noise. Review manually before major releases.
