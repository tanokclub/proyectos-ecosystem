# CostMonitor — Plan maestro

Cloud cost monitoring multi-nube con anomaly detection y optimización.

## Categoría

DevTools / Infra

## Módulos MVP

- ingesta
- anomalies
- optimización
- budgets
- reports

## Stack objetivo

- Next.js 14
- Python
- PostgreSQL
- ClickHouse
- AWS SDK

## Endpoints mock (8)

- `GET /api/v1/spending` — Gasto
- `GET /api/v1/anomalies` — Anomalías
- `POST /api/v1/budgets` — Crear budget
- `POST /api/v1/recommendations` — Recomendaciones
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4259
- Web dev: 3259
