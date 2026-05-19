# IdentityID — Plan maestro

Identidad SSI/DID LATAM: credenciales verificables, presentaciones zero-knowledge.

## Categoría

Web3 / Blockchain

## Módulos MVP

- wallet ID
- credenciales
- presentaciones
- verificadores
- recovery

## Stack objetivo

- Next.js 14
- NestJS
- PostgreSQL
- DID
- ZK-SNARK

## Endpoints mock (8)

- `GET /api/v1/identity` — Identidad
- `GET /api/v1/credentials` — Credenciales
- `POST /api/v1/present` — Presentar
- `POST /api/v1/verify` — Verificar
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4265
- Web dev: 3265
