import http from 'node:http';
import { fileURLToPath } from 'node:url';
import { project, apiRoutes } from '../../../packages/shared-types/src/manifest.mjs';
import { createEngine } from '../../../packages/shared-types/src/mock-engine.mjs';

// Motor mock con estado real (CRUD, filtros, búsqueda, OpenAPI, métricas). Cero dependencias.
// Endpoints extra: /health /manifest /openapi.json /_stats /metrics
// Query: ?limit ?offset ?q ?sort ?order ?campo=valor ?_delay=ms ?_fail=codigo
// Auth opcional: define API_KEY=... en el entorno.
const { handler } = createEngine({ project, apiRoutes });

export function startServer(port = Number(process.env.PORT || project.server.port)) {
  return new Promise((resolve) => {
    const server = http.createServer(handler);
    server.listen(port, () => resolve(server));
  });
}

const isMain = process.argv[1] === fileURLToPath(import.meta.url);
if (isMain) {
  const server = await startServer();
  const addr = server.address();
  const portNumber = addr && typeof addr === 'object' ? addr.port : project.server.port;
  console.log(`${project.title} mock API (stateful) escuchando en http://127.0.0.1:${portNumber}`);
  console.log(`  OpenAPI: http://127.0.0.1:${portNumber}/openapi.json · Métricas: /metrics · Stats: /_stats`);
}
