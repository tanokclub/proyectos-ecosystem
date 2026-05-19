# @vialatin/web

Frontend MVP de **ViaLatin** (navegacion comunitaria estilo Waze para LATAM).
Construido con Next.js 14 (App Router) + Tailwind CSS 3.4 + lucide-react.

## Stack

- Next.js 14.2 + React 18
- Tailwind CSS 3.4 (tema azul-marino + acento amber)
- lucide-react para iconografia
- Consume el mock `services/api-gateway` (puerto 4106) via `lib/api.ts`

## Puertos

- Web: **3006**
- API mock (gateway): **4106**

## Comandos

Desde la raiz del monorepo:

```bash
# Instalar (una sola vez, no automatizado aqui)
npm install

# API mock (puerto 4106)
npm run dev

# Web (puerto 3006)
npm run dev:web
```

Tambien directamente:

```bash
cd apps/web && npm run dev
```

Luego abrir http://127.0.0.1:3006.

## Estructura

```
apps/web/
├── app/
│   ├── layout.tsx          Sidebar global (Mapa, Rutas, Incidentes, Trafico, Reportar)
│   ├── page.tsx            Mapa SVG mock + panel lateral de incidentes
│   ├── rutas/page.tsx      Planificador (POST /api/v1/routes/plan)
│   ├── incidentes/page.tsx Tabla con filtros (GET /api/v1/incidents)
│   ├── trafico/page.tsx    Cards por zona (GET /api/v1/traffic)
│   ├── reportar/page.tsx   Form de reportes (POST /api/v1/reports)
│   └── globals.css         Tema + utilidades (map-grid, pulse-dot)
├── lib/api.ts              Cliente del gateway (envelope desempaquetado)
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.mjs
└── tsconfig.json
```

## Notas de diseno

- El "mapa" es un SVG con calles troncales simuladas + dots de incidentes proyectados desde lat/lng al viewBox usando un bounding box de LATAM. No se usa Leaflet ni Mapbox para mantener el bundle ligero (Crostini sin GPU).
- Configurar `NEXT_PUBLIC_API_BASE` si el gateway no esta en `http://127.0.0.1:4106`.
