import http from 'node:http';
import { fileURLToPath } from 'node:url';
import { project, apiRoutes } from '../../../shared/types/src/manifest.mjs';

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, { 'content-type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(payload, null, 2));
}

async function readJsonBody(request) {
  const chunks = [];
  for await (const chunk of request) {
    chunks.push(chunk);
  }

  if (chunks.length === 0) {
    return null;
  }

  const raw = Buffer.concat(chunks).toString('utf8');
  try {
    return JSON.parse(raw);
  } catch (error) {
    return { raw, parseError: 'invalid_json' };
  }
}

async function handleRequest(request, response) {
  const url = new URL(request.url || '/', 'http://localhost');

  if (url.pathname === '/health') {
    return sendJson(response, 200, { status: 'ok', project: project.slug });
  }

  if (url.pathname === '/manifest') {
    return sendJson(response, 200, { project, apiRoutes });
  }

  const route = apiRoutes.find((item) => item.method === request.method && item.path === url.pathname);

  if (!route) {
    return sendJson(response, 404, {
      error: "route_not_found",
      project: project.slug,
      available: apiRoutes.map((item) => `${item.method} ${item.path}`)
    });
  }

  const body = ['POST', 'PUT', 'PATCH'].includes(request.method || '') ? await readJsonBody(request) : null;

  return sendJson(response, 200, {
    project: project.slug,
    route: route.path,
    summary: route.summary,
    received: body,
    response: route.response
  });
}

export function startServer(port = Number(process.env.PORT || project.server.port)) {
  return new Promise((resolve) => {
    const server = http.createServer((request, response) => {
      handleRequest(request, response).catch((error) => {
        sendJson(response, 500, { error: "internal_error", message: error.message });
      });
    });

    server.listen(port, () => resolve(server));
  });
}

const isMain = process.argv[1] === fileURLToPath(import.meta.url);

if (isMain) {
  const server = await startServer();
  const address = server.address();
  const portNumber = address && typeof address === 'object' ? address.port : project.server.port;
  console.log(`${project.title} mock API escuchando en http://127.0.0.1:${portNumber}`);
}
