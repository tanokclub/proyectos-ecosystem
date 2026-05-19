# AireSensor — Plan maestro

Red IoT de sensores de calidad de aire en ciudades LATAM con alertas.

## Categoría

ClimateTech

## Módulos MVP

- sensores
- mapas
- alertas
- predicción
- API pública

## Stack objetivo

- Next.js 14
- FastAPI
- TimescaleDB
- MQTT
- Mapbox

## Endpoints mock (8)

- `GET /api/v1/sensors` — Sensores
- `GET /api/v1/cities` — Ciudades
- `POST /api/v1/alerts` — Suscribir
- `POST /api/v1/readings` — Push lectura
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4232
- Web dev: 3232
