import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import seoGraph from "@jdevalk/astro-seo-graph/integration";

export default defineConfig({
  output: "static",
  site: "https://agenciachucao.cl",
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  build: {
    inlineStylesheets: "always",
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/politica-de-cookies"),
    }),
    seoGraph({
      validateH1: true,
      validateUniqueMetadata: true,
      validateImageAlt: true,
      validateMetadataLength: true,
      validateInternalLinks: {
        skip: (href) =>
          href.startsWith("/api/") ||
          href.startsWith("/feed.xml") ||
          href.startsWith("/sitemap.xml") ||
          href.startsWith("/schemamap.xml") ||
          href.startsWith("/schema/"),
      },
      indexNow: {
        key: "591c2b87f0b68c44f260215f5d8e9da3",
        host: "agenciachucao.cl",
        siteUrl: "https://agenciachucao.cl",
      },
      markdownAlternate: true,
    }),
  ],
});
