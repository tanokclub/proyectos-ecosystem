# CursosLive — Plan maestro

Streaming educativo bidireccional: clases live, Q&A en vivo, certificación.

## Categoría

EdTech

## Módulos MVP

- clases live
- salas
- Q&A
- certificación
- pagos

## Stack objetivo

- Next.js 14
- NestJS
- PostgreSQL
- WebRTC
- Redis

## Endpoints mock (8)

- `GET /api/v1/lives` — Lives programados
- `GET /api/v1/rooms` — Salas activas
- `POST /api/v1/lives/join` — Unirse
- `POST /api/v1/qa/ask` — Preguntar Q&A
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4242
- Web dev: 3242
