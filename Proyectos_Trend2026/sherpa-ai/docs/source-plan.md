# Sherpa AI — Plan maestro

Agente de soporte multicanal (web, WhatsApp, email) con tools y handoff humano.

## Categoría

AI/GenAI

## Módulos MVP

- tickets
- agente con tools
- handoff
- KB
- analytics

## Stack objetivo

- Next.js 14
- NestJS
- PostgreSQL
- Redis
- Anthropic

## Endpoints mock (8)

- `GET /api/v1/conversations` — Conversaciones activas
- `GET /api/v1/tools` — Tools disponibles
- `POST /api/v1/conversations/reply` — Responder
- `POST /api/v1/handoff` — Pasar a humano
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4201
- Web dev: 3201
