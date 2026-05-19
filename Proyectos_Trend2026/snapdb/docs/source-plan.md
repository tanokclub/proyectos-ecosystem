# SnapDB — Plan maestro

Postgres con branching estilo Git: snapshots instantáneos, branches por PR.

## Categoría

DevTools / Infra

## Módulos MVP

- branches
- snapshots
- restore
- permisos
- pricing

## Stack objetivo

- Next.js 14
- Postgres
- WAL
- S3
- Rust

## Endpoints mock (8)

- `GET /api/v1/branches` — Branches
- `GET /api/v1/snapshots` — Snapshots
- `POST /api/v1/branches` — Crear branch
- `POST /api/v1/restore` — Restore
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4256
- Web dev: 3256
