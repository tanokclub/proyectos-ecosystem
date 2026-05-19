# CertVerify — Plan maestro

Verificación blockchain de títulos académicos y certificaciones profesionales.

## Categoría

EdTech

## Módulos MVP

- emisión
- verificación
- wallet credenciales
- integraciones
- audit

## Stack objetivo

- Next.js 14
- NestJS
- PostgreSQL
- Ethers
- IPFS

## Endpoints mock (8)

- `GET /api/v1/credentials` — Credenciales
- `GET /api/v1/issuers` — Emisores
- `POST /api/v1/verify` — Verificar
- `POST /api/v1/issue` — Emitir
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4247
- Web dev: 3247
