# 🌎 TRADUCTOR LATAM — Clon de Apple Translate para Latinoamérica

## Plan Maestro de Desarrollo con 3 Agentes de IA

---

## 1. VISIÓN DEL PRODUCTO

**Nombre:** TraduceLA (o el que definas)
**Referencia:** Apple Translate
**Plataformas:** iOS (Swift/SwiftUI) + Android (Kotlin/Jetpack Compose)
**Stack compartido:** React Native (o Flutter) para acelerar con código compartido
**Foco:** Traducción de voz y conversación en tiempo real para Latinoamérica

### Stack Tecnológico Recomendado

| Capa | Tecnología |
|------|-----------|
| **Mobile** | Flutter (Dart) — código compartido iOS + Android |
| **Backend API** | Node.js + TypeScript + Fastify |
| **Real-time** | WebSockets (Socket.IO) |
| **Base de datos** | PostgreSQL + Redis (cache) |
| **Speech-to-Text** | Google Cloud Speech-to-Text / Whisper API |
| **Translation** | DeepL API + modelos locales fine-tuned |
| **Text-to-Speech** | Google Cloud TTS / ElevenLabs |
| **ML Pipeline** | Python + FastAPI + HuggingFace Transformers |
| **Infra** | Docker + Kubernetes + GCP/AWS |
| **CI/CD** | GitHub Actions |
| **Monorepo** | Turborepo |

---

## 2. FUNCIONALIDADES COMPLETAS A CLONAR

### Core (Apple Translate parity)
- [ ] Traducción de texto en tiempo real (input → output)
- [ ] Modo Conversación (2 personas hablan cada una en su idioma)
- [ ] Detección automática de idioma
- [ ] Reproducción de audio de la traducción (TTS)
- [ ] Modo offline (modelos descargables)
- [ ] Historial de traducciones
- [ ] Favoritos / frases guardadas
- [ ] Traducción desde el teclado del sistema (extensión)
- [ ] Modo pantalla completa (mostrar traducción grande)
- [ ] Traducción en apps del sistema (action extension)

### Diferenciadores LATAM
- [ ] Variantes regionales (español MX, AR, CO, CL, PE, VE, etc.)
- [ ] Modismos y jerga local por país
- [ ] Portugués brasileño con variantes regionales
- [ ] Lenguas indígenas: Quechua, Guaraní, Náhuatl, Aymara, Maya
- [ ] Modo "Spanglish" (mezcla ES/EN frontera MX-US)
- [ ] Diccionario de regionalismos
- [ ] Pronunciación con acento regional seleccionable

---

## 3. ARQUITECTURA DEL SISTEMA

```
┌─────────────────────────────────────────────────────────┐
│                    MOBILE APP (Flutter)                  │
│  ┌──────────┐ ┌──────────────┐ ┌─────────────────────┐  │
│  │ Text UI  │ │Conversation  │ │  Offline Engine      │  │
│  │ Module   │ │   Mode UI    │ │  (on-device models)  │  │
│  └────┬─────┘ └──────┬───────┘ └──────────┬──────────┘  │
│       │              │                     │             │
│  ┌────┴──────────────┴─────────────────────┴──────────┐  │
│  │            Core Translation Service Layer          │  │
│  │  (STT → Translation → TTS pipeline orchestration)  │  │
│  └────────────────────┬───────────────────────────────┘  │
└───────────────────────┼─────────────────────────────────┘
                        │ HTTPS / WebSocket
┌───────────────────────┼─────────────────────────────────┐
│               BACKEND API GATEWAY                       │
│  ┌────────────┐ ┌──────────┐ ┌────────────────────────┐ │
│  │ Auth/Users │ │ History  │ │  Rate Limiting/Billing │ │
│  └────────────┘ └──────────┘ └────────────────────────┘ │
│  ┌──────────────────────────────────────────────────┐   │
│  │           Translation Orchestrator               │   │
│  │  STT Service → NLP → Translation → TTS Service   │   │
│  └──────────────────────────────────────────────────┘   │
└───────────────────────┬─────────────────────────────────┘
                        │
┌───────────────────────┼─────────────────────────────────┐
│              ML / AI PIPELINE                           │
│  ┌──────────┐ ┌──────────────┐ ┌─────────────────────┐  │
│  │ Whisper  │ │  Translation │ │  TTS Engine          │  │
│  │  STT     │ │  Models      │ │  (voice cloning)     │  │
│  └──────────┘ │  - DeepL     │ └─────────────────────┘  │
│               │  - MarianMT  │ ┌─────────────────────┐  │
│               │  - Custom    │ │  Language Detection  │  │
│               └──────────────┘ └─────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐   │
│  │       Regional Dialect Adapter Layer             │   │
│  │  (modismos, jerga, variantes por país)           │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## 4. ESTRATEGIA GIT Y TRABAJO PARALELO

### Estructura del Repositorio (Monorepo)

```
traduceLA/
├── apps/
│   └── mobile/              ← AGENTE 2 (rama: agent2/mobile-*)
├── packages/
│   ├── api/                 ← AGENTE 1 (rama: agent1/api-*)
│   ├── ml-pipeline/         ← AGENTE 3 (rama: agent3/ml-*)
│   ├── shared-types/        ← Tipos compartidos (TypeScript)
│   └── proto/               ← Protobuf / contratos de API
├── infra/
│   ├── docker/              ← AGENTE 1
│   ├── k8s/                 ← AGENTE 1
│   └── ci-cd/               ← ORQUESTADOR
├── docs/
│   ├── api-contracts/       ← CONTRATOS (definidos primero)
│   ├── architecture/
│   └── runbooks/
├── tests/
│   ├── e2e/                 ← QA VALIDATOR
│   ├── integration/         ← QA VALIDATOR
│   └── load/                ← AGENTE 1
├── turbo.json
├── package.json
└── README.md
```

### Estrategia de Branching

```
main (producción)
  └── develop (integración)
       ├── agent1/api-core
       ├── agent1/api-auth
       ├── agent1/api-translation-orchestrator
       ├── agent1/api-websocket
       ├── agent1/api-history
       ├── agent1/infra-docker
       ├── agent1/infra-cicd
       │
       ├── agent2/mobile-project-setup
       ├── agent2/mobile-text-translation-ui
       ├── agent2/mobile-conversation-mode
       ├── agent2/mobile-voice-recording
       ├── agent2/mobile-tts-playback
       ├── agent2/mobile-history-favorites
       ├── agent2/mobile-offline-mode
       ├── agent2/mobile-settings
       ├── agent2/mobile-fullscreen-mode
       │
       ├── agent3/ml-stt-service
       ├── agent3/ml-translation-engine
       ├── agent3/ml-tts-service
       ├── agent3/ml-language-detection
       ├── agent3/ml-dialect-adapter
       ├── agent3/ml-offline-models
       ├── agent3/ml-latam-finetuning
       │
       ├── qa/integration-tests
       ├── qa/e2e-tests
       └── qa/performance-tests
```

### Reglas de Merge

1. Cada agente trabaja en SUS ramas exclusivas
2. Los PRs van a `develop` — NUNCA directo a `main`
3. El Orquestador aprueba merges a `develop`
4. El QA Validator aprueba merges de `develop` → `main`
5. Los contratos de API (OpenAPI + Protobuf) se definen PRIMERO y se mergean a `develop` antes de que nadie codee
6. GitHub Actions corre tests automáticos en cada PR

---

## 5. ROLES INTERNOS

### 🎯 ORQUESTADOR (Rol: Tech Lead / Project Manager)

**Responsabilidades:**
- Define y mantiene los contratos de API (OpenAPI spec) ANTES de que los agentes comiencen
- Revisa PRs y aprueba merges a `develop`
- Detecta conflictos entre agentes y resuelve dependencias
- Prioriza el backlog si hay bloqueos
- Crea issues de integración cuando 2+ agentes necesitan coordinar
- Mantiene el tablero Kanban actualizado
- Define milestones y criterios de aceptación

**Cuándo actúa:**
- Al inicio: define contratos de API y shared types
- Cada vez que un agente termina una tarea: revisa el PR
- Cuando un agente está bloqueado esperando a otro
- Al final de cada sprint: retrospectiva y re-priorización

### ✅ QA VALIDATOR (Rol: QA Engineer + Security Auditor)

**Responsabilidades:**
- Escribe y mantiene tests E2E
- Escribe tests de integración entre servicios
- Valida que cada funcionalidad cumple los criterios de aceptación
- Pruebas de rendimiento y latencia (traducción < 500ms)
- Pruebas de seguridad (auth, rate limiting, data encryption)
- Valida accesibilidad (a11y) en la app
- Certifica cada release antes de merge a `main`
- Genera reportes de bugs y los asigna al agente correspondiente

**Cuándo actúa:**
- Después de cada merge a `develop`: corre tests de integración
- Cada semana: reporte de calidad
- Antes de release: certificación completa
- Continuamente: monitorea cobertura de tests

---

## 6. CONTRATOS DE API (SE DEFINEN PRIMERO)

> ⚠️ **CRÍTICO:** Antes de que cualquier agente escriba una línea de código, el Orquestador debe crear y mergear estos contratos a `develop`. Esto permite que los 3 agentes trabajen 100% en paralelo.

### Archivo: `packages/proto/api-contracts.yaml` (OpenAPI 3.1)

```yaml
openapi: 3.1.0
info:
  title: TraduceLA API
  version: 1.0.0

paths:
  /api/v1/translate/text:
    post:
      summary: Traducir texto
      requestBody:
        content:
          application/json:
            schema:
              type: object
              required: [text, source_lang, target_lang]
              properties:
                text:
                  type: string
                  maxLength: 5000
                source_lang:
                  type: string
                  example: "es-MX"
                target_lang:
                  type: string
                  example: "en-US"
                dialect_mode:
                  type: string
                  enum: [formal, informal, regional]
                  default: informal
      responses:
        '200':
          content:
            application/json:
              schema:
                type: object
                properties:
                  translated_text:
                    type: string
                  detected_lang:
                    type: string
                  confidence:
                    type: number
                  alternatives:
                    type: array
                    items:
                      type: string
                  regional_note:
                    type: string

  /api/v1/translate/speech:
    post:
      summary: Traducir audio (STT → Translate → TTS)
      requestBody:
        content:
          multipart/form-data:
            schema:
              type: object
              required: [audio, source_lang, target_lang]
              properties:
                audio:
                  type: string
                  format: binary
                source_lang:
                  type: string
                target_lang:
                  type: string
                audio_format:
                  type: string
                  enum: [wav, mp3, ogg, m4a]
                  default: wav
      responses:
        '200':
          content:
            application/json:
              schema:
                type: object
                properties:
                  original_text:
                    type: string
                  translated_text:
                    type: string
                  audio_url:
                    type: string
                    format: uri
                  duration_ms:
                    type: integer

  /api/v1/translate/stream:
    description: WebSocket endpoint para traducción en tiempo real
    # ws://api.traducela.com/api/v1/translate/stream
    # Mensajes:
    #   Client → Server: { type: "audio_chunk", data: base64, lang: "es-MX" }
    #   Server → Client: { type: "partial_transcript", text: "..." }
    #   Server → Client: { type: "translation", original: "...", translated: "...", audio_url: "..." }

  /api/v1/conversation/start:
    post:
      summary: Iniciar sesión de conversación
      requestBody:
        content:
          application/json:
            schema:
              type: object
              required: [lang_a, lang_b]
              properties:
                lang_a:
                  type: string
                  example: "es-MX"
                lang_b:
                  type: string
                  example: "en-US"
      responses:
        '200':
          content:
            application/json:
              schema:
                type: object
                properties:
                  session_id:
                    type: string
                    format: uuid
                  ws_url:
                    type: string
                    format: uri

  /api/v1/languages:
    get:
      summary: Listar idiomas soportados
      responses:
        '200':
          content:
            application/json:
              schema:
                type: object
                properties:
                  languages:
                    type: array
                    items:
                      type: object
                      properties:
                        code:
                          type: string
                        name:
                          type: string
                        native_name:
                          type: string
                        region:
                          type: string
                        has_voice:
                          type: boolean
                        has_offline:
                          type: boolean
                        dialects:
                          type: array
                          items:
                            type: object
                            properties:
                              code:
                                type: string
                              name:
                                type: string

  /api/v1/detect:
    post:
      summary: Detectar idioma
      requestBody:
        content:
          application/json:
            schema:
              type: object
              required: [text]
              properties:
                text:
                  type: string
      responses:
        '200':
          content:
            application/json:
              schema:
                type: object
                properties:
                  detected_lang:
                    type: string
                  confidence:
                    type: number
                  alternatives:
                    type: array
                    items:
                      type: object
                      properties:
                        lang:
                          type: string
                        confidence:
                          type: number

  /api/v1/history:
    get:
      summary: Obtener historial de traducciones
      parameters:
        - name: limit
          in: query
          schema:
            type: integer
            default: 50
        - name: offset
          in: query
          schema:
            type: integer
            default: 0
      responses:
        '200':
          content:
            application/json:
              schema:
                type: object
                properties:
                  items:
                    type: array
                    items:
                      $ref: '#/components/schemas/TranslationRecord'
                  total:
                    type: integer

  /api/v1/favorites:
    get:
      summary: Obtener favoritos
    post:
      summary: Agregar a favoritos
    delete:
      summary: Eliminar de favoritos

  /api/v1/auth/register:
    post:
      summary: Registro de usuario
  /api/v1/auth/login:
    post:
      summary: Login
  /api/v1/auth/refresh:
    post:
      summary: Refresh token

  /api/v1/models/available:
    get:
      summary: Modelos offline disponibles para descarga
  /api/v1/models/download/{model_id}:
    get:
      summary: Descargar modelo offline

components:
  schemas:
    TranslationRecord:
      type: object
      properties:
        id:
          type: string
          format: uuid
        original_text:
          type: string
        translated_text:
          type: string
        source_lang:
          type: string
        target_lang:
          type: string
        created_at:
          type: string
          format: date-time
        is_favorite:
          type: boolean
```

---

## 7. BACKLOG COMPLETO POR AGENTE

---

## 🔵 AGENTE 1 — CODEX (Backend + Infraestructura)

**Ambiente:** GitHub Codex
**Lenguaje principal:** TypeScript (Node.js + Fastify)
**Directorio de trabajo:** `packages/api/` + `infra/`

### Sprint 0 — Setup (Día 1)

| ID | Tarea | Descripción | Criterio de Aceptación | Prioridad |
|----|-------|-------------|----------------------|-----------|
| A1-001 | Inicializar proyecto API | Crear proyecto Node.js + TypeScript + Fastify con estructura de carpetas: `src/{routes,services,models,middleware,utils,config}`. Configurar tsconfig, eslint, prettier | Proyecto compila sin errores, `npm run dev` levanta server en puerto 3000 | 🔴 Critical |
| A1-002 | Configurar Docker base | Crear Dockerfile multi-stage para API. Crear docker-compose.yml con: api, postgres, redis | `docker-compose up` levanta los 3 servicios | 🔴 Critical |
| A1-003 | Configurar base de datos | Configurar Prisma ORM con PostgreSQL. Crear schema inicial: User, Translation, Favorite, ConversationSession | Migraciones corren correctamente, seed de datos de prueba funciona | 🔴 Critical |
| A1-004 | Configurar Redis | Setup de Redis para cache de traducciones y rate limiting. Crear clase `CacheService` con métodos: get, set, invalidate, ttl | Tests unitarios pasan | 🟡 High |
| A1-005 | Setup testing | Configurar Vitest + Supertest para tests unitarios e integración. Crear test helpers y factories | `npm test` corre sin errores | 🔴 Critical |

### Sprint 1 — Auth & Core API (Días 2-4)

| ID | Tarea | Descripción | Criterio de Aceptación | Prioridad |
|----|-------|-------------|----------------------|-----------|
| A1-010 | Sistema de autenticación | Implementar registro, login, refresh token con JWT. Middleware de auth. Soporte para auth anónimo (sin cuenta) | Tests: registro, login, refresh, acceso protegido, acceso anónimo | 🔴 Critical |
| A1-011 | Rate limiting | Implementar rate limiting por IP y por usuario: 100 req/min texto, 30 req/min audio. Usar Redis sliding window | Tests de rate limiting, headers X-RateLimit-* en responses | 🟡 High |
| A1-012 | Endpoint POST /translate/text | Implementar endpoint de traducción de texto. Recibe texto + idiomas, orquesta llamada al ML service, retorna traducción. Cachear resultado en Redis (TTL 1h) | Response match con contrato API. Cache hit funciona. Latencia < 200ms sin ML | 🔴 Critical |
| A1-013 | Endpoint POST /translate/speech | Implementar endpoint de traducción de voz. Recibe audio multipart, orquesta STT → Translation → TTS. Retorna texto original, traducido y URL del audio | Audio se procesa correctamente, response match contrato | 🔴 Critical |
| A1-014 | Endpoint POST /detect | Implementar detección de idioma. Llamar al ML service de detección, retornar idioma detectado + confianza + alternativas | Tests con textos en 5+ idiomas | 🟡 High |
| A1-015 | Endpoint GET /languages | Implementar listado de idiomas soportados. Datos hardcoded inicialmente, con flags de voice/offline/dialects. Incluir TODOS los idiomas LATAM del spec | Response incluye todos los idiomas LATAM con dialectos | 🟡 High |

### Sprint 2 — Real-time & Conversation (Días 5-7)

| ID | Tarea | Descripción | Criterio de Aceptación | Prioridad |
|----|-------|-------------|----------------------|-----------|
| A1-020 | WebSocket server | Implementar Socket.IO server para traducción en tiempo real. Manejar conexiones, rooms, heartbeat, reconexión | Test de conexión/desconexión, heartbeat funciona | 🔴 Critical |
| A1-021 | Streaming de audio | Implementar recepción de audio chunks via WebSocket. Buffer de audio, envío a STT en tiempo real, recepción de transcripción parcial | Audio streaming funciona, transcripción parcial se envía al cliente | 🔴 Critical |
| A1-022 | Conversation Session Manager | Implementar gestión de sesiones de conversación. POST /conversation/start crea sesión, WebSocket se une a sesión. Trackear speaker A y speaker B | Sesión se crea, 2 clientes se conectan, cada uno identificado como speaker A/B | 🔴 Critical |
| A1-023 | Pipeline de conversación | Implementar flujo completo: Speaker A habla → STT → Translate → TTS → Speaker B escucha. Y viceversa. Manejar turnos automáticos por detección de silencio | Flujo completo funciona entre 2 clientes de prueba | 🔴 Critical |
| A1-024 | Historial de traducciones | Implementar CRUD de historial. GET /history con paginación. Guardar automáticamente cada traducción. Búsqueda por texto | CRUD funciona, paginación correcta, búsqueda funciona | 🟡 High |
| A1-025 | Sistema de favoritos | Implementar CRUD de favoritos. POST/GET/DELETE /favorites. Marcar/desmarcar traducciones como favoritas | CRUD funciona, toggle favorito funciona | 🟡 High |

### Sprint 3 — Offline & Advanced (Días 8-10)

| ID | Tarea | Descripción | Criterio de Aceptación | Prioridad |
|----|-------|-------------|----------------------|-----------|
| A1-030 | API de modelos offline | Implementar GET /models/available (lista modelos), GET /models/download/:id (descarga). Servir modelos como archivos estáticos con CDN. Incluir versionado | Lista de modelos retorna correctamente, descarga funciona | 🟡 High |
| A1-031 | Logging & Monitoring | Implementar structured logging con Pino. Métricas de Prometheus: latencia, throughput, errores. Health check endpoint | Logs estructurados, métricas disponibles en /metrics, /health responde | 🟡 High |
| A1-032 | Error handling global | Implementar error handler centralizado. Errores tipados: ValidationError, AuthError, TranslationError, RateLimitError. Formato consistente de error response | Todos los errores retornan formato consistente con código, mensaje, detalles | 🟡 High |
| A1-033 | API de configuración por región | Endpoint que retorna configuración según región del usuario: idioma default, dialectos sugeridos, voces disponibles. Usar IP geolocation | Response varía según región del request | 🟢 Medium |
| A1-034 | Middleware de compresión y CORS | Configurar compresión gzip/brotli, CORS para mobile, helmet para security headers | Headers correctos en responses | 🟢 Medium |
| A1-035 | Kubernetes manifests | Crear deployments, services, ingress, HPA, configmaps, secrets para API + DB + Redis + ML services | `kubectl apply` despliega correctamente en cluster de prueba | 🟡 High |
| A1-036 | CI/CD Pipeline | GitHub Actions: lint → test → build → push Docker image → deploy to staging. Separate workflow para producción con approval | Pipeline corre en PRs, deploy a staging automático | 🟡 High |
| A1-037 | Load testing | Crear scripts de k6 para load testing: 1000 usuarios concurrentes texto, 200 concurrentes voz. Identificar bottlenecks | Reporte de load test generado, bottlenecks documentados | 🟢 Medium |
| A1-038 | Database migrations & seeds | Crear migrations para todos los modelos. Seed con datos de prueba: usuarios, traducciones, favoritos. Script para reset de DB | `npm run db:migrate` y `npm run db:seed` funcionan limpio | 🟡 High |
| A1-039 | Webhook para notificaciones | Endpoint para enviar notificaciones cuando se completan traducciones largas o procesamiento offline | Webhook se dispara correctamente | 🟢 Medium |
| A1-040 | API versioning | Implementar versionado de API (v1, v2). Router que enruta a la versión correcta | /api/v1/* y /api/v2/* coexisten | 🟢 Medium |

---

## 🟢 AGENTE 2 — CLAUDE CODE (Mobile App Frontend)

**Ambiente:** Claude Code en terminal
**Lenguaje principal:** Dart (Flutter)
**Directorio de trabajo:** `apps/mobile/`

### Sprint 0 — Setup (Día 1)

| ID | Tarea | Descripción | Criterio de Aceptación | Prioridad |
|----|-------|-------------|----------------------|-----------|
| A2-001 | Inicializar proyecto Flutter | Crear proyecto Flutter con estructura: `lib/{screens,widgets,services,models,providers,utils,theme,l10n}`. Configurar linting, análisis estático | `flutter run` compila en iOS y Android sin errores | 🔴 Critical |
| A2-002 | Configurar arquitectura | Implementar Riverpod para state management. Crear base: providers, notifiers, repository pattern. Configurar GoRouter para navegación | Navegación funciona entre 3 screens de prueba | 🔴 Critical |
| A2-003 | Configurar tema visual | Crear tema inspirado en Apple Translate: colores, tipografía (SF Pro / Roboto), espaciados, dark mode. Crear design tokens | Light y dark mode funcionan, tema consistente | 🔴 Critical |
| A2-004 | Configurar networking | Crear ApiClient con Dio: interceptors para auth, retry, logging. Crear mock server para desarrollo sin depender del backend | Requests se logean, auth header se inyecta, mocks funcionan | 🔴 Critical |
| A2-005 | Configurar i18n | Internacionalización con flutter_localizations + intl. Crear archivos de traducción para ES, EN, PT-BR | App muestra textos en 3 idiomas según device locale | 🟡 High |

### Sprint 1 — Text Translation UI (Días 2-4)

| ID | Tarea | Descripción | Criterio de Aceptación | Prioridad |
|----|-------|-------------|----------------------|-----------|
| A2-010 | Pantalla principal de traducción | Crear screen con: selector de idioma origen/destino, botón swap, campo de texto input, campo de texto output (read-only), botón de copiar, botón de audio | UI pixel-perfect comparada con Apple Translate | 🔴 Critical |
| A2-011 | Selector de idioma | Bottom sheet con lista de idiomas agrupados por región (LATAM, Norteamérica, Europa, Asia, etc.). Búsqueda. Idiomas recientes. Banderitas emoji | Selector abre suave, búsqueda filtra, selección actualiza UI | 🔴 Critical |
| A2-012 | Traducción en tiempo real | Implementar debounced text input que traduce mientras el usuario escribe (300ms debounce). Mostrar loading state. Llamar a POST /translate/text | Traducción aparece mientras se escribe, loading visible, sin flickering | 🔴 Critical |
| A2-013 | Detección automática de idioma | Implementar "Auto" como opción de idioma origen. Llamar a POST /detect después de 3+ caracteres. Actualizar UI con idioma detectado | Idioma se detecta y se muestra badge "Detectado: Español (MX)" | 🟡 High |
| A2-014 | Swap de idiomas | Animación de swap de idiomas (origen ↔ destino). Intercambiar textos también. Animación suave tipo Apple | Animación fluida, textos se intercambian correctamente | 🟡 High |
| A2-015 | Copiar y compartir traducción | Botón copiar que copia traducción al clipboard con feedback háptico. Botón compartir con share sheet nativo | Copiar funciona con confirmación, compartir abre share sheet | 🟡 High |
| A2-016 | Modo pantalla completa | Tap en la traducción abre modo fullscreen: texto grande, fondo negro/blanco, ideal para mostrar a alguien. Pinch to zoom | Texto legible a distancia, pinch zoom funciona | 🟡 High |

### Sprint 2 — Conversation Mode (Días 5-8) ⭐ PRIORIDAD MÁXIMA

| ID | Tarea | Descripción | Criterio de Aceptación | Prioridad |
|----|-------|-------------|----------------------|-----------|
| A2-020 | Pantalla de conversación | Crear UI de modo conversación: pantalla dividida en 2 (superior idioma A, inferior idioma B). Cada mitad tiene: idioma label, botón micrófono, área de texto, botón speaker | UI replica el estilo Apple Translate conversation mode | 🔴 Critical |
| A2-021 | Grabación de voz | Implementar grabación de audio con `record` package. Permisos de micrófono. Visualización de onda de audio durante grabación. Botón push-to-talk + modo auto (VAD) | Grabación funciona, permisos se piden correctamente, onda visible | 🔴 Critical |
| A2-022 | WebSocket client | Implementar conexión WebSocket para streaming. Enviar audio chunks en tiempo real. Recibir transcripción parcial y traducción final | Conexión estable, reconexión automática, chunks se envían | 🔴 Critical |
| A2-023 | Transcripción en vivo | Mostrar transcripción parcial mientras el usuario habla (efecto "typing"). Finalizar con texto completo cuando termina de hablar | Texto aparece progresivamente, sin glitches | 🔴 Critical |
| A2-024 | Reproducción de traducción (TTS) | Implementar reproducción automática del audio traducido. Usar TTS nativo como fallback. Controles: play/pause, velocidad | Audio se reproduce automáticamente después de traducir, controles funcionan | 🔴 Critical |
| A2-025 | Flujo completo de conversación | Integrar todo: Persona A habla → transcripción live → traducción → audio para Persona B. Luego Persona B habla → etc. Indicador visual de quién está hablando | Flujo completo funciona sin intervención manual | 🔴 Critical |
| A2-026 | Voice Activity Detection (VAD) | Implementar detección de voz para inicio/fin automático de grabación. Umbral de silencio configurable. Indicador visual | Grabación inicia al detectar voz, termina con silencio | 🟡 High |
| A2-027 | Animaciones de conversación | Animaciones de transición entre speakers. Efecto de onda mientras se habla. Efecto de "thinking" mientras se traduce. Feedback háptico | Animaciones fluidas a 60fps, feedback háptico presente | 🟡 High |
| A2-028 | Orientación landscape | Soporte para landscape en modo conversación: cada persona ve su mitad correctamente orientada (una mitad rotada 180°) | Cada persona puede leer su lado correctamente sentada frente a frente | 🟡 High |

### Sprint 3 — History, Favorites & Settings (Días 9-11)

| ID | Tarea | Descripción | Criterio de Aceptación | Prioridad |
|----|-------|-------------|----------------------|-----------|
| A2-030 | Pantalla de historial | Lista de traducciones previas con: texto original, traducido, idiomas, fecha. Pull to refresh. Infinite scroll. Swipe para eliminar o agregar a favoritos | Lista carga correctamente, paginación funciona, swipe actions funcionan | 🟡 High |
| A2-031 | Pantalla de favoritos | Lista de traducciones favoritas. Búsqueda. Organización por carpetas/tags opcional. Ordenar por fecha o idioma | Favoritos se muestran, búsqueda funciona | 🟡 High |
| A2-032 | Búsqueda en historial | Search bar con búsqueda local + API. Filtros: idioma, fecha, favoritos. Highlighting de resultados | Búsqueda retorna resultados relevantes, filtros funcionan | 🟢 Medium |
| A2-033 | Pantalla de configuración | Settings: idioma de la app, tema (light/dark/auto), variante regional preferida, velocidad TTS, descarga de modelos offline, borrar historial, about | Todos los settings persisten al reiniciar | 🟡 High |
| A2-034 | Selector de variante regional | En settings: elegir variante de español (MX, AR, CO, etc.). Afecta traducciones y TTS. Preview de pronunciación | Selección persiste, afecta traducciones subsiguientes | 🟡 High |
| A2-035 | Gestión de modelos offline | Pantalla para ver modelos disponibles, descargados, espacio ocupado. Botón de descarga con progreso. Eliminar modelos | Descarga con progreso funciona, modelo se usa offline | 🟡 High |
| A2-036 | Modo offline | Detectar cuando no hay conexión. Switch automático a modelos locales. Indicador de "modo offline" en la UI. Sincronizar historial cuando vuelve la conexión | App funciona sin internet (traducción básica), sincroniza al reconectar | 🟡 High |
| A2-037 | Onboarding | Pantalla de bienvenida (3 slides): qué es TraduceLA, seleccionar idioma principal, seleccionar variante regional. Skip button | Onboarding aparece solo la primera vez, selecciones se guardan | 🟢 Medium |
| A2-038 | Accessibility | VoiceOver/TalkBack support. Semantic labels en todos los widgets. Alto contraste. Tamaño de texto dinámico | App pasa accessibility audit básico | 🟡 High |
| A2-039 | Haptic feedback | Implementar feedback háptico en: botón de grabación, swap idiomas, copiar, favorito toggle, traducción completada | Feedback se siente en dispositivos compatibles | 🟢 Medium |
| A2-040 | Deep links & Shortcuts | Configurar deep links para abrir en modo conversación o con texto pre-cargado. Shortcuts en iOS (Quick Actions) y Android (App Shortcuts) | Deep links funcionan, shortcuts visibles | 🟢 Medium |
| A2-041 | Splash screen & App icon | Diseñar e implementar splash screen animado y app icon para iOS + Android. Adaptive icon Android | Splash aparece al abrir, icon se ve correcto en ambas plataformas | 🟢 Medium |
| A2-042 | Widget de traducción rápida | Widget para iOS (WidgetKit) y Android (Glance) que permite traducción rápida desde home screen | Widget se muestra y funciona en ambas plataformas | 🟢 Medium |
| A2-043 | Keyboard extension | Teclado personalizado / keyboard extension que permite traducir texto en cualquier app | Extension se instala y traduce en apps de terceros | 🟢 Medium |
| A2-044 | Local storage | Implementar almacenamiento local con Hive/Isar para: historial offline, configuración, modelos descargados, cache de traducciones | Datos persisten entre sesiones, migración funciona | 🟡 High |
| A2-045 | Error handling UI | Implementar manejo de errores: sin internet, server error, timeout, rate limit. Snackbars, dialogs, retry buttons | Errores se muestran de forma amigable, retry funciona | 🟡 High |

---

## 🟣 AGENTE 3 — GEMINI ULTRA / ANTIGRAVITY (ML/AI Pipeline)

**Ambiente:** Antigravity con Gemini Ultra
**Lenguaje principal:** Python (FastAPI + HuggingFace)
**Directorio de trabajo:** `packages/ml-pipeline/`

### Sprint 0 — Setup (Día 1)

| ID | Tarea | Descripción | Criterio de Aceptación | Prioridad |
|----|-------|-------------|----------------------|-----------|
| A3-001 | Inicializar proyecto ML | Crear proyecto Python con FastAPI. Estructura: `src/{api,services,models,utils,config}`. Configurar pyproject.toml, ruff, mypy | `uvicorn main:app` levanta en puerto 8000 | 🔴 Critical |
| A3-002 | Configurar Docker ML | Dockerfile con CUDA support para GPU inference. Docker compose con servicio ML + modelo storage. Volumes para modelos | Container corre con GPU access, modelos se montan | 🔴 Critical |
| A3-003 | Setup modelo registry | Sistema para gestionar modelos: descarga, versionado, hot-swapping. Almacenamiento en S3/GCS. Manifest de modelos disponibles | Modelos se descargan y registran automáticamente | 🟡 High |
| A3-004 | Setup testing ML | Configurar pytest + fixtures para tests con modelos mock. Benchmark suite para medir latencia y calidad | Tests corren sin GPU (mocks), benchmarks generan reportes | 🔴 Critical |
| A3-005 | Configurar logging ML | Structured logging con métricas ML: latencia por modelo, calidad de traducción (BLEU score), uso de GPU/memoria | Dashboard de métricas ML funciona | 🟡 High |

### Sprint 1 — Speech-to-Text (Días 2-4)

| ID | Tarea | Descripción | Criterio de Aceptación | Prioridad |
|----|-------|-------------|----------------------|-----------|
| A3-010 | Servicio STT con Whisper | Implementar Speech-to-Text usando OpenAI Whisper (large-v3). Endpoint POST /stt que recibe audio y retorna texto + idioma detectado + timestamps | Transcripción de audio en ES/EN/PT con >95% accuracy | 🔴 Critical |
| A3-011 | STT Streaming | Implementar STT streaming para transcripción en tiempo real. Recibir audio chunks, procesar con Whisper en modo streaming, retornar transcripciones parciales | Transcripción parcial cada 500ms, latencia < 1s | 🔴 Critical |
| A3-012 | STT para dialectos LATAM | Fine-tune o configurar Whisper para reconocer acentos LATAM: mexicano, argentino, colombiano, chileno, brasileño. Evaluar accuracy por dialecto | Accuracy >90% para los 5 dialectos principales | 🔴 Critical |
| A3-013 | Voice Activity Detection | Implementar VAD (Silero VAD o WebRTC VAD) para detectar inicio/fin de habla. Integrar con STT streaming. Configurar umbrales por idioma | VAD detecta voz con <200ms latencia, pocos falsos positivos | 🟡 High |
| A3-014 | Noise reduction | Implementar preprocesamiento de audio: reducción de ruido, normalización de volumen, filtrado. Usar RNNoise o similar | Audio limpio mejora accuracy de STT en >5% en ambientes ruidosos | 🟡 High |
| A3-015 | STT modelo compacto offline | Preparar versión compacta de Whisper (tiny/base) optimizada para on-device. Exportar a ONNX/TFLite. Testear en mobile | Modelo < 100MB, accuracy >80%, latencia < 2s en mobile | 🟡 High |

### Sprint 2 — Translation Engine (Días 5-8) ⭐ PRIORIDAD MÁXIMA

| ID | Tarea | Descripción | Criterio de Aceptación | Prioridad |
|----|-------|-------------|----------------------|-----------|
| A3-020 | Servicio de traducción core | Implementar motor de traducción con múltiples backends: DeepL API, MarianMT (local), y modelo custom. Endpoint POST /translate. Fallback chain: custom → DeepL → MarianMT | Traducción funciona con los 3 backends, fallback chain opera correctamente | 🔴 Critical |
| A3-021 | Integración DeepL API | Integrar DeepL API como backend principal de traducción. Manejar rate limits, retry, error handling. Cache de resultados | Traducción via DeepL funciona para todos los pares de idiomas soportados | 🔴 Critical |
| A3-022 | Motor MarianMT local | Configurar modelos MarianMT de Helsinki-NLP para traducción local. Cargar pares de idiomas: ES↔EN, ES↔PT, EN↔PT. Optimizar con CTranslate2 | Traducción local funciona, latencia < 500ms | 🔴 Critical |
| A3-023 | Adaptador de dialectos LATAM | Crear capa de post-procesamiento que adapta traducciones genéricas a variantes regionales. Reglas + modelo: voseo (AR), modismos (MX), gíria (BR), etc. Base de datos de regionalismos | "You" → "tú" (MX) vs "vos" (AR). "Cool" → "chido" (MX) vs "copado" (AR) vs "bacano" (CO) | 🔴 Critical |
| A3-024 | Detección de idioma | Implementar servicio de detección de idioma usando FastText + langdetect. Detectar no solo idioma sino variante regional (es-MX vs es-AR). Endpoint POST /detect | Detección correcta en >95% de casos, diferencia variantes regionales >80% | 🟡 High |
| A3-025 | Traducción de modismos | Crear base de datos de modismos LATAM (~5000 entradas iniciales). Cuando se detecta un modismo, traducir el significado, no literal. Ej: "no manches" → "no way" (no "don't stain") | Modismos comunes se traducen correctamente en >90% de casos | 🟡 High |
| A3-026 | Modelo custom fine-tuned | Fine-tune de NLLB-200 o mBART en datos LATAM. Dataset: OpenSubtitles LATAM, OPUS, datos de noticias LATAM. Entrenar para pares principales | BLEU score > baseline MarianMT en pares LATAM | 🟡 High |
| A3-027 | Soporte lenguas indígenas | Integrar modelos para: Quechua (AmericasNLP), Guaraní, Náhuatl, Aymara. Usar modelos disponibles + reglas. Calidad mínima viable | Traducción básica funciona para al menos 3 lenguas indígenas | 🟡 High |
| A3-028 | Translation memory | Implementar translation memory: almacenar traducciones aprobadas, reusar en contextos similares. Fuzzy matching para oraciones similares | TM mejora consistencia y velocidad en traducciones repetidas | 🟢 Medium |
| A3-029 | Modo Spanglish | Implementar detección y traducción de code-switching ES/EN (Spanglish). Detectar frases mixtas, traducir preservando la intención | "Vamos al store" → "Let's go to the store" / "Vamos a la tienda" | 🟢 Medium |

### Sprint 3 — Text-to-Speech & Optimization (Días 9-11)

| ID | Tarea | Descripción | Criterio de Aceptación | Prioridad |
|----|-------|-------------|----------------------|-----------|
| A3-030 | Servicio TTS | Implementar Text-to-Speech con múltiples backends: Google Cloud TTS, Coqui TTS (local), Edge TTS. Endpoint POST /tts que retorna audio | Audio generado es natural y comprensible | 🔴 Critical |
| A3-031 | Voces LATAM | Configurar voces específicas por región: acento mexicano, argentino, colombiano, brasileño, etc. Al menos 2 voces (M/F) por variante principal | Voces suenan auténticas para cada región | 🔴 Critical |
| A3-032 | TTS streaming | Implementar TTS streaming para reproducción en tiempo real (no esperar a que se genere todo el audio). Chunked audio output | Audio comienza a reproducirse < 500ms después del request | 🟡 High |
| A3-033 | Ajuste de velocidad TTS | Implementar control de velocidad de habla (0.5x a 2x). Preservar tono natural al cambiar velocidad | Velocidad ajustable sin artifacts audibles | 🟢 Medium |
| A3-034 | Modelo TTS offline | Preparar modelo TTS compacto para on-device. Exportar Coqui TTS a formato mobile-friendly. Voces principales ES/EN/PT | Modelo < 200MB, calidad aceptable, latencia < 3s en mobile | 🟡 High |
| A3-035 | Pipeline de optimización | Optimizar pipeline completo STT→Translate→TTS para latencia mínima. Procesamiento paralelo donde sea posible. Target: < 2s end-to-end | Pipeline completo < 2s para oraciones de < 20 palabras | 🔴 Critical |
| A3-036 | Quantización de modelos | Quantizar modelos para mobile: INT8 para STT, traducción. Usar ONNX Runtime Mobile / TFLite. Medir impacto en calidad | Modelos 3-4x más pequeños, calidad degrada < 5% | 🟡 High |
| A3-037 | Benchmark suite | Crear suite completa de benchmarks: BLEU para traducción, WER para STT, MOS para TTS. Evaluar por idioma y dialecto. Dashboard de resultados | Dashboard muestra métricas por idioma/dialecto, regressions se detectan automáticamente | 🟡 High |
| A3-038 | A/B testing framework | Implementar framework para A/B test entre modelos de traducción. Routing de tráfico configurable. Métricas de comparación | Tráfico se divide correctamente, métricas se recolectan | 🟢 Medium |
| A3-039 | Glosario personalizable | API para que usuarios agreguen términos personalizados (jerga profesional, nombres propios). Se aplican como override en traducción | Términos custom se aplican correctamente en traducciones | 🟢 Medium |
| A3-040 | Batch translation | Endpoint para traducir múltiples textos en batch. Optimizar con batched inference. Para importar/exportar traducciones masivas | Batch de 100 textos se procesa < 10s | 🟢 Medium |
| A3-041 | Evaluación continua | Pipeline automatizado que evalúa calidad de traducción diariamente con test set curado. Alertas si BLEU cae | Pipeline corre diario, alertas configuradas | 🟢 Medium |
| A3-042 | API interna ML | Documentar API interna completa del ML pipeline con FastAPI auto-docs. Swagger UI funcional. Ejemplos de request/response para cada endpoint | Documentación completa accesible en /docs | 🟡 High |

---

## 8. MATRIZ DE DEPENDENCIAS ENTRE AGENTES

```
AGENTE 1 (Backend)          AGENTE 2 (Mobile)           AGENTE 3 (ML)
═══════════════════         ═══════════════════         ═══════════════════

Sprint 0: Setup ──────────── Sprint 0: Setup ──────────── Sprint 0: Setup
(independiente)              (independiente)              (independiente)
      │                            │                            │
      ▼                            ▼                            ▼
Sprint 1: API Core           Sprint 1: UI Text            Sprint 1: STT
      │                            │                            │
      │    ┌───────────────────────┘                            │
      │    │  A2 usa MOCKS del API                              │
      │    │  hasta que A1 tenga                                │
      │    │  endpoints listos                                  │
      ▼    ▼                                                    ▼
Sprint 2: WebSocket ◄────── Sprint 2: Conversation ◄──── Sprint 2: Translation
      │         DEPENDENCY:          │   DEPENDENCY:            │
      │         A2 necesita WS       │   A2 necesita TTS        │
      │         de A1 para real      │   de A3 para audio       │
      │         conversation         │                          │
      ▼                              ▼                          ▼
Sprint 3: Infra              Sprint 3: Polish             Sprint 3: TTS + Optimize
      │                              │                          │
      └──────────────┬───────────────┴──────────────────────────┘
                     ▼
              INTEGRACIÓN FINAL
              (Orquestador + QA)
```

### Estrategia de Desbloqueo

| Dependencia | Solución |
|------------|---------|
| A2 necesita API de A1 | A2 usa **mock server** (JSON Server o MSW) basado en el contrato OpenAPI. Cuando A1 tenga los endpoints, A2 solo cambia la URL base |
| A2 necesita WebSocket de A1 | A2 implementa con **mock WebSocket** local que simula respuestas. Integración real al final del Sprint 2 |
| A1 necesita ML service de A3 | A1 crea **mock ML service** que retorna traducciones hardcoded. Cuando A3 tenga los servicios, A1 apunta al service real |
| A2 necesita TTS de A3 | A2 usa **TTS nativo del device** como fallback. Integra TTS de A3 cuando esté disponible |

> **Regla de oro:** Ningún agente debe quedar bloqueado. Siempre hay un mock o fallback.

---

## 9. CHECKLIST DE INTEGRACIÓN (ORQUESTADOR)

### Checkpoint 1: Fin de Sprint 1 (Día 4)
- [ ] API endpoints text/detect/languages responden correctamente
- [ ] Mobile app muestra UI de traducción de texto funcional (con mocks)
- [ ] STT procesa audio en ES/EN correctamente
- [ ] Motor de traducción funciona con al menos 1 backend
- **Acción:** Conectar Mobile → API → ML para traducción de texto básica

### Checkpoint 2: Fin de Sprint 2 (Día 8)
- [ ] WebSocket server funciona con streaming de audio
- [ ] Modo conversación UI completa con grabación y reproducción
- [ ] Pipeline STT → Translate → TTS funciona end-to-end
- [ ] Dialectos LATAM implementados (al menos 3 variantes)
- **Acción:** Integración completa del modo conversación

### Checkpoint 3: Fin de Sprint 3 (Día 11)
- [ ] Modelos offline empaquetados y descargables
- [ ] App funciona sin internet (modo básico)
- [ ] Historial y favoritos sincronizados
- [ ] CI/CD pipeline operativo
- [ ] Load tests pasados
- **Acción:** Release candidate para QA final

### Checkpoint FINAL (Día 12-13)
- [ ] QA Validator certifica todas las funcionalidades
- [ ] Performance targets alcanzados (traducción < 2s)
- [ ] Accessibility audit pasado
- [ ] Security audit pasado
- [ ] App builds firmados para TestFlight + Google Play Internal Testing
- **Acción:** Merge a `main`, deploy a producción

---

## 10. INSTRUCCIONES ESPECÍFICAS POR AGENTE

---

### 📋 INSTRUCCIONES PARA AGENTE 1 (CODEX) — Copiar/Pegar al Agente

```
# INSTRUCCIONES AGENTE 1 — BACKEND & INFRAESTRUCTURA
# Proyecto: TraduceLA — Clon de Apple Translate para LATAM
# Tu rol: Backend Engineer Senior

## CONTEXTO
Estás construyendo el backend de una app de traducción en tiempo real para
Latinoamérica. Trabajas en paralelo con 2 agentes más:
- Agente 2 (Mobile/Flutter)
- Agente 3 (ML/AI Pipeline)

## TU STACK
- Node.js + TypeScript + Fastify
- PostgreSQL + Prisma ORM
- Redis (cache + rate limiting)
- Socket.IO (WebSockets)
- Docker + Kubernetes
- GitHub Actions

## REPOSITORIO
Trabaja en el directorio `packages/api/` del monorepo.
Crea tus ramas con prefijo `agent1/`:
  - agent1/api-core
  - agent1/api-auth
  - agent1/api-translation-orchestrator
  - agent1/api-websocket
  - agent1/api-history
  - agent1/infra-docker
  - agent1/infra-cicd

## CONTRATOS DE API
Los contratos OpenAPI están en `packages/proto/api-contracts.yaml`.
DEBES implementar EXACTAMENTE los endpoints definidos ahí.
No cambies el contrato sin consultar al Orquestador.

## TUS TAREAS (en orden)
1. [A1-001 a A1-005] Setup del proyecto
2. [A1-010 a A1-015] Auth + endpoints core de traducción
3. [A1-020 a A1-025] WebSocket + Conversation sessions
4. [A1-030 a A1-040] Infra, CI/CD, optimización

## REGLAS
- Cada tarea = 1 PR a `develop`
- Escribe tests para cada endpoint (Vitest + Supertest)
- El ML service no estará listo al inicio. Crea un MOCK SERVICE
  en `packages/api/src/services/ml-mock.service.ts` que retorne
  traducciones hardcoded. Usa una interfaz `ITranslationService`
  que después se conecte al servicio real de Agente 3.
- Documenta cada endpoint con JSDoc
- Usa structured logging (Pino)
- Todos los errores deben retornar el formato:
  { error: { code: string, message: string, details?: any } }

## MOCK ML SERVICE (para no depender de Agente 3)
Crea un servicio mock que implemente:
- translate(text, sourceLang, targetLang) → translatedText
- speechToText(audioBuffer) → { text, detectedLang }
- textToSpeech(text, lang) → audioBuffer
- detectLanguage(text) → { lang, confidence }

Usa datos hardcoded o una librería simple de traducción local.
Cuando Agente 3 tenga su servicio, solo cambiarás la implementación
de la interfaz.

## CRITERIOS DE CALIDAD
- Cobertura de tests > 80%
- Latencia de endpoints < 200ms (sin contar ML)
- Zero vulnerabilidades de seguridad (usa helmet, rate limiting, input validation)
- Docker image < 500MB
```

---

### 📋 INSTRUCCIONES PARA AGENTE 2 (CLAUDE CODE) — Copiar/Pegar al Agente

```
# INSTRUCCIONES AGENTE 2 — MOBILE APP (FLUTTER)
# Proyecto: TraduceLA — Clon de Apple Translate para LATAM
# Tu rol: Senior Mobile Engineer + UI/UX

## CONTEXTO
Estás construyendo la app móvil (iOS + Android) de un traductor de voz
en tiempo real para Latinoamérica, clonando la experiencia de Apple Translate.
Trabajas en paralelo con:
- Agente 1 (Backend API)
- Agente 3 (ML/AI)

## TU STACK
- Flutter 3.x + Dart
- Riverpod (state management)
- GoRouter (navigation)
- Dio (HTTP client)
- Socket.IO client
- Hive/Isar (local storage)
- record package (audio recording)
- flutter_tts (TTS nativo fallback)

## REPOSITORIO
Trabaja en `apps/mobile/`.
Crea ramas con prefijo `agent2/`:
  - agent2/mobile-project-setup
  - agent2/mobile-text-translation-ui
  - agent2/mobile-conversation-mode
  - agent2/mobile-voice-recording
  - agent2/mobile-tts-playback
  - agent2/mobile-history-favorites
  - agent2/mobile-offline-mode
  - agent2/mobile-settings

## DISEÑO DE REFERENCIA
Replica el diseño de Apple Translate:
- Pantalla principal: 2 campos de texto (origen/destino) con selector de idioma
- Modo conversación: pantalla dividida con micrófono para cada persona
- Estilo: limpio, minimalista, con animaciones suaves
- Colores: azul principal (#007AFF), fondos claros/oscuros según tema
- Tipografía: San Francisco en iOS, Roboto en Android (usar default Flutter)

## TUS TAREAS (en orden)
1. [A2-001 a A2-005] Setup proyecto + arquitectura + tema
2. [A2-010 a A2-016] UI de traducción de texto
3. [A2-020 a A2-028] ⭐ MODO CONVERSACIÓN (PRIORIDAD MÁXIMA)
4. [A2-030 a A2-045] Historial, favoritos, settings, polish

## REGLAS
- El backend API NO estará listo al inicio. Usa MOCK DATA.
  Crea `lib/services/mock_api_service.dart` que retorne datos fake
  con delays simulados. Implementa una interfaz `IApiService` que
  después se conecte al API real.
- Toda interacción debe tener feedback: loading states, error states,
  empty states, success confirmations
- Animaciones a 60fps. Usa Hero, AnimatedContainer, Lottie donde aplique
- Accessibility SIEMPRE: Semantics widgets, contrast ratios, dynamic type
- Dark mode desde el día 1
- Test cada screen con widget tests

## MOCK API SERVICE
Crea mocks que simulen:
- translate(text, from, to) → Future<Translation> (delay 500ms)
- translateSpeech(audio, from, to) → Future<SpeechTranslation> (delay 1s)
- getLanguages() → List<Language> con todos los idiomas LATAM
- getHistory(page) → List<Translation>
- toggleFavorite(id) → bool

Cuando el backend esté listo, solo cambias la implementación.

## PRIORIDAD ABSOLUTA: MODO CONVERSACIÓN
El modo conversación es la funcionalidad estrella. Debe ser:
- Fluido: grabación, transcripción en vivo, traducción, reproducción de audio
- Intuitivo: una persona habla de un lado, otra del otro
- Visual: onda de audio, indicador de quién habla, animaciones de "pensando"
- Robusto: manejar ruido, silencios, interrupciones

## CRITERIOS DE CALIDAD
- App compila y corre en iOS Y Android sin errores
- Todas las pantallas tienen light + dark mode
- Animaciones suaves (no jank)
- Accessibility: VoiceOver y TalkBack funcionales
- Tamaño del APK < 50MB (sin modelos offline)
```

---

### 📋 INSTRUCCIONES PARA AGENTE 3 (GEMINI ULTRA) — Copiar/Pegar al Agente

```
# INSTRUCCIONES AGENTE 3 — ML/AI PIPELINE
# Proyecto: TraduceLA — Clon de Apple Translate para LATAM
# Tu rol: ML Engineer Senior + NLP Specialist

## CONTEXTO
Estás construyendo el pipeline de IA que alimenta una app de traducción
de voz en tiempo real para Latinoamérica. Eres el cerebro del sistema.
Trabajas en paralelo con:
- Agente 1 (Backend API — te llamará via HTTP)
- Agente 2 (Mobile — consumirá tus servicios via el backend)

## TU STACK
- Python 3.11+ / FastAPI
- OpenAI Whisper (STT)
- HuggingFace Transformers (traducción)
- MarianMT / NLLB-200 / mBART (modelos de traducción)
- Coqui TTS / Edge TTS (text-to-speech)
- FastText / langdetect (detección de idioma)
- ONNX Runtime (optimización)
- CTranslate2 (inferencia optimizada)
- Docker con CUDA support

## REPOSITORIO
Trabaja en `packages/ml-pipeline/`.
Crea ramas con prefijo `agent3/`:
  - agent3/ml-stt-service
  - agent3/ml-translation-engine
  - agent3/ml-tts-service
  - agent3/ml-language-detection
  - agent3/ml-dialect-adapter
  - agent3/ml-offline-models
  - agent3/ml-latam-finetuning

## TU API INTERNA (FastAPI endpoints que Agente 1 consumirá)

POST /ml/stt
  Input: { audio: base64, format: "wav", lang_hint?: "es" }
  Output: { text: str, lang: str, confidence: float, segments: [...] }

POST /ml/stt/stream (WebSocket)
  Input: audio chunks (binary)
  Output: { partial_text: str, is_final: bool }

POST /ml/translate
  Input: { text: str, source_lang: str, target_lang: str, dialect?: str }
  Output: { translated: str, alternatives: [str], confidence: float }

POST /ml/tts
  Input: { text: str, lang: str, voice?: str, speed?: float }
  Output: { audio: base64, format: "wav", duration_ms: int }

POST /ml/detect
  Input: { text: str }
  Output: { lang: str, confidence: float, region?: str, alternatives: [...] }

GET /ml/voices
  Output: { voices: [{ id, name, lang, gender, sample_url }] }

GET /ml/models
  Output: { models: [{ id, name, type, size_mb, langs, version }] }

GET /ml/health
  Output: { status: "ok", gpu_available: bool, models_loaded: [...] }

## TUS TAREAS (en orden)
1. [A3-001 a A3-005] Setup + Docker + testing
2. [A3-010 a A3-015] STT Service (Whisper)
3. [A3-020 a A3-029] ⭐ TRANSLATION ENGINE (PRIORIDAD MÁXIMA)
4. [A3-030 a A3-042] TTS + optimización + offline models

## LO QUE HACE ÚNICO A ESTE PROYECTO (LATAM)
Tu diferenciador principal es el ADAPTADOR DE DIALECTOS LATAM:
- "tú" vs "vos" vs "usted" según país
- Modismos: "chido" (MX), "copado" (AR), "bacano" (CO), "legal" (BR)
- Vocabulario: "computadora" (MX) vs "computador" (CO) vs "ordenador" (ES)
- Pronunciación: "ll" como /ʒ/ en Argentina vs /ʎ/ en otros
- Code-switching: Spanglish en contexto MX-US

Crea una base de datos JSON/SQLite con al menos 5000 entradas de
regionalismos organizados por: {término_genérico, país, variante_local,
contexto, ejemplo}.

## CRITERIOS DE CALIDAD
- STT accuracy: >95% para ES/EN, >90% para dialectos LATAM
- Traducción: BLEU score > 40 para pares principales
- TTS: MOS > 3.5 para voces principales
- Latencia pipeline completo (STT→Translate→TTS): < 2 segundos
- Modelos offline: < 500MB total, accuracy degrada < 10% vs online
- Tests: >80% cobertura, benchmark suite automatizada

## REGLAS
- Cada servicio (STT, Translate, TTS) debe ser independiente y escalable
- Usa interfaces/protocols para que los backends sean swappables
- Documenta cada endpoint con FastAPI auto-docs
- Incluye Dockerfile con instrucciones claras para GPU y CPU
- Prioriza latencia sobre perfección: mejor una traducción buena en 1s
  que una perfecta en 5s
```

---

## 11. IDIOMAS SOPORTADOS (CATÁLOGO COMPLETO)

### Tier 1 — Lanzamiento (Core)
| Código | Idioma | Variantes | Voz | Offline |
|--------|--------|-----------|-----|---------|
| es-MX | Español (México) | — | ✅ | ✅ |
| es-AR | Español (Argentina) | Rioplatense | ✅ | ✅ |
| es-CO | Español (Colombia) | — | ✅ | ✅ |
| es-CL | Español (Chile) | — | ✅ | ✅ |
| es-PE | Español (Perú) | — | ✅ | ✅ |
| en-US | Inglés (EEUU) | — | ✅ | ✅ |
| pt-BR | Portugués (Brasil) | Paulista, Carioca | ✅ | ✅ |

### Tier 2 — Post-lanzamiento
| Código | Idioma | Voz | Offline |
|--------|--------|-----|---------|
| es-VE | Español (Venezuela) | ✅ | ❌ |
| es-EC | Español (Ecuador) | ✅ | ❌ |
| es-BO | Español (Bolivia) | ✅ | ❌ |
| es-PY | Español (Paraguay) | ✅ | ❌ |
| es-UY | Español (Uruguay) | ✅ | ❌ |
| es-CU | Español (Cuba) | ✅ | ❌ |
| es-DO | Español (Rep. Dominicana) | ✅ | ❌ |
| es-GT | Español (Guatemala) | ✅ | ❌ |
| es-HN | Español (Honduras) | ✅ | ❌ |
| es-SV | Español (El Salvador) | ✅ | ❌ |
| es-NI | Español (Nicaragua) | ✅ | ❌ |
| es-CR | Español (Costa Rica) | ✅ | ❌ |
| es-PA | Español (Panamá) | ✅ | ❌ |
| es-PR | Español (Puerto Rico) | ✅ | ❌ |
| ht | Criollo haitiano | ✅ | ❌ |
| fr | Francés (para Haití/Guyana) | ✅ | ❌ |
| nl | Neerlandés (Surinam) | ❌ | ❌ |

### Tier 3 — Lenguas indígenas
| Código | Idioma | Región | Voz | Offline |
|--------|--------|--------|-----|---------|
| qu | Quechua | Perú, Bolivia, Ecuador | ⚠️ Básica | ❌ |
| gn | Guaraní | Paraguay | ⚠️ Básica | ❌ |
| nah | Náhuatl | México | ⚠️ Básica | ❌ |
| ay | Aymara | Bolivia, Perú | ⚠️ Básica | ❌ |
| yua | Maya Yucateco | México | ⚠️ Básica | ❌ |

---

## 12. TIMELINE ESTIMADO

```
Día 1:     Sprint 0 — Setup (todos en paralelo)
           Orquestador define contratos de API
           ┃
Días 2-4:  Sprint 1 — Core features
           A1: Auth + API endpoints
           A2: UI traducción de texto
           A3: STT + Motor de traducción base
           ┃
Día 4:     ★ CHECKPOINT 1 — Integración texto básico
           ┃
Días 5-8:  Sprint 2 — Conversación (feature estrella)
           A1: WebSocket + sessions
           A2: Modo conversación UI
           A3: Dialectos + TTS
           ┃
Día 8:     ★ CHECKPOINT 2 — Integración conversación
           ┃
Días 9-11: Sprint 3 — Polish & Advanced
           A1: Infra + CI/CD + optimización
           A2: Historial + settings + offline
           A3: Offline models + optimización
           ┃
Día 11:    ★ CHECKPOINT 3 — Release candidate
           ┃
Días 12-13: QA Final + Bug fixes + Deploy
           ┃
Día 14:    🚀 RELEASE v1.0
```

---

## 13. CRITERIOS DE ÉXITO DEL PROYECTO

| Métrica | Target |
|---------|--------|
| Traducción de texto E2E | < 1 segundo |
| Pipeline de voz E2E (STT→Translate→TTS) | < 2 segundos |
| STT accuracy (ES/EN) | > 95% |
| STT accuracy (dialectos LATAM) | > 90% |
| Traducción BLEU (pares principales) | > 40 |
| TTS naturalidad (MOS) | > 3.5 |
| App crash rate | < 0.1% |
| API uptime | > 99.9% |
| App size (sin modelos) | < 50MB |
| Modelos offline totales | < 500MB |
| Cobertura de tests | > 80% |
| Accessibility audit | Pass (WCAG 2.1 AA) |

---

## 14. COMANDOS INICIALES (para que cada agente arranque)

### Agente 1 (Codex)
```bash
mkdir -p packages/api && cd packages/api
npm init -y
npm install fastify @fastify/cors @fastify/helmet @fastify/rate-limit \
  @fastify/websocket @prisma/client socket.io ioredis pino jsonwebtoken bcrypt
npm install -D typescript @types/node vitest supertest prisma ts-node \
  @types/jsonwebtoken @types/bcrypt eslint prettier
npx tsc --init
npx prisma init
```

### Agente 2 (Claude Code)
```bash
flutter create --org com.traducela --project-name traduce_la apps/mobile
cd apps/mobile
flutter pub add flutter_riverpod go_router dio socket_io_client \
  hive hive_flutter record flutter_tts lottie shimmer cached_network_image \
  permission_handler connectivity_plus path_provider
flutter pub add -d flutter_test build_runner json_serializable \
  hive_generator flutter_lints
```

### Agente 3 (Gemini Ultra)
```bash
mkdir -p packages/ml-pipeline && cd packages/ml-pipeline
python -m venv venv && source venv/bin/activate
pip install fastapi uvicorn[standard] openai-whisper transformers \
  torch torchaudio sentencepiece ctranslate2 faster-whisper \
  TTS langdetect fasttext-wheel onnxruntime numpy scipy \
  pydantic python-multipart aiofiles httpx pytest pytest-asyncio
```

---

> **NOTA FINAL:** Este plan está diseñado para que los 3 agentes trabajen 100% en paralelo desde el día 1, gracias a los contratos de API y los mock services. El Orquestador coordina los checkpoints de integración, y el QA Validator certifica la calidad. ¡A moler código! 🚀
