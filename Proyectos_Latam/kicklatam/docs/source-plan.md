# 🎮 KICK LATAM — Clon Completo de Kick.com para Latinoamérica

## Plan Maestro de Desarrollo con 3 Agentes IA

**Proyecto:** KickLATAM — Plataforma de Streaming en Vivo  
**Fecha:** Febrero 2026  
**Metodología:** Desarrollo paralelo con 3 agentes IA autónomos + Orquestador  
**Repositorio:** GitHub Monorepo con ramas por agente  

---

## 📐 ARQUITECTURA GENERAL DEL SISTEMA

```
┌─────────────────────────────────────────────────────────────────┐
│                        KICKLATAM STACK                          │
├─────────────────────────────────────────────────────────────────┤
│  FRONTEND (Next.js 14 + React 18 + TypeScript + TailwindCSS)   │
│  ├── Landing / Home / Discover                                  │
│  ├── Player de Video (HLS.js + DASH fallback)                   │
│  ├── Chat en Tiempo Real (WebSocket)                            │
│  ├── Dashboard Streamer                                         │
│  ├── Panel de Administración                                    │
│  └── App Móvil (React Native / Expo)                            │
├─────────────────────────────────────────────────────────────────┤
│  API GATEWAY (Kong / Nginx + Rate Limiting)                     │
├─────────────────────────────────────────────────────────────────┤
│  BACKEND MICROSERVICIOS (Node.js / NestJS + TypeScript)         │
│  ├── Auth Service (JWT + OAuth2 + 2FA)                          │
│  ├── User Service (Perfiles, Seguidores, Suscripciones)         │
│  ├── Stream Service (Ingest RTMP, Transcoding, HLS)             │
│  ├── Chat Service (WebSocket + Redis Pub/Sub)                   │
│  ├── Notification Service (Push, Email, In-App)                 │
│  ├── Payment Service (Stripe + MercadoPago + PayPal)            │
│  ├── Moderation Service (AutoMod + Reports)                     │
│  ├── VOD Service (Clips, Replays, Highlights)                   │
│  ├── Analytics Service (Viewers, Revenue, Growth)               │
│  ├── Search Service (Elasticsearch)                             │
│  └── CDN / Media Service (Almacenamiento + Distribución)        │
├─────────────────────────────────────────────────────────────────┤
│  INFRAESTRUCTURA                                                │
│  ├── PostgreSQL (datos principales)                             │
│  ├── Redis (caché, sesiones, pub/sub chat)                      │
│  ├── MongoDB (analytics, logs)                                  │
│  ├── Elasticsearch (búsqueda)                                   │
│  ├── RabbitMQ / NATS (mensajería entre servicios)               │
│  ├── MinIO / S3 (almacenamiento objetos)                        │
│  ├── Nginx-RTMP / MediaMTX (ingest de streams)                  │
│  ├── FFmpeg (transcoding)                                       │
│  └── Docker + Kubernetes (orquestación)                         │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🏗️ ESTRATEGIA DE GITHUB Y RAMAS

### Estructura del Monorepo

```
kicklatam/
├── apps/
│   ├── web/                  # Frontend Next.js (AGENTE 1)
│   ├── mobile/               # React Native (AGENTE 1)
│   └── admin/                # Panel Admin (AGENTE 1)
├── services/
│   ├── auth/                 # Auth microservice (AGENTE 2)
│   ├── users/                # Users microservice (AGENTE 2)
│   ├── streams/              # Streaming microservice (AGENTE 2)
│   ├── chat/                 # Chat microservice (AGENTE 2)
│   ├── payments/             # Payments microservice (AGENTE 3)
│   ├── notifications/        # Notifications (AGENTE 3)
│   ├── moderation/           # Moderation (AGENTE 3)
│   ├── vod/                  # VOD / Clips (AGENTE 3)
│   ├── analytics/            # Analytics (AGENTE 3)
│   ├── search/               # Search (AGENTE 3)
│   └── gateway/              # API Gateway (AGENTE 2)
├── packages/
│   ├── shared-types/         # TypeScript types compartidos (AGENTE 2)
│   ├── shared-utils/         # Utilidades compartidas (AGENTE 2)
│   ├── ui-components/        # Librería UI (AGENTE 1)
│   └── database/             # Prisma schemas + migrations (AGENTE 2)
├── infrastructure/
│   ├── docker/               # Dockerfiles (AGENTE 3)
│   ├── k8s/                  # Kubernetes manifests (AGENTE 3)
│   ├── terraform/            # IaC (AGENTE 3)
│   ├── nginx/                # Nginx configs (AGENTE 3)
│   └── scripts/              # Deploy scripts (AGENTE 3)
├── docs/                     # Documentación (ORQUESTADOR)
├── tests/
│   ├── e2e/                  # Tests E2E (ORQUESTADOR)
│   ├── integration/          # Tests integración (ORQUESTADOR)
│   └── load/                 # Tests carga (ORQUESTADOR)
├── docker-compose.yml
├── turbo.json                # Turborepo config
├── package.json
└── README.md
```

### Estrategia de Ramas

```
main                          ← Producción (solo merge del Orquestador)
  │
  ├── develop                 ← Integración (el Orquestador merge aquí)
  │     │
  │     ├── agent1/frontend-core
  │     ├── agent1/streaming-player
  │     ├── agent1/chat-ui
  │     ├── agent1/dashboard-streamer
  │     ├── agent1/mobile-app
  │     ├── agent1/admin-panel
  │     │
  │     ├── agent2/auth-service
  │     ├── agent2/user-service
  │     ├── agent2/stream-service
  │     ├── agent2/chat-service
  │     ├── agent2/gateway
  │     ├── agent2/database-schemas
  │     │
  │     ├── agent3/payments-service
  │     ├── agent3/notifications
  │     ├── agent3/moderation
  │     ├── agent3/vod-clips
  │     ├── agent3/analytics
  │     ├── agent3/infrastructure
  │     └── agent3/search-service
  │
  └── hotfix/*                ← Fixes urgentes
```

### Reglas de Merge

1. Cada agente trabaja SOLO en sus ramas `agent{N}/*`
2. Pull Requests van a `develop` — el **Orquestador** revisa y aprueba
3. Solo el **Orquestador** puede hacer merge a `main`
4. Cada PR requiere: tests pasando, lint clean, build exitoso
5. Los agentes hacen `git pull develop` antes de cada nueva tarea para sincronizar

---

## 🧠 ROLES INTERNOS DEL SISTEMA

### 🔴 ORQUESTADOR (Rol Superior — Tú / Un 4to agente supervisor)

**Nombre clave:** `ARCHITECT`  
**Responsabilidades:**

- Define contratos de API (OpenAPI specs) ANTES de que los agentes comiencen
- Publica interfaces TypeScript compartidas en `packages/shared-types`
- Revisa PRs de los 3 agentes, valida calidad, aprueba o rechaza
- Hace merge de `develop` → `main`
- Crea issues de seguimiento cuando detecta problemas
- Ejecuta tests de integración entre servicios
- Ejecuta tests E2E del flujo completo
- Monitorea progreso y reasigna tareas si un agente se atrasa
- Mantiene documentación de arquitectura actualizada
- Define variables de entorno y configuración compartida

**Entregable inicial del Orquestador (ANTES de que los agentes empiecen):**

```
1. ✅ Crear repo GitHub con estructura de monorepo
2. ✅ Configurar Turborepo + pnpm workspaces
3. ✅ Crear package shared-types con TODAS las interfaces TypeScript
4. ✅ Crear OpenAPI spec para CADA microservicio
5. ✅ Crear docker-compose.yml base con todos los servicios de infra
6. ✅ Crear .env.example con todas las variables
7. ✅ Configurar ESLint + Prettier + Husky + lint-staged
8. ✅ Crear CI/CD pipeline base (GitHub Actions)
9. ✅ Documentar convenciones de código y naming
```

### 🟢 VALIDADOR (Rol QA — Puede ser el Orquestador o un agente dedicado)

**Nombre clave:** `QA_LEAD`  
**Responsabilidades:**

- Ejecuta cada entregable contra criterios de aceptación
- Valida que los servicios expongan los endpoints documentados
- Prueba flujos end-to-end entre frontend y backend
- Valida rendimiento (< 200ms respuesta API, < 3s carga página)
- Verifica seguridad (SQL injection, XSS, CSRF, auth bypass)
- Certifica cada módulo con: ✅ APROBADO / ❌ RECHAZADO + motivo
- Genera reporte de bugs y los asigna al agente correspondiente
- Ejecuta tests de carga con k6 o Artillery

---

## 🤖 ASIGNACIÓN DE AGENTES

---

# ═══════════════════════════════════════════════════════════════
# AGENTE 1 — CODEX (OpenAI)
# ROL: FRONTEND ENGINEER SENIOR + UI/UX + MOBILE
# ═══════════════════════════════════════════════════════════════

## Perfil del Agente 1

- **Herramienta:** Codex (OpenAI)
- **Especialidad:** Frontend, UI/UX, React, Next.js, React Native
- **Ramas:** `agent1/*`
- **Directorios:** `apps/web`, `apps/mobile`, `apps/admin`, `packages/ui-components`

## Instrucciones Globales para Agente 1

```
Eres un Senior Frontend Engineer especializado en plataformas de streaming.
Tu stack principal es Next.js 14 (App Router), React 18, TypeScript strict,
TailwindCSS, Zustand (state management), y React Query (server state).

REGLAS:
- TypeScript strict mode siempre, zero `any`
- Componentes funcionales con hooks, zero class components
- Server Components por defecto, Client Components solo cuando se necesite interactividad
- Todas las páginas deben ser responsive (mobile-first)
- Accesibilidad WCAG 2.1 AA mínimo
- Soporte para idiomas: Español (default), Portugués, Inglés
- Dark mode por defecto (como Kick), con opción de light mode
- Animations con Framer Motion
- Testing con Vitest + React Testing Library + Playwright (E2E)
- Los tipos compartidos están en @kicklatam/shared-types — impórtalos siempre
- Conecta a la API usando las specs OpenAPI que te proporcionará el Orquestador
- Si un endpoint del backend aún no existe, mockéalo con MSW (Mock Service Worker)

CONVENCIONES DE ARCHIVOS:
- Components: PascalCase (StreamCard.tsx)
- Hooks: camelCase con prefijo use (useStreamData.ts)
- Utils: camelCase (formatDate.ts)
- Types: PascalCase con sufijo .types.ts (Stream.types.ts)
- Styles: mismo nombre que componente .module.css solo si TailwindCSS no alcanza
```

---

## BACKLOG COMPLETO — AGENTE 1

### SPRINT 0: Setup y Fundamentos (Día 1)

#### T1-001: Inicializar proyecto Next.js 14
**Rama:** `agent1/frontend-core`  
**Prioridad:** CRÍTICA  
**Dependencias:** Ninguna  
**Criterios de aceptación:**
- [ ] Next.js 14 con App Router configurado
- [ ] TypeScript strict mode
- [ ] TailwindCSS configurado con tema oscuro custom (colores Kick-like: #0F0F0F fondo, #53FC18 accent green, #FF6B00 accent orange)
- [ ] Fuentes: Inter (body), JetBrains Mono (código)
- [ ] `next.config.js` con optimizaciones de imagen, i18n (es, pt, en)
- [ ] Layout root con providers (QueryClient, ThemeProvider, AuthProvider, i18n)
- [ ] ESLint + Prettier configurado
- [ ] Path aliases (@/components, @/hooks, @/lib, etc.)
- [ ] Middleware de autenticación base
- [ ] `.env.local.example` con todas las variables del frontend

**Archivos a crear:**
```
apps/web/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── providers.tsx
│   └── middleware.ts
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
├── package.json
└── .env.local.example
```

#### T1-002: Crear Design System / UI Library
**Rama:** `agent1/frontend-core`  
**Prioridad:** CRÍTICA  
**Dependencias:** T1-001  
**Criterios de aceptación:**
- [ ] Package `@kicklatam/ui-components` en `packages/ui-components`
- [ ] Componentes atómicos: Button, Input, Select, Textarea, Badge, Avatar, Tooltip, Modal, Dropdown, Toast, Spinner, Switch, Checkbox, Radio, Tabs, Skeleton
- [ ] Variantes para cada componente (size: sm/md/lg, variant: primary/secondary/ghost/danger)
- [ ] Todos los componentes con dark mode nativo
- [ ] Todos con TypeScript props tipadas + JSDoc
- [ ] Storybook configurado con todas las variantes
- [ ] Animaciones suaves (Framer Motion) en hover, focus, click
- [ ] Exportados desde index.ts del package

**Componentes completos a implementar:**
```typescript
// Button.tsx
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size: 'xs' | 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
}

// Modal.tsx
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size: 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen';
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
}

// Toast system con provider global
// Dropdown con posicionamiento inteligente (floating-ui)
// Avatar con status indicator (online/offline/away)
// Badge con colores semánticos + pulse animation para live
```

#### T1-003: Layout Principal y Navegación
**Rama:** `agent1/frontend-core`  
**Prioridad:** CRÍTICA  
**Dependencias:** T1-002  
**Criterios de aceptación:**
- [ ] Sidebar izquierdo colapsable (canales seguidos, categorías, recomendados)
- [ ] Header con: logo, barra de búsqueda, botón "Go Live", notificaciones, avatar usuario
- [ ] Sidebar muestra: canales live seguidos con viewer count, categorías populares
- [ ] Mini-player cuando navegas fuera de un stream
- [ ] Responsive: sidebar se convierte en drawer en mobile
- [ ] Skeleton loaders mientras carga
- [ ] Keyboard shortcuts (/ para buscar, Esc para cerrar modales)

### SPRINT 1: Home y Descubrimiento (Día 2-3)

#### T1-004: Página Home / Discover
**Rama:** `agent1/frontend-core`  
**Prioridad:** ALTA  
**Dependencias:** T1-003  
**Criterios de aceptación:**
- [ ] Hero section con stream destacado (auto-preview de video sin sonido al hover)
- [ ] Carrusel "En vivo ahora" con StreamCards
- [ ] Grid de categorías populares con thumbnails
- [ ] Sección "Streams recomendados para ti" (basado en historial)
- [ ] Sección "Clips populares" con autoplay al hover
- [ ] Sección "Canales que podrían gustarte"
- [ ] Infinite scroll para cargar más contenido
- [ ] Pull-to-refresh en mobile
- [ ] SEO: meta tags, Open Graph, JSON-LD structured data
- [ ] Filtros: idioma, categoría, viewer count

**Componentes a crear:**
```
StreamCard.tsx        - Tarjeta de stream con preview, avatar, título, viewers, categoría
CategoryCard.tsx      - Tarjeta de categoría con imagen y count de live streams
ClipCard.tsx          - Tarjeta de clip con autoplay hover
StreamCarousel.tsx    - Carrusel horizontal scrollable
FeaturedStream.tsx    - Hero con video preview
FilterBar.tsx         - Barra de filtros
```

#### T1-005: Página de Categoría / Browse
**Rama:** `agent1/frontend-core`  
**Prioridad:** ALTA  
**Dependencias:** T1-004  
**Criterios de aceptación:**
- [ ] Grid de streams filtrados por categoría
- [ ] Header de categoría con imagen, nombre, descripción, tags, viewer count
- [ ] Filtros: idioma, tags, sort (viewers, recently started, recommended)
- [ ] Infinite scroll
- [ ] URL state sync (filtros en query params)

#### T1-006: Búsqueda Global
**Rama:** `agent1/frontend-core`  
**Prioridad:** ALTA  
**Dependencias:** T1-004  
**Criterios de aceptación:**
- [ ] Search bar con autosuggest/autocomplete
- [ ] Resultados categorizados: Canales, Categorías, VODs, Clips
- [ ] Búsqueda en tiempo real (debounced 300ms)
- [ ] Historial de búsquedas recientes (localStorage)
- [ ] Página de resultados completa con tabs

### SPRINT 2: Streaming Player (Día 3-5)

#### T1-007: Video Player Completo
**Rama:** `agent1/streaming-player`  
**Prioridad:** CRÍTICA  
**Dependencias:** T1-003  
**Criterios de aceptación:**
- [ ] Player HLS.js para reproducción de streams en vivo
- [ ] Controles custom: play/pause, volumen, calidad, fullscreen, picture-in-picture, theater mode
- [ ] Selector de calidad: Auto, 1080p, 720p, 480p, 360p, 160p
- [ ] Latency modes: Low Latency, Normal
- [ ] Indicador "LIVE" con pulso rojo
- [ ] Viewer count en tiempo real
- [ ] Stream info overlay: título, categoría, streamer, tags
- [ ] Clip creation button (marca inicio/fin)
- [ ] Theater mode (player expandido, chat al lado)
- [ ] Fullscreen con chat overlay
- [ ] Mini-player flotante (drag-and-drop, resize)
- [ ] Keyboard shortcuts: F (fullscreen), M (mute), Space (pause)
- [ ] Soporte para stream offline: mostrar VOD más reciente o pantalla offline
- [ ] Animated transitions entre modos (normal → theater → fullscreen)
- [ ] Stats overlay (opcional): bitrate, latency, fps, codec

**Archivos:**
```
components/player/
├── VideoPlayer.tsx           # Container principal
├── PlayerControls.tsx        # Barra de controles
├── QualitySelector.tsx       # Dropdown de calidad
├── VolumeControl.tsx         # Slider de volumen
├── MiniPlayer.tsx            # PiP flotante
├── TheaterMode.tsx           # Layout theater
├── StreamInfo.tsx            # Overlay de info
├── ClipCreator.tsx           # UI para crear clips
├── PlayerStats.tsx           # Stats overlay
├── hooks/
│   ├── useHlsPlayer.ts      # Hook para HLS.js
│   ├── usePlayerControls.ts # Hook para controles
│   └── usePlayerShortcuts.ts# Keyboard shortcuts
└── player.types.ts
```

#### T1-008: Página de Canal / Stream
**Rama:** `agent1/streaming-player`  
**Prioridad:** CRÍTICA  
**Dependencias:** T1-007  
**Criterios de aceptación:**
- [ ] Layout: Player (izquierda) + Chat (derecha)
- [ ] Debajo del player: info del streamer, descripción, schedule
- [ ] Tabs debajo: About, Schedule, VODs, Clips, Chatroom Rules
- [ ] Botón Follow / Subscribe con animación
- [ ] Gift/Donate button
- [ ] Share button (copiar link, compartir en redes)
- [ ] Report button
- [ ] Banner y avatar del canal personalizable
- [ ] Panel de info del streamer (links sociales, bio)
- [ ] Lista de moderadores del chat
- [ ] Hosts / Raids indicator
- [ ] Stream uptime counter

### SPRINT 3: Chat en Vivo (Día 5-7)

#### T1-009: Chat UI Completo
**Rama:** `agent1/chat-ui`  
**Prioridad:** CRÍTICA  
**Dependencias:** T1-008  
**Criterios de aceptación:**
- [ ] Chat window con mensajes en tiempo real (WebSocket)
- [ ] Input de mensaje con emote picker
- [ ] Emotes: emotes globales + emotes del canal + emotes de suscriptor
- [ ] Emote picker con búsqueda y categorías
- [ ] @mentions con autocomplete de usuarios
- [ ] /commands support (/me, /ban, /timeout, /clear, /slow, /emoteonly)
- [ ] Badges de usuario: broadcaster, moderator, vip, subscriber (tier 1/2/3), verified
- [ ] Colores de nombre personalizables
- [ ] Slow mode indicator
- [ ] Emote-only mode indicator
- [ ] Followers-only mode indicator
- [ ] Sub-only mode indicator
- [ ] Mensaje de sistema (joins, raids, gifted subs)
- [ ] Pinned messages
- [ ] Chat pausing cuando scroll up
- [ ] "Resume" button para volver al bottom
- [ ] Timestamps opcionales
- [ ] Chat rules popup
- [ ] User card popup al click en nombre (follow, block, report, mod actions)
- [ ] Highlight de mensajes mencionándote
- [ ] Autolinks en URLs
- [ ] Smooth scroll animation
- [ ] Chat history (últimos 500 mensajes en buffer)

**Archivos:**
```
components/chat/
├── ChatWindow.tsx            # Container del chat
├── ChatMessage.tsx           # Un mensaje individual
├── ChatInput.tsx             # Input + enviar
├── EmotePicker.tsx           # Picker de emotes
├── UserBadge.tsx             # Badge del usuario
├── UserCard.tsx              # Card popup de usuario
├── MentionAutocomplete.tsx   # @mention autocomplete
├── PinnedMessage.tsx         # Mensaje fijado
├── ChatModeIndicator.tsx     # Indicadores de modo
├── SystemMessage.tsx         # Mensaje de sistema
├── hooks/
│   ├── useChatSocket.ts      # WebSocket connection
│   ├── useChatMessages.ts    # Message state management
│   ├── useEmotes.ts          # Emote loading/parsing
│   └── useChatCommands.ts    # Command handling
└── chat.types.ts
```

#### T1-010: Polls, Predictions y Chat Games
**Rama:** `agent1/chat-ui`  
**Prioridad:** MEDIA  
**Dependencias:** T1-009  
**Criterios de aceptación:**
- [ ] UI para crear/votar en Polls (encuestas con timer)
- [ ] UI para Predictions (apostar channel points)
- [ ] Resultados animados
- [ ] Progress bars de votación en tiempo real
- [ ] Chat overlay para mostrar poll/prediction activa

### SPRINT 4: Perfiles y Social (Día 7-9)

#### T1-011: Perfil de Usuario
**Rama:** `agent1/frontend-core`  
**Prioridad:** ALTA  
**Dependencias:** T1-003  
**Criterios de aceptación:**
- [ ] Página de perfil público: banner, avatar, bio, estadísticas
- [ ] Tabs: VODs, Clips, Following, About
- [ ] Follow / Subscribe buttons
- [ ] Estadísticas: followers, following, total views
- [ ] Links sociales (Twitter, Instagram, YouTube, TikTok, Discord)
- [ ] Últimos clips
- [ ] Últimos VODs
- [ ] Schedule de streaming

#### T1-012: Settings de Usuario
**Rama:** `agent1/frontend-core`  
**Prioridad:** ALTA  
**Dependencias:** T1-011  
**Criterios de aceptación:**
- [ ] Secciones: Profile, Account, Security, Notifications, Billing, Privacy
- [ ] Profile: editar avatar, banner, bio, display name, color de nombre
- [ ] Account: cambiar email, username
- [ ] Security: cambiar password, activar/desactivar 2FA, sesiones activas
- [ ] Notifications: toggles por tipo (email, push, in-app)
- [ ] Billing: ver suscripciones, historial de pagos, método de pago
- [ ] Privacy: bloquear usuarios, whispers on/off

#### T1-013: Autenticación UI
**Rama:** `agent1/frontend-core`  
**Prioridad:** CRÍTICA  
**Dependencias:** T1-002  
**Criterios de aceptación:**
- [ ] Modal de Login (email + password)
- [ ] Modal de Registro (username, email, password, fecha nacimiento, país LATAM)
- [ ] Botones OAuth: Google, Discord, Apple, Facebook
- [ ] Pantalla de 2FA (input código TOTP)
- [ ] Forgot password flow
- [ ] Email verification flow
- [ ] Remember me checkbox
- [ ] Form validation con Zod
- [ ] Error handling elegante

### SPRINT 5: Dashboard del Streamer (Día 9-12)

#### T1-014: Dashboard Overview
**Rama:** `agent1/dashboard-streamer`  
**Prioridad:** ALTA  
**Dependencias:** T1-003  
**Criterios de aceptación:**
- [ ] Layout dedicado para dashboard (sidebar diferente)
- [ ] Overview: stats rápidas (viewers actuales, followers hoy, subs, revenue)
- [ ] Gráficas: viewers over time, new followers, sub growth
- [ ] Quick actions: Go Live, Edit Stream Info, Recent Activity
- [ ] Stream key management (mostrar/ocultar/regenerar)

#### T1-015: Stream Manager
**Rama:** `agent1/dashboard-streamer`  
**Prioridad:** ALTA  
**Dependencias:** T1-014  
**Criterios de aceptación:**
- [ ] Editar título, categoría, tags, idioma del stream
- [ ] Preview del stream en vivo (mini player)
- [ ] Chat moderation panel
- [ ] Quick clip creation
- [ ] Go Live / End Stream buttons
- [ ] Stream health indicators (bitrate, fps, dropped frames)
- [ ] Configuración de latencia
- [ ] Notification a followers al ir live

#### T1-016: Channel Settings (Streamer)
**Rama:** `agent1/dashboard-streamer`  
**Prioridad:** MEDIA  
**Dependencias:** T1-014  
**Criterios de aceptación:**
- [ ] Personalización del canal: banner, avatar, bio, links
- [ ] Chat settings: slow mode, emote-only, follower-only, sub-only
- [ ] Emotes management: subir, editar, eliminar emotes del canal
- [ ] Badges custom para subs
- [ ] Moderators management (add/remove)
- [ ] VIP management (add/remove)
- [ ] Blocked terms/words list
- [ ] AutoMod sensitivity settings
- [ ] Raid settings (allow/block)
- [ ] Schedule editor (calendario visual)
- [ ] Channel points / rewards config

#### T1-017: Analytics Dashboard
**Rama:** `agent1/dashboard-streamer`  
**Prioridad:** MEDIA  
**Dependencias:** T1-014  
**Criterios de aceptación:**
- [ ] Gráficas con Recharts: viewers, followers, subs, revenue over time
- [ ] Date range picker
- [ ] Breakdown por stream session
- [ ] Top clips, top VODs
- [ ] Chat activity metrics
- [ ] Audience demographics (país, dispositivo, idioma)
- [ ] Export a CSV

#### T1-018: VOD & Clips Manager
**Rama:** `agent1/dashboard-streamer`  
**Prioridad:** MEDIA  
**Dependencias:** T1-014  
**Criterios de aceptación:**
- [ ] Lista de VODs con thumbnail, duración, fecha, views
- [ ] Editar título, descripción, thumbnail de VOD
- [ ] Eliminar VOD
- [ ] Lista de clips similiar
- [ ] Download VOD/clip
- [ ] Publicar/despublicar

### SPRINT 6: VOD Player y Clips (Día 12-14)

#### T1-019: VOD Player
**Rama:** `agent1/streaming-player`  
**Prioridad:** ALTA  
**Dependencias:** T1-007  
**Criterios de aceptación:**
- [ ] Player para video on-demand con seek bar
- [ ] Chapters/timestamps clickables
- [ ] Speed control (0.25x - 2x)
- [ ] Chat replay sincronizado con video
- [ ] Clip creation from VOD
- [ ] Continue watching (remember position)
- [ ] Keyboard shortcuts: ← → (seek), J K L (seek/pause)

#### T1-020: Clips Viewer
**Rama:** `agent1/streaming-player`  
**Prioridad:** MEDIA  
**Dependencias:** T1-007  
**Criterios de aceptación:**
- [ ] Player para clips (loop, share)
- [ ] Info: quien creó el clip, del stream de quién, fecha
- [ ] Clips related sidebar
- [ ] Share to social media
- [ ] Download clip button

### SPRINT 7: Mobile App (Día 14-18)

#### T1-021: App Mobile Base (React Native / Expo)
**Rama:** `agent1/mobile-app`  
**Prioridad:** ALTA  
**Dependencias:** T1-013  
**Criterios de aceptación:**
- [ ] Expo project setup con TypeScript
- [ ] Navigation con React Navigation (tab + stack)
- [ ] Auth screens (login, register, forgot password)
- [ ] Theme system (dark mode default)
- [ ] Componentes base reutilizables
- [ ] Push notifications setup (Expo Notifications)
- [ ] Deep linking

#### T1-022: Home, Browse, Search Mobile
**Rama:** `agent1/mobile-app`  
**Prioridad:** ALTA  
**Dependencias:** T1-021  
**Criterios de aceptación:**
- [ ] Tab Home: featured stream, live streams, categories
- [ ] Tab Browse: grid de categorías, filtros
- [ ] Tab Search: búsqueda con resultados
- [ ] Pull-to-refresh en todas las pantallas
- [ ] Infinite scroll

#### T1-023: Mobile Stream Viewer + Chat
**Rama:** `agent1/mobile-app`  
**Prioridad:** CRÍTICA  
**Dependencias:** T1-021  
**Criterios de aceptación:**
- [ ] Video player fullscreen (landscape)
- [ ] Chat overlay/drawer
- [ ] Portrait mode con player arriba y chat abajo
- [ ] Picture-in-Picture (PiP) nativo
- [ ] Quality selector
- [ ] Stream info sheet (bottom sheet)
- [ ] Follow/Subscribe from stream
- [ ] Swipe gestures

#### T1-024: Mobile Profile & Settings
**Rama:** `agent1/mobile-app`  
**Prioridad:** MEDIA  
**Dependencias:** T1-021  
**Criterios de aceptación:**
- [ ] Profile tab con info del usuario
- [ ] Following list
- [ ] Settings screens
- [ ] Edit profile
- [ ] Notifications center

### SPRINT 8: Admin Panel (Día 18-20)

#### T1-025: Panel de Administración
**Rama:** `agent1/admin-panel`  
**Prioridad:** ALTA  
**Dependencias:** T1-002  
**Criterios de aceptación:**
- [ ] Login separado para admins
- [ ] Dashboard: KPIs (total users, active streams, revenue, signups today)
- [ ] User management: search, view, ban, unban, edit roles
- [ ] Stream management: view all live, force end, feature/unfeature
- [ ] Reports management: view reports, take action, escalate
- [ ] Category management: CRUD categorías
- [ ] Emote management: approve/reject global emotes
- [ ] Moderation logs
- [ ] Revenue reports
- [ ] System health dashboard (server status, error rates)
- [ ] Global announcements
- [ ] Feature flags management

---

# ═══════════════════════════════════════════════════════════════
# AGENTE 2 — CLAUDE CODE (Anthropic)
# ROL: BACKEND CORE ENGINEER + DATABASE ARCHITECT + API DESIGN
# ═══════════════════════════════════════════════════════════════

## Perfil del Agente 2

- **Herramienta:** Claude Code (Anthropic)
- **Especialidad:** Backend, APIs, Databases, Real-time systems, Auth
- **Ramas:** `agent2/*`
- **Directorios:** `services/auth`, `services/users`, `services/streams`, `services/chat`, `services/gateway`, `packages/shared-types`, `packages/shared-utils`, `packages/database`

## Instrucciones Globales para Agente 2

```
Eres un Senior Backend Engineer especializado en sistemas de streaming a escala.
Tu stack principal es NestJS (Node.js), TypeScript strict, Prisma ORM,
PostgreSQL, Redis, WebSockets, y microservicios con mensajería NATS.

REGLAS:
- TypeScript strict, zero `any`
- NestJS con decoradores, Guards, Interceptors, Pipes
- Prisma ORM para PostgreSQL (schema en packages/database)
- Redis para caché, sesiones, pub/sub
- NATS para comunicación entre microservicios
- JWT + Refresh tokens para auth
- Rate limiting en todos los endpoints
- Input validation con class-validator + class-transformer
- Error handling estandarizado (HttpException con códigos custom)
- Logging con Pino (structured JSON logs)
- Health checks en cada servicio (/health)
- OpenAPI/Swagger auto-generado en cada servicio
- Tests con Jest (unit) + Supertest (integration)
- Documentar TODOS los endpoints
- Publicar types compartidos en @kicklatam/shared-types

CONVENCIONES:
- Servicios: kebab-case (auth-service)
- Controllers: PascalCase (AuthController)
- DTOs: PascalCase + sufijo Dto (CreateUserDto)
- Entities: PascalCase (User)
- Events: SCREAMING_SNAKE (USER_CREATED)
```

---

## BACKLOG COMPLETO — AGENTE 2

### SPRINT 0: Setup y Contratos (Día 1)

#### T2-001: Shared Types Package
**Rama:** `agent2/database-schemas`  
**Prioridad:** BLOQUEANTE (otros agentes dependen de esto)  
**Dependencias:** Ninguna  
**Criterios de aceptación:**
- [ ] Package `@kicklatam/shared-types` con TODOS los tipos TypeScript del sistema
- [ ] Exportar desde index.ts

**Tipos a definir (TODOS):**
```typescript
// === AUTH ===
interface User {
  id: string; // UUID
  username: string;
  displayName: string;
  email: string;
  avatarUrl: string | null;
  bannerUrl: string | null;
  bio: string | null;
  country: string; // ISO 3166 (MX, BR, AR, CO, CL, PE, etc.)
  language: 'es' | 'pt' | 'en';
  role: 'user' | 'streamer' | 'moderator' | 'admin' | 'super_admin';
  isVerified: boolean;
  isBanned: boolean;
  is2FAEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

interface LoginDto { email: string; password: string; }
interface RegisterDto {
  username: string;
  email: string;
  password: string;
  dateOfBirth: string;
  country: string;
}

// === STREAMS ===
interface Stream {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  categoryId: string;
  tags: string[];
  language: string;
  thumbnailUrl: string | null;
  isLive: boolean;
  startedAt: Date | null;
  viewerCount: number;
  peakViewerCount: number;
  isMature: boolean;
  streamKey: string;
  ingestUrl: string;
  playbackUrl: string | null;
  latencyMode: 'low' | 'normal';
}

interface Category {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  viewerCount: number;
  streamCount: number;
  tags: string[];
}

// === CHAT ===
interface ChatMessage {
  id: string;
  channelId: string;
  userId: string;
  username: string;
  displayName: string;
  content: string;
  badges: UserBadge[];
  emotes: ChatEmote[];
  isDeleted: boolean;
  isPinned: boolean;
  createdAt: Date;
}

type UserBadge = 'broadcaster' | 'moderator' | 'vip' | 'subscriber_t1' | 'subscriber_t2' | 'subscriber_t3' | 'verified' | 'admin';

interface ChatEmote {
  id: string;
  code: string;
  url: string;
  type: 'global' | 'channel' | 'subscriber';
}

// === SUBSCRIPTIONS ===
interface Subscription {
  id: string;
  subscriberId: string;
  streamerId: string;
  tier: 1 | 2 | 3;
  isGift: boolean;
  giftedBy: string | null;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  price: number;
  currency: 'USD' | 'BRL' | 'MXN' | 'ARS' | 'COP' | 'CLP' | 'PEN';
}

// === PAYMENTS ===
interface Payment {
  id: string;
  userId: string;
  type: 'subscription' | 'donation' | 'bits' | 'gift_sub';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  provider: 'stripe' | 'mercadopago' | 'paypal';
  metadata: Record<string, any>;
  createdAt: Date;
}

// === NOTIFICATIONS ===
interface Notification {
  id: string;
  userId: string;
  type: 'follow' | 'subscription' | 'donation' | 'raid' | 'stream_live' | 'clip_created' | 'system';
  title: string;
  body: string;
  imageUrl: string | null;
  actionUrl: string | null;
  isRead: boolean;
  createdAt: Date;
}

// === VOD / CLIPS ===
interface VOD {
  id: string;
  streamId: string;
  userId: string;
  title: string;
  description: string | null;
  thumbnailUrl: string;
  videoUrl: string;
  duration: number; // seconds
  viewCount: number;
  createdAt: Date;
  publishedAt: Date | null;
  isPublished: boolean;
}

interface Clip {
  id: string;
  vodId: string | null;
  streamId: string;
  creatorId: string;
  streamerId: string;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: number;
  startOffset: number;
  viewCount: number;
  createdAt: Date;
}

// === FOLLOWS ===
interface Follow {
  id: string;
  followerId: string;
  followedId: string;
  createdAt: Date;
}

// === API RESPONSES ===
interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

interface ApiError {
  statusCode: number;
  code: string;
  message: string;
  details?: Record<string, any>;
}

// === WEBSOCKET EVENTS ===
type ChatEvent =
  | { type: 'message'; payload: ChatMessage }
  | { type: 'delete_message'; payload: { messageId: string } }
  | { type: 'pin_message'; payload: { messageId: string } }
  | { type: 'clear_chat'; payload: { channelId: string } }
  | { type: 'user_banned'; payload: { userId: string; channelId: string; duration: number | null } }
  | { type: 'user_timeout'; payload: { userId: string; channelId: string; duration: number } }
  | { type: 'slow_mode'; payload: { channelId: string; seconds: number } }
  | { type: 'emote_only'; payload: { channelId: string; enabled: boolean } }
  | { type: 'followers_only'; payload: { channelId: string; enabled: boolean; minMinutes: number } }
  | { type: 'sub_only'; payload: { channelId: string; enabled: boolean } }
  | { type: 'raid'; payload: { from: string; viewerCount: number } }
  | { type: 'host'; payload: { from: string; viewerCount: number } }
  | { type: 'subscription'; payload: Subscription }
  | { type: 'donation'; payload: { userId: string; amount: number; message: string } }
  | { type: 'viewer_count_update'; payload: { channelId: string; count: number } }
  | { type: 'poll_created'; payload: Poll }
  | { type: 'poll_update'; payload: Poll }
  | { type: 'prediction_created'; payload: Prediction }
  | { type: 'prediction_update'; payload: Prediction };

interface Poll {
  id: string;
  channelId: string;
  title: string;
  options: { id: string; label: string; votes: number }[];
  duration: number;
  endsAt: Date;
  status: 'active' | 'ended';
}

interface Prediction {
  id: string;
  channelId: string;
  title: string;
  outcomes: { id: string; label: string; points: number; users: number }[];
  duration: number;
  endsAt: Date;
  status: 'active' | 'locked' | 'resolved' | 'cancelled';
  winningOutcomeId: string | null;
}
```

#### T2-002: Database Schema (Prisma)
**Rama:** `agent2/database-schemas`  
**Prioridad:** BLOQUEANTE  
**Dependencias:** T2-001  
**Criterios de aceptación:**
- [ ] Package `@kicklatam/database` con Prisma schema completo
- [ ] Todas las tablas con relaciones, índices, constraints
- [ ] Seed script con datos de prueba (usuarios, categorías, streams fake)
- [ ] Migration scripts generados
- [ ] Modelos: User, Stream, Category, ChatMessage, Subscription, Payment, Follow, Notification, VOD, Clip, Emote, Badge, Report, Ban, Poll, Prediction, ChannelPointReward, StreamKey, Session, RefreshToken

**Schema completo requerido con:**
```
- Indexes en: username, email, streamKey, categoryId, isLive
- Unique constraints en: username, email, streamKey
- Cascade deletes donde corresponda
- Soft deletes (deletedAt) en: User, Stream, ChatMessage, VOD, Clip
- Timestamps: createdAt, updatedAt en TODAS las tablas
- Enums de PostgreSQL para: Role, StreamStatus, PaymentStatus, SubscriptionTier, etc.
```

#### T2-003: Shared Utils Package
**Rama:** `agent2/database-schemas`  
**Prioridad:** ALTA  
**Dependencias:** Ninguna  
**Criterios de aceptación:**
- [ ] Package `@kicklatam/shared-utils`
- [ ] Helpers: slug generation, UUID, date formatting, pagination helpers
- [ ] Validators: email, username, password strength
- [ ] Constants: error codes, event names, limits
- [ ] Crypto: hash, compare, generate tokens
- [ ] Logger factory configurado

### SPRINT 1: Auth Service (Día 2-4)

#### T2-004: Auth Service — Core
**Rama:** `agent2/auth-service`  
**Prioridad:** CRÍTICA  
**Dependencias:** T2-002  
**Criterios de aceptación:**
- [ ] NestJS service en `services/auth`
- [ ] `POST /auth/register` — registro con validación completa
- [ ] `POST /auth/login` — login con email + password
- [ ] `POST /auth/refresh` — refresh de access token
- [ ] `POST /auth/logout` — invalidar refresh token
- [ ] `POST /auth/forgot-password` — enviar email reset
- [ ] `POST /auth/reset-password` — resetear con token
- [ ] `POST /auth/verify-email` — verificar email con token
- [ ] `POST /auth/2fa/enable` — generar secret TOTP + QR
- [ ] `POST /auth/2fa/verify` — verificar código TOTP
- [ ] `POST /auth/2fa/disable` — desactivar 2FA
- [ ] Password hashing con bcrypt (12 rounds)
- [ ] JWT access tokens (15 min TTL)
- [ ] Refresh tokens (30 días, rotación)
- [ ] Rate limiting: 5 intentos login por minuto por IP
- [ ] Account lockout después de 10 intentos fallidos
- [ ] Blacklist de tokens revocados en Redis
- [ ] Prisma Client inyectado

#### T2-005: Auth Service — OAuth2
**Rama:** `agent2/auth-service`  
**Prioridad:** ALTA  
**Dependencias:** T2-004  
**Criterios de aceptación:**
- [ ] `GET /auth/oauth/google` — redirect a Google
- [ ] `GET /auth/oauth/google/callback` — callback
- [ ] `GET /auth/oauth/discord` — redirect a Discord
- [ ] `GET /auth/oauth/discord/callback` — callback
- [ ] `GET /auth/oauth/apple` — redirect a Apple
- [ ] `GET /auth/oauth/apple/callback` — callback
- [ ] Link/unlink OAuth accounts
- [ ] Crear user si no existe, login si existe
- [ ] Passport.js strategies

### SPRINT 2: User Service (Día 4-6)

#### T2-006: User Service
**Rama:** `agent2/user-service`  
**Prioridad:** CRÍTICA  
**Dependencias:** T2-002  
**Criterios de aceptación:**
- [ ] NestJS service en `services/users`
- [ ] `GET /users/:username` — perfil público
- [ ] `GET /users/:id` — perfil por ID
- [ ] `PATCH /users/me` — editar perfil propio
- [ ] `POST /users/me/avatar` — subir avatar (multipart)
- [ ] `POST /users/me/banner` — subir banner
- [ ] `GET /users/:id/followers` — lista seguidores (paginado)
- [ ] `GET /users/:id/following` — lista seguidos (paginado)
- [ ] `POST /users/:id/follow` — seguir usuario
- [ ] `DELETE /users/:id/follow` — dejar de seguir
- [ ] `GET /users/me/following/live` — canales seguidos que están live
- [ ] `POST /users/:id/block` — bloquear usuario
- [ ] `DELETE /users/:id/block` — desbloquear
- [ ] `GET /users/me/blocks` — lista bloqueados
- [ ] Image upload a MinIO/S3 con resize (libsharp)
- [ ] Caché de perfiles en Redis (TTL 5 min)

### SPRINT 3: Stream Service (Día 6-10)

#### T2-007: Stream Service — RTMP Ingest
**Rama:** `agent2/stream-service`  
**Prioridad:** CRÍTICA  
**Dependencias:** T2-002  
**Criterios de aceptación:**
- [ ] Configuración de Nginx-RTMP o MediaMTX como ingest server
- [ ] Autenticación de stream key on_publish callback
- [ ] Transcoding pipeline con FFmpeg:
  - Input RTMP → Output HLS multi-quality (1080p, 720p, 480p, 360p, 160p)
  - Adaptive bitrate con master playlist
  - Low-latency HLS (LLHLS) con partials
  - Thumbnail generation cada 30 segundos
- [ ] Stream health monitoring (bitrate, fps, dropped frames)
- [ ] Auto-VOD recording (guardar stream completo)
- [ ] Webhook events: stream_started, stream_ended, stream_error

#### T2-008: Stream Service — API
**Rama:** `agent2/stream-service`  
**Prioridad:** CRÍTICA  
**Dependencias:** T2-007  
**Criterios de aceptación:**
- [ ] `GET /streams` — listar streams live (paginado, filtros)
- [ ] `GET /streams/:id` — detalle de stream
- [ ] `GET /streams/featured` — streams destacados
- [ ] `GET /streams/category/:slug` — streams por categoría
- [ ] `POST /streams/key/regenerate` — regenerar stream key
- [ ] `GET /streams/key` — obtener stream key (solo owner)
- [ ] `PATCH /streams/info` — editar info del stream (título, categoría, tags)
- [ ] `POST /streams/start` — marcar stream como iniciado (callback RTMP)
- [ ] `POST /streams/end` — marcar stream como finalizado
- [ ] `GET /categories` — listar categorías
- [ ] `GET /categories/:slug` — detalle categoría
- [ ] `GET /categories/:slug/streams` — streams de una categoría
- [ ] Viewer count tracking con Redis (HyperLogLog para unique viewers)
- [ ] Publish eventos NATS: STREAM_STARTED, STREAM_ENDED, VIEWER_COUNT_UPDATED

#### T2-009: Raids y Hosts
**Rama:** `agent2/stream-service`  
**Prioridad:** MEDIA  
**Dependencias:** T2-008  
**Criterios de aceptación:**
- [ ] `POST /streams/raid/:targetUserId` — iniciar raid
- [ ] `POST /streams/host/:targetUserId` — hostear canal
- [ ] `DELETE /streams/host` — dejar de hostear
- [ ] Notificar al canal target vía NATS → WebSocket
- [ ] Límites: 1 raid por stream, mínimo 10 viewers

### SPRINT 4: Chat Service (Día 10-14)

#### T2-010: Chat Service — WebSocket Server
**Rama:** `agent2/chat-service`  
**Prioridad:** CRÍTICA  
**Dependencias:** T2-002  
**Criterios de aceptación:**
- [ ] NestJS Gateway con WebSocket (Socket.io o ws)
- [ ] Connection: autenticación JWT en handshake
- [ ] Rooms: un room por canal (join/leave)
- [ ] Evento `chat:message` — enviar mensaje
- [ ] Evento `chat:delete` — borrar mensaje (mod/broadcaster)
- [ ] Evento `chat:ban` — banear usuario del chat
- [ ] Evento `chat:timeout` — timeout temporal
- [ ] Evento `chat:clear` — limpiar chat completo
- [ ] Evento `chat:pin` — fijar mensaje
- [ ] Evento `chat:unpin` — desfijar
- [ ] Slow mode: rate limit por usuario configurable
- [ ] Emote-only mode
- [ ] Followers-only mode (con mínimo de tiempo)
- [ ] Sub-only mode
- [ ] Redis Pub/Sub para escalar horizontalmente
- [ ] Message history: últimos 200 mensajes al joinear
- [ ] Message persistence en PostgreSQL (async via queue)
- [ ] Emote parsing: detectar :emote_code: y enriquecer
- [ ] Mention parsing: detectar @username
- [ ] AutoMod: filtro de palabras prohibidas (configurable por canal)
- [ ] URL filtering configurable

#### T2-011: Chat Commands
**Rama:** `agent2/chat-service`  
**Prioridad:** ALTA  
**Dependencias:** T2-010  
**Criterios de aceptación:**
- [ ] `/ban username [reason]` — ban permanente (mod/broadcaster)
- [ ] `/unban username` — desbanear
- [ ] `/timeout username duration [reason]` — timeout temporal
- [ ] `/slow seconds` — activar slow mode
- [ ] `/slowoff` — desactivar slow mode
- [ ] `/emoteonly` — activar emote-only
- [ ] `/emoteonlyoff` — desactivar
- [ ] `/followers [minutes]` — followers-only mode
- [ ] `/followersoff` — desactivar
- [ ] `/subscribers` — sub-only mode
- [ ] `/subscribersoff` — desactivar
- [ ] `/clear` — limpiar chat
- [ ] `/mod username` — hacer mod
- [ ] `/unmod username` — quitar mod
- [ ] `/vip username` — dar VIP
- [ ] `/unvip username` — quitar VIP
- [ ] `/me message` — action message
- [ ] `/whisper username message` — DM (privado)
- [ ] Command validation y permisos

#### T2-012: Emotes Service
**Rama:** `agent2/chat-service`  
**Prioridad:** MEDIA  
**Dependencias:** T2-010  
**Criterios de aceptación:**
- [ ] CRUD emotes globales (admin only)
- [ ] CRUD emotes de canal (broadcaster only)
- [ ] CRUD emotes de suscriptor por tier
- [ ] Upload con resize a múltiples tamaños (1x, 2x, 4x)
- [ ] API: `GET /emotes/global`, `GET /emotes/channel/:id`, `GET /emotes/sets/:setId`
- [ ] Cache en Redis de sets de emotes
- [ ] Animated emotes (GIF/WEBP) support

### SPRINT 5: API Gateway (Día 14-16)

#### T2-013: API Gateway
**Rama:** `agent2/gateway`  
**Prioridad:** ALTA  
**Dependencias:** T2-004, T2-006, T2-008  
**Criterios de aceptación:**
- [ ] Nginx o Kong como API Gateway
- [ ] Routing a microservicios:
  - `/api/auth/*` → Auth Service
  - `/api/users/*` → User Service
  - `/api/streams/*` → Stream Service
  - `/api/chat/*` → Chat Service
  - `/api/payments/*` → Payment Service
  - `/api/notifications/*` → Notification Service
  - `/api/moderation/*` → Moderation Service
  - `/api/vod/*` → VOD Service
  - `/api/clips/*` → VOD Service
  - `/api/analytics/*` → Analytics Service
  - `/api/search/*` → Search Service
  - `/api/admin/*` → Admin endpoints (role check)
- [ ] Rate limiting global: 100 req/min unauthenticated, 1000 req/min authenticated
- [ ] CORS configurado para dominios de la app
- [ ] Request logging
- [ ] SSL termination
- [ ] Health check agregado (`/health` que chequea todos los servicios)
- [ ] Request ID tracking (UUID en header)
- [ ] Response compression (gzip/brotli)

#### T2-014: Polls & Predictions Backend
**Rama:** `agent2/chat-service`  
**Prioridad:** MEDIA  
**Dependencias:** T2-010  
**Criterios de aceptación:**
- [ ] `POST /polls` — crear poll (broadcaster only)
- [ ] `POST /polls/:id/vote` — votar
- [ ] `DELETE /polls/:id` — cerrar poll
- [ ] `POST /predictions` — crear prediction (broadcaster only)
- [ ] `POST /predictions/:id/bet` — apostar channel points
- [ ] `POST /predictions/:id/resolve` — resolver (broadcaster)
- [ ] `POST /predictions/:id/cancel` — cancelar
- [ ] WebSocket events para updates en tiempo real
- [ ] Channel points system (earn por watching, spend en predictions/rewards)

---

# ═══════════════════════════════════════════════════════════════
# AGENTE 3 — GEMINI ULTRA (Google/Antigravity)
# ROL: PLATFORM ENGINEER + PAYMENTS + ANALYTICS + INFRA + DevOps
# ═══════════════════════════════════════════════════════════════

## Perfil del Agente 3

- **Herramienta:** Gemini Ultra en Antigravity
- **Especialidad:** Pagos, Analytics, Infraestructura, DevOps, Search, Moderation
- **Ramas:** `agent3/*`
- **Directorios:** `services/payments`, `services/notifications`, `services/moderation`, `services/vod`, `services/analytics`, `services/search`, `infrastructure/`

## Instrucciones Globales para Agente 3

```
Eres un Senior Platform Engineer especializado en sistemas distribuidos,
pagos, analytics, y DevOps para plataformas de streaming.
Tu stack: NestJS, TypeScript, Stripe, MercadoPago, Elasticsearch,
Docker, Kubernetes, Terraform, FFmpeg, PostgreSQL, MongoDB, Redis.

REGLAS:
- TypeScript strict, zero `any`
- NestJS para microservicios
- Prisma para PostgreSQL, Mongoose para MongoDB
- Todas las transacciones de pago deben ser idempotentes
- Payments: Stripe para internacional, MercadoPago para LATAM
- Logs y métricas en todos los servicios (Pino + Prometheus)
- Docker images optimizadas (multi-stage builds, < 200MB)
- Kubernetes manifests con health checks, resource limits
- Terraform para infrastructure as code
- Tests unitarios + de integración en cada servicio
- Documentar runbooks para operaciones críticas

CONVENCIONES: mismas que Agente 2.
```

---

## BACKLOG COMPLETO — AGENTE 3

### SPRINT 0: Infrastructure Base (Día 1-2)

#### T3-001: Docker Compose Development Environment
**Rama:** `agent3/infrastructure`  
**Prioridad:** BLOQUEANTE  
**Dependencias:** Ninguna  
**Criterios de aceptación:**
- [ ] `docker-compose.yml` completo con TODOS los servicios:
  - PostgreSQL 16 (puerto 5432)
  - Redis 7 (puerto 6379)
  - MongoDB 7 (puerto 27017)
  - Elasticsearch 8 (puerto 9200)
  - NATS (puerto 4222)
  - MinIO (puertos 9000, 9001)
  - Nginx-RTMP / MediaMTX (puertos 1935 RTMP, 8554 RTSP)
  - Mailhog (puertos 1025, 8025) para emails dev
  - pgAdmin (puerto 5050)
  - Redis Commander (puerto 8081)
  - Kibana (puerto 5601)
- [ ] Docker volumes persistentes para datos
- [ ] Docker network compartida
- [ ] Health checks en todos los containers
- [ ] `.env.example` con todas las variables
- [ ] `Makefile` con comandos: `make up`, `make down`, `make logs`, `make seed`
- [ ] README con instrucciones de setup

#### T3-002: Dockerfiles para cada Microservicio
**Rama:** `agent3/infrastructure`  
**Prioridad:** ALTA  
**Dependencias:** T3-001  
**Criterios de aceptación:**
- [ ] Dockerfile multi-stage para cada servicio NestJS:
  - Stage 1: Builder (install deps + build)
  - Stage 2: Runner (copy dist + node_modules production only)
  - Imagen final < 200MB
- [ ] Dockerfile para frontend Next.js (standalone output)
- [ ] `.dockerignore` en cada servicio
- [ ] docker-compose.override.yml para dev (hot reload con volumes)

#### T3-003: CI/CD Pipeline (GitHub Actions)
**Rama:** `agent3/infrastructure`  
**Prioridad:** ALTA  
**Dependencias:** T3-002  
**Criterios de aceptación:**
- [ ] Workflow: `ci.yml`
  - Trigger: push a cualquier rama agent*
  - Steps: install, lint, typecheck, test, build
  - Matrix: run para cada servicio modificado
  - Cache: node_modules, turbo cache
- [ ] Workflow: `deploy-staging.yml`
  - Trigger: merge a develop
  - Build Docker images
  - Push a GitHub Container Registry
  - Deploy a staging (docker compose en server)
- [ ] Workflow: `deploy-production.yml`
  - Trigger: merge a main
  - Build + push images
  - Deploy a producción (Kubernetes)
- [ ] Workflow: `e2e-tests.yml`
  - Trigger: PR a develop
  - Spin up services con docker-compose
  - Run E2E tests
  - Teardown

### SPRINT 1: Payment Service (Día 2-6)

#### T3-004: Payment Service — Stripe Integration
**Rama:** `agent3/payments-service`  
**Prioridad:** CRÍTICA  
**Dependencias:** T2-002 (database schema)  
**Criterios de aceptación:**
- [ ] NestJS service en `services/payments`
- [ ] `POST /payments/checkout/subscription` — crear checkout session para sub
- [ ] `POST /payments/checkout/donation` — checkout para donación
- [ ] `POST /payments/webhook/stripe` — webhook handler
- [ ] Subscription tiers: Tier 1 ($4.99), Tier 2 ($9.99), Tier 3 ($24.99)
- [ ] Gift subscriptions (1, 5, 10, 25, 50, 100 gift subs)
- [ ] Donations con mensaje custom (mín $1, máx $500)
- [ ] Stripe Connect para payouts a streamers
- [ ] Revenue split: 70% streamer / 30% plataforma
- [ ] Idempotency keys en todas las operaciones
- [ ] Webhook signature verification
- [ ] Refund handling
- [ ] Payment history por usuario
- [ ] Invoice generation

#### T3-005: Payment Service — MercadoPago Integration
**Rama:** `agent3/payments-service`  
**Prioridad:** CRÍTICA  
**Dependencias:** T3-004  
**Criterios de aceptación:**
- [ ] MercadoPago SDK integration
- [ ] Checkout Pro para suscripciones
- [ ] Pagos con: tarjeta, PIX (Brasil), OXXO (México), PSE (Colombia), transferencia bancaria
- [ ] IPN (Instant Payment Notification) webhook handler
- [ ] Soporte multi-moneda: USD, BRL, MXN, ARS, COP, CLP, PEN
- [ ] Conversión de precios por país
- [ ] MercadoPago Connect para payouts locales
- [ ] Manejo de estados de pago asíncronos (pending, approved, rejected)

#### T3-006: Payment Service — Bits/Channel Points
**Rama:** `agent3/payments-service`  
**Prioridad:** MEDIA  
**Dependencias:** T3-004  
**Criterios de aceptación:**
- [ ] Sistema de moneda virtual "Estrellas" (equivalente a Bits)
- [ ] Compra de Estrellas con money real
- [ ] Enviar Estrellas en chat (cheers)
- [ ] Animated emotes para cheers (thresholds: 1, 100, 500, 1000, 5000, 10000)
- [ ] Channel Points: earn pasivamente viendo stream
- [ ] Channel Points rewards (custom por streamer)
- [ ] Leaderboard de top gifters/cheerers

#### T3-007: Payment Service — Payout System
**Rama:** `agent3/payments-service`  
**Prioridad:** ALTA  
**Dependencias:** T3-004, T3-005  
**Criterios de aceptación:**
- [ ] Dashboard de earnings para streamer
- [ ] Payout request (mínimo $50 o equivalente local)
- [ ] Payout methods: bank transfer, MercadoPago, PayPal
- [ ] Payout schedule: manual o automático mensual
- [ ] Tax info collection (por país LATAM)
- [ ] Payout history con status tracking
- [ ] Revenue breakdown: subs, donations, bits, ads

### SPRINT 2: Notification Service (Día 6-8)

#### T3-008: Notification Service
**Rama:** `agent3/notifications`  
**Prioridad:** ALTA  
**Dependencias:** T2-002  
**Criterios de aceptación:**
- [ ] NestJS service en `services/notifications`
- [ ] NATS subscriber para eventos: STREAM_STARTED, NEW_FOLLOWER, NEW_SUBSCRIPTION, DONATION, RAID
- [ ] In-App notifications:
  - `GET /notifications` — listar (paginado)
  - `PATCH /notifications/:id/read` — marcar como leída
  - `PATCH /notifications/read-all` — marcar todas como leídas
  - `DELETE /notifications/:id` — eliminar
  - `GET /notifications/unread-count` — count de no leídas
- [ ] Push notifications (Firebase Cloud Messaging para mobile)
- [ ] Email notifications (templates con MJML):
  - Welcome email
  - Email verification
  - Password reset
  - New follower
  - Stream went live (canales seguidos)
  - Subscription confirmation
  - Payout completed
- [ ] Email provider: SendGrid o Resend
- [ ] User preferences: toggle per notification type per channel (email, push, in-app)
- [ ] Notification batching (no spamear si 100 follows en 1 minuto)
- [ ] WebSocket connection para real-time in-app notifications

### SPRINT 3: Moderation Service (Día 8-11)

#### T3-009: Moderation Service — AutoMod
**Rama:** `agent3/moderation`  
**Prioridad:** ALTA  
**Dependencias:** T2-010 (chat service)  
**Criterios de aceptación:**
- [ ] NestJS service en `services/moderation`
- [ ] AutoMod engine con niveles de sensibilidad (1-4):
  - Nivel 1: solo groserías extremas
  - Nivel 2: groserías + insultos
  - Nivel 3: + links no permitidos + spam
  - Nivel 4: máxima restricción
- [ ] Banned words list global + per channel
- [ ] Regex pattern matching para evasiones (l33tspeak, espacios)
- [ ] Link whitelist/blacklist
- [ ] Spam detection (mensajes repetidos, caps excesivos)
- [ ] Actions: hold for review, delete, timeout, warn
- [ ] Moderation queue: mensajes held for review
- [ ] `GET /moderation/queue/:channelId` — ver cola
- [ ] `POST /moderation/queue/:messageId/approve` — aprobar
- [ ] `POST /moderation/queue/:messageId/deny` — denegar

#### T3-010: Moderation Service — Reports
**Rama:** `agent3/moderation`  
**Prioridad:** ALTA  
**Dependencias:** T3-009  
**Criterios de aceptación:**
- [ ] `POST /reports` — crear report (user, stream, message, clip)
- [ ] `GET /reports` — listar reports (admin only, paginado, filtros)
- [ ] `PATCH /reports/:id` — update status (reviewing, resolved, dismissed)
- [ ] `POST /reports/:id/action` — tomar acción (warn, timeout, ban, stream_end)
- [ ] Report categories: harassment, spam, sexual_content, violence, hate_speech, underage, copyright, other
- [ ] Report evidence attachment (screenshots)
- [ ] Ban system:
  - `POST /bans` — ban user (platform-wide o channel)
  - `GET /bans` — listar bans activos
  - `DELETE /bans/:id` — unban
  - Ban types: temporary (duration), permanent
  - Ban appeal system
- [ ] Moderation action logging (audit trail)

### SPRINT 4: VOD Service (Día 11-14)

#### T3-011: VOD Service — Processing
**Rama:** `agent3/vod-clips`  
**Prioridad:** ALTA  
**Dependencias:** T2-007 (stream service, FFmpeg)  
**Criterios de aceptación:**
- [ ] NestJS service en `services/vod`
- [ ] Auto-VOD: cuando stream termina, procesar recording
  - Re-encode to HLS multi-quality
  - Generate thumbnail sprite sheet (para seekbar preview)
  - Extract chapters/timestamps
  - Upload a MinIO/S3
- [ ] Processing queue con Bull (Redis-backed)
- [ ] Status tracking: processing, ready, failed
- [ ] Cleanup: auto-delete VODs > 60 días (configurable)
- [ ] Storage optimization: compress older VODs to lower quality

#### T3-012: VOD Service — API
**Rama:** `agent3/vod-clips`  
**Prioridad:** ALTA  
**Dependencias:** T3-011  
**Criterios de aceptación:**
- [ ] `GET /vods` — listar VODs (paginado, filtros)
- [ ] `GET /vods/:id` — detalle VOD
- [ ] `PATCH /vods/:id` — editar (título, descripción, thumbnail)
- [ ] `DELETE /vods/:id` — eliminar VOD
- [ ] `POST /vods/:id/publish` — publicar
- [ ] `POST /vods/:id/unpublish` — despublicar
- [ ] `GET /users/:id/vods` — VODs de un usuario
- [ ] Viewer count tracking
- [ ] Watch position tracking (continue watching)

#### T3-013: Clips Service
**Rama:** `agent3/vod-clips`  
**Prioridad:** ALTA  
**Dependencias:** T3-011  
**Criterios de aceptación:**
- [ ] `POST /clips` — crear clip (startTime, endTime, streamId/vodId, title)
- [ ] `GET /clips` — listar clips (paginado, filtros, sort by views/date)
- [ ] `GET /clips/:id` — detalle clip
- [ ] `DELETE /clips/:id` — eliminar clip (creator o broadcaster)
- [ ] `GET /clips/top` — top clips (diario, semanal, mensual, all-time)
- [ ] `GET /users/:id/clips` — clips de un canal
- [ ] Clip processing: extract segment con FFmpeg, encode, thumbnail
- [ ] Máximo 60 segundos por clip
- [ ] Rate limit: 5 clips por usuario por hora

### SPRINT 5: Analytics Service (Día 14-17)

#### T3-014: Analytics Service — Data Collection
**Rama:** `agent3/analytics`  
**Prioridad:** ALTA  
**Dependencias:** T2-002  
**Criterios de aceptación:**
- [ ] NestJS service en `services/analytics`
- [ ] MongoDB para almacenar eventos analytics
- [ ] NATS subscriber para eventos:
  - stream_view (heartbeat cada 30s)
  - stream_started, stream_ended
  - follow, unfollow
  - subscription, gift_sub
  - donation, cheer
  - clip_created, clip_viewed
  - vod_viewed
  - chat_message
- [ ] Agregaciones en tiempo real con MongoDB aggregation pipeline
- [ ] Batch processing diario para métricas históricas
- [ ] Data retention: raw events 90 días, aggregates indefinido

#### T3-015: Analytics Service — API
**Rama:** `agent3/analytics`  
**Prioridad:** ALTA  
**Dependencias:** T3-014  
**Criterios de aceptación:**
- [ ] `GET /analytics/stream/:streamId` — stats de un stream session
- [ ] `GET /analytics/channel/:userId` — stats del canal
  - Viewers over time, peak viewers
  - Follower growth
  - Sub growth
  - Revenue breakdown
  - Chat activity
  - Top clips
- [ ] `GET /analytics/channel/:userId/audience` — demographics
  - Country breakdown
  - Device breakdown
  - Language breakdown
  - Referral sources
- [ ] `GET /analytics/platform` — stats globales (admin only)
  - Total concurrent viewers
  - Total live streams
  - Total users
  - Revenue total
  - Growth rates
- [ ] Date range filtering
- [ ] CSV export
- [ ] Caching de queries costosos (Redis, TTL 5 min)

### SPRINT 6: Search Service (Día 17-19)

#### T3-016: Search Service
**Rama:** `agent3/search-service`  
**Prioridad:** ALTA  
**Dependencias:** T2-002  
**Criterios de aceptación:**
- [ ] NestJS service en `services/search`
- [ ] Elasticsearch indices:
  - `streams` — streams live y recientes
  - `users` — perfiles de usuario/canal
  - `categories` — categorías
  - `vods` — videos on demand
  - `clips` — clips
- [ ] NATS subscriber para mantener índices actualizados
- [ ] `GET /search?q=query&type=all|streams|users|categories|vods|clips`
- [ ] Autocomplete / suggestions
- [ ] Fuzzy matching (tolerar typos)
- [ ] Boosting: streams live primero, canales verificados primero
- [ ] Filtros: language, category, isLive, minViewers
- [ ] Highlighting en resultados
- [ ] Soporte multi-idioma (es, pt, en analyzers)
- [ ] Rate limit: 30 searches por minuto por usuario

### SPRINT 7: Kubernetes & Production Infra (Día 19-22)

#### T3-017: Kubernetes Manifests
**Rama:** `agent3/infrastructure`  
**Prioridad:** ALTA  
**Dependencias:** T3-002  
**Criterios de aceptación:**
- [ ] Namespace: `kicklatam-production`, `kicklatam-staging`
- [ ] Deployments para cada microservicio con:
  - Replicas: min 2, max 10 (HPA)
  - Resource limits (CPU: 500m, Memory: 512Mi)
  - Liveness + readiness probes
  - Rolling update strategy
  - Pod disruption budgets
- [ ] Services (ClusterIP) para cada microservicio
- [ ] Ingress (Nginx Ingress Controller) con SSL
- [ ] ConfigMaps para configuración no-secreta
- [ ] Secrets para credentials
- [ ] PersistentVolumeClaims para PostgreSQL, Redis, Elasticsearch, MinIO
- [ ] StatefulSets para: PostgreSQL, Redis, Elasticsearch, NATS
- [ ] CronJobs: cleanup VODs, aggregate analytics, expire sessions
- [ ] NetworkPolicies para aislar servicios

#### T3-018: Terraform — Cloud Infrastructure
**Rama:** `agent3/infrastructure`  
**Prioridad:** MEDIA  
**Dependencias:** T3-017  
**Criterios de aceptación:**
- [ ] Provider: AWS o DigitalOcean (optimizado costo LATAM)
- [ ] VPC con subnets públicas y privadas
- [ ] EKS / DOKS cluster
- [ ] RDS PostgreSQL (Multi-AZ)
- [ ] ElastiCache Redis
- [ ] S3 bucket para media
- [ ] CloudFront CDN (PoPs en LATAM: São Paulo, Mexico City, Bogotá)
- [ ] Route53 DNS
- [ ] ACM SSL certificates
- [ ] IAM roles y policies
- [ ] Monitoring: CloudWatch / Prometheus + Grafana
- [ ] Alerting: PagerDuty / OpsGenie integration
- [ ] Outputs: endpoints, connection strings

#### T3-019: Monitoring & Observability
**Rama:** `agent3/infrastructure`  
**Prioridad:** MEDIA  
**Dependencias:** T3-017  
**Criterios de aceptación:**
- [ ] Prometheus metrics en cada servicio (prom-client)
- [ ] Grafana dashboards:
  - System overview (CPU, memory, network)
  - API performance (latency p50/p95/p99, error rate, throughput)
  - Stream health (active streams, viewers, ingest bitrate)
  - Payment metrics (transactions, revenue, failures)
  - Chat metrics (messages/sec, connections)
- [ ] ELK Stack (Elasticsearch + Logstash + Kibana) para logs centralizados
- [ ] Distributed tracing con OpenTelemetry + Jaeger
- [ ] Alertas configuradas para:
  - Service down
  - Error rate > 1%
  - Latency p99 > 500ms
  - Payment failures
  - Stream ingest failures
  - Disk usage > 80%

---

# ═══════════════════════════════════════════════════════════════
# PROTOCOLO DEL ORQUESTADOR / VALIDADOR
# ═══════════════════════════════════════════════════════════════

## Checklist de Validación por Entregable

Para CADA Pull Request de los agentes, el Orquestador debe verificar:

### ✅ Code Quality
- [ ] TypeScript sin errores (`npx tsc --noEmit`)
- [ ] ESLint sin warnings (`npx eslint .`)
- [ ] No hay `any` types
- [ ] No hay console.log (usar logger)
- [ ] No hay secrets hardcodeados
- [ ] No hay TODO/FIXME sin issue

### ✅ Testing
- [ ] Tests unitarios (cobertura > 80%)
- [ ] Tests de integración para endpoints
- [ ] Tests pasan en CI

### ✅ Documentation
- [ ] Endpoints documentados en Swagger
- [ ] README del servicio actualizado
- [ ] Tipos exportados en shared-types

### ✅ Security
- [ ] Input validation en todos los endpoints
- [ ] Auth guards donde se requiere
- [ ] Rate limiting configurado
- [ ] No SQL injection posible (Prisma parametrizado)
- [ ] No XSS (sanitización de input en chat)
- [ ] CORS correctamente configurado

### ✅ Performance
- [ ] Queries optimizados (no N+1)
- [ ] Caché implementado donde aplica
- [ ] Paginación en todos los list endpoints
- [ ] No memory leaks en WebSocket connections

### ✅ Integration
- [ ] Tipos compartidos importados de @kicklatam/shared-types
- [ ] Eventos NATS publicados/consumidos correctamente
- [ ] API responses siguen el formato estándar (PaginatedResponse, ApiError)

---

## Flujo de Trabajo del Orquestador

```
┌─────────────────────────────────────────────────────────────┐
│                  CICLO DEL ORQUESTADOR                       │
│                                                              │
│  1. PLANIFICAR → Definir contratos, types, specs             │
│  2. DISTRIBUIR → Asignar tareas a agentes                    │
│  3. MONITOREAR → Revisar progreso, PRs, bloqueantes          │
│  4. VALIDAR → Ejecutar tests, revisar código                 │
│  5. INTEGRAR → Merge PRs aprobados a develop                 │
│  6. CERTIFICAR → E2E tests, smoke tests                      │
│  7. RELEASE → Merge develop → main, deploy                   │
│  8. RETROALIMENTAR → Generar nuevas tareas si hay bugs       │
└─────────────────────────────────────────────────────────────┘
```

### Tests E2E que el Orquestador debe crear y ejecutar:

```
Flujo 1: Registro → Login → Follow → Ver Stream → Chatear
Flujo 2: Login → Subscribe → Pagar → Ver badge en chat
Flujo 3: Streamer → Go Live → Viewers ven stream → End → VOD generado
Flujo 4: Crear clip → Clip aparece en canal → Share
Flujo 5: Donar Estrellas → Streamer ve notificación → Revenue en dashboard
Flujo 6: Report usuario → Admin ve report → Ban → Usuario no puede acceder
Flujo 7: Búsqueda → Resultados correctos → Click → Navega al canal
Flujo 8: Mobile → Ver stream → Chat → Follow → Notificación push
```

---

## 📅 TIMELINE ESTIMADO

```
SEMANA 1 (Día 1-7)
├── Día 1:    Setup (todos) — repos, docker, types, schemas
├── Día 2-3:  Core features — auth, home, payments base
├── Día 4-5:  Stream engine — RTMP, player, user service
├── Día 6-7:  Chat system — WebSocket, chat UI, notifications
│
SEMANA 2 (Día 8-14)
├── Día 8-9:  Social features — profiles, follow, search
├── Día 10-11: Moderation + VOD processing
├── Día 12-13: Dashboard streamer + Analytics
├── Día 14:    Integration testing + bug fixes
│
SEMANA 3 (Día 15-21)
├── Día 15-16: Mobile app core
├── Día 17-18: Admin panel + Search
├── Día 19-20: K8s + Infrastructure
├── Día 21:    E2E testing + Performance testing
│
SEMANA 4 (Día 22-28)
├── Día 22-23: Bug fixes + Polish
├── Día 24-25: Security audit + Penetration testing
├── Día 26-27: Staging deployment + UAT
├── Día 28:    Production deployment 🚀
```

---

## 📋 RESUMEN DE TAREAS POR AGENTE

### AGENTE 1 (Codex) — 25 tareas
| ID | Tarea | Sprint | Prioridad |
|----|-------|--------|-----------|
| T1-001 | Init Next.js 14 | 0 | CRÍTICA |
| T1-002 | Design System / UI Library | 0 | CRÍTICA |
| T1-003 | Layout + Navegación | 0 | CRÍTICA |
| T1-004 | Home / Discover Page | 1 | ALTA |
| T1-005 | Category / Browse Page | 1 | ALTA |
| T1-006 | Búsqueda Global | 1 | ALTA |
| T1-007 | Video Player HLS | 2 | CRÍTICA |
| T1-008 | Página de Canal/Stream | 2 | CRÍTICA |
| T1-009 | Chat UI Completo | 3 | CRÍTICA |
| T1-010 | Polls, Predictions UI | 3 | MEDIA |
| T1-011 | Perfil de Usuario | 4 | ALTA |
| T1-012 | Settings de Usuario | 4 | ALTA |
| T1-013 | Auth UI | 4 | CRÍTICA |
| T1-014 | Dashboard Overview | 5 | ALTA |
| T1-015 | Stream Manager | 5 | ALTA |
| T1-016 | Channel Settings | 5 | MEDIA |
| T1-017 | Analytics Dashboard | 5 | MEDIA |
| T1-018 | VOD & Clips Manager | 5 | MEDIA |
| T1-019 | VOD Player | 6 | ALTA |
| T1-020 | Clips Viewer | 6 | MEDIA |
| T1-021 | Mobile App Base | 7 | ALTA |
| T1-022 | Home/Browse/Search Mobile | 7 | ALTA |
| T1-023 | Mobile Stream + Chat | 7 | CRÍTICA |
| T1-024 | Mobile Profile/Settings | 7 | MEDIA |
| T1-025 | Admin Panel | 8 | ALTA |

### AGENTE 2 (Claude Code) — 14 tareas
| ID | Tarea | Sprint | Prioridad |
|----|-------|--------|-----------|
| T2-001 | Shared Types Package | 0 | BLOQUEANTE |
| T2-002 | Database Schema (Prisma) | 0 | BLOQUEANTE |
| T2-003 | Shared Utils Package | 0 | ALTA |
| T2-004 | Auth Service Core | 1 | CRÍTICA |
| T2-005 | Auth Service OAuth2 | 1 | ALTA |
| T2-006 | User Service | 2 | CRÍTICA |
| T2-007 | Stream Service RTMP | 3 | CRÍTICA |
| T2-008 | Stream Service API | 3 | CRÍTICA |
| T2-009 | Raids & Hosts | 3 | MEDIA |
| T2-010 | Chat Service WebSocket | 4 | CRÍTICA |
| T2-011 | Chat Commands | 4 | ALTA |
| T2-012 | Emotes Service | 4 | MEDIA |
| T2-013 | API Gateway | 5 | ALTA |
| T2-014 | Polls & Predictions Backend | 5 | MEDIA |

### AGENTE 3 (Gemini Ultra) — 19 tareas
| ID | Tarea | Sprint | Prioridad |
|----|-------|--------|-----------|
| T3-001 | Docker Compose Dev Env | 0 | BLOQUEANTE |
| T3-002 | Dockerfiles Microservicios | 0 | ALTA |
| T3-003 | CI/CD Pipeline | 0 | ALTA |
| T3-004 | Payment Service Stripe | 1 | CRÍTICA |
| T3-005 | Payment Service MercadoPago | 1 | CRÍTICA |
| T3-006 | Bits/Channel Points | 1 | MEDIA |
| T3-007 | Payout System | 1 | ALTA |
| T3-008 | Notification Service | 2 | ALTA |
| T3-009 | Moderation AutoMod | 3 | ALTA |
| T3-010 | Moderation Reports | 3 | ALTA |
| T3-011 | VOD Processing | 4 | ALTA |
| T3-012 | VOD API | 4 | ALTA |
| T3-013 | Clips Service | 4 | ALTA |
| T3-014 | Analytics Data Collection | 5 | ALTA |
| T3-015 | Analytics API | 5 | ALTA |
| T3-016 | Search Service | 6 | ALTA |
| T3-017 | Kubernetes Manifests | 7 | ALTA |
| T3-018 | Terraform Cloud Infra | 7 | MEDIA |
| T3-019 | Monitoring & Observability | 7 | MEDIA |

---

## 🔄 DEPENDENCIAS ENTRE AGENTES

```
T2-001 (Types) ──────────────┬──→ T1-004 (Home usa tipos Stream)
T2-002 (Database) ───────────┤──→ T3-004 (Payments usa DB)
                             ├──→ T2-004 (Auth usa DB)
                             └──→ T3-008 (Notifications usa DB)

T3-001 (Docker) ─────────────┬──→ T2-004 (Auth necesita PostgreSQL+Redis)
                             ├──→ T1-001 (Frontend necesita API)
                             └──→ TODOS (dev environment)

T2-004 (Auth) ───────────────┬──→ T1-013 (Auth UI necesita API)
                             └──→ T2-006 (Users necesita auth middleware)

T2-010 (Chat Backend) ───────┬──→ T1-009 (Chat UI necesita WebSocket)
                             └──→ T3-009 (AutoMod intercepta mensajes)

T2-007 (RTMP Ingest) ────────┬──→ T1-007 (Player necesita HLS URL)
                             └──→ T3-011 (VOD necesita recording)

T3-004 (Payments) ───────────┬──→ T1-012 (Billing settings)
                             └──→ T3-007 (Payouts)
```

### Estrategia para Dependencias

1. **Mocking:** Cuando un agente depende de otro que aún no entregó, usa mocks:
   - Frontend: MSW (Mock Service Worker) para mockear APIs
   - Backend: Mock de otros microservicios con interfaces de los shared-types
   - Infra: Docker stubs

2. **Contratos primero:** El Agente 2 entrega `shared-types` el Día 1 para que todos tengan interfaces

3. **Feature flags:** Si una integración no está lista, usar feature flags para deshabilitar

---

## 🚀 COMANDO INICIAL PARA CADA AGENTE

### Para iniciar Agente 1 (Codex):
```
Lee este plan completo. Tu rol es AGENTE 1 — Frontend Engineer.
Comienza con las tareas T1-001, T1-002, T1-003 en paralelo.
Trabaja en la rama agent1/frontend-core.
Importa tipos de @kicklatam/shared-types.
Mockea APIs con MSW hasta que el backend esté listo.
Cuando termines Sprint 0, continúa con Sprint 1.
Reporta cada tarea completada con un commit descriptivo.
```

### Para iniciar Agente 2 (Claude Code):
```
Lee este plan completo. Tu rol es AGENTE 2 — Backend Core Engineer.
PRIORIDAD MÁXIMA: Entrega T2-001 (shared-types) y T2-002 (database schema) PRIMERO.
Los otros agentes dependen de esto. Luego T2-003, y pasa a T2-004 (Auth).
Trabaja en las ramas agent2/*.
Publica todo en el monorepo bajo services/ y packages/.
Cada servicio debe tener Swagger, tests, y health check.
```

### Para iniciar Agente 3 (Gemini Ultra):
```
Lee este plan completo. Tu rol es AGENTE 3 — Platform Engineer.
PRIORIDAD MÁXIMA: Entrega T3-001 (Docker Compose) PRIMERO.
Todos necesitan el dev environment. Luego T3-002 y T3-003 (CI/CD).
Después pasa a T3-004 (Payments) que es el core monetization.
Trabaja en las ramas agent3/*.
Docker images < 200MB, K8s con health checks, todo IaC.
```

---

## ⚡ REGLAS DE ORO

1. **Los agentes NUNCA editan archivos de otro agente** — solo los suyos
2. **Comunicación via shared-types** — es el contrato entre todos
3. **Si hay bloqueante, mockea y sigue** — no parar nunca
4. **Commits atómicos** — un commit por feature/fix, mensajes descriptivos
5. **Tests antes de PR** — sin tests no hay merge
6. **El Orquestador tiene la última palabra** — puede rechazar y pedir cambios
7. **Documentar TODO** — si no está documentado, no existe
8. **Performance es feature** — medir desde día 1
9. **Security es feature** — no es "lo agregamos después"
10. **LATAM first** — MercadoPago, monedas locales, idiomas regionales, CDN LATAM
