# FitCoach — Plan maestro

Entrenador AI con plan personalizado: ejercicio, recuperación, nutrición.

## Categoría

HealthTech

## Módulos MVP

- plan
- rutinas
- wearable sync
- progreso
- comunidad

## Stack objetivo

- Next.js 14
- FastAPI
- PostgreSQL
- Anthropic

## Endpoints mock (8)

- `GET /api/v1/plan` — Plan
- `GET /api/v1/today` — Sesión hoy
- `POST /api/v1/log` — Logear
- `POST /api/v1/plan/regenerate` — Replan
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4225
- Web dev: 3225
