# Analytics, CSP & Cookie Consent

## Summary

- **CSP** is configured in `public/_headers` (Cloudflare Pages static-header format).
- **Consent logic** lives in `src/scripts/site.ts`.
- **GTM** is loaded dynamically from `src/scripts/site.ts` **only after** the user accepts analytics cookies.
- **GA4** is configured **inside GTM** (measurement ID `G-N5RTH0S7BC`). No standalone `gtag.js` or hard-coded GA4 script exists in the repo.
- **Cloudflare Web Analytics** is **not intentionally used** and is **not allowed by CSP**. If Cloudflare injects it automatically, disable it in the Cloudflare dashboard.

## Architecture

### Consent model

Three states:

1. `unknown` — first visit, banner visible, no analytics scripts loaded.
2. `accepted` — GTM loads, GA4 tracks via GTM, consent cookie `chucao_consent=accepted` persists for 1 year.
3. `rejected` — no GTM load, no tracking hits, known analytics cookies are deleted, consent cookie `chucao_consent=rejected` persists for 1 year.

Key functions in `src/scripts/site.ts`:

- `getConsent()` — reads `chucao_consent` cookie.
- `loadGtm()` — injects `https://www.googletagmanager.com/gtm.js?id=GTM-PZPX7SK9` once.
- `pushConsentState(granted)` — pushes Google Consent Mode v2 (`ad_storage`, `analytics_storage`, `ad_user_data`, `ad_personalization`) to `dataLayer`.
- `deleteAnalyticsCookies()` — removes `_ga`, `_ga_*`, `_gid`, `_gat`, `_gcl_au`.
- `trackEvent(name, params)` — pushes custom events to `dataLayer` only when consent is `accepted`.
- `trackPageView()` — pushes a virtual `page_view_virtual` event to `dataLayer` on Astro client-side navigations.

### GTM loading behavior

- On **first visit** (unknown): `dataLayer` is initialized, consent state `denied` is pushed, GTM script is **not** injected.
- On **accept**: consent state `granted` is pushed, GTM script is injected, the banner is hidden.
- On **reject**: consent state `denied` is pushed, analytics cookies are wiped, banner is hidden.
- On **returning visit with accepted consent**: GTM loads immediately on `astro:page-load`.
- On **Astro view-transition navigation** (subsequent pages): if GTM is already loaded, a `page_view_virtual` event is pushed so GA4 continues tracking.

### Event map (dataLayer)

Site events pushed to `dataLayer` for GTM to consume:

| Event name          | Trigger location                                              | Parameters                                 |
| ------------------- | ------------------------------------------------------------- | ------------------------------------------ |
| `page_view_virtual` | Astro client-side navigation                                  | `page_location`, `page_path`, `page_title` |
| `cta_click`         | Hero primary, Hero ghost, Founding offer, Pricing, CTA final  | `location`                                 |
| `whatsapp_click`    | Contact form, CTA final, Founding offer, Floating button, 404 | `location`, `page`                         |
| `pricing_view`      | Pricing section intersects viewport (30%)                     | —                                          |
| `form_submit`       | Contact form successfully submitted                           | `form: "audit_request"`                    |

In GTM, create **Custom Event** triggers for each event name and map them to your GA4 event tags.

## CSP Configuration

File: `public/_headers`

```
Content-Security-Policy:
  default-src 'self';
  base-uri 'self';
  object-src 'none';
  frame-ancestors 'self';
  script-src 'self' 'unsafe-inline' https://www.googletagmanager.com;
  script-src-elem 'self' 'unsafe-inline' https://www.googletagmanager.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob: https://www.google-analytics.com https://stats.g.doubleclick.net;
  connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://api.web3forms.com;
  frame-src 'self' https://www.googletagmanager.com;
  font-src 'self' data:;
  worker-src 'self' blob:;
  manifest-src 'self';
  form-action 'self'
```

Notes:

- `unsafe-inline` for `script-src` is required because Astro `ClientRouter` injects inline scripts for view transitions.
- `unsafe-inline` for `style-src` is required because the site uses inline `style` attributes.
- `script-src-elem` is explicit so browsers do not fall back to `script-src` and produce confusing warnings.
- Cloudflare Insights (`static.cloudflareinsights.com`) is **intentionally omitted**. If you see CSP errors for it, disable Web Analytics in the Cloudflare dashboard.

## Cloudflare Web Analytics

The repo does **not** inject Cloudflare Web Analytics. If the browser still requests `static.cloudflareinsights.com/beacon.min.js`, it is being injected by the Cloudflare platform **outside the repo**.

Because we cannot consent-gate a script injected by the edge, the recommended fix is:

1. Open the Cloudflare dashboard for `agenciachucao.cl`.
2. Go to **Speed → Analytics** (or **Web Analytics**).
3. Disable Cloudflare Web Analytics / RUM (Real User Monitoring).
4. This removes the beacon injection and eliminates the CSP violation.

If you intentionally want Cloudflare Web Analytics:

- Add `https://static.cloudflareinsights.com` to `script-src`, `script-src-elem`, and `connect-src` in `public/_headers`.
- Be aware that the beacon may still load **before** cookie consent because Cloudflare injects it at the edge.

## Files changed

- `src/scripts/site.ts` — replaced direct gtag.js with GTM loader; added consent gating, cookie cleanup, virtual page views.
- `src/layouts/BaseLayout.astro` — removed `data-ga4-id` body attribute (no longer needed).
- `src/env.d.ts` — removed `gtag` and `ga-disable` declarations; kept `dataLayer`.
- `public/_headers` — expanded CSP with explicit `script-src-elem`, `frame-src`, `font-src`, `worker-src`, `manifest-src`, and GA4/GTM network sources.
- `.env.example` — replaced `PUBLIC_GA4_ID` with `PUBLIC_GTM_ID` comment.
- `docs/analytics-csp-consent.md` — this document.

## Manual QA checklist

Test in a **clean browser profile** or **incognito with extensions disabled**.

### 1. First visit (unknown consent)

1. Clear all site data for `agenciachucao.cl`.
2. Load the site.
3. **Expect:**
   - Cookie banner is visible.
   - **No** network requests to `googletagmanager.com`.
   - **No** network requests to `google-analytics.com`.
   - **No** `_ga`, `_gid`, `_gat`, `_gcl_au` cookies.
   - **No** Cloudflare Insights requests (if disabled in dashboard).
   - **No** CSP console errors.

### 2. Reject cookies

1. Click **Rechazar**.
2. Banner hides.
3. Reload the page.
4. **Expect:**
   - Banner stays hidden.
   - Still **no** GTM/GA4 requests.
   - Still **no** analytics cookies.

### 3. Accept cookies

1. Click **Gestionar cookies** (footer) or clear the `chucao_consent` cookie and reload.
2. Click **Aceptar**.
3. **Expect:**
   - `https://www.googletagmanager.com/gtm.js?id=GTM-PZPX7SK9` loads in Network tab.
   - GA4 collect hits appear (`google-analytics.com/g/collect` or `region1.google-analytics.com/g/collect`).
   - `_ga` and `_ga_*` cookies are created.
   - No CSP violations in console.
   - Only **one** page-view hit is sent on initial load.

### 4. Navigate with Astro view transitions

1. With consent accepted, click an internal link.
2. **Expect:**
   - A `page_view_virtual` dataLayer event is pushed.
   - A new GA4 hit is sent for the new page.

### 5. Duplicate check

1. In the Network tab, filter by `collect`.
2. **Expect:** exactly one hit per real page load / navigation.

### 6. GTM Preview / Tag Assistant

1. Enable [GTM Preview mode](https://tagmanager.google.com/) for container `GTM-PZPX7SK9`.
2. Accept cookies on the site.
3. **Expect:**
   - Container loads.
   - GA4 tag fires with measurement ID `G-N5RTH0S7BC`.
   - Custom events (`cta_click`, `whatsapp_click`, etc.) appear in the dataLayer.

### 7. Ad-blocker / privacy extensions

1. Enable uBlock Origin, Privacy Badger, or similar.
2. Reload the site.
3. **Expect:**
   - `net::ERR_BLOCKED_BY_CLIENT` may appear for `googletagmanager.com`.
   - This is **expected** and caused by the extension, not by the site.
   - Do not treat this as a bug.

## Known limitations

- `ERR_BLOCKED_BY_CLIENT` caused by browser privacy/ad blockers is expected and not fixable from the site.
- If Cloudflare Web Analytics is enabled in the Cloudflare dashboard, it may inject `beacon.min.js` before cookie consent. The repo CSP intentionally blocks it; disable it in the dashboard.
- No `<noscript>` GTM iframe is included. Users with JavaScript disabled are not tracked, which aligns with the consent-first requirement.
