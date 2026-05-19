# PromptOps — Plan maestro

Versionado, testing y deploy de prompts en producción con métricas.

## Categoría

AI/GenAI

## Módulos MVP

- versiones
- A/B testing
- eval
- observabilidad
- rollback

## Stack objetivo

- Next.js 14
- NestJS
- PostgreSQL
- ClickHouse
- Anthropic

## Endpoints mock (8)

- `GET /api/v1/prompts` — Prompts
- `GET /api/v1/experiments` — A/B activos
- `POST /api/v1/versions` — Nueva versión
- `POST /api/v1/promote` — Promover ganador
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4208
- Web dev: 3208
