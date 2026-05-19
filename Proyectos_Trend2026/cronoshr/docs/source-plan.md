# CronosHR — Plan maestro

EHR open source LATAM: historial clínico unificado HL7/FHIR.

## Categoría

HealthTech

## Módulos MVP

- pacientes
- encounters
- condiciones
- medicación
- observaciones

## Stack objetivo

- Next.js 14
- NestJS
- PostgreSQL
- HAPI FHIR
- OAuth2

## Endpoints mock (8)

- `GET /api/v1/patients` — Pacientes
- `GET /api/v1/encounters` — Encuentros
- `POST /api/v1/observations` — Observación
- `POST /api/v1/conditions` — Condición
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4221
- Web dev: 3221
