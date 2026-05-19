# CarbonTrack — Plan maestro

Medición de huella de carbono corporativa scope 1/2/3 con auto-reporte GHG.

## Categoría

ClimateTech

## Módulos MVP

- inventario
- scope 1/2/3
- reportes
- GHG protocol
- sci targets

## Stack objetivo

- Next.js 14
- NestJS
- PostgreSQL
- dbt
- Redis

## Endpoints mock (8)

- `GET /api/v1/inventory` — Inventario
- `GET /api/v1/sources` — Fuentes
- `POST /api/v1/activity` — Activity
- `POST /api/v1/report/generate` — Reporte GHG
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4230
- Web dev: 3230
