# CitySense — Plan maestro

Smart city dashboard: sensores urbanos, alertas, gestión incidentes municipales.

## Categoría

IoT / Smart Cities

## Módulos MVP

- sensores urbanos
- incidentes
- dashboard
- predicción
- ciudadanos

## Stack objetivo

- Next.js 14
- FastAPI
- PostgreSQL
- TimescaleDB
- MQTT

## Endpoints mock (8)

- `GET /api/v1/sensors` — Sensores
- `GET /api/v1/incidents` — Incidentes
- `POST /api/v1/incidents` — Reportar
- `POST /api/v1/sensors/calibrate` — Calibrar
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4270
- Web dev: 3270
