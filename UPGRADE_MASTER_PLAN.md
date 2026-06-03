# 🚀 Plan Maestro de Mejora — Ecosystem (96 proyectos)

> **Contexto:** mejora realizada SIN conexión a internet (datos móviles). No se descargó
> ninguna dependencia ni archivo grande. Todo el código lógico quedó implementado, revisado
> y verificado con Node puro. Las dependencias quedan **documentadas** para instalarlas de
> una sola vez apenas haya buena conexión.

## ✅ Qué se hizo hoy (offline, cero descargas)

### 1. Motor de API mock con estado real — `tools/mock-engine.mjs`
Reemplaza el antiguo "echo server" (que solo devolvía el ejemplo del manifest) por un
servicio REST **con estado en memoria**, sembrado automáticamente desde cada manifest.
Cero dependencias — solo Node stdlib. Capacidades:

| Capacidad | Detalle |
|---|---|
| CRUD real | `GET` lista · `GET /:id` · `POST` crea (id+timestamps) · `PUT/PATCH` actualiza · `DELETE` elimina |
| Query | `?limit` `?offset` `?q` (full-text) `?sort` `?order=asc\|desc` `?campo=valor` (filtro) |
| Resiliencia | `?_delay=ms` (latencia) · `?_fail=código` (forzar error) para probar el frontend |
| Observabilidad | `/health` `/manifest` `/_stats` `/metrics` (Prometheus) |
| Contrato | `/openapi.json` — **OpenAPI 3.0 autogenerado** desde el manifest |
| Seguridad | Auth opcional por API key (`API_KEY` en env → exige `x-api-key`/`Bearer`) |
| Persistencia | `PERSIST=1` vuelca el estado a `.mock-data.json` |
| Plataforma | CORS completo + preflight · `x-request-id` por respuesta |

### 2. Propagador offline — `tools/upgrade_ecosystem.mjs`
Recorre los 96 proyectos y, sin red:
- Copia el motor junto a cada `manifest.mjs`.
- Reescribe los 96 `server.mjs` para usar el motor con estado.
- Genera por proyecto: `docs/IMPLEMENTATION_PLAN.md`, `docs/ADVANCED_FEATURES.md`,
  `INSTALL_WHEN_ONLINE.md`.

Idempotente y re-ejecutable: `node tools/upgrade_ecosystem.mjs` (o `--dry` para simular).

### 3. Verificación
- `Proyectos_Latam` → **6/6 verde** (`node validar_todo.mjs`).
- `Proyectos_Trend2026` → **90/90 verde** (`node validar_todo.mjs`).
- Smoke-tests del motor: CRUD, filtros, búsqueda, paginación, OpenAPI, métricas, 404.

## 📦 Qué hacer apenas haya internet (una sola vez)

```bash
# Instala TODOS los workspaces de cada ecosistema de una sola pasada:
cd Proyectos_Latam      && npm install
cd ../Proyectos_Trend2026 && npm install
```

Las APIs mock ya funcionan HOY con Node puro (`node apps/api/src/server.mjs` /
`node services/api/src/server.mjs`). El `npm install` es solo para el frontend Next.js
y las fases de producción. Cada proyecto trae su `INSTALL_WHEN_ONLINE.md` con la tabla
de paquetes por fase.

## 🗺️ Roadmap por fases (idéntico para todos, adaptar por dominio)

| Fase | Objetivo | Paquetes a instalar |
|---|---|---|
| 0 ✅ | Mock stateful + OpenAPI + métricas | — (hecho, Node puro) |
| 1 | Persistencia real (PostgreSQL) | `prisma`, `@prisma/client` |
| 2 | Auth + RBAC + rate limit | `jose`, `bcryptjs`, `ioredis` |
| 3 | Tiempo real + colas | `ws`, `bullmq` |
| 4 | IA generativa | `@anthropic-ai/sdk` |
| 5 | Observabilidad + tests | `@opentelemetry/api`, `@playwright/test` |
| 6 | Despliegue | Docker (ver `infra/docker`) |

> Las dependencias NO se instalaron a propósito (conexión por datos). Añádelas por fase con
> `npm install <paquete> -w <workspace>`.

## 📁 Artefactos nuevos

```
tools/
├── mock-engine.mjs          # motor mock stateful (canónico, cero deps)
└── upgrade_ecosystem.mjs    # propagador offline idempotente

<cada proyecto>/
├── docs/IMPLEMENTATION_PLAN.md
├── docs/ADVANCED_FEATURES.md
├── INSTALL_WHEN_ONLINE.md
└── packages/.../mock-engine.mjs   # copia del motor usada por el server
```

## 🔁 Re-ejecutar / actualizar el motor
Si mejoras `tools/mock-engine.mjs`, propaga a los 96 proyectos con:
```bash
node tools/upgrade_ecosystem.mjs
cd Proyectos_Latam && node validar_todo.mjs
cd ../Proyectos_Trend2026 && node validar_todo.mjs
```
