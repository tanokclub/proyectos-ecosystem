# Instalar cuando haya internet — KidsAcad

> Hoy NO se descargó nada (conexión por datos). Todo el código lógico está listo.
> Apenas tengas buena conexión, ejecuta estos pasos. **No requiere cambios de código.**

## 1. Instalar dependencias del monorepo
```bash
cd Proyectos_Trend2026
npm install            # instala todos los workspaces de una vez
```

## 2. Levantar este proyecto
```bash
# API mock con estado (ya funciona hoy con node puro):
node services/api/src/server.mjs

# Web (requiere deps instaladas):
cd apps/web && npm run dev
```

## 3. Dependencias previstas para producción (instalar según fase)
| Fase | Paquetes npm | Para qué |
|---|---|---|
| Persistencia | `prisma`, `@prisma/client` | ORM + PostgreSQL |
| Auth | `jose`, `bcryptjs` | JWT + hashing |
| Realtime | `ws` | WebSockets |
| Cache/colas | `ioredis`, `bullmq` | Redis + jobs |
| IA | `@anthropic-ai/sdk` | Claude API |
| Tests | `@playwright/test` | E2E |
| Observabilidad | `@opentelemetry/api` | traces/metrics |

> Estas dependencias están listadas pero **no instaladas** a propósito.
> Añádelas con `npm install <paquete> -w <workspace>` cuando ejecutes cada fase.

## 4. Verificación
```bash
cd Proyectos_Trend2026 && node validar_todo.mjs   # debe dar verde
```
