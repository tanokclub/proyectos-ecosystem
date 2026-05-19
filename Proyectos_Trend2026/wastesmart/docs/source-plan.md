# WasteSmart — Plan maestro

Recolección residuos optimizada: sensores en contenedores, rutas dinámicas.

## Categoría

IoT / Smart Cities

## Módulos MVP

- contenedores
- rutas
- fleet
- reportes ciudadanos
- analytics

## Stack objetivo

- Next.js 14
- NestJS
- PostgreSQL
- OR-Tools
- MQTT

## Endpoints mock (8)

- `GET /api/v1/bins` — Contenedores
- `GET /api/v1/routes` — Rutas hoy
- `POST /api/v1/routes/recalculate` — Recalcular
- `POST /api/v1/reports` — Reporte ciudadano
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4273
- Web dev: 3273
