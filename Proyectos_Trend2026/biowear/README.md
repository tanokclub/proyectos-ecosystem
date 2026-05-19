# BioWear

Biomarkers en tiempo real de wearables (HRV, SpO2, glucosa) con alertas.

**Categoría:** HealthTech

## Stack

- Next.js 14
- FastAPI
- TimescaleDB
- Kafka
- Anthropic

## Módulos MVP

- devices
- ingesta
- alertas
- tendencias
- sharing médico

## Arranque

```bash
npm run dev       # Mock API en :4228
npm run dev:web   # Web dev en :3228
```

## Validar

```bash
npm test
```
