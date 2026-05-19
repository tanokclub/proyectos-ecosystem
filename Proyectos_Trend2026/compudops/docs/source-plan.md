# CompudOps — Plan maestro

Orchestrator de agentes computer-use: lanza, monitoriza y graba sesiones.

## Categoría

AI/GenAI

## Módulos MVP

- sesiones
- tareas
- video
- aprobaciones
- audit

## Stack objetivo

- Next.js 14
- FastAPI
- PostgreSQL
- noVNC
- Anthropic

## Endpoints mock (8)

- `GET /api/v1/sessions` — Sesiones
- `GET /api/v1/approvals` — Aprobaciones
- `POST /api/v1/sessions` — Crear sesión
- `POST /api/v1/approve` — Aprobar acción
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4207
- Web dev: 3207
