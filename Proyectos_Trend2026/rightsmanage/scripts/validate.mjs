import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { project, apiRoutes } from '../packages/shared-types/src/manifest.mjs';
import { startServer } from '../services/api/src/server.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const requiredPaths = [
  'README.md', 'docs/source-plan.md', 'docs/api-contracts.md',
  'packages/shared-types/src/manifest.mjs',
  'services/api/src/server.mjs',
  'apps/web/package.json'
];
for (const rp of requiredPaths) {
  assert.equal(fs.existsSync(path.join(rootDir, rp)), true, `Missing ${rp}`);
}
assert.equal(project.slug, "rightsmanage");
assert.equal(Array.isArray(apiRoutes), true);
assert.equal(apiRoutes.length >= 4, true);

const server = await startServer(0);
const addr = server.address();
const baseUrl = `http://127.0.0.1:${addr.port}`;
const h = await (await fetch(`${baseUrl}/health`)).json();
assert.equal(h.status, 'ok');
const first = apiRoutes[0];
const init = first.method === 'POST' ? { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(first.requestExample || {}) } : { method: first.method };
const r = await (await fetch(`${baseUrl}${first.path}`, init)).json();
assert.equal(r.project, project.slug);
assert.equal(r.route, first.path);
await new Promise((res, rej) => server.close(e => e ? rej(e) : res()));
console.log(`${project.title}: validate ok (${apiRoutes.length} mock routes)`);
