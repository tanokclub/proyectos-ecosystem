# @pinlat/web

Frontend web de **PinLat** (clon Pinterest LATAM) en Next.js 14 + Tailwind CSS.

## Stack

- Next.js 14.2 (App Router, server components por defecto)
- React 18
- Tailwind CSS 3.4 (paleta calida custom: `cream`, `sand`, `terracota`, `maiz`, etc.)
- lucide-react para iconos
- Sin imagenes reales todavia: cada pin usa un gradiente Tailwind como placeholder visual.

## Estructura

```
apps/web/
  app/
    layout.tsx        # header sticky con search + iconos (Search, Bell, MessageCircle, User)
    page.tsx          # feed masonry con CSS columns + pin destacado
    boards/page.tsx   # grid de tableros
    crear/page.tsx    # form client component que POSTea a /api/v1/pins
    explorar/page.tsx # chips y mosaico de categorias
    globals.css
  lib/
    api.ts            # helper fetch + paletteToGradient + pseudoHeight
  package.json
  next.config.mjs
  tailwind.config.mjs
  postcss.config.mjs
  tsconfig.json
```

## Como correrlo (despues de instalar deps)

Desde la raiz del monorepo:

```bash
# 1. Instalar dependencias (cuando el usuario lo decida)
npm install

# 2. Arrancar el mock API en :4103
npm run dev

# 3. En otra terminal, arrancar el web en :3003
npm run dev:web
```

Visitar [http://localhost:3003](http://localhost:3003).

## Conexion al mock API

`lib/api.ts` apunta por defecto a `http://127.0.0.1:4103` (`NEXT_PUBLIC_PINLAT_API_URL`
sobrescribe la URL). El server mock envuelve cada respuesta en
`{ project, route, summary, received, response }`, por eso `apiData()` extrae el
campo `response` antes de devolver el payload al UI.

## Rutas consumidas

| Ruta                       | Vista                  |
|----------------------------|------------------------|
| `GET /api/v1/feed`         | `/` feed masonry       |
| `GET /api/v1/pin/featured` | hero del feed          |
| `GET /api/v1/boards`       | `/boards`              |
| `GET /api/v1/categories`   | `/explorar`            |
| `POST /api/v1/pins`        | `/crear` (form submit) |
