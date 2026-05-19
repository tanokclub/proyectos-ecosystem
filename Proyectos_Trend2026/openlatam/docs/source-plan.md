# OpenLatAm — Plan maestro

Open banking LATAM: agrega cuentas vía PIX, CoDi, PSE, CMF, CMA.

## Categoría

FinTech LATAM

## Módulos MVP

- conexiones
- cuentas
- transacciones
- consents
- agregación

## Stack objetivo

- Next.js 14
- NestJS
- PostgreSQL
- Redis
- Kafka

## Endpoints mock (8)

- `GET /api/v1/connections` — Conexiones bancarias
- `GET /api/v1/accounts/aggregated` — Cuentas agregadas
- `POST /api/v1/consents` — Crear consent
- `POST /api/v1/sync` — Forzar sync
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4210
- Web dev: 3210
