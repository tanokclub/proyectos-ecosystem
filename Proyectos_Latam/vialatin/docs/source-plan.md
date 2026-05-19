# 🗺️ VIALATIN — Clon Completo de Waze para Latinoamérica
## Plan Maestro de Desarrollo Multi-Agente

---

## 1. VISIÓN DEL PRODUCTO

**Nombre del proyecto:** ViaLatín (nombre de trabajo)
**Objetivo:** Crear una plataforma de navegación GPS comunitaria en tiempo real, feature-complete respecto a Waze, optimizada para Latinoamérica.

### Funcionalidades Core
- Navegación GPS turn-by-turn con voz en español/portugués
- Reportes comunitarios en tiempo real (accidentes, policía, peligros, cierres viales, baches)
- Tráfico en tiempo real con predicción inteligente
- Optimización de rutas con recálculo dinámico
- Sistema de puntos y gamificación
- Alertas de cámaras de velocidad y radares
- Precios de gasolina/combustible por estación
- Compartir ETA con contactos
- Editor de mapas comunitario
- Alertas de seguridad (zonas peligrosas — crítico para LATAM)
- Información de peajes y casetas
- Mapas offline
- Integración con apps de música
- Panel de administración y moderación
- Plataforma de publicidad geolocalizada

---

## 2. ARQUITECTURA TÉCNICA

### Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| **Mobile** | React Native + Mapbox GL Native |
| **Backend API** | Node.js (NestJS) + GraphQL + REST |
| **Tiempo Real** | WebSocket (Socket.IO) + Redis Pub/Sub |
| **Base de Datos** | PostgreSQL + PostGIS (geo) / MongoDB (reportes) / Redis (cache + sesiones) |
| **Routing Engine** | OSRM (Open Source Routing Machine) + Valhalla |
| **Mapas** | OpenStreetMap + Mapbox + tiles propios |
| **ML/AI** | Python (FastAPI) + TensorFlow/PyTorch |
| **Mensajería** | Apache Kafka (event streaming) |
| **Infraestructura** | AWS (ECS/EKS) + Terraform + Docker |
| **CI/CD** | GitHub Actions + ArgoCD |
| **Monitoreo** | Prometheus + Grafana + Sentry |
| **CDN** | CloudFront + S3 |
| **Push Notifications** | Firebase Cloud Messaging (FCM) + APNs |

### Diagrama de Arquitectura (Alto Nivel)

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CLIENTES MÓVILES                            │
│                    (React Native iOS/Android)                       │
└──────────────┬──────────────────────────────────┬───────────────────┘
               │ HTTPS/WSS                         │ HTTPS
               ▼                                   ▼
┌──────────────────────────┐      ┌──────────────────────────────────┐
│   API Gateway (Kong)     │      │   CDN (CloudFront)               │
│   Rate Limiting + Auth   │      │   Map Tiles + Assets Estáticos   │
└──────────┬───────────────┘      └──────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    CAPA DE MICROSERVICIOS                           │
│                                                                     │
│  ┌─────────────┐ ┌──────────────┐ ┌──────────────┐ ┌────────────┐ │
│  │ Auth Service │ │ User Service │ │ Route Service│ │ Report     │ │
│  │ (JWT/OAuth)  │ │ (Perfiles)   │ │ (Navegación) │ │ Service    │ │
│  └─────────────┘ └──────────────┘ └──────────────┘ └────────────┘ │
│                                                                     │
│  ┌─────────────┐ ┌──────────────┐ ┌──────────────┐ ┌────────────┐ │
│  │ Traffic Svc  │ │ Gamification │ │ Fuel Price   │ │ Social     │ │
│  │ (Tiempo Real)│ │ Service      │ │ Service      │ │ Service    │ │
│  └─────────────┘ └──────────────┘ └──────────────┘ └────────────┘ │
│                                                                     │
│  ┌─────────────┐ ┌──────────────┐ ┌──────────────┐ ┌────────────┐ │
│  │ Map Editor  │ │ Notification │ │ Ads/Sponsor  │ │ Admin      │ │
│  │ Service     │ │ Service      │ │ Service      │ │ Panel API  │ │
│  └─────────────┘ └──────────────┘ └──────────────┘ └────────────┘ │
│                                                                     │
│  ┌─────────────┐ ┌──────────────┐                                  │
│  │ Safety/     │ │ Analytics    │                                  │
│  │ Security Svc│ │ Service      │                                  │
│  └─────────────┘ └──────────────┘                                  │
└─────────────────────────┬───────────────────────────────────────────┘
                          │
           ┌──────────────┼──────────────┐
           ▼              ▼              ▼
┌────────────────┐ ┌────────────┐ ┌──────────────┐
│ PostgreSQL +   │ │ MongoDB    │ │ Redis Cluster│
│ PostGIS        │ │ (Reportes) │ │ (Cache+PubSub│
└────────────────┘ └────────────┘ └──────────────┘
                          │
                          ▼
              ┌──────────────────────┐
              │ Apache Kafka         │
              │ (Event Streaming)    │
              └──────────┬───────────┘
                         ▼
              ┌──────────────────────┐
              │ ML Pipeline          │
              │ (Traffic Prediction) │
              │ (Route Optimization) │
              │ (Anomaly Detection)  │
              └──────────────────────┘
```

---

## 3. ESTRATEGIA GIT Y TRABAJO PARALELO

### Repositorio Mono-Repo con Workspaces

```
vialatin/
├── apps/
│   ├── mobile/          ← AGENTE 2 (Claude Code)
│   ├── admin-panel/     ← AGENTE 2 (Claude Code)
│   └── map-editor/      ← AGENTE 2 (Claude Code)
├── services/
│   ├── api-gateway/     ← AGENTE 1 (Codex)
│   ├── auth-service/    ← AGENTE 1 (Codex)
│   ├── user-service/    ← AGENTE 1 (Codex)
│   ├── route-service/   ← AGENTE 1 (Codex)
│   ├── report-service/  ← AGENTE 1 (Codex)
│   ├── traffic-service/ ← AGENTE 1 (Codex)
│   ├── gamification/    ← AGENTE 1 (Codex)
│   ├── fuel-service/    ← AGENTE 1 (Codex)
│   ├── social-service/  ← AGENTE 1 (Codex)
│   ├── notification/    ← AGENTE 1 (Codex)
│   ├── ads-service/     ← AGENTE 1 (Codex)
│   ├── admin-service/   ← AGENTE 1 (Codex)
│   ├── safety-service/  ← AGENTE 1 (Codex)
│   └── analytics/       ← AGENTE 1 (Codex)
├── ml/
│   ├── traffic-prediction/  ← AGENTE 3 (Gemini)
│   ├── route-optimizer/     ← AGENTE 3 (Gemini)
│   ├── anomaly-detection/   ← AGENTE 3 (Gemini)
│   └── eta-estimator/       ← AGENTE 3 (Gemini)
├── maps/
│   ├── tile-server/         ← AGENTE 3 (Gemini)
│   ├── osrm-config/         ← AGENTE 3 (Gemini)
│   ├── valhalla-config/     ← AGENTE 3 (Gemini)
│   └── geocoding/           ← AGENTE 3 (Gemini)
├── infra/
│   ├── terraform/       ← AGENTE 1 (Codex)
│   ├── docker/          ← AGENTE 1 (Codex)
│   ├── k8s/             ← AGENTE 1 (Codex)
│   └── ci-cd/           ← ORQUESTADOR
├── shared/
│   ├── proto/           ← ORQUESTADOR (define contratos)
│   ├── types/           ← ORQUESTADOR (tipos compartidos)
│   └── utils/           ← ORQUESTADOR
├── tests/
│   ├── e2e/             ← QA VALIDATOR
│   ├── integration/     ← QA VALIDATOR
│   ├── load/            ← QA VALIDATOR
│   └── security/        ← QA VALIDATOR
└── docs/
    ├── api-specs/       ← ORQUESTADOR
    ├── architecture/    ← ORQUESTADOR
    └── runbooks/        ← ORQUESTADOR
```

### Estrategia de Ramas

```
main                        ← Producción (protegida, solo merge de release)
├── develop                 ← Integración (merge de features)
├── agent1/backend-core     ← Rama principal Agente 1
│   ├── agent1/auth-service
│   ├── agent1/user-service
│   ├── agent1/route-service
│   ├── agent1/report-service
│   ├── agent1/traffic-service
│   ├── agent1/gamification
│   ├── agent1/fuel-service
│   ├── agent1/social-service
│   ├── agent1/notification
│   ├── agent1/ads-service
│   ├── agent1/admin-service
│   ├── agent1/safety-service
│   ├── agent1/analytics
│   └── agent1/infra
├── agent2/mobile-core      ← Rama principal Agente 2
│   ├── agent2/navigation-ui
│   ├── agent2/reporting-ui
│   ├── agent2/social-ui
│   ├── agent2/gamification-ui
│   ├── agent2/settings-ui
│   ├── agent2/map-editor
│   └── agent2/admin-panel
├── agent3/maps-ml-core     ← Rama principal Agente 3
│   ├── agent3/tile-server
│   ├── agent3/routing-engine
│   ├── agent3/traffic-ml
│   ├── agent3/eta-predictor
│   ├── agent3/geocoding
│   └── agent3/anomaly-detection
├── orchestrator/contracts   ← Contratos API, tipos, integración
│   ├── orchestrator/api-specs
│   ├── orchestrator/shared-types
│   └── orchestrator/ci-cd
└── qa/testing              ← Tests e2e, integración, carga
    ├── qa/e2e-tests
    ├── qa/integration-tests
    ├── qa/load-tests
    └── qa/security-audit
```

### Reglas de Merge

1. Cada agente trabaja en sus sub-ramas (`agent1/auth-service`, etc.)
2. Cuando completa un servicio, hace PR a su rama principal (`agent1/backend-core`)
3. El **Orquestador** revisa y aprueba PRs de ramas principales → `develop`
4. El **QA Validator** ejecuta tests en `develop` antes de aprobar merge a `main`
5. **Conflictos**: Solo el Orquestador resuelve conflictos entre agentes
6. **Contratos API**: El Orquestador los publica PRIMERO en `shared/proto` y `shared/types`

---

## 4. ROLES INTERNOS

### 🎯 ORQUESTADOR (Rol Interno — Tú o un agente dedicado)

**Perfil:** Arquitecto de Software Senior + Tech Lead + DevOps Lead

**Responsabilidades:**
- Definir y publicar TODOS los contratos API (OpenAPI/Protobuf) ANTES de que los agentes comiencen
- Crear los tipos TypeScript compartidos en `shared/types`
- Configurar el mono-repo (package.json workspaces, tsconfig paths)
- Configurar CI/CD pipelines en GitHub Actions
- Resolver conflictos de merge entre agentes
- Revisar PRs de cada agente → aprobar o devolver con feedback
- Verificar integración entre servicios
- Mantener documentación de arquitectura actualizada
- Definir variables de entorno y secrets
- Gestionar el backlog y repriorizar si hay bloqueos

### ✅ QA VALIDATOR (Rol Interno — Agente de Validación)

**Perfil:** QA Lead Senior + Security Engineer + Performance Engineer

**Responsabilidades:**
- Escribir y mantener suite de tests E2E (Detox para mobile, Playwright para web)
- Tests de integración entre microservicios
- Tests de carga (k6, Artillery)
- Auditoría de seguridad (OWASP, penetration testing básico)
- Validar que cada feature cumple los criterios de aceptación
- Verificar rendimiento (latencia de rutas < 500ms, updates de tráfico < 2s)
- Validar UX flows completos
- Certificar releases antes de merge a main
- Reportar bugs y regressions al agente correspondiente

---

## 5. CONTRATOS API (PUBLICADOS POR ORQUESTADOR — SPRINT 0)

Estos contratos se publican ANTES de que los agentes comiencen para que todos trabajen contra las mismas interfaces.

### 5.1 Auth Service API

```yaml
# POST /api/v1/auth/register
Request: { email, password, displayName, phone, country }
Response: { userId, token, refreshToken }

# POST /api/v1/auth/login
Request: { email, password } | { phone, otp }
Response: { token, refreshToken, user }

# POST /api/v1/auth/refresh
Request: { refreshToken }
Response: { token, refreshToken }

# POST /api/v1/auth/oauth
Request: { provider: "google"|"apple"|"facebook", idToken }
Response: { token, refreshToken, user }
```

### 5.2 User Service API

```yaml
# GET /api/v1/users/me
Response: { id, email, displayName, avatar, points, level, country, settings }

# PATCH /api/v1/users/me
Request: { displayName?, avatar?, settings? }

# GET /api/v1/users/:id/stats
Response: { totalKm, totalReports, totalPoints, rank, badges[] }
```

### 5.3 Route Service API

```yaml
# POST /api/v1/routes/calculate
Request: { origin: {lat, lng}, destination: {lat, lng}, waypoints?[], avoidTolls?, avoidHighways? }
Response: { routes[]: { id, distance, duration, polyline, steps[], tolls[], trafficLevel } }

# POST /api/v1/routes/navigate
Request: { routeId }
Response: WebSocket channel ID for real-time updates

# WebSocket /ws/navigation/:channelId
Events: { type: "position_update"|"reroute"|"alert"|"eta_update", data }
```

### 5.4 Report Service API

```yaml
# POST /api/v1/reports
Request: { type: "accident"|"police"|"hazard"|"closure"|"pothole"|"flood"|"construction",
           location: {lat, lng}, description?, severity: 1-5, photos?[] }
Response: { reportId, points_earned }

# GET /api/v1/reports/nearby
Request: { lat, lng, radius_km, types?[] }
Response: { reports[]: { id, type, location, severity, upvotes, createdAt, active } }

# POST /api/v1/reports/:id/confirm
# POST /api/v1/reports/:id/dismiss
# POST /api/v1/reports/:id/comment
```

### 5.5 Traffic Service API

```yaml
# GET /api/v1/traffic/area
Request: { bounds: {ne: {lat,lng}, sw: {lat,lng}} }
Response: { segments[]: { polyline, speed, congestionLevel: 0-4, updatedAt } }

# WebSocket /ws/traffic
Subscribe: { bounds }
Events: { type: "traffic_update", segments[] }
```

### 5.6 Fuel Service API

```yaml
# GET /api/v1/fuel/stations
Request: { lat, lng, radius_km, fuelType? }
Response: { stations[]: { id, name, brand, location, prices: { regular, premium, diesel }, updatedAt, updatedBy } }

# POST /api/v1/fuel/stations/:id/price
Request: { fuelType, price, currency }
Response: { points_earned }
```

### 5.7 Gamification API

```yaml
# GET /api/v1/gamification/leaderboard
Request: { country?, city?, period: "weekly"|"monthly"|"alltime" }
Response: { rankings[]: { userId, displayName, points, rank } }

# GET /api/v1/gamification/badges
Response: { available[]: { id, name, description, icon, requirement }, earned[]: { badgeId, earnedAt } }

# POST /api/v1/gamification/points (internal)
Request: { userId, action, amount, metadata }
```

### 5.8 Social Service API

```yaml
# GET /api/v1/social/friends
# POST /api/v1/social/friends/add
# POST /api/v1/social/eta/share
Request: { routeId, friendIds[], message? }
# GET /api/v1/social/friends/live
Response: { friends[]: { userId, location?, eta?, destination? } }
```

### 5.9 Safety Service API

```yaml
# GET /api/v1/safety/zones
Request: { lat, lng, radius_km }
Response: { zones[]: { id, polygon, riskLevel: 1-5, type, description, updatedAt } }

# POST /api/v1/safety/alert
Request: { type: "robbery"|"assault"|"suspicious"|"emergency", location, description }
Response: { alertId }

# WebSocket /ws/safety
Events: { type: "safety_alert", data }
```

### 5.10 Notification Service API (Internal)

```yaml
# POST /api/v1/notifications/send
Request: { userId|broadcast, type, title, body, data?, channel: "push"|"in-app"|"sms" }

# GET /api/v1/notifications
Response: { notifications[]: { id, type, title, body, read, createdAt } }
```

### 5.11 Ads Service API

```yaml
# GET /api/v1/ads/nearby
Request: { lat, lng, route_polyline? }
Response: { ads[]: { id, type: "pin"|"banner"|"search", content, location?, action } }

# POST /api/v1/ads/impression
# POST /api/v1/ads/click
```

### 5.12 Admin Service API

```yaml
# GET /api/v1/admin/dashboard
# GET /api/v1/admin/users
# GET /api/v1/admin/reports
# PATCH /api/v1/admin/reports/:id/moderate
# GET /api/v1/admin/analytics
# POST /api/v1/admin/broadcast
```

### 5.13 Map Editor API

```yaml
# GET /api/v1/map-editor/tiles/:z/:x/:y/editable
# POST /api/v1/map-editor/segments
Request: { geometry, roadType, name, speedLimit, oneWay, lanes }
# PUT /api/v1/map-editor/segments/:id
# POST /api/v1/map-editor/segments/:id/review
# GET /api/v1/map-editor/pending-reviews
```

---

## 6. ASIGNACIÓN DE AGENTES Y BACKLOGS COMPLETOS

---

## ═══════════════════════════════════════
## AGENTE 1 — CODEX (Backend & Infraestructura)
## ═══════════════════════════════════════

**Rol:** Backend Architect + DevOps Engineer + Database Engineer
**Tecnologías:** Node.js, NestJS, TypeScript, PostgreSQL, PostGIS, MongoDB, Redis, Kafka, Docker, Terraform, AWS

### Instrucciones Globales para Agente 1:

```
Eres el Agente 1 (Backend & Infraestructura) del proyecto ViaLatín.
Tu rama base es: agent1/backend-core (basada en develop)
Crea sub-ramas para cada servicio: agent1/[nombre-servicio]

REGLAS:
1. Cada microservicio debe ser un módulo NestJS independiente con su propio Dockerfile
2. Todos los servicios exponen health checks en GET /health
3. Usa los contratos API definidos en shared/proto y shared/types SIN modificarlos
4. Cada servicio debe tener: tests unitarios (>80% coverage), Dockerfile, docker-compose.yml local, README.md
5. Base de datos: usa migraciones (TypeORM para PostgreSQL, Mongoose para MongoDB)
6. Logging estructurado con Winston (JSON format)
7. Métricas con Prometheus client
8. Variables de entorno documentadas en .env.example
9. Implementa retry patterns y circuit breakers para comunicación entre servicios
10. Autenticación JWT con refresh tokens, verificada en middleware global
```

### BACKLOG AGENTE 1 — SPRINT 1 (Fundación)

| ID | Tarea | Prioridad | Estimación | Dependencia |
|----|-------|-----------|------------|-------------|
| A1-001 | **Mono-repo Setup**: Inicializar NestJS mono-repo con workspaces, configurar tsconfig paths, ESLint, Prettier, husky pre-commit hooks | P0 | 2h | Ninguna |
| A1-002 | **Docker Base Images**: Crear Dockerfiles base para Node.js services (multi-stage build), configurar docker-compose.yml con PostgreSQL+PostGIS, MongoDB, Redis, Kafka | P0 | 3h | A1-001 |
| A1-003 | **Auth Service - Registro/Login**: Implementar registro con email+password (bcrypt), login con JWT (access+refresh tokens), validación de email, rate limiting | P0 | 4h | A1-001 |
| A1-004 | **Auth Service - OAuth**: Implementar login con Google, Apple, Facebook. Estrategias Passport.js. Merge de cuentas si mismo email. | P0 | 3h | A1-003 |
| A1-005 | **Auth Service - OTP Phone**: Verificación por SMS (Twilio), login con OTP, throttling de envíos | P1 | 3h | A1-003 |
| A1-006 | **Auth Service - Middleware JWT**: Guardia global JWT, decoradores @Public() y @Roles(), refresh token rotation | P0 | 2h | A1-003 |
| A1-007 | **User Service - CRUD**: Perfil de usuario (crear, leer, actualizar), avatar upload a S3, settings (idioma, unidades, voz) | P0 | 3h | A1-006 |
| A1-008 | **User Service - Preferencias de Navegación**: Guardar rutas favoritas, lugares frecuentes (casa, trabajo), historial de navegación | P1 | 2h | A1-007 |
| A1-009 | **Database Schemas & Migrations**: Diseñar y crear todas las tablas PostgreSQL con PostGIS, índices espaciales, particionamiento por país | P0 | 4h | A1-002 |
| A1-010 | **MongoDB Schemas**: Diseñar colecciones para reportes, comentarios, logs de actividad con TTL indexes | P0 | 2h | A1-002 |
| A1-011 | **Redis Configuration**: Configurar Redis Cluster para cache (TTL policies), sesiones, pub/sub channels, rate limiting con sliding window | P0 | 2h | A1-002 |
| A1-012 | **Kafka Setup**: Configurar topics (traffic-updates, reports, user-events, notifications), producers/consumers base, dead letter queues | P0 | 3h | A1-002 |
| A1-013 | **API Gateway (Kong)**: Configurar Kong con rate limiting, CORS, request/response transformation, logging, health aggregation | P1 | 3h | A1-002 |

### BACKLOG AGENTE 1 — SPRINT 2 (Servicios Core)

| ID | Tarea | Prioridad | Estimación | Dependencia |
|----|-------|-----------|------------|-------------|
| A1-014 | **Route Service - Cálculo de Rutas**: Integrar con OSRM/Valhalla, recibir origin+destination, devolver alternativas con polyline, distancia, tiempo estimado | P0 | 5h | A1-009, contratos Agente 3 |
| A1-015 | **Route Service - Navegación en Tiempo Real**: WebSocket server para navegación activa, enviar position updates, detectar desviación de ruta, trigger re-routing | P0 | 5h | A1-014 |
| A1-016 | **Route Service - Waypoints y Paradas**: Soporte para múltiples waypoints, optimización de orden de paradas, recálculo parcial | P1 | 3h | A1-014 |
| A1-017 | **Route Service - Opciones de Ruta**: Evitar peajes, evitar autopistas, evitar zonas peligrosas, preferir rutas iluminadas (nocturno) | P1 | 3h | A1-014 |
| A1-018 | **Report Service - CRUD Reportes**: Crear, leer, actualizar reportes. Tipos: accidente, policía, peligro, cierre, bache, inundación, construcción. Upload de fotos a S3. | P0 | 4h | A1-009, A1-010 |
| A1-019 | **Report Service - Nearby Query**: Consulta geoespacial para reportes cercanos (PostGIS ST_DWithin), filtrado por tipo, paginación cursor-based | P0 | 3h | A1-018 |
| A1-020 | **Report Service - Confirmación/Desestimación**: Upvote/downvote de reportes, auto-expire basado en votes negativos y tiempo, sistema de confianza del reporter | P0 | 3h | A1-018 |
| A1-021 | **Report Service - Comentarios**: Thread de comentarios en reportes, moderación automática (banned words), notificación al reporter | P1 | 2h | A1-018 |
| A1-022 | **Traffic Service - Ingesta de Datos**: Recibir position updates de usuarios activos via Kafka, agregar en segmentos de vía, calcular velocidad promedio por segmento | P0 | 5h | A1-012 |
| A1-023 | **Traffic Service - Consulta de Tráfico**: API para obtener estado de tráfico por bounding box, color-coded por congestión (verde/amarillo/rojo/rojo oscuro) | P0 | 3h | A1-022 |
| A1-024 | **Traffic Service - WebSocket Real-Time**: Push de actualizaciones de tráfico a clientes suscritos por área geográfica | P0 | 4h | A1-022 |
| A1-025 | **Traffic Service - Historical Data**: Almacenar patrones de tráfico históricos por día/hora para predicción base | P1 | 3h | A1-022 |

### BACKLOG AGENTE 1 — SPRINT 3 (Servicios Secundarios)

| ID | Tarea | Prioridad | Estimación | Dependencia |
|----|-------|-----------|------------|-------------|
| A1-026 | **Fuel Service - Estaciones**: CRUD de estaciones de gasolina, importar datos de APIs públicas (ANP Brasil, Profeco México, etc.), índices geoespaciales | P1 | 4h | A1-009 |
| A1-027 | **Fuel Service - Precios**: Actualización de precios por usuarios, histórico de precios, ranking por precio, validación anti-fraude (outlier detection) | P1 | 3h | A1-026 |
| A1-028 | **Gamification Service - Puntos**: Sistema de puntos por acciones (reporte=10pts, confirmar=5pts, km conducido=1pt/km, precio gasolina=15pts) | P0 | 3h | A1-009 |
| A1-029 | **Gamification Service - Niveles y Badges**: Definir 20 niveles (Bebé Waze → Rey de la Ruta), 30+ badges por logros especiales, progression curve | P1 | 3h | A1-028 |
| A1-030 | **Gamification Service - Leaderboards**: Rankings por país, ciudad, semana, mes, all-time. Cache en Redis con sorted sets. | P1 | 3h | A1-028 |
| A1-031 | **Social Service - Amigos**: Agregar/eliminar amigos, buscar por username/teléfono, sincronizar contactos del teléfono | P1 | 3h | A1-007 |
| A1-032 | **Social Service - Compartir ETA**: Generar link de ETA en tiempo real, actualización via WebSocket, auto-expire al llegar | P1 | 3h | A1-031, A1-015 |
| A1-033 | **Social Service - Ver Amigos en Mapa**: Compartir ubicación con amigos seleccionados, privacy settings | P2 | 3h | A1-031 |
| A1-034 | **Notification Service - Push**: Integrar FCM y APNs, templates por tipo de notificación, preferencias de usuario, quiet hours | P0 | 4h | A1-012 |
| A1-035 | **Notification Service - In-App**: Sistema de notificaciones in-app con badge count, mark as read, bulk operations | P1 | 2h | A1-034 |
| A1-036 | **Safety Service - Zonas de Riesgo**: CRUD de zonas peligrosas (polígonos), niveles de riesgo 1-5, fuentes (comunidad + datos oficiales), alertas al ingresar | P0 | 4h | A1-009 |
| A1-037 | **Safety Service - Alertas SOS**: Botón de emergencia, compartir ubicación con contactos de emergencia, grabar audio, timer de seguridad (check-in) | P0 | 4h | A1-036 |
| A1-038 | **Safety Service - Ruta Segura**: Endpoint que recomienda rutas más seguras (evitar zonas peligrosas), especialmente en horario nocturno | P1 | 3h | A1-036, A1-014 |

### BACKLOG AGENTE 1 — SPRINT 4 (Plataforma y Admin)

| ID | Tarea | Prioridad | Estimación | Dependencia |
|----|-------|-----------|------------|-------------|
| A1-039 | **Ads Service - Gestión de Campañas**: CRUD de campañas publicitarias, targeting por ubicación/ruta/demografía, presupuesto diario, scheduling | P2 | 5h | A1-009 |
| A1-040 | **Ads Service - Serving**: Algoritmo de selección de ads basado en ubicación del usuario, relevancia, bid, frequency capping | P2 | 4h | A1-039 |
| A1-041 | **Ads Service - Analytics**: Impressions, clicks, CTR, conversiones, reporting para anunciantes | P2 | 3h | A1-039 |
| A1-042 | **Admin Service - Dashboard API**: Endpoints para métricas: usuarios activos, reportes por hora, segmentos de tráfico, cobertura de mapa | P1 | 4h | A1-009 |
| A1-043 | **Admin Service - User Management**: Listar, buscar, suspender, banear usuarios. Ver historial de actividad. | P1 | 3h | A1-042 |
| A1-044 | **Admin Service - Content Moderation**: Cola de reportes flaggeados, aprobar/rechazar ediciones de mapa, gestionar reports abusivos | P1 | 3h | A1-042 |
| A1-045 | **Admin Service - Broadcast**: Enviar mensajes a todos los usuarios de un país/ciudad, alertas de emergencia (desastres naturales) | P1 | 2h | A1-034, A1-042 |
| A1-046 | **Map Editor Service - Segmentos**: CRUD de segmentos de vía, geometría (LineString), atributos (nombre, tipo, velocidad límite, dirección, carriles) | P1 | 4h | A1-009 |
| A1-047 | **Map Editor Service - Review System**: Cola de revisión de ediciones, aprobación/rechazo con comentarios, trust levels para editores | P1 | 3h | A1-046 |
| A1-048 | **Map Editor Service - POIs**: Puntos de interés (gasolineras, estacionamientos, restaurantes), categorías, horarios, fotos | P2 | 3h | A1-046 |
| A1-049 | **Analytics Service - Event Tracking**: Ingestar eventos de usuario via Kafka, almacenar en time-series (TimescaleDB extension), aggregar métricas | P2 | 4h | A1-012 |
| A1-050 | **Analytics Service - Dashboards Data**: APIs para dashboards con datos de retención, DAU/MAU, rutas más usadas, hotspots de reportes | P2 | 3h | A1-049 |

### BACKLOG AGENTE 1 — SPRINT 5 (Infraestructura y DevOps)

| ID | Tarea | Prioridad | Estimación | Dependencia |
|----|-------|-----------|------------|-------------|
| A1-051 | **Terraform - VPC & Networking**: VPC con subnets privadas/públicas, NAT Gateway, Security Groups, VPC peering | P0 | 4h | Ninguna |
| A1-052 | **Terraform - ECS/EKS Cluster**: Cluster de contenedores, auto-scaling policies, task definitions para cada servicio | P0 | 5h | A1-051 |
| A1-053 | **Terraform - RDS (PostgreSQL+PostGIS)**: Multi-AZ, read replicas, automated backups, parameter groups optimizados para geoespacial | P0 | 3h | A1-051 |
| A1-054 | **Terraform - ElastiCache (Redis)**: Cluster mode, automatic failover, backup/restore | P0 | 2h | A1-051 |
| A1-055 | **Terraform - MSK (Kafka)**: Managed Kafka cluster, topic auto-creation, monitoring | P0 | 2h | A1-051 |
| A1-056 | **Terraform - DocumentDB/MongoDB Atlas**: Cluster para reportes y datos flexibles | P0 | 2h | A1-051 |
| A1-057 | **Terraform - S3 + CloudFront**: Buckets para avatars, fotos de reportes, map tiles. CDN con SSL. | P0 | 2h | A1-051 |
| A1-058 | **Terraform - ALB + Route53**: Application Load Balancer, SSL certificates (ACM), DNS setup | P0 | 2h | A1-051 |
| A1-059 | **CI/CD - GitHub Actions**: Workflows para: lint, test, build Docker, push to ECR, deploy to staging/production. Branch protections. | P0 | 4h | A1-052 |
| A1-060 | **Monitoring - Prometheus + Grafana**: Scraping de métricas de todos los servicios, dashboards predefinidos (request rate, latency, errors, saturation) | P1 | 4h | A1-052 |
| A1-061 | **Monitoring - Sentry**: Error tracking para todos los servicios, source maps, release tracking, alertas en Slack | P1 | 2h | A1-052 |
| A1-062 | **Monitoring - Alertas**: PagerDuty/Slack alerts para: service down, high error rate, high latency, disk space, DB connections | P1 | 2h | A1-060 |
| A1-063 | **Secrets Management**: AWS Secrets Manager integration, rotation policies, environment-specific configs | P0 | 2h | A1-051 |
| A1-064 | **Database Backup Strategy**: Automated backups, point-in-time recovery, cross-region replication para DR | P1 | 3h | A1-053 |
| A1-065 | **Load Balancing & Auto-Scaling**: Definir scaling policies por servicio (CPU/memory/request count), spot instances para non-critical | P1 | 3h | A1-052 |

---

## ═══════════════════════════════════════
## AGENTE 2 — CLAUDE CODE (Mobile & Frontend)
## ═══════════════════════════════════════

**Rol:** Senior Mobile Engineer + UX Engineer + Frontend Developer
**Tecnologías:** React Native, TypeScript, Mapbox GL, Redux/Zustand, React Navigation, Expo (managed workflow parcial)

### Instrucciones Globales para Agente 2:

```
Eres el Agente 2 (Mobile & Frontend) del proyecto ViaLatín.
Tu rama base es: agent2/mobile-core (basada en develop)
Crea sub-ramas para cada módulo: agent2/[nombre-modulo]

REGLAS:
1. React Native con TypeScript estricto (no any)
2. State management con Zustand (ligero) + React Query (server state)
3. Mapas con Mapbox GL Native (no Google Maps — control total de tiles)
4. Navegación con React Navigation v6+ (stack + tab + drawer)
5. Diseño mobile-first, soporte iOS 14+ y Android 8+
6. Tema claro/oscuro con sistema de design tokens
7. Animaciones con Reanimated 3 + Gesture Handler
8. Offline-first donde sea posible (reportes, mapas descargados)
9. Accesibilidad (a11y): labels, contrast ratios, VoiceOver/TalkBack
10. Performance: FPS > 55 en mapa, list virtualization, memoización
11. i18n con react-intl: español (LATAM), portugués (Brasil), inglés
12. Todos los componentes con Storybook stories
13. Tests: Jest + React Native Testing Library (>70% coverage)
14. CONSUME los contratos API de shared/types — NO inventes endpoints
15. Usa mock server (MSW) mientras el backend no esté listo
```

### BACKLOG AGENTE 2 — SPRINT 1 (Fundación Mobile)

| ID | Tarea | Prioridad | Estimación | Dependencia |
|----|-------|-----------|------------|-------------|
| A2-001 | **Project Setup**: Inicializar React Native (CLI, no Expo), configurar TypeScript, ESLint, Prettier, Jest, estructura de carpetas (features-based) | P0 | 3h | Ninguna |
| A2-002 | **Design System - Tokens**: Definir design tokens (colores, tipografía, spacing, border-radius, shadows) para tema claro y oscuro. Crear ThemeProvider. | P0 | 3h | A2-001 |
| A2-003 | **Design System - Componentes Base**: Button, TextInput, Card, Modal, BottomSheet, Avatar, Badge, Toast, LoadingSpinner, EmptyState | P0 | 5h | A2-002 |
| A2-004 | **Navigation Structure**: Configurar React Navigation: AuthStack, MainTab (Map, Search, Reports, Social, Profile), Modal stack, Deep linking | P0 | 3h | A2-001 |
| A2-005 | **Auth Screens - Login**: Pantalla de login con email/password, botones OAuth (Google, Apple, Facebook), link a registro, "olvidé contraseña" | P0 | 3h | A2-003 |
| A2-006 | **Auth Screens - Registro**: Flujo multi-step: datos básicos → verificación email → configuración inicial (país, idioma, foto) | P0 | 3h | A2-003 |
| A2-007 | **Auth Screens - OTP**: Pantalla de verificación telefónica con código OTP, auto-read SMS, countdown timer | P1 | 2h | A2-005 |
| A2-008 | **Auth - State Management**: Zustand store para auth state, secure token storage (Keychain/Keystore), auto-refresh de tokens, interceptor Axios | P0 | 3h | A2-005 |
| A2-009 | **API Layer**: Configurar Axios instance con baseURL, interceptors (auth, error handling, retry), React Query provider y hooks base | P0 | 3h | A2-008 |
| A2-010 | **Mock Server (MSW)**: Configurar Mock Service Worker con todos los endpoints del contrato API para desarrollo independiente del backend | P0 | 4h | A2-009 |
| A2-011 | **i18n Setup**: Configurar react-intl con español (MX, CO, AR, CL, PE), portugués (BR), inglés. Archivos de traducción base. | P0 | 2h | A2-001 |
| A2-012 | **Permissions Manager**: Módulo para solicitar y gestionar permisos: ubicación (foreground + background), cámara, notificaciones, contactos | P0 | 2h | A2-001 |
| A2-013 | **Location Service**: Módulo nativo para tracking GPS en foreground y background, geofencing, motion detection, battery optimization | P0 | 4h | A2-012 |

### BACKLOG AGENTE 2 — SPRINT 2 (Mapa y Navegación)

| ID | Tarea | Prioridad | Estimación | Dependencia |
|----|-------|-----------|------------|-------------|
| A2-014 | **Map Screen - Base**: Pantalla principal con mapa Mapbox GL a pantalla completa, botón de centrar en ubicación, zoom controls, rotación | P0 | 4h | A2-013 |
| A2-015 | **Map Screen - User Location**: Marker animado del usuario en el mapa (puck con dirección y velocidad), smooth interpolation de posición | P0 | 3h | A2-014 |
| A2-016 | **Map Screen - Traffic Layer**: Overlay de tráfico en el mapa con colores por nivel de congestión, actualización en tiempo real via WebSocket | P0 | 4h | A2-014 |
| A2-017 | **Map Screen - Reports Layer**: Mostrar iconos de reportes en el mapa (accidente, policía, peligro, etc.), clustering cuando hay muchos, tap para ver detalle | P0 | 4h | A2-014 |
| A2-018 | **Map Screen - Speed Display**: Velocímetro actual + velocidad límite de la vía, alerta visual/sonora al exceder límite | P0 | 3h | A2-015 |
| A2-019 | **Search Bar & Destination Input**: Barra de búsqueda con autocomplete (Mapbox Geocoding), historial de búsquedas, favoritos (casa, trabajo), búsqueda por categoría | P0 | 5h | A2-014 |
| A2-020 | **Route Preview Screen**: Mostrar rutas alternativas en el mapa con colores diferentes, comparar duración/distancia/peajes, botón "Ir" | P0 | 4h | A2-019 |
| A2-021 | **Navigation Mode - UI**: Interfaz de navegación activa: mapa en perspectiva 3D, próxima maniobra (icono + distancia), ETA, distancia restante, velocidad | P0 | 6h | A2-020 |
| A2-022 | **Navigation Mode - Turn-by-Turn**: Lista de instrucciones paso a paso, highlight de paso actual, animación de transición entre pasos | P0 | 4h | A2-021 |
| A2-023 | **Navigation Mode - Voice**: Text-to-speech para instrucciones de navegación en español/portugués, volumen ajustable, integración con audio del sistema | P0 | 4h | A2-021 |
| A2-024 | **Navigation Mode - Alerts**: Alertas durante navegación (reporte cercano, cámara de velocidad, zona de riesgo), sonido + visual, dismiss | P0 | 3h | A2-021 |
| A2-025 | **Navigation Mode - Rerouting**: Detección de desviación de ruta, propuesta automática de nueva ruta, animación de transición suave | P0 | 3h | A2-021 |
| A2-026 | **Navigation Mode - Bottom Panel**: Panel inferior con: report button, ETA compartir, música, opciones de ruta, silenciar voz | P0 | 3h | A2-021 |

### BACKLOG AGENTE 2 — SPRINT 3 (Reportes y Social)

| ID | Tarea | Prioridad | Estimación | Dependencia |
|----|-------|-----------|------------|-------------|
| A2-027 | **Report Creation - Quick Report**: Bottom sheet con grid de iconos para reportar rápidamente (1 tap): policía, accidente, peligro, tráfico, cierre | P0 | 3h | A2-026 |
| A2-028 | **Report Creation - Detailed**: Formulario expandido con tipo, severidad (slider), descripción, foto (cámara o galería), ubicación (auto o manual) | P0 | 3h | A2-027 |
| A2-029 | **Report Detail View**: Pantalla de detalle de reporte: mapa mini, info del reporter, timestamps, fotos, botones confirmar/desestimar, comentarios | P0 | 3h | A2-017 |
| A2-030 | **Report List View**: Lista filtrable de reportes cercanos, ordenar por distancia/tiempo/tipo, pull to refresh | P1 | 2h | A2-029 |
| A2-031 | **Report Confirmation Flow**: Cuando el usuario pasa cerca de un reporte activo, mostrar popup "¿Sigue ahí?" con botones Sí/No | P0 | 3h | A2-017 |
| A2-032 | **Camera Integration**: Módulo de cámara para fotos de reportes, compresión de imagen, upload con progress bar, offline queue | P1 | 3h | A2-028 |
| A2-033 | **Friends List Screen**: Lista de amigos con avatar, estado (en ruta/offline), barra de búsqueda, botón agregar, swipe para eliminar | P1 | 3h | A2-003 |
| A2-034 | **Add Friend Flow**: Buscar por username, sincronizar contactos del teléfono, enviar/aceptar/rechazar solicitudes, notificaciones | P1 | 3h | A2-033 |
| A2-035 | **ETA Share Screen**: Seleccionar amigos para compartir ETA, generar link compartible (WhatsApp, SMS), vista de tracking en tiempo real | P1 | 3h | A2-033 |
| A2-036 | **Friends on Map**: Ver amigos en el mapa con sus avatares, tap para ver nombre y ETA, toggle visibility | P2 | 3h | A2-033, A2-014 |
| A2-037 | **Chat/Messages**: Mensajería básica entre amigos (text only), notificaciones push, conversation list | P2 | 4h | A2-033 |

### BACKLOG AGENTE 2 — SPRINT 4 (Gamification, Fuel, Settings)

| ID | Tarea | Prioridad | Estimación | Dependencia |
|----|-------|-----------|------------|-------------|
| A2-038 | **Profile Screen**: Avatar, nombre, estadísticas (km totales, reportes, puntos), nivel actual con barra de progreso, badges ganados | P0 | 3h | A2-003 |
| A2-039 | **Leaderboard Screen**: Tab de rankings (semanal, mensual, histórico), filtro por país/ciudad, tu posición highlighted, pull to refresh | P1 | 3h | A2-038 |
| A2-040 | **Badges Collection Screen**: Grid de badges (ganados brillantes, no ganados grises), tap para ver requisitos y progreso, animación al ganar | P1 | 3h | A2-038 |
| A2-041 | **Points Notification**: Toast/animation cuando ganas puntos ("+10 pts por reporte"), acumulador visual, level-up celebration screen | P1 | 2h | A2-038 |
| A2-042 | **Fuel Prices - Map View**: Pins de gasolineras en el mapa con precio, color por competitividad, filtro por tipo de combustible | P1 | 3h | A2-014 |
| A2-043 | **Fuel Prices - List View**: Lista de gasolineras cercanas ordenadas por precio/distancia, detalle con todos los precios, horarios, servicios | P1 | 3h | A2-042 |
| A2-044 | **Fuel Prices - Report Price**: Formulario para reportar precio: seleccionar estación, tipo combustible, precio, tomar foto del letrero | P1 | 2h | A2-043 |
| A2-045 | **Settings Screen**: Secciones: Cuenta, Navegación (evitar peajes, unidades), Notificaciones, Privacidad, Idioma, Apariencia (tema), Almacenamiento (offline), Acerca de | P0 | 4h | A2-003 |
| A2-046 | **Offline Maps**: Pantalla para seleccionar regiones y descargar mapas, gestión de espacio, actualización de mapas descargados | P1 | 4h | A2-045 |
| A2-047 | **Speed Camera Alerts**: Iconos de cámaras en el mapa, alerta visual + sonora al acercarse, configuración de distancia de alerta | P0 | 3h | A2-017 |
| A2-048 | **Toll Information**: Mostrar peajes en la ruta, costo estimado, opción de evitar en recálculo | P1 | 2h | A2-020 |

### BACKLOG AGENTE 2 — SPRINT 5 (Admin Panel, Map Editor, Polish)

| ID | Tarea | Prioridad | Estimación | Dependencia |
|----|-------|-----------|------------|-------------|
| A2-049 | **Admin Panel - Setup**: Crear app web React (Vite + TypeScript + Tailwind + shadcn/ui), auth admin, layout con sidebar | P1 | 4h | Ninguna |
| A2-050 | **Admin Panel - Dashboard**: Métricas en tiempo real: usuarios activos, reportes/hora, cobertura, gráficas (Recharts) | P1 | 4h | A2-049 |
| A2-051 | **Admin Panel - User Management**: Tabla de usuarios con búsqueda, filtros, paginación, acciones (suspender, banear, ver perfil completo) | P1 | 3h | A2-049 |
| A2-052 | **Admin Panel - Report Moderation**: Cola de reportes flaggeados, vista de mapa + detalles, aprobar/rechazar/escalar, bulk actions | P1 | 3h | A2-049 |
| A2-053 | **Admin Panel - Broadcast**: Formulario para enviar notificaciones masivas: seleccionar audiencia (país/ciudad), tipo, mensaje, programar envío | P1 | 2h | A2-049 |
| A2-054 | **Admin Panel - Analytics**: Dashboards de analytics: retención, DAU/MAU, funnel de registros, engagement, mapas de calor | P2 | 4h | A2-049 |
| A2-055 | **Map Editor - Web App**: App web para edición de mapa: visualizar segmentos, seleccionar/crear/editar geometría, atributos de vía | P1 | 6h | Ninguna |
| A2-056 | **Map Editor - Drawing Tools**: Herramientas de dibujo: crear segmento (polyline), dividir, unir, mover nodos, snap to grid | P1 | 5h | A2-055 |
| A2-057 | **Map Editor - Attributes Panel**: Panel lateral para editar: nombre de calle, tipo de vía, velocidad límite, número de carriles, dirección, restricciones | P1 | 3h | A2-055 |
| A2-058 | **Map Editor - Review Queue**: Interfaz para revisar ediciones pendientes de otros usuarios, aprobar/rechazar con comentarios | P2 | 3h | A2-055 |
| A2-059 | **Onboarding Flow**: Tutoriales interactivos para primer uso: cómo navegar, cómo reportar, cómo ganar puntos, permisos | P1 | 4h | A2-021 |
| A2-060 | **Dark Mode**: Implementar tema oscuro completo, auto-switch basado en hora del día o preferencia, mapa oscuro durante navegación nocturna | P1 | 3h | A2-002 |
| A2-061 | **Haptic Feedback**: Vibración en: reportar, recibir alerta, confirmar reporte, giros en navegación | P2 | 1h | A2-021 |
| A2-062 | **Widget iOS/Android**: Widget para pantalla de inicio: ETA al trabajo, estado de tráfico en ruta frecuente | P2 | 4h | A2-021 |
| A2-063 | **App Deep Linking**: Universal links para compartir reportes, rutas, perfiles; deferred deep linking para instalación | P1 | 3h | A2-004 |
| A2-064 | **Splash Screen & App Icon**: Diseño de splash screen animado, ícono de la app para ambas plataformas | P1 | 2h | A2-001 |
| A2-065 | **Performance Optimization**: Profile y optimizar: map rendering FPS, list virtualization (FlashList), image caching, bundle size | P0 | 4h | Todos |

---

## ═══════════════════════════════════════
## AGENTE 3 — GEMINI ULTRA (Maps, Routing & ML/AI)
## ═══════════════════════════════════════

**Rol:** GIS Engineer + ML Engineer + Routing Algorithm Specialist
**Tecnologías:** Python, FastAPI, OSRM, Valhalla, TensorFlow/PyTorch, PostGIS, OpenStreetMap, Mapbox, GDAL/OGR

### Instrucciones Globales para Agente 3:

```
Eres el Agente 3 (Maps, Routing & ML/AI) del proyecto ViaLatín.
Tu rama base es: agent3/maps-ml-core (basada en develop)
Crea sub-ramas: agent3/[nombre-modulo]

REGLAS:
1. Servicios de ML en Python con FastAPI, containerizados con Docker
2. OSRM para routing rápido, Valhalla para routing con más opciones
3. Map tiles generados con OpenMapTiles + custom styles
4. Datos de OpenStreetMap (pbf extracts por país de LATAM)
5. Modelos de ML deben ser servidos con TensorFlow Serving o TorchServe
6. Cada modelo debe tener: notebook de entrenamiento, scripts de evaluación, métricas documentadas
7. APIs de ML deben tener fallback a heurísticas si el modelo falla
8. Geocoding con Pelias (open source) + Nominatim como fallback
9. Todos los servicios geo deben soportar EPSG:4326 (WGS84)
10. Documentar accuracy metrics y latency benchmarks
11. Exponer endpoints para Agente 1 consume: routing, geocoding, traffic prediction, ETA
12. Los contratos están en shared/types — respeta los schemas de request/response
```

### BACKLOG AGENTE 3 — SPRINT 1 (Fundación Maps)

| ID | Tarea | Prioridad | Estimación | Dependencia |
|----|-------|-----------|------------|-------------|
| A3-001 | **OSM Data Pipeline**: Script para descargar, procesar y actualizar datos de OpenStreetMap para todos los países de LATAM (México, Brasil, Colombia, Argentina, Chile, Perú, Ecuador, Venezuela, etc.) | P0 | 5h | Ninguna |
| A3-002 | **OSRM Setup - Car Profile**: Compilar y configurar OSRM con perfil de auto para LATAM, custom speed profiles por tipo de vía, restricciones de giro | P0 | 4h | A3-001 |
| A3-003 | **OSRM API Wrapper**: FastAPI service que wrappea OSRM: /route, /nearest, /table, /match, /trip. Transformar respuestas al contrato API del proyecto. | P0 | 3h | A3-002 |
| A3-004 | **Valhalla Setup**: Compilar Valhalla con tiles de LATAM, configurar costing models (auto, motorcycle, pedestrian), custom penalties por tipo de vía | P0 | 4h | A3-001 |
| A3-005 | **Valhalla API Wrapper**: FastAPI service para Valhalla: routing con opciones avanzadas (evitar peajes, autopistas, zonas peligrosas), isocronas, map matching | P0 | 3h | A3-004 |
| A3-006 | **Routing Orchestrator**: Servicio que decide cuándo usar OSRM (rápido, rutas simples) vs Valhalla (opciones complejas). Failover automático. | P0 | 3h | A3-003, A3-005 |
| A3-007 | **Tile Server Setup**: Configurar OpenMapTiles con tileserver-gl, generar vector tiles (MVT/PBF) para LATAM, optimizar para mobile rendering | P0 | 5h | A3-001 |
| A3-008 | **Custom Map Style**: Crear estilo de mapa custom (inspirado en Waze pero con identidad propia): colores vivos, iconografía LATAM, modo claro y oscuro | P0 | 5h | A3-007 |
| A3-009 | **Tile CDN Pipeline**: Pipeline para generar, cachear y servir tiles via CDN. Pre-render de zoom levels populares. Invalidación de cache. | P1 | 3h | A3-007 |
| A3-010 | **Geocoding Service - Setup**: Configurar Pelias con datos de LATAM (addresses, POIs, admin boundaries), importar datos de OpenAddresses + OSM | P0 | 5h | A3-001 |
| A3-011 | **Geocoding API**: FastAPI service: /autocomplete (search-as-you-type), /search (full text), /reverse (coords → address). Optimizado para español/portugués. | P0 | 3h | A3-010 |
| A3-012 | **Geocoding - LATAM Optimization**: Mejorar resultados para patrones de dirección LATAM (colonias en México, barrios en Colombia, CEPs en Brasil), sinónimos locales | P1 | 3h | A3-011 |

### BACKLOG AGENTE 3 — SPRINT 2 (Traffic ML y Predicción)

| ID | Tarea | Prioridad | Estimación | Dependencia |
|----|-------|-----------|------------|-------------|
| A3-013 | **Traffic Data Ingestion Pipeline**: Kafka consumer que recibe GPS traces de usuarios, map-matches a segmentos de vía, calcula velocidad por segmento | P0 | 5h | A3-002 |
| A3-014 | **Traffic State Calculator**: Servicio que mantiene estado de tráfico en tiempo real: velocidad actual vs velocidad libre por segmento → nivel de congestión (0-4) | P0 | 4h | A3-013 |
| A3-015 | **Traffic Tile Generator**: Generar overlay tiles de tráfico (líneas coloreadas por congestión) en tiempo real, actualización cada 30 segundos | P0 | 4h | A3-014 |
| A3-016 | **Historical Traffic Patterns**: Pipeline para almacenar y agregar patrones de tráfico históricos: por día de semana, hora, segmento. Baseline para predicción. | P0 | 4h | A3-013 |
| A3-017 | **Traffic Prediction Model - Training**: Entrenar modelo LSTM/Transformer para predecir tráfico 15/30/60 min en el futuro basado en: datos actuales, históricos, día/hora, eventos | P0 | 8h | A3-016 |
| A3-018 | **Traffic Prediction API**: FastAPI endpoint: dada una hora futura y un bounding box, retorna predicción de congestión por segmento. Fallback a patrones históricos. | P0 | 3h | A3-017 |
| A3-019 | **Traffic-Aware Routing**: Modificar costos de OSRM/Valhalla en base al estado de tráfico actual y predicción. Ponderar segmentos congestionados para evitarlos. | P0 | 5h | A3-006, A3-014 |
| A3-020 | **Real-Time Rerouting Engine**: Servicio que monitorea la ruta activa del usuario, detecta cambios significativos de tráfico, calcula ruta alternativa y notifica si ahorra > 2min | P0 | 5h | A3-019 |
| A3-021 | **Traffic Incident Detection**: ML model que detecta incidentes de tráfico a partir de anomalías en velocidad (bajón repentino en múltiples usuarios en mismo segmento) | P1 | 5h | A3-014 |
| A3-022 | **Traffic Data Export API**: API interna para que el backend (Agente 1) consulte: estado de tráfico por bounding box, predicciones, incidentes detectados | P0 | 2h | A3-014, A3-018 |

### BACKLOG AGENTE 3 — SPRINT 3 (ETA, Safety Zones, Anomaly Detection)

| ID | Tarea | Prioridad | Estimación | Dependencia |
|----|-------|-----------|------------|-------------|
| A3-023 | **ETA Estimation Model - Training**: Modelo ML para estimar tiempo de llegada preciso considerando: distancia, tráfico actual, predicción, hora del día, condiciones climáticas (API) | P0 | 6h | A3-017 |
| A3-024 | **ETA Estimation API**: FastAPI endpoint: dado route_id y posición actual, retorna ETA actualizado. Recalcula cada 30s durante navegación. | P0 | 3h | A3-023 |
| A3-025 | **ETA Confidence Interval**: Calcular rango de ETA (optimista/esperado/pesimista) basado en varianza del modelo y condiciones | P1 | 2h | A3-024 |
| A3-026 | **Safety Zone Clustering**: Algoritmo que agrega reportes de seguridad (robos, asaltos) en clusters geoespaciales → genera polígonos de zonas de riesgo con niveles | P0 | 4h | A3-001 |
| A3-027 | **Safety Score Model**: ML model que asigna un safety score a cada segmento de vía basado en: reportes, hora del día, iluminación, tipo de zona, datos históricos | P0 | 5h | A3-026 |
| A3-028 | **Safe Route Algorithm**: Modificar routing para incorporar safety score como factor. Modo "ruta segura" que prioriza segmentos con mejor score (penalty en peligrosos). | P0 | 4h | A3-027, A3-006 |
| A3-029 | **Night Mode Routing**: Ajustar routing para horario nocturno: evitar zonas poco iluminadas, preferir avenidas principales, incrementar peso de safety score | P1 | 3h | A3-028 |
| A3-030 | **Anomaly Detection - Reports**: ML model para detectar reportes falsos/spam: patrones de ubicación, frecuencia del usuario, consistencia con datos de tráfico | P1 | 4h | Ninguna |
| A3-031 | **Anomaly Detection - Fuel Prices**: Detectar precios de combustible outliers (probables errores o fraude), comparación con estaciones cercanas y tendencias | P2 | 3h | Ninguna |
| A3-032 | **Speed Camera Database**: Compilar y mantener base de datos de cámaras de velocidad en LATAM (fuentes públicas + comunidad), geocodificación, tipo de cámara | P0 | 4h | A3-001 |

### BACKLOG AGENTE 3 — SPRINT 4 (Optimizaciones y Features Avanzados)

| ID | Tarea | Prioridad | Estimación | Dependencia |
|----|-------|-----------|------------|-------------|
| A3-033 | **Offline Map Generation**: Pipeline para generar paquetes de mapas offline por región/ciudad, optimizados para mobile (vector tiles comprimidos + routing graph simplificado) | P1 | 5h | A3-007, A3-002 |
| A3-034 | **Offline Routing**: Implementar routing básico offline usando graph pre-compilado en el dispositivo (sin tráfico en tiempo real) | P1 | 4h | A3-033 |
| A3-035 | **Multi-Stop Route Optimization**: Algoritmo TSP (Traveling Salesman Problem) para optimizar orden de múltiples paradas, heurística para instancias grandes | P1 | 4h | A3-006 |
| A3-036 | **Toll Cost Estimation**: Base de datos de peajes en LATAM (México, Brasil, Argentina, Chile, Colombia), cálculo de costo total por ruta, actualización periódica | P1 | 4h | A3-001 |
| A3-037 | **Weather Integration**: Integrar API de clima para: ajustar ETA en lluvia, alertas de condiciones peligrosas, modificar routing (evitar zonas de inundación conocidas) | P1 | 3h | A3-023 |
| A3-038 | **POI Search Engine**: Motor de búsqueda de puntos de interés optimizado para LATAM: restaurantes, gasolineras, hospitales, estacionamientos. Ranking por relevancia y distancia. | P1 | 4h | A3-010 |
| A3-039 | **Map Matching Service**: Servicio que toma GPS traces ruidosos y los ajusta a la red vial (Valhalla map-match), útil para mejorar calidad de datos de tráfico | P0 | 3h | A3-004 |
| A3-040 | **Elevation Data Integration**: Integrar datos de elevación (SRTM/ASTER) para: perfiles de elevación de ruta, ajustar ETA en zonas montañosas, routing para bicicletas | P2 | 3h | A3-001 |
| A3-041 | **Address Normalization LATAM**: Servicio para normalizar y estandarizar direcciones en formatos LATAM (Calle 5 #10-20, Av. São Paulo 1000, Mz 3 Lt 5) | P1 | 3h | A3-011 |
| A3-042 | **Model Monitoring Pipeline**: MLflow setup para tracking de experimentos, model versioning, A/B testing de modelos, alertas de model drift | P1 | 4h | A3-017, A3-023 |
| A3-043 | **Routing Benchmark Suite**: Suite de tests para validar calidad del routing: dataset de rutas conocidas, comparar con Google/Waze, medir deviation rate | P0 | 3h | A3-006 |
| A3-044 | **Traffic Prediction Evaluation**: Pipeline de evaluación continua: MAPE, RMSE por segmento/hora, comparación con baseline (histórico), alertas de degradación | P1 | 3h | A3-017 |
| A3-045 | **Geocoding Accuracy Tests**: Suite de tests con direcciones LATAM reales: medir precision@1, recall, latencia p50/p95/p99 | P1 | 2h | A3-011 |

---

## 7. BACKLOG DEL ORQUESTADOR

| ID | Tarea | Prioridad | Sprint | Descripción |
|----|-------|-----------|--------|-------------|
| O-001 | **Definir Contratos API** | P0 | 0 | Publicar todos los contratos OpenAPI/AsyncAPI en shared/proto ANTES de que los agentes comiencen |
| O-002 | **Shared Types** | P0 | 0 | Crear tipos TypeScript compartidos en shared/types: User, Report, Route, TrafficSegment, FuelStation, etc. |
| O-003 | **Mono-repo Config** | P0 | 0 | Configurar package.json workspaces, tsconfig paths, scripts de build global |
| O-004 | **GitHub Config** | P0 | 0 | Crear repo, branch protections, CODEOWNERS, PR templates, issue templates |
| O-005 | **CI/CD Base** | P0 | 0 | GitHub Actions: lint, type-check, test, build para cada workspace |
| O-006 | **Review PR Agent 1 Sprint 1** | P0 | 1 | Revisar y aprobar PRs de backend core |
| O-007 | **Review PR Agent 2 Sprint 1** | P0 | 1 | Revisar y aprobar PRs de mobile foundation |
| O-008 | **Review PR Agent 3 Sprint 1** | P0 | 1 | Revisar y aprobar PRs de maps foundation |
| O-009 | **Integration Test - Auth Flow** | P0 | 2 | Verificar que mobile → auth service → DB funciona end-to-end |
| O-010 | **Integration Test - Navigation** | P0 | 2 | Verificar mobile → route service → OSRM → response → render en mapa |
| O-011 | **Integration Test - Reports** | P0 | 3 | Verificar crear reporte (mobile) → backend → MongoDB → aparece en mapa (otro user) |
| O-012 | **Integration Test - Traffic** | P0 | 3 | Verificar GPS traces → Kafka → traffic service → ML → traffic tiles → mobile render |
| O-013 | **Integration Test - Gamification** | P1 | 3 | Verificar acción → puntos → nivel → leaderboard → badge |
| O-014 | **Conflict Resolution** | P0 | Continuo | Resolver conflictos de merge entre ramas de agentes |
| O-015 | **Architecture Decision Records** | P1 | Continuo | Documentar decisiones de arquitectura (ADRs) |
| O-016 | **Environment Management** | P0 | 2 | Configurar environments: dev, staging, production con variables correctas |
| O-017 | **Security Review** | P0 | 4 | Auditoría de seguridad: JWT config, CORS, rate limiting, input validation, SQL injection, XSS |
| O-018 | **Performance Budget** | P1 | 4 | Definir y validar: API latency < 200ms p95, map render > 55fps, app cold start < 3s |
| O-019 | **Release Preparation** | P0 | 5 | Preparar release: changelog, version bump, migration scripts, rollback plan |
| O-020 | **Documentation Final** | P0 | 5 | API docs (Swagger), architecture diagrams, deployment guides, runbooks |

---

## 8. BACKLOG DEL QA VALIDATOR

| ID | Tarea | Prioridad | Sprint | Descripción |
|----|-------|-----------|--------|-------------|
| Q-001 | **Test Framework Setup** | P0 | 1 | Configurar Detox (mobile E2E), Playwright (web), Jest (unit), k6 (load), OWASP ZAP (security) |
| Q-002 | **Auth E2E Tests** | P0 | 1 | Registro completo, login email, login OAuth, refresh token, logout, password reset |
| Q-003 | **Navigation E2E Tests** | P0 | 2 | Buscar destino → ver rutas → seleccionar → navegar → llegar. Con y sin tráfico. |
| Q-004 | **Report E2E Tests** | P0 | 3 | Crear reporte → confirmar en otro device → ver en mapa → expire |
| Q-005 | **Traffic E2E Tests** | P0 | 3 | Verificar que tráfico se renderiza, actualiza, y afecta routing |
| Q-006 | **Social E2E Tests** | P1 | 3 | Agregar amigo → compartir ETA → ver tracking → llegar |
| Q-007 | **Gamification E2E Tests** | P1 | 3 | Ganar puntos → subir nivel → obtener badge → aparecer en leaderboard |
| Q-008 | **Fuel E2E Tests** | P1 | 4 | Ver estaciones → reportar precio → verificar update |
| Q-009 | **Safety E2E Tests** | P0 | 3 | Navegar por zona peligrosa → recibir alerta → botón SOS → compartir ubicación |
| Q-010 | **Admin Panel E2E Tests** | P1 | 5 | Login admin → ver dashboard → moderar reporte → banear usuario → broadcast |
| Q-011 | **Map Editor E2E Tests** | P1 | 5 | Crear segmento → submit → review → aprobar → ver en mapa |
| Q-012 | **Offline Mode Tests** | P1 | 4 | Descargar mapa → ir offline → navegar → volver online → sync |
| Q-013 | **Load Test - API** | P0 | 4 | k6: 10K usuarios concurrentes, medir: latency p50/p95/p99, error rate, throughput |
| Q-014 | **Load Test - WebSocket** | P0 | 4 | 50K conexiones WebSocket simultáneas (tráfico + navegación), medir latencia de updates |
| Q-015 | **Load Test - Routing** | P0 | 4 | 1K requests/segundo de routing, medir tiempo de respuesta por tipo de ruta |
| Q-016 | **Security Audit - Auth** | P0 | 4 | Brute force protection, token security, session management, OWASP Top 10 |
| Q-017 | **Security Audit - API** | P0 | 4 | Input validation, SQL/NoSQL injection, XSS, IDOR, rate limiting effectiveness |
| Q-018 | **Security Audit - Data** | P0 | 4 | Encryption at rest/transit, PII handling, GDPR/LGPD compliance, data retention |
| Q-019 | **Accessibility Audit** | P1 | 5 | VoiceOver/TalkBack navigation completa, contrast ratios, touch target sizes |
| Q-020 | **Compatibility Testing** | P1 | 5 | iOS 14-17, Android 8-14, tablets, diferentes screen sizes, RTL (si aplica) |
| Q-021 | **Regression Suite** | P0 | 5 | Suite automatizada completa que corre en CI antes de cada merge a develop |
| Q-022 | **Performance Profiling** | P1 | 5 | Profile mobile: memory leaks, battery drain, network usage, map rendering FPS |
| Q-023 | **Certification Report** | P0 | 5 | Documento final: features verificadas ✅/❌, bugs conocidos, riesgos, recomendaciones |

---

## 9. CRONOGRAMA DE SPRINTS Y DEPENDENCIAS

```
SPRINT 0 (Día 1-2) — ORQUESTADOR
├── Publicar TODOS los contratos API
├── Crear shared/types con todos los tipos
├── Configurar mono-repo y GitHub
└── Los 3 agentes pueden comenzar en paralelo

SPRINT 1 (Día 2-5) — PARALELO
├── AGENTE 1: Auth + User + DB + Docker + Kafka + Redis (A1-001 → A1-013)
├── AGENTE 2: Project setup + Design system + Auth UI + Navigation structure (A2-001 → A2-013)
├── AGENTE 3: OSM data + OSRM + Valhalla + Tile server + Geocoding (A3-001 → A3-012)
└── QA: Test framework setup (Q-001)

SPRINT 2 (Día 5-9) — PARALELO (primera integración posible)
├── AGENTE 1: Route + Report + Traffic services (A1-014 → A1-025)
├── AGENTE 2: Map screen + Navigation mode + Search (A2-014 → A2-026)
├── AGENTE 3: Traffic ML pipeline + Prediction + Traffic-aware routing (A3-013 → A3-022)
├── ORQUESTADOR: Integration test Auth (O-009)
└── QA: Auth E2E + Navigation E2E (Q-002, Q-003)

SPRINT 3 (Día 9-13) — PARALELO
├── AGENTE 1: Fuel + Gamification + Social + Notifications + Safety (A1-026 → A1-038)
├── AGENTE 2: Reports UI + Social UI + Friends (A2-027 → A2-037)
├── AGENTE 3: ETA model + Safety zones + Anomaly detection (A3-023 → A3-032)
├── ORQUESTADOR: Integration tests Navigation + Reports + Traffic (O-010, O-011, O-012)
└── QA: Report E2E + Traffic E2E + Social E2E + Safety E2E (Q-004 → Q-009)

SPRINT 4 (Día 13-17) — PARALELO
├── AGENTE 1: Ads + Admin + Map Editor + Analytics (A1-039 → A1-050)
├── AGENTE 2: Gamification UI + Fuel UI + Settings + Offline maps (A2-038 → A2-048)
├── AGENTE 3: Offline maps + Multi-stop + Tolls + Weather + Optimization (A3-033 → A3-045)
├── ORQUESTADOR: Security review + Performance budget (O-017, O-018)
└── QA: Load tests + Security audits (Q-013 → Q-018)

SPRINT 5 (Día 17-21) — INTEGRACIÓN FINAL
├── AGENTE 1: Infrastructure (Terraform + CI/CD + Monitoring) (A1-051 → A1-065)
├── AGENTE 2: Admin panel + Map editor web + Polish + Performance (A2-049 → A2-065)
├── AGENTE 3: Remaining optimizations + Benchmarks (remaining tasks)
├── ORQUESTADOR: Release preparation + Documentation (O-019, O-020)
└── QA: Full regression + Compatibility + Certification (Q-019 → Q-023)
```

---

## 10. PROTOCOLO DE COMUNICACIÓN ENTRE AGENTES

### Regla de Independencia
Cada agente trabaja **100% independiente** hasta completar sus tareas del sprint. NO esperan al otro agente.

### Puntos de Sincronización
Los únicos puntos donde un agente necesita algo de otro:

| Necesita | De quién | Solución hasta que esté listo |
|----------|----------|-------------------------------|
| Agente 2 necesita API endpoints | Agente 1 | Mock Server Worker (MSW) con contratos del Orquestador |
| Agente 2 necesita map tiles | Agente 3 | Mapbox tiles públicos como placeholder |
| Agente 1 necesita routing | Agente 3 | OSRM demo server como placeholder |
| Agente 1 necesita traffic ML | Agente 3 | Heurística simple (histórico) como fallback |

### Protocolo de Handoff
1. Agente termina tarea → Push a su sub-rama → PR a su rama principal
2. Orquestador revisa PR → Aprueba o devuelve con feedback
3. Cuando 2+ agentes tienen features complementarias listas → Orquestador hace integration merge a develop
4. QA Validator ejecuta tests en develop → Certifica o reporta bugs
5. Si hay bugs → Orquestador asigna fix al agente responsable como tarea P0

### Gestión de Bloqueos
- Si un agente está bloqueado por otro: **NO espera**. Implementa mock/stub y continúa.
- Si hay un bug cross-service: Orquestador asigna al agente responsable del contrato que falla.
- Si hay conflicto de diseño: Orquestador tiene la palabra final.

---

## 11. INSTRUCCIONES DE INICIO PARA CADA AGENTE

### Para copiar y pegar a Codex (Agente 1):

```
# CONTEXTO
Eres el Agente 1 (Backend & Infraestructura) del proyecto ViaLatín, un clon de Waze para Latinoamérica.

# TU REPOSITORIO
Repo: github.com/[org]/vialatin
Tu rama base: agent1/backend-core (desde develop)
Crea sub-ramas: agent1/[servicio] para cada microservicio

# STACK
Node.js + NestJS + TypeScript + PostgreSQL/PostGIS + MongoDB + Redis + Kafka + Docker + Terraform + AWS

# CONTRATOS
Los contratos API están en /shared/types y /shared/proto. NO los modifiques. Impleméntalos exactamente.

# TU SPRINT 1 (COMENZAR INMEDIATAMENTE)
Ejecuta las tareas A1-001 a A1-013 en orden de prioridad P0 primero:
1. A1-001: Mono-repo setup
2. A1-002: Docker + docker-compose (PostgreSQL+PostGIS, MongoDB, Redis, Kafka)
3. A1-009: Database schemas + migrations
4. A1-010: MongoDB schemas
5. A1-011: Redis configuration
6. A1-012: Kafka setup
7. A1-003: Auth Service - Registro/Login
8. A1-006: Auth Service - JWT middleware
9. A1-004: Auth Service - OAuth
10. A1-007: User Service - CRUD
11. A1-013: API Gateway (Kong)
12. A1-005: Auth Service - OTP
13. A1-008: User Service - Preferencias

# REGLAS DE CALIDAD
- Tests unitarios >80% coverage
- Dockerfile multi-stage para cada servicio
- Health check endpoint en cada servicio: GET /health
- Logging estructurado con Winston (JSON)
- .env.example documentando todas las variables
- README.md por servicio
- Migrations para todo cambio de schema

# CUANDO TERMINES SPRINT 1
Haz PR de agent1/backend-core → develop y avisa al Orquestador.
Luego continúa con Sprint 2 (A1-014 a A1-025).
```

### Para copiar y pegar a Claude Code (Agente 2):

```
# CONTEXTO
Eres el Agente 2 (Mobile & Frontend) del proyecto ViaLatín, un clon de Waze para Latinoamérica.

# TU REPOSITORIO
Repo: github.com/[org]/vialatin
Tu rama base: agent2/mobile-core (desde develop)
Crea sub-ramas: agent2/[modulo] para cada feature

# STACK
React Native CLI + TypeScript + Mapbox GL Native + Zustand + React Query + React Navigation + Reanimated 3

# CONTRATOS
Los contratos API están en /shared/types. Consúmelos exactamente. Mientras el backend no esté listo, usa MSW (Mock Service Worker) para simular todas las APIs.

# TU SPRINT 1 (COMENZAR INMEDIATAMENTE)
Ejecuta las tareas A2-001 a A2-013 en orden:
1. A2-001: Project setup (React Native CLI, TypeScript, ESLint, Jest)
2. A2-002: Design system tokens (colores, tipografía, spacing, dark/light)
3. A2-003: Componentes base (Button, TextInput, Card, Modal, BottomSheet, etc.)
4. A2-004: Navigation structure (AuthStack, MainTabs, Modal stack)
5. A2-011: i18n setup (español LATAM, portugués BR, inglés)
6. A2-012: Permissions manager (ubicación, cámara, notificaciones)
7. A2-013: Location service (GPS foreground/background)
8. A2-005: Auth - Login screen
9. A2-006: Auth - Registro (multi-step)
10. A2-008: Auth state management (Zustand + secure storage)
11. A2-009: API layer (Axios + React Query)
12. A2-010: Mock server (MSW con todos los endpoints)
13. A2-007: Auth - OTP screen

# REGLAS DE CALIDAD
- TypeScript estricto (no any)
- Tests >70% coverage (Jest + RNTL)
- Storybook story para cada componente
- Accesibilidad: todos los touchables con accessibilityLabel
- Performance: memoizar componentes pesados, FlashList para listas
- i18n: todas las strings en archivos de traducción, nunca hardcoded

# CUANDO TERMINES SPRINT 1
Haz PR de agent2/mobile-core → develop y avisa al Orquestador.
Luego continúa con Sprint 2 (A2-014 a A2-026).
```

### Para copiar y pegar a Gemini Ultra (Agente 3):

```
# CONTEXTO
Eres el Agente 3 (Maps, Routing & ML/AI) del proyecto ViaLatín, un clon de Waze para Latinoamérica.

# TU REPOSITORIO
Repo: github.com/[org]/vialatin
Tu rama base: agent3/maps-ml-core (desde develop)
Crea sub-ramas: agent3/[modulo] para cada componente

# STACK
Python + FastAPI + OSRM + Valhalla + TensorFlow/PyTorch + PostGIS + OpenStreetMap + Pelias + tileserver-gl + Docker

# CONTRATOS
Los contratos API están en /shared/types y /shared/proto. Tus servicios deben exponer exactamente esos schemas. El Agente 1 (backend) consumirá tus APIs internamente.

# TU SPRINT 1 (COMENZAR INMEDIATAMENTE)
Ejecuta las tareas A3-001 a A3-012 en orden:
1. A3-001: OSM Data Pipeline (descargar PBFs de LATAM, procesar)
2. A3-002: OSRM setup con perfil de auto para LATAM
3. A3-003: OSRM API wrapper (FastAPI)
4. A3-004: Valhalla setup con tiles de LATAM
5. A3-005: Valhalla API wrapper (FastAPI)
6. A3-006: Routing orchestrator (decide OSRM vs Valhalla)
7. A3-007: Tile server setup (OpenMapTiles + tileserver-gl)
8. A3-008: Custom map style (claro + oscuro)
9. A3-009: Tile CDN pipeline
10. A3-010: Geocoding service (Pelias + datos LATAM)
11. A3-011: Geocoding API (autocomplete, search, reverse)
12. A3-012: LATAM optimization para geocoding

# REGLAS DE CALIDAD
- Cada servicio en su propio Dockerfile
- FastAPI con automatic OpenAPI docs
- Tests de accuracy para routing (comparar con ground truth)
- Benchmark de latencia: routing < 500ms p95, geocoding < 200ms p95
- Modelos ML: documentar métricas (MAPE, RMSE, accuracy)
- Fallback a heurísticas si modelo ML no está listo o falla
- README.md con instrucciones de setup y datos requeridos

# CUANDO TERMINES SPRINT 1
Haz PR de agent3/maps-ml-core → develop y avisa al Orquestador.
Luego continúa con Sprint 2 (A3-013 a A3-022).
```

---

## 12. CRITERIOS DE COMPLETITUD (DEFINITION OF DONE)

### Para que el proyecto se considere COMPLETO y FUNCIONAL:

- [ ] Un usuario puede registrarse y hacer login (email, OAuth, teléfono)
- [ ] El mapa carga y muestra la ubicación del usuario en tiempo real
- [ ] El usuario puede buscar un destino y recibir rutas alternativas
- [ ] La navegación turn-by-turn funciona con voz en español
- [ ] El tráfico se muestra en el mapa y afecta las rutas calculadas
- [ ] Los usuarios pueden crear reportes (accidente, policía, peligro, etc.)
- [ ] Los reportes aparecen en el mapa de otros usuarios en < 5 segundos
- [ ] El sistema de puntos y badges funciona correctamente
- [ ] El leaderboard muestra rankings por país y ciudad
- [ ] Los precios de gasolina se pueden reportar y consultar
- [ ] La compartición de ETA funciona en tiempo real
- [ ] Las alertas de zonas peligrosas funcionan durante navegación
- [ ] El botón SOS envía ubicación a contactos de emergencia
- [ ] Las cámaras de velocidad generan alertas
- [ ] Los mapas offline se pueden descargar y usar
- [ ] El admin panel permite moderar contenido y ver métricas
- [ ] El editor de mapas permite crear y editar segmentos
- [ ] La app soporta tema claro y oscuro
- [ ] La app funciona en español, portugués e inglés
- [ ] Los tests E2E pasan al 100%
- [ ] Load test soporta 10K usuarios concurrentes
- [ ] La infraestructura está desplegada en AWS con auto-scaling
- [ ] El CI/CD pipeline funciona para los 3 agentes
- [ ] La documentación está completa (API docs, architecture, runbooks)

---

## 13. RESUMEN EJECUTIVO DE TAREAS POR AGENTE

| Agente | Total Tareas | Sprints | Horas Estimadas |
|--------|-------------|---------|-----------------|
| **Agente 1 (Codex)** — Backend & Infra | 65 | 5 | ~210h |
| **Agente 2 (Claude Code)** — Mobile & Frontend | 65 | 5 | ~215h |
| **Agente 3 (Gemini Ultra)** — Maps & ML | 45 | 4 | ~175h |
| **Orquestador** | 20 | Continuo | ~60h |
| **QA Validator** | 23 | Continuo | ~80h |
| **TOTAL** | **218 tareas** | **5 sprints** | **~740h** |

---

*Documento generado como Plan Maestro del proyecto ViaLatín. Cada agente debe recibir su sección correspondiente como prompt inicial para comenzar el desarrollo paralelo.*
