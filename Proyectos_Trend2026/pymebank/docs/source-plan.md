# PymeBank — Plan maestro

Neobanco para PYMEs LATAM: cuenta empresarial, facturación, nómina.

## Categoría

FinTech LATAM

## Módulos MVP

- cuenta
- facturación SAT/DIAN
- nómina
- préstamos
- tarjetas

## Stack objetivo

- Next.js 14
- NestJS
- PostgreSQL
- Kafka
- Redis

## Endpoints mock (8)

- `GET /api/v1/business` — Resumen
- `GET /api/v1/invoices` — Facturas
- `POST /api/v1/payroll` — Correr nómina
- `POST /api/v1/loans/apply` — Préstamo
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4214
- Web dev: 3214
