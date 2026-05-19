# BioWear — Plan maestro

Biomarkers en tiempo real de wearables (HRV, SpO2, glucosa) con alertas.

## Categoría

HealthTech

## Módulos MVP

- devices
- ingesta
- alertas
- tendencias
- sharing médico

## Stack objetivo

- Next.js 14
- FastAPI
- TimescaleDB
- Kafka
- Anthropic

## Endpoints mock (8)

- `GET /api/v1/devices` — Dispositivos
- `GET /api/v1/biomarkers/today` — Biomarkers
- `POST /api/v1/alerts` — Configurar alerta
- `POST /api/v1/share/doctor` — Share doctor
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4228
- Web dev: 3228
