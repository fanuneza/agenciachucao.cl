let fabVisibilityListenerBound = false;

export function initFabVisibility(): void {
  if (fabVisibilityListenerBound) {
    return;
  }

  const syncFabVisibility = (target: EventTarget | null) => {
    const fab = document.getElementById("wa-float-btn");

    if (!fab) {
      return;
    }

    const focusedElement = target instanceof HTMLElement ? target : null;
    const isFormControl = focusedElement?.matches("input, textarea, select") ?? false;
    fab.style.display = isFormControl ? "none" : "";
  };

  document.addEventListener("focusin", (event) => syncFabVisibility(event.target));
  document.addEventListener("focusout", () => {
    window.requestAnimationFrame(() => syncFabVisibility(document.activeElement));
  });

  fabVisibilityListenerBound = true;
}
