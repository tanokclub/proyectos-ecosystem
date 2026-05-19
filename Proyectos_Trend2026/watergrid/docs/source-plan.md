# WaterGrid — Plan maestro

Gestión hídrica urbana: medición fugas, calidad, presión, alertas en tiempo real.

## Categoría

IoT / Smart Cities

## Módulos MVP

- sensores
- fugas
- calidad
- consumo
- alertas

## Stack objetivo

- Next.js 14
- FastAPI
- TimescaleDB
- MQTT
- GIS

## Endpoints mock (8)

- `GET /api/v1/sensors` — Sensores red
- `GET /api/v1/leaks` — Fugas detectadas
- `POST /api/v1/quality` — Reportar calidad
- `POST /api/v1/alerts/configure` — Configurar alerta
- `GET /api/v1/metrics` — Métricas del servicio
- `GET /api/v1/notifications` — Notificaciones del usuario
- `POST /api/v1/search` — Búsqueda global
- `POST /api/v1/batch` — Operación batch

## Puertos

- Mock API: 4272
- Web dev: 3272
