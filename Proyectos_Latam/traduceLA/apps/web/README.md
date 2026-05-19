# @traduceLA/web

MVP web de **TraduceLA**: traductor conversacional para LATAM construido con Next.js 14 (App Router) + Tailwind 3.4.

## Stack

- Next.js `14.2.1` (App Router, RSC + Client Components)
- React 18
- TailwindCSS `3.4`
- `lucide-react` para iconos
- `clsx` + `tailwind-merge`
- TypeScript estricto

Puerto de desarrollo: **3004**. Mock API esperada en **http://127.0.0.1:4104**.

## Estructura

```
apps/web
├── app
│   ├── layout.tsx           # Layout global con sidebar (Inicio, Historial, Conversacion, Dialectos, Idiomas)
│   ├── page.tsx             # Traductor de texto (RSC prefetch de /languages + client component)
│   ├── conversacion/page.tsx # Modo conversacion bilingue tipo chat
│   ├── historial/page.tsx   # Historial de traducciones (RSC)
│   ├── dialectos/page.tsx   # Tarjetas de dialectos regionales (RSC)
│   ├── idiomas/page.tsx     # Lista agrupada de idiomas/variantes (RSC)
│   └── globals.css          # Tema claro con acentos teal
├── components
│   └── TextTranslator.tsx   # Cliente: selectores, swap, traduccion
├── lib
│   └── api.ts               # Cliente fetch contra http://127.0.0.1:4104
├── next.config.mjs
├── postcss.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

## Como correr

Desde la raiz del monorepo:

```bash
# 1) Instalar (una sola vez)
npm install

# 2) Levantar el mock API (puerto 4104)
npm run dev               # alias de @traduceLA/api

# 3) En otra terminal, levantar el frontend (puerto 3004)
npm run dev:web
```

Luego abre `http://127.0.0.1:3004`.

### Variables de entorno

| Variable               | Default                  | Descripcion                |
|------------------------|--------------------------|----------------------------|
| `NEXT_PUBLIC_API_BASE` | `http://127.0.0.1:4104`  | Base URL del mock API.     |

## Rutas mock consumidas

| Metodo | Ruta                              | Pagina               |
|--------|-----------------------------------|----------------------|
| GET    | `/api/v1/languages`               | `/`, `/conversacion`, `/idiomas` |
| GET    | `/api/v1/dialects`                | `/dialectos`         |
| GET    | `/api/v1/history`                 | `/historial`         |
| POST   | `/api/v1/translate/text`          | `/`, `/conversacion` |
| POST   | `/api/v1/translate/voice`         | (reservado) microfono mock en `/conversacion` |
| POST   | `/api/v1/conversation/session`    | `/conversacion`      |

## Notas de diseno

- Tema claro, fondo `#f8fafc`, acentos `teal-500/700`.
- Sidebar fija con iconos `lucide-react`: Home, History, MessageCircle, Mic, Languages.
- Burbujas tipo iMessage/Telegram (`bubble-a` blanca, `bubble-b` con gradiente teal).
- Traduccion siempre invocada en el cliente (necesita `useState` para feedback inmediato).
- Las paginas de listado (historial, dialectos, idiomas) son **React Server Components** que llaman al mock con `cache: "no-store"`.

## Pendientes

- Implementar Web Speech API real en `Mic` (hoy es solo decorativo).
- Persistir historial real (hoy lo devuelve el mock).
- Tests E2E con Playwright.
