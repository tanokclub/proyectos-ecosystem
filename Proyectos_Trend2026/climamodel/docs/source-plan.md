# ClimaModel — Plan maestro

Modelado climático local con descarga estadística y proyecciones IPCC.

## Categoría

ClimateTech

## Módulos MVP

- scenarios
- descarga
- ensemble
- riesgos
- reportes

## Stack objetivo

- Next.js 14
- FastAPI
- xarray
- PostgreSQL
- Anthropic

## Endpoints mock (8)

- `GET /api/v1/scenarios` — Escenarios
- `GET /api/v1/projections` — Proyección
- `POST /api/v1/analyze` — Analizar
- `POST /api/v1/report` — Reporte
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4237
- Web dev: 3237
