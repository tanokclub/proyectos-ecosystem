# BridgeChain — Plan maestro

Bridge cross-chain optimizado para corredores LATAM (ETH↔ARB↔BASE↔OP).

## Categoría

Web3 / Blockchain

## Módulos MVP

- cotización
- transferencia
- liquidity
- security
- monitoring

## Stack objetivo

- Next.js 14
- Foundry
- LayerZero
- Ethers
- PostgreSQL

## Endpoints mock (8)

- `GET /api/v1/routes` — Rutas bridge
- `GET /api/v1/liquidity` — Liquidez
- `POST /api/v1/quote` — Cotizar
- `POST /api/v1/transfer` — Transferir
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4263
- Web dev: 3263
