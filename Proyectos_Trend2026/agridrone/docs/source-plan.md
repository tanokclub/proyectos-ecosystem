# AgriDrone — Plan maestro

Drones agrícolas para mapeo, monitoreo cultivos y aspersión de precisión.

## Categoría

IoT / Smart Cities

## Módulos MVP

- flotas drones
- misiones
- mapeo NDVI
- aspersión
- reportes

## Stack objetivo

- Next.js 14
- FastAPI
- PostgreSQL
- CV
- PX4

## Endpoints mock (8)

- `GET /api/v1/drones` — Drones
- `GET /api/v1/missions` — Misiones
- `POST /api/v1/missions` — Crear misión
- `POST /api/v1/missions/launch` — Lanzar misión
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4277
- Web dev: 3277
