# CryptoLat — Plan maestro

Wallet cripto LATAM con on/off-ramp local (PIX, SPEI, PSE).

## Categoría

FinTech LATAM

## Módulos MVP

- wallet
- on-ramp
- off-ramp
- swap
- staking

## Stack objetivo

- Next.js 14
- NestJS
- PostgreSQL
- Ethers
- Bitcore

## Endpoints mock (8)

- `GET /api/v1/balances` — Balances
- `GET /api/v1/quotes` — Quotes swap
- `POST /api/v1/onramp` — On-ramp PIX/SPEI
- `POST /api/v1/swap` — Swap
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4211
- Web dev: 3211
