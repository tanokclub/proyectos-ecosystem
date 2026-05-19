export const project = {
  "title": "SecretsVault",
  "slug": "secretsvault",
  "codename": "secretsvault",
  "summary": "Gestión de secretos zero-trust con rotación automática y audit total.",
  "category": "DevTools / Infra",
  "stack": [
    "Next.js 14",
    "NestJS",
    "PostgreSQL",
    "Vault",
    "KMS"
  ],
  "modules": [
    "secretos",
    "rotación",
    "políticas",
    "audit",
    "SDKs"
  ],
  "server": {
    "entry": "services/api",
    "port": 4253
  },
  "web": {
    "entry": "apps/web",
    "port": 3253
  }
};

export const apiRoutes = [
  {
    "method": "GET",
    "path": "/api/v1/secrets",
    "summary": "Secretos",
    "response": {
      "secrets": [
        {
          "key": "DB_PASSWORD",
          "env": "prod",
          "version": 12,
          "rotateInDays": 45
        }
      ]
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/audit",
    "summary": "Audit",
    "response": {
      "events": [
        {
          "ts": "2026-05-19T10:00",
          "action": "read",
          "secret": "DB_PASSWORD",
          "user": "svc:api"
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/secrets",
    "summary": "Crear secret",
    "requestExample": {
      "key": "API_KEY",
      "value": "***",
      "env": "prod"
    },
    "response": {
      "key": "API_KEY",
      "version": 1
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/secrets/rotate",
    "summary": "Rotar",
    "requestExample": {
      "key": "DB_PASSWORD"
    },
    "response": {
      "newVersion": 13,
      "completedAt": "2026-05-19T15:14:47.103Z"
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/metrics",
    "summary": "Métricas del servicio",
    "response": {
      "requestsPerMinute": 142,
      "p50Ms": 18,
      "p95Ms": 86,
      "errorRate": 0.004,
      "statusCodes": {
        "200": 1820,
        "400": 12,
        "404": 4,
        "500": 1
      }
    }
  },
  {
    "method": "GET",
    "path": "/api/v1/notifications",
    "summary": "Notificaciones del usuario",
    "response": {
      "items": [
        {
          "id": "n_1",
          "type": "info",
          "title": "Bienvenido a secretsvault",
          "read": false,
          "at": "2026-05-19T15:14:47.108Z"
        },
        {
          "id": "n_2",
          "type": "success",
          "title": "Sincronización completa",
          "read": true,
          "at": "2026-05-19T15:14:47.108Z"
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/search",
    "summary": "Búsqueda global",
    "requestExample": {
      "query": "demo"
    },
    "response": {
      "results": [
        {
          "type": "doc",
          "id": "s_1",
          "title": "Resultado mock",
          "score": 0.84
        }
      ]
    }
  },
  {
    "method": "POST",
    "path": "/api/v1/batch",
    "summary": "Operación batch",
    "requestExample": {
      "items": []
    },
    "response": {
      "batchId": "b_001",
      "accepted": 12,
      "queued": 12
    }
  }
];
