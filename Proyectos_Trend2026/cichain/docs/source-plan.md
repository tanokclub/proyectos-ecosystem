# CIChain — Plan maestro

CI/CD self-hosted compatible con GitHub Actions, ejecutores en cualquier nube.

## Categoría

DevTools / Infra

## Módulos MVP

- workflows
- runners
- artifacts
- secrets
- matrix

## Stack objetivo

- Next.js 14
- Go
- PostgreSQL
- Docker
- Redis

## Endpoints mock (8)

- `GET /api/v1/workflows` — Workflows
- `GET /api/v1/runs` — Runs
- `POST /api/v1/runs` — Trigger
- `POST /api/v1/runners/register` — Registrar runner
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4255
- Web dev: 3255
