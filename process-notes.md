# Process Notes — Agencia Chucao Website (v3)

Append-only log of decisions, tensions, and discoveries per Vibe Cartographer phase.

---

## /spec — 2026-04-24

**Key decisions made:**

- **Blog: Markdown at launch, Sanity post-launch.** Scope's "No CMS" cut was honored. The Sanity scaffold in `Site 2/src/sanity/` is explicitly deferred to the post-launch upgrade path.
- **Lead magnet is IN.** Despite "No newsletter or email capture" in scope's explicit cuts, the builder clarified: lead magnet (PDF delivery via Brevo) is in scope. The cut refers to no newsletter list or follow-up sequences — this is a transactional send only.
- **Contact form: Web3Forms** (not Formspree from Site 2). Formspree + Brevo email list setup from Site 2 does not carry over.
- **Analytics: GA4 direct** (no GTM, no Mixpanel). Simpler than Site 2.
- **This is a functional build from scratch**, not a visual refactor of Site 2. Site 2 is frozen and used as a reference architecture only.
- **Plain CSS with token extraction** as the central design constraint. All values via `var(--token)` — no raw hex or px in component files.

**Tensions resolved:**

- Scope's "Explicit Cuts" listed "No newsletter or email capture" — builder confirmed this means no email marketing list, not no lead magnet. Lead magnet stays.
- Scope listed Web3Forms for ContactForm, but builder-profile listed it as "frozen" from Site 2 (which uses Formspree). Builder confirmed: this is a fresh build, so Web3Forms is correct per scope.
- Site 2 spec was used as input, but scope.md is the source of truth for features. Site 2's exit intent modal, cookie consent banner, GTM, and Mixpanel are explicitly out of scope for this build.

**Input used:**
- `docs/scope.md` — primary PRD (builder confirmed this is source of truth)
- `docs/builder-profile.md` — three-phase plan, frozen elements
- `Site 2/docs/spec.md` — reference architecture; Site 2 spec used for patterns, schemas, and data flows
- `claude-code-handoff.md` — project context and failure modes from prior attempts

**Deepening rounds:** 0 (builder provided comprehensive input via existing documents + one clarifying answer)

**Artifact:** `docs/spec.md`
