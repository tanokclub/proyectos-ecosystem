# MCPGate — Plan maestro

Gestor de servidores MCP: descubrir, instalar, monitorizar y autorizar.

## Categoría

AI/GenAI

## Módulos MVP

- catálogo
- instalación
- autenticación
- logs
- permisos

## Stack objetivo

- Next.js 14
- NestJS
- PostgreSQL
- Redis
- Docker

## Endpoints mock (8)

- `GET /api/v1/servers` — Servidores instalados
- `GET /api/v1/catalog` — Catálogo
- `POST /api/v1/servers` — Instalar
- `POST /api/v1/authorize` — Autorizar OAuth
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4206
- Web dev: 3206
