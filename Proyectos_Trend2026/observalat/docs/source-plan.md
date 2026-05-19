# ObservaLAT — Plan maestro

Observabilidad open source: logs, métricas, traces, alertas, OpenTelemetry.

## Categoría

DevTools / Infra

## Módulos MVP

- logs
- métricas
- traces
- alertas
- dashboards

## Stack objetivo

- Next.js 14
- Go
- ClickHouse
- OpenTelemetry
- Redis

## Endpoints mock (8)

- `GET /api/v1/services` — Servicios
- `GET /api/v1/alerts` — Alertas activas
- `POST /api/v1/query` — Query logs
- `POST /api/v1/alerts` — Crear alerta
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4251
- Web dev: 3251
