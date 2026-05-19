# TestPrep — Plan maestro

Preparación adaptativa a exámenes oficiales: LSAT, MCAT, ICFES, ENEM, PAES.

## Categoría

EdTech

## Módulos MVP

- simulacros
- banco preguntas
- adaptive learning
- analytics
- tutor

## Stack objetivo

- Next.js 14
- FastAPI
- PostgreSQL
- XGBoost
- Anthropic

## Endpoints mock (8)

- `GET /api/v1/exams` — Exámenes
- `GET /api/v1/diagnostics` — Diagnóstico
- `POST /api/v1/simulacro` — Simulacro
- `POST /api/v1/answer` — Responder
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4243
- Web dev: 3243
