import { acceptAnalytics, getConsent, rejectAnalytics, resetAnalyticsConsent } from "./analytics";

export function initCookieBanner(): void {
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
