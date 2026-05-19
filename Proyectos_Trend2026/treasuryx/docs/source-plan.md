# TreasuryX — Plan maestro

Tesorería corporativa LATAM multi-moneda con cash forecasting AI.

## Categoría

FinTech LATAM

## Módulos MVP

- multi-moneda
- forecast
- FX hedging
- pagos
- reportes

## Stack objetivo

- Next.js 14
- NestJS
- PostgreSQL
- ClickHouse
- Prophet

## Endpoints mock (8)

- `GET /api/v1/positions` — Posiciones
- `GET /api/v1/forecast` — Forecast 30d
- `POST /api/v1/hedge` — Hedge FX
- `POST /api/v1/payments/batch` — Batch pagos
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4216
- Web dev: 3216
