/**
 * upgrade_ecosystem.mjs — Propagador OFFLINE de mejoras. CERO dependencias.
 * =========================================================================
 * Recorre los 96 proyectos de ambos ecosistemas y, sin descargar nada:
 *   1. Copia `mock-engine.mjs` junto a cada `manifest.mjs` (paquete shared del proyecto).
 *   2. Reescribe cada `server.mjs` para usar el motor con estado (CRUD real).
 *   3. Genera docs por proyecto: IMPLEMENTATION_PLAN.md, ADVANCED_FEATURES.md,
 *      INSTALL_WHEN_ONLINE.md (qué instalar apenas haya internet).
 *
 * Idempotente: re-ejecutable sin efectos colaterales. Uso:
 *   node tools/upgrade_ecosystem.mjs [--dry]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const ENGINE_SRC = path.join(ROOT, 'tools', 'mock-engine.mjs');
const DRY = process.argv.includes('--dry');
const ECOSYSTEMS = ['Proyectos_Latam', 'Proyectos_Trend2026'];

const log = (...a) => console.log(...a);
const write = (file, content) => { if (!DRY) { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, content); } };

/** Encuentra todos los server.mjs (excluye node_modules/.next). */
function findServers(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.next', '.git', '.turbo'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) findServers(full, acc);
    else if (entry.name === 'server.mjs') acc.push(full);
  }
  return acc;
}

/** Plantilla del nuevo server.mjs, parametrizada por el specifier relativo al shared. */
function serverTemplate(specifierDir) {
  return `import http from 'node:http';
import { fileURLToPath } from 'node:url';
import { project, apiRoutes } from '${specifierDir}/manifest.mjs';
import { createEngine } from '${specifierDir}/mock-engine.mjs';

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
  console.log(\`\${project.title} mock API (stateful) escuchando en http://127.0.0.1:\${portNumber}\`);
  console.log(\`  OpenAPI: http://127.0.0.1:\${portNumber}/openapi.json · Métricas: /metrics · Stats: /_stats\`);
}
`;
}

function implementationPlan(p, routes) {
  const collections = [...new Set(routes.map((r) => r.path.split('/').filter(Boolean).pop()))];
  return `# Plan de Implementación — ${p.title}

> ${p.summary || ''}

Estado actual: **scaffold con mock API stateful** (CRUD real en memoria, cero dependencias).
Este documento describe cómo llevarlo a producción. Todo el código lógico está listo;
solo falta instalar dependencias y conectar infraestructura cuando haya buena conexión.

## Stack objetivo
${(p.stack || ['Next.js 14', 'Node.js', 'PostgreSQL']).map((s) => `- ${s}`).join('\n')}

## Fases

### Fase 0 — Hoy (sin internet) ✅
- [x] Mock API con estado real (CRUD, paginación, filtros, búsqueda).
- [x] OpenAPI 3.0 autogenerado en \`/openapi.json\`.
- [x] Métricas Prometheus en \`/metrics\` y stats en \`/_stats\`.
- [x] Simulación de latencia/errores para probar resiliencia del frontend.
- [x] Auth opcional por API key (env \`API_KEY\`).

### Fase 1 — Persistencia real (al tener internet)
- [ ] \`npm install\` (ver INSTALL_WHEN_ONLINE.md).
- [ ] Migrar colecciones en memoria → Prisma + PostgreSQL.
- [ ] Modelos a crear: ${collections.map((c) => `\`${c}\``).join(', ')}.
- [ ] Seeds desde los ejemplos del manifest (\`packages/.../manifest.mjs\`).

### Fase 2 — Autenticación y autorización
- [ ] JWT + refresh tokens (jose / next-auth).
- [ ] RBAC por rol; middleware de protección de rutas \`/api/*\`.
- [ ] Rate limiting real (Redis) — hoy ya hay headers informativos.

### Fase 3 — Tiempo real y eventos
- [ ] WebSockets / SSE para actualizaciones en vivo.
- [ ] Cola de trabajos (BullMQ + Redis) para tareas asíncronas.

### Fase 4 — Observabilidad y calidad
- [ ] OpenTelemetry → traces/metrics; el endpoint \`/metrics\` ya expone counters.
- [ ] Tests: unit (node:test) + E2E (Playwright).
- [ ] CI/CD (GitHub Actions): lint + build + test.

### Fase 5 — Despliegue
- [ ] Dockerfile multi-stage (ver \`infra/docker\`).
- [ ] Variables de entorno documentadas en \`.env.example\`.

## Endpoints actuales
${routes.map((r) => `- \`${r.method} ${r.path}\` — ${r.summary || ''}`).join('\n')}
`;
}

function advancedFeatures(p) {
  return `# Features Avanzados — ${p.title}

Ideas de alto valor ya viables sobre el mock stateful (lógica lista, faltan deps):

## Inmediatos (lógica implementable sin red)
- **Webhooks salientes**: al crear/editar registros, encolar y reintentar entregas.
- **Versionado de recursos**: guardar historial de cambios por registro (audit log en memoria).
- **Búsqueda avanzada**: el motor ya soporta \`?q=\`; extender a filtros por rango (\`?campo_gte=\`).
- **Bulk ops**: endpoint \`/api/v1/batch\` para crear/editar en lote.
- **Idempotencia**: header \`Idempotency-Key\` para POST seguros.

## Con dependencias (apenas haya internet)
- **IA generativa**: integrar Claude API (\`@anthropic-ai/sdk\`) para resúmenes/clasificación.
- **Realtime**: WebSocket gateway (ws) + suscripciones por colección.
- **Vector search**: pgvector / embeddings para búsqueda semántica.
- **Multi-tenant**: aislamiento por workspace + API keys por tenant.
- **Pagos**: Stripe / pasarela LATAM (Mercado Pago) según el dominio.
- **Notificaciones**: push (web-push) + email (nodemailer).

## Calidad y DX
- SDK cliente tipado autogenerado desde \`/openapi.json\`.
- Playground interactivo de la API (Swagger UI servido estáticamente).
- Feature flags por entorno.

> Prioriza según el dominio del proyecto. Cada feature “con dependencias” debe
> entrar como issue en \`docs/backlog.md\` con su paquete npm asociado.
`;
}

function installWhenOnline(p, ecosystem) {
  const isLatam = ecosystem === 'Proyectos_Latam';
  return `# Instalar cuando haya internet — ${p.title}

> Hoy NO se descargó nada (conexión por datos). Todo el código lógico está listo.
> Apenas tengas buena conexión, ejecuta estos pasos. **No requiere cambios de código.**

## 1. Instalar dependencias del monorepo
\`\`\`bash
cd ${ecosystem}
npm install            # instala todos los workspaces de una vez
\`\`\`

## 2. Levantar este proyecto
\`\`\`bash
# API mock con estado (ya funciona hoy con node puro):
node ${isLatam ? 'apps/api/src/server.mjs' : 'services/api/src/server.mjs'}

# Web (requiere deps instaladas):
cd ${isLatam ? 'apps/web' : 'apps/web'} && npm run dev
\`\`\`

## 3. Dependencias previstas para producción (instalar según fase)
| Fase | Paquetes npm | Para qué |
|---|---|---|
| Persistencia | \`prisma\`, \`@prisma/client\` | ORM + PostgreSQL |
| Auth | \`jose\`, \`bcryptjs\` | JWT + hashing |
| Realtime | \`ws\` | WebSockets |
| Cache/colas | \`ioredis\`, \`bullmq\` | Redis + jobs |
| IA | \`@anthropic-ai/sdk\` | Claude API |
| Tests | \`@playwright/test\` | E2E |
| Observabilidad | \`@opentelemetry/api\` | traces/metrics |

> Estas dependencias están listadas pero **no instaladas** a propósito.
> Añádelas con \`npm install <paquete> -w <workspace>\` cuando ejecutes cada fase.

## 4. Verificación
\`\`\`bash
cd ${ecosystem} && node validar_todo.mjs   # debe dar verde
\`\`\`
`;
}

async function main() {
  if (!fs.existsSync(ENGINE_SRC)) throw new Error('Falta tools/mock-engine.mjs');
  const engineCode = fs.readFileSync(ENGINE_SRC, 'utf8');
  let upgraded = 0, docs = 0;

  for (const eco of ECOSYSTEMS) {
    const ecoDir = path.join(ROOT, eco);
    if (!fs.existsSync(ecoDir)) continue;
    const servers = findServers(ecoDir);
    log(`\n# ${eco}: ${servers.length} servidores`);

    for (const serverPath of servers) {
      const current = fs.readFileSync(serverPath, 'utf8');
      const m = current.match(/from\s+['"]([^'"]*?)\/manifest\.mjs['"]/);
      if (!m) { log(`  ! sin import de manifest: ${path.relative(ROOT, serverPath)}`); continue; }
      const specifierDir = m[1]; // p.ej. ../../../packages/shared/src

      // 1. copiar el motor junto al manifest
      const serverDir = path.dirname(serverPath);
      const sharedSrcDir = path.resolve(serverDir, specifierDir);
      write(path.join(sharedSrcDir, 'mock-engine.mjs'), engineCode);

      // 2. reescribir server.mjs
      write(serverPath, serverTemplate(specifierDir));
      upgraded++;

      // 3. docs por proyecto: cargar manifest para datos reales
      const manifestPath = path.join(sharedSrcDir, 'manifest.mjs');
      let project = { title: path.basename(path.dirname(serverDir)), summary: '', stack: [] };
      let routes = [];
      try {
        const mod = await import(pathToFileURL(manifestPath).href + `?t=${upgraded}`);
        project = mod.project || project;
        routes = mod.apiRoutes || [];
      } catch (e) { log(`  ! no se pudo cargar manifest: ${e.message}`); }

      // proyecto raíz = dos niveles arriba del shared src normalmente; lo derivamos del server
      const projectRoot = findProjectRoot(serverPath, ecoDir);
      const docsDir = path.join(projectRoot, 'docs');
      write(path.join(docsDir, 'IMPLEMENTATION_PLAN.md'), implementationPlan(project, routes));
      write(path.join(docsDir, 'ADVANCED_FEATURES.md'), advancedFeatures(project));
      write(path.join(projectRoot, 'INSTALL_WHEN_ONLINE.md'), installWhenOnline(project, eco));
      docs += 3;
    }
  }
  log(`\n${DRY ? '[DRY] ' : ''}Servidores actualizados: ${upgraded} · Docs generados: ${docs}`);
}

/** Sube desde el server.mjs hasta la carpeta raíz del proyecto (la que contiene package.json + docs/ o turbo.json). */
function findProjectRoot(serverPath, ecoDir) {
  let dir = path.dirname(serverPath);
  while (dir !== ecoDir && dir !== path.dirname(dir)) {
    const hasPkg = fs.existsSync(path.join(dir, 'package.json'));
    const hasTurbo = fs.existsSync(path.join(dir, 'turbo.json'));
    const parent = path.dirname(dir);
    // raíz del proyecto = primer dir bajo ecoDir
    if (parent === ecoDir && hasPkg) return dir;
    if (hasTurbo && hasPkg && parent !== ecoDir) { /* podría ser sub-app; sigue subiendo */ }
    dir = parent;
  }
  return path.dirname(path.dirname(serverPath));
}

main().catch((e) => { console.error(e); process.exit(1); });
