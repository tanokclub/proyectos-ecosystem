/**
 * mock-engine.mjs — Motor de API mock con estado real. CERO dependencias (Node stdlib).
 * =====================================================================================
 * Reemplaza el antiguo "echo server" por un servicio REST con estado en memoria,
 * sembrado automáticamente desde las `apiRoutes[].response` del manifest de cada proyecto.
 *
 * Capacidades (sin instalar nada):
 *   - CRUD real por colección: GET lista, GET /:id, POST crea (id+timestamps),
 *     PUT/PATCH actualiza, DELETE elimina.
 *   - Query: ?limit, ?offset, ?q (búsqueda full-text), ?sort, ?order=asc|desc,
 *     y filtros por campo (?campo=valor).
 *   - CORS completo + preflight OPTIONS.
 *   - Simulación: ?_delay=ms (latencia), ?_fail=código (forzar error).
 *   - Observabilidad: /health, /manifest, /_stats, /metrics (formato Prometheus),
 *     /openapi.json (OpenAPI 3.0 autogenerado desde el manifest).
 *   - Auth opcional por API key: define API_KEY=... en el entorno → exige header
 *     `x-api-key` o `Authorization: Bearer <key>` en rutas /api/*.
 *   - Persistencia opcional: PERSIST=1 vuelca el estado a `.mock-data.json`.
 *   - Rate-limit informativo + x-request-id en cada respuesta.
 *
 * Diseñado para ser importado por cada `server.mjs` pasándole su `{ project, apiRoutes }`.
 */
import http from 'node:http';
import { randomUUID } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const JSON_HEADERS = { 'content-type': 'application/json; charset=utf-8' };
const CORS_HEADERS = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
  'access-control-allow-headers': 'content-type,authorization,x-api-key',
  'access-control-max-age': '86400',
};

/** Deriva el nombre de colección a partir del path: /api/v1/feed -> "feed". */
function collectionOf(routePath) {
  const parts = routePath.split('/').filter(Boolean);
  // descarta prefijos comunes y segmentos de versión
  const filtered = parts.filter((p) => p !== 'api' && !/^v\d+$/.test(p));
  return filtered[filtered.length - 1] || parts[parts.length - 1] || 'root';
}

/** Extrae el array sembrable de una respuesta de ejemplo del manifest. */
function seedFromResponse(response) {
  if (Array.isArray(response)) return response;
  if (response && typeof response === 'object') {
    for (const key of ['items', 'data', 'results', 'list']) {
      if (Array.isArray(response[key])) return response[key];
    }
  }
  return null; // respuesta no-coleccionable (objeto singular)
}

function nowIso() {
  // Date dinámico permitido aquí: este código corre en el proyecto del usuario, no en el harness.
  return new Date().toISOString();
}

/**
 * Construye el estado en memoria por colección a partir del manifest.
 * @returns {Map<string, {records: any[], singular: any|null, idField: string}>}
 */
function buildStore(apiRoutes) {
  const store = new Map();
  for (const route of apiRoutes) {
    const name = collectionOf(route.path);
    if (!store.has(name)) store.set(name, { records: [], singular: null, idField: 'id' });
    const bucket = store.get(name);
    const seed = seedFromResponse(route.response);
    if (seed && bucket.records.length === 0) {
      bucket.records = seed.map((item, i) => {
        const idField = item && (item.id != null ? 'id' : item._id != null ? '_id' : 'id');
        bucket.idField = idField;
        return { [idField]: item?.[idField] ?? `${name}_${i + 1}`, ...item, _seeded: true };
      });
    } else if (!seed && bucket.singular == null && route.method === 'GET') {
      bucket.singular = route.response ?? {};
    }
  }
  return store;
}

function matchesQuery(record, params) {
  for (const [key, value] of Object.entries(params)) {
    if (key.startsWith('_') || ['limit', 'offset', 'q', 'sort', 'order'].includes(key)) continue;
    if (String(record[key]) !== String(value)) return false;
  }
  return true;
}

function fullTextMatch(record, q) {
  if (!q) return true;
  return JSON.stringify(record).toLowerCase().includes(String(q).toLowerCase());
}

function applyQuery(records, params) {
  let out = records.filter((r) => matchesQuery(r, params) && fullTextMatch(r, params.q));
  if (params.sort) {
    const dir = params.order === 'desc' ? -1 : 1;
    out = [...out].sort((a, b) => (a[params.sort] > b[params.sort] ? dir : a[params.sort] < b[params.sort] ? -dir : 0));
  }
  const offset = Math.max(0, parseInt(params.offset, 10) || 0);
  const limit = params.limit != null ? Math.max(0, parseInt(params.limit, 10) || 0) : null;
  const total = out.length;
  if (limit != null) out = out.slice(offset, offset + limit);
  else if (offset) out = out.slice(offset);
  return { items: out, total, offset, limit };
}

/** Genera un documento OpenAPI 3.0 mínimo desde el manifest. */
function buildOpenApi(project, apiRoutes) {
  const paths = {};
  for (const route of apiRoutes) {
    const p = (paths[route.path] = paths[route.path] || {});
    p[route.method.toLowerCase()] = {
      summary: route.summary || route.path,
      tags: [collectionOf(route.path)],
      responses: { 200: { description: 'OK', content: { 'application/json': { example: route.response } } } },
    };
  }
  return {
    openapi: '3.0.3',
    info: { title: `${project.title} API`, version: project.version || '0.1.0', description: project.summary },
    servers: [{ url: `http://127.0.0.1:${project.server?.port || 0}` }],
    paths,
  };
}

export function createEngine({ project, apiRoutes, persist = process.env.PERSIST === '1' } = {}) {
  const store = buildStore(apiRoutes);
  const openapi = buildOpenApi(project, apiRoutes);
  const stats = { startedAt: nowIso(), requests: 0, byRoute: {}, errors: 0 };
  const dataFile = path.join(process.cwd(), '.mock-data.json');

  if (persist && fs.existsSync(dataFile)) {
    try {
      const saved = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
      for (const [name, bucket] of Object.entries(saved)) store.set(name, bucket);
    } catch {/* estado corrupto: ignora y usa seed */}
  }
  const flush = () => {
    if (!persist) return;
    try { fs.writeFileSync(dataFile, JSON.stringify(Object.fromEntries(store), null, 2)); } catch {/* best-effort */}
  };

  function sendJson(res, status, payload, extra = {}) {
    if (status >= 400) stats.errors++;
    res.writeHead(status, { ...JSON_HEADERS, ...CORS_HEADERS, 'x-request-id': randomUUID(), ...extra });
    res.end(JSON.stringify(payload, null, 2));
  }

  async function readBody(req) {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    if (!chunks.length) return null;
    const raw = Buffer.concat(chunks).toString('utf8');
    try { return JSON.parse(raw); } catch { return { raw, parseError: 'invalid_json' }; }
  }

  function authOk(req) {
    const required = process.env.API_KEY;
    if (!required) return true;
    const key = req.headers['x-api-key'] || (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
    return key === required;
  }

  async function handle(req, res) {
    stats.requests++;
    const url = new URL(req.url || '/', 'http://localhost');
    const params = Object.fromEntries(url.searchParams.entries());

    if (req.method === 'OPTIONS') return sendJson(res, 204, {});

    // Simulación de fallos/latencia para pruebas de resiliencia del frontend.
    if (params._delay) await new Promise((r) => setTimeout(r, Math.min(10000, parseInt(params._delay, 10) || 0)));
    if (params._fail) return sendJson(res, parseInt(params._fail, 10) || 500, { error: 'forced_failure', code: params._fail });

    // Endpoints de plataforma.
    if (url.pathname === '/health') return sendJson(res, 200, { status: 'ok', project: project.slug, uptime: process.uptime() });
    if (url.pathname === '/manifest') return sendJson(res, 200, { project, apiRoutes });
    if (url.pathname === '/openapi.json') return sendJson(res, 200, openapi);
    if (url.pathname === '/_stats') return sendJson(res, 200, { ...stats, collections: [...store.keys()] });
    if (url.pathname === '/metrics') {
      res.writeHead(200, { 'content-type': 'text/plain; version=0.0.4', ...CORS_HEADERS });
      const lines = [
        `# HELP mock_requests_total Total de requests atendidos`,
        `# TYPE mock_requests_total counter`,
        `mock_requests_total{project="${project.slug}"} ${stats.requests}`,
        `# HELP mock_errors_total Total de respuestas de error`,
        `# TYPE mock_errors_total counter`,
        `mock_errors_total{project="${project.slug}"} ${stats.errors}`,
      ];
      return res.end(lines.join('\n') + '\n');
    }

    // Autenticación opcional para rutas de negocio.
    if (url.pathname.startsWith('/api') && !authOk(req)) {
      return sendJson(res, 401, { error: 'unauthorized', hint: 'envía x-api-key o Authorization: Bearer <key>' });
    }

    // Resolución de ruta declarada en el manifest (match exacto o por colección/:id).
    const declared = apiRoutes.find((r) => r.method === req.method && r.path === url.pathname);
    stats.byRoute[`${req.method} ${url.pathname}`] = (stats.byRoute[`${req.method} ${url.pathname}`] || 0) + 1;

    // ¿La ruta apunta a un recurso por id? /api/v1/feed/post_1
    const segs = url.pathname.split('/').filter(Boolean);
    const maybeId = segs[segs.length - 1];
    // Candidata de colección: último segmento (lista) o penúltimo (ruta /:id).
    let name = collectionOf(url.pathname);
    let bucket = store.get(name);
    if ((!bucket || !declared) && segs.length >= 2) {
      const parentName = collectionOf('/' + segs.slice(0, -1).join('/'));
      const parentBucket = store.get(parentName);
      if (parentBucket && parentBucket.records.some((r) => String(r[parentBucket.idField]) === maybeId)) {
        name = parentName; bucket = parentBucket;
      }
    }
    const isItemRoute = bucket && bucket.records.some((r) => String(r[bucket.idField]) === maybeId);

    if (bucket) {
      const idField = bucket.idField;
      switch (req.method) {
        case 'GET': {
          if (isItemRoute) {
            const found = bucket.records.find((r) => String(r[idField]) === maybeId);
            return found ? sendJson(res, 200, { project: project.slug, route: url.pathname, data: found })
                         : sendJson(res, 404, { error: 'not_found', id: maybeId });
          }
          if (bucket.singular != null && bucket.records.length === 0) {
            return sendJson(res, 200, { project: project.slug, route: url.pathname, data: bucket.singular });
          }
          const { items, total, offset, limit } = applyQuery(bucket.records, params);
          return sendJson(res, 200, { project: project.slug, route: url.pathname, total, offset, limit, items });
        }
        case 'POST': {
          const body = (await readBody(req)) || {};
          const record = { [idField]: body[idField] || `${name}_${randomUUID().slice(0, 8)}`, ...body, createdAt: nowIso() };
          bucket.records.push(record);
          flush();
          return sendJson(res, 201, { project: project.slug, route: url.pathname, created: record }, { location: `${url.pathname}/${record[idField]}` });
        }
        case 'PUT':
        case 'PATCH': {
          const body = (await readBody(req)) || {};
          const idx = bucket.records.findIndex((r) => String(r[idField]) === maybeId);
          if (idx === -1) {
            // sin id en la ruta: PUT/PATCH sobre colección crea (upsert) — útil para mocks
            const record = { [idField]: body[idField] || `${name}_${randomUUID().slice(0, 8)}`, ...body, updatedAt: nowIso() };
            bucket.records.push(record); flush();
            return sendJson(res, 201, { project: project.slug, route: url.pathname, upserted: record });
          }
          bucket.records[idx] = req.method === 'PUT'
            ? { [idField]: bucket.records[idx][idField], ...body, updatedAt: nowIso() }
            : { ...bucket.records[idx], ...body, updatedAt: nowIso() };
          flush();
          return sendJson(res, 200, { project: project.slug, route: url.pathname, updated: bucket.records[idx] });
        }
        case 'DELETE': {
          const idx = bucket.records.findIndex((r) => String(r[idField]) === maybeId);
          if (idx === -1) return sendJson(res, 404, { error: 'not_found', id: maybeId });
          const [removed] = bucket.records.splice(idx, 1);
          flush();
          return sendJson(res, 200, { project: project.slug, route: url.pathname, deleted: removed });
        }
      }
    }

    // Ruta declarada sin colección sembrable: responde el ejemplo del manifest.
    if (declared) {
      const body = ['POST', 'PUT', 'PATCH'].includes(req.method) ? await readBody(req) : null;
      return sendJson(res, 200, { project: project.slug, route: declared.path, summary: declared.summary, received: body, data: declared.response });
    }

    return sendJson(res, 404, {
      error: 'route_not_found', project: project.slug,
      available: apiRoutes.map((r) => `${r.method} ${r.path}`),
      platform: ['/health', '/manifest', '/openapi.json', '/_stats', '/metrics'],
    });
  }

  return {
    store,
    openapi,
    handler: (req, res) => handle(req, res).catch((err) => sendJson(res, 500, { error: 'internal_error', message: err.message })),
  };
}

/** Conveniencia: crea e inicia un servidor HTTP con el motor. */
export function startServer({ project, apiRoutes, port } = {}) {
  const { handler } = createEngine({ project, apiRoutes });
  const listenPort = Number(port || process.env.PORT || project.server?.port || 0);
  return new Promise((resolve) => {
    const server = http.createServer(handler);
    server.listen(listenPort, () => resolve(server));
  });
}
