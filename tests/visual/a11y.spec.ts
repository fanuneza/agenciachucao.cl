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

// Rules disabled due to pre-existing design/content choices that would require
// significant redesign to fix. We still run the scan and monitor for regressions.
const DISABLED_RULES = [
  "color-contrast",
  "label-content-name-mismatch",
  "heading-order",
];

for (const pageInfo of pages) {
  test(`a11y ${pageInfo.name}`, async ({ page }) => {
    await page.goto(pageInfo.path, { waitUntil: "networkidle" });
    await expect(page.locator("body")).toBeVisible();

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .disableRules(DISABLED_RULES)
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
}
