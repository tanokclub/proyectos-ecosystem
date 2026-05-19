import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { project, apiRoutes } from '../shared/types/src/manifest.mjs';
import { startServer } from '../services/api-gateway/src/server.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const requiredPaths = [
  "README.md",
  "docs/source-plan.md",
  "docs/api-contracts.md",
  "shared/types/src/manifest.mjs",
  "services/api-gateway/src/server.mjs",
  "apps/mobile/README.md",
  "apps/admin-panel/README.md",
  "apps/map-editor/README.md",
  "services/auth-service/README.md",
  "services/route-service/README.md",
  "services/report-service/README.md",
  "services/traffic-service/README.md",
  "ml/traffic-prediction/README.md",
  "maps/osrm-config/README.md"
];

for (const relativePath of requiredPaths) {
  assert.equal(fs.existsSync(path.join(rootDir, relativePath)), true, `Missing ${relativePath}`);
}

assert.equal(project.slug, "vialatin");
assert.equal(Array.isArray(apiRoutes), true);
assert.equal(apiRoutes.length >= 2, true);

const server = await startServer(0);
const address = server.address();
assert.equal(address && typeof address === 'object', true);
const baseUrl = `http://127.0.0.1:${address.port}`;

const healthResponse = await fetch(`${baseUrl}/health`);
const healthPayload = await healthResponse.json();
assert.equal(healthPayload.status, 'ok');
assert.equal(healthPayload.project, project.slug);

const firstRoute = apiRoutes[0];
const requestInit = firstRoute.method === "POST"
  ? {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(firstRoute.requestExample || { sample: true })
    }
  : { method: firstRoute.method };

const routeResponse = await fetch(`${baseUrl}${firstRoute.path}`, requestInit);
const routePayload = await routeResponse.json();
assert.equal(routePayload.project, project.slug);
assert.equal(routePayload.route, firstRoute.path);

await new Promise((resolve, reject) => {
  server.close((error) => {
    if (error) {
      reject(error);
      return;
    }

    resolve();
  });
});

console.log(`${project.title}: validate ok (${apiRoutes.length} mock routes)`);
