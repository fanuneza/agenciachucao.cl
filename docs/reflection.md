# Reflection — Agencia Chucao Website (v3)

**Project:** agenciachucao.cl public launch + post-launch polish  
**Builder:** Fabián  
**Date:** 2026-04-25  
**Sessions covered:** Build → Public launch → Three iterate passes

---

## Part 1 — Process Check-In

### What actually happened

The build followed the checklist's 14-phase structure, landed on Cloudflare Pages, and launched publicly. The three post-launch iterate sessions caught real bugs (not hypotheticals) and moved through them fast — which is the right sequence. Shipping first, iterating from a live URL, is better than polishing indefinitely in dev.

The pattern that repeated across all three sessions: **bugs surfaced in clusters**. One CSS typo (`tabular-nums: tabular`) pointed toward other quiet failures nobody had noticed. The ad-blocker issue on the share bar led to discovering the emoji problem in WhatsApp links, which led to the contextual message audit. Problems compound — fixing one well tends to expose the next one.

### What worked

**The design system held.** Using `tokens.css` with zero hardcoded values meant every CSS fix was surgical. When the stat counter needed a property fix, there was no ambiguity about what value to use. When cards needed focus rings, `var(--color-orange)` was already defined and trusted. The token discipline from the scope document paid off across every polish pass.

**The iterate structure was effective.** Coming to each session with a list of ranked issues, ordered by impact vs. effort, let us cover a lot of ground without thrashing. "Do all of these except X" is a fast, clear decision format. Proposals first, then immediate execution, no back-and-forth on what to do.

**WhatsApp as primary CTA is well-implemented.** Every page now has a contextual message — service pages match the service, blog pages explain where the reader came from, the 404 is honest about the situation. The float button dynamically builds its message from `window.location.pathname`. This is a genuine UX improvement, not just polish.

### What to tighten next time

**Start the iterate pass with a Lighthouse/PageSpeed run.** Every session was done by reading code, not running the site. A 30-second audit of Core Web Vitals would have given harder signal on what to prioritize. The checklist spec required PageSpeed 100/100 desktop — that was never verified in these sessions.

**Track copy changes with a copy log.** Six OG descriptions and titles were rewritten across two sessions. Without a log, it's hard to answer "what did the meta description for the home page say before?" Copy is content — it deserves version tracking.

**Smoke-test after each batch of changes.** Several changes touched shared infrastructure (BaseLayout.astro, global.css, tokens.css). Each edit was individually clean, but the accumulated effect was never verified in a browser. Especially for accessibility work — adding `focus-visible` rings to cards is pointless if the colors fail contrast ratios in practice.

### On working with Fabián

Fabián thinks like an editor: clear scope, fast decisions, no tolerance for filler. He notices copy quality and uses it to push back ("that comma should not be accentuated" is a precise, correct note). He's comfortable redirecting mid-session without explanation — which means when he says "just the homepage hero," he means it, and the right move is to make that one change cleanly, not to ask clarifying questions.

He's a non-coder who reads code well enough to spot when something is off. The right explanation depth for him: explain what changed and why, not how CSS specificity works.

---

## Part 2 — Artifact Review

### What shipped in good shape

**`src/styles/tokens.css` and `src/styles/global.css`**  
The token layer is clean, consistent, and now correct (the `font-variant-numeric` fix). Adding `--color-facebook` as a token rather than hardcoding `#1877f2` directly in `SocialShare.astro` was the right call — consistent with how every other brand color is handled.

**`src/components/WhatsAppButton.astro`**  
Before: one static message for every page on the site. After: a JS lookup table keyed by URL pattern, service-specific messages that match `services.ts`, and a sensible SSR fallback for no-JS. This is the highest-value single change across all three sessions — it directly affects conversion quality.

**`src/components/SocialShare.astro`**  
The rename from `social-share`/`share-btn` to `post-relay`/`relay-btn` was necessary and clean. The new Facebook button rounds out the sharing options. The order (WhatsApp → LinkedIn → Facebook → X) correctly weights the channels by likelihood of use for a Chilean SMB audience.

**`src/layouts/BaseLayout.astro`**  
Three improvements in one file: `prefers-reduced-motion` support (correct behavior for users who opted out of motion), `theme-color` meta (small but complete), and the stat counter animation path fixed to not flash. The reduced-motion implementation is complete — both CSS (`animation: none` on hero elements) and JS (`instant-set` branch before `requestAnimationFrame`).

**`src/components/ServicePage.astro`**  
The description truncation fix (`lastIndexOf(' ', 158)` instead of `slice(0, 158)`) is the kind of bug that hurts quietly in search results for months before anyone notices. Fixed correctly.

### What exists but needs more work

**`src/pages/sobre-nosotros.astro`**  
The structure is solid — values grid, founder cards, CTA. But both founder images reference `placeholder.webp` files. The `Fabián` card lists "Estrategia y desarrollo" but has no last name, no media credentials, no Prey/ArchDaily/TVN context that the scope calls out as key trust signals. This page cannot do its job until real photos and full biographical copy land. Flagged in post-launch backlog.

**Blog (`src/content/blog/`)**  
Launched with three articles — all using hardcoded WhatsApp numbers (`wa.me/56922218674`) in inline CTAs within the Markdown body. These are now emoji-clean, but they still bypass the `PUBLIC_WA_NUMBER` env variable. If the number ever changes, they'll be stale. This is an acceptable launch compromise, but it should be tracked.

**`src/data/portfolio.ts`**  
Two `comingSoon` placeholder cards still sit in the grid — one for `Desarrollo Web`, one for `SEO Técnico`. Both have the same generic copy ("Nuevo proyecto en camino."). As the client roster grows, replacing these with real projects is the single highest-trust-signal improvement available on the portfolio page.

### What was left out of scope intentionally

**Publicidad en Google y Meta** is built, deployed, and in the sitemap, but not promoted from any nav or index page. This is a deliberate strategy — the service exists for organic discovery but isn't being actively sold. The correct call for a small agency that wants to control its pipeline.

**Sobre Nosotros nav link** is absent. The page is live but orphaned from navigation. The decision to add it later — once the page has real photos and complete copy — is the right call. A weak about page is worse than no about page link.

**CMS** is absent at launch. Markdown-only for blog content. The Sanity scaffold from Site 2 is in the post-launch roadmap. This is fine for a 3-article launch, but as content grows, the absence of a CMS will become a constraint on publishing velocity.

---

## What Lands, What Tightens Next Time

| Worked well | Tighten next time |
|-------------|-------------------|
| Design token discipline → every fix was clean | Run Lighthouse before/after iterate sessions |
| Iterate → build → iterate sequence | Track copy changes as structured versions |
| Fast proposal/decision format | Smoke-test accumulated changes in browser |
| WhatsApp contextual messages → real conversion improvement | Verify accessibility fixes visually, not just in code |
| Code quality maintained under polish pressure | Automate no-hardcoded-hex check as part of dev |

---

*Reflection written: 2026-04-25 · Vibe Cartographer /reflect*
