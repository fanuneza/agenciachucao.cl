import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  output: "static",
  site: "https://agenciachucao.cl",
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/politica-de-cookies"),
    }),
  ],
});
