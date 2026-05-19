# MnemoAI — Plan maestro

Banco de memoria persistente para agentes: hechos, decisiones, embeddings.

## Categoría

AI/GenAI

## Módulos MVP

- hechos
- episodios
- recuperación
- olvido
- sync agentes

## Stack objetivo

- Next.js 14
- FastAPI
- pgvector
- PostgreSQL
- Redis

## Endpoints mock (8)

- `GET /api/v1/memories` — Memorias
- `GET /api/v1/agents` — Agentes
- `POST /api/v1/memories` — Guardar
- `POST /api/v1/recall` — Recuperar
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4209
- Web dev: 3209
