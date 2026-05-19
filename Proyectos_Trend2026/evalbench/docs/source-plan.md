# EvalBench — Plan maestro

Plataforma para evaluar y comparar modelos LLM con datasets y métricas custom.

## Categoría

AI/GenAI

## Módulos MVP

- datasets
- runs
- métricas
- comparador
- reportes

## Stack objetivo

- Next.js 14
- FastAPI
- PostgreSQL
- ClickHouse
- Polars

## Endpoints mock (8)

- `GET /api/v1/datasets` — Datasets
- `GET /api/v1/runs` — Runs
- `POST /api/v1/runs` — Lanzar run
- `POST /api/v1/compare` — Comparar
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4205
- Web dev: 3205
