import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const pages = [
  { name: "home", path: "/" },
  { name: "blog", path: "/blog/" },
  { name: "blog-detail", path: "/blog/por-que-no-aparezco-en-google/" },
  { name: "servicios", path: "/servicios/" },
  { name: "servicio-detail", path: "/servicios/desarrollo-web/" },
  { name: "portafolio", path: "/portafolio/" },
  { name: "sobre-nosotros", path: "/sobre-nosotros/" },
  { name: "contacto", path: "/contacto/" },
  { name: "politica-de-cookies", path: "/politica-de-cookies/" },
  { name: "404", path: "/404" },
];

for (const pageInfo of pages) {
  test(`a11y ${pageInfo.name}`, async ({ page }) => {
    await page.goto(pageInfo.path, { waitUntil: "networkidle" });
    await expect(page.locator("body")).toBeVisible();

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
}
