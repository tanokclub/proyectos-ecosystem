import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projects = [
  "latamax",
  "paylat",
  "pinlat",
  "traduceLA",
  "kicklatam",
  "vialatin"
];

for (const slug of projects) {
  execFileSync("node", ["scripts/validate.mjs"], {
    cwd: path.join(__dirname, slug),
    stdio: "inherit"
  });
}

console.log(`Validated ${projects.length} projects.`);
