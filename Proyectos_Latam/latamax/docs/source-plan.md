# 🚀 PROYECTO LATAMAX — Clon Completo de Twitter/X para Latinoamérica

## Plan Maestro de Desarrollo Multi-Agente

---

## 1. VISIÓN DEL PRODUCTO

**LatamaX** es una plataforma social completa tipo Twitter/X optimizada para Latinoamérica, con soporte para español/portugués, integración con medios de pago regionales, y funcionalidades culturalmente adaptadas.

---

## 2. ARQUITECTURA TÉCNICA GLOBAL

### Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend Web | Next.js 14 (App Router) + TypeScript + Tailwind CSS |
| Frontend Mobile | React Native (Expo) |
| Backend API | Node.js + Express/Fastify + TypeScript |
| Base de Datos Principal | PostgreSQL 16 + Prisma ORM |
| Cache / Sesiones | Redis |
| Búsqueda | Elasticsearch / Meilisearch |
| Tiempo Real | Socket.IO / WebSockets |
| Cola de Mensajes | BullMQ (Redis-backed) |
| Almacenamiento de Medios | AWS S3 / Cloudflare R2 |
| CDN | Cloudflare |
| Auth | NextAuth.js + JWT + OAuth2 |
| CI/CD | GitHub Actions |
| Infraestructura | Docker + Docker Compose → AWS/GCP |
| Monitoreo | Prometheus + Grafana + Sentry |
| Testing | Jest + Playwright + Supertest |

### Estructura del Monorepo

```
latamax/
├── apps/
│   ├── web/                    # Next.js frontend (AGENTE 1)
│   ├── mobile/                 # React Native app (AGENTE 1)
│   └── api/                    # Backend API (AGENTE 2)
├── packages/
│   ├── database/               # Prisma schema + migrations (AGENTE 2)
│   ├── shared/                 # Types, utils, constants compartidos (AGENTE 2)
│   ├── ui/                     # Componentes UI compartidos (AGENTE 1)
│   └── config/                 # ESLint, TS, Tailwind configs (AGENTE 3)
├── infra/
│   ├── docker/                 # Dockerfiles (AGENTE 3)
│   ├── k8s/                    # Kubernetes manifests (AGENTE 3)
│   ├── terraform/              # IaC (AGENTE 3)
│   └── scripts/                # Deploy, seed, migration scripts (AGENTE 3)
├── docs/                       # Documentación (AGENTE 3)
├── .github/workflows/          # CI/CD pipelines (AGENTE 3)
├── turbo.json
├── package.json
└── README.md
```

---

## 3. ESTRATEGIA DE GITHUB Y BRANCHING

### Modelo de Ramas

```
main (producción)
├── develop (integración)
│   ├── agent-1/frontend-core         ← AGENTE 1
│   ├── agent-1/mobile-app            ← AGENTE 1
│   ├── agent-1/feature-feed          ← AGENTE 1
│   ├── agent-1/feature-profile       ← AGENTE 1
│   ├── agent-1/feature-search        ← AGENTE 1
│   ├── agent-1/feature-notifications-ui ← AGENTE 1
│   ├── agent-1/feature-dm-ui         ← AGENTE 1
│   ├── agent-1/feature-spaces-ui     ← AGENTE 1
│   ├── agent-2/database-schema       ← AGENTE 2
│   ├── agent-2/api-auth              ← AGENTE 2
│   ├── agent-2/api-posts             ← AGENTE 2
│   ├── agent-2/api-users             ← AGENTE 2
│   ├── agent-2/api-media             ← AGENTE 2
│   ├── agent-2/api-realtime          ← AGENTE 2
│   ├── agent-2/api-search            ← AGENTE 2
│   ├── agent-2/api-notifications     ← AGENTE 2
│   ├── agent-2/api-dm                ← AGENTE 2
│   ├── agent-2/api-admin             ← AGENTE 2
│   ├── agent-3/infra-docker          ← AGENTE 3
│   ├── agent-3/ci-cd                 ← AGENTE 3
│   ├── agent-3/monitoring            ← AGENTE 3
│   ├── agent-3/testing-e2e           ← AGENTE 3
│   ├── agent-3/security              ← AGENTE 3
│   └── agent-3/performance           ← AGENTE 3
```

### Reglas de Merge

1. Cada agente trabaja SOLO en sus ramas `agent-N/*`
2. Los PRs van a `develop` — el ORQUESTADOR los revisa
3. De `develop` a `main` solo el ORQUESTADOR puede hacer merge
4. Conflictos los resuelve el ORQUESTADOR o el VALIDADOR
5. Tags de versión: `v0.1.0`, `v0.2.0`, etc.

---

## 4. ROLES DEL EQUIPO

### 🤖 AGENTE 1 — "FRONTEND ARCHITECT" (Claude Code)
**Responsabilidad:** Todo el frontend web y mobile, UI/UX, componentes, vistas, estado del cliente, PWA.

### 🤖 AGENTE 2 — "BACKEND ENGINE" (Codex)
**Responsabilidad:** API REST/GraphQL, base de datos, lógica de negocio, servicios, tiempo real, colas.

### 🤖 AGENTE 3 — "INFRA & QA LEAD" (Gemini Ultra)
**Responsabilidad:** DevOps, CI/CD, testing E2E, seguridad, performance, documentación, monitoreo.

### 🧠 ROL INTERNO: ORQUESTADOR (Tú o un agente dedicado)
**Responsabilidad:**
- Revisa PRs de los 3 agentes antes de merge a `develop`
- Detecta conflictos de interfaces/contratos API
- Prioriza backlog cuando hay bloqueos
- Convoca "sincronizaciones" entre agentes
- Decide orden de integración

### 🔍 ROL INTERNO: VALIDADOR / QA MASTER
**Responsabilidad:**
- Ejecuta test suites después de cada merge a `develop`
- Valida que endpoints API coincidan con lo que consume el frontend
- Pruebas de regresión
- Certifica features como "DONE" o las devuelve con issues
- Valida performance y seguridad

---

## 5. CONTRATOS DE INTERFAZ (API CONTRACT)

> ⚠️ CRÍTICO: Este archivo debe crearse PRIMERO y compartirse entre los 3 agentes antes de que comiencen.

### Archivo: `packages/shared/src/api-contracts.ts`

```typescript
// ========== MODELOS BASE ==========
export interface User {
  id: string;
  username: string;           // @handle
  displayName: string;
  email: string;
  avatarUrl: string | null;
  bannerUrl: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  birthDate: Date | null;
  isVerified: boolean;
  isPrivate: boolean;
  followerCount: number;
  followingCount: number;
  postCount: number;
  lang: 'es' | 'pt' | 'en';
  country: string;            // ISO code: MX, BR, AR, CO, etc.
  createdAt: Date;
  updatedAt: Date;
}

export interface Post {
  id: string;
  authorId: string;
  author: User;
  content: string;            // max 280 chars
  mediaUrls: MediaAttachment[];
  replyToId: string | null;
  quoteOfId: string | null;
  repostOfId: string | null;
  likeCount: number;
  replyCount: number;
  repostCount: number;
  quoteCount: number;
  viewCount: number;
  bookmarkCount: number;
  isLiked: boolean;           // por el usuario actual
  isReposted: boolean;
  isBookmarked: boolean;
  lang: string;
  hashtags: string[];
  mentions: string[];
  pollId: string | null;
  poll: Poll | null;
  createdAt: Date;
}

export interface MediaAttachment {
  id: string;
  url: string;
  thumbnailUrl: string;
  type: 'image' | 'video' | 'gif';
  width: number;
  height: number;
  altText: string | null;
  duration: number | null;    // para videos, en segundos
}

export interface Poll {
  id: string;
  options: PollOption[];
  totalVotes: number;
  endsAt: Date;
  hasVoted: boolean;
  votedOptionId: string | null;
}

export interface PollOption {
  id: string;
  text: string;
  voteCount: number;
  percentage: number;
}

export interface Notification {
  id: string;
  type: 'like' | 'reply' | 'repost' | 'follow' | 'mention' | 'quote' | 'poll_ended' | 'dm';
  actorId: string;
  actor: User;
  postId: string | null;
  post: Post | null;
  read: boolean;
  createdAt: Date;
}

export interface DirectMessage {
  id: string;
  conversationId: string;
  senderId: string;
  sender: User;
  content: string;
  mediaUrls: MediaAttachment[];
  readAt: Date | null;
  createdAt: Date;
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage: DirectMessage | null;
  unreadCount: number;
  updatedAt: Date;
}

export interface TrendingTopic {
  id: string;
  name: string;
  postCount: number;
  category: string | null;
  country: string | null;
}

export interface List {
  id: string;
  name: string;
  description: string | null;
  ownerId: string;
  owner: User;
  isPrivate: boolean;
  memberCount: number;
  followerCount: number;
  bannerUrl: string | null;
  createdAt: Date;
}

export interface Space {
  id: string;
  title: string;
  hostId: string;
  host: User;
  speakers: User[];
  listenerCount: number;
  isLive: boolean;
  scheduledAt: Date | null;
  startedAt: Date | null;
  endedAt: Date | null;
}

// ========== API ENDPOINTS CONTRACT ==========
export interface ApiEndpoints {
  // AUTH
  'POST /api/auth/register': { body: RegisterInput; response: AuthResponse };
  'POST /api/auth/login': { body: LoginInput; response: AuthResponse };
  'POST /api/auth/logout': { response: void };
  'POST /api/auth/refresh': { response: AuthResponse };
  'POST /api/auth/forgot-password': { body: { email: string }; response: void };
  'POST /api/auth/reset-password': { body: { token: string; password: string }; response: void };
  'GET /api/auth/me': { response: User };
  'POST /api/auth/oauth/google': { body: { token: string }; response: AuthResponse };
  'POST /api/auth/oauth/apple': { body: { token: string }; response: AuthResponse };

  // USERS
  'GET /api/users/:username': { response: User };
  'PATCH /api/users/me': { body: UpdateUserInput; response: User };
  'GET /api/users/:id/followers': { query: PaginationQuery; response: PaginatedResponse<User> };
  'GET /api/users/:id/following': { query: PaginationQuery; response: PaginatedResponse<User> };
  'POST /api/users/:id/follow': { response: void };
  'DELETE /api/users/:id/follow': { response: void };
  'POST /api/users/:id/block': { response: void };
  'DELETE /api/users/:id/block': { response: void };
  'POST /api/users/:id/mute': { response: void };
  'DELETE /api/users/:id/mute': { response: void };
  'GET /api/users/suggestions': { query: PaginationQuery; response: PaginatedResponse<User> };

  // POSTS
  'POST /api/posts': { body: CreatePostInput; response: Post };
  'GET /api/posts/:id': { response: Post };
  'DELETE /api/posts/:id': { response: void };
  'GET /api/posts/:id/replies': { query: PaginationQuery; response: PaginatedResponse<Post> };
  'POST /api/posts/:id/like': { response: void };
  'DELETE /api/posts/:id/like': { response: void };
  'POST /api/posts/:id/repost': { response: Post };
  'DELETE /api/posts/:id/repost': { response: void };
  'POST /api/posts/:id/bookmark': { response: void };
  'DELETE /api/posts/:id/bookmark': { response: void };
  'GET /api/posts/:id/likers': { query: PaginationQuery; response: PaginatedResponse<User> };
  'GET /api/posts/:id/reposters': { query: PaginationQuery; response: PaginatedResponse<User> };
  'POST /api/posts/:id/poll/vote': { body: { optionId: string }; response: Poll };

  // FEED
  'GET /api/feed/home': { query: FeedQuery; response: PaginatedResponse<Post> };
  'GET /api/feed/following': { query: FeedQuery; response: PaginatedResponse<Post> };
  'GET /api/feed/user/:id': { query: FeedQuery; response: PaginatedResponse<Post> };
  'GET /api/feed/user/:id/likes': { query: FeedQuery; response: PaginatedResponse<Post> };
  'GET /api/feed/user/:id/media': { query: FeedQuery; response: PaginatedResponse<Post> };
  'GET /api/feed/bookmarks': { query: FeedQuery; response: PaginatedResponse<Post> };

  // SEARCH
  'GET /api/search/posts': { query: SearchQuery; response: PaginatedResponse<Post> };
  'GET /api/search/users': { query: SearchQuery; response: PaginatedResponse<User> };
  'GET /api/search/hashtags': { query: SearchQuery; response: PaginatedResponse<TrendingTopic> };

  // TRENDING
  'GET /api/trending': { query: { country?: string }; response: TrendingTopic[] };
  'GET /api/trending/:country': { response: TrendingTopic[] };

  // NOTIFICATIONS
  'GET /api/notifications': { query: PaginationQuery; response: PaginatedResponse<Notification> };
  'PUT /api/notifications/read-all': { response: void };
  'PUT /api/notifications/:id/read': { response: void };
  'GET /api/notifications/unread-count': { response: { count: number } };

  // DIRECT MESSAGES
  'GET /api/dm/conversations': { query: PaginationQuery; response: PaginatedResponse<Conversation> };
  'POST /api/dm/conversations': { body: { participantIds: string[] }; response: Conversation };
  'GET /api/dm/conversations/:id/messages': { query: PaginationQuery; response: PaginatedResponse<DirectMessage> };
  'POST /api/dm/conversations/:id/messages': { body: CreateMessageInput; response: DirectMessage };
  'PUT /api/dm/conversations/:id/read': { response: void };

  // LISTS
  'GET /api/lists': { response: List[] };
  'POST /api/lists': { body: CreateListInput; response: List };
  'GET /api/lists/:id': { response: List };
  'PATCH /api/lists/:id': { body: UpdateListInput; response: List };
  'DELETE /api/lists/:id': { response: void };
  'POST /api/lists/:id/members': { body: { userId: string }; response: void };
  'DELETE /api/lists/:id/members/:userId': { response: void };
  'GET /api/lists/:id/members': { query: PaginationQuery; response: PaginatedResponse<User> };
  'GET /api/lists/:id/feed': { query: FeedQuery; response: PaginatedResponse<Post> };

  // SPACES (Audio)
  'GET /api/spaces': { response: Space[] };
  'POST /api/spaces': { body: CreateSpaceInput; response: Space };
  'GET /api/spaces/:id': { response: Space };
  'POST /api/spaces/:id/join': { response: void };
  'POST /api/spaces/:id/leave': { response: void };
  'POST /api/spaces/:id/end': { response: void };

  // MEDIA
  'POST /api/media/upload': { body: FormData; response: MediaAttachment };
  'POST /api/media/upload/avatar': { body: FormData; response: { url: string } };
  'POST /api/media/upload/banner': { body: FormData; response: { url: string } };

  // ADMIN
  'GET /api/admin/users': { query: AdminQuery; response: PaginatedResponse<User> };
  'POST /api/admin/users/:id/suspend': { body: { reason: string }; response: void };
  'DELETE /api/admin/users/:id/suspend': { response: void };
  'GET /api/admin/reports': { query: PaginationQuery; response: PaginatedResponse<Report> };
  'PATCH /api/admin/reports/:id': { body: { status: string; resolution: string }; response: Report };
  'GET /api/admin/stats': { response: AdminStats };
  'POST /api/admin/announcements': { body: { content: string }; response: void };

  // SETTINGS
  'GET /api/settings': { response: UserSettings };
  'PATCH /api/settings': { body: Partial<UserSettings>; response: UserSettings };
  'PATCH /api/settings/privacy': { body: PrivacySettings; response: void };
  'PATCH /api/settings/notifications': { body: NotificationSettings; response: void };

  // REPORTS
  'POST /api/reports': { body: CreateReportInput; response: Report };

  // ANALYTICS (para cuentas verificadas)
  'GET /api/analytics/posts': { query: DateRangeQuery; response: PostAnalytics };
  'GET /api/analytics/profile': { query: DateRangeQuery; response: ProfileAnalytics };
}

// ========== INPUT TYPES ==========
export interface RegisterInput {
  email: string;
  username: string;
  displayName: string;
  password: string;
  birthDate: string;
  lang: 'es' | 'pt' | 'en';
  country: string;
}

export interface LoginInput {
  emailOrUsername: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface CreatePostInput {
  content: string;
  mediaIds?: string[];
  replyToId?: string;
  quoteOfId?: string;
  poll?: { options: string[]; durationMinutes: number };
  lang?: string;
}

export interface UpdateUserInput {
  displayName?: string;
  bio?: string;
  location?: string;
  website?: string;
  birthDate?: string;
  lang?: string;
}

export interface CreateMessageInput {
  content: string;
  mediaIds?: string[];
}

export interface CreateListInput {
  name: string;
  description?: string;
  isPrivate?: boolean;
}

export interface UpdateListInput {
  name?: string;
  description?: string;
  isPrivate?: boolean;
}

export interface CreateSpaceInput {
  title: string;
  scheduledAt?: string;
}

export interface CreateReportInput {
  targetType: 'post' | 'user' | 'dm';
  targetId: string;
  reason: string;
  description?: string;
}

// ========== QUERY TYPES ==========
export interface PaginationQuery {
  cursor?: string;
  limit?: number;
}

export interface FeedQuery extends PaginationQuery {
  sort?: 'latest' | 'top';
}

export interface SearchQuery extends PaginationQuery {
  q: string;
  filter?: string;
}

export interface AdminQuery extends PaginationQuery {
  search?: string;
  status?: 'active' | 'suspended';
}

export interface DateRangeQuery {
  from: string;
  to: string;
}

// ========== RESPONSE TYPES ==========
export interface PaginatedResponse<T> {
  data: T[];
  nextCursor: string | null;
  hasMore: boolean;
  total?: number;
}

export interface Report {
  id: string;
  reporterId: string;
  targetType: string;
  targetId: string;
  reason: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  createdAt: Date;
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  lang: 'es' | 'pt' | 'en';
  fontSize: 'sm' | 'md' | 'lg' | 'xl';
  reducedMotion: boolean;
  autoplayVideos: boolean;
  sensitiveContent: boolean;
}

export interface PrivacySettings {
  isPrivate: boolean;
  allowDmsFrom: 'everyone' | 'followers' | 'none';
  allowTagging: 'everyone' | 'followers' | 'none';
  showLocation: boolean;
  discoverableByEmail: boolean;
  discoverableByPhone: boolean;
}

export interface NotificationSettings {
  likes: boolean;
  replies: boolean;
  reposts: boolean;
  follows: boolean;
  mentions: boolean;
  dms: boolean;
  emailDigest: 'none' | 'daily' | 'weekly';
  pushEnabled: boolean;
}

export interface AdminStats {
  totalUsers: number;
  activeUsersToday: number;
  totalPosts: number;
  postsToday: number;
  reportsPending: number;
  topCountries: { country: string; count: number }[];
}

export interface PostAnalytics {
  impressions: number;
  engagements: number;
  engagementRate: number;
  likes: number;
  replies: number;
  reposts: number;
  profileVisits: number;
}

export interface ProfileAnalytics {
  profileVisits: number;
  followerGrowth: number;
  impressions: number;
  topPosts: Post[];
}

// ========== WEBSOCKET EVENTS ==========
export interface WsEvents {
  // Client → Server
  'post:typing': { postId: string };
  'dm:typing': { conversationId: string };
  'dm:read': { conversationId: string };
  'space:join': { spaceId: string };
  'space:leave': { spaceId: string };
  'space:speak': { spaceId: string; audio: ArrayBuffer };

  // Server → Client
  'post:new': { post: Post };
  'post:updated': { post: Post };
  'post:deleted': { postId: string };
  'notification:new': { notification: Notification };
  'dm:new': { message: DirectMessage };
  'dm:typing': { conversationId: string; userId: string };
  'feed:update': { posts: Post[] };
  'trending:update': { topics: TrendingTopic[] };
  'space:updated': { space: Space };
  'space:audio': { spaceId: string; userId: string; audio: ArrayBuffer };
  'user:online': { userId: string };
  'user:offline': { userId: string };
}
```

---

## 6. FASES DEL PROYECTO

### FASE 0 — Setup Fundacional (Día 1) — TODOS LOS AGENTES

### FASE 1 — MVP Core (Días 2-7) — PARALELO

### FASE 2 — Features Sociales (Días 8-12) — PARALELO

### FASE 3 — Features Avanzadas (Días 13-18) — PARALELO

### FASE 4 — Polish & Launch (Días 19-22) — INTEGRACIÓN

---

## 7. BACKLOG COMPLETO POR AGENTE

---

## 📋 AGENTE 1 — FRONTEND ARCHITECT (Claude Code)

### INSTRUCCIONES GENERALES PARA EL AGENTE 1:

```
Eres el AGENTE 1 — FRONTEND ARCHITECT del proyecto LatamaX.
Tu responsabilidad es TODO el frontend: web (Next.js 14) y mobile (React Native/Expo).
Trabajas en el monorepo, carpetas: apps/web/, apps/mobile/, packages/ui/.

REGLAS:
1. Siempre trabaja en ramas agent-1/*
2. Usa TypeScript estricto
3. Sigue los contratos API de packages/shared/src/api-contracts.ts
4. Mobile-first responsive design
5. Soporte para tema claro/oscuro
6. i18n desde el inicio (es, pt, en)
7. Todos los componentes con tests unitarios
8. Accesibilidad WCAG 2.1 AA
9. Usa React Query/TanStack Query para estado del servidor
10. Zustand para estado global del cliente
11. No hagas fetch directo: usa el API client centralizado

STACK FRONTEND:
- Next.js 14 (App Router + Server Components)
- TypeScript
- Tailwind CSS
- Radix UI / Headless UI para primitivas
- React Query (TanStack)
- Zustand
- React Hook Form + Zod
- Framer Motion para animaciones
- next-intl para i18n
- React Native + Expo para mobile
```

### BACKLOG AGENTE 1:

#### FASE 0 — Setup (Sprint 0)

| ID | Tarea | Prioridad | Dependencias | Criterio de Aceptación |
|---|---|---|---|---|
| F0-01 | Inicializar Next.js 14 app con App Router en apps/web/ | P0 | Ninguna | Proyecto arranca con `npm run dev`, estructura de carpetas correcta |
| F0-02 | Configurar Tailwind CSS con design tokens de LatamaX | P0 | F0-01 | Paleta de colores, tipografía, espaciado configurados. Tema claro/oscuro |
| F0-03 | Configurar ESLint + Prettier + husky pre-commit | P0 | F0-01 | Linting pasa sin errores |
| F0-04 | Setup i18n con next-intl (es, pt, en) | P0 | F0-01 | Cambio de idioma funciona, archivos de traducción creados |
| F0-05 | Crear API client centralizado (axios/fetch wrapper) | P0 | Contratos API | Client tipado que consume todos los endpoints del contrato |
| F0-06 | Setup React Query provider + configuración global | P0 | F0-05 | Queries y mutations tipadas |
| F0-07 | Setup Zustand store global (auth, theme, sidebar) | P0 | F0-01 | Stores creados con persistencia |
| F0-08 | Crear layout principal: Sidebar + Main + RightPanel | P0 | F0-02 | Layout responsive 3 columnas desktop, 1 col mobile |
| F0-09 | Inicializar React Native/Expo project en apps/mobile/ | P1 | Ninguna | App corre en simulador iOS/Android |
| F0-10 | Setup packages/ui/ con componentes base compartidos | P0 | F0-02 | Button, Input, Avatar, Modal, Dropdown, Toast exportados |

#### FASE 1 — MVP Core (Sprint 1-2)

| ID | Tarea | Prioridad | Dependencias | Criterio de Aceptación |
|---|---|---|---|---|
| F1-01 | Página de Login con email/password + OAuth buttons | P0 | F0-05, F0-07 | Login funcional, validación, errores mostrados, redirect a home |
| F1-02 | Página de Registro (multi-step: datos, verificación email) | P0 | F0-05 | Registro completo con validación Zod, verificación email |
| F1-03 | Flujo "Olvidé contraseña" (solicitar + resetear) | P1 | F1-01 | Flujo completo de reset password |
| F1-04 | Componente PostCard (tweet) completo | P0 | F0-10 | Muestra autor, contenido, media, contadores, acciones. Like/RT/reply/bookmark/share |
| F1-05 | Componente PostComposer (crear tweet) | P0 | F0-10 | Textarea con contador 280 chars, adjuntar media, botón publicar |
| F1-06 | Feed Home con infinite scroll | P0 | F1-04, F0-06 | Carga posts, scroll infinito con cursor, pull-to-refresh |
| F1-07 | Tabs en Home: "Para ti" / "Siguiendo" | P0 | F1-06 | Switch entre feeds algorítmico y cronológico |
| F1-08 | Página de perfil de usuario completo | P0 | F1-04 | Avatar, banner, bio, stats, tabs (posts/replies/media/likes) |
| F1-09 | Editar perfil (modal con form) | P0 | F1-08 | Editar nombre, bio, avatar, banner, ubicación, website |
| F1-10 | Página de detalle de post (thread view) | P0 | F1-04 | Post principal + replies en árbol, compose reply inline |
| F1-11 | Botón Follow/Unfollow con estado optimista | P0 | F1-08 | Follow/unfollow con UI optimista, rollback on error |
| F1-12 | Lista de seguidores y seguidos | P1 | F1-08 | Páginas con lista paginada |
| F1-13 | Reply a posts (inline composer) | P0 | F1-05, F1-10 | Composer en thread, muestra "Respondiendo a @user" |
| F1-14 | Repost y Quote Post UI | P0 | F1-04 | Repost instantáneo + modal para Quote con texto |
| F1-15 | Media viewer (fotos zoom, galería, video player) | P0 | F1-04 | Lightbox para imágenes, player nativo para video |
| F1-16 | Upload de media en composer (drag & drop, preview) | P0 | F1-05 | Drag & drop, preview, progress bar, hasta 4 imágenes o 1 video |
| F1-17 | Sidebar navegación (Home, Explore, Notifications, Messages, Bookmarks, Lists, Profile, More) | P0 | F0-08 | Todos los links, iconos, active state, responsive collapse |
| F1-18 | Right sidebar: "Qué está pasando" + "A quién seguir" | P1 | F0-08 | Trending topics + sugerencias de usuarios |
| F1-19 | Loading skeletons para todos los componentes | P1 | F1-04, F1-06 | Skeleton loaders animados en feed, perfil, sidebar |
| F1-20 | Error boundaries y estados vacíos | P1 | F1-06 | Páginas de error, empty states con ilustraciones |

#### FASE 2 — Social Features (Sprint 3-4)

| ID | Tarea | Prioridad | Dependencias | Criterio de Aceptación |
|---|---|---|---|---|
| F2-01 | Página de búsqueda con tabs (Posts, Usuarios, Hashtags) | P0 | F0-06 | Búsqueda en tiempo real, filtros, resultados paginados |
| F2-02 | Página Explore / Tendencias | P0 | F1-18 | Trending por país LATAM, categorías, discover |
| F2-03 | Página de hashtag (#topic) | P0 | F2-01 | Feed filtrado por hashtag, stats |
| F2-04 | Notificaciones — página completa | P0 | F1-17 | Lista de notificaciones con tabs (Todo/Menciones), mark as read |
| F2-05 | Notificaciones — badge en sidebar + push browser | P0 | F2-04 | Badge con counter, Web Push API |
| F2-06 | Notificaciones en tiempo real (WebSocket) | P0 | F2-04 | Nuevas notificaciones aparecen sin refresh |
| F2-07 | DM — lista de conversaciones | P0 | F1-17 | Lista de chats con preview, unread count |
| F2-08 | DM — chat view con mensajes | P0 | F2-07 | Mensajes en bubbles, input, send, timestamps |
| F2-09 | DM — tiempo real (typing indicator, nuevos msgs) | P1 | F2-08 | WebSocket: typing dots, mensajes instantáneos |
| F2-10 | DM — enviar media en chat | P1 | F2-08 | Adjuntar imágenes/gifs en DM |
| F2-11 | Bookmarks — página completa | P1 | F1-04 | Lista de posts guardados, opción de eliminar bookmark |
| F2-12 | Polls — crear y votar en encuestas | P0 | F1-05 | UI de poll en composer, poll display en PostCard, votar |
| F2-13 | Share post (copy link, share API nativo) | P1 | F1-04 | Modal de compartir con opciones |
| F2-14 | Embed de links con preview cards (OpenGraph) | P1 | F1-04 | Preview card con imagen, título, descripción del link |
| F2-15 | Emoji picker en composer y DMs | P1 | F1-05, F2-08 | Selector de emojis completo |
| F2-16 | GIF picker (integración Tenor/Giphy) | P1 | F1-05 | Buscar y seleccionar GIFs |
| F2-17 | Autocomplete @mentions y #hashtags en composer | P0 | F1-05 | Dropdown de sugerencias al escribir @ o # |
| F2-18 | Report post/usuario (modal) | P1 | F1-04 | Modal con razones de reporte |
| F2-19 | Block/Mute usuario UI | P1 | F1-08 | Opciones en menú de usuario, confirmación |
| F2-20 | Listas — CRUD y feed de lista | P1 | F1-17 | Crear, editar, eliminar listas. Agregar/quitar miembros. Feed de lista |

#### FASE 3 — Features Avanzadas (Sprint 5-6)

| ID | Tarea | Prioridad | Dependencias | Criterio de Aceptación |
|---|---|---|---|---|
| F3-01 | Spaces (salas de audio) — UI de lobby y room | P1 | F2-06 | Pantalla de Space con speakers, listeners, controles |
| F3-02 | Spaces — controles de audio (mute, raise hand, leave) | P1 | F3-01 | Botones funcionales de audio |
| F3-03 | Settings — Página completa (cuenta, privacidad, notificaciones, display) | P0 | F0-07 | Todas las secciones de settings con forms funcionales |
| F3-04 | Tema oscuro/claro/sistema completo | P0 | F3-03 | Toggle funcional, persiste, respeta system preference |
| F3-05 | Configuración de privacidad UI | P1 | F3-03 | Cuenta privada, quién puede DM, quién puede tagear |
| F3-06 | Analytics dashboard para tu perfil | P2 | F1-08 | Gráficas de impresiones, engagement, crecimiento seguidores |
| F3-07 | PWA setup (manifest, service worker, offline) | P1 | F0-01 | Instalable como app, funciona offline (cached feed) |
| F3-08 | Mobile app — screens principales (React Native) | P1 | F0-09 | Home feed, Profile, Compose, Notifications en mobile |
| F3-09 | Mobile app — navegación (tab bar + stack) | P1 | F3-08 | React Navigation con tabs y stack |
| F3-10 | Mobile app — push notifications (Expo) | P1 | F3-09 | Push notifications en iOS/Android |
| F3-11 | Infinite scroll performance optimization (virtualized lists) | P1 | F1-06 | react-virtual / react-window para feeds grandes |
| F3-12 | Image optimization (next/image, blur placeholders) | P1 | F1-15 | Lazy loading, blur-up, responsive sizes |
| F3-13 | Keyboard shortcuts (j/k navigate, n new post, etc.) | P2 | F1-06 | Atajos de teclado como Twitter |
| F3-14 | "Who to follow" panel inteligente | P2 | F1-18 | Sugerencias basadas en intereses/ubicación |
| F3-15 | Verificación de cuenta — badge y solicitud | P2 | F1-08 | Badge verificado, formulario de solicitud |

#### FASE 4 — Polish (Sprint 7)

| ID | Tarea | Prioridad | Dependencias | Criterio de Aceptación |
|---|---|---|---|---|
| F4-01 | Tests unitarios para TODOS los componentes UI | P0 | Todas | ≥80% coverage en packages/ui y componentes clave |
| F4-02 | Tests de integración para flujos críticos | P0 | Todas | Login, crear post, follow, DM |
| F4-03 | Lighthouse audit: Performance ≥90, A11y ≥90 | P0 | Todas | Scores ≥90 en mobile y desktop |
| F4-04 | SEO: meta tags, OG tags, sitemap, robots.txt | P1 | Todas | SEO completo para pages públicas |
| F4-05 | Animaciones y micro-interacciones finales | P2 | Todas | Like heart animation, smooth transitions |
| F4-06 | Onboarding flow para nuevos usuarios | P1 | F1-02 | Tutorial: seguir cuentas, personalizar perfil, primer post |
| F4-07 | 404 y páginas de error personalizadas | P1 | Todas | Diseño branded para errores |
| F4-08 | Code splitting y bundle optimization | P1 | Todas | Bundle <300KB initial, lazy routes |

---

## 📋 AGENTE 2 — BACKEND ENGINE (Codex)

### INSTRUCCIONES GENERALES PARA EL AGENTE 2:

```
Eres el AGENTE 2 — BACKEND ENGINE del proyecto LatamaX.
Tu responsabilidad es TODO el backend: API, base de datos, lógica de negocio, 
servicios en tiempo real, colas de trabajo, y almacenamiento.
Trabajas en: apps/api/, packages/database/, packages/shared/.

REGLAS:
1. Siempre trabaja en ramas agent-2/*
2. TypeScript estricto en todo
3. DEBES implementar EXACTAMENTE los endpoints de api-contracts.ts
4. Arquitectura: Controllers → Services → Repositories
5. Todos los endpoints con validación Zod
6. Todos los endpoints con tests (unit + integration)
7. Rate limiting en todos los endpoints públicos
8. Logging estructurado con pino/winston
9. Error handling centralizado con códigos HTTP correctos
10. Documentación OpenAPI/Swagger auto-generada
11. Seeds para datos de prueba LATAM
12. Migrations con Prisma (nunca SQL manual en producción)

STACK BACKEND:
- Node.js 20+ con Express/Fastify
- TypeScript
- Prisma ORM + PostgreSQL
- Redis (cache, sessions, rate limiting, pub/sub)
- BullMQ (colas: emails, notificaciones, media processing)
- Socket.IO (WebSockets)
- Zod (validación)
- bcrypt + JWT + refresh tokens
- Multer + Sharp (media upload/processing)
- nodemailer (emails transaccionales)
- Swagger/OpenAPI
```

### BACKLOG AGENTE 2:

#### FASE 0 — Setup (Sprint 0)

| ID | Tarea | Prioridad | Dependencias | Criterio de Aceptación |
|---|---|---|---|---|
| B0-01 | Inicializar Express/Fastify API en apps/api/ | P0 | Ninguna | Server arranca, healthcheck en /api/health |
| B0-02 | Configurar TypeScript, ESLint, paths aliases | P0 | B0-01 | Compilación sin errores |
| B0-03 | Diseñar e implementar schema Prisma COMPLETO | P0 | Contratos API | Todas las tablas: User, Post, Like, Follow, Notification, Conversation, Message, List, ListMember, Space, Report, Poll, PollOption, PollVote, Hashtag, Media, Bookmark, Block, Mute, Settings |
| B0-04 | Configurar PostgreSQL + ejecutar primera migration | P0 | B0-03 | DB creada, tablas creadas, migration registrada |
| B0-05 | Configurar Redis (cache, sessions, pub/sub) | P0 | B0-01 | Conexión Redis exitosa, helpers de cache |
| B0-06 | Setup middleware stack: CORS, helmet, compression, rate-limit, error handler, logger | P0 | B0-01 | Todos los middlewares activos y configurados |
| B0-07 | Crear estructura de carpetas: controllers/, services/, repositories/, middleware/, utils/ | P0 | B0-01 | Estructura limpia con barrel exports |
| B0-08 | Setup validación Zod centralizada (schemas para cada endpoint) | P0 | Contratos API | Schemas Zod para todos los inputs del contrato |
| B0-09 | Configurar BullMQ + workers base | P1 | B0-05 | Queue para emails funcional, worker procesa jobs |
| B0-10 | Script de seed con datos LATAM (usuarios, posts en español/portugués) | P1 | B0-04 | 50+ usuarios, 500+ posts, datos realistas LATAM |

#### FASE 1 — MVP Core (Sprint 1-2)

| ID | Tarea | Prioridad | Dependencias | Criterio de Aceptación |
|---|---|---|---|---|
| B1-01 | POST /api/auth/register — registro con hash bcrypt, verificación email | P0 | B0-03, B0-06, B0-08 | Registro exitoso, email de verificación enviado, password hasheado |
| B1-02 | POST /api/auth/login — login con JWT + refresh token | P0 | B1-01 | Login correcto, tokens generados, refresh token en httpOnly cookie |
| B1-03 | POST /api/auth/refresh — renovar access token | P0 | B1-02 | Nuevo access token con refresh token válido |
| B1-04 | POST /api/auth/logout — invalidar tokens | P0 | B1-02 | Token en blacklist Redis |
| B1-05 | POST /api/auth/forgot-password + reset-password | P1 | B1-01 | Email con link, reset funcional |
| B1-06 | GET /api/auth/me — obtener usuario autenticado | P0 | B1-02 | Retorna user completo del token |
| B1-07 | OAuth Google + Apple | P1 | B1-01 | Login social funcional |
| B1-08 | Middleware de autenticación JWT | P0 | B1-02 | Protege rutas, extrae userId del token |
| B1-09 | GET /api/users/:username — perfil público | P0 | B0-03 | Retorna User con contadores correctos |
| B1-10 | PATCH /api/users/me — editar perfil | P0 | B1-08 | Actualiza campos permitidos, valida con Zod |
| B1-11 | POST/DELETE /api/users/:id/follow — follow/unfollow | P0 | B1-08 | Crea/elimina relación, actualiza contadores atómicamente |
| B1-12 | GET /api/users/:id/followers + /following — listas paginadas | P0 | B1-11 | Cursor-based pagination correcta |
| B1-13 | POST /api/posts — crear post con validación | P0 | B1-08 | Crea post, extrae #hashtags y @mentions, max 280 chars |
| B1-14 | GET /api/posts/:id — obtener post con autor y stats | P0 | B0-03 | Retorna Post completo con isLiked, isReposted, isBookmarked para el user actual |
| B1-15 | DELETE /api/posts/:id — eliminar post (solo autor) | P0 | B1-13 | Solo el autor puede eliminar, soft delete |
| B1-16 | GET /api/posts/:id/replies — replies paginados | P0 | B1-13 | Replies en orden cronológico con cursor pagination |
| B1-17 | POST/DELETE /api/posts/:id/like — like/unlike | P0 | B1-08 | Toggle like, actualiza counter atómicamente |
| B1-18 | POST/DELETE /api/posts/:id/repost — repost/unrepost | P0 | B1-08 | Crea repost, actualiza counter |
| B1-19 | POST/DELETE /api/posts/:id/bookmark — bookmark toggle | P0 | B1-08 | Toggle bookmark |
| B1-20 | GET /api/feed/home — feed algorítmico | P0 | B1-13 | Posts de seguidos + sugeridos, paginación cursor |
| B1-21 | GET /api/feed/following — feed cronológico | P0 | B1-13 | Solo posts de seguidos, cronológico descendente |
| B1-22 | GET /api/feed/user/:id — posts de un usuario | P0 | B1-13 | Posts del usuario con paginación |
| B1-23 | GET /api/feed/user/:id/likes — likes de un usuario | P1 | B1-17 | Posts likeados por el usuario |
| B1-24 | GET /api/feed/user/:id/media — media de un usuario | P1 | B1-13 | Posts con media del usuario |
| B1-25 | GET /api/feed/bookmarks — bookmarks del usuario auth | P1 | B1-19 | Posts guardados |
| B1-26 | POST /api/media/upload — upload de imágenes y video | P0 | B1-08 | Multer + Sharp: resize, compress, thumbnails. S3/R2 storage |
| B1-27 | POST /api/media/upload/avatar + /banner | P0 | B1-26 | Upload y crop de avatar (400x400) y banner (1500x500) |
| B1-28 | Quote post logic en POST /api/posts | P0 | B1-13 | quoteOfId reference, incluir post citado en response |
| B1-29 | GET /api/posts/:id/likers + /reposters | P1 | B1-17 | Listas paginadas de quién dio like/repost |
| B1-30 | GET /api/users/suggestions — sugerencias de follow | P1 | B1-11 | Usuarios populares que no sigues, filtrado por país |

#### FASE 2 — Social Features (Sprint 3-4)

| ID | Tarea | Prioridad | Dependencias | Criterio de Aceptación |
|---|---|---|---|---|
| B2-01 | GET /api/search/posts — búsqueda full-text | P0 | B0-03 | Búsqueda por contenido con Postgres full-text o Meilisearch |
| B2-02 | GET /api/search/users — búsqueda de usuarios | P0 | B0-03 | Búsqueda por username, displayName |
| B2-03 | GET /api/search/hashtags — búsqueda de hashtags | P0 | B0-03 | Hashtags con post_count |
| B2-04 | GET /api/trending — trending topics | P0 | B0-05 | Top hashtags últimas 24h, filtro por país LATAM |
| B2-05 | GET /api/trending/:country — trending por país | P0 | B2-04 | Trending específico para MX, BR, AR, CO, CL, PE, etc. |
| B2-06 | Sistema de notificaciones — servicio completo | P0 | B1-08 | Crear notificación en: like, reply, follow, repost, mention, quote |
| B2-07 | GET /api/notifications — lista paginada | P0 | B2-06 | Notificaciones del usuario con cursor pagination |
| B2-08 | PUT /api/notifications/read-all + /:id/read | P0 | B2-06 | Marcar como leídas |
| B2-09 | GET /api/notifications/unread-count | P0 | B2-06 | Counter de no leídas (cached en Redis) |
| B2-10 | WebSocket server con Socket.IO | P0 | B0-01 | Conexión autenticada, rooms por userId |
| B2-11 | WS: emitir notificaciones en tiempo real | P0 | B2-10, B2-06 | Notificación push inmediata via WS |
| B2-12 | WS: emitir nuevos posts en feed | P1 | B2-10 | "X nuevos posts" en tiempo real |
| B2-13 | POST /api/dm/conversations — crear conversación | P0 | B1-08 | Crear o retornar conversación existente entre users |
| B2-14 | GET /api/dm/conversations — listar conversaciones | P0 | B2-13 | Con último mensaje, unread count, paginación |
| B2-15 | POST /api/dm/conversations/:id/messages — enviar DM | P0 | B2-13 | Crear mensaje, emitir via WS |
| B2-16 | GET /api/dm/conversations/:id/messages — historial | P0 | B2-15 | Mensajes paginados por cursor |
| B2-17 | PUT /api/dm/conversations/:id/read — marcar como leído | P0 | B2-15 | Actualizar readAt |
| B2-18 | WS: DM en tiempo real (nuevo msg + typing) | P0 | B2-10, B2-15 | Mensajes y typing indicator instantáneos |
| B2-19 | POST /api/posts/:id/poll/vote — votar en encuesta | P0 | B1-13 | Crear voto, actualizar counters, prevenir doble voto |
| B2-20 | Lógica de polls en POST /api/posts | P0 | B2-19 | Crear poll con opciones y duración |
| B2-21 | POST/DELETE /api/users/:id/block — block/unblock | P0 | B1-08 | Bloquear usuario, hide posts mutuos |
| B2-22 | POST/DELETE /api/users/:id/mute — mute/unmute | P0 | B1-08 | Silenciar usuario del feed |
| B2-23 | POST /api/reports — crear reporte | P1 | B1-08 | Reporte de post/usuario con razón |
| B2-24 | CRUD /api/lists — Listas completo | P1 | B1-08 | Crear, editar, eliminar listas |
| B2-25 | POST/DELETE /api/lists/:id/members — gestionar miembros | P1 | B2-24 | Agregar/quitar usuarios de lista |
| B2-26 | GET /api/lists/:id/feed — feed de lista | P1 | B2-24 | Posts de miembros de la lista |
| B2-27 | Link preview service (OpenGraph scraping) | P1 | B0-09 | Worker que scrapea OG tags de URLs en posts |
| B2-28 | Hashtag extraction y trending calculation job | P0 | B0-09 | BullMQ job que calcula trending cada 5min |
| B2-29 | Email service (verificación, reset, notificaciones digest) | P1 | B0-09 | Templates HTML, envío via nodemailer/SES |
| B2-30 | Rate limiting por endpoint (configurable) | P0 | B0-06 | Redis-backed rate limiter, límites por rol |

#### FASE 3 — Features Avanzadas (Sprint 5-6)

| ID | Tarea | Prioridad | Dependencias | Criterio de Aceptación |
|---|---|---|---|---|
| B3-01 | CRUD /api/spaces — Spaces de audio | P1 | B2-10 | Crear, listar, obtener space |
| B3-02 | WS: Spaces signaling (join/leave/audio) | P1 | B3-01 | WebRTC signaling para audio rooms |
| B3-03 | GET/PATCH /api/settings — Settings del usuario | P0 | B1-08 | CRUD completo de settings |
| B3-04 | PATCH /api/settings/privacy — Configuración de privacidad | P0 | B3-03 | Cuenta privada, permisos de DM/tag |
| B3-05 | PATCH /api/settings/notifications — Config notificaciones | P0 | B3-03 | Granular notification preferences |
| B3-06 | Sistema de cuentas privadas (approve followers) | P1 | B3-04 | Follow request → approve/deny |
| B3-07 | ADMIN: GET /api/admin/users — listar usuarios | P0 | B1-08 | Solo admin, paginación, búsqueda, filtros |
| B3-08 | ADMIN: POST/DELETE /api/admin/users/:id/suspend | P0 | B3-07 | Suspender/reactivar cuenta con razón |
| B3-09 | ADMIN: GET /api/admin/reports — gestionar reportes | P0 | B3-07 | Lista de reportes, cambiar estado |
| B3-10 | ADMIN: GET /api/admin/stats — dashboard stats | P1 | B3-07 | Métricas: users, posts, engagement, por país |
| B3-11 | GET /api/analytics/posts + /profile — Analytics para users | P2 | B1-08 | Impresiones, engagement, growth (últimos 28 días) |
| B3-12 | Content moderation queue (auto-flag + manual review) | P1 | B3-09 | Auto-flag posts con keywords, queue para revisión |
| B3-13 | Swagger/OpenAPI auto-documentation | P1 | Todas | Docs generadas de Zod schemas, accesibles en /api/docs |
| B3-14 | Caching strategy completa (Redis) | P0 | B0-05 | Cache de perfiles, feeds, trending. Invalidación correcta |
| B3-15 | Database indexes optimization | P0 | B0-03 | Indexes en todas las queries frecuentes, EXPLAIN ANALYZE |
| B3-16 | Soft delete para posts y usuarios | P1 | B1-15 | deletedAt field, no eliminar datos realmente |
| B3-17 | Thread/reply chain resolution | P0 | B1-16 | Construir árbol de replies correctamente |
| B3-18 | Media processing pipeline (thumbnails, compression, formats) | P1 | B1-26 | BullMQ worker: genera thumbnails, comprime, múltiples tamaños |
| B3-19 | Video transcoding worker (HLS/DASH) | P2 | B3-18 | FFmpeg worker para video adaptive streaming |
| B3-20 | Export user data (GDPR/LGPD compliance) | P1 | B1-08 | Endpoint para descargar todos los datos del usuario |

#### FASE 4 — Polish (Sprint 7)

| ID | Tarea | Prioridad | Dependencias | Criterio de Aceptación |
|---|---|---|---|---|
| B4-01 | Tests unitarios para TODOS los services | P0 | Todas | ≥85% coverage en services/ |
| B4-02 | Tests de integración para TODOS los endpoints | P0 | Todas | Supertest para cada endpoint, happy path + error cases |
| B4-03 | Load testing con k6/Artillery | P1 | Todas | Soporta 1000 req/s sin degradación |
| B4-04 | Database backup strategy y recovery plan | P1 | Todas | Script de backup automático, tested restore |
| B4-05 | API versioning strategy | P1 | Todas | /api/v1/ prefix, plan de deprecation |
| B4-06 | Comprehensive error codes y mensajes i18n | P1 | Todas | Errores en es/pt/en |
| B4-07 | Health check completo (DB, Redis, S3, queues) | P0 | Todas | /api/health retorna status de cada servicio |
| B4-08 | Request/response logging con correlation IDs | P1 | Todas | Trazabilidad completa de requests |

---

## 📋 AGENTE 3 — INFRA & QA LEAD (Gemini Ultra)

### INSTRUCCIONES GENERALES PARA EL AGENTE 3:

```
Eres el AGENTE 3 — INFRA & QA LEAD del proyecto LatamaX.
Tu responsabilidad es: infraestructura, DevOps, CI/CD, testing E2E, seguridad,
performance, monitoreo, documentación, y aseguramiento de calidad.
Trabajas en: infra/, .github/, docs/, packages/config/, y tests E2E.

REGLAS:
1. Siempre trabaja en ramas agent-3/*
2. Infrastructure as Code (IaC) — todo en archivos, nada manual
3. Docker first — todo debe correr en containers
4. CI/CD desde día 1
5. Security by design — auditorías automáticas
6. Documentación como código
7. Monitoring y alertas configuradas antes de producción
8. Tests E2E cubren todos los flujos críticos
9. Performance benchmarks documentados
10. Disaster recovery plan documentado

STACK INFRA:
- Docker + Docker Compose (desarrollo)
- GitHub Actions (CI/CD)
- Terraform (IaC para cloud)
- Nginx (reverse proxy)
- PostgreSQL 16 (managed)
- Redis 7 (managed)
- AWS S3 / Cloudflare R2 (media storage)
- Cloudflare (CDN + DNS + DDoS protection)
- Prometheus + Grafana (monitoreo)
- Sentry (error tracking)
- Playwright (E2E testing)
- k6 / Artillery (load testing)
- OWASP ZAP (security scanning)
- Trivy (container security)
```

### BACKLOG AGENTE 3:

#### FASE 0 — Setup (Sprint 0)

| ID | Tarea | Prioridad | Dependencias | Criterio de Aceptación |
|---|---|---|---|---|
| I0-01 | Crear repositorio monorepo con Turborepo | P0 | Ninguna | turbo.json configurado, workspaces, scripts base |
| I0-02 | Docker Compose para desarrollo local (Postgres, Redis, MinIO, API, Web) | P0 | Ninguna | `docker compose up` levanta todo el stack |
| I0-03 | Dockerfile para apps/api/ (multi-stage build) | P0 | I0-02 | Build optimizado <200MB, non-root user |
| I0-04 | Dockerfile para apps/web/ (Next.js standalone) | P0 | I0-02 | Build optimizado, standalone output |
| I0-05 | Dockerfile para apps/mobile/ (Expo build) | P1 | I0-02 | Build de app mobile |
| I0-06 | packages/config/ — ESLint, TypeScript, Tailwind configs compartidos | P0 | I0-01 | Configs importables por todos los packages |
| I0-07 | .env.example con TODAS las variables de entorno documentadas | P0 | I0-02 | Archivo completo con comentarios |
| I0-08 | GitHub Actions: CI pipeline básico (lint + typecheck + test) | P0 | I0-01 | Corre en cada PR, bloquea merge si falla |
| I0-09 | GitHub Actions: Build y push Docker images | P0 | I0-03, I0-04 | Build en PR, push a registry en merge a develop |
| I0-10 | Nginx reverse proxy config (API + Web + WS) | P0 | I0-02 | Proxy a frontend y backend, WebSocket upgrade |
| I0-11 | MinIO (S3 local) para desarrollo | P0 | I0-02 | Bucket configurado, accesible por API |
| I0-12 | Makefile / scripts de setup (make install, make dev, make test, make seed) | P0 | I0-02 | Developer puede levantar todo con 2 comandos |

#### FASE 1 — CI/CD & Dev Infra (Sprint 1-2)

| ID | Tarea | Prioridad | Dependencias | Criterio de Aceptación |
|---|---|---|---|---|
| I1-01 | GitHub Actions: Test matrix (Node 20, PostgreSQL 16) | P0 | I0-08 | Tests corren en CI con DB real |
| I1-02 | GitHub Actions: PR checks (lint, types, tests, build) | P0 | I1-01 | Status checks requeridos para merge |
| I1-03 | GitHub Actions: Deploy a staging en merge a develop | P0 | I0-09 | Auto-deploy a staging environment |
| I1-04 | GitHub Actions: Deploy a producción en tag/release | P0 | I1-03 | Deploy manual con approval |
| I1-05 | Staging environment setup (cloud o VPS) | P0 | I1-03 | Staging accesible con URL, DB separada |
| I1-06 | SSL/TLS certificates (Let's Encrypt / Cloudflare) | P0 | I1-05 | HTTPS en staging y producción |
| I1-07 | Environment management (staging, production) con variables | P0 | I0-07 | GitHub Secrets para cada environment |
| I1-08 | Database migration CI check (Prisma migrate) | P0 | I1-01 | Migrations corren automáticamente en deploy |
| I1-09 | Dependabot / Renovate config para updates automáticos | P1 | I0-01 | PRs automáticos para dependencies |
| I1-10 | Git hooks con husky (pre-commit: lint, pre-push: test) | P0 | I0-01 | Hooks configurados y documentados |
| I1-11 | Code coverage report en CI (Codecov/Coveralls) | P1 | I1-01 | Coverage visible en PRs |
| I1-12 | Branch protection rules en GitHub | P0 | I0-01 | develop y main protegidas, require reviews |

#### FASE 2 — Testing E2E & Security (Sprint 3-4)

| ID | Tarea | Prioridad | Dependencias | Criterio de Aceptación |
|---|---|---|---|---|
| I2-01 | Setup Playwright para E2E testing | P0 | I0-02 | Playwright configurado, corre en CI |
| I2-02 | E2E: Flujo de registro e inicio de sesión | P0 | I2-01 | Test completo: register → verify → login → see feed |
| I2-03 | E2E: Crear post, like, reply, repost | P0 | I2-01 | CRUD completo de posts |
| I2-04 | E2E: Flujo de follow/unfollow | P0 | I2-01 | Follow → ver en feed → unfollow |
| I2-05 | E2E: Buscar posts y usuarios | P0 | I2-01 | Búsqueda retorna resultados correctos |
| I2-06 | E2E: Mensajes directos completo | P0 | I2-01 | Crear conversación → enviar → recibir → leer |
| I2-07 | E2E: Flujo de notificaciones | P0 | I2-01 | Acción → notificación aparece → mark as read |
| I2-08 | E2E: Editar perfil | P1 | I2-01 | Editar todos los campos, verificar cambios |
| I2-09 | E2E: Settings y preferencias | P1 | I2-01 | Cambiar theme, idioma, privacy |
| I2-10 | Security: OWASP ZAP scan automatizado en CI | P0 | I1-01 | Scan en cada deploy a staging, 0 critical findings |
| I2-11 | Security: Trivy container scan | P0 | I0-03 | Scan de vulnerabilidades en Docker images |
| I2-12 | Security: npm audit en CI | P0 | I1-01 | 0 critical/high vulnerabilities |
| I2-13 | Security: Headers security (CSP, HSTS, X-Frame-Options) | P0 | I0-10 | Headers configurados en Nginx |
| I2-14 | Security: SQL injection testing automatizado | P0 | I2-10 | 0 SQLi findings |
| I2-15 | Security: XSS prevention audit | P0 | I2-10 | Sanitización correcta en inputs |
| I2-16 | Security: CSRF protection | P0 | I2-13 | Tokens CSRF en formularios |
| I2-17 | Security: Rate limiting validation | P0 | I2-10 | Rate limits funcionan correctamente |
| I2-18 | API contract validation tests | P0 | I2-01 | Tests que validan que API responses coinciden con api-contracts.ts |
| I2-19 | Visual regression testing (screenshots) | P2 | I2-01 | Screenshots comparados en CI |
| I2-20 | Accessibility automated testing (axe-core) | P1 | I2-01 | 0 critical a11y violations |

#### FASE 3 — Monitoring & Performance (Sprint 5-6)

| ID | Tarea | Prioridad | Dependencias | Criterio de Aceptación |
|---|---|---|---|---|
| I3-01 | Prometheus + node-exporter setup | P0 | I0-02 | Métricas de Node.js, Express, sistema |
| I3-02 | Grafana dashboards: API performance | P0 | I3-01 | Dashboard: latency, throughput, errors, saturation |
| I3-03 | Grafana dashboards: Database performance | P0 | I3-01 | Dashboard: queries/s, slow queries, connections |
| I3-04 | Grafana dashboards: Business metrics | P1 | I3-01 | Dashboard: signups/day, posts/day, DAU, por país |
| I3-05 | Grafana dashboards: WebSocket connections | P1 | I3-01 | Conexiones activas, mensajes/s |
| I3-06 | Alerting rules (Prometheus/Grafana) | P0 | I3-02 | Alertas: error rate >1%, latency >500ms, disk >80% |
| I3-07 | Sentry setup para error tracking (API + Frontend) | P0 | I0-02 | Errores capturados con stack trace, sourcemaps |
| I3-08 | Sentry: alertas por nuevos errores y spikes | P0 | I3-07 | Notificación Slack/email en nuevos errores |
| I3-09 | Structured logging (JSON) con correlation IDs | P0 | I0-02 | Logs parseables, trazables por request ID |
| I3-10 | Log aggregation (Loki / CloudWatch) | P1 | I3-09 | Logs centralizados y buscables |
| I3-11 | Load testing con k6: endpoints críticos | P0 | I1-05 | Tests de carga para feed, search, auth. Target: 1000 rps |
| I3-12 | Load testing: WebSocket connections | P1 | I3-11 | Target: 10,000 concurrent WS connections |
| I3-13 | Performance profiling: API response times | P0 | I3-11 | p50 <100ms, p95 <500ms, p99 <1s |
| I3-14 | Performance: Database query optimization | P0 | I3-03 | Slow query log, optimize top 10 queries |
| I3-15 | Performance: CDN caching strategy | P1 | I0-10 | Static assets cached, media cached, API no-cache |
| I3-16 | Performance: Image optimization pipeline validation | P1 | I3-13 | WebP conversion, responsive sizes, lazy loading |
| I3-17 | Uptime monitoring (healthchecks.io / UptimeRobot) | P0 | I1-05 | Monitoreo 24/7, alertas en downtime |
| I3-18 | Backup automation: DB + media | P0 | I1-05 | Backups diarios, retención 30 días, tested restore |
| I3-19 | Disaster recovery plan documentado | P1 | I3-18 | RTO <1h, RPO <1h, procedimiento documentado |
| I3-20 | Capacity planning document | P1 | I3-11 | Estimaciones de crecimiento, scaling triggers |

#### FASE 4 — Documentation & Final QA (Sprint 7)

| ID | Tarea | Prioridad | Dependencias | Criterio de Aceptación |
|---|---|---|---|---|
| I4-01 | README.md completo del proyecto | P0 | Todas | Setup, arquitectura, contributing guide |
| I4-02 | docs/architecture.md — Diagrama y explicación de arquitectura | P0 | Todas | Diagramas C4, decisiones técnicas |
| I4-03 | docs/api.md — Documentación de API (además de Swagger) | P1 | Todas | Guía de uso de la API con ejemplos |
| I4-04 | docs/deployment.md — Guía de deployment paso a paso | P0 | Todas | Cualquiera puede deployar siguiendo el doc |
| I4-05 | docs/runbook.md — Runbook de operaciones | P0 | Todas | Procedimientos para incidentes comunes |
| I4-06 | docs/security.md — Política de seguridad y contacto | P0 | Todas | SECURITY.md, responsible disclosure |
| I4-07 | Production environment final setup | P0 | I1-04 | Producción live, DNS configurado, SSL activo |
| I4-08 | Smoke tests en producción | P0 | I4-07 | Tests básicos pasan en producción |
| I4-09 | Final E2E test suite completo en staging | P0 | I2-01 a I2-09 | Todos los E2E tests pasan |
| I4-10 | Performance benchmark final report | P0 | I3-11 | Reporte documentado de performance |
| I4-11 | Security audit final report | P0 | I2-10 | Reporte de seguridad, 0 critical/high issues |
| I4-12 | CONTRIBUTING.md + PR templates + issue templates | P1 | Todas | Templates listos para open source |
| I4-13 | CHANGELOG.md con todas las versiones | P1 | Todas | Changelog siguiendo conventional commits |
| I4-14 | License file (MIT/Apache) | P1 | Todas | LICENSE agregado |

---

## 8. PROTOCOLO DE SINCRONIZACIÓN ENTRE AGENTES

### Puntos de Sincronización Obligatorios

```
SYNC POINT 1 — Después de FASE 0:
  ✅ Contratos API compartidos y aprobados por los 3 agentes
  ✅ Monorepo y Docker Compose funcionando
  ✅ Cada agente puede correr su parte con `docker compose up`
  GATE: Orquestador valida setup completo antes de continuar

SYNC POINT 2 — Después de FASE 1:
  ✅ API de auth y posts funcional (Agente 2)
  ✅ Frontend consume API de auth y muestra feed (Agente 1)
  ✅ CI/CD pipeline funcionando (Agente 3)
  ✅ E2E básico pasa (Agente 3)
  GATE: Validador ejecuta E2E tests y certifica integración

SYNC POINT 3 — Después de FASE 2:
  ✅ Search, notifications, DMs funcionales end-to-end
  ✅ WebSockets integrados frontend ↔ backend
  ✅ Security scan limpio
  GATE: Validador certifica todas las features sociales

SYNC POINT 4 — Después de FASE 3:
  ✅ Spaces, admin panel, settings funcionales
  ✅ Monitoring y alerting activos
  ✅ Performance benchmarks cumplidos
  GATE: Validador certifica readiness para producción

SYNC POINT 5 — FASE 4 LAUNCH:
  ✅ Todos los tests pasan (unit + integration + E2E)
  ✅ Security audit limpio
  ✅ Performance targets met
  ✅ Documentación completa
  ✅ Deploy a producción exitoso
  GATE: Go/No-Go decision
```

### Reglas de Independencia vs. Dependencia

```
AGENTE 1 (Frontend) puede trabajar INDEPENDIENTEMENTE en:
  - Todos los componentes UI (con datos mock)
  - Layout, navegación, responsive design
  - i18n, temas, PWA
  - Mobile app screens
  DEPENDE del AGENTE 2 para:
  - Endpoints funcionales (puede usar MSW/mock server mientras tanto)
  DEPENDE del AGENTE 3 para:
  - CI/CD pipeline, deployment

AGENTE 2 (Backend) puede trabajar INDEPENDIENTEMENTE en:
  - Todo el backend sin esperar frontend
  - Database schema, migrations
  - API endpoints (testeable con curl/Postman)
  - Workers y colas
  DEPENDE del AGENTE 3 para:
  - Docker configs, CI/CD, deployment
  NO depende del AGENTE 1 para nada

AGENTE 3 (Infra/QA) puede trabajar INDEPENDIENTEMENTE en:
  - Docker, CI/CD, monitoring, documentation
  - Security configs
  DEPENDE del AGENTE 1 y AGENTE 2 para:
  - E2E tests (necesita frontend + backend funcionando)
  - Performance tests (necesita API deployada)
```

### Mock Strategy para Desarrollo Paralelo

```
AGENTE 1 usa MSW (Mock Service Worker) para mockear la API:
  - Crear handlers para todos los endpoints del contrato
  - Los mocks retornan datos realistas LATAM
  - Cuando el Agente 2 tenga endpoints listos, desactivar mocks gradualmente

AGENTE 3 usa Docker Compose para levantar todo:
  - Servicios stub para testing de infra
  - Cuando los agentes 1 y 2 mergeen, usar código real
```

---

## 9. PROTOCOLO DEL ORQUESTADOR

```markdown
## Checklist del Orquestador — Ejecutar en cada SYNC POINT

### Pre-merge Review:
□ Los 3 agentes han completado sus tareas de la fase actual
□ No hay conflictos de merge entre ramas agent-*
□ Los contratos API se respetan (types coinciden)
□ Naming conventions son consistentes
□ No hay secrets hardcodeados
□ No hay TODO/FIXME sin ticket

### Integration Check:
□ `docker compose up` levanta todo sin errores
□ Frontend se conecta a la API correctamente
□ WebSocket connections funcionan
□ Autenticación funciona end-to-end
□ No hay errores en console del browser
□ No hay errores en logs del servidor

### Quality Check:
□ Linting pasa en todo el monorepo
□ TypeScript compila sin errores
□ Tests unitarios pasan (≥80% coverage)
□ Tests de integración pasan
□ E2E tests pasan
□ No hay regresiones

### Post-merge:
□ Deploy a staging exitoso
□ Smoke tests pasan en staging
□ Notificar a los 3 agentes que pueden continuar con la siguiente fase
□ Actualizar Kanban/backlog con status
```

---

## 10. PROTOCOLO DEL VALIDADOR / QA MASTER

```markdown
## Checklist del Validador — Para cada Feature

### Functional Testing:
□ Feature funciona según spec del contrato
□ Happy path funciona completamente
□ Edge cases manejados (inputs vacíos, caracteres especiales, emoji, ñ, acentos)
□ Error handling funciona (muestra errores útiles al usuario)
□ Validaciones del formulario funcionan
□ Datos persisten correctamente (refresh → datos siguen ahí)

### Cross-browser Testing:
□ Chrome ✓
□ Firefox ✓
□ Safari ✓
□ Mobile Chrome ✓
□ Mobile Safari ✓

### Responsive Testing:
□ Mobile (375px) ✓
□ Tablet (768px) ✓
□ Desktop (1280px) ✓
□ Desktop grande (1920px) ✓

### Accessibility:
□ Keyboard navigation funciona
□ Screen reader compatible
□ Color contrast suficiente
□ Focus indicators visibles
□ Alt text en imágenes

### Performance:
□ Página carga en <3s
□ No hay memory leaks
□ Scroll suave (60fps)
□ Imágenes optimizadas

### LATAM-specific:
□ Contenido en español se muestra correctamente (ñ, acentos, ¿, ¡)
□ Contenido en portugués se muestra correctamente (ç, ã, õ)
□ Emojis de banderas LATAM funcionan
□ Timezone handling correcto para LATAM (UTC-3 a UTC-8)
□ Trending funciona por país LATAM

### Certificación:
□ Feature APROBADA → Mover a "Done" en backlog
□ Feature RECHAZADA → Crear issues específicos, devolver al agente responsable
```

---

## 11. RESUMEN DE TAREAS POR AGENTE

| Agente | Fase 0 | Fase 1 | Fase 2 | Fase 3 | Fase 4 | TOTAL |
|--------|--------|--------|--------|--------|--------|-------|
| **Agente 1** (Frontend) | 10 | 20 | 20 | 15 | 8 | **73** |
| **Agente 2** (Backend) | 10 | 30 | 30 | 20 | 8 | **98** |
| **Agente 3** (Infra/QA) | 12 | 12 | 20 | 20 | 14 | **78** |
| **TOTAL** | 32 | 62 | 70 | 55 | 30 | **249** |

---

## 12. INSTRUCCIÓN FINAL PARA CADA AGENTE

### Para pegar directamente en cada agente:

#### → AGENTE 1 (Claude Code):
```
Clona el repo: git clone <repo-url> && cd latamax
Crea tu rama: git checkout -b agent-1/frontend-core
Lee: packages/shared/src/api-contracts.ts (TU BIBLIA)
Empieza con: F0-01 a F0-10 (Setup)
Luego: F1-01 a F1-20 (MVP)
Usa MSW para mockear API mientras Agente 2 desarrolla
Haz commit frecuentes y PRs a develop cuando termines cada grupo de tareas
NO toques: apps/api/, infra/, .github/
```

#### → AGENTE 2 (Codex):
```
Clona el repo: git clone <repo-url> && cd latamax
Crea tu rama: git checkout -b agent-2/database-schema
Lee: packages/shared/src/api-contracts.ts (TU BIBLIA)
Empieza con: B0-01 a B0-10 (Setup + Schema)
Luego: B1-01 a B1-30 (MVP API)
Testea con curl/Postman cada endpoint
Haz commit frecuentes y PRs a develop cuando termines cada grupo
NO toques: apps/web/, apps/mobile/, infra/, .github/
```

#### → AGENTE 3 (Gemini Ultra):
```
Clona el repo: git clone <repo-url> && cd latamax
Crea tu rama: git checkout -b agent-3/infra-docker
CREA EL REPO INICIAL: monorepo structure, turbo.json, Docker Compose
Empieza con: I0-01 a I0-12 (Infra Setup)
Luego: I1-01 a I1-12 (CI/CD)
Comparte Docker Compose con los otros agentes PRIMERO
Haz commit frecuentes y PRs a develop
NO toques: apps/web/ code, apps/api/ code (solo Dockerfiles y configs)
```

---

## 13. FEATURES ESPECÍFICAS LATAM

1. **Idiomas:** Español (default), Portugués (Brasil), Inglés
2. **Trending por país:** México, Brasil, Argentina, Colombia, Chile, Perú, Venezuela, Ecuador, Guatemala, Cuba, Rep. Dominicana, Honduras, Paraguay, Uruguay, Bolivia, Costa Rica, Panamá, Nicaragua, El Salvador
3. **Timezone support:** UTC-3 (Argentina, Brasil) a UTC-8 (México Pacífico)
4. **Caracteres especiales:** Soporte completo ñ, Ñ, acentos (á,é,í,ó,ú), ç, ã, õ, ¿, ¡
5. **Content moderation:** Filtros de contenido en español y portugués
6. **Cultural events:** Trending para eventos LATAM (Copa América, Día de Muertos, Carnaval, etc.)
7. **Payment integration ready:** Estructura para Mercado Pago, PSE, OXXO (futuro monetización)

---

*Plan generado para ejecución paralela con 3 agentes AI. Estimación: 22 días de desarrollo intensivo con los 3 agentes trabajando 24/7.*
