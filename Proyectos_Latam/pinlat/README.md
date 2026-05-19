# PinLat

Plataforma visual inspirada en Pinterest con enfoque regional, social y comercial.

## Estado

Base inicial generada desde el plan maestro. Incluye estructura de monorepo, contratos compartidos y un servicio mock ejecutable para empezar la integracion tecnica.

## Modulos MVP cubiertos en esta base

- feed visual
- pins
- boards
- busqueda
- cuentas de negocio

## Stack objetivo

- Next.js 15
- Expo
- NestJS
- PostgreSQL
- Redis
- FastAPI

## Estructura creada

- `apps/api`: servicio base ejecutable.
- `packages/shared-types`: contratos y manifest compartidos.
- `docs/source-plan.md`: plan original aportado por el usuario.
- `docs/api-contracts.md`: resumen operativo de rutas mock.
- `scripts/validate.mjs`: smoke test local sin dependencias externas.

## Directorios reservados

- `apps/web`: Cliente web para feed visual, tableros y perfiles.
- `apps/mobile`: App mobile para explorar, guardar y publicar pins.
- `apps/admin`: Panel admin para moderacion, ads y soporte.
- `apps/ml-service`: Servicio de recomendaciones y ranking.
- `apps/browser-extension`: Extension para guardar pins desde el navegador.
- `packages/ui`: Biblioteca UI compartida para cards, grids y modales.
- `packages/database`: Prisma schema y seeds.
- `packages/utils`: Helpers de imagenes, SEO y formatos.

## Comandos utiles

```bash
npm test
npm run dev
```

## Siguientes pasos recomendados

- Implementar CRUD real de pins, boards y comments con Prisma.
- Crear ingestion de imagenes y worker de procesamiento.
- Desarrollar ranking y recomendaciones en el servicio ML.
- Agregar cuentas business y analitica para creadores.
