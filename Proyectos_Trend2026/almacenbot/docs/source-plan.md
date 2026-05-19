# AlmacenBot — Plan maestro

Robotics warehouse management: AGVs, picking AI, inventario, WMS.

## Categoría

IoT / Smart Cities

## Módulos MVP

- robots
- picking
- inventario
- WMS
- analytics

## Stack objetivo

- Next.js 14
- ROS2
- PostgreSQL
- Computer Vision
- Kafka

## Endpoints mock (8)

- `GET /api/v1/robots` — Robots
- `GET /api/v1/inventory` — Inventario
- `POST /api/v1/pick` — Pick order
- `POST /api/v1/robots/dispatch` — Despachar robot
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4276
- Web dev: 3276
