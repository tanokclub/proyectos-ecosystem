# VoiceClone Pro — Plan maestro

Estudio para clonar voces, generar narraciones y voiceovers multilingües.

## Categoría

AI/GenAI

## Módulos MVP

- voces
- proyectos
- síntesis TTS
- studio
- API

## Stack objetivo

- Next.js 14
- FastAPI
- ElevenLabs
- S3
- PostgreSQL

## Endpoints mock (8)

- `GET /api/v1/voices` — Voces clonadas
- `GET /api/v1/projects` — Proyectos narración
- `POST /api/v1/synthesize` — Sintetizar voz
- `POST /api/v1/voices` — Crear voz
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4202
- Web dev: 3202
