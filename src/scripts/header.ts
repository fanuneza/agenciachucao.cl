let headerScrollListenerBound = false;
let menuBound = false;

function updateHeaderState(): void {
  const header = document.querySelector<HTMLElement>(".site-nav");
  header?.classList.toggle("site-nav--scrolled", window.scrollY > 80);
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
}
