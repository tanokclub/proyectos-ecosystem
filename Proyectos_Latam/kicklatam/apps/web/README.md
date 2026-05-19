# @kicklatam/web

App web Next.js 14 (App Router) + Tailwind CSS para KickLATAM.

## Stack

- Next.js 14.2.1 (App Router, server components)
- React 18
- Tailwind CSS 3.4 (tema oscuro estilo Kick/Twitch con acento verde lima)
- lucide-react para iconos

## Requisitos

1. El mock gateway debe estar corriendo en `http://127.0.0.1:4105`.
   ```bash
   # desde la raiz del monorepo
   npm run dev --workspace=@kicklatam/gateway
   ```
2. Node 20+ (probado con Node 22 via nvm).

## Setup

Desde la raiz del monorepo:

```bash
npm install
npm run dev:web
# o
npm run dev --workspace=@kicklatam/web
```

La app abre en [http://localhost:3005](http://localhost:3005).

## Variables de entorno

- `NEXT_PUBLIC_API_BASE` (opcional, default `http://127.0.0.1:4105`).

## Rutas

| Ruta              | Tipo                | Endpoint mock consumido          |
| ----------------- | ------------------- | -------------------------------- |
| `/`               | server              | `GET /api/v1/streams`            |
| `/canal/[id]`     | server + chat client| `GET /api/v1/streams`, `GET /api/v1/chat/demo`, `POST /api/v1/chat/send` |
| `/categorias`     | server              | `GET /api/v1/categories`         |
| `/vod`            | server              | `GET /api/v1/vod`                |
| `/suscripciones`  | client form         | `POST /api/v1/subscriptions`     |

## Estructura

```
app/
  layout.tsx           # sidebar + topbar (search, notificaciones, suscribirse)
  page.tsx             # Explorar: grid de streams
  canal/[id]/page.tsx  # Player mock + chat
  categorias/page.tsx
  vod/page.tsx
  suscripciones/page.tsx
  globals.css
components/
  ChatPanel.tsx        # client component, envia mensajes al gateway
lib/
  api.ts               # helper apiGet / apiPost, tipos compartidos
```

## Notas

- Todas las paginas usan `dynamic = "force-dynamic"` para evitar caching en dev.
- El video player es un mock visual (gradient + badge LIVE). En el siguiente sprint se conectara con HLS/FFmpeg.
