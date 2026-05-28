import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const root = process.cwd();
const textExtensions = new Set([".astro", ".css", ".js", ".json", ".md", ".mjs", ".svg", ".ts", ".txt"]);
const scannedDirectories = ["src", "public"];
const badMarkers = ["Ã³", "Ã©", "Ã­", "Ã±", "Ã¡", "Â"];

function filesIn(directory) {
  if (!existsSync(directory)) return [];

  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    if (statSync(path).isDirectory()) return filesIn(path);
    return path;
  });
}

let failed = false;

for (const directory of scannedDirectories) {
  for (const file of filesIn(join(root, directory))) {
    if (!textExtensions.has(extname(file))) continue;

    const source = readFileSync(file, "utf8");
    for (const marker of badMarkers) {
      if (source.includes(marker)) {
        console.error(`${relative(root, file)} contains likely mojibake marker: ${marker}`);
        failed = true;
      }
    }
  }
}

if (failed) process.exit(1);
