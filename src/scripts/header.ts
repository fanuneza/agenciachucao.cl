let headerScrollListenerBound = false;
let menuBound = false;

interface SpyEntry {
  id: string;
  link: HTMLAnchorElement;
  section: HTMLElement;
}
let spyEntries: SpyEntry[] = [];

function updateHeaderState(): void {
  const header = document.querySelector<HTMLElement>(".site-nav");
  header?.classList.toggle("site-nav--scrolled", window.scrollY > 80);

  // Scroll-progress hairline (0 → 1 across the whole document).
  const doc = document.documentElement;
  const scrollable = doc.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
  doc.style.setProperty("--scroll-progress", progress.toFixed(4));

  updateActiveSection();
}

/**
 * Highlight the nav link for the section currently under the reading line.
 * Geometry-based off the scroll handler so it survives fast flicks and
 * anchor-jump navigation (an IntersectionObserver can skip either).
 */
function updateActiveSection(): void {
  if (spyEntries.length === 0) return;
  const line = window.innerHeight * 0.3;
  const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;

  let activeId: string | null = null;
  for (const { id, section } of spyEntries) {
    if (section.getBoundingClientRect().top <= line) activeId = id;
  }
  // At the very bottom, make sure the last section reads as current.
  if (nearBottom) activeId = spyEntries[spyEntries.length - 1].id;

  for (const { id, link } of spyEntries) {
    if (id === activeId) link.setAttribute("aria-current", "true");
    else link.removeAttribute("aria-current");
  }
}

function initSectionSpy(): void {
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(".site-nav__link"));
  const entries: SpyEntry[] = [];
  for (const link of links) {
    const id = link.getAttribute("href")?.split("#")[1];
    if (!id) continue;
    const section = document.getElementById(id);
    if (!section) continue;
    entries.push({ id, link, section });
  }
  // DOM order, so "last section past the line" is unambiguous.
  entries.sort((a, b) => a.section.offsetTop - b.section.offsetTop);
  spyEntries = entries;
  updateActiveSection();
}

function initMenu(): void {
  if (menuBound) return;
  const header = document.querySelector<HTMLElement>(".site-nav");
  const toggle = header?.querySelector<HTMLButtonElement>(".site-nav__toggle");
  const menu = header?.querySelector<HTMLElement>(".site-nav__meta");
  if (!header || !toggle || !menu) return;
  menuBound = true;

  const setOpen = (open: boolean): void => {
    header.classList.toggle("site-nav--menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú de secciones" : "Abrir menú de secciones");
  };

  toggle.addEventListener("click", () => {
    setOpen(!header.classList.contains("site-nav--menu-open"));
  });

  // Close after picking a section, on Escape, or when resizing up to desktop.
  menu.addEventListener("click", (event) => {
    if ((event.target as HTMLElement).closest(".site-nav__link")) setOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && header.classList.contains("site-nav--menu-open")) {
      setOpen(false);
      toggle.focus();
    }
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 880) setOpen(false);
  });
}

export function initHeader(): void {
  if (!headerScrollListenerBound) {
    window.addEventListener("scroll", updateHeaderState, { passive: true });
    headerScrollListenerBound = true;
  }

  updateHeaderState();
  initMenu();
  initSectionSpy();
}
