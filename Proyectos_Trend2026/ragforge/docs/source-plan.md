# RAGForge — Plan maestro

Plataforma de RAG empresarial: ingesta, embeddings, índices, evaluación.

## Categoría

AI/GenAI

## Módulos MVP

- ingesta de documentos
- embeddings
- búsqueda híbrida
- chat con citas
- evaluación

## Stack objetivo

- Next.js 14
- FastAPI
- pgvector
- Redis
- OpenAI

## Endpoints mock (8)

- `GET /api/v1/collections` — Colecciones de documentos
- `GET /api/v1/queries/recent` — Queries recientes
- `POST /api/v1/ingest` — Ingesta documento
- `POST /api/v1/chat` — Chat con citas
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4200
- Web dev: 3200
