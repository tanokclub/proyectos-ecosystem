# EdgeFn — Plan maestro

Edge functions LATAM con cold starts <50ms y KV global.

## Categoría

DevTools / Infra

## Módulos MVP

- funciones
- KV store
- cron
- observability
- deploy CLI

## Stack objetivo

- Next.js 14
- V8 isolates
- PostgreSQL
- Cloudflare style
- Anycast

## Endpoints mock (8)

- `GET /api/v1/functions` — Funciones
- `GET /api/v1/kv/keys` — KV keys
- `POST /api/v1/deploy` — Deploy fn
- `POST /api/v1/kv` — Set KV
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4257
- Web dev: 3257
