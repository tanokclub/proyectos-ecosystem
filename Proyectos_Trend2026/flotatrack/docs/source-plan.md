# FlotaTrack — Plan maestro

Fleet management LATAM: GPS, ELD, mantenimiento predictivo, telemática.

## Categoría

IoT / Smart Cities

## Módulos MVP

- vehículos
- telemática
- rutas
- mantenimiento
- compliance

## Stack objetivo

- Next.js 14
- NestJS
- PostgreSQL
- TimescaleDB
- OBD-II

## Endpoints mock (8)

- `GET /api/v1/vehicles` — Vehículos
- `GET /api/v1/maintenance` — Mantenimiento
- `POST /api/v1/routes/assign` — Asignar ruta
- `POST /api/v1/alert` — Alerta evento
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4275
- Web dev: 3275
