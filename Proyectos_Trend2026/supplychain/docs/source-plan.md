# SupplyChain — Plan maestro

Trazabilidad supply chain on-chain: hashing por lote, IoT integrado, audit.

## Categoría

Web3 / Blockchain

## Módulos MVP

- lotes
- trazabilidad
- sensores
- audit
- compliance

## Stack objetivo

- Next.js 14
- Hyperledger
- PostgreSQL
- Redis
- IoT

## Endpoints mock (8)

- `GET /api/v1/batches` — Lotes
- `GET /api/v1/sensors` — Sensores IoT
- `POST /api/v1/batches` — Crear lote
- `POST /api/v1/stage` — Registrar stage
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4268
- Web dev: 3268
