# EdgeFn

Edge functions LATAM con cold starts <50ms y KV global.

**Categoría:** DevTools / Infra

## Stack

- Next.js 14
- V8 isolates
- PostgreSQL
- Cloudflare style
- Anycast

## Módulos MVP

- funciones
- KV store
- cron
- observability
- deploy CLI

## Arranque

```bash
npm run dev       # Mock API en :4257
npm run dev:web   # Web dev en :3257
```

## Validar

```bash
npm test
```
