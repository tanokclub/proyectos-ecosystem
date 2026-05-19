# ChaosTest — Plan maestro

Chaos engineering as service: fault injection, game days, hipótesis automatizadas.

## Categoría

DevTools / Infra

## Módulos MVP

- experimentos
- fault injection
- hypothesis
- reportes
- game days

## Stack objetivo

- Next.js 14
- Go
- PostgreSQL
- eBPF
- Kubernetes

## Endpoints mock (8)

- `GET /api/v1/experiments` — Experimentos
- `GET /api/v1/findings` — Hallazgos
- `POST /api/v1/experiments/run` — Correr exp
- `POST /api/v1/abort` — Abortar
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4258
- Web dev: 3258
