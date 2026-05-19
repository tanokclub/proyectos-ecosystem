# AIStudio — Plan maestro

Content generation AI para creators: thumbnails, scripts, ediciones, voiceovers.

## Categoría

Creator Economy

## Módulos MVP

- thumbnails
- scripts
- ediciones
- voiceovers
- translaciones

## Stack objetivo

- Next.js 14
- FastAPI
- PostgreSQL
- Anthropic
- SD3

## Endpoints mock (8)

- `GET /api/v1/projects` — Proyectos
- `GET /api/v1/templates` — Templates
- `POST /api/v1/generate` — Generar
- `POST /api/v1/translate` — Traducir video
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4288
- Web dev: 3288
