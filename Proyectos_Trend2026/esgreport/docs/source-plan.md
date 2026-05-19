# ESGReport — Plan maestro

Auto-reporte ESG (TCFD, ISSB, GRI) con scoring AI y data lake.

## Categoría

ClimateTech

## Módulos MVP

- frameworks
- data ingestion
- scoring
- reportes
- audit

## Stack objetivo

- Next.js 14
- NestJS
- PostgreSQL
- dbt
- Anthropic

## Endpoints mock (8)

- `GET /api/v1/frameworks` — Frameworks
- `GET /api/v1/score` — Score ESG
- `POST /api/v1/data/upload` — Upload
- `POST /api/v1/report/generate` — Reporte
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4239
- Web dev: 3239
