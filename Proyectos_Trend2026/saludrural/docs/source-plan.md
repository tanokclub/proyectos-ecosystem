# SaludRural — Plan maestro

IoT salud rural: telemetría, telediagnóstico, brigadas, conectividad satelital.

## Categoría

IoT / Smart Cities

## Módulos MVP

- puestos rurales
- telediagnóstico
- inventario meds
- brigadas
- epidemiología

## Stack objetivo

- Next.js 14
- NestJS
- PostgreSQL
- Starlink
- Twilio

## Endpoints mock (8)

- `GET /api/v1/posts` — Puestos rurales
- `GET /api/v1/meds/inventory` — Inventario meds
- `POST /api/v1/consult` — Telediagnóstico
- `POST /api/v1/brigade/schedule` — Programar brigada
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4278
- Web dev: 3278
