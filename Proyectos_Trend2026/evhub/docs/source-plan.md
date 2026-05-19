# EVHub — Plan maestro

Red de carga EV LATAM con roaming, ruta inteligente y reservas.

## Categoría

ClimateTech

## Módulos MVP

- estaciones
- roaming
- reservas
- ruta inteligente
- pagos

## Stack objetivo

- Next.js 14
- NestJS
- PostgreSQL
- OCPP
- Mapbox

## Endpoints mock (8)

- `GET /api/v1/stations` — Estaciones
- `GET /api/v1/sessions` — Sesiones
- `POST /api/v1/reserve` — Reservar
- `POST /api/v1/route` — Planificar
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4238
- Web dev: 3238
