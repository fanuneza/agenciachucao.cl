import { expect, test } from "@playwright/test";

const pages = [
  {
    name: "home",
    path: "/",
    title: "Lead Engine para clínicas dentales en Santiago | Agencia Chucao",
    description: "Convertimos búsquedas activas en pacientes agendados.",
  },
  {
    name: "contacto",
    path: "/contacto/",
    title: "Solicita tu auditoría gratuita | Agencia Chucao",
    description: "Cuéntanos de tu clínica.",
  },
  {
    name: "politica-de-cookies",
    path: "/politica-de-cookies/",
    title: "Política de Cookies | Agencia Chucao",
    description: "Información sobre las cookies",
  },
] as const;

type JsonLdNode = Record<string, unknown>;

function getJsonLdGraph(script: string) {
  return JSON.parse(script) as { "@graph"?: unknown[] };
}

function getBreadcrumbLists(graph: unknown[]) {
  return graph.filter((node): node is JsonLdNode => {
    if (typeof node !== "object" || node === null) return false;
    const candidate = node as JsonLdNode;
    return candidate["@type"] === "BreadcrumbList" && Array.isArray(candidate.itemListElement);
  });
}

test.describe("pages render", () => {
  for (const pageInfo of pages) {
    test(`${pageInfo.name} renders with correct metadata`, async ({ page }) => {
      const response = await page.goto(pageInfo.path, { waitUntil: "load" });
      expect(response?.status()).toBe(200);
      await expect(page.locator("body")).toBeVisible();

      await expect(page).toHaveTitle(pageInfo.title);

      const metaDescription = page.locator('meta[name="description"]');
      await expect(metaDescription).toHaveAttribute("content", expect.stringContaining(pageInfo.description));

      const canonical = page.locator('link[rel="canonical"]');
      if (pageInfo.path === "/politica-de-cookies/") {
        await expect(canonical).toHaveCount(0);
      } else {
        await expect(canonical).toHaveCount(1);
      }
    });
  }

  test("404 page renders", async ({ page }) => {
    const response = await page.goto("/404", { waitUntil: "load" });
    expect(response?.status()).toBeLessThan(500);
    await expect(page.locator("body")).toBeVisible();
    await expect(page).toHaveTitle("Página no encontrada | Agencia Chucao");
  });
});

test.describe("SEO metadata", () => {
  test("home page has complete Open Graph tags", async ({ page }) => {
    await page.goto("/", { waitUntil: "load" });

    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "website");
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      expect.stringContaining("Agencia Chucao")
    );
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute("content", expect.anything());
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", expect.anything());
    await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute("content", "1200");
    await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute("content", "630");
  });

  test("home page has Twitter card tags", async ({ page }) => {
    await page.goto("/", { waitUntil: "load" });

    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
    // twitter:title and twitter:image are intentionally omitted by the SEO library
    // when they equal the og:title / og:image values — Twitter/X falls back to OG automatically.
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", expect.anything());
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", expect.anything());
  });

  test("sitemap is accessible", async ({ page }) => {
    const response = await page.goto("/sitemap-index.xml");
    expect(response?.status()).toBe(200);
    const body = await page.locator("body").textContent();
    expect(body).toContain("sitemap");
  });

  test("contacto page emits a breadcrumb list with itemListElement", async ({ page }) => {
    await page.goto("/contacto/", { waitUntil: "load" });
    const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(scripts.length).toBeGreaterThan(0);

    const breadcrumbLists = scripts.flatMap((script) => {
      const graph = getJsonLdGraph(script)["@graph"];
      return Array.isArray(graph) ? getBreadcrumbLists(graph) : [];
    });

    expect(breadcrumbLists).toHaveLength(1);

    const [breadcrumbList] = breadcrumbLists;
    const itemListElement = breadcrumbList.itemListElement as JsonLdNode[];
    expect(itemListElement).toHaveLength(2);

    for (const [index, item] of itemListElement.entries()) {
      expect(item).toMatchObject({
        "@type": "ListItem",
        position: index + 1,
      });
      expect(item).toHaveProperty("name");
      expect(item).toHaveProperty("item");
    }
  });

  for (const path of ["/politica-de-cookies/", "/404"]) {
    test(`${path} does not emit breadcrumb structured data`, async ({ page }) => {
      await page.goto(path, { waitUntil: "load" });
      const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();

      const breadcrumbLists = scripts.flatMap((script) => {
        const graph = getJsonLdGraph(script)["@graph"];
        return Array.isArray(graph) ? getBreadcrumbLists(graph) : [];
      });

      expect(breadcrumbLists).toHaveLength(0);
    });
  }
});

test.describe("critical content", () => {
  test("home page has expected sections", async ({ page }) => {
    await page.goto("/", { waitUntil: "load" });

    await expect(page.locator("header.nav")).toBeVisible();
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
    const contactLinks = page.locator('a[href="/contacto/"]');
    await expect(contactLinks.first()).toBeVisible();
  });

  test("contacto page has form", async ({ page }) => {
    await page.goto("/contacto/", { waitUntil: "load" });

    const form = page.locator("#contact-form");
    await expect(form).toBeVisible();
    await expect(form.locator("input[name='clinica']")).toBeVisible();
    await expect(form.locator("input[name='nombre']")).toBeVisible();
    await expect(form.locator("input[name='phone']")).toBeVisible();
    await expect(form.locator("select[name='tratamiento']")).toBeVisible();
  });
});
