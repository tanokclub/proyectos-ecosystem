# CopiloC — Plan maestro

Copiloto de código para equipos: indexa el repo, genera PRs, hace code review.

## Categoría

AI/GenAI

## Módulos MVP

- indexing
- autocompletar
- PR gen
- review
- analytics

## Stack objetivo

- Next.js 14
- NestJS
- Tree-sitter
- PostgreSQL
- Anthropic

## Endpoints mock (8)

- `GET /api/v1/repos` — Repos indexados
- `GET /api/v1/reviews/recent` — Reviews recientes
- `POST /api/v1/complete` — Autocompletar
- `POST /api/v1/review` — Review PR
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4204
- Web dev: 3204
