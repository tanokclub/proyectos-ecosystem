# ParkingIQ — Plan maestro

Parking inteligente: detección plazas libres, pricing dinámico, reservas.

## Categoría

IoT / Smart Cities

## Módulos MVP

- plazas
- pricing
- reservas
- pagos
- analytics

## Stack objetivo

- Next.js 14
- NestJS
- PostgreSQL
- Computer Vision
- Redis

## Endpoints mock (8)

- `GET /api/v1/lots` — Estacionamientos
- `GET /api/v1/heatmap` — Heatmap demanda
- `POST /api/v1/reserve` — Reservar
- `POST /api/v1/checkin` — Check-in
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4271
- Web dev: 3271
