import { describe, expect, it } from "vitest";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const root = process.cwd();
const textExtensions = new Set([".astro", ".css", ".js", ".json", ".md", ".mjs", ".svg", ".ts", ".txt"]);

function filesIn(directory: string): string[] {
  if (!existsSync(directory)) return [];

  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    if (statSync(path).isDirectory()) return filesIn(path);
    return path;
  });
}

function textFilesIn(directory: string) {
  return filesIn(directory).filter((file) => textExtensions.has(extname(file)));
}

describe("source hygiene", () => {
  it("keeps analytics behind consent instead of direct GA4 loading", () => {
    for (const file of textFilesIn(join(root, "src"))) {
      const source = readFileSync(file, "utf8");
      expect(source, relative(root, file)).not.toContain("gtag/js");
      expect(source, relative(root, file)).not.toContain("google-analytics.com/gtag");
    }
  });

  it("uses first-party cookie consent instead of localStorage", () => {
    const analyticsSource = readFileSync(join(root, "src", "scripts", "analytics.ts"), "utf8");

    expect(analyticsSource).toContain("document.cookie");
    expect(analyticsSource).toContain("SameSite=Lax");
    expect(analyticsSource).not.toContain("localStorage");
  });

  it("uses the shared tracked-link contract for analytics anchors", () => {
    for (const file of textFilesIn(join(root, "src"))) {
      const source = readFileSync(file, "utf8");
      expect(source, relative(root, file)).not.toContain("data-analytics-event");
      expect(source, relative(root, file)).not.toContain("whatsapp_click");
      expect(source, relative(root, file)).not.toContain("cta_click");
    }
  });

  it("does not ship placeholder or corrupted Spanish text markers", () => {
    const files = [...textFilesIn(join(root, "src")), ...textFilesIn(join(root, "public"))];
    const corruptedMarkers = ["REPLACE_WITH_", "Ã³", "Ã©", "Ã­", "Ã±", "Â"];

    for (const file of files) {
      const source = readFileSync(file, "utf8");
      for (const marker of corruptedMarkers) {
        expect(source, relative(root, file)).not.toContain(marker);
      }
    }
  });
});
