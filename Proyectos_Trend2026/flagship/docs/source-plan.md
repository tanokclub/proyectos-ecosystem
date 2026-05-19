# FlagShip — Plan maestro

Feature flags self-hosted: rollouts gradual, A/B, segmentación, SDKs multi-lenguaje.

## Categoría

DevTools / Infra

## Módulos MVP

- flags
- environments
- rollouts
- A/B
- analytics

## Stack objetivo

- Next.js 14
- NestJS
- PostgreSQL
- Redis
- TypeScript

## Endpoints mock (8)

- `GET /api/v1/flags` — Flags
- `GET /api/v1/environments` — Environments
- `POST /api/v1/flags` — Crear flag
- `POST /api/v1/flags/evaluate` — Evaluar
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4250
- Web dev: 3250
