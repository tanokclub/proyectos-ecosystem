# DeployHaus — Plan maestro

PaaS bare-metal LATAM: deploy Git-based, autoscaling, secretos, dominios.

## Categoría

DevTools / Infra

## Módulos MVP

- apps
- builds
- autoscaling
- secretos
- dominios

## Stack objetivo

- Next.js 14
- NestJS
- Docker
- Nomad
- PostgreSQL

## Endpoints mock (8)

- `GET /api/v1/apps` — Apps
- `GET /api/v1/builds` — Builds
- `POST /api/v1/deploy` — Deploy
- `POST /api/v1/scale` — Escalar
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4252
- Web dev: 3252
