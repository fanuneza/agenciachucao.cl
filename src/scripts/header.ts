let headerScrollListenerBound = false;

function updateHeaderState(): void {
  const header = document.querySelector<HTMLElement>(".site-nav");
  header?.classList.toggle("site-nav--scrolled", window.scrollY > 80);
}

export function initHeader(): void {
  if (!headerScrollListenerBound) {
    window.addEventListener("scroll", updateHeaderState, { passive: true });
    headerScrollListenerBound = true;
  }

  updateHeaderState();
}
