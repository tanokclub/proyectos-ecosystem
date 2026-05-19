# PrivyVote — Plan maestro

Voting privado ZK para DAOs, organizaciones y gobiernos: anónimo y verificable.

## Categoría

Web3 / Blockchain

## Módulos MVP

- proposals
- voting ZK
- tally
- audit
- verifiers

## Stack objetivo

- Next.js 14
- Foundry
- Circom
- Ethers
- PostgreSQL

## Endpoints mock (8)

- `GET /api/v1/ballots` — Boletas
- `GET /api/v1/proofs` — Pruebas ZK
- `POST /api/v1/vote` — Vote ZK
- `POST /api/v1/tally` — Tally
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4267
- Web dev: 3267
