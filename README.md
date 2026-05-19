# Proyectos Ecosystem

Mega-repo con dos ecosistemas de proyectos scaffold:

## 📍 [Proyectos_Latam/](./Proyectos_Latam/) — 6 proyectos LATAM

Monorepo con seis productos para audiencias de Latinoamérica, scaffolding completo con Next.js 14 + mock APIs + builds verificados.

| Proyecto | API | Web | Descripción |
|---|:---:|:---:|---|
| LatamaX | :4101 | :3000 | Red social estilo Twitter/X enfocada en LATAM |
| PayLat | :4102 | :3002 | Neobanco LATAM: cuentas, transferencias, QR, tarjetas |
| PinLat | :4103 | :3003 | Plataforma visual estilo Pinterest regional |
| TraduceLA | :4104 | :3004 | Traductor conversacional LATAM con dialectos |
| KickLatam | :4105 | :3005 | Streaming en vivo LATAM con chat y monetización |
| ViaLatin | :4106 | :3006 | Navegación comunitaria estilo Waze para LATAM |

Validación: `cd Proyectos_Latam && node validar_todo.mjs` → 6/6 verde.

## 📍 [Proyectos_Trend2026/](./Proyectos_Trend2026/) — 90 proyectos de tendencia 2026

Monorepo con 90 scaffolds (Next.js 14 + mock API genérico + dashboards), agrupados en 9 categorías:

| Categoría | Cantidad | Puertos API | Puertos Web |
|---|:---:|:---:|:---:|
| AI / GenAI | 10 | 4200-4209 | 3200-3209 |
| FinTech LATAM | 10 | 4210-4219 | 3210-3219 |
| HealthTech | 10 | 4220-4229 | 3220-3229 |
| ClimateTech | 10 | 4230-4239 | 3230-3239 |
| EdTech | 10 | 4240-4249 | 3240-3249 |
| DevTools / Infra | 10 | 4250-4259 | 3250-3259 |
| Web3 / Blockchain | 10 | 4260-4269 | 3260-3269 |
| IoT / Smart Cities | 10 | 4270-4279 | 3270-3279 |
| Creator Economy | 10 | 4280-4289 | 3280-3289 |

Cada proyecto incluye:
- 8 rutas mock REST (4 específicas + 4 utilitarias: metrics, notifications, search, batch)
- 8 páginas web: Dashboard, API Explorer, Analytics, Search, Console, Plan, Health, Settings
- Theme dark/light, API base configurable, historial de llamadas en localStorage

Validación: `cd Proyectos_Trend2026 && node validar_todo.mjs` → 90/90 verde.

## 🚀 Arranque rápido

```bash
# LATAM ecosystem
cd Proyectos_Latam
npm install
npm run dev            # alguna API mock
npm run dev:web        # alguna web

# Trend 2026 ecosystem
cd Proyectos_Trend2026
npm install
cd ragforge && npm run dev          # API mock en :4200
cd ragforge && npm run dev:web      # web en :3200
```

## 🛠️ Generadores

Los scaffolds están generados por scripts deterministas:

- [`generate_latam_projects.mjs`](./generate_latam_projects.mjs) — genera los 6 proyectos LATAM
- [`generate_trend2026_v2.mjs`](./generate_trend2026_v2.mjs) — genera los 90 proyectos Trend 2026 (con páginas extendidas)

Re-ejecutables: `node generate_<X>.mjs` regenera todo desde cero.

## 📦 Stack

- **Runtime:** Node.js 22 (vía nvm)
- **Frontend:** Next.js 14.2.1, React 18, Tailwind CSS 3.4, lucide-react
- **APIs mock:** Node HTTP puro, servidor genérico que sirve rutas declaradas en `packages/shared-types/src/manifest.mjs`
- **Workspaces:** npm workspaces aplanados, un único `npm install` por ecosistema

## ✅ Estado

- 6 LATAM web apps con UIs custom funcionales (composer, dashboard, masonry, traductor, player+chat, mapa)
- 90 Trend 2026 proyectos con UI genérico dinámico que consume cada API
- 96 mock APIs, todas pasan health + ruta inicial
- Builds Next.js verificados en muestras representativas

## 📁 Estructura

```
Proyectos_Ecosystem/
├── Proyectos_Latam/         # 6 proyectos LATAM con UI custom
│   ├── latamax/
│   ├── paylat/
│   ├── pinlat/
│   ├── traduceLA/
│   ├── kicklatam/
│   ├── vialatin/
│   ├── package.json         # workspaces aplanados
│   └── validar_todo.mjs
├── Proyectos_Trend2026/     # 90 proyectos generados
│   ├── ragforge/ ... mnemoai/
│   ├── openlatam/ ... payhub/
│   ├── telemedlat/ ... saludmarket/
│   ├── carbontrack/ ... esgreport/
│   ├── aulalat/ ... teachershub/
│   ├── flagship/ ... costmonitor/
│   ├── daolatam/ ... charitychain/
│   ├── citysense/ ... edificioiq/
│   ├── creadorpro/ ... rightsmanage/
│   ├── package.json
│   └── validar_todo.mjs
├── generate_latam_projects.mjs
├── generate_trend2026_v2.mjs
└── README.md (este archivo)
```
