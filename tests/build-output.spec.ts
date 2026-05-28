import { expect, test } from "@playwright/test";

const requiredPages = [
  { path: "/", titleIncludes: "Agencia Chucao" },
  { path: "/contacto/", titleIncludes: "Agencia Chucao" },
  { path: "/404", titleIncludes: "Página no encontrada" },
];

for (const pageInfo of requiredPages) {
  test(`page output ${pageInfo.path}`, async ({ page }) => {
    const response = await page.goto(pageInfo.path, { waitUntil: "load" });
    expect(response?.status()).toBeLessThan(500);

    await expect(page.locator("body")).toBeVisible();
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page).toHaveTitle(new RegExp(pageInfo.titleIncludes, "i"));
    await expect(page.locator('meta[name="description"]')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:description"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveCount(1);
  });
}

test("robots and sitemap are available", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBe(true);
  expect(await robots.text()).toContain("Sitemap:");

  const sitemap = await request.get("/sitemap-index.xml");
  expect(sitemap.ok()).toBe(true);
});

test("json-ld scripts parse and include a graph", async ({ page }) => {
  await page.goto("/", { waitUntil: "load" });
  const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();

  expect(scripts.length).toBeGreaterThan(0);
  for (const script of scripts) {
    const parsed = JSON.parse(script) as { "@graph"?: unknown[] };
    expect(Array.isArray(parsed["@graph"])).toBe(true);
  }
});

test("security headers include standards directives", async ({ request }) => {
  const headers = await request.get("/_headers");
  expect(headers.ok()).toBe(true);
  const source = await headers.text();

  expect(source).toContain("Cross-Origin-Opener-Policy");
  expect(source).toContain("Cross-Origin-Resource-Policy");
  expect(source).toContain("script-src-attr 'none'");
  expect(source).toContain("https://static.cloudflareinsights.com");
  expect(source).toContain("https://cloudflareinsights.com");
  const csp = source
    .split("\n")
    .find((line) => line.includes("Content-Security-Policy"))
    ?.trim();
  expect(csp).toBeTruthy();
  expect(csp).not.toContain("*");
});
