import { getConsent, initializeAnalytics } from "./analytics";
import { initCookieBanner } from "./cookie-banner";
import { initContactForm } from "./contact-form";
import { initFabVisibility } from "./fab";
import { initHeader } from "./header";
import { initReveal } from "./reveal";
import { initAnalyticsLinks, initPricingObserver, trackPageView } from "./tracking";

let isFirstPageLoad = true;

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
  initReveal();
  initAnalyticsLinks();
  initPricingObserver();
  initFabVisibility();
  initContactForm();
  initCookieBanner();
}

document.addEventListener("DOMContentLoaded", initPage);
