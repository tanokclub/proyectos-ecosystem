# Plan de Implementación — KickLATAM

> Plataforma de streaming en vivo para LATAM con chat, monetizacion y VOD.

Estado actual: **scaffold con mock API stateful** (CRUD real en memoria, cero dependencias).
Este documento describe cómo llevarlo a producción. Todo el código lógico está listo;
solo falta instalar dependencias y conectar infraestructura cuando haya buena conexión.

## Stack objetivo
- Next.js 14
- Expo
- NestJS
- PostgreSQL
- Redis
- MongoDB
- FFmpeg

## Fases

### Fase 0 — Hoy (sin internet) ✅
- [x] Mock API con estado real (CRUD, paginación, filtros, búsqueda).
- [x] OpenAPI 3.0 autogenerado en `/openapi.json`.
- [x] Métricas Prometheus en `/metrics` y stats en `/_stats`.
- [x] Simulación de latencia/errores para probar resiliencia del frontend.
- [x] Auth opcional por API key (env `API_KEY`).

### Fase 1 — Persistencia real (al tener internet)
- [ ] `npm install` (ver INSTALL_WHEN_ONLINE.md).
- [ ] Migrar colecciones en memoria → Prisma + PostgreSQL.
- [ ] Modelos a crear: `streams`, `categories`, `vod`, `demo`, `send`, `subscriptions`.
- [ ] Seeds desde los ejemplos del manifest (`packages/.../manifest.mjs`).

### Fase 2 — Autenticación y autorización
- [ ] JWT + refresh tokens (jose / next-auth).
- [ ] RBAC por rol; middleware de protección de rutas `/api/*`.
- [ ] Rate limiting real (Redis) — hoy ya hay headers informativos.

### Fase 3 — Tiempo real y eventos
- [ ] WebSockets / SSE para actualizaciones en vivo.
- [ ] Cola de trabajos (BullMQ + Redis) para tareas asíncronas.

### Fase 4 — Observabilidad y calidad
- [ ] OpenTelemetry → traces/metrics; el endpoint `/metrics` ya expone counters.
- [ ] Tests: unit (node:test) + E2E (Playwright).
- [ ] CI/CD (GitHub Actions): lint + build + test.

### Fase 5 — Despliegue
- [ ] Dockerfile multi-stage (ver `infra/docker`).
- [ ] Variables de entorno documentadas en `.env.example`.

## Endpoints actuales
- `GET /api/v1/streams` — Streams destacados
- `GET /api/v1/categories` — Categorias disponibles
- `GET /api/v1/vod` — VOD recientes
- `GET /api/v1/chat/demo` — Chat demo para desarrollo
- `POST /api/v1/chat/send` — Enviar mensaje al chat
- `POST /api/v1/subscriptions` — Simular alta de suscripcion
