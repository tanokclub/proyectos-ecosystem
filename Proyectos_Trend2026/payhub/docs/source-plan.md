# PayHub — Plan maestro

Super-app de pagos: P2P, QR, recargas, servicios, cashback.

## Categoría

FinTech LATAM

## Módulos MVP

- wallet
- P2P
- QR
- recargas
- cashback

## Stack objetivo

- Next.js 14
- NestJS
- PostgreSQL
- Redis
- Kafka

## Endpoints mock (8)

- `GET /api/v1/wallet` — Wallet
- `GET /api/v1/services` — Servicios
- `POST /api/v1/p2p/send` — Enviar P2P
- `POST /api/v1/services/pay` — Pagar servicio
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4219
- Web dev: 3219
