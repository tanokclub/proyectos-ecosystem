# 🚀 PINTERESTLATAM — Plan Maestro de Desarrollo
## Clon Completo de Pinterest para Latinoamérica

---

## 📋 ÍNDICE

1. Visión General del Proyecto
2. Arquitectura Técnica
3. Estructura de Roles y Agentes
4. Estrategia de Git y Ramas
5. Fases del Proyecto
6. Backlog Completo por Agente
7. Protocolo de Integración y Validación
8. Criterios de Aceptación
9. Guía de Despliegue

---

## 1. VISIÓN GENERAL DEL PROYECTO

**Nombre:** PinterestLatam (nombre código: "PinLat")
**Objetivo:** Crear un clon funcional completo de Pinterest optimizado para el mercado latinoamericano, con soporte multilenguaje (español, portugués), integración con medios de pago regionales, CDN optimizado para LATAM y funcionalidades sociales adaptadas a la cultura latina.

### Funcionalidades Core (MVP Completo):
- Registro/Login (email, Google, Facebook, Apple)
- Feed personalizado con algoritmo de recomendación
- Creación, edición y eliminación de Pins
- Tableros (boards) públicos y privados
- Búsqueda visual (image search) y por texto
- Sistema de seguimiento (follow/unfollow)
- Mensajería directa
- Notificaciones push y en-app
- Perfil de usuario completo
- Comentarios y reacciones en Pins
- Compartir en redes sociales
- Extensión de navegador para guardar pins
- Sistema de reportes y moderación
- Analytics para creadores
- Cuentas de negocio
- Anuncios (Ads platform básica)
- PWA + App móvil (React Native)
- Panel de administración

### Stack Tecnológico Elegido:

| Capa | Tecnología |
|------|-----------|
| Frontend Web | Next.js 15 + TypeScript + Tailwind CSS |
| Frontend Móvil | React Native + Expo |
| Backend API | Node.js + NestJS + TypeScript |
| Base de Datos Principal | PostgreSQL 16 + Prisma ORM |
| Cache | Redis 7 |
| Búsqueda | Elasticsearch / Meilisearch |
| Almacenamiento | AWS S3 / Cloudflare R2 |
| CDN | Cloudflare |
| Cola de mensajes | BullMQ (Redis-based) |
| Realtime | Socket.io |
| Auth | NextAuth.js + JWT |
| CI/CD | GitHub Actions |
| Infraestructura | Docker + Docker Compose + Terraform |
| Monitoreo | Grafana + Prometheus |
| ML/Recomendaciones | Python + FastAPI (microservicio) |

---

## 2. ARQUITECTURA TÉCNICA

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENTE (USUARIO)                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │  Web (Next.js)│  │ Mobile (RN)  │  │ Ext Browser  │       │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘       │
└─────────┼──────────────────┼──────────────────┼─────────────┘
          │                  │                  │
          ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│                   CDN (Cloudflare)                           │
│              Rate Limiting / WAF / DDoS                      │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                    API GATEWAY (NestJS)                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │Auth Guard │ │Rate Limit│ │Validation│ │Logging   │       │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘       │
└────────────────────────┬────────────────────────────────────┘
                         │
    ┌────────────────────┼────────────────────┐
    ▼                    ▼                    ▼
┌──────────┐     ┌──────────────┐     ┌──────────────┐
│Auth Svc  │     │Core API Svc  │     │ML/Recommend  │
│(NestJS)  │     │(NestJS)      │     │(Python/Fast) │
└────┬─────┘     └──────┬───────┘     └──────┬───────┘
     │                  │                    │
     ▼                  ▼                    ▼
┌──────────┐     ┌──────────────┐     ┌──────────────┐
│PostgreSQL│     │Redis Cache   │     │Elasticsearch │
│(Users/   │     │(Sessions/    │     │(Search Index)│
│ Auth)    │     │ Feed Cache)  │     │              │
└──────────┘     └──────────────┘     └──────────────┘
                         │
                  ┌──────▼──────┐
                  │ BullMQ Jobs │
                  │ (Workers)   │
                  └──────┬──────┘
                         │
              ┌──────────┼──────────┐
              ▼          ▼          ▼
        ┌─────────┐ ┌────────┐ ┌────────────┐
        │Image    │ │Email   │ │Notification│
        │Process  │ │Worker  │ │Worker      │
        │Worker   │ │        │ │(Push/WS)   │
        └────┬────┘ └────────┘ └────────────┘
             │
        ┌────▼────┐
        │S3 / R2  │
        │(Storage)│
        └─────────┘
```

### Estructura del Monorepo:

```
pinlat/
├── apps/
│   ├── web/                    # Next.js frontend
│   ├── mobile/                 # React Native app
│   ├── admin/                  # Admin dashboard (Next.js)
│   ├── api/                    # NestJS backend principal
│   ├── ml-service/             # Python FastAPI (recomendaciones)
│   └── browser-extension/      # Chrome/Firefox extension
├── packages/
│   ├── shared-types/           # TypeScript types compartidos
│   ├── ui/                     # Componentes UI compartidos
│   ├── config/                 # ESLint, TS, Prettier configs
│   ├── database/               # Prisma schema + migrations
│   └── utils/                  # Utilidades compartidas
├── infra/
│   ├── docker/                 # Dockerfiles
│   ├── terraform/              # IaC
│   ├── k8s/                    # Kubernetes manifests
│   └── scripts/                # Deploy scripts
├── docs/
│   ├── api/                    # API documentation
│   ├── architecture/           # Diagramas
│   └── guides/                 # Guías de desarrollo
├── .github/
│   └── workflows/              # CI/CD pipelines
├── turbo.json                  # Turborepo config
├── package.json                # Root package.json
└── README.md
```

---

## 3. ESTRUCTURA DE ROLES Y AGENTES

### 🤖 AGENTE 1 — "ATLAS" (Codex / OpenAI)
**Rol:** Ingeniero Backend Senior + Arquitecto de Datos
**Responsabilidad Principal:** API Backend, Base de Datos, Infraestructura, Workers

### 🤖 AGENTE 2 — "NOVA" (Claude Code / Anthropic)
**Rol:** Ingeniero Frontend Senior + UX Engineer
**Responsabilidad Principal:** Web Frontend, Mobile App, UI/UX, Browser Extension

### 🤖 AGENTE 3 — "TITAN" (Gemini Ultra / Antigravity)
**Rol:** Ingeniero de Plataforma + ML Engineer
**Responsabilidad Principal:** DevOps, CI/CD, ML/Recomendaciones, Search, Realtime, Admin Panel

### 🧠 ROL INTERNO: "ORION" — Orquestador / Tech Lead
**Responsabilidad:** Validar entregables, resolver conflictos de merge, asegurar calidad, crear tareas de integración, sprint reviews.
**Implementación:** Tú (el humano) ejecutas este rol apoyándote en cualquiera de los 3 agentes para revisión cruzada.

### 🔍 ROL INTERNO: "SENTINEL" — QA Lead / Certificador
**Responsabilidad:** Escribir y ejecutar tests E2E, validar que las funciones cumplan criterios de aceptación, reportar bugs.
**Implementación:** Se asigna como tarea cruzada — cada agente escribe tests para el código de OTRO agente (revisión cruzada).

---

## 4. ESTRATEGIA DE GIT Y RAMAS

### Modelo de Ramas (GitFlow Adaptado para Agentes Paralelos):

```
main                          ← Producción (solo merges validados)
  │
  ├── develop                 ← Integración (aquí se juntan los 3 agentes)
  │     │
  │     ├── agent1/backend    ← Rama base de ATLAS
  │     │     ├── agent1/feat/auth-system
  │     │     ├── agent1/feat/pins-crud
  │     │     ├── agent1/feat/boards-api
  │     │     ├── agent1/feat/users-api
  │     │     ├── agent1/feat/search-api
  │     │     ├── agent1/feat/messaging-api
  │     │     ├── agent1/feat/notifications-api
  │     │     ├── agent1/feat/feed-api
  │     │     ├── agent1/feat/ads-api
  │     │     └── agent1/feat/workers
  │     │
  │     ├── agent2/frontend   ← Rama base de NOVA
  │     │     ├── agent2/feat/design-system
  │     │     ├── agent2/feat/auth-pages
  │     │     ├── agent2/feat/feed-ui
  │     │     ├── agent2/feat/pin-detail
  │     │     ├── agent2/feat/boards-ui
  │     │     ├── agent2/feat/profile-ui
  │     │     ├── agent2/feat/search-ui
  │     │     ├── agent2/feat/messaging-ui
  │     │     ├── agent2/feat/mobile-app
  │     │     └── agent2/feat/browser-ext
  │     │
  │     ├── agent3/platform   ← Rama base de TITAN
  │     │     ├── agent3/feat/docker-setup
  │     │     ├── agent3/feat/ci-cd
  │     │     ├── agent3/feat/ml-service
  │     │     ├── agent3/feat/search-engine
  │     │     ├── agent3/feat/realtime
  │     │     ├── agent3/feat/admin-panel
  │     │     ├── agent3/feat/monitoring
  │     │     └── agent3/feat/cdn-storage
  │     │
  │     └── integration/      ← Ramas de integración cruzada
  │           ├── integration/auth-e2e
  │           ├── integration/feed-e2e
  │           └── integration/full-flow
  │
  └── release/v1.0            ← Release candidates
```

### Reglas de Git:

1. **Cada agente trabaja SOLO en su carpeta de rama** (`agent1/*`, `agent2/*`, `agent3/*`)
2. **Nunca push directo a `develop` o `main`** — solo via Pull Request
3. **Merge a `develop` requiere:** Tests pasando + revisión de ORION
4. **Merge a `main` requiere:** QA de SENTINEL + smoke tests + todos los E2E verdes
5. **Conflictos de merge:** ORION los resuelve con apoyo del agente que mejor conozca el código
6. **Contratos de API:** Se definen PRIMERO en `packages/shared-types/` — todos los agentes los respetan
7. **Commits:** Conventional Commits obligatorio (`feat:`, `fix:`, `chore:`, `docs:`)

### Puntos de Sincronización (Sync Points):

| Sync Point | Qué se sincroniza | Quién espera a quién |
|------------|-------------------|---------------------|
| SP-1 | Contratos de API (OpenAPI spec) | Agent2 y Agent3 esperan a Agent1 |
| SP-2 | Design System + Componentes base | Agent2 entrega, Agent3 consume para Admin |
| SP-3 | Docker Compose base funcional | Agent3 entrega, Agent1 y Agent2 consumen |
| SP-4 | Auth flow completo E2E | Los 3 deben estar listos |
| SP-5 | Feed funcional E2E | Los 3 deben estar listos |
| SP-6 | Full integration test | Los 3 deben estar listos |

---

## 5. FASES DEL PROYECTO

### FASE 0 — Fundación (Paralelo, Día 1-2)
> Los 3 agentes trabajan simultáneamente en setup sin dependencias.

### FASE 1 — Core MVP (Día 3-10)
> Funcionalidades esenciales: Auth, Pins, Boards, Feed, Search básica.

### FASE 2 — Social & Engagement (Día 11-16)
> Follow, Comments, Likes, Notifications, Messaging.

### FASE 3 — Avanzado (Día 17-22)
> ML/Recomendaciones, Ads, Analytics, Business Accounts, Browser Extension.

### FASE 4 — Mobile + Polish (Día 23-28)
> React Native app, PWA, Optimización, Admin Panel completo.

### FASE 5 — QA, Integración, Deploy (Día 29-35)
> Testing E2E, Performance, Security audit, Deploy a producción.

---

## 6. BACKLOG COMPLETO POR AGENTE

---

### 🤖 AGENTE 1 — "ATLAS" (Codex) — BACKEND & DATA

---

#### FASE 0: Fundación Backend

**ATLAS-001: Inicializar Monorepo con Turborepo**
```
Rama: agent1/feat/monorepo-setup
Prioridad: P0 (Bloqueante)
Estimación: 2h

INSTRUCCIONES:
1. Inicializar monorepo con Turborepo
2. Crear estructura de carpetas según la arquitectura definida
3. Configurar workspaces en package.json root
4. Configurar turbo.json con pipelines: build, dev, lint, test, type-check
5. Crear packages/config con:
   - tsconfig.base.json
   - eslint config (flat config)
   - prettier config
6. Crear packages/shared-types/ con estructura base
7. Crear README.md con instrucciones de setup

ENTREGABLE:
- Monorepo funcional con `pnpm install` y `pnpm dev` ejecutando
- Todos los workspaces reconocidos
- Linting y TypeScript configurados

CRITERIO DE ACEPTACIÓN:
- [ ] `pnpm install` corre sin errores
- [ ] `pnpm build` compila todos los packages
- [ ] `pnpm lint` funciona en todos los workspaces
- [ ] Estructura de carpetas coincide con la arquitectura
```

**ATLAS-002: Configurar Base de Datos y Prisma Schema**
```
Rama: agent1/feat/database-schema
Prioridad: P0 (Bloqueante)
Estimación: 4h
Dependencia: ATLAS-001

INSTRUCCIONES:
1. Crear packages/database/
2. Instalar y configurar Prisma con PostgreSQL
3. Diseñar e implementar el schema completo:

MODELOS REQUERIDOS:

model User {
  id              String    @id @default(cuid())
  email           String    @unique
  username        String    @unique
  displayName     String
  bio             String?
  avatarUrl       String?
  coverImageUrl   String?
  website         String?
  location        String?   // Ciudad/País LATAM
  language        String    @default("es") // es, pt, en
  country         String?   // Código ISO país LATAM
  isVerified      Boolean   @default(false)
  isBusinessAccount Boolean @default(false)
  accountType     AccountType @default(PERSONAL)
  passwordHash    String?
  googleId        String?   @unique
  facebookId      String?   @unique
  appleId         String?   @unique
  emailVerified   Boolean   @default(false)
  twoFactorEnabled Boolean  @default(false)
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  lastLoginAt     DateTime?
  isActive        Boolean   @default(true)
  isSuspended     Boolean   @default(false)

  // Relaciones
  pins            Pin[]
  boards          Board[]
  savedPins       SavedPin[]
  comments        Comment[]
  likes           Like[]
  followers       Follow[]  @relation("following")
  following       Follow[]  @relation("follower")
  sentMessages    Message[] @relation("sender")
  receivedMessages Message[] @relation("receiver")
  notifications   Notification[]
  reports         Report[]  @relation("reporter")
  reportedContent Report[]  @relation("reported")
  sessions        Session[]
  businessProfile BusinessProfile?
  analytics       UserAnalytics?
  preferences     UserPreference?
}

model Pin {
  id              String    @id @default(cuid())
  title           String
  description     String?
  imageUrl        String
  thumbnailUrl    String?
  originalUrl     String?   // Link fuente
  altText         String?
  width           Int
  height          Int
  dominantColor   String?   // Color dominante para placeholder
  aspectRatio     Float?
  mediaType       MediaType @default(IMAGE)
  videoUrl        String?
  duration        Int?      // Video duration in seconds
  tags            String[]
  categories      String[]
  isOriginal      Boolean   @default(true)
  sourcePin       Pin?      @relation("repins", fields: [sourcePinId], references: [id])
  sourcePinId     String?
  repins          Pin[]     @relation("repins")
  author          User      @relation(fields: [authorId], references: [id])
  authorId        String
  board           Board?    @relation(fields: [boardId], references: [id])
  boardId         String?
  link            String?   // Destination URL
  isPublic        Boolean   @default(true)
  isPinned        Boolean   @default(false) // Destacado
  viewCount       Int       @default(0)
  saveCount       Int       @default(0)
  clickCount      Int       @default(0)
  shareCount      Int       @default(0)
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  // Relaciones
  savedBy         SavedPin[]
  comments        Comment[]
  likes           Like[]
  reports         Report[]  @relation("reportedPin")
  adCampaign      AdCampaign?
  hashTags        PinHashTag[]
  searchIndex     SearchIndex?
}

model Board {
  id              String    @id @default(cuid())
  name            String
  description     String?
  coverImageUrl   String?
  slug            String
  isPublic        Boolean   @default(true)
  isDefault       Boolean   @default(false) // "All Pins" board
  category        String?
  sortOrder       Int       @default(0)
  pinCount        Int       @default(0)
  followerCount   Int       @default(0)
  owner           User      @relation(fields: [ownerId], references: [id])
  ownerId         String
  collaborators   BoardCollaborator[]
  pins            Pin[]
  sections        BoardSection[]
  followers       BoardFollow[]
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@unique([ownerId, slug])
}

model BoardSection {
  id              String    @id @default(cuid())
  name            String
  board           Board     @relation(fields: [boardId], references: [id])
  boardId         String
  sortOrder       Int       @default(0)
  pins            SectionPin[]
  createdAt       DateTime  @default(now())
}

model BoardCollaborator {
  id              String    @id @default(cuid())
  board           Board     @relation(fields: [boardId], references: [id])
  boardId         String
  user            User      @relation(fields: [userId], references: [id])
  userId          String
  role            CollaboratorRole @default(CONTRIBUTOR)
  invitedAt       DateTime  @default(now())
  acceptedAt      DateTime?

  @@unique([boardId, userId])
}

model SavedPin {
  id              String    @id @default(cuid())
  user            User      @relation(fields: [userId], references: [id])
  userId          String
  pin             Pin       @relation(fields: [pinId], references: [id])
  pinId           String
  board           Board?    @relation(fields: [boardId], references: [id])
  boardId         String?
  note            String?
  savedAt         DateTime  @default(now())

  @@unique([userId, pinId])
}

model Follow {
  id              String    @id @default(cuid())
  follower        User      @relation("follower", fields: [followerId], references: [id])
  followerId      String
  following       User      @relation("following", fields: [followingId], references: [id])
  followingId     String
  createdAt       DateTime  @default(now())

  @@unique([followerId, followingId])
}

model BoardFollow {
  id              String    @id @default(cuid())
  user            User      @relation(fields: [userId], references: [id])
  userId          String
  board           Board     @relation(fields: [boardId], references: [id])
  boardId         String
  createdAt       DateTime  @default(now())

  @@unique([userId, boardId])
}

model Comment {
  id              String    @id @default(cuid())
  text            String
  author          User      @relation(fields: [authorId], references: [id])
  authorId        String
  pin             Pin       @relation(fields: [pinId], references: [id])
  pinId           String
  parentComment   Comment?  @relation("replies", fields: [parentId], references: [id])
  parentId        String?
  replies         Comment[] @relation("replies")
  likes           CommentLike[]
  isEdited        Boolean   @default(false)
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}

model Like {
  id              String    @id @default(cuid())
  user            User      @relation(fields: [userId], references: [id])
  userId          String
  pin             Pin       @relation(fields: [pinId], references: [id])
  pinId           String
  reaction        ReactionType @default(LIKE)
  createdAt       DateTime  @default(now())

  @@unique([userId, pinId])
}

model Message {
  id              String    @id @default(cuid())
  content         String
  sender          User      @relation("sender", fields: [senderId], references: [id])
  senderId        String
  receiver        User      @relation("receiver", fields: [receiverId], references: [id])
  receiverId      String
  conversation    Conversation @relation(fields: [conversationId], references: [id])
  conversationId  String
  pinReference    Pin?      @relation(fields: [pinId], references: [id])
  pinId           String?
  isRead          Boolean   @default(false)
  readAt          DateTime?
  messageType     MessageType @default(TEXT)
  createdAt       DateTime  @default(now())
}

model Conversation {
  id              String    @id @default(cuid())
  participants    ConversationParticipant[]
  messages        Message[]
  lastMessageAt   DateTime?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}

model Notification {
  id              String    @id @default(cuid())
  user            User      @relation(fields: [userId], references: [id])
  userId          String
  type            NotificationType
  title           String
  body            String
  data            Json?     // Metadata flexible
  imageUrl        String?
  actionUrl       String?
  isRead          Boolean   @default(false)
  readAt          DateTime?
  createdAt       DateTime  @default(now())
}

model Report {
  id              String    @id @default(cuid())
  reporter        User      @relation("reporter", fields: [reporterId], references: [id])
  reporterId      String
  reportedUser    User?     @relation("reported", fields: [reportedUserId], references: [id])
  reportedUserId  String?
  reportedPin     Pin?      @relation("reportedPin", fields: [reportedPinId], references: [id])
  reportedPinId   String?
  reason          ReportReason
  description     String?
  status          ReportStatus @default(PENDING)
  resolvedAt      DateTime?
  resolvedBy      String?
  createdAt       DateTime  @default(now())
}

model AdCampaign {
  id              String    @id @default(cuid())
  name            String
  pin             Pin       @relation(fields: [pinId], references: [id])
  pinId           String    @unique
  advertiser      User      @relation(fields: [advertiserId], references: [id])
  advertiserId    String
  budget          Float
  spent           Float     @default(0)
  currency        String    @default("USD")
  targetCountries String[]  // Países LATAM target
  targetAgeMin    Int?
  targetAgeMax    Int?
  targetGender    String?
  targetInterests String[]
  status          CampaignStatus @default(DRAFT)
  startDate       DateTime?
  endDate         DateTime?
  impressions     Int       @default(0)
  clicks          Int       @default(0)
  saves           Int       @default(0)
  cpc             Float?    // Cost per click
  cpm             Float?    // Cost per mille
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}

model BusinessProfile {
  id              String    @id @default(cuid())
  user            User      @relation(fields: [userId], references: [id])
  userId          String    @unique
  businessName    String
  businessType    String
  website         String?
  taxId           String?   // RFC, CNPJ, RUT, etc.
  country         String
  address         String?
  phone           String?
  isVerified      Boolean   @default(false)
  createdAt       DateTime  @default(now())
}

model SearchIndex {
  id              String    @id @default(cuid())
  pinId           String    @unique
  pin             Pin       @relation(fields: [pinId], references: [id])
  textContent     String    // Title + Description + Tags
  embedding       Float[]?  // Vector embedding for ML search
  indexedAt       DateTime  @default(now())
}

model HashTag {
  id              String    @id @default(cuid())
  name            String    @unique
  usageCount      Int       @default(0)
  pins            PinHashTag[]
  trendingScore   Float     @default(0)
  createdAt       DateTime  @default(now())
}

model PinHashTag {
  pin             Pin       @relation(fields: [pinId], references: [id])
  pinId           String
  hashTag         HashTag   @relation(fields: [hashTagId], references: [id])
  hashTagId       String

  @@id([pinId, hashTagId])
}

// ENUMS
enum AccountType { PERSONAL, BUSINESS, CREATOR }
enum MediaType { IMAGE, VIDEO, GIF }
enum CollaboratorRole { VIEWER, CONTRIBUTOR, ADMIN }
enum ReactionType { LIKE, LOVE, IDEA, HAHA, WOW }
enum MessageType { TEXT, PIN_SHARE, IMAGE, SYSTEM }
enum NotificationType {
  PIN_LIKE, PIN_COMMENT, PIN_SAVE, PIN_REPIN
  FOLLOW, BOARD_INVITE, BOARD_FOLLOW
  MESSAGE, MENTION
  SYSTEM, AD_REPORT
}
enum ReportReason {
  SPAM, NUDITY, VIOLENCE, HARASSMENT,
  MISINFORMATION, COPYRIGHT, SELF_HARM, OTHER
}
enum ReportStatus { PENDING, REVIEWING, RESOLVED, DISMISSED }
enum CampaignStatus { DRAFT, ACTIVE, PAUSED, COMPLETED, CANCELLED }

4. Crear seed script con datos de ejemplo LATAM
5. Generar Prisma Client
6. Crear migration inicial
7. Documentar ERD (Entity Relationship Diagram)

ENTREGABLE:
- Schema Prisma completo
- Migration inicial ejecutable
- Seed script con 50+ users, 200+ pins, 30+ boards de ejemplo LATAM
- ERD documentado

CRITERIO DE ACEPTACIÓN:
- [ ] `npx prisma migrate dev` ejecuta sin errores
- [ ] `npx prisma db seed` puebla la BD correctamente
- [ ] Todas las relaciones son consistentes
- [ ] Índices optimizados para queries frecuentes
```

**ATLAS-003: Setup NestJS Backend API**
```
Rama: agent1/feat/api-setup
Prioridad: P0
Estimación: 3h
Dependencia: ATLAS-001

INSTRUCCIONES:
1. Crear apps/api/ con NestJS + TypeScript
2. Configurar módulos base:
   - AppModule (root)
   - ConfigModule (env variables)
   - DatabaseModule (Prisma integration)
   - AuthModule
   - UsersModule
   - PinsModule
   - BoardsModule
   - SearchModule
   - MessagingModule
   - NotificationsModule
   - FeedModule
   - AdsModule
   - ReportsModule
   - UploadModule
   - HealthModule
3. Configurar:
   - Swagger/OpenAPI documentation
   - Global validation pipes (class-validator)
   - Global exception filters
   - Request logging interceptor
   - CORS configuration (permitir dominios LATAM)
   - Helmet security headers
   - Rate limiting (throttle)
   - Compression
4. Crear HealthController con endpoint /health
5. Configurar jest para testing
6. Crear .env.example con todas las variables

ENTREGABLE:
- NestJS server corriendo en puerto 3001
- Swagger UI accesible en /api/docs
- Health check respondiendo 200
- Todos los módulos registrados (vacíos por ahora)

CRITERIO DE ACEPTACIÓN:
- [ ] `pnpm dev --filter api` inicia sin errores
- [ ] GET /health retorna { status: 'ok' }
- [ ] Swagger UI muestra la documentación
- [ ] Las variables de entorno se cargan correctamente
- [ ] Tests unitarios base pasan
```

**ATLAS-004: Definir Contratos de API (OpenAPI Spec)**
```
Rama: agent1/feat/api-contracts
Prioridad: P0 (BLOQUEANTE para Agent2 y Agent3)
Estimación: 4h
Dependencia: ATLAS-002, ATLAS-003

INSTRUCCIONES:
1. Crear packages/shared-types/src/ con todos los DTOs y tipos TypeScript:
   - auth.types.ts (LoginDTO, RegisterDTO, TokenResponse, etc.)
   - user.types.ts (UserProfile, UpdateUserDTO, etc.)
   - pin.types.ts (CreatePinDTO, PinResponse, PinFeed, etc.)
   - board.types.ts (CreateBoardDTO, BoardResponse, etc.)
   - comment.types.ts (CreateCommentDTO, CommentResponse, etc.)
   - search.types.ts (SearchQuery, SearchResults, etc.)
   - message.types.ts (SendMessageDTO, ConversationResponse, etc.)
   - notification.types.ts (NotificationResponse, etc.)
   - feed.types.ts (FeedRequest, FeedResponse, etc.)
   - ad.types.ts (CreateAdDTO, AdAnalytics, etc.)
   - common.types.ts (PaginationDTO, SortDTO, ErrorResponse, etc.)

2. Generar OpenAPI spec completo (JSON/YAML) documentando TODOS los endpoints:

ENDPOINTS COMPLETOS:

# Auth
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
POST   /api/v1/auth/refresh
POST   /api/v1/auth/forgot-password
POST   /api/v1/auth/reset-password
POST   /api/v1/auth/verify-email
GET    /api/v1/auth/google
GET    /api/v1/auth/google/callback
GET    /api/v1/auth/facebook
GET    /api/v1/auth/facebook/callback
POST   /api/v1/auth/apple
POST   /api/v1/auth/2fa/enable
POST   /api/v1/auth/2fa/verify
DELETE /api/v1/auth/2fa/disable

# Users
GET    /api/v1/users/me
PATCH  /api/v1/users/me
DELETE /api/v1/users/me
GET    /api/v1/users/:username
GET    /api/v1/users/:username/pins
GET    /api/v1/users/:username/boards
GET    /api/v1/users/:username/followers
GET    /api/v1/users/:username/following
POST   /api/v1/users/:username/follow
DELETE /api/v1/users/:username/follow
GET    /api/v1/users/:username/activity
PATCH  /api/v1/users/me/preferences
POST   /api/v1/users/me/avatar
POST   /api/v1/users/me/cover

# Pins
POST   /api/v1/pins
GET    /api/v1/pins/:id
PATCH  /api/v1/pins/:id
DELETE /api/v1/pins/:id
POST   /api/v1/pins/:id/save
DELETE /api/v1/pins/:id/save
POST   /api/v1/pins/:id/like
DELETE /api/v1/pins/:id/like
POST   /api/v1/pins/:id/repin
GET    /api/v1/pins/:id/comments
POST   /api/v1/pins/:id/comments
PATCH  /api/v1/pins/:id/comments/:commentId
DELETE /api/v1/pins/:id/comments/:commentId
POST   /api/v1/pins/:id/report
GET    /api/v1/pins/:id/related
POST   /api/v1/pins/:id/share
GET    /api/v1/pins/trending
GET    /api/v1/pins/categories

# Boards
POST   /api/v1/boards
GET    /api/v1/boards/:id
PATCH  /api/v1/boards/:id
DELETE /api/v1/boards/:id
GET    /api/v1/boards/:id/pins
POST   /api/v1/boards/:id/pins
DELETE /api/v1/boards/:id/pins/:pinId
POST   /api/v1/boards/:id/sections
PATCH  /api/v1/boards/:id/sections/:sectionId
DELETE /api/v1/boards/:id/sections/:sectionId
POST   /api/v1/boards/:id/collaborators
DELETE /api/v1/boards/:id/collaborators/:userId
POST   /api/v1/boards/:id/follow
DELETE /api/v1/boards/:id/follow
PATCH  /api/v1/boards/:id/reorder

# Feed
GET    /api/v1/feed/home
GET    /api/v1/feed/explore
GET    /api/v1/feed/following
GET    /api/v1/feed/trending
GET    /api/v1/feed/category/:category

# Search
GET    /api/v1/search/pins
GET    /api/v1/search/boards
GET    /api/v1/search/users
GET    /api/v1/search/autocomplete
POST   /api/v1/search/visual  (image-based search)
GET    /api/v1/search/trending

# Messages
GET    /api/v1/messages/conversations
POST   /api/v1/messages/conversations
GET    /api/v1/messages/conversations/:id
POST   /api/v1/messages/conversations/:id/messages
PATCH  /api/v1/messages/conversations/:id/read
DELETE /api/v1/messages/conversations/:id

# Notifications
GET    /api/v1/notifications
PATCH  /api/v1/notifications/:id/read
PATCH  /api/v1/notifications/read-all
GET    /api/v1/notifications/unread-count
PATCH  /api/v1/notifications/settings

# Upload
POST   /api/v1/upload/image
POST   /api/v1/upload/video
DELETE /api/v1/upload/:key

# Ads (Business)
POST   /api/v1/ads/campaigns
GET    /api/v1/ads/campaigns
GET    /api/v1/ads/campaigns/:id
PATCH  /api/v1/ads/campaigns/:id
DELETE /api/v1/ads/campaigns/:id
GET    /api/v1/ads/campaigns/:id/analytics
POST   /api/v1/ads/campaigns/:id/activate
POST   /api/v1/ads/campaigns/:id/pause

# Analytics
GET    /api/v1/analytics/profile
GET    /api/v1/analytics/pins/:id
GET    /api/v1/analytics/boards/:id
GET    /api/v1/analytics/audience
GET    /api/v1/analytics/top-pins

# Admin (protegido)
GET    /api/v1/admin/users
PATCH  /api/v1/admin/users/:id/suspend
GET    /api/v1/admin/reports
PATCH  /api/v1/admin/reports/:id
GET    /api/v1/admin/stats
GET    /api/v1/admin/content/flagged
DELETE /api/v1/admin/content/:type/:id

3. Publicar spec como archivo JSON en packages/shared-types/openapi.json

ENTREGABLE:
- Todos los tipos TypeScript exportados desde packages/shared-types
- OpenAPI spec completo
- Package publicado internamente

CRITERIO DE ACEPTACIÓN:
- [ ] Todos los DTOs tienen validaciones (class-validator decorators)
- [ ] OpenAPI spec cubre TODOS los endpoints listados
- [ ] Types se importan correctamente desde otros workspaces
- [ ] Respuestas paginadas usan formato consistente
```

---

#### FASE 1: Core MVP Backend

**ATLAS-005: Módulo de Autenticación Completo**
```
Rama: agent1/feat/auth-system
Prioridad: P0
Estimación: 8h
Dependencia: ATLAS-003, ATLAS-004

INSTRUCCIONES:
1. Implementar AuthModule completo en NestJS:
   - Registro con email/password (bcrypt hash)
   - Login con email/password → JWT access + refresh tokens
   - Refresh token rotation
   - Logout (invalidar tokens en Redis)
   - Forgot password → email con token
   - Reset password
   - Email verification con token
   - OAuth2: Google, Facebook, Apple (Passport.js strategies)
   - 2FA con TOTP (speakeasy)
2. Implementar Guards:
   - JwtAuthGuard
   - OptionalAuthGuard (para endpoints que aceptan ambos)
   - RolesGuard (ADMIN, USER, BUSINESS)
3. Implementar middleware:
   - Token blacklist check (Redis)
   - Rate limiting por IP y por usuario
4. Session management:
   - Almacenar sesiones activas en Redis
   - Endpoint para ver/revocar sesiones
5. Tests unitarios para CADA endpoint

ENTREGABLE:
- Auth flow completo funcionando
- Todos los endpoints de /auth respondiendo
- Tests con 90%+ coverage en auth module

CRITERIO DE ACEPTACIÓN:
- [ ] Registro crea usuario y envía email de verificación
- [ ] Login retorna JWT válido
- [ ] Refresh token funciona y rota
- [ ] OAuth con Google funciona end-to-end
- [ ] 2FA se puede habilitar/deshabilitar
- [ ] Rate limiting bloquea después de 5 intentos fallidos
- [ ] Tokens expirados retornan 401
```

**ATLAS-006: CRUD de Pins + Upload de Imágenes**
```
Rama: agent1/feat/pins-crud
Prioridad: P0
Estimación: 8h
Dependencia: ATLAS-005

INSTRUCCIONES:
1. Implementar PinsModule:
   - POST /pins: Crear pin con imagen/video
   - GET /pins/:id: Obtener pin con autor, board, stats
   - PATCH /pins/:id: Editar (solo autor)
   - DELETE /pins/:id: Eliminar (solo autor o admin)
   - POST /pins/:id/save: Guardar en board
   - DELETE /pins/:id/unsave: Quitar de guardados
   - POST /pins/:id/like: Dar like/reacción
   - DELETE /pins/:id/unlike: Quitar like
   - POST /pins/:id/repin: Repinear a board propio
   - GET /pins/:id/related: Pins relacionados
   - GET /pins/trending: Trending en LATAM
   - GET /pins/categories: Categorías disponibles
2. Implementar UploadModule:
   - Presigned URLs para S3/R2
   - Procesamiento de imágenes con Sharp:
     * Resize a múltiples tamaños (thumbnail 236px, medium 564px, large 1200px)
     * WebP conversion
     * EXIF extraction
     * Dominant color extraction
     * Blur hash generation (placeholder)
   - Soporte video: validación formato, thumbnail generation
   - Límites: 20MB imagen, 100MB video, formatos permitidos
3. Implementar workers (BullMQ):
   - ImageProcessingWorker: resize, optimize, upload variants a S3
   - VideoProcessingWorker: transcode, thumbnail, upload
4. Implementar contadores:
   - viewCount: incrementar en GET (con debounce por IP)
   - saveCount, clickCount, shareCount: actualizar con eventos

ENTREGABLE:
- CRUD de Pins completo
- Upload con procesamiento asíncrono
- Workers procesando en background
- Imágenes optimizadas en S3/R2

CRITERIO DE ACEPTACIÓN:
- [ ] Crear pin con imagen funciona end-to-end
- [ ] Imágenes se procesan a 3 tamaños + WebP
- [ ] Thumbnail se genera para videos
- [ ] Pins se pueden guardar/desguardar de boards
- [ ] Like/Unlike funciona con toggle
- [ ] Contadores se actualizan correctamente
- [ ] Validación de formatos y tamaños
- [ ] Error handling para uploads fallidos
```

**ATLAS-007: CRUD de Boards**
```
Rama: agent1/feat/boards-api
Prioridad: P0
Estimación: 5h
Dependencia: ATLAS-005

INSTRUCCIONES:
1. Implementar BoardsModule:
   - CRUD completo de boards
   - Sections dentro de boards
   - Reordenamiento de pins dentro de boards
   - Colaboradores: invitar, aceptar, cambiar rol, remover
   - Board cover: auto-generar desde pins o manual
   - Board follow/unfollow
   - Contadores: pinCount, followerCount
2. Crear board default "All Pins" al registrar usuario
3. Slug generation (url-friendly names)
4. Privacidad: boards privados solo visibles por owner/colaboradores
5. Merge boards
6. Copy board
7. Archive board

ENTREGABLE:
- Boards CRUD completo
- Secciones funcionales
- Colaboradores con roles
- Board default creado automáticamente

CRITERIO DE ACEPTACIÓN:
- [ ] CRUD de boards funciona
- [ ] Secciones se crean/editan/eliminan
- [ ] Colaboradores se invitan y cambian de rol
- [ ] Boards privados no aparecen en búsqueda pública
- [ ] Reordenamiento de pins persiste
- [ ] Slug es único por usuario
```

**ATLAS-008: API de Usuarios y Perfiles**
```
Rama: agent1/feat/users-api
Prioridad: P0
Estimación: 4h
Dependencia: ATLAS-005

INSTRUCCIONES:
1. Implementar UsersModule:
   - GET /users/me → perfil propio completo
   - PATCH /users/me → actualizar perfil
   - DELETE /users/me → desactivar cuenta (soft delete)
   - GET /users/:username → perfil público
   - GET /users/:username/pins → pins del usuario (paginados)
   - GET /users/:username/boards → boards del usuario
   - GET /users/:username/followers → lista seguidores
   - GET /users/:username/following → lista siguiendo
   - POST /users/:username/follow
   - DELETE /users/:username/follow
   - GET /users/:username/activity → actividad reciente
   - PATCH /users/me/preferences → notificaciones, privacidad, idioma
   - POST /users/me/avatar → upload avatar
   - POST /users/me/cover → upload cover image
2. User preferences:
   - language (es, pt, en)
   - country
   - notification settings (email, push, in-app)
   - privacy settings (profile visibility, activity visibility)
   - content preferences (categories de interés)
3. Follow system:
   - Follow/unfollow con notificación
   - Mutual follow detection
   - Suggested users (basado en intereses y país)

ENTREGABLE:
- Perfiles de usuario completos
- Follow system funcional
- Preferencias configurables
- Sugerencias de usuarios

CRITERIO DE ACEPTACIÓN:
- [ ] Perfil se actualiza correctamente
- [ ] Follow/unfollow funciona con notificación
- [ ] Perfil público muestra solo info pública
- [ ] Avatar y cover se suben y procesan
- [ ] Soft delete desactiva pero no elimina datos
- [ ] Paginación funciona en todos los listings
```

**ATLAS-009: API de Comentarios**
```
Rama: agent1/feat/comments-api
Prioridad: P1
Estimación: 3h
Dependencia: ATLAS-006

INSTRUCCIONES:
1. Implementar CommentsModule:
   - GET /pins/:id/comments → comentarios paginados (con replies anidados)
   - POST /pins/:id/comments → crear comentario
   - PATCH /pins/:id/comments/:commentId → editar (solo autor)
   - DELETE /pins/:id/comments/:commentId → eliminar (autor o admin)
   - POST /pins/:id/comments/:commentId/like → like a comentario
   - DELETE /pins/:id/comments/:commentId/like → unlike
2. Soporte para:
   - Replies (un nivel de anidamiento)
   - @menciones (detectar y notificar)
   - Moderación: filtro de palabras prohibidas (configurable por país LATAM)
   - Rate limiting: máx 10 comentarios por minuto

ENTREGABLE:
- Comentarios con replies funcionales
- @menciones con notificaciones
- Filtro de contenido básico

CRITERIO DE ACEPTACIÓN:
- [ ] CRUD de comentarios funciona
- [ ] Replies se anidan correctamente
- [ ] @menciones generan notificaciones
- [ ] Filtro de palabras funciona para es/pt
- [ ] Rate limiting aplica
```

**ATLAS-010: API de Feed**
```
Rama: agent1/feat/feed-api
Prioridad: P0
Estimación: 6h
Dependencia: ATLAS-006, ATLAS-007, ATLAS-008

INSTRUCCIONES:
1. Implementar FeedModule:
   - GET /feed/home → feed personalizado (pins de seguidos + recomendados)
   - GET /feed/explore → descubrimiento (trending + categorías)
   - GET /feed/following → solo pins de seguidos
   - GET /feed/trending → más populares (por país/región)
   - GET /feed/category/:category → pins por categoría
2. Algoritmo de feed home:
   - 60% pins de seguidos (cronológico con decay)
   - 25% pins recomendados (basado en intereses)
   - 15% pins trending en su país/región
   - Deduplicación
   - No mostrar pins ya vistos (tracked en Redis)
3. Cursor-based pagination (infinite scroll)
4. Cache strategy:
   - Feed cache en Redis (TTL 5 min)
   - Invalidación inteligente (nuevo pin → invalidar feed de followers)
5. Feed diversificación:
   - No más de 3 pins consecutivos del mismo autor
   - Mix de categorías
   - Boost a contenido nuevo vs viejo

ENTREGABLE:
- Feed funcional con algoritmo básico
- Infinite scroll con cursor pagination
- Cache con invalidación
- Diversificación de contenido

CRITERIO DE ACEPTACIÓN:
- [ ] Feed home retorna mix correcto (seguidos + recomendados)
- [ ] Explore muestra contenido trending
- [ ] Cursor pagination funciona sin duplicados
- [ ] Cache se invalida cuando hay nuevo contenido
- [ ] No hay pins repetidos en el feed
- [ ] Feed es diferente por usuario
```

**ATLAS-011: API de Search**
```
Rama: agent1/feat/search-api
Prioridad: P1
Estimación: 5h
Dependencia: ATLAS-006

INSTRUCCIONES:
1. Implementar SearchModule:
   - GET /search/pins?q=... → búsqueda de pins
   - GET /search/boards?q=... → búsqueda de boards
   - GET /search/users?q=... → búsqueda de usuarios
   - GET /search/autocomplete?q=... → sugerencias
   - GET /search/trending → trending searches
2. Integración con Elasticsearch/Meilisearch:
   - Indexar pins: title, description, tags, categories, author
   - Indexar boards: name, description
   - Indexar users: username, displayName, bio
   - Búsqueda fuzzy (tolerante a typos)
   - Filtros: categoría, fecha, popularidad, país
   - Ordenamiento: relevancia, reciente, popular
3. Sincronización de índices:
   - Worker que sincroniza PostgreSQL → Search engine
   - Webhook on create/update/delete
4. Autocomplete:
   - Sugerencias de búsqueda (basadas en queries populares)
   - Sugerencias de hashtags
   - Historial de búsqueda del usuario
5. Search analytics:
   - Trackear queries populares
   - Zero-result queries para mejorar
6. Soporte multi-idioma (es, pt, en)

ENTREGABLE:
- Búsqueda funcional en pins, boards, users
- Autocomplete en tiempo real
- Filtros y ordenamiento
- Trending searches

CRITERIO DE ACEPTACIÓN:
- [ ] Búsqueda retorna resultados relevantes
- [ ] Fuzzy search encuentra resultados con typos
- [ ] Autocomplete responde en <100ms
- [ ] Filtros funcionan correctamente
- [ ] Multi-idioma funciona
- [ ] Trending se actualiza basado en queries reales
```

**ATLAS-012: API de Mensajería**
```
Rama: agent1/feat/messaging-api
Prioridad: P1
Estimación: 5h
Dependencia: ATLAS-005, ATLAS-008

INSTRUCCIONES:
1. Implementar MessagingModule:
   - GET /messages/conversations → lista de conversaciones
   - POST /messages/conversations → crear nueva conversación
   - GET /messages/conversations/:id → mensajes de conversación
   - POST /messages/conversations/:id/messages → enviar mensaje
   - PATCH /messages/conversations/:id/read → marcar como leído
   - DELETE /messages/conversations/:id → eliminar conversación
2. Tipos de mensaje:
   - TEXT: texto plano
   - PIN_SHARE: compartir pin en chat
   - IMAGE: enviar imagen
   - SYSTEM: mensajes del sistema
3. Realtime integration:
   - Eventos WebSocket para nuevos mensajes (se conecta con Agent3)
   - Typing indicators
   - Online status
   - Read receipts
4. Push notifications para mensajes no leídos

ENTREGABLE:
- Mensajería REST funcional
- Eventos preparados para WebSocket
- Unread count en API

CRITERIO DE ACEPTACIÓN:
- [ ] Crear y enviar mensajes funciona
- [ ] Compartir pins en chat funciona
- [ ] Marcar como leído actualiza estado
- [ ] Unread count es correcto
- [ ] Conversaciones se ordenan por último mensaje
```

**ATLAS-013: API de Notificaciones**
```
Rama: agent1/feat/notifications-api
Prioridad: P1
Estimación: 4h
Dependencia: ATLAS-005

INSTRUCCIONES:
1. Implementar NotificationsModule:
   - GET /notifications → lista paginada
   - PATCH /notifications/:id/read → marcar leída
   - PATCH /notifications/read-all → marcar todas leídas
   - GET /notifications/unread-count → contador
   - PATCH /notifications/settings → configuración
2. Tipos de notificación:
   - PIN_LIKE, PIN_COMMENT, PIN_SAVE, PIN_REPIN
   - FOLLOW, BOARD_INVITE, BOARD_FOLLOW
   - MESSAGE, MENTION
   - SYSTEM, AD_REPORT
3. NotificationWorker (BullMQ):
   - Crear notificaciones en batch
   - Enviar push notifications (Firebase Cloud Messaging)
   - Enviar email notifications (para digest diario/semanal)
   - Eventos WebSocket para realtime
4. Notification preferences:
   - Per-type enable/disable
   - Email frequency: instant, daily, weekly, never
   - Push: enable/disable per type
   - Quiet hours configuration

ENTREGABLE:
- Sistema de notificaciones completo
- Worker de procesamiento
- Push notifications configurado
- Email notifications

CRITERIO DE ACEPTACIÓN:
- [ ] Notificaciones se crean para cada acción
- [ ] Push notifications se envían
- [ ] Unread count es correcto
- [ ] Read/read-all funciona
- [ ] Preferences se respetan
- [ ] Email digest funciona
```

---

#### FASE 2: Social & Engagement Backend

**ATLAS-014: Sistema de Reportes y Moderación**
```
Rama: agent1/feat/reports-moderation
Prioridad: P1
Estimación: 4h

INSTRUCCIONES:
1. ReportsModule:
   - POST /pins/:id/report → reportar pin
   - POST /users/:id/report → reportar usuario
   - GET /admin/reports → lista de reportes (admin)
   - PATCH /admin/reports/:id → resolver reporte
2. Auto-moderación:
   - Filtro de contenido NSFW (integrar con API de moderación)
   - Detección de spam
   - Palabras prohibidas (diccionario es/pt)
   - Auto-flag si un pin recibe 5+ reportes
3. Admin actions:
   - Eliminar contenido
   - Suspender/banear usuario
   - Warning system (3 strikes)

ENTREGABLE: Sistema de moderación funcional con auto-flag
```

**ATLAS-015: Ads Platform API**
```
Rama: agent1/feat/ads-api
Prioridad: P2
Estimación: 6h

INSTRUCCIONES:
1. AdsModule:
   - CRUD de campañas publicitarias
   - Targeting: país, edad, género, intereses
   - Budget management
   - Bid system (CPC/CPM)
   - Ad serving logic (inyectar en feed)
   - Analytics de campaña
2. Ad worker:
   - Tracking de impresiones
   - Tracking de clicks
   - Budget depletion alerts
   - Daily spending limits
3. Integración con feed:
   - 1 ad cada 20 pins orgánicos
   - Label "Promoted" / "Promocionado"
   - Relevancia basada en targeting

ENTREGABLE: Plataforma de ads funcional con targeting LATAM
```

**ATLAS-016: Analytics API**
```
Rama: agent1/feat/analytics-api
Prioridad: P2
Estimación: 5h

INSTRUCCIONES:
1. AnalyticsModule:
   - GET /analytics/profile → stats del perfil
   - GET /analytics/pins/:id → stats de un pin
   - GET /analytics/boards/:id → stats de un board
   - GET /analytics/audience → demografía de audiencia
   - GET /analytics/top-pins → top pins por métricas
2. Métricas:
   - Impressions, saves, clicks, closeups
   - Audience demographics (país, género, dispositivo)
   - Source traffic (organic, search, recommendations)
   - Time-series data (daily/weekly/monthly)
3. Aggregation:
   - Precalcular stats diarios con cron job
   - Almacenar en tablas de analytics separadas
   - Cache de resultados frecuentes

ENTREGABLE: Dashboard de analytics con métricas completas
```

**ATLAS-017: Business Accounts API**
```
Rama: agent1/feat/business-accounts
Prioridad: P2
Estimación: 4h

INSTRUCCIONES:
1. BusinessModule:
   - POST /business/convert → convertir cuenta personal a business
   - GET /business/profile → perfil de negocio
   - PATCH /business/profile → actualizar
   - GET /business/analytics → analytics extendidos
2. Features de business:
   - Rich pins (product pins con precio y stock)
   - Shop integration basics
   - Verified badge
   - Tax ID validation (RUT, RFC, CNPJ, etc.)
   - Business type categorization

ENTREGABLE: Cuentas business con features diferenciados
```

**ATLAS-018: Redis Cache Layer**
```
Rama: agent1/feat/cache-layer
Prioridad: P1
Estimación: 4h

INSTRUCCIONES:
1. Implementar CacheModule con Redis:
   - Feed cache (per user, TTL 5 min)
   - User profile cache (TTL 15 min)
   - Pin detail cache (TTL 10 min)
   - Session store
   - Token blacklist
   - Rate limiting counters
   - Search autocomplete cache
   - Trending cache (TTL 1 hour)
   - Notification unread count cache
2. Cache invalidation strategy:
   - Event-driven invalidation
   - Pattern-based invalidation
   - Graceful degradation (fallback a DB si Redis cae)
3. Cache warming:
   - Pre-cargar feeds de usuarios activos
   - Pre-cargar trending al inicio

ENTREGABLE: Capa de cache completa con invalidación inteligente
```

**ATLAS-019: Background Workers Completos**
```
Rama: agent1/feat/workers
Prioridad: P1
Estimación: 5h

INSTRUCCIONES:
1. Implementar todos los workers con BullMQ:
   - ImageProcessingWorker
   - VideoProcessingWorker
   - NotificationWorker
   - EmailWorker (templates con Handlebars)
   - SearchIndexWorker
   - AnalyticsAggregationWorker
   - FeedInvalidationWorker
   - CleanupWorker (expired tokens, old notifications)
2. Dashboard de monitoreo de colas (Bull Board)
3. Retry policies y dead letter queues
4. Health checks para cada worker
5. Graceful shutdown

ENTREGABLE: Todos los workers procesando en background
```

**ATLAS-020: Email Templates y Service**
```
Rama: agent1/feat/email-service
Prioridad: P1
Estimación: 3h

INSTRUCCIONES:
1. EmailModule con templates (Handlebars):
   - Welcome email (es/pt)
   - Email verification
   - Password reset
   - Board invitation
   - Notification digest (daily/weekly)
   - Account suspension notice
   - Business account approval
2. Integration con SendGrid/Resend
3. Email queue con retry
4. Templates responsivos (mobile-friendly)
5. Unsubscribe links

ENTREGABLE: Sistema de emails con templates LATAM
```

---

### 🤖 AGENTE 2 — "NOVA" (Claude Code) — FRONTEND & MOBILE

---

#### FASE 0: Fundación Frontend

**NOVA-001: Setup Next.js Web App**
```
Rama: agent2/feat/web-setup
Prioridad: P0
Estimación: 3h
Dependencia: Esperar ATLAS-001 (monorepo)

INSTRUCCIONES:
1. Crear apps/web/ con Next.js 15 + App Router + TypeScript
2. Configurar:
   - Tailwind CSS con tema custom PinLat
   - next-intl para i18n (es, pt, en)
   - next-auth para auth client-side
   - next/image configurado para S3/R2
   - next/font con tipografías elegidas
   - PWA con next-pwa
3. Crear layout base:
   - RootLayout con providers (Auth, Theme, i18n, QueryClient)
   - Navbar responsive
   - Sidebar navigation
   - Footer
   - Mobile bottom navigation
4. Configurar:
   - TanStack Query (React Query) para data fetching
   - Zustand para state management
   - Axios interceptors (auth headers, refresh token)
   - Error boundary global
   - Loading states y skeleton components
5. SEO:
   - Metadata por página
   - Open Graph tags
   - Sitemap
   - robots.txt
6. Analytics:
   - Google Analytics 4
   - Event tracking utility

ENTREGABLE:
- Next.js app corriendo en localhost:3000
- Layout responsive funcional
- i18n en 3 idiomas
- PWA installable
- Query client configurado

CRITERIO DE ACEPTACIÓN:
- [ ] App carga sin errores
- [ ] Navbar y layout responsive funcionan
- [ ] Cambio de idioma funciona
- [ ] PWA se puede instalar
- [ ] TanStack Query está configurado
```

**NOVA-002: Design System + Componentes UI**
```
Rama: agent2/feat/design-system
Prioridad: P0 (BLOQUEANTE para Agent3 admin panel)
Estimación: 8h
Dependencia: NOVA-001

INSTRUCCIONES:
1. Crear packages/ui/ con componentes reutilizables:

COMPONENTES BASE (Atomic):
- Button (variantes: primary, secondary, outline, ghost, danger, sizes: sm/md/lg)
- Input (text, email, password, search, with icon, with error)
- Textarea (auto-resize, character count)
- Select (native y custom dropdown)
- Checkbox, Radio, Switch/Toggle
- Avatar (sizes, with status indicator, with fallback initials)
- Badge (status, count, color variants)
- Icon (wrapper para Lucide icons)
- Spinner/Loader
- Skeleton (rectangle, circle, text lines)
- Tooltip
- Modal/Dialog (sizes, with overlay)
- Dropdown Menu
- Toast/Notification popup
- Tabs
- Accordion
- Breadcrumb
- Divider

COMPONENTES COMPUESTOS:
- Card (for pins, flexible)
- UserCard (avatar + name + follow button)
- PinCard (image + overlay + save button + author)
- BoardCard (cover image grid + name + pin count)
- CommentCard (avatar + text + actions)
- NotificationCard (icon + text + timestamp)
- MessageBubble (sent/received, with pin attachment)
- SearchBar (with autocomplete dropdown)
- ImageUploader (drag & drop, preview, crop)
- InfiniteScrollContainer (intersection observer)
- MasonryGrid (responsive masonry layout - CRITICAL para Pinterest-like layout)
- EmptyState (illustration + message + action)
- ErrorState
- ConfirmDialog

COMPONENTES LAYOUT:
- Container (max-width variants)
- Grid
- Stack (vertical/horizontal)
- Sidebar
- Navbar
- BottomNavigation (mobile)
- PageHeader

2. Tema / Design Tokens:
```javascript
const theme = {
  colors: {
    primary: '#E60023',     // Pinterest red
    primaryHover: '#CC001F',
    secondary: '#0076D3',
    accent: '#EFEFEF',
    background: '#FFFFFF',
    surface: '#F5F5F5',
    text: {
      primary: '#111111',
      secondary: '#767676',
      inverse: '#FFFFFF',
    },
    success: '#00875A',
    warning: '#FFB800',
    error: '#CC0000',
    // LATAM accent colors
    latam: {
      warmOrange: '#FF6F00',
      tropicalGreen: '#00BFA5',
      sunYellow: '#FFD600',
    }
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      display: ['Plus Jakarta Sans', 'sans-serif'],
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem',// 30px
      '4xl': '2.25rem', // 36px
    }
  },
  borderRadius: {
    sm: '8px',
    md: '16px',
    lg: '24px',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.08)',
    md: '0 4px 12px rgba(0,0,0,0.12)',
    lg: '0 8px 24px rgba(0,0,0,0.16)',
    card: '0 1px 4px rgba(0,0,0,0.1)',
    pin: '0 2px 8px rgba(0,0,0,0.15)',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  spacing: {
    gutter: '16px',     // Grid gap
    pinGap: '16px',     // Masonry gap
    sidebarWidth: '240px',
    navbarHeight: '80px',
    bottomNavHeight: '64px',
  }
}
```

3. Documentar CADA componente con:
   - Props y types
   - Ejemplo de uso
   - Variantes
   - Accessibility (ARIA labels, keyboard navigation)

ENTREGABLE:
- Package @pinlat/ui con todos los componentes
- Storybook o demo page con todos los componentes
- Tailwind theme extendido
- Exports correctos

CRITERIO DE ACEPTACIÓN:
- [ ] MasonryGrid renderiza layout tipo Pinterest
- [ ] Todos los componentes son responsive
- [ ] Dark mode support (CSS variables)
- [ ] Accesibilidad básica (tab navigation, aria labels)
- [ ] Componentes se importan desde @pinlat/ui
- [ ] 0 errores de TypeScript
```

**NOVA-003: Masonry Grid Layout (Pinterest Grid)**
```
Rama: agent2/feat/masonry-grid
Prioridad: P0 (CRÍTICO — esto ES Pinterest)
Estimación: 6h
Dependencia: NOVA-002

INSTRUCCIONES:
1. Implementar MasonryGrid component:
   - Layout masonry multi-columna (como Pinterest exacto)
   - Responsive: 2 cols mobile, 4 cols tablet, 6-7 cols desktop
   - Virtualized rendering (solo renderizar pins visibles)
   - Infinite scroll con intersection observer
   - Smooth loading (skeleton → blur hash → imagen)
   - Pin hover overlay (save button, share, link)
   - Resize handling
   - Pin width: 236px (Pinterest standard)
2. Implementar con CSS Grid o custom positioning:
   - Calcular posiciones dinámicamente
   - Manejar imágenes de diferentes aspect ratios
   - No usar librerías externas (performance)
   - Placeholder con dominant color mientras carga
3. Optimización:
   - Lazy loading de imágenes (native loading="lazy")
   - Progressive image loading (blur → full)
   - requestAnimationFrame para posicionamiento
   - Debounced resize handler
   - Batch DOM updates
4. Animaciones:
   - Fade in al cargar
   - Smooth reflow al agregar items
   - Hover scale effect en pins

ENTREGABLE:
- MasonryGrid component reutilizable
- Performance: 60fps scroll con 1000+ pins
- Demo funcional con mock data

CRITERIO DE ACEPTACIÓN:
- [ ] Layout idéntico a Pinterest
- [ ] 60fps en scroll con 500+ pins
- [ ] Responsive en todos los breakpoints
- [ ] Infinite scroll carga más pins
- [ ] No hay gaps ni overlaps
- [ ] Skeleton loading funciona
```

---

#### FASE 1: Core MVP Frontend

**NOVA-004: Páginas de Autenticación**
```
Rama: agent2/feat/auth-pages
Prioridad: P0
Estimación: 6h
Dependencia: NOVA-002

INSTRUCCIONES:
1. Crear páginas:
   - /login → formulario email/password + botones OAuth
   - /register → formulario registro + selección país LATAM + idioma
   - /forgot-password → email para reset
   - /reset-password → nuevo password con token
   - /verify-email → verificación con token
   - /auth/callback/[provider] → OAuth callback handler
2. Componentes:
   - AuthLayout (split screen: branding left, form right)
   - LoginForm con validación (react-hook-form + zod)
   - RegisterForm con steps (datos básicos → intereses → follow sugeridos)
   - OAuth buttons (Google, Facebook, Apple)
   - Country/Language selector para LATAM
   - Password strength indicator
3. Features:
   - Remember me
   - Show/hide password
   - Social login
   - Redirect después de login
   - Onboarding flow post-registro (seleccionar intereses)
4. Landing page / splash:
   - Hero con scroll de pins (mockup masonry)
   - CTA "Registrarse" prominente
   - Footer con links

ENTREGABLE:
- Auth flow completo UI
- Onboarding post-registro
- Mobile-responsive

CRITERIO DE ACEPTACIÓN:
- [ ] Login/Register funciona end-to-end con API
- [ ] OAuth redirige correctamente
- [ ] Validación muestra errores inline
- [ ] Onboarding permite seleccionar intereses
- [ ] Responsive en mobile
```

**NOVA-005: Feed / Home Page**
```
Rama: agent2/feat/feed-ui
Prioridad: P0
Estimación: 6h
Dependencia: NOVA-003, NOVA-004

INSTRUCCIONES:
1. Crear página /home (Feed):
   - MasonryGrid con pins del feed
   - Tabs: Para ti / Siguiendo / Trending
   - Infinite scroll
   - Pull to refresh (mobile)
   - Pin cards con:
     * Imagen con lazy loading
     * Overlay al hover: botón "Guardar", board selector, link
     * Título truncado
     * Avatar + nombre del autor
     * Save count
   - Quick save (guardar a último board)
   - Board selector dropdown al guardar
   - Loading skeletons
   - Empty state si no hay pins
2. Crear página /explore:
   - Categorías destacadas (grid de tarjetas)
   - Trending searches
   - Trending pins
   - Topics populares en LATAM
3. Crear página /today:
   - Pins editoriales curados
   - Categorías del día
   - Trending en tu país

ENTREGABLE:
- Feed funcional con masonry layout
- Explore page
- Infinite scroll
- Quick save funcional

CRITERIO DE ACEPTACIÓN:
- [ ] Feed carga y muestra pins en masonry
- [ ] Infinite scroll carga más pins sin lag
- [ ] Quick save guarda pin en board
- [ ] Board selector funciona
- [ ] Tabs cambian el contenido
- [ ] Skeleton loading se muestra correctamente
```

**NOVA-006: Pin Detail Page**
```
Rama: agent2/feat/pin-detail
Prioridad: P0
Estimación: 5h
Dependencia: NOVA-002

INSTRUCCIONES:
1. Crear página /pin/[id]:
   - Layout: imagen izquierda, info derecha (desktop) / stacked (mobile)
   - Imagen con zoom capability
   - Botones: Save, Like (con animación), Share, Visit link, Report
   - Board selector para guardar
   - Author info (avatar, name, follow button)
   - Título y descripción
   - Tags clicables
   - Comentarios section:
     * Lista de comentarios con replies
     * Input para nuevo comentario
     * @mention autocomplete
   - Sección "More like this" → masonry de pins relacionados
   - Repin count y save count
2. Crear Pin modal (overlay sobre el feed):
   - Se abre al hacer click en un pin del feed
   - URL cambia sin full navigation
   - Cerrar con X, Escape, click fuera
   - Navigation entre pins (flechas)
3. Share popup:
   - Copy link
   - WhatsApp (importante para LATAM)
   - Facebook
   - Twitter/X
   - Email
   - Embed code

ENTREGABLE:
- Pin detail page completa
- Pin modal overlay
- Comentarios funcionales
- Share con WhatsApp

CRITERIO DE ACEPTACIÓN:
- [ ] Pin se muestra con toda la información
- [ ] Comentarios se cargan y envían
- [ ] Share por WhatsApp funciona
- [ ] Related pins se muestran
- [ ] Modal overlay funciona sobre el feed
- [ ] Responsive layout
```

**NOVA-007: Board Pages**
```
Rama: agent2/feat/boards-ui
Prioridad: P0
Estimación: 5h
Dependencia: NOVA-003

INSTRUCCIONES:
1. Crear página /[username]/boards:
   - Grid de board cards (cover image, name, pin count)
   - Crear nuevo board (modal)
   - Editar board
   - Sort boards
2. Crear página /[username]/[board-slug]:
   - Board header (cover, title, description, creator, collaborators)
   - Board actions: Edit, Share, Collaborate, More options
   - Sections (collapsible)
   - Pins en masonry layout
   - Organizar/reordenar pins (drag & drop)
   - Add pin to board
   - Filter/Sort pins
3. Board creation modal:
   - Name, description, category
   - Public/Private toggle
   - Cover selection
4. Board edit page:
   - Edit details
   - Manage collaborators
   - Manage sections
   - Merge boards
   - Delete board
5. Board collaboration:
   - Invite collaborators
   - Manage roles
   - Activity log

ENTREGABLE:
- Board listing y detail pages
- Create/Edit board
- Drag & drop organización
- Collaboration UI

CRITERIO DE ACEPTACIÓN:
- [ ] Boards se listan correctamente
- [ ] Board detail muestra pins en masonry
- [ ] Crear/editar board funciona
- [ ] Drag & drop reordena pins
- [ ] Collaborators se invitan correctamente
- [ ] Secciones se crean y colapsan
```

**NOVA-008: Profile Pages**
```
Rama: agent2/feat/profile-ui
Prioridad: P0
Estimación: 5h
Dependencia: NOVA-002

INSTRUCCIONES:
1. Crear página /[username]:
   - Profile header:
     * Cover image
     * Avatar (con upload si es perfil propio)
     * Display name y username
     * Bio
     * Website link
     * Location
     * Followers/Following counts (clicables)
     * Follow/Unfollow button (para otros)
     * Edit Profile button (para propio)
     * Share profile
   - Tabs: Created / Saved / Boards
   - Created: masonry de pins originales
   - Saved: masonry de pins guardados
   - Boards: grid de boards
2. Crear /settings página:
   - Profile settings (edit all fields)
   - Account settings (email, password, 2FA)
   - Privacy settings
   - Notification settings
   - Language/Country settings
   - Connected accounts (Google, Facebook)
   - Delete/Deactivate account
3. Crear modales:
   - Followers list
   - Following list
   - Edit profile modal (quick edit)

ENTREGABLE:
- Profile page completa
- Settings page completa
- Edit profile funcional

CRITERIO DE ACEPTACIÓN:
- [ ] Perfil muestra toda la información
- [ ] Tabs cambian el contenido
- [ ] Follow/Unfollow funciona con update en tiempo real
- [ ] Settings actualizan el perfil
- [ ] Upload de avatar y cover funciona
- [ ] Followers/Following modales funcionan
```

**NOVA-009: Search UI**
```
Rama: agent2/feat/search-ui
Prioridad: P1
Estimación: 5h
Dependencia: NOVA-003

INSTRUCCIONES:
1. Crear SearchBar component (en Navbar):
   - Input con ícono de búsqueda
   - Autocomplete dropdown con:
     * Búsquedas recientes del usuario
     * Sugerencias (trending)
     * Resultados en tiempo real (debounced 300ms)
   - Chips de filtro debajo (categorías, tipo)
   - Voice search button (Web Speech API)
   - Keyboard shortcut (/ para focus)
2. Crear página /search:
   - Tabs: Pins / Boards / Users
   - Filtros sidebar:
     * Categoría
     * Color dominante
     * Fecha
     * Popularidad
     * País/Región
   - Resultados en masonry (pins) o grid (boards/users)
   - Sort: Relevancia, Reciente, Popular
   - Resultados vacíos: sugerencias
3. Visual search:
   - Upload imagen → buscar pins similares
   - Camera capture (mobile)
   - Crop area to search

ENTREGABLE:
- Search bar con autocomplete
- Search results page con filtros
- Visual search básico

CRITERIO DE ACEPTACIÓN:
- [ ] Autocomplete muestra sugerencias en tiempo real
- [ ] Resultados se muestran correctamente por tipo
- [ ] Filtros funcionan
- [ ] Visual search sube imagen y muestra resultados
- [ ] Búsqueda reciente se guarda localmente
```

**NOVA-010: Crear Pin UI (Upload)**
```
Rama: agent2/feat/create-pin-ui
Prioridad: P0
Estimación: 5h
Dependencia: NOVA-002

INSTRUCCIONES:
1. Crear página /pin/create:
   - Drag & drop image uploader
   - Image preview con:
     * Crop tool
     * Alt text input
     * Aspect ratio selector
   - Form fields:
     * Title (required)
     * Description (rich text básico)
     * Link (URL del destino)
     * Board selector (required)
     * Tags input (chips)
     * Category selector
   - Save as draft / Publish
   - Multiple pin upload (batch)
2. Crear botón flotante "+" (mobile) o "Create" (desktop)
3. Crear modal rápido de guardar pin:
   - Desde extensión del navegador
   - Board selector rápido
   - Quick title edit
4. Video upload support:
   - Progress bar
   - Preview
   - Thumbnail selector

ENTREGABLE:
- Create pin page funcional
- Drag & drop upload
- Image crop
- Video upload

CRITERIO DE ACEPTACIÓN:
- [ ] Upload de imagen funciona con preview
- [ ] Crop permite ajustar imagen
- [ ] Formulario valida campos requeridos
- [ ] Pin se crea y aparece en el feed
- [ ] Batch upload funciona
- [ ] Progress bar muestra progreso real
```

---

#### FASE 2: Social & Engagement Frontend

**NOVA-011: Messaging UI**
```
Rama: agent2/feat/messaging-ui
Prioridad: P1
Estimación: 5h
Dependencia: NOVA-002

INSTRUCCIONES:
1. Crear página /messages:
   - Sidebar: lista de conversaciones
   - Main: chat activo
   - Responsive: sidebar se oculta en mobile
2. Conversation list:
   - Avatar, nombre, último mensaje, timestamp
   - Unread indicator
   - Online status dot
   - Search conversations
3. Chat view:
   - Message bubbles (sent/received)
   - Pin share cards inline
   - Typing indicator
   - Read receipts (✓✓)
   - Load more (scroll up)
   - Input: text + emoji picker + attach pin + attach image
4. New conversation:
   - User search
   - Start new chat
5. WebSocket integration:
   - Realtime messages
   - Typing events
   - Online status

ENTREGABLE:
- Messaging UI completa
- Realtime chat funcional
- Pin sharing en chat

CRITERIO DE ACEPTACIÓN:
- [ ] Mensajes se envían y reciben en tiempo real
- [ ] Pin sharing muestra preview
- [ ] Typing indicator funciona
- [ ] Unread count se actualiza
- [ ] Responsive layout
```

**NOVA-012: Notifications UI**
```
Rama: agent2/feat/notifications-ui
Prioridad: P1
Estimación: 3h
Dependencia: NOVA-002

INSTRUCCIONES:
1. Notification bell en Navbar:
   - Unread count badge
   - Dropdown con últimas notificaciones
   - Mark all read
   - Link a /notifications
2. Página /notifications:
   - Lista de notificaciones
   - Filtros: All, Mentions, Follows, Saves
   - Group similar (3 people saved your pin)
   - Timestamp relativo (hace 5 min, ayer)
   - Click navega al contexto
3. Push notification permission:
   - Prompt elegante (no browser default)
   - Explain benefits

ENTREGABLE:
- Notification bell con dropdown
- Notifications page
- Push permission flow

CRITERIO DE ACEPTACIÓN:
- [ ] Badge muestra count correcto
- [ ] Dropdown muestra últimas 10
- [ ] Notificaciones agrupadas correctamente
- [ ] Click navega al pin/profile/board correcto
```

**NOVA-013: Create Pin from URL (Importar)**
```
Rama: agent2/feat/import-pin
Prioridad: P1
Estimación: 3h

INSTRUCCIONES:
1. Feature "Save from website":
   - Input URL
   - Fetch metadata (title, images, description) via API
   - Seleccionar imagen de las encontradas
   - Pre-fill title y description
   - Board selector
   - Save
2. Bookmarklet básico:
   - JavaScript snippet que abre modal en PinLat
   - Seleccionar imagen de la página actual

ENTREGABLE: Import pin from URL funcional
```

---

#### FASE 3: Mobile App

**NOVA-014: React Native App Setup**
```
Rama: agent2/feat/mobile-setup
Prioridad: P1
Estimación: 5h

INSTRUCCIONES:
1. Crear apps/mobile/ con Expo + React Native + TypeScript
2. Configurar:
   - React Navigation (stack + tabs + drawer)
   - Shared types desde @pinlat/shared-types
   - Expo Image (optimized image loading)
   - AsyncStorage
   - Secure store (tokens)
   - Push notifications (Expo Notifications)
   - Deep linking
   - Splash screen
   - App icon (PinLat branding)
3. Screens structure:
   - (auth)/login
   - (auth)/register
   - (tabs)/home
   - (tabs)/search
   - (tabs)/create
   - (tabs)/notifications
   - (tabs)/profile
   - pin/[id]
   - board/[id]
   - profile/[username]
   - messages
   - settings
4. Bottom tab navigation con icons

ENTREGABLE:
- React Native app estructura funcional
- Navigation configurado
- Auth flow mobile

CRITERIO DE ACEPTACIÓN:
- [ ] App corre en iOS y Android (Expo Go)
- [ ] Navigation entre todas las screens funciona
- [ ] Auth tokens se almacenan en secure store
- [ ] Push notifications configuradas
```

**NOVA-015: Mobile UI Screens Completas**
```
Rama: agent2/feat/mobile-screens
Prioridad: P1
Estimación: 10h
Dependencia: NOVA-014

INSTRUCCIONES:
1. Implementar TODAS las screens mobile:
   - HomeScreen: masonry feed con pull-to-refresh
   - SearchScreen: search bar + trending + results
   - CreatePinScreen: camera + gallery + form
   - NotificationsScreen: lista
   - ProfileScreen: perfil con tabs
   - PinDetailScreen: full pin view
   - BoardDetailScreen: board con pins
   - MessagesScreen: conversation list
   - ChatScreen: chat view
   - SettingsScreen: settings completos
2. Features específicas mobile:
   - Camera integration para crear pin
   - Galería para seleccionar imagen
   - Share sheet integration
   - Haptic feedback
   - Pull to refresh
   - Smooth animations (Reanimated)
   - Gesture handling (swipe to go back)
3. Offline mode básico:
   - Cache de feed
   - Queue de acciones offline

ENTREGABLE:
- App mobile completa con todas las screens
- Camera integration
- Offline basic support

CRITERIO DE ACEPTACIÓN:
- [ ] Todas las screens funcionan
- [ ] Camera capture crea pin
- [ ] Pull to refresh funciona
- [ ] Animaciones son fluidas (60fps)
- [ ] App funciona offline para feeds cacheados
```

**NOVA-016: Browser Extension**
```
Rama: agent2/feat/browser-extension
Prioridad: P2
Estimación: 5h

INSTRUCCIONES:
1. Crear apps/browser-extension/:
   - Chrome extension (Manifest V3)
   - Firefox compatible
2. Features:
   - "Save" button en hover sobre imágenes en cualquier web
   - Right-click → "Save to PinLat"
   - Popup: seleccionar imagen, título, board
   - Quick save a último board
   - Login/Auth via browser extension
3. UI:
   - Popup pequeño y limpio
   - Board selector
   - Image selector (todas las imágenes de la página)

ENTREGABLE:
- Chrome extension funcional
- Save images from any website
- Board selection

CRITERIO DE ACEPTACIÓN:
- [ ] Extension se instala en Chrome
- [ ] Hover muestra "Save" en imágenes
- [ ] Popup permite seleccionar board
- [ ] Pin se crea correctamente via API
```

---

### 🤖 AGENTE 3 — "TITAN" (Gemini Ultra) — PLATFORM, ML, DEVOPS

---

#### FASE 0: Fundación Infrastructure

**TITAN-001: Docker Setup Completo**
```
Rama: agent3/feat/docker-setup
Prioridad: P0 (BLOQUEANTE)
Estimación: 4h

INSTRUCCIONES:
1. Crear infra/docker/ con:
   - Dockerfile.api (NestJS app, multi-stage build)
   - Dockerfile.web (Next.js app, multi-stage build)
   - Dockerfile.ml (Python FastAPI)
   - Dockerfile.worker (NestJS workers)
2. Crear docker-compose.yml (desarrollo local):
   Services:
   - api (NestJS): port 3001
   - web (Next.js): port 3000
   - admin (Next.js): port 3002
   - ml-service (FastAPI): port 8000
   - postgres: port 5432 (con volume persistente)
   - redis: port 6379
   - elasticsearch: port 9200
   - minio (S3 compatible local): port 9000
   - mailhog (email testing): port 1025/8025
   - pgadmin: port 5050
   - redis-commander: port 8081
3. Crear docker-compose.prod.yml (producción)
4. Crear .env.docker con todas las variables
5. Crear Makefile con comandos:
   - make dev → docker-compose up
   - make build → build all images
   - make migrate → run migrations
   - make seed → seed database
   - make logs → view logs
   - make clean → cleanup
6. Health checks para todos los services
7. Network configuration entre services
8. Volume mounts para hot reload en desarrollo

ENTREGABLE:
- docker-compose.yml que levanta TODO el stack
- `make dev` inicia el entorno completo
- Todos los services se comunican entre sí

CRITERIO DE ACEPTACIÓN:
- [ ] `make dev` levanta todos los services
- [ ] API se conecta a PostgreSQL
- [ ] API se conecta a Redis
- [ ] Hot reload funciona para api y web
- [ ] MinIO sirve como S3 local
- [ ] Mailhog captura emails de desarrollo
- [ ] pgAdmin accesible para debug
```

**TITAN-002: CI/CD Pipeline con GitHub Actions**
```
Rama: agent3/feat/ci-cd
Prioridad: P0
Estimación: 5h
Dependencia: TITAN-001

INSTRUCCIONES:
1. Crear .github/workflows/:

ci.yml (Pull Request):
- Trigger: PR a develop o main
- Jobs paralelos:
  * lint: ESLint + Prettier check
  * type-check: tsc --noEmit en todos los workspaces
  * test-unit: Jest unit tests (api, web, shared)
  * test-e2e: Playwright E2E (web) — against docker-compose test
  * build: Build all workspaces
  * security: npm audit + Snyk scan
- Matrix: Node 20, PostgreSQL 16
- Cache: pnpm store, Turborepo cache, Next.js cache
- Fail fast: si lint falla, cancelar todo

cd-staging.yml (Push a develop):
- Build Docker images
- Push a Container Registry (GitHub Container Registry)
- Deploy a staging (Railway/Render/Fly.io)
- Run smoke tests contra staging
- Notify en Slack/Discord

cd-production.yml (Push a main):
- Build production Docker images
- Run full E2E test suite contra staging
- Blue/green deployment
- Health check post-deploy
- Rollback automático si health check falla
- Tag release en GitHub

2. Crear workflows auxiliares:
- database-migration.yml: Run Prisma migrations
- dependency-update.yml: Dependabot + auto-merge patches
- lighthouse.yml: Performance audit en PRs
- codeql.yml: Security scanning

ENTREGABLE:
- CI pipeline completo
- CD a staging automático
- CD a producción con gates
- Todos los checks en PRs

CRITERIO DE ACEPTACIÓN:
- [ ] PRs ejecutan lint, tests, build
- [ ] Push a develop deploya a staging
- [ ] Push a main deploya a producción
- [ ] Rollback funciona si health check falla
- [ ] Cache reduce tiempo de CI 50%+
```

**TITAN-003: Configurar Storage (S3/R2 + CDN)**
```
Rama: agent3/feat/cdn-storage
Prioridad: P0
Estimación: 3h

INSTRUCCIONES:
1. Configurar Cloudflare R2 o AWS S3:
   - Bucket para imágenes de pins
   - Bucket para avatars/covers
   - Bucket para videos
   - Bucket para static assets
2. Configurar Cloudflare CDN:
   - Custom domain para imágenes: images.pinlat.com
   - Image resizing on-the-fly (Cloudflare Images)
   - Cache rules por tipo de asset
   - WebP auto-conversion
   - Geolocated CDN (nodos en LATAM: São Paulo, Buenos Aires, México City)
3. Crear StorageService en backend:
   - Upload con presigned URLs
   - Delete
   - Generate CDN URLs
   - Folder structure: /{userId}/{type}/{filename}
4. CORS configuration para uploads directos desde browser

ENTREGABLE:
- Storage configurado y funcional
- CDN sirviendo imágenes
- Presigned URLs funcionando

CRITERIO DE ACEPTACIÓN:
- [ ] Upload directo a R2/S3 funciona
- [ ] CDN sirve imágenes con baja latencia en LATAM
- [ ] WebP auto-conversion
- [ ] Presigned URLs expiran correctamente
```

---

#### FASE 1: Platform Services

**TITAN-004: Search Engine Setup (Elasticsearch/Meilisearch)**
```
Rama: agent3/feat/search-engine
Prioridad: P1
Estimación: 6h

INSTRUCCIONES:
1. Configurar Meilisearch (elegido por facilidad y performance):
   - Index: pins (title, description, tags, categories, authorName)
   - Index: boards (name, description, category)
   - Index: users (username, displayName, bio)
   - Index: hashtags (name, usageCount)
2. Configurar:
   - Spanish language analyzer (stemming, stop words)
   - Portuguese language analyzer
   - Synonyms dictionary (LATAM slang)
   - Typo tolerance
   - Filterable attributes (category, country, dateRange)
   - Sortable attributes (relevance, createdAt, popularity)
   - Ranking rules optimizadas
3. Sync workers:
   - PostgreSQL → Meilisearch sync (on create/update/delete)
   - Bulk re-index script
   - Health check para sync status
4. API integration:
   - SearchService que wrappea Meilisearch client
   - Autocomplete endpoint (<50ms response)
   - Faceted search con contadores
5. Analytics de búsqueda:
   - Tracking de queries
   - Popular searches
   - Zero-result queries

ENTREGABLE:
- Meilisearch configurado con 3 índices
- Sync funcionando
- Autocomplete <50ms
- Filtros y facets

CRITERIO DE ACEPTACIÓN:
- [ ] Búsqueda retorna resultados relevantes en es/pt
- [ ] Typo tolerance funciona ("rezetas" → "recetas")
- [ ] Autocomplete responde en <50ms
- [ ] Filtros por categoría, fecha, popularidad
- [ ] Sync mantiene datos actualizados
```

**TITAN-005: Realtime con Socket.io**
```
Rama: agent3/feat/realtime
Prioridad: P1
Estimación: 5h

INSTRUCCIONES:
1. Implementar RealtimeModule en NestJS con Socket.io:
   - Namespaces:
     * /notifications → notificaciones en tiempo real
     * /messages → chat en tiempo real
     * /feed → updates del feed
   - Authentication: JWT verification en handshake
   - Room management:
     * User rooms (user:{userId})
     * Conversation rooms (conv:{conversationId})
     * Board rooms (board:{boardId}) — live collaboration
2. Events:
   Notifications namespace:
   - notification:new → nueva notificación
   - notification:count → update unread count

   Messages namespace:
   - message:new → nuevo mensaje
   - message:typing → user está escribiendo
   - message:read → mensajes leídos
   - user:online → status online/offline
   - user:lastSeen → última vez visto

   Feed namespace:
   - pin:new → nuevo pin de alguien que sigues
   - pin:trending → pin se vuelve trending
3. Redis adapter para Socket.io (scaling horizontal)
4. Presence tracking (online users)
5. Connection management:
   - Reconnection strategy
   - Heartbeat
   - Graceful disconnect
6. Rate limiting para eventos

ENTREGABLE:
- Realtime funcional para notificaciones y chat
- Presence tracking
- Scaling ready con Redis adapter

CRITERIO DE ACEPTACIÓN:
- [ ] Notificaciones llegan en tiempo real
- [ ] Chat messages en tiempo real
- [ ] Typing indicator funciona
- [ ] Online status correcto
- [ ] Reconnection funciona tras pérdida de conexión
- [ ] Multi-server funciona con Redis adapter
```

**TITAN-006: ML Service — Recomendaciones**
```
Rama: agent3/feat/ml-service
Prioridad: P2
Estimación: 8h

INSTRUCCIONES:
1. Crear apps/ml-service/ con Python FastAPI:
   - /recommend/feed → pins recomendados para usuario
   - /recommend/similar → pins similares a un pin
   - /recommend/users → usuarios sugeridos
   - /search/visual → búsqueda por imagen
   - /moderate/image → check contenido NSFW
   - /classify/pin → categorizar pin automáticamente
2. Modelos:
   a) Content-based filtering:
      - Embeddings de imágenes (CLIP model)
      - TF-IDF de textos (title, description, tags)
      - Similarity scoring
   b) Collaborative filtering:
      - User-item matrix (saves, likes, views)
      - Matrix factorization
      - Similar users → recommend their saves
   c) Hybrid recommender:
      - Weighted combination de content + collaborative
      - Cold start: content-based para nuevos users
      - Re-ranking por diversidad y frescura
3. Visual search:
   - CLIP embeddings para imágenes
   - Vector similarity search (pgvector o Pinecone)
   - Upload imagen → encontrar pins similares
4. Auto-categorization:
   - Clasificar pins en categorías automáticamente
   - Tag suggestion basado en imagen y texto
5. Content moderation:
   - NSFW detection
   - Text toxicity detection (es/pt)
6. Cache de recomendaciones en Redis
7. A/B testing framework básico

ENTREGABLE:
- ML service con 3 endpoints de recomendación
- Visual search funcional
- Auto-categorization
- Content moderation

CRITERIO DE ACEPTACIÓN:
- [ ] Recomendaciones son relevantes
- [ ] Visual search encuentra imágenes similares
- [ ] Categorización automática tiene >80% accuracy
- [ ] NSFW detection funciona
- [ ] Response time <500ms para recomendaciones
- [ ] Cache reduce llamadas al modelo
```

**TITAN-007: Admin Panel**
```
Rama: agent3/feat/admin-panel
Prioridad: P2
Estimación: 8h
Dependencia: Usa componentes de NOVA-002

INSTRUCCIONES:
1. Crear apps/admin/ con Next.js + @pinlat/ui:
   - Dashboard: stats generales (users, pins, boards, revenue)
   - Users management:
     * Lista con search y filtros
     * Ver detalle de usuario
     * Suspend/Ban/Warn
     * Edit user
     * Impersonate (login as user for debugging)
   - Content management:
     * Flagged content (pins reportados)
     * Review queue
     * Approve/Reject/Delete
     * Bulk actions
   - Reports management:
     * Lista de reportes
     * Assign reviewer
     * Resolve/Dismiss
     * Stats de reportes
   - Analytics dashboard:
     * User growth chart
     * Pin creation chart
     * DAU/MAU/WAU
     * Top countries (LATAM focus)
     * Top categories
     * Revenue (ads)
   - Ads management:
     * Campaign review
     * Approve/Reject ads
     * Revenue dashboard
   - System:
     * Background jobs status (BullMQ dashboard)
     * Cache stats (Redis)
     * Search index status
     * Error logs
     * Feature flags
2. Auth: Admin-only access (role-based)
3. Audit log: track all admin actions

ENTREGABLE:
- Admin panel completo y funcional
- Dashboard con métricas
- Content moderation queue
- User management

CRITERIO DE ACEPTACIÓN:
- [ ] Dashboard muestra métricas correctas
- [ ] User management funciona (suspend, ban)
- [ ] Content moderation queue procesa reportes
- [ ] Charts muestran datos reales
- [ ] Solo admins pueden acceder
- [ ] Audit log registra acciones
```

**TITAN-008: Monitoring y Observability**
```
Rama: agent3/feat/monitoring
Prioridad: P2
Estimación: 4h

INSTRUCCIONES:
1. Configurar Prometheus:
   - Métricas de NestJS (request duration, status codes, active connections)
   - Métricas de PostgreSQL (connections, queries)
   - Métricas de Redis (memory, hit rate)
   - Métricas custom (pins created, users registered, feed loads)
2. Configurar Grafana:
   - Dashboard: API Performance
   - Dashboard: Database Performance
   - Dashboard: Redis Performance
   - Dashboard: Business Metrics
   - Dashboard: Error Rates
3. Alerting:
   - High error rate (>5% 5xx)
   - High latency (p99 > 2s)
   - Database connection pool exhausted
   - Redis memory > 80%
   - Disk space < 20%
4. Structured logging:
   - Winston/Pino logger
   - JSON format
   - Request ID tracking
   - Log levels (debug, info, warn, error)
5. Error tracking:
   - Sentry integration (API + Web + Mobile)
   - Error grouping
   - Release tracking

ENTREGABLE:
- Prometheus + Grafana dashboards
- Alerting configurado
- Structured logging
- Sentry integration

CRITERIO DE ACEPTACIÓN:
- [ ] Grafana dashboards muestran métricas
- [ ] Alertas se disparan correctamente
- [ ] Logs están en formato JSON searchable
- [ ] Sentry captura errores con context
```

**TITAN-009: Infrastructure as Code (Terraform)**
```
Rama: agent3/feat/terraform
Prioridad: P2
Estimación: 5h

INSTRUCCIONES:
1. Crear infra/terraform/ con:
   - Provider: AWS o DigitalOcean o Hetzner
   - VPC y networking
   - PostgreSQL managed (RDS o DO Database)
   - Redis managed (ElastiCache o DO Redis)
   - S3/R2 buckets
   - Container orchestration (ECS o DO App Platform)
   - Load balancer
   - SSL/TLS certificates
   - DNS configuration
   - Autoscaling rules
2. Environments:
   - staging.tfvars
   - production.tfvars
3. Modules:
   - networking
   - database
   - cache
   - storage
   - compute
   - monitoring
4. State management:
   - Remote state (S3 + DynamoDB lock)
5. Cost estimation

ENTREGABLE:
- Terraform modules para infraestructura completa
- Staging y production configs
- README con instrucciones de deploy

CRITERIO DE ACEPTACIÓN:
- [ ] `terraform plan` muestra recursos correctos
- [ ] `terraform apply` crea infraestructura
- [ ] State se almacena remotamente
- [ ] Environments son independientes
```

**TITAN-010: Rate Limiting y Security**
```
Rama: agent3/feat/security
Prioridad: P1
Estimación: 4h

INSTRUCCIONES:
1. Rate Limiting avanzado:
   - Per-IP rate limiting
   - Per-user rate limiting
   - Per-endpoint rate limiting
   - Sliding window algorithm
   - Exponential backoff para abuse
2. Security:
   - CSRF protection
   - XSS prevention (helmet, sanitize inputs)
   - SQL injection prevention (Prisma handles)
   - File upload validation (magic bytes, not just extension)
   - Content Security Policy headers
   - CORS strict configuration
   - API key management para external integrations
3. DDoS protection:
   - Cloudflare WAF rules
   - IP blacklisting
   - Challenge suspicious traffic
4. Data privacy:
   - User data export (GDPR-like compliance)
   - Account deletion (real deletion of data)
   - Consent management
   - Cookie banner

ENTREGABLE:
- Security hardened API
- Rate limiting funcional
- DDoS protection configurado
- GDPR compliance básico

CRITERIO DE ACEPTACIÓN:
- [ ] Rate limiting bloquea abuse
- [ ] Uploads validan contenido real
- [ ] Headers de seguridad presentes
- [ ] Data export funciona
- [ ] Account deletion elimina datos
```

**TITAN-011: i18n Completo y Localización LATAM**
```
Rama: agent3/feat/i18n-latam
Prioridad: P1
Estimación: 4h

INSTRUCCIONES:
1. Translations completas:
   - Español (base): 100% de strings de la app
   - Portugués (Brasil): 100% de strings
   - Inglés: 100% de strings
2. Categorías localizadas para LATAM:
   - Comida y Recetas (recetas LATAM)
   - Moda y Belleza
   - Hogar y Decoración
   - Viajes (destinos LATAM)
   - Arte y Manualidades
   - Fitness y Salud
   - Tecnología
   - Educación
   - Humor y Memes
   - Fútbol y Deportes
   - Música y Cultura
   - Naturaleza y Paisajes
   - Emprendimiento
   - Bodas y Eventos
   - Mascotas
3. Currency support:
   - MXN, BRL, ARS, COP, CLP, PEN, UYU, etc.
   - Formato de moneda por país
4. Date/time formatting por locale
5. Content seeding LATAM:
   - Trending searches relevantes
   - Categorías populares por país
   - Holidays y eventos LATAM

ENTREGABLE:
- 3 idiomas completos
- Categorías LATAM
- Currency y date formatting

CRITERIO DE ACEPTACIÓN:
- [ ] 100% de strings traducidos en 3 idiomas
- [ ] Categorías relevantes para LATAM
- [ ] Monedas se muestran en formato correcto
- [ ] Fechas se formatean según locale
```

---

## 7. PROTOCOLO DE INTEGRACIÓN Y VALIDACIÓN

### 🧠 ORION (Orquestador) — Checklist por Fase

#### Después de Fase 0:
```
□ Monorepo funcional (ATLAS-001)
□ Database schema completo y migrado (ATLAS-002)
□ NestJS API corriendo (ATLAS-003)
□ API contracts definidos y publicados (ATLAS-004) ← GATE
□ Next.js web corriendo (NOVA-001)
□ Design system con componentes base (NOVA-002) ← GATE
□ Docker compose levanta todo (TITAN-001) ← GATE
□ CI/CD pipeline funcional (TITAN-002)
□ Storage configurado (TITAN-003)

INTEGRATION TEST FASE 0:
- docker-compose up levanta todo
- web se conecta a api
- api se conecta a postgres y redis
- tests pasan en CI
```

#### Después de Fase 1:
```
□ Auth funciona end-to-end (login → obtener token → acceder a recurso protegido)
□ Crear pin: upload imagen → procesa → aparece en feed
□ Crear board → agregar pin → ver board
□ Buscar pin → resultados relevantes
□ Ver perfil → ver pins/boards del usuario
□ Follow usuario → sus pins aparecen en feed

INTEGRATION TEST FASE 1:
- Cypress/Playwright test: Register → Login → Create Pin → Save to Board → Search → View Pin
- API test suite: All endpoints respond correctly
- Performance: Feed loads in <2s with 100+ pins
```

#### Después de Fase 2:
```
□ Comentar pin → notificación al autor
□ Enviar mensaje → llega en realtime
□ Reportar contenido → aparece en admin
□ Notificaciones push llegan
□ Ads se muestran en feed

INTEGRATION TEST FASE 2:
- E2E: Full social flow (follow → pin → comment → like → share → message)
- Realtime: WebSocket events llegan correctamente
- Admin: Moderation queue funciona
```

#### Después de Fase 3:
```
□ Recomendaciones personalizadas en feed
□ Visual search funciona
□ Business accounts se crean
□ Analytics muestran datos reales
□ Browser extension guarda pins

INTEGRATION TEST FASE 3:
- ML: Recommendations improve with more user data
- Analytics: Charts show real metrics
- Extension: Save pin from any website
```

#### Después de Fase 4:
```
□ Mobile app funciona en iOS y Android
□ Admin panel está completo
□ PWA se instala
□ Performance metrics dentro de targets

INTEGRATION TEST FASE 4:
- Mobile: Full flow en Expo Go
- PWA: Install and offline mode
- Performance: Lighthouse score >80
```

### 🔍 SENTINEL (QA) — Test Matrix

```
TESTS POR CATEGORÍA:

1. Unit Tests (cada agente escribe los suyos):
   - Backend: Jest, coverage >80%
   - Frontend: Jest + React Testing Library
   - ML: pytest

2. Integration Tests (SENTINEL coordina):
   - API endpoints: Supertest
   - Database queries: Test containers
   - Cache: Redis mock
   - Search: Meilisearch test instance

3. E2E Tests (SENTINEL ejecuta):
   - Web: Playwright
   - Mobile: Detox
   - Flujos completos:
     * Registro → Login → Crear Pin → Ver en Feed
     * Search → Find Pin → Save → View Board
     * Follow → See in Feed → Comment → Notification
     * Upload Image → Process → Multiple Sizes → CDN
     * Report → Admin Review → Resolve
     * Business Sign Up → Create Ad → Track Performance

4. Performance Tests:
   - k6 load testing
   - API: <200ms p95 para endpoints principales
   - Feed: <500ms para cargar 50 pins
   - Search: <100ms para autocomplete
   - Upload: <5s para procesamiento completo
   - Concurrent users: soportar 1000 simultáneos

5. Security Tests:
   - OWASP Top 10 checklist
   - Auth bypass attempts
   - SQL injection
   - XSS
   - CSRF
   - Rate limiting verification

6. Cross-Review (cada agente revisa a otro):
   - Agent1 revisa código de Agent3 (ML service integration)
   - Agent2 revisa código de Agent1 (API responses)
   - Agent3 revisa código de Agent2 (performance frontend)
```

---

## 8. CRITERIOS DE ACEPTACIÓN GLOBALES

### Performance Targets:
| Métrica | Target |
|---------|--------|
| Time to First Byte (TTFB) | <200ms |
| Largest Contentful Paint (LCP) | <2.5s |
| First Input Delay (FID) | <100ms |
| Cumulative Layout Shift (CLS) | <0.1 |
| API Response Time (p95) | <300ms |
| Feed Load Time | <1.5s |
| Search Autocomplete | <100ms |
| Image Upload + Process | <5s |
| Lighthouse Score | >85 |
| Concurrent Users | >1000 |

### Feature Completeness:
```
□ User can register with email or social auth
□ User can create pins with images and videos
□ User can create and manage boards
□ User can save pins to boards
□ User can follow/unfollow other users
□ User sees personalized feed
□ User can search pins, boards, and users
□ User can comment on pins
□ User can like/react to pins
□ User can message other users in real-time
□ User receives push and in-app notifications
□ User can report inappropriate content
□ User can use app in Spanish, Portuguese, English
□ Business users can create ad campaigns
□ Business users can see analytics
□ Admin can manage users, content, and reports
□ App works on mobile (React Native)
□ App works as PWA
□ Browser extension saves pins from websites
□ Images are optimized and served via CDN
□ Search is fast and relevant
□ Feed recommendations improve with usage
```

---

## 9. GUÍA RÁPIDA PARA CADA AGENTE

### Para ATLAS (Agente 1 — Codex):
```
INICIO INMEDIATO (sin esperar a nadie):
1. ATLAS-001: Crear monorepo
2. ATLAS-002: Database schema
3. ATLAS-003: NestJS setup
4. ATLAS-004: API contracts ← PUBLICAR para que Agent2 y Agent3 puedan trabajar

DESPUÉS (paralelo con Agent2 y Agent3):
5. ATLAS-005: Auth
6. ATLAS-006: Pins CRUD
7. ATLAS-007: Boards
8. ATLAS-008: Users
9. ATLAS-009: Comments
10. ATLAS-010: Feed
11. ATLAS-011: Search API
12. ATLAS-012: Messaging
13. ATLAS-013: Notifications
14. ATLAS-014: Reports
15. ATLAS-015: Ads
16. ATLAS-016: Analytics
17. ATLAS-017: Business
18. ATLAS-018: Cache
19. ATLAS-019: Workers
20. ATLAS-020: Emails

REPO: github.com/tu-org/pinlat
BRANCH BASE: agent1/backend
MERGE TARGET: develop
```

### Para NOVA (Agente 2 — Claude Code):
```
INICIO INMEDIATO (sin esperar a nadie):
1. NOVA-002: Design System (puede empezar con mock types)

DESPUÉS DE ATLAS-001 (monorepo listo):
2. NOVA-001: Next.js setup

DESPUÉS DE ATLAS-004 (API contracts):
3. NOVA-003: Masonry Grid
4. NOVA-004: Auth pages
5. NOVA-005: Feed UI
6. NOVA-006: Pin Detail
7. NOVA-007: Board pages
8. NOVA-008: Profile pages
9. NOVA-009: Search UI
10. NOVA-010: Create Pin UI
11. NOVA-011: Messaging UI
12. NOVA-012: Notifications UI
13. NOVA-013: Import Pin
14. NOVA-014: Mobile Setup
15. NOVA-015: Mobile Screens
16. NOVA-016: Browser Extension

REPO: github.com/tu-org/pinlat
BRANCH BASE: agent2/frontend
MERGE TARGET: develop
CONSUME: packages/shared-types (de Agent1)
```

### Para TITAN (Agente 3 — Gemini Ultra):
```
INICIO INMEDIATO (sin esperar a nadie):
1. TITAN-001: Docker setup
2. TITAN-002: CI/CD
3. TITAN-003: Storage

DESPUÉS DE ATLAS-004 (API contracts):
4. TITAN-004: Search Engine
5. TITAN-005: Realtime
6. TITAN-010: Security

DESPUÉS DE NOVA-002 (Design System):
7. TITAN-007: Admin Panel

PARALELO:
8. TITAN-006: ML Service
9. TITAN-008: Monitoring
10. TITAN-009: Terraform
11. TITAN-011: i18n LATAM

REPO: github.com/tu-org/pinlat
BRANCH BASE: agent3/platform
MERGE TARGET: develop
CONSUME: packages/ui (de Agent2), packages/shared-types (de Agent1)
```

---

## 10. PROMPT BASE PARA CADA AGENTE

### Prompt para ATLAS (copiar y pegar en Codex):
```
Eres ATLAS, ingeniero backend senior en el proyecto PinLat (clon de Pinterest para LATAM).
Tu stack: NestJS + TypeScript + PostgreSQL + Prisma + Redis + BullMQ + S3.
Tu rama base: agent1/backend
Tu workspace principal: apps/api/ y packages/database/

REGLAS:
- Escribe TypeScript estricto (no any, no as unknown)
- Usa Prisma para TODAS las queries
- Cada endpoint tiene: validation (class-validator), auth guard, error handling, pagination
- Conventional Commits obligatorio
- Tests unitarios para cada service
- Swagger decorators en cada controller
- Response format estándar: { data, meta: { page, limit, total } }

Tu backlog está en ATLAS-001 a ATLAS-020. Empieza por ATLAS-001.
Cuando termines cada tarea, haz commit y abre PR a develop.
```

### Prompt para NOVA (copiar y pegar en Claude Code):
```
Eres NOVA, ingeniera frontend senior en el proyecto PinLat (clon de Pinterest para LATAM).
Tu stack: Next.js 15 + TypeScript + Tailwind CSS + TanStack Query + Zustand + React Native.
Tu rama base: agent2/frontend
Tu workspace principal: apps/web/, apps/mobile/, packages/ui/

REGLAS:
- TypeScript estricto
- Componentes funcionales con hooks
- TanStack Query para TODOS los data fetches
- Tailwind CSS (no CSS modules ni styled-components)
- Responsive-first design
- Accesibilidad (ARIA labels, keyboard navigation)
- Optimistic updates donde sea posible
- next/image para TODAS las imágenes
- i18n: todo texto visible debe pasar por next-intl

Tu backlog está en NOVA-001 a NOVA-016. Empieza por NOVA-002 (Design System).
Cuando termines cada tarea, haz commit y abre PR a develop.
```

### Prompt para TITAN (copiar y pegar en Gemini Ultra):
```
Eres TITAN, ingeniero de plataforma y ML senior en el proyecto PinLat (clon de Pinterest para LATAM).
Tu stack: Docker + GitHub Actions + Terraform + Python FastAPI + Socket.io + Elasticsearch/Meilisearch.
Tu rama base: agent3/platform
Tus workspaces: infra/, apps/ml-service/, apps/admin/, .github/workflows/

REGLAS:
- Docker: multi-stage builds, non-root users, health checks
- CI/CD: cache agresivo, fail fast, parallel jobs
- ML: modelos livianos que corran sin GPU
- Admin: usa componentes de @pinlat/ui
- Monitoring: métricas de negocio además de infra
- Security: OWASP Top 10 compliance

Tu backlog está en TITAN-001 a TITAN-011. Empieza por TITAN-001 (Docker).
Cuando termines cada tarea, haz commit y abre PR a develop.
```

---

## RESUMEN EJECUTIVO

| Métrica | Valor |
|---------|-------|
| Total de tareas | 47 tareas |
| Agente 1 (ATLAS) | 20 tareas |
| Agente 2 (NOVA) | 16 tareas |
| Agente 3 (TITAN) | 11 tareas |
| Sync Points | 6 puntos de sincronización |
| Estimación total | ~35 días (con 3 agentes paralelos) |
| Fases | 5 fases |
| Endpoints API | ~80 endpoints |
| Modelos de datos | 18 modelos principales |
| Idiomas | 3 (es, pt, en) |
| Plataformas | Web + Mobile (iOS/Android) + PWA + Browser Extension |

---

*Documento generado como plan maestro para el proyecto PinLat. Cada tarea incluye instrucciones detalladas, criterios de aceptación, dependencias y estimaciones. Los agentes pueden comenzar a trabajar inmediatamente en las tareas marcadas como "INICIO INMEDIATO".*
