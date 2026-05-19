# Multimind — Plan maestro

Chatbot multimodal: texto, voz, imagen y video como entradas y salidas.

## Categoría

AI/GenAI

## Módulos MVP

- chat
- visión
- audio
- video
- historial

## Stack objetivo

- Next.js 14
- FastAPI
- PostgreSQL
- Whisper
- SD3

## Endpoints mock (8)

- `GET /api/v1/threads` — Conversaciones multimodales
- `GET /api/v1/models` — Modelos por modalidad
- `POST /api/v1/chat` — Mensaje multimodal
- `POST /api/v1/generate/image` — Generar imagen
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4203
- Web dev: 3203
