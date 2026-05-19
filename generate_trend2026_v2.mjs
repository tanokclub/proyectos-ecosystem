import { promises as fs } from 'node:fs';
import path from 'node:path';

const homeDir = '/home/dreamstechsmith';
const targetDir = path.join(homeDir, 'Proyectos_Trend2026');

const categories = {
  ai:          { label: 'AI/GenAI',          portStart: 4200, webStart: 3200, color: { primary: '#8b5cf6', accent: '#ec4899' } },
  fintech:     { label: 'FinTech LATAM',     portStart: 4210, webStart: 3210, color: { primary: '#10b981', accent: '#f59e0b' } },
  healthtech:  { label: 'HealthTech',        portStart: 4220, webStart: 3220, color: { primary: '#14b8a6', accent: '#f472b6' } },
  climatetech: { label: 'ClimateTech',       portStart: 4230, webStart: 3230, color: { primary: '#22c55e', accent: '#0ea5e9' } },
  edtech:      { label: 'EdTech',            portStart: 4240, webStart: 3240, color: { primary: '#f59e0b', accent: '#3b82f6' } },
  devtools:    { label: 'DevTools / Infra',  portStart: 4250, webStart: 3250, color: { primary: '#06b6d4', accent: '#a855f7' } },
  web3:        { label: 'Web3 / Blockchain', portStart: 4260, webStart: 3260, color: { primary: '#f97316', accent: '#22d3ee' } },
  iot:         { label: 'IoT / Smart Cities',portStart: 4270, webStart: 3270, color: { primary: '#3b82f6', accent: '#fbbf24' } },
  creator:     { label: 'Creator Economy',   portStart: 4280, webStart: 3280, color: { primary: '#ec4899', accent: '#84cc16' } }
};

// ============ Helper para definir rutas compactas ============
const r = (m, p, s, resp, req) => ({ m, p, s, r: resp, ...(req ? { req } : {}) });

// ============ Rutas utilitarias añadidas a cada proyecto ============
const utilityRoutes = (slug) => [
  r('GET', '/api/v1/metrics', 'Métricas del servicio', {
    requestsPerMinute: 142, p50Ms: 18, p95Ms: 86, errorRate: 0.004,
    statusCodes: { '200': 1820, '400': 12, '404': 4, '500': 1 }
  }),
  r('GET', '/api/v1/notifications', 'Notificaciones del usuario', {
    items: [
      { id: 'n_1', type: 'info', title: 'Bienvenido a ' + slug, read: false, at: new Date().toISOString() },
      { id: 'n_2', type: 'success', title: 'Sincronización completa', read: true, at: new Date().toISOString() }
    ]
  }),
  r('POST', '/api/v1/search', 'Búsqueda global', { results: [{ type: 'doc', id: 's_1', title: 'Resultado mock', score: 0.84 }] }, { query: 'demo' }),
  r('POST', '/api/v1/batch', 'Operación batch', { batchId: 'b_001', accepted: 12, queued: 12 }, { items: [] })
];

// ============ DEFINICIÓN DE PROYECTOS ============

const baseProjects = [
  // ===== AI / GenAI (10) =====
  { cat: 'ai', slug: 'ragforge', title: 'RAGForge', summary: 'Plataforma de RAG empresarial: ingesta, embeddings, índices, evaluación.',
    stack: ['Next.js 14', 'FastAPI', 'pgvector', 'Redis', 'OpenAI'],
    modules: ['ingesta de documentos', 'embeddings', 'búsqueda híbrida', 'chat con citas', 'evaluación'],
    routes: [
      r('GET', '/api/v1/collections', 'Colecciones de documentos', { items: [{ id: 'col_1', name: 'Manuales', docs: 142 }, { id: 'col_2', name: 'Contratos', docs: 86 }] }),
      r('GET', '/api/v1/queries/recent', 'Queries recientes', { items: [{ id: 'q_1', text: '¿cuál es el SLA?', score: 0.92 }] }),
      r('POST', '/api/v1/ingest', 'Ingesta documento', { jobId: 'ing_001', status: 'queued' }, { url: 'https://...', collectionId: 'col_1' }),
      r('POST', '/api/v1/chat', 'Chat con citas', { answer: 'El SLA es 4h.', citations: [{ docId: 'd_1' }] }, { query: '¿SLA?', collectionId: 'col_1' })
    ] },
  { cat: 'ai', slug: 'sherpa-ai', title: 'Sherpa AI', summary: 'Agente de soporte multicanal (web, WhatsApp, email) con tools y handoff humano.',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'Redis', 'Anthropic'],
    modules: ['tickets', 'agente con tools', 'handoff', 'KB', 'analytics'],
    routes: [
      r('GET', '/api/v1/conversations', 'Conversaciones activas', { items: [{ id: 'c_1', user: 'ana@x.com', channel: 'web', status: 'bot' }] }),
      r('GET', '/api/v1/tools', 'Tools disponibles', { tools: ['lookupOrder', 'createTicket', 'refund', 'kbSearch'] }),
      r('POST', '/api/v1/conversations/reply', 'Responder', { messageId: 'm_001', toolsCalled: ['kbSearch'] }, { conversationId: 'c_1', text: 'hola' }),
      r('POST', '/api/v1/handoff', 'Pasar a humano', { status: 'queued_agent', etaSeconds: 45 }, { conversationId: 'c_1' })
    ] },
  { cat: 'ai', slug: 'voiceclone-pro', title: 'VoiceClone Pro', summary: 'Estudio para clonar voces, generar narraciones y voiceovers multilingües.',
    stack: ['Next.js 14', 'FastAPI', 'ElevenLabs', 'S3', 'PostgreSQL'],
    modules: ['voces', 'proyectos', 'síntesis TTS', 'studio', 'API'],
    routes: [
      r('GET', '/api/v1/voices', 'Voces clonadas', { voices: [{ id: 'v_1', name: 'María', lang: 'es-MX' }] }),
      r('GET', '/api/v1/projects', 'Proyectos narración', { projects: [{ id: 'p_1', name: 'Audiolibro c1', durationSec: 1840 }] }),
      r('POST', '/api/v1/synthesize', 'Sintetizar voz', { audioUrl: '/mock/audio.mp3', durationSec: 1.2 }, { voiceId: 'v_1', text: 'Hola' }),
      r('POST', '/api/v1/voices', 'Crear voz', { id: 'v_new', status: 'training' }, { name: 'Carla', samples: ['s1.wav'] })
    ] },
  { cat: 'ai', slug: 'multimind', title: 'Multimind', summary: 'Chatbot multimodal: texto, voz, imagen y video como entradas y salidas.',
    stack: ['Next.js 14', 'FastAPI', 'PostgreSQL', 'Whisper', 'SD3'],
    modules: ['chat', 'visión', 'audio', 'video', 'historial'],
    routes: [
      r('GET', '/api/v1/threads', 'Conversaciones multimodales', { threads: [{ id: 't_1', title: 'Logo', modalities: ['text', 'image'] }] }),
      r('GET', '/api/v1/models', 'Modelos por modalidad', { text: ['claude-opus-4-7'], image: ['sd-3'], audio: ['whisper-3'] }),
      r('POST', '/api/v1/chat', 'Mensaje multimodal', { messageId: 'm_x', tokens: 480 }, { threadId: 't_1', text: '...' }),
      r('POST', '/api/v1/generate/image', 'Generar imagen', { imageUrl: '/mock/img.png', latencyMs: 2400 }, { prompt: 'sunset' })
    ] },
  { cat: 'ai', slug: 'copiloc', title: 'CopiloC', summary: 'Copiloto de código para equipos: indexa el repo, genera PRs, hace code review.',
    stack: ['Next.js 14', 'NestJS', 'Tree-sitter', 'PostgreSQL', 'Anthropic'],
    modules: ['indexing', 'autocompletar', 'PR gen', 'review', 'analytics'],
    routes: [
      r('GET', '/api/v1/repos', 'Repos indexados', { repos: [{ id: 'r_1', name: 'monorepo-fe', files: 1820 }] }),
      r('GET', '/api/v1/reviews/recent', 'Reviews recientes', { reviews: [{ prId: 42, comments: 7, blockers: 1 }] }),
      r('POST', '/api/v1/complete', 'Autocompletar', { completion: 'a:number, b:number) { return a+b; }' }, { context: 'function add(' }),
      r('POST', '/api/v1/review', 'Review PR', { jobId: 'rev_001', status: 'queued' }, { prUrl: 'https://github.com/x/y/pull/42' })
    ] },
  { cat: 'ai', slug: 'evalbench', title: 'EvalBench', summary: 'Plataforma para evaluar y comparar modelos LLM con datasets y métricas custom.',
    stack: ['Next.js 14', 'FastAPI', 'PostgreSQL', 'ClickHouse', 'Polars'],
    modules: ['datasets', 'runs', 'métricas', 'comparador', 'reportes'],
    routes: [
      r('GET', '/api/v1/datasets', 'Datasets', { datasets: [{ id: 'd_1', name: 'TruthfulQA', examples: 817 }] }),
      r('GET', '/api/v1/runs', 'Runs', { runs: [{ id: 'run_1', model: 'claude-opus-4-7', score: 0.84 }] }),
      r('POST', '/api/v1/runs', 'Lanzar run', { id: 'run_new', status: 'running' }, { datasetId: 'd_1', model: 'claude-opus-4-7' }),
      r('POST', '/api/v1/compare', 'Comparar', { winner: 'run_1', deltaPct: 3.7 }, { runIds: ['run_1', 'run_2'] })
    ] },
  { cat: 'ai', slug: 'mcpgate', title: 'MCPGate', summary: 'Gestor de servidores MCP: descubrir, instalar, monitorizar y autorizar.',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'Redis', 'Docker'],
    modules: ['catálogo', 'instalación', 'autenticación', 'logs', 'permisos'],
    routes: [
      r('GET', '/api/v1/servers', 'Servidores instalados', { servers: [{ id: 's_1', name: 'github', status: 'running' }] }),
      r('GET', '/api/v1/catalog', 'Catálogo', { items: [{ name: 'notion', stars: 124 }] }),
      r('POST', '/api/v1/servers', 'Instalar', { id: 's_new', status: 'installing' }, { name: 'notion' }),
      r('POST', '/api/v1/authorize', 'Autorizar OAuth', { authorizeUrl: 'https://...' }, { id: 's_2' })
    ] },
  { cat: 'ai', slug: 'compudops', title: 'CompudOps', summary: 'Orchestrator de agentes computer-use: lanza, monitoriza y graba sesiones.',
    stack: ['Next.js 14', 'FastAPI', 'PostgreSQL', 'noVNC', 'Anthropic'],
    modules: ['sesiones', 'tareas', 'video', 'aprobaciones', 'audit'],
    routes: [
      r('GET', '/api/v1/sessions', 'Sesiones', { sessions: [{ id: 'ses_1', task: 'W9', status: 'running' }] }),
      r('GET', '/api/v1/approvals', 'Aprobaciones', { approvals: [{ id: 'ap_1', action: 'submit', confidence: 0.78 }] }),
      r('POST', '/api/v1/sessions', 'Crear sesión', { id: 'ses_new', status: 'spawning' }, { task: 'Buscar precios' }),
      r('POST', '/api/v1/approve', 'Aprobar acción', { status: 'approved' }, { approve: true })
    ] },
  { cat: 'ai', slug: 'promptops', title: 'PromptOps', summary: 'Versionado, testing y deploy de prompts en producción con métricas.',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'ClickHouse', 'Anthropic'],
    modules: ['versiones', 'A/B testing', 'eval', 'observabilidad', 'rollback'],
    routes: [
      r('GET', '/api/v1/prompts', 'Prompts', { prompts: [{ id: 'pr_1', name: 'support', version: 'v14', winRate: 0.91 }] }),
      r('GET', '/api/v1/experiments', 'A/B activos', { experiments: [{ id: 'e_1', a: 'v13', b: 'v14', traffic: 0.5 }] }),
      r('POST', '/api/v1/versions', 'Nueva versión', { version: 'v15', status: 'draft' }, { promptId: 'pr_1', body: '...' }),
      r('POST', '/api/v1/promote', 'Promover ganador', { promoted: 'v14', traffic: 1.0 }, { id: 'e_1' })
    ] },
  { cat: 'ai', slug: 'mnemoai', title: 'MnemoAI', summary: 'Banco de memoria persistente para agentes: hechos, decisiones, embeddings.',
    stack: ['Next.js 14', 'FastAPI', 'pgvector', 'PostgreSQL', 'Redis'],
    modules: ['hechos', 'episodios', 'recuperación', 'olvido', 'sync agentes'],
    routes: [
      r('GET', '/api/v1/memories', 'Memorias', { items: [{ id: 'mem_1', type: 'fact', content: 'prefer terse', confidence: 0.95 }] }),
      r('GET', '/api/v1/agents', 'Agentes', { agents: [{ id: 'ag_1', name: 'Coding Buddy', memCount: 1240 }] }),
      r('POST', '/api/v1/memories', 'Guardar', { id: 'mem_new', stored: true }, { agentId: 'ag_1', type: 'fact', content: '...' }),
      r('POST', '/api/v1/recall', 'Recuperar', { matches: [{ memId: 'mem_1', score: 0.93 }] }, { query: 'preferencias' })
    ] },

  // ===== FinTech LATAM (10) =====
  { cat: 'fintech', slug: 'openlatam', title: 'OpenLatAm', summary: 'Open banking LATAM: agrega cuentas vía PIX, CoDi, PSE, CMF, CMA.',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'Redis', 'Kafka'],
    modules: ['conexiones', 'cuentas', 'transacciones', 'consents', 'agregación'],
    routes: [
      r('GET', '/api/v1/connections', 'Conexiones bancarias', { connections: [{ id: 'cn_1', bank: 'Itaú', status: 'active' }] }),
      r('GET', '/api/v1/accounts/aggregated', 'Cuentas agregadas', { accounts: [{ id: 'a_1', balance: 12450, currency: 'BRL' }] }),
      r('POST', '/api/v1/consents', 'Crear consent', { consentUrl: 'https://itau.com/consent/...' }, { bank: 'Itaú', scopes: ['accounts'] }),
      r('POST', '/api/v1/sync', 'Forzar sync', { jobId: 'sync_001', etaSeconds: 12 }, { connectionId: 'cn_1' })
    ] },
  { cat: 'fintech', slug: 'cryptolat', title: 'CryptoLat', summary: 'Wallet cripto LATAM con on/off-ramp local (PIX, SPEI, PSE).',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'Ethers', 'Bitcore'],
    modules: ['wallet', 'on-ramp', 'off-ramp', 'swap', 'staking'],
    routes: [
      r('GET', '/api/v1/balances', 'Balances', { balances: [{ token: 'BTC', amount: 0.05, usd: 3400 }] }),
      r('GET', '/api/v1/quotes', 'Quotes swap', { quotes: [{ pair: 'BTC/USDC', rate: 68000 }] }),
      r('POST', '/api/v1/onramp', 'On-ramp PIX/SPEI', { orderId: 'or_001', pixCode: '00020126...' }, { fiat: 'BRL', amount: 500 }),
      r('POST', '/api/v1/swap', 'Swap', { txId: 'tx_001', etaSec: 30 }, { from: 'BTC', to: 'USDC', amount: 0.01 })
    ] },
  { cat: 'fintech', slug: 'sendylat', title: 'SendyLat', summary: 'Remesas LATAM-to-LATAM con rails locales y FX competitivo.',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'Redis', 'Stellar'],
    modules: ['envío', 'pickup', 'KYC', 'FX', 'compliance'],
    routes: [
      r('GET', '/api/v1/corridors', 'Corredores', { corridors: [{ from: 'US', to: 'CO', feePct: 1.2 }] }),
      r('GET', '/api/v1/recipients', 'Destinatarios', { recipients: [{ id: 'r_1', name: 'María C.', country: 'CO' }] }),
      r('POST', '/api/v1/quotes', 'Cotizar', { rate: 4180, fee: 2.4, total: 200 }, { from: 'USD', to: 'COP', amount: 200 }),
      r('POST', '/api/v1/transfers', 'Enviar', { transferId: 'tr_001', status: 'processing' }, { quoteId: 'q_1', recipientId: 'r_1' })
    ] },
  { cat: 'fintech', slug: 'compraya', title: 'CompraYa', summary: 'BNPL para retail LATAM: split en 3-12 cuotas sin intereses.',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'Redis', 'Stripe'],
    modules: ['checkout', 'cuotas', 'scoring', 'cobranza', 'merchants'],
    routes: [
      r('GET', '/api/v1/orders', 'Órdenes', { orders: [{ id: 'or_1', merchant: 'Falabella', total: 850000, installments: 3 }] }),
      r('GET', '/api/v1/merchants', 'Merchants', { merchants: [{ id: 'm_1', name: 'Falabella', country: 'CL' }] }),
      r('POST', '/api/v1/checkout', 'Checkout BNPL', { sessionId: 'ck_001', plans: [{ n: 3, monthly: 83333 }] }, { merchantId: 'm_1', total: 250000 }),
      r('POST', '/api/v1/score', 'Score cliente', { approved: true, limit: 2000000 }, { docId: '12345' })
    ] },
  { cat: 'fintech', slug: 'pymebank', title: 'PymeBank', summary: 'Neobanco para PYMEs LATAM: cuenta empresarial, facturación, nómina.',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'Kafka', 'Redis'],
    modules: ['cuenta', 'facturación SAT/DIAN', 'nómina', 'préstamos', 'tarjetas'],
    routes: [
      r('GET', '/api/v1/business', 'Resumen', { rfc: 'XXX0000000', balance: 12400000, employees: 14 }),
      r('GET', '/api/v1/invoices', 'Facturas', { invoices: [{ id: 'inv_1', total: 580000, status: 'stamped' }] }),
      r('POST', '/api/v1/payroll', 'Correr nómina', { runId: 'pr_001', totalNet: 8400000 }, { period: '2026-05', employees: 14 }),
      r('POST', '/api/v1/loans/apply', 'Préstamo', { applicationId: 'app_001', preApproved: true }, { amount: 5000000, term: 24 })
    ] },
  { cat: 'fintech', slug: 'scorelat', title: 'ScoreLAT', summary: 'Scoring crediticio AI con datos alternativos: telco, utilities, e-commerce.',
    stack: ['Next.js 14', 'FastAPI', 'PostgreSQL', 'XGBoost', 'Spark'],
    modules: ['ingesta', 'features', 'modelos', 'API scoring', 'explicabilidad'],
    routes: [
      r('GET', '/api/v1/models', 'Modelos', { models: [{ id: 'mdl_1', name: 'credit_v3', auc: 0.84 }] }),
      r('GET', '/api/v1/features', 'Features', { features: ['telco_avg', 'utilities_late_pct'] }),
      r('POST', '/api/v1/score', 'Score', { score: 712, riskBand: 'medium' }, { docId: '12345', country: 'CO' }),
      r('POST', '/api/v1/explain', 'Explicar', { shapValues: { telco_avg: 0.31 } }, { scoreId: 's_001' })
    ] },
  { cat: 'fintech', slug: 'treasuryx', title: 'TreasuryX', summary: 'Tesorería corporativa LATAM multi-moneda con cash forecasting AI.',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'ClickHouse', 'Prophet'],
    modules: ['multi-moneda', 'forecast', 'FX hedging', 'pagos', 'reportes'],
    routes: [
      r('GET', '/api/v1/positions', 'Posiciones', { positions: [{ ccy: 'USD', amount: 480000 }] }),
      r('GET', '/api/v1/forecast', 'Forecast 30d', { points: [{ day: 1, ccy: 'USD', expected: 12400 }] }),
      r('POST', '/api/v1/hedge', 'Hedge FX', { hedgeId: 'h_001', rate: 5.42 }, { from: 'BRL', to: 'USD', amount: 500000 }),
      r('POST', '/api/v1/payments/batch', 'Batch pagos', { batchId: 'b_001', total: 8400000 }, { count: 42 })
    ] },
  { cat: 'fintech', slug: 'factorlat', title: 'FactorLAT', summary: 'Marketplace de factoring/invoice finance B2B en LATAM.',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'Redis', 'Postgres'],
    modules: ['emisores', 'inversionistas', 'subasta', 'cobranza', 'compliance'],
    routes: [
      r('GET', '/api/v1/invoices/available', 'Facturas en oferta', { items: [{ id: 'inv_1', faceValue: 2400000, discountPctTarget: 8 }] }),
      r('GET', '/api/v1/portfolio', 'Portafolio', { totalUSD: 84000, irrAvg: 0.142 }),
      r('POST', '/api/v1/bid', 'Bid', { bidId: 'b_001', status: 'queued' }, { invoiceId: 'inv_1', discountPct: 7.5 }),
      r('POST', '/api/v1/invoices', 'Subir factura', { id: 'inv_new', status: 'validating' }, { xmlUrl: 'https://...' })
    ] },
  { cat: 'fintech', slug: 'escrowchain', title: 'EscrowChain', summary: 'Escrow on-chain para freelance, M&A y comercio internacional.',
    stack: ['Next.js 14', 'Foundry', 'Solidity', 'PostgreSQL', 'Ethers'],
    modules: ['contratos', 'milestones', 'disputas', 'oracle', 'multisig'],
    routes: [
      r('GET', '/api/v1/contracts', 'Contratos', { contracts: [{ id: 'ec_1', amount: 5000, token: 'USDC' }] }),
      r('GET', '/api/v1/disputes', 'Disputas', { disputes: [{ contractId: 'ec_1', status: 'arbitration' }] }),
      r('POST', '/api/v1/contracts', 'Deploy escrow', { contractAddress: '0xnew' }, { buyer: '0xa', seller: '0xb', amount: 5000 }),
      r('POST', '/api/v1/release', 'Liberar milestone', { tx: '0xtx', releasedAmount: 1666.67 }, { contractId: 'ec_1', milestoneIndex: 0 })
    ] },
  { cat: 'fintech', slug: 'payhub', title: 'PayHub', summary: 'Super-app de pagos: P2P, QR, recargas, servicios, cashback.',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'Redis', 'Kafka'],
    modules: ['wallet', 'P2P', 'QR', 'recargas', 'cashback'],
    routes: [
      r('GET', '/api/v1/wallet', 'Wallet', { balance: 142500, currency: 'COP', cashback: 8400 }),
      r('GET', '/api/v1/services', 'Servicios', { services: ['celular', 'luz', 'agua', 'internet'] }),
      r('POST', '/api/v1/p2p/send', 'Enviar P2P', { txId: 'tx_001', status: 'completed' }, { alias: 'pedro.co', amount: 25000 }),
      r('POST', '/api/v1/services/pay', 'Pagar servicio', { receiptId: 'rec_001', cashback: 600 }, { service: 'celular', amount: 30000 })
    ] },

  // ===== HealthTech (10) =====
  { cat: 'healthtech', slug: 'telemedlat', title: 'TelemedLAT', summary: 'Telemedicina LATAM: consultas video, recetas digitales, integración EPS.',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'Twilio Video', 'Redis'],
    modules: ['agenda', 'videoconsulta', 'recetas', 'historial', 'pagos'],
    routes: [
      r('GET', '/api/v1/appointments', 'Citas', { items: [{ id: 'ap_1', doctor: 'Dr. Pérez', date: '2026-05-22T10:00' }] }),
      r('GET', '/api/v1/doctors', 'Médicos', { doctors: [{ id: 'd_1', name: 'Dr. Pérez', specialty: 'Cardio', rating: 4.8 }] }),
      r('POST', '/api/v1/book', 'Agendar', { appointmentId: 'ap_new', status: 'confirmed' }, { doctorId: 'd_1', slot: '...' }),
      r('POST', '/api/v1/prescriptions', 'Receta', { prescriptionId: 'rx_001' }, { appointmentId: 'ap_1', meds: [] })
    ] },
  { cat: 'healthtech', slug: 'cronoshr', title: 'CronosHR', summary: 'EHR open source LATAM: historial clínico unificado HL7/FHIR.',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'HAPI FHIR', 'OAuth2'],
    modules: ['pacientes', 'encounters', 'condiciones', 'medicación', 'observaciones'],
    routes: [
      r('GET', '/api/v1/patients', 'Pacientes', { patients: [{ id: 'p_1', name: 'Ana M.', dob: '1985-04-12' }] }),
      r('GET', '/api/v1/encounters', 'Encuentros', { encounters: [{ id: 'e_1', date: '2026-04-10', reason: 'Control' }] }),
      r('POST', '/api/v1/observations', 'Observación', { id: 'obs_001', status: 'final' }, { patientId: 'p_1', loinc: '8302-2', value: 168 }),
      r('POST', '/api/v1/conditions', 'Condición', { id: 'cond_001', verificationStatus: 'confirmed' }, { patientId: 'p_1', icd10: 'I10' })
    ] },
  { cat: 'healthtech', slug: 'triajeai', title: 'TriajeAI', summary: 'Triage AI para urgencias y atención primaria con clasificación Manchester.',
    stack: ['Next.js 14', 'FastAPI', 'PostgreSQL', 'Anthropic'],
    modules: ['triage', 'protocolos', 'derivación', 'audit', 'analytics'],
    routes: [
      r('GET', '/api/v1/protocols', 'Protocolos', { protocols: ['manchester', 'esi', 'canadian-cts'] }),
      r('GET', '/api/v1/sessions/recent', 'Sesiones', { sessions: [{ id: 'tr_1', level: 'amarillo' }] }),
      r('POST', '/api/v1/triage', 'Triage', { level: 'verde', confidence: 0.84 }, { symptoms: ['fiebre'], age: 34 }),
      r('POST', '/api/v1/refer', 'Derivar', { referralId: 'ref_001', urgent: true }, { triageId: 'tr_1', specialty: 'cardio' })
    ] },
  { cat: 'healthtech', slug: 'medreminder', title: 'MedReminder', summary: 'App de adherencia a tratamiento: recordatorios, refills, analytics.',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'Firebase', 'Twilio'],
    modules: ['recordatorios', 'medicamentos', 'adherencia', 'farmacia', 'caregivers'],
    routes: [
      r('GET', '/api/v1/meds', 'Medicamentos', { meds: [{ id: 'm_1', name: 'Losartán 50mg', adherencePct: 0.87 }] }),
      r('GET', '/api/v1/today', 'Tomas hoy', { items: [{ medId: 'm_1', time: '08:00', taken: true }] }),
      r('POST', '/api/v1/log', 'Logear toma', { logged: true, streakDays: 14 }, { medId: 'm_1', time: '08:00', taken: true }),
      r('POST', '/api/v1/refill', 'Refill', { orderId: 'ref_001', eta: '24h' }, { medId: 'm_1' })
    ] },
  { cat: 'healthtech', slug: 'calmamente', title: 'CalmaMente', summary: 'Salud mental con chat AI + matching con terapeutas LATAM certificados.',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'Anthropic', 'Twilio'],
    modules: ['chat', 'screening', 'matching', 'sesiones', 'crisis'],
    routes: [
      r('GET', '/api/v1/therapists', 'Terapeutas', { therapists: [{ id: 't_1', name: 'Dra. Silva', priceUSD: 35 }] }),
      r('GET', '/api/v1/screenings', 'Tests', { tests: ['PHQ-9', 'GAD-7', 'PSS-10'] }),
      r('POST', '/api/v1/chat', 'Chat AI', { reply: 'cuéntame más...', safetyFlags: [] }, { text: 'ansiedad' }),
      r('POST', '/api/v1/screening', 'Tomar test', { score: 7, level: 'mild' }, { test: 'PHQ-9', answers: [1, 2] })
    ] },
  { cat: 'healthtech', slug: 'fitcoach', title: 'FitCoach', summary: 'Entrenador AI con plan personalizado: ejercicio, recuperación, nutrición.',
    stack: ['Next.js 14', 'FastAPI', 'PostgreSQL', 'Anthropic'],
    modules: ['plan', 'rutinas', 'wearable sync', 'progreso', 'comunidad'],
    routes: [
      r('GET', '/api/v1/plan', 'Plan', { goal: 'fuerza', weeks: 12, currentWeek: 3 }),
      r('GET', '/api/v1/today', 'Sesión hoy', { exercises: [{ name: 'Sentadilla', sets: 4, reps: 8 }] }),
      r('POST', '/api/v1/log', 'Logear', { logged: true, prDetected: true }, { exerciseId: 'sentadilla', sets: [80] }),
      r('POST', '/api/v1/plan/regenerate', 'Replan', { jobId: 'pl_001', etaSeconds: 8 }, { reason: 'lesión' })
    ] },
  { cat: 'healthtech', slug: 'nutriplan', title: 'NutriPlan', summary: 'Nutrición AI con menús LATAM, conteo macros y compras integradas.',
    stack: ['Next.js 14', 'FastAPI', 'PostgreSQL', 'Anthropic', 'Rappi API'],
    modules: ['perfil', 'menús', 'recetas', 'compras', 'tracking'],
    routes: [
      r('GET', '/api/v1/menu/today', 'Menú', { meals: [{ time: 'desayuno', name: 'Arepa + huevo', kcal: 420 }] }),
      r('GET', '/api/v1/macros', 'Macros', { kcal: 2200, proteinG: 140, carbsG: 240, fatG: 70 }),
      r('POST', '/api/v1/log/meal', 'Loggear', { kcal: 320, addedTo: 'desayuno' }, { name: 'Arepa', portion: 1 }),
      r('POST', '/api/v1/order/groceries', 'Pedir', { rappiOrderId: 'rp_001', etaMinutes: 35 }, { menuId: 'wk_22' })
    ] },
  { cat: 'healthtech', slug: 'genomalab', title: 'GenomaLab', summary: 'Registro genómico personal con interpretación AI y privacidad zero-knowledge.',
    stack: ['Next.js 14', 'FastAPI', 'PostgreSQL', 'Snakemake', 'IPFS'],
    modules: ['uploads', 'pipeline', 'variantes', 'reportes', 'sharing'],
    routes: [
      r('GET', '/api/v1/profiles', 'Perfiles', { profiles: [{ id: 'g_1', vendor: '23andme', variantsAnnotated: 482000 }] }),
      r('GET', '/api/v1/reports', 'Reportes', { reports: [{ id: 'r_1', type: 'farmaco', findings: 4 }] }),
      r('POST', '/api/v1/upload', 'Upload', { profileId: 'g_new', status: 'processing' }, { vendor: '23andme', fileUrl: 'https://...' }),
      r('POST', '/api/v1/share', 'Share', { token: 'zk_token', expiresIn: 86400 }, { profileId: 'g_1', email: 'dr@x.com' })
    ] },
  { cat: 'healthtech', slug: 'biowear', title: 'BioWear', summary: 'Biomarkers en tiempo real de wearables (HRV, SpO2, glucosa) con alertas.',
    stack: ['Next.js 14', 'FastAPI', 'TimescaleDB', 'Kafka', 'Anthropic'],
    modules: ['devices', 'ingesta', 'alertas', 'tendencias', 'sharing médico'],
    routes: [
      r('GET', '/api/v1/devices', 'Dispositivos', { devices: [{ id: 'd_1', vendor: 'Garmin', battery: 0.82 }] }),
      r('GET', '/api/v1/biomarkers/today', 'Biomarkers', { hrvAvg: 48, restingHR: 62, spO2Avg: 0.97 }),
      r('POST', '/api/v1/alerts', 'Configurar alerta', { id: 'al_001', active: true }, { metric: 'hrv', threshold: 30 }),
      r('POST', '/api/v1/share/doctor', 'Share doctor', { reportUrl: 'https://...' }, { doctorEmail: 'dr@x.com', days: 30 })
    ] },
  { cat: 'healthtech', slug: 'saludmarket', title: 'SaludMarket', summary: 'Marketplace de servicios de salud: estudios, vacunas, terapias a domicilio.',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'Redis', 'Stripe'],
    modules: ['catálogo', 'agenda', 'pagos', 'proveedores', 'reviews'],
    routes: [
      r('GET', '/api/v1/services', 'Servicios', { services: [{ id: 's_1', name: 'Perfil lipídico', priceCOP: 65000 }] }),
      r('GET', '/api/v1/providers', 'Proveedores', { providers: [{ id: 'p_1', name: 'Cruz Verde', rating: 4.7 }] }),
      r('POST', '/api/v1/book', 'Reservar', { bookingId: 'bk_001', status: 'confirmed' }, { serviceId: 's_1', date: '2026-05-25' }),
      r('POST', '/api/v1/review', 'Review', { reviewId: 'rv_001' }, { bookingId: 'bk_001', rating: 5 })
    ] },

  // ===== ClimateTech (10) =====
  { cat: 'climatetech', slug: 'carbontrack', title: 'CarbonTrack', summary: 'Medición de huella de carbono corporativa scope 1/2/3 con auto-reporte GHG.',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'dbt', 'Redis'],
    modules: ['inventario', 'scope 1/2/3', 'reportes', 'GHG protocol', 'sci targets'],
    routes: [
      r('GET', '/api/v1/inventory', 'Inventario', { totalTCO2e: 14820, scope1: 4200, scope2: 6420, scope3: 4200 }),
      r('GET', '/api/v1/sources', 'Fuentes', { sources: [{ id: 's_1', name: 'Flota', scope: 1, tCO2e: 2100 }] }),
      r('POST', '/api/v1/activity', 'Activity', { tCO2e: 5.2, factor: 0.000433 }, { sourceId: 's_1', kwh: 12000 }),
      r('POST', '/api/v1/report/generate', 'Reporte GHG', { reportId: 'rep_001', status: 'generating' }, { year: 2026 })
    ] },
  { cat: 'climatetech', slug: 'carbonmarket', title: 'CarbonMarket', summary: 'Marketplace de créditos de carbono verificados (Verra, Gold Standard) LATAM.',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'Ethers', 'Stripe'],
    modules: ['catálogo', 'proyectos', 'compra', 'retiro', 'verificación'],
    routes: [
      r('GET', '/api/v1/projects', 'Proyectos', { projects: [{ id: 'cp_1', name: 'Amazonas', tCO2eAvail: 4200, pricePerT: 12 }] }),
      r('GET', '/api/v1/portfolio', 'Portafolio', { totalTCO2e: 180, retiredTCO2e: 60 }),
      r('POST', '/api/v1/buy', 'Comprar', { orderId: 'or_001', total: 600 }, { projectId: 'cp_1', tCO2e: 50 }),
      r('POST', '/api/v1/retire', 'Retirar', { retirementId: 're_001', certificateUrl: 'https://...' }, { tCO2e: 50, reason: 'CSR' })
    ] },
  { cat: 'climatetech', slug: 'airesensor', title: 'AireSensor', summary: 'Red IoT de sensores de calidad de aire en ciudades LATAM con alertas.',
    stack: ['Next.js 14', 'FastAPI', 'TimescaleDB', 'MQTT', 'Mapbox'],
    modules: ['sensores', 'mapas', 'alertas', 'predicción', 'API pública'],
    routes: [
      r('GET', '/api/v1/sensors', 'Sensores', { sensors: [{ id: 'ss_1', city: 'Bogotá', pm25: 28, aqi: 84 }] }),
      r('GET', '/api/v1/cities', 'Ciudades', { cities: [{ name: 'Bogotá', avgAqi: 82 }] }),
      r('POST', '/api/v1/alerts', 'Suscribir', { subscriptionId: 'sub_001' }, { city: 'Bogotá', threshold: 100 }),
      r('POST', '/api/v1/readings', 'Push lectura', { stored: true }, { sensorId: 'ss_1', pm25: 32 })
    ] },
  { cat: 'climatetech', slug: 'solarmesh', title: 'SolarMesh', summary: 'Plataforma para microgrids solares comunitarios con tokenización energía.',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'InfluxDB', 'Ethers'],
    modules: ['sites', 'producción', 'consumo', 'P2P energy', 'tokens'],
    routes: [
      r('GET', '/api/v1/sites', 'Sitios', { sites: [{ id: 'st_1', name: 'Sol del Valle', capacityKw: 240 }] }),
      r('GET', '/api/v1/production', 'Producción', { totalKwh: 1840, avgKw: 76.7 }),
      r('POST', '/api/v1/trade', 'P2P energy', { tradeId: 'tr_001', priceTokens: 4.5 }, { fromHome: 'h_1', toHome: 'h_2', kwh: 4.5 }),
      r('POST', '/api/v1/forecast', 'Forecast', { points: [{ hour: 12, kwh: 198 }] }, { siteId: 'st_1', hours: 24 })
    ] },
  { cat: 'climatetech', slug: 'reforestapp', title: 'ReforestaApp', summary: 'Tracker satelital de proyectos de reforestación con verificación geoespacial.',
    stack: ['Next.js 14', 'FastAPI', 'PostGIS', 'Sentinel-2', 'Anthropic'],
    modules: ['proyectos', 'parcelas', 'monitoreo NDVI', 'verificación', 'reportes'],
    routes: [
      r('GET', '/api/v1/projects', 'Proyectos', { projects: [{ id: 'rp_1', name: 'Manglares', hectares: 1240 }] }),
      r('GET', '/api/v1/ndvi', 'NDVI', { series: [{ date: '2026-01', avgNdvi: 0.42 }] }),
      r('POST', '/api/v1/parcels', 'Parcela', { parcelId: 'pc_001', areaHa: 12.4 }, { projectId: 'rp_1', geojson: {} }),
      r('POST', '/api/v1/verify', 'Verificar satélite', { jobId: 'v_001', status: 'queued' }, { parcelId: 'pc_001' })
    ] },
  { cat: 'climatetech', slug: 'agrisust', title: 'AgriSust', summary: 'Agritech sustentable: precision farming, agua, suelo, agricultura regenerativa.',
    stack: ['Next.js 14', 'FastAPI', 'PostgreSQL', 'LoRaWAN', 'Anthropic'],
    modules: ['parcelas', 'sensores', 'riego', 'recomendaciones', 'mercado'],
    routes: [
      r('GET', '/api/v1/fields', 'Parcelas', { fields: [{ id: 'fl_1', name: 'Lote Norte', hectares: 18 }] }),
      r('GET', '/api/v1/sensors/soil', 'Sensores suelo', { sensors: [{ id: 'ss_1', moisturePct: 28, ph: 6.4 }] }),
      r('POST', '/api/v1/irrigation', 'Riego', { scheduleId: 'irr_001' }, { fieldId: 'fl_1', mm: 12 }),
      r('POST', '/api/v1/recommend', 'Recomendar', { actions: ['Aplicar potasio 40kg/ha'] }, { fieldId: 'fl_1' })
    ] },
  { cat: 'climatetech', slug: 'recicalop', title: 'ReciclaLoop', summary: 'Plataforma de economía circular: residuos B2B + marketplace materiales reciclados.',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'Redis', 'Stripe'],
    modules: ['oferentes', 'demandantes', 'logística', 'trazabilidad', 'reportes'],
    routes: [
      r('GET', '/api/v1/listings', 'Listados', { listings: [{ id: 'l_1', material: 'PET', tons: 8.4 }] }),
      r('GET', '/api/v1/orders', 'Órdenes', { orders: [{ id: 'or_1', tons: 4, status: 'in_transit' }] }),
      r('POST', '/api/v1/listings', 'Publicar', { id: 'l_new', status: 'live' }, { material: 'cartón', tons: 12 }),
      r('POST', '/api/v1/orders', 'Comprar lote', { orderId: 'or_new', total: 1520 }, { listingId: 'l_1', tons: 4 })
    ] },
  { cat: 'climatetech', slug: 'climamodel', title: 'ClimaModel', summary: 'Modelado climático local con descarga estadística y proyecciones IPCC.',
    stack: ['Next.js 14', 'FastAPI', 'xarray', 'PostgreSQL', 'Anthropic'],
    modules: ['scenarios', 'descarga', 'ensemble', 'riesgos', 'reportes'],
    routes: [
      r('GET', '/api/v1/scenarios', 'Escenarios', { scenarios: ['SSP1-2.6', 'SSP2-4.5', 'SSP5-8.5'] }),
      r('GET', '/api/v1/projections', 'Proyección', { city: 'Lima', tempIncrease2050C: 1.8 }),
      r('POST', '/api/v1/analyze', 'Analizar', { risks: ['sequía'], score: 0.72 }, { lat: -12, lng: -77, scenario: 'SSP2-4.5' }),
      r('POST', '/api/v1/report', 'Reporte', { reportId: 'cm_001', status: 'queued' }, { region: 'Lima' })
    ] },
  { cat: 'climatetech', slug: 'evhub', title: 'EVHub', summary: 'Red de carga EV LATAM con roaming, ruta inteligente y reservas.',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'OCPP', 'Mapbox'],
    modules: ['estaciones', 'roaming', 'reservas', 'ruta inteligente', 'pagos'],
    routes: [
      r('GET', '/api/v1/stations', 'Estaciones', { stations: [{ id: 'st_1', name: 'Andina Norte', kw: 150 }] }),
      r('GET', '/api/v1/sessions', 'Sesiones', { sessions: [{ id: 'cs_1', kwh: 28.4 }] }),
      r('POST', '/api/v1/reserve', 'Reservar', { reservationId: 'rs_001', holdMinutes: 15 }, { stationId: 'st_1' }),
      r('POST', '/api/v1/route', 'Planificar', { stops: [{ stationId: 'st_4', chargeMinutes: 25 }] }, { from: 'Bogotá', to: 'Medellín' })
    ] },
  { cat: 'climatetech', slug: 'esgreport', title: 'ESGReport', summary: 'Auto-reporte ESG (TCFD, ISSB, GRI) con scoring AI y data lake.',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'dbt', 'Anthropic'],
    modules: ['frameworks', 'data ingestion', 'scoring', 'reportes', 'audit'],
    routes: [
      r('GET', '/api/v1/frameworks', 'Frameworks', { frameworks: ['TCFD', 'ISSB-S1', 'GRI', 'SASB'] }),
      r('GET', '/api/v1/score', 'Score ESG', { score: 72, e: 68, s: 78, g: 70 }),
      r('POST', '/api/v1/data/upload', 'Upload', { ingestId: 'in_001', rowsParsed: 1840 }, { framework: 'TCFD' }),
      r('POST', '/api/v1/report/generate', 'Reporte', { reportId: 'rep_001', status: 'rendering' }, { framework: 'TCFD' })
    ] },

  // ===== EdTech (10) NEW =====
  { cat: 'edtech', slug: 'aulalat', title: 'AulaLAT', summary: 'LMS LATAM con AI tutor, learning paths adaptativos y multi-idioma.',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'Redis', 'Anthropic'],
    modules: ['cursos', 'AI tutor', 'evaluación', 'gamification', 'analytics'],
    routes: [
      r('GET', '/api/v1/courses', 'Cursos', { courses: [{ id: 'c_1', title: 'Algoritmos', students: 1420 }] }),
      r('GET', '/api/v1/progress', 'Progreso', { courseId: 'c_1', completionPct: 0.62, streak: 8 }),
      r('POST', '/api/v1/tutor/ask', 'Preguntar tutor', { answer: 'La complejidad es O(n)...', sources: ['unit_4'] }, { courseId: 'c_1', question: '¿qué es Big O?' }),
      r('POST', '/api/v1/enroll', 'Enrolar', { enrollmentId: 'e_001', startDate: '2026-05-20' }, { courseId: 'c_1' })
    ] },
  { cat: 'edtech', slug: 'pathfinderai', title: 'PathfinderAI', summary: 'Coaching de carrera con AI: roadmap personalizado y matching de oportunidades.',
    stack: ['Next.js 14', 'FastAPI', 'PostgreSQL', 'Anthropic'],
    modules: ['perfil', 'roadmap', 'oportunidades', 'mentoring', 'progreso'],
    routes: [
      r('GET', '/api/v1/roadmap', 'Roadmap', { goal: 'Senior FE Eng', milestones: [{ name: 'React avanzado', status: 'done' }] }),
      r('GET', '/api/v1/opportunities', 'Oportunidades', { items: [{ company: 'StartupX', role: 'Sr FE', matchPct: 0.84 }] }),
      r('POST', '/api/v1/assessment', 'Assessment', { strengths: ['React', 'TS'], gaps: ['System Design'] }, { resume: '...' }),
      r('POST', '/api/v1/coaching/session', 'Sesión coach', { sessionId: 'cs_001', scheduledAt: '2026-05-22' }, { topic: 'leadership' })
    ] },
  { cat: 'edtech', slug: 'cursoslive', title: 'CursosLive', summary: 'Streaming educativo bidireccional: clases live, Q&A en vivo, certificación.',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'WebRTC', 'Redis'],
    modules: ['clases live', 'salas', 'Q&A', 'certificación', 'pagos'],
    routes: [
      r('GET', '/api/v1/lives', 'Lives programados', { lives: [{ id: 'l_1', title: 'JS avanzado', instructor: 'Ana', startAt: '2026-05-22T18:00' }] }),
      r('GET', '/api/v1/rooms', 'Salas activas', { rooms: [{ id: 'r_1', participants: 84, maxCapacity: 100 }] }),
      r('POST', '/api/v1/lives/join', 'Unirse', { rtcToken: 'tok_001', expiresIn: 7200 }, { liveId: 'l_1' }),
      r('POST', '/api/v1/qa/ask', 'Preguntar Q&A', { questionId: 'q_001', position: 3 }, { liveId: 'l_1', text: '¿closures?' })
    ] },
  { cat: 'edtech', slug: 'testprep', title: 'TestPrep', summary: 'Preparación adaptativa a exámenes oficiales: LSAT, MCAT, ICFES, ENEM, PAES.',
    stack: ['Next.js 14', 'FastAPI', 'PostgreSQL', 'XGBoost', 'Anthropic'],
    modules: ['simulacros', 'banco preguntas', 'adaptive learning', 'analytics', 'tutor'],
    routes: [
      r('GET', '/api/v1/exams', 'Exámenes', { exams: ['ICFES', 'ENEM', 'PAES', 'LSAT', 'MCAT'] }),
      r('GET', '/api/v1/diagnostics', 'Diagnóstico', { score: 720, percentile: 78, weakAreas: ['lectura crítica'] }),
      r('POST', '/api/v1/simulacro', 'Simulacro', { simulacroId: 'sim_001', durationMin: 180 }, { exam: 'ICFES' }),
      r('POST', '/api/v1/answer', 'Responder', { correct: true, explanation: '...' }, { questionId: 'q_1', answer: 'B' })
    ] },
  { cat: 'edtech', slug: 'codeacad', title: 'CodeAcad', summary: 'Bootcamp coding LATAM con proyectos reales, mentores y bolsa de empleo.',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'Docker', 'Redis'],
    modules: ['cohortes', 'proyectos', 'mentoring', 'sandbox', 'placement'],
    routes: [
      r('GET', '/api/v1/cohorts', 'Cohortes', { cohorts: [{ id: 'co_1', stack: 'Fullstack JS', students: 28, startsAt: '2026-06-01' }] }),
      r('GET', '/api/v1/projects', 'Proyectos', { projects: [{ id: 'pr_1', title: 'Clone E-commerce', difficulty: 'medium' }] }),
      r('POST', '/api/v1/sandbox/run', 'Run sandbox', { runId: 'r_001', output: 'Hello World', exitCode: 0 }, { lang: 'js', code: 'console.log("Hello World")' }),
      r('POST', '/api/v1/apply', 'Aplicar cohorte', { applicationId: 'app_001', status: 'review' }, { cohortId: 'co_1' })
    ] },
  { cat: 'edtech', slug: 'idiomaslatam', title: 'IdiomasLATAM', summary: 'Aprende idiomas nativos LATAM (quechua, guaraní, náhuatl, aymara, mapudungun).',
    stack: ['Next.js 14', 'FastAPI', 'PostgreSQL', 'Whisper', 'TTS'],
    modules: ['lecciones', 'audio nativo', 'speaking', 'cultura', 'comunidad'],
    routes: [
      r('GET', '/api/v1/languages', 'Idiomas', { languages: ['qu', 'gn', 'nah', 'ay', 'arn'] }),
      r('GET', '/api/v1/lessons', 'Lecciones', { lessons: [{ id: 'l_1', lang: 'qu', title: 'Saludos', durationMin: 12 }] }),
      r('POST', '/api/v1/speak', 'Evaluar pronunciación', { score: 0.82, feedback: 'enfatiza la "ll"' }, { lang: 'qu', audioUrl: '...' }),
      r('POST', '/api/v1/progress', 'Logear', { xp: 24, levelUp: false }, { lessonId: 'l_1', completed: true })
    ] },
  { cat: 'edtech', slug: 'kidsacad', title: 'KidsAcad', summary: 'Plataforma educativa para niños 5-12: gamification, parental control, currículo LATAM.',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'Phaser', 'Firebase'],
    modules: ['actividades', 'gamification', 'parental', 'progreso', 'reportes'],
    routes: [
      r('GET', '/api/v1/activities', 'Actividades', { activities: [{ id: 'a_1', title: 'Matemáticas mágicas', age: '7-9', durationMin: 15 }] }),
      r('GET', '/api/v1/parental/dashboard', 'Dashboard padres', { childId: 'k_1', screenTimeMin: 42, mostUsedSubject: 'mate' }),
      r('POST', '/api/v1/activity/complete', 'Completar', { stars: 3, xp: 24, badges: ['speedster'] }, { activityId: 'a_1' }),
      r('POST', '/api/v1/parental/limit', 'Límite tiempo', { dailyMaxMin: 60, active: true }, { childId: 'k_1', dailyMaxMin: 60 })
    ] },
  { cat: 'edtech', slug: 'certverify', title: 'CertVerify', summary: 'Verificación blockchain de títulos académicos y certificaciones profesionales.',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'Ethers', 'IPFS'],
    modules: ['emisión', 'verificación', 'wallet credenciales', 'integraciones', 'audit'],
    routes: [
      r('GET', '/api/v1/credentials', 'Credenciales', { credentials: [{ id: 'cr_1', title: 'BS CS', issuer: 'Universidad X', issuedAt: '2025-12-15' }] }),
      r('GET', '/api/v1/issuers', 'Emisores', { issuers: [{ id: 'is_1', name: 'Universidad X', verified: true }] }),
      r('POST', '/api/v1/verify', 'Verificar', { valid: true, issuer: 'Universidad X', issuedAt: '2025-12-15' }, { credentialHash: '0xabc...' }),
      r('POST', '/api/v1/issue', 'Emitir', { credentialId: 'cr_new', txHash: '0xtx...' }, { recipient: '0xa...', credentialData: {} })
    ] },
  { cat: 'edtech', slug: 'skillboard', title: 'SkillBoard', summary: 'Recruiting con skill graph: matching técnico, evaluación, take-home automatizado.',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'XGBoost', 'Docker'],
    modules: ['perfil técnico', 'jobs', 'matching', 'evaluaciones', 'analytics'],
    routes: [
      r('GET', '/api/v1/jobs', 'Jobs', { jobs: [{ id: 'j_1', title: 'Sr BE Eng', company: 'StartupX', remote: true, salaryUSD: 6000 }] }),
      r('GET', '/api/v1/matches', 'Matches', { matches: [{ jobId: 'j_1', score: 0.91, gaps: ['rust'] }] }),
      r('POST', '/api/v1/evaluations/start', 'Empezar eval', { evalId: 'ev_001', durationMin: 60 }, { jobId: 'j_1', type: 'take-home' }),
      r('POST', '/api/v1/apply', 'Aplicar', { applicationId: 'app_001', status: 'submitted' }, { jobId: 'j_1' })
    ] },
  { cat: 'edtech', slug: 'teachershub', title: 'TeachersHub', summary: 'Comunidad de docentes: recursos didácticos, planeación AI, marketplace.',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'Anthropic', 'S3'],
    modules: ['recursos', 'planeador AI', 'marketplace', 'comunidad', 'eventos'],
    routes: [
      r('GET', '/api/v1/resources', 'Recursos', { resources: [{ id: 'r_1', title: 'Plan unidad fracciones', grade: 5, downloads: 1240 }] }),
      r('GET', '/api/v1/feed', 'Feed', { posts: [{ id: 'p_1', author: 'María L.', topic: 'gamification' }] }),
      r('POST', '/api/v1/lessonplan', 'Generar plan', { planUrl: '/plans/...', durationMin: 45 }, { topic: 'fotosíntesis', grade: 7 }),
      r('POST', '/api/v1/marketplace/purchase', 'Comprar', { receiptId: 'rc_001', total: 12000 }, { resourceId: 'r_1' })
    ] },

  // ===== DevTools / Infrastructure (10) NEW =====
  { cat: 'devtools', slug: 'flagship', title: 'FlagShip', summary: 'Feature flags self-hosted: rollouts gradual, A/B, segmentación, SDKs multi-lenguaje.',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'Redis', 'TypeScript'],
    modules: ['flags', 'environments', 'rollouts', 'A/B', 'analytics'],
    routes: [
      r('GET', '/api/v1/flags', 'Flags', { flags: [{ key: 'new_checkout', enabled: true, rolloutPct: 25, env: 'prod' }] }),
      r('GET', '/api/v1/environments', 'Environments', { environments: ['dev', 'staging', 'prod'] }),
      r('POST', '/api/v1/flags', 'Crear flag', { id: 'fl_new', status: 'created' }, { key: 'dark_mode', default: false }),
      r('POST', '/api/v1/flags/evaluate', 'Evaluar', { value: true, reason: 'rollout-percent' }, { key: 'new_checkout', userId: 'u_123' })
    ] },
  { cat: 'devtools', slug: 'observalat', title: 'ObservaLAT', summary: 'Observabilidad open source: logs, métricas, traces, alertas, OpenTelemetry.',
    stack: ['Next.js 14', 'Go', 'ClickHouse', 'OpenTelemetry', 'Redis'],
    modules: ['logs', 'métricas', 'traces', 'alertas', 'dashboards'],
    routes: [
      r('GET', '/api/v1/services', 'Servicios', { services: [{ name: 'api-gw', errorRate: 0.004, p95Ms: 142 }] }),
      r('GET', '/api/v1/alerts', 'Alertas activas', { alerts: [{ id: 'al_1', service: 'api-gw', severity: 'warn' }] }),
      r('POST', '/api/v1/query', 'Query logs', { results: 1842, traces: ['tr_1', 'tr_2'] }, { query: 'service=api-gw severity=error', range: '1h' }),
      r('POST', '/api/v1/alerts', 'Crear alerta', { id: 'al_new', active: true }, { service: 'api-gw', threshold: { errorRate: 0.02 } })
    ] },
  { cat: 'devtools', slug: 'deployhaus', title: 'DeployHaus', summary: 'PaaS bare-metal LATAM: deploy Git-based, autoscaling, secretos, dominios.',
    stack: ['Next.js 14', 'NestJS', 'Docker', 'Nomad', 'PostgreSQL'],
    modules: ['apps', 'builds', 'autoscaling', 'secretos', 'dominios'],
    routes: [
      r('GET', '/api/v1/apps', 'Apps', { apps: [{ id: 'a_1', name: 'frontend', region: 'sao-1', status: 'running', instances: 3 }] }),
      r('GET', '/api/v1/builds', 'Builds', { builds: [{ id: 'b_1', appId: 'a_1', commit: '7f3a...', status: 'success', durationSec: 84 }] }),
      r('POST', '/api/v1/deploy', 'Deploy', { buildId: 'b_new', status: 'building' }, { appId: 'a_1', branch: 'main' }),
      r('POST', '/api/v1/scale', 'Escalar', { newInstances: 5, status: 'scaling' }, { appId: 'a_1', instances: 5 })
    ] },
  { cat: 'devtools', slug: 'secretsvault', title: 'SecretsVault', summary: 'Gestión de secretos zero-trust con rotación automática y audit total.',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'Vault', 'KMS'],
    modules: ['secretos', 'rotación', 'políticas', 'audit', 'SDKs'],
    routes: [
      r('GET', '/api/v1/secrets', 'Secretos', { secrets: [{ key: 'DB_PASSWORD', env: 'prod', version: 12, rotateInDays: 45 }] }),
      r('GET', '/api/v1/audit', 'Audit', { events: [{ ts: '2026-05-19T10:00', action: 'read', secret: 'DB_PASSWORD', user: 'svc:api' }] }),
      r('POST', '/api/v1/secrets', 'Crear secret', { key: 'API_KEY', version: 1 }, { key: 'API_KEY', value: '***', env: 'prod' }),
      r('POST', '/api/v1/secrets/rotate', 'Rotar', { newVersion: 13, completedAt: new Date().toISOString() }, { key: 'DB_PASSWORD' })
    ] },
  { cat: 'devtools', slug: 'apimesh', title: 'APIMesh', summary: 'API gateway open source: routing, auth, rate limit, transformaciones, observabilidad.',
    stack: ['Next.js 14', 'Envoy', 'Lua', 'Redis', 'PostgreSQL'],
    modules: ['routes', 'auth', 'rate limit', 'transforms', 'plugins'],
    routes: [
      r('GET', '/api/v1/routes', 'Rutas', { routes: [{ id: 'rt_1', path: '/v1/orders/*', upstream: 'orders-svc', rateLimit: 100 }] }),
      r('GET', '/api/v1/plugins', 'Plugins', { plugins: ['oauth2', 'rate-limit', 'cors', 'logging', 'transform'] }),
      r('POST', '/api/v1/routes', 'Crear ruta', { id: 'rt_new', status: 'active' }, { path: '/v1/products/*', upstream: 'products-svc' }),
      r('POST', '/api/v1/plugins/install', 'Instalar plugin', { pluginId: 'pl_new', status: 'installed' }, { name: 'jwt' })
    ] },
  { cat: 'devtools', slug: 'cichain', title: 'CIChain', summary: 'CI/CD self-hosted compatible con GitHub Actions, ejecutores en cualquier nube.',
    stack: ['Next.js 14', 'Go', 'PostgreSQL', 'Docker', 'Redis'],
    modules: ['workflows', 'runners', 'artifacts', 'secrets', 'matrix'],
    routes: [
      r('GET', '/api/v1/workflows', 'Workflows', { workflows: [{ id: 'wf_1', repo: 'monorepo', file: '.github/workflows/ci.yml' }] }),
      r('GET', '/api/v1/runs', 'Runs', { runs: [{ id: 'rn_1', workflow: 'ci', status: 'success', durationSec: 142 }] }),
      r('POST', '/api/v1/runs', 'Trigger', { runId: 'rn_new', status: 'queued' }, { workflowId: 'wf_1', ref: 'main' }),
      r('POST', '/api/v1/runners/register', 'Registrar runner', { runnerId: 'rn_001', token: '...' }, { name: 'arm-runner', tags: ['arm64', 'linux'] })
    ] },
  { cat: 'devtools', slug: 'snapdb', title: 'SnapDB', summary: 'Postgres con branching estilo Git: snapshots instantáneos, branches por PR.',
    stack: ['Next.js 14', 'Postgres', 'WAL', 'S3', 'Rust'],
    modules: ['branches', 'snapshots', 'restore', 'permisos', 'pricing'],
    routes: [
      r('GET', '/api/v1/branches', 'Branches', { branches: [{ id: 'br_1', name: 'main', parent: null, sizeMB: 142 }] }),
      r('GET', '/api/v1/snapshots', 'Snapshots', { snapshots: [{ id: 'sn_1', branchId: 'br_1', createdAt: '2026-05-18T20:00' }] }),
      r('POST', '/api/v1/branches', 'Crear branch', { id: 'br_new', name: 'feature-x', endpoint: 'feature-x.snapdb.io' }, { name: 'feature-x', parent: 'main' }),
      r('POST', '/api/v1/restore', 'Restore', { jobId: 'rs_001', etaSec: 12 }, { snapshotId: 'sn_1' })
    ] },
  { cat: 'devtools', slug: 'edgefn', title: 'EdgeFn', summary: 'Edge functions LATAM con cold starts <50ms y KV global.',
    stack: ['Next.js 14', 'V8 isolates', 'PostgreSQL', 'Cloudflare style', 'Anycast'],
    modules: ['funciones', 'KV store', 'cron', 'observability', 'deploy CLI'],
    routes: [
      r('GET', '/api/v1/functions', 'Funciones', { functions: [{ id: 'f_1', name: 'image-resize', regions: ['sao-1', 'bog-1'], invocationsLast24h: 184200 }] }),
      r('GET', '/api/v1/kv/keys', 'KV keys', { keys: ['user:123', 'session:abc'], totalBytes: 1840000 }),
      r('POST', '/api/v1/deploy', 'Deploy fn', { functionId: 'f_new', deployedAt: new Date().toISOString() }, { name: 'webhook-handler', code: '...' }),
      r('POST', '/api/v1/kv', 'Set KV', { stored: true }, { key: 'user:123', value: { plan: 'pro' } })
    ] },
  { cat: 'devtools', slug: 'chaostest', title: 'ChaosTest', summary: 'Chaos engineering as service: fault injection, game days, hipótesis automatizadas.',
    stack: ['Next.js 14', 'Go', 'PostgreSQL', 'eBPF', 'Kubernetes'],
    modules: ['experimentos', 'fault injection', 'hypothesis', 'reportes', 'game days'],
    routes: [
      r('GET', '/api/v1/experiments', 'Experimentos', { experiments: [{ id: 'ex_1', name: 'kill-orders-db', state: 'idle' }] }),
      r('GET', '/api/v1/findings', 'Hallazgos', { findings: [{ id: 'fn_1', severity: 'high', service: 'orders' }] }),
      r('POST', '/api/v1/experiments/run', 'Correr exp', { runId: 'rn_001', status: 'running' }, { experimentId: 'ex_1', durationSec: 60 }),
      r('POST', '/api/v1/abort', 'Abortar', { aborted: true, rollback: 'in_progress' }, { runId: 'rn_001' })
    ] },
  { cat: 'devtools', slug: 'costmonitor', title: 'CostMonitor', summary: 'Cloud cost monitoring multi-nube con anomaly detection y optimización.',
    stack: ['Next.js 14', 'Python', 'PostgreSQL', 'ClickHouse', 'AWS SDK'],
    modules: ['ingesta', 'anomalies', 'optimización', 'budgets', 'reports'],
    routes: [
      r('GET', '/api/v1/spending', 'Gasto', { thisMonth: 18420, lastMonth: 17200, projected: 19800, currency: 'USD' }),
      r('GET', '/api/v1/anomalies', 'Anomalías', { anomalies: [{ service: 'EC2 sao-1', extraUSD: 240, detectedAt: '2026-05-18' }] }),
      r('POST', '/api/v1/budgets', 'Crear budget', { id: 'bd_001', alertAt: 0.8 }, { name: 'AWS prod', limitUSD: 20000 }),
      r('POST', '/api/v1/recommendations', 'Recomendaciones', { savings: 1240, items: ['Reservar 12 EC2 m5.large', 'Eliminar 4 EBS huérfanos'] }, { scope: 'all' })
    ] },

  // ===== Web3 / Blockchain (10) NEW =====
  { cat: 'web3', slug: 'daolatam', title: 'DAOLatAm', summary: 'Gobernanza DAO LATAM: propuestas, votación on-chain, treasury, snapshots.',
    stack: ['Next.js 14', 'Foundry', 'Solidity', 'Ethers', 'PostgreSQL'],
    modules: ['propuestas', 'votación', 'treasury', 'snapshots', 'delegación'],
    routes: [
      r('GET', '/api/v1/proposals', 'Propuestas', { proposals: [{ id: 'pr_1', title: 'Liquidez Uniswap', for: 142000, against: 8400 }] }),
      r('GET', '/api/v1/treasury', 'Treasury', { totalUSD: 4200000, tokens: [{ symbol: 'ETH', amount: 84 }, { symbol: 'USDC', amount: 2200000 }] }),
      r('POST', '/api/v1/proposals', 'Crear', { id: 'pr_new', status: 'active', endsAt: '2026-05-26' }, { title: '...', actions: [] }),
      r('POST', '/api/v1/vote', 'Votar', { txHash: '0xtx', votePower: 1240 }, { proposalId: 'pr_1', choice: 'for' })
    ] },
  { cat: 'web3', slug: 'nftarte', title: 'NFTArte', summary: 'Marketplace NFT arte LATAM con royalties on-chain y curaduría.',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'Ethers', 'IPFS'],
    modules: ['catálogo', 'subastas', 'royalties', 'curaduría', 'minting'],
    routes: [
      r('GET', '/api/v1/listings', 'Listings', { listings: [{ id: 'l_1', title: 'Andes Dreamscape', artist: 'Carla R.', priceETH: 0.42 }] }),
      r('GET', '/api/v1/auctions', 'Subastas', { auctions: [{ id: 'a_1', topBid: 0.65, endsAt: '2026-05-22T20:00' }] }),
      r('POST', '/api/v1/mint', 'Mint', { tokenId: 142, txHash: '0xtx' }, { metadataUri: 'ipfs://...', royaltyPct: 10 }),
      r('POST', '/api/v1/bid', 'Bid', { bidId: 'b_001', topBid: 0.7 }, { auctionId: 'a_1', amountETH: 0.7 })
    ] },
  { cat: 'web3', slug: 'tokenlaunch', title: 'TokenLaunch', summary: 'Launchpad de tokens: IDO, LBP, vesting, anti-bot, KYC integrado.',
    stack: ['Next.js 14', 'Foundry', 'Solidity', 'Ethers', 'PostgreSQL'],
    modules: ['proyectos', 'IDO', 'vesting', 'KYC', 'staking tiers'],
    routes: [
      r('GET', '/api/v1/launches', 'Launches', { launches: [{ id: 'ln_1', name: 'PYME Token', raise: 800000, status: 'live' }] }),
      r('GET', '/api/v1/tiers', 'Tiers staking', { tiers: [{ name: 'silver', stake: 1000, allocation: 200 }] }),
      r('POST', '/api/v1/participate', 'Participar', { allocation: 250, txHash: '0xtx' }, { launchId: 'ln_1', amountUSDC: 500 }),
      r('POST', '/api/v1/vesting/claim', 'Claim vesting', { released: 142, nextUnlock: '2026-06-19' }, { launchId: 'ln_1' })
    ] },
  { cat: 'web3', slug: 'bridgechain', title: 'BridgeChain', summary: 'Bridge cross-chain optimizado para corredores LATAM (ETH↔ARB↔BASE↔OP).',
    stack: ['Next.js 14', 'Foundry', 'LayerZero', 'Ethers', 'PostgreSQL'],
    modules: ['cotización', 'transferencia', 'liquidity', 'security', 'monitoring'],
    routes: [
      r('GET', '/api/v1/routes', 'Rutas bridge', { routes: [{ from: 'ETH', to: 'BASE', feePct: 0.1, etaSec: 90 }] }),
      r('GET', '/api/v1/liquidity', 'Liquidez', { pools: [{ chain: 'BASE', token: 'USDC', amount: 4200000 }] }),
      r('POST', '/api/v1/quote', 'Cotizar', { quoteId: 'q_001', fee: 0.5, etaSec: 90 }, { from: 'ETH', to: 'BASE', token: 'USDC', amount: 1000 }),
      r('POST', '/api/v1/transfer', 'Transferir', { txHash: '0xtx', status: 'pending' }, { quoteId: 'q_001' })
    ] },
  { cat: 'web3', slug: 'realestatechain', title: 'RealEstateChain', summary: 'Fractionalize real estate: tokens ERC-3643, rentas on-chain, marketplace LATAM.',
    stack: ['Next.js 14', 'Foundry', 'Solidity', 'Ethers', 'PostgreSQL'],
    modules: ['propiedades', 'tokenización', 'rentas', 'governance', 'mercado secundario'],
    routes: [
      r('GET', '/api/v1/properties', 'Propiedades', { properties: [{ id: 'pp_1', address: 'Bogotá Norte', valueUSD: 250000, tokens: 250000 }] }),
      r('GET', '/api/v1/holdings', 'Holdings', { holdings: [{ propertyId: 'pp_1', tokens: 1200, valueUSD: 1200 }] }),
      r('POST', '/api/v1/buy', 'Comprar', { txHash: '0xtx', tokens: 100 }, { propertyId: 'pp_1', tokens: 100 }),
      r('POST', '/api/v1/dividends/claim', 'Claim dividendos', { claimed: 84.50, currency: 'USDC' }, { propertyId: 'pp_1' })
    ] },
  { cat: 'web3', slug: 'identityid', title: 'IdentityID', summary: 'Identidad SSI/DID LATAM: credenciales verificables, presentaciones zero-knowledge.',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'DID', 'ZK-SNARK'],
    modules: ['wallet ID', 'credenciales', 'presentaciones', 'verificadores', 'recovery'],
    routes: [
      r('GET', '/api/v1/identity', 'Identidad', { did: 'did:lat:0x123', credentialsCount: 8, recoveryEnabled: true }),
      r('GET', '/api/v1/credentials', 'Credenciales', { credentials: [{ id: 'c_1', type: 'id_card', issuer: 'Gov MX' }] }),
      r('POST', '/api/v1/present', 'Presentar', { presentationToken: 'pt_001', expiresIn: 600 }, { credentialIds: ['c_1'], audience: 'verifier_x' }),
      r('POST', '/api/v1/verify', 'Verificar', { valid: true, claims: { age_gte_18: true } }, { presentationToken: 'pt_001' })
    ] },
  { cat: 'web3', slug: 'socialfi', title: 'SocialFi', summary: 'Social tokens y economía creator: monetización on-chain, gates de contenido.',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'Ethers', 'Redis'],
    modules: ['tokens creator', 'gating', 'tips', 'rewards', 'marketplace'],
    routes: [
      r('GET', '/api/v1/creators', 'Creators', { creators: [{ id: 'cr_1', handle: '@ana', tokenSymbol: 'ANA', holders: 1240 }] }),
      r('GET', '/api/v1/gated', 'Contenido gated', { items: [{ id: 'g_1', title: 'Tutorial', requiredTokens: 10 }] }),
      r('POST', '/api/v1/tokens/buy', 'Comprar token', { tokens: 10, txHash: '0xtx' }, { creatorId: 'cr_1', amountETH: 0.01 }),
      r('POST', '/api/v1/tip', 'Tip creador', { txHash: '0xtx', amount: 0.005 }, { creatorId: 'cr_1', amountETH: 0.005 })
    ] },
  { cat: 'web3', slug: 'privyvote', title: 'PrivyVote', summary: 'Voting privado ZK para DAOs, organizaciones y gobiernos: anónimo y verificable.',
    stack: ['Next.js 14', 'Foundry', 'Circom', 'Ethers', 'PostgreSQL'],
    modules: ['proposals', 'voting ZK', 'tally', 'audit', 'verifiers'],
    routes: [
      r('GET', '/api/v1/ballots', 'Boletas', { ballots: [{ id: 'b_1', title: 'Junta 2026', status: 'voting', endsAt: '2026-05-25' }] }),
      r('GET', '/api/v1/proofs', 'Pruebas ZK', { totalProofs: 1840, verified: 1840 }),
      r('POST', '/api/v1/vote', 'Vote ZK', { proofHash: '0xpf', accepted: true }, { ballotId: 'b_1', proof: '...', publicSignals: [] }),
      r('POST', '/api/v1/tally', 'Tally', { results: { for: 1420, against: 420, abstain: 20 } }, { ballotId: 'b_1' })
    ] },
  { cat: 'web3', slug: 'supplychain', title: 'SupplyChain', summary: 'Trazabilidad supply chain on-chain: hashing por lote, IoT integrado, audit.',
    stack: ['Next.js 14', 'Hyperledger', 'PostgreSQL', 'Redis', 'IoT'],
    modules: ['lotes', 'trazabilidad', 'sensores', 'audit', 'compliance'],
    routes: [
      r('GET', '/api/v1/batches', 'Lotes', { batches: [{ id: 'bt_1', product: 'Café Huila', origin: 'CO', stages: 5 }] }),
      r('GET', '/api/v1/sensors', 'Sensores IoT', { sensors: [{ id: 'ss_1', batchId: 'bt_1', tempC: 22, humidity: 0.65 }] }),
      r('POST', '/api/v1/batches', 'Crear lote', { id: 'bt_new', txHash: '0xtx' }, { product: 'Cacao', origin: 'EC' }),
      r('POST', '/api/v1/stage', 'Registrar stage', { stageHash: '0xst', confirmedOnChain: true }, { batchId: 'bt_1', stage: 'transit', location: 'Cartagena' })
    ] },
  { cat: 'web3', slug: 'charitychain', title: 'CharityChain', summary: 'Donaciones transparentes on-chain con milestones y verificación de impacto.',
    stack: ['Next.js 14', 'Foundry', 'Solidity', 'Ethers', 'IPFS'],
    modules: ['campañas', 'milestones', 'donaciones', 'verificación impacto', 'reportes'],
    routes: [
      r('GET', '/api/v1/campaigns', 'Campañas', { campaigns: [{ id: 'cm_1', title: 'Escuela rural', raisedUSDC: 24000, goalUSDC: 50000 }] }),
      r('GET', '/api/v1/milestones', 'Milestones', { milestones: [{ campaignId: 'cm_1', name: 'Compra materiales', status: 'verified' }] }),
      r('POST', '/api/v1/donate', 'Donar', { txHash: '0xtx', amount: 100 }, { campaignId: 'cm_1', amountUSDC: 100 }),
      r('POST', '/api/v1/verify-impact', 'Verificar impacto', { verifierId: 'vf_001', proofUri: 'ipfs://...' }, { campaignId: 'cm_1', milestoneId: 'ms_1' })
    ] },

  // ===== IoT / Smart Cities (10) NEW =====
  { cat: 'iot', slug: 'citysense', title: 'CitySense', summary: 'Smart city dashboard: sensores urbanos, alertas, gestión incidentes municipales.',
    stack: ['Next.js 14', 'FastAPI', 'PostgreSQL', 'TimescaleDB', 'MQTT'],
    modules: ['sensores urbanos', 'incidentes', 'dashboard', 'predicción', 'ciudadanos'],
    routes: [
      r('GET', '/api/v1/sensors', 'Sensores', { sensors: [{ id: 'ss_1', type: 'noise', dbA: 64, zone: 'Centro' }] }),
      r('GET', '/api/v1/incidents', 'Incidentes', { incidents: [{ id: 'in_1', type: 'street_light_out', priority: 'low' }] }),
      r('POST', '/api/v1/incidents', 'Reportar', { id: 'in_new', status: 'queued' }, { type: 'pothole', lat: 4.65, lng: -74.05 }),
      r('POST', '/api/v1/sensors/calibrate', 'Calibrar', { sensorId: 'ss_1', calibratedAt: new Date().toISOString() }, { sensorId: 'ss_1' })
    ] },
  { cat: 'iot', slug: 'parkingiq', title: 'ParkingIQ', summary: 'Parking inteligente: detección plazas libres, pricing dinámico, reservas.',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'Computer Vision', 'Redis'],
    modules: ['plazas', 'pricing', 'reservas', 'pagos', 'analytics'],
    routes: [
      r('GET', '/api/v1/lots', 'Estacionamientos', { lots: [{ id: 'lt_1', name: 'Centro', total: 240, available: 84, priceCOP: 4000 }] }),
      r('GET', '/api/v1/heatmap', 'Heatmap demanda', { points: [{ lat: 4.65, lng: -74.05, demand: 0.84 }] }),
      r('POST', '/api/v1/reserve', 'Reservar', { reservationId: 'rs_001', holdMinutes: 15 }, { lotId: 'lt_1', startAt: '2026-05-20T14:00' }),
      r('POST', '/api/v1/checkin', 'Check-in', { ticketId: 'tk_001', validUntil: '2026-05-20T17:00' }, { lotId: 'lt_1', plate: 'ABC-123' })
    ] },
  { cat: 'iot', slug: 'watergrid', title: 'WaterGrid', summary: 'Gestión hídrica urbana: medición fugas, calidad, presión, alertas en tiempo real.',
    stack: ['Next.js 14', 'FastAPI', 'TimescaleDB', 'MQTT', 'GIS'],
    modules: ['sensores', 'fugas', 'calidad', 'consumo', 'alertas'],
    routes: [
      r('GET', '/api/v1/sensors', 'Sensores red', { sensors: [{ id: 'wt_1', zone: 'Zona 4', pressureBar: 3.2, flowLs: 14.2 }] }),
      r('GET', '/api/v1/leaks', 'Fugas detectadas', { leaks: [{ id: 'lk_1', zone: 'Zona 4', confidence: 0.84, estLs: 8 }] }),
      r('POST', '/api/v1/quality', 'Reportar calidad', { result: { ph: 7.2, chlorine: 0.4, turbidity: 0.3 } }, { sensorId: 'wt_1' }),
      r('POST', '/api/v1/alerts/configure', 'Configurar alerta', { id: 'al_001', active: true }, { metric: 'pressure', thresholdMin: 2.0 })
    ] },
  { cat: 'iot', slug: 'wastesmart', title: 'WasteSmart', summary: 'Recolección residuos optimizada: sensores en contenedores, rutas dinámicas.',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'OR-Tools', 'MQTT'],
    modules: ['contenedores', 'rutas', 'fleet', 'reportes ciudadanos', 'analytics'],
    routes: [
      r('GET', '/api/v1/bins', 'Contenedores', { bins: [{ id: 'bn_1', zone: 'A1', fillPct: 0.78, type: 'orgánico' }] }),
      r('GET', '/api/v1/routes', 'Rutas hoy', { routes: [{ truckId: 'tr_1', stops: 14, distanceKm: 32 }] }),
      r('POST', '/api/v1/routes/recalculate', 'Recalcular', { routeId: 'rt_new', stops: 18 }, { zoneId: 'A1' }),
      r('POST', '/api/v1/reports', 'Reporte ciudadano', { id: 'rp_001', priority: 'med' }, { type: 'overflow', lat: 4.65, lng: -74.05 })
    ] },
  { cat: 'iot', slug: 'seguridadcom', title: 'SeguridadCom', summary: 'Vigilancia comunitaria: cámaras, IA detección, botón pánico, alertas vecinos.',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'CV', 'WebRTC'],
    modules: ['cámaras', 'alertas', 'botón pánico', 'vecinos', 'autoridades'],
    routes: [
      r('GET', '/api/v1/cameras', 'Cámaras', { cameras: [{ id: 'cm_1', location: 'Esquina 7-25', status: 'online', detections24h: 14 }] }),
      r('GET', '/api/v1/alerts', 'Alertas', { alerts: [{ id: 'al_1', type: 'gathering_unusual', cameraId: 'cm_1', confidence: 0.78 }] }),
      r('POST', '/api/v1/panic', 'Botón pánico', { alertId: 'pa_001', dispatchedTo: ['vecinos_500m', 'policia'] }, { lat: 4.65, lng: -74.05 }),
      r('POST', '/api/v1/cameras/share', 'Compartir vivo', { streamUrl: 'webrtc://...', expiresIn: 3600 }, { cameraId: 'cm_1', authority: 'policia' })
    ] },
  { cat: 'iot', slug: 'flotatrack', title: 'FlotaTrack', summary: 'Fleet management LATAM: GPS, ELD, mantenimiento predictivo, telemática.',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'TimescaleDB', 'OBD-II'],
    modules: ['vehículos', 'telemática', 'rutas', 'mantenimiento', 'compliance'],
    routes: [
      r('GET', '/api/v1/vehicles', 'Vehículos', { vehicles: [{ id: 'v_1', plate: 'ABC-123', kmsToday: 184, fuelPct: 0.42 }] }),
      r('GET', '/api/v1/maintenance', 'Mantenimiento', { items: [{ vehicleId: 'v_1', component: 'frenos', dueInKm: 1200 }] }),
      r('POST', '/api/v1/routes/assign', 'Asignar ruta', { dispatchId: 'd_001', driver: 'Juan' }, { vehicleId: 'v_1', stops: [] }),
      r('POST', '/api/v1/alert', 'Alerta evento', { eventId: 'e_001', severity: 'high' }, { vehicleId: 'v_1', event: 'harsh_braking' })
    ] },
  { cat: 'iot', slug: 'almacenbot', title: 'AlmacenBot', summary: 'Robotics warehouse management: AGVs, picking AI, inventario, WMS.',
    stack: ['Next.js 14', 'ROS2', 'PostgreSQL', 'Computer Vision', 'Kafka'],
    modules: ['robots', 'picking', 'inventario', 'WMS', 'analytics'],
    routes: [
      r('GET', '/api/v1/robots', 'Robots', { robots: [{ id: 'rb_1', type: 'AGV', battery: 0.84, status: 'picking' }] }),
      r('GET', '/api/v1/inventory', 'Inventario', { sku: 'SKU-001', stock: 142, locations: ['A1-B2', 'A1-B3'] }),
      r('POST', '/api/v1/pick', 'Pick order', { taskId: 'tk_001', etaSec: 180 }, { orderId: 'or_001', items: [{ sku: 'SKU-001', qty: 2 }] }),
      r('POST', '/api/v1/robots/dispatch', 'Despachar robot', { robotId: 'rb_1', taskId: 'tk_001' }, { task: 'pick', target: 'A1-B2' })
    ] },
  { cat: 'iot', slug: 'agridrone', title: 'AgriDrone', summary: 'Drones agrícolas para mapeo, monitoreo cultivos y aspersión de precisión.',
    stack: ['Next.js 14', 'FastAPI', 'PostgreSQL', 'CV', 'PX4'],
    modules: ['flotas drones', 'misiones', 'mapeo NDVI', 'aspersión', 'reportes'],
    routes: [
      r('GET', '/api/v1/drones', 'Drones', { drones: [{ id: 'dr_1', model: 'DJI Agras T40', battery: 0.92, status: 'idle' }] }),
      r('GET', '/api/v1/missions', 'Misiones', { missions: [{ id: 'ms_1', field: 'Lote 4', type: 'survey', durationMin: 22 }] }),
      r('POST', '/api/v1/missions', 'Crear misión', { id: 'ms_new', status: 'planning', estDurationMin: 22 }, { droneId: 'dr_1', fieldId: 'fl_1', type: 'survey' }),
      r('POST', '/api/v1/missions/launch', 'Lanzar misión', { missionId: 'ms_new', launchedAt: new Date().toISOString() }, { missionId: 'ms_new' })
    ] },
  { cat: 'iot', slug: 'saludrural', title: 'SaludRural', summary: 'IoT salud rural: telemetría, telediagnóstico, brigadas, conectividad satelital.',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'Starlink', 'Twilio'],
    modules: ['puestos rurales', 'telediagnóstico', 'inventario meds', 'brigadas', 'epidemiología'],
    routes: [
      r('GET', '/api/v1/posts', 'Puestos rurales', { posts: [{ id: 'po_1', name: 'Cabuyaro', population: 4200, connectivity: 'starlink' }] }),
      r('GET', '/api/v1/meds/inventory', 'Inventario meds', { items: [{ med: 'paracetamol', stock: 120, postId: 'po_1' }] }),
      r('POST', '/api/v1/consult', 'Telediagnóstico', { consultId: 'c_001', diagnosis: 'IRA leve', protocol: 'pid_resp' }, { postId: 'po_1', symptoms: ['fiebre', 'tos'] }),
      r('POST', '/api/v1/brigade/schedule', 'Programar brigada', { brigadeId: 'bg_001', date: '2026-05-25' }, { postId: 'po_1', focus: 'vacunación' })
    ] },
  { cat: 'iot', slug: 'edificioiq', title: 'EdificioIQ', summary: 'Building automation: HVAC, energía, ocupación, accesos, ESG en edificios.',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'BACnet', 'TimescaleDB'],
    modules: ['HVAC', 'energía', 'ocupación', 'accesos', 'reportes ESG'],
    routes: [
      r('GET', '/api/v1/buildings', 'Edificios', { buildings: [{ id: 'bd_1', name: 'Torre Norte', m2: 18400, occupancyPct: 0.72 }] }),
      r('GET', '/api/v1/energy', 'Energía', { kwhToday: 8420, kwhMonth: 184200, costUSD: 18420 }),
      r('POST', '/api/v1/hvac', 'Setear HVAC', { confirmed: true, zone: 'P3-Oeste', setpointC: 22 }, { buildingId: 'bd_1', zone: 'P3-Oeste', setpointC: 22 }),
      r('POST', '/api/v1/access', 'Grant acceso', { accessId: 'ac_001', validUntil: '2026-05-26T18:00' }, { buildingId: 'bd_1', personId: 'p_1', floors: [3, 4] })
    ] },

  // ===== Creator Economy / Media (10) NEW =====
  { cat: 'creator', slug: 'creadorpro', title: 'CreadorPro', summary: 'Plataforma all-in-one monetización creators: suscripciones, tips, comisiones, sponsors.',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'Stripe Connect', 'Redis'],
    modules: ['perfil', 'suscripciones', 'tips', 'comisiones', 'sponsors'],
    routes: [
      r('GET', '/api/v1/creator', 'Perfil creator', { handle: '@ana', subscribers: 1240, mrr: 14200, currency: 'USD' }),
      r('GET', '/api/v1/posts', 'Posts', { posts: [{ id: 'p_1', title: 'Tutorial', tier: 'pro', accessCount: 142 }] }),
      r('POST', '/api/v1/subscribe', 'Suscribir', { subscriptionId: 'sub_001', tier: 'pro', priceUSD: 15 }, { creatorHandle: '@ana', tier: 'pro' }),
      r('POST', '/api/v1/tip', 'Tip', { txId: 'tx_001', amountUSD: 5, message: 'gracias!' }, { creatorHandle: '@ana', amountUSD: 5 })
    ] },
  { cat: 'creator', slug: 'podcastlat', title: 'PodcastLAT', summary: 'Red de podcasts LATAM: hosting, monetización, analytics, transcripción AI.',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'Whisper', 'CDN'],
    modules: ['shows', 'episodios', 'distribución', 'monetización', 'transcripción'],
    routes: [
      r('GET', '/api/v1/shows', 'Shows', { shows: [{ id: 'sh_1', title: 'Tech LATAM', episodes: 84, listenersMonthly: 184200 }] }),
      r('GET', '/api/v1/episodes', 'Episodios', { episodes: [{ id: 'ep_1', showId: 'sh_1', title: 'IA en Chile', durationMin: 42 }] }),
      r('POST', '/api/v1/episodes', 'Subir ep', { id: 'ep_new', status: 'processing', transcriptUrl: null }, { showId: 'sh_1', title: '...', audioUrl: '...' }),
      r('POST', '/api/v1/ads/insert', 'Insertar ad', { adInserted: true, position: 'mid_roll', cpm: 24 }, { episodeId: 'ep_1', adId: 'ad_1' })
    ] },
  { cat: 'creator', slug: 'newsletterx', title: 'NewsletterX', summary: 'Newsletter SaaS: editor, monetización, segmentación, A/B, analytics avanzados.',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'SendGrid', 'ClickHouse'],
    modules: ['editor', 'envíos', 'segmentación', 'A/B', 'monetización'],
    routes: [
      r('GET', '/api/v1/newsletters', 'Newsletters', { newsletters: [{ id: 'nl_1', title: 'AI Latam', subscribers: 4200, openRate: 0.42 }] }),
      r('GET', '/api/v1/issues', 'Ediciones', { issues: [{ id: 'is_1', subject: 'Edición #42', sentAt: '2026-05-18T10:00' }] }),
      r('POST', '/api/v1/send', 'Enviar', { jobId: 'sn_001', targetCount: 4200, etaSec: 30 }, { newsletterId: 'nl_1', subject: '...', html: '...' }),
      r('POST', '/api/v1/segments', 'Crear segmento', { segmentId: 'sg_001', estimatedSize: 1240 }, { name: 'engaged_30d', filter: { lastOpenedDays: { lte: 30 } } })
    ] },
  { cat: 'creator', slug: 'shortlat', title: 'ShortLAT', summary: 'Plataforma short video estilo TikTok con monetización LATAM y AI recommend.',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'CDN', 'Redis'],
    modules: ['feed', 'subida', 'editor', 'monetización', 'creator fund'],
    routes: [
      r('GET', '/api/v1/feed', 'Feed', { items: [{ id: 'v_1', creator: '@ana', views: 142000, durationSec: 24, palette: 'sunset' }] }),
      r('GET', '/api/v1/trending', 'Trending', { trends: [{ tag: '#cumbia2026', videos: 8400 }, { tag: '#latam', videos: 124000 }] }),
      r('POST', '/api/v1/upload', 'Subir', { videoId: 'v_new', status: 'processing' }, { title: '...', durationSec: 22 }),
      r('POST', '/api/v1/engage', 'Engage', { engaged: true, totalLikes: 142 }, { videoId: 'v_1', type: 'like' })
    ] },
  { cat: 'creator', slug: 'liveauction', title: 'LiveAuction', summary: 'Livestream commerce: subastas en vivo, ventas flash, gamification, multi-creator.',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'WebRTC', 'Stripe'],
    modules: ['streams', 'subastas', 'productos', 'checkout', 'analytics'],
    routes: [
      r('GET', '/api/v1/streams', 'Streams', { streams: [{ id: 'st_1', title: 'Subasta arte', live: true, viewers: 842 }] }),
      r('GET', '/api/v1/products', 'Productos', { products: [{ id: 'p_1', streamId: 'st_1', name: 'Cuadro original', topBid: 240 }] }),
      r('POST', '/api/v1/bid', 'Bid', { bidId: 'b_001', topBid: 250 }, { productId: 'p_1', amount: 250 }),
      r('POST', '/api/v1/checkout', 'Checkout', { orderId: 'or_001', total: 250 }, { productId: 'p_1', bidId: 'b_001' })
    ] },
  { cat: 'creator', slug: 'fanclub', title: 'FanClub', summary: 'Suscripciones fan: tiers, contenido exclusivo, comunidad, eventos virtuales.',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'Stripe', 'WebRTC'],
    modules: ['tiers', 'contenido', 'comunidad', 'eventos', 'mensajería'],
    routes: [
      r('GET', '/api/v1/creators', 'Creators', { creators: [{ handle: '@band', fans: 8400, tiers: [{ name: 'bronze', priceUSD: 5 }, { name: 'gold', priceUSD: 20 }] }] }),
      r('GET', '/api/v1/events', 'Eventos', { events: [{ id: 'ev_1', title: 'Sesión Q&A', date: '2026-05-26T19:00', tier: 'gold' }] }),
      r('POST', '/api/v1/join', 'Unirse al evento', { rtcToken: 'tk_001', validUntilSec: 3600 }, { eventId: 'ev_1' }),
      r('POST', '/api/v1/messages', 'Mensaje DM', { messageId: 'm_001', delivered: true }, { creatorHandle: '@band', text: 'hola' })
    ] },
  { cat: 'creator', slug: 'merchprint', title: 'MerchPrint', summary: 'Print-on-demand LATAM: catálogo merchandising, integración tiendas, dropshipping.',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'Stripe', 'Stripe Connect'],
    modules: ['catálogo', 'tiendas', 'pedidos', 'producción', 'envíos'],
    routes: [
      r('GET', '/api/v1/products', 'Productos', { products: [{ id: 'p_1', type: 'remera', sizes: ['S', 'M', 'L', 'XL'], baseCost: 4200, currency: 'ARS' }] }),
      r('GET', '/api/v1/stores', 'Tiendas', { stores: [{ id: 's_1', creator: '@band', productsCount: 14, salesMonth: 84 }] }),
      r('POST', '/api/v1/design', 'Subir diseño', { designId: 'd_001', mockupUrl: '/mockups/...' }, { productType: 'remera', imageUrl: '...' }),
      r('POST', '/api/v1/order', 'Orden', { orderId: 'or_001', etaDays: 7 }, { productId: 'p_1', size: 'M', designId: 'd_001' })
    ] },
  { cat: 'creator', slug: 'musicsplit', title: 'MusicSplit', summary: 'Royalty splits para músicos: smart contracts, distribución automática, regalías globales.',
    stack: ['Next.js 14', 'Foundry', 'PostgreSQL', 'Ethers', 'Spotify API'],
    modules: ['canciones', 'splits', 'distribución', 'cobros', 'analytics'],
    routes: [
      r('GET', '/api/v1/tracks', 'Tracks', { tracks: [{ id: 'tr_1', title: 'Sol', streams: 124000, royaltiesUSD: 184 }] }),
      r('GET', '/api/v1/splits', 'Splits', { trackId: 'tr_1', collaborators: [{ name: 'Ana', pct: 50 }, { name: 'Juan', pct: 50 }] }),
      r('POST', '/api/v1/splits', 'Crear split', { contractAddress: '0xnew', deployedAt: new Date().toISOString() }, { trackId: 'tr_1', collaborators: [{ wallet: '0xa', pct: 50 }] }),
      r('POST', '/api/v1/payout', 'Payout', { distributed: 184, currency: 'USDC', txHash: '0xtx' }, { trackId: 'tr_1' })
    ] },
  { cat: 'creator', slug: 'aistudio', title: 'AIStudio', summary: 'Content generation AI para creators: thumbnails, scripts, ediciones, voiceovers.',
    stack: ['Next.js 14', 'FastAPI', 'PostgreSQL', 'Anthropic', 'SD3'],
    modules: ['thumbnails', 'scripts', 'ediciones', 'voiceovers', 'translaciones'],
    routes: [
      r('GET', '/api/v1/projects', 'Proyectos', { projects: [{ id: 'pj_1', type: 'thumbnail_pack', items: 12 }] }),
      r('GET', '/api/v1/templates', 'Templates', { templates: ['youtube_thumb', 'instagram_reel', 'tiktok_short', 'podcast_episode'] }),
      r('POST', '/api/v1/generate', 'Generar', { jobId: 'g_001', estimatedSec: 12, items: 4 }, { template: 'youtube_thumb', prompt: 'AI explainer' }),
      r('POST', '/api/v1/translate', 'Traducir video', { jobId: 'tr_001', targetLangs: ['es', 'pt'] }, { videoId: 'v_1', languages: ['es', 'pt'] })
    ] },
  { cat: 'creator', slug: 'rightsmanage', title: 'RightsManage', summary: 'Gestión IP y derechos: catálogo, licenciamientos, takedowns, sync rights.',
    stack: ['Next.js 14', 'NestJS', 'PostgreSQL', 'Elastic', 'CMS'],
    modules: ['catálogo IP', 'licencias', 'takedowns', 'sync rights', 'analytics'],
    routes: [
      r('GET', '/api/v1/catalog', 'Catálogo IP', { items: [{ id: 'ip_1', title: 'Canción Verano', type: 'audio', territories: ['LATAM', 'US'] }] }),
      r('GET', '/api/v1/licenses', 'Licencias', { licenses: [{ id: 'lc_1', ipId: 'ip_1', licensee: 'Brand X', rightsUSD: 4200 }] }),
      r('POST', '/api/v1/licenses', 'Emitir licencia', { id: 'lc_new', contractUrl: '...', signedAt: new Date().toISOString() }, { ipId: 'ip_1', licensee: 'Brand Y', termMonths: 12 }),
      r('POST', '/api/v1/takedown', 'Solicitar takedown', { takedownId: 'td_001', status: 'submitted' }, { ipId: 'ip_1', infringingUrl: 'https://...' })
    ] }
];

// ============ Inyectar rutas utilitarias y asignar puertos ============
const counters = {};
const projects = baseProjects.map(p => {
  counters[p.cat] = counters[p.cat] || 0;
  const cat = categories[p.cat];
  const port = cat.portStart + counters[p.cat];
  const webPort = cat.webStart + counters[p.cat];
  counters[p.cat]++;
  return { ...p, port, webPort, routes: [...p.routes, ...utilityRoutes(p.slug)] };
});

console.log(`Total proyectos: ${projects.length}`);

// ============ Generadores de archivos ============

async function ensureDir(d) { await fs.mkdir(d, { recursive: true }); }
async function writeFile(p, c) { await ensureDir(path.dirname(p)); await fs.writeFile(p, c, 'utf8'); }

function rootPackageJson(p) {
  return JSON.stringify({
    name: p.slug, private: true, type: 'module',
    workspaces: ['services/api', 'packages/shared-types', 'apps/web'],
    scripts: {
      dev: `npm run dev --workspace=@${p.slug}/api`,
      'dev:web': `npm run dev --workspace=@${p.slug}/web`,
      test: 'node scripts/validate.mjs'
    }
  }, null, 2) + '\n';
}

function apiPackageJson(p) {
  return JSON.stringify({
    name: `@${p.slug}/api`, private: true, type: 'module', version: '0.1.0',
    description: `${p.title} mock service`,
    scripts: { dev: 'node src/server.mjs' }
  }, null, 2) + '\n';
}

function sharedPackageJson(p) {
  return JSON.stringify({
    name: `@${p.slug}/shared-types`, private: true, type: 'module', version: '0.1.0',
    description: `${p.title} shared contracts`
  }, null, 2) + '\n';
}

function webPackageJson(p) {
  return JSON.stringify({
    name: `@${p.slug}/web`, version: '0.1.0', private: true, type: 'module',
    scripts: {
      dev: `next dev -p ${p.webPort}`,
      build: 'next build',
      start: `next start -p ${p.webPort}`,
      lint: 'next lint'
    },
    dependencies: {
      next: '14.2.1', react: '^18', 'react-dom': '^18',
      'lucide-react': '^0.363.0', clsx: '^2.1.0', 'tailwind-merge': '^2.2.2'
    },
    devDependencies: {
      typescript: '^5', '@types/node': '^20', '@types/react': '^18', '@types/react-dom': '^18',
      postcss: '^8', tailwindcss: '^3.4.1', autoprefixer: '^10.0.1',
      eslint: '^8', 'eslint-config-next': '14.2.1'
    }
  }, null, 2) + '\n';
}

function turboJson() {
  return JSON.stringify({
    $schema: 'https://turbo.build/schema.json',
    tasks: { test: { outputs: [] }, dev: { cache: false }, build: { outputs: ['.next/**'] } }
  }, null, 2) + '\n';
}

function gitignore() {
  return ['node_modules/', '.DS_Store', '.env', '.env.local', '.next/', 'out/', 'dist/', 'coverage/', '.turbo/'].join('\n') + '\n';
}

function manifestSource(p) {
  const payload = {
    title: p.title, slug: p.slug, codename: p.slug, summary: p.summary,
    category: categories[p.cat].label, stack: p.stack, modules: p.modules,
    server: { entry: 'services/api', port: p.port },
    web: { entry: 'apps/web', port: p.webPort }
  };
  const routes = p.routes.map(rt => ({
    method: rt.m, path: rt.p, summary: rt.s,
    ...(rt.req ? { requestExample: rt.req } : {}),
    response: rt.r
  }));
  return `export const project = ${JSON.stringify(payload, null, 2)};\n\nexport const apiRoutes = ${JSON.stringify(routes, null, 2)};\n`;
}

function serverSource() {
  return `import http from 'node:http';
import { fileURLToPath } from 'node:url';
import { project, apiRoutes } from '../../../packages/shared-types/src/manifest.mjs';

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    'content-type': 'application/json; charset=utf-8',
    'access-control-allow-origin': '*'
  });
  response.end(JSON.stringify(payload, null, 2));
}

async function readJsonBody(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  if (chunks.length === 0) return null;
  const raw = Buffer.concat(chunks).toString('utf8');
  try { return JSON.parse(raw); } catch { return { raw, parseError: 'invalid_json' }; }
}

async function handleRequest(request, response) {
  const url = new URL(request.url || '/', 'http://localhost');
  if (request.method === 'OPTIONS') return sendJson(response, 200, {});
  if (url.pathname === '/health') return sendJson(response, 200, { status: 'ok', project: project.slug });
  if (url.pathname === '/manifest') return sendJson(response, 200, { project, apiRoutes });
  const route = apiRoutes.find(it => it.method === request.method && it.path === url.pathname);
  if (!route) {
    return sendJson(response, 404, {
      error: 'route_not_found', project: project.slug,
      available: apiRoutes.map(it => \`\${it.method} \${it.path}\`)
    });
  }
  const body = ['POST', 'PUT', 'PATCH'].includes(request.method || '') ? await readJsonBody(request) : null;
  return sendJson(response, 200, { project: project.slug, route: route.path, summary: route.summary, received: body, response: route.response });
}

export function startServer(port = Number(process.env.PORT || project.server.port)) {
  return new Promise(resolve => {
    const server = http.createServer((req, res) => {
      handleRequest(req, res).catch(err => sendJson(res, 500, { error: 'internal_error', message: err.message }));
    });
    server.listen(port, () => resolve(server));
  });
}

const isMain = process.argv[1] === fileURLToPath(import.meta.url);
if (isMain) {
  const server = await startServer();
  const addr = server.address();
  const portNumber = addr && typeof addr === 'object' ? addr.port : project.server.port;
  console.log(\`\${project.title} mock API escuchando en http://127.0.0.1:\${portNumber}\`);
}
`;
}

function validateScript(p) {
  return `import assert from 'node:assert/strict';
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
  assert.equal(fs.existsSync(path.join(rootDir, rp)), true, \`Missing \${rp}\`);
}
assert.equal(project.slug, ${JSON.stringify(p.slug)});
assert.equal(Array.isArray(apiRoutes), true);
assert.equal(apiRoutes.length >= 4, true);

const server = await startServer(0);
const addr = server.address();
const baseUrl = \`http://127.0.0.1:\${addr.port}\`;
const h = await (await fetch(\`\${baseUrl}/health\`)).json();
assert.equal(h.status, 'ok');
const first = apiRoutes[0];
const init = first.method === 'POST' ? { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(first.requestExample || {}) } : { method: first.method };
const r = await (await fetch(\`\${baseUrl}\${first.path}\`, init)).json();
assert.equal(r.project, project.slug);
assert.equal(r.route, first.path);
await new Promise((res, rej) => server.close(e => e ? rej(e) : res()));
console.log(\`\${project.title}: validate ok (\${apiRoutes.length} mock routes)\`);
`;
}

function docsSourcePlan(p) {
  return `# ${p.title} — Plan maestro

${p.summary}

## Categoría

${categories[p.cat].label}

## Módulos MVP

${p.modules.map(m => `- ${m}`).join('\n')}

## Stack objetivo

${p.stack.map(s => `- ${s}`).join('\n')}

## Endpoints mock (${p.routes.length})

${p.routes.map(rt => `- \`${rt.m} ${rt.p}\` — ${rt.s}`).join('\n')}

## Puertos

- Mock API: ${p.port}
- Web dev: ${p.webPort}
`;
}

function docsApiContracts(p) {
  return `# API contracts — ${p.title}

${p.routes.map(rt => `## \`${rt.m} ${rt.p}\`\n\n${rt.s}\n\n${rt.req ? '**Request:**\n```json\n' + JSON.stringify(rt.req, null, 2) + '\n```\n\n' : ''}**Response:**\n\`\`\`json\n${JSON.stringify(rt.r, null, 2)}\n\`\`\`\n`).join('\n')}`;
}

function docsBacklog(p) {
  return `# Backlog — ${p.title}

## Prioridades

1. Reemplazar mock API por servicio real con persistencia.
2. Implementar autenticación y autorización.
3. Conectar UI a stack productivo (${p.stack.slice(0, 3).join(', ')}).
4. Integrar observabilidad y tests E2E.

## Módulos pendientes

${p.modules.map(m => `- [ ] ${m}`).join('\n')}
`;
}

function readmeRoot(p) {
  return `# ${p.title}

${p.summary}

**Categoría:** ${categories[p.cat].label}

## Stack

${p.stack.map(s => `- ${s}`).join('\n')}

## Módulos MVP

${p.modules.map(m => `- ${m}`).join('\n')}

## Arranque

\`\`\`bash
npm run dev       # Mock API en :${p.port}
npm run dev:web   # Web dev en :${p.webPort}
\`\`\`

## Validar

\`\`\`bash
npm test
\`\`\`
`;
}

function readmeWeb(p) {
  return `# ${p.title} — Web

Cliente web Next.js 14 que consume el mock API en \`:${p.port}\`.

Pages:
- \`/\` Dashboard
- \`/explorer\` API Explorer interactivo
- \`/plan\` Plan maestro
- \`/health\` Health & manifest
- \`/analytics\` Métricas
- \`/settings\` Configuración (theme, API base)
- \`/search\` Búsqueda en rutas y módulos
- \`/console\` Consola JS para probar el API
`;
}

function nextConfig() { return `/** @type {import('next').NextConfig} */\nconst nextConfig = {};\nexport default nextConfig;\n`; }

function tsConfig() {
  return JSON.stringify({
    compilerOptions: {
      target: 'ES2017', lib: ['dom', 'dom.iterable', 'esnext'],
      allowJs: true, skipLibCheck: true, strict: true, noEmit: true,
      esModuleInterop: true, module: 'esnext', moduleResolution: 'bundler',
      resolveJsonModule: true, isolatedModules: true, jsx: 'preserve',
      incremental: true, plugins: [{ name: 'next' }],
      paths: { '@/*': ['./*'] }
    },
    include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
    exclude: ['node_modules']
  }, null, 2) + '\n';
}

function postcssConfig() { return `export default { plugins: { tailwindcss: {}, autoprefixer: {} } };\n`; }

function tailwindConfig(p) {
  const col = categories[p.cat].color;
  return `/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '${col.primary}',
        accent: '${col.accent}',
        bg: '#0a0a0f',
        surface: '#1a1a2e',
        muted: '#71767b'
      }
    }
  },
  plugins: []
};
`;
}

function globalsCss() {
  return `@tailwind base;\n@tailwind components;\n@tailwind utilities;\nbody { background: #0a0a0f; color: #fafafa; font-family: ui-sans-serif, system-ui, sans-serif; }\nhtml.light body { background: #fafafa; color: #1a1a2e; }\nhtml.light .bg-bg { background: #fafafa; }\nhtml.light .bg-surface { background: #f0f0f3; }\nhtml.light .text-white { color: #1a1a2e; }\nhtml.light .text-muted { color: #71767b; }\n`;
}

function layoutTsx(p) {
  return `import "./globals.css";
import Link from "next/link";
import { LayoutDashboard, Telescope, FileText, Activity, BarChart3, Settings, Search, Terminal } from "lucide-react";

export const metadata = { title: "${p.title}", description: ${JSON.stringify(p.summary)} };

const pages = [
  { href: "/", label: "Dashboard", Icon: LayoutDashboard },
  { href: "/explorer", label: "API Explorer", Icon: Telescope },
  { href: "/analytics", label: "Analytics", Icon: BarChart3 },
  { href: "/search", label: "Buscar", Icon: Search },
  { href: "/console", label: "Console", Icon: Terminal },
  { href: "/plan", label: "Plan", Icon: FileText },
  { href: "/health", label: "Health", Icon: Activity },
  { href: "/settings", label: "Settings", Icon: Settings }
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-bg text-white">
        <div className="flex h-screen">
          <nav className="w-64 border-r border-surface p-4 flex flex-col">
            <div className="mb-6">
              <h1 className="text-xl font-bold text-primary">${p.title}</h1>
              <p className="text-xs text-muted mt-1">${categories[p.cat].label}</p>
            </div>
            <ul className="flex-1 space-y-1">
              {pages.map(({ href, label, Icon }) => (
                <li key={href}><Link href={href} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface text-sm"><Icon size={18}/>{label}</Link></li>
              ))}
            </ul>
            <div className="text-xs text-muted">
              <p>API: <span className="text-primary">:${p.port}</span></p>
              <p>Web: <span className="text-primary">:${p.webPort}</span></p>
            </div>
          </nav>
          <main className="flex-1 overflow-auto p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
`;
}

function libApi(p) {
  return `export const DEFAULT_API_BASE = "http://127.0.0.1:${p.port}";

export function getApiBase() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("apiBase") || DEFAULT_API_BASE;
  }
  return DEFAULT_API_BASE;
}

export async function getManifest() {
  try {
    const r = await fetch(\`\${getApiBase()}/manifest\`, { cache: "no-store" });
    if (!r.ok) throw new Error(\`HTTP \${r.status}\`);
    return r.json();
  } catch (e: any) {
    return { error: e.message, project: null, apiRoutes: [] };
  }
}

export async function getHealth() {
  try {
    const r = await fetch(\`\${getApiBase()}/health\`, { cache: "no-store" });
    return r.json();
  } catch (e: any) {
    return { status: "down", error: e.message };
  }
}

export async function callRoute(method: string, path: string, body?: any) {
  const init: RequestInit = { method, cache: "no-store" };
  if (body && (method === "POST" || method === "PUT" || method === "PATCH")) {
    init.headers = { "content-type": "application/json" };
    init.body = JSON.stringify(body);
  }
  const t0 = Date.now();
  const r = await fetch(\`\${getApiBase()}\${path}\`, init);
  const elapsed = Date.now() - t0;
  const data = await r.json();
  recordCall(method, path, r.status, elapsed);
  return { status: r.status, elapsedMs: elapsed, data };
}

export function recordCall(method: string, path: string, status: number, ms: number) {
  if (typeof window === "undefined") return;
  try {
    const k = "apiCalls";
    const list = JSON.parse(localStorage.getItem(k) || "[]");
    list.unshift({ at: Date.now(), method, path, status, ms });
    localStorage.setItem(k, JSON.stringify(list.slice(0, 200)));
  } catch {}
}

export function getCallHistory(): Array<{ at: number; method: string; path: string; status: number; ms: number }> {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem("apiCalls") || "[]"); } catch { return []; }
}
`;
}

function pageHome(p) {
  return `import { getManifest, getHealth } from "@/lib/api";
import Link from "next/link";

export default async function HomePage() {
  const [manifest, health] = await Promise.all([getManifest(), getHealth()]);
  const project = manifest.project;
  const routes = manifest.apiRoutes || [];
  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-3xl font-bold">${p.title}</h2>
        <span className={\`px-3 py-1 rounded-full text-xs font-mono \${health.status === "ok" ? "bg-primary/20 text-primary" : "bg-red-500/20 text-red-400"}\`}>
          API {health.status === "ok" ? "ONLINE" : "DOWN"}
        </span>
      </div>
      <p className="text-muted mb-8">${p.summary}</p>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-surface rounded-xl p-5">
          <h3 className="text-sm text-muted mb-2">Stack</h3>
          <ul className="space-y-1">${p.stack.map(s => `<li className="text-sm">• ${s}</li>`).join('')}</ul>
        </div>
        <div className="bg-surface rounded-xl p-5">
          <h3 className="text-sm text-muted mb-2">Módulos</h3>
          <ul className="space-y-1">${p.modules.map(m => `<li className="text-sm">• ${m}</li>`).join('')}</ul>
        </div>
      </div>
      <div className="bg-surface rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm text-muted">Rutas mock disponibles ({routes.length})</h3>
          <Link href="/explorer" className="text-primary text-sm hover:underline">Probar →</Link>
        </div>
        <ul className="space-y-2">
          {routes.map((rt: any) => (
            <li key={\`\${rt.method} \${rt.path}\`} className="flex items-center gap-3 text-sm">
              <span className={\`px-2 py-0.5 rounded font-mono text-xs \${rt.method === "GET" ? "bg-blue-500/20 text-blue-400" : "bg-accent/20 text-accent"}\`}>{rt.method}</span>
              <span className="font-mono">{rt.path}</span>
              <span className="text-muted ml-auto">{rt.summary}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
`;
}

function pageExplorer() {
  return `"use client";
import { useEffect, useState } from "react";
import { callRoute, getManifest } from "@/lib/api";

export default function ExplorerPage() {
  const [routes, setRoutes] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [bodyText, setBodyText] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getManifest().then(m => {
      setRoutes(m.apiRoutes || []);
      if (m.apiRoutes?.[0]) {
        setSelected(m.apiRoutes[0]);
        setBodyText(JSON.stringify(m.apiRoutes[0].requestExample || {}, null, 2));
      }
    });
  }, []);

  async function send() {
    if (!selected) return;
    setLoading(true); setError(null); setResponse(null);
    try {
      let body: any = undefined;
      if (selected.method !== "GET" && bodyText.trim()) body = JSON.parse(bodyText);
      const r = await callRoute(selected.method, selected.path, body);
      setResponse(r);
    } catch (e: any) {
      setError(e.message);
    } finally { setLoading(false); }
  }

  return (
    <div className="max-w-6xl">
      <h2 className="text-3xl font-bold mb-6">API Explorer</h2>
      <div className="grid grid-cols-[280px_1fr] gap-6">
        <div className="bg-surface rounded-xl p-3 max-h-[80vh] overflow-auto">
          <h3 className="text-sm text-muted mb-2 px-2">Rutas ({routes.length})</h3>
          <ul className="space-y-1">
            {routes.map((rt: any) => (
              <li key={\`\${rt.method} \${rt.path}\`}>
                <button onClick={() => { setSelected(rt); setBodyText(JSON.stringify(rt.requestExample || {}, null, 2)); setResponse(null); }}
                  className={\`w-full text-left px-2 py-2 rounded text-sm flex items-center gap-2 hover:bg-bg \${selected?.path === rt.path && selected?.method === rt.method ? "bg-bg" : ""}\`}>
                  <span className={\`px-1.5 py-0.5 rounded font-mono text-xs \${rt.method === "GET" ? "bg-blue-500/20 text-blue-400" : "bg-accent/20 text-accent"}\`}>{rt.method}</span>
                  <span className="font-mono text-xs truncate">{rt.path}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-surface rounded-xl p-5">
          {selected ? (
            <>
              <div className="flex items-center gap-3 mb-2">
                <span className={\`px-2 py-1 rounded font-mono text-xs \${selected.method === "GET" ? "bg-blue-500/20 text-blue-400" : "bg-accent/20 text-accent"}\`}>{selected.method}</span>
                <code className="font-mono">{selected.path}</code>
              </div>
              <p className="text-muted text-sm mb-4">{selected.summary}</p>
              {selected.method !== "GET" && (
                <div className="mb-4">
                  <label className="text-xs text-muted block mb-1">Body (JSON)</label>
                  <textarea value={bodyText} onChange={e => setBodyText(e.target.value)} rows={6} className="w-full bg-bg border border-muted/30 rounded p-3 font-mono text-xs" />
                </div>
              )}
              <button onClick={send} disabled={loading} className="bg-primary hover:bg-primary/90 disabled:opacity-50 px-5 py-2 rounded font-semibold">
                {loading ? "Enviando..." : "Send"}
              </button>
              {error && <p className="mt-4 text-red-400 text-sm">Error: {error}</p>}
              {response && (
                <div className="mt-6">
                  <div className="flex items-center gap-3 mb-2 text-xs">
                    <span className="text-muted">Status:</span>
                    <span className={\`font-mono \${response.status >= 200 && response.status < 300 ? "text-primary" : "text-red-400"}\`}>{response.status}</span>
                    <span className="text-muted ml-4">Latency:</span>
                    <span className="font-mono">{response.elapsedMs}ms</span>
                  </div>
                  <pre className="bg-bg rounded p-4 text-xs overflow-auto max-h-96">{JSON.stringify(response.data, null, 2)}</pre>
                </div>
              )}
            </>
          ) : <p className="text-muted">Selecciona una ruta</p>}
        </div>
      </div>
    </div>
  );
}
`;
}

function pageAnalytics() {
  return `"use client";
import { useEffect, useState } from "react";
import { getCallHistory } from "@/lib/api";

export default function AnalyticsPage() {
  const [calls, setCalls] = useState<any[]>([]);
  useEffect(() => { setCalls(getCallHistory()); }, []);

  const total = calls.length;
  const ok = calls.filter(c => c.status >= 200 && c.status < 300).length;
  const errs = calls.filter(c => c.status >= 400).length;
  const avgMs = total ? Math.round(calls.reduce((a, c) => a + c.ms, 0) / total) : 0;
  const p95Ms = total ? Math.round([...calls].sort((a, b) => a.ms - b.ms)[Math.floor(total * 0.95)]?.ms || 0) : 0;
  const byPath: Record<string, number> = {};
  for (const c of calls) byPath[c.path] = (byPath[c.path] || 0) + 1;
  const topPaths = Object.entries(byPath).sort((a, b) => b[1] - a[1]).slice(0, 5);

  return (
    <div className="max-w-5xl">
      <h2 className="text-3xl font-bold mb-6">Analytics</h2>
      {total === 0 ? <p className="text-muted">No hay llamadas registradas todavía. Usa el API Explorer o la Console.</p> : null}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-surface rounded-xl p-5"><p className="text-xs text-muted mb-1">Total calls</p><p className="text-2xl font-bold">{total}</p></div>
        <div className="bg-surface rounded-xl p-5"><p className="text-xs text-muted mb-1">2xx</p><p className="text-2xl font-bold text-primary">{ok}</p></div>
        <div className="bg-surface rounded-xl p-5"><p className="text-xs text-muted mb-1">Errors</p><p className="text-2xl font-bold text-red-400">{errs}</p></div>
        <div className="bg-surface rounded-xl p-5"><p className="text-xs text-muted mb-1">Avg / p95</p><p className="text-2xl font-bold">{avgMs}<span className="text-sm text-muted"> / {p95Ms}ms</span></p></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-surface rounded-xl p-5">
          <h3 className="text-sm text-muted mb-3">Top rutas</h3>
          <ul className="space-y-2">{topPaths.map(([p, n]) => <li key={p} className="flex justify-between text-sm"><span className="font-mono">{p}</span><span className="text-primary">{n}</span></li>)}</ul>
        </div>
        <div className="bg-surface rounded-xl p-5">
          <h3 className="text-sm text-muted mb-3">Últimas 10</h3>
          <ul className="space-y-1 text-xs">
            {calls.slice(0, 10).map((c, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className={\`px-1.5 rounded font-mono \${c.method === "GET" ? "bg-blue-500/20 text-blue-400" : "bg-accent/20 text-accent"}\`}>{c.method}</span>
                <span className="font-mono truncate flex-1">{c.path}</span>
                <span className={\`font-mono \${c.status >= 200 && c.status < 300 ? "text-primary" : "text-red-400"}\`}>{c.status}</span>
                <span className="text-muted">{c.ms}ms</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
`;
}

function pageSettings() {
  return `"use client";
import { useEffect, useState } from "react";
import { DEFAULT_API_BASE } from "@/lib/api";

export default function SettingsPage() {
  const [apiBase, setApiBase] = useState(DEFAULT_API_BASE);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setApiBase(localStorage.getItem("apiBase") || DEFAULT_API_BASE);
    const t = (localStorage.getItem("theme") as "dark" | "light") || "dark";
    setTheme(t);
    document.documentElement.classList.toggle("light", t === "light");
  }, []);

  function save() {
    localStorage.setItem("apiBase", apiBase);
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("light", theme === "light");
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  }

  function clearHistory() {
    localStorage.removeItem("apiCalls");
    alert("Historial limpiado");
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-3xl font-bold mb-6">Settings</h2>
      <div className="bg-surface rounded-xl p-5 mb-4">
        <label className="text-xs text-muted block mb-2">API base URL</label>
        <input value={apiBase} onChange={e => setApiBase(e.target.value)} className="w-full bg-bg border border-muted/30 rounded p-3 font-mono text-sm" />
        <p className="text-xs text-muted mt-2">Default: <code>{DEFAULT_API_BASE}</code></p>
      </div>
      <div className="bg-surface rounded-xl p-5 mb-4">
        <label className="text-xs text-muted block mb-2">Theme</label>
        <div className="flex gap-2">
          <button onClick={() => setTheme("dark")} className={\`px-4 py-2 rounded \${theme === "dark" ? "bg-primary text-white" : "bg-bg"}\`}>Dark</button>
          <button onClick={() => setTheme("light")} className={\`px-4 py-2 rounded \${theme === "light" ? "bg-primary text-white" : "bg-bg"}\`}>Light</button>
        </div>
      </div>
      <div className="bg-surface rounded-xl p-5 mb-4">
        <p className="text-sm mb-3">Limpiar historial de llamadas API guardado en localStorage</p>
        <button onClick={clearHistory} className="bg-red-500/20 text-red-400 hover:bg-red-500/30 px-4 py-2 rounded text-sm">Limpiar historial</button>
      </div>
      <button onClick={save} className="bg-primary hover:bg-primary/90 px-5 py-2 rounded font-semibold">Guardar</button>
      {saved && <span className="ml-3 text-primary text-sm">✓ Guardado</span>}
    </div>
  );
}
`;
}

function pageSearch() {
  return `"use client";
import { useEffect, useMemo, useState } from "react";
import { getManifest } from "@/lib/api";

export default function SearchPage() {
  const [manifest, setManifest] = useState<any>({ project: null, apiRoutes: [] });
  const [query, setQuery] = useState("");
  useEffect(() => { getManifest().then(setManifest); }, []);

  const results = useMemo(() => {
    if (!query.trim()) return { routes: [], modules: [], stack: [] };
    const q = query.toLowerCase();
    const routes = (manifest.apiRoutes || []).filter((r: any) =>
      r.path.toLowerCase().includes(q) || r.summary.toLowerCase().includes(q) || r.method.toLowerCase().includes(q)
    );
    const modules = (manifest.project?.modules || []).filter((m: string) => m.toLowerCase().includes(q));
    const stack = (manifest.project?.stack || []).filter((s: string) => s.toLowerCase().includes(q));
    return { routes, modules, stack };
  }, [query, manifest]);

  return (
    <div className="max-w-4xl">
      <h2 className="text-3xl font-bold mb-6">Buscar</h2>
      <input autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar en rutas, módulos o stack..."
        className="w-full bg-surface border border-muted/30 rounded-lg p-4 text-lg mb-6" />
      {query.trim() && (
        <div className="space-y-6">
          {results.routes.length > 0 && (
            <div className="bg-surface rounded-xl p-5">
              <h3 className="text-sm text-muted mb-3">Rutas ({results.routes.length})</h3>
              <ul className="space-y-2">{results.routes.map((rt: any) => (
                <li key={\`\${rt.method} \${rt.path}\`} className="flex items-center gap-3 text-sm">
                  <span className={\`px-2 py-0.5 rounded font-mono text-xs \${rt.method === "GET" ? "bg-blue-500/20 text-blue-400" : "bg-accent/20 text-accent"}\`}>{rt.method}</span>
                  <span className="font-mono">{rt.path}</span><span className="text-muted ml-auto">{rt.summary}</span>
                </li>
              ))}</ul>
            </div>
          )}
          {results.modules.length > 0 && (
            <div className="bg-surface rounded-xl p-5">
              <h3 className="text-sm text-muted mb-3">Módulos ({results.modules.length})</h3>
              <ul className="flex flex-wrap gap-2">{results.modules.map((m: string) => <li key={m} className="px-3 py-1 bg-bg rounded-full text-sm">{m}</li>)}</ul>
            </div>
          )}
          {results.stack.length > 0 && (
            <div className="bg-surface rounded-xl p-5">
              <h3 className="text-sm text-muted mb-3">Stack ({results.stack.length})</h3>
              <ul className="flex flex-wrap gap-2">{results.stack.map((s: string) => <li key={s} className="px-3 py-1 bg-bg rounded-full text-sm">{s}</li>)}</ul>
            </div>
          )}
          {results.routes.length === 0 && results.modules.length === 0 && results.stack.length === 0 && (
            <p className="text-muted">Sin resultados para "{query}"</p>
          )}
        </div>
      )}
    </div>
  );
}
`;
}

function pageConsole() {
  return `"use client";
import { useState } from "react";
import { callRoute, getManifest, getHealth } from "@/lib/api";

const helpers = { callRoute, getManifest, getHealth };

export default function ConsolePage() {
  const [code, setCode] = useState('// Ejemplos:\\n// await callRoute("GET", "/api/v1/metrics");\\n// await callRoute("POST", "/api/v1/search", { query: "demo" });\\n// await getManifest();\\n\\nawait callRoute("GET", "/api/v1/metrics");');
  const [output, setOutput] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [running, setRunning] = useState(false);

  async function run() {
    setRunning(true); setError(null); setOutput(null);
    try {
      const fn = new Function("callRoute", "getManifest", "getHealth", \`return (async () => { return \${code.includes("await") || code.includes("return") ? code : "return " + code} })()\`);
      const result = await fn(helpers.callRoute, helpers.getManifest, helpers.getHealth);
      setOutput(result);
    } catch (e: any) {
      setError(e.message);
    } finally { setRunning(false); }
  }

  return (
    <div className="max-w-5xl">
      <h2 className="text-3xl font-bold mb-2">Console</h2>
      <p className="text-muted mb-6">Helpers disponibles: <code className="text-primary">callRoute(method, path, body?)</code>, <code className="text-primary">getManifest()</code>, <code className="text-primary">getHealth()</code></p>
      <textarea value={code} onChange={e => setCode(e.target.value)} rows={10}
        className="w-full bg-surface border border-muted/30 rounded p-4 font-mono text-sm mb-4" />
      <button onClick={run} disabled={running} className="bg-primary hover:bg-primary/90 disabled:opacity-50 px-5 py-2 rounded font-semibold mb-4">
        {running ? "Ejecutando..." : "Run"}
      </button>
      {error && <pre className="bg-red-500/10 text-red-400 rounded p-4 text-xs mb-4 overflow-auto">{error}</pre>}
      {output !== null && (
        <div className="bg-surface rounded-xl p-5">
          <h3 className="text-sm text-muted mb-2">Output</h3>
          <pre className="bg-bg rounded p-4 text-xs overflow-auto max-h-[500px]">{JSON.stringify(output, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
`;
}

function pagePlan() {
  return `import { getManifest } from "@/lib/api";

export default async function PlanPage() {
  const m = await getManifest();
  const p = m.project;
  if (!p) return <p className="text-muted">No se pudo cargar el manifest. ¿Está corriendo el mock API?</p>;
  return (
    <div className="max-w-4xl">
      <h2 className="text-3xl font-bold mb-2">{p.title}</h2>
      <p className="text-muted mb-6">{p.summary}</p>
      <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
        <div className="bg-surface rounded-xl p-4"><h3 className="text-xs text-muted mb-2 uppercase">Categoría</h3><p>{p.category}</p></div>
        <div className="bg-surface rounded-xl p-4"><h3 className="text-xs text-muted mb-2 uppercase">Codename</h3><p className="font-mono">{p.codename}</p></div>
        <div className="bg-surface rounded-xl p-4"><h3 className="text-xs text-muted mb-2 uppercase">API port</h3><p className="font-mono text-primary">:{p.server?.port}</p></div>
        <div className="bg-surface rounded-xl p-4"><h3 className="text-xs text-muted mb-2 uppercase">Web port</h3><p className="font-mono text-primary">:{p.web?.port}</p></div>
      </div>
      <div className="bg-surface rounded-xl p-5 mb-4"><h3 className="text-sm text-muted mb-3 uppercase">Stack</h3><ul className="flex flex-wrap gap-2">{(p.stack || []).map((s: string) => <li key={s} className="px-3 py-1 bg-bg rounded-full text-sm">{s}</li>)}</ul></div>
      <div className="bg-surface rounded-xl p-5"><h3 className="text-sm text-muted mb-3 uppercase">Módulos</h3><ul className="space-y-2">{(p.modules || []).map((mod: string) => <li key={mod} className="flex items-center gap-2 text-sm">→ {mod}</li>)}</ul></div>
    </div>
  );
}
`;
}

function pageHealth() {
  return `import { getHealth, getManifest } from "@/lib/api";

export default async function HealthPage() {
  const [h, m] = await Promise.all([getHealth(), getManifest()]);
  return (
    <div className="max-w-3xl">
      <h2 className="text-3xl font-bold mb-6">Estado del servicio</h2>
      <div className="bg-surface rounded-xl p-5 mb-4">
        <div className="flex items-center justify-between">
          <span>Mock API</span>
          <span className={h.status === "ok" ? "text-primary font-mono" : "text-red-400 font-mono"}>{h.status}</span>
        </div>
      </div>
      <div className="bg-surface rounded-xl p-5">
        <h3 className="text-sm text-muted mb-3">Manifest raw</h3>
        <pre className="bg-bg rounded p-4 text-xs overflow-auto max-h-[500px]">{JSON.stringify(m, null, 2)}</pre>
      </div>
    </div>
  );
}
`;
}

async function generateProject(p) {
  const root = path.join(targetDir, p.slug);
  await writeFile(path.join(root, 'package.json'), rootPackageJson(p));
  await writeFile(path.join(root, 'turbo.json'), turboJson());
  await writeFile(path.join(root, '.gitignore'), gitignore());
  await writeFile(path.join(root, 'README.md'), readmeRoot(p));
  await writeFile(path.join(root, 'docs', 'source-plan.md'), docsSourcePlan(p));
  await writeFile(path.join(root, 'docs', 'api-contracts.md'), docsApiContracts(p));
  await writeFile(path.join(root, 'docs', 'backlog.md'), docsBacklog(p));
  await writeFile(path.join(root, 'scripts', 'validate.mjs'), validateScript(p));

  await writeFile(path.join(root, 'packages/shared-types/package.json'), sharedPackageJson(p));
  await writeFile(path.join(root, 'packages/shared-types/src/manifest.mjs'), manifestSource(p));

  await writeFile(path.join(root, 'services/api/package.json'), apiPackageJson(p));
  await writeFile(path.join(root, 'services/api/src/server.mjs'), serverSource());

  const web = path.join(root, 'apps/web');
  await writeFile(path.join(web, 'package.json'), webPackageJson(p));
  await writeFile(path.join(web, 'next.config.mjs'), nextConfig());
  await writeFile(path.join(web, 'tsconfig.json'), tsConfig());
  await writeFile(path.join(web, 'postcss.config.mjs'), postcssConfig());
  await writeFile(path.join(web, 'tailwind.config.mjs'), tailwindConfig(p));
  await writeFile(path.join(web, 'app/globals.css'), globalsCss());
  await writeFile(path.join(web, 'app/layout.tsx'), layoutTsx(p));
  await writeFile(path.join(web, 'app/page.tsx'), pageHome(p));
  await writeFile(path.join(web, 'app/explorer/page.tsx'), pageExplorer());
  await writeFile(path.join(web, 'app/analytics/page.tsx'), pageAnalytics());
  await writeFile(path.join(web, 'app/settings/page.tsx'), pageSettings());
  await writeFile(path.join(web, 'app/search/page.tsx'), pageSearch());
  await writeFile(path.join(web, 'app/console/page.tsx'), pageConsole());
  await writeFile(path.join(web, 'app/plan/page.tsx'), pagePlan());
  await writeFile(path.join(web, 'app/health/page.tsx'), pageHealth());
  await writeFile(path.join(web, 'lib/api.ts'), libApi(p));
  await writeFile(path.join(web, 'README.md'), readmeWeb(p));
}

function rootParentPackageJson() {
  const workspaces = [];
  for (const p of projects) {
    workspaces.push(p.slug, `${p.slug}/services/*`, `${p.slug}/packages/*`, `${p.slug}/apps/*`);
  }
  return JSON.stringify({
    name: 'ecosistema-trend2026', private: true, type: 'module',
    workspaces, scripts: { validate: 'node validar_todo.mjs' }
  }, null, 2) + '\n';
}

function parentReadme() {
  const byCat = {};
  for (const p of projects) { byCat[p.cat] = byCat[p.cat] || []; byCat[p.cat].push(p); }
  let out = `# Proyectos Tendencia 2026 (v2)\n\n${projects.length} proyectos scaffold con Next.js 14 + mock API genérico, organizados en ${Object.keys(byCat).length} categorías.\n\n`;
  for (const [cat, items] of Object.entries(byCat)) {
    out += `## ${categories[cat].label} (${items.length})\n\n`;
    for (const p of items) out += `- \`${p.slug}\` (API \`:${p.port}\` · Web \`:${p.webPort}\`) — ${p.summary}\n`;
    out += '\n';
  }
  out += '## Cada proyecto incluye\n\n- 8 rutas mock (4 específicas + 4 utilitarias: metrics, notifications, search, batch)\n- 8 páginas web: Dashboard, API Explorer, Analytics, Search, Console, Plan, Health, Settings\n- Theme dark/light switch\n- API base configurable por proyecto\n- Historial de llamadas en localStorage\n\n## Arranque\n\n```bash\nnpm install                       # una sola vez\nnode validar_todo.mjs             # valida los ' + projects.length + '\ncd ragforge && npm run dev        # mock API ejemplo\ncd ragforge && npm run dev:web    # web ejemplo\n```\n';
  return out;
}

function parentValidator() {
  const slugs = projects.map(p => p.slug);
  return `import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projects = ${JSON.stringify(slugs, null, 2)};
let okCount = 0, fail = [];
for (const slug of projects) {
  try {
    execFileSync('node', ['scripts/validate.mjs'], { cwd: path.join(__dirname, slug), stdio: 'inherit' });
    okCount++;
  } catch (e) { fail.push(slug); }
}
console.log(\`\\nValidated \${okCount}/\${projects.length} projects.\`);
if (fail.length) { console.error('Failed:', fail.join(', ')); process.exit(1); }
`;
}

async function main() {
  await ensureDir(targetDir);
  await writeFile(path.join(targetDir, 'package.json'), rootParentPackageJson());
  await writeFile(path.join(targetDir, 'README.md'), parentReadme());
  await writeFile(path.join(targetDir, 'validar_todo.mjs'), parentValidator());
  await writeFile(path.join(targetDir, '.gitignore'), gitignore());

  for (const p of projects) await generateProject(p);
  console.log(`Generated ${projects.length} projects in ${targetDir}`);
}

main().catch(e => { console.error(e); process.exit(1); });
