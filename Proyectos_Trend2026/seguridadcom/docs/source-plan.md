# SeguridadCom — Plan maestro

Vigilancia comunitaria: cámaras, IA detección, botón pánico, alertas vecinos.

## Categoría

IoT / Smart Cities

## Módulos MVP

- cámaras
- alertas
- botón pánico
- vecinos
- autoridades

## Stack objetivo

- Next.js 14
- NestJS
- PostgreSQL
- CV
- WebRTC

## Endpoints mock (8)

- `GET /api/v1/cameras` — Cámaras
- `GET /api/v1/alerts` — Alertas
- `POST /api/v1/panic` — Botón pánico
- `POST /api/v1/cameras/share` — Compartir vivo
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4274
- Web dev: 3274
