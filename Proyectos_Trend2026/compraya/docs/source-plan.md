# CompraYa — Plan maestro

BNPL para retail LATAM: split en 3-12 cuotas sin intereses.

## Categoría

FinTech LATAM

## Módulos MVP

- checkout
- cuotas
- scoring
- cobranza
- merchants

## Stack objetivo

- Next.js 14
- NestJS
- PostgreSQL
- Redis
- Stripe

## Endpoints mock (8)

- `GET /api/v1/orders` — Órdenes
- `GET /api/v1/merchants` — Merchants
- `POST /api/v1/checkout` — Checkout BNPL
- `POST /api/v1/score` — Score cliente
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4213
- Web dev: 3213
