# SnapDB

Postgres con branching estilo Git: snapshots instantáneos, branches por PR.

**Categoría:** DevTools / Infra

## Stack

- Next.js 14
- Postgres
- WAL
- S3
- Rust

## Módulos MVP

- branches
- snapshots
- restore
- permisos
- pricing

## Arranque

```bash
npm run dev       # Mock API en :4256
npm run dev:web   # Web dev en :3256
```

## Validar

```bash
npm test
```
