import { site } from "@/config/site";

export type ConsentState = "unknown" | "accepted" | "rejected";
export type EventParams = Record<string, string | number | boolean | undefined>;

const consentCookie = "chucao_consent";
const yearInSeconds = 60 * 60 * 24 * 365;
const googleCookieNames = ["_ga", "_gid", "_gat", "_gcl_au"];

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

function setConsentCookie(value: Exclude<ConsentState, "unknown">) {
  document.cookie = `${consentCookie}=${value}; Max-Age=${yearInSeconds}; Path=/; SameSite=Lax; Secure`;
}

function clearConsentCookie() {
  document.cookie = `${consentCookie}=; Max-Age=0; Path=/; SameSite=Lax; Secure`;
}

export function getConsent(): ConsentState {
  const match = document.cookie.match(new RegExp(`(?:^|; )${consentCookie}=([^;]+)`));
  if (match?.[1] === "accepted" || match?.[1] === "rejected") return match[1];
  return "unknown";
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax; Secure`;
  document.cookie = `${name}=; Max-Age=0; Path=/; Domain=${window.location.hostname}; SameSite=Lax; Secure`;
}

function deleteAnalyticsCookies() {
  for (const name of googleCookieNames) deleteCookie(name);

  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0]?.trim();
    if (name?.startsWith("_ga")) deleteCookie(name);
  }
}

function pushConsent(granted: boolean) {
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event: "consent_update",
    ad_storage: granted ? "granted" : "denied",
    analytics_storage: granted ? "granted" : "denied",
    ad_user_data: granted ? "granted" : "denied",
    ad_personalization: granted ? "granted" : "denied",
  });
}

export function loadGtm() {
  if (!site.gtmId || document.querySelector(`script[src*="${site.gtmId}"]`)) return;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${site.gtmId}`;
  document.head.append(script);
}

export function acceptAnalytics() {
  setConsentCookie("accepted");
  pushConsent(true);
  loadGtm();
}

export function rejectAnalytics() {
  setConsentCookie("rejected");
  pushConsent(false);
  deleteAnalyticsCookies();
}

export function resetAnalyticsConsent() {
  clearConsentCookie();
  pushConsent(false);
  deleteAnalyticsCookies();
}

export function initializeAnalytics() {
  window.dataLayer = window.dataLayer ?? [];
  const consent = getConsent();
  pushConsent(consent === "accepted");
  if (consent === "accepted") loadGtm();
  if (consent === "rejected") deleteAnalyticsCookies();
}

export function trackEvent(name: string, params: EventParams = {}) {
  if (getConsent() !== "accepted") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: name, ...params });
}
