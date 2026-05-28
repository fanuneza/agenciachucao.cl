import { expect, test } from "@playwright/test";

test("GTM is not requested before consent", async ({ page }) => {
  const gtmRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("googletagmanager.com")) gtmRequests.push(request.url());
  });

  await page.goto("/", { waitUntil: "load" });

  expect(gtmRequests).toEqual([]);
  await expect(page.locator("#cookie-banner")).toBeVisible();
});

test("accepted consent injects one GTM script and granted consent state", async ({ page }) => {
  await page.route("https://www.googletagmanager.com/gtm.js**", async (route) => {
    await route.fulfill({ contentType: "application/javascript", body: "" });
  });

  await page.goto("/", { waitUntil: "load" });
  await page.locator("#cookie-accept").click();

  await expect(page.locator('script[src*="googletagmanager.com/gtm.js?id=GTM-PZPX7SK9"]')).toHaveCount(1);
  const consentState = await page.evaluate(() =>
    window.dataLayer?.find((entry) => {
      if (typeof entry !== "object" || entry === null || !("analytics_storage" in entry)) return false;
      return (entry as Record<string, unknown>).analytics_storage === "granted";
    })
  );
  expect(consentState).toBeTruthy();
});

test("rejected consent blocks behavioral events", async ({ page }) => {
  await page.goto("/", { waitUntil: "load" });
  await page.locator("#cookie-reject").click();
  await page.locator("#hero-cta-btn").evaluate((element) => {
    element.addEventListener("click", (event) => event.preventDefault(), { capture: true, once: true });
  });
  await page.locator("#hero-cta-btn").click();

  const trackedEvent = await page.evaluate(() =>
    window.dataLayer?.find((entry) => {
      if (typeof entry !== "object" || entry === null || !("event" in entry)) return false;
      return (entry as Record<string, unknown>).event === "select_content";
    })
  );
  expect(trackedEvent).toBeFalsy();
});
