# APIMesh — Plan maestro

API gateway open source: routing, auth, rate limit, transformaciones, observabilidad.

## Categoría

DevTools / Infra

## Módulos MVP

- routes
- auth
- rate limit
- transforms
- plugins

## Stack objetivo

- Next.js 14
- Envoy
- Lua
- Redis
- PostgreSQL

## Endpoints mock (8)

- `GET /api/v1/routes` — Rutas
- `GET /api/v1/plugins` — Plugins
- `POST /api/v1/routes` — Crear ruta
- `POST /api/v1/plugins/install` — Instalar plugin
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4254
- Web dev: 3254
