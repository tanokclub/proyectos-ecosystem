# SendyLat — Plan maestro

Remesas LATAM-to-LATAM con rails locales y FX competitivo.

## Categoría

FinTech LATAM

## Módulos MVP

- envío
- pickup
- KYC
- FX
- compliance

## Stack objetivo

- Next.js 14
- NestJS
- PostgreSQL
- Redis
- Stellar

## Endpoints mock (8)

- `GET /api/v1/corridors` — Corredores
- `GET /api/v1/recipients` — Destinatarios
- `POST /api/v1/quotes` — Cotizar
- `POST /api/v1/transfers` — Enviar
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4212
- Web dev: 3212
