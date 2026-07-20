/**
 * Scroll-reveal choreography.
 *
 * Contract: content is fully visible without JS. The `.js-reveal` class (set
 * inline in <head> before paint) is what arms the hidden initial state, so a
 * no-JS or failed-parse render never ships a blank section. Reduced-motion
 * users and browsers without IntersectionObserver get everything at once.
 *
 * Opt in per element with `data-reveal`. Group a stagger by giving a shared
 * ancestor `data-reveal-group`; children receive an incremental `--i` used by
 * the CSS `transition-delay`.
 */

const REVEALED = "is-revealed";

function revealAll(nodes: Iterable<Element>): void {
  for (const node of nodes) node.classList.add(REVEALED);
}

export function initReveal(): void {
  const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
  if (targets.length === 0) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // No motion budget, or no observer support: show everything now.
  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealAll(targets);
    return;
  }

  // Assign stagger indices within each declared group.
  document.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
    group.querySelectorAll<HTMLElement>("[data-reveal]").forEach((child, index) => {
      if (child.style.getPropertyValue("--i") === "") {
        child.style.setProperty("--i", String(index));
      }
    });
  });

  const pending = new Set<HTMLElement>(targets);

  const reveal = (target: HTMLElement): void => {
    target.classList.add(REVEALED);
    observer.unobserve(target);
    pending.delete(target);
  };

  // Sweep anything already at or above the fold: covers fast flicks and
  // jump-to-anchor navigation, where an element can be leapt past before its
  // threshold crossing is sampled. Revealing an on-screen element is always
  // correct; below-fold elements (top > innerHeight) stay pending for the IO.
  const sweep = (): void => {
    if (pending.size === 0) {
      detachScroll();
      return;
    }
    const fold = window.innerHeight * 0.92;
    for (const target of [...pending]) {
      if (target.getBoundingClientRect().top < fold) reveal(target);
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) reveal(entry.target as HTMLElement);
      }
      sweep();
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  // Throttled passive scroll backstop, so passed elements reveal even when the
  // observer goes quiet (nothing new left to intersect near the viewport).
  let ticking = false;
  const onScroll = (): void => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      sweep();
    });
  };
  const detachScroll = (): void => window.removeEventListener("scroll", onScroll);
  window.addEventListener("scroll", onScroll, { passive: true });

  targets.forEach((target) => observer.observe(target));

  // Last-resort net: if the observer never fired at all (broken IO, page parsed
  // while backgrounded), reveal everything so no section can ship blank.
  window.setTimeout(() => {
    if (!document.querySelector(`[data-reveal].${REVEALED}`)) revealAll(pending);
  }, 3000);
}
