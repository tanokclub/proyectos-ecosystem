# TelemedLAT — Plan maestro

Telemedicina LATAM: consultas video, recetas digitales, integración EPS.

## Categoría

HealthTech

## Módulos MVP

- agenda
- videoconsulta
- recetas
- historial
- pagos

## Stack objetivo

- Next.js 14
- NestJS
- PostgreSQL
- Twilio Video
- Redis

## Endpoints mock (8)

- `GET /api/v1/appointments` — Citas
- `GET /api/v1/doctors` — Médicos
- `POST /api/v1/book` — Agendar
- `POST /api/v1/prescriptions` — Receta
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4220
- Web dev: 3220
