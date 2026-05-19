# SaludMarket — Plan maestro

Marketplace de servicios de salud: estudios, vacunas, terapias a domicilio.

## Categoría

HealthTech

## Módulos MVP

- catálogo
- agenda
- pagos
- proveedores
- reviews

## Stack objetivo

- Next.js 14
- NestJS
- PostgreSQL
- Redis
- Stripe

## Endpoints mock (8)

- `GET /api/v1/services` — Servicios
- `GET /api/v1/providers` — Proveedores
- `POST /api/v1/book` — Reservar
- `POST /api/v1/review` — Review
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4229
- Web dev: 3229
