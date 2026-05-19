import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { project, apiRoutes } from '../packages/shared-types/src/manifest.mjs';
import { startServer } from '../services/gateway/src/server.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const requiredPaths = [
  "README.md",
  "docs/source-plan.md",
  "docs/api-contracts.md",
  "packages/shared-types/src/manifest.mjs",
  "services/gateway/src/server.mjs",
  "apps/web/README.md",
  "apps/mobile/README.md",
  "apps/admin/README.md",
  "services/auth/README.md",
  "services/users/README.md",
  "services/streams/README.md",
  "services/chat/README.md",
  "services/payments/README.md",
  "services/notifications/README.md",
  "infrastructure/docker/README.md"
];

for (const relativePath of requiredPaths) {
  assert.equal(fs.existsSync(path.join(rootDir, relativePath)), true, `Missing ${relativePath}`);
}

assert.equal(project.slug, "kicklatam");
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
