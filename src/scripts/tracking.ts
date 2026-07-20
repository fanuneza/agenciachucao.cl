import { trackEvent } from "./analytics";

const CTA_SELECTOR = "[data-track-event]";

export function trackPageView(): void {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "page_view_virtual",
    page_location: window.location.href,
    page_path: `${window.location.pathname}${window.location.search}`,
    page_title: document.title,
  });
}

export function initAnalyticsLinks(): void {
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

export function initPricingObserver(): void {
  const pricingSection = document.getElementById("precio");

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
