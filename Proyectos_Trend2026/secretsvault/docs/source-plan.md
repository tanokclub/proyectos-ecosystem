# SecretsVault — Plan maestro

Gestión de secretos zero-trust con rotación automática y audit total.

## Categoría

DevTools / Infra

## Módulos MVP

- secretos
- rotación
- políticas
- audit
- SDKs

## Stack objetivo

- Next.js 14
- NestJS
- PostgreSQL
- Vault
- KMS

## Endpoints mock (8)

- `GET /api/v1/secrets` — Secretos
- `GET /api/v1/audit` — Audit
- `POST /api/v1/secrets` — Crear secret
- `POST /api/v1/secrets/rotate` — Rotar
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4253
- Web dev: 3253
