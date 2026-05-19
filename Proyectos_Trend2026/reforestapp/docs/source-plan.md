# ReforestaApp — Plan maestro

Tracker satelital de proyectos de reforestación con verificación geoespacial.

## Categoría

ClimateTech

## Módulos MVP

- proyectos
- parcelas
- monitoreo NDVI
- verificación
- reportes

## Stack objetivo

- Next.js 14
- FastAPI
- PostGIS
- Sentinel-2
- Anthropic

## Endpoints mock (8)

- `GET /api/v1/projects` — Proyectos
- `GET /api/v1/ndvi` — NDVI
- `POST /api/v1/parcels` — Parcela
- `POST /api/v1/verify` — Verificar satélite
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4234
- Web dev: 3234
