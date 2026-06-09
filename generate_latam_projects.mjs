import { promises as fs } from 'node:fs';
import path from 'node:path';

const homeDir = '/home/dreamstechsmith';
const sourceDir = path.join(homeDir, 'Compartido_MD');
const targetDir = path.join(homeDir, 'Proyectos_Latam');

const projects = [
  {
    slug: 'latamax',
    title: 'LatamaX',
    codename: 'latamax',
    sourceFile: 'LatamaX_Plan_Maestro.md',
    summary: 'Red social estilo Twitter/X enfocada en audiencias de Latinoamerica.',
    stack: ['Next.js 14', 'Expo', 'Node.js', 'PostgreSQL', 'Redis', 'WebSockets'],
    serverDir: 'apps/api',
    sharedDir: 'packages/shared',
    serverPackageName: '@latamax/api',
    sharedPackageName: '@latamax/shared',
    port: 4101,
    modules: ['feed social', 'perfiles', 'tendencias', 'mensajeria', 'notificaciones'],
    placeholderDirs: {
      'apps/web': 'Cliente web Next.js para timeline, perfiles, busqueda y notificaciones.',
      'apps/mobile': 'Cliente mobile Expo para consumo del feed, mensajeria y creacion de posts.',
      'packages/ui': 'Componentes UI compartidos entre web y mobile.',
      'packages/config': 'Configuraciones compartidas de lint, tsconfig y tailwind.',
      'infra/docker': 'Base de contenedores y orquestacion local.',
      'infra/scripts': 'Scripts de seed, migraciones y despliegue.'
    },
    env: [
      'PORT=4101',
      'APP_NAME=LatamaX',
      'DATABASE_URL=postgresql://latamax:latamax@localhost:5432/latamax',
      'REDIS_URL=redis://localhost:6379/0',
      'JWT_SECRET=change-me',
      'MEDIA_BUCKET=latamax-media'
    ],
    nextSteps: [
      'Convertir el mock API en servicios con auth, posts y follows.',
      'Implementar contratos TypeScript compartidos para frontend y mobile.',
      'Levantar Prisma y migraciones para usuarios, posts y notificaciones.',
      'Agregar websocket para feed en vivo y mensajes directos.'
    ],
    routes: [
      {
        method: 'GET',
        path: '/api/v1/feed',
        summary: 'Timeline curada para LATAM',
        response: {
          items: [
            { id: 'post_1', author: '@ana_mx', content: 'Bienvenidos a LatamaX', lang: 'es-MX' },
            { id: 'post_2', author: '@joao_br', content: 'Noticias e tendencias regionais', lang: 'pt-BR' }
          ]
        }
      },
      {
        method: 'GET',
        path: '/api/v1/trends',
        summary: 'Temas en tendencia por pais',
        response: {
          items: [
            { name: '#FutbolLatam', country: 'AR', posts: 184200 },
            { name: '#TechColombia', country: 'CO', posts: 45890 }
          ]
        }
      },
      {
        method: 'POST',
        path: '/api/v1/posts',
        summary: 'Crear un post y enviarlo a moderacion',
        requestExample: { content: 'Hola LATAM', lang: 'es-CO' },
        response: { id: 'post_new', status: 'queued', moderation: 'pending' }
      }
    ]
  },
  {
    slug: 'paylat',
    title: 'PayLat',
    codename: 'paylat',
    sourceFile: 'PayLat-NeoBank-Plan-Maestro.md',
    summary: 'Neobanco LATAM con cuentas digitales, transferencias, QR y tarjetas virtuales.',
    stack: ['NestJS', 'Next.js 14', 'Expo', 'PostgreSQL', 'Redis', 'Kafka'],
    serverDir: 'services/api-gateway',
    sharedDir: 'packages/shared-types',
    serverPackageName: '@paylat/api-gateway',
    sharedPackageName: '@paylat/shared-types',
    port: 4102,
    modules: ['onboarding', 'cuentas', 'transferencias', 'pagos QR', 'tarjetas'],
    placeholderDirs: {
      'apps/mobile': 'App mobile para onboarding, balance, pagos QR y movimientos.',
      'apps/web': 'Portal web para clientes y soporte.',
      'apps/admin': 'Panel administrativo y de riesgo.',
      'services/auth-service': 'Servicio de autenticacion y 2FA.',
      'services/account-service': 'Ledger y cuentas multi-moneda.',
      'services/payment-service': 'Orquestacion de pagos, P2P y cash-in/cash-out.',
      'services/notification-service': 'Notificaciones transaccionales y alertas de fraude.',
      'packages/shared-utils': 'Utilidades compartidas de validacion y formato monetario.',
      'packages/api-client': 'SDK cliente generado desde OpenAPI.'
    },
    env: [
      'PORT=4102',
      'APP_NAME=PayLat',
      'DATABASE_URL=postgresql://paylat:paylat@localhost:5432/paylat',
      'REDIS_URL=redis://localhost:6379/1',
      'KAFKA_BROKERS=localhost:9092',
      'JWT_SECRET=change-me'
    ],
    nextSteps: [
      'Separar gateway, auth y ledger en servicios NestJS reales.',
      'Disenar esquema de cuentas, wallets y movimientos contables.',
      'Integrar KYC simulado y reglas de fraude sobre eventos.',
      'Crear panel admin con monitoreo de transacciones y disputas.'
    ],
    routes: [
      {
        method: 'GET',
        path: '/api/v1/accounts',
        summary: 'Resumen de cuentas y saldos',
        response: {
          accounts: [
            { currency: 'COP', balance: 1250000, available: 1200000 },
            { currency: 'USD', balance: 320, available: 320 }
          ]
        }
      },
      {
        method: 'POST',
        path: '/api/v1/transfers/quote',
        summary: 'Cotizacion de transferencia P2P',
        requestExample: { amount: 45000, currency: 'COP', targetAlias: 'maria.co' },
        response: { fee: 0, etaSeconds: 15, channel: 'instant' }
      },
      {
        method: 'POST',
        path: '/api/v1/payments/qr',
        summary: 'Simular pago con QR',
        requestExample: { merchantId: 'store_123', amount: 38900, currency: 'COP' },
        response: { status: 'approved', authCode: 'QR-2026-1001' }
      }
    ]
  },
  {
    slug: 'pinlat',
    title: 'PinLat',
    codename: 'pinlat',
    sourceFile: 'PinLat_Plan_Maestro_Desarrollo.md',
    summary: 'Plataforma visual inspirada en Pinterest con enfoque regional, social y comercial.',
    stack: ['Next.js 15', 'Expo', 'NestJS', 'PostgreSQL', 'Redis', 'FastAPI'],
    serverDir: 'apps/api',
    sharedDir: 'packages/shared-types',
    serverPackageName: '@pinlat/api',
    sharedPackageName: '@pinlat/shared-types',
    port: 4103,
    modules: ['feed visual', 'pins', 'boards', 'busqueda', 'cuentas de negocio'],
    placeholderDirs: {
      'apps/web': 'Cliente web para feed visual, tableros y perfiles.',
      'apps/mobile': 'App mobile para explorar, guardar y publicar pins.',
      'apps/admin': 'Panel admin para moderacion, ads y soporte.',
      'apps/ml-service': 'Servicio de recomendaciones y ranking.',
      'apps/browser-extension': 'Extension para guardar pins desde el navegador.',
      'packages/ui': 'Biblioteca UI compartida para cards, grids y modales.',
      'packages/database': 'Prisma schema y seeds.',
      'packages/utils': 'Helpers de imagenes, SEO y formatos.'
    },
    env: [
      'PORT=4103',
      'APP_NAME=PinLat',
      'DATABASE_URL=postgresql://pinlat:pinlat@localhost:5432/pinlat',
      'REDIS_URL=redis://localhost:6379/2',
      'SEARCH_URL=http://localhost:7700',
      'MEDIA_BUCKET=pinlat-media'
    ],
    nextSteps: [
      'Implementar CRUD real de pins, boards y comments con Prisma.',
      'Crear ingestion de imagenes y worker de procesamiento.',
      'Desarrollar ranking y recomendaciones en el servicio ML.',
      'Agregar cuentas business y analitica para creadores.'
    ],
    routes: [
      {
        method: 'GET',
        path: '/api/v1/feed',
        summary: 'Feed visual principal',
        response: {
          pins: [
            { id: 'pin_1', title: 'Decoracion andina', image: '/mock/pin-1.jpg', saves: 412 },
            { id: 'pin_2', title: 'Comida callejera CDMX', image: '/mock/pin-2.jpg', saves: 911 }
          ]
        }
      },
      {
        method: 'GET',
        path: '/api/v1/boards',
        summary: 'Tableros destacados',
        response: {
          boards: [
            { id: 'board_1', name: 'Recetas latinas', pinCount: 87 },
            { id: 'board_2', name: 'Viajes en Sudamerica', pinCount: 46 }
          ]
        }
      },
      {
        method: 'POST',
        path: '/api/v1/pins',
        summary: 'Crear pin en borrador',
        requestExample: { title: 'Nuevo pin', boardId: 'board_1' },
        response: { id: 'pin_new', status: 'draft', indexed: false }
      }
    ]
  },
  {
    slug: 'traduceLA',
    title: 'TraduceLA',
    codename: 'traduceLA',
    sourceFile: 'TraduceLA_Plan_Maestro_3_Agentes.md',
    summary: 'Traductor conversacional para LATAM con texto, voz y variantes regionales.',
    stack: ['Flutter', 'Fastify', 'PostgreSQL', 'Redis', 'Whisper', 'DeepL'],
    serverDir: 'packages/api',
    sharedDir: 'packages/shared-types',
    serverPackageName: '@traduceLA/api',
    sharedPackageName: '@traduceLA/shared-types',
    port: 4104,
    modules: ['traduccion de texto', 'modo conversacion', 'historial', 'dialectos', 'tts/stt'],
    placeholderDirs: {
      'apps/mobile': 'Cliente Flutter para texto, voz, historial y modo conversacion.',
      'packages/ml-pipeline': 'Pipeline de STT, traduccion, TTS y adaptador regional.',
      'packages/proto': 'Contratos OpenAPI y/o protobuf.',
      'infra/docker': 'Contenedores locales para API, cache y workers.',
      'tests/e2e': 'Pruebas end-to-end de flujos de traduccion.'
    },
    env: [
      'PORT=4104',
      'APP_NAME=TraduceLA',
      'DATABASE_URL=postgresql://traduce:traduce@localhost:5432/traduceLA',
      'REDIS_URL=redis://localhost:6379/3',
      'TRANSLATION_PROVIDER=mock',
      'TTS_PROVIDER=mock'
    ],
    nextSteps: [
      'Conectar STT, TTS y proveedor de traduccion real por adaptadores.',
      'Modelar historial, favoritos y frases guardadas.',
      'Crear modo offline y descarga de paquetes de idioma.',
      'Afinar variantes regionales y dialectos con capas configurables.'
    ],
    routes: [
      {
        method: 'POST',
        path: '/api/v1/translate/text',
        summary: 'Traducir texto',
        requestExample: { text: 'Buenos dias', source_lang: 'es-CO', target_lang: 'en-US' },
        response: { translatedText: 'Good morning', detectedSource: 'es-CO', latencyMs: 120 }
      },
      {
        method: 'POST',
        path: '/api/v1/conversation/session',
        summary: 'Crear sesion de conversacion bilingue',
        requestExample: { langA: 'es-MX', langB: 'pt-BR' },
        response: { sessionId: 'conv_001', status: 'active' }
      },
      {
        method: 'GET',
        path: '/api/v1/history',
        summary: 'Historial reciente',
        response: {
          items: [
            { id: 'tr_1', input: 'Donde esta el hotel?', output: 'Where is the hotel?' },
            { id: 'tr_2', input: 'Obrigado', output: 'Gracias' }
          ]
        }
      }
    ]
  },
  {
    slug: 'kicklatam',
    title: 'KickLATAM',
    codename: 'kicklatam',
    sourceFile: 'plan.md',
    summary: 'Plataforma de streaming en vivo para LATAM con chat, monetizacion y VOD.',
    stack: ['Next.js 14', 'Expo', 'NestJS', 'PostgreSQL', 'Redis', 'MongoDB', 'FFmpeg'],
    serverDir: 'services/gateway',
    sharedDir: 'packages/shared-types',
    serverPackageName: '@kicklatam/gateway',
    sharedPackageName: '@kicklatam/shared-types',
    port: 4105,
    modules: ['streams en vivo', 'chat', 'suscripciones', 'moderacion', 'vod'],
    placeholderDirs: {
      'apps/web': 'Frontend web para home, discover, player y dashboard streamer.',
      'apps/mobile': 'App mobile para consumo de stream y chat.',
      'apps/admin': 'Panel admin y de moderacion.',
      'services/auth': 'Auth, JWT, OAuth2 y 2FA.',
      'services/users': 'Perfiles, follows y subscripciones.',
      'services/streams': 'Ingesta RTMP, estados de stream y publishing.',
      'services/chat': 'Chat en tiempo real y comandos.',
      'services/payments': 'Pagos, payouts y cobros recurrentes.',
      'services/notifications': 'Push, email y notificaciones in-app.',
      'infrastructure/docker': 'Contenedores locales para servicios de video e infra.'
    },
    env: [
      'PORT=4105',
      'APP_NAME=KickLATAM',
      'DATABASE_URL=postgresql://kicklatam:kicklatam@localhost:5432/kicklatam',
      'REDIS_URL=redis://localhost:6379/4',
      'MONGO_URL=mongodb://localhost:27017/kicklatam',
      'STREAM_INGEST_URL=rtmp://localhost/live'
    ],
    nextSteps: [
      'Construir auth real, perfiles y dashboard streamer.',
      'Integrar MediaMTX/Nginx-RTMP para sesiones en vivo.',
      'Agregar chat websocket y moderacion automatica.',
      'Crear pipelines de VOD, highlights y analytics.'
    ],
    routes: [
      {
        method: 'GET',
        path: '/api/v1/streams',
        summary: 'Streams destacados',
        response: {
          streams: [
            { id: 'stream_1', title: 'Rankeds en vivo', viewers: 12450, language: 'es' },
            { id: 'stream_2', title: 'IRL Sao Paulo', viewers: 3480, language: 'pt' }
          ]
        }
      },
      {
        method: 'GET',
        path: '/api/v1/chat/demo',
        summary: 'Chat demo para desarrollo',
        response: {
          messages: [
            { id: 'msg_1', user: 'mod_latam', text: 'Bienvenidos al stream' },
            { id: 'msg_2', user: 'viewer_22', text: 'Vamos con todo' }
          ]
        }
      },
      {
        method: 'POST',
        path: '/api/v1/subscriptions',
        summary: 'Simular alta de suscripcion',
        requestExample: { streamerId: 'streamer_77', tier: 'gold' },
        response: { status: 'active', renewsAt: '2026-04-13T00:00:00Z' }
      }
    ]
  },
  {
    slug: 'vialatin',
    title: 'ViaLatin',
    codename: 'vialatin',
    sourceFile: 'waze-latam-plan.md',
    summary: 'App de navegacion comunitaria tipo Waze con reportes y seguridad para LATAM.',
    stack: ['React Native', 'NestJS', 'PostGIS', 'MongoDB', 'Redis', 'OSRM', 'Kafka'],
    serverDir: 'services/api-gateway',
    sharedDir: 'shared/types',
    serverPackageName: '@vialatin/api-gateway',
    sharedPackageName: '@vialatin/shared-types',
    port: 4106,
    modules: ['rutas', 'reportes comunitarios', 'trafico', 'seguridad', 'mapas'],
    placeholderDirs: {
      'apps/mobile': 'Cliente mobile React Native con mapas, rutas y reportes.',
      'apps/admin-panel': 'Panel administrativo y de moderacion vial.',
      'apps/map-editor': 'Editor comunitario de mapas.',
      'services/auth-service': 'Auth, sesiones y reputacion del usuario.',
      'services/route-service': 'Calculo de rutas y recalculo dinamico.',
      'services/report-service': 'Incidentes, policia, cierres y peligros.',
      'services/traffic-service': 'Modelado de trafico y eventos.',
      'ml/traffic-prediction': 'Prediccion de trafico y ETA.',
      'maps/osrm-config': 'Configuracion base del motor de rutas.'
    },
    env: [
      'PORT=4106',
      'APP_NAME=ViaLatin',
      'DATABASE_URL=postgresql://vialatin:vialatin@localhost:5432/vialatin',
      'MONGODB_URL=mongodb://localhost:27017/vialatin',
      'REDIS_URL=redis://localhost:6379/5',
      'ROUTING_ENGINE_URL=http://localhost:5000'
    ],
    nextSteps: [
      'Conectar PostGIS, OSRM y servicios de incidentes reales.',
      'Implementar sockets para trafico y reportes en vivo.',
      'Crear motores de prediccion de ETA y zonas de riesgo.',
      'Desarrollar editor de mapas y panel de moderacion.'
    ],
    routes: [
      {
        method: 'GET',
        path: '/api/v1/routes/demo',
        summary: 'Ruta estimada entre dos puntos',
        response: {
          routeId: 'route_demo_1',
          etaMinutes: 18,
          distanceKm: 9.4,
          warnings: ['lluvia intensa', 'peaje cercano']
        }
      },
      {
        method: 'GET',
        path: '/api/v1/incidents',
        summary: 'Incidentes recientes',
        response: {
          incidents: [
            { id: 'inc_1', type: 'accident', severity: 'high', city: 'Bogota' },
            { id: 'inc_2', type: 'pothole', severity: 'medium', city: 'Lima' }
          ]
        }
      },
      {
        method: 'POST',
        path: '/api/v1/reports',
        summary: 'Crear reporte comunitario',
        requestExample: { type: 'police', lat: 4.6097, lng: -74.0817 },
        response: { status: 'accepted', review: 'community' }
      }
    ]
  }
];

function asPosix(relativePath) {
  const normalized = relativePath.replace(/\\/g, '/');
  return normalized.startsWith('.') ? normalized : `./${normalized}`;
}

function relativeImport(fromDir, toFile) {
  return asPosix(path.relative(fromDir, toFile));
}

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function writeFile(filePath, content) {
  await ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, content, 'utf8');
}

function rootPackageJson(project) {
  return JSON.stringify(
    {
      name: project.slug,
      private: true,
      type: 'module',
      workspaces: [project.serverDir, project.sharedDir],
      scripts: {
        dev: `npm run dev --workspace=${project.serverPackageName}`,
        test: 'node scripts/validate.mjs'
      }
    },
    null,
    2
  ) + '\n';
}

function workspacePackageJson(name, description) {
  return JSON.stringify(
    {
      name,
      private: true,
      type: 'module',
      version: '0.1.0',
      description,
      scripts: {
        dev: 'node src/server.mjs'
      }
    },
    null,
    2
  ) + '\n';
}

function sharedPackageJson(name, description) {
  return JSON.stringify(
    {
      name,
      private: true,
      type: 'module',
      version: '0.1.0',
      description
    },
    null,
    2
  ) + '\n';
}

function turboJson() {
  return JSON.stringify(
    {
      $schema: 'https://turbo.build/schema.json',
      extends: ['//'],
      tasks: {
        test: {
          outputs: []
        },
        dev: {
          cache: false
        }
      }
    },
    null,
    2
  ) + '\n';
}

function gitignore() {
  return [
    'node_modules/',
    '.DS_Store',
    '.env',
    '.env.local',
    'dist/',
    'coverage/',
    '.turbo/'
  ].join('\n') + '\n';
}

function envExample(project) {
  return project.env.join('\n') + '\n';
}

function rootReadme(project) {
  const moduleList = project.modules.map((item) => `- ${item}`).join('\n');
  const dirs = [
    `- \`${project.serverDir}\`: servicio base ejecutable.`,
    `- \`${project.sharedDir}\`: contratos y manifest compartidos.`,
    '- `docs/source-plan.md`: plan original aportado por el usuario.',
    '- `docs/api-contracts.md`: resumen operativo de rutas mock.',
    '- `scripts/validate.mjs`: smoke test local sin dependencias externas.'
  ].join('\n');

  const placeholders = Object.entries(project.placeholderDirs)
    .map(([dirPath, description]) => `- \`${dirPath}\`: ${description}`)
    .join('\n');

  const stack = project.stack.map((item) => `- ${item}`).join('\n');
  const nextSteps = project.nextSteps.map((item) => `- ${item}`).join('\n');

  return [
    `# ${project.title}`,
    '',
    project.summary,
    '',
    '## Estado',
    '',
    'Base inicial generada desde el plan maestro. Incluye estructura de monorepo, contratos compartidos y un servicio mock ejecutable para empezar la integracion tecnica.',
    '',
    '## Modulos MVP cubiertos en esta base',
    '',
    moduleList,
    '',
    '## Stack objetivo',
    '',
    stack,
    '',
    '## Estructura creada',
    '',
    dirs,
    '',
    '## Directorios reservados',
    '',
    placeholders,
    '',
    '## Comandos utiles',
    '',
    '```bash',
    'npm test',
    'npm run dev',
    '```',
    '',
    '## Siguientes pasos recomendados',
    '',
    nextSteps,
    ''
  ].join('\n');
}

function docsBacklog(project) {
  return [
    '# Backlog inicial',
    '',
    `Proyecto: ${project.title}`,
    '',
    '## Prioridades',
    '',
    ...project.nextSteps.map((item, index) => `${index + 1}. ${item}`),
    '',
    '## Meta de esta base',
    '',
    'Dejar una estructura consistente, contratos compartidos y un punto de entrada ejecutable para que el siguiente ciclo de trabajo se concentre en features reales.',
    ''
  ].join('\n');
}

function docsApiContracts(project) {
  const routeLines = project.routes
    .map((route) => `- \`${route.method} ${route.path}\`: ${route.summary}`)
    .join('\n');

  return [
    '# API contracts mock',
    '',
    `Proyecto: ${project.title}`,
    '',
    '## Rutas',
    '',
    routeLines,
    '',
    '## Notas',
    '',
    '- Las rutas devuelven respuestas mock para permitir integracion temprana.',
    '- Las peticiones POST reflejan el payload recibido junto con la respuesta simulada.',
    '- Este archivo sirve como puente entre el plan maestro y la futura implementacion completa.',
    ''
  ].join('\n');
}

function manifestSource(project) {
  const payload = {
    title: project.title,
    slug: project.slug,
    codename: project.codename,
    summary: project.summary,
    stack: project.stack,
    modules: project.modules,
    server: {
      entry: project.serverDir,
      port: project.port
    }
  };

  return [
    `export const project = ${JSON.stringify(payload, null, 2)};`,
    '',
    `export const apiRoutes = ${JSON.stringify(project.routes, null, 2)};`,
    ''
  ].join('\n');
}

function serverSource(project, serverDirPath, sharedDirPath) {
  const importPath = relativeImport(
    path.join(serverDirPath, 'src'),
    path.join(sharedDirPath, 'src', 'manifest.mjs')
  );

  return [
    "import http from 'node:http';",
    "import { fileURLToPath } from 'node:url';",
    `import { project, apiRoutes } from '${importPath}';`,
    '',
    'function sendJson(response, statusCode, payload) {',
    "  response.writeHead(statusCode, { 'content-type': 'application/json; charset=utf-8' });",
    '  response.end(JSON.stringify(payload, null, 2));',
    '}',
    '',
    'async function readJsonBody(request) {',
    '  const chunks = [];',
    '  for await (const chunk of request) {',
    '    chunks.push(chunk);',
    '  }',
    '',
    '  if (chunks.length === 0) {',
    '    return null;',
    '  }',
    '',
    "  const raw = Buffer.concat(chunks).toString('utf8');",
    '  try {',
    '    return JSON.parse(raw);',
    '  } catch (error) {',
    "    return { raw, parseError: 'invalid_json' };",
    '  }',
    '}',
    '',
    'async function handleRequest(request, response) {',
    "  const url = new URL(request.url || '/', 'http://localhost');",
    '',
    "  if (url.pathname === '/health') {",
    "    return sendJson(response, 200, { status: 'ok', project: project.slug });",
    '  }',
    '',
    "  if (url.pathname === '/manifest') {",
    '    return sendJson(response, 200, { project, apiRoutes });',
    '  }',
    '',
    '  const route = apiRoutes.find((item) => item.method === request.method && item.path === url.pathname);',
    '',
    '  if (!route) {',
    '    return sendJson(response, 404, {',
    '      error: "route_not_found",',
    '      project: project.slug,',
    '      available: apiRoutes.map((item) => `${item.method} ${item.path}`)',
    '    });',
    '  }',
    '',
    "  const body = ['POST', 'PUT', 'PATCH'].includes(request.method || '') ? await readJsonBody(request) : null;",
    '',
    '  return sendJson(response, 200, {',
    '    project: project.slug,',
    '    route: route.path,',
    '    summary: route.summary,',
    '    received: body,',
    '    response: route.response',
    '  });',
    '}',
    '',
    'export function startServer(port = Number(process.env.PORT || project.server.port)) {',
    '  return new Promise((resolve) => {',
    '    const server = http.createServer((request, response) => {',
    '      handleRequest(request, response).catch((error) => {',
    '        sendJson(response, 500, { error: "internal_error", message: error.message });',
    '      });',
    '    });',
    '',
    '    server.listen(port, () => resolve(server));',
    '  });',
    '}',
    '',
    'const isMain = process.argv[1] === fileURLToPath(import.meta.url);',
    '',
    'if (isMain) {',
    '  const server = await startServer();',
    '  const address = server.address();',
    "  const portNumber = address && typeof address === 'object' ? address.port : project.server.port;",
    '  console.log(`${project.title} mock API escuchando en http://127.0.0.1:${portNumber}`);',
    '}',
    ''
  ].join('\n');
}

function validateSource(project, projectRoot) {
  const scriptsDirPath = path.join(projectRoot, 'scripts');
  const manifestImport = relativeImport(
    scriptsDirPath,
    path.join(projectRoot, project.sharedDir, 'src', 'manifest.mjs')
  );
  const serverImport = relativeImport(
    scriptsDirPath,
    path.join(projectRoot, project.serverDir, 'src', 'server.mjs')
  );
  const requiredPaths = [
    'README.md',
    'docs/source-plan.md',
    'docs/api-contracts.md',
    path.join(project.sharedDir, 'src', 'manifest.mjs'),
    path.join(project.serverDir, 'src', 'server.mjs'),
    ...Object.keys(project.placeholderDirs).map((dirPath) => path.join(dirPath, 'README.md'))
  ];

  return [
    "import assert from 'node:assert/strict';",
    "import fs from 'node:fs';",
    "import path from 'node:path';",
    "import { fileURLToPath } from 'node:url';",
    `import { project, apiRoutes } from '${manifestImport}';`,
    `import { startServer } from '${serverImport}';`,
    '',
    'const __filename = fileURLToPath(import.meta.url);',
    'const __dirname = path.dirname(__filename);',
    "const rootDir = path.resolve(__dirname, '..');",
    `const requiredPaths = ${JSON.stringify(requiredPaths, null, 2)};`,
    '',
    'for (const relativePath of requiredPaths) {',
    "  assert.equal(fs.existsSync(path.join(rootDir, relativePath)), true, `Missing ${relativePath}`);",
    '}',
    '',
    'assert.equal(project.slug, ' + JSON.stringify(project.slug) + ');',
    'assert.equal(Array.isArray(apiRoutes), true);',
    'assert.equal(apiRoutes.length >= 2, true);',
    '',
    'const server = await startServer(0);',
    'const address = server.address();',
    "assert.equal(address && typeof address === 'object', true);",
    'const baseUrl = `http://127.0.0.1:${address.port}`;',
    '',
    "const healthResponse = await fetch(`${baseUrl}/health`);",
    'const healthPayload = await healthResponse.json();',
    "assert.equal(healthPayload.status, 'ok');",
    "assert.equal(healthPayload.project, project.slug);",
    '',
    'const firstRoute = apiRoutes[0];',
    'const requestInit = firstRoute.method === "POST"',
    '  ? {',
    '      method: "POST",',
    '      headers: { "content-type": "application/json" },',
    '      body: JSON.stringify(firstRoute.requestExample || { sample: true })',
    '    }',
    '  : { method: firstRoute.method };',
    '',
    'const routeResponse = await fetch(`${baseUrl}${firstRoute.path}`, requestInit);',
    'const routePayload = await routeResponse.json();',
    'assert.equal(routePayload.project, project.slug);',
    'assert.equal(routePayload.route, firstRoute.path);',
    '',
    'await new Promise((resolve, reject) => {',
    '  server.close((error) => {',
    '    if (error) {',
    '      reject(error);',
    '      return;',
    '    }',
    '',
    '    resolve();',
    '  });',
    '});',
    '',
    'console.log(`${project.title}: validate ok (${apiRoutes.length} mock routes)`);',
    ''
  ].join('\n');
}

function placeholderReadme(project, dirPath, description) {
  return [
    `# ${dirPath}`,
    '',
    description,
    '',
    `Proyecto: ${project.title}`,
    '',
    'Este directorio queda reservado y documentado para la siguiente iteracion de desarrollo.',
    ''
  ].join('\n');
}

function parentReadme() {
  const lines = projects
    .map((project) => `- \`${project.slug}\`: ${project.summary}`)
    .join('\n');

  return [
    '# Proyectos LATAM',
    '',
    'Carpeta madre con seis proyectos generados a partir de los planes .md entregados.',
    '',
    '## Proyectos',
    '',
    lines,
    '',
    '## Validacion',
    '',
    '```bash',
    'node validar_todo.mjs',
    '```',
    ''
  ].join('\n');
}

function parentValidateScript() {
  return [
    "import { execFileSync } from 'node:child_process';",
    "import path from 'node:path';",
    "import { fileURLToPath } from 'node:url';",
    '',
    'const __filename = fileURLToPath(import.meta.url);',
    'const __dirname = path.dirname(__filename);',
    `const projects = ${JSON.stringify(projects.map((project) => project.slug), null, 2)};`,
    '',
    'for (const slug of projects) {',
    '  execFileSync("node", ["scripts/validate.mjs"], {',
    '    cwd: path.join(__dirname, slug),',
    '    stdio: "inherit"',
    '  });',
    '}',
    '',
    'console.log(`Validated ${projects.length} projects.`);',
    ''
  ].join('\n');
}

async function generateProject(project) {
  const projectRoot = path.join(targetDir, project.slug);
  const serverRoot = path.join(projectRoot, project.serverDir);
  const sharedRoot = path.join(projectRoot, project.sharedDir);
  const sourcePlan = await fs.readFile(path.join(sourceDir, project.sourceFile), 'utf8');

  await ensureDir(projectRoot);
  await writeFile(path.join(projectRoot, 'README.md'), rootReadme(project));
  await writeFile(path.join(projectRoot, '.gitignore'), gitignore());
  await writeFile(path.join(projectRoot, '.env.example'), envExample(project));
  await writeFile(path.join(projectRoot, 'package.json'), rootPackageJson(project));
  await writeFile(path.join(projectRoot, 'turbo.json'), turboJson());
  await writeFile(path.join(projectRoot, 'docs', 'source-plan.md'), sourcePlan);
  await writeFile(path.join(projectRoot, 'docs', 'backlog.md'), docsBacklog(project));
  await writeFile(path.join(projectRoot, 'docs', 'api-contracts.md'), docsApiContracts(project));
  await writeFile(path.join(projectRoot, 'scripts', 'validate.mjs'), validateSource(project, projectRoot));
  await writeFile(
    path.join(sharedRoot, 'package.json'),
    sharedPackageJson(project.sharedPackageName, `${project.title} shared contracts`)
  );
  await writeFile(path.join(sharedRoot, 'src', 'manifest.mjs'), manifestSource(project));
  await writeFile(
    path.join(serverRoot, 'package.json'),
    workspacePackageJson(project.serverPackageName, `${project.title} mock service`)
  );
  await writeFile(path.join(serverRoot, 'src', 'server.mjs'), serverSource(project, serverRoot, sharedRoot));

  for (const [dirPath, description] of Object.entries(project.placeholderDirs)) {
    await writeFile(path.join(projectRoot, dirPath, 'README.md'), placeholderReadme(project, dirPath, description));
  }
}

async function main() {
  await ensureDir(targetDir);
  await writeFile(path.join(targetDir, 'README.md'), parentReadme());
  await writeFile(path.join(targetDir, 'validar_todo.mjs'), parentValidateScript());

  for (const project of projects) {
    await generateProject(project);
  }

  console.log(`Generated ${projects.length} projects in ${targetDir}`);
}

await main();
