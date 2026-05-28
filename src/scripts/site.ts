import {
  acceptAnalytics,
  getConsent,
  initializeAnalytics,
  rejectAnalytics,
  resetAnalyticsConsent,
  trackEvent,
} from "./analytics";

const CTA_SELECTOR = "[data-track-event]";

let headerScrollListenerBound = false;
let fabVisibilityListenerBound = false;
let isFirstPageLoad = true;

function trackPageView(): void {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "page_view_virtual",
    page_location: window.location.href,
    page_path: `${window.location.pathname}${window.location.search}`,
    page_title: document.title,
  });
}

function updateHeaderState(): void {
  const header = document.getElementById("site-header");
  header?.classList.toggle("site-header--scrolled", window.scrollY > 80);
}

function initHeader(): void {
  if (!headerScrollListenerBound) {
    window.addEventListener("scroll", updateHeaderState, { passive: true });
    headerScrollListenerBound = true;
  }

  updateHeaderState();
}

function initFaq(): void {
  document.querySelectorAll<HTMLButtonElement>(".faq-row__trigger").forEach((button) => {
    if (button.dataset.bound === "true") {
      return;
    }

    button.dataset.bound = "true";
    button.addEventListener("click", () => {
      const row = button.closest<HTMLElement>(".faq-row");

      if (!row) {
        return;
      }

      const isOpen = row.dataset.open === "true";
      row.dataset.open = String(!isOpen);
      button.setAttribute("aria-expanded", String(!isOpen));
    });
  });
}

function initAnalyticsLinks(): void {
  document.querySelectorAll<HTMLElement>(CTA_SELECTOR).forEach((element) => {
    if (element.dataset.trackBound === "true") {
      return;
    }

    element.dataset.trackBound = "true";
    element.addEventListener("click", () => {
      const eventName = element.dataset.trackEvent;

      if (!eventName) {
        return;
      }

      const params: Record<string, string | undefined> = {};

      if (element.dataset.trackLabel) params.content_name = element.dataset.trackLabel;
      if (element.dataset.trackLocation) params.content_location = element.dataset.trackLocation;
      if (element.dataset.trackDestination) params.link_url = element.dataset.trackDestination;
      if (element.dataset.trackCategory) params.content_type = element.dataset.trackCategory;

      trackEvent(eventName, params);
    });
  });
}

function initPricingObserver(): void {
  const pricingSection = document.getElementById("pricing");

  if (!pricingSection || pricingSection.dataset.pricingObserved === "true") {
    return;
  }

  pricingSection.dataset.pricingObserved = "true";

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) {
        return;
      }

      trackEvent("view_item", { item_name: "pricing", item_category: "lead_engine" });
      observer.disconnect();
    },
    { threshold: 0.3 }
  );

  observer.observe(pricingSection);
}

function initFabVisibility(): void {
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

function showFieldError(form: ParentNode, id: string, message: string): void {
  const error = form.querySelector<HTMLElement>(`#err-${id}`);
  const field = form.querySelector<HTMLElement>(`#${id}`);

  if (error) {
    error.textContent = message;
    error.style.display = "block";
  }

  field?.classList.add("error");
}

function clearFormErrors(form: ParentNode): void {
  form.querySelectorAll<HTMLElement>(".field-error").forEach((error) => {
    error.textContent = "";
    error.style.display = "none";
  });

  form.querySelectorAll<HTMLElement>(".input").forEach((input) => {
    input.classList.remove("error");
  });
}

function validateContactForm(form: HTMLFormElement, data: FormData): boolean {
  let valid = true;

  if (!String(data.get("clinica") ?? "").trim()) {
    showFieldError(form, "clinica", "Ingresa el nombre de la clínica.");
    valid = false;
  }

  if (!String(data.get("nombre") ?? "").trim()) {
    showFieldError(form, "nombre", "Ingresa tu nombre.");
    valid = false;
  }

  const phone = String(data.get("phone") ?? "").trim();
  if (!phone) {
    showFieldError(form, "phone", "Ingresa tu teléfono.");
    valid = false;
  } else if (!/^[+\d\s\-()]{7,}$/.test(phone)) {
    showFieldError(form, "phone", "El teléfono no parece válido.");
    valid = false;
  }

  if (!String(data.get("tratamiento") ?? "").trim()) {
    showFieldError(form, "tratamiento", "Selecciona el tratamiento principal.");
    valid = false;
  }

  return valid;
}

function initContactForm(): void {
  const form = document.getElementById("contact-form") as HTMLFormElement | null;

  if (!form || form.dataset.bound === "true") {
    return;
  }

  form.dataset.bound = "true";

  const submitButton = document.getElementById("form-submit-btn") as HTMLButtonElement | null;
  const successMessage = document.getElementById("form-success");
  const statusMessage = document.getElementById("form-status");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearFormErrors(form);

    const data = new FormData(form);
    if (!validateContactForm(form, data)) {
      return;
    }

    if (statusMessage) {
      statusMessage.textContent = "";
      statusMessage.className = "form-status";
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Enviando…";
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        body: data,
        method: "POST",
      });

      const json = (await response.json()) as { message?: string; success?: boolean };

      if (!response.ok || !json.success) {
        throw new Error(json.message ?? "Error desconocido");
      }

      form.hidden = true;
      successMessage?.removeAttribute("hidden");
      trackEvent("generate_lead", { form_name: "audit_request" });
    } catch {
      if (statusMessage) {
        statusMessage.textContent = "Hubo un problema al enviar. Por favor usa WhatsApp.";
        statusMessage.className = "form-status form-status--error";
      }

      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Solicita una revisión gratis";
      }
    }
  });
}

function initCookieBanner(): void {
  const banner = document.getElementById("cookie-banner");
  const acceptButton = document.getElementById("cookie-accept");
  const rejectButton = document.getElementById("cookie-reject");
  const manageButtons = document.querySelectorAll<HTMLElement>("[data-cookie-preferences]");

  if (!banner || !acceptButton || !rejectButton) {
    return;
  }

  const syncBanner = () => {
    banner.hidden = getConsent() !== "unknown";
  };

  if (acceptButton.dataset.bound !== "true") {
    acceptButton.dataset.bound = "true";
    acceptButton.addEventListener("click", () => {
      acceptAnalytics();
      syncBanner();
    });
  }

  if (rejectButton.dataset.bound !== "true") {
    rejectButton.dataset.bound = "true";
    rejectButton.addEventListener("click", () => {
      rejectAnalytics();
      syncBanner();
    });
  }

  manageButtons.forEach((button) => {
    if (button.dataset.bound === "true") {
      return;
    }

    button.dataset.bound = "true";
    button.addEventListener("click", (event) => {
      event.preventDefault();
      resetAnalyticsConsent();
      syncBanner();
      banner.scrollIntoView({ behavior: "smooth", block: "end" });
    });
  });

  syncBanner();
}

function initPage(): void {
  const consent = getConsent();
  initializeAnalytics();

  if (consent === "accepted") {
    if (!isFirstPageLoad) {
      trackPageView();
    }
  }

  isFirstPageLoad = false;

  initHeader();
  initFaq();
  initAnalyticsLinks();
  initPricingObserver();
  initFabVisibility();
  initContactForm();
  initCookieBanner();
}

document.addEventListener("DOMContentLoaded", initPage);
