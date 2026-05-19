# TriajeAI — Plan maestro

Triage AI para urgencias y atención primaria con clasificación Manchester.

## Categoría

HealthTech

## Módulos MVP

- triage
- protocolos
- derivación
- audit
- analytics

## Stack objetivo

- Next.js 14
- FastAPI
- PostgreSQL
- Anthropic

## Endpoints mock (8)

- `GET /api/v1/protocols` — Protocolos
- `GET /api/v1/sessions/recent` — Sesiones
- `POST /api/v1/triage` — Triage
- `POST /api/v1/refer` — Derivar
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4222
- Web dev: 3222
