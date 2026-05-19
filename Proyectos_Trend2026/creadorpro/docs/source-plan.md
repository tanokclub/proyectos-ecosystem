# CreadorPro — Plan maestro

Plataforma all-in-one monetización creators: suscripciones, tips, comisiones, sponsors.

## Categoría

Creator Economy

## Módulos MVP

- perfil
- suscripciones
- tips
- comisiones
- sponsors

## Stack objetivo

- Next.js 14
- NestJS
- PostgreSQL
- Stripe Connect
- Redis

## Endpoints mock (8)

- `GET /api/v1/creator` — Perfil creator
- `GET /api/v1/posts` — Posts
- `POST /api/v1/subscribe` — Suscribir
- `POST /api/v1/tip` — Tip
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4280
- Web dev: 3280
