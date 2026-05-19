# 🏦 NEOBANK LATAM — Plan Maestro de Desarrollo

## Clon Completo Nequi/Nu para Latinoamérica

**Nombre del Proyecto:** NeoBank LATAM (codename: `paylat`)
**Fecha:** Febrero 2026
**Metodología:** Desarrollo paralelo con 3 agentes AI + Orquestador

---

## 📋 TABLA DE CONTENIDOS

1. [Visión del Producto](#1-visión-del-producto)
2. [Arquitectura Técnica](#2-arquitectura-técnica)
3. [Estrategia Git y Trabajo Paralelo](#3-estrategia-git-y-trabajo-paralelo)
4. [Roles y Asignación de Agentes](#4-roles-y-asignación-de-agentes)
5. [Agente 1 — CODEX: Backend Core](#5-agente-1--codex-backend-core)
6. [Agente 2 — CLAUDE CODE: Frontend Mobile + Web](#6-agente-2--claude-code-frontend-mobile--web)
7. [Agente 3 — GEMINI ULTRA: Infra, DevOps, Admin & Seguridad](#7-agente-3--gemini-ultra-infra-devops-admin--seguridad)
8. [Agente 0 — ORQUESTADOR: Validación y QA](#8-agente-0--orquestador-validación-y-qa)
9. [Sprints y Cronograma](#9-sprints-y-cronograma)
10. [Contratos de Integración (API Contracts)](#10-contratos-de-integración-api-contracts)
11. [Checklist de Entrega Final](#11-checklist-de-entrega-final)

---

## 1. VISIÓN DEL PRODUCTO

### Funcionalidades Core (MVP Completo)

| Módulo | Descripción |
|--------|-------------|
| Onboarding & KYC | Registro, verificación de identidad, selfie, documento |
| Cuentas | Cuenta digital, balance, multi-moneda (COP, MXN, BRL, USD) |
| Transferencias P2P | Envío de dinero entre usuarios por número, alias, QR |
| Pagos QR | Generación y escaneo de códigos QR para pagos |
| Tarjeta Virtual | Emisión de tarjeta virtual Visa/Mastercard |
| Tarjeta Física | Solicitud, activación, bloqueo/desbloqueo |
| Recargas Móviles | Top-up a operadores LATAM |
| Pago de Servicios | Facturas de servicios públicos, internet, TV |
| Bolsillos/Cajas | Sub-cuentas de ahorro con metas |
| Depósitos | Recepción de fondos, PSE, SPEI, PIX |
| Retiros | Cajeros sin tarjeta, retiro en corresponsales |
| Historial | Movimientos completos con filtros y exportación |
| Notificaciones | Push, SMS, email en tiempo real |
| Seguridad | Biometría, PIN, 2FA, detección de fraude |
| Soporte | Chat in-app, FAQ, tickets |
| Admin Dashboard | Panel de administración completo |
| Analytics | Métricas de negocio y comportamiento |

### Stack Tecnológico Definido

```
FRONTEND MOBILE:    React Native + Expo (iOS & Android)
FRONTEND WEB:       Next.js 14 + TypeScript + Tailwind CSS
BACKEND API:        Node.js + NestJS + TypeScript
BASE DE DATOS:      PostgreSQL (principal) + Redis (cache/sessions)
MENSAJERÍA:         Apache Kafka / RabbitMQ
BÚSQUEDA:           Elasticsearch
ALMACENAMIENTO:     AWS S3 / MinIO
AUTH:               JWT + OAuth2 + Passport.js
PAGOS:              Integración Stripe/MercadoPago (simulada)
INFRA:              Docker + Docker Compose + Kubernetes (K8s)
CI/CD:              GitHub Actions
MONITORING:         Prometheus + Grafana + Sentry
TESTING:            Jest + Cypress + Detox
DOCS:               Swagger/OpenAPI 3.0
```

---

## 2. ARQUITECTURA TÉCNICA

### Diagrama de Arquitectura (Alto Nivel)

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENTES                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐       │
│  │ Mobile App   │  │  Web App     │  │  Admin Dashboard │       │
│  │ React Native │  │  Next.js     │  │  Next.js         │       │
│  └──────┬───────┘  └──────┬───────┘  └────────┬─────────┘       │
└─────────┼─────────────────┼────────────────────┼────────────────┘
          │                 │                    │
          ▼                 ▼                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                    API GATEWAY (Kong/Nginx)                       │
│              Rate Limiting · Auth · Load Balancing                │
└──────────────────────────┬──────────────────────────────────────┘
                           │
┌──────────────────────────┼──────────────────────────────────────┐
│                    MICROSERVICIOS (NestJS)                        │
│                                                                  │
│  ┌─────────────┐ ┌──────────────┐ ┌──────────────┐              │
│  │ Auth Service │ │ User Service │ │ Account Svc  │              │
│  │ (Puerto 3001)│ │ (Puerto 3002)│ │ (Puerto 3003)│              │
│  └──────┬──────┘ └──────┬───────┘ └──────┬───────┘              │
│         │               │                │                       │
│  ┌──────┴──────┐ ┌──────┴───────┐ ┌──────┴───────┐              │
│  │ Payment Svc │ │ Card Service │ │ Notif Service│              │
│  │ (Puerto 3004)│ │ (Puerto 3005)│ │ (Puerto 3006)│              │
│  └──────┬──────┘ └──────┬───────┘ └──────┬───────┘              │
│         │               │                │                       │
│  ┌──────┴──────┐ ┌──────┴───────┐ ┌──────┴───────┐              │
│  │ Billing Svc │ │ Savings Svc  │ │ Support Svc  │              │
│  │ (Puerto 3007)│ │ (Puerto 3008)│ │ (Puerto 3009)│              │
│  └─────────────┘ └──────────────┘ └──────────────┘              │
│                                                                  │
│  ┌─────────────┐ ┌──────────────┐ ┌──────────────┐              │
│  │ Fraud Svc   │ │ Analytics Svc│ │ KYC Service  │              │
│  │ (Puerto 3010)│ │ (Puerto 3011)│ │ (Puerto 3012)│              │
│  └─────────────┘ └──────────────┘ └──────────────┘              │
└──────────────────────────┬──────────────────────────────────────┘
                           │
┌──────────────────────────┼──────────────────────────────────────┐
│                    DATA LAYER                                    │
│  ┌──────────┐  ┌───────┐  ┌───────┐  ┌──────────┐  ┌────────┐  │
│  │PostgreSQL│  │ Redis │  │ Kafka │  │ Elastic  │  │  S3    │  │
│  │ (5432)   │  │(6379) │  │(9092) │  │ (9200)   │  │        │  │
│  └──────────┘  └───────┘  └───────┘  └──────────┘  └────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### Estructura de Monorepo

```
paylat/
├── apps/
│   ├── mobile/              ← React Native (Agente 2)
│   ├── web/                 ← Next.js Client (Agente 2)
│   └── admin/               ← Next.js Admin (Agente 3)
├── services/
│   ├── api-gateway/         ← Kong/Nginx config (Agente 3)
│   ├── auth-service/        ← NestJS (Agente 1)
│   ├── user-service/        ← NestJS (Agente 1)
│   ├── account-service/     ← NestJS (Agente 1)
│   ├── payment-service/     ← NestJS (Agente 1)
│   ├── card-service/        ← NestJS (Agente 1)
│   ├── notification-service/← NestJS (Agente 1)
│   ├── billing-service/     ← NestJS (Agente 1)
│   ├── savings-service/     ← NestJS (Agente 1)
│   ├── support-service/     ← NestJS (Agente 1)
│   ├── fraud-service/       ← NestJS (Agente 3)
│   ├── analytics-service/   ← NestJS (Agente 3)
│   └── kyc-service/         ← NestJS (Agente 1)
├── packages/
│   ├── shared-types/        ← TypeScript types compartidos (Agente 1 crea, todos usan)
│   ├── shared-utils/        ← Utilidades compartidas
│   ├── ui-components/       ← Componentes UI compartidos (Agente 2)
│   └── api-client/          ← SDK cliente generado desde OpenAPI (Agente 1)
├── infra/
│   ├── docker/              ← Dockerfiles (Agente 3)
│   ├── k8s/                 ← Kubernetes manifests (Agente 3)
│   ├── terraform/           ← IaC (Agente 3)
│   └── scripts/             ← Scripts de automatización (Agente 3)
├── docs/
│   ├── api/                 ← OpenAPI specs (Agente 1)
│   ├── architecture/        ← Diagramas (Agente 3)
│   └── runbooks/            ← Guías operativas (Agente 3)
├── .github/
│   └── workflows/           ← CI/CD pipelines (Agente 3)
├── docker-compose.yml       ← (Agente 3)
├── docker-compose.dev.yml   ← (Agente 3)
├── package.json             ← Workspace root
├── turbo.json               ← Turborepo config
└── README.md
```

---

## 3. ESTRATEGIA GIT Y TRABAJO PARALELO

### Branching Strategy

```
main
 └── develop
      ├── feature/agent1/auth-service          ← Agente 1
      ├── feature/agent1/user-service          ← Agente 1
      ├── feature/agent1/account-service       ← Agente 1
      ├── feature/agent1/payment-service       ← Agente 1
      ├── feature/agent1/card-service          ← Agente 1
      ├── feature/agent1/notification-service  ← Agente 1
      ├── feature/agent1/billing-service       ← Agente 1
      ├── feature/agent1/savings-service       ← Agente 1
      ├── feature/agent1/support-service       ← Agente 1
      ├── feature/agent1/kyc-service           ← Agente 1
      ├── feature/agent1/shared-types          ← Agente 1
      ├── feature/agent2/mobile-app            ← Agente 2
      ├── feature/agent2/web-app              ← Agente 2
      ├── feature/agent2/ui-components        ← Agente 2
      ├── feature/agent3/infra-docker         ← Agente 3
      ├── feature/agent3/ci-cd                ← Agente 3
      ├── feature/agent3/admin-dashboard      ← Agente 3
      ├── feature/agent3/fraud-service        ← Agente 3
      ├── feature/agent3/monitoring           ← Agente 3
      ├── feature/agent3/security             ← Agente 3
      ├── integration/sprint-1                ← Orquestador
      ├── integration/sprint-2                ← Orquestador
      └── release/v1.0                        ← Orquestador
```

### Reglas de Integración

1. **Cada agente trabaja en SUS ramas feature/** — nunca tocan ramas de otro agente
2. **Merges a `develop`** — solo el Orquestador (Agente 0) hace merge después de validar
3. **Contratos API primero** — Agente 1 publica OpenAPI specs en `docs/api/` en Sprint 0, Agente 2 y 3 desarrollan contra esos contratos
4. **Tipos compartidos** — `packages/shared-types/` se publica en Sprint 0 y todos lo consumen
5. **Integración por Sprint** — Al final de cada sprint, Orquestador crea rama `integration/sprint-N` para merge y testing
6. **Conflictos** — Cada agente solo toca sus carpetas asignadas, minimizando conflictos

### Mecanismo de Sincronización

```
SPRINT 0 (Setup):
  Agente 1 → Publica: shared-types, OpenAPI specs, DB schemas
  Agente 2 → Consume: shared-types, OpenAPI specs (mock APIs)
  Agente 3 → Consume: shared-types, genera Docker configs

SPRINT 1-N (Desarrollo):
  Cada agente trabaja independiente en sus features
  Al terminar cada feature → PR a develop
  Orquestador valida y mergea

PUNTOS DE SINCRONIZACIÓN:
  ✅ Fin Sprint 0: Contratos API listos
  ✅ Fin Sprint 1: Auth + UI base + Infra base
  ✅ Fin Sprint 2: Core banking + Mobile screens + CI/CD
  ✅ Fin Sprint 3: Payments + Cards + Admin
  ✅ Fin Sprint 4: Advanced features + Integration testing
  ✅ Fin Sprint 5: Polish + E2E testing + Deploy
```

---

## 4. ROLES Y ASIGNACIÓN DE AGENTES

### 🤖 AGENTE 0 — ORQUESTADOR / VALIDADOR (Tú o un humano)

**Rol:** Arquitecto Principal, QA Lead, Release Manager
**Responsabilidades:**
- Revisar y validar PRs de los 3 agentes
- Ejecutar integration tests después de cada merge
- Resolver conflictos entre agentes
- Asignar tareas adicionales cuando se detecten gaps
- Certificar que cada módulo funciona end-to-end
- Mantener el backlog actualizado
- Gestionar releases

**Checklist de validación por PR:**
```
□ El código compila sin errores
□ Los tests pasan (unit + integration)
□ Cumple el contrato API (OpenAPI spec)
□ No rompe funcionalidad existente
□ Docker build exitoso
□ Documentación actualizada
□ No hay secrets hardcoded
□ Logging adecuado
□ Error handling completo
```

### 🔵 AGENTE 1 — CODEX (Backend Core Engine)

**Especialidad:** Microservicios, base de datos, lógica de negocio, APIs
**Scope:** Todo `services/` (excepto fraud + analytics) + `packages/shared-types` + `packages/api-client` + `docs/api/`

### 🟢 AGENTE 2 — CLAUDE CODE (Frontend Mobile + Web)

**Especialidad:** React Native, Next.js, UI/UX, componentes, navegación
**Scope:** `apps/mobile/` + `apps/web/` + `packages/ui-components/`

### 🟠 AGENTE 3 — GEMINI ULTRA (Infra, DevOps, Admin, Seguridad)

**Especialidad:** Docker, K8s, CI/CD, monitoring, seguridad, admin panel
**Scope:** `apps/admin/` + `infra/` + `.github/` + `services/fraud-service/` + `services/analytics-service/` + `docker-compose*.yml`

---

## 5. AGENTE 1 — CODEX: BACKEND CORE

### 📋 PROMPT INICIAL PARA AGENTE 1

```
Eres el Agente 1 (CODEX) — Backend Lead Engineer de un proyecto fintech neobank
para Latinoamérica llamado "PayLat". Tu responsabilidad es construir TODOS los
microservicios backend, la base de datos, APIs REST, y la lógica de negocio core.

STACK: NestJS + TypeScript + PostgreSQL + Redis + Kafka
MONOREPO: Turborepo — tu código va en services/ y packages/
GIT: Trabaja en ramas feature/agent1/*
REGLA: Publica OpenAPI specs en docs/api/ PRIMERO para que los otros agentes
       puedan trabajar en paralelo con mocks.

Tu primera tarea es el Sprint 0: Setup del proyecto, shared-types, y API contracts.
Luego sigue el backlog completo listado abajo EN ORDEN de prioridad.
```

### BACKLOG COMPLETO — AGENTE 1

---

#### SPRINT 0: FUNDACIÓN (Días 1-2)

**TASK-1.0.1: Inicialización del Monorepo**
```
Descripción: Configurar Turborepo con workspaces para services/ y packages/
Entregables:
  - package.json raíz con workspaces
  - turbo.json con pipelines (build, test, lint, dev)
  - tsconfig.base.json compartido
  - .eslintrc.js + .prettierrc compartidos
  - .gitignore completo
Criterios de aceptación:
  - `npm install` funciona desde la raíz
  - `turbo run build` compila todos los packages
  - `turbo run lint` verifica código
```

**TASK-1.0.2: Package shared-types**
```
Descripción: Crear el paquete de tipos TypeScript compartidos entre todos los servicios y apps
Ubicación: packages/shared-types/
Entregables:
  - src/entities/user.ts (User, UserProfile, UserStatus, KYCStatus)
  - src/entities/account.ts (Account, AccountType, Currency, Balance)
  - src/entities/transaction.ts (Transaction, TransactionType, TransactionStatus)
  - src/entities/card.ts (Card, CardType, CardStatus, CardNetwork)
  - src/entities/notification.ts (Notification, NotificationType, Channel)
  - src/entities/payment.ts (Payment, PaymentMethod, PaymentStatus)
  - src/entities/savings.ts (SavingsGoal, SavingsContribution)
  - src/entities/bill.ts (Bill, BillCategory, BillProvider, BillPayment)
  - src/entities/support.ts (Ticket, TicketStatus, TicketPriority)
  - src/dto/ (DTOs para cada entidad: Create, Update, Response)
  - src/enums/ (todos los enums del sistema)
  - src/errors/ (error codes y mensajes estándar)
  - src/events/ (event types para Kafka)
  - src/index.ts (barrel export)
  - package.json con name "@paylat/shared-types"
Criterios de aceptación:
  - Compila sin errores
  - Todos los servicios pueden importar con @paylat/shared-types
  - 100% de las entidades del sistema representadas
```

**TASK-1.0.3: OpenAPI Specifications**
```
Descripción: Definir TODOS los contratos API antes de implementar (Contract-First)
Ubicación: docs/api/
Entregables para CADA servicio:
  - auth-service.yaml
  - user-service.yaml
  - account-service.yaml
  - payment-service.yaml
  - card-service.yaml
  - notification-service.yaml
  - billing-service.yaml
  - savings-service.yaml
  - support-service.yaml
  - kyc-service.yaml

Cada spec debe incluir:
  - Todos los endpoints con request/response schemas
  - Códigos de error
  - Ejemplos de request/response
  - Headers requeridos (Authorization, X-Request-ID, X-Idempotency-Key)
  - Paginación estándar (cursor-based)
  - Rate limits por endpoint

Criterios de aceptación:
  - Specs válidas con swagger-cli validate
  - Cubren 100% de la funcionalidad planificada
  - Agente 2 y 3 pueden generar mocks desde ellas
```

**TASK-1.0.4: Database Schema & Migrations**
```
Descripción: Diseñar el schema completo de PostgreSQL con todas las tablas
Ubicación: services/*/src/database/migrations/
Entregables:
  TABLAS (mínimo):
  - users (id, email, phone, password_hash, pin_hash, status, kyc_status, created_at, updated_at)
  - user_profiles (user_id, first_name, last_name, document_type, document_number, birth_date, 
    address, city, country, selfie_url, document_front_url, document_back_url)
  - accounts (id, user_id, account_number, type, currency, balance, available_balance, status, 
    created_at)
  - transactions (id, account_id, type, amount, currency, description, reference, 
    counterparty_account, status, metadata, created_at)
  - transfers (id, source_account_id, destination_account_id, amount, currency, type, 
    description, status, idempotency_key, created_at)
  - cards (id, user_id, account_id, card_number_encrypted, last_four, expiry_month, expiry_year, 
    cvv_encrypted, type, network, status, daily_limit, monthly_limit, created_at)
  - card_transactions (id, card_id, merchant_name, merchant_category, amount, currency, status, 
    authorization_code, created_at)
  - savings_goals (id, user_id, name, target_amount, current_amount, currency, deadline, 
    auto_save_amount, auto_save_frequency, status, created_at)
  - savings_contributions (id, goal_id, amount, type, source_account_id, created_at)
  - bills (id, user_id, provider_id, category, account_number, alias, auto_pay, created_at)
  - bill_payments (id, bill_id, amount, reference, status, paid_at)
  - bill_providers (id, name, category, country, logo_url, api_endpoint, status)
  - notifications (id, user_id, type, title, body, data, channel, read, sent_at)
  - notification_preferences (user_id, channel, enabled, categories)
  - support_tickets (id, user_id, subject, description, category, status, priority, 
    assigned_to, created_at, updated_at)
  - support_messages (id, ticket_id, sender_type, sender_id, message, attachments, created_at)
  - otp_codes (id, user_id, code, type, expires_at, used, created_at)
  - sessions (id, user_id, device_info, ip_address, token_hash, expires_at, created_at)
  - audit_logs (id, user_id, action, entity_type, entity_id, old_value, new_value, 
    ip_address, created_at)
  - qr_codes (id, user_id, account_id, amount, description, type, status, expires_at, created_at)
  - mobile_topups (id, user_id, phone_number, operator, amount, status, reference, created_at)
  - countries (id, code, name, currency_code, phone_prefix, status)
  - exchange_rates (id, from_currency, to_currency, rate, updated_at)

  ÍNDICES requeridos:
  - users: email (unique), phone (unique)
  - accounts: user_id, account_number (unique)
  - transactions: account_id + created_at, reference
  - transfers: idempotency_key (unique), source_account_id + created_at
  - cards: user_id, card_number_encrypted (unique)
  - audit_logs: user_id + created_at, entity_type + entity_id

Criterios de aceptación:
  - Migrations corren sin error en PostgreSQL 16
  - Rollback funciona para cada migration
  - Datos seed para testing incluidos
  - Foreign keys y constraints correctos
  - Soft deletes donde aplique
```

**TASK-1.0.5: Boilerplate de Microservicio NestJS**
```
Descripción: Crear template base reutilizable para todos los microservicios
Ubicación: services/_template/
Entregables:
  - src/main.ts (bootstrap con Swagger, CORS, validation pipes)
  - src/app.module.ts (con imports estándar)
  - src/config/ (configuration module con validation via Joi)
  - src/database/ (TypeORM module con PostgreSQL)
  - src/common/
    - decorators/ (CurrentUser, Roles, Public, IdempotencyKey)
    - filters/ (GlobalExceptionFilter, HttpExceptionFilter)
    - guards/ (JwtAuthGuard, RolesGuard, ThrottlerGuard)
    - interceptors/ (LoggingInterceptor, TransformInterceptor, TimeoutInterceptor)
    - pipes/ (ValidationPipe custom)
    - middleware/ (RequestIdMiddleware, CorrelationIdMiddleware)
    - dto/ (PaginationDto, ApiResponseDto, ErrorResponseDto)
  - src/health/ (HealthModule con checks de DB, Redis, Kafka)
  - Dockerfile
  - jest.config.ts
  - tsconfig.json
  - .env.example

Criterios de aceptación:
  - Template compila y arranca sin errores
  - Health check responde en /health
  - Swagger UI disponible en /api/docs
  - Logging estructurado (JSON) funcionando
  - Variables de entorno validadas al arranque
```

---

#### SPRINT 1: AUTENTICACIÓN Y USUARIOS (Días 3-5)

**TASK-1.1.1: Auth Service — Registro**
```
Servicio: services/auth-service/
Endpoints:
  POST /auth/register
    Body: { email, phone, password, country_code }
    Response: { user_id, access_token, refresh_token }
    Lógica:
      - Validar email único y phone único
      - Hash password con bcrypt (salt rounds: 12)
      - Crear user con status PENDING_VERIFICATION
      - Crear account default (tipo CHECKING, moneda según país)
      - Generar OTP y enviarlo por SMS (evento Kafka → notification-service)
      - Generar JWT access_token (15min) + refresh_token (30 días)
      - Log en audit_logs

  POST /auth/verify-phone
    Body: { user_id, otp_code }
    Response: { verified: true }
    Lógica:
      - Validar OTP no expirado y no usado
      - Marcar user como PHONE_VERIFIED
      - Invalidar OTP

  POST /auth/verify-email
    Body: { token } (token en URL enviado por email)
    Lógica:
      - Verificar token JWT para email
      - Marcar email_verified = true

Tests requeridos:
  - Unit: registro exitoso, email duplicado, phone duplicado, password débil
  - Integration: flujo completo registro → verify → login
```

**TASK-1.1.2: Auth Service — Login y Sesiones**
```
Endpoints:
  POST /auth/login
    Body: { email_or_phone, password, device_info }
    Response: { access_token, refresh_token, user, requires_2fa }
    Lógica:
      - Encontrar user por email o phone
      - Verificar password con bcrypt.compare
      - Si 2FA habilitado, retornar requires_2fa: true
      - Si dispositivo nuevo, enviar notificación push
      - Crear sesión en sessions table
      - Registrar login en audit_logs
      - Rate limit: 5 intentos/15min, lockout 30min

  POST /auth/login/2fa
    Body: { user_id, otp_code, device_info }
    Response: { access_token, refresh_token }

  POST /auth/refresh
    Body: { refresh_token }
    Response: { access_token, refresh_token }
    Lógica:
      - Validar refresh_token no expirado
      - Rotar refresh_token (invalidar el anterior)
      - Emitir nuevo access_token

  POST /auth/logout
    Headers: Authorization: Bearer {token}
    Lógica:
      - Invalidar sesión actual
      - Blacklist del access_token en Redis (TTL = tiempo restante)

  POST /auth/logout-all
    Lógica:
      - Invalidar TODAS las sesiones del usuario
      - Blacklist todos los tokens activos

  POST /auth/forgot-password
    Body: { email }
    Lógica:
      - Generar token de reset (JWT, 1 hora)
      - Enviar email con link de reset
      - No revelar si el email existe o no (seguridad)

  POST /auth/reset-password
    Body: { token, new_password }
    Lógica:
      - Validar token
      - Actualizar password
      - Invalidar todas las sesiones existentes

  POST /auth/change-password
    Body: { current_password, new_password }
    Lógica:
      - Verificar current_password
      - Actualizar password
      - Invalidar otras sesiones (opcional, configurable)

Tests requeridos:
  - Unit: login exitoso, credenciales inválidas, cuenta bloqueada, 2FA
  - Integration: login → uso API → refresh → logout
  - Security: brute force protection, token blacklisting
```

**TASK-1.1.3: Auth Service — PIN y Biometría**
```
Endpoints:
  POST /auth/pin/setup
    Body: { pin } (4-6 dígitos)
    Lógica:
      - Hash PIN con bcrypt
      - Almacenar pin_hash en users
      - PIN requerido para transacciones

  POST /auth/pin/verify
    Body: { pin }
    Response: { valid: true, transaction_token } (token de corta duración para la transacción)
    Lógica:
      - Verificar PIN
      - Generar transaction_token (JWT, 5 min, single-use)
      - Rate limit: 3 intentos, lockout 1 hora

  POST /auth/pin/change
    Body: { current_pin, new_pin }

  POST /auth/biometric/register
    Body: { device_id, biometric_public_key }
    Lógica:
      - Almacenar public key asociada al device
      - Permitir login biométrico desde ese device

  POST /auth/biometric/verify
    Body: { device_id, signed_challenge }
    Response: { access_token, refresh_token }
    Lógica:
      - Verificar firma con la public key del device
      - Emitir tokens normales

Tests:
  - PIN setup, verify correcto, verify incorrecto, lockout
  - Biometric register y verify
```

**TASK-1.1.4: User Service — Gestión de Perfiles**
```
Servicio: services/user-service/
Endpoints:
  GET /users/me
    Response: { user completo con profile }

  PATCH /users/me
    Body: campos a actualizar (first_name, last_name, address, etc.)
    Lógica:
      - Solo campos permitidos
      - Validación de cada campo
      - Audit log del cambio

  GET /users/me/devices
    Response: lista de dispositivos/sesiones activas

  DELETE /users/me/devices/:sessionId
    Lógica: cerrar sesión específica

  POST /users/me/avatar
    Body: multipart/form-data con imagen
    Lógica:
      - Validar imagen (tipo, tamaño max 5MB)
      - Resize a 256x256 y 64x64
      - Upload a S3
      - Actualizar avatar_url en profile

  GET /users/search
    Query: ?phone=XXXXX o ?alias=XXXXX
    Response: { user_id, display_name, avatar_url } (datos limitados para P2P)
    Lógica:
      - Solo retornar datos necesarios para transferencia
      - No exponer datos sensibles

  POST /users/me/preferences
    Body: { language, theme, notification_settings }

  DELETE /users/me (Account deletion)
    Lógica:
      - Verificar PIN
      - Verificar balance = 0
      - Soft delete con retención 30 días
      - Cancelar tarjetas activas
      - Cerrar todas las sesiones

Tests:
  - CRUD de perfil completo
  - Upload avatar
  - Búsqueda de usuarios para P2P
  - Account deletion flow
```

**TASK-1.1.5: KYC Service**
```
Servicio: services/kyc-service/
Endpoints:
  POST /kyc/start
    Body: { document_type } (CC, DNI, CURP, CPF, Passport)
    Response: { kyc_session_id }

  POST /kyc/document
    Body: multipart/form-data { front_image, back_image }
    Lógica:
      - Validar calidad de imagen
      - Almacenar en S3 encriptado
      - Extraer datos OCR (simulado)
      - Verificar contra bases de datos (simulado)

  POST /kyc/selfie
    Body: multipart/form-data { selfie_image }
    Lógica:
      - Liveness detection (simulado)
      - Face matching con documento (simulado)

  POST /kyc/verify
    Body: { kyc_session_id }
    Response: { status: APPROVED | REJECTED | MANUAL_REVIEW, reason? }
    Lógica:
      - Verificar todos los pasos completados
      - Scoring automático
      - Si score > threshold → APPROVED
      - Actualizar kyc_status del user
      - Desbloquear límites de transacción

  GET /kyc/status
    Response: { status, steps_completed, steps_remaining }

Tests:
  - Flujo KYC completo happy path
  - Documento rechazado por calidad
  - Selfie no coincide
  - Límites desbloqueados post-KYC
```

---

#### SPRINT 2: CORE BANKING (Días 6-9)

**TASK-1.2.1: Account Service — Cuentas**
```
Servicio: services/account-service/
Endpoints:
  GET /accounts
    Response: lista de cuentas del usuario
    Incluye: balance, available_balance, tipo, moneda

  GET /accounts/:id
    Response: detalle de cuenta con balance

  GET /accounts/:id/balance
    Response: { balance, available_balance, currency, last_updated }

  POST /accounts
    Body: { type, currency }
    Lógica:
      - Generar account_number único (formato por país)
      - Máximo 5 cuentas por usuario
      - Balance inicial 0

  GET /accounts/:id/transactions
    Query: ?page=1&limit=20&from=date&to=date&type=DEBIT|CREDIT&category=
    Response: lista paginada de transacciones (cursor-based)
    Lógica:
      - Cursor-based pagination para performance
      - Filtros por fecha, tipo, monto, categoría
      - Incluir running balance

  GET /accounts/:id/transactions/export
    Query: ?format=csv|pdf&from=date&to=date
    Response: archivo descargable

  GET /accounts/:id/statement
    Query: ?month=2026-01
    Response: estado de cuenta mensual (PDF generado)

Tests:
  - Crear cuenta, consultar balance
  - Listar transacciones con filtros
  - Paginación cursor-based
  - Exportación CSV
```

**TASK-1.2.2: Account Service — Ledger (Double-Entry Bookkeeping)**
```
Descripción: Implementar sistema de contabilidad de doble entrada
Entregables:
  - Tabla ledger_entries (id, transaction_id, account_id, debit, credit, balance_after, created_at)
  - Servicio LedgerService con transacciones ACID
  - Cada movimiento genera 2 entries (debit y credit)
  - Balance calculado como SUM(credit) - SUM(debit) — verificable
  - Reconciliación automática diaria
  
  Métodos:
    - recordTransaction(from_account, to_account, amount, type, metadata)
    - getBalance(account_id) → calcula desde ledger (source of truth)
    - reconcile(account_id) → verifica balance vs cache
    - getStatement(account_id, from, to) → movimientos con running balance

  REGLA CRÍTICA: Toda operación monetaria DEBE pasar por el Ledger
  - Transferencia P2P: debit cuenta A, credit cuenta B
  - Depósito: credit cuenta usuario, debit cuenta house
  - Retiro: debit cuenta usuario, credit cuenta house
  - Pago servicio: debit cuenta usuario, credit cuenta proveedor

  Manejo de concurrencia:
    - SELECT FOR UPDATE en balances
    - Idempotency key para evitar duplicados
    - Retry con exponential backoff

Tests:
  - Doble entrada correcta
  - Balance consistente después de N transacciones
  - Idempotencia (misma transacción no se ejecuta 2 veces)
  - Concurrencia (2 transferencias simultáneas desde misma cuenta)
  - Reconciliación exitosa y fallida
```

**TASK-1.2.3: Payment Service — Transferencias P2P**
```
Servicio: services/payment-service/
Endpoints:
  POST /transfers
    Body: { 
      source_account_id, 
      destination_identifier, // account_number, phone, alias, email
      destination_type, // INTERNAL, EXTERNAL
      amount, 
      currency, 
      description,
      idempotency_key 
    }
    Response: { transfer_id, status, timestamp }
    Lógica:
      - Validar idempotency_key (si existe, retornar resultado previo)
      - Verificar balance suficiente (available_balance >= amount)
      - Verificar límites diarios/mensuales
      - Resolver destination_identifier → account_id
      - Verificar PIN (transaction_token en header)
      - Ejecutar en transacción DB:
        1. Debitar cuenta origen
        2. Acreditar cuenta destino
        3. Crear registros en ledger
        4. Crear transaction records
        5. Actualizar balances cacheados
      - Emitir eventos Kafka:
        - transfer.completed (→ notification-service)
        - transfer.completed (→ analytics-service)
      - Si falla: rollback completo, retornar error

  GET /transfers/:id
    Response: detalle de la transferencia

  GET /transfers
    Query: ?status=PENDING|COMPLETED|FAILED&from=date&to=date
    Response: historial de transferencias

  POST /transfers/:id/cancel
    Lógica: solo si status = PENDING y tipo permite cancelación

  POST /transfers/contacts
    Response: contactos frecuentes con datos de transferencia

  GET /transfers/limits
    Response: { daily_limit, daily_used, monthly_limit, monthly_used }

Tests:
  - Transferencia exitosa P2P
  - Balance insuficiente
  - Límite diario excedido
  - Idempotencia
  - Concurrencia
  - Transferencia a número de teléfono
  - Transferencia a alias
```

**TASK-1.2.4: Payment Service — QR Payments**
```
Endpoints:
  POST /qr/generate
    Body: { account_id, amount?, description?, type } 
    // type: STATIC (sin monto), DYNAMIC (con monto, single-use)
    Response: { qr_id, qr_data, qr_image_url, expires_at }
    Lógica:
      - Generar payload con datos encriptados
      - Crear imagen QR (librería qrcode)
      - Static QR: no expira, monto variable
      - Dynamic QR: expira en 10 min, monto fijo

  POST /qr/scan
    Body: { qr_data }
    Response: { merchant/user info, amount, description }
    Lógica:
      - Decodificar y validar QR
      - Retornar info para confirmación

  POST /qr/pay
    Body: { qr_id, amount?, pin_token }
    Response: { transfer_id, status }
    Lógica:
      - Verificar QR válido y no expirado
      - Ejecutar transferencia vía TransferService
      - Marcar QR dynamic como usado

Tests:
  - Generar QR estático y dinámico
  - Escanear y pagar
  - QR expirado
  - QR ya usado (dynamic)
```

**TASK-1.2.5: Payment Service — Depósitos y Retiros**
```
Endpoints:
  POST /deposits
    Body: { account_id, amount, method, reference }
    Methods: PSE, SPEI, PIX, CASH_IN, BANK_TRANSFER
    Lógica:
      - Crear deposit record con status PENDING
      - Según método, generar referencia de pago
      - Webhook endpoint para confirmación (simulado)
      - Al confirmar: acreditar cuenta vía Ledger

  POST /deposits/webhook (interno)
    Body: { reference, status, provider_reference }
    Lógica:
      - Verificar firma del webhook
      - Actualizar deposit status
      - Si COMPLETED: acreditar cuenta

  POST /withdrawals
    Body: { account_id, amount, method, destination }
    Methods: ATM_CODELESS, AGENT_NETWORK, BANK_TRANSFER
    Lógica:
      - Verificar balance
      - Verificar PIN
      - Para ATM_CODELESS: generar código temporal (6 dígitos, 30 min)
      - Para AGENT_NETWORK: generar código de retiro
      - Debitar cuenta vía Ledger

  GET /withdrawals/:id/code
    Response: { code, expires_at }

Tests:
  - Depósito por cada método
  - Webhook de confirmación
  - Retiro ATM sin tarjeta
  - Código de retiro expira correctamente
```

---

#### SPRINT 3: TARJETAS Y SERVICIOS (Días 10-13)

**TASK-1.3.1: Card Service — Tarjeta Virtual**
```
Servicio: services/card-service/
Endpoints:
  POST /cards/virtual
    Body: { account_id, network } // VISA, MASTERCARD
    Response: { card_id, last_four, status }
    Lógica:
      - Generar número de tarjeta (algoritmo Luhn)
      - Generar CVV y expiry
      - Encriptar card_number y CVV (AES-256)
      - Asociar a cuenta
      - Límite default: $500 USD/día
      - Status: ACTIVE

  GET /cards
    Response: lista de tarjetas del usuario

  GET /cards/:id
    Response: detalle de tarjeta (con datos enmascarados)

  POST /cards/:id/reveal
    Body: { pin_token }
    Response: { card_number, cvv, expiry } (datos completos, una sola vez)
    Lógica:
      - Verificar PIN
      - Retornar datos desencriptados
      - Log en audit (acceso a datos sensibles)
      - Rate limit: 3 reveals por hora

  PATCH /cards/:id/limits
    Body: { daily_limit, monthly_limit, international_enabled, online_enabled }
    Lógica:
      - Validar límites dentro de rangos permitidos
      - Audit log

  POST /cards/:id/block
    Lógica: cambiar status a BLOCKED, rechazar futuras transacciones

  POST /cards/:id/unblock
    Body: { pin_token }
    Lógica: cambiar status a ACTIVE

  DELETE /cards/:id
    Lógica: cancelar tarjeta permanentemente

Tests:
  - Crear tarjeta virtual
  - Número válido (Luhn)
  - Reveal con PIN
  - Block/unblock
  - Límites
```

**TASK-1.3.2: Card Service — Tarjeta Física**
```
Endpoints:
  POST /cards/physical
    Body: { account_id, delivery_address, network }
    Response: { card_id, status: ORDERED, estimated_delivery }
    Lógica:
      - Verificar KYC aprobado
      - Crear card con status ORDERED
      - Generar número y CVV (encriptados)
      - Emitir evento para fulfillment

  POST /cards/:id/activate
    Body: { last_four, activation_code } // código viene con la tarjeta
    Lógica:
      - Verificar last_four coincide
      - Verificar activation_code
      - Cambiar status a ACTIVE
      - Habilitar transacciones

  POST /cards/:id/report-lost
    Lógica:
      - Bloquear tarjeta inmediatamente
      - Ofrecer reemplazo
      - Transferir datos a nueva tarjeta

  POST /cards/:id/replace
    Body: { reason, delivery_address }
    Lógica:
      - Cancelar tarjeta anterior
      - Crear nueva tarjeta con misma cuenta
      - Nuevo número, nuevo CVV

Tests:
  - Solicitar tarjeta física
  - Activar con código
  - Reportar pérdida
  - Reemplazo
```

**TASK-1.3.3: Card Service — Autorización de Transacciones**
```
Endpoints:
  POST /cards/authorize (interno, llamado por procesador)
    Body: { card_number, cvv, expiry, amount, merchant, category, country }
    Response: { approved: bool, authorization_code, decline_reason? }
    Lógica:
      - Desencriptar y verificar datos de tarjeta
      - Verificar status ACTIVE
      - Verificar balance suficiente
      - Verificar límites (diario, mensual, por transacción)
      - Verificar país habilitado (si international_enabled)
      - Verificar online habilitado (si online_enabled)
      - Check con Fraud Service (evento síncrono)
      - Si aprobado:
        1. Hold del monto (available_balance -= amount, balance sin cambiar)
        2. Crear card_transaction con status AUTHORIZED
        3. Generar authorization_code
        4. Emitir notificación push instantánea
      - Si rechazado:
        1. Crear card_transaction con status DECLINED
        2. Emitir notificación de rechazo

  POST /cards/capture (interno)
    Body: { authorization_code, final_amount }
    Lógica:
      - Buscar transacción autorizada
      - Si final_amount != authorized_amount: ajustar hold
      - Ejecutar cobro real vía Ledger
      - Cambiar status a CAPTURED

  POST /cards/reverse (interno)
    Body: { authorization_code }
    Lógica:
      - Liberar hold
      - Cambiar status a REVERSED

Tests:
  - Autorización exitosa
  - Rechazo por balance
  - Rechazo por límite
  - Rechazo por país
  - Captura con monto diferente
  - Reversa
  - Notificación instantánea
```

**TASK-1.3.4: Billing Service — Pago de Servicios**
```
Servicio: services/billing-service/
Endpoints:
  GET /billers
    Query: ?country=CO&category=UTILITIES
    Response: lista de proveedores disponibles

  GET /billers/:id
    Response: detalle del proveedor con campos requeridos

  POST /bills/lookup
    Body: { biller_id, account_number }
    Response: { amount_due, due_date, customer_name, bill_details }
    Lógica:
      - Consultar API del proveedor (simulado)
      - Retornar info de la factura

  POST /bills/pay
    Body: { biller_id, account_number, amount, source_account_id, pin_token }
    Response: { payment_id, status, reference }
    Lógica:
      - Verificar balance
      - Verificar PIN
      - Debitar cuenta vía Ledger
      - Enviar pago al proveedor (simulado)
      - Generar comprobante

  POST /bills/schedule
    Body: { ...bill_pay_body, schedule_date }
    Lógica:
      - Crear scheduled payment
      - Job scheduler ejecuta en la fecha

  GET /bills/auto-pay
    Response: lista de pagos automáticos configurados

  POST /bills/auto-pay
    Body: { biller_id, account_number, source_account_id, max_amount }
    Lógica:
      - Configurar auto-pay mensual
      - Job que consulta y paga automáticamente

  POST /topups/mobile
    Body: { phone_number, operator, amount, source_account_id, pin_token }
    Response: { topup_id, status }
    Lógica:
      - Validar operador y montos disponibles
      - Debitar cuenta
      - Enviar recarga al operador (simulado)

  GET /topups/operators
    Query: ?country=CO
    Response: lista de operadores con planes disponibles

Tests:
  - Consultar factura
  - Pagar servicio
  - Auto-pay setup y ejecución
  - Recarga móvil
```

**TASK-1.3.5: Savings Service — Bolsillos / Metas de Ahorro**
```
Servicio: services/savings-service/
Endpoints:
  POST /savings/goals
    Body: { name, target_amount, deadline?, auto_save_amount?, auto_save_frequency?, 
            source_account_id, icon?, color? }
    Response: { goal_id, status }
    Lógica:
      - Crear savings_goal
      - Si auto_save configurado, crear scheduled job
      - Calcular projected_completion_date

  GET /savings/goals
    Response: lista de metas con progreso

  GET /savings/goals/:id
    Response: detalle con contribuciones y proyección

  POST /savings/goals/:id/contribute
    Body: { amount, source_account_id, pin_token }
    Lógica:
      - Verificar balance
      - Debitar cuenta principal
      - Acreditar meta (es una sub-cuenta interna)
      - Registrar en ledger
      - Actualizar progreso

  POST /savings/goals/:id/withdraw
    Body: { amount, destination_account_id, pin_token }
    Lógica:
      - Verificar fondos en meta
      - Transferir a cuenta principal
      - Actualizar progreso

  PATCH /savings/goals/:id
    Body: campos actualizables

  DELETE /savings/goals/:id
    Lógica:
      - Si tiene fondos, transferir a cuenta principal
      - Eliminar meta y auto-save jobs

Tests:
  - Crear meta de ahorro
  - Contribuir manualmente
  - Auto-save execution
  - Retirar fondos
  - Alcanzar meta (notificación de felicitación)
```

---

#### SPRINT 4: NOTIFICACIONES Y SOPORTE (Días 14-16)

**TASK-1.4.1: Notification Service**
```
Servicio: services/notification-service/
Descripción: Servicio que escucha eventos Kafka y envía notificaciones

Kafka Consumers:
  - transfer.completed → push + in-app
  - card.transaction → push instant + in-app
  - card.blocked → push + email
  - kyc.status_changed → push + email
  - login.new_device → push + email
  - savings.goal_reached → push + in-app
  - bill.payment_due → push + email
  - bill.auto_paid → push + in-app
  - security.suspicious_activity → push + SMS + email
  - account.low_balance → push + in-app

Endpoints:
  GET /notifications
    Query: ?read=false&limit=20&cursor=
    Response: lista de notificaciones paginada

  PATCH /notifications/:id/read
    Lógica: marcar como leída

  POST /notifications/read-all
    Lógica: marcar todas como leídas

  GET /notifications/preferences
    Response: preferencias de notificación del usuario

  PATCH /notifications/preferences
    Body: { push_enabled, email_enabled, sms_enabled, categories: { transactions: true, ... } }

Implementación:
  - Push: Firebase Cloud Messaging (FCM)
  - Email: Nodemailer + templates HTML
  - SMS: Twilio (simulado)
  - In-app: Almacenar en DB + WebSocket para real-time
  - Templates Handlebars para cada tipo de notificación
  - Retry logic con exponential backoff
  - Dead letter queue para notificaciones fallidas

Tests:
  - Cada tipo de evento genera la notificación correcta
  - Preferencias respetadas (si push disabled, no envía push)
  - WebSocket real-time para in-app
  - Retry funciona
```

**TASK-1.4.2: Support Service**
```
Servicio: services/support-service/
Endpoints:
  POST /support/tickets
    Body: { subject, description, category }
    Categories: ACCOUNT, CARD, TRANSACTION, KYC, OTHER
    Response: { ticket_id, status: OPEN }
    Lógica:
      - Crear ticket
      - Auto-assign basado en categoría
      - Notificar equipo de soporte

  GET /support/tickets
    Query: ?status=OPEN|IN_PROGRESS|RESOLVED|CLOSED
    Response: lista de tickets del usuario

  GET /support/tickets/:id
    Response: ticket con mensajes

  POST /support/tickets/:id/messages
    Body: { message, attachments? }
    Lógica:
      - Agregar mensaje al ticket
      - Si sender es usuario, notificar agente
      - Si sender es agente, notificar usuario (push)

  PATCH /support/tickets/:id
    Body: { status, priority }
    Lógica: solo agentes pueden cambiar status

  GET /support/faq
    Query: ?category=&search=
    Response: lista de FAQs

  POST /support/faq/feedback
    Body: { faq_id, helpful: bool }

  WebSocket /support/chat
    Lógica:
      - Chat en tiempo real con agente de soporte
      - Typing indicators
      - Read receipts

Tests:
  - Crear ticket
  - Enviar mensajes
  - Cambiar estado
  - Chat en tiempo real
  - FAQ search
```

**TASK-1.4.3: Event Bus (Kafka) — Setup y Eventos**
```
Descripción: Configurar Apache Kafka como event bus entre microservicios
Entregables:
  Topics:
    - paylat.auth.events (register, login, logout, password_change)
    - paylat.user.events (profile_update, kyc_status_change, account_deletion)
    - paylat.account.events (created, balance_update)
    - paylat.transfer.events (initiated, completed, failed, cancelled)
    - paylat.card.events (created, activated, blocked, transaction)
    - paylat.billing.events (payment, auto_pay, topup)
    - paylat.savings.events (contribution, withdrawal, goal_reached)
    - paylat.notification.commands (send_push, send_email, send_sms)
    - paylat.fraud.events (suspicious_activity, blocked_transaction)
    - paylat.audit.events (all audit log entries)

  Producer module reutilizable:
    - EventPublisher service con retry y dead letter
    - Schemas Avro para cada evento
    - Correlation ID propagation

  Consumer module reutilizable:
    - Consumer group per service
    - Idempotent processing
    - Error handling con dead letter

Tests:
  - Publish y consume de cada tipo de evento
  - Idempotencia del consumer
  - Dead letter queue
  - Ordering garantees dentro de partition
```

**TASK-1.4.4: Exchange Rate Service**
```
Descripción: Servicio para tasas de cambio y conversión de monedas
Endpoints:
  GET /exchange-rates
    Query: ?from=COP&to=USD
    Response: { rate, inverse_rate, updated_at }

  POST /exchange-rates/convert
    Body: { from_currency, to_currency, amount }
    Response: { converted_amount, rate, fee }

  Lógica:
    - Tasas actualizadas cada hora (simulado con datos seed)
    - Cache en Redis (TTL 5 min)
    - Fee de conversión configurable por corredor
    - Soporte: COP, MXN, BRL, ARS, PEN, CLP, USD

Tests:
  - Conversión entre todas las monedas soportadas
  - Cache hit y miss
  - Fee calculation
```

---

#### SPRINT 5: OPTIMIZACIÓN Y CALIDAD (Días 17-19)

**TASK-1.5.1: API Gateway Configuration**
```
Descripción: Configurar rutas del API Gateway para todos los servicios
Entregables:
  - Routing configuration para cada servicio
  - Rate limiting por endpoint y por usuario
  - CORS configuration
  - Request/response transformation
  - API versioning (v1/)
  - Health check aggregation
  - Request logging

Rate limits default:
  - Auth endpoints: 10 req/min
  - Transfer: 30 req/min
  - Read endpoints: 100 req/min
  - Card reveal: 3 req/hora
```

**TASK-1.5.2: Comprehensive Testing**
```
Entregables:
  - Unit tests para CADA servicio (>80% coverage)
  - Integration tests para flujos completos:
    1. Registro → KYC → Primera transferencia
    2. Crear tarjeta → Autorizar → Capturar
    3. Configurar auto-pay → Ejecución
    4. Meta de ahorro → Auto-save → Retiro
    5. Crear ticket → Chat → Resolución
  - Load testing con Artillery/k6:
    - 1000 usuarios concurrentes
    - 100 transferencias/segundo
    - P99 latency < 500ms
  - Contract tests (Pact) entre servicios

Criterios de aceptación:
  - 0 tests fallando
  - Coverage > 80%
  - Performance benchmarks cumplidos
```

**TASK-1.5.3: Data Seeding & Demo Mode**
```
Descripción: Crear datos de prueba realistas para demo
Entregables:
  - 50 usuarios con perfiles completos
  - Cuentas con balances variados
  - Historial de transacciones de 6 meses
  - Tarjetas virtuales y físicas
  - Metas de ahorro en progreso
  - Tickets de soporte con conversaciones
  - Proveedores de servicios por país (CO, MX, BR)
  - Operadores móviles por país
  - Script idempotente de seed
  - Demo user con credenciales conocidas
```

---

## 6. AGENTE 2 — CLAUDE CODE: FRONTEND MOBILE + WEB

### 📋 PROMPT INICIAL PARA AGENTE 2

```
Eres el Agente 2 (CLAUDE CODE) — Frontend Lead Engineer de un proyecto fintech 
neobank para Latinoamérica llamado "PayLat". Tu responsabilidad es construir la 
app mobile (React Native + Expo) y la web app (Next.js).

STACK MOBILE: React Native + Expo + TypeScript + NativeWind (Tailwind)
STACK WEB: Next.js 14 + TypeScript + Tailwind CSS + shadcn/ui
GIT: Trabaja en ramas feature/agent2/*
REGLA: Usa los OpenAPI specs de docs/api/ para generar API clients.
       Mientras el backend no esté listo, usa MSW (Mock Service Worker) para mocks.
       Tu código no debe depender de que el backend esté corriendo.

Consume @paylat/shared-types para los tipos de datos.
Todos los componentes UI compartidos van en packages/ui-components/.
```

### BACKLOG COMPLETO — AGENTE 2

---

#### SPRINT 0: FUNDACIÓN UI (Días 1-2)

**TASK-2.0.1: Setup React Native + Expo**
```
Ubicación: apps/mobile/
Entregables:
  - Expo project con TypeScript
  - NativeWind (Tailwind para RN) configurado
  - React Navigation configurado:
    - Stack Navigator (auth flow)
    - Bottom Tab Navigator (main app)
    - Stack Navigator dentro de cada tab
  - Estructura de carpetas:
    apps/mobile/
    ├── app/ (Expo Router si se usa)
    ├── src/
    │   ├── components/
    │   │   ├── common/ (Button, Input, Card, Modal, BottomSheet, etc.)
    │   │   ├── auth/
    │   │   ├── home/
    │   │   ├── payments/
    │   │   ├── cards/
    │   │   ├── savings/
    │   │   └── support/
    │   ├── screens/
    │   │   ├── auth/
    │   │   ├── home/
    │   │   ├── payments/
    │   │   ├── cards/
    │   │   ├── savings/
    │   │   ├── bills/
    │   │   └── settings/
    │   ├── navigation/
    │   │   ├── RootNavigator.tsx
    │   │   ├── AuthNavigator.tsx
    │   │   ├── MainTabNavigator.tsx
    │   │   └── types.ts
    │   ├── hooks/ (useAuth, useBalance, useTransactions, etc.)
    │   ├── services/ (API client instances)
    │   ├── store/ (Zustand stores)
    │   ├── utils/
    │   ├── constants/
    │   ├── i18n/ (español, portugués, inglés)
    │   ├── theme/
    │   └── types/
    ├── assets/ (icons, images, fonts)
    └── __mocks__/ (MSW mocks)

  Dependencias clave:
  - @react-navigation/native + stack + bottom-tabs
  - zustand (state management)
  - react-query / tanstack-query (server state)
  - axios (HTTP client)
  - react-native-reanimated (animaciones)
  - react-native-gesture-handler
  - expo-camera (QR scanner)
  - expo-local-authentication (biometría)
  - expo-secure-store (tokens)
  - expo-notifications (push)
  - react-native-svg (iconos)
  - i18next + react-i18next

Criterios de aceptación:
  - App arranca en iOS y Android simulator
  - Navegación básica funciona
  - Tailwind styles aplicándose
  - Fuentes custom cargadas
```

**TASK-2.0.2: Design System & UI Components**
```
Ubicación: packages/ui-components/ + apps/mobile/src/components/common/
Entregables:
  Design Tokens (theme/):
    - colors.ts (primary, secondary, success, error, warning, neutral, gradients)
    - typography.ts (heading1-6, body, caption, label sizes)
    - spacing.ts (escala de 4px: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64)
    - shadows.ts
    - borderRadius.ts

  Componentes Base Mobile:
    - Button (primary, secondary, outline, ghost, danger, loading state, disabled)
    - Input (text, password con toggle, phone, amount, search, error state)
    - Card (elevated, outlined, pressable, con sombra suave)
    - Avatar (image, initials fallback, sizes: sm, md, lg, xl)
    - Badge (dot, count, status colors)
    - BottomSheet (modal, snap points, handle)
    - Modal (centered, fullscreen, with close)
    - Toast (success, error, info, warning, auto-dismiss)
    - LoadingSpinner (overlay, inline)
    - Skeleton (for loading states, matching component shapes)
    - EmptyState (icon, title, description, action button)
    - ErrorBoundary (with retry)
    - PullToRefresh
    - SwipeableRow (for lists with actions)
    - AmountDisplay (formatted currency, large/small, positive/negative colors)
    - TransactionItem (icon, title, amount, date, status badge)
    - AccountCard (gradient background, balance, account type)
    - PinInput (4-6 dots, secure entry, backspace)
    - OTPInput (4-6 separate boxes, auto-advance, paste support)
    - PhoneInput (country picker + number, auto-format)
    - CurrencyInput (prefix currency symbol, thousand separators)
    - SearchBar (icon, clear button, debounced)
    - SectionHeader (title, optional action link)
    - ListItem (icon, title, subtitle, right element, chevron)
    - Divider (horizontal, with text)
    - StatusBar (custom per screen)
    - SafeAreaWrapper
    - KeyboardAvoidingWrapper

  Animaciones:
    - Fade in/out para screens
    - Slide up para bottom sheets
    - Scale press para buttons
    - Skeleton shimmer effect
    - Number counter animation para balances
    - Success checkmark animation (Lottie)

Criterios de aceptación:
  - Storybook o demo screen con todos los componentes
  - Componentes accesibles (labels, roles)
  - Responsive en diferentes tamaños de pantalla
  - Soporte dark mode (preparado)
```

**TASK-2.0.3: API Client & Mock Setup**
```
Entregables:
  - API client generado desde OpenAPI specs (openapi-generator o manual)
  - MSW (Mock Service Worker) configurado para development
  - Mocks para TODOS los endpoints definidos en OpenAPI
  - Zustand stores:
    - useAuthStore (user, tokens, login/logout actions)
    - useAccountStore (accounts, balances, transactions)
    - useCardStore (cards, reveal data)
    - useSavingsStore (goals, contributions)
    - useNotificationStore (notifications, unread count)
  - React Query hooks para cada endpoint:
    - useUser, useAccounts, useBalance, useTransactions
    - useCards, useSavings, useNotifications, useBillers
  - Axios interceptors:
    - Auth token injection
    - Token refresh on 401
    - Error formatting
    - Request ID generation
    - Loading state management

Criterios de aceptación:
  - App funciona completa con mocks (sin backend)
  - Cambiar de mocks a API real es un flag de config
  - Types correctos en todas las respuestas
```

**TASK-2.0.4: Setup Next.js Web App**
```
Ubicación: apps/web/
Entregables:
  - Next.js 14 App Router + TypeScript
  - Tailwind CSS + shadcn/ui configurado
  - Estructura:
    apps/web/
    ├── app/
    │   ├── (auth)/
    │   │   ├── login/
    │   │   ├── register/
    │   │   └── verify/
    │   ├── (dashboard)/
    │   │   ├── home/
    │   │   ├── accounts/
    │   │   ├── transfers/
    │   │   ├── cards/
    │   │   ├── savings/
    │   │   ├── bills/
    │   │   └── settings/
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components/
    ├── hooks/
    ├── lib/
    ├── services/
    └── store/
  - Layout responsive (mobile-first)
  - Sidebar navigation para desktop
  - Bottom bar para mobile web
  - SSR donde aplique
  - Mismos Zustand stores y React Query hooks que mobile

Criterios de aceptación:
  - Web app arranca sin errores
  - Responsive en mobile, tablet, desktop
  - Comparte lógica con mobile vía packages/
```

---

#### SPRINT 1: AUTH SCREENS (Días 3-5)

**TASK-2.1.1: Onboarding Screens**
```
Screens:
  1. WelcomeScreen
     - Logo animado
     - 3 slides con beneficios (swipeable):
       "Envía dinero al instante"
       "Tu tarjeta virtual en segundos"
       "Ahorra sin esfuerzo"
     - Botones: "Crear cuenta" y "Ya tengo cuenta"
     - Animaciones suaves con Reanimated

  2. RegisterScreen
     - Steps con progress indicator:
       Step 1: País + Número de teléfono (PhoneInput con country picker)
       Step 2: Email + Password (strength indicator)
       Step 3: Nombre completo
     - Validación en cada step
     - Botón "Continuar" con loading
     - Link a términos y condiciones
     - Validaciones:
       - Email: format + no duplicado (API check)
       - Password: min 8, uppercase, number, special char
       - Phone: formato válido por país

  3. OTPVerificationScreen
     - OTPInput de 6 dígitos
     - Timer de reenvío (60 segundos)
     - Botón "Reenviar código"
     - Auto-submit al completar
     - Keyboard auto-focus

  4. EmailVerificationScreen
     - Ilustración de email
     - "Revisa tu correo"
     - Botón "Abrir app de correo"
     - Botón "Reenviar email"
     - Auto-detect de verificación (polling)

Tests:
  - Render de cada screen
  - Validación de formularios
  - Navegación entre steps
  - OTP auto-submit
```

**TASK-2.1.2: Login Screens**
```
Screens:
  1. LoginScreen
     - Logo
     - Input email/teléfono
     - Input password (con toggle visibility)
     - Checkbox "Recordarme"
     - Botón "Ingresar" (con loading)
     - Link "Olvidé mi contraseña"
     - Link "Crear cuenta"
     - Divider "o ingresa con"
     - Botón biometría (fingerprint/face)

  2. BiometricPromptScreen
     - Animación de huella/face
     - Fallback a password

  3. TwoFactorScreen
     - OTP de 6 dígitos
     - Timer
     - "Usar otro método"

  4. ForgotPasswordScreen
     - Input email
     - Botón "Enviar instrucciones"
     - Pantalla de confirmación

  5. ResetPasswordScreen
     - Input nueva contraseña
     - Input confirmar contraseña
     - Strength indicator
     - Botón "Cambiar contraseña"

  6. PinSetupScreen (post-first-login)
     - "Crea tu PIN de 4 dígitos"
     - PinInput animado
     - Confirm PIN (second entry)
     - Explicación de para qué sirve

Tests:
  - Login exitoso, fallido
  - Biometric flow
  - Forgot password flow
  - PIN setup
```

**TASK-2.1.3: KYC Screens**
```
Screens:
  1. KYCIntroScreen
     - Explicación del proceso
     - Pasos visuales (1. Documento, 2. Selfie, 3. Listo)
     - Botón "Comenzar verificación"

  2. DocumentTypeScreen
     - Selección: Cédula, DNI, CURP, CPF, Pasaporte
     - Iconos para cada tipo

  3. DocumentCaptureScreen (Front)
     - Camera view con overlay/guía
     - "Ubica la parte frontal de tu documento"
     - Captura automática o manual
     - Preview con botones "Repetir" / "Continuar"
     - Tips de iluminación

  4. DocumentCaptureScreen (Back)
     - Similar a front
     - "Ahora voltea tu documento"

  5. SelfieCaptureScreen
     - Camera frontal con óvalo guía
     - "Centra tu rostro"
     - Instrucciones de liveness (parpadear, girar)
     - Captura

  6. KYCProcessingScreen
     - Animación de loading
     - "Estamos verificando tu identidad..."
     - Progress steps animados

  7. KYCResultScreen
     - Aprobado: confetti animation + "¡Verificado!"
     - Rechazado: explicación + "Intentar de nuevo"
     - En revisión: "Te notificaremos pronto"

Tests:
  - Navegación completa del flujo
  - Manejo de permisos de cámara
  - Estados de resultado
```

---

#### SPRINT 2: HOME & CUENTAS (Días 6-9)

**TASK-2.2.1: Home Screen (Main Dashboard)**
```
Screen: HomeScreen (Tab principal)
Layout:
  - Header: 
    - Avatar del usuario (pressable → perfil)
    - Saludo "Hola, {nombre}" 
    - Notification bell con badge de unread count
  
  - Account Card (componente destacado):
    - Tarjeta con gradiente (similar a Nequi/Nu)
    - Balance principal (animación de counter)
    - Botón "Ver balance" / "Ocultar" (eye icon toggle)
    - Número de cuenta (copiable)
    - Tipo de cuenta
    - Si tiene múltiples cuentas: horizontal scroll de cards

  - Quick Actions Grid (2x3 o scroll horizontal):
    - Enviar dinero (→ TransferScreen)
    - Pedir dinero (→ RequestMoneyScreen)  
    - Pagar QR (→ QRScannerScreen)
    - Recargar celular (→ TopUpScreen)
    - Pagar servicios (→ BillsScreen)
    - Mi QR (→ MyQRScreen)

  - Savings Section (si tiene metas):
    - Horizontal scroll de mini cards de metas
    - Progress bar circular
    - "Ver todas" link

  - Recent Transactions:
    - Últimas 5 transacciones
    - TransactionItem component para cada una
    - "Ver todas" link (→ TransactionsScreen)
    - Pull-to-refresh para actualizar

  - Card Section (si tiene tarjetas):
    - Mini preview de tarjeta con últimos 4 dígitos
    - "Administrar" link

Funcionalidad:
  - Pull-to-refresh actualiza balance y transacciones
  - Skeleton loading en primera carga
  - Balance se oculta/muestra con animación
  - Deep links desde notificaciones

Tests:
  - Render con datos
  - Render sin datos (empty states)
  - Pull to refresh
  - Navegación a cada sección
  - Toggle balance visibility
```

**TASK-2.2.2: Transactions Screen**
```
Screen: TransactionsScreen
Layout:
  - Search bar (filtrar por descripción, contacto)
  - Filter chips: Todos, Ingresos, Gastos, Pendientes
  - Date range picker
  - FlatList de TransactionItems:
    - Agrupados por fecha (SectionList)
    - Ícono de categoría
    - Nombre/descripción
    - Monto (verde positivo, rojo negativo)
    - Hora
    - Status badge si pendiente
  - Empty state si no hay transacciones
  - Infinite scroll (cursor-based pagination)

  TransactionDetailScreen:
    - Tipo de transacción con ícono grande
    - Monto prominente
    - De / Para (con avatar)
    - Fecha y hora exacta
    - Referencia/ID
    - Estado
    - Categoría
    - Botones: "Compartir comprobante", "Reportar problema"
    - Comprobante generado como imagen shareable

Tests:
  - Filtros funcionan
  - Paginación infinite scroll
  - Detalle de transacción
  - Compartir comprobante
```

**TASK-2.2.3: Account Management Screens**
```
Screens:
  1. AccountsListScreen
     - Lista de cuentas con balance cada una
     - Botón "+ Nueva cuenta"
     - Resumen total de saldo

  2. AccountDetailScreen
     - Balance grande
     - Número de cuenta (copiable, con share)
     - Tipo y moneda
     - Transacciones de esa cuenta
     - Opciones: Renombrar, Exportar movimientos, Cerrar

  3. CreateAccountScreen
     - Selección de tipo (Checking, Savings)
     - Selección de moneda
     - Nombre personalizado
     - Confirmación

Tests:
  - CRUD de cuentas
  - Múltiples cuentas con diferentes monedas
```

---

#### SPRINT 3: TRANSFERENCIAS Y PAGOS (Días 10-13)

**TASK-2.3.1: Transfer Flow Screens**
```
Screens:
  1. TransferHomeScreen
     - Contactos frecuentes (horizontal scroll con avatars)
     - Contactos recientes (lista)
     - Búsqueda por nombre, teléfono, cuenta
     - "Nuevo contacto" botón

  2. TransferAmountScreen
     - Destinatario visible arriba (avatar, nombre)
     - CurrencyInput grande (teclado numérico custom)
     - Balance disponible mostrado
     - Campo descripción/nota (opcional)
     - Selector de cuenta origen (si múltiples)
     - Botón "Continuar"
     - Validación: monto > 0, <= balance disponible

  3. TransferConfirmScreen
     - Resumen:
       - De: cuenta con balance
       - Para: nombre + datos
       - Monto
       - Descripción
       - Fee (si aplica)
     - Botón "Confirmar y enviar"
     - Al presionar → PinInput bottom sheet

  4. TransferPinScreen (BottomSheet)
     - "Ingresa tu PIN para confirmar"
     - PinInput
     - Biometric fallback button

  5. TransferResultScreen
     - Success: animación checkmark + confetti
       - Monto enviado
       - A quién
       - Referencia
       - Botones: "Compartir comprobante", "Ir al inicio"
     - Error: 
       - Descripción del error
       - Botones: "Reintentar", "Ir al inicio"

  6. RequestMoneyScreen
     - Seleccionar contacto
     - Ingresar monto
     - Enviar solicitud (push notification al otro usuario)

Tests:
  - Flujo completo de transferencia
  - Validaciones de monto
  - PIN correcto e incorrecto
  - Compartir comprobante
  - Request money
```

**TASK-2.3.2: QR Screens**
```
Screens:
  1. QRScannerScreen
     - Camera view con overlay cuadrado animado
     - Flash toggle
     - "Escanea un código QR"
     - Al detectar QR → parsear y navegar a confirmación
     - Vibración al detectar
     - Botón manual "Ingresar código"

  2. MyQRScreen
     - Tab: "Mi QR" / "QR con monto"
     - Mi QR:
       - QR grande con logo en centro
       - Nombre del usuario
       - Alias/cuenta
       - Botón "Compartir" (share image)
     - QR con monto:
       - CurrencyInput para monto
       - Descripción
       - Botón "Generar QR"
       - QR generado con timer de expiración
       - Compartir

  3. QRPaymentConfirmScreen
     - Info del destinatario (merchant/persona)
     - Monto (si QR dinámico)
     - Input monto (si QR estático)
     - Cuenta a debitar
     - Botón "Pagar" → PIN

Tests:
  - Escaneo de QR (mock camera)
  - Generación de QR
  - Pago desde QR
```

**TASK-2.3.3: Bill Payment Screens**
```
Screens:
  1. BillsHomeScreen
     - Categorías con iconos: Servicios, Internet, TV, Teléfono, Gas, Agua, Luz
     - Facturas guardadas (favoritos)
     - Auto-pay configurados
     - Historial de pagos

  2. BillerSearchScreen
     - Búsqueda de proveedor por nombre
     - Filtro por categoría y país
     - Lista de proveedores con logo

  3. BillLookupScreen
     - Proveedor seleccionado (logo + nombre)
     - Input número de cuenta/contrato
     - Botón "Consultar"
     - Loading state

  4. BillPaymentScreen
     - Info de factura:
       - Monto a pagar
       - Fecha de vencimiento
       - Nombre del titular
     - Cuenta a debitar
     - Toggle "Guardar para pagos futuros"
     - Toggle "Activar pago automático"
     - Botón "Pagar" → PIN

  5. BillResultScreen
     - Comprobante de pago
     - Referencia
     - Compartir

  6. TopUpScreen
     - Número de teléfono (input o contactos)
     - Selección de operador (auto-detect por prefijo)
     - Selección de monto (chips predefinidos + custom)
     - Botón "Recargar" → PIN
     - Resultado

Tests:
  - Búsqueda de proveedor
  - Consulta de factura
  - Pago exitoso
  - Top-up móvil
  - Auto-pay setup
```

---

#### SPRINT 4: TARJETAS, AHORRO, SOPORTE (Días 14-16)

**TASK-2.4.1: Card Screens**
```
Screens:
  1. CardsHomeScreen
     - Lista de tarjetas (swipeable cards)
     - Cada tarjeta muestra:
       - Diseño visual de tarjeta (gradiente, chip, logo red)
       - Últimos 4 dígitos
       - Nombre del titular
       - Tipo (Virtual/Física)
       - Status badge
     - Botón "+ Nueva tarjeta"

  2. CardDetailScreen
     - Tarjeta grande con diseño visual
     - Datos enmascarados (•••• •••• •••• 1234)
     - Botón "Ver datos" → PIN → reveal temporario (30 seg timer)
     - Botón "Copiar número"
     - Sección de controles:
       - Toggle compras online
       - Toggle compras internacionales
       - Toggle contactless
     - Límites:
       - Diario: barra de progreso usada/total
       - Mensual: barra de progreso
       - "Modificar límites" link
     - Últimas transacciones de esa tarjeta
     - Botón "Bloquear tarjeta" (rojo)
     - Botón "Configurar" (→ CardSettingsScreen)

  3. CreateCardScreen
     - Selección: Virtual / Física
     - Virtual:
       - Selección de red (Visa/Mastercard)
       - Selección de cuenta
       - Animación de creación
       - Tarjeta creada con reveal automático
     - Física:
       - Selección de diseño
       - Dirección de envío (editable)
       - Estimado de entrega
       - Confirmación

  4. CardSettingsScreen
     - Límite diario (slider + input)
     - Límite mensual (slider + input)
     - Categorías bloqueadas
     - Países bloqueados
     - Alertas de transacción (toggle)

  5. ActivateCardScreen (solo física)
     - Input últimos 4 dígitos
     - Input código de activación
     - Éxito → tarjeta lista

  6. CardTransactionsScreen
     - Lista de transacciones de esa tarjeta
     - Filtros por fecha, status
     - Merchant name, logo, categoría

Tests:
  - Crear tarjeta virtual
  - Reveal datos con PIN
  - Block/unblock
  - Modificar límites
  - Activar física
```

**TASK-2.4.2: Savings Screens**
```
Screens:
  1. SavingsHomeScreen
     - Lista de metas de ahorro
     - Cada meta: 
       - Ícono/emoji personalizado
       - Nombre
       - Progress bar circular con porcentaje
       - Monto actual / monto objetivo
       - Días restantes
     - Botón "+ Nueva meta"
     - Resumen: "Tienes ${total} ahorrado en {n} metas"

  2. CreateGoalScreen
     - Steps:
       1. Nombre de la meta + ícono/emoji
       2. Monto objetivo + moneda
       3. Fecha límite (date picker, opcional)
       4. Auto-ahorro (monto + frecuencia: diario, semanal, quincenal, mensual)
       5. Cuenta fuente
       6. Color de la meta
     - Preview de la meta
     - Botón "Crear meta"

  3. GoalDetailScreen
     - Círculo de progreso grande animado
     - Monto actual / objetivo
     - Gráfica de crecimiento (line chart)
     - Proyección: "A este ritmo, llegarás el {fecha}"
     - Historial de contribuciones
     - Botón "Agregar dinero" → AmountInput → PIN
     - Botón "Retirar" → AmountInput → PIN
     - Settings: editar meta, auto-ahorro, eliminar

  4. GoalContributeScreen
     - CurrencyInput
     - Balance disponible
     - Cuenta fuente
     - Botón "Ahorrar" → PIN

  5. GoalWithdrawScreen
     - CurrencyInput
     - Fondos disponibles en meta
     - Cuenta destino
     - Botón "Retirar" → PIN

  6. GoalCompletedScreen (cuando se alcanza la meta)
     - Confetti + celebración animation
     - "¡Felicitaciones! Alcanzaste tu meta"
     - Opciones: Retirar todo, Crear nueva meta, Seguir ahorrando

Tests:
  - Crear meta completa
  - Contribuir
  - Retirar
  - Auto-save UI
  - Meta completada
```

**TASK-2.4.3: Support & Chat Screens**
```
Screens:
  1. SupportHomeScreen
     - Búsqueda "¿Cómo podemos ayudarte?"
     - Categorías frecuentes (icons + labels)
     - FAQs expandibles (accordion)
     - Botón "Contactar soporte"
     - Mis tickets (badge con abiertos)

  2. FAQScreen
     - Búsqueda
     - Categorías
     - Preguntas expandibles
     - "¿Te fue útil?" feedback

  3. CreateTicketScreen
     - Categoría (selector)
     - Asunto
     - Descripción (textarea)
     - Adjuntos (images)
     - Botón "Enviar"

  4. TicketsListScreen
     - Lista de tickets con status
     - Filtro por status

  5. ChatScreen
     - Chat UI estilo messaging
     - Burbujas de mensaje (usuario azul, agente gris)
     - Timestamps
     - Typing indicator
     - Input con attachment button
     - Auto-scroll a último mensaje
     - Pull to load older messages

Tests:
  - FAQ search
  - Crear ticket
  - Chat UI render
  - Typing indicator
```

**TASK-2.4.4: Settings & Profile Screens**
```
Screens:
  1. SettingsScreen
     - Profile section:
       - Avatar grande (editable)
       - Nombre
       - "Editar perfil" link
     - Secciones:
       - Seguridad: Cambiar PIN, Cambiar contraseña, 2FA, Biometría, Dispositivos
       - Notificaciones: Push, Email, SMS, por categoría
       - Apariencia: Tema (light/dark/auto), Idioma
       - Cuenta: Mis datos, KYC status, Cerrar cuenta
       - Legal: Términos, Privacidad, Licencias
       - App: Versión, Rate app, Compartir app
     - Botón "Cerrar sesión" (rojo)

  2. EditProfileScreen
     - Campos editables (nombre, dirección, etc.)
     - Campos no editables (email, phone) con nota

  3. SecuritySettingsScreen
     - Cambiar PIN
     - Cambiar contraseña
     - Toggle 2FA
     - Toggle biometría
     - Dispositivos activos (con opción de cerrar sesión remota)

  4. NotificationSettingsScreen
     - Toggles por canal (push, email, sms)
     - Toggles por categoría (transacciones, marketing, seguridad)

  5. DevicesScreen
     - Lista de dispositivos/sesiones
     - Dispositivo actual marcado
     - Botón "Cerrar sesión" por dispositivo
     - "Cerrar todas las sesiones"

Tests:
  - Navegación settings
  - Toggle settings
  - Edit profile
  - Logout
```

**TASK-2.4.5: Notifications Screen**
```
Screens:
  1. NotificationsScreen
     - Lista de notificaciones
     - Unread tienen fondo diferente
     - Swipe para marcar como leída
     - Agrupadas por: Hoy, Ayer, Esta semana, Anteriores
     - Cada notificación:
       - Ícono de tipo
       - Título
       - Preview de body
       - Timestamp relativo
     - "Marcar todas como leídas" header action
     - Empty state

  2. NotificationDetailScreen (modal o bottom sheet)
     - Contenido completo
     - CTA si aplica (ej: "Ver transacción")
     - Marcar como leída al abrir

Tests:
  - Render lista
  - Mark as read
  - Deep link desde notification tap
```

---

#### SPRINT 5: WEB APP & POLISH (Días 17-19)

**TASK-2.5.1: Web App — Complete Implementation**
```
Descripción: Implementar TODAS las pantallas de la mobile app en Next.js web
La web app debe tener paridad funcional con la mobile app.

Layout:
  - Sidebar (desktop): logo, navegación principal, usuario, logout
  - Top bar (mobile): hamburger menu, logo, notifications
  - Responsive breakpoints: mobile (<768), tablet (768-1024), desktop (>1024)

Pages (mirror de mobile):
  - /login, /register, /verify
  - /dashboard (home)
  - /accounts, /accounts/[id]
  - /transfers, /transfers/new, /transfers/[id]
  - /cards, /cards/[id], /cards/new
  - /savings, /savings/[id], /savings/new
  - /bills, /bills/pay
  - /notifications
  - /support, /support/[ticketId]
  - /settings, /settings/security, /settings/profile

Componentes web específicos:
  - DataTable para transacciones (sortable, filterable)
  - Charts (recharts) para analytics personales
  - QR display (sin scanner, solo mostrar mi QR)

Tests:
  - E2E con Cypress para flujos principales
  - Responsive testing
```

**TASK-2.5.2: Internationalization (i18n)**
```
Descripción: Implementar soporte multi-idioma
Idiomas:
  - Español (es) — default
  - Portugués (pt-BR)
  - Inglés (en)

Entregables:
  - Archivos de traducción para cada idioma (~500 keys)
  - Formateo de moneda por locale
  - Formateo de fecha por locale
  - Formateo de números por locale
  - Selector de idioma en settings
  - Auto-detect idioma del dispositivo

Tests:
  - Cada pantalla renderiza correctamente en los 3 idiomas
  - Formatos de moneda y fecha correctos
```

**TASK-2.5.3: Accessibility & Polish**
```
Entregables:
  - Todos los componentes con accessibility labels
  - VoiceOver/TalkBack support
  - Font scaling support
  - Contrast ratios WCAG AA
  - Haptic feedback en acciones importantes
  - Loading states en TODAS las pantallas
  - Error states en TODAS las pantallas
  - Empty states en TODAS las listas
  - Skeleton loaders
  - Smooth animations y transitions
  - App icon y splash screen

Tests:
  - Accessibility audit
  - Snapshot tests de todas las pantallas
```

---

## 7. AGENTE 3 — GEMINI ULTRA: INFRA, DEVOPS, ADMIN & SEGURIDAD

### 📋 PROMPT INICIAL PARA AGENTE 3

```
Eres el Agente 3 (GEMINI ULTRA) — DevOps/Security/Admin Lead Engineer de un 
proyecto fintech neobank para Latinoamérica llamado "PayLat". Tu responsabilidad 
es toda la infraestructura, CI/CD, seguridad, monitoreo, el servicio de fraude, 
analytics, y el dashboard de administración.

STACK INFRA: Docker + Docker Compose + Kubernetes + GitHub Actions
STACK ADMIN: Next.js 14 + TypeScript + Tailwind + shadcn/ui + Recharts
STACK SECURITY: OWASP, encryption, WAF, fraud detection
GIT: Trabaja en ramas feature/agent3/*
REGLA: Tu infra debe levantar TODOS los servicios del Agente 1 con un solo comando.
       Documenta todo en docs/runbooks/.
```

### BACKLOG COMPLETO — AGENTE 3

---

#### SPRINT 0: FUNDACIÓN INFRA (Días 1-2)

**TASK-3.0.1: Docker Setup Completo**
```
Ubicación: infra/docker/ + docker-compose.yml
Entregables:
  Dockerfiles para cada servicio:
  - services/auth-service/Dockerfile
  - services/user-service/Dockerfile
  - services/account-service/Dockerfile
  - services/payment-service/Dockerfile
  - services/card-service/Dockerfile
  - services/notification-service/Dockerfile
  - services/billing-service/Dockerfile
  - services/savings-service/Dockerfile
  - services/support-service/Dockerfile
  - services/kyc-service/Dockerfile
  - services/fraud-service/Dockerfile
  - services/analytics-service/Dockerfile

  Cada Dockerfile:
  - Multi-stage build (builder + runner)
  - Node 20 Alpine base
  - Non-root user
  - Health check command
  - Optimized layer caching
  - Size < 200MB

  docker-compose.yml (producción-like):
  - Todos los servicios
  - PostgreSQL 16 con volumen persistente
  - Redis 7 con persistencia
  - Kafka + Zookeeper (o Redpanda)
  - Elasticsearch 8
  - Nginx como reverse proxy
  - MinIO (S3 compatible)
  - Networks separados (frontend, backend, data)
  - Environment variables desde .env

  docker-compose.dev.yml (desarrollo):
  - Hot reload con volume mounts
  - Debug ports expuestos
  - Mailhog para emails
  - Kafka UI
  - pgAdmin
  - RedisInsight
  - Elasticsearch Kibana

  docker-compose.test.yml:
  - Solo dependencias (DB, Redis, Kafka)
  - Para CI/CD

  Scripts:
  - scripts/start-dev.sh (levanta todo para desarrollo)
  - scripts/start-prod.sh (levanta producción)
  - scripts/reset-db.sh (reset y reseed)
  - scripts/run-migrations.sh

Criterios de aceptación:
  - `docker-compose up` levanta TODO el sistema
  - Todos los servicios healthy en < 60 segundos
  - Hot reload funciona en dev
  - Volúmenes persistentes correctos
```

**TASK-3.0.2: Nginx / API Gateway Configuration**
```
Ubicación: services/api-gateway/
Entregables:
  nginx.conf con:
  - Upstream para cada servicio
  - Location routes:
    /api/v1/auth/*     → auth-service:3001
    /api/v1/users/*    → user-service:3002
    /api/v1/accounts/* → account-service:3003
    /api/v1/transfers/* → payment-service:3004
    /api/v1/qr/*       → payment-service:3004
    /api/v1/deposits/* → payment-service:3004
    /api/v1/withdrawals/* → payment-service:3004
    /api/v1/cards/*    → card-service:3005
    /api/v1/notifications/* → notification-service:3006
    /api/v1/bills/*    → billing-service:3007
    /api/v1/billers/*  → billing-service:3007
    /api/v1/topups/*   → billing-service:3007
    /api/v1/savings/*  → savings-service:3008
    /api/v1/support/*  → support-service:3009
    /api/v1/kyc/*      → kyc-service:3012
    /api/v1/exchange-rates/* → account-service:3003
    /admin/api/*       → admin-api (internal)
    /ws/*              → WebSocket proxy

  - Rate limiting por IP y por usuario
  - Request size limits (10MB para uploads)
  - Timeouts configurados
  - Gzip compression
  - Security headers (HSTS, CSP, X-Frame-Options, etc.)
  - CORS configuration
  - SSL/TLS termination (self-signed para dev)
  - Access logs en formato JSON
  - Health check endpoint /health

Criterios de aceptación:
  - Todas las rutas responden correctamente
  - Rate limiting funciona
  - Headers de seguridad presentes
  - SSL funciona
```

**TASK-3.0.3: Environment Configuration**
```
Entregables:
  - .env.example con TODAS las variables necesarias
  - .env.development (valores de desarrollo)
  - .env.test (valores de testing)
  - .env.production (template)
  
  Variables por servicio (mínimo):
  - DATABASE_URL, DATABASE_HOST, DATABASE_PORT, DATABASE_NAME
  - REDIS_URL, REDIS_HOST, REDIS_PORT
  - KAFKA_BROKERS
  - JWT_SECRET, JWT_EXPIRATION
  - REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRATION
  - ENCRYPTION_KEY (AES-256 para datos sensibles)
  - S3_BUCKET, S3_ENDPOINT, S3_ACCESS_KEY, S3_SECRET_KEY
  - SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
  - SMS_API_KEY (Twilio)
  - FCM_SERVER_KEY
  - FRAUD_THRESHOLD
  - Per-service PORT
  - LOG_LEVEL
  - NODE_ENV

  Script de validación que verifica todas las variables existen al arrancar.
```

---

#### SPRINT 1: CI/CD Y SEGURIDAD BASE (Días 3-5)

**TASK-3.1.1: GitHub Actions — CI Pipeline**
```
Ubicación: .github/workflows/
Entregables:

  ci.yml (runs on PR to develop):
    Jobs:
    1. lint:
       - ESLint en todos los packages
       - Prettier check
       - TypeScript type check
    
    2. test-unit:
       - matrix: [auth, user, account, payment, card, notification, billing, savings, support, kyc]
       - Para cada servicio: npm test
       - Coverage report
       - Upload coverage to Codecov
    
    3. test-integration:
       - needs: [lint]
       - Docker compose up test dependencies
       - Run integration tests
       - Teardown
    
    4. build:
       - needs: [lint, test-unit]
       - Build todos los servicios
       - Build mobile app (Expo)
       - Build web app (Next.js)
       - Build admin app (Next.js)
    
    5. docker-build:
       - needs: [build]
       - Build Docker images para cada servicio
       - Vulnerability scan con Trivy
       - Push a registry (ghcr.io)
    
    6. security-scan:
       - needs: [lint]
       - npm audit
       - Snyk security check
       - SAST (static analysis)
       - Secret detection (gitleaks)

  cd-staging.yml (runs on merge to develop):
    Jobs:
    1. Deploy to staging environment
    2. Run smoke tests
    3. Notify Slack

  cd-production.yml (runs on merge to main):
    Jobs:
    1. Deploy to production
    2. Run smoke tests
    3. Canary deployment (10% → 50% → 100%)
    4. Rollback on failure
    5. Notify team

Criterios de aceptación:
  - CI pasa en < 10 minutos
  - Coverage reports generados
  - Docker images taggeados con commit SHA
  - Secrets no hardcoded
```

**TASK-3.1.2: Security Hardening**
```
Entregables:
  1. Encryption at Rest:
     - PostgreSQL encryption (pgcrypto)
     - Card numbers encrypted with AES-256-GCM
     - PII encrypted in database
     - Encryption key rotation strategy
     - KMS integration (simulated)

  2. Encryption in Transit:
     - TLS 1.3 for all communications
     - mTLS between services (internal)
     - Certificate management

  3. Security Middleware (NestJS):
     - Helmet integration
     - CSRF protection
     - SQL injection prevention (TypeORM parameterized)
     - XSS sanitization
     - Rate limiting (per IP, per user, per endpoint)
     - Request size validation
     - Content-Type validation
     - IP whitelisting for admin

  4. Secrets Management:
     - HashiCorp Vault integration (simulated)
     - Secret rotation scripts
     - No secrets in code or Docker images

  5. Audit Logging:
     - All sensitive operations logged
     - Log format: JSON with correlation ID
     - Log shipping to Elasticsearch
     - Retention policy: 90 days hot, 1 year cold

  6. OWASP Top 10 Checklist:
     - A01: Broken Access Control → RBAC implemented
     - A02: Crypto Failures → AES-256 for sensitive data
     - A03: Injection → Parameterized queries
     - A04: Insecure Design → Threat modeling doc
     - A05: Security Misconfiguration → Hardened configs
     - A06: Vulnerable Components → Dependency scanning
     - A07: Auth Failures → Rate limiting, MFA
     - A08: Data Integrity → Input validation
     - A09: Logging Failures → Comprehensive audit logs
     - A10: SSRF → URL validation

Criterios de aceptación:
  - Security scan pasa sin high/critical issues
  - Encryption verified for all sensitive fields
  - Audit logs capturan todas las operaciones sensibles
```

**TASK-3.1.3: Fraud Detection Service**
```
Servicio: services/fraud-service/
Descripción: Motor de detección de fraude en tiempo real

Endpoints:
  POST /fraud/evaluate (interno)
    Body: { transaction_type, amount, user_id, device_info, location, metadata }
    Response: { risk_score, decision: ALLOW | REVIEW | BLOCK, reasons }
    Lógica:
      Rules engine:
      - Monto inusual (> 3x del promedio del usuario)
      - Ubicación inusual (IP de país diferente)
      - Velocidad (transacción < 5 min después de login desde nuevo device)
      - Horario inusual (transacciones 2am-5am)
      - Múltiples transacciones rápidas (> 5 en 10 min)
      - Cuenta nueva con monto alto (< 7 días, > $500)
      - Tarjeta nueva con compra internacional inmediata
      - Beneficiario nuevo con monto alto

      Scoring:
      - Cada regla suma puntos al risk_score (0-100)
      - 0-30: ALLOW (proceder)
      - 31-70: REVIEW (proceder pero alertar)
      - 71-100: BLOCK (rechazar y alertar)

  GET /fraud/alerts (admin)
    Response: lista de alertas para revisión manual

  PATCH /fraud/alerts/:id (admin)
    Body: { decision: APPROVE | REJECT, notes }
    Lógica:
      - Si APPROVE: liberar transacción bloqueada
      - Si REJECT: reversar si fue procesada

  GET /fraud/rules
    Response: reglas activas con thresholds

  PATCH /fraud/rules/:id
    Body: { threshold, enabled, weight }

Kafka consumers:
  - Escucha TODOS los eventos de transacciones
  - Almacena patrones de usuario para scoring
  - Emite paylat.fraud.events para alertas

Tests:
  - Cada regla detecta correctamente
  - Scoring correcto
  - Transacción bloqueada correctamente
  - Alert review flow
```

---

#### SPRINT 2: MONITORING Y ANALYTICS (Días 6-9)

**TASK-3.2.1: Monitoring Stack**
```
Entregables:
  1. Prometheus:
     - prometheus.yml con scrape configs para todos los servicios
     - NestJS metrics exporter (prom-client):
       - HTTP request duration histogram
       - HTTP request count by status
       - Active connections gauge
       - Database query duration
       - Kafka consumer lag
       - Custom business metrics:
         - transfers_total (counter)
         - transfer_amount_total (counter by currency)
         - active_users (gauge)
         - card_transactions_total (counter)
     - Alert rules:
       - Service down > 1 min
       - Error rate > 5%
       - Latency P99 > 2s
       - Disk usage > 80%
       - Kafka lag > 1000
       - Database connections > 80%

  2. Grafana:
     - Dashboard: System Overview
       - All services status (up/down)
       - Request rate
       - Error rate
       - Latency (P50, P95, P99)
     - Dashboard: Business Metrics
       - Transfers per minute
       - Total volume by currency
       - New registrations
       - Active users
       - Card transactions
     - Dashboard: Infrastructure
       - CPU, Memory, Disk per service
       - Database connections
       - Redis memory
       - Kafka consumer lag
     - Dashboard: Security
       - Failed login attempts
       - Fraud alerts
       - Blocked transactions
     - Provisioned dashboards (as code)
     - Alert channels: Slack, Email

  3. Sentry:
     - Error tracking for all services
     - Source maps for frontend
     - Performance monitoring
     - Release tracking

  4. ELK Stack (Elasticsearch + Kibana):
     - Centralized logging
     - Log parsing and indexing
     - Dashboards for log analysis
     - Search and filtering

  Docker compose additions for monitoring stack.

Criterios de aceptación:
  - Grafana dashboards funcionando con datos reales
  - Alertas disparan correctamente
  - Logs centralizados y buscables
  - Sentry captura errores
```

**TASK-3.2.2: Analytics Service**
```
Servicio: services/analytics-service/
Descripción: Recolección y procesamiento de métricas de negocio

Kafka consumers:
  - Escucha TODOS los eventos del sistema
  - Procesa y almacena métricas agregadas

Endpoints (admin):
  GET /analytics/dashboard
    Response: {
      total_users, active_users_today, new_users_today,
      total_transfers_today, transfer_volume_today,
      total_card_transactions, total_bill_payments,
      total_savings_balance,
      user_growth_chart, transfer_volume_chart
    }

  GET /analytics/users
    Query: ?period=7d|30d|90d|1y
    Response: user metrics over time (registrations, active, churn)

  GET /analytics/transactions
    Query: ?period=7d|30d|90d|1y&type=P2P|CARD|BILL
    Response: transaction metrics over time

  GET /analytics/revenue
    Query: ?period=
    Response: fee revenue, interchange revenue, FX revenue

  GET /analytics/cohort
    Response: cohort analysis (retention by registration month)

  GET /analytics/funnel
    Response: registration → KYC → first_transaction → repeat conversion

  GET /analytics/export
    Query: ?report=users|transactions|revenue&format=csv
    Response: downloadable report

Tests:
  - Métricas calculadas correctamente
  - Períodos de tiempo correctos
  - Exportación CSV
```

---

#### SPRINT 3: ADMIN DASHBOARD (Días 10-13)

**TASK-3.3.1: Admin Dashboard — Setup y Auth**
```
Ubicación: apps/admin/
Stack: Next.js 14 + TypeScript + Tailwind + shadcn/ui + Recharts

Estructura:
  apps/admin/
  ├── app/
  │   ├── (auth)/
  │   │   └── login/
  │   ├── (dashboard)/
  │   │   ├── layout.tsx (sidebar + header)
  │   │   ├── page.tsx (overview dashboard)
  │   │   ├── users/
  │   │   ├── accounts/
  │   │   ├── transactions/
  │   │   ├── cards/
  │   │   ├── kyc/
  │   │   ├── fraud/
  │   │   ├── support/
  │   │   ├── billing/
  │   │   ├── analytics/
  │   │   ├── notifications/
  │   │   ├── settings/
  │   │   └── audit-log/
  │   └── layout.tsx
  ├── components/
  │   ├── charts/
  │   ├── tables/
  │   └── shared/
  └── lib/

Auth:
  - Login con email/password (admin users separados)
  - RBAC: Super Admin, Admin, Support Agent, Analyst
  - JWT con refresh
  - Session management
  - IP whitelisting (configurable)

Layout:
  - Sidebar: 
    - Logo
    - Navigation items con iconos y badges
    - Collapsed mode
    - User info + logout
  - Header:
    - Breadcrumbs
    - Search global
    - Notifications
    - Dark mode toggle
  - Content area con padding

Criterios de aceptación:
  - Login funciona
  - RBAC restringe acceso por rol
  - Layout responsive
  - Dark mode
```

**TASK-3.3.2: Admin — Overview Dashboard**
```
Page: /admin/dashboard
Content:
  KPI Cards (top row):
  - Total Users (with % change vs yesterday)
  - Active Users Today
  - Transfers Today (count + volume)
  - Revenue Today
  
  Charts:
  - User Growth (line chart, last 30 days)
  - Transaction Volume (bar chart, last 7 days)
  - Revenue Breakdown (pie chart: fees, FX, interchange)
  - User Funnel (funnel chart: register → KYC → first tx)
  
  Tables:
  - Recent Transactions (last 10, live updates via polling)
  - Pending KYC Reviews (count + link)
  - Open Support Tickets (count + link)
  - Fraud Alerts (count + link)
  
  Real-time indicators:
  - Transactions per second
  - Active WebSocket connections
  - System health status

Auto-refresh every 30 seconds.
```

**TASK-3.3.3: Admin — User Management**
```
Pages:
  /admin/users:
  - DataTable con columnas:
    - ID, Avatar, Name, Email, Phone, Country, KYC Status, Account Status, Created
  - Filtros: status, KYC status, country, date range
  - Búsqueda por nombre, email, phone
  - Bulk actions: disable, enable, export
  - Pagination server-side

  /admin/users/[id]:
  - Profile info completo
  - KYC documents (preview de imágenes)
  - Cuentas del usuario con balances
  - Tarjetas (enmascaradas)
  - Transacciones (tabla paginada)
  - Metas de ahorro
  - Tickets de soporte
  - Audit log del usuario
  - Acciones:
    - Disable/Enable account
    - Reset password
    - Force logout
    - Adjust limits
    - Add note
    - Block/Unblock
```

**TASK-3.3.4: Admin — KYC Review**
```
Pages:
  /admin/kyc:
  - Lista de solicitudes pendientes de revisión
  - Filtros: status, country, date
  - Priority queue (oldest first)

  /admin/kyc/[id]:
  - Datos del usuario
  - Documento frontal (imagen zoomable)
  - Documento trasero (imagen zoomable)
  - Selfie
  - OCR extracted data
  - Face match score
  - Acciones:
    - Aprobar
    - Rechazar (con razón seleccionable + nota)
    - Solicitar nuevo documento
  - Historial de revisiones
```

**TASK-3.3.5: Admin — Transaction & Fraud Management**
```
Pages:
  /admin/transactions:
  - DataTable con TODAS las transacciones del sistema
  - Filtros: tipo, status, monto range, fecha, usuario
  - Exportación CSV
  - Click → detalle completo

  /admin/fraud:
  - Alertas de fraude en cola
  - Cada alerta:
    - Transacción asociada
    - Risk score con breakdown de reglas
    - User info + historial
    - Decisión: Aprobar / Rechazar / Escalar
  - Reglas de fraude configurables (UI para CRUD)
  - Estadísticas de fraude

  /admin/fraud/rules:
  - Lista de reglas con toggles enable/disable
  - Editar thresholds
  - Crear nuevas reglas
  - Test mode (evaluar sin bloquear)
```

**TASK-3.3.6: Admin — Support Management**
```
Pages:
  /admin/support:
  - Cola de tickets por prioridad
  - Asignación a agentes
  - Status tracking
  - SLA timers (tiempo de primera respuesta, tiempo de resolución)

  /admin/support/[id]:
  - Thread completo de mensajes
  - Info del usuario
  - Contexto (transacciones relacionadas, etc.)
  - Cambiar status, prioridad
  - Responder al usuario
  - Notas internas (no visibles para el usuario)
  - Templates de respuesta
```

**TASK-3.3.7: Admin — System Settings**
```
Pages:
  /admin/settings:
  - General: app name, logo, contact info
  - Limits: transaction limits, card limits
  - Fees: transfer fees, FX fees
  - Countries: enable/disable countries
  - Providers: manage bill providers, operators
  - Maintenance mode toggle
  - Feature flags
  
  /admin/audit-log:
  - Log de TODAS las acciones de admin
  - Filtros por admin, acción, fecha
  - Exportable

  /admin/settings/admins:
  - CRUD de admin users
  - Role assignment
  - Activity log per admin
```

---

#### SPRINT 4: KUBERNETES Y DEPLOY (Días 14-16)

**TASK-3.4.1: Kubernetes Manifests**
```
Ubicación: infra/k8s/
Entregables:
  Per service:
  - deployment.yaml (replicas, resources, probes, env from secrets)
  - service.yaml (ClusterIP)
  - hpa.yaml (HorizontalPodAutoscaler: min 2, max 10, CPU 70%)
  - configmap.yaml (non-sensitive config)
  
  Infrastructure:
  - namespace.yaml (paylat-dev, paylat-staging, paylat-prod)
  - ingress.yaml (Nginx Ingress con TLS)
  - secrets.yaml (template, values from Vault)
  - networkpolicy.yaml (restrict pod-to-pod communication)
  - pdb.yaml (PodDisruptionBudget: minAvailable 1)
  
  StatefulSets:
  - postgresql.yaml (or managed DB)
  - redis.yaml (or managed cache)
  - kafka.yaml (or managed Kafka)
  - elasticsearch.yaml (or managed ES)
  
  Monitoring:
  - prometheus-config.yaml
  - grafana-deployment.yaml
  - alertmanager.yaml
  
  Kustomize:
  - base/ (common configs)
  - overlays/dev/
  - overlays/staging/
  - overlays/production/

Criterios de aceptación:
  - `kubectl apply -k overlays/dev/` deploys everything
  - Health checks work
  - Auto-scaling triggers correctly
  - Network policies enforced
```

**TASK-3.4.2: Terraform / IaC (Optional but recommended)**
```
Ubicación: infra/terraform/
Entregables:
  modules/:
  - vpc/ (VPC, subnets, security groups)
  - eks/ (Kubernetes cluster)
  - rds/ (PostgreSQL managed)
  - elasticache/ (Redis managed)
  - s3/ (storage buckets)
  - msk/ (Kafka managed)
  - route53/ (DNS)
  - acm/ (SSL certificates)
  
  environments/:
  - dev/
  - staging/
  - production/
  
  State management con S3 backend.

Criterios de aceptación:
  - `terraform plan` muestra cambios correctos
  - `terraform apply` crea la infraestructura
  - State almacenado remotamente
```

**TASK-3.4.3: Database Backup & Recovery**
```
Entregables:
  - Backup script automático (pg_dump, daily)
  - Upload a S3 encriptado
  - Retention: 7 daily, 4 weekly, 12 monthly
  - Restore script y runbook
  - Point-in-time recovery con WAL
  - Disaster recovery playbook
  - Tested recovery (script que prueba restore)

Criterios de aceptación:
  - Backup automático funciona
  - Restore verificado
  - Recovery time < 30 minutos
```

---

#### SPRINT 5: DOCUMENTACIÓN Y HARDENING FINAL (Días 17-19)

**TASK-3.5.1: Runbooks y Documentación Operativa**
```
Ubicación: docs/runbooks/
Entregables:
  - runbook-deployment.md (cómo hacer deploy)
  - runbook-rollback.md (cómo hacer rollback)
  - runbook-scaling.md (cómo escalar)
  - runbook-incident.md (procedimiento de incidentes)
  - runbook-database.md (backup, restore, migrations)
  - runbook-monitoring.md (cómo usar Grafana, alertas)
  - runbook-security.md (incident response, key rotation)
  - runbook-onboarding.md (setup de nuevo desarrollador)
  - architecture-overview.md (con diagramas)
  - api-documentation.md (cómo usar la API)
  - troubleshooting.md (problemas comunes y soluciones)
```

**TASK-3.5.2: Load Testing**
```
Entregables:
  - k6/Artillery scripts para:
    - Login flow (1000 concurrent users)
    - Transfer flow (500 concurrent transfers)
    - Card authorization (200/second)
    - Mixed workload (realistic traffic pattern)
  - Performance baseline documented
  - Bottleneck analysis
  - Optimization recommendations
  - CI integration (run on staging deploys)

Criterios de aceptación:
  - System handles 1000 concurrent users
  - P99 latency < 500ms for transfers
  - 0 errors under normal load
  - Graceful degradation under 2x load
```

**TASK-3.5.3: Security Audit & Penetration Test Prep**
```
Entregables:
  - OWASP ZAP scan results
  - Dependency vulnerability report
  - Docker image vulnerability report
  - API security checklist verified
  - PCI-DSS readiness checklist
  - Data privacy compliance checklist (LGPD Brasil, Habeas Data Colombia)
  - Security findings report with severity ratings
  - Remediation plan for any findings
```

---

## 8. AGENTE 0 — ORQUESTADOR: VALIDACIÓN Y QA

### 📋 PROMPT DEL ORQUESTADOR

```
Eres el Agente 0 (ORQUESTADOR) — Project Manager, QA Lead, y Release Manager 
del proyecto PayLat. Tu rol es:

1. VALIDAR entregables de los 3 agentes
2. MERGEAR código a develop cuando pase validación
3. EJECUTAR integration tests end-to-end
4. CERTIFICAR funcionalidades completas
5. CREAR issues/tareas adicionales cuando detectes gaps
6. REPORTAR progreso y bloqueantes

No escribes código de producción, pero sí:
- Scripts de integration testing
- Automation de QA
- Test scenarios end-to-end
```

### CHECKLIST DE VALIDACIÓN POR SPRINT

#### Sprint 0 Validation
```
□ Monorepo compila con turbo build
□ shared-types importable desde todos los services
□ OpenAPI specs válidas (swagger-cli validate)
□ Docker compose up levanta todos los containers
□ Health checks responden en todos los servicios
□ Database migrations corren sin errores
□ Dev environment funciona con hot reload
□ Mobile app arranca en simulator
□ Web app arranca en browser
□ CI pipeline pasa
```

#### Sprint 1 Validation
```
□ Registro de usuario end-to-end: register → verify phone → verify email → login
□ Login con credenciales correctas retorna tokens
□ Login con credenciales incorrectas retorna error
□ Rate limiting funciona (lockout después de 5 intentos)
□ Refresh token funciona
□ Logout invalida sesión
□ PIN setup y verify funcionan
□ KYC flow completo (submit docs → review → approve)
□ Mobile: todas las auth screens navegan correctamente
□ Mobile: validaciones de formulario funcionan
□ Web: auth pages funcionan
□ Admin: login funciona con RBAC
```

#### Sprint 2 Validation
```
□ Crear cuenta genera account number único
□ Balance se muestra correctamente
□ Transferencia P2P: debita origen, acredita destino
□ Transferencia idempotente (mismo idempotency_key no duplica)
□ Balance insuficiente retorna error correcto
□ Límites diarios/mensuales se respetan
□ Transacciones registradas en ledger (doble entrada)
□ QR: generar, escanear, pagar — flujo completo
□ Depósitos y retiros (flujo simulado)
□ Mobile: Home screen muestra datos reales
□ Mobile: Transaction list con scroll infinito
□ Notificación enviada al recibir transferencia
□ Métricas en Prometheus/Grafana
```

#### Sprint 3 Validation
```
□ Crear tarjeta virtual genera número válido (Luhn)
□ Reveal muestra datos completos con PIN
□ Block/unblock funciona
□ Autorización de tarjeta respeta balance y límites
□ Pago de servicios end-to-end
□ Recarga móvil end-to-end
□ Meta de ahorro: crear, contribuir, retirar
□ Auto-save programado ejecuta
□ Admin dashboard muestra KPIs correctos
□ Admin KYC review aprueba/rechaza correctamente
□ Fraud service detecta y bloquea transacciones sospechosas
□ Mobile: todas las screens de Cards funcionan
□ Mobile: todas las screens de Savings funcionan
```

#### Sprint 4 Validation
```
□ Support tickets: crear, responder, resolver
□ Chat en tiempo real funciona (WebSocket)
□ Notification preferences respetadas
□ All Kafka events flowing correctly
□ Exchange rates y conversión de monedas
□ Kubernetes manifests deploy correctamente
□ Auto-scaling triggers on load
□ Database backup y restore verificados
□ Admin: todas las páginas funcionales
□ Admin: audit log completo
```

#### Sprint 5 Validation (FINAL)
```
□ E2E COMPLETO: Registro → KYC → Cuenta → Transferencia → Tarjeta → Ahorro → Pago servicio → Soporte
□ i18n: app funciona en ES, PT, EN
□ Performance: <500ms P99 para transferencias
□ Security: OWASP scan sin high/critical
□ Mobile: todas las screens en iOS y Android
□ Web: responsive en mobile, tablet, desktop
□ Admin: funcional para todos los roles
□ API documentation completa y correcta
□ Monitoring alertas configuradas
□ Runbooks completos
□ Demo con datos seed funciona
□ Zero known critical bugs
```

### INTEGRATION TEST SCENARIOS (E2E)

```
Scenario 1: New User Journey
  Given: New user downloads app
  1. Register with email, phone, password → user created
  2. Verify phone with OTP → phone verified
  3. Verify email → email verified
  4. Setup PIN → PIN saved
  5. Submit KYC documents → KYC pending
  6. Admin approves KYC → limits unlocked
  7. Deposit money → balance updated
  8. Create virtual card → card created
  9. View home screen → balance, card visible
  10. Create savings goal → goal visible

Scenario 2: P2P Transfer
  Given: User A has $1000, User B has $0
  1. User A opens transfer screen
  2. Selects User B by phone number
  3. Enters $500
  4. Confirms with PIN
  5. Transfer completes
  6. User A balance = $500
  7. User B balance = $500
  8. Both receive notification
  9. Transaction visible in both histories

Scenario 3: Card Payment
  Given: User has card with $500 balance
  1. Merchant sends authorization for $100
  2. Fraud check: ALLOW (risk score < 30)
  3. Authorization approved
  4. Available balance = $400 (hold)
  5. Capture for $95 (tip adjusted)
  6. Balance = $405
  7. Push notification received
  8. Transaction in card history

Scenario 4: Bill Payment
  Given: User has $500 balance
  1. Search for electricity provider
  2. Enter account number
  3. Lookup returns $75 due
  4. Confirm payment with PIN
  5. Payment processed
  6. Balance = $425
  7. Receipt generated
  8. Notification received

Scenario 5: Savings Goal
  Given: User has $1000 balance
  1. Create goal "Vacaciones" target $500
  2. Configure auto-save $50 weekly
  3. Manually contribute $100
  4. Goal shows $100 / $500 (20%)
  5. Auto-save executes → $150 / $500 (30%)
  6. After reaching $500 → celebration notification
  7. Withdraw $200 → $300 remaining
```

---

## 9. SPRINTS Y CRONOGRAMA

```
┌─────────────────────────────────────────────────────────────────────────┐
│ SPRINT │ DÍAS   │ AGENTE 1 (Backend)  │ AGENTE 2 (Frontend) │ AGENTE 3 (Infra)    │
├────────┼────────┼─────────────────────┼─────────────────────┼─────────────────────┤
│   0    │ 1-2    │ Monorepo, Types,    │ RN Setup, Design    │ Docker, Nginx,      │
│        │        │ OpenAPI, DB Schema   │ System, Mocks, Web  │ Env, CI base        │
│        │        │ Service Template     │ Setup               │                     │
├────────┼────────┼─────────────────────┼─────────────────────┼─────────────────────┤
│   1    │ 3-5    │ Auth Service,       │ Onboarding, Login,  │ CI/CD complete,     │
│        │        │ User Service,       │ KYC screens         │ Security hardening, │
│        │        │ KYC Service         │                     │ Fraud service       │
├────────┼────────┼─────────────────────┼─────────────────────┼─────────────────────┤
│   2    │ 6-9    │ Account Service,    │ Home, Transactions, │ Monitoring stack,   │
│        │        │ Ledger, Payment     │ Account screens,    │ Analytics service,  │
│        │        │ Service (P2P, QR)   │ Transfer flow       │ Logging             │
├────────┼────────┼─────────────────────┼─────────────────────┼─────────────────────┤
│   3    │ 10-13  │ Card Service,       │ QR, Bills, Cards,   │ Admin Dashboard     │
│        │        │ Billing Service,    │ Savings screens     │ (all pages),        │
│        │        │ Savings Service     │                     │ Fraud UI            │
├────────┼────────┼─────────────────────┼─────────────────────┼─────────────────────┤
│   4    │ 14-16  │ Notification Svc,   │ Support, Settings,  │ Kubernetes,         │
│        │        │ Support Service,    │ Notifications       │ Terraform,          │
│        │        │ Kafka events,       │ screens             │ DB Backup           │
│        │        │ Exchange rates      │                     │                     │
├────────┼────────┼─────────────────────┼─────────────────────┼─────────────────────┤
│   5    │ 17-19  │ API Gateway config, │ Web app complete,   │ Runbooks, Load      │
│        │        │ Testing, Data seed, │ i18n, Accessibility │ testing, Security   │
│        │        │ Performance tuning  │ Polish              │ audit               │
├────────┼────────┼─────────────────────┼─────────────────────┼─────────────────────┤
│ FINAL  │ 20     │ ← ← ←    Integration Testing & Release    → → →               │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 10. CONTRATOS DE INTEGRACIÓN (API CONTRACTS)

### Estándar de Respuesta API

```json
// Success Response
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "cursor": "eyJpZCI6MTAwfQ=="
  }
}

// Error Response
{
  "success": false,
  "error": {
    "code": "INSUFFICIENT_BALANCE",
    "message": "No tienes saldo suficiente para esta operación",
    "details": {
      "available": 500.00,
      "required": 750.00
    }
  },
  "request_id": "req_abc123"
}
```

### Headers Estándar

```
Request:
  Authorization: Bearer {access_token}
  X-Request-ID: {uuid}
  X-Idempotency-Key: {uuid} (para operaciones mutativas)
  X-Device-ID: {device_uuid}
  X-App-Version: 1.0.0
  Accept-Language: es|pt|en
  Content-Type: application/json

Response:
  X-Request-ID: {echo del request}
  X-RateLimit-Limit: 100
  X-RateLimit-Remaining: 95
  X-RateLimit-Reset: 1640000000
```

### Error Codes Estándar

```
AUTH_001: Invalid credentials
AUTH_002: Account locked
AUTH_003: Token expired
AUTH_004: Invalid PIN
AUTH_005: 2FA required
AUTH_006: Session not found

USER_001: User not found
USER_002: Email already exists
USER_003: Phone already exists
USER_004: KYC not completed

ACCOUNT_001: Account not found
ACCOUNT_002: Account disabled
ACCOUNT_003: Max accounts reached

TRANSFER_001: Insufficient balance
TRANSFER_002: Daily limit exceeded
TRANSFER_003: Monthly limit exceeded
TRANSFER_004: Destination not found
TRANSFER_005: Self-transfer not allowed
TRANSFER_006: Transaction blocked by fraud

CARD_001: Card not found
CARD_002: Card blocked
CARD_003: Card limit exceeded
CARD_004: Invalid activation code
CARD_005: International disabled

GENERAL_001: Validation error
GENERAL_002: Rate limit exceeded
GENERAL_003: Service unavailable
GENERAL_004: Internal error
```

---

## 11. CHECKLIST DE ENTREGA FINAL

```
FUNCIONALIDAD:
  ✅ Registro y verificación de usuario
  ✅ Login con password, biometría, 2FA
  ✅ KYC con documentos y selfie
  ✅ Dashboard con balance y transacciones
  ✅ Transferencias P2P (teléfono, alias, cuenta)
  ✅ Pagos QR (generar, escanear, pagar)
  ✅ Tarjeta virtual (crear, reveal, block/unblock, límites)
  ✅ Tarjeta física (solicitar, activar, reportar)
  ✅ Pago de servicios (consulta, pago, auto-pay)
  ✅ Recargas móviles
  ✅ Metas de ahorro (crear, contribuir, auto-save, retirar)
  ✅ Depósitos y retiros
  ✅ Notificaciones (push, email, SMS, in-app)
  ✅ Soporte (tickets, chat, FAQ)
  ✅ Multi-moneda con tasas de cambio
  ✅ Historial con filtros y exportación
  ✅ Settings y preferencias

PLATAFORMAS:
  ✅ iOS (React Native)
  ✅ Android (React Native)
  ✅ Web responsive (Next.js)
  ✅ Admin Dashboard (Next.js)

INFRAESTRUCTURA:
  ✅ Docker Compose (dev + prod)
  ✅ Kubernetes manifests
  ✅ CI/CD (GitHub Actions)
  ✅ Monitoring (Prometheus + Grafana)
  ✅ Logging (ELK)
  ✅ Error tracking (Sentry)
  ✅ Backup y recovery

SEGURIDAD:
  ✅ Encryption at rest y in transit
  ✅ OWASP Top 10 addressed
  ✅ Fraud detection
  ✅ Audit logging
  ✅ Rate limiting
  ✅ RBAC

CALIDAD:
  ✅ Unit tests > 80% coverage
  ✅ Integration tests
  ✅ E2E tests
  ✅ Load tests
  ✅ Security scan
  ✅ API documentation (OpenAPI)
  ✅ Runbooks

INTERNACIONALIZACIÓN:
  ✅ Español
  ✅ Portugués
  ✅ Inglés
  ✅ Formatos por locale (moneda, fecha)
```

---

## APÉNDICE: COMANDOS RÁPIDOS PARA CADA AGENTE

### Agente 1 — Inicio
```bash
git checkout -b feature/agent1/monorepo-setup develop
cd paylat
npm init -y
npm install -D turbo typescript @types/node
npx turbo init
# Crear estructura de carpetas
# Comenzar TASK-1.0.1
```

### Agente 2 — Inicio
```bash
git checkout -b feature/agent2/mobile-setup develop
cd paylat/apps
npx create-expo-app mobile --template expo-template-blank-typescript
cd mobile
npx expo install nativewind tailwindcss
npm install @react-navigation/native @react-navigation/bottom-tabs zustand @tanstack/react-query axios
# Comenzar TASK-2.0.1
```

### Agente 3 — Inicio
```bash
git checkout -b feature/agent3/infra-docker develop
cd paylat
mkdir -p infra/docker infra/k8s infra/terraform infra/scripts
mkdir -p .github/workflows
# Crear docker-compose.yml
# Comenzar TASK-3.0.1
```

---

*Documento generado para el proyecto PayLat — NeoBank LATAM*
*Versión 1.0 — Febrero 2026*
